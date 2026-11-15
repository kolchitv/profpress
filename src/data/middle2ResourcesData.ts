import { EducationalResourceItem } from "../types";

export const PROFPRESS_2AC_BLOG_URL =
  "https://profpressma.blogspot.com/search/label/%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A%D8%A9%20%D8%A5%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A";

export const MIDDLE_2_RESOURCES: EducationalResourceItem[] = [
  // =========================================================================
  // 1. التخطيط السنوي وبوابة الثانية إعدادي
  // =========================================================================
  {
    id: "m2-dist-annual",
    title: "التوزيع السنوي ومذكرة المراقبة المستمرة لمواد الثانية إعدادي 2026/2027",
    category: "planning",
    subject: "عام",
    semester: "annual",
    format: "PDF / DOCX",
    description:
      "جدولة التوزيع السنوي لأساتذة السنة الثانية ثانوي إعدادي (2AC) متوافقة مع التوجيهات التربوية الرسمية ومذكرات التقويم المستمر للأسدوسين الأول والثاني.",
    downloadUrl: PROFPRESS_2AC_BLOG_URL,
    downloadLabel: "تصفح أرشيف الثانية إعدادي على ProfPress",
    updatedDate: "شتنبر 2026",
    downloadsCount: 2480,
    featured: true,
    tags: ["توزيع سنوي", "2AC", "الثانية إعدادي", "تخطيط"],
    content: `## التخطيط السنوي وبرامج السنة الثانية ثانوي إعدادي (2AC)

يغطي برنامج السنة الثانية من التعليم الثانوي الإعدادي مسلكين أساسيين: **المسلك العام** و**المسلك الدولي (خيار فرنسية - 2APIC)**، مع توزيع منتظم لفروض المراقبة المستمرة والأنشطة المندمجة على مدى 34 أسبوعاً دراسياً.

### المحاور المبرمجة ضمن هذا القسم:
- **اللغة العربية:** الوحدات الست لمرشدي وفي رحاب اللغة العربية (القيم الإسلامية، الوطنية، الحضارية، الاجتماعية، السكانية، الفنية الثقافية)، مع جميع ملخصات الدرس اللغوي وتحاضير النصوص والتعبير والإنشاء.
- **الرياضيات (2AC / 2ASC):** الجذاذات الكاملة للجبر والهندسة وكتاب التمارين المحلولة للخيار الدولي.
- **العلوم الفيزيائية والكيمياء (2AC):** عروض PowerPoint والدروس الكاملة للمسلك الدولي (الضوء، التفاعل الكيميائي، الكهرباء) مع الفروض المصححة.
- **علوم الحياة والأرض (SVT):** نظرية تكتونية الصفائح والزلازل والبراكين والصخور الصهارية والتوالد والوراثة عند الإنسان.
- **الاجتماعيات والتربية الإسلامية:** الجذاذات والملخصات الكاملة للتاريخ والجغرافيا والمداخل الخمسة للتربية الإسلامية.`,
    downloads: [
      {
        id: "m2-link-label",
        label: "أرشيف مواضيع الثانية إعدادي الكامل (ProfPress)",
        url: PROFPRESS_2AC_BLOG_URL,
        fileType: "other",
        note: "المصدر الرسمي",
      },
      {
        id: "m2-link-college",
        label: "صفحة السلك الإعدادي الشاملة (ProfPress College)",
        url: "https://profpressma.blogspot.com/p/college.html",
        fileType: "other",
        note: "تصفح كل المستويات",
      },
      {
        id: "m2-link-jodadat",
        label: "قسم جذاذات الثانية إعدادي",
        url: "https://profpressma.blogspot.com/search/label/%D8%AC%D8%B0%D8%A7%D8%B0%D8%A7%D8%AA%202%20%D8%A5%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A",
        fileType: "word",
        note: "جذاذات جاهزة",
      },
      {
        id: "m2-link-foroud",
        label: "قسم فروض المراقبة المستمرة الثانية إعدادي",
        url: "https://profpressma.blogspot.com/search/label/%D9%81%D8%B1%D9%88%D8%B6%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A%D8%A9%20%D8%A5%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A",
        fileType: "pdf",
        note: "فروض 1 و 2 و 3",
      },
    ],
  },

  // =========================================================================
  // 2. مادة الرياضيات (التمارين، الجذاذات، الدروس، الفروض)
  // =========================================================================
  {
    id: "m2-math-jodadat-full",
    title: "حقيبة جذاذات مادة الرياضيات للسنة الثانية ثانوي إعدادي (20 ملفاً Word & PDF)",
    category: "lessons",
    subject: "الرياضيات",
    semester: "annual",
    format: "DOCX / PDF",
    description:
      "أكبر تجميعية لجذاذات الرياضيات للثانية إعدادي بصيغتي Word القابلة للتعديل وPDF: الأعداد الجذرية، القوى، مبرهنة فيتاغورس، التوازي ومنتصفات أضلاع مثلث، الحساب الحرفي، الدالة الخطية، المتجهات، التماثل المحوري، والإحصاء.",
    downloadUrl: "https://profpressma.blogspot.com/2018/10/jodadat-2-i3dadi.html",
    downloadLabel: "فتح موضوع جذاذات الرياضيات (2AC)",
    updatedDate: "أكتوبر 2026",
    downloadsCount: 4920,
    featured: true,
    tags: ["جذاذات رياضيات", "2AC", "Word", "جبر وهندسة"],
    content: `## جذاذات مادة الرياضيات للسنة الثانية ثانوي إعدادي (الجبر والهندسة)

تضم هذه الحقيبة جميع الجذاذات الديداكتيكية لدروس الأسدوس الأول والأسدوس الثاني بصيغة **DOCX (Word)** قابلة للتكييف مع خصوصيات القسم، بالإضافة إلى حزم **PDF** ومجلدات Google Drive:

### أولاً: دروس الجبر والأنشطة العددية
- **العمليات الأربع على الأعداد الجذرية** (الجمع والطرح والضرب والقسمة)
- **القوى (Les Puissances)** وخصائص القوى ذات الأس السالب والموجب
- **الحساب الحرفي (Calcul littéral)** والمعادلات من الدرجة الأولى
- **الدالة الخطية والتناسبية** والأنشطة المبيانية والإحصائية

### ثانياً: دروس الهندسة
- **التماثل المحوري (Symétrie axiale)**
- **التوازي ومنتصفات أضلاع مثلث**
- **المستقيمات الهامة في مثلث** (الارتفاعات، المنصفات، المتوسطات، الواسطات)
- **المثلث القائم الزاوية والدائرة — مبرهنة فيتاغورس (Pythagore)**
- **المتجهات والإزاحة (Les vecteurs et translation)**`,
    downloads: [
      {
        id: "m2-m-doc-pythagore",
        label: "جذاذة المثلث القائم الزاوية والدائرة (فيتاغورس)",
        url: "http://www.mediafire.com/file/p350062id1i5fnx/pythagore.docx",
        fileType: "word",
        fileSize: "DOCX",
      },
      {
        id: "m2-m-doc-operations",
        label: "جذاذة العمليات الأربع على الأعداد الجذرية",
        url: "http://www.mediafire.com/file/y341qq0mp69g0g4/%D8%A7%D9%84%D8%B9%D9%85%D9%84%D9%8A%D8%A7%D8%AA_%D8%A7%D9%84%D8%A7%D8%B1%D8%A8%D8%B9_%D8%B9%D9%84%D9%89_%D8%A7%D9%84%D8%A7%D8%B9%D8%AF%D8%A7%D8%AF_%D8%A7%D9%84%D8%AC%D8%B0%D8%B1%D9%8A%D8%A9.docx",
        fileType: "word",
        fileSize: "DOCX",
      },
      {
        id: "m2-m-doc-powers",
        label: "جذاذة درس القوى (الرياضيات 2AC)",
        url: "http://www.mediafire.com/file/j98k9h876qj3mus/%D8%A7%D9%84%D9%82%D9%88%D9%89%282%29.docx",
        fileType: "word",
        fileSize: "DOCX",
      },
      {
        id: "m2-m-doc-calc",
        label: "جذاذة الحساب الحرفي",
        url: "http://www.mediafire.com/file/f54u4hhizr52cl4/%D8%A7%D9%84%D8%AD%D8%B3%D8%A7%D8%A8_%D8%A7%D9%84%D8%AD%D8%B1%D9%81%D9%8A.docx",
        fileType: "word",
        fileSize: "DOCX",
      },
      {
        id: "m2-m-doc-linear",
        label: "جذاذة الدالة الخطية",
        url: "http://www.mediafire.com/file/roa5mbah5gva85r/%D8%A7%D9%84%D8%AF%D8%A7%D9%84%D8%A9_%D8%A7%D9%84%D8%AE%D8%B7%D9%8A%D8%A9.docx",
        fileType: "word",
        fileSize: "DOCX",
      },
      {
        id: "m2-m-doc-vectors",
        label: "جذاذة المتجهات والإزاحة",
        url: "http://www.mediafire.com/file/myr1ilehei13es0/%D8%A7%D9%84%D9%85%D8%AA%D8%AC%D9%87%D8%A7%D8%AA.docx",
        fileType: "word",
        fileSize: "DOCX",
      },
      {
        id: "m2-m-doc-lines",
        label: "جذاذة المستقيمات الهامة في مثلث",
        url: "http://www.mediafire.com/file/erg6k51vqd21tok/%D8%A7%D9%84%D9%85%D8%B3%D8%AA%D9%82%D9%8A%D9%85%D8%A7%D8%AA_%D8%A7%D9%84%D9%87%D8%A7%D9%85%D8%A9_%D9%81%D9%8A_%D9%85%D8%AB%D9%84%D8%AB.docx",
        fileType: "word",
        fileSize: "DOCX",
      },
      {
        id: "m2-m-doc-sym",
        label: "جذاذة التماثل المحوري",
        url: "http://www.mediafire.com/file/l935ugdm7jfu7hj/%D8%AB%D9%85%D8%A7%D8%AB%D9%84_%D9%85%D8%AD%D9%88%D8%B1%D9%8A.docx",
        fileType: "word",
        fileSize: "DOCX",
      },
      {
        id: "m2-m-doc-mid",
        label: "جذاذة التوازي ومنتصفات أضلاع مثلث",
        url: "http://www.mediafire.com/file/jjjxy4v531eh6hb/%D8%A7%D9%84%D8%AA%D9%88%D8%A7%D8%B2%D9%8A_%D9%88_%D9%85%D9%86%D8%AA%D8%B5%D9%81%D8%A7%D8%AA_%D8%A3%D8%B6%D9%84%D8%A7%D8%B9_%D9%85%D8%AB%D9%84%D8%AB.docx",
        fileType: "word",
        fileSize: "DOCX",
      },
      {
        id: "m2-m-doc-stat",
        label: "جذاذة الإحصاء (السنة الثانية إعدادي)",
        url: "http://www.mediafire.com/file/emargquee5oh1gj/%D8%A7%D9%84%D8%A5%D8%AD%D8%B5%D8%A7%D8%A1__%D8%A7%D9%84%D8%B3%D9%86%D8%A9_%D8%A7%D9%84%D8%AA%D8%A7%D9%86%D9%8A%D8%A9_%D8%A5%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A.docx",
        fileType: "word",
        fileSize: "DOCX",
      },
      {
        id: "m2-m-doc-tri",
        label: "جذاذة درس المثلث",
        url: "http://www.mediafire.com/file/q6ax5tyrdaxm0u1/%D8%AF%D8%B1%D8%B3_%D8%A7%D9%84%D9%85%D8%AB%D9%84%D8%AB.docx",
        fileType: "word",
        fileSize: "DOCX",
      },
      {
        id: "m2-m-pdf-alg1",
        label: "جذاذات الجبر الدورة 1 (PDF كامل)",
        url: "http://www.mediafire.com/file/3hc0nn20twfldd2/%D8%AC%D8%B0%D8%A7%D8%B0%D8%A7%D8%AA_%D8%A7%D9%84%D8%AC%D8%A8%D8%B1_%D8%A7%D9%84%D8%AF%D9%88%D8%B1%D8%A9_1.pdf",
        fileType: "pdf",
        fileSize: "PDF",
      },
      {
        id: "m2-m-pdf-alg2",
        label: "جذاذات الجبر الدورة 2 (PDF كامل)",
        url: "http://www.mediafire.com/file/ttc2pca521c3zz1/%D8%AC%D8%B0%D8%A7%D8%B0%D8%A7%D8%AA_%D8%A7%D9%84%D8%AC%D8%A8%D8%B1_%D8%A7%D9%84%D8%AF%D9%88%D8%B1%D8%A9_2.pdf",
        fileType: "pdf",
        fileSize: "PDF",
      },
      {
        id: "m2-m-pdf-geo1",
        label: "جذاذات الهندسة الدورة 1 (PDF كامل)",
        url: "http://www.mediafire.com/file/hbqmkz5vc5ge5cv/%D8%AC%D8%B0%D8%A7%D8%B0%D8%A7%D8%AA_%D8%A7%D9%84%D9%87%D9%86%D8%AF%D8%B3%D8%A9_%D8%A7%D9%84%D8%AF%D9%88%D8%B1%D8%A9_1.pdf",
        fileType: "pdf",
        fileSize: "PDF",
      },
      {
        id: "m2-m-pdf-geo2",
        label: "جذاذات الهندسة الدورة 2 (PDF كامل)",
        url: "http://www.mediafire.com/file/i7acl346963694t/%D8%AC%D8%B0%D8%A7%D8%B0%D8%A7%D8%AA_%D8%A7%D9%84%D9%87%D9%86%D8%AF%D8%B3%D8%A9_%D8%A7%D9%84%D8%AF%D9%88%D8%B1%D8%A9_2.pdf",
        fileType: "pdf",
        fileSize: "PDF",
      },
      {
        id: "m2-m-drv-stat",
        label: "جذاذات الأنشطة المبيانية والإحصائية الدورة 2 (Drive)",
        url: "https://drive.google.com/file/d/0B3j73Pz7FN4vZzZUTkdMTGNXZ2M/edit?usp=sharing",
        fileType: "drive",
        note: "Google Drive",
      },
    ],
  },
  {
    id: "m2-math-exercices-2asc",
    title: "كتاب تمارين الرياضيات للسنة الثانية إعدادي — خيار دولي (2ASC / 2APIC)",
    category: "textbooks",
    subject: "الرياضيات",
    semester: "annual",
    format: "PDF",
    description:
      "كتاب تمارين شامل وتطبيقات متدرجة في الرياضيات للثانية إعدادي مسلك دولي (إعداد الأستاذ بدر الدين)، جاهز للتحميل والمراجعة الفردية والصفيّة.",
    downloadUrl: "https://drive.google.com/file/d/1Qqr6hBLgGVdc4Qj1d2GPoExdoWjgOexe/view?usp=sharing",
    downloadLabel: "تحميل كتاب تمارين الرياضيات 2ASC (Drive)",
    updatedDate: "2026",
    downloadsCount: 3890,
    featured: true,
    tags: ["2ASC", "2APIC", "تمارين الرياضيات", "مسلك دولي"],
    content: `## كتاب التمارين الشاملة في الرياضيات (2ème Année Collège BIOF)

يضم هذا الكتاب التفاعلي سلسلة متكاملة من التمارين المصنفة حسب الصعوبة لتمكين تلاميذ المسلك الدولي (BIOF / 2ASC) وأساتذة المادة من:
- تثبيت القواعد الأساسية في **Nombres rationnels, Puissances, Calcul littéral, Équations et Ordre**.
- إتقان البرهنة الهندسية في **Symétrie axiale, Droites remarquables, Triangle rectangle et Cercle, Vecteurs**.
- التحضير القبلي الجيد لفروض المراقبة المستمرة.`,
    downloads: [
      {
        id: "m2-math-ex-1",
        label: "تحميل كتاب تمارين الرياضيات 2ASC — الجزء الأول (Drive)",
        url: "https://drive.google.com/file/d/1Qqr6hBLgGVdc4Qj1d2GPoExdoWjgOexe/view?usp=sharing",
        fileType: "drive",
        note: "نسخة PDF كاملة",
      },
      {
        id: "m2-math-ex-2",
        label: "تحميل كتاب تمارين الرياضيات 2ASC — الملحق والحلول (Drive)",
        url: "https://drive.google.com/file/d/11VLmOGXwCKONmBR2R2352GuekmaVpcYf/view?usp=sharing",
        fileType: "drive",
        note: "تمارين إضافية",
      },
      {
        id: "m2-math-ex-post",
        label: "صفحة الموضوع على بروف بريس",
        url: "https://profpressma.blogspot.com/2020/02/exercices-math-2ASC.html",
        fileType: "other",
      },
    ],
  },
  {
    id: "m2-math-cosinus-lesson",
    title: "درس جيب تمام زاوية حادة (Cosinus d'un angle aigu) — الرياضيات 2AC",
    category: "lessons",
    subject: "الرياضيات",
    semester: "s2",
    format: "PDF",
    description:
      "الدرس الأول في الحساب المثلثي للسنة الثانية إعدادي: تعريف جيب تمام زاوية حادة في مثلث قائم الزاوية، العلاقات المثلثية، والتطبيقات الهندسية.",
    downloadUrl: "https://profpressma.blogspot.com/2020/04/1_29.html",
    downloadLabel: "قراءة وتحميل درس جيب تمام زاوية حادة",
    updatedDate: "2026",
    downloadsCount: 2150,
    tags: ["جيب تمام زاوية حادة", "Cosinus", "مثلث قائم الزاوية", "2AC"],
    content: `## درس: جيب تمام زاوية حادة (Cosinus d'un angle aigu)

### 1. التعريف الأساسي
في مثلث $ABC$ قائم الزاوية في $A$:
- الضلع المقابل للزاوية القائمة يُسمى **الوتر (Hypoténuse)** وهو $[BC]$.
- للزاوية الحادة $\\widehat{ABC}$ ضلع محاذٍ هو $[AB]$.
- يُعرّف جيب تمام الزاوية الحادة $\\widehat{ABC}$ بأنه خارج طول الضلع المحاذي للزاوية على طول الوتر:
  $$\\cos(\\widehat{ABC}) = \\frac{AB}{BC}$$

### 2. خصائص مهمة
- بما أن طول الوتر أكبر دائماً من طولي الضلعين القائمين، فإن جيب تمام أي زاوية حادة محصور قطعا بين $0$ و $1$:
  $$0 < \\cos(\\alpha) < 1$$
- لحساب طول ضلع محاذٍ أو وتر انطلاقاً من قياس زاوية حادة نستعمل الآلة الحاسبة العلمية (زر **cos** أو **cos⁻¹ / Arccos**).`,
    downloads: [
      {
        id: "m2-cos-post",
        label: "صفحة الدرس على ProfPress",
        url: "https://profpressma.blogspot.com/2020/04/1_29.html",
        fileType: "other",
      },
      {
        id: "m2-cos-drive",
        label: "ملف جذاذات الهندسة الدورة 2 (Drive)",
        url: "https://drive.google.com/file/d/0B3j73Pz7FN4va0YzUGlMdHVocHc/edit?usp=sharing",
        fileType: "drive",
      },
    ],
  },
  {
    id: "m2-exam-math-s1",
    title: "نماذج الفروض المحروسة والمنزلية في الرياضيات 2AC الدورة 1 و 2",
    category: "exams",
    subject: "الرياضيات",
    semester: "annual",
    format: "PDF / DOCX",
    description:
      "سلسلة فروض محروسة ومنزلية نموذجية في الجبر والهندسة للسنة الثانية إعدادي (الدورة الأولى والدورة الثانية) مع روابط Google Drive والموضوعات المرجعية.",
    downloadUrl: "https://profpressma.blogspot.com/2018/03/fard3-math-2college.html",
    downloadLabel: "تحميل الفروض المحروسة للرياضيات 2AC",
    updatedDate: "2026",
    downloadsCount: 3420,
    featured: true,
    tags: ["فروض محروسة", "رياضيات", "2AC", "مراقبة مستمرة"],
    content: `## نماذج الفروض المحروسة والمنزلية — الرياضيات 2AC

يضم هذا الملف نماذج متنوعة من الفروض الكتابية الأولى والثانية والثالثة للأسدوسين الأول والثاني في:
- العمليات على الأعداد الجذرية والقوى والتوازي ومنتصفات أضلاع مثلث (الأسدوس 1)
- الحساب الحرفي والمعادلات والترتيب والعمليات والمثلث القائم الزاوية والدائرة والمتجهات (الأسدوس 2)`,
    downloads: [
      {
        id: "m2-math-fard-d2",
        label: "فرض محروس في الرياضيات الدورة الثانية (ProfPress)",
        url: "https://profpressma.blogspot.com/2018/03/fard3-math-2college.html",
        fileType: "pdf",
      },
      {
        id: "m2-math-drv-all",
        label: "مجموعة الفروض المحروسة والمنزلية 1 و 2 إعدادي (Drive)",
        url: "https://drive.google.com/file/d/0B3j73Pz7FN4vWkU5U2pJbTVvNVk/edit?usp=sharing",
        fileType: "drive",
      },
      {
        id: "m2-math-drv-home",
        label: "نماذج إضافية للتمارين والعمليات (Drive)",
        url: "https://drive.google.com/file/d/0B3j73Pz7FN4veGF0MXlJVHNodXc/edit?usp=sharing",
        fileType: "drive",
      },
    ],
  },

  // =========================================================================
  // 3. مادة اللغة العربية (الجذاذات، الدرس اللغوي، النصوص، التعبير، الفروض)
  // =========================================================================
  {
    id: "m2-arabic-jodadat-rihab",
    title: "جذاذات في رحاب اللغة العربية للسنة الثانية إعدادي كاملة حسب الوحدات الثمان",
    category: "lessons",
    subject: "اللغة العربية",
    semester: "annual",
    format: "DOCX / RAR",
    description:
      "جذاذات كاملة ومرتبة لمرجع في رحاب اللغة العربية للسنة الثانية ثانوي إعدادي تشمل مكونات النصوص القرائية والشعرية والدرس اللغوي والتعبير والإنشاء.",
    downloadUrl: "https://drive.google.com/file/d/0B0Ihevz7OXyAUTVEZDhDMXYyR3c/edit",
    downloadLabel: "تحميل جذاذات في رحاب اللغة العربية (Drive)",
    updatedDate: "2026",
    downloadsCount: 3740,
    featured: true,
    tags: ["في رحاب اللغة العربية", "جذاذات", "2AC"],
    downloads: [
      {
        id: "m2-ar-rihab-drv",
        label: "رابط التحميل الأول — جذاذات في رحاب اللغة العربية (Drive)",
        url: "https://drive.google.com/file/d/0B0Ihevz7OXyAUTVEZDhDMXYyR3c/edit",
        fileType: "drive",
      },
      {
        id: "m2-ar-rihab-mf",
        label: "رابط التحميل الثاني — حقيبة السنتين 1 و 2 إعدادي (MediaFire)",
        url: "http://www.mediafire.com/file/r9wct6dyw2ceh3z/%D8%AC%D8%AF%D8%A7%D8%AF%D8%A7%D8%A7%D8%AA_%D8%A7%D9%84%D9%84%D8%BA%D8%A9_%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A%D8%A9_%D8%A7%D9%84%D8%B3%D9%86%D8%AA%D9%8A%D9%86_1_2.rar",
        fileType: "mediafire",
      },
      {
        id: "m2-ar-rihab-post",
        label: "صفحة الموضوع على ProfPress",
        url: "https://profpressma.blogspot.com/2017/03/jodadat-fi-rihab-arabe-2college.html",
        fileType: "other",
      },
    ],
  },
  {
    id: "m2-arabic-lang-s1",
    title: "دروس وملخصات الدرس اللغوي للأسدوس الأول كاملة (جمع التكسير، المثنى، الجموع، الفاعل، المفاعيل)",
    category: "lessons",
    subject: "اللغة العربية",
    semester: "s1",
    format: "PDF / Interactive",
    description:
      "الدروس والملخصات الكاملة للدرس اللغوي — الأسدوس الأول (مرشدي 2AC): صوغ المثنى وإعرابه + نماذج الإعراب، جمع المذكر السالم، جمع المؤنث السالم، جمع التكسير (القلة والكثرة)، الفاعل (الإضمار الواجب والجائز)، والمفعول به والمفعول المطلق وفيه ومعه ولأجله.",
    downloadUrl: "https://profpressma.blogspot.com/2020/10/blog-post_60.html",
    downloadLabel: "تصفح دروس الدرس اللغوي الأسدوس الأول (9 روابط)",
    updatedDate: "أكتوبر 2026 — محين",
    downloadsCount: 3860,
    featured: true,
    tags: ["الدرس اللغوي", "جمع التكسير", "المثنى", "نماذج الإعراب", "المفاعيل", "2AC"],
    content: `▪ ملخصات الدرس اللغوي — الأسدوس الأول (مرشدي في اللغة العربية 2AC)

1. صوغ المثنى وإعرابه:
• تعريفه: اسم يدل على اثنين أو اثنتين متفقين في الحروف والحركات والمعنى، بزيادة ألف ونون مكسورة رفعاً (المصليان)، أو ياء ونون مكسورة نصباً وجراً (ركعتين).
• شروط التثنية: أن يكون الاسم مفرداً، معرباً، غير مركب، وله مماثل في اللفظ والمعنى.
• نموذج إعرابي: «جاء المصليان كلاهما» ← المصليان: فاعل مرفوع بالألف لأنه مثنى؛ كلاهما: توكيد معنوي مرفوع بالألف لأنه ملحق بالمثنى وهو مضاف.

2. جمع المذكر السالم وجمع المؤنث السالم:
• جمع المذكر السالم: يُصاغ من العلم لمذكر عاقل أو صفة لمذكر عاقل بزيادة واو ونون رفعاً (المسلمون) وياء ونون نصباً وجراً (التوابين).
• جمع المؤنث السالم: يُصاغ بزيادة ألف وتاء مبسوطة، يُرفع بالضمة ويُجر بالكسرة، ويُنصب بالكسرة النائبة عن الفتحة (إن الحسناتِ يذهبن السيئاتِ).

3. جمع التكسير: جمع القلة وجمع الكثرة:
• تعريفه: ما دلّ على أكثر من اثنين بتغيير صورة مفرده (بزيادة أو نقصان أو تغيير في الحركات، مثل: أنفس، قلوب، كتب، أسُد).
• أوزان جمع القلة (من 3 إلى 10): أَفْعُل (أنفس)، أَفْعال (أبطال)، أَفْعِلَة (أرغفة)، فِعْلة (فتية).
• أوزان جمع الكثرة (ما فوق العشرة): فُعُول (قلوب)، فِعال (جبال)، فُعْل (حُمْر)، فَعالى، مَفاعيل، فواعل، فُعَلاء...

4. الفاعل (الإضمار الواجب والجائز):
• يُضمر وجوباً في الفعل المضارع المبدوء بالهمزة (أكتب)، والنون (نكتب)، وتاء المخاطب (تكتب)، وفي فعل الأمر للمفرد المخاطب (اكتبْ).
• يُضمر جوازاً مع الفعل الماضي والمضارع المسند إلى الغائب أو الغائبة.

5. المفعول به والمفاعيل الأربعة:
• المفعول به (ظاهر وضمير): اسم منصوب يدل على من وقع عليه فعل الفاعل؛ يأتي ظاهراً أو ضميراً متصلاً أو منفصلاً (إياك نعبد).
• المفعول المطلق: مصدر منصوب يُذكر بعد فعل من لفظه لتوكيده (انتصرنا انتصاراً) أو بيان نوعه أو عدده.
• المفعول فيه (ظرف الزمان والمكان): اسم منصوب يبيّن زمان وقوع الفعل أو مكانه (سافرت ليلاً / جلست أمام القسم).
• المفعول معه: اسم فضلة منصوب يقع بعد واو بمعنى «مع» تُسمى واو المعية (سرتُ والشاطئَ).
• المفعول لأجله: مصدر قلبي منصوب يُذكر لبيان سبب وقوع الفعل (أجتهدُ طلباً للنجاح).`,
    downloads: [
      {
        id: "m2-ar-jmc-taksir",
        label: "درس جمع التكسير: جمع القلة وجمع الكثرة",
        url: "https://profpressma.blogspot.com/2020/10/blog-post_60.html",
        fileType: "other",
        note: "جديد 2AC",
      },
      {
        id: "m2-ar-mothanna-2020",
        label: "تحضير الدرس اللغوي: صوغ المثنى وإعرابه",
        url: "https://profpressma.blogspot.com/2020/09/blog-post_0.html",
        fileType: "other",
      },
      {
        id: "m2-ar-mothanna-summary",
        label: "ملخص درس صوغ المثنى وإعرابه",
        url: "https://profpressma.blogspot.com/2020/09/blog-post_58.html",
        fileType: "other",
      },
      {
        id: "m2-ar-mothanna-icrab",
        label: "نماذج في الإعراب من درس صوغ المثنى",
        url: "https://profpressma.blogspot.com/2020/09/blog-post_64.html",
        fileType: "other",
      },
      {
        id: "m2-ar-jmc-modakkar",
        label: "صوغ جمع المذكر السالم وإعرابه",
        url: "https://profpressma.blogspot.com/2020/10/blog-post_12.html",
        fileType: "other",
      },
      {
        id: "m2-ar-jmc-moannat",
        label: "صوغ جمع المؤنث السالم وإعرابه",
        url: "https://profpressma.blogspot.com/2020/10/blog-post_45.html",
        fileType: "other",
      },
      {
        id: "m2-ar-fael-post",
        label: "درس الفاعل: الإضمار الواجب والجائز (الشرح)",
        url: "https://profpressma.blogspot.com/2020/10/blog-post_13.html",
        fileType: "other",
      },
      {
        id: "m2-ar-fael-drv",
        label: "ملف درس الفاعل: الإضمار الواجب والجائز (Drive)",
        url: "https://drive.google.com/file/d/1wAioo_58tUvEBVUws3TaegXS8e9XnaBa/view",
        fileType: "drive",
      },
      {
        id: "m2-ar-mafool",
        label: "درس المفعول به ظاهر وضمير",
        url: "https://profpressma.blogspot.com/2020/10/blog-post_75.html",
        fileType: "other",
      },
    ],
  },
  {
    id: "m2-arabic-lang-s2-all",
    title: "جميع ملخصات الدرس اللغوي الأسدوس الثاني (الحال، الاستثناء، العدد، التمييز، التوابع، المذكر والمؤنث)",
    category: "lessons",
    subject: "اللغة العربية",
    semester: "s2",
    format: "PDF / Interactive",
    description:
      "التجميعية الكاملة لملخصات اللغة في الدورة الثانية: الحال، الاستثناء، العدد تذكيره وتأنيثه وإعرابه وبناؤه، التمييز، النعت، التوكيد، العطف، البدل، والمذكر والمؤنث مع صفحة الملخصات المجمعة.",
    downloadUrl: "https://profpressma.blogspot.com/2020/03/blog-post_66.html",
    downloadLabel: "تصفح جميع ملخصات الأسدوس الثاني (11 رابطاً)",
    updatedDate: "أكتوبر 2026 — محين",
    downloadsCount: 4290,
    featured: true,
    tags: ["ملخصات اللغة", "الأسدوس الثاني", "التوابع", "العدد والتمييز", "المذكر والمؤنث", "2AC"],
    content: `▪ ملخصات الدرس اللغوي الكاملة — الأسدوس الثاني (2AC)

1. الحال:
• وصف نكرة منصوب يبيّن هيئة صاحبه وقت وقوع الفعل (يأتي مفرداً، أو جملة اسمية أو فعلية، أو شبه جملة).

2. الاستثناء:
• إخراج ما بعد أداة الاستثناء (إلا، غير، سوى، خلا، عدا، حاشا) من حكم ما قبلها، ويُضبط إعراب المستثنى حسب نوع الكلام (تام مثبت، تام منفي، ناقص منفي).

3. العدد (تذكيره وتأنيثه وإعرابه وبناؤه):
• العددان 1 و 2 يطابقان المعدود تذكيراً وتأنيثاً.
• الأعداد من 3 إلى 9 تخالف المعدود.
• العدد 10 يخالف مفرداً ويطابق مركباً.
• الأعداد المركبة (11 إلى 19 ما عدا 12) مبنية على فتح الجزأين، وألفاظ العقود تعرب إعراب جمع المذكر السالم.

4. التمييز:
• اسم نكرة منصوب يرفع الإبهام عن اسم مفرد قبله (تمييز ملفوظ: وزن، كيل، مساحة، عدد) أو عن جملة قبله (تمييز ملحوظ).

5. التوابع الأربعة:
• النعت (حقيقي وسببي)، التوكيد (لفظي ومعنوي بألفاظ: نفس، عين، كل، جميع، كلا، كلتا)، العطف، والبدل (مطابق، بعض من كل، اشتمال).

6. المذكر والمؤنث:
• علامات التأنيث الثلاث (التاء المربوطة، ألف التأنيث المقصورة، ألف التأنيث الممدودة)، والتمييز بين المؤنث اللفظي والمعنوي والحقيقي والمجازي.`,
    downloads: [
      {
        id: "m2-ar-s2-all",
        label: "ملخصات الدرس اللغوي الأسدوس الثاني (صفحة شاملة)",
        url: "https://profpressma.blogspot.com/2020/03/blog-post_66.html",
        fileType: "other",
      },
      {
        id: "m2-ar-hal",
        label: "ملخص درس الحال",
        url: "https://profpressma.blogspot.com/2020/03/blog-post_78.html",
        fileType: "other",
      },
      {
        id: "m2-ar-istithna",
        label: "ملخص درس الاستثناء",
        url: "https://profpressma.blogspot.com/2020/03/blog-post_86.html",
        fileType: "other",
      },
      {
        id: "m2-ar-adad1",
        label: "ملخص العدد: تذكيره وتأنيثه",
        url: "https://profpressma.blogspot.com/2020/03/blog-post_94.html",
        fileType: "other",
      },
      {
        id: "m2-ar-adad2",
        label: "ملخص العدد: إعرابه وبناؤه",
        url: "https://profpressma.blogspot.com/2020/03/blog-post_75.html",
        fileType: "other",
      },
      {
        id: "m2-ar-tamyiz",
        label: "ملخص درس التمييز",
        url: "https://profpressma.blogspot.com/2020/03/blog-post_43.html",
        fileType: "other",
      },
      {
        id: "m2-ar-naat",
        label: "ملخص درس النعت",
        url: "https://profpressma.blogspot.com/2020/03/blog-post_65.html",
        fileType: "other",
      },
      {
        id: "m2-ar-tawkid",
        label: "ملخص درس التوكيد",
        url: "https://profpressma.blogspot.com/2020/03/blog-post_62.html",
        fileType: "other",
      },
      {
        id: "m2-ar-atf",
        label: "ملخص درس العطف",
        url: "https://profpressma.blogspot.com/2020/03/blog-post_39.html",
        fileType: "other",
      },
      {
        id: "m2-ar-badal",
        label: "ملخص درس البدل",
        url: "https://profpressma.blogspot.com/2020/03/blog-post_77.html",
        fileType: "other",
      },
      {
        id: "m2-ar-modakkar-moannat",
        label: "ملخص درس المذكر والمؤنث",
        url: "https://profpressma.blogspot.com/2020/03/blog-post_55.html",
        fileType: "other",
      },
    ],
  },
  {
    id: "m2-arabic-reading-morshidi-1",
    title: "تحضير النصوص القرائية — مرشدي في اللغة العربية (الوحدات 1 – 3: جميع النصوص الـ 14 كاملة)",
    category: "lessons",
    subject: "اللغة العربية",
    semester: "s1",
    format: "Interactive / PDF",
    description:
      "فهرس وتحضير شامل وكامل لجميع نصوص الأسدوس الأول في مرشدي في اللغة العربية (الوحدة 1: القيم الإسلامية، الوحدة 2: القيم الوطنية والإنسانية، الوحدة 3: المجال الحضاري) — 14 نصاً بتأطيرها، أفكارها الأساسية، حقولها الدلالية، وتركيبها.",
    downloadUrl: "https://profpressma.blogspot.com/2019/11/rahdir-nossos-kira2iya-morchidi-2college.html",
    downloadLabel: "فتح فهرس تحضير نصوص مرشدي في اللغة العربية",
    updatedDate: "أكتوبر 2026 — محين",
    downloadsCount: 6120,
    featured: true,
    tags: ["مرشدي في اللغة العربية", "تحضير النصوص", "الأسدوس الأول", "القيم الإسلامية", "الحضاري", "2AC"],
    content: `▪ تحضير نصوص مرشدي في اللغة العربية — الأسدوس الأول (الوحدات 1 – 3 كاملة)

يعتمد التحضير المنهجي لنصوص الثانية إعدادي أربع خطوات مترابطة: عتبة القراءة (التأطير والملاحظة)، فهم النص، التحليل (الحقول المعجمية، الأساليب، القيم)، والتركيب:

◀ الوحدة 1: مجال القيم الإسلامية (5 نصوص)
• من صفات المؤمنين (سورة الفرقان): تدبر صفات عباد الرحمن في التواضع والحلم والاعتدال في الإنفاق.
• من خطبة للرسول ﷺ: الوصايا النبوية الجامعة حول التقوى وصلة الرحم والتكافل الأخلاقي.
• معاملة المسلمين لغيرهم (عفيف عبد الفتاح طبارة): قيم البر والعدل وحماية حقوق غير المسلمين في الإسلام.
• النواة والقدوة (سعاد الناصر — من «بوح الأنوثة»): مقالة سردية تبرز مكانة الأسرة المسلمة والقدوة الحسنة في بناء المجتمع.
• ما أجلّ محمداً! (نص شعري ص 41): قصيدة عمودية في مدح شمائل النبي ﷺ ورسالته الإنسانية الخالدة.

◀ الوحدة 2: مجال القيم الوطنية والإنسانية (5 نصوص)
• المواطن الصالح (عبد الكريم بن الحسين بن ثابت): واجبات المواطنة الحقة وربط الحقوق بالمسؤولية وخدمة الصالح العام.
• جمال بلادي (عبد الكريم غلاب): مقطع من سيرة ذاتية يتغنى بمظاهر الجمال الطبيعي والحضاري للمغرب.
• الإنسانية العامة (مصطفى لطفي المنفلوطي ص 67): مقالة إنسانية تدعو إلى الأخوة البشرية وتجاوز التعصب والتفرقة.
• الإنسان والمدنية (ميخائيل نعيمة): قراءة نقدية في علاقة الإنسان بالمدنية المادية وضرورة التوازن الروحي.
• أغنية للسلام (قصيدة شعرية حرة لأحمد عبد المقصود هيكل ص 76): دعوة شعرية إلى السلام العالمي ونبذ الحروب.

◀ الوحدة 3: المجال الحضاري (4 نصوص)
• روائع المعمار في بلادي: إبراز عبقرية العمارة المغربية الإسلامية الأصيلة (الزليج، النقش على الخشب والجبس، الصوامع).
• الحاسوب: تطور التكنولوجيا الرقمية وأهمية الحاسوب في التعليم والبحث العلمي والتواصل.
• المنزل الذكي: تطبيقات الثورة المعلوماتية وإنترنت الأشياء في التدبير الطاقي والأمني للمساكن الحديثة.
• مراكش الحمراء: استحضار الإشعاع التاريخي والحضاري لمدينة مراكش ومعالمها الخالدة.`,
    downloads: [
      {
        id: "m2-nass-index",
        label: "الفهرس الشامل لتحضير نصوص مرشدي في اللغة العربية",
        url: "https://profpressma.blogspot.com/2019/11/rahdir-nossos-kira2iya-morchidi-2college.html",
        fileType: "other",
        note: "الصفحة المرجعية",
      },
      {
        id: "m2-nass-mominin",
        label: "الوحدة 1 — تحضير نص: من صفات المؤمنين",
        url: "https://profpressma.blogspot.com/2019/11/blog-post_42.html",
        fileType: "other",
      },
      {
        id: "m2-nass-khotba",
        label: "الوحدة 1 — تحضير نص: من خطبة للرسول ﷺ",
        url: "https://profpressma.blogspot.com/2019/11/blog-post_35.html",
        fileType: "other",
      },
      {
        id: "m2-nass-moamala",
        label: "الوحدة 1 — تحضير نص: معاملة المسلمين لغيرهم",
        url: "https://profpressma.blogspot.com/2019/11/blog-post_3.html",
        fileType: "other",
      },
      {
        id: "m2-nass-nawat",
        label: "الوحدة 1 — تحضير نص: النواة والقدوة",
        url: "https://profpressma.blogspot.com/2019/11/blog-post_17.html",
        fileType: "other",
        note: "مضاف حديثاً",
      },
      {
        id: "m2-nass-mohammed",
        label: "الوحدة 1 — تحضير النص الشعري: ما أجلّ محمداً!",
        url: "https://profpressma.blogspot.com/2019/11/blog-post_44.html",
        fileType: "other",
        note: "مضاف حديثاً",
      },
      {
        id: "m2-nass-mowatin",
        label: "الوحدة 2 — تحضير نص: المواطن الصالح",
        url: "https://profpressma.blogspot.com/2018/11/blog-post_74.html",
        fileType: "other",
      },
      {
        id: "m2-nass-jamal-biladi",
        label: "الوحدة 2 — تحضير نص: جمال بلادي",
        url: "https://profpressma.blogspot.com/2019/11/blog-post_88.html",
        fileType: "other",
        note: "مضاف حديثاً",
      },
      {
        id: "m2-nass-insaniya",
        label: "الوحدة 2 — تحضير نص: الإنسانية العامة",
        url: "https://profpressma.blogspot.com/2019/11/blog-post_95.html",
        fileType: "other",
        note: "مضاف حديثاً",
      },
      {
        id: "m2-nass-madaniya",
        label: "الوحدة 2 — تحضير نص: الإنسان والمدنية",
        url: "https://profpressma.blogspot.com/2019/11/blog-post_52.html",
        fileType: "other",
        note: "مضاف حديثاً",
      },
      {
        id: "m2-nass-salam",
        label: "الوحدة 2 — تحضير النص الشعري: أغنية للسلام",
        url: "https://profpressma.blogspot.com/2019/11/blog-post_63.html",
        fileType: "other",
        note: "مضاف حديثاً",
      },
      {
        id: "m2-nass-miamar",
        label: "الوحدة 3 — تحضير نص: روائع المعمار في بلادي",
        url: "https://profpressma.blogspot.com/2019/11/blog-post_29.html",
        fileType: "other",
      },
      {
        id: "m2-nass-hassoub",
        label: "الوحدة 3 — تحضير نص: الحاسوب",
        url: "https://profpressma.blogspot.com/2019/11/blog-post_82.html",
        fileType: "other",
      },
      {
        id: "m2-nass-manzil",
        label: "الوحدة 3 — تحضير نص: المنزل الذكي",
        url: "https://profpressma.blogspot.com/2019/11/blog-post_64.html",
        fileType: "other",
      },
      {
        id: "m2-nass-marrakech",
        label: "الوحدة 3 — تحضير نص: مراكش الحمراء",
        url: "https://profpressma.blogspot.com/2018/11/blog-post_27.html",
        fileType: "other",
      },
    ],
  },
  {
    id: "m2-arabic-reading-morshidi-2",
    title: "تحضير النصوص القرائية والتطبيقية — مرشدي (الوحدات 4 – 6: جميع النصوص الـ 16 + Drive)",
    category: "lessons",
    subject: "اللغة العربية",
    semester: "s2",
    format: "PDF / Drive / Interactive",
    description:
      "تحاضير كاملة لنصوص الأسدوس الثاني في مرشدي في اللغة العربية (الوحدة 4: الاجتماعي والاقتصادي، الوحدة 5: المجال السكاني، الوحدة 6: الفني والثقافي) — 17 رابطاً شاملاً لنصوص الأطفال في عالمنا المعاصر، أختي، الطريق، الحكاية رقم 22، رسالة إلى أمي، غذاء الشباب، تبذير الماء (Drive)، التلوث الضجيجي، وادي العيون، سلة ليمون، الموسيقى، موسم إيميلشيل، كن مثقفاً، خواطر الغروب، الوجبات السريعة، وابنة المجد.",
    downloadUrl: "https://drive.google.com/file/d/16GTYs8xUPhD9xnnh85kn0rscWvEeJWV9/view",
    downloadLabel: "تحميل تحضير نص تبذير الماء وموارد الدورة 2 (Drive)",
    updatedDate: "أكتوبر 2026 — محين",
    downloadsCount: 4920,
    featured: true,
    tags: ["النصوص القرائية", "مرشدي 2AC", "الأسدوس الثاني", "السكاني", "الفني والثقافي"],
    content: `▪ تحضير نصوص مرشدي في اللغة العربية — الأسدوس الثاني (الوحدات 4 – 6 كاملة)

◀ الوحدة 4: المجال الاقتصادي والاجتماعي (5 نصوص)
• الأطفال في عالمنا المعاصر (تقرير اللجنة العالمية للثقافة والتنمية — اليونسكو ص 112): قضايا الطفولة وحق التمدرس والحماية الاجتماعية.
• أختي (عبد المجيد بن جلون — من سيرة «في الطفولة»): نص سردي يبرز الروابط الأسرية والتكافل العاطفي بين الإخوة.
• الطريق: رصد التحولات الاجتماعية اليومية ودور الفرد داخل المحيط الاقتصادي والأسري.
• الحكاية رقم 22 (نجيب محفوظ — «حكايات حارتنا»): نص سردي يعالج القيم الأخلاقية والعدالة الاجتماعية.
• رسالة إلى أمي: نص وجداني يعبّر عن التقدير للأسرة والارتباط بالوطن والأمومة.

◀ الوحدة 5: المجال السكاني والبيئي (6 نصوص + نص تطبيقي)
• غذاء الشباب: أهمية التوازن الغذائي في مرحلة المراهقة والوقاية من الأمراض.
• تبذير الماء (متوفر بصيغة صفحة التحضير + ملف PDF مباشر عبر Google Drive): ترشيد استهلاك الثروة المائية ومواجهة الجفاف.
• التلوث الضجيجي (حيدر عبد الرزاق كمونة): أسباب الضوضاء في المدن وآثارها الصحية والنفسية وسبل الحد منها.
• وادي العيون (عبد الرحمن منيف): استحضار العلاقة المتينة بين الإنسان والماء والأرض.
• سلة ليمون: نص سردي يعالج الكفاح اليومي والبعد البيئي والاجتماعي.
• النص التطبيقي: الوجبات السريعة (ص 180) مع الأجوبة الكاملة وتمارين التوكيد.

◀ الوحدة 6: المجال الفني والثقافي (4 نصوص + نصوص شعرية)
• الموسيقى (جبران خليل جبران): رسالة الفن والموسيقى في تهذيب الوجدان الإنساني.
• إلى موسم إيميلشيل: التعريف بالتراث الثقافي الأمازيغي والمواسم المغربية الأصيلة.
• كن مثقفاً: مقومات الثقافة الفاعلة وأهمية القراءة والنقد البناء في تكوين الشخصية.
• خواطر الغروب + النص الشعري ابنة المجد: تذوق الجماليات الشعرية والنثرية في الطبيعة والبطولة.`,
    downloads: [
      {
        id: "m2-n2-atfal",
        label: "الوحدة 4 — تحضير نص: الأطفال في عالمنا المعاصر (اليونسكو)",
        url: "https://profpressma.blogspot.com/2019/11/blog-post_61.html",
        fileType: "other",
        note: "مضاف حديثاً",
      },
      {
        id: "m2-n2-okhti",
        label: "الوحدة 4 — تحضير نص: أختي (عبد المجيد بن جلون)",
        url: "https://profpressma.blogspot.com/2020/01/tahdir-nass-okhti-arabe-2college.html",
        fileType: "other",
        note: "مضاف حديثاً",
      },
      {
        id: "m2-n2-tarik",
        label: "الوحدة 4 — تحضير نص: الطريق",
        url: "https://profpressma.blogspot.com/2020/01/tahdir-nass-tarik-arabe-2college.html",
        fileType: "other",
      },
      {
        id: "m2-n2-hikaya22",
        label: "الوحدة 4 — تحضير نص: الحكاية رقم 22 (نجيب محفوظ)",
        url: "https://profpressma.blogspot.com/2018/02/22.html",
        fileType: "other",
      },
      {
        id: "m2-n2-ommi",
        label: "الوحدة 4 — تحضير نص: رسالة إلى أمي",
        url: "https://profpressma.blogspot.com/2020/01/rissala-ila-ommi-arabe-2college.html",
        fileType: "other",
      },
      {
        id: "m2-n2-ghidaa",
        label: "الوحدة 5 — تحضير نص: غذاء الشباب",
        url: "https://profpressma.blogspot.com/2020/01/tahdir-nass-ridae-chabab-2college.html",
        fileType: "other",
      },
      {
        id: "m2-n2-tabdir-post",
        label: "الوحدة 5 — تحضير نص: تبذير الماء (صفحة القراءة)",
        url: "https://profpressma.blogspot.com/2020/01/tahdir-nass-tabdir-almae-arabe-2college.html",
        fileType: "other",
      },
      {
        id: "m2-n2-tabdir-drv",
        label: "الوحدة 5 — ملف تحضير نص: تبذير الماء (Google Drive PDF)",
        url: "https://drive.google.com/file/d/16GTYs8xUPhD9xnnh85kn0rscWvEeJWV9/view",
        fileType: "drive",
      },
      {
        id: "m2-n2-talaouth",
        label: "الوحدة 5 — تحضير نص: التلوث الضجيجي",
        url: "https://profpressma.blogspot.com/2020/01/tahdir-nass-talaouth-arabe-2college.html",
        fileType: "other",
      },
      {
        id: "m2-n2-wadi",
        label: "الوحدة 5 — تحضير نص: وادي العيون",
        url: "https://profpressma.blogspot.com/2020/01/tahdir-nass-wadi-3yoon-arabe-2college.html",
        fileType: "other",
      },
      {
        id: "m2-n2-laymoun",
        label: "الوحدة 5 — تحضير نص: سلة ليمون",
        url: "https://profpressma.blogspot.com/2020/02/tahdir-nass-salat-laymoun-arabe-2college.html",
        fileType: "other",
      },
      {
        id: "m2-n2-wajabat",
        label: "أجوبة النص التطبيقي: الوجبات السريعة ص 180",
        url: "https://profpressma.blogspot.com/2020/03/blog-post_71.html",
        fileType: "other",
      },
      {
        id: "m2-n2-moussika",
        label: "الوحدة 6 — تحضير نص: الموسيقى (جبران خليل جبران)",
        url: "https://profpressma.blogspot.com/2020/02/tahdir-nass-almoussika-arabe-2college.html",
        fileType: "other",
      },
      {
        id: "m2-n2-imilchil",
        label: "الوحدة 6 — تحضير نص: إلى موسم إيميلشيل",
        url: "https://profpressma.blogspot.com/2020/02/tahdir-nass-moussem-imilchil-arabe-2college.html",
        fileType: "other",
      },
      {
        id: "m2-n2-mothakkaf",
        label: "الوحدة 6 — تحضير نص: كن مثقفاً",
        url: "https://profpressma.blogspot.com/2020/04/tahdir-nass-mothakkaf-arabe-2college.html",
        fileType: "other",
      },
      {
        id: "m2-n2-ghoroub",
        label: "الوحدة 6 — تحضير نص: خواطر الغروب",
        url: "https://profpressma.blogspot.com/2020/04/tahdir-nass-khawater-ghoroub-arabe-2college.html",
        fileType: "other",
      },
      {
        id: "m2-n2-ibnat",
        label: "تحضير النص الشعري: ابنة المجد",
        url: "https://profpressma.blogspot.com/2019/12/blog-post_89.html",
        fileType: "other",
      },
    ],
  },
  {
    id: "m2-arabic-taabir-khawla",
    title: "دروس ومهارات التعبير والإنشاء — مرشدي 2AC (التلخيص، التقرير، التصميم، التحويل، محاكاة الأدوار)",
    category: "lessons",
    subject: "اللغة العربية",
    semester: "annual",
    format: "Interactive / PDF",
    description:
      "دليل منهجي متكامل لمهارات التعبير والإنشاء المقررة في مرشدي في اللغة العربية للسنة الثانية إعدادي (مهارة التلخيص، كتابة التقرير، التصميم، تحويل نص شعري إلى نثري بنموذج خولة بنت الأزور، ومحاكاة الأدوار).",
    downloadUrl: "https://profpressma.blogspot.com/2020/02/blog-post_30.html",
    downloadLabel: "قراءة مهارات التعبير والإنشاء والنموذج التطبيقي",
    updatedDate: "أكتوبر 2026 — محين",
    downloadsCount: 2450,
    tags: ["التعبير والإنشاء", "التلخيص", "التقرير", "التحويل", "خولة بنت الأزور", "2AC"],
    content: `▪ برنامج دروس التعبير والإنشاء — مرشدي في اللغة العربية (2AC)

1. مهارة التلخيص (الأسدوس الأول):
• تقليص نص طويل إلى ما يقارب ثلثه أو ربعه مع الحفاظ على أفكاره الأساسية وتسلسلها المنطقي.
• الخطوات: قراءة النص وفهمه ← حذف الحشو والاستطراد والأمثلة المكررة ← صياغة الأفكار بأسلوبك الخاص مع استعمال أدوات الربط.

2. مهارة كتابة التقرير (الأسدوس الأول):
• وثيقة إدارية أو تربوية تصف حدثاً أو نشاطاً أو ظاهرة بدقة وموضوعية.
• البنية: العنوان والتاريخ والمكان ← المقدمة (موضوع التقرير والجهة المنظمة) ← العرض (وقائع النشاط أو النتائج) ← الخاتمة (التوصيات والتوقيع).

3. مهارة التصميم (الأسدوس الأول/الثاني):
• وضع هيكل منظم لموضوع إنشائي يتضمن: مقدمة تمهيدية + إشكالية ← عرض مقسم إلى محاور وأفكار مدعمة بالحجج والأمثلة ← خاتمة تركيبية.

4. مهارة التحويل — تحويل نص شعري إلى نص نثري (الأسدوس الثاني):
• الخطوات المنهجية: القراءة الفاحصة للقصيدة وتحديد موضوعها العام ← تفكيك الأبيات إلى وحدات دلالية وشرح المفردات ← إعادة الصياغة النثرية بأسلوب متماسك يحافظ على الجو العاطفي للنص.
• نموذج تطبيقي (مسرحية خولة بنت الأزور): اصطحب ضرار بن الأزور أخته خولة ضمن جيش المسلمين المتوجه إلى بلاد الشام بقيادة خالد بن الوليد رضي الله عنه، حيث جسدت خولة أروع صور الشجاعة والفداء لإنقاذ أخيها في المعركة.

5. مهارة محاكاة الأدوار (الأسدوس الثاني):
• تقمص شخصية من الشخصيات الأدبية أو الاجتماعية وبناء حوار مسرحي يعكس ملامحها النفسية وموقفها مع مراعاة الإرشادات الركحية (الحركات، النبرة، الديكور).`,
    downloads: [
      {
        id: "m2-khawla-post",
        label: "مهارة التحويل: مسرحية خولة بنت الأزور كاملة (ProfPress)",
        url: "https://profpressma.blogspot.com/2020/02/blog-post_30.html",
        fileType: "other",
      },
      {
        id: "m2-morchidi-all-index",
        label: "الفهرس الكامل لدروس مرشدي في اللغة العربية 2AC",
        url: "https://profpressma.blogspot.com/2019/11/rahdir-nossos-kira2iya-morchidi-2college.html",
        fileType: "other",
      },
    ],
  },
  {
    id: "m2-arabic-exams",
    title: "فروض المراقبة المستمرة في اللغة العربية للسنة الثانية إعدادي (الدورة 1 و 2)",
    category: "exams",
    subject: "اللغة العربية",
    semester: "annual",
    format: "PDF / JPG",
    description:
      "نماذج الفروض المحروسة للأسدوس الأول والثاني في اللغة العربية (فهم المقروء، الدرس اللغوي، التعبير والإنشاء) مع التصحيح وسلالم التنقيط.",
    downloadUrl: "https://profpressma.blogspot.com/2020/03/2_31.html",
    downloadLabel: "فتح نماذج فروض اللغة العربية 2AC",
    updatedDate: "2026",
    downloadsCount: 2890,
    tags: ["فروض اللغة العربية", "2AC", "الأسدوس الثاني"],
    downloads: [
      {
        id: "m2-ar-ex1",
        label: "فرض محروس رقم 2 الأسدوس الثاني — النموذج 1",
        url: "https://profpressma.blogspot.com/2020/03/2_31.html",
        fileType: "pdf",
      },
      {
        id: "m2-ar-ex2",
        label: "فرض محروس رقم 2 الدورة الثانية — النموذج 2",
        url: "https://profpressma.blogspot.com/2020/03/2_29.html",
        fileType: "pdf",
      },
      {
        id: "m2-ar-ex-label",
        label: "كافة فروض اللغة العربية الثانية إعدادي",
        url: "https://profpressma.blogspot.com/search/label/%D9%81%D8%B1%D9%88%D8%B6%20%D8%A7%D9%84%D9%84%D8%BA%D8%A9%20%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A%D8%A9%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A%D8%A9%20%D8%A5%D8%B9%D8%AF%D8%A7%D8%AF%D9%8A",
        fileType: "other",
      },
    ],
  },

  // =========================================================================
  // 4. مادة العلوم الفيزيائية والكيمياء (دروس دولي، بوربوينت، فروض)
  // =========================================================================
  {
    id: "m2-pc-lessons-2apic",
    title: "دروس الفيزياء والكيمياء الثانية إعدادي مسلك دولي فرنسية — الدورة 2 (8 ملفات Drive)",
    category: "lessons",
    subject: "العلوم الفيزيائية",
    semester: "s2",
    format: "PDF / Drive",
    description:
      "جميع دروس الفيزياء للثانية إعدادي مسلك دولي (2ASC/BIOF) للأسدوس الثاني: مصادر الضوء، انتشار الضوء، العدسات الرقيقة، التيار الكهربائي المتناوب، والتركيب المنزلي عبر Google Drive.",
    downloadUrl: "https://drive.google.com/file/d/1YedSwyrrQsJbE9le8ADTJMd9RezJeNXs/view",
    downloadLabel: "تحميل درس Source et récepteur de lumière (Drive)",
    updatedDate: "2026",
    downloadsCount: 3640,
    featured: true,
    tags: ["Physique 2ASC", "مسلك دولي", "الضوء", "2AC"],
    content: `## دروس الفيزياء للثانية إعدادي مسلك دولي (2ème Année Collège BIOF)

تشمل هذه الباقة الملفات الكاملة لدروس البصريات والكهرباء باللغة الفرنسية للدورة الثانية:
- **Cour 2 :** Sources et récepteurs de lumière (مصادر ومستقبلات الضوء)
- **Propagation rectiligne de la lumière** et applications (الانتشار المستقيمي للضوء، العلبة المظلمة، الخسوف والكسوف)
- **Les lentilles minces** et formation des images (العدسات الرقيقة)
- **Courant électrique alternatif sinusoïdal** et montage domestique.`,
    downloads: [
      {
        id: "m2-pc-lumiere",
        label: "Cour 2: Sources et récepteurs de lumière (Drive)",
        url: "https://drive.google.com/file/d/1YedSwyrrQsJbE9le8ADTJMd9RezJeNXs/view",
        fileType: "drive",
      },
      {
        id: "m2-pc-t2-1",
        label: "ملف دروس الفيزياء الدورة الثانية — الدرس 1 (Drive)",
        url: "https://drive.google.com/file/d/0B6yeTzOUKxW6dlMwYmdRODZWMG9jZ1NKTzdRTjFicXJGV2VN/view?usp=sharing",
        fileType: "drive",
      },
      {
        id: "m2-pc-t2-2",
        label: "ملف دروس الفيزياء الدورة الثانية — الدرس 2 (Drive)",
        url: "https://drive.google.com/file/d/0B6yeTzOUKxW6bVp0czFzMEpkbW43VV9LZDdQWFVYVWRnRENZ/view?usp=sharing",
        fileType: "drive",
      },
      {
        id: "m2-pc-t2-3",
        label: "ملف دروس الفيزياء الدورة الثانية — الدرس 3 (Drive)",
        url: "https://drive.google.com/file/d/0B6yeTzOUKxW6WjNZTEhvT1B3U0V5TjhLT3l1SFRtanZ5VDNR/view?usp=sharing",
        fileType: "drive",
      },
      {
        id: "m2-pc-t2-4",
        label: "ملف دروس الفيزياء الدورة الثانية — الدرس 4 (Drive)",
        url: "https://drive.google.com/file/d/0B6yeTzOUKxW6LWNQX1RNRnJmTGJDS2EwZ3lraTg3QTR1akxn/view?usp=sharing",
        fileType: "drive",
      },
      {
        id: "m2-pc-t2-5",
        label: "ملف دروس الفيزياء الدورة الثانية — الدرس 5 (Drive)",
        url: "https://drive.google.com/file/d/0B6yeTzOUKxW6TG5oR016WUlRNkQ5cVMyVVV0Q0lJRTAyY0Rj/view?usp=sharing",
        fileType: "drive",
      },
      {
        id: "m2-pc-t2-6",
        label: "ملف دروس الفيزياء الدورة الثانية — الدرس 6 (Drive)",
        url: "https://drive.google.com/file/d/0B6yeTzOUKxW6WG4ycFdWOENTYkdKRTM2RkFPZUdMYWVkaEw4/view?usp=sharing",
        fileType: "drive",
      },
      {
        id: "m2-pc-t2-7",
        label: "ملف دروس الفيزياء الدورة الثانية — الدرس 7 (Drive)",
        url: "https://drive.google.com/file/d/0B6yeTzOUKxW6cFVmUGl1cGZtLWtOMjJBeEVnS1FqcjRsT0pv/view?usp=sharing",
        fileType: "drive",
      },
    ],
  },
  {
    id: "m2-pc-pptx-chemistry",
    title: "عروض الفيزياء والكيمياء الثانية إعدادي مسلك دولي PowerPoint + قوانين التفاعل الكيميائي",
    category: "lessons",
    subject: "العلوم الفيزيائية",
    semester: "s1",
    format: "PPTX / Drive",
    description:
      "6 عروض PowerPoint جاهزة للعرض بالقسم للدورة الأولى (الهواء، الاحتراقات، الذرات والجزيئات، التفاعل الكيميائي، وقوانين التفاعل الكيميائي) مع روابط Google Drive.",
    downloadUrl: "https://drive.google.com/file/d/0B6yeTzOUKxW6ZGdFQS1Qd09WendCR2VQMFpKTEc5a19ndWhj/view?usp=sharing",
    downloadLabel: "تحميل عروض PowerPoint للفيزياء 2ASC (Drive)",
    updatedDate: "2026",
    downloadsCount: 2740,
    tags: ["PowerPoint", "PPTX", "التفاعل الكيميائي", "2ASC"],
    downloads: [
      {
        id: "m2-pc-ppt-1",
        label: "عرض PowerPoint — الدرس 1 (Drive)",
        url: "https://drive.google.com/file/d/0B6yeTzOUKxW6ZGdFQS1Qd09WendCR2VQMFpKTEc5a19ndWhj/view?usp=sharing",
        fileType: "pptx",
      },
      {
        id: "m2-pc-ppt-2",
        label: "عرض PowerPoint — الدرس 2 (Drive)",
        url: "https://drive.google.com/file/d/0B6yeTzOUKxW6MF9fczYtbk9Sa28xM29xSnVqMlNEOWpqLVpj/view?usp=sharing",
        fileType: "pptx",
      },
      {
        id: "m2-pc-ppt-3",
        label: "عرض PowerPoint — الدرس 3 (Drive)",
        url: "https://drive.google.com/file/d/0B6yeTzOUKxW6QWtxSDhwMU5xTzAyY3pKdWF0eXlEUldKNFVF/view?usp=sharing",
        fileType: "pptx",
      },
      {
        id: "m2-pc-ppt-4",
        label: "عرض PowerPoint — الدرس 4 (Drive)",
        url: "https://drive.google.com/file/d/0B6yeTzOUKxW6SExVYnUwZHg2eTZBZXhVdHRIcFZHYXd0SUdJ/view?usp=sharing",
        fileType: "pptx",
      },
      {
        id: "m2-pc-ppt-5",
        label: "عرض PowerPoint — الدرس 5 (Drive)",
        url: "https://drive.google.com/file/d/0B6yeTzOUKxW6bklzbV9nak40cXpqcU9yMTdQQllQY21qbzBR/view?usp=sharing",
        fileType: "pptx",
      },
      {
        id: "m2-pc-ppt-6",
        label: "عرض PowerPoint — الدرس 6 (Drive)",
        url: "https://drive.google.com/file/d/0B6yeTzOUKxW6MlJqUTUwU1pqM2FQbEFBQ25QOXlXVVh0YkNn/view?usp=sharing",
        fileType: "pptx",
      },
      {
        id: "m2-pc-reac-vid",
        label: "درس قوانين التفاعل الكيميائي (ProfPress)",
        url: "https://profpressma.blogspot.com/2015/12/blog-post9.html",
        fileType: "other",
      },
    ],
  },
  {
    id: "m2-pc-exams-docx",
    title: "فروض المراقبة المستمرة في العلوم الفيزيائية للثانية إعدادي (Word DOCX & PDF)",
    category: "exams",
    subject: "العلوم الفيزيائية",
    semester: "annual",
    format: "DOCX / PDF",
    description:
      "فروض محروسة في العلوم الفيزيائية للسنة الثانية إعدادي جاهزة بصيغة Word (.docx) قابلة للتعديل عبر MediaFire وPDF عبر Google Drive.",
    downloadUrl: "https://drive.google.com/file/d/1LMac-gXrg-ljog7iQPfsw_BmR-IGtlYY/view",
    downloadLabel: "تحميل فرض الفيزياء والكيمياء 2AC (Drive)",
    updatedDate: "2026",
    downloadsCount: 2560,
    tags: ["فروض فيزياء", "Word", "2AC"],
    downloads: [
      {
        id: "m2-pc-ex-drv",
        label: "الفرض الثاني الدورة الأولى فيزياء (Google Drive PDF)",
        url: "https://drive.google.com/file/d/1LMac-gXrg-ljog7iQPfsw_BmR-IGtlYY/view",
        fileType: "drive",
      },
      {
        id: "m2-pc-ex-mf",
        label: "نفس الفرض بصيغة Word قابلة للتعديل (MediaFire DOCX)",
        url: "http://www.mediafire.com/file/o2epit8sm5dnk1q/%25D8%25A7%25D9%2584%25D9%2581%25D8%25B1%25D8%25B6_2_%25D8%25A7%25D9%2584%25D8%25AF%25D9%2588%25D8%25B1%25D8%25A9_%25D8%25A7%25D9%2584%25D8%25A3%25D9%2588%25D9%2584%25D9%2589_%25D8%25A7%25D9%2584%25D8%25B3%25D9%2586%25D8%25A9_%25D8%25A7%25D9%2584%25D8%25AB%25D8%25A7%25D9%2586%25D9%258A%25D8%25A9_%25D8%25A7%25D8%25B9%25D8%25AF%25D8%25A7%25D8%25AF%25D9%258A_2014_-_2015.docx/file",
        fileType: "word",
      },
      {
        id: "m2-pc-ex-post",
        label: "صفحة الفرض على بروف بريس",
        url: "https://profpressma.blogspot.com/2020/01/dev2-physique2college-2014-2015.html",
        fileType: "other",
      },
    ],
  },

  // =========================================================================
  // 5. مادة علوم الحياة والأرض (SVT)
  // =========================================================================
  {
    id: "m2-lesson-svt",
    title: "تجميعية موارد وجذاذات وملخصات علوم الحياة والأرض 2AC (تكتونية الصفائح والوراثة)",
    category: "lessons",
    subject: "علوم الحياة والأرض",
    semester: "annual",
    format: "PDF / Drive",
    description:
      "الحقيبة الرقمية لأساتذة وتلاميذ علوم الحياة والأرض للثانية إعدادي (المسلك الدولي والعام): مجلد Drive الشامل + ملخص الزلازل وتكتونية الصفائح 2APIC + درس الوراثة عند الإنسان.",
    downloadUrl: "https://drive.google.com/drive/u/0/folders/1kaYCYRdD4PEUwaWpW-yj5XGC3Z2a_fJP",
    downloadLabel: "فتح حقيبة SVT الثانية إعدادي مسلك دولي (Drive)",
    updatedDate: "أكتوبر 2026",
    downloadsCount: 3840,
    featured: true,
    tags: ["SVT", "2APIC", "تكتونية الصفائح", "الوراثة عند الإنسان"],
    content: `## دروس وملخصات علوم الحياة والأرض — الثانية إعدادي (SVT 2AC / 2APIC)

### 1. الجيولوجيا الداخلية (الأسدوس الأول)
- **نظرية زحزحة القارات وتكتونية الصفائح** (أدلة فيغنر: المورفولوجية، الجيولوجية، والمستحاثية)
- **الزلازل وعلاقتها بتكتونية الصفائح** (البؤرة، المركز السطحي، جهاز السيسموغراف، سلم ميركالي وريشتر)
- **البراكين والصخور الصهارية والتشوهات التكتونية** وتكوّن السلاسل الجبلية.

### 2. البيولوجيا والوراثة (الأسدوس الثاني)
- **التوالد الجنسي واللاجنسي عند الحيوانات والنباتات**
- **التوالد عند الإنسان** وتشكل الأمشاج واللقاح والحمل والولادة
- **الوراثة عند الإنسان** (الأمراض الوراثية والوقاية وزواج الأقارب).`,
    downloads: [
      {
        id: "m2-svt-folder",
        label: "مجلد موارد وجذاذات 2AC مسلك دولي (Google Drive Folder)",
        url: "https://drive.google.com/drive/u/0/folders/1kaYCYRdD4PEUwaWpW-yj5XGC3Z2a_fJP",
        fileType: "drive",
      },
      {
        id: "m2-svt-seisme",
        label: "ملخص درس الزلازل وتكتونية الصفائح 2APIC (Drive)",
        url: "https://drive.google.com/file/d/1fFEEUw0KhOBpgGRjUFksdUX0HXZyMqDZ/view",
        fileType: "drive",
      },
      {
        id: "m2-svt-genetique",
        label: "ملف درس الوراثة عند الإنسان 2AC (Drive)",
        url: "https://drive.google.com/file/d/0B6yeTzOUKxW6akVaY3FHVTRlRUU/view",
        fileType: "drive",
      },
      {
        id: "m2-svt-collection-post",
        label: "موضوع التجميعية الكاملة للسلك الإعدادي (ProfPress)",
        url: "https://profpressma.blogspot.com/2022/08/svt-college.html",
        fileType: "other",
      },
    ],
  },
  {
    id: "m2-svt-exams-bank",
    title: "بنك فروض علوم الحياة والأرض للثانية إعدادي (الدورة 1 و 2 — 9 نماذج مباشرة)",
    category: "exams",
    subject: "علوم الحياة والأرض",
    semester: "annual",
    format: "PDF / Drive",
    description:
      "فروض المراقبة المستمرة 1 و 2 و 3 في مادة علوم الحياة والأرض للأسدوسين الأول والثاني (الصخور الصهارية والبراكين، التوالد، والوراثة) مع روابط Google Drive وMediaFire.",
    downloadUrl: "https://profpressma.blogspot.com/2018/02/blog-post_50.html",
    downloadLabel: "فتح بنك فروض علوم الحياة والأرض 2AC",
    updatedDate: "2026",
    downloadsCount: 3190,
    tags: ["فروض SVT", "الصخور الصهارية", "البراكين", "2AC"],
    downloads: [
      {
        id: "m2-svt-ex-b1",
        label: "فرض محروس رقم 1 — الدورة الأولى (Google Docs)",
        url: "https://docs.google.com/file/d/0B3j73Pz7FN4vR01lMWZUZVdIUlU/edit?usp=sharing",
        fileType: "drive",
      },
      {
        id: "m2-svt-ex-b2",
        label: "فرض محروس — الصخور الصهارية والبراكين (ProfPress)",
        url: "https://profpressma.blogspot.com/2019/12/dev2-svt-2college.html",
        fileType: "pdf",
      },
      {
        id: "m2-svt-ex-b3",
        label: "فرض محروس رقم 2 الدورة الأولى (Google Drive)",
        url: "https://docs.google.com/file/d/0BzXJzDRkHOd-MHZaa2FnQzlBNTA/edit?usp=drive_web",
        fileType: "drive",
      },
      {
        id: "m2-svt-ex-b4",
        label: "فرض محروس علوم الحياة والأرض (MediaFire)",
        url: "http://www.mediafire.com/view/?qpcht7cex68g1tj",
        fileType: "mediafire",
      },
      {
        id: "m2-svt-ex-b5",
        label: "فرض الدورة الثانية — التوالد عند الحيوانات والنباتات (PDF)",
        url: "http://vivesvt.files.wordpress.com/2012/04/exa-reproduction-animaux-et-vegetaux.pdf",
        fileType: "pdf",
      },
      {
        id: "m2-svt-ex-b6",
        label: "فرض إضافي رقم 1 الدورة الثانية (Google Drive)",
        url: "https://docs.google.com/file/d/0BzXJzDRkHOd-N3I0M3lkT3ZLT1k/edit?usp=drive_web",
        fileType: "drive",
      },
      {
        id: "m2-svt-ex-b7",
        label: "فرض إضافي رقم 2 الدورة الثانية (Google Drive)",
        url: "https://docs.google.com/file/d/0BzXJzDRkHOd-TzB4aEJMc3czVEE/edit?usp=sharing",
        fileType: "drive",
      },
      {
        id: "m2-svt-ex-b8",
        label: "فرض إضافي رقم 3 الدورة الثانية (Google Drive)",
        url: "https://docs.google.com/file/d/0BzXJzDRkHOd-a1ZrenRKdmdCUlU/edit?usp=sharing",
        fileType: "drive",
      },
    ],
  },

  // =========================================================================
  // 6. مادة الاجتماعيات (الموارد الرقمية، التاريخ والجغرافيا، الفروض)
  // =========================================================================
  {
    id: "m2-hg-bahi-resources",
    title: "الشامل في الموارد الرقمية للاجتماعيات بالسلك الإعدادي (حقيبة الأستاذ باهي — 2 جيغا)",
    category: "guidelines",
    subject: "الاجتماعيات",
    semester: "annual",
    format: "Drive / TICE",
    description:
      "موسوعة تفاعلية تضم خرائط تاريخية وجغرافية وموارد رقمية وعروضاً تعليمية جاهزة للاشتغال الرقمي في دروس الاجتماعيات للثانية والثالثة إعدادي.",
    downloadUrl: "https://drive.google.com/file/d/1jsUb7VlAUb9bEImtJ1H4JRDxFv7aJbPN/view",
    downloadLabel: "تحميل حقيبة موارد الاجتماعيات الرقمية (Drive)",
    updatedDate: "2026",
    downloadsCount: 2940,
    tags: ["موارد رقمية", "TICE", "الاجتماعيات", "موارد باهي"],
    downloads: [
      {
        id: "m2-hg-bahi-drv",
        label: "رابط تحميل الحقيبة الرقمية الكاملة (Google Drive)",
        url: "https://drive.google.com/file/d/1jsUb7VlAUb9bEImtJ1H4JRDxFv7aJbPN/view",
        fileType: "drive",
        fileSize: "2 GB",
      },
      {
        id: "m2-hg-bahi-post",
        label: "موضوع الموارد على ProfPress",
        url: "https://profpressma.blogspot.com/2018/08/2017.html",
        fileType: "other",
      },
    ],
  },
  {
    id: "m2-hg-history-geo-lessons",
    title: "ملخصات وجذاذات التاريخ والجغرافيا للثانية إعدادي (الاكتشافات الجغرافية، الثورة الفرنسية، أمريكا)",
    category: "lessons",
    subject: "الاجتماعيات",
    semester: "s2",
    format: "PDF / Drive",
    description:
      "باقة دروس التاريخ والجغرافيا للثانية إعدادي: تراجع الجهاد وبداية حرب الاسترداد، الاكتشافات الجغرافية، الثورة الفلاحية والصناعية في أوروبا، الثورة الفرنسية وليدة فكر الأنوار، نشأة الولايات المتحدة الأمريكية، وجذاذات الجغرافيا.",
    downloadUrl: "https://drive.google.com/file/d/0B6yeTzOUKxW6WW44blFNcFFSMHliclB3NVBVTEJlRHRaN1JN/edit?usp=sharing",
    downloadLabel: "تحميل درس الاكتشافات الجغرافية (Drive)",
    updatedDate: "2026",
    downloadsCount: 2780,
    tags: ["التاريخ", "الجغرافيا", "الاكتشافات الجغرافية", "الثورة الفرنسية", "2AC"],
    content: `## دروس الاجتماعيات — التاريخ والجغرافيا (الثانية ثانوي إعدادي)

### 1. درس: تراجع الجهاد وبداية حرب الاسترداد
- تتبع التحولات السياسية والعسكرية بالأندلس والمغرب الأقصى بعد معركة العقاب (1212م)، وتزايد الضغوط الإيبيرية على السواحل المغربية.

### 2. درس: الاكتشافات الجغرافية (القرن 15 و 16م)
- انطلقت رحلات البرتغاليين باحتلال سبتة (1415م) والوصول لرأس الرجاء الصالح (1487م) ثم الهند عبر فاسكو دي كاما (1498م).
- قاد الإسبان رحلاتهم غرباً عبر كريستوف كولومب (1492م) وأمريكو فسبوتشي، وما تلا ذلك من تحول طرق التجارة العالمية نحو المحيط الأطلسي.

### 3. درس: الثورة الفلاحية والصناعية في أوروبا + الثورة الفرنسية + نشأة الولايات المتحدة
- **الثورة الفرنسية وليدة فكر الأنوار (1789م):** تأثير فلاسفة الأنوار (مونتيسكيو، فولتير، روسو) في إعلان حقوق الإنسان والمواطن ونهاية النظام الفيودالي.
- **نشأة الولايات المتحدة الأمريكية:** حرب الاستقلال الأمريكية ضد التاج البريطاني وإعلان الاستقلال (1776م) وإقرار الدستور الفيدرالي.`,
    downloads: [
      {
        id: "m2-hg-ecouvertes-drv",
        label: "ملف درس الاكتشافات الجغرافية (Google Drive)",
        url: "https://drive.google.com/file/d/0B6yeTzOUKxW6WW44blFNcFFSMHliclB3NVBVTEJlRHRaN1JN/edit?usp=sharing",
        fileType: "drive",
      },
      {
        id: "m2-hg-jihad",
        label: "مورد درس تراجع الجهاد وبداية حرب الاسترداد",
        url: "https://profpressma.blogspot.com/2018/11/blog-post_50.html",
        fileType: "other",
      },
      {
        id: "m2-hg-rev-fr",
        label: "الدرس 11 التاريخ: الثورة الفرنسية وليدة فكر الأنوار",
        url: "https://profpressma.blogspot.com/2020/04/blog-post_75.html",
        fileType: "other",
      },
      {
        id: "m2-hg-usa",
        label: "الدرس 12 التاريخ: نشأة الولايات المتحدة الأمريكية",
        url: "https://profpressma.blogspot.com/2020/04/blog-post_72.html",
        fileType: "other",
      },
      {
        id: "m2-hg-indus",
        label: "نموذج جذاذة درس الثورة الفلاحية والصناعية في أوروبا",
        url: "https://profpressma.blogspot.com/2014/09/blog-post_8.html",
        fileType: "other",
      },
      {
        id: "m2-hg-geo-jod",
        label: "جذاذات الجغرافيا للسنة الثانية ثانوي إعدادي",
        url: "https://profpressma.blogspot.com/2017/04/blog-post_21.html",
        fileType: "other",
      },
    ],
  },
  {
    id: "m2-hg-exams",
    title: "فروض منزلية ومحروسة في مادة الاجتماعيات للثانية إعدادي (المرحلة 1 و 2)",
    category: "exams",
    subject: "الاجتماعيات",
    semester: "annual",
    format: "PDF",
    description:
      "نماذج فروض منزلية ومحروسة في التاريخ والجغرافيا والتربية على المواطنة للسنة الثانية ثانوي إعدادي مع ملفات PDF جاهزة للطباعة.",
    downloadUrl: "https://profpressma.blogspot.com/2020/11/blog-post_45.html",
    downloadLabel: "فتح فروض الاجتماعيات للثانية إعدادي",
    updatedDate: "2026",
    downloadsCount: 1920,
    tags: ["فروض الاجتماعيات", "التاريخ والجغرافيا", "2AC"],
    downloads: [
      {
        id: "m2-hg-ex-1",
        label: "فرض منزلي الاجتماعيات الثانية إعدادي — المرحلة الأولى",
        url: "https://profpressma.blogspot.com/2020/11/blog-post_45.html",
        fileType: "pdf",
      },
      {
        id: "m2-hg-ex-2",
        label: "نموذج اختبار في التاريخ والجغرافيا 2AC (PDF)",
        url: "http://elaraki.ac.ma/examens/ce8/ce8hig1sem0809.pdf",
        fileType: "pdf",
      },
    ],
  },

  // =========================================================================
  // 7. مادة التربية الإسلامية والفروض المجمعة
  // =========================================================================
  {
    id: "m2-islamic-jodadat-exams",
    title: "جذاذات ودروس وفروض التربية الإسلامية للسلك الإعدادي (12 ملفاً Drive)",
    category: "lessons",
    subject: "التربية الإسلامية",
    semester: "annual",
    format: "PDF / DOCX",
    description:
      "تجميعية جذاذات المداخل الخمسة في التربية الإسلامية للسلك الإعدادي (سورة النجم والحشر، تقوى الله، الهجرة المتجددة، سعة مغفرة الله، العبادة) مع الفروض الكتابية للأسدوس الثاني.",
    downloadUrl: "https://profpressma.blogspot.com/2017/12/jodadat-college-education-islamique.html",
    downloadLabel: "فتح جميع جذاذات التربية الإسلامية (12 ملفاً Drive)",
    updatedDate: "2026",
    downloadsCount: 3340,
    featured: true,
    tags: ["التربية الإسلامية", "جذاذات", "سورة النجم", "سورة الحشر", "2AC"],
    downloads: [
      {
        id: "m2-isl-1",
        label: "جذاذة: حق الله — تقوى الله (Drive)",
        url: "https://drive.google.com/file/d/0B6yeTzOUKxW6a1U5bnlUcUF0WDU1T2g3X0JNWUgxNDhPSElV/view?usp=sharing",
        fileType: "drive",
      },
      {
        id: "m2-isl-2",
        label: "جذاذة: المقطع 1 من سورة الحشر (Drive)",
        url: "https://drive.google.com/file/d/0B6yeTzOUKxW6MXkwUUFBSkhFSy0tNkdqMU9lYWZBcXFLM1Y4/view?usp=sharing",
        fileType: "drive",
      },
      {
        id: "m2-isl-3",
        label: "جذاذة: المقطع 2 من سورة الحشر (Drive)",
        url: "https://drive.google.com/file/d/0B6yeTzOUKxW6Y2hCVTcwVWRoT0lXWHBHWWo2c0NaYmducFlV/view?usp=sharing",
        fileType: "drive",
      },
      {
        id: "m2-isl-4",
        label: "جذاذة: المقطع 1 سورة النجم (Drive)",
        url: "https://drive.google.com/file/d/0B6yeTzOUKxW6TFc4eC1vdDczQkMwVTdrYzNtb1JOZUpWRzFv/view?usp=sharing",
        fileType: "drive",
      },
      {
        id: "m2-isl-5",
        label: "جذاذة: المقطع 2 سورة النجم (Drive)",
        url: "https://drive.google.com/file/d/0B6yeTzOUKxW6WDhOeUZxN2xqY0JCV0VsZ0ExaTZ4ZWhnWktj/view?usp=sharing",
        fileType: "drive",
      },
      {
        id: "m2-isl-6",
        label: "جذاذة: إيواء الرسول ﷺ — أبو أيوب الأنصاري (Drive)",
        url: "https://drive.google.com/file/d/0B6yeTzOUKxW6QnNlZUN4UV9qS1MzMTlrM0NhdjJyWU95M084/view?usp=sharing",
        fileType: "drive",
      },
      {
        id: "m2-isl-7",
        label: "جذاذة: الهجرة المتجددة (Drive)",
        url: "https://drive.google.com/file/d/0B6yeTzOUKxW6Q2ZETTIwTWp5enlKOVlLc3lVTEJUSjFnNVlj/view?usp=sharing",
        fileType: "drive",
      },
      {
        id: "m2-isl-8",
        label: "جذاذة: العبادة غاية الخلق وشمولها لمناحي الحياة (Drive)",
        url: "https://drive.google.com/file/d/0B6yeTzOUKxW6aUQzdGR3YUhnYTd1S051Mm1nd09kWFROeXo0/view?usp=sharing",
        fileType: "drive",
      },
      {
        id: "m2-isl-hadith",
        label: "دعامة الحديث النبوي: سعة مغفرة الله عز وجل (2AC)",
        url: "https://profpressma.blogspot.com/2013/12/blog-post_7078.html",
        fileType: "other",
      },
      {
        id: "m2-isl-exams",
        label: "فروض كتابية في التربية الإسلامية الأسدوس 2",
        url: "https://profpressma.blogspot.com/2014/03/2.html",
        fileType: "pdf",
      },
    ],
  },
  {
    id: "m2-all-exams-pack",
    title: "الحقيبة المجمعة للفروض المحروسة والفروض المنزلية (جميع مواد الثانية إعدادي)",
    category: "exams",
    subject: "عام",
    semester: "annual",
    format: "PDF / Drive",
    description:
      "مكتبة الفروض المحروسة والمنزلية للسنة الثانية ثانوي إعدادي تشمل الفروض العامة وفروض التربية الأسرية وملفات Google Drive المباشرة.",
    downloadUrl: "https://drive.google.com/file/d/0B3j73Pz7FN4vcWpLa3hzcDVwYlU/edit?usp=sharing",
    downloadLabel: "تحميل حزمة الفروض المجمعة 2AC (Drive)",
    updatedDate: "2026",
    downloadsCount: 3650,
    tags: ["فروض الثانية إعدادي", "فروض منزلية", "التربية الأسرية", "2AC"],
    downloads: [
      {
        id: "m2-all-ex1",
        label: "حزمة الفروض المحروسة والمنزلية 1 (Google Drive)",
        url: "https://drive.google.com/file/d/0B3j73Pz7FN4vcWpLa3hzcDVwYlU/edit?usp=sharing",
        fileType: "drive",
      },
      {
        id: "m2-all-ex2",
        label: "حزمة الفروض المحروسة والمنزلية 2 (Google Drive)",
        url: "https://drive.google.com/file/d/0B3j73Pz7FN4vR01lMWZUZVdIUlU/edit?usp=sharing",
        fileType: "drive",
      },
      {
        id: "m2-all-ex-osria",
        label: "فرض في مادة التربية الأسرية للثانية إعدادي",
        url: "https://profpressma.blogspot.com/2014/01/blog-post_9772.html",
        fileType: "pdf",
      },
      {
        id: "m2-all-ex-archive1",
        label: "موسوعة فروض السنة الثانية إعدادي (ProfPress)",
        url: "https://profpressma.blogspot.com/2013/12/blog-post_6865.html",
        fileType: "other",
      },
      {
        id: "m2-all-ex-archive2",
        label: "كل فروض السنة الثانية إعدادي (ProfPress)",
        url: "https://profpressma.blogspot.com/2013/05/blog-post_9795.html",
        fileType: "other",
      },
    ],
  },
];
