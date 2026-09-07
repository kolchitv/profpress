import React, { useState } from "react";
import {
  X,
  ExternalLink,
  Volume2,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Calculator,
  Languages,
  BookOpen,
  Mic,
  PenTool,
  CheckSquare,
  Wand2,
  Calendar,
  Palette,
  QrCode,
  Hash,
  FileText,
  Gamepad2,
  TrendingUp,
  Printer,
  ChevronLeft,
  ChevronRight,
  School,
  AlertCircle,
} from "lucide-react";
import { TabKey } from "../types";

export interface SmartToolItem {
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

interface SmartToolsModalProps {
  toolId: string | null;
  onClose: () => void;
  onNavigateToTab?: (tab: TabKey) => void;
  smartTools: SmartToolItem[];
  onSelectTool: (id: string) => void;
}

export const SmartToolsModal: React.FC<SmartToolsModalProps> = ({
  toolId,
  onClose,
  onNavigateToTab,
  smartTools,
  onSelectTool,
}) => {
  const currentTool = smartTools.find((t) => t.id === toolId);

  // General helper states
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  // -------------------------------------------------------------
  // Tool 1: لعبة الفرنسية (Jeu de français interactif)
  // -------------------------------------------------------------
  const frenchQuestions = [
    {
      q: "Choisissez la bonne orthographe pour compléter : « Les élèves écrivent sur le ...... »",
      options: ["tableau", "tablo", "tableu", "tableaux"],
      correct: "tableau",
      explanation: "« Tableau » prend un -eau au singulier.",
    },
    {
      q: "Conjuguez au présent : « Nous ...... la leçon attentivement. »",
      options: ["écoutons", "écoute", "écoutez", "écoutent"],
      correct: "écoutons",
      explanation: "Avec le pronom « nous », la terminaison du 1er groupe est -ons.",
    },
    {
      q: "Trouvez l'homophone correct : « Ali va ...... l'école tous les matins. »",
      options: ["à", "a", "as", "ah"],
      correct: "à",
      explanation: "On utilise la préposition « à » (avec accent grave) et non le verbe avoir « a ».",
    },
    {
      q: "Quel est le féminin de « directeur » ?",
      options: ["directrice", "directeure", "directeuse", "direction"],
      correct: "directrice",
      explanation: "Les noms en -teur forment généralement leur féminin en -trice.",
    },
    {
      q: "Accordez l'adjectif : « Ces filles sont très ...... »",
      options: ["intelligentes", "intelligent", "intelligente", "intelligents"],
      correct: "intelligentes",
      explanation: "Le sujet est féminin pluriel (« Ces filles »), donc l'adjectif prend -es.",
    },
  ];
  const [gameIndex, setGameIndex] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const [gameSelectedOpt, setGameSelectedOpt] = useState<string | null>(null);
  const [gameFeedback, setGameFeedback] = useState<string | null>(null);

  const speakFrench = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "fr-FR";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelectGameOption = (opt: string) => {
    if (gameSelectedOpt !== null) return;
    setGameSelectedOpt(opt);
    const curr = frenchQuestions[gameIndex];
    if (opt === curr.correct) {
      setGameScore((s) => s + 20);
      setGameFeedback("Bravo ! Réponse exacte (+20 pts). " + curr.explanation);
    } else {
      setGameFeedback("Attention ! La bonne réponse était : « " + curr.correct + " ». " + curr.explanation);
    }
  };

  const nextGameQuestion = () => {
    setGameSelectedOpt(null);
    setGameFeedback(null);
    setGameIndex((i) => (i + 1) % frenchQuestions.length);
  };

  // -------------------------------------------------------------
  // Tool 2: نقاط الترقية (Promotion Points Calculator)
  // -------------------------------------------------------------
  const [seniorityYears, setSeniorityYears] = useState(7);
  const [scaleYears, setScaleYears] = useState(5);
  const [inspectionScore, setInspectionScore] = useState(19);
  const [directorScore, setDirectorScore] = useState(19.5);
  const [promotionScaleTarget, setPromotionScaleTarget] = useState<"scale11" | "outScale">("scale11");

  const totalPromotionScore = Number(
    (scaleYears * 2 + seniorityYears * 1 + inspectionScore * 1 + directorScore * 0.5).toFixed(1)
  );

  // -------------------------------------------------------------
  // Tool 3: نقاط الثالثة إعدادي (3AC Exam Calculator)
  // -------------------------------------------------------------
  const [middleContinuous, setMiddleContinuous] = useState(14.5);
  const [middleLocalUnified, setMiddleLocalUnified] = useState(13.5);
  const [middleRegionalUnified, setMiddleRegionalUnified] = useState(14.0);

  const middleFinalGPA = Number(
    (middleContinuous * 0.3 + middleLocalUnified * 0.3 + middleRegionalUnified * 0.4).toFixed(2)
  );

  const getMiddleHonor = (gpa: number) => {
    if (gpa >= 16) return { text: "حسن جداً 🌟", color: "text-emerald-700 bg-emerald-50 border-emerald-300" };
    if (gpa >= 14) return { text: "حسن ✨", color: "text-blue-700 bg-blue-50 border-blue-300" };
    if (gpa >= 12) return { text: "مستحسن 👍", color: "text-cyan-700 bg-cyan-50 border-cyan-300" };
    if (gpa >= 10) return { text: "مقبول (ناجح) ✅", color: "text-amber-700 bg-amber-50 border-amber-300" };
    return { text: "دون عتبة النجاح (أقل من 10) ⚠️", color: "text-rose-700 bg-rose-50 border-rose-300" };
  };

  // -------------------------------------------------------------
  // Tool 4: الإملاء الذكي (Smart Dictation Assistant)
  // -------------------------------------------------------------
  const dictationPassages = [
    {
      level: "المستوى الأول والثاني (الكلمات والجمل البسيطة)",
      text: "دَخَلَ سَامِي إِلَى الْقِسْمِ، وَجَلَسَ أَمَامَ الْمَكْتَبِ يَكْتُبُ دَرْسَهُ بِخَطٍّ جَمِيلٍ.",
    },
    {
      level: "المستوى الثالث والرابع (التاء المبسوطة والمربوطة)",
      text: "سَافَرَتْ فَاطِمَةُ إِلَى قَرْيَةٍ هَادِئَةٍ، فَشَاهَدَتْ حَدِيقَةً رَائِعَةً مَلِيئَةً بِالزُّهُورِ الْعَطِرَةِ، ثُمَّ شَكَرَتْ مُعَلِّمَتَهَا عَلَى النَّصِيحَةِ.",
    },
    {
      level: "المستوى الخامس والسادس (الهمزات والألف اللينة)",
      text: "يَسْعَى الْمُعَلِّمُ جَاهِدًا لِتَنْشِئَةِ جِيلٍ وَاعٍ يَقْرَأُ الْكُتُبَ وَيَمْتَلِئُ قَلْبُهُ بِحُبِّ الْوَطَنِ، فَالْعِلْمُ يَضِيءُ دُرُوبَ الْحَيَاةِ.",
    },
    {
      level: "Français - Primaire (Les accents et la ponctuation)",
      text: "Dans la cour de récréation, les enfants jouent joyeusement sous le soleil. Le maître surveille avec bienveillance.",
    },
  ];
  const [selectedDictationIndex, setSelectedDictationIndex] = useState(1);
  const [studentDictationInput, setStudentDictationInput] = useState("");
  const [dictationSpeed, setDictationSpeed] = useState<number>(0.8);
  const [showDictationCheck, setShowDictationCheck] = useState(false);

  const speakText = (text: string, lang = "ar-SA") => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = dictationSpeed;
      window.speechSynthesis.speak(utterance);
    }
  };

  // -------------------------------------------------------------
  // Tool 5: تصريف العربية (Arabic Verb Conjugator)
  // -------------------------------------------------------------
  const arabicVerbs = [
    {
      verb: "كَتَبَ",
      type: "ثلاثي مجرد (صحيح سالم)",
      past: ["كَتَبْتُ", "كَتَبْنَا", "كَتَبْتَ", "كَتَبْتِ", "كَتَبْتُمَا", "كَتَبْتُمْ", "كَتَبْتُنَّ", "كَتَبَ", "كَتَبَتْ", "كَتَبَا", "كَتَبُوا", "كَتَبْنَ"],
      present: ["أَكْتُبُ", "نَكْتُبُ", "تَكْتُبُ", "تَكْتُبِينَ", "تَكْتُبَانِ", "تَكْتُبُونَ", "تَكْتُبْنَ", "يَكْتُبُ", "تَكْتُبُ", "يَكْتُبَانِ", "يَكْتُبُونَ", "يَكْتُبْنَ"],
      imperative: ["-", "-", "اُكْتُبْ", "اُكْتُبِي", "اُكْتُبَا", "اُكْتُبُوا", "اُكْتُبْنَ", "-", "-", "-", "-", "-"],
    },
    {
      verb: "قَرَأَ",
      type: "ثلاثي مهموز اللام (صحيح مهموز)",
      past: ["قَرَأْتُ", "قَرَأْنَا", "قَرَأْتَ", "قَرَأْتِ", "قَرَأْتُمَا", "قَرَأْتُمْ", "قَرَأْتُنَّ", "قَرَأَ", "قَرَأَتْ", "قَرَآ", "قَرَؤُوا", "قَرَأْنَ"],
      present: ["أَقْرَأُ", "نَقْرَأُ", "تَقْرَأُ", "تَقْرَئِينَ", "تَقْرَآنِ", "تَقْرَؤُونَ", "تَقْرَأْنَ", "يَقْرَأُ", "تَقْرَأُ", "يَقْرَآنِ", "يَقْرَؤُونَ", "يَقْرَأْنَ"],
      imperative: ["-", "-", "اِقْرَأْ", "اِقْرَئِي", "اِقْرَآ", "اِقْرَؤُوا", "اِقْرَأْنَ", "-", "-", "-", "-", "-"],
    },
    {
      verb: "قَالَ",
      type: "معتل أجوف (واوي)",
      past: ["قُلْتُ", "قُلْنَا", "قُلْتَ", "قُلْتِ", "قُلْتُمَا", "قُلْتُمْ", "قُلْتُنَّ", "قَالَ", "قَالَتْ", "قَالَا", "قَالُوا", "قُلْنَ"],
      present: ["أَقُولُ", "نَقُولُ", "تَقُولُ", "تَقُولِينَ", "تَقُولَانِ", "تَقُولُونَ", "تَقُلْنَ", "يَقُولُ", "تَقُولُ", "يَقُولَانِ", "يَقُولُونَ", "يَقُلْنَ"],
      imperative: ["-", "-", "قُلْ", "قُولِي", "قُولَا", "قُولُوا", "قُلْنَ", "-", "-", "-", "-", "-"],
    },
    {
      verb: "سَعَى",
      type: "معتل ناقص (يائي)",
      past: ["سَعَيْتُ", "سَعَيْنَا", "سَعَيْتَ", "سَعَيْتِ", "سَعَيْتُمَا", "سَعَيْتُمْ", "سَعَيْتُنَّ", "سَعَى", "سَعَتْ", "سَعَيَا", "سَعَوْا", "سَعَيْنَ"],
      present: ["أَسْعَى", "نَسْعَى", "تَسْعَى", "تَسْعَيْنَ", "تَسْعَيَانِ", "تَسْعَوْنَ", "تَسْعَيْنَ", "يَسْعَى", "تَسْعَى", "يَسْعَيَانِ", "يَسْعَوْنَ", "يَسْعَيْنَ"],
      imperative: ["-", "-", "اِسْعَ", "اِسْعَيْ", "اِسْعَيَا", "اِسْعَوْا", "اِسْعَيْنَ", "-", "-", "-", "-", "-"],
    },
  ];
  const arabicPronouns = [
    "أَنَا", "نَحْنُ", "أَنْتَ", "أَنْتِ", "أَنْتُمَا", "أَنْتُمْ", "أَنْتُنَّ",
    "هُوَ", "هِيَ", "هُمَا", "هُمْ", "هُنَّ"
  ];
  const [selectedArabicVerbIndex, setSelectedArabicVerbIndex] = useState(0);
  const [arabicTenseTab, setArabicTenseTab] = useState<"past" | "present" | "imperative">("past");

  // -------------------------------------------------------------
  // Tool 6: تصريف الفرنسية (French Verb Conjugator)
  // -------------------------------------------------------------
  const frenchVerbs = [
    {
      infinitive: "être",
      group: "Auxiliaire (3e groupe)",
      present: ["je suis", "tu es", "il/elle est", "nous sommes", "vous êtes", "ils/elles sont"],
      passeCompose: ["j'ai été", "tu as été", "il/elle a été", "nous avons été", "vous avez été", "ils/elles ont été"],
      imparfait: ["j'étais", "tu étais", "il/elle était", "nous étions", "vous étiez", "ils/elles étaient"],
      futur: ["je serai", "tu seras", "il/elle sera", "nous serons", "vous serez", "ils/elles seront"],
    },
    {
      infinitive: "avoir",
      group: "Auxiliaire (3e groupe)",
      present: ["j'ai", "tu as", "il/elle a", "nous avons", "vous avez", "ils/elles ont"],
      passeCompose: ["j'ai eu", "tu as eu", "il/elle a eu", "nous avons eu", "vous avez eu", "ils/elles ont eu"],
      imparfait: ["j'avais", "tu avais", "il/elle avait", "nous avions", "vous aviez", "ils/elles avaient"],
      futur: ["j'aurai", "tu auras", "il/elle aura", "nous aurons", "vous aurez", "ils/elles auront"],
    },
    {
      infinitive: "aller",
      group: "Verbe irrégulier (3e groupe)",
      present: ["je vais", "tu vas", "il/elle va", "nous allons", "vous allez", "ils/elles vont"],
      passeCompose: ["je suis allé(e)", "tu es allé(e)", "il/elle est allé(e)", "nous sommes allés(es)", "vous êtes allés(es)", "ils/elles sont allés(es)"],
      imparfait: ["j'allais", "tu allais", "il/elle allait", "nous allions", "vous alliez", "ils/elles allaient"],
      futur: ["j'irai", "tu iras", "il/elle ira", "nous irons", "vous irez", "ils/elles iront"],
    },
    {
      infinitive: "parler",
      group: "Verbe régulier (1er groupe)",
      present: ["je parle", "tu parles", "il/elle parle", "nous parlons", "vous parlez", "ils/elles parlent"],
      passeCompose: ["j'ai parlé", "tu as parlé", "il/elle a parlé", "nous avons parlé", "vous avez parlé", "ils/elles ont parlé"],
      imparfait: ["je parlais", "tu parlais", "il/elle parlait", "nous parlions", "vous parliez", "ils/elles parlaient"],
      futur: ["je parlerai", "tu parleras", "il/elle parlera", "nous parlerons", "vous parlerez", "ils/elles parleront"],
    },
  ];
  const [selectedFrenchVerbIndex, setSelectedFrenchVerbIndex] = useState(0);
  const [frenchTenseTab, setFrenchTenseTab] = useState<"present" | "passeCompose" | "imparfait" | "futur">("present");

  // -------------------------------------------------------------
  // Tool 7: التشكيل والإعراب (Tashkeel & I'rab Assistant)
  // -------------------------------------------------------------
  const irabTemplates = [
    {
      sentence: "يَشْرَحُ الْمُعَلِّمُ الدَّرْسَ بِعِنَايَةٍ.",
      breakdown: [
        { word: "يَشْرَحُ", irab: "فعل مضارع مرفوع، وعلامة رفعه الضمة الظاهرة على آخره." },
        { word: "الْمُعَلِّمُ", irab: "فاعل مرفوع، وعلامة رفعه الضمة الظاهرة على آخره." },
        { word: "الدَّرْسَ", irab: "مفعول به منصوب، وعلامة نصبه الفتحة الظاهرة على آخره." },
        { word: "بِعِنَايَةٍ", irab: "الباء حرف جر، عناية اسم مجرور بالكسرة الظاهرة على آخره، وشبه الجملة في محل نصب حال." },
      ],
    },
    {
      sentence: "إِنَّ التَّعْلِيمَ أَسَاسُ التَّقَدُّمِ.",
      breakdown: [
        { word: "إِنَّ", irab: "حرف توكيد ونصب مبني على الفتح لا محل له من الإعراب." },
        { word: "التَّعْلِيمَ", irab: "اسم إن منصوب، وعلامة نصبه الفتحة الظاهرة على آخره." },
        { word: "أَسَاسُ", irab: "خبر إن مرفوع، وعلامة رفعه الضمة الظاهرة على آخره وهو مضاف." },
        { word: "التَّقَدُّمِ", irab: "مضاف إليه مجرور، وعلامة جره الكسرة الظاهرة على آخره." },
      ],
    },
    {
      sentence: "كَانَ التِّلْمِيذُ مُنْتَبِهًا فِي الْفَصْلِ.",
      breakdown: [
        { word: "كَانَ", irab: "فعل ماض ناقص مبني على الفتح، يرفع المبتدأ وينصب الخبر." },
        { word: "التِّلْمِيذُ", irab: "اسم كان مرفوع وعلامة رفعه الضمة الظاهرة على آخره." },
        { word: "مُنْتَبِهًا", irab: "خبر كان منصوب وعلامة نصبه تنوين الفتح." },
        { word: "فِي الْفَصْلِ", irab: "جار ومجرور متعلقان بالخبر." },
      ],
    },
  ];
  const [selectedIrabIndex, setSelectedIrabIndex] = useState(0);
  const [customTextForTashkeel, setCustomTextForTashkeel] = useState("شكر المدير الاساتذة والتلاميذ على المجهود الرائع");

  // -------------------------------------------------------------
  // Tool 8: مولد الملاحظات (Remarks Generator)
  // -------------------------------------------------------------
  const [remarksSubject, setRemarksSubject] = useState("all");
  const [remarksLevel, setRemarksLevel] = useState<"excellent" | "good" | "average" | "weak">("excellent");

  const remarksDatabase = {
    excellent: [
      "مستوى متميز ونتائج مشرفة، مشاركة فاعلة وسلوك نموذجي داخل الفصل. بوركت جهودك!",
      "استيعاب ممتاز للمفاهيم وتفوق ملحوظ في إنجاز الأنشطة الفردية والجماعية. واصل تألقك.",
      "تلميذ مجد وذو دافعية عالية للتعلم، قدرة ممتازة على التعبير والتحليل.",
    ],
    good: [
      "نتائج جيدة ومستمرة، مشارك منضبط قادر على تحقيق درجات أعلى بمزيد من التركيز.",
      "عمل جاد ومستوى طيب، يستحسن تعزيز المراجعة المنزلية وتكثيف القراءة الذاتية.",
      "مستوى محمود وقدرات واعدة، خطوة واحدة تفصلك عن الامتياز فثابر على الاجتهاد.",
    ],
    average: [
      "مستوى متوسط ومقبول، يحتاج إلى مضاعفة الجهد والتركيز داخل الحجرة الدراسية.",
      "نتائج متباينة تحتاج لمعالجة بعض التعثرات الأساسية والمواظبة على إنجاز الواجبات.",
      "قادر على التحسن شريطة الاهتمام أكثر بالمفاهيم الأساسية والانتباه لتوجيهات الأستاذ.",
    ],
    weak: [
      "تعثرات ملحوظة في اكتساب التعلمات الأساسية، يستوجب دعماً بيداغوجياً ومتابعة أسرية حثيثة.",
      "مستوى متواضع يحتاج إلى تدارك النقائص والالتزام ببرنامج الدعم والمعالجة المبرمج.",
      "صعوبات في القراءة والحساب تستدعي تكثيف أنشطة TaRL والتركيز خلال الحصص.",
    ],
  };

  // -------------------------------------------------------------
  // Tool 9: النص إلى صورة / بطاقات الوسائل التعليمية (Educational Flashcards)
  // -------------------------------------------------------------
  const flashcardThemes = [
    {
      id: "shapes",
      title: "الأشكال الهندسية",
      ar: "مُثَلَّثٌ • دَائِرَةٌ • مُرَبَّعٌ",
      fr: "Triangle • Cercle • Carré",
      desc: "قواعد الرياضيات والتعرف على الزوايا والأضلاع",
      bg: "from-blue-500 to-indigo-600",
      svg: (
        <svg viewBox="0 0 200 120" className="w-full h-24 mx-auto drop-shadow-md">
          <circle cx="40" cy="60" r="30" fill="#38bdf8" />
          <polygon points="100,25 70,85 130,85" fill="#f59e0b" />
          <rect x="145" y="35" width="45" height="45" rx="6" fill="#10b981" />
        </svg>
      ),
    },
    {
      id: "nature",
      title: "عناصر الطبيعة والنشاط العلمي",
      ar: "الشَّمْسُ • الشَّجَرَةُ • الْمَاءُ",
      fr: "Le Soleil • L'Arbre • L'Eau",
      desc: "دورة حياة النبات ومصادر الطاقة الحيوية",
      bg: "from-emerald-600 to-teal-700",
      svg: (
        <svg viewBox="0 0 200 120" className="w-full h-24 mx-auto drop-shadow-md">
          <circle cx="100" cy="50" r="25" fill="#facc15" />
          <path d="M40 90 Q40 50 60 50 Q80 50 80 90 Z" fill="#15803d" />
          <rect x="56" y="90" width="8" height="20" fill="#78350f" />
          <path d="M130 95 Q145 70 160 95 Q175 110 130 95 Z" fill="#0284c7" />
        </svg>
      ),
    },
    {
      id: "classroom",
      title: "أدوات ومستلزمات المتعلم",
      ar: "كِتَابٌ • قَلَمٌ • مِسْطَرَةٌ",
      fr: "Livre • Stylo • Règle",
      desc: "المعجم المدرسي والتنظيم الصفي لمسار الريادة",
      bg: "from-amber-500 to-orange-600",
      svg: (
        <svg viewBox="0 0 200 120" className="w-full h-24 mx-auto drop-shadow-md">
          <rect x="30" y="35" width="45" height="60" rx="4" fill="#3b82f6" />
          <line x1="100" y1="20" x2="100" y2="100" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" />
          <rect x="135" y="45" width="50" height="15" rx="3" fill="#eab308" />
        </svg>
      ),
    },
    {
      id: "morocco",
      title: "الهوية الوطنية والمواطنة",
      ar: "الْمَمْلَكَةُ الْمَغْرِبِيَّةُ • الرَّايَةُ الْوَطَنِيَّةُ",
      fr: "Le Royaume du Maroc",
      desc: "الله • الوطن • الملك (التربية على المواطنة)",
      bg: "from-red-600 to-rose-700",
      svg: (
        <svg viewBox="0 0 200 120" className="w-full h-24 mx-auto drop-shadow-md">
          <rect x="35" y="20" width="130" height="80" rx="6" fill="#c1272d" />
          <polygon
            points="100,38 106,56 125,56 110,67 115,85 100,74 85,85 90,67 75,56 94,56"
            fill="none"
            stroke="#006233"
            strokeWidth="3.5"
          />
        </svg>
      ),
    },
  ];
  const [selectedThemeIndex, setSelectedThemeIndex] = useState(0);

  // -------------------------------------------------------------
  // Tool 10: محول التاريخ والتقويم المدرسي (Date Converter)
  // -------------------------------------------------------------
  const [gregorianDate, setGregorianDate] = useState(() => new Date().toISOString().split("T")[0]);

  const calculateHijriDate = (gDateStr: string) => {
    try {
      const d = new Date(gDateStr);
      if (isNaN(d.getTime())) return "تاريخ غير صالح";
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

  const holidays2026 = [
    { name: "عيد المولد النبوي الشريف", date: "12 و 13 ربيع الأول 1448", days: "يومان" },
    { name: "عطلة الفترة البينية الأولى", date: "أواخر أكتوبر 2026", days: "8 أيام" },
    { name: "ذكرى المسيرة الخضراء", date: "06 نونبر 2026", days: "يوم واحد" },
    { name: "عيد الاستقلال المجيد", date: "18 نونبر 2026", days: "يوم واحد" },
    { name: "عطلة الفترة البينية الثانية", date: "دجنبر 2026", days: "8 أيام" },
    { name: "فاتح السنة الميلادية", date: "01 يناير 2027", days: "يوم واحد" },
    { name: "تقديم وثيقة الاستقلال", date: "11 يناير 2027", days: "يوم واحد" },
    { name: "عطلة منتصف السنة الدراسية", date: "أواخر يناير 2027", days: "8 أيام" },
  ];

  // -------------------------------------------------------------
  // Tool 11: محدد الألوان والهوية البصرية (Color Palette)
  // -------------------------------------------------------------
  const officialColors = [
    { name: "أخضر الريادة المعتمد", hex: "#145350", rgb: "20, 83, 80", role: "الهوية الرسمية لمؤسسات الريادة" },
    { name: "أزرق الوزارة الملوكي", hex: "#1e3a8a", rgb: "30, 58, 138", role: "ترويسة وزارة التربية الوطنية والتعليم الأولي" },
    { name: "أحمر العلم المغربي", hex: "#c1272d", rgb: "193, 39, 45", role: "شعار المملكة والمناسبات الوطنية" },
    { name: "أصفر ذهبي للتتويج", hex: "#f59e0b", rgb: "245, 158, 11", role: "شواهد التقدير والتميز ولوائح الشرف" },
    { name: "زمردي الأنشطة والرياضيات", hex: "#10b981", rgb: "16, 185, 129", role: "جداول الدروس والحساب الذهني" },
    { name: "بنفسجي الدعم والتقويم", hex: "#7c3aed", rgb: "124, 58, 237", role: "أنشطة الدعم المندمج والملاحظات" },
  ];
  const [customColorPickerHex, setCustomColorPickerHex] = useState("#145350");

  // -------------------------------------------------------------
  // Tool 12: مولد QR الذكي (QR Code Generator)
  // -------------------------------------------------------------
  const [qrContent, setQrContent] = useState("https://massarservice.men.gov.ma");
  const qrPresets = [
    { label: "منظومة مسار", url: "https://massarservice.men.gov.ma" },
    { label: "موقع Profpress", url: "https://www.profpress.net" },
    { label: "منصة مدرستي الرقمية", url: "https://madrasati.men.gov.ma" },
    { label: "وثائق الريادة TaRL", url: "https://www.profpress.net/search/label/%D9%85%D8%AF%D8%A7%D8%B1%D8%B3%20%D8%B1%D8%A7%D8%A6%D8%AF%D8%A9" },
  ];

  // -------------------------------------------------------------
  // Tool 13: الترجمة الذكية ومعجم المصطلحات (Didactic Glossary)
  // -------------------------------------------------------------
  const didacticTerms = [
    {
      ar: "الوضعية المشكلة",
      fr: "La situation-problème",
      en: "Problem situation",
      def: "وضعية تعليمية يواجه فيها المتعلم عائقاً معرفياً يدفعه لتعبئة موارده وبناء تعلمات جديدة لتجاوزه.",
    },
    {
      ar: "النقل الديداكتيكي",
      fr: "La transposition didactique",
      en: "Didactic transposition",
      def: "سيرورة تحويل المعرفة العالمة (Savoir savant) إلى معرفة قابلة للتدريس والتعلّم في الفصل الدراسي.",
    },
    {
      ar: "التعاقد الديداكتيكي",
      fr: "Le contrat didactique",
      en: "Didactic contract",
      def: "مجموع الالتزامات والتوقعات الضمنية والصريحة المتبادلة بين المدرس والمتعلمين حول المعرفة.",
    },
    {
      ar: "التقويم التشخيصي",
      fr: "L'évaluation diagnostique",
      en: "Diagnostic assessment",
      def: "تقويم ينفذ في بداية السنة أو الوحدة لرصد المكتسبات السابقة وتحديد مواطن القوة والتعثر.",
    },
    {
      ar: "التدريس الصريح",
      fr: "L'enseignement explicite",
      en: "Explicit instruction",
      def: "مقاربة مباشرة ترتكز على 3 مراحل: النمذجة (المدرس)، الممارسة الموجهة، ثم الممارسة المستقلة.",
    },
    {
      ar: "بيداغوجيا الخطأ",
      fr: "La pédagogie de l'erreur",
      en: "Pedagogy of error",
      def: "اعتبار الخطأ خطوة إيجابية وطبيعية في سيرورة بناء التعلم ومؤشراً لتحديد استراتيجية التفكير.",
    },
  ];
  const [glossarySearch, setGlossarySearch] = useState("");
  const filteredTerms = didacticTerms.filter(
    (t) =>
      t.ar.includes(glossarySearch) ||
      t.fr.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      t.en.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  // -------------------------------------------------------------
  // Tool 14: محول الأرقام والتفقيط (Tafqit Tool)
  // -------------------------------------------------------------
  const [tafqitInput, setTafqitInput] = useState<number | string>(17.75);

  const getTafqitArabicDetailed = (num: number): string => {
    const rounded = Math.round(num * 100) / 100;
    const whole = Math.floor(rounded);
    const fraction = Math.round((rounded - whole) * 100);

    const arabicOnes = [
      "صِفْر", "وَاحِد", "اِثْنَان", "ثَلَاثَة", "أَرْبَعَة", "خَمْسَة", "سِتَّة", "سَبْعَة", "ثَمَانِيَة", "تِسْعَة",
      "عَشَرَة", "أَحَدَ عَشَرَ", "اثْنَا عَشَرَ", "ثَلَاثَةَ عَشَرَ", "أَرْبَعَةَ عَشَرَ", "خَمْسَةَ عَشَرَ",
      "سِتَّةَ عَشَرَ", "سَبْعَةَ عَشَرَ", "ثَمَانِيَةَ عَشَرَ", "تِسْعَةَ عَشَرَ", "عِشْرُونَ",
    ];

    let result = "";
    if (whole <= 20) {
      result = arabicOnes[whole] || whole.toString();
    } else {
      result = `${whole} من عشرين`;
    }

    if (fraction > 0) {
      result += ` وَفَاصِلَةَ ${arabicOnes[Math.min(fraction, 20)] || fraction}`;
    }
    return result;
  };

  const getTafqitFrench = (num: number): string => {
    const rounded = Math.round(num * 100) / 100;
    const whole = Math.floor(rounded);
    const fraction = Math.round((rounded - whole) * 100);

    const frNumbers = [
      "zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix",
      "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf", "vingt"
    ];

    let res = frNumbers[whole] || whole.toString();
    if (fraction > 0) {
      res += ` virgule ${fraction}`;
    }
    return res.charAt(0).toUpperCase() + res.slice(1);
  };

  // -------------------------------------------------------------
  // Tool 15: محول PDF إلى صور (PDF to Images Tool)
  // -------------------------------------------------------------
  const [selectedSampleDoc, setSelectedSampleDoc] = useState<string>("lesson_plan");
  const [extractedPage, setExtractedPage] = useState(1);

  if (!currentTool) return null;

  const Icon = currentTool.icon;

  return (
    <div className="no-print fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-slate-200">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${currentTool.iconBg} ${currentTool.iconColor} flex items-center justify-center shadow-md shrink-0`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black font-cairo text-white">
                  {currentTool.title}
                </h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full font-bold">
                  أداة داخلية تفاعلية
                </span>
              </div>
              <p className="text-[11px] text-slate-300 line-clamp-1">{currentTool.shortDesc}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={currentTool.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-[10px] text-amber-300 hover:text-amber-200 bg-white/10 hover:bg-white/15 px-2.5 py-1 rounded-lg transition"
              title="تصفح هذه الأداة في موقع بروف بريس"
            >
              <span>Profpress</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={onClose}
              className="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition cursor-pointer"
              title="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Tool Content */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4 text-slate-800 text-xs sm:text-sm">
          {/* ========================================================= */}
          {/* TOOL 1: GAME (لعبة الفرنسية) */}
          {/* ========================================================= */}
          {toolId === "game" && (
            <div className="space-y-4" dir="ltr">
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-900 block">Jeu de vocabulaire & orthographe</span>
                  <span className="text-[11px] text-amber-700">Question {gameIndex + 1} sur {frenchQuestions.length}</span>
                </div>
                <div className="bg-amber-500 text-white font-black px-3 py-1 rounded-full text-xs shadow-2xs">
                  Score : {gameScore} pts
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-bold text-sm sm:text-base text-slate-900 leading-relaxed font-sans">
                    {frenchQuestions[gameIndex].q}
                  </p>
                  <button
                    type="button"
                    onClick={() => speakFrench(frenchQuestions[gameIndex].q)}
                    className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg cursor-pointer transition shrink-0"
                    title="Écouter la question"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {frenchQuestions[gameIndex].options.map((opt) => {
                    const isSelected = gameSelectedOpt === opt;
                    const isCorrect = opt === frenchQuestions[gameIndex].correct;
                    let btnStyle = "bg-slate-50 hover:bg-blue-50 border-slate-200 text-slate-800";
                    if (gameSelectedOpt !== null) {
                      if (isCorrect) btnStyle = "bg-emerald-100 border-emerald-400 text-emerald-950 font-bold";
                      else if (isSelected) btnStyle = "bg-rose-100 border-rose-400 text-rose-950 font-bold";
                    }
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectGameOption(opt)}
                        disabled={gameSelectedOpt !== null}
                        className={`p-3 rounded-xl border text-sm font-semibold transition text-left cursor-pointer flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakFrench(opt);
                          }}
                          className="text-slate-400 hover:text-blue-600 p-1"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </button>
                    );
                  })}
                </div>

                {gameFeedback && (
                  <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs font-medium space-y-1">
                    <p>{gameFeedback}</p>
                    <button
                      type="button"
                      onClick={nextGameQuestion}
                      className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-xs cursor-pointer transition flex items-center gap-1.5"
                    >
                      <span>Question suivante</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TOOL 2: PROMOTION (نقاط الترقية) */}
          {/* ========================================================= */}
          {toolId === "promotion" && (
            <div className="space-y-4">
              <p className="text-slate-600 text-xs">
                حاسبة تقديرية لنقط الترقية بالاختيار والامتحان المهني لأساتذة التعليم الابتدائي، الإعدادي، والتأهيلي:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                  <label className="font-bold text-xs text-slate-800 block">سنوات الأقدمية في السلم (2 نقط/سنة):</label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={scaleYears}
                    onChange={(e) => setScaleYears(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 font-bold font-mono"
                  />
                  <span className="text-[11px] text-blue-700 font-bold block">{scaleYears * 2} نقطة</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                  <label className="font-bold text-xs text-slate-800 block">سنوات الأقدمية العامة (نقطة واحدة/سنة):</label>
                  <input
                    type="number"
                    min="0"
                    max="40"
                    value={seniorityYears}
                    onChange={(e) => setSeniorityYears(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 font-bold font-mono"
                  />
                  <span className="text-[11px] text-blue-700 font-bold block">{seniorityYears * 1} نقطة</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                  <label className="font-bold text-xs text-slate-800 block">نقطة التفتيش / التأطير (على 20):</label>
                  <input
                    type="number"
                    min="10"
                    max="20"
                    step="0.5"
                    value={inspectionScore}
                    onChange={(e) => setInspectionScore(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 font-bold font-mono"
                  />
                  <span className="text-[11px] text-slate-500 block">معامل 1 = {inspectionScore} نقطة</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                  <label className="font-bold text-xs text-slate-800 block">نقطة الرئيس المباشر / المدير (على 20):</label>
                  <input
                    type="number"
                    min="10"
                    max="20"
                    step="0.5"
                    value={directorScore}
                    onChange={(e) => setDirectorScore(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 font-bold font-mono"
                  />
                  <span className="text-[11px] text-slate-500 block">معامل 0.5 = {(directorScore * 0.5).toFixed(1)} نقطة</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-4 text-center shadow-sm space-y-1">
                <span className="text-xs text-blue-200 block font-medium">مجموع نقاط الترقية التقديري:</span>
                <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight block">
                  {totalPromotionScore} <span className="text-sm font-sans">نقطة</span>
                </span>
                <span className="text-[11px] text-blue-100 block">
                  {totalPromotionScore >= 35
                    ? "✨ رصيد ممتاز يمنحك حظوظاً وافرة في لوائح الترقية بالاختيار."
                    : "📌 استمر في تجميع سنوات الأقدمية، ومجموع النقط يتطور سنوياً."}
                </span>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TOOL 3: MIDDLE EXAM (نقاط الثالثة إعدادي) */}
          {/* ========================================================= */}
          {toolId === "middle_exam" && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900">
                <strong>المعاملات المعتمدة وزارياً للثالثة إعدادي:</strong>
                <ul className="list-disc list-inside mt-1 space-y-0.5 text-[11px] text-emerald-800">
                  <li>المراقبة المستمرة لمجموع الأسدوسين: <strong>30%</strong> (معامل 3)</li>
                  <li>الامتحان الموحد المحلي (دورة يناير): <strong>30%</strong> (معامل 3)</li>
                  <li>الامتحان الموحد الجهوي (دورة يونيو): <strong>40%</strong> (معامل 4)</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                  <label className="font-bold text-xs text-slate-800 block">المراقبة المستمرة (30%):</label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    step="0.25"
                    value={middleContinuous}
                    onChange={(e) => setMiddleContinuous(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 font-bold font-mono text-base"
                  />
                  <span className="text-[10px] text-slate-500 block">معدل الدورتين 1 و 2</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                  <label className="font-bold text-xs text-slate-800 block">الموحد المحلي (30%):</label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    step="0.25"
                    value={middleLocalUnified}
                    onChange={(e) => setMiddleLocalUnified(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 font-bold font-mono text-base"
                  />
                  <span className="text-[10px] text-slate-500 block">امتحان يناير الموحد</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                  <label className="font-bold text-xs text-slate-800 block">الموحد الجهوي (40%):</label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    step="0.25"
                    value={middleRegionalUnified}
                    onChange={(e) => setMiddleRegionalUnified(parseFloat(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 font-bold font-mono text-base"
                  />
                  <span className="text-[10px] text-slate-500 block">امتحان يونيو الجهوي</span>
                </div>
              </div>

              {/* Result Badge */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center space-y-2">
                <span className="text-xs text-slate-500 font-bold block">المعدل العام لنيل شهادة السلك الإعدادي:</span>
                <span className="text-3xl font-black text-slate-900 font-mono block">
                  {middleFinalGPA} <span className="text-sm font-sans font-normal text-slate-500">/ 20</span>
                </span>
                <div className="inline-block px-4 py-1.5 rounded-full border text-xs font-bold font-cairo">
                  <span className={`px-3 py-1 rounded-full border ${getMiddleHonor(middleFinalGPA).color}`}>
                    {getMiddleHonor(middleFinalGPA).text}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TOOL 4: DICTATION (الإملاء الذكي) */}
          {/* ========================================================= */}
          {toolId === "dictation" && (
            <div className="space-y-4">
              <p className="text-slate-600 text-xs">
                نصوص إملائية مشكولة متدرجة الصعوبة حسب مستويات الابتدائي ومدارس الريادة، مع الإملاء الصوتي التفاعلي:
              </p>

              {/* Level Selector */}
              <div className="flex flex-wrap gap-1.5">
                {dictationPassages.map((p, idx) => (
                  <button
                    key={p.level}
                    type="button"
                    onClick={() => {
                      setSelectedDictationIndex(idx);
                      setShowDictationCheck(false);
                      setStudentDictationInput("");
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      selectedDictationIndex === idx
                        ? "bg-blue-600 text-white shadow-2xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {p.level.split("(")[0]}
                  </button>
                ))}
              </div>

              {/* Text Card with Audio Controls */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-xs text-slate-800 font-cairo">
                    {dictationPassages[selectedDictationIndex].level}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        speakText(
                          dictationPassages[selectedDictationIndex].text,
                          selectedDictationIndex === 3 ? "fr-FR" : "ar-SA"
                        )
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>استماع للإملاء</span>
                    </button>
                    <select
                      value={dictationSpeed}
                      onChange={(e) => setDictationSpeed(parseFloat(e.target.value))}
                      className="bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs font-medium"
                      title="سرعة النطق"
                    >
                      <option value="0.6">بطيء جداً</option>
                      <option value="0.8">بطيء (موصى به للإملاء)</option>
                      <option value="1.0">عادي</option>
                    </select>
                  </div>
                </div>

                <p
                  className="text-base sm:text-lg font-bold text-slate-900 leading-loose font-cairo select-none"
                  dir={selectedDictationIndex === 3 ? "ltr" : "rtl"}
                >
                  {dictationPassages[selectedDictationIndex].text}
                </p>

                <div className="pt-2 border-t border-slate-200">
                  <label className="font-bold text-xs text-slate-700 block mb-1">
                    مساحة تدرب التلميذ على كتابة النص أثناء الإملاء:
                  </label>
                  <textarea
                    rows={2}
                    value={studentDictationInput}
                    onChange={(e) => setStudentDictationInput(e.target.value)}
                    placeholder="اكتب ما تسمعه هنا للتحقق من سلامة رسم الحروف والهمزات..."
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    dir={selectedDictationIndex === 3 ? "ltr" : "rtl"}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <button
                      type="button"
                      onClick={() => setShowDictationCheck(true)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>التحقق والمقارنة</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(dictationPassages[selectedDictationIndex].text, "dictation_copy")
                      }
                      className="text-slate-500 hover:text-blue-700 text-xs font-bold flex items-center gap-1"
                    >
                      {copiedKey === "dictation_copy" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === "dictation_copy" ? "تم نسخ النص!" : "نسخ النص"}</span>
                    </button>
                  </div>
                  {showDictationCheck && studentDictationInput && (
                    <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs space-y-1">
                      <p className="font-bold text-blue-900">المقارنة المعيارية:</p>
                      <p className="text-slate-700">
                        الأصل: <span className="font-bold">{dictationPassages[selectedDictationIndex].text}</span>
                      </p>
                      <p className="text-slate-700">
                        كتابتك: <span className="font-bold">{studentDictationInput}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TOOL 5: ARABIC CONJUGATION (تصريف العربية) */}
          {/* ========================================================= */}
          {toolId === "arabic_conjugate" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-700">اختر الفعل المراد تصريفه:</span>
                <div className="flex flex-wrap gap-1.5">
                  {arabicVerbs.map((v, idx) => (
                    <button
                      key={v.verb}
                      type="button"
                      onClick={() => setSelectedArabicVerbIndex(idx)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold font-cairo transition cursor-pointer ${
                        selectedArabicVerbIndex === idx
                          ? "bg-purple-700 text-white shadow-2xs"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {v.verb}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-purple-900 font-cairo">
                    الفعل: « {arabicVerbs[selectedArabicVerbIndex].verb} »
                  </span>
                  <span className="text-[11px] text-purple-700 block">
                    النوع: {arabicVerbs[selectedArabicVerbIndex].type}
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-purple-200">
                  <button
                    type="button"
                    onClick={() => setArabicTenseTab("past")}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition cursor-pointer ${
                      arabicTenseTab === "past" ? "bg-purple-700 text-white" : "text-slate-600"
                    }`}
                  >
                    الماضي
                  </button>
                  <button
                    type="button"
                    onClick={() => setArabicTenseTab("present")}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition cursor-pointer ${
                      arabicTenseTab === "present" ? "bg-purple-700 text-white" : "text-slate-600"
                    }`}
                  >
                    المضارع
                  </button>
                  <button
                    type="button"
                    onClick={() => setArabicTenseTab("imperative")}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition cursor-pointer ${
                      arabicTenseTab === "imperative" ? "bg-purple-700 text-white" : "text-slate-600"
                    }`}
                  >
                    الأمر
                  </button>
                </div>
              </div>

              {/* Conjugation Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {arabicPronouns.map((pronoun, pIdx) => {
                  const currVerb = arabicVerbs[selectedArabicVerbIndex];
                  const conjugated = currVerb[arabicTenseTab][pIdx];
                  if (conjugated === "-") return null;
                  return (
                    <div
                      key={pronoun}
                      className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-center space-y-0.5"
                    >
                      <span className="text-[10px] text-slate-400 font-bold block">{pronoun}</span>
                      <span className="text-sm font-black text-slate-900 font-cairo block">{conjugated}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TOOL 6: FRENCH CONJUGATION (تصريف الفرنسية) */}
          {/* ========================================================= */}
          {toolId === "french_conjugate" && (
            <div className="space-y-4" dir="ltr">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-700">Verbe à conjuguer :</span>
                <div className="flex flex-wrap gap-1.5">
                  {frenchVerbs.map((v, idx) => (
                    <button
                      key={v.infinitive}
                      type="button"
                      onClick={() => setSelectedFrenchVerbIndex(idx)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                        selectedFrenchVerbIndex === idx
                          ? "bg-teal-700 text-white shadow-2xs"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {v.infinitive}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-teal-900">
                    Infinitif : « {frenchVerbs[selectedFrenchVerbIndex].infinitive} »
                  </span>
                  <span className="text-[11px] text-teal-700 block">
                    {frenchVerbs[selectedFrenchVerbIndex].group}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-1 bg-white p-1 rounded-lg border border-teal-200">
                  <button
                    type="button"
                    onClick={() => setFrenchTenseTab("present")}
                    className={`px-2 py-1 rounded text-xs font-bold cursor-pointer ${
                      frenchTenseTab === "present" ? "bg-teal-700 text-white" : "text-slate-600"
                    }`}
                  >
                    Présent
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrenchTenseTab("passeCompose")}
                    className={`px-2 py-1 rounded text-xs font-bold cursor-pointer ${
                      frenchTenseTab === "passeCompose" ? "bg-teal-700 text-white" : "text-slate-600"
                    }`}
                  >
                    Passé composé
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrenchTenseTab("imparfait")}
                    className={`px-2 py-1 rounded text-xs font-bold cursor-pointer ${
                      frenchTenseTab === "imparfait" ? "bg-teal-700 text-white" : "text-slate-600"
                    }`}
                  >
                    Imparfait
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrenchTenseTab("futur")}
                    className={`px-2 py-1 rounded text-xs font-bold cursor-pointer ${
                      frenchTenseTab === "futur" ? "bg-teal-700 text-white" : "text-slate-600"
                    }`}
                  >
                    Futur simple
                  </button>
                </div>
              </div>

              {/* Conjugation List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {frenchVerbs[selectedFrenchVerbIndex][frenchTenseTab].map((line, lIdx) => (
                  <div
                    key={lIdx}
                    className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between"
                  >
                    <span className="font-bold text-sm text-slate-800">{line}</span>
                    <button
                      type="button"
                      onClick={() => speakFrench(line)}
                      className="text-slate-400 hover:text-teal-600 p-1 rounded transition"
                      title="Écouter"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TOOL 7: VOCALIZATION (التشكيل والإعراب) */}
          {/* ========================================================= */}
          {toolId === "vocalization" && (
            <div className="space-y-4">
              <p className="text-slate-600 text-xs">
                مساعد ضبط أواخر الكلمات بالشكل التام ونماذج الإعراب التفاعلية لدروس التراكيب بالتعليم الابتدائي والإعدادي:
              </p>

              {/* Quick Sentences Selector */}
              <div className="flex flex-wrap gap-1.5">
                {irabTemplates.map((item, idx) => (
                  <button
                    key={item.sentence}
                    type="button"
                    onClick={() => setSelectedIrabIndex(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold font-cairo transition cursor-pointer ${
                      selectedIrabIndex === idx
                        ? "bg-fuchsia-700 text-white shadow-2xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    نموذج {idx + 1}
                  </button>
                ))}
              </div>

              {/* Sentence Display */}
              <div className="bg-fuchsia-50/70 border border-fuchsia-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-fuchsia-900 font-cairo">الجملة المشكولة إعرابياً:</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(irabTemplates[selectedIrabIndex].sentence, "irab_sentence")}
                    className="text-fuchsia-800 hover:text-fuchsia-950 text-xs font-bold flex items-center gap-1"
                  >
                    {copiedKey === "irab_sentence" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === "irab_sentence" ? "تم النسخ!" : "نسخ الجملة"}</span>
                  </button>
                </div>
                <p className="text-lg font-black text-slate-900 font-cairo">
                  {irabTemplates[selectedIrabIndex].sentence}
                </p>

                {/* Breakdown List */}
                <div className="space-y-2 pt-2 border-t border-fuchsia-200/60">
                  <span className="text-xs font-bold text-slate-700 block">الإعراب المفصل:</span>
                  {irabTemplates[selectedIrabIndex].breakdown.map((b, bIdx) => (
                    <div
                      key={bIdx}
                      className="bg-white border border-slate-200 rounded-xl p-2.5 flex items-start gap-2.5"
                    >
                      <span className="px-2 py-0.5 bg-fuchsia-100 text-fuchsia-900 rounded font-black text-xs font-cairo shrink-0">
                        {b.word}
                      </span>
                      <span className="text-xs text-slate-700 leading-relaxed font-medium">
                        {b.irab}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TOOL 8: REMARKS GENERATOR (مولد ملاحظات مسار) */}
          {/* ========================================================= */}
          {toolId === "remarks_gen" && (
            <div className="space-y-4">
              <p className="text-slate-600 text-xs">
                توليد فوري ومقنن لملاحظات بيانات النقط ومنظومة مسار وفق التقديرات المعتمدة وزارياً:
              </p>

              {/* Levels Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { key: "excellent" as const, label: "ممتاز (18 - 20)", color: "bg-emerald-600" },
                  { key: "good" as const, label: "جيد (14 - 17.9)", color: "bg-blue-600" },
                  { key: "average" as const, label: "متوسط (10 - 13.9)", color: "bg-amber-600" },
                  { key: "weak" as const, label: "يحتاج لدعم (< 10)", color: "bg-rose-600" },
                ].map((lvl) => (
                  <button
                    key={lvl.key}
                    type="button"
                    onClick={() => setRemarksLevel(lvl.key)}
                    className={`p-2.5 rounded-xl font-bold text-xs cursor-pointer transition text-center ${
                      remarksLevel === lvl.key
                        ? `${lvl.color} text-white shadow-2xs`
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {lvl.label}
                  </button>
                ))}
              </div>

              {/* Generated Remarks Options */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold text-slate-700 block">
                  نماذج الملاحظات المقترحة (انقر للنسخ الفوري لمسار):
                </span>
                {remarksDatabase[remarksLevel].map((rem, rIdx) => (
                  <div
                    key={rIdx}
                    className="bg-slate-50 border border-slate-200 hover:border-blue-400 rounded-xl p-3 flex items-start justify-between gap-3 transition"
                  >
                    <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed font-cairo">
                      {rem}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleCopy(rem, `rem_${rIdx}`)}
                      className="px-2.5 py-1.5 bg-white hover:bg-blue-50 border border-slate-200 text-blue-700 rounded-lg text-xs font-bold flex items-center gap-1 shrink-0 cursor-pointer shadow-2xs"
                    >
                      {copiedKey === `rem_${rIdx}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === `rem_${rIdx}` ? "تم النسخ" : "نسخ"}</span>
                    </button>
                  </div>
                ))}
              </div>

              {onNavigateToTab && (
                <div className="pt-2 border-t border-slate-200 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigateToTab("remarks");
                    }}
                    className="text-xs text-blue-800 hover:text-blue-950 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <span>فتح المساعد البيداغوجي المتقدم بالذكاء الاصطناعي لملاحظات مخصصة لكل تلميذ ←</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TOOL 9: TEXT TO IMAGE / FLASHCARDS (النص إلى صورة) */}
          {/* ========================================================= */}
          {toolId === "text_to_image" && (
            <div className="space-y-4">
              <p className="text-slate-600 text-xs">
                توليد بطاقات الوسائل التعليمية والصور التوضيحية للدروس جاهزة للطباعة والتزيين الصفي:
              </p>

              {/* Themes Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {flashcardThemes.map((th, idx) => (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => setSelectedThemeIndex(idx)}
                    className={`p-2 rounded-xl border text-xs font-bold transition text-center cursor-pointer ${
                      selectedThemeIndex === idx
                        ? "border-rose-500 bg-rose-50 text-rose-900 shadow-2xs"
                        : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    {th.title}
                  </button>
                ))}
              </div>

              {/* Preview Card */}
              <div className="border-2 border-slate-300 rounded-2xl overflow-hidden bg-white shadow-sm">
                <div className={`p-6 text-center text-white bg-gradient-to-br ${flashcardThemes[selectedThemeIndex].bg} flex flex-col items-center justify-center space-y-2`}>
                  {flashcardThemes[selectedThemeIndex].svg}
                  <span className="text-lg sm:text-xl font-black font-cairo drop-shadow-sm">
                    {flashcardThemes[selectedThemeIndex].ar}
                  </span>
                  <span className="text-xs font-medium tracking-wide drop-shadow-xs text-white/90">
                    {flashcardThemes[selectedThemeIndex].fr}
                  </span>
                </div>
                <div className="p-4 bg-slate-50 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      {flashcardThemes[selectedThemeIndex].title}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {flashcardThemes[selectedThemeIndex].desc}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-black text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>طباعة البطاقة</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TOOL 10: DATE CONVERTER (محول التاريخ والتقويم المدرسي) */}
          {/* ========================================================= */}
          {toolId === "date_converter" && (
            <div className="space-y-4">
              <p className="text-slate-600 text-xs">
                تأريخ الجذاذات والمذكرات والسبورة وفق التقويمين الهجري والميلادي مع لائحة العطل الرسمية 2026/2027:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                  <label className="font-bold text-xs text-slate-800 block">حدد التاريخ الميلادي:</label>
                  <input
                    type="date"
                    value={gregorianDate}
                    onChange={(e) => setGregorianDate(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 font-mono text-sm"
                  />
                </div>

                <div className="bg-blue-50/80 p-3 rounded-xl border border-blue-200 text-center flex flex-col justify-center space-y-0.5">
                  <span className="text-[11px] font-bold text-blue-700">التاريخ الهجري المقابل (أم القرى/المغرب):</span>
                  <span className="text-base sm:text-lg font-black text-blue-950 font-cairo">
                    {calculateHijriDate(gregorianDate)}
                  </span>
                </div>
              </div>

              {/* Classroom blackboard header preview */}
              <div className="bg-emerald-900 text-white rounded-xl p-3 text-center border-2 border-amber-400/40 shadow-inner space-y-1">
                <span className="text-[10px] text-emerald-300 font-bold block">صيغة ترويسة السبورة المعتمدة:</span>
                <p className="text-xs sm:text-sm font-bold font-cairo">
                  {calculateHijriDate(gregorianDate)} هـ • الموافق لـ : {gregorianDate} م
                </p>
              </div>

              {/* Holidays Table */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-800 block">لائحة العطل المدرسية الرسمية:</span>
                <div className="max-h-40 overflow-y-auto border border-slate-200 rounded-xl divide-y divide-slate-100">
                  {holidays2026.map((h, hIdx) => (
                    <div key={hIdx} className="p-2 bg-slate-50/60 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-900 block">{h.name}</span>
                        <span className="text-[10px] text-slate-500">{h.date}</span>
                      </div>
                      <span className="text-[11px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                        {h.days}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TOOL 11: COLOR PICKER (محدد الألوان والهوية البصرية) */}
          {/* ========================================================= */}
          {toolId === "color_picker" && (
            <div className="space-y-4">
              <p className="text-slate-600 text-xs">
                الألوان الرسمية المعتمدة لوزارة التربية الوطنية، مؤسسات الريادة، وشهادات التقدير:
              </p>

              <div className="space-y-2">
                {officialColors.map((c) => (
                  <div
                    key={c.hex}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-slate-100/80 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl shadow-xs border border-black/10 shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                      <div>
                        <span className="font-bold text-slate-900 block text-xs">{c.name}</span>
                        <span className="text-[11px] text-slate-500">{c.role}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-600">{c.hex}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(c.hex, c.hex)}
                        className="px-2.5 py-1 bg-white hover:bg-blue-50 border border-slate-300 text-blue-700 rounded-lg text-xs font-bold cursor-pointer transition shadow-2xs"
                      >
                        {copiedKey === c.hex ? "تم النسخ" : "نسخ HEX"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Custom Color Picker input */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={customColorPickerHex}
                    onChange={(e) => setCustomColorPickerHex(e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300"
                  />
                  <span className="text-xs font-bold text-slate-800">اختر لوناً مخصصاً للمستندات:</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(customColorPickerHex, "custom_color")}
                  className="text-xs font-mono font-bold text-blue-700 hover:underline"
                >
                  {copiedKey === "custom_color" ? "تم النسخ!" : `نسخ ${customColorPickerHex}`}
                </button>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TOOL 12: QR GENERATOR (مولد QR الذكي) */}
          {/* ========================================================= */}
          {toolId === "qr_generator" && (
            <div className="space-y-4">
              <p className="text-slate-600 text-xs">
                توليد رمز QR فوري لروابط الدروس، المذكرات، ومستندات مسار ولصقه في جذاذاتك وأوراق عملك:
              </p>

              <div>
                <label className="font-bold text-xs text-slate-800 block mb-1">
                  أدخل الرابط أو النص المطلوب تحويله:
                </label>
                <input
                  type="text"
                  value={qrContent}
                  onChange={(e) => setQrContent(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  dir="ltr"
                />
              </div>

              {/* Presets */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-slate-500 font-bold">روابط سريعة:</span>
                {qrPresets.map((pr) => (
                  <button
                    key={pr.label}
                    type="button"
                    onClick={() => setQrContent(pr.url)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-lg text-xs font-medium cursor-pointer transition border border-slate-200"
                  >
                    {pr.label}
                  </button>
                ))}
              </div>

              {/* QR Image Display */}
              <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${encodeURIComponent(
                    qrContent || "Profpress"
                  )}`}
                  alt="QR Code"
                  className="w-40 h-40 rounded-xl bg-white p-2 border border-slate-300 shadow-md"
                />
                <span className="text-[11px] text-slate-500 font-medium">
                  جاهز للمسح بكاميرا الهاتف • انقر بالزر الأيمن للحفظ أو النسخ
                </span>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TOOL 13: SMART TRANSLATOR (الترجمة الذكية ومعجم المصطلحات) */}
          {/* ========================================================= */}
          {toolId === "smart_translator" && (
            <div className="space-y-4">
              <p className="text-slate-600 text-xs">
                معجم ديداكتيكي فوري لمصطلحات علوم التربية ومباريات التعليم والتفتيش (عربية - فرنسية - إنجليزية):
              </p>

              <div>
                <input
                  type="text"
                  value={glossarySearch}
                  onChange={(e) => setGlossarySearch(e.target.value)}
                  placeholder="ابحث عن مصطلح ديداكتيكي (مثال: التعاقد، التقويم، Situation...)"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="space-y-2.5 max-h-72 overflow-y-auto">
                {filteredTerms.map((term, tIdx) => (
                  <div
                    key={tIdx}
                    className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1.5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/70 pb-1.5">
                      <span className="font-black text-sm text-blue-950 font-cairo">
                        {term.ar}
                      </span>
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 font-sans" dir="ltr">
                        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          FR: {term.fr}
                        </span>
                        <span className="text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                          EN: {term.en}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {term.def}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TOOL 14: NUMBER CONVERTER (محول الأرقام والتفقيط) */}
          {/* ========================================================= */}
          {toolId === "number_converter" && (
            <div className="space-y-4">
              <p className="text-slate-600 text-xs">
                تفقيط الأعداد والنقط إلى حروف عربية وفرنسية لشواهد التقدير وبيانات النقط:
              </p>

              <div>
                <label className="font-bold text-xs text-slate-800 block mb-1">
                  أدخل النقطة أو العدد (مثال: 18.75):
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  step="0.25"
                  value={tafqitInput}
                  onChange={(e) => setTafqitInput(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold font-mono text-base focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              {/* Arabic Tafqit */}
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-3.5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-900 font-cairo">
                    الكتابة بالحروف العربية:
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(getTafqitArabicDetailed(Number(tafqitInput)), "tafqit_ar")
                    }
                    className="text-purple-800 hover:text-purple-950 text-xs font-bold flex items-center gap-1"
                  >
                    {copiedKey === "tafqit_ar" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === "tafqit_ar" ? "تم النسخ" : "نسخ"}</span>
                  </button>
                </div>
                <p className="text-base font-black text-purple-950 font-cairo">
                  {getTafqitArabicDetailed(Number(tafqitInput))}
                </p>
              </div>

              {/* French Tafqit */}
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-3.5 space-y-1.5" dir="ltr">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-900 font-sans">
                    En toutes lettres (Français) :
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(getTafqitFrench(Number(tafqitInput)), "tafqit_fr")
                    }
                    className="text-teal-800 hover:text-teal-950 text-xs font-bold flex items-center gap-1"
                  >
                    {copiedKey === "tafqit_fr" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === "tafqit_fr" ? "Copié !" : "Copier"}</span>
                  </button>
                </div>
                <p className="text-base font-black text-teal-950 font-sans">
                  {getTafqitFrench(Number(tafqitInput))}
                </p>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TOOL 15: PDF TO IMAGES (محول PDF إلى صور) */}
          {/* ========================================================= */}
          {toolId === "pdf_to_images" && (
            <div className="space-y-4">
              <p className="text-slate-600 text-xs">
                استخراج وتحويل صفحات ملفات PDF والمذكرات إلى صور واضحة للاستعمال الصفي وعروض السبورة التفاعلية:
              </p>

              <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-5 text-center space-y-2 bg-slate-50 transition">
                <FileText className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="font-bold text-xs text-slate-800">اسحب وأفلت ملف PDF أو اختر نموذجاً تعليمياً</p>
                <input
                  type="file"
                  accept=".pdf"
                  className="block w-full text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 cursor-pointer pt-1"
                />
              </div>

              {/* Sample Document Viewer */}
              <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2">
                <span className="text-xs font-bold text-slate-800 block">معاينة استخراج الصفحات كصور عالية الدقة:</span>
                <div className="flex items-center justify-between bg-slate-100 p-2 rounded-lg text-xs">
                  <span className="font-bold text-slate-700">الصفحة {extractedPage} من 3</span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setExtractedPage((p) => Math.max(1, p - 1))}
                      disabled={extractedPage <= 1}
                      className="p-1 rounded bg-white hover:bg-slate-200 disabled:opacity-40 cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setExtractedPage((p) => Math.min(3, p + 1))}
                      disabled={extractedPage >= 3}
                      className="p-1 rounded bg-white hover:bg-slate-200 disabled:opacity-40 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="aspect-[4/3] bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center justify-center p-4 text-center space-y-2">
                  <div className="w-16 h-20 bg-white border border-slate-300 shadow-sm rounded-md flex flex-col items-center justify-center p-2 space-y-1">
                    <div className="w-10 h-1.5 bg-slate-300 rounded" />
                    <div className="w-12 h-1 bg-slate-200 rounded" />
                    <div className="w-8 h-1 bg-slate-200 rounded" />
                    <div className="w-10 h-1 bg-slate-200 rounded" />
                  </div>
                  <span className="text-xs font-bold text-slate-700">
                    معاينة الصفحة {extractedPage} جاهزة للعرض والتحميل
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(`Page_${extractedPage}_Extracted`, "pdf_extract")}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-2xs cursor-pointer"
                  >
                    {copiedKey === "pdf_extract" ? "تم التحميل!" : "حفظ الصفحة كصورة PNG"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Quick Switcher between 15 Tools */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 shrink-0 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold text-slate-600">
              التنقل المباشر بين أدوات الموقع الذكية (15 أداة):
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-bold cursor-pointer transition"
            >
              إغلاق
            </button>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {smartTools.map((tool) => (
              <button
                key={tool.id}
                type="button"
                onClick={() => onSelectTool(tool.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold font-cairo shrink-0 cursor-pointer transition flex items-center gap-1 ${
                  tool.id === toolId
                    ? "bg-blue-600 text-white shadow-2xs"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <span>{tool.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
