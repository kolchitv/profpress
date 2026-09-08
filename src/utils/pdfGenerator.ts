import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export interface PdfExportOptions {
  filename?: string;
  orientation?: "portrait" | "landscape" | "auto";
  quality?: "standard" | "high" | "ultra"; // 1.5x, 2x, 2.2x
  colorMode?: "color" | "grayscale";
  onProgress?: (status: string) => void;
}

/**
 * Singleton Canvas 2D context for normalizing modern CSS Color Level 4
 * (oklch, oklab, lch, lab, color(...)) into standard RGB/RGBA/HEX strings
 * that html2canvas can safely parse without throwing errors.
 */
let colorCanvasCtx: CanvasRenderingContext2D | null = null;

function getColorCanvasCtx(): CanvasRenderingContext2D | null {
  if (typeof document === "undefined") return null;
  if (!colorCanvasCtx) {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1;
      canvas.height = 1;
      colorCanvasCtx = canvas.getContext("2d", { willReadFrequently: true });
    } catch {
      return null;
    }
  }
  return colorCanvasCtx;
}

/**
 * Converts any CSS string containing modern color functions (such as oklch or color)
 * into standard hex (#rrggbb) or rgba(...) supported by html2canvas.
 */
export function convertModernColorsToStandard(cssString: string): string {
  if (!cssString) return cssString;
  if (
    !cssString.includes("oklch") &&
    !cssString.includes("oklab") &&
    !cssString.includes("lch(") &&
    !cssString.includes("lab(") &&
    !cssString.includes("color(")
  ) {
    return cssString;
  }

  const ctx = getColorCanvasCtx();
  const modernColorRegex = /(?:oklch|oklab|lch|lab|color)\([^)]+\)/gi;

  return cssString.replace(modernColorRegex, (match) => {
    if (ctx) {
      try {
        ctx.fillStyle = "rgba(0,0,0,0)";
        ctx.fillStyle = match;
        if (ctx.fillStyle && ctx.fillStyle !== "rgba(0, 0, 0, 0)") {
          return ctx.fillStyle;
        }
      } catch {
        // Fallback below
      }
    }
    // Safe generic fallback if canvas conversion is unavailable
    return match.startsWith("oklch") ? "#10b981" : "#1e293b";
  });
}

/**
 * Properties that might contain colors or modern color functions.
 */
const COLOR_PROPERTIES = [
  "color",
  "background",
  "background-color",
  "background-image",
  "border-color",
  "border-top-color",
  "border-right-color",
  "border-bottom-color",
  "border-left-color",
  "outline-color",
  "text-decoration-color",
  "text-shadow",
  "box-shadow",
  "fill",
  "stroke",
  "caret-color",
  "accent-color",
  "stop-color",
  "flood-color",
  "lighting-color",
  "filter",
  "backdrop-filter",
];

/**
 * Sanitizes all elements and styles in the cloned document for html2canvas
 * to prevent any "unsupported color function oklch" errors.
 */
function sanitizeClonedDocumentForHtml2Canvas(clonedDoc: Document) {
  // 1. Sanitize all <style> elements in the cloned document
  const styleElements = clonedDoc.querySelectorAll("style");
  styleElements.forEach((styleEl) => {
    if (styleEl.textContent) {
      styleEl.textContent = convertModernColorsToStandard(styleEl.textContent);
    }
  });

  // 2. Sanitize inline and computed styles across all cloned elements
  const allElements = clonedDoc.querySelectorAll("*");
  allElements.forEach((node) => {
    if (node instanceof HTMLElement || node instanceof SVGElement) {
      // Clean inline style attribute if present
      if (node.hasAttribute("style")) {
        const inlineStyle = node.getAttribute("style");
        if (inlineStyle) {
          node.setAttribute("style", convertModernColorsToStandard(inlineStyle));
        }
      }

      // Read computed style and enforce converted standard colors
      try {
        const computed = window.getComputedStyle(node);
        for (const prop of COLOR_PROPERTIES) {
          const val = computed.getPropertyValue(prop);
          if (
            val &&
            (val.includes("oklch") ||
              val.includes("oklab") ||
              val.includes("lch(") ||
              val.includes("lab(") ||
              val.includes("color("))
          ) {
            const converted = convertModernColorsToStandard(val);
            node.style.setProperty(prop, converted, "important");
          }
        }
      } catch {
        // Ignore disconnected element style access
      }
    }
  });
}

