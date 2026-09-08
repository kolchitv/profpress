import React, { useState, useEffect } from "react";
import {
  DEFAULT_INSPECTION_COMPETITION_DATA,
  InspectionCompetitionPageData,
  InspectionTrack,
} from "../data/inspectionCompetitionData";
import {
  CompetitionSubAction,
  QuickResourceCard,
  CompetitionDownloadFile,
  getDefaultDownloadFiles,
  CompetitionSubject,
} from "../data/teachingCompetitionData";
import { TabKey, AdminSession } from "../types";
import { canUserDeleteArticles, getStoredAdminSession, ADMIN_SESSION_EVENT } from "../utils/adminAuth";
import { CompetitionTopicEditorModal } from "./CompetitionTopicEditorModal";
import { QuickResourceEditorModal } from "./QuickResourceEditorModal";
import {
  FileText,
  Megaphone,
  BookOpen,
  School,
  Brain,
  FlaskConical,
  Coins,
  PieChart,
  UserCheck,
  User,
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
  Presentation,
  Award,
} from "lucide-react";

interface Props {
  onNavigateToTab?: (tab: TabKey) => void;
}

export const InspectionCompetitionPage: React.FC<Props> = ({ onNavigateToTab }) => {
  // 1. Data state with LocalStorage persistence
  const [data, setData] = useState<InspectionCompetitionPageData>(() => {
    try {
      const saved = localStorage.getItem("profpress_inspection_competition_data");
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return DEFAULT_INSPECTION_COMPETITION_DATA;
  });

  const [editMode, setEditMode] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState<"all" | "primary" | "secondary" | "planning" | "finance">("all");

  // Modals state
  const [activeActionModal, setActiveActionModal] = useState<{
    track: InspectionTrack;
    action: CompetitionSubAction;
  } | null>(null);

  const [activeQuickResourceModal, setActiveQuickResourceModal] = useState<QuickResourceCard | null>(null);
  const [editingQuickResource, setEditingQuickResource] = useState<QuickResourceCard | null>(null);
  const [editingTrack, setEditingTrack] = useState<InspectionTrack | null>(null);
  const [isNewTrack, setIsNewTrack] = useState(false);

  // Topic & Downloads Editor Modal State
  const [topicEditorState, setTopicEditorState] = useState<{
    isOpen: boolean;
    track: InspectionTrack | null;
    action: CompetitionSubAction | null;
  }>({
    isOpen: false,
    track: null,
    action: null,
  });

  // Action Modal active tab
  const [actionModalTab, setActionModalTab] = useState<"summary" | "article" | "qcm">("summary");

  // Inline Quick Add/Edit Download file state inside ActiveActionModal
  const [isAddingQuickDownload, setIsAddingQuickDownload] = useState(false);
  const [editingQuickDownloadId, setEditingQuickDownloadId] = useState<string | null>(null);
  const [quickDownloadTitle, setQuickDownloadTitle] = useState("");
  const [quickDownloadUrl, setQuickDownloadUrl] = useState("");
  const [quickDownloadSize, setQuickDownloadSize] = useState("1.5 MB");
  const [quickDownloadYear, setQuickDownloadYear] = useState("2024");

  // QCM Interactive State
  const [currentQcmIndex, setCurrentQcmIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qIdx: number]: number }>({});
  const [showQcmResults, setShowQcmResults] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Header quick edit state
  const [isEditingHeader, setIsEditingHeader] = useState(false);
  const [tempPageTitle, setTempPageTitle] = useState(data.pageTitle);
  const [tempPageSubtitle, setTempPageSubtitle] = useState(data.pageSubtitle);
  const [tempPageDate, setTempPageDate] = useState(data.pageDate);

  // Admin Session & Manager Privilege check (kolchitv@gmail.com)
  const [adminSession, setAdminSession] = useState<AdminSession | null>(getStoredAdminSession);

  useEffect(() => {
    const handleSessionUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      setAdminSession(customEvent.detail !== undefined ? customEvent.detail : getStoredAdminSession());
    };
    window.addEventListener(ADMIN_SESSION_EVENT, handleSessionUpdate);
    return () => window.removeEventListener(ADMIN_SESSION_EVENT, handleSessionUpdate);
  }, []);

  const isAdmin = Boolean(adminSession?.isAdmin);
  const isManager = Boolean(isAdmin && canUserDeleteArticles(adminSession!));
  const isEditActive = isAdmin && editMode;

  useEffect(() => {
    if (!isAdmin && editMode) {
      setEditMode(false);
    }
  }, [isAdmin, editMode]);

  // Save to LocalStorage
  const handleSaveData = (newData: InspectionCompetitionPageData) => {
    setData(newData);
    try {
      localStorage.setItem("profpress_inspection_competition_data", JSON.stringify(newData));
    } catch (e) {
      console.error("Failed to save inspection competition data", e);
    }
    showToast("تم حفظ التعديلات بنجاح!");
  };

  const handleSaveQuickResourceCard = (updatedCard: QuickResourceCard) => {
    const updatedQuickResources = data.quickResources.map((card) =>
      card.id === updatedCard.id ? updatedCard : card
    );
    handleSaveData({
      ...data,
      quickResources: updatedQuickResources,
    });
    if (activeQuickResourceModal?.id === updatedCard.id) {
      setActiveQuickResourceModal(updatedCard);
    }
    showToast(`تم حفظ وتحديث بطاقة "${updatedCard.title}" بنجاح!`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleResetDefaults = () => {
    if (window.confirm("هل أنت متأكد من استعادة المحتوى والتنظيم الافتراضي لصفحة مباراة التفتيش؟")) {
      handleSaveData(DEFAULT_INSPECTION_COMPETITION_DATA);
      showToast("تمت استعادة المحتوى الافتراضي بنجاح");
    }
  };

  // Icon resolver
  const renderIcon = (name: string, className = "w-5 h-5") => {
    switch (name) {
      case "Brain":
        return <Brain className={className} />;
      case "BookOpen":
        return <BookOpen className={className} />;
      case "School":
        return <School className={className} />;
      case "FlaskConical":
        return <FlaskConical className={className} />;
      case "UserCheck":
        return <UserCheck className={className} />;
      case "User":
        return <User className={className} />;
      case "GraduationCap":
        return <GraduationCap className={className} />;
      case "FileText":
        return <FileText className={className} />;
      case "Megaphone":
        return <Megaphone className={className} />;
      case "PieChart":
        return <PieChart className={className} />;
      case "Coins":
        return <Coins className={className} />;
      case "Presentation":
        return <Presentation className={className} />;
      case "Award":
        return <Award className={className} />;
      default:
        return <BookOpen className={className} />;
    }
  };

  // Color scheme mappings matching the screenshots
  const getTrackTheme = (color: string) => {
    switch (color) {
      case "emerald":
        return {
          bannerBg: "bg-gradient-to-r from-emerald-600 to-emerald-500",
          bannerText: "text-white",
          pillBg: "bg-emerald-700/60 border border-emerald-400/40 text-white",
          circleBg: "bg-emerald-100 text-emerald-600",
          cardHover: "hover:border-emerald-300 hover:shadow-md",
          iconColor: "text-emerald-600",
          badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
        };
      case "blue":
        return {
          bannerBg: "bg-gradient-to-r from-blue-600 to-blue-700",
          bannerText: "text-white",
          pillBg: "bg-blue-800/60 border border-blue-400/40 text-white",
          circleBg: "bg-blue-100 text-blue-600",
          cardHover: "hover:border-blue-300 hover:shadow-md",
          iconColor: "text-blue-600",
          badgeColor: "bg-blue-50 text-blue-800 border-blue-200",
        };
      case "rose":
        return {
          bannerBg: "bg-gradient-to-r from-pink-600 to-rose-600",
          bannerText: "text-white",
          pillBg: "bg-pink-800/60 border border-pink-400/40 text-white",
          circleBg: "bg-pink-100 text-pink-600",
          cardHover: "hover:border-pink-300 hover:shadow-md",
          iconColor: "text-pink-600",
          badgeColor: "bg-pink-50 text-pink-800 border-pink-200",
        };
      case "amber":
        return {
          bannerBg: "bg-gradient-to-r from-amber-500 to-orange-500",
          bannerText: "text-white",
          pillBg: "bg-amber-700/60 border border-amber-300/40 text-white",
          circleBg: "bg-amber-100 text-amber-700",
          cardHover: "hover:border-amber-300 hover:shadow-md",
          iconColor: "text-amber-600",
          badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
        };
      default:
        return {
          bannerBg: "bg-gradient-to-r from-slate-700 to-slate-800",
          bannerText: "text-white",
          pillBg: "bg-slate-900/60 border border-slate-600 text-white",
          circleBg: "bg-slate-100 text-slate-700",
          cardHover: "hover:border-slate-300 hover:shadow-md",
          iconColor: "text-slate-600",
          badgeColor: "bg-slate-50 text-slate-800 border-slate-200",
        };
    }
  };

  // Filter tracks
  const filteredTracks = data.tracks.filter((track) => {
    if (selectedCycle === "all") return true;
    return track.cycle === selectedCycle;
  });

  // Action Click Handler
  const handleOpenAction = (track: InspectionTrack, action: CompetitionSubAction) => {
    setActiveActionModal({ track, action });
    setActionModalTab("summary");
    setCurrentQcmIndex(0);
    setSelectedAnswers({});
    setShowQcmResults(false);
    setIsAddingQuickDownload(false);
    setEditingQuickDownloadId(null);
  };

  // Save modified Action from Modal
  const handleSaveActionChanges = (savedAction: CompetitionSubAction) => {
    if (!activeActionModal) return;

    const updatedTracks = data.tracks.map((t) => {
      if (t.id !== activeActionModal.track.id) return t;
      return {
        ...t,
        actions: t.actions.map((act) => (act.id === savedAction.id ? savedAction : act)),
      };
    });

    handleSaveData({
      ...data,
      tracks: updatedTracks,
    });

    setActiveActionModal({
      track: activeActionModal.track,
      action: savedAction,
    });
    setTopicEditorState({ isOpen: false, track: null, action: null });
    showToast("تم تحديث الموضوع والموارد بنجاح!");
  };

  // Quick Download Link Add/Edit
  const handleSaveQuickDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeActionModal || !quickDownloadTitle.trim() || !quickDownloadUrl.trim()) return;

    const currentFiles =
      activeActionModal.action.downloadFiles && activeActionModal.action.downloadFiles.length > 0
        ? [...activeActionModal.action.downloadFiles]
        : getDefaultDownloadFiles(
            activeActionModal.action.type,
            activeActionModal.track.title,
            activeActionModal.action.title
          );

    let updatedFiles: CompetitionDownloadFile[];
    if (editingQuickDownloadId) {
      updatedFiles = currentFiles.map((f) =>
        f.id === editingQuickDownloadId
          ? {
              ...f,
              title: quickDownloadTitle.trim(),
              url: quickDownloadUrl.trim(),
              size: quickDownloadSize.trim() || "1.5 MB",
              year: quickDownloadYear.trim() || "2024",
            }
          : f
      );
    } else {
      const newFile: CompetitionDownloadFile = {
        id: `dl_${Date.now()}`,
        title: quickDownloadTitle.trim(),
        url: quickDownloadUrl.trim(),
        size: quickDownloadSize.trim() || "1.5 MB",
        year: quickDownloadYear.trim() || "2024",
      };
      updatedFiles = [newFile, ...currentFiles];
    }

    const updatedAction: CompetitionSubAction = {
      ...activeActionModal.action,
      downloadFiles: updatedFiles,
    };

    const updatedTracks = data.tracks.map((t) => {
      if (t.id !== activeActionModal.track.id) return t;
      return {
        ...t,
        actions: t.actions.map((act) => (act.id === updatedAction.id ? updatedAction : act)),
      };
    });

    handleSaveData({ ...data, tracks: updatedTracks });
    setActiveActionModal({
      track: activeActionModal.track,
      action: updatedAction,
    });

    setIsAddingQuickDownload(false);
    setEditingQuickDownloadId(null);
    setQuickDownloadTitle("");
    setQuickDownloadUrl("");
    showToast("تم تحديث روابط التحميل بنجاح!");
  };

  const handleDeleteQuickDownload = (fileId: string) => {
    if (!activeActionModal) return;
    if (!window.confirm("هل أنت متأكد من حذف رابط التحميل هذا؟")) return;

    const currentFiles =
      activeActionModal.action.downloadFiles && activeActionModal.action.downloadFiles.length > 0
        ? activeActionModal.action.downloadFiles
        : getDefaultDownloadFiles(
            activeActionModal.action.type,
            activeActionModal.track.title,
            activeActionModal.action.title
          );

    const updatedFiles = currentFiles.filter((f) => f.id !== fileId);
    const updatedAction: CompetitionSubAction = {
      ...activeActionModal.action,
      downloadFiles: updatedFiles,
    };

    const updatedTracks = data.tracks.map((t) => {
      if (t.id !== activeActionModal.track.id) return t;
      return {
        ...t,
        actions: t.actions.map((act) => (act.id === updatedAction.id ? updatedAction : act)),
      };
    });

    handleSaveData({ ...data, tracks: updatedTracks });
    setActiveActionModal({
      track: activeActionModal.track,
      action: updatedAction,
    });
    showToast("تم حذف رابط التحميل بنجاح");
  };

  // Track Save/Delete/Add
  const handleSaveTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTrack) return;

    let updatedTracks = [...data.tracks];
    if (isNewTrack) {
      updatedTracks.push(editingTrack);
    } else {
      updatedTracks = updatedTracks.map((t) => (t.id === editingTrack.id ? editingTrack : t));
    }

    handleSaveData({
      ...data,
      tracks: updatedTracks,
    });
    setEditingTrack(null);
  };

  const handleDeleteTrack = (id: string) => {
    if (!isManager) {
      alert("عذراً، صلاحية حذف المسالك مقتصرة حصرياً على مدير المنصة الرئيسي.");
      return;
    }
    if (window.confirm("هل أنت متأكد من حذف هذا المسلك ومحتوياته بالكامل؟")) {
      handleSaveData({
        ...data,
        tracks: data.tracks.filter((t) => t.id !== id),
      });
    }
  };

  const handleStartAddTrack = () => {
    const newId = `track_${Date.now()}`;
    const newTrack: InspectionTrack = {
      id: newId,
      title: "تفتيش مسلك جديد",
      badge: "مسلك تخصصي",
      cycle: "other" as any,
      colorScheme: "blue",
      iconName: "GraduationCap",
      description: "وصف المسلك التخصصي ومواد التحضير",
      categoryLabel: "مسلك تخصصي",
      actions: [
        { id: `${newId}_1`, title: "المعارف", subtitle: "المادة المدرسة والتخصص", type: "knowledge", iconName: "BookOpen" },
        { id: `${newId}_2`, title: "الديداكتيك", subtitle: "منهجية وطرق التدريس", type: "didactics", iconName: "School" },
        { id: `${newId}_3`, title: "علوم التربية", subtitle: "نظريات ومستجدات التربية", type: "summaries", iconName: "Brain" },
        { id: `${newId}_4`, title: "اختبار تجريبي", subtitle: "نماذج امتحانات وتصحيح", type: "mock", iconName: "FlaskConical" },
      ],
    };
    setIsNewTrack(true);
    setEditingTrack(newTrack);
  };

  return (
    <div id="inspection-competition-page" className="space-y-8 pb-16 max-w-7xl mx-auto px-2 sm:px-4" dir="rtl">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-slate-900 text-white font-bold px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-sm border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Control Bar (Only for Manager/Admin kolchitv@gmail.com) */}
      {isAdmin && (
        <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-700 shadow-md flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-300">
                لوحة تحرير وتعديل صفحة مباراة التفتيش
              </div>
              <div className="text-xs text-emerald-400 font-bold">
                حساب المدير المعتمد: {adminSession?.adminName || adminSession?.adminEmail}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              id="inspection-toggle-edit-mode-btn"
              onClick={() => setEditMode(!editMode)}
              className={`px-4 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition shadow-xs cursor-pointer ${
                editMode
                  ? "bg-amber-500 hover:bg-amber-600 text-slate-950 ring-2 ring-amber-300"
                  : "bg-blue-600 hover:bg-blue-500 text-white"
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{editMode ? "إغلاق وضع التحرير والتعديل" : "تفعيل وضع التحرير والتعديل"}</span>
            </button>

            {editMode && (
              <>
                <button
                  onClick={() => setIsEditingHeader(true)}
                  className="bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-600 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>تعديل العناوين الرئيسية</span>
                </button>

                <button
                  onClick={handleStartAddTrack}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>إضافة مسلك تفتيش جديد</span>
                </button>

                <button
                  onClick={handleResetDefaults}
                  className="bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-rose-200 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                  title="استعادة البيانات الأصلية لمباراة التفتيش"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>استعادة الافتراضي</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* 1. TOP HERO HEADER & TWO DASHED CARDS (Capture d’écran 2026-09-08 133042.jpg) */}
      {/* ====================================================================== */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-xs space-y-6 text-center">
        {/* Yellow Circle Avatar Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-100/90 border border-amber-200/60 flex items-center justify-center shadow-xs">
            <UserCheck className="w-8 h-8 sm:w-10 sm:h-10 text-amber-600" />
          </div>
        </div>

        {/* Main Title & Subtitle */}
        <div className="space-y-2.5 max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            {data.pageTitle}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            {data.pageSubtitle}
          </p>
        </div>

        {/* Blue Badge Pill: "موارد تعليمية" */}
        <div className="flex justify-center items-center gap-3">
          <span className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold px-5 py-1.5 rounded-full shadow-xs transition">
            <GraduationCap className="w-4 h-4 text-amber-300" />
            <span>{data.resourceBadgeText}</span>
          </span>
        </div>

        {/* Orange Accent Line */}
        <div className="flex justify-center">
          <div className="w-16 h-1.5 bg-amber-500 rounded-full" />
        </div>

        {/* =================================================================== */}
        {/* Two Prominent Dashed Cards: "توصيفات المباراة" & "أخبار ووثائق المباراة" */}
        {/* =================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-4 text-right">
          {data.quickResources.map((card) => {
            const isBlue = card.id === "inspection_specs";
            return (
              <div
                key={card.id}
                id={`quick-card-${card.id}`}
                onClick={() => setActiveQuickResourceModal(card)}
                className={`relative rounded-2xl p-5 sm:p-6 transition cursor-pointer flex items-center justify-between gap-4 border-2 border-dashed ${
                  isBlue
                    ? "border-blue-200 hover:border-blue-400 bg-blue-50/20 hover:bg-blue-50/50"
                    : "border-pink-200 hover:border-pink-400 bg-pink-50/20 hover:bg-pink-50/50"
                } shadow-2xs group`}
              >
                {/* Text on right side (RTL) */}
                <div className="space-y-1.5 flex-1">
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-blue-900 transition">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 line-clamp-2">
                    {card.subtitle}
                  </p>
                </div>

                {/* Icon box on left side */}
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 transition group-hover:scale-105 shadow-2xs ${
                    isBlue
                      ? "bg-blue-100 text-blue-600"
                      : "bg-rose-100 text-rose-500"
                  }`}
                >
                  {isBlue ? (
                    <FileText className="w-6 h-6 sm:w-7 sm:h-7" />
                  ) : (
                    <Megaphone className="w-6 h-6 sm:w-7 sm:h-7" />
                  )}
                </div>

                {/* Admin Quick Edit Button */}
                {isEditActive && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingQuickResource(card);
                    }}
                    className="absolute top-2 left-2 bg-white/90 hover:bg-white text-slate-800 border border-slate-200 text-xs px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 shadow-xs cursor-pointer z-10"
                  >
                    <Edit3 className="w-3 h-3 text-blue-600" />
                    <span>تعديل</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Cycle Filter Bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-black text-slate-700">تصفية مسالك التفتيش:</span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setSelectedCycle("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              selectedCycle === "all"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
          >
            جميع المسالك ({data.tracks.length})
          </button>
          <button
            onClick={() => setSelectedCycle("primary")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              selectedCycle === "primary"
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/60"
            }`}
          >
            تفتيش الابتدائي
          </button>
          <button
            onClick={() => setSelectedCycle("secondary")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              selectedCycle === "secondary"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200/60"
            }`}
          >
            تفتيش الثانوي
          </button>
          <button
            onClick={() => setSelectedCycle("planning")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              selectedCycle === "planning"
                ? "bg-pink-600 text-white shadow-xs"
                : "bg-pink-50 hover:bg-pink-100 text-pink-800 border border-pink-200/60"
            }`}
          >
            التخطيط التربوي
          </button>
          <button
            onClick={() => setSelectedCycle("finance")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              selectedCycle === "finance"
                ? "bg-amber-600 text-white shadow-xs"
                : "bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/60"
            }`}
          >
            المصالح المادية والمالية
          </button>
        </div>
      </div>

      {/* ====================================================================== */}
      {/* 2. THE 4 INSPECTION TRACKS (Matches User's Screenshots 1, 2, 3, 4)     */}
      {/* ====================================================================== */}
      <div className="space-y-8">
        {filteredTracks.map((track) => {
          const theme = getTrackTheme(track.colorScheme);

          return (
            <div
              key={track.id}
              id={`inspection-track-${track.id}`}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-shadow"
            >
              {/* Header Banner */}
              <div
                className={`${theme.bannerBg} ${theme.bannerText} p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
              >
                {/* Right: Title & Track Icon */}
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center shrink-0 shadow-xs">
                    {renderIcon(track.iconName, "w-6 h-6 text-white")}
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                      <span>{track.title}</span>
                    </h2>
                    {track.description && (
                      <p className="text-xs sm:text-sm text-white/80 font-medium mt-0.5">
                        {track.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Left: Badge pill + Admin Buttons */}
                <div className="flex items-center gap-2 self-start sm:self-center flex-wrap">
                  <span className={`${theme.pillBg} text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs`}>
                    <FileText className="w-3.5 h-3.5 text-white" />
                    <span>{track.badge}</span>
                  </span>

                  {isEditActive && (
                    <div className="flex items-center gap-1 bg-black/20 p-1 rounded-xl">
                      <button
                        type="button"
                        onClick={() => {
                          setIsNewTrack(false);
                          setEditingTrack(track);
                        }}
                        className="bg-white/90 hover:bg-white text-slate-900 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition cursor-pointer shadow-xs"
                      >
                        <Edit3 className="w-3 h-3 text-blue-600" />
                        <span>تعديل</span>
                      </button>

                      {isManager && (
                        <button
                          type="button"
                          onClick={() => handleDeleteTrack(track.id)}
                          className="bg-rose-500/80 hover:bg-rose-600 text-white p-1 rounded-lg text-xs transition cursor-pointer"
                          title="حذف المسلك"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* 4 Category Blocks (المعارف, الديداكتيك, علوم التربية, اختبار تجريبي) */}
              <div className="p-4 sm:p-6 md:p-8 bg-slate-50/50">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {track.actions.map((act) => (
                    <div
                      key={act.id}
                      id={`track-action-${act.id}`}
                      onClick={() => handleOpenAction(track, act)}
                      className={`bg-white border border-slate-200/80 rounded-2xl p-6 text-center cursor-pointer transition flex flex-col items-center justify-center gap-3.5 shadow-2xs group ${theme.cardHover}`}
                    >
                      {/* Circle Icon */}
                      <div
                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition group-hover:scale-110 shadow-2xs ${theme.circleBg}`}
                      >
                        {renderIcon(act.iconName, "w-7 h-7 sm:w-8 sm:h-8")}
                      </div>

                      {/* Titles */}
                      <div className="space-y-1">
                        <h3 className="font-black text-base sm:text-lg text-slate-900 group-hover:text-blue-700 transition">
                          {act.title}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium line-clamp-1">
                          {act.subtitle}
                        </p>
                      </div>

                      {/* Small details hint */}
                      <span className="text-[11px] text-slate-400 group-hover:text-slate-600 flex items-center gap-1 font-bold pt-1">
                        <span>عرض التفاصيل والملفات</span>
                        <ChevronLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer hint & Add custom topic if edit active */}
                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-medium">
                    {track.actions.length} وحدات تحضيرية معتمدة ومواضيع رسمية
                  </span>

                  {isEditActive && (
                    <button
                      type="button"
                      onClick={() => {
                        const compatibleSubject: CompetitionSubject = {
                          id: track.id,
                          title: track.title,
                          cycle: track.cycle === "primary" ? "primary" : track.cycle === "secondary" ? "secondary" : "other",
                          iconName: track.iconName,
                          colorScheme: track.colorScheme === "emerald" ? "emerald" : track.colorScheme === "rose" ? "rose" : track.colorScheme === "amber" ? "amber" : "blue",
                          actions: track.actions,
                        };
                        setTopicEditorState({
                          isOpen: true,
                          track,
                          action: null,
                        });
                      }}
                      className="text-xs font-bold text-emerald-800 hover:text-emerald-950 hover:bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 flex items-center gap-1 transition cursor-pointer shadow-2xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ إضافة محور أو موضوع جديد لهذا المسلك</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ====================================================================== */}
      {/* 3. ACTIVE ACTION MODAL (Detailed Study View, Downloads, Articles, QCM) */}
      {/* ====================================================================== */}
      {activeActionModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden text-right">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-5 sm:p-6 flex items-center justify-between gap-3 border-b border-blue-900 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/40 text-blue-300 flex items-center justify-center shrink-0">
                  {renderIcon(activeActionModal.action.iconName, "w-6 h-6")}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs bg-blue-800 text-blue-200 px-2.5 py-0.5 rounded-full font-bold">
                      {activeActionModal.track.title}
                    </span>
                    <span className="text-xs text-amber-300 font-bold">
                      {activeActionModal.action.subtitle}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                    {activeActionModal.action.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isEditActive && (
                  <button
                    type="button"
                    onClick={() => {
                      setTopicEditorState({
                        isOpen: true,
                        track: activeActionModal.track,
                        action: activeActionModal.action,
                      });
                    }}
                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>تعديل المحتوى وروابط التحميل</span>
                  </button>
                )}

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
                onClick={() => setActionModalTab("summary")}
                className={`py-3 px-4 text-xs sm:text-sm font-black border-b-2 transition cursor-pointer whitespace-nowrap ${
                  actionModalTab === "summary"
                    ? "border-blue-600 text-blue-700 bg-white"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                الملخص والتوصيف العام
              </button>
              <button
                type="button"
                onClick={() => setActionModalTab("article")}
                className={`py-3 px-4 text-xs sm:text-sm font-black border-b-2 transition cursor-pointer whitespace-nowrap ${
                  actionModalTab === "article"
                    ? "border-blue-600 text-blue-700 bg-white"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                المقال والمحاور التفصيلية
              </button>
              <button
                type="button"
                onClick={() => setActionModalTab("qcm")}
                className={`py-3 px-4 text-xs sm:text-sm font-black border-b-2 transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  actionModalTab === "qcm"
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
              {actionModalTab === "summary" && (
                <div className="space-y-6">
                  {/* Summary Box */}
                  <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center gap-2 text-blue-900 font-black text-sm sm:text-base">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>ملخص التوصيف والإطار التوجيهي</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                      {activeActionModal.action.contentSummary ||
                        "هذا المحور يغطي الجوانب الأساسية في التحضير لمباراة ولوج مركز تكوين المفتشين ويوفر نماذج وأطراً مرجعية مصادق عليها."}
                    </p>
                  </div>

                  {/* Official Downloads Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                        <FileDown className="w-4 h-4 text-blue-600" />
                        <span>الملفات الرسمية ونماذج التحميل المعتمدة (PDF)</span>
                      </h4>

                      {isEditActive && !isAddingQuickDownload && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsAddingQuickDownload(true);
                            setEditingQuickDownloadId(null);
                            setQuickDownloadTitle("");
                            setQuickDownloadUrl("");
                          }}
                          className="text-xs font-bold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg border border-blue-200 flex items-center gap-1 transition cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ إضافة رابط تحميل</span>
                        </button>
                      )}
                    </div>

                    {/* Inline Form to Add/Edit Download Link */}
                    {isAddingQuickDownload && (
                      <form
                        onSubmit={handleSaveQuickDownload}
                        className="bg-slate-50 border border-slate-300 rounded-xl p-4 space-y-3 animate-in fade-in"
                      >
                        <div className="font-bold text-xs text-slate-800">
                          {editingQuickDownloadId ? "تعديل رابط التحميل" : "إضافة ملف تحميل جديد"}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 mb-1">
                              عنوان الملف
                            </label>
                            <input
                              type="text"
                              value={quickDownloadTitle}
                              onChange={(e) => setQuickDownloadTitle(e.target.value)}
                              placeholder="مثال: موضوع الدورة العادية مع عناصر الإجابة الرسمية"
                              className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-600 mb-1">
                              رابط التحميل (URL)
                            </label>
                            <input
                              type="url"
                              value={quickDownloadUrl}
                              onChange={(e) => setQuickDownloadUrl(e.target.value)}
                              placeholder="https://..."
                              className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                              required
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-end gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              setIsAddingQuickDownload(false);
                              setEditingQuickDownloadId(null);
                            }}
                            className="text-xs px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100"
                          >
                            إلغاء
                          </button>
                          <button
                            type="submit"
                            className="text-xs px-3 py-1.5 rounded-lg bg-blue-700 text-white font-bold hover:bg-blue-800"
                          >
                            حفظ الملف
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Download Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(activeActionModal.action.downloadFiles && activeActionModal.action.downloadFiles.length > 0
                        ? activeActionModal.action.downloadFiles
                        : getDefaultDownloadFiles(
                            activeActionModal.action.type,
                            activeActionModal.track.title,
                            activeActionModal.action.title
                          )
                      ).map((file) => (
                        <div
                          key={file.id}
                          className="bg-white border border-slate-200 rounded-xl p-3.5 hover:border-blue-400 transition flex items-center justify-between gap-3 shadow-2xs group"
                        >
                          <div className="space-y-1 flex-1">
                            <div className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-blue-700 transition line-clamp-2">
                              {file.title}
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-slate-500">
                              {file.size && <span>الحجم: {file.size}</span>}
                              {file.year && (
                                <>
                                  <span>•</span>
                                  <span>السنة: {file.year}</span>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition shadow-xs"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>تحميل</span>
                            </a>

                            {isEditActive && (
                              <button
                                type="button"
                                onClick={() => handleDeleteQuickDownload(file.id)}
                                className="text-rose-500 hover:text-rose-700 p-1.5 rounded-md hover:bg-rose-50"
                                title="حذف الرابط"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Article Tab */}
              {actionModalTab === "article" && (
                <div className="space-y-4">
                  <div className="prose prose-slate max-w-none text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-line bg-slate-50 p-6 rounded-2xl border border-slate-200/80 font-sans">
                    {activeActionModal.action.articleContent ||
                      `# ${activeActionModal.action.title} - ${activeActionModal.track.title}
                      
المحتوى التخصصي قيد التحديث المستمر وفق أحدث التوصيفات والأطر المرجعية المعتمدة لمركز تكوين مفتشي التعليم (CFIE) ومسلكي التخطيط والمصالح المالية.

يمكنك تحميل الوثائق الرسمية والمواضيع المصححة مباشرة من تبويب "الملخص والتوصيف العام".`}
                  </div>
                </div>
              )}

              {/* 3. QCM Interactive Quiz Tab */}
              {actionModalTab === "qcm" && (
                <div className="space-y-6">
                  {activeActionModal.action.qcmQuestions && activeActionModal.action.qcmQuestions.length > 0 ? (
                    <div className="space-y-6">
                      {/* QCM Header */}
                      <div className="flex items-center justify-between bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs sm:text-sm">
                        <div className="flex items-center gap-2 font-bold text-amber-900">
                          <HelpCircle className="w-4 h-4 text-amber-600" />
                          <span>
                            السؤال {currentQcmIndex + 1} من {activeActionModal.action.qcmQuestions.length}
                          </span>
                        </div>
                        <div className="text-slate-600 font-medium">
                          اختبار تجريبي تفاعلي مؤقت
                        </div>
                      </div>

                      {/* Current Question */}
                      {(() => {
                        const q = activeActionModal.action.qcmQuestions![currentQcmIndex];
                        const selectedOpt = selectedAnswers[currentQcmIndex];
                        const isAnswered = selectedOpt !== undefined;

                        return (
                          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
                            <h4 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                              {q.question}
                            </h4>

                            <div className="space-y-2.5 pt-2">
                              {q.options.map((opt, optIdx) => {
                                const isSelected = selectedOpt === optIdx;
                                const isCorrect = optIdx === q.correctIndex;
                                let btnStyle = "border-slate-200 hover:border-slate-300 bg-slate-50";

                                if (showQcmResults || isAnswered) {
                                  if (isCorrect) {
                                    btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold";
                                  } else if (isSelected && !isCorrect) {
                                    btnStyle = "border-rose-500 bg-rose-50 text-rose-950 font-bold";
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
                                          [currentQcmIndex]: optIdx,
                                        });
                                      }
                                    }}
                                    className={`w-full text-right p-3.5 rounded-xl border text-xs sm:text-sm transition flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                                  >
                                    <span>{opt}</span>
                                    {(showQcmResults || isAnswered) && isCorrect && (
                                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                    )}
                                    {(showQcmResults || isAnswered) && isSelected && !isCorrect && (
                                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Explanation if answered */}
                            {isAnswered && (
                              <div className="mt-4 p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700 space-y-1">
                                <div className="font-bold text-slate-900 flex items-center gap-1">
                                  <Info className="w-3.5 h-3.5 text-blue-600" />
                                  <span>التوضيح والتعليل البيداغوجي:</span>
                                </div>
                                <p>{q.explanation}</p>
                              </div>
                            )}

                            {/* QCM Navigation Buttons */}
                            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                              <button
                                type="button"
                                disabled={currentQcmIndex === 0}
                                onClick={() => setCurrentQcmIndex((prev) => Math.max(0, prev - 1))}
                                className="px-3.5 py-1.5 text-xs font-bold rounded-lg border border-slate-200 text-slate-700 disabled:opacity-40"
                              >
                                السؤال السابق
                              </button>

                              {currentQcmIndex < activeActionModal.action.qcmQuestions!.length - 1 ? (
                                <button
                                  type="button"
                                  onClick={() => setCurrentQcmIndex((prev) => prev + 1)}
                                  className="px-4 py-1.5 text-xs font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                >
                                  السؤال الموالي
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setShowQcmResults(true)}
                                  className="px-4 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                                >
                                  عرض النتيجة النهائية
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-200 text-slate-600 text-xs sm:text-sm space-y-2">
                      <HelpCircle className="w-8 h-8 mx-auto text-slate-400" />
                      <div className="font-bold">لا تتوفر أسئلة QCM مضافة لهذا المحور حالياً</div>
                      <p className="text-slate-500">
                        يمكن للمدير إضافة بنك أسئلة تفاعلي عبر وضع التحرير والتعديل.
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
      {/* 4. ACTIVE QUICK RESOURCE MODAL (توصيفات المباراة / أخبار ووثائق المباراة) */}
      {/* ====================================================================== */}
      {activeQuickResourceModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden text-right">
            {/* Header */}
            <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between gap-3 border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center shrink-0">
                  {activeQuickResourceModal.id === "inspection_specs" ? (
                    <FileText className="w-6 h-6 text-blue-400" />
                  ) : (
                    <Megaphone className="w-6 h-6 text-rose-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {activeQuickResourceModal.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300">
                    {activeQuickResourceModal.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isEditActive && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingQuickResource(activeQuickResourceModal);
                      setActiveQuickResourceModal(null);
                    }}
                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black px-3 py-1.5 rounded-xl flex items-center gap-1 transition cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>تعديل البطاقة</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setActiveQuickResourceModal(null)}
                  className="text-slate-400 hover:text-white hover:bg-white/10 p-2 rounded-xl transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
              {/* Written content */}
              <div className="prose prose-slate max-w-none text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-line bg-slate-50 p-6 rounded-2xl border border-slate-200">
                {activeQuickResourceModal.writtenContent}
              </div>

              {/* Download links */}
              {activeQuickResourceModal.downloadLinks && activeQuickResourceModal.downloadLinks.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-black text-slate-900">
                    روابط ووثائق التحميل المباشرة:
                  </h4>
                  <div className="space-y-2">
                    {activeQuickResourceModal.downloadLinks.map((link) => (
                      <div
                        key={link.id}
                        className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-3 hover:border-blue-300 transition"
                      >
                        <div className="text-xs font-bold text-slate-800">
                          {link.title} {link.size && <span className="text-slate-500 font-normal">({link.size})</span>}
                        </div>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1 transition"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>تحميل</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* 5. TOPIC / ACTION EDITOR MODAL (Reusing CompetitionTopicEditorModal)   */}
      {/* ====================================================================== */}
      {topicEditorState.isOpen && topicEditorState.track && (
        <CompetitionTopicEditorModal
          isOpen={topicEditorState.isOpen}
          onClose={() => setTopicEditorState({ isOpen: false, track: null, action: null })}
          subject={{
            id: topicEditorState.track.id,
            title: topicEditorState.track.title,
            cycle: topicEditorState.track.cycle === "primary" ? "primary" : topicEditorState.track.cycle === "secondary" ? "secondary" : "other",
            iconName: topicEditorState.track.iconName,
            colorScheme: topicEditorState.track.colorScheme === "emerald" ? "emerald" : topicEditorState.track.colorScheme === "rose" ? "rose" : topicEditorState.track.colorScheme === "amber" ? "amber" : "blue",
            actions: topicEditorState.track.actions,
          }}
          initialAction={topicEditorState.action}
          onSaveAction={handleSaveActionChanges}
        />
      )}

      {/* ====================================================================== */}
      {/* 6. QUICK RESOURCE CARD EDITOR (Reusing QuickResourceEditorModal)      */}
      {/* ====================================================================== */}
      {editingQuickResource && (
        <QuickResourceEditorModal
          isOpen={Boolean(editingQuickResource)}
          card={editingQuickResource}
          onClose={() => setEditingQuickResource(null)}
          onSave={handleSaveQuickResourceCard}
        />
      )}

      {/* ====================================================================== */}
      {/* 7. TRACK EDIT / ADD MODAL                                              */}
      {/* ====================================================================== */}
      {editingTrack && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl border border-slate-200 overflow-hidden text-right">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
              <h3 className="font-black text-lg text-white">
                {isNewTrack ? "إضافة مسلك تفتيش جديد" : `تعديل مسلك: ${editingTrack.title}`}
              </h3>
              <button
                type="button"
                onClick={() => setEditingTrack(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTrack} className="p-6 space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  عنوان مسلك التفتيش
                </label>
                <input
                  type="text"
                  value={editingTrack.title}
                  onChange={(e) => setEditingTrack({ ...editingTrack, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  شارة المسلك (Pill Badge)
                </label>
                <input
                  type="text"
                  value={editingTrack.badge}
                  onChange={(e) => setEditingTrack({ ...editingTrack, badge: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    تصنيف السلك
                  </label>
                  <select
                    value={editingTrack.cycle}
                    onChange={(e) => setEditingTrack({ ...editingTrack, cycle: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="primary">تفتيش ابتدائي</option>
                    <option value="secondary">تفتيش ثانوي</option>
                    <option value="planning">تخطيط تربوي</option>
                    <option value="finance">مصالح مادية ومالية</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    لون الهوية البصرية
                  </label>
                  <select
                    value={editingTrack.colorScheme}
                    onChange={(e) => setEditingTrack({ ...editingTrack, colorScheme: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="emerald">أخضر زمردي (ابتدائي)</option>
                    <option value="blue">أزرق ملكي (ثانوي)</option>
                    <option value="rose">وردي / ماجينتا (تخطيط)</option>
                    <option value="amber">برتقالي / كهرماني (مالية)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  وصف مختصر للمسلك
                </label>
                <input
                  type="text"
                  value={editingTrack.description || ""}
                  onChange={(e) => setEditingTrack({ ...editingTrack, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingTrack(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold"
                >
                  حفظ المسلك
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* 8. HEADER EDIT MODAL                                                   */}
      {/* ====================================================================== */}
      {isEditingHeader && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden text-right">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <h3 className="font-black text-lg text-white">
                تعديل ترويسة وعناوين صفحة التفتيش
              </h3>
              <button
                type="button"
                onClick={() => setIsEditingHeader(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveData({
                  ...data,
                  pageTitle: tempPageTitle,
                  pageSubtitle: tempPageSubtitle,
                  pageDate: tempPageDate,
                });
                setIsEditingHeader(false);
              }}
              className="p-6 space-y-4 text-xs sm:text-sm"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  عنوان الصفحة الرئيسي
                </label>
                <input
                  type="text"
                  value={tempPageTitle}
                  onChange={(e) => setTempPageTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  الوصف والعنوان الفرعي
                </label>
                <textarea
                  rows={2}
                  value={tempPageSubtitle}
                  onChange={(e) => setTempPageSubtitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  نص شارة الموارد
                </label>
                <input
                  type="text"
                  value={tempPageDate}
                  onChange={(e) => setTempPageDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                  placeholder="شتنبر 2026"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsEditingHeader(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold"
                >
                  حفظ العناوين
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
