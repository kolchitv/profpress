import React, { useState, useEffect } from "react";
import {
  DEFAULT_PROFESSIONAL_EXAMS_DATA,
  ProfessionalExamsPageData,
  ProfessionalExamArticle,
  ProfessionalExamModel,
} from "../data/professionalExamsData";
import { QuickResourceCard, CompetitionDownloadFile } from "../data/teachingCompetitionData";
import { TabKey, AdminSession } from "../types";
import { canUserDeleteArticles, getStoredAdminSession, ADMIN_SESSION_EVENT } from "../utils/adminAuth";
import { QuickResourceEditorModal } from "./QuickResourceEditorModal";
import { ArticleHtmlRenderer } from "./ArticleHtmlRenderer";
import { DownloadGatewayModal } from "./DownloadGatewayModal";
import { RichArticleEditor } from "./RichArticleEditor";
import {
  FileText,
  Megaphone,
  Folder,
  Brain,
  BookOpen,
  Calculator,
  FlaskConical,
  PenTool,
  Sparkles,
  School,
  Languages,
  Compass,
  Laptop,
  Search,
  CheckCircle2,
  Download,
  ExternalLink,
  Edit3,
  Plus,
  Trash2,
  Save,
  X,
  Eye,
  Info,
  Award,
  Layers,
  HelpCircle,
  FileDown,
  Image as ImageIcon,
  Share2,
  Printer,
  ChevronLeft,
  Calendar,
  Filter,
} from "lucide-react";

interface ProfessionalExamsPageProps {
  onNavigateToTab: (tab: TabKey) => void;
  adminSession?: AdminSession | null;
}

const STORAGE_KEY = "profpress_professional_exams_data_v1";

