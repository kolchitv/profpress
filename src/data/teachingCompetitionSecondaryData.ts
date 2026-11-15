import type { CompetitionSubject, CompetitionDownloadFile } from "./teachingCompetitionData";

export const VERIFIED_COMPETITION_LINKS = {
  profpressConcours: "https://www.profpress.net/p/concours-de-lenseignement.html",
  profpressEduFolder: "https://drive.google.com/drive/folders/1jKb0mO3hMHUQw-lqEhRcSDdw78vaQvfD",
  profpressEduPresentation2025: "https://drive.google.com/file/d/1EvV1SQivTBvnTRFZ52cQgovdJ7KaDdIw/view",
  profpressEduCorrect2012_2024: "https://drive.google.com/file/d/1rNfap-c5XeT-Ltohv49Zy8AeQzTsZSqR/view",
  profpressEduSummariesPdf: "https://drive.google.com/file/d/1PwTIoU21qWjpKHnOYA-npA7QYL1IA4Dz/view",
  profpressEduGuideAllCycles: "https://drive.google.com/file/d/1OYdtoTPp4QYvSiakfA0RUovpzk8rx-Ws/view?usp=sharing",
  profpressEduWordDoc: "https://www.mediafire.com/file/e9eoafpqo0eoh28/%D8%A3%D8%AD%D8%B3%D9%86+%D8%AA%D9%84%D8%AE%D9%8A%D8%B5+%D9%84%D9%85%D8%A7%D8%AF%D8%A9+%D8%B9%D9%84%D9%88%D9%85+%D8%A7%D9%84%D8%AA%D8%B1%D8%A8%D9%8A%D8%A9.doc",
  profpressPedagogicalGuide: "https://drive.google.com/file/d/1Um3evpxgxekP4i58GLGU_zw_Dwa16DWC/view",
  profpressActivePedagogies: "https://drive.google.com/file/d/1-xKpJgYE2gLJs13_OaM_430iw4xHDxHa/view",
  profpressIntroDidactics: "https://drive.google.com/file/d/1xeHiE-tYTH2DYupoKst9yIwSFquOT_om/view",
  profpressLoiCadrePdf: "https://www.mediafire.com/file/vz2yzv44pv5phrx/%25D9%2585%25D9%2584%25D8%25AE%25D8%25B5_%25D8%25A7%25D9%2584%25D9%2582%25D8%25A7%25D9%2586%25D9%2588%25D9%2586_%25D8%25A7%25D9%2584%25D8%25A5%25D8%25B7%25D8%25A7%25D8%25B1.pdf/file",
  profpressTrainingsFolder: "https://drive.google.com/drive/folders/1h5vkujLIT6bIUSLiFwRNTHGx7rpmBvNr",
  profpressPortfolioWord: "https://www.profpress.net/2020/10/portfolio-word.html",
  profpressIslamicExams: "https://drive.google.com/file/d/1rZnYE8YmCIa8db878H9IKXHdRYkpyVmZ/view",
  profpressIslamicLessons: "https://drive.google.com/drive/folders/1I_ksyFOZFkG3JpPo5s2oxMQ2_o9zRKLC?usp=sharing",
  profpressArabicTextTypes: "https://drive.google.com/file/d/13-KVN58VOqqJMCGCBZGyXxbfMxnHvcAT/view",
  profpressMathSingapore: "https://drive.google.com/file/d/1hI_8cQVj8tcBssIoKPf2vefIZTHEz45T/view",
  profpressScienceDidactics: "https://drive.google.com/file/d/15GA60feF-iNWD-E_Vr50LtpZZQPH0MgL/view",
  profpressRegularActivities: "https://drive.google.com/file/d/1F8WWweHfpjrxBOZpOWKHRxpypHJCF7wA/view",
  profpressHighSchoolStreams: "https://drive.google.com/file/d/1TZxrO-uZvpFmhAaxKUzTs1sw545OZ6SQ/view",
  menOfficial: "https://www.men.gov.ma",
  menSpecs2026: "https://www.men.gov.ma/Ar/Pages/Publication.aspx?IDPublication=7405",
  woloujPortal: "https://wolouj.men.gov.ma",
};

function buildSecondaryEduScienceFiles(subjectLabel: string): CompetitionDownloadFile[] {
  return [
    {
      id: "sec_sci_f1",
      title: `توصيف اختبار علوم التربية للسلك الثانوي 2026 - ${subjectLabel}`,
      size: "1.4 MB",
      year: "2026",
      fileType: "PDF",
      url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
      isExternal: true,
    },
    {
      id: "sec_sci_f2",
      title: "كتيب التصحيح الرسمي لامتحانات علوم التربية (2012 - 2024) جميع الأسلاك",
      size: "4.6 MB",
      year: "محين 2026",
      fileType: "PDF",
      url: VERIFIED_COMPETITION_LINKS.profpressEduCorrect2012_2024,
      isExternal: true,
    },
    {
      id: "sec_sci_f3",
      title: "عرض شامل ومحين حول علوم التربية ومستجدات خارطة الطريق 2022-2026",
      size: "2.3 MB",
      year: "2025/2026",
      fileType: "PDF",
      url: VERIFIED_COMPETITION_LINKS.profpressEduPresentation2025,
      isExternal: true,
    },
    {
      id: "sec_sci_f4",
      title: "أحسن تلخيص لمادة علوم التربية قابل للتعديل (ملف Word)",
      size: "1.1 MB",
      year: "Word",
      fileType: "Word",
      url: VERIFIED_COMPETITION_LINKS.profpressEduWordDoc,
      isExternal: true,
    },
  ];
}

const SECONDARY_EDU_SCIENCE_ARTICLE = `## اختبار علوم التربية ومستجدات المنظومة التربوية (التعليم الثانوي 2026)

يركز اختبار علوم التربية في مباريات ولوج سلك تأهيل أساتذة التعليم الثانوي (الإعدادي والتأهيلي) على كفايات الفهم التربوي، التشريع المدرسي، وسيكولوجيا المراهق.

### 1. المحاور المقررة وفق التوصيف الرسمي 2026
- **نظريات التعلم وتطبيقاتها الصفية:** السلوكية (واطسون، سكينر)، الجشطالتية، البنائية (بياجيه)، السوسيوبنائية (فيغوتسكي)، والذكاءات المتعددة (غاردنر).
- **سيكولوجيا النمو والمراهق:** الخصائص النمائية والمعرفية والوجدانية لمتعلمي السلك الإعدادي والتأهيلي، وطرق تدبير التفاعلات الصفية والنزاعات المدرسية.
- **مقاربات وبيداغوجيات التدريس:** المقاربة بالكفايات، بيداغوجيا حل المشكلات، بيداغوجيا المشروع، البيداغوجيا الفارقية، وبيداغوجيا الخطأ، إضافة إلى ممارسات **التعليم الصريح** في الإعداديات الرائدة.
- **منظومة التقويم التربوي:** التقويم التشخيصي، التكويني، والإجمالي، وبناء شبكات التصحيح ومعالجة التعثرات.
- **التشريع والمرجعيات الإصلاحية:** القانون الإطار 51.17، الرؤية الاستراتيجية 2015-2030، خارطة الطريق 2022-2026، ومشروع الإعداديات الرائدة.

### 2. نصائح منهجية للتفوق في الامتحان الكتابي
1. احرص على ربط كل نظرية تعلمية بمثال تطبيقي من مادة تخصصك.
2. راجع المصطلحات التربوية باللغتين العربية والفرنسية تحسباً لأسئلة QCM والوضعيات المركبة.
3. يمكنك تحميل الملخص بصيغة Word أو PDF من الروابط المرفقة أسفله أو عبر أزرار التصدير المباشر بالأعلى.`;

