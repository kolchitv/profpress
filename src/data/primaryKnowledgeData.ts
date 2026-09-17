import { ARABIC_INSPECTION_105_QUIZ } from "./arabicInspectionQuizData";

export interface PrimaryExamSpec {
  duration: string; // e.g. "3 ساعات"
  coefficient: string; // e.g. "1*"
  highestWeight: string; // e.g. "العربية والفرنسية (%30)"
  lowestWeight: string; // e.g. "العلوم (%12)"
}

export interface ActionAttachedImage {
  id: string;
  url: string;
  title?: string;
  caption?: string;
}

export interface InspectionExamSession {
  id: string;
  title: string; // e.g. "دورة أبريل 2024", "دورة 2023", "دورة فبراير 2022", "دورة 2021", "دورة 2020", "دورة 2019", "دورة 2018", "دورة 2017"
  year: string;
  driveUrl: string;
  directUrl?: string;
  description?: string;
  fileSize?: string;
  hasAnswerKey?: boolean;
}

export interface PrimarySubjectAction {
  id: string;
  title: string; // e.g. "معارف المادة", "ديداكتيك المادة", "علوم التربية", "نماذج اختبارات", "اختبار تجريبي"
  iconName: string; // "BookOpen", "Presentation", "Brain", "FileText", "Laptop"
  customUrl?: string; // custom external link or internal modal
  contentSummary?: string;
  articleContent?: string;
  images?: ActionAttachedImage[];
  downloadFiles?: PrimaryDownloadFile[];
  examSessions?: InspectionExamSession[];
  qcmQuestions?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation?: string;
    level?: string;
  }[];
}

export interface PrimarySubjectCard {
  id: string;
  title: string; // e.g. "اللغة العربية", "اللغة الفرنسية", "الرياضيات", "العلوم (النشاط العلمي)"
  weightBadge: string; // e.g. "وزن المكون: 30%"
  colorScheme: "blue" | "indigo" | "cyan" | "emerald" | "amber" | "rose" | "purple";
  iconName?: string; // "BookOpen", "Languages", "Calculator", "FlaskConical"
  actions: PrimarySubjectAction[];
}

export interface PrimaryDownloadFile {
  id: string;
  title: string; // e.g. "ملف المعارف الأكاديمية الشامل لمفتش التعليم الابتدائي 2024 (PDF)"
  size: string; // e.g. "3.2 MB"
  year: string; // e.g. "2024" or "وزاري"
  url?: string;
  fileType?: "pdf" | "word" | "excel" | "image";
}

export interface PrimaryImageBanner {
  id: string;
  title: string;
  imageUrl: string;
  caption?: string;
}

export interface PrimaryKnowledgePageData {
  pageTitle: string;
  pageSubtitle: string;
  badgeText: string;
  specs: PrimaryExamSpec;
  subjects: PrimarySubjectCard[];
  downloads: PrimaryDownloadFile[];
  images: PrimaryImageBanner[];
}

export const DEFAULT_ARABIC_EXAM_SESSIONS: InspectionExamSession[] = [
  {
    id: "ar_sess_2024_apr",
    title: "دورة أبريل 2024",
    year: "2024",
    driveUrl: "https://drive.google.com/drive/folders/1w3qM2_Inspection_Arabic_2024_Apr?usp=sharing",
    directUrl: "https://www.profpress.net/download/inspection_arabic_2024_april",
    description: "موضوع اختبار المعارف والديداكتيك في اللغة العربية - دورة 20 أبريل 2024 مع عناصر الإجابة الرسمية وشبكة التنقيط المعتمدة من CNEO.",
    fileSize: "2.8 MB",
    hasAnswerKey: true,
  },
  {
    id: "ar_sess_2023",
    title: "دورة 2023",
    year: "2023",
    driveUrl: "https://drive.google.com/drive/folders/1w3qM2_Inspection_Arabic_2023?usp=sharing",
    directUrl: "https://www.profpress.net/download/inspection_arabic_2023",
    description: "موضوع اختبار التفتيش في اللغة العربية دورة يونيو 2023 مع عناصر التصحيح المفصلة وملاحظات لجان المداولات.",
    fileSize: "3.1 MB",
    hasAnswerKey: true,
  },
  {
    id: "ar_sess_2022_feb",
    title: "دورة فبراير 2022",
    year: "2022",
    driveUrl: "https://drive.google.com/drive/folders/1w3qM2_Inspection_Arabic_2022_Feb?usp=sharing",
    directUrl: "https://www.profpress.net/download/inspection_arabic_2022_feb",
    description: "موضوع مباراة ولوج سلك تكوين المفتشين - دورة فبراير 2022 الاستثنائية مع شبكة التنقيط ومعايير التصحيح.",
    fileSize: "2.4 MB",
    hasAnswerKey: true,
  },
  {
    id: "ar_sess_2021",
    title: "دورة 2021",
    year: "2021",
    driveUrl: "https://drive.google.com/drive/folders/1w3qM2_Inspection_Arabic_2021?usp=sharing",
    directUrl: "https://www.profpress.net/download/inspection_arabic_2021",
    description: "موضوع اختبار المعارف وديداكتيك اللغة العربية دورة 2021 مرفقاً بالتصحيح النموذجي ودليل التحليل الديداكتيكي.",
    fileSize: "2.1 MB",
    hasAnswerKey: true,
  },
  {
    id: "ar_sess_2020",
    title: "دورة 2020",
    year: "2020",
    driveUrl: "https://drive.google.com/drive/folders/1w3qM2_Inspection_Arabic_2020?usp=sharing",
    directUrl: "https://www.profpress.net/download/inspection_arabic_2020",
    description: "موضوع اختبار مباراة التفتيش التربوي دورة دجنبر 2020 مع عناصر الإجابة وشبكات تقويم الإنتاج الكتابي والتحليل النحوي.",
    fileSize: "2.5 MB",
    hasAnswerKey: true,
  },
  {
    id: "ar_sess_2019",
    title: "دورة 2019",
    year: "2019",
    driveUrl: "https://drive.google.com/drive/folders/1w3qM2_Inspection_Arabic_2019?usp=sharing",
    directUrl: "https://www.profpress.net/download/inspection_arabic_2019",
    description: "موضوع اختبار اللغة العربية - مباراة مركز تكوين المفتشين دورة 2019 مع الحلول النموذجية وتوزيع النقط.",
    fileSize: "1.9 MB",
    hasAnswerKey: true,
  },
  {
    id: "ar_sess_2018",
    title: "دورة 2018",
    year: "2018",
    driveUrl: "https://drive.google.com/drive/folders/1w3qM2_Inspection_Arabic_2018?usp=sharing",
    directUrl: "https://www.profpress.net/download/inspection_arabic_2018",
    description: "موضوع اختبار التفتيش دورة 2018 مع عناصر الإجابة الرسمية ودراسة نقدية للوضعيات التقويمية المقترحة.",
    fileSize: "2.3 MB",
    hasAnswerKey: true,
  },
  {
    id: "ar_sess_2017",
    title: "دورة 2017",
    year: "2017",
    driveUrl: "https://drive.google.com/drive/folders/1w3qM2_Inspection_Arabic_2017?usp=sharing",
    directUrl: "https://www.profpress.net/download/inspection_arabic_2017",
    description: "موضوع اختبار التفتيش دورة 2017 في علوم اللغة وديداكتيك التدريس بالسلك الابتدائي مع عناصر الإجابة الرسمية.",
    fileSize: "2.0 MB",
    hasAnswerKey: true,
  },
];

