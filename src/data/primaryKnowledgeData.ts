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

export interface PrimarySubjectAction {
  id: string;
  title: string; // e.g. "معارف المادة", "ديداكتيك المادة", "علوم التربية", "نماذج اختبارات", "اختبار تجريبي"
  iconName: string; // "BookOpen", "Presentation", "Brain", "FileText", "Laptop"
  customUrl?: string; // custom external link or internal modal
  contentSummary?: string;
  articleContent?: string;
  images?: ActionAttachedImage[];
  downloadFiles?: PrimaryDownloadFile[];
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
          articleContent: `# المعارف الأكاديمية لمادة اللغة العربية - مسلك تفتيش الابتدائي

## المحاور الأساسية للاختبار:
1. **النحو الوظيفي والتركيب:**
   - الجملة الفعلية والجملة الاسمية، النواسخ الفعلية والحرفية.
   - المفاعيل الخمسة، التوابع (النعت، البدل، التوكيد، العطف).
   - الحال والتمييز، المستثنى، المنادى، وأسلوب الشرط والتعجب.

2. **الصرف والتحويل:**
   - الميزان الصرفي، الفعل المجرد والمزيد، الصحيح والمعتل.
   - أسماء الفاعل والمفعول، أسماء الزمان والمكان، اسم الآلة، والتفضيل.
   - النسب والتصغير، والمصادر الصريحة والمؤولة.

3. **المعاجم والدلالة والبلاغة:**
   - البحث في المعاجم اللغوية، الحقيقة والمجاز، التشبيه والاستعارة والكناية.
   - الظواهر الدلالية: الترادف، التضاد، المشترك اللفظي، والحقول الدلالية.`,
          qcmQuestions: [
            {
              question: "ما إعراب كلمة 'طالباً' في الجملة: 'ازداد المتعلمُ طالباً للعلمِ'؟",
              options: ["مفعول به ثانٍ", "تمييز منصوب", "حال منصوبة", "مفعول لأجله"],
              correctIndex: 1,
              explanation: "الاسم المنصوب بعد فعل دال على الزيادة أو النقصان يعرب تمييزاً لبيان جهة الزيادة.",
            },
            {
              question: "أي من الأفعال التالية يعد فعلاً معتلاً أجوف؟",
              options: ["وعد", "قال", "رمى", "روى"],
              correctIndex: 1,
              explanation: "الفعل الأجوف هو ما كان وسطه (عينه) حرف علة مثل 'قال' و'صام'.",
            },
          ],
        },
        {
          id: "ar_didactics",
          title: "ديداكتيك المادة",
          iconName: "Presentation",
          contentSummary: "ديداكتيك تعليم وتعلم مكونات اللغة العربية: الاستماع والتحدث، القراءة المقطعية والتفاعلية، الظواهر اللغوية الضمنية والصريحة، ومشروع الوحدة.",
          articleContent: `# ديداكتيك اللغة العربية بالسلك الابتدائي

## المبادئ المنهجية العامة:
1. **الانتقال من الاستضمار إلى التصريح:**
   - تمرير الظواهر التركيبية والصرفية والإملائية ضمنياً بالسلك المبكر (السنوات 1 و 2 و 3).
   - التصريح بالقواعد والظواهر اللغوية في السنوات العليا (4 و 5 و 6).

2. **استراتيجيات القراءة التفاعلية:**
   - استراتيجيات ما قبل القراءة: التوقع، استثمار العتبات، وتنشيط المكتسبات.
   - استراتيجيات أثناء القراءة: المراقبة الذاتية، شبكة المفردات، خريطة الكلمة، وعائلة الكلمة.
   - استراتيجيات ما بعد القراءة: التلخيص، إعادة الإنتاج، وتوليد الأسئلة.

3. **مقاربة التدريس الصريح (Explicit Instruction) في معالجة التعثرات:**
   - النمذجة (أنا أفعل) -> الممارسة الموجهة (نحن نفعل) -> الممارسة المستقلة (أنت تفعل).`,
          qcmQuestions: [
            {
              question: "متى يتم الشروع في التصريح بالظواهر اللغوية في المنهاج المنقح للغة العربية؟",
              options: ["من السنة الأولى ابتدائي", "من السنة الثالثة ابتدائي", "من السنة الرابعة ابتدائي", "من السنة السادسة فقط"],
              correctIndex: 2,
              explanation: "يتم تصريح الظواهر اللغوية بالقواعد والضوابط بدءاً من السنة الرابعة ابتدائي بعد تمريرها ضمنياً في السنوات 1 و 2 و 3.",
            },
          ],
        },
        {
          id: "ar_pedagogy",
          title: "علوم التربية",
          iconName: "Brain",
          contentSummary: "نظريات التعلم (البنائية، السوسيوبنائية، المعرفية)، سيكولوجية الطفل في السلك الابتدائي، وتقنيات التنشيط والتفاعل الصفي.",
          articleContent: `# علوم التربية وسيكولوجية التعلم بالسلك الابتدائي

## 1. النظريات المرجعية الكبرى:
- **النظرية البنائية (بياجيه):** بناء المعرفة من خلال عمليتي الاستيعاب والملاءمة، ومراحل النمو العقلي والنمو الحسي الحركي والعمليات المحسوسة.
- **النظرية السوسيوبنائية (فيغوتسكي):** منطقة النمو القريب (ZPD)، دور الوساطة الاجتماعية والتفاعل النظير في بناء التعلمات.
- **النظرية المعرفية:** معالجة المعلومات، الذاكرة العاملة والذاكرة طويلة المدى، واستراتيجيات ما وراء المعرفة.`,
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
          ],
        },
        {
          id: "ar_exams",
          title: "نماذج اختبارات",
          iconName: "FileText",
          contentSummary: "أرشيف ونماذج الاختبارات الكتابية لمباريات التفتيش السابقة مع عناصر الإجابة الرسمية وشبكات التنقيط المعتمدة في اللغة العربية.",
          articleContent: `# نماذج اختبارات مباراة التفتيش - اللغة العربية

## شبكة تصحيح اختبار المعارف (اللغة العربية):
- **معارف المادة والأكاديميا (50%):** ضبط القواعد اللغوية، سلامة التحليل الإعرابي والصرفي، وإدراك البنية المعجمية والبلاغية.
- **المنهجية والتحليل الديداكتيكي (30%):** معالجة إشكالية تدريس المكون، تصميم وضعيات تعليمية تقويمية، وتحديد التعثرات وآليات المعالجة.
- **التشريع والمستجدات التربوية (20%):** توظيف موجهات خارطة الطريق والمنهاج الدراسي المحين.`,
          qcmQuestions: [
            {
              question: "ما المعامل المخصص لاختبار المعارف في التوصيف الرسمي لمباراة التفتيش الابتدائي؟",
              options: ["المعامل 1", "المعامل 2", "المعامل 3", "المعامل 4"],
              correctIndex: 0,
              explanation: "معامل اختبار المعارف بالسلك الابتدائي هو 1 بحسب التوصيف الرسمي المعتمد.",
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