export const SECONDARY_AND_OTHER_SUBJECTS: CompetitionSubject[] = [
  // 1. اللغة العربية ثانوي
  {
    id: "sec_arabic",
    title: "اللغة العربية (التأهيلي والإعدادي)",
    cycle: "secondary",
    iconName: "BookOpen",
    colorScheme: "blue",
    actions: [
      {
        id: "sa_know",
        title: "معارف المادة",
        subtitle: "علوم اللغة والأدب والنقد",
        type: "knowledge",
        iconName: "BookOpen",
        author: "فريق التخصصات الأدبية - بروف بريس",
        lastUpdated: "دورة 2026",
        contentSummary:
          "مراجعة شاملة لمجالات التخصص في اللغة العربية بالثانوي: النحو والصرف والعروض، البلاغة العربية، تاريخ الأدب العربي القديم والحديث، ومناهج النقد الأدبي الحديث (البنيوية، السيميائيات، المنهج الاجتماعي).",
        articleContent: `## الدليل المعرفي لمباراة التعليم الثانوي — تخصص اللغة العربية 2026

يشمل اختبار التخصص في اللغة العربية للتعليم الثانوي الإعدادي والتأهيلي أربعة حقول معرفية متكاملة:

### أولاً: علوم اللغة (النحو، الصرف، الإملاء، العروض)
- **النحو العربي:** الإعراب والبناء، التوابع، المنصوبات (المفاعيل الخمسة، الحال، التمييز، المستثنى)، المجرورات والإضافة، الجمل التي لها محل من الإعراب والتي لا محل لها.
- **الصرف والاشتقاق:** الميزان الصرفي، أبنية المصادر والمشتقات، الإعلال والإبدال، والجموع القياسية والسماعية.
- **العروض والقافية:** البحور الشعرية الستة عشر، الزحافات والعلل، والتقطيع العروضي التطبيقي.

### ثانياً: البلاغة والأدب العربي
- **البلاغة:** علم البيان (التشبيه، الاستعارة، المجاز، الكناية)، علم البديع (الطباق، الجناس، السجع، المقابلة)، وعلم المعاني (الخبر والإنشاء، القصر، الإيجاز والإطناب).
- **الأدب القديم:** الشعر الجاهلي والإسلامي والأموي والعباسي، النثر الفني (الرسائل، الخطابة، المقامات).
- **الأدب الحديث:** إحياء النموذج، سؤال الذات، تكسير البنية وتجديد الرؤيا، القصة القصيرة، المسرحية، والرواية العربية والمغربية.

### ثالثاً: المناهج النقدية الحديثة
- المنهج التاريخي والنفسي والاجتماعي، ثم المناهج النسقية (البنيوية، السيميائية، التداولية، وجمالية التلقي).`,
        downloadFiles: [
          {
            id: "sa_know_f1",
            title: "ملخص أنماط النصوص ومؤشراتها البلاغية والأسلوبية (PDF)",
            size: "1.3 MB",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressArabicTextTypes,
            isExternal: true,
          },
          {
            id: "sa_know_f2",
            title: "بطاقة توصيف مادة التخصص اللغة العربية - دورة 2026 (PDF)",
            size: "1.6 MB",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
            isExternal: true,
          },
          {
            id: "sa_know_f3",
            title: "تجميعية ملخصات النحو والصرف والمناهج النقدية (حقيبة Drive)",
            size: "8.5 MB",
            year: "محين",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressTrainingsFolder,
            isExternal: true,
          },
        ],
      },
      {
        id: "sa_did",
        title: "ديداكتيك المادة",
        subtitle: "منهجية النصوص والتعبير والإنشاء",
        type: "didactics",
        iconName: "School",
        author: "لجنة الديداكتيك - بروف بريس",
        lastUpdated: "دورة 2026",
        contentSummary:
          "هندسة تدريس مكونات اللغة العربية بالثانوي الإعدادي والتأهيلي: القراءة المنهجية للنصوص الأدبية والشعرية والمؤلفات، تدريس علوم اللغة، والتعبير والإنشاء وفق المقاربة بالكفايات والتوجيهات التربوية 2026.",
        articleContent: `## ديداكتيك اللغة العربية بالسلك الثانوي (الإعدادي والتأهيلي)

### 1. تدريس مكون النصوص (القراءة المنهجية)
يمر درس النصوص بالثانوي عبر أربع خطوات مهيكلة:
1. **تأطير النص:** ملاحظة العتبات وصياغة فرضية القراءة.
2. **فهم النص:** استخراج المضامين والوحدات الدلالية والقضايا المركزية.
3. **تحليل النص:** دراسة المعجم والحقول الدلالية، البنية الإيقاعية والصور الشعرية أو الخصائص الحجاجية والأسلوبية.
4. **التركيب والتقويم:** تجميع النتائج وتمحيص الفرضية وإبداء الرأي الشخصي.

### 2. تدريس مكون المؤلفات (الثانوي التأهيلي)
- القراءة التوجيهية، القراءة التحليلية (المتن الحكائي، الشخصيات، الفضاء، المنظور السردي/النسق النقدي)، والقراءة التركيبية.

### 3. مكون التعبير والإنشاء وعلوم اللغة
- بناء مهارات التحليل والمقارنة والربط والكتابة الحجاجية عبر أربع حصص (الاكتساب، التطبيق، الإنتاج، التصحيح والدعم).
- تدريس الظواهر اللغوية انطلاقاً من أمثلة منتقاة بالبناء الاستقرائي وتوظيفها في سياقات تواصلية حقيقية.`,
        downloadFiles: [
          {
            id: "sa_did_f1",
            title: "توصيف ديداكتيك اللغة العربية بالتعليم الثانوي 2026 (PDF)",
            size: "1.4 MB",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
            isExternal: true,
          },
          {
            id: "sa_did_f2",
            title: "تلخيص المدخل إلى علم التدريس وبناء الجذاذات (PDF)",
            size: "2.1 MB",
            year: "محين",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressIntroDidactics,
            isExternal: true,
          },
        ],
      },
      {
        id: "sa_sci",
        title: "علوم التربية",
        subtitle: "مستجدات وبيداغوجيا الثانوي",
        type: "knowledge",
        iconName: "Brain",
        author: "فريق التحرير البيداغوجي - بروف بريس",
        lastUpdated: "دورة 2026",
        contentSummary:
          "محاور علوم التربية المقررة لمترشحي السلك الثانوي: نظريات التعلم، البيداغوجيات النشيطة، تدبير المراهقة، والتقويم التشخيصي والدعم، مع مراجع القانون الإطار 51.17 وخارطة الطريق 2022-2026.",
        articleContent: SECONDARY_EDU_SCIENCE_ARTICLE,
        downloadFiles: buildSecondaryEduScienceFiles("اللغة العربية"),
      },
      {
        id: "sa_exams",
        title: "نماذج اختبارات",
        subtitle: "امتحانات السنوات السابقة مع التصحيح",
        type: "exams",
        iconName: "FileText",
        author: "أرشيف المباريات - بروف بريس",
        lastUpdated: "2018 - 2026",
        contentSummary:
          "تجميعية مواضيع اختبارات مادة اللغة العربية وديداكتيكها للتعليم الثانوي الإعدادي والتأهيلي للدورات السابقة مرفقة بعناصر الإجابة الرسمية وشبكات التنقيط.",
        articleContent: `## بنك امتحانات مباراة التعليم — اللغة العربية (السلك الثانوي)

تغطي الاختبارات الكتابية السابقة ثلاثة أبعاد رئيسية:
- **الشق المعرفي:** تحليل نص أدبي أو نقدي، استخراج البنية الإيقاعية والدلالية، والإجابة عن أسئلة التركيب والصرف والبلاغة.
- **الشق الديداكتيكي:** تخطيط مقطع تعليمي في مكون النصوص أو المؤلفات أو التعبير والإنشاء مع تحديد الكفايات والأنشطة ومعايير التقويم.
- **الاستعداد النموذجي:** احرص على طباعة الموضوع أو تصديره بصيغة Word/PDF والتدرب في ظرف زمني مضبوط (3 ساعات للتخصص والديداكتيك).`,
        downloadFiles: [
          {
            id: "sa_ex_f1",
            title: "تجميعية امتحانات اللغة العربية والديداكتيك (دورات 2018-2024 مع التصحيح)",
            size: "5.2 MB",
            year: "2024",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressConcours,
            isExternal: true,
          },
          {
            id: "sa_ex_f2",
            title: "كتيب التصحيح الرسمي لعلوم التربية لجميع الأسلاك (2012-2024)",
            size: "4.6 MB",
            year: "2024",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressEduCorrect2012_2024,
            isExternal: true,
          },
        ],
      },
      {
        id: "sa_mock",
        title: "اختبار تجريبي",
        subtitle: "محاكاة تفاعلية ووضعية ديداكتيكية",
        type: "mock",
        iconName: "Laptop",
        author: "لجنة التكوين - بروف بريس",
        lastUpdated: "دورة 2026",
        contentSummary:
          "اختبار تجريبي محاكي لدورة 2026 في اللغة العربية يتضمن وضعية تحليل نص شعري حديث وتصميم جذاذة في مكون التعبير والإنشاء، مع إمكانية التصدير بصيغة Word وPDF.",
        articleContent: `## نموذج اختبار تجريبي محاكي — اللغة العربية (دورة 2026)

### أولاً: الاختبار في التخصص الأدبي واللغوي (10 نقاط)
1. **القراءة النقدية:** حدد الإشكالية المحورية في توظيف الأسطورة داخل الشعر العربي المعاصر، مبرزاً خصائص المدرسة الرومانسية ومدرسة تكسير البنية.
2. **التطبيق اللغوي:** أعرب ما تحته خط، واضبط الأبيات بالشكل التام، وقطع البيت الشعري مبيناً بحره وتفعيلاته وزحافاته.

### ثانياً: الوضعيات الديداكتيكية (10 نقاط)
يواجه متعلمو الجذع المشترك صعوبة في التمييز بين الخبر والإنشاء وتوظيفهما في كتابة نص حجاجي.
- **المطلوب:** خطط مقطعاً ديداكتيكياً لعلاج هذا التعثر وفق خطوات المقاربة بالكفايات، مع تحديد الأهداف التعلمية، الوسائل، ومؤشرات التقويم.`,
        downloadFiles: [
          {
            id: "sa_mock_f1",
            title: "بوابة التسجيل والمقررات الرسمية للمباراة (Wolouj 2026)",
            size: "PDF",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
            isExternal: true,
          },
        ],
      },
      {
        id: "sa_qcm",
        title: "قيم مستواك (QCM)",
        subtitle: "اختبار تفاعلي في المادة والديداكتيك",
        type: "qcm",
        iconName: "CheckSquare",
        qcmQuestions: [
          {
            question: "ما البحر الشعري الذي تفعيلته الأساسية (مفاعلتن مفاعلتن فعولن)؟",
            options: ["البحر الكامل", "البحر الوافر", "البحر الطويل", "بحر الرجز"],
            correctIndex: 1,
            explanation: "البحر الوافر وزنه التام: مفاعلتن مفاعلتن مفاعلتن في كل شطر، ويستعمل مجزوءاً أو مقطوفاً (فعولن) غالباً.",
          },
          {
            question: "في القراءة المنهجية للنص بالثانوي، تأتي خطوة 'الملاحظة وصياغة الفرضية' في مرحلة:",
            options: ["التحليل", "تأطير النص", "التركيب", "التقويم الإجمالي"],
            correctIndex: 1,
            explanation: "تعتمد مرحلة تأطير النص على قراءة العتبات (العنوان، المصدر، البداية والنهاية) لبناء فرضية القراءة.",
          },
          {
            question: "أحد رواد المنهج البنيوي التكويني في النقد الأدبي العربي هو:",
            options: ["لوسيان غولدمان ومحمد بنيس", "نجيب العوفي في البنيوية التكوينية", "عباس محمود العقاد", "طه حسين"],
            correctIndex: 1,
            explanation: "يرتكز المنهج البنيوي التكويني (غولدمان، وفي النقد المغربي نجيب العوفي ولحاميداني) على مفهومي الفهم والتفسير ورؤية العالم.",
          },
        ],
      },
    ],
  },

  // 2. اللغة الفرنسية ثانوي
  {
    id: "sec_french",
    title: "اللغة الفرنسية (التأهيلي والإعدادي)",
    cycle: "secondary",
    iconName: "Languages",
    colorScheme: "purple",
    actions: [
      {
        id: "sf_know",
        title: "معارف المادة",
        subtitle: "Littérature, linguistique et œuvres",
        type: "knowledge",
        iconName: "BookOpen",
        author: "Équipe Didactique FLE - Profpress",
        lastUpdated: "Session 2026",
        contentSummary:
          "Synthèse complète : genres littéraires et mouvements (XIXe-XXe siècles), œuvres au programme du secondaire marocain, stylistique, pragmatique, morphosyntaxe et énonciation.",
        articleContent: `## Référentiel des savoirs académiques — Français Secondaire (2026)

### 1. Étude des genres et des œuvres au programme
- **Collège :** Nouvelle réaliste, récit policier, théâtre classique (Molière), correspondance et presse.
- **Tronc Commun :** Nouvelle fantastique (Maupassant, Gautier), nouvelle réaliste, comédie classique.
- **1ère Bac :** Roman autobiographique (*La Boîte à Merveilles*), tragédie moderne (*Antigone* de Jean Anouilh), roman à thèse (*Le Dernier Jour d'un Condamné*).
- **2ème Bac :** Conte philosophique (*Candide*), roman maghrébin contemporain (*Il était une fois un vieux couple heureux*), roman réaliste (*Le Père Goriot*).

### 2. Linguistique, grammaire et stylistique
- Analyse de l'énonciation (indices de subjectivité, discours rapporté, modalisation).
- Figures de style (analogie, substitution, opposition, amplification) et registres littéraires (tragique, pathétique, comique, ironique, polémique).
- Phonétique, lexicologie et cohérence/cohésion textuelle.`,
        downloadFiles: [
          {
            id: "sf_know_f1",
            title: "Cahier de cadrage et spécifications Français Secondaire 2026 (PDF)",
            size: "1.8 MB",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
            isExternal: true,
          },
          {
            id: "sf_know_f2",
            title: "Dossier complet : Littérature, linguistique et analyses d'œuvres (Drive)",
            size: "6.4 MB",
            year: "Actualisé",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressConcours,
            isExternal: true,
          },
        ],
      },
      {
        id: "sf_did",
        title: "ديداكتيك المادة",
        subtitle: "Didactique du FLE/FLS et séquences",
        type: "didactics",
        iconName: "School",
        author: "Commission Pédagogique - Profpress",
        lastUpdated: "Session 2026",
        contentSummary:
          "Planification par projet pédagogique et séquences d'apprentissage, démarche de la lecture méthodique, enseignement de la langue intégrée, production de l'écrit et évaluation par compétences.",
        articleContent: `## Didactique du Français au Cycle Secondaire (Collégial & Qualifiant)

### 1. Architecture d'un module et d'une séquence didactique
Le programme de français au secondaire s'articule autour de **modules** subdivisés en **séquences didactiques** de 4 à 6 heures intégrant :
- **Lecture méthodique** (observation, hypothèses de lecture, axes de lecture, synthèse).
- **Activité de langue** (démarche inductive : observation, conceptualisation, appropriation, réinvestissement).
- **Activité orale** (débat, jeu de rôle, exposé structuré).
- **Production écrite** (planification, mise en texte, révision à l'aide d'une grille critériée).

### 2. Pédagogie de l'erreur et remédiation
Dans les établissements pionniers du collège, l'évaluation diagnostique et la remédiation ciblée s'appuient sur la différenciation pédagogique et l'enseignement explicite des stratégies de compréhension.`,
        downloadFiles: [
          {
            id: "sf_did_f1",
            title: "Guide de la didactique du FLE et fiches pédagogiques types (PDF)",
            size: "2.2 MB",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressIntroDidactics,
            isExternal: true,
          },
        ],
      },
      {
        id: "sf_sci",
        title: "علوم التربية",
        subtitle: "Sciences de l'éducation",
        type: "knowledge",
        iconName: "Brain",
        author: "Profpress Pédagogie",
        lastUpdated: "Session 2026",
        contentSummary:
          "Théories de l'apprentissage, psychologie de l'adolescent, pédagogie active, transposition didactique, et cadre législatif de l'éducation nationale au Maroc.",
        articleContent: SECONDARY_EDU_SCIENCE_ARTICLE,
        downloadFiles: buildSecondaryEduScienceFiles("اللغة الفرنسية"),
      },
      {
        id: "sf_exams",
        title: "نماذج اختبارات",
        subtitle: "Annales du concours avec corrigés",
        type: "exams",
        iconName: "FileText",
        author: "Archives CRMEF - Profpress",
        lastUpdated: "2018 - 2026",
        contentSummary:
          "Annales des épreuves écrites de français (spécialité, didactique et sciences de l'éducation) accompagnées des éléments de correction officiels.",
        articleContent: `## Annales du Concours de Recrutement — Français Secondaire

Consultez les sujets des sessions antérieures (2018 à 2025) pour maîtriser le format mixte (QCM + questions ouvertes d'analyse textuelle et d'élaboration de fiches didactiques).`,
        downloadFiles: [
          {
            id: "sf_ex_f1",
            title: "Annales corrigées Français Secondaire (PDF)",
            size: "4.1 MB",
            year: "2024/2025",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressConcours,
            isExternal: true,
          },
          {
            id: "sf_ex_f2",
            title: "Recueil des corrigés officiels Sciences de l'Éducation (PDF)",
            size: "4.6 MB",
            year: "2012-2024",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressEduCorrect2012_2024,
            isExternal: true,
          },
        ],
      },
      {
        id: "sf_mock",
        title: "اختبار تجريبي",
        subtitle: "Examen blanc & fiche de remédiation",
        type: "mock",
        iconName: "Laptop",
        author: "Profpress FLE",
        lastUpdated: "Session 2026",
        contentSummary:
          "Sujet d'entraînement complet combinant analyse d'un extrait de roman à thèse et élaboration d'une fiche de langue sur les valeurs des temps du récit.",
        articleContent: `## Examen Blanc — Français Secondaire (Session 2026)

### Partie A : Étude littéraire et linguistique
Analysez les procédés d'argumentation et le registre pathétique dans *Le Dernier Jour d'un Condamné* (chapitre I à V), puis relevez les modalisateurs.

### Partie B : Mise en situation didactique
Concevez une fiche pédagogique de langue (1ère Bac) portant sur l'opposition imparfait / passé simple, en précisant les objectifs opérationnels et la grille d'évaluation formative.`,
        downloadFiles: [
          {
            id: "sf_mock_f1",
            title: "Note officielle et portail des spécifications 2026",
            size: "PDF",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
            isExternal: true,
          },
        ],
      },
      {
        id: "sf_qcm",
        title: "قيم مستواك (QCM)",
        subtitle: "Quiz interactif Français Secondaire",
        type: "qcm",
        iconName: "CheckSquare",
        qcmQuestions: [
          {
            question: "Dans l'approche par projets au lycée marocain, une séquence didactique vise prioritairement :",
            options: [
              "La mémorisation isolée de règles de grammaire",
              "L'intégration des activités de lecture, langue, oral et écrit autour d'une compétence ciblée",
              "La traduction mot à mot des textes littéraires",
              "L'évaluation uniquement en fin d'année",
            ],
            correctIndex: 1,
            explanation: "Le décloisonnement permet d'articuler lecture, langue, oral et production écrite au service d'une compétence précise.",
          },
          {
            question: "Qui a écrit la tragédie moderne 'Antigone' étudiée en 1ère année du Baccalauréat ?",
            options: ["Sophocle uniquement", "Jean Anouilh", "Voltaire", "Victor Hugo"],
            correctIndex: 1,
            explanation: "Jean Anouilh a réécrit le mythe antique d'Antigone en 1944 sous forme de tragédie moderne.",
          },
        ],
      },
    ],
  },

  // 3. اللغة الإنجليزية ثانوي
  {
    id: "sec_english",
    title: "اللغة الإنجليزية (التأهيلي والإعدادي)",
    cycle: "secondary",
    iconName: "Globe",
    colorScheme: "rose",
    actions: [
      {
        id: "se_know",
        title: "معارف المادة",
        subtitle: "Linguistics, Semantics & Literature",
        type: "knowledge",
        iconName: "BookOpen",
        author: "English TEFL Team - Profpress",
        lastUpdated: "2026 Session",
        contentSummary:
          "Comprehensive review of English linguistics (phonetics, morphology, syntax, semantics, pragmatics), discourse analysis, British/American literature, and Moroccan EFL curriculum standards.",
        articleContent: `## English Subject Knowledge Guide — CRMEF Secondary (2026)

### 1. Core Linguistics & Applied Grammar
- **Phonetics & Phonology:** Segmentals (IPA vowels, consonants, diphthongs) and suprasegmentals (word stress, sentence stress, intonation patterns).
- **Morphology & Syntax:** Derivational vs. inflectional morphemes, phrase structure, clause types, conditionals, modals, passive/causative structures, and reported speech.
- **Semantics & Pragmatics:** Speech act theory (Austin & Searle), Grice's Cooperative Principle, presupposition, and implicature.

### 2. Discourse & Cultural Knowledge
- Cohesion and coherence markers, genre conventions, and global themes in Moroccan secondary textbooks (*Ticket to English*, *Gateway to English*, *Insights into English*).`,
        downloadFiles: [
          {
            id: "se_know_f1",
            title: "CRMEF English Exam Specifications 2026 (MEN Official PDF)",
            size: "1.5 MB",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
            isExternal: true,
          },
          {
            id: "se_know_f2",
            title: "English Linguistics & TEFL Summary Pack (Profpress Archive)",
            size: "3.9 MB",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressConcours,
            isExternal: true,
          },
        ],
      },
      {
        id: "se_did",
        title: "ديداكتيك المادة",
        subtitle: "TEFL Methodology & Lesson Planning",
        type: "didactics",
        iconName: "School",
        author: "TEFL Pedagogy Unit - Profpress",
        lastUpdated: "2026 Session",
        contentSummary:
          "Moroccan Pedagogical Guidelines for EFL: Standards-Based Approach (5 Cs), Communicative Language Teaching, Task-Based Learning, PPP vs. ECRIF, and skills lesson stages (Pre / While / Post).",
        articleContent: `## TEFL Methodology in Moroccan Secondary Schools

### 1. Approaches & Frameworks
- **Standards-Based Approach (SBA):** Communication, Cultures, Connections, Comparisons, Communities.
- **Teaching Language Components:** PPP (Presentation, Practice, Production) and ECRIF (Encounter, Clarify, Remember, Internalize, Fluently use).
- **Teaching Receptive & Productive Skills:** Pre-reading/listening (schema activation), While-stage (skimming, scanning, inference), Post-stage (transfer and integrated speaking/writing).

### 2. Lesson Plan Essentials
Every lesson plan must state clear **SMART objectives**, anticipated problems, interaction patterns (T-Ss, PW, GW), timing, and formative assessment checks.`,
        downloadFiles: [
          {
            id: "se_did_f1",
            title: "Moroccan EFL Pedagogical Guidelines & Lesson Plan Templates (PDF)",
            size: "2.0 MB",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressIntroDidactics,
            isExternal: true,
          },
        ],
      },
      {
        id: "se_sci",
        title: "علوم التربية",
        subtitle: "Educational Sciences",
        type: "knowledge",
        iconName: "Brain",
        author: "Profpress Pedagogy",
        lastUpdated: "2026 Session",
        contentSummary:
          "Educational psychology, learning theories (Constructivism, Socioconstructivism, Multiple Intelligences), adolescent classroom management, and Moroccan Framework Law 51.17.",
        articleContent: SECONDARY_EDU_SCIENCE_ARTICLE,
        downloadFiles: buildSecondaryEduScienceFiles("اللغة الإنجليزية"),
      },
      {
        id: "se_exams",
        title: "نماذج اختبارات",
        subtitle: "Past Exam Papers & Keys",
        type: "exams",
        iconName: "FileText",
        author: "Profpress Archives",
        lastUpdated: "2018 - 2026",
        contentSummary:
          "Collection of past Moroccan CRMEF English teaching competition papers with official answer keys and didactics scoring rubrics.",
        articleContent: `## Past CRMEF English Competition Papers

Practice with authentic reading comprehension, linguistic error-analysis tasks, and TEFL lesson planning prompts from previous sessions.`,
        downloadFiles: [
          {
            id: "se_ex_f1",
            title: "Past English CRMEF Exam Papers & Answer Keys (PDF)",
            size: "4.4 MB",
            year: "2024/2025",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressConcours,
            isExternal: true,
          },
        ],
      },
      {
        id: "se_mock",
        title: "اختبار تجريبي",
        subtitle: "Mock Exam Simulator",
        type: "mock",
        iconName: "Laptop",
        author: "Profpress TEFL",
        lastUpdated: "2026",
        contentSummary:
          "Mock test covering English pragmatics, error analysis of 2nd Bac writing, and designing a 55-minute reading/writing lesson plan.",
        articleContent: `## Mock Exam Prompt — English Secondary (2026)

1. **Applied Linguistics:** Distinguish between *deductive* and *inductive* grammar teaching with concrete classroom tasks for Third Conditional.
2. **Lesson Planning:** Design a 55-minute *Speaking & Writing* lesson for 2nd Year Bac on the theme *Sustainable Development*, showing Pre/While/Post stages and formative checks.`,
        downloadFiles: [
          {
            id: "se_mock_f1",
            title: "MEN 2026 Competition Portal & Official Updates",
            size: "PDF",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
            isExternal: true,
          },
        ],
      },
      {
        id: "se_qcm",
        title: "قيم مستواك (QCM)",
        subtitle: "Interactive TEFL Quiz",
        type: "qcm",
        iconName: "CheckSquare",
        qcmQuestions: [
          {
            question: "Which reading sub-skill involves moving eyes quickly over a text to locate a specific date or name?",
            options: ["Skimming", "Scanning", "Inferring", "Proofreading"],
            correctIndex: 1,
            explanation: "Scanning searches for specific information (names, numbers, dates), whereas skimming reads quickly for the general gist.",
          },
          {
            question: "In the Moroccan Standards-Based Approach, the '5 Cs' include Communication, Cultures, Connections, Comparisons, and:",
            options: ["Competencies", "Communities", "Creativity", "Curriculum"],
            correctIndex: 1,
            explanation: "The fifth standard is Communities (using the language beyond the school setting).",
          },
        ],
      },
    ],
  },

  // 4. الرياضيات ثانوي
  {
    id: "sec_math",
    title: "الرياضيات (التأهيلي والإعدادي)",
    cycle: "secondary",
    iconName: "Calculator",
    colorScheme: "cyan",
    actions: [
      {
        id: "sm_know",
        title: "معارف المادة",
        subtitle: "الجبر، التحليل، الهندسة، الاحتمالات",
        type: "knowledge",
        iconName: "Calculator",
        author: "فريق الرياضيات - بروف بريس",
        lastUpdated: "دورة 2026",
        contentSummary:
          "ملخصات معمقة في التحليل (المتتاليات، النهايات، الاتصال، الاشتقاق، التكامل، المعادلات التفاضلية)، الجبر (البنيات الجبرية، المصفوفات، الأعداد العقدية، الحسابيات)، الهندسة الفضائية والتحليلية، والاحتمالات والإحصاء.",
        articleContent: `## الدليل المعرفي لمادة الرياضيات — السلك الثانوي (دورة 2026)

### 1. التحليل الرياضي (Analyse)
- **الأعداد الحقيقية والمتتاليات:** النهايات، التقارب، مبرهنة المتتاليات الرتيبة، المتتاليات التراجعية.
- **الدوال العددية:** مبرهنة القيم الوسطية، مبرهنة رول والتزايدات المنتهية، دراسة الفروع اللانهائية، الدوال اللوغاريتمية والأسية.
- **الحساب التكاملي:** المكاملة بالأجزاء، حساب المساحات والحجوم، والمعادلات التفاضلية من الرتبة الأولى والثانية.

### 2. الجبر والهندسة والاحتمالات
- **الجبر:** الحسابيات في $\\mathbb{Z}$ (مبرهنة بيزو، غوص، فيرما الصغرى)، الأعداد العقدية والتحويلات الهندسية، الفضاءات المتجهية، التطبيقات الخطية والمصفوفات.
- **الهندسة الفضائية:** الجداء السلمي والمتجهي، الفلكة، والمسافات والأوضاع النسبية.
- **الاحتمالات:** التعداد، الاحتمال الشرطي، الاستقلالية، المتغيرات العشوائية، والقانون الثنائي الحداني.`,
        downloadFiles: [
          {
            id: "sm_know_f1",
            title: "توصيف مادة الرياضيات للسلك الثانوي دورة 2026 (PDF)",
            size: "1.7 MB",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
            isExternal: true,
          },
          {
            id: "sm_know_f2",
            title: "سلسلة ملخصات التحليل والجبر للتحضير لمباراة التعليم (PDF)",
            size: "4.8 MB",
            year: "محين",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressConcours,
            isExternal: true,
          },
        ],
      },
      {
        id: "sm_did",
        title: "ديداكتيك المادة",
        subtitle: "ديداكتيك الرياضيات والوضعيات الديداكتيكية",
        type: "didactics",
        iconName: "School",
        author: "فريق الديداكتيك - بروف بريس",
        lastUpdated: "دورة 2026",
        contentSummary:
          "النقل الديداكتيكي في الرياضيات، نظرية الوضعيات الديداكتيكية لبروسو، السجل السيميائي لدوفال، تحليل الأخطاء الشائعة لدى تلاميذ الإعدادي والتأهيلي، وهندسة أنشطة الدعم والإدماج.",
        articleContent: `## ديداكتيك الرياضيات بالتعليم الثانوي (الإعدادي والتأهيلي)

### 1. المفاهيم الديداكتيكية المهيكلة
- **نظرية الوضعيات الديداكتيكية (Guy Brousseau):** الفعل، الصياغة، المصادقة/التداول، والمأسسة، إضافة إلى مفهوم المتغير الديداكتيكي (Variable didactique).
- **تعدد السجلات التمثيلية (Raymond Duval):** الانتقال بين السجل الجبري والبياني والهندسي والجدولي (مثل تمثيل الدوال والمترجحات).
- **التعاقد الديداكتيكي والعوائق الإبستمولوجية:** تجاوز عوائق اللانهاية، الجذر التربيعي، والأعداد السالبة.

### 2. تخطيط درس رياضيات وفق التوجيهات الرسمية
- وضعية انطلاق / نشاط بنائي استكشافي -> صياغة التعاريف والخاصيات (المأسسة) -> أمثلة وتطبيقات مباشرة -> تمارين التقويم والدعم والمعالجة.`,
        downloadFiles: [
          {
            id: "sm_did_f1",
            title: "ملف ديداكتيك الرياضيات وبناء الوضعيات (PDF)",
            size: "2.3 MB",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressMathSingapore,
            isExternal: true,
          },
        ],
      },
      {
        id: "sm_sci",
        title: "علوم التربية",
        subtitle: "نظريات التعلم والتقويم",
        type: "knowledge",
        iconName: "Brain",
        author: "فريق التحرير البيداغوجي",
        lastUpdated: "دورة 2026",
        contentSummary:
          "علوم التربية ومستجدات نظام التربية والتكوين بالمغرب، مع التركيز على البيداغوجيات الفعالة والتقويم التشخيصي في الإعداديات الرائدة.",
        articleContent: SECONDARY_EDU_SCIENCE_ARTICLE,
        downloadFiles: buildSecondaryEduScienceFiles("الرياضيات"),
      },
      {
        id: "sm_exams",
        title: "نماذج اختبارات",
        subtitle: "امتحانات السنوات السابقة مع التصحيح",
        type: "exams",
        iconName: "FileText",
        author: "أرشيف المباريات - بروف بريس",
        lastUpdated: "2018 - 2026",
        contentSummary:
          "نماذج امتحانات مادة التخصص وديداكتيك الرياضيات للدورات السابقة مع الحلول المفصلة وشبكات التنقيط.",
        articleContent: `## أرشيف امتحانات مباراة التعليم — تخصص الرياضيات

يضم هذا الركن مواضيع التخصص والديداكتيك للدورات السابقة (2018-2025)، حيث تركز الأسئلة على حل المسائل المركبة وتصحيح إنتاجات متعلمين مع رصد مصدر الخطأ وخطة المعالجة.`,
        downloadFiles: [
          {
            id: "sm_ex_f1",
            title: "نماذج اختبارات الرياضيات والديداكتيك مع عناصر الإجابة (PDF)",
            size: "5.4 MB",
            year: "2024",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressConcours,
            isExternal: true,
          },
          {
            id: "sm_ex_f2",
            title: "كتيب التصحيح الرسمي لعلوم التربية (2012-2024)",
            size: "4.6 MB",
            year: "2024",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressEduCorrect2012_2024,
            isExternal: true,
          },
        ],
      },
      {
        id: "sm_mock",
        title: "اختبار تجريبي",
        subtitle: "محاكاة للامتحان",
        type: "mock",
        iconName: "Laptop",
        author: "فريق الرياضيات",
        lastUpdated: "دورة 2026",
        contentSummary:
          "امتحان تجريبي يجمع بين تمرين في المتتاليات والدوال العددية، وتحليل خطأ تلميذ في نشر $(a+b)^2 = a^2+b^2$ مع اقتراح وضعية علاجية.",
        articleContent: `## اختبار تجريبي محاكي — الرياضيات الثانوي (2026)

1. **الشق المعرفي:** أدرس تقارب متتالية معرفة بعلاقة تراجعية واستنتج نهايتها.
2. **الشق الديداكتيكي:** ارتكب تلميذ بالثانية إعدادي الخطأ التالي: $\\sqrt{a+b} = \\sqrt{a} + \\sqrt{b}$. شخص العائق الإبستمولوجي، واقترح متغيراً ديداكتيكياً لتفنيد التمثل الخاطئ.`,
        downloadFiles: [
          {
            id: "sm_mock_f1",
            title: "المذكرة والتوصيفات الرسمية لدورة 2026 (PDF)",
            size: "PDF",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
            isExternal: true,
          },
        ],
      },
      {
        id: "sm_qcm",
        title: "قيم مستواك (QCM)",
        subtitle: "اختبار تفاعلي في الديداكتيك والرياضيات",
        type: "qcm",
        iconName: "CheckSquare",
        qcmQuestions: [
          {
            question: "عندما يُرجع المدرس قيمة عددية أو هندسية في وضعية مشكلة لتغيير استراتيجية حل المتعلم، فإنه يُغيّر:",
            options: ["العقد الديداكتيكي", "المتغير الديداكتيكي (Variable didactique)", "العائق النفسي", "الأثر البيداغوجي"],
            correctIndex: 1,
            explanation: "المتغير الديداكتيكي هو عنصر داخل الوضعية يتحكم فيه المدرس لدفع المتعلم نحو تغيير استراتيجية الحل وبناء المعرفة المستهدفة.",
          },
          {
            question: "أحد العوائق الشائعة التي تجعل التلميذ يعتقد أن 'الضرب يكبر العدد دائماً' يسمى:",
            options: ["عائقاً مرفقياً", "عائقاً إبستمولوجياً مرتبطاً بتعميم خواص الأعداد الصحيحة الطبيعية على الكسور/العشرية", "خللاً سلوكياً", "ضعفاً في الذاكرة"],
            correctIndex: 1,
            explanation: "تعميم خصائص الأعداد الصحيحة الطبيعية على الأعداد العشرية والأصغر من 1 يعد من أشهر العوائق الإبستمولوجية في الرياضيات.",
          },
        ],
      },
    ],
  },

  // 5. الفيزياء والكيمياء ثانوي
  {
    id: "sec_physics",
    title: "الفيزياء والكيمياء (التأهيلي والإعدادي)",
    cycle: "secondary",
    iconName: "Sparkles",
    colorScheme: "purple",
    actions: [
      {
        id: "sp_know",
        title: "معارف المادة",
        subtitle: "الميكانيك، الكهرباء، البصريات، الكيمياء",
        type: "knowledge",
        iconName: "Sparkles",
        author: "فريق الفيزياء والكيمياء - بروف بريس",
        lastUpdated: "دورة 2026",
        contentSummary:
          "مراجعة مركزة لمحاور التخصص: الميكانيك النيوتونية والحركات، الكهرباء والإلكترونيك (RC, RL, RLC)، البصريات الهندسية والموجية، الكيمياء المحلولية (حمض-قاعدة، الأكسدة والاختزال، المعايرة)، والكيمياء العضوية.",
        articleContent: `## المرجع المعرفي لمباراة التعليم — الفيزياء والكيمياء 2026

### أولاً: الفيزياء
- **الميكانيك:** قوانين نيوتن، السقوط الحر والاحتكاك، القذائف، الأقمار والكواكب، الاهتزازات الميكانيكية والطاقة.
- **الكهرباء:** قوانين كيرشوف، ثنائيات القطب RC و RL و RLC، التذبذبات الحرة والقسرية، الموجات الكهرمغنطيسية وتضمين الوسع.
- **الموجات والفيزياء النووية والبصريات:** الموجات الميكانيكية المتوالية، الحيود، التناقص الإشعاعي، والعدسات الرقيقة.

### ثانياً: الكيمياء
- التحولات السريعة والبطيئة والتتبع الزمني.
- التفاعلات حمض-قاعدة، الثابتة $K_A$ و $pK_A$، المعايرة والمنحنيات.
- الأعمدة والتحولات القسرية (التحليل الكهربائي)، وتفاعلات الأسترة والحلمأة.`,
        downloadFiles: [
          {
            id: "sp_know_f1",
            title: "بطاقة توصيف الفيزياء والكيمياء للتعليم الثانوي 2026 (PDF)",
            size: "1.6 MB",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
            isExternal: true,
          },
          {
            id: "sp_know_f2",
            title: "ملخصات الفيزياء والكيمياء وبنك الموارد (Profpress)",
            size: "4.5 MB",
            year: "محين",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressConcours,
            isExternal: true,
          },
        ],
      },
      {
        id: "sp_did",
        title: "ديداكتيك المادة",
        subtitle: "التجريب، النمذجة، والمحاكاة بالفيزياء",
        type: "didactics",
        iconName: "School",
        author: "فريق الديداكتيك العلمي",
        lastUpdated: "دورة 2026",
        contentSummary:
          "توظيف النهج التجريبي ونهج التقصي في تدريس الفيزياء والكيمياء، التمييز بين التجربة البيداغوجية والنمذجة والمحاكاة الرقمية، ومعالجة التمثلات القبلية لدى المتعلمين.",
        articleContent: `## ديداكتيك الفيزياء والكيمياء بالسلك الثانوي

### 1. النهج التجريبي وخطوات التقصي العلمي (IBSE)
1. **وضعية مشكلة دالة** تستثير تمثلات التلاميذ حول ظاهرة فيزيائية أو كيميائية.
2. **طرح تساؤل علمي وصياغة الفرضيات**.
3. **التجريب والمناولة المخبرية** (باحترام شروط السلامة في المختبر) أو توظيف موارد محاكاة (PhET) عند تعذر العتاد.
4. **استثمار القياسات، النمذجة الرياضية، والاستنتاج**.

### 2. معالجة الأخطاء والتمثلات
مثل الخلط بين الكتلة والوزن، أو الاعتقاد باستهلاك التيار الكهربائي داخل الدارة التوالية، أو التوتر والموصلية.`,
        downloadFiles: [
          {
            id: "sp_did_f1",
            title: "دليل نهج التقصي وديداكتيك المواد العلمية (PDF)",
            size: "2.1 MB",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressScienceDidactics,
            isExternal: true,
          },
        ],
      },
      {
        id: "sp_sci",
        title: "علوم التربية",
        subtitle: "مفاهيم ومستجدات التربية",
        type: "knowledge",
        iconName: "Brain",
        author: "فريق التحرير البيداغوجي",
        lastUpdated: "دورة 2026",
        contentSummary:
          "مرجع علوم التربية للمترشحين بالثانوي: نظريات التعلم، البيداغوجيات الفعالة، والتقويم التربوي وفق توصيفات 2026.",
        articleContent: SECONDARY_EDU_SCIENCE_ARTICLE,
        downloadFiles: buildSecondaryEduScienceFiles("الفيزياء والكيمياء"),
      },
      {
        id: "sp_exams",
        title: "نماذج اختبارات",
        subtitle: "امتحانات السنوات السابقة",
        type: "exams",
        iconName: "FileText",
        author: "أرشيف المباريات",
        lastUpdated: "2018 - 2026",
        contentSummary: "امتحانات التخصص وديداكتيك الفيزياء والكيمياء للدورات السابقة مع التصحيح الرسمي.",
        articleContent: `## نماذج اختبارات الفيزياء والكيمياء مع التصحيح

تضم الملفات مواضيع الميكانيك والكهرباء والكيمياء، إلى جانب وضعيات تخطيط الحصص المخبرية وتدبير دفاتر التقصي.`,
        downloadFiles: [
          {
            id: "sp_ex_f1",
            title: "تجميعية اختبارات الفيزياء والكيمياء (PDF)",
            size: "4.9 MB",
            year: "2024",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressConcours,
            isExternal: true,
          },
        ],
      },
      {
        id: "sp_mock",
        title: "اختبار تجريبي",
        subtitle: "محاكاة للامتحان",
        type: "mock",
        iconName: "Laptop",
        author: "فريق الفيزياء والكيمياء",
        lastUpdated: "دورة 2026",
        contentSummary: "محاكاة اختبارية تتضمن دراسة ثنائي القطب RC وتخطيط نشاط تجريبي حول قانون أوم بالثانية إعدادي.",
        articleContent: `## اختبار تجريبي — الفيزياء والكيمياء (دورة 2026)

- **الجزء المعرفي:** دراسة شحن مكثف عبر موصل أومي، وتحديد ثابتة الزمن مبيانياً وحسابياً.
- **الجزء الديداكتيكي:** إعداد بطاقة تقنية لنشاط تجريبي يتحقق فيه تلاميذ السلك الإعدادي من قانون أوم باستخدام المقاومة والفولطمتر والأمبيرمتر.`,
        downloadFiles: [
          {
            id: "sp_mock_f1",
            title: "توصيفات دورة 2026 الرسمية",
            size: "PDF",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
            isExternal: true,
          },
        ],
      },
      {
        id: "sp_qcm",
        title: "قيم مستواك (QCM)",
        subtitle: "أسئلة متعددة الاختيارات",
        type: "qcm",
        iconName: "CheckSquare",
        qcmQuestions: [
          {
            question: "تُستخدم المحاكاة الرقمية (Simulation) في تدريس الفيزياء أساساً عندما:",
            options: [
              "تغني كلياً عن أي تفكير علمي",
              "تكون الظاهرة خطيرة أو بطيئة جداً أو سريعة جداً أو يتعذر رصدها مجهرياً بالمختبر",
              "يريد الأستاذ إلغاء التقويم",
              "لا توجد أهداف تعلمية محددة",
            ],
            correctIndex: 1,
            explanation: "المحاكاة مكمل بيداغوجي للتجربة الحقيقية، وتكون ضرورية في الظواهر الخطيرة (النووي) أو المجهرية أو الزمنية الصعبة.",
          },
        ],
      },
    ],
  },

  // 6. علوم الحياة والأرض ثانوي
  {
    id: "sec_svt",
    title: "علوم الحياة والأرض (التأهيلي والإعدادي)",
    cycle: "secondary",
    iconName: "Sparkles",
    colorScheme: "emerald",
    actions: [
      {
        id: "ssvt_know",
        title: "معارف المادة",
        subtitle: "الجيولوجيا، الوراثة، المناعة، البيئة",
        type: "knowledge",
        iconName: "Sparkles",
        author: "فريق علوم الحياة والأرض - بروف بريس",
        lastUpdated: "دورة 2026",
        contentSummary:
          "محاور التخصص: البيولوجيا الخلوية والأيض الطاقي (التنفس والتخمر)، الخبر الوراثي والقوانين الإحصائية، علم المناعة، الجيولوجيا الداخلية والخارجية وتكتونية الصفائح، وعلم البيئة.",
        articleContent: `## الدليل المعرفي لمادة علوم الحياة والأرض (SVT) — 2026

### 1. علوم الحياة (Biologie)
- **استهلاك المادة العضوية وتدفق الطاقة:** انحلال الكليكوز، دورة كريبس، التففسفر المؤكسد، والتقلص العضلي.
- **الوراثة والخبر الوراثي:** تضاعف ADN، الاستنساخ والترجمة، الانقسام الاختزالي، القوانين الإحصائية لمندل، والوراثة البشرية.
- **علم المناعة:** المناعة غير النوعية والنوعية (الخلطية والخلوية)، آليات الاستجابة، واضطرابات الجهاز المناعي.

### 2. علوم الأرض (Géologie)
- الظواهر الجيولوجية المصاحبة لتشكل السلاسل الجبلية (التمر، الطفو، الاصطدام)، التحول وعلاقته بدينامية الصفائح، والجيولوجيا التطبيقية والمستحاثات.`,
        downloadFiles: [
          {
            id: "ssvt_know_f1",
            title: "توصيف مادة علوم الحياة والأرض دورة 2026 (PDF)",
            size: "1.6 MB",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
            isExternal: true,
          },
          {
            id: "ssvt_know_f2",
            title: "حقيبة ملخصات علوم الحياة والأرض للتحضير للمباراة (PDF)",
            size: "5.1 MB",
            year: "محين",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressConcours,
            isExternal: true,
          },
        ],
      },
      {
        id: "ssvt_did",
        title: "ديداكتيك المادة",
        subtitle: "التقصي والملاحظة المجهرية والخرجة البيئية",
        type: "didactics",
        iconName: "School",
        author: "فريق الديداكتيك",
        lastUpdated: "دورة 2026",
        contentSummary:
          "استثمار النهج التجريبي ونهج التقصي في تدريس SVT، تدبير الخرجات الإيكولوجية والجيولوجية، استغلال الوثائق والمجهر الضوئي، ومهارات التفكير العلمي (الاستدلال والربط).",
        articleContent: `## ديداكتيك علوم الحياة والأرض بالتعليم الثانوي

- **استثمار الوثائق والمعطيات التجريبية:** تدريب المتعلم على الملاحظة الدقيقة، المقارنة، التفسير، والاستنتاج وصياغة الفرضيات.
- **الخرجة الميدانية (Sortie écologique / géologique):** ثلاث مراحل أساسية: التحضير القبلي (تحديد الأهداف والوسائل)، الإنجاز الميداني (الملاحظة وأخذ العينات والقياسات)، والاستثمار الصفي (تحليل المعطيات وبناء الخلاصات).`,
        downloadFiles: [
          {
            id: "ssvt_did_f1",
            title: "دليل الديداكتيك العلمي ونهج التقصي (PDF)",
            size: "2.1 MB",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressScienceDidactics,
            isExternal: true,
          },
        ],
      },
      {
        id: "ssvt_sci",
        title: "علوم التربية",
        subtitle: "علوم التربية والديداكتيك",
        type: "knowledge",
        iconName: "Brain",
        author: "فريق التحرير البيداغوجي",
        lastUpdated: "دورة 2026",
        contentSummary: "نظريات التعلم، التقويم التربوي، ومستجدات منظومة التربية والتكوين 2026.",
        articleContent: SECONDARY_EDU_SCIENCE_ARTICLE,
        downloadFiles: buildSecondaryEduScienceFiles("علوم الحياة والأرض"),
      },
      {
        id: "ssvt_exams",
        title: "نماذج اختبارات",
        subtitle: "امتحانات السنوات السابقة",
        type: "exams",
        iconName: "FileText",
        author: "أرشيف المباريات",
        lastUpdated: "2018 - 2026",
        contentSummary: "نماذج اختبارات SVT السابقة للثانوي الإعدادي والتأهيلي مع عناصر التصحيح الرسمية.",
        articleContent: `## بنك اختبارات علوم الحياة والأرض

راجع مواضيع الدورات السابقة مع التركيز على أسئلة استرداد المعارف، الاستدلال العلمي، وتخطيط الأنشطة المخبرية.`,
        downloadFiles: [
          {
            id: "ssvt_ex_f1",
            title: "تجميعية امتحانات علوم الحياة والأرض مع عناصر الإجابة (PDF)",
            size: "4.3 MB",
            year: "2024",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressConcours,
            isExternal: true,
          },
        ],
      },
      {
        id: "ssvt_mock",
        title: "اختبار تجريبي",
        subtitle: "محاكاة للامتحان",
        type: "mock",
        iconName: "Laptop",
        author: "فريق SVT",
        lastUpdated: "دورة 2026",
        contentSummary: "محاكاة في علم المناعة والاستجابة الالتهابية مع تخطيط حصة ملاحظة مجهرية.",
        articleContent: `## اختبار تجريبي — علوم الحياة والأرض (دورة 2026)

1. حلل معطيات مبيانية حول تطور مضادات الأجسام بعد الحقن الأول والثاني بمولد مضاد.
2. صمم جذاذة لنشاط عملي حول الملاحظة المجهرية لخلية نباتية بالأولى إعدادي مع معايير التقويم التكويني.`,
        downloadFiles: [
          {
            id: "ssvt_mock_f1",
            title: "بطاقات التوصيف الرسمية 2026 (PDF)",
            size: "PDF",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
            isExternal: true,
          },
        ],
      },
      {
        id: "ssvt_qcm",
        title: "قيم مستواك (QCM)",
        subtitle: "اختبار تفاعلي في SVT",
        type: "qcm",
        iconName: "CheckSquare",
        qcmQuestions: [
          {
            question: "تتطلب الاستجابة المناعية النوعية ذات الوسيط الخلطي تدخل:",
            options: [
              "اللمفاويات T القاتلة فقط",
              "اللمفاويات B المنتجة لمضادات الأجسام بتعاون مع T4 والبلعميات",
              "الكريات الحمراء",
              "الصفائح الدموية",
            ],
            correctIndex: 1,
            explanation: "تعتمد الاستجابة الخلطية على تنشيط اللمفاويات B وتحولها إلى بلزميات مفرزة لمضادات الأجسام بتعاون خلوي.",
          },
        ],
      },
    ],
  },

  // 7. الاجتماعيات ثانوي
  {
    id: "sec_history_geo",
    title: "الاجتماعيات (تاريخ وجغرافيا)",
    cycle: "secondary",
    iconName: "Compass",
    colorScheme: "amber",
    actions: [
      {
        id: "shg_know",
        title: "معارف المادة",
        subtitle: "التاريخ، الجغرافيا، التربية على المواطنة",
        type: "knowledge",
        iconName: "BookOpen",
        author: "فريق الاجتماعيات - بروف بريس",
        lastUpdated: "دورة 2026",
        contentSummary:
          "ملخصات التاريخ المعاصر (تاريخ المغرب، نظام الحماية، الكفاح الوطني، التحولات العالمية في القرنين 19 و20)، الجغرافيا الطبيعية والبشرية والاقتصادية (المغرب، العولمة، التكتلات الجهوية)، والتربية على المواطنة وحقوق الإنسان.",
        articleContent: `## الدليل المعرفي لتخصص التاريخ والجغرافيا — 2026

### أولاً: التاريخ
- تاريخ المغرب: الدولة الإدريسية والمرابطية والموحدية والمرينية والسعدية والعلوية، الضغوط الاستعمارية، نظام الحماية 1912، الحركة الوطنية واستكمال الوحدة الترابية.
- التاريخ العام: الثورة الصناعية، الإمبريالية، الحربان العالميتان، الحرب الباردة، ونظام القطب الواحد.

### ثانياً: الجغرافيا والتربية على المواطنة
- مفاهيم التضاريس والمناخ والتدبير المجالي بالمغرب، سياسة إعداد التراب الوطني، العولمة والتكتلات الاقتصادية (الاتحاد الأوروبي، أمريكا الشمالية، شرق آسيا).
- القيم الدستورية، المؤسسات الوطنية، والديمقراطية التشاركية.`,
        downloadFiles: [
          {
            id: "shg_know_f1",
            title: "توصيف مادة الاجتماعيات للسلك الثانوي 2026 (PDF)",
            size: "1.5 MB",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
            isExternal: true,
          },
          {
            id: "shg_know_f2",
            title: "ملخصات التاريخ والجغرافيا وملف خرائط للمراجعة (PDF)",
            size: "4.0 MB",
            year: "محين",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressConcours,
            isExternal: true,
          },
        ],
      },
      {
        id: "shg_did",
        title: "ديداكتيك المادة",
        subtitle: "النهج التاريخي والجغرافي ودورة التعلم",
        type: "didactics",
        iconName: "School",
        author: "فريق الديداكتيك",
        lastUpdated: "دورة 2026",
        contentSummary:
          "خطوات النهج التاريخي (التعريف، التفسير، التركيب)، خطوات النهج الجغرافي (الوصف، التفسير، التعميم)، ودورة التعلم في التربية على المواطنة (الاكتشاف، رد الفعل، الفعل)، مع توظيف الدعامات الديداكتيكية (الخط الزمني، الخريطة، المبيان).",
        articleContent: `## ديداكتيك الاجتماعيات (التاريخ، الجغرافيا، التربية على المواطنة)

### 1. النهج التاريخي
1. **التعريف:** تحديد الحدث وتوطينه في الزمان والمكان وفهم دلالاته.
2. **التفسير:** ربط الأسباب والنتائج والعوامل المؤثرة والفاعلين.
3. **التركيب:** استخلاص الصيرورة التاريخية وبناء تعميم أو خلاصة مهيكلة.

### 2. النهج الجغرافي
1. **الوصف الجغرافي:** تحديد خصائص الظاهرة وتوطينها وتوزيعها المجالي.
2. **التفسير الجغرافي:** إبراز العوامل الطبيعية والبشرية والتقنية المفسرة للظاهرة.
3. **التعميم الجغرافي:** صياغة قوانين ومفاهيم أو مقترحات تدبيرية للمجال.

### 3. دورة التعلم في التربية على المواطنة
- **الاكتشاف -> رد الفعل -> الفعل المواطن** لتحويل القيم إلى ممارسة سلوكية إيجابية.`,
        downloadFiles: [
          {
            id: "shg_did_f1",
            title: "دليل الديداكتيك والنهج التاريخي والجغرافي (PDF)",
            size: "2.0 MB",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressIntroDidactics,
            isExternal: true,
          },
        ],
      },
      {
        id: "shg_sci",
        title: "علوم التربية",
        subtitle: "البيداغوجيا الحديثة والتقويم",
        type: "knowledge",
        iconName: "Brain",
        author: "فريق التحرير البيداغوجي",
        lastUpdated: "دورة 2026",
        contentSummary: "البيداغوجيات النشطة، نظريات التعلم، والتقويم بالتعليم الثانوي 2026.",
        articleContent: SECONDARY_EDU_SCIENCE_ARTICLE,
        downloadFiles: buildSecondaryEduScienceFiles("الاجتماعيات"),
      },
      {
        id: "shg_exams",
        title: "نماذج اختبارات",
        subtitle: "امتحانات السنوات السابقة",
        type: "exams",
        iconName: "FileText",
        author: "أرشيف المباريات",
        lastUpdated: "2018 - 2026",
        contentSummary: "نماذج امتحانات مادة التخصص والديداكتيك للاجتماعيات بالثانوي الإعدادي والتأهيلي مع عناصر التصحيح.",
        articleContent: `## أرشيف امتحانات الاجتماعيات

يتضمن اختبارات المقالة التاريخية/الجغرافية، تحليل الوثائق (نصوص، مبيانات، خرائط)، وتصميم جذاذات تعليمية وفق التوجيهات التربوية.`,
        downloadFiles: [
          {
            id: "shg_ex_f1",
            title: "تجميعية امتحانات الاجتماعيات مع التصحيح (PDF)",
            size: "4.2 MB",
            year: "2024",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressConcours,
            isExternal: true,
          },
        ],
      },
      {
        id: "shg_mock",
        title: "اختبار تجريبي",
        subtitle: "محاكاة للامتحان",
        type: "mock",
        iconName: "Laptop",
        author: "فريق الاجتماعيات",
        lastUpdated: "دورة 2026",
        contentSummary: "موضوع مقالي في الضغوط الاستعمارية على المغرب، مع تخطيط مقطع ديداكتيكي لقراءة خريطة مناخية.",
        articleContent: `## اختبار تجريبي — الاجتماعيات (2026)

1. **موضوع مقالي (التخصص):** أبرز مظاهر الضغوط الاستعمارية على المغرب خلال القرن 19 وانعكاساتها الاقتصادية والسياسية.
2. **وضعية ديداكتيكية:** خطط لمقطع تعلمي يوظف الخط الزمني وخريطة توزيع السكان بالمغرب للسنة الثالثة إعدادي وفق خطوات النهج الجغرافي.`,
        downloadFiles: [
          {
            id: "shg_mock_f1",
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
        id: "shg_qcm",
        title: "قيم مستواك (QCM)",
        subtitle: "أسئلة متعددة الاختيارات",
        type: "qcm",
        iconName: "CheckSquare",
        qcmQuestions: [
          {
            question: "ما الترتيب الصحيح لخطوات النهج الجغرافي؟",
            options: [
              "التعميم، ثم التفسير، ثم الوصف",
              "الوصف الجغرافي، ثم التفسير الجغرافي، ثم التعميم",
              "التعريف، ثم التلخيص، ثم الحفظ",
              "السرد، ثم الخاتمة",
            ],
            correctIndex: 1,
            explanation: "يقوم النهج الجغرافي على وصف الظاهرة وتوطينها، ثم تفسير عواملها، ثم استخلاص تعميمات أو مبادئ جغرافية.",
          },
        ],
      },
    ],
  },

  // 8. التربية الإسلامية ثانوي
  {
    id: "sec_islamic",
    title: "التربية الإسلامية (التأهيلي والإعدادي)",
    cycle: "secondary",
    iconName: "BookOpen",
    colorScheme: "teal",
    actions: [
      {
        id: "si_know",
        title: "معارف المادة",
        subtitle: "القرآن، العقيدة، الفقه، السيرة، القيم",
        type: "knowledge",
        iconName: "BookOpen",
        author: "فريق التربية الإسلامية - بروف بريس",
        lastUpdated: "دورة 2026",
        contentSummary:
          "مرجع التخصص في العلوم الشرعية والتربوية: علوم القرآن والتفسير، العقيدة الأشعرية الوسطية ومقاصد الشريعة، الفقه وأصوله على المذهب المالكي، السيرة النبوية، وقيم الوسطية والتسامح والتعايش.",
        articleContent: `## الدليل المعرفي لمباراة التعليم — التربية الإسلامية 2026

### المحاور الأساسية في التخصص:
- **القرآن وعلومه:** قواعد التجويد (ورش عن نافع)، أسباب النزول، المكي والمدني، ومناهج التفسير الموضوعي.
- **العقيدة ومقاصد الشريعة:** الإيمان والغيب والعلم، مقاصد الشريعة الخمسة (حفظ الدين، النفس، العقل، النسل، المال).
- **الفقه المالكي وأصوله:** فقه الأسرة (الزواج والطلاق ورعاية الأطفال)، المعاملات المالية، ومصادر التشريع.
- **السيرة النبوية:** دروس العهد المكي والمدني، وثيقة المدينة، صلح الحديبية، وحجة الوداع.`,
        downloadFiles: [
          {
            id: "si_know_f1",
            title: "حقيبة دروس وملخصات التربية الإسلامية بالثانوي (مجلد Drive)",
            size: "7.2 MB",
            year: "محين",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressIslamicLessons,
            isExternal: true,
          },
          {
            id: "si_know_f2",
            title: "توصيف الاختبار الكتابي للتربية الإسلامية دورة 2026 (PDF)",
            size: "1.4 MB",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
            isExternal: true,
          },
        ],
      },
      {
        id: "si_did",
        title: "ديداكتيك المادة",
        subtitle: "مداخل التربية الإسلامية الخمسة (منهاج 2016 المحين)",
        type: "didactics",
        iconName: "School",
        author: "فريق الديداكتيك",
        lastUpdated: "دورة 2026",
        contentSummary:
          "المنهاج المندمج للتربية الإسلامية ومداخله الخمسة: التزكية، الاقتداء، الاستجابة، القسط، والحكمة، مع توظيف السورة القرآنية المؤطرة والوضعيات المشكلة في بناء القيم.",
        articleContent: `## ديداكتيك التربية الإسلامية بالثانوي الإعدادي والتأهيلي

### 1. المداخل الخمسة وبنية المنهاج المندمج
- **مدخل التزكية:** القرآن الكريم والعقيدة لتصفية القلوب وتعميق الإيمان.
- **مدخل الاقتداء:** السيرة النبوية والشمائل المحمدية لاتخاذ الرسول ﷺ قدوة.
- **مدخل الاستجابة:** العبادات والمعاملات تعبيراً عملياً عن الاستجابة لأمر الله.
- **مدخل القسط:** الحقوق (حق الله، حق النفس، حق الغير، وحق البيئة).
- **مدخل الحكمة:** المبادرات الإيجابية والأخلاق والتفكير الراشد لخدمة الصالح العام.

### 2. خطوات بناء الدرس
الانطلاق من وضعية مشكلة مستقاة من واقع المتعلم -> تحليل النصوص المؤطرة (القرآنية والحديثية) -> استخراج القيم والأحكام -> تمحيص الفرضيات والالتزام السلوكي.`,
        downloadFiles: [
          {
            id: "si_did_f1",
            title: "منهجية تدريس المداخل الخمسة وفق التوجيهات التربوية (PDF)",
            size: "1.9 MB",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressIntroDidactics,
            isExternal: true,
          },
        ],
      },
      {
        id: "si_sci",
        title: "علوم التربية",
        subtitle: "سيكولوجيا المراهق والتربية على القيم",
        type: "knowledge",
        iconName: "Brain",
        author: "فريق التحرير البيداغوجي",
        lastUpdated: "دورة 2026",
        contentSummary: "نظريات التعلم، التربية على القيم، وتدبير الفصول الدراسية بالثانوي 2026.",
        articleContent: SECONDARY_EDU_SCIENCE_ARTICLE,
        downloadFiles: buildSecondaryEduScienceFiles("التربية الإسلامية"),
      },
      {
        id: "si_exams",
        title: "نماذج اختبارات",
        subtitle: "امتحانات السنوات السابقة مع التصحيح",
        type: "exams",
        iconName: "FileText",
        author: "أرشيف المباريات - بروف بريس",
        lastUpdated: "2018 - 2026",
        contentSummary: "مواضيع مباريات التربية الإسلامية والتفتيش التربوي للثانوي التأهيلي والإعدادي مع عناصر الإجابة.",
        articleContent: `## أرشيف اختبارات التربية الإسلامية

ملفات مختارة تضم امتحانات التخصص والديداكتيك، مع نماذج أسئلة التأطير القرآني وبناء الوضعيات التقويمية القيمية.`,
        downloadFiles: [
          {
            id: "si_ex_f1",
            title: "امتحانات مادة التربية الإسلامية للثانوي التأهيلي (ملف Drive PDF)",
            size: "3.8 MB",
            year: "2024/2025",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressIslamicExams,
            isExternal: true,
          },
          {
            id: "si_ex_f2",
            title: "كتيب التصحيح الرسمي لعلوم التربية لجميع الأسلاك (PDF)",
            size: "4.6 MB",
            year: "2024",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressEduCorrect2012_2024,
            isExternal: true,
          },
        ],
      },
      {
        id: "si_mock",
        title: "اختبار تجريبي",
        subtitle: "محاكاة للامتحان",
        type: "mock",
        iconName: "Laptop",
        author: "فريق التربية الإسلامية",
        lastUpdated: "دورة 2026",
        contentSummary: "وضعية تفاعلية تجمع بين مقاصد الزواج في الإسلام وبناء جذاذة في مدخل الحكمة.",
        articleContent: `## اختبار تجريبي — التربية الإسلامية (2026)

1. بين علاقة العقيدة بالشريعة من خلال سورة يوسف أو سورة الحشر.
2. صمم مقطعاً ديداكتيكياً لدرس 'العفة والحياء' في مدخل القسط للسنة الأولى باكالوريا مبرزاً الوضعية المشكلة ومعايير قياس تحقق القيمة.`,
        downloadFiles: [
          {
            id: "si_mock_f1",
            title: "التوصيفات الرسمية لدورة 2026 (PDF)",
            size: "PDF",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
            isExternal: true,
          },
        ],
      },
      {
        id: "si_qcm",
        title: "قيم مستواك (QCM)",
        subtitle: "أسئلة متعددة الاختيارات",
        type: "qcm",
        iconName: "CheckSquare",
        qcmQuestions: [
          {
            question: "المدخل الذي يعالج قضايا البيئة وحقوق الله والنفس والغير في منهاج التربية الإسلامية هو مدخل:",
            options: ["التزكية", "القسط", "الاستجابة", "الاقتداء"],
            correctIndex: 1,
            explanation: "يركز مدخل القسط على منظومة الحقوق الأربعة: حق الله، حق النفس، حق الغير، وحق البيئة.",
          },
        ],
      },
    ],
  },

  // 9. الفلسفة ثانوي
  {
    id: "sec_philosophy",
    title: "الفلسفة (التأهيلي)",
    cycle: "secondary",
    iconName: "Brain",
    colorScheme: "rose",
    actions: [
      {
        id: "sph_know",
        title: "معارف المادة",
        subtitle: "تاريخ الفلسفة والمجزوءات الأربع",
        type: "knowledge",
        iconName: "BookOpen",
        author: "فريق الفلسفة - بروف بريس",
        lastUpdated: "دورة 2026",
        contentSummary:
          "تغطية شاملة لتاريخ الفلسفة (اليونانية، الإسلامية، الحديثة، والمعاصرة)، ومفاهيم المجزوءات الأربع في الثانوي التأهيلي: الوضع البشري، المعرفة، السياسة، والأخلاق، مع الإبستمولوجيا والمنطق.",
        articleContent: `## المرجع المعرفي لمباراة التعليم — تخصص الفلسفة (دورة 2026)

### 1. المحاور التاريخية والفلسفية الكبرى
- **الفلسفة اليونانية والوسطية:** سقراط، أفلاطون، أرسطو، الفارابي، ابن سينا، وابن رشد.
- **الفلسفة الحديثة:** ديكارت، سبينوزا، لوك، هيوم، كانط، وهيغل.
- **الفلسفة المعاصرة:** نيتشه، هوسرل، هايدغر، سارتر، فوكو، ودولوز، إضافة إلى الفلسفة السياسية والإبستمولوجيا (باشلار، بوبر، كون).

### 2. مجزوءات البرنامج الرسمي (جذع مشترك - 2 باك)
- **الوضع البشري:** الشخص، الغير، التاريخ.
- **المعرفة:** النظرية والتجربة، مسألة العلمية في العلوم الإنسانية، الحقيقة.
- **السياسة:** الدولة، العنف، الحق والعدالة.
- **الأخلاق:** الواجب، السعادة، الحرية.`,
        downloadFiles: [
          {
            id: "sph_know_f1",
            title: "توصيف اختبار الفلسفة بالتعليم الثانوي التأهيلي 2026 (PDF)",
            size: "1.5 MB",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
            isExternal: true,
          },
          {
            id: "sph_know_f2",
            title: "ملخصات مجزوءات الفلسفة وتاريخ الفلسفة (PDF)",
            size: "3.7 MB",
            year: "محين",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressConcours,
            isExternal: true,
          },
        ],
      },
      {
        id: "sph_did",
        title: "ديداكتيك المادة",
        subtitle: "الأشكلة، المفهمة، والمحاججة",
        type: "didactics",
        iconName: "School",
        author: "فريق الديداكتيك الفلسفي",
        lastUpdated: "دورة 2026",
        contentSummary:
          "الكفايات الفلسفية الثلاث (الأشكلة، المفهمة، المحاججة)، تدبير لحظات الدرس الفلسفي، وتدريس منهجيات الكتابة الإنشائية الفلسفية (النص، السؤال، القولة المرفقة بسؤال).",
        articleContent: `## ديداكتيك الفلسفة بالسلك الثانوي التأهيلي

### الكفايات النوعية الثلاث لتدريس الفلسفة:
1. **الأشكلة (Problématisation):** إثارة الدهشة وبناء المفارقة وتفكيك البداهات لصياغة الإشكال الفلسفي.
2. **المفهمة (Conceptualisation):** ضبط الدلالات التحديدية للمفاهيم الفلسفية وتمييزها عن دلالاتها المشتركة.
3. **المحاججة (Argumentation):** فحص البنية الحجاجية للنصوص وإنتاج خطاب برهاني منظم.

### صيغ الإنشاء الفلسفي الثلاث:
- **النص الفلسفي للتحليل والمناقشة** · **السؤال الإشكالي المفتوح** · **القولة المرفقة بسؤال أو مطلب** عبر لحظات الفهم، التحليل، المناقشة، والتركيب.`,
        downloadFiles: [
          {
            id: "sph_did_f1",
            title: "الدليل البيداغوجي وديداكتيك الفلسفة (PDF)",
            size: "2.1 MB",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressPedagogicalGuide,
            isExternal: true,
          },
        ],
      },
      {
        id: "sph_sci",
        title: "علوم التربية",
        subtitle: "نظريات التربية والتكوين",
        type: "knowledge",
        iconName: "Brain",
        author: "فريق التحرير البيداغوجي",
        lastUpdated: "دورة 2026",
        contentSummary: "المرجعيات الفلسفية والبيداغوجية لعلوم التربية وتقويم التعلمات بالثانوي 2026.",
        articleContent: SECONDARY_EDU_SCIENCE_ARTICLE,
        downloadFiles: buildSecondaryEduScienceFiles("الفلسفة"),
      },
      {
        id: "sph_exams",
        title: "نماذج اختبارات",
        subtitle: "امتحانات السنوات السابقة",
        type: "exams",
        iconName: "FileText",
        author: "أرشيف المباريات",
        lastUpdated: "2018 - 2026",
        contentSummary: "امتحانات تخصص الفلسفة والديداكتيك للدورات السابقة مع عناصر الإجابة وشبكات التنقيط.",
        articleContent: `## أرشيف امتحانات مادة الفلسفة

تتضمن المواضيع تحليل نصوص فلسفية كلاسيكية ومعاصرة وتصحيح مقالات تلاميذ الباكالوريا وفق الأطر المرجعية.`,
        downloadFiles: [
          {
            id: "sph_ex_f1",
            title: "مواضيع مباريات الفلسفة للسنوات السابقة (PDF)",
            size: "3.9 MB",
            year: "2024",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressConcours,
            isExternal: true,
          },
        ],
      },
      {
        id: "sph_mock",
        title: "اختبار تجريبي",
        subtitle: "محاكاة للامتحان",
        type: "mock",
        iconName: "Laptop",
        author: "فريق الفلسفة",
        lastUpdated: "دورة 2026",
        contentSummary: "معالجة إشكالية الحقيقة والمعرفة، مع تخطيط حصة لتحليل نص ديكارت أو كانط للثانية باكالوريا.",
        articleContent: `## اختبار تجريبي — تخصص الفلسفة (2026)

1. **إنشاء فلسفي:** هل الحقيقة بناء عقلي أم معطى تجريبي؟
2. **ديداكتيك:** صمم خطة تدريسية لمجزوءة الوضع البشري (مفهوم الغير) موضحاً كيف تفعّل الأشكلة والمفهمة في 55 دقيقة.`,
        downloadFiles: [
          {
            id: "sph_mock_f1",
            title: "التوصيفات الرسمية لدورة 2026 (PDF)",
            size: "PDF",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
            isExternal: true,
          },
        ],
      },
      {
        id: "sph_qcm",
        title: "قيم مستواك (QCM)",
        subtitle: "أسئلة متعددة الاختيارات",
        type: "qcm",
        iconName: "CheckSquare",
        qcmQuestions: [
          {
            question: "ما هي اللحظة المنهجية الأولى في الإنشاء الفلسفي وفق الأطر المرجعية للبكالوريا؟",
            options: ["المناقشة الخارجية", "الفهم (تحديد الموضوع، المفارقة، وطرح الإشكال)", "التركيب", "الاستشهاد بالنصوص"],
            correctIndex: 1,
            explanation: "تبدأ صياغة المقال الفلسفي بلحظة الفهم (4 نقط) التي تؤطر الموضوع وتبرز مفارقته وتطرح أسئلته الإشكالية.",
          },
        ],
      },
    ],
  },

  // ==========================================
  // 3. OTHER SPECIALTIES & SPECIALIZED CADRES
  // ==========================================

  // 10. التربية البدنية والرياضية
  {
    id: "other_sport",
    title: "التربية البدنية والرياضية",
    cycle: "other",
    iconName: "Activity",
    colorScheme: "orange",
    actions: [
      {
        id: "os_know",
        title: "الديداكتيك والمعارف",
        subtitle: "الفيزيولوجيا والمناهج الرياضية (APS)",
        type: "didactics",
        iconName: "Activity",
        author: "فريق التربية البدنية - بروف بريس",
        lastUpdated: "دورة 2026",
        contentSummary:
          "فيزيولوجيا الجهد البدني والتشريح الوظيفي، التوجيهات التربوية (OP 2007/2009)، تخطيط الحلقات الرياضية (Cycles d'APS)، البيداغوجيات الرياضية، والاختبار العملي والتطبيقي.",
        articleContent: `## الدليل الشامل لمباراة التعليم — التربية البدنية والرياضية (EPS 2026)

### 1. المعارف العلمية والبيولوجية
- **علم التشريح وفيزيولوجيا الجهد:** العضلات والمفاصل، أنظمة إنتاج الطاقة (اللاهوائي اللاكتيكي، اللاهوائي اللاكتيكي، والهوائي)، VO2max، والوقاية من الإصابات.
- **علم النفس الرياضي:** الدافعية، تدبير التوتر والمنافسة، والتعاون الجماعي.

### 2. ديداكتيك التربية البدنية (Didactique de l'EPS)
- **المشروع البيداغوجي والتخطيط:** مشروع الجمعية الرياضية المدرسية (AS)، الحلقات التعليمية (10-12 حصة لكل نشاط APS).
- **بنية الحصة:** المقدمة والإحماء العام والخاص، الجزء الأساسي (الوضعية المرجعية والوضعيات التعليمية)، ثم التهدئة والتقييم.
- **مجموعات الأنشطة:** ألعاب القوى، الجمباز، الرياضات الجماعية، والرياضات التعبيرية.`,
        downloadFiles: [
          {
            id: "os_f1",
            title: "توصيف مباراة التربية البدنية والرياضية دورة 2026 (PDF)",
            size: "1.6 MB",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
            isExternal: true,
          },
          {
            id: "os_f2",
            title: "ملخص التوجيهات التربوية ومفاهيم EPS (PDF)",
            size: "3.2 MB",
            year: "محين",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressConcours,
            isExternal: true,
          },
        ],
      },
      {
        id: "os_sci",
        title: "علوم التربية",
        subtitle: "نظريات التعلم والحياة المدرسية",
        type: "knowledge",
        iconName: "Brain",
        author: "فريق التحرير البيداغوجي",
        lastUpdated: "دورة 2026",
        contentSummary: "مفاهيم علوم التربية، الإدماج، وتدبير الأنشطة الموازية والرياضية بالمؤسسة.",
        articleContent: SECONDARY_EDU_SCIENCE_ARTICLE,
        downloadFiles: buildSecondaryEduScienceFiles("التربية البدنية"),
      },
      {
        id: "os_exams",
        title: "نماذج الاختبارات",
        subtitle: "مواضيع السنوات السابقة والاختبار التطبيقي",
        type: "exams",
        iconName: "FileText",
        author: "أرشيف المباريات",
        lastUpdated: "2018 - 2026",
        contentSummary: "نماذج كتابية وديداكتيكية لمباراة التربية البدنية والرياضية مع توصيفات الاختبار التطبيقي.",
        articleContent: `## مواضيع الاختبارات السابقة — التربية البدنية

يجمع هذا الركن بين الأسئلة النظرية في الفيزيولوجيا والتشريع الرياضي المدرسي، وإعداد جذاذات في الرياضات الجماعية أو ألعاب القوى.`,
        downloadFiles: [
          {
            id: "os_ex_f1",
            title: "نماذج اختبارات التربية البدنية والرياضية (PDF)",
            size: "3.5 MB",
            year: "2024",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressConcours,
            isExternal: true,
          },
        ],
      },
      {
        id: "os_qcm",
        title: "قيم مستواك (QCM)",
        subtitle: "أسئلة متعددة الاختيارات",
        type: "qcm",
        iconName: "CheckSquare",
        qcmQuestions: [
          {
            question: "ما اسم المنظومة المدرسية الخاصة بالنشاط الرياضي التنافسي داخل المؤسسات التعليمية بالمغرب؟",
            options: ["النادي الخاص", "الجمعية الرياضية المدرسية (Association Sportive)", "اللجنة الجهوية", "خلية الإنصات"],
            correctIndex: 1,
            explanation: "تضطلع الجمعية الرياضية المدرسية بتأطير التلاميذ في البطولات والأنشطة الرياضية المدرسية بإشراف أساتذة المادة.",
          },
        ],
      },
    ],
  },

  // 11. المعلوميات
  {
    id: "other_info",
    title: "المعلوميات (Informatique)",
    cycle: "other",
    iconName: "Laptop",
    colorScheme: "teal",
    actions: [
      {
        id: "oi_know",
        title: "الديداكتيك والمعارف",
        subtitle: "الخوارزميات، البرمجة، الشبكات، قواعد البيانات",
        type: "didactics",
        iconName: "Laptop",
        author: "فريق المعلوميات - بروف بريس",
        lastUpdated: "دورة 2026",
        contentSummary:
          "بنية الحاسوب والأنظمة، الخوارزميات وهياكل البيانات، البرمجة (C, Python, Web)، قواعد البيانات العلائقية (Merise, SQL)، شبكات المعلومات (TCP/IP, OSI)، وديداكتيك تدريس المعلوميات.",
        articleContent: `## الدليل المعرفي والديداكتيكي — تخصص المعلوميات (2026)

### 1. المحاور الأكاديمية (Spécialité Informatique)
- **الخوارزميات والبرمجة:** التراكيب الشرطية والتكرارية، الدوال، المصفوفات، البرمجة بلغة Python و C و HTML/CSS/PHP/JS.
- **قواعد البيانات:** التصميم وفق منهجية Merise (MCD/MLD) ولغة الاستعلام SQL.
- **الشبكات والأنظمة:** نموذج OSI و TCP/IP، العنونة IP، البروتوكولات، والذكاء الاصطناعي في التعليم.

### 2. ديداكتيك المعلوميات
- بيداغوجيا المشروع والحل التفاعلي للمشكلات المعلوماتية، تدبير قاعة المعلوميات (عمل فردي/ثنائي)، وإدماج تكنولوجيا المعلومات والاتصال (TICE) في الفصول الرائدة.`,
        downloadFiles: [
          {
            id: "oi_f1",
            title: "توصيف مباراة المعلوميات (Informatique) دورة 2026 (PDF)",
            size: "1.5 MB",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
            isExternal: true,
          },
          {
            id: "oi_f2",
            title: "ملخصات الخوارزميات والشبكات و SQL (PDF)",
            size: "3.4 MB",
            year: "محين",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressConcours,
            isExternal: true,
          },
        ],
      },
      {
        id: "oi_sci",
        title: "علوم التربية",
        subtitle: "نظريات التعلم ورقمنة التعليم",
        type: "knowledge",
        iconName: "Brain",
        author: "فريق التحرير البيداغوجي",
        lastUpdated: "دورة 2026",
        contentSummary: "علوم التربية وتكنولوجيا التعليم وإدماج TICE في المدرسة المغربية 2026.",
        articleContent: SECONDARY_EDU_SCIENCE_ARTICLE,
        downloadFiles: buildSecondaryEduScienceFiles("المعلوميات"),
      },
      {
        id: "oi_exams",
        title: "نماذج الاختبارات",
        subtitle: "مواضيع السنوات السابقة",
        type: "exams",
        iconName: "FileText",
        author: "أرشيف المباريات",
        lastUpdated: "2018 - 2026",
        contentSummary: "مواضيع امتحانات المعلوميات السابقة في الخوارزميات وقواعد البيانات والديداكتيك.",
        articleContent: `## مواضيع اختبارات المعلوميات

راجع تمارين كتابة الخوارزميات، نمذجة MCD/MLD، وتصميم وضعيات تعلمية لتدريس الحلقات التكرارية بالثانوي الإعدادي.`,
        downloadFiles: [
          {
            id: "oi_ex_f1",
            title: "نماذج اختبارات المعلوميات السابقة (PDF)",
            size: "3.1 MB",
            year: "2024",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressConcours,
            isExternal: true,
          },
        ],
      },
      {
        id: "oi_qcm",
        title: "قيم مستواك (QCM)",
        subtitle: "اختبار تفاعلي في المعلوميات",
        type: "qcm",
        iconName: "CheckSquare",
        qcmQuestions: [
          {
            question: "في منهجية Merise لتصميم قواعد البيانات، يتم الانتقال من النموذج التصوري (MCD) إلى النموذج المنطقي (MLD) من أجل:",
            options: [
              "رسم واجهة المستخدم",
              "تحويل الكيانات والعلاقات إلى جداول بمفاتيح أساسية وخارجية",
              "تشغيل الشبكة المحلية",
              "حذف البيانات المؤقتة",
            ],
            correctIndex: 1,
            explanation: "النموذج المنطقي للمعطيات MLD يترجم كيانات وعلاقات MCD إلى علاقات/جداول علائقية صالحة للتنفيذ في SQL.",
          },
        ],
      },
    ],
  },

  // 12. التكنولوجيا والعلوم الصناعية للمهندس
  {
    id: "other_tech",
    title: "التكنولوجيا والعلوم الصناعية (Technologie)",
    cycle: "other",
    iconName: "Settings",
    colorScheme: "blue",
    actions: [
      {
        id: "ot_know",
        title: "الديداكتيك والمعارف",
        subtitle: "الهندسة الميكانيكية، الكهربائية، والأوتوماتيك",
        type: "didactics",
        iconName: "Settings",
        author: "فريق التكنولوجيا الصناعية - بروف بريس",
        lastUpdated: "دورة 2026",
        contentSummary:
          "التحليل الوظيفي (SADT, FAST)، الرسم الصناعي والميكانيك، المنطق التوافقي والتعاقبي، الإلكترونيك والكهرباء الصناعية، وديداكتيك المقاربة المشروعية في التكنولوجيا.",
        articleContent: `## الدليل المعرفي والديداكتيكي — التكنولوجيا والعلوم الصناعية (2026)

- **التحليل الوظيفي والهندسة الميكانيكية:** سلاسل الطاقة والمعلومات، مخطط التعبير عن الحاجة (Bête à cornes)، ومخططات SADT و FAST.
- **الهندسة الكهربائية والأوتوماتيك:** الدوائر المنطقية، GRAFCET، والمحركات والمحولات.
- **ديداكتيك المادة:** بيداغوجيا المشروع التقني، التحليل التقني لمنتج صناعي، وتدبير العمل في ورشات المختبر التكنولوجي.`,
        downloadFiles: [
          {
            id: "ot_f1",
            title: "توصيف مباراة التكنولوجيا والعلوم الصناعية 2026 (PDF)",
            size: "1.6 MB",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
            isExternal: true,
          },
        ],
      },
      {
        id: "ot_sci",
        title: "علوم التربية",
        subtitle: "نظريات التعلم والبيداغوجيا",
        type: "knowledge",
        iconName: "Brain",
        author: "فريق التحرير البيداغوجي",
        lastUpdated: "دورة 2026",
        contentSummary: "بيداغوجيا المشروع وحل المشكلات ونظريات التعلم بالتعليم الثانوي 2026.",
        articleContent: SECONDARY_EDU_SCIENCE_ARTICLE,
        downloadFiles: buildSecondaryEduScienceFiles("التكنولوجيا"),
      },
      {
        id: "ot_exams",
        title: "نماذج الاختبارات",
        subtitle: "مواضيع السنوات السابقة",
        type: "exams",
        iconName: "FileText",
        author: "أرشيف المباريات",
        lastUpdated: "2018 - 2026",
        contentSummary: "نماذج امتحانات التكنولوجيا الصناعية وعلوم المهندس مع عناصر التصحيح.",
        articleContent: `## نماذج اختبارات التكنولوجيا

راجع اختبارات التحليل الوظيفي، GRAFCET، والديداكتيك التطبيقي للدورات السابقة.`,
        downloadFiles: [
          {
            id: "ot_ex_f1",
            title: "تجميعية اختبارات التكنولوجيا (PDF)",
            size: "3.2 MB",
            year: "2024",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressConcours,
            isExternal: true,
          },
        ],
      },
      {
        id: "ot_qcm",
        title: "قيم مستواك (QCM)",
        subtitle: "أسئلة تفاعلية",
        type: "qcm",
        iconName: "CheckSquare",
        qcmQuestions: [
          {
            question: "ما هي الأداة المستعملة في التحليل الوظيفي لنمذجة نظام آلي عبر مراحل وانتقالات؟",
            options: ["مخطط GRAFCET", "الجدول الدوري", "خريطة كارنو فقط", "المجهر الإلكتروني"],
            correctIndex: 0,
            explanation: "مخطط GRAFCET أداة بيانية معيارية لتمثيل اشتغال الأنظمة الآلية عبر المراحل والانتقالات.",
          },
        ],
      },
    ],
  },

  // 13. الاقتصاد والتدبير
  {
    id: "other_eco",
    title: "الاقتصاد والتدبير",
    cycle: "other",
    iconName: "TrendingUp",
    colorScheme: "purple",
    actions: [
      {
        id: "oe_know",
        title: "الديداكتيك والمعارف",
        subtitle: "المحاسبة، التدبير، والاقتصاد العام",
        type: "didactics",
        iconName: "TrendingUp",
        author: "فريق الاقتصاد والتدبير - بروف بريس",
        lastUpdated: "دورة 2026",
        contentSummary:
          "الاقتصاد العام والإحصاء، المحاسبة العامة والتحليلية (CGNC)، التنظيم الإداري والمالي للمقاولة، التسويق والموارد البشرية، وديداكتيك دراسة الحالة.",
        articleContent: `## الدليل المعرفي والديداكتيكي — علوم الاقتصاد والتدبير (2026)

- **الاقتصاد العام والإحصاء:** الدارة الاقتصادية، الأسواق، التضخم والبطالة، السياسات النقدية والميزانياتية، والتجارة الخارجية.
- **المحاسبة والتدبير:** المخطط المحاسبي المغربي، الموازنة وحساب النتائج (CPC)، التدبير المالي، والاستراتيجية.
- **ديداكتيك الاقتصاد والتدبير:** تدريس مادة الاقتصاد عبر **دراسة الحالة (Étude de cas)**، استثمار الوثائق المحاسبية والاقتصادية، والمقاربة بالكفايات.`,
        downloadFiles: [
          {
            id: "oe_f1",
            title: "توصيف مباراة الاقتصاد والتدبير دورة 2026 (PDF)",
            size: "1.5 MB",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
            isExternal: true,
          },
          {
            id: "oe_f2",
            title: "دليل الشعب والمسالك الاقتصادية بالتعليم التأهيلي (PDF)",
            size: "2.1 MB",
            year: "محين",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressHighSchoolStreams,
            isExternal: true,
          },
        ],
      },
      {
        id: "oe_sci",
        title: "علوم التربية",
        subtitle: "البيداغوجيا والتقويم",
        type: "knowledge",
        iconName: "Brain",
        author: "فريق التحرير البيداغوجي",
        lastUpdated: "دورة 2026",
        contentSummary: "علوم التربية، بيداغوجيا حل المشكلات ودراسة الحالة بالتعليم التأهيلي 2026.",
        articleContent: SECONDARY_EDU_SCIENCE_ARTICLE,
        downloadFiles: buildSecondaryEduScienceFiles("الاقتصاد والتدبير"),
      },
      {
        id: "oe_exams",
        title: "نماذج الاختبارات",
        subtitle: "مواضيع السنوات السابقة",
        type: "exams",
        iconName: "FileText",
        author: "أرشيف المباريات",
        lastUpdated: "2018 - 2026",
        contentSummary: "نماذج اختبارات الاقتصاد والمحاسبة وديداكتيك التخصص مع عناصر التصحيح.",
        articleContent: `## نماذج اختبارات الاقتصاد والتدبير

يتضمن دراسة حالات في المحاسبة العامة والتحليل الاقتصادي الكلي وبناء وضعيات تقويمية في التنظيم المقاولاتي.`,
        downloadFiles: [
          {
            id: "oe_ex_f1",
            title: "مواضيع مباريات الاقتصاد والتدبير (PDF)",
            size: "3.6 MB",
            year: "2024",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressConcours,
            isExternal: true,
          },
        ],
      },
      {
        id: "oe_qcm",
        title: "قيم مستواك (QCM)",
        subtitle: "اختبار تفاعلي",
        type: "qcm",
        iconName: "CheckSquare",
        qcmQuestions: [
          {
            question: "ما هي المقاربة الديداكتيكية الأكثر نجاعة في تدريس الاقتصاد والمقاولة بالتعليم التأهيلي؟",
            options: [
              "الإملاء النظري المجرد",
              "دراسة الحالة وتحليل الوثائق والبيانات الاقتصادية الواقعية",
              "الحفظ الصم للمفاهيم بدون أمثلة",
              "إقصاء التمارين التطبيقية",
            ],
            correctIndex: 1,
            explanation: "تقوم ديداكتيك الاقتصاد والتدبير على تحليل وضعيات مقاولاية حقيقية ووثائق إحصائية ومحاسبية.",
          },
        ],
      },
    ],
  },

  // 14. [جديد] المختصون التربويون (أطر المختصين CRMEF 2026)
  {
    id: "other_specialists_edu",
    title: "المختصون التربويون (تحضير المختبرات، الحراسة والتوثيق)",
    cycle: "other",
    iconName: "School",
    colorScheme: "emerald",
    actions: [
      {
        id: "ose_know",
        title: "مهام وتشريع المختص التربوي",
        subtitle: "تحضير المختبرات، الحراسة التربوية، التوثيق",
        type: "knowledge",
        iconName: "BookOpen",
        author: "فريق الأطر المختصة - بروف بريس",
        lastUpdated: "دورة 2026",
        contentSummary:
          "دليل شامل لمباراة ولوج سلك تكوين أطر المختصين التربويين بالمراكز الجهوية (دورة 2026): المهام المنصوص عليها في النظام الأساسي الجديد، تدبير المختبرات والمكتبات المدرسية، والحياة المدرسية.",
        articleContent: `## الدليل الشامل لمباراة المختصين التربويين — دورة 2026

تنظم مباريات ولوج سلك تكوين أطر المختصين التربويين في ثلاثة تخصصات رئيسية:

### 1. تخصص تحضير المختبرات المدرسية
- تنظيم وصيانة الأدوات والمحاليل الكيميائية والأجهزة المخبرية للفيزياء وعلوم الحياة والأرض.
- احترام قواعد الأمن والسلامة المخبرية، جرد العتاد، وتحضير التجارب قبل الحصص الدراسية.

### 2. تخصص الحراسة التربوية والتوثيق
- مواكبة المتعلمين وتتبع الغياب والمواظبة، وتفعيل الحياة المدرسية والأندية التربوية.
- تدبير المكتبة المدرسية والوسائطية، الفهرسة والتصنيف (ديوي)، ورقمنة الأرصدة الوثائقية.

### 3. الإطار التشريعي والتربوي
- النظام الأساسي الخاص بموظفي وزارة التربية الوطنية، القانون الإطار 51.17، ومذكرات تنظيم الحياة المدرسية والسلامة بالمؤسسات.`,
        downloadFiles: [
          {
            id: "ose_f1",
            title: "بطاقات توصيف مباراة أطر المختصين التربويين 2026 (PDF)",
            size: "1.8 MB",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
            isExternal: true,
          },
          {
            id: "ose_f2",
            title: "ملخص القانون الإطار 51.17 والتشريع المدرسي (PDF)",
            size: "1.4 MB",
            year: "محين",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressLoiCadrePdf,
            isExternal: true,
          },
          {
            id: "ose_f3",
            title: "ملخص علوم التربية والحياة المدرسية (Word)",
            size: "1.1 MB",
            year: "Word",
            fileType: "Word",
            url: VERIFIED_COMPETITION_LINKS.profpressEduWordDoc,
            isExternal: true,
          },
        ],
      },
      {
        id: "ose_exams",
        title: "نماذج اختبارات المختصين",
        subtitle: "مواضيع سابقة ودراسات حالة",
        type: "exams",
        iconName: "FileText",
        author: "أرشيف المباريات",
        lastUpdated: "2022 - 2026",
        contentSummary: "نماذج اختبارات أطر الدعم والمختصين التربويين في التخصص التربوي ودراسة الحالات الإدارية والتوثيقية.",
        articleContent: `## مواضيع اختبارات المختصين التربويين

تشمل المواضيع وضعيات في: تدبير العتاد المخبري، تنظيم المسابقات الثقافية والأندية، التصدي للهدر المدرسي، وتطبيق مقتضيات النظام الأساسي.`,
        downloadFiles: [
          {
            id: "ose_ex_f1",
            title: "مباراة المختصين التربويين والاجتماعيين والاقتصاد - بوابة Wolouj 2026",
            size: "PDF",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.woloujPortal,
            isExternal: true,
          },
        ],
      },
      {
        id: "ose_qcm",
        title: "قيم مستواك (QCM)",
        subtitle: "أسئلة متعددة الاختيارات",
        type: "qcm",
        iconName: "CheckSquare",
        qcmQuestions: [
          {
            question: "ما هو النظام الدولي الأكثر اعتماداً في تصنيف الكتب داخل المكتبات المدرسية؟",
            options: ["تصنيف ديوي العشري", "جدول مندلييف", "بروتوكول HTTP", "نظام الألوان الثلاثة"],
            correctIndex: 0,
            explanation: "تصنيف ديوي العشري (Dewey Decimal Classification) هو النظام المعياري لتصنيف أرصدة المكتبات المدرسية من 000 إلى 999.",
          },
        ],
      },
    ],
  },

  // 15. [جديد] المختصون الاجتماعيون ومختصو الاقتصاد والإدارة
  {
    id: "other_specialists_social_admin",
    title: "المختصون الاجتماعيون ومختصو الاقتصاد والإدارة",
    cycle: "other",
    iconName: "TrendingUp",
    colorScheme: "cyan",
    actions: [
      {
        id: "ossa_know",
        title: "معارف التخصصين والتدبير",
        subtitle: "علم الاجتماع والإنصات / التدبير المالي والمادي",
        type: "knowledge",
        iconName: "BookOpen",
        author: "فريق الأطر المختصة - بروف بريس",
        lastUpdated: "دورة 2026",
        contentSummary:
          "دليل الإعداد لمباريات المختصين الاجتماعيين (الوساطة المدرسية، خلايا الإنصات، الدعم النفسي الاجتماعي) ومختصي الاقتصاد والإدارة (التسيير المالي والمادي، الصفقات العمومية، جمعية دعم مدرسة النجاح، والداخليات).",
        articleContent: `## الدليل التأطيري لمباراتي المختصين الاجتماعيين ومختصي الاقتصاد والإدارة 2026

### أولاً: المختصون الاجتماعيون
- **علم الاجتماع التربوي والإنصات:** الوساطة المدرسية، تدبير خلايا اليقظة والإنصات، محاربة العنف والهدر المدرسي.
- **الشراكات والمبادرة الاجتماعية:** دعم التمدرس في الوسط القروي وشبه الحضري والتواصل مع الأسر.

### ثانياً: مختصو الاقتصاد والإدارة
- **التسيير المالي والمادي للمؤسسات:** إعداد ميزانية المؤسسة، مسك السجلات المحاسبية للمصالح الاقتصادية، جمعية دعم مدرسة النجاح.
- **التشريع المالي والصفقات:** مراقبة النفقات العمومية، سندات الطلب، تدبير الداخليات والمطاعم المدرسية والمحاسبة المادية.`,
        downloadFiles: [
          {
            id: "ossa_f1",
            title: "بطاقات التوصيف الرسمية لأطر المختصين 2026 (PDF)",
            size: "1.7 MB",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
            isExternal: true,
          },
          {
            id: "ossa_f2",
            title: "القانون الإطار 51.17 والتشريع التربوي (PDF)",
            size: "1.4 MB",
            year: "محين",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressLoiCadrePdf,
            isExternal: true,
          },
        ],
      },
      {
        id: "ossa_exams",
        title: "نماذج اختبارات",
        subtitle: "دراسات حالة إدارية واجتماعية",
        type: "exams",
        iconName: "FileText",
        author: "أرشيف المباريات",
        lastUpdated: "2022 - 2026",
        contentSummary: "نماذج امتحانات التدبير المالي والمادي، والوساطة الاجتماعية بالمؤسسات التعليمية.",
        articleContent: `## مواضيع الاختبارات السابقة

نماذج تطبيقية حول تدبير المطاعم المدرسية، مساطر الجرد المادي، وخطط تدخل المختص الاجتماعي في حالات الانقطاع المدرسي.`,
        downloadFiles: [
          {
            id: "ossa_ex_f1",
            title: "التسجيل وتوصيفات الأطر المختصة 2026 (بوابة الوزارة)",
            size: "PDF",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.woloujPortal,
            isExternal: true,
          },
        ],
      },
      {
        id: "ossa_qcm",
        title: "قيم مستواك (QCM)",
        subtitle: "أسئلة تفاعلية",
        type: "qcm",
        iconName: "CheckSquare",
        qcmQuestions: [
          {
            question: "ما هي الآلية التي تتيح للمؤسسة التعليمية تدبير منح المشروع المندمج للمؤسسة بشكل مرن؟",
            options: ["جمعية دعم مدرسة النجاح", "الشركة المساهمة", "الصندوق الوطني فقط", "المكتب البلدي"],
            correctIndex: 0,
            explanation: "تعد جمعية دعم مدرسة النجاح إطاراً قانونياً ومالياً لتمويل وتفعيل مشاريع المؤسسات التعليمية العمومية.",
          },
        ],
      },
    ],
  },

  // 16. [جديد] التربية الفنية والموسيقية واللغات الأجنبية الثانية
  {
    id: "other_arts",
    title: "التربية الفنية (التشكيلية والموسيقية) واللغات الثانية",
    cycle: "other",
    iconName: "PenTool",
    colorScheme: "amber",
    actions: [
      {
        id: "oa_know",
        title: "الديداكتيك والمعارف",
        subtitle: "التربية التشكيلية، الموسيقية، واللغات الحية",
        type: "didactics",
        iconName: "PenTool",
        author: "فريق الفنون واللغات - بروف بريس",
        lastUpdated: "دورة 2026",
        contentSummary:
          "توصيفات وديداكتيك التربية التشكيلية (نظريات اللون، المنظور، تاريخ الفن، الورشات التشكيلية)، التربية الموسيقية (الصولفيج، الإيقاع، المقامات المغربية والعربية)، واللغات الحية الثانية (الإسبانية، الألمانية، الإيطالية).",
        articleContent: `## الدليل المعرفي والديداكتيكي — الفنون واللغات الأجنبية الثانية 2026

- **التربية التشكيلية:** مبادئ التركيب البصري، الدائرة اللونية، التقنيات الفنية، وديداكتيك التعبير التشكيلي.
- **التربية الموسيقية:** قراءة النوتة والصولفيج، الأشكال الإيقاعية، التراث الموسيقي المغربي، وتنشيط الجوقات المدرسية.
- **اللغات الحية (إسبانية/ألمانية/إيطالية):** المقاربة التواصلية CECRL، معارف اللغة والثقافة، وتخطيط مهارات الفهم والإنتاج.`,
        downloadFiles: [
          {
            id: "oa_f1",
            title: "بطاقات التوصيف الرسمية لجميع التخصصات 2026 (PDF)",
            size: "1.6 MB",
            year: "2026",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.menSpecs2026,
            isExternal: true,
          },
        ],
      },
      {
        id: "oa_exams",
        title: "نماذج الاختبارات",
        subtitle: "مواضيع السنوات السابقة",
        type: "exams",
        iconName: "FileText",
        author: "أرشيف المباريات",
        lastUpdated: "2020 - 2026",
        contentSummary: "نماذج امتحانات التخصص والديداكتيك في التربية التشكيلية والموسيقية واللغات الأجنبية.",
        articleContent: `## أرشيف مواضيع الفنون واللغات

يشمل الوضعيات الديداكتيكية، التذوق الفني والجمالي، ومهارات التواصل اللغوي في اللغات الأجنبية الثانية.`,
        downloadFiles: [
          {
            id: "oa_ex_f1",
            title: "تجميعية موارد ومواضيع المباريات (Profpress)",
            size: "2.8 MB",
            year: "محين",
            fileType: "PDF",
            url: VERIFIED_COMPETITION_LINKS.profpressConcours,
            isExternal: true,
          },
        ],
      },
      {
        id: "oa_qcm",
        title: "قيم مستواك (QCM)",
        subtitle: "اختبار تفاعلي",
        type: "qcm",
        iconName: "CheckSquare",
        qcmQuestions: [
          {
            question: "ما هو الإطار المرجعي المعتمد عالمياً لتحديد مستويات إتقان اللغات الأجنبية (A1 - C2)؟",
            options: ["CECRL (الإطار الأوروبي المرجعي المشترك للغات)", "نظام ASCII", "تصنيف بلوم الرياضي", "معيار ISO 9001"],
            correctIndex: 0,
            explanation: "يعتمد الإطار الأوروبي المرجعي المشترك للغات (CECRL) المستويات من A1 إلى C2 في تدريس وتقويم اللغات الأجنبية.",
          },
        ],
      },
    ],
  },
];
