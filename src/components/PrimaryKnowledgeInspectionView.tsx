import React, { useState, useEffect } from "react";
import {
  DEFAULT_PRIMARY_KNOWLEDGE_DATA,
  PrimaryKnowledgePageData,
  PrimarySubjectCard,
  PrimarySubjectAction,
  PrimaryDownloadFile,
  PrimaryImageBanner,
  PrimaryExamSpec,
} from "../data/primaryKnowledgeData";
import { AdminSession } from "../types";
import { getStoredAdminSession, ADMIN_SESSION_EVENT } from "../utils/adminAuth";
import { getDownloadGatewaySettings, DOWNLOAD_GATEWAY_EVENT } from "../utils/downloadGatewaySettings";
import { DownloadGatewayModal } from "./DownloadGatewayModal";
import { ArticleHtmlRenderer } from "./ArticleHtmlRenderer";
import { RichArticleEditor } from "./RichArticleEditor";
import { ArabicInspection105QuizModal } from "./ArabicInspection105QuizModal";
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
} from "lucide-react";

interface Props {
  onBackToAllTracks?: () => void;
  onNavigateToDidactique?: () => void;
}

export const PrimaryKnowledgeInspectionView: React.FC<Props> = ({
  onBackToAllTracks,
  onNavigateToDidactique,
}) => {
  // 1. Local Storage Persistence
  const [data, setData] = useState<PrimaryKnowledgePageData>(() => {
    try {
      const saved = localStorage.getItem("profpress_primary_knowledge_data_v1");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load primary knowledge data from storage", e);
    }
    return DEFAULT_PRIMARY_KNOWLEDGE_DATA;
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
  const handleSaveData = (newData: PrimaryKnowledgePageData) => {
    setData(newData);
    try {
      localStorage.setItem("profpress_primary_knowledge_data_v1", JSON.stringify(newData));
    } catch (e) {
      console.error("Failed to save primary knowledge data", e);
    }
  };

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Active Subject Action Modal (Reading / QCM / Downloads)
  const [activeActionModal, setActiveActionModal] = useState<{
    subject: PrimarySubjectCard;
    action: PrimarySubjectAction;
  } | null>(null);

  const [modalTab, setModalTab] = useState<"summary" | "article" | "qcm">("summary");

  // QCM Interactive state
  const [currentQcmIdx, setCurrentQcmIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showQcmResults, setShowQcmResults] = useState(false);

  // Download Gateway state
  const [gatewaySettings, setGatewaySettings] = useState(getDownloadGatewaySettings);
  const [isArabic105QuizOpen, setIsArabic105QuizOpen] = useState(false);
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
    const handleSettingsUpdate = () => {
      setGatewaySettings(getDownloadGatewaySettings());
    };
    window.addEventListener(DOWNLOAD_GATEWAY_EVENT, handleSettingsUpdate);
    return () => window.removeEventListener(DOWNLOAD_GATEWAY_EVENT, handleSettingsUpdate);
  }, []);

  // Admin Editing Modals
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
    image: PrimaryImageBanner;
    isNew: boolean;
  } | null>(null);

  const [viewingImage, setViewingImage] = useState<PrimaryImageBanner | null>(null);

  // Icon helper
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
      case "Download":
        return <Download className={className} />;
      case "ImageIcon":
        return <ImageIcon className={className} />;
      default:
        return <BookOpen className={className} />;
    }
  };

  // Color theme mappings matching exact screenshots
  const getSubjectTheme = (color: string) => {
    switch (color) {
      case "blue":
        return {
          headerBg: "bg-[#f4f7fb]",
          headerBorder: "border-blue-100",
          badgeBg: "bg-blue-100 text-blue-800",
          iconCircleBg: "bg-white text-blue-600 shadow-xs",
          cardBorder: "border-gray-200 hover:border-blue-500 hover:shadow-md",
          iconColor: "text-blue-500",
          buttonBg: "bg-blue-600 hover:bg-blue-700 text-white",
          accentColor: "blue",
        };
      case "indigo":
        return {
          headerBg: "bg-[#f4f7fb]",
          headerBorder: "border-indigo-100",
          badgeBg: "bg-indigo-100 text-indigo-800",
          iconCircleBg: "bg-white text-indigo-600 shadow-xs",
          cardBorder: "border-gray-200 hover:border-indigo-500 hover:shadow-md",
          iconColor: "text-indigo-500",
          buttonBg: "bg-indigo-600 hover:bg-indigo-700 text-white",
          accentColor: "indigo",
        };
      case "cyan":
        return {
          headerBg: "bg-[#f4f7fb]",
          headerBorder: "border-cyan-100",
          badgeBg: "bg-cyan-100 text-cyan-800",
          iconCircleBg: "bg-white text-cyan-600 shadow-xs",
          cardBorder: "border-gray-200 hover:border-cyan-500 hover:shadow-md",
          iconColor: "text-cyan-500",
          buttonBg: "bg-cyan-600 hover:bg-cyan-700 text-white",
          accentColor: "cyan",
        };
      case "emerald":
        return {
          headerBg: "bg-[#f4f7fb]",
          headerBorder: "border-emerald-100",
          badgeBg: "bg-emerald-100 text-emerald-800",
          iconCircleBg: "bg-white text-emerald-600 shadow-xs",
          cardBorder: "border-gray-200 hover:border-emerald-500 hover:shadow-md",
          iconColor: "text-emerald-500",
          buttonBg: "bg-emerald-600 hover:bg-emerald-700 text-white",
          accentColor: "emerald",
        };
      default:
        return {
          headerBg: "bg-[#f4f7fb]",
          headerBorder: "border-slate-100",
          badgeBg: "bg-slate-100 text-slate-800",
          iconCircleBg: "bg-white text-slate-600 shadow-xs",
          cardBorder: "border-gray-200 hover:border-slate-500 hover:shadow-md",
          iconColor: "text-slate-500",
          buttonBg: "bg-slate-800 hover:bg-slate-900 text-white",
          accentColor: "slate",
        };
    }
  };

  // Action Click Handler
  const handleActionClick = (subject: PrimarySubjectCard, action: PrimarySubjectAction) => {
    // If it's the Arabic quiz, open the dedicated 105-question quiz modal
    if (action.id === "ar_quiz" || (subject.id === "subject_arabic" && action.title.includes("اختبار تجريبي"))) {
      if (!isEditActive) {
        setIsArabic105QuizOpen(true);
        return;
      }
    }

    // If external link defined and not editing
    if (action.customUrl && action.customUrl !== "#" && !isEditActive) {
      if (action.customUrl.startsWith("http")) {
        window.open(action.customUrl, "_blank", "noopener,noreferrer");
        return;
      }
    }

    setActiveActionModal({ subject, action });
    setModalTab(action.qcmQuestions && action.qcmQuestions.length > 0 ? "qcm" : "summary");
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
    if (window.confirm("هل أنت متأكد من رغبتك في استعادة الإعدادات الافتراضية لصفحة معارف الابتدائي؟")) {
      handleSaveData(DEFAULT_PRIMARY_KNOWLEDGE_DATA);
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
      {/* TOP ADMIN CONTROL BAR                                                   */}
      {/* ====================================================================== */}
      <div className="bg-slate-900 text-white p-3 sm:p-4 rounded-2xl shadow-sm border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black text-amber-300">
                إدارة محتوى صفحة اختبار المعارف (الابتدائي)
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                تصميم مطابق لـ ProfPress
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              إمكانية تعديل معطيات التوصيف، المواد الأربعة، الروابط، الصور، والملفات
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {onNavigateToDidactique && (
            <button
              onClick={onNavigateToDidactique}
              className="bg-purple-800/80 hover:bg-purple-700 text-purple-100 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer border border-purple-600/50"
              title="الانتقال إلى ديداكتيك تفتيش التعليم الابتدائي"
            >
              <School className="w-3.5 h-3.5" />
              <span>ديداكتيك الابتدائي (ProfPress)</span>
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
                onClick={() => {
                  setEditingDownloadFile({
                    file: {
                      id: `dl_${Date.now()}`,
                      title: "",
                      size: "2.5 MB",
                      year: "2024",
                      url: "",
                      fileType: "pdf",
                    },
                    isNew: true,
                  });
                }}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة ملف تحميل</span>
              </button>

              <button
                onClick={() => {
                  setEditingImageBanner({
                    image: {
                      id: `img_${Date.now()}`,
                      title: "",
                      imageUrl: "",
                      caption: "",
                    },
                    isNew: true,
                  });
                }}
                className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer shadow-xs"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>إضافة صورة / ملصق</span>
              </button>

              <button
                onClick={handleResetDefaults}
                className="bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-rose-200 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                title="استعادة البيانات الأصلية"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>استعادة الافتراضي</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* ====================================================================== */}
      {/* 1. معطيات التوصيف الرسمي للاختبار (Exact Match of Screenshot 3)         */}
      {/* ====================================================================== */}
      <div
        id="official-spec-card"
        className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs relative"
      >
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-5">
          <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <Info className="w-5 h-5 text-slate-500" />
            <span>معطيات التوصيف الرسمي للاختبار</span>
          </h3>

          {isEditActive && (
            <button
              onClick={() => {
                setEditingSpecsForm(data.specs);
                setEditingSpecs(true);
              }}
              className="bg-white hover:bg-slate-100 text-blue-600 border border-blue-200 px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>تعديل المعطيات</span>
            </button>
          )}
        </div>

        {/* 4 Official Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 text-center">
          {/* 1. مدة الإنجاز */}
          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-100 shadow-2xs flex flex-col items-center justify-center">
            <span className="block text-xs text-slate-500 font-medium mb-1.5">مدة الإنجاز</span>
            <strong className="text-slate-800 text-sm sm:text-base font-black flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>{data.specs.duration}</span>
            </strong>
          </div>

          {/* 2. المعامل */}
          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-100 shadow-2xs flex flex-col items-center justify-center">
            <span className="block text-xs text-slate-500 font-medium mb-1.5">المعامل</span>
            <strong className="text-slate-800 text-sm sm:text-base font-black flex items-center gap-1.5">
              <Asterisk className="w-4 h-4 text-blue-500" />
              <span>{data.specs.coefficient}</span>
            </strong>
          </div>

          {/* 3. أعلى وزن */}
          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-100 shadow-2xs flex flex-col items-center justify-center">
            <span className="block text-xs text-slate-500 font-medium mb-1.5">أعلى وزن</span>
            <strong className="text-slate-800 text-xs sm:text-sm font-black flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="leading-tight">{data.specs.highestWeight}</span>
            </strong>
          </div>

          {/* 4. أدنى وزن */}
          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-100 shadow-2xs flex flex-col items-center justify-center">
            <span className="block text-xs text-slate-500 font-medium mb-1.5">أدنى وزن</span>
            <strong className="text-slate-800 text-xs sm:text-sm font-black flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-orange-500 shrink-0" />
              <span className="leading-tight">{data.specs.lowestWeight}</span>
            </strong>
          </div>
        </div>
      </div>

      {/* ====================================================================== */}
      {/* 2. THE 4 SUBJECT CARDS (Exact match of Screenshots 1, 2, 3)             */}
      {/* ====================================================================== */}
      <div className="space-y-6 sm:space-y-8">
        {data.subjects.map((subject, sIdx) => {
          const theme = getSubjectTheme(subject.colorScheme);

          return (
            <div
              key={subject.id}
              id={`primary-subject-${subject.id}`}
              className="border border-gray-200 rounded-2xl overflow-hidden shadow-2xs bg-white"
            >
              {/* Subject Header (Identical to screenshots) */}
              <div
                className={`${theme.headerBg} px-5 sm:px-6 py-4 flex items-center justify-between border-b ${theme.headerBorder}`}
              >
                {/* Right: Icon circle + Title (RTL: appears on right side) */}
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${theme.iconCircleBg}`}>
                    {renderIcon(subject.iconName, "w-5 h-5")}
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-[#1e293b]">
                    {subject.title}
                  </h2>
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

                  <span className={`text-xs font-bold ${theme.badgeBg} px-3.5 py-1 rounded-full`}>
                    {subject.weightBadge}
                  </span>
                </div>
              </div>

              {/* 5 Action Buttons (Grid of 5 matching screenshots) */}
              <div className="p-4 sm:p-6 bg-white">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
                  {subject.actions.map((act) => (
                    <div
                      key={act.id}
                      onClick={() => handleActionClick(subject, act)}
                      className={`group flex flex-col items-center justify-center p-4 border rounded-xl transition-all text-center cursor-pointer relative bg-white ${theme.cardBorder}`}
                    >
                      {/* Admin edit button on top of action card */}
                      {isEditActive && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingAction({
                              subjectId: subject.id,
                              action: act,
                              isNew: false,
                            });
                          }}
                          className="absolute top-1.5 left-1.5 bg-slate-100 hover:bg-white text-slate-700 p-1 rounded-md text-[10px] border border-slate-200 cursor-pointer shadow-2xs z-10"
                          title="تعديل هذا المكون والروابط"
                        >
                          <Edit3 className="w-3 h-3 text-blue-600" />
                        </button>
                      )}

                      {/* Icon */}
                      <div
                        className={`${theme.iconColor} text-3xl mb-3 group-hover:scale-110 transition-transform`}
                      >
                        {renderIcon(act.iconName, "w-8 h-8 sm:w-9 sm:h-9")}
                      </div>

                      {/* Title */}
                      <span className="font-black text-gray-800 text-xs sm:text-sm">
                        {act.title}
                      </span>

                      {/* Custom external link hint if present */}
                      {act.customUrl && act.customUrl !== "#" && (
                        <span className="text-[10px] text-blue-600 flex items-center gap-0.5 mt-1 font-bold">
                          <ExternalLink className="w-2.5 h-2.5" />
                          <span>رابط مباشر</span>
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Optional add action if edit active */}
                {isEditActive && (
                  <div className="mt-3 pt-3 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={() => {
                        setEditingAction({
                          subjectId: subject.id,
                          action: {
                            id: `act_${Date.now()}`,
                            title: "مكون جديد",
                            iconName: "FileText",
                            contentSummary: "ملخص المحتوى الجديد",
                          },
                          isNew: true,
                        });
                      }}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ إضافة بطاقة جديدة لهذه المادة</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ====================================================================== */}
      {/* 3. الملفات الرسمية ونماذج التحميل المعتمدة (PDF) (Screenshot 4)        */}
      {/* ====================================================================== */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-base sm:text-lg font-black text-[#1e293b] flex items-center gap-2">
            <FileDown className="w-5 h-5 text-blue-600" />
            <span>الملفات الرسمية ونماذج التحميل المعتمدة (PDF)</span>
          </h3>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setEditingDownloadFile({
                  file: {
                    id: `dl_${Date.now()}`,
                    title: "",
                    size: "2.5 MB",
                    year: "2024",
                    url: "",
                    fileType: "pdf",
                  },
                  isNew: true,
                });
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer transition"
              title="إضافة وتعديل روابط ملفات التحميل"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة / تعديل ملفات التحميل</span>
            </button>
          </div>
        </div>

        {/* 2-Column Responsive Download Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.downloads.map((file) => (
            <div
              key={file.id}
              className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 shadow-2xs hover:border-blue-300 transition relative group"
            >
              {/* Right Side: Title & Meta info (RTL) */}
              <div className="space-y-1.5 flex-1">
                <h4 className="font-black text-slate-800 text-xs sm:text-sm leading-snug">
                  {file.title}
                </h4>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                  <span>الحجم: {file.size}</span>
                  <span>•</span>
                  <span>السنة: {file.year}</span>
                  {file.url && file.url !== "#" && (
                    <>
                      <span>•</span>
                      <span className="text-emerald-600 font-bold">رابط مخصص</span>
                    </>
                  )}
                </div>
              </div>

              {/* Left Side: Blue Download Button & Edit Controls */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    setEditingDownloadFile({
                      file: file,
                      isNew: false,
                    })
                  }
                  className="bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 p-2 rounded-xl text-xs transition cursor-pointer border border-slate-200"
                  title="تعديل هذا الرابط والمعطيات"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleTriggerDownload(file)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs transition active:scale-95 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>تحميل</span>
                </button>

                {isEditActive && (
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`هل أنت متأكد من حذف ملف: "${file.title}"؟`)) {
                        const updated = data.downloads.filter((d) => d.id !== file.id);
                        handleSaveData({ ...data, downloads: updated });
                        showToast("تم حذف ملف التحميل بنجاح!");
                      }
                    }}
                    className="bg-rose-50 hover:bg-rose-100 text-rose-600 p-2 rounded-xl text-xs transition cursor-pointer"
                    title="حذف الملف"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ====================================================================== */}
      {/* 4. GALLERY & INFOGRAPHICS SECTION (Added upon request)                 */}
      {/* ====================================================================== */}
      {data.images && data.images.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-purple-600" />
              <span>الرسوم التوضيحية والخرائط الذهنية المعتمدة</span>
            </h3>

            {isEditActive && (
              <button
                onClick={() => {
                  setEditingImageBanner({
                    image: {
                      id: `img_${Date.now()}`,
                      title: "",
                      imageUrl: "",
                      caption: "",
                    },
                    isNew: true,
                  });
                }}
                className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة صورة جديدة</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.images.map((img) => (
              <div
                key={img.id}
                onClick={() => setViewingImage(img)}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition cursor-pointer group relative"
              >
                <div className="h-48 bg-slate-100 overflow-hidden flex items-center justify-center relative">
                  <img
                    src={img.imageUrl}
                    alt={img.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1">
                    <span>تكبير الصورة</span>
                  </div>
                </div>

                <div className="p-3 space-y-1">
                  <h4 className="font-black text-slate-800 text-xs line-clamp-1">{img.title}</h4>
                  {img.caption && (
                    <p className="text-[11px] text-slate-500 line-clamp-1">{img.caption}</p>
                  )}
                </div>

                {isEditActive && (
                  <div className="absolute top-2 left-2 flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingImageBanner({ image: img, isNew: false });
                      }}
                      className="bg-white/90 hover:bg-white text-slate-800 p-1.5 rounded-lg text-xs shadow-xs"
                      title="تعديل الصورة"
                    >
                      <Edit3 className="w-3 h-3 text-blue-600" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm("هل أنت متأكد من حذف هذه الصورة؟")) {
                          const updated = data.images.filter((i) => i.id !== img.id);
                          handleSaveData({ ...data, images: updated });
                          showToast("تم حذف الصورة بنجاح!");
                        }
                      }}
                      className="bg-white/90 hover:bg-rose-50 text-rose-600 p-1.5 rounded-lg text-xs shadow-xs"
                      title="حذف الصورة"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* 5. INTERACTIVE ACTION MODAL (Detailed Reading, Articles, QCM)          */}
      {/* ====================================================================== */}
      {activeActionModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden text-right font-cairo">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-5 sm:p-6 flex items-center justify-between gap-3 border-b border-blue-900 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-blue-500/20 border border-blue-400/40 text-blue-300 flex items-center justify-center shrink-0">
                  {renderIcon(activeActionModal.action.iconName, "w-6 h-6")}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-blue-800 text-blue-200 px-2.5 py-0.5 rounded-full font-bold">
                      {activeActionModal.subject.title}
                    </span>
                    <span className="text-xs text-amber-300 font-bold">
                      {activeActionModal.subject.weightBadge}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                    {activeActionModal.action.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingAction({
                      subjectId: activeActionModal.subject.id,
                      action: activeActionModal.action,
                      isNew: false,
                    });
                  }}
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                  title="تعديل المقال والتوصيف والروابط"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>تعديل المقال والروابط</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveActionModal(null)}
                  className="text-slate-400 hover:text-white hover:bg-white/10 p-2 rounded-xl transition cursor-pointer"
                  title="إغلاق"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Tabs Bar */}
            <div className="bg-slate-50 border-b border-slate-200 px-5 flex items-center gap-2 overflow-x-auto shrink-0">
              <button
                type="button"
                onClick={() => setModalTab("summary")}
                className={`py-3 px-4 text-xs sm:text-sm font-black border-b-2 transition cursor-pointer whitespace-nowrap ${
                  modalTab === "summary"
                    ? "border-blue-600 text-blue-700 bg-white"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                الملخص والتوصيف العام
              </button>
              <button
                type="button"
                onClick={() => setModalTab("article")}
                className={`py-3 px-4 text-xs sm:text-sm font-black border-b-2 transition cursor-pointer whitespace-nowrap ${
                  modalTab === "article"
                    ? "border-blue-600 text-blue-700 bg-white"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                الدليل الأكاديمي والمحاور
              </button>
              <button
                type="button"
                onClick={() => setModalTab("qcm")}
                className={`py-3 px-4 text-xs sm:text-sm font-black border-b-2 transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  modalTab === "qcm"
                    ? "border-blue-600 text-blue-700 bg-white"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                <span>اختبار تجريبي تفاعلي QCM</span>
                {activeActionModal.action.qcmQuestions && (
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full font-bold">
                    {activeActionModal.action.qcmQuestions.length}
                  </span>
                )}
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">
              {/* 1. Summary Tab */}
              {modalTab === "summary" && (
                <div className="space-y-6">
                  {/* Summary Box */}
                  <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center gap-2 text-blue-900 font-black text-sm sm:text-base">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>إطار التوصيف الرسمي لمكون {activeActionModal.action.title}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                      {activeActionModal.action.contentSummary ||
                        "هذا المحور يغطي الجوانب الأساسية في التحضير لمباراة ولوج مركز تكوين المفتشين ويوفر نماذج وأطراً مرجعية مصادق عليها."}
                    </p>
                  </div>

                  {/* Quick stats and properties */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                      <span className="text-[11px] text-slate-500 block">المادة التخصصية</span>
                      <strong className="text-slate-900 text-xs sm:text-sm font-black">
                        {activeActionModal.subject.title}
                      </strong>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                      <span className="text-[11px] text-slate-500 block">الوزن في الاختبار</span>
                      <strong className="text-blue-700 text-xs sm:text-sm font-black">
                        {activeActionModal.subject.weightBadge}
                      </strong>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                      <span className="text-[11px] text-slate-500 block">نوع المورد</span>
                      <strong className="text-emerald-700 text-xs sm:text-sm font-black">
                        معارف أكاديمية وديداكتيكية
                      </strong>
                    </div>
                  </div>

                  {/* External link button if configured */}
                  {activeActionModal.action.customUrl &&
                    activeActionModal.action.customUrl !== "#" && (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between gap-3">
                        <div>
                          <span className="font-bold text-xs text-emerald-950 block">
                            رابط المورد أو المنصة الخارجية
                          </span>
                          <span className="text-[11px] text-emerald-700">
                            تم ربط هذا المحور برابط خارجي مباشر
                          </span>
                        </div>
                        <a
                          href={activeActionModal.action.customUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>فتح الرابط المباشر</span>
                        </a>
                      </div>
                    )}
                </div>
              )}

              {/* 2. Detailed Article Tab */}
              {modalTab === "article" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">
                      النص الكامل والمحاور المرجعية للموضوع
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingAction({
                          subjectId: activeActionModal.subject.id,
                          action: activeActionModal.action,
                          isNew: false,
                        });
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-2xs transition cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>تعديل نص المقال</span>
                    </button>
                  </div>

                  {activeActionModal.action.articleContent ? (
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-7 space-y-4 text-slate-800 shadow-2xs">
                      <ArticleHtmlRenderer content={activeActionModal.action.articleContent} />
                    </div>
                  ) : (
                    <div className="text-center py-10 space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                      <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
                      <p className="text-xs text-slate-500 font-bold">
                        لم يتم تحرير مقال تفصيلي لهذا المحور بعد. يمكنك إضافة النص بالنقر على زر "تعديل نص المقال" أعلاه.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* 3. QCM Quiz Tab */}
              {modalTab === "qcm" && (
                <div className="space-y-6">
                  {/* Launch Dedicated Full Experience Button if Arabic Quiz */}
                  {activeActionModal.subject.id === "subject_arabic" && (
                    <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-emerald-300 shrink-0">
                          <BookOpen className="w-6 h-6" />
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="font-black text-sm sm:text-base text-emerald-100">
                            المركز الوطني للتقويم والامتحانات (105 أسئلة)
                          </h4>
                          <p className="text-xs text-emerald-200/80">
                            مباراة التفتيش التربوي - بنك شامل بكافة المستويات والإعراب الكامل
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setActiveActionModal(null);
                          setIsArabic105QuizOpen(true);
                        }}
                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm transition shadow-sm flex items-center gap-1.5 cursor-pointer shrink-0"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>فتح الاختبار التفاعلي الكامل (105 سؤال)</span>
                      </button>
                    </div>
                  )}

                  {activeActionModal.action.qcmQuestions &&
                  activeActionModal.action.qcmQuestions.length > 0 ? (
                    <div className="space-y-6">
                      {/* QCM Header */}
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <HelpCircle className="w-5 h-5 text-amber-600" />
                          <span className="font-black text-xs sm:text-sm text-amber-950">
                            اختبار تجريبي في {activeActionModal.subject.title} - (
                            {activeActionModal.action.qcmQuestions.length} أسئلة)
                          </span>
                        </div>
                        <span className="text-xs bg-amber-200/70 text-amber-900 font-black px-2.5 py-0.5 rounded-full">
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
                                  "border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-slate-800";

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
                              <div className="bg-slate-50 border-r-4 border-amber-500 p-3.5 rounded-r-xl rounded-l-lg text-xs text-slate-700 space-y-1">
                                <span className="font-bold text-amber-900 block">💡 التعليل والتصحيح:</span>
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
                                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
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
      {/* 6. ADMIN MODALS: EDIT SPECS, EDIT SUBJECT, EDIT ACTION, EDIT DOWNLOAD   */}
      {/* ====================================================================== */}

      {/* A. Edit Specs Modal */}
      {editingSpecs && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-blue-600" />
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
                  placeholder="مثال: 3 ساعات"
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
                  placeholder="مثال: 1*"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">أعلى وزن:</label>
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
                <label className="block text-xs font-bold text-slate-700 mb-1">أدنى وزن:</label>
                <input
                  type="text"
                  value={editingSpecsForm.lowestWeight}
                  onChange={(e) =>
                    setEditingSpecsForm({ ...editingSpecsForm, lowestWeight: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                  placeholder="مثال: العلوم (%12)"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingSpecs(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold"
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
                className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl text-xs font-black shadow-xs"
              >
                حفظ التعديلات
              </button>
            </div>
          </div>
        </div>
      )}

      {/* B. Edit Download File Modal */}
      {editingDownloadFile && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 space-y-5 shadow-2xl border border-slate-200 text-right font-cairo">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <FileDown className="w-4 h-4 text-blue-600" />
                <span>
                  {editingDownloadFile.isNew ? "إضافة ملف تحميل جديد" : "تعديل بيانات ملف التحميل"}
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
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  عنوان الملف أو الوثيقة (مع الامتداد):
                </label>
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
                  placeholder="مثال: ملف المعارف الأكاديمية الشامل لمفتش التعليم الابتدائي 2024 (PDF)"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">الحجم التقديري:</label>
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
                    placeholder="مثال: 3.2 MB"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">السنة أو المصدر:</label>
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
                    placeholder="مثال: 2024 أو وزاري"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  رابط التحميل المباشر (أو اتركه فارغاً للتحميل الافتراضي عبر البوابة):
                </label>
                <input
                  type="url"
                  value={editingDownloadFile.file.url || ""}
                  onChange={(e) =>
                    setEditingDownloadFile({
                      ...editingDownloadFile,
                      file: { ...editingDownloadFile.file, url: e.target.value },
                    })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-sans text-left dir-ltr"
                  placeholder="https://example.com/file.pdf"
                />
                <span className="text-[10px] text-slate-500 block mt-1">
                  يمكنك وضع رابط Google Drive أو Mediafire أو ملف محلي مباشر.
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingDownloadFile(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!editingDownloadFile.file.title.trim()) {
                    alert("يرجى إدخال عنوان الملف");
                    return;
                  }

                  let updatedDownloads: PrimaryDownloadFile[];
                  if (editingDownloadFile.isNew) {
                    updatedDownloads = [editingDownloadFile.file, ...data.downloads];
                  } else {
                    updatedDownloads = data.downloads.map((d) =>
                      d.id === editingDownloadFile.file.id ? editingDownloadFile.file : d
                    );
                  }

                  handleSaveData({ ...data, downloads: updatedDownloads });
                  setEditingDownloadFile(null);
                  showToast("تم حفظ ملف التحميل بنجاح!");
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl text-xs font-black shadow-xs"
              >
                حفظ الملف
              </button>
            </div>
          </div>
        </div>
      )}

      {/* C. Edit Action Card Modal */}
      {editingAction && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col p-5 sm:p-6 space-y-4 shadow-2xl border border-slate-200 text-right font-cairo">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-blue-600" />
                <span>تحرير محتوى وروابط: {editingAction.action.title}</span>
              </h3>
              <button
                onClick={() => setEditingAction(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto flex-1 pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">عنوان البطاقة والمكون:</label>
                  <input
                    type="text"
                    value={editingAction.action.title}
                    onChange={(e) =>
                      setEditingAction({
                        ...editingAction,
                        action: { ...editingAction.action, title: e.target.value },
                      })
                    }
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">الأيقونة المعتمدة:</label>
                  <select
                    value={editingAction.action.iconName}
                    onChange={(e) =>
                      setEditingAction({
                        ...editingAction,
                        action: { ...editingAction.action, iconName: e.target.value },
                      })
                    }
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold bg-white"
                  >
                    <option value="BookOpen">كتاب (معارف المادة)</option>
                    <option value="Presentation">سبورة / أستاذ (ديداكتيك)</option>
                    <option value="Brain">عقل / ذكاء (علوم التربية)</option>
                    <option value="FileText">ورقة وثيقة (نماذج اختبارات)</option>
                    <option value="Laptop">حاسوب / كود (اختبار تجريبي)</option>
                    <option value="Calculator">آلة حاسبة</option>
                    <option value="FlaskConical">مخبر علمي</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  رابط مخصص أو خارجي (اختياري - اتركه فارغاً لفتح نافذة المراجعة والمقال الداخلي):
                </label>
                <input
                  type="url"
                  value={editingAction.action.customUrl || ""}
                  onChange={(e) =>
                    setEditingAction({
                      ...editingAction,
                      action: { ...editingAction.action, customUrl: e.target.value },
                    })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-sans text-left dir-ltr"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">الملخص التوجيهي للمكون:</label>
                <textarea
                  rows={2}
                  value={editingAction.action.contentSummary || ""}
                  onChange={(e) =>
                    setEditingAction({
                      ...editingAction,
                      action: { ...editingAction.action, contentSummary: e.target.value },
                    })
                  }
                  className="w-full border border-slate-300 rounded-xl p-3 text-xs font-cairo"
                  placeholder="اكتب ملخصاً توجيهياً للمكون..."
                />
              </div>

              {/* Rich HTML & Markdown Article Editor with Direct Download Insertion */}
              <div>
                <label className="block text-xs font-black text-slate-800 mb-1.5 flex items-center justify-between">
                  <span>محرر المقال التفصيلي وأكواد HTML وروابط التحميل:</span>
                </label>
                <RichArticleEditor
                  value={editingAction.action.articleContent || ""}
                  onChange={(newContent) =>
                    setEditingAction({
                      ...editingAction,
                      action: { ...editingAction.action, articleContent: newContent },
                    })
                  }
                  title="محرر مقال المحور وروابط التحميل"
                  textareaId="primary-knowledge-article-editor"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingAction(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={() => {
                  const updatedSubjects = data.subjects.map((sub) => {
                    if (sub.id !== editingAction.subjectId) return sub;
                    let updatedActions: PrimarySubjectAction[];
                    if (editingAction.isNew) {
                      updatedActions = [...sub.actions, editingAction.action];
                    } else {
                      updatedActions = sub.actions.map((act) =>
                        act.id === editingAction.action.id ? editingAction.action : act
                      );
                    }
                    return { ...sub, actions: updatedActions };
                  });

                  handleSaveData({ ...data, subjects: updatedSubjects });
                  if (activeActionModal && activeActionModal.action.id === editingAction.action.id) {
                    setActiveActionModal({
                      ...activeActionModal,
                      action: editingAction.action,
                    });
                  }
                  setEditingAction(null);
                  showToast("تم حفظ البطاقة بنجاح!");
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl text-xs font-black shadow-xs"
              >
                حفظ التعديلات
              </button>
            </div>
          </div>
        </div>
      )}

      {/* D. Edit Image Banner Modal */}
      {editingImageBanner && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 space-y-5 shadow-2xl border border-slate-200 text-right font-cairo">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-purple-600" />
                <span>
                  {editingImageBanner.isNew ? "إضافة صورة / خريطة ذهنية جديدة" : "تعديل الصورة"}
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
                <label className="block text-xs font-bold text-slate-700 mb-1">عنوان الصورة:</label>
                <input
                  type="text"
                  value={editingImageBanner.image.title}
                  onChange={(e) =>
                    setEditingImageBanner({
                      ...editingImageBanner,
                      image: { ...editingImageBanner.image, title: e.target.value },
                    })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                  placeholder="مثال: خطاطة منهاج النشاط العلمي بالسلك الابتدائي"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">رابط الصورة (URL):</label>
                <input
                  type="url"
                  value={editingImageBanner.image.imageUrl}
                  onChange={(e) =>
                    setEditingImageBanner({
                      ...editingImageBanner,
                      image: { ...editingImageBanner.image, imageUrl: e.target.value },
                    })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-sans text-left dir-ltr"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">وصف أو تعليق مختصر:</label>
                <input
                  type="text"
                  value={editingImageBanner.image.caption || ""}
                  onChange={(e) =>
                    setEditingImageBanner({
                      ...editingImageBanner,
                      image: { ...editingImageBanner.image, caption: e.target.value },
                    })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs"
                  placeholder="شرح موجز لمحتوى الرسم التوضيحي"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingImageBanner(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!editingImageBanner.image.title || !editingImageBanner.image.imageUrl) {
                    alert("يرجى إدخال العنوان ورابط الصورة");
                    return;
                  }
                  let updatedImages: PrimaryImageBanner[];
                  if (editingImageBanner.isNew) {
                    updatedImages = [editingImageBanner.image, ...(data.images || [])];
                  } else {
                    updatedImages = (data.images || []).map((img) =>
                      img.id === editingImageBanner.image.id ? editingImageBanner.image : img
                    );
                  }
                  handleSaveData({ ...data, images: updatedImages });
                  setEditingImageBanner(null);
                  showToast("تم حفظ الصورة بنجاح!");
                }}
                className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2 rounded-xl text-xs font-black shadow-xs"
              >
                حفظ الصورة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* E. Image Zoom Viewer Modal */}
      {viewingImage && (
        <div
          onClick={() => setViewingImage(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl overflow-hidden max-w-4xl max-h-[90vh] flex flex-col shadow-2xl cursor-default"
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

      {/* Download Gateway Modal */}
      <DownloadGatewayModal
        isOpen={gatewayFile.isOpen}
        onClose={() => setGatewayFile({ ...gatewayFile, isOpen: false })}
        fileTitle={gatewayFile.title}
        downloadUrl={gatewayFile.url}
        fileType={gatewayFile.type}
        fileSize={gatewayFile.size}
      />

      {/* Dedicated Arabic Inspection 105 Questions Quiz Modal (Design matching ProfPress) */}
      <ArabicInspection105QuizModal
        isOpen={isArabic105QuizOpen}
        onClose={() => setIsArabic105QuizOpen(false)}
      />
    </div>
  );
};
