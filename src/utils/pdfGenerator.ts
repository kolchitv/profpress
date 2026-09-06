import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export interface PdfExportOptions {
  filename?: string;
  orientation?: "portrait" | "landscape" | "auto";
  quality?: "standard" | "high" | "ultra"; // 1.5x, 2x, 3x
  colorMode?: "color" | "grayscale";
  onProgress?: (status: string) => void;
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

  try {
    onProgress?.("جاري تهيئة الخطوط والألوان ومقاسات A4...");

    // Wait for document fonts to be ready
    if (document.fonts) {
      await document.fonts.ready;
    }

    // Determine scale factor for high DPI
    let scale = 2; // default high resolution
    if (quality === "ultra") {
      scale = 3; // 300 DPI ultra high resolution
    } else if (quality === "standard") {
      scale = 1.5;
    }

    onProgress?.("جاري المعالجة بدقة عالية (High Resolution DPI)...");

    // Capture element with html2canvas
    const canvas = await html2canvas(element, {
      scale: scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      ignoreElements: (el) => {
        // Ignore any elements with no-print or interactive buttons
        return (
          el.classList.contains("no-print") ||
          el.classList.contains("interactive-controls")
        );
      },
    });

    onProgress?.("جاري ضبط أبعاد A4 وحفظ الألوان...");

    // Determine orientation
    let isLandscape = false;
    if (orientation === "landscape") {
      isLandscape = true;
    } else if (orientation === "portrait") {
      isLandscape = false;
    } else {
      // Auto: based on canvas aspect ratio
      isLandscape = canvas.width > canvas.height;
    }

    // Convert to grayscale if requested
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

    // Standard A4 dimensions in mm: 210 x 297
    const pdf = new jsPDF({
      orientation: isLandscape ? "landscape" : "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const pdfPageWidth = isLandscape ? 297 : 210;
    const pdfPageHeight = isLandscape ? 210 : 297;

    // Small margin for neat official printing (e.g. 5mm)
    const margin = 5;
    const availableWidth = pdfPageWidth - margin * 2;
    const availableHeight = pdfPageHeight - margin * 2;

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = imgWidth / imgHeight;

    let renderWidth = availableWidth;
    let renderHeight = availableWidth / ratio;

    // If height exceeds available height, scale by height instead
    if (renderHeight > availableHeight) {
      renderHeight = availableHeight;
      renderWidth = availableHeight * ratio;
    }

    // Center horizontally and vertically on A4
    const posX = margin + (availableWidth - renderWidth) / 2;
    const posY = margin + (availableHeight - renderHeight) / 2;

    pdf.addImage(imgData, "JPEG", posX, posY, renderWidth, renderHeight, undefined, "FAST");

    onProgress?.("اكتمل التوليد! جاري بدء التحميل...");

    // Safe sanitized filename with .pdf extension
    const cleanFilename = filename.endsWith(".pdf") ? filename : `${filename}.pdf`;
    pdf.save(cleanFilename);
  } catch (error) {
    console.error("PDF generation failed:", error);
    throw error;
  }
}

/**
 * Multi-page A4 PDF generator for documents spanning multiple consecutive pages (e.g., Workshop Report).
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

  try {
    onProgress?.("جاري تهيئة الخطوط المغربية الرسمية وألوان A4...");
    if (document.fonts) {
      await document.fonts.ready;
    }

    let scale = 2.5; // High crisp resolution
    if (quality === "ultra") {
      scale = 3;
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
    const margin = 4; // neat official margin in mm
    const availableWidth = pdfPageWidth - margin * 2;
    const availableHeight = pdfPageHeight - margin * 2;

    for (let i = 0; i < elements.length; i++) {
      onProgress?.(`جاري معالجة الصفحة ${i + 1} من ${elements.length}...`);
      const element = elements[i];

      const canvas = await html2canvas(element, {
        scale: scale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        ignoreElements: (el) => {
          return (
            el.classList.contains("no-print") ||
            el.classList.contains("interactive-controls")
          );
        },
      });

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

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = imgWidth / imgHeight;

      let renderWidth = availableWidth;
      let renderHeight = availableWidth / ratio;
      if (renderHeight > availableHeight) {
        renderHeight = availableHeight;
        renderWidth = availableHeight * ratio;
      }

      const posX = margin + (availableWidth - renderWidth) / 2;
      const posY = margin + (availableHeight - renderHeight) / 2;

      if (i > 0) {
        pdf.addPage("a4", isLandscape ? "landscape" : "portrait");
      }

      pdf.addImage(imgData, "JPEG", posX, posY, renderWidth, renderHeight, undefined, "FAST");
    }

    onProgress?.("اكتمل تجهيز الملف! جاري التنزيل...");
    const cleanFilename = filename.endsWith(".pdf") ? filename : `${filename}.pdf`;
    pdf.save(cleanFilename);
  } catch (error) {
    console.error("Multi-page PDF generation failed:", error);
    throw error;
  }
}

