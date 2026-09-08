import React, { useState } from "react";
import {
  X,
  Printer,
  Share2,
  Download,
  Calendar,
  User,
  ExternalLink,
  Edit3,
  CheckCircle2,
  Megaphone,
  FileText,
  BookOpen,
  Bell,
  Award,
  Sparkles,
  Eye,
  MessageCircle,
  Copy,
  Check,
  AlertTriangle,
  Trash2,
} from "lucide-react";
import { TopicItem } from "../types";

interface TopicReaderModalProps {
  topic: TopicItem | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (topic: TopicItem) => void;
  onDelete?: (topicId: string) => void;
  isAdmin?: boolean;
  isManager?: boolean;
}

export const TopicReaderModal: React.FC<TopicReaderModalProps> = ({
  topic,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  isAdmin = false,
  isManager = false,
}) => {
  if (!isOpen || !topic) return null;

  const [copied, setCopied] = useState(false);

  // Icon mapping
  const renderNatureIcon = () => {
    switch (topic.category) {
      case "announcement":
        return <Megaphone className="w-5 h-5 text-amber-600" />;
      case "article":
        return <BookOpen className="w-5 h-5 text-blue-600" />;
      case "communique":
        return <Bell className="w-5 h-5 text-purple-600" />;
      case "results":
        return <Award className="w-5 h-5 text-rose-600" />;
      case "memo":
      default:
        return <FileText className="w-5 h-5 text-teal-600" />;
    }
  };

  const getCategoryStyles = () => {
    switch (topic.category) {
      case "announcement":
        return {
          badge: "bg-amber-100 text-amber-900 border-amber-300",
          topBorder: "border-t-4 border-amber-400",
          iconBg: "bg-amber-50 border-amber-200",
        };
      case "article":
        return {
          badge: "bg-blue-100 text-blue-900 border-blue-300",
          topBorder: "border-t-4 border-blue-400",
          iconBg: "bg-blue-50 border-blue-200",
        };
      case "communique":
        return {
          badge: "bg-purple-100 text-purple-900 border-purple-300",
          topBorder: "border-t-4 border-purple-400",
          iconBg: "bg-purple-50 border-purple-200",
        };
      case "results":
        return {
          badge: "bg-rose-100 text-rose-900 border-rose-300",
          topBorder: "border-t-4 border-rose-400",
          iconBg: "bg-rose-50 border-rose-200",
        };
      case "memo":
      default:
        return {
          badge: "bg-teal-100 text-teal-900 border-teal-300",
          topBorder: "border-t-4 border-teal-400",
          iconBg: "bg-teal-50 border-teal-200",
        };
    }
  };

  const styles = getCategoryStyles();

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard?.writeText(`${url}#${topic.seo.slug || topic.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `📌 ${topic.title}\n\n${topic.summary}\n\nاقرأ المزيد على منصة بروف بريس (ProfPress):\n${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <div className="no-print fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto" dir="rtl">
      <div
        className={`bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-slate-200 ${styles.topBorder}`}
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div
              className={`w-12 h-12 rounded-2xl ${styles.iconBg} border flex items-center justify-center shadow-2xs shrink-0 mt-1`}
            >
              {renderNatureIcon()}
            </div>
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`text-xs font-black px-3 py-0.5 rounded-full border shadow-2xs font-cairo ${styles.badge}`}
                >
                  {topic.categoryLabel}
                </span>
                <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{topic.date}</span>
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>{topic.author}</span>
                </span>
                {topic.urgent && (
                  <span className="text-[11px] bg-red-600 text-white font-black px-2 py-0.5 rounded-md animate-pulse">
                    عاجل
                  </span>
                )}
              </div>
              <h1 className="text-lg sm:text-xl font-black text-slate-900 font-cairo leading-snug">
                {topic.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {isAdmin && (
              <button
                type="button"
                onClick={() => onEdit(topic)}
                className="p-2 rounded-xl text-slate-600 hover:text-blue-800 hover:bg-blue-50 transition cursor-pointer"
                title="تعديل في المحرر الداخلي (خاص بالمدير)"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition cursor-pointer"
              title="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-slate-800 font-sans">
          {/* Summary Box */}
          {topic.summary && (
            <div className="bg-slate-50 border-r-4 border-teal-600 rounded-xl p-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-cairo font-medium">
              {topic.summary}
            </div>
          )}

          {/* Highlights */}
          {topic.highlights && topic.highlights.length > 0 && (
            <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-4 space-y-2.5">
              <span className="font-bold text-xs text-blue-950 font-cairo block">
                📌 أهم النقاط والتوجيهات المعتمدة:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-700 font-sans">
                {topic.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Main Content Body */}
          <div className="prose prose-sm max-w-none text-xs sm:text-sm leading-relaxed space-y-4 whitespace-pre-wrap text-slate-800 font-cairo">
            {topic.content}
          </div>

          {/* Download Box */}
          {topic.downloadLabel && (
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-300 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
              <div className="space-y-1 text-center sm:text-right">
                <span className="font-bold text-xs sm:text-sm text-emerald-950 block font-cairo">
                  {topic.downloadLabel}
                </span>
                <span className="text-[11px] text-emerald-700">
                  ملف رسمي جاهز للطباعة والاستعمال المدرسي
                </span>
              </div>
              <a
                href={topic.downloadUrl || "#"}
                download
                onClick={(e) => {
                  if (!topic.downloadUrl || topic.downloadUrl === "#") {
                    e.preventDefault();
                    window.print();
                  }
                }}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition cursor-pointer shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>تحميل أو طباعة الوثيقة</span>
              </a>
            </div>
          )}

          {/* Tags */}
          {topic.tags && topic.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              <span className="text-xs text-slate-400 font-bold">الكلمات المفتاحية:</span>
              {topic.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold px-2.5 py-1 rounded-lg transition"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}

          {/* Mini SEO / Rank Math Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span className="font-bold text-slate-800 font-cairo">
                  بيانات السيو والأرشفة (Rank Math SEO)
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">
                الرابط: /{topic.seo.slug}
              </span>
            </div>
            <div className="text-[11px] text-slate-600 grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white p-2.5 rounded-xl border border-slate-200">
              <div>
                <strong className="text-slate-800">الكلمة المفتاحية:</strong>{" "}
                {topic.seo.focusKeyword || topic.title}
              </div>
              <div>
                <strong className="text-slate-800">وقت القراءة المقدر:</strong>{" "}
                {topic.readTimeMinutes || 3} دقائق
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          {/* Share Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleWhatsAppShare}
              className="bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-2xs transition cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>مشاركة واتساب</span>
            </button>

            <button
              type="button"
              onClick={handleCopyLink}
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "تم النسخ!" : "نسخ الرابط"}</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs px-3 py-2 rounded-xl flex items-center gap-1 transition cursor-pointer"
              title="طباعة الموضوع"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {isManager && onDelete && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("هل أنت متأكد من حذف هذا المقال نهائياً من الموقع؟")) {
                    onDelete(topic.id);
                    onClose();
                  }
                }}
                className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer transition"
                title="صلاحية حصرية لمدير الموقع (kolchitv@gmail.com)"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                <span>حذف المقال</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => onEdit(topic)}
              className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer transition"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>تعديل في المحرر الداخلي</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl cursor-pointer"
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
