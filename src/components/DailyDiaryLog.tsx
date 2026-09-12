import React, { useState } from "react";
import {
  BookOpen,
  Calendar,
  Clock,
  Printer,
  Download,
  Eye,
  Edit3,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  Layers,
  UserCheck,
  User,
  PenTool,
  Award,
  Briefcase,
  GraduationCap,
  Building2,
  Percent,
  FileText,
  Lightbulb,
  Cog,
  Users,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Share2,
  Copy,
  Info,
  ListChecks,
  Baby,
  Calculator,
  Compass,
  FileSpreadsheet,
} from "lucide-react";
import { TeacherProfile, DailyLogBookConfig, DailyLogDay, DailyGroupActivity, DailyLogModelId } from "../types";
import { INITIAL_DAILY_LOG_CONFIG } from "../data/dailyLogData";
import { KickoffProceduresModel } from "./daily_models/KickoffProceduresModel";
import { TripleSubjectsModel } from "./daily_models/TripleSubjectsModel";
import { Grade1PrepModel } from "./daily_models/Grade1PrepModel";
import { ExplicitTeachingModel } from "./daily_models/ExplicitTeachingModel";
import { ComprehensivePioneerModel } from "./daily_models/ComprehensivePioneerModel";
import { RuledNotebookModel } from "./daily_models/RuledNotebookModel";

interface DailyDiaryLogProps {
  teacherProfile: TeacherProfile;
}

