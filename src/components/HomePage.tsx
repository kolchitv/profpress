import React, { useState } from "react";
import {
  Sparkles,
  Search,
  Filter,
  ArrowRight,
  ChevronLeft,
  Calendar,
  Clock,
  FileText,
  ClipboardList,
  FolderKanban,
  UserCheck,
  Scroll,
  Table,
  CalendarRange,
  Award,
  MessageSquareQuote,
  Eye,
  Printer,
  Compass,
  GraduationCap,
  School,
  ShieldCheck,
  Zap,
  BookOpen,
  Edit3,
  CheckCircle2,
  Gamepad2,
  TrendingUp,
  Calculator,
  Mic,
  Languages,
  PenTool,
  CheckSquare,
  Wand2,
  QrCode,
  Palette,
  Hash,
  Share2,
  Download,
  X,
  ExternalLink,
  BookMarked,
  Layers,
  Baby,
  PhoneCall,
  Mail,
  MessageCircle,
} from "lucide-react";
import { TabKey, TeacherProfile } from "../types";

interface HomePageProps {
  teacherProfile: TeacherProfile;
  onNavigateToTab: (tab: TabKey) => void;
  onOpenPrintPreview: () => void;
  onOpenContactModal?: () => void;
}

// Official Profpress.net Direct Links Catalog for Full Integration
export const PROFPRESS_LINKS = {
  main: "https://www.profpress.net/",
  contact: "https://www.profpress.net/p/contact-us.html",
  news: "https://www.profpress.net/search/label/%D9%85%D8%B3%D8%AA%D8%AC%D8%AF%D8%A7%D8%AA",
  articles: "https://www.profpress.net/search/label/%D9%85%D9%82%D8%A7%D9%84%D8%A7%D8%AA%20%D8%AA%D8%B1%D8%A8%D9%88%D9%8A%D8%A9",
  recruitment: "https://www.profpress.net/search/label/%D9%85%D8%A8%D8%A7%D8%B1%D8%A7%D8%A9%20%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85",
  inspection: "https://www.profpress.net/search/label/%D9%85%D8%A8%D8%A7%D8%B1%D8%A7%D8%A9%20%D8%A7%D9%84%D8%AA%D9%81%D8%AA%D9%8A%D8%B4",
  orientation: "https://www.profpress.net/search/label/%D9%85%D8%A8%D8%A7%D8%B1%D8%A7%D8%A9%20%D8%A7%D9%84%D8%AA%D9%88%D8%AC%D9%8A%D9%87",
  license: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%B1%D8%AE%D8%B5%D8%A9%20%D8%A7%D9%84%D9%85%D9%87%D9%86%D9%8A%D8%A9",
  primary: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%A7%D8%A8%D8%AA%D8%AF%D8%A7%D8%A6%D9%8A",
  middle: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%A5%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A",
  high: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A",
  pioneers: "https://www.profpress.net/search/label/%D9%85%D8%AF%D8%A7%D8%B1%D8%B3%20%D8%B1%D8%A7%D8%A6%D8%AF%D8%A9",
  periodic: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D9%88%D8%A7%D8%B2%D9%8A%D8%B9%20%D8%A7%D9%84%D9%85%D8%B1%D8%AD%D9%84%D9%8A%D8%A9",
  annual: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D9%88%D8%A7%D8%B2%D9%8A%D8%B9%20%D8%A7%D9%84%D8%B3%D9%86%D9%88%D9%8A%D8%A9",
  explicitTeaching: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%B5%D8%B1%D9%8A%D8%AD",
  gpa: "https://www.profpress.net/search?q=%D8%AD%D8%B3%D8%A7%D8%A8+%D8%A7%D9%84%D9%85%D8%B9%D8%AF%D9%84+%D8%A7%D9%84%D8%B9%D8%A7%D9%85",
  lessonPlans: "https://www.profpress.net/search/label/%D8%AC%D8%B0%D8%A7%D8%B0%D8%A7%D8%AA",
  exams: "https://www.profpress.net/search/label/%D9%81%D8%B1%D9%88%D8%B6",
  smartToolsAll: "https://www.profpress.net/search?q=%D8%A3%D8%AF%D9%88%D8%A7%D8%AA+%D8%A7%D9%84%D9%85%D9%88%D9%82%D8%B9+%D8%A7%D9%84%D8%B0%D9%83%D9%8A%D8%A9",
  game: "https://www.profpress.net/search?q=%D9%84%D8%B9%D8%A8%D8%A9+%D8%A7%D9%84%D9%81%D8%B1%D9%86%D8%B3%D9%8A%D8%A9",
  promotion: "https://www.profpress.net/search?q=%D9%86%D9%82%D8%A7%D8%B7+%D8%A7%D9%84%D8%AA%D8%B1%D9%82%D9%8A%D8%A9",
  middleExam: "https://www.profpress.net/search?q=%D9%86%D9%82%D8%A7%D8%B7+%D8%A7%D9%84%D8%AB%D8%A7%D9%84%D8%AB%D8%A9+%D8%A5%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A",
  dictation: "https://www.profpress.net/search?q=%D8%A7%D9%84%D8%A5%D9%85%D9%84%D8%A7%D8%A1+%D8%A7%D9%84%D8%B0%D9%83%D9%8A",
  arabicConjugate: "https://www.profpress.net/search?q=%D8%AA%D8%B5%D8%B1%D9%8A%D9%81+%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A%D8%A9",
  frenchConjugate: "https://www.profpress.net/search?q=%D8%AA%D8%B5%D8%B1%D9%8A%D9%81+%D8%A7%D9%84%D9%81%D8%B1%D9%86%D8%B3%D9%8A%D8%A9",
  vocalization: "https://www.profpress.net/search?q=%D8%A7%D9%84%D8%AA%D8%B4%D9%83%D9%8A%D9%84+%D9%88%D8%A7%D9%84%D8%A5%D8%B9%D8%B1%D8%A7%D8%A8",
  remarksGen: "https://www.profpress.net/search?q=%D9%85%D9%88%D9%84%D8%AF+%D9%85%D9%84%D8%A7%D8%AD%D8%B8%D8%A7%D8%AA",
  textToImage: "https://www.profpress.net/search?q=%D8%A7%D9%84%D9%86%D8%B5+%D8%A5%D9%84%D9%89+%D8%B5%D9%88%D8%B1%D8%A9",
  dateConverter: "https://www.profpress.net/search?q=%D9%85%D8%AD%D9%88%D9%84+%D8%A7%D9%84%D8%AA%D8%A7%D8%B1%D9%8A%D8%AE",
  colorPicker: "https://www.profpress.net/search?q=%D9%85%D8%AD%D8%AF%D8%AF+%D8%A7%D9%84%D8%A3%D9%84%D9%88%D8%A7%D9%86",
  qrGen: "https://www.profpress.net/search?q=%D9%85%D9%88%D9%84%D8%AF+QR",
  smartTranslator: "https://www.profpress.net/search?q=%D8%A7%D9%84%D8%AA%D8%B1%D8%AC%D9%85%D8%A9+%D8%A7%D9%84%D8%B0%D9%83%D9%8A%D8%A9",
  numberConverter: "https://www.profpress.net/search?q=%D9%85%D8%AD%D9%88%D9%84+%D8%A7%D9%84%D8%A3%D8%B1%D9%82%D8%A7%D9%85",
  pdfToImages: "https://www.profpress.net/search?q=%D9%85%D8%AD%D9%88%D9%84+PDF+%D8%A5%D9%84%D9%89+%D8%B5%D9%88%D8%B1",
};

