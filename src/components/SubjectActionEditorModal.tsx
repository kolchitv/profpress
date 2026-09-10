import React, { useState } from "react";
import {
  PrimarySubjectAction,
  ActionAttachedImage,
  PrimaryDownloadFile,
} from "../data/primaryKnowledgeData";
import { RichArticleEditor } from "./RichArticleEditor";
import {
  X,
  Edit3,
  FileText,
  Image as ImageIcon,
  FileDown,
  HelpCircle,
  Plus,
  Trash2,
  Upload,
  Link as LinkIcon,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Eye,
} from "lucide-react";

interface Props {
  isOpen: boolean;
  subjectTitle: string;
  subjectId: string;
  action: PrimarySubjectAction;
  isNew: boolean;
  onClose: () => void;
  onSave: (updatedAction: PrimarySubjectAction, subjectId: string, isNew: boolean) => void;
  onDelete?: (actionId: string, subjectId: string) => void;
}

export const SubjectActionEditorModal: React.FC<Props> = ({
  isOpen,
  subjectTitle,
  subjectId,
  action,
  isNew,
  onClose,
  onSave,
  onDelete,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<"content" | "images" | "downloads" | "qcm">("content");
  const [formData, setFormData] = useState<PrimarySubjectAction>(() => ({
    ...action,
    images: action.images ? [...action.images] : [],
    downloadFiles: action.downloadFiles ? [...action.downloadFiles] : [],
    qcmQuestions: action.qcmQuestions ? [...action.qcmQuestions] : [],
  }));

  // Image Upload state
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageTitle, setNewImageTitle] = useState("");
  const [newImageCaption, setNewImageCaption] = useState("");
  const [imageUploadMode, setImageUploadMode] = useState<"url" | "upload">("url");

  // Download Link state
  const [newFileTitle, setNewFileTitle] = useState("");
  const [newFileUrl, setNewFileUrl] = useState("");
  const [newFileSize, setNewFileSize] = useState("2.0 MB");
  const [newFileYear, setNewFileYear] = useState(new Date().getFullYear().toString());
  const [newFileType, setNewFileType] = useState<"pdf" | "word" | "excel" | "image">("pdf");

  // QCM state
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newOptions, setNewOptions] = useState<string[]>(["", "", "", ""]);
  const [newCorrectIdx, setNewCorrectIdx] = useState<number>(0);
  const [newExplanation, setNewExplanation] = useState("");

  // Handle local image file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("يرجى اختيار ملف صورة صالح (JPG, PNG, WebP)");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        setNewImageUrl(base64);
        if (!newImageTitle) {
          setNewImageTitle(file.name.replace(/\.[^/.]+$/, ""));
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Add Image to Action
  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl.trim()) {
      alert("يرجى إدخال رابط الصورة أو رفع ملف من الجهاز");
      return;
    }

    const newImg: ActionAttachedImage = {
      id: `img_${Date.now()}`,
      url: newImageUrl.trim(),
      title: newImageTitle.trim() || "صورة توضيحية",
      caption: newImageCaption.trim() || undefined,
    };

    setFormData((prev) => ({
      ...prev,
      images: [...(prev.images || []), newImg],
    }));

    setNewImageUrl("");
    setNewImageTitle("");
    setNewImageCaption("");
  };

  // Remove Image
  const handleRemoveImage = (imgId: string) => {
    setFormData((prev) => ({
      ...prev,
      images: (prev.images || []).filter((img) => img.id !== imgId),
    }));
  };

  // Add Download File to Action
  const handleAddDownloadFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileTitle.trim() || !newFileUrl.trim()) {
      alert("يرجى إدخال عنوان الملف ورابط التحميل");
      return;
    }

    const newFile: PrimaryDownloadFile = {
      id: `dl_${Date.now()}`,
      title: newFileTitle.trim(),
      url: newFileUrl.trim(),
      size: newFileSize.trim() || "1.5 MB",
      year: newFileYear.trim() || "وزاري",
      fileType: newFileType,
    };

    setFormData((prev) => ({
      ...prev,
      downloadFiles: [...(prev.downloadFiles || []), newFile],
    }));

    setNewFileTitle("");
    setNewFileUrl("");
    setNewFileSize("2.0 MB");
  };

  // Remove Download File
  const handleRemoveDownloadFile = (fileId: string) => {
    setFormData((prev) => ({
      ...prev,
      downloadFiles: (prev.downloadFiles || []).filter((f) => f.id !== fileId),
    }));
  };

  // Add QCM question
  const handleAddQcmQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim() || newOptions.some((opt) => !opt.trim())) {
      alert("يرجى ملء نص السؤال وجميع الخيارات الأربعة");
      return;
    }

    const newQ = {
      question: newQuestionText.trim(),
      options: newOptions.map((o) => o.trim()),
      correctIndex: newCorrectIdx,
      explanation: newExplanation.trim() || undefined,
      level: "متوسط",
    };

    setFormData((prev) => ({
      ...prev,
      qcmQuestions: [...(prev.qcmQuestions || []), newQ],
    }));

    setNewQuestionText("");
    setNewOptions(["", "", "", ""]);
    setNewCorrectIdx(0);
    setNewExplanation("");
  };

  // Remove QCM question
  const handleRemoveQcmQuestion = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      qcmQuestions: (prev.qcmQuestions || []).filter((_, idx) => idx !== index),
    }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto font-cairo">
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden text-right" dir="rtl">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-sm sm:text-base text-white">
                  {isNew ? "إضافة مقال / موضوع جديد" : `تعديل مقال: ${formData.title}`}
                </h3>
                <span className="text-[10px] bg-purple-500/30 text-purple-300 px-2 py-0.5 rounded-full font-bold">
                  {subjectTitle}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                إمكانية تحرير المقال التفصيلي، إرفاق الصور والمخططات، وإضافة روابط التحميل وأسئلة الـ QCM
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-slate-200 bg-slate-50 px-4 sm:px-6 shrink-0 overflow-x-auto gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("content")}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === "content"
                ? "border-purple-600 text-purple-700 bg-white rounded-t-xl"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <FileText className="w-4 h-4 text-purple-600" />
            <span>المعلومات والمقال التفصيلي</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("images")}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === "images"
                ? "border-purple-600 text-purple-700 bg-white rounded-t-xl"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <ImageIcon className="w-4 h-4 text-emerald-600" />
            <span>الصور والمخططات المرفقة</span>
            {formData.images && formData.images.length > 0 && (
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                {formData.images.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("downloads")}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === "downloads"
                ? "border-purple-600 text-purple-700 bg-white rounded-t-xl"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <FileDown className="w-4 h-4 text-blue-600" />
            <span>روابط ومستندات التحميل</span>
            {formData.downloadFiles && formData.downloadFiles.length > 0 && (
              <span className="bg-blue-100 text-blue-800 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                {formData.downloadFiles.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("qcm")}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === "qcm"
                ? "border-purple-600 text-purple-700 bg-white rounded-t-xl"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>الأسئلة التفاعلية (QCM)</span>
            {formData.qcmQuestions && formData.qcmQuestions.length > 0 && (
              <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                {formData.qcmQuestions.length}
              </span>
            )}
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: CONTENT & ARTICLE */}
          {activeTab === "content" && (
            <div className="space-y-5">
              {/* Basic Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-800 mb-1">عنوان المقال / المكون *:</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    placeholder="مثال: نهج التقصي العلمي في النشاط العلمي"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-800 mb-1">أيقونة العرض:</label>
                  <select
                    value={formData.iconName}
                    onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  >
                    <option value="FlaskConical">FlaskConical (مخبر / نشاط علمي / تقصي)</option>
                    <option value="BookOpen">BookOpen (كتاب / قراءة / معارف)</option>
                    <option value="Presentation">Presentation (عرض / ديداكتيك)</option>
                    <option value="Brain">Brain (دماغ / مجالات / علوم تربية)</option>
                    <option value="Calculator">Calculator (حاسبة / رياضيات)</option>
                    <option value="Languages">Languages (لغات / فرنسية / عربية)</option>
                    <option value="FileText">FileText (نماذج امتحانات / مواضيع)</option>
                    <option value="Laptop">Laptop (حاسوب / اختبار تجريبي)</option>
                    <option value="School">School (مدرسة / فصل)</option>
                    <option value="GraduationCap">GraduationCap (تخرج / تفتيش)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-800 mb-1">
                  رابط خارجي مباشر (اختياري - يفتح مباشرة عند النقر إذا كان محدداً):
                </label>
                <input
                  type="text"
                  value={formData.customUrl || ""}
                  onChange={(e) => setFormData({ ...formData, customUrl: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  placeholder="https://profpressma.blogspot.com/..."
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-800 mb-1">الملخص التوجيهي السريع:</label>
                <textarea
                  rows={2}
                  value={formData.contentSummary || ""}
                  onChange={(e) => setFormData({ ...formData, contentSummary: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  placeholder="اكتب ملخصاً موجزاً يظهر في البطاقة التوجيهية..."
                />
              </div>

              {/* Rich Article Editor with HTML & Download link insertions */}
              <div>
                <label className="block text-xs font-black text-slate-800 mb-1.5 flex items-center justify-between">
                  <span>محرر المقال التفصيلي وأكواد HTML وروابط التحميل:</span>
                  <span className="text-[11px] text-purple-600 font-bold">
                    يدعم تنسيق الخطوط، الجداول، الاقتباسات، الروابط وأكواد HTML
                  </span>
                </label>
                <RichArticleEditor
                  value={formData.articleContent || ""}
                  onChange={(content) => setFormData({ ...formData, articleContent: content })}
                  title="محرر المقال والشرح الديداكتيكي"
                  textareaId={`article-editor-${formData.id}`}
                />
              </div>
            </div>
          )}

          {/* TAB 2: IMAGES & INFOGRAPHICS */}
          {activeTab === "images" && (
            <div className="space-y-6">
              {/* Add New Image Box */}
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-5 space-y-4">
                <h4 className="font-black text-sm text-emerald-950 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-emerald-600" />
                  <span>إضافة صورة أو مخطط توضيحي جديد للمقال:</span>
                </h4>

                {/* Mode Selector */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setImageUploadMode("url")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                      imageUploadMode === "url"
                        ? "bg-emerald-600 text-white shadow-2xs"
                        : "bg-white text-slate-700 border border-slate-200"
                    }`}
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>رابط صورة مباشر (URL)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setImageUploadMode("upload")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                      imageUploadMode === "upload"
                        ? "bg-emerald-600 text-white shadow-2xs"
                        : "bg-white text-slate-700 border border-slate-200"
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>رفع صورة من الجهاز</span>
                  </button>
                </div>

                <form onSubmit={handleAddImage} className="space-y-3">
                  {imageUploadMode === "url" ? (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">رابط الصورة (URL):</label>
                      <input
                        type="text"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-bold bg-white"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">اختر ملف الصورة من جهازك:</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold bg-white file:ml-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-100 file:text-emerald-800 hover:file:bg-emerald-200 cursor-pointer"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">عنوان الصورة (اختياري):</label>
                      <input
                        type="text"
                        value={newImageTitle}
                        onChange={(e) => setNewImageTitle(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold bg-white"
                        placeholder="مثال: خطاطة خطوات نهج التقصي العلمي"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">تعليق توضيحي (Caption):</label>
                      <input
                        type="text"
                        value={newImageCaption}
                        onChange={(e) => setNewImageCaption(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs bg-white"
                        placeholder="مثال: من كراسة النشاط العلمي المعتمدة"
                      />
                    </div>
                  </div>

                  {newImageUrl && (
                    <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-3">
                      <img
                        src={newImageUrl}
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded-lg border border-slate-200"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://placehold.co/100x100?text=Error";
                        }}
                      />
                      <div className="text-xs text-slate-600">
                        <p className="font-bold text-slate-800">معاينة الصورة المحددة</p>
                        <p className="text-[11px] truncate max-w-md">{newImageUrl.slice(0, 60)}...</p>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>إضافة الصورة إلى المقال</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Current Images List */}
              <div className="space-y-3">
                <h4 className="font-black text-sm text-slate-900 flex items-center justify-between">
                  <span>الصور والمخططات المرفقة بهذا المقال ({formData.images?.length || 0}):</span>
                </h4>

                {formData.images && formData.images.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.images.map((img) => (
                      <div
                        key={img.id}
                        className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs group relative flex flex-col"
                      >
                        <div className="h-36 bg-slate-100 overflow-hidden relative">
                          <img
                            src={img.url}
                            alt={img.title || "Image"}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://placehold.co/400x300?text=No+Image";
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(img.id)}
                            className="absolute top-2 left-2 bg-rose-600 text-white p-1.5 rounded-lg text-xs shadow-xs hover:bg-rose-700 cursor-pointer"
                            title="حذف هذه الصورة"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="p-3 flex-1 flex flex-col justify-between">
                          <div>
                            <h5 className="font-bold text-xs text-slate-900 truncate">
                              {img.title || "صورة بدون عنوان"}
                            </h5>
                            {img.caption && (
                              <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                                {img.caption}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-2">
                    <ImageIcon className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="text-xs text-slate-500 font-bold">لا توجد صور مرفقة بهذا المقال بعد.</p>
                    <p className="text-[11px] text-slate-400">يمكنك إضافة صور أو مخططات ديداكتيكية باستخدام النموذج أعلاه.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: DOWNLOAD FILES */}
          {activeTab === "downloads" && (
            <div className="space-y-6">
              {/* Add New Download File Box */}
              <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-5 space-y-4">
                <h4 className="font-black text-sm text-blue-950 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-blue-600" />
                  <span>إضافة رابط تحميل جديد لهذا المقال:</span>
                </h4>

                <form onSubmit={handleAddDownloadFile} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">عنوان الملف / الرابط *:</label>
                      <input
                        type="text"
                        required
                        value={newFileTitle}
                        onChange={(e) => setNewFileTitle(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-bold bg-white"
                        placeholder="مثال: دلائل ديداكتيك النشاط العلمي PDF"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">رابط التحميل المباشر *:</label>
                      <input
                        type="text"
                        required
                        value={newFileUrl}
                        onChange={(e) => setNewFileUrl(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-bold bg-white"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">نوع الملف:</label>
                      <select
                        value={newFileType}
                        onChange={(e) => setNewFileType(e.target.value as any)}
                        className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold bg-white"
                      >
                        <option value="pdf">PDF (وثيقة إلكترونية)</option>
                        <option value="word">Word (مستند وورد)</option>
                        <option value="excel">Excel (جدول إكسيل)</option>
                        <option value="image">صورة / مخطط</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">حجم الملف (تقريبي):</label>
                      <input
                        type="text"
                        value={newFileSize}
                        onChange={(e) => setNewFileSize(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs bg-white"
                        placeholder="مثال: 3.5 MB"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">سنة الإصدار / الطبعة:</label>
                      <input
                        type="text"
                        value={newFileYear}
                        onChange={(e) => setNewFileYear(e.target.value)}
                        className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs bg-white"
                        placeholder="2024 أو وزاري"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>إضافة رابط التحميل</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Current Download Files List */}
              <div className="space-y-3">
                <h4 className="font-black text-sm text-slate-900 flex items-center justify-between">
                  <span>روابط التحميل المرفقة بهذا المقال ({formData.downloadFiles?.length || 0}):</span>
                </h4>

                {formData.downloadFiles && formData.downloadFiles.length > 0 ? (
                  <div className="space-y-2.5">
                    {formData.downloadFiles.map((file) => (
                      <div
                        key={file.id}
                        className="bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-4 flex items-center justify-between gap-3 shadow-2xs hover:border-slate-300 transition"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0">
                            <FileDown className="w-5 h-5" />
                          </div>
                          <div>
                            <h5 className="font-bold text-xs sm:text-sm text-slate-900">{file.title}</h5>
                            <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                              <span className="bg-slate-100 text-slate-700 px-2 py-0.2 rounded-md font-bold">
                                {file.fileType?.toUpperCase() || "PDF"}
                              </span>
                              <span>الحجم: {file.size}</span>
                              <span>•</span>
                              <span>السنة: {file.year}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-xl text-xs font-bold transition flex items-center gap-1"
                            title="اختبار الرابط"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          <button
                            type="button"
                            onClick={() => handleRemoveDownloadFile(file.id)}
                            className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 p-2 rounded-xl transition cursor-pointer"
                            title="حذف هذا الرابط"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-2">
                    <FileDown className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="text-xs text-slate-500 font-bold">لا توجد روابط تحميل مخصصة لهذا المقال بعد.</p>
                    <p className="text-[11px] text-slate-400">يمكنك إضافة روابط مستندات ودلائل باستخدام النموذج أعلاه.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: QCM QUESTIONS */}
          {activeTab === "qcm" && (
            <div className="space-y-6">
              {/* Add QCM Box */}
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 space-y-4">
                <h4 className="font-black text-sm text-amber-950 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-amber-600" />
                  <span>إضافة سؤال تفاعلي (QCM) جديد:</span>
                </h4>

                <form onSubmit={handleAddQcmQuestion} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">نص السؤال *:</label>
                    <input
                      type="text"
                      required
                      value={newQuestionText}
                      onChange={(e) => setNewQuestionText(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-bold bg-white"
                      placeholder="اكتب نص السؤال هنا..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {newOptions.map((opt, optIdx) => (
                      <div key={optIdx}>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[11px] font-bold text-slate-700">
                            الخيار {String.fromCharCode(65 + optIdx)} ({optIdx === newCorrectIdx ? "✅ الإجابة الصحيحة" : "خيار"})
                          </label>
                          <input
                            type="radio"
                            name="correct_option"
                            checked={newCorrectIdx === optIdx}
                            onChange={() => setNewCorrectIdx(optIdx)}
                            className="cursor-pointer"
                          />
                        </div>
                        <input
                          type="text"
                          required
                          value={opt}
                          onChange={(e) => {
                            const updated = [...newOptions];
                            updated[optIdx] = e.target.value;
                            setNewOptions(updated);
                          }}
                          className={`w-full border rounded-xl px-3 py-2 text-xs bg-white ${
                            newCorrectIdx === optIdx
                              ? "border-emerald-500 ring-1 ring-emerald-400 font-bold"
                              : "border-slate-300"
                          }`}
                          placeholder={`نص الخيار ${String.fromCharCode(65 + optIdx)}`}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">شرح وتوضيح الإجابة الصحيحة (اختياري):</label>
                    <input
                      type="text"
                      value={newExplanation}
                      onChange={(e) => setNewExplanation(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-xs bg-white"
                      placeholder="تفسير المرجع الديداكتيكي للحل الصحيح..."
                    />
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>إضافة السؤال</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Current QCM list */}
              <div className="space-y-3">
                <h4 className="font-black text-sm text-slate-900">
                  الأسئلة المسجلة لهذا المقال ({formData.qcmQuestions?.length || 0}):
                </h4>

                {formData.qcmQuestions && formData.qcmQuestions.length > 0 ? (
                  <div className="space-y-3">
                    {formData.qcmQuestions.map((q, qIdx) => (
                      <div
                        key={qIdx}
                        className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2 shadow-2xs relative"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="font-bold text-xs sm:text-sm text-slate-900">
                            {qIdx + 1}. {q.question}
                          </h5>
                          <button
                            type="button"
                            onClick={() => handleRemoveQcmQuestion(qIdx)}
                            className="text-rose-600 hover:text-rose-700 p-1"
                            title="حذف هذا السؤال"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {q.options.map((opt, oIdx) => (
                            <div
                              key={oIdx}
                              className={`p-2 rounded-xl border ${
                                oIdx === q.correctIndex
                                  ? "bg-emerald-50 border-emerald-300 text-emerald-950 font-bold"
                                  : "bg-slate-50 border-slate-200 text-slate-700"
                              }`}
                            >
                              <span>{String.fromCharCode(65 + oIdx)}. </span>
                              <span>{opt}</span>
                            </div>
                          ))}
                        </div>

                        {q.explanation && (
                          <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-xl border border-amber-200">
                            💡 {q.explanation}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-2">
                    <HelpCircle className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="text-xs text-slate-500 font-bold">لا توجد أسئلة QCM مضافة لهذا المكون بعد.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-5 flex items-center justify-between gap-3 shrink-0">
          <div>
            {!isNew && onDelete && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("هل أنت متأكد من رغبتك في حذف هذا المقال وجميع محتوياته؟")) {
                    onDelete(formData.id, subjectId);
                    onClose();
                  }
                }}
                className="text-rose-600 hover:text-rose-700 text-xs font-bold flex items-center gap-1 px-3 py-2 rounded-xl hover:bg-rose-50 transition cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>حذف هذا المقال</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              إلغاء
            </button>

            <button
              type="button"
              onClick={() => {
                if (!formData.title.trim()) {
                  alert("يرجى إدخال عنوان المقال");
                  return;
                }
                onSave(formData, subjectId, isNew);
                onClose();
              }}
              className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2.5 rounded-xl text-xs font-black shadow-md transition cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>حفظ المقال والمحتويات</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
