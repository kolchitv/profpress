import React, { useState, useEffect, useMemo } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Eye,
  Printer,
  Share2,
  Copy,
  Check,
  BookOpen,
  Megaphone,
  Bell,
  Award,
  FileText,
  Sparkles,
  Download,
  ExternalLink,
  Edit3,
  Trash2,
  ShieldCheck,
  MessageCircle,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  Type,
  Home,
  ChevronLeft,
  Share,
  Bookmark,
  ChevronRight,
  Layers,
} from "lucide-react";
import { TopicItem, TabKey } from "../types";
import { ArticleHtmlRenderer } from "./ArticleHtmlRenderer";
import { DownloadGatewayModal } from "./DownloadGatewayModal";
import {
  getDownloadGatewaySettings,
  DOWNLOAD_GATEWAY_EVENT,
} from "../utils/downloadGatewaySettings";

interface TopicArticlePageViewProps {
  topic: TopicItem;
  allTopics: TopicItem[];
  onBack: () => void;
  onSelectTopic: (topic: TopicItem) => void;
  onEdit: (topic: TopicItem) => void;
  onDelete?: (topicId: string) => void;
  isAdmin?: boolean;
  isManager?: boolean;
  onNavigateToTab?: (tab: TabKey) => void;
}

export const TopicArticlePageView: React.FC<TopicArticlePageViewProps> = ({
  topic,
  allTopics,
  onBack,
  onSelectTopic,
  onEdit,
  onDelete,
  isAdmin = false,
  isManager = false,
  onNavigateToTab,
}) => {
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">("large");
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

  // Listen to gateway setting updates
  useEffect(() => {
    const handleSettingsUpdate = () => {
      setGatewaySettings(getDownloadGatewaySettings());
    };
    window.addEventListener(DOWNLOAD_GATEWAY_EVENT, handleSettingsUpdate);
    return () => {
      window.removeEventListener(DOWNLOAD_GATEWAY_EVENT, handleSettingsUpdate);
    };
  }, []);

  // Handle escape key to go back
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onBack();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onBack]);

  // Scroll to top on topic change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [topic.id]);

  const handleCopyLink = () => {
    const url = window.location.href.split("#")[0];
    navigator.clipboard?.writeText(`${url}#${topic.seo?.slug || topic.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const currentUrl = window.location.href.split("#")[0];
    const text = encodeURIComponent(
      `📌 ${topic.title}\n\n${topic.summary}\n\nبقلم: ${topic.author}\n\nاقرأ المقال كاملاً على منصة بروف بريس:\n${currentUrl}#${topic.seo?.slug || topic.id}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const handleTriggerDownload = (title: string, url: string, type = "pdf", size?: string) => {
    if (gatewaySettings.isEnabled) {
      setGatewayFile({
        isOpen: true,
        title,
        url: url || "#",
        type,
        size,
      });
    } else {
      if (!url || url === "#") {
        window.print();
      } else {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    }
  };

  // Find previous and next articles
  const { prevTopic, nextTopic } = useMemo(() => {
    const currentIndex = allTopics.findIndex((t) => t.id === topic.id);
    const prev = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
    const next = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;
    return { prevTopic: prev, nextTopic: next };
  }, [allTopics, topic.id]);

  // Related articles in same category
  const relatedTopics = useMemo(() => {
    return allTopics
      .filter((t) => t.id !== topic.id && (t.category === topic.category || t.category === "article"))
      .slice(0, 3);
  }, [allTopics, topic.id, topic.category]);

  // Theme styling based on category
  const getThemeStyles = () => {
    switch (topic.category) {
      case "announcement":
        return {
          badge: "bg-amber-100 text-amber-900 border-amber-300",
          topBorder: "border-amber-400",
          iconBg: "bg-amber-50 text-amber-700 border-amber-200",
          accentColor: "text-amber-700",
          icon: Megaphone,
        };
      case "article":
        return {
          badge: "bg-blue-100 text-blue-900 border-blue-300",
          topBorder: "border-blue-500",
          iconBg: "bg-blue-50 text-blue-700 border-blue-200",
          accentColor: "text-blue-700",
          icon: BookOpen,
        };
      case "communique":
        return {
          badge: "bg-purple-100 text-purple-900 border-purple-300",
          topBorder: "border-purple-500",
          iconBg: "bg-purple-50 text-purple-700 border-purple-200",
          accentColor: "text-purple-700",
          icon: Bell,
        };
      case "results":
        return {
          badge: "bg-rose-100 text-rose-900 border-rose-300",
          topBorder: "border-rose-500",
          iconBg: "bg-rose-50 text-rose-700 border-rose-200",
          accentColor: "text-rose-700",
          icon: Award,
        };
      case "memo":
      default:
        return {
          badge: "bg-teal-100 text-teal-900 border-teal-300",
          topBorder: "border-teal-500",
          iconBg: "bg-teal-50 text-teal-700 border-teal-200",
          accentColor: "text-teal-700",
          icon: FileText,
        };
    }
  };

  const theme = getThemeStyles();
  const NatureIcon = theme.icon;

  // Font size classes
  const getBodyFontSize = () => {
    switch (fontSize) {
      case "normal":
        return "text-sm sm:text-base leading-relaxed";
      case "xlarge":
        return "text-lg sm:text-xl leading-loose";
      case "large":
      default:
        return "text-base sm:text-lg leading-relaxed";
    }
  };

  return (
    <article className="space-y-6 max-w-5xl mx-auto pb-16" dir="rtl">
      {/* 1. Breadcrumbs & Top Back Button Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        {/* Breadcrumb line */}
        <nav aria-label="مسار التصفح" className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
          <button
            type="button"
            onClick={onBack}
            className="hover:text-blue-800 font-bold flex items-center gap-1 cursor-pointer transition"
          >
            <Home className="w-3.5 h-3.5 text-slate-400" />
            <span>الرئيسية</span>
          </button>
          <span>/</span>
          <button
            type="button"
            onClick={onBack}
            className="hover:text-blue-800 font-bold cursor-pointer transition text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md"
          >
            {topic.categoryLabel || "المقالات التربوية"}
          </button>
          <span>/</span>
          <span className="text-slate-800 font-bold truncate max-w-xs sm:max-w-md">
            {topic.title}
          </span>
        </nav>

        {/* Back to list button */}
        <button
          type="button"
          onClick={onBack}
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-xs group"
          title="العودة إلى قائمة المواضيع والمقالات (Esc)"
        >
          <ArrowRight className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>العودة إلى قائمة المقالات</span>
        </button>
      </div>

      {/* 2. Main Article Container */}
      <div className={`bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden border-t-4 ${theme.topBorder}`}>
        {/* Article Header & Editorial Metadata */}
        <header className="p-6 sm:p-8 md:p-10 bg-gradient-to-b from-slate-50/80 via-white to-white border-b border-slate-100 space-y-5">
          {/* Top badges & dates */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={`text-xs font-black px-3.5 py-1 rounded-full border shadow-2xs font-cairo flex items-center gap-1.5 ${theme.badge}`}
            >
              <NatureIcon className="w-3.5 h-3.5" />
              <span>{topic.categoryLabel}</span>
            </span>

            {topic.urgent && (
              <span className="text-xs bg-red-600 text-white font-black px-2.5 py-0.5 rounded-full shadow-2xs animate-pulse">
                عاجل ومهم
              </span>
            )}

            {topic.featured && (
              <span className="text-xs bg-amber-400 text-slate-950 font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                <Sparkles className="w-3 h-3 fill-slate-950" />
                مقال مميز
              </span>
            )}

            <span className="text-xs text-slate-500 font-mono flex items-center gap-1.5 bg-slate-100/80 px-2.5 py-1 rounded-lg">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{topic.date}</span>
            </span>

            {topic.readTimeMinutes && (
              <span className="text-xs text-slate-500 flex items-center gap-1.5 bg-slate-100/80 px-2.5 py-1 rounded-lg">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{topic.readTimeMinutes} دقائق للقراءة</span>
              </span>
            )}

            {topic.viewsCount && (
              <span className="text-xs text-slate-500 flex items-center gap-1.5 bg-slate-100/80 px-2.5 py-1 rounded-lg">
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                <span>{topic.viewsCount.toLocaleString("ar-MA")} قراءة</span>
              </span>
            )}
          </div>

          {/* Large Editorial Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-snug sm:leading-tight font-cairo">
            {topic.title}
          </h1>

          {/* Author Byline & Professional Card */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100">
            <div className="flex items-center gap-3.5">
              {topic.authorImage ? (
                <div className="relative group/avatar shrink-0">
                  <img
                    src={topic.authorImage}
                    alt={topic.author}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover object-top border-2 border-blue-600 shadow-md ring-2 ring-blue-100 group-hover/avatar:scale-105 transition-transform"
                  />
                  <span className="absolute -bottom-1 -left-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-xs" title="كاتب معتمد" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center font-black text-base shadow-sm shrink-0">
                  <User className="w-6 h-6 text-white" />
                </div>
              )}
              <div>
                <div className="text-xs text-slate-400 font-bold flex items-center gap-1.5">
                  <span>كاتب المقال / الجهة المصدرة:</span>
                  {topic.authorImage && (
                    <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.2 rounded-full border border-blue-200">
                      كاتب معتمد
                    </span>
                  )}
                </div>
                <div className="text-base sm:text-lg font-black text-slate-900 font-cairo">
                  {topic.author}
                </div>
                {topic.authorBio && (
                  <div className="text-xs text-slate-500 line-clamp-1 max-w-md">
                    {topic.authorBio}
                  </div>
                )}
              </div>
            </div>

            {/* Reading Toolbar: Print, Share, Copy, Font Size */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Font Size Selector */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
                <button
                  type="button"
                  onClick={() => setFontSize("normal")}
                  className={`px-2 py-1 rounded-lg font-bold transition cursor-pointer ${
                    fontSize === "normal" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-500 hover:text-slate-900"
                  }`}
                  title="حجم خط عادي"
                >
                  A-
                </button>
                <button
                  type="button"
                  onClick={() => setFontSize("large")}
                  className={`px-2 py-1 rounded-lg font-bold transition cursor-pointer ${
                    fontSize === "large" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-500 hover:text-slate-900"
                  }`}
                  title="حجم خط كبير (افتراضي)"
                >
                  A
                </button>
                <button
                  type="button"
                  onClick={() => setFontSize("xlarge")}
                  className={`px-2 py-1 rounded-lg font-bold transition cursor-pointer ${
                    fontSize === "xlarge" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-500 hover:text-slate-900"
                  }`}
                  title="حجم خط كبير جداً"
                >
                  A+
                </button>
              </div>

              {/* WhatsApp Share */}
              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-2xs"
                title="مشاركة المقال عبر واتساب"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">واتساب</span>
              </button>

              {/* Copy Link */}
              <button
                type="button"
                onClick={handleCopyLink}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-3 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 border border-slate-200 shadow-2xs"
                title="نسخ رابط المقال"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">تم النسخ</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">نسخ الرابط</span>
                  </>
                )}
              </button>

              {/* Print A4 */}
              <button
                type="button"
                onClick={() => window.print()}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-3 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 border border-slate-200 shadow-2xs"
                title="طباعة المقال بتنسيق A4"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">طباعة A4</span>
              </button>

              {/* Admin Actions */}
              {isAdmin && (
                <div className="flex items-center gap-1 bg-amber-50 p-1 rounded-xl border border-amber-200">
                  <button
                    type="button"
                    onClick={() => onEdit(topic)}
                    className="p-1.5 text-blue-700 hover:bg-blue-100 rounded-lg transition cursor-pointer"
                    title="تعديل هذا الموضوع (المدير)"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  {isManager && onDelete && (
                    <button
                      type="button"
                      onClick={() => onDelete(topic.id)}
                      className="p-1.5 text-rose-700 hover:bg-rose-100 rounded-lg transition cursor-pointer"
                      title="حذف هذا الموضوع (المدير العام)"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Article Body Area */}
        <div className="p-6 sm:p-8 md:p-10 space-y-8">
          {/* Summary / Chapeau Highlight Box */}
          {topic.summary && (
            <div className="bg-gradient-to-r from-blue-50/70 via-slate-50 to-blue-50/50 p-5 sm:p-6 rounded-2xl border-r-4 border-blue-600 border border-slate-200/80 shadow-2xs">
              <div className="text-xs font-bold text-blue-800 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>ملخص وفكرة المقال:</span>
              </div>
              <p className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed font-cairo">
                {topic.summary}
              </p>
            </div>
          )}

          {/* Full Article Content */}
          <div className={`article-content-wrapper text-slate-800 ${getBodyFontSize()}`}>
            <ArticleHtmlRenderer content={topic.content} />
          </div>

          {/* Key Highlights / Summary Points Box */}
          {topic.highlights && topic.highlights.length > 0 && (
            <section className="bg-slate-50/90 rounded-2xl p-5 sm:p-6 border border-slate-200/90 space-y-3">
              <h3 className="font-black text-sm sm:text-base text-slate-900 flex items-center gap-2 font-cairo">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>أبرز المحاور والخلاصات التربوية:</span>
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs sm:text-sm">
                {topic.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Official Attachments & Downloads Box (if available) */}
          {((topic.downloads && topic.downloads.length > 0) || topic.downloadUrl) && (
            <section className="bg-gradient-to-r from-emerald-50/80 via-teal-50/40 to-emerald-50/80 rounded-2xl p-5 sm:p-6 border border-emerald-200/80 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="font-black text-sm sm:text-base text-emerald-950 flex items-center gap-2 font-cairo">
                  <Download className="w-4 h-4 text-emerald-700" />
                  <span>المرفقات والوثائق الرسمية للتحميل:</span>
                </h3>
                <span className="text-xs bg-emerald-200/80 text-emerald-950 font-bold px-2 py-0.5 rounded-full">
                  تحميل مباشر ومؤمن
                </span>
              </div>

              {topic.downloads && topic.downloads.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {topic.downloads.map((dl) => (
                    <button
                      key={dl.id}
                      type="button"
                      onClick={() => handleTriggerDownload(dl.label, dl.url, dl.fileType, dl.fileSize)}
                      className="w-full bg-white hover:bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-200 flex items-center justify-between text-right transition cursor-pointer group shadow-2xs"
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-xs text-slate-900 group-hover:text-emerald-900 transition-colors font-cairo">
                          {dl.label}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono flex items-center gap-2">
                          <span className="uppercase font-bold text-emerald-700">{dl.fileType || "PDF"}</span>
                          {dl.fileSize && <span>• {dl.fileSize}</span>}
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                        <Download className="w-4 h-4" />
                      </div>
                    </button>
                  ))}
                </div>
              ) : topic.downloadUrl ? (
                <button
                  type="button"
                  onClick={() => handleTriggerDownload(topic.downloadLabel || "تحميل المرفق الرسمي", topic.downloadUrl || "#", "pdf")}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-3.5 rounded-xl flex items-center justify-center gap-2 shadow-sm transition cursor-pointer text-xs sm:text-sm font-cairo"
                >
                  <Download className="w-4 h-4" />
                  <span>{topic.downloadLabel || "تحميل الوثيقة الرسمية المرفقة (PDF)"}</span>
                </button>
              ) : null}
            </section>
          )}

          {/* Dedicated Author Showcase Profile Card */}
          <section className="bg-gradient-to-r from-blue-50/90 via-slate-50 to-indigo-50/80 rounded-3xl p-6 sm:p-7 border border-blue-200/90 shadow-2xs flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {topic.authorImage ? (
              <div className="relative group shrink-0">
                <img
                  src={topic.authorImage}
                  alt={topic.author}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover object-top border-4 border-white shadow-md ring-2 ring-blue-400 group-hover:scale-105 transition-transform"
                />
                <span className="absolute -bottom-1 -left-1 bg-blue-600 text-white p-1 rounded-full border-2 border-white shadow-xs" title="كاتب معتمد">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
              </div>
            ) : (
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center font-black text-2xl shadow-md border-4 border-white ring-2 ring-blue-400 shrink-0">
                <User className="w-12 h-12 text-white" />
              </div>
            )}
            <div className="space-y-2 text-center sm:text-right flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="text-[11px] font-black bg-blue-600 text-white px-3 py-0.5 rounded-full shadow-2xs">
                  كاتب المقال
                </span>
                <span className="text-xs text-slate-500 font-bold">
                  منصة بروف بريس Profpress التربوية
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 font-cairo">
                {topic.author}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                {topic.authorBio ||
                  "كاتب وباحث تربوي، مهتم بقضايا التربية والتعليم، ديداكتيك المواد، وتطوير الممارسات الصفية والعلاقة التربوية بالمدرسة المغربية."}
              </p>
            </div>
          </section>

          {/* Tags & Keywords */}
          {topic.tags && topic.tags.length > 0 && (
            <div className="pt-4 border-t border-slate-100 flex items-center gap-2 flex-wrap text-xs">
              <span className="font-bold text-slate-400">الوسوم والكلمات المفتاحية:</span>
              {topic.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-2.5 py-1 rounded-lg border border-slate-200 transition"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Next / Previous Article Navigation */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {prevTopic ? (
            <button
              type="button"
              onClick={() => onSelectTopic(prevTopic)}
              className="bg-white p-3.5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xs transition text-right group cursor-pointer space-y-1"
            >
              <div className="text-[11px] text-slate-400 font-bold flex items-center gap-1">
                <ChevronRight className="w-3.5 h-3.5" />
                <span>المقال السابق</span>
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-blue-800 transition line-clamp-1 font-cairo">
                {prevTopic.title}
              </div>
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}

          {nextTopic ? (
            <button
              type="button"
              onClick={() => onSelectTopic(nextTopic)}
              className="bg-white p-3.5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xs transition text-left group cursor-pointer space-y-1"
            >
              <div className="text-[11px] text-slate-400 font-bold flex items-center justify-end gap-1">
                <span>المقال التالي</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-blue-800 transition line-clamp-1 font-cairo text-right">
                {nextTopic.title}
              </div>
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}
        </div>
      </div>

      {/* 3. Related Articles Section */}
      {relatedTopics.length > 0 && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2 font-cairo">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>مقالات ومواضيع ذات صلة قد تهمك:</span>
            </h2>
            <button
              type="button"
              onClick={onBack}
              className="text-xs font-bold text-blue-700 hover:underline cursor-pointer"
            >
              عرض جميع المقالات ↗
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {relatedTopics.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectTopic(rel)}
                className="bg-slate-50 hover:bg-blue-50/50 p-4 rounded-2xl border border-slate-200/80 hover:border-blue-300 transition-all cursor-pointer space-y-2 group flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-md">
                      {rel.categoryLabel}
                    </span>
                    <span className="text-slate-400 font-mono">{rel.date}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-blue-900 transition-colors line-clamp-2 font-cairo">
                    {rel.title}
                  </h4>
                  {rel.summary && (
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {rel.summary}
                    </p>
                  )}
                </div>
                <div className="pt-2 text-[11px] font-bold text-blue-700 flex items-center gap-1 group-hover:gap-1.5 transition-all">
                  <span>قراءة المقال كاملاً</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. Bottom Return Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div className="space-y-1 text-center sm:text-right">
          <h3 className="text-base sm:text-lg font-black font-cairo">
            هل ترغب في قراءة المزيد من المقالات التربوية؟
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            تصفح بنك المقالات، ديداكتيك المواد، مستجدات التعليم الصريح، والدعم المكثف TaRL.
          </p>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs sm:text-sm transition cursor-pointer flex items-center gap-2 shadow-sm shrink-0"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة إلى قائمة المقالات والمستجدات</span>
        </button>
      </div>

      {/* Download Gateway Modal (if triggered) */}
      {gatewayFile.isOpen && (
        <DownloadGatewayModal
          isOpen={gatewayFile.isOpen}
          onClose={() => setGatewayFile((prev) => ({ ...prev, isOpen: false }))}
          fileTitle={gatewayFile.title}
          targetUrl={gatewayFile.url}
          fileType={gatewayFile.type}
          fileSize={gatewayFile.size}
        />
      )}
    </article>
  );
};
