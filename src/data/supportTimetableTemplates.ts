import { TimetableSlot } from "../types";

export interface SupportTimetableModel {
  id: string;
  title: string;
  shortTitle: string;
  badge: string;
  badgeColor: string;
  category: "continuous" | "two_shifts" | "specialized" | "level1" | "diagnostic";
  timingDescription: string;
  groupsDescription: string;
  targetLevels: string;
  weeklyHours: string;
  summary: string;
  pedagogicalRationale: string;
  features: string[];
  recommendedFor: string;
  slots: TimetableSlot[];
}

export const OFFICIAL_TIMETABLE_QUOTE = {
  quote:
    "يعتبر استعمال الزمن الوثيقة التنظيمية الأساسية التي تحدد أوقات الدخول والخروج، وتنظم الحصص الدراسية وتوزيع المواد بشكل واضح ومتوازن، بالإضافة إلى تحديد المكونات المدرسة وبرمجتها خلال الأسبوع ومددها وحصصها. كما يعتبر مرجعاً قانونياً في حالات الضرورة كالحوادث المدرسية أو النزاعات. وتراعى في إعداده ثلاثة عناصر أساسية: العنصر البشري (المدرسون والمتعلمون)، عنصر الزمن (الإيقاعات البيولوجية والعصبية)، وعنصر المكان (القاعات والفضاءات)، سواء بالأنشطة العامة أو بالدعم المكثف الموجه لمجموعات صغيرة من المتعلمين وفق مقاربة طارل (TaRL) بمؤسسات الريادة.",
  source: "دليل تدبير الزمن المدرسي وفترة الدعم المكثف • يانبوع التربية ووزارة التربية الوطنية",
  sourceUrl: "https://www.yanboutarbiya.com/2026/09/tarl.html",
};