// Top Category Item Interface
interface PortalCategory {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconBg: string;
  borderHover: string;
  description: string;
  badge?: string;
  externalUrl: string;
  content: {
    subtitle: string;
    highlights: string[];
    tips: string;
    actionLabel?: string;
    targetTab?: TabKey;
  };
}

// Smart Tool Item Interface
interface SmartToolItem {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconBg: string;
  shortDesc: string;
  actionType: "modal" | "tab";
  targetTab?: TabKey;
  externalUrl: string;
}

export const HomePage: React.FC<HomePageProps> = ({
  teacherProfile,
  onNavigateToTab,
  onOpenPrintPreview,
  onOpenContactModal,
}) => {
  // Educational Cycle Filter: all, primary, middle, high
  const [selectedCycle, setSelectedCycle] = useState<"all" | "primary" | "middle" | "high">("primary");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal states
  const [activeCategoryModal, setActiveCategoryModal] = useState<PortalCategory | null>(null);
  const [activeSmartTool, setActiveSmartTool] = useState<string | null>(null);

  // Smart Tool interactive state:
  // 1. Date Converter
  const [gregorianDate, setGregorianDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [convertedHijri, setConvertedHijri] = useState("");

  // 2. Tafqit (Number to words)
  const [numberToConvert, setNumberToConvert] = useState<number | string>(18.5);

  // 3. QR Generator
  const [qrText, setQrText] = useState("https://massarservice.men.gov.ma");

  // 4. Color Palette copied
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  // 5. Promotion points calculator
  const [seniorityYears, setSeniorityYears] = useState(6);
  const [scaleYears, setScaleYears] = useState(4);
  const [performanceScore, setPerformanceScore] = useState(19);

  // 6. French vocabulary mini quiz
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizAnswerFeedback, setQuizAnswerFeedback] = useState<string | null>(null);

  // 7. Remarks generator preview
  const [selectedRemarkScore, setSelectedRemarkScore] = useState<"excellent" | "good" | "average" | "weak">("excellent");

  // Top Portal Categories (Matching Screenshot 1)
  const portalCategories: PortalCategory[] = [
    {
      id: "news",
      title: "مستجدات",
      icon: Zap,
      iconColor: "text-red-500",
      iconBg: "bg-red-50",
      borderHover: "hover:border-red-400",
      description: "المذكرات الوزارية والدخول المدرسي 2026/2027 ومؤسسات الريادة",
      badge: "عاجل",
      externalUrl: PROFPRESS_LINKS.news,
      content: {
        subtitle: "آخر مستجدات وزارة التربية الوطنية والتعليم الأولي والرياضة",
        highlights: [
          "توسيع شبكة «مؤسسات الريادة» لتشمل 2000 مؤسسة ابتدائية إضافية ومحطات الإعدادي الرائد.",
          "المقرر الوزاري لتنظيم السنة الدراسية 2026/2027 وبرمجة فترات الدعم المكثف TaRL.",
          "إطلاق منظومة مسار المحدثة مع شبكات التتبع الآلي للمسارات ومسطرة التصديق على اللبنات.",
        ],
        tips: "يُنصح الأساتذة بمراجعة تقرير ورشات الريادة ومطابقة المسارات المحددة في مسار لتفادي تعثرات البرمجة الزمنية.",
        actionLabel: "عرض تقرير ورشات الريادة",
        targetTab: "workshop_report",
      },
    },
    {
      id: "articles",
      title: "مقالات تربوية",
      icon: PenTool,
      iconColor: "text-orange-500",
      iconBg: "bg-orange-50",
      borderHover: "hover:border-orange-400",
      description: "ديداكتيك المواد، التعليم الصريح، والمقاربات البيداغوجية الحديثة",
      externalUrl: PROFPRESS_LINKS.articles,
      content: {
        subtitle: "مقالات ودراسات بيداغوجية تطبيقية للأستاذ",
        highlights: [
          "خطوات تطبيق «التعليم الصريح» (Enseignement explicite) في بناء التعلمات الرياضية والقرائية.",
          "استراتيجية معالجة التعثرات وفق مقاربة TaRL وتدبير فوارق التعلم داخل الفصل الواحد.",
          "هندسة الملف التراكمي للأستاذ وأثره في الترقية وتقويم الأداء المهني.",
        ],
        tips: "ركز على وثائق التدبير والتخطيط التراكمي لإبراز تطور الممارسات المهنية أثناء زيارات التفتيش.",
        actionLabel: "تصفح الملف التراكمي",
        targetTab: "portfolio",
      },
    },
    {
      id: "recruitment",
      title: "مباراة التعليم",
      icon: GraduationCap,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-50",
      borderHover: "hover:border-blue-400",
      description: "أطر مرجعية، ديداكتيك التخصص، ومواضيع الاختبارات الكتابية والشفوية",
      badge: "دورة 2026",
      externalUrl: PROFPRESS_LINKS.recruitment,
      content: {
        subtitle: "دليل ومراجع مباريات ولوج المراكز الجهوية لمهن التربية والتكوين (CRMEF)",
        highlights: [
          "الأطر المرجعية المحينة للاختبارات الكتابية (التخصص + الديداكتيك وعلوم التربية).",
          "شبكات تنقيط الاختبارات الشفوية ومهارات التقديم الصفي والمحاكاة الديداكتيكية.",
          "بنك أسئلة ونماذج امتحانات سابقة مصححة للابتدائي والتخصصات الثانوية.",
        ],
        tips: "خصص 60% من وقت المراجعة لديداكتيك المواد الثلاث الأساسية وتدبير وضعيات التقويم والدعم.",
      },
    },
    {
      id: "inspection",
      title: "مباراة التفتيش",
      icon: ShieldCheck,
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-50",
      borderHover: "hover:border-emerald-400",
      description: "مركز تكوين مفتشي التعليم (CFIE)، علوم التربية، والتشريع المدرسي",
      externalUrl: PROFPRESS_LINKS.inspection,
      content: {
        subtitle: "المسار المهني لولوج سلك التفتيش والتأطير والمراقبة التربوية",
        highlights: [
          "شروط الترشيح: توفر 6 سنوات أقدمية عامة والدرجة الأولى أو الثانية ومعدل تقارير التفتيش.",
          "محاور الامتحان: الاختبار في علم النفس التربوي، سوسيولوجيا التربية، المناهج، والديداكتيك.",
          "قراءة تحليلية في المذكرات المؤطرة لمهام هيئة التفتيش ومشروع المؤسسة المندمج.",
        ],
        tips: "اطّلع على شبكات تقويم الأستاذ وبطاقات المراقبة المستمرة كمرجع عملي في الديداكتيك.",
        actionLabel: "عرض شبكات المراقبة",
        targetTab: "grids",
      },
    },
    {
      id: "orientation",
      title: "مباراة التوجيه",
      icon: Compass,
      iconColor: "text-purple-500",
      iconBg: "bg-purple-50",
      borderHover: "hover:border-purple-400",
      description: "مركز التوجيه والتخطيط التربوي (COPE)، استشارات ومشروع التلميذ",
      externalUrl: PROFPRESS_LINKS.orientation,
      content: {
        subtitle: "دليل مباراة المستشارين في التوجيه والتخطيط التربوي",
        highlights: [
          "مستجدات التوجيه المدرسي والمهني ودور المدرس الرئيس في بلورة المشروع الشخصي للتلميذ.",
          "اختبارات الإحصاء التطبيقي، التخطيط الخرائطي، وسيكولوجية المراهق.",
          "نماذج دراسات حالة حول التعثر الدراسي والمسارات المهنية والتكنولوجية.",
        ],
        tips: "استعمل شبكات تفريغ النقط المتاحة في المنصة لتتبع دقيق لمنحنى تقدم المتعلمين.",
        actionLabel: "شبكات تفريغ النقط",
        targetTab: "grids",
      },
    },
    {
      id: "license",
      title: "الرخصة المهنية",
      icon: UserCheck,
      iconColor: "text-amber-500",
      iconBg: "bg-amber-50",
      borderHover: "hover:border-amber-400",
      description: "شهادة الكفاءة التربوية، الترسيم، والترقية بالامتحان المهني",
      externalUrl: PROFPRESS_LINKS.license,
      content: {
        subtitle: "ملف الكفاءة المهنية، الترسيم، وحساب نقط الأقدمية",
        highlights: [
          "ملف امتحان شهادة الكفاءة التربوية للأطر النظامية الجديدة ومكونات الحصة العملية.",
          "الوثائق الإلزامية التي يطلبها المفتش: بطاقة الأستاذ، استعمال الزمن، ميثاق القسم، والجذاذات.",
          "طريقة احتساب نقطة الترقية بالاختيار والامتحان المهني لولوج السلم 11 وخارج السلم.",
        ],
        tips: "تأكد من طباعة بطاقتك الشخصية واستعمال الزمن وميثاق القسم لتزيين وتوثيق حجرتك الدراسية.",
        actionLabel: "تجهيز البطاقة الشخصية",
        targetTab: "card",
      },
    },
  ];

  // Educational Cycles (Matching Screenshot 4)
  const educationalCycles = [
    {
      id: "primary" as const,
      title: "التعليم الابتدائي",
      subtitle: "المستويات 1 إلى 6 • مدارس الريادة و TaRL",
      icon: Baby,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
      badge: "نشط • الريادة",
      docCount: "9 وثائق معتمدة",
      externalUrl: PROFPRESS_LINKS.primary,
    },
    {
      id: "middle" as const,
      title: "التعليم الإعدادي",
      subtitle: "المستويات 1AC إلى 3AC • الإعداديات الرائدة والموحد",
      icon: School,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
      badge: "متوفر",
      docCount: "7 وثائق مسار",
      externalUrl: PROFPRESS_LINKS.middle,
    },
    {
      id: "high" as const,
      title: "التعليم الثانوي",
      subtitle: "الجذوع المشتركة، الأولى والثانية باكالوريا",
      icon: GraduationCap,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-50",
      badge: "تأهيلي",
      docCount: "6 نماذج جاهزة",
      externalUrl: PROFPRESS_LINKS.high,
    },
  ];

  // Documents & Generators List (Core platform offerings)
  const teacherDocuments = [
    {
      id: "workshop_report",
      tab: "workshop_report" as TabKey,
      title: "تقرير ورشات الريادة (3 صفحات A4)",
      category: "مؤسسات الريادة",
      cycle: ["primary", "middle"],
      badge: "جديد 3 صفحات",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      description:
        "تقرير أشغال اليوم الثاني من الورشات التذكيرية (الرياضيات، العربية، والفرنسية) مع جداول المسارات ومربعات المصادقة والتوقيعات الرسمية بدقة A4 عالية.",
      icon: ClipboardList,
      iconColor: "text-emerald-700",
      iconBg: "bg-emerald-50",
    },
    {
      id: "portfolio",
      tab: "portfolio" as TabKey,
      title: "الملف التراكمي للأستاذ (Portfolio)",
      category: "ملف الأستاذ",
      cycle: ["primary", "middle", "high"],
      badge: "الريادة المعتمد",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
      description:
        "هيكل منظم لجميع محطات التدريس: التخطيط السنوي والمرحلي، تقارير التقويم التشخيصي والدعم، شبكات التتبع، وسجلات الأنشطة والزيارات.",
      icon: FolderKanban,
      iconColor: "text-blue-700",
      iconBg: "bg-blue-50",
    },
    {
      id: "timetable",
      tab: "timetable" as TabKey,
      title: "استعمال الزمن الذكي (Emploi du temps)",
      category: "التنظيم التربوي",
      cycle: ["primary", "middle", "high"],
      badge: "جاهز للطباعة A4",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
      description:
        "مولد جداول الحصص الأسبوعية بنظام التفويج والدوامين وصيغ مؤسسات الريادة والتعليم العادي، مع تصدير عالي الدقة وتخصيص المواد.",
      icon: Calendar,
      iconColor: "text-amber-700",
      iconBg: "bg-amber-50",
    },
    {
      id: "card",
      tab: "card" as TabKey,
      title: "البطاقة الشخصية للأستاذ (Fiche de renseignement)",
      category: "الوثائق الإدارية",
      cycle: ["primary", "middle", "high"],
      badge: "رسمي",
      badgeColor: "bg-slate-100 text-slate-800 border-slate-300",
      description:
        "بطاقة المعلومات الشخصية والإدارية والمسار التكويني للأستاذ بتنسيق وزاري أنيق يتصدر ملف الوثائق التربوية بحجرتك الدراسية.",
      icon: UserCheck,
      iconColor: "text-indigo-700",
      iconBg: "bg-indigo-50",
    },
    {
      id: "charter",
      tab: "charter" as TabKey,
      title: "ميثاق جماعة الفصل (Charte de la classe)",
      category: "الحياة المدرسية",
      cycle: ["primary", "middle", "high"],
      badge: "ملصق فصلي",
      badgeColor: "bg-sky-100 text-sky-800 border-sky-300",
      description:
        "وثيقة ميثاق وقواعد السلوك المشترك لحجرة الدرس لترسيخ الاحترام وتكافؤ الفرص مع أماكن لتوقيعات التلاميذ وتأشيرة الإدارة.",
      icon: Scroll,
      iconColor: "text-sky-700",
      iconBg: "bg-sky-50",
    },
    {
      id: "covers",
      tab: "covers" as TabKey,
      title: "واجهات الملفات والسجلات الرسمية (Gardes)",
      category: "التوثيق والأرشفة",
      cycle: ["primary", "middle", "high"],
      badge: "12+ واجهة جاهزة",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
      description:
        "واجهات جذابة لسجلات الغياب، المراقبة المستمرة، جذاذات الدروس، المذكرات اليومية، وملفات الأنشطة الموازية بألوان الوزارة والريادة.",
      icon: FileText,
      iconColor: "text-purple-700",
      iconBg: "bg-purple-50",
    },
    {
      id: "grids",
      tab: "grids" as TabKey,
      title: "شبكات تفريغ نقط المراقبة ومسار",
      category: "التقويم والدعم",
      cycle: ["primary", "middle", "high"],
      badge: "متوافق مع Massar",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
      description:
        "تفريغ سريع لنقط فروض المراقبة المستمرة، حساب تلقائي للمعدلات الدورية، رصد نسب التحصيل، وتوليد إحصائيات بيداغوجية فورية.",
      icon: Table,
      iconColor: "text-rose-700",
      iconBg: "bg-rose-50",
    },
    {
      id: "certificates",
      tab: "certificates" as TabKey,
      title: "شواهد التقدير والتشجيع المدرسية",
      category: "التحفيز والتميز",
      cycle: ["primary", "middle"],
      badge: "توليد جماعي",
      badgeColor: "bg-teal-100 text-teal-800 border-teal-300",
      description:
        "توليد وطباعة شواهد التفوق والتشجيع لتلاميذ الفصل بأسماء التلاميذ ومستوياتهم وعبارات التشجيع بنقرة واحدة.",
      icon: Award,
      iconColor: "text-teal-700",
      iconBg: "bg-teal-50",
    },
    {
      id: "holidays",
      tab: "holidays" as TabKey,
      title: "لائحة العطل المدرسية الرسمية 2026/2027",
      category: "التنظيم التربوي",
      cycle: ["primary", "middle", "high"],
      badge: "الموسم 2026/2027",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
      description:
        "الجدول الرسمي الكامل للعطل البينية والوطنية والدينية مع عدد الأيام وتاريخ استئناف الدراسة الصادر عن الوزارة.",
      icon: CalendarRange,
      iconColor: "text-amber-700",
      iconBg: "bg-amber-50",
    },
    {
      id: "remarks",
      tab: "remarks" as TabKey,
      title: "المساعد البيداغوجي ومولد الملاحظات (AI)",
      category: "الذكاء الاصطناعي",
      cycle: ["primary", "middle", "high"],
      badge: "مدعوم بالذكاء الاصطناعي",
      badgeColor: "bg-violet-100 text-violet-800 border-violet-300",
      description:
        "توليد ملاحظات مسار دقيقة وموجهة لكل تلميذ حسب مستواه، وصياغة وضعيات تقويمية ودعم بيداغوجي حسب لبنات TaRL.",
      icon: MessageSquareQuote,
      iconColor: "text-violet-700",
      iconBg: "bg-violet-50",
    },
  ];

  // Smart Tools (Matching Screenshot 2 + Profpress.net)
  const smartTools: SmartToolItem[] = [
    {
      id: "game",
      title: "لعبة الفرنسية",
      icon: Gamepad2,
      iconColor: "text-amber-500",
      iconBg: "bg-amber-50",
      shortDesc: "تطبيق مسابقات تفاعلي للكلمات والتهجئة الفرنسية بالفصل",
      actionType: "modal",
      externalUrl: PROFPRESS_LINKS.game,
    },
    {
      id: "promotion",
      title: "نقاط الترقية",
      icon: TrendingUp,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-50",
      shortDesc: "حاسبة احتساب نقط الترقية بالاختيار والامتحان المهني للأستاذ",
      actionType: "modal",
      externalUrl: PROFPRESS_LINKS.promotion,
    },
    {
      id: "middle_exam",
      title: "نقاط الثالثة إعدادي",
      icon: Calculator,
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-50",
      shortDesc: "حساب معدل الموحد المحلي والجهوي والمراقبة المستمرة لمسار",
      actionType: "modal",
      externalUrl: PROFPRESS_LINKS.middleExam,
    },
    {
      id: "dictation",
      title: "الإملاء الذكي",
      icon: Mic,
      iconColor: "text-pink-500",
      iconBg: "bg-pink-50",
      shortDesc: "نصوص إملائية معيارية متدرجة حسب مستويات ومسارات الريادة",
      actionType: "modal",
      externalUrl: PROFPRESS_LINKS.dictation,
    },
    {
      id: "arabic_conjugate",
      title: "تصريف العربية",
      icon: BookOpen,
      iconColor: "text-purple-500",
      iconBg: "bg-purple-50",
      shortDesc: "جداول تصريف الأفعال الثلاثية والمعتلة في جميع الأزمنة والضمائر",
      actionType: "modal",
      externalUrl: PROFPRESS_LINKS.arabicConjugate,
    },
    {
      id: "french_conjugate",
      title: "تصريف الفرنسية",
      icon: Languages,
      iconColor: "text-teal-500",
      iconBg: "bg-teal-50",
      shortDesc: "Conjugaison des verbes usuels (présent, imparfait, futur, passé composé)",
      actionType: "modal",
      externalUrl: PROFPRESS_LINKS.frenchConjugate,
    },
    {
      id: "vocalization",
      title: "التشكيل والإعراب",
      icon: PenTool,
      iconColor: "text-fuchsia-500",
      iconBg: "bg-fuchsia-50",
      shortDesc: "ضبط أواخر الكلمات بالشكل التام وتفكيك الجمل لمساعد الأستاذ",
      actionType: "modal",
      externalUrl: PROFPRESS_LINKS.vocalization,
    },
    {
      id: "remarks_gen",
      title: "مولد ملاحظات",
      icon: CheckSquare,
      iconColor: "text-cyan-500",
      iconBg: "bg-cyan-50",
      shortDesc: "توليد فوري لملاحظات بيانات النقط ومسار بنقرة واحدة",
      actionType: "modal",
      externalUrl: PROFPRESS_LINKS.remarksGen,
    },
    {
      id: "text_to_image",
      title: "النص إلى صورة",
      icon: Wand2,
      iconColor: "text-rose-500",
      iconBg: "bg-rose-50",
      shortDesc: "توليد بطاقات الوسائل التعليمية والصور التوضيحية للدروس",
      actionType: "modal",
      externalUrl: PROFPRESS_LINKS.textToImage,
    },
    {
      id: "date_converter",
      title: "محول التاريخ",
      icon: Calendar,
      iconColor: "text-slate-600",
      iconBg: "bg-slate-100",
      shortDesc: "تحويل فوري بين التاريخ الهجري والميلادي مع التقويم المدرسي",
      actionType: "modal",
      externalUrl: PROFPRESS_LINKS.dateConverter,
    },
    {
      id: "color_picker",
      title: "محدد الألوان",
      icon: Palette,
      iconColor: "text-amber-500",
      iconBg: "bg-amber-50",
      shortDesc: "درجات ألوان الهوية البصرية الرسمية للوزارة والريادة ونسخها",
      actionType: "modal",
      externalUrl: PROFPRESS_LINKS.colorPicker,
    },
    {
      id: "qr_generator",
      title: "مولد QR",
      icon: QrCode,
      iconColor: "text-indigo-600",
      iconBg: "bg-indigo-50",
      shortDesc: "إنشاء رمز استجابة سريعة للدروس والملفات والمذكرات الرقمية",
      actionType: "modal",
      externalUrl: PROFPRESS_LINKS.qrGen,
    },
    {
      id: "smart_translator",
      title: "الترجمة الذكية",
      icon: Languages,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
      shortDesc: "معجم ديداكتيكي فوري للمصطلحات التربوية (عربية / فرنسية / إنجليزية)",
      actionType: "modal",
      externalUrl: PROFPRESS_LINKS.smartTranslator,
    },
    {
      id: "number_converter",
      title: "محول الأرقام",
      icon: Hash,
      iconColor: "text-violet-600",
      iconBg: "bg-violet-50",
      shortDesc: "تفقيط الأعداد وتحويل النقط والمبالغ إلى حروف عربية وفرنسية",
      actionType: "modal",
      externalUrl: PROFPRESS_LINKS.numberConverter,
    },
    {
      id: "pdf_to_images",
      title: "محول PDF إلى صور",
      icon: FileText,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
      shortDesc: "تحويل وثائق ومذكرات PDF إلى صور عالية الجودة للاستعمال الصفي",
      actionType: "modal",
      externalUrl: PROFPRESS_LINKS.pdfToImages,
    },
  ];

  // Most Read / Trending (Matching Screenshot 3)
  const trendingItems = [
    {
      id: "recruitment_prep",
      title: "مباراة التعليم",
      icon: Download,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
      subtext: "أطر مرجعية ودليل الاختبارات",
      externalUrl: PROFPRESS_LINKS.recruitment,
      action: () => {
        const cat = portalCategories.find((c) => c.id === "recruitment");
        if (cat) setActiveCategoryModal(cat);
      },
    },
    {
      id: "periodic_dist",
      title: "توليد التوازيع المرحلية",
      icon: CheckSquare,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
      subtext: "المراحل 1، 2، 3 و 4",
      externalUrl: PROFPRESS_LINKS.periodic,
      action: () => onNavigateToTab("portfolio"),
    },
    {
      id: "annual_dist",
      title: "توليد التوازيع السنوية",
      icon: Calendar,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-50",
      subtext: "التخطيط السنوي 2026/2027",
      externalUrl: PROFPRESS_LINKS.annual,
      action: () => onNavigateToTab("portfolio"),
    },
    {
      id: "explicit_teaching",
      title: "دروس التعليم الصريح",
      icon: GraduationCap,
      iconColor: "text-rose-600",
      iconBg: "bg-rose-50",
      subtext: "النمذجة، الممارسة الموجهة والمستقلة",
      externalUrl: PROFPRESS_LINKS.explicitTeaching,
      action: () => {
        const cat = portalCategories.find((c) => c.id === "articles");
        if (cat) setActiveCategoryModal(cat);
      },
    },
    {
      id: "gpa_calc",
      title: "حساب المعدل العام",
      icon: Calculator,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50",
      subtext: "معدلات المراقبة المستمرة ومسار",
      externalUrl: PROFPRESS_LINKS.gpa,
      action: () => setActiveSmartTool("middle_exam"),
    },
  ];

  // Filter documents by cycle and search query
  const filteredDocuments = teacherDocuments.filter((doc) => {
    const matchesCycle =
      selectedCycle === "all" || doc.cycle.includes(selectedCycle);
    const matchesSearch =
      searchQuery.trim() === "" ||
      doc.title.includes(searchQuery) ||
      doc.description.includes(searchQuery) ||
      doc.category.includes(searchQuery);
    return matchesCycle && matchesSearch;
  });

  // Tafqit Helper (Number to Arabic words)
  const getTafqitArabic = (num: number): string => {
    const rounded = Math.round(num * 100) / 100;
    const whole = Math.floor(rounded);
    const fraction = Math.round((rounded - whole) * 100);

    const arabicOnes = [
      "صفر",
      "واحد",
      "اثنان",
      "ثلاثة",
      "أربعة",
      "خمسة",
      "ستة",
      "سبعة",
      "ثمانية",
      "تسعة",
      "عشرة",
      "أحد عشر",
      "اثنا عشر",
      "ثلاثة عشر",
      "أربعة عشر",
      "خمسة عشر",
      "ستة عشر",
      "سبعة عشر",
      "ثمانية عشر",
      "تسعة عشر",
      "عشرون",
    ];

    let result = "";
    if (whole <= 20) {
      result = arabicOnes[whole] || whole.toString();
    } else {
      result = `${whole} من عشرين`;
    }

    if (fraction > 0) {
      result += ` وفاصلة ${arabicOnes[Math.min(fraction, 20)] || fraction}`;
    }
    return result;
  };

  // Convert Gregorian to approximate Moroccan Hijri
  const calculateHijriDate = (gDateStr: string) => {
    try {
      const d = new Date(gDateStr);
      if (isNaN(d.getTime())) return "تاريخ غير صالح";
      // Using standard Intl.DateTimeFormat for Islamic Um Al-Qura calendar
      const hijriFormatter = new Intl.DateTimeFormat("ar-MA-u-ca-islamic-umalqura", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      return hijriFormatter.format(d);
    } catch {
      return "1448 هـ";
    }
  };

  // Official color codes for palette
  const officialColors = [
    { name: "أخضر الريادة الأصلي", hex: "#145350", role: "الهوية البصرية لمؤسسات الريادة" },
    { name: "أزرق الوزارة الرسمي", hex: "#1e3a8a", role: "ترويسة وزارة التربية الوطنية" },
    { name: "أصفر ذهبي للتتويج", hex: "#f59e0b", role: "شواهد التقدير والتميز" },
    { name: "أحمر مغربي وطني", hex: "#dc2626", role: "العطل والأعياد الوطنية" },
    { name: "زمردي فاتح للدروس", hex: "#10b981", role: "أنشطة الرياضيات والحساب الذهني" },
    { name: "سماوي تربوي", hex: "#0284c7", role: "أنشطة اللغة الفرنسية" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ========================================================================= */}
      {/* 0. INTEGRATION BANNER: الربط المباشر والدمج الكامل مع موقع Profpress.net */}
      {/* ========================================================================= */}
      <section className="no-print bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 rounded-2xl p-4 sm:p-5 text-white shadow-xs border border-blue-800/80">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                <ExternalLink className="w-3 h-3" />
                <span>الدمج الرسمي • Profpress.net</span>
              </span>
              <span className="text-blue-300 text-xs font-semibold">بوابة الدمج الموحدة للأستاذ المغربي</span>
            </div>
            <h1 className="text-base sm:text-lg font-black font-cairo text-white">
              منظومة إعداد وطباعة الوثائق مع موارد ومقالات موقع بروف بريس
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              تم ربط كافة أقسام وتصنيفات موقع <strong className="text-amber-300">Profpress.net</strong> لتتيح لك تصفح المستجدات الوزارية، بنك الجذاذات، وفروض المراقبة، بالتزامن مع إمكانية تحرير وتوليد وطباعة الوثائق الرسمية وسجلات الريادة بصيغة A4.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <a
              href={PROFPRESS_LINKS.main}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition shadow-xs flex items-center gap-1.5"
            >
              <ExternalLink className="w-4 h-4" />
              <span>زيارة الموقع الأصلي ↗</span>
            </a>
            <a
              href={PROFPRESS_LINKS.lessonPlans}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold px-3 py-2 rounded-xl text-xs transition flex items-center gap-1"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-300" />
              <span>بنك الجذاذات</span>
            </a>
            <a
              href={PROFPRESS_LINKS.exams}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold px-3 py-2 rounded-xl text-xs transition flex items-center gap-1"
            >
              <Table className="w-3.5 h-3.5 text-emerald-300" />
              <span>فروض وامتحانات</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 1. TOP PORTAL CATEGORIES (مستجدات، مقالات، مباراة التعليم... - مثل الصورة 1) */}
      {/* ========================================================================= */}
      <section className="no-print">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
            <h2 className="text-sm md:text-base font-black text-slate-900 font-cairo">
              أقسام وبوابات الأستاذ المهنية
            </h2>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            روابط سريعة لأهم محطات المنظومة التربوية
          </span>
        </div>

        {/* 6 Responsive Rounded Cards Bar matching Screenshot 1 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {portalCategories.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveCategoryModal(item)}
                className={`bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all duration-200 text-center flex flex-col items-center justify-center gap-2.5 group cursor-pointer relative overflow-hidden border-b-4 ${item.borderHover}`}
              >
                {item.badge && (
                  <span className="absolute top-2 left-2 text-[9px] font-black bg-rose-500 text-white px-1.5 py-0.5 rounded-full shadow-2xs">
                    {item.badge}
                  </span>
                )}
                <div
                  className={`w-12 h-12 rounded-full ${item.iconBg} ${item.iconColor} flex items-center justify-center transition-transform group-hover:scale-110 shadow-2xs`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs md:text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors font-cairo">
                  {item.title}
                </span>
                <span className="text-[10px] text-slate-400 group-hover:text-blue-600 flex items-center gap-0.5 mt-[-4px]">
                  <span>تصفح</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. EDUCATIONAL CYCLES SELECTOR (الابتدائي، الإعدادي، الثانوي - مثل الصورة 4) */}
      {/* ========================================================================= */}
      <section className="no-print">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2">
              <School className="w-4 h-4 text-blue-700" />
              <h3 className="text-sm font-black text-slate-900 font-cairo">
                اختر سلك التدريس لعرض الوثائق المناسبة لمستواك:
              </h3>
            </div>
            <div className="text-xs text-slate-500 font-medium">
              تصفية فورية لجميع الوثائق والسجلات أسفله
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {educationalCycles.map((cycle) => {
              const Icon = cycle.icon;
              const isSelected = selectedCycle === cycle.id;
              return (
                <button
                  key={cycle.id}
                  type="button"
                  onClick={() => setSelectedCycle(cycle.id)}
                  className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-3.5 text-right cursor-pointer group ${
                    isSelected
                      ? "bg-blue-50/70 border-blue-600 shadow-sm ring-2 ring-blue-500/20"
                      : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl ${cycle.iconBg} ${cycle.iconColor} flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-slate-900 font-cairo block truncate">
                        {cycle.title}
                      </span>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500 block truncate mt-0.5">
                      {cycle.subtitle}
                    </span>
                    <div className="flex items-center justify-between gap-2 mt-1">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                        {cycle.docCount}
                      </span>
                      <a
                        href={cycle.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[10px] text-blue-700 hover:text-blue-900 font-bold flex items-center gap-0.5 hover:underline"
                        title="تصفح مواد هذا السلك على Profpress.net"
                      >
                        <span>محتوى Profpress</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CORE TEACHER DOCUMENTS & GENERATORS (وثائق الأستاذ المتاحة في المنصة) */}
      {/* ========================================================================= */}
      <section className="no-print space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-900 text-white flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <h2 className="text-base md:text-lg font-black text-slate-900 font-cairo">
                وثائق وسجلات الأستاذ المعتمدة (توليد، تعديل، وطباعة A4)
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              اختر أي وثيقة لبدء تحرير بياناتك وتصديرها بصيغة A4 مطابقة للدفتر الوزاري ولمؤسسات الريادة
            </p>
          </div>

          {/* Quick Search & Cycle reset */}
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن وثيقة، استعمال زمن، ميثاق..."
                className="w-full bg-white border border-slate-300 rounded-xl pr-9 pl-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
            </div>

            {selectedCycle !== "all" && (
              <button
                type="button"
                onClick={() => setSelectedCycle("all")}
                className="px-2.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer shrink-0"
              >
                عرض الكل
              </button>
            )}
          </div>
        </div>

        {/* Documents Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map((doc) => {
            const Icon = doc.icon;
            return (
              <div
                key={doc.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group hover:border-blue-400 relative"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div
                      className={`w-11 h-11 rounded-xl ${doc.iconBg} ${doc.iconColor} flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full border shadow-2xs ${doc.badgeColor}`}
                    >
                      {doc.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-slate-900 group-hover:text-blue-900 transition-colors font-cairo mb-1.5">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed text-justify mb-4">
                    {doc.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-500 font-medium">
                    {doc.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => onNavigateToTab(doc.tab)}
                    className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs group-hover:bg-blue-700"
                  >
                    <span>فتح وتعديل</span>
                    <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. TWO COLUMNS: SMART TOOLS (الصورة 2) & MOST READ / TRENDING (الصورة 3) */}
      {/* ========================================================================= */}
      <section className="no-print grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Right 2-Columns: أدوات الموقع الذكية (Matching Screenshot 2) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-rose-500 text-lg">✏️</span>
              <h3 className="text-base font-black text-slate-900 font-cairo">
                أدوات الموقع الذكية (15 أداة تفاعلية)
              </h3>
            </div>
            <a
              href={PROFPRESS_LINKS.smartToolsAll}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 hover:underline"
              title="تصفح جميع الأدوات على Profpress.net"
            >
              <span>فتح الأدوات على Profpress.net</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 15 Smart Tools Grid in 2 Columns matching Screenshot 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {smartTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.id}
                  onClick={() => setActiveSmartTool(tool.id)}
                  className="bg-slate-50/80 hover:bg-blue-50/50 border border-slate-200/90 hover:border-blue-300 rounded-xl p-3.5 flex items-center justify-between transition-all cursor-pointer group text-right"
                >
                  <div className="space-y-0.5 flex-1 min-w-0 pr-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black text-slate-900 group-hover:text-blue-900 block font-cairo truncate">
                        {tool.title}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 block line-clamp-1">
                      {tool.shortDesc}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 mr-2">
                    <a
                      href={tool.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      title={`فتح ${tool.title} على Profpress.net`}
                      className="text-slate-400 hover:text-blue-700 hover:bg-white p-1 rounded-md transition"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <div
                      className={`w-9 h-9 rounded-xl ${tool.iconBg} ${tool.iconColor} flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Left 1-Column: الأكثر قراءة وطلباً (Matching Screenshot 3) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-red-500 text-lg">🔥</span>
                <h3 className="text-base font-black text-slate-900 font-cairo">
                  الأكثر قراءة وطلباً
                </h3>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">من بروف بريس</span>
            </div>

            {/* List of cards matching Screenshot 3 */}
            <div className="space-y-2.5">
              {trendingItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={item.action}
                    className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl p-3 flex items-center justify-between transition cursor-pointer group text-right"
                  >
                    <div className="flex items-center gap-1.5 shrink-0">
                      <ChevronLeft className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:-translate-x-1" />
                      <a
                        href={item.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        title="فتح في Profpress.net"
                        className="text-slate-400 hover:text-blue-700 hover:bg-white p-1 rounded-md transition"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <div className="flex-1 px-2 min-w-0">
                      <span className="text-xs font-black text-slate-900 group-hover:text-blue-900 block font-cairo truncate">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-slate-500 block truncate">
                        {item.subtext}
                      </span>
                    </div>
                    <div
                      className={`w-9 h-9 rounded-xl ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0 shadow-2xs mr-1`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Print Preview Promo Card */}
          <div className="bg-gradient-to-br from-blue-950 to-indigo-950 text-white rounded-xl p-4 space-y-2 shadow-xs border border-blue-900 mt-4">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
              <Printer className="w-4 h-4" />
              <span>معاينة وطباعة الوثائق A4</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              تحكم في درجات جودة الطباعة ومطابقة الألوان المغربية الرسمية وحفظ الحبر قبل إرسال الوثائق للطابعة.
            </p>
            <button
              type="button"
              onClick={onOpenPrintPreview}
              className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black py-2 rounded-lg text-xs transition cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>فتح مركز المعاينة والطباعة</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CONTACT & FEEDBACK SECTION (اتصل بنا من أجل ملاحظات أو أسئلة - Profpress.net) */}
      {/* ========================================================================= */}
      <section className="no-print bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 rounded-2xl p-5 text-white shadow-sm border border-slate-800">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div className="flex items-center gap-3.5 max-w-2xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-md">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                  تواصل مباشر مع إدارة بروف بريس
                </span>
                <span className="text-blue-300 text-xs font-mono">0707983967 • kolchitv@gmail.com</span>
              </div>
              <h3 className="text-base sm:text-lg font-black font-cairo text-white">
                هل لديك ملاحظات أو أسئلة أو اقتراحات لتطوير وثائق المنصة؟
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                يسعد فريق موقع <strong className="text-amber-300">Profpress.net</strong> بتلقي كافة استفساراتكم وملاحظاتكم التربوية والتقنية والتواصل معكم فورياً عبر الواتساب أو البريد.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0 w-full lg:w-auto justify-start lg:justify-end">
            <button
              type="button"
              onClick={onOpenContactModal}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-4 py-2.5 rounded-xl text-xs transition shadow-xs flex items-center gap-1.5 cursor-pointer border border-emerald-400/50"
            >
              <PhoneCall className="w-4 h-4 text-amber-300" />
              <span>اتصل بنا الآن</span>
            </button>
            <a
              href="https://wa.me/212707983967"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-700/80 hover:bg-emerald-600 text-white border border-emerald-500/50 font-bold px-3.5 py-2.5 rounded-xl text-xs transition flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 text-emerald-300" />
              <span>واتساب (0707983967)</span>
            </a>
            <a
              href={PROFPRESS_LINKS.contact}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-3.5 py-2.5 rounded-xl text-xs transition flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-300" />
              <span>صفحة الاتصال بالموقع ↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CATEGORY DETAILS MODAL (مستجدات، مباريات، رخصة مهنية...) */}
      {/* ========================================================================= */}
      {activeCategoryModal && (
        <div className="no-print fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl ${activeCategoryModal.iconBg} ${activeCategoryModal.iconColor} flex items-center justify-center`}
                >
                  <activeCategoryModal.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 font-cairo">
                    {activeCategoryModal.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {activeCategoryModal.description}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveCategoryModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <h4 className="font-bold text-slate-800 text-sm">
                {activeCategoryModal.content.subtitle}
              </h4>
              <div className="bg-slate-50 rounded-xl p-3 space-y-2 border border-slate-200">
                <span className="font-bold text-slate-700 block">أهم النقاط والإجراءات:</span>
                <ul className="space-y-1.5 text-slate-600">
                  {activeCategoryModal.content.highlights.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-50 border-r-4 border-amber-500 rounded-lg p-3 text-amber-950">
                <span className="font-bold block mb-0.5">توجيه بيداغوجي ومهني:</span>
                <p className="leading-relaxed text-slate-700">
                  {activeCategoryModal.content.tips}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <a
                href={activeCategoryModal.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-black cursor-pointer transition shadow-xs flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>تصفح مقالات هذا القسم على Profpress.net ↗</span>
              </a>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveCategoryModal(null)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  إغلاق
                </button>
                {activeCategoryModal.content.targetTab && (
                  <button
                    type="button"
                    onClick={() => {
                      if (activeCategoryModal.content.targetTab) {
                        onNavigateToTab(activeCategoryModal.content.targetTab);
                      }
                      setActiveCategoryModal(null);
                    }}
                    className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold cursor-pointer transition shadow-xs flex items-center gap-1.5"
                  >
                    <span>{activeCategoryModal.content.actionLabel || "الانتقال للوثيقة"}</span>
                    <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* INTERACTIVE SMART TOOLS MODALS (محول التاريخ، الأرقام، QR، الترقية...) */}
      {/* ========================================================================= */}
      {activeSmartTool && (
        <div className="no-print fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">🛠️</span>
                <h3 className="text-base font-black text-slate-900 font-cairo">
                  {smartTools.find((t) => t.id === activeSmartTool)?.title || "أداة ذكية"}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                {smartTools.find((t) => t.id === activeSmartTool)?.externalUrl && (
                  <a
                    href={smartTools.find((t) => t.id === activeSmartTool)?.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 transition shadow-2xs"
                    title="فتح هذه الأداة في موقع بروف بريس"
                  >
                    <span>فتح في Profpress</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                <button
                  onClick={() => setActiveSmartTool(null)}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tool 1: Date Converter */}
            {activeSmartTool === "date_converter" && (
              <div className="space-y-4 text-xs">
                <p className="text-slate-600">
                  أداة ضبط وتأريخ الجذاذات والمذكرات الرسمية وفق التقويمين الهجري والميلادي المعتمدين في المغرب:
                </p>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">حدد التاريخ الميلادي:</label>
                  <input
                    type="date"
                    value={gregorianDate}
                    onChange={(e) => setGregorianDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-sans text-sm"
                  />
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center space-y-1">
                  <span className="text-slate-500 block text-[11px] font-bold">التاريخ الهجري المقابل:</span>
                  <span className="text-base font-black text-blue-950 font-cairo block">
                    {calculateHijriDate(gregorianDate)}
                  </span>
                </div>
              </div>
            )}

            {/* Tool 2: Number Converter (Tafqit) */}
            {activeSmartTool === "number_converter" && (
              <div className="space-y-4 text-xs">
                <p className="text-slate-600">
                  تفقيط الأعداد والنقط إلى حروف عربية بالكامل لشواهد التقدير وبيانات النقط:
                </p>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">أدخل العدد أو النقطة (مثال: 18.5):</label>
                  <input
                    type="number"
                    step="0.25"
                    min="0"
                    max="20"
                    value={numberToConvert}
                    onChange={(e) => setNumberToConvert(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold text-base"
                  />
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center space-y-1">
                  <span className="text-slate-500 block text-[11px] font-bold">كتابة العدد بالحروف العربية:</span>
                  <span className="text-base font-black text-purple-950 font-cairo block">
                    {getTafqitArabic(Number(numberToConvert))}
                  </span>
                </div>
              </div>
            )}

            {/* Tool 3: QR Code Generator */}
            {activeSmartTool === "qr_generator" && (
              <div className="space-y-4 text-xs">
                <p className="text-slate-600">
                  أنشئ رمز QR للدروس الرقمية أو موقع المؤسسة وألصقه مباشرة في جذاذاتك وأوراق عملك:
                </p>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">الرابط أو النص المطلوب تحويله:</label>
                  <input
                    type="text"
                    value={qrText}
                    onChange={(e) => setQrText(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-sans"
                    placeholder="https://..."
                  />
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                      qrText || "Profpress"
                    )}`}
                    alt="QR Code"
                    className="w-44 h-44 rounded-lg bg-white p-2 border border-slate-300 shadow-xs"
                  />
                  <span className="text-[10px] text-slate-500 mt-2">
                    انقر بزر الفأرة الأيمن لنسخ الصورة أو حفظها للطباعة
                  </span>
                </div>
              </div>
            )}

            {/* Tool 4: Color Picker (Palette) */}
            {activeSmartTool === "color_picker" && (
              <div className="space-y-4 text-xs">
                <p className="text-slate-600">
                  درجات الألوان الرسمية المعتمدة لوزارة التربية الوطنية ومؤسسات الريادة:
                </p>
                <div className="space-y-2">
                  {officialColors.map((c) => (
                    <div
                      key={c.hex}
                      className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg shadow-2xs border border-black/10 shrink-0"
                          style={{ backgroundColor: c.hex }}
                        />
                        <div>
                          <span className="font-bold text-slate-900 block">{c.name}</span>
                          <span className="text-[10px] text-slate-500">{c.role}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard?.writeText(c.hex);
                          setCopiedColor(c.hex);
                          setTimeout(() => setCopiedColor(null), 1500);
                        }}
                        className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-xs font-mono font-bold cursor-pointer transition"
                      >
                        {copiedColor === c.hex ? "تم النسخ!" : c.hex}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tool 5: Promotion Calculator */}
            {activeSmartTool === "promotion" && (
              <div className="space-y-4 text-xs">
                <p className="text-slate-600">
                  حاسبة تقديرية لنقط الترقية بالاختيار لأساتذة التعليم الابتدائي والثانوي:
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">سنوات الأقدمية في السلم:</label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={scaleYears}
                      onChange={(e) => setScaleYears(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">سنوات الأقدمية العامة:</label>
                    <input
                      type="number"
                      min="1"
                      max="40"
                      value={seniorityYears}
                      onChange={(e) => setSeniorityYears(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">نقطة التفتيش / الأداء المهني (على 20):</label>
                  <input
                    type="number"
                    min="10"
                    max="20"
                    step="0.5"
                    value={performanceScore}
                    onChange={(e) => setPerformanceScore(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold"
                  />
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                  <span className="text-slate-500 block text-[11px] font-bold">مجموع النقاط التقديرية للترقية:</span>
                  <span className="text-xl font-black text-blue-900 font-mono">
                    {(scaleYears * 2 + seniorityYears * 1 + performanceScore).toFixed(1)} نقطة
                  </span>
                </div>
              </div>
            )}

            {/* Tool 6: French Mini Game */}
            {activeSmartTool === "game" && (
              <div className="space-y-4 text-xs font-sans text-left" dir="ltr">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-slate-800">
                  <p className="font-bold text-amber-900">Jeu pédagogique : Le bon mot en classe</p>
                  <p className="text-[11px] text-slate-600">Choisissez la bonne orthographe pour les apprenants :</p>
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-sm text-slate-900">
                    Complétez la phrase : « Les élèves écrivent sur le ...... »
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {["tableau", "tablo", "tableu", "tableaux"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          if (opt === "tableau") {
                            setQuizAnswerFeedback("Bravo ! Réponse correcte (+10 pts)");
                            setQuizScore((s) => s + 10);
                          } else {
                            setQuizAnswerFeedback("Incorrect, essayez encore !");
                          }
                        }}
                        className="bg-slate-100 hover:bg-blue-100 border border-slate-300 rounded-lg p-2.5 font-bold text-center cursor-pointer transition"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {quizAnswerFeedback && (
                    <div className="p-2 rounded bg-emerald-100 text-emerald-900 text-center font-bold text-xs mt-2">
                      {quizAnswerFeedback} • Score : {quizScore}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tool 7: Remarks Generator Quick Tool */}
            {activeSmartTool === "remarks_gen" && (
              <div className="space-y-4 text-xs">
                <p className="text-slate-600">اختر مستوى التحصيل لتوليد ملاحظة دقيقة متوافقة مع منظومة مسار:</p>
                <div className="grid grid-cols-4 gap-2">
                  {(
                    [
                      { key: "excellent", label: "ممتاز", color: "bg-emerald-600 text-white" },
                      { key: "good", label: "جيد", color: "bg-blue-600 text-white" },
                      { key: "average", label: "متوسط", color: "bg-amber-600 text-white" },
                      { key: "weak", label: "في حاجة لدعم", color: "bg-rose-600 text-white" },
                    ] as const
                  ).map((lvl) => (
                    <button
                      key={lvl.key}
                      type="button"
                      onClick={() => setSelectedRemarkScore(lvl.key)}
                      className={`p-2 rounded-lg font-bold text-xs cursor-pointer transition ${
                        selectedRemarkScore === lvl.key ? lvl.color : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>

                <div className="bg-slate-50 border border-slate-300 rounded-xl p-3.5 space-y-2">
                  <span className="font-bold text-slate-800 block">نموذج الملاحظة المقترحة لمسار:</span>
                  <p className="text-sm font-medium text-slate-800 leading-relaxed font-cairo">
                    {selectedRemarkScore === "excellent" &&
                      "عمل متميز، ومشاركة صفية واعية، استمر في هذا العطاء والاجتهاد."}
                    {selectedRemarkScore === "good" &&
                      "نتائج مشجعة، قادر على تحقيق الأفضل بالمزيد من التركيز والمواظبة."}
                    {selectedRemarkScore === "average" &&
                      "مستوى مقبول، يحتاج لمزيد من المراجعة المنزلية وتكثيف التمارين الداعمة."}
                    {selectedRemarkScore === "weak" &&
                      "تعثرات في اكتساب التعلمات الأساسية، يستدعي معالجة فورية ومتابعة أسرية حثيثة."}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onNavigateToTab("remarks");
                      setActiveSmartTool(null);
                    }}
                    className="text-blue-700 font-bold hover:underline block pt-1"
                  >
                    فتح المساعد البيداغوجي بالذكاء الاصطناعي للتوليد الشامل ←
                  </button>
                </div>
              </div>
            )}

            {/* Tool 8: PDF to Images */}
            {activeSmartTool === "pdf_to_images" && (
              <div className="space-y-4 text-xs">
                <p className="text-slate-600">
                  محول ملفات PDF البيداغوجية إلى صور عالية الوضوح لاستخدامها في العروض الصفيّة والوسائل التعليمية وجذاذات الريادة:
                </p>
                <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-xl p-6 text-center space-y-2 bg-slate-50 transition">
                  <FileText className="w-8 h-8 text-emerald-600 mx-auto" />
                  <p className="font-bold text-slate-800">اسحب وأفلت ملف PDF هنا أو انقر للاختيار</p>
                  <p className="text-[11px] text-slate-500">يدعم المذكرات، الجذاذات، كراسات التلميذ وملفات الفروض</p>
                  <input
                    type="file"
                    accept=".pdf"
                    className="block w-full text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 cursor-pointer pt-2"
                  />
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-emerald-950 flex flex-wrap items-center justify-between gap-2">
                  <span className="font-medium">أداة معتمدة ومتزامنة مع بروف بريس</span>
                  <a
                    href={PROFPRESS_LINKS.pdfToImages}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-800 hover:underline flex items-center gap-1"
                  >
                    <span>فتح محول PDF على Profpress.net ↗</span>
                  </a>
                </div>
              </div>
            )}

            {/* Other Tools Placeholder info */}
            {!["date_converter", "number_converter", "qr_generator", "color_picker", "promotion", "game", "remarks_gen", "pdf_to_images"].includes(
              activeSmartTool
            ) && (
              <div className="space-y-3 text-xs">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-slate-800 space-y-2">
                  <p className="font-bold text-blue-900">
                    أداة {smartTools.find((t) => t.id === activeSmartTool)?.title}
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    {smartTools.find((t) => t.id === activeSmartTool)?.shortDesc}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    يمكنك الوصول إلى الأدوات المتخصصة والملاحظات التلقائية عبر قسم «المساعد البيداغوجي ومولد الملاحظات».
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onNavigateToTab("remarks");
                      setActiveSmartTool(null);
                    }}
                    className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 rounded-xl transition cursor-pointer text-center"
                  >
                    فتح المساعد البيداغوجي الذكي
                  </button>
                  {smartTools.find((t) => t.id === activeSmartTool)?.externalUrl && (
                    <a
                      href={smartTools.find((t) => t.id === activeSmartTool)?.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold py-2 rounded-xl transition text-center shadow-xs flex items-center justify-center gap-1"
                    >
                      <span>تشغيل الأداة على Profpress.net</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
              {smartTools.find((t) => t.id === activeSmartTool)?.externalUrl ? (
                <a
                  href={smartTools.find((t) => t.id === activeSmartTool)?.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-800 hover:text-blue-950 font-bold flex items-center gap-1 hover:underline"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                  <span>تصفح الأداة والشرح على Profpress.net ↗</span>
                </a>
              ) : (
                <div />
              )}
              <button
                type="button"
                onClick={() => setActiveSmartTool(null)}
                className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 rounded-lg font-bold text-xs cursor-pointer"
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
