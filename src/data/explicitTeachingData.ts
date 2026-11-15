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

export const MAIN_EXPLICIT_DRIVE_FOLDER_ID = "1B7Rjl5bx2iCqdMbNohaFe_bDrjjG-IMl";
export const MAIN_EXPLICIT_DRIVE_URL =
  "https://drive.google.com/drive/folders/1B7Rjl5bx2iCqdMbNohaFe_bDrjjG-IMl";
export const TELMIDTICE_PIONEER_EXE_URL =
  "https://streaming.dice.ma/telmidtice/TelmidTice-EcolesPionnieres-v1.0.9.exe";

export const extractDriveFolderId = (url?: string): string | null => {
  if (!url) return null;
  const match = url.match(/folders\/([a-zA-Z0-9_-]+)/);
  if (match) return match[1];
  const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return idMatch ? idMatch[1] : null;
};

export const DEFAULT_EXPLICIT_TEACHING_DATA: ExplicitTeachingPageData = {
  dataVersion: 2,
  pageTitle: "دروس التعليم الصريح الجديدة 2026 / 2027 جميع المستويات بالمدرسة الرائدة",
  pageSubtitle:
    "الدليل العملي والحقيبة الرقمية المحدثة لأساتذة مدارس الريادة (Écoles Pionnières): عروض البوربوينت التفاعلية الجديدة (PPTX / PPSX) لمواد اللغة العربية، الفرنسية، الرياضيات، والنشاط العلمي، لجميع المستويات (1AEP إلى 6AEP والأقسام المشتركة) مع المعاينة والتحميل المباشر.",
  badgeText: "النسخة المحينة 2026 / 2027 · مدارس الريادة",
  officialUrl: MAIN_EXPLICIT_DRIVE_URL,
  officialFolderId: MAIN_EXPLICIT_DRIVE_FOLDER_ID,
  telmidticeAppUrl: TELMIDTICE_PIONEER_EXE_URL,
  telmidticeVersion: "v1.0.9",
  lastUpdatedText: "موسم 2026 / 2027",
  subjectFolders: [
    {
      id: "arabic",
      nameAr: "اللغة العربية",
      nameFr: "Langue Arabe",
      driveUrl: "https://drive.google.com/drive/folders/10yaqHrEway-Z-2U__AzAzWWBBr2AuF0l",
      folderId: "10yaqHrEway-Z-2U__AzAzWWBBr2AuF0l",
      description: "عروض القراءة المقطعية، المفردات، الظواهر اللغوية، والتعبير الكتابي (NE_AR)",
      levelsCovered: "1AEP إلى 6AEP + مشترك",
      accentColor: "emerald",
    },
    {
      id: "french",
      nameAr: "اللغة الفرنسية",
      nameFr: "Langue Française",
      driveUrl: "https://drive.google.com/drive/folders/1-WUT20-hpHAdOS0vwbwwwccmgDHEafRf",
      folderId: "1-WUT20-hpHAdOS0vwbwwwccmgDHEafRf",
      description: "Présentations interactives PPTX/PPSX: Lecture, Grammaire, Conjugaison et Lexique",
      levelsCovered: "1AEP إلى 6AEP + مشترك",
      accentColor: "blue",
    },
    {
      id: "math",
      nameAr: "الرياضيات",
      nameFr: "Mathématiques",
      driveUrl: "https://drive.google.com/drive/folders/1cPXm9_c7IAfY4rDwxiQUaBxc9kPUnN6Y",
      folderId: "1cPXm9_c7IAfY4rDwxiQUaBxc9kPUnN6Y",
      description: "الحساب الذهني، النمذجة البصرية للعمليات، الكسور، الهندسة وحل المسائل",
      levelsCovered: "1AEP إلى 6AEP + مشترك",
      accentColor: "amber",
    },
    {
      id: "science",
      nameAr: "النشاط العلمي",
      nameFr: "Éveil Scientifique",
      driveUrl: "https://drive.google.com/drive/folders/1TkEPETKTj6Lf-ZGERktqZ7btz8SaC568",
      folderId: "1TkEPETKTj6Lf-ZGERktqZ7btz8SaC568",
      description: "عروض نهج التقصي العلمي والمفاهيم البيولوجية والفيزيائية الجديدة (NE_ES)",
      levelsCovered: "1AEP إلى 6AEP",
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
    title: "المرتكزات الديداكتيكية ومتطلبات تنزيل دروس التعليم الصريح",
    summary:
      "ترتكز مقاربة التعليم الصريح على نظريات المعالجة القائمة على علم النفس المعرفي، والتي تؤكد أن الذاكرة العاملة لدى الطفل محدودة السعة، مما يحتم تقطيع المعارف إلى وحدات صغرى قابلة للاستيعاب. ويتيح اعتماد هذه المنهجية تقليص الفوارق المدرسية في المواد الأساسية عبر الوضوح التام في صياغة الأهداف التعليمية وعدم ترك مجال للتأويل الغامض.",
    fieldTipTitle: "نصيحة من الميدان التربوي",
    fieldTipBody:
      "من واقع التجربة الميدانية في أقسام مدارس الريادة، يُنصح بعدم الاكتفاء بعرض الشرائح الرقمية كما هي، بل دمج الخرائط الذهنية في بداية الحصة لرسم «خريطة طريق» ذهنية للمتعلمين، مما يرفع مستوى التركيز ويقلل تشتت الانتباه بنسبة تصل إلى 40%.",
    practicalTips: [
      "الالتزام الصارم بالإيقاعات الزمنية المقترحة لكل نشاط ديداكتيكي دون إطالة مفرطة.",
      "تنويع أساليب التغذية الراجعة الفورية وتفادي التأجيل لضمان تصحيح التمثلات الخاطئة في حينها.",
      "الاستعانة بالوسائل الرقمية المتاحة وعروض PPTX لتوفير الدعامات البصرية والسمعية للمتعلمين.",
      "تتبع أثر التعلمات عبر شبكات تفريغ دقيقة لرصد المتعثرين وبرمجة حصص الدعم المندمج.",
    ],
    references: [
      "المقرر الوزاري لتنظيم السنة الدراسية والدلائل الديداكتيكية الرسمية لوزارة التربية الوطنية والتعليم الأولي والرياضة.",
      "المذكرات الإدارية والمساطر التوجيهية المؤطرة لمنظومة مسار ومشروع مؤسسات الريادة.",
    ],
  },
  packages: [
    {
      id: "pkg_1aep",
      level: "1aep",
      levelNameAr: "المستوى الأول ابتدائي",
      levelNameFr: "1ère Année Primaire (1AEP)",
      arabicDriveUrl: "https://drive.google.com/drive/folders/1xXKLPnacQwUPwvtDmkzByXQoGa8V_52w",
      frenchDriveUrl: "https://drive.google.com/drive/folders/1rr0UWED1sma6nxM68S1ARiPbzSapaWd-",
      mathDriveUrl: "https://drive.google.com/drive/folders/18jeyHs8oLtfJYzXm7XSuZ-DlfYAoLtD3",
      scienceDriveUrl: "https://drive.google.com/drive/folders/1i19tiqgZuGrG3UlFTq_HSOAc7-J1v-ge",
      guideBookletUrl: MAIN_EXPLICIT_DRIVE_URL,
      studentBookletUrl: MAIN_EXPLICIT_DRIVE_URL,
      totalPptCount: 156,
    },
    {
      id: "pkg_2aep",
      level: "2aep",
      levelNameAr: "المستوى الثاني ابتدائي",
      levelNameFr: "2ème Année Primaire (2AEP)",
      arabicDriveUrl: "https://drive.google.com/drive/folders/1UimGxPEhQOGda8vCwSH-ajm8RWQ3Iogc",
      frenchDriveUrl: "https://drive.google.com/drive/folders/1FE_LGQWg-w03OwJr46ZwSph3TUYqP8We",
      mathDriveUrl: "https://drive.google.com/drive/folders/1M6DUc6RQbEiMC59N1UVRK74Xe4zOiQ1B",
      scienceDriveUrl: "https://drive.google.com/drive/folders/1-IYEY902e34OUA-mmbFgoLA_SNkgYCxk",
      guideBookletUrl: MAIN_EXPLICIT_DRIVE_URL,
      studentBookletUrl: MAIN_EXPLICIT_DRIVE_URL,
      totalPptCount: 168,
    },
    {
      id: "pkg_3aep",
      level: "3aep",
      levelNameAr: "المستوى الثالث ابتدائي",
      levelNameFr: "3ème Année Primaire (3AEP)",
      arabicDriveUrl: "https://drive.google.com/drive/folders/1NdIauGPvK2RzgiJ8uqUp9LZso4r723S3",
      frenchDriveUrl: "https://drive.google.com/drive/folders/1t8cqGFlhM4fbAS-1T1uv68ooWSCace3Q",
      mathDriveUrl: "https://drive.google.com/drive/folders/1m5JYw5kU6Id36X66u8npf4KTz58sezps",
      scienceDriveUrl: "https://drive.google.com/drive/folders/1SGEfZKp9FKZSG7sdd729429YNzQB7xC1",
      guideBookletUrl: MAIN_EXPLICIT_DRIVE_URL,
      studentBookletUrl: MAIN_EXPLICIT_DRIVE_URL,
      totalPptCount: 174,
    },
    {
      id: "pkg_4aep",
      level: "4aep",
      levelNameAr: "المستوى الرابع ابتدائي",
      levelNameFr: "4ème Année Primaire (4AEP)",
      arabicDriveUrl: "https://drive.google.com/drive/folders/1QTWCxTwwAS0MtjS7qSp22Y5JLljaZG7e",
      frenchDriveUrl: "https://drive.google.com/drive/folders/14gsZ_3WlGIhehUxLiPEX91YZMbt-dimP",
      mathDriveUrl: "https://drive.google.com/drive/folders/1jwJsLNeXMQ7dWn1wr6TukaLtxy1yIMoF",
      scienceDriveUrl: "https://drive.google.com/drive/folders/1lcu0CESm8Pj6kh6CdmfrbfRjHtZNKyW6",
      guideBookletUrl: MAIN_EXPLICIT_DRIVE_URL,
      studentBookletUrl: MAIN_EXPLICIT_DRIVE_URL,
      totalPptCount: 186,
    },
    {
      id: "pkg_5aep",
      level: "5aep",
      levelNameAr: "المستوى الخامس ابتدائي",
      levelNameFr: "5ème Année Primaire (5AEP)",
      arabicDriveUrl: "https://drive.google.com/drive/folders/1qvd9dRMlfqfxd0xqpZ-G1-OiIAAGilfv",
      frenchDriveUrl: "https://drive.google.com/drive/folders/1TAt-WwQU80ZbpTMHXhkGASk5xqBPyTxt",
      mathDriveUrl: "https://drive.google.com/drive/folders/1EChH_NK-vTQlqXiY4tFIzVMdd9RzfoGG",
      scienceDriveUrl: "https://drive.google.com/drive/folders/1XAH8vbE8DdIX9BwI4SCrzldnv2sii_PO",
      guideBookletUrl: MAIN_EXPLICIT_DRIVE_URL,
      studentBookletUrl: MAIN_EXPLICIT_DRIVE_URL,
      totalPptCount: 192,
    },
    {
      id: "pkg_6aep",
      level: "6aep",
      levelNameAr: "المستوى السادس ابتدائي",
      levelNameFr: "6ème Année Primaire (6AEP)",
      arabicDriveUrl: "https://drive.google.com/drive/folders/1UbratjVGgKgNLVry51JmK5hj2oFEKQM2",
      frenchDriveUrl: "https://drive.google.com/drive/folders/19A4x2UjmXtGGwz9PrKPUtJMsyc-LebAb",
      mathDriveUrl: "https://drive.google.com/drive/folders/1kmfC-T8BeIb-vXRyCDnBjXZVgIjbkiEI",
      scienceDriveUrl: "https://drive.google.com/drive/folders/1hzKIrED7ILcRCtlEnxwMcGFDL0URMEM9",
      guideBookletUrl: MAIN_EXPLICIT_DRIVE_URL,
      studentBookletUrl: MAIN_EXPLICIT_DRIVE_URL,
      totalPptCount: 198,
    },
    {
      id: "pkg_shared",
      level: "shared",
      levelNameAr: "الأقسام المشتركة",
      levelNameFr: "Classes Multiniveaux (مشترك)",
      arabicDriveUrl: "https://drive.google.com/drive/folders/1xG9B9aWMF_4dQ6ChQpR_fsRhnQfZqL5T",
      frenchDriveUrl: "https://drive.google.com/drive/folders/1EQPFKLb_7HVrar9EP2FuIZqs9BUEoiOC",
      mathDriveUrl: "https://drive.google.com/drive/folders/1xT3_v8yQrzIP4rtgTA80nj7SxB0H1Afh",
      scienceDriveUrl: "https://drive.google.com/drive/folders/1TkEPETKTj6Lf-ZGERktqZ7btz8SaC568",
      guideBookletUrl: MAIN_EXPLICIT_DRIVE_URL,
      studentBookletUrl: MAIN_EXPLICIT_DRIVE_URL,
      totalPptCount: 112,
    },
  ],
  lessons: [
    // 1. العربية - المستوى الرابع
    {
      id: "les_ar_4_1",
      level: "4aep",
      subject: "arabic",
      unit: 1,
      week: 1,
      title: "القراءة الصريحة: استراتيجيات المفردات (خريطة الكلمة وشبكة المفردات)",
      titleFr: "Lecture explicite: Stratégies de vocabulaire",
      objective:
        "أن يوظف المتعلم استراتيجية خريطة الكلمة لتحديد نوعها ومرادفها وضدها وتركيبها في جملة مفيدة.",
      pptUrl: "https://drive.google.com/drive/folders/1QTWCxTwwAS0MtjS7qSp22Y5JLljaZG7e",
      pdfUrl: "https://drive.google.com/drive/folders/1QTWCxTwwAS0MtjS7qSp22Y5JLljaZG7e",
      driveUrl: "https://drive.google.com/drive/folders/1QTWCxTwwAS0MtjS7qSp22Y5JLljaZG7e",
      fileSize: "4.8 MB (PPTX)",
      durationMinutes: 45,
      keyConcepts: ["خريطة الكلمة", "المرادف", "الضد", "نوع الكلمة", "سياق الجملة"],
      steps: {
        preparation:
          "عرض كلمة مألوفة على المسلاط وتذكير المتعلمين بأن فهم المعنى هو مفتاح القراءة السليمة، وإعلان الهدف: 'اليوم سنتعلم معاً كيف نستخدم خريطة الكلمة لاكتشاف معنى أي كلمة جديدة'.",
        modeling:
          "يختار الأستاذ كلمة 'اكتشف'، ويعرض التفكير بصوت مسموع: 'أولاً أحدد نوع الكلمة: تقبل علامات الفعل، إذن هي فعل. ثانياً أبحث عن مرادفها: عرف أو استطلع. ثالثاً ضدها: جهل. رابعاً أركبها في جملة تامة المعنى'.",
        guided:
          "تقديم كلمة جديدة 'ابتهاج' على الشاشة. يطلب الأستاذ من التلاميذ تحديد النوع على اللوحة، ثم المرادف، ثم تكوين جملة ثنائية بالتشاور قبل العرض على السبورة.",
        autonomous:
          "فتح كراسة المتعلم لإنجاز خريطة كلمة 'شغف' بشكل فردي خلال 7 دقائق تحت متابعة وتفقد الأستاذ.",
        evaluation:
          "عرض سؤال سريع على شاشة المسلاط لاختيار الضد الصحيح لكلمة 'شغف'، مع تصحيح جماعي وتسجيل نسب التمكن.",
      },
    },

    // 2. النشاط العلمي - المستوى الرابع (جديد 2026/2027)
    {
      id: "les_sci_4_1",
      level: "4aep",
      subject: "science",
      unit: 1,
      week: 1,
      title: "النشاط العلمي الصريح: تغيرات المادة (الذوبان، الانصهار، والتجمد) — NE_ES_N4",
      titleFr: "Éveil Scientifique: Les changements d'état de la matière",
      objective:
        "أن يميز المتعلم بين التحولات الفيزيائية القابلة للانعكاس (الانصهار والتجمد والذوبان) عبر الملاحظة والنمذجة الصريحة.",
      pptUrl: "https://drive.google.com/drive/folders/1lcu0CESm8Pj6kh6CdmfrbfRjHtZNKyW6",
      pdfUrl: "https://drive.google.com/drive/folders/1lcu0CESm8Pj6kh6CdmfrbfRjHtZNKyW6",
      driveUrl: "https://drive.google.com/drive/folders/1lcu0CESm8Pj6kh6CdmfrbfRjHtZNKyW6",
      fileSize: "5.4 MB (PPTX)",
      durationMinutes: 45,
      keyConcepts: ["الانصهار", "التجمد", "التحول الانعكاسي", "درجة الحرارة", "نهج التقصي"],
      steps: {
        preparation:
          "طرح سؤال الانطلاق عبر شرائح العرض التفاعلي: 'لماذا تتحول قطعة الثلج إلى ماء سائل عندما نتركها خارج المبرد؟' وإعلان الهدف التعلمي للحصة.",
        modeling:
          "ينمذج الأستاذ الفرق بين حالتي المادة الصلبة والسائلة عبر رسوم تخطيطية متحركة على المسلاط، مبرزاً أثر ارتفاع الحرارة في حدوث الانصهار وانخفاضها في التجمد.",
        guided:
          "تصنيف أمثلة يومية (ذوبان الشمع، تجمد الماء، تبخر ماء البحر) بشكل ثنائي وعلى الألواح مع مناقشة التعليلات وتصحيح التمثلات.",
        autonomous:
          "إنجاز نشاط الربط والاستنتاج في كراسة النشاط العلمي فردياً خلال 8 دقائق.",
        evaluation:
          "بطاقة تحقق سريعة على الشاشة لتمييز التحولات القابلة للانعكاس عن التحولات الكيميائية غير الانعكاسية.",
      },
    },

    // 3. الفرنسية - المستوى الرابع
    {
      id: "les_fr_4_1",
      level: "4aep",
      subject: "french",
      unit: 1,
      week: 1,
      title: "Grammaire explicite: La phrase verbale et la phrase nominale",
      titleFr: "La phrase verbale et la phrase nominale",
      objective:
        "Identifier et distinguer la phrase verbale de la phrase nominale et transformer de l'une à l'autre.",
      pptUrl: "https://drive.google.com/drive/folders/14gsZ_3WlGIhehUxLiPEX91YZMbt-dimP",
      pdfUrl: "https://drive.google.com/drive/folders/14gsZ_3WlGIhehUxLiPEX91YZMbt-dimP",
      driveUrl: "https://drive.google.com/drive/folders/14gsZ_3WlGIhehUxLiPEX91YZMbt-dimP",
      fileSize: "3.9 MB (PPTX)",
      durationMinutes: 45,
      keyConcepts: ["Verbe conjugué", "Nom noyau", "Transformation", "Sens complet"],
      steps: {
        preparation:
          "Rappel de la définition d'une phrase (sens, majuscule, point). Annonce de l'objectif: 'Aujourd'hui, nous allons apprendre à reconnaître la phrase verbale et la phrase nominale.'",
        modeling:
          "Le maître lit 2 phrases au vidéoprojecteur: 'Le train arrive.' et 'Arrivée du train.' Il verbalise: 'Dans la première, il y a le verbe conjugué arrive -> c'est une phrase verbale. Dans la deuxième, il n'y a pas de verbe -> c'est une phrase nominale.'",
        guided:
          "Affichage de 4 phrases au tableau. Les élèves lèvent l'ardoise (V pour verbale, N pour nominale). Correction immédiate avec justification collective.",
        autonomous:
          "Les élèves ouvrent le cahier d'activités p. 18 et réalisent l'exercice 2 individuellement en silence pendant 8 minutes.",
        evaluation:
          "Mini-bilan sur ardoise: Transformer la phrase verbale 'Le vent souffle.' en phrase nominale.",
      },
    },

    // 4. الرياضيات - المستوى الثالث
    {
      id: "les_math_3_1",
      level: "3aep",
      subject: "math",
      unit: 1,
      week: 2,
      title: "الرياضيات الصريحة: الضرب في عدد من رقم واحد بالاحتفاظ وبدونه",
      titleFr: "Multiplication par un chiffre avec et sans retenue",
      objective:
        "أن يتقن المتعلم التقنية الاعتيادية للضرب في عدد من رقم واحد مع تدبير الاحتفاظ السليم.",
      pptUrl: "https://drive.google.com/drive/folders/1m5JYw5kU6Id36X66u8npf4KTz58sezps",
      pdfUrl: "https://drive.google.com/drive/folders/1m5JYw5kU6Id36X66u8npf4KTz58sezps",
      driveUrl: "https://drive.google.com/drive/folders/1m5JYw5kU6Id36X66u8npf4KTz58sezps",
      fileSize: "5.2 MB (PPTX)",
      durationMinutes: 55,
      keyConcepts: ["الضرب", "جدول الضرب", "التقنية الاعتيادية", "الاحتفاظ", "الوحدات والعشرات"],
      steps: {
        preparation:
          "حساب ذهني سريع (ضرب أعداد في 3 و 4 و 5 على الألواح خلال 5 دقائق). إعلان الهدف: 'اليوم سنتعلم كيفية وضع وإنجاز عملية ضرب عدد من رقمين في رقم واحد مع الاحتفاظ بدقة'.",
        modeling:
          "ينمذج الأستاذ العملية 24 × 3 على شاشة العرض. يوضح: 'أولاً أضرب 3 في 4 وحدات = 12، أكتب 2 في الوحدات وأحتفظ بـ 1 فوق العشرات. ثانياً أضرب 3 في 2 عشرات = 6، وأضيف الاحتفاظ 1 ليصبح 7. النتيجة 72'.",
        guided:
          "ينجز المتعلمون العملية 36 × 2 على الألواح خطوة بخطوة. يوجه الأستاذ من ينسى إضافة الاحتفاظ ويثبت القاعدة.",
        autonomous:
          "إنجاز التمارين 1 و 2 بالكراسة ص 22 فردياً، مع انتقال الأستاذ لدعم المتعثرين فورياً.",
        evaluation:
          "مسألة سريعة: اشترت المدرسة 3 صناديق من الأقلام في كل صندوق 15 قلماً، احسب مجموع الأقلام.",
      },
    },

    // 5. العربية - المستوى الأول (NE_AR_N1)
    {
      id: "les_ar_1_1",
      level: "1aep",
      subject: "arabic",
      unit: 1,
      week: 1,
      title: "القراءة المقطعية الصريحة: الصوت [م] والحركات القصيرة (NE_AR_N1)",
      titleFr: "Lecture syllabique: Le son [M] et les voyelles courtes",
      objective:
        "التعرف السمعي والبصري على حرف الميم مع الحركات القصيرة وقراءة مقاطع وكلمات بسيطة بطلاقة.",
      pptUrl: "https://drive.google.com/drive/folders/1xXKLPnacQwUPwvtDmkzByXQoGa8V_52w",
      pdfUrl: "https://drive.google.com/drive/folders/1xXKLPnacQwUPwvtDmkzByXQoGa8V_52w",
      driveUrl: "https://drive.google.com/drive/folders/1xXKLPnacQwUPwvtDmkzByXQoGa8V_52w",
      fileSize: "4.3 MB (PPTX)",
      durationMinutes: 45,
      keyConcepts: ["الوعي الصوتي", "المقطع", "حرف الميم", "التجزيء المقطعي", "الطلاقة"],
      steps: {
        preparation:
          "نشاط العزل الصوتي لكلمات تبتدئ بالصوت [م] (موز، مكتب، مدرسة) مع التصفيق عند سماع الصوت المستهدف.",
        modeling:
          "يعرض الأستاذ الحرف على شاشة البوربوينت وينطق المقاطع (مَ - مُ - مِ) مع الإشارة الحركية المرافقة لكل حركة.",
        guided:
          "قراءة لوحة المقاطع بشكل إيقاعي جماعي، ثم تركيب مقاطع لتكوين كلمات ثنائية على الألواح.",
        autonomous:
          "إحاطة حرف الميم بخط مغلق وتلوين مقاطعه في كراسة التلميذ ثم التدرب على كتابته وفق المقاييس.",
        evaluation:
          "قراءة فردية سريعة لثلاث بطاقات كلمات على الشاشة لقياس الطلاقة الأولية.",
      },
    },

    // 6. الأقسام المشتركة - الرياضيات
    {
      id: "les_math_shared_1",
      level: "shared",
      subject: "math",
      unit: 1,
      week: 1,
      title: "الأقسام المشتركة: تدبير التدرج اللولبي للجمع والطرح في حصة متزامنة",
      titleFr: "Classe multiniveau: Gestion simultanée de l'addition et soustraction",
      objective:
        "تمكين فوجي القسم المشترك من بناء مهارتي الجمع والطرح بالاحتفاظ بالتناوب المنظم بين النمذجة والاشتغال الذاتي.",
      pptUrl: "https://drive.google.com/drive/folders/1xT3_v8yQrzIP4rtgTA80nj7SxB0H1Afh",
      pdfUrl: "https://drive.google.com/drive/folders/1xT3_v8yQrzIP4rtgTA80nj7SxB0H1Afh",
      driveUrl: "https://drive.google.com/drive/folders/1xT3_v8yQrzIP4rtgTA80nj7SxB0H1Afh",
      fileSize: "4.6 MB (PPTX)",
      durationMinutes: 55,
      keyConcepts: ["القسم المشترك", "التناوب البيداغوجي", "الحساب الذهني", "الممارسة الموجهة"],
      steps: {
        preparation:
          "حساب ذهني مشترك لكلا المستويين باستخدام بطاقات الأعداد، مع إعلان الهدف الصريح لكل مستوى.",
        modeling:
          "ينمذج الأستاذ المفهوم للمستوى الأدنى لمدة 8 دقائق بينما ينجز المستوى الأعلى تمرين تهيئة، ثم يعكس التناوب.",
        guided:
          "توجيه مباشر على الألواح بالتناوب مع توظيف شرائح العرض المقسمة عمودياً على السبورة.",
        autonomous:
          "انكباب الفوجين معاً على كراسات التمارين حسب مستوى كل فوج لتفريغ الأستاذ للتتبع الفردي.",
        evaluation:
          "تحقق ختامي مشترك عبر سؤالين متدرجين على الشاشة ورصد الفوارق.",
      },
    },

    // 7. النشاط العلمي - المستوى الأول (NE_ES_N1)
    {
      id: "les_sci_1_1",
      level: "1aep",
      subject: "science",
      unit: 1,
      week: 2,
      title: "النشاط العلمي الصريح: الحواس الخمس ووظائفها في استكشاف المحيط (NE_ES_N1)",
      titleFr: "Éveil Scientifique: Les cinq sens",
      objective:
        "أن يربط المتعلم كل حاسة بالعضو المسؤول عنها وبنوع المعلومة التي يلتقطها من محيطه.",
      pptUrl: "https://drive.google.com/drive/folders/1i19tiqgZuGrG3UlFTq_HSOAc7-J1v-ge",
      pdfUrl: "https://drive.google.com/drive/folders/1i19tiqgZuGrG3UlFTq_HSOAc7-J1v-ge",
      driveUrl: "https://drive.google.com/drive/folders/1i19tiqgZuGrG3UlFTq_HSOAc7-J1v-ge",
      fileSize: "4.9 MB (PPTX)",
      durationMinutes: 45,
      keyConcepts: ["الحواس الخمس", "العضو الحسي", "الملاحظة", "الربط البصري"],
      steps: {
        preparation:
          "عرض صور لأشياء مألوفة (زهرة، جرس، ليمونة) وسؤال التلاميذ كيف نتعرف على رائحتها أو صوتها أو طعمها.",
        modeling:
          "يشرح الأستاذ بصوت واضح على الشاشة: 'أرى الألوان بعيني (حاسة البصر)، وأسمع الأصوات بأذني (حاسة السمع)...' مع الإشارة للعضو.",
        guided:
          "عرض بطاقات أشياء على المسلاط ورفع رمز الحاسة المناسبة بشكل جماعي وتصحيح الأجوبة فوراً.",
        autonomous:
          "تلوين ووصل كل عضو حسي بالصورة المناسبة في كراسة النشاط العلمي.",
        evaluation:
          "اختبار شفوي وبصري سريع للتأكد من تمييز جميع المتعلمين للوظائف الخمس.",
      },
    },

    // 8. الفرنسية - المستوى السادس
    {
      id: "les_fr_6_1",
      level: "6aep",
      subject: "french",
      unit: 1,
      week: 2,
      title: "Conjugaison explicite: Le présent de l'indicatif des verbes du 3ème groupe",
      titleFr: "Le présent de l'indicatif des verbes du 3ème groupe",
      objective:
        "Maîtriser les terminaisons et la conjugaison des verbes usuels du 3ème groupe au présent de l'indicatif.",
      pptUrl: "https://drive.google.com/drive/folders/19A4x2UjmXtGGwz9PrKPUtJMsyc-LebAb",
      pdfUrl: "https://drive.google.com/drive/folders/19A4x2UjmXtGGwz9PrKPUtJMsyc-LebAb",
      driveUrl: "https://drive.google.com/drive/folders/19A4x2UjmXtGGwz9PrKPUtJMsyc-LebAb",
      fileSize: "4.5 MB (PPTX)",
      durationMinutes: 45,
      keyConcepts: ["Verbes du 3ème groupe", "Terminaisons s-s-t / ds-ds-d", "Radical", "Présent"],
      steps: {
        preparation:
          "Rappel des verbes du 1er et 2ème groupe au présent. Annonce de l'objectif: 'Conjuguer correctement les verbes usuels du 3ème groupe (prendre, faire, dire, partir)'.",
        modeling:
          "Le maître modélise la conjugaison du verbe 'prendre' au tableau: repérage du radical 'pren-' et des terminaisons particulières 'ds, ds, d, nons, nez, nent'.",
        guided:
          "Conjugaison guidée du verbe 'faire' sur ardoises avec correction instantanée.",
        autonomous:
          "Exercice autonome sur le cahier de l'élève (compléter un texte avec les verbes conjugués).",
        evaluation: "Quiz rapide de 3 questions QCM au vidéoprojecteur.",
      },
    },

    // 9. الرياضيات - المستوى الخامس
    {
      id: "les_math_5_1",
      level: "5aep",
      subject: "math",
      unit: 2,
      week: 1,
      title: "الرياضيات الصريحة: الأعداد الكسرية - الجمع والطرح وتوحيد المقامات",
      titleFr: "Fractions: Addition, soustraction et réduction au même dénominateur",
      objective:
        "أن يوحد المتعلم مقامي عددين كسريين ويحسب مجموعهما أو فرقهما ويختزل النتيجة إلى أقصى حد.",
      pptUrl: "https://drive.google.com/drive/folders/1EChH_NK-vTQlqXiY4tFIzVMdd9RzfoGG",
      pdfUrl: "https://drive.google.com/drive/folders/1EChH_NK-vTQlqXiY4tFIzVMdd9RzfoGG",
      driveUrl: "https://drive.google.com/drive/folders/1EChH_NK-vTQlqXiY4tFIzVMdd9RzfoGG",
      fileSize: "5.5 MB (PPTX)",
      durationMinutes: 55,
      keyConcepts: ["الكسور", "توحيد المقامات", "المضاعف المشترك الأصغر", "الجمع والطرح", "الاختزال"],
      steps: {
        preparation:
          "حساب ذهني: تحويل أعداد كسرية لمقامات متساوية. إعلان الهدف الصريح للدرس.",
        modeling:
          "ينمذج الأستاذ حساب (1/3 + 2/5): إيجاد المقام المشترك (15)، ضرب البسطين، جمع البسطين مع الحفاظ على المقام.",
        guided:
          "إنجاز جماعي لعملية طرح (3/4 - 1/2) على الألواح مع مناقشة أسباب الخطأ الشائع بطرح المقامات.",
        autonomous: "إنجاز 3 عمليات متنوعة على الدفاتر الفردية.",
        evaluation:
          "مسألة وضعية مشكلة سريعة لقياس الأثر وتحديد المستفيدين من الدعم المندمج.",
      },
    },
  ],
};
