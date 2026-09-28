// Data and URL generator for Remédiation Intensive Mind Maps (خطاطات الدعم المكثف)
// Sourced from YallaTaalim & Cloudflare R2 Official Ministry Data

export interface RemediationMindMapStage {
  name: string;
  duration: string;
  description: string;
  iconName?: string;
  actionItems?: string[];
}

export interface RemediationSessionItem {
  id: string; // e.g. REM_MATH_N1_P1_PAR1_S1
  level: number; // 1 to 6
  levelLabelAr: string;
  levelLabelFr: string;
  subject: "MATH" | "AR" | "FR";
  subjectLabelAr: string;
  subjectLabelFr: string;
  parcours: number; // 1, 2, 3
  parcoursLabelAr: string;
  sessionNumber: number; // 1 to 24
  title: string;
  topicAr: string;
  objectivesAr: string;
  targetCompetency: string;
  r2PptxUrl: string;
  officeViewerUrl: string;
  yallaTaalimUrl: string;
  stages: {
    warmup: RemediationMindMapStage;
    modeling: RemediationMindMapStage;
    guided: RemediationMindMapStage;
    autonomous: RemediationMindMapStage;
    assessment: RemediationMindMapStage;
  };
  mindMapKeyPoints: string[];
}

export const REMEDIATION_LEVELS = [
  { id: 1, labelAr: "المستوى الأول", labelFr: "1AEP", badgeColor: "bg-blue-100 text-blue-800 border-blue-300" },
  { id: 2, labelAr: "المستوى الثاني", labelFr: "2AEP", badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-300" },
  { id: 3, labelAr: "المستوى الثالث", labelFr: "3AEP", badgeColor: "bg-teal-100 text-teal-800 border-teal-300" },
  { id: 4, labelAr: "المستوى الرابع", labelFr: "4AEP", badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300" },
  { id: 5, labelAr: "المستوى الخامس", labelFr: "5AEP", badgeColor: "bg-amber-100 text-amber-800 border-amber-300" },
  { id: 6, labelAr: "المستوى السادس", labelFr: "6AEP", badgeColor: "bg-purple-100 text-purple-800 border-purple-300" },
];

export const REMEDIATION_SUBJECTS = [
  {
    id: "MATH" as const,
    labelAr: "الرياضيات",
    labelFr: "Mathématiques",
    color: "blue",
    bgClass: "bg-blue-600",
    textClass: "text-blue-700",
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
    totalSessions: 24,
    description: "أنشطة العد، الحساب الذهني، العمليات الأربع، تمثيل الأعداد، والهندسة وحل المسائل وفق مقاربة طارل.",
  },
  {
    id: "AR" as const,
    labelAr: "اللغة العربية",
    labelFr: "Langue Arabe",
    color: "emerald",
    bgClass: "bg-emerald-600",
    textClass: "text-emerald-700",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    totalSessions: 24,
    description: "الوعي الصوتي، فك التشفير، الطلاقة القرائية، فهم المقروء، والإنتاج الكتابي المتدرج.",
  },
  {
    id: "FR" as const,
    labelAr: "اللغة الفرنسية",
    labelFr: "Français",
    color: "sky",
    bgClass: "bg-sky-600",
    textClass: "text-sky-700",
    badgeClass: "bg-sky-50 text-sky-700 border-sky-200",
    totalSessions: 24,
    description: "Phonologie, décodage, fluence, vocabulaire thématique, et compréhension guidée selon TaRL.",
  },
];

export const REMEDIATION_PARCOURS = [
  { id: 1, labelAr: "المسار 1 (الانطلاق والتأسيس)", shortLabel: "المسار 1", badgeColor: "bg-amber-50 text-amber-900 border-amber-300" },
  { id: 2, labelAr: "المسار 2 (التطوير والتثبيت)", shortLabel: "المسار 2", badgeColor: "bg-teal-50 text-teal-900 border-teal-300" },
  { id: 3, labelAr: "المسار 3 (التمكن والإتقان)", shortLabel: "المسار 3", badgeColor: "bg-purple-50 text-purple-900 border-purple-300" },
];

// Curated session themes based on Moroccan TaRL & Remédiation curriculum
const MATH_TOPICS_BY_LEVEL: Record<number, string[]> = {
  1: [
    "الأعداد من 0 إلى 5: التعرف، التسمية، والكتابة الرقمية",
    "مقارنة وترتيب الأعداد من 0 إلى 5 (أصغر من، أكبر من، يساوي)",
    "الأعداد 6 و 7 و 8: قراءة وعد وتفكيك",
    "العدد 9 وتمثيل الأعداد على شريط الأعداد والمعداد",
    "مفهوم الجمع: الجمع بضم المجموعات وتمثيل بالأقراص",
    "تقنية الجمع البسيط بدون احتفاظ ضمن العدد 9",
    "تفكيك الأعداد ومكملات الأعداد إلى 5 وإلى 9",
    "مفهوم الطرح البسيط بالتمثيل والخط الحسابي",
    "العلاقة بين الجمع والطرح والعمليات العكسية",
    "العدد 10 والعشرات: تكوين العقد الأول ومفهوم الحزمة",
    "الأعداد من 11 إلى 19: كتابة وقراءة وجدول المنازل (وحدات وعشرات)",
    "مقارنة الأعداد إلى 19 وترتيبها تصاعدياً وتنازلياً",
    "الجمع ضمن العدد 19 بدون احتفاظ واستعمال المستقيم المدرج",
    "الطرح ضمن العدد 19 بدون استلاف",
    "حل وضعيات مسألة بسيطة مستقاة من المحيط اليومي (جمعية)",
    "حل وضعيات مسألة بسيطة (طرحية) وتحديد الكلمات المفاتيح",
    "الأشكال الهندسية الأساسية: المربع والمستطيل والمثلث والدائرة",
    "التموضع في المكان: فوق/تحت، داخل/خارج، أمام/وراء",
    "قياس ومقارنة الأطوال باستخدام وحدات اعتباطية",
    "قراءة وتنظيم بيانات بسيطة في جدول ذي مدخلين",
    "تقويم تجميعي لحساب العمليات الأساسية ومسائل طارل",
    "ورشة الألعاب الديداكتيكية والألواح والمسابقات الرقمية",
    "تدارك التعثرات الفردية في كتابة الأعداد وتمييز الأرقام المتشابهة",
    "الحصيلة العامة والتفييء الختامي لفترة الدعم المكثف في الرياضيات",
  ],
  2: [
    "الأعداد من 0 إلى 99: قراءة وكتابة وتمثيل بقطع النقد والمربعات",
    "جدول العد: الوحدات والعشرات ومقارنة الأعداد ذات رقمين",
    "الجمع بدون احتفاظ ضمن العدد 99 بالتقنية الاعتيادية",
    "الجمع بالاحتفاظ (1): تحويل 10 وحدات إلى عشرة واحدة",
    "الجمع بالاحتفاظ (2): مسائل وتدريبات مكثفة على الألواح",
    "الطرح بدون استلاف للأعداد من رقمين",
    "مفهوم الطرح بالاستلاف وكسر العشرات",
    "تقنية الطرح بالاستلاف الاعتيادية ضمن العدد 99",
    "الحساب الذهني السريع: إضافة وطرح 1 و 2 و 5 و 10",
    "العدد 100 والمئات: تمثيل الصفيحة وجدول المنازل ثلاثي الأعمدة",
    "الأعداد من 100 إلى 999: قراءة وكتابة بالأرقام والحروف",
    "مقارنة وترتيب الأعداد إلى 999 وحصرها بين عشرتين متتاليتين",
    "الجمع بالاحتفاظ للأعداد ذات 3 أرقام",
    "الطرح بالاستلاف للأعداد ذات 3 أرقام وتدبير المسألة",
    "مدخل إلى مفهوم الضرب كجمع متكرر وشبكات نقطية",
    "جداول الضرب في 2 و 3 و 4 مع تقنيات الاستظهار التفاعلي",
    "جدول الضرب في 5 و 10 وعلاقتها بالأصابع والساعة",
    "قراءة الساعة التامة ونصف الساعة وتنظيم الأوقات",
    "التعامد والتوازي والأشكال الهندسية بالمسطرة والكوس",
    "قياس الأطوال بالمتر والسنتيمتر واستعمال المسطرة المدرجة",
    "حل مسائل مركبة تجمع بين الجمع والطرح والضرب البسيط",
    "ورشة الحساب الذهني التنافسي وبطاقات طارل للرياضيات",
    "معالجة مركزة لتعثرات جدول الضرب والاستلاف في الطرح",
    "التقويم الختامي والتفييء للمستوى الثاني ريادة",
  ],
  3: [
    "الأعداد من 0 إلى 999: تدقيق المكتسبات وجدول المنازل",
    "الجمع والطرح الاعتياديان: معالجة أخطاء الوضع والاحتفاظ والاستلاف",
    "الأعداد من 0 إلى 9999: الآلاف وقراءة وكتابة ومقارنة",
    "التقنية الاعتيادية للجمع مع الأعداد المكونة من 4 أرقام",
    "التقنية الاعتيادية للطرح بالاستلاف للأعداد من 4 أرقام",
    "جداول الضرب (2، 3، 4، 5): تثبيت ومسابقات الطلاقة الحسابية",
    "جداول الضرب (6، 7، 8، 9): استراتيجيات التفكيك والخاصية التوزيعية",
    "ضرب عدد مكون من رقمين في عدد من رقم واحد دون احتفاظ",
    "ضرب عدد مكون من رقمين أو 3 أرقام في عدد من رقم مع الاحتفاظ",
    "ضرب عدد في 10 و 100 و 1000 بالاستنتاج المباشر",
    "مفهوم القسمة: التوزيع بالتساوي والمشاركات العادلة",
    "القسمة الإقليدية: المقسوم، المقسوم عليه، الخارج، والباقي",
    "حساب خارج وباقي قسمة عدد من رقمين على عدد من رقم واحد",
    "المسائل الرياضية: استخراج المعطيات وتحديد العملية المناسبة",
    "الأشكال الهندسية: المستطيل، المربع، المعين، والمثلث القائم",
    "رسم الأشكال الهندسية على التربيعات باستعمال الأدوات الهندسية",
    "وحدات قياس الكتل: الغرام والكيلوغرام واستعمال الميزان",
    "وحدات قياس السعة: اللتر وأجزاؤه وتطبيقات عملية",
    "المحيط: حساب محيط المضلعات الاعتيادية (المربع والمستطيل)",
    "قراءة الجداول والمبيانات بالأعمدة وتحليل المعطيات الإحصائية",
    "حل وضعيات مسألة تتطلب خطوتين حسابيتين (جمع + ضرب / طرح + قسمة)",
    "ورشة الدعم المكثف: تدارك تعثرات جدول الضرب والقسمة الإقليدية",
    "الألعاب التفاعلية للرياضيات وحل الألغاز المنطقية",
    "الاختبار التوليفي لمسار طارل رياضيات المستوى الثالث",
  ],
  4: [
    "الأعداد الكبيرة إلى 999 999: فصلي الوحدات البسيطة والآلاف",
    "مقارنة وترتيب وتفكيك الأعداد الكبيرة وحصرها",
    "التقنية الاعتيادية للجمع والطرح ضمن 999 999 وتفادي أخطاء المحاذاة",
    "التقنية الاعتيادية للضرب في عدد مكون من رقمين مع الاحتفاظ",
    "حساب جداول الضرب بسرعة فائقة والضرب الأفقي والعمودي",
    "القسمة الإقليدية: حساب الخارج المضبوط وغير المضبوط لعدد على رقم",
    "القسمة على عدد مكون من رقمين بالتقريب والتأطير",
    "مفهوم الأعداد الكسرية: البسط والمقام وتمثيل الكسور على أشرطة",
    "مقارنة الكسور ذات نفس المقام والكسور المكافئة للواحد",
    "جمع وطرح الكسور ذات المقام الموحد وتطبيقات مسألية",
    "الأعداد العشرية (1): الجزء الصحيح والجزء العشري والفاصلة",
    "الأعداد العشرية (2): المقارنة والترتيب والمستقيم المدرج",
    "جمع وطرح الأعداد العشرية مع محاذاة الفواصل بدقة",
    "الهندسة: المستقيمات المتعامدة والمتوازية والإنشاء بالمسطرة والكوس",
    "المضلعات الرباعية وخصائص أقطارها وأضلاعها وزواياها",
    "المساحة: التمييز بين المحيط والمساحة وحساب مساحة المربع والمستطيل",
    "وحدات قياس المساحة: المتر المربع وأجزاؤه والتحويل بالجدول",
    "وحدات قياس الكتل والزمن: الساعات والدقائق والثواني وحساب المدد",
    "التناسبية (1): معامل التناسب وجداول الأعداد المتناسبة",
    "التناسبية (2): النسبة المئوية وتطبيقات التخفيض والزيادة",
    "حل المسائل المركبة: استراتيجية قراءة النص وتمثيله وحله المنطقي",
    "ورشة تدارك التعثرات في الكسور والأعداد العشرية والقسمة",
    "تطبيقات تفاعلية ومسابقات السرعة في العمليات الأربع",
    "التقويم التشخيصي النهائي للدعم المكثف بالمستوى الرابع",
  ],
  5: [
    "الملايين والملايير: فصول الأعداد، القراءة، الكتابة، والتفكيك النموذجي",
    "العمليات الأربع على الأعداد الصحيحة الطبيعية الكبيرة",
    "العمليات على الأعداد العشرية: الجمع، الطرح، وضرب عدد عشري في عدد صحيح",
    "ضرب عدد عشري في عدد عشري وضبط موضع الفاصلة بالناتج",
    "قسمة عدد صحيح على عدد من رقمين وثلاثة أرقام وخوارزمية القسمة",
    "قسمة عدد عشري على عدد صحيح وقسمة عدد على عدد عشري",
    "الكسور: توحيد المقامات والعمليات الأربع على الأعداد الكسرية",
    "اختزال الكسور والكسور العشرية والتحويل بين الكسر والعدد العشري",
    "المثلثات: تصنيفها، مجموع زوايا المثلث (180°)، ورسم الارتفاعات",
    "الدائرة والقرص: المركز، الشعاع، القطر، وحساب المحيط والمساحة",
    "متوازي الأضلاع وشبه المنحرف: الإنشاءات الهندسية وحساب المساحة",
    "وحدات قياس المساحة الفلاحية: الآر، الهكتار، والسنتيار",
    "الموشور القائم والأسطوانة القائمة: المساحة الجانبية والكلية والحجم",
    "وحدات قياس الحجم والسعة: المتر المكعب وأجزاؤه واللتر وتطبيقاتها",
    "التناسبية المتقدمة: السرعة المتوسطة، المسافة، والمدة الزمنية",
    "التناسبية: سلم التصاميم والخرائط وحساب المسافات الحقيقية",
    "النسبة المئوية والرأسمال وسعر الفائدة والمسائل المالية المبسطة",
    "تنظيم ومعالجة البيانات: إنشاء وقراءة المخططات الدائرية والمدرجات",
    "حل مسائل أولمبياد الرياضيات والتفكير الاستدلالي متعدد المراحل",
    "معالجة أخطاء العمليات الأربع الشائعة على الأعداد العشرية والكسرية",
    "ورشة بطاقات طارل التفريدية لحساب الحجوم والمساحات والكسور",
    "أنشطة الدعم الذاتي والتمرن على كراسة مؤسسات الريادة",
    "اختبار المحاكاة الفردي ومراقبة تقدم كل فوج دراسي",
    "التقرير الختامي لنتائج الدعم المكثف والتفييء النهائي للمستوى الخامس",
  ],
  6: [
    "الأعداد الصحيحة الطبيعية والعشرية: القراءة والمقارنة والعمليات الحسابية الشاملة",
    "التقنية الاعتيادية للقسمة بنوعيها (المضبوطة والمقربة) مع الأعداد العشرية",
    "قوى 2 وقوى 3 (المربعات والمكعبات) واستثمارها في الحساب السريع",
    "قواسم ومضاعفات عدد طبيعي والأعداد الأولية وقابلية القسمة على 2، 3، 4، 5، 6، 9",
    "العمليات الحسابية على الأعداد الكسرية (جمع، طرح، ضرب، قسمة) مع الاختزال المنهجي",
    "الأعداد الستينية: جمع وطرح المدد الزمنية والتحويل بين الساعات والدقائق والثواني",
    "التناسبية الشاملة: معامل التناسب، الكتلة الحجمية، والسرعة المتوسطة",
    "التناسبية: الفائدة السنوية، الرأسمال، وسعر الفائدة وتطبيقات البنوك",
    "سلم التصاميم وحساب الأبعاد المصغرة والحقيقية بدقة",
    "النسبة المئوية: حساب النسب واستخراج النسب المئوية في وضعيات واقعية",
    "الهندسة الإشهادية: منصف الزاوية، الارتفاعات، والمتوسطات في المثلث",
    "إنشاء المضلعات الرباعية الاعتيادية بدلالة الأقطار والأضلاع والزوايا",
    "التماثل المحوري والإزاحة والتكبير والتصغير على الشبكة التربيعية",
    "مساحة المضلعات المركبة وتفكيك الأشكال المعقدة إلى مضلعات بسيطة",
    "المحيطات والمساحات: مصفوفة القواعد الشاملة للأشكال المستوية",
    "المجسمات الاعتيادية: المكعب، متوازي المستطيلات، الموشور القائم، والأسطوانة",
    "المساحة الجانبية والكلية للمجسمات وحساب حجومها بالمتر المكعب",
    "الربط بين الحجم والسعة والكتلة الحجمية واستعمال جداول التحويل المركبة",
    "الإحصاء ومعالجة البيانات: المنوال، المتوسط الحسابي، وتفسير البيانات",
    "منهجية حل المسائل الإشهادية المفتوحة وخطوات التحليل الرياضي",
    "التدريب المكثف على نماذج روائز الموضعة ومسائل طارل الإشهادية",
    "معالجة مركزة للتعثرات المزمنة في الأعداد الكسرية والتحويلات الهندسية",
    "مسابقات التميز الرياضي والطلاقة الحسابية بمؤسسات الريادة",
    "التقويم النهائي للدعم المكثف وإعداد شبكة العبور إلى البرنامج الإشهادي",
  ],
};

const ARABIC_TOPICS_BY_LEVEL: Record<number, string[]> = {
  1: [
    "الوعي الصوتي والتمييز السمعي: أصوات الحروف وحركات الفم",
    "حرف الميم: الصوت، الرسم، الحركات القصيرة والطويلة والتنوين",
    "حرف الباء: تجزئة المقاطع والدمج والتنوين وتسمية الصور",
    "حرف الدال وحرف الراء: المقارنة البصرية والسمعية وتركيب كلمات ثلاثية",
    "حرف اللام وحرف الفاء: فك التشفير الصوتي والطلاقة في قراءة المقاطع",
    "حرف السين وحرف الشين: تمييز أصوات الصفير والتفشي وقراءة كلمات وجمل",
    "حرف الكاف وحرف التاء: التمييز بين التاء المربوطة والمفتوحة والتركيب",
    "حرف النون وحرف الياء: اللبنات الأساسية وطلاقة نطق المقاطع الهجائية",
    "حرف الحاء وحرف الجيم وحرف الخاء: مخرج الحلق ورسم الحروف المتشابهة",
    "حرف الصاد وحرف الضاد: التفخيم الصوتي وقراءة كلمات المعجم المدرسي",
    "حرف الطاء وحرف الظاء: ضبط نطق الأصوات المطبقة وتمييزها عن التاء والذال",
    "حرف العين وحرف الغين: المقاطع المفتوحة والمغلقة وأنشطة الطلاقة",
    "حرف الهاء وحرف الهمزة: أشكال الهمزة على الألف والواو والياء والسطر",
    "قراءة الكلمات البصرية الأكثر تواتراً (هذا، هذه، الذي، التي، في، على...)",
    "قراءة جمل قصيرة تامة المعنى تتكون من 3 إلى 5 كلمات بطلاقة وسرعة",
    "الفهم القرائي للمستوى الأول: الإجابة عن أسئلة من؟ ماذا؟ أين؟",
    "التعبير الشفهي المنظم: وصف صورة وتكوين جمل انطلاقاً من رصيد وظيفي",
    "الخط والنقل السليم: احترام مقاييس الحروف والاتجاه والمسافات",
    "الإملاء المنظور: كتابة كلمات ومقاطع مدروسة على الألواح والدفاتر",
    "أنشطة القراءة المشتركة والقصص المصورة التفاعلية",
    "ألعاب الحروف والكلمات المتقاطعة واستكشاف الكلمة الدخيلة",
    "تدارك تعثرات الخلط البصري والصوتي بين الحروف المتشابهة",
    "مسابقات التهجئة السريعة والقراءة الفردية الموجهة",
    "التقويم الختامي لمسار القراءة والكتابة بالمستوى الأول طارل",
  ],
  2: [
    "مصفوفة مسارات طارل: الانتقال من مستوى الحروف إلى مستوى الكلمات",
    "الطلاقة في قراءة الكلمات الثلاثية والرباعية وضبط التنوين والتضعيف",
    "اللام الشمسية واللام القمرية: التمييز السمعي والكتابي وحركات الشدة",
    "التاء المربوطة والتاء المبسوطة: قاعدة الوقوف بالسكون والتطبيقات الإملائية",
    "الهمزة في أول الكلمة (همزة الوصل وهمزة القطع) وضوابط النطق",
    "الكلمات البصرية للمستوى الثاني وقراءة نصوص قصيرة مشكولة",
    "استراتيجيات المفردات: شبكة المفردات، خريطة الكلمة، وعائلة الكلمة",
    "الفهم الصريح: استخراج معلومات مباشرة من نص قرائي قصير",
    "الفهم الضمني البسيط: الربط بين السبب والنتيجة واستنتاج المشاعر",
    "الجملة الفعلية: الفعل والفاعل وتركيب جمل سليمة تعبر عن حدث",
    "الجملة الاسمية: المبتدأ والخبر وتحويل الجمل البسيطة",
    "أدوات الاستفهام واستخدامها الوظيفي في طرح وتوليد الأسئلة",
    "أسماء الإشارة والضمائر المنفصلة (أنا، أنت، هو، هي، نحن...)",
    "التعبير الكتابي الموجه: ترتيب جمل مشوشة لبناء فقرة متماسكة",
    "التعبير الكتابي: تكملة بدايات ونهايات قصص قصيرة معبرة",
    "الإملاء الاختباري لكلمات تتضمن حروفاً متشابهة أو تضعيفاً",
    "القراءة المسترسلة بنبر وإيقاع معبرين يراعيان علامات الترقيم",
    "قراءة القصص المصورة والمسرح المدرسي واستثمار المعجم",
    "معالجة البطء في التهجئة وتدريبات قراءة الأعمدة والقوائم السريعة",
    "الإنتاج الشفهي: التعبير عن رأي بسيط أو موقف تجاه سلوك مدرسي",
    "ألعاب لغوية: اصطياد الأخطاء، الكلمات المفقودة، وبطاقات التحدي",
    "الدعم التفريدي للمتعثرين في مستوى الكلمات للانتقال إلى الفقرة",
    "محاكاة رائز طارل الفردي لقياس سرعة القراءة ودقتها",
    "الحصيلة العامة والتفييء الختامي في اللغة العربية للمستوى الثاني",
  ],
  3: [
    "مسار طارل: قراءة الفقرة (فقرات من 30 إلى 40 كلمة بطلاقة تامة)",
    "مؤشر الطلاقة القرائية: تحقيق معدل 50 كلمة في الدقيقة مع الفهم",
    "استراتيجيات ما قبل القراءة: ملاحظة العنوان، الصورة، وتوقع المضمون",
    "استراتيجيات أثناء القراءة: المراقبة الذاتية، التوقف، وإعادة القراءة",
    "استراتيجيات ما بعد القراءة: تلخيص الأفكار الرئيسية في مخطط ذهني",
    "الفهم القرائي الصريح والضمني واستخلاص العبرة من القصة",
    "المعجم السياقي: شرح الكلمات بالمرادف والضد واستثمار السياق",
    "أقسام الكلمة: الاسم، الفعل، والحرف وتمييز علامات كل قسم",
    "الفعل الماضي والمضارع والأمر وتصريف الأفعال مع الضمائر الأساسية",
    "الفاعل الظاهر والمضمر والمفعول به وتراكيب الجملة الفعلية التامة",
    "المبتدأ والخبر والنواسخ الفعلية (كان، أصبح، صار، ليس...)",
    "الهمزة المتوسطة: أقوى الحركات (الكسرة فالضمة فالفتحة فالسكون)",
    "الهمزة المتطرفة على السطر وعلى الحرف وقواعد رسمها المبسطة",
    "التطبيقات الإملائية: تنوين المقصور والمنقوص والممدود",
    "التعبير الكتابي: كتابة رسالة قصيرة، بطاقة دعوة، أو وصف مشهد",
    "التعبير الكتابي: كتابة فقرة سردية تحترم تسلسل الأحداث (بداية، وسط، نهاية)",
    "الإنتاج الشفهي والتواصل: عرض فكرة أمام الزملاء بلغة عربية فصيحة",
    "القراءة التفاعلية للنصوص المعلوماتية واستخراج الحقائق الأساسية",
    "معالجة صعوبات الوصل والوقف والتعثر عند علامات الترقيم",
    "تدارك تعثرات تصريف الأفعال وضبط أواخر الكلمات بالشكل التام",
    "ورشة المطالعة الحرة وبطاقات تلخيص القصص بالدفتر التراكمي",
    "تدريبات تفاعلية على مسارات طارل للارتقاء من مستوى الفقرة إلى القصة",
    "رائز المحاكاة والتقويم المرحلي لمهارات القراءة والكتابة",
    "التقويم الختامي والتفييء للمستوى الثالث مؤسسات الريادة",
  ],
  4: [
    "مسار طارل: قراءة القصة (نصوص سردية من 60 إلى 80 كلمة بطلاقة وفهم)",
    "قياس مؤشر الطلاقة: قراءة معبرة بمعدل يتجاوز 65 كلمة في الدقيقة",
    "استراتيجيات الفهم المتقدمة: الفكرة العامة، الأفكار الأساسية، والملخص",
    "الربط المنطقي بين الأفكار وأدوات الربط (لأن، بما أن، لذلك، غير أن...)",
    "تحليل بنية النص السردي: الشخصيات، الزمان، المكان، العقدة، والحل",
    "النصوص الوصفية والإخبارية وتحديد الخصائص والمميزات",
    "الصرف والتحويل: الفعل الصحيح (السالم، المهموز، المضعف)",
    "الصرف والتحويل: الفعل المعتل (المثال، الأجوف، الناقص)",
    "التراكيب: عناصر الجملة الفعلية والمفاعيل (المفعول به، المفعول المطلق)",
    "التراكيب: النواسخ الحرفية (إن وأخواتها) وعملها في الجملة الاسمية",
    "التراكيب: نصب الفعل المضارع بأن ولن وإذن وكي والجملة المؤولة",
    "التراكيب: جزم الفعل المضارع بلم ولا الناهية ولام الأمر",
    "الإملاء: رسم الهمزة المتوسطة في جميع حالاتها الشاذة والاعتيادية",
    "الإملاء: حذف ألف ما الاستفهامية وألف ابن والأسماء الموصولة",
    "التعبير الكتابي: كتابة نص وصفي لشخص أو مكان بالاعتماد على الحواس",
    "التعبير الكتابي: كتابة حكاية أو قصة واقعية تتضمن حواراً سلساً",
    "التعبير الكتابي: إعداد تقرير إخباري موجز عن حدث مدرسي أو وطني",
    "التواصل الشفهي: تقنيات الإلقاء والمناظرة الصفية وإبداء الرأي المعلل",
    "استثمار المعاجم اللغوية المدرسية في البحث عن معاني الكلمات",
    "معالجة أخطاء الصرف في إسناد الأفعال المعتلة إلى الضمائر",
    "تدارك تعثرات التعبير الكتابي وإثراء الرصيد المعجمي والتركيبي",
    "ورشة الدعم الصريح للقواعد اللغوية وتطبيقات الإعراب التفاعلي",
    "محاكاة روائز الموضعة ومسارات طارل المتقدمة للمستوى الرابع",
    "التقويم النهائي للدعم المكثف في اللغة العربية وتحديد المسارات اللاحقة",
  ],
  5: [
    "الطلاقة المتقدمة: قراءة نصوص قرائية مركبة بمعدل 80 كلمة في الدقيقة",
    "فهم المقروء: استقراء ما وراء السطور والنقد وإبداء الرأي الشخصي",
    "استراتيجيات التلخيص: تقنية الحذف والدمج والبناء لصياغة ملخص دقيق",
    "الصرف: مجرد والمزيد والميزان الصرفي للكلمات والأفعال",
    "الصرف: اسما الفاعل والمفعول وصياغتهما من الثلاثي وغير الثلاثي",
    "الصرف: اسما الزمان والمكان واسم الآلة وتوظيفها المعجمي",
    "الصرف: المصادر الصريحة والمؤولة والمصدر الميمي",
    "التراكيب: المفعول فيه (ظرف الزمان وظرف المكان) وإعرابه",
    "التراكيب: المفعول لأجله وشروطه في الجملة التعبيرية",
    "التراكيب: الحال المفردة والجملة الحالية وإعرابها السليم",
    "التراكيب: التمييز الملفوظ والملحوظ وتمييز الأعداد من 11 إلى 99",
    "التراكيب: المستثنى بإلا وغير وسوى وأحكام المستثنى الثلاثة",
    "الإملاء: الألف اللينة الممدودة والمقصورة في الأفعال والأسماء والحروف",
    "الإملاء: علامات الترقيم واستخدامها الدقيق لضبط المعنى والتنغيم",
    "التعبير الكتابي: تلخيص نص سردي أو مقالة علمية وفق شبكة معايير",
    "التعبير الكتابي: كتابة مقال رأي مدعوم بالحجج والأمثلة الواقعية",
    "التعبير الكتابي: تحويل نص شعري إلى نص نثري أو العكس",
    "التواصل الشفهي: إدارة نقاش صفي، الاستماع النشط، والرد اللبق",
    "ورشة تدقيق التراكيب ومعالجة اللحن الإعرابي والأخطاء التركيبية",
    "تدارك التعثرات الإملائية في الألف اللينة والهمزات بأنواعها",
    "أنشطة القراءة السريعة والمسترسلة بالمسلاط الضوئي",
    "استثمار بطاقات طارل في تقوية رصيد الاستيعاب وتوسيع الأفكار",
    "الاختبار التجريبي لروائز طارل وتقييم نسب التحسن الفردي والجماعي",
    "الحصيلة الشاملة للدعم المكثف باللغة العربية للمستوى الخامس",
  ],
  6: [
    "الطلاقة القرائية الإشهادية: قراءة متقنة وسريعة تتجاوز 90 كلمة في الدقيقة",
    "استراتيجيات الفهم الإشهادي: تحليل النصوص المقالية، السردية، والحجاجية",
    "تحديد الفكرة العامة والأفكار الأساسية وصياغة عنوان بديل للنص",
    "المعجم: استخراج مفردات الحقل الدلالي وشبكات المعنى المتخصصة",
    "الصرف والتحويل الإشهادي: اسم التفضيل على وزن أفعل وحالاته",
    "الصرف: العدد والمعدود وتطابق العدد مع المعدود تذكيراً وتأنيثاً",
    "الصرف: جمع التكسير (جموع القلة والكثرة) وصيغ منتهى الجموع",
    "التراكيب: الأسماء الخمسة (أب، أخ، حم، فو، ذو) وإعرابها بالحروف",
    "التراكيب: الأفعال الخمسة وإعرابها بثبوت النون وحذفها",
    "التراكيب: التوكيد اللفظي والمعنوي وشروط التوكيد بكل ونفس وعين",
    "التراكيب: النعت الحقيقي والسببي والبدل بأنواعه الثلاثة",
    "التراكيب: المنادى وحالات إعرابه (المبني على الضم والمعرب المنصوب)",
    "الإملاء: همزتا الوصل والقطع في الأفعال الخماسية والسداسية والأسماء العشرة",
    "الإملاء: كلمات شاذة تحذف بعض حروفها رسماً أو تزاد (عمرو، أولئك، داود...)",
    "التعبير الكتابي الإشهادي: كتابة رسالة رسمية وفق المنهجية المعتمدة",
    "التعبير الكتابي: كتابة حكاية واقعية أو متخيلة تراعي عناصر القصة التامة",
    "التعبير الكتابي: كتابة مقال وصفي أو حجاجي يلتزم بالمقدمة والعرض والخاتمة",
    "التعبير الكتابي: كتابة بطاقة إرشادات وتوجيهات حول موضوع صحي أو بيئي",
    "منهجية التعامل مع ورقة الامتحان الموحد الإقليمي لمادة اللغة العربية",
    "معالجة الأخطاء الشائعة في الإعراب وضبط أواخر الكلمات بالشكل التام",
    "تدريب مكثف على مسارات طارل المتقدمة لتأمين تحكم كافة المتعلمين",
    "ورشة الإنتاج اللغوي الحر وتنمية الذوق الأدبي والنقدي",
    "المحاكاة الكاملة لروائز الموضعة والامتحانات التجريبية بالريادة",
    "التقويم الختامي للدعم المكثف وتثبيت لوائح المتعلمين المؤهلين",
  ],
};

const FRENCH_TOPICS_BY_LEVEL: Record<number, string[]> = {
  1: [
    "Sensibilisation auditive: écoute des sons français, rythme et intonation",
    "Chanson d'action et formule de salutation (Bonjour, Bonsoir, Au revoir)",
    "Vocabulaire de l'école (le cartable, le livre, le cahier, la trousse, le stylo)",
    "La lettre A: reconnaissance phonologique, discrimination visuelle et tracé",
    "La lettre I: chant de l'alphabet, sons courts et identification de mots",
    "Vocabulaire de la famille (papa, maman, frère, sœur, bébé) et comptines",
    "La lettre M: association phonème-graphème, syllabes directes (ma, mi)",
    "La lettre B: articulation, opposition b/p et lecture de syllabes simples",
    "Vocabulaire des couleurs (rouge, bleu, vert, jaune, blanc, noir)",
    "La lettre L: lecture fluide des premières syllabes combinées (la, li)",
    "La lettre P: discrimination auditive et visuelle, jeux sur ardoise",
    "Les nombres de 1 à 10 en français: comptage, désignation et écriture",
    "La lettre T: décodage de mots monosyllabiques (tas, lit, mot)",
    "La lettre O: voyelle fermée, prononciation et repérage dans les prénoms",
    "Vocabulaire des animaux domestiques (le chat, le chien, le cheval, la vache)",
    "La lettre R: son vibrant, position initiale et finale dans le mot",
    "La lettre D: discrimination sonore et opposition d/t sur ardoise",
    "Compréhension d'ordres simples en classe (écoutez, regardez, levez-vous...)",
    "Lecture guidée de petits mots réguliers (ami, balle, moto, tapis)",
    "Chansons d'action et réinvestissement du lexique corporel (tête, mains, pieds)",
    "Jeux phonologiques collectifs: pigeon vole, boîte à mots et marelle des sons",
    "Remédiation ciblée des confusions auditives et motricité fine du tracé",
    "Atelier de fluence orale: récitation et prononciation soignée des comptines",
    "Bilan de positionnement TaRL Français Niveau 1 et validation des acquis",
  ],
  2: [
    "Palier TaRL: consolidation des lettres et syllabation systématique",
    "Voyelles simples (a, e, i, o, u, y) et accents (é, è, ê): prononciation",
    "Consonnes régulières et lecture de syllabes inverses (al, il, or, ur)",
    "Digraphes fréquents: OU (la soupe, la poule, le loup) et décodage guidé",
    "Digraphe ON/OM: valeur nasale et distinction avec le son O",
    "Digraphe AN/EN: reconnaissance auditive et écriture sans confusion",
    "Digraphe IN/IM: prononciation nasale et lecture de mots fréquents",
    "Mots outils fréquents (un, une, des, le, la, les, et, est, dans, sur)",
    "Lecture de mots bisyllabiques réguliers avec minuteur de fluence",
    "Compréhension orale: associer une phrase courte lue par l'enseignant à une image",
    "Lecture de phrases simples (Sujet + Verbe + Complément) avec fluidité",
    "Le genre et le nombre: masculin / féminin et singulier / pluriel (marquage du s)",
    "La phrase interrogative simple et intonation ascendante",
    "Production guidée: reconstituer une phrase mélangée et la recopier soigneusement",
    "Vocabulaire thématique: les fruits et légumes, les vêtements de saison",
    "Sons complexes: CH (chapeau, chat) et PH (photo, pharmacie)",
    "Le son K: graphies C, K, QU et règles de lecture devant e, i, y",
    "Lecture expressive de courts textes illustrés (20 à 30 mots)",
    "Questions de compréhension explicite: qui ? fait quoi ? où ?",
    "Atelier d'écriture: dictée de syllabes et de mots outils sur ardoise",
    "Jeux de langage: loto des mots, devinettes lexicales et dominos des sons",
    "Soutien ciblé pour les élèves bloqués au palier des lettres",
    "Évaluation formative de fluence: objectif 30 mots par minute",
    "Clôture du parcours de remédiation intensive Français 2AEP",
  ],
  3: [
    "Matrice TaRL Français: transition du niveau Lettres au niveau Mots et Paragraphe",
    "Objectif fluence: lecture continue et précise à un rythme de 40 mots/min",
    "Les valeurs de la lettre C: son [s] devant e, i, y et son [k] devant a, o, u",
    "La cédille (ç): règle d'emploi devant a, o, u (leçon, garçon, français)",
    "Les valeurs de la lettre G: son [g] dur et son [ʒ] doux, rôle du u et du e",
    "Les valeurs de la lettre S: son [s] et son [z] entre deux voyelles (ss vs s)",
    "Sons complexes: EU / OEU, OI (le roi, le toit) et IEN (le chien, le mien)",
    "Trigraphes: EAU / AU et homophones grammaticaux fréquents (a/à, son/sont)",
    "Lecture de paragraphes narratifs (40 à 50 mots) avec intonation correcte",
    "Stratégies de compréhension: repérer les connecteurs temporels (d'abord, ensuite, enfin)",
    "Vocabulaire: contraires, synonymes simples et familles de mots (champ lexical)",
    "Grammaire fonctionnelle: le verbe d'action, le nom propre et le nom commun",
    "Le présent des verbes réguliers du 1er groupe (-er) et des auxiliaires être/avoir",
    "L'accord dans le groupe nominal: déterminant + adjectif + nom",
    "Orthographe lexicale: mots invariables courants (toujours, jamais, souvent, très)",
    "Dictée négociée en binôme sur ardoise et correction immédiate",
    "Production d'écrit: compléter une bulle de BD ou rédiger une phrase narrative",
    "Lecture documentaire: lire une fiche d'identité d'animal ou une recette simple",
    "Jeux coopératifs TaRL: speed-reading, flashcards de fluence et course aux mots",
    "Traitement des confusions auditivo-visuelles persistantes (p/b, t/d, f/v)",
    "Atelier de lecture expressive à voix haute devant les pairs",
    "Entraînement individuel sur le livret de l'élève Écoles Pionnières",
    "Simulation du test individuel de positionnement TaRL Français",
    "Synthèse des résultats et orientation vers les paliers de consolidation",
  ],
  4: [
    "Palier TaRL: lecture fluide d'histoires complètes (60 à 80 mots sans hésitation)",
    "Objectif de fluence: vitesse minimale de 60 mots par minute avec expressivité",
    "Les sons spécifiques: ILL, AIL, EIL, OUIL, EUIL et leurs graphies régulières",
    "Règles d'accentuation: accent aigu (é), accent grave (è), circonflexe (ê, â, î)",
    "Homophones grammaticaux: et/est, on/ont, ce/se, ces/ses et astuces mnémotechniques",
    "Compréhension de textes narratifs: schéma narratif (situation initiale, péripéties, fin)",
    "Compréhension inférentielle: comprendre les intentions d'un personnage",
    "Enrichissement lexical: préfixes (re-, dé-, in-) et suffixes (-able, -tion, -ment)",
    "Les types de phrases: déclarative, interrogative, exclamative, et impérative",
    "La forme affirmative et négative (ne... pas, ne... plus, ne... jamais)",
    "Le sujet du verbe: pronominalisation et accord systématique sujet-verbe",
    "Conjugaison: le présent de l'indicatif des verbes usuels du 2ème et 3ème groupe",
    "Le futur simple des verbes réguliers et des auxiliaires être et avoir",
    "L'adjectif qualificatif: épithète et accord en genre et en nombre",
    "Production d'écrit guidée: rédiger un court récit de 3 à 4 phrases cohérentes",
    "Production d'écrit: écrire une lettre amicale ou une carte postale de vacances",
    "Lecture et exploitation de documents authentiques: emploi du temps, plan, affiche",
    "Orthographe: le pluriel des noms en -al, -ou, -eu et exceptions fréquentes",
    "Remédiation ciblée des difficultés de liaison et de découpage des mots",
    "Gestion du stress de lecture orale et techniques de respiration contrôlée",
    "Atelier d'écoute active et restitution orale fidèle d'un récit entendu",
    "Entraînement chronométré aux tests de fluence standardisés TaRL",
    "Validation des paliers de lecture autonome et remise des attestations",
    "Bilan global du soutien intensif Français 4AEP",
  ],
  5: [
    "Lecture experte et fluence avancée: textes littéraires à plus de 75 mots/min",
    "Compréhension approfondie: distinguer les faits des opinions et dégager la morale",
    "Le champ lexical et l'utilisation efficace du dictionnaire bilingue",
    "Homophones lexicaux et grammaticaux complexes: leur/leurs, ou/où, la/l'a/là",
    "Les temps du récit: imparfait de l'indicatif (valeurs de description et habitude)",
    "Le passé composé avec l'auxiliaire avoir et être et accord du participe passé",
    "L'accord du participe passé employé avec être et règles de base",
    "Les compléments essentiels: Complément d'Objet Direct (COD) et Indirect (COI)",
    "Les compléments circonstanciels: de temps (CCT), de lieu (CCL) et de manière (CCM)",
    "Les déterminants possessifs et démonstratifs et leur accord rigoureux",
    "La voix active et la voix passive: transformation et mise en valeur de l'agent",
    "Orthographe: tout, toute, tous, toutes et règles d'accord",
    "Production d'écrits: rédiger le portrait physique et moral d'un héros",
    "Production d'écrits: résumer un texte narratif en respectant la chronologie",
    "Production d'écrits: écrire un texte explicatif sur un phénomène naturel",
    "Communication orale: débattre, justifier son point de vue et argumenter",
    "Lecture documentaire: analyse d'infographies et d'articles de presse junior",
    "Remédiation systématique des fautes de conjugaison au passé composé",
    "Atelier d'orthographe réfléchie: repérer et corriger ses propres erreurs",
    "Jeux de théâtre scolaire et dramatisation de scènes de lecture TaRL",
    "Évaluations formatives continues et ajustement des groupes de besoin",
    "Pratique intensive des épreuves de fluence et de compréhension écrite",
    "Bilan de clôture de la remédiation intensive Français Niveau 5",
    "Transition vers le programme régulier d'enseignement explicite",
  ],
  6: [
    "Fluence certificative: maîtrise de la lecture fluide (>90 mots/min) sans effort",
    "Compréhension critique de textes variés: narratif, descriptif, injonctif, argumentatif",
    "Dégager l'idée générale, le thème principal et la visée communicative de l'auteur",
    "Homophones grammaticaux avancés: quel(s)/quelle(s)/qu'elle(s), sans/s'en, c'est/s'est",
    "Les temps du récit: concordance des temps (imparfait et passé simple)",
    "Le conditionnel présent: politesse, souhait, et hypothèse simple",
    "L'impératif présent: donner des consignes et conseils sans pronom sujet",
    "La nominalisation à base verbale et adjectivale et enrichissement stylistique",
    "La cause et la conséquence: parce que, car, comme, donc, par conséquent",
    "Les pronoms personnels compléments (le, la, les, lui, leur, en, y) et leur place",
    "Les degrés de l'adjectif: comparatif (plus... que, moins... que) et superlatif",
    "Production d'écrit d'examen: rédiger une lettre administrative formelle",
    "Production d'écrit: rédiger une histoire d'aventure avec dialogue intégré",
    "Production d'écrit: produire une affiche de sensibilisation (slogan + texte)",
    "Méthodologie de l'examen normalisé provincial en langue française",
    "Gestion du temps et analyse méthodique des questions de compréhension",
    "Atelier de révision orthographique intensive: accords dans la phrase complexe",
    "Remédiation ciblée des confusions de modes (indicatif vs subjonctif)",
    "Simulations d'épreuves types et correction collective avec grille critériée",
    "Renforcement de l'expression orale et éloquence en langue française",
    "Exercices d'autonomie sur les fiches de consolidation Écoles Pionnières",
    "Contrôle final des paliers de maîtrise TaRL et validation des acquis",
    "Cérémonie de valorisation des progrès des apprenants en français",
    "Clôture officielle du protocole de soutien intensif 6AEP",
  ],
};

// Generates 24 complete session objects for any given Level, Subject, and Parcours
export function generateRemediationSessions(
  level: number,
  subject: "MATH" | "AR" | "FR",
  parcours: number = 1
): RemediationSessionItem[] {
  const sessions: RemediationSessionItem[] = [];
  const levelObj = REMEDIATION_LEVELS.find((l) => l.id === level) || REMEDIATION_LEVELS[0];
  const subjObj = REMEDIATION_SUBJECTS.find((s) => s.id === subject) || REMEDIATION_SUBJECTS[0];
  const parcoursObj = REMEDIATION_PARCOURS.find((p) => p.id === parcours) || REMEDIATION_PARCOURS[0];

  const topicsList =
    subject === "MATH"
      ? MATH_TOPICS_BY_LEVEL[level] || MATH_TOPICS_BY_LEVEL[1]
      : subject === "AR"
      ? ARABIC_TOPICS_BY_LEVEL[level] || ARABIC_TOPICS_BY_LEVEL[1]
      : FRENCH_TOPICS_BY_LEVEL[level] || FRENCH_TOPICS_BY_LEVEL[1];

  for (let s = 1; s <= 24; s++) {
    const topic = topicsList[s - 1] || `الحصة ${s}: تثبيت المكتسبات والمعالجة التفريدية في ${subjObj.labelAr}`;
    const id = `REM_${subject}_N${level}_P1_PAR${parcours}_S${s}`;

    // Cloudflare R2 direct download URL (Verified 200 OK)
    const r2PptxUrl = `https://pub-3d4ad9ff802844809b7364c12b1f3115.r2.dev/REM/${id}.pptx`;
    const officeViewerUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(r2PptxUrl)}`;
    const yallaTaalimUrl = `https://yallataalim.com/remediation-intensive-cartes-mentales/${level}/${subject}/${parcours}`;

    const stages = {
      warmup: {
        name: "1. التهيئة الذهنية والتذكير (Activation & Rappel)",
        duration: "5 دقائق",
        description:
          subject === "MATH"
            ? "حساب ذهني سريع على الألواح، مسابقة التحدي الرقمي، وتذكير بالخاصية السابقة."
            : subject === "AR"
            ? "تنشيط الرصيد المعجمي، قراءة سريعة لبطاقات الكلمات البصرية، وألعاب الحروف."
            : "Chanson d'action rituelle, échauffement articulatoire, et réactivation du lexique vu lors de la séance précédente.",
        actionItems: [
          "تمرير بطاقات الحساب الذهني أو الكلمات البصرية في أقل من 30 ثانية لكل صف",
          "استعمال الألواح الفردية لتسجيل الإجابات السريعة ورصد التعثرات الفورية",
        ],
      },
      modeling: {
        name: "2. النمذجة الصريحة 'أنا أعمل' (Je modélise - Enseignant)",
        duration: "10 دقائق",
        description:
          subject === "MATH"
            ? `يقوم الأستاذ بنمذجة المفهوم الرياضي (${topic.split(':')[0]}) بالمسلاط الضوئي والوسائل المحسوسة مع التفكير بصوت مسموع وشرح الخطوات الذهنية.`
            : subject === "AR"
            ? `يقوم الأستاذ بقراءة النموذج بطلاقة، شرح استراتيجية الفهم أو الظاهرة اللغوية بصوت مسموع على السبورة والمسلاط، وكتابة الأمثلة التوضيحية.`
            : `L'enseignant modélise explicitement le concept ou la stratégie de lecture au vidéoprojecteur (diaporama PPTX) en verbalisant chaque étape.`,
        actionItems: [
          "عرض شريحة البوربوينت الرسمية بالمسلاط الضوئي للتوضيح البصري",
          "شرح خريطة المفاهيم الرياضية / اللغوية على السبورة خطوة بخطوة",
        ],
      },
      guided: {
        name: "3. الممارسة الموجهة 'نحن نعمل' (Pratique guidée - Collectif)",
        duration: "15 دقيقة",
        description:
          subject === "MATH"
            ? "إنجاز أنشطة تدريبية جماعية وتفاعلية على الألواح وفي مجموعات صغرى، مع التغذية الراجعة الفورية من الأستاذ وتصحيح الأخطاء المفاهيمية."
            : subject === "AR"
            ? "قراءة جماعية وثنائية متناوبة، استخراج الكلمات المفاتيح، وتطبيق القواعد التركيبية والإملائية على الألواح بمساعدة الأستاذ."
            : "Activités collectives guidées: lecture chorale, décodage sur ardoise, exercices interactifs avec feed-back immédiat et étayage.",
        actionItems: [
          "تنفيذ الأنشطة على الألواح مع التحقق الجماعي (3، 2، 1... ارفعوا الألواح)",
          "تشجيع الأقران على الشرح التبادلي وتصحيح زلات النطق أو الحساب",
        ],
      },
      autonomous: {
        name: "4. الممارسة المستقلة 'أنت تعمل' (Pratique autonome - Élève)",
        duration: "15 دقيقة",
        description:
          subject === "MATH"
            ? "يعمل كل متعلم بمفرده على كراسة الدعم المكثف لإنجاز التطبيقات الحسابية، بينما يقدم الأستاذ دعماً تفريدياً مكثفاً لفوج التعثرات الصغرى."
            : subject === "AR"
            ? "إنجاز التمارين الفردية في كراسة الدعم (القراءة، الفهم، الإملاء، والإنتاج الكتابي) مع توجيه المتعثرين ومتابعة مسارات طارل الفردية."
            : "Travail individuel dans le livret de l'élève. L'enseignant circule pour apporter un soutien différencié aux élèves en difficulté.",
        actionItems: [
          "حل التمارين الفردية بكراسة المتعلم التابعة لمؤسسات الريادة",
          "تتبع سرعة الإنجاز وتسجيل الملاحظات في شبكة التتبع الفردية",
        ],
      },
      assessment: {
        name: "5. التقويم والدعم التفريدي (Évaluation & Synthèse)",
        duration: "5 دقائق",
        description:
          subject === "MATH"
            ? "تفريغ نتائج الأداء، التحقق من تحقيق هدف الحصة، وتحديد المتعلمين المؤهلين للارتقاء في مسارات طارل للرياضيات."
            : subject === "AR"
            ? "تقويم سريع لطلاقة القراءة ونسبة الفهم، وتدوين الملاحظات التفريدية في المذكرة اليومية وسجل التتبع."
            : "Bilan rapide, vérification de l'atteinte de l'objectif de la séance, et notation dans la grille de suivi TaRL.",
        actionItems: [
          "طرح سؤال تقويمي ختامي سريع للتحقق من الفهم النهائي",
          "الإشادة بالجهود والمواظبة وتحفيز المتعلمين للحصة القادمة",
        ],
      },
    };

    const mindMapKeyPoints = [
      `الرمز البيداغوجي المعتمد: ${id}`,
      `المجال الدراسي: ${subjObj.labelAr} • ${levelObj.labelAr}`,
      `الهدف الرئيس: ${topic}`,
      `نوع النشاط: عرض تفاعلي PPTX للمسلاط + خطاطة ذهنية للسبورة وكراسة المتعلم`,
      `استراتيجية التدريس: التعليم الصريح (نمذجة ◄ ممارسة موجهة ◄ ممارسة مستقلة)`,
      `المسار المستهدف: ${parcoursObj.labelAr}`,
    ];

    sessions.push({
      id,
      level,
      levelLabelAr: levelObj.labelAr,
      levelLabelFr: levelObj.labelFr,
      subject,
      subjectLabelAr: subjObj.labelAr,
      subjectLabelFr: subjObj.labelFr,
      parcours,
      parcoursLabelAr: parcoursObj.labelAr,
      sessionNumber: s,
      title: id,
      topicAr: topic,
      objectivesAr: `التمكن التام من: ${topic} وتجاوز الصعوبات المرصودة في روائز الموضعة التشخيصية طارل.`,
      targetCompetency: `الكفاية الأساسية للحصة ${s} في ${subjObj.labelAr} - ${levelObj.labelAr}`,
      r2PptxUrl,
      officeViewerUrl,
      yallaTaalimUrl,
      stages,
      mindMapKeyPoints,
    });
  }

  return sessions;
}

// Cached full dataset of all 432 remediation sessions across 6 levels and 3 subjects
let _cachedAllRemediationSessions: RemediationSessionItem[] | null = null;

export function getAllRemediationSessions(): RemediationSessionItem[] {
  if (_cachedAllRemediationSessions) return _cachedAllRemediationSessions;
  const all: RemediationSessionItem[] = [];
  for (let lvl = 1; lvl <= 6; lvl++) {
    for (const subj of ["MATH", "AR", "FR"] as const) {
      all.push(...generateRemediationSessions(lvl, subj, 1));
    }
  }
  _cachedAllRemediationSessions = all;
  return all;
}
