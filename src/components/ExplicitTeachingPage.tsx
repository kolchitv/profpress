import React, { useState, useEffect } from "react";
import {
  Sparkles,
  BookOpen,
  Download,
  ExternalLink,
  FileText,
  CheckCircle2,
  User,
  Users,
  Award,
  Presentation,
  Search,
  Plus,
  Edit3,
  Trash2,
  RotateCcw,
  X,
  ChevronRight,
  FolderDown,
  Layers,
  ShieldCheck,
  Eye,
  FlaskConical,
  Laptop,
  Lightbulb,
  Network,
  ClipboardList,
  BookMarked,
  Compass,
} from "lucide-react";
import { TabKey, AdminSession } from "../types";
import {
  ExplicitTeachingPageData,
  ExplicitLessonItem,
  ExplicitTeachingResourcePackage,
  ExplicitLevelKey,
  ExplicitSubjectKey,
  DEFAULT_EXPLICIT_TEACHING_DATA,
  MAIN_EXPLICIT_DRIVE_FOLDER_ID,
  MAIN_EXPLICIT_DRIVE_URL,
  TELMIDTICE_PIONEER_EXE_URL,
  extractDriveFolderId,
} from "../data/explicitTeachingData";
import {
  getStoredAdminSession,
  canUserDeleteArticles,
  ADMIN_SESSION_EVENT,
} from "../utils/adminAuth";

const STORAGE_KEY = "profpress_explicit_teaching_data_v2";

interface ExplicitTeachingPageProps {
  onNavigateToTab?: (tab: TabKey) => void;
}

interface DrivePreviewState {
  title: string;
  folderId: string;
  driveUrl: string;
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

