import React, { useState } from "react";
import { InspectionExamSession } from "../data/primaryKnowledgeData";
import {
  Download,
  ExternalLink,
  Edit3,
  Trash2,
  Plus,
  CheckCircle2,
  AlertCircle,
  FileText,
  X,
  Sparkles,
  Layers,
  FileDown,
} from "lucide-react";

// The authentic Google Drive SVG Icon
export const GoogleDriveIcon: React.FC<{ className?: string }> = ({
  className = "w-8 h-8",
}) => (
  <svg
    viewBox="0 0 87.3 78"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5z"
      fill="#0066da"
    />
    <path
      d="M43.65 25 29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44C.4 49.9 0 51.45 0 53h27.5z"
      fill="#00ac47"
    />
    <path
      d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.8l5.85 10.15z"
      fill="#ea4335"
    />
    <path
      d="M43.65 25 57.4 1.2C56.05.4 54.5 0 52.95 0H34.35c-1.55 0-3.1.4-4.45 1.2z"
      fill="#00832d"
    />
    <path
      d="M59.8 53H87.3c0-1.55-.4-3.1-1.2-4.5l-13.75-23.8c-.8-1.4-1.95-2.5-3.3-3.3L56.05 45.4z"
      fill="#ffba00"
    />
    <path
      d="M73.55 76.8H27.5L13.75 53h59.8c1.55 0 3.1-.4 4.45-1.2l-4.45 25z"
      fill="#2684fc"
    />
  </svg>
);

// Sleek monochromatic/indigo Google Drive Icon matching screenshot
export const GoogleDriveStylizedIcon: React.FC<{ className?: string }> = ({
  className = "w-10 h-10",
}) => (
  <div className="relative flex items-center justify-center">
    <svg
      viewBox="0 0 87.3 78"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5z"
        className="text-[#3b82f6]"
      />
      <path
        d="M43.65 25 29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44C.4 49.9 0 51.45 0 53h27.5z"
        className="text-[#6366f1]"
      />
      <path
        d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.8l5.85 10.15z"
        className="text-[#818cf8]"
      />
      <path
        d="M43.65 25 57.4 1.2C56.05.4 54.5 0 52.95 0H34.35c-1.55 0-3.1.4-4.45 1.2z"
        className="text-[#4f46e5]"
      />
      <path
        d="M59.8 53H87.3c0-1.55-.4-3.1-1.2-4.5l-13.75-23.8c-.8-1.4-1.95-2.5-3.3-3.3L56.05 45.4z"
        className="text-[#a5b4fc]"
      />
      <path
        d="M73.55 76.8H27.5L13.75 53h59.8c1.55 0 3.1-.4 4.45-1.2l-4.45 25z"
        className="text-[#4338ca]"
      />
    </svg>
  </div>
);

interface Props {
  sessions: InspectionExamSession[];
  subjectTitle?: string;
  isEditable?: boolean;
  onUpdateSessions?: (updatedSessions: InspectionExamSession[]) => void;
  onTriggerDownload?: (session: InspectionExamSession) => void;
}