export const SUPPORT_TIMETABLE_MODELS: SupportTimetableModel[] = [
  {
    id: "model_1_continuous_2groups",
    title: "النموذج 1: استعمال الزمن لفترة الدعم المكثف TaRL - التوقيت المسترسل (فوجين بالتناوب)",
    shortTitle: "التوقيت المسترسل (فوجين)",
    badge: "الأكثر اعتماداً بالريادة",
    badgeColor: "bg-blue-100 text-blue-900 border-blue-300",
    category: "continuous",
    timingDescription: "الفترة الصباحية (08:30 إلى 13:00) - 4 ساعات ونصف يومياً بمعدل 27 ساعة أسبوعياً",
    groupsDescription: "فوجان (فوج 1 وفوج 2) بنظام التناوب اليومي + حصص الدعم المركز في مجموعات صغيرة",
    targetLevels: "المستويات 2، 3، 4، 5، 6 ابتدائي",
    weeklyHours: "27 إلى 30 ساعة أسبوعياً",
    summary:
      "تنظيم الحصص في فترة مسترسلة صباحية (أو مسائية)، تتوزع فيها أنشطة طارل للغة العربية والرياضيات واللغة الفرنسية مع برمجة حصص الاستراحة والدعم البيداغوجي المكثف للمتعثرين.",
    pedagogicalRationale:
      "يحافظ التوقيت المسترسل على طاقة المتعلم الذهنية، ويسمح ببرمجة أنشطة الطلاقة والحساب الذهني في بداية الحصة، مع تخصيص الـ 45 دقيقة الأخيرة للدعم في مجموعات صغرى.",
    features: [
      "تغطية متوازنة للمواد الأساسية الثلاث: العربية، الرياضيات، الفرنسية",
      "تناوب مرن بين الفوج 1 والفوج 2 دون إرهاق القاعات",
      "تخصيص حصص يومية للدعم المركز (Soutien Ciblé) لمجموعة المتعثرين",
      "استراحة نظامية مدمجة (10:45 - 11:00) لتجديد النشاط العصبي",
    ],
    recommendedFor: "المؤسسات ذات الإيقاع المسترسل والقاعات المتاحة",
    slots: [
      // الإثنين
      { id: "m1_1", day: "الإثنين", startTime: "08:30", endTime: "09:45", subject: "اللغة العربية", unitOrActivity: "أنشطة طارل: فك التشفير والطلاقة القرائية", group: "الفوج 1", color: "emerald" },
      { id: "m1_2", day: "الإثنين", startTime: "09:45", endTime: "10:45", subject: "الرياضيات", unitOrActivity: "أنشطة طارل: الحساب الذهني وعمليات الجمع والطرح", group: "الفوج 1", color: "blue" },
      { id: "m1_3", day: "الإثنين", startTime: "11:00", endTime: "12:15", subject: "اللغة الفرنسية", unitOrActivity: "TaRL Français: Décodage phonologique & mots", group: "الفوج 2", color: "sky" },
      { id: "m1_4", day: "الإثنين", startTime: "12:15", endTime: "13:00", subject: "دعم مدرسة الريادة", unitOrActivity: "دعم مكثف موجه لمجموعة المتعثرين الصغرى", group: "فوج الدعم", color: "amber" },

      // الثلاثاء
      { id: "m1_5", day: "الثلاثاء", startTime: "08:30", endTime: "09:45", subject: "اللغة الفرنسية", unitOrActivity: "TaRL Français: Lecture guidée et fluence", group: "الفوج 1", color: "sky" },
      { id: "m1_6", day: "الثلاثاء", startTime: "09:45", endTime: "10:45", subject: "الرياضيات", unitOrActivity: "أنشطة طارل: جدول الضرب والمسائل الروتينية", group: "الفوج 1", color: "blue" },
      { id: "m1_7", day: "الثلاثاء", startTime: "11:00", endTime: "12:15", subject: "اللغة العربية", unitOrActivity: "أنشطة طارل: قراءة الفقرة وفهم المعنى الصريح", group: "الفوج 2", color: "emerald" },
      { id: "m1_8", day: "الثلاثاء", startTime: "12:15", endTime: "13:00", subject: "دعم مدرسة الريادة", unitOrActivity: "معالجة تعثرات الحساب وبناء مفهوم العدد", group: "فوج الدعم", color: "amber" },

      // الأربعاء
      { id: "m1_9", day: "الأربعاء", startTime: "08:30", endTime: "09:45", subject: "اللغة العربية", unitOrActivity: "أنشطة طارل: قراءة القصة وأسئلة الفهم الاستنتاجي", group: "الفوج 2", color: "emerald" },
      { id: "m1_10", day: "الأربعاء", startTime: "09:45", endTime: "10:45", subject: "الرياضيات", unitOrActivity: "أنشطة طارل: العمليات الحسابية الممتدة", group: "الفوج 2", color: "blue" },
      { id: "m1_11", day: "الأربعاء", startTime: "11:00", endTime: "12:15", subject: "اللغة الفرنسية", unitOrActivity: "TaRL Français: Phrases simples & Compréhension", group: "الفوج 1", color: "sky" },
      { id: "m1_12", day: "الأربعاء", startTime: "12:15", endTime: "13:00", subject: "أنشطة الحياة المدرسية", unitOrActivity: "ألعاب لغوية وحسابية محفزة (Ludo-pédagogie)", group: "الكل", color: "purple" },

      // الخميس
      { id: "m1_13", day: "الخميس", startTime: "08:30", endTime: "09:45", subject: "اللغة العربية", unitOrActivity: "أنشطة طارل: الإملاء المنظور والإنتاج القصير", group: "الفوج 1", color: "emerald" },
      { id: "m1_14", day: "الخميس", startTime: "09:45", endTime: "10:45", subject: "الرياضيات", unitOrActivity: "أنشطة طارل: حل مسائل الحياة اليومية", group: "الفوج 1", color: "blue" },
      { id: "m1_15", day: "الخميس", startTime: "11:00", endTime: "12:15", subject: "اللغة الفرنسية", unitOrActivity: "TaRL Français: Activités de renforcement écrit", group: "الفوج 2", color: "sky" },
      { id: "m1_16", day: "الخميس", startTime: "12:15", endTime: "13:00", subject: "دعم مدرسة الريادة", unitOrActivity: "دعم فردي موجه: قراءة المقاطع وتركيب الكلمات", group: "فوج الدعم", color: "amber" },

      // الجمعة
      { id: "m1_17", day: "الجمعة", startTime: "08:30", endTime: "09:45", subject: "اللغة الفرنسية", unitOrActivity: "TaRL Français: Histoire courte et jeux de rôles", group: "الفوج 2", color: "sky" },
      { id: "m1_18", day: "الجمعة", startTime: "09:45", endTime: "10:45", subject: "الرياضيات", unitOrActivity: "أنشطة طارل: التمرن المستقل وتثبيت المكتسبات", group: "الفوج 2", color: "blue" },
      { id: "m1_19", day: "الجمعة", startTime: "11:00", endTime: "12:15", subject: "اللغة العربية", unitOrActivity: "أنشطة طارل: مهارات التعبير الشفهي والتواصل", group: "الفوج 1", color: "emerald" },

      // السبت
      { id: "m1_20", day: "السبت", startTime: "08:30", endTime: "10:00", subject: "التقويم والمعالجة المركزة", unitOrActivity: "روائز مصغرة للتحقق الأسبوعي وتفييء الأفواج", group: "الكل", color: "rose" },
      { id: "m1_21", day: "السبت", startTime: "10:15", endTime: "11:45", subject: "دعم مدرسة الريادة", unitOrActivity: "أنشطة تثبيت المسارات والمجموعات التفاعلية", group: "الكل", color: "amber" },
    ],
  },
  {
    id: "model_2_two_shifts_4groups",
    title: "النموذج 2: استعمال الزمن لفترة الدعم TaRL - التوقيت العادي (فترتان: صباحية ومسائية - 4 أفواج)",
    shortTitle: "التوقيت العادي (فترتان - 4 أفواج)",
    badge: "صيغة الفترتين المزدوجة",
    badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
    category: "two_shifts",
    timingDescription: "الصباح (08:30 إلى 12:30) والمساء (14:30 إلى 16:30) مع استراحة الغداء",
    groupsDescription: "4 أفواج (G1, G2, G3, G4) بتناوب الفترات الصباحية والمسائية",
    targetLevels: "المستويات المشتركة والمؤسسات ذات الاكتظاظ المرتفع",
    weeklyHours: "30 ساعة أسبوعياً مقسمة بانتظام",
    summary:
      "توزيع زمني كلاسيكي بفترتين يتيح للمؤسسات التي تضم 4 أفواج استغلال القاعات بالتناوب، مع الحفاظ على وتيرة يومية مستمرة للدعم المكثف طارل في المواد الأساسية.",
    pedagogicalRationale:
      "يتيح نظام الفترتين توزيعاً متساوياً للجهد الذهني لدى المتعلمين بين الصباح والمساء، ويضمن استفادة الأفواج الأربعة من الدعم دون تداخل القاعات.",
    features: [
      "ملاءمة للمؤسسات التي تعتمد نظام الفترتين ونصف الإقامة",
      "استيعاب 4 أفواج دراسية متمايزة حسب مسارات طارل",
      "تخصيص الفترة المسائية للتطبيقات العملية وحل المشكلات",
      "فترة استراحة مريحة بين الصباح والمساء لتفادي الإجهاد",
    ],
    recommendedFor: "المدارس ذات الضغط على الحجرات ونظام الدوامين",
    slots: [
      // الإثنين
      { id: "m2_1", day: "الإثنين", startTime: "08:30", endTime: "10:15", subject: "اللغة العربية", unitOrActivity: "أنشطة طارل: حروف وكلمات وطلاقة شفهية", group: "الفوج 1", color: "emerald" },
      { id: "m2_2", day: "الإثنين", startTime: "10:30", endTime: "12:15", subject: "الرياضيات", unitOrActivity: "أنشطة طارل: مفهوم العدد والجمع والطرح بالاحتفاظ", group: "الفوج 1", color: "blue" },
      { id: "m2_3", day: "الإثنين", startTime: "14:30", endTime: "15:30", subject: "اللغة الفرنسية", unitOrActivity: "TaRL: Mots usuels et phonologie", group: "الفوج 2", color: "sky" },
      { id: "m2_4", day: "الإثنين", startTime: "15:30", endTime: "16:30", subject: "دعم مدرسة الريادة", unitOrActivity: "الدعم المكثف في مجموعات صغرى (Ateliers ciblés)", group: "الفوج 2", color: "amber" },

      // الثلاثاء
      { id: "m2_5", day: "الثلاثاء", startTime: "08:30", endTime: "10:15", subject: "اللغة الفرنسية", unitOrActivity: "TaRL: Décodage, lecture à voix haute et fluidité", group: "الفوج 2", color: "sky" },
      { id: "m2_6", day: "الثلاثاء", startTime: "10:30", endTime: "12:15", subject: "الرياضيات", unitOrActivity: "أنشطة طارل: جداول الضرب والعمليات الأساسية", group: "الفوج 2", color: "blue" },
      { id: "m2_7", day: "الثلاثاء", startTime: "14:30", endTime: "15:30", subject: "اللغة العربية", unitOrActivity: "أنشطة طارل: قراءة نصوص قصيرة والإجابة عن الأسئلة", group: "الفوج 1", color: "emerald" },
      { id: "m2_8", day: "الثلاثاء", startTime: "15:30", endTime: "16:30", subject: "دعم مدرسة الريادة", unitOrActivity: "تدارك تعثرات القراءة والتهجئة الفردية", group: "الفوج 1", color: "amber" },

      // الأربعاء
      { id: "m2_9", day: "الأربعاء", startTime: "08:30", endTime: "10:15", subject: "اللغة العربية", unitOrActivity: "أنشطة طارل: فهم المقروء واستخراج الأفكار الأساسية", group: "الفوج 3", color: "emerald" },
      { id: "m2_10", day: "الأربعاء", startTime: "10:30", endTime: "12:15", subject: "الرياضيات", unitOrActivity: "أنشطة طارل: حل مسائل من واقع المتعلم", group: "الفوج 3", color: "blue" },
      { id: "m2_11", day: "الأربعاء", startTime: "14:30", endTime: "15:30", subject: "اللغة الفرنسية", unitOrActivity: "TaRL: Compréhension de textes simples", group: "الفوج 4", color: "sky" },
      { id: "m2_12", day: "الأربعاء", startTime: "15:30", endTime: "16:30", subject: "دعم مدرسة الريادة", unitOrActivity: "دعم مكثف للتعثرات الحسابية", group: "الفوج 4", color: "amber" },

      // الخميس
      { id: "m2_13", day: "الخميس", startTime: "08:30", endTime: "10:15", subject: "اللغة الفرنسية", unitOrActivity: "TaRL: Production de phrases courtes et dictée", group: "الفوج 4", color: "sky" },
      { id: "m2_14", day: "الخميس", startTime: "10:30", endTime: "12:15", subject: "الرياضيات", unitOrActivity: "أنشطة طارل: الحساب الذهني التنافسي والأنشطة الرقمية", group: "الفوج 4", color: "blue" },
      { id: "m2_15", day: "الخميس", startTime: "14:30", endTime: "15:30", subject: "اللغة العربية", unitOrActivity: "أنشطة طارل: التعبير والتواصل الشفهي المنظم", group: "الفوج 3", color: "emerald" },
      { id: "m2_16", day: "الخميس", startTime: "15:30", endTime: "16:30", subject: "دعم مدرسة الريادة", unitOrActivity: "معالجة الفروق الفردية في الكتابة والإملاء", group: "الفوج 3", color: "amber" },

      // الجمعة
      { id: "m2_17", day: "الجمعة", startTime: "08:30", endTime: "10:15", subject: "اللغة العربية", unitOrActivity: "أنشطة مراجعة أسبوعية للمسارات التعبيرية", group: "الفوج 1", color: "emerald" },
      { id: "m2_18", day: "الجمعة", startTime: "10:30", endTime: "12:15", subject: "الرياضيات", unitOrActivity: "أنشطة طارل: تحديات الرياضيات التفاعلية", group: "الفوج 2", color: "blue" },

      // السبت
      { id: "m2_19", day: "السبت", startTime: "08:30", endTime: "10:30", subject: "التقويم والمعالجة المركزة", unitOrActivity: "تفريغ شبكات التتبع الأسبوعية وإعادة التفييء", group: "الكل", color: "rose" },
      { id: "m2_20", day: "السبت", startTime: "10:45", endTime: "12:30", subject: "أنشطة الحياة المدرسية", unitOrActivity: "ورشات القراءة الحرة والألعاب الديداكتيكية", group: "الكل", color: "purple" },
    ],
  },
  {
    id: "model_3_arabic_specialist",
    title: "النموذج 3: استعمال الزمن لفترة الدعم - أستاذ تخصص اللغة العربية (مسارات طارل للقراءة واللغة)",
    shortTitle: "أستاذ اللغة العربية (تخصص)",
    badge: "تخصص اللغة العربية",
    badgeColor: "bg-teal-100 text-teal-900 border-teal-300",
    category: "specialized",
    timingDescription: "24 إلى 30 ساعة أسبوعياً موزعة على الأفواج المسندة لأستاذ التخصص",
    groupsDescription: "أفواج متعددة مرتبة حسب مستويات طارل: الحروف، الكلمات، الفقرة، والقصة",
    targetLevels: "المستويات 2 إلى 6 ابتدائي (نظام الأستاذ المتخصص)",
    weeklyHours: "30 ساعة أسبوعياً نظامية",
    summary:
      "جدول زمني مخصص للأستاذ المتخصص في اللغة العربية بمؤسسات الريادة، يركز كلياً على مصفوفة مسارات طارل القرائية الأربعة، وتدبير الأنشطة التفاعلية والطلاقة والفهم.",
    pedagogicalRationale:
      "تفريغ أستاذ التخصص يمكنه من تركيز جهده الديداكتيكي على صعوبات التعلم اللغوي والقراءة المسترسلة، والتدبير المحكم لبطاقات طارل والألعاب اللغوية.",
    features: [
      "برمجة دقيقة لمسارات طارل: مبتدئ ◄ حروف ◄ كلمات ◄ فقرة ◄ قصة",
      "جلسات قراءة فردية منتظمة لقياس السرعة ودقة النطق والطلاقة",
      "حصص التعبير الشفهي والتواصل واستثمار المعجم الوظيفي",
      "تخصيص حصص للدعم المكثف للمتعثرين في مجموعات متجانسة",
    ],
    recommendedFor: "الأساتذة المتخصصون في تدريس اللغة العربية ومكوناتها بالريادة",
    slots: [
      { id: "m3_1", day: "الإثنين", startTime: "08:30", endTime: "10:00", subject: "اللغة العربية", unitOrActivity: "مسار الحروف: الأصوات، المقاطع الصوتية، والدمج", group: "فوج الحروف", color: "emerald" },
      { id: "m3_2", day: "الإثنين", startTime: "10:15", endTime: "11:45", subject: "اللغة العربية", unitOrActivity: "مسار الكلمات: الكلمات الشائعة وقراءتها البصرية الفورية", group: "فوج الكلمات", color: "emerald" },
      { id: "m3_3", day: "الإثنين", startTime: "11:45", endTime: "12:45", subject: "دعم مدرسة الريادة", unitOrActivity: "دعم القراءة الفردي بحاسبة الطلاقة (عداد الكلمات/دقيقة)", group: "فوج التعثرات", color: "amber" },

      { id: "m3_4", day: "الثلاثاء", startTime: "08:30", endTime: "10:00", subject: "اللغة العربية", unitOrActivity: "مسار الفقرة: الربط بين الجمل والوقف والتنغيم", group: "فوج الفقرة", color: "emerald" },
      { id: "m3_5", day: "الثلاثاء", startTime: "10:15", endTime: "11:45", subject: "اللغة العربية", unitOrActivity: "مسار القصة: القراءة المسترسلة والفهم الصريح والاستنتاجي", group: "فوج القصة", color: "emerald" },
      { id: "m3_6", day: "الثلاثاء", startTime: "11:45", endTime: "12:45", subject: "اللغة العربية", unitOrActivity: "التواصل الشفهي: لعب الأدوار وسرد أحداث الحكاية", group: "الكل", color: "teal" },

      { id: "m3_7", day: "الأربعاء", startTime: "08:30", endTime: "10:00", subject: "اللغة العربية", unitOrActivity: "مسار الحروف والكلمات: أنشطة الكتابة التفاعلية على الألواح", group: "فوج الحروف", color: "emerald" },
      { id: "m3_8", day: "الأربعاء", startTime: "10:15", endTime: "11:45", subject: "اللغة العربية", unitOrActivity: "مسار الفقرة والقصة: استراتيجيات القراءة (التوقع والتلخيص)", group: "فوج القصة", color: "emerald" },
      { id: "m3_9", day: "الأربعاء", startTime: "11:45", endTime: "12:45", subject: "دعم مدرسة الريادة", unitOrActivity: "معالجة صعوبات التهجئة التراكمية ومخارج الحروف", group: "فوج التعثرات", color: "amber" },

      { id: "m3_10", day: "الخميس", startTime: "08:30", endTime: "10:00", subject: "اللغة العربية", unitOrActivity: "مسار الكلمات والفقرة: بطاقات الطلاقة الثنائية (قراءة الأقران)", group: "فوج الكلمات", color: "emerald" },
      { id: "m3_11", day: "الخميس", startTime: "10:15", endTime: "11:45", subject: "التربية الإسلامية", unitOrActivity: "القرآن الكريم: التلاوة والتجويد وقيم التعاون والتضامن", group: "الكل", color: "teal" },
      { id: "m3_12", day: "الخميس", startTime: "11:45", endTime: "12:45", subject: "اللغة العربية", unitOrActivity: "الإنتاج الكتابي الصغير وفق مبادئ التعليم الصريح", group: "الكل", color: "emerald" },

      { id: "m3_13", day: "الجمعة", startTime: "08:30", endTime: "10:00", subject: "اللغة العربية", unitOrActivity: "مسار القصة: أسئلة الفهم النقدي وإبداء الرأي", group: "فوج القصة", color: "emerald" },
      { id: "m3_14", day: "الجمعة", startTime: "10:15", endTime: "11:45", subject: "اللغة العربية", unitOrActivity: "مسار الحروف والكلمات: ألعاب الكلمات المتقاطعة وقطار الحروف", group: "فوج الحروف", color: "emerald" },

      { id: "m3_15", day: "السبت", startTime: "08:30", endTime: "10:00", subject: "التقويم والمعالجة المركزة", unitOrActivity: "تمرير روائز التقدم الأسبوعي وتسجيل لوحة التحكم طارل", group: "الكل", color: "rose" },
      { id: "m3_16", day: "السبت", startTime: "10:15", endTime: "11:30", subject: "أنشطة الحياة المدرسية", unitOrActivity: "نادي الخط العربي والمطالعة الممتعة", group: "الكل", color: "purple" },
    ],
  },
  {
    id: "model_4_french_math_specialist",
    title: "النموذج 4: استعمال الزمن لفترة الدعم - أستاذ تخصص اللغة الفرنسية والرياضيات",
    shortTitle: "أستاذ الفرنسية والرياضيات (تخصص)",
    badge: "تخصص فرنسية + رياضيات",
    badgeColor: "bg-sky-100 text-sky-900 border-sky-300",
    category: "specialized",
    timingDescription: "توزيع الحصص بالتساوي بين مسارات TaRL Français ومكون الرياضيات",
    groupsDescription: "تنظيم الأفواج بين مستويات Paliers الفرنسية ولبنات الرياضيات",
    targetLevels: "المستويات 2 إلى 6 ابتدائي بالريادة",
    weeklyHours: "30 ساعة أسبوعياً",
    summary:
      "جدول حصص دقيق لأستاذ التخصص العلمي واللغة الفرنسية يجمع بين تطوير مهارات الحساب والعمليات الأساسية (الجمع، الطرح، الضرب، القسمة، والمسائل) وتعزيز القراءة الوظيفية بالفرنسية.",
    pedagogicalRationale:
      "التناغم بين مادة الرياضيات واللغة الفرنسية يدعم التفكير المنطقي والرمزي، ويسرع امتلاك المصطلحات العلمية بالفرنسية مع ترسيخ آليات الحساب الأساسي.",
    features: [
      "تغطية Paliers اللغة الفرنسية الثلاثة: Décodage, Fluidité, Compréhension",
      "تغطية لبنات الرياضيات: الأعداد، العمليات الأربع، وحل المسائل اليومية",
      "جلسات حساب ذهني روتيني يومي لمدة 10 دقائق في مستهل كل حصة",
      "ألعاب تربوية فرنسية ورياضياتية محفزة لكسر حاجز الخوف من المادتين",
    ],
    recommendedFor: "الأساتذة المكلفون بتدريس الفرنسية والرياضيات في مدرسة الريادة",
    slots: [
      { id: "m4_1", day: "الإثنين", startTime: "08:30", endTime: "09:45", subject: "اللغة الفرنسية", unitOrActivity: "TaRL Français: Palier 1 - Lettres et sons complexes", group: "فوج Décodage", color: "sky" },
      { id: "m4_2", day: "الإثنين", startTime: "09:45", endTime: "11:00", subject: "الرياضيات", unitOrActivity: "الرياضيات طارل: بناء مفهوم الجمع والطرح بالتقنية الاعتيادية", group: "فوج العمليات", color: "blue" },
      { id: "m4_3", day: "الإثنين", startTime: "11:15", endTime: "12:30", subject: "اللغة الفرنسية", unitOrActivity: "TaRL Français: Palier 2 - Mots fréquents et phrases", group: "فوج Fluence", color: "sky" },

      { id: "m4_4", day: "الثلاثاء", startTime: "08:30", endTime: "09:45", subject: "الرياضيات", unitOrActivity: "الرياضيات طارل: جداول الضرب والحساب الذهني السريع", group: "فوج الضرب", color: "blue" },
      { id: "m4_5", day: "الثلاثاء", startTime: "09:45", endTime: "11:00", subject: "اللغة الفرنسية", unitOrActivity: "TaRL Français: Palier 3 - Petit paragraphe et compréhension", group: "فوج Compréhension", color: "sky" },
      { id: "m4_6", day: "الثلاثاء", startTime: "11:15", endTime: "12:30", subject: "دعم مدرسة الريادة", unitOrActivity: "دعم مكثف فردي في الجمع والطرح وصعوبات النطق", group: "فوج الدعم", color: "amber" },

      { id: "m4_7", day: "الأربعاء", startTime: "08:30", endTime: "09:45", subject: "اللغة الفرنسية", unitOrActivity: "TaRL: Lecture guidée avec chronomètre (Mots/minute)", group: "فوج Fluence", color: "sky" },
      { id: "m4_8", day: "الأربعاء", startTime: "09:45", endTime: "11:00", subject: "الرياضيات", unitOrActivity: "الرياضيات طارل: حل مسائل خطوة بخطوة بالنمذجة", group: "الكل", color: "blue" },
      { id: "m4_9", day: "الأربعاء", startTime: "11:15", endTime: "12:30", subject: "النشاط العلمي", unitOrActivity: "الملاحظة والتجريب العلمي وتنمية الفضول المعرفي", group: "الكل", color: "indigo" },

      { id: "m4_10", day: "الخميس", startTime: "08:30", endTime: "09:45", subject: "الرياضيات", unitOrActivity: "الرياضيات طارل: أنشطة قياس الأطوال والكتل والأشكال الهندسية", group: "الكل", color: "blue" },
      { id: "m4_11", day: "الخميس", startTime: "09:45", endTime: "11:00", subject: "اللغة الفرنسية", unitOrActivity: "TaRL: Dictée de syllabes et mots fréquents", group: "فوج Décodage", color: "sky" },
      { id: "m4_12", day: "الخميس", startTime: "11:15", endTime: "12:30", subject: "دعم مدرسة الريادة", unitOrActivity: "دعم موجه في القسمة الإقليدية والأعداد الكبيرة", group: "فوج الدعم", color: "amber" },

      { id: "m4_13", day: "الجمعة", startTime: "08:30", endTime: "09:45", subject: "اللغة الفرنسية", unitOrActivity: "TaRL: Jeux communicatifs, dialogues et saynètes", group: "الكل", color: "sky" },
      { id: "m4_14", day: "الجمعة", startTime: "09:45", endTime: "11:00", subject: "الرياضيات", unitOrActivity: "الرياضيات طارل: تحدي العمليات الأربع والحساب الذهني", group: "الكل", color: "blue" },

      { id: "m4_15", day: "السبت", startTime: "08:30", endTime: "10:00", subject: "التقويم والمعالجة المركزة", unitOrActivity: "تفريغ شبكات تتبع الرياضيات والفرنسية الأسبوعية", group: "الكل", color: "rose" },
      { id: "m4_16", day: "السبت", startTime: "10:15", endTime: "11:30", subject: "أنشطة الحياة المدرسية", unitOrActivity: "نادي الرياضيات الترفيهية والألعاب المنطقية", group: "الكل", color: "purple" },
    ],
  },
  {
    id: "model_5_level1_orientation_support",
    title: "النموذج 5: استعمال الزمن للمستوى الأول ابتدائي (فترة التهيئة والاستئناس والدعم المكثف 1AEP)",
    shortTitle: "المستوى الأول (تهيئة واستئناس)",
    badge: "1AEP خصوصي",
    badgeColor: "bg-purple-100 text-purple-900 border-purple-300",
    category: "level1",
    timingDescription: "حصص متدرجة المدة ومكيفة مع الطاقة الاستيعابية لأطفال السنة الأولى (30 إلى 40 دقيقة)",
    groupsDescription: "أفواج صغيرة تعتمد مبادئ الحركية والاستئناس والتعلم باللعب والمحاكاة",
    targetLevels: "المستوى الأول ابتدائي فقط (1AEP)",
    weeklyHours: "30 ساعة أسبوعياً متدرجة",
    summary:
      "برمجة خاصة لأسابيع شتنبر وأكتوبر لمتعلمي المستوى الأول: الاستئناس بالوسط المدرسي، الأنشطة الحركية والحس-حركية، التهيئة للخط ومسكة القلم، التعرف على الحروف والأرقام البسيطة، والتواصل الشفهي.",
    pedagogicalRationale:
      "يحتاج طفل المستوى الأول في بداية الموسم إلى انتقال سلس من البيت أو التعليم الأولي إلى المدرسة الابتدائية، مع اعتماد الإيقاعات البيداغوجية القصيرة لتجنب التشتت.",
    features: [
      "ملاءمة كاملة لكراسة ودليل التهيئة والاستئناس والدعم للمستوى الأول",
      "حصص قصيرة متناوبة تجمع بين الأناشيد والحكايات والألعاب",
      "تركيز يومي على التآزر البصري الحركي ومسكة القلم والخط الأولي",
      "أنشطة الرياضيات الحسية (التصنيف، الترتيب، المقارنة، والأعداد 0-9)",
    ],
    recommendedFor: "أساتذة المستوى الأول ابتدائي في المدارس الرائدة والعمومية",
    slots: [
      { id: "m5_1", day: "الإثنين", startTime: "08:30", endTime: "09:15", subject: "اللغة العربية", unitOrActivity: "الاستئناس والتواصل: الترحيب بالمتعلمين والتعارف والأناشيد", group: "الكل", color: "emerald" },
      { id: "m5_2", day: "الإثنين", startTime: "09:15", endTime: "10:00", subject: "اللغة العربية", unitOrActivity: "التهيئة الحركية: مسكة القلم والخطوط (مستقيم، منحني)", group: "الكل", color: "emerald" },
      { id: "m5_3", day: "الإثنين", startTime: "10:15", endTime: "11:00", subject: "الرياضيات", unitOrActivity: "التهيئة الرياضية: التموضع في المكان (أمام/وراء، فوق/تحت)", group: "الكل", color: "blue" },
      { id: "m5_4", day: "الإثنين", startTime: "11:00", endTime: "11:45", subject: "اللغة الفرنسية", unitOrActivity: "Français oral: Salutations, prénoms et comptines", group: "الكل", color: "sky" },
      { id: "m5_5", day: "الإثنين", startTime: "11:45", endTime: "12:30", subject: "التربية البدنية", unitOrActivity: "ألعاب حركية وتنظيم الجسد في الفضاء المدرسي", group: "الكل", color: "green" },

      { id: "m5_6", day: "الثلاثاء", startTime: "08:30", endTime: "09:15", subject: "اللغة العربية", unitOrActivity: "الوعي الصوتي: التمييز السمعي للأصوات وتصفيق المقاطع", group: "الكل", color: "emerald" },
      { id: "m5_7", day: "الثلاثاء", startTime: "09:15", endTime: "10:00", subject: "اللغة العربية", unitOrActivity: "رسم أشكال الحروف ومحاكاة الخط على الرمل والألواح", group: "الكل", color: "emerald" },
      { id: "m5_8", day: "الثلاثاء", startTime: "10:15", endTime: "11:00", subject: "الرياضيات", unitOrActivity: "التصنيف حسب اللون والشكل والحجم والأعداد 1 و 2", group: "الكل", color: "blue" },
      { id: "m5_9", day: "الثلاثاء", startTime: "11:00", endTime: "11:45", subject: "التربية الإسلامية", unitOrActivity: "البسملة والحمد وسورة الفاتحة بالترديد والمحاكاة", group: "الكل", color: "teal" },
      { id: "m5_10", day: "الثلاثاء", startTime: "11:45", endTime: "12:30", subject: "دعم مدرسة الريادة", unitOrActivity: "دعم فردي للأطفال ذوي الصعوبات في مسكة القلم والتركيز", group: "فوج الدعم", color: "amber" },

      { id: "m5_11", day: "الأربعاء", startTime: "08:30", endTime: "09:15", subject: "اللغة العربية", unitOrActivity: "الحكاية المشوقة: الاستماع والتعبير عن الصور والمشاهد", group: "الكل", color: "emerald" },
      { id: "m5_12", day: "الأربعاء", startTime: "09:15", endTime: "10:00", subject: "الرياضيات", unitOrActivity: "العد التصاعدي بالأصابع والأقراص (1 إلى 5)", group: "الكل", color: "blue" },
      { id: "m5_13", day: "الأربعاء", startTime: "10:15", endTime: "11:00", subject: "اللغة الفرنسية", unitOrActivity: "Français: Le matériel scolaire et les couleurs", group: "الكل", color: "sky" },
      { id: "m5_14", day: "الأربعاء", startTime: "11:00", endTime: "12:00", subject: "التربية الفنية", unitOrActivity: "التلوين بالأصابع والعجين وتشكيل الحروف والأرقام", group: "الكل", color: "rose" },

      { id: "m5_15", day: "الخميس", startTime: "08:30", endTime: "09:15", subject: "اللغة العربية", unitOrActivity: "التعرف على حرف الدال والراء ونطقهما بالحركات القصيرة", group: "الكل", color: "emerald" },
      { id: "m5_16", day: "الخميس", startTime: "09:15", endTime: "10:00", subject: "النشاط العلمي", unitOrActivity: "الحواس الخمس: اللمس والسمع والبصر في استكشاف المحيط", group: "الكل", color: "indigo" },
      { id: "m5_17", day: "الخميس", startTime: "10:15", endTime: "11:00", subject: "الرياضيات", unitOrActivity: "مفهوم بقدر، أكثر من، وأقل من بالخشيبات", group: "الكل", color: "blue" },
      { id: "m5_18", day: "الخميس", startTime: "11:00", endTime: "12:00", subject: "دعم مدرسة الريادة", unitOrActivity: "أنشطة التآزر البصري والتمييز السمعي المركزة", group: "فوج الدعم", color: "amber" },

      { id: "m5_19", day: "الجمعة", startTime: "08:30", endTime: "09:30", subject: "اللغة العربية", unitOrActivity: "ألعاب الحروف المضيئة والبحث عن الصوت في الكلمات", group: "الكل", color: "emerald" },
      { id: "m5_20", day: "الجمعة", startTime: "09:45", endTime: "10:45", subject: "اللغة الفرنسية", unitOrActivity: "Français: Chansons, gestes et jeux de mimes", group: "الكل", color: "sky" },
      { id: "m5_21", day: "الجمعة", startTime: "11:00", endTime: "12:00", subject: "الرياضيات", unitOrActivity: "كتابة الأعداد على الشبكة المربعة والمسار المنقط", group: "الكل", color: "blue" },

      { id: "m5_22", day: "السبت", startTime: "08:30", endTime: "10:00", subject: "التقويم والمعالجة المركزة", unitOrActivity: "شبكة تتبع مكتسبات المستوى الأول وتوثيق الملاحظات", group: "الكل", color: "rose" },
      { id: "m5_23", day: "السبت", startTime: "10:15", endTime: "11:30", subject: "أنشطة الحياة المدرسية", unitOrActivity: "عرض رسومات المتعلمين وألعاب الهواء الطلق", group: "الكل", color: "purple" },
    ],
  },
  {
    id: "model_6_upper_grades_advanced_tarl",
    title: "النموذج 6: استعمال الزمن للدعم المكثف للمستويات العليا (الرابع، الخامس، والسادس ابتدائي - مسارات طارل المتقدمة)",
    shortTitle: "المستويات العليا (4، 5، 6 طارل المتقدم)",
    badge: "المستويات 4 - 5 - 6",
    badgeColor: "bg-amber-100 text-amber-950 border-amber-300",
    category: "specialized",
    timingDescription: "30 ساعة أسبوعياً مع تركيز على الطلاقة والفهم والكسور والمسائل الحسابية",
    groupsDescription: "أفواج حسب مسارات الدعم المكثف المتقدم ومسار التميز الرياضي واللغوي",
    targetLevels: "المستويات 4 و 5 و 6 ابتدائي",
    weeklyHours: "30 ساعة أسبوعياً كاملة",
    summary:
      "جدول حصص متقدم للمستويات الإشهادية والوسيطة يهدف لمعالجة التعثرات التراكمية في القراءة السريعة (Fluence) والفهم القرائي العميق، والتحكم التام في جداول الضرب والعمليات الأربع والكسور قبل الانطلاق في المنهاج السنوي.",
    pedagogicalRationale:
      "متعلمو المستويات العليا يحتاجون إلى وتيرة دعم سريعة ومكثفة تركز على المهارات الكبرى المفصلية التي تمكنهم من متابعة دروس المنهاج دون عوائق.",
    features: [
      "مصفوفة مسار التميز للرياضيات (الأعداد الكبيرة، الكسور، الهندسة والقياس)",
      "نصوص قرائية مركبة وأسئلة الفهم الاستنتاجي والنقدي",
      "الطلاقة باللغتين العربية والفرنسية بمعدل 60 إلى 90 كلمة في الدقيقة",
      "جلسات حل المسائل المركبة والتدريب على الاستدلال الرياضي",
    ],
    recommendedFor: "أساتذة المستويات 4 و 5 و 6 بمؤسسات الريادة",
    slots: [
      { id: "m6_1", day: "الإثنين", startTime: "08:30", endTime: "09:45", subject: "اللغة العربية", unitOrActivity: "قراءة نصوص قصصية وإخبارية وقياس الطلاقة القرائية", group: "فوج الطلاقة", color: "emerald" },
      { id: "m6_2", day: "الإثنين", startTime: "09:45", endTime: "11:00", subject: "الرياضيات", unitOrActivity: "مسار التميز: العمليات الأربع الممتدة وخوارزمية القسمة", group: "فوج العمليات", color: "blue" },
      { id: "m6_3", day: "الإثنين", startTime: "11:15", endTime: "12:30", subject: "اللغة الفرنسية", unitOrActivity: "Lecture de textes courts, compréhension globale et lexique", group: "الفوج 1", color: "sky" },

      { id: "m6_4", day: "الثلاثاء", startTime: "08:30", endTime: "09:45", subject: "الرياضيات", unitOrActivity: "مسار التميز: الأعداد الكسرية والعشرية والمقارنة والترتيب", group: "فوج الكسور", color: "blue" },
      { id: "m6_5", day: "الثلاثاء", startTime: "09:45", endTime: "11:00", subject: "اللغة العربية", unitOrActivity: "استراتيجيات الفهم: استخراج المعاني الصريحة والضمنية وتلخيص الفقرات", group: "فوج الفهم", color: "emerald" },
      { id: "m6_6", day: "الثلاثاء", startTime: "11:15", endTime: "12:30", subject: "دعم مدرسة الريادة", unitOrActivity: "معالجة صعوبات خوارزمية القسمة والضرب المزدوج", group: "فوج التعثرات", color: "amber" },

      { id: "m6_7", day: "الأربعاء", startTime: "08:30", endTime: "09:45", subject: "اللغة الفرنسية", unitOrActivity: "TaRL Français: Fluidité de lecture et questions inférentielles", group: "الفوج 2", color: "sky" },
      { id: "m6_8", day: "الأربعاء", startTime: "09:45", endTime: "11:00", subject: "الرياضيات", unitOrActivity: "الهندسة والقياس: محيطات ومساحات المضلعات الاعتيادية", group: "الكل", color: "blue" },
      { id: "m6_9", day: "الأربعاء", startTime: "11:15", endTime: "12:30", subject: "الاجتماعيات", unitOrActivity: "التاريخ والجغرافيا: استثمار الخرائط والخطوط الزمنية", group: "الكل", color: "amber" },

      { id: "m6_10", day: "الخميس", startTime: "08:30", endTime: "09:45", subject: "اللغة العربية", unitOrActivity: "الإنتاج الكتابي الصريح: كتابة فقرة معللة واستعمال علامات الترقيم", group: "الكل", color: "emerald" },
      { id: "m6_11", day: "الخميس", startTime: "09:45", endTime: "11:00", subject: "الرياضيات", unitOrActivity: "حل المسائل متعددة الخطوات بتمثيل البيانات والمخططات", group: "الكل", color: "blue" },
      { id: "m6_12", day: "الخميس", startTime: "11:15", endTime: "12:30", subject: "دعم مدرسة الريادة", unitOrActivity: "دعم مهارات القراءة بالفرنسية لمعالجة عسر القراءة", group: "فوج الدعم", color: "amber" },

      { id: "m6_13", day: "الجمعة", startTime: "08:30", endTime: "09:45", subject: "اللغة الفرنسية", unitOrActivity: "Production écrite simple & enrichissement du vocabulaire", group: "الكل", color: "sky" },
      { id: "m6_14", day: "الجمعة", startTime: "09:45", endTime: "11:00", subject: "النشاط العلمي", unitOrActivity: "منهجية التقصي وحل المشكلات العلمية والتجريبية", group: "الكل", color: "indigo" },

      { id: "m6_15", day: "السبت", startTime: "08:30", endTime: "10:00", subject: "التقويم والمعالجة المركزة", unitOrActivity: "الروائز الأسبوعية المصغرة ومحاكاة الامتحانات الإشهادية", group: "الكل", color: "rose" },
      { id: "m6_16", day: "السبت", startTime: "10:15", endTime: "11:45", subject: "أنشطة الحياة المدرسية", unitOrActivity: "مسابقة تحدي القراءة وتحدي الحساب الذهني بين الأفواج", group: "الكل", color: "purple" },
    ],
  },
  {
    id: "model_7_diagnostic_positioning_week",
    title: "النموذج 7: استعمال الزمن المرن لأسبوع تمرير روائز الموضعة والتفييء (التقويم التشخيصي - شتنبر)",
    shortTitle: "أسبوع روائز الموضعة والتفييء",
    badge: "الأسبوع الأول من شتنبر",
    badgeColor: "bg-rose-100 text-rose-900 border-rose-300",
    category: "diagnostic",
    timingDescription: "جدول زمني مرن ومخصص للتمرير الفردي والجماعي لروائز الموضعة طارل",
    groupsDescription: "مجموعات صغيرة (3 إلى 5 تلاميذ) للتمرير الفردي مع أنشطة استقلالية لباقي القسم",
    targetLevels: "جميع المستويات الابتدائية (1 إلى 6)",
    weeklyHours: "24 إلى 30 ساعة مخصصة للموضعة والتفريغ",
    summary:
      "استعمال زمن مؤقت وخاص بالأسبوع الأول لتمرير روائز الموضعة الفردية في القراءة العربية والفرنسية ورائز الرياضيات، وتفريغ النتائج في شبكات الموضعة ومسكها في نظام مسار وتفييء المتعلمين إلى مسارات.",
    pedagogicalRationale:
      "تمرير روائز طارل يتطلب مقابلة فردية هادئة مع كل تلميذ لمدة دقيقة إلى 3 دقائق، مما يقتضي برمجة أنشطة ذاتية واستقلالية لباقي المتعلمين.",
    features: [
      "جدولة واضحة لتمرير رائز القراءة العربية الفردي ورائز الفرنسية",
      "برمجة التمرير الجماعي لرائز الرياضيات والمسألة",
      "تخصيص فترات مسائية أو ختامية لتفريغ الشبكات وحساب النسب المئوية",
      "جلسات التفييء الجماعي وتوزيع كراسات الدعم المكثف",
    ],
    recommendedFor: "جميع أساتذة مؤسسات الريادة خلال أسبوع الانطلاق التربوي",
    slots: [
      { id: "m7_1", day: "الإثنين", startTime: "08:30", endTime: "10:30", subject: "التقويم والمعالجة المركزة", unitOrActivity: "تمرير رائز الموضعة الفردي في القراءة العربية (المجموعة 1)", group: "المجموعة أ", color: "rose" },
      { id: "m7_2", day: "الإثنين", startTime: "10:45", endTime: "12:30", subject: "أنشطة الحياة المدرسية", unitOrActivity: "أنشطة استئناسية ومطالعة حرة مستمرة لباقي القسم", group: "المجموعة ب", color: "purple" },

      { id: "m7_3", day: "الثلاثاء", startTime: "08:30", endTime: "10:30", subject: "التقويم والمعالجة المركزة", unitOrActivity: "تمرير رائز الموضعة الفردي في القراءة العربية (المجموعة 2)", group: "المجموعة ب", color: "rose" },
      { id: "m7_4", day: "الثلاثاء", startTime: "10:45", endTime: "12:30", subject: "التقويم والمعالجة المركزة", unitOrActivity: "تفريغ نتائج القراءة العربية في شبكة الموضعة الإلكترونية", group: "الأستاذ", color: "amber" },

      { id: "m7_5", day: "الأربعاء", startTime: "08:30", endTime: "10:30", subject: "التقويم والمعالجة المركزة", unitOrActivity: "Passation du test individuel de positionnement TaRL Français", group: "Groupe A", color: "sky" },
      { id: "m7_6", day: "الأربعاء", startTime: "10:45", endTime: "12:30", subject: "أنشطة الحياة المدرسية", unitOrActivity: "أنشطة تلوين وألغاز تفاعلية بالفرنسية لباقي المتعلمين", group: "Groupe B", color: "purple" },

      { id: "m7_7", day: "الخميس", startTime: "08:30", endTime: "10:30", subject: "التقويم والمعالجة المركزة", unitOrActivity: "تمرير رائز الرياضيات الجماعي: العد، الحساب، والمسائل", group: "الكل", color: "blue" },
      { id: "m7_8", day: "الخميس", startTime: "10:45", endTime: "12:30", subject: "التقويم والمعالجة المركزة", unitOrActivity: "تصحيح أوراق رائز الرياضيات وتحديد مستويات التحكم", group: "الأستاذ", color: "amber" },

      { id: "m7_9", day: "الجمعة", startTime: "08:30", endTime: "10:30", subject: "التقويم والمعالجة المركزة", unitOrActivity: "جلسة تفييء المتعلمين إلى مسارات طارل وتشكيل الأفواج", group: "الكل", color: "emerald" },
      { id: "m7_10", day: "الجمعة", startTime: "10:45", endTime: "12:30", subject: "دعم مدرسة الريادة", unitOrActivity: "توزيع كراسات الدعم المكثف وشرح ميثاق التعلم الصريح", group: "الكل", color: "amber" },

      { id: "m7_11", day: "السبت", startTime: "08:30", endTime: "11:30", subject: "التقويم والمعالجة المركزة", unitOrActivity: "المصادقة الإدارية على لوائح الأفواج وجداول الحصص المعتمدة", group: "الإدارة والأستاذ", color: "rose" },
    ],
  },
];

