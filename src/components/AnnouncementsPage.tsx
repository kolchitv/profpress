import React, { useState, useEffect, useMemo } from "react";
import {
  Megaphone,
  FileText,
  BookOpen,
  Bell,
  Award,
  Calendar,
  Search,
  PlusCircle,
  Filter,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Sparkles,
  Edit3,
  Trash2,
  Download,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Lock,
  LayoutDashboard,
  Activity,
  LogOut,
  Users,
} from "lucide-react";
import { TopicItem, TopicCategory, TabKey, AdminSession } from "../types";
import { INITIAL_TOPICS } from "../data/announcementsData";
import { TopicEditorModal } from "./TopicEditorModal";
import { TopicReaderModal } from "./TopicReaderModal";
import { AdminControlPanel } from "./AdminControlPanel";
import { AdminLoginModal } from "./AdminLoginModal";
import { canUserDeleteArticles, isManagerEmail } from "../utils/adminAuth";

interface AnnouncementsPageProps {
  onNavigateToTab?: (tab: TabKey) => void;
  defaultFilter?: string; // "الكل" | "مذكرات" | "مقالات"
}

export const AnnouncementsPage: React.FC<AnnouncementsPageProps> = ({
  onNavigateToTab,
  defaultFilter = "الكل",
}) => {
  // 1. Persistence for Topics in localStorage with seamless merge of new official circulars
  const [topics, setTopics] = useState<TopicItem[]>(() => {
    try {
      const saved = localStorage.getItem("yallataalim_announcements_v1");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const existingIds = new Set(parsed.map((t: TopicItem) => t.id));
          const newFromInitial = INITIAL_TOPICS.filter((t) => !existingIds.has(t.id));
          const updatedSaved = parsed.map((item: TopicItem) => {
            const fresh = INITIAL_TOPICS.find((t) => t.id === item.id);
            if (fresh && (!item.downloadUrl || item.downloadUrl === "#" || (fresh.downloads && fresh.downloads.length > 0 && (!item.downloads || item.downloads.length === 0)))) {
              return {
                ...item,
                downloadUrl: fresh.downloadUrl || item.downloadUrl,
                downloadLabel: fresh.downloadLabel || item.downloadLabel,
                downloads: fresh.downloads || item.downloads,
              };
            }
            return item;
          });
          return [...newFromInitial, ...updatedSaved];
        }
      }
    } catch (e) {
      console.error("Failed to load saved announcements", e);
    }
    return INITIAL_TOPICS;
  });

  const saveTopics = (updated: TopicItem[]) => {
    setTopics(updated);
    try {
      localStorage.setItem("yallataalim_announcements_v1", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to persist announcements", e);
    }
  };

  // 2. Admin Authentication State in localStorage
  const [adminSession, setAdminSession] = useState<AdminSession>(() => {
    try {
      const saved = localStorage.getItem("profpress_admin_session");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.isAdmin) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return {
      isAdmin: false,
      adminName: "زائر (أستاذ)",
      adminEmail: "",
      role: "visitor",
    };
  });

  const handleAdminLogin = (session: AdminSession) => {
    setAdminSession(session);
    try {
      localStorage.setItem("profpress_admin_session", JSON.stringify(session));
    } catch (e) {
      console.error(e);
    }
  };

  const handleAdminLogout = () => {
    const defaultSession: AdminSession = {
      isAdmin: false,
      adminName: "زائر (أستاذ)",
      adminEmail: "",
      role: "visitor",
    };
    setAdminSession(defaultSession);
    setViewMode("public");
    try {
      localStorage.removeItem("profpress_admin_session");
    } catch (e) {
      console.error(e);
    }
  };

  // View Mode: public reader view vs full admin dashboard
  const [viewMode, setViewMode] = useState<"public" | "admin_dashboard">("public");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Filter & Search
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>(defaultFilter);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 6;

  // Modals state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState<TopicItem | null>(null);
  const [readingTopic, setReadingTopic] = useState<TopicItem | null>(null);

  // Check if current user is the manager (kolchitv@gmail.com)
  const isManager = adminSession.isAdmin && canUserDeleteArticles(adminSession);

  // Filter categories
  const filterOptions = [
    { label: "الكل", value: "الكل" },
    { label: "مذكرة", value: "memo" },
    { label: "إعلان", value: "announcement" },
    { label: "مقال", value: "article" },
    { label: "بلاغ", value: "communique" },
    { label: "نتائج وترقيات", value: "results" },
  ];

  // Filtered list
  const filteredTopics = useMemo(() => {
    return topics.filter((item) => {
      const matchesCategory =
        activeCategoryFilter === "الكل" ||
        item.category === activeCategoryFilter ||
        (activeCategoryFilter === "مذكرات" && item.category === "memo") ||
        (activeCategoryFilter === "مقالات" && item.category === "article");

      const term = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !term ||
        item.title.toLowerCase().includes(term) ||
        item.summary.toLowerCase().includes(term) ||
        item.categoryLabel.toLowerCase().includes(term) ||
        item.seo?.focusKeyword?.toLowerCase().includes(term) ||
        item.tags?.some((t) => t.toLowerCase().includes(term));

      return matchesCategory && matchesSearch;
    });
  }, [topics, activeCategoryFilter, searchTerm]);

  // Reset page when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategoryFilter, searchTerm]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredTopics.length / ITEMS_PER_PAGE) || 1;
  const paginatedTopics = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTopics.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTopics, currentPage]);

  // Category styling helper
  const getCategoryTheme = (category: TopicCategory) => {
    switch (category) {
      case "announcement":
        return {
          topBorder: "border-t-4 border-amber-400",
          iconBg: "bg-amber-50 border-amber-200/90 text-amber-600",
          badgeBg: "bg-amber-100/70 text-amber-800 border-amber-200",
          arrowColor: "text-amber-600 group-hover:text-amber-700",
          icon: Megaphone,
        };
      case "article":
        return {
          topBorder: "border-t-4 border-blue-400",
          iconBg: "bg-blue-50 border-blue-200/90 text-blue-600",
          badgeBg: "bg-blue-100/70 text-blue-800 border-blue-200",
          arrowColor: "text-blue-600 group-hover:text-blue-700",
          icon: BookOpen,
        };
      case "communique":
        return {
          topBorder: "border-t-4 border-purple-400",
          iconBg: "bg-purple-50 border-purple-200/90 text-purple-600",
          badgeBg: "bg-purple-100/70 text-purple-800 border-purple-200",
          arrowColor: "text-purple-600 group-hover:text-purple-700",
          icon: Bell,
        };
      case "results":
        return {
          topBorder: "border-t-4 border-rose-400",
          iconBg: "bg-rose-50 border-rose-200/90 text-rose-600",
          badgeBg: "bg-rose-100/70 text-rose-800 border-rose-200",
          arrowColor: "text-rose-600 group-hover:text-rose-700",
          icon: Award,
        };
      case "memo":
      default:
        return {
          topBorder: "border-t-4 border-teal-400",
          iconBg: "bg-[#f0fdf4] border-teal-200/90 text-teal-600",
          badgeBg: "bg-teal-100/70 text-teal-800 border-teal-200",
          arrowColor: "text-teal-600 group-hover:text-teal-700",
          icon: FileText,
        };
    }
  };

  // Safe action triggers: require admin login
  const handleTriggerCreate = () => {
    if (!adminSession.isAdmin) {
      setIsLoginModalOpen(true);
      return;
    }
    setEditingTopic(null);
    setIsEditorOpen(true);
  };

  const handleTriggerEdit = (topic: TopicItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!adminSession.isAdmin) {
      setIsLoginModalOpen(true);
      return;
    }
    setEditingTopic(topic);
    setIsEditorOpen(true);
  };

  // Save handler for editor
  const handleSaveTopic = (savedTopic: TopicItem) => {
    const exists = topics.some((t) => t.id === savedTopic.id);
    if (exists) {
      const updated = topics.map((t) => (t.id === savedTopic.id ? savedTopic : t));
      saveTopics(updated);
    } else {
      saveTopics([savedTopic, ...topics]);
    }
  };

  // Delete handler - Reserved strictly for the manager (kolchitv@gmail.com)
  const handleDeleteTopic = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!adminSession.isAdmin) {
      setIsLoginModalOpen(true);
      return;
    }
    if (!isManager) {
      alert("عذراً، صلاحية حذف المقالات والمواضيع مقتصرة حصرياً على مدير المنصة الرئيسي.");
      return;
    }
    if (window.confirm("هل أنت متأكد من حذف هذا الموضوع نهائياً من الموقع؟")) {
      const updated = topics.filter((t) => t.id !== id);
      saveTopics(updated);
      if (readingTopic?.id === id) setReadingTopic(null);
    }
  };

  const handleToggleUrgent = (id: string) => {
    const updated = topics.map((t) => (t.id === id ? { ...t, urgent: !t.urgent } : t));
    saveTopics(updated);
  };

  // Reset to initial data
  const handleResetDefaults = () => {
    if (!adminSession.isAdmin) {
      setIsLoginModalOpen(true);
      return;
    }
    if (window.confirm("هل تريد استعادة قائمة المذكرات والمقالات الافتراضية كاملة؟")) {
      saveTopics(INITIAL_TOPICS);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto" dir="rtl">
      {/* ========================================================================= */}
      {/* 0. ADMIN STATUS BAR / LOGIN TRIGGER */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-3 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        {adminSession.isAdmin ? (
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs px-3 py-1 rounded-xl font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>إدارة المنصة (حساب مسؤول معتمد)</span>
            </span>
            <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
              صلاحية كاملة للتحرير والسيو
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Lock className="w-3.5 h-3.5 text-amber-600" />
            <span>
              لوحة التحكم والتحرير محصورة بمدير المنصة المعتمد
            </span>
          </div>
        )}

        <div className="flex items-center gap-2">
          {adminSession.isAdmin ? (
            <>
              {viewMode === "admin_dashboard" ? (
                <button
                  type="button"
                  onClick={() => setViewMode("public")}
                  className="bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold text-xs px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 border border-blue-200 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  <span>تصفح الموقع كزائر</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setViewMode("admin_dashboard")}
                  className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-amber-300" />
                  <span>لوحة تحكم المدير والسيو</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleTriggerCreate}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>+ كتابة موضوع</span>
              </button>

              <button
                type="button"
                onClick={handleAdminLogout}
                className="text-slate-500 hover:text-rose-700 p-1.5 rounded-xl hover:bg-slate-100 transition cursor-pointer"
                title="تسجيل الخروج من الإدارة"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsLoginModalOpen(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>دخول لوحة تحكم الإدارة</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* IF IN ADMIN DASHBOARD VIEW MODE */}
      {/* ========================================================================= */}
      {viewMode === "admin_dashboard" && adminSession.isAdmin ? (
        <AdminControlPanel
          topics={topics}
          adminSession={adminSession}
          onEditTopic={(t) => {
            setEditingTopic(t);
            setIsEditorOpen(true);
          }}
          onAddNewTopic={() => {
            setEditingTopic(null);
            setIsEditorOpen(true);
          }}
          onDeleteTopic={(id) => handleDeleteTopic(id)}
          onToggleUrgent={handleToggleUrgent}
          onSaveTopics={saveTopics}
          onLogout={handleAdminLogout}
        />
      ) : (
        <>
          {/* ========================================================================= */}
          {/* 1. TOP HEADER (Matching Screenshot 3) */}
          {/* ========================================================================= */}
          <div className="text-center space-y-2 pt-2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0f3e3a] font-cairo tracking-tight">
              المستجدات
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
              أحدث المذكرات، الإعلانات، والبلاغات الرسمية لقطاع التربية والتكوين
            </p>
          </div>

          {/* ========================================================================= */}
          {/* 2. FACEBOOK CHANNEL & PAGE BANNER (ProfPress on Facebook) */}
          {/* ========================================================================= */}
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50/60 to-blue-50 border border-blue-200 rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-3 shadow-2xs">
            {/* Right side: Facebook Icon + Text */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#1877F2] text-white flex items-center justify-center shrink-0 shadow-2xs">
                {/* Official Facebook F SVG */}
                <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <div className="space-y-0.5">
                <h3 className="font-bold text-xs sm:text-sm text-blue-950 font-cairo flex items-center gap-2">
                  <span>قناة وصفحة بروف بريس على الفايسبوك</span>
                  <span className="text-[10px] bg-[#1877F2] text-white px-2 py-0.5 rounded-full font-bold">
                    Facebook
                  </span>
                </h3>
                <p className="text-[11px] sm:text-xs text-blue-800">
                  انضم إلى صفحة بروف بريس الرسمية لمتابعة جديد المذكرات، ومستجدات التعليم، والوثائق فور صدورها
                </p>
              </div>
            </div>

            {/* Left side: Follow Button */}
            <a
              href="https://facebook.com/profpress.net"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-xl transition shadow-2xs shrink-0 flex items-center gap-1.5"
            >
              <span>متابعة الصفحة</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* ========================================================================= */}
          {/* 3. TOOLBAR: FILTERS, SEARCH & INTERNAL EDITOR TRIGGER */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              {/* Search Box */}
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="ابحث في المذكرات، الإعلانات، أو المقالات..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-4 pr-10 py-2.5 text-xs font-medium outline-hidden focus:ring-2 focus:ring-teal-500"
                />
                <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
              </div>

              {/* Action Buttons: Add Topic & Reset */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleTriggerCreate}
                  className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>
                    {adminSession.isAdmin ? "+ كتابة موضوع / تحرير مقال" : "كتابة مقال (خاص بالمدير)"}
                  </span>
                </button>

                {adminSession.isAdmin && (
                  <button
                    type="button"
                    onClick={handleResetDefaults}
                    className="text-slate-500 hover:text-slate-800 p-2 rounded-xl hover:bg-slate-100 transition cursor-pointer"
                    title="استعادة المواضيع الافتراضية"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100">
              <span className="text-xs text-slate-400 font-bold ml-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                <span>تصنيف:</span>
              </span>
              {filterOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setActiveCategoryFilter(opt.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeCategoryFilter === opt.value
                      ? "bg-teal-700 text-white shadow-2xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
              <span className="mr-auto text-[11px] text-slate-500 font-mono">
                {filteredTopics.length} موضوع
              </span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 4. ANNOUNCEMENT CARDS LIST (Matching Screenshots 1, 2, 3) */}
          {/* ========================================================================= */}
          <div className="space-y-3.5">
            {paginatedTopics.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-3">
                <FileText className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="font-bold text-slate-700 text-sm">لا توجد مواضيع تطابق بحثك</h3>
                <p className="text-xs text-slate-500">جرب تغيير كلمات البحث أو اختر تصنيفاً آخر.</p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategoryFilter("الكل");
                    setSearchTerm("");
                  }}
                  className="text-teal-700 font-bold text-xs hover:underline cursor-pointer"
                >
                  عرض جميع المواضيع
                </button>
              </div>
            ) : (
              paginatedTopics.map((topic) => {
                const theme = getCategoryTheme(topic.category);
                const NatureIcon = theme.icon;

                return (
                  <div
                    key={topic.id}
                    onClick={() => setReadingTopic(topic)}
                    className={`bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 relative overflow-hidden ${theme.topBorder}`}
                  >
                    {/* Right Area (RTL): Nature Icon + Category Badge + Date + Title */}
                    <div className="flex items-start sm:items-center gap-3.5 w-full sm:w-auto flex-1">
                      {/* Nature Icon in rounded squircle matching screenshot */}
                      <div
                        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl ${theme.iconBg} border flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}
                        title={`طبيعة الموضوع: ${topic.categoryLabel}`}
                      >
                        <NatureIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>

                      {/* Topic Metadata & Main Title */}
                      <div className="space-y-1 flex-1">
                        {/* Badge and Date Line */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full border ${theme.badgeBg} font-cairo`}
                          >
                            {topic.categoryLabel}
                          </span>
                          <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>{topic.date}</span>
                          </span>
                          {topic.urgent && (
                            <span className="text-[10px] bg-red-600 text-white font-black px-1.5 py-0.2 rounded-md">
                              عاجل
                            </span>
                          )}
                        </div>

                        {/* Bold Title */}
                        <h2 className="text-base sm:text-lg font-bold text-slate-800 group-hover:text-teal-900 transition-colors leading-snug font-cairo">
                          {topic.title}
                        </h2>
                      </div>
                    </div>

                    {/* Left Area (RTL): Edit controls (for admin) & Arrow pointing left (←) */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      {/* Quick Edit/Delete buttons (visible when admin or on hover) */}
                      {adminSession.isAdmin && (
                        <div className="flex items-center gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={(e) => handleTriggerEdit(topic, e)}
                            className="p-1.5 text-slate-400 hover:text-blue-700 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                            title="تعديل الموضوع"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          {/* ONLY MANAGER (kolchitv@gmail.com) CAN DELETE */}
                          {isManager && (
                            <button
                              type="button"
                              onClick={(e) => handleDeleteTopic(topic.id, e)}
                              className="p-1.5 text-slate-400 hover:text-rose-700 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                              title="حذف الموضوع (صلاحية خاصة بمدير المنصة الرئيسي)"
                            >
                              <Trash2 className="w-4 h-4 text-rose-600" />
                            </button>
                          )}
                        </div>
                      )}

                      {/* Left Arrow Icon matching Screenshot 1, 2, 3 */}
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:-translate-x-1">
                        <ArrowLeft className={`w-5 h-5 ${theme.arrowColor}`} />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* ========================================================================= */}
          {/* 5. PAGINATION (Matching Screenshot 1) */}
          {/* ========================================================================= */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              {/* Prev button */}
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className={`w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 transition shadow-2xs ${
                  currentPage === 1
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-slate-50 cursor-pointer"
                }`}
                title="الصفحة السابقة"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Page numbers matching screenshot (e.g. 1, 2, 3, 4) */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                const isActive = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-9 h-9 rounded-xl font-bold text-xs transition shadow-2xs cursor-pointer ${
                      isActive
                        ? "bg-[#0d9488] text-white shadow-xs font-mono"
                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-mono"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* Next button */}
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className={`w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 transition shadow-2xs ${
                  currentPage === totalPages
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-slate-50 cursor-pointer"
                }`}
                title="الصفحة التالية"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}

      {/* ========================================================================= */}
      {/* 6. MODALS: LOGIN, TOPIC EDITOR & TOPIC READER */}
      {/* ========================================================================= */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleAdminLogin}
      />

      {isEditorOpen && (
        <TopicEditorModal
          isOpen={isEditorOpen}
          onClose={() => {
            setIsEditorOpen(false);
            setEditingTopic(null);
          }}
          onSave={handleSaveTopic}
          initialTopic={editingTopic}
        />
      )}

      {readingTopic && (
        <TopicReaderModal
          topic={readingTopic}
          isOpen={Boolean(readingTopic)}
          onClose={() => setReadingTopic(null)}
          isAdmin={adminSession.isAdmin}
          isManager={isManager}
          onEdit={(topic) => {
            if (!adminSession.isAdmin) {
              setIsLoginModalOpen(true);
              return;
            }
            setReadingTopic(null);
            setEditingTopic(topic);
            setIsEditorOpen(true);
          }}
          onDelete={(id) => {
            if (!adminSession.isAdmin) {
              setIsLoginModalOpen(true);
              return;
            }
            handleDeleteTopic(id);
          }}
        />
      )}
    </div>
  );
};
