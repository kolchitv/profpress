import { CompetitionDownloadFile, QuickResourceCard } from "./teachingCompetitionData";

export interface ProfessionalExamArticle {
  id: string;
  title: string;
  category: "prep_bag" | "didactics" | "pedagogy" | "procedures" | "models";
  categoryLabel: string;
  badge?: string;
  iconName: string;
  cycle?: "primary" | "middle" | "high" | "all";
  cycleLabel?: string;
  author?: string;
  date?: string;
  summary: string;
  articleContent: string;
  downloadFiles: CompetitionDownloadFile[];
  sourceUrl?: string;
}

export interface ProfessionalExamModel {
  id: string;
  title: string;
  cycle: "primary" | "middle" | "high";
  cycleName: string;
  subject: string;
  year: string;
  session: string;
  targetGrade: string; // e.g. "الدرجة الأولى (السلم 11)", "الدرجة الثانية (السلم 10)", "خارج السلم"
  downloadUrl: string;
  hasCorrection: boolean;
  correctionUrl?: string;
  fileSize?: string;
}

export interface ProfessionalExamsPageData {
  pageTitle: string;
  pageSubtitle: string;
  headerBadgeText: string;
  coverImage: {
    url: string;
    caption: string;
    alt: string;
  };
  introText: string;
  quickCards: QuickResourceCard[];
  articles: ProfessionalExamArticle[];
  examModels: ProfessionalExamModel[];
}

