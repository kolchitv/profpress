import React, { useState, useEffect } from "react";
import {
  X,
  Download,
  ShieldCheck,
  Clock,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  FileText,
  FileSpreadsheet,
  FileCode,
  HardDrive,
  Presentation,
  Archive,
  Sparkles,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import {
  getDownloadGatewaySettings,
  DOWNLOAD_GATEWAY_EVENT,
} from "../utils/downloadGatewaySettings";
import { DownloadGatewaySettings, FileTypeOption } from "../types";
import { AdSenseZone } from "./AdSenseZone";

interface DownloadGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileTitle: string;
  downloadUrl: string;
  fileType?: FileTypeOption | string;
  fileSize?: string;
  sourceTopicTitle?: string;
  onDirectDownload?: () => void;
  onOpenSettings?: () => void;
}

export const DownloadGatewayModal: React.FC<DownloadGatewayModalProps> = ({
  isOpen,
  onClose,
  fileTitle,
  downloadUrl,
  fileType = "pdf",
  fileSize,
  sourceTopicTitle,
  onDirectDownload,
  onOpenSettings,
}) => {
  const [settings, setSettings] = useState<DownloadGatewaySettings>(getDownloadGatewaySettings);
  const [secondsLeft, setSecondsLeft] = useState(settings.countdownSeconds);
  const [isReady, setIsReady] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sync settings when changed in admin panel
  useEffect(() => {
    const handleSettingsUpdate = () => {
      const updated = getDownloadGatewaySettings();
      setSettings(updated);
    };
    window.addEventListener(DOWNLOAD_GATEWAY_EVENT, handleSettingsUpdate);
    return () => {
      window.removeEventListener(DOWNLOAD_GATEWAY_EVENT, handleSettingsUpdate);
    };
  }, []);

  // Reset countdown whenever modal opens
  useEffect(() => {
    if (isOpen) {
      const initialSeconds = settings.countdownSeconds > 0 ? settings.countdownSeconds : 0;
      setSecondsLeft(initialSeconds);
      setIsReady(initialSeconds === 0);
      setCopied(false);
    }
  }, [isOpen, settings.countdownSeconds]);

  // Countdown timer effect
  useEffect(() => {
    if (!isOpen || isReady || secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsReady(true);
          // If auto-redirect is enabled
          if (settings.autoRedirect && downloadUrl && downloadUrl !== "#") {
            setTimeout(() => {
              window.open(downloadUrl, "_blank", "noopener,noreferrer");
            }, 600);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isReady, secondsLeft, settings.autoRedirect, downloadUrl]);

  if (!isOpen) return null;

  const totalSeconds = settings.countdownSeconds || 10;
  const progressPercent = totalSeconds > 0
    ? Math.min(100, Math.round(((totalSeconds - secondsLeft) / totalSeconds) * 100))
    : 100;

  // Icon based on file type
  const renderFileIcon = () => {
    const type = (fileType || "pdf").toLowerCase();
    if (type.includes("pdf")) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center font-bold text-lg shadow-xs shrink-0">
          <FileText className="w-6 h-6" />
        </div>
      );
    }
    if (type.includes("word") || type.includes("doc")) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-bold text-lg shadow-xs shrink-0">
          <FileText className="w-6 h-6" />
        </div>
      );
    }
    if (type.includes("excel") || type.includes("xls") || type.includes("sheet")) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center font-bold text-lg shadow-xs shrink-0">
          <FileSpreadsheet className="w-6 h-6" />
        </div>
      );
    }
    if (type.includes("ppt") || type.includes("presentation")) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center font-bold text-lg shadow-xs shrink-0">
          <Presentation className="w-6 h-6" />
        </div>
      );
    }
    if (type.includes("drive") || type.includes("cloud")) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center font-bold text-lg shadow-xs shrink-0">
          <HardDrive className="w-6 h-6" />
        </div>
      );
    }
    if (type.includes("zip") || type.includes("rar")) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-bold text-lg shadow-xs shrink-0">
          <Archive className="w-6 h-6" />
        </div>
      );
    }
    return (
      <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center font-bold text-lg shadow-xs shrink-0">
        <FileCode className="w-6 h-6" />
      </div>
    );
  };

  const handleCopyLink = () => {
    if (!downloadUrl || downloadUrl === "#") return;
    navigator.clipboard?.writeText(downloadUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleStartDownload = () => {
    if (!downloadUrl || downloadUrl === "#" || downloadUrl.startsWith("javascript:")) {
      if (onDirectDownload) {
        onDirectDownload();
      } else {
        window.print();
      }
      onClose();
      return;
    }

    try {
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.download = fileTitle ? `${fileTitle}.pdf` : "document.pdf";
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        if (document.body.contains(a)) {
          document.body.removeChild(a);
        }
      }, 1000);
    } catch {
      window.open(downloadUrl, "_blank", "noopener,noreferrer");
    }
    onClose();
  };

  const handleSkipCountdown = () => {
    setIsReady(true);
    setSecondsLeft(0);
  };

  return (
    <div
      className="no-print fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
      dir="rtl"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[94vh] border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-teal-950 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-xl shadow-xs">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black font-cairo text-white">
                  بوابة التحميل الآمن وتحويل الروابط
                </h2>
                <span className="text-[10px] bg-emerald-500 text-slate-950 font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>رابط محمي</span>
                </span>
              </div>
              <p className="text-xs text-indigo-200">
                منصة بروف بريس (ProfPress) - تحميل مباشر فائق السرعة
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {onOpenSettings && (
              <button
                type="button"
                onClick={onOpenSettings}
                className="text-xs text-slate-300 hover:text-white px-2.5 py-1.5 rounded-xl hover:bg-white/10 transition cursor-pointer flex items-center gap-1 font-bold"
                title="ضبط إعلانات أدسنس والتحويل"
              >
                <span>⚙️ إعدادات الإعلانات</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="text-slate-300 hover:text-white p-2 rounded-xl hover:bg-white/10 transition cursor-pointer"
              title="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Top Google AdSense Area */}
          <AdSenseZone
            zone="top"
            adSettings={settings.adSettings}
            title="إعلان بانر علوي (Leaderboard 728x90)"
          />

          {/* Main File Information Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-start gap-3.5">
              {renderFileIcon()}
              <div className="space-y-1 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-black uppercase tracking-wider bg-slate-200 text-slate-800 px-2.5 py-0.5 rounded-md font-mono">
                    {fileType || "PDF"}
                  </span>
                  {fileSize && (
                    <span className="text-[11px] font-mono text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                      الحجم: {fileSize}
                    </span>
                  )}
                  {settings.safeCheckBadge && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>تم الفحص: خالٍ من الفيروسات</span>
                    </span>
                  )}
                </div>

                <h3 className="text-sm sm:text-base font-black text-slate-900 font-cairo leading-snug">
                  {fileTitle || "ملف التحميل الرسمي"}
                </h3>

                {sourceTopicTitle && (
                  <p className="text-xs text-slate-500">
                    مرفق مع موضوع: <strong className="text-slate-700">{sourceTopicTitle}</strong>
                  </p>
                )}
              </div>
            </div>

            {/* Explanatory Message */}
            <p className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200/80 leading-relaxed flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>{settings.customNoticeText}</span>
            </p>
          </div>

          {/* Countdown & Status Block */}
          <div className="bg-gradient-to-br from-indigo-50/70 via-slate-50 to-teal-50/70 border border-indigo-200/80 rounded-2xl p-5 text-center space-y-4 shadow-xs">
            {!isReady ? (
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2 text-indigo-950">
                  <Clock className="w-5 h-5 text-indigo-600 animate-pulse" />
                  <span className="text-sm font-bold font-cairo">
                    جاري تجهيز وتشفير رابط التحميل المباشر...
                  </span>
                </div>

                {/* Big Countdown Number */}
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white border-4 border-indigo-500 shadow-md">
                  <span className="text-3xl font-black text-indigo-700 font-mono">
                    {secondsLeft}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="max-w-md mx-auto space-y-1.5">
                  <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden p-0.5">
                    <div
                      className="bg-gradient-to-r from-indigo-600 to-teal-500 h-full rounded-full transition-all duration-1000 ease-linear shadow-xs"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>نسبة الاكتمال: {progressPercent}%</span>
                    <span>المتبقي: {secondsLeft} ثواني</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500">
                  يرجى عدم إغلاق النافذة حتى يتم تأكيد صلاحية الرابط على الخادم الرسمي.
                </p>

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={handleSkipCountdown}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-bold underline transition cursor-pointer"
                  >
                    تخطي الانتظار والتحميل الفوري ⚡
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs border border-emerald-300">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div>
                  <h4 className="text-base sm:text-lg font-black text-emerald-950 font-cairo">
                    رابط التحميل المباشر جاهز ومؤمن الآن!
                  </h4>
                  <p className="text-xs text-emerald-700">
                    يمكنك الآن بدء تحميل الملف مباشرة أو نسخه للاستخدام لاحقاً.
                  </p>
                </div>

                {/* Ready Big Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleStartDownload}
                    className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-sm px-8 py-3.5 rounded-2xl flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-700/25 transition cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Download className="w-5 h-5" />
                    <span>تحميل الملف الآن (انقر هنا)</span>
                    <ExternalLink className="w-4 h-4 opacity-80" />
                  </button>

                  {downloadUrl && downloadUrl !== "#" && (
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="w-full sm:w-auto bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs px-4 py-3 rounded-2xl flex items-center justify-center gap-1.5 transition cursor-pointer shadow-2xs"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span className="text-emerald-700">تم نسخ الرابط!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-slate-500" />
                          <span>نسخ الرابط المباشر</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Middle Google AdSense Area */}
          <AdSenseZone
            zone="middle"
            adSettings={settings.adSettings}
            title="إعلان وسط الشاشة (In-Content 300x250)"
          />

          {/* Bottom Google AdSense Area */}
          <AdSenseZone
            zone="bottom"
            adSettings={settings.adSettings}
            title="إعلان بانر سفلي (Bottom Banner)"
          />
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>نظام التحميل الآمن المعتمد بـ Profpress</span>
          </div>

          <div className="flex items-center gap-2">
            {!isReady && (
              <button
                type="button"
                onClick={() => setIsReady(true)}
                className="text-xs text-slate-500 hover:text-indigo-700 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition cursor-pointer font-bold"
              >
                تخطي الانتظار
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl cursor-pointer transition"
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
