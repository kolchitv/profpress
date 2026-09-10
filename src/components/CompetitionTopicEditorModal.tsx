import React, { useState } from "react";
import {
  X,
  Save,
  FileText,
  BookOpen,
  Download,
  Plus,
  Trash2,
  Edit3,
  Heading,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Sparkles,
  Link as LinkIcon,
  Eye,
  ExternalLink,
  GraduationCap,
  Brain,
  ShieldCheck,
  Laptop,
  CheckSquare,
  School,
  FileDown,
} from "lucide-react";
import {
  CompetitionSubject,
  CompetitionSubAction,
  CompetitionDownloadFile,
  getDefaultDownloadFiles,
} from "../data/teachingCompetitionData";

interface CompetitionTopicEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject: CompetitionSubject;
  initialAction?: CompetitionSubAction | null;
  onSaveAction: (savedAction: CompetitionSubAction) => void;
  initialTab?: "content" | "downloads" | "preview";
}

export const CompetitionTopicEditorModal: React.FC<CompetitionTopicEditorModalProps> = ({
  isOpen,
  onClose,
  subject,
  initialAction,
  onSaveAction,
  initialTab = "content",
}) => {
  if (!isOpen) return null;

  // Active Tab: content | downloads | preview
  const [activeTab, setActiveTab] = useState<"content" | "downloads" | "preview">(initialTab);

  // Topic Metadata
  const [title, setTitle] = useState(initialAction?.title || "ملخصات مركزة وموارد جديدة");
  const [subtitle, setSubtitle] = useState(initialAction?.subtitle || "خرائط ذهنية وتوصيفات محينة");
  const [type, setType] = useState<CompetitionSubAction["type"]>(initialAction?.type || "summaries");
  const [iconName, setIconName] = useState(initialAction?.iconName || "FileText");
  const [author, setAuthor] = useState(initialAction?.author || "فريق التحرير البيداغوجي - بروف بريس");
  const [contentSummary, setContentSummary] = useState(
    initialAction?.contentSummary ||
      "خرائط ذهنية تجمع المفاهيم الأساسية: المثلث الديداكتيكي، العقد الديداكتيكي، النقل الديداكتيكي، والعوائق البيداغوجية، مع ملخص بيداغوجيات الخطأ والمشروع والفارقية."
  );
  const [articleContent, setArticleContent] = useState(
    initialAction?.articleContent ||
      `## مدخل تأطيري وتوجيهات الامتحان
يرتكز التحضير الفعال لمباراة التعليم على الاستيعاب الدقيق للمفاهيم المهيكلة لديداكتيك المادة ومستجدات علوم التربية.

### 1. المحاور الديداكتيكية الأساسية
- **المثلث الديداكتيكي:** دراسة العلاقات التفاعلية بين الأقطاب الثلاثة (المدرس، المعرفة، المتعلم).
- **النقل الديداكتيكي (Transposition Didactique):** تتبع مسار المعرفة من المعرفة العالمة إلى المعرفة القابلة للتدريس ثم المدرسة.
- **العقد الديداكتيكي والعوائق البيداغوجية:** إدارة التوقعات الضمنية والصريحة وتشخيص التمثلات الخاطئة.

### 2. البيداغوجيات الوظيفية المعتمدة
- **بيداغوجيا الخطأ:** اعتبار الخطأ حافزاً ومؤشراً إيجابياً لبناء التعلم.
- **بيداغوجيا حل المشكلات:** وضع المتعلم أمام موقف مشكل يدفعه للتفكير والبحث عن حلول منهجية.
- **البيداغوجيا الفارقية والتقويم التكويني:** مراعاة الفروق الفردية ووتائر التعلم المختلفة بين التلاميذ.

> **توجيه بيداغوجي هام:**
> خصص 60% من وقت المراجعة لديداكتيك المواد الأساسية، وتدرب أسبوعياً على صياغة مقاطع تعلمية وجذاذات وفق المقاربة بالكفايات.`
  );
  const [externalUrl, setExternalUrl] = useState(
    initialAction?.externalUrl || "https://www.profpress.net/p/concours-de-lenseignement.html"
  );

  // Download Files List
  const [downloadFiles, setDownloadFiles] = useState<CompetitionDownloadFile[]>(() => {
    if (initialAction?.downloadFiles && initialAction.downloadFiles.length > 0) {
      return initialAction.downloadFiles;
    }
    return getDefaultDownloadFiles(
      initialAction?.type || "summaries",
      subject.title,
      initialAction?.title || "مادة الامتحان"
    );
  });

  // State for adding or editing a download file
  const [newFileTitle, setNewFileTitle] = useState("");
  const [newFileSize, setNewFileSize] = useState("1.2 MB");
  const [newFileYear, setNewFileYear] = useState("2024");
  const [newFileUrl, setNewFileUrl] = useState("https://www.profpress.net/search/label/%D9%86%D9%85%D8%A7%D8%B0%D8%AC%20%D8%A7%D9%85%D8%AA%D8%AD%D8%A7%D9%86%D8%A7%D8%AA");
  const [editingFileId, setEditingFileId] = useState<string | null>(null);

  // Markdown Formatting Helper
  const insertFormatting = (prefix: string, suffix: string = "") => {
    const textarea = document.getElementById("competition-article-content") as HTMLTextAreaElement | null;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = articleContent.substring(start, end);
    const replacement = `${prefix}${selectedText || "نص جديد"}${suffix}`;

    const newContent =
      articleContent.substring(0, start) + replacement + articleContent.substring(end);
    setArticleContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + replacement.length - suffix.length);
    }, 50);
  };

  // Add or Update File
  const handleSaveDownloadFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileTitle.trim() || !newFileUrl.trim()) return;

    if (editingFileId) {
      // update
      setDownloadFiles(
        downloadFiles.map((f) =>
          f.id === editingFileId
            ? { ...f, title: newFileTitle.trim(), size: newFileSize.trim(), year: newFileYear.trim(), url: newFileUrl.trim() }
            : f
        )
      );
      setEditingFileId(null);
    } else {
      // create new
      const newFile: CompetitionDownloadFile = {
        id: `file_${Date.now()}`,
        title: newFileTitle.trim(),
        size: newFileSize.trim() || "PDF",
        year: newFileYear.trim() || "محين",
        url: newFileUrl.trim(),
      };
      setDownloadFiles([...downloadFiles, newFile]);
    }

    // Reset input fields
    setNewFileTitle("");
    setNewFileSize("1.5 MB");
    setNewFileYear("2024");
    setNewFileUrl("https://www.profpress.net/search/label/%D9%86%D9%85%D8%A7%D8%B0%D8%AC%20%D8%A7%D9%85%D8%AA%D8%AD%D8%A7%D9%86%D8%A7%D8%AA");
  };

  // Start editing an existing file
  const handleStartEditFile = (file: CompetitionDownloadFile) => {
    setEditingFileId(file.id);
    setNewFileTitle(file.title);
    setNewFileSize(file.size || "1.0 MB");
    setNewFileYear(file.year || "2024");
    setNewFileUrl(file.url);
  };

  // Cancel file edit
  const handleCancelFileEdit = () => {
    setEditingFileId(null);
    setNewFileTitle("");
    setNewFileSize("1.5 MB");
    setNewFileYear("2024");
    setNewFileUrl("");
  };

  // Delete file
  const handleDeleteDownloadFile = (fileId: string) => {
    if (window.confirm("هل أنت متأكد من حذف رابط التحميل هذا؟")) {
      setDownloadFiles(downloadFiles.filter((f) => f.id !== fileId));
      if (editingFileId === fileId) {
        handleCancelFileEdit();
      }
    }
  };

  // Save Topic Action
  const handleSaveAll = () => {
    if (!title.trim()) {
      alert("يرجى إدخال عنوان الموضوع");
      return;
    }

    const savedAction: CompetitionSubAction = {
      id: initialAction?.id || `act_${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim(),
      type,
      iconName,
      author: author.trim(),
      lastUpdated: new Date().toLocaleDateString("ar-MA", { year: "numeric", month: "long", day: "numeric" }),
      contentSummary: contentSummary.trim(),
      articleContent: articleContent.trim(),
      externalUrl: externalUrl.trim(),
      downloadFiles,
      qcmQuestions: initialAction?.qcmQuestions,
    };

    onSaveAction(savedAction);
    onClose();
  };

  return (
    <div className="no-print fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto" dir="rtl">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-slate-200 animate-in fade-in">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-xl shadow-xs">
              ✍️
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black font-cairo text-white flex items-center gap-2">
                <span>{initialAction ? "محرر الموضوع والمرفقات" : "إضافة موضوع / مورد جديد للمباراة"}</span>
                <span className="text-[11px] bg-blue-500/30 border border-blue-400/40 text-blue-200 px-2 py-0.5 rounded-full font-bold">
                  {subject.title}
                </span>
              </h2>
              <p className="text-xs text-slate-300 font-medium">
                تحرير النصوص البيداغوجية، المحاور، وإضافة وتعديل روابط تحميل الامتحانات والملخصات
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-300 hover:text-white p-2 rounded-xl hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 pt-2.5 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("content")}
              className={`px-4 py-2 text-xs font-bold rounded-t-xl transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
                activeTab === "content"
                  ? "bg-white text-blue-900 border-t-2 border-blue-600 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>محتوى الموضوع والمقال</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("downloads")}
              className={`px-4 py-2 text-xs font-bold rounded-t-xl transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
                activeTab === "downloads"
                  ? "bg-white text-blue-900 border-t-2 border-blue-600 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Download className="w-3.5 h-3.5 text-blue-600" />
              <span>روابط التحميل والملفات ({downloadFiles.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`px-4 py-2 text-xs font-bold rounded-t-xl transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
                activeTab === "preview"
                  ? "bg-white text-blue-900 border-t-2 border-blue-600 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-emerald-600" />
              <span>معاينة الموضوع للمترشحين</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-500 hidden md:block">
            المادة: <strong className="text-blue-950">{subject.title}</strong>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* TAB 1: CONTENT & ARTICLE EDITOR */}
          {activeTab === "content" && (
            <div className="space-y-4">
              {/* Title & Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    عنوان الموضوع / الركن <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="مثلاً: ملخصات مركزة - مادة علوم التربية"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:border-blue-600 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    العنوان الفرعي / الوصف المختصر
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="مثلاً: خرائط ذهنية وخطاطات"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:border-blue-600 outline-hidden"
                  />
                </div>
              </div>

              {/* Type, Icon, & Author */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    طبيعة ونوع المحتوى
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as CompetitionSubAction["type"])}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:border-blue-600 outline-hidden cursor-pointer"
                  >
                    <option value="summaries">ملخصات مركزة وخطاطات</option>
                    <option value="knowledge">معارف أساسية ونظريات</option>
                    <option value="didactics">ديداكتيك وتخطيط وبيداغوجيا</option>
                    <option value="exams">نماذج اختبارات وامتحانات سابقة</option>
                    <option value="mock">اختبار تجريبي ومحاكاة</option>
                    <option value="custom">موضوع بيداغوجي مخصص</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    أيقونة العرض
                  </label>
                  <select
                    value={iconName}
                    onChange={(e) => setIconName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:border-blue-600 outline-hidden cursor-pointer"
                  >
                    <option value="FileText">📄 ملف ونص (FileText)</option>
                    <option value="BookOpen">📖 كتاب ومعارف (BookOpen)</option>
                    <option value="Brain">🧠 علوم التربية والذهن (Brain)</option>
                    <option value="School">🏫 ديداكتيك ومدرسة (School)</option>
                    <option value="GraduationCap">🎓 مباراة وتخرج (GraduationCap)</option>
                    <option value="Laptop">💻 حاسوب واختبار (Laptop)</option>
                    <option value="CheckSquare">✅ تقويم واختيارات (CheckSquare)</option>
                    <option value="ShieldCheck">🛡️ أطر وتوصيفات (ShieldCheck)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    المؤلف / المرجع البيداغوجي
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="مثلاً: فريق بروف بريس البيداغوجي"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:border-blue-600 outline-hidden"
                  />
                </div>
              </div>

              {/* Executive Summary */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  الملخص التوجيهي والمحاور الأساسية (يظهر في أعلى النافذة)
                </label>
                <textarea
                  rows={2}
                  value={contentSummary}
                  onChange={(e) => setContentSummary(e.target.value)}
                  placeholder="ملخص موجز للمفاهيم الأساسية والأهداف..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-medium text-slate-900 focus:bg-white focus:border-blue-600 outline-hidden leading-relaxed"
                />
              </div>

              {/* Rich Article Content Editor */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="block text-xs font-bold text-slate-800">
                    نص المقال / الموضوع المحرر بالتفصيل (مثل نموذج المستجدات)
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setArticleContent(
                        `## الإطار المرجعي وأهم محاور الاختبار\nيتطلب التحضير لمباراة التعليم الإلمام بالمفاهيم الأساسية، والقدرة على تطبيقها في وضعيات ديداكتيكية حقيقية داخل القسم.\n\n### 1. تخطيط التعلمات\n- تحديد الأهداف والكفايات المستهدفة بدقة وفق المنهاج الرسمي.\n- بناء مقاطع وأنشطة تعليمية تراعي الفروق الفردية.\n\n### 2. تدبير التعلمات والفصل الدراسي\n- إرساء قواعد العمل المشترك وتدبير زمن التعلم.\n- اعتماد التفاعل الصفي وبيداغوجيا النشاط وحل المشكلات.\n\n### 3. التقويم والدعم التربوي\n- إعداد أدوات تشخيص ومراقبة مستمرة هادفة.\n- تخطيط خطط الدعم الفوري والمدمج لتجاوز الصعوبات المرصودة.`
                      );
                    }}
                    className="text-[11px] font-bold text-blue-700 hover:text-blue-900 bg-blue-50 px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>توليد قالب بيداغوجي جاهز</span>
                  </button>
                </div>

                {/* Toolbar */}
                <div className="bg-slate-100 border border-slate-300 rounded-t-xl p-2 flex flex-wrap items-center gap-1">
                  <button
                    type="button"
                    onClick={() => insertFormatting("## ", "\n")}
                    className="p-1.5 hover:bg-white rounded-lg text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    title="عنوان رئيسي H2"
                  >
                    <Heading className="w-3.5 h-3.5" />
                    <span>H2</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting("### ", "\n")}
                    className="p-1.5 hover:bg-white rounded-lg text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    title="عنوان فرعي H3"
                  >
                    <Heading className="w-3 h-3" />
                    <span>H3</span>
                  </button>
                  <span className="text-slate-300">|</span>
                  <button
                    type="button"
                    onClick={() => insertFormatting("**", "**")}
                    className="p-1.5 hover:bg-white rounded-lg text-slate-700 text-xs font-bold cursor-pointer"
                    title="خط عريض"
                  >
                    <Bold className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting("*", "*")}
                    className="p-1.5 hover:bg-white rounded-lg text-slate-700 text-xs font-bold cursor-pointer"
                    title="خط مائل"
                  >
                    <Italic className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-slate-300">|</span>
                  <button
                    type="button"
                    onClick={() => insertFormatting("- ")}
                    className="p-1.5 hover:bg-white rounded-lg text-slate-700 text-xs font-bold cursor-pointer"
                    title="قائمة نقطية"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting("1. ")}
                    className="p-1.5 hover:bg-white rounded-lg text-slate-700 text-xs font-bold cursor-pointer"
                    title="قائمة رقمية"
                  >
                    <ListOrdered className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting("> ")}
                    className="p-1.5 hover:bg-white rounded-lg text-slate-700 text-xs font-bold cursor-pointer"
                    title="اقتباس أو ملاحظة هامة"
                  >
                    <Quote className="w-3.5 h-3.5" />
                  </button>
                </div>

                <textarea
                  id="competition-article-content"
                  rows={8}
                  value={articleContent}
                  onChange={(e) => setArticleContent(e.target.value)}
                  placeholder="اكتب المحتوى البيداغوجي التفصيلي للموضوع هنا..."
                  className="w-full bg-white border-x border-b border-slate-300 rounded-b-xl p-3.5 text-xs text-slate-800 focus:border-blue-600 outline-hidden font-mono leading-relaxed resize-y"
                />
              </div>

              {/* External URL */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  رابط المقال أو المرفقات على موقع Profpress.net أو رابط خارجي
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={externalUrl}
                    onChange={(e) => setExternalUrl(e.target.value)}
                    placeholder="https://www.profpress.net/..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3.5 py-2 text-xs font-mono text-slate-800 focus:bg-white focus:border-blue-600 outline-hidden"
                  />
                  <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DOWNLOAD FILES MANAGER */}
          {activeTab === "downloads" && (
            <div className="space-y-6">
              {/* Form to Add or Edit a Download File */}
              <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-xs sm:text-sm text-blue-950 flex items-center gap-2">
                    <Download className="w-4 h-4 text-blue-700" />
                    <span>{editingFileId ? "تعديل رابط التحميل المحدد" : "إضافة رابط تحميل أو نموذج امتحان جديد"}</span>
                  </h4>
                  {editingFileId && (
                    <button
                      type="button"
                      onClick={handleCancelFileEdit}
                      className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
                    >
                      إلغاء التعديل ✕
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveDownloadFile} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        عنوان الملف أو نموذج الامتحان <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={newFileTitle}
                        onChange={(e) => setNewFileTitle(e.target.value)}
                        placeholder="مثلاً: موضوع دورة 2024 مع عناصر الإجابة الرسمية"
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 outline-hidden focus:border-blue-600"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        رابط التحميل المباشر أو صفحة الملف <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="url"
                        value={newFileUrl}
                        onChange={(e) => setNewFileUrl(e.target.value)}
                        placeholder="https://... رابط جوجل درايف أو ميديافاير أو بروف بريس"
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 outline-hidden focus:border-blue-600"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        حجم الملف أو الصيغة
                      </label>
                      <input
                        type="text"
                        value={newFileSize}
                        onChange={(e) => setNewFileSize(e.target.value)}
                        placeholder="1.2 MB أو PDF"
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 outline-hidden focus:border-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        السنة أو الدورة
                      </label>
                      <input
                        type="text"
                        value={newFileYear}
                        onChange={(e) => setNewFileYear(e.target.value)}
                        placeholder="2024 أو استدراكية 2023 أو وزاري"
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 outline-hidden focus:border-blue-600"
                      />
                    </div>

                    <div className="flex items-end">
                      <button
                        type="submit"
                        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs py-2 px-4 rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer"
                      >
                        {editingFileId ? (
                          <>
                            <Save className="w-3.5 h-3.5" />
                            <span>تحديث رابط التحميل</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>إضافة الرابط إلى القائمة</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Current Download Files List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-xs sm:text-sm text-slate-800">
                    الملفات ونماذج الامتحانات المتاحة للتحميل ({downloadFiles.length})
                  </h4>
                  <span className="text-[11px] text-slate-500">
                    يمكنك تعديل روابط التحميل أو حذفها أو ترتيبها
                  </span>
                </div>

                {downloadFiles.length === 0 ? (
                  <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-6 text-center text-slate-500 text-xs">
                    لا توجد ملفات تحميل مضافة حالياً لهذا الموضوع. استخدم النموذج أعلاه لإضافة أول رابط تحميل.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {downloadFiles.map((file, idx) => (
                      <div
                        key={file.id || idx}
                        className={`bg-white border rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition ${
                          editingFileId === file.id
                            ? "border-blue-500 bg-blue-50/40 ring-2 ring-blue-200"
                            : "border-slate-200 hover:border-blue-300"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                            <FileDown className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <h5 className="font-bold text-slate-900 truncate">{file.title}</h5>
                            <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                              {file.year && (
                                <span className="bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded-md font-bold">
                                  {file.year}
                                </span>
                              )}
                              <span>الحجم: {file.size || "PDF"}</span>
                              <span className="text-slate-300">•</span>
                              <span className="font-mono text-slate-400 truncate max-w-xs">{file.url}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
                            title="تجربة التحميل"
                          >
                            <Download className="w-3 h-3" />
                            <span>تحميل ({file.size || "PDF"})</span>
                          </a>

                          <button
                            type="button"
                            onClick={() => handleStartEditFile(file)}
                            className="p-1.5 text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                            title="تعديل هذا الرابط"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteDownloadFile(file.id)}
                            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition cursor-pointer"
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

          {/* TAB 3: LIVE PREVIEW */}
          {activeTab === "preview" && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-900 text-xs flex items-center justify-between">
                <span>هذه معاينة دقيقة لما سيظهر للمترشحين عند فتح هذا الموضوع:</span>
                <span className="font-bold bg-white px-2.5 py-1 rounded-lg border border-emerald-200">
                  {downloadFiles.length} ملفات جاهزة للتحميل
                </span>
              </div>

              {/* Preview Window Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
                {/* Header */}
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-base text-slate-900">
                      {title} - {subject.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">{subtitle}</p>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-slate-800 font-bold text-xs">
                    <BookOpen className="w-4 h-4 text-blue-700" />
                    <span>الملخص التوجيهي والمحاور الأساسية:</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {contentSummary}
                  </p>
                </div>

                {/* Authored Content */}
                {articleContent && (
                  <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2 text-xs text-slate-800 leading-relaxed whitespace-pre-line">
                    <h4 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
                      محتوى الموضوع والمقال التربوي:
                    </h4>
                    <div>{articleContent}</div>
                  </div>
                )}

                {/* Files Section */}
                <div className="space-y-2">
                  <h4 className="font-black text-xs text-slate-700">الملفات ونماذج الامتحانات المتاحة للتحميل:</h4>
                  <div className="space-y-2">
                    {downloadFiles.map((file, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                          <span className="font-bold text-slate-800">{file.title}</span>
                        </div>
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-lg flex items-center gap-1 shrink-0"
                        >
                          <Download className="w-3 h-3" />
                          <span>تحميل ({file.size || "PDF"})</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 px-6 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-xl transition cursor-pointer"
          >
            إلغاء التغييرات
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSaveAll}
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>حفظ ونشر التعديلات</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
