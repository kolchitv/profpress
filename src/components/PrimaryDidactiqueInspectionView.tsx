import React, { useState, useEffect } from "react";
import {
  DEFAULT_PRIMARY_DIDACTIQUE_DATA,
  PrimaryDidactiquePageData,
} from "../data/primaryDidactiqueData";
import {
  PrimarySubjectCard,
  PrimarySubjectAction,
  PrimaryDownloadFile,
  PrimaryImageBanner,
  PrimaryExamSpec,
  ActionAttachedImage,
} from "../data/primaryKnowledgeData";
import { AdminSession } from "../types";
import { getStoredAdminSession, ADMIN_SESSION_EVENT } from "../utils/adminAuth";
import { getDownloadGatewaySettings, DOWNLOAD_GATEWAY_EVENT } from "../utils/downloadGatewaySettings";
import { DownloadGatewayModal } from "./DownloadGatewayModal";
import { ArticleHtmlRenderer } from "./ArticleHtmlRenderer";
import { RichArticleEditor } from "./RichArticleEditor";
import { SubjectActionEditorModal } from "./SubjectActionEditorModal";
import {
  Info,
  Clock,
  Asterisk,
  Scale,
  BookOpen,
  Presentation,
  Brain,
  FileText,
  Laptop,
  Languages,
  Calculator,
  FlaskConical,
  FileDown,
  Download,
  Edit3,
  Plus,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Sparkles,
  ExternalLink,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Share2,
  Copy,
  Layers,
  CheckSquare,
  School,
  GraduationCap,
  ZoomIn,
} from "lucide-react";

interface Props {
  onBackToAllTracks?: () => void;
  onNavigateToKnowledge?: () => void;
}

