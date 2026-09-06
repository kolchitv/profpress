import React, { useState } from "react";
import {
  CalendarRange,
  Printer,
  Download,
  Filter,
  Calendar,
  Sparkles,
  Info,
  Clock,
} from "lucide-react";
import { HolidayItem, TeacherProfile } from "../types";
import { MOROCCAN_HOLIDAYS_2026_2027 } from "../data/holidays2026_2027";

interface HolidaysCalendarProps {
  teacherProfile: TeacherProfile;
}

export const HolidaysCalendar: React.FC<HolidaysCalendarProps> = ({ teacherProfile }) => {
  const [filterType, setFilterType] = useState<"all" | "periodique" | "religious" | "national">("all");
  const [cardMode, setCardMode] = useState<"full_table" | "pocket">("full_table");

  const holidays = MOROCCAN_HOLIDAYS_2026_2027;

  const filteredHolidays =
    filterType === "all"
      ? holidays
      : holidays.filter((h) => h.type === filterType);

  const totalDays = holidays.reduce((acc, h) => acc + h.durationDays, 0);

  // Generate .ics calendar file download
  const handleDownloadICal = () => {
    let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Moroccan School Holidays 2026-2027//AR\nCALSCALE:GREGORIAN\n";

    holidays.forEach((h) => {
      const cleanStart = h.startDate.replace(/-/g, "");
      const cleanEnd = h.endDate.replace(/-/g, "");
      icsContent += "BEGIN:VEVENT\n";
      icsContent += `SUMMARY:عطلة مدرسية: ${h.nameAr}\n`;
      icsContent += `DESCRIPTION:${h.nameFr} (${h.durationDays} أيام)\n`;
      icsContent += `DTSTART;VALUE=DATE:${cleanStart}\n`;
      icsContent += `DTEND;VALUE=DATE:${cleanEnd}\n`;
      icsContent += "STATUS:CONFIRMED\n";
      icsContent += "END:VEVENT\n";
    });

    icsContent += "END:VCALENDAR";

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "العطل_المدرسية_المغربية_2026_2027.ics";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar (Hidden in Print) */}
      <div className="no-print bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <CalendarRange className="w-5 h-5 text-emerald-700" />
                <span>لائحة العطل المدرسية الرسمية بالمغرب - الموسم 2026 / 2027</span>
              </h2>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded">
                مقرر وزاري معتمد
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              استعرض وحمل لائحة العطل الرسمية للموسم الدراسي 2026/2027، صدرها مباشرة لتقويم هاتفك (Google Calendar / Apple) واطبعها بتنسيق وزاري A4.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleDownloadICal}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              title="إضافة العطل إلى تقويم هاتفك أو حاسوبك"
            >
              <Download className="w-3.5 h-3.5" />
              <span>إضافة لتقويم هاتفي (iCal)</span>
            </button>

            <button
              id="print-holidays-btn"
              onClick={() => window.print()}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5 text-amber-300" />
              <span>طباعة اللائحة A4</span>
            </button>
          </div>
        </div>

        {/* Filter and View mode */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-600 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-emerald-700" />
              <span>تصفية:</span>
            </span>
            <button
              onClick={() => setFilterType("all")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                filterType === "all"
                  ? "bg-emerald-700 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              الكل ({holidays.length})
            </button>
            <button
              onClick={() => setFilterType("periodique")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                filterType === "periodique"
                  ? "bg-emerald-700 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              العطل البينية ونهاية الأسدوس
            </button>
            <button
              onClick={() => setFilterType("religious")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                filterType === "religious"
                  ? "bg-emerald-700 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              الأعياد الدينية
            </button>
            <button
              onClick={() => setFilterType("national")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                filterType === "national"
                  ? "bg-emerald-700 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              الأعياد الوطنية
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-semibold">تنسيق العرض:</span>
            <button
              onClick={() => setCardMode("full_table")}
              className={`px-2.5 py-1 rounded-md font-semibold transition cursor-pointer ${
                cardMode === "full_table"
                  ? "bg-slate-800 text-white"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              الجدول الوزاري الكامل
            </button>
            <button
              onClick={() => setCardMode("pocket")}
              className={`px-2.5 py-1 rounded-md font-semibold transition cursor-pointer ${
                cardMode === "pocket"
                  ? "bg-slate-800 text-white"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              بطاقة الجيب المصغرة
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
            <span className="text-[11px] text-emerald-800 font-semibold block">مجموع أيام العطل</span>
            <span className="text-xl font-black text-emerald-950 font-mono">{totalDays} يوماً</span>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
            <span className="text-[11px] text-blue-800 font-semibold block">عدد الفترات البينية</span>
            <span className="text-xl font-black text-blue-950 font-mono">4 عطل بينية</span>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
            <span className="text-[11px] text-amber-800 font-semibold block">عطلة منتصف السنة</span>
            <span className="text-xl font-black text-amber-950 font-mono">8 أيام (يناير)</span>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-center">
            <span className="text-[11px] text-purple-800 font-semibold block">الموسم الدراسي</span>
            <span className="text-xl font-black text-purple-950 font-mono">2026 - 2027</span>
          </div>
        </div>
      </div>

      {/* Official A4 Printable Calendar Sheet */}
      <div className="print-sheet bg-white border border-slate-300 rounded-2xl p-6 md:p-8 shadow-xs max-w-5xl mx-auto">
        {/* Printable Ministerial Header */}
        <div className="border-b-2 border-slate-800 pb-3 mb-4">
          <div className="flex items-start justify-between text-xs text-slate-700 font-semibold">
            <div>
              <p className="font-bold text-slate-900">المملكة المغربية</p>
              <p>وزارة التربية الوطنية والتعليم الأولي والرياضة</p>
              <p>{teacherProfile.academy}</p>
              <p>{teacherProfile.directorate}</p>
              <p>المؤسسة: <strong>{teacherProfile.institution}</strong></p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto rounded-full border-2 border-amber-600 bg-amber-50 flex items-center justify-center text-lg font-bold text-amber-700 mb-0.5">
                ★
              </div>
              <h2 className="text-base md:text-lg font-black font-cairo text-slate-900">
                لائحة العطل المدرسية بالتعليم الابتدائي
              </h2>
              <p className="text-xs font-bold text-emerald-800">
                المقرر الوزاري لتنظيم السنة الدراسية 2026 / 2027
              </p>
            </div>

            <div className="text-left" dir="ltr">
              <p className="font-bold text-slate-900">ROYAUME DU MAROC</p>
              <p>Calendrier des Vacances Scolaires</p>
              <p>Année Scolaire: <strong>2026 / 2027</strong></p>
              <p className="text-[11px] text-slate-500">Total: {totalDays} Jours</p>
            </div>
          </div>
        </div>

        {/* Table View */}
        {cardMode === "full_table" ? (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-right border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100 text-slate-800">
                  <th className="border border-slate-300 p-2 text-center w-10">#</th>
                  <th className="border border-slate-300 p-2">العطلة المدرسية والمناسبة</th>
                  <th className="border border-slate-300 p-2" dir="ltr">Désignation</th>
                  <th className="border border-slate-300 p-2 text-center w-36">من (تاريخ البداية)</th>
                  <th className="border border-slate-300 p-2 text-center w-36">إلى (تاريخ النهاية)</th>
                  <th className="border border-slate-300 p-2 text-center w-24">عدد الأيام</th>
                  <th className="border border-slate-300 p-2 text-center w-36">التاريخ الهجري / ملاحظة</th>
                </tr>
              </thead>
              <tbody>
                {filteredHolidays.map((holiday, idx) => (
                  <tr
                    key={holiday.id}
                    className={`hover:bg-slate-50 ${
                      holiday.type === "periodique" ? "bg-emerald-50/20" : ""
                    }`}
                  >
                    <td className="border border-slate-300 p-2 text-center font-bold text-slate-500">
                      {idx + 1}
                    </td>
                    <td className="border border-slate-300 p-2 font-bold text-slate-900">
                      {holiday.nameAr}
                    </td>
                    <td className="border border-slate-300 p-2 text-slate-600 font-medium" dir="ltr">
                      {holiday.nameFr}
                    </td>
                    <td className="border border-slate-300 p-2 text-center font-mono font-semibold text-slate-800" dir="ltr">
                      {holiday.startDate}
                    </td>
                    <td className="border border-slate-300 p-2 text-center font-mono font-semibold text-slate-800" dir="ltr">
                      {holiday.endDate}
                    </td>
                    <td className="border border-slate-300 p-2 text-center font-black text-emerald-800 bg-slate-50">
                      {holiday.durationDays} {holiday.durationDays > 1 ? "أيام" : "يوم"}
                    </td>
                    <td className="border border-slate-300 p-2 text-center text-slate-500 text-[11px]">
                      {holiday.hijriDate || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-100 font-black text-slate-900">
                  <td colSpan={5} className="border border-slate-300 p-2 text-center">
                    مجموع أيام العطل المدرسية المقررة خلال الموسم الدراسي:
                  </td>
                  <td className="border border-slate-300 p-2 text-center text-emerald-800 font-mono text-sm">
                    {totalDays} يوماً
                  </td>
                  <td className="border border-slate-300 p-2 text-center text-xs text-slate-500">
                    54 يوماً معتمدة
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          /* Pocket Card Layout (Grid for easy cut & fold) */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredHolidays.map((holiday) => (
              <div
                key={holiday.id}
                className="border border-slate-300 rounded-lg p-3 bg-white flex items-center justify-between shadow-2xs"
              >
                <div>
                  <div className="font-bold text-xs text-slate-900">{holiday.nameAr}</div>
                  <div className="text-[10px] text-slate-500" dir="ltr">{holiday.nameFr}</div>
                  <div className="text-[11px] font-mono text-emerald-800 mt-1" dir="ltr">
                    {holiday.startDate} ◄ {holiday.endDate}
                  </div>
                </div>
                <div className="text-center bg-slate-100 rounded-lg p-2 min-w-[50px]">
                  <span className="font-black text-sm text-slate-900 block font-mono">
                    {holiday.durationDays}
                  </span>
                  <span className="text-[9px] text-slate-500">أيام</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Notes */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div>
            <span>تراعى التواريخ الفعلية للأعياد الدينية حسب ثبوت رؤية الهلال من طرف وزارة الأوقاف والشؤون الإسلامية.</span>
          </div>
          <div className="font-bold text-slate-800">
            وثائق الأستاذ • مدرسة الريادة 2026/2027
          </div>
        </div>
      </div>
    </div>
  );
};