export const GoogleDriveExamSessionsGrid: React.FC<Props> = ({
  sessions,
  subjectTitle = "اللغة العربية",
  isEditable = false,
  onUpdateSessions,
  onTriggerDownload,
}) => {
  // Modal for previewing / choosing action on click
  const [activeSession, setActiveSession] = useState<InspectionExamSession | null>(null);

  // Edit / Add modal state
  const [editingSession, setEditingSession] = useState<{
    session: InspectionExamSession;
    isNew: boolean;
  } | null>(null);

  const handleCardClick = (session: InspectionExamSession) => {
    setActiveSession(session);
  };

  const handleOpenGoogleDrive = (url: string) => {
    const validUrl = url && url !== "#" ? url : "https://drive.google.com";
    window.open(validUrl, "_blank", "noopener,noreferrer");
  };

  const handleSaveSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSession || !onUpdateSessions) return;

    const { session, isNew } = editingSession;
    if (!session.title.trim()) {
      alert("يرجى إدخال اسم الدورة أو السنة");
      return;
    }

    let updated: InspectionExamSession[];
    if (isNew) {
      updated = [session, ...sessions];
    } else {
      updated = sessions.map((s) => (s.id === session.id ? session : s));
    }

    onUpdateSessions(updated);
    setEditingSession(null);
  };

  const handleDeleteSession = (id: string, title: string) => {
    if (!onUpdateSessions) return;
    if (window.confirm(`هل أنت متأكد من حذف ${title}؟`)) {
      const updated = sessions.filter((s) => s.id !== id);
      onUpdateSessions(updated);
      if (activeSession?.id === id) setActiveSession(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Title and Add Button */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <GoogleDriveIcon className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              أرشيف نماذج امتحانات مباراة التفتيش على Google Drive
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            نماذج مواضيع الاختبارات الكتابية السابقة مع عناصر الإجابة الرسمية وسلم التنقيط
          </p>
        </div>

        {isEditable && onUpdateSessions && (
          <button
            type="button"
            onClick={() =>
              setEditingSession({
                session: {
                  id: `session_${Date.now()}`,
                  title: `دورة ${new Date().getFullYear()}`,
                  year: new Date().getFullYear().toString(),
                  driveUrl: "https://drive.google.com",
                  description: "موضوع الاختبار مع عناصر الإجابة الرسمية",
                  fileSize: "2.5 MB",
                  hasAnswerKey: true,
                },
                isNew: true,
              })
            }
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer transition"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة دورة جديدة</span>
          </button>
        )}
      </div>

      {/* The 8 Cards Grid (2 rows x 4 cols on desktop matching screenshot) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5">
        {sessions.map((session) => (
          <div
            key={session.id}
            onClick={() => handleCardClick(session)}
            className="group relative bg-white border-2 border-dashed border-indigo-200/90 hover:border-indigo-500 rounded-2xl p-4 sm:p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer flex flex-col items-center justify-center text-center gap-2.5 min-h-[110px] sm:min-h-[125px]"
          >
            {/* Admin Controls */}
            {isEditable && onUpdateSessions && (
              <div className="absolute top-2 left-2 flex items-center gap-1 z-10">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingSession({ session: { ...session }, isNew: false });
                  }}
                  className="bg-white/90 hover:bg-white text-blue-600 p-1.5 rounded-lg border border-slate-200 shadow-2xs hover:scale-105 transition"
                  title="تعديل الرابط والمعطيات"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteSession(session.id, session.title);
                  }}
                  className="bg-white/90 hover:bg-rose-50 text-rose-600 p-1.5 rounded-lg border border-slate-200 shadow-2xs hover:scale-105 transition"
                  title="حذف الدورة"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Google Drive Icon */}
            <div className="transition-transform group-hover:scale-110 duration-200">
              <GoogleDriveStylizedIcon className="w-9 h-9 sm:w-11 sm:h-11" />
            </div>

            {/* Session Title (e.g. دورة أبريل 2024, دورة 2023) */}
            <span className="font-black text-slate-800 text-xs sm:text-sm group-hover:text-indigo-600 transition-colors">
              {session.title}
            </span>

            {/* Badge for Answer Key */}
            {session.hasAnswerKey && (
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-md border border-emerald-200/60">
                مرفق بعناصر الإجابة
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Session Details / Download Modal */}
      {activeSession && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 font-cairo animate-in fade-in duration-150">
          <div
            className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden text-right"
            dir="rtl"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white p-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                  <GoogleDriveIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-indigo-300 font-bold">
                    مباراة التفتيش التربوي • {subjectTitle}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    {activeSession.title}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveSession(null)}
                className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 sm:p-6 space-y-4">
              <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span className="font-bold text-indigo-950">سنة الامتحان:</span>
                  <span className="font-black text-indigo-700">{activeSession.year}</span>
                </div>
                {activeSession.fileSize && (
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span className="font-bold text-indigo-950">حجم الملف:</span>
                    <span className="font-bold">{activeSession.fileSize}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span className="font-bold text-indigo-950">التصحيح وسلم التنقيط:</span>
                  <span className="font-black text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>متوفر ومعتمد رسمياً</span>
                  </span>
                </div>
              </div>

              {activeSession.description && (
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  {activeSession.description}
                </p>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleOpenGoogleDrive(activeSession.driveUrl)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition active:scale-95 cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>فتح في Google Drive</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (onTriggerDownload) {
                      onTriggerDownload(activeSession);
                    } else {
                      window.open(
                        activeSession.directUrl || activeSession.driveUrl,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }
                  }}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition active:scale-95 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>تحميل ملف PDF</span>
                </button>
              </div>

              {isEditable && onUpdateSessions && (
                <div className="pt-2 border-t border-slate-100 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingSession({ session: { ...activeSession }, isNew: false });
                      setActiveSession(null);
                    }}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>تعديل بيانات ورابط هذه الدورة</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit / Add Session Modal */}
      {editingSession && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 font-cairo animate-in fade-in duration-150">
          <div
            className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden text-right"
            dir="rtl"
          >
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
              <h3 className="font-black text-sm text-white flex items-center gap-2">
                <GoogleDriveIcon className="w-4 h-4" />
                <span>
                  {editingSession.isNew
                    ? "إضافة دورة امتحانات جديدة"
                    : `تعديل: ${editingSession.session.title}`}
                </span>
              </h3>
              <button
                type="button"
                onClick={() => setEditingSession(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSession} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">
                  اسم الدورة / العنوان
                </label>
                <input
                  type="text"
                  value={editingSession.session.title}
                  onChange={(e) =>
                    setEditingSession({
                      ...editingSession,
                      session: { ...editingSession.session, title: e.target.value },
                    })
                  }
                  placeholder="مثال: دورة أبريل 2024 أو دورة 2025"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-hidden"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">السنة</label>
                  <input
                    type="text"
                    value={editingSession.session.year}
                    onChange={(e) =>
                      setEditingSession({
                        ...editingSession,
                        session: { ...editingSession.session, year: e.target.value },
                      })
                    }
                    placeholder="2024"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">حجم الملف</label>
                  <input
                    type="text"
                    value={editingSession.session.fileSize || "2.5 MB"}
                    onChange={(e) =>
                      setEditingSession({
                        ...editingSession,
                        session: { ...editingSession.session, fileSize: e.target.value },
                      })
                    }
                    placeholder="2.5 MB"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">
                  رابط Google Drive (مجلد أو ملف الاختبار والتصحيح)
                </label>
                <input
                  type="url"
                  value={editingSession.session.driveUrl}
                  onChange={(e) =>
                    setEditingSession({
                      ...editingSession,
                      session: { ...editingSession.session, driveUrl: e.target.value },
                    })
                  }
                  placeholder="https://drive.google.com/drive/folders/..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-hidden text-left"
                  dir="ltr"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">
                  رابط التحميل المباشر (اختياري)
                </label>
                <input
                  type="url"
                  value={editingSession.session.directUrl || ""}
                  onChange={(e) =>
                    setEditingSession({
                      ...editingSession,
                      session: { ...editingSession.session, directUrl: e.target.value },
                    })
                  }
                  placeholder="https://www.profpress.net/download/..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-hidden text-left"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">
                  الوصف والملاحظات
                </label>
                <textarea
                  rows={2}
                  value={editingSession.session.description || ""}
                  onChange={(e) =>
                    setEditingSession({
                      ...editingSession,
                      session: { ...editingSession.session, description: e.target.value },
                    })
                  }
                  placeholder="موضوع الاختبار مع عناصر الإجابة الرسمية وسلم التنقيط..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-hidden"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black py-2.5 rounded-xl cursor-pointer shadow-xs transition"
                >
                  حفظ المعطيات
                </button>
                <button
                  type="button"
                  onClick={() => setEditingSession(null)}
                  className="px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2.5 rounded-xl cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
