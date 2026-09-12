import React, { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  FileText,
  Layers,
  Search,
  Sparkles,
  School,
  GraduationCap,
  Award,
  ExternalLink,
  ChevronLeft,
  Share2,
  Printer,
  CheckCircle2,
  Download,
  Eye,
  HelpCircle,
  Clock,
  Filter,
  FileCheck,
  Presentation,
  Check,
  Compass,
} from "lucide-react";
import { TabKey, GradeLevelId } from "../types";
import { EDUCATIONAL_LEVELS_DATA } from "../data/educationalLevelsData";

interface PrimaireHubPageProps {
  onNavigateToTab: (tab: TabKey) => void;
  onOpenPrintPreview?: () => void;
}

interface PrimaryLevelCardInfo {
  id: GradeLevelId;
  title: string;
  levelNumber: number;
  code: string;
  blogUrl: string;
  theme: {
    bgLight: string;
    border: string;
    text: string;
    badgeBg: string;
    badgeText: string;
    hoverBorder: string;
    btnHover: string;
    gradient: string;
  };
  description: string;
  topicsCount: number;
  featuredSubjects: string[];
}

const PRIMARY_LEVELS: PrimaryLevelCardInfo[] = [
  {
    id: "primary_1",
    title: "المستوى الأول",
    levelNumber: 1,
    code: "1AEP",
    blogUrl: "https://profpressma.blogspot.com/p/1primaire.html",
    theme: {
      bgLight: "bg-red-50/80",
      border: "border-red-200",
      text: "text-red-700",
      badgeBg: "bg-red-600",
      badgeText: "text-white",
      hoverBorder: "hover:border-red-400",
      btnHover: "hover:bg-red-50 hover:text-red-700",
      gradient: "from-red-600 to-rose-700",
    },
    description: "بناء التعلمات الأساسية، القراءة المقطعية، الحساب الذهني، والأناشيد التربوية.",
    topicsCount: 14,
    featuredSubjects: ["اللغة العربية", "الرياضيات", "التربية الإسلامية", "النشاط العلمي"],
  },
  {
    id: "primary_2",
    title: "المستوى الثاني",
    levelNumber: 2,
    code: "2AEP",
    blogUrl: "https://profpressma.blogspot.com/p/2primaire.html",
    theme: {
      bgLight: "bg-orange-50/80",
      border: "border-orange-200",
      text: "text-orange-700",
      badgeBg: "bg-orange-500",
      badgeText: "text-white",
      hoverBorder: "hover:border-orange-400",
      btnHover: "hover:bg-orange-50 hover:text-orange-700",
      gradient: "from-orange-500 to-amber-600",
    },
    description: "تطوير الطلاقة القرائية، إدماج الفرنسية الأولية، والعمليات الحسابية البسيطة.",
    topicsCount: 12,
    featuredSubjects: ["اللغة العربية", "Français", "الرياضيات", "النشاط العلمي"],
  },
  {
    id: "primary_3",
    title: "المستوى الثالث",
    levelNumber: 3,
    code: "3AEP",
    blogUrl: "https://profpressma.blogspot.com/p/3primaire.html",
    theme: {
      bgLight: "bg-emerald-50/80",
      border: "border-emerald-200",
      text: "text-emerald-700",
      badgeBg: "bg-emerald-600",
      badgeText: "text-white",
      hoverBorder: "hover:border-emerald-400",
      btnHover: "hover:bg-emerald-50 hover:text-emerald-700",
      gradient: "from-emerald-600 to-teal-700",
    },
    description: "ترسيخ القواعد الظاهرة والضمنية، الإنتاج الكتابي، والأنشطة العلمية الاستكشافية.",
    topicsCount: 15,
    featuredSubjects: ["اللغة العربية", "Français", "الرياضيات", "التربية الإسلامية"],
  },
  {
    id: "primary_4",
    title: "المستوى الرابع",
    levelNumber: 4,
    code: "4AEP",
    blogUrl: "https://profpressma.blogspot.com/p/4primaire.html",
    theme: {
      bgLight: "bg-blue-50/80",
      border: "border-blue-200",
      text: "text-blue-700",
      badgeBg: "bg-blue-600",
      badgeText: "text-white",
      hoverBorder: "hover:border-blue-400",
      btnHover: "hover:bg-blue-50 hover:text-blue-700",
      gradient: "from-blue-600 to-cyan-700",
    },
    description: "بداية السلك المتوسط، إدراج الاجتماعيات، تعميق القواعد اللغوية، والمسائل الرياضية.",
    topicsCount: 16,
    featuredSubjects: ["اللغة العربية", "Français", "الرياضيات", "الاجتماعيات"],
  },
  {
    id: "primary_5",
    title: "المستوى الخامس",
    levelNumber: 5,
    code: "5AEP",
    blogUrl: "https://profpressma.blogspot.com/p/5primaire.html",
    theme: {
      bgLight: "bg-indigo-50/80",
      border: "border-indigo-200",
      text: "text-indigo-700",
      badgeBg: "bg-indigo-600",
      badgeText: "text-white",
      hoverBorder: "hover:border-indigo-400",
      btnHover: "hover:bg-indigo-50 hover:text-indigo-700",
      gradient: "from-indigo-600 to-violet-700",
    },
    description: "الإعداد للشهادة الابتدائية، التوسع في الظواهر التركيبية والصرفية، والهندسة الفضائية.",
    topicsCount: 18,
    featuredSubjects: ["اللغة العربية", "Français", "الرياضيات", "النشاط العلمي"],
  },
  {
    id: "primary_6",
    title: "المستوى السادس",
    levelNumber: 6,
    code: "6AEP",
    blogUrl: "https://profpressma.blogspot.com/p/6primaire.html",
    theme: {
      bgLight: "bg-purple-50/80",
      border: "border-purple-200",
      text: "text-purple-700",
      badgeBg: "bg-purple-600",
      badgeText: "text-white",
      hoverBorder: "hover:border-purple-400",
      btnHover: "hover:bg-purple-50 hover:text-purple-700",
      gradient: "from-purple-600 to-fuchsia-700",
    },
    description: "السنة الإشهادية لنيل شهادة الدروس الابتدائية، الامتحانات الموحدة المحلية والإقليمية.",
    topicsCount: 22,
    featuredSubjects: ["الامتحان الموحد", "اللغة العربية", "Français", "الرياضيات"],
  },
];

