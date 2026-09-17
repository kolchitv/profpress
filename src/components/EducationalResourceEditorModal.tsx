import React, { useState } from "react";
import {
  X,
  Save,
  FileText,
  Download,
  Link as LinkIcon,
  Plus,
  Trash2,
  ExternalLink,
  BookOpen,
  Calendar,
  Tag,
  AlertCircle,
  HardDrive,
  FileSpreadsheet,
  CheckCircle2,
  Sparkles,
  Zap,
} from "lucide-react";
import {
  EducationalResourceItem,
  DownloadLinkItem,
  FileTypeOption,
} from "../types";
import { DownloadGatewayModal } from "./DownloadGatewayModal";

interface EducationalResourceEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (resource: EducationalResourceItem) => void;
  initialResource?: EducationalResourceItem | null;
  levelTitle?: string;
  subjectsList?: string[];
}

export const EducationalResourceEditorModal: React.FC<EducationalResourceEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialResource,
  levelTitle = "المستوى التعليمي",
  subjectsList = [
    "عام",
    "اللغة العربية",
    "الفرنسية",
    "الرياضيات",
    "النشاط العلمي",
    "التربية الإسلامية",
    "التربية الفنية",
    "التربية البدنية",
    "الأمازيغية",
    "اللغة الإنجليزية",
    "الفيزياء والكيمياء",
    "علوم الحياة والأرض",
    "الاجتماعيات",
    "الفلسفة",
    "الإعلاميات",
  ],
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState(initialResource?.title || "");
  const [subject, setSubject] = useState(initialResource?.subject || "عام");
  const [category, setCategory] = useState<
    "lessons" | "exams" | "planning" | "guidelines" | "textbooks"
  >(initialResource?.category || "planning");
  const [format, setFormat] = useState(initialResource?.format || "DOCX / PDF");
  const [description, setDescription] = useState(initialResource?.description || "");
  const [content, setContent] = useState(initialResource?.content || "");
  const [tagsInput, setTagsInput] = useState(initialResource?.tags?.join("، ") || "");
  const [updatedDate, setUpdatedDate] = useState(
    initialResource?.updatedDate || "شتنبر 2026"
  );

  // Primary Download Link
  const [downloadUrl, setDownloadUrl] = useState(
    initialResource?.downloadUrl && initialResource.downloadUrl !== "#"
      ? initialResource.downloadUrl
      : ""
  );
  const [downloadLabel, setDownloadLabel] = useState(
    initialResource?.downloadLabel || "تحميل الوثيقة الرسمية بصيغة PDF / DOCX"
  );

  // Multi-file downloads list
  const [downloads, setDownloads] = useState<DownloadLinkItem[]>(() => {
    if (initialResource?.downloads && initialResource.downloads.length > 0) {
      return initialResource.downloads;
    }
    return [];
  });

  // State for previewing download gateway
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

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Categories helper
  const categoryOptions = [
    { id: "planning", label: "التوازيع والتخطيط التربوي" },
    { id: "exams", label: "الامتحانات والفروض والمراقبة المستمرة" },
    { id: "lessons", label: "الجذاذات والدروس وكراسات الدعم" },
    { id: "guidelines", label: "الأطر المرجعية والخرائط الذهنية" },
    { id: "textbooks", label: "دلائل الأستاذ وكراسات التلميذ" },
  ] as const;

  const handleAddDownloadLink = () => {
    const newItem: DownloadLinkItem = {
      id: `dl_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
      label: `رابط تحميل إضافي (${downloads.length + 1})`,
      url: "",
      fileType: "pdf",
      fileSize: "2.5 MB",
      note: "تحميل مباشر",
    };
    setDownloads([...downloads, newItem]);
  };

  const handleUpdateDownloadLink = (
    id: string,
    field: keyof DownloadLinkItem,
    value: any
  ) => {
    setDownloads(
      downloads.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleRemoveDownloadLink = (id: string) => {
    setDownloads(downloads.filter((item) => item.id !== id));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg("يرجى إدخال عنوان الوثيقة أو الموضوع");
      return;
    }

    const tagsArray = tagsInput
      .split(/[,،]/)
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const updatedResource: EducationalResourceItem = {
      id: initialResource?.id || `res_${Date.now()}`,
      title: title.trim(),
      subject,
      category,
      format: format.trim() || "PDF",
      description: description.trim(),
      content: content.trim() || undefined,
      downloadUrl: downloadUrl.trim() || "#",
      downloadLabel: downloadLabel.trim() || undefined,
      downloads: downloads.filter((d) => d.url.trim() !== ""),
      updatedDate: updatedDate.trim() || "شتنبر 2026",
      downloadsCount: initialResource?.downloadsCount || 120,
      featured: initialResource?.featured || false,
      tags: tagsArray.length > 0 ? tagsArray : ["وثائق تربوية", levelTitle],
    };

    onSave(updatedResource);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
        <div
          className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] text-right font-sans"
          dir="rtl"
        >
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 text-white p-4 sm:p-5 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-purple-300 font-bold border border-white/10">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-sm sm:text-base text-white flex items-center gap-2">
                  <span>{initialResource ? "تعديل الوثيقة وروابط التحميل" : "إضافة وثيقة وموضوع جديد"}</span>
                  <span className="text-[11px] bg-purple-500/30 text-purple-200 font-bold px-2 py-0.5 rounded-md border border-purple-400/30">
                    {levelTitle}
                  </span>
                </h3>
                <p className="text-xs text-purple-200/80">
                  تعديل العنوان، الوصف، المادة، وروابط التحميل (Google Drive / Mediafire / PDF)
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-xl transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body Form */}
          <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            {errorMsg && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Subject & Category Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  المادة الدراسية:
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-purple-500"
                >
                  {subjectsList.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  تصنيف الوثيقة:
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-purple-500"
                >
                  {categoryOptions.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  صيغة الملف (Format):
                </label>
                <input
                  type="text"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  placeholder="DOCX / PDF أو PDF جاهز للطباعة"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                عنوان الوثيقة أو الموضوع: <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errorMsg) setErrorMsg(null);
                }}
                placeholder="مثال: التوزيع السنوي الشامل لجميع مواد المستوى الأول ابتدائي 2026/2027..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Description / Summary */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                الوصف والملاحظات البيداغوجية:
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="اكتب نبذة عن هذه الوثيقة، المراجع المعتمدة، وأهداف التوزيع أو الفرض..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 leading-relaxed focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Content / Article text (Optional) */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                محتوى تفصيلي أو توجيهات الشرح (يظهر عند فتح الموضوع في نافذة المعاينة):
              </label>
              <textarea
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="يمكنك كتابة نص توجيهي كامل، إرشادات للأستاذ، أو محاور الوثيقة..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 leading-relaxed font-sans focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* ========================================================================= */}
            {/* DOWNLOAD LINKS & ATTACHMENTS EDITING SECTION                              */}
            {/* ========================================================================= */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                    <Download className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
                      <span>إدارة روابط وملفات التحميل</span>
                      <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">
                        بوابة التحميل وأدسنس
                      </span>
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      ضع روابط التحميل المباشرة، Google Drive، أو Mediafire لتحويل الزوار عبر بوابة التحميل الآمنة.
                    </p>
                  </div>
                </div>

                {downloadUrl && downloadUrl !== "#" && (
                  <button
                    type="button"
                    onClick={() =>
                      setPreviewGatewayFile({
                        isOpen: true,
                        title: downloadLabel || title || "ملف التحميل",
                        url: downloadUrl,
                        type: format.toLowerCase().includes("doc") ? "word" : "pdf",
                        size: "3.5 MB",
                      })
                    }
                    className="text-[11px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold px-3 py-1.5 rounded-xl border border-indigo-200 flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto"
                  >
                    <Zap className="w-3.5 h-3.5 text-indigo-600" />
                    <span>معاينة بوابة التحميل</span>
                  </button>
                )}
              </div>

              {/* Primary Download Link */}
              <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-800 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                    <span>رابط التحميل الأساسي (Primary Download Link):</span>
                  </span>
                  <span className="text-[10px] text-slate-400">الرابط المباشر للزر الرئيسي</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <LinkIcon className="w-3 h-3 text-purple-600" />
                        <span>رابط التحميل (URL / Google Drive / Mediafire):</span>
                      </span>
                      {downloadUrl && (
                        <a
                          href={downloadUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] text-purple-600 hover:underline flex items-center gap-0.5"
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
                      placeholder="https://drive.google.com/file/d/... أو https://mediafire.com/..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-mono text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      نص زر التحميل:
                    </label>
                    <input
                      type="text"
                      value={downloadLabel}
                      onChange={(e) => setDownloadLabel(e.target.value)}
                      placeholder="تحميل الوثيقة بصيغة PDF / DOCX"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                {/* Quick Link Helpers */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] text-slate-400 font-medium">نماذج سريعة:</span>
                  <button
                    type="button"
                    onClick={() => setDownloadUrl("https://drive.google.com")}
                    className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded cursor-pointer"
                  >
                    Google Drive
                  </button>
                  <button
                    type="button"
                    onClick={() => setDownloadUrl("https://www.mediafire.com")}
                    className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded cursor-pointer"
                  >
                    Mediafire
                  </button>
                  <button
                    type="button"
                    onClick={() => setDownloadUrl("#")}
                    className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded cursor-pointer"
                  >
                    طباعة مباشرة / افتراضي (#)
                  </button>
                </div>
              </div>

              {/* Additional Multi-file Downloads */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-slate-800">
                      روابط وملفات إضافية تابعة لهذا الموضوع ({downloads.length})
                    </span>
                    <span className="text-[10px] text-slate-500">(بصيغ مختلفة مثل Word, Excel, PDF)</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddDownloadLink}
                    className="text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold px-3 py-1 rounded-xl border border-purple-200 flex items-center gap-1 transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>إضافة رابط إضافي</span>
                  </button>
                </div>

                {downloads.length > 0 && (
                  <div className="space-y-2.5">
                    {downloads.map((dl, idx) => (
                      <div
                        key={dl.id}
                        className="bg-white border border-slate-200 rounded-xl p-3 space-y-2 text-xs shadow-2xs relative"
                      >
                        <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                          <span className="font-bold text-slate-700 flex items-center gap-1.5 text-[11px]">
                            <span className="w-4 h-4 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-[10px] font-bold">
                              {idx + 1}
                            </span>
                            <span>ملف إضافي #{idx + 1}</span>
                          </span>

                          <button
                            type="button"
                            onClick={() => handleRemoveDownloadLink(dl.id)}
                            className="text-rose-500 hover:text-rose-700 p-1 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                            title="حذف هذا الرابط"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                          <div className="sm:col-span-5">
                            <label className="block text-[10px] text-slate-500 mb-0.5">
                              عنوان أو اسم الملف:
                            </label>
                            <input
                              type="text"
                              value={dl.label}
                              onChange={(e) =>
                                handleUpdateDownloadLink(dl.id, "label", e.target.value)
                              }
                              placeholder="مثال: بصيغة Word قابلة للتعديل DOCX"
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs font-bold"
                            />
                          </div>

                          <div className="sm:col-span-7">
                            <label className="block text-[10px] text-slate-500 mb-0.5">
                              رابط الملف المباشر:
                            </label>
                            <input
                              type="url"
                              value={dl.url}
                              onChange={(e) =>
                                handleUpdateDownloadLink(dl.id, "url", e.target.value)
                              }
                              placeholder="https://..."
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs font-mono"
                              dir="ltr"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 pt-1">
                          <div>
                            <label className="block text-[10px] text-slate-500 mb-0.5">
                              نوع الملف:
                            </label>
                            <select
                              value={dl.fileType || "pdf"}
                              onChange={(e) =>
                                handleUpdateDownloadLink(
                                  dl.id,
                                  "fileType",
                                  e.target.value as FileTypeOption
                                )
                              }
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-1 text-[11px] font-bold"
                            >
                              <option value="pdf">PDF</option>
                              <option value="word">Word (DOCX)</option>
                              <option value="excel">Excel (XLSX)</option>
                              <option value="drive">Google Drive</option>
                              <option value="mediafire">Mediafire</option>
                              <option value="zip">ملف مضغوط ZIP</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[10px] text-slate-500 mb-0.5">
                              حجم الملف التقريبي:
                            </label>
                            <input
                              type="text"
                              value={dl.fileSize || ""}
                              onChange={(e) =>
                                handleUpdateDownloadLink(dl.id, "fileSize", e.target.value)
                              }
                              placeholder="2.5 MB"
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-1 text-[11px]"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] text-slate-500 mb-0.5">
                              ملاحظة (اختياري):
                            </label>
                            <input
                              type="text"
                              value={dl.note || ""}
                              onChange={(e) =>
                                handleUpdateDownloadLink(dl.id, "note", e.target.value)
                              }
                              placeholder="تحميل مباشر"
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-1 text-[11px]"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Tags and Updated Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  الوسوم والكلمات الدلالية (مفصولة بفواصل):
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="توزيع سنوي، 1AEP، المنهاج المنقح، الريادة"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  تاريخ التحيين أو الصدور:
                </label>
                <input
                  type="text"
                  value={updatedDate}
                  onChange={(e) => setUpdatedDate(e.target.value)}
                  placeholder="شتنبر 2026"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Form Action Buttons */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3 sticky bottom-0 bg-white/95 backdrop-blur-xs py-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition cursor-pointer"
              >
                إلغاء
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-black text-xs flex items-center gap-2 transition cursor-pointer shadow-md active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>حفظ التعديلات والروابط</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Gateway Preview Modal */}
      {previewGatewayFile.isOpen && (
        <DownloadGatewayModal
          isOpen={previewGatewayFile.isOpen}
          onClose={() =>
            setPreviewGatewayFile({
              isOpen: false,
              title: "",
              url: "",
              type: "pdf",
            })
          }
          fileTitle={previewGatewayFile.title}
          targetDownloadUrl={previewGatewayFile.url}
          fileType={previewGatewayFile.type}
          fileSize={previewGatewayFile.size}
        />
      )}
    </>
  );
};
