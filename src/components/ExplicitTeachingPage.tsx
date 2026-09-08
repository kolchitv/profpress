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
  Filter,
  Plus,
  Edit3,
  Trash2,
  RotateCcw,
  X,
  ChevronRight,
  FolderDown,
  Layers,
  ArrowRight,
  Clock,
  Tag,
  ShieldCheck,
  GraduationCap,
  Eye,
} from "lucide-react";
import { TabKey, AdminSession } from "../types";
import {
  ExplicitTeachingPageData,
  ExplicitLessonItem,
  ExplicitTeachingResourcePackage,
  DEFAULT_EXPLICIT_TEACHING_DATA,
} from "../data/explicitTeachingData";
import {
  getStoredAdminSession,
  canUserDeleteArticles,
  ADMIN_SESSION_EVENT,
} from "../utils/adminAuth";

const STORAGE_KEY = "profpress_explicit_teaching_data";

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

  // Load state from localStorage or default
  const [pageData, setPageData] = useState<ExplicitTeachingPageData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load explicit teaching data from storage", e);
    }
    return DEFAULT_EXPLICIT_TEACHING_DATA;
  });

  // Save to localStorage whenever modified
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
  const [editingPackage, setEditingPackage] = useState<ExplicitTeachingResourcePackage | null>(null);
  const [isEditingHeader, setIsEditingHeader] = useState(false);

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

  // Reset to default data
  const handleResetToDefault = () => {
    if (window.confirm("هل أنت متأكد من استعادة البيانات الافتراضية لدروس التعليم الصريح؟")) {
      setPageData(DEFAULT_EXPLICIT_TEACHING_DATA);
      localStorage.removeItem(STORAGE_KEY);
      alert("تمت استعادة البيانات الافتراضية بنجاح.");
    }
  };

  // Open edit lesson
  const handleOpenEditLesson = (lesson: ExplicitLessonItem) => {
    setLessonForm({ ...lesson });
    setEditingLesson(lesson);
  };

  // Open add new lesson
  const handleOpenAddLesson = () => {
    setLessonForm({
      id: "les_" + Date.now(),
      level: selectedLevel !== "all" ? (selectedLevel as any) : "4aep",
      subject: selectedSubject !== "all" ? (selectedSubject as any) : "arabic",
      unit: 1,
      week: 1,
      title: "",
      titleFr: "",
      objective: "",
      pptUrl: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%B5%D8%B1%D9%8A%D8%AD",
      pdfUrl: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%B5%D8%B1%D9%8A%D8%AD",
      driveUrl: "https://drive.google.com",
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
    if (!lessonForm.title || !lessonForm.objective) {
      alert("يرجى ملء عنوان الدرس والهدف التعلمي.");
      return;
    }

    const newLesson: ExplicitLessonItem = {
      id: lessonForm.id || "les_" + Date.now(),
      level: lessonForm.level || "4aep",
      subject: lessonForm.subject || "arabic",
      unit: Number(lessonForm.unit) || 1,
      week: Number(lessonForm.week) || 1,
      title: lessonForm.title || "",
      titleFr: lessonForm.titleFr,
      objective: lessonForm.objective || "",
      pptUrl: lessonForm.pptUrl,
      pdfUrl: lessonForm.pdfUrl,
      driveUrl: lessonForm.driveUrl,
      fileSize: lessonForm.fileSize || "4.2 MB",
      durationMinutes: Number(lessonForm.durationMinutes) || 45,
      keyConcepts: Array.isArray(lessonForm.keyConcepts)
        ? lessonForm.keyConcepts
        : (lessonForm.keyConcepts as any)?.split?.(",").map((s: string) => s.trim()).filter(Boolean) || [],
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
      packages: prev.packages.map((pkg) => (pkg.id === editingPackage.id ? editingPackage : pkg)),
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

  const levelNames: Record<string, string> = {
    "1aep": "الأول ابتدائي (1AEP)",
    "2aep": "الثاني ابتدائي (2AEP)",
    "3aep": "الثالث ابتدائي (3AEP)",
    "4aep": "الرابع ابتدائي (4AEP)",
    "5aep": "الخامس ابتدائي (5AEP)",
    "6aep": "السادس ابتدائي (6AEP)",
  };

  const subjectNames: Record<string, { ar: string; fr: string; color: string }> = {
    arabic: { ar: "اللغة العربية", fr: "Arabe", color: "bg-emerald-100 text-emerald-800 border-emerald-300" },
    french: { ar: "Français", fr: "الفرنسية", color: "bg-blue-100 text-blue-800 border-blue-300" },
    math: { ar: "الرياضيات", fr: "Maths", color: "bg-amber-100 text-amber-900 border-amber-300" },
  };

  return (
    <div className="min-h-screen bg-slate-100/60 pb-20 font-sans" dir="rtl">
      {/* Top Admin Controls Bar */}
      {canEdit && (
        <div className="bg-slate-900 text-white px-4 py-2 text-xs border-b border-slate-800 sticky top-14 z-30 shadow-md">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-bold">وضع إدارة صفحة التعليم الصريح (مدير المنصة)</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAdminEditMode(!isAdminEditMode)}
                className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  isAdminEditMode ? "bg-amber-500 text-slate-950 shadow-xs" : "bg-slate-800 hover:bg-slate-700 text-white"
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
                    className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition cursor-pointer"
                  >
                    تعديل الترويسة
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenAddLesson}
                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>إضافة درس صريح</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetToDefault}
                    className="px-2.5 py-1 bg-rose-700 hover:bg-rose-600 text-white font-bold rounded-lg transition cursor-pointer flex items-center gap-1"
                    title="استعادة البيانات الأصلية"
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
            onClick={() => onNavigateToTab?.("home")}
            className="hover:text-blue-700 transition font-medium cursor-pointer"
          >
            الرئيسية
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 rotate-180" />
          <span className="font-medium text-slate-600">التعليم الابتدائي</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 rotate-180" />
          <span className="font-bold text-blue-700">دروس وموارد التعليم الصريح (Enseignement Explicite)</span>
        </div>
      </div>

      {/* Hero Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 text-white py-10 px-4 shadow-md">
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/40 text-indigo-200 px-3.5 py-1 rounded-full text-xs font-black tracking-wide mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{pageData.badgeText}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight mb-3">
                {pageData.pageTitle}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {pageData.pageSubtitle}
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-5">
                <a
                  href={pageData.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm transition flex items-center gap-1.5 shadow-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>تصفح المقال الأصلي على بروف بريس</span>
                </a>

                <span className="text-slate-400 text-xs flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
                  <Presentation className="w-4 h-4 text-emerald-400" />
                  <span>عروض مسلاط ضوئي PPTX جاهزة للتقديم المباشر</span>
                </span>
              </div>
            </div>

            {/* Quick Badge / Stats Card */}
            <div className="bg-white/10 border border-white/15 backdrop-blur-md rounded-2xl p-5 shrink-0 md:w-72">
              <div className="flex items-center gap-3 mb-3 pb-3 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-black">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-300">مجموع الدروس والملفات</div>
                  <div className="text-xl font-black text-white">{pageData.lessons.length} دروس نموذجية + 6 حقائب</div>
                </div>
              </div>
              <div className="text-xs text-slate-300 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span>المستويات المغطاة:</span>
                  <span className="font-bold text-emerald-400">1AEP إلى 6AEP</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>المواد الأساسية:</span>
                  <span className="font-bold text-amber-300">العربية • الفرنسية • الرياضيات</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>صيغة التحميل:</span>
                  <span className="font-bold text-sky-300">PPTX & PDF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 space-y-8">
        {/* ========================================================= */}
        {/* PEDAGOGICAL FRAMEWORK (THE 5 STEPS OF EXPLICIT TEACHING)   */}
        {/* ========================================================= */}
        <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="mb-5 pb-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-5 bg-indigo-600 rounded-full"></span>
                <h2 className="text-lg font-black text-slate-900">
                  {pageData.introduction.title}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
                {pageData.introduction.description}
              </p>
            </div>
            <div className="text-xs font-bold bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-xl border border-indigo-200 self-start shrink-0">
              مدارس الريادة • الإطار المرجعي
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {pageData.introduction.steps.map((step) => {
              const colorClasses: Record<string, { card: string; badge: string; border: string }> = {
                amber: { card: "bg-amber-50/50 hover:bg-amber-50", badge: "bg-amber-500 text-white", border: "border-amber-200" },
                blue: { card: "bg-blue-50/50 hover:bg-blue-50", badge: "bg-blue-600 text-white", border: "border-blue-200" },
                emerald: { card: "bg-emerald-50/50 hover:bg-emerald-50", badge: "bg-emerald-600 text-white", border: "border-emerald-200" },
                indigo: { card: "bg-indigo-50/50 hover:bg-indigo-50", badge: "bg-indigo-600 text-white", border: "border-indigo-200" },
                rose: { card: "bg-rose-50/50 hover:bg-rose-50", badge: "bg-rose-600 text-white", border: "border-rose-200" },
              };
              const theme = colorClasses[step.color] || colorClasses.blue;

              return (
                <div
                  key={step.number}
                  className={`rounded-xl p-4 border transition duration-200 flex flex-col justify-between ${theme.card} ${theme.border}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shadow-xs ${theme.badge}`}>
                        0{step.number}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400 font-mono" dir="ltr">
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
        </section>

        {/* ========================================================= */}
        {/* LEVEL RESOURCE PACKAGES (GOOGLE DRIVE & BOOKLETS)         */}
        {/* ========================================================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <FolderDown className="w-5 h-5 text-indigo-600" />
                <span>حقائب ومستلزمات التعليم الصريح حسب المستويات (Google Drive)</span>
              </h2>
              <p className="text-xs text-slate-500">
                روابط التحميل المباشرة لكافة كراسات التلميذ وعروض PPT ودلائل الأستاذ المعتمدة
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pageData.packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-indigo-400 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full inline-block mb-1">
                        {pkg.levelNameFr}
                      </span>
                      <h3 className="text-base font-black text-slate-900">
                        {pkg.levelNameAr}
                      </h3>
                    </div>
                    <span className="text-xs font-black bg-slate-100 text-slate-700 px-2 py-1 rounded-lg border border-slate-200 shrink-0">
                      {pkg.totalPptCount} عرض PPT
                    </span>
                  </div>

                  <div className="space-y-2 text-xs mb-4">
                    <a
                      href={pkg.arabicDriveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded-xl bg-emerald-50/70 hover:bg-emerald-100 text-emerald-900 transition border border-emerald-200 font-bold"
                    >
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                        <span>عروض اللغة العربية (PPT)</span>
                      </span>
                      <Download className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={pkg.frenchDriveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded-xl bg-blue-50/70 hover:bg-blue-100 text-blue-900 transition border border-blue-200 font-bold"
                    >
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                        <span>Présentations Français (PPT)</span>
                      </span>
                      <Download className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={pkg.mathDriveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded-xl bg-amber-50/70 hover:bg-amber-100 text-amber-900 transition border border-amber-200 font-bold"
                    >
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                        <span>عروض الرياضيات (PPT)</span>
                      </span>
                      <Download className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <a
                    href={pkg.studentBookletUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-indigo-700 font-medium flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span>كراسة التلميذ والدلائل</span>
                  </a>

                  {isAdminEditMode && (
                    <button
                      type="button"
                      onClick={() => setEditingPackage({ ...pkg })}
                      className="text-indigo-600 hover:text-indigo-800 font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>تعديل الروابط</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* INTERACTIVE LESSONS EXPLORER                              */}
        {/* ========================================================= */}
        <section className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Presentation className="w-5 h-5 text-indigo-600" />
                <span>بنك جذاذات وسيناريوهات دروس التعليم الصريح</span>
              </h2>
              <p className="text-xs text-slate-500">
                استعراض الخطوات التفصيلية للتدريس الصريح، أهداف التعلم، وروابط تحميل العروض التقديمية
              </p>
            </div>

            {isAdminEditMode && (
              <button
                type="button"
                onClick={handleOpenAddLesson}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-xs cursor-pointer self-start"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة درس صريح جديد</span>
              </button>
            )}
          </div>

          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Level Selector */}
            <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              <button
                type="button"
                onClick={() => setSelectedLevel("all")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
                  selectedLevel === "all"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                جميع المستويات
              </button>
              {["1aep", "2aep", "3aep", "4aep", "5aep", "6aep"].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
                    selectedLevel === lvl
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {lvl.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Subject Selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              <button
                type="button"
                onClick={() => setSelectedSubject("all")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
                  selectedSubject === "all"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                كل المواد
              </button>
              <button
                type="button"
                onClick={() => setSelectedSubject("arabic")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
                  selectedSubject === "arabic"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                العربية
              </button>
              <button
                type="button"
                onClick={() => setSelectedSubject("french")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
                  selectedSubject === "french"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                الفرنسية (Français)
              </button>
              <button
                type="button"
                onClick={() => setSelectedSubject("math")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
                  selectedSubject === "math"
                    ? "bg-amber-600 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                الرياضيات
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="بحث في الدروس والمفاهيم..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-9 pl-3 py-1.5 text-xs text-slate-800 outline-hidden focus:border-indigo-500 focus:bg-white transition"
              />
            </div>
          </div>

          {/* Lessons List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLessons.length === 0 ? (
              <div className="col-span-full bg-white rounded-2xl p-10 text-center border border-slate-200">
                <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h4 className="text-slate-700 font-bold text-sm">لم يتم العثور على دروس مطابقة</h4>
                <p className="text-xs text-slate-400 mt-1">
                  جرب تغيير خيارات التصفية أو مسح عبارة البحث
                </p>
              </div>
            ) : (
              filteredLessons.map((lesson) => {
                const subMeta = subjectNames[lesson.subject] || subjectNames.arabic;
                return (
                  <div
                    key={lesson.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${subMeta.color}`}>
                          {subMeta.ar}
                        </span>

                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                          <span className="bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                            {lesson.level.toUpperCase()}
                          </span>
                          <span className="text-slate-400">•</span>
                          <span>الوحدة {lesson.unit}</span>
                          <span className="text-slate-400">•</span>
                          <span>أسبوع {lesson.week}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-black text-slate-900 text-sm mb-2 group-hover:text-indigo-600 transition leading-snug">
                        {lesson.title}
                      </h3>

                      {/* Objective */}
                      <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-2">
                        <span className="font-bold text-slate-800">الهدف: </span>
                        {lesson.objective}
                      </p>

                      {/* Key concepts */}
                      {lesson.keyConcepts && lesson.keyConcepts.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {lesson.keyConcepts.slice(0, 3).map((concept, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-medium bg-slate-50 text-slate-600 border border-slate-200 px-2 py-0.5 rounded-md"
                            >
                              #{concept}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <button
                        type="button"
                        onClick={() => setViewingLesson(lesson)}
                        className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>سيناريو الدرس (5 مراحل)</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        {lesson.pptUrl && (
                          <a
                            href={lesson.pptUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-emerald-100 hover:text-emerald-700 text-slate-600 transition"
                            title="تحميل عرض الباوربوينت PPT"
                          >
                            <Presentation className="w-4 h-4" />
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
      </div>

      {/* ========================================================= */}
      {/* MODAL 1: VIEW LESSON SCRIPT (5 EXPLICIT STEPS)             */}
      {/* ========================================================= */}
      {viewingLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div
            className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
            dir="rtl"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-5 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-indigo-500/30 text-indigo-200 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-indigo-400/30">
                    {viewingLesson.level.toUpperCase()} • الوحدة {viewingLesson.unit} • الأسبوع {viewingLesson.week}
                  </span>
                  <span className="text-xs text-amber-300 font-bold">
                    مدة الحصة: {viewingLesson.durationMinutes || 45} دقيقة
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-white leading-snug">
                  {viewingLesson.title}
                </h3>
                {viewingLesson.titleFr && (
                  <p className="text-xs text-slate-300 font-mono" dir="ltr">
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

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-slate-800">
              {/* Objective Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                <div className="text-xs font-black text-blue-950 mb-1 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>الهدف التعلمي المصرح به (Objectif d'apprentissage)</span>
                </div>
                <p className="text-xs sm:text-sm text-blue-900 leading-relaxed font-medium">
                  {viewingLesson.objective}
                </p>
              </div>

              {/* The 5 Steps Script */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  مراحل وسيناريو التدريس الصريح للحصة
                </h4>

                {/* 1. التهيئة */}
                <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-1 text-xs font-black text-amber-900">
                    <span className="w-5 h-5 rounded-md bg-amber-500 text-white flex items-center justify-center text-[10px]">
                      1
                    </span>
                    <span>التهيئة والربط (Ouverture / Rappel)</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed pr-7">
                    {viewingLesson.steps.preparation || "تنشيط المكتسبات السابقة والتصريح بالهدف التعلمي."}
                  </p>
                </div>

                {/* 2. النمذجة */}
                <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-1 text-xs font-black text-blue-900">
                    <span className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center text-[10px]">
                      2
                    </span>
                    <span>النمذجة (Modelage: «Je fais / أنا أعمل»)</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed pr-7">
                    {viewingLesson.steps.modeling || "الأستاذ ينفذ المهمة بصوت مسموع مع توضيح خطوات التفكير وتفادي الأخطاء."}
                  </p>
                </div>

                {/* 3. الممارسة الموجهة */}
                <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-1 text-xs font-black text-emerald-900">
                    <span className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                      3
                    </span>
                    <span>الممارسة الموجهة (Pratique guidée: «Nous faisons / نحن نعمل معاً»)</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed pr-7">
                    {viewingLesson.steps.guided || "مشاركة المتعلمين على الألواح وتصحيح فوري جماعي وثنائي."}
                  </p>
                </div>

                {/* 4. الممارسة المستقلة */}
                <div className="bg-indigo-50/60 border border-indigo-200 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-1 text-xs font-black text-indigo-900">
                    <span className="w-5 h-5 rounded-md bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                      4
                    </span>
                    <span>الممارسة المستقلة (Pratique autonome: «Tu fais / أنت تعمل بمفردك»)</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed pr-7">
                    {viewingLesson.steps.autonomous || "إنجاز فردي لتمارين كراسة التلميذ مع متابعة المتعثرين."}
                  </p>
                </div>

                {/* 5. التقويم */}
                <div className="bg-rose-50/60 border border-rose-200 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-1 text-xs font-black text-rose-900">
                    <span className="w-5 h-5 rounded-md bg-rose-600 text-white flex items-center justify-center text-[10px]">
                      5
                    </span>
                    <span>التقويم والتغذية الراجعة (Objectivation & Bilan)</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed pr-7">
                    {viewingLesson.steps.evaluation || "سؤال تحقق نهائي ومراجعة ما تم تعلمه قبل الانتقال للمهمة الموالية."}
                  </p>
                </div>
              </div>

              {/* Key Concepts Tags */}
              {viewingLesson.keyConcepts && viewingLesson.keyConcepts.length > 0 && (
                <div className="pt-2">
                  <span className="text-xs font-bold text-slate-500 block mb-1.5">المفاهيم والمصطلحات المفتاحية:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {viewingLesson.keyConcepts.map((c, i) => (
                      <span key={i} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-500 font-medium">
                حجم الملف التقديمي: {viewingLesson.fileSize || "4.5 MB"}
              </div>

              <div className="flex items-center gap-2">
                {viewingLesson.pptUrl && (
                  <a
                    href={viewingLesson.pptUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition flex items-center gap-1.5 shadow-xs"
                  >
                    <Download className="w-4 h-4" />
                    <span>تحميل عرض الباوربوينت (PPTX)</span>
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
                className="text-white/70 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveLesson} className="p-6 overflow-y-auto space-y-4 text-xs text-slate-800">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold mb-1">المستوى الدراسي *</label>
                  <select
                    value={lessonForm.level || "4aep"}
                    onChange={(e) => setLessonForm({ ...lessonForm, level: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-bold"
                  >
                    <option value="1aep">الأول ابتدائي (1AEP)</option>
                    <option value="2aep">الثاني ابتدائي (2AEP)</option>
                    <option value="3aep">الثالث ابتدائي (3AEP)</option>
                    <option value="4aep">الرابع ابتدائي (4AEP)</option>
                    <option value="5aep">الخامس ابتدائي (5AEP)</option>
                    <option value="6aep">السادس ابتدائي (6AEP)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1">المادة *</label>
                  <select
                    value={lessonForm.subject || "arabic"}
                    onChange={(e) => setLessonForm({ ...lessonForm, subject: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-bold"
                  >
                    <option value="arabic">اللغة العربية</option>
                    <option value="french">الفرنسية (Français)</option>
                    <option value="math">الرياضيات</option>
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
                      onChange={(e) => setLessonForm({ ...lessonForm, unit: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">الأسبوع</label>
                    <input
                      type="number"
                      min={1}
                      max={4}
                      value={lessonForm.week || 1}
                      onChange={(e) => setLessonForm({ ...lessonForm, week: Number(e.target.value) })}
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
                  onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                  placeholder="مثال: القراءة الصريحة: استراتيجيات المفردات"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold"
                  required
                />
              </div>

              <div>
                <label className="block font-bold mb-1">عنوان الدرس بالفرنسية (اختياري)</label>
                <input
                  type="text"
                  value={lessonForm.titleFr || ""}
                  onChange={(e) => setLessonForm({ ...lessonForm, titleFr: e.target.value })}
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
                  onChange={(e) => setLessonForm({ ...lessonForm, objective: e.target.value })}
                  placeholder="أن يوظف المتعلم استراتيجية خريطة الكلمة لتحديد..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5"
                  required
                />
              </div>

              <div className="border-t border-slate-200 pt-3 space-y-3">
                <span className="font-black text-slate-900 block">خطوات وسيناريو التدريس الصريح (5 مراحل):</span>

                <div>
                  <label className="block font-bold text-amber-900 mb-1">1. التهيئة والربط (Ouverture):</label>
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
                  <label className="block font-bold text-blue-900 mb-1">2. النمذجة (Modelage - «أنا أعمل»):</label>
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
                  <label className="block font-bold text-emerald-900 mb-1">3. الممارسة الموجهة (Pratique guidée - «نحن نعمل معاً»):</label>
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
                  <label className="block font-bold text-indigo-900 mb-1">4. الممارسة المستقلة (Pratique autonome - «أنت تعمل بمفردك»):</label>
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
                  <label className="block font-bold text-rose-900 mb-1">5. التقويم والتغذية الراجعة (Objectivation / Bilan):</label>
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
                  <label className="block font-bold mb-1">رابط تحميل ملف العرض (PPTX)</label>
                  <input
                    type="url"
                    value={lessonForm.pptUrl || ""}
                    onChange={(e) => setLessonForm({ ...lessonForm, pptUrl: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">المفاهيم المفتاحية (مفصولة بفواصل)</label>
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
                  className="px-4 py-2 bg-slate-200 text-slate-800 font-bold rounded-xl"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-xs"
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
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden" dir="rtl">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <h3 className="text-base font-black">
                تعديل روابط حقيبة {editingPackage.levelNameAr}
              </h3>
              <button
                type="button"
                onClick={() => setEditingPackage(null)}
                className="text-white/70 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePackage} className="p-5 space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">رابط عروض اللغة العربية (PPT):</label>
                <input
                  type="url"
                  value={editingPackage.arabicDriveUrl}
                  onChange={(e) => setEditingPackage({ ...editingPackage, arabicDriveUrl: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-mono"
                  dir="ltr"
                  required
                />
              </div>

              <div>
                <label className="block font-bold mb-1">رابط عروض اللغة الفرنسية (PPT):</label>
                <input
                  type="url"
                  value={editingPackage.frenchDriveUrl}
                  onChange={(e) => setEditingPackage({ ...editingPackage, frenchDriveUrl: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-mono"
                  dir="ltr"
                  required
                />
              </div>

              <div>
                <label className="block font-bold mb-1">رابط عروض الرياضيات (PPT):</label>
                <input
                  type="url"
                  value={editingPackage.mathDriveUrl}
                  onChange={(e) => setEditingPackage({ ...editingPackage, mathDriveUrl: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-mono"
                  dir="ltr"
                  required
                />
              </div>

              <div>
                <label className="block font-bold mb-1">رابط كراسة التلميذ والدلائل:</label>
                <input
                  type="url"
                  value={editingPackage.studentBookletUrl}
                  onChange={(e) => setEditingPackage({ ...editingPackage, studentBookletUrl: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-mono"
                  dir="ltr"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingPackage(null)}
                  className="px-4 py-2 bg-slate-200 text-slate-800 font-bold rounded-xl"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl"
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
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden" dir="rtl">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <h3 className="text-base font-black">تعديل ترويسة صفحة التعليم الصريح</h3>
              <button
                type="button"
                onClick={() => setIsEditingHeader(false)}
                className="text-white/70 hover:text-white p-1"
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
                  onChange={(e) => setHeaderForm({ ...headerForm, pageTitle: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-bold"
                  required
                />
              </div>

              <div>
                <label className="block font-bold mb-1">الوصف الفرعي:</label>
                <textarea
                  rows={3}
                  value={headerForm.pageSubtitle}
                  onChange={(e) => setHeaderForm({ ...headerForm, pageSubtitle: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2"
                  required
                />
              </div>

              <div>
                <label className="block font-bold mb-1">نص الشارة العلوية:</label>
                <input
                  type="text"
                  value={headerForm.badgeText}
                  onChange={(e) => setHeaderForm({ ...headerForm, badgeText: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">رابط المقال الأصلي في بروف بريس:</label>
                <input
                  type="url"
                  value={headerForm.officialUrl}
                  onChange={(e) => setHeaderForm({ ...headerForm, officialUrl: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-mono"
                  dir="ltr"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditingHeader(false)}
                  className="px-4 py-2 bg-slate-200 text-slate-800 font-bold rounded-xl"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl"
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
