import {
  SECONDARY_AND_OTHER_SUBJECTS,
  VERIFIED_COMPETITION_LINKS,
} from "./teachingCompetitionSecondaryData";

export interface CompetitionDownloadFile {
  id: string;
  title: string;
  size?: string;
  year?: string;
  fileType?: "PDF" | "Word" | "Drive" | string;
  url: string;
  isExternal?: boolean;
}

export interface CompetitionQCMQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CompetitionSubAction {
  id: string;
  title: string;
  subtitle: string;
  type: "knowledge" | "didactics" | "exams" | "mock" | "qcm" | "summaries" | "custom";
  iconName: string;
  pdfUrl?: string;
  externalUrl?: string;
  contentSummary?: string;
  articleContent?: string;
  author?: string;
  lastUpdated?: string;
  highlights?: string[];
  downloadFiles?: CompetitionDownloadFile[];
  qcmQuestions?: CompetitionQCMQuestion[];
}

export function getDefaultDownloadFiles(
  actionType: string,
  subjectTitle: string,
  actionTitle: string
): CompetitionDownloadFile[] {
  if (actionType === "exams") {
    return [
      {
        id: "f1",
        title: `نماذج الاختبارات الكتابية مع عناصر الإجابة الرسمية - ${subjectTitle}`,
        size: "2.4 MB",
        year: "2024/2025",
        fileType: "PDF",
        url: VERIFIED_COMPETITION_LINKS.profpressConcours,
        isExternal: true,
      },
      {
        id: "f2",
        title: "كتيب التصحيح الرسمي لامتحانات علوم التربية (2012 - 2024) جميع الأسلاك",
        size: "4.6 MB",
        year: "2024",
        fileType: "PDF",
        url: VERIFIED_COMPETITION_LINKS.profpressEduCorrect2012_2024,
        isExternal: true,
      },
      {
        id: "f3",
        title: `بطاقات توصيف الاختبارات الكتابية الرسمية دورة 2026 - ${subjectTitle}`,
        size: "1.8 MB",
        year: "2026",
        fileType: "PDF",
        url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
        isExternal: true,
      },
    ];
  }
  if (actionType === "summaries") {
    return [
      {
        id: "f1",
        title: `ملخصات مركزة وخطاطات ذهنية - ${subjectTitle}`,
        size: "2.1 MB",
        year: "2026",
        fileType: "PDF",
        url: VERIFIED_COMPETITION_LINKS.profpressEduSummariesPdf,
        isExternal: true,
      },
      {
        id: "f2",
        title: "أحسن تلخيص شامل قابل للتعديل (ملف Word .doc)",
        size: "1.1 MB",
        year: "Word",
        fileType: "Word",
        url: VERIFIED_COMPETITION_LINKS.profpressEduWordDoc,
        isExternal: true,
      },
      {
        id: "f3",
        title: "مصوغة البيداغوجيات الوظيفية المعتمدة بالمناهج المغربية",
        size: "2.4 MB",
        year: "محين",
        fileType: "PDF",
        url: VERIFIED_COMPETITION_LINKS.profpressActivePedagogies,
        isExternal: true,
      },
    ];
  }
  if (actionType === "didactics") {
    return [
      {
        id: "f1",
        title: `دليل الديداكتيك والتوصيفات الرسمية المعتمدة 2026 - ${subjectTitle}`,
        size: "2.4 MB",
        year: "2026",
        fileType: "PDF",
        url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
        isExternal: true,
      },
      {
        id: "f2",
        title: `تلخيص المدخل إلى علم التدريس وبناء الجذاذات - ${subjectTitle}`,
        size: "1.9 MB",
        year: "بيداغوجي",
        fileType: "PDF",
        url: VERIFIED_COMPETITION_LINKS.profpressIntroDidactics,
        isExternal: true,
      },
    ];
  }
  return [
    {
      id: "f1",
      title: `الملف التوجيهي والملخص الشامل 2026 - ${actionTitle}`,
      size: "2.2 MB",
      year: "2026",
      fileType: "PDF",
      url: VERIFIED_COMPETITION_LINKS.profpressEduGuideAllCycles,
      isExternal: true,
    },
    {
      id: "f2",
      title: "المختصر المفيد في علوم التربية والبيداغوجيا (مجلد Drive)",
      size: "5.4 MB",
      year: "محين",
      fileType: "Drive",
      url: VERIFIED_COMPETITION_LINKS.profpressEduFolder,
      isExternal: true,
    },
  ];
}

export interface CompetitionSubject {
  id: string;
  title: string;
  cycle: "primary" | "secondary" | "other";
  category?: string;
  iconName: string;
  colorScheme: "green" | "blue" | "purple" | "cyan" | "emerald" | "amber" | "rose" | "teal" | "orange";
  actions: CompetitionSubAction[];
}

export interface QuickResourceImage {
  id: string;
  url: string;
  caption?: string;
}

export interface QuickResourceLink {
  id: string;
  title: string;
  url: string;
  size?: string;
  year?: string;
  note?: string;
  fileType?: "PDF" | "Word" | "Drive" | string;
}

export interface QuickResourceCard {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  color: "teal" | "orange" | "blue" | "purple" | "indigo" | "emerald" | "rose";
  url: string;
  writtenContent?: string;
  images?: QuickResourceImage[];
  downloadLinks?: QuickResourceLink[];
  author?: string;
  lastUpdated?: string;
}

export interface TeachingCompetitionPageData {
  pageTitle: string;
  pageDate: string;
  trainingCourseText: string;
  trainingCourseUrl: string;
  quickResources: QuickResourceCard[];
  primaryNotice: string;
  secondaryNotice: string;
  subjects: CompetitionSubject[];
}

