import React, { useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Globe,
  Smartphone,
  Monitor,
  Share2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Search,
  Hash,
  Eye,
} from "lucide-react";
import { SeoMetadata } from "../types";
import { analyzeRankMathSeo } from "../utils/rankMathSeo";

interface RankMathSeoBoxProps {
  seo: SeoMetadata;
  content: string;
  topicTitle: string;
  onChangeSeo: (updated: SeoMetadata) => void;
  siteName?: string;
  baseUrl?: string;
}

export const RankMathSeoBox: React.FC<RankMathSeoBoxProps> = ({
  seo,
  content,
  topicTitle,
  onChangeSeo,
  siteName = "يلا تعليم • بروف بريس",
  baseUrl = "https://yallataalim.com/announcements",
}) => {
  const [activeDevice, setActiveDevice] = useState<"desktop" | "mobile">("mobile");
  const [activeTab, setActiveTab] = useState<"general" | "checklist" | "social">("general");
  const [openCategory, setOpenCategory] = useState<string>("all");

  const effectiveTitle = seo.seoTitle || topicTitle || "عنوان الموضوع في محرك البحث";
  const effectiveSlug = seo.slug || "al-mawdoo-al-tarbawi";
  const effectiveDesc =
    seo.metaDescription ||
    "مستجدات ووثائق وزارة التربية الوطنية والتعليم الأولي والرياضة بالمغرب، مذكرات رسمية ومقالات بيداغوجية لمؤسسات الريادة.";

  const analysis = analyzeRankMathSeo(
    seo.focusKeyword,
    effectiveTitle,
    effectiveDesc,
    effectiveSlug,
    content
  );

  // Score color logic
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-700 bg-emerald-50 border-emerald-300";
    if (score >= 50) return "text-amber-700 bg-amber-50 border-amber-300";
    return "text-rose-700 bg-rose-50 border-rose-300";
  };

  const getScoreBadgeBg = (score: number) => {
    if (score >= 80) return "bg-emerald-600 text-white";
    if (score >= 50) return "bg-amber-500 text-white";
    return "bg-rose-600 text-white";
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden" dir="rtl">
      {/* Header with Rank Math Branding */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-black text-white text-xs shadow-xs">
            RM
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-white flex items-center gap-1.5 font-cairo">
                <span>مساعد السيو والأرشفة</span>
                <span className="text-amber-400 font-mono text-xs font-black">Rank Math SEO</span>
              </h3>
              <span className="text-[10px] bg-red-500/30 text-red-200 border border-red-400/30 px-2 py-0.2 rounded-full font-bold">
                محرك جوجل 2026
              </span>
            </div>
            <p className="text-[11px] text-slate-300">
              تحليل الكلمات المفتاحية، عناوين الميتا، وتوافق المقال مع خوارزميات محركات البحث
            </p>
          </div>
        </div>

        {/* Score Badge */}
        <div className="flex items-center gap-2">
          <div
            className={`px-3 py-1.5 rounded-xl font-mono font-black text-sm border flex items-center gap-1.5 shadow-2xs ${getScoreColor(
              analysis.score
            )}`}
          >
            <span>النتيجة:</span>
            <span className="text-base font-black">{analysis.score} / 100</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 pt-2 flex items-center gap-2 text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveTab("general")}
          className={`px-4 py-2 border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === "general"
              ? "border-blue-700 text-blue-900 bg-white rounded-t-lg"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>المعاينة في جوجل وعناوين الميتا</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("checklist")}
          className={`px-4 py-2 border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === "checklist"
              ? "border-blue-700 text-blue-900 bg-white rounded-t-lg"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>
            قائمة فحص معايير السيو ({analysis.passedCount}/{analysis.totalCount})
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("social")}
          className={`px-4 py-2 border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === "social"
              ? "border-blue-700 text-blue-900 bg-white rounded-t-lg"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <Share2 className="w-3.5 h-3.5 text-blue-600" />
          <span>مشاركة واتساب وفيسبوك</span>
        </button>
      </div>

      {/* Content Body */}
      <div className="p-4 space-y-4">
        {/* ================================================================= */}
        {/* TAB 1: GENERAL & SERP PREVIEW */}
        {/* ================================================================= */}
        {activeTab === "general" && (
          <div className="space-y-4">
            {/* Focus Keyword Input */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-blue-700" />
                  <span>الكلمة المفتاحية المستهدفة (Focus Keyword):</span>
                </label>
                <span className="text-[11px] text-slate-500">
                  الكثافة: {analysis.keywordDensity.toFixed(1)}% ({analysis.wordCount} كلمة)
                </span>
              </div>
              <input
                type="text"
                value={seo.focusKeyword}
                onChange={(e) => onChangeSeo({ ...seo, focusKeyword: e.target.value })}
                placeholder="مثال: الحركات الانتقالية 2026 أو التعليم الصريح..."
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-bold text-slate-900 outline-hidden focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-[11px] text-slate-500">
                اختر الكلمة أو العبارة التي يبحث عنها الأساتذة في جوجل للوصول إلى هذا الموضوع.
              </p>
            </div>

            {/* Google SERP Snippet Preview Box */}
            <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-700" />
                  <span className="text-xs font-bold text-slate-900">معاينة نتيجة البحث في Google SERP</span>
                </div>
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setActiveDevice("mobile")}
                    className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1 transition cursor-pointer ${
                      activeDevice === "mobile" ? "bg-white shadow-2xs text-blue-900" : "text-slate-500"
                    }`}
                  >
                    <Smartphone className="w-3 h-3" />
                    <span>الهاتف</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveDevice("desktop")}
                    className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1 transition cursor-pointer ${
                      activeDevice === "desktop" ? "bg-white shadow-2xs text-blue-900" : "text-slate-500"
                    }`}
                  >
                    <Monitor className="w-3 h-3" />
                    <span>الحاسوب</span>
                  </button>
                </div>
              </div>

              {/* SERP Card rendering */}
              <div
                className={`p-3.5 rounded-xl border border-slate-200 font-sans transition-all text-right ${
                  activeDevice === "mobile" ? "max-w-md bg-[#ffffff] shadow-xs" : "w-full bg-[#ffffff]"
                }`}
                dir="rtl"
              >
                {/* Site Favicon & Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-slate-700 mb-1">
                  <div className="w-4 h-4 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[9px] font-bold">
                    Y
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[11px] text-slate-600">
                    <span className="font-bold text-slate-900">{siteName}</span>
                    <span className="text-slate-400">›</span>
                    <span className="text-slate-500">announcements</span>
                    <span className="text-slate-400">›</span>
                    <span className="text-slate-700 truncate max-w-[140px]">{effectiveSlug}</span>
                  </div>
                </div>

                {/* SERP Title */}
                <h4 className="text-blue-800 hover:underline font-cairo font-bold text-sm sm:text-base leading-snug cursor-pointer my-1">
                  {effectiveTitle}
                </h4>

                {/* SERP Description */}
                <p className="text-xs text-slate-600 leading-relaxed font-sans line-clamp-2">
                  {effectiveDesc}
                </p>
              </div>
            </div>

            {/* Editable Meta Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1. SEO Title */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">عنوان السيو (SEO Title):</label>
                  <span
                    className={`text-[10px] font-mono font-bold ${
                      effectiveTitle.length >= 40 && effectiveTitle.length <= 65
                        ? "text-emerald-700"
                        : "text-amber-700"
                    }`}
                  >
                    {effectiveTitle.length} / 60 حرفاً
                  </span>
                </div>
                <input
                  type="text"
                  value={seo.seoTitle}
                  onChange={(e) => onChangeSeo({ ...seo, seoTitle: e.target.value })}
                  placeholder={topicTitle || "اكتب عنوان السيو الجذاب..."}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 font-bold outline-hidden focus:ring-2 focus:ring-blue-500"
                />
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      effectiveTitle.length >= 40 && effectiveTitle.length <= 65
                        ? "bg-emerald-500"
                        : effectiveTitle.length > 65
                        ? "bg-rose-500"
                        : "bg-amber-500"
                    }`}
                    style={{ width: `${Math.min(100, (effectiveTitle.length / 65) * 100)}%` }}
                  />
                </div>
              </div>

              {/* 2. Permalink / Slug */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">الرابط الدائم (URL Slug):</label>
                  <span className="text-[10px] text-slate-400 font-mono">حروف صغيرة وشرطات</span>
                </div>
                <input
                  type="text"
                  value={seo.slug}
                  onChange={(e) =>
                    onChangeSeo({
                      ...seo,
                      slug: e.target.value
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/[^\w\u0621-\u064A\-]/g, ""),
                    })
                  }
                  placeholder="tanzim-al-harakat-2026"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 font-mono text-left outline-hidden focus:ring-2 focus:ring-blue-500"
                  dir="ltr"
                />
              </div>
            </div>

            {/* 3. Meta Description */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">وصف الميتا (Meta Description):</label>
                <span
                  className={`text-[10px] font-mono font-bold ${
                    effectiveDesc.length >= 120 && effectiveDesc.length <= 160
                      ? "text-emerald-700"
                      : "text-amber-700"
                  }`}
                >
                  {effectiveDesc.length} / 160 حرفاً
                </span>
              </div>
              <textarea
                rows={2}
                value={seo.metaDescription}
                onChange={(e) => onChangeSeo({ ...seo, metaDescription: e.target.value })}
                placeholder="اكتب وصفاً مختصراً ودقيقاً يلخص أهم محاور الموضوع ويجذب القارئ للنقر..."
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 outline-hidden focus:ring-2 focus:ring-blue-500"
              />
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    effectiveDesc.length >= 120 && effectiveDesc.length <= 160
                      ? "bg-emerald-500"
                      : effectiveDesc.length > 160
                      ? "bg-rose-500"
                      : "bg-amber-500"
                  }`}
                  style={{ width: `${Math.min(100, (effectiveDesc.length / 160) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 2: RANK MATH CHECKLIST */}
        {/* ================================================================= */}
        {activeTab === "checklist" && (
          <div className="space-y-3">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-700" />
                <span className="font-bold text-blue-900 font-cairo">
                  تقييم رانك ماث الإجمالي: {analysis.score} / 100 ({analysis.ratingLabel})
                </span>
              </div>
              <span className="text-[11px] text-slate-600">
                تجاوز {analysis.passedCount} من أصل {analysis.totalCount} معيار
              </span>
            </div>

            <div className="space-y-2">
              {analysis.checks.map((chk) => (
                <div
                  key={chk.id}
                  className={`p-3 rounded-xl border text-xs transition flex items-start justify-between gap-3 ${
                    chk.passed
                      ? "bg-emerald-50/50 border-emerald-200 text-emerald-950"
                      : "bg-rose-50/40 border-rose-200 text-slate-800"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {chk.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{chk.title}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                            chk.passed ? "bg-emerald-200 text-emerald-900" : "bg-rose-200 text-rose-900"
                          }`}
                        >
                          {chk.score}/{chk.maxScore} نقطة
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600">{chk.message}</p>
                      {!chk.passed && (
                        <div className="text-[10px] bg-white border border-rose-200 rounded px-2 py-1 text-rose-900 inline-block mt-1 font-medium">
                          💡 نصيحة للحل: {chk.fixTip}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 3: SOCIAL / WHATSAPP & FACEBOOK SHARE PREVIEW */}
        {/* ================================================================= */}
        {activeTab === "social" && (
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              معاينة مظهر الرابط عند مشاركته في مجموعات واتساب التعليمية وصفحات فيسبوك المدرسية:
            </p>

            {/* WhatsApp Card Preview */}
            <div className="max-w-md bg-[#e5ddd5] p-3 rounded-2xl border border-slate-300 shadow-xs space-y-2 font-sans">
              <div className="text-[10px] text-slate-500 font-bold">معاينة بطاقة واتساب (WhatsApp Preview):</div>
              <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-2xs">
                <div className="h-36 bg-gradient-to-r from-emerald-800 to-teal-900 flex flex-col items-center justify-center p-4 text-center text-white relative">
                  <span className="text-2xl mb-1">📢</span>
                  <span className="font-black text-sm font-cairo line-clamp-2 px-2">
                    {effectiveTitle}
                  </span>
                  <span className="text-[10px] text-emerald-200 mt-1 font-mono">
                    YallaTaalim.com • Profpress
                  </span>
                </div>
                <div className="p-3 space-y-1">
                  <span className="text-[11px] text-slate-400 font-mono block">yallataalim.com</span>
                  <h5 className="font-bold text-xs text-slate-900 line-clamp-1 font-cairo">
                    {effectiveTitle}
                  </h5>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {effectiveDesc}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-600">
              <span className="font-bold block text-slate-800 mb-1">وسوم OpenGraph المولدة تلقائياً:</span>
              <code className="text-[10px] font-mono text-slate-700 block whitespace-pre-wrap dir-ltr text-left bg-white p-2 rounded border border-slate-200">
                {`<meta property="og:title" content="${effectiveTitle}" />\n<meta property="og:description" content="${effectiveDesc}" />\n<meta property="og:url" content="${baseUrl}/${effectiveSlug}" />\n<meta property="og:site_name" content="${siteName}" />`}
              </code>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
