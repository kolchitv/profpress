import {
  TeacherProfile,
  TimetableSlot,
  ClassRuleItem,
  FileCoverConfig,
  StudentGrade,
  WorkshopReportData,
} from "../types";

export const DEFAULT_TEACHER_PROFILE: TeacherProfile = {
  fullNameAr: "محمد المنصوري",
  fullNameFr: "Mohammed EL MANSOURI",
  somNumber: "1849204",
  cin: "AB123456",
  academy: "لجهة الرباط - سلا - القنيطرة",
  directorate: "بالصخيرات - تمارة",
  institution: "مدرسة طارق بن زياد الابتدائية (مدرسة الريادة)",
  commune: "تمارة",
  grade: "أستاذ التعليم الابتدائي - الدرجة الأولى",
  echelon: "الرتبة 6",
  assignedLevel: "المستوى الرابع ابتدائي (4AEP)",
  subjectTaught: "اللغة العربية والتربية الإسلامية والاجتماعيات والنشاط العلمي",
  classGroups: "القسم 4/1 (الفوج الأول والفوج الثاني)",
  totalStudents: 32,
  femaleStudents: 17,
  maleStudents: 15,
  recruitmentDate: "2016-09-02",
  schoolAssignmentDate: "2020-09-07",
  phone: "06 61 00 00 00",
  email: "m.mansouri@taalim.ma",
  schoolYear: "2026 / 2027",
};

export const DEFAULT_TIMETABLE_SLOTS: TimetableSlot[] = [
  // الإثنين
  { id: "s1", day: "الإثنين", startTime: "08:30", endTime: "09:45", subject: "اللغة العربية", unitOrActivity: "القراءة (التعليم الصريح)", group: "الكل", color: "emerald" },
  { id: "s2", day: "الإثنين", startTime: "09:45", endTime: "11:00", subject: "اللغة العربية", unitOrActivity: "الظواهر اللغوية والإنتاج الكتابي", group: "الكل", color: "emerald" },
  { id: "s3", day: "الإثنين", startTime: "11:15", endTime: "12:15", subject: "التربية الإسلامية", unitOrActivity: "القرآن الكريم والتزكية", group: "الكل", color: "teal" },
  { id: "s4", day: "الإثنين", startTime: "12:15", endTime: "13:00", subject: "دعم مدرسة الريادة", unitOrActivity: "الدعم المكثف وفق مقاربة طارل", group: "فوج التعثرات", color: "amber" },

  // الثلاثاء
  { id: "s5", day: "الثلاثاء", startTime: "08:30", endTime: "09:45", subject: "الرياضيات", unitOrActivity: "الأعداد والحساب (الحساب الذهني والروتين)", group: "الكل", color: "blue" },
  { id: "s6", day: "الثلاثاء", startTime: "09:45", endTime: "11:00", subject: "الرياضيات", unitOrActivity: "الهندسة والقياس وحل المسائل", group: "الكل", color: "blue" },
  { id: "s7", day: "الثلاثاء", startTime: "11:15", endTime: "12:15", subject: "النشاط العلمي", unitOrActivity: "التقصي العلمي والتجريب", group: "الكل", color: "indigo" },
  { id: "s8", day: "الثلاثاء", startTime: "12:15", endTime: "13:00", subject: "التربية الفنية", unitOrActivity: "التشكيل والرسم والإيقاع", group: "الكل", color: "rose" },

  // الأربعاء
  { id: "s9", day: "الأربعاء", startTime: "08:30", endTime: "09:45", subject: "اللغة الفرنسية", unitOrActivity: "Lecture explicite & fluence", group: "الكل", color: "sky" },
  { id: "s10", day: "الأربعاء", startTime: "09:45", endTime: "11:00", subject: "اللغة الفرنسية", unitOrActivity: "Activités de langue & écriture", group: "الكل", color: "sky" },
  { id: "s11", day: "الأربعاء", startTime: "11:15", endTime: "12:15", subject: "الاجتماعيات", unitOrActivity: "التاريخ والجغرافيا والتربية المدنية", group: "الكل", color: "amber" },
  { id: "s12", day: "الأربعاء", startTime: "12:15", endTime: "13:00", subject: "التربية البدنية", unitOrActivity: "الألعاب الجماعية والجمباز", group: "الكل", color: "emerald" },

  // الخميس
  { id: "s13", day: "الخميس", startTime: "08:30", endTime: "09:45", subject: "اللغة العربية", unitOrActivity: "التواصل الشفهي والمحاكاة", group: "الكل", color: "emerald" },
  { id: "s14", day: "الخميس", startTime: "09:45", endTime: "11:00", subject: "الرياضيات", unitOrActivity: "أنشطة التثبيت والتمرن الذاتي", group: "الكل", color: "blue" },
  { id: "s15", day: "الخميس", startTime: "11:15", endTime: "12:15", subject: "التربية الإسلامية", unitOrActivity: "الاقتداء والاستجابة والقسط", group: "الكل", color: "teal" },
  { id: "s16", day: "الخميس", startTime: "12:15", endTime: "13:00", subject: "دعم مدرسة الريادة", unitOrActivity: "أنشطة طارل (TaRL) اللغوية", group: "فوج الدعم", color: "amber" },

  // الجمعة
  { id: "s17", day: "الجمعة", startTime: "08:30", endTime: "09:45", subject: "اللغة الفرنسية", unitOrActivity: "Communication orale & lexique", group: "الكل", color: "sky" },
  { id: "s18", day: "الجمعة", startTime: "09:45", endTime: "11:00", subject: "النشاط العلمي", unitOrActivity: "المشاريع العلمية والتطبيقية", group: "الكل", color: "indigo" },
  { id: "s19", day: "الجمعة", startTime: "11:15", endTime: "12:15", subject: "التربية الفنية والموسيقية", unitOrActivity: "الإنشاد والتعبير الدرامي", group: "الكل", color: "rose" },

  // السبت
  { id: "s20", day: "السبت", startTime: "08:30", endTime: "10:00", subject: "التقويم والمعالجة المركزة", unitOrActivity: "تفريغ الروائز ومراجعة التعثرات الأسبوعية", group: "الكل", color: "purple" },
  { id: "s21", day: "السبت", startTime: "10:15", endTime: "11:30", subject: "أنشطة الحياة المدرسية", unitOrActivity: "أندية القراءة والبيئة والإعلام المدرسي", group: "الكل", color: "orange" },
];

