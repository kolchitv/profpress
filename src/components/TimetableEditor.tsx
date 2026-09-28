import React, { useState, useRef } from "react";
import {
  Printer,
  Plus,
  Trash2,
  RotateCcw,
  Sparkles,
  Calendar,
  Clock,
  Layers,
  Save,
  Download,
  FileText,
  FileSpreadsheet,
  CheckCircle2,
  BookOpen,
  Users,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Info,
  Filter,
  Search,
  FolderOpen,
  Eye,
} from "lucide-react";
import { TeacherProfile, TimetableSlot } from "../types";
import { DEFAULT_TIMETABLE_SLOTS } from "../data/defaultTemplates";
import {
  SUPPORT_TIMETABLE_MODELS,
  ALL_SUPPORT_TIMETABLE_MODELS,
  TAALIMKOM_WORD_TEMPLATES,
  TAALIMKOM_DRIVE_FOLDER,
  OFFICIAL_TIMETABLE_QUOTE,
  TIMETABLE_DOWNLOAD_RESOURCES,
  SupportTimetableModel,
} from "../data/supportTimetableTemplates";
import { generatePdfFromElement } from "../utils/pdfGenerator";
import {
  exportTimetableToWordDoc,
  exportTimetableToCsv,
} from "../utils/timetableExporter";

interface TimetableEditorProps {
  teacherProfile: TeacherProfile;
}