// Import and re-export the 14 models from Taalimkom Google Drive folder
import {
  TAALIMKOM_TIMETABLE_MODELS,
  TAALIMKOM_WORD_TEMPLATES,
  TAALIMKOM_DRIVE_FOLDER,
  TaalimkomWordTemplate,
} from "./taalimkomTimetables";

export {
  TAALIMKOM_TIMETABLE_MODELS,
  TAALIMKOM_WORD_TEMPLATES,
  TAALIMKOM_DRIVE_FOLDER,
};
export type { TaalimkomWordTemplate };

// All 21 models combined (7 base models from Yanbou Tarbiya + 14 Word docx models from Taalimkom Google Drive)
export const ALL_SUPPORT_TIMETABLE_MODELS: SupportTimetableModel[] = [
  ...SUPPORT_TIMETABLE_MODELS,
  ...TAALIMKOM_TIMETABLE_MODELS,
];

export const TIMETABLE_DOWNLOAD_RESOURCES = [
  {
    title: "حزمة مدونة تعليم كم (14 نموذج Word .docx على Google Drive)",
    description: "المستودع الرسمي الكامل لمدونة تعليم كم: 14 نموذج Word جاهز للتعديل تشمل النمط المزدوج، التخصص الثنائي، والتوقيت المستمر الرباعي لجميع المستويات 1AEP إلى 6AEP.",
    format: "Word (Google Drive)",
    badge: "14 ملف .docx",
    downloadName: "نماذج_استعمال_الزمن_الدعم_المكثف_word",
    externalUrl: TAALIMKOM_DRIVE_FOLDER.url,
  },
  {
    title: "نماذج استعمال الزمن لفترة الدعم طارل (Word قابلة للتعديل .docx)",
    description: "حزمة النماذج السبعة كاملة بصيغة Microsoft Word منسقة ومعدة للتعديل المباشر وطباعة A4.",
    format: "Word (.docx)",
    badge: "قابلة للتعديل",
    downloadName: "استعمال_الزمن_فترة_الدعم_طارل_Word.docx",
  },
  {
    title: "نماذج استعمال الزمن لفترة الدعم المكثف (PDF رسمية جاهزة للطباعة)",
    description: "ملفات PDF عالية الدقة A4 Landscape بتنسيق الوزارة الرسمي جاهزة للطباعة وتوقيع الإدارة والتفتيش.",
    format: "PDF عالي الدقة",
    badge: "جاهز للطباعة",
    downloadName: "استعمال_الزمن_فترة_الدعم_مدرسة_الريادة.pdf",
  },
  {
    title: "مصفوفة تنظيم الأفواج وتوزيع الساعات الأسبوعية (Excel .xlsx)",
    description: "جدول إكسيل تفاعلي لحساب ساعات كل أستاذ وفوج، وتفادي تداخل القاعات والتوقيت.",
    format: "Excel (.xlsx)",
    badge: "حساب آلي",
    downloadName: "تنظيم_افواج_الدعم_المكثف_طارل.xlsx",
  },
];