/**
 * High-resolution A4 PDF generator tailored for Moroccan Educational Documents.
 * Guarantees exact font rendering (Cairo, Amiri, Arabic RTL ligatures) and official colors.
 */
export async function generatePdfFromElement(
  element: HTMLElement,
  options: PdfExportOptions = {}
): Promise<void> {
  const {
    filename = "وثيقة_الأستاذ_A4.pdf",
    orientation = "auto",
    quality = "high",
    colorMode = "color",
    onProgress,
  } = options;

  const origScrollX = window.scrollX;
  const origScrollY = window.scrollY;

  try {
    onProgress?.("جاري التحقق من تحميل جميع الصور والخطوط بالكامل...");

    // Wait for document fonts to be ready
    if (document.fonts) {
      await document.fonts.ready;
    }

    // Ensure all images are fully loaded and decoded
    const images = Array.from(element.querySelectorAll("img"));
    await Promise.all(
      images.map(async (img) => {
        if (!img.complete) {
          await new Promise((resolve) => {
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
          });
        }
        if (img.decode) {
          try {
            await img.decode();
          } catch {
            // ignore decode error
          }
        }
      })
    );

    // Scroll window to absolute top to eliminate scroll offsets
    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 80));

    // Determine scale factor for high DPI
    let scale = 2; // 200 DPI crisp & memory safe
    if (quality === "ultra") {
      scale = 2.2;
    } else if (quality === "standard") {
      scale = 1.5;
    }

    onProgress?.("جاري المعالجة بدقة عالية (High Resolution DPI)...");

    // Capture element with html2canvas (stable viewport capture)
    const canvas = await html2canvas(element, {
      scale: scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      scrollX: 0,
      scrollY: 0,
      onclone: (clonedDoc) => {
        sanitizeClonedDocumentForHtml2Canvas(clonedDoc);
      },
      ignoreElements: (el) => {
        return (
          el.classList.contains("no-print") ||
          el.classList.contains("interactive-controls")
        );
      },
    });

    if (!canvas || canvas.width === 0 || canvas.height === 0) {
      throw new Error("تعذر التقاط محتوى الصفحة بنجاح.");
    }

    onProgress?.("جاري ضبط أبعاد A4 وحفظ الألوان...");

    // Determine orientation
    let isLandscape = false;
    if (orientation === "landscape") {
      isLandscape = true;
    } else if (orientation === "portrait") {
      isLandscape = false;
    } else {
      isLandscape = canvas.width > canvas.height;
    }

    let imgData: string;
    if (colorMode === "grayscale") {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const imgDataRaw = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgDataRaw.data;
        for (let i = 0; i < data.length; i += 4) {
          const brightness =
            0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
          data[i] = brightness;
          data[i + 1] = brightness;
          data[i + 2] = brightness;
        }
        ctx.putImageData(imgDataRaw, 0, 0);
      }
      imgData = canvas.toDataURL("image/jpeg", 0.95);
    } else {
      imgData = canvas.toDataURL("image/jpeg", 0.95);
    }

    onProgress?.("جاري إنشاء ملف PDF وتضمين الصفحة...");

    const pdf = new jsPDF({
      orientation: isLandscape ? "landscape" : "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const pdfPageWidth = isLandscape ? 297 : 210;
    const pdfPageHeight = isLandscape ? 210 : 297;

    pdf.addImage(imgData, "JPEG", 0, 0, pdfPageWidth, pdfPageHeight, undefined, "FAST");

    onProgress?.("اكتمل التوليد! جاري بدء التحميل...");
    const cleanFilename = filename.endsWith(".pdf") ? filename : `${filename}.pdf`;
    pdf.save(cleanFilename);
  } catch (error) {
    console.error("PDF generation failed:", error);
    throw error;
  } finally {
    window.scrollTo(origScrollX, origScrollY);
  }
}

