import React, { useState } from "react";
import {
  Printer,
  Calendar,
  CheckCircle2,
  Plus,
  Trash2,
  Edit3,
  Sparkles,
  School,
  UserCheck,
  RotateCcw,
  CheckSquare,
  Square,
  BookmarkCheck,
  FileSpreadsheet,
} from "lucide-react";
import { TeacherProfile } from "../../types";
import { INITIAL_KICKOFF_DATA } from "../../data/dailyLogData";

interface KickoffProceduresModelProps {
  teacherProfile: TeacherProfile;
}

export const KickoffProceduresModel: React.FC<KickoffProceduresModelProps> = ({ teacherProfile }) => {
  const [kickoffData, setKickoffData] = useState(INITIAL_KICKOFF_DATA);
  const [schoolName, setSchoolName] = useState(teacherProfile.school || "مدرسة الريادة النموذجية");
  const [directorName, setDirectorName] = useState(teacherProfile.directorName || "مدير(ة) المؤسسة");
  const [inspectorName, setInspectorName] = useState(teacherProfile.inspectorName || "المفتش(ة) المواكب(ة)");
  const [teacherName, setTeacherName] = useState(teacherProfile.fullName || "الأستاذ(ة)");
  const [schoolYear, setSchoolYear] = useState("2026/2027");
  const [isEditMode, setIsEditMode] = useState(false);

  // New operation temporary state
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);
  const [newDayName, setNewDayName] = useState("الأحد");
  const [newDateStr, setNewDateStr] = useState("13 شتنبر 2026");
  const [newTaskText, setNewTaskText] = useState("");

  const handleToggleTaskDone = (weekIdx: number, opIdx: number) => {
    const updated = JSON.parse(JSON.stringify(kickoffData));
    updated.weeks[weekIdx].operations[opIdx].isCompleted = !updated.weeks[weekIdx].operations[opIdx].isCompleted;
    setKickoffData(updated);
  };

  const handleUpdateTaskText = (weekIdx: number, opIdx: number, taskIdx: number, newText: string) => {
    const updated = JSON.parse(JSON.stringify(kickoffData));
    updated.weeks[weekIdx].operations[opIdx].tasks[taskIdx] = newText;
    setKickoffData(updated);
  };

  const handleAddTaskToOp = (weekIdx: number, opIdx: number) => {
    const updated = JSON.parse(JSON.stringify(kickoffData));
    updated.weeks[weekIdx].operations[opIdx].tasks.push("عملية تنظيمية / تربوية جديدة...");
    setKickoffData(updated);
  };

  const handleDeleteTask = (weekIdx: number, opIdx: number, taskIdx: number) => {
    const updated = JSON.parse(JSON.stringify(kickoffData));
    if (updated.weeks[weekIdx].operations[opIdx].tasks.length > 1) {
      updated.weeks[weekIdx].operations[opIdx].tasks.splice(taskIdx, 1);
      setKickoffData(updated);
    }
  };

  const handleDeleteOperation = (weekIdx: number, opIdx: number) => {
    const updated = JSON.parse(JSON.stringify(kickoffData));
    updated.weeks[weekIdx].operations.splice(opIdx, 1);
    setKickoffData(updated);
  };

  const handleAddOperation = () => {
    if (!newTaskText.trim()) return;
    const updated = JSON.parse(JSON.stringify(kickoffData));
    updated.weeks[selectedWeekIndex].operations.push({
      dayName: newDayName,
      dateStr: newDateStr,
      isCompleted: false,
      tasks: [newTaskText.trim()],
    });
    setKickoffData(updated);
    setNewTaskText("");
  };

  const handleReset = () => {
    setKickoffData(INITIAL_KICKOFF_DATA);
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Control Bar */}
      <div className="no-print bg-white rounded-2xl p-4 md:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs px-2.5 py-0.5 rounded-full">
              النموذج 1 • حصري
            </span>
            <span className="text-xs text-slate-500 font-semibold">الموسم الدراسي {schoolYear}</span>
          </div>
          <h2 className="text-lg md:text-xl font-black text-slate-900 font-cairo mt-1">
            جدول ومذكرة إجراءات بداية السنة الدراسية وتمرير روائز الموضعة
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            النموذج المعتمد رسمياً لتوثيق محطات الدخول المدرسي، توقيع المحاضر، الورشات، وتمرير روائز TaRL ومسك مسار.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
              isEditMode
                ? "bg-emerald-700 text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5 text-amber-500" />
            <span>{isEditMode ? "معاينة الطباعة" : "تعديل وتخصيص البيانات"}</span>
          </button>

          <button
            onClick={handleReset}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-slate-300 cursor-pointer transition"
            title="استعادة البيانات الأصلية"
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

      {/* Editor Controls if isEditMode */}
      {isEditMode && (
        <div className="no-print bg-amber-50/60 border-2 border-amber-200 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 text-amber-950 font-black text-sm">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>تخصيص معلومات المؤسسة والأستاذ(ة) والعمليات</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">اسم المؤسسة التعليمية:</label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-900 focus:outline-emerald-600"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">اسم الأستاذ(ة):</label>
              <input
                type="text"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-900 focus:outline-emerald-600"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">اسم مدير(ة) المؤسسة:</label>
              <input
                type="text"
                value={directorName}
                onChange={(e) => setDirectorName(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-900 focus:outline-emerald-600"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">اسم المفتش(ة) التربوي:</label>
              <input
                type="text"
                value={inspectorName}
                onChange={(e) => setInspectorName(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-900 focus:outline-emerald-600"
              />
            </div>
          </div>

          {/* Add custom operation form */}
          <div className="pt-3 border-t border-amber-200/80 flex flex-wrap items-end gap-3 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">إضافة إلى المحطة:</label>
              <select
                value={selectedWeekIndex}
                onChange={(e) => setSelectedWeekIndex(Number(e.target.value))}
                className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-900"
              >
                {kickoffData.weeks.map((w, i) => (
                  <option key={i} value={i}>
                    {w.weekTitle}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">اليوم:</label>
              <input
                type="text"
                value={newDayName}
                onChange={(e) => setNewDayName(e.target.value)}
                className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 w-24 text-slate-900"
                placeholder="الأربعاء"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">التاريخ:</label>
              <input
                type="text"
                value={newDateStr}
                onChange={(e) => setNewDateStr(e.target.value)}
                className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 w-32 text-slate-900"
                placeholder="14 شتنبر 2026"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-slate-700 font-bold mb-1">نص العملية / المهمة:</label>
              <input
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-900"
                placeholder="اكتب المهمة أو العملية التنظيمية هنا..."
              />
            </div>
            <button
              onClick={handleAddOperation}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة يوم / عملية</span>
            </button>
          </div>
        </div>
      )}

      {/* Printable Sheet (Standard A4 Page 210x297mm) */}
      <div className="print-sheet bg-white w-full max-w-[794px] mx-auto min-h-[1123px] p-6 md:p-8 rounded-2xl shadow-xl border border-slate-300 text-slate-900 font-cairo flex flex-col justify-between">
        <div className="space-y-4">
          {/* Official Ministry Wide Logo & Metadata Header */}
          <div className="border-b-2 border-slate-900 pb-2 mb-3 text-xs">
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
                <p><span className="text-slate-600 font-medium">المؤسسة التعليمية :</span> {schoolName || "...................................."}</p>
                <p><span className="text-slate-600 font-medium">الأستاذ(ة) :</span> {teacherName || "...................................."}</p>
              </div>
            </div>
          </div>

          <div className="text-center space-y-2 pb-2">
            {/* Official Title Ribbon */}
            <div className="inline-block border-2 border-slate-950 bg-amber-100 px-6 py-1.5 rounded-xl shadow-xs">
              <h1 className="text-lg md:text-xl font-black text-slate-950 tracking-wide font-cairo">
                إجراءات بداية السنة الدراسية
              </h1>
            </div>

            {/* Sub-ribbon for School Year */}
            <div className="pt-0.5">
              <div className="inline-block bg-yellow-300 border border-slate-900 px-5 py-0.5 rounded-lg text-slate-950 font-black text-xs">
                الموسم الدراسي: {schoolYear}
              </div>
            </div>
          </div>

          {/* Master Table */}
          <div className="space-y-4 pt-1">
            {kickoffData.weeks.map((week, weekIdx) => (
              <div key={weekIdx} className="border-2 border-slate-900 rounded-xl overflow-hidden shadow-xs">
                {/* Main Table Structure */}
                <table className="w-full border-collapse text-right text-xs">
                  <thead>
                    <tr className="bg-amber-400 text-slate-950 border-b-2 border-slate-900 font-black">
                      <th className="py-1.5 px-3 border-l-2 border-slate-900 text-center w-28">الأسبوع / المحور</th>
                      <th className="py-1.5 px-3 border-l-2 border-slate-900 text-center w-36">التاريخ</th>
                      <th className="py-1.5 px-4 text-right">العمليات والمهام الإجرائية</th>
                    </tr>
                  </thead>
                  <tbody>
                    {week.operations.map((op, opIdx) => (
                      <tr
                        key={opIdx}
                        className={`border-b border-slate-300 hover:bg-amber-50/30 transition ${
                          op.isCompleted ? "bg-emerald-50/20" : "bg-white"
                        }`}
                      >
                        {/* Vertical Spanning Header for Week on first row */}
                        {opIdx === 0 && (
                          <td
                            rowSpan={week.operations.length}
                            className="border-l-2 border-slate-900 bg-amber-50/80 font-black text-slate-900 text-center px-2 py-4 align-middle select-none text-[11px] leading-relaxed"
                          >
                            <div className="transform -rotate-90 sm:rotate-0 whitespace-nowrap sm:whitespace-normal font-serif">
                              {week.weekTitle}
                            </div>
                          </td>
                        )}

                        {/* Date & Day Column */}
                        <td className="border-l-2 border-slate-900 font-bold text-slate-900 px-3 py-2 text-center align-top bg-slate-50/50 text-[11px]">
                          <div className="flex flex-col items-center justify-center">
                            <span className="text-slate-950 font-black">{op.dayName}</span>
                            <span className="font-mono text-[10px] text-slate-600 dir-ltr">{op.dateStr}</span>
                          </div>
                        </td>

                        {/* Operations Tasks List Column */}
                        <td className="px-3 py-2 align-top text-[11px] text-slate-800 leading-relaxed">
                          <div className="space-y-1.5">
                            {op.tasks.map((task, tIdx) => (
                              <div key={tIdx} className="flex items-start gap-1.5 group">
                                <span className="text-amber-700 font-bold shrink-0 mt-0.5 select-none">☜</span>
                                {isEditMode ? (
                                  <div className="flex-1 flex items-center gap-1">
                                    <input
                                      type="text"
                                      value={task}
                                      onChange={(e) => handleUpdateTaskText(weekIdx, opIdx, tIdx, e.target.value)}
                                      className="w-full bg-amber-50/50 border border-amber-300 rounded px-1.5 py-0.5 text-slate-900 text-[11px]"
                                    />
                                    <button
                                      onClick={() => handleDeleteTask(weekIdx, opIdx, tIdx)}
                                      className="text-rose-500 hover:text-rose-700 p-0.5"
                                      title="حذف هذه المهمة"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>
                                ) : (
                                  <span className="flex-1 font-medium">{task}</span>
                                )}
                              </div>
                            ))}

                            {isEditMode && (
                              <div className="pt-1 flex items-center gap-2">
                                <button
                                  onClick={() => handleAddTaskToOp(weekIdx, opIdx)}
                                  className="text-[10px] text-emerald-800 font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
                                >
                                  <Plus className="w-3 h-3" /> إضافة سطر
                                </button>
                                <button
                                  onClick={() => handleDeleteOperation(weekIdx, opIdx)}
                                  className="text-[10px] text-rose-700 font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
                                >
                                  <Trash2 className="w-3 h-3" /> حذف هذا اليوم
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Official Signature Boxes */}
        <div className="pt-6 border-t border-slate-300 mt-6">
          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            <div className="border border-slate-400 bg-slate-50/80 rounded-xl p-2.5 h-20 flex flex-col justify-between">
              <span className="font-bold text-slate-900">توقيع الأستاذ(ة)</span>
              <span className="text-[10px] text-slate-500">{teacherName}</span>
            </div>

            <div className="border border-slate-400 bg-slate-50/80 rounded-xl p-2.5 h-20 flex flex-col justify-between">
              <span className="font-bold text-slate-900">تأشيرة مدير(ة) المؤسسة</span>
              <span className="text-[10px] text-slate-500">{directorName}</span>
            </div>

            <div className="border border-slate-400 bg-slate-50/80 rounded-xl p-2.5 h-20 flex flex-col justify-between">
              <span className="font-bold text-slate-900">تأشيرة المفتش(ة) المواكب(ة)</span>
              <span className="text-[10px] text-slate-500">{inspectorName}</span>
            </div>
          </div>

          <div className="text-center pt-3 text-[10px] text-slate-500 font-mono">
            المذكرة اليومية المعتمدة • شبكة تنظيم وتوثيق تدابير بداية السنة الدراسية ومقاربة TaRL • {schoolYear}
          </div>
        </div>
      </div>
    </div>
  );
};
