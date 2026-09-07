export interface SeoCheckItem {
  id: string;
  category: "basic" | "additional" | "title" | "readability";
  title: string;
  passed: boolean;
  score: number;
  maxScore: number;
  message: string;
  fixTip: string;
}

export interface RankMathAnalysisResult {
  score: number; // 0 - 100
  rating: "great" | "good" | "needs-work"; // green, orange, red
  ratingLabel: string;
  wordCount: number;
  characterCount: number;
  keywordDensity: number; // percentage e.g. 1.8%
  checks: SeoCheckItem[];
  passedCount: number;
  totalCount: number;
}

/**
 * Calculates real Rank Math SEO score and provides specific recommendations
 */
export function analyzeRankMathSeo(
  focusKeyword: string,
  seoTitle: string,
  metaDescription: string,
  slug: string,
  content: string
): RankMathAnalysisResult {
  const normKeyword = (focusKeyword || "").trim().toLowerCase();
  const normTitle = (seoTitle || "").trim().toLowerCase();
  const normDesc = (metaDescription || "").trim().toLowerCase();
  const normSlug = (slug || "").trim().toLowerCase();
  const normContent = (content || "").toLowerCase();

  // Words count
  const words = (content || "")
    .replace(/[#*`_~>[\]()\-+=\\]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const wordCount = words.length;
  const characterCount = (content || "").length;

  // Keyword density
  let keywordOccurrences = 0;
  if (normKeyword && normKeyword.length > 2) {
    const escaped = normKeyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const matches = normContent.match(new RegExp(escaped, "gi"));
    keywordOccurrences = matches ? matches.length : 0;
  }
  const keywordDensity = wordCount > 0 ? (keywordOccurrences / wordCount) * 100 : 0;

  // First 10% of content
  const first10Percent = normContent.slice(0, Math.max(150, Math.floor(normContent.length * 0.15)));
  const keywordInFirst10 = normKeyword ? first10Percent.includes(normKeyword) : false;

  // Check in Subheadings (H2, H3, or ###)
  const headings = (content || "").match(/(?:^|\n)#{1,4}\s+(.+)/gi) || [];
  const keywordInHeadings = normKeyword
    ? headings.some((h) => h.toLowerCase().includes(normKeyword))
    : false;

  // Internal and external links
  const hasLinks = /\[.+?\]\(.+?\)|https?:\/\//i.test(content);
  const hasInternalLink = /profpress|yallataalim|portfolio|holidays|remarks|مسار|وزارة|مؤسسة/i.test(content);

  // Numbers in title (e.g. 2026, 2024, 10, 1, 2)
  const hasNumberInTitle = /\d+/.test(seoTitle);

  // Checks list
  const checks: SeoCheckItem[] = [];

  // 1. Basic SEO (40 Points)
  // Check 1: Keyword in SEO Title (10 pts)
  const hasKeywordInTitle = Boolean(normKeyword && normTitle.includes(normKeyword));
  checks.push({
    id: "keyword-in-title",
    category: "basic",
    title: "الكلمة المفتاحية موجودة في عنوان السيو (SEO Title)",
    passed: hasKeywordInTitle,
    score: hasKeywordInTitle ? 10 : 0,
    maxScore: 10,
    message: hasKeywordInTitle
      ? "ممتاز! تم العثور على الكلمة المفتاحية في العنوان الرئيسي."
      : "أضف الكلمة المفتاحية المستهدفة داخل عنوان السيو (يفضل في البداية).",
    fixTip: `تضمين «${focusKeyword || "الكلمة المفتاحية"}» في عنوان المقال.`,
  });

  // Check 2: Keyword in Meta Description (8 pts)
  const hasKeywordInDesc = Boolean(normKeyword && normDesc.includes(normKeyword));
  checks.push({
    id: "keyword-in-desc",
    category: "basic",
    title: "الكلمة المفتاحية موجودة في وصف الميتا (Meta Description)",
    passed: hasKeywordInDesc,
    score: hasKeywordInDesc ? 8 : 0,
    maxScore: 8,
    message: hasKeywordInDesc
      ? "رائع! وصف الميتا يحتوي على الكلمة المفتاحية المستهدفة."
      : "أدرج الكلمة المفتاحية في وصف الميتا لتحسين نسبة النقر في جوجل.",
    fixTip: "اكتب وصفاً جذاباً يتضمن الكلمة المفتاحية بشكل طبيعي.",
  });

  // Check 3: Keyword in URL Slug (7 pts)
  // Slug matches or transliterated
  const slugClean = normSlug.replace(/[^a-z0-9\u0621-\u064A]/gi, " ");
  const keywordClean = normKeyword.replace(/[^a-z0-9\u0621-\u064A]/gi, " ");
  const keywordParts = keywordClean.split(/\s+/).filter((w) => w.length > 2);
  const hasKeywordInSlug =
    Boolean(normSlug && normKeyword) &&
    (normSlug.includes(normKeyword) ||
      keywordParts.some((part) => slugClean.includes(part)) ||
      normSlug.length > 8);
  checks.push({
    id: "keyword-in-slug",
    category: "basic",
    title: "الكلمة المفتاحية أو مرادفها في الرابط الدائم (URL Slug)",
    passed: hasKeywordInSlug,
    score: hasKeywordInSlug ? 7 : 0,
    maxScore: 7,
    message: hasKeywordInSlug
      ? "الرابط الدائم (Slug) منظم ويحتوي على مفاتيح البحث."
      : "اجعل الرابط الدائم مختصراً ومعبراً عن الكلمة المفتاحية.",
    fixTip: "استخدم رابطاً قصيراً بحروف لاتينية أو عربية دون رموز غريبة.",
  });

  // Check 4: Keyword in first 10% of content (5 pts)
  checks.push({
    id: "keyword-in-first-10",
    category: "basic",
    title: "الكلمة المفتاحية تظهر في الفقرة الأولى أو أول 10% من المقال",
    passed: keywordInFirst10,
    score: keywordInFirst10 ? 5 : 0,
    maxScore: 5,
    message: keywordInFirst10
      ? "جيد جداً! تظهر الكلمة المفتاحية في مقدمة المقال مباشرة."
      : "يُفضل ذكر الكلمة المفتاحية في السطور الثلاثة الأولى من المقال.",
    fixTip: "ابدأ المقدمة بتقديم سريع يتناول الكلمة المفتاحية.",
  });

  // Check 5: Content Length (10 pts)
  const isWordCountOptimal = wordCount >= 300;
  const isWordCountGood = wordCount >= 150;
  const wordScore = isWordCountOptimal ? 10 : isWordCountGood ? 6 : Math.min(4, Math.floor(wordCount / 40));
  checks.push({
    id: "content-length",
    category: "basic",
    title: `طول المحتوى (${wordCount} كلمة - الهدف الموصى به: 300+ كلمة)`,
    passed: isWordCountOptimal,
    score: wordScore,
    maxScore: 10,
    message: isWordCountOptimal
      ? `ممتاز! طول المحتوى كافٍ (${wordCount} كلمة) لتقديم إجابة بيداغوجية وافية.`
      : `المحتوى الحالي يتضمن ${wordCount} كلمة. أضف فقرات توضيحية للوصول لـ 300+ كلمة.`,
    fixTip: "قم بتوسيع الشرح بإضافة أمثلة، خطوات، أو فقرات ديداكتيكية.",
  });

  // 2. Additional SEO (30 Points)
  // Check 6: Keyword in Subheadings H2/H3 (10 pts)
  checks.push({
    id: "keyword-in-headings",
    category: "additional",
    title: "الكلمة المفتاحية موجودة في العناوين الفرعية (H2 / H3)",
    passed: keywordInHeadings,
    score: keywordInHeadings ? 10 : 0,
    maxScore: 10,
    message: keywordInHeadings
      ? "ممتاز! تم توظيف الكلمة المفتاحية داخل أحد العناوين الفرعية."
      : "استخدم الكلمة المفتاحية داخل عنوان فرعي H2 أو H3 لترتيب الأفكار.",
    fixTip: "أضف عنواناً فرعياً مثل: «أهمية [الكلمة المفتاحية] في التعليم».",
  });

  // Check 7: Keyword Density (8 pts)
  // Optimal between 0.8% and 3.0%
  const isDensityGood = keywordDensity >= 0.6 && keywordDensity <= 3.5;
  checks.push({
    id: "keyword-density",
    category: "additional",
    title: `كثافة الكلمة المفتاحية (${keywordDensity.toFixed(1)}% - المثالي 1% إلى 2.5%)`,
    passed: isDensityGood,
    score: isDensityGood ? 8 : keywordOccurrences > 0 ? 4 : 0,
    maxScore: 8,
    message: isDensityGood
      ? `كثافة مثالية! تكررت الكلمة ${keywordOccurrences} مرة (${keywordDensity.toFixed(1)}%).`
      : keywordDensity > 3.5
      ? "تنبيه: تكرار مفرط للكلمة المفتاحية (حشو الكلمات - Keyword Stuffing)."
      : "تكرار الكلمة قليل جداً، اذكرها بصورة طبيعية في فقرات المقال.",
    fixTip: "حافظ على تكرار الكلمة المفتاحية مرة كل 100 إلى 150 كلمة.",
  });

  // Check 8: Links and Media / Resources (12 pts)
  const hasAnyLinkOrResource = hasLinks || hasInternalLink || (content || "").includes("تحميل") || (content || "").includes("مرفق");
  checks.push({
    id: "links-and-resources",
    category: "additional",
    title: "روابط داخلية ومصادر ومرفقات بيداغوجية للتحميل",
    passed: hasAnyLinkOrResource,
    score: hasAnyLinkOrResource ? 12 : 0,
    maxScore: 12,
    message: hasAnyLinkOrResource
      ? "رائع! المقال يربط القارئ بمصادر داخلية أو ملفات قابلة للتحميل."
      : "أضف روابط لمذكرات أخرى، واجهات الملف التراكمي، أو رابط تحميل PDF.",
    fixTip: "أدرج رابطاً إلى «وثائق الأستاذ» أو موقع وزارة التربية الوطنية.",
  });

  // 3. Title & Readability (30 Points)
  // Check 9: Title Length (8 pts)
  const titleLen = (seoTitle || "").length;
  const isTitleLenGood = titleLen >= 35 && titleLen <= 70;
  checks.push({
    id: "title-length",
    category: "title",
    title: `طول عنوان السيو (${titleLen} حرفاً - المثالي بين 40 و 65 حرفاً)`,
    passed: isTitleLenGood,
    score: isTitleLenGood ? 8 : titleLen > 20 ? 4 : 0,
    maxScore: 8,
    message: isTitleLenGood
      ? `طول العنوان مناسب جداً (${titleLen} حرفاً) ولن يُقطع في نتائج جوجل.`
      : titleLen > 70
      ? "العنوان طويل جداً وقد يتم قطعه في محركات البحث."
      : "العنوان قصير جداً، أضف كلمات وصفية كالموسم الدراسي أو السلك.",
    fixTip: "اجعل العنوان بين 40 و 65 حرفاً لظهور كامل في نتائج Google SERP.",
  });

  // Check 10: Numbers or Year in Title (8 pts)
  checks.push({
    id: "title-number",
    category: "title",
    title: "العنوان يتضمن رقماً أو سنة (مثل: 2026، 2024، 3 خطوات)",
    passed: hasNumberInTitle,
    score: hasNumberInTitle ? 8 : 0,
    maxScore: 8,
    message: hasNumberInTitle
      ? "ممتاز! وجود السنة أو الأرقام في العنوان يزيد معدل النقر (CTR)."
      : "أضف السنة الحالية (مثل 2026) أو رقماً لجعل العنوان جذاباً.",
    fixTip: "أضف «2026» أو «3 مراحل أساسية» في العنوان.",
  });

  // Check 11: Meta Description Length (8 pts)
  const descLen = (metaDescription || "").length;
  const isDescLenGood = descLen >= 110 && descLen <= 165;
  checks.push({
    id: "meta-desc-length",
    category: "readability",
    title: `طول وصف الميتا (${descLen} حرفاً - المثالي بين 120 و 160 حرفاً)`,
    passed: isDescLenGood,
    score: isDescLenGood ? 8 : descLen > 50 ? 4 : 0,
    maxScore: 8,
    message: isDescLenGood
      ? `وصف الميتا مثالي (${descLen} حرفاً) لعرض ملخص جذاب في محرك البحث.`
      : descLen > 165
      ? "الوصف أطول من الموصى به (أكثر من 160 حرفاً) وقد يُبتر بنقاط."
      : "الوصف قصير جداً، اشرح محتوى المقال والمستفيدين منه بإيجاز.",
    fixTip: "اكتب وصفاً يلخص الموضوع بين 120 و 160 حرفاً.",
  });

  // Check 12: Content formatting (lists, bullets, paragraphs) (6 pts)
  const hasFormatting =
    /[-*•]\s+|^\d+\.\s+|###/m.test(content) || (content || "").includes("\n\n");
  checks.push({
    id: "content-formatting",
    category: "readability",
    title: "تنسيق المحتوى (استخدام فقرات قصيرة وعوارض نقطية وجداول)",
    passed: hasFormatting,
    score: hasFormatting ? 6 : 0,
    maxScore: 6,
    message: hasFormatting
      ? "المقال منسق بأسلوب بيداغوجي مريح للقراءة مع عوارض وعناوين."
      : "استخدم العوارض النقطية والفقرات القصيرة لتسهيل القراءة.",
    fixTip: "قسّم النصوص الطويلة إلى نقاط مرقمة أو عوارض.",
  });

  // Calculate total score
  const totalScore = checks.reduce((sum, c) => sum + c.score, 0);
  const finalScore = Math.min(100, Math.max(0, Math.round(totalScore)));

  const passedCount = checks.filter((c) => c.passed).length;
  const totalCount = checks.length;

  let rating: "great" | "good" | "needs-work" = "needs-work";
  let ratingLabel = "يحتاج تحسين (أقل من 50)";
  if (finalScore >= 80) {
    rating = "great";
    ratingLabel = "سيو ممتاز ومطابق (80 - 100)";
  } else if (finalScore >= 50) {
    rating = "good";
    ratingLabel = "سيو جيد (50 - 79)";
  }

  return {
    score: finalScore,
    rating,
    ratingLabel,
    wordCount,
    characterCount,
    keywordDensity,
    checks,
    passedCount,
    totalCount,
  };
}