export const DEFAULT_CLASS_RULES: ClassRuleItem[] = [
  {
    id: "r1",
    title: "أستمع بانتباه وأرفع يدي قبل أخذ الكلمة",
    description: "احترام حق زميلي في التحدث وعدم مقاطعة الأستاذ أثناء الشرح.",
    category: "respect",
    iconName: "Hand",
  },
  {
    id: "r2",
    title: "أحضر في الوقت المحدد وأحرص على عدم الغياب",
    description: "الانضباط بالدخول مع جرس المدرسة والمواظبة على الحضور اليومي.",
    category: "discipline",
    iconName: "Clock",
  },
  {
    id: "r3",
    title: "أحافظ على نظافة قاعتي ومقعدي وأدواتي المدرسية",
    description: "رمي النفايات في سلة المهملات وإبقاء طاولتي نظيفة ومرتبة دائماً.",
    category: "cleanliness",
    iconName: "Sparkles",
  },
  {
    id: "r4",
    title: "أنجز واجباتي المنزلية وأشارك بفاعلية في الأنشطة",
    description: "الجد والاجتهاد في أداء التمارين والمشاركة الإيجابية في عمل المجموعات.",
    category: "work",
    iconName: "CheckCircle2",
  },
  {
    id: "r5",
    title: "أتعامل بلطف ولباقة مع زملائي وأساعد من يحتاجني",
    description: "الابتعاد عن الشجار والألفاظ السيئة، وسيادة روح الأخوة والتعاون والتعاطف.",
    category: "respect",
    iconName: "HeartHandshake",
  },
  {
    id: "r6",
    title: "ألتزم بالهدوء أثناء حركة الدخول والخروج من القسم",
    description: "السير بانتظام في الصف دون تدافع أو صراخ حفاظاً على السلامة والأمان.",
    category: "discipline",
    iconName: "ShieldCheck",
  },
];

export const DEFAULT_COVERS: FileCoverConfig[] = [
  {
    title: "الملف التراكمي للأستاذ",
    subTitle: "دليل وثائق الأستاذ بالمدرسة الرائدة ومشاريع القسم",
    theme: "pioneer",
    colorScheme: "emerald",
    dossierType: "الملف البيداغوجي الشامل",
    authorName: "محمد المنصوري",
    schoolName: "مدرسة طارق بن زياد الابتدائية",
    academicYear: "2026 / 2027",
    level: "المستوى الرابع ابتدائي",
    quote: "التعليم الصريح ركيزة الجودة والتميز لمدارس الريادة",
  },
  {
    title: "دفتر النصوص والمذكرات اليومية",
    subTitle: "التسجيل اليومي للأنشطة الصفية والأهداف المحققة",
    theme: "royal",
    colorScheme: "blue",
    dossierType: "سجل التدبير البيداغوجي اليومي",
    authorName: "محمد المنصوري",
    schoolName: "مدرسة طارق بن زياد الابتدائية",
    academicYear: "2026 / 2027",
    level: "المستوى الرابع ابتدائي",
    quote: "وقل رب زدني علما",
  },
  {
    title: "ملف المراقبة المستمرة والتقويم ومسار",
    subTitle: "شبكات التنقيط، روائز طارل، ولوائح التفريغ الدورية",
    theme: "modern",
    colorScheme: "amber",
    dossierType: "سجل التقويم والدعم التربوي",
    authorName: "محمد المنصوري",
    schoolName: "مدرسة طارق بن زياد الابتدائية",
    academicYear: "2026 / 2027",
    level: "المستوى الرابع ابتدائي",
    quote: "التقويم من أجل التعلم وتجاوز التعثرات",
  },
  {
    title: "سجل الغياب والمواظبة اليومية",
    subTitle: "تتبع حضور المتعلمين والتواصل مع أولياء الأمور",
    theme: "islamic",
    colorScheme: "burgundy",
    dossierType: "السجل الإداري للحياة المدرسية",
    authorName: "محمد المنصوري",
    schoolName: "مدرسة طارق بن زياد الابتدائية",
    academicYear: "2026 / 2027",
    level: "المستوى الرابع ابتدائي",
    quote: "المواظبة أساس النجاح والتحصيل الدراسي",
  },
];

export const DEFAULT_STUDENTS_GRADES: StudentGrade[] = [
  { id: "std1", massarCode: "M130089201", name: "آية بناني", gender: "F", exam1: 9.5, exam2: 9.75, activities: 10, average: 9.75, status: "controlle", remark: "ممتازة جداً، ذكاء متقد واجتهاد متواصل" },
  { id: "std2", massarCode: "M130089202", name: "أحمد العمراني", gender: "M", exam1: 8.75, exam2: 9.0, activities: 9.5, average: 9.08, status: "controlle", remark: "نتائج ممتازة، مشاركة صفية فعالة ومتميزة" },
  { id: "std3", massarCode: "M130089203", name: "سلمى الإدريسي", gender: "F", exam1: 8.5, exam2: 8.25, activities: 9.0, average: 8.58, status: "controlle", remark: "مستوى جيد جداً، تلميذة مجدة ومنضبطة" },
  { id: "std4", massarCode: "M130089204", name: "ياسين التازي", gender: "M", exam1: 7.75, exam2: 7.5, activities: 8.0, average: 7.75, status: "controlle", remark: "مستوى حسن، قادر على تحقيق الأفضل بالمثابرة" },
  { id: "std5", massarCode: "M130089205", name: "مريم الفاسي", gender: "F", exam1: 7.0, exam2: 7.25, activities: 7.5, average: 7.25, status: "controlle", remark: "عمل حسن، يرجى التركيز أكثر في التطبيقات الكتابية" },
  { id: "std6", massarCode: "M130089206", name: "حمزة الشرايبي", gender: "M", exam1: 6.5, exam2: 6.0, activities: 7.0, average: 6.5, status: "en_cours", remark: "مستوى مستحسن، كفايات التعلم في طور الاكتساب" },
  { id: "std7", massarCode: "M130089207", name: "فاطمة الزهراء بنجلون", gender: "F", exam1: 6.0, exam2: 5.75, activities: 6.5, average: 6.08, status: "en_cours", remark: "مستوى متوسط، تحتاج إلى تكثيف القراءة بالمنزل" },
  { id: "std8", massarCode: "M130089208", name: "أيوب بوزيد", gender: "M", exam1: 5.5, exam2: 5.0, activities: 6.0, average: 5.5, status: "en_cours", remark: "مجهود مشكور، ينصح بالتركيز على قواعد الحساب" },
  { id: "std9", massarCode: "M130089209", name: "زينب العلوي", gender: "F", exam1: 4.5, exam2: 4.75, activities: 5.5, average: 4.92, status: "non_acquis", remark: "تعثر في المكتسبات الأساسية، تستفيد من الدعم المكثف" },
  { id: "std10", massarCode: "M130089210", name: "عمر السلاوي", gender: "M", exam1: 3.75, exam2: 4.0, activities: 5.0, average: 4.25, status: "non_acquis", remark: "صعوبات واضحة، تتطلب متابعة مستمرة ومكثفة" },
];

