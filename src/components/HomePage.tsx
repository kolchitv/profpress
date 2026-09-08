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
import { SmartToolsModal } from "./SmartToolsModal";
import { HolidayReminderBanner } from "./HolidayReminderBanner";
import { EducationalCyclesAccordion } from "./EducationalCyclesAccordion";

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
  borderBottomColor: string;
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
      borderBottomColor: "border-b-red-500",
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
      borderBottomColor: "border-b-orange-500",
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
      borderBottomColor: "border-b-blue-600",
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
      borderBottomColor: "border-b-emerald-600",
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
      borderBottomColor: "border-b-purple-600",
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
      borderBottomColor: "border-b-amber-400",
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
            <button
              type="button"
              onClick={() => onNavigateToTab("contact")}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>صفحة الاتصال والملاحظات</span>
            </button>
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
      {/* 1. TOP PORTAL CATEGORIES (مستجدات، مقالات، مباراة التعليم... - مثل الصورة 4) */}
      {/* ========================================================================= */}
      <section className="no-print">
        {/* 6 Responsive Rounded Cards Bar matching Screenshot 4 with solid colored bottom borders */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {portalCategories.map((item) => {
            const Icon = item.icon;
            const isInternalTab = item.id === "news" || item.id === "articles";

            if (isInternalTab) {
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigateToTab(item.id as TabKey)}
                  className={`bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs hover:shadow-md transition-all duration-200 text-center flex flex-col items-center justify-center gap-2.5 group cursor-pointer relative overflow-hidden border-b-4 ${item.borderBottomColor}`}
                  title={`تصفح صفحة ${item.title} مع المحرر الداخلي ومساعد السيو Rank Math`}
                >
                  <div
                    className={`w-13 h-13 rounded-full ${item.iconBg} ${item.iconColor} flex items-center justify-center transition-transform group-hover:scale-110 shadow-2xs`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs md:text-sm font-bold text-slate-800 group-hover:text-blue-900 transition-colors font-cairo flex items-center justify-center gap-1.5">
                    <span>{item.title}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" title="داخلي" />
                  </span>
                </button>
              );
            }

            return (
              <a
                key={item.id}
                href={item.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs hover:shadow-md transition-all duration-200 text-center flex flex-col items-center justify-center gap-2.5 group cursor-pointer relative overflow-hidden border-b-4 ${item.borderBottomColor}`}
                title={`فتح قسم ${item.title} على موقع Profpress.net`}
              >
                <div
                  className={`w-13 h-13 rounded-full ${item.iconBg} ${item.iconColor} flex items-center justify-center transition-transform group-hover:scale-110 shadow-2xs`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs md:text-sm font-bold text-slate-800 group-hover:text-blue-900 transition-colors font-cairo">
                  {item.title}
                </span>
              </a>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. EDUCATIONAL CYCLES & BRANCHES (شجرة الأسلاك والأقسام التعليمية - التصميم الأفقي الشامل) */}
      {/* ========================================================================= */}
      <section className="no-print space-y-4">
        {/* Full-Width Horizontal Tree */}
        <EducationalCyclesAccordion
          onNavigateToTab={onNavigateToTab}
          initialMode="tree"
          defaultExpandedAll={true}
        />

        {/* Quick Highlights & Overview Strip below the horizontal tree */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* Main Showcase Banner */}
          <div className="lg:col-span-8 bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-5 shadow-md relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="bg-amber-400 text-slate-950 text-xs px-2.5 py-0.5 rounded-full font-black">
                  دليل المستويات الدراسية 2026/2027
                </span>
                <span className="bg-white/15 text-slate-200 text-xs px-2.5 py-0.5 rounded-full font-bold">
                  12 صفحة مستقلة مع بنك الوثائق والامتحانات
                </span>
              </div>
              <h2 className="text-lg md:text-xl font-black text-white">
                صفحات مخصصة وشاملة لكل سلك ومستوى دراسي
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                تضم كل صفحة مستقلاً: الجذاذات اليومية، فروض المراقبة المستمرة لجميع المراحل، نماذج الامتحانات الإقليمية والجهوية والوطنية المصححة، التوازيع السنوية والمرحلية، والأطر المرجعية المعتمدة.
              </p>
            </div>

            <div className="pt-3 flex flex-wrap gap-2 relative z-10">
              <button
                type="button"
                onClick={() => onNavigateToTab("primary_6")}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1 shadow-2xs"
              >
                <span>السادس ابتدائي (الموحد الإقليمي)</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => onNavigateToTab("middle_3")}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1 shadow-2xs"
              >
                <span>الثالثة إعدادي (الجهوي والمحلي)</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => onNavigateToTab("high_2bac")}
                className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1 shadow-2xs"
              >
                <span>الثانية باكالوريا (الامتحان الوطني)</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => onNavigateToTab("orientation")}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1 shadow-2xs"
              >
                <Compass className="w-3 h-3" />
                <span>فضاء التوجيه المدرسي والمهني</span>
              </button>
            </div>
          </div>

          {/* Quick cycle stats */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-2.5">
            <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-blue-900">التعليم الابتدائي (6 مستويات)</span>
                <span className="text-[10px] bg-blue-200 text-blue-900 font-bold px-1.5 py-0.2 rounded-md">مدارس الريادة</span>
              </div>
              <p className="text-[11px] text-blue-800 leading-tight">
                من 1AEP إلى 6AEP • مقاربة TaRL، التعليم الصريح وكراسات الأستاذ
              </p>
            </div>

            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-900">التعليم الإعدادي (3 سنوات)</span>
                <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-1.5 py-0.2 rounded-md">1AC - 3AC</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-tight">
                الإعداديات الرائدة، فروض مسار، والامتحانات الموحدة
              </p>
            </div>

            <div className="bg-purple-50/70 border border-purple-200/80 rounded-xl p-3 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-purple-900">التعليم الثانوي (3 مسالك)</span>
                <span className="text-[10px] bg-purple-200 text-purple-900 font-bold px-1.5 py-0.2 rounded-md">TC - 2BAC</span>
              </div>
              <p className="text-[11px] text-purple-800 leading-tight">
                الجذع المشترك، الأولى باك (الجهوي)، والثانية باك (الوطني)
              </p>
            </div>
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
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          {/* Red Header Bar matching Screenshot 2 */}
          <div className="bg-[#fef2f2] border-b border-red-100 py-3.5 px-4 text-center flex items-center justify-center gap-2">
            <span className="text-rose-600 text-lg">✏️</span>
            <h3 className="text-base md:text-lg font-black text-red-800 font-cairo">
              أدوات الموقع الذكية
            </h3>
          </div>

          {/* 15 Smart Tools Grid in 2 Columns matching Screenshot 2 */}
          <div className="grid grid-cols-2 gap-3 p-4 bg-white">
            {smartTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => setActiveSmartTool(tool.id)}
                  className="bg-[#f8fafc] hover:bg-blue-50/70 border border-slate-200/80 hover:border-blue-400 rounded-2xl py-4 px-2 text-center flex flex-col items-center justify-center gap-2.5 transition shadow-2xs hover:shadow-xs group cursor-pointer"
                  title={`تشغيل ${tool.title} داخلياً`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl ${tool.iconBg} ${tool.iconColor} flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-blue-900 font-cairo text-center">
                    {tool.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Left 1-Column: الأكثر قراءة (Matching Screenshot 3) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="text-red-500 text-lg">🔥</span>
              <h3 className="text-base md:text-lg font-black text-slate-900 font-cairo">
                الأكثر قراءة
              </h3>
            </div>

            {/* List of cards matching Screenshot 3 */}
            <div className="space-y-2.5">
              {trendingItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.id}
                    href={item.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#f8fafc] hover:bg-slate-100/90 border border-slate-200/80 rounded-2xl p-3.5 flex items-center justify-between transition cursor-pointer shadow-2xs hover:shadow-xs group"
                    title={`فتح ${item.title} على موقع Profpress.net`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-xl ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0 shadow-2xs`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-blue-900 font-cairo truncate">
                        {item.title}
                      </span>
                    </div>
                    <ChevronLeft className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:-translate-x-1 shrink-0" />
                  </a>
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
                <span className="text-blue-300 text-xs font-mono">0707983967 • عبر نموذج الاتصال والواتساب</span>
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
      {/* AUTOMATIC HOLIDAY REMINDER (COMPACT): التذكير التلقائي المصغر بالعطل في الأسفل */}
      {/* ========================================================================= */}
      <HolidayReminderBanner onNavigateToTab={onNavigateToTab} />

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
      {/* 15 INTERACTIVE SMART TOOLS MODAL (فتح الأدوات داخلياً بكامل الوظائف التفاعلية) */}
      {/* ========================================================================= */}
      <SmartToolsModal
        toolId={activeSmartTool}
        onClose={() => setActiveSmartTool(null)}
        onNavigateToTab={onNavigateToTab}
        smartTools={smartTools}
        onSelectTool={(id) => setActiveSmartTool(id)}
      />
    </div>
  );
};
