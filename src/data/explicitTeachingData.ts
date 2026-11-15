import { GRADE6_EXPLICIT_TARL_LESSONS } from "./grade6ExplicitTarlData";
import { ALL_REMAINING_LEVELS_EXPLICIT_TARL_LESSONS } from "./allLevelsExplicitTarlData";

export type ExplicitLevelKey =
  | "1aep"
  | "2aep"
  | "3aep"
  | "4aep"
  | "5aep"
  | "6aep"
  | "shared";

export type ExplicitSubjectKey = "arabic" | "french" | "math" | "science";

export interface ExplicitLessonItem {
  id: string;
  level: ExplicitLevelKey;
  subject: ExplicitSubjectKey;
  unit: number; // Unité 1 à 6
  week: number; // Semaine 1 à 4
  title: string;
  titleFr?: string;
  objective: string;
  pptUrl?: string;
  pdfUrl?: string;
  driveUrl?: string;
  internalOnly?: boolean;
  isTarl?: boolean;
  fileSize?: string;
  steps: {
    preparation: string; // 1. التهيئة والتذكير
    modeling: string;    // 2. النمذجة: "أنا أعمل"
    guided: string;      // 3. الممارسة الموجهة: "نحن نعمل معاً"
    autonomous: string;  // 4. الممارسة المستقلة: "أنت تعمل بمفردك"
    evaluation: string;  // 5. التقويم والتغذية الراجعة
  };
  keyConcepts?: string[];
  durationMinutes?: number;
  summaryPoints?: string[];
  slidesOutline?: { slideTitle: string; content: string }[];
  exercisesWithCorrection?: { question: string; answer: string }[];
}

export interface ExplicitTeachingResourcePackage {
  id: string;
  level: ExplicitLevelKey;
  levelNameAr: string;
  levelNameFr: string;
  arabicDriveUrl: string;
  frenchDriveUrl: string;
  mathDriveUrl: string;
  scienceDriveUrl: string;
  guideBookletUrl: string;
  studentBookletUrl: string;
  totalPptCount: number;
  internalOnly?: boolean;
}

export interface ExplicitSubjectFolder {
  id: ExplicitSubjectKey;
  nameAr: string;
  nameFr: string;
  driveUrl: string;
  folderId: string;
  description: string;
  levelsCovered: string;
  accentColor: "emerald" | "blue" | "amber" | "teal";
}

export interface ExplicitRoleRow {
  stageAr: string;
  stageCode: string;
  teacherRole: string;
  studentRole: string;
}

export interface ExplicitTeachingPageData {
  dataVersion: number;
  pageTitle: string;
  pageSubtitle: string;
  badgeText: string;
  officialUrl: string;
  officialFolderId: string;
  telmidticeAppUrl: string;
  telmidticeVersion: string;
  lastUpdatedText: string;
  subjectFolders: ExplicitSubjectFolder[];
  introduction: {
    title: string;
    description: string;
    steps: {
      number: number;
      nameAr: string;
      nameFr: string;
      tagline: string;
      description: string;
      color: string;
      icon: string;
    }[];
  };
  roleComparison: ExplicitRoleRow[];
  didacticFoundations: {
    title: string;
    summary: string;
    fieldTipTitle: string;
    fieldTipBody: string;
    practicalTips: string[];
    references: string[];
  };
  packages: ExplicitTeachingResourcePackage[];
  lessons: ExplicitLessonItem[];
}

export const MAIN_EXPLICIT_DRIVE_FOLDER_ID = "";
export const MAIN_EXPLICIT_DRIVE_URL = "";
export const TELMIDTICE_PIONEER_EXE_URL = "";

export const extractDriveFolderId = (_url?: string): string | null => null;

const ALL_DEFAULT_LESSONS: ExplicitLessonItem[] = [
  ...GRADE6_EXPLICIT_TARL_LESSONS,
  ...ALL_REMAINING_LEVELS_EXPLICIT_TARL_LESSONS,
];

const countLessonsForLevel = (level: ExplicitLevelKey): number =>
  ALL_DEFAULT_LESSONS.filter((l) => l.level === level).length;

