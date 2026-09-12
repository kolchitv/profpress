import React, { useState, useRef } from "react";
import {
  Scroll,
  Printer,
  Plus,
  Trash2,
  Sparkles,
  HeartHandshake,
  CheckCircle2,
  Clock,
  ShieldCheck,
  RotateCcw,
  Palette,
  Download,
} from "lucide-react";
import { ClassRuleItem, TeacherProfile } from "../types";
import { DEFAULT_CLASS_RULES } from "../data/defaultTemplates";
import { generatePdfFromElement } from "../utils/pdfGenerator";

interface ClassCharterProps {
  teacherProfile: TeacherProfile;
}

export const ClassCharter: React.FC<ClassCharterProps> = ({ teacherProfile }) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [rules, setRules] = useState<ClassRuleItem[]>(DEFAULT_CLASS_RULES);
  const [theme, setTheme] = useState<"playful" | "royal" | "minimal">("playful");
  const [newTitle, setNewTitle] = useState("");

  const handleDownloadPdf = async () => {
    if (!sheetRef.current) return;
    setIsGeneratingPdf(true);
    try {
      await generatePdfFromElement(sheetRef.current, {
        filename: `ميثاق_القسم_${teacherProfile.assignedLevel}_${teacherProfile.fullNameAr || "أستاذ"}.pdf`,
        orientation: "portrait",
        quality: "ultra",
        colorMode: "color",
      });
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء توليد ملف PDF. يرجى استخدام زر طباعة المتصفح.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };
  const [newDesc, setNewDesc] = useState("");
  const [newCategory, setNewCategory] = useState<"respect" | "work" | "discipline" | "cleanliness">("respect");

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const rule: ClassRuleItem = {
      id: "rule_" + Date.now(),
      title: newTitle,
      description: newDesc,
      category: newCategory,
      iconName: newCategory === "respect" ? "HeartHandshake" : newCategory === "work" ? "CheckCircle2" : newCategory === "discipline" ? "Clock" : "Sparkles",
    };
    setRules((prev) => [...prev, rule]);
    setNewTitle("");
    setNewDesc("");
  };

  const handleDeleteRule = (id: string) => {
    setRules((prev) => prev.filter((r) => r.id !== id));
  };

  const handleReset = () => {
    if (window.confirm("استعادة القواعد النموذجية؟")) {
      setRules(DEFAULT_CLASS_RULES);
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="no-print bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Scroll className="w-5 h-5 text-blue-700" />
                <span>مصمم بوستر ميثاق وقوانين القسم التفاعلي</span>
              </h2>
              <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2 py-0.5 rounded">
                ملصق A4 عالي الجودة
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              صمم بوستر ميثاق جماعة الفصل الخاص بقسمك بمظهر مبهج وتحفيزي لتعزيز السلوك الإيجابي ومسؤولية المتعلمين.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 text-xs font-medium flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>القواعد الافتراضية</span>
            </button>
            <button
              id="download-charter-pdf-btn"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-400 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              title="تحميل كملف PDF عالي الدقة A4"
            >
              <Download className="w-3.5 h-3.5 text-amber-300" />
              <span>{isGeneratingPdf ? "جاري التوليد..." : "تحميل PDF"}</span>
            </button>
            <button
              id="print-charter-btn"
              onClick={() => window.print()}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة A4</span>
            </button>
          </div>
        </div>

        {/* Theme Selector */}
        <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
          <span className="font-bold text-slate-700 flex items-center gap-1.5">
            <Palette className="w-4 h-4 text-blue-700" />
            <span>اختر قالب وتصميم الملصق:</span>
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme("playful")}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                theme === "playful"
                  ? "bg-amber-500 text-slate-950 shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              🎈 النمط المبهج والملون (للابتدائي)
            </button>
            <button
              onClick={() => setTheme("royal")}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                theme === "royal"
                  ? "bg-blue-900 text-white shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              🏛️ النمط الملكي الرسمي الوزاري
            </button>
            <button
              onClick={() => setTheme("minimal")}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                theme === "minimal"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              📐 النمط البسيط المودرن
            </button>
          </div>
        </div>

        {/* Add New Rule Form */}
        <form onSubmit={handleAddRule} className="bg-blue-50/50 p-3.5 rounded-xl border border-blue-200 grid grid-cols-1 md:grid-cols-4 gap-2 text-xs">
          <div className="md:col-span-1">
            <label className="block text-slate-700 font-semibold mb-1">المحور / التصنيف:</label>
            <select
              value={newCategory}
              onChange={(e: any) => setNewCategory(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 font-medium"
            >
              <option value="respect">الاحترام والتعامل الإيجابي</option>
              <option value="discipline">الانضباط والمواظبة</option>
              <option value="work">الاجتهاد والمشاركة</option>
              <option value="cleanliness">النظافة ورعاية الأدوات</option>
            </select>
          </div>

          <div className="md:col-span-1">
            <label className="block text-slate-700 font-semibold mb-1">عنوان القاعدة أو الالتزام:</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="مثال: أرفع يدي قبل أن أتحدث"
              className="w-full bg-white border border-slate-300 rounded-lg p-2 font-medium"
              required
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-slate-700 font-semibold mb-1">التفصيل والتوضيح (اختياري):</label>
            <input
              type="text"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="شرح مبسط للسلوك المطلوب"
              className="w-full bg-white border border-slate-300 rounded-lg p-2 font-medium"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold p-2 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة التزام للميثاق</span>
            </button>
          </div>
        </form>
      </div>

      {/* Official A4 Printable Poster Sheet */}
      <div
        ref={sheetRef}
        className={`print-sheet rounded-3xl p-6 md:p-10 shadow-xs max-w-4xl mx-auto border-4 ${
          theme === "playful"
            ? "bg-amber-50/40 border-amber-300 ring-8 ring-amber-100/50"
            : theme === "royal"
            ? "bg-blue-50/20 border-blue-900 ring-8 ring-blue-100"
            : "bg-white border-slate-800 ring-4 ring-slate-100"
        }`}
      >
        {/* Poster Header */}
        <div className="text-center pb-4 border-b-2 border-slate-800 mb-5">
          <div className="flex justify-center mb-1.5">
            <img
              src="/morocco-ministry-logo.png"
              alt="وزارة التربية الوطنية والتعليم الأولي والرياضة"
              className="h-12 md:h-14 w-auto max-w-full object-contain"
            />
          </div>
          <div className="flex items-center justify-between font-bold text-slate-800 text-[11px] px-1 mb-2">
            <div className="text-right space-y-0.5">
              <p><span className="text-slate-600 font-medium">الأكاديمية الجهوية للتربية والتكوين :</span> {teacherProfile.academy || "...................................."}</p>
              <p><span className="text-slate-600 font-medium">المديرية الإقليمية :</span> {teacherProfile.directorate || "...................................."}</p>
            </div>
            <div className="text-left space-y-0.5">
              <p><span className="text-slate-600 font-medium">المؤسسة التعليمية :</span> {teacherProfile.institution || "...................................."}</p>
              <p><span className="text-slate-600 font-medium">السنة الدراسية :</span> {teacherProfile.schoolYear || "2026/2027"}</p>
            </div>
          </div>

          <div className="inline-block bg-gradient-to-r from-blue-950 via-indigo-900 to-blue-950 text-white px-8 py-2 rounded-full shadow-sm mb-2 mt-1">
            <h1 className="text-xl md:text-3xl font-black font-cairo">
              ميثاق وقوانين جماعة الفصل
            </h1>
          </div>
          <p className="text-xs md:text-sm font-bold text-slate-700 mt-1">
            معاً نتعلم، معاً نتألق، ومعاً نصنع النجاح في فصلنا المتميز
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-slate-600 mt-2 font-medium">
            <span>الأستاذ(ة): <strong className="text-slate-900">{teacherProfile.fullNameAr}</strong></span>
            <span>•</span>
            <span>القسم: <strong className="text-slate-900">{teacherProfile.classGroups}</strong></span>
            <span>•</span>
            <span>المستوى: <strong className="text-slate-900">{teacherProfile.assignedLevel}</strong></span>
          </div>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rules.map((rule, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={rule.id}
                className={`relative group rounded-2xl p-4 border-2 transition-all flex items-start gap-3.5 ${
                  theme === "playful"
                    ? isEven
                      ? "bg-white border-sky-300 shadow-xs"
                      : "bg-white border-amber-300 shadow-xs"
                    : theme === "royal"
                    ? "bg-white border-blue-300 shadow-xs"
                    : "bg-white border-slate-300 shadow-xs"
                }`}
              >
                {/* Number Badge */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-xs ${
                    theme === "playful"
                      ? isEven
                        ? "bg-sky-500 text-white"
                        : "bg-amber-500 text-slate-950"
                      : theme === "royal"
                      ? "bg-blue-900 text-amber-300"
                      : "bg-slate-800 text-white"
                  }`}
                >
                  {index + 1}
                </div>

                <div className="flex-1 text-right">
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {rule.title}
                  </h3>
                  {rule.description && (
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {rule.description}
                    </p>
                  )}
                </div>

                {/* Delete button (hidden in print) */}
                <button
                  onClick={() => handleDeleteRule(rule.id)}
                  className="no-print opacity-0 group-hover:opacity-100 text-rose-500 hover:text-rose-700 transition p-1 rounded cursor-pointer shrink-0"
                  title="حذف القاعدة"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom Student Pledge & Signatures Area */}
        <div className="mt-8 pt-5 border-t-2 border-slate-800 space-y-4">
          <div className="bg-slate-100/90 border border-slate-300 rounded-xl p-3 text-center">
            <p className="text-xs md:text-sm font-black text-slate-900 leading-relaxed">
              عهد ميثاق الشرف: "أتعهد أنا التلميذ(ة) باحترام هذا الميثاق والعمل ببنوده ليكون قسمنا فضاءً آمناً للمحبة، والنظام، والتعلم والتميز."
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center text-xs">
            <div className="border border-dashed border-slate-400 rounded-xl p-3 min-h-[75px] flex flex-col justify-between">
              <span className="font-bold text-slate-800">ممثلو تلاميذ القسم</span>
              <span className="text-[10px] text-slate-400">....................</span>
            </div>
            <div className="border border-dashed border-slate-400 rounded-xl p-3 min-h-[75px] flex flex-col justify-between">
              <span className="font-bold text-slate-800">الأستاذ(ة)</span>
              <span className="text-[10px] text-slate-400">ذ. {teacherProfile.fullNameAr}</span>
            </div>
            <div className="border border-dashed border-slate-400 rounded-xl p-3 min-h-[75px] flex flex-col justify-between col-span-2 md:col-span-1">
              <span className="font-bold text-slate-800">إدارة المؤسسة</span>
              <span className="text-[10px] text-slate-400">بتاريخ: ....................</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
