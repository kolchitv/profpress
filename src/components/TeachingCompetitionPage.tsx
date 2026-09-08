import React, { useState, useEffect } from "react";
import {
  DEFAULT_TEACHING_COMPETITION_DATA,
  TeachingCompetitionPageData,
  CompetitionSubject,
  CompetitionSubAction,
  QuickResourceCard,
} from "../data/teachingCompetitionData";
import { TabKey, AdminSession } from "../types";
import { canUserDeleteArticles } from "../utils/adminAuth";
import {
  FileText,
  Megaphone,
  Folder,
  MessageSquare,
  Brain,
  BookOpen,
  Calculator,
  FlaskConical,
  PenTool,
  Sparkles,
  School,
  Languages,
  Compass,
  Globe,
  Activity,
  Laptop,
  Settings,
  TrendingUp,
  Search,
  SlidersHorizontal,
  CheckSquare,
  CheckCircle2,
  Download,
  ExternalLink,
  Edit3,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  X,
  Eye,
  Info,
  Award,
  Layers,
  HelpCircle,
  Clock,
  ChevronLeft,
  AlertCircle,
  Calendar,
  Share2,
} from "lucide-react";

interface Props {
  onNavigateToTab?: (tab: TabKey) => void;
}

export const TeachingCompetitionPage: React.FC<Props> = ({ onNavigateToTab }) => {
  // 1. Data state with LocalStorage persistence
  const [data, setData] = useState<TeachingCompetitionPageData>(() => {
    try {
      const saved = localStorage.getItem("profpress_teaching_competition_data");
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return DEFAULT_TEACHING_COMPETITION_DATA;
  });

  const [editMode, setEditMode] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState<"all" | "primary" | "secondary" | "other">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [activeActionModal, setActiveActionModal] = useState<{
    subject: CompetitionSubject;
    action: CompetitionSubAction;
  } | null>(null);

  const [activeQuickResourceModal, setActiveQuickResourceModal] = useState<QuickResourceCard | null>(null);
  const [editingSubject, setEditingSubject] = useState<CompetitionSubject | null>(null);
  const [isNewSubject, setIsNewSubject] = useState(false);

  // QCM Interactive State
  const [currentQcmIndex, setCurrentQcmIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qIdx: number]: number }>({});
  const [showQcmResults, setShowQcmResults] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Admin Session & Manager Privilege check (kolchitv@gmail.com)
  const [adminSession] = useState<AdminSession | null>(() => {
    try {
      const saved = localStorage.getItem("profpress_admin_session");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const isManager = adminSession?.isAdmin && canUserDeleteArticles(adminSession);

  // Save to LocalStorage whenever data changes
  const handleSaveData = (newData: TeachingCompetitionPageData) => {
    setData(newData);
    try {
      localStorage.setItem("profpress_teaching_competition_data", JSON.stringify(newData));
    } catch (e) {
      console.error("Failed to save competition data", e);
    }
    showToast("تم حفظ التعديلات بنجاح!");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleResetDefaults = () => {
    if (window.confirm("هل أنت متأكد من استعادة المحتوى والتنظيم الافتراضي لصفحة مباراة التعليم؟")) {
      handleSaveData(DEFAULT_TEACHING_COMPETITION_DATA);
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
      case "Calculator":
        return <Calculator className={className} />;
      case "FlaskConical":
        return <FlaskConical className={className} />;
      case "PenTool":
        return <PenTool className={className} />;
      case "Languages":
        return <Languages className={className} />;
      case "Globe":
        return <Globe className={className} />;
      case "Compass":
        return <Compass className={className} />;
      case "Activity":
        return <Activity className={className} />;
      case "Laptop":
        return <Laptop className={className} />;
      case "Settings":
        return <Settings className={className} />;
      case "TrendingUp":
        return <TrendingUp className={className} />;
      case "School":
        return <School className={className} />;
      case "FileText":
        return <FileText className={className} />;
      case "Megaphone":
        return <Megaphone className={className} />;
      case "Folder":
        return <Folder className={className} />;
      case "MessageSquare":
        return <MessageSquare className={className} />;
      case "CheckSquare":
        return <CheckSquare className={className} />;
      case "CheckCircle2":
        return <CheckCircle2 className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  // Color mapper for subject headers & highlights
  const getColorStyles = (color: string) => {
    switch (color) {
      case "green":
        return {
          headerBg: "bg-emerald-50/80 border-emerald-200 text-emerald-900",
          badgeBg: "bg-emerald-100 text-emerald-700",
          border: "border-emerald-200",
          iconColor: "text-emerald-600",
          actionHover: "hover:border-emerald-400 hover:bg-emerald-50/50",
        };
      case "blue":
        return {
          headerBg: "bg-blue-50/80 border-blue-200 text-blue-900",
          badgeBg: "bg-blue-100 text-blue-700",
          border: "border-blue-200",
          iconColor: "text-blue-600",
          actionHover: "hover:border-blue-400 hover:bg-blue-50/50",
        };
      case "purple":
        return {
          headerBg: "bg-purple-50/80 border-purple-200 text-purple-900",
          badgeBg: "bg-purple-100 text-purple-700",
          border: "border-purple-200",
          iconColor: "text-purple-600",
          actionHover: "hover:border-purple-400 hover:bg-purple-50/50",
        };
      case "cyan":
        return {
          headerBg: "bg-cyan-50/80 border-cyan-200 text-cyan-900",
          badgeBg: "bg-cyan-100 text-cyan-700",
          border: "border-cyan-200",
          iconColor: "text-cyan-600",
          actionHover: "hover:border-cyan-400 hover:bg-cyan-50/50",
        };
      case "emerald":
        return {
          headerBg: "bg-emerald-50/80 border-emerald-200 text-emerald-900",
          badgeBg: "bg-emerald-100 text-emerald-700",
          border: "border-emerald-200",
          iconColor: "text-emerald-600",
          actionHover: "hover:border-emerald-400 hover:bg-emerald-50/50",
        };
      case "amber":
        return {
          headerBg: "bg-amber-50/80 border-amber-200 text-amber-900",
          badgeBg: "bg-amber-100 text-amber-700",
          border: "border-amber-200",
          iconColor: "text-amber-600",
          actionHover: "hover:border-amber-400 hover:bg-amber-50/50",
        };
      case "rose":
        return {
          headerBg: "bg-rose-50/80 border-rose-200 text-rose-900",
          badgeBg: "bg-rose-100 text-rose-700",
          border: "border-rose-200",
          iconColor: "text-rose-600",
          actionHover: "hover:border-rose-400 hover:bg-rose-50/50",
        };
      case "teal":
        return {
          headerBg: "bg-teal-50/80 border-teal-200 text-teal-900",
          badgeBg: "bg-teal-100 text-teal-700",
          border: "border-teal-200",
          iconColor: "text-teal-600",
          actionHover: "hover:border-teal-400 hover:bg-teal-50/50",
        };
      case "orange":
        return {
          headerBg: "bg-orange-50/80 border-orange-200 text-orange-900",
          badgeBg: "bg-orange-100 text-orange-700",
          border: "border-orange-200",
          iconColor: "text-orange-600",
          actionHover: "hover:border-orange-400 hover:bg-orange-50/50",
        };
      default:
        return {
          headerBg: "bg-slate-50 border-slate-200 text-slate-900",
          badgeBg: "bg-slate-200 text-slate-700",
          border: "border-slate-200",
          iconColor: "text-blue-600",
          actionHover: "hover:border-blue-400 hover:bg-blue-50/50",
        };
    }
  };

  // Quick resource styling
  const getQuickResourceStyle = (color: string) => {
    switch (color) {
      case "teal":
        return {
          container: "border-teal-300/80 bg-teal-50/20 hover:bg-teal-50/50 hover:border-teal-400",
          iconBox: "bg-teal-100 text-teal-700",
          title: "text-teal-950",
        };
      case "orange":
        return {
          container: "border-orange-300/80 bg-orange-50/20 hover:bg-orange-50/50 hover:border-orange-400",
          iconBox: "bg-orange-100 text-orange-700",
          title: "text-orange-950",
        };
      case "blue":
        return {
          container: "border-blue-300/80 bg-blue-50/20 hover:bg-blue-50/50 hover:border-blue-400",
          iconBox: "bg-blue-100 text-blue-700",
          title: "text-blue-950",
        };
      case "purple":
        return {
          container: "border-purple-300/80 bg-purple-50/20 hover:bg-purple-50/50 hover:border-purple-400",
          iconBox: "bg-purple-100 text-purple-700",
          title: "text-purple-950",
        };
      default:
        return {
          container: "border-slate-300 bg-slate-50",
          iconBox: "bg-slate-100 text-slate-700",
          title: "text-slate-900",
        };
    }
  };

  // Filter subjects based on selected cycle and search query
  const filteredSubjects = data.subjects.filter((sub) => {
    const matchesCycle =
      selectedCycle === "all" ||
      (selectedCycle === "primary" && sub.cycle === "primary") ||
      (selectedCycle === "secondary" && sub.cycle === "secondary") ||
      (selectedCycle === "other" && sub.cycle === "other");

    const matchesSearch =
      !searchQuery.trim() ||
      sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.actions.some(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCycle && matchesSearch;
  });

  const primarySubjects = filteredSubjects.filter((s) => s.cycle === "primary");
  const secondarySubjects = filteredSubjects.filter((s) => s.cycle === "secondary");
  const otherSubjects = filteredSubjects.filter((s) => s.cycle === "other");

  // Handler to open SubAction
  const handleOpenAction = (subject: CompetitionSubject, action: CompetitionSubAction) => {
    setActiveActionModal({ subject, action });
    setCurrentQcmIndex(0);
    setSelectedAnswers({});
    setShowQcmResults(false);
  };

  // Handler for saving an edited subject
  const handleSaveSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSubject) return;

    let updatedSubjects = [...data.subjects];
    if (isNewSubject) {
      updatedSubjects.push(editingSubject);
    } else {
      updatedSubjects = updatedSubjects.map((s) => (s.id === editingSubject.id ? editingSubject : s));
    }

    handleSaveData({
      ...data,
      subjects: updatedSubjects,
    });
    setEditingSubject(null);
  };

  // Handler for deleting a subject (strictly restricted to manager kolchitv@gmail.com)
  const handleDeleteSubject = (id: string) => {
    if (!isManager) {
      alert("عذراً، صلاحية حذف المواد والتخصصات مقتصرة حصرياً على مدير المنصة الرئيسي (kolchitv@gmail.com).");
      return;
    }
    if (window.confirm("هل أنت متأكد من حذف هذه المادة من الصفحة؟")) {
      handleSaveData({
        ...data,
        subjects: data.subjects.filter((s) => s.id !== id),
      });
    }
  };

  // Handler for adding a new subject
  const handleStartAddSubject = (cycle: "primary" | "secondary" | "other") => {
    const newId = `sub_${Date.now()}`;
    const newSub: CompetitionSubject = {
      id: newId,
      title: cycle === "primary" ? "مادة جديدة (الابتدائي)" : cycle === "secondary" ? "تخصص جديد (الثانوي)" : "تخصص جديد",
      cycle,
      iconName: "BookOpen",
      colorScheme: cycle === "primary" ? "green" : cycle === "secondary" ? "blue" : "purple",
      actions: [
        { id: `${newId}_1`, title: "معارف المادة", subtitle: "المفاهيم الأساسية", type: "knowledge", iconName: "BookOpen" },
        { id: `${newId}_2`, title: "ديداكتيك المادة", subtitle: "منهجية التدريس", type: "didactics", iconName: "School" },
        { id: `${newId}_3`, title: "نماذج اختبارات", subtitle: "امتحانات سابقة", type: "exams", iconName: "FileText" },
        { id: `${newId}_4`, title: "اختبار تجريبي", subtitle: "محاكاة الامتحان", type: "mock", iconName: "Laptop" },
      ],
    };
    setIsNewSubject(true);
    setEditingSubject(newSub);
  };

  return (
    <div id="teaching-competition-page" className="space-y-8 pb-16 max-w-7xl mx-auto px-2 sm:px-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-slate-900 text-white font-bold px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-sm border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar with Title, Date, Course Button, & Admin Control */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{data.pageDate}</span>
              </span>
              <a
                href={data.trainingCourseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-700 hover:bg-blue-800 text-white text-xs font-black px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs transition"
              >
                <span>{data.trainingCourseText}</span>
                <ExternalLink className="w-3 h-3 text-amber-300" />
              </a>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              {data.pageTitle}
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
              الدليل الرقمي الشامل لجميع مترشحي مباريات التوظيف بالأكاديميات الجهوية لمهن التربية والتكوين:
              توصيفات، ملخصات المعارف، الديداكتيك، بنك الاختبارات السابقة ونظام المحاكاة التفاعلي QCM.
            </p>
          </div>

          {/* Controls: Admin / Content Management Mode */}
          <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
            <button
              onClick={() => setEditMode(!editMode)}
              className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition shadow-xs cursor-pointer ${
                editMode
                  ? "bg-amber-500 hover:bg-amber-600 text-white ring-2 ring-amber-300"
                  : "bg-slate-900 hover:bg-slate-800 text-white"
              }`}
              title="تفعيل وضع التحكم والتعديل في محتوى الصفحة"
            >
              <Settings className="w-4 h-4" />
              <span>{editMode ? "إنهاء وضع التحكم ✕" : "لوحة التحكم في المحتوى ⚙️"}</span>
            </button>

            {editMode && (
              <button
                onClick={handleResetDefaults}
                className="bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                title="استعادة التقسيم والمحتوى الافتراضي"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>استعادة الافتراضي</span>
              </button>
            )}
          </div>
        </div>

        {/* Top 4 Dashed Resource Cards (النموذج الموضح بالصورة) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.quickResources.map((card) => {
            const style = getQuickResourceStyle(card.color);
            return (
              <div
                key={card.id}
                onClick={() => setActiveQuickResourceModal(card)}
                className={`border-2 border-dashed rounded-2xl p-4 transition-all duration-200 cursor-pointer flex items-center gap-3.5 group relative ${style.container}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${style.iconBox}`}>
                  {renderIcon(card.iconName, "w-6 h-6")}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className={`font-black text-sm md:text-base leading-snug ${style.title}`}>
                    {card.title}
                  </h3>
                  <p className="text-[11px] text-slate-600 truncate mt-0.5 font-medium">
                    {card.subtitle}
                  </p>
                </div>
                <ChevronLeft className="w-4 h-4 text-slate-400 group-hover:text-slate-700 group-hover:-translate-x-1 transition shrink-0" />
              </div>
            );
          })}
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-2xl w-full sm:w-auto overflow-x-auto text-xs font-bold">
            <button
              onClick={() => setSelectedCycle("all")}
              className={`px-4 py-2 rounded-xl transition cursor-pointer shrink-0 ${
                selectedCycle === "all" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              الكل ({data.subjects.length})
            </button>
            <button
              onClick={() => setSelectedCycle("primary")}
              className={`px-4 py-2 rounded-xl transition cursor-pointer shrink-0 ${
                selectedCycle === "primary" ? "bg-emerald-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              التعليم الابتدائي
            </button>
            <button
              onClick={() => setSelectedCycle("secondary")}
              className={`px-4 py-2 rounded-xl transition cursor-pointer shrink-0 ${
                selectedCycle === "secondary" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              التعليم الثانوي
            </button>
            <button
              onClick={() => setSelectedCycle("other")}
              className={`px-4 py-2 rounded-xl transition cursor-pointer shrink-0 ${
                selectedCycle === "other" ? "bg-purple-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              تخصصات أخرى
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن مادة، تخصص، ديداكتيك..."
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl pr-9 pl-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Edit Mode Notice Banner */}
      {editMode && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <span className="font-black">وضع التحكم والتحرير مفعّل الآن:</span> يمكنك تعديل أي مادة دراسية،
              تغيير الروابط، إضافة أسئلة QCM جديدة، وإضافة مواد وموارد إضافية.
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleStartAddSubject("primary")}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة مادة للابتدائي</span>
            </button>
            <button
              onClick={() => handleStartAddSubject("secondary")}
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة تخصص للثانوي</span>
            </button>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* 1. PRIMARY EDUCATION SECTION (التعليم الابتدائي - المزدوج والأمازيغية)  */}
      {/* ====================================================================== */}
      {(selectedCycle === "all" || selectedCycle === "primary") && primarySubjects.length > 0 && (
        <div className="space-y-4">
          {/* Green Header Banner */}
          <div className="bg-emerald-600 text-white rounded-2xl p-5 md:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center shrink-0">
                <School className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-black">
                  التعليم الابتدائي (المزدوج والأمازيغية)
                </h2>
                <p className="text-xs md:text-sm text-emerald-100 font-medium mt-0.5">
                  {data.primaryNotice}
                </p>
              </div>
            </div>

            {editMode && (
              <button
                onClick={() => handleStartAddSubject("primary")}
                className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 self-start md:self-auto cursor-pointer transition"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة مادة جديدة للابتدائي</span>
              </button>
            )}
          </div>

          {/* Primary Subject Cards */}
          <div className="space-y-4">
            {primarySubjects.map((sub) => {
              const colors = getColorStyles(sub.colorScheme);
              return (
                <div
                  key={sub.id}
                  className={`bg-white rounded-2xl border ${colors.border} shadow-xs overflow-hidden transition-all duration-200 hover:shadow-md`}
                >
                  {/* Card Title Bar */}
                  <div className={`px-5 py-3.5 flex items-center justify-between border-b ${colors.headerBg}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/90 shadow-xs flex items-center justify-center">
                        {renderIcon(sub.iconName, `w-4 h-4 ${colors.iconColor}`)}
                      </div>
                      <h3 className="font-black text-base md:text-lg">{sub.title}</h3>
                    </div>

                    {editMode && (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setIsNewSubject(false);
                            setEditingSubject(sub);
                          }}
                          className="bg-white hover:bg-slate-100 text-slate-700 p-1.5 rounded-lg border border-slate-200 text-xs flex items-center gap-1 cursor-pointer"
                          title="تعديل المادة ومحتوياتها"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                          <span>تعديل</span>
                        </button>
                        {isManager ? (
                          <button
                            onClick={() => handleDeleteSubject(sub.id)}
                            className="bg-white hover:bg-rose-50 text-rose-600 p-1.5 rounded-lg border border-rose-200 text-xs cursor-pointer"
                            title="حذف المادة (صلاحية المدير kolchitv@gmail.com)"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <span
                            className="p-1.5 text-slate-300 cursor-not-allowed opacity-40 inline-flex items-center"
                            title="الحذف مقتصر على مدير المنصة (kolchitv@gmail.com)"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* 5 Action Blocks Grid */}
                  <div className="p-4 md:p-5">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                      {sub.actions.map((act) => (
                        <div
                          key={act.id}
                          onClick={() => handleOpenAction(sub, act)}
                          className={`bg-slate-50/70 hover:bg-white border border-slate-200/80 rounded-xl p-3.5 text-center cursor-pointer transition flex flex-col items-center justify-center gap-1.5 group shadow-2xs ${colors.actionHover}`}
                        >
                          <div className="w-9 h-9 rounded-lg bg-white shadow-2xs border border-slate-200/60 flex items-center justify-center group-hover:scale-110 transition shrink-0">
                            {renderIcon(act.iconName, `w-5 h-5 ${colors.iconColor}`)}
                          </div>
                          <span className="font-black text-xs text-slate-800 group-hover:text-blue-700 transition">
                            {act.title}
                          </span>
                          <span className="text-[10px] text-slate-600 line-clamp-1 font-medium">
                            {act.subtitle}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* 2. SECONDARY EDUCATION SECTION (التعليم الثانوي - إعدادي وتأهيلي)       */}
      {/* ====================================================================== */}
      {(selectedCycle === "all" || selectedCycle === "secondary") && secondarySubjects.length > 0 && (
        <div className="space-y-4 pt-4">
          {/* Blue Header Banner */}
          <div className="bg-blue-700 text-white rounded-2xl p-5 md:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center shrink-0">
                <School className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-black">
                  التعليم الثانوي (إعدادي وتأهيلي)
                </h2>
                <p className="text-xs md:text-sm text-blue-100 font-medium mt-0.5">
                  موارد وملخصات لجميع مواد سلك التعليم الثانوي وفق أحدث التوصيفات.
                </p>
              </div>
            </div>

            {editMode && (
              <button
                onClick={() => handleStartAddSubject("secondary")}
                className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 self-start md:self-auto cursor-pointer transition"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة تخصص ثانوي جديد</span>
              </button>
            )}
          </div>

          {/* Secondary Notice Box */}
          <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-4 flex items-start gap-3 text-xs md:text-sm text-blue-950 font-medium">
            <Info className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">{data.secondaryNotice}</p>
          </div>

          {/* Secondary Subjects Cards */}
          <div className="space-y-4">
            {secondarySubjects.map((sub) => {
              const colors = getColorStyles(sub.colorScheme);
              return (
                <div
                  key={sub.id}
                  className={`bg-white rounded-2xl border ${colors.border} shadow-xs overflow-hidden transition-all duration-200 hover:shadow-md`}
                >
                  <div className={`px-5 py-3.5 flex items-center justify-between border-b ${colors.headerBg}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/90 shadow-xs flex items-center justify-center">
                        {renderIcon(sub.iconName, `w-4 h-4 ${colors.iconColor}`)}
                      </div>
                      <h3 className="font-black text-base md:text-lg">{sub.title}</h3>
                    </div>

                    {editMode && (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setIsNewSubject(false);
                            setEditingSubject(sub);
                          }}
                          className="bg-white hover:bg-slate-100 text-slate-700 p-1.5 rounded-lg border border-slate-200 text-xs flex items-center gap-1 cursor-pointer"
                          title="تعديل المادة ومحتوياتها"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                          <span>تعديل</span>
                        </button>
                        {isManager ? (
                          <button
                            onClick={() => handleDeleteSubject(sub.id)}
                            className="bg-white hover:bg-rose-50 text-rose-600 p-1.5 rounded-lg border border-rose-200 text-xs cursor-pointer"
                            title="حذف المادة (صلاحية المدير kolchitv@gmail.com)"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <span
                            className="p-1.5 text-slate-300 cursor-not-allowed opacity-40 inline-flex items-center"
                            title="الحذف مقتصر على مدير المنصة (kolchitv@gmail.com)"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="p-4 md:p-5">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                      {sub.actions.map((act) => (
                        <div
                          key={act.id}
                          onClick={() => handleOpenAction(sub, act)}
                          className={`bg-slate-50/70 hover:bg-white border border-slate-200/80 rounded-xl p-3.5 text-center cursor-pointer transition flex flex-col items-center justify-center gap-1.5 group shadow-2xs ${colors.actionHover}`}
                        >
                          <div className="w-9 h-9 rounded-lg bg-white shadow-2xs border border-slate-200/60 flex items-center justify-center group-hover:scale-110 transition shrink-0">
                            {renderIcon(act.iconName, `w-5 h-5 ${colors.iconColor}`)}
                          </div>
                          <span className="font-black text-xs text-slate-800 group-hover:text-blue-700 transition">
                            {act.title}
                          </span>
                          <span className="text-[10px] text-slate-600 line-clamp-1 font-medium">
                            {act.subtitle}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* 3. OTHER SPECIALTIES SECTION (تخصصات أخرى)                           */}
      {/* ====================================================================== */}
      {(selectedCycle === "all" || selectedCycle === "other") && otherSubjects.length > 0 && (
        <div className="space-y-4 pt-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-700" />
                <h2 className="text-xl font-black text-slate-900">تخصصات أخرى</h2>
              </div>
              {editMode && (
                <button
                  onClick={() => handleStartAddSubject("other")}
                  className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>إضافة تخصص</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherSubjects.map((sub) => {
                const colors = getColorStyles(sub.colorScheme);
                return (
                  <div
                    key={sub.id}
                    className="bg-slate-50/70 border border-slate-200 rounded-2xl p-4 text-center space-y-3 hover:bg-white hover:border-blue-300 hover:shadow-xs transition"
                  >
                    <div className="w-11 h-11 mx-auto rounded-xl bg-white shadow-xs flex items-center justify-center">
                      {renderIcon(sub.iconName, `w-6 h-6 ${colors.iconColor}`)}
                    </div>
                    <div>
                      <h4 className="font-black text-sm text-slate-900">{sub.title}</h4>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      {sub.actions.map((act) => (
                        <button
                          key={act.id}
                          onClick={() => handleOpenAction(sub, act)}
                          className="w-full bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl py-1.5 px-2 text-xs font-bold text-slate-700 hover:text-blue-800 transition cursor-pointer flex items-center justify-center gap-1"
                        >
                          <span>{act.title}</span>
                          <ChevronLeft className="w-3 h-3 text-slate-400" />
                        </button>
                      ))}
                    </div>

                    {editMode && (
                      <div className="pt-2 border-t border-slate-200/60 flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setIsNewSubject(false);
                            setEditingSubject(sub);
                          }}
                          className="text-blue-600 hover:text-blue-800 text-[11px] font-bold"
                        >
                          تعديل
                        </button>
                        {isManager ? (
                          <>
                            <span className="text-slate-300">•</span>
                            <button
                              onClick={() => handleDeleteSubject(sub.id)}
                              className="text-rose-600 hover:text-rose-800 text-[11px] font-bold cursor-pointer"
                              title="حذف التخصص (صلاحية المدير kolchitv@gmail.com)"
                            >
                              حذف
                            </button>
                          </>
                        ) : (
                          <>
                            <span className="text-slate-300">•</span>
                            <span
                              className="text-slate-300 text-[11px] cursor-not-allowed opacity-50"
                              title="الحذف مقتصر على مدير المنصة (kolchitv@gmail.com)"
                            >
                              حذف
                            </span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* MODAL 1: SubAction Content Viewer & QCM Simulator                     */}
      {/* ====================================================================== */}
      {activeActionModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-5 text-right">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                  {renderIcon(activeActionModal.action.iconName, "w-5 h-5")}
                </div>
                <div>
                  <h3 className="font-black text-lg text-slate-900">
                    {activeActionModal.action.title} - {activeActionModal.subject.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">
                    {activeActionModal.action.subtitle}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveActionModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* If action is QCM, show interactive Quiz simulator */}
            {activeActionModal.action.type === "qcm" && activeActionModal.action.qcmQuestions && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-700">
                    السؤال {currentQcmIndex + 1} من {activeActionModal.action.qcmQuestions.length}
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-black text-[11px]">
                    محاكاة نظام QCM
                  </span>
                </div>

                {/* Current Question */}
                {(() => {
                  const q = activeActionModal.action.qcmQuestions[currentQcmIndex];
                  const chosen = selectedAnswers[currentQcmIndex];
                  const hasAnswered = chosen !== undefined;

                  return (
                    <div className="space-y-3">
                      <p className="font-black text-slate-900 text-sm sm:text-base leading-relaxed p-2">
                        {q.question}
                      </p>

                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => {
                          let optClass = "border-slate-200 bg-white hover:bg-slate-50 text-slate-800";
                          if (hasAnswered) {
                            if (optIdx === q.correctIndex) {
                              optClass = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-300";
                            } else if (chosen === optIdx) {
                              optClass = "border-rose-500 bg-rose-50 text-rose-900";
                            } else {
                              optClass = "border-slate-200 bg-slate-50 text-slate-400 opacity-60";
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={hasAnswered}
                              onClick={() =>
                                setSelectedAnswers({
                                  ...selectedAnswers,
                                  [currentQcmIndex]: optIdx,
                                })
                              }
                              className={`w-full text-right p-3.5 rounded-xl border transition text-xs sm:text-sm flex items-center justify-between gap-2 cursor-pointer ${optClass}`}
                            >
                              <span>{opt}</span>
                              {hasAnswered && optIdx === q.correctIndex && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              )}
                              {hasAnswered && chosen === optIdx && optIdx !== q.correctIndex && (
                                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {hasAnswered && (
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-xs text-blue-950 space-y-1">
                          <span className="font-black text-blue-800 block">💡 التوضيح الديداكتيكي والتعليل:</span>
                          <p className="leading-relaxed">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Navigation inside QCM */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <button
                    disabled={currentQcmIndex === 0}
                    onClick={() => setCurrentQcmIndex((prev) => Math.max(0, prev - 1))}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
                  >
                    السابق
                  </button>

                  {currentQcmIndex < activeActionModal.action.qcmQuestions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQcmIndex((prev) => prev + 1)}
                      className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs cursor-pointer shadow-xs"
                    >
                      السؤال التالي
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowQcmResults(true)}
                      className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs cursor-pointer shadow-xs"
                    >
                      عرض النتيجة النهائية
                    </button>
                  )}
                </div>

                {/* Results View */}
                {showQcmResults && (
                  <div className="bg-slate-900 text-white p-5 rounded-2xl text-center space-y-2">
                    <Award className="w-8 h-8 text-amber-400 mx-auto" />
                    <h4 className="font-black text-base">ملخص الاختبار التجريبي</h4>
                    <p className="text-xs text-slate-300">
                      لقد أجبت بشكل صحيح على{" "}
                      <span className="text-emerald-400 font-black text-sm">
                        {
                          Object.entries(selectedAnswers).filter(
                            ([qIdx, ans]) =>
                              activeActionModal.action.qcmQuestions![Number(qIdx)].correctIndex === ans
                          ).length
                        }
                      </span>{" "}
                      من أصل {activeActionModal.action.qcmQuestions.length} أسئلة.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* For other non-QCM action types (Knowledge, Didactics, Exams, Summaries) */}
            {activeActionModal.action.type !== "qcm" && (
              <div className="space-y-4">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                    <BookOpen className="w-4 h-4 text-blue-700" />
                    <span>الملخص التوجيهي والمحاور الأساسية:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {activeActionModal.action.contentSummary ||
                      "يتضمن هذا الركن المحاور المحددة في الأطر المرجعية والتوصيفات الرسمية للاختبار الكتابي والشفوي، مع منهجيات التخطيط والتدبير والتقويم المعتمدة في المراكز الجهوية لمهن التربية والتكوين."}
                  </p>
                </div>

                {/* List of Previous Exams / Official Downloads */}
                <div className="space-y-2">
                  <h4 className="font-black text-xs text-slate-700">الملفات ونماذج الامتحانات المتاحة للتحميل:</h4>
                  <div className="space-y-2">
                    {[
                      { title: "موضوع الدورة العادية 2024 مع عناصر الإجابة الرسمية", size: "1.2 MB", year: "2024" },
                      { title: "موضوع الدورة الاستدراكية 2023 مع سلم التنقيط", size: "980 KB", year: "2023" },
                      { title: "دليل الديداكتيك والتوصيفات الرسمية المعتمدة", size: "2.4 MB", year: "وزاري" },
                    ].map((file, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-3 text-xs hover:border-blue-300 transition"
                      >
                        <div className="flex items-center gap-2.5">
                          <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                          <span className="font-bold text-slate-800">{file.title}</span>
                        </div>
                        <a
                          href="https://www.profpress.net/p/concours-de-lenseignement.html"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-lg flex items-center gap-1 shrink-0 transition"
                        >
                          <Download className="w-3 h-3" />
                          <span>تحميل ({file.size})</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* External link to Profpress full article */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <a
                    href="https://www.profpress.net/p/concours-de-lenseignement.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-800 text-xs font-bold flex items-center gap-1.5"
                  >
                    <span>تصفح الموضوع الكامل والمرفقات على Profpress.net</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setActiveActionModal(null)}
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer"
                  >
                    إغلاق
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* MODAL 2: Quick Resource Cards Modal (توصيفات، مستجدات، وثائق، شفوي)   */}
      {/* ====================================================================== */}
      {activeQuickResourceModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4 text-right">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  {renderIcon(activeQuickResourceModal.iconName, "w-5 h-5")}
                </div>
                <div>
                  <h3 className="font-black text-lg text-slate-900">
                    {activeQuickResourceModal.title}
                  </h3>
                  <p className="text-xs text-slate-600">{activeQuickResourceModal.subtitle}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveQuickResourceModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed">
              {activeQuickResourceModal.id === "specs" && (
                <div className="space-y-3">
                  <p className="font-bold text-slate-900">
                    تحدد التوصيفات الرسمية الصادرة عن المركز الوطني للامتحانات المجالات الرئيسية للاختبارات ووزن كل مكون:
                  </p>
                  <ul className="list-disc pr-5 space-y-1.5 text-slate-600">
                    <li>توصيفات السلك الابتدائي (اللغة العربية، الفرنسية، الرياضيات، النشاط العلمي، وعلوم التربية).</li>
                    <li>توصيفات التعليم الثانوي بسلكيه الإعدادي والتأهيلي حسب مادة التخصص.</li>
                    <li>معاملات المواد: التخصص وديداكتيك التخصص (المعامل الأكبر) مع علوم التربية.</li>
                  </ul>
                </div>
              )}

              {activeQuickResourceModal.id === "news" && (
                <div className="space-y-3">
                  <p className="font-bold text-slate-900">
                    آخر الإعلانات والمذكرات التنظيمية الصادرة عن وزارة التربية الوطنية:
                  </p>
                  <ul className="list-disc pr-5 space-y-1.5 text-slate-600">
                    <li>تاريخ فتح بوابة الترشيح الإلكتروني عبر المنظومة المخصصة.</li>
                    <li>توزيع المناصب المفتوحة حسب الأكاديميات الجهوية والتخصصات.</li>
                    <li>جدولة إجراء الاختبارات الكتابية وإعلان لوائح المقبولين لاجتياز الاختبارات الشفوية.</li>
                  </ul>
                </div>
              )}

              {activeQuickResourceModal.id === "registration" && (
                <div className="space-y-3">
                  <p className="font-bold text-slate-900">
                    شروط الترشيح والوثائق المكونة لملف إيداع الترشيح:
                  </p>
                  <ul className="list-disc pr-5 space-y-1.5 text-slate-600">
                    <li>شهادة الإجازة في التربية أو الإجازة في الدراسات الأساسية أو ما يعادلها.</li>
                    <li>نسخة مصادق عليها من البطاقة الوطنية للتعريف الإلكترونية (CNIE).</li>
                    <li>بيان النقط المحصل عليها خلال سنوات الإجازة لمسابقة الانتقاء الأولي.</li>
                    <li>وصل التسجيل الإلكتروني المسحوب من بوابة التوظيف الرسمية.</li>
                  </ul>
                </div>
              )}

              {activeQuickResourceModal.id === "interview" && (
                <div className="space-y-3">
                  <p className="font-bold text-slate-900">
                    دليل الاستعداد للاختبار الشفوي والمقابلة مع لجنة التحكيم:
                  </p>
                  <ul className="list-disc pr-5 space-y-1.5 text-slate-600">
                    <li>محاكاة وضعية تعلمية (وضعية تدريسية مدتها 15-20 دقيقة).</li>
                    <li>معايير التقييم: سلامة اللغة، هندام الأستاذ، التمكن من المادة العلمية، والاتزان النفسي.</li>
                    <li>أسئلة في علوم التربية ومستجدات المنظومة التعليمية ومواقف حل النزاعات الصفية.</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <a
                href={activeQuickResourceModal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition"
              >
                <span>الانتقال للمصدر الرسمي ↗</span>
              </a>
              <button
                onClick={() => setActiveQuickResourceModal(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2 rounded-xl"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* MODAL 3: Subject Editor (وضع التحكم والتحرير للمادة)                  */}
      {/* ====================================================================== */}
      {editingSubject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-5 text-right">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-blue-700" />
                <h3 className="font-black text-base sm:text-lg text-slate-900">
                  {isNewSubject ? "إضافة مادة / تخصص جديد" : `تعديل محتوى: ${editingSubject.title}`}
                </h3>
              </div>
              <button
                onClick={() => setEditingSubject(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSubject} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">اسم المادة / التخصص:</label>
                  <input
                    type="text"
                    value={editingSubject.title}
                    onChange={(e) => setEditingSubject({ ...editingSubject, title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">السلك التعليمي:</label>
                  <select
                    value={editingSubject.cycle}
                    onChange={(e) =>
                      setEditingSubject({
                        ...editingSubject,
                        cycle: e.target.value as "primary" | "secondary" | "other",
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold"
                  >
                    <option value="primary">التعليم الابتدائي</option>
                    <option value="secondary">التعليم الثانوي</option>
                    <option value="other">تخصصات أخرى</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">لون التمييز (Color Scheme):</label>
                  <select
                    value={editingSubject.colorScheme}
                    onChange={(e) =>
                      setEditingSubject({
                        ...editingSubject,
                        colorScheme: e.target.value as any,
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold"
                  >
                    <option value="green">أخضر (Green)</option>
                    <option value="blue">أزرق (Blue)</option>
                    <option value="purple">بنفسجي (Purple)</option>
                    <option value="cyan">سماوي (Cyan)</option>
                    <option value="emerald">زمردي (Emerald)</option>
                    <option value="amber">كهرماني (Amber)</option>
                    <option value="rose">وردي (Rose)</option>
                    <option value="teal">فيروزي (Teal)</option>
                    <option value="orange">برتقالي (Orange)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">الأيقونة (Icon):</label>
                  <select
                    value={editingSubject.iconName}
                    onChange={(e) => setEditingSubject({ ...editingSubject, iconName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold"
                  >
                    <option value="BookOpen">كتاب (BookOpen)</option>
                    <option value="Brain">دماغ / علوم التربية (Brain)</option>
                    <option value="Calculator">آلة حاسبة / رياضيات (Calculator)</option>
                    <option value="FlaskConical">مختبر / علوم (FlaskConical)</option>
                    <option value="Languages">لغات (Languages)</option>
                    <option value="Globe">كرة أرضية / إنجليزية (Globe)</option>
                    <option value="Compass">بوصلة / اجتماعيات (Compass)</option>
                    <option value="PenTool">قلم / أمازيغية (PenTool)</option>
                    <option value="Activity">رياضة (Activity)</option>
                    <option value="Laptop">حاسوب / معلوميات (Laptop)</option>
                    <option value="Settings">تروس / تكنولوجيا (Settings)</option>
                    <option value="TrendingUp">رسم بياني / اقتصاد (TrendingUp)</option>
                  </select>
                </div>
              </div>

              {/* Sub Actions Editor */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-slate-900">أزرار ومحاور المادة ({editingSubject.actions.length}):</h4>
                  <button
                    type="button"
                    onClick={() => {
                      const newActId = `act_${Date.now()}`;
                      setEditingSubject({
                        ...editingSubject,
                        actions: [
                          ...editingSubject.actions,
                          {
                            id: newActId,
                            title: "محور جديد",
                            subtitle: "وصف موجز",
                            type: "knowledge",
                            iconName: "FileText",
                          },
                        ],
                      });
                    }}
                    className="text-blue-700 hover:text-blue-800 font-bold text-xs flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>إضافة زر محور</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {editingSubject.actions.map((act, idx) => (
                    <div
                      key={act.id}
                      className="bg-slate-50 p-3 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-2 items-center"
                    >
                      <input
                        type="text"
                        value={act.title}
                        placeholder="عنوان الزر"
                        onChange={(e) => {
                          const newActions = [...editingSubject.actions];
                          newActions[idx].title = e.target.value;
                          setEditingSubject({ ...editingSubject, actions: newActions });
                        }}
                        className="bg-white border border-slate-300 rounded-lg p-1.5 font-bold text-xs"
                      />
                      <input
                        type="text"
                        value={act.subtitle}
                        placeholder="العنوان الفرعي"
                        onChange={(e) => {
                          const newActions = [...editingSubject.actions];
                          newActions[idx].subtitle = e.target.value;
                          setEditingSubject({ ...editingSubject, actions: newActions });
                        }}
                        className="bg-white border border-slate-300 rounded-lg p-1.5 text-xs"
                      />
                      <div className="flex items-center gap-1.5">
                        <select
                          value={act.type}
                          onChange={(e) => {
                            const newActions = [...editingSubject.actions];
                            newActions[idx].type = e.target.value as any;
                            setEditingSubject({ ...editingSubject, actions: newActions });
                          }}
                          className="bg-white border border-slate-300 rounded-lg p-1.5 text-xs flex-1"
                        >
                          <option value="knowledge">معارف</option>
                          <option value="didactics">ديداكتيك</option>
                          <option value="exams">نماذج اختبارات</option>
                          <option value="mock">اختبار تجريبي</option>
                          <option value="qcm">QCM تفاعلي</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingSubject({
                              ...editingSubject,
                              actions: editingSubject.actions.filter((_, i) => i !== idx),
                            });
                          }}
                          className="text-rose-600 hover:text-rose-800 p-1"
                          title="حذف هذا الزر"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingSubject(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-black shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ التغييرات</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
