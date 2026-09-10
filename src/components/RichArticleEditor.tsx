import React, { useState } from "react";
import {
  Download,
  Link as LinkIcon,
  Image as ImageIcon,
  FileText,
  Code,
  Eye,
  Sparkles,
  Heading1,
  Heading2,
  Heading3,
  Bold,
  Italic,
  List,
  AlertTriangle,
  Info,
  CheckCircle2,
  Plus,
  Trash2,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { ArticleHtmlRenderer } from "./ArticleHtmlRenderer";

interface RichArticleEditorProps {
  value: string;
  onChange: (newValue: string) => void;
  title?: string;
  subtitle?: string;
  textareaId?: string;
}

export const RichArticleEditor: React.FC<RichArticleEditorProps> = ({
  value,
  onChange,
  title = "محرر المقال والمحتوى الأكاديمي",
  textareaId = "rich-article-textarea",
}) => {
  const [activeView, setActiveView] = useState<"edit" | "preview">("edit");
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showCalloutModal, setShowCalloutModal] = useState(false);

  // Form states for modals
  const [dlTitle, setDlTitle] = useState("تحميل نماذج الاختبار الرسمية بصيغة (PDF)");
  const [dlUrl, setDlUrl] = useState("https://drive.google.com/...");
  const [dlSize, setDlSize] = useState("3.5 MB");
  const [dlType, setDlType] = useState<"card" | "button" | "inline">("card");

  const [linkText, setLinkText] = useState("رابط المنصة الرسمية للامتحانات");
  const [linkUrl, setLinkUrl] = useState("https://");

  const [imageUrl, setImageUrl] = useState("https://");
  const [imageCaption, setImageCaption] = useState("خريطة ذهنية توضيحية للمكون");

  const [calloutType, setCalloutType] = useState<"info" | "warning" | "success">("info");
  const [calloutText, setCalloutText] = useState("توجيه بيداغوجي: ركز على معايير التقويم المعتمدة في الامتحان الشفوي والكتابي.");

  const [copied, setCopied] = useState(false);

  // Insert code at cursor position in textarea
  const insertSnippet = (snippet: string) => {
    const textarea = document.getElementById(textareaId) as HTMLTextAreaElement | null;
    if (!textarea) {
      onChange(value ? `${value}\n\n${snippet}` : snippet);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = value.substring(0, start);
    const after = value.substring(end);
    const updated = before + snippet + after;

    onChange(updated);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + snippet.length, start + snippet.length);
    }, 50);
  };

  // Pre-built HTML / Markdown Download Snippets
  const handleInsertDownload = () => {
    if (!dlTitle.trim() || !dlUrl.trim()) return;

    let snippet = "";
    if (dlType === "card") {
      snippet = `
<!-- صندوق تحميل رسمي متكامل -->
<div class="my-5 p-4 sm:p-5 bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 border-2 border-emerald-300/90 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
  <div class="space-y-1">
    <div class="flex items-center gap-2">
      <span class="bg-emerald-700 text-white text-[10px] font-black px-2 py-0.5 rounded font-mono">PDF</span>
      <h4 class="font-black text-slate-900 text-sm sm:text-base">${dlTitle.trim()}</h4>
    </div>
    <div class="flex items-center gap-3 text-xs text-slate-500 font-medium">
      <span>الحجم: ${dlSize.trim()}</span>
      <span>•</span>
      <span>تحميل مباشر آمن</span>
    </div>
  </div>
  <a href="${dlUrl.trim()}" target="_blank" rel="noopener noreferrer" download class="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-xs transition hover:scale-102">
    <span>📥 تحميل الملف الآن</span>
  </a>
</div>
`;
    } else if (dlType === "button") {
      snippet = `
<a href="${dlUrl.trim()}" target="_blank" rel="noopener noreferrer" download class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-xs transition hover:scale-102 my-2">
  <span>📥 ${dlTitle.trim()} (${dlSize.trim()})</span>
</a>
`;
    } else {
      snippet = `<a href="${dlUrl.trim()}" target="_blank" rel="noopener noreferrer" download class="text-emerald-700 hover:text-emerald-900 font-bold underline underline-offset-4 decoration-emerald-400">📥 ${dlTitle.trim()} [${dlSize.trim()}]</a>`;
    }

    insertSnippet(snippet.trim());
    setShowDownloadModal(false);
  };

  const handleInsertLink = () => {
    if (!linkText.trim() || !linkUrl.trim()) return;
    const snippet = `<a href="${linkUrl.trim()}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 font-bold underline underline-offset-4 decoration-blue-300">${linkText.trim()} ↗</a>`;
    insertSnippet(snippet);
    setShowLinkModal(false);
  };

  const handleInsertImage = () => {
    if (!imageUrl.trim()) return;
    const snippet = `
<div class="my-4 bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
  <img src="${imageUrl.trim()}" alt="${imageCaption.trim() || 'صورة توضيحية'}" class="w-full h-auto object-cover max-h-[400px]" />
  ${imageCaption.trim() ? `<p class="p-2.5 text-center text-xs text-slate-600 font-bold bg-white border-t border-slate-100">${imageCaption.trim()}</p>` : ''}
</div>
`;
    insertSnippet(snippet.trim());
    setShowImageModal(false);
  };

  const handleInsertCallout = () => {
    if (!calloutText.trim()) return;
    let bg = "bg-blue-50 border-blue-400 text-blue-950";
    let icon = "💡";
    let title = "توجيه وإضاءة بيداغوجية:";

    if (calloutType === "warning") {
      bg = "bg-amber-50 border-amber-500 text-amber-950";
      icon = "⚠️";
      title = "تنبيه وملاحظة هامة:";
    } else if (calloutType === "success") {
      bg = "bg-emerald-50 border-emerald-500 text-emerald-950";
      icon = "✅";
      title = "إفادة معتمدة:";
    }

    const snippet = `
<div class="my-4 p-4 ${bg} border-r-4 rounded-r-xl rounded-l-lg shadow-2xs space-y-1">
  <div class="flex items-center gap-1.5 font-black text-xs sm:text-sm">
    <span>${icon}</span>
    <span>${title}</span>
  </div>
  <p class="text-xs sm:text-sm leading-relaxed">${calloutText.trim()}</p>
</div>
`;
    insertSnippet(snippet.trim());
    setShowCalloutModal(false);
  };

  // Fast HTML Templates
  const applyTemplate = (type: "full_article" | "download_hub" | "table_schedule") => {
    if (type === "full_article") {
      const template = `<h2>📌 مدخل تأطيري وتوصيف المكون</h2>
<p>يتناول هذا الدليل الشامل جميع المعارف والمحاور الأكاديمية والديداكتيكية المعتمدة في الاختبار.</p>

<h3>1. المحاور الأكاديمية الأساسية</h3>
<ul>
  <li>المفاهيم المركزية والبنية المعرفية للمادة.</li>
  <li>ديداكتيك التخصص وتخطيط التعلمات وفق المنهاج المنقح.</li>
  <li>مستجدات علوم التربية والبيداغوجيات الوظيفية.</li>
</ul>

<div class="my-4 p-4 bg-amber-50 border-r-4 border-amber-500 rounded-r-xl rounded-l-lg text-amber-950 space-y-1">
  <div class="font-black text-xs sm:text-sm">💡 توجيه بيداغوجي هام:</div>
  <p class="text-xs sm:text-sm leading-relaxed">خصص وقتاً كافياً للتمرن على صياغة الجذاذات وبناء المقاطع التعلمية وفق المقاربة بالكفايات.</p>
</div>

<h3>2. الملفات والوثائق الرسمية للتحميل المباشر</h3>
<!-- صندوق تحميل متكامل -->
<div class="my-4 p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
  <div>
    <h4 class="font-black text-slate-900 text-sm">دليل المعارف الأكاديمية والتوصيفات الرسمية (PDF)</h4>
    <p class="text-xs text-slate-500">الحجم: 3.4 MB • النسخة المحينة</p>
  </div>
  <a href="https://www.profpress.net" target="_blank" download class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5">
    <span>📥 تحميل الملف</span>
  </a>
</div>`;
      insertSnippet(template);
    } else if (type === "download_hub") {
      const template = `<h3>📂 باقة الوثائق وملفات التحميل المعتمدة</h3>
<p>يمكنكم تحميل النماذج الرسمية والمذكرات التنظيمية عبر الروابط المباشرة التالية:</p>

<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
  <div class="p-3.5 bg-white border border-emerald-200 rounded-xl flex items-center justify-between gap-2 shadow-2xs">
    <div>
      <h5 class="font-black text-xs text-slate-900">مواضيع الاختبارات السابقة مع عناصر الإجابة</h5>
      <span class="text-[11px] text-slate-400">PDF • 4.2 MB</span>
    </div>
    <a href="https://www.profpress.net" target="_blank" download class="bg-emerald-600 text-white font-bold text-xs px-3 py-1.5 rounded-lg shrink-0">تحميل</a>
  </div>

  <div class="p-3.5 bg-white border border-blue-200 rounded-xl flex items-center justify-between gap-2 shadow-2xs">
    <div>
      <h5 class="font-black text-xs text-slate-900">أطر التوصيف والمراجع البيداغوجية</h5>
      <span class="text-[11px] text-slate-400">PDF • 2.1 MB</span>
    </div>
    <a href="https://www.profpress.net" target="_blank" download class="bg-blue-600 text-white font-bold text-xs px-3 py-1.5 rounded-lg shrink-0">تحميل</a>
  </div>
</div>`;
      insertSnippet(template);
    } else if (type === "table_schedule") {
      const template = `<div class="my-4 overflow-x-auto border border-slate-200 rounded-2xl">
  <table class="w-full text-right text-xs border-collapse">
    <thead>
      <tr class="bg-slate-100 text-slate-800 font-black">
        <th class="p-3 border-b border-slate-200">المكون / الاختبار</th>
        <th class="p-3 border-b border-slate-200">المعامل</th>
        <th class="p-3 border-b border-slate-200">المدة الزمنية</th>
        <th class="p-3 border-b border-slate-200">رابط التحميل</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-100 text-slate-700 font-medium">
      <tr>
        <td class="p-3 font-bold text-slate-900">الاختبار الأكاديمي في التخصص</td>
        <td class="p-3">المعامل 3</td>
        <td class="p-3">3 ساعات</td>
        <td class="p-3"><a href="#" class="text-blue-600 font-bold underline">تحميل النموذج</a></td>
      </tr>
      <tr class="bg-slate-50/50">
        <td class="p-3 font-bold text-slate-900">ديداكتيك مادة التخصص</td>
        <td class="p-3">المعامل 4</td>
        <td class="p-3">4 ساعات</td>
        <td class="p-3"><a href="#" class="text-emerald-600 font-bold underline">تحميل الدليل</a></td>
      </tr>
    </tbody>
  </table>
</div>`;
      insertSnippet(template);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs flex flex-col font-cairo">
      {/* Top Header & View Mode Switcher */}
      <div className="bg-slate-50 border-b border-slate-200 p-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-blue-600" />
          <span className="font-black text-xs sm:text-sm text-slate-900">{title}</span>
          <span className="text-[11px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
            يدعم HTML و Markdown
          </span>
        </div>

        {/* View Tabs */}
        <div className="flex items-center bg-white border border-slate-200 rounded-xl p-0.5 shadow-2xs">
          <button
            type="button"
            onClick={() => setActiveView("edit")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeView === "edit"
                ? "bg-blue-600 text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>محرر الكود والمقال</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveView("preview")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeView === "preview"
                ? "bg-blue-600 text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>معاينة حية فورية</span>
          </button>
        </div>
      </div>

      {/* Toolbar for inserting HTML elements & Download links */}
      {activeView === "edit" && (
        <div className="bg-slate-100/80 border-b border-slate-200 p-2 flex flex-wrap items-center gap-1.5 text-xs">
          {/* 1. Insert Download Button / Card (HIGHLIGHTED) */}
          <button
            type="button"
            onClick={() => setShowDownloadModal(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-2xs transition cursor-pointer"
            title="إدراج رابط أو صندوق تحميل مباشر للملفات (PDF / Drive)"
          >
            <Download className="w-3.5 h-3.5" />
            <span>+ إدراج رابط / صندوق تحميل</span>
          </button>

          {/* 2. Insert Link */}
          <button
            type="button"
            onClick={() => setShowLinkModal(true)}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-2.5 py-1.5 rounded-lg flex items-center gap-1 font-bold cursor-pointer transition shadow-2xs"
            title="إدراج رابط HTML عادي"
          >
            <LinkIcon className="w-3.5 h-3.5 text-blue-600" />
            <span>رابط HTML</span>
          </button>

          {/* 3. Insert Image */}
          <button
            type="button"
            onClick={() => setShowImageModal(true)}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-2.5 py-1.5 rounded-lg flex items-center gap-1 font-bold cursor-pointer transition shadow-2xs"
            title="إدراج صورة توضيحية HTML"
          >
            <ImageIcon className="w-3.5 h-3.5 text-purple-600" />
            <span>صورة HTML</span>
          </button>

          {/* 4. Insert Callout */}
          <button
            type="button"
            onClick={() => setShowCalloutModal(true)}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-2.5 py-1.5 rounded-lg flex items-center gap-1 font-bold cursor-pointer transition shadow-2xs"
            title="إدراج صندوق تنبيه أو ملاحظة"
          >
            <Info className="w-3.5 h-3.5 text-amber-600" />
            <span>صندوق تنبيه</span>
          </button>

          <span className="text-slate-300">|</span>

          {/* Headings */}
          <button
            type="button"
            onClick={() => insertSnippet("<h2>عنوان رئيسي للمحور</h2>\n")}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-2 py-1.5 rounded-lg font-bold cursor-pointer transition"
            title="عنوان H2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => insertSnippet("<h3>عنوان فرعي</h3>\n")}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-2 py-1.5 rounded-lg font-bold cursor-pointer transition"
            title="عنوان H3"
          >
            H3
          </button>

          {/* Bold & Italic */}
          <button
            type="button"
            onClick={() => insertSnippet("<strong>نص عريض</strong>")}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-2 py-1.5 rounded-lg font-black cursor-pointer transition"
            title="خط عريض"
          >
            B
          </button>
          <button
            type="button"
            onClick={() => insertSnippet("<em>نص مائل</em>")}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-2 py-1.5 rounded-lg italic cursor-pointer transition"
            title="خط مائل"
          >
            I
          </button>

          {/* List */}
          <button
            type="button"
            onClick={() => insertSnippet("<ul>\n  <li>عنصر أول...</li>\n  <li>عنصر ثانٍ...</li>\n</ul>\n")}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-2 py-1.5 rounded-lg font-bold cursor-pointer transition"
            title="قائمة نقطية"
          >
            <List className="w-3.5 h-3.5" />
          </button>

          <span className="text-slate-300">|</span>

          {/* Fast Templates Menu */}
          <div className="flex items-center gap-1">
            <span className="text-[11px] font-bold text-slate-500">قوالب جاهزة:</span>
            <button
              type="button"
              onClick={() => applyTemplate("full_article")}
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-[11px] font-bold px-2 py-1 rounded cursor-pointer"
            >
              مقال كامل
            </button>
            <button
              type="button"
              onClick={() => applyTemplate("download_hub")}
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-[11px] font-bold px-2 py-1 rounded cursor-pointer"
            >
              شبكة تحميل
            </button>
            <button
              type="button"
              onClick={() => applyTemplate("table_schedule")}
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-[11px] font-bold px-2 py-1 rounded cursor-pointer"
            >
              جدول منظم
            </button>
          </div>
        </div>
      )}

      {/* Editor Body */}
      <div className="p-4 flex-1 min-h-[300px]">
        {activeView === "edit" ? (
          <div className="space-y-2">
            <textarea
              id={textareaId}
              rows={12}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="اكتب مقالك هنا أو ألصق كود HTML وروابط التحميل (مثال: <a href='...' download>تحميل PDF</a>)..."
              className="w-full border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl p-4 text-xs sm:text-sm font-mono leading-relaxed text-slate-800 dir-rtl resize-y min-h-[280px]"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>يمكنك استخدام كافة وسوم HTML الأساسية (a, img, table, div, span, h1-h4, p, ul, li) بالإضافة إلى Markdown.</span>
              <span>عدد الحروف: {value.length}</span>
            </div>
          </div>
        ) : (
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl min-h-[280px] overflow-y-auto">
            {value ? (
              <ArticleHtmlRenderer content={value} />
            ) : (
              <div className="text-center py-12 text-slate-400 text-xs">
                لم يتم كتابة أي محتوى بعد. ارجع إلى وضع المحرر وأضف نصاً أو روابط تحميل.
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL 1: Insert Download Link/Card */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-2xl border border-slate-200 text-right">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-black text-sm sm:text-base text-slate-900 flex items-center gap-2">
                <Download className="w-4 h-4 text-emerald-600" />
                <span>إدراج رابط أو صندوق تحميل مباشر</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowDownloadModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">عنوان الملف أو الوثيقة:</label>
                <input
                  type="text"
                  value={dlTitle}
                  onChange={(e) => setDlTitle(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                  placeholder="مثال: نماذج امتحانات التفتيش التربوي (PDF)"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  رابط التحميل المباشر (Google Drive / OneDrive / Mediafire / رابط خارجي):
                </label>
                <input
                  type="url"
                  value={dlUrl}
                  onChange={(e) => setDlUrl(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-sans text-left dir-ltr"
                  placeholder="https://drive.google.com/file/d/..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">حجم ونوع الملف:</label>
                  <input
                    type="text"
                    value={dlSize}
                    onChange={(e) => setDlSize(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    placeholder="مثال: 3.5 MB • PDF"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">شكل العرض داخل المقال:</label>
                  <select
                    value={dlType}
                    onChange={(e) => setDlType(e.target.value as any)}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold bg-white"
                  >
                    <option value="card">صندوق بطاقة تحميل بارزة (موصى به)</option>
                    <option value="button">زر تحميل أخضر أنيق</option>
                    <option value="inline">رابط نصي مباشر مدمج</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowDownloadModal(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={handleInsertDownload}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl text-xs font-black shadow-xs cursor-pointer"
              >
                إدراج في المقال
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Insert HTML Link */}
      {showLinkModal && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl border border-slate-200 text-right">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-blue-600" />
                <span>إدراج رابط تشعبي HTML</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">نص الرابط الظاهر:</label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">عنوان URL للرابط:</label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-sans text-left dir-ltr"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={handleInsertLink}
                className="bg-blue-600 text-white px-5 py-2 rounded-xl text-xs font-black cursor-pointer shadow-xs"
              >
                إدراج الرابط
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Insert Image */}
      {showImageModal && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl border border-slate-200 text-right">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-purple-600" />
                <span>إدراج صورة توضيحية HTML</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">رابط الصورة (URL):</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-sans text-left dir-ltr"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">وصف أو عنوان توضيحي أسفل الصورة:</label>
                <input
                  type="text"
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs"
                  placeholder="مثال: الخريطة الذهنية لمراحل النقل الديداكتيكي"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={handleInsertImage}
                className="bg-purple-600 text-white px-5 py-2 rounded-xl text-xs font-black cursor-pointer shadow-xs"
              >
                إدراج الصورة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Insert Callout */}
      {showCalloutModal && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl border border-slate-200 text-right">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-600" />
                <span>إدراج صندوق تنبيه أو ملاحظة بيداغوجية</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowCalloutModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">نوع الصندوق والتنبيه:</label>
                <select
                  value={calloutType}
                  onChange={(e) => setCalloutType(e.target.value as any)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold bg-white"
                >
                  <option value="info">💡 إضاءة وتوجيه بيداغوجي (أزرق)</option>
                  <option value="warning">⚠️ تنبيه وملاحظة هامة (برتقالي)</option>
                  <option value="success">✅ إفادة وخلاصة معتمدة (أخضر)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">نص الملاحظة والتوجيه:</label>
                <textarea
                  rows={3}
                  value={calloutText}
                  onChange={(e) => setCalloutText(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-3 text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowCalloutModal(false)}
                className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={handleInsertCallout}
                className="bg-amber-600 text-white px-5 py-2 rounded-xl text-xs font-black cursor-pointer shadow-xs"
              >
                إدراج الصندوق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RichArticleEditor;