export const MASSAR_REMARKS_DATABASE = [
  {
    gradeRange: "9.00 - 10.00",
    label: "ممتاز (Excellent)",
    color: "emerald",
    remarksAr: [
      "عمل ممتاز ونتائج مشرفة تعكس استيعاباً كاملاً للمقرر واجتهاداً كبيراً.",
      "مستوى رفيع ومشاركة نموذجية داخل الفصل. هنيئاً لك هذا التفوق المستحق.",
      "تلميذ(ة) متألق(ة) وشديد(ة) الحرص على الدقة والإتقان، استمر على هذا التألق.",
      "إتقان تام لكفايات المادة وقدرة عالية على التفكير النقدي وحل المسائل.",
    ],
    remarksFr: [
      "Excellent travail, résultats remarquables et régularité exemplaire.",
      "Très haute maîtrise des compétences, félicitations pour cette brillante réussite.",
      "Élève brillant(e), appliqué(e) et très autonome dans ses apprentissages.",
    ],
  },
  {
    gradeRange: "8.00 - 8.99",
    label: "جيد جداً (Très Bien)",
    color: "teal",
    remarksAr: [
      "مستوى جيد جداً، مجهودات محمودة واهتمام واضح بمجمل الأنشطة المدرسية.",
      "نتائج طيبة تعكس كفاءة ملحوظة وانضباطاً مستمراً. مزيداً من التقدم.",
      "أداء رائع ومشاركة إيجابية، وبقليل من التركيز يمكن إحراز الرتب الأولى.",
    ],
    remarksFr: [
      "Très bon niveau d'ensemble, efforts constants et participation active.",
      "Des acquis solides et une belle progression tout au long de la période.",
    ],
  },
  {
    gradeRange: "7.00 - 7.99",
    label: "حسن (Bien)",
    color: "blue",
    remarksAr: [
      "مستوى حسن وعمل جاد. استمر في البذل لتحقيق نتائج أكثر إشراقاً.",
      "نتائج إيجابية ومكتسبات سليمة، شريطة الانتباه للتفاصيل في التطبيقات الكتابية.",
      "مجهود طيب وتفاعل حسن، ننصح بالمزيد من المطالعة وحل التمارين المنزلية.",
    ],
    remarksFr: [
      "Bon travail dans l'ensemble. Continuez vos efforts pour viser l'excellence.",
      "Bons résultats, l'élève fait preuve de sérieux et de bonne volonté.",
    ],
  },
  {
    gradeRange: "6.00 - 6.99",
    label: "مستحسن (Assez Bien)",
    color: "sky",
    remarksAr: [
      "مستوى مستحسن، الكفايات الأساسية قيد التثبيت. ينبغي تنظيم وقت المراجعة.",
      "قدرات جيدة تحتاج إلى حافز إضافي والمزيد من العناية بإنجاز الواجبات.",
      "نتيجة مشجعة ولكنها دون الإمكانيات الحقيقية، يمكنك تحقيق الأفضل بالمثابرة.",
    ],
    remarksFr: [
      "Résultats assez satisfaisants mais perfectibles avec davantage de méthode.",
      "Des progrès visibles, poursuivre les efforts avec plus de rigueur.",
    ],
  },
  {
    gradeRange: "5.00 - 5.99",
    label: "متوسط (Moyen)",
    color: "amber",
    remarksAr: [
      "مستوى متوسط، يحتاج إلى مضاعفة الجهد وتفادي التشتت أثناء الحصص.",
      "المكتسبات متذبذبة، من الضروري تدارك النواقص قبل فوات الأوان.",
      "أداء متواضع يتطلب دعماً مدرسياً ومتابعة وثيقة من طرف الأسرة.",
    ],
    remarksFr: [
      "Ensemble moyen. Des lacunes doivent être comblées par un travail plus soutenu.",
      "Attention aux distractions, un effort de concentration est attendu.",
    ],
  },
  {
    gradeRange: "0.00 - 4.99",
    label: "دون المتوسط / غير متمكن (Insuffisant)",
    color: "rose",
    remarksAr: [
      "تعثرات ملحوظة في التعلمات الأساسية، يحتاج إلى الانخراط الجاد في حصص الدعم.",
      "نتائج غير كافية تنم عن تهاون في المراجعة. الدعم والمعالجة أمر ملح.",
      "صعوبات متراكمة تستدعي مراجعة شاملة للروائز والتعاون الوثيق مع ولي الأمر.",
    ],
    remarksFr: [
      "Résultats insuffisants. Les compétences fondamentales ne sont pas acquises.",
      "Des difficultés importantes nécessitent un plan de soutien intensif immédiat.",
    ],
  },
];

export const WORKSHOP_REPORTS_TEMPLATES: Record<
  "day1" | "day2" | "day3" | "summary",
  WorkshopReportData
