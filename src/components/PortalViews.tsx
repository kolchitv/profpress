import React, { useState } from "react";
import {
  Zap,
  PenTool,
  GraduationCap,
  ExternalLink,
  BookOpen,
  FileText,
  Calendar,
  Sparkles,
  CheckCircle2,
  ChevronLeft,
  ArrowRight,
  Search,
  Filter,
  Award,
  ShieldCheck,
  Compass,
  Briefcase,
  Layers,
} from "lucide-react";
import { TabKey } from "../types";

const PROFPRESS_LINKS = {
  news: "https://profpressma.blogspot.com/search/label/%D9%85%D8%B3%D8%AA%D8%AC%D8%AF%D8%A7%D8%AA",
  articles: "https://profpressma.blogspot.com/search/label/%D9%85%D9%82%D8%A7%D9%84%D8%A7%D8%AA",
  recruitment: "https://profpressma.blogspot.com/search/label/%D9%85%D8%A8%D8%A7%D8%B1%D8%A7%D8%A9%20%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85",
  inspection: "https://profpressma.blogspot.com/search/label/%D9%85%D8%A8%D8%A7%D8%B1%D8%A7%D8%A9%20%D8%A7%D9%84%D8%AA%D9%81%D8%AA%D9%8A%D8%B4",
  orientation: "https://profpressma.blogspot.com/search/label/%D9%85%D8%A8%D8%A7%D8%B1%D8%A7%D8%A9%20%D8%A7%D9%84%D8%AA%D9%88%D8%AC%D9%8A%D9%87",
  administration: "https://profpressma.blogspot.com/search/label/%D8%A7%D9%84%D8%A5%D8%AF%D8%A7%D8%B1%D8%A9%20%D8%A7%D9%84%D8%AA%D8%B1%D8%A8%D9%88%D9%8A%D8%A9",
  exams: "https://profpressma.blogspot.com/search/label/%D8%A7%D9%84%D8%A7%D9%85%D8%AA%D8%AD%D8%A7%D9%86%20%D8%A7%D9%84%D9%85%D9%87%D9%86%D9%8A",
  lessonPlans: "https://profpressma.blogspot.com/search/label/%D8%AC%D8%B0%D8%A7%D8%B0%D8%A7%D8%AA",
  foroud: "https://profpressma.blogspot.com/search/label/%D9%81%D8%B1%D9%88%D8%B6",
};

interface PortalViewProps {
  onNavigateToTab: (tab: TabKey) => void;
}

