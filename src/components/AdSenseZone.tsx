import React, { useEffect, useRef } from "react";
import { Sparkles, Megaphone, Info } from "lucide-react";
import { AdSenseSettings } from "../types";

interface AdSenseZoneProps {
  zone: "top" | "middle" | "bottom" | "custom";
  adSettings: AdSenseSettings;
  className?: string;
  customCodeOverride?: string;
  title?: string;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export const AdSenseZone: React.FC<AdSenseZoneProps> = ({
  zone,
  adSettings,
  className = "",
  customCodeOverride,
  title,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Determine code to use
  let code = customCodeOverride;
  if (code === undefined) {
    if (zone === "top") code = adSettings.topBannerAdCode;
    else if (zone === "middle") code = adSettings.middleBannerAdCode;
    else if (zone === "bottom") code = adSettings.bottomBannerAdCode;
    else code = "";
  }
  const hasCustomCode = Boolean(code && code.trim().length > 0);

  useEffect(() => {
    if (!containerRef.current || !hasCustomCode || !code) return;

    // Clear existing children
    const container = containerRef.current;
    container.innerHTML = "";

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(`<div>${code.trim()}</div>`, "text/html");
      const nodes = Array.from(doc.body.childNodes);

      nodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as HTMLElement;
          if (el.tagName.toLowerCase() === "script") {
            const script = document.createElement("script");
            Array.from(el.attributes).forEach((attr) => {
              script.setAttribute(attr.name, attr.value);
            });
            if (el.textContent) script.textContent = el.textContent;
            container.appendChild(script);
          } else {
            container.appendChild(document.importNode(el, true));
          }
        } else if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.COMMENT_NODE) {
          container.appendChild(document.importNode(node, true));
        }
      });

      // Trigger adsbygoogle push if needed
      try {
        if (window.adsbygoogle && container.querySelector(".adsbygoogle")) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (err) {
        // May fail if ad blocker or already pushed, ignore
      }
    } catch (e) {
      console.warn("Failed to render custom AdSense code:", e);
    }
  }, [code, hasCustomCode]);

  if (!adSettings.isEnabled) {
    return null;
  }

  // If custom code is present, render container
  if (hasCustomCode) {
    return (
      <div className={`w-full overflow-hidden my-3 ${className}`}>
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium px-2 py-0.5 mb-1 select-none">
          <span className="flex items-center gap-1 font-cairo">
            <span>إعلان</span>
            <span className="opacity-60">•</span>
            <span>Google AdSense</span>
          </span>
          <span className="text-[9px] opacity-70">Annonce</span>
        </div>
        <div ref={containerRef} className="flex justify-center items-center w-full min-h-[90px] bg-slate-50/50 rounded-xl overflow-hidden border border-slate-200/60 p-1" />
      </div>
    );
  }

  // If demo ads is off and no code is present, render nothing
  if (!adSettings.showDemoAdsIfEmpty) {
    return null;
  }

  // Demo / Placeholder Zone
  const zoneLabels: Record<string, { name: string; size: string; bg: string; border: string }> = {
    top: {
      name: "إعلان بانر علوي (Leaderboard)",
      size: "728 × 90 Responsive Banner",
      bg: "bg-gradient-to-r from-amber-50/70 via-slate-50 to-blue-50/70",
      border: "border-dashed border-amber-300",
    },
    middle: {
      name: "إعلان وسط بطاقة الانتظار (In-Content / Rectangle)",
      size: "300 × 250 / Fluid Native Ad",
      bg: "bg-gradient-to-r from-indigo-50/60 via-slate-50 to-teal-50/60",
      border: "border-dashed border-indigo-300",
    },
    bottom: {
      name: "إعلان بانر سفلي (Bottom Banner)",
      size: "728 × 90 / Mobile Leaderboard",
      bg: "bg-gradient-to-r from-emerald-50/60 via-slate-50 to-amber-50/60",
      border: "border-dashed border-emerald-300",
    },
    custom: {
      name: title || "مساحة إعلانية Google AdSense",
      size: "Responsive Ad Unit",
      bg: "bg-slate-50",
      border: "border-dashed border-slate-300",
    },
  };

  const currentZone = zoneLabels[zone] || zoneLabels.custom;

  return (
    <div className={`w-full my-3 ${className}`}>
      <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium px-2 py-0.5 mb-1 select-none">
        <span className="flex items-center gap-1 font-cairo">
          <span>مساحة إعلانية</span>
          <span className="opacity-60">•</span>
          <span>Google AdSense</span>
        </span>
        <span className="text-[9px] bg-slate-200/70 text-slate-600 px-1.5 py-0.2 rounded font-mono">
          {adSettings.publisherId || "ca-pub-..."}
        </span>
      </div>

      <div
        className={`w-full min-h-[85px] sm:min-h-[90px] rounded-2xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right border ${currentZone.border} ${currentZone.bg} transition hover:bg-slate-100/80`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-amber-500 shrink-0">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-black text-slate-800 flex items-center gap-1.5 justify-center sm:justify-start">
              <span>{currentZone.name}</span>
              <span className="text-[9px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.2 rounded">
                جاهز للربط
              </span>
            </div>
            <div className="text-[11px] text-slate-500 font-mono mt-0.5">
              المقاس المقترح: <strong className="text-slate-700">{currentZone.size}</strong>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-slate-500 bg-white/90 px-3 py-1.5 rounded-xl border border-slate-200/80 shrink-0 shadow-2xs">
          <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
          <span>ضع شفرة إعلانك في لوحة تحكم المشرف لتفعيل الأرباح</span>
        </div>
      </div>
    </div>
  );
};
