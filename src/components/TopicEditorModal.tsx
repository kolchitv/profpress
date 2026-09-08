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
  Plus,
  Trash2,
  ExternalLink,
  HardDrive,
  FileSpreadsheet,
  Presentation,
  Archive,
  ShieldCheck,
  Zap,
} from "lucide-react";
import {
  TopicCategory,
  TopicItem,
  SeoMetadata,
  DownloadLinkItem,
  FileTypeOption,
} from "../types";
import { RankMathSeoBox } from "./RankMathSeoBox";
import { DownloadGatewayModal } from "./DownloadGatewayModal";

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
  
  // Primary Download state
  const [downloadLabel, setDownloadLabel] = useState(
    initialTopic?.downloadLabel || "تحميل المذكرة الرسمية بصيغة PDF"
  );
  const [downloadUrl, setDownloadUrl] = useState(
    initialTopic?.downloadUrl && initialTopic.downloadUrl !== "#"
      ? initialTopic.downloadUrl
      : ""
  );
  const [fileType, setFileType] = useState<FileTypeOption>("pdf");
  const [fileSize, setFileSize] = useState<string>("3.5 MB");

  // Additional multi-file downloads
  const [downloads, setDownloads] = useState<DownloadLinkItem[]>(() => {
    if (initialTopic?.downloads && initialTopic.downloads.length > 0) {
      return initialTopic.downloads;
    }
    return [];
  });

  // State for testing the Download Gateway Modal from inside editor
  const [previewGatewayFile, setPreviewGatewayFile] = useState<{
    isOpen: boolean;
    title: string;
    url: string;
    type: FileTypeOption | string;
    size?: string;
  }>({
    isOpen: false,
    title: "",
    url: "",
    type: "pdf",
  });

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
      downloads: downloads.filter((d) => d.label.trim() && d.url.trim()),
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

  const handleAddExtraDownload = () => {
    const newItem: DownloadLinkItem = {
      id: `dl-${Date.now()}`,
      label: `مرفق إضافي #${downloads.length + 1} (PDF)`,
      url: "",
      fileType: "pdf",
      fileSize: "2.5 MB",
    };
    setDownloads([...downloads, newItem]);
  };

  const handleUpdateExtraDownload = (id: string, updates: Partial<DownloadLinkItem>) => {
    setDownloads(downloads.map((d) => (d.id === id ? { ...d, ...updates } : d)));
  };

  const handleRemoveExtraDownload = (id: string) => {
    setDownloads(downloads.filter((d) => d.id !== id));
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

              {/* DOWNLOAD LINKS & ATTACHMENTS SECTION */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                      <Download className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-slate-800 font-cairo flex items-center gap-1.5">
                        <span>روابط وملفات التحميل المرفقة</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                          مدعوم بإعلانات أدسنس
                        </span>
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        ضع روابط الملفات (Google Drive، Mediafire، PDF مباشر...). سيتم تحويل الزوار عبر بوابة الانتظار الآمنة مع شفرات إعلانات أدسنس.
                      </p>
                    </div>
                  </div>

                  {downloadUrl && downloadUrl !== "#" && (
                    <button
                      type="button"
                      onClick={() =>
                        setPreviewGatewayFile({
                          isOpen: true,
                          title: downloadLabel || "ملف التحميل المرفق",
                          url: downloadUrl,
                          type: fileType,
                          size: fileSize,
                        })
                      }
                      className="text-[11px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold px-3 py-1.5 rounded-xl border border-indigo-200 flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto"
                    >
                      <Zap className="w-3.5 h-3.5 text-indigo-600" />
                      <span>معاينة بوابة التحميل والأدسنس</span>
                    </button>
                  )}
                </div>

                {/* Primary Download Box */}
                <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-700 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>الملف الأساسي للتحميل (Primary Attachment):</span>
                    </span>
                    <span className="text-[10px] text-slate-400">الرابط الرئيسي للموضوع</span>
                  </div>

                  {/* URL Input with Quick Helpers */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <LinkIcon className="w-3 h-3 text-emerald-600" />
                        <span>رابط التحميل المباشر (URL أو Google Drive أو Mediafire):</span>
                      </span>
                      {downloadUrl && (
                        <a
                          href={downloadUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] text-teal-600 hover:underline flex items-center gap-0.5"
                        >
                          <span>فحص الرابط</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </label>
                    <input
                      type="url"
                      value={downloadUrl}
                      onChange={(e) => setDownloadUrl(e.target.value)}
                      placeholder="https://drive.google.com/file/d/... أو https://www.mediafire.com/... أو رابط مباشر PDF"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-mono text-slate-800 outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                      dir="ltr"
                    />

                    {/* Quick URL Helpers */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                      <span className="text-[10px] text-slate-400 font-medium">نماذج سريعة:</span>
                      <button
                        type="button"
                        onClick={() =>
                          setDownloadUrl("https://drive.google.com/file/d/1A2B3C4D5E6F7G8H9I/view?usp=sharing")
                        }
                        className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono cursor-pointer"
                      >
                        + Google Drive
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setDownloadUrl("https://www.mediafire.com/file/example-document.pdf/file")
                        }
                        className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono cursor-pointer"
                      >
                        + Mediafire
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setDownloadUrl("https://www.men.gov.ma/Ar/Documents/moudakkira-2026.pdf")
                        }
                        className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono cursor-pointer"
                      >
                        + بوابة men.gov.ma
                      </button>
                    </div>
                  </div>

                  {/* Label, Type and Size */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-1">
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        عنوان زر التحميل:
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
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        صيغة الملف:
                      </label>
                      <select
                        value={fileType}
                        onChange={(e) => setFileType(e.target.value as FileTypeOption)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-medium cursor-pointer"
                      >
                        <option value="pdf">وثيقة PDF رسمية</option>
                        <option value="word">مستند Word (DOCX)</option>
                        <option value="excel">جدول Excel (XLSX)</option>
                        <option value="pptx">عرض تقديمي PowerPoint</option>
                        <option value="drive">رابط Google Drive</option>
                        <option value="mediafire">رابط Mediafire</option>
                        <option value="zip">أرشيف مضغوط ZIP / RAR</option>
                        <option value="other">صيغة أخرى</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        حجم الملف (تقريبي):
                      </label>
                      <input
                        type="text"
                        value={fileSize}
                        onChange={(e) => setFileSize(e.target.value)}
                        placeholder="مثال: 4.5 MB"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-medium"
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Multi-Files Section */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Plus className="w-3.5 h-3.5 text-blue-600" />
                      <span>مرفقات وروابط إضافية لنفس الموضوع ({downloads.length}):</span>
                    </span>

                    <button
                      type="button"
                      onClick={handleAddExtraDownload}
                      className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-xl border border-emerald-300 flex items-center gap-1 transition cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ إضافة رابط تحميل آخر</span>
                    </button>
                  </div>

                  {downloads.length > 0 && (
                    <div className="space-y-2">
                      {downloads.map((dl, idx) => (
                        <div
                          key={dl.id}
                          className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center gap-2.5 shadow-2xs"
                        >
                          <span className="text-xs font-black text-slate-400 font-mono shrink-0">
                            #{idx + 1}
                          </span>

                          <input
                            type="text"
                            value={dl.label}
                            onChange={(e) =>
                              handleUpdateExtraDownload(dl.id, { label: e.target.value })
                            }
                            placeholder="عنوان الملف (مثال: نموذج طلب الطعن Word)"
                            className="w-full sm:w-1/3 bg-slate-50 border border-slate-300 rounded-lg p-1.5 text-xs font-medium"
                          />

                          <input
                            type="url"
                            value={dl.url}
                            onChange={(e) =>
                              handleUpdateExtraDownload(dl.id, { url: e.target.value })
                            }
                            placeholder="رابط التحميل URL"
                            className="w-full sm:flex-1 bg-slate-50 border border-slate-300 rounded-lg p-1.5 text-xs font-mono"
                            dir="ltr"
                          />

                          <select
                            value={dl.fileType || "pdf"}
                            onChange={(e) =>
                              handleUpdateExtraDownload(dl.id, {
                                fileType: e.target.value as FileTypeOption,
                              })
                            }
                            className="w-full sm:w-28 bg-slate-50 border border-slate-300 rounded-lg p-1.5 text-xs font-medium cursor-pointer"
                          >
                            <option value="pdf">PDF</option>
                            <option value="word">Word</option>
                            <option value="excel">Excel</option>
                            <option value="pptx">PowerPoint</option>
                            <option value="drive">Drive</option>
                            <option value="zip">ZIP</option>
                          </select>

                          <button
                            type="button"
                            onClick={() => handleRemoveExtraDownload(dl.id)}
                            className="text-rose-600 hover:text-rose-800 p-1.5 hover:bg-rose-50 rounded-lg transition cursor-pointer self-end sm:self-center"
                            title="حذف هذا المرفق"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tags Field */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-blue-600" />
                    <span>الكلمات الدلالية (Tags - مفصولة بفاصلة):</span>
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="الحركة الانتقالية، مذكرات، الابتدائي، مؤسسات الريادة"
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

              {/* Downloads in Preview */}
              {(downloadUrl || downloads.length > 0) && (
                <div className="pt-4 border-t border-slate-200 space-y-2">
                  <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-2">
                    <Download className="w-4 h-4 text-emerald-600" />
                    <span>الملفات المرفقة المتاحة للتحميل عبر بوابة الإعلانات:</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    {downloadUrl && downloadUrl !== "#" && (
                      <button
                        type="button"
                        onClick={() =>
                          setPreviewGatewayFile({
                            isOpen: true,
                            title: downloadLabel || "الملف الرئيسي المرفق",
                            url: downloadUrl,
                            type: fileType,
                            size: fileSize,
                          })
                        }
                        className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-black text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm hover:from-emerald-700 hover:to-teal-800 transition cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>{downloadLabel || "تحميل المرفق الرسمي (PDF)"}</span>
                        <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-mono">
                          {fileType.toUpperCase()}
                        </span>
                      </button>
                    )}

                    {downloads.map((dl) => (
                      <button
                        key={dl.id}
                        type="button"
                        onClick={() =>
                          setPreviewGatewayFile({
                            isOpen: true,
                            title: dl.label,
                            url: dl.url,
                            type: dl.fileType || "pdf",
                            size: dl.fileSize,
                          })
                        }
                        className="bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-2 shadow-2xs transition cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{dl.label}</span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-mono">
                          {(dl.fileType || "pdf").toUpperCase()}
                        </span>
                      </button>
                    ))}
                  </div>
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

      {/* Gateway Preview Modal */}
      {previewGatewayFile.isOpen && (
        <DownloadGatewayModal
          isOpen={previewGatewayFile.isOpen}
          onClose={() => setPreviewGatewayFile((prev) => ({ ...prev, isOpen: false }))}
          fileTitle={previewGatewayFile.title}
          downloadUrl={previewGatewayFile.url}
          fileType={previewGatewayFile.type}
          fileSize={previewGatewayFile.size}
          sourceTopicTitle={title}
        />
      )}
    </div>
  );
};
