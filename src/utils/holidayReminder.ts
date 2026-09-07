import { HolidayItem } from "../types";
import { MOROCCAN_HOLIDAYS_2026_2027 } from "../data/holidays2026_2027";

export type HolidayReminderStatus = "ongoing" | "imminent" | "approaching" | "upcoming" | "season_ended";

export interface HolidayReminderInfo {
  status: HolidayReminderStatus;
  currentHoliday: HolidayItem | null;
  nextHoliday: HolidayItem | null;
  daysUntilNext: number; // 0 if starting today, > 0 if in the future
  daysRemainingCurrent: number; // If ongoing: days until end
  startDateFormatted: string;
  endDateFormatted: string;
  resumptionDateFormatted: string;
  reminderTitle: string;
  reminderMessage: string;
  badgeText: string;
  badgeColorClass: string;
  bannerGradient: string;
  isUrgent: boolean;
  upcomingList: HolidayItem[];
  referenceDateStr: string;
}

const ARABIC_MONTHS: { [key: number]: string } = {
  1: "يناير",
  2: "فبراير",
  3: "مارس",
  4: "أبريل",
  5: "مايو",
  6: "يونيو",
  7: "يوليو",
  8: "غشت",
  9: "شتنبر",
  10: "أكتوبر",
  11: "نونبر",
  12: "دجنبر",
};

const ARABIC_DAYS: { [key: number]: string } = {
  0: "الأحد",
  1: "الاثنين",
  2: "الثلاثاء",
  3: "الأربعاء",
  4: "الخميس",
  5: "الجمعة",
  6: "السبت",
};

/**
 * Format date string YYYY-MM-DD into a full Arabic date like: "الأحد 18 أكتوبر 2026"
 */
export function formatArabicDate(dateStr: string): string {
  if (!dateStr) return "";
  const parts = dateStr.split("-").map((p) => parseInt(p, 10));
  if (parts.length !== 3) return dateStr;

  const [year, month, day] = parts;
  const d = new Date(year, month - 1, day);
  const dayName = ARABIC_DAYS[d.getDay()] || "";
  const monthName = ARABIC_MONTHS[month] || month.toString();

  return `${dayName} ${day} ${monthName} ${year}`;
}

/**
 * Calculate next day after endDate for resumption of studies (تاريخ استئناف الدراسة)
 */
export function getResumptionDate(endDateStr: string): string {
  if (!endDateStr) return "";
  const parts = endDateStr.split("-").map((p) => parseInt(p, 10));
  if (parts.length !== 3) return "";

  const [year, month, day] = parts;
  const nextDay = new Date(year, month - 1, day + 1);

  const resYear = nextDay.getFullYear();
  const resMonth = nextDay.getMonth() + 1;
  const resDay = nextDay.getDate();
  const dayName = ARABIC_DAYS[nextDay.getDay()] || "";
  const monthName = ARABIC_MONTHS[resMonth] || resMonth.toString();

  return `يوم ${dayName} ${resDay} ${monthName} ${resYear}`;
}

/**
 * Parse YYYY-MM-DD to timestamp at midnight local time
 */
function parseDateToMidnight(dateStr: string): number {
  const parts = dateStr.split("-").map((p) => parseInt(p, 10));
  return new Date(parts[0], parts[1] - 1, parts[2], 0, 0, 0, 0).getTime();
}

/**
 * Calculate holiday reminder status based on reference date (defaults to current date or start of 2026-2027 school year)
 */