export const ProfessionalExamsPage: React.FC<ProfessionalExamsPageProps> = ({
  onNavigateToTab,
  adminSession: propAdminSession,
}) => {
  // Admin Session State
  const [adminSession, setAdminSession] = useState<AdminSession | null>(() => {
    return propAdminSession || getStoredAdminSession();
  });

  useEffect(() => {
    const handleSessionChange = () => {
      setAdminSession(getStoredAdminSession());
    };
    window.addEventListener(ADMIN_SESSION_EVENT, handleSessionChange);
    return () => window.removeEventListener(ADMIN_SESSION_EVENT, handleSessionChange);
  }, []);

  const isEditActive = Boolean(adminSession?.isAdmin);

  // Page Data
  const [data, setData] = useState<ProfessionalExamsPageData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_PROFESSIONAL_EXAMS_DATA;
  });

  const handleSaveData = (newData: ProfessionalExamsPageData) => {
    setData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error(e);
    }
  };

  // Toast Notification
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Active Category Filter
  const [activeCycleFilter, setActiveCycleFilter] = useState<"all" | "primary" | "middle" | "high">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals State
  const [readingArticle, setReadingArticle] = useState<ProfessionalExamArticle | null>(null);
  const [editingArticle, setEditingArticle] = useState<{
    article: ProfessionalExamArticle;
    isNew: boolean;
  } | null>(null);

  const [readingQuickCard, setReadingQuickCard] = useState<QuickResourceCard | null>(null);
  const [editingQuickCard, setEditingQuickCard] = useState<QuickResourceCard | null>(null);

  const [editingModel, setEditingModel] = useState<{
    model: ProfessionalExamModel;
    isNew: boolean;
  } | null>(null);

  // Download Gateway State
  const [gatewayFile, setGatewayFile] = useState<{
    isOpen: boolean;
    file: {
      id: string;
      title: string;
      url: string;
      size?: string;
      year?: string;
      fileType?: string;
    } | null;
  }>({ isOpen: false, file: null });

  const handleTriggerDownload = (file: {
    id: string;
    title: string;
    url: string;
    size?: string;
    year?: string;
    fileType?: string;
  }) => {
    setGatewayFile({
      isOpen: true,
      file,
    });
  };

  // Helper to render icon by name
  const renderIcon = (name: string, className: string = "w-5 h-5") => {
    switch (name) {
      case "Megaphone":
        return <Megaphone className={className} />;
      case "Brain":
        return <Brain className={className} />;
      case "FolderKanban":
      case "Folder":
        return <Folder className={className} />;
      case "Laptop":
        return <Laptop className={className} />;
      case "School":
        return <School className={className} />;
      case "Calculator":
        return <Calculator className={className} />;
      case "FlaskConical":
        return <FlaskConical className={className} />;
      case "PenTool":
        return <PenTool className={className} />;
      case "Languages":
        return <Languages className={className} />;
      case "Compass":
        return <Compass className={className} />;
      case "Award":
        return <Award className={className} />;
      case "Layers":
        return <Layers className={className} />;
      case "Sparkles":
        return <Sparkles className={className} />;
      case "BookOpen":
        return <BookOpen className={className} />;
      default:
        return <FileText className={className} />;
    }
  };

  // Filtered Articles
  const filteredArticles = data.articles.filter((art) => {
    const matchCycle =
      activeCycleFilter === "all" ||
      art.cycle === "all" ||
      art.cycle === activeCycleFilter;
    const matchSearch =
      searchQuery.trim() === "" ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (art.categoryLabel && art.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCycle && matchSearch;
  });

  // Filtered Exam Models
  const filteredExamModels = data.examModels.filter((mod) => {
    const matchCycle =
      activeCycleFilter === "all" || mod.cycle === activeCycleFilter;
    const matchSearch =
      searchQuery.trim() === "" ||
      mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mod.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mod.year.includes(searchQuery);
    return matchCycle && matchSearch;
  });

  return (
    <div className="space-y-8 pb-16 font-cairo" dir="rtl">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 left-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2 text-sm font-bold animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* 1. Header Banner & Identity */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-blue-800/40">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-amber-300 text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-xl backdrop-blur-xs">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{data.headerBadgeText}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
              {data.pageTitle}
            </h1>

            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed max-w-2xl font-medium">
              {data.pageSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://profpressma.blogspot.com/p/blog-page_77.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition flex items-center gap-2 backdrop-blur-xs shadow-xs"
            >
              <ExternalLink className="w-4 h-4 text-amber-300" />
              <span>رابط المدونة الرسمي</span>
            </a>

            <a
              href="https://mihani.men.gov.ma"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs sm:text-sm transition flex items-center gap-2 shadow-md"
            >
              <Laptop className="w-4 h-4" />
              <span>بوابة مهني الترشيح الإلكتروني</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Official Blog Cover Banner & Image Showcase (From https://profpressma.blogspot.com/p/blog-page_77.html) */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 p-6 sm:p-8 space-y-4">
            <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 border border-purple-200 text-xs font-black px-3 py-1 rounded-lg">
              <BookOpen className="w-3.5 h-3.5" />
              <span>دليل الاستعداد للامتحانات المهنية</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              قسم خاص بالإمتحانات المهنية جميع الأسلاك
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {data.introText}
            </p>

            <div className="pt-2 flex flex-wrap gap-2.5">
              <span className="text-xs bg-slate-100 text-slate-700 font-bold px-3 py-1.5 rounded-xl">
                ✓ الترقية بالسلم 11 وخارج السلم
              </span>
              <span className="text-xs bg-slate-100 text-slate-700 font-bold px-3 py-1.5 rounded-xl">
                ✓ ديداكتيك جميع المواد
              </span>
              <span className="text-xs bg-slate-100 text-slate-700 font-bold px-3 py-1.5 rounded-xl">
                ✓ نماذج 2015-2024 مع عناصر الإجابة
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-900 relative p-4 sm:p-6 flex flex-col items-center justify-center">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 max-w-lg w-full group relative">
              <img
                src={data.coverImage.url}
                alt={data.coverImage.alt}
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover group-hover:scale-102 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 flex items-end p-4">
                <span className="text-xs font-bold text-white leading-tight">
                  {data.coverImage.caption}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Quick Resource Cards (4 Main Pillars) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <Folder className="w-5 h-5 text-blue-600" />
            <span>الأركان الأساسية للاستعداد والترشيح</span>
          </h3>
          <span className="text-xs text-slate-500 font-bold">
            اضغط على أي بطاقة لتصفح الدليل والتحميل
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.quickCards.map((card) => (
            <div
              key={card.id}
              onClick={() => setReadingQuickCard(card)}
              className="bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md rounded-2xl p-5 transition cursor-pointer flex flex-col justify-between space-y-4 group relative"
            >
              {isEditActive && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingQuickCard(card);
                  }}
                  className="absolute top-2 left-2 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 p-1.5 rounded-lg text-xs transition z-10"
                  title="تعديل هذه البطاقة"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              )}

              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {renderIcon(card.iconName, "w-6 h-6")}
                </div>

                <div>
                  <h4 className="font-black text-sm sm:text-base text-slate-900 leading-snug group-hover:text-blue-600 transition">
                    {card.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-bold mt-0.5">
                    {card.subtitle}
                  </p>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {card.writtenContent}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                <span>تصفح وتحميل المرفقات</span>
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Cycle Filter Tabs and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Cycle Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
            <button
              onClick={() => setActiveCycleFilter("all")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition cursor-pointer ${
                activeCycleFilter === "all"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              جميع الأسلاك (الكل)
            </button>

            <button
              onClick={() => setActiveCycleFilter("primary")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition cursor-pointer ${
                activeCycleFilter === "primary"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              التعليم الابتدائي
            </button>

            <button
              onClick={() => setActiveCycleFilter("middle")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition cursor-pointer ${
                activeCycleFilter === "middle"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              الثانوي الإعدادي
            </button>

            <button
              onClick={() => setActiveCycleFilter("high")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition cursor-pointer ${
                activeCycleFilter === "high"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              الثانوي التأهيلي
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في المواضيع والمقالات..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-9 pl-4 py-2 text-xs font-bold text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-hidden transition"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 5. Comprehensive Articles and Preparation Guides Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              المقالات التوجيهية وحقائب التحضير البيداغوجي والديداكتيكي
            </h3>
          </div>

          {isEditActive && (
            <button
              onClick={() =>
                setEditingArticle({
                  article: {
                    id: `art_${Date.now()}`,
                    title: "مقال توجيهي جديد للامتحان المهني",
                    category: "prep_bag",
                    categoryLabel: "حقائب التحضير",
                    badge: "جديد",
                    iconName: "FileText",
                    cycle: "all",
                    cycleLabel: "جميع الأسلاك",
                    author: "موقع بروف بريس",
                    date: "2024",
                    summary: "اكتب هنا ملخصاً توجيهياً للمقال...",
                    articleContent: "<h3>عنوان المقال</h3>\n<p>اكتب هنا المحتوى بالتفصيل...</p>",
                    downloadFiles: [],
                  },
                  isNew: true,
                })
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة مقال جديد</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => setReadingArticle(art)}
              className="bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md rounded-2xl p-5 transition cursor-pointer flex flex-col justify-between space-y-4 group relative"
            >
              {isEditActive && (
                <div className="absolute top-2 left-2 flex items-center gap-1 z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingArticle({ article: art, isNew: false });
                    }}
                    className="bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 p-1.5 rounded-lg text-xs transition shadow-xs"
                    title="تعديل هذا المقال"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm(`هل أنت متأكد من حذف مقال "${art.title}"؟`)) {
                        const updated = data.articles.filter((a) => a.id !== art.id);
                        handleSaveData({ ...data, articles: updated });
                        showToast("تم حذف المقال بنجاح");
                      }
                    }}
                    className="bg-slate-100 hover:bg-rose-600 hover:text-white text-slate-700 p-1.5 rounded-lg text-xs transition shadow-xs"
                    title="حذف المقال"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-md font-bold">
                    {art.categoryLabel}
                  </span>
                  {art.badge && (
                    <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-md font-black">
                      {art.badge}
                    </span>
                  )}
                </div>

                <h4 className="font-black text-sm sm:text-base text-slate-900 leading-snug group-hover:text-blue-600 transition line-clamp-2">
                  {art.title}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {art.summary}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold">
                  <span>{art.cycleLabel || "جميع الأسلاك"}</span>
                  {art.downloadFiles && art.downloadFiles.length > 0 && (
                    <span className="text-purple-600 flex items-center gap-1 font-bold">
                      <FileDown className="w-3.5 h-3.5" />
                      <span>{art.downloadFiles.length} ملفات تحميل</span>
                    </span>
                  )}
                </div>

                <div className="w-full bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white py-2 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition">
                  <Eye className="w-3.5 h-3.5" />
                  <span>قراءة المقال والمرفقات</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Bank of Previous Exam Models and Corrections (2015 - 2024) */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-600" />
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              بنك مواضيع امتحانات الكفاءة المهنية السابقة مع عناصر الإجابة
            </h3>
          </div>

          {isEditActive && (
            <button
              onClick={() =>
                setEditingModel({
                  model: {
                    id: `mod_${Date.now()}`,
                    title: "امتحان مهني جديد",
                    cycle: "primary",
                    cycleName: "التعليم الابتدائي",
                    subject: "ديداكتيك المواد",
                    year: "2024",
                    session: "دورة 2024",
                    targetGrade: "الدرجة الأولى (السلم 11)",
                    downloadUrl: "https://profpressma.blogspot.com/p/blog-page_77.html",
                    hasCorrection: true,
                    fileSize: "2.5 MB",
                  },
                  isNew: true,
                })
              }
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة نموذج امتحان</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExamModels.map((mod) => (
            <div
              key={mod.id}
              className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 hover:border-amber-300 hover:shadow-md transition flex flex-col justify-between space-y-3 relative group"
            >
              {isEditActive && (
                <div className="absolute top-2 left-2 flex items-center gap-1 z-10">
                  <button
                    onClick={() => setEditingModel({ model: mod, isNew: false })}
                    className="bg-slate-100 hover:bg-amber-500 hover:text-slate-950 text-slate-700 p-1.5 rounded-lg text-xs transition shadow-xs"
                    title="تعديل هذا النموذج"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`هل أنت متأكد من حذف نموذج "${mod.title}"؟`)) {
                        const updated = data.examModels.filter((m) => m.id !== mod.id);
                        handleSaveData({ ...data, examModels: updated });
                        showToast("تم حذف النموذج بنجاح");
                      }
                    }}
                    className="bg-slate-100 hover:bg-rose-600 hover:text-white text-slate-700 p-1.5 rounded-lg text-xs transition shadow-xs"
                    title="حذف هذا النموذج"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] bg-slate-100 text-slate-700 font-black px-2 py-0.5 rounded-md">
                    {mod.cycleName}
                  </span>
                  <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-md font-black">
                    {mod.session}
                  </span>
                  {mod.hasCorrection && (
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md font-bold">
                      ✓ مع عناصر التصحيح
                    </span>
                  )}
                </div>

                <h4 className="font-black text-xs sm:text-sm text-slate-900 leading-snug line-clamp-2">
                  {mod.title}
                </h4>

                <div className="text-[11px] text-slate-500 font-bold space-y-0.5">
                  <p>المادة: {mod.subject}</p>
                  <p>الفئة: {mod.targetGrade}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                {mod.fileSize && (
                  <span className="text-[11px] text-slate-400 font-bold">
                    الحجم: {mod.fileSize}
                  </span>
                )}
                <button
                  onClick={() =>
                    handleTriggerDownload({
                      id: mod.id,
                      title: mod.title,
                      url: mod.downloadUrl,
                      size: mod.fileSize || "3.5 MB",
                      year: mod.year,
                      fileType: "PDF",
                    })
                  }
                  className="flex-1 bg-amber-400 hover:bg-amber-300 text-slate-950 py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition shadow-2xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>تحميل الموضوع والتصحيح</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Social Share & Print Bar (Matching Profpress Blog Footer) */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 text-center space-y-4">
        <h4 className="font-black text-sm text-slate-800">
          مشاركة هذا الدليل الشامل للامتحانات المهنية مع الزملاء والأساتذة:
        </h4>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <a
            href="https://api.whatsapp.com/send?text=الامتحانات المهنية لجميع الأسلاك https://profpressma.blogspot.com/p/blog-page_77.html"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>واتساب</span>
          </a>

          <a
            href="https://www.facebook.com/sharer/sharer.php?u=https://profpressma.blogspot.com/p/blog-page_77.html"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>فيسبوك</span>
          </a>

          <a
            href="mailto:?subject=الامتحانات المهنية لجميع الأسلاك&body=https://profpressma.blogspot.com/p/blog-page_77.html"
            className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>البريد الإلكتروني</span>
          </a>

          <button
            onClick={() => window.print()}
            className="bg-slate-900 hover:bg-black text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-2xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>طباعة الصفحة</span>
          </button>
        </div>
      </div>

      {/* --- Modals --- */}

      {/* Modal A: Article Reader */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-4xl p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="space-y-1 pr-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2.5 py-0.5 rounded-lg">
                    {readingArticle.categoryLabel}
                  </span>
                  <span className="text-xs text-slate-500 font-bold">
                    {readingArticle.cycleLabel || "جميع الأسلاك"}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                  {readingArticle.title}
                </h3>
              </div>
              <button
                onClick={() => setReadingArticle(null)}
                className="text-slate-400 hover:text-slate-700 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Article Content Rendered */}
            <div className="text-slate-800 space-y-4">
              <ArticleHtmlRenderer
                content={readingArticle.articleContent}
                onDownloadClick={(url, title) => {
                  handleTriggerDownload({
                    id: `dl_${Date.now()}`,
                    title: title || "تحميل المرفق",
                    url,
                  });
                }}
              />
            </div>

            {/* Download Files List */}
            {readingArticle.downloadFiles && readingArticle.downloadFiles.length > 0 && (
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                  <FileDown className="w-4 h-4 text-purple-600" />
                  <span>المستندات والملفات المرفقة للتحميل المباشر:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {readingArticle.downloadFiles.map((file, idx) => (
                    <div
                      key={file.id || idx}
                      className="p-3.5 rounded-xl border border-slate-200 bg-purple-50/50 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FileDown className="w-5 h-5 text-purple-600 shrink-0" />
                        <div className="min-w-0">
                          <p className="font-bold text-xs text-slate-900 truncate">
                            {file.title}
                          </p>
                          {file.size && (
                            <span className="text-[10px] text-slate-500">
                              الحجم: {file.size}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleTriggerDownload(file)}
                        className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shrink-0 transition"
                      >
                        تحميل
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              {readingArticle.sourceUrl && (
                <a
                  href={readingArticle.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>عرض المقال في موقع بروف بريس</span>
                </a>
              )}
              <button
                onClick={() => setReadingArticle(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-xl text-xs font-bold transition mr-auto"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal B: Quick Card Reader */}
      {readingQuickCard && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  {renderIcon(readingQuickCard.iconName, "w-5 h-5")}
                </div>
                <div>
                  <h3 className="font-black text-base sm:text-lg text-slate-900">
                    {readingQuickCard.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-bold">
                    {readingQuickCard.subtitle}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setReadingQuickCard(null)}
                className="text-slate-400 hover:text-slate-700 p-2 rounded-xl bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed">
              {readingQuickCard.writtenContent}
            </div>

            {readingQuickCard.downloadLinks && readingQuickCard.downloadLinks.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-black text-xs text-slate-700">روابط ومستندات التحميل:</h4>
                <div className="space-y-2">
                  {readingQuickCard.downloadLinks.map((dl) => (
                    <div
                      key={dl.id}
                      className="p-3 rounded-xl border border-slate-200 flex items-center justify-between bg-white"
                    >
                      <span className="text-xs font-bold text-slate-800">{dl.title}</span>
                      <button
                        onClick={() => handleTriggerDownload(dl)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg"
                      >
                        تحميل
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              {readingQuickCard.url && (
                <a
                  href={readingQuickCard.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>فتح الرابط المباشر للموضوع</span>
                </a>
              )}
              <button
                onClick={() => setReadingQuickCard(null)}
                className="bg-slate-900 text-white px-5 py-2 rounded-xl text-xs font-bold mr-auto"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal C: Admin Article Editor */}
      {editingArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-3xl p-6 sm:p-8 space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-base text-slate-900">
                {editingArticle.isNew ? "إضافة مقال جديد للامتحانات المهنية" : `تعديل المقال: ${editingArticle.article.title}`}
              </h3>
              <button
                onClick={() => setEditingArticle(null)}
                className="text-slate-400 hover:text-slate-700 p-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">عنوان المقال:</label>
                  <input
                    type="text"
                    value={editingArticle.article.title}
                    onChange={(e) =>
                      setEditingArticle({
                        ...editingArticle,
                        article: { ...editingArticle.article, title: e.target.value },
                      })
                    }
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">السلك التعليمي:</label>
                  <select
                    value={editingArticle.article.cycle || "all"}
                    onChange={(e) =>
                      setEditingArticle({
                        ...editingArticle,
                        article: {
                          ...editingArticle.article,
                          cycle: e.target.value as any,
                          cycleLabel:
                            e.target.value === "primary"
                              ? "التعليم الابتدائي"
                              : e.target.value === "middle"
                              ? "الثانوي الإعدادي"
                              : e.target.value === "high"
                              ? "الثانوي التأهيلي"
                              : "جميع الأسلاك",
                        },
                      })
                    }
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 font-bold"
                  >
                    <option value="all">جميع الأسلاك</option>
                    <option value="primary">التعليم الابتدائي</option>
                    <option value="middle">الثانوي الإعدادي</option>
                    <option value="high">الثانوي التأهيلي</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">ملخص قصير:</label>
                <textarea
                  rows={2}
                  value={editingArticle.article.summary}
                  onChange={(e) =>
                    setEditingArticle({
                      ...editingArticle,
                      article: { ...editingArticle.article, summary: e.target.value },
                    })
                  }
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-cairo"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">محرر المقال التفصيلي (HTML):</label>
                <RichArticleEditor
                  value={editingArticle.article.articleContent}
                  onChange={(val) =>
                    setEditingArticle({
                      ...editingArticle,
                      article: { ...editingArticle.article, articleContent: val },
                    })
                  }
                  title="محرر مقال الامتحان المهني"
                  textareaId="prof-exam-article-editor"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setEditingArticle(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold"
              >
                إلغاء
              </button>
              <button
                onClick={() => {
                  let updatedArticles: ProfessionalExamArticle[];
                  if (editingArticle.isNew) {
                    updatedArticles = [editingArticle.article, ...data.articles];
                  } else {
                    updatedArticles = data.articles.map((a) =>
                      a.id === editingArticle.article.id ? editingArticle.article : a
                    );
                  }
                  handleSaveData({ ...data, articles: updatedArticles });
                  setEditingArticle(null);
                  showToast("تم حفظ المقال بنجاح!");
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-xs font-black shadow-xs"
              >
                حفظ المقال
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal D: Quick Resource Card Editor */}
      {editingQuickCard && (
        <QuickResourceEditorModal
          isOpen={true}
          card={editingQuickCard}
          onClose={() => setEditingQuickCard(null)}
          onSave={(savedCard) => {
            const updated = data.quickCards.map((c) =>
              c.id === savedCard.id ? savedCard : c
            );
            handleSaveData({ ...data, quickCards: updated });
            setEditingQuickCard(null);
            showToast("تم حفظ البطاقة بنجاح!");
          }}
        />
      )}

      {/* Modal E: Exam Model Editor */}
      {editingModel && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-xl p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-base text-slate-900">
                {editingModel.isNew ? "إضافة نموذج امتحان جديد" : "تعديل نموذج الامتحان"}
              </h3>
              <button onClick={() => setEditingModel(null)} className="text-slate-400 p-2">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">عنوان الموضوع:</label>
                <input
                  type="text"
                  value={editingModel.model.title}
                  onChange={(e) =>
                    setEditingModel({
                      ...editingModel,
                      model: { ...editingModel.model, title: e.target.value },
                    })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">السلك:</label>
                  <select
                    value={editingModel.model.cycle}
                    onChange={(e) =>
                      setEditingModel({
                        ...editingModel,
                        model: {
                          ...editingModel.model,
                          cycle: e.target.value as any,
                          cycleName:
                            e.target.value === "primary"
                              ? "التعليم الابتدائي"
                              : e.target.value === "middle"
                              ? "التعليم الثانوي الإعدادي"
                              : "التعليم الثانوي التأهيلي",
                        },
                      })
                    }
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 font-bold"
                  >
                    <option value="primary">التعليم الابتدائي</option>
                    <option value="middle">الثانوي الإعدادي</option>
                    <option value="high">الثانوي التأهيلي</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">السنة / الدورة:</label>
                  <input
                    type="text"
                    value={editingModel.model.session}
                    onChange={(e) =>
                      setEditingModel({
                        ...editingModel,
                        model: { ...editingModel.model, session: e.target.value },
                      })
                    }
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">رابط التحميل (PDF):</label>
                <input
                  type="text"
                  value={editingModel.model.downloadUrl}
                  onChange={(e) =>
                    setEditingModel({
                      ...editingModel,
                      model: { ...editingModel.model, downloadUrl: e.target.value },
                    })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 font-bold"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setEditingModel(null)}
                className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold"
              >
                إلغاء
              </button>
              <button
                onClick={() => {
                  let updatedModels: ProfessionalExamModel[];
                  if (editingModel.isNew) {
                    updatedModels = [editingModel.model, ...data.examModels];
                  } else {
                    updatedModels = data.examModels.map((m) =>
                      m.id === editingModel.model.id ? editingModel.model : m
                    );
                  }
                  handleSaveData({ ...data, examModels: updatedModels });
                  setEditingModel(null);
                  showToast("تم حفظ نموذج الامتحان بنجاح!");
                }}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-5 py-2 rounded-xl text-xs font-black shadow-xs"
              >
                حفظ النموذج
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Download Gateway Modal */}
      <DownloadGatewayModal
        isOpen={gatewayFile.isOpen}
        file={gatewayFile.file}
        onClose={() => setGatewayFile({ isOpen: false, file: null })}
      />
    </div>
  );
};
