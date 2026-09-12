import React, { useState } from "react";
import { Printer, Edit3, RotateCcw, Sparkles, Plus, Trash2, Layers, CheckSquare } from "lucide-react";
import { TeacherProfile, ExplicitTeachingDay, ExplicitTeachingRow } from "../../types";
import { INITIAL_EXPLICIT_TEACHING_DATA } from "../../data/dailyLogData";

interface ExplicitTeachingModelProps {
  teacherProfile: TeacherProfile;
}

export const ExplicitTeachingModel: React.FC<ExplicitTeachingModelProps> = ({ teacherProfile }) => {
  const [dayData, setDayData] = useState<ExplicitTeachingDay>(INITIAL_EXPLICIT_TEACHING_DATA);
  const [isEditing, setIsEditing] = useState(false);
  const [schoolYear, setSchoolYear] = useState("2026/2027");

  const handleUpdateRow = (index: number, field: keyof ExplicitTeachingRow, val: any) => {
    const updatedRows = [...dayData.rows];
    updatedRows[index] = { ...updatedRows[index], [field]: val };
    setDayData({ ...dayData, rows: updatedRows });
  };

  const handleAddLessonRow = () => {
    const newRow: ExplicitTeachingRow = {
      id: `r_${Date.now()}`,
      timeSlot: "12:00 - 12:45",
      group: "الفوج 1",
      subject: "مادة دراسية",
      topic: "عنوان وموضوع الدرس البيداغوجي الصريح",
      session: "الحصة 1",
      duration: "45 د",
      percentageAchieved: "85%",
      mindMap: "النمذجة ➔ الممارسة الموجهة ➔ الممارسة المستقلة",
    };
    setDayData({ ...dayData, rows: [...dayData.rows, newRow] });
  };

  const handleAddChangeRow = () => {
    const changeRow: ExplicitTeachingRow = {
      id: `r_ch_${Date.now()}`,
      timeSlot: "10:00",
      group: "-",
      subject: "تغيير الفوجين",
      topic: "تبادل الأفواج الدراسية وتجهيز الوسائل التعليمية",
      session: "-",
      duration: "5 د",
      percentageAchieved: "-",
      mindMap: "-",
      isGroupChange: true,
    };
    setDayData({ ...dayData, rows: [...dayData.rows, changeRow] });
  };

  const handleAddBreakRow = () => {
    const breakRow: ExplicitTeachingRow = {
      id: `r_br_${Date.now()}`,
      timeSlot: "10:50 - 11:05",
      group: "-",
      subject: "استراحة",
      topic: "فترة الاستراحة والتنفس (15 دقيقة)",
      session: "-",
      duration: "15 د",
      percentageAchieved: "-",
      mindMap: "-",
      isBreak: true,
      breakDuration: "15 دقيقة",
    };
    setDayData({ ...dayData, rows: [...dayData.rows, breakRow] });
  };

  const handleDeleteRow = (index: number) => {
    if (dayData.rows.length <= 1) return;
    setDayData({ ...dayData, rows: dayData.rows.filter((_, i) => i !== index) });
  };

  const handleReset = () => {
    setDayData(INITIAL_EXPLICIT_TEACHING_DATA);
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Action Header */}
      <div className="no-print bg-white rounded-2xl p-4 md:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs px-2.5 py-0.5 rounded-full">
              النموذج 6 • التدريس الصريح
            </span>
            <span className="text-xs text-slate-500 font-semibold">الموسم الدراسي {schoolYear}</span>
          </div>
          <h2 className="text-lg md:text-xl font-black text-slate-900 font-cairo mt-1">
            مذكرة التدريس الصريح والخطاطة الذهنية والتوقيت الوزاري
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            توزيع حصص التدريس الصريح مع خانات الخطاطة الذهنية، نسب التحقق، فترات تبادل الفوجين والاستراحة، وتتبع التعثرات.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
              isEditing
                ? "bg-emerald-700 text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5 text-amber-500" />
            <span>{isEditing ? "معاينة الطباعة" : "تعديل جدول الحصص"}</span>
          </button>

          <button
            onClick={handleReset}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-slate-300 cursor-pointer transition"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>استعادة الافتراضي</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs md:text-sm flex items-center gap-2 shadow-sm cursor-pointer transition"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة الورقة A4</span>
          </button>
        </div>
      </div>

      {/* Editor Controls */}
      {isEditing && (
        <div className="no-print bg-emerald-50/60 border-2 border-emerald-200 rounded-2xl p-5 space-y-4 text-xs">
          <div className="flex items-center gap-2 text-emerald-950 font-black text-sm">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>تخصيص بيانات اليوم والصفوف التعليمية</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">تاريخ اليوم:</label>
              <input
                type="text"
                value={dayData.dateStr}
                onChange={(e) => setDayData({ ...dayData, dateStr: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded px-2.5 py-1"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">المرحلة:</label>
              <input
                type="text"
                value={dayData.phase}
                onChange={(e) => setDayData({ ...dayData, phase: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded px-2.5 py-1"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">الأسبوع السنوي / المرحلي:</label>
              <input
                type="text"
                value={dayData.annualWeek}
                onChange={(e) => setDayData({ ...dayData, annualWeek: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded px-2.5 py-1"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">اليوم التربوي:</label>
              <input
                type="text"
                value={dayData.pedagogicalDay}
                onChange={(e) => setDayData({ ...dayData, pedagogicalDay: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded px-2.5 py-1"
              />
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-2">
            <button
              onClick={handleAddLessonRow}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> إضافة حصة دراسية
            </button>
            <button
              onClick={handleAddChangeRow}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> إضافة صف تغيير الفوجين
            </button>
            <button
              onClick={handleAddBreakRow}
              className="bg-slate-700 hover:bg-slate-800 text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> إضافة صف استراحة
            </button>
          </div>
        </div>
      )}

      {/* Printable Sheet */}
      <div className="print-sheet bg-white w-full max-w-[794px] mx-auto min-h-[1123px] p-6 md:p-8 rounded-2xl shadow-xl border border-slate-400 text-slate-900 font-cairo flex flex-col justify-between">
        <div className="space-y-4">
          {/* Official Ministry Wide Logo & Metadata Header */}
          <div className="border-b-2 border-slate-900 pb-2 mb-2 text-xs">
            <div className="flex justify-center mb-1.5">
              <img
                src="/morocco-ministry-logo.png"
                alt="وزارة التربية الوطنية والتعليم الأولي والرياضة"
                className="h-12 md:h-14 w-auto max-w-full object-contain"
              />
            </div>
            <div className="flex items-center justify-between font-bold text-slate-800 text-[11px] px-1">
              <div className="text-right space-y-0.5">
                <p><span className="text-slate-600 font-medium">الأكاديمية الجهوية للتربية والتكوين :</span> {teacherProfile.academy || "...................................."}</p>
                <p><span className="text-slate-600 font-medium">المديرية الإقليمية :</span> {teacherProfile.directorate || "...................................."}</p>
              </div>
              <div className="text-left space-y-0.5">
                <p><span className="text-slate-600 font-medium">المؤسسة التعليمية :</span> {teacherProfile.institution || "...................................."}</p>
                <p><span className="text-slate-600 font-medium">الأستاذ(ة) :</span> {teacherProfile.fullNameAr || "...................................."}</p>
              </div>
            </div>
          </div>

          {/* Header Metadata Ribbon */}
          <div className="border-2 border-slate-900 rounded-xl p-2.5 bg-slate-50/80 text-xs">
            <div className="flex items-center justify-between border-b border-slate-300 pb-1.5 mb-1.5 font-bold">
              <div>
                <span className="text-slate-950 font-black">تاريخ اليوم : </span>
                <span className="text-slate-800">{dayData.dateStr}</span>
              </div>
              <div className="text-left font-mono text-[10px] text-slate-500">
                الموسم الدراسي {schoolYear}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-bold">
              <div className="bg-white border border-slate-300 rounded px-2 py-0.5">
                <span className="text-slate-500">المرحلة: </span>
                <span className="text-slate-900">{dayData.phase}</span>
              </div>
              <div className="bg-white border border-slate-300 rounded px-2 py-0.5">
                <span className="text-slate-500">الأسبوع السنوي: </span>
                <span className="text-slate-900">{dayData.annualWeek}</span>
              </div>
              <div className="bg-white border border-slate-300 rounded px-2 py-0.5">
                <span className="text-slate-500">الأسبوع المرحلي: </span>
                <span className="text-slate-900">{dayData.phaseWeek}</span>
              </div>
              <div className="bg-white border border-slate-300 rounded px-2 py-0.5">
                <span className="text-slate-500">اليوم التربوي: </span>
                <span className="text-slate-900">{dayData.pedagogicalDay}</span>
              </div>
            </div>
          </div>

          {/* Master Explicit Teaching Table */}
          <div className="border-2 border-slate-900 rounded-xl overflow-hidden shadow-xs">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-amber-400 text-slate-950 border-b-2 border-slate-900 text-center font-black text-[11px]">
                  <th className="py-2 px-1 border-l border-slate-900 w-20">الفترة الزمنية</th>
                  <th className="py-2 px-1 border-l border-slate-900 w-12">الفوج</th>
                  <th className="py-2 px-1 border-l border-slate-900 w-16">المادة</th>
                  <th className="py-2 px-2 border-l border-slate-900 text-right">الموضوع / النشاط</th>
                  <th className="py-2 px-1 border-l border-slate-900 w-10">الحصة</th>
                  <th className="py-2 px-1 border-l border-slate-900 w-10">المدة</th>
                  <th className="py-2 px-1 border-l border-slate-900 w-14">نسبة التحقق</th>
                  <th className="py-2 px-2 w-32">الخطاطة الذهنية</th>
                </tr>
              </thead>
              <tbody>
                {dayData.rows.map((row, idx) => {
                  if (row.isGroupChange) {
                    return (
                      <tr key={row.id || idx} className="bg-amber-100/90 border-b border-slate-400 font-bold text-center text-[11px]">
                        <td colSpan={8} className="py-1 text-amber-950">
                          ⟵ تغيير الفوجين ⟶
                        </td>
                      </tr>
                    );
                  }

                  if (row.isBreak) {
                    return (
                      <tr key={row.id || idx} className="bg-yellow-200/80 border-b border-slate-400 font-bold text-center text-[11px]">
                        <td colSpan={8} className="py-1 text-slate-950">
                          ☕ استراحة ...... {row.breakDuration || "15 دقيقة"}
                        </td>
                      </tr>
                    );
                  }

                  return (
                    <tr key={row.id || idx} className="border-b border-slate-300 hover:bg-slate-50 text-[11px]">
                      {/* Timing */}
                      <td className="p-1.5 border-l border-slate-300 text-center font-mono font-bold text-slate-800">
                        {isEditing ? (
                          <input
                            type="text"
                            value={row.timeSlot}
                            onChange={(e) => handleUpdateRow(idx, "timeSlot", e.target.value)}
                            className="w-full text-center border rounded text-[10px]"
                          />
                        ) : (
                          row.timeSlot
                        )}
                      </td>

                      {/* Group */}
                      <td className="p-1.5 border-l border-slate-300 text-center font-bold text-slate-900">
                        {isEditing ? (
                          <input
                            type="text"
                            value={row.group}
                            onChange={(e) => handleUpdateRow(idx, "group", e.target.value)}
                            className="w-full text-center border rounded text-[10px]"
                          />
                        ) : (
                          row.group
                        )}
                      </td>

                      {/* Subject */}
                      <td className="p-1.5 border-l border-slate-300 text-center font-black text-slate-900">
                        {isEditing ? (
                          <input
                            type="text"
                            value={row.subject}
                            onChange={(e) => handleUpdateRow(idx, "subject", e.target.value)}
                            className="w-full text-center border rounded text-[10px]"
                          />
                        ) : (
                          row.subject
                        )}
                      </td>

                      {/* Topic */}
                      <td className="p-1.5 border-l border-slate-300 text-right leading-snug">
                        {isEditing ? (
                          <input
                            type="text"
                            value={row.topic}
                            onChange={(e) => handleUpdateRow(idx, "topic", e.target.value)}
                            className="w-full border rounded text-[10px]"
                          />
                        ) : (
                          <span className="text-slate-800">{row.topic}</span>
                        )}
                      </td>

                      {/* Session */}
                      <td className="p-1.5 border-l border-slate-300 text-center text-slate-700">
                        {isEditing ? (
                          <input
                            type="text"
                            value={row.session}
                            onChange={(e) => handleUpdateRow(idx, "session", e.target.value)}
                            className="w-full text-center border rounded text-[10px]"
                          />
                        ) : (
                          row.session
                        )}
                      </td>

                      {/* Duration */}
                      <td className="p-1.5 border-l border-slate-300 text-center text-slate-700 font-mono">
                        {isEditing ? (
                          <input
                            type="text"
                            value={row.duration}
                            onChange={(e) => handleUpdateRow(idx, "duration", e.target.value)}
                            className="w-full text-center border rounded text-[10px]"
                          />
                        ) : (
                          row.duration
                        )}
                      </td>

                      {/* Percentage */}
                      <td className="p-1.5 border-l border-slate-300 text-center font-bold text-emerald-800">
                        {isEditing ? (
                          <input
                            type="text"
                            value={row.percentageAchieved}
                            onChange={(e) => handleUpdateRow(idx, "percentageAchieved", e.target.value)}
                            className="w-full text-center border rounded text-[10px]"
                          />
                        ) : (
                          row.percentageAchieved
                        )}
                      </td>

                      {/* Mind Map */}
                      <td className="p-1.5 text-[10px] text-slate-600 leading-tight">
                        {isEditing ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="text"
                              value={row.mindMap}
                              onChange={(e) => handleUpdateRow(idx, "mindMap", e.target.value)}
                              className="w-full border rounded text-[10px]"
                            />
                            <button
                              onClick={() => handleDeleteRow(idx)}
                              className="text-rose-500 hover:text-rose-700 p-0.5"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          row.mindMap
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Teacher Special Frame: Observed Difficulties / General Notes */}
          <div className="border-2 border-slate-900 rounded-xl p-3 bg-slate-50 text-xs">
            <div className="font-black text-slate-950 mb-1">
              إطار خاص بالأستاذ(ة) - المادة والتعثرات المرصودة / ملاحظات عامة :
            </div>
            {isEditing ? (
              <textarea
                value={dayData.teacherNotes}
                onChange={(e) => setDayData({ ...dayData, teacherNotes: e.target.value })}
                rows={3}
                className="w-full bg-white border border-slate-300 rounded p-1.5 text-xs"
              />
            ) : (
              <p className="text-slate-700 text-[11px] leading-relaxed min-h-[48px]">
                {dayData.teacherNotes}
              </p>
            )}
          </div>
        </div>

        {/* Footer Teacher, Director & Inspector Stamp Boxes */}
        <div className="pt-4 border-t border-slate-300 mt-4">
          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            <div className="border border-slate-400 bg-slate-50 rounded-xl p-2.5 h-20 flex flex-col justify-between">
              <span className="font-bold text-slate-900">إطار خاص بالأستاذ(ة)</span>
              <span className="text-[10px] text-slate-500">توقيع وملاحظات الأستاذ(ة)</span>
            </div>
            <div className="border border-slate-400 bg-slate-50 rounded-xl p-2.5 h-20 flex flex-col justify-between">
              <span className="font-bold text-slate-900">إطار خاص بمدير(ة) المؤسسة</span>
              <span className="text-[10px] text-slate-500">تأشيرة وملاحظات الإدارة التربوية</span>
            </div>
            <div className="border border-slate-400 bg-slate-50 rounded-xl p-2.5 h-20 flex flex-col justify-between">
              <span className="font-bold text-slate-900">إطار خاص بالمفتش(ة) التربوي(ة)</span>
              <span className="text-[10px] text-slate-500">تأشيرة وتوجيهات التأطير والمواكبة</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
