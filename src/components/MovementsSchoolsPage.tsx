import React, { useState, useEffect, useMemo } from "react";
import {
  MapPin,
  Search,
  Plus,
  Calculator,
  Phone,
  Building2,
  Home,
  Bus,
  ShieldCheck,
  Users,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Copy,
  Check,
  Printer,
  Trash2,
  ArrowUp,
  ArrowDown,
  X,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Compass,
  Sparkles,
  FileText,
  Wifi,
  AlertTriangle,
  Star,
} from "lucide-react";
import { TeacherProfile, TabKey } from "../types";
import {
  MOROCCO_ACADEMIES,
  MOROCCO_DIRECTORATES,
  INITIAL_SCHOOL_DIRECTORY,
  ENV_SERVICE_OPTIONS,
  MOVEMENT_GUIDANCE_TIPS,
  SCHOOL_DIRECTORY_FAQS,
  SchoolDirectoryEntry,
  OfficialSchoolLite,
  MovementWishItem,
  SchoolCycle,
  AreaType,
  SubmitterRole,
} from "../data/schoolDirectoryData";

const SCHOOLS_STORAGE_KEY = "profpress_school_directory_entries_v1";
const WISHLIST_STORAGE_KEY = "profpress_movement_wishlist_v1";
const POINTS_STORAGE_KEY = "profpress_movement_points_v1";

interface MovementsSchoolsPageProps {
  teacherProfile?: TeacherProfile;
  onNavigateToTab?: (tab: TabKey) => void;
  initialMode?: "explore" | "add" | "movements";
}

