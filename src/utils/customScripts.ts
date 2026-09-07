import { CustomCodeSettings } from "../types";

const STORAGE_KEY = "profpress_custom_code_settings";
export const CUSTOM_CODE_EVENT = "profpress_custom_code_updated";

export const DEFAULT_CUSTOM_CODE: CustomCodeSettings = {
  headerCode: "",
  bodyStartCode: "",
  footerCode: "",
  isEnabled: true,
  lastUpdated: new Date().toISOString(),
};

/**
 * Load custom code settings from localStorage
 */
export function getCustomCodeSettings(): CustomCodeSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CUSTOM_CODE;
    const parsed = JSON.parse(raw);
    return {
      headerCode: typeof parsed.headerCode === "string" ? parsed.headerCode : "",
      bodyStartCode: typeof parsed.bodyStartCode === "string" ? parsed.bodyStartCode : "",
      footerCode: typeof parsed.footerCode === "string" ? parsed.footerCode : "",
      isEnabled: typeof parsed.isEnabled === "boolean" ? parsed.isEnabled : true,
      lastUpdated: parsed.lastUpdated || new Date().toISOString(),
    };
  } catch (e) {
    console.error("Error reading custom code settings:", e);
    return DEFAULT_CUSTOM_CODE;
  }
}

/**
 * Save custom code settings and immediately apply them to the DOM
 */