> = {
  day1: {
    title: "تقرير اليوم الأول من الورشات التذكيرية لدعم التعلمات الأساس بمؤسسات الريادة",
    dayNumber: "اليوم الأول",
    subtitle: "مقاربة طارل (TaRL) • روائز الموضعة التشخيصية وآليات تفييء المتعلمين",
    projectName: "مشروع «مؤسسات الريادة»",
    dateText: "الخميس 03 شتنبر 2026",
    preparedBy: "الأستاذ(ة)",
    institution: "مدرسة طارق بن زياد الابتدائية (مؤسسة ريادة)",
    academicYear: "2026 / 2027",
    technicalCard: {
      targetAudience: "أستاذات وأساتذة مؤسسات الريادة (سلك التعليم الابتدائي)",
      sessionNature: "ورشات تذكيرية بيداغوجية ونظرية-تطبيقية ومحاكاة التمرير",
      axes: "مقاربة طارل، روائز الموضعة، عتبات التفييء، وتدبير حجرة الدعم",
      strategicObjective:
        "التذكير بالمرجعيات النظرية والديداكتيكية لمقاربة طارل (TaRL)، وتوحيد منهجية تمرير وتفريغ روائز الموضعة التشخيصية لضمان تفييء دقيق وعادل للمتعلمين حسب مستواهم الفعلي بعيداً عن منطق السن أو المستوى الدراسي.",
    },
    generalIntro:
      "افتتحت أشغال اليوم الأول من الورشات التذكيرية لدعم التعلمات الأساس بمؤسسات الريادة بكلمة تأطيرية تناولت سياق إرساء هذا الورش الوطني الرائد. وقد تم التركيز على استيعاب الفلسفة التربوية لمقاربة التدريس وفق المستوى المناسب (Teaching at the Right Level - TaRL) كأداة تشخيصية وعلاجية ناجعة تهدف إلى معالجة التعثرات التراكمية في القراءة والرياضيات وإعادة بناء الثقة لدى المتعلمات والمتعلمين.",
    mathIntro:
      "تمحور الشق الخاص بالرياضيات حول استيعاب بنية رائز الموضعة التشخيصي، والتدرب على مساطر التمرير الفردي المتدرج، وتحديد شروط التوقف والانتقال بين المستويات، مع الحرص على التوثيق الفوري للاستجابات في شبكات التفريغ المعتمدة.",
    mathActivities: [
      {
        id: "act_d1_1",
        domain: "رائز الأعداد والأرقام",
        activities:
          "تشخيص قراءة وكتابة وتمثيل الأعداد من 0 إلى 9 ومن 10 إلى 99 بواسطة الخشيبات وبطاقات الأعداد والمعداد الورقي.",
      },
      {
        id: "act_d1_2",
        domain: "رائز العمليات الحسابية",
        activities:
          "فحص التمكن من التقنيات الاعتيادية للجمع البسيط وبالاحتفاظ، الطرح بدون مبادلة وبالمبادلة، وجدول الضرب.",
      },
      {
        id: "act_d1_3",
        domain: "رائز حل المسائل",
        activities:
          "قياس قدرة المتعلم على فهم نص المسألة، استخراج المعطيات الأساسية، واختيار وتطبيق العملية الحسابية الملائمة للإنجاز.",
      },
      {
        id: "act_d1_4",
        domain: "الأنشطة الاعتيادية والروتين",
        activities:
          "التدريب على الروتين اليومي: العد التزايدي والتناقصي، لوحة الأعداد، وعائلة العدد والحساب الذهني السريع.",
      },
      {
        id: "act_d1_5",
        domain: "المستويان 5 و 6 (التشخيص المتقدم)",
        activities:
          "تمرير رائز إضافي للأعداد الكبيرة، والأعداد العشرية والكسرية، والمفاهيم الهندسية والتحويلات.",
      },
    ],
    mathLevels: [
      {
        id: "ml_d1_1",
        level: "المستوى الثاني",
        structure:
          "تمرير رائز التموضع الفردي: رائز الأرقام من 0 إلى 9، والأعداد إلى 99، والجمع البسيط (أفقي وعمودي).",
      },
      {
        id: "ml_d1_2",
        level: "المستوى الثالث",
        structure:
          "رائز التموضع في الأعداد إلى 999، والجمع بالاحتفاظ، وبدايات الطرح البسيط وحل وضعية بسيطة.",
      },
      {
        id: "ml_d1_3",
        level: "المستوى الرابع",
        structure:
          "رائز التموضع الشامل: العمليات الحسابية الثلاث (جمع، طرح، ضرب بسيط) وحل مسألة من خطوة واحدة.",
      },
      {
        id: "ml_d1_4",
        level: "المستويان الخامس والسادس",
        structure:
          "رائز التموضع المتقدم: العمليات الأربع (جمع، طرح، ضرب، قسمة) ومسائل متعددة الخطوات ومفاهيم القياس.",
      },
    ],
    mathBlocks: [
      "التموضع على مستوى الأرقام: التعرف البصري والشفهي وكتابة الأرقام من 0 إلى 9.",
      "التموضع على مستوى الأعداد: تمثيل الأعداد وقراءتها ومقارنتها وترتيبها ضمن المجال العددي المحدد.",
      "التموضع على مستوى الجمع: إتقان خوارزمية الجمع أفقياً وعمودياً مع وبدون احتفاظ.",
      "التموضع على مستوى الطرح: استيعاب مفهوم الفرق واستعمال تقنية المبادلة بطريقة سليمة.",
      "التموضع على مستوى الضرب والقسمة: حفظ جداول الضرب وتوظيفها في حساب الجداءات والقسمة الإقليدية البسيطة.",
    ],
    arabicIntro:
      "ارتكزت ورشات اللغة العربية على توضيح محددات رائز الموضعة القرائية؛ حيث يتم اختبار المتعلم انطلاقاً من رائز الفقرة نزولاً أو صعوداً حسب الاستجابة، وفق شبكة سلم المستويات القرائية الخمسة المعتمدة.",
    arabicPaths: [
      {
        id: "ap_d1_1",
        path: "مستوى المبتدئ (Débutant)",
        startAndProgression:
          "المتعلم الذي يعجز عن تعرف الحروف أو يتعرف أقل من 4 حروف من أصل 5 مقترحة في الرائز.",
      },
      {
        id: "ap_d1_2",
        path: "مستوى الحرف",
        startAndProgression:
          "يقرأ المتعلم 4 حروف فأكثر بالحركات المختلفة لكنه يتعثر في قراءة الكلمات البسيطة.",
      },
      {
        id: "ap_d1_3",
        path: "مستوى الكلمة",
        startAndProgression:
          "يقرأ المتعلم 4 كلمات صحيحة على الأقل من أصل 5 ويتعثر في قراءة الفقرة بانسيابية وطلاقة.",
      },
      {
        id: "ap_d1_4",
        path: "مستوى الفقرة / الأقصوصة",
        startAndProgression:
          "يقرأ المتعلم الفقرة بأقل من 3 أخطاء ويجيب بنجاح عن سؤال الفهم القرائي الصريح.",
      },
    ],
    arabicNotes: [
      "الرائز فردي ويستغرق من دقيقة إلى دقيقتين لكل متعلم مع اعتماد مبدأ التشجيع والمرونة وتفادي إحراج المتعلم.",
      "يمنع مقاطعة التلميذ أثناء القراءة ويُسجل الخطأ فقط إذا لم يُصححه المتعلم تلقائياً خلال ثانيتين.",
      "يتم تفريغ النتائج آنياً على منصة مسار (Massar) للحصول على لوائح الأفواج المفيأة آلياً وبدقة.",
    ],
    arabicValidationTitle: "ضوابط تفريغ واستثمار نتائج الرائز التشخيصي في العربية",
    arabicValidationText:
      "تُسجل أعلى درجة تمكن حققها المتعلم دون احتساب الترددات البسيطة. والهدف من الرائز ليس التنقيط الجزائي، بل التشخيص الدقيق للمستوى الفعلي لضمان توجيه التلميذ للمسار المناسب (مسار 1 أو 2 أو 3).",
    frenchTitle: "Premier Axe: Français — Protocole de Passation du Test Diagnostique",
    frenchIntro:
      "La session a été consacrée à la maîtrise du protocole de passation individuelle du test diagnostique de positionnement TaRL en langue française. L'évaluation individuelle bienveillante permet d'identifier avec précision le seuil d'entrée de chaque apprenant.",
    frenchBullets: [
      "Passation individuelle en face à face : durée moyenne de 2 à 3 minutes par élève.",
      "Paliers de positionnement : Débutant, Lettre, Mot simple, Mot avec difficulté, et Paragraphe/Texte.",
      "Principe de bienveillance : encouragement sans donner d'indices ni corriger pendant la passation.",
      "Règle de franchissement : arrêt du test dès que le seuil d'erreur maximal est atteint (seuil de rupture).",
      "Saisie instantanée sur le système Massar pour générer automatiquement la carte des besoins de la classe.",
    ],
    frenchValidationTitle: "Consignes de Passation et Seuils d'Arrêt",
    frenchValidationText:
      "Le test commence au niveau 'Paragraphe' pour les niveaux supérieurs (4e, 5e, 6e) et au niveau 'Mot' ou 'Lettre' pour les niveaux 2e et 3e. La validation du palier exige une lecture correcte et fluide d'au moins 80% des items proposés.",
    synthesisTitle: "خلاصة وتركيب اليوم الأول وتوصيات التمرير",
    synthesisText:
      "خلصت أشغال اليوم الأول إلى أن الموضعة التشخيصية الدقيقة والشفافة هي الضامن الأساس لنجاح التدخل العلاجي بمؤسسات الريادة. وتم الاتفاق على الشروع في تمرير الروائز وفق الجدولة الزمنية المحددة، مع توفير كافة الظروف المادية واللوجستية الكفيلة بإجراء التقويم في جو يسوده التحفيز وتكافؤ الفرص.",
    teacherName: "رضوان ميموني",
    directorName: "السيد(ة) المدير(ة)",
    inspectorName: "السيد(ة) المفتش(ة) التربوي(ة)",
    city: "تمارة",
    signDate: "03 شتنبر 2026",
  },

  day2: {
    title: "تقرير اليوم الثاني من الورشات التذكيرية لدعم التعلمات الأساس بمؤسسات الريادة",
    dayNumber: "اليوم الثاني",
    subtitle: "هندسة المسارات • بنية اللبنات • مساطر التصديق والمعالجة المركزة",
    projectName: "مشروع «مؤسسات الريادة»",
    dateText: "الجمعة 04 شتنبر 2026",
    preparedBy: "الأستاذ(ة)",
    institution: "مدرسة طارق بن زياد الابتدائية (مؤسسة ريادة)",
    academicYear: "2026 / 2027",
    technicalCard: {
      targetAudience: "أستاذات وأساتذة مؤسسات الريادة",
      sessionNature: "ورشات تخصصية وتطبيقية (المسارات والبنية الزمنية للبنات)",
      axes: "الموضعة، المسارات، اللبنات/الفترات في المواد الثلاث",
      strategicObjective:
        "توحيد الممارسات الصفية والمفاهيم المعتمدة للانتقال المنظم للمتعلمين من مرحلة نتائج الموضعة إلى المسارات التعليمية المحددة، وفق بنية اللبنات والفترات المعتمدة برسم برنامج الدعم (24 يوماً).",
    },
    generalIntro:
      "تمحورت أشغال اليوم الثاني حول الجوانب المنهجية والتنظيمية لتنزيل أنشطة الدعم الميداني؛ حيث تم تحليل هيكلة المسارات في المواد الثلاث، وتحديد محطات التقويم المرحلي (التصديق)، وآليات المعالجة الفورية الموجهة للمتعثرين لضمان عدم مراكمة التعثرات أثناء سيرورة الدعم المكثف.",
    mathIntro:
      "تعتمد هندسة مسارات الرياضيات على مقاربة تراكمية تضمن تثبيت مكتسبات كل لبنة قبل الانتقال للبنة الموالية، مع تقسيم زمن الحصة الصفي (60 دقيقة) بدقة بين الأنشطة الاعتيادية والمناولة وبناء المفهوم والتطبيقات والألعاب.",
    mathActivities: [
      {
        id: "act_d2_1",
        domain: "الحساب الذهني والاعتيادي (15 دقيقة)",
        activities:
          "جداول الجمع والطرح شفهياً، بطاقات الأعداد، الخريطة الذهنية لعائلة العدد، وتقنيات الحساب السريع اليومي.",
      },
      {
        id: "act_d2_2",
        domain: "بناء المفهوم والمناولة (30 دقيقة)",
        activities:
          "استعمال الخشيبات والحزم، جدول العد، المعداد الورقي، لعبة النقود، وبطاقات التفكيك لتمثيل العمليات.",
      },
      {
        id: "act_d2_3",
        domain: "التطبيق الذاتي والألعاب (15 دقيقة)",
        activities:
          "التدرب الفردي على الكراسة، ألعاب تعزيز الحساب (Tic Tac Toe، الحجلة الرياضية، البطاقات المقلوبة).",
      },
      {
        id: "act_d2_4",
        domain: "حل المسائل التوليدية",
        activities:
          "تطبيق استراتيجية الأسئلة الأربعة لفهم المسألة الرياضية وحلها خطوة بخطوة.",
      },
      {
        id: "act_d2_5",
        domain: "أنشطة التحدي والقياس (م 5 و 6)",
        activities:
          "الأعداد العشرية والكسرية، التحويلات في جدول وحدات القياس، والإنشاءات الهندسية الأساسية.",
      },
    ],
    mathLevels: [
      {
        id: "m1",
        level: "الثاني ابتدائي",
        structure:
          "مسار موحد: التركيز على أعداد الأساس، عمليات الجمع البسيطة، حل المسائل التركيبية.",
      },
      {
        id: "m2",
        level: "الثالث ابتدائي",
        structure:
          "مساران متميزان: تتحدد معالمهما بناءً على مستوى التموقع (الانتقال نحو الطرح).",
      },
      {
        id: "m3",
        level: "الرابع ابتدائي",
        structure:
          "ثلاثة مسارات: إضافة مسار ثالث متقدم يستجيب للتموضعات الأعلى ويفتح المجال نحو القسمة.",
      },
      {
        id: "m4",
        level: "الخامس والسادس",
        structure:
          "ثلاثة مسارات متقدمة: تتناول الأعداد الصحيحة والعشرية والكسرية، الحساب والقياس، والأنشطة الهندسية.",
      },
    ],
    mathBlocks: [
      "لبنة الجمع: القراءة والكتابة وترتيب الأعداد، مع التدريب على الحفظ والاحتفاظ وحل وضعيات مشكلة.",
      "لبنة الطرح: تطوير المبادلة وربطها بمهارات الحساب الذهني وحل المسائل.",
      "لبنة الضرب: الاستئناس بجداول الضرب وتنفيذ العمليات وتوظيفها في حل الوضعيات.",
      "لبنة القسمة: ضبط تقنيات القسمة وتوظيفها المباشر في الوضعيات المشكلة.",
      "لبنة التحدي (المستويات العليا): الأعداد العشرية والكسرية، العمليات المعقدة، القياس والأشكال الهندسية.",
    ],
    arabicIntro:
      "تستند أنشطة الدعم في اللغة العربية إلى معالجة التعثرات التشخيصية بشكل متدرج؛ حيث تُفتح اللبنات اللاحقة بناءً على التمكن من اللبنات السابقة (الحرف ← الكلمة ← الجملة/الفقرة ← الأقصوصة ← التحدي)، وفق الهدف النهائي للسطر البرمجي للمسار.",
    arabicPaths: [
      {
        id: "a1",
        path: "المسار 1",
        startAndProgression:
          "ينطلق من لبنة الحرف ويستهدف المستويات من الثاني إلى السادس (مع اختلاف لبنة الوصول).",
      },
      {
        id: "a2",
        path: "المسار 2",
        startAndProgression:
          "ينطلق من لبنة الكلمة ويغطي المستويات من الثاني إلى السادس.",
      },
      {
        id: "a3",
        path: "المسار 3",
        startAndProgression:
          "ينطلق من مستويات قرائية أعلى، مخصص للمستويين الخامس والسادس.",
      },
    ],
    arabicNotes: [
      "يتم إسناد المسار رقمياً وعبر منظومة مسار (Massar) اعتماداً على الموضعة، ولا تُعدل بناءً على انطباعات شخصية.",
      "تتفاوت إيقاعات التعلم حسب المستوى، مع الحفاظ على المنطق المتدرج للبنات خلال فترة 24 يومًا.",
    ],
    arabicValidationTitle: "مسطرة التصديق والمعالجة (شروط المصادقة على اللبنة)",
    arabicValidationText:
      "عند تجاوز مدة اللبنة (4 أيام). يُمرر روائز التصديق في اليوم الأخير. تتحقق المصادقة عند إجراء 70% فأكثر من التمكن. وفي حال الحصول على أقل من 70%، يُخصص يومان إضافيان للمعالجة المركزة بالتنسيق مع المفتش التربوي.",
    frenchTitle: "Deuxième Axe: Français — Positionnement & Parcours",
    frenchIntro:
      "Le positionnement en français repose sur une progression rigoureuse par niveaux : Débutant, Lettre, Mot simple, Mot avancé, Mot avec graphème complexe, Phrase avec difficulté particulière, et Texte. La compréhension constitue un indicateur de suivi et non un critère de positionnement direct.",
    frenchBullets: [
      "Chaque niveau de positionnement renvoie à un palier d’apprentissage précis.",
      "Le programme est structuré en 6 paliers; chaque groupe suit un seul parcours durant la remédiation.",
      "Massar détermine automatiquement le parcours du groupe à partir des résultats initialement saisies.",
      "Le rythme de progression et le point d’aboutissement varient selon le niveau scolaire et le palier de départ.",
      "Une séance de rebrassage est prévue lorsque la durée du palier dépasse 10 jours.",
    ],
    frenchValidationTitle: "Validation des paliers en Français",
    frenchValidationText:
      "Au-delà de 4 jours, un test est prévu le dernier jour. La lecture est le critère de validation (seuil de 70% de maîtrise), tandis que le vocabulaire sert au suivi. Si le seuil n'est pas atteint, 2 jours de remédiation ciblée sont ajoutés.",
    synthesisTitle: "خلاصة تركيبية وتوصيات اليوم الثاني",
    synthesisText:
      "أجمعت أعمال الورشات على أن نتائج تشخيص الوضعية تُعدّ موطناً لاستثمار بيداغوجي دقيق وليس مجرد أداة لتصنيف المتعلمين. فهي الموجه الأساسي لتحديد المسارات الزمنية والمحتويات التعليمية، يخضع معها الانتقال بين اللبنات والفترات لمسطرة موحدة من التتبع والتصديق، بما يضمن انسجام الممارسات بين المؤسسات وتكافؤ الفرص لدى المتعلمين.",
    teacherName: "رضوان ميموني",
    directorName: "السيد(ة) المدير(ة)",
    inspectorName: "السيد(ة) المفتش(ة) التربوي(ة)",
    city: "تمارة",
    signDate: "04 شتنبر 2026",
  },

  day3: {
    title: "تقرير اليوم الثالث من الورشات التذكيرية لدعم التعلمات الأساس بمؤسسات الريادة",
    dayNumber: "اليوم الثالث",
    subtitle: "الوسائل الديداكتيكية • استراتيجيات التدريس الصريح • التقييم والمصادقة النهائية",
    projectName: "مشروع «مؤسسات الريادة»",
    dateText: "السبت 05 شتنبر 2026",
    preparedBy: "الأستاذ(ة)",
    institution: "مدرسة طارق بن زياد الابتدائية (مؤسسة ريادة)",
    academicYear: "2026 / 2027",
    technicalCard: {
      targetAudience: "أستاذات وأساتذة مؤسسات الريادة",
      sessionNature: "ورشات تخصصية ومناقشة تطبيقية ومحاكاة صفية",
      axes: "الوسائل الديداكتيكية، ألعاب الدعم، التدريس الصريح، والتقويم البعدي",
      strategicObjective:
        "استثمار الوسائل البيداغوجية والمناولة الحسية، تمكين المدرسين من ضبط استراتيجيات التدريس الصريح وإدارة الأنشطة التفاعلية الداعمة، وتأطير التقييم البعدي وتوثيق الأثر وتأشير الوثائق.",
    },
    generalIntro:
      "خصص اليوم الثالث والأخير من هذه السلسلة التكوينية لاستكمال تقديم العروض التخصصية ومناقشة المساطر التطبيقية الميدانية المتعلقة بتنفيذ أنشطة الدعم المكثف. وقد تم التركيز بشكل أساسي على معالجة الأنشطة والوسائل الديداكتيكية بالرياضيات وتحديد آليات التتبع والصعوبات في اللغة العربية، بالإضافة إلى تفكيك هيكلة وسيناريو أنشطة المعالجة المركزة (Remédiation Intensive) باللغة الفرنسية.",
    mathIntro:
      "تم جرد الوسائل والأنشطة الديداكتيكية وتفييفها حسب الهدف التعليمي واللبنة المستهدفة، مع التشديد على عدم تسيير الوسيلة التعليمية خارج النطاق المخصص لها، ووجوب احترام التدرج البيداغوجي من \"المناولة وبناء المفهوم\" وصولاً إلى \"التمرين والاستثمار\".",
    mathActivities: [
      {
        id: "act1",
        domain: "الأنشطة الاعتيادية",
        activities:
          "جداول الجمع والطرح شفهياً، الخريطة الذهنية لعائلة العدد، جداول الضرب، لوحة قراءة الأعداد وبطاقات الأعداد.",
      },
      {
        id: "act2",
        domain: "بناء مفهوم العدد",
        activities:
          "الحزم والخشيبات، عجلة الأعداد، بطاقات التفكيك، ولعبة النقود المكثية وفق نطاق الأعداد.",
      },
      {
        id: "act3",
        domain: "العمليات والمسائل",
        activities:
          "نمذجة الجمع والطرح، تقنيات الضرب (الصندوق، السلم، القيمة المكانية)، القسمة (بالخشيبات/النقود/جدول الضرب)، واستراتيجية الأسئلة الأربعة لحل المسائل.",
      },
      {
        id: "act4",
        domain: "الألعاب الداعمة",
        activities:
          "المعداد الورقي، لعبة الحجلة والعنكبوت، رمي الكرة، البطاقات المقلوبة، ولعبة Tic Tac Toe.",
      },
      {
        id: "act5",
        domain: "المستويان 5 و 6",
        activities:
          "إضافة نشاط اعتيادي هندسي موجه للتدرب المنهجي على استعمال الأدوات الهندسية (المسطرة، الكوس، البركار).",
      },
    ],
    mathLevels: [
      {
        id: "m1",
        level: "الثاني ابتدائي",
        structure:
          "مسار موحد: التركيز على أعداد الأساس، عمليات الجمع البسيطة، حل المسائل التركيبية.",
      },
      {
        id: "m2",
        level: "الثالث ابتدائي",
        structure:
          "مساران متميزان: تتحدد معالمهما بناءً على مستوى التموقع (الانتقال نحو الطرح).",
      },
      {
        id: "m3",
        level: "الرابع ابتدائي",
        structure:
          "ثلاثة مسارات: إضافة مسار ثالث متقدم يستجيب للتموضعات الأعلى ويفتح المجال نحو القسمة.",
      },
      {
        id: "m4",
        level: "الخامس والسادس",
        structure:
          "ثلاثة مسارات متقدمة: تتناول الأعداد الصحيحة والعشرية والكسرية، الحساب والقياس، والأنشطة الهندسية.",
      },
    ],
    mathBlocks: [
      "لبنة الجمع: القراءة والكتابة وترتيب الأعداد، مع التدريب على الحفظ والاحتفاظ وحل وضعيات مشكلة.",
      "لبنة الطرح: تطوير المبادلة وربطها بمهارات الحساب الذهني وحل المسائل.",
      "لبنة الضرب: الاستئناس بجداول الضرب وتنفيذ العمليات وتوظيفها في حل الوضعيات.",
      "لبنة القسمة: ضبط تقنيات القسمة وتوظيفها المباشر في الوضعيات المشكلة.",
      "لبنة التحدي (المستويات العليا): الأعداد العشرية والكسرية، العمليات المعقدة، القياس والأشكال الهندسية.",
    ],
    arabicIntro:
      "تم تعميق النقاش حول استراتيجيات الطلاقة والفهم القرائي؛ واستعمال لوحة الكلمات البصرية، والقراءة بالصدى، والقراءة الثنائية التناوبية، مع مسرحة النصوص القصيرة لتعزيز الثقة بالنفس وتنمية التعبير الشفهي.",
    arabicPaths: [
      {
        id: "a1",
        path: "المسار 1 (الأساس)",
        startAndProgression:
          "ينطلق من لبنة الحرف والوعي الصوتي ويستهدف المستويات من الثاني إلى السادس عبر التدرج التراكمي.",
      },
      {
        id: "a2",
        path: "المسار 2 (المتوسط)",
        startAndProgression:
          "ينطلق من لبنة الكلمة وتركيب الجمل والطلاقة ويغطي المستويات من الثاني إلى السادس.",
      },
      {
        id: "a3",
        path: "المسار 3 (المتقدم)",
        startAndProgression:
          "ينطلق من قراءة النصوص القصيرة واستخراج المعاني الصريحة والضمنية، مخصص للمستويين 5 و 6.",
      },
    ],
    arabicNotes: [
      "توظيف مبادئ التدريس الصريح: النمذجة (أنا أعمل)، الممارسة الموجهة (نحن نعمل)، والممارسة المستقلة (أنت تعمل).",
      "اعتماد التغذية الراجعة الفورية والإيجابية وتخصيص ركن القراءة الحرة بالقسم.",
      "التتبع اليومي للتقدم عبر شبكات التتبع الفردية والجماعية لتوثيق أثر الدعم.",
    ],
    arabicValidationTitle: "معايير التقويم البعدي والتصديق النهائي بالعربية",
    arabicValidationText:
      "يُجرى الرائز البعدي في ختام مرحلة الدعم المكثف (بعد 24 يوماً) بنفس منهجية وضوابط الرائز القبلي لقياس نسبة التطور الفعلي وتحقيق مؤشرات الجودة المنصوص عليها في دفتر تحملات مدارس الريادة.",
    frenchTitle: "Troisième Axe: Français — Remédiation Intensive & Outils",
    frenchIntro:
      "La troisième journée a permis d'approfondir la mise en œuvre des techniques de remédiation intensive : exploitation optimale du guide de l'enseignant, flashcards, ardoises individuelles, lecture chronométrée, et feedback bienveillant immédiat.",
    frenchBullets: [
      "Utilisation systématique des flashcards et étiquettes-mots pour la fluidité lexicale.",
      "Pratique guidée interactive par binômes et groupes de besoin.",
      "Lecture répétée et chronométrée pour développer la vitesse et la précision du décodage.",
      "Dictée flash quotidienne sur ardoise pour consolider les correspondances graphème-phonème.",
      "Bilan post-test final pour mesurer le saut qualitatif des acquis des apprenants.",
    ],
    frenchValidationTitle: "Validation Finale et Suivi Pédagogique",
    frenchValidationText:
      "Le test bilan post-remédiation valide le passage définitif au programme scolaire régulier avec des compétences consolidées en lecture, écriture et compréhension de base.",
    synthesisTitle: "خلاصة تركيبية وتوصيات الختام لأيام الورشات",
    synthesisText:
      "تُوجت أشغال الورشات التذكيرية الثلاث باتفاق تام على خطة العمل الإجرائية لتنفيذ أسابيع الدعم المكثف بمؤسسات الريادة. وقد أبان السيدات والسادة الأساتذة عن انخراط مسؤول واستعداد عالٍ لتطبيق مقاربة التدريس وفق المستوى المناسب بكل دقة، مؤكدين على أهمية توفير العدة البيداغوجية الكاملة، واستثمار نتائج التقويم التشخيصي لضمان بداية موفقة وناجحة للموسم الدراسي.",
    teacherName: "رضوان ميموني",
    directorName: "السيد(ة) المدير(ة)",
    inspectorName: "السيد(ة) المفتش(ة) التربوي(ة)",
    city: "تمارة",
    signDate: "05 شتنبر 2026",
  },

  summary: {
    title: "التقرير التركيبي الإجمالي: أشغال الورشات التذكيرية لدعم التعلمات الأساس",
    dayNumber: "التقرير الإجمالي الشامل (3 أيام)",
    subtitle: "مشروع مؤسسات الريادة • التشخيص، هندسة المسارات، والممارسات الصفية الديداكتيكية",
    projectName: "مشروع «مؤسسات الريادة»",
    dateText: "من 03 إلى 05 شتنبر 2026",
    preparedBy: "الأستاذ(ة)",
    institution: "مدرسة طارق بن زياد الابتدائية (مؤسسة ريادة)",
    academicYear: "2026 / 2027",
    technicalCard: {
      targetAudience: "أستاذات وأساتذة مؤسسات الريادة بسلك التعليم الابتدائي",
      sessionNature: "سلسلة ورشات تذكيرية متكاملة (نظرية، تطبيقية، وديداكتيكية)",
      axes: "التشخيص والموضعة، هندسة المسارات والبنية الزمنية، والوسائل الديداكتيكية",
      strategicObjective:
        "الارتقاء بجودة التعلمات الأساس بمؤسسات الريادة عبر التحكم في مقاربة طارل (TaRL)، وتوحيد ممارسات الموضعة التشخيصية وتدبير المسارات التراكمية، واستثمار الوسائل الديداكتيكية لتحقيق الأهداف التربوية المسطرة.",
    },
    generalIntro:
      "شكلت الورشات التذكيرية لدعم التعلمات الأساس بمؤسسات الريادة، الممتدة على مدى ثلاثة أيام، محطة تأطيرية بالغة الأهمية لتوحيد الرؤى البيداغوجية وضبط الإجراءات العملية لتنزيل مقاربة التدريس وفق المستوى المناسب (TaRL). وقد تناولت الأيام الثلاثة بالتتابع: اليوم الأول المخصص لروائز الموضعة التشخيصية والتفييء، واليوم الثاني المخصص لهندسة المسارات والبنية الزمنية للبنات ومساطر التصديق، واليوم الثالث المخصص للوسائل الديداكتيكية واستراتيجيات التدريس الصريح والمصادقة النهائية.",
    mathIntro:
      "تعتمد هندسة الرياضيات على استثمار دقيق لنتائج الموضعة من أجل توجيه المتعلمين نحو مسارات متدرجة تمتد على 24 يوماً من الدعم المركز، تجمع بين الحساب الاعتيادي، وبناء المفهوم بالمناولة الحسية، وحل المسائل، والألعاب الداعمة.",
    mathActivities: [
      {
        id: "act_sum_1",
        domain: "الأنشطة الاعتيادية والروتين",
        activities:
          "جداول الجمع والطرح شفهياً، الخريطة الذهنية لعائلة العدد، جداول الضرب، وبطاقات الأعداد.",
      },
      {
        id: "act_sum_2",
        domain: "بناء مفهوم العدد والعمليات",
        activities:
          "الحزم والخشيبات، عجلة الأعداد، بطاقات التفكيك، ولعبة النقود المكثية لتمثيل العمليات.",
      },
      {
        id: "act_sum_3",
        domain: "التقنيات الاعتيادية والمسائل",
        activities:
          "نمذجة الجمع والطرح والضرب والقسمة، واستراتيجية الأسئلة الأربعة لحل المسائل الواقعية.",
      },
      {
        id: "act_sum_4",
        domain: "الألعاب التفاعلية الداعمة",
        activities:
          "المعداد الورقي، لعبة الحجلة والعنكبوت، رمي الكرة، ولعبة Tic Tac Toe لترسيخ المفاهيم.",
      },
      {
        id: "act_sum_5",
        domain: "أنشطة التحدي والهندسة (م 5 و 6)",
        activities:
          "الأعداد العشرية والكسرية، قياس الأطوال والمساحات، والتدرب على استعمال الأدوات الهندسية.",
      },
    ],
    mathLevels: [
      {
        id: "ml_sum_1",
        level: "المستوى الثاني",
        structure:
          "مسار موحد: التركيز على أعداد الأساس، عمليات الجمع البسيطة، وحل المسائل التركيبية.",
      },
      {
        id: "ml_sum_2",
        level: "المستوى الثالث",
        structure:
          "مساران متميزان: يتحددان بناءً على مستوى التموقع (الانتقال السلس نحو الطرح).",
      },
      {
        id: "ml_sum_3",
        level: "المستوى الرابع",
        structure:
          "ثلاثة مسارات: إضافة مسار ثالث متقدم يستجيب للتموضعات الأعلى ويفتح المجال نحو الضرب والقسمة.",
      },
      {
        id: "ml_sum_4",
        level: "المستويان الخامس والسادس",
        structure:
          "ثلاثة مسارات متقدمة: تتناول الأعداد الصحيحة والعشرية والكسرية، والحساب والقياس، والأنشطة الهندسية.",
      },
    ],
    mathBlocks: [
      "لبنة الجمع: القراءة والكتابة وترتيب الأعداد مع التدريب على الحفظ والاحتفاظ وحل المسائل.",
      "لبنة الطرح: تطوير المبادلة وربطها بمهارات الحساب الذهني السريع وحل الوضعيات.",
      "لبنة الضرب: الاستئناس بجداول الضرب وتنفيذ العمليات وتوظيفها في حل المسائل.",
      "لبنة القسمة: ضبط تقنيات القسمة وتوظيفها المباشر في الوضعيات المشكلة.",
      "لبنة التحدي (المستويات العليا): الأعداد العشرية والكسرية، العمليات المركبة، القياس والأشكال الهندسية.",
    ],
    arabicIntro:
      "تعتمد استراتيجية اللغة العربية على التدرج التصاعدي من الحرف إلى النص المركب عبر مسارات موجهة تضمن إتقان الوعي الصوتي والمبدأ الألفبائي والطلاقة والفهم الصريح والضمني.",
    arabicPaths: [
      {
        id: "ap_sum_1",
        path: "المسار 1 (الحرف)",
        startAndProgression:
          "ينطلق من لبنة الحرف ويستهدف المستويات من الثاني إلى السادس لعلاج التعثرات النطقية والكتابية.",
      },
      {
        id: "ap_sum_2",
        path: "المسار 2 (الكلمة)",
        startAndProgression:
          "ينطلق من لبنة الكلمة وتنمية الطلاقة وقراءة الجمل لجميع المستويات من الثاني إلى السادس.",
      },
      {
        id: "ap_sum_3",
        path: "المسار 3 (الفهم والنص)",
        startAndProgression:
          "ينطلق من الفقرة والأقصوصة واستراتيجيات الفهم القرائي المتقدم للمستويين 5 و 6.",
      },
    ],
    arabicNotes: [
      "إسناد المسارات آلياً عبر منظومة مسار (Massar) بناءً على النتائج التشخيصية المحققة.",
      "احترام البرمجة الزمنية المحددة للبنات (4 أيام لكل لبنة + يومان للمعالجة المركزة عند عدم الاستيفاء).",
      "اعتماد استراتيجيات التدريس الصريح: النمذجة والممارسة الموجهة والممارسة المستقلة.",
    ],
    arabicValidationTitle: "مسطرة التصديق والمعالجة (شروط المصادقة على اللبنة)",
    arabicValidationText:
      "تتحقق المصادقة عند إحراز 70% فأكثر في روائز التصديق الممررة في ختام كل لبنة. وفي حال عدم استيفاء العتبة، يخضع المتعلم ليومي معالجة مركزة تضمن تدارك النواقص قبل المرور للبنة الموالية.",
    frenchTitle: "Axe Synthèse: Français — Paliers, Parcours & Remédiation",
    frenchIntro:
      "Le dispositif TaRL en français structure les apprentissages en 6 paliers progressifs (Débutant, Lettre, Mot simple, Mot avec difficulté, Phrase/Paragraphe, Texte) selon une approche explicite et dynamique.",
    frenchBullets: [
      "Passation diagnostique bienveillante et répartition automatisée par groupes de besoin sur Massar.",
      "Structuration rigoureuse du temps : Routine lexicale, Modélisation, Pratique guidée et Pratique autonome.",
      "Séance de rebrassage obligatoire lorsque le palier dépasse 10 jours de travail.",
      "Validation stricte des paliers au seuil de 70% en lecture fluide et précise.",
      "Évaluation post-test finale pour certifier l'acquisition des compétences de base.",
    ],
    frenchValidationTitle: "Validation et Suivi Pédagogique en Français",
    frenchValidationText:
      "La maîtrise de la lecture constitue le critère déterminant de validation. Le vocabulaire et la compréhension font l'objet d'un suivi formatif continu tout au long des 24 jours de remédiation.",
    synthesisTitle: "خلاصة عامة وتوصيات تنفيذية لمشروع الريادة",
    synthesisText:
      "أجمعت مداولات الورشات التذكيرية على الجاهزية التربوية واللوجستية التامة لانطلاق أسابيع الدعم المكثف بمؤسسات الريادة. وتم التأكيد على الالتزام الصارم بالتوجيهات الرسمية، وتفعيل شبكات التتبع والمصادقة، والعمل بروح الفريق التربوي المتكامل لضمان تمكين جميع المتعلمات والمتعلمين من كفايات القراءة والكتابة والحساب.",
    teacherName: "رضوان ميموني",
    directorName: "السيد(ة) المدير(ة)",
    inspectorName: "السيد(ة) المفتش(ة) التربوي(ة)",
    city: "تمارة",
    signDate: "05 شتنبر 2026",
  },
};

export const DEFAULT_WORKSHOP_REPORT: WorkshopReportData = WORKSHOP_REPORTS_TEMPLATES.day3;