export const DailyDiaryLog: React.FC<DailyDiaryLogProps> = ({ teacherProfile }) => {
  const [selectedModel, setSelectedModel] = useState<DailyLogModelId | "ruled_notebook">("kickoff_procedures");
  const [config, setConfig] = useState<DailyLogBookConfig>(INITIAL_DAILY_LOG_CONFIG);
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"booklet" | "single_page" | "editor">("booklet");
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [isEditingDay, setIsEditingDay] = useState<boolean>(false);
  const [editingDayData, setEditingDayData] = useState<DailyLogDay | null>(null);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  // Models Catalog
  const modelsCatalog = [
    {
      id: "kickoff_procedures" as const,
      title: "1. إجراءات بداية السنة وتمرير الروائز",
      subtitle: "جدول العمليات وتوقيع المحاضر وتمرير الروائز والورشات ومسك مسار (نموذج تفاعلي قابل للتعديل)",
      badge: "2026/2027 • قابل للتعديل",
      badgeColor: "bg-amber-400 text-slate-950 font-black",
      icon: ListChecks,
      iconBg: "bg-amber-500/20 text-amber-300",
    },
    {
      id: "tarl_support" as const,
      title: "2. المذكرة اليومية لأنشطة الدعم المكثف TaRL",
      subtitle: "الكتيب الرسمي المتكامل (10 صفحات): الغلاف، البسملة، البطاقة الشخصية، وجذاذات الأفواج الثنائية",
      badge: "10 صفحات • TaRL",
      badgeColor: "bg-emerald-400 text-emerald-950 font-black",
      icon: BookOpen,
      iconBg: "bg-emerald-500/20 text-emerald-300",
    },
    {
      id: "comprehensive_pioneer" as const,
      title: "3. الدفتر الشامل للمدرسة الرائدة (المثمر)",
      subtitle: "مستجدات الريادة الـ 18، النشيد الوطني، القانون الداخلي للفصل، اليومية المدرسية ولائحة العطل",
      badge: "24 صفحة • المثمر",
      badgeColor: "bg-blue-400 text-blue-950 font-black",
      icon: Award,
      iconBg: "bg-blue-500/20 text-blue-300",
    },
    {
      id: "triple_subjects" as const,
      title: "4. مذكرة المواد الثلاثية (عربية - رياضيات - فرنسية)",
      subtitle: "صفحة واحدة يومية متكاملة مقسمة لمحطات الحصة لكل مادة (افتتاح، معجم، قراءة/حساب، ممارسة)",
      badge: "3 مواد في صفحة",
      badgeColor: "bg-cyan-400 text-cyan-950 font-black",
      icon: Calculator,
      iconBg: "bg-cyan-500/20 text-cyan-300",
    },
    {
      id: "grade_1_prep" as const,
      title: "5. مذكرة المستوى الأول (التهيئة والاستئناس بالدقائق)",
      subtitle: "توزيع دقيق بالدقائق: أناشيد، استماع وتحدث، تفكير منطقي، تهيئة العد، وتقديم الحروف",
      badge: "توزيع بالدقائق",
      badgeColor: "bg-rose-400 text-rose-950 font-black",
      icon: Baby,
      iconBg: "bg-rose-500/20 text-rose-300",
    },
    {
      id: "explicit_teaching" as const,
      title: "6. مذكرة التدريس الصريح والخطاطة الذهنية",
      subtitle: "مخطط الحصص مع الخطاطة الذهنية، نسب التحقق، تبادل الأفواج، وفترات الاستراحة والتوقيت الوزاري",
      badge: "التدريس الصريح",
      badgeColor: "bg-purple-400 text-purple-950 font-black",
      icon: Compass,
      iconBg: "bg-purple-500/20 text-purple-300",
    },
    {
      id: "ruled_notebook" as const,
      title: "7. المذكرة المسطرة لشبكة التخطيط الكراسية",
      subtitle: "نموذج مسطر بسطور كراسية للتدوين والكتابة اليدوية المباشرة مع خانات الأنشطة الأربعة",
      badge: "مسطر للكتابة",
      badgeColor: "bg-slate-200 text-slate-900 font-bold",
      icon: FileSpreadsheet,
      iconBg: "bg-slate-500/20 text-slate-300",
    },
  ];

  // Available pages in order
  const pagesList = [
    { id: "cover", title: "1. الغلاف الخارجي للمذكرة", type: "cover" },
    { id: "basmala", title: "2. صفحة البسملة والزخرفة الملكية", type: "basmala" },
    { id: "card", title: "3. البطاقة الشخصية للأستاذ(ة)", type: "card" },
    ...config.days.map((d, idx) => ({
      id: `day_${idx}`,
      title: `صفحة التخطيط: ${d.dayName} (${d.gregorianDate})`,
      type: "day",
      dayIndex: idx,
    })),
    { id: "back_cover", title: "الغلاف الخلفي للمذكرة", type: "back_cover" },
  ];

  const handleEditDay = (day: DailyLogDay, index: number) => {
    setSelectedDayIndex(index);
    setEditingDayData(JSON.parse(JSON.stringify(day)));
    setIsEditingDay(true);
  };

  const handleSaveDayEdits = () => {
    if (!editingDayData) return;
    const updatedDays = [...config.days];
    updatedDays[selectedDayIndex] = editingDayData;
    setConfig({ ...config, days: updatedDays });
    setIsEditingDay(false);
  };

  const handleAddNewDay = () => {
    const newDayNumber = config.days.length + 1;
    const newDay: DailyLogDay = {
      id: `day_${Date.now()}`,
      dayName: "يوم دراسي",
      gregorianDate: "شتنبر 2026",
      hijriDate: "ربيع الأول 1448",
      group1: {
        id: `g1_${Date.now()}`,
        groupName: "الفوج 1 (المسار 1)",
        objective: "التمكن من المهارة الأساسية والطلاقة القرائية / الحساب الذهني",
        path: "مسار الكلمات والأنشطة الداعمة",
        levelBlock: "اللبنة 1",
        sessionNumber: `الحصة ${newDayNumber}`,
        startTime: "08:30",
        endTime: "10:30",
        activity1: "أنشطة التهيؤ والانطلاق، أنشودة الحروف/الأعداد، وتنشيط الذاكرة.",
        activity2: "النمذجة وقراءة اللوحات التعليمية مع الشرح والتوجيه المباشر.",
        activity3: "تطبيقات كتابية على الألواح الفردية وكراسة الدعم المكثف.",
        activity4: "العمل التشاركي والألعاب البيداغوجية والتقويم المرحلي.",
        notes: "ملاحظات التقويم ورصد التعثرات ونسب التحكم.",
        percentageAchieved: "88%",
      },
      group2: {
        id: `g2_${Date.now()}`,
        groupName: "الفوج 2 (المسار 2)",
        objective: "الفهم القرائي للجمل / إجراء العمليات الحسابية بدقة",
        path: "مسار الجمل والعمليات",
        levelBlock: "اللبنة 2",
        sessionNumber: `الحصة ${newDayNumber}`,
        startTime: "10:45",
        endTime: "12:45",
        activity1: "لعبة الكلمات البصرية وتنشيط مكتسبات الحصة السابقة.",
        activity2: "قراءة موجهة ونمذجة استراتيجيات الفهم والحساب السريع.",
        activity3: "تمارين تدريبية فردية على كراسة الأنشطة ومتابعة الإنجاز.",
        activity4: "قراءات ثنائية متبادلة وتقويم تكويني بأوراق التتبع.",
        notes: "تحكم عام ممتاز مع تخصيص دعم إضافي للمتعثرين.",
        percentageAchieved: "90%",
      },
    };
    setConfig({ ...config, days: [...config.days, newDay] });
    setSelectedDayIndex(config.days.length);
  };

  const handleDeleteDay = (index: number) => {
    if (config.days.length <= 1) return;
    const updatedDays = config.days.filter((_, i) => i !== index);
    setConfig({ ...config, days: updatedDays });
    if (selectedDayIndex >= updatedDays.length) {
      setSelectedDayIndex(updatedDays.length - 1);
    }
  };

  const handleDuplicateDay = (index: number) => {
    const dayToCopy = config.days[index];
    const clonedDay: DailyLogDay = {
      ...JSON.parse(JSON.stringify(dayToCopy)),
      id: `day_${Date.now()}`,
      dayName: `${dayToCopy.dayName} (مكرر)`,
    };
    const updatedDays = [...config.days];
    updatedDays.splice(index + 1, 0, clonedDay);
    setConfig({ ...config, days: updatedDays });
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Top Banner with Actions */}
      <div className="no-print bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-950 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-emerald-800/40 relative overflow-hidden">
        <div className="relative z-10 space-y-5">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-amber-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                  الموسم الدراسي {config.schoolYear}
                </span>
                <span className="bg-emerald-800/80 text-emerald-200 text-xs font-bold px-3 py-1 rounded-full border border-emerald-700">
                  مكتبة نماذج المذكرة اليومية بالمدرسة الرائدة ومقاربة TaRL
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-black font-cairo text-white">
                المذكرة اليومية لبداية السنة الدراسية والدعم التربوي
              </h1>

              <p className="text-xs md:text-sm text-emerald-100/80 leading-relaxed">
                اختر النموذج المناسب لعملك الصفي من بين 7 نماذج رسمية مصممة وفق أحدث مقررات ومستجدات وزارة التربية الوطنية ومدارس الريادة، مع إمكانية التعديل التفاعلي المباشر وتضمين معلوماتك الشخصية والمؤسساتية والطباعة الفورية بجودة A4.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full md:w-auto">
              <button
                onClick={() => window.print()}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs md:text-sm flex items-center gap-2 shadow-md cursor-pointer transition transform active:scale-95"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة النموذج A4</span>
              </button>
            </div>
          </div>

          {/* Model Selector Cards (Gallery) */}
          <div className="pt-3 border-t border-emerald-800/50 space-y-2.5">
            <div className="text-xs font-black text-amber-300 flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>اختر النموذج المراد استعراضه وتعديله وطباعته :</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
              {modelsCatalog.map((model) => {
                const isSelected = selectedModel === model.id;
                const Icon = model.icon;
                return (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model.id as any)}
                    className={`text-right p-3 rounded-2xl border transition text-xs flex flex-col justify-between gap-2 cursor-pointer ${
                      isSelected
                        ? "bg-white text-slate-950 border-amber-400 shadow-md ring-2 ring-amber-400"
                        : "bg-emerald-950/60 text-white border-emerald-800/70 hover:bg-emerald-900/80"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 w-full">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected ? "bg-emerald-100 text-emerald-800" : model.iconBg
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className={`font-bold line-clamp-1 ${isSelected ? "text-slate-950" : "text-white"}`}>
                          {model.title}
                        </span>
                      </div>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full shrink-0 ${model.badgeColor}`}>
                        {model.badge}
                      </span>
                    </div>

                    <p
                      className={`text-[10px] line-clamp-2 leading-relaxed ${
                        isSelected ? "text-slate-600" : "text-emerald-200/70"
                      }`}
                    >
                      {model.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* RENDER MODEL VIEWS */}
      {selectedModel === "kickoff_procedures" && (
        <KickoffProceduresModel teacherProfile={teacherProfile} />
      )}

      {selectedModel === "comprehensive_pioneer" && (
        <ComprehensivePioneerModel teacherProfile={teacherProfile} />
      )}

      {selectedModel === "triple_subjects" && (
        <TripleSubjectsModel teacherProfile={teacherProfile} />
      )}

      {selectedModel === "grade_1_prep" && (
        <Grade1PrepModel teacherProfile={teacherProfile} />
      )}

      {selectedModel === "explicit_teaching" && (
        <ExplicitTeachingModel teacherProfile={teacherProfile} />
      )}

      {selectedModel === "ruled_notebook" && (
        <RuledNotebookModel teacherProfile={teacherProfile} />
      )}

      {/* TARL SUPPORT 10-PAGES BOOKLET MODEL */}
      {selectedModel === "tarl_support" && (
        <div className="space-y-6">
          {/* Sub-toolbar for TaRL Model */}
          <div className="no-print bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-700 font-bold">طريقة معاينة الكتيب:</span>
              <button
                onClick={() => setViewMode("booklet")}
                className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                  viewMode === "booklet"
                    ? "bg-emerald-800 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                الكتيب الكامل (جاهز للطباعة)
              </button>
              <button
                onClick={() => setViewMode("single_page")}
                className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                  viewMode === "single_page"
                    ? "bg-emerald-800 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                صفحة بصفحة
              </button>
              <button
                onClick={() => setViewMode("editor")}
                className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                  viewMode === "editor"
                    ? "bg-emerald-800 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                جدول الأيام والأنشطة ({config.days.length} أيام)
              </button>
            </div>

            {viewMode === "single_page" && (
              <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-xl border border-slate-300">
                <button
                  disabled={activePageIndex === 0}
                  onClick={() => setActivePageIndex(Math.max(0, activePageIndex - 1))}
                  className="p-1 rounded text-slate-700 hover:text-black disabled:opacity-30 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <span className="font-mono font-bold text-slate-900 text-xs">
                  {activePageIndex + 1} / {pagesList.length} : {pagesList[activePageIndex]?.title}
                </span>
                <button
                  disabled={activePageIndex === pagesList.length - 1}
                  onClick={() => setActivePageIndex(Math.min(pagesList.length - 1, activePageIndex + 1))}
                  className="p-1 rounded text-slate-700 hover:text-black disabled:opacity-30 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

      {/* Mode 1: Editor View for Days */}
      {viewMode === "editor" && (
        <div className="no-print bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <span>إدارة وتخصيص أيام المذكرة اليومية</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                يمكنك تعديل الأهداف والأنشطة لكل فوج وإضافة أيام جديدة أو حذفها وتحديث التواريخ.
              </p>
            </div>

            <button
              onClick={handleAddNewDay}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-xs transition"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة يوم جديد للمذكرة</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {config.days.map((day, idx) => (
              <div
                key={day.id}
                className="border border-slate-200 hover:border-emerald-500 rounded-2xl p-4 bg-slate-50/50 hover:bg-white transition space-y-3 relative group"
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-slate-800 text-sm">{day.dayName}</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {day.gregorianDate}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  <div className="bg-blue-50/80 p-2 rounded-lg border border-blue-100">
                    <div className="font-bold text-blue-900 flex items-center justify-between">
                      <span>الفوج 1: {day.group1.levelBlock}</span>
                      <span className="text-[10px] text-blue-700">{day.group1.percentageAchieved}</span>
                    </div>
                    <p className="line-clamp-1 text-[11px] text-slate-600 mt-0.5">{day.group1.objective}</p>
                  </div>

                  <div className="bg-amber-50/80 p-2 rounded-lg border border-amber-100">
                    <div className="font-bold text-amber-900 flex items-center justify-between">
                      <span>الفوج 2: {day.group2.levelBlock}</span>
                      <span className="text-[10px] text-amber-700">{day.group2.percentageAchieved}</span>
                    </div>
                    <p className="line-clamp-1 text-[11px] text-slate-600 mt-0.5">{day.group2.objective}</p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-200">
                  <button
                    onClick={() => handleEditDay(day, idx)}
                    className="flex-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold py-1.5 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>تعديل الأنشطة</span>
                  </button>

                  <button
                    onClick={() => handleDuplicateDay(idx)}
                    title="تكرار اليوم"
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDeleteDay(idx)}
                    disabled={config.days.length <= 1}
                    title="حذف اليوم"
                    className="p-1.5 text-rose-400 hover:text-rose-700 hover:bg-rose-50 rounded-lg disabled:opacity-30 transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Single Day Modal */}
      {isEditingDay && editingDayData && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 md:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-emerald-600" />
                <span>تعديل جذاذة اليوم الدراسي: {editingDayData.dayName}</span>
              </h3>
              <button
                onClick={() => setIsEditingDay(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* General Day Header Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">اليوم:</label>
                <input
                  type="text"
                  value={editingDayData.dayName}
                  onChange={(e) => setEditingDayData({ ...editingDayData, dayName: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-bold"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">تاريخ اليوم (الميلادي):</label>
                <input
                  type="text"
                  value={editingDayData.gregorianDate}
                  onChange={(e) => setEditingDayData({ ...editingDayData, gregorianDate: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-bold"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">الموافق لـ (الهجري):</label>
                <input
                  type="text"
                  value={editingDayData.hijriDate}
                  onChange={(e) => setEditingDayData({ ...editingDayData, hijriDate: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-bold"
                />
              </div>
            </div>

            {/* Two Groups Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Group 1 Editor */}
              <div className="border-2 border-emerald-500/40 rounded-2xl p-4 bg-emerald-50/20 space-y-3">
                <div className="bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg flex items-center justify-between">
                  <span>الفوج الأول (الحصة 1)</span>
                  <input
                    type="text"
                    value={editingDayData.group1.groupName}
                    onChange={(e) =>
                      setEditingDayData({
                        ...editingDayData,
                        group1: { ...editingDayData.group1, groupName: e.target.value },
                      })
                    }
                    className="bg-emerald-800 text-white text-xs px-2 py-0.5 rounded border border-emerald-600 text-left font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700">المسار:</label>
                    <input
                      type="text"
                      value={editingDayData.group1.path}
                      onChange={(e) =>
                        setEditingDayData({
                          ...editingDayData,
                          group1: { ...editingDayData.group1, path: e.target.value },
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700">اللبنة:</label>
                    <input
                      type="text"
                      value={editingDayData.group1.levelBlock}
                      onChange={(e) =>
                        setEditingDayData({
                          ...editingDayData,
                          group1: { ...editingDayData.group1, levelBlock: e.target.value },
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700">الحصة:</label>
                    <input
                      type="text"
                      value={editingDayData.group1.sessionNumber}
                      onChange={(e) =>
                        setEditingDayData({
                          ...editingDayData,
                          group1: { ...editingDayData.group1, sessionNumber: e.target.value },
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5"
                    />
                  </div>
                  <div className="flex gap-1">
                    <div className="flex-1">
                      <label className="font-bold text-slate-700">من:</label>
                      <input
                        type="text"
                        value={editingDayData.group1.startTime}
                        onChange={(e) =>
                          setEditingDayData({
                            ...editingDayData,
                            group1: { ...editingDayData.group1, startTime: e.target.value },
                          })
                        }
                        className="w-full bg-white border border-slate-300 rounded-lg px-2 py-1.5 font-mono"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="font-bold text-slate-700">إلى:</label>
                      <input
                        type="text"
                        value={editingDayData.group1.endTime}
                        onChange={(e) =>
                          setEditingDayData({
                            ...editingDayData,
                            group1: { ...editingDayData.group1, endTime: e.target.value },
                          })
                        }
                        className="w-full bg-white border border-slate-300 rounded-lg px-2 py-1.5 font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700">الهدف البيداغوجي:</label>
                  <textarea
                    rows={2}
                    value={editingDayData.group1.objective}
                    onChange={(e) =>
                      setEditingDayData({
                        ...editingDayData,
                        group1: { ...editingDayData.group1, objective: e.target.value },
                      })
                    }
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs"
                  />
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="font-bold text-amber-700 flex items-center gap-1">
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>نشاط 1 (التهيؤ والانطلاق):</span>
                    </label>
                    <input
                      type="text"
                      value={editingDayData.group1.activity1}
                      onChange={(e) =>
                        setEditingDayData({
                          ...editingDayData,
                          group1: { ...editingDayData.group1, activity1: e.target.value },
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-blue-700 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>نشاط 2 (النمذجة والتعلم الموجه):</span>
                    </label>
                    <input
                      type="text"
                      value={editingDayData.group1.activity2}
                      onChange={(e) =>
                        setEditingDayData({
                          ...editingDayData,
                          group1: { ...editingDayData.group1, activity2: e.target.value },
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-purple-700 flex items-center gap-1">
                      <Cog className="w-3.5 h-3.5" />
                      <span>نشاط 3 (الممارسة المستقلة والتطبيق):</span>
                    </label>
                    <input
                      type="text"
                      value={editingDayData.group1.activity3}
                      onChange={(e) =>
                        setEditingDayData({
                          ...editingDayData,
                          group1: { ...editingDayData.group1, activity3: e.target.value },
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-rose-700 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      <span>نشاط 4 (العمل التشاركي والإنتاج):</span>
                    </label>
                    <input
                      type="text"
                      value={editingDayData.group1.activity4}
                      onChange={(e) =>
                        setEditingDayData({
                          ...editingDayData,
                          group1: { ...editingDayData.group1, activity4: e.target.value },
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label className="font-bold text-slate-700">ملاحظات الفوج:</label>
                    <input
                      type="text"
                      value={editingDayData.group1.notes}
                      onChange={(e) =>
                        setEditingDayData({
                          ...editingDayData,
                          group1: { ...editingDayData.group1, notes: e.target.value },
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700">نسبة التحكم %:</label>
                    <input
                      type="text"
                      value={editingDayData.group1.percentageAchieved}
                      onChange={(e) =>
                        setEditingDayData({
                          ...editingDayData,
                          group1: { ...editingDayData.group1, percentageAchieved: e.target.value },
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-lg px-2 py-1.5 text-xs font-bold text-emerald-700"
                    />
                  </div>
                </div>
              </div>

              {/* Group 2 Editor */}
              <div className="border-2 border-blue-500/40 rounded-2xl p-4 bg-blue-50/20 space-y-3">
                <div className="bg-blue-800 text-white font-bold px-3 py-1.5 rounded-lg flex items-center justify-between">
                  <span>الفوج الثاني (الحصة 2)</span>
                  <input
                    type="text"
                    value={editingDayData.group2.groupName}
                    onChange={(e) =>
                      setEditingDayData({
                        ...editingDayData,
                        group2: { ...editingDayData.group2, groupName: e.target.value },
                      })
                    }
                    className="bg-blue-900 text-white text-xs px-2 py-0.5 rounded border border-blue-600 text-left font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-700">المسار:</label>
                    <input
                      type="text"
                      value={editingDayData.group2.path}
                      onChange={(e) =>
                        setEditingDayData({
                          ...editingDayData,
                          group2: { ...editingDayData.group2, path: e.target.value },
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700">اللبنة:</label>
                    <input
                      type="text"
                      value={editingDayData.group2.levelBlock}
                      onChange={(e) =>
                        setEditingDayData({
                          ...editingDayData,
                          group2: { ...editingDayData.group2, levelBlock: e.target.value },
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700">الحصة:</label>
                    <input
                      type="text"
                      value={editingDayData.group2.sessionNumber}
                      onChange={(e) =>
                        setEditingDayData({
                          ...editingDayData,
                          group2: { ...editingDayData.group2, sessionNumber: e.target.value },
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5"
                    />
                  </div>
                  <div className="flex gap-1">
                    <div className="flex-1">
                      <label className="font-bold text-slate-700">من:</label>
                      <input
                        type="text"
                        value={editingDayData.group2.startTime}
                        onChange={(e) =>
                          setEditingDayData({
                            ...editingDayData,
                            group2: { ...editingDayData.group2, startTime: e.target.value },
                          })
                        }
                        className="w-full bg-white border border-slate-300 rounded-lg px-2 py-1.5 font-mono"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="font-bold text-slate-700">إلى:</label>
                      <input
                        type="text"
                        value={editingDayData.group2.endTime}
                        onChange={(e) =>
                          setEditingDayData({
                            ...editingDayData,
                            group2: { ...editingDayData.group2, endTime: e.target.value },
                          })
                        }
                        className="w-full bg-white border border-slate-300 rounded-lg px-2 py-1.5 font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700">الهدف البيداغوجي:</label>
                  <textarea
                    rows={2}
                    value={editingDayData.group2.objective}
                    onChange={(e) =>
                      setEditingDayData({
                        ...editingDayData,
                        group2: { ...editingDayData.group2, objective: e.target.value },
                      })
                    }
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs"
                  />
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="font-bold text-amber-700 flex items-center gap-1">
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>نشاط 1 (التهيؤ والانطلاق):</span>
                    </label>
                    <input
                      type="text"
                      value={editingDayData.group2.activity1}
                      onChange={(e) =>
                        setEditingDayData({
                          ...editingDayData,
                          group2: { ...editingDayData.group2, activity1: e.target.value },
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-blue-700 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>نشاط 2 (النمذجة والتعلم الموجه):</span>
                    </label>
                    <input
                      type="text"
                      value={editingDayData.group2.activity2}
                      onChange={(e) =>
                        setEditingDayData({
                          ...editingDayData,
                          group2: { ...editingDayData.group2, activity2: e.target.value },
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-purple-700 flex items-center gap-1">
                      <Cog className="w-3.5 h-3.5" />
                      <span>نشاط 3 (الممارسة المستقلة والتطبيق):</span>
                    </label>
                    <input
                      type="text"
                      value={editingDayData.group2.activity3}
                      onChange={(e) =>
                        setEditingDayData({
                          ...editingDayData,
                          group2: { ...editingDayData.group2, activity3: e.target.value },
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-rose-700 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      <span>نشاط 4 (العمل التشاركي والإنتاج):</span>
                    </label>
                    <input
                      type="text"
                      value={editingDayData.group2.activity4}
                      onChange={(e) =>
                        setEditingDayData({
                          ...editingDayData,
                          group2: { ...editingDayData.group2, activity4: e.target.value },
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label className="font-bold text-slate-700">ملاحظات الفوج:</label>
                    <input
                      type="text"
                      value={editingDayData.group2.notes}
                      onChange={(e) =>
                        setEditingDayData({
                          ...editingDayData,
                          group2: { ...editingDayData.group2, notes: e.target.value },
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700">نسبة التحكم %:</label>
                    <input
                      type="text"
                      value={editingDayData.group2.percentageAchieved}
                      onChange={(e) =>
                        setEditingDayData({
                          ...editingDayData,
                          group2: { ...editingDayData.group2, percentageAchieved: e.target.value },
                        })
                      }
                      className="w-full bg-white border border-slate-300 rounded-lg px-2 py-1.5 text-xs font-bold text-blue-700"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => setIsEditingDay(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl text-xs cursor-pointer transition"
              >
                إلغاء
              </button>
              <button
                onClick={handleSaveDayEdits}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2 rounded-xl text-xs flex items-center gap-2 shadow-xs cursor-pointer transition"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
                <span>حفظ التعديلات والتطبيق</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Printable Booklet Sheets Container */}
      <div className="daily-diary-container space-y-12">
        {/* Render pages depending on viewMode */}
        {(viewMode === "booklet" || (viewMode === "single_page" && activePageIndex === 0)) && (
          <CoverPage config={config} teacherProfile={teacherProfile} />
        )}

        {(viewMode === "booklet" || (viewMode === "single_page" && activePageIndex === 1)) && (
          <BasmalaPage />
        )}

        {(viewMode === "booklet" || (viewMode === "single_page" && activePageIndex === 2)) && (
          <TeacherCardPage teacherProfile={teacherProfile} />
        )}

        {config.days.map((day, idx) => {
          const pagePos = idx + 3;
          if (viewMode === "booklet" || (viewMode === "single_page" && activePageIndex === pagePos)) {
            return (
              <DailyLogSheetPage
                key={day.id}
                day={day}
                dayNumber={idx + 1}
                teacherProfile={teacherProfile}
                onEdit={() => handleEditDay(day, idx)}
              />
            );
          }
          return null;
        })}

        {(viewMode === "booklet" ||
          (viewMode === "single_page" && activePageIndex === pagesList.length - 1)) && (
          <BackCoverPage />
        )}
      </div>
    </div>
      )}
    </div>
  );
};

/* =========================================================================
   PAGE 1: الغلاف الخارجي (Front Cover)
   ========================================================================= */
const CoverPage: React.FC<{ config: DailyLogBookConfig; teacherProfile: TeacherProfile }> = ({
  config,
  teacherProfile,
}) => {
  return (
    <div className="print-sheet bg-white w-full max-w-[794px] mx-auto min-h-[1123px] p-8 md:p-12 rounded-2xl shadow-xl border border-slate-300 relative overflow-hidden flex flex-col justify-between text-center select-none font-cairo">
      {/* Decorative Top Curves */}
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-emerald-700/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-0 right-0 left-0 h-4 bg-gradient-to-r from-emerald-700 via-amber-500 to-emerald-800" />

      {/* Header section with Morocco Emblem */}
      <div className="space-y-3 z-10 pt-2">
        <div className="flex justify-center">
          <img
            src="/morocco-ministry-logo.png"
            alt="وزارة التربية الوطنية والتعليم الأولي والرياضة"
            className="h-16 md:h-20 w-auto max-w-full object-contain filter drop-shadow-xs"
          />
        </div>
      </div>

      {/* Main Title Badge (Matching PDF Page 1) */}
      <div className="my-6 z-10 space-y-4">
        <div className="inline-block bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white px-8 py-5 rounded-3xl shadow-xl border-4 border-amber-400 max-w-xl mx-auto transform hover:scale-[1.01] transition">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-wide leading-tight drop-shadow-md">
            المذكرة اليومية لأنشطة
            <br />
            الدعم التربوي المكثف
          </h1>
        </div>

        <div>
          <span className="inline-block bg-white text-emerald-950 font-black text-sm md:text-base px-6 py-2 rounded-full border-2 border-emerald-600 shadow-md">
            الموسم الدراسي : {config.schoolYear}
          </span>
        </div>
      </div>

      {/* Classroom Illustration & Chalkboard Banner */}
      <div className="z-10 my-4 bg-gradient-to-b from-amber-50 to-emerald-50/40 p-4 md:p-6 rounded-3xl border-2 border-emerald-200 shadow-inner relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
          <div className="md:col-span-2 bg-white/90 p-4 rounded-2xl border border-emerald-100 text-right space-y-2 shadow-xs">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>مدارس الريادة • هندسة أنشطة TaRL</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              تخطيط وتتبع محكم للحصص اليومية، مسارات الطلاقة القرائية والحساب الذهني، وتوثيق نسب التمكن المرحلية بالقسم.
            </p>
            <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2 text-[11px] font-bold text-slate-700">
              <span className="bg-emerald-100/70 text-emerald-900 px-2 py-0.5 rounded">الأستاذ(ة): {teacherProfile.fullNameAr || "........................"}</span>
              <span className="bg-blue-100/70 text-blue-900 px-2 py-0.5 rounded">المؤسسة: {teacherProfile.institution || "........................"}</span>
            </div>
          </div>

          <div className="bg-emerald-950 text-white p-4 rounded-2xl border-4 border-amber-800 shadow-md text-center space-y-1">
            <p className="text-amber-300 font-bold text-xs font-serif">معاً</p>
            <p className="text-white font-black text-sm">من أجل</p>
            <p className="text-amber-400 font-black text-base">تعليم أفضل</p>
            <div className="text-xl">😊</div>
          </div>
        </div>
      </div>

      {/* Footer Branding with Madrastna */}
      <div className="z-10 pt-4 border-t-2 border-emerald-800/20 flex flex-col items-center justify-center gap-1.5">
        <div className="flex items-center gap-2 text-emerald-900 font-black text-lg">
          <span className="tracking-widest">مـدرستـنـا</span>
          <span className="font-mono text-base font-normal text-emerald-700">madrastna</span>
        </div>
        <p className="text-[11px] font-mono text-slate-500 font-semibold">www.madrastna.ma</p>
      </div>
    </div>
  );
};

/* =========================================================================
   PAGE 2: صفحة البسملة والزخرفة الملكية (Basmala Page)
   ========================================================================= */
const BasmalaPage: React.FC = () => {
  return (
    <div className="print-sheet bg-white w-full max-w-[794px] mx-auto min-h-[1123px] p-8 md:p-14 rounded-2xl shadow-xl border border-slate-300 relative flex items-center justify-center select-none font-cairo">
      {/* Royal Moroccan Andalusian Border */}
      <div className="w-full h-full border-4 border-amber-500/80 rounded-3xl p-6 md:p-10 relative flex flex-col items-center justify-center">
        {/* Double Inner Frame */}
        <div className="absolute inset-3 border-2 border-blue-900/40 rounded-2xl pointer-events-none" />

        {/* 4 Corner Ornaments */}
        <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-amber-600 rounded-tr-xl pointer-events-none" />
        <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-amber-600 rounded-tl-xl pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-amber-600 rounded-br-xl pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-amber-600 rounded-bl-xl pointer-events-none" />

        {/* Central Ornate Cartouche */}
        <div className="relative p-8 md:p-16 text-center space-y-6 max-w-lg mx-auto">
          <div className="w-20 h-20 mx-auto text-amber-500 flex items-center justify-center">
            <Sparkles className="w-16 h-16 stroke-[1.5]" />
          </div>

          <div className="border-y-4 border-amber-500/70 py-8 px-6 bg-gradient-to-r from-amber-50/50 via-blue-50/30 to-amber-50/50 rounded-2xl">
            <h2 className="text-3xl md:text-5xl font-black text-blue-950 font-serif leading-relaxed tracking-wider drop-shadow-xs">
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ
            </h2>
          </div>

          <p className="text-xs md:text-sm text-slate-500 font-bold">
            وَقُل رَّبِّ زِدْنِي عِلْمًا
          </p>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   PAGE 3: البطاقة الشخصية للأستاذ(ة) (Teacher Card)
   ========================================================================= */
const TeacherCardPage: React.FC<{ teacherProfile: TeacherProfile }> = ({ teacherProfile }) => {
  return (
    <div className="print-sheet bg-white w-full max-w-[794px] mx-auto min-h-[1123px] p-6 md:p-10 rounded-2xl shadow-xl border border-slate-300 relative flex flex-col justify-between select-none font-cairo text-right">
      {/* Top Header */}
      <div className="space-y-2 pb-3 border-b-2 border-slate-900">
        <div className="flex justify-center mb-1.5">
          <img
            src="/morocco-ministry-logo.png"
            alt="وزارة التربية الوطنية والتعليم الأولي والرياضة"
            className="h-12 md:h-14 w-auto max-w-full object-contain"
          />
        </div>
        <div className="flex items-center justify-between font-bold text-slate-800 text-[11px] px-1">
          <div className="text-right space-y-0.5">
            <p><span className="text-slate-600 font-medium">الأكاديمية الجهوية للتربية والتكوين :</span> {teacherProfile.academy || "...................................."}</p>
            <p><span className="text-slate-600 font-medium">المديرية الإقليمية :</span> {teacherProfile.directorate || "...................................."}</p>
          </div>
          <div className="text-left space-y-0.5">
            <p><span className="text-slate-600 font-medium">المؤسسة التعليمية :</span> {teacherProfile.institution || "...................................."}</p>
            <p><span className="text-slate-600 font-medium">الأستاذ(ة) :</span> {teacherProfile.fullNameAr || "...................................."}</p>
          </div>
        </div>

        {/* Page Title Ribbon (Matching Page 3) */}
        <div className="text-center pt-1">
          <div className="inline-block bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white px-8 py-2.5 rounded-2xl font-black text-lg md:text-xl shadow-md border-2 border-emerald-600">
            البطاقة الشخصية للأستاذ (ة)
          </div>
        </div>
      </div>

      {/* Grid of 4 Information Sections */}
      <div className="space-y-4 my-3">
        {/* 1. المعلومات الشخصية للأستاذ(ة) - Orange Section */}
        <div className="border-2 border-amber-500 rounded-2xl overflow-hidden shadow-xs">
          <div className="bg-amber-600 text-white px-4 py-2 font-bold text-xs md:text-sm flex items-center gap-2">
            <UserCheck className="w-4 h-4" />
            <span>المعلومات الشخصية للأستاذ(ة)</span>
          </div>
          <div className="p-3.5 bg-amber-50/30 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
            <div className="flex items-center gap-1.5 border-b border-dotted border-amber-200 pb-1">
              <span className="font-bold text-slate-700 shrink-0">الاسم العائلي :</span>
              <span className="font-semibold text-slate-900">{teacherProfile.fullNameAr.split(" ")[1] || teacherProfile.fullNameAr}</span>
            </div>
            <div className="flex items-center gap-1.5 border-b border-dotted border-amber-200 pb-1">
              <span className="font-bold text-slate-700 shrink-0">مكان الازدياد :</span>
              <span className="font-semibold text-slate-900">........................</span>
            </div>
            <div className="flex items-center gap-1.5 border-b border-dotted border-amber-200 pb-1">
              <span className="font-bold text-slate-700 shrink-0">الاسم الشخصي :</span>
              <span className="font-semibold text-slate-900">{teacherProfile.fullNameAr.split(" ")[0] || teacherProfile.fullNameAr}</span>
            </div>
            <div className="flex items-center gap-1.5 border-b border-dotted border-amber-200 pb-1">
              <span className="font-bold text-slate-700 shrink-0">تاريخ الازدياد :</span>
              <span className="font-semibold text-slate-900">........................</span>
            </div>
            <div className="flex items-center gap-1.5 border-b border-dotted border-amber-200 pb-1">
              <span className="font-bold text-slate-700 shrink-0">رقم بطاقة التعريف :</span>
              <span className="font-mono font-bold text-slate-900">{teacherProfile.cin || "........................"}</span>
            </div>
            <div className="flex items-center gap-1.5 border-b border-dotted border-amber-200 pb-1">
              <span className="font-bold text-slate-700 shrink-0">الحالة العائلية :</span>
              <span className="font-semibold text-slate-900">........................</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-700 shrink-0">رقم الهاتف :</span>
              <span className="font-mono font-semibold text-slate-900">{teacherProfile.phone || "........................"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-700 shrink-0">العنوان الشخصي :</span>
              <span className="font-semibold text-slate-900">{teacherProfile.commune || "........................"}</span>
            </div>
          </div>
        </div>

        {/* 2 & 3. Side by side: المعلومات الإدارية & المعلومات المهنية */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* الإدارية - Blue */}
          <div className="border-2 border-blue-600 rounded-2xl overflow-hidden shadow-xs">
            <div className="bg-blue-700 text-white px-4 py-2 font-bold text-xs md:text-sm flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>المعلومات الإدارية للأستاذ(ة)</span>
            </div>
            <div className="p-3.5 bg-blue-50/30 space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-dotted border-blue-200 pb-1">
                <span className="font-bold text-slate-700">رقم التأجير :</span>
                <span className="font-mono font-bold text-slate-900">{teacherProfile.somNumber || "........................"}</span>
              </div>
              <div className="flex items-center justify-between border-b border-dotted border-blue-200 pb-1">
                <span className="font-bold text-slate-700">تاريخ التوظيف :</span>
                <span className="font-semibold text-slate-900">{teacherProfile.recruitmentDate || "........................"}</span>
              </div>
              <div className="flex items-center justify-between border-b border-dotted border-blue-200 pb-1">
                <span className="font-bold text-slate-700">الإطار :</span>
                <span className="font-semibold text-slate-900">{teacherProfile.grade || "أستاذ التعليم الابتدائي"}</span>
              </div>
              <div className="flex items-center justify-between border-b border-dotted border-blue-200 pb-1">
                <span className="font-bold text-slate-700">الدرجة :</span>
                <span className="font-semibold text-slate-900">{teacherProfile.grade || "الدرجة الأولى"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">الرتبة :</span>
                <span className="font-semibold text-slate-900">{teacherProfile.echelon || "........................"}</span>
              </div>
            </div>
          </div>

          {/* المهنية - Green */}
          <div className="border-2 border-emerald-600 rounded-2xl overflow-hidden shadow-xs">
            <div className="bg-emerald-700 text-white px-4 py-2 font-bold text-xs md:text-sm flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>المعلومات المهنية للأستاذ(ة)</span>
            </div>
            <div className="p-3.5 bg-emerald-50/30 space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-dotted border-emerald-200 pb-1">
                <span className="font-bold text-slate-700">المؤسسة الحالية :</span>
                <span className="font-semibold text-slate-900">{teacherProfile.institution || "م/م الريادة"}</span>
              </div>
              <div className="flex items-center justify-between border-b border-dotted border-emerald-200 pb-1">
                <span className="font-bold text-slate-700">تاريخ التعيين :</span>
                <span className="font-semibold text-slate-900">{teacherProfile.schoolAssignmentDate || "........................"}</span>
              </div>
              <div className="flex items-center justify-between border-b border-dotted border-emerald-200 pb-1">
                <span className="font-bold text-slate-700">المادة / لغة التدريس :</span>
                <span className="font-semibold text-slate-900">{teacherProfile.subjectTaught || "مزدوج (عربية / فرنسية)"}</span>
              </div>
              <div className="flex items-center justify-between border-b border-dotted border-emerald-200 pb-1">
                <span className="font-bold text-slate-700">آخر نقطة تفتيش :</span>
                <span className="font-semibold text-slate-900">........................</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">المستويات المستهدفة :</span>
                <span className="font-semibold text-slate-900">{teacherProfile.assignedLevel || "المستوى 2 و 3 و 4"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. الشهادات المحصل عليها - Purple Section */}
        <div className="border-2 border-purple-600 rounded-2xl overflow-hidden shadow-xs">
          <div className="bg-purple-700 text-white px-4 py-2 font-bold text-xs md:text-sm flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            <span>الشهادات المحصل عليها</span>
          </div>
          <div className="p-3.5 bg-purple-50/30 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-xs">
            <div className="flex items-center justify-between border-b border-dotted border-purple-200 pb-1">
              <span className="font-bold text-slate-700">الشهادة 1 : الإجازة في الدراسات الأساسية</span>
              <span className="text-slate-500 font-mono text-[11px]">تاريخها: ............</span>
            </div>
            <div className="flex items-center justify-between border-b border-dotted border-purple-200 pb-1">
              <span className="font-bold text-slate-700">الشهادة 2 : دبلوم المراكز الجهوية (CRMEF)</span>
              <span className="text-slate-500 font-mono text-[11px]">تاريخها: ............</span>
            </div>
            <div className="flex items-center justify-between border-b border-dotted border-purple-200 pb-1">
              <span className="font-bold text-slate-700">الشهادة 3 : شهادة الكفاءة التربوية</span>
              <span className="text-slate-500 font-mono text-[11px]">تاريخها: ............</span>
            </div>
            <div className="flex items-center justify-between border-b border-dotted border-purple-200 pb-1">
              <span className="font-bold text-slate-700">الشهادة 4 : شهادة تكوين أستاذ الريادة (TaRL)</span>
              <span className="text-slate-500 font-mono text-[11px]">تاريخها: 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Signature boxes */}
      <div className="pt-3 border-t border-slate-200 grid grid-cols-2 gap-6 text-center text-xs font-bold text-slate-800">
        <div className="p-2 border border-slate-300 rounded-xl bg-slate-50/60 min-h-[55px] flex flex-col justify-between">
          <span>توقيع الأستاذ(ة) :</span>
          <span className="text-[10px] text-slate-400">....................................</span>
        </div>
        <div className="p-2 border border-slate-300 rounded-xl bg-slate-50/60 min-h-[55px] flex flex-col justify-between">
          <span>تأشيرة ومصادقة الإدارة التربوية :</span>
          <span className="text-[10px] text-slate-400">....................................</span>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   PAGES 4+: صفحة التخطيط اليومي للأنشطة (Daily Activity Log Sheet)
   Matching the exact double-column layout from PDF pages 4 to 9!
   ========================================================================= */
const DailyLogSheetPage: React.FC<{
  day: DailyLogDay;
  dayNumber: number;
  teacherProfile: TeacherProfile;
  onEdit: () => void;
}> = ({ day, dayNumber, teacherProfile, onEdit }) => {
  return (
    <div className="print-sheet bg-white w-full max-w-[794px] mx-auto min-h-[1123px] p-6 md:p-8 rounded-2xl shadow-xl border border-slate-300 relative flex flex-col justify-between select-none font-cairo text-right">
      {/* Top Header with Date Ribbon */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-2 border-sky-400 bg-gradient-to-r from-sky-50 via-cyan-50 to-sky-100 rounded-2xl p-2.5 px-4 shadow-xs">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center font-black text-xs">
              {dayNumber}
            </div>
            <div className="flex items-center gap-3 text-xs md:text-sm">
              <span className="font-black text-slate-900">تاريخ اليوم :</span>
              <span className="font-bold text-sky-900 bg-white px-3 py-1 rounded-lg border border-sky-200">
                {day.dayName} {day.gregorianDate}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs md:text-sm">
            <span className="font-black text-slate-900">الموافق لـ :</span>
            <span className="font-bold text-sky-900 bg-white px-3 py-1 rounded-lg border border-sky-200">
              {day.hijriDate}
            </span>
          </div>

          <button
            onClick={onEdit}
            className="no-print bg-white hover:bg-sky-50 text-sky-800 border border-sky-300 px-2 py-1 rounded text-[11px] font-bold flex items-center gap-1 cursor-pointer transition shadow-2xs"
          >
            <Edit3 className="w-3 h-3" />
            <span>تعديل</span>
          </button>
        </div>

        {/* Double Parallel Columns (Group 1 & Group 2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Group 1 Column */}
          <GroupActivityColumn activity={day.group1} colorTheme="sky" />

          {/* Group 2 Column */}
          <GroupActivityColumn activity={day.group2} colorTheme="blue" />
        </div>
      </div>

      {/* Bottom Row: ملاحظات ونسب التحقق & توقيع الأستاذ والمدير والمفتش */}
      <div className="pt-3 space-y-3 border-t border-slate-200">
        <div className="grid grid-cols-3 gap-3 text-xs font-bold text-slate-800 text-center">
          {/* إمضاء وتوقيع الأستاذ */}
          <div className="border-2 border-indigo-600 rounded-2xl p-2.5 bg-indigo-50/30 text-center space-y-2 min-h-[75px] flex flex-col justify-between">
            <div className="flex items-center justify-center gap-1.5 text-indigo-900">
              <User className="w-4 h-4 text-indigo-700" />
              <span>إمضاء الأستاذ(ة)</span>
            </div>
            <div className="border-b border-dotted border-indigo-400 w-3/4 mx-auto pb-1 text-[10px] text-slate-400">
              توقيع وملاحظات الأستاذ(ة)
            </div>
          </div>

          {/* إمضاء المدير */}
          <div className="border-2 border-emerald-600 rounded-2xl p-2.5 bg-emerald-50/30 text-center space-y-2 min-h-[75px] flex flex-col justify-between">
            <div className="flex items-center justify-center gap-1.5 text-emerald-900">
              <UserCheck className="w-4 h-4 text-emerald-700" />
              <span>إمضاء المدير(ة)</span>
            </div>
            <div className="border-b border-dotted border-emerald-400 w-3/4 mx-auto pb-1 text-[10px] text-slate-400">
              ملاحظة وتأشيرة الإدارة
            </div>
          </div>

          {/* إمضاء المفتش */}
          <div className="border-2 border-blue-600 rounded-2xl p-2.5 bg-blue-50/30 text-center space-y-2 min-h-[75px] flex flex-col justify-between">
            <div className="flex items-center justify-center gap-1.5 text-blue-900">
              <Award className="w-4 h-4 text-blue-700" />
              <span>إمضاء المفتش(ة) التربوي</span>
            </div>
            <div className="border-b border-dotted border-blue-400 w-3/4 mx-auto pb-1 text-[10px] text-slate-400">
              ملاحظات وتوجيهات التأطير
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   Sub-component: Group Column (الفوج)
   ========================================================================= */
const GroupActivityColumn: React.FC<{ activity: DailyGroupActivity; colorTheme: "sky" | "blue" }> = ({
  activity,
  colorTheme,
}) => {
  return (
    <div className="border-2 border-sky-400 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between bg-white text-xs">
      {/* Top Banner with Objective / Path / LevelBlock / Session (Matching PDF) */}
      <div className="bg-sky-600 text-white p-2.5 space-y-1.5">
        <div className="flex items-center justify-between text-[11px] font-bold">
          <span>الحصة : {activity.sessionNumber}</span>
          <span>اللبنة : {activity.levelBlock}</span>
          <span>المسار : {activity.path}</span>
        </div>
        <div className="bg-white/95 text-sky-950 p-1.5 rounded-lg font-bold text-[11px] border border-sky-300">
          <span className="text-sky-800 ml-1">الهدف :</span>
          <span>{activity.objective}</span>
        </div>
      </div>

      {/* Time and Content Header */}
      <div className="p-3 space-y-2.5 bg-slate-50/30 flex-1">
        <div className="flex items-center justify-between bg-amber-100/70 text-amber-950 px-2.5 py-1 rounded-lg font-bold text-[11px] border border-amber-300">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-700" />
            <span>التوقيت : من {activity.startTime} إلى {activity.endTime}</span>
          </div>
          <span className="text-slate-600 font-normal">مضمون الأنشطة</span>
        </div>

        {/* 4 Standardized Activity Blocks with Iconic Indicators */}
        <div className="space-y-2">
          {/* النشاط 1 (💡 مصباح أصفر) */}
          <div className="border border-amber-200 bg-white rounded-xl p-2 space-y-1 shadow-2xs">
            <div className="flex items-center gap-1.5 text-amber-900 font-bold text-[11px]">
              <div className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
                <Lightbulb className="w-2.5 h-2.5 fill-slate-950" />
              </div>
              <span>نشاط 1 : التهيؤ والانطلاق</span>
            </div>
            <p className="text-[11px] text-slate-700 leading-snug pl-1">{activity.activity1}</p>
          </div>

          {/* النشاط 2 (📖 كتاب أزرق) */}
          <div className="border border-blue-200 bg-white rounded-xl p-2 space-y-1 shadow-2xs">
            <div className="flex items-center gap-1.5 text-blue-900 font-bold text-[11px]">
              <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                <BookOpen className="w-2.5 h-2.5" />
              </div>
              <span>نشاط 2 : النمذجة والممارسة الموجهة</span>
            </div>
            <p className="text-[11px] text-slate-700 leading-snug pl-1">{activity.activity2}</p>
          </div>

          {/* النشاط 3 (⚙️ ترس بنفسجي) */}
          <div className="border border-purple-200 bg-white rounded-xl p-2 space-y-1 shadow-2xs">
            <div className="flex items-center gap-1.5 text-purple-900 font-bold text-[11px]">
              <div className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0">
                <Cog className="w-2.5 h-2.5" />
              </div>
              <span>نشاط 3 : الممارسة المستقلة والتطبيق</span>
            </div>
            <p className="text-[11px] text-slate-700 leading-snug pl-1">{activity.activity3}</p>
          </div>

          {/* النشاط 4 (👥 مجموعة متعددة الألوان) */}
          <div className="border border-rose-200 bg-white rounded-xl p-2 space-y-1 shadow-2xs">
            <div className="flex items-center gap-1.5 text-rose-900 font-bold text-[11px]">
              <div className="w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0">
                <Users className="w-2.5 h-2.5" />
              </div>
              <span>نشاط 4 : العمل التشاركي والإنتاج</span>
            </div>
            <p className="text-[11px] text-slate-700 leading-snug pl-1">{activity.activity4}</p>
          </div>
        </div>

        {/* ملاحظات ونسبة التحقق */}
        <div className="border-2 border-purple-300 rounded-xl p-2 bg-purple-50/40 space-y-1 mt-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-purple-950">
            <div className="flex items-center gap-1">
              <FileText className="w-3 h-3 text-purple-700" />
              <span>ملاحظات :</span>
            </div>
            <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-purple-200 text-purple-900 font-mono text-[10px]">
              <Percent className="w-2.5 h-2.5 text-purple-700" />
              <span>التحقق: {activity.percentageAchieved}</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-600 leading-snug">{activity.notes}</p>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   PAGE 10: الغلاف الخلفي (Back Cover)
   ========================================================================= */
const BackCoverPage: React.FC = () => {
  return (
    <div className="print-sheet bg-white w-full max-w-[794px] mx-auto min-h-[1123px] p-8 md:p-14 rounded-2xl shadow-xl border border-slate-300 relative flex flex-col justify-between text-center select-none font-cairo">
      {/* Decorative Top and Bottom Moroccan Colors */}
      <div className="absolute top-0 right-0 left-0 h-4 bg-gradient-to-r from-emerald-700 via-amber-500 to-emerald-800" />
      <div className="absolute bottom-0 right-0 left-0 h-4 bg-gradient-to-r from-emerald-800 via-amber-500 to-emerald-700" />

      <div className="pt-6" />

      {/* Central Emblem & Motto */}
      <div className="space-y-6 z-10 max-w-lg mx-auto">
        <div className="w-24 h-24 mx-auto rounded-3xl bg-emerald-50 p-4 border-2 border-emerald-200 flex items-center justify-center shadow-inner">
          <Sparkles className="w-14 h-14 text-emerald-700" />
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-black text-emerald-950 font-serif leading-relaxed">
            من أجل مدرسة
            <br />
            ذات جودة للجميع
          </h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full" />
        </div>

        {/* 5 Icons Row representing school pillars */}
        <div className="flex items-center justify-center gap-3 pt-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center shadow-xs">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shadow-xs">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-xs">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center shadow-xs">
            <Cog className="w-5 h-5" />
          </div>
          <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center shadow-xs">
            <Users className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Footer Branding with Madrastna */}
      <div className="z-10 pb-6 flex flex-col items-center justify-center gap-1.5 border-t border-slate-200 pt-6">
        <div className="flex items-center gap-2 text-emerald-900 font-black text-xl">
          <span className="tracking-widest">مـدرستـنـا</span>
          <span className="font-mono text-base font-normal text-emerald-700">madrastna</span>
        </div>
        <p className="text-xs font-mono text-slate-500 font-semibold">www.madrastna.ma</p>
      </div>
    </div>
  );
};
