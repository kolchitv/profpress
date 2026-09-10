import React, { useState, useEffect } from "react";
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
  ShieldCheck,
  FileSpreadsheet,
  HardDrive,
  Presentation,
  Archive,
  Zap,
} from "lucide-react";
import { TopicItem, DownloadLinkItem } from "../types";
import { DownloadGatewayModal } from "./DownloadGatewayModal";
import { AdSenseZone } from "./AdSenseZone";
import {
  getDownloadGatewaySettings,
  DOWNLOAD_GATEWAY_EVENT,
} from "../utils/downloadGatewaySettings";

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
    const handleSettingsUpdate = () => {
      setGatewaySettings(getDownloadGatewaySettings());
    };
    window.addEventListener(DOWNLOAD_GATEWAY_EVENT, handleSettingsUpdate);
    return () => {
      window.removeEventListener(DOWNLOAD_GATEWAY_EVENT, handleSettingsUpdate);
    };
  }, []);

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
          <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-800 font-cairo">
            {topic.content.split("\n\n").map((block, idx) => {
              const trimmed = block.trim();
              if (!trimmed) return null;

              // Standalone Image URL detection (Blogger, Google CDN, YouTube, image extensions)
              if (
                trimmed.startsWith("http") &&
                (trimmed.includes("blogger.googleusercontent.com") ||
                  trimmed.includes("img.youtube.com") ||
                  trimmed.includes("bp.blogspot.com") ||
                  /\.(jpg|jpeg|png|webp|gif)($|\?)/i.test(trimmed))
              ) {
                return (
                  <div key={idx} className="my-4 text-center">
                    <img
                      src={trimmed}
                      alt={topic.title}
                      referrerPolicy="no-referrer"
                      className="rounded-2xl max-h-[440px] w-auto max-w-full mx-auto object-contain shadow-xs border border-slate-200"
                    />
                  </div>
                );
              }

              // Heading detection (### Header)
              if (trimmed.startsWith("### ")) {
                return (
                  <h3
                    key={idx}
                    className="text-base sm:text-lg font-black text-slate-900 border-r-4 border-amber-500 pr-3 my-3 font-cairo"
                  >
                    {trimmed.replace(/^###\s+/, "")}
                  </h3>
                );
              }

              // List detection
              if (trimmed.startsWith("- ")) {
                const listItems = trimmed.split("\n").filter(l => l.trim().startsWith("- "));
                return (
                  <ul key={idx} className="space-y-1.5 my-2 pr-4 list-disc list-inside text-slate-700">
                    {listItems.map((li, lIdx) => (
                      <li key={lIdx} className="leading-relaxed">
                        {li.replace(/^-\s*/, "")}
                      </li>
                    ))}
                  </ul>
                );
              }

              // Regular paragraph with line breaks
              return (
                <p key={idx} className="leading-relaxed text-slate-800 whitespace-pre-line">
                  {trimmed}
                </p>
              );
            })}
          </div>

          {/* In-Article AdSense Banner */}
          <AdSenseZone
            zone="middle"
            adSettings={gatewaySettings.adSettings}
            title="إعلان وسط المقال (In-Article)"
          />

          {/* Download Box (Primary and Multi-attachments) */}
          {(topic.downloadLabel || (topic.downloads && topic.downloads.length > 0)) && (
            <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 border border-emerald-300 rounded-2xl p-4 sm:p-5 space-y-3 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-emerald-200/70">
                <div className="space-y-0.5">
                  <span className="font-black text-xs sm:text-sm text-emerald-950 flex items-center gap-1.5 font-cairo">
                    <Download className="w-4 h-4 text-emerald-700" />
                    <span>الملفات والوثائق المرفقة للتحميل المباشر</span>
                  </span>
                  <span className="text-[11px] text-emerald-700 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>ملفات رسمية معتمدة ومفحوصة - تحميل آمن عبر البوابة</span>
                  </span>
                </div>

                {gatewaySettings.isEnabled && (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full self-start sm:self-auto flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-600" />
                    <span>بوابة التحميل الآمن نشطة</span>
                  </span>
                )}
              </div>

              {/* Primary Download Button */}
              {topic.downloadLabel && (
                <div className="bg-white border border-emerald-200/80 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs hover:border-emerald-300 transition">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-emerald-700 text-white font-black px-2 py-0.2 rounded font-mono">
                        PDF
                      </span>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 font-cairo">
                        {topic.downloadLabel}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      انقر للتحميل المباشر الآمن أو حفظ نسخة رسمية
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleTriggerDownload(
                        topic.downloadLabel || "ملف التحميل الرسمي",
                        topic.downloadUrl || "#",
                        "pdf",
                        "4.5 MB"
                      )
                    }
                    className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-sm transition cursor-pointer shrink-0"
                  >
                    <Download className="w-4 h-4" />
                    <span>تحميل الوثيقة الآن</span>
                  </button>
                </div>
              )}

              {/* Additional Download Attachments */}
              {topic.downloads && topic.downloads.length > 0 && (
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-bold text-slate-700 block">
                    مرفقات إضافية خاصة بالموضوع ({topic.downloads.length}):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {topic.downloads.map((dl) => (
                      <div
                        key={dl.id}
                        className="bg-white border border-slate-200 hover:border-teal-300 rounded-xl p-3 flex items-center justify-between gap-2 transition shadow-2xs"
                      >
                        <div className="space-y-0.5 min-w-0">
                          <span className="text-xs font-bold text-slate-800 block truncate font-cairo">
                            {dl.label}
                          </span>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                            <span className="uppercase text-slate-600 font-bold">
                              {dl.fileType || "PDF"}
                            </span>
                            {dl.fileSize && <span>• {dl.fileSize}</span>}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            handleTriggerDownload(
                              dl.label,
                              dl.url,
                              dl.fileType || "pdf",
                              dl.fileSize
                            )
                          }
                          className="bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 font-bold text-[11px] px-3 py-1.5 rounded-lg flex items-center gap-1.5 shrink-0 transition cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5 text-teal-700" />
                          <span>تحميل</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
                title="صلاحية حصرية لمدير المنصة الرئيسي"
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

      {/* Safe Download & AdSense Gateway Modal */}
      {gatewayFile.isOpen && (
        <DownloadGatewayModal
          isOpen={gatewayFile.isOpen}
          onClose={() => setGatewayFile((prev) => ({ ...prev, isOpen: false }))}
          fileTitle={gatewayFile.title}
          downloadUrl={gatewayFile.url}
          fileType={gatewayFile.type}
          fileSize={gatewayFile.size}
          sourceTopicTitle={topic.title}
        />
      )}
    </div>
  );
};
