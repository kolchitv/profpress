export interface CompetitionDownloadFile {
  id: string;
  title: string;
  size?: string;
  year?: string;
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
        title: `موضوع الدورة العادية 2024 مع عناصر الإجابة الرسمية - ${subjectTitle}`,
        size: "1.2 MB",
        year: "2024",
        url: "https://profpressma.blogspot.com/search/label/%D9%86%D9%85%D8%A7%D8%B0%D8%AC%20%D8%A7%D9%85%D8%AA%D8%AD%D8%A7%D9%86%D8%A7%D8%AA",
      },
      {
        id: "f2",
        title: `موضوع الدورة الاستدراكية 2023 مع سلم التنقيط - ${subjectTitle}`,
        size: "980 KB",
        year: "2023",
        url: "https://profpressma.blogspot.com/search/label/%D9%86%D9%85%D8%A7%D8%B0%D8%AC%20%D8%A7%D9%85%D8%AA%D8%AD%D8%A7%D9%86%D8%A7%D8%AA",
      },
      {
        id: "f3",
        title: `دليل الديداكتيك والتوصيفات الرسمية المعتمدة - ${subjectTitle}`,
        size: "2.4 MB",
        year: "وزاري",
        url: "https://profpressma.blogspot.com/search/label/%D8%AA%D9%88%D8%B5%D9%8A%D9%81%D8%A7%D8%AA",
      },
    ];
  }
  if (actionType === "summaries") {
    return [
      {
        id: "f1",
        title: "موضوع الدورة العادية 2024 مع عناصر الإجابة الرسمية",
        size: "1.2 MB",
        year: "2024",
        url: "https://profpressma.blogspot.com/search/label/%D9%85%D9%84%D8%AE%D8%B5%D8%A7%D8%AA",
      },
      {
        id: "f2",
        title: "موضوع الدورة الاستدراكية 2023 مع سلم التنقيط",
        size: "980 KB",
        year: "2023",
        url: "https://profpressma.blogspot.com/search/label/%D9%85%D9%84%D8%AE%D8%B5%D8%A7%D8%AA",
      },
      {
        id: "f3",
        title: "دليل الديداكتيك والتوصيفات الرسمية المعتمدة",
        size: "2.4 MB",
        year: "وزاري",
        url: "https://profpressma.blogspot.com/search/label/%D8%AA%D9%88%D8%B5%D9%8A%D9%81%D8%A7%D8%AA",
      },
    ];
  }
  if (actionType === "didactics") {
    return [
      {
        id: "f1",
        title: `دليل الديداكتيك والتوصيفات الرسمية المعتمدة - ${subjectTitle}`,
        size: "2.4 MB",
        year: "وزاري",
        url: "https://profpressma.blogspot.com/search/label/%D8%AF%D9%8A%D8%AF%D8%A7%D9%83%D8%AA%D9%8A%D9%83",
      },
      {
        id: "f2",
        title: `جذاذات نموذجية وتخطيط وضعيات التقويم في ${subjectTitle}`,
        size: "1.6 MB",
        year: "بيداغوجي",
        url: "https://profpressma.blogspot.com/search/label/%D8%AC%D8%B0%D8%A7%D8%B0%D8%A7%D8%AA",
      },
    ];
  }
  return [
    {
      id: "f1",
      title: `الملف التوجيهي والملخص الشامل - ${actionTitle}`,
      size: "1.8 MB",
      year: "2024",
      url: "https://profpressma.blogspot.com/search/label/%D9%85%D8%A8%D8%A7%D8%B1%D8%A7%D8%A9%20%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85",
    },
    {
      id: "f2",
      title: `خطاطات ذهنية وبطاقات المراجعة السريعة`,
      size: "1.1 MB",
      year: "محين",
      url: "https://profpressma.blogspot.com/search/label/%D9%85%D9%84%D8%AE%D8%B5%D8%A7%D8%AA",
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
  pageTitle: "الشامل لمباراة التعليم الابتدائي والثانوي",
  pageDate: "18 مايو, 2026",
  trainingCourseText: "اشترك بدورة تدريبية",
  trainingCourseUrl: "https://profpressma.blogspot.com/search/label/%D9%85%D8%A8%D8%A7%D8%B1%D8%A7%D8%A9%20%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85",
  quickResources: [
    {
      id: "specs",
      title: "توصيفات المباراة",
      subtitle: "المحاور الرسمية للاختبارات",
      iconName: "FileText",
      color: "teal",
      url: "https://profpressma.blogspot.com/search/label/%D8%AA%D9%88%D8%B5%D9%8A%D9%81%D8%A7%D8%AA",
      author: "المركز الوطني للتقويم والامتحانات والتوجيه",
      lastUpdated: "شتنبر 2026",
      writtenContent: `تعتبر التوصيفات الرسمية الصادرة عن المركز الوطني للامتحانات المرجع الأساسي لتأطير وبناء مواضيع مباريات توظيف الأطر النظامية للأكاديميات الجهوية لمهن التربية والتكوين.

أولاً: أهداف التوصيفات المرجعية:
1. تحديد المجالات والمحاور المعرفية والديداكتيكية المستهدفة بالاختبار بدقة متناهية.
2. تحديد الأوزان النسبية والمعاملات المخصصة لكل مادة ومجال فرعي لتوجيه جهود المترشح.
3. تفادي التشتت وتوجيه الاستعداد نحو المستجدات البيداغوجية والوثائق الرسمية المعتمدة.

ثانياً: مكونات الاختبارات بالسلك الابتدائي (التخصص المزدوج):
- اللغة العربية وديداكتيكها (المعامل 3)
- اللغة الفرنسية وديداكتيكها (المعامل 3)
- الرياضيات وديداكتيكها (المعامل 3)
- النشاط العلمي وديداكتيكه (المعامل 2)
- علوم التربية ومستجدات المنظومة (المعامل 2)

ثالثاً: مكونات الاختبارات بالسلك الثانوي (الإعدادي والتأهيلي):
- اختبار في مادة التخصص الأكاديمي (المعامل 3).
- اختبار في ديداكتيك مادة التخصص ومنهجيات التدريس (المعامل 2).
- اختبار في علوم التربية وعلم النفس التربوي والتشريع المدرسي (المعامل 1).`,
      images: [
        {
          id: "img-specs-1",
          url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&auto=format&fit=crop&q=80",
          caption: "توزيع الأطر المرجعية ومجالات التقويم للامتحانات المهنية ومباريات التوظيف",
        },
      ],
      downloadLinks: [
        {
          id: "link-specs-1",
          title: "التوصيف الرسمي الشامل لمباراة الابتدائي المزدوج (ملف كامل PDF)",
          url: "https://profpressma.blogspot.com/search/label/%D8%AA%D9%88%D8%B5%D9%8A%D9%81%D8%A7%D8%AA",
          size: "2.8 MB",
        },
        {
          id: "link-specs-2",
          title: "الأطر المرجعية لتوصيفات التعليم الثانوي (بسلكيه الإعدادي والتأهيلي)",
          url: "https://profpressma.blogspot.com/search/label/%D8%AA%D9%88%D8%B5%D9%8A%D9%81%D8%A7%D8%AA",
          size: "3.4 MB",
        },
        {
          id: "link-specs-3",
          title: "دليل معايير وشبكات التنقيط المعتمدة في تصحيح الاختبارات الكتابية",
          url: "https://profpressma.blogspot.com/search/label/%D8%AA%D9%88%D8%B5%D9%8A%D9%81%D8%A7%D8%AA",
          size: "1.5 MB",
        },
      ],
    },
    {
      id: "news",
      title: "مستجدات المباراة",
      subtitle: "الإعلانات والمذكرات الوزارية",
      iconName: "Megaphone",
      color: "orange",
      url: "https://profpressma.blogspot.com/search/label/%D9%85%D8%B3%D8%AA%D8%AC%D8%AF%D8%A7%D8%AA",
      author: "مديرية الموارد البشرية وتكوين الأطر",
      lastUpdated: "دورة 2026",
      writtenContent: `متابعة حصرية لكافة المذكرات التنظيمية، والقرارات الوزارية الصادرة عن وزارة التربية الوطنية والتعليم الأولي والرياضة بخصوص مباريات التوظيف:

1. الإعلان عن فتح باب الترشيحات رسمياً عبر البوابة المخصصة لمباريات التعليم.
2. توزيع المقاعد والمناصب الشاغرة بحسب الأكاديميات الجهوية للتربية والتكوين (AREF).
3. شروط الترشيح والانتقاء الأولي المعتمد (معايير الميزة وعدد سنوات الحصول على الإجازة).
4. الجدولة الزمنية الرسمية:
   - فترة التسجيل والمصادقة على الترشيحات الإلكترونية.
   - موعد إجراء الاختبارات الكتابية بمراكز الامتحانات.
   - تاريخ إعلان النتائج الكتابية ولوائح المقبولين لاجتياز الاختبارات الشفوية.
   - إجراء المقابلات الشفوية وإعلان النتائج النهائية ولوائح الانتظار.`,
      images: [
        {
          id: "img-news-1",
          url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&auto=format&fit=crop&q=80",
          caption: "الجدولة الزمنية الرسمية لمباريات التعليم وتوزيع المقاعد حسب الجهات",
        },
      ],
      downloadLinks: [
        {
          id: "link-news-1",
          title: "المذكرة الوزارية المنظمة لمباراة توظيف الأساتذة أطر الأكاديميات 2026",
          url: "https://profpressma.blogspot.com/search/label/%D9%85%D8%B3%D8%AA%D8%AC%D8%AF%D8%A7%D8%AA",
          size: "1.9 MB",
        },
        {
          id: "link-news-2",
          title: "جدول توزيع المناصب المفتوحة حسب كل أكاديمية جهوية والتخصصات",
          url: "https://profpressma.blogspot.com/search/label/%D9%85%D8%B3%D8%AA%D8%AC%D8%AF%D8%A7%D8%AA",
          size: "850 KB",
        },
      ],
    },
    {
      id: "registration",
      title: "وثائق التسجيل",
      subtitle: "الشروط وملف الترشيح",
      iconName: "Folder",
      color: "blue",
      url: "https://profpressma.blogspot.com/search/label/%D8%A7%D9%84%D8%AA%D8%B3%D8%AC%D9%8A%D9%84",
      author: "قسم تدبير المسار المهني - بروف بريس",
      lastUpdated: "دليل التسجيل الإلكتروني",
      writtenContent: `دليل شامل ومبسط لتجهيز ملف الترشيح لمباراة التعليم دون أي نقص لتفادي إلغاء الملف أثناء عملية التدقيق الإداري:

أولاً: الشروط النظامية للترشح:
- التوفر على الجنسية المغربية والتمتع بالحقوق الوطنية والمدنية.
- ألا يتجاوز سن المترشح السن القانوني المحدد في المذكرة الوزارية عند تاريخ إجراء المباراة.
- الحصول على شهادة الإجازة في التربية، أو الإجازة في الدراسات الأساسية أو المهنية أو ما يعادلها.
- ألا يكون المترشح مقيداً في السجل التأديبي أو محكوماً عليه بعقوبة مخلة بالشرف.

ثانياً: الوثائق المكونة للملف الرقمي:
1. وصل الترشيح الإلكتروني المستخرج من المنظومة والموقع من طرف المترشح.
2. نسخة واضحة من البطاقة الوطنية للتعريف الإلكترونية (CNIE).
3. نسخة من شهادة الإجازة أو الشهادة المعترف بمعادلتها لها.
4. نسخة من كشوف النقط المحصل عليها في سنوات الإجازة.
5. استمارة الترشيح مصادق عليها والالتزام التام بضوابط التكوين بالمركز الجهوي.`,
      images: [
        {
          id: "img-reg-1",
          url: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=900&auto=format&fit=crop&q=80",
          caption: "نموذج بطاقة ملف الترشيح وتجهيز الوثائق الإدارية المطلوبة",
        },
      ],
      downloadLinks: [
        {
          id: "link-reg-1",
          title: "استمارة الترشيح الخطية ونموذج الالتزام بالمصادقة (جاهز للطباعة)",
          url: "https://profpressma.blogspot.com/search/label/%D8%A7%D9%84%D8%AA%D8%B3%D8%AC%D9%8A%D9%84",
          size: "650 KB",
        },
        {
          id: "link-reg-2",
          title: "دليل خطوات التسجيل والمصادقة في البوابة الإلكترونية للمباريات خطوة بخطوة",
          url: "https://profpressma.blogspot.com/search/label/%D8%A7%D9%84%D8%AA%D8%B3%D8%AC%D9%8A%D9%84",
          size: "2.1 MB",
        },
      ],
    },
    {
      id: "interview",
      title: "المقابلة الشفوية",
      subtitle: "الاستعداد ونماذج الأسئلة",
      iconName: "MessageSquare",
      color: "purple",
      url: "https://profpressma.blogspot.com/search/label/%D8%A7%D9%84%D8%B4%D9%81%D9%88%D9%8A",
      author: "لجنة التكوين والتأهيل المهني - بروف بريس",
      lastUpdated: "دليل المقابلة 2026",
      writtenContent: `الاستعداد للاختبار الشفوي يتطلب خطة منهجية دقيقة توازن بين التمكن المعرفي وحسن التواصل وإدارة المواقف الصفية:

أولاً: سيناريو الاختبار الشفوي ومراحله:
1. سحب موضوع الوضعية التعليمية التعلمية (قرعة موضوع في الديداكتيك).
2. التحضير في قاعة مخصصة (ساعة كاملة لتحضير جذاذة ومحاكاة مقطع دراسي).
3. العرض أمام لجنة التحكيم (15 إلى 20 دقيقة لمحاكاة تقديم الدرس على السبورة).
4. مناقشة اللجنة (20 دقيقة من الأسئلة المتنوعة حول خياراتك الديداكتيكية والمعرفية).

ثانياً: أهم شبكات ومعايير التنقيط:
- الهندام والمظهر اللائق بأستاذ الغد والاتزان الانفعالي وثبات الصوت.
- سلامة اللغة المعتمدة في التدريس (الفصحى أو الفرنسية حسب التخصص) ووضوح المخارج.
- القدرة على التفاعل مع السبورة وتوظيف الوسائل البيداغوجية الحديثة.
- الإلمام بالمستجدات التربوية ونظريات التعلم وتشريعات الوظيفة العمومية وأخلاقيات المهنة.`,
      images: [
        {
          id: "img-oral-1",
          url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=900&auto=format&fit=crop&q=80",
          caption: "محاكاة وضعية ديدكتيكية وتقديم مقطع تعلمي أمام لجنة المقابلة الشفوية",
        },
      ],
      downloadLinks: [
        {
          id: "link-oral-1",
          title: "بنك الأسئلة الشائعة في المقابلات الشفوية مع الإجابات النموذجية المقترحة",
          url: "https://profpressma.blogspot.com/search/label/%D8%A7%D9%84%D8%B4%D9%81%D9%88%D9%8A",
          size: "3.1 MB",
        },
        {
          id: "link-oral-2",
          title: "شبكة تنقيط وتقييم المترشحين الرسمية المعتمدة لدى لجان التحكيم",
          url: "https://profpressma.blogspot.com/search/label/%D8%A7%D9%84%D8%B4%D9%81%D9%88%D9%8A",
          size: "920 KB",
        },
      ],
    },
  ],
  primaryNotice: "يجتاز المترشحون اختبارين: مواد التخصص وديداكتيكها، وعلوم التربية.",
  secondaryNotice:
    "ملاحظة هامة: يجتاز أساتذة التعليم الثانوي اختبارات في (مادة التخصص، ديداكتيك مادة التخصص، وعلوم التربية). اختر تخصصك من القائمة أدناه للوصول إلى الموارد.",
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
          subtitle: "نظريات التعلم والمستجدات",
          type: "knowledge",
          iconName: "BookOpen",
          contentSummary:
            "تلخيص شامل للنظريات السلوكية، البنائية، السوسيوبنائية، الجشطالتية، المعرفية والذكاءات المتعددة، مع محطات إصلاح منظومة التربية والتكوين بالمغرب (الرؤية الاستراتيجية 2015-2030 وخارطة الطريق 2022-2026).",
        },
        {
          id: "pse_sum",
          title: "ملخصات مركزة",
          subtitle: "خرائط ذهنية وخطاطات",
          type: "summaries",
          iconName: "FileText",
          contentSummary:
            "خرائط ذهنية تجمع المفاهيم الأساسية: المثلث الديداكتيكي، العقد الديداكتيكي، النقل الديداكتيكي، والعوائق البيداغوجية، مع ملخص بيداغوجيات الخطأ، المشروع، الفارقية، وحل المشكلات.",
        },
        {
          id: "pse_exams",
          title: "نماذج اختبارات",
          subtitle: "امتحانات السنوات السابقة",
          type: "exams",
          iconName: "FileText",
          contentSummary:
            "مواضيع اختبارات علوم التربية مع عناصر الإجابة الرسمية للسنوات: دورات 2024، 2023، 2022، 2021، 2020.",
        },
        {
          id: "pse_mock",
          title: "اختبار تجريبي",
          subtitle: "محاكاة للامتحان",
          type: "mock",
          iconName: "Laptop",
          contentSummary: "اختبار تجريبي تفاعلي بنظام العداد لمحاكاة أجواء المباراة الرسمية وتقييم سرعة ودقة الإجابة.",
        },
        {
          id: "pse_qcm",
          title: "قيم مستواك (QCM)",
          subtitle: "أسئلة متعددة الاختيارات",
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
          subtitle: "قواعد، صرف وتحويل، إملاء",
          type: "knowledge",
          iconName: "CheckCircle2",
          contentSummary:
            "مراجعة شاملة في النحو والصرف: المنصوبات (المفاعيل، الحال، التمييز، المستثنى)، التوابع، النواسخ، الميزان الصرفي، وقواعد الإملاء المعتمدة في التوصيف الوزاري.",
        },
        {
          id: "pa_did",
          title: "ديداكتيك المادة",
          subtitle: "جذاذات ومنهجية التدريس",
          type: "didactics",
          iconName: "School",
          contentSummary:
            "منهجية تدريس مكونات اللغة العربية بالتعليم الابتدائي: القراءة المقطعية، الاستماع والتحدث، الظواهر اللغوية (ضمنية وصريحة)، الكتابة والإنتاج الكتابي، ومشروع الوحدة.",
        },
        {
          id: "pa_exams",
          title: "نماذج اختبارات",
          subtitle: "امتحانات السنوات السابقة",
          type: "exams",
          iconName: "FileText",
          contentSummary: "امتحانات مادة التخصص وديداكتيك اللغة العربية للتعليم الابتدائي لجميع الدورات السابقة مع التصحيح.",
        },
        {
          id: "pa_mock",
          title: "اختبار تجريبي",
          subtitle: "محاكاة للامتحان",
          type: "mock",
          iconName: "Laptop",
          contentSummary: "محاكاة لاختبار مادة التخصص في اللغة العربية تشمل تحليلاً ديداكتيكياً لجذاذة درس مع أسئلة ضبط النص بالشكل التام.",
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
          subtitle: "Grammaire, Conjugaison...",
          type: "knowledge",
          iconName: "BookOpen",
          contentSummary:
            "Synthèse complète: Grammaire fonctionnelle, Concordance des temps, Subjonctif, Voix passive, Lexique et Orthographe grammaticale selon le cadre de référence officiel.",
        },
        {
          id: "pf_did",
          title: "ديداكتيك المادة",
          subtitle: "Didactique du français",
          type: "didactics",
          iconName: "School",
          contentSummary:
            "Démarche méthodologique des activités: Communication et actes de langage, Lecture (Décodage et compréhension), Écriture/Production de l'écrit, et les étapes d'une fiche pédagogique.",
        },
        {
          id: "pf_exams",
          title: "نماذج اختبارات",
          subtitle: "امتحانات السنوات السابقة",
          type: "exams",
          iconName: "FileText",
          contentSummary: "Sujets du concours de recrutement de français primaire avec les corrigés indicatifs des sessions 2020-2024.",
        },
        {
          id: "pf_mock",
          title: "اختبار تجريبي",
          subtitle: "محاكاة للامتحان",
          type: "mock",
          iconName: "Laptop",
          contentSummary: "Test blanc chronométré portant sur l'analyse de texte, questions de langue et élaboration d'une fiche de remédiation.",
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
              options: ["prenons", "prenions", "prendrons", "prenions"],
              correctIndex: 1,
              explanation: "Le subjonctif présent du verbe prendre avec la première personne du pluriel est 'prenions'.",
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
          subtitle: "الحساب، الهندسة، القياس",
          type: "knowledge",
          iconName: "Calculator",
          contentSummary:
            "الأعداد والحساب (الأعداد الكسرية والعشرية والنسبية)، التناسبية والنسبة المئوية والسرعة المتوسطة، الهندسة المستوية والفضائية، ووحدات قياس السعة والكتلة والمساحة والحجم.",
        },
        {
          id: "pm_did",
          title: "ديداكتيك المادة",
          subtitle: "منهجية تدريس الرياضيات",
          type: "didactics",
          iconName: "School",
          contentSummary:
            "مراحل الدرس الرياضي بالابتدائي: مرحلة البناء والترييض، التقويم، والدعم. معالجة الصعوبات والمفاهيم العائقة ونظرية الوضعيات الديداكتيكية لبروسو (Brousseau).",
        },
        {
          id: "pm_exams",
          title: "نماذج اختبارات",
          subtitle: "امتحانات السنوات السابقة",
          type: "exams",
          iconName: "FileText",
          contentSummary: "نماذج امتحانات مادة التخصص وديداكتيك الرياضيات لسلك التعليم الابتدائي مع شبكات التصحيح وسلم التنقيط.",
        },
        {
          id: "pm_mock",
          title: "اختبار تجريبي",
          subtitle: "محاكاة للامتحان",
          type: "mock",
          iconName: "Laptop",
          contentSummary: "اختبار تجريبي شامل يتضمن حل مسائل رياضية وتحليل تمثلات المتعلمين وصياغة وضعية مشكلة ديداكتيكية.",
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
          subtitle: "الفيزياء، الكيمياء، علوم الحياة",
          type: "knowledge",
          iconName: "Sparkles",
          contentSummary:
            "الكائنات الحية ووظائفها، السلاسل الغذائية، التوالد والتنفس والنمو، المادة وخصائصها، التحولات الفيزيائية والكيميائية، الكهرباء والمغناطيس، والفلك وعلوم الأرض.",
        },
        {
          id: "psc_did",
          title: "ديداكتيك المادة",
          subtitle: "نهج التقصي العلمي",
          type: "didactics",
          iconName: "School",
          contentSummary:
            "خطوات نهج التقصي العلمي بالنشاط العلمي: وضعية الانطلاق، صياغة سؤال التقصي، تقديم الفرضيات، اختبار الفرضيات، التوثيق والاستنتاج، وتدوين المكتسبات بدفتر التقصي.",
        },
        {
          id: "psc_exams",
          title: "نماذج اختبارات",
          subtitle: "امتحانات السنوات السابقة",
          type: "exams",
          iconName: "FileText",
          contentSummary: "امتحانات السنوات السابقة في التخصص وديداكتيك النشاط العلمي مع الحلول المفصلة.",
        },
        {
          id: "psc_mock",
          title: "اختبار تجريبي",
          subtitle: "محاكاة للامتحان",
          type: "mock",
          iconName: "Laptop",
          contentSummary: "محاكاة لاختبار النشاط العلمي مع جذاذة تطبيقية تعتمد نهج التقصي في موضوع الطاقة أو التغذية.",
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
          subtitle: "قواعد وحروف تيفيناغ",
          type: "knowledge",
          iconName: "BookOpen",
          contentSummary:
            "أبجدية تيفيناغ المعتمدة رسمياً بالمغرب (IRCAM)، قواعد الإملاء وتطابق الصوامت والصوائت، علم الصرف والنحو الأمازيغي والمعاجم البيداغوجية.",
        },
        {
          id: "pam_did",
          title: "ديداكتيك المادة",
          subtitle: "منهجية التدريس",
          type: "didactics",
          iconName: "School",
          contentSummary:
            "ديداكتيك تدريس الأمازيغية بأسلاك الابتدائي، التدبير الديداكتيكي للمشافهة والقراءة والكتابة، والأنشطة الداعمة لترسيخ التعلمات.",
        },
        {
          id: "pam_exams",
          title: "نماذج اختبارات",
          subtitle: "امتحانات السنوات السابقة",
          type: "exams",
          iconName: "FileText",
          contentSummary: "امتحانات تخصص اللغة الأمازيغية ومواضيع الديداكتيك لمباريات أطر التدريس للسنوات السابقة.",
        },
        {
          id: "pam_mock",
          title: "اختبار تجريبي",
          subtitle: "محاكاة للامتحان",
          type: "mock",
          iconName: "Laptop",
          contentSummary: "محاكاة لاختبار مادة التخصص والديداكتيك لأساتذة تخصص اللغة الأمازيغية.",
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
          ],
        },
      ],
    },

    // ==========================================
    // 2. SECONDARY SUBJECTS (التعليم الثانوي)
    // ==========================================
    {
      id: "sec_arabic",
      title: "اللغة العربية (التأهيلي والإعدادي)",
      cycle: "secondary",
      iconName: "BookOpen",
      colorScheme: "blue",
      actions: [
        { id: "sa_know", title: "معارف المادة", subtitle: "علوم اللغة والأدب", type: "knowledge", iconName: "BookOpen" },
        { id: "sa_did", title: "ديداكتيك المادة", subtitle: "منهجية النصوص والتعبير", type: "didactics", iconName: "School" },
        { id: "sa_sci", title: "علوم التربية", subtitle: "مستجدات وبيداغوجيا", type: "knowledge", iconName: "Brain" },
        { id: "sa_exams", title: "نماذج اختبارات", subtitle: "امتحانات السنوات السابقة", type: "exams", iconName: "FileText" },
        { id: "sa_mock", title: "اختبار تجريبي", subtitle: "محاكاة للامتحان", type: "mock", iconName: "Laptop" },
      ],
    },
    {
      id: "sec_french",
      title: "اللغة الفرنسية (التأهيلي والإعدادي)",
      cycle: "secondary",
      iconName: "Languages",
      colorScheme: "purple",
      actions: [
        { id: "sf_know", title: "معارف المادة", subtitle: "Littérature et linguistique", type: "knowledge", iconName: "BookOpen" },
        { id: "sf_did", title: "ديداكتيك المادة", subtitle: "Didactique du FLE/FLS", type: "didactics", iconName: "School" },
        { id: "sf_sci", title: "علوم التربية", subtitle: "Sciences de l'éducation", type: "knowledge", iconName: "Brain" },
        { id: "sf_exams", title: "نماذج اختبارات", subtitle: "Annales du concours", type: "exams", iconName: "FileText" },
        { id: "sf_mock", title: "اختبار تجريبي", subtitle: "Examen blanc", type: "mock", iconName: "Laptop" },
      ],
    },
    {
      id: "sec_english",
      title: "اللغة الإنجليزية (التأهيلي والإعدادي)",
      cycle: "secondary",
      iconName: "Globe",
      colorScheme: "rose",
      actions: [
        { id: "se_know", title: "معارف المادة", subtitle: "Linguistics & Literature", type: "knowledge", iconName: "BookOpen" },
        { id: "se_did", title: "ديداكتيك المادة", subtitle: "TEFL Methodology", type: "didactics", iconName: "School" },
        { id: "se_sci", title: "علوم التربية", subtitle: "Educational Sciences", type: "knowledge", iconName: "Brain" },
        { id: "se_exams", title: "نماذج اختبارات", subtitle: "Past Exam Papers", type: "exams", iconName: "FileText" },
        { id: "se_mock", title: "اختبار تجريبي", subtitle: "Mock Exam Simulator", type: "mock", iconName: "Laptop" },
      ],
    },
    {
      id: "sec_math",
      title: "الرياضيات (التأهيلي والإعدادي)",
      cycle: "secondary",
      iconName: "Calculator",
      colorScheme: "cyan",
      actions: [
        { id: "sm_know", title: "معارف المادة", subtitle: "الجبر، التحليل، الهندسة", type: "knowledge", iconName: "Calculator" },
        { id: "sm_did", title: "ديداكتيك المادة", subtitle: "ديداكتيك الرياضيات بالثانوي", type: "didactics", iconName: "School" },
        { id: "sm_sci", title: "علوم التربية", subtitle: "نظريات التعلم والتقويم", type: "knowledge", iconName: "Brain" },
        { id: "sm_exams", title: "نماذج اختبارات", subtitle: "امتحانات السنوات السابقة", type: "exams", iconName: "FileText" },
        { id: "sm_mock", title: "اختبار تجريبي", subtitle: "محاكاة للامتحان", type: "mock", iconName: "Laptop" },
      ],
    },
    {
      id: "sec_physics",
      title: "الفيزياء والكيمياء (التأهيلي والإعدادي)",
      cycle: "secondary",
      iconName: "Sparkles",
      colorScheme: "purple",
      actions: [
        { id: "sp_know", title: "معارف المادة", subtitle: "الميكانيك، الكهرباء، الكيمياء", type: "knowledge", iconName: "Sparkles" },
        { id: "sp_did", title: "ديداكتيك المادة", subtitle: "التجريب والمحاكاة بالفيزياء", type: "didactics", iconName: "School" },
        { id: "sp_sci", title: "علوم التربية", subtitle: "مفاهيم ومستجدات التربية", type: "knowledge", iconName: "Brain" },
        { id: "sp_exams", title: "نماذج اختبارات", subtitle: "امتحانات السنوات السابقة", type: "exams", iconName: "FileText" },
        { id: "sp_mock", title: "اختبار تجريبي", subtitle: "محاكاة للامتحان", type: "mock", iconName: "Laptop" },
      ],
    },
    {
      id: "sec_svt",
      title: "علوم الحياة والأرض (التأهيلي والإعدادي)",
      cycle: "secondary",
      iconName: "Sparkles",
      colorScheme: "emerald",
      actions: [
        { id: "ssvt_know", title: "معارف المادة", subtitle: "الجيولوجيا، علم الوراثة، المناعة", type: "knowledge", iconName: "Sparkles" },
        { id: "ssvt_did", title: "ديداكتيك المادة", subtitle: "التقصي والملاحظة المجهرية", type: "didactics", iconName: "School" },
        { id: "ssvt_sci", title: "علوم التربية", subtitle: "علوم التربية والديداكتيك", type: "knowledge", iconName: "Brain" },
        { id: "ssvt_exams", title: "نماذج اختبارات", subtitle: "امتحانات السنوات السابقة", type: "exams", iconName: "FileText" },
        { id: "ssvt_mock", title: "اختبار تجريبي", subtitle: "محاكاة للامتحان", type: "mock", iconName: "Laptop" },
      ],
    },
    {
      id: "sec_history_geo",
      title: "الاجتماعيات (تاريخ وجغرافيا)",
      cycle: "secondary",
      iconName: "Compass",
      colorScheme: "amber",
      actions: [
        { id: "shg_know", title: "معارف المادة", subtitle: "التاريخ، الجغرافيا، التربية على المواطنة", type: "knowledge", iconName: "BookOpen" },
        { id: "shg_did", title: "ديداكتيك المادة", subtitle: "النهج التاريخي والجغرافي", type: "didactics", iconName: "School" },
        { id: "shg_sci", title: "علوم التربية", subtitle: "البيداغوجيا الحديثة والتقويم", type: "knowledge", iconName: "Brain" },
        { id: "shg_exams", title: "نماذج اختبارات", subtitle: "امتحانات السنوات السابقة", type: "exams", iconName: "FileText" },
        { id: "shg_mock", title: "اختبار تجريبي", subtitle: "محاكاة للامتحان", type: "mock", iconName: "Laptop" },
      ],
    },
    {
      id: "sec_islamic",
      title: "التربية الإسلامية (التأهيلي والإعدادي)",
      cycle: "secondary",
      iconName: "BookOpen",
      colorScheme: "teal",
      actions: [
        { id: "si_know", title: "معارف المادة", subtitle: "القرآن، التفسير، الفقه، السيرة", type: "knowledge", iconName: "BookOpen" },
        { id: "si_did", title: "ديداكتيك المادة", subtitle: "مداخل التربية الإسلامية الخمسة", type: "didactics", iconName: "School" },
        { id: "si_sci", title: "علوم التربية", subtitle: "سيكولوجيا المراهق والتربية", type: "knowledge", iconName: "Brain" },
        { id: "si_exams", title: "نماذج اختبارات", subtitle: "امتحانات السنوات السابقة", type: "exams", iconName: "FileText" },
        { id: "si_mock", title: "اختبار تجريبي", subtitle: "محاكاة للامتحان", type: "mock", iconName: "Laptop" },
      ],
    },
    {
      id: "sec_philosophy",
      title: "الفلسفة (التأهيلي)",
      cycle: "secondary",
      iconName: "Brain",
      colorScheme: "rose",
      actions: [
        { id: "sph_know", title: "معارف المادة", subtitle: "تاريخ الفلسفة والمفاهيم الكبرى", type: "knowledge", iconName: "BookOpen" },
        { id: "sph_did", title: "ديداكتيك المادة", subtitle: "أشكلة النص الفلسفي والمناقشة", type: "didactics", iconName: "School" },
        { id: "sph_sci", title: "علوم التربية", subtitle: "نظريات التربية والتكوين", type: "knowledge", iconName: "Brain" },
        { id: "sph_exams", title: "نماذج اختبارات", subtitle: "امتحانات السنوات السابقة", type: "exams", iconName: "FileText" },
        { id: "sph_mock", title: "اختبار تجريبي", subtitle: "محاكاة للامتحان", type: "mock", iconName: "Laptop" },
      ],
    },

    // ==========================================
    // 3. OTHER SPECIALTIES (تخصصات أخرى)
    // ==========================================
    {
      id: "other_sport",
      title: "التربية البدنية والرياضية",
      cycle: "other",
      iconName: "Activity",
      colorScheme: "orange",
      actions: [
        { id: "os_know", title: "الديداكتيك والمعارف", subtitle: "الفيزيولوجيا والمناهج الرياضية", type: "didactics", iconName: "Activity" },
        { id: "os_exams", title: "نماذج الاختبارات", subtitle: "مواضيع السنوات السابقة", type: "exams", iconName: "FileText" },
      ],
    },
    {
      id: "other_info",
      title: "المعلوميات (Informatique)",
      cycle: "other",
      iconName: "Laptop",
      colorScheme: "teal",
      actions: [
        { id: "oi_know", title: "الديداكتيك والمعارف", subtitle: "الخوارزميات، البرمجة، والشبكات", type: "didactics", iconName: "Laptop" },
        { id: "oi_exams", title: "نماذج الاختبارات", subtitle: "مواضيع السنوات السابقة", type: "exams", iconName: "FileText" },
      ],
    },
    {
      id: "other_tech",
      title: "التكنولوجيا (Technologie)",
      cycle: "other",
      iconName: "Settings",
      colorScheme: "blue",
      actions: [
        { id: "ot_know", title: "الديداكتيك والمعارف", subtitle: "الهندسة الميكانيكية والكهربائية", type: "didactics", iconName: "Settings" },
        { id: "ot_exams", title: "نماذج الاختبارات", subtitle: "مواضيع السنوات السابقة", type: "exams", iconName: "FileText" },
      ],
    },
    {
      id: "other_eco",
      title: "الاقتصاد والتدبير",
      cycle: "other",
      iconName: "TrendingUp",
      colorScheme: "purple",
      actions: [
        { id: "oe_know", title: "الديداكتيك والمعارف", subtitle: "المحاسبة، التدبير، والاقتصاد العام", type: "didactics", iconName: "TrendingUp" },
        { id: "oe_exams", title: "نماذج الاختبارات", subtitle: "مواضيع السنوات السابقة", type: "exams", iconName: "FileText" },
      ],
    },
  ],
};
