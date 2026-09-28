import React, { useState, useEffect, useMemo } from "react";
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
  Share2,
  HelpCircle,
  Layers,
  FileText,
  Search,
  ArrowRight,
  Calculator,
  Compass,
  Filter,
  Check,
  Calendar,
  Clock,
  Sparkle,
  Presentation,
  X,
  Languages,
  GraduationCap,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { TeacherProfile } from "../types";
import {
  FRENCH_LEVEL1_SESSIONS,
  MATH_LEVEL1_SESSIONS,
  ARABIC_LEVEL1_SESSIONS,
  FrenchLevel1Session,
  MathLevel1Session,
  ArabicLevel1Session,
  ARABIC_TARL_MINDMAPS,
} from "../data/mindMapsData";
import {
  REMEDIATION_LEVELS,
  REMEDIATION_SUBJECTS,
  getAllRemediationSessions,
  RemediationSessionItem,
} from "../data/remediationMindMapsData";
import { TarlFrenchMindMap } from "./TarlFrenchMindMap";
import { ArabicTarlMindMapView } from "./ArabicTarlMindMapView";
import { RemediationMindMapsViewer } from "./RemediationMindMapsViewer";

export type MindMapCategory =
  | "all"
  | "remediation_intensive"
  | "arabic_tarl"
  | "french_level1"
  | "math_level1"
  | "arabic_level1"
  | "tarl_french";

export interface UnifiedMindMapSearchItem {
  id: string;
  sourceCategory: MindMapCategory;
  categoryLabel: string;
  level: number;
  levelLabelAr: string;
  levelLabelFr: string;
  levelBadgeColor: string;
  subject: "MATH" | "AR" | "FR" | "OTHER";
  subjectLabelAr: string;
  sessionNumber?: number;
  title: string;
  topicAr: string;
  objectivesAr: string;
  r2PptxUrl?: string;
  officeViewerUrl?: string;
  yallaTaalimUrl?: string;
  openMindMap: () => void;
}

interface MindMapsHubProps {
  teacherProfile?: TeacherProfile;
  initialCategory?: MindMapCategory;
  onNavigateToTab?: (tab: string) => void;
}

