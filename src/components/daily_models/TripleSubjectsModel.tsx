import React, { useState } from "react";
import { Printer, Edit3, RotateCcw, Sparkles, BookOpen, Calculator, Globe, Plus, Trash2 } from "lucide-react";
import { TeacherProfile, TripleSubjectDayActivity } from "../../types";
import { INITIAL_TRIPLE_SUBJECT_DATA } from "../../data/dailyLogData";

interface TripleSubjectsModelProps {
  teacherProfile: TeacherProfile;
}

export const TripleSubjectsModel: React.FC<TripleSubjectsModelProps> = ({ teacherProfile }) => {
  const [data, setData] = useState<TripleSubjectDayActivity>(INITIAL_TRIPLE_SUBJECT_DATA as any);
  const [isEditing, setIsEditing] = useState(false);
  const [schoolYear, setSchoolYear] = useState("2026/2027");

  const handleChange = (section: "arabic" | "math" | "french", field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [section]: {
        ...(prev as any)[section],
        [field]: value,
      },
    }));
  };

  const handleReset = () => {
    setData(INITIAL_TRIPLE_SUBJECT_DATA as any);
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Action Banner */}
      <div className="no-print bg-white rounded-2xl p-4 md:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-900 border border-blue-300 font-bold text-xs px-2.5 py-0.5 rounded-full">
              النموذج 4 • ثلاثي المواد
            </span>
            <span className="text-xs text-slate-500 font-semibold">الموسم الدراسي {schoolYear}</span>
          </div>
          <h2 className="text-lg md:text-xl font-black text-slate-900 font-cairo mt-1">
            مذكرة المواد الثلاثية المتكاملة (العربية + الرياضيات + Français)
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            تخطيط شامل يجمع محطات الحصة للمواد الأساسية الثلاث في صفحة واحدة نموذجية متكاملة.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
              isEditing
                ? "bg-blue-700 text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5 text-blue-500" />
            <span>{isEditing ? "معاينة الطباعة" : "تعديل محتويات الحصص"}</span>
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

      {/* Editor Panel */}
      {isEditing && (
        <div className="no-print bg-blue-50/70 border-2 border-blue-200 rounded-2xl p-5 space-y-4 text-xs">
          <div className="flex items-center gap-2 text-blue-950 font-black text-sm">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>محرر تفاعلي مباشر للمذكرة اليومية الثلاثية</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">تاريخ اليوم (الميلادي):</label>
              <input
                type="text"
                value={data.dateStr}
                onChange={(e) => setData({ ...data, dateStr: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">الموافق لـ (الهجري):</label>
              <input
                type="text"
                value={data.hijriDateStr || ""}
                onChange={(e) => setData({ ...data, hijriDateStr: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5"
              />
            </div>
          </div>
        </div>
      )}

      {/* Printable Sheet */}
      <div className="print-sheet bg-white w-full max-w-[794px] mx-auto min-h-[1123px] p-6 md:p-8 rounded-2xl shadow-xl border border-slate-400 text-slate-900 font-cairo flex flex-col justify-between">
        <div className="space-y-3">
          {/* Top Date Header Box */}
          <div className="border-2 border-slate-900 rounded-xl p-2.5 flex items-center justify-between text-xs font-bold bg-slate-50/50">
            <div className="flex items-center gap-2">
              <span className="text-slate-950 font-black">التاريخ :</span>
              {isEditing ? (
                <input
                  type="text"
                  value={data.dateStr}
                  onChange={(e) => setData({ ...data, dateStr: e.target.value })}
                  className="bg-white border border-slate-300 rounded px-2 py-0.5 text-xs"
                />
              ) : (
                <span className="text-slate-800">{data.dateStr}</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-950 font-black">الموافق لـ :</span>
              {isEditing ? (
                <input
                  type="text"
                  value={data.hijriDateStr || ""}
                  onChange={(e) => setData({ ...data, hijriDateStr: e.target.value })}
                  className="bg-white border border-slate-300 rounded px-2 py-0.5 text-xs"
                />
              ) : (
                <span className="text-slate-800">{data.hijriDateStr}</span>
              )}
            </div>
          </div>

          {/* SECTION 1: Français */}
          <div className="border-2 border-slate-900 rounded-xl overflow-hidden text-xs">
            <div className="grid grid-cols-12 bg-slate-100 border-b-2 border-slate-900 text-center font-bold text-[11px] py-1">
              <div className="col-span-2 border-l border-slate-900 font-black text-blue-900 flex items-center justify-center">
                Français
              </div>
              <div className="col-span-3 border-l border-slate-900 px-1">
                <span>Parcours: </span>
                <span className="font-normal">{data.french.parcours}</span>
              </div>
              <div className="col-span-4 border-l border-slate-900 px-1">
                <span>Item: </span>
                <span className="font-normal">{data.french.item}</span>
              </div>
              <div className="col-span-3 px-1">
                <span>Séance: </span>
                <span className="font-normal">{data.french.seance}</span>
              </div>
            </div>

            {/* Objective & Timing */}
            <div className="grid grid-cols-12 border-b border-slate-400 bg-white text-[11px]">
              <div className="col-span-2 border-l border-slate-900 p-1.5 bg-slate-50 text-center font-mono">
                <div className="text-[10px] text-slate-500">Horaire</div>
                <div className="font-bold text-slate-900">{data.french.du} - {data.french.a}</div>
              </div>
              <div className="col-span-10 p-1.5 flex items-start gap-1">
                <span className="font-bold text-slate-900 shrink-0">Objectif:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={data.french.objective}
                    onChange={(e) => handleChange("french", "objective", e.target.value)}
                    className="w-full border rounded px-1.5 py-0.5 text-xs"
                  />
                ) : (
                  <span className="text-slate-700">{data.french.objective}</span>
                )}
              </div>
            </div>

            {/* Steps & Observations */}
            <div className="grid grid-cols-12 text-[11px]">
              <div className="col-span-9 p-2 space-y-1 border-l border-slate-900">
                <div className="flex items-start gap-1">
                  <span className="font-bold w-28 shrink-0 text-slate-900">• Rituel:</span>
                  <span className="text-slate-700">{data.french.rituel}</span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="font-bold w-28 shrink-0 text-slate-900">• Vocabulaire:</span>
                  <span className="text-slate-700">{data.french.vocabulaire}</span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="font-bold w-28 shrink-0 text-slate-900">• Lecture - Écriture:</span>
                  <span className="text-slate-700">{data.french.lectureEcriture}</span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="font-bold w-28 shrink-0 text-slate-900">• Pratique autonome:</span>
                  <span className="text-slate-700">{data.french.pratiqueAutonome}</span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="font-bold w-28 shrink-0 text-slate-900">• Jeu:</span>
                  <span className="text-slate-700">{data.french.jeu}</span>
                </div>
              </div>

              <div className="col-span-3 p-2 bg-slate-50/50 flex flex-col justify-between">
                <div className="font-bold text-slate-900 text-[10px] border-b border-slate-300 pb-0.5">Observations:</div>
                <div className="text-[10px] text-slate-600 mt-1">{data.french.observations}</div>
                <div className="border-t border-dashed border-slate-300 pt-1 text-[9px] text-slate-400 text-center">تأشيرة الأستاذ</div>
              </div>
            </div>
          </div>

          {/* SECTION 2: الرياضيات */}
          <div className="border-2 border-slate-900 rounded-xl overflow-hidden text-xs">
            <div className="grid grid-cols-12 bg-amber-50 border-b-2 border-slate-900 text-center font-bold text-[11px] py-1">
              <div className="col-span-2 border-l border-slate-900 font-black text-amber-950 flex items-center justify-center">
                الرياضيات
              </div>
              <div className="col-span-3 border-l border-slate-900 px-1">
                <span>المسار: </span>
                <span className="font-normal">{data.math.path}</span>
              </div>
              <div className="col-span-4 border-l border-slate-900 px-1">
                <span>اللبنة: </span>
                <span className="font-normal">{data.math.levelBlock}</span>
              </div>
              <div className="col-span-3 px-1">
                <span>الحصة: </span>
                <span className="font-normal">{data.math.sessionNumber}</span>
              </div>
            </div>

            {/* Objective & Timing */}
            <div className="grid grid-cols-12 border-b border-slate-400 bg-white text-[11px]">
              <div className="col-span-2 border-l border-slate-900 p-1.5 bg-slate-50 text-center font-mono">
                <div className="text-[10px] text-slate-500">التوقيت</div>
                <div className="font-bold text-slate-900">{data.math.startTime} - {data.math.endTime}</div>
              </div>
              <div className="col-span-10 p-1.5 flex items-start gap-1">
                <span className="font-bold text-slate-900 shrink-0">الهدف:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={data.math.objective}
                    onChange={(e) => handleChange("math", "objective", e.target.value)}
                    className="w-full border rounded px-1.5 py-0.5 text-xs"
                  />
                ) : (
                  <span className="text-slate-700">{data.math.objective}</span>
                )}
              </div>
            </div>

            {/* Steps & Notes */}
            <div className="grid grid-cols-12 text-[11px]">
              <div className="col-span-9 p-2 space-y-1 border-l border-slate-900">
                <div className="flex items-start gap-1">
                  <span className="font-bold w-28 shrink-0 text-slate-900">• حساب ذهني:</span>
                  <span className="text-slate-700">{data.math.mentalMath}</span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="font-bold w-28 shrink-0 text-slate-900">• الأعداد:</span>
                  <span className="text-slate-700">{data.math.numbers}</span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="font-bold w-28 shrink-0 text-slate-900">• العمليات وحل المسائل:</span>
                  <span className="text-slate-700">{data.math.operationsProblems}</span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="font-bold w-28 shrink-0 text-slate-900">• عمل فردي على الكراسة:</span>
                  <span className="text-slate-700">{data.math.workbookActivity}</span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="font-bold w-28 shrink-0 text-slate-900">• لعبة رياضية:</span>
                  <span className="text-slate-700">{data.math.game}</span>
                </div>
              </div>

              <div className="col-span-3 p-2 bg-amber-50/30 flex flex-col justify-between">
                <div className="font-bold text-slate-900 text-[10px] border-b border-slate-300 pb-0.5">ملاحظات:</div>
                <div className="text-[10px] text-slate-600 mt-1">{data.math.notes}</div>
                <div className="border-t border-dashed border-slate-300 pt-1 text-[9px] text-slate-400 text-center">نسبة التحقق: %88</div>
              </div>
            </div>
          </div>

          {/* SECTION 3: اللغة العربية */}
          <div className="border-2 border-slate-900 rounded-xl overflow-hidden text-xs">
            <div className="grid grid-cols-12 bg-emerald-50 border-b-2 border-slate-900 text-center font-bold text-[11px] py-1">
              <div className="col-span-2 border-l border-slate-900 font-black text-emerald-950 flex items-center justify-center">
                اللغة العربية
              </div>
              <div className="col-span-3 border-l border-slate-900 px-1">
                <span>المسار: </span>
                <span className="font-normal">{data.arabic.path}</span>
              </div>
              <div className="col-span-4 border-l border-slate-900 px-1">
                <span>اللبنة: </span>
                <span className="font-normal">{data.arabic.levelBlock}</span>
              </div>
              <div className="col-span-3 px-1">
                <span>الحصة: </span>
                <span className="font-normal">{data.arabic.sessionNumber}</span>
              </div>
            </div>

            {/* Objective & Timing */}
            <div className="grid grid-cols-12 border-b border-slate-400 bg-white text-[11px]">
              <div className="col-span-2 border-l border-slate-900 p-1.5 bg-slate-50 text-center font-mono">
                <div className="text-[10px] text-slate-500">التوقيت</div>
                <div className="font-bold text-slate-900">{data.arabic.startTime} - {data.arabic.endTime}</div>
              </div>
              <div className="col-span-10 p-1.5 flex items-start gap-1">
                <span className="font-bold text-slate-900 shrink-0">الهدف:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={data.arabic.objective}
                    onChange={(e) => handleChange("arabic", "objective", e.target.value)}
                    className="w-full border rounded px-1.5 py-0.5 text-xs"
                  />
                ) : (
                  <span className="text-slate-700">{data.arabic.objective}</span>
                )}
              </div>
            </div>

            {/* Steps & Notes */}
            <div className="grid grid-cols-12 text-[11px]">
              <div className="col-span-9 p-2 space-y-1 border-l border-slate-900">
                <div className="flex items-start gap-1">
                  <span className="font-bold w-28 shrink-0 text-slate-900">• افتتاح الحصة:</span>
                  <span className="text-slate-700">{data.arabic.opening}</span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="font-bold w-28 shrink-0 text-slate-900">• نشاط اعتيادي:</span>
                  <span className="text-slate-700">{data.arabic.routine}</span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="font-bold w-28 shrink-0 text-slate-900">• تحدث وإغناء المعجم:</span>
                  <span className="text-slate-700">{data.arabic.speakingVocab}</span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="font-bold w-28 shrink-0 text-slate-900">• أنشطة القراءة والكتابة:</span>
                  <span className="text-slate-700">{data.arabic.readingWriting}</span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="font-bold w-28 shrink-0 text-slate-900">• لعبة واختتام الحصة:</span>
                  <span className="text-slate-700">{data.arabic.gameClosing}</span>
                </div>
              </div>

              <div className="col-span-3 p-2 bg-emerald-50/30 flex flex-col justify-between">
                <div className="font-bold text-slate-900 text-[10px] border-b border-slate-300 pb-0.5">ملاحظات:</div>
                <div className="text-[10px] text-slate-600 mt-1">{data.arabic.notes}</div>
                <div className="border-t border-dashed border-slate-300 pt-1 text-[9px] text-slate-400 text-center">نسبة التحقق: %90</div>
              </div>
            </div>
          </div>

          {/* General Notes Container */}
          <div className="border-2 border-slate-900 rounded-xl p-3 bg-slate-50 text-xs">
            <div className="font-black text-slate-950 mb-1">ملاحظات عامة وتوجيهات الأستاذ(ة):</div>
            {isEditing ? (
              <textarea
                value={data.generalNotes}
                onChange={(e) => setData({ ...data, generalNotes: e.target.value })}
                rows={2}
                className="w-full bg-white border border-slate-300 rounded p-1.5 text-xs"
              />
            ) : (
              <p className="text-slate-700 text-[11px] leading-relaxed">{data.generalNotes}</p>
            )}
          </div>
        </div>

        {/* Footer Signatures */}
        <div className="pt-4 border-t border-slate-300 mt-4">
          <div className="grid grid-cols-2 gap-4 text-center text-xs">
            <div className="border border-slate-400 bg-slate-50 rounded-xl p-2 h-16 flex flex-col justify-between">
              <span className="font-bold text-slate-900">إطار خاص بالسيد(ة) مدير(ة) المؤسسة</span>
              <span className="text-[10px] text-slate-500">تأشيرة وملاحظات الإدارة</span>
            </div>
            <div className="border border-slate-400 bg-slate-50 rounded-xl p-2 h-16 flex flex-col justify-between">
              <span className="font-bold text-slate-900">إطار خاص بالسيد(ة) المفتش(ة) المواكب(ة)</span>
              <span className="text-[10px] text-slate-500">تأشيرة وتوجيهات التأطير التربوي</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
