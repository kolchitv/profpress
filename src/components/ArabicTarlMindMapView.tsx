import React, { useState, useEffect } from "react";
import {
  Printer,
  Sparkles,
  RotateCcw,
  Save,
  Download,
  BookOpen,
  Edit3,
  Eye,
  CheckCircle2,
  Copy,
  Layers,
  FileText,
  User,
  Calendar,
  Clock,
  Plus,
  Trash2,
} from "lucide-react";
import { TeacherProfile } from "../types";
import {
  ARABIC_TARL_MINDMAPS,
  ArabicTarlMindMapSession,
} from "../data/mindMapsData";

interface ArabicTarlMindMapViewProps {
  teacherProfile?: TeacherProfile;
  initialSessionId?: string;
  onNavigateToTab?: (tab: string) => void;
}

export const ArabicTarlMindMapView: React.FC<ArabicTarlMindMapViewProps> = ({
  teacherProfile,
  initialSessionId = "tarl-ar-m3-story-s1",
  onNavigateToTab,
}) => {
  const [sessions, setSessions] = useState<ArabicTarlMindMapSession[]>(() => {
    try {
      const saved = localStorage.getItem("profpress_arabic_tarl_mindmaps");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ARABIC_TARL_MINDMAPS;
  });

  const [selectedIdx, setSelectedIdx] = useState<number>(() => {
    const idx = ARABIC_TARL_MINDMAPS.findIndex((s) => s.id === initialSessionId);
    return idx >= 0 ? idx : 0;
  });

  useEffect(() => {
    if (initialSessionId) {
      const idx = sessions.findIndex((s) => s.id === initialSessionId);
      if (idx >= 0) setSelectedIdx(idx);
    }
  }, [initialSessionId, sessions]);

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [copiedSuccess, setCopiedSuccess] = useState<boolean>(false);

  const currentSession = sessions[selectedIdx] || sessions[0];

  const updateCurrent = (field: keyof ArabicTarlMindMapSession, val: any) => {
    const updated = [...sessions];
    updated[selectedIdx] = { ...updated[selectedIdx], [field]: val };
    setSessions(updated);
  };

  const updateSection = (
    sectionKey: keyof ArabicTarlMindMapSession["sections"],
    field: "title" | "items",
    val: any
  ) => {
    const updated = [...sessions];
    updated[selectedIdx] = {
      ...updated[selectedIdx],
      sections: {
        ...updated[selectedIdx].sections,
        [sectionKey]: {
          ...updated[selectedIdx].sections[sectionKey],
          [field]: val,
        },
      },
    };
    setSessions(updated);
  };

  const handleSave = () => {
    try {
      localStorage.setItem("profpress_arabic_tarl_mindmaps", JSON.stringify(sessions));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const handleResetToDefault = () => {
    if (confirm("هل تريد استعادة النموذج الأصلي للأستاذ خالد شنيور؟")) {
      setSessions(ARABIC_TARL_MINDMAPS);
      try {
        localStorage.removeItem("profpress_arabic_tarl_mindmaps");
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const summary = `📌 ${currentSession.title}
المسار: ${currentSession.pathNumber} | اللبنة: ${currentSession.blockName} | المستوى: ${currentSession.level} | الأسبوع: ${currentSession.week} | الحصة: ${currentSession.sessionNumber}
⏱️ المدة: ${currentSession.duration} | 🛠️ الوسائل: ${currentSession.tools}
🎯 ${currentSession.objectifsTitle}
${currentSession.objectives.map((o) => `• ${o}`).join("\n")}

1. ${currentSession.sections.opening.title}:
${currentSession.sections.opening.items.join("\n")}

2. ${currentSession.sections.routineActivity.title}:
${currentSession.sections.routineActivity.items.join("\n")}

3. ${currentSession.sections.readingActivity.title}:
${currentSession.sections.readingActivity.items.join("\n")}

4. ${currentSession.sections.writingActivity.title}:
${currentSession.sections.writingActivity.items.join("\n")}

5. ${currentSession.sections.closing.title}:
${currentSession.sections.closing.items.join("\n")}

إعداد: ${currentSession.author}`;

    navigator.clipboard.writeText(summary);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 font-cairo" dir="rtl">
      {/* 1. Control Toolbar */}
      <div className="no-print bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white p-5 rounded-3xl shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1 text-right">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-amber-400 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                خطاطات طارل TaRL اللغة العربية
              </span>
              <span className="bg-blue-600/80 text-blue-100 text-xs px-2.5 py-0.5 rounded-full font-bold">
                إعداد: أ. خالد شنيور
              </span>
              <span className="bg-emerald-600/70 text-emerald-100 text-xs px-2 py-0.5 rounded-full">
                مطابقة للأصل 100%
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white">
              {currentSession.title}
            </h2>
            <p className="text-xs md:text-sm text-slate-300">
              تخطيط بصري دقيق للمسار 3 (لبنة أقصوصة) والمسارات الأخرى وفق المقاربة المعتمدة للدعم التربوي
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setIsEditMode(!isEditMode)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer shadow-md ${
                isEditMode
                  ? "bg-amber-400 text-slate-950 hover:bg-amber-300"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              {isEditMode ? <Eye className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              <span>{isEditMode ? "معاينة الطباعة" : "تعديل النصوص"}</span>
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-md"
              title="حفظ التعديلات في المتصفح"
            >
              <Save className="w-4 h-4" />
              <span>{savedSuccess ? "تم الحفظ ✓" : "حفظ"}</span>
            </button>

            <button
              type="button"
              onClick={handleCopySummary}
              className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
              title="نسخ محتوى الخطاطة"
            >
              <Copy className="w-4 h-4" />
              <span>{copiedSuccess ? "تم النسخ!" : "نسخ"}</span>
            </button>

            <button
              type="button"
              onClick={handleResetToDefault}
              className="bg-rose-900/60 hover:bg-rose-800 text-rose-100 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
              title="استعادة الأصل"
            >
              <RotateCcw className="w-4 h-4" />
              <span>استعادة</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition cursor-pointer shadow-lg active:scale-95"
            >
              <Printer className="w-4 h-4 text-amber-300" />
              <span>طباعة A4 / تصدير PDF</span>
            </button>
          </div>
        </div>

        {/* Sessions Selector Tabs */}
        <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-slate-300 ml-1">اختر الخطاطة :</span>
          {sessions.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-1.5 ${
                selectedIdx === idx
                  ? "bg-amber-400 text-slate-950 shadow-md ring-2 ring-white/40"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-200"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{s.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. THE VISUAL MIND MAP CANVAS (Matches the exact uploaded image layout) */}
      <div className="flex justify-center print:m-0 print:p-0">
        <div
          id="tarl-arabic-mindmap-printable"
          className="w-full max-w-5xl bg-white border-2 border-slate-900 rounded-2xl shadow-2xl p-6 sm:p-8 relative overflow-hidden print:border-none print:shadow-none print:p-2 print:max-w-none print:w-full print:rounded-none"
          style={{ backgroundColor: "#ffffff" }}
        >
          {/* Top Title Banner */}
          <div className="text-center mb-5">
            <div className="inline-block border-b-2 border-t-2 border-slate-900 px-8 py-1.5 rounded-xs">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-wide">
                {isEditMode ? (
                  <input
                    type="text"
                    value={currentSession.subject}
                    onChange={(e) => updateCurrent("subject", e.target.value)}
                    className="text-center font-black border border-blue-400 rounded px-2 text-lg"
                  />
                ) : (
                  `خطاطة ذهنية ${currentSession.subject}`
                )}
              </h1>
            </div>
          </div>

          {/* Header 3 Boxes Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-6 items-stretch">
            {/* Left Box: الوسائل (Cols 3) */}
            <div className="md:col-span-3 border-2 border-dashed border-slate-900 rounded-2xl p-3 text-right flex flex-col justify-start bg-slate-50/50">
              <div className="font-black text-rose-700 text-sm mb-1 pb-0.5 border-b border-rose-200">
                الوسائل:
              </div>
              {isEditMode ? (
                <textarea
                  value={currentSession.tools}
                  onChange={(e) => updateCurrent("tools", e.target.value)}
                  rows={4}
                  className="w-full text-xs font-bold p-1 border border-slate-300 rounded bg-white"
                />
              ) : (
                <div className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed whitespace-pre-line space-y-0.5">
                  {currentSession.tools.split(/[،,]/).map((tool, tIdx) => (
                    <div key={tIdx} className="text-slate-900">
                      {tool.trim()}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Middle Box: الأهداف (Cols 6) */}
            <div className="md:col-span-6 border-2 border-dashed border-slate-900 rounded-2xl p-3.5 text-right flex flex-col justify-center bg-slate-50/30">
              <div className="font-black text-rose-700 text-xs sm:text-sm mb-1.5">
                {isEditMode ? (
                  <input
                    type="text"
                    value={currentSession.objectifsTitle}
                    onChange={(e) => updateCurrent("objectifsTitle", e.target.value)}
                    className="w-full text-xs font-black text-rose-700 border border-rose-300 p-1 rounded"
                  />
                ) : (
                  currentSession.objectifsTitle
                )}
              </div>

              {isEditMode ? (
                <textarea
                  value={currentSession.objectives.join("\n")}
                  onChange={(e) => updateCurrent("objectives", e.target.value.split("\n"))}
                  rows={3}
                  className="w-full text-xs font-bold p-1.5 border border-blue-300 rounded bg-white"
                />
              ) : (
                <ul className="text-xs sm:text-sm font-bold text-slate-900 space-y-1 leading-relaxed">
                  {currentSession.objectives.map((obj, oIdx) => (
                    <li key={oIdx} className="flex items-start gap-1">
                      <span className="text-slate-900 font-black">•</span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Right Box: معلومات المسار والحصة (Cols 3) */}
            <div className="md:col-span-3 border-2 border-dashed border-slate-900 rounded-2xl p-3 text-right flex flex-col justify-between bg-slate-50/50 text-xs sm:text-sm font-bold text-slate-900 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">المسار:</span>
                <span className="font-black text-slate-900 text-sm">
                  {isEditMode ? (
                    <input
                      type="text"
                      value={currentSession.pathNumber}
                      onChange={(e) => updateCurrent("pathNumber", e.target.value)}
                      className="w-16 border rounded text-center text-xs"
                    />
                  ) : (
                    currentSession.pathNumber
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">المكون:</span>
                <span className="font-black text-slate-900">{currentSession.subject}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">الأسبوع:</span>
                <span className="font-black text-slate-900">
                  {isEditMode ? (
                    <input
                      type="text"
                      value={currentSession.week}
                      onChange={(e) => updateCurrent("week", e.target.value)}
                      className="w-20 border rounded text-center text-xs"
                    />
                  ) : (
                    currentSession.week
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">الحصة:</span>
                <span className="font-black text-slate-900">
                  {isEditMode ? (
                    <input
                      type="text"
                      value={currentSession.sessionNumber}
                      onChange={(e) => updateCurrent("sessionNumber", e.target.value)}
                      className="w-20 border rounded text-center text-xs"
                    />
                  ) : (
                    currentSession.sessionNumber
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">المستوى:</span>
                <span className="font-black text-slate-900">
                  {isEditMode ? (
                    <input
                      type="text"
                      value={currentSession.level}
                      onChange={(e) => updateCurrent("level", e.target.value)}
                      className="w-20 border rounded text-center text-xs"
                    />
                  ) : (
                    currentSession.level
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">المدة:</span>
                <span className="font-black text-rose-700">
                  {isEditMode ? (
                    <input
                      type="text"
                      value={currentSession.duration}
                      onChange={(e) => updateCurrent("duration", e.target.value)}
                      className="w-16 border rounded text-center text-xs"
                    />
                  ) : (
                    currentSession.duration
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Central Radial Layout with Interactive Branch Cards */}
          <div className="relative my-4">
            {/* Top Row: Left Box (اختتام الحصة) & Right Box (افتتاح الحصة) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-6">
              {/* Top-Left Card: اختتام الحصة */}
              <div className="relative border-2 border-slate-900 rounded-2xl p-4 bg-white shadow-xs">
                <div className="text-right mb-2">
                  <span className="inline-block font-black text-rose-700 text-sm sm:text-base border-b-2 border-rose-600 pb-0.5">
                    {isEditMode ? (
                      <input
                        type="text"
                        value={currentSession.sections.closing.title}
                        onChange={(e) =>
                          updateSection("closing", "title", e.target.value)
                        }
                        className="font-black text-rose-700 border p-0.5 rounded text-xs"
                      />
                    ) : (
                      currentSession.sections.closing.title
                    )}
                  </span>
                </div>

                {isEditMode ? (
                  <textarea
                    value={currentSession.sections.closing.items.join("\n")}
                    onChange={(e) =>
                      updateSection("closing", "items", e.target.value.split("\n"))
                    }
                    rows={5}
                    className="w-full text-xs font-bold p-1.5 border border-slate-300 rounded bg-slate-50"
                  />
                ) : (
                  <ul className="text-xs sm:text-[13px] font-bold text-slate-900 space-y-1.5 text-right leading-relaxed">
                    {currentSession.sections.closing.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-slate-800 shrink-0">•</span>
                        <span>{item.replace(/^[-•✓]\s*/, "")}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Top-Right Card: افتتاح الحصة */}
              <div className="relative border-2 border-slate-900 rounded-2xl p-4 bg-white shadow-xs">
                <div className="text-right mb-2">
                  <span className="inline-block font-black text-rose-700 text-sm sm:text-base border-b-2 border-rose-600 pb-0.5">
                    {isEditMode ? (
                      <input
                        type="text"
                        value={currentSession.sections.opening.title}
                        onChange={(e) =>
                          updateSection("opening", "title", e.target.value)
                        }
                        className="font-black text-rose-700 border p-0.5 rounded text-xs"
                      />
                    ) : (
                      currentSession.sections.opening.title
                    )}
                  </span>
                </div>

                {isEditMode ? (
                  <textarea
                    value={currentSession.sections.opening.items.join("\n")}
                    onChange={(e) =>
                      updateSection("opening", "items", e.target.value.split("\n"))
                    }
                    rows={3}
                    className="w-full text-xs font-bold p-1.5 border border-slate-300 rounded bg-slate-50"
                  />
                ) : (
                  <ul className="text-xs sm:text-[13px] font-bold text-slate-900 space-y-1.5 text-right leading-relaxed">
                    {currentSession.sections.opening.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-emerald-900">
                        <span className="text-emerald-700 font-black">✓</span>
                        <span className="text-slate-900">{item.replace(/^[-•✓]\s*/, "")}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Center Row: Central Circle Hub and Middle-Right Routine Card */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-4">
              {/* Left spacer / visual indicator */}
              <div className="hidden md:flex md:col-span-1 justify-end items-center">
                {/* Arrow pointing to Top Left (اختتام الحصة) */}
                <svg className="w-12 h-12 text-[#0284c7]" viewBox="0 0 50 50" fill="none">
                  <path
                    d="M38 38 L16 16 M16 16 L28 16 M16 16 L16 28"
                    stroke="#0284c7"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Central Oval / Circle Hub (Cols 5) with radiating arrows */}
              <div className="md:col-span-5 flex flex-col items-center justify-center py-2 relative">
                {/* Green Arrow (pointing to Top-Right افتتاح الحصة) */}
                <div className="absolute -top-3 right-6 hidden md:block">
                  <svg className="w-10 h-10" viewBox="0 0 40 40">
                    <path
                      d="M10 30 L30 10 M30 10 L18 10 M30 10 L30 22"
                      stroke="#2e7d32"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Cyan Arrow (pointing to Right نشاط اعتيادي) */}
                <div className="absolute top-1/2 -right-4 -translate-y-1/2 hidden md:block">
                  <svg className="w-10 h-8" viewBox="0 0 40 30">
                    <path
                      d="M6 15 L32 15 M32 15 L22 7 M32 15 L22 23"
                      stroke="#00bcd4"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Purple Arrow (pointing to Bottom-Left أنشطة كتابية) */}
                <div className="absolute -bottom-3 left-6 hidden md:block">
                  <svg className="w-10 h-10" viewBox="0 0 40 40">
                    <path
                      d="M30 10 L10 30 M10 30 L22 30 M10 30 L10 18"
                      stroke="#ab47bc"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Orange/Brown Arrow (pointing Down أنشطة قرائية) */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 hidden md:block">
                  <svg className="w-8 h-10" viewBox="0 0 30 40">
                    <path
                      d="M15 6 L15 32 M15 32 L7 22 M15 32 L23 22"
                      stroke="#d84315"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Center Oval Circle */}
                <div
                  className="w-48 h-32 sm:w-56 sm:h-36 rounded-full border-2 border-slate-900 flex flex-col items-center justify-center text-center p-3 shadow-md transition-all hover:scale-105 z-10"
                  style={{ backgroundColor: "#9cd2f6" }}
                >
                  {isEditMode ? (
                    <div className="space-y-1">
                      <input
                        type="text"
                        value={currentSession.centerPathLabel}
                        onChange={(e) =>
                          updateCurrent("centerPathLabel", e.target.value)
                        }
                        className="text-center font-black text-xs border rounded p-0.5 bg-white w-32"
                      />
                      <input
                        type="text"
                        value={currentSession.centerBlockLabel}
                        onChange={(e) =>
                          updateCurrent("centerBlockLabel", e.target.value)
                        }
                        className="text-center font-black text-xs border rounded p-0.5 bg-white w-32"
                      />
                    </div>
                  ) : (
                    <>
                      <span className="text-sm sm:text-base font-black text-slate-950">
                        {currentSession.centerPathLabel}
                      </span>
                      <span className="text-base sm:text-lg font-black text-slate-950 mt-1">
                        {currentSession.centerBlockLabel}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Middle-Right Card: 1- نشاط اعتيادي (Cols 6) */}
              <div className="md:col-span-6 border-2 border-slate-900 rounded-2xl p-4 bg-white shadow-xs">
                <div className="text-right mb-2">
                  <span className="inline-block font-black text-rose-700 text-xs sm:text-sm border-b-2 border-rose-600 pb-0.5">
                    {isEditMode ? (
                      <input
                        type="text"
                        value={currentSession.sections.routineActivity.title}
                        onChange={(e) =>
                          updateSection("routineActivity", "title", e.target.value)
                        }
                        className="font-black text-rose-700 border p-0.5 rounded text-xs w-full"
                      />
                    ) : (
                      currentSession.sections.routineActivity.title
                    )}
                  </span>
                </div>

                {isEditMode ? (
                  <textarea
                    value={currentSession.sections.routineActivity.items.join("\n")}
                    onChange={(e) =>
                      updateSection(
                        "routineActivity",
                        "items",
                        e.target.value.split("\n")
                      )
                    }
                    rows={4}
                    className="w-full text-xs font-bold p-1.5 border border-slate-300 rounded bg-slate-50"
                  />
                ) : (
                  <ul className="text-xs sm:text-[13px] font-bold text-slate-900 space-y-1.5 text-right leading-relaxed">
                    {currentSession.sections.routineActivity.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-slate-800 shrink-0">•</span>
                        <span>{item.replace(/^[-•✓]\s*/, "")}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Bottom Row: Box 3 (أنشطة كتابية - Left) & Box 2 (أنشطة قرائية - Right/Middle) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mt-6">
              {/* Bottom-Left Card: 3- أنشطة كتابية */}
              <div className="relative border-2 border-slate-900 rounded-2xl p-4 bg-white shadow-xs">
                <div className="text-right mb-2">
                  <span className="inline-block font-black text-rose-700 text-sm sm:text-base border-b-2 border-rose-600 pb-0.5">
                    {isEditMode ? (
                      <input
                        type="text"
                        value={currentSession.sections.writingActivity.title}
                        onChange={(e) =>
                          updateSection("writingActivity", "title", e.target.value)
                        }
                        className="font-black text-rose-700 border p-0.5 rounded text-xs"
                      />
                    ) : (
                      currentSession.sections.writingActivity.title
                    )}
                  </span>
                </div>

                {isEditMode ? (
                  <textarea
                    value={currentSession.sections.writingActivity.items.join("\n")}
                    onChange={(e) =>
                      updateSection(
                        "writingActivity",
                        "items",
                        e.target.value.split("\n")
                      )
                    }
                    rows={5}
                    className="w-full text-xs font-bold p-1.5 border border-slate-300 rounded bg-slate-50"
                  />
                ) : (
                  <ul className="text-xs sm:text-[13px] font-bold text-slate-900 space-y-1.5 text-right leading-relaxed">
                    {currentSession.sections.writingActivity.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-slate-800 shrink-0">•</span>
                        <span>{item.replace(/^[-•✓]\s*/, "")}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Bottom-Right/Middle Card: 2- أنشطة قرائية */}
              <div className="relative border-2 border-slate-900 rounded-2xl p-4 bg-white shadow-xs">
                <div className="text-right mb-2">
                  <span className="inline-block font-black text-rose-700 text-sm sm:text-base border-b-2 border-rose-600 pb-0.5">
                    {isEditMode ? (
                      <input
                        type="text"
                        value={currentSession.sections.readingActivity.title}
                        onChange={(e) =>
                          updateSection("readingActivity", "title", e.target.value)
                        }
                        className="font-black text-rose-700 border p-0.5 rounded text-xs"
                      />
                    ) : (
                      currentSession.sections.readingActivity.title
                    )}
                  </span>
                </div>

                {isEditMode ? (
                  <textarea
                    value={currentSession.sections.readingActivity.items.join("\n")}
                    onChange={(e) =>
                      updateSection(
                        "readingActivity",
                        "items",
                        e.target.value.split("\n")
                      )
                    }
                    rows={5}
                    className="w-full text-xs font-bold p-1.5 border border-slate-300 rounded bg-slate-50"
                  />
                ) : (
                  <ul className="text-xs sm:text-[13px] font-bold text-slate-900 space-y-1.5 text-right leading-relaxed">
                    {currentSession.sections.readingActivity.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-slate-800 shrink-0">•</span>
                        <span>{item.replace(/^[-•✓]\s*/, "")}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Footer Row: Author Attribution & Academic Year */}
          <div className="mt-8 pt-3 border-t border-slate-300 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-600 font-bold">
            <div className="flex items-center gap-2">
              <span>إعداد :</span>
              <span className="font-black text-slate-900">
                {isEditMode ? (
                  <input
                    type="text"
                    value={currentSession.author}
                    onChange={(e) => updateCurrent("author", e.target.value)}
                    className="border rounded px-1.5 py-0.5 text-xs font-bold"
                  />
                ) : (
                  currentSession.author
                )}
              </span>
            </div>

            <div className="flex items-center gap-4 text-slate-500">
              <span>الموسم الدراسي: 2026 / 2027</span>
              <span>برنامج الدعم المكثف طارل (TaRL)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