export const DEFAULT_TEACHING_COMPETITION_DATA: TeachingCompetitionPageData = {
  pageTitle: "الشامل لمباراة التعليم الابتدائي والثانوي والأطر المختصة",
  pageDate: "موسم 2026 / 2027 · محين",
  trainingCourseText: "بوابة التسجيل Wolouj · دورة 2026",
  trainingCourseUrl: VERIFIED_COMPETITION_LINKS.woloujPortal,
  quickResources: [
    {
      id: "specs",
      title: "توصيفات المباراة (2026)",
      subtitle: "المحاور الرسمية والأوزان النسبية (PDF)",
      iconName: "FileText",
      color: "teal",
      url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
      author: "المركز الوطني للتقويم والامتحانات والتوجيه",
      lastUpdated: "دورة 2026",
      writtenContent: `تعتبر **بطاقات التوصيف الرسمية** الصادرة عن المركز الوطني للتقويم والامتحانات المرجع الأساسي لتأطير وبناء مواضيع مباريات ولوج سلك تأهيل أطر التدريس والأطر المختصة بالمراكز الجهوية لمهن التربية والتكوين (CRMEF).

### أولاً: أهداف بطاقات التوصيف المرجعية 2026
1. تحديد المجالات والمحاور المعرفية والديداكتيكية المستهدفة بالاختبار الكتابي بدقة متناهية.
2. تحديد الأوزان النسبية والمعاملات المخصصة لكل مادة ومجال فرعي لتوجيه جهود المترشح.
3. إدراج المستجدات البيداغوجية المعتمدة: **خارطة الطريق 2022-2026**، **مؤسسات الريادة**، **التعليم الصريح**، و**مقاربة TaRL**.

### ثانياً: مكونات الاختبارات بالسلك الابتدائي (المزدوج والأمازيغية)
- **اختبار اللغة العربية وديداكتيكها** (المعامل 3)
- **اختبار اللغة الفرنسية وديداكتيكها** (المعامل 3)
- **اختبار الرياضيات وديداكتيكها** (المعامل 3)
- **اختبار العلوم / النشاط العلمي وديداكتيكه** (المعامل 2)
- **اختبار علوم التربية ومستجدات المنظومة** (المعامل 2)

### ثالثاً: مكونات الاختبارات بالسلك الثانوي والأطر المختصة
- **مادة التخصص الأكاديمي** (المعامل 3) + **ديداكتيك مادة التخصص** (المعامل 2) + **علوم التربية** (المعامل 1).
- بالنسبة لـ **الأطر المختصة**: المختصون التربويون (تحضير المختبرات، الحراسة التربوية والتوثيق)، المختصون الاجتماعيون، ومختصو الاقتصاد والإدارة.`,
      images: [
        {
          id: "img-specs-1",
          url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&auto=format&fit=crop&q=80",
          caption: "بطاقات توصيف الاختبارات الكتابية لمباريات التوظيف ومراكز التكوين 2026",
        },
      ],
      downloadLinks: [
        {
          id: "link-specs-1",
          title: "البلاغ الرسمي وبطاقات التوصيف الكتابي 2026 (بوابة وزارة التربية الوطنية)",
          url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
          size: "رسمي PDF",
          year: "2026",
          fileType: "PDF",
        },
        {
          id: "link-specs-2",
          title: "بوابة وزارة التربية الوطنية - فضاء الإعلانات والمذكرات",
          url: VERIFIED_COMPETITION_LINKS.menOfficial,
          size: "PDF",
          year: "2026",
          fileType: "PDF",
        },
        {
          id: "link-specs-3",
          title: "دليل علوم التربية والتوصيفات المرجعية لجميع الأسلاك (PDF)",
          url: VERIFIED_COMPETITION_LINKS.profpressEduGuideAllCycles,
          size: "2.6 MB",
          year: "محين",
          fileType: "PDF",
        },
      ],
    },
    {
      id: "news",
      title: "مستجدات المباراة",
      subtitle: "الإعلانات والجدولة الزمنية 2026",
      iconName: "Megaphone",
      color: "orange",
      url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
      author: "مديرية الموارد البشرية وتكوين الأطر",
      lastUpdated: "دورة 2026",
      writtenContent: `متابعة محينة لكافة المذكرات التنظيمية والبلاغات الصادرة عن وزارة التربية الوطنية والتعليم الأولي والرياضة بخصوص مباريات ولوج المراكز الجهوية لمهن التربية والتكوين (CRMEF):

### 1. مسطرة الترشيح الإلكتروني عبر بوابة Wolouj
- إيداع طلبات الترشيح يتم حصرياً عبر المنظومة الإلكترونية الرسمية: **wolouj.men.gov.ma**.
- انتقاء أولي يأخذ بعين الاعتبار ميزة الشهادة الجامعية وسنوات الحصول عليها، مع إعفاء طلبة مسالك **الإجازة في التربية** وفق المقتضيات التنظيمية.

### 2. جدولة المحطات الأساسية للمباراة
1. التسجيل الإلكتروني والمصادقة على استمارة الترشيح داخل الآجال المحددة.
2. إعلان لوائح المدعوين لاجتياز الاختبارات الكتابية ومراكز الإجراء.
3. إجراء الاختبارات الكتابية (أطر التدريس الابتدائي والثانوي، وأطر المختصين التربويين والاجتماعيين ومختصي الاقتصاد والإدارة).
4. إعلان نتائج الكتابي وإجراء الاختبارات العملية والشفوية أمام اللجان الجهوية.`,
      images: [
        {
          id: "img-news-1",
          url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&auto=format&fit=crop&q=80",
          caption: "المستجدات التنظيمية والجدولة الرسمية لمباريات التعليم 2026",
        },
      ],
      downloadLinks: [
        {
          id: "link-news-1",
          title: "الإعلان الوزاري لمباريات ولوج المراكز الجهوية CRMEF (publication 7405)",
          url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
          size: "1.9 MB",
          year: "2026",
          fileType: "PDF",
        },
        {
          id: "link-news-2",
          title: "رابط التسجيل المباشر في بوابة المباريات Wolouj",
          url: VERIFIED_COMPETITION_LINKS.woloujPortal,
          size: "بوابة رسمية",
          year: "2026",
          fileType: "PDF",
        },
      ],
    },
    {
      id: "registration",
      title: "وثائق التسجيل (Wolouj)",
      subtitle: "الشروط وملف الترشيح الإلكتروني",
      iconName: "Folder",
      color: "blue",
      url: VERIFIED_COMPETITION_LINKS.woloujPortal,
      author: "قسم تدبير المسار المهني - بروف بريس",
      lastUpdated: "دليل التسجيل 2026",
      writtenContent: `دليل عملي ومبسط لتجهيز ملف الترشيح الرقمي عبر بوابة **wolouj.men.gov.ma** دون أخطاء تقنية أو إدارية:

### أولاً: الشروط النظامية للترشح
- التمتع بالجنسية المغربية والحقوق الوطنية والمدنية والقدرة البدنية.
- عدم تجاوز السن القانوني المحدد في المذكرة التنظيمية عند تاريخ المباراة.
- التوفر على شهادة الإجازة في التربية، أو الإجازة في الدراسات الأساسية أو المهنية أو ما يعادلها، دون أن تكون مرتبطاً بالتزام مع جهة أخرى.

### ثانياً: الوثائق الممسوحة ضوئياً (PDF واحد واضح)
1. **وصل الترشيح الإلكتروني** المستخرج من بوابة \`wolouj.men.gov.ma\` بعد المصادقة.
2. **نسخة من البطاقة الوطنية للتعريف الإلكترونية (CNIE)** من الواجهتين.
3. **نسخة من شهادة الإجازة** أو شهادة النجاح + المعادلة عند الاقتضاء.
4. **كشوف النقط** المحصل عليها خلال فصول الإجازة (S1 إلى S6).
5. **الالتزام المصادق عليه** في حالة إعفائك أو التزامات التتبع.`,
      images: [
        {
          id: "img-reg-1",
          url: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=900&auto=format&fit=crop&q=80",
          caption: "تجهيز ملف الترشيح الرقمي وبوابة Wolouj",
        },
      ],
      downloadLinks: [
        {
          id: "link-reg-1",
          title: "بوابة التسجيل الإلكترونية الرسمية Wolouj",
          url: VERIFIED_COMPETITION_LINKS.woloujPortal,
          size: "رابط مباشر",
          year: "2026",
          fileType: "PDF",
        },
        {
          id: "link-reg-2",
          title: "دليل خطوات التسجيل والمصادقة على البوابة - بروف بريس",
          url: "https://profpressma.blogspot.com/2026/05/wolouj.html",
          size: "شرح مصور",
          year: "2026",
          fileType: "PDF",
        },
      ],
    },
    {
      id: "interview",
      title: "المقابلة الشفوية",
      subtitle: "محاكاة الدرس وشبكات التنقيط",
      iconName: "MessageSquare",
      color: "purple",
      url: VERIFIED_COMPETITION_LINKS.profpressConcours,
      author: "لجنة التكوين والتأهيل المهني - بروف بريس",
      lastUpdated: "دليل المقابلة 2026",
      writtenContent: `يعد الاختبار الشفوي المحطة الحاسمة بعد النجاح في الكتابي، ويقيس الكفايات التواصلية والبيداغوجية والشخصية لمزاولة مهنة التدريس:

### أولاً: مراحل الاختبار الشفوي
1. **سحب الموضوع:** تحديد مستوى ومادة تعليمية أو وضعية تربوية عن طريق القرعة.
2. **فترة التحضير (60 دقيقة):** إعداد جذاذة تربوية منظمة (الأهداف، الوسائل، الوضعيات الديداكتيكية، التقويم والدعم).
3. **العرض والتقديم (15-20 دقيقة):** محاكاة تقديم مقطع دراسي على السبورة بلغة سليمة وخط واضح.
4. **المناقشة (20 دقيقة):** أسئلة اللجنة حول اختياراتك الديداكتيكية، علوم التربية، التشريع المدرسي، وأخلاقيات المهنة.

### ثانياً: معايير التفوق وشبكة التنقيط
- الحضور الشخصي، الهندام اللائق، الثقة بالنفس، والاتزان الانفعالي.
- سلامة اللغة العربية والفرنسية حسب التخصص والتواصل البصري مع اللجنة.
- التمكن من مستجدات **مؤسسات الريادة** و**التعليم الصريح** و**قواعد تدبير الفصل**.`,
      images: [
        {
          id: "img-oral-1",
          url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=900&auto=format&fit=crop&q=80",
          caption: "تحضير الجذاذة ومحاكاة المقطع التدريسي أمام اللجنة",
        },
      ],
      downloadLinks: [
        {
          id: "link-oral-1",
          title: "بنك الأسئلة الشائعة في المقابلات الشفوية وملخص الدليل البيداغوجي (PDF)",
          url: VERIFIED_COMPETITION_LINKS.profpressPedagogicalGuide,
          size: "2.8 MB",
          year: "2026",
          fileType: "PDF",
        },
        {
          id: "link-oral-2",
          title: "تصميم ونماذج الملف التراكمي للأستاذ المتدرب (Word قابل للتعديل)",
          url: VERIFIED_COMPETITION_LINKS.profpressPortfolioWord,
          size: "1.4 MB",
          year: "Word",
          fileType: "Word",
        },
      ],
    },
    {
      id: "edu_sciences_pack",
      title: "حقيبة علوم التربية (Word & PDF)",
      subtitle: "ملخصات مركزة، تشريع، وبيداغوجيات",
      iconName: "Brain",
      color: "emerald",
      url: VERIFIED_COMPETITION_LINKS.profpressEduFolder,
      author: "مكتبة بروف بريس التربوية",
      lastUpdated: "محين 2026",
      writtenContent: `تجميعة موثقة من أهم المراجع والملخصات المتخصصة في **علوم التربية والتشريع المدرسي والبيداغوجيات الحديثة** بصيغتي **PDF و Word** لتسهيل القراءة والطباعة والتعديل:

### أبرز محتويات الحقيبة:
- **أحسن تلخيص لمادة علوم التربية (ملف Word .doc):** شامل للنظريات البيداغوجية والمقاربات والتقويم.
- **عرض حول علوم التربية (2025/2026):** يدمج مستجدات خارطة الطريق وممارسات التعليم الصريح.
- **ملخص القانون الإطار 51.17 PDF:** أهم المواد والمضامين القانونية المطلوبة في الاختبارات.
- **مصوغة البيداغوجيات الوظيفية:** بيداغوجيا الخطأ، اللعب، المشروع، الفارقية، التعاقد، وحل المشكلات.
- **المختصر المفيد في علوم التربية (مجلد Google Drive كامل):** ملفات ومطبوعات جاهزة للتحميل المباشر.`,
      downloadLinks: [
        {
          id: "link-edu-1",
          title: "أحسن تلخيص لمادة علوم التربية قابل للتعديل (ملف Word .doc)",
          url: VERIFIED_COMPETITION_LINKS.profpressEduWordDoc,
          size: "1.1 MB",
          year: "Word",
          fileType: "Word",
        },
        {
          id: "link-edu-2",
          title: "المختصر المفيد في علوم التربية والبيداغوجيا (مجلد Google Drive)",
          url: VERIFIED_COMPETITION_LINKS.profpressEduFolder,
          size: "حقيبة كاملة",
          year: "2025/2026",
          fileType: "Drive",
        },
        {
          id: "link-edu-3",
          title: "عرض شامل حول علوم التربية ومستجدات المنظومة (PDF)",
          url: VERIFIED_COMPETITION_LINKS.profpressEduPresentation2025,
          size: "2.3 MB",
          year: "2025/2026",
          fileType: "PDF",
        },
        {
          id: "link-edu-4",
          title: "ملخص القانون الإطار رقم 51.17 لمنظومة التربية والتكوين (PDF)",
          url: VERIFIED_COMPETITION_LINKS.profpressLoiCadrePdf,
          size: "1.5 MB",
          year: "قانون إطار",
          fileType: "PDF",
        },
        {
          id: "link-edu-5",
          title: "ملخصات جد مركزة لعلوم التربية والبيداغوجيات الوظيفية (PDF)",
          url: VERIFIED_COMPETITION_LINKS.profpressEduSummariesPdf,
          size: "2.1 MB",
          year: "PDF",
          fileType: "PDF",
        },
      ],
    },
    {
      id: "exams_bank",
      title: "بنك الامتحانات والتصحيح (2012-2026)",
      subtitle: "مواضيع رسمية وعناصر الإجابة PDF",
      iconName: "CheckSquare",
      color: "indigo",
      url: VERIFIED_COMPETITION_LINKS.profpressEduCorrect2012_2024,
      author: "أرشيف الامتحانات - بروف بريس",
      lastUpdated: "دورة 2026",
      writtenContent: `أكبر قاعدة مرجعية لمواضيع **الاختبارات الكتابية لمباريات التعليم والامتحانات المهنية** مرفقة بـ **عناصر الإجابة الرسمية وشبكات التنقيط**:

### ما الذي ستجده في هذا البنك؟
1. **كتيب التصحيح الرسمي لامتحانات علوم التربية (منذ 2012 إلى 2024)** لجميع الأسلاك والتخصصات.
2. **حقيبة العروض التكوينية ومواضيع الاستعداد** على Google Drive (محدثة).
3. **نماذج بحوث التخرج (CRMEF) بصيغ Word و PDF** للاستئناس بعد النجاح في المباراة.
4. إمكانية تحميل أي موضوع من داخل الصفحة بصيغة **Word (.doc)** أو طباعته كـ **PDF** فوراً.`,
      downloadLinks: [
        {
          id: "link-bank-1",
          title: "كتيب التصحيح الرسمي لامتحانات علوم التربية (2012-2024) جميع الأسلاك",
          url: VERIFIED_COMPETITION_LINKS.profpressEduCorrect2012_2024,
          size: "4.6 MB",
          year: "2012-2024",
          fileType: "PDF",
        },
        {
          id: "link-bank-2",
          title: "حقيبة عروض ومواضيع التحضير لمباراة التعليم والامتحانات (Drive)",
          url: VERIFIED_COMPETITION_LINKS.profpressTrainingsFolder,
          size: "مجلد كامل",
          year: "محين",
          fileType: "Drive",
        },
        {
          id: "link-bank-3",
          title: "ملخصات أحد الأساتذة حول مستجدات التربية والتعليم (PDF)",
          url: "https://drive.google.com/file/d/1UceI78yQiKtpK2ZQXxUFOwyha4ZaCnQW/view",
          size: "2.4 MB",
          year: "PDF",
          fileType: "PDF",
        },
        {
          id: "link-bank-4",
          title: "السيناريو الديداكتيكي لخطة الدعم التربوي (PDF 2025/2026)",
          url: "https://drive.google.com/file/d/1M858gwNMvgYjGHKF16110OqZJTxZUdOf/view",
          size: "1.7 MB",
          year: "2025/2026",
          fileType: "PDF",
        },
      ],
    },
  ],
  primaryNotice:
    "يجتاز المترشحون في السلك الابتدائي اختبارات في: مواد التخصص وديداكتيكها (العربية، الفرنسية، الرياضيات، النشاط العلمي أو الأمازيغية)، وعلوم التربية وفق توصيفات دورة 2026.",
  secondaryNotice:
    "ملاحظة هامة: يجتاز أساتذة التعليم الثانوي (إعدادي وتأهيلي) والأطر المختصة اختبارات في (مادة التخصص، ديداكتيك مادة التخصص، وعلوم التربية). اختر تخصصك من القائمة أدناه للوصول إلى المقالات وملفات Word وPDF واختبارات QCM.",
  subjects: [
    // ==========================================
    // 1. PRIMARY SUBJECTS (التعليم الابتدائي)
    // ==========================================
    {
      id: "primary_sciences_education",
      title: "مادة علوم التربية",
      cycle: "primary",
      iconName: "Brain",
      colorScheme: "green",
      actions: [
        {
          id: "pse_know",
          title: "معارف أساسية",
          subtitle: "نظريات التعلم، الريادة وخارطة الطريق 2026",
          type: "knowledge",
          iconName: "BookOpen",
          author: "فريق علوم التربية - بروف بريس",
          lastUpdated: "دورة 2026",
          contentSummary:
            "تلخيص شامل للنظريات السلوكية، البنائية، السوسيوبنائية، الجشطالتية، المعرفية والذكاءات المتعددة، مع محطات إصلاح منظومة التربية والتكوين بالمغرب (القانون الإطار 51.17 وخارطة الطريق 2022-2026 ومدارس الريادة).",
          articleContent: `## الدليل المعرفي الشامل لمادة علوم التربية — التعليم الابتدائي (2026)

### أولاً: نظريات التعلم المرجعية
1. **النظرية السلوكية (واطسون، سكينر، ثورندايك):** التعلم يحدث عبر المثير والاستجابة والتعزيز وتجزئة الأهداف إلى خطوات سلوكية قابلة للملاحظة.
2. **النظرية الجشطالتية (فرتيمر، كوهلر، كوفكا):** التعلم يتم بالاستبصار وإدراك البنية الكلية للموقف التعليمي قبل الانتقال إلى الأجزاء.
3. **النظرية البنائية (جان بياجه):** المتعلم يبني معارفه ذاتياً عبر آليتي **الاستيعاب والملاءمة** لتحقيق التوازن المعرفي، مع مراعاة مراحل النمو الذهني (الحس-حركي، ما قبل العمليات، العمليات المادية، العمليات المجردة).
4. **النظرية السوسيوبنائية (فيغوتسكي):** التعلم يسبق النمو ويتحقق عبر التفاعل الاجتماعي والوساطة داخل **منطقة النمو القريب (ZPD)**.
5. **النظرية المعرفية والذكاءات المتعددة (غاردنر):** الاهتمام بمعالجة المعلومات والذاكرة والاستراتيجيات الميتامعرفية وتنويع الطرائق حسب ذكاءات المتعلمين.

### ثانياً: المستجدات التربوية (دورة 2026)
- **خارطة الطريق 2022-2026:** تركز على ثلاثيات: تلميذ متحكم في التعلمات الأساس، أستاذ متمكن، ومؤسسة حديثة (مؤسسات الريادة).
- **مقاربة TaRL والتعليم الصريح:** معالجة التعثرات في بداية السنة عبر مجموعات الحاجات ثم التدريس المنظم بالنمذجة والممارسة الموجهة والمستقلة.`,
          downloadFiles: [
            {
              id: "pse_know_f1",
              title: "عرض شامل ومحين حول علوم التربية (PDF 2025/2026)",
              size: "2.3 MB",
              year: "2026",
              fileType: "PDF",
              url: VERIFIED_COMPETITION_LINKS.profpressEduPresentation2025,
              isExternal: true,
            },
            {
              id: "pse_know_f2",
              title: "أحسن تلخيص لمادة علوم التربية (ملف Word قابل للتعديل)",
              size: "1.1 MB",
              year: "Word",
              fileType: "Word",
              url: VERIFIED_COMPETITION_LINKS.profpressEduWordDoc,
              isExternal: true,
            },
            {
              id: "pse_know_f3",
              title: "ملخص القانون الإطار رقم 51.17 (PDF)",
              size: "1.5 MB",
              year: "مرجعي",
              fileType: "PDF",
              url: VERIFIED_COMPETITION_LINKS.profpressLoiCadrePdf,
              isExternal: true,
            },
          ],
        },
        {
          id: "pse_sum",
          title: "ملخصات مركزة",
          subtitle: "خرائط ذهنية وخطاطات المراجعة",
          type: "summaries",
          iconName: "FileText",
          author: "فريق علوم التربية - بروف بريس",
          lastUpdated: "دورة 2026",
          contentSummary:
            "خرائط ذهنية تجمع المفاهيم الأساسية: المثلث الديداكتيكي، العقد الديداكتيكي، النقل الديداكتيكي، والعوائق البيداغوجية، مع ملخص بيداغوجيات الخطأ، المشروع، الفارقية، اللعب، وحل المشكلات.",
          articleContent: `## المفاهيم المهيكلة والبيداغوجيات الحديثة في خطاطات مركزة

### 1. أقطاب المثلث الديداكتيكي وتفاعلاته
- **القطب الإبستمولوجي (المعرفة <-> المدرس):** يحكمه **النقل الديداكتيكي** (تحويل المعرفة العالمة إلى معرفة مدرسية قابلة للتدريس).
- **القطب السيكولوجي (المعرفة <-> المتعلم):** تحكمه **التمثلات والعوائق الإبستمولوجية**.
- **القطب البيداغوجي (المدرس <-> المتعلم):** يحكمه **العقد الديداكتيكي** (مجموع الالتزامات الصريحة والضمنية).

### 2. البيداغوجيات السبع الأكثر وروداً في الامتحان
- **بيداغوجيا حل المشكلات:** مواجهة المتعلم لوضعية مشكلة ذات دلالة تستدعي توظيف موارده.
- **بيداغوجيا الخطأ:** الخطأ حق وبوابة للفهم وتشخيص التمثلات.
- **البيداغوجيا الفارقية:** تنويع المحتويات والطرائق والوسائل حسب وتائر التعلم.
- **بيداغوجيا اللعب والمشروع والتعاقد والإدماج.**`,
          downloadFiles: [
            {
              id: "pse_sum_f1",
              title: "ملخصات جد مركزة لعلوم التربية والبيداغوجيات (PDF)",
              size: "2.1 MB",
              year: "2026",
              fileType: "PDF",
              url: VERIFIED_COMPETITION_LINKS.profpressEduSummariesPdf,
              isExternal: true,
            },
            {
              id: "pse_sum_f2",
              title: "مصوغة تكوينية للبيداغوجيات الوظيفية المعتمدة بالمغرب (PDF)",
              size: "2.5 MB",
              year: "محين",
              fileType: "PDF",
              url: VERIFIED_COMPETITION_LINKS.profpressActivePedagogies,
              isExternal: true,
            },
            {
              id: "pse_sum_f3",
              title: "حقيبة المختصر المفيد في علوم التربية (Google Drive)",
              size: "مجلد كامل",
              year: "2025/2026",
              fileType: "Drive",
              url: VERIFIED_COMPETITION_LINKS.profpressEduFolder,
              isExternal: true,
            },
          ],
        },
        {
          id: "pse_exams",
          title: "نماذج اختبارات",
          subtitle: "امتحانات السنوات السابقة مع التصحيح الرسمي",
          type: "exams",
          iconName: "FileText",
          author: "أرشيف الامتحانات - بروف بريس",
          lastUpdated: "2012 - 2026",
          contentSummary:
            "مواضيع اختبارات علوم التربية مع عناصر الإجابة الرسمية للسنوات: من 2012 إلى 2024 ودورات 2025/2026.",
          articleContent: `## بنك امتحانات علوم التربية وعناصر الإجابة الرسمية

تتسم أسئلة علوم التربية بالجمع بين **الاختيار من متعدد (QCM)** لقياس الضبط المفاهيمي، و**أسئلة التحليل التربوي المفتوحة** التي تقترح حالة صفية (تأخر دراسي، شغب، صعوبة قرائية، إدماج في وضعية مركبة) وتطلب من المترشح اقتراح خطة تدخل بيداغوجية.`,
          downloadFiles: [
            {
              id: "pse_ex_f1",
              title: "كتيب التصحيح الرسمي لامتحانات علوم التربية (2012 - 2024)",
              size: "4.6 MB",
              year: "2012-2024",
              fileType: "PDF",
              url: VERIFIED_COMPETITION_LINKS.profpressEduCorrect2012_2024,
              isExternal: true,
            },
            {
              id: "pse_ex_f2",
              title: "دليل علوم التربية الخاص بهيئات التدريس (PDF)",
              size: "3.1 MB",
              year: "PDF",
              fileType: "PDF",
              url: VERIFIED_COMPETITION_LINKS.profpressEduGuideAllCycles,
              isExternal: true,
            },
          ],
        },
        {
          id: "pse_mock",
          title: "اختبار تجريبي",
          subtitle: "محاكاة تفاعلية ووضعية تربوية",
          type: "mock",
          iconName: "Laptop",
          author: "لجنة التكوين - بروف بريس",
          lastUpdated: "دورة 2026",
          contentSummary:
            "اختبار تجريبي تفاعلي لمحاكاة أجواء المباراة الرسمية مع وضعية حول معالجة التعثرات في إطار مقاربة TaRL.",
          articleContent: `## اختبار تجريبي محاكي — علوم التربية (دورة 2026)

### الوضعية التربوية المقترحة:
خلال الأسبوع الأول من الموسم الدراسي بمؤسسة رائدة، لاحظ أستاذ السنة الثالثة ابتدائي تبايناً كبيراً بين مستوى التلاميذ في الطلاقة القرائية والعمليات الحسابية الأربع.

**المطلوب:**
1. حدد نوع التقويم الذي اعتمد عليه الأستاذ في بداية السنة وأهميته.
2. اشرح كيف يمكن توظيف مقاربة **TaRL** ومبادئ **البيداغوجيا الفارقية** لتكوين مجموعات مرنة.
3. ما الفرق بين **الدعم الوقائي** و**الدعم العلاجي** و**الدعم المؤسساتي**؟`,
          downloadFiles: [
            {
              id: "pse_mock_f1",
              title: "السيناريو الديداكتيكي لخطة الدعم التربوي (PDF)",
              size: "1.7 MB",
              year: "2025/2026",
              fileType: "PDF",
              url: "https://drive.google.com/file/d/1M858gwNMvgYjGHKF16110OqZJTxZUdOf/view",
              isExternal: true,
            },
          ],
        },
        {
          id: "pse_qcm",
          title: "قيم مستواك (QCM)",
          subtitle: "أسئلة متعددة الاختيارات (موسعة)",
          type: "qcm",
          iconName: "CheckSquare",
          qcmQuestions: [
            {
              question: "من هو الرائد المؤسس للنظرية البنائية في التعلم؟",
              options: ["جون واطسون", "جان بياجه", "ليف فيغوتسكي", "بوروس سكينر"],
              correctIndex: 1,
              explanation: "يعتبر جان بياجه (Jean Piaget) مؤسس النظرية البنائية التي تركز على الاستيعاب والملاءمة والتوازن المعرفي.",
            },
            {
              question: "ما المقصود بـ 'منطقة النمو القريب' (ZPD) لدى فيغوتسكي؟",
              options: [
                "المرحلة العمرية التي يتعلم فيها الطفل القراءة",
                "المسافة بين ما ينجزه المتعلم بمفرده وما ينجزه بتوجيه ومساعدة من راشد أو قرين",
                "المحيط البيئي والمدرسي المباشر للطفل",
                "فترة اكتساب المهارات الحركية الدقيقة",
              ],
              correctIndex: 1,
              explanation: "منطقة النمو القريب (Zone of Proximal Development) هي الفارق بين مستوى النمو الحقيقي والنمو المحتمل تحت إشراف أو تعاون.",
            },
            {
              question: "ما هو المحور الأساسي لخارطة الطريق 2022-2026؟",
              options: [
                "بناء المدارس فقط",
                "ثلاثة أقطاب: التلميذ، الأستاذ، والمؤسسة التعليمية",
                "تقليص ساعات التدريس",
                "إلغاء الامتحانات الإشهادية",
              ],
              correctIndex: 1,
              explanation: "ترتكز خارطة الطريق على ثلاثة محاور رئيسية: تلميذ متفتح ومتحكم في التعلمات الأساس، أستاذ متمكن ومواكب، ومؤسسة حديثة مفعمة بالحياة.",
            },
            {
              question: "النقل الديداكتيكي (Transposition didactique) يعني:",
              options: [
                "نقل التلميذ من مؤسسة إلى أخرى",
                "تحويل المعرفة العالمة إلى معرفة قابلة للتدريس",
                "ترجمة الكتب من لغة لأخرى",
                "نقل الحصص من الصباح إلى المساء",
              ],
              correctIndex: 1,
              explanation: "النقل الديداكتيكي هو مسار تحويل المعرفة الأكاديمية الصرفة (Savoir savant) إلى معرفة تدريسية مدرسية ملائمة لمستوى المتعلمين.",
            },
            {
              question: "تقوم مقاربة التدريس الصريح (Enseignement explicite) في مؤسسات الريادة على المراحل التالية:",
              options: [
                "الامتحان ثم العقاب ثم الحفظ",
                "التهيئة والنمذجة (أنا أعمل)، الممارسة الموجهة (نحن نعمل)، والممارسة المستقلة (أنت تعمل)",
                "القراءة الصامتة طيلة الحصة",
                "التركيز على الواجبات المنزلية فقط",
              ],
              correctIndex: 1,
              explanation: "التعليم الصريح ينبني على الوضوح البيداغوجي عبر النمذجة الصريحة، الممارسة الموجهة مع التحقق من الفهم، ثم الممارسة المستقلة.",
            },
            {
              question: "الوثيقة التشريعية المرجعية التي أصدرت القانون الإطار رقم 51.17 سنة 2019 تستمد توجهاتها من:",
              options: [
                "الرؤية الاستراتيجية لإصلاح منظومة التربية والتكوين 2015-2030",
                "البرنامج الاستعجالي فقط",
                "قانون المالية السنوي",
                "ميثاق الشغل",
              ],
              correctIndex: 0,
              explanation: "جاء القانون الإطار 51.17 لترسيخ وتنزيل اختيارات الرؤية الاستراتيجية 2015-2030 وإضفاء الطابع الإلزامي والاستمراري على الإصلاح.",
            },
          ],
        },
      ],
    },
    {
      id: "primary_arabic",
      title: "مادة اللغة العربية",
      cycle: "primary",
      iconName: "BookOpen",
      colorScheme: "blue",
      actions: [
        {
          id: "pa_know",
          title: "معارف المادة",
          subtitle: "قواعد، صرف وتحويل، إملاء، أنماط النصوص",
          type: "knowledge",
          iconName: "CheckCircle2",
          author: "فريق اللغة العربية - بروف بريس",
          lastUpdated: "دورة 2026",
          contentSummary:
            "مراجعة شاملة في النحو والصرف: المنصوبات (المفاعيل، الحال، التمييز، المستثنى)، التوابع، النواسخ، الميزان الصرفي، قواعد الإملاء (الهمزة، التاء المربوطة والمبسوطة، الألف اللينة)، وتحليل أنماط النصوص.",
          articleContent: `## الدليل المعرفي لمادة اللغة العربية — الابتدائي (دورة 2026)

### أولاً: التراكيب والنحو الوظيفي
- **الجملة الفعلية والاسمية:** النواسخ الفعلية (كان وأخواتها) والحرفية (إن وأخواتها)، الفاعل ونائب الفاعل.
- **المنصوبات:** المفعول به، المفعول المطلق، المفعول لأجله، المفعول فيه، المفعول معه، الحال، التمييز، والمنادى والمستثنى.
- **المجرورات والتوابع:** النعت (الحقيقي والسببي)، التوكيد (اللفظي والمعنوي)، البدل، والعطف.
- **إعراب الفعل المضارع:** نواصب المضارع وجوازمه (الأفعال الخمسة والمعتل الآخر).

### ثانياً: الصرف والتحويل والإملاء
- **الأفعال:** المجرد والمزيد، الصحيح والمعتل (المثال، الأجوف، الناقص، اللفيف)، المبني للمعلوم والمبني للمجهول.
- **الأسماء والمشتقات:** المقصور والمنقوص والممدود، اسم الفاعل واسم المفعول، اسما الزمان والمكان، اسم الآلة، واسم التفضيل.
- **الإملاء:** الهمزة المتوسطة والمتطرفة، همزتا الوصل والقطع، الألف اللينة في الأفعال والأسماء، وتاء التأنيث.

### ثالثاً: أنماط النصوص ومؤشراتها
- السردي، الوصفي، الإخباري/التفسيري، الحجاجي، والتوجيهي (الإيعازي).`,
          downloadFiles: [
            {
              id: "pa_know_f1",
              title: "ملف أنماط النصوص ومؤشراتها (PDF جاهز للطباعة)",
              size: "1.2 MB",
              year: "محين",
              fileType: "PDF",
              url: VERIFIED_COMPETITION_LINKS.profpressArabicTextTypes,
              isExternal: true,
            },
            {
              id: "pa_know_f2",
              title: "بطاقة توصيف اللغة العربية بالتعليم الابتدائي 2026 (PDF)",
              size: "1.6 MB",
              year: "2026",
              fileType: "PDF",
              url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
              isExternal: true,
            },
          ],
        },
        {
          id: "pa_did",
          title: "ديداكتيك المادة",
          subtitle: "القراءة المقطعية، الاستماع، التعليم الصريح",
          type: "didactics",
          iconName: "School",
          author: "فريق الديداكتيك - بروف بريس",
          lastUpdated: "دورة 2026",
          contentSummary:
            "منهجية تدريس مكونات اللغة العربية بالتعليم الابتدائي: القراءة المقطعية، الاستماع والتحدث، الظواهر اللغوية (ضمنية 1-3 وصريحة 4-6)، الكتابة والإنتاج الكتابي، ومقاربات التعليم الصريح وTaRL.",
          articleContent: `## ديداكتيك اللغة العربية بالتعليم الابتدائي (المنهاج المنقح والريادة)

### 1. مكونات القراءة المقطعية (المستويات 1-3)
تقوم القراءة المبكرة على خمسة مكونات مترابطة:
1. **الوعي الصوتي:** التفييء، الرصد الصوتي، العزل، التعويض، الدمج، والحذف المقطعي.
2. **المبدأ الألفبائي (التطابق الصوتي الخطي):** ربط الحرف بصوته ورسمه مع الحركات والمدود والتنوين.
3. **الطلاقة القرائية:** الدقة والسرعة والتعبير الصوتي المناسب.
4. **المفردات:** استراتيجيات شبكة المفردات، خريطة الكلمة، وعائلة الكلمة.
5. **الفهم القرائي:** استراتيجيات ما قبل القراءة (التوقع)، أثناء القراءة (فحص التوقعات)، وما بعد القراءة (الاستنتاج والتلخيص).

### 2. الظواهر اللغوية والتواصل الكتابي (المستويات 4-6)
- تدرس الظواهر التركيبية والصرفية والإملائية بطريقة **ضمنية** في المستويات 1-3، وبطريقة **صريحة** في المستويات 4-6 عبر الاستكشاف وبناء القاعدة والتطبيق والتقويم.
- إدماج **الأنشطة الاعتيادية للقراءة** و**التعليم الصريح** لتعزيز الطلاقة والفهم الصريح.`,
          downloadFiles: [
            {
              id: "pa_did_f1",
              title: "دليل الأنشطة الاعتيادية للقراءة والرياضيات (PDF)",
              size: "2.1 MB",
              year: "محين 2026",
              fileType: "PDF",
              url: VERIFIED_COMPETITION_LINKS.profpressRegularActivities,
              isExternal: true,
            },
            {
              id: "pa_did_f2",
              title: "المختصر المفيد والدليل البيداغوجي للمنهاج الابتدائي (PDF)",
              size: "2.8 MB",
              year: "PDF",
              fileType: "PDF",
              url: VERIFIED_COMPETITION_LINKS.profpressPedagogicalGuide,
              isExternal: true,
            },
          ],
        },
        {
          id: "pa_exams",
          title: "نماذج اختبارات",
          subtitle: "امتحانات السنوات السابقة مع التصحيح",
          type: "exams",
          iconName: "FileText",
          author: "أرشيف الامتحانات - بروف بريس",
          lastUpdated: "2018 - 2026",
          contentSummary: "امتحانات مادة التخصص وديداكتيك اللغة العربية للتعليم الابتدائي للدورات السابقة مع التصحيح.",
          articleContent: `## بنك امتحانات اللغة العربية وديداكتيكها — الابتدائي

يحتوي الامتحان غالباً على نص قرائي للشكل والإعراب والاستخراج الصرفي والإملائي، متبوعاً بوضعية ديداكتيكية تطلب إعداد مقطع تعلمي في الوعي الصوتي أو القراءة أو الظاهرة اللغوية أو التعبير الكتابي.`,
          downloadFiles: [
            {
              id: "pa_ex_f1",
              title: "نماذج اختبارات اللغة العربية والديداكتيك ابتدائي (PDF)",
              size: "4.2 MB",
              year: "2024/2025",
              fileType: "PDF",
              url: VERIFIED_COMPETITION_LINKS.profpressConcours,
              isExternal: true,
            },
            {
              id: "pa_ex_f2",
              title: "حقيبة الدروس والتمارين التفاعلية - بروف بريس (Drive)",
              size: "حقيبة كاملة",
              year: "2026",
              fileType: "Drive",
              url: VERIFIED_COMPETITION_LINKS.profpressTrainingsFolder,
              isExternal: true,
            },
          ],
        },
        {
          id: "pa_mock",
          title: "اختبار تجريبي",
          subtitle: "محاكاة للامتحان",
          type: "mock",
          iconName: "Laptop",
          author: "فريق اللغة العربية",
          lastUpdated: "دورة 2026",
          contentSummary: "محاكاة لاختبار مادة التخصص في اللغة العربية تشمل تحليلاً ديداكتيكياً لجذاذة درس مع أسئلة ضبط النص بالشكل التام.",
          articleContent: `## اختبار تجريبي محاكي — اللغة العربية (الابتدائي 2026)

1. **الضبط والإعراب:** اشكل الفقرة شكلاً تاماً، واستخرج: اسم آلة على وزن مفعال، جمع تكسير، ومفعولاً لأجله.
2. **ديداكتيك القراءة المقطعية:** يتعثر متعلم بالثاني ابتدائي في التمييز بين الصوتين /س/ و /ص/ قراءة وكتابة. اقترح أنشطة للوعي الصوتي والتطابق الصوتي الخطي لمعالجة التعثر في 15 دقيقة.`,
          downloadFiles: [
            {
              id: "pa_mock_f1",
              title: "التوصيف الرسمي لمباراة الابتدائي المزدوج 2026 (PDF)",
              size: "PDF",
              year: "2026",
              fileType: "PDF",
              url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
              isExternal: true,
            },
          ],
        },
        {
          id: "pa_qcm",
          title: "قيم مستواك (QCM)",
          subtitle: "أسئلة متعددة الاختيارات",
          type: "qcm",
          iconName: "CheckSquare",
          qcmQuestions: [
            {
              question: "تدرس الظواهر اللغوية في المستويات الثلاثة الأولى من التعليم الابتدائي بطريقة:",
              options: ["صريحة مع القواعد والتمارين", "ضمنية وبدون قواعد مصرح بها", "عبر حفظ المتون النحوية", "لا تدرس بتاتاً"],
              correctIndex: 1,
              explanation: "تدرس الظواهر التركيبية والصرفية والإملائية في المستويات 1 و2 و3 تحسيسياً وضمنياً من خلال النصوص والتعبير الشفهي.",
            },
            {
              question: "أي من الكلمات التالية تعتبر جمع تكسير من صيغ منتهى الجموع؟",
              options: ["مؤمنون", "مصابيح", "معلمات", "أبواب"],
              correctIndex: 1,
              explanation: "صيغة منتهى الجموع هي كل جمع تكسير بعد ألف تكسيره حرفان أو ثلاثة أحرف أوسطها ساكن (مثل: مصابيح، مساجد).",
            },
            {
              question: "المكون المعتمد في المنهاج المنقح لتعليم القراءة بالمستويات المبكرة هو:",
              options: ["الطريقة الكلية التحليلية فقط", "القراءة المقطعية بمكوناتها الخمسة", "طريقة الإملاء الفوري", "الترجمة المباشرة"],
              correctIndex: 1,
              explanation: "تعتمد القراءة المقطعية على: الوعي الصوتي، المبدأ الألفبائي، الطلاقة، المفردات، والفهم القرائي.",
            },
            {
              question: "في استراتيجية 'عائلة الكلمة' لتنمية المفردات، يطلب الأستاذ من التلاميذ البحث عن:",
              options: [
                "مرادف الكلمة وضدها",
                "كلمات مشتقة من نفس الجذر اللغوي (مثل: كتب، كاتب، مكتوب، مكتبة)",
                "نوع الكلمة فقط",
                "سياقها التاريخي فقط",
              ],
              correctIndex: 1,
              explanation: "عائلة الكلمة (الاشتقاق الصرفي) تضم الكلمات التي تشترك في نفس الحروف الأصلية (الجذر).",
            },
          ],
        },
      ],
    },
    {
      id: "primary_french",
      title: "مادة اللغة الفرنسية",
      cycle: "primary",
      iconName: "Languages",
      colorScheme: "purple",
      actions: [
        {
          id: "pf_know",
          title: "معارف المادة",
          subtitle: "Grammaire, Conjugaison, Lexique, Orthographe",
          type: "knowledge",
          iconName: "BookOpen",
          author: "Équipe Français Primaire - Profpress",
          lastUpdated: "Session 2026",
          contentSummary:
            "Synthèse complète : Grammaire fonctionnelle, Concordance des temps, Subjonctif, Conditionnel, Voix passive, Discours indirect, Lexique et Orthographe grammaticale selon le cadre de référence 2026.",
          articleContent: `## Référentiel de Français — Concours Primaire (2026)

### 1. Grammaire et Syntaxe
- Les types et formes de phrases (déclarative, interrogative, impérative, exclamative ; affirmative/négative ; active/passive).
- Les expansions du nom (adjectif qualificatif, complément du nom, proposition subordonnée relative).
- Les compléments circonstanciels et les compléments d'objet (COD, COI, COS).
- Les subordonnées complétives et circonstancielles (cause, conséquence, but, opposition, condition).

### 2. Conjugaison et Orthographe grammaticale
- Temps de l'indicatif (présent, imparfait, passé composé, passé simple, futur simple, plus-que-parfait).
- Modes impératif, conditionnel et subjonctif présent.
- Accord du participe passé (avec *être*, avec *avoir* et des verbes pronominaux).
- Homophones grammaticaux (*a/à, on/ont, ces/ses, c'est/s'est, quel/quelle/qu'elle*).`,
          downloadFiles: [
            {
              id: "pf_know_f1",
              title: "Spécifications Français Primaire Session 2026 (MEN PDF)",
              size: "1.6 MB",
              year: "2026",
              fileType: "PDF",
              url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
              isExternal: true,
            },
            {
              id: "pf_know_f2",
              title: "Mémento Grammaire & Conjugaison Français Primaire (PDF)",
              size: "2.4 MB",
              year: "Actualisé",
              fileType: "PDF",
              url: VERIFIED_COMPETITION_LINKS.profpressConcours,
              isExternal: true,
            },
          ],
        },
        {
          id: "pf_did",
          title: "ديداكتيك المادة",
          subtitle: "Didactique du français au primaire & TaRL",
          type: "didactics",
          iconName: "School",
          author: "Équipe Didactique - Profpress",
          lastUpdated: "Session 2026",
          contentSummary:
            "Démarche méthodologique des activités : Communication et actes de langage, Lecture syllabique et compréhension, Activités réflexives sur la langue (4AEP-6AEP), Production de l'écrit, et remédiation TaRL / Enseignement explicite.",
          articleContent: `## Didactique du Français au Cycle Primaire (Curriculum Révisé & Écoles Pionnières)

### 1. Architecture d'une unité didactique (5 semaines)
- **Semaines 1, 2, 3 et 4 :** Construction et structuration des apprentissages (2 semaines par sous-thème/objectif communicatif).
- **Semaine 5 :** Évaluation, soutien et consolidation des acquis de l'unité.

### 2. Démarche par composante
- **Communication et actes de langage :** Avant l'écoute -> Pendant l'écoute -> Après l'écoute -> Réinvestissement.
- **Lecture (décodage 1-3 AEP & compréhension 4-6 AEP) :** Syllabation, conscience phonémique, fluidité et stratégies de compréhension.
- **Activités de langue (4AEP-6AEP) :** Observation et découverte -> Compréhension et conceptualisation -> Entraînement -> Évaluation et remédiation.`,
          downloadFiles: [
            {
              id: "pf_did_f1",
              title: "Guide pédagogique & fiches types Français Primaire (PDF)",
              size: "2.2 MB",
              year: "2026",
              fileType: "PDF",
              url: VERIFIED_COMPETITION_LINKS.profpressIntroDidactics,
              isExternal: true,
            },
          ],
        },
        {
          id: "pf_exams",
          title: "نماذج اختبارات",
          subtitle: "امتحانات السنوات السابقة مع التصحيح",
          type: "exams",
          iconName: "FileText",
          author: "Archives CRMEF - Profpress",
          lastUpdated: "2018 - 2026",
          contentSummary: "Sujets du concours de recrutement de français primaire avec les corrigés indicatifs des sessions 2018-2025.",
          articleContent: `## Annales Corrigées — Français Primaire

Les sujets combinent compréhension d'un texte court, questions de langue (grammaire, conjugaison, orthographe, lexique) et une mise en situation didactique (analyse d'erreurs ou conception de fiche pédagogique).`,
          downloadFiles: [
            {
              id: "pf_ex_f1",
              title: "Annales Français Primaire avec éléments de réponse (PDF)",
              size: "3.8 MB",
              year: "2024/2025",
              fileType: "PDF",
              url: VERIFIED_COMPETITION_LINKS.profpressConcours,
              isExternal: true,
            },
          ],
        },
        {
          id: "pf_mock",
          title: "اختبار تجريبي",
          subtitle: "محاكاة للامتحان",
          type: "mock",
          iconName: "Laptop",
          author: "Profpress Français",
          lastUpdated: "Session 2026",
          contentSummary: "Test blanc portant sur la concordance des temps, l'analyse d'erreurs d'accord et la remédiation en lecture.",
          articleContent: `## Examen Blanc — Français Primaire (2026)

1. **Langue :** Mettez les verbes entre parenthèses aux temps qui conviennent et transformez une phrase active au discours indirect au passé.
2. **Didactique :** Proposez une fiche de remédiation ciblée pour des élèves de 5ème AEP qui confondent les graphèmes *é / è / ei*.`,
          downloadFiles: [
            {
              id: "pf_mock_f1",
              title: "Portail officiel des spécifications 2026",
              size: "PDF",
              year: "2026",
              fileType: "PDF",
              url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
              isExternal: true,
            },
          ],
        },
        {
          id: "pf_qcm",
          title: "قيم مستواك (QCM)",
          subtitle: "أسئلة متعددة الاختيارات",
          type: "qcm",
          iconName: "CheckSquare",
          qcmQuestions: [
            {
              question: "Dans l'approche communicative, l'erreur de l'apprenant est considérée comme :",
              options: [
                "Une faute grave à sanctionner immédiatement",
                "Un indicateur du processus d'apprentissage et un levier didactique",
                "Une preuve d'incompétence",
                "Un problème à ignorer",
              ],
              correctIndex: 1,
              explanation: "La didactique moderne considère l'erreur comme une étape normale et constructive de la structuration des savoirs.",
            },
            {
              question: "Quelle est la forme correcte au subjonctif présent : 'Il faut que nous ...' ?",
              options: ["prenons", "prenions", "prendrons", "prenais"],
              correctIndex: 1,
              explanation: "Le subjonctif présent du verbe prendre avec la première personne du pluriel est 'prenions'.",
            },
            {
              question: "Dans l'enseignement du français en 4ème-6ème AEP, l'entrée principale de la progression est :",
              options: [
                "Le thème et les actes de langage intégrés dans un projet de classe",
                "La grammaire pure dès le 1er jour",
                "La traduction bilingue systématique",
                "La dictée non préparée uniquement",
              ],
              correctIndex: 0,
              explanation: "Le curriculum révisé organise chaque unité autour d'un thème, d'actes de langage et d'un projet de classe fédérateur.",
            },
          ],
        },
      ],
    },
    {
      id: "primary_math",
      title: "مادة الرياضيات",
      cycle: "primary",
      iconName: "Calculator",
      colorScheme: "cyan",
      actions: [
        {
          id: "pm_know",
          title: "معارف المادة",
          subtitle: "الحساب، التناسبية، الهندسة، القياس",
          type: "knowledge",
          iconName: "Calculator",
          author: "فريق الرياضيات - بروف بريس",
          lastUpdated: "دورة 2026",
          contentSummary:
            "الأعداد والحساب (الأعداد الكسرية والعشرية والنسبية)، التناسبية والنسبة المئوية وسلم التصاميم والسرعة المتوسطة، الهندسة المستوية والفضائية (المساحات والحجوم)، وتنظيم ومعالجة البيانات.",
          articleContent: `## الدليل المعرفي لمادة الرياضيات — التعليم الابتدائي (2026)

### 1. الأعداد والحساب والتناسبية
- العمليات الأربع على الأعداد الصحيحة والعشرية والكسرية والستينية.
- **التناسبية:** معامل التناسب، الرابع المتناسب، النسبة المئوية، الرأسمال وسعر الفائدة، السرعة المتوسطة، وسلم التصاميم والخرائط، والكتلة الحجمية.

### 2. الهندسة والقياس وتنظيم البيانات
- **الهندسة المستوية:** المستقيمات المتوازية والمتعامدة، الزوايا، المثلثات، المضلعات الرباعية (المربع، المستطيل، المعين، متوازي الأضلاع، شبه المنحرف)، والدائرة والقرص.
- **المجسمات:** المكعب، متوازي المستطيلات، الموشور القائم، والأسطوانة (المساحة الجانبية والكلية والحجم).
- **القياس:** جدول التحويلات للأطوال، الكتل، المساحات (الهكتار والآر)، والحجوم والسعات ($1L = 1dm^3$).`,
          downloadFiles: [
            {
              id: "pm_know_f1",
              title: "توصيف مادة الرياضيات للسلك الابتدائي 2026 (PDF)",
              size: "1.6 MB",
              year: "2026",
              fileType: "PDF",
              url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
              isExternal: true,
            },
            {
              id: "pm_know_f2",
              title: "دليل الأنشطة الاعتيادية للرياضيات والحساب الذهني (PDF)",
              size: "2.1 MB",
              year: "محين",
              fileType: "PDF",
              url: VERIFIED_COMPETITION_LINKS.profpressRegularActivities,
              isExternal: true,
            },
          ],
        },
        {
          id: "pm_did",
          title: "ديداكتيك المادة",
          subtitle: "نظرية بروسو، سنغافورة، التعليم الصريح",
          type: "didactics",
          iconName: "School",
          author: "فريق الديداكتيك - بروف بريس",
          lastUpdated: "دورة 2026",
          contentSummary:
            "مراحل الدرس الرياضي بالابتدائي: البناء والترييض، التقويم، والدعم. نظرية الوضعيات الديداكتيكية لبروسو (Brousseau)، مقاربة سنغافورة (CPA: الملموس، شبه الملموس، المجرد)، ومعالجة الأخطاء الشائعة.",
          articleContent: `## ديداكتيك الرياضيات بالتعليم الابتدائي (المنهاج المنقح والريادة)

### 1. منهجية CPA (الملموس - شبه الملموس - المجرد) وطريقة سنغافورة
- **الملموس (Concret):** مناولة أشياء مادية حقيقية (خشيبات، مكعبات، بطاقات) لبناء المفهوم.
- **المصور / شبه الملموس (Imager/Pictorial):** تمثيل الوضعية عبر رسوم وأشرطة ونماذج (Model Drawing).
- **المجرد (Abstrait):** الانتقال إلى الرموز الرياضية والعمليات والمعادلات.

### 2. مراحل تدريس حصة الرياضيات
1. الحساب الذهني / النشاط الاعتيادي (5 دقائق).
2. التهيئة ووضعية البناء (وفق وضعيات بروسو: الفعل، الصياغة، التداول، المأسسة).
3. أنشطة الترييض والتطبيق.
4. التقويم والدعم والمعالجة الفورية.`,
          downloadFiles: [
            {
              id: "pm_did_f1",
              title: "ديداكتيك الرياضيات للمستويين 1 و2 - نموذج سنغافورة (PDF)",
              size: "2.3 MB",
              year: "مرجعي",
              fileType: "PDF",
              url: VERIFIED_COMPETITION_LINKS.profpressMathSingapore,
              isExternal: true,
            },
            {
              id: "pm_did_f2",
              title: "تلخيص المدخل إلى علم التدريس (PDF)",
              size: "1.9 MB",
              year: "محين",
              fileType: "PDF",
              url: VERIFIED_COMPETITION_LINKS.profpressIntroDidactics,
              isExternal: true,
            },
          ],
        },
        {
          id: "pm_exams",
          title: "نماذج اختبارات",
          subtitle: "امتحانات السنوات السابقة مع التصحيح",
          type: "exams",
          iconName: "FileText",
          author: "أرشيف الامتحانات - بروف بريس",
          lastUpdated: "2018 - 2026",
          contentSummary: "نماذج امتحانات مادة التخصص وديداكتيك الرياضيات لسلك التعليم الابتدائي مع شبكات التصحيح وسلم التنقيط.",
          articleContent: `## أرشيف اختبارات الرياضيات — التعليم الابتدائي

تركز امتحانات الدورات السابقة على حل مسائل التناسبية والهندسة والقياس، ثم تحليل أخطاء التلاميذ في الجمع بالاحتفاظ أو ضرب الأعداد العشرية أو ترتيب الكسور.`,
          downloadFiles: [
            {
              id: "pm_ex_f1",
              title: "تجميعية امتحانات الرياضيات ابتدائي مع التصحيح (PDF)",
              size: "4.4 MB",
              year: "2024/2025",
              fileType: "PDF",
              url: VERIFIED_COMPETITION_LINKS.profpressConcours,
              isExternal: true,
            },
          ],
        },
        {
          id: "pm_mock",
          title: "اختبار تجريبي",
          subtitle: "محاكاة للامتحان",
          type: "mock",
          iconName: "Laptop",
          author: "فريق الرياضيات",
          lastUpdated: "دورة 2026",
          contentSummary: "اختبار تجريبي يتضمن حل مسألة في الكتلة الحجمية وسلم التصاميم وتحليل خطأ تلميذ في مقارنة عددين عشريين.",
          articleContent: `## اختبار تجريبي محاكي — الرياضيات الابتدائي (2026)

1. **مسألة:** خزان على شكل متوازي مستطيلات أبعاده على تصميم بسلم $1/100$ هي $4cm, 3cm, 2cm$. احسب حجمه الحقيقي بالمتر المكعب وباللتر.
2. **ديداكتيك:** كتب تلميذ بالخامس ابتدائي أن $3.14 > 3.5$ لأن $14 > 5$. شخص مصدر الخطأ واقترح نشاطاً تصحيحياً يعتمد مستقيم الأعداد وجدول العد العشري.`,
          downloadFiles: [
            {
              id: "pm_mock_f1",
              title: "بطاقة توصيف اختبار الرياضيات دورة 2026",
              size: "PDF",
              year: "2026",
              fileType: "PDF",
              url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
              isExternal: true,
            },
          ],
        },
        {
          id: "pm_qcm",
          title: "قيم مستواك (QCM)",
          subtitle: "أسئلة متعددة الاختيارات",
          type: "qcm",
          iconName: "CheckSquare",
          qcmQuestions: [
            {
              question: "ما هي المراحل الأساسية للوضعية الديداكتيكية حسب غي بروسو؟",
              options: [
                "الحفظ، التكرار، الامتحان",
                "وضعية الفعل، وضعية الصياغة، وضعية التداول/المصادقة، ومأسسة المعرفة",
                "الاستماع، القراءة، الكتابة",
                "الشرح، التلخيص، التنقيط",
              ],
              correctIndex: 1,
              explanation: "حدد بروسو 4 وضعيات: Action, Formulation, Validation, Institutionnalisation.",
            },
            {
              question: "ما هو حجم مكعب طول حرفه 4 سنتيمترات؟",
              options: ["16 سم³", "64 سم³", "24 سم³", "48 سم³"],
              correctIndex: 1,
              explanation: "حجم المكعب = الحرف × الحرف × الحرف = 4 × 4 × 4 = 64 سم مكعب.",
            },
            {
              question: "تسمى المراحل الثلاث لمقاربة سنغافورة في تدريس الرياضيات (CPA):",
              options: [
                "الملموس، شبه الملموس (المصور)، والمجرد",
                "اللفظي، الصوتي، والإملائي",
                "القياس، الجبر، والتكامل",
                "القراءة، الفهم، والكتابة",
              ],
              correctIndex: 0,
              explanation: "CPA تعني Concret (المناولة المادية) ثم Pictorial/Imager (التمثيل بالرسوم والأشرطة) ثم Abstract (الترميز الرياضي المجرد).",
            },
          ],
        },
      ],
    },
    {
      id: "primary_sciences",
      title: "مادة العلوم (النشاط العلمي)",
      cycle: "primary",
      iconName: "FlaskConical",
      colorScheme: "emerald",
      actions: [
        {
          id: "psc_know",
          title: "معارف المادة",
          subtitle: "علوم الحياة، الفيزياء، الكيمياء، الفلك",
          type: "knowledge",
          iconName: "Sparkles",
          author: "فريق النشاط العلمي - بروف بريس",
          lastUpdated: "دورة 2026",
          contentSummary:
            "الكائنات الحية ووظائفها، التغذية والتنفس والدوران والتوالد، الأنظمة البيئية، حالات المادة وخصائصها، التحولات الفيزيائية والكيميائية، الكهرباء والمغناطيس، الطاقة، والفلك وعلوم الأرض.",
          articleContent: `## الدليل المعرفي لمادة النشاط العلمي — التعليم الابتدائي (2026)

### 1. علوم الحياة (Biologie)
- **جسم الإنسان والصحة:** الجهاز الهضمي، الجهاز التنفسي، الدوران الدموي، الجهاز العصبي والحساسية الشعورية، التغذية المتوازنة.
- **التوالد والوراثة عند الكائنات الحية:** التوالد الجنسي واللاجنسي عند النباتات والحيوانات، السلاسل والشبكات الغذائية والتوازن البيئي.

### 2. العلوم الفيزيائية وعلوم الأرض والفضاء
- **المادة:** الحالات الثلاث للمادة وتغيراتها (الانصهار، التجمد، التبخر، التكاثف)، المحاليل والخلائط وطرق الفصل.
- **الكهرباء والطاقات:** الدارة الكهربائية البسيطة، التركيب على التوالي والتوازي، الطاقة المتجددة وغير المتجددة، والضغط والطفو.
- **الفلك وعلوم الأرض:** دوران الأرض حول نفسها (الليل والنهار) وحول الشمس (الفصول)، أطوار القمر، والزلازل والبراكين.`,
          downloadFiles: [
            {
              id: "psc_know_f1",
              title: "توصيف اختبار النشاط العلمي بالتعليم الابتدائي 2026 (PDF)",
              size: "1.5 MB",
              year: "2026",
              fileType: "PDF",
              url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
              isExternal: true,
            },
          ],
        },
        {
          id: "psc_did",
          title: "ديداكتيك المادة",
          subtitle: "نهج التقصي العلمي ودفتر التقصي",
          type: "didactics",
          iconName: "School",
          author: "فريق الديداكتيك العلمي - بروف بريس",
          lastUpdated: "دورة 2026",
          contentSummary:
            "خطوات نهج التقصي العلمي بالنشاط العلمي: وضعية الانطلاق، التملك، صياغة سؤال التقصي، تقديم الفرضيات، اختبار الفرضيات، التوثيق والاستنتاج، والتقويم، مع توظيف دفتر التقصي والوسائط التكنولوجية.",
          articleContent: `## ديداكتيك النشاط العلمي وفق المنهاج المنقح ونهج التقصي

### خطوات نهج التقصي العلمي (Démarche d'investigation):
1. **وضعية الانطلاق:** موقف محير أو ملاحظة ظاهرية تثير تساؤل المتعلمين وتستخرج تمثلاتهم القبلية.
2. **صياغة سؤال التقصي:** تجميع تساؤلات المتعلمين وصياغة سؤال إشكالي دقيق وقابل للبحث.
3. **بناء الفرضيات:** اقتراح تفسيرات أولية مؤقتة من طرف المجموعات.
4. **اختبار الفرضيات:** عبر التجريب المباشر، المناولة، الملاحظة، البحث الوثائقي، أو المحاكاة.
5. **تقاسم النتائج والتوثيق والاستنتاج:** مناقشة المعطيات، تمحيص الفرضيات، وصياغة الخلاصة الجماعية.
6. **التعبئة والتطبيق:** استثمار التعلمات الجديدة في وضعيات حياتية وبيئية جديدة.`,
          downloadFiles: [
            {
              id: "psc_did_f1",
              title: "ديداكتيك النشاط العلمي بالمدرسة الابتدائية آخر المستجدات (PDF)",
              size: "2.1 MB",
              year: "محين",
              fileType: "PDF",
              url: VERIFIED_COMPETITION_LINKS.profpressScienceDidactics,
              isExternal: true,
            },
          ],
        },
        {
          id: "psc_exams",
          title: "نماذج اختبارات",
          subtitle: "امتحانات السنوات السابقة مع التصحيح",
          type: "exams",
          iconName: "FileText",
          author: "أرشيف الامتحانات - بروف بريس",
          lastUpdated: "2018 - 2026",
          contentSummary: "امتحانات السنوات السابقة في التخصص وديداكتيك النشاط العلمي مع الحلول المفصلة.",
          articleContent: `## بنك امتحانات النشاط العلمي

تغطي الامتحانات السابقة مواضيع الكهرباء، التغذية، الاحتراق، التوالد، وتخطيط حصص تعتمد نهج التقصي مع رصد العوائق والتمثلات.`,
          downloadFiles: [
            {
              id: "psc_ex_f1",
              title: "تجميعية اختبارات النشاط العلمي مع التصحيح (PDF)",
              size: "3.4 MB",
              year: "2024/2025",
              fileType: "PDF",
              url: VERIFIED_COMPETITION_LINKS.profpressConcours,
              isExternal: true,
            },
          ],
        },
        {
          id: "psc_mock",
          title: "اختبار تجريبي",
          subtitle: "محاكاة للامتحان",
          type: "mock",
          iconName: "Laptop",
          author: "فريق النشاط العلمي",
          lastUpdated: "دورة 2026",
          contentSummary: "محاكاة لاختبار النشاط العلمي مع جذاذة تطبيقية تعتمد نهج التقصي في موضوع الاحتراقات أو الدارة الكهربائية.",
          articleContent: `## اختبار تجريبي — النشاط العلمي (الابتدائي 2026)

- **المعرفة العلمية:** قارن بين الاحتراق الكامل والاحتراق غير الكامل مبيناً الغازات الناتجة ومخاطر أحادي أكسيد الكربون.
- **الديداكتيك:** صمم جذاذة لحصة حول 'الموصلات والعوازل الكهربائية' بالمستوى الرابع ابتدائي مبرزاً جميع خطوات نهج التقصي.`,
          downloadFiles: [
            {
              id: "psc_mock_f1",
              title: "بطاقة التوصيف الرسمية 2026 (PDF)",
              size: "PDF",
              year: "2026",
              fileType: "PDF",
              url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
              isExternal: true,
            },
          ],
        },
        {
          id: "psc_qcm",
          title: "قيم مستواك (QCM)",
          subtitle: "أسئلة متعددة الاختيارات",
          type: "qcm",
          iconName: "CheckSquare",
          qcmQuestions: [
            {
              question: "ما هي الخطوة التي تلي مباشرة وضعية الانطلاق في نهج التقصي العلمي؟",
              options: ["الاستنتاج المباشر", "صياغة سؤال التقصي وبناء الفرضيات", "التجريب في المختبر", "كتابة الخلاصة"],
              correctIndex: 1,
              explanation: "تثير وضعية الانطلاق دهشة المتعلم مما يقوده إلى صياغة سؤال التقصي واقتراح الفرضيات الممكنة للتحقق منها.",
            },
            {
              question: "أي من الغازات التالية يمثل ناتجاً خطيراً لعملية الاحتراق غير الكامل في مكان مغلق؟",
              options: ["ثنائي الأوكسجين (O2)", "أحادي أكسيد الكربون (CO)", "الآزوت (N2)", "بخار الماء النقي"],
              correctIndex: 1,
              explanation: "أحادي أكسيد الكربون غاز سام عديم اللون والرائحة ينتج عن الاحتراق غير الكامل في غياب تهوية كافية.",
            },
          ],
        },
      ],
    },
    {
      id: "primary_amazigh",
      title: "مادة اللغة الأمازيغية",
      cycle: "primary",
      iconName: "PenTool",
      colorScheme: "amber",
      actions: [
        {
          id: "pam_know",
          title: "معارف المادة",
          subtitle: "قواعد اللغة وحروف تيفيناغ (IRCAM)",
          type: "knowledge",
          iconName: "BookOpen",
          author: "فريق اللغة الأمازيغية - بروف بريس",
          lastUpdated: "دورة 2026",
          contentSummary:
            "أبجدية تيفيناغ المعتمدة رسمياً بالمغرب (IRCAM)، قواعد الإملاء وتطابق الصوامت والصوائت، علم الصرف (الاسم: التذكير والتأنيث، المفرد والجمع، حالة الإرسال والإلحاق) وتصريف الفعل الأمازيغي.",
          articleContent: `## الدليل المعرفي لمباراة التعليم — تخصص اللغة الأمازيغية (2026)

### 1. أبجدية تيفيناغ وقواعد الإملاء
- تتكون أبجدية **تيفيناغ المعيارية (IRCAM)** من 33 حرفاً (صوامت، أشباه صوامت، وصوائت: ⴰ, ⵉ, ⵓ).
- قواعد الإملاء: التشديد (التضعيف)، علامات الترقيم، وكتابة الضمائر المتصلة وحروف الجر والربط.

### 2. الصرف والتركيب الأمازيغي
- **الاسم (Isem):** الجنس (أمزري/المذكر، أونتوي/المؤنث)، العدد (المفرد والجمع)، والحالة (حالة الإرسال Addad ilelli / حالة الإلحاق Addad amaruz).
- **الفعل (Amyag):** الجذور الفعلية، الصيغ الزمنية (الماضي التام، التام المنفي، غير التام، والمستقبل/أور-المؤكد)، والأفعال المشتقة.`,
          downloadFiles: [
            {
              id: "pam_know_f1",
              title: "بطاقة توصيف مباراة التعليم الابتدائي - اللغة الأمازيغية 2026 (PDF)",
              size: "1.6 MB",
              year: "2026",
              fileType: "PDF",
              url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
              isExternal: true,
            },
          ],
        },
        {
          id: "pam_did",
          title: "ديداكتيك المادة",
          subtitle: "منهجية التدريس بالابتدائي",
          type: "didactics",
          iconName: "School",
          author: "فريق الديداكتيك - بروف بريس",
          lastUpdated: "دورة 2026",
          contentSummary:
            "ديداكتيك تدريس اللغة الأمازيغية بأسلاك الابتدائي (المستويات 1 إلى 6)، التدبير الديداكتيكي للمشافهة (التواصل)، القراءة بحروف تيفيناغ، الخط والكتابة، والظواهر اللغوية.",
          articleContent: `## ديداكتيك اللغة الأمازيغية بالتعليم الابتدائي

- **مكون الاستماع والتحدث (المشافهة):** التدرج من الاستئناس الصوتي وإنتاج جمل تواصلية بسيطة في سياقات حياتية مألوفة (الأسرة، المدرسة، البيئة، التراث).
- **مكون القراءة والكتابة بحرف تيفيناغ:** اعتماد الطرائق النشطة والربط الصوتي الخطي مع الألعاب القرائية.
- **مكون الظواهر اللغوية:** استثمارها ضمنياً في المستويات الأولى وبشكل مبسط في المستويات العليا.`,
          downloadFiles: [
            {
              id: "pam_did_f1",
              title: "الدليل البيداغوجي ومنهجية التدريس (PDF)",
              size: "2.3 MB",
              year: "2026",
              fileType: "PDF",
              url: VERIFIED_COMPETITION_LINKS.profpressPedagogicalGuide,
              isExternal: true,
            },
          ],
        },
        {
          id: "pam_exams",
          title: "نماذج اختبارات",
          subtitle: "امتحانات السنوات السابقة",
          type: "exams",
          iconName: "FileText",
          author: "أرشيف الامتحانات",
          lastUpdated: "2018 - 2026",
          contentSummary: "امتحانات تخصص اللغة الأمازيغية ومواضيع الديداكتيك لمباريات أطر التدريس للسنوات السابقة.",
          articleContent: `## أرشيف اختبارات اللغة الأمازيغية

تشمل المواضيع نقل نصوص إلى تيفيناغ، تحليل الظواهر الصرفية والتركيبية (حالة الإلحاق، تصريف الأفعال)، وبناء جذاذة قراءة أو تواصل.`,
          downloadFiles: [
            {
              id: "pam_ex_f1",
              title: "نماذج امتحانات اللغة الأمازيغية للدورات السابقة (PDF)",
              size: "3.1 MB",
              year: "2024",
              fileType: "PDF",
              url: VERIFIED_COMPETITION_LINKS.profpressConcours,
              isExternal: true,
            },
          ],
        },
        {
          id: "pam_mock",
          title: "اختبار تجريبي",
          subtitle: "محاكاة للامتحان",
          type: "mock",
          iconName: "Laptop",
          author: "فريق الأمازيغية",
          lastUpdated: "دورة 2026",
          contentSummary: "محاكاة لاختبار مادة التخصص والديداكتيك لأساتذة تخصص اللغة الأمازيغية.",
          articleContent: `## اختبار تجريبي — اللغة الأمازيغية (2026)

1. اكتب فقرة بحروف تيفيناغ المعيارية حول أهمية المدرسة العمومية مع احترام قواعد التشديد وحالة الإلحاق.
2. صمم مقطعاً ديداكتيكياً لتقديم حرفي ⵜ و ⴷ لتلاميذ السنة الأولى ابتدائي.`,
          downloadFiles: [
            {
              id: "pam_mock_f1",
              title: "توصيفات دورة 2026 الرسمية (PDF)",
              size: "PDF",
              year: "2026",
              fileType: "PDF",
              url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
              isExternal: true,
            },
          ],
        },
        {
          id: "pam_qcm",
          title: "قيم مستواك (QCM)",
          subtitle: "أسئلة متعددة الاختيارات",
          type: "qcm",
          iconName: "CheckSquare",
          qcmQuestions: [
            {
              question: "كم عدد الحروف في أبجدية تيفيناغ المعتمدة من طرف المعهد الملكي للثقافة الأمازيغية (IRCAM)؟",
              options: ["28 حرفاً", "33 حرفاً", "36 حرفاً", "24 حرفاً"],
              correctIndex: 1,
              explanation: "تتكون أبجدية تيفيناغ المغربية الرسمية من 33 حرفاً تشمل الصوامت والصوائت وعلامات الترقيق.",
            },
            {
              question: "يتغير شكل أول الاسم في اللغة الأمازيغية بعد حروف الجر أو عندما يكون فاعلاً مؤخراً، وتسمى هذه الظاهرة:",
              options: ["حالة الإرسال (Addad ilelli)", "حالة الإلحاق (Addad amaruz)", "المصدر الصريح", "أسلوب النداء"],
              correctIndex: 1,
              explanation: "حالة الإلحاق (Addad amaruz) قاعدة تركيبية أساسية يتغير فيها بداية الاسم المسبوق بحرف جر أو الفاعل الواقع بعد الفعل.",
            },
          ],
        },
      ],
    },

    ...SECONDARY_AND_OTHER_SUBJECTS,
  ],
};

