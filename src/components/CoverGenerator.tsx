import React, { useState } from "react";
import {
  FileText,
  Printer,
  Sparkles,
  Palette,
  Layers,
  BookOpen,
  RotateCcw,
} from "lucide-react";
import { FileCoverConfig, TeacherProfile } from "../types";
import { DEFAULT_COVERS } from "../data/defaultTemplates";

interface CoverGeneratorProps {
  teacherProfile: TeacherProfile;
}

export const CoverGenerator: React.FC<CoverGeneratorProps> = ({ teacherProfile }) => {
  const [coversList, setCoversList] = useState<FileCoverConfig[]>(DEFAULT_COVERS);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const activeCover = coversList[selectedIndex] || DEFAULT_COVERS[0];

  const updateActiveCover = (fields: Partial<FileCoverConfig>) => {
    setCoversList((prev) => {
      const updated = [...prev];
      updated[selectedIndex] = { ...updated[selectedIndex], ...fields };
      return updated;
    });
  };

  const handleAddNewCover = () => {
    const newCover: FileCoverConfig = {
      title: "واجهة ملف جديدة",
      subTitle: "سجل الأنشطة التربوية والتدبير البيداغوجي",
      theme: "pioneer",
      colorScheme: "emerald",
      dossierType: "ملف تربوي",
      authorName: teacherProfile.fullNameAr,
      schoolName: teacherProfile.institution,
      academicYear: teacherProfile.schoolYear,
      level: teacherProfile.assignedLevel,
      quote: "التربية رسالة وبناء للمستقبل",
    };
    setCoversList((prev) => [...prev, newCover]);
    setSelectedIndex(coversList.length);
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar (Hidden in Print) */}
      <div className="no-print bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-700" />
                <span>منشئ واجهات وأغلفة الملفات التربوية</span>
              </h2>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded">
                تنسيق A4 للطباعة
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              صمم واجهات احترافية وراقية لملفاتك وسجلاتك البيداغوجية في ثوانٍ مع قوالب وأطر زخرفية مغربية متنوعة.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAddNewCover}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition"
            >
              + إضافة واجهة جديدة
            </button>
            <button
              id="print-cover-btn"
              onClick={() => window.print()}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5 text-amber-300" />
              <span>طباعة الواجهة الحالية A4</span>
            </button>
          </div>
        </div>

        {/* Ready-made Covers Selection Carousel */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 block">اختر نوع الملف:</label>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {coversList.map((cover, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                  selectedIndex === idx
                    ? "bg-emerald-800 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{cover.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Customization Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">عنوان الملف الرئيسي:</label>
            <input
              type="text"
              value={activeCover.title}
              onChange={(e) => updateActiveCover({ title: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 font-bold"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">العنوان الفرعي أو التوصيف:</label>
            <input
              type="text"
              value={activeCover.subTitle}
              onChange={(e) => updateActiveCover({ subTitle: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 font-medium"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">قالب التصميم:</label>
            <select
              value={activeCover.theme}
              onChange={(e: any) => updateActiveCover({ theme: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 font-semibold"
            >
              <option value="pioneer">قالب مدرسة الريادة (نجمة ذهبية رسمية)</option>
              <option value="royal">القالب الملكي الوزاري (فخامة رسمية)</option>
              <option value="islamic">قالب الزخرفة المغربية الأصيلة</option>
              <option value="modern">قالب عصري بسيط (Modern Minimalist)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">لون التنسيق الأساسي:</label>
            <select
              value={activeCover.colorScheme}
              onChange={(e: any) => updateActiveCover({ colorScheme: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 font-semibold"
            >
              <option value="emerald">أخضر زمردي ملكي (Emerald)</option>
              <option value="blue">أزرق وزاري عميق (Navy Blue)</option>
              <option value="amber">ذهبي عنبري (Amber Gold)</option>
              <option value="burgundy">عنابي فاخر (Burgundy)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-slate-700 font-semibold mb-1">شعار أو حكمة أسفل الواجهة:</label>
            <input
              type="text"
              value={activeCover.quote}
              onChange={(e) => updateActiveCover({ quote: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 font-medium"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">المؤسسة التعليمية:</label>
            <input
              type="text"
              value={activeCover.schoolName}
              onChange={(e) => updateActiveCover({ schoolName: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 font-medium"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">اسم الأستاذ(ة):</label>
            <input
              type="text"
              value={activeCover.authorName}
              onChange={(e) => updateActiveCover({ authorName: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 font-medium"
            />
          </div>
        </div>
      </div>

      {/* Official A4 Printable Cover Sheet */}
      <div
        className={`print-sheet bg-white max-w-3xl mx-auto rounded-3xl p-8 md:p-14 shadow-lg min-h-[900px] flex flex-col justify-between relative overflow-hidden border-8 ${
          activeCover.colorScheme === "emerald"
            ? "border-emerald-800"
            : activeCover.colorScheme === "blue"
            ? "border-slate-800"
            : activeCover.colorScheme === "amber"
            ? "border-amber-700"
            : "border-rose-900"
        }`}
      >
        {/* Decorative Inner Border */}
        <div
          className={`absolute inset-3 border-2 border-dashed pointer-events-none rounded-2xl ${
            activeCover.colorScheme === "emerald"
              ? "border-emerald-600/40"
              : activeCover.colorScheme === "blue"
              ? "border-slate-400"
              : activeCover.colorScheme === "amber"
              ? "border-amber-500/40"
              : "border-rose-600/40"
          }`}
        />

        {/* Top Header */}
        <div className="text-center relative z-10 pt-4">
          <div className="flex items-center justify-between text-xs md:text-sm font-semibold text-slate-700 pb-4 border-b border-slate-300">
            <div className="text-right">
              <p className="font-bold text-slate-900">المملكة المغربية</p>
              <p>وزارة التربية الوطنية والتعليم الأولي والرياضة</p>
              <p>{teacherProfile.academy}</p>
              <p>{teacherProfile.directorate}</p>
            </div>

            <div className="w-16 h-16 rounded-full border-2 border-amber-600 bg-amber-50/80 flex items-center justify-center text-2xl font-bold text-amber-700 shadow-xs">
              ★
            </div>

            <div className="text-left" dir="ltr">
              <p className="font-bold text-slate-900">ROYAUME DU MAROC</p>
              <p>Ministère de l'Éducation Nationale</p>
              <p className="text-slate-600">{activeCover.schoolName}</p>
              <p className="text-slate-500 font-mono text-xs">{activeCover.academicYear}</p>
            </div>
          </div>
        </div>

        {/* Center Main Title Block */}
        <div className="text-center my-auto py-10 relative z-10 space-y-5">
          <div className="inline-block bg-slate-100 px-4 py-1 rounded-full text-xs font-black tracking-widest text-slate-700 border border-slate-300 uppercase">
            {activeCover.dossierType}
          </div>

          <div className="space-y-3">
            <h1
              className={`text-3xl md:text-5xl font-black font-cairo leading-tight ${
                activeCover.colorScheme === "emerald"
                  ? "text-emerald-950"
                  : activeCover.colorScheme === "blue"
                  ? "text-slate-900"
                  : activeCover.colorScheme === "amber"
                  ? "text-amber-950"
                  : "text-rose-950"
              }`}
            >
              {activeCover.title}
            </h1>

            {activeCover.subTitle && (
              <p className="text-base md:text-xl font-bold text-slate-600 max-w-xl mx-auto leading-relaxed">
                {activeCover.subTitle}
              </p>
            )}
          </div>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-3 pt-3">
            <div className="h-[2px] w-16 bg-amber-500" />
            <span className="text-amber-600 font-bold text-lg">✦ ❖ ✦</span>
            <div className="h-[2px] w-16 bg-amber-500" />
          </div>

          {activeCover.quote && (
            <p className="text-xs md:text-sm font-amiri italic text-slate-500 pt-2">
              "{activeCover.quote}"
            </p>
          )}
        </div>

        {/* Bottom Details Box */}
        <div className="relative z-10 pb-4">
          <div className="bg-slate-50 border border-slate-300 rounded-2xl p-5 grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div className="text-right">
              <span className="text-slate-500 block">إعداد الأستاذ(ة):</span>
              <strong className="text-sm font-black text-slate-900">{activeCover.authorName}</strong>
            </div>

            <div className="text-center">
              <span className="text-slate-500 block">المستوى والقسم:</span>
              <strong className="text-sm font-black text-slate-900">{activeCover.level}</strong>
            </div>

            <div className="text-left col-span-2 md:col-span-1">
              <span className="text-slate-500 block">الموسم الدراسي:</span>
              <strong className="text-sm font-black text-slate-900 font-mono">{activeCover.academicYear}</strong>
            </div>
          </div>

          <div className="text-center text-[11px] text-slate-400 mt-4">
            مشروع مدارس الريادة • المدرسة الرقمية والتعليم الصريح
          </div>
        </div>
      </div>
    </div>
  );
};