  // Load state from localStorage (v2) or default 2026/2027 dataset
  const [pageData, setPageData] = useState<ExplicitTeachingPageData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.dataVersion === 2) {
          return {
            ...DEFAULT_EXPLICIT_TEACHING_DATA,
            ...parsed,
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
  const [searchQuery, setSearchQuery] = useState("");

  // Modal states
  const [viewingLesson, setViewingLesson] = useState<ExplicitLessonItem | null>(null);
  const [editingLesson, setEditingLesson] = useState<ExplicitLessonItem | null>(null);
  const [isAddingNewLesson, setIsAddingNewLesson] = useState(false);
  const [editingPackage, setEditingPackage] =
    useState<ExplicitTeachingResourcePackage | null>(null);
  const [isEditingHeader, setIsEditingHeader] = useState(false);
  const [drivePreview, setDrivePreview] = useState<DrivePreviewState | null>(null);

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
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchObjective = item.objective.toLowerCase().includes(q);
      const matchConcepts = item.keyConcepts?.some((c) => c.toLowerCase().includes(q));
      if (!matchTitle && !matchObjective && !matchConcepts) return false;
    }
    return true;
  });

  // Open inline Google Drive folder preview
  const handleOpenDrivePreview = (title: string, url?: string, fallbackId?: string) => {
    const folderId =
      extractDriveFolderId(url) || fallbackId || MAIN_EXPLICIT_DRIVE_FOLDER_ID;
    setDrivePreview({
      title,
      folderId,
      driveUrl: url || `https://drive.google.com/drive/folders/${folderId}`,
    });
  };

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

  // Open add new lesson
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
      pptUrl: pageData.officialUrl || MAIN_EXPLICIT_DRIVE_URL,
      pdfUrl: pageData.officialUrl || MAIN_EXPLICIT_DRIVE_URL,
      driveUrl: pageData.officialUrl || MAIN_EXPLICIT_DRIVE_URL,
      fileSize: "4.5 MB (PPTX)",
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
      pptUrl: lessonForm.pptUrl,
      pdfUrl: lessonForm.pdfUrl,
      driveUrl: lessonForm.driveUrl,
      fileSize: lessonForm.fileSize || "4.5 MB",
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
                <a
                  href={pageData.officialUrl || MAIN_EXPLICIT_DRIVE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition flex items-center gap-2 whitespace-nowrap shrink-0"
                >
                  <FolderDown className="w-4 h-4" />
                  <span>تحميل مباشر من Google Drive (2026/2027)</span>
                </a>

                <button
                  type="button"
                  onClick={() =>
                    handleOpenDrivePreview(
                      "مجلد دروس التعليم الصريح للمدارس الرائدة 2026 / 2027",
                      pageData.officialUrl,
                      pageData.officialFolderId
                    )
                  }
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Eye className="w-4 h-4 text-sky-300" />
                  <span>معاينة المجلد مباشرة</span>
                </button>

                <a
                  href={pageData.telmidticeAppUrl || TELMIDTICE_PIONEER_EXE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-indigo-600/80 hover:bg-indigo-600 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition flex items-center gap-2 whitespace-nowrap shrink-0"
                >
                  <Laptop className="w-4 h-4" />
                  <span>برنامج TelmidTice ({pageData.telmidticeVersion || "v1.0.9"})</span>
                </a>
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
                    7 مسارات · 4 مواد أساسية
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
                  <span className="text-slate-300">صيغة الشرائح:</span>
                  <span className="font-bold text-sky-300">PPTX / PPSX (للمسلاط)</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-slate-300">تطبيق الحاسوب الرسمي:</span>
                  <span className="font-bold text-indigo-200">
                    TelmidTice {pageData.telmidticeVersion || "v1.0.9"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 mt-8 space-y-10">
        {/* ========================================================= */}
        {/* 1. SUBJECT REPOSITORIES (4 CORE SUBJECTS) & TELMIDTICE    */}
        {/* ========================================================= */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                تحميل دروس التعليم الصريح مباشرة حسب المادة (Google Drive 2026 / 2027)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                اختر المادة للوصول الفوري إلى مجلدات المستويات الستة والأقسام المشتركة بصيغتي PPTX و PPSX
              </p>
            </div>
            <span className="text-xs text-slate-500 whitespace-nowrap">
              {pageData.lastUpdatedText || "موسم 2026 / 2027"} · تحديث مستمر
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pageData.subjectFolders.map((sub) => {
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
                      <span className="text-xs text-slate-500 font-medium">
                        {sub.levelsCovered}
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
                    <a
                      href={sub.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 whitespace-nowrap ${theme.btn}`}
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>فتح المجلد</span>
                    </a>
                    <button
                      type="button"
                      onClick={() =>
                        handleOpenDrivePreview(
                          `مجلد دروس ${sub.nameAr} (${sub.levelsCovered})`,
                          sub.driveUrl,
                          sub.folderId
                        )
                      }
                      className="py-2 px-3 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
                      title="معاينة الملفات داخل الصفحة"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>معاينة</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* TelmidTice Official App + Quick Integrated Tools Strip */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
            <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="text-xs font-semibold text-indigo-700">
                  برنامج وزارة التربية الوطنية الرسمي · {pageData.telmidticeVersion || "v1.0.9"}
                </div>
                <h3 className="text-base font-black text-slate-900">
                  تحميل دروس التعليم الصريح بواسطة برنامج TelmidTice لمؤسسات الريادة
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                  يتيح تطبيق سطح المكتب الرسمي TelmidTice Écoles Pionnières تحميل وتصفح الحوامل الديداكتيكية الرسمية لجميع المستويات والأسلاك مع إمكانية الاشتغال بدون إنترنت داخل القسم.
                </p>
              </div>
              <a
                href={pageData.telmidticeAppUrl || TELMIDTICE_PIONEER_EXE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
              >
                <Laptop className="w-4 h-4 text-emerald-400" />
                <span>تحميل تطبيق TelmidTice (.exe)</span>
              </a>
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
                  onClick={() => onNavigateToTab?.("positioning_grids")}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <FileText className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">شبكات التتبع</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. LEVEL RESOURCE PACKAGES (1AEP -> 6AEP + SHARED)        */}
        {/* ========================================================= */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                <FolderDown className="w-5 h-5 text-indigo-600 shrink-0" />
                <span>حقائب دروس التعليم الصريح حسب المستويات والأقسام المشتركة</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                روابط مباشرة ومعاينة فورية لمجلدات كل مستوى دراسي في المواد الأربع المعتمدة
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pageData.packages.map((pkg) => {
              const subjectRows = [
                {
                  key: "arabic",
                  label: "اللغة العربية (PPTX)",
                  url: pkg.arabicDriveUrl,
                  rowClass: "bg-emerald-50/70 hover:bg-emerald-100/80 text-emerald-900 border-emerald-200",
                },
                {
                  key: "french",
                  label: "اللغة الفرنسية · Français",
                  url: pkg.frenchDriveUrl,
                  rowClass: "bg-blue-50/70 hover:bg-blue-100/80 text-blue-900 border-blue-200",
                },
                {
                  key: "math",
                  label: "الرياضيات (PPTX)",
                  url: pkg.mathDriveUrl,
                  rowClass: "bg-amber-50/70 hover:bg-amber-100/80 text-amber-900 border-amber-200",
                },
                {
                  key: "science",
                  label: "النشاط العلمي (NE_ES)",
                  url: pkg.scienceDriveUrl,
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
                          <span className="tabular-nums">{pkg.totalPptCount} عرض تفاعلي</span>
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
                          <span>تعديل الروابط</span>
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
                          <a
                            href={row.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 font-bold flex-1 min-w-0"
                          >
                            <Download className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{row.label}</span>
                          </a>
                          <button
                            type="button"
                            onClick={() =>
                              handleOpenDrivePreview(
                                `${pkg.levelNameAr} · ${row.label}`,
                                row.url
                              )
                            }
                            className="p-1.5 rounded-lg bg-white/80 hover:bg-white text-slate-700 transition cursor-pointer shrink-0"
                            title="معاينة المجلد"
                            aria-label={`معاينة ${row.label}`}
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <a
                      href={pkg.studentBookletUrl || MAIN_EXPLICIT_DRIVE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-indigo-700 font-medium flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      <span>المجلد العام للكراسات والدلائل</span>
                    </a>
                    <span>PPTX · PPSX</span>
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
        <section className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                <Presentation className="w-5 h-5 text-indigo-600 shrink-0" />
                <span>بنك جذاذات وسيناريوهات دروس التعليم الصريح</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                نماذج عملية مفصلة للخطوات الخمس في المواد الأربع والمستويات الستة والأقسام المشتركة
              </p>
            </div>

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
                        <span>سيناريو الدرس</span>
                      </button>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {lesson.pptUrl && (
                          <button
                            type="button"
                            onClick={() =>
                              handleOpenDrivePreview(lesson.title, lesson.pptUrl)
                            }
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-100 hover:text-indigo-700 text-slate-600 transition cursor-pointer"
                            title="معاينة مجلد العروض التقديمية"
                          >
                            <Presentation className="w-4 h-4" />
                          </button>
                        )}
                        {lesson.pptUrl && (
                          <a
                            href={lesson.pptUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-emerald-100 hover:text-emerald-700 text-slate-600 transition"
                            title="فتح رابط التحميل على Google Drive"
                          >
                            <Download className="w-4 h-4" />
                          </a>
                        )}

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
                روابط الوصول السريع للموسم الدراسي
              </div>
              <a
                href={pageData.officialUrl || MAIN_EXPLICIT_DRIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <FolderDown className="w-4 h-4" />
                <span>المجلد الرئيسي للدروس الجديدة</span>
              </a>
              <a
                href={pageData.telmidticeAppUrl || TELMIDTICE_PIONEER_EXE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <Laptop className="w-4 h-4 text-indigo-600" />
                <span>تنزيل تطبيق TelmidTice v1.0.9</span>
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* ========================================================= */}
      {/* MODAL 0: INTERACTIVE GOOGLE DRIVE FOLDER PREVIEW          */}
      {/* ========================================================= */}
      {drivePreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div
            className="bg-white rounded-3xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
            dir="rtl"
          >
            <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="text-[11px] text-sky-300 font-semibold">
                  معاينة مباشرة لمحتويات Google Drive
                </div>
                <h3 className="text-sm sm:text-base font-black text-white truncate">
                  {drivePreview.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={drivePreview.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>فتح في Google Drive</span>
                </a>
                <button
                  type="button"
                  onClick={() => setDrivePreview(null)}
                  className="text-white/70 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition cursor-pointer"
                  aria-label="إغلاق المعاينة"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-slate-100 relative">
              <iframe
                title={drivePreview.title}
                src={`https://drive.google.com/embeddedfolderview?id=${drivePreview.folderId}#grid`}
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 1: VIEW LESSON SCRIPT (5 EXPLICIT STEPS)             */}
      {/* ========================================================= */}
      {viewingLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div
            className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
            dir="rtl"
          >
            <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-5 flex items-start justify-between gap-4">
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

            <div className="p-6 overflow-y-auto space-y-5 text-slate-800">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                <div className="text-xs font-black text-blue-950 mb-1 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>الهدف التعلمي المصرح به (Objectif d'apprentissage)</span>
                </div>
                <p className="text-xs sm:text-sm text-blue-900 leading-relaxed font-medium">
                  {viewingLesson.objective}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-900">
                  مراحل وسيناريو التدريس الصريح للحصة
                </h4>

                <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-1 text-xs font-black text-amber-900">
                    <span className="w-5 h-5 rounded-md bg-amber-600 text-white flex items-center justify-center text-[10px]">
                      1
                    </span>
                    <span>التهيئة والربط (Ouverture / Rappel)</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed pr-7">
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
                  <p className="text-xs text-slate-700 leading-relaxed pr-7">
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
                  <p className="text-xs text-slate-700 leading-relaxed pr-7">
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
                  <p className="text-xs text-slate-700 leading-relaxed pr-7">
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
                  <p className="text-xs text-slate-700 leading-relaxed pr-7">
                    {viewingLesson.steps.evaluation ||
                      "سؤال تحقق نهائي ومراجعة ما تم تعلمه قبل الانتقال للمهمة الموالية."}
                  </p>
                </div>
              </div>

              {viewingLesson.keyConcepts && viewingLesson.keyConcepts.length > 0 && (
                <div className="pt-2 border-t border-slate-100 text-xs text-slate-600">
                  <span className="font-bold text-slate-800 ml-2">المفاهيم المفتاحية:</span>
                  <span>{viewingLesson.keyConcepts.join(" · ")}</span>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-500 font-medium">
                حجم الملف التقديمي: {viewingLesson.fileSize || "4.5 MB"}
              </div>

              <div className="flex items-center gap-2">
                {viewingLesson.pptUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      const url = viewingLesson.pptUrl;
                      const title = viewingLesson.title;
                      setViewingLesson(null);
                      handleOpenDrivePreview(title, url);
                    }}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3.5 py-2 rounded-xl text-xs transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>معاينة المجلد</span>
                  </button>
                )}

                {viewingLesson.pptUrl && (
                  <a
                    href={viewingLesson.pptUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>فتح مجلد التحميل (PPTX)</span>
                  </a>
                )}

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
