import React, { useState } from "react";
import {
  X,
  Save,
  Eye,
  FileText,
  Megaphone,
  BookOpen,
  Bell,
  Award,
  Calendar,
  User,
  Tag,
  Download,
  AlertCircle,
  Heading,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Sparkles,
  Link as LinkIcon,
  CheckCircle2,
} from "lucide-react";
import { TopicCategory, TopicItem, SeoMetadata } from "../types";
import { RankMathSeoBox } from "./RankMathSeoBox";

interface TopicEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (topic: TopicItem) => void;
  initialTopic?: TopicItem | null;
}

export const TopicEditorModal: React.FC<TopicEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialTopic,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState(initialTopic?.title || "");
  const [category, setCategory] = useState<TopicCategory>(initialTopic?.category || "memo");
  const [date, setDate] = useState(initialTopic?.date || "15 شتنبر 2026");
  const [author, setAuthor] = useState(
    initialTopic?.author || "وزارة التربية الوطنية والتعليم الأولي والرياضة"
  );
  const [urgent, setUrgent] = useState<boolean>(initialTopic?.urgent || false);
  const [summary, setSummary] = useState(initialTopic?.summary || "");
  const [content, setContent] = useState(initialTopic?.content || "");
  const [tagsInput, setTagsInput] = useState(initialTopic?.tags?.join("، ") || "");
  const [downloadLabel, setDownloadLabel] = useState(
    initialTopic?.downloadLabel || "تحميل المذكرة الرسمية بصيغة PDF"
  );
  const [downloadUrl, setDownloadUrl] = useState(initialTopic?.downloadUrl || "#");

  // SEO State
  const [seo, setSeo] = useState<SeoMetadata>(
    initialTopic?.seo || {
      focusKeyword: "",
      seoTitle: initialTopic?.title || "",
      slug: initialTopic?.id || "al-mawdoo-al-tarbawi",
      metaDescription: initialTopic?.summary || "",
    }
  );

  const [activeTab, setActiveTab] = useState<"content" | "seo" | "preview">("content");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Category labels map
  const categoryLabels: Record<TopicCategory, string> = {
    memo: "مذكرة",
    announcement: "إعلان",
    article: "مقال",
    communique: "بلاغ",
    results: "نتائج",
  };

  // Helper to insert markdown in content
  const handleInsertText = (before: string, after: string = "") => {
    setContent((prev) => prev + `\n${before} ${after}\n`);
  };

  // When title changes, sync SEO title and slug if empty
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!seo.seoTitle || seo.seoTitle === title) {
      setSeo((prev) => ({ ...prev, seoTitle: val }));
    }
    if (!seo.slug || seo.slug.startsWith("topic-")) {
      const generatedSlug = val
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\u0621-\u064A\-]/g, "")
        .slice(0, 50);
      setSeo((prev) => ({ ...prev, slug: generatedSlug }));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg("يرجى إدخال عنوان الموضوع.");
      return;
    }
    if (!summary.trim() && !content.trim()) {
      setErrorMsg("يرجى إدخال ملخص أو محتوى للموضوع.");
      return;
    }

    const tags = tagsInput
      .split(/[,،]/)
      .map((t) => t.trim())
      .filter(Boolean);

    const savedTopic: TopicItem = {
      id: initialTopic?.id || `topic-${Date.now()}`,
      title: title.trim(),
      category,
      categoryLabel: categoryLabels[category],
      date: date.trim(),
      gregorianDate: new Date().toISOString().split("T")[0],
      author: author.trim(),
      urgent,
      summary: summary.trim(),
      content: content.trim() || summary.trim(),
      highlights: [
        "معتمد رسمياً في منظومة التربية والتكوين بالمغرب.",
        "متوافق مع مستجدات الدخول المدرسي ومؤسسات الريادة.",
      ],
      tags: tags.length > 0 ? tags : ["المستجدات", "التربية والتكوين"],
      downloadUrl: downloadUrl.trim() || "#",
      downloadLabel: downloadLabel.trim() || "تحميل المرفق الرسمي (PDF)",
      seo: {
        focusKeyword: seo.focusKeyword || title.slice(0, 30),
        seoTitle: seo.seoTitle || title,
        slug:
          seo.slug ||
          title
            .toLowerCase()
            .replace(/\s+/g, "-")
            .slice(0, 40),
        metaDescription: seo.metaDescription || summary.slice(0, 150),
      },
      viewsCount: initialTopic?.viewsCount || 1,
      readTimeMinutes: Math.max(1, Math.ceil((content.length || 100) / 400)),
      isCustom: true,
    };

    onSave(savedTopic);
    onClose();
  };

  return (
    <div className="no-print fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto" dir="rtl">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-950 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-xl shadow-xs">
              ✍️
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black font-cairo text-white flex items-center gap-2">
                <span>{initialTopic ? "تعديل الموضوع / المقال" : "محرر كتابة المواضيع والمقالات الجديد"}</span>
                <span className="text-[11px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full font-bold">
                  متوافق مع سيو Rank Math
                </span>
              </h2>
              <p className="text-xs text-teal-200">
                نشر وتنسيق المذكرات، الإعلانات والمقالات البيداغوجية مع ضبط محركات البحث
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation inside Editor */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 pt-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("content")}
              className={`px-4 py-2 text-xs font-bold rounded-t-xl transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === "content"
                  ? "bg-white text-teal-900 border-t-2 border-teal-600 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>محتوى الموضوع والبيانات</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("seo")}
              className={`px-4 py-2 text-xs font-bold rounded-t-xl transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === "seo"
                  ? "bg-white text-teal-900 border-t-2 border-teal-600 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>إعدادات السيو (Rank Math)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`px-4 py-2 text-xs font-bold rounded-t-xl transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === "preview"
                  ? "bg-white text-teal-900 border-t-2 border-teal-600 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-blue-600" />
              <span>معاينة المقال للقراء</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-500 hidden sm:block">
            طبيعة الموضوع: <strong className="text-teal-900">{categoryLabels[category]}</strong>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {errorMsg && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* TAB 1: CONTENT */}
          {activeTab === "content" && (
            <div className="space-y-4">
              {/* Category & Urgent Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    طبيعة الموضوع (تحدد الأيقونة واللون أمام الموضوع):
                  </label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {(
                      [
                        { key: "memo", label: "مذكرة", icon: FileText, color: "text-teal-700 bg-teal-50 border-teal-300" },
                        { key: "announcement", label: "إعلان", icon: Megaphone, color: "text-amber-700 bg-amber-50 border-amber-300" },
                        { key: "article", label: "مقال", icon: BookOpen, color: "text-blue-700 bg-blue-50 border-blue-300" },
                        { key: "communique", label: "بلاغ", icon: Bell, color: "text-purple-700 bg-purple-50 border-purple-300" },
                        { key: "results", label: "نتائج", icon: Award, color: "text-rose-700 bg-rose-50 border-rose-300" },
                      ] as const
                    ).map((cat) => {
                      const CatIcon = cat.icon;
                      const isSelected = category === cat.key;
                      return (
                        <button
                          key={cat.key}
                          type="button"
                          onClick={() => setCategory(cat.key)}
                          className={`p-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1 border transition cursor-pointer ${
                            isSelected ? `${cat.color} ring-2 ring-teal-500 shadow-2xs` : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          <CatIcon className="w-4 h-4" />
                          <span className="text-[11px]">{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">حالة الموضوع:</label>
                    <label className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100">
                      <input
                        type="checkbox"
                        checked={urgent}
                        onChange={(e) => setUrgent(e.target.checked)}
                        className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                      />
                      <span className="text-xs font-bold text-slate-800">
                        تعليم كموضوع عاجل (يظهر شريط مميز وتنبيه بالأولوية)
                      </span>
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        تاريخ الصدور:
                      </label>
                      <input
                        type="text"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="15 شتنبر 2026"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        الجهة / المصدر:
                      </label>
                      <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="وزارة التربية الوطنية"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-medium"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-800">
                    عنوان الموضوع أو المقال الرئيسي: <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">{title.length} حرفاً</span>
                </div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="مثال: تنظيم الحركات الانتقالية الجهوية والإقليمية لسنة 2026..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm font-bold text-slate-900 outline-hidden focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Summary / Excerpt */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  الموجز / المقتطف (يظهر في المعاينات وشبكات التواصل):
                </label>
                <textarea
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="اكتب موجزاً بيداغوجياً للموضوع يلخص الفكرة في سطرين..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 outline-hidden focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Rich Content Editor */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800">
                    نص الموضوع والمحتوى التفصيلي:
                  </label>
                  <div className="text-[11px] text-slate-500">
                    {content.split(/\s+/).filter(Boolean).length} كلمة
                  </div>
                </div>

                {/* Formatting Toolbar */}
                <div className="bg-slate-100 border border-slate-300 rounded-t-xl p-1.5 flex flex-wrap items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleInsertText("### عنوان فرعي")}
                    className="px-2 py-1 bg-white hover:bg-slate-200 border border-slate-200 rounded text-xs font-bold cursor-pointer"
                    title="عنوان فرعي H3"
                  >
                    H3
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertText("## عنوان رئيسي")}
                    className="px-2 py-1 bg-white hover:bg-slate-200 border border-slate-200 rounded text-xs font-bold cursor-pointer"
                    title="عنوان رئيسي H2"
                  >
                    H2
                  </button>
                  <div className="w-px h-4 bg-slate-300 mx-1" />
                  <button
                    type="button"
                    onClick={() => handleInsertText("**نص عريض**")}
                    className="p-1 bg-white hover:bg-slate-200 border border-slate-200 rounded text-xs font-bold cursor-pointer"
                    title="نص عريض"
                  >
                    <Bold className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertText("*نص مائل*")}
                    className="p-1 bg-white hover:bg-slate-200 border border-slate-200 rounded text-xs font-bold cursor-pointer"
                    title="نص مائل"
                  >
                    <Italic className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertText("- عنصر قائمة")}
                    className="p-1 bg-white hover:bg-slate-200 border border-slate-200 rounded text-xs font-bold cursor-pointer"
                    title="قائمة نقطية"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertText("1. خطوة أولى")}
                    className="p-1 bg-white hover:bg-slate-200 border border-slate-200 rounded text-xs font-bold cursor-pointer"
                    title="قائمة مرقمة"
                  >
                    <ListOrdered className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertText("> اقتباس أو توجيه وزاري رسمي")}
                    className="p-1 bg-white hover:bg-slate-200 border border-slate-200 rounded text-xs font-bold cursor-pointer"
                    title="اقتباس"
                  >
                    <Quote className="w-3.5 h-3.5" />
                  </button>
                  <div className="w-px h-4 bg-slate-300 mx-1" />
                  <button
                    type="button"
                    onClick={() =>
                      handleInsertText(
                        "[رابط موقع الوزارة الرسمي](https://www.men.gov.ma)"
                      )
                    }
                    className="p-1 bg-white hover:bg-slate-200 border border-slate-200 rounded text-xs font-bold cursor-pointer flex items-center gap-1 text-blue-700"
                    title="إدراج رابط"
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span className="text-[10px]">رابط</span>
                  </button>
                </div>

                <textarea
                  rows={9}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="حرر نص المذكرة أو المقال هنا بالتفصيل، مستعيناً بالعناوين الفرعية والنقاط المرقمة..."
                  className="w-full bg-white border border-slate-300 border-t-0 rounded-b-xl p-3 text-xs leading-relaxed font-sans outline-hidden focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Downloads & Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                    <Download className="w-3.5 h-3.5 text-emerald-600" />
                    <span>عنوان ملف التحميل المرفق (PDF):</span>
                  </label>
                  <input
                    type="text"
                    value={downloadLabel}
                    onChange={(e) => setDownloadLabel(e.target.value)}
                    placeholder="تحميل المذكرة الرسمية بصيغة PDF"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-blue-600" />
                    <span>الكلمات الدلالية (Tags - مفصولة بفاصلة):</span>
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="الحركة الانتقالية، مذكرات، الابتدائي، الريادة"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: RANK MATH SEO BOX */}
          {activeTab === "seo" && (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  يساعدك محرك <strong>Rank Math SEO</strong> المدمج على كتابة موضوع يتصدر نتائج بحث
                  Google ويحقق أعلى نسبة قراءة ونقر لدى أطر التربية والتكوين.
                </p>
              </div>

              <RankMathSeoBox
                seo={seo}
                content={content || summary}
                topicTitle={title}
                onChangeSeo={setSeo}
              />
            </div>
          )}

          {/* TAB 3: LIVE PREVIEW */}
          {activeTab === "preview" && (
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    category === "memo"
                      ? "bg-teal-100 text-teal-900"
                      : category === "announcement"
                      ? "bg-amber-100 text-amber-900"
                      : category === "article"
                      ? "bg-blue-100 text-blue-900"
                      : "bg-purple-100 text-purple-900"
                  }`}
                >
                  {categoryLabels[category]}
                </span>
                <span className="text-xs text-slate-500 font-mono">📅 {date}</span>
                <span className="text-xs text-slate-400">• {author}</span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-cairo">
                {title || "عنوان الموضوع يظهر هنا..."}
              </h1>

              {summary && (
                <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-medium">
                  {summary}
                </div>
              )}

              <div className="prose prose-sm max-w-none text-slate-800 text-xs leading-relaxed space-y-2 whitespace-pre-wrap">
                {content || "نص المقال الكامل سيظهر هنا عند كتابته..."}
              </div>

              {downloadLabel && (
                <div className="pt-3 border-t border-slate-200">
                  <button
                    type="button"
                    className="bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-2 shadow-xs"
                  >
                    <Download className="w-4 h-4" />
                    <span>{downloadLabel}</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">حالة السيو:</span>
            <span className="font-bold text-teal-800">
              {seo.focusKeyword ? `مفتاح: ${seo.focusKeyword}` : "لم يتم تحديد كلمة مفتاحية"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs cursor-pointer transition"
            >
              إلغاء
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer transition"
            >
              <Save className="w-4 h-4" />
              <span>حفظ ونشر الموضوع في المنصة</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