/**
 * Smart migration & hydration helper:
 * Preserves any user-custom subjects/edits saved in localStorage while
 * seamlessly filling in missing articles, Word/PDF download links, QCMs,
 * new quick-resource cards, and newly added 2026 specialties.
 */
export function mergeCompetitionData(
  savedRaw: Partial<TeachingCompetitionPageData> | null | undefined
): TeachingCompetitionPageData {
  if (!savedRaw || !Array.isArray(savedRaw.subjects)) {
    return DEFAULT_TEACHING_COMPETITION_DATA;
  }

  // Merge quick resources (keep user customizations, fill missing fields & append new cards)
  const savedResources = Array.isArray(savedRaw.quickResources) ? savedRaw.quickResources : [];
  const defaultResMap = new Map(DEFAULT_TEACHING_COMPETITION_DATA.quickResources.map((r) => [r.id, r]));
  const mergedResources: QuickResourceCard[] = savedResources.map((r) => {
    const def = defaultResMap.get(r.id);
    if (!def) return r;
    return {
      ...def,
      ...r,
      writtenContent: r.writtenContent && r.writtenContent.trim().length > 20 ? r.writtenContent : def.writtenContent,
      downloadLinks: r.downloadLinks && r.downloadLinks.length > 0 ? r.downloadLinks : def.downloadLinks,
      images: r.images && r.images.length > 0 ? r.images : def.images,
    };
  });
  for (const defRes of DEFAULT_TEACHING_COMPETITION_DATA.quickResources) {
    if (!mergedResources.some((r) => r.id === defRes.id)) {
      mergedResources.push(defRes);
    }
  }

  // Merge subjects and actions
  const defaultSubMap = new Map(DEFAULT_TEACHING_COMPETITION_DATA.subjects.map((s) => [s.id, s]));
  const mergedSubjects: CompetitionSubject[] = savedRaw.subjects.map((sub) => {
    const defSub = defaultSubMap.get(sub.id);
    if (!defSub) return sub;

    const defActMap = new Map(defSub.actions.map((a) => [a.id, a]));
    const savedActions = Array.isArray(sub.actions) ? sub.actions : [];
    const mergedActions: CompetitionSubAction[] = savedActions.map((act) => {
      const defAct = defActMap.get(act.id);
      if (!defAct) return act;
      return {
        ...defAct,
        ...act,
        contentSummary:
          act.contentSummary && act.contentSummary.trim().length > 15
            ? act.contentSummary
            : defAct.contentSummary,
        articleContent:
          act.articleContent && act.articleContent.trim().length > 25
            ? act.articleContent
            : defAct.articleContent,
        downloadFiles:
          act.downloadFiles && act.downloadFiles.length > 0
            ? act.downloadFiles
            : defAct.downloadFiles,
        qcmQuestions:
          act.qcmQuestions && act.qcmQuestions.length > 0
            ? act.qcmQuestions
            : defAct.qcmQuestions,
        author: act.author || defAct.author,
        lastUpdated: act.lastUpdated || defAct.lastUpdated,
      };
    });

    for (const defAct of defSub.actions) {
      if (!mergedActions.some((a) => a.id === defAct.id)) {
        mergedActions.push(defAct);
      }
    }

    return {
      ...defSub,
      ...sub,
      actions: mergedActions,
    };
  });

  for (const defSub of DEFAULT_TEACHING_COMPETITION_DATA.subjects) {
    if (!mergedSubjects.some((s) => s.id === defSub.id)) {
      mergedSubjects.push(defSub);
    }
  }

  return {
    pageTitle: savedRaw.pageTitle || DEFAULT_TEACHING_COMPETITION_DATA.pageTitle,
    pageDate: DEFAULT_TEACHING_COMPETITION_DATA.pageDate,
    trainingCourseText: DEFAULT_TEACHING_COMPETITION_DATA.trainingCourseText,
    trainingCourseUrl: DEFAULT_TEACHING_COMPETITION_DATA.trainingCourseUrl,
    primaryNotice: DEFAULT_TEACHING_COMPETITION_DATA.primaryNotice,
    secondaryNotice: DEFAULT_TEACHING_COMPETITION_DATA.secondaryNotice,
    quickResources: mergedResources,
    subjects: mergedSubjects,
  };
}
