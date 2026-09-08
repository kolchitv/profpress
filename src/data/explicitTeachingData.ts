export interface ExplicitLessonItem {
  id: string;
  level: "1aep" | "2aep" | "3aep" | "4aep" | "5aep" | "6aep";
  subject: "arabic" | "french" | "math";
  unit: number; // Unité 1 à 6
  week: number; // Semaine 1 à 4
  title: string;
  titleFr?: string;
  objective: string;
  pptUrl?: string;
  pdfUrl?: string;
  driveUrl?: string;
  fileSize?: string;
  steps: {
    preparation: string; // 1. التهيئة والتذكير
    modeling: string;    // 2. النمذجة: "أنا أعمل"
    guided: string;      // 3. الممارسة الموجهة: "نحن نعمل معاً"
    autonomous: string;  // 4. الممارسة المستقلة: "أنت تعمل بمفردك"
    evaluation: string;  // 5. التقويم والتغذية الراجعة
  };
  keyConcepts?: string[];
  durationMinutes?: number;
}

export interface ExplicitTeachingResourcePackage {
  id: string;
  level: "1aep" | "2aep" | "3aep" | "4aep" | "5aep" | "6aep";
  levelNameAr: string;
  levelNameFr: string;
  arabicDriveUrl: string;
  frenchDriveUrl: string;
  mathDriveUrl: string;
  guideBookletUrl: string;
  studentBookletUrl: string;
  totalPptCount: number;
}

export interface ExplicitTeachingPageData {
  pageTitle: string;
  pageSubtitle: string;
  badgeText: string;
  officialUrl: string;
  introduction: {
    title: string;
    description: string;
    steps: {
      number: number;
      nameAr: string;
      nameFr: string;
      tagline: string;
      description: string;
      color: string;
      icon: string;
    }[];
  };
  packages: ExplicitTeachingResourcePackage[];
  lessons: ExplicitLessonItem[];
}