export const MovementsSchoolsPage: React.FC<MovementsSchoolsPageProps> = ({
  teacherProfile,
  onNavigateToTab,
  initialMode = "explore",
}) => {
  const [activeMode, setActiveMode] = useState<"explore" | "add" | "movements">(
    initialMode
  );

  // Persisted directory entries
  const [entries, setEntries] = useState<SchoolDirectoryEntry[]>(() => {
    try {
      const saved = localStorage.getItem(SCHOOLS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Failed to load school directory", e);
    }
    return INITIAL_SCHOOL_DIRECTORY;
  });

  useEffect(() => {
    try {
      localStorage.setItem(SCHOOLS_STORAGE_KEY, JSON.stringify(entries));
    } catch (e) {
      console.error("Failed to save school directory", e);
    }
  }, [entries]);

  // Persisted Movement Wishlist
  const [wishlist, setWishlist] = useState<MovementWishItem[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Movement Points Calculator State
  const [pointsForm, setPointsForm] = useState(() => {
    try {
      const saved = localStorage.getItem(POINTS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      generalSeniorityYears: 5,
      currentSchoolYears: 3,
      currentDirectorateYears: 3,
      familyPriorityType: "none" as "none" | "spouse" | "single_parent",
      spouseWaitYears: 0,
      hardshipBonus: 0,
      firstChoiceBonus: true,
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(POINTS_STORAGE_KEY, JSON.stringify(pointsForm));
    } catch (e) {
      console.error(e);
    }
  }, [pointsForm]);

  const totalCalculatedPoints = useMemo(() => {
    const genPts = Number(pointsForm.generalSeniorityYears || 0) * 1;
    const schoolPts = Number(pointsForm.currentSchoolYears || 0) * 2;
    const dirPts = Number(pointsForm.currentDirectorateYears || 0) * 1;
    let familyPts = 0;
    if (pointsForm.familyPriorityType === "spouse") {
      familyPts = 8 + Math.min(Number(pointsForm.spouseWaitYears || 0), 5) * 2;
    } else if (pointsForm.familyPriorityType === "single_parent") {
      familyPts = 6;
    }
    const hardshipPts = Number(pointsForm.hardshipBonus || 0);
    const stabilityBonus =
      Number(pointsForm.currentSchoolYears || 0) >= 6 ? 4 : 0;
    return genPts + schoolPts + dirPts + familyPts + hardshipPts + stabilityBonus;
  }, [pointsForm]);

  // Explore Filters
  const [filterAcademyId, setFilterAcademyId] = useState<string>("all");
  const [filterDirectorateId, setFilterDirectorateId] = useState<string>("all");
  const [filterCycle, setFilterCycle] = useState<string>("all");
  const [filterArea, setFilterArea] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSchoolDetail, setSelectedSchoolDetail] =
    useState<SchoolDirectoryEntry | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Live official directorate schools fetch (for Explore & Add)
  const [officialSchools, setOfficialSchools] = useState<OfficialSchoolLite[]>([]);
  const [isLoadingOfficialSchools, setIsLoadingOfficialSchools] = useState(false);
  const [officialSearchFilter, setOfficialSearchFilter] = useState("");

  const availableFilterDirectorates = useMemo(() => {
    if (filterAcademyId === "all") {
      return [...MOROCCO_DIRECTORATES].sort((a, b) =>
        a.nameAr.localeCompare(b.nameAr, "ar")
      );
    }
    return MOROCCO_DIRECTORATES.filter(
      (d) => d.academyId === Number(filterAcademyId)
    ).sort((a, b) => a.nameAr.localeCompare(b.nameAr, "ar"));
  }, [filterAcademyId]);

  // Fetch official schools whenever filterDirectorateId changes in Explore mode
  useEffect(() => {
    if (filterDirectorateId === "all") {
      setOfficialSchools([]);
      return;
    }
    let cancelled = false;
    setIsLoadingOfficialSchools(true);
    fetch(`/api/morocco-schools?directorate_id=${encodeURIComponent(filterDirectorateId)}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && Array.isArray(data.schools)) {
          setOfficialSchools(data.schools);
        }
      })
      .catch(() => {
        if (!cancelled) setOfficialSchools([]);
      })
      .finally(() => {
        if (!cancelled) setIsLoadingOfficialSchools(false);
      });
    return () => {
      cancelled = true;
    };
  }, [filterDirectorateId]);

  const filteredEntries = useMemo(() => {
    return entries.filter((item) => {
      if (filterAcademyId !== "all" && item.academyId !== Number(filterAcademyId))
        return false;
      if (
        filterDirectorateId !== "all" &&
        item.directorateId !== Number(filterDirectorateId)
      )
        return false;
      if (filterCycle !== "all" && item.cycle !== filterCycle) return false;
      if (filterArea !== "all" && item.areaType !== filterArea) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const match =
          item.schoolName.toLowerCase().includes(q) ||
          (item.gresaCode || "").toLowerCase().includes(q) ||
          item.directorateName.toLowerCase().includes(q) ||
          item.academyName.toLowerCase().includes(q) ||
          (item.commune || "").toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [
    entries,
    filterAcademyId,
    filterDirectorateId,
    filterCycle,
    filterArea,
    searchQuery,
  ]);

  const filteredOfficialSchools = useMemo(() => {
    return officialSchools.filter((s) => {
      if (filterCycle !== "all" && s.type && s.type !== filterCycle) return false;
      if (officialSearchFilter.trim()) {
        const q = officialSearchFilter.toLowerCase().trim();
        if (!s.name_ar.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [officialSchools, filterCycle, officialSearchFilter]);

  // ==============================================================
  // MULTI-STEP ADD SCHOOL FORM STATE (mode=add#add)
  // ==============================================================
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [wizardSubmitted, setWizardSubmitted] = useState<SchoolDirectoryEntry | null>(
    null
  );
  const [wizardOfficialSchools, setWizardOfficialSchools] = useState<
    OfficialSchoolLite[]
  >([]);
  const [isLoadingWizardSchools, setIsLoadingWizardSchools] = useState(false);
  const [useManualSchoolName, setUseManualSchoolName] = useState(false);

  const [formState, setFormState] = useState({
    academyId: 7,
    directorateId: 9601,
    cycle: "ابتدائية" as SchoolCycle,
    schoolName: "",
    gresaCode: "",
    commune: "",
    phone: "",
    submitterRole: "أستاذ" as SubmitterRole,
    areaType: "قروي" as AreaType,
    areaDescription: "",
    facebookLink: "",
    mapsLink: "",
    canRent: "متوفر بسهولة" as "متوفر بسهولة" | "يحتاج التنقل يومياً",
    nearbyRentalPlaces: "",
    transportAvailable: "متوفرة وميسرة" as "متوفرة وميسرة" | "صعبة أو مكلفة",
    transportDesc: "",
    environmentSafety: "آمنة ومأهولة" as
      | "آمنة ومأهولة"
      | "هادئة (تستوجب الحذر ليلاً)"
      | "معزولة نسبياً",
    envServices: ["ماء شروب وكهرباء", "طريق معبدة حتى المؤسسة"] as string[],
    communityWelcome: "طيبة ومحترمة للأطر" as
      | "طيبة ومحترمة للأطر"
      | "تعامل عادي"
      | "تواصل محدود",
    studentBehavior: "",
    staffAtmosphere: "مندمجين واجتماعيين" as
      | "مندمجين واجتماعيين"
      | "منعزلون / عمل محدود",
    schoolSize: "صغيرة" as "كبيرة" | "صغيرة",
    schoolSizeDesc: "",
    estimatedMovementPoints: "",
    extraNotes: "",
  });

  const wizardDirectorates = useMemo(() => {
    return MOROCCO_DIRECTORATES.filter(
      (d) => d.academyId === Number(formState.academyId)
    ).sort((a, b) => a.nameAr.localeCompare(b.nameAr, "ar"));
  }, [formState.academyId]);

  useEffect(() => {
    if (!wizardDirectorates.some((d) => d.id === Number(formState.directorateId))) {
      if (wizardDirectorates[0]) {
        setFormState((prev) => ({ ...prev, directorateId: wizardDirectorates[0].id }));
      }
    }
  }, [wizardDirectorates, formState.directorateId]);

  useEffect(() => {
    if (!formState.directorateId) return;
    let cancelled = false;
    setIsLoadingWizardSchools(true);
    fetch(
      `/api/morocco-schools?directorate_id=${encodeURIComponent(formState.directorateId)}`
    )
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled && Array.isArray(d.schools)) {
          setWizardOfficialSchools(d.schools);
        }
      })
      .catch(() => {
        if (!cancelled) setWizardOfficialSchools([]);
      })
      .finally(() => {
        if (!cancelled) setIsLoadingWizardSchools(false);
      });
    return () => {
      cancelled = true;
    };
  }, [formState.directorateId]);

  const filteredWizardSchools = useMemo(() => {
    return wizardOfficialSchools.filter(
      (s) => !s.type || s.type === formState.cycle
    );
  }, [wizardOfficialSchools, formState.cycle]);

  const handleToggleService = (srv: string) => {
    setFormState((prev) => ({
      ...prev,
      envServices: prev.envServices.includes(srv)
        ? prev.envServices.filter((s) => s !== srv)
        : [...prev.envServices, srv],
    }));
  };

  const handlePrefillAddForSchool = (
    schoolName: string,
    cycle: SchoolCycle,
    academyId: number,
    directorateId: number
  ) => {
    setFormState((prev) => ({
      ...prev,
      academyId,
      directorateId,
      cycle,
      schoolName,
    }));
    setUseManualSchoolName(true);
    setWizardSubmitted(null);
    setWizardStep(2);
    setActiveMode("add");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmitWizard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.schoolName.trim()) return;

    const acObj = MOROCCO_ACADEMIES.find((a) => a.id === Number(formState.academyId));
    const dirObj = MOROCCO_DIRECTORATES.find(
      (d) => d.id === Number(formState.directorateId)
    );

    const newEntry: SchoolDirectoryEntry = {
      id: "sch_" + Date.now(),
      schoolName: formState.schoolName.trim(),
      gresaCode: formState.gresaCode.trim() || undefined,
      academyId: Number(formState.academyId),
      academyName: acObj?.nameAr || "الأكاديمية الجهوية",
      directorateId: Number(formState.directorateId),
      directorateName: dirObj?.nameAr || "المديرية الإقليمية",
      commune: formState.commune.trim() || undefined,
      cycle: formState.cycle,
      submitterRole: formState.submitterRole,
      areaType: formState.areaType,
      areaDescription:
        formState.areaDescription.trim() ||
        "تمت إضافة هذه المعطيات من طرف إطار تربوي ممارس بالمؤسسة.",
      phone: formState.phone.trim() || undefined,
      facebookLink: formState.facebookLink.trim() || undefined,
      mapsLink: formState.mapsLink.trim() || undefined,
      canRent: formState.canRent,
      nearbyRentalPlaces: formState.nearbyRentalPlaces.trim() || undefined,
      transportAvailable: formState.transportAvailable,
      transportDesc: formState.transportDesc.trim() || undefined,
      environmentSafety: formState.environmentSafety,
      envServices: formState.envServices,
      communityWelcome: formState.communityWelcome,
      studentBehavior:
        formState.studentBehavior.trim() || "انضباط وسلوك عادي ومستوى تحصيل متوسط.",
      staffAtmosphere: formState.staffAtmosphere,
      schoolSize: formState.schoolSize,
      schoolSizeDesc: formState.schoolSizeDesc.trim() || undefined,
      estimatedMovementPoints:
        formState.estimatedMovementPoints.trim() || undefined,
      extraNotes: formState.extraNotes.trim() || undefined,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setEntries((prev) => [newEntry, ...prev]);
    setWizardSubmitted(newEntry);
  };

  // Wishlist handlers
  const handleAddToWishlist = (entry: SchoolDirectoryEntry) => {
    if (wishlist.some((w) => w.id === entry.id)) return;
    if (wishlist.length >= 10) return;
    setWishlist((prev) => [
      ...prev,
      {
        id: entry.id,
        schoolName: entry.schoolName,
        gresaCode: entry.gresaCode,
        directorateName: entry.directorateName,
        academyName: entry.academyName,
        cycle: entry.cycle,
        areaType: entry.areaType,
        estimatedPoints: entry.estimatedMovementPoints,
      },
    ]);
  };

  const handleAddOfficialToWishlist = (
    school: OfficialSchoolLite,
    academyName: string,
    directorateName: string
  ) => {
    const id = `off_${school.id}`;
    if (wishlist.some((w) => w.id === id)) return;
    if (wishlist.length >= 10) return;
    setWishlist((prev) => [
      ...prev,
      {
        id,
        schoolName: school.name_ar,
        directorateName,
        academyName,
        cycle: (school.type as SchoolCycle) || "ابتدائية",
        areaType: "شبه حضري",
      },
    ]);
  };

  const handleMoveWish = (idx: number, dir: -1 | 1) => {
    const target = idx + dir;
    if (target < 0 || target >= wishlist.length) return;
    const copy = [...wishlist];
    const [item] = copy.splice(idx, 1);
    copy.splice(target, 0, item);
    setWishlist(copy);
  };

  const handleRemoveWish = (id: string) => {
    setWishlist((prev) => prev.filter((w) => w.id !== id));
  };

  const handleCopy = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedText(val);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const [manualWishInput, setManualWishInput] = useState({
    schoolName: "",
    gresaCode: "",
    directorateName: teacherProfile?.province || "أكادير إداوتنان",
  });

  const handleAddManualWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualWishInput.schoolName.trim() || wishlist.length >= 10) return;
    setWishlist((prev) => [
      ...prev,
      {
        id: "wish_" + Date.now(),
        schoolName: manualWishInput.schoolName.trim(),
        gresaCode: manualWishInput.gresaCode.trim() || undefined,
        directorateName: manualWishInput.directorateName.trim() || "غير محدد",
        academyName: teacherProfile?.academy || "المملكة المغربية",
        cycle: "ابتدائية",
        areaType: "حضري",
      },
    ]);
    setManualWishInput({ ...manualWishInput, schoolName: "", gresaCode: "" });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans" dir="rtl">
      {/* Copy toast */}
      {copiedText && (
        <div className="no-print fixed bottom-6 left-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>تم النسخ بنجاح: {copiedText}</span>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="no-print bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center gap-2 text-xs text-slate-500 overflow-x-auto">
          <button
            type="button"
            onClick={() => onNavigateToTab?.("home")}
            className="hover:text-indigo-700 transition font-medium cursor-pointer whitespace-nowrap shrink-0"
          >
            الرئيسية
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 rotate-180 shrink-0" />
          <span className="font-bold text-indigo-700 whitespace-nowrap shrink-0">
            الحركات الانتقالية ودليل المؤسسات التعليمية بالمغرب
          </span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="no-print bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-10 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-3xl">
            <div className="text-xs text-sky-300 font-semibold mb-3 flex flex-wrap items-center gap-2">
              <span>12 أكاديمية جهوية</span>
              <span aria-hidden="true">·</span>
              <span>82 مديرية إقليمية</span>
              <span aria-hidden="true">·</span>
              <span>دليل السكن والنقل والهواتف</span>
              <span aria-hidden="true">·</span>
              <span>حاسبة نقط الحركة الانتقالية</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight mb-3 text-balance">
              الحركات الانتقالية ودليل المؤسسات التعليمية بالمغرب
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              المرجع الميداني لنساء ورجال التعليم لاستكشاف معطيات المؤسسات التعليمية بالمملكة (السكن، النقل، الأمان، الشبكة، الهواتف، ورموز GRESA)، مشاركة التجارب الواقعية لإفادة الزملاء، وحساب نقط الحركة وبناء بطاقة الرغبات.
            </p>

            {/* Primary Mode Switcher Tabs */}
            <div className="flex flex-wrap items-center gap-2.5 mt-6">
              <button
                type="button"
                onClick={() => setActiveMode("explore")}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 ${
                  activeMode === "explore"
                    ? "bg-amber-400 text-slate-950"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/15"
                }`}
              >
                <Search className="w-4 h-4" />
                <span>تصفح واستكشاف المؤسسات</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setWizardSubmitted(null);
                  setActiveMode("add");
                }}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 ${
                  activeMode === "add"
                    ? "bg-emerald-500 text-white"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/15"
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>إضافة معلومات عن مؤسسة</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMode("movements")}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 ${
                  activeMode === "movements"
                    ? "bg-sky-400 text-slate-950"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/15"
                }`}
              >
                <Calculator className="w-4 h-4" />
                <span>حاسبة نقط الحركة وبطاقة الرغبات ({wishlist.length})</span>
              </button>
            </div>
          </div>

          {/* Summary KPI Box */}
          <div className="bg-white/10 border border-white/15 rounded-2xl p-5 shrink-0 lg:w-80">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-300">رصيدك التقديري في الحركة</div>
                <div className="text-xl font-black text-white tabular-nums">
                  {totalCalculatedPoints} نقطة
                </div>
              </div>
            </div>
            <div className="text-xs text-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">المؤسسات الموثقة حالياً:</span>
                <span className="font-bold text-emerald-300 tabular-nums">
                  {entries.length} بطاقة ميدانية
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">المديريات المغطاة:</span>
                <span className="font-bold text-amber-300 tabular-nums">
                  82 مديرية إقليمية
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">رغباتي المختارة:</span>
                <span className="font-bold text-sky-300 tabular-nums">
                  {wishlist.length} / 10 اختيارات
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 mt-8 space-y-8">
        {/* ============================================================= */}
        {/* MODE 1: EXPLORE SCHOOL DIRECTORY                              */}
        {/* ============================================================= */}
        {activeMode === "explore" && (
          <div className="space-y-6">
            {/* Search & Cascading Filters */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <h2 className="text-base font-black text-slate-900">
                    البحث في دليل المؤسسات التعليمية بالمغرب
                  </h2>
                  <p className="text-xs text-slate-500">
                    اختر الأكاديمية والمديرية الإقليمية لاستعراض البطاقات الميدانية وقائمة المؤسسات التابعة للمديرية
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFilterAcademyId("all");
                    setFilterDirectorateId("all");
                    setFilterCycle("all");
                    setFilterArea("all");
                    setSearchQuery("");
                  }}
                  className="text-xs font-bold text-indigo-700 hover:text-indigo-900 cursor-pointer self-start sm:self-auto"
                >
                  إعادة ضبط الفلاتر
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {/* Academy Select */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    الأكاديمية الجهوية
                  </label>
                  <select
                    value={filterAcademyId}
                    onChange={(e) => {
                      setFilterAcademyId(e.target.value);
                      setFilterDirectorateId("all");
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:border-indigo-500 outline-hidden"
                  >
                    <option value="all">جميع الأكاديميات (12)</option>
                    {MOROCCO_ACADEMIES.map((ac) => (
                      <option key={ac.id} value={ac.id}>
                        {ac.nameAr}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Directorate Select */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    المديرية الإقليمية
                  </label>
                  <select
                    value={filterDirectorateId}
                    onChange={(e) => setFilterDirectorateId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:border-indigo-500 outline-hidden"
                  >
                    <option value="all">
                      جميع المديريات ({availableFilterDirectorates.length})
                    </option>
                    {availableFilterDirectorates.map((dir) => (
                      <option key={dir.id} value={dir.id}>
                        {dir.nameAr}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Cycle Select */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    السلك التعليمي
                  </label>
                  <select
                    value={filterCycle}
                    onChange={(e) => setFilterCycle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:border-indigo-500 outline-hidden"
                  >
                    <option value="all">كل الأسلاك</option>
                    <option value="ابتدائية">التعليم الابتدائي</option>
                    <option value="إعدادية">الثانوي الإعدادي</option>
                    <option value="تأهيلية">الثانوي التأهيلي</option>
                  </select>
                </div>

                {/* Area Select */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    المجال الجغرافي
                  </label>
                  <select
                    value={filterArea}
                    onChange={(e) => setFilterArea(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:border-indigo-500 outline-hidden"
                  >
                    <option value="all">جميع الأوساط</option>
                    <option value="حضري">حضري</option>
                    <option value="شبه حضري">شبه حضري</option>
                    <option value="قروي">قروي</option>
                  </select>
                </div>

                {/* Search Query */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    اسم المؤسسة أو رمز GRESA
                  </label>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="ابحث بالاسم أو GRESA..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-8 pl-3 py-2 text-xs text-slate-800 focus:border-indigo-500 outline-hidden"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Live Official Directorate Schools Panel (when a directorate is selected) */}
            {filterDirectorateId !== "all" && (
              <div className="bg-white rounded-2xl p-5 border border-indigo-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-indigo-600" />
                      <span>
                        قائمة المؤسسات التعليمية بمديرية{" "}
                        {MOROCCO_DIRECTORATES.find(
                          (d) => d.id === Number(filterDirectorateId)
                        )?.nameAr || ""}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      {isLoadingOfficialSchools
                        ? "جاري تحميل قائمة المؤسسات المعتمدة..."
                        : `تم تحميل ${filteredOfficialSchools.length} مؤسسة تابعة للمديرية — يمكنك إضافتها لرغباتك أو توثيق ظروف العمل بها`}
                    </p>
                  </div>

                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5" />
                    <input
                      type="text"
                      value={officialSearchFilter}
                      onChange={(e) => setOfficialSearchFilter(e.target.value)}
                      placeholder="تصفية أسماء مؤسسات المديرية..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-8 pl-3 py-1.5 text-xs outline-hidden focus:border-indigo-500"
                    />
                  </div>
                </div>

                {!isLoadingOfficialSchools && filteredOfficialSchools.length === 0 ? (
                  <div className="text-xs text-slate-500 py-4 text-center">
                    لا توجد نتائج مطابقة في القائمة المباشرة، يمكنك إضافة أي مؤسسة يدوياً عبر زر «إضافة معلومات عن مؤسسة».
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto pr-1">
                    {filteredOfficialSchools.slice(0, 45).map((sch) => {
                      const dirObj = MOROCCO_DIRECTORATES.find(
                        (d) => d.id === Number(filterDirectorateId)
                      );
                      const acObj = MOROCCO_ACADEMIES.find(
                        (a) => a.id === dirObj?.academyId
                      );
                      const existingEntry = entries.find(
                        (e) =>
                          e.schoolName === sch.name_ar &&
                          e.directorateId === Number(filterDirectorateId)
                      );
                      const isInWishlist = wishlist.some(
                        (w) =>
                          w.id === `off_${sch.id}` ||
                          (existingEntry && w.id === existingEntry.id)
                      );

                      return (
                        <div
                          key={sch.id}
                          className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white transition flex flex-col justify-between gap-2"
                        >
                          <div>
                            <div className="text-[11px] text-slate-500 mb-0.5">
                              <span>{sch.type || "مؤسسة تعليمية"}</span>
                              <span aria-hidden="true"> · </span>
                              <span>{dirObj?.nameAr}</span>
                            </div>
                            <div className="text-xs font-black text-slate-900 leading-snug">
                              {sch.name_ar}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 pt-2 border-t border-slate-200/70 text-[11px]">
                            {existingEntry ? (
                              <button
                                type="button"
                                onClick={() => setSelectedSchoolDetail(existingEntry)}
                                className="flex-1 py-1.5 px-2 bg-indigo-600 text-white rounded-lg font-bold cursor-pointer hover:bg-indigo-500 transition"
                              >
                                عرض البطاقة الميدانية
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() =>
                                  handlePrefillAddForSchool(
                                    sch.name_ar,
                                    (sch.type as SchoolCycle) || "ابتدائية",
                                    dirObj?.academyId || 7,
                                    Number(filterDirectorateId)
                                  )
                                }
                                className="flex-1 py-1.5 px-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold cursor-pointer transition"
                              >
                                أضف معلومات عنها
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() =>
                                handleAddOfficialToWishlist(
                                  sch,
                                  acObj?.nameAr || "",
                                  dirObj?.nameAr || ""
                                )
                              }
                              disabled={isInWishlist || wishlist.length >= 10}
                              className={`px-2 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                                isInWishlist
                                  ? "bg-amber-100 text-amber-800 cursor-default"
                                  : "bg-slate-200 hover:bg-slate-300 text-slate-700"
                              }`}
                              title="إضافة إلى بطاقة الرغبات"
                            >
                              {isInWishlist ? "مضافة" : "+ رغبة"}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Documented Community School Cards */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-slate-900">
                  بطاقات المؤسسات الموثقة ميدانياً ({filteredEntries.length})
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setWizardSubmitted(null);
                    setActiveMode("add");
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>شارك تجربة مؤسستك</span>
                </button>
              </div>

              {filteredEntries.length === 0 ? (
                <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 space-y-3">
                  <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
                  <h4 className="text-sm font-black text-slate-800">
                    لا توجد بطاقات ميدانية مطابقة لخيارات التصفية الحالية
                  </h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    يمكنك توسيع البحث أو المبادرة بإضافة أول بطاقة ميدانية لمؤسسة في هذه المديرية لمساعدة زملائك في الحركة الانتقالية.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setWizardSubmitted(null);
                      setActiveMode("add");
                    }}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>إضافة معلومات مؤسسة الآن</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredEntries.map((item) => {
                    const isWished = wishlist.some((w) => w.id === item.id);
                    return (
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-indigo-300 transition flex flex-col justify-between gap-4"
                      >
                        <div className="space-y-3">
                          {/* Clean Zero-Pill Header Metadata */}
                          <div className="flex items-center justify-between gap-2 text-xs">
                            <span className="font-black text-indigo-700">
                              {item.cycle} · {item.areaType}
                            </span>
                            {item.gresaCode && (
                              <span className="font-mono text-slate-500 tabular-nums">
                                GRESA: {item.gresaCode}
                              </span>
                            )}
                          </div>

                          <div>
                            <h4 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                              {item.schoolName}
                            </h4>
                            <div className="text-xs text-slate-500 mt-1">
                              {item.academyName} · مديرية {item.directorateName}
                            </div>
                          </div>

                          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                            {item.areaDescription}
                          </p>

                          {/* Key Field Indicators */}
                          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                            <div className="flex items-center gap-1.5 text-slate-700">
                              <Home className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span className="truncate">{item.canRent}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-700">
                              <Bus className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                              <span className="truncate">{item.transportAvailable}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-700">
                              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                              <span className="truncate">{item.environmentSafety}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-700">
                              <Users className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                              <span className="truncate">{item.communityWelcome}</span>
                            </div>
                          </div>

                          {item.estimatedMovementPoints && (
                            <div className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 flex items-center justify-between">
                              <span className="text-slate-600 font-medium">
                                عتبة الحركة التقديرية:
                              </span>
                              <span className="font-black text-indigo-700 tabular-nums">
                                {item.estimatedMovementPoints}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                          <button
                            type="button"
                            onClick={() => setSelectedSchoolDetail(item)}
                            className="flex-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold py-2 px-3 rounded-xl transition cursor-pointer"
                          >
                            عرض البطاقة الكاملة
                          </button>

                          <button
                            type="button"
                            onClick={() => handleAddToWishlist(item)}
                            disabled={isWished || wishlist.length >= 10}
                            className={`py-2 px-3 rounded-xl font-bold transition cursor-pointer whitespace-nowrap ${
                              isWished
                                ? "bg-amber-100 text-amber-900 cursor-default"
                                : "bg-slate-900 hover:bg-slate-800 text-white"
                            }`}
                          >
                            {isWished ? "في الرغبات" : "+ لبطاقة الرغبات"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* MODE 2: MULTI-STEP ADD SCHOOL WIZARD (mode=add#add)           */}
        {/* ============================================================= */}
        {activeMode === "add" && (
          <div className="max-w-4xl mx-auto">
            {wizardSubmitted ? (
              <div className="bg-white rounded-3xl p-8 border border-emerald-200 text-center space-y-5">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-slate-900">
                    شـكـراً لـك مـن الـقـلـب! تمت إضافة بيانات المؤسسة بنجاح
                  </h2>
                  <p className="text-sm text-slate-600 max-w-xl mx-auto">
                    أصبحت بطاقة <strong>{wizardSubmitted.schoolName}</strong> ({wizardSubmitted.directorateName}) متاحة الآن في دليل المؤسسات لمساعدة زملائك في الحركات الانتقالية والتعيينات.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSchoolDetail(wizardSubmitted);
                      setActiveMode("explore");
                    }}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm cursor-pointer transition"
                  >
                    معاينة البطاقة المضافة
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setWizardSubmitted(null);
                      setWizardStep(1);
                      setFormState((p) => ({ ...p, schoolName: "", gresaCode: "" }));
                    }}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm cursor-pointer transition"
                  >
                    إضافة مؤسسة أخرى
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmitWizard}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden"
              >
                {/* Wizard Progress Bar */}
                <div className="bg-slate-900 text-white p-5 sm:p-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="text-xs text-emerald-300 font-semibold">
                        نموذج مساهمة ميدانية · الخطوة {wizardStep} من 6
                      </div>
                      <h2 className="text-lg font-black">
                        شارك تجربتك ومعلومات المؤسسة التعليمية لإفادة زملائك
                      </h2>
                    </div>
                    <span className="text-xs text-slate-300 tabular-nums">
                      {Math.round((wizardStep / 6) * 100)}% مكتمل
                    </span>
                  </div>

                  <div className="grid grid-cols-6 gap-1.5">
                    {[1, 2, 3, 4, 5, 6].map((step) => (
                      <button
                        key={step}
                        type="button"
                        onClick={() => setWizardStep(step)}
                        className={`h-2 rounded-full transition cursor-pointer ${
                          step <= wizardStep ? "bg-emerald-400" : "bg-white/20"
                        }`}
                        aria-label={`الانتقال إلى الخطوة ${step}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-slate-800">
                  {/* STEP 1: Academy, Directorate, Cycle, School Name */}
                  {wizardStep === 1 && (
                    <div className="space-y-5">
                      <h3 className="text-base font-black text-slate-900">
                        1. تحديد الأكاديمية الجهوية، المديرية الإقليمية، والمؤسسة التعليمية
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold mb-1.5">
                            الأكاديمية الجهوية *
                          </label>
                          <select
                            value={formState.academyId}
                            onChange={(e) =>
                              setFormState({
                                ...formState,
                                academyId: Number(e.target.value),
                              })
                            }
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold"
                          >
                            {MOROCCO_ACADEMIES.map((ac) => (
                              <option key={ac.id} value={ac.id}>
                                {ac.nameAr}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block font-bold mb-1.5">
                            المديرية الإقليمية *
                          </label>
                          <select
                            value={formState.directorateId}
                            onChange={(e) =>
                              setFormState({
                                ...formState,
                                directorateId: Number(e.target.value),
                              })
                            }
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold"
                          >
                            {wizardDirectorates.map((d) => (
                              <option key={d.id} value={d.id}>
                                {d.nameAr}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold mb-1.5">السلك التعليمي *</label>
                        <div className="grid grid-cols-3 gap-2">
                          {(["ابتدائية", "إعدادية", "تأهيلية"] as SchoolCycle[]).map(
                            (cyc) => (
                              <button
                                key={cyc}
                                type="button"
                                onClick={() =>
                                  setFormState({ ...formState, cycle: cyc })
                                }
                                className={`py-2.5 px-3 rounded-xl font-bold border transition cursor-pointer ${
                                  formState.cycle === cyc
                                    ? "bg-indigo-600 text-white border-indigo-600"
                                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                                }`}
                              >
                                {cyc}
                              </button>
                            )
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="font-bold">المؤسسة التعليمية *</label>
                          <button
                            type="button"
                            onClick={() =>
                              setUseManualSchoolName(!useManualSchoolName)
                            }
                            className="text-xs text-indigo-700 font-bold hover:underline cursor-pointer"
                          >
                            {useManualSchoolName
                              ? "الاختيار من قائمة المديرية"
                              : "كتابة اسم المؤسسة يدوياً"}
                          </button>
                        </div>

                        {!useManualSchoolName && filteredWizardSchools.length > 0 ? (
                          <select
                            value={formState.schoolName}
                            onChange={(e) => {
                              if (e.target.value === "__manual__") {
                                setUseManualSchoolName(true);
                                setFormState({ ...formState, schoolName: "" });
                              } else {
                                setFormState({
                                  ...formState,
                                  schoolName: e.target.value,
                                });
                              }
                            }}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold"
                          >
                            <option value="">
                              {isLoadingWizardSchools
                                ? "جاري تحميل مدارس المديرية..."
                                : `-- اختر المؤسسة (${filteredWizardSchools.length} مؤسسة) --`}
                            </option>
                            {filteredWizardSchools.map((s) => (
                              <option key={s.id} value={s.name_ar}>
                                {s.name_ar}
                              </option>
                            ))}
                            <option value="__manual__">
                              + مؤسسة غير موجودة بالقائمة (إدخال يدوي)
                            </option>
                          </select>
                        ) : (
                          <input
                            type="text"
                            value={formState.schoolName}
                            onChange={(e) =>
                              setFormState({ ...formState, schoolName: e.target.value })
                            }
                            placeholder="مثال: م/م سيدي إبراهيم أو ثانوية ابن خلدون..."
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold"
                            required
                          />
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block font-bold mb-1">
                            رمز المؤسسة GRESA (اختياري)
                          </label>
                          <input
                            type="text"
                            value={formState.gresaCode}
                            onChange={(e) =>
                              setFormState({ ...formState, gresaCode: e.target.value })
                            }
                            placeholder="مثال: 09412A"
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-mono"
                            dir="ltr"
                          />
                        </div>
                        <div>
                          <label className="block font-bold mb-1">
                            الجماعة الترابية (اختياري)
                          </label>
                          <input
                            type="text"
                            value={formState.commune}
                            onChange={(e) =>
                              setFormState({ ...formState, commune: e.target.value })
                            }
                            placeholder="اسم الجماعة أو المركز"
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5"
                          />
                        </div>
                        <div>
                          <label className="block font-bold mb-1">
                            هاتف المؤسسة / الإدارة (اختياري)
                          </label>
                          <input
                            type="text"
                            value={formState.phone}
                            onChange={(e) =>
                              setFormState({ ...formState, phone: e.target.value })
                            }
                            placeholder="05XX-XX-XX-XX"
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-mono"
                            dir="ltr"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Submitter role, Area type, Description & Links */}
                  {wizardStep === 2 && (
                    <div className="space-y-5">
                      <h3 className="text-base font-black text-slate-900">
                        2. صفتك في المؤسسة والمجال الجغرافي والمحيط
                      </h3>

                      <div>
                        <label className="block font-bold mb-2">صفتك في المؤسسة:</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {(
                            ["أستاذ", "أستاذة", "مدير(ة)", "مختص(ة)"] as SubmitterRole[]
                          ).map((role) => (
                            <button
                              key={role}
                              type="button"
                              onClick={() =>
                                setFormState({ ...formState, submitterRole: role })
                              }
                              className={`py-2.5 px-3 rounded-xl font-bold border transition cursor-pointer ${
                                formState.submitterRole === role
                                  ? "bg-indigo-600 text-white border-indigo-600"
                                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                              }`}
                            >
                              {role}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold mb-2">
                          المجال الجغرافي للمؤسسة:
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {(["حضري", "شبه حضري", "قروي"] as AreaType[]).map(
                            (area) => (
                              <button
                                key={area}
                                type="button"
                                onClick={() =>
                                  setFormState({ ...formState, areaType: area })
                                }
                                className={`py-2.5 px-3 rounded-xl font-bold border transition cursor-pointer ${
                                  formState.areaType === area
                                    ? "bg-indigo-600 text-white border-indigo-600"
                                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                                }`}
                              >
                                {area}
                              </button>
                            )
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold mb-1.5">
                          أعطنا فكرة عن محيط المؤسسة:
                        </label>
                        <textarea
                          rows={3}
                          value={formState.areaDescription}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              areaDescription: e.target.value,
                            })
                          }
                          placeholder="اكتب أي معلومة مفيدة لزميل لم يزر محيط المؤسسة من قبل (المسافة عن المركز، طبيعة الطريق، التضاريس...)"
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold mb-1">
                            رابط موقع المؤسسة على خرائط جوجل (اختياري)
                          </label>
                          <input
                            type="url"
                            value={formState.mapsLink}
                            onChange={(e) =>
                              setFormState({ ...formState, mapsLink: e.target.value })
                            }
                            placeholder="https://maps.google.com/..."
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5"
                            dir="ltr"
                          />
                        </div>
                        <div>
                          <label className="block font-bold mb-1">
                            رابط صفحة المؤسسة على فيسبوك (اختياري)
                          </label>
                          <input
                            type="url"
                            value={formState.facebookLink}
                            onChange={(e) =>
                              setFormState({
                                ...formState,
                                facebookLink: e.target.value,
                              })
                            }
                            placeholder="https://facebook.com/..."
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5"
                            dir="ltr"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Rent & Transport */}
                  {wizardStep === 3 && (
                    <div className="space-y-5">
                      <h3 className="text-base font-black text-slate-900">
                        3. إمكانية الكراء ووسائل النقل إلى المؤسسة
                      </h3>

                      <div>
                        <label className="block font-bold mb-2">
                          إمكانية الكراء قرب المؤسسة:
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {(
                            ["متوفر بسهولة", "يحتاج التنقل يومياً"] as const
                          ).map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() =>
                                setFormState({ ...formState, canRent: opt })
                              }
                              className={`py-2.5 px-4 rounded-xl font-bold border transition cursor-pointer ${
                                formState.canRent === opt
                                  ? "bg-emerald-600 text-white border-emerald-600"
                                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold mb-1">
                          أين يتم الكراء عادةً؟ (أسماء الأحياء أو المراكز القريبة)
                        </label>
                        <input
                          type="text"
                          value={formState.nearbyRentalPlaces}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              nearbyRentalPlaces: e.target.value,
                            })
                          }
                          placeholder="مثال: مركز الجماعة، سكن وظيفي، أو المدينة المجاورة..."
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5"
                        />
                      </div>

                      <div>
                        <label className="block font-bold mb-2">
                          وفرة وسائل النقل:
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {(["متوفرة وميسرة", "صعبة أو مكلفة"] as const).map(
                            (opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() =>
                                  setFormState({
                                    ...formState,
                                    transportAvailable: opt,
                                  })
                                }
                                className={`py-2.5 px-4 rounded-xl font-bold border transition cursor-pointer ${
                                  formState.transportAvailable === opt
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                                }`}
                              >
                                {opt}
                              </button>
                            )
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold mb-1">
                          أنواع وسائل النقل المتوفرة وتفاصيل التنقل:
                        </label>
                        <input
                          type="text"
                          value={formState.transportDesc}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              transportDesc: e.target.value,
                            })
                          }
                          placeholder="مثال: حافلات، سيارات أجرة كبيرة، نقل مزدوج..."
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5"
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Safety, Services, Community */}
                  {wizardStep === 4 && (
                    <div className="space-y-5">
                      <h3 className="text-base font-black text-slate-900">
                        4. البيئة والأمان والخدمات المتوفرة قرب المؤسسة
                      </h3>

                      <div>
                        <label className="block font-bold mb-2">
                          الوضع الأمني والسكينة بالمنطقة:
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {(
                            [
                              "آمنة ومأهولة",
                              "هادئة (تستوجب الحذر ليلاً)",
                              "معزولة نسبياً",
                            ] as const
                          ).map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() =>
                                setFormState({
                                  ...formState,
                                  environmentSafety: opt,
                                })
                              }
                              className={`py-2.5 px-3 rounded-xl font-bold border transition cursor-pointer text-xs ${
                                formState.environmentSafety === opt
                                  ? "bg-indigo-600 text-white border-indigo-600"
                                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold mb-2">
                          الخدمات المتوفرة بالقرب من المؤسسة (اختر ما ينطبق):
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {ENV_SERVICE_OPTIONS.map((srv) => {
                            const checked = formState.envServices.includes(srv);
                            return (
                              <button
                                key={srv}
                                type="button"
                                onClick={() => handleToggleService(srv)}
                                className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-between transition cursor-pointer ${
                                  checked
                                    ? "bg-emerald-50 border-emerald-400 text-emerald-900"
                                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                                }`}
                              >
                                <span>{srv}</span>
                                {checked && (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold mb-2">
                          تعامل الساكنة وأولياء الأمور:
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {(
                            [
                              "طيبة ومحترمة للأطر",
                              "تعامل عادي",
                              "تواصل محدود",
                            ] as const
                          ).map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() =>
                                setFormState({
                                  ...formState,
                                  communityWelcome: opt,
                                })
                              }
                              className={`py-2.5 px-3 rounded-xl font-bold border transition cursor-pointer text-xs ${
                                formState.communityWelcome === opt
                                  ? "bg-indigo-600 text-white border-indigo-600"
                                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 5: Students, Staff Atmosphere, Structure & Movement Threshold */}
                  {wizardStep === 5 && (
                    <div className="space-y-5">
                      <h3 className="text-base font-black text-slate-900">
                        5. سلوك التلاميذ والأجواء بين الطاقم وبنية المؤسسة
                      </h3>

                      <div>
                        <label className="block font-bold mb-1">
                          سلوك التلاميذ والتحصيل الدراسي بالمنطقة:
                        </label>
                        <input
                          type="text"
                          value={formState.studentBehavior}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              studentBehavior: e.target.value,
                            })
                          }
                          placeholder="انضباط وسلوك التلاميذ، ومستوى التحصيل الدراسي..."
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold mb-2">
                            الأجواء بين الطاقم التربوي والإداري:
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {(
                              ["مندمجين واجتماعيين", "منعزلون / عمل محدود"] as const
                            ).map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() =>
                                  setFormState({
                                    ...formState,
                                    staffAtmosphere: opt,
                                  })
                                }
                                className={`py-2.5 px-2 rounded-xl font-bold border transition cursor-pointer text-xs ${
                                  formState.staffAtmosphere === opt
                                    ? "bg-indigo-600 text-white border-indigo-600"
                                    : "bg-slate-50 text-slate-700 border-slate-200"
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block font-bold mb-2">حجم البنية:</label>
                          <div className="grid grid-cols-2 gap-2">
                            {(["كبيرة", "صغيرة"] as const).map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() =>
                                  setFormState({ ...formState, schoolSize: opt })
                                }
                                className={`py-2.5 px-3 rounded-xl font-bold border transition cursor-pointer text-xs ${
                                  formState.schoolSize === opt
                                    ? "bg-indigo-600 text-white border-indigo-600"
                                    : "bg-slate-50 text-slate-700 border-slate-200"
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold mb-1">
                            تفاصيل البنية التحتية (عدد الحجرات، السكن الوظيفي...):
                          </label>
                          <input
                            type="text"
                            value={formState.schoolSizeDesc}
                            onChange={(e) =>
                              setFormState({
                                ...formState,
                                schoolSizeDesc: e.target.value,
                              })
                            }
                            placeholder="مثال: 6 حجرات + قاعة متعددة الوسائط + سكن..."
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5"
                          />
                        </div>

                        <div>
                          <label className="block font-bold mb-1">
                            نقطة الحركة الانتقالية التقديرية (اختياري):
                          </label>
                          <input
                            type="text"
                            value={formState.estimatedMovementPoints}
                            onChange={(e) =>
                              setFormState({
                                ...formState,
                                estimatedMovementPoints: e.target.value,
                              })
                            }
                            placeholder="مثال: 20 – 32 نقطة"
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold mb-1">
                          ملاحظات إضافية أو نصيحة للأساتذة الجدد (اختياري):
                        </label>
                        <textarea
                          rows={2}
                          value={formState.extraNotes}
                          onChange={(e) =>
                            setFormState({ ...formState, extraNotes: e.target.value })
                          }
                          placeholder="قدم أي نصيحة تساعد المقبلين على الالتحاق بهذه المؤسسة..."
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5"
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 6: Review & Confirm */}
                  {wizardStep === 6 && (
                    <div className="space-y-4">
                      <h3 className="text-base font-black text-slate-900">
                        6. مراجعة وتأكيد المعلومات قبل النشر في الدليل
                      </h3>

                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5 text-xs">
                        <div className="flex justify-between gap-2 pb-2 border-b border-slate-200">
                          <span className="text-slate-500">المؤسسة التعليمية:</span>
                          <span className="font-black text-slate-900">
                            {formState.schoolName || "غير محددة"} ({formState.cycle})
                          </span>
                        </div>
                        <div className="flex justify-between gap-2 pb-2 border-b border-slate-200">
                          <span className="text-slate-500">الأكاديمية والمديرية:</span>
                          <span className="font-bold text-slate-800">
                            {
                              MOROCCO_ACADEMIES.find(
                                (a) => a.id === Number(formState.academyId)
                              )?.nameAr
                            }{" "}
                            ·{" "}
                            {
                              MOROCCO_DIRECTORATES.find(
                                (d) => d.id === Number(formState.directorateId)
                              )?.nameAr
                            }
                          </span>
                        </div>
                        <div className="flex justify-between gap-2 pb-2 border-b border-slate-200">
                          <span className="text-slate-500">المجال والسكن والنقل:</span>
                          <span className="font-bold text-slate-800">
                            {formState.areaType} · الكراء: {formState.canRent} · النقل:{" "}
                            {formState.transportAvailable}
                          </span>
                        </div>
                        <div className="flex justify-between gap-2">
                          <span className="text-slate-500">الأمان والخدمات:</span>
                          <span className="font-bold text-slate-800">
                            {formState.environmentSafety} (
                            {formState.envServices.length} خدمات)
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Wizard Navigation Buttons */}
                  <div className="pt-5 border-t border-slate-200 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        wizardStep > 1
                          ? setWizardStep(wizardStep - 1)
                          : setActiveMode("explore")
                      }
                      className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm cursor-pointer transition flex items-center gap-1.5"
                    >
                      <ChevronRight className="w-4 h-4" />
                      <span>{wizardStep > 1 ? "رجوع" : "إلغاء"}</span>
                    </button>

                    {wizardStep < 6 ? (
                      <button
                        type="button"
                        onClick={() => {
                          if (wizardStep === 1 && !formState.schoolName.trim()) {
                            return;
                          }
                          setWizardStep(wizardStep + 1);
                        }}
                        disabled={wizardStep === 1 && !formState.schoolName.trim()}
                        className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm cursor-pointer transition flex items-center gap-1.5"
                      >
                        <span>التالي</span>
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={!formState.schoolName.trim()}
                        className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm cursor-pointer transition flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>إرسال وتأكيد المعلومات</span>
                      </button>
                    )}
                  </div>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ============================================================= */}
        {/* MODE 3: MOVEMENTS CALCULATOR, WISHLIST & GUIDE                */}
        {/* ============================================================= */}
        {activeMode === "movements" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Points Calculator */}
              <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 space-y-5">
                <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-black text-slate-900">
                      حاسبة نقط الحركة الانتقالية التقديرية
                    </h2>
                    <p className="text-xs text-slate-500">
                      احتسب مجموع نقطك بناءً على الأقدمية والاستقرار والامتياز العائلي
                    </p>
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] text-slate-500">المجموع</div>
                    <div className="text-2xl font-black text-indigo-700 tabular-nums">
                      {totalCalculatedPoints}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      سنوات الأقدمية العامة في التعليم (نقطة / سنة):
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={40}
                      value={pointsForm.generalSeniorityYears}
                      onChange={(e) =>
                        setPointsForm({
                          ...pointsForm,
                          generalSeniorityYears: Number(e.target.value),
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold tabular-nums"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      سنوات الاستقرار بالمؤسسة الحالية (نقطتان / سنة + 4 نقط من 6 سنوات):
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={40}
                      value={pointsForm.currentSchoolYears}
                      onChange={(e) =>
                        setPointsForm({
                          ...pointsForm,
                          currentSchoolYears: Number(e.target.value),
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold tabular-nums"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      سنوات العمل بالمديرية الإقليمية الحالية (نقطة / سنة):
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={40}
                      value={pointsForm.currentDirectorateYears}
                      onChange={(e) =>
                        setPointsForm({
                          ...pointsForm,
                          currentDirectorateYears: Number(e.target.value),
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold tabular-nums"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      الامتياز العائلي (الالتحاق بالزوج/ة أو التجمع):
                    </label>
                    <select
                      value={pointsForm.familyPriorityType}
                      onChange={(e) =>
                        setPointsForm({
                          ...pointsForm,
                          familyPriorityType: e.target.value as any,
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold"
                    >
                      <option value="none">حركة عادية (بدون التحاق: 0 نقطة)</option>
                      <option value="spouse">
                        الالتحاق بالزوج / الزوجة (+8 نقط أساسية)
                      </option>
                      <option value="single_parent">
                        امتياز الأسرة وحضانة الأطفال (+6 نقط)
                      </option>
                    </select>
                  </div>

                  {pointsForm.familyPriorityType === "spouse" && (
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        سنوات انتظار الالتحاق بالزوج(ة) (نقطتان / سنة حتى 5 سنوات):
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={10}
                        value={pointsForm.spouseWaitYears}
                        onChange={(e) =>
                          setPointsForm({
                            ...pointsForm,
                            spouseWaitYears: Number(e.target.value),
                          })
                        }
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold tabular-nums"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      نقط إضافية (مناطق صعبة / نائية / تكليفات):
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={30}
                      value={pointsForm.hardshipBonus}
                      onChange={(e) =>
                        setPointsForm({
                          ...pointsForm,
                          hardshipBonus: Number(e.target.value),
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold tabular-nums"
                    />
                  </div>
                </div>
              </div>

              {/* Ranked Wishlist Builder (بطاقة الرغبات الـ 10) */}
              <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 space-y-5">
                <div className="pb-3 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h2 className="text-base font-black text-slate-900">
                      باني بطاقة الرغبات الاسترشادية ({wishlist.length} / 10)
                    </h2>
                    <p className="text-xs text-slate-500">
                      رتّب اختياراتك من المؤسسات التعليمية بدقة واطبعها للاسترشاد بها في بوابة الحركة
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>طباعة بطاقة الرغبات</span>
                    </button>
                  </div>
                </div>

                {/* Quick manual add to wishlist */}
                <form
                  onSubmit={handleAddManualWish}
                  className="no-print grid grid-cols-1 sm:grid-cols-12 gap-2"
                >
                  <input
                    type="text"
                    value={manualWishInput.schoolName}
                    onChange={(e) =>
                      setManualWishInput({
                        ...manualWishInput,
                        schoolName: e.target.value,
                      })
                    }
                    placeholder="إضافة مؤسسة يدوياً (مثال: مدرسة النهضة...)"
                    className="sm:col-span-6 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                  />
                  <input
                    type="text"
                    value={manualWishInput.gresaCode}
                    onChange={(e) =>
                      setManualWishInput({
                        ...manualWishInput,
                        gresaCode: e.target.value,
                      })
                    }
                    placeholder="رمز GRESA"
                    className="sm:col-span-3 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono"
                    dir="ltr"
                  />
                  <button
                    type="submit"
                    disabled={wishlist.length >= 10 || !manualWishInput.schoolName.trim()}
                    className="sm:col-span-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold px-3 py-2 rounded-xl cursor-pointer transition"
                  >
                    + إضافة رغبة
                  </button>
                </form>

                {wishlist.length === 0 ? (
                  <div className="py-10 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <Star className="w-8 h-8 text-slate-300 mx-auto" />
                    <div className="text-xs font-bold text-slate-700">
                      قائمة رغباتك فارغة حالياً
                    </div>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      انتقل إلى «تصفح واستكشاف المؤسسات» لإضافة المؤسسات مباشرة إلى هذه القائمة، أو أضفها يدوياً أعلاه.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {wishlist.map((w, idx) => (
                      <div
                        key={w.id}
                        className="flex items-center justify-between gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/70"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0 tabular-nums">
                            {idx + 1}
                          </span>
                          <div className="min-w-0">
                            <div className="text-xs sm:text-sm font-black text-slate-900 truncate">
                              {w.schoolName}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              <span>{w.directorateName}</span>
                              {w.gresaCode && (
                                <>
                                  <span aria-hidden="true"> · </span>
                                  <span className="font-mono">GRESA: {w.gresaCode}</span>
                                </>
                              )}
                              {w.estimatedPoints && (
                                <>
                                  <span aria-hidden="true"> · </span>
                                  <span>العتبة: {w.estimatedPoints}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="no-print flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleMoveWish(idx, -1)}
                            disabled={idx === 0}
                            className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
                            title="تقديم للأعلى"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveWish(idx, 1)}
                            disabled={idx === wishlist.length - 1}
                            className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
                            title="تأخير للأسفل"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveWish(w.id)}
                            className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-rose-50 hover:text-rose-700 cursor-pointer"
                            title="حذف"
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
          </div>
        )}

        {/* ============================================================= */}
        {/* SHARED GUIDANCE SECTION: TIPS & FAQS FOR ALL MODES            */}
        {/* ============================================================= */}
        <section className="no-print grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-4">
            <h2 className="text-base font-black text-slate-900">
              نصائح هامة للمقبلين على الحركات الانتقالية وتعيينات CRMEF
            </h2>
            <div className="space-y-3">
              {MOVEMENT_GUIDANCE_TIPS.map((tip, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80"
                >
                  <div className="text-xs sm:text-sm font-black text-slate-900 mb-1">
                    0{i + 1}. {tip.title}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-4">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              <span>الأسئلة الشائعة حول دليل المؤسسات والحركات</span>
            </h2>
            <div className="space-y-2.5">
              {SCHOOL_DIRECTORY_FAQS.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full p-3.5 bg-slate-50/70 hover:bg-slate-100 text-right flex items-center justify-between gap-2 text-xs sm:text-sm font-bold text-slate-900 cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="p-3.5 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* ============================================================= */}
      {/* SCHOOL DETAIL MODAL                                           */}
      {/* ============================================================= */}
      {selectedSchoolDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div
            className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
            dir="rtl"
          >
            <div className="bg-slate-900 text-white p-5 flex items-start justify-between gap-4">
              <div>
                <div className="text-xs text-sky-300 font-semibold mb-1">
                  <span>{selectedSchoolDetail.academyName}</span>
                  <span aria-hidden="true"> · </span>
                  <span>مديرية {selectedSchoolDetail.directorateName}</span>
                  {selectedSchoolDetail.gresaCode && (
                    <>
                      <span aria-hidden="true"> · </span>
                      <span className="font-mono">
                        GRESA: {selectedSchoolDetail.gresaCode}
                      </span>
                    </>
                  )}
                </div>
                <h3 className="text-lg font-black text-white">
                  {selectedSchoolDetail.schoolName}
                </h3>
                <div className="text-xs text-slate-300 mt-1">
                  {selectedSchoolDetail.cycle} · الوسط: {selectedSchoolDetail.areaType} · المساهم: {selectedSchoolDetail.submitterRole}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedSchoolDetail(null)}
                className="text-white/70 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-800">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <div className="font-black text-slate-900 mb-1">
                  وصف محيط المؤسسة والموقع:
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {selectedSchoolDetail.areaDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-slate-200 space-y-1.5">
                  <div className="font-black text-emerald-800 flex items-center gap-1.5">
                    <Home className="w-4 h-4" />
                    <span>السكن وإمكانية الكراء</span>
                  </div>
                  <div className="font-bold text-slate-900">
                    {selectedSchoolDetail.canRent}
                  </div>
                  {selectedSchoolDetail.nearbyRentalPlaces && (
                    <p className="text-xs text-slate-600">
                      {selectedSchoolDetail.nearbyRentalPlaces}
                    </p>
                  )}
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 space-y-1.5">
                  <div className="font-black text-blue-800 flex items-center gap-1.5">
                    <Bus className="w-4 h-4" />
                    <span>النقل والمسالك الطرقية</span>
                  </div>
                  <div className="font-bold text-slate-900">
                    {selectedSchoolDetail.transportAvailable}
                  </div>
                  {selectedSchoolDetail.transportDesc && (
                    <p className="text-xs text-slate-600">
                      {selectedSchoolDetail.transportDesc}
                    </p>
                  )}
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 space-y-1.5">
                  <div className="font-black text-indigo-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>الأمان وتعامل الساكنة</span>
                  </div>
                  <div className="font-bold text-slate-900">
                    {selectedSchoolDetail.environmentSafety}
                  </div>
                  <p className="text-xs text-slate-600">
                    الساكنة: {selectedSchoolDetail.communityWelcome} · الطاقم:{" "}
                    {selectedSchoolDetail.staffAtmosphere}
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 space-y-1.5">
                  <div className="font-black text-amber-800 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4" />
                    <span>بنية المؤسسة والتلاميذ</span>
                  </div>
                  <div className="font-bold text-slate-900">
                    مؤسسة {selectedSchoolDetail.schoolSize}
                  </div>
                  <p className="text-xs text-slate-600">
                    {selectedSchoolDetail.schoolSizeDesc ||
                      selectedSchoolDetail.studentBehavior}
                  </p>
                </div>
              </div>

              {selectedSchoolDetail.envServices.length > 0 && (
                <div>
                  <div className="font-black text-slate-900 mb-2">
                    الخدمات الأساسية القريبة المتوفرة:
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    {selectedSchoolDetail.envServices.map((srv) => (
                      <div
                        key={srv}
                        className="flex items-center gap-1.5 p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-medium"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{srv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedSchoolDetail.extraNotes && (
                <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-xs text-amber-950">
                  <span className="font-black ml-1">ملاحظة وتوجيه للأساتذة الجدد:</span>
                  {selectedSchoolDetail.extraNotes}
                </div>
              )}

              {/* Contact / Links */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                {selectedSchoolDetail.phone && (
                  <button
                    type="button"
                    onClick={() => handleCopy(selectedSchoolDetail.phone!)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-700" />
                    <span dir="ltr" className="font-mono tabular-nums">
                      {selectedSchoolDetail.phone}
                    </span>
                    <Copy className="w-3 h-3 text-slate-400" />
                  </button>
                )}

                {selectedSchoolDetail.mapsLink && (
                  <a
                    href={selectedSchoolDetail.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-50 hover:bg-blue-100 text-blue-800 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>الموقع على خرائط جوجل</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                {selectedSchoolDetail.facebookLink && (
                  <a
                    href={selectedSchoolDetail.facebookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-indigo-50 hover:bg-indigo-100 text-indigo-800 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
                  >
                    <span>صفحة المؤسسة</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            <div className="no-print p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleAddToWishlist(selectedSchoolDetail)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl text-xs cursor-pointer transition"
                >
                  + إضافة إلى بطاقة الرغبات
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-3.5 py-2 rounded-xl text-xs cursor-pointer flex items-center gap-1.5 transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>طباعة البطاقة</span>
                </button>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSchoolDetail(null)}
                className="bg-slate-900 text-white font-bold px-4 py-2 rounded-xl text-xs cursor-pointer"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
