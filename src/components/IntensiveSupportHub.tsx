import React, { useState, useMemo } from "react";
import {
  Layers,
  BookOpen,
  Calculator,
  Globe,
  Download,
  FileText,
  Printer,
  Search,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  Info,
  Filter,
  X,
  FileSpreadsheet,
  ChevronLeft,
  GraduationCap,
} from "lucide-react";
import {
  IntensiveLevelId,
  IntensiveSubjectId,
  IntensiveSessionItem,
  TeacherProfile,
  TabKey,
} from "../types";
import {
  INTENSIVE_SUPPORT_LEVELS,
  ESCUILA_SOURCE_URL,
} from "../data/intensiveSupportData";

interface IntensiveSupportHubProps {
  teacherProfile?: TeacherProfile;
  onNavigateToTab?: (tab: TabKey) => void;
  onOpenPrintPreview?: () => void;
}

export const IntensiveSupportHub: React.FC<IntensiveSupportHubProps> = ({
  teacherProfile,
  onNavigateToTab,
  onOpenPrintPreview,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<IntensiveLevelId>(1);
  const [selectedSubject, setSelectedSubject] = useState<IntensiveSubjectId>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSessionModal, setSelectedSessionModal] =
    useState<IntensiveSessionItem | null>(null);

  const currentLevelData = INTENSIVE_SUPPORT_LEVELS[selectedLevel];

  // Consolidate sessions based on subject filter and search
  const filteredSessions = useMemo(() => {
    let list: IntensiveSessionItem[] = [];

    if (selectedSubject === "all") {
      list = [
        ...currentLevelData.subjects.arabic.sessions,
        ...currentLevelData.subjects.math.sessions,
        ...currentLevelData.subjects.french.sessions,
      ];
      // Sort by session number then subject
      list.sort((a, b) => a.sessionNumber - b.sessionNumber);
    } else {
      list = [...currentLevelData.subjects[selectedSubject].sessions];
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.buildingBlock.toLowerCase().includes(q) ||
          s.track.toLowerCase().includes(q) ||
          `حصة ${s.sessionNumber}`.includes(q) ||
          `اليوم ${s.dayNumber}`.includes(q)
      );
    }

    return list;
  }, [currentLevelData, selectedSubject, searchQuery]);

  const handlePrintMatrix = () => {
    window.print();
  };

  const handleOpenSourceUrl = () => {
    window.open(ESCUILA_SOURCE_URL, "_blank");
  };

  return (
    <div className="space-y-6 pb-12 font-sans" dir="rtl">
      {/* Top Banner / Hero Card */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-lg border border-blue-800/40 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -translate-x-20 -translate-y-20 pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 font-black px-3.5 py-1 rounded-full text-xs shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ملف حصص الدعم المكثف الرسمي • 24 يوماً كاملة</span>
            </div>
            <button
              onClick={handleOpenSourceUrl}
              className="inline-flex items-center gap-1.5 text-xs text-blue-200 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg border border-white/20 transition cursor-pointer"
              title="زيارة صفحة المصدر الرسمية على إسكويلا escuila.info"
            >
              <span>المصدر: escuila.info</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2 max-w-4xl">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <Layers className="w-8 h-8 text-amber-300 shrink-0" />
              <span>حقيبة وملف حصص الدعم المكثف لجميع المستويات (1 إلى 6 ابتدائي)</span>
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              العدة البيداغوجية المتكاملة لحصص الدعم المكثف بمؤسسات الريادة وفق مقاربة طارل (TaRL):
              عروض السبورات التفاعلية (PowerPoint PPTX)، جذاذات وسيناريوهات الحصص (Word و PDF)،
              كراسات التلميذ، ومصفوفات التوزيع الزمني للمواد الثلاث (اللغة العربية، الرياضيات، واللغة الفرنسية).
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15">
              <div className="text-xs text-blue-200 font-medium">المستويات المتاحة</div>
              <div className="text-xl font-black text-amber-300 mt-0.5">6 مستويات (1 - 6)</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15">
              <div className="text-xs text-blue-200 font-medium">فترة الدعم المكثف</div>
              <div className="text-xl font-black text-white mt-0.5">24 يوماً (4 أسابيع)</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15">
              <div className="text-xs text-blue-200 font-medium">إجمالي الحصص للمستوى</div>
              <div className="text-xl font-black text-emerald-300 mt-0.5">72 حصة تفاعلية</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15">
              <div className="text-xs text-blue-200 font-medium">المواد الأساسية</div>
              <div className="text-xl font-black text-rose-300 mt-0.5">عربية • رياضيات • فرنسية</div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Level Selector Tabs (1 to 6) */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-700" />
            <h2 className="text-base font-bold text-slate-900">
              اختر المستوى الدراسي لعرض الحقيبة الكاملة:
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            المستوى المحدد حالياً: <strong className="text-blue-700">{currentLevelData.titleAr}</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {([1, 2, 3, 4, 5, 6] as IntensiveLevelId[]).map((lvl) => {
            const data = INTENSIVE_SUPPORT_LEVELS[lvl];
            const isSelected = selectedLevel === lvl;
            return (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition cursor-pointer relative ${
                  isSelected
                    ? "bg-blue-700 text-white border-blue-700 shadow-md ring-2 ring-blue-300"
                    : "bg-slate-50 hover:bg-blue-50/50 text-slate-700 border-slate-200"
                }`}
              >
                <span className="text-xs font-semibold">{data.titleFr}</span>
                <span className="text-sm font-black mt-0.5">{data.titleAr}</span>
                <span
                  className={`text-[10px] mt-1.5 px-2 py-0.5 rounded-full font-bold ${
                    isSelected
                      ? "bg-amber-400 text-slate-950"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  24 يوماً
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Level Summary & Direct Download Packages Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                {currentLevelData.badge}
              </span>
              <h3 className="text-lg font-black text-slate-900">
                حقيبة {currentLevelData.titleAr} ({currentLevelData.titleFr})
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
              {currentLevelData.overview}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handlePrintMatrix}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer border border-slate-300"
              title="طباعة مصفوفة الحصص الورقية"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة المصفوفة</span>
            </button>
            {onOpenPrintPreview && (
              <button
                onClick={onOpenPrintPreview}
                className="bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer border border-blue-200"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
                <span>معاينة وتصدير PDF</span>
              </button>
            )}
            <button
              onClick={handleOpenSourceUrl}
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-amber-300" />
              <span>تحميل الحقيبة الكاملة من إسكويلا</span>
            </button>
          </div>
        </div>

        {/* 3 Subject Bundles Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Arabic */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 flex flex-col justify-between gap-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-black text-emerald-900 text-sm flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-700" />
                  <span>اللغة العربية (24 حصة)</span>
                </span>
                <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full font-bold">
                  PPTX + Word
                </span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                {currentLevelData.subjects.arabic.description}
              </p>
            </div>
            <div className="flex items-center gap-1.5 pt-2 border-t border-emerald-200/60">
              <button
                onClick={handleOpenSourceUrl}
                className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-1.5 px-2 rounded-lg text-[11px] flex items-center justify-center gap-1 transition cursor-pointer"
              >
                <Download className="w-3 h-3" />
                <span>عروض PPTX</span>
              </button>
              <button
                onClick={handleOpenSourceUrl}
                className="flex-1 bg-white hover:bg-emerald-100 text-emerald-800 font-bold py-1.5 px-2 rounded-lg text-[11px] flex items-center justify-center gap-1 border border-emerald-300 transition cursor-pointer"
              >
                <FileText className="w-3 h-3 text-emerald-700" />
                <span>الجذاذات Word</span>
              </button>
            </div>
          </div>

          {/* Math */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 flex flex-col justify-between gap-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-black text-blue-900 text-sm flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-blue-700" />
                  <span>الرياضيات (24 حصة)</span>
                </span>
                <span className="text-[10px] bg-blue-200 text-blue-900 px-2 py-0.5 rounded-full font-bold">
                  PPTX + Word
                </span>
              </div>
              <p className="text-xs text-blue-800 leading-relaxed">
                {currentLevelData.subjects.math.description}
              </p>
            </div>
            <div className="flex items-center gap-1.5 pt-2 border-t border-blue-200/60">
              <button
                onClick={handleOpenSourceUrl}
                className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-bold py-1.5 px-2 rounded-lg text-[11px] flex items-center justify-center gap-1 transition cursor-pointer"
              >
                <Download className="w-3 h-3" />
                <span>عروض PPTX</span>
              </button>
              <button
                onClick={handleOpenSourceUrl}
                className="flex-1 bg-white hover:bg-blue-100 text-blue-800 font-bold py-1.5 px-2 rounded-lg text-[11px] flex items-center justify-center gap-1 border border-blue-300 transition cursor-pointer"
              >
                <FileText className="w-3 h-3 text-blue-700" />
                <span>الجذاذات Word</span>
              </button>
            </div>
          </div>

          {/* French */}
          <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-4 flex flex-col justify-between gap-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-black text-indigo-900 text-sm flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-indigo-700" />
                  <span>Français (24 séances)</span>
                </span>
                <span className="text-[10px] bg-indigo-200 text-indigo-900 px-2 py-0.5 rounded-full font-bold">
                  PPTX + Word
                </span>
              </div>
              <p className="text-xs text-indigo-800 leading-relaxed">
                {currentLevelData.subjects.french.description}
              </p>
            </div>
            <div className="flex items-center gap-1.5 pt-2 border-t border-indigo-200/60">
              <button
                onClick={handleOpenSourceUrl}
                className="flex-1 bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-1.5 px-2 rounded-lg text-[11px] flex items-center justify-center gap-1 transition cursor-pointer"
              >
                <Download className="w-3 h-3" />
                <span>Diapos PPTX</span>
              </button>
              <button
                onClick={handleOpenSourceUrl}
                className="flex-1 bg-white hover:bg-indigo-100 text-indigo-800 font-bold py-1.5 px-2 rounded-lg text-[11px] flex items-center justify-center gap-1 border border-indigo-300 transition cursor-pointer"
              >
                <FileText className="w-3 h-3 text-indigo-700" />
                <span>Fiches Word</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Subject Filter Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto">
          <span className="text-xs text-slate-500 font-bold ml-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>المادة:</span>
          </span>
          <button
            onClick={() => setSelectedSubject("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              selectedSubject === "all"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            جميع المواد (72 حصة)
          </button>
          <button
            onClick={() => setSelectedSubject("arabic")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              selectedSubject === "arabic"
                ? "bg-emerald-700 text-white"
                : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
            }`}
          >
            اللغة العربية (24)
          </button>
          <button
            onClick={() => setSelectedSubject("math")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              selectedSubject === "math"
                ? "bg-blue-700 text-white"
                : "bg-blue-50 text-blue-800 hover:bg-blue-100"
            }`}
          >
            الرياضيات (24)
          </button>
          <button
            onClick={() => setSelectedSubject("french")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              selectedSubject === "french"
                ? "bg-indigo-700 text-white"
                : "bg-indigo-50 text-indigo-800 hover:bg-indigo-100"
            }`}
          >
            اللغة الفرنسية (24)
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث بالحصة أو الموضوع أو المسار..."
            className="w-full pl-3 pr-9 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Sessions Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>
            يتم عرض <strong>{filteredSessions.length}</strong> حصة مطابقة
          </span>
          <span className="hidden sm:inline">
            اضغط على أي حصة لمعاينة السيناريو البيداغوجي والمراحل الأربعة (3P)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredSessions.map((session) => {
            const subjectBadge =
              session.subject === "arabic"
                ? { label: "لغة عربية", color: "bg-emerald-100 text-emerald-800 border-emerald-200" }
                : session.subject === "math"
                ? { label: "رياضيات", color: "bg-blue-100 text-blue-800 border-blue-200" }
                : { label: "Français", color: "bg-indigo-100 text-indigo-800 border-indigo-200" };

            return (
              <div
                key={session.id}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:shadow-md transition-all hover:border-blue-300 flex flex-col justify-between gap-3 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="bg-slate-900 text-white font-black text-xs px-2 py-0.5 rounded-md">
                        الحصة {session.sessionNumber}
                      </span>
                      <span className="text-[11px] text-slate-500 font-bold">
                        اليوم {session.dayNumber} • الأسبوع {session.weekNumber}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${subjectBadge.color}`}
                    >
                      {subjectBadge.label}
                    </span>
                  </div>

                  <h4 className="text-sm font-black text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">
                    {session.title}
                  </h4>

                  <div className="text-xs text-slate-600 space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <span className="font-semibold text-slate-700">{session.track}</span>
                      <span>•</span>
                      <span>{session.buildingBlock}</span>
                    </div>
                    {session.workbookPage && (
                      <div className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-medium border border-amber-200/50">
                        {session.workbookPage}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedSessionModal(session)}
                    className="text-xs font-bold text-blue-700 hover:text-blue-800 hover:bg-blue-50 px-2.5 py-1.5 rounded-lg transition flex items-center gap-1 cursor-pointer"
                  >
                    <span>معاينة السيناريو</span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={handleOpenSourceUrl}
                      className="text-[11px] bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-800 font-bold px-2 py-1 rounded-md border border-slate-200 transition cursor-pointer flex items-center gap-1"
                      title="تحميل عرض البوربوينت PPTX"
                    >
                      <Download className="w-3 h-3 text-blue-600" />
                      <span>PPTX</span>
                    </button>
                    <button
                      onClick={handleOpenSourceUrl}
                      className="text-[11px] bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 font-bold px-2 py-1 rounded-md border border-slate-200 transition cursor-pointer flex items-center gap-1"
                      title="تحميل جذاذة الحصة Word"
                    >
                      <FileText className="w-3 h-3 text-emerald-600" />
                      <span>Word</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Official Guidelines & 24 Days Method Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-700" />
          <h3 className="text-base font-black text-slate-900">
            توجيهات وضوابط تنظيم أسابيع الدعم المكثف بمؤسسات الريادة
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-700 leading-relaxed">
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>فترة الدعم المكثف (4 أسابيع):</span>
            </div>
            <p>
              تعتبر فترة الدعم المكثف مرحلة أولى إلزامية من الموسم الدراسي لضمان معالجة التعثرات
              وتثبيت المكتسبات الأساسية، وتستمر طيلة 24 يوماً بمعدل حصص يومية في المواد الثلاث.
            </p>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>الرائز البعدي والمراقبة المستمرة:</span>
            </div>
            <p>
              تختتم مرحلة الدعم المكثف بتمرير رائز بعدي رسمي بنفس معايير الرائز القبلي، وتتحول
              نتائجه المحصلة إلى سلم عددي معتمد يُحتسب ضمن نقط المراقبة المستمرة للدورة الأولى.
            </p>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>هيكلة الحصة ومحطات 3P:</span>
            </div>
            <p>
              تخضع كل حصة للهندسة الصريحة: الانطلاق (الروتين اليومي)، النمذجة (Je fais)،
              الممارسة الموجهة (Nous faisons) على الألواح، والممارسة المستقلة على كراسة الدعم.
            </p>
          </div>
        </div>
      </div>

      {/* Session Details Modal */}
      {selectedSessionModal && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedSessionModal(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 relative my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedSessionModal(null)}
              className="absolute top-4 left-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-blue-700 text-white text-xs font-black px-2.5 py-0.5 rounded-md">
                  الحصة {selectedSessionModal.sessionNumber}
                </span>
                <span className="text-xs text-slate-500 font-bold">
                  اليوم {selectedSessionModal.dayNumber} • {selectedSessionModal.durationMinutes} دقيقة
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900">
                {selectedSessionModal.title}
              </h3>
              <p className="text-xs text-slate-600">
                {selectedSessionModal.track} • {selectedSessionModal.buildingBlock}
              </p>
            </div>

            {/* Stages (3P) */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                المراحل والسيناريو البيداغوجي للحصة (3P):
              </h4>
              <div className="space-y-2">
                {selectedSessionModal.stages.map((stg, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">{stg.title}</span>
                      <span className="text-blue-700 font-bold">{stg.timing}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {stg.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Workbook info */}
            {selectedSessionModal.workbookPage && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 font-medium">
                📘 نشاط كراسة الدعم المكثف: {selectedSessionModal.workbookPage}
              </div>
            )}

            {/* Download Buttons in Modal */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedSessionModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                إغلاق
              </button>
              <button
                onClick={handleOpenSourceUrl}
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-amber-300" />
                <span>تحميل ملف الحصة من إسكويلا (PPTX & Word)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
