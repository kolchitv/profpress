import type { ExplicitLessonItem } from "../data/explicitTeachingData";
import { generatePdfFromElement } from "./pdfGenerator";

const SUBJECT_NAMES: Record<string, { ar: string; fr: string }> = {
  arabic: { ar: "اللغة العربية", fr: "Langue Arabe" },
  french: { ar: "اللغة الفرنسية", fr: "Langue Française" },
  math: { ar: "الرياضيات", fr: "Mathématiques" },
  science: { ar: "النشاط العلمي", fr: "Éveil Scientifique" },
};

const LEVEL_NAMES: Record<string, string> = {
  "1aep": "المستوى الأول ابتدائي (1AEP)",
  "2aep": "المستوى الثاني ابتدائي (2AEP)",
  "3aep": "المستوى الثالث ابتدائي (3AEP)",
  "4aep": "المستوى الرابع ابتدائي (4AEP)",
  "5aep": "المستوى الخامس ابتدائي (5AEP)",
  "6aep": "المستوى السادس ابتدائي (6AEP)",
  shared: "الأقسام المشتركة",
};

function sanitizeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Download an Explicit Teaching / TaRL lesson directly inside the site as a formatted Word (.doc) file.
 * Zero external links required.
 */
export function downloadExplicitLessonAsWord(lesson: ExplicitLessonItem): void {
  const isFr = lesson.subject === "french";
  const dir = isFr ? "ltr" : "rtl";
  const align = isFr ? "left" : "right";
  const subjectInfo = SUBJECT_NAMES[lesson.subject] || SUBJECT_NAMES.arabic;
  const levelLabel = LEVEL_NAMES[lesson.level] || lesson.level;

  const summaryHtml =
    lesson.summaryPoints && lesson.summaryPoints.length > 0
      ? `
      <div class="section-box">
        <h3>${isFr ? "Synthèse et Règles Essentielles" : "ملخص الدرس والقواعد الأساسية"}</h3>
        <ul>
          ${lesson.summaryPoints.map((pt) => `<li>${sanitizeHtml(pt)}</li>`).join("")}
        </ul>
      </div>`
      : "";

  const slidesHtml =
    lesson.slidesOutline && lesson.slidesOutline.length > 0
      ? `
      <div class="section-box">
        <h3>${isFr ? "Plan des Diapositives (Présentation)" : "محاور الشرائح التفاعلية للعرض الصفي"}</h3>
        <ul>
          ${lesson.slidesOutline
            .map(
              (s) =>
                `<li><strong>${sanitizeHtml(s.slideTitle)}:</strong> ${sanitizeHtml(s.content)}</li>`
            )
            .join("")}
        </ul>
      </div>`
      : "";

  const exercisesHtml =
    lesson.exercisesWithCorrection && lesson.exercisesWithCorrection.length > 0
      ? `
      <div class="section-box">
        <h3>${isFr ? "Applications et Corrigés Types" : "تمارين تطبيقية مرفقة بعناصر الإجابة"}</h3>
        ${lesson.exercisesWithCorrection
          .map(
            (ex, idx) => `
            <p><strong>${isFr ? `Exercice ${idx + 1}:` : `التمرين ${idx + 1}:`}</strong> ${sanitizeHtml(ex.question)}</p>
            <p class="answer"><strong>${isFr ? "Corrigé :" : "عنصر الإجابة:"}</strong> ${sanitizeHtml(ex.answer)}</p>`
          )
          .join("")}
      </div>`
      : "";

  const htmlDoc = `<html xmlns:o="urn:schemas-microsoft-com:office:office"
xmlns:w="urn:schemas-microsoft-com:office:word"
xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8" />
<title>${sanitizeHtml(lesson.title)}</title>
<style>
  body {
    font-family: 'Cairo', 'Arial', sans-serif;
    direction: ${dir};
    text-align: ${align};
    color: #0f172a;
    line-height: 1.65;
    padding: 24px;
  }
  .header-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 16px;
    border-bottom: 2px solid #1e3a8a;
  }
  .header-table td {
    padding: 6px;
    font-size: 12px;
    font-weight: bold;
  }
  h1 {
    font-size: 19px;
    color: #1e3a8a;
    margin: 12px 0 6px;
  }
  .meta {
    font-size: 12px;
    color: #475569;
    margin-bottom: 14px;
  }
  .objective-box {
    background-color: #eff6ff;
    border: 1px solid #bfdbfe;
    padding: 12px;
    margin-bottom: 14px;
  }
  table.steps {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 16px;
  }
  table.steps th, table.steps td {
    border: 1px solid #cbd5e1;
    padding: 8px 10px;
    font-size: 13px;
    vertical-align: top;
  }
  table.steps th {
    background-color: #f1f5f9;
    width: 28%;
    font-weight: bold;
  }
  .section-box {
    border: 1px solid #cbd5e1;
    padding: 12px;
    margin-bottom: 14px;
    background-color: #f8fafc;
  }
  h3 {
    margin: 0 0 8px;
    font-size: 14px;
    color: #065f46;
  }
  .answer {
    color: #065f46;
    background-color: #ecfdf5;
    padding: 6px 8px;
  }
</style>
</head>
<body>
  <table class="header-table">
    <tr>
      <td>المملكة المغربية · وزارة التربية الوطنية والتعليم الأولي والرياضة</td>
      <td style="text-align:center;">مشروع مؤسسات الريادة · ${lesson.isTarl ? "دعم طارل TaRL" : "التعليم الصريح"}</td>
      <td style="text-align:left;" dir="ltr">${sanitizeHtml(subjectInfo.fr)} · ${lesson.level.toUpperCase()}</td>
    </tr>
  </table>

  <h1>${sanitizeHtml(lesson.title)}</h1>
  ${lesson.titleFr && !isFr ? `<div class="meta" dir="ltr">${sanitizeHtml(lesson.titleFr)}</div>` : ""}
  <div class="meta">
    ${sanitizeHtml(levelLabel)} | ${sanitizeHtml(subjectInfo.ar)} | الوحدة ${lesson.unit} | الأسبوع ${lesson.week} | المدة: ${lesson.durationMinutes || 45} دقيقة
  </div>

  <div class="objective-box">
    <strong>${isFr ? "Objectif d'apprentissage :" : "الهدف التعلمي المصرح به:"}</strong><br/>
    ${sanitizeHtml(lesson.objective)}
  </div>

  <table class="steps">
    <tr>
      <th>${isFr ? "1. Ouverture et Rappel" : "1. التهيئة والربط"}</th>
      <td>${sanitizeHtml(lesson.steps.preparation)}</td>
    </tr>
    <tr>
      <th>${isFr ? "2. Modelage (Je fais)" : "2. النمذجة (أنا أعمل)"}</th>
      <td>${sanitizeHtml(lesson.steps.modeling)}</td>
    </tr>
    <tr>
      <th>${isFr ? "3. Pratique guidée (Nous faisons)" : "3. الممارسة الموجهة (نحن نعمل معاً)"}</th>
      <td>${sanitizeHtml(lesson.steps.guided)}</td>
    </tr>
    <tr>
      <th>${isFr ? "4. Pratique autonome (Tu fais)" : "4. الممارسة المستقلة (أنت تعمل بمفردك)"}</th>
      <td>${sanitizeHtml(lesson.steps.autonomous)}</td>
    </tr>
    <tr>
      <th>${isFr ? "5. Objectivation et Bilan" : "5. التقويم والدعم (TaRL)"}</th>
      <td>${sanitizeHtml(lesson.steps.evaluation)}</td>
    </tr>
  </table>

  ${summaryHtml}
  ${slidesHtml}
  ${exercisesHtml}
</body>
</html>`;

  const blob = new Blob(["\ufeff", htmlDoc], { type: "application/msword;charset=utf-8" });
  const blobUrl = URL.createObjectURL(blob);
  const safeName = (lesson.title || "lesson")
    .replace(/[^\u0600-\u06FFa-zA-Z0-9_-]+/g, "_")
    .slice(0, 60);
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = `${safeName}.doc`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    if (document.body.contains(a)) document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  }, 1500);
}

