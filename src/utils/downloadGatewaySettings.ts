import { DownloadGatewaySettings } from "../types";

export const DOWNLOAD_GATEWAY_STORAGE_KEY = "profpress_download_gateway_settings";
export const DOWNLOAD_GATEWAY_EVENT = "profpress_download_gateway_updated";

export const DEFAULT_DOWNLOAD_GATEWAY_SETTINGS: DownloadGatewaySettings = {
  isEnabled: true,
  countdownSeconds: 10,
  autoRedirect: false,
  safeCheckBadge: true,
  customNoticeText:
    "يرجى الانتظار بضع ثوانٍ بينما يقوم النظام بتجهيز وفحص رابط التحميل المباشر وتشفيره لضمان أعلى درجات الأمان والسرعة.",
  adSettings: {
    isEnabled: true,
    publisherId: "ca-pub-2606934361036411",
    autoAdsEnabled: true,
    topBannerAdCode: "",
    middleBannerAdCode: "",
    bottomBannerAdCode: "",
    showDemoAdsIfEmpty: true,
  },
};

/**
 * Load Download Gateway and AdSense settings from localStorage
 */
export function getDownloadGatewaySettings(): DownloadGatewaySettings {
  try {
    const raw = localStorage.getItem(DOWNLOAD_GATEWAY_STORAGE_KEY);
    if (!raw) return DEFAULT_DOWNLOAD_GATEWAY_SETTINGS;
    const parsed = JSON.parse(raw);
    return {
      isEnabled: typeof parsed.isEnabled === "boolean" ? parsed.isEnabled : true,
      countdownSeconds:
        typeof parsed.countdownSeconds === "number" && parsed.countdownSeconds >= 0
          ? parsed.countdownSeconds
          : 10,
      autoRedirect: typeof parsed.autoRedirect === "boolean" ? parsed.autoRedirect : false,
      safeCheckBadge: typeof parsed.safeCheckBadge === "boolean" ? parsed.safeCheckBadge : true,
      customNoticeText:
        typeof parsed.customNoticeText === "string"
          ? parsed.customNoticeText
          : DEFAULT_DOWNLOAD_GATEWAY_SETTINGS.customNoticeText,
      adSettings: {
        isEnabled:
          typeof parsed.adSettings?.isEnabled === "boolean"
            ? parsed.adSettings.isEnabled
            : true,
        publisherId:
          typeof parsed.adSettings?.publisherId === "string"
            ? parsed.adSettings.publisherId.trim()
            : "ca-pub-2606934361036411",
        autoAdsEnabled:
          typeof parsed.adSettings?.autoAdsEnabled === "boolean"
            ? parsed.adSettings.autoAdsEnabled
            : true,
        topBannerAdCode:
          typeof parsed.adSettings?.topBannerAdCode === "string"
            ? parsed.adSettings.topBannerAdCode
            : "",
        middleBannerAdCode:
          typeof parsed.adSettings?.middleBannerAdCode === "string"
            ? parsed.adSettings.middleBannerAdCode
            : "",
        bottomBannerAdCode:
          typeof parsed.adSettings?.bottomBannerAdCode === "string"
            ? parsed.adSettings.bottomBannerAdCode
            : "",
        showDemoAdsIfEmpty:
          typeof parsed.adSettings?.showDemoAdsIfEmpty === "boolean"
            ? parsed.adSettings.showDemoAdsIfEmpty
            : true,
      },
    };
  } catch (e) {
    console.error("Failed to load download gateway settings:", e);
    return DEFAULT_DOWNLOAD_GATEWAY_SETTINGS;
  }
}

/**
 * Save Download Gateway and AdSense settings and broadcast update
 */
export function saveDownloadGatewaySettings(settings: DownloadGatewaySettings): boolean {
  try {
    localStorage.setItem(DOWNLOAD_GATEWAY_STORAGE_KEY, JSON.stringify(settings));
    syncAdSenseScript(settings);
    window.dispatchEvent(
      new CustomEvent(DOWNLOAD_GATEWAY_EVENT, { detail: settings })
    );
    return true;
  } catch (e) {
    console.error("Failed to save download gateway settings:", e);
    return false;
  }
}

/**
 * Ensures AdSense script is in <head> when publisher ID is set
 */
export function syncAdSenseScript(settings: DownloadGatewaySettings) {
  if (typeof document === "undefined") return;

  const scriptId = "profpress-google-adsense-script";
  const existing = document.getElementById(scriptId);

  const pubId = settings.adSettings.publisherId.trim();
  const shouldInject =
    settings.adSettings.isEnabled &&
    settings.adSettings.autoAdsEnabled &&
    pubId.startsWith("ca-pub-");

  if (!shouldInject) {
    if (existing) existing.remove();
    return;
  }

  if (existing) {
    existing.setAttribute(
      "src",
      `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pubId}`
    );
  } else {
    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pubId}`;
    document.head.appendChild(script);
  }
}
