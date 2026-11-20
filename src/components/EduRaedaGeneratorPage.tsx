import React, { useState } from "react";
import {
  Sparkles,
  RefreshCw,
  Maximize2,
  Minimize2,
  ExternalLink,
  Layers,
  BookOpen,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { TabKey } from "../types";

interface EduRaedaGeneratorPageProps {
  onNavigateToTab: (tab: TabKey) => void;
}

const EDURAEDA_URL = "https://eduraeda.vercel.app/";

export const EduRaedaGeneratorPage: React.FC<EduRaedaGeneratorPageProps> = ({
  onNavigateToTab,
}) => {
  const [iframeKey, setIframeKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleReload = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div
      dir="rtl"
      className={
        isFullscreen
          ? "fixed inset-0 z-50 bg-slate-950 flex flex-col font-cairo"
          : "space-y-4 animate-fadeIn pb-10 font-cairo"
      }
    >
      {/* Compact Workspace Header & Controls */}
      <div
        className={
          isFullscreen
            ? "bg-slate-900 text-white px-4 py-2.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 shrink-0"
            : "bg-gradient-to-l from-indigo-950 via-blue-950 to-slate-900 text-white rounded-3xl p-4 sm:p-5 shadow-lg border border-indigo-800/60 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
        }
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-indigo-500/25 border border-indigo-400/40 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-base sm:text-lg font-black text-white truncate">
                مولد الجذاذات والخطاطات التربوية (EduRaeda)
              </h1>
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                مدمج داخل بروف بريس
              </span>
            </div>
            {!isFullscreen && (
              <p className="text-xs text-indigo-100/90 mt-0.5 leading-relaxed">
                حوّل دروسك ووثائقك التعليمية إلى جذاذات تربوية وخطاطات ذهنية احترافية جاهزة للتعديل والطباعة مباشرة من داخل المنصة.
              </p>
            )}
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {!isFullscreen && (
            <button
              type="button"
              onClick={() => onNavigateToTab("mindmaps")}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer"
              title="الانتقال إلى بنك الخطاطات الذهنية"
            >
              <Layers className="w-3.5 h-3.5 text-amber-300" />
              <span>بنك الخطاطات</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleReload}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer"
            title="إعادة تحميل المولد"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            <span>تحديث</span>
          </button>

          <button
            type="button"
            onClick={() => setIsFullscreen((prev) => !prev)}
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer shadow-xs"
            title={isFullscreen ? "تصغير العرض" : "توسيع العرض بملء الشاشة"}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" />
                <span>إنهاء ملء الشاشة</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span>ملء الشاشة</span>
              </>
            )}
          </button>

          <a
            href={EDURAEDA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400/40 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition no-underline"
            title="فتح المولد في تبويب مستقل"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">فتح بتبويب مستقل</span>
          </a>
        </div>
      </div>

      {/* Embedded EduRaeda App Frame */}
      <div
        className={
          isFullscreen
            ? "relative flex-1 w-full bg-[#F7F9FE] overflow-hidden"
            : "relative w-full h-[82vh] min-h-[700px] bg-[#F7F9FE] rounded-3xl border border-slate-200 shadow-md overflow-hidden"
        }
      >
        {isLoading && (
          <div className="absolute inset-0 z-10 bg-slate-50/95 backdrop-blur-xs flex flex-col items-center justify-center gap-3 p-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center shadow-xs">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-black text-slate-900">
                جاري فتح مولد الجذاذات والخطاطات داخل بروف بريس...
              </p>
              <p className="text-xs text-slate-500">
                ثوانٍ قليلة وتظهر واجهة العمل الكاملة لإعداد الجذاذات والخطاطات.
              </p>
            </div>
          </div>
        )}

        <iframe
          key={iframeKey}
          src={EDURAEDA_URL}
          title="مولد الجذاذات والخطاطات التربوية - EduRaeda"
          className="w-full h-full border-0 block"
          onLoad={() => setIsLoading(false)}
          allow="clipboard-read; clipboard-write; fullscreen"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Quick Footer Navigation (Normal Mode Only) */}
      {!isFullscreen && (
        <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>
              لأفضل تجربة أثناء تصميم الجذاذات والخطاطات، استخدم زر <strong>«ملء الشاشة»</strong> أعلى النافذة.
            </span>
          </div>
          <button
            type="button"
            onClick={() => onNavigateToTab("home")}
            className="text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 transition cursor-pointer"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>العودة إلى الرئيسية</span>
          </button>
        </div>
      )}
    </div>
  );
};
