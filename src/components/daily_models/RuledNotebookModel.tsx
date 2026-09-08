import React, { useState } from "react";
import { Printer, Edit3, RotateCcw, Sparkles } from "lucide-react";
import { TeacherProfile } from "../../types";

interface RuledNotebookModelProps {
  teacherProfile: TeacherProfile;
}

export const RuledNotebookModel: React.FC<RuledNotebookModelProps> = ({ teacherProfile }) => {
  const [dateStr, setDateStr] = useState("الاثنين 21 شتنبر 2026");
  const [hijriDateStr, setHijriDateStr] = useState("09 ربيع الأول 1448");
  const [schoolYear, setSchoolYear] = useState("2026/2027");

  return (
    <div className="space-y-6" dir="rtl">
      {/* Control Bar */}
      <div className="no-print bg-white rounded-2xl p-4 md:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-purple-100 text-purple-900 border border-purple-300 font-bold text-xs px-2.5 py-0.5 rounded-full">
              النموذج 7 • المذكرة المسطرة بالكراس
            </span>
            <span className="text-xs text-slate-500 font-semibold">الموسم الدراسي {schoolYear}</span>
          </div>
          <h2 className="text-lg md:text-xl font-black text-slate-900 font-cairo mt-1">
            المذكرة اليومية المسطرة (عربية + رياضيات بسطور كراسية للتدوين)
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            نموذج مخصص للطباعة والكتابة المباشرة مع سطور كراسية دقيقة ومربعات مخصصة للأنشطة الأربعة.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs md:text-sm flex items-center gap-2 shadow-sm cursor-pointer transition"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة الورقة A4</span>
          </button>
        </div>
      </div>

      {/* Sheet */}
      <div className="print-sheet bg-white w-full max-w-[794px] mx-auto min-h-[1123px] p-6 md:p-8 rounded-2xl shadow-xl border border-slate-400 text-slate-900 font-cairo flex flex-col justify-between">
        <div className="space-y-3">
          {/* Top Header */}
          <div className="border-2 border-slate-900 rounded-xl p-2 bg-slate-50 flex items-center justify-between text-xs font-bold">
            <div>
              <span>تاريخ اليوم : </span>
              <span className="text-slate-800">{dateStr}</span>
            </div>
            <div>
              <span>الموافق لـ : </span>
              <span className="text-slate-800">{hijriDateStr}</span>
            </div>
          </div>

          {/* Master 2 Columns: Arabic & Math */}
          <div className="border-2 border-slate-900 rounded-xl overflow-hidden text-xs">
            {/* Top info row */}
            <div className="grid grid-cols-2 divide-x divide-x-reverse divide-slate-900 border-b-2 border-slate-900 text-center font-bold text-[11px] bg-slate-100">
              <div className="p-1.5 flex justify-around">
                <span>المسار: ............</span>
                <span>اللبنة: ............</span>
                <span>الحصة: ......</span>
              </div>
              <div className="p-1.5 flex justify-around">
                <span>المسار: ............</span>
                <span>اللبنة: ............</span>
                <span>الحصة: ......</span>
              </div>
            </div>

            {/* Objectives Box */}
            <div className="grid grid-cols-2 divide-x divide-x-reverse divide-slate-900 border-b-2 border-slate-900 bg-white min-h-[70px]">
              <div className="p-2 space-y-1">
                <div className="font-bold text-slate-950">الأهداف (اللغة العربية):</div>
                <div className="border-b border-dashed border-blue-200 h-4"></div>
                <div className="border-b border-dashed border-blue-200 h-4"></div>
              </div>
              <div className="p-2 space-y-1">
                <div className="font-bold text-slate-950">الأهداف (الرياضيات):</div>
                <div className="border-b border-dashed border-blue-200 h-4"></div>
                <div className="border-b border-dashed border-blue-200 h-4"></div>
              </div>
            </div>

            {/* Activities 1 to 4 with ruled lines */}
            <div className="grid grid-cols-12 divide-x divide-x-reverse divide-slate-900 text-[11px]">
              {/* Timing Column */}
              <div className="col-span-1 p-1 bg-slate-50 text-center font-bold flex flex-col justify-around text-[10px]">
                <div>التوقيت</div>
                <div>من: ....</div>
                <div>إلى: ....</div>
              </div>

              {/* Arabic Activities */}
              <div className="col-span-5 p-2 space-y-3 bg-white">
                <div className="font-black text-center text-emerald-950 border-b pb-1">مضامين الأنشطة الخاصة باللغة العربية</div>
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="space-y-1">
                    <div className="font-bold text-slate-900">نشاط {num}: .............................................</div>
                    <div className="border-b border-blue-200 h-4"></div>
                    <div className="border-b border-blue-200 h-4"></div>
                  </div>
                ))}
              </div>

              {/* Math Activities */}
              <div className="col-span-6 p-2 space-y-3 bg-white">
                <div className="font-black text-center text-amber-950 border-b pb-1">مضامين الأنشطة الخاصة بالرياضيات</div>
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="space-y-1">
                    <div className="font-bold text-slate-900">نشاط {num}: .............................................</div>
                    <div className="border-b border-blue-200 h-4"></div>
                    <div className="border-b border-blue-200 h-4"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Notes & Percentage */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="border-2 border-slate-900 rounded-xl p-2.5 bg-slate-50">
              <div className="flex items-center justify-between font-bold mb-1">
                <span>ملاحظات (اللغة العربية):</span>
                <span className="border border-slate-400 bg-white px-2 py-0.5 rounded text-[10px]">التحقق: %.......</span>
              </div>
              <div className="border-b border-dashed border-slate-300 h-4"></div>
              <div className="border-b border-dashed border-slate-300 h-4"></div>
            </div>

            <div className="border-2 border-slate-900 rounded-xl p-2.5 bg-slate-50">
              <div className="flex items-center justify-between font-bold mb-1">
                <span>ملاحظات (الرياضيات):</span>
                <span className="border border-slate-400 bg-white px-2 py-0.5 rounded text-[10px]">التحقق: %.......</span>
              </div>
              <div className="border-b border-dashed border-slate-300 h-4"></div>
              <div className="border-b border-dashed border-slate-300 h-4"></div>
            </div>
          </div>
        </div>

        {/* Footer Signatures */}
        <div className="pt-4 border-t border-slate-300 mt-4">
          <div className="grid grid-cols-2 gap-4 text-center text-xs">
            <div className="border border-slate-400 bg-slate-50 rounded-xl p-2 h-16 flex flex-col justify-between">
              <span className="font-bold text-slate-900">إطار خاص بالسيد(ة) مدير(ة) المؤسسة</span>
              <span className="text-[10px] text-slate-500">التأشيرة والملاحظات</span>
            </div>
            <div className="border border-slate-400 bg-slate-50 rounded-xl p-2 h-16 flex flex-col justify-between">
              <span className="font-bold text-slate-900">إطار خاص بالسيد(ة) المفتش(ة) المواكب(ة)</span>
              <span className="text-[10px] text-slate-500">التأشيرة والتوجيهات</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
