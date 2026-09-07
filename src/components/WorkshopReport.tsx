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
  BookOpen,
  UserCheck,
  Calendar,
  Building,
  GraduationCap,
  Puzzle,
} from "lucide-react";
import {
  TeacherProfile,
  WorkshopReportData,
  MathActivityRow,
  MathLevelRow,
  ArabicPathRow,
} from "../types";
import { DEFAULT_WORKSHOP_REPORT } from "../data/defaultTemplates";
import { generateMultiPagePdfFromElements } from "../utils/pdfGenerator";

interface WorkshopReportProps {
  teacherProfile: TeacherProfile;
}

/**
 * Aesthetic Moroccan Educational Edge & Corner Decorations
 * Reproduces the authentic pedagogical visual style (waves, graduation motifs, pen, dotted matrix)
 * exactly as shown in official educational reports.
 */
const PageDecorations: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
    {/* Top-Left Corner: Dual Fluid Wave Bands & Educational Motif */}
    <div className="absolute -top-3 -left-3 w-48 h-48">
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xs" fill="none">
        {/* Golden Amber Ribbon Wave */}
        <path
          d="M0 165 C 45 145, 85 165, 125 115 C 155 75, 165 35, 175 0 L 0 0 Z"
          fill="#f59e0b"
          opacity="0.9"
        />
        {/* Deep Royal Blue Wave */}
        <path
          d="M0 138 C 35 118, 65 132, 100 92 C 128 52, 138 22, 145 0 L 0 0 Z"
          fill="#1e40af"
        />
        {/* Cyan Accent Wave */}
        <path
          d="M0 102 C 28 88, 48 98, 78 68 C 98 38, 108 18, 115 0 L 0 0 Z"
          fill="#0284c7"
          opacity="0.92"
        />
      </svg>
      {/* Educational Illustration: Graduation Cap, Notebook & Pen */}
      <div className="absolute top-4 left-4 w-18 h-18">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          {/* Mortarboard Cap */}
          <polygon points="50,14 86,29 50,44 14,29" fill="#0f172a" />
          <polygon points="50,44 80,32 80,48 50,60 20,48 20,32" fill="#1e293b" />
          {/* Golden Tassel */}
          <path d="M76,32 Q80,42 76,55" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
          <circle cx="76" cy="56" r="3" fill="#f59e0b" />
          {/* Notebook / Stacked Book */}
          <path d="M22,66 L78,66 L72,76 L16,76 Z" fill="#2563eb" />
          <path d="M16,76 L72,76 L70,83 L14,83 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" />
          <path d="M14,83 L70,83 L65,93 L9,93 Z" fill="#f59e0b" />
          {/* Ink Fountain Pen */}
          <g transform="rotate(-38 32 46)">
            <rect x="28" y="22" width="7" height="34" rx="2" fill="#0284c7" />
            <polygon points="28,56 35,56 31.5,69" fill="#f59e0b" />
            <line x1="31.5" y1="56" x2="31.5" y2="66" stroke="#0f172a" strokeWidth="1" />
          </g>
        </svg>
      </div>
    </div>

    {/* Top-Right Corner: Mini Cap & Flowing Curves */}
    <div className="absolute -top-2 -right-2 w-32 h-32">
      <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
        <path
          d="M120 0 L0 0 C 35 45, 75 55, 120 75 Z"
          fill="#f59e0b"
          opacity="0.85"
        />
        <path
          d="M120 0 L25 0 C 50 32, 80 40, 120 54 Z"
          fill="#1e3a8a"
        />
      </svg>
      <div className="absolute top-3 right-3 w-10 h-10">
        <svg viewBox="0 0 60 60" className="w-full h-full drop-shadow-xs">
          <polygon points="30,8 52,18 30,28 8,18" fill="#0f172a" />
          <path d="M45,20 Q48,27 46,36" stroke="#f59e0b" strokeWidth="2" fill="none" />
          <circle cx="46" cy="37" r="2" fill="#f59e0b" />
        </svg>
      </div>
    </div>

    {/* Left Lateral Wave (Smooth flowing ribbon along the side) */}
    <div className="absolute top-1/3 -left-2 w-7 h-52 opacity-70">
      <svg viewBox="0 0 40 200" className="w-full h-full" fill="none">
        <path
          d="M0 0 C 25 40, 25 80, 0 120 C 25 160, 25 180, 0 200 L 0 0 Z"
          fill="#0284c7"
        />
        <path
          d="M0 25 C 18 55, 18 95, 0 135 L 0 25 Z"
          fill="#f59e0b"
          opacity="0.85"
        />
      </svg>
    </div>

    {/* Bottom-Left Corner: Dotted Matrix Grid (as in the photo) */}
    <div className="absolute bottom-5 left-5 opacity-40">
      <svg width="65" height="42" viewBox="0 0 65 42" fill="#334155">
        <circle cx="6" cy="6" r="1.6" />
        <circle cx="18" cy="6" r="1.6" />
        <circle cx="30" cy="6" r="1.6" />
        <circle cx="42" cy="6" r="1.6" />
        <circle cx="54" cy="6" r="1.6" />
        <circle cx="6" cy="17" r="1.6" />
        <circle cx="18" cy="17" r="1.6" />
        <circle cx="30" cy="17" r="1.6" />
        <circle cx="42" cy="17" r="1.6" />
        <circle cx="54" cy="17" r="1.6" />
        <circle cx="6" cy="28" r="1.6" />
        <circle cx="18" cy="28" r="1.6" />
        <circle cx="30" cy="28" r="1.6" />
        <circle cx="42" cy="28" r="1.6" />
        <circle cx="54" cy="28" r="1.6" />
        <circle cx="6" cy="38" r="1.6" />
        <circle cx="18" cy="38" r="1.6" />
        <circle cx="30" cy="38" r="1.6" />
        <circle cx="42" cy="38" r="1.6" />
        <circle cx="54" cy="38" r="1.6" />
      </svg>
    </div>

    {/* Bottom-Right Corner: Diagonal Ribbon Waves */}
    <div className="absolute -bottom-4 -right-4 w-44 h-44">
      <svg viewBox="0 0 180 180" className="w-full h-full" fill="none">
        <path
          d="M180 25 C 130 45, 65 95, 25 180 L 180 180 Z"
          fill="#f59e0b"
          opacity="0.95"
        />
        <path
          d="M180 60 C 142 75, 90 120, 60 180 L 180 180 Z"
          fill="#1e3a8a"
        />
        <path
          d="M180 100 C 158 112, 122 142, 100 180 L 180 180 Z"
          fill="#0284c7"
          opacity="0.85"
        />
      </svg>
    </div>
  </div>
);

