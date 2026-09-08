import React, { useEffect, useRef } from "react";
import { AdSenseSettings } from "../types";

interface AdSenseZoneProps {
  zone?: "top" | "middle" | "bottom" | "custom";
  adSettings?: AdSenseSettings;
  className?: string;
  customCodeOverride?: string;
  title?: string;
  slot?: string;
  client?: string;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export const AdSenseZone: React.FC<AdSenseZoneProps> = ({
  zone = "middle",
  adSettings,
  className = "",
  customCodeOverride,
  title,
  slot = "4039422419",
  client = "ca-pub-2606934361036411",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isPushedRef = useRef(false);

  // Determine publisher ID and ad slot
  const publisherId = adSettings?.publisherId?.trim() || client || "ca-pub-2606934361036411";
  const isEnabled = adSettings ? adSettings.isEnabled : true;

  // Check if there is specific custom HTML code provided
  let code = customCodeOverride;
  if (code === undefined && adSettings) {
    if (zone === "top") code = adSettings.topBannerAdCode || adSettings.topAdCode;
    else if (zone === "middle") code = adSettings.middleBannerAdCode || adSettings.middleAdCode;
    else if (zone === "bottom") code = adSettings.bottomBannerAdCode || adSettings.bottomAdCode;
    else code = "";
  }

  // Extract ad slot from custom code if available, otherwise fallback to user requested 4039422419
  let adSlot = slot;
  if (code) {
    const slotMatch = code.match(/data-ad-slot=["'](\d+)["']/);
    if (slotMatch && slotMatch[1]) {
      adSlot = slotMatch[1];
    }
  }

  useEffect(() => {
    if (!isEnabled) return;
    if (isPushedRef.current) return;

    try {
      if (typeof window !== "undefined") {
        // Ensure AdSense script is in <head>
        const scriptId = "profpress-google-adsense-script";
        if (!document.getElementById(scriptId)) {
          const script = document.createElement("script");
          script.id = scriptId;
          script.async = true;
          script.crossOrigin = "anonymous";
          script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`;
          document.head.appendChild(script);
        }

        // Trigger adsbygoogle push after slight delay for DOM readiness
        const timer = setTimeout(() => {
          try {
            if (window.adsbygoogle && containerRef.current?.querySelector(".adsbygoogle")) {
              (window.adsbygoogle = window.adsbygoogle || []).push({});
              isPushedRef.current = true;
            }
          } catch (err) {
            // May occur if blocked by browser extension
          }
        }, 120);

        return () => clearTimeout(timer);
      }
    } catch (e) {
      // Ignore
    }
  }, [isEnabled, publisherId, adSlot]);

  if (!isEnabled) {
    return null;
  }

  return (
    <div className={`w-full overflow-hidden my-3 ${className}`}>
      {/* Ad Notice Header */}
      <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium px-2 py-0.5 mb-1 select-none">
        <span className="flex items-center gap-1 font-cairo">
          <span>إعلان</span>
          <span className="opacity-60">•</span>
          <span>Google AdSense</span>
        </span>
        <span className="text-[9px] opacity-70 font-mono">{publisherId}</span>
      </div>

      {/* Clean Official Ad Container */}
      <div
        ref={containerRef}
        className="flex justify-center items-center w-full min-h-[90px] bg-white rounded-2xl overflow-hidden border border-slate-200/80 p-2 shadow-2xs"
      >
        <ins
          className="adsbygoogle"
          style={{ display: "block", minWidth: "250px", width: "100%", textAlign: "center" }}
          data-ad-client={publisherId}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};