export function calculateHolidayReminder(customDate?: string): HolidayReminderInfo {
  const holidays = [...MOROCCAN_HOLIDAYS_2026_2027].sort(
    (a, b) => parseDateToMidnight(a.startDate) - parseDateToMidnight(b.startDate)
  );

  let targetDate: Date;
  if (customDate) {
    const parts = customDate.split("-").map((p) => parseInt(p, 10));
    targetDate = new Date(parts[0], parts[1] - 1, parts[2], 0, 0, 0, 0);
  } else {
    const now = new Date();
    // If the system time is before the 2026-2027 school year (e.g. 2025), default to September 7, 2026 (back to school)
    if (now.getFullYear() < 2026 || (now.getFullYear() === 2026 && now.getMonth() < 8)) {
      targetDate = new Date(2026, 8, 7, 0, 0, 0, 0); // 7 September 2026
    } else {
      targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    }
  }

  const todayMidnight = targetDate.getTime();
  const refDateStr = `${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(2, "0")}-${String(
    targetDate.getDate()
  ).padStart(2, "0")}`;

  const msPerDay = 1000 * 60 * 60 * 24;

  // 1. Check if we are currently inside any holiday
  const currentHoliday = holidays.find((h) => {
    const start = parseDateToMidnight(h.startDate);
    const end = parseDateToMidnight(h.endDate) + msPerDay - 1; // End of that day
    return todayMidnight >= start && todayMidnight <= end;
  }) || null;

  // 2. Find upcoming holidays starting after today (or starting today)
  const futureHolidays = holidays.filter((h) => {
    const start = parseDateToMidnight(h.startDate);
    return start > todayMidnight;
  });

  const nextHoliday = currentHoliday ? futureHolidays[0] || null : (futureHolidays[0] || null);

  let status: HolidayReminderStatus = "upcoming";
  let daysUntilNext = 0;
  let daysRemainingCurrent = 0;
  let isUrgent = false;
  let reminderTitle = "";
  let reminderMessage = "";
  let badgeText = "تذكير العطل";
  let badgeColorClass = "bg-blue-100 text-blue-900 border-blue-300";
  let bannerGradient = "from-slate-900 via-indigo-950 to-blue-950 border-indigo-500/40";

  if (currentHoliday) {
    status = "ongoing";
    const end = parseDateToMidnight(currentHoliday.endDate);
    daysRemainingCurrent = Math.max(0, Math.ceil((end - todayMidnight) / msPerDay));
    isUrgent = true;
    badgeText = "عطلة جارية حالياً";
    badgeColorClass = "bg-emerald-500 text-white font-black animate-pulse shadow-xs";
    bannerGradient = "from-emerald-950 via-teal-950 to-slate-900 border-emerald-500/50";
    reminderTitle = `عطلة مدرسية جارية: ${currentHoliday.nameAr}`;

    if (daysRemainingCurrent === 0) {
      reminderMessage = `اليوم هو آخر أيام العطلة (${currentHoliday.nameAr}). تستأنف الدراسة رسمياً ${getResumptionDate(
        currentHoliday.endDate
      )}.`;
    } else {
      reminderMessage = `أنتم حالياً في فترة ${currentHoliday.nameAr} (${currentHoliday.durationDays} أيام). متبقي ${
        daysRemainingCurrent + 1
      } أيام على نهايتها، وتستأنف الدراسة ${getResumptionDate(currentHoliday.endDate)}.`;
    }
  } else if (nextHoliday) {
    const nextStart = parseDateToMidnight(nextHoliday.startDate);
    daysUntilNext = Math.max(0, Math.ceil((nextStart - todayMidnight) / msPerDay));

    if (daysUntilNext <= 7) {
      status = "imminent";
      isUrgent = true;
      badgeText = daysUntilNext === 0 ? "تبدأ اليوم!" : `موعد قريب جداً: خلال ${daysUntilNext} أيام`;
      badgeColorClass = "bg-amber-400 text-slate-950 font-black animate-bounce shadow-xs";
      bannerGradient = "from-amber-950 via-rose-950 to-slate-900 border-amber-400/50";
      reminderTitle = `اقتراب موعد ${nextHoliday.nameAr} (${daysUntilNext} ${daysUntilNext === 1 ? "يوم" : "أيام"})`;
      reminderMessage = `تنبيه اقتراب العطلة: تنطلق ${nextHoliday.nameAr} ابتداءً من ${formatArabicDate(
        nextHoliday.startDate
      )} وتستمر لمدة ${nextHoliday.durationDays} ${nextHoliday.durationDays > 1 ? "أيام" : "يوم"}. تستأنف الدراسة ${getResumptionDate(
        nextHoliday.endDate
      )}.`;
    } else if (daysUntilNext <= 21) {
      status = "approaching";
      isUrgent = false;
      badgeText = `اقتراب العطلة (بعد ${daysUntilNext} يوماً)`;
      badgeColorClass = "bg-teal-100 text-teal-900 border-teal-300 font-bold";
      bannerGradient = "from-teal-950 via-indigo-950 to-slate-900 border-teal-500/40";
      reminderTitle = `العطلة المدرسية القادمة: ${nextHoliday.nameAr}`;
      reminderMessage = `موعد العطلة المدرسية القادمة يقترب: تنطلق ${nextHoliday.nameAr} يوم ${formatArabicDate(
        nextHoliday.startDate
      )} (بعد ${daysUntilNext} يوماً). مدتها: ${nextHoliday.durationDays} أيام.`;
    } else {
      status = "upcoming";
      isUrgent = false;
      badgeText = `العطلة القادمة بعد ${daysUntilNext} يوماً`;
      badgeColorClass = "bg-blue-100 text-blue-900 border-blue-300 font-bold";
      bannerGradient = "from-blue-950 via-indigo-950 to-slate-900 border-blue-600/40";
      reminderTitle = `العطلة المدرسية القادمة: ${nextHoliday.nameAr}`;
      reminderMessage = `تذكير التقويم المدرسي: العطلة القادمة هي ${nextHoliday.nameAr} وتصادف ${formatArabicDate(
        nextHoliday.startDate
      )} بمجموع ${nextHoliday.durationDays} أيام. تستأنف الدراسة ${getResumptionDate(nextHoliday.endDate)}.`;
    }
  } else {
    status = "season_ended";
    isUrgent = false;
    badgeText = "نهاية الموسم الدراسي";
    badgeColorClass = "bg-slate-200 text-slate-800 border-slate-300";
    bannerGradient = "from-slate-900 via-slate-950 to-gray-900 border-slate-700";
    reminderTitle = "اكتملت عطل الموسم الدراسي 2026/2027";
    reminderMessage = "انتهت كافة العطل المدرسية المقررة ضمن لائحة العطل الرسمية للموسم الدراسي الحالي.";
  }

  const activeHoliday = currentHoliday || nextHoliday;
  const startDateFormatted = activeHoliday ? formatArabicDate(activeHoliday.startDate) : "";
  const endDateFormatted = activeHoliday ? formatArabicDate(activeHoliday.endDate) : "";
  const resumptionDateFormatted = activeHoliday ? getResumptionDate(activeHoliday.endDate) : "";

  return {
    status,
    currentHoliday,
    nextHoliday,
    daysUntilNext,
    daysRemainingCurrent,
    startDateFormatted,
    endDateFormatted,
    resumptionDateFormatted,
    reminderTitle,
    reminderMessage,
    badgeText,
    badgeColorClass,
    bannerGradient,
    isUrgent,
    upcomingList: futureHolidays.slice(0, 4),
    referenceDateStr: refDateStr,
  };
}

/**
 * Generate iCalendar file for a single holiday
 */
export function generateSingleHolidayICal(holiday: HolidayItem) {
  const cleanStart = holiday.startDate.replace(/-/g, "");
  const cleanEnd = holiday.endDate.replace(/-/g, "");
  let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Moroccan School Holidays Reminder//AR\nCALSCALE:GREGORIAN\n";
  icsContent += "BEGIN:VEVENT\n";
  icsContent += `SUMMARY:عطلة مدرسية: ${holiday.nameAr}\n`;
  icsContent += `DESCRIPTION:${holiday.nameFr} (${holiday.durationDays} أيام) - استئناف الدراسة: ${getResumptionDate(
    holiday.endDate
  )}\n`;
  icsContent += `DTSTART;VALUE=DATE:${cleanStart}\n`;
  icsContent += `DTEND;VALUE=DATE:${cleanEnd}\n`;
  icsContent += "STATUS:CONFIRMED\n";
  icsContent += "END:VEVENT\n";
  icsContent += "END:VCALENDAR";

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `عطلة_${holiday.nameAr.replace(/\s+/g, "_")}_2026_2027.ics`;
  a.click();
  URL.revokeObjectURL(url);
}
