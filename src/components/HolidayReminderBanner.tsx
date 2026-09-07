import React, { useState, useMemo } from "react";
import {
  CalendarRange,
  Clock,
  Calendar,
  Download,
  CheckCircle2,
  BellRing,
  Sliders,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { TabKey } from "../types";
import {
  calculateHolidayReminder,
  generateSingleHolidayICal,
} from "../utils/holidayReminder";

interface HolidayReminderBannerProps {
  onNavigateToTab: (tab: TabKey) => void;
}

export const HolidayReminderBanner: React.FC<HolidayReminderBannerProps> = ({
  onNavigateToTab,
}) => {
  // Test simulation date (null = natural date)
  const [simulatedDate, setSimulatedDate] = useState<string | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState<string | null>(null);

  // Calculate reminder information
  const reminderInfo = useMemo(() => {
    return calculateHolidayReminder(simulatedDate || undefined);
  }, [simulatedDate]);

  const activeHoliday = reminderInfo.currentHoliday || reminderInfo.nextHoliday;

  const handleDownloadSingle = () => {
    if (!activeHoliday) return;
    generateSingleHolidayICal(activeHoliday);
    setDownloadSuccessMsg(`تم تحميل ملف تقويم (.ics) لعطلة: ${activeHoliday.nameAr}`);
    setTimeout(() => setDownloadSuccessMsg(null), 3000);
  };

  const getHolidayTypeLabel = (type?: string) => {
    switch (type) {
      case "periodique":
        return { label: "عطلة بينية", bg: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30" };
      case "religious":
        return { label: "عيد ديني", bg: "bg-purple-500/20 text-purple-300 border-purple-400/30" };
      case "national":
        return { label: "عيد وطني", bg: "bg-rose-500/20 text-rose-300 border-rose-400/30" };
      default:
        return { label: "عطلة رسمية", bg: "bg-blue-500/20 text-blue-300 border-blue-400/30" };
    }
  };

  const typeInfo = getHolidayTypeLabel(activeHoliday?.type);

  return (
    <div className="no-print relative" aria-label="تذكير العطل المدرسية">
      {/* Toast notification for iCal download */}
      {downloadSuccessMsg && (
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 z-50 bg-emerald-950 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-md border border-emerald-500 flex items-center gap-1.5 animate-fadeIn">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>{downloadSuccessMsg}</span>
        </div>
      )}

      {/* Compact Reminder Bar (شريط تذكير صغير في الأسفل) */}
      <div
        className={`rounded-2xl border text-white shadow-xs transition-all overflow-hidden bg-gradient-to-r ${reminderInfo.bannerGradient}`}
      >
        <div className="px-3.5 py-2.5 sm:px-4 sm:py-2.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-2.5">
          {/* Main Info Section */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center ${
                reminderInfo.isUrgent
                  ? "bg-amber-400 text-slate-950 animate-pulse"
                  : "bg-white/10 text-amber-300"
              }`}
            >
              <BellRing className="w-4 h-4" />
            </div>

            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                {/* Badge */}
                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded-full border flex items-center gap-1 ${reminderInfo.badgeColorClass}`}
                >
                  <Clock className="w-2.5 h-2.5" />
                  <span>{reminderInfo.badgeText}</span>
                </span>

                {/* Holiday Name */}
                <span className="text-xs sm:text-sm font-bold text-white truncate font-cairo">
                  {activeHoliday?.nameAr || reminderInfo.reminderTitle}
                </span>

                {/* Type Badge */}
                <span className={`text-[10px] font-medium px-1.5 py-0.2 rounded-md border hidden sm:inline ${typeInfo.bg}`}>
                  {typeInfo.label}
                </span>
              </div>

              {/* Date details and Resumption */}
              <div className="text-[11px] text-slate-300 flex items-center gap-2 flex-wrap">
                {activeHoliday && (
                  <span>
                    من <strong className="text-white font-medium">{reminderInfo.startDateFormatted}</strong> إلى{" "}
                    <strong className="text-white font-medium">{reminderInfo.endDateFormatted}</strong> ({activeHoliday.durationDays} أيام)
                  </span>
                )}
                {reminderInfo.resumptionDateFormatted && (
                  <>
                    <span className="text-slate-500 hidden sm:inline">•</span>
                    <span className="text-amber-300 font-medium">
                      استئناف الدراسة: {reminderInfo.resumptionDateFormatted}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Quick Action Controls */}
          <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center">
            {/* Days Counter Tag */}
            <div className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/25 border border-white/10 text-xs font-mono font-bold text-amber-300">
              <Calendar className="w-3 h-3 text-slate-400" />
              <span>
                {reminderInfo.status === "ongoing"
                  ? `${reminderInfo.daysRemainingCurrent + 1} أيام متبقية`
                  : `${reminderInfo.daysUntilNext} يوماً`}
              </span>
            </div>

            {/* View Full Holidays Table Button */}
            <button
              type="button"
              onClick={() => onNavigateToTab("holidays")}
              className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl transition shadow-2xs flex items-center gap-1 cursor-pointer"
              title="عرض جدول العطل المدرسية الرسمي"
            >
              <CalendarRange className="w-3.5 h-3.5" />
              <span>لائحة العطل</span>
            </button>

            {/* Download iCal */}
            <button
              type="button"
              onClick={handleDownloadSingle}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition border border-white/10 cursor-pointer"
              title="تنزيل تقويم العطلة iCal للهاتف"
            >
              <Download className="w-3.5 h-3.5 text-blue-300" />
            </button>

            {/* Expand / Details Toggle */}
            <button
              type="button"
              onClick={() => setIsDetailsOpen(!isDetailsOpen)}
              className="px-2 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-[11px] font-medium transition border border-white/10 flex items-center gap-1 cursor-pointer"
              title={isDetailsOpen ? "إخفاء التفاصيل" : "عرض تفاصيل إضافية"}
            >
              <span className="hidden sm:inline">{isDetailsOpen ? "إخفاء" : "تفاصيل"}</span>
              {isDetailsOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Optional Collapsible Details & Simulator (Only when clicked) */}
        {isDetailsOpen && (
          <div className="border-t border-white/10 bg-black/35 px-4 py-3 text-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <p className="text-slate-200 leading-relaxed text-[11px] sm:text-xs">
                {reminderInfo.reminderMessage}
              </p>
              <span className="text-[10px] text-blue-200 font-mono shrink-0">
                المقرر الوزاري لتنظيم السنة الدراسية 2026/2027
              </span>
            </div>

            {/* Next 3 Upcoming Holidays */}
            {reminderInfo.upcomingList.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] text-amber-300 font-bold block">
                  العطل المدرسية القادمة الموالية:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {reminderInfo.upcomingList.slice(0, 3).map((h) => (
                    <div
                      key={h.id}
                      className="bg-white/5 border border-white/10 rounded-xl p-2 flex items-center justify-between text-[11px]"
                    >
                      <div className="truncate">
                        <span className="font-bold text-white block truncate">{h.nameAr}</span>
                        <span className="text-slate-400 text-[10px] font-mono">{h.startDate}</span>
                      </div>
                      <span className="text-amber-300 font-mono text-[10px] shrink-0 bg-white/10 px-1.5 py-0.5 rounded">
                        {h.durationDays} أيام
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Date Simulator Bar */}
            <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-300">
              <div className="flex items-center gap-1.5">
                <Sliders className="w-3 h-3 text-amber-300" />
                <span>محاكاة تاريخ للاختبار:</span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setSimulatedDate("2026-10-15")}
                  className="bg-white/10 hover:bg-white/20 text-white px-2 py-0.5 rounded text-[10px] cursor-pointer"
                >
                  قبل عطلة أكتوبر بـ 3 أيام
                </button>
                <button
                  type="button"
                  onClick={() => setSimulatedDate("2026-10-20")}
                  className="bg-white/10 hover:bg-white/20 text-emerald-300 px-2 py-0.5 rounded text-[10px] cursor-pointer"
                >
                  عطلة جارية
                </button>
                <button
                  type="button"
                  onClick={() => setSimulatedDate("2027-01-20")}
                  className="bg-white/10 hover:bg-white/20 text-white px-2 py-0.5 rounded text-[10px] cursor-pointer"
                >
                  قبل عطلة منتصف السنة
                </button>

                <input
                  type="date"
                  value={simulatedDate || reminderInfo.referenceDateStr}
                  onChange={(e) => setSimulatedDate(e.target.value)}
                  className="bg-slate-800 text-white border border-slate-600 px-1.5 py-0.5 rounded text-[10px] outline-hidden"
                />

                {simulatedDate && (
                  <button
                    type="button"
                    onClick={() => setSimulatedDate(null)}
                    className="bg-rose-500/30 hover:bg-rose-500/50 text-rose-200 px-1.5 py-0.5 rounded text-[10px] flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-2.5 h-2.5" />
                    <span>إعادة</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
