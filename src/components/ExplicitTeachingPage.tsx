import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  BookOpen,
  Download,
  FileText,
  CheckCircle2,
  Award,
  Presentation,
  Search,
  Plus,
  Edit3,
  Trash2,
  RotateCcw,
  X,
  ChevronRight,
  Layers,
  ShieldCheck,
  Eye,
  FlaskConical,
  Lightbulb,
  Network,
  ClipboardList,
  BookMarked,
  Compass,
  Printer,
} from "lucide-react";
import { TabKey, AdminSession } from "../types";
import {
  ExplicitTeachingPageData,
  ExplicitLessonItem,
  ExplicitTeachingResourcePackage,
  ExplicitLevelKey,
  ExplicitSubjectKey,
  DEFAULT_EXPLICIT_TEACHING_DATA,
} from "../data/explicitTeachingData";
import { GRADE6_EXPLICIT_TARL_LESSONS } from "../data/grade6ExplicitTarlData";
import { ALL_REMAINING_LEVELS_EXPLICIT_TARL_LESSONS } from "../data/allLevelsExplicitTarlData";
import {
  downloadExplicitLessonAsWord,
  downloadExplicitLessonAsPdf,
  downloadLessonsBundleAsWord,
} from "../utils/explicitLessonExporter";
import {
  getStoredAdminSession,
  canUserDeleteArticles,
  ADMIN_SESSION_EVENT,
} from "../utils/adminAuth";

const STORAGE_KEY = "profpress_explicit_teaching_data_v2";

interface ExplicitTeachingPageProps {
  onNavigateToTab?: (tab: TabKey) => void;
}

