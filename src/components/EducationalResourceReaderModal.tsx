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
  FileText,
  BookOpen,
  Sparkles,
  Eye,
  Copy,
  Check,
  HardDrive,
  FileSpreadsheet,
  Zap,
  Tag,
  Clock,
  Layers,
  ShieldCheck,
} from "lucide-react";
import { EducationalResourceItem, GradeLevelId, DownloadLinkItem } from "../types";
import { EDUCATIONAL_LEVELS_DATA } from "../data/educationalLevelsData";
import { DownloadGatewayModal } from "./DownloadGatewayModal";
import { AdSenseZone } from "./AdSenseZone";
import {
  getDownloadGatewaySettings,
  DOWNLOAD_GATEWAY_EVENT,
} from "../utils/downloadGatewaySettings";

interface EducationalResourceReaderModalProps {
  resource: EducationalResourceItem | null;
  levelId: GradeLevelId;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (resource: EducationalResourceItem) => void;
  onOpenPrintPreview?: () => void;
  canEdit?: boolean;
}

export const EducationalResourceReaderModal: React.FC<
  EducationalResourceReaderModalProps
> = ({
  resource,
  levelId,
  isOpen,
  onClose,
  onEdit,
  onOpenPrintPreview,
  canEdit = true,
}) => {
  if (!isOpen || !resource) return null;

  const levelInfo =
    EDUCATIONAL_LEVELS_DATA[levelId] || EDUCATIONAL_LEVELS_DATA["primary_1"];

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

  const handleTriggerDownload = (
    title: string,
    url: string,
    type = "pdf",
    size?: string
  ) => {
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
        if (onOpenPrintPreview) {
          onOpenPrintPreview();
        } else {
          window.print();
        }
      } else {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    }
  };

  const handleShareWhatsApp = () => {
    const text = `📄 *${resource.title}*\n🏫 ${levelInfo.title} - ${resource.subject}\n🔗 تصفح وحمل عبر منصة الأستاذ ProfPress:\n${window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Resolve category label
  const getCategoryLabel = () => {
    switch (resource.category) {
      case "planning":
        return "التوازيع والتخطيط التربوي";
      case "exams":
        return "الامتحانات والفروض والمراقبة المستمرة";
      case "lessons":
        return "الجذاذات والدروس وكراسات الدعم";
      case "guidelines":
        return "الأطر المرجعية والخرائط الذهنية";
      case "textbooks":
        return "دلائل الأستاذ وكراسات التلميذ";
      default:
        return "وثيقة تربوية";
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn font-cairo">
        <div
          className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] text-right"
          dir="rtl"
        >
          {/* Top Bar Navigation */}
          <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 text-white p-4 sm:p-5 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-purple-300 font-bold border border-white/10">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] bg-purple-400/20 text-purple-200 border border-purple-400/30 font-bold px-2 py-0.5 rounded-md">
                    {levelInfo.title}
                  </span>
                  <span className="text-[11px] bg-white/10 text-slate-200 font-bold px-2 py-0.5 rounded-md">
                    {resource.subject}
                  </span>
                </div>
                <h3 className="font-black text-xs sm:text-sm text-purple-100 line-clamp-1">
                  {resource.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {canEdit && (
                <button
                  type="button"
                  onClick={() => onEdit(resource)}
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-3.5 py-1.5 rounded-xl font-black text-xs transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                  title="تعديل هذا الموضوع وتعديل روابط التحميل"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>تعديل الموضوع والروابط</span>
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-xl transition cursor-pointer"
                title="إغلاق النافذة"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Content Scrollable Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            {/* AdSense Top Zone */}
            <AdSenseZone placement="top" />

            {/* Main Header / Badges */}
            <div className="space-y-3 pb-4 border-b border-slate-100">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-black px-3 py-1 rounded-xl bg-purple-50 text-purple-800 border border-purple-200">
                  <Tag className="w-3.5 h-3.5 text-purple-600" />
                  <span>{getCategoryLabel()}</span>
                </span>

                <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>تحيين: {resource.updatedDate}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>الصيغة: {resource.format}</span>
                  </span>
                </div>
              </div>

              <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                {resource.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                {resource.description}
              </p>
            </div>

            {/* Optional Full Content/Instructions */}
            {resource.content && (
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-3 shadow-2xs">
                <h4 className="text-xs sm:text-sm font-black text-purple-900 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-purple-600" />
                  <span>توجيهات ومحتوى بيداغوجي تفصيلي:</span>
                </h4>
                <div className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line font-sans">
                  {resource.content}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* DOWNLOADS & ATTACHMENTS SECTION WITH ADSENSE GATEWAY                      */}
            {/* ========================================================================= */}
            <div className="bg-gradient-to-br from-purple-50 via-slate-50 to-indigo-50 border border-purple-200/80 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold shadow-2xs">
                    <Download className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-xs sm:text-sm">
                      روابط وملفات التحميل المباشرة
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      جاهز للطباعة والتحميل بصيغ Word و PDF للموسم الدراسي 2026/2027
                    </p>
                  </div>
                </div>

                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>فحص آمن</span>
                </span>
              </div>

              {/* Primary Download Button */}
              <div className="bg-white rounded-xl p-3.5 border border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
                <div className="space-y-1 text-center sm:text-right w-full sm:w-auto">
                  <div className="font-black text-slate-800 text-xs sm:text-sm">
                    {resource.downloadLabel || resource.title}
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-[11px] text-slate-500 font-medium">
                    <span>الصيغة: {resource.format}</span>
                    <span>•</span>
                    <span>المستوى: {levelInfo.shortTitle}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-center">
                  <button
                    type="button"
                    onClick={() =>
                      handleTriggerDownload(
                        resource.downloadLabel || resource.title,
                        resource.downloadUrl || "#",
                        resource.format.toLowerCase().includes("doc") ? "word" : "pdf",
                        "3.5 MB"
                      )
                    }
                    className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white font-black text-xs sm:text-sm px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-xs transition active:scale-95 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>تحميل الآن</span>
                  </button>

                  {resource.downloadUrl && resource.downloadUrl !== "#" && (
                    <a
                      href={resource.downloadUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition"
                      title="فتح الرابط المباشر في نافذة جديدة"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Additional Download Links if available */}
              {resource.downloads && resource.downloads.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold text-slate-700 block">
                    ملفات وروابط إضافية تابعة لهذا الموضوع:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {resource.downloads.map((file) => (
                      <div
                        key={file.id}
                        className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-2 shadow-2xs hover:border-purple-300 transition"
                      >
                        <div className="space-y-0.5 flex-1 min-w-0">
                          <h5 className="font-black text-slate-800 text-xs truncate">
                            {file.label}
                          </h5>
                          <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
                            <span className="uppercase">{file.fileType || "PDF"}</span>
                            {file.fileSize && <span>• {file.fileSize}</span>}
                            {file.note && <span>• {file.note}</span>}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            handleTriggerDownload(
                              file.label,
                              file.url,
                              file.fileType || "pdf",
                              file.fileSize || "2.5 MB"
                            )
                          }
                          className="bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold text-xs px-3 py-1.5 rounded-lg border border-purple-200 flex items-center gap-1 transition shrink-0 cursor-pointer"
                        >
                          <Download className="w-3 h-3 text-purple-700" />
                          <span>تحميل</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tags */}
            {resource.tags && resource.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-bold text-slate-500">الكلمات الدلالية:</span>
                {resource.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-600 px-2.5 py-0.5 rounded-lg border border-slate-200/60 transition"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* AdSense Middle Zone */}
            <AdSenseZone placement="middle" />
          </div>

          {/* Modal Footer Controls */}
          <div className="bg-slate-50 border-t border-slate-200 p-4 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>واتساب</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "تم النسخ!" : "نسخ الرابط"}</span>
              </button>

              {onOpenPrintPreview && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenPrintPreview();
                  }}
                  className="bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-purple-700" />
                  <span>طباعة A4</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              {canEdit && (
                <button
                  type="button"
                  onClick={() => onEdit(resource)}
                  className="bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>تعديل هذا المحتوى والروابط</span>
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs px-4 py-2 rounded-xl transition cursor-pointer"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Download Gateway Modal */}
      {gatewayFile.isOpen && (
        <DownloadGatewayModal
          isOpen={gatewayFile.isOpen}
          onClose={() =>
            setGatewayFile({
              isOpen: false,
              title: "",
              url: "",
              type: "pdf",
            })
          }
          fileTitle={gatewayFile.title}
          targetDownloadUrl={gatewayFile.url}
          fileType={gatewayFile.type}
          fileSize={gatewayFile.size}
        />
      )}
    </>
  );
};