export const DEFAULT_EXPLICIT_TEACHING_DATA: ExplicitTeachingPageData = {
  dataVersion: 4,
  pageTitle: "دروس التعليم الصريح ودعم طارل TaRL (2026 / 2027) — جميع المستويات بالمدرسة الرائدة",
  pageSubtitle:
    "المكتبة الرقمية المتكاملة لأساتذة مدارس الريادة بالمغرب: جميع دروس التعليم الصريح وأنشطة الدعم المكثف طارل (TaRL) من المستوى الأول إلى المستوى السادس (1AEP إلى 6AEP) والأقسام المشتركة في العربية، الفرنسية، الرياضيات، والنشاط العلمي، مع المعاينة الكاملة والتحميل المباشر داخل الموقع (Word / PDF / طباعة A4) بدون أي روابط خارجية.",
  badgeText: "النسخة المحينة 2026 / 2027 · تحميل داخلي 100% لجميع المستويات",
  officialUrl: "",
  officialFolderId: "",
  telmidticeAppUrl: "",
  telmidticeVersion: "v1.0.9",
  lastUpdatedText: "موسم 2026 / 2027",
  subjectFolders: [
    {
      id: "arabic",
      nameAr: "اللغة العربية",
      nameFr: "Langue Arabe",
      driveUrl: "",
      folderId: "",
      description: "دروس القراءة المقطعية، المفردات، الظواهر اللغوية، التراكيب والإملاء، ودعم طارل (1AEP إلى 6AEP + مشترك)",
      levelsCovered: "1AEP إلى 6AEP + مشترك",
      accentColor: "emerald",
    },
    {
      id: "french",
      nameAr: "اللغة الفرنسية",
      nameFr: "Langue Française",
      driveUrl: "",
      folderId: "",
      description: "Lecture explicite, Oral, Grammaire, Conjugaison, Orthographe & Remédiation TaRL (tous niveaux)",
      levelsCovered: "1AEP إلى 6AEP + مشترك",
      accentColor: "blue",
    },
    {
      id: "math",
      nameAr: "الرياضيات",
      nameFr: "Mathématiques",
      driveUrl: "",
      folderId: "",
      description: "الحساب الذهني، العمليات الأربع، الكسور، التناسبية، الهندسة والقياس، ودعم طارل TaRL",
      levelsCovered: "1AEP إلى 6AEP + مشترك",
      accentColor: "amber",
    },
    {
      id: "science",
      nameAr: "النشاط العلمي",
      nameFr: "Éveil Scientifique",
      driveUrl: "",
      folderId: "",
      description: "دروس نهج التقصي العلمي والمفاهيم البيولوجية والفيزيائية وعلوم المادة لجميع المستويات",
      levelsCovered: "1AEP إلى 6AEP + مشترك",
      accentColor: "teal",
    },
  ],
  introduction: {
    title: "الهندسة البيداغوجية للتعليم الصريح (Enseignement Explicite)",
    description:
      "مقاربة تدريسية مباشرة ومنهجية تعتمدها مدارس الريادة بالمغرب، ترتكز على تقطيع المعارف إلى وحدات صغرى متوافقة مع سعة الذاكرة العاملة للمتعلم، ونقل المسؤولية المعرفية تدريجياً من الأستاذ إلى التلميذ عبر خمس مراحل دقيقة:",
    steps: [
      {
        number: 1,
        nameAr: "التهيئة والربط",
        nameFr: "Ouverture / Rappel",
        tagline: "تنشيط المكتسبات وإعلان الهدف",
        description:
          "مراجعة سريعة للمكتسبات السابقة، والتصريح الواضح بالهدف التعلمي ومعايير النجاح، لتهيئة الانتباه وإبراز أهمية المهارة.",
        color: "amber",
        icon: "Sparkles",
      },
      {
        number: 2,
        nameAr: "النمذجة",
        nameFr: "Modelage",
        tagline: "«أنا أعمل» (I Do / Je fais)",
        description:
          "الأستاذ يشرح وينفذ المهمة بصوت مرتفع مع توضيح استراتيجيات التفكير وحل المشكلات، وتقديم نماذج صحيحة وأمثلة مضادة.",
        color: "blue",
        icon: "User",
      },
      {
        number: 3,
        nameAr: "الممارسة الموجهة",
        nameFr: "Pratique guidée",
        tagline: "«نحن نعمل معاً» (We Do)",
        description:
          "إشراك التلاميذ في حل أمثلة مماثلة بشكل جماعي وثنائي وعلى الألواح، مع تقديم توجيه فوري وتغذية راجعة لحظية.",
        color: "emerald",
        icon: "Users",
      },
      {
        number: 4,
        nameAr: "الممارسة المستقلة",
        nameFr: "Pratique autonome",
        tagline: "«أنت تعمل بمفردك» (You Do)",
        description:
          "المتعلم ينجز التمارين بشكل ذاتي على كراسة التلميذ أو الدفتر دون مساعدة، لبناء الاستقلالية المعرفية وترسيخ الأوتوماتيكية.",
        color: "indigo",
        icon: "CheckCircle2",
      },
      {
        number: 5,
        nameAr: "التقويم والتحقق الفوري",
        nameFr: "Objectivation & Bilan",
        tagline: "قياس التملك وتثبيت الخلاصة",
        description:
          "سؤال تحقق نهائي ومراجعة ما تم تعلمه عبر شبكات التفريغ لرصد المتعثرين وبرمجة حصص الدعم المندمج فورياً.",
        color: "rose",
        icon: "Award",
      },
    ],
  },
  roleComparison: [
    {
      stageAr: "المرحلة التمهيدية والنمذجة",
      stageCode: "I Do",
      teacherRole: "عرض الهدف، الربط بالتعلمات السابقة، والنمذجة بصوت مرتفع خطوة بخطوة.",
      studentRole: "الاستماع الواعي، تتبع الشرائح، والملاحظة المركزة لاستراتيجية الحل.",
    },
    {
      stageAr: "الممارسة الموجهة",
      stageCode: "We Do",
      teacherRole: "تدبير العمل الجماعي والثنائي، تقديم التوجيه الفوري والدعم التراجعي.",
      studentRole: "المشاركة الفاعلة على الألواح وتصحيح التعثرات مع الأستاذ والأقران.",
    },
    {
      stageAr: "الممارسة المستقلة",
      stageCode: "You Do",
      teacherRole: "المراقبة الميدانية بين الصفوف، التتبع، والتقويم الفردي للأداء.",
      studentRole: "إنجاز التمارين بشكل ذاتي على الكراسة وبناء الاستقلالية المعرفية.",
    },
  ],
  didacticFoundations: {
    title: "المرتكزات الديداكتيكية ومتطلبات تنزيل دروس التعليم الصريح ودعم طارل",
    summary:
      "ترتكز مقاربة التعليم الصريح على نظريات المعالجة القائمة على علم النفس المعرفي، والتي تؤكد أن الذاكرة العاملة لدى الطفل محدودة السعة، مما يحتم تقطيع المعارف إلى وحدات صغرى قابلة للاستيعاب. وتتكامل هذه المنهجية مع برنامج الدعم المكثف طارل (TaRL) لتقليص الفوارق في القراءة والحساب وتثبيت التعلمات الأساس لجميع المستويات من الأول إلى السادس.",
    fieldTipTitle: "نصيحة من الميدان التربوي",
    fieldTipBody:
      "من واقع التجربة الميدانية في أقسام مدارس الريادة، يُنصح بربط التهيئة في بداية الحصة بالخرائط الذهنية لرسم «خريطة طريق» واضحة للمتعلمين، وتنزيل بطاقات التحميل المطبوعة أو بصيغة Word لتكييف التمارين مع مستوى تحكم التلاميذ في روائز طارل.",
    practicalTips: [
      "الالتزام الصارم بالإيقاعات الزمنية المقترحة لكل نشاط ديداكتيكي دون إطالة مفرطة.",
      "تنويع أساليب التغذية الراجعة الفورية وتفادي التأجيل لضمان تصحيح التمثلات الخاطئة في حينها.",
      "اعتماد التدريس وفق المستوى المناسب (TaRL) في مطلع الأسدوس ومحطات الدعم المندمج.",
      "تتبع أثر التعلمات عبر شبكات تفريغ دقيقة لرصد المتعثرين وتوجيه الدعم الفردي.",
    ],
    references: [
      "المقرر الوزاري لتنظيم السنة الدراسية والدلائل الديداكتيكية الرسمية لوزارة التربية الوطنية والتعليم الأولي والرياضة.",
      "الأطر المرجعية والبطاقات المنهجية لمشروع مؤسسات الريادة (التعليم الصريح ومقاربة طارل TaRL).",
    ],
  },
  packages: [
    {
      id: "pkg_1aep",
      level: "1aep",
      levelNameAr: "المستوى الأول ابتدائي (صريح & TaRL)",
      levelNameFr: "1ère Année Primaire (1AEP)",
      arabicDriveUrl: "",
      frenchDriveUrl: "",
      mathDriveUrl: "",
      scienceDriveUrl: "",
      guideBookletUrl: "",
      studentBookletUrl: "",
      totalPptCount: countLessonsForLevel("1aep"),
      internalOnly: true,
    },
    {
      id: "pkg_2aep",
      level: "2aep",
      levelNameAr: "المستوى الثاني ابتدائي (صريح & TaRL)",
      levelNameFr: "2ème Année Primaire (2AEP)",
      arabicDriveUrl: "",
      frenchDriveUrl: "",
      mathDriveUrl: "",
      scienceDriveUrl: "",
      guideBookletUrl: "",
      studentBookletUrl: "",
      totalPptCount: countLessonsForLevel("2aep"),
      internalOnly: true,
    },
    {
      id: "pkg_3aep",
      level: "3aep",
      levelNameAr: "المستوى الثالث ابتدائي (صريح & TaRL)",
      levelNameFr: "3ème Année Primaire (3AEP)",
      arabicDriveUrl: "",
      frenchDriveUrl: "",
      mathDriveUrl: "",
      scienceDriveUrl: "",
      guideBookletUrl: "",
      studentBookletUrl: "",
      totalPptCount: countLessonsForLevel("3aep"),
      internalOnly: true,
    },
    {
      id: "pkg_4aep",
      level: "4aep",
      levelNameAr: "المستوى الرابع ابتدائي (صريح & TaRL)",
      levelNameFr: "4ème Année Primaire (4AEP)",
      arabicDriveUrl: "",
      frenchDriveUrl: "",
      mathDriveUrl: "",
      scienceDriveUrl: "",
      guideBookletUrl: "",
      studentBookletUrl: "",
      totalPptCount: countLessonsForLevel("4aep"),
      internalOnly: true,
    },
    {
      id: "pkg_5aep",
      level: "5aep",
      levelNameAr: "المستوى الخامس ابتدائي (صريح & TaRL)",
      levelNameFr: "5ème Année Primaire (5AEP)",
      arabicDriveUrl: "",
      frenchDriveUrl: "",
      mathDriveUrl: "",
      scienceDriveUrl: "",
      guideBookletUrl: "",
      studentBookletUrl: "",
      totalPptCount: countLessonsForLevel("5aep"),
      internalOnly: true,
    },
    {
      id: "pkg_6aep",
      level: "6aep",
      levelNameAr: "المستوى السادس ابتدائي (تحيين TaRL & صريح)",
      levelNameFr: "6ème Année Primaire (6AEP)",
      arabicDriveUrl: "",
      frenchDriveUrl: "",
      mathDriveUrl: "",
      scienceDriveUrl: "",
      guideBookletUrl: "",
      studentBookletUrl: "",
      totalPptCount: countLessonsForLevel("6aep"),
      internalOnly: true,
    },
    {
      id: "pkg_shared",
      level: "shared",
      levelNameAr: "الأقسام المشتركة (التدبير التناوبي & TaRL)",
      levelNameFr: "Classes Multiniveaux (مشترك)",
      arabicDriveUrl: "",
      frenchDriveUrl: "",
      mathDriveUrl: "",
      scienceDriveUrl: "",
      guideBookletUrl: "",
      studentBookletUrl: "",
      totalPptCount: countLessonsForLevel("shared"),
      internalOnly: true,
    },
  ],
  lessons: ALL_DEFAULT_LESSONS,
};