const DAYS_OF_WEEK = ["الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

const SUBJECT_COLORS: Record<string, string> = {
  "اللغة العربية": "bg-emerald-50 text-emerald-950 border-emerald-300",
  "الرياضيات": "bg-blue-50 text-blue-950 border-blue-300",
  "اللغة الفرنسية": "bg-sky-50 text-sky-950 border-sky-300",
  "التربية الإسلامية": "bg-teal-50 text-teal-950 border-teal-300",
  "النشاط العلمي": "bg-indigo-50 text-indigo-950 border-indigo-300",
  "الاجتماعيات": "bg-amber-50 text-amber-950 border-amber-300",
  "التربية الفنية": "bg-rose-50 text-rose-950 border-rose-300",
  "التربية البدنية": "bg-green-50 text-green-950 border-green-300",
  "دعم مدرسة الريادة": "bg-purple-50 text-purple-950 border-purple-300",
  "التقويم والمعالجة المركزة": "bg-amber-100 text-amber-950 border-amber-400",
  "أنشطة الحياة المدرسية": "bg-orange-50 text-orange-950 border-orange-300",
};

export const TimetableEditor: React.FC<TimetableEditorProps> = ({ teacherProfile }) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);

  // Mode: "support_period" (TaRL & Soutien Intensif) vs "standard_annual" (Regular Year)
  const [activeMode, setActiveMode] = useState<"support_period" | "standard_annual">("support_period");

  // Selected Support Model (default: Model 1)
  const [selectedModelId, setSelectedModelId] = useState<string>("model_1_continuous_2groups");

  // Model category filter: all | taalimkom | bilingue | specialized | continuous_4g | yanbou
  const [modelCategoryFilter, setModelCategoryFilter] = useState<string>("all");

  // Slots State
  const [slots, setSlots] = useState<TimetableSlot[]>(() => {
    return ALL_SUPPORT_TIMETABLE_MODELS[0].slots;
  });

  // Filter Group
  const [groupFilter, setGroupFilter] = useState<string>("all");

  // Options
  const [isPioneerMode, setIsPioneerMode] = useState<boolean>(true);
  const [selectedDay, setSelectedDay] = useState<string>("الإثنين");

  // New slot form state
  const [newSubject, setNewSubject] = useState("اللغة العربية");
  const [newActivity, setNewActivity] = useState("أنشطة طارل: فك التشفير والطلاقة القرائية");
  const [newStartTime, setNewStartTime] = useState("08:30");
  const [newEndTime, setNewEndTime] = useState("09:45");
  const [newGroup, setNewGroup] = useState("الكل");

  const currentModel = ALL_SUPPORT_TIMETABLE_MODELS.find((m) => m.id === selectedModelId) || ALL_SUPPORT_TIMETABLE_MODELS[0];

  // Google Drive 14 Word templates viewer states
  const [isDrivePackageOpen, setIsDrivePackageOpen] = useState<boolean>(true);
  const [driveFilterCategory, setDriveFilterCategory] = useState<string>("all");
  const [driveSearchQuery, setDriveSearchQuery] = useState<string>("");

  const handleApplyDriveTemplate = (templateModelId: string) => {
    const targetModel = ALL_SUPPORT_TIMETABLE_MODELS.find((m) => m.id === templateModelId);
    if (targetModel) {
      handleSelectModel(targetModel);
      const el = document.getElementById("timetable-view-zone");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Handle Switching to a Support Model
  const handleSelectModel = (model: SupportTimetableModel) => {
    setSelectedModelId(model.id);
    setActiveMode("support_period");
    setSlots(model.slots);
  };

  // Switch to Regular Annual Timetable
  const handleSwitchToAnnual = () => {
    setActiveMode("standard_annual");
    setSlots(DEFAULT_TIMETABLE_SLOTS);
  };

  // PDF Export
  const handleDownloadPdf = async () => {
    if (!sheetRef.current) return;
    setIsGeneratingPdf(true);
    try {
      const modeLabel = activeMode === "support_period" ? "فترة_الدعم_طارل" : "السنوي";
      await generatePdfFromElement(sheetRef.current, {
        filename: `استعمال_الزمن_${modeLabel}_${teacherProfile.assignedLevel}_${teacherProfile.fullNameAr || "أستاذ"}.pdf`,
        orientation: "landscape",
        quality: "ultra",
        colorMode: "color",
      });
    } catch (err) {
      console.error("Failed to generate PDF:", err);
      alert("حدث خطأ أثناء توليد ملف PDF. يرجى استخدام زر طباعة المتصفح.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Word (.doc) Export
  const handleDownloadWord = () => {
    const title =
      activeMode === "support_period"
        ? `استعمال الزمن لفترة الدعم المكثف (TaRL) - ${currentModel.shortTitle}`
        : `استعمال الزمن الأسبوعي - مدرسة الريادة`;
    const subTitle =
      activeMode === "support_period"
        ? `${currentModel.timingDescription} • ${currentModel.targetLevels}`
        : "الموسم الدراسي 2026/2027";
    exportTimetableToWordDoc(teacherProfile, title, slots, subTitle);
  };

  // CSV / Excel Export
  const handleDownloadCsv = () => {
    const title =
      activeMode === "support_period"
        ? `استعمال_الزمن_فترة_الدعم_${currentModel.shortTitle}`
        : `استعمال_الزمن_الأسبوعي`;
    exportTimetableToCsv(teacherProfile, title, slots);
  };

  // Add Slot
  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();
    const newSlot: TimetableSlot = {
      id: "slot_" + Date.now(),
      day: selectedDay,
      startTime: newStartTime,
      endTime: newEndTime,
      subject: newSubject,
      unitOrActivity: newActivity,
      group: newGroup,
    };
    setSlots((prev) => [...prev, newSlot]);
  };

  // Delete Slot
  const handleDeleteSlot = (id: string) => {
    setSlots((prev) => prev.filter((s) => s.id !== id));
  };

  // Reset to Current Model Default
  const handleResetDefault = () => {
    if (activeMode === "support_period") {
      if (window.confirm(`هل ترغب في استرجاع النموذج المعتمد لـ: "${currentModel.title}"؟`)) {
        setSlots(currentModel.slots);
      }
    } else {
      if (window.confirm("هل ترغب في استرجاع استعمال الزمن النموذجي السنوي لمدرسة الريادة؟")) {
        setSlots(DEFAULT_TIMETABLE_SLOTS);
      }
    }
  };

  // Filtered Slots
  const displayedSlots = slots.filter((slot) => {
    if (groupFilter === "all") return true;
    return slot.group === groupFilter || slot.group === "الكل";
  });

  return (
    <div className="space-y-6" dir="rtl">
      {/* Interactive Controls & Navigation (Hidden in Print) */}
      <div className="no-print bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-5">
        {/* Main Tab Switcher: Support Period (TaRL) vs Standard Annual */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6 text-blue-700 shrink-0" />
              <h2 className="text-xl font-black text-slate-900 font-cairo">
                استعمالات الزمن لفترة الدعم (TaRL والدعم المكثف) ومدرسة الريادة
              </h2>
            </div>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl">
              نماذج استعمال الزمن المعتمدة لتدبير فترة الدعم المكثف وطارل ومؤسسات الريادة، مع إمكانية التعديل الشامل، التصدير لـ Word و PDF و Excel، والطباعة الرسمية مقاس A4.
            </p>
          </div>

          {/* Quick Action Export Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleResetDefault}
              className="px-3 py-1.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
              title="استرجاع الحصص الأصلية للنموذج المختار"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>استرجاع الأصل</span>
            </button>

            <button
              onClick={handleDownloadWord}
              className="bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              title="تصدير كملف Microsoft Word قابل للتعديل"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-600" />
              <span>تصدير Word (.doc)</span>
            </button>

            <button
              onClick={handleDownloadCsv}
              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              title="تصدير كملف Excel / CSV"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>تصدير Excel</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="bg-blue-700 hover:bg-blue-600 disabled:bg-slate-400 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              title="توليد وتحميل ملف PDF عالي الدقة A4 Landscape"
            >
              <Download className="w-3.5 h-3.5 text-amber-300" />
              <span>{isGeneratingPdf ? "جاري التوليد..." : "تحميل PDF"}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              title="طباعة مباشرة مقاس A4 أفقي"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة A4</span>
            </button>
          </div>
        </div>

        {/* Master Mode Switcher: TaRL Support vs Regular Annual */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200">
          <button
            onClick={() => {
              setActiveMode("support_period");
              setSlots(currentModel.slots);
            }}
            className={`flex-1 min-w-[200px] py-2 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer ${
              activeMode === "support_period"
                ? "bg-blue-800 text-white shadow-xs"
                : "text-slate-700 hover:bg-white"
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
            <span>نماذج استعمال الزمن لفترة الدعم (TaRL والدعم المكثف)</span>
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded">
              21 نموذجاً (مع حزمة Drive)
            </span>
          </button>

          <button
            onClick={handleSwitchToAnnual}
            className={`flex-1 min-w-[200px] py-2 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer ${
              activeMode === "standard_annual"
                ? "bg-blue-800 text-white shadow-xs"
                : "text-slate-700 hover:bg-white"
            }`}
          >
            <Calendar className="w-4 h-4 shrink-0" />
            <span>استعمال الزمن السنوي العادي (التعليم الصريح ومدرسة الريادة)</span>
          </button>
        </div>

        {/* Google Drive Folder Hub (Taalimkom - 14 Word Templates) */}
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white rounded-2xl p-5 shadow-md border border-blue-800 space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-blue-800/60 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                  Google Drive • 14 ملف Word .docx
                </span>
                <span className="text-blue-200 text-xs font-bold flex items-center gap-1">
                  <FolderOpen className="w-3.5 h-3.5 text-amber-300" />
                  <span>حزمة مدونة تعليم كم المعتمدة للدعم المكثف طارل (TaRL)</span>
                </span>
              </div>
              <h3 className="text-base font-black text-white font-cairo">
                مستودع نماذج استعمال الزمن لفترة الدعم المكثف (14 نموذجاً قابلة للتعديل والتحميل المباشر)
              </h3>
              <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                تشمل الحزمة الرسمية المأخوذة من مجلد Google Drive جميع صيغ التنظيم التربوي: النمط المزدوج (1AEP إلى 6AEP)، تخصص ثنائي (عربية / فرنسية ورياضيات)، التوقيت المستمر الرباعي لـ 4 أفواج، والأفواج المشتركة.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 flex-wrap">
              <a
                href={TAALIMKOM_DRIVE_FOLDER.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                title="فتح المجلد الأصلي على Google Drive"
              >
                <span>فتح مجلد Drive كاملاً ↗</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => setIsDrivePackageOpen(!isDrivePackageOpen)}
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1 transition cursor-pointer border border-white/20"
              >
                <span>{isDrivePackageOpen ? "طي النماذج" : "استعراض النماذج الـ 14"}</span>
                {isDrivePackageOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Expandable 14 Files Catalog */}
          {isDrivePackageOpen && (
            <div className="space-y-4 pt-1">
              {/* Search & Category Filter */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-3.5 h-3.5 text-blue-300 absolute right-3 top-2.5" />
                  <input
                    type="text"
                    value={driveSearchQuery}
                    onChange={(e) => setDriveSearchQuery(e.target.value)}
                    placeholder="ابحث برقم المستوى، اسم الملف، أو النمط..."
                    className="w-full bg-slate-800/80 border border-blue-700/60 rounded-xl pr-9 pl-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                  />
                  {driveSearchQuery && (
                    <button
                      onClick={() => setDriveSearchQuery("")}
                      className="absolute left-2.5 top-2 text-xs text-slate-400 hover:text-white"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Filter Chips */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  {[
                    { id: "all", label: "جميع النماذج الـ 14" },
                    { id: "bilingue", label: "النمط المزدوج (4)" },
                    { id: "specialized", label: "تخصص ثنائي (2)" },
                    { id: "continuous_4g", label: "توقيت مستمر 4 أفواج (6)" },
                    { id: "shared", label: "أفواج مشتركة ومستمر عام (2)" },
                  ].map((chip) => {
                    const isActive = driveFilterCategory === chip.id;
                    return (
                      <button
                        key={chip.id}
                        onClick={() => setDriveFilterCategory(chip.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                          isActive
                            ? "bg-amber-400 text-slate-950 font-black shadow-xs"
                            : "bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10"
                        }`}
                      >
                        {chip.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 14 Templates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {TAALIMKOM_WORD_TEMPLATES.filter((tpl) => {
                  // Category match
                  if (driveFilterCategory !== "all") {
                    if (driveFilterCategory === "shared") {
                      if (tpl.category !== "shared" && tpl.category !== "continuous_general") return false;
                    } else if (tpl.category !== driveFilterCategory) {
                      return false;
                    }
                  }
                  // Search query match
                  if (driveSearchQuery.trim()) {
                    const q = driveSearchQuery.toLowerCase().trim();
                    const matchTitle = tpl.title.toLowerCase().includes(q);
                    const matchFile = tpl.filename.toLowerCase().includes(q);
                    const matchLevel = tpl.level.toLowerCase().includes(q);
                    const matchDesc = tpl.description.toLowerCase().includes(q);
                    return matchTitle || matchFile || matchLevel || matchDesc;
                  }
                  return true;
                }).map((tpl, idx) => {
                  const isCurrentlyActive = selectedModelId === tpl.modelId && activeMode === "support_period";

                  return (
                    <div
                      key={tpl.id}
                      className={`bg-slate-800/80 rounded-xl p-3.5 border transition-all flex flex-col justify-between ${
                        isCurrentlyActive
                          ? "border-amber-400 ring-2 ring-amber-400/30 bg-slate-800"
                          : "border-blue-800/60 hover:border-blue-500 hover:bg-slate-800"
                      }`}
                    >
                      <div className="space-y-2">
                        {/* Header Badges */}
                        <div className="flex items-center justify-between gap-1 flex-wrap">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="bg-blue-600/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                              {tpl.level}
                            </span>
                            <span className="bg-indigo-600/70 text-indigo-100 text-[10px] font-semibold px-2 py-0.5 rounded">
                              {tpl.categoryLabel}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-amber-300 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/30">
                            Word .docx
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="text-xs font-black text-white leading-snug">
                          {tpl.title}
                        </h4>

                        {/* Filename */}
                        <div className="text-[10px] font-mono text-slate-400 bg-slate-900/60 px-2 py-1 rounded border border-slate-700/60 truncate" title={tpl.filename}>
                          📄 {tpl.filename}
                        </div>

                        {/* Description & Timing */}
                        <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-2">
                          {tpl.description}
                        </p>
                        <div className="text-[10px] text-blue-200 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-300 shrink-0" />
                          <span>{tpl.timing}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex items-center justify-between gap-1.5 flex-wrap">
                        <div className="flex items-center gap-1">
                          <a
                            href={tpl.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition cursor-pointer shadow-xs"
                            title="تنزيل مباشر لملف Word الأصلي من Google Drive"
                          >
                            <Download className="w-3 h-3 text-amber-300" />
                            <span>تنزيل .docx</span>
                          </a>

                          <a
                            href={tpl.previewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold text-[10px] px-2 py-1.5 rounded-lg flex items-center gap-1 transition cursor-pointer"
                            title="معاينة المستند عبر Google Docs"
                          >
                            <Eye className="w-3 h-3" />
                            <span>معاينة Docs</span>
                          </a>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleApplyDriveTemplate(tpl.modelId)}
                          className={`font-black text-[10px] px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition cursor-pointer ${
                            isCurrentlyActive
                              ? "bg-amber-400 text-slate-950 font-black shadow-xs"
                              : "bg-blue-600 hover:bg-blue-500 text-white"
                          }`}
                          title="تطبيق حصص هذا النموذج فوراً في جدول الحصص أدناه"
                        >
                          {isCurrentlyActive ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-slate-950" />
                              <span>مفعل بالجدول</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-3 h-3 text-amber-300" />
                              <span>تطبيق في الجدول ◄</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Pedagogical & Legal Regulatory Quote Box (Yanbou Tarbiya & Ministry of Education) */}
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-sky-50 border border-blue-200 rounded-xl p-3.5 text-xs text-blue-950 relative">
          <div className="flex items-start gap-2.5">
            <Info className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-black text-blue-900">
                  المرجعية التنظيمية والبيداغوجية لاستعمال الزمن بفترة الدعم:
                </span>
                <span className="bg-blue-200/80 text-blue-900 text-[10px] font-bold px-2 py-0.5 rounded">
                  وزارة التربية الوطنية • يانبوع التربية
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-700 italic font-serif">
                "{OFFICIAL_TIMETABLE_QUOTE.quote}"
              </p>
              <div className="pt-1 flex items-center justify-between text-[10px] text-slate-500">
                <span>المصدر المعتمد: {OFFICIAL_TIMETABLE_QUOTE.source}</span>
                <a
                  href={OFFICIAL_TIMETABLE_QUOTE.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline flex items-center gap-1 font-bold"
                >
                  <span>زيارة صفحة النماذج الأصلية</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Support Models Carousel / Cards Grid (Active when in support_period mode) */}
        {activeMode === "support_period" && (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-blue-700" />
                <span>اختر نموذج استعمال الزمن المناسب لمؤسستك وفوجك (21 نموذجاً متاحاً):</span>
              </span>
              <span className="text-[11px] text-slate-500">
                النقر على أي نموذج يملأ الجدول تلقائياً بجميع حصصه اليومية
              </span>
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pb-1">
              {[
                { id: "all", label: "جميع النماذج (21)" },
                { id: "taalimkom", label: "📁 حزمة تعليم كم Word (14)" },
                { id: "bilingue", label: "📘 النمط المزدوج (5)" },
                { id: "specialized", label: "📗 أساتذة التخصص (4)" },
                { id: "continuous", label: "📙 مستمر 4 أفواج (7)" },
                { id: "yanbou", label: "🏛️ نماذج يانبوع التربية (7)" },
              ].map((chip) => {
                const isActive = modelCategoryFilter === chip.id;
                return (
                  <button
                    key={chip.id}
                    onClick={() => setModelCategoryFilter(chip.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                      isActive
                        ? "bg-blue-800 text-white shadow-xs"
                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>

            {/* Filtered Models Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
              {ALL_SUPPORT_TIMETABLE_MODELS.filter((m) => {
                if (modelCategoryFilter === "all") return true;
                if (modelCategoryFilter === "taalimkom") return m.id.startsWith("model_tk_");
                if (modelCategoryFilter === "bilingue") return m.category === "level1" || m.id.includes("bilingue") || m.id.includes("shared");
                if (modelCategoryFilter === "specialized") return m.category === "specialized" || m.id.includes("specialist") || m.id.includes("specialized");
                if (modelCategoryFilter === "continuous") return m.category === "continuous" || m.id.includes("continuous");
                if (modelCategoryFilter === "yanbou") return !m.id.startsWith("model_tk_");
                return true;
              }).map((model, idx) => {
                const isSelected = selectedModelId === model.id;
                const isTaalimkomModel = model.id.startsWith("model_tk_");
                const matchedTemplate = isTaalimkomModel ? TAALIMKOM_WORD_TEMPLATES.find((t) => t.modelId === model.id) : null;

                return (
                  <div
                    key={model.id}
                    className={`text-right p-3 rounded-xl border transition-all flex flex-col justify-between ${
                      isSelected
                        ? "bg-blue-50/90 border-blue-600 ring-2 ring-blue-500/20 shadow-xs"
                        : "bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50/60"
                    }`}
                  >
                    <div
                      onClick={() => handleSelectModel(model)}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded border ${model.badgeColor}`}>
                          {model.badge}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">
                          #{idx + 1}
                        </span>
                      </div>
                      <h4 className="text-xs font-black text-slate-900 leading-snug">
                        {model.shortTitle}
                      </h4>
                      <p className="text-[10px] text-slate-600 line-clamp-2 mt-1">
                        {model.summary}
                      </p>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] gap-1">
                      <button
                        type="button"
                        onClick={() => handleSelectModel(model)}
                        className="cursor-pointer"
                      >
                        {isSelected ? (
                          <span className="flex items-center gap-1 text-blue-700 font-black">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                            <span>معتمد حالياً</span>
                          </span>
                        ) : (
                          <span className="text-blue-700 font-bold hover:underline">
                            تطبيق في الجدول ◄
                          </span>
                        )}
                      </button>

                      {matchedTemplate && (
                        <a
                          href={matchedTemplate.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="تحميل ملف Word الأصلي من Google Drive"
                          className="text-[10px] bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold px-2 py-0.5 rounded flex items-center gap-1 cursor-pointer transition shrink-0"
                        >
                          <Download className="w-3 h-3 text-emerald-700" />
                          <span>.docx</span>
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Detailed Selected Model Information Banner */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="text-slate-500 font-bold block text-[11px]">صيغة التوقيت:</span>
                <strong className="text-slate-900 block text-xs">{currentModel.timingDescription}</strong>
              </div>
              <div className="space-y-0.5">
                <span className="text-slate-500 font-bold block text-[11px]">تنظيم الأفواج:</span>
                <strong className="text-slate-900 block text-xs">{currentModel.groupsDescription}</strong>
              </div>
              <div className="space-y-0.5">
                <span className="text-slate-500 font-bold block text-[11px]">المستويات المستهدفة:</span>
                <strong className="text-slate-900 block text-xs">{currentModel.targetLevels}</strong>
              </div>
              <div className="space-y-0.5">
                <span className="text-slate-500 font-bold block text-[11px]">توجيه بيداغوجي:</span>
                <span className="text-slate-700 block text-[11px] leading-tight">{currentModel.pedagogicalRationale}</span>
              </div>
            </div>
          </div>
        )}

        {/* Filter by Group & Add Slot Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500 shrink-0" />
            <span className="text-xs font-bold text-slate-700">تصفية العرض حسب الفوج:</span>
            <div className="flex items-center gap-1 text-xs">
              {[
                { key: "all", label: "كافة الحصص" },
                { key: "الفوج 1", label: "الفوج 1" },
                { key: "الفوج 2", label: "الفوج 2" },
                { key: "فوج الدعم", label: "فوج الدعم المكثف" },
                { key: "الكل", label: "كامل القسم" },
              ].map((grp) => (
                <button
                  key={grp.key}
                  onClick={() => setGroupFilter(grp.key)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer text-xs ${
                    groupFilter === grp.key
                      ? "bg-blue-700 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {grp.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="font-bold">إجمالي الحصص المبرمجة:</span>
            <span className="bg-blue-100 text-blue-900 font-black px-2 py-0.5 rounded">
              {displayedSlots.length} حصة
            </span>
          </div>
        </div>

        {/* Quick Add Custom Slot Form */}
        <form
          onSubmit={handleAddSlot}
          className="bg-blue-50/60 border border-blue-200 rounded-xl p-3.5 grid grid-cols-2 md:grid-cols-6 gap-2 text-xs"
        >
          <div>
            <label className="block text-slate-600 font-semibold mb-1">اليوم:</label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg p-1.5 text-xs font-semibold"
            >
              {DAYS_OF_WEEK.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">المادة:</label>
            <select
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg p-1.5 text-xs font-semibold"
            >
              <option value="اللغة العربية">اللغة العربية</option>
              <option value="الرياضيات">الرياضيات</option>
              <option value="اللغة الفرنسية">اللغة الفرنسية</option>
              <option value="دعم مدرسة الريادة">دعم مدرسة الريادة (TaRL)</option>
              <option value="التقويم والمعالجة المركزة">التقويم والمعالجة المركزة</option>
              <option value="التربية الإسلامية">التربية الإسلامية</option>
              <option value="النشاط العلمي">النشاط العلمي</option>
              <option value="الاجتماعيات">الاجتماعيات</option>
              <option value="التربية الفنية">التربية الفنية</option>
              <option value="التربية البدنية">التربية البدنية</option>
              <option value="أنشطة الحياة المدرسية">أنشطة الحياة المدرسية</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">المكون / النشاط الديداكتيكي:</label>
            <input
              type="text"
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
              placeholder="مثال: فك التشفير / الحساب الذهني"
              className="w-full bg-white border border-slate-300 rounded-lg p-1.5 text-xs font-medium"
              required
            />
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">التوقيت (من - إلى):</label>
            <div className="flex items-center gap-1" dir="ltr">
              <input
                type="text"
                value={newStartTime}
                onChange={(e) => setNewStartTime(e.target.value)}
                className="w-1/2 bg-white border border-slate-300 rounded-lg p-1.5 text-xs text-center font-mono font-bold"
                placeholder="08:30"
              />
              <span>-</span>
              <input
                type="text"
                value={newEndTime}
                onChange={(e) => setNewEndTime(e.target.value)}
                className="w-1/2 bg-white border border-slate-300 rounded-lg p-1.5 text-xs text-center font-mono font-bold"
                placeholder="09:45"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">الفوج المستهدف:</label>
            <select
              value={newGroup}
              onChange={(e) => setNewGroup(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg p-1.5 text-xs font-semibold"
            >
              <option value="الكل">كامل القسم (الكل)</option>
              <option value="الفوج 1">الفوج 1</option>
              <option value="الفوج 2">الفوج 2</option>
              <option value="الفوج 3">الفوج 3</option>
              <option value="الفوج 4">الفوج 4</option>
              <option value="فوج الدعم">فوج الدعم المكثف</option>
              <option value="فوج التعثرات">فوج التعثرات الصغرى</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold p-1.5 rounded-lg text-xs flex items-center justify-center gap-1 cursor-pointer transition shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة حصة</span>
            </button>
          </div>
        </form>
      </div>

      {/* Official A4 Landscape Timetable Sheet (Styled for Screen and Direct Print) */}
      <div
        ref={sheetRef}
        id="timetable-view-zone"
        className="print-sheet print-sheet-landscape bg-white border border-slate-300 rounded-2xl p-6 md:p-8 shadow-xs max-w-6xl mx-auto"
      >
        {/* Moroccan Official Print Header */}
        <div className="border-b-2 border-slate-900 pb-3 mb-4">
          <div className="flex justify-center mb-1.5">
            <img
              src="/morocco-ministry-logo.png"
              alt="وزارة التربية الوطنية والتعليم الأولي والرياضة"
              className="h-12 md:h-14 w-auto max-w-full object-contain"
            />
          </div>
          <div className="flex items-center justify-between font-bold text-slate-800 text-[11px] px-1 mb-2">
            <div className="text-right space-y-0.5">
              <p>
                <span className="text-slate-600 font-medium">الأكاديمية الجهوية للتربية والتكوين:</span>{" "}
                {teacherProfile.academy || "...................................."}
              </p>
              <p>
                <span className="text-slate-600 font-medium">المديرية الإقليمية:</span>{" "}
                {teacherProfile.directorate || "...................................."}
              </p>
            </div>
            <div className="text-left space-y-0.5">
              <p>
                <span className="text-slate-600 font-medium">المؤسسة التعليمية:</span>{" "}
                {teacherProfile.institution || "...................................."}
              </p>
              <p>
                <span className="text-slate-600 font-medium">الأستاذ(ة):</span>{" "}
                {teacherProfile.fullNameAr || "...................................."}
              </p>
            </div>
          </div>

          <div className="text-center pt-1 border-t border-slate-200">
            <h3 className="text-base md:text-lg font-black font-cairo text-slate-900 leading-tight">
              {activeMode === "support_period"
                ? `استعمال الزمن لفترة الدعم المكثف طارل (TaRL) - ${currentModel.shortTitle}`
                : "استعمال الزمن الأسبوعي الرسمي"}
            </h3>
            <p className="text-[11px] font-bold text-blue-800 mt-0.5">
              {activeMode === "support_period"
                ? "صيغة مؤسسات الريادة: فترة التقويم التشخيصي والدعم المكثف (شتنبر / أكتوبر)"
                : "صيغة مدرسة الريادة (التعليم الصريح والدعم المندمج)"}
            </p>
            <p className="text-[10px] text-slate-500">الموسم الدراسي: {teacherProfile.schoolYear}</p>
          </div>

          {/* Teacher Quick Info Pill Box */}
          <div className="grid grid-cols-4 gap-2 bg-slate-100/90 text-xs p-2 rounded-lg border border-slate-200 mt-2 text-right">
            <div>
              <span className="text-slate-500">الأستاذ(ة):</span>{" "}
              <strong className="text-slate-900">{teacherProfile.fullNameAr}</strong>
            </div>
            <div>
              <span className="text-slate-500">رقم التأجير (SOM):</span>{" "}
              <strong className="text-slate-900">{teacherProfile.somNumber}</strong>
            </div>
            <div>
              <span className="text-slate-500">المستوى والقسم:</span>{" "}
              <strong className="text-slate-900">{teacherProfile.assignedLevel}</strong>
            </div>
            <div>
              <span className="text-slate-500">عدد التلاميذ:</span>{" "}
              <strong className="text-slate-900">
                {teacherProfile.totalStudents} ({teacherProfile.femaleStudents} إناث)
              </strong>
            </div>
          </div>
        </div>

        {/* Timetable Grid Columns By Day */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-2 border border-slate-300 rounded-lg p-2 bg-slate-50/50">
          {DAYS_OF_WEEK.map((day) => {
            const daySlots = displayedSlots
              .filter((s) => s.day === day)
              .sort((a, b) => a.startTime.localeCompare(b.startTime));

            return (
              <div
                key={day}
                className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-2xs flex flex-col"
              >
                <div className="bg-blue-900 text-white text-center py-1.5 px-1 font-bold text-xs">
                  {day}
                </div>

                <div className="p-1.5 space-y-1.5 flex-1 min-h-[220px]">
                  {daySlots.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-[10px] text-slate-400 italic text-center py-6">
                      لا توجد حصص
                    </div>
                  ) : (
                    daySlots.map((slot) => {
                      const colorClass =
                        SUBJECT_COLORS[slot.subject] ||
                        "bg-slate-50 text-slate-800 border-slate-300";

                      return (
                        <div
                          key={slot.id}
                          className={`border rounded-md p-1.5 relative group text-right transition-all ${colorClass}`}
                        >
                          <div
                            className="flex items-center justify-between text-[10px] font-mono font-bold opacity-80"
                            dir="ltr"
                          >
                            <span>
                              {slot.startTime} - {slot.endTime}
                            </span>
                            <span className="font-sans text-[9px] bg-white/70 px-1 rounded">
                              {slot.group}
                            </span>
                          </div>
                          <div className="font-bold text-[11px] mt-0.5 leading-snug">
                            {slot.subject}
                          </div>
                          <div className="text-[10px] opacity-90 leading-tight">
                            {slot.unitOrActivity}
                          </div>

                          {/* Delete Action button (no-print) */}
                          <button
                            onClick={() => handleDeleteSlot(slot.id)}
                            className="no-print absolute top-1 left-1 opacity-0 group-hover:opacity-100 text-rose-600 hover:text-rose-800 p-0.5 rounded transition cursor-pointer"
                            title="حذف الحصة"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Regulatory & Pedagogical Guidance Box */}
        <div className="mt-3 p-2.5 bg-blue-50/70 border border-blue-200 rounded-lg text-[11px] text-blue-950 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>توجيهات تدبير الزمن المدرسي بفترة الدعم (TaRL):</strong> يعتبر استعمال الزمن الوثيقة التنظيمية الأساسية لتوزيع الحصص وضمان التوازن بين المكونات الثلاثة (العربية، الرياضيات، الفرنسية) وحصص الدعم المكثف الموجه للمجموعات الصغرى.
            </span>
          </div>
          <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
            مجموع الحصص الأسبوعية: {displayedSlots.length} حصة
          </span>
        </div>

        {/* Administrative Endorsements Zone */}
        <div className="grid grid-cols-3 gap-4 text-center text-xs mt-6 pt-4 border-t-2 border-slate-800">
          <div className="border border-dashed border-slate-400 rounded-lg p-2.5 min-h-[85px] flex flex-col justify-between">
            <span className="font-bold text-slate-800">الأستاذ(ة)</span>
            <span className="text-[10px] text-slate-400">حرر في: ....................</span>
          </div>
          <div className="border border-dashed border-slate-400 rounded-lg p-2.5 min-h-[85px] flex flex-col justify-between">
            <span className="font-bold text-slate-800">مدير(ة) المؤسسة</span>
            <span className="text-[10px] text-slate-400">مصادق عليه بتاريخ: ....................</span>
          </div>
          <div className="border border-dashed border-slate-400 rounded-lg p-2.5 min-h-[85px] flex flex-col justify-between">
            <span className="font-bold text-slate-800">المفتش(ة) التربوي(ة)</span>
            <span className="text-[10px] text-slate-400">مفتش(ة) المقاطعة التربوية</span>
          </div>
        </div>
      </div>

      {/* Download Hub for Official Files (Word & PDF) referenced by Yanbou Tarbiya and Escuila */}
      <div className="no-print bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-black text-slate-900">
              حقيبة تحميل نماذج استعمال الزمن المعتمدة (Word & PDF & Excel)
            </h3>
          </div>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            جاهزة للتنزيل المباشر
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {TIMETABLE_DOWNLOAD_RESOURCES.map((res, i) => (
            <div
              key={i}
              className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-col justify-between hover:border-blue-300 transition"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                    {res.format}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/60 px-1.5 py-0.5 rounded">
                    {res.badge}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">
                  {res.title}
                </h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  {res.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => {
                    if (res.externalUrl) {
                      window.open(res.externalUrl, "_blank");
                      return;
                    }
                    if (res.format.includes("Word")) {
                      handleDownloadWord();
                    } else if (res.format.includes("Excel")) {
                      handleDownloadCsv();
                    } else {
                      handleDownloadPdf();
                    }
                  }}
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-1.5 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition"
                >
                  <Download className="w-3.5 h-3.5 text-amber-300" />
                  <span>{res.externalUrl ? "فتح مجلد Google Drive (14 ملف)" : `تنزيل ${res.format} الآن`}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