export const DEFAULT_PROFESSIONAL_EXAMS_DATA: ProfessionalExamsPageData = {
  pageTitle: "الامتحانات المهنية - جميع الأسلاك",
  pageSubtitle: "قسم خاص بالإمتحانات المهنية جميع الأسلاك : مواضيع للاستعداد، وثائق، نصائح، نماذج، وتصحيح رسمي لجميع الأسلاك التعليمية",
  headerBadgeText: "امتحانات الكفاءة المهنية • وزارة التربية الوطنية",
  coverImage: {
    url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjw0xSnKdU2mj4463a0UIaRxubu68yJZVG8N5LDErYMW1yUyNt5o7dO4jdpT3_VGMrk80GJymjuSfFnUTM1Z2rSXtJqlVlEOK4B9UBqFNVTMknh6YjLdGAKIptncZcwqNoe6LOvhc2WCxe7/s1600/19942709_10211982427909572_5506777588517480079_o.jpg",
    caption: "الامتحانات المهنية لترقية أطر هيئة التدريس لجميع الأسلاك التعليمية",
    alt: "قسم خاص بالإمتحانات المهنية جميع الأسلاك : مواضيع للاستعداد وثائق نصائح نماذج",
  },
  introText: `مرحباً بجميع الأستاذات والأساتذة المقبلين على اجتياز امتحانات الكفاءة المهنية لولوج الدرجة الأولى (السلم 11) وخارج السلم، وامتحان شهادة الكفاءة التربوية. يضع هذا الفضاء رهن إشارتكم دليلاً متكاملاً يضم حقائب التحضير الشاملة، مواضيع الامتحانات السابقة مع عناصر الإجابة الرسمية، مراجع علوم التربية، الديداكتيك، والتشريع المدرسي، مع روابط مباشرة لموقع بروف بريس وبوابة الترشيح الإلكتروني.`,
  quickCards: [
    {
      id: "card_prep_bag",
      title: "حقيبة التحضير الشاملة",
      subtitle: "دورة دجنبر وجميع الدورات",
      iconName: "FolderKanban",
      color: "blue",
      url: "https://profpressma.blogspot.com/2024/11/2024.html",
      author: "فريق بروف بريس التربوي",
      lastUpdated: "تحيين دورة 2024/2025",
      writtenContent: `حقيبة متكاملة لتحضير امتحان الكفاءة المهنية لأساتذة التعليم الابتدائي، الثانوي الإعدادي، والثانوي التأهيلي:
• ديداكتيك المواد والتخطيط والتدبير والتقويم.
• نظريات التعلم، المقاربات البيداغوجية، ومستجدات المنهاج الدراسي.
• التدريس الصريح ومقاربة TaRL لمدارس الريادة.
• التشريع المدرسي، مهام الأستاذ وحقوقه وواجباته.`,
      downloadLinks: [
        {
          id: "dl_bag_1",
          title: "حقيبة التحضير للامتحان المهني ابتدائي (ديداكتيك ومستجدات) PDF",
          url: "https://profpressma.blogspot.com/2024/11/2024.html",
          size: "18.5 MB",
        },
        {
          id: "dl_bag_2",
          title: "دليل الكفاءة المهنية للترقية للسلم 11 وخارج السلم",
          url: "https://profpressma.blogspot.com/p/blog-page_77.html",
          size: "6.2 MB",
        },
      ],
    },
    {
      id: "card_portal_mihani",
      title: "بوابة الترشيح الإلكتروني",
      subtitle: "منصة مهني mihani.men.gov.ma",
      iconName: "Laptop",
      color: "emerald",
      url: "https://profpressma.blogspot.com/2022/12/2022-mihanimengovma.html",
      author: "مديرية الموارد البشرية وتكوين الأطر",
      lastUpdated: "دليل التسجيل والترشيح",
      writtenContent: `شرح طريقة التسجيل والمصادقة على طلبات الترشيح لاجتياز امتحانات الكفاءة المهنية عبر المنظومة الرقمية:
1. الدخول إلى الرابط الرسمي: mihani.men.gov.ma عبر الحساب الموحد Taalim.ma.
2. التأكد من المعطيات الإدارية: تاريخ التوظيف، الإطار، السلم، ونقط الأقدمية.
3. استخراج وصل الترشيح وتوقيعه والمصادقة عليه من طرف رئيس المؤسسة.
4. توزيع النقط: 50% لنقطة الاختبارات الكتابية + 50% لنقطة التفتيش والتقارير الإدارية.`,
      downloadLinks: [
        {
          id: "dl_mihani_1",
          title: "دليل استعمال منصة مهني والترشيح الإلكتروني PDF",
          url: "https://profpressma.blogspot.com/2022/12/2022-mihanimengovma.html",
          size: "1.8 MB",
        },
      ],
    },
    {
      id: "card_pedagogy_guide",
      title: "مصوغة علوم التربية والكفايات",
      subtitle: "المفاهيم البيداغوجية والتشريع",
      iconName: "Brain",
      color: "purple",
      url: "https://profpressma.blogspot.com/2020/10/blog-post_86.html",
      author: "مركز التوجيه والتخطيط والتفتيش",
      lastUpdated: "مفاهيم أساسية للامتحان",
      writtenContent: `ملخص شامل لأبرز المفاهيم التي تطرح في اختبار المجال البيداغوجي وممارسة مهنة التدريس:
• الكفايات العرضية والنوعية وأبعاد الكفاية وعناصرها.
• بيداغوجيا المشروع وحل المشكلات والبيداغوجيا الفارقية والخطأ.
• استراتيجيات الدعم التربوي والمعالجة البيداغوجية.
• أطر التقويم وأنواعه (تشخيصي، تكويني، إجمالي) وشبكات التصحيح.`,
      downloadLinks: [
        {
          id: "dl_ped_1",
          title: "مصوغة تكوينية شاملة في علوم التربية ومستجدات المنهاج",
          url: "https://profpressma.blogspot.com/2020/10/blog-post_86.html",
          size: "12.4 MB",
        },
      ],
    },
    {
      id: "card_previous_exams",
      title: "بنك الامتحانات السابقة",
      subtitle: "2015 إلى 2024 مع التصحيح",
      iconName: "FileText",
      color: "orange",
      url: "https://profpressma.blogspot.com/p/blog-page_77.html",
      author: "أرشيف امتحانات الكفاءة المهنية",
      lastUpdated: "جميع الأسلاك والتخصصات",
      writtenContent: `أرشيف منظم لمواضيع امتحانات الكفاءة المهنية مع عناصر الإجابة والتنقيط الرسمي:
• مواضيع السلك الابتدائي (ديداكتيك اللغة العربية والفرنسية والرياضيات والنشاط العلمي، وموضوع التربية والتكوين).
• مواضيع السلك الإعدادي والتأهيلي لجميع التخصصات.
• شبكات التصحيح وعناصر الإجابة الصادرة عن المركز الوطني للتقويم والامتحانات.`,
      downloadLinks: [
        {
          id: "dl_prev_1",
          title: "حزمة نماذج امتحانات الكفاءة المهنية 2015-2024 مع التصحيح",
          url: "https://profpressma.blogspot.com/p/blog-page_77.html",
          size: "45 MB",
        },
      ],
    },
  ],
  articles: [
    {
      id: "art_1",
      title: "حقيبة التحضير للامتحان المهني ابتدائي - دورة دجنبر مع المراجع الكاملة",
      category: "prep_bag",
      categoryLabel: "حقائب التحضير",
      badge: "دورة دجنبر",
      iconName: "FolderKanban",
      cycle: "primary",
      cycleLabel: "التعليم الابتدائي",
      author: "موقع الأساتذة بروف بريس",
      date: "نونبر 2024",
      summary: "حقيبة شاملة تتضمن مراجع ديداكتيك المواد (العربية، الفرنسية، الرياضيات، النشاط العلمي)، مستجدات المنهاج، التدريس الصريح، ومقاربة TaRL.",
      sourceUrl: "https://profpressma.blogspot.com/2024/11/2024.html",
      articleContent: `<h2>حقيبة التحضير للامتحان المهني للتعليم الابتدائي</h2>
<p>يسر موقع <strong>بروف بريس Profpress</strong> أن يقدم للسيدات والسادة أساتذة التعليم الابتدائي هذه الحقيبة الشاملة والمحينة، والموجهة للتحضير الرصين لاجتياز <strong>امتحان الكفاءة المهنية لولوج الدرجة الأولى (السلم 11)</strong>.</p>

<h3>1. مكونات اختبار الامتحان المهني للابتدائي</h3>
<p>يتضمن الامتحان اختبارين كتابيين رئيسيين:</p>
<ul>
  <li><strong>المجال الأول: اختبار في ديداكتيك مواد التعليم الابتدائي</strong> (المعامل 3 - المدة: 3 ساعات). يشمل ديداكتيك اللغة العربية، ديداكتيك اللغة الفرنسية، ديداكتيك الرياضيات، وديداكتيك النشاط العلمي.</li>
  <li><strong>المجال الثاني: اختبار في المجال البيداغوجي والممارسة المهنية</strong> (المعامل 2 - المدة: ساعتان). يشمل علوم التربية، سيكولوجية الطفل، نظريات التعلم، التشريع الإداري والمدرسي، ومستجدات المنظومة التربوية (خارطة الطريق 2022-2026 ومدارس الريادة).</li>
</ul>

<h3>2. أهم المحاور والمراجع المضمنة في الحقيبة</h3>
<ol>
  <li><strong>ديداكتيك اللغة العربية:</strong> مكونات مادة اللغة العربية بالسلك الابتدائي، خطوات تدريس القراءة المقطعية، القراءة بالطلاقة، الظواهر اللغوية (الضمنية والمصرح بها)، الإنتاج الكتابي واستراتيجياته.</li>
  <li><strong>ديداكتيك اللغة الفرنسية:</strong> المكونات الشفهية والقرائية والكتابية (Communication et actes de langage, Lecture, Écriture/Production d'écrit)، والمقاربة العملياتية.</li>
  <li><strong>ديداكتيك الرياضيات:</strong> النهج الرياضي، مراحل بناء المفهوم الرياضي (مرحلة الانطلاق/الوضعية المشكلة، البناء، الترييض، التقويم والدعم)، والمعالجة الديداكتيكية للصعوبات الحسابية والهندسية.</li>
  <li><strong>ديداكتيك النشاط العلمي:</strong> نهج التقصي العلمي بخطواته الست (وضعية الانطلاق، تملك المشكلة وصياغة السؤال، صياغة الفرضيات، اختبار الفرضيات والتقصي، الاستنتاج والتعميم، والتطبيق والتقويم).</li>
  <li><strong>مدارس الريادة والتعليم الصريح:</strong> بيداغوجيا التدريس الصريح (النمذجة، الممارسة الموجهة، الممارسة المستقلة)، ومقاربة التدريس وفق المستوى المناسب TaRL وأدوات التقويم الموضعي.</li>
</ol>

<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 20px 0;">
  <h4 style="color: #1e3a8a; margin-top: 0;">📌 نصيحة منهجية للتحضير:</h4>
  <p style="margin-bottom: 0;">احرص أثناء الإجابة على تنظيم ورقة التحرير في جداول ديداكتيكية تبرز بوضوح: <em>الأهداف الإجرائية، الوسائل الديدكتيكية، مراحل الحصة، أنشطة الأستاذ، وأنشطة المتعلم</em> مع الإشارة إلى أشكال التقويم والدعم المندمج.</p>
</div>`,
      downloadFiles: [
        {
          id: "art1_f1",
          title: "حقيبة ديداكتيك مواد الابتدائي 2024 (PDF)",
          url: "https://profpressma.blogspot.com/2024/11/2024.html",
          fileType: "PDF",
          size: "14.2 MB",
          year: "2024",
        },
        {
          id: "art1_f2",
          title: "ملخص مستجدات المنهاج الدراسي وخارطة الطريق",
          url: "https://profpressma.blogspot.com/2024/11/2024.html",
          fileType: "PDF",
          size: "4.8 MB",
          year: "2024",
        },
      ],
    },
    {
      id: "art_2",
      title: "فتح بوابة الترشيح الالكتروني لاجتياز امتحانات الكفاءة المهنية mihani.men.gov.ma",
      category: "procedures",
      categoryLabel: "المساطر والترشيح",
      badge: "منصة مهني",
      iconName: "Laptop",
      cycle: "all",
      cycleLabel: "جميع الأسلاك",
      author: "وزارة التربية الوطنية",
      date: "دليل رسمي",
      summary: "شرح تفصيلي لخطوات الترشيح عبر منصة مهني mihani.men.gov.ma، شروط الأقدمية، ومعايير احتساب نقطة الترقية بالامتحان والتفتيش.",
      sourceUrl: "https://profpressma.blogspot.com/2022/12/2022-mihanimengovma.html",
      articleContent: `<h2>دليل الترشيح الإلكتروني لاجتياز امتحانات الكفاءة المهنية</h2>
<p>تعلن وزارة التربية الوطنية والتعليم الأولي والرياضة سنوياً عن فتح باب الترشيح لاجتياز امتحانات الكفاءة المهنية الخاصة بهيئة التدريس وهيئة الإدارة والمسالك التربوية، وذلك حصرياً عبر المنصة الرقمية <strong>mihani.men.gov.ma</strong>.</p>

<h3>1. الشروط النظامية للترشيح</h3>
<ul>
  <li>أن يكون المترشح(ة) مرسماً في إطاره ودرجته الحالية.</li>
  <li>قضاء 6 سنوات على الأقل من الخدمة الفعلية بهذه الصفة إلى غاية 31 دجنبر من سنة إجراء الامتحان.</li>
  <li>عدم الجمع بين الترشيح للامتحان المهني والترقية بالاختيار في نفس السنة.</li>
</ul>

<h3>2. خطوات التسجيل والمصادقة</h3>
<ol>
  <li>الولوج إلى الموقع: <code>https://mihani.men.gov.ma</code> باستخدام البريد المهني (nom.prenom@taalim.ma) وكلمة المرور.</li>
  <li>التحقق من المعلومات الإدارية والشخصية: الإطار، الدرجة، الرتبة، تاريخ التعيين، والأقدمية في السلم.</li>
  <li>تعبئة الاختيارات والمصادقة على الطلب الإلكتروني (Validation).</li>
  <li>طباعة بطاقة الترشيح وتوقيعها وإيداعها لدى إدارة المؤسسة التعليمية للتأشير عليها وإحالتها على المديرية الإقليمية.</li>
</ol>

<h3>3. تركيبة النقطة الإجمالية للامتحان</h3>
<p>تحتسب النقطة النهائية المحددة للنجاح والترتيب على النحو التالي:</p>
<table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
  <thead>
    <tr style="background-color: #1e3a8a; color: white;">
      <th style="padding: 10px; border: 1px solid #cbd5e1; text-align: right;">المكون</th>
      <th style="padding: 10px; border: 1px solid #cbd5e1; text-align: center;">النسبة</th>
      <th style="padding: 10px; border: 1px solid #cbd5e1; text-align: right;">الملاحظات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>معدل الاختبارات الكتابية</strong></td>
      <td style="padding: 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">50%</td>
      <td style="padding: 8px; border: 1px solid #cbd5e1;">معدل اختباري الديداكتيك والمجال البيداغوجي</td>
    </tr>
    <tr style="background-color: #f8fafc;">
      <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>نقطة التفتيش والمراقبة المستمرة</strong></td>
      <td style="padding: 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">30%</td>
      <td style="padding: 8px; border: 1px solid #cbd5e1;">آخر نقطة تفتيش رسمية ممنوحة للأستاذ(ة)</td>
    </tr>
    <tr>
      <td style="padding: 8px; border: 1px solid #cbd5e1;"><strong>نقطة الإدارة والتقويم المهني</strong></td>
      <td style="padding: 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">20%</td>
      <td style="padding: 8px; border: 1px solid #cbd5e1;">ممنوحة من طرف رئيس المؤسسة والمدير الإقليمي</td>
    </tr>
  </tbody>
</table>`,
      downloadFiles: [
        {
          id: "art2_f1",
          title: "المذكرة الوزارية المنظمة لامتحانات الكفاءة المهنية (PDF)",
          url: "https://profpressma.blogspot.com/2022/12/2022-mihanimengovma.html",
          fileType: "PDF",
          size: "2.1 MB",
          year: "2024",
        },
      ],
    },
    {
      id: "art_3",
      title: "مفهوم الكفاءة العرضية وأبعاد الكفاية والعناصر المكونة لها",
      category: "pedagogy",
      categoryLabel: "علوم التربية",
      badge: "المفاهيم البيداغوجية",
      iconName: "Brain",
      cycle: "all",
      cycleLabel: "جميع الأسلاك",
      author: "د. همام - بروف بريس",
      date: "دراسة بيداغوجية",
      summary: "تفكيك مفهوم الكفاية، الكفايات العرضية والنوعية، أبعاد الكفاية، والقدرات والمهارات المكونة لها في الامتحانات المهنية.",
      sourceUrl: "https://profpressma.blogspot.com/2021/08/blog-post_77.html",
      articleContent: `<h2>مفهوم الكفاءة العرضية وأبعاد الكفاية في الحقل البيداغوجي</h2>
<p>تحتل مفاهيم <strong>الكفاية (Compétence)</strong> و<strong>الكفايات العرضية (Compétences transversales)</strong> موقع الصدارة في مواضيع امتحانات الكفاءة المهنية ومباريات التفتيش والتوجيه والتخطيط.</p>

<h3>1. تعريف الكفاية</h3>
<p>تُعرّف الكفاية بأنها: <em>"إمكانية التعبئة المندمجة لمجموعة من الموارد المعرفية والمهارية والوجدانية لمواجهة فئة من الوضعيات المشكلة وحلها بنجاح وبشكل متكيف ومستقل"</em>.</p>

<h3>2. أبعاد الكفاية والعناصر المكونة لها</h3>
<ul>
  <li><strong>البعد المعرفي (Savoir):</strong> المعارف، المفاهيم، القواعد، والمعلومات التي يكتسبها المتعلم.</li>
  <li><strong>البعد المهاري والعملياتي (Savoir-faire):</strong> القدرة على التطبيق، التحليل، الإنتاج، واستعمال التقنيات والوسائل.</li>
  <li><strong>البعد القيمي والوجداني (Savoir-être):</strong> المواقف، السلوكات، احترام الآخرين، وروح المسؤولية والمبادرة.</li>
</ul>

<h3>3. الكفايات العرضية (Transversales)</h3>
<p>هي الكفايات المشتركة والممتدة عبر مختلف المواد والأنشطة الدراسية، ولا تنحصر في تخصص واحد، وتنقسم في المنهاج المغربي إلى خمسة مجالات رئيسية:</p>
<ol>
  <li><strong>الكفايات الاستراتيجية:</strong> معرفة الذات، التموضع في الزمان والمكان، والتكيف مع المحيط.</li>
  <li><strong>الكفايات التواصلية:</strong> إتقان اللغات، التعبير السليم، التواصل الشفهي والكتابي، والإنصات الفعال.</li>
  <li><strong>الكفايات المنهجية:</strong> منهجية العمل الفردي والجماعي، التفكير النقدي، والبحث والتوثيق.</li>
  <li><strong>الكفايات الثقافية:</strong> تنمية الرصيد الثقافي، والانفتاح على الحضارات الإنسانية.</li>
  <li><strong>الكفايات التكنولوجية:</strong> استثمار تكنولوجيا المعلومات والاتصالات في التعلم والحياة اليومية.</li>
</ol>`,
      downloadFiles: [
        {
          id: "art3_f1",
          title: "ملخص أبعاد الكفاية والكفايات العرضية في المنهاج (PDF)",
          url: "https://profpressma.blogspot.com/2021/08/blog-post_77.html",
          fileType: "PDF",
          size: "3.2 MB",
          year: "2024",
        },
      ],
    },
    {
      id: "art_4",
      title: "تخطيط الكفايات الذاتية والاجتماعية وتنمية المهارات الحياتية",
      category: "didactics",
      categoryLabel: "الديداكتيك والمناهج",
      badge: "المهارات الحياتية",
      iconName: "Sparkles",
      cycle: "all",
      cycleLabel: "جميع الأسلاك",
      author: "موقع الأساتذة بروف بريس",
      date: "دليل بيداغوجي",
      summary: "الإطار المنهجي لتصريف المهارات الحياتية وإدماجها في التخطيط التربوي والأنشطة الصفية والمشاريع التربوية.",
      sourceUrl: "https://profpressma.blogspot.com/2021/09/blog-post_35.html",
      articleContent: `<h2>تخطيط الكفايات الذاتية والاجتماعية والمهارات الحياتية</h2>
<p>يعد مدخل <strong>المهارات الحياتية (Life Skills)</strong> من المداخل الاستراتيجية الحديثة التي أولاها المنهاج الدراسي المغربي عناية فائقة، لتعزيز الشخصية المتوازنة للمتعلم وتأهيله للاندماج الفاعل في المجتمع.</p>

<h3>1. المجالات الأربعة للمهارات الحياتية (اليونيسيف والمنهاج الوطني):</h3>
<ul>
  <li><strong>البعد المعرفي (التعلم للمعرفة):</strong> التفكير النقدي، حل المشكلات، والإبداع.</li>
  <li><strong>البعد الفردي (التعلم للوجود):</strong> إدارة الذات، الصمود، وتقدير الذات.</li>
  <li><strong>البعد الاجتماعي (التعلم للعيش المشترك):</strong> التواصل، التعاطف، العمل الجماعي، والتفاوض.</li>
  <li><strong>البعد المهني (التعلم للعمل):</strong> اتخاذ القرار، المبادرة، والقيادة.</li>
</ul>

<h3>2. كيفية تصريف المهارات الحياتية في الجذاذة والأنشطة الصفية</h3>
<p>لا تُدرّس المهارات الحياتية كمادة منفصلة، بل تُدمج عبر وضعيات تعلمية تفاعلية، مثل: لعب الأدوار، العمل بالمجموعات الصغيرة، العصف الذهني، والمشاريع التربوية المندمجة.</p>`,
      downloadFiles: [
        {
          id: "art4_f1",
          title: "دليل إدماج المهارات الحياتية في الأنشطة الصفية (PDF)",
          url: "https://profpressma.blogspot.com/2021/09/blog-post_35.html",
          fileType: "PDF",
          size: "5.1 MB",
          year: "2024",
        },
      ],
    },
    {
      id: "art_5",
      title: "حافضة التدابير ذات الأولوية وملخص المحاور الاستراتيجية لإصلاح التعليم",
      category: "pedagogy",
      categoryLabel: "مستجدات وإصلاح",
      badge: "التدابير ذات الأولوية",
      iconName: "Layers",
      cycle: "all",
      cycleLabel: "جميع الأسلاك",
      author: "موقع بروف بريس",
      date: "ملخص استراتيجي",
      summary: "ملخص المحاور والتدابير ذات الأولوية لإصلاح منظومة التربية والتكوين، مع التركيز على التعلمات الأساس ومراحل التأهيل.",
      sourceUrl: "https://profpressma.blogspot.com/2021/09/blog-post_98.html",
      articleContent: `<h2>حافظة التدابير ذات الأولوية وخطة إصلاح المنظومة</h2>
<p>تعتبر التدابير ذات الأولوية مرجعاً أساسياً لتتبع تطور السياسات التعليمية في المغرب منذ الرؤية الاستراتيجية 2015-2030 وصولاً إلى القانون الإطار 51.17 وخارطة الطريق 2022-2026.</p>

<h3>أبرز محاور التدابير ذات الأولوية:</h3>
<ul>
  <li><strong>المحور الأول: التمكن من التعلمات الأساسية</strong> (القراءة والكتابة والحساب في السنوات الأولى للابتدائي).</li>
  <li><strong>المحور الثاني: التمكن من اللغات الأجنبية</strong> والانفتاح على المسالك الدولية للباكالوريا.</li>
  <li><strong>المحور الثالث: دمج التعليم العام والتكوين المهني</strong> وتثمين المسارات المهنية.</li>
  <li><strong>المحور الرابع: تأهيل المؤسسات التعليمية</strong> وتطوير الحكامة والقيادة المدرسية.</li>
  <li><strong>المحور الخامس: تجويد تكوين الأطر التربوية</strong> وملاءمة برامج المراكز الجهوية لمهن التربية والتكوين.</li>
</ul>`,
      downloadFiles: [
        {
          id: "art5_f1",
          title: "ملخص مضامين ومحاور التدابير ذات الأولوية (PDF)",
          url: "https://profpressma.blogspot.com/2021/09/blog-post_98.html",
          fileType: "PDF",
          size: "2.7 MB",
          year: "2024",
        },
      ],
    },
    {
      id: "art_6",
      title: "مصوغة تكوينية شاملة للمقبلين على اجتياز الامتحان المهني ومباريات التربية",
      category: "pedagogy",
      categoryLabel: "علوم التربية",
      badge: "مصوغة شاملة",
      iconName: "Award",
      cycle: "all",
      cycleLabel: "جميع الأسلاك",
      author: "موقع الأساتذة بروف بريس",
      date: "مصوغة كاملة",
      summary: "مصوغة جامعة لأهم نظريات التعلم (البنائية، الجشطالتية، السلوكية، المعرفية، الاجتماعية)، علم نفس الطفل والمراهق، وبيداغوجيا الكفايات.",
      sourceUrl: "https://profpressma.blogspot.com/2020/10/blog-post_86.html",
      articleContent: `<h2>المصوغة التكوينية الشاملة في البيداغوجيا والديداكتيك</h2>
<p>تم إعداد هذه المصوغة لتكون دليلاً عملياً مكثفاً يجيب بدقة عن أكثر من 80% من الأسئلة المتكررة في امتحانات الكفاءة المهنية بمختلف الأسلاك.</p>

<h3>أبواب المصوغة:</h3>
<ol>
  <li><strong>الباب الأول: نظريات التعلم وتطبيقاتها الصفية:</strong>
    <ul>
      <li>النظرية السلوكية (بافلوف، واطسون، سكينر): المثير، الاستجابة، والتعزيز.</li>
      <li>النظرية البنائية (جان بياجيه): التمثل، الاستيعاب، الملاءمة، والتوازن.</li>
      <li>النظرية السوسيو-بنائية (فيغوتسكي): منطقة النمو القريب (ZPD) والوساطة والتفاعل الاجتماعي.</li>
      <li>النظرية الجشطالتية (كوهلر، كوفكا): الاستبصار، الإدراك الكلي، وبنية الموقف.</li>
      <li>النظرية المعرفية ونظرية معالجة المعلومات.</li>
    </ul>
  </li>
  <li><strong>الباب الثاني: البيداغوجيات الوظيفية الحديثة:</strong>
    <ul>
      <li>البيداغوجيا الفارقية واستراتيجيات تفريد التعليم.</li>
      <li>بيداغوجيا الخطأ: أنواع الأخطاء وطرق معالجتها واستثمارها في البناء.</li>
      <li>بيداغوجيا المشروع، بيداغوجيا اللعب، وبيداغوجيا العقد.</li>
    </ul>
  </li>
  <li><strong>الباب الثالث: التقويم والدعم التربوي:</strong>
    <ul>
      <li>أنواع التقويم: التشخيصي، التكويني، والإجمالي الجزائي.</li>
      <li>أدوات الموضعة وشبكات التقويم بالمعايير والمؤشرات.</li>
      <li>خطة الدعم المؤسساتي والدعم المندمج.</li>
    </ul>
  </li>
</ol>`,
      downloadFiles: [
        {
          id: "art6_f1",
          title: "تحميل المصوغة التكوينية الشاملة (PDF جاهز للطباعة)",
          url: "https://profpressma.blogspot.com/2020/10/blog-post_86.html",
          fileType: "PDF",
          size: "15.8 MB",
          year: "2024",
        },
      ],
    },
  ],
  examModels: [
    // Primary (التعليم الابتدائي)
    {
      id: "mod_pri_2024_did",
      title: "امتحان الكفاءة المهنية دورة 2024 - ديداكتيك مواد الابتدائي",
      cycle: "primary",
      cycleName: "التعليم الابتدائي",
      subject: "ديداكتيك المواد (العربية، الفرنسية، الرياضيات، النشاط العلمي)",
      year: "2024",
      session: "دورة دجنبر 2024",
      targetGrade: "الدرجة الأولى (السلم 11)",
      downloadUrl: "https://profpressma.blogspot.com/p/blog-page_77.html",
      hasCorrection: true,
      correctionUrl: "https://profpressma.blogspot.com/p/blog-page_77.html",
      fileSize: "2.4 MB",
    },
    {
      id: "mod_pri_2024_ped",
      title: "امتحان الكفاءة المهنية دورة 2024 - المجال البيداغوجي والممارسة المهنية",
      cycle: "primary",
      cycleName: "التعليم الابتدائي",
      subject: "المجال البيداغوجي والممارسة المهنية",
      year: "2024",
      session: "دورة دجنبر 2024",
      targetGrade: "الدرجة الأولى (السلم 11)",
      downloadUrl: "https://profpressma.blogspot.com/p/blog-page_77.html",
      hasCorrection: true,
      correctionUrl: "https://profpressma.blogspot.com/p/blog-page_77.html",
      fileSize: "1.9 MB",
    },
    {
      id: "mod_pri_2023_all",
      title: "امتحان الكفاءة المهنية دورة 2023 - ابتدائي (موضوعان مع عناصر الإجابة)",
      cycle: "primary",
      cycleName: "التعليم الابتدائي",
      subject: "الديداكتيك + المجال البيداغوجي",
      year: "2023",
      session: "دورة دجنبر 2023",
      targetGrade: "الدرجة الأولى (السلم 11)",
      downloadUrl: "https://profpressma.blogspot.com/p/blog-page_77.html",
      hasCorrection: true,
      fileSize: "3.5 MB",
    },
    {
      id: "mod_pri_2022_all",
      title: "امتحانات الكفاءة المهنية دورة 2022 - ابتدائي كاملة مع التصحيح",
      cycle: "primary",
      cycleName: "التعليم الابتدائي",
      subject: "ديداكتيك المواد + علوم التربية",
      year: "2022",
      session: "دورة دجنبر 2022",
      targetGrade: "الدرجة الأولى (السلم 11)",
      downloadUrl: "https://profpressma.blogspot.com/p/blog-page_77.html",
      hasCorrection: true,
      fileSize: "4.1 MB",
    },
    {
      id: "mod_pri_2021_all",
      title: "امتحان الكفاءة المهنية دورة 2021 - ابتدائي مع التصحيح المفصل",
      cycle: "primary",
      cycleName: "التعليم الابتدائي",
      subject: "ديداكتيك المواد والتربية",
      year: "2021",
      session: "دورة دجنبر 2021",
      targetGrade: "الدرجة الأولى (السلم 11)",
      downloadUrl: "https://profpressma.blogspot.com/p/blog-page_77.html",
      hasCorrection: true,
      fileSize: "3.8 MB",
    },
    {
      id: "mod_pri_2020_all",
      title: "امتحانات الكفاءة المهنية دورة 2020 - ابتدائي مع عناصر الإجابة الرسمية",
      cycle: "primary",
      cycleName: "التعليم الابتدائي",
      subject: "ديداكتيك المواد والمجال البيداغوجي",
      year: "2020",
      session: "دورة 2020",
      targetGrade: "الدرجة الأولى (السلم 11)",
      downloadUrl: "https://profpressma.blogspot.com/p/blog-page_77.html",
      hasCorrection: true,
      fileSize: "3.2 MB",
    },
    {
      id: "mod_pri_2015_2019",
      title: "حزمة امتحانات الكفاءة المهنية للابتدائي من 2015 إلى 2019 مجمعة",
      cycle: "primary",
      cycleName: "التعليم الابتدائي",
      subject: "جميع المواضيع السابقة مع التصحيح",
      year: "2015-2019",
      session: "دورات متعددة",
      targetGrade: "الدرجة الأولى (السلم 11)",
      downloadUrl: "https://profpressma.blogspot.com/2022/07/2015-2016.html",
      hasCorrection: true,
      fileSize: "16.5 MB",
    },

    // Middle School (التعليم الثانوي الإعدادي)
    {
      id: "mod_mid_2024_all",
      title: "امتحان الكفاءة المهنية دورة 2024 - الثانوي الإعدادي (جميع المواد)",
      cycle: "middle",
      cycleName: "التعليم الثانوي الإعدادي",
      subject: "ديداكتيك مادة التخصص + المجال البيداغوجي",
      year: "2024",
      session: "دورة 2024",
      targetGrade: "الدرجة الأولى (السلم 11) وخارج السلم",
      downloadUrl: "https://profpressma.blogspot.com/p/blog-page_77.html",
      hasCorrection: true,
      fileSize: "8.5 MB",
    },
    {
      id: "mod_mid_2023_all",
      title: "امتحانات الكفاءة المهنية دورة 2023 - إعدادي مع التصحيح",
      cycle: "middle",
      cycleName: "التعليم الثانوي الإعدادي",
      subject: "ديداكتيك التخصص (عربية، فرنسية، رياضيات، علوم، إنجليزية، اجتماعيات)",
      year: "2023",
      session: "دورة 2023",
      targetGrade: "الدرجة الأولى (السلم 11)",
      downloadUrl: "https://profpressma.blogspot.com/p/blog-page_77.html",
      hasCorrection: true,
      fileSize: "9.2 MB",
    },
    {
      id: "mod_mid_2016_2022",
      title: "حزمة نماذج امتحانات الإعدادي من 2016 إلى 2022 مع عناصر الإجابة",
      cycle: "middle",
      cycleName: "التعليم الثانوي الإعدادي",
      subject: "أرشيف ديداكتيك التخصص للثانوي الإعدادي",
      year: "2016-2022",
      session: "أرشيف شامل",
      targetGrade: "الدرجة الأولى (السلم 11)",
      downloadUrl: "https://profpressma.blogspot.com/p/blog-page_77.html",
      hasCorrection: true,
      fileSize: "22.4 MB",
    },

    // High School (التعليم الثانوي التأهيلي)
    {
      id: "mod_high_2024_all",
      title: "امتحان الكفاءة المهنية دورة 2024 - الثانوي التأهيلي (الترقية لخارج السلم والسلم 11)",
      cycle: "high",
      cycleName: "التعليم الثانوي التأهيلي",
      subject: "ديداكتيك التخصص والمجال البيداغوجي",
      year: "2024",
      session: "دورة 2024",
      targetGrade: "خارج السلم والدرجة الأولى",
      downloadUrl: "https://profpressma.blogspot.com/p/blog-page_77.html",
      hasCorrection: true,
      fileSize: "11.2 MB",
    },
    {
      id: "mod_high_2023_all",
      title: "امتحانات الكفاءة المهنية دورة 2023 - تأهيلي مع التصحيح",
      cycle: "high",
      cycleName: "التعليم الثانوي التأهيلي",
      subject: "ديداكتيك المواد (فلسفة، علوم، رياضيات، آداب، لغات، اقتصاد)",
      year: "2023",
      session: "دورة 2023",
      targetGrade: "خارج السلم والسلم 11",
      downloadUrl: "https://profpressma.blogspot.com/p/blog-page_77.html",
      hasCorrection: true,
      fileSize: "12.8 MB",
    },
    {
      id: "mod_high_2015_2022",
      title: "مجموعة نماذج امتحانات التأهيلي 2015-2022 مع عناصر التصحيح",
      cycle: "high",
      cycleName: "التعليم الثانوي التأهيلي",
      subject: "جميع المواد والشعب",
      year: "2015-2022",
      session: "أرشيف شامل",
      targetGrade: "خارج السلم والسلم 11",
      downloadUrl: "https://profpressma.blogspot.com/p/blog-page_77.html",
      hasCorrection: true,
      fileSize: "28.5 MB",
    },
  ],
};