export const ExplicitTeachingPage: React.FC<ExplicitTeachingPageProps> = ({
  onNavigateToTab,
}) => {
  const [adminSession, setAdminSession] = useState<AdminSession | null>(() =>
    getStoredAdminSession()
  );
  const canEdit = canUserDeleteArticles(adminSession);
  const [isAdminEditMode, setIsAdminEditMode] = useState(false);

  useEffect(() => {
    const handleAuthChange = () => {
      setAdminSession(getStoredAdminSession());
    };
    window.addEventListener(ADMIN_SESSION_EVENT, handleAuthChange);
    window.addEventListener("storage", handleAuthChange);
    return () => {
      window.removeEventListener(ADMIN_SESSION_EVENT, handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  // Load state from localStorage and auto-upgrade older versions (v2/v3) to v4 (all levels internal-only)
  const [pageData, setPageData] = useState<ExplicitTeachingPageData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.dataVersion === 4) {
          return {
            ...DEFAULT_EXPLICIT_TEACHING_DATA,
            ...parsed,
          };
        }
        if (parsed && (parsed.dataVersion === 2 || parsed.dataVersion === 3)) {
          const allDefaultIds = new Set(
            DEFAULT_EXPLICIT_TEACHING_DATA.lessons.map((l) => l.id)
          );
          const legacyReplacedIds = new Set([
            "les_fr_6_1",
            "les_ar_4_1",
            "les_sci_4_1",
            "les_fr_4_1",
            "les_math_3_1",
            "les_ar_1_1",
            "les_ar_2_1",
            "les_sci_1_1",
            "les_math_5_1",
          ]);
          const preservedCustomLessons = Array.isArray(parsed.lessons)
            ? parsed.lessons.filter(
                (l: ExplicitLessonItem) =>
                  !allDefaultIds.has(l.id) && !legacyReplacedIds.has(l.id)
              )
            : [];

          return {
            ...DEFAULT_EXPLICIT_TEACHING_DATA,
            dataVersion: 4,
            packages: DEFAULT_EXPLICIT_TEACHING_DATA.packages,
            lessons: [
              ...GRADE6_EXPLICIT_TARL_LESSONS,
              ...ALL_REMAINING_LEVELS_EXPLICIT_TARL_LESSONS,
              ...preservedCustomLessons,
            ],
          };
        }
      }
    } catch (e) {
      console.error("Failed to load explicit teaching data from storage", e);
    }
    return DEFAULT_EXPLICIT_TEACHING_DATA;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pageData));
    } catch (e) {
      console.error("Failed to persist explicit teaching data", e);
    }
  }, [pageData]);

  // Filters
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedApproach, setSelectedApproach] = useState<"all" | "explicit" | "tarl">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal & Export states
  const [viewingLesson, setViewingLesson] = useState<ExplicitLessonItem | null>(null);
  const [editingLesson, setEditingLesson] = useState<ExplicitLessonItem | null>(null);
  const [isAddingNewLesson, setIsAddingNewLesson] = useState(false);
  const [editingPackage, setEditingPackage] =
    useState<ExplicitTeachingResourcePackage | null>(null);
  const [isEditingHeader, setIsEditingHeader] = useState(false);
  const [pendingAutoPdf, setPendingAutoPdf] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [pdfExportStatus, setPdfExportStatus] = useState("");
  const lessonSheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pendingAutoPdf || !viewingLesson || !lessonSheetRef.current) return;
    setPendingAutoPdf(false);
    const runExport = async () => {
      if (!lessonSheetRef.current || !viewingLesson) return;
      setIsExportingPdf(true);
      setPdfExportStatus("جاري تجهيز ملف PDF...");
      try {
        await downloadExplicitLessonAsPdf(
          lessonSheetRef.current,
          viewingLesson,
          (msg) => setPdfExportStatus(msg)
        );
        setPdfExportStatus("تم تحميل ملف PDF بنجاح");
        setTimeout(() => setPdfExportStatus(""), 3000);
      } catch {
        setPdfExportStatus("تعذر التوليد التلقائي، يمكنك استخدام زر الطباعة A4.");
      } finally {
        setIsExportingPdf(false);
      }
    };
    const timer = setTimeout(runExport, 180);
    return () => clearTimeout(timer);
  }, [pendingAutoPdf, viewingLesson]);

  const handleOpenInternalLessons = (
    level: string = "all",
    subject: string = "all",
    approach: "all" | "explicit" | "tarl" = "all"
  ) => {
    setSelectedLevel(level);
    setSelectedSubject(subject);
    setSelectedApproach(approach);
    setSearchQuery("");
    setTimeout(() => {
      const target = document.getElementById("explicit-lessons-explorer");
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  // Temporary form state for editing / adding lessons
  const [lessonForm, setLessonForm] = useState<Partial<ExplicitLessonItem>>({});
  const [headerForm, setHeaderForm] = useState({
    pageTitle: pageData.pageTitle,
    pageSubtitle: pageData.pageSubtitle,
    badgeText: pageData.badgeText,
    officialUrl: pageData.officialUrl,
  });

  // Filtered lessons
  const filteredLessons = pageData.lessons.filter((item) => {
    if (selectedLevel !== "all" && item.level !== selectedLevel) return false;
    if (selectedSubject !== "all" && item.subject !== selectedSubject) return false;
    if (selectedApproach === "tarl" && !item.isTarl) return false;
    if (selectedApproach === "explicit" && item.isTarl) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchObjective = item.objective.toLowerCase().includes(q);
      const matchConcepts = item.keyConcepts?.some((c) => c.toLowerCase().includes(q));
      if (!matchTitle && !matchObjective && !matchConcepts) return false;
    }
    return true;
  });

  // Reset to default data
  const handleResetToDefault = () => {
    if (
      window.confirm(
        "هل أنت متأكد من استعادة البيانات المحينة 2026/2027 الافتراضية لدروس التعليم الصريح؟"
      )
    ) {
      setPageData(DEFAULT_EXPLICIT_TEACHING_DATA);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  // Open edit lesson
  const handleOpenEditLesson = (lesson: ExplicitLessonItem) => {
    setLessonForm({ ...lesson });
    setEditingLesson(lesson);
  };

  // Open add new lesson (Internal only)
  const handleOpenAddLesson = () => {
    const levelVal: ExplicitLevelKey =
      selectedLevel !== "all" ? (selectedLevel as ExplicitLevelKey) : "4aep";
    const subjectVal: ExplicitSubjectKey =
      selectedSubject !== "all" ? (selectedSubject as ExplicitSubjectKey) : "arabic";

    setLessonForm({
      id: "les_" + Date.now(),
      level: levelVal,
      subject: subjectVal,
      unit: 1,
      week: 1,
      title: "",
      titleFr: "",
      objective: "",
      internalOnly: true,
      pptUrl: "",
      pdfUrl: "",
      driveUrl: "",
      fileSize: "تحميل داخلي (PDF / Word)",
      durationMinutes: 45,
      keyConcepts: [],
      steps: {
        preparation: "",
        modeling: "",
        guided: "",
        autonomous: "",
        evaluation: "",
      },
    });
    setIsAddingNewLesson(true);
  };

  // Save lesson
  const handleSaveLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonForm.title || !lessonForm.objective) return;

    const newLesson: ExplicitLessonItem = {
      id: lessonForm.id || "les_" + Date.now(),
      level: (lessonForm.level || "4aep") as ExplicitLevelKey,
      subject: (lessonForm.subject || "arabic") as ExplicitSubjectKey,
      unit: Number(lessonForm.unit) || 1,
      week: Number(lessonForm.week) || 1,
      title: lessonForm.title || "",
      titleFr: lessonForm.titleFr,
      objective: lessonForm.objective || "",
      internalOnly: true,
      pptUrl: "",
      pdfUrl: "",
      driveUrl: "",
      fileSize: lessonForm.fileSize || "تحميل داخلي (PDF / Word)",
      durationMinutes: Number(lessonForm.durationMinutes) || 45,
      keyConcepts: Array.isArray(lessonForm.keyConcepts)
        ? lessonForm.keyConcepts
        : (lessonForm.keyConcepts as any)
            ?.split?.(",")
            .map((s: string) => s.trim())
            .filter(Boolean) || [],
      steps: {
        preparation: lessonForm.steps?.preparation || "",
        modeling: lessonForm.steps?.modeling || "",
        guided: lessonForm.steps?.guided || "",
        autonomous: lessonForm.steps?.autonomous || "",
        evaluation: lessonForm.steps?.evaluation || "",
      },
    };

    if (editingLesson) {
      setPageData((prev) => ({
        ...prev,
        lessons: prev.lessons.map((l) => (l.id === editingLesson.id ? newLesson : l)),
      }));
      setEditingLesson(null);
    } else {
      setPageData((prev) => ({
        ...prev,
        lessons: [newLesson, ...prev.lessons],
      }));
      setIsAddingNewLesson(false);
    }
  };

  // Delete lesson
  const handleDeleteLesson = (id: string) => {
    if (window.confirm("هل أنت متأكد من رغبتك في حذف هذا الدرس؟")) {
      setPageData((prev) => ({
        ...prev,
        lessons: prev.lessons.filter((l) => l.id !== id),
      }));
      if (viewingLesson?.id === id) setViewingLesson(null);
    }
  };

  // Save package edit
  const handleSavePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPackage) return;
    setPageData((prev) => ({
      ...prev,
      packages: prev.packages.map((pkg) =>
        pkg.id === editingPackage.id ? editingPackage : pkg
      ),
    }));
    setEditingPackage(null);
  };

  // Save header edit
  const handleSaveHeader = (e: React.FormEvent) => {
    e.preventDefault();
    setPageData((prev) => ({
      ...prev,
      pageTitle: headerForm.pageTitle,
      pageSubtitle: headerForm.pageSubtitle,
      badgeText: headerForm.badgeText,
      officialUrl: headerForm.officialUrl,
    }));
    setIsEditingHeader(false);
  };

  const levelLabels: Record<ExplicitLevelKey, string> = {
    "1aep": "1AEP · الأول ابتدائي",
    "2aep": "2AEP · الثاني ابتدائي",
    "3aep": "3AEP · الثالث ابتدائي",
    "4aep": "4AEP · الرابع ابتدائي",
    "5aep": "5AEP · الخامس ابتدائي",
    "6aep": "6AEP · السادس ابتدائي",
    shared: "الأقسام المشتركة",
  };

  const subjectMeta: Record<
    ExplicitSubjectKey,
    { ar: string; fr: string; textColor: string }
  > = {
    arabic: {
      ar: "اللغة العربية",
      fr: "Arabe",
      textColor: "text-emerald-700",
    },
    french: {
      ar: "اللغة الفرنسية",
      fr: "Français",
      textColor: "text-blue-700",
    },
    math: {
      ar: "الرياضيات",
      fr: "Maths",
      textColor: "text-amber-700",
    },
    science: {
      ar: "النشاط العلمي",
      fr: "Éveil Scientifique",
      textColor: "text-teal-700",
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans" dir="rtl">
      {/* Top Admin Controls Bar */}
      {canEdit && (
        <div className="bg-slate-900 text-white px-4 py-2 text-xs border-b border-slate-800 sticky top-14 z-30">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-bold">وضع إدارة صفحة التعليم الصريح (مدير المنصة)</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAdminEditMode(!isAdminEditMode)}
                className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  isAdminEditMode
                    ? "bg-amber-500 text-slate-950"
                    : "bg-slate-800 hover:bg-slate-700 text-white"
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isAdminEditMode ? "إيقاف التعديل" : "تفعيل التعديل والإضافة"}</span>
              </button>

              {isAdminEditMode && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setHeaderForm({
                        pageTitle: pageData.pageTitle,
                        pageSubtitle: pageData.pageSubtitle,
                        badgeText: pageData.badgeText,
                        officialUrl: pageData.officialUrl,
                      });
                      setIsEditingHeader(true);
                    }}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition cursor-pointer whitespace-nowrap shrink-0"
                  >
                    تعديل الترويسة
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenAddLesson}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition cursor-pointer flex items-center gap-1 whitespace-nowrap shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>إضافة درس صريح</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetToDefault}
                    className="px-3 py-1.5 bg-rose-700 hover:bg-rose-600 text-white font-bold rounded-lg transition cursor-pointer flex items-center gap-1 whitespace-nowrap shrink-0"
                    title="استعادة البيانات المحينة 2026/2027"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>استعادة الافتراضي</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center gap-2 text-xs text-slate-500 overflow-x-auto">
          <button
            type="button"
            onClick={() => onNavigateToTab?.("home")}
            className="hover:text-indigo-700 transition font-medium cursor-pointer whitespace-nowrap shrink-0"
          >
            الرئيسية
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 rotate-180 shrink-0" />
          <span className="font-medium text-slate-600 whitespace-nowrap shrink-0">
            مدارس الريادة · التعليم الابتدائي
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 rotate-180 shrink-0" />
          <span className="font-bold text-indigo-700 whitespace-nowrap shrink-0">
            دروس التعليم الصريح الجديدة 2026 / 2027
          </span>
        </div>
      </div>

      {/* Hero Header Section */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white py-10 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-3xl">
              <div className="text-xs text-indigo-300 font-semibold mb-3 flex flex-wrap items-center gap-2">
                <span>{pageData.badgeText}</span>
                <span aria-hidden="true">·</span>
                <span>عروض PPTX / PPSX</span>
                <span aria-hidden="true">·</span>
                <span>اللغة العربية · الفرنسية · الرياضيات · النشاط العلمي</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight mb-3 text-balance">
                {pageData.pageTitle}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {pageData.pageSubtitle}
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => handleOpenInternalLessons("all", "all", "all")}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>تصفح وتحميل جميع الدروس داخلياً (Word / PDF)</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById("explicit-packages-section")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Layers className="w-4 h-4 text-sky-300" />
                  <span>حقائب المستويات (1AEP إلى 6AEP + مشترك)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenInternalLessons("all", "all", "tarl")}
                  className="bg-indigo-600/80 hover:bg-indigo-600 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Compass className="w-4 h-4 text-amber-300" />
                  <span>حزم الدعم المكثف طارل (TaRL)</span>
                </button>
              </div>
            </div>

            {/* Clean Summary Specs Card */}
            <div className="bg-white/10 border border-white/15 rounded-2xl p-5 shrink-0 lg:w-80">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-300">العدة البيداغوجية الشاملة</div>
                  <div className="text-lg font-black text-white tabular-nums">
                    {pageData.lessons.length} درس · 7 مسارات
                  </div>
                </div>
              </div>
              <div className="text-xs text-slate-200 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-slate-300">المستويات الدراسية:</span>
                  <span className="font-bold text-emerald-300">1AEP إلى 6AEP + مشترك</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-slate-300">المواد المغطاة:</span>
                  <span className="font-bold text-amber-300">عربية · فرنسية · رياضيات · علمي</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-slate-300">صيغ التحميل الداخلي:</span>
                  <span className="font-bold text-sky-300">Word (.doc) · PDF · طباعة A4</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-slate-300">روابط التحميل:</span>
                  <span className="font-bold text-emerald-300">داخل الموقع 100% (آمن)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 mt-8 space-y-10">
        {/* ========================================================= */}
        {/* 1. SUBJECT REPOSITORIES (4 CORE SUBJECTS - INTERNAL ONLY) */}
        {/* ========================================================= */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                تصفح وتحميل دروس التعليم الصريح وطارل حسب المادة (داخل الموقع 2026 / 2027)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                اختر المادة لعرض دروسها المصنفة لجميع المستويات وتحميل الحقيبة كاملة بصيغة Word أو PDF دون أي روابط خارجية
              </p>
            </div>
            <span className="text-xs text-slate-500 whitespace-nowrap">
              {pageData.lastUpdatedText || "موسم 2026 / 2027"} · تحميل داخلي مباشر
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pageData.subjectFolders.map((sub) => {
              const subjectLessons = pageData.lessons.filter((l) => l.subject === sub.id);
              const colorMap: Record<
                string,
                { iconWrap: string; btn: string; borderHover: string }
              > = {
                emerald: {
                  iconWrap: "bg-emerald-50 text-emerald-700",
                  btn: "bg-emerald-600 hover:bg-emerald-500 text-white",
                  borderHover: "hover:border-emerald-300",
                },
                blue: {
                  iconWrap: "bg-blue-50 text-blue-700",
                  btn: "bg-blue-600 hover:bg-blue-500 text-white",
                  borderHover: "hover:border-blue-300",
                },
                amber: {
                  iconWrap: "bg-amber-50 text-amber-700",
                  btn: "bg-amber-600 hover:bg-amber-500 text-white",
                  borderHover: "hover:border-amber-300",
                },
                teal: {
                  iconWrap: "bg-teal-50 text-teal-700",
                  btn: "bg-teal-600 hover:bg-teal-500 text-white",
                  borderHover: "hover:border-teal-300",
                },
              };
              const theme = colorMap[sub.accentColor] || colorMap.emerald;

              return (
                <div
                  key={sub.id}
                  className={`bg-white rounded-2xl p-5 border border-slate-200 transition flex flex-col justify-between ${theme.borderHover}`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${theme.iconWrap}`}>
                        {sub.id === "science" ? (
                          <FlaskConical className="w-5 h-5" />
                        ) : (
                          <BookOpen className="w-5 h-5" />
                        )}
                      </div>
                      <span className="text-xs text-slate-500 font-bold tabular-nums">
                        {subjectLessons.length} دروس
                      </span>
                    </div>

                    <h3 className="text-base font-black text-slate-900">{sub.nameAr}</h3>
                    <div className="text-xs text-slate-500 mb-2" dir="ltr">
                      {sub.nameFr}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {sub.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => handleOpenInternalLessons("all", sub.id, "all")}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${theme.btn}`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>عرض الدروس</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        downloadLessonsBundleAsWord(
                          subjectLessons,
                          `حقيبة التعليم الصريح وطارل - ${sub.nameAr} (جميع المستويات)`
                        )
                      }
                      className="py-2 px-3 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
                      title={`تحميل حقيبة ${sub.nameAr} كاملة بصيغة Word`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Word</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Internal TaRL + Companion Tools Strip */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
            <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="text-xs font-semibold text-indigo-700">
                  التحميل الداخلي المباشر · 1AEP إلى 6AEP + الأقسام المشتركة
                </div>
                <h3 className="text-base font-black text-slate-900">
                  تحميل الحقيبة الكاملة لدروس التعليم الصريح ودعم طارل (TaRL) بصيغة Word و PDF
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                  جميع بطاقات الدروس وسيناريوهات المراحل الخمس وملخصات القواعد والتمارين المصححة متاحة للمعاينة والطباعة A4 والتنزيل الفوري من داخل الموقع بدون أي تحويل لمواقع خارجية.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  downloadLessonsBundleAsWord(
                    pageData.lessons,
                    "الحقيبة الشاملة لدروس التعليم الصريح ودعم طارل TaRL - جميع المستويات"
                  )
                }
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>تحميل الكل (Word)</span>
              </button>
            </div>

            {/* Companion Platform Tools Card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 flex flex-col justify-between gap-3">
              <div>
                <div className="text-xs font-semibold text-slate-500 mb-1">
                  أدوات مساعدة مدمجة في المنصة
                </div>
                <div className="text-sm font-black text-slate-900">
                  استكمل إعداد حصص الريادة داخل بروف بريس
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onNavigateToTab?.("mindmaps")}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Network className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">الخرائط الذهنية</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateToTab?.("intensive_support")}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Compass className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">الدعم المكثف</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateToTab?.("daily_log")}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <ClipboardList className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">المذكرة اليومية</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateToTab?.("covers")}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <FileText className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">أغلفة الملفات</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. LEVEL RESOURCE PACKAGES (1AEP -> 6AEP + SHARED)        */}
        {/* ========================================================= */}
        <section id="explicit-packages-section" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-600 shrink-0" />
                <span>حقائب دروس التعليم الصريح وطارل حسب المستويات والأقسام المشتركة</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                وصول داخلي فوري لجميع المستويات (من الأول إلى السادس + المشترك) مع تحميل مباشر بصيغتي Word و PDF
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pageData.packages.map((pkg) => {
              const levelLessons = pageData.lessons.filter((l) => l.level === pkg.level);
              const subjectRows = [
                {
                  key: "arabic",
                  label: "اللغة العربية (صريح & TaRL)",
                  rowClass: "bg-emerald-50/70 hover:bg-emerald-100/80 text-emerald-900 border-emerald-200",
                },
                {
                  key: "french",
                  label: "اللغة الفرنسية · Français",
                  rowClass: "bg-blue-50/70 hover:bg-blue-100/80 text-blue-900 border-blue-200",
                },
                {
                  key: "math",
                  label: "الرياضيات (صريح & TaRL)",
                  rowClass: "bg-amber-50/70 hover:bg-amber-100/80 text-amber-900 border-amber-200",
                },
                {
                  key: "science",
                  label: "النشاط العلمي (نهج التقصي)",
                  rowClass: "bg-teal-50/70 hover:bg-teal-100/80 text-teal-900 border-teal-200",
                },
              ];

              return (
                <div
                  key={pkg.id}
                  className={`bg-white rounded-2xl p-5 border border-slate-200 hover:border-indigo-300 transition flex flex-col justify-between ${
                    pkg.level === "shared" ? "md:col-span-2 lg:col-span-3" : ""
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="text-xs text-slate-500 mb-0.5">
                          <span>{pkg.levelNameFr}</span>
                          <span aria-hidden="true"> · </span>
                          <span className="tabular-nums font-bold text-indigo-700">
                            {levelLessons.length} دروس متكاملة
                          </span>
                        </div>
                        <h3 className="text-base font-black text-slate-900">
                          {pkg.levelNameAr}
                        </h3>
                      </div>

                      {isAdminEditMode && (
                        <button
                          type="button"
                          onClick={() => setEditingPackage({ ...pkg })}
                          className="text-indigo-600 hover:text-indigo-800 font-bold text-xs flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>تعديل الحقيبة</span>
                        </button>
                      )}
                    </div>

                    <div
                      className={`gap-2 text-xs mb-3 ${
                        pkg.level === "shared"
                          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                          : "space-y-2"
                      }`}
                    >
                      {subjectRows.map((row) => (
                        <div
                          key={row.key}
                          className={`flex items-center justify-between gap-2 p-2 rounded-xl border transition ${row.rowClass}`}
                        >
                          <button
                            type="button"
                            onClick={() => handleOpenInternalLessons(pkg.level, row.key, "all")}
                            className="flex items-center gap-2 font-bold flex-1 min-w-0 text-right cursor-pointer"
                          >
                            <BookOpen className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{row.label}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenInternalLessons(pkg.level, row.key, "all")}
                            className="px-2 py-1 rounded-lg bg-white/90 hover:bg-white text-slate-800 text-[11px] font-bold transition cursor-pointer shrink-0"
                          >
                            فتح داخلي
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs text-slate-500">
                    <button
                      type="button"
                      onClick={() => handleOpenInternalLessons(pkg.level, "all", "all")}
                      className="text-indigo-700 hover:text-indigo-900 font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>عرض الكل (PDF / Word)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        downloadLessonsBundleAsWord(
                          levelLessons,
                          `حقيبة ${pkg.levelNameAr} - التعليم الصريح وطارل`
                        )
                      }
                      className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold flex items-center gap-1 cursor-pointer transition"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>تحميل الحقيبة Word</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. PEDAGOGICAL FRAMEWORK & ROLE COMPARISON TABLE          */}
        {/* ========================================================= */}
        <section className="bg-white rounded-2xl p-6 border border-slate-200 space-y-6">
          <div className="pb-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                {pageData.introduction.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl mt-1">
                {pageData.introduction.description}
              </p>
            </div>
            <div className="text-xs font-semibold text-indigo-700 self-start shrink-0 whitespace-nowrap">
              الإطار المرجعي · مدارس الريادة
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {pageData.introduction.steps.map((step) => {
              const colorClasses: Record<
                string,
                { card: string; badge: string; border: string }
              > = {
                amber: {
                  card: "bg-amber-50/40",
                  badge: "bg-amber-600 text-white",
                  border: "border-amber-200",
                },
                blue: {
                  card: "bg-blue-50/40",
                  badge: "bg-blue-600 text-white",
                  border: "border-blue-200",
                },
                emerald: {
                  card: "bg-emerald-50/40",
                  badge: "bg-emerald-600 text-white",
                  border: "border-emerald-200",
                },
                indigo: {
                  card: "bg-indigo-50/40",
                  badge: "bg-indigo-600 text-white",
                  border: "border-indigo-200",
                },
                rose: {
                  card: "bg-rose-50/40",
                  badge: "bg-rose-600 text-white",
                  border: "border-rose-200",
                },
              };
              const theme = colorClasses[step.color] || colorClasses.blue;

              return (
                <div
                  key={step.number}
                  className={`rounded-xl p-4 border flex flex-col justify-between ${theme.card} ${theme.border}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black tabular-nums ${theme.badge}`}
                      >
                        0{step.number}
                      </span>
                      <span className="text-[11px] font-medium text-slate-500" dir="ltr">
                        {step.nameFr}
                      </span>
                    </div>

                    <h3 className="font-black text-slate-900 text-sm mb-1">
                      {step.nameAr}
                    </h3>
                    <div className="text-xs font-bold text-indigo-800 mb-2">
                      {step.tagline}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Role Comparison Table: I Do / We Do / You Do */}
          <div className="pt-2">
            <h3 className="text-sm font-black text-slate-900 mb-3">
              مصفوفة توزيع الأدوار الصفية في مراحل التعليم الصريح (I Do · We Do · You Do)
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4 font-black whitespace-nowrap">مرحلة التعليم الصريح</th>
                    <th className="py-3 px-4 font-black">دور الأستاذ (النمذجة والتدبير)</th>
                    <th className="py-3 px-4 font-black">دور المتعلم (الممارسة)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {pageData.roleComparison.map((row) => (
                    <tr key={row.stageCode} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">
                        <span>{row.stageAr}</span>
                        <span className="text-indigo-700 font-mono mr-1.5" dir="ltr">
                          ({row.stageCode})
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-700 leading-relaxed">
                        {row.teacherRole}
                      </td>
                      <td className="py-3 px-4 text-slate-700 leading-relaxed">
                        {row.studentRole}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. INTERACTIVE LESSONS EXPLORER                           */}
        {/* ========================================================= */}
        <section id="explicit-lessons-explorer" className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                <Presentation className="w-5 h-5 text-indigo-600 shrink-0" />
                <span>بنك جذاذات وسيناريوهات دروس التعليم الصريح ودعم طارل (TaRL)</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                نماذج عملية مفصلة للخطوات الخمس والملخصات والتمارين المصححة لجميع المستويات (1AEP إلى 6AEP + المشتركة) بتحميل داخلي Word و PDF
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs">
                {[
                  { id: "all" as const, label: "الكل" },
                  { id: "explicit" as const, label: "التعليم الصريح" },
                  { id: "tarl" as const, label: "دعم طارل TaRL" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedApproach(opt.id)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer whitespace-nowrap ${
                      selectedApproach === opt.id
                        ? "bg-white text-indigo-800 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {filteredLessons.length > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    downloadLessonsBundleAsWord(
                      filteredLessons,
                      selectedLevel === "all"
                        ? "دروس التعليم الصريح وطارل - القائمة المختارة"
                        : `دروس ${levelLabels[selectedLevel as ExplicitLevelKey] || selectedLevel}`
                    )
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>تحميل القائمة Word ({filteredLessons.length})</span>
                </button>
              )}

              {isAdminEditMode && (
                <button
                  type="button"
                  onClick={handleOpenAddLesson}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer self-start whitespace-nowrap shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة درس صريح جديد</span>
                </button>
              )}
            </div>
          </div>

          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
            {/* Level Selector */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto">
              <button
                type="button"
                onClick={() => setSelectedLevel("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
                  selectedLevel === "all"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                جميع المستويات
              </button>
              {(["1aep", "2aep", "3aep", "4aep", "5aep", "6aep"] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
                    selectedLevel === lvl
                      ? "bg-indigo-600 text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {lvl.toUpperCase()}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setSelectedLevel("shared")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
                  selectedLevel === "shared"
                    ? "bg-indigo-600 text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                مشترك
              </button>
            </div>

            {/* Subject Selector */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto">
              <button
                type="button"
                onClick={() => setSelectedSubject("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
                  selectedSubject === "all"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                كل المواد
              </button>
              <button
                type="button"
                onClick={() => setSelectedSubject("arabic")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
                  selectedSubject === "arabic"
                    ? "bg-emerald-600 text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                العربية
              </button>
              <button
                type="button"
                onClick={() => setSelectedSubject("french")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
                  selectedSubject === "french"
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                الفرنسية
              </button>
              <button
                type="button"
                onClick={() => setSelectedSubject("math")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
                  selectedSubject === "math"
                    ? "bg-amber-600 text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                الرياضيات
              </button>
              <button
                type="button"
                onClick={() => setSelectedSubject("science")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
                  selectedSubject === "science"
                    ? "bg-teal-600 text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                النشاط العلمي
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full xl:w-64 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="بحث في الدروس والمفاهيم..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-9 pl-3 py-2 text-xs text-slate-800 outline-hidden focus:border-indigo-500 focus:bg-white transition"
              />
            </div>
          </div>

          {/* Lessons List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLessons.length === 0 ? (
              <div className="col-span-full bg-white rounded-2xl p-10 text-center border border-slate-200">
                <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h4 className="text-slate-700 font-bold text-sm">
                  لم يتم العثور على دروس مطابقة
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  جرب تغيير خيارات التصفية أو مسح عبارة البحث
                </p>
              </div>
            ) : (
              filteredLessons.map((lesson) => {
                const subMeta = subjectMeta[lesson.subject] || subjectMeta.arabic;
                return (
                  <div
                    key={lesson.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-indigo-300 transition flex flex-col justify-between group"
                  >
                    <div>
                      {/* Clean Typographic Metadata Header (Zero-Pill) */}
                      <div className="flex items-center justify-between gap-2 text-xs mb-2.5">
                        <span className={`font-black ${subMeta.textColor}`}>
                          {subMeta.ar}
                          {lesson.isTarl && (
                            <span className="text-amber-700 font-bold mr-1">· دعم طارل</span>
                          )}
                        </span>
                        <div className="flex items-center gap-1.5 text-slate-500 font-medium tabular-nums">
                          <span>
                            {lesson.level === "shared"
                              ? "مشترك"
                              : lesson.level.toUpperCase()}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>الوحدة {lesson.unit}</span>
                          <span aria-hidden="true">·</span>
                          <span>أسبوع {lesson.week}</span>
                        </div>
                      </div>

                      <h3 className="font-black text-slate-900 text-sm mb-2 group-hover:text-indigo-700 transition leading-snug">
                        {lesson.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-2">
                        <span className="font-bold text-slate-800">الهدف: </span>
                        {lesson.objective}
                      </p>

                      {lesson.keyConcepts && lesson.keyConcepts.length > 0 && (
                        <div className="text-[11px] text-slate-500 mb-4 truncate">
                          {lesson.keyConcepts.slice(0, 3).join(" · ")}
                        </div>
                      )}
                    </div>

                    {/* Action Footer */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs gap-2">
                      <button
                        type="button"
                        onClick={() => setViewingLesson(lesson)}
                        className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{lesson.internalOnly ? "الدرس والملخص" : "سيناريو الدرس"}</span>
                      </button>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => downloadExplicitLessonAsWord(lesson)}
                          className="px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold transition cursor-pointer flex items-center gap-1"
                          title="تحميل الدرس بصيغة Word داخل الموقع"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Word</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setViewingLesson(lesson);
                            setPendingAutoPdf(true);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition cursor-pointer flex items-center gap-1"
                          title="تحميل الدرس بصيغة PDF داخل الموقع"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>PDF</span>
                        </button>

                        {isAdminEditMode && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleOpenEditLesson(lesson)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-100 hover:text-blue-700 text-slate-600 transition cursor-pointer"
                              title="تعديل الدرس"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteLesson(lesson.id)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-100 hover:text-rose-700 text-slate-600 transition cursor-pointer"
                              title="حذف الدرس"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. DIDACTIC FOUNDATIONS, FIELD TIP & REFERENCES           */}
        {/* ========================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 space-y-5">
            <div>
              <h2 className="text-lg font-black text-slate-900 mb-2">
                {pageData.didacticFoundations.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {pageData.didacticFoundations.summary}
              </p>
            </div>

            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-black text-amber-900">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{pageData.didacticFoundations.fieldTipTitle}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigateToTab?.("mindmaps")}
                  className="text-xs font-bold text-indigo-700 hover:text-indigo-900 underline cursor-pointer whitespace-nowrap"
                >
                  استعراض الخرائط الذهنية
                </button>
              </div>
              <p className="text-xs sm:text-sm text-amber-950/80 leading-relaxed">
                {pageData.didacticFoundations.fieldTipBody}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-black text-slate-900 mb-2.5">
                توجيهات عملية لضمان الأثر الإيجابي داخل القسم
              </h3>
              <ul className="space-y-2">
                {pageData.didacticFoundations.practicalTips.map((tip, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center gap-2 text-sm font-black text-slate-900 mb-3">
                <BookMarked className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>المراجع والنصوص المؤطرة المعتمدة</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
                {pageData.didacticFoundations.references.map((ref, i) => (
                  <li key={i} className="pb-3 border-b border-slate-100 last:border-b-0 last:pb-0">
                    {ref}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2.5">
              <div className="text-xs font-black text-slate-900">
                تحميل وأدوات داخلية للموسم الدراسي
              </div>
              <button
                type="button"
                onClick={() =>
                  downloadLessonsBundleAsWord(
                    pageData.lessons,
                    "الحقيبة الشاملة لدروس التعليم الصريح ودعم طارل - جميع المستويات"
                  )
                }
                className="w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>تحميل الحقيبة الشاملة Word (جميع المستويات)</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigateToTab?.("intensive_support")}
                className="w-full py-2 px-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-indigo-600" />
                <span>فتح فضاء الدعم المكثف طارل (TaRL)</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* ========================================================= */}
      {/* MODAL 1: VIEW LESSON SCRIPT + SUMMARY + INTERNAL EXPORT   */}
      {/* ========================================================= */}
      {viewingLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div
            className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
            dir="rtl"
          >
            <div className="no-print bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-5 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-indigo-200 mb-1.5">
                  <span>{levelLabels[viewingLesson.level] || viewingLesson.level}</span>
                  <span aria-hidden="true">·</span>
                  <span>الوحدة {viewingLesson.unit}</span>
                  <span aria-hidden="true">·</span>
                  <span>الأسبوع {viewingLesson.week}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-300 font-bold">
                    {viewingLesson.durationMinutes || 45} دقيقة
                  </span>
                  {viewingLesson.isTarl && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-emerald-300 font-bold">دعم مكثف TaRL</span>
                    </>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-black text-white leading-snug">
                  {viewingLesson.title}
                </h3>
                {viewingLesson.titleFr && (
                  <p className="text-xs text-slate-300 mt-1" dir="ltr">
                    {viewingLesson.titleFr}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => setViewingLesson(null)}
                className="text-white/70 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 bg-slate-100/70 p-4 sm:p-6">
              {/* Printable & PDF Exportable Sheet */}
              <div
                ref={lessonSheetRef}
                dir={viewingLesson.subject === "french" ? "ltr" : "rtl"}
                className="print-sheet bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-5 text-slate-800 shadow-xs"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-500 border-b border-slate-200 pb-3 font-bold">
                  <span>المملكة المغربية · وزارة التربية الوطنية والتعليم الأولي والرياضة</span>
                  <span>
                    {levelLabels[viewingLesson.level] || viewingLesson.level} · الوحدة {viewingLesson.unit}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-lg sm:text-xl font-black text-slate-900">
                    {viewingLesson.title}
                  </h4>
                  {viewingLesson.titleFr && viewingLesson.subject !== "french" && (
                    <p className="text-xs text-slate-500" dir="ltr">
                      {viewingLesson.titleFr}
                    </p>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                  <div className="text-xs font-black text-blue-950 mb-1 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-blue-600" />
                    <span>
                      {viewingLesson.subject === "french"
                        ? "Objectif d'apprentissage :"
                        : "الهدف التعلمي المصرح به (Objectif d'apprentissage)"}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-blue-900 leading-relaxed font-medium">
                    {viewingLesson.objective}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-black text-slate-900">
                    {viewingLesson.subject === "french"
                      ? "Déroulement explicite de la séance (5 étapes)"
                      : "مراحل وسيناريو التدريس الصريح للحصة (5 مراحل)"}
                  </h4>

                  <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-1 text-xs font-black text-amber-900">
                      <span className="w-5 h-5 rounded-md bg-amber-600 text-white flex items-center justify-center text-[10px]">
                        1
                      </span>
                      <span>التهيئة والربط (Ouverture / Rappel)</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {viewingLesson.steps.preparation ||
                        "تنشيط المكتسبات السابقة والتصريح بالهدف التعلمي."}
                    </p>
                  </div>

                  <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-1 text-xs font-black text-blue-900">
                      <span className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center text-[10px]">
                        2
                      </span>
                      <span>النمذجة (Modelage: «أنا أعمل / I Do»)</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {viewingLesson.steps.modeling ||
                        "الأستاذ ينفذ المهمة بصوت مسموع مع توضيح خطوات التفكير وتفادي الأخطاء."}
                    </p>
                  </div>

                  <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-1 text-xs font-black text-emerald-900">
                      <span className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                        3
                      </span>
                      <span>الممارسة الموجهة (Pratique guidée: «نحن نعمل معاً / We Do»)</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {viewingLesson.steps.guided ||
                        "مشاركة المتعلمين على الألواح وتصحيح فوري جماعي وثنائي."}
                    </p>
                  </div>

                  <div className="bg-indigo-50/60 border border-indigo-200 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-1 text-xs font-black text-indigo-900">
                      <span className="w-5 h-5 rounded-md bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                        4
                      </span>
                      <span>الممارسة المستقلة (Pratique autonome: «أنت تعمل بمفردك / You Do»)</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {viewingLesson.steps.autonomous ||
                        "إنجاز فردي لتمارين كراسة التلميذ مع متابعة المتعثرين."}
                    </p>
                  </div>

                  <div className="bg-rose-50/60 border border-rose-200 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-1 text-xs font-black text-rose-900">
                      <span className="w-5 h-5 rounded-md bg-rose-600 text-white flex items-center justify-center text-[10px]">
                        5
                      </span>
                      <span>التقويم والتغذية الراجعة (Objectivation & Bilan)</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {viewingLesson.steps.evaluation ||
                        "سؤال تحقق نهائي ومراجعة ما تم تعلمه قبل الانتقال للمهمة الموالية."}
                    </p>
                  </div>
                </div>

                {/* Rules & Summary Points */}
                {viewingLesson.summaryPoints && viewingLesson.summaryPoints.length > 0 && (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                    <h4 className="text-xs font-black text-slate-900">
                      {viewingLesson.subject === "french"
                        ? "Synthèse et Règles Clés"
                        : "ملخص الدرس والقواعد الأساسية"}
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-700 list-disc list-inside leading-relaxed">
                      {viewingLesson.summaryPoints.map((point, pIdx) => (
                        <li key={pIdx}>{point}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Slides Outline */}
                {viewingLesson.slidesOutline && viewingLesson.slidesOutline.length > 0 && (
                  <div className="bg-indigo-50/40 border border-indigo-200 rounded-2xl p-4 space-y-2">
                    <h4 className="text-xs font-black text-indigo-950">
                      {viewingLesson.subject === "french"
                        ? "Contenu des Diapositives (Présentation)"
                        : "محتوى ومحاور الشرائح التفاعلية للعرض الصفي"}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {viewingLesson.slidesOutline.map((sl, sIdx) => (
                        <div
                          key={sIdx}
                          className="bg-white border border-indigo-100 rounded-xl p-3 text-xs space-y-1"
                        >
                          <div className="font-black text-indigo-800">{sl.slideTitle}</div>
                          <p className="text-slate-600 leading-relaxed">{sl.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Exercises with Answers */}
                {viewingLesson.exercisesWithCorrection &&
                  viewingLesson.exercisesWithCorrection.length > 0 && (
                    <div className="bg-emerald-50/40 border border-emerald-200 rounded-2xl p-4 space-y-2.5">
                      <h4 className="text-xs font-black text-emerald-950">
                        {viewingLesson.subject === "french"
                          ? "Exercices d'application & Corrigé"
                          : "تمارين تطبيقية مرفقة بعناصر الإجابة"}
                      </h4>
                      {viewingLesson.exercisesWithCorrection.map((ex, eIdx) => (
                        <div key={eIdx} className="bg-white border border-emerald-100 rounded-xl p-3 text-xs space-y-1.5">
                          <p className="font-bold text-slate-900">{ex.question}</p>
                          <p className="text-emerald-800 bg-emerald-50 rounded-lg p-2 font-medium">
                            {ex.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                {viewingLesson.keyConcepts && viewingLesson.keyConcepts.length > 0 && (
                  <div className="pt-2 border-t border-slate-100 text-xs text-slate-600">
                    <span className="font-bold text-slate-800 ml-2">المفاهيم المفتاحية:</span>
                    <span>{viewingLesson.keyConcepts.join(" · ")}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="no-print p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-600 font-medium">
                {pdfExportStatus ? (
                  <span className="text-emerald-700 font-bold">{pdfExportStatus}</span>
                ) : (
                  <span>
                    {viewingLesson.internalOnly
                      ? "تحميل مباشر وآمن داخل الموقع (PDF / Word)"
                      : `حجم الملف: ${viewingLesson.fileSize || "4.5 MB"}`}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => downloadExplicitLessonAsWord(viewingLesson)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs transition flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>تحميل Word (.doc)</span>
                </button>

                <button
                  type="button"
                  disabled={isExportingPdf}
                  onClick={async () => {
                    if (!lessonSheetRef.current || isExportingPdf) return;
                    setIsExportingPdf(true);
                    setPdfExportStatus("جاري تجهيز ملف PDF...");
                    try {
                      await downloadExplicitLessonAsPdf(
                        lessonSheetRef.current,
                        viewingLesson,
                        (msg) => setPdfExportStatus(msg)
                      );
                      setPdfExportStatus("تم تحميل ملف PDF بنجاح");
                      setTimeout(() => setPdfExportStatus(""), 3000);
                    } catch {
                      setPdfExportStatus("تعذر التوليد التلقائي، استخدم الطباعة A4.");
                    } finally {
                      setIsExportingPdf(false);
                    }
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-bold px-4 py-2 rounded-xl text-xs transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{isExportingPdf ? "جاري التوليد..." : "تحميل PDF (A4)"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>طباعة A4</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewingLesson(null)}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: ADD / EDIT LESSON FORM (ADMIN)                   */}
      {/* ========================================================= */}
      {(isAddingNewLesson || editingLesson) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div
            className="bg-white rounded-3xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
            dir="rtl"
          >
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <h3 className="text-base font-black flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-amber-400" />
                <span>{editingLesson ? "تعديل درس صريح" : "إضافة درس صريح جديد"}</span>
              </h3>
              <button
                type="button"
                onClick={() => {
                  setEditingLesson(null);
                  setIsAddingNewLesson(false);
                }}
                className="text-white/70 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={handleSaveLesson}
              className="p-6 overflow-y-auto space-y-4 text-xs text-slate-800"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold mb-1">المستوى الدراسي *</label>
                  <select
                    value={lessonForm.level || "4aep"}
                    onChange={(e) =>
                      setLessonForm({
                        ...lessonForm,
                        level: e.target.value as ExplicitLevelKey,
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-bold"
                  >
                    <option value="1aep">الأول ابتدائي (1AEP)</option>
                    <option value="2aep">الثاني ابتدائي (2AEP)</option>
                    <option value="3aep">الثالث ابتدائي (3AEP)</option>
                    <option value="4aep">الرابع ابتدائي (4AEP)</option>
                    <option value="5aep">الخامس ابتدائي (5AEP)</option>
                    <option value="6aep">السادس ابتدائي (6AEP)</option>
                    <option value="shared">الأقسام المشتركة</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1">المادة *</label>
                  <select
                    value={lessonForm.subject || "arabic"}
                    onChange={(e) =>
                      setLessonForm({
                        ...lessonForm,
                        subject: e.target.value as ExplicitSubjectKey,
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-bold"
                  >
                    <option value="arabic">اللغة العربية</option>
                    <option value="french">الفرنسية (Français)</option>
                    <option value="math">الرياضيات</option>
                    <option value="science">النشاط العلمي</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold mb-1">الوحدة</label>
                    <input
                      type="number"
                      min={1}
                      max={6}
                      value={lessonForm.unit || 1}
                      onChange={(e) =>
                        setLessonForm({ ...lessonForm, unit: Number(e.target.value) })
                      }
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">الأسبوع</label>
                    <input
                      type="number"
                      min={1}
                      max={5}
                      value={lessonForm.week || 1}
                      onChange={(e) =>
                        setLessonForm({ ...lessonForm, week: Number(e.target.value) })
                      }
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">عنوان الدرس بالعربية *</label>
                <input
                  type="text"
                  value={lessonForm.title || ""}
                  onChange={(e) =>
                    setLessonForm({ ...lessonForm, title: e.target.value })
                  }
                  placeholder="مثال: القراءة الصريحة: استراتيجيات المفردات"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold"
                  required
                />
              </div>

              <div>
                <label className="block font-bold mb-1">
                  عنوان الدرس بالفرنسية (اختياري)
                </label>
                <input
                  type="text"
                  value={lessonForm.titleFr || ""}
                  onChange={(e) =>
                    setLessonForm({ ...lessonForm, titleFr: e.target.value })
                  }
                  placeholder="ex: Lecture explicite: Stratégies de vocabulaire"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">الهدف التعلمي المصرح به *</label>
                <textarea
                  rows={2}
                  value={lessonForm.objective || ""}
                  onChange={(e) =>
                    setLessonForm({ ...lessonForm, objective: e.target.value })
                  }
                  placeholder="أن يوظف المتعلم استراتيجية..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5"
                  required
                />
              </div>

              <div className="border-t border-slate-200 pt-3 space-y-3">
                <span className="font-black text-slate-900 block">
                  خطوات وسيناريو التدريس الصريح (5 مراحل):
                </span>

                <div>
                  <label className="block font-bold text-amber-900 mb-1">
                    1. التهيئة والربط (Ouverture):
                  </label>
                  <textarea
                    rows={2}
                    value={lessonForm.steps?.preparation || ""}
                    onChange={(e) =>
                      setLessonForm({
                        ...lessonForm,
                        steps: { ...lessonForm.steps!, preparation: e.target.value },
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2"
                  />
                </div>

                <div>
                  <label className="block font-bold text-blue-900 mb-1">
                    2. النمذجة (Modelage - «أنا أعمل»):
                  </label>
                  <textarea
                    rows={2}
                    value={lessonForm.steps?.modeling || ""}
                    onChange={(e) =>
                      setLessonForm({
                        ...lessonForm,
                        steps: { ...lessonForm.steps!, modeling: e.target.value },
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2"
                  />
                </div>

                <div>
                  <label className="block font-bold text-emerald-900 mb-1">
                    3. الممارسة الموجهة (Pratique guidée - «نحن نعمل معاً»):
                  </label>
                  <textarea
                    rows={2}
                    value={lessonForm.steps?.guided || ""}
                    onChange={(e) =>
                      setLessonForm({
                        ...lessonForm,
                        steps: { ...lessonForm.steps!, guided: e.target.value },
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2"
                  />
                </div>

                <div>
                  <label className="block font-bold text-indigo-900 mb-1">
                    4. الممارسة المستقلة (Pratique autonome - «أنت تعمل بمفردك»):
                  </label>
                  <textarea
                    rows={2}
                    value={lessonForm.steps?.autonomous || ""}
                    onChange={(e) =>
                      setLessonForm({
                        ...lessonForm,
                        steps: { ...lessonForm.steps!, autonomous: e.target.value },
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2"
                  />
                </div>

                <div>
                  <label className="block font-bold text-rose-900 mb-1">
                    5. التقويم والتغذية الراجعة (Objectivation / Bilan):
                  </label>
                  <textarea
                    rows={2}
                    value={lessonForm.steps?.evaluation || ""}
                    onChange={(e) =>
                      setLessonForm({
                        ...lessonForm,
                        steps: { ...lessonForm.steps!, evaluation: e.target.value },
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-slate-200 pt-3">
                <div>
                  <label className="block font-bold mb-1">
                    رابط تحميل ملف العرض (Google Drive / PPTX)
                  </label>
                  <input
                    type="url"
                    value={lessonForm.pptUrl || ""}
                    onChange={(e) =>
                      setLessonForm({ ...lessonForm, pptUrl: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">
                    المفاهيم المفتاحية (مفصولة بفواصل)
                  </label>
                  <input
                    type="text"
                    value={
                      Array.isArray(lessonForm.keyConcepts)
                        ? lessonForm.keyConcepts.join(", ")
                        : lessonForm.keyConcepts || ""
                    }
                    onChange={(e) =>
                      setLessonForm({
                        ...lessonForm,
                        keyConcepts: e.target.value.split(",").map((s) => s.trim()),
                      })
                    }
                    placeholder="مثال: خريطة الكلمة, المرادف, الضد"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingLesson(null);
                    setIsAddingNewLesson(false);
                  }}
                  className="px-4 py-2 bg-slate-200 text-slate-800 font-bold rounded-xl cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl cursor-pointer"
                >
                  حفظ الدرس
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: EDIT PACKAGE LINKS (ADMIN)                       */}
      {/* ========================================================= */}
      {editingPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div
            className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden"
            dir="rtl"
          >
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <h3 className="text-base font-black">
                تعديل روابط حقيبة {editingPackage.levelNameAr}
              </h3>
              <button
                type="button"
                onClick={() => setEditingPackage(null)}
                className="text-white/70 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePackage} className="p-5 space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">
                  رابط عروض اللغة العربية (Google Drive):
                </label>
                <input
                  type="url"
                  value={editingPackage.arabicDriveUrl}
                  onChange={(e) =>
                    setEditingPackage({
                      ...editingPackage,
                      arabicDriveUrl: e.target.value,
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-mono"
                  dir="ltr"
                  required
                />
              </div>

              <div>
                <label className="block font-bold mb-1">
                  رابط عروض اللغة الفرنسية (Google Drive):
                </label>
                <input
                  type="url"
                  value={editingPackage.frenchDriveUrl}
                  onChange={(e) =>
                    setEditingPackage({
                      ...editingPackage,
                      frenchDriveUrl: e.target.value,
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-mono"
                  dir="ltr"
                  required
                />
              </div>

              <div>
                <label className="block font-bold mb-1">
                  رابط عروض الرياضيات (Google Drive):
                </label>
                <input
                  type="url"
                  value={editingPackage.mathDriveUrl}
                  onChange={(e) =>
                    setEditingPackage({
                      ...editingPackage,
                      mathDriveUrl: e.target.value,
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-mono"
                  dir="ltr"
                  required
                />
              </div>

              <div>
                <label className="block font-bold mb-1">
                  رابط عروض النشاط العلمي (Google Drive):
                </label>
                <input
                  type="url"
                  value={editingPackage.scienceDriveUrl}
                  onChange={(e) =>
                    setEditingPackage({
                      ...editingPackage,
                      scienceDriveUrl: e.target.value,
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-mono"
                  dir="ltr"
                  required
                />
              </div>

              <div>
                <label className="block font-bold mb-1">
                  رابط المجلد العام للكراسات والدلائل:
                </label>
                <input
                  type="url"
                  value={editingPackage.studentBookletUrl}
                  onChange={(e) =>
                    setEditingPackage({
                      ...editingPackage,
                      studentBookletUrl: e.target.value,
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-mono"
                  dir="ltr"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingPackage(null)}
                  className="px-4 py-2 bg-slate-200 text-slate-800 font-bold rounded-xl cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl cursor-pointer"
                >
                  حفظ التعديلات
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 4: EDIT HEADER (ADMIN)                              */}
      {/* ========================================================= */}
      {isEditingHeader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div
            className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden"
            dir="rtl"
          >
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <h3 className="text-base font-black">تعديل ترويسة صفحة التعليم الصريح</h3>
              <button
                type="button"
                onClick={() => setIsEditingHeader(false)}
                className="text-white/70 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveHeader} className="p-5 space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">عنوان الصفحة الرئيسي:</label>
                <input
                  type="text"
                  value={headerForm.pageTitle}
                  onChange={(e) =>
                    setHeaderForm({ ...headerForm, pageTitle: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-bold"
                  required
                />
              </div>

              <div>
                <label className="block font-bold mb-1">الوصف الفرعي:</label>
                <textarea
                  rows={3}
                  value={headerForm.pageSubtitle}
                  onChange={(e) =>
                    setHeaderForm({ ...headerForm, pageSubtitle: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2"
                  required
                />
              </div>

              <div>
                <label className="block font-bold mb-1">نص الشارة العلوية:</label>
                <input
                  type="text"
                  value={headerForm.badgeText}
                  onChange={(e) =>
                    setHeaderForm({ ...headerForm, badgeText: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">رابط المجلد الرسمي في Google Drive:</label>
                <input
                  type="url"
                  value={headerForm.officialUrl}
                  onChange={(e) =>
                    setHeaderForm({ ...headerForm, officialUrl: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-mono"
                  dir="ltr"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditingHeader(false)}
                  className="px-4 py-2 bg-slate-200 text-slate-800 font-bold rounded-xl cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl cursor-pointer"
                >
                  حفظ الترويسة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