// ============================================================================
// 1. NEWS VIEW (مستجدات)
// ============================================================================
export const NewsView: React.FC<PortalViewProps> = ({ onNavigateToTab }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("الكل");

  const newsItems = [
    {
      id: "n1",
      title: "المقرر الوزاري لتنظيم السنة الدراسية 2026/2027 ومحطات الدخول المدرسي",
      category: "مذكرات وزارية",
      date: "شتنبر 2026",
      urgent: true,
      summary:
        "حدد المقرر الوزاري تواريخ انطلاق الدراسة، فترات التقويم التشخيصي والدعم الاستدراكي TaRL، والتواريخ الدقيقة لفروض المراقبة المستمرة والامتحانات الإشهادية.",
      highlights: [
        "انطلاق الموسم الدراسي بورشات التقويم وتمرير روائز TaRL في مادتي العربية والرياضيات.",
        "تخصيص الأسابيع الأولى للأنشطة المندمجة واستكمال تسجيلات منظومة مسار.",
        "اعتماد جدولة العطل البينية الموحدة بمجموع 8 فترات على مدار الموسم.",
      ],
      link: PROFPRESS_LINKS.news,
      targetTab: "holidays" as TabKey,
      actionText: "عرض لائحة العطل الرسمية",
    },
    {
      id: "n2",
      title: "توسيع شبكة «مؤسسات الريادة» لتشمل مؤسسات جديدة ومحطات الإعدادي الرائد",
      category: "مدارس الريادة",
      date: "شتنبر 2026",
      urgent: false,
      summary:
        "تعميم نموذج مدارس الريادة بالمغرب ليشمل الآلاف من المؤسسات الجديدة في السلكين الابتدائي والإعدادي، مع تزويد الأساتذة بالموارد الديداكتيكية الصريحة وتجهيز الفصول بالمساليط العاكسة.",
      highlights: [
        "إلزامية تحرير تقارير ورشات التقويم 3P والتنسيق المستمر مع المفتش التربوي المواكب.",
        "توحيد كراسات المتعلم وفق مقاربة المستوى المناسب وتوثيق التدخلات في الدفتر اليومي.",
        "تفعيل شارة الريادة المرتبطة بالأثر المباشر على مكتسبات المتعلمين.",
      ],
      link: PROFPRESS_LINKS.news,
      targetTab: "workshop_report" as TabKey,
      actionText: "تحرير تقرير ورشات 3P",
    },
    {
      id: "n3",
      title: "تحديثات منظومة مسار (Massar): مسك نقط الفروض وطباعة بيانات النقط",
      category: "مسار والتقويم",
      date: "شتنبر 2026",
      urgent: false,
      summary:
        "إطلاق التحديث الجديد لمنظومة مسار الخاص باستيراد شبكات التنقيط بصيغة Excel، وتسهيل استخراج نتائج التقويم التشخيصي والدعم البيداغوجي المندمج.",
      highlights: [
        "إمكانية الاستيراد المباشر للوائح الأقسام وشبكات المراقبة المستمرة دون تعقيد.",
        "دمج تقارير الدعم المخصص في بطاقة التلميذ الفردية على مسار.",
        "توليد الملاحظات الوصفية الدقيقة لكل مادة دراسية بناء على درجة التحكم.",
      ],
      link: PROFPRESS_LINKS.news,
      targetTab: "grids" as TabKey,
      actionText: "إعداد شبكات مسار والملاحظات",
    },
    {
      id: "n4",
      title: "دليل إعداد الملف التراكمي للأستاذ(ة) وأثره في الترقية وتقويم الأداء",
      category: "التأهيل المهني",
      date: "غشت 2026",
      urgent: false,
      summary:
        "مذكرة وزارية تؤكد على أهمية احتفاظ الأستاذ(ة) بملف تراكمي منظم يضم وثائق التخطيط والتدبير والتقويم والمشاريع المبتكرة لإبراز الكفاءة المهنية.",
      highlights: [
        "تبويب الملف التراكمي إلى 6 أقسام أساسية من الهوية وحتى الأنشطة الموازية.",
        "اعتماد واجهات موحدة بصيغة A4 تتضمن شعار الوزارة وبيانات المدرس الرسمية.",
      ],
      link: PROFPRESS_LINKS.news,
      targetTab: "portfolio" as TabKey,
      actionText: "تجهيز الملف التراكمي",
    },
  ];

  const filteredNews = newsItems.filter((item) => {
    const matchesSearch =
      item.title.includes(searchTerm) ||
      item.summary.includes(searchTerm) ||
      item.category.includes(searchTerm);
    const matchesTag = selectedTag === "الكل" || item.category === selectedTag;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-blue-950 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-red-900/40 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-red-400 fill-red-400" />
              مستجدات التعليم بالمغرب
            </span>
            <span className="text-xs text-slate-300">Profpress.net</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black font-cairo text-white">
            آخر مستجدات وزارة التربية الوطنية والمقررات الرسمية
          </h2>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            متابعة فورية للمذكرات الوزارية المحينة، مستجدات الدخول المدرسي، شبكات مؤسسات الريادة، وتحديثات منظومة مسار، مع ربط مباشر بالوثائق التربوية القابلة للإعداد والطباعة.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث في المستجدات والمذكرات الوزارية..."
            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-4 pr-10 py-2.5 text-xs outline-hidden focus:ring-2 focus:ring-red-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {["الكل", "مذكرات وزارية", "مدارس الريادة", "مسار والتقويم", "التأهيل المهني"].map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                selectedTag === tag
                  ? "bg-red-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* News Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredNews.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="bg-blue-50 text-blue-800 border border-blue-200 text-[11px] font-bold px-2.5 py-0.5 rounded-lg">
                  {item.category}
                </span>
                <span className="text-slate-400 text-xs font-mono">{item.date}</span>
              </div>

              <h3 className="font-black text-base text-slate-900 leading-snug">
                {item.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {item.summary}
              </p>

              <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100 space-y-2 text-xs">
                <span className="font-bold text-slate-800 block text-[11px]">
                  أهم النقاط والتوجيهات:
                </span>
                <ul className="space-y-1.5 text-slate-600">
                  {item.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => onNavigateToTab(item.targetTab)}
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <span>{item.actionText}</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-red-600 font-bold text-xs flex items-center gap-1 transition"
              >
                <span>المقال الأصلي</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// 2. ARTICLES VIEW (مقالات تربوية وبيداغوجية)
// ============================================================================
export const ArticlesView: React.FC<PortalViewProps> = ({ onNavigateToTab }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const articles = [
    {
      id: "a1",
      title: "التعليم الصريح (Enseignement Explicite): المبادئ والخطوات التطبيقية داخل الفصل",
      field: "الديداكتيك العام",
      author: "د. عبد السلام الراجي • باحث في علوم التربية",
      readTime: "6 دقائق",
      intro:
        "يُعد التعليم الصريح أحد الركائز المعتمدة في مشروع مدارس الريادة بالمغرب؛ لما يحققه من وضوح في النمذجة (Modelage) والممارسة الموجهة (Pratique guidée) وصولاً إلى الاستقلالية التامة.",
      phases: [
        { title: "1. النمذجة (أنا أفعل)", desc: "يقوم الأستاذ بشرح المفهوم شفهياً بصوت عالٍ مع التوضيح على السبورة دون مقاطعة." },
        { title: "2. الممارسة الموجهة (نحن نفعل)", desc: "ينجز المتعلمون تمارين مشتركة بالألواح مع التصحيح الفوري الفردي." },
        { title: "3. الممارسة المستقلة (أنت تفعل)", desc: "إنجاز فردي على الكراسة لتقييم مدى ترسيخ الهدف وتحقيق نسبة تحكم تفوق 80%." },
      ],
      targetTab: "workshop_report" as TabKey,
      actionLabel: "تعبئة شبكة الملاحظات الصريحة",
    },
    {
      id: "a2",
      title: "مقاربة TaRL في معالجة التعثرات القرائية والحسابية: خارطة طريق الأستاذ",
      field: "بيداغوجيا الدعم",
      author: "هيئة التفتيش والتأطير • ديداكتيك اللغات والرياضيات",
      readTime: "8 دقائق",
      intro:
        "تعتمد مقاربة التدريس وفق المستوى المناسب على تجميع المتعلمين حسب مستواهم الحقيقي بدلاً من السن أو المستوى الدراسي، مع التركيز على الأنشطة التفاعلية وتجاوز العوائق التراكمية.",
      phases: [
        { title: "المسار القرائي في اللغة العربية", desc: "التدرج من الحرف، إلى الكلمة، ثم الفقرة البسيطة، وصولاً إلى قراءة الأقصوصة وفهمها." },
        { title: "المسار الحسابي في الرياضيات", desc: "التعرف على الأعداد 0-99، الجمع بدون احتفاظ، الطرح، ثم الانتقال للضرب والقسمة." },
        { title: "التوثيق والتتبع المستمر", desc: "تسجيل نسب التقدم أسبوعياً في شبكات مسار وتقرير الورشات للوقوف على أثر الدعم." },
      ],
      targetTab: "grids" as TabKey,
      actionLabel: "استعراض شبكات التقويم والدعم",
    },
    {
      id: "a3",
      title: "تدبير فضاء الفصل وقواعد السلوك: أسرار بناء ميثاق القسم الفعال",
      field: "التدبير الصفي",
      author: "فريق بروف بريس البيداغوجي",
      readTime: "5 دقائق",
      intro:
        "ليس ميثاق القسم مجرد وثيقة معلقة على الجدار، بل هو عقد ديداكتيكي وأخلاقي يشارك في صياغته المتعلمون لضمان مناخ صفي محفز يسوده الاحترام والتعاون والانضباط الذاتي.",
      phases: [
        { title: "الصياغة الإيجابية", desc: "استعمال عبارات تبدأ بـ «أنا أحافظ»، «أنا أنصت» بدلاً من صيغ النهي السلبية المتكررة." },
        { title: "المشاركة الفعالة", desc: "إتاحة الفرصة للمتعلمين للتوقيع بالبصمة أو الاسم لإضفاء الجدية والالتزام." },
        { title: "المراجعة المستمرة", desc: "تخصيص 5 دقائق أسبوعياً لتثمين السلوكيات الإيجابية وتكريم المتميزين بشواهد تقديرية." },
      ],
      targetTab: "charter" as TabKey,
      actionLabel: "تخصيص وطباعة ميثاق القسم",
    },
    {
      id: "a4",
      title: "ديداكتيك النشاط العلمي: خطوات نهج التقصي وبناء الفرضيات لدى متعلم الابتدائي",
      field: "ديداكتيك العلوم",
      author: "ذ. محمد الإدريسي • مفتش التعليم الابتدائي",
      readTime: "7 دقائق",
      intro:
        "يرتكز منهاج النشاط العلمي المنقح على وضعية الانطلاق المثيرة، صياغة سؤال التقصي، وضع الفرضيات وتمحيصها عبر التجريب أو التوثيق والملاحظة ثم الاستنتاج.",
      phases: [
        { title: "وضعية الانطلاق", desc: "مشهد ملموس أو صورة صادمة تخلق خلخلة معرفية تدفع المتعلم للتساؤل والبحث." },
        { title: "دفتر التقصي الفردي", desc: "تدوين المتعلم لرسوماته وفرضياته وتجاربه لترسيخ التفكير العلمي المنظم." },
        { title: "التعميم والاستثمار", desc: "صياغة الخلاصة المعرفية بلغة دقيقة وربط المفهوم بالحياة اليومية للمتعلم." },
      ],
      targetTab: "covers" as TabKey,
      actionLabel: "واجهة دفتر التقصي العلمي",
    },
  ];

  const filteredArticles = articles.filter(
    (a) =>
      a.title.includes(searchTerm) ||
      a.field.includes(searchTerm) ||
      a.intro.includes(searchTerm)
  );

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-950 via-slate-900 to-amber-950 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-orange-900/40 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="bg-orange-500/20 text-orange-300 border border-orange-500/30 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5">
              <PenTool className="w-3.5 h-3.5 text-orange-400" />
              مقالات ودراسات بيداغوجية
            </span>
            <span className="text-xs text-slate-300">ديداكتيك المواد والتدبير الصفي</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black font-cairo text-white">
            مقالات وأبحاث تطبيقية في ديداكتيك المواد والتربية
          </h2>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            مقالات تطبيقية ومقاربات حديثة في التعليم الصريح، طرائق الدعم والتقويم، هندسة الملف التراكمي، وتدبير الفوارق الفردية داخل فصول التعليم الابتدائي.
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث في المقالات البيداغوجية والمقاربات..."
            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-4 pr-10 py-2.5 text-xs outline-hidden focus:ring-2 focus:ring-orange-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
        </div>

        <a
          href={PROFPRESS_LINKS.articles}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shrink-0 shadow-xs"
        >
          <span>تصفح مقالات Profpress.net ↗</span>
        </a>
      </div>

      {/* Articles List */}
      <div className="space-y-6">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-3xl p-6 md:p-7 border border-slate-200 shadow-sm hover:shadow-md transition space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="bg-orange-50 text-orange-800 border border-orange-200 text-xs font-bold px-3 py-1 rounded-xl">
                  {article.field}
                </span>
                <span className="text-slate-400 text-xs font-medium">
                  {article.author}
                </span>
              </div>
              <span className="text-slate-400 text-xs font-mono">
                مدة القراءة: {article.readTime}
              </span>
            </div>

            <h3 className="text-lg md:text-xl font-black text-slate-900 leading-snug">
              {article.title}
            </h3>

            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              {article.intro}
            </p>

            {/* Phases Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              {article.phases.map((phase, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 space-y-1 text-xs"
                >
                  <span className="font-black text-slate-800 block text-xs text-orange-950">
                    {phase.title}
                  </span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    {phase.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => onNavigateToTab(article.targetTab)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5"
              >
                <span>{article.actionLabel}</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <a
                href={PROFPRESS_LINKS.articles}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-700 hover:text-orange-800 font-bold text-xs flex items-center gap-1"
              >
                <span>المزيد من المقالات في هذا المجال</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// 3. COMPETITIONS VIEW (مباريات مهنية)
// ============================================================================
export const CompetitionsView: React.FC<PortalViewProps> = ({ onNavigateToTab }) => {
  const competitions = [
    {
      id: "c1",
      title: "مباراة ولوج المراكز الجهوية لمهن التربية والتكوين (CRMEF)",
      badge: "أطر التدريس",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
      description:
        "مباراة توظيف أساتذة التعليم الابتدائي (مزدوج وأمازيغية) والتعليم الثانوي بسلكيه الإعدادي والتأهيلي.",
      requirements: [
        "شهادة الإجازة في التربية أو الإجازة في الدراسات الأساسية أو ما يعادلها.",
        "السن: لا يتجاوز 30 سنة عند تاريخ إجراء المباراة.",
        "اجتياز الانتقاء الأولي المبني على ميزات البكالوريا وسنوات الإجازة ومدة الحصول عليها.",
      ],
      modules: [
        "الاختبار الكتابي في مادة التخصص والديداكتيك (اللغة العربية، الفرنسية، الرياضيات، العلوم).",
        "اختبار علوم التربية والمستجدات البيداغوجية والتشريع المدرسي.",
        "الاختبار الشفوي: محاكاة وضعية تدريسية والمقابلة البيداغوجية أمام اللجنة.",
      ],
      usefulDocs: [
        { label: "جذاذات وميثاق القسم", tab: "charter" as TabKey },
        { label: "استعمالات الزمن النموذجية", tab: "timetable" as TabKey },
      ],
      externalUrl: PROFPRESS_LINKS.recruitment,
    },
    {
      id: "c2",
      title: "مباراة ولوج مركز تكوين مفتشي التعليم (CFIE)",
      badge: "التفتيش والتأطير",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      description:
        "مباراة الترقية وتغيير الإطار لولوج سلك تكوين المفتشين التربويين للتعليم الابتدائي والثانوي ومفتشي المصالح المادية والمالية.",
      requirements: [
        "قضاء 6 سنوات على الأقل من الخدمة الفعلية بصفة أستاذ مرسم.",
        "الحصول على نقطة تفتيش جيدة وتقرير تفقد مهني إيجابي.",
        "تقديم مشروع شخصي للتأطير التربوي وتطوير الأداء الصفي.",
      ],
      modules: [
        "اختبار علم النفس التربوي وسوسيولوجيا التربية والمناهج.",
        "اختبار في ديداكتيك مادة التخصص وتحليل الممارسات الصفية.",
        "مناقشة المشروع التأطيري وتقنيات الزيارة والملاحظة الإكلينيكية.",
      ],
      usefulDocs: [
        { label: "تقرير ورشات الريادة 3P", tab: "workshop_report" as TabKey },
        { label: "شبكات التقويم ومسار", tab: "grids" as TabKey },
      ],
      externalUrl: PROFPRESS_LINKS.inspection,
    },
    {
      id: "c3",
      title: "مباراة ولوج سلك تكوين أطر الإدارة التربوية (المراكز الجهوية)",
      badge: "الإدارة والتدبير",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
      description:
        "مباراة تكوين مديري ومساعدي مديري المؤسسات التعليمية، الحراس العامين، والنظار، لتدبير المؤسسات الابتدائية والثانوية.",
      requirements: [
        "أقدمية لا تقل عن 4 سنوات من الخدمة الفعلية في أطر التدريس.",
        "شهادة الإجازة في الدراسات الأساسية أو المهنية أو ما يعادلها.",
        "ملف مهني يتضمن الإسهامات في مشروع المؤسسة المندمج والأنشطة الموازية.",
      ],
      modules: [
        "التشريع والتدبير الإداري والمالي للمؤسسات التعليمية العمومية.",
        "مشروع المؤسسة المندمج (PEI) والحكامة التربوية والقيادة التشاركية.",
        "المقابلة الشفوية ومحاكاة حل النزاعات وحوادث المدارس والتدبير التواصلي.",
      ],
      usefulDocs: [
        { label: "لائحة العطل وتنظيم الموسم", tab: "holidays" as TabKey },
        { label: "واجهات السجلات والملفات", tab: "covers" as TabKey },
      ],
      externalUrl: PROFPRESS_LINKS.administration,
    },
    {
      id: "c4",
      title: "امتحان الكفاءة المهنية والترقية بالاختيار للأساتذة (الدرجة 1 و 0)",
      badge: "الترقية المهنية",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
      description:
        "امتحان سنوي للترقية من الدرجة الثانية (السلم 10) إلى الدرجة الأولى (السلم 11) ومن الدرجة الأولى إلى الدرجة الممتازة (خارج السلم).",
      requirements: [
        "استيفاء 6 سنوات من الخدمة الفعلية في الدرجة الحالية لاجتياز الامتحان المهني.",
        "أو استيفاء 10 سنوات للمشاركة في الترقية بالاختيار بنظام النقطة السنوية.",
        "احتساب نقطة التفتيش والملاحظة الإدارية للمدير الإقليمي.",
      ],
      modules: [
        "المجال البيداغوجي والديداكتيكي للدرجة المستهدفة.",
        "مستجدات نظام التربية والتكوين والقانون الإطار 51.17.",
        "هندسة التعلمات وتوظيف التكنولوجيا في التعليم والتواصل المهني.",
      ],
      usefulDocs: [
        { label: "الملف التراكمي الشامل", tab: "portfolio" as TabKey },
        { label: "البطاقة الشخصية للمدرس", tab: "card" as TabKey },
      ],
      externalUrl: PROFPRESS_LINKS.exams,
    },
    {
      id: "c5",
      title: "مباراة مركز التوجيه والتخطيط التربوي (COPE)",
      badge: "التوجيه والتخطيط",
      badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-200",
      description:
        "ولوج سلك تكوين المستشارين في التوجيه والتخطيط التربوي لمواكبة المشاريع الشخصية للمتعلمين وتوزيع الخريطة المدرسية.",
      requirements: [
        "أقدمية 4 سنوات على الأقل في التدريس والدرجة الثانية أو الأولى.",
        "معارف في الإحصاء المدرسي، علم النفس الفارقي، وسوسيولوجيا المهن.",
      ],
      modules: [
        "الإحصاء التطبيقي والديموغرافيا المدرسية وتخطيط البنيات التربوية.",
        "سيكولوجية المراهقة ونظريات الاختيار المهني وتقنيات المقابلة التوجيهية.",
      ],
      usefulDocs: [
        { label: "شبكات التقويم وملاحظات مسار", tab: "remarks" as TabKey },
      ],
      externalUrl: PROFPRESS_LINKS.orientation,
    },
  ];

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-blue-900/40 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
              دليل ومراجع المباريات المهنية
            </span>
            <span className="text-xs text-slate-300">CRMEF • CFIE • COPE • الإدارة • الكفاءة</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black font-cairo text-white">
            المباريات المهنية والترقية في قطاع التربية الوطنية
          </h2>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            دليل كامل لشروط الترشيح، الأطر المرجعية للاختبارات الكتابية والشفوية، ونماذج امتحانات مباريات التعليم، التفتيش، الإدارة التربوية، والتوجيه والتخطيط مع نصائح إعداد الوثائق.
          </p>
        </div>
      </div>

      {/* Competitions Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {competitions.map((comp) => (
          <div
            key={comp.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`text-[11px] font-bold px-3 py-0.5 rounded-lg border ${comp.badgeColor}`}
                >
                  {comp.badge}
                </span>
                <span className="text-slate-400 text-xs font-mono">قطاع التربية الوطنية</span>
              </div>

              <h3 className="font-black text-base md:text-lg text-slate-900 leading-snug">
                {comp.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {comp.description}
              </p>

              {/* Requirements & Modules */}
              <div className="space-y-2 pt-1 text-xs">
                <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 space-y-1.5">
                  <span className="font-bold text-slate-800 block text-[11px]">
                    شروط الترشيح الأساسية:
                  </span>
                  <ul className="space-y-1 text-slate-600">
                    {comp.requirements.map((r, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50/50 rounded-2xl p-3 border border-blue-100 space-y-1.5">
                  <span className="font-bold text-blue-950 block text-[11px]">
                    محاور الاختبارات والمواد:
                  </span>
                  <ul className="space-y-1 text-slate-700">
                    {comp.modules.map((m, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Useful pedagogical docs links */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
                <span className="text-slate-500 text-[11px] font-bold">
                  وثائق تفيدك في الاستعداد:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {comp.usefulDocs.map((doc, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => onNavigateToTab(doc.tab)}
                      className="bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-900 px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer"
                    >
                      {doc.label} ↗
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end">
                <a
                  href={comp.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-800 font-bold text-xs flex items-center gap-1 hover:underline"
                >
                  <span>أرشيف الامتحانات والنماذج المصححة على Profpress.net</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