export function saveCustomCodeSettings(settings: CustomCodeSettings): boolean {
  try {
    const updated: CustomCodeSettings = {
      ...settings,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    applyCustomScripts(updated);
    window.dispatchEvent(new CustomEvent(CUSTOM_CODE_EVENT, { detail: updated }));
    return true;
  } catch (e) {
    console.error("Error saving custom code settings:", e);
    return false;
  }
}

/**
 * Safely inject HTML elements and execute <script> tags
 */
function injectHtmlWithExecutableScripts(
  containerId: string,
  targetParent: HTMLElement,
  htmlContent: string,
  position: "prepend" | "append" = "append"
) {
  // Find or create container
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement("div");
    container.id = containerId;
    container.setAttribute("data-profpress-injected", "true");
    if (position === "prepend" && targetParent.firstChild) {
      targetParent.insertBefore(container, targetParent.firstChild);
    } else {
      targetParent.appendChild(container);
    }
  }

  // Clear previous content
  container.innerHTML = "";

  const trimmed = htmlContent.trim();
  if (!trimmed) return;

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div>${trimmed}</div>`, "text/html");
    const nodes = Array.from(doc.body.childNodes);

    nodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        const tagName = element.tagName.toLowerCase();

        if (tagName === "script") {
          // Browsers do not execute <script> inserted via innerHTML; create new element
          const scriptEl = document.createElement("script");
          Array.from(element.attributes).forEach((attr) => {
            scriptEl.setAttribute(attr.name, attr.value);
          });
          if (element.textContent) {
            scriptEl.textContent = element.textContent;
          }
          container?.appendChild(scriptEl);
        } else {
          // Meta, link, style, div, noscript, etc.
          container?.appendChild(document.importNode(element, true));
        }
      } else if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.COMMENT_NODE) {
        container?.appendChild(document.importNode(node, true));
      }
    });
  } catch (err) {
    console.warn("Failed to inject custom code into " + containerId, err);
  }
}

/**
 * Apply the custom code configuration to document <head>, <body> start, and <body> footer
 */
export function applyCustomScripts(settings: CustomCodeSettings): void {
  if (typeof document === "undefined") return;

  const headContainerId = "profpress-injected-head-code";
  const bodyStartContainerId = "profpress-injected-body-start-code";
  const footerContainerId = "profpress-injected-footer-code";

  // If disabled, wipe all existing injected containers
  if (!settings.isEnabled) {
    [headContainerId, bodyStartContainerId, footerContainerId].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.remove();
    });
    return;
  }

  // 1. Inject Header (<head>)
  if (document.head) {
    injectHtmlWithExecutableScripts(headContainerId, document.head, settings.headerCode, "append");
  }

  // 2. Inject Body Start (<body> top)
  if (document.body) {
    injectHtmlWithExecutableScripts(bodyStartContainerId, document.body, settings.bodyStartCode, "prepend");
  }

  // 3. Inject Footer (<body> bottom)
  if (document.body) {
    injectHtmlWithExecutableScripts(footerContainerId, document.body, settings.footerCode, "append");
  }
}

/**
 * Ready-to-use Presets for the Admin
 */
export interface ScriptPreset {
  id: string;
  name: string;
  category: "analytics" | "ads" | "seo" | "style" | "chat";
  target: "header" | "bodyStart" | "footer" | "gtm_combo";
  description: string;
  codeSnippet: string;
  secondarySnippet?: string; // For GTM combo (body noscript)
}

export const SCRIPT_PRESETS: ScriptPreset[] = [
  {
    id: "gtm_combo",
    name: "Google Tag Manager (GTM كامل)",
    category: "analytics",
    target: "gtm_combo",
    description: "كود GTM القياسي (شفرة الرأس + شفرة البداية noscript)",
    codeSnippet: `<!-- Google Tag Manager (Head) -->\n<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\nnew Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\nj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>`,
    secondarySnippet: `<!-- Google Tag Manager (noscript) -->\n<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"\nheight="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`,
  },
  {
    id: "gsc_verification",
    name: "إثبات ملكية Google Search Console",
    category: "seo",
    target: "header",
    description: "وسم Meta للتحقق من ملكية الموقع في محرك بحث جوجل",
    codeSnippet: `<!-- Google Search Console Verification -->\n<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE_HERE" />`,
  },
  {
    id: "bing_verification",
    name: "إثبات ملكية Bing Webmaster",
    category: "seo",
    target: "header",
    description: "وسم Meta للتحقق من ملكية الموقع في محرك بحث بينغ Bing",
    codeSnippet: `<!-- Bing Webmaster Verification -->\n<meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" />`,
  },
  {
    id: "custom_css",
    name: "أنماط CSS مخصصة (Custom Styles)",
    category: "style",
    target: "header",
    description: "تطبيق قواعد تنسيق وألوان إضافية مباشرة على الموقع",
    codeSnippet: `<style>\n  /* تخصيصات CSS إضافية لموقع بروف بريس */\n  :root {\n    --profpress-custom-accent: #0f766e;\n  }\n</style>`,
  },
  {
    id: "meta_pixel",
    name: "Meta Pixel (Facebook Ads)",
    category: "analytics",
    target: "header",
    description: "شفرة تتبع حملات فيسبوك وإنستغرام الإعلانية",
    codeSnippet: `<!-- Meta Pixel Code -->\n<script>\n!function(f,b,e,v,n,t,s)\n{if(f.fbq)return;n=f.fbq=function(){n.callMethod?\nn.callMethod.apply(n,arguments):n.queue.push(arguments)};\nif(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';\nn.queue=[];t=b.createElement(e);t.async=!0;\nt.src=v;s=b.getElementsByTagName(e)[0];\ns.parentNode.insertBefore(t,s)}(window, document,'script',\n'https://connect.facebook.net/en_US/fbevents.js');\nfbq('init', 'YOUR_PIXEL_ID');\nfbq('track', 'PageView');\n</script>`,
  },
  {
    id: "adsense_unit",
    name: "وحدة إعلانية متجاوبة (AdSense Unit)",
    category: "ads",
    target: "bodyStart",
    description: "شفرة إعلان متجاوب يظهر في أعلى أو أسفل المحتوى",
    codeSnippet: `<!-- Profpress Responsive Ad Slot -->\n<div class="my-4 text-center">\n  <ins class="adsbygoogle"\n       style="display:block"\n       data-ad-client="ca-pub-2606934361036411"\n       data-ad-slot="1234567890"\n       data-ad-format="auto"\n       data-full-width-responsive="true"></ins>\n  <script>\n       (adsbygoogle = window.adsbygoogle || []).push({});\n  </script>\n</div>`,
  },
  {
    id: "whatsapp_floating",
    name: "زر تواصل عائم سفلي (WhatsApp / Chat)",
    category: "chat",
    target: "footer",
    description: "إضافة زر اتصال عائم أسفل يمين الشاشة للتواصل الفوري",
    codeSnippet: `<!-- Custom Floating Contact Button -->\n<a href="https://wa.me/212707983967" target="_blank" rel="noopener noreferrer"\n   style="position:fixed;bottom:24px;left:24px;z-index:9999;background:#25D366;color:#fff;padding:12px 18px;border-radius:50px;box-shadow:0 4px 14px rgba(0,0,0,0.25);font-family:Cairo,sans-serif;font-weight:bold;font-size:13px;display:flex;align-items:center;gap:8px;text-decoration:none;">\n  <span>💬 تواصل معنا</span>\n</a>`,
  },
];
