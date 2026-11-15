import { DownloadGatewaySettings } from "../types";

export const DOWNLOAD_GATEWAY_STORAGE_KEY = "profpress_download_gateway_settings";
export const DOWNLOAD_GATEWAY_EVENT = "profpress_download_gateway_updated";

export const OFFICIAL_ADSENSE_CODE = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2606934361036411"
     crossorigin="anonymous"></script>
<!-- respon inside education -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-2606934361036411"
     data-ad-slot="4039422419"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>`;

export const GATEWAY_MULTIPLEX_ADSENSE_CODE = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2606934361036411"
     crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-format="autorelaxed"
     data-ad-client="ca-pub-2606934361036411"
     data-ad-slot="8337494679"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>`;

export const BOTTOM_EDUCATION_ADSENSE_CODE = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2606934361036411"
     crossorigin="anonymous"></script>
<!-- respon bottom education -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-2606934361036411"
     data-ad-slot="2562689217"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>`;

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
    topBannerAdCode: OFFICIAL_ADSENSE_CODE,
    middleBannerAdCode: GATEWAY_MULTIPLEX_ADSENSE_CODE,
    bottomBannerAdCode: BOTTOM_EDUCATION_ADSENSE_CODE,
    topAdCode: OFFICIAL_ADSENSE_CODE,
    middleAdCode: GATEWAY_MULTIPLEX_ADSENSE_CODE,
    bottomAdCode: BOTTOM_EDUCATION_ADSENSE_CODE,
    showDemoAdsIfEmpty: false,
  },
};

function resolveMigratedAdCode(savedCode: unknown, fallbackCode: string): string {
  if (typeof savedCode !== "string" || !savedCode.trim()) {
    return fallbackCode;
  }
  // Migrate unmodified legacy default snippets to the new dedicated slot snippets
  if (savedCode.trim() === OFFICIAL_ADSENSE_CODE.trim()) {
    return fallbackCode;
  }
  return savedCode;
}

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
          typeof parsed.adSettings?.publisherId === "string" && parsed.adSettings.publisherId.trim()
            ? parsed.adSettings.publisherId.trim()
            : "ca-pub-2606934361036411",
        autoAdsEnabled:
          typeof parsed.adSettings?.autoAdsEnabled === "boolean"
            ? parsed.adSettings.autoAdsEnabled
            : true,
        topBannerAdCode:
          typeof parsed.adSettings?.topBannerAdCode === "string" && parsed.adSettings.topBannerAdCode
            ? parsed.adSettings.topBannerAdCode
            : OFFICIAL_ADSENSE_CODE,
        middleBannerAdCode: resolveMigratedAdCode(
          parsed.adSettings?.middleBannerAdCode,
          GATEWAY_MULTIPLEX_ADSENSE_CODE
        ),
        bottomBannerAdCode: resolveMigratedAdCode(
          parsed.adSettings?.bottomBannerAdCode,
          BOTTOM_EDUCATION_ADSENSE_CODE
        ),
        topAdCode:
          typeof parsed.adSettings?.topAdCode === "string" && parsed.adSettings.topAdCode
            ? parsed.adSettings.topAdCode
            : OFFICIAL_ADSENSE_CODE,
        middleAdCode: resolveMigratedAdCode(
          parsed.adSettings?.middleAdCode,
          GATEWAY_MULTIPLEX_ADSENSE_CODE
        ),
        bottomAdCode: resolveMigratedAdCode(
          parsed.adSettings?.bottomAdCode,
          BOTTOM_EDUCATION_ADSENSE_CODE
        ),
        showDemoAdsIfEmpty: false,
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
