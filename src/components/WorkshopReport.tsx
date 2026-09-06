import React, { useState, useRef } from "react";
import {
  FileText,
  Printer,
  Download,
  Edit3,
  RotateCcw,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  Sparkles,
  Target,
  Clock,
  Bookmark,
  Rocket,
  AlertTriangle,
  Lightbulb,
  CheckSquare,
  Palette,
  X,
  ChevronDown,
  Layers,
} from "lucide-react";
import { TeacherProfile, WorkshopReportData, MathLevelRow, ArabicPathRow } from "../types";
import { DEFAULT_WORKSHOP_REPORT } from "../data/defaultTemplates";
import { generateMultiPagePdfFromElements } from "../utils/pdfGenerator";

interface WorkshopReportProps {
  teacherProfile: TeacherProfile;
}

export const WorkshopReport: React.FC<WorkshopReportProps> = ({ teacherProfile }) => {
  const [reportData, setReportData] = useState<WorkshopReportData>(() => {
    try {
      const saved = localStorage.getItem("profpress_workshop_report");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      ...DEFAULT_WORKSHOP_REPORT,
      institution: teacherProfile.institution || DEFAULT_WORKSHOP_REPORT.institution,
      teacherName: teacherProfile.fullNameAr || DEFAULT_WORKSHOP_REPORT.teacherName,
      city: teacherProfile.commune || DEFAULT_WORKSHOP_REPORT.city,
    };
  });

  const [colorTheme, setColorTheme] = useState<"emerald" | "blue">("emerald");
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [generationProgress, setGenerationProgress] = useState("");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorTab, setEditorTab] = useState<"general" | "math" | "arabic" | "french" | "synthesis">("general");

  // Temporary edit state inside editor
  const [tempData, setTempData] = useState<WorkshopReportData>(reportData);

  // References to the 3 printable A4 pages
  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);
  const page3Ref = useRef<HTMLDivElement>(null);

  // Save to state & local storage
  const handleSaveData = (dataToSave: WorkshopReportData) => {
    setReportData(dataToSave);
    try {
      localStorage.setItem("profpress_workshop_report", JSON.stringify(dataToSave));
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenEditor = () => {
    setTempData(reportData);
    setIsEditorOpen(true);
  };

  const handleSaveEditor = (e: React.FormEvent) => {
    e.preventDefault();
    handleSaveData(tempData);
    setIsEditorOpen(false);
  };

  const handleResetToDefault = () => {
    if (window.confirm("هل ترغب في استعادة النص الأصلي المعتمد لتقرير ورشات الريادة؟")) {
      const resetData = {
        ...DEFAULT_WORKSHOP_REPORT,
        institution: teacherProfile.institution || DEFAULT_WORKSHOP_REPORT.institution,
        teacherName: teacherProfile.fullNameAr || DEFAULT_WORKSHOP_REPORT.teacherName,
        city: teacherProfile.commune || DEFAULT_WORKSHOP_REPORT.city,
      };
      setReportData(resetData);
      setTempData(resetData);
      try {
        localStorage.setItem("profpress_workshop_report", JSON.stringify(resetData));
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Generate 3-page A4 PDF
  const handleDownloadPdf = async () => {
    if (!page1Ref.current || !page2Ref.current || !page3Ref.current) return;
    setIsGeneratingPdf(true);
    setGenerationProgress("جاري التحضير...");
    try {
      await generateMultiPagePdfFromElements(
        [page1Ref.current, page2Ref.current, page3Ref.current],
        {
          filename: `تقرير_ورشات_الريادة_${reportData.dayNumber.replace(/\s+/g, "_")}_${reportData.dateText.replace(/\s+/g, "_")}.pdf`,
          orientation: "portrait",
          quality: "ultra",
          colorMode: "color",
          onProgress: (status) => setGenerationProgress(status),
        }
      );
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("حدث خطأ أثناء توليد ملف PDF. يرجى استخدام زر طباعة المتصفح كبديل مباشر.");
    } finally {
      setIsGeneratingPdf(false);
      setGenerationProgress("");
    }
  };

  // Helpers to add/remove Math rows
  const handleAddMathRow = () => {
    const newRow: MathLevelRow = {
      id: "m_" + Date.now(),
      level: "المستوى الجديد",
      structure: "توصيف مسارات وتدرج المستوى...",
    };
    setTempData((prev) => ({
      ...prev,
      mathLevels: [...prev.mathLevels, newRow],
    }));
  };

  const handleDeleteMathRow = (id: string) => {
    setTempData((prev) => ({
      ...prev,
      mathLevels: prev.mathLevels.filter((r) => r.id !== id),
    }));
  };

  // Helpers to add/remove Arabic rows
  const handleAddArabicRow = () => {
    const newRow: ArabicPathRow = {
      id: "a_" + Date.now(),
      path: `المسار ${tempData.arabicPaths.length + 1}`,
      startAndProgression: "ينطلق من...",
    };
    setTempData((prev) => ({
      ...prev,
      arabicPaths: [...prev.arabicPaths, newRow],
    }));
  };

  const handleDeleteArabicRow = (id: string) => {
    setTempData((prev) => ({
      ...prev,
      arabicPaths: prev.arabicPaths.filter((r) => r.id !== id),
    }));
  };

  // Dynamic color classes based on selected theme
  const themeClasses = {
    primaryBg: colorTheme === "emerald" ? "bg-[#114b49]" : "bg-blue-950",
    primaryGradient:
      colorTheme === "emerald"
        ? "from-[#0f3d3c] via-[#155a57] to-[#0d3433]"
        : "from-blue-950 via-indigo-900 to-slate-950",
    accentBadge: colorTheme === "emerald" ? "bg-emerald-800 text-white" : "bg-blue-800 text-white",
    tableHeaderBg: colorTheme === "emerald" ? "bg-[#145350] text-white" : "bg-blue-900 text-white",
    sectionTitleText: colorTheme === "emerald" ? "text-[#124d4a]" : "text-blue-950",
    cardBorder: colorTheme === "emerald" ? "border-emerald-200" : "border-blue-200",
    cornerAccent: colorTheme === "emerald" ? "text-emerald-700" : "text-blue-700",
  };

  return (
    <div className="space-y-6">
      {/* Top Action & Controls Bar (no-print) */}
      <div className="no-print bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-700" />
                <span>نموذج تقرير ورشات مؤسسات الريادة (3 صفحات A4 عالية الدقة)</span>
              </h2>
              <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2 py-0.5 rounded">
                مطابق للأصل الرسمي 100%
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              وثيقة متكاملة لتسجيل وتوثيق أشغال ورشات الدعم المكثف (مشروع مدارس الريادة) بجميع محاورها (الرياضيات، اللغة العربية، الفرنسية، والتوصيات).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Color Theme Selector */}
            <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 p-1 rounded-lg text-xs">
              <span className="text-[11px] text-slate-500 font-bold px-1 flex items-center gap-1">
                <Palette className="w-3.5 h-3.5" />
                السمة:
              </span>
              <button
                type="button"
                onClick={() => setColorTheme("emerald")}
                className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer transition ${
                  colorTheme === "emerald"
                    ? "bg-[#145350] text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-200"
                }`}
              >
                أخضر الريادة الأصلي
              </button>
              <button
                type="button"
                onClick={() => setColorTheme("blue")}
                className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer transition ${
                  colorTheme === "blue"
                    ? "bg-blue-700 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-200"
                }`}
              >
                أزرق Profpress
              </button>
            </div>

            <button
              onClick={handleResetToDefault}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-medium flex items-center gap-1 cursor-pointer transition"
              title="استعادة النص الرسمي الكامل لليوم الثاني"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>استعادة النص الأصلي</span>
            </button>

            <button
              onClick={handleOpenEditor}
              className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-300" />
              <span>تعديل محتوى التقرير</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-400 text-white font-bold px-4 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              title="توليد وتنزيل ملف PDF عالي الجودة يحتوي الصفحات الثلاث"
            >
              <Download className="w-3.5 h-3.5 text-amber-300" />
              <span>{isGeneratingPdf ? generationProgress || "جاري التوليد..." : "تحميل PDF (3 صفحات)"}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة ورقية A4</span>
            </button>
          </div>
        </div>

        {/* Info hint */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2 text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>
              يتألف التقرير من <strong>3 صفحات A4 متعاقبة</strong> وفق التصميم الرسمي لمشروع الريادة. يمكنك الضغط على <strong>«تعديل محتوى التقرير»</strong> لتخصيص أي فقرة أو جدول بحسب معطيات مدرستك.
            </span>
          </div>
          <div className="text-slate-500 text-[11px] shrink-0 font-medium">
            تاريخ التقرير: <strong>{reportData.dateText}</strong>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3 OFFICIAL A4 PAGES CONTAINER */}
      {/* ========================================================================= */}
      <div className="space-y-12 print:space-y-0">
        {/* ======================================================================= */}
        {/* PAGE 1 / 3 */}
        {/* ======================================================================= */}
        <div
          ref={page1Ref}
          className="print-page bg-white border border-slate-300 rounded-2xl p-6 md:p-10 shadow-sm max-w-4xl mx-auto relative overflow-hidden font-cairo text-right min-h-[1120px] flex flex-col justify-between"
          style={{ pageBreakAfter: "always", breakAfter: "page" }}
        >
          {/* Top Decorative Wave Header Banner */}
          <div className="relative mb-6">
            {/* Curved SVG Corner Graphic */}
            <div className="absolute top-0 right-0 w-48 h-32 -mr-8 -mt-8 pointer-events-none opacity-90 overflow-hidden">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <path
                  d="M0,0 C120,0 200,80 200,200 L200,0 Z"
                  fill={colorTheme === "emerald" ? "#195e5b" : "#1e3a8a"}
                />
                <path
                  d="M0,0 C90,10 170,90 180,200 L200,0 Z"
                  fill="#f59e0b"
                  opacity="0.75"
                />
              </svg>
            </div>

            {/* Ministry Official Logo and Title */}
            <div className="text-center pt-2 pb-4 border-b border-slate-200">
              <img
                src="/morocco-ministry-logo.png"
                alt="شعار وزارة التربية الوطنية والتعليم الأولي والرياضة"
                className="h-16 w-16 mx-auto object-contain drop-shadow-xs mb-1"
              />
              <p className="text-xs font-bold text-slate-900">المملكة المغربية</p>
              <p className="text-[11px] font-bold text-slate-800">
                وزارة التربية الوطنية والتعليم الأولي والرياضة
              </p>
              <p className="text-[9px] text-slate-500 font-mono tracking-wider" dir="ltr">
                ⵜⴰⴳⵍⴷⵉⵜ ⵏ ⵍⵎⴰⵖⵔⵉⴱ | ⵜⴰⵎⴰⵡⴰⵙⵜ ⵏ ⵓⵙⴳⵎⵉ ⴰⵏⴰⵎⵓⵔ
              </p>
            </div>

            {/* Dark Curved Title Banner */}
            <div
              className={`rounded-2xl p-4 md:p-5 text-white mt-4 shadow-sm relative flex flex-col sm:flex-row items-center justify-between gap-3 bg-gradient-to-r ${themeClasses.primaryGradient}`}
            >
              <div className="space-y-1 text-center sm:text-right">
                <h1 className="text-lg md:text-xl font-black font-cairo tracking-wide text-white">
                  {reportData.title}
                </h1>
                <p className="text-xs text-amber-300 font-semibold">
                  {reportData.subtitle}
                </p>
              </div>
              <div className="shrink-0 bg-white text-slate-900 text-xs font-black px-3.5 py-1.5 rounded-xl shadow-xs">
                {reportData.dateText}
              </div>
            </div>
          </div>

          {/* Technical Sheet (بطاقة تقنية - 4 boxes) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-500 font-bold block">المستهدفون بالدورة:</span>
                <p className="text-xs font-extrabold text-slate-900">
                  {reportData.technicalCard.targetAudience}
                </p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <Target className="w-4 h-4" />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-500 font-bold block">طبيعة المحطة والتكوين:</span>
                <p className="text-xs font-extrabold text-slate-900">
                  {reportData.technicalCard.sessionNature}
                </p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-500 font-bold block">المحاور البيداغوجية:</span>
                <p className="text-xs font-extrabold text-slate-900">
                  {reportData.technicalCard.axes}
                </p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Bookmark className="w-4 h-4" />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-500 font-bold block">الهدف الاستراتيجي:</span>
                <p className="text-xs font-extrabold text-slate-900">
                  {reportData.technicalCard.strategicObjective}
                </p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Rocket className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Section: إطار عام وتأطير بيداغوجي للورشات */}
          <div className="mb-5 bg-slate-50/70 border border-slate-200 rounded-xl p-4 shadow-2xs">
            <h2 className="text-xs md:text-sm font-black text-slate-900 flex items-center gap-2 mb-2 pb-1.5 border-b border-slate-200">
              <span className="text-base">📝</span>
              <span>إطار عام وتأطير بيداغوجي للورشات</span>
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed text-justify">
              {reportData.generalIntro}
            </p>
          </div>

          {/* Section: المحور الأول: الرياضيات (من الموضعة إلى هندسة المسارات) */}
          <div className="mb-4 space-y-3">
            <h2 className={`text-xs md:text-sm font-black flex items-center gap-2 ${themeClasses.sectionTitleText}`}>
              <span className="text-base">📐</span>
              <span>المحور الأول: الرياضيات (من الموضعة إلى هندسة المسارات)</span>
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed text-justify">
              {reportData.mathIntro}
            </p>

            {/* Math Table */}
            <div className="overflow-hidden rounded-xl border border-slate-300">
              <table className="w-full text-xs text-right border-collapse">
                <thead>
                  <tr className={themeClasses.tableHeaderBg}>
                    <th className="p-2.5 font-bold w-1/4 border-l border-slate-400/30">
                      المستوى الدراسي
                    </th>
                    <th className="p-2.5 font-bold">
                      هيكلة المسارات والتدرج البيداغوجي
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {reportData.mathLevels.map((row, idx) => (
                    <tr
                      key={row.id || idx}
                      className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}
                    >
                      <td className="p-2.5 font-black text-slate-900 border-l border-slate-200">
                        {row.level}
                      </td>
                      <td className="p-2.5 text-slate-700 font-medium leading-relaxed">
                        {row.structure}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Building Blocks List (اللبنات الأساسية في الرياضيات) Part 1 */}
            <div className="space-y-1.5 pt-2">
              <h3 className="text-xs font-black text-slate-900">
                اللبنات الأساسية لبناء الكفايات الرياضية:
              </h3>
              <ul className="space-y-1 text-xs text-slate-700">
                {reportData.mathBlocks.slice(0, 3).map((block, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold shrink-0 mt-0.5">◆</span>
                    <span>{block}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Page 1 Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>الورشات التذكيرية لفائدة أساتذة مؤسسات الريادة</span>
            <span className="font-bold text-slate-800 font-mono tracking-widest">— 1 —</span>
            <span>إعداد: {reportData.preparedBy}</span>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* PAGE 2 / 3 */}
        {/* ======================================================================= */}
        <div
          ref={page2Ref}
          className="print-page bg-white border border-slate-300 rounded-2xl p-6 md:p-10 shadow-sm max-w-4xl mx-auto relative overflow-hidden font-cairo text-right min-h-[1120px] flex flex-col justify-between"
          style={{ pageBreakAfter: "always", breakAfter: "page" }}
        >
          {/* Top Header of Page 2 */}
          <div>
            {/* Continuation of Math Blocks */}
            <div className="mb-5 pb-4 border-b border-slate-200 space-y-1.5">
              <ul className="space-y-1.5 text-xs text-slate-700">
                {reportData.mathBlocks.slice(3).map((block, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold shrink-0 mt-0.5">◆</span>
                    <span>{block}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section: المحور الثاني: اللغة العربية (التدرج واستراتيجية العلاج المستهدف) */}
            <div className="mb-6 space-y-3">
              <h2 className={`text-xs md:text-sm font-black flex items-center gap-2 ${themeClasses.sectionTitleText}`}>
                <span className="text-base">📖</span>
                <span>المحور الثاني: اللغة العربية (التدرج واستراتيجية العلاج المستهدف)</span>
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed text-justify">
                {reportData.arabicIntro}
              </p>

              {/* Arabic Table */}
              <div className="overflow-hidden rounded-xl border border-slate-300">
                <table className="w-full text-xs text-right border-collapse">
                  <thead>
                    <tr className={themeClasses.tableHeaderBg}>
                      <th className="p-2.5 font-bold w-1/4 border-l border-slate-400/30">
                        المسار
                      </th>
                      <th className="p-2.5 font-bold">
                        نقطة الانطلاق والامتداد البيداغوجي
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {reportData.arabicPaths.map((row, idx) => (
                      <tr
                        key={row.id || idx}
                        className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}
                      >
                        <td className="p-2.5 font-black text-slate-900 border-l border-slate-200">
                          {row.path}
                        </td>
                        <td className="p-2.5 text-slate-700 font-medium leading-relaxed">
                          {row.startAndProgression}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Arabic Notes */}
              <div className="space-y-1 text-xs text-slate-700 pt-1">
                {reportData.arabicNotes.map((note, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold shrink-0 mt-0.5">◆</span>
                    <span>{note}</span>
                  </div>
                ))}
              </div>

              {/* Arabic Validation Callout Box */}
              <div className="bg-amber-50/80 border-r-4 border-amber-500 rounded-lg p-3 text-xs text-amber-950 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>{reportData.arabicValidationTitle}</span>
                </div>
                <p className="leading-relaxed text-slate-800">
                  {reportData.arabicValidationText}
                </p>
              </div>
            </div>

            {/* Section: Troisième Axe: Français — Positionnement & Parcours */}
            <div className="space-y-3 pt-2" dir="ltr">
              <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                <h2 className="text-xs md:text-sm font-black text-slate-900 font-sans flex items-center gap-2">
                  <span className="text-base">🔤</span>
                  <span>{reportData.frenchTitle}</span>
                </h2>
                <span className="bg-sky-100 text-sky-800 font-bold text-[10px] px-2 py-0.5 rounded">
                  Français
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed text-justify font-sans">
                {reportData.frenchIntro}
              </p>

              {/* French Bullets */}
              <ul className="space-y-1.5 text-xs text-slate-700 font-sans">
                {reportData.frenchBullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-sky-600 font-bold shrink-0 mt-0.5">◆</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* French Validation Callout */}
              <div className="bg-rose-50/80 border-l-4 border-rose-500 rounded-lg p-3 text-xs text-slate-800 space-y-1 font-sans">
                <div className="font-bold flex items-center gap-1.5 text-rose-900">
                  <span>📌</span>
                  <span>{reportData.frenchValidationTitle}</span>
                </div>
                <p className="leading-relaxed text-slate-700">
                  {reportData.frenchValidationText}
                </p>
              </div>
            </div>
          </div>

          {/* Page 2 Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>الورشات التذكيرية لفائدة أساتذة مؤسسات الريادة</span>
            <span className="font-bold text-slate-800 font-mono tracking-widest">— 2 —</span>
            <span>إعداد: {reportData.preparedBy}</span>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* PAGE 3 / 3 */}
        {/* ======================================================================= */}
        <div
          ref={page3Ref}
          className="print-page bg-white border border-slate-300 rounded-2xl p-6 md:p-10 shadow-sm max-w-4xl mx-auto relative overflow-hidden font-cairo text-right min-h-[1120px] flex flex-col justify-between"
        >
          <div className="space-y-6">
            {/* Top decorative header on Page 3 */}
            <div className="flex items-center justify-between border-b-2 border-slate-800 pb-4">
              <div className="text-right">
                <p className="text-xs font-bold text-slate-900">المملكة المغربية</p>
                <p className="text-[11px] text-slate-700">وزارة التربية الوطنية والتعليم الأولي والرياضة</p>
                <p className="text-[11px] font-bold text-blue-900">{reportData.institution}</p>
              </div>
              <img
                src="/morocco-ministry-logo.png"
                alt="شعار الوزارة"
                className="h-12 w-12 object-contain"
              />
              <div className="text-left" dir="ltr">
                <p className="text-xs font-bold text-slate-900">Écoles Pionnières</p>
                <p className="text-[11px] text-slate-600">Rapport de Synthèse</p>
                <p className="text-[11px] font-bold text-slate-800">{reportData.academicYear}</p>
              </div>
            </div>

            {/* Section: خلاصة تركيبية وتوصيات اليوم الثاني */}
            <div className="bg-white border-2 border-slate-300 rounded-2xl p-5 shadow-2xs space-y-3">
              <div
                className={`inline-block px-4 py-1 rounded-lg text-white font-black text-xs md:text-sm ${themeClasses.primaryBg}`}
              >
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-300" />
                  <span>{reportData.synthesisTitle}</span>
                </div>
              </div>

              <p className="text-xs md:text-sm text-slate-800 leading-relaxed text-justify font-medium">
                {reportData.synthesisText}
              </p>
            </div>

            {/* Signatures & Endorsements Area (التوقيعات) */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-2 text-xs font-black text-slate-900">
                <span className="text-base">✏️</span>
                <span>التوقيعات والمصادقات الرسمية:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs">
                {/* Teacher Box */}
                <div className="border border-slate-300 rounded-xl p-4 min-h-[140px] flex flex-col justify-between bg-slate-50/50">
                  <div>
                    <div className="w-7 h-7 mx-auto rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold mb-1">
                      👤
                    </div>
                    <span className="font-bold text-slate-900 block">الأستاذ(ة):</span>
                    <span className="text-xs font-black text-blue-900 block mt-1">
                      {reportData.teacherName}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-200">
                    التوقيع والتاريخ: ....................
                  </div>
                </div>

                {/* Director Box */}
                <div className="border border-slate-300 rounded-xl p-4 min-h-[140px] flex flex-col justify-between bg-slate-50/50">
                  <div>
                    <div className="w-7 h-7 mx-auto rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold mb-1">
                      🏫
                    </div>
                    <span className="font-bold text-slate-900 block">السيد(ة) المدير(ة):</span>
                    <span className="text-xs font-bold text-slate-700 block mt-1">
                      {reportData.directorName}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-200">
                    تأشيرة وخاتم الإدارة: ....................
                  </div>
                </div>

                {/* Inspector Box */}
                <div className="border border-slate-300 rounded-xl p-4 min-h-[140px] flex flex-col justify-between bg-slate-50/50">
                  <div>
                    <div className="w-7 h-7 mx-auto rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-1">
                      🔍
                    </div>
                    <span className="font-bold text-slate-900 block">السيد(ة) المفتش(ة):</span>
                    <span className="text-xs font-bold text-slate-700 block mt-1">
                      {reportData.inspectorName}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-200">
                    ملاحظة وتوقيع المفتش: ....................
                  </div>
                </div>
              </div>
            </div>

            {/* Date and Location line */}
            <div className="text-left text-xs text-slate-600 pt-4 font-semibold">
              حرر بـ: <strong>{reportData.city}</strong> في: <strong>{reportData.signDate}</strong>
            </div>
          </div>

          {/* Page 3 Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>الورشات التذكيرية لفائدة أساتذة مؤسسات الريادة</span>
            <span className="font-bold text-slate-800 font-mono tracking-widest">— 3 —</span>
            <span>إعداد: {reportData.preparedBy}</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* EDIT MODAL DIALOG (no-print) */}
      {/* ========================================================================= */}
      {isEditorOpen && (
        <div className="no-print fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-blue-700" />
                <h3 className="text-base font-bold text-slate-900">
                  تعديل محتوى تقرير ورشات الريادة بالكامل
                </h3>
              </div>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs in Editor */}
            <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1 text-xs">
              <button
                type="button"
                onClick={() => setEditorTab("general")}
                className={`px-3 py-2 rounded-lg font-bold transition cursor-pointer shrink-0 ${
                  editorTab === "general"
                    ? "bg-blue-700 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                1. البيانات العامة والبطاقة التقنية
              </button>
              <button
                type="button"
                onClick={() => setEditorTab("math")}
                className={`px-3 py-2 rounded-lg font-bold transition cursor-pointer shrink-0 ${
                  editorTab === "math"
                    ? "bg-blue-700 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                2. محور الرياضيات
              </button>
              <button
                type="button"
                onClick={() => setEditorTab("arabic")}
                className={`px-3 py-2 rounded-lg font-bold transition cursor-pointer shrink-0 ${
                  editorTab === "arabic"
                    ? "bg-blue-700 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                3. محور اللغة العربية
              </button>
              <button
                type="button"
                onClick={() => setEditorTab("french")}
                className={`px-3 py-2 rounded-lg font-bold transition cursor-pointer shrink-0 ${
                  editorTab === "french"
                    ? "bg-blue-700 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                4. محور اللغة الفرنسية
              </button>
              <button
                type="button"
                onClick={() => setEditorTab("synthesis")}
                className={`px-3 py-2 rounded-lg font-bold transition cursor-pointer shrink-0 ${
                  editorTab === "synthesis"
                    ? "bg-blue-700 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                5. التوصيات والتوقيعات
              </button>
            </div>

            <form onSubmit={handleSaveEditor} className="space-y-4 text-xs">
              {/* TAB 1: General Info */}
              {editorTab === "general" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">عنوان التقرير الرئيسي:</label>
                      <input
                        type="text"
                        value={tempData.title}
                        onChange={(e) => setTempData({ ...tempData, title: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-lg p-2 font-bold"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">المحطة / رقم اليوم:</label>
                      <input
                        type="text"
                        value={tempData.dayNumber}
                        onChange={(e) => setTempData({ ...tempData, dayNumber: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-lg p-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">العنوان الفرعي للمشروع:</label>
                      <input
                        type="text"
                        value={tempData.subtitle}
                        onChange={(e) => setTempData({ ...tempData, subtitle: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-lg p-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">تاريخ إنجاز التقرير:</label>
                      <input
                        type="text"
                        value={tempData.dateText}
                        onChange={(e) => setTempData({ ...tempData, dateText: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-lg p-2 font-bold"
                        required
                      />
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-3">
                    <h4 className="font-bold text-slate-900 mb-2">البطاقة التقنية (4 مربعات):</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-600 font-medium mb-1">المستهدفون بالدورة:</label>
                        <input
                          type="text"
                          value={tempData.technicalCard.targetAudience}
                          onChange={(e) =>
                            setTempData({
                              ...tempData,
                              technicalCard: { ...tempData.technicalCard, targetAudience: e.target.value },
                            })
                          }
                          className="w-full bg-white border border-slate-300 rounded-lg p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-medium mb-1">طبيعة المحطة والتكوين:</label>
                        <input
                          type="text"
                          value={tempData.technicalCard.sessionNature}
                          onChange={(e) =>
                            setTempData({
                              ...tempData,
                              technicalCard: { ...tempData.technicalCard, sessionNature: e.target.value },
                            })
                          }
                          className="w-full bg-white border border-slate-300 rounded-lg p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-medium mb-1">المحاور البيداغوجية:</label>
                        <input
                          type="text"
                          value={tempData.technicalCard.axes}
                          onChange={(e) =>
                            setTempData({
                              ...tempData,
                              technicalCard: { ...tempData.technicalCard, axes: e.target.value },
                            })
                          }
                          className="w-full bg-white border border-slate-300 rounded-lg p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-medium mb-1">الهدف الاستراتيجي:</label>
                        <input
                          type="text"
                          value={tempData.technicalCard.strategicObjective}
                          onChange={(e) =>
                            setTempData({
                              ...tempData,
                              technicalCard: { ...tempData.technicalCard, strategicObjective: e.target.value },
                            })
                          }
                          className="w-full bg-white border border-slate-300 rounded-lg p-2"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">إطار عام وتأطير بيداغوجي للورشات:</label>
                    <textarea
                      rows={4}
                      value={tempData.generalIntro}
                      onChange={(e) => setTempData({ ...tempData, generalIntro: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: Math */}
              {editorTab === "math" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">مقدمة وتأطير محور الرياضيات:</label>
                    <textarea
                      rows={3}
                      value={tempData.mathIntro}
                      onChange={(e) => setTempData({ ...tempData, mathIntro: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 leading-relaxed"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-slate-800 font-bold">جدول هيكلة المسارات والتدرج (الرياضيات):</label>
                      <button
                        type="button"
                        onClick={handleAddMathRow}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2.5 py-1 rounded text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>إضافة صف للمستوى</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {tempData.mathLevels.map((row, idx) => (
                        <div
                          key={row.id || idx}
                          className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200"
                        >
                          <input
                            type="text"
                            value={row.level}
                            onChange={(e) => {
                              const updated = [...tempData.mathLevels];
                              updated[idx].level = e.target.value;
                              setTempData({ ...tempData, mathLevels: updated });
                            }}
                            className="w-1/4 bg-white border border-slate-300 rounded p-1.5 font-bold"
                            placeholder="المستوى"
                          />
                          <input
                            type="text"
                            value={row.structure}
                            onChange={(e) => {
                              const updated = [...tempData.mathLevels];
                              updated[idx].structure = e.target.value;
                              setTempData({ ...tempData, mathLevels: updated });
                            }}
                            className="flex-1 bg-white border border-slate-300 rounded p-1.5"
                            placeholder="هيكلة المسار والتدرج"
                          />
                          <button
                            type="button"
                            onClick={() => handleDeleteMathRow(row.id)}
                            className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      اللبنات الأساسية لبناء الكفايات الرياضية (كل سطر يمثل لبنة):
                    </label>
                    <textarea
                      rows={5}
                      value={tempData.mathBlocks.join("\n")}
                      onChange={(e) =>
                        setTempData({
                          ...tempData,
                          mathBlocks: e.target.value.split("\n").filter((l) => l.trim().length > 0),
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 leading-relaxed font-sans"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: Arabic */}
              {editorTab === "arabic" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">مقدمة وتأطير محور اللغة العربية:</label>
                    <textarea
                      rows={3}
                      value={tempData.arabicIntro}
                      onChange={(e) => setTempData({ ...tempData, arabicIntro: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 leading-relaxed"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-slate-800 font-bold">جدول مسارات اللغة العربية ونقاط الانطلاق:</label>
                      <button
                        type="button"
                        onClick={handleAddArabicRow}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2.5 py-1 rounded text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>إضافة مسار</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {tempData.arabicPaths.map((row, idx) => (
                        <div
                          key={row.id || idx}
                          className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200"
                        >
                          <input
                            type="text"
                            value={row.path}
                            onChange={(e) => {
                              const updated = [...tempData.arabicPaths];
                              updated[idx].path = e.target.value;
                              setTempData({ ...tempData, arabicPaths: updated });
                            }}
                            className="w-1/4 bg-white border border-slate-300 rounded p-1.5 font-bold"
                            placeholder="المسار"
                          />
                          <input
                            type="text"
                            value={row.startAndProgression}
                            onChange={(e) => {
                              const updated = [...tempData.arabicPaths];
                              updated[idx].startAndProgression = e.target.value;
                              setTempData({ ...tempData, arabicPaths: updated });
                            }}
                            className="flex-1 bg-white border border-slate-300 rounded p-1.5"
                            placeholder="نقطة الانطلاق والامتداد"
                          />
                          <button
                            type="button"
                            onClick={() => handleDeleteArabicRow(row.id)}
                            className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      الملاحظات والتوجيهات البيداغوجية (سطر لكل نقطة):
                    </label>
                    <textarea
                      rows={3}
                      value={tempData.arabicNotes.join("\n")}
                      onChange={(e) =>
                        setTempData({
                          ...tempData,
                          arabicNotes: e.target.value.split("\n").filter((l) => l.trim().length > 0),
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 leading-relaxed"
                    />
                  </div>

                  <div className="border-t border-slate-200 pt-3 space-y-2">
                    <label className="block text-slate-700 font-bold">صندوق مسطرة التصديق والمعالجة:</label>
                    <input
                      type="text"
                      value={tempData.arabicValidationTitle}
                      onChange={(e) => setTempData({ ...tempData, arabicValidationTitle: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 font-bold"
                    />
                    <textarea
                      rows={3}
                      value={tempData.arabicValidationText}
                      onChange={(e) => setTempData({ ...tempData, arabicValidationText: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* TAB 4: French */}
              {editorTab === "french" && (
                <div className="space-y-4" dir="ltr">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Titre de l'Axe Français:</label>
                    <input
                      type="text"
                      value={tempData.frenchTitle}
                      onChange={(e) => setTempData({ ...tempData, frenchTitle: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 font-bold font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Texte d'introduction:</label>
                    <textarea
                      rows={3}
                      value={tempData.frenchIntro}
                      onChange={(e) => setTempData({ ...tempData, frenchIntro: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 leading-relaxed font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Points clés du positionnement & paliers (1 ligne par point):
                    </label>
                    <textarea
                      rows={5}
                      value={tempData.frenchBullets.join("\n")}
                      onChange={(e) =>
                        setTempData({
                          ...tempData,
                          frenchBullets: e.target.value.split("\n").filter((l) => l.trim().length > 0),
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 leading-relaxed font-sans"
                    />
                  </div>

                  <div className="border-t border-slate-200 pt-3 space-y-2">
                    <label className="block text-slate-700 font-bold">Validation des paliers en Français:</label>
                    <input
                      type="text"
                      value={tempData.frenchValidationTitle}
                      onChange={(e) => setTempData({ ...tempData, frenchValidationTitle: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 font-bold font-sans"
                    />
                    <textarea
                      rows={3}
                      value={tempData.frenchValidationText}
                      onChange={(e) => setTempData({ ...tempData, frenchValidationText: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 leading-relaxed font-sans"
                    />
                  </div>
                </div>
              )}

              {/* TAB 5: Synthesis & Signatures */}
              {editorTab === "synthesis" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">عنوان الخلاصة التركيبية:</label>
                    <input
                      type="text"
                      value={tempData.synthesisTitle}
                      onChange={(e) => setTempData({ ...tempData, synthesisTitle: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">نص الخلاصة التركيبية والتوصيات:</label>
                    <textarea
                      rows={5}
                      value={tempData.synthesisText}
                      onChange={(e) => setTempData({ ...tempData, synthesisText: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 leading-relaxed font-medium"
                    />
                  </div>

                  <div className="border-t border-slate-200 pt-3">
                    <h4 className="font-bold text-slate-900 mb-2">التوقيعات وبيانات المؤسسة:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-slate-600 font-medium mb-1">اسم الأستاذ(ة):</label>
                        <input
                          type="text"
                          value={tempData.teacherName}
                          onChange={(e) => setTempData({ ...tempData, teacherName: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-lg p-2 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-medium mb-1">اسم/صفة المدير(ة):</label>
                        <input
                          type="text"
                          value={tempData.directorName}
                          onChange={(e) => setTempData({ ...tempData, directorName: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-lg p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-medium mb-1">اسم/صفة المفتش(ة):</label>
                        <input
                          type="text"
                          value={tempData.inspectorName}
                          onChange={(e) => setTempData({ ...tempData, inspectorName: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-lg p-2"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                      <div>
                        <label className="block text-slate-600 font-medium mb-1">المؤسسة:</label>
                        <input
                          type="text"
                          value={tempData.institution}
                          onChange={(e) => setTempData({ ...tempData, institution: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-lg p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-medium mb-1">المدينة / الجماعة:</label>
                        <input
                          type="text"
                          value={tempData.city}
                          onChange={(e) => setTempData({ ...tempData, city: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-lg p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-medium mb-1">تاريخ التوقيع:</label>
                        <input
                          type="text"
                          value={tempData.signDate}
                          onChange={(e) => setTempData({ ...tempData, signDate: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-lg p-2 font-bold"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom buttons */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-2 rounded-lg text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>تطبيق وحفظ التعديلات فوراً</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
