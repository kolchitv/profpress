import React, { useState, useEffect } from "react";
import {
  DEFAULT_ORIENTATION_PLANNING_DATA,
  OrientationPlanningPageData,
  OrientationExamSession,
  OrientationCoreTheme,
} from "../data/orientationPlanningData";
import {
  QuickResourceCard,
  CompetitionDownloadFile,
  CompetitionQCMQuestion,
} from "../data/teachingCompetitionData";
import { TabKey, AdminSession } from "../types";
import { canUserDeleteArticles, getStoredAdminSession, ADMIN_SESSION_EVENT } from "../utils/adminAuth";
import { QuickResourceEditorModal } from "./QuickResourceEditorModal";
import { DownloadGatewayModal } from "./DownloadGatewayModal";
import { getDownloadGatewaySettings } from "../utils/downloadGatewaySettings";
import {
  Folder,
  Megaphone,
  Landmark,
  Puzzle,
  Users,
  Brain,
  Laptop,
  Milestone,
  Network,
  GraduationCap,
  Sparkles,
  Download,
  ExternalLink,
  Edit3,
  Plus,
  Trash2,
  CheckCircle2,
  X,
  Share2,
  HelpCircle,
  Clock,
  ShieldCheck,
  RotateCcw,
  CheckSquare,
  AlertCircle,
  FileDown,
  Layers,
  ChevronLeft,
  ChevronRight,
  Info,
  Calendar,
  Compass,
  FileText,
  Target,
  Briefcase,
  BookOpen,
} from "lucide-react";

interface Props {
  onNavigateToTab?: (tab: TabKey) => void;
}

// Google Drive Icon Component (crisp SVG)
const GoogleDriveIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg className={className} viewBox="0 0 87.3 78" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5l5.4 9.35z"
      fill="#0066DA"
    />
    <path
      d="M43.65 25L29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44C.4 50 0 51.55 0 53.1h27.5L43.65 25z"
      fill="#05A6F0"
    />
    <path
      d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.8l5.9 10.2 7.85 13.6z"
      fill="#EA4335"
    />
    <path
      d="M43.65 25L57.4 1.2C56.05.4 54.5 0 52.95 0H34.35c-1.55 0-3.1.4-4.45 1.2L43.65 25z"
      fill="#00832D"
    />
    <path
      d="M59.8 53.1H87.3c0-1.55-.4-3.1-1.2-4.5l-13.75-23.8c-.8-1.4-1.95-2.5-3.3-3.3L55.3 45.3l4.5 7.8z"
      fill="#2684FC"
    />
    <path
      d="M73.55 76.8H27.5L13.75 53.1h59.8l-13.75 23.7z"
      fill="#FFBA00"
    />
  </svg>
);