export const WorkshopReport: React.FC<WorkshopReportProps> = ({ teacherProfile }) => {
  const [reportData, setReportData] = useState<WorkshopReportData>(() => {
    try {
      const saved = localStorage.getItem("profpress_workshop_report");
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_WORKSHOP_REPORT,
          ...parsed,
          mathActivities: parsed.mathActivities || DEFAULT_WORKSHOP_REPORT.mathActivities,
          institution: teacherProfile.institution || parsed.institution || DEFAULT_WORKSHOP_REPORT.institution,
          teacherName: teacherProfile.fullNameAr || parsed.teacherName || DEFAULT_WORKSHOP_REPORT.teacherName,
          city: teacherProfile.commune || parsed.city || DEFAULT_WORKSHOP_REPORT.city,
        };
      }
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

  const [colorTheme, setColorTheme] = useState<"blue" | "emerald">("blue");
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [generationProgress, setGenerationProgress] = useState("");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorTab, setEditorTab] = useState<
    "general" | "mathActivities" | "mathLevels" | "arabic" | "french" | "synthesis"
  >("general");

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
    if (window.confirm("هل ترغب في استعادة النموذج الأصلي المعتمد لتقرير الورشات؟")) {
      const resetData: WorkshopReportData = {
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

  // Generate 3-page A4 PDF without blank pages
  const handleDownloadPdf = async () => {
    if (!page1Ref.current || !page2Ref.current || !page3Ref.current) return;
    setIsGeneratingPdf(true);
    setGenerationProgress("جاري فحص جميع الخطوط والعناصر والصفحات...");
    try {
      await generateMultiPagePdfFromElements(
        [page1Ref.current, page2Ref.current, page3Ref.current],
        {
          filename: `تقرير_ورشات_الريادة_${reportData.dayNumber.replace(/\s+/g, "_")}.pdf`,
          orientation: "portrait",
          quality: "ultra",
          colorMode: "color",
          onProgress: (status) => setGenerationProgress(status),
        }
      );
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("حدث خطأ أثناء تصدير ملف PDF. يرجى استخدام زر طباعة المتصفح مباشرة كبديل فوري.");
    } finally {
      setIsGeneratingPdf(false);
      setGenerationProgress("");
    }
  };

  // Math activities helpers
  const handleAddMathActivity = () => {
    const newAct: MathActivityRow = {
      id: "act_" + Date.now(),
      domain: "مجال نشاط جديد",
      activities: "توصيف الأنشطة والوسائل المستعملة...",
    };
    setTempData((prev) => ({
      ...prev,
      mathActivities: [...(prev.mathActivities || []), newAct],
    }));
  };

  const handleDeleteMathActivity = (id: string) => {
    setTempData((prev) => ({
      ...prev,
      mathActivities: (prev.mathActivities || []).filter((a) => a.id !== id),
    }));
  };

  // Helpers to add/remove Math rows
  const handleAddMathRow = () => {
    const newRow: MathLevelRow = {
      id: "m_" + Date.now(),
      level: "المستوى الدراسي",
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
      path: `المسار ${(tempData.arabicPaths || []).length + 1}`,
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

  const mathActivitiesList = reportData.mathActivities || DEFAULT_WORKSHOP_REPORT.mathActivities || [];

  return (
    <div className="space-y-6">
      {/* Top Action & Controls Bar (no-print) */}
      <div className="no-print bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-700" />
                <span>تقرير ورشات الريادة الرسمي (3 صفحات A4 منسقة كالصورة تماماً)</span>
              </h2>
              <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-300">
                تنسيق جوانب فاخر وإخراج A4 متقن
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              تقرير إجمالي وتنفيذي لأشغال الورشات التذكيرية لدعم التعلمات الأساس بمؤسسات الريادة، مع زخارف جانبية بيداغوجية، رأس صفحة رسمي وجداول بيانات واضحة.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleResetToDefault}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-medium flex items-center gap-1.5 cursor-pointer transition"
              title="استعادة النص الرسمي الأصلي"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>استعادة النموذج المعتمد</span>
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
              title="تصدير ملف PDF متكامل عالي الدقة دون أي صفحات بيضاء"
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
              تم ضبط <strong>الهيدر الرسمي والزخارف الجانبية</strong> المعتمدة في وثائق الريادة، وحل مشكلة تحميل PDF لتأكيد تحميل كافة الخطوط والرسوم مسبقاً لمنع ظهور أي صفحات بيضاء.
            </span>
          </div>
          <div className="text-slate-500 text-[11px] shrink-0 font-medium">
            تاريخ الإنجاز: <strong>{reportData.dateText}</strong>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3 OFFICIAL A4 PAGES CONTAINER (PRINTABLE & PDF-READY) */}
      {/* ========================================================================= */}
      <div className="space-y-8 print:space-y-0 print:block">
        {/* ======================================================================= */}
        {/* PAGE 1 / 3 */}
        {/* ======================================================================= */}
        <div
          ref={page1Ref}
          className="print-page bg-white border border-slate-300 rounded-2xl p-6 sm:p-7 shadow-md max-w-4xl mx-auto relative overflow-hidden font-cairo text-right min-h-[1090px] flex flex-col justify-between"
          style={{ pageBreakAfter: "always", breakAfter: "page" }}
        >
          {/* Aesthetic Decorative Edges & Pedagogical Corners */}
          <PageDecorations />

          {/* Page 1 Foreground Content */}
          <div className="relative z-10 space-y-3.5">
            {/* Header: Centered Large Title & Subtitle (مطابق للصورة) */}
            <div className="text-center pt-2 pb-1 space-y-1">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-cairo tracking-tight">
                {reportData.title}
              </h1>
              <p className="text-xs sm:text-sm font-bold text-blue-700 font-cairo">
                {reportData.subtitle}
              </p>
            </div>

            {/* Information Card (بطاقة المعلومات التنظيمية والتأطيرية - مطابق للصورة) */}
            <div className="border border-blue-200/90 bg-white/90 rounded-2xl p-3 sm:p-3.5 shadow-2xs backdrop-blur-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-xs">
                {/* Right Column */}
                <div className="space-y-1.5 text-right">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
                      <Building className="w-3.5 h-3.5" />
                    </span>
                    <span className="font-bold text-slate-900">الجهة التنظيمية:</span>
                    <span className="text-slate-700 font-medium">
                      وزارة التربية الوطنية والتعليم الأولي والرياضة
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-3.5 h-3.5" />
                    </span>
                    <span className="font-bold text-slate-900">الفئة المستهدفة:</span>
                    <span className="text-slate-700 font-medium">
                      {reportData.technicalCard.targetAudience}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
                      <UserCheck className="w-3.5 h-3.5" />
                    </span>
                    <span className="font-bold text-slate-900">إعداد:</span>
                    <span className="text-blue-900 font-bold">
                      {reportData.teacherName || reportData.preparedBy || "...................."}
                    </span>
                  </div>
                </div>

                {/* Left Column */}
                <div className="space-y-1.5 text-right sm:text-right">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
                      <Calendar className="w-3.5 h-3.5" />
                    </span>
                    <span className="font-bold text-slate-900">التاريخ:</span>
                    <span className="text-slate-800 font-bold font-mono">
                      {reportData.dateText}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
                      <Clock className="w-3.5 h-3.5" />
                    </span>
                    <span className="font-bold text-slate-900">مدة الدورة:</span>
                    <span className="text-slate-700 font-medium">
                      3 أيام ({reportData.dayNumber} ختامي)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
                      <Bookmark className="w-3.5 h-3.5" />
                    </span>
                    <span className="font-bold text-slate-900">طبيعة التكوين:</span>
                    <span className="text-slate-700 font-medium">
                      {reportData.technicalCard.sessionNature}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 1: التقديم العام والهدف الاستراتيجي (مطابق للصورة) */}
            <div className="border border-slate-200/90 bg-white/95 rounded-2xl p-3.5 shadow-2xs space-y-2">
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white font-black text-xs sm:text-sm px-4 py-1.5 rounded-full shadow-xs inline-flex items-center gap-1.5">
                  <span>1. التقديم العام والهدف الاستراتيجي</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                  <Target className="w-3.5 h-3.5 text-slate-900" />
                </div>
              </div>

              <p className="text-[11px] text-slate-700 leading-relaxed text-justify">
                {reportData.generalIntro}
              </p>

              {/* Callout: الهدف العام (مع أيقونة الهدف كما في الصورة) */}
              <div className="border border-blue-200/80 bg-sky-50/60 rounded-xl p-2.5 flex items-center gap-3 mt-1">
                <div className="w-8 h-8 rounded-full bg-white border border-blue-200 text-blue-700 flex items-center justify-center shrink-0 shadow-2xs">
                  <Target className="w-4 h-4 text-blue-700" />
                </div>
                <p className="text-[11px] text-slate-800 leading-relaxed">
                  <strong className="text-blue-950 font-black">الهدف العام: </strong>
                  {reportData.technicalCard.strategicObjective}
                </p>
              </div>
            </div>

            {/* Section 2: المحور الأول: هيكلة ومكونات أنشطة الرياضيات (مطابق للصورة) */}
            <div className="border border-slate-200/90 bg-white/95 rounded-2xl p-3.5 shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white font-black text-xs sm:text-sm px-4 py-1.5 rounded-full shadow-xs inline-flex items-center gap-1.5">
                  <span>2. المحور الأول: هيكلة ومكونات أنشطة الرياضيات</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                  <Puzzle className="w-3.5 h-3.5 text-slate-900" />
                </div>
              </div>

              <p className="text-[11px] text-slate-700 leading-relaxed text-justify">
                {reportData.mathIntro}
              </p>

              {/* DATA TABLE: الأنشطة والوسائل الديداكتيكية بالرياضيات (تطابق كامل مع جدول الصورة) */}
              <div className="overflow-hidden rounded-xl border border-sky-300 shadow-2xs">
                <table className="w-full text-[11px] text-right border-collapse">
                  <thead>
                    <tr className="bg-sky-100/90 text-blue-950 font-black border-b border-sky-300">
                      <th className="p-2 border-l border-sky-300 text-center w-1/4">
                        مجال النشاط
                      </th>
                      <th className="p-2 text-center">
                        الأنشطة والوسائل المعتمدة
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sky-200 text-[10.5px]">
                    {mathActivitiesList.map((row, idx) => (
                      <tr
                        key={row.id || idx}
                        className={idx % 2 === 0 ? "bg-white" : "bg-sky-50/40"}
                      >
                        <td className="p-2 font-bold text-slate-900 text-center border-l border-sky-200 align-middle">
                          {row.domain}
                        </td>
                        <td className="p-2 text-slate-700 leading-relaxed">
                          {row.activities}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Page 1 Footer */}
          <div className="relative z-10 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-medium">
            <span>الورشات التذكيرية لدعم التعلمات الأساس — مؤسسات الريادة</span>
            <span className="font-bold text-slate-800 font-mono tracking-widest">— 1 —</span>
            <span>المملكة المغربية • وزارة التربية الوطنية</span>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* PAGE 2 / 3 */}
        {/* ======================================================================= */}
        <div
          ref={page2Ref}
          className="print-page bg-white border border-slate-300 rounded-2xl p-6 sm:p-7 shadow-md max-w-4xl mx-auto relative overflow-hidden font-cairo text-right min-h-[1090px] flex flex-col justify-between"
          style={{ pageBreakAfter: "always", breakAfter: "page" }}
        >
          {/* Aesthetic Decorative Edges & Pedagogical Corners */}
          <PageDecorations />

          {/* Page 2 Foreground Content */}
          <div className="relative z-10 space-y-3.5">
            {/* Top Running Header of Page 2 */}
            <div className="border-b border-slate-200 pb-2 flex items-center justify-between text-[10px] font-bold text-slate-700">
              <span className="text-slate-900 font-bold">المملكة المغربية • وزارة التربية الوطنية والتعليم الأولي والرياضة</span>
              <span className="text-blue-900 font-black">تقرير أشغال الورشات التذكيرية — مؤسسات الريادة</span>
              <span dir="ltr" className="font-mono text-slate-500">2026/2027</span>
            </div>

            {/* Section: هندسة المسارات والتدرج البيداغوجي في الرياضيات */}
            <div className="border border-slate-200/90 bg-white/95 rounded-2xl p-3.5 shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white font-black text-xs sm:text-sm px-4 py-1.5 rounded-full shadow-xs inline-flex items-center gap-1.5">
                  <span>هندسة المسارات والتدرج البيداغوجي في الرياضيات</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                  <Layers className="w-3.5 h-3.5 text-slate-900" />
                </div>
              </div>

              {/* Math Levels Progression Table (منسق كالصورة بألوان السماء الهادئة) */}
              <div className="overflow-hidden rounded-xl border border-sky-300 shadow-2xs">
                <table className="w-full text-[11px] text-right border-collapse">
                  <thead>
                    <tr className="bg-sky-100/90 text-blue-950 font-black border-b border-sky-300">
                      <th className="p-2 border-l border-sky-300 text-center w-1/4">
                        المستوى الدراسي
                      </th>
                      <th className="p-2 text-center">
                        هيكلة المسارات والتدرج البيداغوجي المعتمد
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sky-200 text-[10.5px]">
                    {reportData.mathLevels.map((row, idx) => (
                      <tr
                        key={row.id || idx}
                        className={idx % 2 === 0 ? "bg-white" : "bg-sky-50/40"}
                      >
                        <td className="p-2 font-bold text-slate-900 text-center border-l border-sky-200 align-middle">
                          {row.level}
                        </td>
                        <td className="p-2 text-slate-700 leading-relaxed">
                          {row.structure}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 5 Building Blocks of Math in a clean structured layout */}
              <div className="space-y-1 pt-0.5">
                <span className="text-[11px] font-black text-slate-900 block">
                  اللبنات الأساسية لبناء الكفايات الرياضية:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[10.5px]">
                  {reportData.mathBlocks.map((block, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-1.5 bg-sky-50/60 border border-sky-200 rounded-lg px-2.5 py-1"
                    >
                      <span className="text-blue-700 font-black shrink-0 mt-0.5">◆</span>
                      <span className="text-slate-800 leading-tight">{block}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 3: المحور الثاني: أنشطة اللغة العربية واستراتيجية المسارات */}
            <div className="border border-slate-200/90 bg-white/95 rounded-2xl p-3.5 shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white font-black text-xs sm:text-sm px-4 py-1.5 rounded-full shadow-xs inline-flex items-center gap-1.5">
                  <span>3. المحور الثاني: أنشطة اللغة العربية واستراتيجية المسارات</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                  <BookOpen className="w-3.5 h-3.5 text-slate-900" />
                </div>
              </div>

              <p className="text-[11px] text-slate-700 leading-relaxed text-justify">
                {reportData.arabicIntro}
              </p>

              {/* Arabic Paths Table */}
              <div className="overflow-hidden rounded-xl border border-sky-300 shadow-2xs">
                <table className="w-full text-[11px] text-right border-collapse">
                  <thead>
                    <tr className="bg-sky-100/90 text-blue-950 font-black border-b border-sky-300">
                      <th className="p-2 border-l border-sky-300 text-center w-1/4">
                        المسار
                      </th>
                      <th className="p-2 text-center">
                        نقطة الانطلاق والامتداد البيداغوجي
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sky-200 text-[10.5px]">
                    {reportData.arabicPaths.map((row, idx) => (
                      <tr
                        key={row.id || idx}
                        className={idx % 2 === 0 ? "bg-white" : "bg-sky-50/40"}
                      >
                        <td className="p-2 font-bold text-slate-900 text-center border-l border-sky-200 align-middle">
                          {row.path}
                        </td>
                        <td className="p-2 text-slate-700 leading-relaxed">
                          {row.startAndProgression}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Arabic Notes */}
              <div className="space-y-1 text-[10.5px] text-slate-700">
                {reportData.arabicNotes.map((note, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-500 font-bold shrink-0 mt-0.5">◆</span>
                    <span>{note}</span>
                  </div>
                ))}
              </div>

              {/* Arabic Validation Callout */}
              <div className="bg-amber-50/90 border border-amber-300 rounded-xl p-2.5 text-[11px] text-amber-950 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-900">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>{reportData.arabicValidationTitle}</span>
                </div>
                <p className="leading-relaxed text-slate-800 text-[10.5px]">
                  {reportData.arabicValidationText}
                </p>
              </div>
            </div>
          </div>

          {/* Page 2 Footer */}
          <div className="relative z-10 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-medium">
            <span>الورشات التذكيرية لدعم التعلمات الأساس — مؤسسات الريادة</span>
            <span className="font-bold text-slate-800 font-mono tracking-widest">— 2 —</span>
            <span>المملكة المغربية • وزارة التربية الوطنية</span>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* PAGE 3 / 3 */}
        {/* ======================================================================= */}
        <div
          ref={page3Ref}
          className="print-page bg-white border border-slate-300 rounded-2xl p-6 sm:p-7 shadow-md max-w-4xl mx-auto relative overflow-hidden font-cairo text-right min-h-[1090px] flex flex-col justify-between"
        >
          {/* Aesthetic Decorative Edges & Pedagogical Corners */}
          <PageDecorations />

          {/* Page 3 Foreground Content */}
          <div className="relative z-10 space-y-3.5">
            {/* Top Running Header on Page 3 */}
            <div className="border-b border-slate-200 pb-2 flex items-center justify-between text-[10px] font-bold text-slate-700">
              <span className="text-slate-900 font-bold">المملكة المغربية • وزارة التربية الوطنية والتعليم الأولي والرياضة</span>
              <span className="text-blue-900 font-black">Écoles Pionnières • Rapport de Synthèse</span>
              <span dir="ltr" className="font-mono text-slate-500">{reportData.academicYear}</span>
            </div>

            {/* Section 4: Troisième Axe: Français — Positionnement & Parcours */}
            <div className="border border-slate-200/90 bg-white/95 rounded-2xl p-3.5 shadow-2xs space-y-2" dir="ltr">
              <div className="flex items-center justify-between">
                <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white font-black text-xs sm:text-sm px-4 py-1.5 rounded-full shadow-xs inline-flex items-center gap-1.5">
                  <span>{reportData.frenchTitle}</span>
                </div>
                <span className="bg-blue-100 text-blue-900 font-bold text-[10px] px-2.5 py-0.5 rounded-full">
                  Français
                </span>
              </div>

              <p className="text-[11px] text-slate-700 leading-relaxed text-justify font-sans">
                {reportData.frenchIntro}
              </p>

              {/* French 6 Paliers progression list */}
              <ul className="space-y-1 text-[10.5px] text-slate-700 font-sans">
                {reportData.frenchBullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-blue-600 font-bold shrink-0 mt-0.5">◆</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* French Validation Callout */}
              <div className="bg-sky-50/80 border border-sky-300 rounded-xl p-2.5 text-[10.5px] text-slate-800 space-y-1 font-sans">
                <div className="font-bold flex items-center gap-1.5 text-blue-950">
                  <span>📌</span>
                  <span>{reportData.frenchValidationTitle}</span>
                </div>
                <p className="leading-relaxed text-slate-700">
                  {reportData.frenchValidationText}
                </p>
              </div>
            </div>

            {/* Section 5: خلاصة تركيبية وتوصيات اليوم والالتزامات */}
            <div className="border border-slate-200/90 bg-white/95 rounded-2xl p-3.5 shadow-2xs space-y-2">
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white font-black text-xs sm:text-sm px-4 py-1.5 rounded-full shadow-xs inline-flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
                  <span>{reportData.synthesisTitle}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-800 leading-relaxed text-justify font-medium">
                {reportData.synthesisText}
              </p>
            </div>

            {/* Section 6: التوقيعات والمصادقات الرسمية (تنسيق منظم ومطابق للمواصفات) */}
            <div className="border border-slate-200/90 bg-white/95 rounded-2xl p-3.5 shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-black text-slate-900">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px]">
                  ✍️
                </span>
                <span>التوقيعات والمصادقات الرسمية:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs">
                {/* Teacher Box */}
                <div className="border border-slate-300 rounded-xl p-3 min-h-[125px] flex flex-col justify-between bg-slate-50/60">
                  <div>
                    <span className="font-bold text-slate-900 block text-[11px]">الأستاذ(ة):</span>
                    <span className="text-xs font-black text-blue-900 block mt-0.5">
                      {reportData.teacherName}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-200">
                    توقيع الأستاذ: ....................
                  </div>
                </div>

                {/* Director Box */}
                <div className="border border-slate-300 rounded-xl p-3 min-h-[125px] flex flex-col justify-between bg-slate-50/60">
                  <div>
                    <span className="font-bold text-slate-900 block text-[11px]">السيد(ة) المدير(ة):</span>
                    <span className="text-xs font-bold text-slate-700 block mt-0.5">
                      {reportData.directorName}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-200">
                    تأشيرة وخاتم الإدارة: ....................
                  </div>
                </div>

                {/* Inspector Box */}
                <div className="border border-slate-300 rounded-xl p-3 min-h-[125px] flex flex-col justify-between bg-slate-50/60">
                  <div>
                    <span className="font-bold text-slate-900 block text-[11px]">السيد(ة) المفتش(ة) التربوي(ة):</span>
                    <span className="text-xs font-bold text-slate-700 block mt-0.5">
                      {reportData.inspectorName}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-200">
                    ملاحظة وتوقيع المفتش: ....................
                  </div>
                </div>
              </div>

              {/* City and Date footer line */}
              <div className="text-left text-[11px] text-slate-600 pt-1 font-semibold">
                حرر بـ: <strong>{reportData.city}</strong> في: <strong>{reportData.signDate}</strong>
              </div>
            </div>
          </div>

          {/* Page 3 Footer */}
          <div className="relative z-10 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-medium">
            <span>الورشات التذكيرية لدعم التعلمات الأساس — مؤسسات الريادة</span>
            <span className="font-bold text-slate-800 font-mono tracking-widest">— 3 —</span>
            <span>المملكة المغربية • وزارة التربية الوطنية</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FULL CUSTOMIZATION EDITOR MODAL (no-print) */}
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
                1. البيانات العامة والبطاقة
              </button>
              <button
                type="button"
                onClick={() => setEditorTab("mathActivities")}
                className={`px-3 py-2 rounded-lg font-bold transition cursor-pointer shrink-0 ${
                  editorTab === "mathActivities"
                    ? "bg-blue-700 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                2. جدول أنشطة ووسائل الرياضيات
              </button>
              <button
                type="button"
                onClick={() => setEditorTab("mathLevels")}
                className={`px-3 py-2 rounded-lg font-bold transition cursor-pointer shrink-0 ${
                  editorTab === "mathLevels"
                    ? "bg-blue-700 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                3. مسارات الرياضيات واللبنات
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
                4. محور اللغة العربية
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
                5. محور Français
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
                6. التوصيات والتوقيعات
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
                      <label className="block text-slate-700 font-bold mb-1">العنوان الفرعي للورشات:</label>
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
                    <h4 className="font-bold text-slate-900 mb-2">البطاقة التنظيمية:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-600 font-medium mb-1">الفئة المستهدفة:</label>
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
                        <label className="block text-slate-600 font-medium mb-1">طبيعة التكوين:</label>
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
                      <div className="md:col-span-2">
                        <label className="block text-slate-600 font-medium mb-1">الهدف الاستراتيجي العام:</label>
                        <textarea
                          rows={2}
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

                  <div className="border-t border-slate-200 pt-3">
                    <label className="block text-slate-700 font-bold mb-1">
                      1. التقديم العام والهدف الاستراتيجي (نص الفقرة):
                    </label>
                    <textarea
                      rows={4}
                      value={tempData.generalIntro}
                      onChange={(e) => setTempData({ ...tempData, generalIntro: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: Math Activities Table (مطابق لجدول الصورة) */}
              {editorTab === "mathActivities" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900">
                        جدول أنشطة ووسائل الرياضيات المعتمدة (الصفحة 1):
                      </h4>
                      <p className="text-slate-500 text-[11px]">
                        يمكنك تعديل المجالات والوسائل الديداكتيكية أو إضافة وحذف صفوف بحرية.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddMathActivity}
                      className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>إضافة مجال نشاط</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(tempData.mathActivities || []).map((row, idx) => (
                      <div
                        key={row.id || idx}
                        className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col md:flex-row items-start md:items-center gap-3"
                      >
                        <div className="w-full md:w-1/3">
                          <label className="block text-slate-600 font-bold mb-0.5">مجال النشاط:</label>
                          <input
                            type="text"
                            value={row.domain}
                            onChange={(e) => {
                              const updated = [...(tempData.mathActivities || [])];
                              updated[idx] = { ...updated[idx], domain: e.target.value };
                              setTempData({ ...tempData, mathActivities: updated });
                            }}
                            className="w-full bg-white border border-slate-300 rounded-lg p-1.5 font-bold"
                          />
                        </div>

                        <div className="w-full md:w-2/3">
                          <label className="block text-slate-600 font-bold mb-0.5">
                            الأنشطة والوسائل المعتمدة:
                          </label>
                          <input
                            type="text"
                            value={row.activities}
                            onChange={(e) => {
                              const updated = [...(tempData.mathActivities || [])];
                              updated[idx] = { ...updated[idx], activities: e.target.value };
                              setTempData({ ...tempData, mathActivities: updated });
                            }}
                            className="w-full bg-white border border-slate-300 rounded-lg p-1.5"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeleteMathActivity(row.id)}
                          className="text-rose-600 hover:text-rose-800 p-2 rounded-lg cursor-pointer self-end md:self-center"
                          title="حذف هذا الصف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      تقديم محور الرياضيات وتفييف الوسائل:
                    </label>
                    <textarea
                      rows={3}
                      value={tempData.mathIntro}
                      onChange={(e) => setTempData({ ...tempData, mathIntro: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: Math Levels & Blocks */}
              {editorTab === "mathLevels" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900">
                        جدول مسارات وتدرج الرياضيات (الصفحة 2):
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddMathRow}
                      className="bg-blue-700 hover:bg-blue-600 text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>إضافة مستوى</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {tempData.mathLevels.map((row, idx) => (
                      <div
                        key={row.id || idx}
                        className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col md:flex-row items-start md:items-center gap-3"
                      >
                        <div className="w-full md:w-1/3">
                          <label className="block text-slate-600 font-bold mb-0.5">المستوى الدراسي:</label>
                          <input
                            type="text"
                            value={row.level}
                            onChange={(e) => {
                              const updated = [...tempData.mathLevels];
                              updated[idx] = { ...updated[idx], level: e.target.value };
                              setTempData({ ...tempData, mathLevels: updated });
                            }}
                            className="w-full bg-white border border-slate-300 rounded-lg p-1.5 font-bold"
                          />
                        </div>

                        <div className="w-full md:w-2/3">
                          <label className="block text-slate-600 font-bold mb-0.5">
                            هيكلة المسارات والتدرج البيداغوجي:
                          </label>
                          <input
                            type="text"
                            value={row.structure}
                            onChange={(e) => {
                              const updated = [...tempData.mathLevels];
                              updated[idx] = { ...updated[idx], structure: e.target.value };
                              setTempData({ ...tempData, mathLevels: updated });
                            }}
                            className="w-full bg-white border border-slate-300 rounded-lg p-1.5"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeleteMathRow(row.id)}
                          className="text-rose-600 hover:text-rose-800 p-2 rounded-lg cursor-pointer self-end md:self-center"
                          title="حذف هذا الصف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Math Blocks */}
                  <div className="border-t border-slate-200 pt-3">
                    <h4 className="font-bold text-slate-900 mb-2">
                      اللبنات الأساسية لبناء الكفايات الرياضية (5 لبنات):
                    </h4>
                    <div className="space-y-2">
                      {tempData.mathBlocks.map((block, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="font-bold text-slate-500 w-6">#{idx + 1}</span>
                          <input
                            type="text"
                            value={block}
                            onChange={(e) => {
                              const updated = [...tempData.mathBlocks];
                              updated[idx] = e.target.value;
                              setTempData({ ...tempData, mathBlocks: updated });
                            }}
                            className="flex-1 bg-white border border-slate-300 rounded-lg p-1.5"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: Arabic */}
              {editorTab === "arabic" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      مقدمة المحور الثاني (اللغة العربية):
                    </label>
                    <textarea
                      rows={3}
                      value={tempData.arabicIntro}
                      onChange={(e) => setTempData({ ...tempData, arabicIntro: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 leading-relaxed"
                    />
                  </div>

                  <div className="border-t border-slate-200 pt-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-slate-900">مسارات اللغة العربية (الصفحة 2):</h4>
                      <button
                        type="button"
                        onClick={handleAddArabicRow}
                        className="bg-blue-700 hover:bg-blue-600 text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>إضافة مسار</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {tempData.arabicPaths.map((row, idx) => (
                        <div
                          key={row.id || idx}
                          className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col md:flex-row items-start md:items-center gap-3"
                        >
                          <div className="w-full md:w-1/3">
                            <label className="block text-slate-600 font-bold mb-0.5">المسار:</label>
                            <input
                              type="text"
                              value={row.path}
                              onChange={(e) => {
                                const updated = [...tempData.arabicPaths];
                                updated[idx] = { ...updated[idx], path: e.target.value };
                                setTempData({ ...tempData, arabicPaths: updated });
                              }}
                              className="w-full bg-white border border-slate-300 rounded-lg p-1.5 font-bold"
                            />
                          </div>

                          <div className="w-full md:w-2/3">
                            <label className="block text-slate-600 font-bold mb-0.5">
                              نقطة الانطلاق والامتداد البيداغوجي:
                            </label>
                            <input
                              type="text"
                              value={row.startAndProgression}
                              onChange={(e) => {
                                const updated = [...tempData.arabicPaths];
                                updated[idx] = { ...updated[idx], startAndProgression: e.target.value };
                                setTempData({ ...tempData, arabicPaths: updated });
                              }}
                              className="w-full bg-white border border-slate-300 rounded-lg p-1.5"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => handleDeleteArabicRow(row.id)}
                            className="text-rose-600 hover:text-rose-800 p-2 rounded-lg cursor-pointer self-end md:self-center"
                            title="حذف هذا المسار"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-3">
                    <label className="block text-slate-700 font-bold mb-1">
                      مسطرة التصديق والمعالجة (شروط المصادقة على اللبنة):
                    </label>
                    <textarea
                      rows={2}
                      value={tempData.arabicValidationText}
                      onChange={(e) => setTempData({ ...tempData, arabicValidationText: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* TAB 5: French */}
              {editorTab === "french" && (
                <div className="space-y-4" dir="ltr">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Titre de l'Axe:</label>
                    <input
                      type="text"
                      value={tempData.frenchTitle}
                      onChange={(e) => setTempData({ ...tempData, frenchTitle: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 font-bold font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Introduction Français:</label>
                    <textarea
                      rows={3}
                      value={tempData.frenchIntro}
                      onChange={(e) => setTempData({ ...tempData, frenchIntro: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 font-sans leading-relaxed"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-slate-700 font-bold">Paliers et points clés (Paliers):</label>
                    {tempData.frenchBullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="font-bold text-slate-500 w-6">#{idx + 1}</span>
                        <input
                          type="text"
                          value={bullet}
                          onChange={(e) => {
                            const updated = [...tempData.frenchBullets];
                            updated[idx] = e.target.value;
                            setTempData({ ...tempData, frenchBullets: updated });
                          }}
                          className="flex-1 bg-white border border-slate-300 rounded-lg p-1.5 font-sans"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Validation des Paliers:</label>
                    <textarea
                      rows={2}
                      value={tempData.frenchValidationText}
                      onChange={(e) => setTempData({ ...tempData, frenchValidationText: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 font-sans leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* TAB 6: Synthesis & Signatures */}
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
                    <label className="block text-slate-700 font-bold mb-1">نص التوصيات والخلاصة التركيبية:</label>
                    <textarea
                      rows={4}
                      value={tempData.synthesisText}
                      onChange={(e) => setTempData({ ...tempData, synthesisText: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 leading-relaxed"
                    />
                  </div>

                  <div className="border-t border-slate-200 pt-3">
                    <h4 className="font-bold text-slate-900 mb-2">بيانات التوقيع والمصادقة:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-slate-600 font-medium mb-1">الأستاذ(ة):</label>
                        <input
                          type="text"
                          value={tempData.teacherName}
                          onChange={(e) => setTempData({ ...tempData, teacherName: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-lg p-2 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-medium mb-1">السيد(ة) المدير(ة):</label>
                        <input
                          type="text"
                          value={tempData.directorName}
                          onChange={(e) => setTempData({ ...tempData, directorName: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-lg p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-medium mb-1">السيد(ة) المفتش(ة):</label>
                        <input
                          type="text"
                          value={tempData.inspectorName}
                          onChange={(e) => setTempData({ ...tempData, inspectorName: e.target.value })}
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
                          className="w-full bg-white border border-slate-300 rounded-lg p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-medium mb-1">السنة الدراسية:</label>
                        <input
                          type="text"
                          value={tempData.academicYear}
                          onChange={(e) => setTempData({ ...tempData, academicYear: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-lg p-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons in Modal Footer */}
              <div className="border-t border-slate-200 pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer font-medium"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="bg-blue-700 hover:bg-blue-600 text-white font-bold px-5 py-2 rounded-lg cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ التعديلات في الوثيقة</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
