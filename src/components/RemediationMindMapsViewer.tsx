import React, { useState, useMemo } from "react";
import {
  Calculator,
  BookOpen,
  Languages,
  Download,
  Eye,
  ExternalLink,
  Printer,
  Copy,
  CheckCircle2,
  Search,
  Sparkles,
  Layers,
  ArrowRight,
  ArrowLeft,
  Clock,
  Check,
  Share2,
  FolderOpen,
  Presentation,
  Filter,
  FileText,
  Zap,
} from "lucide-react";
import {
  REMEDIATION_LEVELS,
  REMEDIATION_SUBJECTS,
  REMEDIATION_PARCOURS,
  generateRemediationSessions,
  getAllRemediationSessions,
  RemediationSessionItem,
} from "../data/remediationMindMapsData";
import { TeacherProfile } from "../types";

interface RemediationMindMapsViewerProps {
  teacherProfile?: TeacherProfile;
  initialLevel?: number;
  initialSubject?: "MATH" | "AR" | "FR";
  initialParcours?: number;
  initialSessionNumber?: number;
}

export const RemediationMindMapsViewer: React.FC<RemediationMindMapsViewerProps> = ({
  teacherProfile,
  initialLevel = 1,
  initialSubject = "MATH",
  initialParcours = 1,
  initialSessionNumber = 1,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<number>(() => {
    // If teacher profile has an assigned level, try to match
    if (teacherProfile?.assignedLevel) {
      const match = teacherProfile.assignedLevel.match(/\d/);
      if (match) {
        const num = parseInt(match[0], 10);
        if (num >= 1 && num <= 6) return num;
      }
    }
    return initialLevel;
  });

  const [selectedSubject, setSelectedSubject] = useState<"MATH" | "AR" | "FR">(initialSubject);
  const [selectedParcours, setSelectedParcours] = useState<number>(initialParcours);
  const [selectedSessionNumber, setSelectedSessionNumber] = useState<number>(initialSessionNumber);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchScope, setSearchScope] = useState<"current" | "all_432">("current");
  const [viewMode, setViewMode] = useState<"detail" | "grid">("detail");
  const [copiedSuccess, setCopiedSuccess] = useState<boolean>(false);

  // Sync props when changed externally
  React.useEffect(() => {
    if (initialLevel) setSelectedLevel(initialLevel);
  }, [initialLevel]);

  React.useEffect(() => {
    if (initialSubject) setSelectedSubject(initialSubject);
  }, [initialSubject]);

  React.useEffect(() => {
    if (initialSessionNumber) setSelectedSessionNumber(initialSessionNumber);
  }, [initialSessionNumber]);

  // Generate sessions for currently active level, subject, and parcours
  const allSessions = useMemo(() => {
    return generateRemediationSessions(selectedLevel, selectedSubject, selectedParcours);
  }, [selectedLevel, selectedSubject, selectedParcours]);

  // All 432 sessions for global search
  const all432Sessions = useMemo(() => {
    return getAllRemediationSessions();
  }, []);

  // Filtered sessions based on search & scope
  const filteredSessions = useMemo(() => {
    if (!searchQuery.trim()) return allSessions;
    const q = searchQuery.toLowerCase().trim();
    const sourcePool = searchScope === "all_432" ? all432Sessions : allSessions;

    return sourcePool.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.topicAr.toLowerCase().includes(q) ||
        s.levelLabelAr.includes(q) ||
        s.subjectLabelAr.includes(q) ||
        s.sessionNumber.toString() === q
    );
  }, [allSessions, all432Sessions, searchQuery, searchScope]);

  // Currently selected session
  const currentSession: RemediationSessionItem = useMemo(() => {
    return (
      allSessions.find((s) => s.sessionNumber === selectedSessionNumber) || allSessions[0]
    );
  }, [allSessions, selectedSessionNumber]);

  const activeLevelObj = REMEDIATION_LEVELS.find((l) => l.id === selectedLevel) || REMEDIATION_LEVELS[0];
  const activeSubjectObj = REMEDIATION_SUBJECTS.find((s) => s.id === selectedSubject) || REMEDIATION_SUBJECTS[0];
  const activeParcoursObj = REMEDIATION_PARCOURS.find((p) => p.id === selectedParcours) || REMEDIATION_PARCOURS[0];

  const handleCopySummary = () => {
    const text = `📌 خطاطة الدعم المكثف طارل: ${currentSession.title}
📚 المادة: ${currentSession.subjectLabelAr} | المستوى: ${currentSession.levelLabelAr} (${currentSession.levelLabelFr}) | ${currentSession.parcoursLabelAr}
🎯 موضوع الحصة: ${currentSession.topicAr}

مراحل التدريس الصريح:
1. ${currentSession.stages.warmup.name} (${currentSession.stages.warmup.duration})
${currentSession.stages.warmup.description}

2. ${currentSession.stages.modeling.name} (${currentSession.stages.modeling.duration})
${currentSession.stages.modeling.description}

3. ${currentSession.stages.guided.name} (${currentSession.stages.guided.duration})
${currentSession.stages.guided.description}

4. ${currentSession.stages.autonomous.name} (${currentSession.stages.autonomous.duration})
${currentSession.stages.autonomous.description}

5. ${currentSession.stages.assessment.name} (${currentSession.stages.assessment.duration})
${currentSession.stages.assessment.description}

رابط تحميل العرض التفاعلي (.pptx للمسلاط):
${currentSession.r2PptxUrl}`;

    navigator.clipboard.writeText(text);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 font-cairo animate-fadeIn" dir="rtl">
      {/* 1. Header Hero Banner */}
      <div className="no-print bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-blue-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-amber-400 text-slate-950 text-xs font-black px-3 py-0.5 rounded-full shadow-xs">
                جديد 2026/2027 • منصة يلا تعليم & السحابة R2
              </span>
              <span className="bg-blue-600/60 text-blue-100 text-xs font-bold px-3 py-0.5 rounded-full">
                432 عرضاً تفاعلياً وخطاطة ذهنية (24 حصة × 6 مستويات × 3 مواد)
              </span>
            </div>
            <h2 className="text-xl md:text-3xl font-black text-white font-cairo">
              خطاطات وعروض الدعم المكثف لجميع المواد والمستويات
            </h2>
            <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
              الحقيبة الرقمية الشاملة لخطاطات الدعم المكثف (Remédiation Intensive) المعتمدة بمؤسسات الريادة: عروض بوربوينت PPTX جاهزة للمسلاط الضوئي، خرائط ذهنية للمفاهيم، ومراحل التدريس الصريح الثلاث (أنا أعمل، نحن نعمل، أنت تعمل) لجميع الحصص.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <a
              href="https://yallataalim.com/remediation-intensive-cartes-mentales"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md"
              title="زيارة صفحة الخطاطات على منصة يلا تعليم"
            >
              <span>منصة يلا تعليم الأصلية ↗</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={() => window.print()}
              className="bg-blue-600 hover:bg-blue-500 text-white font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md"
            >
              <Printer className="w-3.5 h-3.5 text-amber-300" />
              <span>طباعة A4</span>
            </button>
          </div>
        </div>

        {/* 2. Interactive Selection Controls (Level, Subject, Parcours) */}
        <div className="pt-4 border-t border-blue-800/70 space-y-3">
          {/* Level Switcher (1 to 6) */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-blue-200 block">
              1. اختر المستوى الدراسي (جميع المستويات الابتدائية من 1 إلى 6):
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {REMEDIATION_LEVELS.map((lvl) => {
                const isActive = selectedLevel === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => {
                      setSelectedLevel(lvl.id);
                      setSelectedSessionNumber(1);
                    }}
                    className={`p-2.5 rounded-xl border text-center transition cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                      isActive
                        ? "bg-amber-400 text-slate-950 font-black border-amber-300 shadow-md ring-2 ring-white/30"
                        : "bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-blue-900/60"
                    }`}
                  >
                    <span className="text-xs font-black">{lvl.labelAr}</span>
                    <span className={`text-[10px] font-mono ${isActive ? "text-slate-800 font-bold" : "text-blue-300"}`}>
                      {lvl.labelFr}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subject Switcher (MATH, AR, FR) & Parcours Switcher */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {/* Subject Selector */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-blue-200 block">
                2. اختر المادة الأساسية:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {REMEDIATION_SUBJECTS.map((sub) => {
                  const isActive = selectedSubject === sub.id;
                  const Icon =
                    sub.id === "MATH" ? Calculator : sub.id === "AR" ? BookOpen : Languages;
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => {
                        setSelectedSubject(sub.id);
                        setSelectedSessionNumber(1);
                      }}
                      className={`p-2.5 rounded-xl border transition cursor-pointer flex items-center justify-center gap-2 ${
                        isActive
                          ? "bg-white text-slate-950 font-black border-white shadow-md ring-2 ring-amber-400"
                          : "bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-blue-900/60"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-blue-700" : "text-amber-400"}`} />
                      <span className="text-xs font-bold">{sub.labelAr}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Parcours / Palier Selector */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-blue-200 block">
                3. اختر المسار البيداغوجي (طارل):
              </span>
              <div className="grid grid-cols-3 gap-2">
                {REMEDIATION_PARCOURS.map((par) => {
                  const isActive = selectedParcours === par.id;
                  return (
                    <button
                      key={par.id}
                      type="button"
                      onClick={() => {
                        setSelectedParcours(par.id);
                        setSelectedSessionNumber(1);
                      }}
                      className={`p-2.5 rounded-xl border text-center transition cursor-pointer ${
                        isActive
                          ? "bg-amber-400 text-slate-950 font-black border-amber-300 shadow-md ring-2 ring-white/30"
                          : "bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-blue-900/60 text-xs font-bold"
                      }`}
                    >
                      <span className="text-xs font-bold block">{par.shortLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Session Selection Strip (1 to 24) and Search */}
      <div className="no-print bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Presentation className="w-5 h-5 text-blue-700 shrink-0" />
            <div>
              <h3 className="text-sm font-black text-slate-900">
                حصص الدعم المكثف المتاحة: {activeSubjectObj.labelAr} • {activeLevelObj.labelAr} • {activeParcoursObj.shortLabel}
              </h3>
              <p className="text-[11px] text-slate-500">
                24 حصة مبرمجة مع روابط التحميل المباشرة لملفات البوربوينت (.pptx) من السحابة R2
              </p>
            </div>
          </div>

          {/* Search & View Mode Switcher */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {/* Search scope toggle */}
            <div className="flex items-center gap-1 text-[11px] bg-slate-100 p-0.5 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setSearchScope("current")}
                className={`px-2 py-1 rounded-lg font-bold transition cursor-pointer ${
                  searchScope === "current"
                    ? "bg-white text-blue-700 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="البحث ضمن حصص المستوى والمادة المحددة فقط (24 حصة)"
              >
                المادة الحالية (24)
              </button>
              <button
                type="button"
                onClick={() => setSearchScope("all_432")}
                className={`px-2 py-1 rounded-lg font-bold transition cursor-pointer ${
                  searchScope === "all_432"
                    ? "bg-white text-blue-700 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="البحث في كامل حقيبة الدعم المكثف (432 حصة لجميع المواد والمستويات)"
              >
                جميع المواد والمستويات (432)
              </button>
            </div>

            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  searchScope === "all_432"
                    ? "ابحث في 432 حصة بالمفهوم أو الرقم..."
                    : "ابحث برقم الحصة أو المفهوم..."
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-9 pl-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute left-2.5 top-2 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center border border-slate-200 rounded-xl p-0.5 bg-slate-100 text-xs">
              <button
                type="button"
                onClick={() => setViewMode("detail")}
                className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                  viewMode === "detail"
                    ? "bg-white text-blue-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                الخطاطة التفصيلية
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-white text-blue-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                شبكة الحصص {searchQuery.trim() ? `(${filteredSessions.length})` : "(24)"}
              </button>
            </div>
          </div>
        </div>

        {/* Global search quick results strip when searchScope === 'all_432' */}
        {searchQuery.trim() && searchScope === "all_432" && (
          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-blue-900">
              <span>نتائج البحث في الحقيبة الكاملة ({filteredSessions.length} حصة مطابقة):</span>
              <span className="text-[11px] text-blue-700">اضغط على أي حصة للانتقال إليها فوراً</span>
            </div>
            {filteredSessions.length === 0 ? (
              <p className="text-xs text-slate-500 py-1">لا توجد حصص تطابق كلمة البحث "{searchQuery}".</p>
            ) : (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {filteredSessions.slice(0, 20).map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      setSelectedLevel(s.level);
                      setSelectedSubject(s.subject);
                      setSelectedSessionNumber(s.sessionNumber);
                    }}
                    className={`shrink-0 border px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer text-right flex flex-col gap-0.5 shadow-2xs group ${
                      selectedLevel === s.level && selectedSubject === s.subject && selectedSessionNumber === s.sessionNumber
                        ? "bg-blue-700 text-white border-blue-700"
                        : "bg-white hover:bg-blue-600 hover:text-white border-slate-200 hover:border-blue-600"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-[10px]">
                      <span className="font-black text-amber-500 group-hover:text-amber-300">{s.subjectLabelAr}</span>
                      <span>•</span>
                      <span>{s.levelLabelAr}</span>
                      <span>•</span>
                      <span className="font-mono">حصة {s.sessionNumber}</span>
                    </div>
                    <span className="text-[11px] truncate max-w-[200px]">{s.topicAr}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 24 Sessions Horizontal Scroll Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin pt-1">
          {allSessions.map((s) => {
            const isSelected = selectedSessionNumber === s.sessionNumber;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedSessionNumber(s.sessionNumber)}
                className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-blue-700 text-white shadow-xs ring-2 ring-blue-500/30 font-black"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
                }`}
                title={s.topicAr}
              >
                <span>الحصة {s.sessionNumber}</span>
                {isSelected && <Check className="w-3 h-3 text-amber-300" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. MAIN CONTENT AREA: Detail View (Mind Map & Teaching Stages) vs Grid View */}
      {viewMode === "detail" ? (
        <div className="space-y-6">
          {/* Active Session Spotlight Card */}
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
            {/* Header of Active Session */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-black px-2.5 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-300">
                    {currentSession.title}
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-300">
                    الحصة {currentSession.sessionNumber} من 24
                  </span>
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {currentSession.subjectLabelAr} • {currentSession.levelLabelAr} ({currentSession.levelLabelFr})
                  </span>
                  <span className="bg-amber-100 text-amber-900 text-xs font-semibold px-2 py-0.5 rounded">
                    {currentSession.parcoursLabelAr}
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-black text-slate-900 leading-snug">
                  {currentSession.topicAr}
                </h3>
                <p className="text-xs text-slate-600">
                  <strong>الهدف التعلمي المستهدف:</strong> {currentSession.objectivesAr}
                </p>
              </div>

              {/* Action Buttons for this session */}
              <div className="flex items-center gap-2 shrink-0 flex-wrap">
                <a
                  href={currentSession.r2PptxUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                  title="تنزيل مباشر لملف البوربوينت PPTX من سحابة R2 الرسمية"
                >
                  <Download className="w-3.5 h-3.5 text-amber-300" />
                  <span>تنزيل العرض (.pptx)</span>
                </a>

                <a
                  href={currentSession.officeViewerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
                  title="معاينة العرض عبر PowerPoint Online"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>معاينة بالمتصفح</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1 transition cursor-pointer"
                  title="نسخ جذاذة الحصة ومراحل التدريس الصريح"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedSuccess ? "تم النسخ ✓" : "نسخ الجذاذة"}</span>
                </button>
              </div>
            </div>

            {/* 5. VISUAL MIND MAP SCHEMATIC (الخطاطة الذهنية البصرية للحصة) */}
            <div className="bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/40 border border-blue-200 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500" />
                  <h4 className="text-sm font-black text-blue-950 font-cairo">
                    الخطاطة الذهنية التفاعلية لمجريات الحصة (Carte Mentale de la Séance)
                  </h4>
                </div>
                <span className="text-[11px] text-slate-500 font-semibold">
                  المدة الإجمالية للحصة: 50 دقيقة
                </span>
              </div>

              {/* Central Concept Node */}
              <div className="max-w-xl mx-auto bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-2xl p-4 text-center shadow-md">
                <span className="text-[10px] font-bold text-amber-300 block mb-1">
                  المفهوم البؤري المركزي (Concept Central)
                </span>
                <h5 className="text-sm md:text-base font-black leading-snug">
                  {currentSession.topicAr}
                </h5>
                <span className="text-[11px] text-blue-100 font-mono mt-1 block">
                  {currentSession.title}
                </span>
              </div>

              {/* 5 Explicit Teaching Stages Grid (مراحل التدريس الصريح المتدرجة) */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
                {/* 1. Warm-up */}
                <div className="bg-white rounded-xl p-3.5 border-2 border-amber-200 shadow-xs space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="bg-amber-100 text-amber-900 font-black text-[10px] px-2 py-0.5 rounded">
                        المرحلة 1
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 font-bold">5 دقائق</span>
                    </div>
                    <h6 className="text-xs font-black text-slate-900 leading-snug">
                      التهيئة والتذكير
                    </h6>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                      {currentSession.stages.warmup.description}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-500">
                    ⚡ حساب ذهني / كلمات بصرية
                  </div>
                </div>

                {/* 2. Modeling */}
                <div className="bg-white rounded-xl p-3.5 border-2 border-blue-300 shadow-xs space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="bg-blue-100 text-blue-900 font-black text-[10px] px-2 py-0.5 rounded">
                        المرحلة 2
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 font-bold">10 دقائق</span>
                    </div>
                    <h6 className="text-xs font-black text-slate-900 leading-snug">
                      النمذجة "أنا أعمل"
                    </h6>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                      {currentSession.stages.modeling.description}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 text-[10px] text-blue-700 font-bold">
                    📽️ عرض الشريحة بالمسلاط
                  </div>
                </div>

                {/* 3. Guided Practice */}
                <div className="bg-white rounded-xl p-3.5 border-2 border-indigo-300 shadow-xs space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="bg-indigo-100 text-indigo-900 font-black text-[10px] px-2 py-0.5 rounded">
                        المرحلة 3
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 font-bold">15 دقيقة</span>
                    </div>
                    <h6 className="text-xs font-black text-slate-900 leading-snug">
                      الممارسة الموجهة "نحن نعمل"
                    </h6>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                      {currentSession.stages.guided.description}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 text-[10px] text-indigo-700 font-bold">
                    ✍️ عمل تفاعلي على الألواح
                  </div>
                </div>

                {/* 4. Autonomous Practice */}
                <div className="bg-white rounded-xl p-3.5 border-2 border-emerald-300 shadow-xs space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="bg-emerald-100 text-emerald-900 font-black text-[10px] px-2 py-0.5 rounded">
                        المرحلة 4
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 font-bold">15 دقيقة</span>
                    </div>
                    <h6 className="text-xs font-black text-slate-900 leading-snug">
                      الممارسة المستقلة "أنت تعمل"
                    </h6>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                      {currentSession.stages.autonomous.description}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 text-[10px] text-emerald-700 font-bold">
                    📖 كراسة الدعم المكثف
                  </div>
                </div>

                {/* 5. Assessment */}
                <div className="bg-white rounded-xl p-3.5 border-2 border-purple-300 shadow-xs space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="bg-purple-100 text-purple-900 font-black text-[10px] px-2 py-0.5 rounded">
                        المرحلة 5
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 font-bold">5 دقائق</span>
                    </div>
                    <h6 className="text-xs font-black text-slate-900 leading-snug">
                      التقويم والتفييء
                    </h6>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                      {currentSession.stages.assessment.description}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 text-[10px] text-purple-700 font-bold">
                    📊 رصد التقدم وشبكة طارل
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Navigation Footer between sessions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                disabled={currentSession.sessionNumber <= 1}
                onClick={() => setSelectedSessionNumber((prev) => Math.max(1, prev - 1))}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition"
              >
                <ArrowRight className="w-4 h-4" />
                <span>الحصة السابقة (الحصة {currentSession.sessionNumber - 1})</span>
              </button>

              <span className="text-xs font-bold text-slate-500">
                الحصة {currentSession.sessionNumber} من 24
              </span>

              <button
                type="button"
                disabled={currentSession.sessionNumber >= 24}
                onClick={() => setSelectedSessionNumber((prev) => Math.min(24, prev + 1))}
                className="px-4 py-2 rounded-xl bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition shadow-xs"
              >
                <span>الحصة التالية (الحصة {currentSession.sessionNumber + 1})</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* GRID VIEW: All 24 Sessions Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filteredSessions.map((session) => {
            const isSelected = selectedSessionNumber === session.sessionNumber;
            return (
              <div
                key={session.id}
                className={`bg-white rounded-2xl p-4 border transition-all flex flex-col justify-between ${
                  isSelected
                    ? "border-blue-600 ring-2 ring-blue-500/20 shadow-md bg-blue-50/40"
                    : "border-slate-200 hover:border-blue-300 hover:shadow-xs"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="bg-blue-100 text-blue-900 font-mono text-[10px] font-black px-2 py-0.5 rounded">
                      الحصة {session.sessionNumber}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {session.title}
                    </span>
                  </div>

                  <h4 className="text-xs font-black text-slate-900 leading-snug line-clamp-2">
                    {session.topicAr}
                  </h4>

                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                    {session.objectivesAr}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSessionNumber(session.sessionNumber);
                      setViewMode("detail");
                    }}
                    className="text-xs text-blue-700 font-bold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>عرض الخطاطة ◄</span>
                  </button>

                  <a
                    href={session.r2PptxUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold px-2 py-1 rounded-lg flex items-center gap-1 transition cursor-pointer"
                    title="تنزيل ملف .pptx مباشرة من السحابة"
                  >
                    <Download className="w-3 h-3 text-emerald-700" />
                    <span>.pptx</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 6. Legal & Pedagogical Reference Box */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-700 space-y-2">
        <div className="flex items-center gap-2 text-slate-900 font-black">
          <BookOpen className="w-4 h-4 text-blue-700" />
          <span>توجيهات تدبير عروض وخطاطات الدعم المكثف طارل:</span>
        </div>
        <p className="text-[11px] text-slate-600 leading-relaxed">
          تم إعداد عروض وخطاطات الدعم المكثف وفق النموذج البيداغوجي لمدارس الريادة، حيث تخصص كل حصة (50 دقيقة) لتدارك ثغرات التعلم في المهارات الأساسية (العد والحساب، فك التشفير، الطلاقة، وفهم المقروء) مع الدمج بين العرض المرئي بالمسلاط الضوئي والتدريب العملي على الألواح وكراسة المتعلم الفردية.
        </p>
        <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
          <span>المصدر: وزارة التربية الوطنية • منصة يلا تعليم (yallataalim.com) • السحابة الرسمية R2</span>
          <span className="font-bold text-blue-700">الموسم الدراسي 2026 / 2027</span>
        </div>
      </div>
    </div>
  );
};