export const DEFAULT_EXPLICIT_TEACHING_DATA: ExplicitTeachingPageData = {
  pageTitle: "دروس وموارد التعليم الصريح بالسلك الابتدائي",
  pageSubtitle: "الحقيبة البيداغوجية الشاملة لمدارس الريادة (Écoles Pionnières): عروض PPT تفاعلية للمسلاط، كراسات التلميذ، ودلائل الأستاذ لجميع مستويات الابتدائي (من المستوى الأول إلى السادس)",
  badgeText: "مدارس الريادة • المعتمدة 2026/2027",
  officialUrl: "https://profpressma.blogspot.com/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%B5%D8%B1%D9%8A%D8%AD",
  introduction: {
    title: "الهندسة البيداغوجية للتعليم الصريح (Enseignement Explicite)",
    description: "مقاربة تدريسية مباشرة ومنهجية أثبتت نجاعتها العالمية في تمكين المتعلمين من الكفايات الأساسية في القراءة واللغات والرياضيات، ترتكز على التدرج الدقيق ونقل المسؤولية المعرفية من الأستاذ إلى التلميذ عبر خمس خطوات دقيقة:",
    steps: [
      {
        number: 1,
        nameAr: "التهيئة والربط",
        nameFr: "Ouverture / Rappel",
        tagline: "تنشيط المكتسبات وإعلان الهدف",
        description: "مراجعة سريعة للمكتسبات السابقة، والتصريح الواضح بالهدف التعلمي ومعايير النجاح، لتهيئة الانتباه وإبراز أهمية المهارة في الحياة اليومية.",
        color: "amber",
        icon: "Sparkles",
      },
      {
        number: 2,
        nameAr: "النمذجة",
        nameFr: "Modelage",
        tagline: "«أنا أعمل» (Je fais)",
        description: "الأستاذ يشرح وينفذ المهمة بصوت مسموع مع توضيح استراتيجيات التفكير وحل المشكلات، مع تقديم نماذج صحيحة وأمثلة مضادة لتفادي التعثرات الشائعة.",
        color: "blue",
        icon: "User",
      },
      {
        number: 3,
        nameAr: "الممارسة الموجهة",
        nameFr: "Pratique guidée",
        tagline: "«نحن نعمل معاً» (Nous faisons)",
        description: "إشراك التلاميذ في حل أمثلة مماثلة بالتدريج (بشكل جماعي أو ثنائي أو فردي بالألواح)، مع تقديم تغذية راجعة فورية وتصحيح لحظي للأخطاء.",
        color: "emerald",
        icon: "Users",
      },
      {
        number: 4,
        nameAr: "الممارسة المستقلة",
        nameFr: "Pratique autonome",
        tagline: "«أنت تعمل بمفردك» (Tu fais)",
        description: "المتعلم يطبق الكفاية بمفرده على كراسة التلميذ أو الدفتر دون مساعدة، لترسيخ التعلم وتحقيق الأوتوماتيكية والتملك الشخصي.",
        color: "indigo",
        icon: "CheckCircle2",
      },
      {
        number: 5,
        nameAr: "التقويم والتحقق الفوري",
        nameFr: "Objectivation & Bilan",
        tagline: "قياس التملك وتثبيت الخلاصة",
        description: "سؤال تحقق نهائي ومراجعة ما تم تعلمه مع رصد التلاميذ الذين ما زالوا في حاجة لدعم فوري قبل الانتقال إلى الحصة الموالية.",
        color: "rose",
        icon: "Award",
      },
    ],
  },
  packages: [
    {
      id: "pkg_1aep",
      level: "1aep",
      levelNameAr: "المستوى الأول ابتدائي",
      levelNameFr: "1ère Année Primaire (1AEP)",
      arabicDriveUrl: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%B5%D8%B1%D9%8A%D8%AD",
      frenchDriveUrl: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%B5%D8%B1%D9%8A%D8%AD",
      mathDriveUrl: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%B5%D8%B1%D9%8A%D8%AD",
      guideBookletUrl: "https://www.profpress.net/p/lecons-explicites-primaire.html",
      studentBookletUrl: "https://www.profpress.net/p/lecons-explicites-primaire.html",
      totalPptCount: 124,
    },
    {
      id: "pkg_2aep",
      level: "2aep",
      levelNameAr: "المستوى الثاني ابتدائي",
      levelNameFr: "2ème Année Primaire (2AEP)",
      arabicDriveUrl: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%B5%D8%B1%D9%8A%D8%AD",
      frenchDriveUrl: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%B5%D8%B1%D9%8A%D8%AD",
      mathDriveUrl: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%B5%D8%B1%D9%8A%D8%AD",
      guideBookletUrl: "https://www.profpress.net/p/lecons-explicites-primaire.html",
      studentBookletUrl: "https://www.profpress.net/p/lecons-explicites-primaire.html",
      totalPptCount: 138,
    },
    {
      id: "pkg_3aep",
      level: "3aep",
      levelNameAr: "المستوى الثالث ابتدائي",
      levelNameFr: "3ème Année Primaire (3AEP)",
      arabicDriveUrl: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%B5%D8%B1%D9%8A%D8%AD",
      frenchDriveUrl: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%B5%D8%B1%D9%8A%D8%AD",
      mathDriveUrl: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%B5%D8%B1%D9%8A%D8%AD",
      guideBookletUrl: "https://www.profpress.net/p/lecons-explicites-primaire.html",
      studentBookletUrl: "https://www.profpress.net/p/lecons-explicites-primaire.html",
      totalPptCount: 142,
    },
    {
      id: "pkg_4aep",
      level: "4aep",
      levelNameAr: "المستوى الرابع ابتدائي",
      levelNameFr: "4ème Année Primaire (4AEP)",
      arabicDriveUrl: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%B5%D8%B1%D9%8A%D8%AD",
      frenchDriveUrl: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%B5%D8%B1%D9%8A%D8%AD",
      mathDriveUrl: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%B5%D8%B1%D9%8A%D8%AD",
      guideBookletUrl: "https://www.profpress.net/p/lecons-explicites-primaire.html",
      studentBookletUrl: "https://www.profpress.net/p/lecons-explicites-primaire.html",
      totalPptCount: 156,
    },
    {
      id: "pkg_5aep",
      level: "5aep",
      levelNameAr: "المستوى الخامس ابتدائي",
      levelNameFr: "5ème Année Primaire (5AEP)",
      arabicDriveUrl: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%B5%D8%B1%D9%8A%D8%AD",
      frenchDriveUrl: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%B5%D8%B1%D9%8A%D8%AD",
      mathDriveUrl: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%B5%D8%B1%D9%8A%D8%AD",
      guideBookletUrl: "https://www.profpress.net/p/lecons-explicites-primaire.html",
      studentBookletUrl: "https://www.profpress.net/p/lecons-explicites-primaire.html",
      totalPptCount: 160,
    },
    {
      id: "pkg_6aep",
      level: "6aep",
      levelNameAr: "المستوى السادس ابتدائي",
      levelNameFr: "6ème Année Primaire (6AEP)",
      arabicDriveUrl: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%B5%D8%B1%D9%8A%D8%AD",
      frenchDriveUrl: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%B5%D8%B1%D9%8A%D8%AD",
      mathDriveUrl: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%B5%D8%B1%D9%8A%D8%AD",
      guideBookletUrl: "https://www.profpress.net/p/lecons-explicites-primaire.html",
      studentBookletUrl: "https://www.profpress.net/p/lecons-explicites-primaire.html",
      totalPptCount: 165,
    },
  ],
  lessons: [
    // 1. العربية - المستوى الرابع
    {
      id: "les_ar_4_1",
      level: "4aep",
      subject: "arabic",
      unit: 1,
      week: 1,
      title: "القراءة الصريحة: استراتيجيات المفردات (خريطة الكلمة وشبكة المفردات)",
      titleFr: "Lecture explicite: Stratégies de vocabulaire",
      objective: "أن يوظف المتعلم استراتيجية خريطة الكلمة لتحديد نوعها ومرادفها وضدها وتركيبها في جملة مفيدة.",
      pptUrl: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%B5%D8%B1%D9%8A%D8%AD",
      pdfUrl: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%B5%D8%B1%D9%8A%D8%AD",
      driveUrl: "https://drive.google.com",
      fileSize: "4.8 MB (PPTX)",
      durationMinutes: 45,
      keyConcepts: ["خريطة الكلمة", "المرادف", "الضد", "نوع الكلمة", "سياق الجملة"],
      steps: {
        preparation: "عرض كلمة مألوفة على المسلاط وتذكير المتعلمين بأن فهم المعنى هو مفتاح القراءة السليمة، وإعلان الهدف: 'اليوم سنتعلم معاً كيف نستخدم خريطة الكلمة لاكتشاف معنى أي كلمة جديدة'.",
        modeling: "يختار الأستاذ كلمة 'اكتشف'، ويعرض التفكير بصوت مسموع: 'أولاً أحدد نوع الكلمة: تقبل علامات الفعل، إذن هي فعل. ثانياً أبحث عن مرادفها: عرف أو استطلع. ثالثاً ضدها: جهل. رابعاً أركبها في جملة تامة المعنى'.",
        guided: "تقديم كلمة جديدة 'ابتهاج' على الشاشة. يطلب الأستاذ من التلميذ الأول تحديد النوع على اللوحة، ومن الثاني المرادف، ثم تكوين جملة ثنائية بالتشاور قبل العرض على السبورة.",
        autonomous: "فتح كراسة المتعلم الصفحة 14 لإنجاز خريطة كلمة 'شغف' بشكل فردي خلال 7 دقائق تحت متابعة وتفقد الأستاذ.",
        evaluation: "عرض سؤال سريع على شاشة المسلاط لاختيار الضد الصحيح لكلمة 'شغف'، مع تصحيح جماعي وتسجيل نسب التمكن.",
      },
    },

    // 2. الفرنسية - المستوى الرابع
    {
      id: "les_fr_4_1",
      level: "4aep",
      subject: "french",
      unit: 1,
      week: 1,
      title: "Grammaire explicite: La phrase verbale et la phrase nominale",
      titleFr: "La phrase verbale et la phrase nominale",
      objective: "Identifier et distinguer la phrase verbale de la phrase nominale et transformer de l'une à l'autre.",
      pptUrl: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%B5%D8%B1%D9%8A%D8%AD",
      pdfUrl: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%B5%D8%B1%D9%8A%D8%AD",
      driveUrl: "https://drive.google.com",
      fileSize: "3.9 MB (PPTX)",
      durationMinutes: 45,
      keyConcepts: ["Verbe conjugué", "Nom noyau", "Transformation", "Sens complet"],
      steps: {
        preparation: "Rappel de la définition d'une phrase (sens, majuscule, point). Annonce de l'objectif: 'Aujourd'hui, nous allons apprendre à reconnaître la phrase verbale et la phrase nominale.'",
        modeling: "Le maître lit 2 phrases au vidéoprojecteur: 'Le train arrive.' et 'Arrivée du train.' Il verbalise: 'Dans la première, il y a le verbe conjugué arrive -> c'est une phrase verbale. Dans la deuxième, il n'y a pas de verbe -> c'est une phrase nominale.'",
        guided: "Affichage de 4 phrases au tableau. Les élèves lèvent l'ardoise (V pour verbale, N pour nominale). Correction immédiate avec justification collective.",
        autonomous: "Les élèves ouvrent le cahier d'activités p. 18 et réalisent l'exercice 2 individuellement en silence pendant 8 minutes.",
        evaluation: "Mini-bilan sur ardoise: Transformer la phrase verbale 'Le vent souffle.' en phrase nominale.",
      },
    },

    // 3. الرياضيات - المستوى الثالث
    {
      id: "les_math_3_1",
      level: "3aep",
      subject: "math",
      unit: 1,
      week: 2,
      title: "الرياضيات الصريحة: الضرب في عدد من رقم واحد بالاحتفاظ وبدونه",
      titleFr: "Multiplication par un chiffre avec et sans retenue",
      objective: "أن يتقن المتعلم التقنية الاعتيادية للضرب في عدد من رقم واحد مع تدبير الاحتفاظ السليم.",
      pptUrl: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%B5%D8%B1%D9%8A%D8%AD",
      pdfUrl: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%B5%D8%B1%D9%8A%D8%AD",
      driveUrl: "https://drive.google.com",
      fileSize: "5.2 MB (PPTX)",
      durationMinutes: 55,
      keyConcepts: ["الضرب", "جدول الضرب", "التقنية الاعتيادية", "الاحتفاظ", "الوحدات والعشرات"],
      steps: {
        preparation: "حساب ذهني سريع (ضرب أعداد في 3 و 4 و 5 على الألواح خلال 5 دقائق). إعلان الهدف: 'اليوم سنتعلم كيفية وضع وإنجاز عملية ضرب عدد من رقمين في رقم واحد مع الاحتفاظ بدقة'.",
        modeling: "ينمذج الأستاذ العملية 24 × 3 على شاشة العرض. يوضح: 'أولاً أضرب 3 في 4 وحدات = 12، أكتب 2 في الوحدات وأحتفظ بـ 1 فوق العشرات. ثانياً أضرب 3 في 2 عشرات = 6، وأضيف الاحتفاظ 1 ليصبح 7. النتيجة 72'.",
        guided: "ينجز المتعلمون العملية 36 × 2 على الألواح خطوة بخطوة. يوجه الأستاذ من ينسى إضافة الاحتفاظ ويثبت القاعدة.",
        autonomous: "إنجاز التمارين 1 و 2 بالكراسة ص 22 فردياً، مع انتقال الأستاذ لدعم المتعثرين فورياً.",
        evaluation: "مسألة سريعة: اشترت المدرسة 3 صناديق من الأقلام في كل صندوق 15 قلماً، احسب مجموع الأقلام.",
      },
    },

    // 4. العربية - المستوى الثاني
    {
      id: "les_ar_2_1",
      level: "2aep",
      subject: "arabic",
      unit: 2,
      week: 1,
      title: "القراءة المقطعية الصريحة: تمييز الصوت والرمز لحرف القاف [ق]",
      titleFr: "Lecture syllabique: La lettre Qaf",
      objective: "الوعي الصوتي والتعرف البصري لحرف القاف مع الحركات القصيرة والطويلة والتنوين وقراءته بطلاقة.",
      pptUrl: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%B5%D8%B1%D9%8A%D8%AD",
      pdfUrl: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%B5%D8%B1%D9%8A%D8%AD",
      driveUrl: "https://drive.google.com",
      fileSize: "4.1 MB (PPTX)",
      durationMinutes: 45,
      keyConcepts: ["الوعي الصوتي", "المقطع", "الحركات القصيرة", "الحركات الطويلة", "الطلاقة"],
      steps: {
        preparation: "لعبة العزل الصوتي: الاستماع لكلمات وتحديد الصوت المشترك [ق]. إعلان الهدف: 'اليوم سنتعرف على حرف القاف ونقرأه بالحركات ونركب منه كلمات'.",
        modeling: "ينطق الأستاذ الصوت [ق] بحركاته الثلاث مبيناً مخرجه، ويعرض بطاقات الحرف على الشاشة: قَ - قُ - قِ / قَا - قُو - قِي.",
        guided: "التصفيق عند سماع مقطع يتضمن القاف، وقراءة لوحة المقاطع جماعياً ثم ثنائياً مع الأقران.",
        autonomous: "تطبيق فردي في كراسة الأنشطة: تلوين مقاطع القاف وكتابة حرف القاف باتباع شبكة المقاييس الخطية.",
        evaluation: "قراءة كلمة 'قِطَارٌ' على لوحة التحقق الفوري لكل تلميذ.",
      },
    },

    // 5. الفرنسية - المستوى السادس
    {
      id: "les_fr_6_1",
      level: "6aep",
      subject: "french",
      unit: 1,
      week: 2,
      title: "Conjugaison explicite: Le présent de l'indicatif des verbes du 3ème groupe",
      titleFr: "Le présent de l'indicatif des verbes du 3ème groupe",
      objective: "Maîtriser les terminaisons et la conjugaison des verbes usuels du 3ème groupe au présent de l'indicatif.",
      pptUrl: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%B5%D8%B1%D9%8A%D8%AD",
      pdfUrl: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%B5%D8%B1%D9%8A%D8%AD",
      driveUrl: "https://drive.google.com",
      fileSize: "4.5 MB (PPTX)",
      durationMinutes: 45,
      keyConcepts: ["Verbes du 3ème groupe", "Terminaisons s-s-t / ds-ds-d", "Radical", "Présent de l'indicatif"],
      steps: {
        preparation: "Rappel des verbes du 1er et 2ème groupe au présent. Annonce de l'objectif: 'Conjuguer correctement les verbes réguliers et irréguliers du 3ème groupe (prendre, faire, dire, partir)'.",
        modeling: "Le maître modélise la conjugaison du verbe 'prendre' au tableau: repérage du radical 'pren-' et des terminaisons particulières 'ds, ds, d, nons, nez, nent'.",
        guided: "Conjugaison guidée du verbe 'faire' sur ardoises avec correction instantanée.",
        autonomous: "Exercice autonome sur le cahier de l'élève (compléter un texte avec les verbes conjugués).",
        evaluation: "Quiz rapide de 3 questions QCM au vidéoprojecteur.",
      },
    },

    // 6. الرياضيات - المستوى الخامس
    {
      id: "les_math_5_1",
      level: "5aep",
      subject: "math",
      unit: 2,
      week: 1,
      title: "الرياضيات الصريحة: الأعداد الكسرية - الجمع والطرح وتوحيد المقامات",
      titleFr: "Fractions: Addition, soustraction et réduction au même dénominateur",
      objective: "أن يوحد المتعلم مقامي عددين كسريين ويحسب مجموعهما أو فرقهما ويختزل النتيجة إلى أقصى حد.",
      pptUrl: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%B5%D8%B1%D9%8A%D8%AD",
      pdfUrl: "https://www.profpress.net/search/label/%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85%20%D8%A7%D9%84%D8%B5%D8%B1%D9%8A%D8%AD",
      driveUrl: "https://drive.google.com",
      fileSize: "5.5 MB (PPTX)",
      durationMinutes: 55,
      keyConcepts: ["الكسور", "توحيد المقامات", "المضاعف المشترك الأصغر", "الجمع والطرح", "الاختزال"],
      steps: {
        preparation: "حساب ذهني: تحويل أعداد كسرية لمقامات متساوية. إعلان الهدف الصريح للدرس.",
        modeling: "ينمذج الأستاذ حساب (1/3 + 2/5): إيجاد المقام المشترك (15)، ضرب البسطين، جمع البسطين مع الحفاظ على المقام.",
        guided: "إنجاز جماعي لعملية طرح (3/4 - 1/2) على الألواح مع مناقشة أسباب الخطأ الشائع بطرح المقامات.",
        autonomous: "إنجاز 3 عمليات متنوعة على الدفاتر الفردية.",
        evaluation: "مسألة وضعية مشكلة سريعة لقياس الأثر وتحديد المستفيدين من الدعم المندمج.",
      },
    },
  ],
};
