import React, { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Filter,
  GraduationCap,
  Layers,
  Printer,
  Search,
  Share2,
  Sparkles,
  User,
  School,
  Award,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Calculator,
  Compass,
  AlertCircle,
} from "lucide-react";
import { TabKey, GradeLevelId, EducationalResourceItem } from "../types";
import { EDUCATIONAL_LEVELS_DATA } from "../data/educationalLevelsData";

interface EducationalBranchPageProps {
  levelId: GradeLevelId;
  onNavigateToTab: (tab: TabKey) => void;
  onOpenPrintPreview?: () => void;
}

export const EducationalBranchPage: React.FC<EducationalBranchPageProps> = ({
  levelId,
  onNavigateToTab,
  onOpenPrintPreview,
}) => {
  const levelData = EDUCATIONAL_LEVELS_DATA[levelId] || EDUCATIONAL_LEVELS_DATA["primary_1"];

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePreviewResource, setActivePreviewResource] = useState<EducationalResourceItem | null>(null);

  // Quick calculator for Middle 3AC and 2BAC
  const [c1Score, setC1Score] = useState<number | string>(14);
  const [c2Score, setC2Score] = useState<number | string>(15);
  const [examScore, setExamScore] = useState<number | string>(13.5);
  const [calculatedAverage, setCalculatedAverage] = useState<number | null>(null);

  // Sister levels in the same cycle for quick navigation
  const cycleLevels = Object.values(EDUCATIONAL_LEVELS_DATA).filter(
    (lvl) => lvl.cycle === levelData.cycle
  );

  // Filter resources
  const filteredResources = levelData.resources.filter((res) => {
    const matchesCategory =
      activeCategory === "all" || res.category === activeCategory;
    const matchesSubject =
      selectedSubject === "all" ||
      res.subject === selectedSubject ||
      res.subject === "عام";
    const matchesSearch =
      searchQuery.trim() === "" ||
      res.title.includes(searchQuery) ||
      res.description.includes(searchQuery) ||
      res.tags.some((t) => t.includes(searchQuery));
    return matchesCategory && matchesSubject && matchesSearch;
  });

  // Calculate average for middle 3AC or 2BAC
  const handleCalculateGpa = () => {
    const c1 = Number(c1Score) || 0;
    const c2 = Number(c2Score) || 0;
    const ex = Number(examScore) || 0;

    if (levelId === "middle_3") {
      // 3AC formula: 30% Local + 30% Continuous + 40% Regional
      const continuousAvg = (c1 + c2) / 2;
      const total = continuousAvg * 0.3 + c1 * 0.3 + ex * 0.4;
      setCalculatedAverage(Math.round(total * 100) / 100);
    } else if (levelId === "high_2bac") {
      // 2BAC formula: 25% Continuous + 25% Regional (1BAC) + 50% National
      const total = c1 * 0.25 + c2 * 0.25 + ex * 0.5;
      setCalculatedAverage(Math.round(total * 100) / 100);
    }
  };

  const CycleIcon =
    levelData.cycle === "primary"
      ? User
      : levelData.cycle === "middle"
      ? School
      : GraduationCap;

  return (
    <div className="space-y-6 animate-fadeIn pb-16 font-cairo">
      {/* 1. Breadcrumb Bar & Quick Back Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200/90 rounded-2xl px-4 py-3 shadow-2xs">
        <div className="flex items-center gap-2 text-xs md:text-sm text-slate-600 font-bold">
          <button
            type="button"
            id="breadcrumb-home-btn"
            onClick={() => onNavigateToTab("home")}
            className="hover:text-blue-600 transition cursor-pointer flex items-center gap-1"
          >
            <span>الرئيسية</span>
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500">{levelData.cycleTitle}</span>
          <span className="text-slate-300">/</span>
          <span className="text-blue-900 font-black">{levelData.title}</span>
        </div>

        <button
          type="button"
          id="back-to-home-btn"
          onClick={() => onNavigateToTab("home")}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-blue-700 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 transition cursor-pointer"
        >
          <span>العودة للرئيسية</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. Hero Level Header */}
      <div className="bg-gradient-to-l from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-white/15 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1.5 border border-white/20">
                <CycleIcon className="w-3.5 h-3.5 text-amber-300" />
                <span>{levelData.cycleTitle}</span>
              </span>
              <span className="bg-amber-400 text-slate-950 text-xs px-3 py-1 rounded-full font-black">
                الموسم الدراسي {levelData.academicYear}
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs px-3 py-1 rounded-full font-bold">
                {levelData.totalResources} وثيقة ومرجع
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
              {levelData.title}
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              {levelData.description}
            </p>

            {/* Pioneer highlights if available */}
            {levelData.pioneerFeatures && levelData.pioneerFeatures.length > 0 && (
              <div className="pt-2 flex flex-wrap gap-2">
                {levelData.pioneerFeatures.map((feat, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-slate-800/80 border border-slate-700 text-slate-200 px-3 py-1 rounded-xl flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>{feat}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions in Hero */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
            <button
              type="button"
              id="hero-open-portfolio-btn"
              onClick={() => onNavigateToTab("portfolio")}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs md:text-sm transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>الملف التراكمي للمستوى</span>
            </button>
            <button
              type="button"
              id="hero-open-timetable-btn"
              onClick={() => onNavigateToTab("timetable")}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-4 py-2.5 rounded-xl text-xs md:text-sm transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Clock className="w-4 h-4 text-blue-300" />
              <span>استعمال زمن هذا القسم</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Certifying Exam Alert Box (for 6th Primary, 3AC, 1BAC, 2BAC) */}
      {levelData.featuredExam && (
        <div className="bg-amber-50 border-2 border-amber-300/80 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-2xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-md font-bold">
                  {levelData.featuredExam.type}
                </span>
                <span className="text-xs text-amber-800 font-bold">
                  {levelData.featuredExam.dateDescription}
                </span>
              </div>
              <h3 className="text-base md:text-lg font-black text-amber-950 mt-1">
                {levelData.featuredExam.name}
              </h3>
              <p className="text-xs text-amber-800 mt-0.5">
                تتوفر المنصة على الأطر المرجعية المحينة، بنك الامتحانات المصححة مع عناصر الإجابة الرسمية وسلم التنقيط.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              id="exam-filter-btn"
              onClick={() => {
                setActiveCategory("exams");
                const resSection = document.getElementById("level-resources-section");
                if (resSection) resSection.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition cursor-pointer shadow-2xs flex items-center gap-1.5"
            >
              <span>تصفح نماذج الامتحان</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 4. Sister Levels Switcher (Quickly navigate between other grades in this cycle) */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-3 shadow-2xs">
        <div className="flex items-center justify-between gap-2 mb-2 px-1">
          <span className="text-xs font-black text-slate-700 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>الانتقال السريع بين مستويات {levelData.cycleTitle}:</span>
          </span>
          <span className="text-[11px] text-slate-500">
            اختر أي مستوى لفتح صفحته المخصصة
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {cycleLevels.map((sister) => {
            const isCurrent = sister.id === levelId;
            return (
              <button
                key={sister.id}
                type="button"
                id={`sister-level-btn-${sister.id}`}
                onClick={() => onNavigateToTab(sister.id as TabKey)}
                className={`p-2.5 rounded-xl border text-xs font-bold text-center transition cursor-pointer flex flex-col items-center justify-center gap-1 ${
                  isCurrent
                    ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
                }`}
              >
                <span>{sister.shortTitle}</span>
                {isCurrent && (
                  <span className="text-[9px] bg-white/20 px-1.5 py-0.2 rounded-md font-mono">
                    الصفحة الحالية
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Integrated Calculator Tool (for Middle 3AC and 2BAC) */}
      {(levelId === "middle_3" || levelId === "high_2bac") && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <Calculator className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-black text-slate-900">
                  {levelId === "middle_3"
                    ? "حاسبة معدل شهادة السلك الإعدادي (الثالثة إعدادي)"
                    : "حاسبة المعدل العام للباكالوريا (المراقبة + الجهوي + الوطني)"}
                </h3>
                <p className="text-xs text-slate-500">
                  احسب النقطة الإجمالية المتوقعة وفق النسب والمعاملات الرسمية للوزارة
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {levelId === "middle_3"
                  ? "معدل المراقبة المستمرة (30%)"
                  : "معدل المراقبة المستمرة 2BAC (25%)"}
              </label>
              <input
                type="number"
                step="0.25"
                min="0"
                max="20"
                value={c1Score}
                onChange={(e) => setC1Score(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold text-slate-900 text-center focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {levelId === "middle_3"
                  ? "معدل الامتحان المحلي يناير (30%)"
                  : "معدل الامتحان الجهوي 1BAC (25%)"}
              </label>
              <input
                type="number"
                step="0.25"
                min="0"
                max="20"
                value={c2Score}
                onChange={(e) => setC2Score(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold text-slate-900 text-center focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {levelId === "middle_3"
                  ? "معدل الامتحان الجهوي يونيو (40%)"
                  : "معدل الامتحان الوطني الموحد (50%)"}
              </label>
              <input
                type="number"
                step="0.25"
                min="0"
                max="20"
                value={examScore}
                onChange={(e) => setExamScore(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold text-slate-900 text-center focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              id="calc-gpa-btn"
              onClick={handleCalculateGpa}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-black px-4 py-2 rounded-xl transition cursor-pointer shadow-xs"
            >
              احتساب المعدل النهائي
            </button>

            {calculatedAverage !== null && (
              <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-1.5">
                <span className="text-xs font-bold text-emerald-900">
                  المعدل العام التقديري:
                </span>
                <span className="text-lg font-black text-emerald-700 font-mono">
                  {calculatedAverage} / 20
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-md font-black ${
                    calculatedAverage >= 10
                      ? "bg-emerald-600 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {calculatedAverage >= 10 ? "مؤهل للنجاح ✓" : "بحاجة لدعم"}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. Filter & Search Controls */}
      <div id="level-resources-section" className="space-y-4">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                id="search-level-resources-input"
                placeholder={`ابحث في وثائق وجذاذات وفروض ${levelData.title}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-10 pl-4 py-2 text-xs md:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-cairo"
              />
            </div>

            {/* Subject Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-bold whitespace-nowrap">
                المادة:
              </span>
              <select
                id="select-subject-filter"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-cairo"
              >
                <option value="all">جميع المواد الدراسية</option>
                {levelData.subjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
            {[
              { id: "all", label: "كافة الوثائق والمراجع" },
              { id: "lessons", label: "الجذاذات والدروس" },
              { id: "exams", label: "الفروض والامتحانات" },
              { id: "planning", label: "التوازيع السنوية والمرحلية" },
              { id: "guidelines", label: "الأطر المرجعية ودلائل الأستاذ" },
              { id: "textbooks", label: "الكراسات المعتمدة" },
            ].map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  id={`cat-filter-btn-${cat.id}`}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    isActive
                      ? "bg-blue-900 text-white shadow-xs"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 7. Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs hover:shadow-md transition flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-800 border border-blue-100">
                    {item.subject}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    {item.format}
                  </span>
                </div>

                <h3 className="text-sm md:text-base font-black text-slate-900 group-hover:text-blue-700 transition leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] bg-slate-50 text-slate-500 border border-slate-100 px-2 py-0.5 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[10px] text-slate-400">
                  تحديث: {item.updatedDate}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setActivePreviewResource(item)}
                    className="p-1.5 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-700 transition cursor-pointer"
                    title="معاينة تفاصيل الوثيقة"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenPrintPreview) onOpenPrintPreview();
                    }}
                    className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition flex items-center gap-1 cursor-pointer shadow-2xs"
                  >
                    <Download className="w-3 h-3" />
                    <span>تحميل / طباعة A4</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <h4 className="text-base font-bold text-slate-800">
              لم يتم العثور على وثائق مطابقة لمعايير البحث
            </h4>
            <p className="text-xs text-slate-500">
              جرّب تغيير عبارة البحث أو اختيار مادة دراسية أخرى
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedSubject("all");
                setActiveCategory("all");
              }}
              className="bg-blue-50 text-blue-700 font-bold text-xs px-4 py-2 rounded-xl hover:bg-blue-100 transition cursor-pointer"
            >
              إعادة ضبط الفلاتر
            </button>
          </div>
        )}
      </div>

      {/* 8. Modal to Preview Details of Resource */}
      {activePreviewResource && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-scaleUp text-right">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">
                {activePreviewResource.subject} • {activePreviewResource.format}
              </span>
              <button
                type="button"
                onClick={() => setActivePreviewResource(null)}
                className="text-slate-400 hover:text-slate-700 transition cursor-pointer p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <h3 className="text-lg font-black text-slate-900">
              {activePreviewResource.title}
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              {activePreviewResource.description}
            </p>

            <div className="bg-slate-50 rounded-xl p-3 text-xs space-y-1.5 border border-slate-200/80">
              <div className="flex justify-between">
                <span className="text-slate-500">المستوى:</span>
                <span className="font-bold text-slate-800">{levelData.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">السلك التعليمي:</span>
                <span className="font-bold text-slate-800">{levelData.cycleTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">الصيغة:</span>
                <span className="font-bold text-slate-800">{activePreviewResource.format}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">تاريخ التحديث:</span>
                <span className="font-bold text-slate-800">{activePreviewResource.updatedDate}</span>
              </div>
            </div>

            <div className="pt-3 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setActivePreviewResource(null);
                  if (onOpenPrintPreview) onOpenPrintPreview();
                }}
                className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-black py-2.5 px-4 rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة الوثيقة A4</span>
              </button>
              <button
                type="button"
                onClick={() => setActivePreviewResource(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-4 rounded-xl text-xs transition cursor-pointer"
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
