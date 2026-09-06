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
  academy: "الأكاديمية الجهوية للتربية والتكوين لجهة الرباط - سلا - القنيطرة",
  directorate: "المديرية الإقليمية بالصخيرات - تمارة",
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

export const DEFAULT_WORKSHOP_REPORT: WorkshopReportData = {
  title: "تقرير أشغال اليوم الثاني من الورشات التذكيرية",
  dayNumber: "اليوم الثاني",
  subtitle: "برنامج الدعم المكثف للتعلمات الأساس — مشروع «مؤسسات الريادة»",
  projectName: "مشروع «مؤسسات الريادة»",
  dateText: "الجمعة 04 شتنبر 2026",
  preparedBy: "رضوان ميموني",
  institution: "مدرسة طارق بن زياد الابتدائية (مؤسسة ريادة)",
  academicYear: "2026 / 2027",
  technicalCard: {
    targetAudience: "أستاذات وأساتذة مؤسسات الريادة",
    sessionNature: "اليوم الثاني (من أصل 3 أيام) — ورشات تخصصية",
    axes: "الموضعة، المسارات، اللبنات/الفترات في المواد الثلاث",
    strategicObjective: "توحيد الرؤية للانتقال الناجع من التشخيص إلى هيكلة التعلمات",
  },
  generalIntro:
    "افتُتحت أشغال اليوم الثاني بعرض وتقييم مخرجات اليوم الأول، ليتم توزيع المشاركين حسب التخصصات الأكاديمية (الرياضيات، اللغة العربية، واللغة الفرنسية). انصبت المناقشات حول آليات ربط نتائج الموضعة بالمسارات المحددة، وضبط الهندسة الزمنية لبنية اللبنات والفترات الكفيلة بتأمين تدرج بيداغوجي فعال خلال مرحلة الدعم المكثف.",
  mathIntro:
    "أكدت الورشات أن اختيار المسار ليس دالة لاجتهاد فردي، بل يتأسس على معطيات دقيقة تُستمد من اختبارات الموضعة ومستوى العتبة داخل مجموعة الدعم، يمتد المسار على مدار 24 يومًا، مع اختلاف نقطة الانطلاق ومحطة الوصول بحسب المستوى الدراسي والتموضع.",
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
  frenchTitle: "Troisième Axe: Français — Positionnement & Parcours",
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
};

