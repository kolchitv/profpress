import React, { useState, useRef } from "react";
import {
  X,
  Save,
  FileText,
  Image as ImageIcon,
  Download,
  Link,
  Plus,
  Trash2,
  Upload,
  Bold,
  Heading2,
  List,
  Quote,
  Sparkles,
  Info,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import {
  QuickResourceCard,
  QuickResourceImage,
  QuickResourceLink,
} from "../data/teachingCompetitionData";

interface QuickResourceEditorModalProps {
  isOpen: boolean;
  card: QuickResourceCard;
  onClose: () => void;
  onSave: (updated: QuickResourceCard) => void;
}

export const QuickResourceEditorModal: React.FC<QuickResourceEditorModalProps> = ({
  isOpen,
  card,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  // Tabs: basic & article / images / download links
  const [activeTab, setActiveTab] = useState<"content" | "images" | "downloads">("content");

  // Basic Info
  const [title, setTitle] = useState(card.title || "");
  const [subtitle, setSubtitle] = useState(card.subtitle || "");
  const [color, setColor] = useState<QuickResourceCard["color"]>(card.color || "teal");
  const [iconName, setIconName] = useState(card.iconName || "FileText");
  const [externalUrl, setExternalUrl] = useState(card.url || "");
  const [author, setAuthor] = useState(card.author || "إدارة بروف بريس");
  const [lastUpdated, setLastUpdated] = useState(
    card.lastUpdated || new Date().toLocaleDateString("ar-MA")
  );

  // Written Article Content
  const [writtenContent, setWrittenContent] = useState(card.writtenContent || "");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Images List
  const [images, setImages] = useState<QuickResourceImage[]>(card.images || []);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageCaption, setNewImageCaption] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Download Links List
  const [downloadLinks, setDownloadLinks] = useState<QuickResourceLink[]>(
    card.downloadLinks || []
  );
  const [newLinkTitle, setNewLinkTitle] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");
  const [newLinkSize, setNewLinkSize] = useState("1.8 MB");

  // Formatting helpers for text area
  const insertFormatting = (prefix: string, suffix: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const replacement = prefix + (selectedText || "نص هنا") + suffix;

    const updated =
      textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
    setWrittenContent(updated);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + (selectedText.length || 7)
      );
    }, 50);
  };

  // Add Image by URL
  const handleAddImageUrl = () => {
    if (!newImageUrl.trim()) return;
    const newImg: QuickResourceImage = {
      id: `img-${Date.now()}`,
      url: newImageUrl.trim(),
      caption: newImageCaption.trim() || undefined,
    };
    setImages([...images, newImg]);
    setNewImageUrl("");
    setNewImageCaption("");
  };

  // Upload Local Image File (Data URL)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("يرجى اختيار ملف صورة صالح (PNG, JPG, WebP).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        const newImg: QuickResourceImage = {
          id: `img-${Date.now()}`,
          url: event.target.result,
          caption: file.name.replace(/\.[^/.]+$/, ""),
        };
        setImages([...images, newImg]);
      }
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveImage = (id: string) => {
    setImages(images.filter((img) => img.id !== id));
  };

  // Add Download Link
  const handleAddDownloadLink = () => {
    if (!newLinkTitle.trim() || !newLinkUrl.trim()) return;
    const newLink: QuickResourceLink = {
      id: `link-${Date.now()}`,
      title: newLinkTitle.trim(),
      url: newLinkUrl.trim(),
      size: newLinkSize.trim() || "PDF",
    };
    setDownloadLinks([...downloadLinks, newLink]);
    setNewLinkTitle("");
    setNewLinkUrl("");
    setNewLinkSize("1.8 MB");
  };

  const handleRemoveDownloadLink = (id: string) => {
    setDownloadLinks(downloadLinks.filter((l) => l.id !== id));
  };

  // Save changes
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: QuickResourceCard = {
      ...card,
      title: title.trim(),
      subtitle: subtitle.trim(),
      color,
      iconName,
      url: externalUrl.trim() || card.url,
      author: author.trim(),
      lastUpdated: lastUpdated.trim(),
      writtenContent: writtenContent.trim(),
      images,
      downloadLinks,
    };

    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in" dir="rtl">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col text-right">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg">
                تحرير بطاقة المحتوى والمرفقات ({title || card.title})
              </h3>
              <p className="text-xs text-blue-200">
                خاص بمدير المنصة: تحرير الموضوع المكتوب، روابط التحميل، والصور المرفقة
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-xl transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-5 py-2.5 shrink-0 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("content")}
            className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === "content"
                ? "bg-blue-700 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>بيانات البطاقة والموضوع المكتوب</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("images")}
            className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === "images"
                ? "bg-blue-700 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>الصور والانفوجرافيك ({images.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("downloads")}
            className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === "downloads"
                ? "bg-blue-700 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>روابط التحميل والمستندات ({downloadLinks.length})</span>
          </button>
        </div>

        {/* Body Content */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* ========================================================= */}
          {/* TAB 1: BASIC INFO & WRITTEN ARTICLE CONTENT               */}
          {/* ========================================================= */}
          {activeTab === "content" && (
            <div className="space-y-4">
              {/* Row 1: Title & Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-slate-800 mb-1">
                    عنوان البطاقة الرئيسي *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="توصيفات المباراة"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 outline-hidden focus:border-blue-600 focus:bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-800 mb-1">
                    العنوان الفرعي التوضيحي *
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="المحاور الرسمية للاختبارات"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 outline-hidden focus:border-blue-600 focus:bg-white"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Color, Icon, Author, and External Link */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">لون الإطار</label>
                  <select
                    value={color}
                    onChange={(e) => setColor(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-hidden focus:border-blue-600"
                  >
                    <option value="teal">أخضر بترولي (Teal)</option>
                    <option value="orange">برتقالي (Orange)</option>
                    <option value="blue">أزرق مائي (Blue)</option>
                    <option value="purple">بنفسجي (Purple)</option>
                    <option value="indigo">نيلي / أزرق داكن (Indigo)</option>
                    <option value="emerald">أخضر زمردي (Emerald)</option>
                    <option value="rose">وردي / أحمر (Rose)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">الأيقونة</label>
                  <select
                    value={iconName}
                    onChange={(e) => setIconName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-hidden focus:border-blue-600"
                  >
                    <option value="FileText">ملف / وثيقة (FileText)</option>
                    <option value="Megaphone">مستجدات / بوق (Megaphone)</option>
                    <option value="Folder">مجلد / ملف (Folder)</option>
                    <option value="MessageSquare">حوار / مقابلة (MessageSquare)</option>
                    <option value="BookOpen">كتاب مفتوح (BookOpen)</option>
                    <option value="Award">شهادة / تفوق (Award)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">المصدر / الكاتب</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="إدارة بروف بريس"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 outline-hidden focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">تاريخ التحيين</label>
                  <input
                    type="text"
                    value={lastUpdated}
                    onChange={(e) => setLastUpdated(e.target.value)}
                    placeholder="دورة 2026"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 outline-hidden focus:border-blue-600"
                  />
                </div>
              </div>

              {/* External URL */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  رابط المقال المرجعي على Profpress.net (اختياري)
                </label>
                <input
                  type="url"
                  value={externalUrl}
                  onChange={(e) => setExternalUrl(e.target.value)}
                  placeholder="https://www.profpress.net/..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-800 outline-hidden focus:border-blue-600"
                />
              </div>

              {/* Written Topic / Editorial Article with Formatting Buttons */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="block text-xs font-black text-slate-900">
                    الموضوع المكتوب والمحتوى البيداغوجي (نص المقال المفصل):
                  </label>
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => insertFormatting("\n\n## ", "\n")}
                      className="px-2 py-1 text-slate-700 hover:bg-white hover:text-blue-700 rounded-lg text-xs font-bold transition"
                      title="عنوان رئيسي"
                    >
                      <Heading2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting("**", "**")}
                      className="px-2 py-1 text-slate-700 hover:bg-white hover:text-blue-700 rounded-lg text-xs font-bold transition"
                      title="خط عريض"
                    >
                      <Bold className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting("\n- ", "")}
                      className="px-2 py-1 text-slate-700 hover:bg-white hover:text-blue-700 rounded-lg text-xs font-bold transition"
                      title="قائمة نقطية"
                    >
                      <List className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting("\n> ", "\n")}
                      className="px-2 py-1 text-slate-700 hover:bg-white hover:text-blue-700 rounded-lg text-xs font-bold transition"
                      title="اقتباس أو تنبيه"
                    >
                      <Quote className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <textarea
                  ref={textareaRef}
                  value={writtenContent}
                  onChange={(e) => setWrittenContent(e.target.value)}
                  rows={9}
                  placeholder="اكتب هنا الموضوع البيداغوجي الشامل، الشروط، التوجيهات، والخطوات التفصيلية التي ستظهر للمترشحين عند النقر على البطاقة..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-2xl p-4 text-xs sm:text-sm leading-relaxed text-slate-900 outline-hidden focus:border-blue-600 focus:bg-white font-medium"
                />
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: IMAGES & INFOGRAPHICS                              */}
          {/* ========================================================= */}
          {activeTab === "images" && (
            <div className="space-y-4">
              <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-4 space-y-3">
                <h4 className="font-black text-xs text-blue-950 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-blue-700" />
                  <span>إضافة صورة جديدة (عبر الرابط أو الرفع المباشر من جهازك):</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="رابط الصورة المباشر (https://...)"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 outline-hidden focus:border-blue-600"
                  />
                  <input
                    type="text"
                    value={newImageCaption}
                    onChange={(e) => setNewImageCaption(e.target.value)}
                    placeholder="شرح توضيحي للصورة (كابشن اختياري)"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 outline-hidden focus:border-blue-600"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    disabled={!newImageUrl.trim()}
                    className="bg-blue-700 hover:bg-blue-800 disabled:opacity-40 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>إضافة عبر الرابط</span>
                  </button>

                  <label className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer">
                    <Upload className="w-3.5 h-3.5 text-blue-600" />
                    <span>رفع صورة من الجهاز</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Images Preview Grid */}
              <div className="space-y-2">
                <span className="font-bold text-xs text-slate-700 block">
                  الصور المرفقة بالبطاقة حالياً ({images.length}):
                </span>

                {images.length === 0 ? (
                  <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-8 text-center text-slate-500 text-xs">
                    لا توجد صور مرفقة حالياً. يمكنك رفع ملصق تنظيمي، جدول زمني أو إنفوجرافيك توضيحي.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {images.map((img) => (
                      <div
                        key={img.id}
                        className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs group relative"
                      >
                        <div className="h-40 bg-slate-100 overflow-hidden relative">
                          <img
                            src={img.url}
                            alt={img.caption || "صورة توضيحية"}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(img.id)}
                            className="absolute top-2 left-2 bg-rose-600 hover:bg-rose-700 text-white p-1.5 rounded-lg shadow-sm transition cursor-pointer"
                            title="حذف الصورة"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {img.caption && (
                          <div className="p-2.5 text-xs text-slate-700 font-medium bg-slate-50 border-t border-slate-100">
                            {img.caption}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: DOWNLOAD LINKS & DOCUMENTS                         */}
          {/* ========================================================= */}
          {activeTab === "downloads" && (
            <div className="space-y-4">
              <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4 space-y-3">
                <h4 className="font-black text-xs text-emerald-950 flex items-center gap-2">
                  <Download className="w-4 h-4 text-emerald-700" />
                  <span>إضافة ملف أو رابط تحميل جديد:</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="sm:col-span-1">
                    <input
                      type="text"
                      value={newLinkTitle}
                      onChange={(e) => setNewLinkTitle(e.target.value)}
                      placeholder="عنوان الملف أو النموذج"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 outline-hidden focus:border-emerald-600"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <input
                      type="url"
                      value={newLinkUrl}
                      onChange={(e) => setNewLinkUrl(e.target.value)}
                      placeholder="رابط التحميل المباشر (Google Drive أو بروف بريس)"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 outline-hidden focus:border-emerald-600"
                    />
                  </div>
                  <div className="sm:col-span-1 flex items-center gap-2">
                    <input
                      type="text"
                      value={newLinkSize}
                      onChange={(e) => setNewLinkSize(e.target.value)}
                      placeholder="الحجم (1.8 MB)"
                      className="w-24 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 outline-hidden focus:border-emerald-600"
                    />
                    <button
                      type="button"
                      onClick={handleAddDownloadLink}
                      disabled={!newLinkTitle.trim() || !newLinkUrl.trim()}
                      className="flex-1 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white font-bold text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer shadow-2xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>إضافة</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Links List */}
              <div className="space-y-2">
                <span className="font-bold text-xs text-slate-700 block">
                  الملفات المتاحة للتحميل ({downloadLinks.length}):
                </span>

                {downloadLinks.length === 0 ? (
                  <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-8 text-center text-slate-500 text-xs">
                    لا توجد ملفات تحميل مرفقة حالياً بهذه البطاقة. يمكنك إضافة روابط لمذكرات رسمية أو نماذج طلبات.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {downloadLinks.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-3 text-xs hover:border-emerald-300 transition"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                            <Download className="w-4 h-4" />
                          </div>
                          <span className="font-bold text-slate-800 truncate">{item.title}</span>
                          <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px] font-mono shrink-0">
                            {item.size || "PDF"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-1.5 rounded-lg transition"
                            title="فتح الرابط"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <button
                            type="button"
                            onClick={() => handleRemoveDownloadLink(item.id)}
                            className="text-rose-500 hover:text-rose-700 p-1.5 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                            title="حذف هذا الرابط"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Footer Submit Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
            >
              إلغاء
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-black text-xs shadow-md flex items-center gap-2 transition cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>حفظ وتطبيق التغييرات</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