export const PrimaireHubPage: React.FC<PrimaireHubPageProps> = ({
  onNavigateToTab,
  onOpenPrintPreview,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const pageUrl = "https://profpressma.blogspot.com/p/primaire.html";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(pageUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShare = (platform: "whatsapp" | "facebook" | "email") => {
    const text = "فضاء التعليم الابتدائي الشامل - بروف بريس Profpress: دروس، فروض، مخططات وخرائط ذهنية لجميع المستويات";
    if (platform === "whatsapp") {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + pageUrl)}`, "_blank");
    } else if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`, "_blank");
    } else if (platform === "email") {
      window.open(`mailto:?subject=${encodeURIComponent("فضاء التعليم الابتدائي - بروف بريس")}&body=${encodeURIComponent(text + "\n" + pageUrl)}`);
    }
  };

  const filteredLevels = PRIMARY_LEVELS.filter((level) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      level.title.toLowerCase().includes(q) ||
      level.code.toLowerCase().includes(q) ||
      level.description.toLowerCase().includes(q) ||
      level.featuredSubjects.some((s) => s.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-16 font-cairo max-w-7xl mx-auto">
      {/* 1. Breadcrumb Bar & Quick Navigation */}
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
          <span className="text-slate-500">الأسلاك التعليمية</span>
          <span className="text-slate-300">/</span>
          <span className="text-blue-900 font-black">فضاء التعليم الابتدائي (Primaire)</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigateToTab("home")}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-blue-700 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 transition cursor-pointer"
          >
            <span>العودة للرئيسية</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Official Hero Banner matching Blogpost Structure */}
      <div className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-sm">
        {/* Banner Graphic Image from profpressma */}
        <div className="relative w-full bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 p-4 sm:p-6 md:p-8 text-center text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Child/Pupil Icon Avatar */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-400 to-amber-500 rounded-3xl flex items-center justify-center text-slate-950 text-2xl sm:text-3xl mx-auto mb-4 shadow-lg border-2 border-white/40 ring-4 ring-amber-400/20">
            <School className="w-8 h-8 sm:w-10 sm:h-10 text-slate-950" />
          </div>

          <div className="max-w-3xl mx-auto space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-amber-300 text-xs px-3.5 py-1 rounded-full font-bold border border-white/20 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>فضاء التعليم الابتدائي بالمغرب • الموسم الدراسي 2025-2026</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight">
              فضاء التعليم الابتدائي
            </h1>

            <p className="text-slate-200 text-xs sm:text-sm md:text-base font-semibold max-w-2xl mx-auto leading-relaxed pt-1">
              اختر المستوى الدراسي لتصفح وتحميل الموارد التعليمية المتاحة (دروس، فروض، جذاذات ومخططات)
            </p>

            <div className="w-24 h-1.5 bg-amber-400 mx-auto mt-4 rounded-full" />
          </div>

          {/* Direct Banner Image Presentation */}
          <div className="mt-6 max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-slate-900/60 p-2">
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEih0htsIjDHsdp1jPRZ3EP0cJh71fHl9Q9bPvBX9h-wcfvDoBL13oZi2JJrDyt8bwqO7ED0Q7jbcXdlI_o-BCUDqtO7MaqUQq6Rrp2tS8IZ13Y0wDuNUxLlEnsmTivYlH8iWAY0X3vl5NBv/s640-rw/Forod-primaire-%25D9%2581%25D8%25B1%25D9%2588%25D8%25B6-%25D8%25A7%25D9%2584%25D8%25AA%25D8%25B9%25D9%2584%25D9%258A%25D9%2585-%25D8%25A7%25D9%2584%25D8%25A7%25D8%25A8%25D8%25AA%25D8%25AF%25D8%25A7%25D8%25A6%25D9%258A-%25D8%25AC%25D9%2585%25D9%258A%25D8%25B9-%25D8%25A7%25D9%2584%25D9%2585%25D8%25B1%25D8%25A7%25D8%25AD%25D9%2584.png"
              alt="فروض ومستويات التعليم الابتدائي جميع المراحل - بروف بريس"
              className="w-full h-auto rounded-xl object-cover hover:scale-[1.01] transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Quick Toolbar (Search + Direct Cycle Tools) */}
        <div className="p-4 sm:p-5 bg-slate-50/80 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="search-primary-levels"
              placeholder="ابحث عن مستوى، مادة، أو فرض..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-bold"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-thin">
            <button
              type="button"
              onClick={() => onNavigateToTab("explicit_teaching")}
              className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              <Presentation className="w-3.5 h-3.5 text-amber-700" />
              <span>دروس التعليم الصريح (الريادة)</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateToTab("pedagogical_docs")}
              className="px-3 py-1.5 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-900 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              <FileCheck className="w-3.5 h-3.5 text-blue-700" />
              <span>تجميع وثائق الأستاذ (11 وثيقة)</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateToTab("primary_6")}
              className="px-3 py-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              <Award className="w-3.5 h-3.5 text-purple-700" />
              <span>الامتحانات الإشهادية (السادس)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. The 6 Primary Levels Grid (شبكة المستويات الستة) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-6 bg-blue-600 rounded-full" />
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              المستويات الدراسية الستة لسلك التعليم الابتدائي
            </h2>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
            1AEP إلى 6AEP
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredLevels.map((level) => {
            return (
              <div
                key={level.id}
                id={`card-primary-level-${level.levelNumber}`}
                className={`bg-white rounded-2xl shadow-xs border ${level.theme.border} overflow-hidden hover:shadow-md ${level.theme.hoverBorder} transition-all duration-200 flex flex-col justify-between`}
              >
                {/* Level Card Header */}
                <div
                  className={`${level.theme.bgLight} p-4 sm:p-4.5 border-b ${level.theme.border} flex items-center justify-between`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 ${level.theme.badgeBg} ${level.theme.badgeText} rounded-xl flex items-center justify-center font-black text-lg shadow-xs`}
                    >
                      {level.levelNumber}
                    </div>
                    <div>
                      <h3 className={`text-base sm:text-lg font-black ${level.theme.text}`}>
                        {level.title}
                      </h3>
                      <span className="text-[10px] font-mono font-bold text-slate-500 block">
                        {level.code} • المستوى {level.levelNumber} ابتدائي
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onNavigateToTab(level.id)}
                    className="text-xs font-bold text-slate-600 hover:text-blue-700 bg-white/80 hover:bg-white px-2.5 py-1 rounded-lg border border-slate-200/80 transition cursor-pointer flex items-center gap-1 shadow-2xs"
                  >
                    <span>فتح الفضاء</span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Level Description & Key Tags */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {level.description}
                  </p>

                  {/* 4 Interactive Category Buttons matching blog page (دروس، فروض، مخططات، خرائط ذهنية) */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    {/* 1. دروس */}
                    <button
                      type="button"
                      id={`btn-lessons-${level.id}`}
                      onClick={() => onNavigateToTab(level.id)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50/90 border border-slate-200/70 transition-colors group cursor-pointer ${level.theme.btnHover}`}
                      title={`تصفح دروس ${level.title}`}
                    >
                      <BookOpen className="w-5 h-5 text-slate-400 group-hover:text-inherit mb-1.5 transition-colors" />
                      <span className="text-xs font-bold text-slate-700 group-hover:text-inherit">
                        دروس
                      </span>
                    </button>

                    {/* 2. فروض */}
                    <button
                      type="button"
                      id={`btn-exams-${level.id}`}
                      onClick={() => onNavigateToTab(level.id)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50/90 border border-slate-200/70 transition-colors group cursor-pointer ${level.theme.btnHover}`}
                      title={`تصفح فروض ومراقبة مستمرة ${level.title}`}
                    >
                      <FileText className="w-5 h-5 text-slate-400 group-hover:text-inherit mb-1.5 transition-colors" />
                      <span className="text-xs font-bold text-slate-700 group-hover:text-inherit">
                        فروض
                      </span>
                    </button>

                    {/* 3. مخططات */}
                    <button
                      type="button"
                      id={`btn-plans-${level.id}`}
                      onClick={() => onNavigateToTab(level.id)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50/90 border border-slate-200/70 transition-colors group cursor-pointer ${level.theme.btnHover}`}
                      title={`تصفح المخططات والتوازيع لـ ${level.title}`}
                    >
                      <Calendar className="w-5 h-5 text-slate-400 group-hover:text-inherit mb-1.5 transition-colors" />
                      <span className="text-xs font-bold text-slate-700 group-hover:text-inherit">
                        مخططات
                      </span>
                    </button>

                    {/* 4. خرائط ذهنية */}
                    <button
                      type="button"
                      id={`btn-mindmaps-${level.id}`}
                      onClick={() => onNavigateToTab(level.id)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50/90 border border-slate-200/70 transition-colors group cursor-pointer ${level.theme.btnHover}`}
                      title={`تصفح الخرائط الذهنية والملخصات لـ ${level.title}`}
                    >
                      <Layers className="w-5 h-5 text-slate-400 group-hover:text-inherit mb-1.5 transition-colors" />
                      <span className="text-xs font-bold text-slate-700 group-hover:text-inherit">
                        خرائط ذهنية
                      </span>
                    </button>
                  </div>

                  {/* Level Footer with Subjects & External Link */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1 text-slate-500 font-bold truncate max-w-[70%]">
                      <span>المواد:</span>
                      <span className="text-slate-700 truncate">
                        {level.featuredSubjects.join("، ")}
                      </span>
                    </div>

                    <a
                      href={level.blogUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-bold hover:underline flex items-center gap-0.5 shrink-0"
                      title="فتح صفحة المستوى على مدونة بروف بريس"
                    >
                      <span>الموقع</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. قسم الامتحانات الإشهادية (المستوى السادس) matching blog page */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-800 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 text-xs px-3 py-1 rounded-full font-bold border border-amber-400/30">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>نيل شهادة الدروس الابتدائية 2025-2026</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white">
            الامتحانات الإشهادية (المستوى السادس ابتدائي)
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-semibold">
            نماذج الامتحانات الموحدة المحلية على صعيد المؤسسة (دورة يناير) والامتحانات الإقليمية الموحدة (دورة يونيو) مع عناصر الإجابة الرسمية.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* Card 1: الامتحان الموحد المحلي */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-teal-400/30 hover:bg-white/15 hover:border-teal-400/60 transition-all duration-200 space-y-4 group">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-teal-500/20 border border-teal-400/40 text-teal-300 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">
                <School className="w-7 h-7 text-teal-300" />
              </div>
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] bg-teal-400 text-slate-950 px-2 py-0.5 rounded-full font-black">
                    دورة يناير
                  </span>
                  <span className="text-xs text-teal-200 font-mono">على صعيد المؤسسة</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-teal-300">
                  الامتحان الموحد المحلي
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  نماذج الامتحانات المحلية الموحدة لمواد اللغة العربية، التربية الإسلامية، النشاط العلمي، الرياضيات، والفرنسية.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-3">
              <button
                type="button"
                id="btn-open-local-exams"
                onClick={() => onNavigateToTab("primary_6")}
                className="flex-1 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>تصفح نماذج الموحد المحلي</span>
                <ChevronLeft className="w-4 h-4" />
              </button>

              <a
                href="https://profpressma.blogspot.com/search/label/%D8%A7%D9%84%D8%A7%D9%85%D8%AA%D8%AD%D8%A7%D9%86%20%D8%A7%D9%84%D9%85%D9%88%D8%AD%D8%AF%20%D8%A7%D9%84%D9%85%D8%AD%D9%84%D9%8A%20%D8%A7%D9%84%D8%B3%D8%A7%D8%AF%D8%B3"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white text-xs p-2.5 rounded-xl border border-white/20 transition cursor-pointer"
                title="فتح الأرشيف الكامل على بروف بريس"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 2: الامتحان الموحد الإقليمي */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-rose-400/30 hover:bg-white/15 hover:border-rose-400/60 transition-all duration-200 space-y-4 group">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-400/40 text-rose-300 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-7 h-7 text-rose-300" />
              </div>
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] bg-rose-400 text-slate-950 px-2 py-0.5 rounded-full font-black">
                    دورة يونيو
                  </span>
                  <span className="text-xs text-rose-200 font-mono">على صعيد المديرية</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-rose-300">
                  الامتحان الموحد الإقليمي
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  نماذج الامتحانات الإقليمية لنيل شهادة الدروس الابتدائية لجميع الأكاديميات والمديريات مع التصحيح وسلم التنقيط.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-3">
              <button
                type="button"
                id="btn-open-regional-exams"
                onClick={() => onNavigateToTab("primary_6")}
                className="flex-1 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black text-xs py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>تصفح نماذج الموحد الإقليمي</span>
                <ChevronLeft className="w-4 h-4" />
              </button>

              <a
                href="https://profpressma.blogspot.com/search/label/%D8%A7%D9%84%D8%A7%D9%85%D8%AA%D8%AD%D8%A7%D9%86%20%D8%A7%D9%84%D9%85%D9%88%D8%AD%D8%AF%20%D8%A7%D9%84%D8%A5%D9%82%D9%84%D9%8A%D9%85%D9%8A%20%D8%A7%D9%84%D8%B3%D8%A7%D8%AF%D8%B3"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white text-xs p-2.5 rounded-xl border border-white/20 transition cursor-pointer"
                title="فتح الأرشيف الكامل على بروف بريس"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Teacher Quick Utilities for Primary Cycle */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-6 bg-amber-500 rounded-full" />
          <h3 className="text-base sm:text-lg font-black text-slate-900">
            حقيبة أستاذ التعليم الابتدائي السريعة
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <button
            type="button"
            onClick={() => onNavigateToTab("daily_log")}
            className="p-3 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-900 border border-slate-200 rounded-2xl text-center transition cursor-pointer flex flex-col items-center justify-center gap-1.5"
          >
            <Calendar className="w-5 h-5 text-blue-600" />
            <span className="text-xs font-black">المذكرة اليومية</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateToTab("timetable")}
            className="p-3 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border border-slate-200 rounded-2xl text-center transition cursor-pointer flex flex-col items-center justify-center gap-1.5"
          >
            <Clock className="w-5 h-5 text-emerald-600" />
            <span className="text-xs font-black">استعمال الزمن</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateToTab("grids")}
            className="p-3 bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-purple-900 border border-slate-200 rounded-2xl text-center transition cursor-pointer flex flex-col items-center justify-center gap-1.5"
          >
            <FileCheck className="w-5 h-5 text-purple-600" />
            <span className="text-xs font-black">شبكات المراقبة</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateToTab("charter")}
            className="p-3 bg-slate-50 hover:bg-amber-50 text-slate-700 hover:text-amber-900 border border-slate-200 rounded-2xl text-center transition cursor-pointer flex flex-col items-center justify-center gap-1.5"
          >
            <FileText className="w-5 h-5 text-amber-600" />
            <span className="text-xs font-black">ميثاق القسم</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateToTab("card")}
            className="p-3 bg-slate-50 hover:bg-rose-50 text-slate-700 hover:text-rose-900 border border-slate-200 rounded-2xl text-center transition cursor-pointer flex flex-col items-center justify-center gap-1.5"
          >
            <School className="w-5 h-5 text-rose-600" />
            <span className="text-xs font-black">البطاقة الشخصية</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateToTab("holidays")}
            className="p-3 bg-slate-50 hover:bg-cyan-50 text-slate-700 hover:text-cyan-900 border border-slate-200 rounded-2xl text-center transition cursor-pointer flex flex-col items-center justify-center gap-1.5"
          >
            <Sparkles className="w-5 h-5 text-cyan-600" />
            <span className="text-xs font-black">لائحة العطل</span>
          </button>
        </div>
      </div>

      {/* 6. Social Share & Print Bar matching profpress style */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-slate-600">
        <div className="flex items-center gap-2">
          <Share2 className="w-4 h-4 text-blue-600" />
          <span>مشاركة صفحة فضاء الابتدائي:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handleShare("whatsapp")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-full transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <span>واتساب</span>
          </button>

          <button
            type="button"
            onClick={() => handleShare("facebook")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <span>فيسبوك</span>
          </button>

          <button
            type="button"
            onClick={() => handleShare("email")}
            className="bg-slate-700 hover:bg-slate-800 text-white px-3 py-1.5 rounded-full transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <span>إيميل</span>
          </button>

          <button
            type="button"
            onClick={handleCopyLink}
            className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 px-3 py-1.5 rounded-full transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">تم النسخ!</span>
              </>
            ) : (
              <span>نسخ الرابط</span>
            )}
          </button>

          {onOpenPrintPreview && (
            <button
              type="button"
              onClick={onOpenPrintPreview}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-3 py-1.5 rounded-full transition flex items-center gap-1.5 cursor-pointer shadow-2xs font-black"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
