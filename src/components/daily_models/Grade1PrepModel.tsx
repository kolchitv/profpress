import React, { useState } from "react";
import { Printer, Edit3, RotateCcw, Sparkles, Clock, Baby, CheckCircle2 } from "lucide-react";
import { TeacherProfile, Grade1PreparationDay } from "../../types";
import { INITIAL_GRADE1_PREP_DATA } from "../../data/dailyLogData";

interface Grade1PrepModelProps {
  teacherProfile: TeacherProfile;
}

export const Grade1PrepModel: React.FC<Grade1PrepModelProps> = ({ teacherProfile }) => {
  const [data, setData] = useState<Grade1PreparationDay>(INITIAL_GRADE1_PREP_DATA as any);
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
    setData(INITIAL_GRADE1_PREP_DATA as any);
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Control Banner */}
      <div className="no-print bg-white rounded-2xl p-4 md:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-rose-100 text-rose-900 border border-rose-300 font-bold text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Baby className="w-3.5 h-3.5" />
              النموذج 5 • المستوى الأول
            </span>
            <span className="text-xs text-slate-500 font-semibold">الموسم الدراسي {schoolYear}</span>
          </div>
          <h2 className="text-lg md:text-xl font-black text-slate-900 font-cairo mt-1">
            مذكرة المستوى الأول (أنشطة التهيئة والاستئناس الموزعة بالدقائق)
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            تخطيط دقيق مخصص للمستوى الأول بمحطات زمنية مضبوطة: أناشيد، تنمية التفكير المنطقي، مهارات العد، وحروف الاستئناس.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
              isEditing
                ? "bg-rose-700 text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5 text-rose-500" />
            <span>{isEditing ? "معاينة الطباعة" : "تعديل المحتوى والأنشطة"}</span>
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

      {/* Sheet Landscape/Portrait Layout */}
      <div className="print-sheet bg-white w-full max-w-[840px] mx-auto min-h-[1123px] p-6 md:p-8 rounded-2xl shadow-xl border border-slate-400 text-slate-900 font-cairo flex flex-col justify-between">
        <div className="space-y-4">
          {/* Header Row */}
          <div className="border-2 border-slate-900 rounded-xl p-2.5 bg-slate-50 flex items-center justify-between text-xs font-bold">
            <div className="flex items-center gap-2">
              <span className="text-slate-950 font-black">التاريخ :</span>
              {isEditing ? (
                <input
                  type="text"
                  value={data.dateStr}
                  onChange={(e) => setData({ ...data, dateStr: e.target.value })}
                  className="bg-white border border-slate-300 rounded px-2 py-0.5"
                />
              ) : (
                <span className="text-slate-800">{data.dateStr}</span>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div>
                <span className="text-slate-950 font-black">المستوى : </span>
                <span className="text-slate-800">{data.level}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-slate-950 font-black">الفوج : </span>
                {isEditing ? (
                  <input
                    type="text"
                    value={data.groupName}
                    onChange={(e) => setData({ ...data, groupName: e.target.value })}
                    className="bg-white border border-slate-300 rounded px-1.5 py-0.5 w-20"
                  />
                ) : (
                  <span className="text-slate-800">{data.groupName}</span>
                )}
              </div>
            </div>
          </div>

          {/* 3 Columns Layout: Français, الرياضيات, اللغة العربية */}
          <div className="border-2 border-slate-900 rounded-xl overflow-hidden">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="border-b-2 border-slate-900 text-center font-black">
                  <th className="w-1/3 py-2 px-2 bg-emerald-50 border-l-2 border-slate-900 text-emerald-950">
                    اللغة العربية
                  </th>
                  <th className="w-1/3 py-2 px-2 bg-amber-50 border-l-2 border-slate-900 text-amber-950">
                    الرياضيات
                  </th>
                  <th className="w-1/3 py-2 px-2 bg-lime-50 text-lime-950">
                    Français
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Row 1: Session & Timing */}
                <tr className="border-b border-slate-400 text-[11px]">
                  <td className="p-2 border-l-2 border-slate-900 bg-emerald-50/30">
                    <div className="flex justify-between">
                      <span>الحصة: {data.arabic.sessionNumber}</span>
                      <span className="font-mono text-slate-600">{data.arabic.timing}</span>
                    </div>
                  </td>
                  <td className="p-2 border-l-2 border-slate-900 bg-amber-50/30">
                    <div className="flex justify-between">
                      <span>الحصة: {data.math.sessionNumber}</span>
                      <span className="font-mono text-slate-600">{data.math.timing}</span>
                    </div>
                  </td>
                  <td className="p-2 bg-lime-50/30">
                    <div className="flex justify-between">
                      <span>{data.french.seance}</span>
                      <span className="font-mono text-slate-600">{data.french.horaire}</span>
                    </div>
                  </td>
                </tr>

                {/* Row 2: Objectives Header */}
                <tr className="border-b border-slate-400 text-center font-black text-[11px]">
                  <td className="py-1 bg-emerald-100/70 border-l-2 border-slate-900 text-emerald-950">الأهداف</td>
                  <td className="py-1 bg-amber-100/70 border-l-2 border-slate-900 text-amber-950">الأهداف</td>
                  <td className="py-1 bg-lime-100/70 text-lime-950">Objectifs</td>
                </tr>

                {/* Row 3: Objectives Content */}
                <tr className="border-b-2 border-slate-900 text-[11px]">
                  <td className="p-2 border-l-2 border-slate-900 text-slate-700 leading-relaxed align-top">
                    {data.arabic.objective}
                  </td>
                  <td className="p-2 border-l-2 border-slate-900 text-slate-700 leading-relaxed align-top">
                    {data.math.objective}
                  </td>
                  <td className="p-2 text-slate-700 leading-relaxed align-top">
                    {data.french.objectifs}
                  </td>
                </tr>

                {/* Block 1: Routine / Chanson Action */}
                <tr className="border-b border-slate-300 text-[11px]">
                  <td className="p-2 border-l-2 border-slate-900 align-top">
                    <div className="font-bold text-emerald-950 mb-0.5">نشاط اعتيادي (20 د):</div>
                    <div className="text-slate-700">{data.arabic.routine20min}</div>
                  </td>
                  <td className="p-2 border-l-2 border-slate-900 align-top">
                    <div className="font-bold text-amber-950 mb-0.5">نشاط اعتيادي (5 د):</div>
                    <div className="text-slate-700">{data.math.routine5min}</div>
                  </td>
                  <td className="p-2 align-top">
                    <div className="font-bold text-lime-950 mb-0.5">Chanson action (5 min):</div>
                    <div className="text-slate-700">{data.french.chansonAction5min}</div>
                  </td>
                </tr>

                {/* Block 2: Main Activity (40 min / 25 min / 20 min) */}
                <tr className="border-b border-slate-300 text-[11px]">
                  <td className="p-2 border-l-2 border-slate-900 align-top">
                    <div className="font-bold text-emerald-950 mb-0.5">نشاط الاستماع والتحدث وإغناء المعجم (40 د):</div>
                    <div className="text-slate-700">{data.arabic.speakingVocab40min}</div>
                  </td>
                  <td className="p-2 border-l-2 border-slate-900 align-top">
                    <div className="font-bold text-amber-950 mb-0.5">أنشطة تنمية التفكير المنطقي (25 د):</div>
                    <div className="text-slate-700">{data.math.logicThinking25min}</div>
                  </td>
                  <td className="p-2 align-top">
                    <div className="font-bold text-lime-950 mb-0.5">Vocabulaire (20 min):</div>
                    <div className="text-slate-700">{data.french.vocabulaire20min}</div>
                  </td>
                </tr>

                {/* Block 3: Pre-reading / Counting / Alphabet */}
                <tr className="border-b border-slate-300 text-[11px]">
                  <td className="p-2 border-l-2 border-slate-900 align-top">
                    <div className="font-bold text-emerald-950 mb-0.5">أنشطة ما قبل القراءة (50 د):</div>
                    <div className="text-slate-700">{data.arabic.preReading50min}</div>
                  </td>
                  <td className="p-2 border-l-2 border-slate-900 align-top">
                    <div className="font-bold text-amber-950 mb-0.5">أنشطة التهيئة لمهارات العد والحساب (25 د):</div>
                    <div className="text-slate-700">{data.math.countingSkills25min}</div>
                  </td>
                  <td className="p-2 align-top">
                    <div className="font-bold text-lime-950 mb-0.5">Chanson de l'alphabet (5 min):</div>
                    <div className="text-slate-700">{data.french.chansonAlphabet5min}</div>
                  </td>
                </tr>

                {/* Block 4: Closing / Games / Letter Presentation */}
                <tr className="border-b-2 border-slate-900 text-[11px]">
                  <td className="p-2 border-l-2 border-slate-900 align-top">
                    <div className="font-bold text-emerald-950 mb-0.5">طقس اختتام الحصة (20 د):</div>
                    <div className="text-slate-700">{data.arabic.closingRitual20min}</div>
                  </td>
                  <td className="p-2 border-l-2 border-slate-900 align-top">
                    <div className="font-bold text-amber-950 mb-0.5">ألعاب وتطبيقات (10 د):</div>
                    <div className="text-slate-700">{data.math.games10min}</div>
                  </td>
                  <td className="p-2 align-top space-y-1">
                    <div>
                      <div className="font-bold text-lime-950">Présentation de la lettre (20 min):</div>
                      <div className="text-slate-700">{data.french.presentationLettre20min}</div>
                    </div>
                    <div>
                      <div className="font-bold text-lime-950">Jeu (10 min):</div>
                      <div className="text-slate-700">{data.french.jeu10min}</div>
                    </div>
                  </td>
                </tr>

                {/* Row: Observations / Notes */}
                <tr className="text-[11px] bg-slate-50/50">
                  <td className="p-2 border-l-2 border-slate-900">
                    <div className="font-bold text-slate-900 mb-0.5">ملاحظات وتوجيهات:</div>
                    <div className="text-slate-600">{data.arabic.notes}</div>
                  </td>
                  <td className="p-2 border-l-2 border-slate-900">
                    <div className="font-bold text-slate-900 mb-0.5">ملاحظات وتوجيهات:</div>
                    <div className="text-slate-600">{data.math.notes}</div>
                  </td>
                  <td className="p-2">
                    <div className="font-bold text-slate-900 mb-0.5">Notes et observations:</div>
                    <div className="text-slate-600">{data.french.notesObservations}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Signatures */}
        <div className="pt-4 border-t border-slate-300 mt-4">
          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            <div className="border border-slate-400 bg-slate-50 rounded-xl p-2 h-16 flex flex-col justify-between">
              <span className="font-bold text-slate-900">توقيع الأستاذ(ة)</span>
              <span className="text-[10px] text-slate-500">{teacherProfile.fullName || "الأستاذ(ة)"}</span>
            </div>
            <div className="border border-slate-400 bg-slate-50 rounded-xl p-2 h-16 flex flex-col justify-between">
              <span className="font-bold text-slate-900">توقيع السيد(ة) المدير(ة)</span>
              <span className="text-[10px] text-slate-500">{teacherProfile.directorName || "إدارة المؤسسة"}</span>
            </div>
            <div className="border border-slate-400 bg-slate-50 rounded-xl p-2 h-16 flex flex-col justify-between">
              <span className="font-bold text-slate-900">توقيع السيد(ة) المفتش(ة)</span>
              <span className="text-[10px] text-slate-500">{teacherProfile.inspectorName || "التأطير التربوي"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