/**
 * Multi-page A4 PDF generator for documents spanning multiple consecutive pages (e.g., Workshop Report).
 * Ensures all typography and images are completely decoded and loaded before capturing,
 * and fixes canvas coordinate offsets to guarantee zero blank/white pages.
 */
export async function generateMultiPagePdfFromElements(
  elements: HTMLElement[],
  options: PdfExportOptions = {}
): Promise<void> {
  const {
    filename = "تقرير_الورشات_A4.pdf",
    orientation = "portrait",
    quality = "ultra",
    colorMode = "color",
    onProgress,
  } = options;

  const origScrollX = window.scrollX;
  const origScrollY = window.scrollY;

  try {
    onProgress?.("جاري فحص وتحميل جميع الخطوط والصور بالكامل...");

    // 1. Wait for document fonts
    if (document.fonts) {
      await document.fonts.ready;
    }

    // 2. Wait for all images across all pages
    const allImages: HTMLImageElement[] = [];
    elements.forEach((el) => {
      allImages.push(...Array.from(el.querySelectorAll("img")));
    });

    await Promise.all(
      allImages.map(async (img) => {
        if (!img.complete) {
          await new Promise((resolve) => {
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
          });
        }
        if (img.decode) {
          try {
            await img.decode();
          } catch {
            // image already rendered or decode unsupported
          }
        }
      })
    );

    // Give browser time to settle DOM rendering & layout
    await new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 80)));

    let scale = 2; // 200 DPI crisp, memory safe
    if (quality === "ultra") {
      scale = 2.2;
    } else if (quality === "standard") {
      scale = 1.5;
    }

    const isLandscape = orientation === "landscape";
    const pdf = new jsPDF({
      orientation: isLandscape ? "landscape" : "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const pdfPageWidth = isLandscape ? 297 : 210;
    const pdfPageHeight = isLandscape ? 210 : 297;

    for (let i = 0; i < elements.length; i++) {
      onProgress?.(`جاري معالجة وتصيير الصفحة ${i + 1} من ${elements.length}...`);
      const element = elements[i];

      // Smoothly bring element into viewport
      element.scrollIntoView({ block: "start", inline: "nearest" });
      await new Promise((resolve) => setTimeout(resolve, 100));

      const canvas = await html2canvas(element, {
        scale: scale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        scrollX: 0,
        scrollY: 0,
        onclone: (clonedDoc) => {
          sanitizeClonedDocumentForHtml2Canvas(clonedDoc);
        },
        ignoreElements: (el) => {
          return (
            el.classList.contains("no-print") ||
            el.classList.contains("interactive-controls")
          );
        },
      });

      if (!canvas || canvas.width === 0 || canvas.height === 0) {
        throw new Error(`تعذر تصيير الصفحة ${i + 1} كصورة.`);
      }

      let imgData: string;
      if (colorMode === "grayscale") {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const imgDataRaw = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imgDataRaw.data;
          for (let p = 0; p < data.length; p += 4) {
            const brightness = 0.299 * data[p] + 0.587 * data[p + 1] + 0.114 * data[p + 2];
            data[p] = brightness;
            data[p + 1] = brightness;
            data[p + 2] = brightness;
          }
          ctx.putImageData(imgDataRaw, 0, 0);
        }
        imgData = canvas.toDataURL("image/jpeg", 0.95);
      } else {
        imgData = canvas.toDataURL("image/jpeg", 0.95);
      }

      if (i > 0) {
        pdf.addPage("a4", isLandscape ? "landscape" : "portrait");
      }

      // Exact A4 dimensions edge-to-edge
      pdf.addImage(imgData, "JPEG", 0, 0, pdfPageWidth, pdfPageHeight, undefined, "FAST");
    }

    onProgress?.("اكتمل تجهيز الملف! جاري التنزيل...");
    const cleanFilename = filename.endsWith(".pdf") ? filename : `${filename}.pdf`;
    pdf.save(cleanFilename);
  } catch (error) {
    console.error("Multi-page PDF generation failed:", error);
    throw error;
  } finally {
    window.scrollTo(origScrollX, origScrollY);
  }
}