export const MindMapsHub: React.FC<MindMapsHubProps> = ({
  teacherProfile,
  initialCategory = "remediation_intensive",
  onNavigateToTab,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MindMapCategory>(initialCategory);
  const [selectedWeekFilter, setSelectedWeekFilter] = useState<number | "all">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<"all" | "MATH" | "AR" | "FR">("all");
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<number | "all">("all");
  const [selectedSourceFilter, setSelectedSourceFilter] = useState<"all" | "remediation" | "arabic_tarl" | "level1">("all");
  const [remediationLevel, setRemediationLevel] = useState<number>(() => {
    if (teacherProfile?.assignedLevel) {
      const match = teacherProfile.assignedLevel.match(/\d/);
      if (match) {
        const num = parseInt(match[0], 10);
        if (num >= 1 && num <= 6) return num;
      }
    }
    return 1;
  });
  const [remediationSubject, setRemediationSubject] = useState<"MATH" | "AR" | "FR">("MATH");
  const [remediationSessionNumber, setRemediationSessionNumber] = useState<number>(1);
  const [selectedArabicTarlSessionId, setSelectedArabicTarlSessionId] = useState<string>("tarl-ar-m3-story-s1");
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [copiedSuccess, setCopiedSuccess] = useState<boolean>(false);

  // Selected session indices
  const [selectedFrenchIdx, setSelectedFrenchIdx] = useState<number>(0);
  const [selectedMathIdx, setSelectedMathIdx] = useState<number>(0);
  const [selectedArabicIdx, setSelectedArabicIdx] = useState<number>(0);

  // Editable states
  const [frenchSessions, setFrenchSessions] = useState<FrenchLevel1Session[]>(() => {
    try {
      const saved = localStorage.getItem("profpress_french_mindmaps");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return FRENCH_LEVEL1_SESSIONS;
  });

  const [mathSessions, setMathSessions] = useState<MathLevel1Session[]>(() => {
    try {
      const saved = localStorage.getItem("profpress_math_mindmaps");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return MATH_LEVEL1_SESSIONS;
  });

  const [arabicSessions, setArabicSessions] = useState<ArabicLevel1Session[]>(() => {
    try {
      const saved = localStorage.getItem("profpress_arabic_mindmaps");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ARABIC_LEVEL1_SESSIONS;
  });

  const handleSaveAll = () => {
    try {
      localStorage.setItem("profpress_french_mindmaps", JSON.stringify(frenchSessions));
      localStorage.setItem("profpress_math_mindmaps", JSON.stringify(mathSessions));
      localStorage.setItem("profpress_arabic_mindmaps", JSON.stringify(arabicSessions));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Helper getters
  const currentFrench = frenchSessions[selectedFrenchIdx] || frenchSessions[0];
  const currentMath = mathSessions[selectedMathIdx] || mathSessions[0];
  const currentArabic = arabicSessions[selectedArabicIdx] || arabicSessions[0];

  const updateCurrentFrench = (field: keyof FrenchLevel1Session, val: any) => {
    const updated = [...frenchSessions];
    updated[selectedFrenchIdx] = { ...updated[selectedFrenchIdx], [field]: val };
    setFrenchSessions(updated);
  };

  const updateCurrentMath = (field: keyof MathLevel1Session, val: any) => {
    const updated = [...mathSessions];
    updated[selectedMathIdx] = { ...updated[selectedMathIdx], [field]: val };
    setMathSessions(updated);
  };

  const updateCurrentArabic = (field: keyof ArabicLevel1Session, val: any) => {
    const updated = [...arabicSessions];
    updated[selectedArabicIdx] = { ...updated[selectedArabicIdx], [field]: val };
    setArabicSessions(updated);
  };

  const handleCopySummary = () => {
    let summary = "";
    if (selectedCategory === "french_level1") {
      summary = `📌 Français 1AEP - Semaine ${currentFrench.semaine} / Jour ${currentFrench.jour} / Séance ${currentFrench.seance}
🎯 Objectifs :
${currentFrench.objectifs}
1. Chanson action (${currentFrench.chansonAction.duree}) : ${currentFrench.chansonAction.title}
2. Vocabulaire (${currentFrench.vocabulaire.duree}) : ${currentFrench.vocabulaire.content}
3. Chanson de l'alphabet (${currentFrench.chansonAlphabet.duree}) : ${currentFrench.chansonAlphabet.title}
4. Présentation de la lettre (${currentFrench.presentationLettre.duree}) : ${currentFrench.presentationLettre.content}
5. Jeu (${currentFrench.jeu.duree}) : ${currentFrench.jeu.title}`;
    } else if (selectedCategory === "math_level1") {
      summary = `📌 الرياضيات المستوى الأول - الأسبوع ${currentMath.semaine} / اليوم ${currentMath.jour} / الحصة ${currentMath.seance}
🎯 الأهداف والتعلمات :
${currentMath.objectifs}
1. ${currentMath.activite1.type} (${currentMath.activite1.duree}) : ${currentMath.activite1.title}
2. ${currentMath.activite2.type} (${currentMath.activite2.duree}) : ${currentMath.activite2.title}
3. ${currentMath.activite3.type} (${currentMath.activite3.duree}) : ${currentMath.activite3.title}
4. ${currentMath.activite4.type} (${currentMath.activite4.duree}) : ${currentMath.activite4.title}`;
    } else if (selectedCategory === "arabic_level1") {
      summary = `📌 اللغة العربية المستوى الأول - الأسبوع ${currentArabic.semaine} / اليوم ${currentArabic.jour} / الحصة ${currentArabic.seance}
🎯 الأهداف والتعلمات :
${currentArabic.objectifs}
1. ${currentArabic.activite1.type} (${currentArabic.activite1.duree}) : ${currentArabic.activite1.title}
2. ${currentArabic.activite2.type} (${currentArabic.activite2.duree}) : ${currentArabic.activite2.title}
3. ${currentArabic.activite3.type} (${currentArabic.activite3.duree}) : ${currentArabic.activite3.title}
4. ${currentArabic.activite4.type} (${currentArabic.activite4.duree}) : ${currentArabic.activite4.title}`;
    }

    navigator.clipboard.writeText(summary);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  const [visibleResultsCount, setVisibleResultsCount] = useState<number>(24);

  // Arabic and French search normalizer
  const normalizeSearch = (str: string) => {
    return (str || "")
      .toLowerCase()
      .replace(/[\u064B-\u065F\u0670]/g, "") // remove harakat / tashkeel
      .replace(/[إأآٱ]/g, "ا")
      .replace(/ة/g, "ه")
      .replace(/[ىي]/g, "ي")
      .replace(/[\s\-_/]+/g, " ")
      .trim();
  };

  // Build unified searchable mind maps list across all sources
  const allSearchableMindMaps = useMemo<UnifiedMindMapSearchItem[]>(() => {
    const list: UnifiedMindMapSearchItem[] = [];

    // 1. All 432 Remediation Intensive sessions from YallaTaalim & Cloudflare R2
    const remediationList = getAllRemediationSessions();
    remediationList.forEach((s) => {
      const lvlObj = REMEDIATION_LEVELS.find((l) => l.id === s.level);
      const lvlBadge = lvlObj?.badgeColor || "bg-blue-100 text-blue-900 border-blue-300";
      list.push({
        id: s.id,
        sourceCategory: "remediation_intensive",
        categoryLabel: "الدعم المكثف (يلا تعليم & R2)",
        level: s.level,
        levelLabelAr: s.levelLabelAr,
        levelLabelFr: s.levelLabelFr,
        levelBadgeColor: lvlBadge,
        subject: s.subject,
        subjectLabelAr: s.subjectLabelAr,
        sessionNumber: s.sessionNumber,
        title: s.title,
        topicAr: s.topicAr,
        objectivesAr: s.objectivesAr,
        r2PptxUrl: s.r2PptxUrl,
        officeViewerUrl: s.officeViewerUrl,
        yallaTaalimUrl: s.yallaTaalimUrl,
        openMindMap: () => {
          setRemediationLevel(s.level);
          setRemediationSubject(s.subject);
          setRemediationSessionNumber(s.sessionNumber);
          setSelectedCategory("remediation_intensive");
          const el = document.getElementById("mindmaps-viewer-zone");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        },
      });
    });

    // 2. Arabic TaRL mind maps by Khalid Cheniour
    ARABIC_TARL_MINDMAPS.forEach((ar) => {
      list.push({
        id: ar.id,
        sourceCategory: "arabic_tarl",
        categoryLabel: "طارل العربية (خالد شنيور)",
        level: 3,
        levelLabelAr: "المستويات 3 إلى 6",
        levelLabelFr: "3-6AEP",
        levelBadgeColor: "bg-amber-100 text-amber-900 border-amber-300",
        subject: "AR",
        subjectLabelAr: "اللغة العربية",
        title: ar.title,
        topicAr: `${ar.blockName} - ${ar.level}`,
        objectivesAr: ar.objectives.join(" • "),
        openMindMap: () => {
          setSelectedArabicTarlSessionId(ar.id);
          setSelectedCategory("arabic_tarl");
          const el = document.getElementById("mindmaps-viewer-zone");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        },
      });
    });

    // 3. French Level 1 (24 sessions)
    frenchSessions.forEach((f, idx) => {
      list.push({
        id: `french-l1-s${f.seance}-w${f.semaine}`,
        sourceCategory: "french_level1",
        categoryLabel: "الفرنسية (المستوى 1)",
        level: 1,
        levelLabelAr: "المستوى الأول",
        levelLabelFr: "1AEP",
        levelBadgeColor: "bg-blue-100 text-blue-800 border-blue-300",
        subject: "FR",
        subjectLabelAr: "اللغة الفرنسية",
        sessionNumber: f.seance,
        title: `Français 1AEP - Semaine ${f.semaine} / Séance ${f.seance}`,
        topicAr: `${f.vocabulaire.title}: ${f.vocabulaire.content.substring(0, 70)}...`,
        objectivesAr: f.objectifs,
        openMindMap: () => {
          setSelectedFrenchIdx(idx);
          setSelectedCategory("french_level1");
          const el = document.getElementById("mindmaps-viewer-zone");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        },
      });
    });

    // 4. Math Level 1 (24 sessions)
    mathSessions.forEach((m, idx) => {
      list.push({
        id: `math-l1-s${m.seance}-w${m.semaine}`,
        sourceCategory: "math_level1",
        categoryLabel: "الرياضيات (المستوى 1)",
        level: 1,
        levelLabelAr: "المستوى الأول",
        levelLabelFr: "1AEP",
        levelBadgeColor: "bg-blue-100 text-blue-800 border-blue-300",
        subject: "MATH",
        subjectLabelAr: "الرياضيات",
        sessionNumber: m.seance,
        title: `الرياضيات 1AEP - الأسبوع ${m.semaine} / الحصة ${m.seance}`,
        topicAr: `${m.activite1.title} • ${m.activite2.title}`,
        objectivesAr: m.objectifs,
        openMindMap: () => {
          setSelectedMathIdx(idx);
          setSelectedCategory("math_level1");
          const el = document.getElementById("mindmaps-viewer-zone");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        },
      });
    });

    // 5. Arabic Level 1 (24 sessions)
    arabicSessions.forEach((a, idx) => {
      list.push({
        id: `arabic-l1-s${a.seance}-w${a.semaine}`,
        sourceCategory: "arabic_level1",
        categoryLabel: "اللغة العربية (المستوى 1)",
        level: 1,
        levelLabelAr: "المستوى الأول",
        levelLabelFr: "1AEP",
        levelBadgeColor: "bg-blue-100 text-blue-800 border-blue-300",
        subject: "AR",
        subjectLabelAr: "اللغة العربية",
        sessionNumber: a.seance,
        title: `اللغة العربية 1AEP - الأسبوع ${a.semaine} / الحصة ${a.seance}`,
        topicAr: `${a.activite1.title} • ${a.activite2.title}`,
        objectivesAr: a.objectifs,
        openMindMap: () => {
          setSelectedArabicIdx(idx);
          setSelectedCategory("arabic_level1");
          const el = document.getElementById("mindmaps-viewer-zone");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        },
      });
    });

    return list;
  }, [frenchSessions, mathSessions, arabicSessions]);

  // Is searching / filtering currently active?
  const isSearchActive =
    searchQuery.trim().length > 0 ||
    selectedSubjectFilter !== "all" ||
    selectedLevelFilter !== "all" ||
    selectedSourceFilter !== "all";

  // Filtered mind maps based on query and filters
  const filteredMindMaps = useMemo<UnifiedMindMapSearchItem[]>(() => {
    if (!isSearchActive) return [];

    const normQ = normalizeSearch(searchQuery);

    return allSearchableMindMaps.filter((item) => {
      // 1. Subject filter
      if (selectedSubjectFilter !== "all" && item.subject !== selectedSubjectFilter) {
        return false;
      }

      // 2. Level filter
      if (selectedLevelFilter !== "all") {
        if (item.sourceCategory === "arabic_tarl") {
          if (selectedLevelFilter < 3) return false;
        } else if (item.level !== selectedLevelFilter) {
          return false;
        }
      }

      // 3. Source filter
      if (selectedSourceFilter !== "all") {
        if (selectedSourceFilter === "remediation" && item.sourceCategory !== "remediation_intensive") {
          return false;
        }
        if (selectedSourceFilter === "arabic_tarl" && item.sourceCategory !== "arabic_tarl") {
          return false;
        }
        if (
          selectedSourceFilter === "level1" &&
          item.sourceCategory !== "french_level1" &&
          item.sourceCategory !== "math_level1" &&
          item.sourceCategory !== "arabic_level1"
        ) {
          return false;
        }
      }

      // 4. Text search query
      if (normQ.length > 0) {
        const titleNorm = normalizeSearch(item.title);
        const topicNorm = normalizeSearch(item.topicAr);
        const objNorm = normalizeSearch(item.objectivesAr);
        const subjNorm = normalizeSearch(item.subjectLabelAr);
        const lvlNorm = normalizeSearch(item.levelLabelAr);
        const lvlFr = (item.levelLabelFr || "").toLowerCase();
        const sessionStr = item.sessionNumber ? item.sessionNumber.toString() : "";

        const matches =
          titleNorm.includes(normQ) ||
          topicNorm.includes(normQ) ||
          objNorm.includes(normQ) ||
          subjNorm.includes(normQ) ||
          lvlNorm.includes(normQ) ||
          lvlFr.includes(normQ) ||
          sessionStr === normQ ||
          `حصة ${sessionStr}`.includes(normQ) ||
          `الحصة ${sessionStr}`.includes(normQ);

        if (!matches) return false;
      }

      return true;
    });
  }, [allSearchableMindMaps, isSearchActive, searchQuery, selectedSubjectFilter, selectedLevelFilter, selectedSourceFilter]);

  const handleClearSearch = () => {
    setSearchQuery("");
    setSelectedSubjectFilter("all");
    setSelectedLevelFilter("all");
    setSelectedSourceFilter("all");
    setVisibleResultsCount(24);
  };

  const handleApplyPresetSearch = (subject: "all" | "MATH" | "AR" | "FR", level: "all" | number, query: string) => {
    setSelectedSubjectFilter(subject);
    setSelectedLevelFilter(level);
    setSearchQuery(query);
    setVisibleResultsCount(24);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-16 font-cairo">
      {/* 1. Header Toolbar (Hidden during Print) */}
      <div className="no-print bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white p-6 rounded-3xl shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 text-right">
            <div className="flex items-center gap-2 justify-start flex-row-reverse">
              <span className="bg-amber-400 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                بنك الخطاطات الذهنية
              </span>
              <span className="bg-blue-600/60 text-blue-100 text-xs px-2.5 py-0.5 rounded-full">
                فترة الدعم المكثف والتهيئة 2026/2027
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white">
              قسم الخطاطات الذهنية لتخطيط حصص التعلم والدعم
            </h1>
            <p className="text-xs md:text-sm text-slate-200">
              دليل ونماذج تفاعلية بصرية لجميع حصص فترة التهيئة والدعم (الفرنسية، الرياضيات، اللغة العربية، وطارل TaRL)
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 justify-end">
            {selectedCategory !== "tarl_french" && (
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
                <span>{isEditMode ? "وضع المعاينة والطباعة" : "تعديل النصوص"}</span>
              </button>
            )}

            {selectedCategory !== "tarl_french" && (
              <button
                type="button"
                onClick={handleSaveAll}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-md"
                title="حفظ التعديلات في المتصفح"
              >
                <Save className="w-4 h-4" />
                <span>{savedSuccess ? "تم الحفظ ✓" : "حفظ"}</span>
              </button>
            )}

            {selectedCategory !== "tarl_french" && (
              <button
                type="button"
                onClick={handleCopySummary}
                className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                title="نسخ ملخص الحصة"
              >
                <Copy className="w-4 h-4" />
                <span>{copiedSuccess ? "تم النسخ!" : "نسخ"}</span>
              </button>
            )}

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

        {/* Categories Tab Navigation */}
        <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setSelectedCategory("remediation_intensive")}
            className={`px-4 py-2 rounded-xl font-black flex items-center gap-2 transition cursor-pointer ${
              selectedCategory === "remediation_intensive"
                ? "bg-amber-400 text-slate-950 shadow-md ring-2 ring-white/50"
                : "bg-slate-800/80 hover:bg-slate-700 text-slate-200"
            }`}
          >
            <Presentation className="w-4 h-4 text-blue-800" />
            <span>خطاطات وعروض الدعم المكثف (جميع المواد والمستويات 1-6)</span>
            <span className="bg-blue-900 text-white text-[10px] font-black px-1.5 py-0.5 rounded">
              يلا تعليم + R2
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory("arabic_tarl")}
            className={`px-4 py-2 rounded-xl font-black flex items-center gap-2 transition cursor-pointer ${
              selectedCategory === "arabic_tarl"
                ? "bg-amber-400 text-slate-950 shadow-md ring-2 ring-white/50"
                : "bg-slate-800/80 hover:bg-slate-700 text-slate-200"
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>طارل العربية: مسارات ولبنات (أ. خالد شنيور)</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory("french_level1")}
            className={`px-4 py-2 rounded-xl font-black flex items-center gap-2 transition cursor-pointer ${
              selectedCategory === "french_level1"
                ? "bg-amber-400 text-slate-950 shadow-md ring-2 ring-white/50"
                : "bg-slate-800/80 hover:bg-slate-700 text-slate-200"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>الفرنسية: المستوى الأول (24 حصة)</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory("math_level1")}
            className={`px-4 py-2 rounded-xl font-black flex items-center gap-2 transition cursor-pointer ${
              selectedCategory === "math_level1"
                ? "bg-amber-400 text-slate-950 shadow-md ring-2 ring-white/50"
                : "bg-slate-800/80 hover:bg-slate-700 text-slate-200"
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>الرياضيات: المستوى الأول (24 حصة)</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory("arabic_level1")}
            className={`px-4 py-2 rounded-xl font-black flex items-center gap-2 transition cursor-pointer ${
              selectedCategory === "arabic_level1"
                ? "bg-amber-400 text-slate-950 shadow-md ring-2 ring-white/50"
                : "bg-slate-800/80 hover:bg-slate-700 text-slate-200"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>اللغة العربية: المستوى الأول (24 حصة)</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory("tarl_french")}
            className={`px-4 py-2 rounded-xl font-black flex items-center gap-2 transition cursor-pointer ${
              selectedCategory === "tarl_french"
                ? "bg-sky-400 text-slate-950 shadow-md ring-2 ring-white/50"
                : "bg-slate-800/80 hover:bg-slate-700 text-slate-200"
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>خطاطة طارل السحابية (TaRL Français)</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Search & Filters Bar for All Mind Maps (حقل بحث وتصفية متقدم للخرائط الذهنية) */}
      <div className="no-print bg-white rounded-3xl border border-slate-200 p-5 md:p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200 shrink-0">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2 flex-wrap">
                <span>البحث المتقدم في بنك الخرائط الذهنية وعروض الدعم</span>
                <span className="bg-amber-100 text-amber-900 text-[11px] font-bold px-2 py-0.5 rounded-full border border-amber-300">
                  {allSearchableMindMaps.length} خطاطة متاحة
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                ابحث في جميع الخطاطات والعروض التفاعلية المعتمدة بالمادة، المستوى الدراسي (1 إلى 6)، رقم الحصة، أو المفهوم
              </p>
            </div>
          </div>

          {isSearchActive && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="self-start md:self-auto bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200 hover:border-rose-200 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>إعادة تعيين وتفريغ البحث</span>
            </button>
          )}
        </div>

        {/* Search Input and Main Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Free Text Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالاسم، المفهوم (مثال: الجمع، الطرح، الحروف، الأعداد، الأشكال، القراءة...)..."
              className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-blue-600 rounded-xl pr-10 pl-9 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-2xs transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute left-3 top-2.5 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
                title="مسح النص"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Subject Dropdown / Selector */}
          <div className="md:col-span-3">
            <select
              value={selectedSubjectFilter}
              onChange={(e) => setSelectedSubjectFilter(e.target.value as any)}
              className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer shadow-2xs transition"
            >
              <option value="all">📚 جميع المواد الدراسية</option>
              <option value="MATH">🔢 مادة الرياضيات (Maths)</option>
              <option value="AR">📖 مادة اللغة العربية (Arabe)</option>
              <option value="FR">🗣️ مادة اللغة الفرنسية (Français)</option>
            </select>
          </div>

          {/* Level Dropdown / Selector */}
          <div className="md:col-span-3">
            <select
              value={selectedLevelFilter}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedLevelFilter(val === "all" ? "all" : parseInt(val, 10));
              }}
              className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-blue-600 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer shadow-2xs transition"
            >
              <option value="all">🎓 جميع المستويات (1-6)</option>
              <option value="1">المستوى الأول (1AEP)</option>
              <option value="2">المستوى الثاني (2AEP)</option>
              <option value="3">المستوى الثالث (3AEP)</option>
              <option value="4">المستوى الرابع (4AEP)</option>
              <option value="5">المستوى الخامس (5AEP)</option>
              <option value="6">المستوى السادس (6AEP)</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Buttons & Tags */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-bold text-slate-500 flex items-center gap-1 ml-1 text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>بحث سريع مقترح :</span>
            </span>
            <button
              type="button"
              onClick={() => handleApplyPresetSearch("MATH", 4, "")}
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-lg font-bold text-[11px] transition cursor-pointer"
            >
              الرياضيات - المستوى الرابع (4AEP)
            </button>
            <button
              type="button"
              onClick={() => handleApplyPresetSearch("AR", 1, "")}
              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-lg font-bold text-[11px] transition cursor-pointer"
            >
              اللغة العربية - المستوى الأول (1AEP)
            </button>
            <button
              type="button"
              onClick={() => handleApplyPresetSearch("FR", 2, "")}
              className="bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 px-2.5 py-1 rounded-lg font-bold text-[11px] transition cursor-pointer"
            >
              Français 2AEP
            </button>
            <button
              type="button"
              onClick={() => handleApplyPresetSearch("MATH", "all", "الجمع")}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-lg text-[11px] font-medium transition cursor-pointer"
            >
              الجمع والطرح
            </button>
            <button
              type="button"
              onClick={() => handleApplyPresetSearch("MATH", "all", "الحساب الذهني")}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-lg text-[11px] font-medium transition cursor-pointer"
            >
              الحساب الذهني
            </button>
            <button
              type="button"
              onClick={() => handleApplyPresetSearch("MATH", 6, "")}
              className="bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer"
            >
              المستوى السادس (6AEP)
            </button>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-[11px] text-slate-400">
              {isSearchActive ? `نتائج مطابقة: ${filteredMindMaps.length}` : `العدد الإجمالي: ${allSearchableMindMaps.length}`}
            </span>
          </div>
        </div>

        {/* Dynamic Search Results Grid (Visible when searching or filtering) */}
        {isSearchActive && (
          <div className="pt-4 border-t border-slate-200 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between bg-blue-50/70 border border-blue-200 rounded-2xl p-3 px-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-700" />
                <span className="text-xs font-black text-blue-950">
                  تم العثور على {filteredMindMaps.length} خطاطة ذهنية مطابقة لمعايير البحث
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="text-xs text-blue-700 hover:text-blue-900 font-bold hover:underline cursor-pointer"
                >
                  إلغاء البحث والعودة للتصفح العادي ✕
                </button>
              </div>
            </div>

            {filteredMindMaps.length === 0 ? (
              <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-6 space-y-3">
                <Search className="w-8 h-8 text-slate-400 mx-auto" />
                <h4 className="text-sm font-bold text-slate-800">
                  لم يتم العثور على خطاطات ذهنية تطابق هذا البحث
                </h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  جرب البحث بمصطلحات أكثر شمولاً مثل "الجمع" أو "الضرب" أو اختر "جميع المواد" و"جميع المستويات".
                </p>
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer"
                >
                  عرض جميع الخطاطات
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {filteredMindMaps.slice(0, visibleResultsCount).map((item) => (
                    <div
                      key={item.id}
                      className="bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-blue-400 rounded-2xl p-4 shadow-2xs hover:shadow-md transition flex flex-col justify-between space-y-3 group"
                    >
                      <div className="space-y-2">
                        {/* Badges: Level & Subject & Source */}
                        <div className="flex items-center justify-between gap-1.5 flex-wrap">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${item.levelBadgeColor}`}>
                              {item.levelLabelAr} ({item.levelLabelFr})
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                                item.subject === "MATH"
                                  ? "bg-blue-50 text-blue-700 border-blue-200"
                                  : item.subject === "AR"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                  : "bg-sky-50 text-sky-700 border-sky-200"
                              }`}
                            >
                              {item.subjectLabelAr}
                            </span>
                          </div>
                          {item.sessionNumber && (
                            <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                              الحصة {item.sessionNumber}
                            </span>
                          )}
                        </div>

                        {/* Title & Topic */}
                        <div>
                          <h4 className="text-xs font-black text-slate-900 group-hover:text-blue-700 transition line-clamp-2">
                            {item.topicAr}
                          </h4>
                          <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                            {item.title}
                          </p>
                        </div>

                        {/* Objectives snippet */}
                        {item.objectivesAr && (
                          <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <strong>الهدف:</strong> {item.objectivesAr}
                          </p>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1.5 flex-wrap">
                        <button
                          type="button"
                          onClick={item.openMindMap}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-black px-3 py-1.5 rounded-xl text-[11px] flex items-center gap-1 transition cursor-pointer shadow-2xs"
                          title="عرض الخطاطة الذهنية ومراحل التدريس الصريح"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>عرض الخطاطة</span>
                        </button>

                        <div className="flex items-center gap-1">
                          {item.r2PptxUrl && (
                            <a
                              href={item.r2PptxUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 p-1.5 rounded-xl text-[11px] flex items-center gap-1 transition cursor-pointer"
                              title="تنزيل عرض PPTX من سحابة R2"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">PPTX</span>
                            </a>
                          )}
                          {item.officeViewerUrl && (
                            <a
                              href={item.officeViewerUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 p-1.5 rounded-xl text-[11px] transition cursor-pointer"
                              title="معاينة بالمتصفح عبر PowerPoint Online"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Show more button if filtered results exceed visibleResultsCount */}
                {filteredMindMaps.length > visibleResultsCount && (
                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setVisibleResultsCount((prev) => prev + 24)}
                      className="bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-blue-800 border border-slate-300 hover:border-blue-300 font-bold px-5 py-2 rounded-xl text-xs transition cursor-pointer"
                    >
                      عرض المزيد من النتائج (+24) • المتبقي {filteredMindMaps.length - visibleResultsCount}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. Main Content for Selected Mind Map Category */}
      <div id="mindmaps-viewer-zone">
        {selectedCategory === "remediation_intensive" ? (
          <RemediationMindMapsViewer
            teacherProfile={teacherProfile}
            initialLevel={remediationLevel}
            initialSubject={remediationSubject}
            initialSessionNumber={remediationSessionNumber}
          />
        ) : selectedCategory === "arabic_tarl" ? (
          <ArabicTarlMindMapView
            teacherProfile={teacherProfile}
            initialSessionId={selectedArabicTarlSessionId}
            onNavigateToTab={onNavigateToTab}
          />
        ) : selectedCategory === "tarl_french" ? (
          <TarlFrenchMindMap teacherProfile={teacherProfile} onNavigateToTab={onNavigateToTab} />
        ) : (
        <div className="space-y-6">
          {/* Session Selector & Week Filters (No-Print) */}
          <div className="no-print bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              {/* Week Filter Pills */}
              <div className="flex items-center gap-1.5 flex-wrap text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1 ml-2">
                  <Filter className="w-3.5 h-3.5 text-blue-600" />
                  <span>تصفية بالأسابيع :</span>
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedWeekFilter("all")}
                  className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                    selectedWeekFilter === "all"
                      ? "bg-blue-900 text-white"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  جميع الأسابيع (24 حصة)
                </button>
                {[1, 2, 3, 4].map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setSelectedWeekFilter(w)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                      selectedWeekFilter === w
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    الأسبوع {w} (الحصص {(w - 1) * 6 + 1} إلى {w * 6})
                  </button>
                ))}
              </div>

              {/* Quick Select Dropdown */}
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-slate-700 whitespace-nowrap">
                  الانتقال المباشر للحصة :
                </span>
                <select
                  value={
                    selectedCategory === "french_level1"
                      ? selectedFrenchIdx
                      : selectedCategory === "math_level1"
                      ? selectedMathIdx
                      : selectedArabicIdx
                  }
                  onChange={(e) => {
                    const idx = Number(e.target.value);
                    if (selectedCategory === "french_level1") setSelectedFrenchIdx(idx);
                    else if (selectedCategory === "math_level1") setSelectedMathIdx(idx);
                    else setSelectedArabicIdx(idx);
                  }}
                  className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 cursor-pointer text-xs"
                >
                  {selectedCategory === "french_level1" &&
                    frenchSessions.map((s, idx) => (
                      <option key={s.id} value={idx}>
                        Semaine {s.semaine} - Séance {s.seance} : {s.title}
                      </option>
                    ))}
                  {selectedCategory === "math_level1" &&
                    mathSessions.map((s, idx) => (
                      <option key={s.id} value={idx}>
                        الأسبوع {s.semaine} - الحصة {s.seance} : {s.title}
                      </option>
                    ))}
                  {selectedCategory === "arabic_level1" &&
                    arabicSessions.map((s, idx) => (
                      <option key={s.id} value={idx}>
                        الأسبوع {s.semaine} - الحصة {s.seance} : {s.title}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* Quick Session Bar (24 buttons) */}
            <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto pb-1">
              {Array.from({ length: 24 }).map((_, i) => {
                const sNum = i + 1;
                const weekNum = Math.ceil(sNum / 6);
                if (selectedWeekFilter !== "all" && selectedWeekFilter !== weekNum) return null;

                const isCurrent =
                  (selectedCategory === "french_level1" && selectedFrenchIdx === i) ||
                  (selectedCategory === "math_level1" && selectedMathIdx === i) ||
                  (selectedCategory === "arabic_level1" && selectedArabicIdx === i);

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      if (selectedCategory === "french_level1") setSelectedFrenchIdx(i);
                      else if (selectedCategory === "math_level1") setSelectedMathIdx(i);
                      else setSelectedArabicIdx(i);
                    }}
                    className={`shrink-0 w-8 h-8 rounded-lg text-xs font-black transition cursor-pointer flex items-center justify-center ${
                      isCurrent
                        ? "bg-amber-400 text-slate-950 ring-2 ring-amber-500 scale-105 shadow-xs"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                    title={`الحصة ${sNum}`}
                  >
                    {sNum}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. The Visual Printable A4 Mind Map Canvas */}
          <div className="flex justify-center">
            {/* 3.A: Français 1AEP Layout */}
            {selectedCategory === "french_level1" && (
              <div
                id="french-mindmap-printable"
                className="w-full max-w-4xl bg-[#fffcf2] border-2 border-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 relative overflow-hidden print:border-none print:shadow-none print:p-2 print:max-w-none print:w-full print:rounded-none"
                style={{ backgroundColor: "#fffde7" }}
                dir="ltr"
              >
                {/* Header Row */}
                <div className="flex justify-between items-center gap-2 mb-6 font-sans">
                  <div className="bg-[#f8b195] text-slate-900 border-2 border-slate-800 px-6 py-2 rounded-md font-black text-lg">
                    Français
                  </div>

                  <div className="flex items-center gap-3 text-sm font-bold">
                    <div className="flex items-center gap-2 bg-white border border-slate-400 px-3 py-1.5 rounded-md">
                      <span className="font-bold text-slate-700">Semaine</span>
                      <span className="text-rose-700 font-black text-base">{currentFrench.semaine}</span>
                    </div>

                    <div className="flex items-center gap-2 bg-white border border-slate-400 px-3 py-1.5 rounded-md">
                      <span className="font-bold text-slate-700">Jour</span>
                      <span className="text-rose-700 font-black text-base">{currentFrench.jour}</span>
                    </div>

                    <div className="flex items-center gap-2 bg-white border border-slate-400 px-3 py-1.5 rounded-md">
                      <span className="font-bold text-slate-700">Séance:</span>
                      <span className="text-rose-700 font-black text-base">{currentFrench.seance}</span>
                    </div>
                  </div>
                </div>

                {/* Central Canvas with Connectors */}
                <div className="relative space-y-6">
                  {/* Top Row: Box 1 (Left) & Box 5 (Right) */}
                  <div className="grid grid-cols-2 gap-8 items-start">
                    {/* Box 1: Chanson action (5 min) */}
                    <div className="relative bg-[#fceae4] border-2 border-slate-800 rounded-md p-3 shadow-xs font-sans">
                      <div className="flex items-center justify-between pb-1 border-b border-rose-200 text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="text-rose-800 font-black text-sm">1</span>
                          <span className="font-black text-rose-900">Chanson action</span>
                        </div>
                        <span className="text-[11px] text-sky-800 font-bold bg-sky-100 px-2 py-0.5 rounded-sm">
                          {currentFrench.chansonAction.duree}
                        </span>
                      </div>
                      <div className="mt-2 text-xs font-bold text-slate-800 min-h-[45px] flex items-center">
                        {isEditMode ? (
                          <input
                            type="text"
                            value={currentFrench.chansonAction.title}
                            onChange={(e) =>
                              updateCurrentFrench("chansonAction", {
                                ...currentFrench.chansonAction,
                                title: e.target.value,
                              })
                            }
                            className="w-full border border-rose-300 p-1 rounded-sm text-xs bg-white"
                          />
                        ) : (
                          <span>{currentFrench.chansonAction.title}</span>
                        )}
                      </div>
                    </div>

                    {/* Box 5: Jeu (10 min) */}
                    <div className="relative bg-[#e0f2f1] border-2 border-slate-800 rounded-md p-3 shadow-xs font-sans">
                      <div className="flex items-center justify-between pb-1 border-b border-teal-200 text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="text-teal-800 font-black text-sm">5</span>
                          <span className="font-black text-teal-900">Jeu</span>
                        </div>
                        <span className="text-[11px] text-sky-800 font-bold bg-sky-100 px-2 py-0.5 rounded-sm">
                          {currentFrench.jeu.duree}
                        </span>
                      </div>
                      <div className="mt-2 text-xs font-bold text-slate-800 min-h-[45px] flex items-center">
                        {isEditMode ? (
                          <input
                            type="text"
                            value={currentFrench.jeu.title}
                            onChange={(e) =>
                              updateCurrentFrench("jeu", {
                                ...currentFrench.jeu,
                                title: e.target.value,
                              })
                            }
                            className="w-full border border-teal-300 p-1 rounded-sm text-xs bg-white"
                          />
                        ) : (
                          <span>{currentFrench.jeu.title}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Connecting Lines to Middle Box */}
                  <div className="hidden sm:flex justify-between px-20 -my-4">
                    <div className="w-0.5 h-6 bg-slate-800 ml-12"></div>
                    <div className="w-0.5 h-6 bg-slate-800 mr-12"></div>
                  </div>

                  {/* Middle Box: Central Objectives */}
                  <div className="bg-[#fff9c4] border-2 border-slate-800 rounded-md p-5 shadow-xs text-center font-sans">
                    {isEditMode ? (
                      <textarea
                        value={currentFrench.objectifs}
                        onChange={(e) => updateCurrentFrench("objectifs", e.target.value)}
                        rows={3}
                        className="w-full text-sm font-bold text-blue-950 p-2 rounded border border-amber-400 bg-white"
                      />
                    ) : (
                      <div className="text-sm sm:text-base font-bold text-blue-950 leading-relaxed whitespace-pre-line">
                        {currentFrench.objectifs}
                      </div>
                    )}
                  </div>

                  {/* Connecting Lines to Bottom Boxes */}
                  <div className="hidden sm:flex justify-around px-8 -my-4">
                    <div className="w-0.5 h-6 bg-slate-800"></div>
                    <div className="w-0.5 h-6 bg-slate-800"></div>
                    <div className="w-0.5 h-6 bg-slate-800"></div>
                  </div>

                  {/* Bottom Row: Box 2 (Vocabulaire), Box 3 (Chanson alphabet), Box 4 (Présentation lettre) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start font-sans">
                    {/* Box 2: Vocabulaire (20 min) */}
                    <div className="bg-[#fceae4] border-2 border-slate-800 rounded-md p-3 shadow-xs">
                      <div className="flex items-center justify-between pb-1 border-b border-rose-200 text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="text-rose-800 font-black text-sm">2</span>
                          <span className="font-black text-rose-900">Vocabulaire</span>
                        </div>
                        <span className="text-[11px] text-sky-800 font-bold bg-sky-100 px-2 py-0.5 rounded-sm">
                          {currentFrench.vocabulaire.duree}
                        </span>
                      </div>
                      <div className="mt-2 text-xs font-bold text-slate-800 min-h-[50px] flex items-center">
                        {isEditMode ? (
                          <textarea
                            value={currentFrench.vocabulaire.content}
                            onChange={(e) =>
                              updateCurrentFrench("vocabulaire", {
                                ...currentFrench.vocabulaire,
                                content: e.target.value,
                              })
                            }
                            rows={2}
                            className="w-full border border-rose-300 p-1 rounded-sm text-xs bg-white"
                          />
                        ) : (
                          <span>{currentFrench.vocabulaire.content}</span>
                        )}
                      </div>
                    </div>

                    {/* Box 3: Chanson de l'alphabet (5 min) */}
                    <div className="bg-[#fff3e0] border-2 border-slate-800 rounded-md p-3 shadow-xs">
                      <div className="flex items-center justify-between pb-1 border-b border-amber-200 text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="text-amber-800 font-black text-sm">3</span>
                          <span className="font-black text-amber-900">Chanson de l'alphabet</span>
                        </div>
                        <span className="text-[11px] text-sky-800 font-bold bg-sky-100 px-2 py-0.5 rounded-sm">
                          {currentFrench.chansonAlphabet.duree}
                        </span>
                      </div>
                      <div className="mt-2 text-xs font-bold text-slate-800 min-h-[50px] flex items-center">
                        {isEditMode ? (
                          <input
                            type="text"
                            value={currentFrench.chansonAlphabet.title}
                            onChange={(e) =>
                              updateCurrentFrench("chansonAlphabet", {
                                ...currentFrench.chansonAlphabet,
                                title: e.target.value,
                              })
                            }
                            className="w-full border border-amber-300 p-1 rounded-sm text-xs bg-white"
                          />
                        ) : (
                          <span>{currentFrench.chansonAlphabet.title}</span>
                        )}
                      </div>
                    </div>

                    {/* Box 4: Présentation de la lettre (20 min) */}
                    <div className="bg-[#e8f0fe] border-2 border-slate-800 rounded-md p-3 shadow-xs">
                      <div className="flex items-center justify-between pb-1 border-b border-blue-200 text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="text-blue-800 font-black text-sm">4</span>
                          <span className="font-black text-blue-900">Présentation de la lettre</span>
                        </div>
                        <span className="text-[11px] text-sky-800 font-bold bg-sky-100 px-2 py-0.5 rounded-sm">
                          {currentFrench.presentationLettre.duree}
                        </span>
                      </div>
                      <div className="mt-2 text-xs font-bold text-slate-800 min-h-[50px] flex items-center">
                        {isEditMode ? (
                          <textarea
                            value={currentFrench.presentationLettre.content}
                            onChange={(e) =>
                              updateCurrentFrench("presentationLettre", {
                                ...currentFrench.presentationLettre,
                                content: e.target.value,
                              })
                            }
                            rows={2}
                            className="w-full border border-blue-300 p-1 rounded-sm text-xs bg-white"
                          />
                        ) : (
                          <span>{currentFrench.presentationLettre.content}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Watermark */}
                <div className="mt-6 pt-2 border-t border-slate-300 flex justify-between items-center text-[10px] text-slate-500 font-sans">
                  <span>ProfPress • Schéma Pédagogique Français 1AEP</span>
                  <span>Année Scolaire 2026/2027</span>
                </div>
              </div>
            )}

            {/* 3.B: Mathématiques 1AEP Layout */}
            {selectedCategory === "math_level1" && (
              <div
                id="math-mindmap-printable"
                className="w-full max-w-4xl bg-[#eef2f6] border-2 border-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 relative overflow-hidden print:border-none print:shadow-none print:p-2 print:max-w-none print:w-full print:rounded-none"
                style={{ backgroundColor: "#eef3f8" }}
                dir="rtl"
              >
                {/* Header Row */}
                <div className="flex justify-between items-center gap-2 mb-6">
                  <div className="bg-[#cfe2f3] text-slate-950 border-2 border-slate-800 px-6 py-2 rounded-md font-black text-lg">
                    الرياضيات
                  </div>

                  <div className="flex items-center gap-3 text-sm font-bold">
                    <div className="flex items-center gap-2 bg-white border border-slate-400 px-3 py-1.5 rounded-md">
                      <span className="font-bold text-slate-700">الأسبوع</span>
                      <span className="text-red-700 font-black text-base">{currentMath.semaine}</span>
                    </div>

                    <div className="flex items-center gap-2 bg-white border border-slate-400 px-3 py-1.5 rounded-md">
                      <span className="font-bold text-slate-700">اليوم</span>
                      <span className="text-red-700 font-black text-base">{currentMath.jour}</span>
                    </div>

                    <div className="flex items-center gap-2 bg-white border border-slate-400 px-3 py-1.5 rounded-md">
                      <span className="font-bold text-slate-700">الحصة</span>
                      <span className="text-red-700 font-black text-base">{currentMath.seance}</span>
                    </div>
                  </div>
                </div>

                {/* Central Canvas with Connectors */}
                <div className="relative space-y-6">
                  {/* Top Row: Box 4 (Left) & Box 1 (Right) */}
                  <div className="grid grid-cols-2 gap-8 items-start">
                    {/* Box 4 (Top Left) */}
                    <div className="relative bg-[#e8f0fe] border-2 border-slate-800 rounded-md p-3 shadow-xs">
                      <div className="flex items-center justify-between pb-1 border-b border-blue-200 text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="text-blue-800 font-black text-sm">4</span>
                          <span className="font-black text-red-700">{currentMath.activite4.type}</span>
                        </div>
                        <span className="text-[11px] text-blue-700 font-bold bg-blue-100 px-2 py-0.5 rounded-sm">
                          {currentMath.activite4.duree}
                        </span>
                      </div>
                      <div className="mt-2 text-xs font-bold text-slate-900 min-h-[45px] flex items-center">
                        {isEditMode ? (
                          <input
                            type="text"
                            value={currentMath.activite4.title}
                            onChange={(e) =>
                              updateCurrentMath("activite4", {
                                ...currentMath.activite4,
                                title: e.target.value,
                              })
                            }
                            className="w-full border border-blue-300 p-1 rounded-sm text-xs bg-white"
                          />
                        ) : (
                          <span>{currentMath.activite4.title}</span>
                        )}
                      </div>
                    </div>

                    {/* Box 1 (Top Right) */}
                    <div className="relative bg-[#fceae4] border-2 border-slate-800 rounded-md p-3 shadow-xs">
                      <div className="flex items-center justify-between pb-1 border-b border-rose-200 text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="text-red-700 font-black text-sm">1</span>
                          <span className="font-black text-red-700">{currentMath.activite1.type}</span>
                        </div>
                        <span className="text-[11px] text-blue-700 font-bold bg-blue-100 px-2 py-0.5 rounded-sm">
                          {currentMath.activite1.duree}
                        </span>
                      </div>
                      <div className="mt-2 text-xs font-bold text-slate-900 min-h-[45px] flex items-center">
                        {isEditMode ? (
                          <input
                            type="text"
                            value={currentMath.activite1.title}
                            onChange={(e) =>
                              updateCurrentMath("activite1", {
                                ...currentMath.activite1,
                                title: e.target.value,
                              })
                            }
                            className="w-full border border-rose-300 p-1 rounded-sm text-xs bg-white"
                          />
                        ) : (
                          <span>{currentMath.activite1.title}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Connecting lines */}
                  <div className="hidden sm:flex justify-between px-20 -my-4">
                    <div className="w-0.5 h-6 bg-slate-800 ml-12"></div>
                    <div className="w-0.5 h-6 bg-slate-800 mr-12"></div>
                  </div>

                  {/* Middle Box: Central Objectives */}
                  <div className="bg-[#d9e2ec] border-2 border-slate-800 rounded-md p-5 shadow-xs text-center">
                    {isEditMode ? (
                      <textarea
                        value={currentMath.objectifs}
                        onChange={(e) => updateCurrentMath("objectifs", e.target.value)}
                        rows={3}
                        className="w-full text-sm font-bold text-blue-950 p-2 rounded border border-blue-400 bg-white"
                      />
                    ) : (
                      <div className="text-sm sm:text-base font-bold text-blue-950 leading-relaxed whitespace-pre-line">
                        {currentMath.objectifs}
                      </div>
                    )}
                  </div>

                  {/* Connecting lines */}
                  <div className="hidden sm:flex justify-between px-20 -my-4">
                    <div className="w-0.5 h-6 bg-slate-800 ml-12"></div>
                    <div className="w-0.5 h-6 bg-slate-800 mr-12"></div>
                  </div>

                  {/* Bottom Row: Box 3 (Left) & Box 2 (Right) */}
                  <div className="grid grid-cols-2 gap-8 items-start">
                    {/* Box 3 (Bottom Left) */}
                    <div className="bg-[#e8f5e9] border-2 border-slate-800 rounded-md p-3 shadow-xs">
                      <div className="flex items-center justify-between pb-1 border-b border-emerald-200 text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="text-emerald-800 font-black text-sm">3</span>
                          <span className="font-black text-red-700">{currentMath.activite3.type}</span>
                        </div>
                        <span className="text-[11px] text-blue-700 font-bold bg-blue-100 px-2 py-0.5 rounded-sm">
                          {currentMath.activite3.duree}
                        </span>
                      </div>
                      <div className="mt-2 text-xs font-bold text-slate-900 min-h-[50px] flex items-center whitespace-pre-line">
                        {isEditMode ? (
                          <textarea
                            value={currentMath.activite3.title}
                            onChange={(e) =>
                              updateCurrentMath("activite3", {
                                ...currentMath.activite3,
                                title: e.target.value,
                              })
                            }
                            rows={2}
                            className="w-full border border-emerald-300 p-1 rounded-sm text-xs bg-white"
                          />
                        ) : (
                          <span>{currentMath.activite3.title}</span>
                        )}
                      </div>
                    </div>

                    {/* Box 2 (Bottom Right) */}
                    <div className="bg-[#fff9c4] border-2 border-slate-800 rounded-md p-3 shadow-xs">
                      <div className="flex items-center justify-between pb-1 border-b border-amber-200 text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="text-amber-800 font-black text-sm">2</span>
                          <span className="font-black text-red-700">{currentMath.activite2.type}</span>
                        </div>
                        <span className="text-[11px] text-blue-700 font-bold bg-blue-100 px-2 py-0.5 rounded-sm">
                          {currentMath.activite2.duree}
                        </span>
                      </div>
                      <div className="mt-2 text-xs font-bold text-slate-900 min-h-[50px] flex items-center whitespace-pre-line">
                        {isEditMode ? (
                          <textarea
                            value={currentMath.activite2.title}
                            onChange={(e) =>
                              updateCurrentMath("activite2", {
                                ...currentMath.activite2,
                                title: e.target.value,
                              })
                            }
                            rows={3}
                            className="w-full border border-amber-300 p-1 rounded-sm text-xs bg-white"
                          />
                        ) : (
                          <span>{currentMath.activite2.title}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Watermark */}
                <div className="mt-6 pt-2 border-t border-slate-300 flex justify-between items-center text-[10px] text-slate-500">
                  <span>ProfPress • خطاطة مادة الرياضيات المستوى الأول</span>
                  <span>الموسم الدراسي 2026/2027</span>
                </div>
              </div>
            )}

            {/* 3.C: اللغة العربية 1AEP Layout */}
            {selectedCategory === "arabic_level1" && (
              <div
                id="arabic-mindmap-printable"
                className="w-full max-w-4xl bg-[#fbeae5] border-2 border-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 relative overflow-hidden print:border-none print:shadow-none print:p-2 print:max-w-none print:w-full print:rounded-none"
                style={{ backgroundColor: "#faebe7" }}
                dir="rtl"
              >
                {/* Header Row */}
                <div className="flex justify-between items-center gap-2 mb-6">
                  <div className="bg-[#cfe2f3] text-slate-950 border-2 border-slate-800 px-6 py-2 rounded-md font-black text-lg">
                    اللغة العربية
                  </div>

                  <div className="flex items-center gap-3 text-sm font-bold">
                    <div className="flex items-center gap-2 bg-white border border-slate-400 px-3 py-1.5 rounded-md">
                      <span className="font-bold text-slate-700">الأسبوع</span>
                      <span className="text-red-700 font-black text-base">{currentArabic.semaine}</span>
                    </div>

                    <div className="flex items-center gap-2 bg-white border border-slate-400 px-3 py-1.5 rounded-md">
                      <span className="font-bold text-slate-700">اليوم</span>
                      <span className="text-red-700 font-black text-base">{currentArabic.jour}</span>
                    </div>

                    <div className="flex items-center gap-2 bg-white border border-slate-400 px-3 py-1.5 rounded-md">
                      <span className="font-bold text-slate-700">الحصة</span>
                      <span className="text-red-700 font-black text-base">{currentArabic.seance}</span>
                    </div>
                  </div>
                </div>

                {/* Central Canvas with Connectors */}
                <div className="relative space-y-6">
                  {/* Top Row: Box 4 (Left) & Box 1 (Right) */}
                  <div className="grid grid-cols-2 gap-8 items-start">
                    {/* Box 4 (Top Left) */}
                    <div className="relative bg-[#fff3e0] border-2 border-slate-800 rounded-md p-3 shadow-xs">
                      <div className="flex items-center justify-between pb-1 border-b border-amber-200 text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="text-amber-800 font-black text-sm">4</span>
                          <span className="font-black text-red-700">{currentArabic.activite4.type}</span>
                        </div>
                        <span className="text-[11px] text-teal-800 font-bold bg-teal-100 px-2 py-0.5 rounded-sm">
                          {currentArabic.activite4.duree}
                        </span>
                      </div>
                      <div className="mt-2 text-xs font-bold text-slate-900 min-h-[45px] flex items-center">
                        {isEditMode ? (
                          <input
                            type="text"
                            value={currentArabic.activite4.title}
                            onChange={(e) =>
                              updateCurrentArabic("activite4", {
                                ...currentArabic.activite4,
                                title: e.target.value,
                              })
                            }
                            className="w-full border border-amber-300 p-1 rounded-sm text-xs bg-white"
                          />
                        ) : (
                          <span>{currentArabic.activite4.title}</span>
                        )}
                      </div>
                    </div>

                    {/* Box 1 (Top Right) */}
                    <div className="relative bg-[#e8f5e9] border-2 border-slate-800 rounded-md p-3 shadow-xs">
                      <div className="flex items-center justify-between pb-1 border-b border-emerald-200 text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="text-emerald-800 font-black text-sm">1</span>
                          <span className="font-black text-red-700">{currentArabic.activite1.type}</span>
                        </div>
                        <span className="text-[11px] text-teal-800 font-bold bg-teal-100 px-2 py-0.5 rounded-sm">
                          {currentArabic.activite1.duree}
                        </span>
                      </div>
                      <div className="mt-2 text-xs font-bold text-slate-900 min-h-[45px] flex items-center">
                        {isEditMode ? (
                          <input
                            type="text"
                            value={currentArabic.activite1.title}
                            onChange={(e) =>
                              updateCurrentArabic("activite1", {
                                ...currentArabic.activite1,
                                title: e.target.value,
                              })
                            }
                            className="w-full border border-emerald-300 p-1 rounded-sm text-xs bg-white"
                          />
                        ) : (
                          <span>{currentArabic.activite1.title}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Connecting lines */}
                  <div className="hidden sm:flex justify-between px-20 -my-4">
                    <div className="w-0.5 h-6 bg-slate-800 ml-12"></div>
                    <div className="w-0.5 h-6 bg-slate-800 mr-12"></div>
                  </div>

                  {/* Middle Box: Central Objectives */}
                  <div className="bg-[#d9e2ec] border-2 border-slate-800 rounded-md p-5 shadow-xs text-center">
                    {isEditMode ? (
                      <textarea
                        value={currentArabic.objectifs}
                        onChange={(e) => updateCurrentArabic("objectifs", e.target.value)}
                        rows={3}
                        className="w-full text-sm font-bold text-blue-950 p-2 rounded border border-blue-400 bg-white"
                      />
                    ) : (
                      <div className="text-sm sm:text-base font-bold text-blue-950 leading-relaxed whitespace-pre-line">
                        {currentArabic.objectifs}
                      </div>
                    )}
                  </div>

                  {/* Connecting lines */}
                  <div className="hidden sm:flex justify-between px-20 -my-4">
                    <div className="w-0.5 h-6 bg-slate-800 ml-12"></div>
                    <div className="w-0.5 h-6 bg-slate-800 mr-12"></div>
                  </div>

                  {/* Bottom Row: Box 3 (Left) & Box 2 (Right) */}
                  <div className="grid grid-cols-2 gap-8 items-start">
                    {/* Box 3 (Bottom Left) */}
                    <div className="bg-[#fceae4] border-2 border-slate-800 rounded-md p-3 shadow-xs">
                      <div className="flex items-center justify-between pb-1 border-b border-rose-200 text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="text-rose-800 font-black text-sm">3</span>
                          <span className="font-black text-red-700">{currentArabic.activite3.type}</span>
                        </div>
                        <span className="text-[11px] text-teal-800 font-bold bg-teal-100 px-2 py-0.5 rounded-sm">
                          {currentArabic.activite3.duree}
                        </span>
                      </div>
                      <div className="mt-2 text-xs font-bold text-slate-900 min-h-[50px] flex items-center whitespace-pre-line">
                        {isEditMode ? (
                          <textarea
                            value={currentArabic.activite3.title}
                            onChange={(e) =>
                              updateCurrentArabic("activite3", {
                                ...currentArabic.activite3,
                                title: e.target.value,
                              })
                            }
                            rows={2}
                            className="w-full border border-rose-300 p-1 rounded-sm text-xs bg-white"
                          />
                        ) : (
                          <span>{currentArabic.activite3.title}</span>
                        )}
                      </div>
                    </div>

                    {/* Box 2 (Bottom Right) */}
                    <div className="bg-[#e8f5e9] border-2 border-slate-800 rounded-md p-3 shadow-xs">
                      <div className="flex items-center justify-between pb-1 border-b border-emerald-200 text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="text-emerald-800 font-black text-sm">2</span>
                          <span className="font-black text-red-700">{currentArabic.activite2.type}</span>
                        </div>
                        <span className="text-[11px] text-teal-800 font-bold bg-teal-100 px-2 py-0.5 rounded-sm">
                          {currentArabic.activite2.duree}
                        </span>
                      </div>
                      <div className="mt-2 text-xs font-bold text-slate-900 min-h-[50px] flex items-center whitespace-pre-line">
                        {isEditMode ? (
                          <textarea
                            value={currentArabic.activite2.title}
                            onChange={(e) =>
                              updateCurrentArabic("activite2", {
                                ...currentArabic.activite2,
                                title: e.target.value,
                              })
                            }
                            rows={2}
                            className="w-full border border-emerald-300 p-1 rounded-sm text-xs bg-white"
                          />
                        ) : (
                          <span>{currentArabic.activite2.title}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Watermark */}
                <div className="mt-6 pt-2 border-t border-slate-300 flex justify-between items-center text-[10px] text-slate-500">
                  <span>ProfPress • خطاطة مادة اللغة العربية المستوى الأول</span>
                  <span>الموسم الدراسي 2026/2027</span>
                </div>
              </div>
            )}
          </div>

          {/* 4. Quick Highlights & Instructions */}
          <div className="no-print grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-2 text-right">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs justify-end">
                <span>فترة التهيئة والدعم المكثف (4 أسابيع)</span>
                <Calendar className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                تغطي هذه النماذج الأيام الـ 24 الأولى من الموسم الدراسي للمستوى الأول بمعدل 6 حصص أسبوعياً للمواد الثلاث: الفرنسية، الرياضيات، واللغة العربية.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-2 text-right">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs justify-end">
                <span>التدبير الزمني والأنشطة الاعتيادية</span>
                <Clock className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                تم توزيع المدد الزمنية بدقة لكل نشاط اعتيادي، لعبة تفاعلية، بناء المفاهيم، والأنشطة الحركية (Chansons actions / ألعاب الحجلة والمجموعات).
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-2 text-right">
              <div className="flex items-center gap-2 text-blue-800 font-bold text-xs justify-end">
                <span>تخصيص وطباعة A4 بجودة عالية</span>
                <Printer className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                يمكنك الضغط على «تعديل النصوص» لتخصيص الأنشطة وفق وتيرة قسمك، ثم الحفظ أو الطباعة المباشرة على أوراق A4.
              </p>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