export const OrientationPlanningPage: React.FC<Props> = ({ onNavigateToTab }) => {
  // 1. Data state with LocalStorage persistence
  const [data, setData] = useState<OrientationPlanningPageData>(() => {
    try {
      const saved = localStorage.getItem("profpress_orientation_planning_data");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load orientation planning data:", e);
    }
    return DEFAULT_ORIENTATION_PLANNING_DATA;
  });

  const [adminSession, setAdminSession] = useState<AdminSession | null>(() => getStoredAdminSession());
  const [isEditMode, setIsEditMode] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals & Active View States
  const [selectedQuickCard, setSelectedQuickCard] = useState<QuickResourceCard | null>(null);
  const [editingQuickCard, setEditingQuickCard] = useState<QuickResourceCard | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<OrientationCoreTheme | null>(null);
  const [editingTheme, setEditingTheme] = useState<OrientationCoreTheme | null>(null);
  const [selectedSession, setSelectedSession] = useState<OrientationExamSession | null>(null);
  const [editingSession, setEditingSession] = useState<OrientationExamSession | null>(null);
  const [isEditingDriveBag, setIsEditingDriveBag] = useState(false);
  const [isEditingHeader, setIsEditingHeader] = useState(false);

  // Active tab inside theme modal: 'summary' | 'files' | 'qcm'
  const [themeModalTab, setThemeModalTab] = useState<"summary" | "files" | "qcm">("summary");
  const [qcmAnswers, setQcmAnswers] = useState<Record<number, number>>({});
  const [showQcmResults, setShowQcmResults] = useState(false);

  // Safe Download Gateway state for exams & files
  const [gatewayDownload, setGatewayDownload] = useState<{
    isOpen: boolean;
    title: string;
    url: string;
    type?: string;
    size?: string;
  }>({
    isOpen: false,
    title: "",
    url: "",
  });

  // Listen to Admin Session changes
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

  const isAdmin = canUserDeleteArticles(adminSession);

  // Save changes helper
  const saveData = (updated: OrientationPlanningPageData, toast?: string) => {
    setData(updated);
    try {
      localStorage.setItem("profpress_orientation_planning_data", JSON.stringify(updated));
      if (toast) {
        setToastMessage(toast);
        setTimeout(() => setToastMessage(null), 3000);
      }
    } catch (e) {
      console.error("Failed to save data:", e);
    }
  };

  // Reset to default
  const handleResetToDefault = () => {
    if (window.confirm("هل أنت متأكد من رغبتك في استعادة البيانات الأصلية لصفحة التوجيه والتخطيط؟")) {
      saveData(DEFAULT_ORIENTATION_PLANNING_DATA, "تم استعادة البيانات الافتراضية بنجاح");
    }
  };

  // Render Icon helper for quick cards
  const renderIcon = (name: string, className = "w-6 h-6") => {
    switch (name) {
      case "Megaphone":
        return <Megaphone className={className} />;
      case "Folder":
        return <Folder className={className} />;
      case "Landmark":
        return <Landmark className={className} />;
      case "Puzzle":
        return <Puzzle className={className} />;
      case "Users":
        return <Users className={className} />;
      case "Brain":
        return <Brain className={className} />;
      case "Laptop":
        return <Laptop className={className} />;
      case "Milestone":
        return <Milestone className={className} />;
      case "Network":
        return <Network className={className} />;
      case "GraduationCap":
        return <GraduationCap className={className} />;
      default:
        return <FileText className={className} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 pb-20 font-sans" dir="rtl">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in border border-slate-700">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Admin Floating / Top Bar */}
      {isAdmin && (
        <div className="bg-amber-500/10 border-b border-amber-200 text-amber-900 px-4 py-2.5">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span className="font-bold">وضع الإدارة والتحكم (مباراة التوجيه والتخطيط COPE)</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditMode(!isEditMode)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                  isEditMode
                    ? "bg-amber-600 text-white shadow-sm"
                    : "bg-white border border-amber-300 text-amber-800 hover:bg-amber-100"
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                {isEditMode ? "معاينة الصفحة (إيقاف التحرير)" : "تفعيل وضع التحرير والتعديل"}
              </button>
              {isEditMode && (
                <button
                  onClick={handleResetToDefault}
                  className="px-3 py-1.5 rounded-lg font-medium bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  استعادة الافتراضي
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        {/* ============================================================== */}
        {/* SECTION 1: HEADER & 7 QUICK CARDS (Screenshot 4)              */}
        {/* ============================================================== */}
        <section className="text-center space-y-6">
          {/* Main Title & Subtitle */}
          <div className="relative max-w-3xl mx-auto">
            {isEditMode && (
              <button
                onClick={() => setIsEditingHeader(true)}
                className="absolute -top-3 left-0 bg-indigo-600 text-white p-1.5 rounded-full shadow hover:bg-indigo-700"
                title="تعديل العنوان والمقدمة"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}

            <div className="inline-flex items-center justify-center gap-2 mb-3">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-900 tracking-tight leading-snug">
                {data.pageTitle}
              </h1>
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-sm">
                <Target className="w-5 h-5" />
              </div>
            </div>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {data.pageSubtitle}
            </p>
          </div>

          {/* Top 7 Dashed Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto pt-2">
            {data.quickCards.map((card, idx) => {
              // Color styles matching the screenshot pastel look
              const getCardStyles = (color: string) => {
                switch (color) {
                  case "orange":
                    return {
                      bgIcon: "bg-orange-100 text-orange-600",
                      border: "border-orange-200 hover:border-orange-400",
                    };
                  case "blue":
                    return {
                      bgIcon: "bg-blue-100 text-blue-600",
                      border: "border-blue-200 hover:border-blue-400",
                    };
                  case "teal":
                    return {
                      bgIcon: "bg-teal-100 text-teal-600",
                      border: "border-teal-200 hover:border-teal-400",
                    };
                  case "purple":
                    return {
                      bgIcon: "bg-purple-100 text-purple-600",
                      border: "border-purple-200 hover:border-purple-400",
                    };
                  case "indigo":
                    return {
                      bgIcon: "bg-indigo-100 text-indigo-600",
                      border: "border-indigo-200 hover:border-indigo-400",
                    };
                  case "emerald":
                    return {
                      bgIcon: "bg-emerald-100 text-emerald-600",
                      border: "border-emerald-200 hover:border-emerald-400",
                    };
                  case "rose":
                    return {
                      bgIcon: "bg-rose-100 text-rose-600",
                      border: "border-rose-200 hover:border-rose-400",
                    };
                  default:
                    return {
                      bgIcon: "bg-blue-100 text-blue-600",
                      border: "border-blue-200 hover:border-blue-400",
                    };
                }
              };

              const styles = getCardStyles(card.color);

              // Center bottom row cards nicely if last 3
              const isCenteredBottom = idx >= 4;

              return (
                <div
                  key={card.id}
                  onClick={() => setSelectedQuickCard(card)}
                  className={`relative group bg-white border-2 border-dashed ${styles.border} rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-3 text-right cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
                    isCenteredBottom && idx === 4 ? "lg:col-start-1" : ""
                  }`}
                >
                  {isEditMode && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingQuickCard(card);
                      }}
                      className="absolute top-2 left-2 z-10 bg-amber-500 text-white p-1 rounded-full shadow hover:bg-amber-600"
                      title="تعديل محتوى البطاقة"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Text Container */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors truncate">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">
                      {card.subtitle}
                    </p>
                  </div>

                  {/* Icon Container */}
                  <div className={`w-12 h-12 rounded-2xl ${styles.bgIcon} flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 shadow-sm`}>
                    {renderIcon(card.iconName, "w-6 h-6")}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================== */}
        {/* SECTION 2: COMPREHENSIVE GOOGLE DRIVE BAG (Screenshot 3)       */}
        {/* ============================================================== */}
        <section className="relative bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-blue-50/70 border border-blue-100 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm">
          {isEditMode && (
            <button
              onClick={() => setIsEditingDriveBag(true)}
              className="absolute top-4 left-4 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow hover:bg-indigo-700 flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" />
              تعديل بيانات الحقيبة الشاملة
            </button>
          )}

          <div className="max-w-4xl mx-auto space-y-6">
            {/* Bag Header */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center gap-2.5">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-900">
                  {data.driveBag.title}
                </h2>
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow">
                  <Briefcase className="w-5 h-5" />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-700">
                <span>{data.driveBag.description}</span>
                {data.driveBag.badgeText && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold shadow-sm">
                    <Calendar className="w-3.5 h-3.5" />
                    {data.driveBag.badgeText}
                  </span>
                )}
              </div>
            </div>

            {/* Checklist of Features (4 white cards) */}
            <div className="space-y-3">
              {data.driveBag.bulletPoints.map((point, index) => (
                <div
                  key={index}
                  className="bg-white border border-blue-50 rounded-xl p-4 shadow-sm hover:shadow transition-shadow flex items-center justify-between gap-3 text-right"
                >
                  <span className="text-gray-800 text-sm sm:text-base font-semibold leading-snug">
                    {point}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="text-center pt-2">
              <a
                href={data.driveBag.buttonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                <Download className="w-5 h-5" />
                <span>{data.driveBag.buttonText}</span>
              </a>
              {data.driveBag.noteText && (
                <p className="text-xs text-gray-500 mt-2 font-medium">
                  {data.driveBag.noteText}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* SECTION 3: EXAM SESSIONS ARCHIVE (Screenshot 2)               */}
        {/* ============================================================== */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow">
                <Folder className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                  نماذج مباراة التوجيه والتخطيط التربوي
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  جميع مواضيع الامتحانات السابقة مع التصحيح وعناصر الإجابة الرسمية
                </p>
              </div>
            </div>

            {isEditMode && (
              <button
                onClick={() => {
                  const newSession: OrientationExamSession = {
                    id: `exam_${Date.now()}`,
                    year: "2025",
                    sessionTitle: `دورة ${new Date().getFullYear()}`,
                    downloadUrl: "https://www.profpress.net/search/label/%D9%86%D9%85%D8%A7%D8%B0%D8%AC%20%D8%A7%D9%85%D8%AA%D8%AD%D8%A7%D9%86%D8%A7%D8%AA",
                    driveUrl: "https://drive.google.com",
                    hasCorrection: true,
                    size: "3.5 MB",
                    specialty: "both",
                    description: "مواضيع الامتحان وعناصر التصحيح الرسمية.",
                  };
                  setEditingSession(newSession);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 text-white text-xs sm:text-sm font-semibold hover:bg-indigo-700 shadow"
              >
                <Plus className="w-4 h-4" />
                إضافة دورة امتحانية جديدة
              </button>
            )}
          </div>

          {/* 8 Dashed Cards with Google Drive Icon (Screenshot 2) */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.examSessions.map((session) => (
              <div
                key={session.id}
                onClick={() => setSelectedSession(session)}
                className="relative group bg-white border-2 border-dashed border-indigo-200 hover:border-indigo-500 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              >
                {isEditMode && (
                  <div className="absolute top-2 left-2 flex items-center gap-1 z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingSession(session);
                      }}
                      className="bg-amber-500 text-white p-1 rounded-full shadow hover:bg-amber-600"
                      title="تعديل الدورة"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm(`هل أنت متأكد من حذف ${session.sessionTitle}؟`)) {
                          saveData(
                            {
                              ...data,
                              examSessions: data.examSessions.filter((s) => s.id !== session.id),
                            },
                            "تم حذف الدورة بنجاح"
                          );
                        }
                      }}
                      className="bg-rose-500 text-white p-1 rounded-full shadow hover:bg-rose-600"
                      title="حذف الدورة"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Google Drive Logo */}
                <div className="mb-4 transition-transform group-hover:scale-110">
                  <GoogleDriveIcon className="w-12 h-12" />
                </div>

                {/* Session Title */}
                <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {session.sessionTitle}
                </h3>

                {session.hasCorrection && (
                  <span className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" />
                    مع عناصر التصحيح
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================== */}
        {/* SECTION 4: CORE THEMES (Screenshot 1)                          */}
        {/* ============================================================== */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-900 text-white flex items-center justify-center shrink-0 shadow">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                  المحاور الأساسية / Thèmes Clés à Maîtriser
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  المجالات المعرفية والبيداغوجية المحددة في التوصيفات الرسمية للمباراة
                </p>
              </div>
            </div>

            {isEditMode && (
              <button
                onClick={() => {
                  const newTheme: OrientationCoreTheme = {
                    id: `theme_${Date.now()}`,
                    titleAr: "محور تخصصي جديد",
                    titleFr: "Nouveau Thème Clé",
                    iconName: "BookOpen",
                    colorScheme: "blue",
                    contentSummary: "ملخص المحور والمفاهيم الأساسية المرتبطة بالتوجيه والتخطيط.",
                    articleContent: "# عنوان المحور\n\nاكتب هنا التفاصيل البيداغوجية والمعرفية للمحور.",
                    downloadFiles: [],
                    qcmQuestions: [],
                  };
                  setEditingTheme(newTheme);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-900 text-white text-xs sm:text-sm font-semibold hover:bg-blue-800 shadow"
              >
                <Plus className="w-4 h-4" />
                إضافة محور جديد
              </button>
            )}
          </div>

          {/* Theme Cards Grid (Screenshot 1) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.coreThemes.map((theme, index) => {
              const getThemeStyles = (color: string) => {
                switch (color) {
                  case "orange":
                    return {
                      iconBg: "bg-orange-50 text-orange-600",
                      badgeBg: "bg-blue-600 text-white",
                    };
                  case "teal":
                    return {
                      iconBg: "bg-teal-50 text-teal-600",
                      badgeBg: "bg-teal-600 text-white",
                    };
                  case "rose":
                    return {
                      iconBg: "bg-rose-50 text-rose-600",
                      badgeBg: "bg-rose-600 text-white",
                    };
                  case "purple":
                    return {
                      iconBg: "bg-purple-50 text-purple-600",
                      badgeBg: "bg-purple-600 text-white",
                    };
                  case "blue":
                    return {
                      iconBg: "bg-blue-50 text-blue-600",
                      badgeBg: "bg-blue-600 text-white",
                    };
                  default:
                    return {
                      iconBg: "bg-blue-50 text-blue-600",
                      badgeBg: "bg-blue-600 text-white",
                    };
                }
              };

              const styles = getThemeStyles(theme.colorScheme);

              return (
                <div
                  key={theme.id}
                  onClick={() => {
                    setSelectedTheme(theme);
                    setThemeModalTab("summary");
                    setQcmAnswers({});
                    setShowQcmResults(false);
                  }}
                  className={`relative group bg-white border border-gray-100 hover:border-blue-300 rounded-2xl p-6 shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 flex items-center justify-between gap-4 text-right ${
                    index === data.coreThemes.length - 1 && data.coreThemes.length % 2 !== 0
                      ? "md:col-span-2 md:max-w-xl md:mx-auto md:w-full"
                      : ""
                  }`}
                >
                  {isEditMode && (
                    <div className="absolute top-2 left-2 flex items-center gap-1 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingTheme(theme);
                        }}
                        className="bg-amber-500 text-white p-1 rounded-full shadow hover:bg-amber-600"
                        title="تعديل المحور"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`هل أنت متأكد من حذف ${theme.titleAr}؟`)) {
                            saveData(
                              {
                                ...data,
                                coreThemes: data.coreThemes.filter((t) => t.id !== theme.id),
                              },
                              "تم حذف المحور بنجاح"
                            );
                          }
                        }}
                        className="bg-rose-500 text-white p-1 rounded-full shadow hover:bg-rose-600"
                        title="حذف المحور"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Right Side: Titles & Badge */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                      {theme.titleAr}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 font-normal leading-snug">
                      {theme.titleFr}
                    </p>
                    {theme.badge && (
                      <div className="pt-1">
                        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-600 text-white text-xs font-bold shadow-sm">
                          <Target className="w-3 h-3" />
                          {theme.badge}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Left Side: Pastel Circular Icon */}
                  <div className={`w-14 h-14 rounded-full ${styles.iconBg} flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform`}>
                    {renderIcon(theme.iconName, "w-7 h-7")}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* ============================================================== */}
      {/* MODAL 1: QUICK RESOURCE DETAILS MODAL                          */}
      {/* ============================================================== */}
      {selectedQuickCard && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto text-right animate-fade-in border border-gray-100">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-sm">
                  {renderIcon(selectedQuickCard.iconName, "w-6 h-6")}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedQuickCard.title}
                  </h3>
                  <p className="text-sm text-gray-500">{selectedQuickCard.subtitle}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedQuickCard(null)}
                className="text-gray-400 hover:text-gray-700 p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Written Content */}
            {selectedQuickCard.writtenContent && (
              <div className="prose prose-sm max-w-none text-gray-700 bg-slate-50 rounded-2xl p-5 border border-slate-200/70 whitespace-pre-line leading-relaxed font-sans">
                {selectedQuickCard.writtenContent}
              </div>
            )}

            {/* Download Links */}
            {selectedQuickCard.downloadLinks && selectedQuickCard.downloadLinks.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <Download className="w-4 h-4 text-blue-600" />
                  الملفات والوثائق المرفقة:
                </h4>
                <div className="space-y-2">
                  {selectedQuickCard.downloadLinks.map((file) => (
                    <a
                      key={file.id}
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3.5 rounded-xl border border-gray-200 hover:border-blue-400 bg-white hover:bg-blue-50/50 transition-all text-sm group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FileDown className="w-4 h-4 text-blue-600 shrink-0" />
                        <span className="font-semibold text-gray-800 group-hover:text-blue-700 truncate">
                          {file.title}
                        </span>
                      </div>
                      {file.size && (
                        <span className="text-xs text-gray-400 shrink-0 bg-gray-100 px-2 py-0.5 rounded-md">
                          {file.size}
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              {selectedQuickCard.url && (
                <a
                  href={selectedQuickCard.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  الانتقال لرابط المصدر الكامل
                </a>
              )}
              <button
                onClick={() => setSelectedQuickCard(null)}
                className="px-5 py-2 rounded-xl bg-gray-100 text-gray-700 font-medium text-sm hover:bg-gray-200 transition-colors mr-auto"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2: EXAM SESSION DETAIL MODAL                             */}
      {/* ============================================================== */}
      {selectedSession && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative text-right animate-fade-in border border-gray-100">
            <div className="flex items-start justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <GoogleDriveIcon className="w-10 h-10" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedSession.sessionTitle}
                  </h3>
                  <p className="text-xs text-gray-500">امتحان مركز التوجيه والتخطيط COPE</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedSession(null)}
                className="text-gray-400 hover:text-gray-700 p-1.5 rounded-xl hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm text-gray-700">
              <p className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 leading-relaxed">
                {selectedSession.description || "المواضيع الرسمية مع عناصر الإجابة والحلول النموذجية المعتمدة من طرف لجان التصحيح بمركز التوجيه والتخطيط."}
              </p>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-500 py-1 border-b border-gray-100">
                  <span>سنة الدورة:</span>
                  <span className="font-bold text-gray-800">{selectedSession.year}</span>
                </div>
                {selectedSession.size && (
                  <div className="flex items-center justify-between text-xs text-gray-500 py-1 border-b border-gray-100">
                    <span>حجم الملف:</span>
                    <span className="font-bold text-gray-800">{selectedSession.size}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-xs text-gray-500 py-1 border-b border-gray-100">
                  <span>التصحيح المرفق:</span>
                  <span className="font-bold text-emerald-600">متوفر بالكامل</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  const settings = getDownloadGatewaySettings();
                  if (settings.isEnabled) {
                    setGatewayDownload({
                      isOpen: true,
                      title: `${selectedSession.title} - دورة ${selectedSession.year}`,
                      url: selectedSession.downloadUrl || "#",
                      type: "pdf",
                      size: selectedSession.size || "3.5 MB",
                    });
                  } else {
                    window.open(selectedSession.downloadUrl, "_blank", "noopener,noreferrer");
                  }
                }}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-center text-sm shadow flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>تحميل نموذج الامتحان مع التصحيح (PDF)</span>
              </button>

              {selectedSession.driveUrl && (
                <a
                  href={selectedSession.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold text-center text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  فتح على Google Drive
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 3: CORE THEME DEEP STUDY & QCM MODAL                     */}
      {/* ============================================================== */}
      {selectedTheme && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto text-right animate-fade-in border border-gray-100">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  {renderIcon(selectedTheme.iconName, "w-6 h-6")}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                    {selectedTheme.titleAr}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 font-normal">
                    {selectedTheme.titleFr}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTheme(null)}
                className="text-gray-400 hover:text-gray-700 p-1.5 rounded-xl hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-gray-200 gap-2">
              <button
                onClick={() => setThemeModalTab("summary")}
                className={`pb-3 px-4 font-bold text-sm border-b-2 transition-colors flex items-center gap-1.5 ${
                  themeModalTab === "summary"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                الدراسة والتلخيص المعرفي
              </button>
              <button
                onClick={() => setThemeModalTab("files")}
                className={`pb-3 px-4 font-bold text-sm border-b-2 transition-colors flex items-center gap-1.5 ${
                  themeModalTab === "files"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                <FileDown className="w-4 h-4" />
                المرفقات والتحميلات ({selectedTheme.downloadFiles.length})
              </button>
              <button
                onClick={() => setThemeModalTab("qcm")}
                className={`pb-3 px-4 font-bold text-sm border-b-2 transition-colors flex items-center gap-1.5 ${
                  themeModalTab === "qcm"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                <CheckSquare className="w-4 h-4" />
                اختبار تجريبي QCM ({selectedTheme.qcmQuestions.length})
              </button>
            </div>

            {/* Tab 1: Summary / Article */}
            {themeModalTab === "summary" && (
              <div className="space-y-4">
                <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 text-sm text-blue-900 leading-relaxed">
                  <span className="font-bold">المختصر المفيد: </span>
                  {selectedTheme.contentSummary}
                </div>

                <div className="prose prose-sm max-w-none text-gray-800 bg-slate-50 rounded-2xl p-6 border border-slate-200/80 whitespace-pre-line leading-relaxed font-sans">
                  {selectedTheme.articleContent}
                </div>
              </div>
            )}

            {/* Tab 2: Download Files */}
            {themeModalTab === "files" && (
              <div className="space-y-3">
                {selectedTheme.downloadFiles.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    لا توجد ملفات مرفقة بهذا المحور حالياً.
                  </div>
                ) : (
                  selectedTheme.downloadFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-4 rounded-2xl border border-gray-200 bg-white hover:border-blue-300 transition-all shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">{file.title}</h4>
                          <span className="text-xs text-gray-400">
                            {file.size} • {file.year || "2024"}
                          </span>
                        </div>
                      </div>
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5" />
                        تحميل
                      </a>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab 3: QCM Test */}
            {themeModalTab === "qcm" && (
              <div className="space-y-6">
                {selectedTheme.qcmQuestions.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    لا توجد أسئلة تجريبية مضافة لهذا المحور حالياً.
                  </div>
                ) : (
                  <div className="space-y-6">
                    {selectedTheme.qcmQuestions.map((q, qIndex) => {
                      const selectedAns = qcmAnswers[qIndex];
                      const isCorrect = selectedAns === q.correctIndex;

                      return (
                        <div
                          key={qIndex}
                          className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4"
                        >
                          <div className="font-bold text-gray-900 text-sm sm:text-base leading-snug">
                            <span className="inline-block w-6 h-6 rounded-full bg-blue-600 text-white text-xs text-center leading-6 ml-2">
                              {qIndex + 1}
                            </span>
                            {q.question}
                          </div>

                          <div className="space-y-2">
                            {q.options.map((option, optIdx) => {
                              let optionClass = "bg-white border-gray-200 hover:border-blue-300";
                              if (selectedAns === optIdx) {
                                optionClass = "bg-blue-50 border-blue-500 font-semibold";
                              }
                              if (showQcmResults) {
                                if (optIdx === q.correctIndex) {
                                  optionClass = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold";
                                } else if (selectedAns === optIdx && !isCorrect) {
                                  optionClass = "bg-rose-50 border-rose-500 text-rose-900 font-bold";
                                }
                              }

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => {
                                    if (!showQcmResults) {
                                      setQcmAnswers({ ...qcmAnswers, [qIndex]: optIdx });
                                    }
                                  }}
                                  className={`w-full p-3 rounded-xl border text-right text-xs sm:text-sm flex items-center justify-between transition-colors ${optionClass}`}
                                >
                                  <span>{option}</span>
                                  {showQcmResults && optIdx === q.correctIndex && (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {showQcmResults && q.explanation && (
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 leading-relaxed flex items-start gap-2">
                              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold">التوضيح البيداغوجي: </span>
                                {q.explanation}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => setShowQcmResults(!showQcmResults)}
                        className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 shadow"
                      >
                        {showQcmResults ? "إخفاء التصحيح وإعادة المحاولة" : "تحقق من الإجابات"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* ADMIN MODAL: EDIT QUICK RESOURCE CARD                          */}
      {/* ============================================================== */}
      {editingQuickCard && (
        <QuickResourceEditorModal
          isOpen={!!editingQuickCard}
          card={editingQuickCard}
          onClose={() => setEditingQuickCard(null)}
          onSave={(updatedCard) => {
            saveData(
              {
                ...data,
                quickCards: data.quickCards.map((c) =>
                  c.id === updatedCard.id ? updatedCard : c
                ),
              },
              "تم حفظ تعديلات البطاقة بنجاح"
            );
            setEditingQuickCard(null);
          }}
        />
      )}

      {/* ============================================================== */}
      {/* ADMIN MODAL: EDIT GOOGLE DRIVE BAG                             */}
      {/* ============================================================== */}
      {isEditingDriveBag && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-5 text-right animate-fade-in">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-gray-900">تعديل بيانات الحقيبة الشاملة (Google Drive)</h3>
              <button onClick={() => setIsEditingDriveBag(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-gray-700 font-bold mb-1 text-xs">عنوان القسم:</label>
                <input
                  type="text"
                  value={data.driveBag.title}
                  onChange={(e) =>
                    setData({
                      ...data,
                      driveBag: { ...data.driveBag, title: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1 text-xs">الوصف:</label>
                <textarea
                  rows={2}
                  value={data.driveBag.description}
                  onChange={(e) =>
                    setData({
                      ...data,
                      driveBag: { ...data.driveBag, description: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1 text-xs">شارة الوقت (Badge):</label>
                <input
                  type="text"
                  value={data.driveBag.badgeText}
                  onChange={(e) =>
                    setData({
                      ...data,
                      driveBag: { ...data.driveBag, badgeText: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1 text-xs">
                  عناصر المحتوى (سطر لكل نقطة):
                </label>
                <textarea
                  rows={4}
                  value={data.driveBag.bulletPoints.join("\n")}
                  onChange={(e) =>
                    setData({
                      ...data,
                      driveBag: {
                        ...data.driveBag,
                        bulletPoints: e.target.value.split("\n").filter((p) => p.trim() !== ""),
                      },
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1 text-xs">رابط Google Drive:</label>
                <input
                  type="url"
                  value={data.driveBag.buttonUrl}
                  onChange={(e) =>
                    setData({
                      ...data,
                      driveBag: { ...data.driveBag, buttonUrl: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                onClick={() => setIsEditingDriveBag(false)}
                className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm font-semibold"
              >
                إلغاء
              </button>
              <button
                onClick={() => {
                  saveData(data, "تم حفظ بيانات الحقيبة بنجاح");
                  setIsEditingDriveBag(false);
                }}
                className="px-5 py-2 rounded-xl bg-blue-600 text-white text-sm font-bold shadow hover:bg-blue-700"
              >
                حفظ التعديلات
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* ADMIN MODAL: EDIT / ADD EXAM SESSION                           */}
      {/* ============================================================== */}
      {editingSession && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-4 text-right animate-fade-in">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-gray-900">تعديل دورة امتحانية</h3>
              <button onClick={() => setEditingSession(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <label className="block text-gray-700 font-bold mb-1 text-xs">عنوان الدورة:</label>
                <input
                  type="text"
                  value={editingSession.sessionTitle}
                  onChange={(e) => setEditingSession({ ...editingSession, sessionTitle: e.target.value })}
                  placeholder="مثال: دورة أبريل 2024"
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1 text-xs">السنة:</label>
                <input
                  type="text"
                  value={editingSession.year}
                  onChange={(e) => setEditingSession({ ...editingSession, year: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1 text-xs">رابط التحميل المباشر (PDF):</label>
                <input
                  type="url"
                  value={editingSession.downloadUrl}
                  onChange={(e) => setEditingSession({ ...editingSession, downloadUrl: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1 text-xs">رابط Google Drive:</label>
                <input
                  type="url"
                  value={editingSession.driveUrl || ""}
                  onChange={(e) => setEditingSession({ ...editingSession, driveUrl: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1 text-xs">الوصف:</label>
                <textarea
                  rows={2}
                  value={editingSession.description || ""}
                  onChange={(e) => setEditingSession({ ...editingSession, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                onClick={() => setEditingSession(null)}
                className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm font-semibold"
              >
                إلغاء
              </button>
              <button
                onClick={() => {
                  const existing = data.examSessions.some((s) => s.id === editingSession.id);
                  const updatedSessions = existing
                    ? data.examSessions.map((s) => (s.id === editingSession.id ? editingSession : s))
                    : [editingSession, ...data.examSessions];
                  saveData({ ...data, examSessions: updatedSessions }, "تم حفظ الدورة الامتحانية");
                  setEditingSession(null);
                }}
                className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-sm font-bold shadow hover:bg-indigo-700"
              >
                حفظ الدورة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* ADMIN MODAL: EDIT / ADD CORE THEME                             */}
      {/* ============================================================== */}
      {editingTheme && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-4 text-right animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-gray-900">تعديل المحور الأساسي</h3>
              <button onClick={() => setEditingTheme(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1 text-xs">العنوان بالعربية:</label>
                  <input
                    type="text"
                    value={editingTheme.titleAr}
                    onChange={(e) => setEditingTheme({ ...editingTheme, titleAr: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1 text-xs">العنوان بالفرنسية:</label>
                  <input
                    type="text"
                    value={editingTheme.titleFr}
                    onChange={(e) => setEditingTheme({ ...editingTheme, titleFr: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-300 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-bold mb-1 text-xs">الشارة (Badge - اختياري):</label>
                  <input
                    type="text"
                    value={editingTheme.badge || ""}
                    onChange={(e) => setEditingTheme({ ...editingTheme, badge: e.target.value })}
                    placeholder="مثال: تخطيط إستراتيجي"
                    className="w-full p-2.5 rounded-xl border border-gray-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1 text-xs">الأيقونة ولون الهوية:</label>
                  <select
                    value={editingTheme.colorScheme}
                    onChange={(e) =>
                      setEditingTheme({
                        ...editingTheme,
                        colorScheme: e.target.value as any,
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-gray-300 text-sm"
                  >
                    <option value="orange">برتقالي (Orange)</option>
                    <option value="teal">أخضر زمردي (Teal)</option>
                    <option value="rose">وردي/أحمر (Rose)</option>
                    <option value="purple">بنفسجي (Purple)</option>
                    <option value="blue">أزرق ملكي (Blue)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1 text-xs">الملخص السريع:</label>
                <textarea
                  rows={2}
                  value={editingTheme.contentSummary}
                  onChange={(e) => setEditingTheme({ ...editingTheme, contentSummary: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1 text-xs">المحتوى المعرفي المفصل (Markdown):</label>
                <textarea
                  rows={6}
                  value={editingTheme.articleContent}
                  onChange={(e) => setEditingTheme({ ...editingTheme, articleContent: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-sm font-mono text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                onClick={() => setEditingTheme(null)}
                className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm font-semibold"
              >
                إلغاء
              </button>
              <button
                onClick={() => {
                  const existing = data.coreThemes.some((t) => t.id === editingTheme.id);
                  const updatedThemes = existing
                    ? data.coreThemes.map((t) => (t.id === editingTheme.id ? editingTheme : t))
                    : [...data.coreThemes, editingTheme];
                  saveData({ ...data, coreThemes: updatedThemes }, "تم حفظ بيانات المحور بنجاح");
                  setEditingTheme(null);
                }}
                className="px-5 py-2 rounded-xl bg-blue-900 text-white text-sm font-bold shadow hover:bg-blue-800"
              >
                حفظ المحور
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* ADMIN MODAL: EDIT PAGE TITLE & SUBTITLE                        */}
      {/* ============================================================== */}
      {isEditingHeader && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-4 text-right animate-fade-in">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-gray-900">تعديل ترويسة الصفحة</h3>
              <button onClick={() => setIsEditingHeader(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <label className="block text-gray-700 font-bold mb-1 text-xs">عنوان الصفحة الرئيسي:</label>
                <input
                  type="text"
                  value={data.pageTitle}
                  onChange={(e) => setData({ ...data, pageTitle: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1 text-xs">الوصف الترحيبي الفرعي:</label>
                <textarea
                  rows={3}
                  value={data.pageSubtitle}
                  onChange={(e) => setData({ ...data, pageSubtitle: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                onClick={() => setIsEditingHeader(false)}
                className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm font-semibold"
              >
                إلغاء
              </button>
              <button
                onClick={() => {
                  saveData(data, "تم حفظ الترويسة بنجاح");
                  setIsEditingHeader(false);
                }}
                className="px-5 py-2 rounded-xl bg-blue-600 text-white text-sm font-bold shadow hover:bg-blue-700"
              >
                حفظ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Safe Download & AdSense Gateway Modal */}
      {gatewayDownload.isOpen && (
        <DownloadGatewayModal
          isOpen={gatewayDownload.isOpen}
          onClose={() => setGatewayDownload((prev) => ({ ...prev, isOpen: false }))}
          fileTitle={gatewayDownload.title}
          downloadUrl={gatewayDownload.url}
          fileType={gatewayDownload.type}
          fileSize={gatewayDownload.size}
          sourceTopicTitle="مركز مباريات التوجيه والتخطيط التربوي COPE"
        />
      )}
    </div>
  );
};