export const PrimaryDidactiqueInspectionView: React.FC<Props> = ({
  onBackToAllTracks,
  onNavigateToKnowledge,
}) => {
  // 1. Local Storage Persistence
  const [data, setData] = useState<PrimaryDidactiquePageData>(() => {
    try {
      const saved = localStorage.getItem("profpress_primary_didactique_data_v1");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load primary didactique data from storage", e);
    }
    return DEFAULT_PRIMARY_DIDACTIQUE_DATA;
  });

  // Admin session
  const [adminSession, setAdminSession] = useState<AdminSession | null>(getStoredAdminSession);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const handleAuth = () => setAdminSession(getStoredAdminSession());
    window.addEventListener(ADMIN_SESSION_EVENT, handleAuth);
    return () => window.removeEventListener(ADMIN_SESSION_EVENT, handleAuth);
  }, []);

  const isManager = adminSession?.isManager || adminSession?.role === "super_admin";
  const isEditActive = editMode || isManager;

  // Save changes helper
  const handleSaveData = (newData: PrimaryDidactiquePageData) => {
    setData(newData);
    try {
      localStorage.setItem("profpress_primary_didactique_data_v1", JSON.stringify(newData));
    } catch (e) {
      console.error("Failed to save data to localStorage", e);
    }
  };

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Active Subject Action Modal (Reading / QCM / Downloads / Images)
  const [activeActionModal, setActiveActionModal] = useState<{
    subject: PrimarySubjectCard;
    action: PrimarySubjectAction;
  } | null>(null);

  const [modalTab, setModalTab] = useState<"summary" | "article" | "images" | "downloads" | "qcm">("article");
  const [zoomedImage, setZoomedImage] = useState<{ url: string; title?: string; caption?: string } | null>(null);

  // QCM Interactive state
  const [currentQcmIdx, setCurrentQcmIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showQcmResults, setShowQcmResults] = useState(false);

  // Download Gateway state
  const [gatewaySettings, setGatewaySettings] = useState(getDownloadGatewaySettings);
  const [gatewayFile, setGatewayFile] = useState<{
    isOpen: boolean;
    title: string;
    url: string;
    type?: string;
    size?: string;
  }>({
    isOpen: false,
    title: "",
    url: "",
    type: "pdf",
  });

  useEffect(() => {
    const handleGatewayUpdate = (e: Event) => {
      const ce = e as CustomEvent;
      if (ce.detail) setGatewaySettings(ce.detail);
    };
    window.addEventListener(DOWNLOAD_GATEWAY_EVENT, handleGatewayUpdate);
    return () => window.removeEventListener(DOWNLOAD_GATEWAY_EVENT, handleGatewayUpdate);
  }, []);

  // Admin edit states
  const [editingSpecs, setEditingSpecs] = useState(false);
  const [editingSpecsForm, setEditingSpecsForm] = useState<PrimaryExamSpec>(data.specs);

  const [editingSubject, setEditingSubject] = useState<PrimarySubjectCard | null>(null);
  const [isNewSubject, setIsNewSubject] = useState(false);

  const [editingAction, setEditingAction] = useState<{
    subjectId: string;
    action: PrimarySubjectAction;
    isNew: boolean;
  } | null>(null);

  const [editingDownloadFile, setEditingDownloadFile] = useState<{
    file: PrimaryDownloadFile;
    isNew: boolean;
  } | null>(null);

  const [editingImageBanner, setEditingImageBanner] = useState<{
    banner: PrimaryImageBanner;
    isNew: boolean;
  } | null>(null);

  const [viewingImage, setViewingImage] = useState<PrimaryImageBanner | null>(null);

  // Render Icon helper
  const renderIcon = (name: string, className = "w-6 h-6") => {
    switch (name) {
      case "BookOpen":
        return <BookOpen className={className} />;
      case "Presentation":
        return <Presentation className={className} />;
      case "Brain":
        return <Brain className={className} />;
      case "FileText":
        return <FileText className={className} />;
      case "Laptop":
        return <Laptop className={className} />;
      case "Languages":
        return <Languages className={className} />;
      case "Calculator":
        return <Calculator className={className} />;
      case "FlaskConical":
        return <FlaskConical className={className} />;
      case "School":
        return <School className={className} />;
      case "GraduationCap":
        return <GraduationCap className={className} />;
      default:
        return <FileText className={className} />;
    }
  };

  // Color mapping matching ProfPress styling
  const getSubjectColorClasses = (scheme?: string) => {
    switch (scheme) {
      case "emerald":
        return {
          bannerBg: "bg-[#1E7B4E] text-white",
          cardBorder: "border-[#1E7B4E]/30 hover:border-[#1E7B4E] hover:shadow-md",
          badgeBg: "bg-[#1E7B4E]/10 text-[#1E7B4E] border border-[#1E7B4E]/30",
          iconColor: "text-[#1E7B4E]",
          buttonBg: "bg-[#1E7B4E] hover:bg-[#16603C] text-white",
          accentColor: "emerald",
        };
      case "blue":
        return {
          bannerBg: "bg-[#1C64F2] text-white",
          cardBorder: "border-[#1C64F2]/30 hover:border-[#1C64F2] hover:shadow-md",
          badgeBg: "bg-[#1C64F2]/10 text-[#1C64F2] border border-[#1C64F2]/30",
          iconColor: "text-[#1C64F2]",
          buttonBg: "bg-[#1C64F2] hover:bg-[#1752C4] text-white",
          accentColor: "blue",
        };
      case "amber":
        return {
          bannerBg: "bg-[#D97706] text-white",
          cardBorder: "border-[#D97706]/30 hover:border-[#D97706] hover:shadow-md",
          badgeBg: "bg-[#D97706]/10 text-[#D97706] border border-[#D97706]/30",
          iconColor: "text-[#D97706]",
          buttonBg: "bg-[#D97706] hover:bg-[#B45309] text-white",
          accentColor: "amber",
        };
      case "purple":
        return {
          bannerBg: "bg-[#7E22CE] text-white",
          cardBorder: "border-[#7E22CE]/30 hover:border-[#7E22CE] hover:shadow-md",
          badgeBg: "bg-[#7E22CE]/10 text-[#7E22CE] border border-[#7E22CE]/30",
          iconColor: "text-[#7E22CE]",
          buttonBg: "bg-[#7E22CE] hover:bg-[#6B21A8] text-white",
          accentColor: "purple",
        };
      default:
        return {
          bannerBg: "bg-slate-800 text-white",
          cardBorder: "border-slate-200 hover:border-slate-400 hover:shadow-md",
          badgeBg: "bg-slate-100 text-slate-800 border border-slate-300",
          iconColor: "text-slate-500",
          buttonBg: "bg-slate-800 hover:bg-slate-900 text-white",
          accentColor: "slate",
        };
    }
  };

  // Action Click Handler
  const handleActionClick = (subject: PrimarySubjectCard, action: PrimarySubjectAction) => {
    // If external link defined and not editing
    if (action.customUrl && action.customUrl !== "#" && !isEditActive) {
      if (action.customUrl.startsWith("http")) {
        window.open(action.customUrl, "_blank", "noopener,noreferrer");
        return;
      }
    }

    setActiveActionModal({ subject, action });
    if (action.articleContent && action.articleContent.trim().length > 0) {
      setModalTab("article");
    } else if (action.downloadFiles && action.downloadFiles.length > 0) {
      setModalTab("downloads");
    } else if (action.images && action.images.length > 0) {
      setModalTab("images");
    } else if (action.qcmQuestions && action.qcmQuestions.length > 0) {
      setModalTab("qcm");
    } else {
      setModalTab("summary");
    }
    setCurrentQcmIdx(0);
    setSelectedAnswers({});
    setShowQcmResults(false);
  };

  // Trigger Download via Gateway or Direct
  const handleTriggerDownload = (file: PrimaryDownloadFile) => {
    const url = file.url && file.url !== "#" ? file.url : `https://www.profpress.net/download/${file.id}`;
    if (gatewaySettings.isEnabled) {
      setGatewayFile({
        isOpen: true,
        title: file.title,
        url: url,
        type: file.fileType || "pdf",
        size: file.size,
      });
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  // Reset to default
  const handleResetDefaults = () => {
    if (window.confirm("هل أنت متأكد من رغبتك في استعادة الإعدادات الافتراضية لصفحة ديداكتيك الابتدائي؟")) {
      handleSaveData(DEFAULT_PRIMARY_DIDACTIQUE_DATA);
      showToast("تمت استعادة الإعدادات الأصلية بنجاح!");
    }
  };

  return (
    <div className="space-y-8 font-cairo text-right" dir="rtl">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      {/* ====================================================================== */}
      {/* TOP ADMIN CONTROL & NAVIGATION BAR                                     */}
      {/* ====================================================================== */}
      <div className="bg-slate-900 text-white p-3 sm:p-4 rounded-2xl shadow-sm border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
            <School className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black text-purple-300">
                ديداكتيك تفتيش التعليم الابتدائي
              </span>
              <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full font-bold">
                تصميم مطابق لـ ProfPress
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              إمكانية تعديل معطيات التوصيف، المواد الأربعة، المقالات، وروابط التحميل
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {onNavigateToKnowledge && (
            <button
              onClick={onNavigateToKnowledge}
              className="bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer border border-emerald-600/50"
              title="الانتقال إلى اختبار معارف الابتدائي"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>معارف الابتدائي (30%)</span>
            </button>
          )}

          {onBackToAllTracks && (
            <button
              onClick={onBackToAllTracks}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer border border-slate-700"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>جميع مسالك التفتيش</span>
            </button>
          )}

          <button
            onClick={() => setEditMode(!editMode)}
            className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition cursor-pointer ${
              editMode
                ? "bg-amber-500 text-slate-950 shadow-xs"
                : "bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{editMode ? "إغلاق التحرير" : "تفعيل التعديل والإضافة"}</span>
          </button>

          {isEditActive && (
            <>
              <button
                onClick={() => {
                  setEditingSpecsForm(data.specs);
                  setEditingSpecs(true);
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer shadow-xs"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>تعديل التوصيف</span>
              </button>

              <button
                onClick={handleResetDefaults}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-1.5 rounded-xl transition cursor-pointer border border-slate-700"
                title="استعادة الإعدادات الافتراضية"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* ====================================================================== */}
      {/* 1. HERO HEADER: TITLE & SUBTITLE                                       */}
      {/* ====================================================================== */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="bg-purple-100 text-purple-800 text-xs font-black px-3 py-1 rounded-full border border-purple-200 flex items-center gap-1">
                <School className="w-3.5 h-3.5" />
                <span>مباراة التفتيش التربوي للتعليم الابتدائي</span>
              </span>
              <span className="text-xs text-slate-400 font-bold">
                {data.lastUpdated}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              {data.pageTitle}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-medium max-w-3xl">
              {data.pageSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
            <a
              href={data.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition"
              title="رابط المقال الأصلي على مدونة ProfPress"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>مدونة ProfPress</span>
            </a>

            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                showToast("تم نسخ رابط صفحة الديداكتيك بنجاح!");
              }}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-xl transition cursor-pointer"
              title="مشاركة الصفحة"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ====================================================================== */}
        {/* 2. OFFICIAL EXAM SPECIFICATIONS BAR (معطيات التوصيف الرسمي)           */}
        {/* ====================================================================== */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3 border-b border-slate-200/60 pb-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-slate-800">
              <Info className="w-4 h-4 text-purple-600" />
              <span>معطيات التوصيف الرسمي لاختبار ديداكتيك الابتدائي وعلوم التربية:</span>
            </div>

            {isEditActive && (
              <button
                onClick={() => {
                  setEditingSpecsForm(data.specs);
                  setEditingSpecs(true);
                }}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3 h-3" />
                <span>تعديل المعطيات</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {/* 1. Duration */}
            <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-3 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] text-slate-500 font-bold block">مدة الإنجاز</span>
                <span className="text-xs sm:text-sm font-black text-slate-800 truncate block">
                  {data.specs.duration}
                </span>
              </div>
            </div>

            {/* 2. Coefficient */}
            <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-3 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Asterisk className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] text-slate-500 font-bold block">المعامل</span>
                <span className="text-xs sm:text-sm font-black text-slate-800 truncate block">
                  {data.specs.coefficient}
                </span>
              </div>
            </div>

            {/* 3. Highest Weight */}
            <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-3 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Scale className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] text-slate-500 font-bold block">الأعلى وزناً</span>
                <span className="text-xs sm:text-sm font-black text-slate-800 truncate block">
                  {data.specs.highestWeight}
                </span>
              </div>
            </div>

            {/* 4. Lowest Weight */}
            <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-3 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Scale className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] text-slate-500 font-bold block">الأقل وزناً</span>
                <span className="text-xs sm:text-sm font-black text-slate-800 truncate block">
                  {data.specs.lowestWeight}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================== */}
      {/* 3. FOUR SUBJECT CARDS (الديداكتيك: العربية، الفرنسية، الرياضيات، العلوم) */}
      {/* ====================================================================== */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <School className="w-5 h-5 text-purple-600" />
            <span>محاور ديداكتيك المواد والعلوم التربوية بالسلك الابتدائي:</span>
          </h2>

          {isEditActive && (
            <button
              onClick={() => {
                setIsNewSubject(true);
                setEditingSubject({
                  id: `sub_${Date.now()}`,
                  title: "مادة جديدة",
                  weightBadge: "وزن المكون: 20%",
                  colorScheme: "emerald",
                  actions: [],
                });
              }}
              className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة مادة جديدة</span>
            </button>
          )}
        </div>

        {data.subjects.map((subject) => {
          const theme = getSubjectColorClasses(subject.colorScheme);

          return (
            <div
              key={subject.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden"
            >
              {/* Subject Card Header Banner */}
              <div
                className={`${theme.bannerBg} px-5 py-3.5 flex items-center justify-between flex-wrap gap-2`}
              >
                {/* Right: Subject Title */}
                <div className="flex items-center gap-2.5">
                  <span className="font-black text-base sm:text-lg">{subject.title}</span>
                </div>

                {/* Left: Component Weight Badge + Admin Buttons */}
                <div className="flex items-center gap-2">
                  {isEditActive && (
                    <button
                      onClick={() => {
                        setIsNewSubject(false);
                        setEditingSubject(subject);
                      }}
                      className="bg-white hover:bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg text-xs font-bold border border-slate-200 flex items-center gap-1 transition cursor-pointer shadow-2xs"
                    >
                      <Edit3 className="w-3 h-3 text-blue-600" />
                      <span>تعديل المادة</span>
                    </button>
                  )}

                  <span className={`text-xs font-bold ${theme.badgeBg} px-3.5 py-1 rounded-full bg-white/90`}>
                    {subject.weightBadge}
                  </span>
                </div>
              </div>

              {/* 5 Action Buttons (Grid of 5 matching screenshots) */}
              <div className="p-4 sm:p-6 bg-white">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
                  {subject.actions.map((act) => {
                    const hasArticle = Boolean(act.articleContent && act.articleContent.trim().length > 0);
                    const fileCount = act.downloadFiles?.length || 0;
                    const imageCount = act.images?.length || 0;
                    const qcmCount = act.qcmQuestions?.length || 0;

                    return (
                      <div
                        key={act.id}
                        onClick={() => handleActionClick(subject, act)}
                        className={`group flex flex-col items-center justify-between p-4 border rounded-xl transition-all text-center cursor-pointer relative bg-white hover:shadow-md hover:border-purple-300 min-h-[140px] ${theme.cardBorder}`}
                      >
                        {/* Admin action controls */}
                        {isEditActive && (
                          <div className="absolute top-1.5 left-1.5 flex items-center gap-1 z-10">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingAction({
                                  subjectId: subject.id,
                                  action: act,
                                  isNew: false,
                                });
                              }}
                              className="bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 p-1 rounded-md text-[10px] border border-slate-200 cursor-pointer shadow-2xs transition"
                              title="تعديل هذا المقال، الصور، وروابط التحميل"
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (window.confirm(`هل أنت متأكد من حذف بطاقة "${act.title}"؟`)) {
                                  const updatedSubs = data.subjects.map((s) => {
                                    if (s.id !== subject.id) return s;
                                    return {
                                      ...s,
                                      actions: s.actions.filter((a) => a.id !== act.id),
                                    };
                                  });
                                  handleSaveData({ ...data, subjects: updatedSubs });
                                  showToast("تم حذف البطاقة بنجاح!");
                                }
                              }}
                              className="bg-slate-100 hover:bg-rose-600 hover:text-white text-slate-700 p-1 rounded-md text-[10px] border border-slate-200 cursor-pointer shadow-2xs transition"
                              title="حذف هذا الموضوع"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        )}

                        {/* Top / Icon */}
                        <div className="flex flex-col items-center pt-1">
                          <div
                            className={`${theme.iconColor} text-3xl mb-2.5 group-hover:scale-110 transition-transform`}
                          >
                            {renderIcon(act.iconName, "w-8 h-8 sm:w-9 sm:h-9")}
                          </div>

                          {/* Title */}
                          <span className="font-black text-gray-800 text-xs sm:text-sm leading-snug line-clamp-2">
                            {act.title}
                          </span>
                        </div>

                        {/* Bottom Tags / Meta Badges */}
                        <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1 w-full">
                          {hasArticle && (
                            <span className="text-[9px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded-md font-bold" title="يحتوي على مقال وشرح ديداكتيكي">
                              مقال 📄
                            </span>
                          )}
                          {fileCount > 0 && (
                            <span className="text-[9px] bg-purple-50 text-purple-700 border border-purple-200/60 px-1.5 py-0.5 rounded-md font-bold" title={`${fileCount} ملفات جاهزة للتحميل`}>
                              {fileCount} تحميل
                            </span>
                          )}
                          {imageCount > 0 && (
                            <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-1.5 py-0.5 rounded-md font-bold" title={`${imageCount} خطاطات وصور`}>
                              {imageCount} صور
                            </span>
                          )}
                          {qcmCount > 0 && (
                            <span className="text-[9px] bg-amber-50 text-amber-700 border border-amber-200/60 px-1.5 py-0.5 rounded-md font-bold">
                              QCM
                            </span>
                          )}
                          {act.customUrl && act.customUrl !== "#" && (
                            <span className="text-[9px] text-purple-600 flex items-center gap-0.5 font-bold">
                              <ExternalLink className="w-2.5 h-2.5" />
                              <span>رابط</span>
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Add Article / Topic Button for this Subject */}
                {isEditActive && (
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-bold">
                      عدد المواضيع والمقالات الحالية: {subject.actions.length}
                    </span>
                    <button
                      onClick={() => {
                        setEditingAction({
                          subjectId: subject.id,
                          action: {
                            id: `act_${Date.now()}`,
                            title: "موضوع / مقال جديد",
                            iconName: "FileText",
                            contentSummary: "ملخص توجيهي للموضوع الجديد",
                            articleContent: "<h3>عنوان المقال والشرح الديداكتيكي</h3>\n<p>اكتب هنا محتوى المقال مع إمكانية إضافة روابط تحميل وصور...</p>",
                            downloadFiles: [],
                            images: [],
                            qcmQuestions: [],
                          },
                          isNew: true,
                        });
                      }}
                      className="text-xs font-black text-white bg-purple-600 hover:bg-purple-700 px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition shadow-2xs cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ إضافة مقال / موضوع جديد لهذه المادة</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ====================================================================== */}
      {/* 4. DOWNLOAD FILES SECTION (دليل الديداكتيك، مدارس الريادة، مذكرات التفتيش)*/}
      {/* ====================================================================== */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <FileDown className="w-4 h-4" />
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              تحميل دلائل ومراجع ديداكتيك التعليم الابتدائي PDF
            </h3>
          </div>

          {isEditActive && (
            <button
              onClick={() => {
                setEditingDownloadFile({
                  file: {
                    id: `did_file_${Date.now()}`,
                    title: "ملف ديداكتيكي جديد (PDF)",
                    size: "2.5 MB",
                    year: "2024",
                    url: "https://profpressma.blogspot.com/p/didactique-primaire-inspection.html",
                    fileType: "pdf",
                  },
                  isNew: true,
                });
              }}
              className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة ملف تحميل جديد</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {data.downloadFiles.map((file) => (
            <div
              key={file.id}
              className="bg-slate-50 hover:bg-purple-50/40 border border-slate-200 hover:border-purple-300 rounded-2xl p-4 flex items-center justify-between gap-3 transition group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-800 leading-snug line-clamp-2">
                    {file.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-bold mt-1">
                    <span>{file.size}</span>
                    <span>•</span>
                    <span>{file.year}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {isEditActive && (
                  <button
                    onClick={() => setEditingDownloadFile({ file, isNew: false })}
                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg transition"
                    title="تعديل هذا الملف"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleTriggerDownload(file)}
                  className="bg-purple-600 hover:bg-purple-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>تحميل</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================================== */}
      {/* 5. INFOGRAPHICS & MIND MAPS (الخرائط الذهنية والخطاطات الديداكتيكية)  */}
      {/* ====================================================================== */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <ImageIcon className="w-4 h-4" />
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              خطاطات وخرائط ذهنية في ديداكتيك التعليم الابتدائي
            </h3>
          </div>

          {isEditActive && (
            <button
              onClick={() => {
                setEditingImageBanner({
                  banner: {
                    id: `did_img_${Date.now()}`,
                    title: "خطاطة ديداكتيكية جديدة",
                    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
                    caption: "وصف الخطاطة الديداكتيكية...",
                  },
                  isNew: true,
                });
              }}
              className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة خطاطة جديدة</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.imageBanners.map((banner) => (
            <div
              key={banner.id}
              className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:border-purple-300 transition group flex flex-col"
            >
              <div
                className="relative h-44 bg-slate-100 overflow-hidden cursor-pointer"
                onClick={() => setViewingImage(banner)}
              >
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3 text-white font-bold text-xs">
                  <span>{banner.title}</span>
                </div>
              </div>

              <div className="p-3.5 flex items-center justify-between gap-2 flex-1 bg-white">
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {banner.caption || banner.title}
                </p>

                {isEditActive && (
                  <button
                    onClick={() => setEditingImageBanner({ banner, isNew: false })}
                    className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-50 shrink-0"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================================== */}
      {/* 6. SUBJECT ACTION DETAIL MODAL (ملخص، مقال تفصيلي، QCM)                */}
      {/* ====================================================================== */}
      {activeActionModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto font-cairo">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden text-right animate-in fade-in duration-150">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold">
                  {renderIcon(activeActionModal.action.iconName, "w-5 h-5")}
                </div>
                <div>
                  <h3 className="font-black text-base sm:text-lg">
                    {activeActionModal.action.title}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {activeActionModal.subject.title} • {activeActionModal.subject.weightBadge}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isEditActive && (
                  <button
                    onClick={() => {
                      setEditingAction({
                        subjectId: activeActionModal.subject.id,
                        action: activeActionModal.action,
                        isNew: false,
                      });
                    }}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 shadow-2xs"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>تعديل المحتوى والمقال</span>
                  </button>
                )}

                <button
                  onClick={() => setActiveActionModal(null)}
                  className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Tabs Header */}
            <div className="flex items-center border-b border-slate-200 bg-slate-50 px-4 sm:px-5 pt-2 shrink-0 overflow-x-auto">
              <button
                onClick={() => setModalTab("article")}
                className={`px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  modalTab === "article"
                    ? "border-purple-600 text-purple-700 bg-white rounded-t-lg shadow-2xs"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <span>المقال والشرح الديداكتيكي</span>
                {activeActionModal.action.articleContent && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                )}
              </button>

              <button
                onClick={() => setModalTab("downloads")}
                className={`px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  modalTab === "downloads"
                    ? "border-purple-600 text-purple-700 bg-white rounded-t-lg shadow-2xs"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <span>روابط ومستندات التحميل</span>
                {activeActionModal.action.downloadFiles && activeActionModal.action.downloadFiles.length > 0 && (
                  <span className="bg-purple-100 text-purple-800 text-[10px] font-black px-1.5 py-0.5 rounded-full">
                    {activeActionModal.action.downloadFiles.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setModalTab("images")}
                className={`px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  modalTab === "images"
                    ? "border-purple-600 text-purple-700 bg-white rounded-t-lg shadow-2xs"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <span>الصور والخطاطات</span>
                {activeActionModal.action.images && activeActionModal.action.images.length > 0 && (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-1.5 py-0.5 rounded-full">
                    {activeActionModal.action.images.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setModalTab("summary")}
                className={`px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer shrink-0 ${
                  modalTab === "summary"
                    ? "border-purple-600 text-purple-700 bg-white rounded-t-lg shadow-2xs"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                الملخص التوجيهي
              </button>

              {activeActionModal.action.qcmQuestions &&
                activeActionModal.action.qcmQuestions.length > 0 && (
                  <button
                    onClick={() => setModalTab("qcm")}
                    className={`px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
                      modalTab === "qcm"
                        ? "border-purple-600 text-purple-700 bg-white rounded-t-lg shadow-2xs"
                        : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <span>اختبار تفاعلي QCM</span>
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-1.5 py-0.5 rounded-full">
                      {activeActionModal.action.qcmQuestions.length}
                    </span>
                  </button>
                )}
            </div>

            {/* Modal Tab Content */}
            <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-5">
              {/* 1. Article Tab with HTML and Markdown Render */}
              {modalTab === "article" && (
                <div className="space-y-4">
                  {activeActionModal.action.articleContent ? (
                    <div className="space-y-4">
                      <ArticleHtmlRenderer
                        content={activeActionModal.action.articleContent}
                        onDownloadClick={(url, title) => {
                          handleTriggerDownload({
                            id: `art_dl_${Date.now()}`,
                            title: title || "تحميل المرفق",
                            url: url,
                            size: "1.5 MB",
                            year: "2024",
                          });
                        }}
                      />

                      {/* Quick bottom banner to view attached downloads or images if present */}
                      {(activeActionModal.action.downloadFiles?.length || 0) > 0 && (
                        <div className="mt-6 p-4 bg-purple-50/70 border border-purple-200 rounded-2xl flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileDown className="w-5 h-5 text-purple-600" />
                            <span className="text-xs font-black text-purple-900">
                              يحتوي هذا المقال على {activeActionModal.action.downloadFiles!.length} ملفات جاهزة للتحميل المباشر
                            </span>
                          </div>
                          <button
                            onClick={() => setModalTab("downloads")}
                            className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-black px-3.5 py-1.5 rounded-xl transition"
                          >
                            عرض ملفات التحميل
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12 space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                      <FileText className="w-12 h-12 text-slate-400 mx-auto" />
                      <h4 className="text-sm font-black text-slate-700">لم يتم تحرير مقال تفصيلي لهذا المحور بعد</h4>
                      <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                        يمكنك كمسؤول تحرير المقال وإضافة نصوص منسقة وعناوين وروابط تحميل أو أكواد HTML بكل سهولة.
                      </p>
                      {isEditActive && (
                        <button
                          onClick={() => {
                            setEditingAction({
                              subjectId: activeActionModal.subject.id,
                              action: activeActionModal.action,
                              isNew: false,
                            });
                          }}
                          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl text-xs font-black transition cursor-pointer"
                        >
                          تحرير المقال وإضافة روابط التحميل والصور
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* 2. Download Files Tab */}
              {modalTab === "downloads" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <FileDown className="w-5 h-5 text-purple-600" />
                      <h4 className="font-black text-sm text-slate-900">
                        ملفات ومستندات التحميل المرفقة بهذا الموضوع:
                      </h4>
                    </div>
                    {isEditActive && (
                      <button
                        onClick={() => {
                          setEditingAction({
                            subjectId: activeActionModal.subject.id,
                            action: activeActionModal.action,
                            isNew: false,
                          });
                        }}
                        className="text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1 cursor-pointer bg-purple-50 px-3 py-1.5 rounded-xl"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>إضافة أو تعديل روابط التحميل</span>
                      </button>
                    )}
                  </div>

                  {activeActionModal.action.downloadFiles && activeActionModal.action.downloadFiles.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeActionModal.action.downloadFiles.map((file, fIdx) => (
                        <div
                          key={file.id || fIdx}
                          className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-purple-300 hover:shadow-xs transition space-y-3 flex flex-col justify-between"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                              <FileDown className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="font-black text-xs sm:text-sm text-slate-900 line-clamp-2">
                                {file.title}
                              </h5>
                              <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 font-bold">
                                {file.size && <span>الحجم: {file.size}</span>}
                                {file.year && <span>• {file.year}</span>}
                                <span className="uppercase text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">
                                  {file.fileType || "PDF"}
                                </span>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => handleTriggerDownload(file)}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition shadow-2xs cursor-pointer"
                          >
                            <Download className="w-4 h-4" />
                            <span>تحميل المستند الآن</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                      <FileDown className="w-10 h-10 text-slate-400 mx-auto" />
                      <p className="text-xs text-slate-500 font-bold">
                        لم يتم إرفاق ملفات تحميل مستقلة بعد.
                      </p>
                      {isEditActive && (
                        <button
                          onClick={() => {
                            setEditingAction({
                              subjectId: activeActionModal.subject.id,
                              action: activeActionModal.action,
                              isNew: false,
                            });
                          }}
                          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-xs font-bold"
                        >
                          إضافة روابط تحميل جديدة
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* 3. Images Gallery Tab */}
              {modalTab === "images" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-emerald-600" />
                      <h4 className="font-black text-sm text-slate-900">
                        الخطاطات والصور التوضيحية المرفقة:
                      </h4>
                    </div>
                    {isEditActive && (
                      <button
                        onClick={() => {
                          setEditingAction({
                            subjectId: activeActionModal.subject.id,
                            action: activeActionModal.action,
                            isNew: false,
                          });
                        }}
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer bg-emerald-50 px-3 py-1.5 rounded-xl"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>إضافة أو تعديل الصور والخطاطات</span>
                      </button>
                    )}
                  </div>

                  {activeActionModal.action.images && activeActionModal.action.images.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {activeActionModal.action.images.map((img, imgIdx) => (
                        <div
                          key={img.id || imgIdx}
                          className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition group"
                        >
                          <div
                            onClick={() =>
                              setZoomedImage({
                                url: img.url,
                                title: img.title,
                                caption: img.caption,
                              })
                            }
                            className="aspect-video bg-slate-950 flex items-center justify-center relative cursor-zoom-in overflow-hidden"
                          >
                            <img
                              src={img.url}
                              alt={img.title || "صورة توضيحية"}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-contain group-hover:scale-105 transition duration-300"
                            />
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white gap-2">
                              <ZoomIn className="w-6 h-6" />
                              <span className="text-xs font-bold">تكبير الصورة</span>
                            </div>
                          </div>

                          <div className="p-3.5 space-y-1 bg-white">
                            {img.title && (
                              <h5 className="font-black text-xs text-slate-900">{img.title}</h5>
                            )}
                            {img.caption && (
                              <p className="text-[11px] text-slate-500 leading-relaxed">
                                {img.caption}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                      <ImageIcon className="w-10 h-10 text-slate-400 mx-auto" />
                      <p className="text-xs text-slate-500 font-bold">
                        لم يتم إرفاق صور أو خطاطات توضيحية لهذا المحور بعد.
                      </p>
                      {isEditActive && (
                        <button
                          onClick={() => {
                            setEditingAction({
                              subjectId: activeActionModal.subject.id,
                              action: activeActionModal.action,
                              isNew: false,
                            });
                          }}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold"
                        >
                          إضافة خطاطات وصور توضيحية
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* 4. Summary Tab */}
              {modalTab === "summary" && (
                <div className="space-y-5">
                  <div className="bg-purple-50/70 border border-purple-200/80 rounded-2xl p-5 space-y-2">
                    <h4 className="font-black text-sm text-purple-950 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      <span>الملخص الديداكتيكي والتوجيهي:</span>
                    </h4>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-700">
                      {activeActionModal.action.contentSummary ||
                        "لم يتم تحديد ملخص لهذا المكون بعد. يمكنك النقر على زر التعديل لإضافة ملخص وشرح تفصيلي."}
                    </p>
                  </div>

                  {/* Direct link if available */}
                  {activeActionModal.action.customUrl &&
                    activeActionModal.action.customUrl !== "#" && (
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                          <ExternalLink className="w-4 h-4 text-purple-600" />
                          <span>رابط مباشر للموضوع على مدونة ProfPress:</span>
                        </div>
                        <a
                          href={activeActionModal.action.customUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1"
                        >
                          <span>فتح الرابط</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                </div>
              )}

              {/* 5. QCM Quiz Tab */}
              {modalTab === "qcm" && (
                <div className="space-y-6">
                  {activeActionModal.action.qcmQuestions &&
                  activeActionModal.action.qcmQuestions.length > 0 ? (
                    <div className="space-y-6">
                      {/* QCM Header */}
                      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <HelpCircle className="w-5 h-5 text-purple-600" />
                          <span className="font-black text-xs sm:text-sm text-purple-950">
                            اختبار ديداكتيكي في {activeActionModal.subject.title} - (
                            {activeActionModal.action.qcmQuestions.length} أسئلة)
                          </span>
                        </div>
                        <span className="text-xs bg-purple-200/70 text-purple-900 font-black px-2.5 py-0.5 rounded-full">
                          السؤال {currentQcmIdx + 1} من {activeActionModal.action.qcmQuestions.length}
                        </span>
                      </div>

                      {/* Current Question */}
                      {(() => {
                        const q = activeActionModal.action.qcmQuestions![currentQcmIdx];
                        const selected = selectedAnswers[currentQcmIdx];
                        const isAnswered = selected !== undefined;
                        const isCorrect = selected === q.correctIndex;

                        return (
                          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5 shadow-2xs">
                            <h4 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                              {currentQcmIdx + 1}. {q.question}
                            </h4>

                            {/* Options */}
                            <div className="space-y-2.5">
                              {q.options.map((opt, optIdx) => {
                                const isThisSelected = selected === optIdx;
                                const isThisCorrect = q.correctIndex === optIdx;

                                let btnStyle =
                                  "border-slate-200 hover:border-purple-400 hover:bg-purple-50/40 text-slate-800";

                                if (showQcmResults || isAnswered) {
                                  if (isThisCorrect) {
                                    btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold";
                                  } else if (isThisSelected && !isThisCorrect) {
                                    btnStyle = "bg-rose-50 border-rose-500 text-rose-950 font-bold";
                                  } else {
                                    btnStyle = "border-slate-100 text-slate-400 opacity-60";
                                  }
                                }

                                return (
                                  <button
                                    key={optIdx}
                                    type="button"
                                    onClick={() => {
                                      if (!showQcmResults) {
                                        setSelectedAnswers({
                                          ...selectedAnswers,
                                          [currentQcmIdx]: optIdx,
                                        });
                                      }
                                    }}
                                    className={`w-full text-right p-3.5 rounded-xl border text-xs sm:text-sm transition flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                                  >
                                    <div className="flex items-center gap-3">
                                      <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-xs">
                                        {optIdx + 1}
                                      </span>
                                      <span>{opt}</span>
                                    </div>

                                    {(showQcmResults || isAnswered) && (
                                      <div>
                                        {isThisCorrect && (
                                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                        )}
                                        {isThisSelected && !isThisCorrect && (
                                          <X className="w-4 h-4 text-rose-600" />
                                        )}
                                      </div>
                                    )}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Explanation */}
                            {(showQcmResults || isAnswered) && q.explanation && (
                              <div className="bg-slate-50 border-r-4 border-purple-500 p-3.5 rounded-r-xl rounded-l-lg text-xs text-slate-700 space-y-1">
                                <span className="font-bold text-purple-900 block">💡 التعليل الديداكتيكي:</span>
                                <p className="leading-relaxed">{q.explanation}</p>
                              </div>
                            )}

                            {/* Question Navigation */}
                            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                              <button
                                type="button"
                                disabled={currentQcmIdx === 0}
                                onClick={() => setCurrentQcmIdx(currentQcmIdx - 1)}
                                className="bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                              >
                                <ChevronRight className="w-4 h-4" />
                                <span>السابق</span>
                              </button>

                              {currentQcmIdx < activeActionModal.action.qcmQuestions!.length - 1 ? (
                                <button
                                  type="button"
                                  onClick={() => setCurrentQcmIdx(currentQcmIdx + 1)}
                                  className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                                >
                                  <span>التالي</span>
                                  <ChevronLeft className="w-4 h-4" />
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setShowQcmResults(true)}
                                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-xl text-xs font-black flex items-center gap-1 cursor-pointer shadow-xs"
                                >
                                  <CheckSquare className="w-4 h-4" />
                                  <span>عرض النتيجة النهائية</span>
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  ) : (
                    <div className="text-center py-10 space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                      <Laptop className="w-10 h-10 text-slate-400 mx-auto" />
                      <p className="text-xs text-slate-500 font-bold">
                        لم تتم إضافة أسئلة QCM لهذا المكون بعد.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* 7. ADMIN MODALS: EDIT SPECS, EDIT SUBJECT, EDIT ACTION, EDIT DOWNLOAD   */}
      {/* ====================================================================== */}

      {/* A. Edit Specs Modal */}
      {editingSpecs && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto font-cairo">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 space-y-5 shadow-2xl border border-slate-200 text-right">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-purple-600" />
                <span>تعديل معطيات التوصيف الرسمي للاختبار</span>
              </h3>
              <button
                onClick={() => setEditingSpecs(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">مدة الإنجاز:</label>
                <input
                  type="text"
                  value={editingSpecsForm.duration}
                  onChange={(e) =>
                    setEditingSpecsForm({ ...editingSpecsForm, duration: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                  placeholder="مثال: 4 ساعات"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">المعامل:</label>
                <input
                  type="text"
                  value={editingSpecsForm.coefficient}
                  onChange={(e) =>
                    setEditingSpecsForm({ ...editingSpecsForm, coefficient: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                  placeholder="مثال: 2*"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">المكون الأعلى وزناً:</label>
                <input
                  type="text"
                  value={editingSpecsForm.highestWeight}
                  onChange={(e) =>
                    setEditingSpecsForm({ ...editingSpecsForm, highestWeight: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                  placeholder="مثال: العربية والفرنسية (%30)"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">المكون الأقل وزناً:</label>
                <input
                  type="text"
                  value={editingSpecsForm.lowestWeight}
                  onChange={(e) =>
                    setEditingSpecsForm({ ...editingSpecsForm, lowestWeight: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                  placeholder="مثال: النشاط العلمي (%12)"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingSpecs(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={() => {
                  handleSaveData({ ...data, specs: editingSpecsForm });
                  setEditingSpecs(false);
                  showToast("تم تحديث معطيات التوصيف بنجاح!");
                }}
                className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2 rounded-xl text-xs font-black shadow-xs cursor-pointer"
              >
                حفظ التغييرات
              </button>
            </div>
          </div>
        </div>
      )}

      {/* B. Edit Subject Modal */}
      {editingSubject && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto font-cairo">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 space-y-5 shadow-2xl border border-slate-200 text-right">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-purple-600" />
                <span>{isNewSubject ? "إضافة مادة جديدة" : `تعديل مادة: ${editingSubject.title}`}</span>
              </h3>
              <button
                onClick={() => setEditingSubject(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">اسم المادة:</label>
                <input
                  type="text"
                  value={editingSubject.title}
                  onChange={(e) =>
                    setEditingSubject({ ...editingSubject, title: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                  placeholder="مثال: ديداكتيك اللغة العربية"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">شارة الوزن:</label>
                <input
                  type="text"
                  value={editingSubject.weightBadge}
                  onChange={(e) =>
                    setEditingSubject({ ...editingSubject, weightBadge: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                  placeholder="مثال: وزن المكون: 30%"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">النمط اللوني:</label>
                <select
                  value={editingSubject.colorScheme || "emerald"}
                  onChange={(e) =>
                    setEditingSubject({
                      ...editingSubject,
                      colorScheme: e.target.value as any,
                    })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                >
                  <option value="emerald">أخضر (Emerald - العربية)</option>
                  <option value="blue">أزرق (Blue - الفرنسية)</option>
                  <option value="amber">برتقالي / كهرماني (Amber - الرياضيات)</option>
                  <option value="purple">بنفسجي (Purple - النشاط العلمي)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              {!isNewSubject && (
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("هل أنت متأكد من حذف هذه المادة؟")) {
                      handleSaveData({
                        ...data,
                        subjects: data.subjects.filter((s) => s.id !== editingSubject.id),
                      });
                      setEditingSubject(null);
                      showToast("تم حذف المادة بنجاح!");
                    }
                  }}
                  className="text-rose-600 hover:text-rose-700 text-xs font-bold flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>حذف المادة</span>
                </button>
              )}

              <div className="flex items-center gap-2 mr-auto">
                <button
                  type="button"
                  onClick={() => setEditingSubject(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  onClick={() => {
                    let updatedSubjects: PrimarySubjectCard[];
                    if (isNewSubject) {
                      updatedSubjects = [...data.subjects, editingSubject];
                    } else {
                      updatedSubjects = data.subjects.map((s) =>
                        s.id === editingSubject.id ? editingSubject : s
                      );
                    }
                    handleSaveData({ ...data, subjects: updatedSubjects });
                    setEditingSubject(null);
                    showToast("تم حفظ بيانات المادة بنجاح!");
                  }}
                  className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2 rounded-xl text-xs font-black shadow-xs cursor-pointer"
                >
                  حفظ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* C. Subject Action Editor Modal (Articles, HTML, Images, Downloads, QCM) */}
      {editingAction && (
        <SubjectActionEditorModal
          isOpen={true}
          subjectId={editingAction.subjectId}
          action={editingAction.action}
          isNew={editingAction.isNew}
          onClose={() => setEditingAction(null)}
          onSave={(savedAction) => {
            const updatedSubjects = data.subjects.map((sub) => {
              if (sub.id !== editingAction.subjectId) return sub;
              let updatedActions: PrimarySubjectAction[];
              if (editingAction.isNew) {
                updatedActions = [...sub.actions, savedAction];
              } else {
                updatedActions = sub.actions.map((act) =>
                  act.id === savedAction.id ? savedAction : act
                );
              }
              return { ...sub, actions: updatedActions };
            });

            handleSaveData({ ...data, subjects: updatedSubjects });
            if (activeActionModal && activeActionModal.action.id === savedAction.id) {
              setActiveActionModal({
                ...activeActionModal,
                action: savedAction,
              });
            }
            setEditingAction(null);
            showToast("تم حفظ وتحديث المقال والمرفقات بنجاح!");
          }}
          onDelete={(actionId) => {
            const updatedSubjects = data.subjects.map((sub) => {
              if (sub.id !== editingAction.subjectId) return sub;
              return {
                ...sub,
                actions: sub.actions.filter((act) => act.id !== actionId),
              };
            });

            handleSaveData({ ...data, subjects: updatedSubjects });
            if (activeActionModal && activeActionModal.action.id === actionId) {
              setActiveActionModal(null);
            }
            setEditingAction(null);
            showToast("تم حذف البطاقة بنجاح!");
          }}
        />
      )}

      {/* D. Edit Image Banner Modal */}
      {editingImageBanner && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto font-cairo">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 space-y-5 shadow-2xl border border-slate-200 text-right">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-purple-600" />
                <span>
                  {editingImageBanner.isNew ? "إضافة خطاطة جديدة" : "تعديل الخطاطة"}
                </span>
              </h3>
              <button
                onClick={() => setEditingImageBanner(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">عنوان الخطاطة:</label>
                <input
                  type="text"
                  value={editingImageBanner.banner.title}
                  onChange={(e) =>
                    setEditingImageBanner({
                      ...editingImageBanner,
                      banner: { ...editingImageBanner.banner, title: e.target.value },
                    })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">رابط الصورة (Image URL):</label>
                <input
                  type="text"
                  value={editingImageBanner.banner.imageUrl}
                  onChange={(e) =>
                    setEditingImageBanner({
                      ...editingImageBanner,
                      banner: { ...editingImageBanner.banner, imageUrl: e.target.value },
                    })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-left font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">وصف توضيحي للخطاطة:</label>
                <textarea
                  rows={2}
                  value={editingImageBanner.banner.caption || ""}
                  onChange={(e) =>
                    setEditingImageBanner({
                      ...editingImageBanner,
                      banner: { ...editingImageBanner.banner, caption: e.target.value },
                    })
                  }
                  className="w-full border border-slate-300 rounded-xl p-3 text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              {!editingImageBanner.isNew && (
                <button
                  type="button"
                  onClick={() => {
                    handleSaveData({
                      ...data,
                      imageBanners: data.imageBanners.filter(
                        (b) => b.id !== editingImageBanner.banner.id
                      ),
                    });
                    setEditingImageBanner(null);
                    showToast("تم حذف الخطاطة بنجاح!");
                  }}
                  className="text-rose-600 hover:text-rose-700 text-xs font-bold flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>حذف الخطاطة</span>
                </button>
              )}

              <div className="flex items-center gap-2 mr-auto">
                <button
                  type="button"
                  onClick={() => setEditingImageBanner(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  onClick={() => {
                    let updatedBanners: PrimaryImageBanner[];
                    if (editingImageBanner.isNew) {
                      updatedBanners = [...data.imageBanners, editingImageBanner.banner];
                    } else {
                      updatedBanners = data.imageBanners.map((b) =>
                        b.id === editingImageBanner.banner.id ? editingImageBanner.banner : b
                      );
                    }
                    handleSaveData({ ...data, imageBanners: updatedBanners });
                    setEditingImageBanner(null);
                    showToast("تم حفظ الخطاطة بنجاح!");
                  }}
                  className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2 rounded-xl text-xs font-black shadow-xs cursor-pointer"
                >
                  حفظ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* E. Edit Download File Modal */}
      {editingDownloadFile && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto font-cairo">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 space-y-5 shadow-2xl border border-slate-200 text-right">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <FileDown className="w-4 h-4 text-purple-600" />
                <span>
                  {editingDownloadFile.isNew ? "إضافة ملف تحميل جديد" : "تعديل ملف التحميل"}
                </span>
              </h3>
              <button
                onClick={() => setEditingDownloadFile(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">عنوان الملف:</label>
                <input
                  type="text"
                  value={editingDownloadFile.file.title}
                  onChange={(e) =>
                    setEditingDownloadFile({
                      ...editingDownloadFile,
                      file: { ...editingDownloadFile.file, title: e.target.value },
                    })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">الحجم:</label>
                  <input
                    type="text"
                    value={editingDownloadFile.file.size}
                    onChange={(e) =>
                      setEditingDownloadFile({
                        ...editingDownloadFile,
                        file: { ...editingDownloadFile.file, size: e.target.value },
                      })
                    }
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">السنة / التصنيف:</label>
                  <input
                    type="text"
                    value={editingDownloadFile.file.year}
                    onChange={(e) =>
                      setEditingDownloadFile({
                        ...editingDownloadFile,
                        file: { ...editingDownloadFile.file, year: e.target.value },
                      })
                    }
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">رابط التحميل المباشر:</label>
                <input
                  type="text"
                  value={editingDownloadFile.file.url}
                  onChange={(e) =>
                    setEditingDownloadFile({
                      ...editingDownloadFile,
                      file: { ...editingDownloadFile.file, url: e.target.value },
                    })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-left font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              {!editingDownloadFile.isNew && (
                <button
                  type="button"
                  onClick={() => {
                    handleSaveData({
                      ...data,
                      downloadFiles: data.downloadFiles.filter(
                        (f) => f.id !== editingDownloadFile.file.id
                      ),
                    });
                    setEditingDownloadFile(null);
                    showToast("تم حذف ملف التحميل بنجاح!");
                  }}
                  className="text-rose-600 hover:text-rose-700 text-xs font-bold flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>حذف الملف</span>
                </button>
              )}

              <div className="flex items-center gap-2 mr-auto">
                <button
                  type="button"
                  onClick={() => setEditingDownloadFile(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  onClick={() => {
                    let updatedFiles: PrimaryDownloadFile[];
                    if (editingDownloadFile.isNew) {
                      updatedFiles = [...data.downloadFiles, editingDownloadFile.file];
                    } else {
                      updatedFiles = data.downloadFiles.map((f) =>
                        f.id === editingDownloadFile.file.id ? editingDownloadFile.file : f
                      );
                    }
                    handleSaveData({ ...data, downloadFiles: updatedFiles });
                    setEditingDownloadFile(null);
                    showToast("تم حفظ ملف التحميل بنجاح!");
                  }}
                  className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2 rounded-xl text-xs font-black shadow-xs cursor-pointer"
                >
                  حفظ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* F. Fullscreen Image Viewer Modal */}
      {viewingImage && (
        <div
          onClick={() => setViewingImage(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer animate-in fade-in font-cairo"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl overflow-hidden max-w-4xl max-h-[90vh] flex flex-col shadow-2xl cursor-default text-right"
          >
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <span className="font-bold text-sm">{viewingImage.title}</span>
              <button
                onClick={() => setViewingImage(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-2 overflow-auto flex items-center justify-center bg-slate-950">
              <img
                src={viewingImage.imageUrl}
                alt={viewingImage.title}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto object-contain rounded-xl"
              />
            </div>
            {viewingImage.caption && (
              <div className="p-4 bg-white text-xs text-slate-700 text-right">
                {viewingImage.caption}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Zoomed Image Lightbox */}
      {zoomedImage && (
        <div 
          onClick={() => setZoomedImage(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-cairo"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 rounded-3xl max-w-4xl w-full border border-slate-700 shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-white">
              <div>
                <h4 className="font-black text-sm sm:text-base">{zoomedImage.title || "عرض الصورة"}</h4>
                {zoomedImage.caption && (
                  <p className="text-xs text-slate-400 mt-0.5">{zoomedImage.caption}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={zoomedImage.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>تحميل الصورة</span>
                </a>
                <button
                  onClick={() => setZoomedImage(null)}
                  className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-2 sm:p-4 bg-slate-950 flex items-center justify-center min-h-[300px] max-h-[75vh] overflow-auto">
              <img
                src={zoomedImage.url}
                alt={zoomedImage.title || "معاينة الصورة"}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto object-contain rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* Download Gateway Modal */}
      <DownloadGatewayModal
        isOpen={gatewayFile.isOpen}
        onClose={() => setGatewayFile({ ...gatewayFile, isOpen: false })}
        fileTitle={gatewayFile.title}
        downloadUrl={gatewayFile.url}
        fileType={gatewayFile.type}
        fileSize={gatewayFile.size}
      />
    </div>
  );
};
