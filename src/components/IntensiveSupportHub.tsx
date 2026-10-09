import React, { useState, useMemo } from "react";
import {
  Layers,
  BookOpen,
  Calculator,
  Globe,
  Download,
  FileText,
  Printer,
  Search,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  Info,
  Filter,
  X,
  FileSpreadsheet,
  GraduationCap,
  Copy,
  Check,
  FolderOpen,
  ArrowUpRight,
  ChevronLeft,
  LayoutGrid,
  FileBox,
  Compass,
} from "lucide-react";
import {
  IntensiveLevelId,
  IntensiveSubjectId,
  IntensiveSessionItem,
  TeacherProfile,
  TabKey,
} from "../types";
import {
  INTENSIVE_SUPPORT_LEVELS,
  ESCUILA_SOURCE_URL,
  ESCUILA_MINDMAPS_URL,
  ESCUILA_SUPPORT_PAGE_CONTENT,
} from "../data/intensiveSupportData";

interface IntensiveSupportHubProps {
  teacherProfile?: TeacherProfile;
  onNavigateToTab?: (tab: TabKey) => void;
  onOpenPrintPreview?: () => void;
}

export const IntensiveSupportHub: React.FC<IntensiveSupportHubProps> = ({
  teacherProfile,
  onNavigateToTab,
  onOpenPrintPreview,
}) => {
  const [activeViewMode, setActiveViewMode] = useState<"escuila_hub" | "sessions_matrix">("escuila_hub");
  const [selectedLevel, setSelectedLevel] = useState<IntensiveLevelId>(1);
  const [selectedSubject, setSelectedSubject] = useState<IntensiveSubjectId>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSessionModal, setSelectedSessionModal] =
    useState<IntensiveSessionItem | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const currentLevelData = INTENSIVE_SUPPORT_LEVELS[selectedLevel];

  // Consolidate sessions based on subject filter and search
  const filteredSessions = useMemo(() => {
    let list: IntensiveSessionItem[] = [];

    if (selectedSubject === "all") {
      list = [
        ...currentLevelData.subjects.arabic.sessions,
        ...currentLevelData.subjects.math.sessions,
        ...currentLevelData.subjects.french.sessions,
      ];
      list.sort((a, b) => a.sessionNumber - b.sessionNumber);
    } else {
      list = [...currentLevelData.subjects[selectedSubject].sessions];
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.buildingBlock.toLowerCase().includes(q) ||
          s.track.toLowerCase().includes(q) ||
          `حصة ${s.sessionNumber}`.includes(q) ||
          `اليوم ${s.dayNumber}`.includes(q)
      );
    }

    return list;
  }, [currentLevelData, selectedSubject, searchQuery]);

  const handleCopyLink = (url: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => {
      setCopiedUrl(null);
    }, 2500);
  };

  const handlePrintMatrix = () => {
    window.print();
  };

  const handleOpenSourceUrl = () => {
    window.open(ESCUILA_SOURCE_URL, "_blank");
  };

  const handleOpenMindmapsSource = () => {
    window.open(ESCUILA_MINDMAPS_URL, "_blank");
  };

  const handleSwitchToDetailedSessions = (lvl: number, subId?: "arabic" | "french" | "math") => {
    setSelectedLevel(lvl as IntensiveLevelId);
    if (subId) setSelectedSubject(subId);
    setActiveViewMode("sessions_matrix");
    window.scrollTo({ top: 350, behavior: "smooth" });
  };

  return (
    <div className="space-y-6 pb-16 font-sans" dir="rtl">
      {/* 1. Top Banner / Hero Card */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-lg border border-blue-800/40 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-x-20 -translate-y-20 pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 font-black px-3.5 py-1 rounded-full text-xs shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>حصص الدعم المكثف الرسمي • 24 يوماً • من المستوى 1 إلى 6</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleOpenSourceUrl}
                className="inline-flex items-center gap-1.5 text-xs text-blue-200 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg border border-white/20 transition cursor-pointer"
                title="فتح المصدر الأصلي على منصة إسكويلا"
              >
                <span>المصدر المعتمد: escuila.info</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="space-y-2 max-w-4xl">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <Layers className="w-8 h-8 text-amber-300 shrink-0" />
              <span>{ESCUILA_SUPPORT_PAGE_CONTENT.pageFullTitle}</span>
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              العدة البيداغوجية والملفات الكاملة لحصص الدعم المكثف في مواد <strong>اللغة العربية</strong>، <strong>اللغة الفرنسية</strong>، و<strong>الرياضيات</strong> من المستوى الأول إلى المستوى السادس ابتدائي لمؤسسات الريادة ومقاربة طارل.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15">
              <div className="text-xs text-blue-200 font-medium">المستويات المتاحة</div>
              <div className="text-xl font-black text-amber-300 mt-0.5">6 مستويات (1 - 6)</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15">
              <div className="text-xs text-blue-200 font-medium">فترة الدعم المكثف</div>
              <div className="text-xl font-black text-white mt-0.5">24 يوماً (4 أسابيع)</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15">
              <div className="text-xs text-blue-200 font-medium">إجمالي الحصص المبرمجة</div>
              <div className="text-xl font-black text-emerald-300 mt-0.5">432 حصة كاملة</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15">
              <div className="text-xs text-blue-200 font-medium">صيغ الملفات السحابية</div>
              <div className="text-xl font-black text-rose-300 mt-0.5">Google Drive • PPTX • Word</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Official Escuila Intro & Mind Maps Banner */}
      <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
              <h2 className="text-base font-black text-blue-950">
                {ESCUILA_SUPPORT_PAGE_CONTENT.headerTitle}
              </h2>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {ESCUILA_SUPPORT_PAGE_CONTENT.introText}
            </p>
          </div>
        </div>

        {/* Mind Maps Special Callout */}
        <div className="bg-white border border-amber-300/80 rounded-xl p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-black text-lg">
              👈
            </div>
            <div>
              <div className="text-sm font-black text-slate-900 flex items-center gap-2">
                <span>لتحميل الخطاطات الذهنية للدعم المكثف:</span>
                <span className="text-[11px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md font-bold">
                  Word & تفاعلية
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                تتوفر خطاطات ذهنية متخصصة لجميع المواد والمستويات لتسهيل التخطيط وإعداد الحصص.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {onNavigateToTab && (
              <button
                type="button"
                onClick={() => onNavigateToTab("mindmaps")}
                className="bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <Compass className="w-4 h-4 text-amber-300" />
                <span>الخطاطات الذهنية التفاعلية ببروف بريس</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleOpenMindmapsSource}
              className="bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold px-3 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5"
            >
              <span>خطاطات سكويلة (Word)</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-800" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. View Switcher Tabs (Escuila Hub vs Detailed Matrix) */}
      <div className="bg-white rounded-2xl p-2.5 border border-slate-200 shadow-xs flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveViewMode("escuila_hub")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer ${
              activeViewMode === "escuila_hub"
                ? "bg-blue-700 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <FolderOpen className="w-4 h-4 text-amber-300" />
            <span>بوابة مجلدات Google Drive الرسمية (موقع سكويلة)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveViewMode("sessions_matrix")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer ${
              activeViewMode === "sessions_matrix"
                ? "bg-blue-700 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <LayoutGrid className="w-4 h-4 text-amber-300" />
            <span>المستكشف التفاعلي للحصص (الـ 24 حصة • السيناريوهات والطباعة)</span>
          </button>
        </div>

        <div className="text-xs text-slate-500 font-bold px-2 hidden md:block">
          {activeViewMode === "escuila_hub"
            ? "18 مجلداً سحابياً مباشراً لجميع المواد والمستويات"
            : `تصفح تفاصيل الحصص لـ ${currentLevelData.titleAr}`}
        </div>
      </div>

      {/* Copy notification popup if copied */}
      {copiedUrl && (
        <div className="fixed bottom-6 left-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>تم نسخ رابط مجلد Google Drive بنجاح إلى الحافظة!</span>
        </div>
      )}

      {/* 4. MAIN VIEW: ESCUILA OFFICIAL DRIVE HUB */}
      {activeViewMode === "escuila_hub" && (
        <div className="space-y-8">
          {ESCUILA_SUPPORT_PAGE_CONTENT.subjects.map((sub) => {
            const isArabic = sub.id === "arabic";
            const isFrench = sub.id === "french";
            const isMath = sub.id === "math";

            const SubIcon = isArabic ? BookOpen : isMath ? Calculator : Globe;
            const headerColor = isArabic
              ? "bg-emerald-700 border-emerald-800"
              : isFrench
              ? "bg-blue-700 border-blue-800"
              : "bg-amber-600 border-amber-700";

            return (
              <div
                key={sub.id}
                className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden transition"
              >
                {/* Subject Header */}
                <div
                  className={`flex items-center justify-between px-5 py-4 text-white ${headerColor}`}
                >
                  <div className="flex items-center gap-2.5">
                    <SubIcon className="w-5 h-5 text-amber-300" />
                    <div>
                      <h3 className="text-base sm:text-lg font-black">{sub.titleAr}</h3>
                      <span className="text-[11px] text-white/80 font-medium">
                        {sub.titleFr} • 6 مستويات • 24 حصة لكل مستوى
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full backdrop-blur-xs">
                    روابط Google Drive
                  </span>
                </div>

                {/* 6 Levels Grid */}
                <div className="p-4 sm:p-5 bg-slate-50/50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {sub.levels.map((lvl) => {
                      const isLevelSelected = selectedLevel === lvl.levelNumber;
                      const isCopied = copiedUrl === lvl.driveFolderUrl;

                      return (
                        <div
                          key={lvl.levelNumber}
                          className="bg-white border border-slate-200 hover:border-blue-400 rounded-xl p-3.5 shadow-2xs hover:shadow-xs transition flex flex-col justify-between gap-3 group"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                              <span
                                className={`w-8 h-8 rounded-lg font-black text-sm flex items-center justify-center shrink-0 ${
                                  isArabic
                                    ? "bg-emerald-100 text-emerald-900"
                                    : isFrench
                                    ? "bg-blue-100 text-blue-900"
                                    : "bg-amber-100 text-amber-900"
                                }`}
                              >
                                {lvl.levelNumber}
                              </span>
                              <div>
                                <h4 className="text-sm font-black text-slate-900 group-hover:text-blue-700 transition">
                                  {lvl.levelNameAr}
                                </h4>
                                <span className="text-[11px] text-slate-500 font-medium">
                                  {lvl.levelNameFr} • 24 حصة مبرمجة
                                </span>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => handleCopyLink(lvl.driveFolderUrl, e)}
                              className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                              title="نسخ رابط المجلد"
                            >
                              {isCopied ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>

                          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                            {/* Primary Button: Open Google Drive Folder */}
                            <a
                              href={lvl.driveFolderUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition text-white shadow-2xs ${
                                isArabic
                                  ? "bg-emerald-700 hover:bg-emerald-800"
                                  : isFrench
                                  ? "bg-blue-700 hover:bg-blue-800"
                                  : "bg-amber-600 hover:bg-amber-700"
                              }`}
                            >
                              <span>عرض الملفات</span>
                              <ExternalLink className="w-3 h-3 text-amber-200" />
                            </a>

                            {/* Secondary Button: Browse 24 Sessions locally in Profpress */}
                            <button
                              type="button"
                              onClick={() => handleSwitchToDetailedSessions(lvl.levelNumber, sub.id)}
                              className="py-2 px-2.5 rounded-lg text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition cursor-pointer flex items-center gap-1 border border-slate-200"
                              title="تصفح سيناريوهات الحصص الـ 24 داخل المنصة"
                            >
                              <FileText className="w-3 h-3 text-slate-500" />
                              <span className="hidden sm:inline">تصفح الحصص</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. SECONDARY VIEW: DETAILED SESSIONS MATRIX */}
      {activeViewMode === "sessions_matrix" && (
        <div className="space-y-6">
          {/* Level Selector Bar (1 to 6) */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-700" />
                <h2 className="text-base font-bold text-slate-900">
                  اختر المستوى الدراسي لاستعراض الحصص والسيناريوهات:
                </h2>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                المستوى المحدد: <strong className="text-blue-700">{currentLevelData.titleAr}</strong>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {([1, 2, 3, 4, 5, 6] as IntensiveLevelId[]).map((lvl) => {
                const data = INTENSIVE_SUPPORT_LEVELS[lvl];
                const isSelected = selectedLevel === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSelectedLevel(lvl)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition cursor-pointer relative ${
                      isSelected
                        ? "bg-blue-700 text-white border-blue-700 shadow-md ring-2 ring-blue-300 font-bold"
                        : "bg-slate-50 hover:bg-blue-50/50 text-slate-700 border-slate-200"
                    }`}
                  >
                    <span className="text-xs font-semibold">{data.titleFr}</span>
                    <span className="text-sm font-black mt-0.5">{data.titleAr}</span>
                    <span
                      className={`text-[10px] mt-1.5 px-2 py-0.5 rounded-full font-bold ${
                        isSelected
                          ? "bg-amber-400 text-slate-950"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      24 يوماً
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Level Summary & Subject Bundles */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                    {currentLevelData.badge}
                  </span>
                  <h3 className="text-lg font-black text-slate-900">
                    حقيبة {currentLevelData.titleAr} ({currentLevelData.titleFr})
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
                  {currentLevelData.overview}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={handlePrintMatrix}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer border border-slate-300"
                  title="طباعة مصفوفة الحصص الورقية"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>طباعة المصفوفة</span>
                </button>
                {onOpenPrintPreview && (
                  <button
                    type="button"
                    onClick={onOpenPrintPreview}
                    className="bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer border border-blue-200"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
                    <span>معاينة وتصدير PDF</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleOpenSourceUrl}
                  className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5 text-amber-300" />
                  <span>صفحة إسكويلا الأصلية</span>
                </button>
              </div>
            </div>

            {/* 3 Subject Bundles Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Arabic */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 flex flex-col justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-emerald-900 text-sm flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-emerald-700" />
                      <span>اللغة العربية (24 حصة)</span>
                    </span>
                    <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full font-bold">
                      PPTX + Word
                    </span>
                  </div>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    {currentLevelData.subjects.arabic.description}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 pt-2 border-t border-emerald-200/60">
                  <a
                    href={
                      ESCUILA_SUPPORT_PAGE_CONTENT.subjects
                        .find((s) => s.id === "arabic")
                        ?.levels.find((l) => l.levelNumber === selectedLevel)?.driveFolderUrl
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-1.5 px-2 rounded-lg text-[11px] flex items-center justify-center gap-1 transition"
                  >
                    <FolderOpen className="w-3 h-3 text-amber-300" />
                    <span>مجلد Google Drive</span>
                  </a>
                </div>
              </div>

              {/* Math */}
              <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 flex flex-col justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-blue-900 text-sm flex items-center gap-1.5">
                      <Calculator className="w-4 h-4 text-blue-700" />
                      <span>الرياضيات (24 حصة)</span>
                    </span>
                    <span className="text-[10px] bg-blue-200 text-blue-900 px-2 py-0.5 rounded-full font-bold">
                      PPTX + Word
                    </span>
                  </div>
                  <p className="text-xs text-blue-800 leading-relaxed">
                    {currentLevelData.subjects.math.description}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 pt-2 border-t border-blue-200/60">
                  <a
                    href={
                      ESCUILA_SUPPORT_PAGE_CONTENT.subjects
                        .find((s) => s.id === "math")
                        ?.levels.find((l) => l.levelNumber === selectedLevel)?.driveFolderUrl
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-bold py-1.5 px-2 rounded-lg text-[11px] flex items-center justify-center gap-1 transition"
                  >
                    <FolderOpen className="w-3 h-3 text-amber-300" />
                    <span>مجلد Google Drive</span>
                  </a>
                </div>
              </div>

              {/* French */}
              <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-4 flex flex-col justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-indigo-900 text-sm flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-indigo-700" />
                      <span>Français (24 séances)</span>
                    </span>
                    <span className="text-[10px] bg-indigo-200 text-indigo-900 px-2 py-0.5 rounded-full font-bold">
                      PPTX + Word
                    </span>
                  </div>
                  <p className="text-xs text-indigo-800 leading-relaxed">
                    {currentLevelData.subjects.french.description}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 pt-2 border-t border-indigo-200/60">
                  <a
                    href={
                      ESCUILA_SUPPORT_PAGE_CONTENT.subjects
                        .find((s) => s.id === "french")
                        ?.levels.find((l) => l.levelNumber === selectedLevel)?.driveFolderUrl
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-1.5 px-2 rounded-lg text-[11px] flex items-center justify-center gap-1 transition"
                  >
                    <FolderOpen className="w-3 h-3 text-amber-300" />
                    <span>مجلد Google Drive</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Filter and Search Controls */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Subject Filter Buttons */}
            <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto">
              <span className="text-xs text-slate-500 font-bold ml-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                <span>المادة:</span>
              </span>
              <button
                type="button"
                onClick={() => setSelectedSubject("all")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedSubject === "all"
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                جميع المواد (72 حصة)
              </button>
              <button
                type="button"
                onClick={() => setSelectedSubject("arabic")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedSubject === "arabic"
                    ? "bg-emerald-700 text-white"
                    : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                }`}
              >
                العربية (24)
              </button>
              <button
                type="button"
                onClick={() => setSelectedSubject("math")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedSubject === "math"
                    ? "bg-blue-700 text-white"
                    : "bg-blue-50 text-blue-800 hover:bg-blue-100"
                }`}
              >
                الرياضيات (24)
              </button>
              <button
                type="button"
                onClick={() => setSelectedSubject("french")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedSubject === "french"
                    ? "bg-indigo-700 text-white"
                    : "bg-indigo-50 text-indigo-800 hover:bg-indigo-100"
                }`}
              >
                الفرنسية (24)
              </button>
            </div>

            {/* Free Search */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث برقم الحصة أو المفهوم أو اللبنة..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-9 pl-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute left-2.5 top-2.5 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Sessions Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold px-1">
              <span>
                عرض {filteredSessions.length} حصة مبرمجة لـ {currentLevelData.titleAr}
              </span>
              <span>انقر على أي حصة لعرض سيناريو التدريس الصريح</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredSessions.map((s) => {
                const isArabic = s.subject === "arabic";
                const isMath = s.subject === "math";
                const subjectBadgeColor = isArabic
                  ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                  : isMath
                  ? "bg-blue-100 text-blue-800 border-blue-200"
                  : "bg-indigo-100 text-indigo-800 border-indigo-200";

                return (
                  <div
                    key={s.id}
                    onClick={() => setSelectedSessionModal(s)}
                    className="bg-white border border-slate-200 hover:border-blue-500 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition cursor-pointer flex flex-col justify-between gap-3 group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-black border ${subjectBadgeColor}`}
                          >
                            {isArabic ? "عربية" : isMath ? "رياضيات" : "فرنسية"}
                          </span>
                          <span className="text-[11px] font-mono font-bold text-slate-500">
                            حصة {s.sessionNumber} • أسبوع {s.weekNumber}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold">
                          اليوم {s.dayNumber}
                        </span>
                      </div>

                      <h4 className="text-sm font-black text-slate-900 group-hover:text-blue-700 transition line-clamp-2">
                        {s.title}
                      </h4>

                      <p className="text-xs text-slate-500 line-clamp-1">{s.buildingBlock}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{s.durationMinutes} دقيقة</span>
                      </span>
                      <span className="text-blue-600 font-bold group-hover:underline flex items-center gap-1">
                        <span>عرض السيناريو</span>
                        <ChevronLeft className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 6. Official Guidelines for Pioneer Schools */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-700" />
          <h3 className="text-base font-black text-slate-900">
            توجيهات وضوابط تنظيم أسابيع الدعم المكثف بمؤسسات الريادة
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-700 leading-relaxed">
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>فترة الدعم المكثف (4 أسابيع):</span>
            </div>
            <p>
              تعتبر فترة الدعم المكثف مرحلة أولى إلزامية من الموسم الدراسي لضمان معالجة التعثرات
              وتثبيت المكتسبات الأساسية، وتستمر طيلة 24 يوماً بمعدل حصص يومية في المواد الثلاث.
            </p>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>الرائز البعدي والمراقبة المستمرة:</span>
            </div>
            <p>
              تختتم مرحلة الدعم المكثف بتمرير رائز بعدي رسمي بنفس معايير الرائز القبلي، وتتحول
              نتائجه المحصلة إلى سلم عددي معتمد يُحتسب ضمن نقط المراقبة المستمرة للدورة الأولى.
            </p>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>هيكلة الحصة ومحطات 3P:</span>
            </div>
            <p>
              تخضع كل حصة للهندسة الصريحة: الانطلاق (الروتين اليومي)، النمذجة (Je fais)،
              الممارسة الموجهة (Nous faisons) على الألواح، والممارسة المستقلة على كراسة الدعم.
            </p>
          </div>
        </div>
      </div>

      {/* 7. Session Details Modal */}
      {selectedSessionModal && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedSessionModal(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 relative my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedSessionModal(null)}
              className="absolute top-4 left-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-blue-700 text-white text-xs font-black px-2.5 py-0.5 rounded-md">
                  الحصة {selectedSessionModal.sessionNumber}
                </span>
                <span className="text-xs text-slate-500 font-bold">
                  اليوم {selectedSessionModal.dayNumber} • {selectedSessionModal.durationMinutes} دقيقة
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900">
                {selectedSessionModal.title}
              </h3>
              <p className="text-xs text-slate-600">
                {selectedSessionModal.track} • {selectedSessionModal.buildingBlock}
              </p>
            </div>

            {/* Stages (3P) */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                المراحل والسيناريو البيداغوجي للحصة (3P):
              </h4>
              <div className="space-y-2">
                {selectedSessionModal.stages.map((stg, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">{stg.title}</span>
                      <span className="text-blue-700 font-bold">{stg.timing}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {stg.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Workbook info */}
            {selectedSessionModal.workbookPage && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 font-medium">
                📘 نشاط كراسة الدعم المكثف: {selectedSessionModal.workbookPage}
              </div>
            )}

            {/* Download Buttons in Modal */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setSelectedSessionModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                إغلاق
              </button>
              <a
                href={
                  ESCUILA_SUPPORT_PAGE_CONTENT.subjects
                    .find((s) => s.id === selectedSessionModal.subject)
                    ?.levels.find((l) => l.levelNumber === selectedSessionModal.level)?.driveFolderUrl
                }
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              >
                <FolderOpen className="w-3.5 h-3.5 text-amber-300" />
                <span>فتح مجلد Google Drive الرسمي للحصة</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