/**
 * Download an Explicit Teaching / TaRL lesson directly as A4 PDF inside the site.
 */
export async function downloadExplicitLessonAsPdf(
  element: HTMLElement,
  lesson: ExplicitLessonItem,
  onProgress?: (status: string) => void
): Promise<void> {
  const safeName = (lesson.title || "lesson")
    .replace(/[^\u0600-\u06FFa-zA-Z0-9_-]+/g, "_")
    .slice(0, 60);
  await generatePdfFromElement(element, {
    filename: `${safeName}_A4.pdf`,
    orientation: "portrait",
    quality: "ultra",
    colorMode: "color",
    onProgress,
  });
}

/**
 * Compile and download a bundle of Explicit Teaching / TaRL lessons (e.g., an entire level or subject)
 * inside the site as a single Word (.doc) file with zero external links.
 */
export function downloadLessonsBundleAsWord(
  lessons: ExplicitLessonItem[],
  bundleTitle: string
): void {
  if (!lessons || lessons.length === 0) return;

  const blocksHtml = lessons
    .map((lesson, idx) => {
      const isFr = lesson.subject === "french";
      const subjectInfo = SUBJECT_NAMES[lesson.subject] || SUBJECT_NAMES.arabic;
      const levelLabel = LEVEL_NAMES[lesson.level] || lesson.level;

      return `
      <div class="lesson-block" dir="${isFr ? "ltr" : "rtl"}" style="text-align:${isFr ? "left" : "right"}; page-break-after: always;">
        <div class="lesson-kicker">
          ${idx + 1}. ${sanitizeHtml(levelLabel)} · ${sanitizeHtml(subjectInfo.ar)} (${sanitizeHtml(subjectInfo.fr)}) · الوحدة ${lesson.unit} · الأسبوع ${lesson.week} ${lesson.isTarl ? "· دعم طارل TaRL" : ""}
        </div>
        <h2>${sanitizeHtml(lesson.title)}</h2>
        <div class="objective-box">
          <strong>${isFr ? "Objectif d'apprentissage :" : "الهدف التعلمي:"}</strong> ${sanitizeHtml(lesson.objective)}
        </div>
        <table class="steps">
          <tr><th>${isFr ? "1. Ouverture / Rappel" : "1. التهيئة والربط"}</th><td>${sanitizeHtml(lesson.steps.preparation)}</td></tr>
          <tr><th>${isFr ? "2. Modelage (Je fais)" : "2. النمذجة (أنا أعمل)"}</th><td>${sanitizeHtml(lesson.steps.modeling)}</td></tr>
          <tr><th>${isFr ? "3. Pratique guidée (Nous faisons)" : "3. الممارسة الموجهة (نحن نعمل)"}</th><td>${sanitizeHtml(lesson.steps.guided)}</td></tr>
          <tr><th>${isFr ? "4. Pratique autonome (Tu fais)" : "4. الممارسة المستقلة (أنت تعمل)"}</th><td>${sanitizeHtml(lesson.steps.autonomous)}</td></tr>
          <tr><th>${isFr ? "5. Objectivation & Bilan" : "5. التقويم والدعم"}</th><td>${sanitizeHtml(lesson.steps.evaluation)}</td></tr>
        </table>
        ${
          lesson.summaryPoints && lesson.summaryPoints.length > 0
            ? `<div class="section-box"><strong>${isFr ? "Synthèse :" : "ملخص القواعد:"}</strong><ul>${lesson.summaryPoints.map((p) => `<li>${sanitizeHtml(p)}</li>`).join("")}</ul></div>`
            : ""
        }
        ${
          lesson.exercisesWithCorrection && lesson.exercisesWithCorrection.length > 0
            ? `<div class="section-box"><strong>${isFr ? "Applications & Corrigés :" : "تطبيقات وتصحيح:"}</strong>${lesson.exercisesWithCorrection.map((ex) => `<p><strong>Q:</strong> ${sanitizeHtml(ex.question)}<br/><strong>R:</strong> ${sanitizeHtml(ex.answer)}</p>`).join("")}</div>`
            : ""
        }
      </div>`;
    })
    .join("");

  const htmlDoc = `<html xmlns:o="urn:schemas-microsoft-com:office:office"
xmlns:w="urn:schemas-microsoft-com:office:word"
xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8" />
<title>${sanitizeHtml(bundleTitle)}</title>
<style>
  body { font-family: 'Cairo', 'Arial', sans-serif; direction: rtl; color: #0f172a; line-height: 1.6; padding: 20px; }
  h1 { color: #1e3a8a; font-size: 20px; border-bottom: 2px solid #1e3a8a; padding-bottom: 8px; }
  h2 { color: #0f172a; font-size: 16px; margin: 6px 0 10px; }
  .lesson-block { margin-bottom: 24px; padding-bottom: 16px; border-bottom: 2px dashed #cbd5e1; }
  .lesson-kicker { font-size: 11px; color: #4338ca; font-weight: bold; }
  .objective-box { background: #eff6ff; border: 1px solid #bfdbfe; padding: 8px 10px; margin-bottom: 10px; font-size: 12px; }
  table.steps { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
  table.steps th, table.steps td { border: 1px solid #cbd5e1; padding: 6px 8px; font-size: 12px; vertical-align: top; }
  table.steps th { background: #f1f5f9; width: 28%; }
  .section-box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 10px; font-size: 12px; margin-bottom: 8px; }
</style>
</head>
<body>
  <h1>${sanitizeHtml(bundleTitle)} (${lessons.length} دروس)</h1>
  ${blocksHtml}
</body>
</html>`;

  const blob = new Blob(["\ufeff", htmlDoc], { type: "application/msword;charset=utf-8" });
  const blobUrl = URL.createObjectURL(blob);
  const safeName = (bundleTitle || "explicit_bundle")
    .replace(/[^\u0600-\u06FFa-zA-Z0-9_-]+/g, "_")
    .slice(0, 60);
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = `${safeName}.doc`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    if (document.body.contains(a)) document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  }, 1500);
}