export const DEFAULT_PRIMARY_KNOWLEDGE_DATA: PrimaryKnowledgePageData = {
  pageTitle: "اختبار المعارف - مباراة التفتيش التربوي (ابتدائي)",
  pageSubtitle: "التوصيف الرسمي، معارف المواد، الديداكتيك، علوم التربية، ونماذج الاختبارات المعتمدة للتعليم الابتدائي",
  badgeText: "مسلك تفتيش التعليم الابتدائي",
  specs: {
    duration: "3 ساعات",
    coefficient: "1*",
    highestWeight: "العربية والفرنسية (%30)",
    lowestWeight: "العلوم (%12)",
  },
  subjects: [
    // 1. اللغة العربية (30%)
    {
      id: "subject_arabic",
      title: "اللغة العربية",
      weightBadge: "وزن المكون: 30%",
      colorScheme: "blue",
      iconName: "BookOpen",
      actions: [
        {
          id: "ar_knowledge",
          title: "معارف المادة",
          iconName: "BookOpen",
          contentSummary: "المعارف اللغوية والأكاديمية التخصصية في علوم اللغة العربية: النحو، الصرف، الإملاء، المعاجم، والأساليب البلاغية المقررة بالتعليم الابتدائي.",
          articleContent: `# المعارف الأكاديمية لمادة اللغة العربية - مسلك تفتيش الابتدائي (وزن المكون: 30%)

يعد اختبار المعارف الأكاديمية في مادة اللغة العربية محطة حاسمة لقياس التمكن الإبستمولوجي واللغوي لدى المترشح(ة) لمباراة التفتيش، حيث يتطلب استيعاباً عميقاً للقواعد والظواهر اللغوية وأسرار التراكيب والصيغ الصرفية والبلاغية.

---

## 1. النحو الوظيفي والتراكيب (Syntaxe fonctionnelle)
- **بنية الجملة العربية:** الجملة الفعلية (الفعل، الفاعل، نائب الفاعل)، والجملة الاسمية (المبتدأ والخبر، رتبة الخبر ووجوب تقديمه).
- **النواسخ الفعلية والحرفية:** كان وأخواتها، كاد وأخواتها (أفعال المقاربة والرجاء والشروع)، إنّ وأخواتها، و'لا' النافية للجنس وأحكام اسمها وخبرها.
- **المنصوبات:**
  - **المفاعيل الخمسة:** المفعول به، المفعول المطلق (المؤكد لعامله، المبين لنوعه، المبين لعدده)، المفعول فيه (ظرفا الزمان والمكان)، المفعول لأجله، والمفعول معه.
  - **الحال:** المفردة، الجملة، وشبه الجملة، وشروط صاحب الحال.
  - **التمييز:** تمييز الذات (المفرد: العدد، المقادير، شبه المقادير)، وتمييز النسبة (الجملة: المحول وغير المحول).
  - **المستثنى:** أحكام المستثنى بـ 'إلا' (التام المثبت، التام المنفي، الناقص المنفي)، والمستثنى بـ (غير، سوى، خلا، عدا، حاشا).
  - **المنادى:** أنواعه (العلم المفرد، النكرة المقصودة، النكرة غير المقصودة، المضاف، الشبيه بالمضاف) وأحكامه الإعرابية.
- **التوابع:** النعت (الحقيقي والسببي)، التوكيد (اللفظي والمعنوي بألفاظه وشروطه)، البدل (المطابق، بعض من كل، الاشتمال، المباين)، وعطف البيان وعطف النسق بحروفه ودلالاتها.
- **الأساليب النحوية:** أسلوب الشرط (الأدوات الجازمة لفعلين وأدوات الشرط غير الجازمة)، أسلوب التعجب (ما أفعله وأفعل به)، أسلوب المدح والذم (نعم، بئس، حبذا، لا حبذا)، أسلوب الاختصاص، والتحذير والإغراء.

---

## 2. الصرف والتحويل (Morphologie)
- **الميزان الصرفي وأصول الكلمات:** الفاء والعين واللام، الزيادة والحذف، والإعلال والإبدال.
- **أقسام الفعل:** المجرد والمزيد (معاني صيغ الزيادة)، الصحيح (السالم، المهموز، المضعف) والمعتل (المثال، الأجوف، الناقص، اللفيف المفروق، اللفيف المقرون).
- **تصريف الأفعال:** إسناد الأفعال إلى الضمائر في الماضي والمضارع والأمر، وتأكيد الفعل بالنون (الخفيفة والثقيلة).
- **المشتقات العاملة وغير العاملة:**
  - اسم الفاعل وصيغ المبالغة وشروط إعمالهما.
  - اسم المفعول وشروط إعماله وصياغته من الثلاثي وغير الثلاثي.
  - الصفة المشبهة باسم الفاعل.
  - اسما الزمان والمكان والمفاضلة والصياغة القياسية والسماعية.
  - اسم الآلة (الأوزان القديمة والحديثة المعتمدة من مجمع اللغة).
  - اسم التفضيل وحالاته الأربع (المجرد من أل والإضافة، المقترن بأل، المضاف إلى نكرة، المضاف إلى معرفة).
- **النسب والتصغير:** قواعد النسب إلى المختوم بتاء التأنيث، المقصور، الممدود، المنقوص، والمحذوف اللام؛ وأوزان التصغير (فُعَيْل، فُعَيْعِل، فُعَيْعِيل) ودلالاته.

---

## 3. المعاجم والدلالة والبلاغة (Sémantique et Rhétorique)
- **المعاجم المعتمدة وطرق البحث فيها:**
  - المعاجم المجنسة بحسب الأوائل (أساس البلاغة، المصباح المنير، المنجد).
  - المعاجم المجنسة بحسب الأواخر والقوافي (لسان العرب، القاموس المحيط، الصحاح).
- **العلاقات الدلالية:** الترادف، التضاد، المشترك اللفظي، الترادف التام والنسبي، والحقول الدلالية والمعجمية.
- **علوم البلاغة الثلاثة:**
  - **علم البيان:** التشبيه (أركانه وأقسامه: المفرد، التمثيلي، الضمني، المؤكد، البليغ)، الاستعارة (المكنية، التصريحية، التمثيلية)، الكناية (عن صفة، عن موصوف، عن نسبة)، والحقيقة والمجاز اللغوي والمرسل بعلاقاته (السببية، المسببية، الجزئية، الكلية، الحالية، المحلية، اعتبار ما كان، اعتبار ما سيكون).
  - **علم البديع:** المحسنات اللفظية (الجناس، السجع، رد العجز على الصدر) والمحسنات المعنوية (الطباق بنوعيه، المقابلة، التورية، حسن التعليل).
  - **علم المعاني:** الخبر والإنشاء (الطلبي وغير الطلبي)، وأغراض الخبر البلاغية والأساليب الإنشائية (الأمر، النهي، الاستفهام، النداء، التمني) وخروجها عن مقتضى الظاهر.

---

## 4. الإملاء المعياري والرسم الإملائي
- الهمزة في أول الكلمة (همزة الوصل وهمزة القطع ومواضعهما القياسية والسماعية).
- الهمزة المتوسطة وقاعدة أقوى الحركات (الكسرة > الضمة > الفتحة > السكون) والحالات الشاذة للهمزة المتوسطة.
- الهمزة المتطرفة ورسمها بحسب حركة الحرف السابق لها.
- الألف اللينة الممدودة والمقصورة في الأفعال والأسماء والحروف الثلاثية وغير الثلاثية.
- الحروف التي تزاد (ألف التفريق، واو عمرو، واو أولاء وأولئك) والحروف التي تحذف (ألف ابن، ألف ما الاستفهامية، ألف ال التعريف بعد لام الجر).`,
          downloadFiles: [
            {
              id: "pk_ar_1",
              title: "الدليل الأكاديمي الشامل في علوم اللغة العربية لمباراة التفتيش (PDF)",
              size: "3.4 MB",
              year: "2024",
              url: "https://www.profpress.net/download/arabic_grammar_inspection_guide",
            },
            {
              id: "pk_ar_2",
              title: "ملخص القواعد الصرفية والنحوية والبلاغية بالسلك الابتدائي (PDF)",
              size: "2.1 MB",
              year: "2023",
              url: "https://www.profpress.net/download/arabic_syntax_morphology_summary",
            },
          ],
          qcmQuestions: [
            {
              question: "ما إعراب كلمة 'طالباً' في الجملة: 'ازداد المتعلمُ طالباً للعلمِ'؟",
              options: ["مفعول به ثانٍ", "تمييز منصوب", "حال منصوبة", "مفعول لأجله"],
              correctIndex: 1,
              explanation: "الاسم المنصوب بعد فعل دال على الزيادة أو النقصان يعرب تمييزاً لبيان جهة الزيادة وإزالة الإبهام عن الجملة.",
            },
            {
              question: "أي من الأفعال التالية يعد فعلاً معتلاً أجوف؟",
              options: ["وعد", "قال", "رمى", "روى"],
              correctIndex: 1,
              explanation: "الفعل الأجوف هو ما كانت عينه (حرفه الأوسط) حرف علة، مثل: قال، باع، نام.",
            },
            {
              question: "ما نوع الاستعارة في قول الشاعر: 'وإذا المنيّةُ أنشبتْ أظفارَها * ألفيتَ كلَّ تميمةٍ لا تنفعُ'؟",
              options: ["استعارة تصريحية", "استعارة مكنية", "استعارة تمثيلية", "مجاز مرسل"],
              correctIndex: 1,
              explanation: "استعارة مكنية حيث شبّه المنية (الموت) بحيوان مفترس، وحذف المشبه به ودلّ عليه بأحد لوازمه وهو 'الأظفار'.",
            },
            {
              question: "كيف يُكشف عن كلمة 'استقامة' في معجم 'لسان العرب' لابن منظور؟",
              options: ["باب القاف فصل الواو", "باب الميم فصل القاف مع مراعاة الواو", "باب الهمزة فصل السين", "باب السين فصل التاء"],
              correctIndex: 1,
              explanation: "لسان العرب يعتمد نظام القافية (الأواخر): أصل الكلمة (ق-و-م)، الحرف الأخير هو الميم (باب الميم)، والأول هو القاف (فصل القاف).",
            },
          ],
        },
        {
          id: "ar_didactics",
          title: "ديداكتيك المادة",
          iconName: "Presentation",
          contentSummary: "ديداكتيك تعليم وتعلم مكونات اللغة العربية: الاستماع والتحدث، القراءة المقطعية والتفاعلية، الظواهر اللغوية الضمنية والصريحة، ومشروع الوحدة.",
          articleContent: `# ديداكتيك اللغة العربية بالسلك الابتدائي - الإطار النظري والتطبيقي

يستند منهاج اللغة العربية المنقح بالتعليم الابتدائي إلى مقاربة نسقية شمولية تروم تمكين المتعلم(ة) من الكفاية التواصلية اللغوية بجميع أبعادها التعبيرية والقرائية والكتابية.

---

## 1. موجهات ومبادئ المنهاج المنقح للغة العربية:
1. **الانتقال التدريجي من الاستضمار إلى التصريح:**
   - **السنوات الأولى والثانية والثالثة:** تمرير القواعد والظواهر النحوية والصرفية والإملائية ضمنياً بدون تسميات ولا قواعد اصطلاحية عبر المحاكاة والترديد والسماع.
   - **السنوات الرابعة والخامسة والسادسة:** التصريح بالظواهر اللغوية عبر حصص مخصصة تتبع مسار: الملاحظة والاكتشاف -> التحليل والاستنتاج -> التطبيق والإنتاج.
2. **اعتماد المقاربة التداولية الوظيفية:** جعل اللغة أداة للتواصل الحقيقي والتعبير عن الذات والتفكير الإبداعي وليس مجرد محفوظات جافة.
3. **مبدأ التكامل والتفاعل بين المكونات اللغوية:** ارتباط القراءة بالكتابة بالاستماع والتحدث بمشروع الوحدة حول نفس المجال الموضوعاتي.

---

## 2. ديداكتيك التعليم المبكر للقراءة (المقاربة المقطعية):
تعتمد القراءة في السنوات الأولى على المكونات الخمسة للتعليم المبكر للقراءة:
1. **الوعي الصوتي (Conscience phonologique):** إدراك أن الكلمات المنطوقة تتكون من مقاطع وأصوات منفردة (العزل، الدمج، التفييء، الحذف، الإضافة، التعويض).
2. **المبدأ الألفبائي (Principe alphabétique):** الربط الصريح بين الصوت المنطوق (Phonème) والحرف المكتوب (Graphème).
3. **الطلاقة (Fluence):** القدرة على قراءة المقاطع والكلمات والنصوص بدقة، وسرعة مناسبة، وإيقاع معبر (Prosodie).
4. **المفردات (Vocabulaire):** تنمية المعجم عبر استراتيجيات: شبكة المفردات، خريطة الكلمة، عائلة الكلمة، مفاتيح السياق، والمعاني المتعددة.
5. **الفهم القرائي (Compréhension):** استخلاص المعاني الصريحة والضمنية وتوليد الاستنتاجات وإبداء الرأي.

---

## 3. استراتيجيات القراءة التفاعلية:
- **استراتيجيات ما قبل القراءة:** فحص عتبات النص (العنوان، الصورة، الكاتب، المصدر)، وتوليد التوقعات الفرضية وتنشيط المعارف القبلية.
- **استراتيجيات أثناء القراءة:** المراقبة الذاتية للفهم، استعمال سياق الجملة، التساؤل الذاتي، والربط (نص بنص، نص بذاتي، نص بالعالم).
- **استراتيجيات ما بعد القراءة:** إعادة صياغة النص، التلخيص، تقويم النص، والتحقق من التوقعات الأولية.

---

## 4. مكون الاستماع والتحدث وتدريس الحكاية:
- **الوضعية التواصلية:** تنمية مهارات التعبير الشفهي واستعمال المعجم والأساليب والقيم.
- **الحكاية:** تنمية الإصغاء وتنمية الخيال وتمثل البنية السردية (البداية، التحول، العقدة/المشكل، الحل، النهاية) وعناصر الحكاية (الشخصيات، الزمان، المكان، الأحداث).

---

## 5. مكون الكتابة وتدريس الإنتاج الكتابي:
- التدرج من الخط والنقل والإملاء إلى التعبير الكتابي المنظم وفق مراحل إعداد المشروع: التخطيط -> المسودة -> المراجعة -> التنقيح -> العرض والنشر.
- تطبيق مقاربة التدريس الصريح (Explicit Instruction): النمذجة (أنا أفعل) -> الممارسة الموجهة (نحن نفعل) -> الممارسة المستقلة (أنت تفعل).`,
          downloadFiles: [
            {
              id: "pk_ar_did_1",
              title: "دليل ديداكتيك اللغة العربية بالسلك الابتدائي - المنهاج المنقح (PDF)",
              size: "4.2 MB",
              year: "2024",
              url: "https://www.profpress.net/download/arabic_didactics_primary_guide",
            },
            {
              id: "pk_ar_did_2",
              title: "استراتيجيات القراءة التفاعلية وتطبيقاتها الصفية (PDF)",
              size: "1.8 MB",
              year: "2023",
              url: "https://www.profpress.net/download/reading_strategies_guide",
            },
          ],
          qcmQuestions: [
            {
              question: "متى يتم الشروع في التصريح بالظواهر اللغوية في المنهاج المنقح للغة العربية؟",
              options: ["من السنة الأولى ابتدائي", "من السنة الثالثة ابتدائي", "من السنة الرابعة ابتدائي", "من السنة السادسة فقط"],
              correctIndex: 2,
              explanation: "يتم تصريح الظواهر اللغوية بالقواعد والضوابط بدءاً من السنة الرابعة ابتدائي بعد تمريرها ضمنياً في السنوات 1 و 2 و 3.",
            },
            {
              question: "أي من الاستراتيجيات التالية تستخدم في بناء المفردات بتحديد (مرادف الكلمة، ضدها، نوعها، وتركيبها في جملة)؟",
              options: ["شبكة المفردات", "عائلة الكلمة (الاشتقاق)", "خريطة الكلمة", "مفاتيح السياق"],
              correctIndex: 2,
              explanation: "خريطة الكلمة تتضمن تحديد نوع الكلمة (اسم/فعل)، مرادفها، ضدها، واستعمالها في جملة مفيدة.",
            },
            {
              question: "ما هي المراحل الثلاث المتتابعة في مقاربة التدريس الصريح (Explicit Instruction)؟",
              options: [
                "التقويم -> الدعم -> التثبيت",
                "النمذجة (أنا أفعل) -> الممارسة الموجهة (نحن نفعل) -> الممارسة المستقلة (أنت تفعل)",
                "البحث الحر -> المناقشة -> الخلاصة",
                "الممارسة المستقلة أولاً ثم الشرح لاحقاً",
              ],
              correctIndex: 1,
              explanation: "يقوم التدريس الصريح على التدرج الدقيق: نمذجة الأستاذ ثم ممارسة مشتركة موجهة ثم استقلالية المتعلم.",
            },
          ],
        },
        {
          id: "ar_pedagogy",
          title: "علوم التربية",
          iconName: "Brain",
          contentSummary: "نظريات التعلم (البنائية، السوسيوبنائية، المعرفية)، سيكولوجية الطفل في السلك الابتدائي، وتقنيات التنشيط والتفاعل الصفي.",
          articleContent: `# علوم التربية وسيكولوجية التعلم ومستجدات المنظومة التربوية

يشكل مجال علوم التربية أحد الأعمدة الرئيسية لاختبارات التفتيش، حيث يبرز قدرة المترشح على التأطير النظري والبيداغوجي للممارسات التعليمية التعلمية وتقويم المنظومة.

---

## 1. النظريات المرجعية الكبرى للتعلم:
- **النظرية البنائية (Constructivisme - جان بياجيه):**
  - التعلم عملية بناء نشطة يمارسها المتعلم في تفاعله مع موضوع المعرفة.
  - آليات التكيف المعرفي: الاستيعاب (Assimilation)، الملاءمة (Accommodation)، والتوازن (Équilibration).
  - مراحل النمو المعرفي: الحسي حركي (0-2 سنة)، ما قبل العمليات (2-7 سنوات)، العمليات المحسوسة (7-11 سنة)، والعمليات المجردة (12 سنة فما فوق).
- **النظرية السوسيوبنائية (Socioconstructivisme - ليف فيغوتسكي):**
  - التعلم يتم عبر التفاعل الاجتماعي والوساطة الثقافية واللغوية.
  - **منطقة النمو القريب (Zone Proximale de Développement - ZPD):** المسافة الفاصلة بين مستوى النمو الفعلي للطفل (ما يستطيع إنجازه بمفرده) ومستوى نموه المحتمل تحت إشراف الراشد أو بالتعاون مع أقران مؤهلين.
  - مفهوم الإسناد المعرفي أو السقالة التعليمية (Étayage / Scaffolding - جيروم برونر).
- **النظرية المعرفية (Cognitivisme):**
  - التركيز على العمليات الذهنية الداخلية: الانتباه، الإدراك، ومعالجة المعلومات.
  - بنية الذاكرة: الذاكرة الحسية، الذاكرة العاملة (قصيرة المدى)، والذاكرة طويلة المدى.
  - استراتيجيات ما وراء المعرفة (Métacognition): التخطيط، المراقبة الذاتية، والتقويم الذاتي.

---

## 2. البيداغوجيات الوظيفية المعتمدة:
1. **البيداغوجيا الفارقية:** تنويع المسارات والأنشطة والوسائل لتلائم تباين وثيرة التعلم واستعدادات المتعلمين.
2. **بيداغوجيا الخطأ:** اعتبار الخطأ لحظة إيجابية ومؤشراً تكوينياً كاشفاً لسيرورة التعلم والعوائق المعرفية.
3. **بيداغوجيا المشروع:** جعل المتعلم محور مشروع تعليمي هادف ينمي كفايات التخطيط والعمل الجماعي.
4. **بيداغوجيا حل المشكلات:** وضع المتعلم أمام وضعية مشكلة دالة لإثارة الصراع المعرفي وتوظيف المكتسبات.
5. **بيداغوجيا التعاقد واللعب التربوي.**

---

## 3. التقويم التربوي وشبكات التصحيح:
- أنماط التقويم الثلاثة: التقويم التشخيصي (القبلي)، التقويم التكويني (المواكب)، والتقويم الإجمالي الإشهادي.
- معايير التقويم (Critères) ومؤشرات التحقق (Indicateurs): معيار الملاءمة، معيار الاستعمال السليم لأدوات المادة، معيار الانسجام، ومعيار التميز والإتقان.

---

## 4. مستجدات المنظومة التربوية بالمغرب:
- **القانون الإطار 51.17** المتعلق بمنظومة التربية والتكوين والبحث العلمي ومبادئ الإنصاف وتكافؤ الفرص والجودة والارتقاء الفردي.
- **خارطة الطريق 2022-2026** "من أجل مدرسة عمومية ذات جودة للجميع" بمحاورها الثلاثة: التلميذ، الأستاذ، والمؤسسة التعليمية.
- **مشروع مؤسسات الريادة (Écoles Pionnières):** التدريس وفق المستوى المناسب (TaRL)، مقاربة التدريس الصريح، والمواكبة الميدانية المستمرة للمفتشين.`,
          downloadFiles: [
            {
              id: "pk_ar_ped_1",
              title: "الدليل المرجعي الشامل في علوم التربية ونظريات التعلم (PDF)",
              size: "3.8 MB",
              year: "2024",
              url: "https://www.profpress.net/download/education_sciences_comprehensive_guide",
            },
          ],
          qcmQuestions: [
            {
              question: "ما المقصود بـ 'منطقة النمو القريب' (ZPD) لدى فيغوتسكي؟",
              options: [
                "المسافة بين ما يستطيع الطفل إنجازه بمفرده وما يستطيع إنجازه بمساعدة راشد أو أقران أكثر كفاءة",
                "المرحلة العمرية التي يتوقف فيها النمو الحركي للطفل",
                "المكان المخصص للأنشطة الموازية في المؤسسة التعليمية",
                "درجة الذكاء الفطري غير القابلة للتغيير",
              ],
              correctIndex: 0,
              explanation: "منطقة النمو القريب هي الفارق بين مستوى النمو الفعلي المستقل ومستوى النمو المحتمل تحت توجيه الراشد أو بالتعاون مع أقران مؤهلين.",
            },
            {
              question: "ما هي المحاور الثلاثة الاستراتيجية لخارطة الطريق 2022-2026 لوزارة التربية الوطنية؟",
              options: [
                "التلميذ، الأستاذ، والمؤسسة التعليمية",
                "الابتدائي، الإعدادي، والثانوي",
                "الرقمنة، التكوين، والتجهيز",
                "المفتش، المدير، والأستاذ",
              ],
              correctIndex: 0,
              explanation: "تنتظم خارطة الطريق حول ثلاثة محاور استراتيجية متكاملة هي: التلميذ، الأستاذ، والمؤسسة التعليمية عبر 12 برنامجاً تنفيذياً.",
            },
          ],
        },
        {
          id: "ar_exams",
          title: "نماذج اختبارات",
          iconName: "FileText",
          contentSummary: "أرشيف ونماذج الاختبارات الكتابية لمباريات التفتيش السابقة من 2017 إلى 2024 على Google Drive مع عناصر الإجابة الرسمية وشبكات التنقيط.",
          examSessions: DEFAULT_ARABIC_EXAM_SESSIONS,
          articleContent: `# أرشيف نماذج اختبارات مباراة التفتيش - مكون اللغة العربية (2017 - 2024)

يوفر هذا الركن أرشيفاً موثوقاً وشاملاً لكافة الاختبارات الكتابية الرسمية لمباراة ولوج مسلك تكوين مفتشي التعليم الابتدائي في مادة اللغة العربية، متضمنة مواضيع المعارف والديداكتيك، مرفقة بعناصر الإجابة الرسمية وسلم التنقيط المعتمد.

---

## الدورات المتاحة على Google Drive للتحميل المباشر:
1. **دورة أبريل 2024:** أحدث دورة امتحانية ركزت على دمج معارف اللغة العربية بمستجدات التدريس الصريح والمقاربة النصية.
2. **دورة 2023:** موضوع المعارف اللغوية والأكاديمية مع عناصر التصحيح المفصلة الصادرة عن المركز الوطني للتقويم.
3. **دورة فبراير 2022:** دورة استثنائية اشتملت على وضعيات تحليل الخطاب والنقد التربوي والتحويل الصرفي.
4. **دورة 2021:** اختبار المعارف وديداكتيك اللغة العربية بالسلك الابتدائي.
5. **دورة 2020:** موضوع الدورة العادية مع شبكة تنقيط مقاييس الصواب اللغوي.
6. **دورة 2019:** موضوع المعارف الأكاديمية مع الحل النموذجي.
7. **دورة 2018:** موضوع الاختبار الكتابي مع عناصر الإجابة.
8. **دورة 2017:** موضوع اختبار التفتيش في علوم اللغة وديداكتيك التدريس.

---

## شبكة تصحيح ومعايير تقويم اختبار المعارف والديداكتيك:
- **التمكن المعرفي والأكاديمي (40%):** الدقة في القواعد النحوية، سلامة الصرف والاشتقاق، الدقة المعجمية والبلاغية، وصحة الضبط بالشكل التام.
- **التحليل الديداكتيكي والنقل البيداغوجي (35%):** وضوح الرؤية المنهجية، صياغة الأهداف والكفايات، هندسة المقاطع التعلمية، والقدرة على تشخيص تعثرات المتعلمين واقتراح بدائل علاجية دقيقة.
- **علوم التربية والتشريع ومستجدات المنظومة (15%):** توظيف نظريات التعلم وموجهات خارطة الطريق ومدارس الريادة.
- **جودة العرض وسلامة لغة التحرير (10%):** المقروئية، التماسك والترتيب المنطقي، واستعمال لغة عربية فصيحة وسليمة.`,
          downloadFiles: [
            {
              id: "pk_ar_exam_pack",
              title: "الحقيبة الشاملة لجميع مواضيع وتصحيحات التفتيش عربي 2017-2024 (ZIP)",
              size: "18.5 MB",
              year: "2024",
              url: "https://drive.google.com/drive/folders/1w3qM2_Inspection_Arabic_Full_Pack?usp=sharing",
            },
          ],
          qcmQuestions: [
            {
              question: "ما المعامل المخصص لاختبار المعارف في التوصيف الرسمي لمباراة التفتيش الابتدائي؟",
              options: ["المعامل 1", "المعامل 2", "المعامل 3", "المعامل 4"],
              correctIndex: 0,
              explanation: "معامل اختبار المعارف بالسلك الابتدائي هو 1 بحسب التوصيف الرسمي المعتمد من طرف المركز الوطني للتقويم والامتحانات.",
            },
          ],
        },
        {
          id: "ar_quiz",
          title: "اختبار تجريبي",
          iconName: "Laptop",
          contentSummary: "اختبار تجريبي تفاعلي شامل يضم 105 سؤالاً في مستويات اللغة العربية: الصوتي، الصرفي، التركيبي، البلاغي، وفهم المقروء مع إعراب الجمل كاملاً والتصحيح الفوري.",
          customUrl: "https://profpressma.blogspot.com/p/quiz-arabe-inspection-primaire.html",
          qcmQuestions: ARABIC_INSPECTION_105_QUIZ,
        },
      ],
    },

    // 2. اللغة الفرنسية (30%)
    {
      id: "subject_french",
      title: "اللغة الفرنسية",
      weightBadge: "وزن المكون: 30%",
      colorScheme: "indigo",
      iconName: "Languages",
      actions: [
        {
          id: "fr_knowledge",
          title: "معارف المادة",
          iconName: "BookOpen",
          contentSummary: "Connaissances disciplinaires en langue française : Grammaire fonctionnelle, conjugaison, orthographe d'usage et grammaticale, lexicologie et sémantique.",
          articleContent: `# Connaissances Académiques - Langue Française (Primaire)

## 1. Morphosyntaxe et Grammaire :
- Les constituants de la phrase simple et complexe (GNS, GV, Compléments circonstanciels).
- Les propositions subordonnées : relatives, complétives, circonstancielles (temps, cause, conséquence, but).
- Les accords délicats : participe passé avec avoir/être, verbes pronominaux, adjectifs de couleur et composés.

## 2. Conjugaison et Valeurs des Temps :
- Le système des temps de l'indicatif (présent, imparfait, passé composé, passé simple, futur simple).
- Le subjonctif présent et ses valeurs modales (souhait, obligation, doute).
- Le conditionnel (présent et passé) et l'expression de l'hypothèse.

## 3. Lexique et Vocabulaire :
- Dérivation lexicale, composition, synonymie, antonymie, homonymie et polysémie.`,
          qcmQuestions: [
            {
              question: "Dans la phrase : 'Les fleurs qu'elle a (cueilli) sont fraîches', quel est l'accord correct du participe passé ?",
              options: ["cueilli", "cueillies", "cueillis", "cueillie"],
              correctIndex: 1,
              explanation: "Le participe passé conjugué avec 'avoir' s'accorde en genre et en nombre avec le COD ('les fleurs', fém. plur.) placé avant le verbe.",
            },
          ],
        },
        {
          id: "fr_didactics",
          title: "ديداكتيك المادة",
          iconName: "Presentation",
          contentSummary: "Didactique du Français Langue Étrangère (FLE/FL2) : Communication orale, lecture méthodique, production écrite et pédagogie du projet.",
          articleContent: `# Didactique du Français au Cycle Primaire

## Les Composantes Pédagogiques :
1. **Activités Orales :**
   - Écoute active, compréhension de l'oral, et actes de communication en situation signifiante.
2. **Lecture Décodage et Compréhension :**
   - Méthode syllabique/phonique combinée avec l'accès au sens.
   - Stratégies de fluence (Fluidité : précision, vitesse, expression).
3. **Production de l'écrit :**
   - Du mot à la phrase, du paragraphe au texte structuré (narratif, descriptif, injonctif, explicatif).`,
          qcmQuestions: [
            {
              question: "Quelle est la composante clé de la 'fluence en lecture' en cycle primaire ?",
              options: [
                "La vitesse de lecture sans compréhension",
                "La combinaison de la précision, de la vitesse et de la prosodie (expression)",
                "La lecture silencieuse uniquement",
                "La mémorisation par cœur du texte",
              ],
              correctIndex: 1,
              explanation: "La fluence est la capacité de lire un texte avec précision, rapidité et expressivité (prosodie) pour faciliter la compréhension.",
            },
          ],
        },
        {
          id: "fr_pedagogy",
          title: "علوم التربية",
          iconName: "Brain",
          contentSummary: "Sciences de l'éducation, différenciation pédagogique, gestion de l'hétérogénéité et statut de l'erreur dans l'apprentissage d'une langue étrangère.",
          articleContent: `# Sciences de l'Éducation et Enseignement du Français

## Principes didactiques majeurs :
- **Statut positif de l'erreur :** L'erreur n'est plus considérée comme une faute à sanctionner, mais comme un indicateur précieux du processus d'apprentissage et de la zone de développement du formé.
- **Pédagogie différenciée :** Adapter les contenus, les démarches et les rythmes selon les profils d'apprenants.
- **Approche par compétences :** Mobiliser un ensemble intégré de ressources (savoirs, savoir-faire, savoir-être) pour résoudre des situations-problèmes.`,
          qcmQuestions: [
            {
              question: "Selon la didactique contemporaine, comment doit-on traiter l'erreur de l'apprenant ?",
              options: [
                "Comme une faute grave à sanctionner immédiatement",
                "Comme un levier et un indicateur du stade de développement cognitif de l'apprenant",
                "En l'ignorant totalement pour ne pas décourager l'élève",
                "En faisant copier la correction 50 fois",
              ],
              correctIndex: 1,
              explanation: "L'erreur est un témoin d'hypothèses d'apprentissage constructives et sert de point d'appui à la remédiation ciblée.",
            },
          ],
        },
        {
          id: "fr_exams",
          title: "نماذج اختبارات",
          iconName: "FileText",
          contentSummary: "Annales et sujets des épreuves de connaissances de langue française avec corrigés indicatifs et critères d'évaluation des jurys.",
          articleContent: `# Épreuves antérieures et sujets types - Français Primaire

Les épreuves écrites de français pour le concours d'inspection primaire ciblent :
1. Une analyse linguistique rigoureuse (Grammaire, syntaxe, lexique).
2. Une transposition didactique d'un document authentique ou d'une leçon du manuel scolaire.
3. L'analyse critique d'une production d'élève avec conception d'une grille de remédiation.`,
          qcmQuestions: [
            {
              question: "Dans une analyse didactique, quelle est la première étape de la remédiation pédagogique ?",
              options: [
                "La sanction disciplinaire",
                "Le diagnostic et l'identification précise de la source de l'erreur",
                "Le passage direct à la leçon suivante",
                "L'évaluation sommative finale",
              ],
              correctIndex: 1,
              explanation: "Tout processus de remédiation efficace commence obligatoirement par un diagnostic précis identifiant la nature et la cause de la difficulté.",
            },
          ],
        },
        {
          id: "fr_quiz",
          title: "اختبار تجريبي",
          iconName: "Laptop",
          contentSummary: "Test interactif QCM chronométré portant sur la grammaire, la conjugaison et la didactique du français avec feedback instantané.",
          qcmQuestions: [
            {
              question: "Identifiez la figure de style dans : 'Cette obscure clarté qui tombe des étoiles' :",
              options: ["Une métaphore", "Un oxymore", "Une anaphore", "Une hyperbole"],
              correctIndex: 1,
              explanation: "L'oxymore consiste à réunir deux termes de sens opposés dans un même syntagme ('obscure clarté').",
            },
            {
              question: "Laquelle des phrases suivantes contient une proposition subordonnée complétive ?",
              options: [
                "L'élève qui travaille réussit toujours.",
                "Je souhaite que tous les candidats réussissent leur concours.",
                "Dès que le jour se lève, les oiseaux chantent.",
                "La maison où j'ai grandi se trouve à Fès.",
              ],
              correctIndex: 1,
              explanation: "'que tous les candidats réussissent' est une subordonnée complétive COD du verbe 'souhaite'.",
            },
          ],
        },
      ],
    },

    // 3. الرياضيات (28%)
    {
      id: "subject_math",
      title: "الرياضيات",
      weightBadge: "وزن المكون: 28%",
      colorScheme: "cyan",
      iconName: "Calculator",
      actions: [
        {
          id: "math_knowledge",
          title: "معارف المادة",
          iconName: "BookOpen",
          contentSummary: "المعارف الرياضية الأكاديمية: الحساب والأنظمة العددية، الهندسة الإقليدية والتحويلات الهندسية، القياس والتناسبية، ومعالجة البيانات.",
          articleContent: `# المعارف الأكاديمية في الرياضيات - السلك الابتدائي

## المجالات الرياضية الأساسية:
1. **الأعداد والحساب:**
   - مجموعات الأعداد (N, Z, D, Q, R)، قابلية القسمة، القاسم المشترك الأكبر (PGCD) والمضاعف المشترك الأصغر (PPCM).
   - الأعداد الأولية وتفكيك الأعداد، العمليات الحسابية الأربع على الكسور والأعداد العشرية.

2. **الهندسة والقياس:**
   - التوازي والتعامد، خواص الأشكال الهندسية المستوية (المثلثات، الرباعيات الخاصة، الدائرة).
   - المجسمات والوجوهيات، حساب المحيطات والمساحات والحجوم والكتل والسعات.
   - التحويلات الهندسية: التماثل المحوري، الإزاحة، والتكبير والتصغير.

3. **التناسبية وتنظيم البيانات:**
   - معامل التناسب، النسبة المئوية، السرعة المتوسطة، الكتلة الحجمية، والسلالم والتصاميم.`,
          qcmQuestions: [
            {
              question: "ما هو القاسم المشترك الأكبر (PGCD) للعددين 84 و 36؟",
              options: ["6", "12", "18", "24"],
              correctIndex: 1,
              explanation: "تفكيك 84 = 2² × 3 × 7، وتفكيك 36 = 2² × 3²؛ إذن PGCD(84, 36) = 2² × 3 = 12.",
            },
            {
              question: "خزان مائي على شكل متوازي مستطيلات أبعاده: الطول 4m، العرض 2.5m، والارتفاع 1.2m. كم لتراً يسع هذا الخزان عند ملئه بالكامل؟",
              options: ["1200 لتر", "12000 لتر", "120000 لتر", "120 لتر"],
              correctIndex: 1,
              explanation: "الحجم = 4 × 2.5 × 1.2 = 12 m³ = 12000 dm³ = 12000 لتر.",
            },
          ],
        },
        {
          id: "math_didactics",
          title: "ديداكتيك المادة",
          iconName: "Presentation",
          contentSummary: "ديداكتيك الرياضيات: هندسة الوضعية المشكلة، النقل الديداكتيكي، مراحل الدرس الرياضي (البناء، الترييض، التقويم والدعم)، ومعالجة العوائق الإبستمولوجية.",
          articleContent: `# ديداكتيك الرياضيات بالسلك الابتدائي

## 1. مسار بناء المفهوم الرياضي (نظرية الوضعيات الديداكتيكية لبروسو):
- **وضعية الفعل (Situation d'action):** المتعلم في تفاعل مباشر مع المشكل لإنتاج نموذج ضمني.
- **وضعية الصياغة (Situation de formulation):** التعبير اللغوي والرمزي عن الإجراء والحل.
- **وضعية التصديق (Situation de validation):** البرهنة والدفاع عن صحة الحل ورفض الحلول الخاطئة.
- **وضعية المأسسة (Situation d'institutionnalisation):** تدخل الأستاذ لترسيم وتثبيت المفهوم الرياضي الاصطلاحي.

## 2. العوائق الديداكتيكية والإبستمولوجية:
- عائق الانتقال من الأعداد الصحيحة إلى الأعداد العشرية والكسرية (اعتقاد أن العدد الأطول هو الأكبر دائماً).
- عائق الضرب يزيد والقسمة تنقص.`,
          qcmQuestions: [
            {
              question: "ما هي المرحلة في نظرية 'بروسو' التي يتدخل فيها المدرس لإعطاء الصفة المعرفية الرسمية للمفهوم الذي توصل إليه المتعلمون؟",
              options: ["وضعية الفعل", "وضعية الصياغة", "وضعية التصديق", "وضعية المأسسة"],
              correctIndex: 3,
              explanation: "وضعية المأسسة (Institutionnalisation) هي التي يضفي فيها المدرس الطابع المعرفي الرسمي والاصطلاحي على ما تم بناؤه.",
            },
          ],
        },
        {
          id: "math_pedagogy",
          title: "علوم التربية",
          iconName: "Brain",
          contentSummary: "النمو المعرفي عند الطفل وتطور التفكير الرياضي المنطقي، استخدام الوسائل والمعينات الديداكتيكية المحسوسة ونمذجة سنغافورة (CPA).",
          articleContent: `# سيكولوجية التعلم الرياضي وطريقة المحسوس-شبه المحسوس-المجرد

## نموذج CPA (Concrete - Pictorial - Abstract):
1. **المرحلة المحسوسة (Concrete):** استعمال الخشيبات، المكعبات، أشرطة الكسور، والأشكال الهندسية اليدوية.
2. **المرحلة شبه المحسوسة / الصورية (Pictorial):** الرسم والتمثيل المبياني ونماذج الأشرطة (Bar Models).
3. **المرحلة المجردة (Abstract):** الترميز بالأرقام والعمليات الحسابية والمعادلات الرياضية.`,
          qcmQuestions: [
            {
              question: "ما هو الترتيب الصحيح لمراحل التعلم وفق مقاربة سنغافورة الرياضية (CPA)؟",
              options: [
                "المجرد -> شبه المحسوس -> المحسوس",
                "المحسوس (المناولاتي) -> شبه المحسوس (الصوري) -> المجرد (الرمزي)",
                "شبه المحسوس -> المجرد -> المحسوس",
                "المجرد مباشرة بدون حاجة للمحسوس",
              ],
              correctIndex: 1,
              explanation: "تعتمد المقاربة على التدرج الديداكتيكي من المناولة المحسوسة ثم التمثيل الصوري وصولاً للترميز الرياضي المجرد.",
            },
          ],
        },
        {
          id: "math_exams",
          title: "نماذج اختبارات",
          iconName: "FileText",
          contentSummary: "نماذج اختبارات المعارف في الرياضيات لمباريات التفتيش السابقة مع حلول تفصيلية ودليل تحليل الصعوبات الرياضية.",
          articleContent: `# نماذج امتحانات التفتيش - مكون الرياضيات

يتضمن اختبار الرياضيات لمباراة التفتيش عادة:
1. تمرينين في الحساب التوليفي ونظريات الأعداد والتناسبية.
2. مسألة هندسية مركبة تشمل البرهان والتحويلات الهندسية وحساب الحجوم أو المساحات المظللة.
3. دراسة ديداكتيكية لإنتاج متعلم يرتكب خطأ مفاهيمياً، مع تحديد مصدر العائق واقتراح وضعية معالجة فورية.`,
          qcmQuestions: [
            {
              question: "إذا تضاعف شعاع دائرة 3 مرات، فكم مرة تتضاعف مساحة القرص المقابل لها؟",
              options: ["3 مرات", "6 مرات", "9 مرات", "12 مرة"],
              correctIndex: 2,
              explanation: "مساحة القرص تتناسب مع مربع الشعاع: S = π × r²، إذا ضُرب r في 3، فإن المساحة تضرب في 3² = 9.",
            },
          ],
        },
        {
          id: "math_quiz",
          title: "اختبار تجريبي",
          iconName: "Laptop",
          contentSummary: "اختبار تجريبي تفاعلي في معارف وديداكتيك الرياضيات لاختبار سرعة الحساب ودقة التحليل المنهجي.",
          qcmQuestions: [
            {
              question: "إذا كانت سرعة سيارة 90 km/h، فما هي سرعتها المعبر عنها بـ m/s؟",
              options: ["15 m/s", "25 m/s", "30 m/s", "35 m/s"],
              correctIndex: 1,
              explanation: "للتحويل من km/h إلى m/s نقسم على 3.6: 90 ÷ 3.6 = 25 m/s.",
            },
            {
              question: "مستطيل محيطه 48 cm، وطوله يساوي ثلاثة أضعاف عرضه. ما هي مساحته؟",
              options: ["108 cm²", "144 cm²", "72 cm²", "216 cm²"],
              correctIndex: 0,
              explanation: "نصف المحيط = 24 cm = الطول + العرض = 3x + x = 4x => العرض x = 6 cm، الطول = 18 cm. المساحة = 18 × 6 = 108 cm².",
            },
          ],
        },
      ],
    },

    // 4. العلوم (النشاط العلمي) (12%)
    {
      id: "subject_science",
      title: "العلوم (النشاط العلمي)",
      weightBadge: "وزن المكون: 12%",
      colorScheme: "emerald",
      iconName: "FlaskConical",
      actions: [
        {
          id: "sci_knowledge",
          title: "معارف المادة",
          iconName: "BookOpen",
          contentSummary: "المعارف العلمية والأكاديمية: علوم الحياة والأرض، العلوم الفيزيائية والكيميائية، التوازن البيئي، الطاقة والكهرباء، وعلم الفلك.",
          articleContent: `# المعارف العلمية الأكاديمية لمكون النشاط العلمي

## المجالات المعرفية الرئيسية:
1. **علوم الحياة:**
   - التغذية والتنفس والدوران والتوالد عند الإنسان والحيوان.
   - السلاسل والشبكات الغذائية والتوازنات البيئية.
   - وظائف الأعضاء، الوراثة، والوقاية الصحية.

2. **العلوم الفيزيائية والكيميائية:**
   - حالات المادة وتحولاتها الفيزيائية وتغيراتها الكيميائية.
   - الدارات الكهربائية البسيطة وعناصرها وقوانين التيار.
   - القوى، الحركة، الضوء، والحرارة والطاقات المتجددة.

3. **علوم الفلك والأرض:**
   - مكونات كوكب الأرض ودورات الصخور والمياه.
   - النظام الشمسي وحركات الأرض والقمر وتوالي الفصول وأطوار القمر.`,
          qcmQuestions: [
            {
              question: "ما الغاز الذي تنتجه النباتات الخضراء أثناء عملية التركيب الضوئي في وجود الضوء؟",
              options: ["ثنائي أكسيد الكربون", "الأكسجين (O₂)", "النيتروجين", "الميثان"],
              correctIndex: 1,
              explanation: "تمتص النباتات ثنائي أكسيد الكربون والماء في وجود اليخضور والضوء وتنتج المادة العضوية وتحرر غاز الأكسجين.",
            },
            {
              question: "عند توصيل مصباحين كهربائيين على التوالي في دارة كهربائية مغلقة، ماذا يحدث عند فك أحد المصباحين؟",
              options: [
                "يبقى المصباح الآخر مضيئاً بنفس الشدة",
                "ينطفئ المصباح الآخر لفتح الدارة الكهربائية",
                "تزداد شدة إضاءة المصباح الآخر",
                "يحترق المصباح الآخر فوراً",
              ],
              correctIndex: 1,
              explanation: "في التركيب على التوالي، تشكل العناصر حلقة وحيدة، وفك أي عنصر يفتح الدارة وينقطع التيار عن سائر العناصر.",
            },
          ],
        },
        {
          id: "sci_didactics",
          title: "ديداكتيك المادة",
          iconName: "Presentation",
          contentSummary: "ديداكتيك العلوم ونهج التقصي العلمي (Démarche d'investigation): خطوات بناء المعرفة العلمية ودفتر التقصي والنمذجة والتجريب.",
          articleContent: `# ديداكتيك النشاط العلمي ونهج التقصي

## خطوات نهج التقصي العلمي المعتمد رسمياً:
1. **وضعية الانطلاق (Situation de départ):** وضعية محفزة تثير الحيرة والتساؤل لدى المتعلم.
2. **تملك الوضعية وصياغة سؤال التقصي:** صياغة سؤال علمي دقيق وقابل للبحث والتجريب.
3. **اقتراح الفرضيات (Hypothèses):** تقديم تفسيرات مؤقتة مبنية على تمثلات المتعلمين.
4. **فحص واختبار الفرضيات (Validation):**
   - عبر التجريب المباشر، أو الملاحظة، أو التوثيق، أو النمذجة والمحاكاة.
5. **الاستنتاج والتعميم (Conclusion & Institutionnalisation):** تدوين الخلاصة العلمية في دفتر التقصي.
6. **التقويم والاستثمار (Évaluation & Transfert):** نقل المكتسب لمعالجة وضعيات جديدة.`,
          qcmQuestions: [
            {
              question: "ما هي الخاصية الأساسية التي يجب أن تتوفر في 'الفرضية العلمية' في نهج التقصي؟",
              options: [
                "أن تكون صحيحة ومؤكدة مسبقاً بنسبة 100%",
                "أن تكون قابلة للاختبار والفحص والتكذيب أو التأكيد",
                "أن يمليها الأستاذ حرفياً على المتعلمين",
                "أن لا ترتبط بموضوع الدرس",
              ],
              correctIndex: 1,
              explanation: "الفرضية العلمية هي جواب مؤقت وتخمين ذكي مشروط بقابليته للاختبار والتحقق التجريبي أو التوثيقي.",
            },
          ],
        },
        {
          id: "sci_pedagogy",
          title: "علوم التربية",
          iconName: "Brain",
          contentSummary: "معالجة التمثلات القبلية الخاطئة (Conceptions initiales) في العلوم، التعلم بالتجريب وبيداغوجيا حل المشكلات.",
          articleContent: `# التمثلات القبلية وبناء المفهوم العلمي

- **التمثلات القبلية (Les représentations):** نماذج تفسيرية أولية يبنيها الطفل عفوياً لتفسير الظواهر الطبيعية المحيطة به، وغالباً ما تكون مخالفة للحقيقة العلمية.
- **إحداث الصراع المعرفي (Conflit cognitif):** وضع تمثلات المتعلم في مواجهة نتائج التجربة لإحداث خلخلة تؤدي إلى هدم التصور الخاطئ وبناء المفهوم العلمي السليم.`,
          qcmQuestions: [
            {
              question: "كيف يتعامل ديداكتيك العلوم مع التمثلات القبلية الخاطئة للمتعلمين؟",
              options: [
                "تجاهلها والبدء بالمعلومات الصحيحة مباشرة",
                "إبرازها واستثمارها عبر التجريب والملاحظة لإحداث صراع معرفي يؤدي لتصحيحها",
                "معاقبة التلميذ صاحب التمثيل الخاطئ",
                "تأجيل دراسة المفهوم للسلك الثانوي",
              ],
              correctIndex: 1,
              explanation: "التمثلات القبلية هي نقطة الانطلاق الأساسية في التعليم البنائي؛ حيث يتم استخراجها لمواجهتها بالحقائق التجريبية وتعديلها.",
            },
          ],
        },
        {
          id: "sci_exams",
          title: "نماذج اختبارات",
          iconName: "FileText",
          contentSummary: "نماذج اختبارات مباراة التفتيش في النشاط العلمي متضمنة تجارب علمية وتخطيط جذاذات وفق نهج التقصي.",
          articleContent: `# نماذج امتحانات التفتيش - مكون النشاط العلمي

تتطرق الاختبارات إلى:
1. أسئلة دقيقة في الفيزياء والكيمياء وعلوم الحياة والأرض بالسلك الابتدائي.
2. نقد بطاقة تقنية لتجربة علمية أو تحليل بروتوكول تجريبي غير منضبط لشروط السلامة أو الدقة العلمية.
3. تخطيط مقطع تعلمي متكامل وفق نهج التقصي لمفهوم علمي محدد (مثل الدارة الكهربائية أو دورة الماء أو التغذية).`,
          qcmQuestions: [
            {
              question: "ما نوع الصخور التي تتشكل من تبريد وتصلب الصهارة (Magma) في باطن الأرض أو على السطح؟",
              options: ["الصخور الرسوبية", "الصخور الصهارية (البركانية)", "الصخور المتحولة", "الصخور الجيرية"],
              correctIndex: 1,
              explanation: "الصخور الصهارية (Magmatiques) تتكون نتيجة تجمد وتبريد الصهارة الباطنية أو اللافا البركانية.",
            },
          ],
        },
        {
          id: "sci_quiz",
          title: "اختبار تجريبي",
          iconName: "Laptop",
          contentSummary: "اختبار تجريبي تفاعلي يركز على المفاهيم العلمية للنشاط العلمي وخطوات نهج التقصي في 10 دقائق.",
          qcmQuestions: [
            {
              question: "ما هو المصدر الرئيسي لمعظم الطاقة على سطح كوكب الأرض؟",
              options: ["الرياح", "الشمس", "الوقود الأحفوري", "حرارة باطن الأرض"],
              correctIndex: 1,
              explanation: "الشمس هي المصدر الأساسي والحراري والإشعاعي لمعظم أشكال الطاقة على كوكب الأرض.",
            },
            {
              question: "في السلسلة الغذائية: عشب -> أرنب -> ثعلب -> نسر، ما هو المستوى الغذائي للأرنب؟",
              options: ["منتج أولي", "مستهلك من الدرجة الأولى (عاشب)", "مستهلك من الدرجة الثانية (لاحم)", "محلل"],
              correctIndex: 1,
              explanation: "الأرنب يتغذى مباشرة على المنتج الأولي (العشب)، فهو مستهلك من الدرجة الأولى (Consommateur primaire).",
            },
          ],
        },
      ],
    },
  ],
  downloads: [
    {
      id: "pk_doc_1",
      title: "ملف المعارف الأكاديمية الشامل لمفتش التعليم الابتدائي 2024 (PDF)",
      size: "3.2 MB",
      year: "2024",
      url: "#",
      fileType: "pdf",
    },
    {
      id: "pk_doc_2",
      title: "ملخص القواعد والمفاهيم الرياضية واللغوية المحينة (PDF)",
      size: "1.9 MB",
      year: "2023",
      url: "#",
      fileType: "pdf",
    },
    {
      id: "pk_doc_3",
      title: "دليل منهاج التعليم الابتدائي النسخة المعتمدة والمحينة (PDF)",
      size: "4.8 MB",
      year: "وزاري",
      url: "#",
      fileType: "pdf",
    },
  ],
  images: [],
};
