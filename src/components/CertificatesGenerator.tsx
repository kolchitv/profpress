import React, { useState } from "react";
import {
  Award,
  Printer,
  Sparkles,
  Users,
  User,
  Medal,
  RotateCcw,
  Palette,
} from "lucide-react";
import { CertificateItem, TeacherProfile } from "../types";
import { DEFAULT_STUDENTS_GRADES } from "../data/defaultTemplates";

interface CertificatesGeneratorProps {
  teacherProfile: TeacherProfile;
}

export const CertificatesGenerator: React.FC<CertificatesGeneratorProps> = ({
  teacherProfile,
}) => {
  const [mode, setMode] = useState<"single" | "batch">("single");
  const [certType, setCertType] = useState<"excellence" | "encouragement" | "behavior" | "honor">("excellence");
  const [styleTheme, setStyleTheme] = useState<"gold" | "emerald" | "blue">("gold");

  // Single Certificate State
  const [studentName, setStudentName] = useState("آية بناني");
  const [gender, setGender] = useState<"M" | "F">("F");
  const [rank, setRank] = useState("الرتبة الأولى");
  const [average, setAverage] = useState("9.75");
  const [customPraise, setCustomPraise] = useState(
    "تقديراً لاجتهادها المتواصل، وتألقها الدراسي المتميز، وسلوكها النموذجي المشرف خلال الدورة الأولى."
  );

  const certTitles = {
    excellence: "شهادة تفوق وامتياز",
    encouragement: "شهادة تشجيع وتنويه",
    behavior: "شهادة حسن السلوك والمواظبة",
    honor: "شهادة شرف وتقدير",
  };

  const isFemale = gender === "F";

  // Batch students: passing students from default list
  const batchStudents = DEFAULT_STUDENTS_GRADES.filter((s) => s.average >= 6.0);

  return (
    <div className="space-y-6">
      {/* Controls Bar (Hidden in Print) */}
      <div className="no-print bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-700" />
                <span>مولد شواهد التقدير والتفوق والتشجيع</span>
              </h2>
              <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2 py-0.5 rounded">
                A4 أفقي (Landscape) فاخر
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              صمم شواهد تقدير وتفوق لطلبتك بتصاميم ملكية وألوان مذهبة، مع خيار الطباعة الفردية أو الطباعة الجماعية لجميع متفوقي القسم دفعة واحدة.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="print-certificate-btn"
              onClick={() => window.print()}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5 text-amber-300" />
              <span>{mode === "single" ? "طباعة الشهادة A4" : `طباعة شواهد القسم (${batchStudents.length} شهادة)`}</span>
            </button>
          </div>
        </div>

        {/* Options Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {/* Mode Switch */}
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center gap-2">
            <span className="font-bold text-slate-700">نوع الإصدار:</span>
            <button
              onClick={() => setMode("single")}
              className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer flex items-center gap-1 ${
                mode === "single" ? "bg-emerald-700 text-white" : "bg-white text-slate-700"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>شهادة فردية</span>
            </button>
            <button
              onClick={() => setMode("batch")}
              className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer flex items-center gap-1 ${
                mode === "batch" ? "bg-emerald-700 text-white" : "bg-white text-slate-700"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>طباعة جماعية للقسم</span>
            </button>
          </div>

          {/* Certificate Category */}
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center gap-2">
            <span className="font-bold text-slate-700">نوع الشهادة:</span>
            <select
              value={certType}
              onChange={(e: any) => setCertType(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg p-1.5 font-semibold text-xs flex-1"
            >
              <option value="excellence">شهادة تفوق وامتياز (Excellence)</option>
              <option value="encouragement">شهادة تشجيع وتنويه (Encouragement)</option>
              <option value="behavior">شهادة حسن السلوك والمواظبة</option>
              <option value="honor">شهادة شرف وتقدير عامة</option>
            </select>
          </div>

          {/* Border Theme */}
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 flex items-center gap-2">
            <span className="font-bold text-slate-700">إطار التصميم:</span>
            <button
              onClick={() => setStyleTheme("gold")}
              className={`px-2.5 py-1 rounded-md font-bold transition cursor-pointer ${
                styleTheme === "gold" ? "bg-amber-500 text-slate-950" : "bg-white text-slate-700"
              }`}
            >
              👑 ذهبي ملكي
            </button>
            <button
              onClick={() => setStyleTheme("emerald")}
              className={`px-2.5 py-1 rounded-md font-bold transition cursor-pointer ${
                styleTheme === "emerald" ? "bg-emerald-800 text-white" : "bg-white text-slate-700"
              }`}
            >
              🌿 أخضر وزاري
            </button>
            <button
              onClick={() => setStyleTheme("blue")}
              className={`px-2.5 py-1 rounded-md font-bold transition cursor-pointer ${
                styleTheme === "blue" ? "bg-blue-900 text-white" : "bg-white text-slate-700"
              }`}
            >
              🔷 أزرق كلاسيكي
            </button>
          </div>
        </div>

        {/* Single Mode Input Form */}
        {mode === "single" && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 text-xs bg-emerald-50/40 p-3 rounded-xl border border-emerald-200">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">اسم التلميذ(ة):</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-1.5 font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">الجنس:</label>
              <select
                value={gender}
                onChange={(e: any) => setGender(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-1.5 font-semibold"
              >
                <option value="F">تلميذة (أنثى)</option>
                <option value="M">تلميذ (ذكر)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">المعدل / النتيجة:</label>
              <input
                type="text"
                value={average}
                onChange={(e) => setAverage(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-1.5 font-mono text-center font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">الرتبة في القسم:</label>
              <input
                type="text"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-1.5 font-bold"
              />
            </div>

            <div className="md:col-span-4">
              <label className="block text-slate-700 font-semibold mb-1">عبارة الثناء والتقدير:</label>
              <input
                type="text"
                value={customPraise}
                onChange={(e) => setCustomPraise(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-1.5 font-medium"
              />
            </div>
          </div>
        )}
      </div>

      {/* Certificate Print Render: Single Certificate OR Batch */}
      {mode === "single" ? (
        <div
          className={`print-sheet bg-white max-w-5xl mx-auto rounded-3xl p-8 md:p-12 shadow-lg min-h-[580px] flex flex-col justify-between relative overflow-hidden border-8 ${
            styleTheme === "gold"
              ? "border-amber-500 ring-8 ring-amber-100"
              : styleTheme === "emerald"
              ? "border-emerald-800 ring-8 ring-emerald-100"
              : "border-blue-900 ring-8 ring-blue-100"
          }`}
        >
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-3 right-3 text-amber-600/40 text-3xl select-none">❖</div>
          <div className="absolute top-3 left-3 text-amber-600/40 text-3xl select-none">❖</div>
          <div className="absolute bottom-3 right-3 text-amber-600/40 text-3xl select-none">❖</div>
          <div className="absolute bottom-3 left-3 text-amber-600/40 text-3xl select-none">❖</div>

          {/* Certificate Ministerial Top */}
          <div className="border-b border-slate-200 pb-3 text-center relative z-10">
            <div className="flex items-center justify-between text-xs text-slate-700 font-semibold mb-1">
              <div className="text-right">
                <p className="font-bold text-slate-900">المملكة المغربية</p>
                <p>وزارة التربية الوطنية والتعليم الأولي والرياضة</p>
                <p>{teacherProfile.academy}</p>
                <p>{teacherProfile.directorate}</p>
              </div>

              <div className="w-14 h-14 rounded-full border-2 border-amber-600 bg-amber-50 flex items-center justify-center text-xl font-bold text-amber-700 shadow-2xs">
                ★
              </div>

              <div className="text-left" dir="ltr">
                <p className="font-bold text-slate-900">ROYAUME DU MAROC</p>
                <p>Écoles Pionnières</p>
                <p>{teacherProfile.institution}</p>
                <p className="text-slate-500 font-mono text-[11px]">{teacherProfile.schoolYear}</p>
              </div>
            </div>
          </div>

          {/* Certificate Main Body */}
          <div className="text-center py-6 space-y-4 my-auto relative z-10">
            <div className="inline-block px-8 py-1.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white font-black text-2xl md:text-3xl rounded-full shadow-xs tracking-wide font-cairo">
              {certTitles[certType]}
            </div>

            <p className="text-sm md:text-base font-bold text-slate-700 pt-1">
              يسر إدارة مؤسسة <strong>{teacherProfile.institution}</strong> والأستاذ(ة) المؤطر(ة) منح هذه الشهادة التقديرية إلى:
            </p>

            <div className="py-2">
              <span className="text-2xl md:text-4xl font-black font-amiri text-emerald-950 border-b-2 border-dashed border-amber-500 px-8 py-1 inline-block">
                {isFemale ? "التلميذة المتميزة: " : "التلميذ المتميز: "} {studentName}
              </span>
            </div>

            <div className="text-xs md:text-sm font-semibold text-slate-700 max-w-2xl mx-auto leading-relaxed">
              <span>{isFemale ? "المسجلة بقسم" : "المسجل بقسم"}: <strong>{teacherProfile.assignedLevel}</strong></span>
              {average && (
                <span> بمعدل دوري مشرف: <strong className="font-mono text-emerald-800 text-base">{average} / 10</strong></span>
              )}
              {rank && (
                <span> ({rank})</span>
              )}
              <p className="mt-2 text-slate-600 font-medium italic">
                "{customPraise}"
              </p>
            </div>
          </div>

          {/* Certificate Signatures */}
          <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-8 text-center text-xs relative z-10">
            <div>
              <span className="font-bold text-slate-800 block text-sm">توقيع الأستاذ(ة)</span>
              <p className="text-xs text-slate-600 mt-0.5">ذ. {teacherProfile.fullNameAr}</p>
              <span className="text-[10px] text-slate-400 block mt-6">حرر بتاريخ: {new Date().toISOString().split("T")[0]}</span>
            </div>

            <div>
              <span className="font-bold text-slate-800 block text-sm">توقيع وخاتم السيد رئيس المؤسسة</span>
              <p className="text-xs text-slate-600 mt-0.5">{teacherProfile.institution}</p>
              <div className="w-20 h-10 border border-dashed border-slate-300 rounded-md mx-auto mt-2 flex items-center justify-center text-[10px] text-slate-400">
                خاتم الإدارة
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Batch Generation View (Multi-Page Print Ready) */
        <div className="space-y-8">
          <div className="no-print bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
            <span>
              عرض {batchStudents.length} شهادات جاهزة للطباعة المتتالية لجميع تلاميذ القسم المتفوقين.
            </span>
            <span className="font-bold">سيتم طباعة كل شهادة في صفحة A4 منفصلة</span>
          </div>

          {batchStudents.map((std, idx) => (
            <div
              key={std.id}
              className="print-sheet page-break bg-white max-w-5xl mx-auto rounded-3xl p-8 md:p-12 shadow-lg min-h-[580px] flex flex-col justify-between relative overflow-hidden border-8 border-amber-500 ring-8 ring-amber-100 mb-8"
            >
              <div className="border-b border-slate-200 pb-3 text-center">
                <div className="flex items-center justify-between text-xs text-slate-700 font-semibold mb-1">
                  <div className="text-right">
                    <p className="font-bold text-slate-900">المملكة المغربية</p>
                    <p>وزارة التربية الوطنية والتعليم الأولي والرياضة</p>
                    <p>{teacherProfile.academy}</p>
                  </div>
                  <div className="w-14 h-14 rounded-full border-2 border-amber-600 bg-amber-50 flex items-center justify-center text-xl font-bold text-amber-700">
                    ★
                  </div>
                  <div className="text-left" dir="ltr">
                    <p className="font-bold text-slate-900">ROYAUME DU MAROC</p>
                    <p>{teacherProfile.institution}</p>
                    <p className="text-slate-500 text-[11px]">{teacherProfile.schoolYear}</p>
                  </div>
                </div>
              </div>

              <div className="text-center py-6 space-y-4 my-auto">
                <div className="inline-block px-8 py-1.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white font-black text-2xl rounded-full tracking-wide">
                  شهادة تفوق وامتياز
                </div>

                <p className="text-sm font-bold text-slate-700">
                  تمنح هذه الشهادة التقديرية تشجيعاً واعترافاً بالمستوى الدراسي الممتاز للتلميذ(ة):
                </p>

                <div className="py-2">
                  <span className="text-3xl font-black font-amiri text-emerald-950 border-b-2 border-dashed border-amber-500 px-8 py-1 inline-block">
                    {std.name}
                  </span>
                </div>

                <div className="text-xs md:text-sm font-semibold text-slate-700">
                  <span>المستوى: <strong>{teacherProfile.assignedLevel}</strong></span> • 
                  <span> المعدل الدوري: <strong className="font-mono text-emerald-800 text-base">{std.average.toFixed(2)} / 10</strong></span> • 
                  <span> الرتبة: <strong>الرتبة {idx + 1}</strong></span>
                  <p className="mt-2 text-slate-600 italic">
                    "{std.remark}"
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-8 text-center text-xs">
                <div>
                  <span className="font-bold text-slate-800 block text-sm">توقيع الأستاذ(ة)</span>
                  <p className="text-xs text-slate-600 mt-0.5">ذ. {teacherProfile.fullNameAr}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-800 block text-sm">توقيع وخاتم السيد رئيس المؤسسة</span>
                  <p className="text-xs text-slate-600 mt-0.5">{teacherProfile.institution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
