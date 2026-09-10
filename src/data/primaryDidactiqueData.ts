import { PrimaryExamSpec, PrimarySubjectAction, PrimaryDownloadFile, PrimaryImageBanner, PrimarySubjectCard } from "./primaryKnowledgeData";

export interface PrimaryDidactiquePageData {
  pageTitle: string;
  pageSubtitle: string;
  officialSource: string;
  lastUpdated: string;
  sourceUrl: string;
  specs: PrimaryExamSpec;
  subjects: PrimarySubjectCard[];
  downloadFiles: PrimaryDownloadFile[];
  imageBanners: PrimaryImageBanner[];
}

export const DEFAULT_PRIMARY_DIDACTIQUE_DATA: PrimaryDidactiquePageData = {
  pageTitle: "ديداكتيك تفتيش التعليم الابتدائي",
  pageSubtitle: "كل ما تحتاجه للتحضير لاختبار ديداكتيك المواد والعلوم التربوية لمباراة ولوج مركز تكوين مفتشي التعليم (CFIE)",
  officialSource: "المركز الوطني للتقويم والامتحانات والتوجيه (CNEO)",
  lastUpdated: "موسم 2026/2027",
  sourceUrl: "https://profpressma.blogspot.com/p/didactique-primaire-inspection.html",
  specs: {
    duration: "4 ساعات",
    coefficient: "2*",
    highestWeight: "العربية والفرنسية (%30 لكل منهما)",
    lowestWeight: "النشاط العلمي (%12) / الرياضيات (%28)",
  },
  subjects: [
    // 1. ديداكتيك اللغة العربية (30%)
    {
      id: "didactics_arabic",
      title: "ديداكتيك اللغة العربية",
      weightBadge: "وزن المكون: 30%",
      colorScheme: "emerald",
      actions: [
        {
          id: "ar_did_reading",
          title: "ديداكتيك القراءة",
          iconName: "BookOpen",
          contentSummary: "مكونات التعليم المبكر للقراءة واستراتيجيات التدريس الصريح: الوعي الصوتي، المبدأ الألفبائي، الطلاقة، المفردات، والفهم القرائي.",
          articleContent: `# ديداكتيك القراءة بالتعليم الابتدائي والتدريس الصريح

تحتل القراءة مكانة الصدارة في المنهاج الدراسي للغة العربية بالتعليم الابتدائي، وتعتمد المقاربة المعتمدة على استراتيجيات التعليم الصريح (Explicit Instruction) المبنية على خمسة مكونات أساسية:

## المكونات الخمسة للتعليم المبكر للقراءة:
1. **الوعي الصوتي (Conscience phonologique):** إدراك أن الكلمات المنطوقة تتركب من وحدات صوتية صغرى (فونيمات)، والقدرة على عزلها وتجزيئها ودمجها وحذفها واستبدالها.
2. **المبدأ الألفبائي (Principe alphabétique):** الربط الصريح بين الحرف المكتوب (Ggraphème) والصوت المنطوق (Phonème).
3. **الطلاقة (Fluidité):** القراءة بدقة وسرعة وإيقاع معبر عن المعنى.
4. **المفردات وإثراء المعجم (Vocabulaire):** شبكة المفردات، خريطة الكلمة، عائلة الكلمة، المعاني المتعددة، ومفاتيح السياق.
5. **الفهم القرائي (Compréhension):** استراتيجيات ما قبل القراءة (التوقع، تصفح المؤشرات)، أثناء القراءة (المراقبة الذاتية، الاستنتاج، إعادة الصياغة)، وما بعد القراءة (التلخيص، استخراج الأفكار، إبداء الرأي).

## مسار التدريس الصريح:
- **النمذجة (Je fais):** يقدم المدرس المهارة بصوت مسموع ومباشر.
- **الممارسة الموجهة (Nous faisons):** تطبيق جماعي وثنائي مع تقديم التغذية الراجعة الفورية.
- **الممارسة المستقلة (Tu fais):** تطبيق فردي لتثبيت التملك.
- **التطبيق والتحويل:** نقل التعلم لسياقات جديدة ومختلفة.`,
          qcmQuestions: [
            {
              question: "ما هو الترتيب المنهجي لخطوات التدريس الصريح في حصة القراءة بالتعليم الابتدائي؟",
              options: [
                "الممارسة المستقلة -> النمذجة -> الممارسة الموجهة -> التطبيق",
                "النمذجة -> الممارسة الموجهة -> الممارسة المستقلة -> التطبيق والتحويل",
                "التقويم التشخيصي -> التطبيق المباشر -> النمذجة -> الاستظهار",
                "الممارسة الموجهة -> النمذجة -> العمل بالمجموعات -> الفرض المنزلي",
              ],
              correctIndex: 1,
              explanation: "يبدأ التدريس الصريح بالنمذجة المباشرة (أنا أفعل)، تليها الممارسة الموجهة (نحن نفعل)، ثم الممارسة المستقلة (أنت تفعل)، وأخيراً التطبيق والتحويل.",
              level: "ديداكتيك القراءة",
            },
            {
              question: "أي من المهارات الآتية تندرج حصراً ضمن مهارات 'الوعي الصوتي'؟",
              options: [
                "رسم الحرف على السطر برسم صحيح",
                "عزل الصوت الأول في الكلمة المنطوقة بدون الاستعانة بالحرف المكتوب",
                "تحديد الفكرة العامة للنص القرائي",
                "استخراج المعنى الضمني من النص",
              ],
              correctIndex: 1,
              explanation: "الوعي الصوتي يتعامل حصراً مع الأصوات المنطوقة سمعياً دون الحاجة إلى الحروف المكتوبة.",
              level: "ديداكتيك القراءة",
            },
          ],
        },
        {
          id: "ar_did_oral",
          title: "الاستماع والتحدث",
          iconName: "Presentation",
          contentSummary: "الهندسة الديداكتيكية لمكون الاستماع والتحدث: استثمار الحكاية والوضعية التواصلية وتطوير الكفايات الشفهية.",
          articleContent: `# ديداكتيك مكون الاستماع والتحدث

يستهدف مكون الاستماع والتحدث تمكين المتعلم من التعبير الشفهي السليم والتواصل التفاعلي الوظيفي عبر وسيطين ديداكتيكيين رئيسيين:

## 1. الحكاية (Le Conte):
- تقدم حكاية واحدة على مدى أسبوعين أو ثلاثة بهدف تنمية الرصيد اللغوي والتعبير الإبداعي.
- مراحل تدبير الحكاية: وضعية الانطلاق، تسميع الحكاية، تحديد عناصر الحكاية (الشخصيات، الزمان، المكان، الأحداث)، استخراج البنية السردية (البداية، التحول، المشكل، الحل، النهاية)، واستثمار المعجم والظواهر اللغوية والإنتاج والإبداع.

## 2. الوضعية التواصلية (Situation de communication):
- موقف حواري يومي دال (التحية، تقديم النفس، الاستفسار، الوصف، الاعتذار، إبداء الرأي).
- تهدف إلى بناء أفعال كلامية وظيفية وربط التلميذ بواقعه اليومي.`,
          qcmQuestions: [
            {
              question: "ما الهدف البيداغوجي الأساسي من تخصيص حصص مستقلة لـ 'البنية السردية' في تدبير الحكاية؟",
              options: [
                "حفظ أحداث الحكاية غيباً",
                "تمكين المتعلم من إدراك تسلسل الخطاطة السردية (بداية، تحول، مشكل، حل، نهاية) لإعادة الإنتاج",
                "شرح الكلمات الصعبة فقط",
                "التركيز على القواعد النحوية الضمنية",
              ],
              correctIndex: 1,
              explanation: "البنية السردية تساعد المتعلم على تمثل البناء المنطقي للنص السردي وتوظيفه في التعبير الشفهي والكتابي.",
              level: "الاستماع والتحدث",
            },
          ],
        },
        {
          id: "ar_did_grammar",
          title: "الظواهر اللغوية والكتابة",
          iconName: "Brain",
          contentSummary: "التدريس الضمني (السنوات 1-3) والتصريح بالقواعد اللغوية (السنوات 4-6) ومراحل مشروع الوحدة والتعبير الكتابي.",
          articleContent: `# ديداكتيك الظواهر اللغوية والكتابة

## 1. التدرج في تدريس الظواهر اللغوية:
- **المستويات الأولى (1، 2، 3):** التمرير الضمني بدون تصريح بالقواعد والمصطلحات، عبر الاستعمال والترويج الشفهي والاستماع.
- **المستويات العليا (4، 5، 6):** التصريح الصريح بالقواعد النحوية والصرفية والإملائية عبر خطوات: الملاحظة والاكتشاف، التحليل، الاستنتاج، والتطبيق والإنتاج.

## 2. ديداكتيك التعبير الكتابي (Production de l'écrit):
- التخطيط والتصميم.
- كتابة المسودة الأولى.
- المراجعة والتنقيح عبر شبكات تقويم ومعايير واضحة.
- العرض والمشاركة.`,
        },
        {
          id: "ar_did_exams",
          title: "نماذج امتحانات التفتيش",
          iconName: "FileText",
          contentSummary: "مواضيع سابقة لمباراة التفتيش الابتدائي في ديداكتيك اللغة العربية مع عناصر الإجابة والتحليل الديداكتيكي للممارسات الصفية.",
          customUrl: "https://profpressma.blogspot.com/p/didactique-primaire-inspection.html",
        },
        {
          id: "ar_did_quiz",
          title: "اختبار تجريبي تفاعلي",
          iconName: "Laptop",
          contentSummary: "اختبار تجريبي في ديداكتيك اللغة العربية يحاكي وضعيات امتحان التفتيش مع التصحيح الفوري وتغذية راجعة مفصلة.",
          customUrl: "https://profpressma.blogspot.com/p/quiz-arabe-inspection-primaire.html",
        },
      ],
    },

    // 2. ديداكتيك اللغة الفرنسية (30%)
    {
      id: "didactics_french",
      title: "Didactique du Français",
      weightBadge: "وزن المكون: 30%",
      colorScheme: "blue",
      actions: [
        {
          id: "fr_did_reading",
          title: "Didactique de la Lecture",
          iconName: "BookOpen",
          contentSummary: "Composantes fondamentales de l'apprentissage de la lecture en FLE: Décodage, encodage, fluidité, compréhension explicite et implicite.",
          articleContent: `# Didactique de la Lecture au Primaire (FLE)

L'enseignement de la lecture en français au primaire repose sur une démarche d'enseignement explicite structurée autour des axes suivants:

## 1. Conscience phonologique et principe alphabétique :
- Discrimination auditive et visuelle des phonèmes et graphèmes.
- Fusion syllabique et segmentation.

## 2. La Fluidité (Fluency) :
- Lecture précise, rapide et expressive (mesure par le MCLM - Mots Correctement Lus par Minute).

## 3. Stratégies de Compréhension :
- Identification des idées explicites et implicites.
- Repérage des connecteurs logiques et chronologiques.
- Résumé et reformulation.`,
          qcmQuestions: [
            {
              question: "Dans l'enseignement explicite de la lecture, quelle est l'étape où l'enseignant verbalise sa pensée à voix haute devant les élèves ?",
              options: [
                "La pratique autonome",
                "Le modelage (Modeling)",
                "La pratique guidée",
                "L'évaluation sommative",
              ],
              correctIndex: 1,
              explanation: "Le modelage consiste pour l'enseignant à rendre explicite sa démarche cognitive en exécutant la tâche à voix haute devant la classe.",
              level: "Didactique du Français",
            },
          ],
        },
        {
          id: "fr_did_oral",
          title: "Communication Orale",
          iconName: "Presentation",
          contentSummary: "Activités orales, actes de parole, rituels langagiers et simulation de situations de communication authentiques.",
          articleContent: `# Didactique de l'Oral en Français

## Objectifs :
- Développer la compétence communicative de l'apprenant dans des situations signifiantes.
- Structurer les actes de parole (saluer, informer, décrire, justifier, argumenter).

## Démarche méthodologique :
1. **Avant l'écoute :** Observation du support visuel et émission d'hypothèses.
2. **Pendant l'écoute :** Écoute active et validation des hypothèses.
3. **Après l'écoute :** Compréhension globale, compréhension fine et appropriation lexicale.
4. **Réinvestissement :** Jeux de rôles et dramatisation.`,
        },
        {
          id: "fr_did_written",
          title: "Production de l'écrit",
          iconName: "Brain",
          contentSummary: "Processus de rédaction: Planification, mise en texte, révision et remédiation orthographique et syntaxique.",
        },
        {
          id: "fr_did_exams",
          title: "Sujets de Concours",
          iconName: "FileText",
          contentSummary: "Annales et sujets corrigés de didactique du français pour le concours d'accès au CFIE.",
          customUrl: "https://profpressma.blogspot.com/p/didactique-primaire-inspection.html",
        },
        {
          id: "fr_did_quiz",
          title: "Quiz Interactif",
          iconName: "Laptop",
          contentSummary: "Quiz interactif pour tester vos connaissances en didactique du FLE et gestion de classe au primaire.",
        },
      ],
    },

    // 3. ديداكتيك الرياضيات (28%)
    {
      id: "didactics_math",
      title: "ديداكتيك الرياضيات",
      weightBadge: "وزن المكون: 28%",
      colorScheme: "amber",
      actions: [
        {
          id: "math_did_concepts",
          title: "المفاهيم الديداكتيكية",
          iconName: "Brain",
          contentSummary: "النقل الديداكتيكي، العقد الديداكتيكي، المتغيرات الديداكتيكية، عوائق التعلم، ونظرية الوضعيات الديداكتيكية لجاي بروسو Guy Brousseau.",
          articleContent: `# المفاهيم والمفارقات الديداكتيكية في الرياضيات

## 1. نظرية الوضعيات الديداكتيكية (Guy Brousseau):
- **وضعية الفعل (Situation d'action):** المتعلم في تفاعل مباشر مع الوسط لبناء نموذج أولي.
- **وضعية الصياغة (Situation de formulation):** تبادل المعلومات وصياغة الفرضيات شفهياً أو كتابياً.
- **وضعية التصديق (Situation de validation):** تقديم البراهين والحجج لإثبات صحة الحل.
- **المأسسة (Institutionnalisation):** تدخل المدرس لإعطاء المعرفة صبغتها الرسمية والتعاقدية.

## 2. العقد الديداكتيكي (Contrat didactique):
مجموع القواعد والالتزامات الصريحة والضمنية التي تحدد ما ينتظره كل طرف (المدرس والمتعلم) من الآخر بشأن المعرفة المدرسية.

## 3. المتغير الديداكتيكي (Variable didactique):
عنصر في الوضعية التعلمية يؤدي تغييره من طرف المدرس إلى تغيير استراتيجيات الحل المتبعة من طرف المتعلم.`,
          qcmQuestions: [
            {
              question: "ما هي المرحلة التي يتدخل فيها المدرس لإعطاء المعرفة الرياضية صفة 'المعرفة الرسمية المقررة' بعد بنائها؟",
              options: [
                "وضعية الفعل (Situation d'action)",
                "وضعية المأسسة (Institutionnalisation)",
                "وضعية التصديق (Situation de validation)",
                "العقد الديداكتيكي",
              ],
              correctIndex: 1,
              explanation: "المأسسة هي المرحلة التي يربط فيها المدرس بين المعرفة المكتشفة في القسم والمعرفة العلمية المدرسية الرسمية.",
              level: "ديداكتيك الرياضيات",
            },
          ],
        },
        {
          id: "math_did_numbers",
          title: "ديداكتيك الأعداد والعمليات",
          iconName: "Calculator",
          contentSummary: "بناء المفاهيم العددية، الحساب الذهني، التقنيات الاعتيادية للعمليات، ومعالجة صعوبات الانتقال من الجمع إلى الضرب والقسمة.",
        },
        {
          id: "math_did_geometry",
          title: "الهندسة والقياس والبيانات",
          iconName: "Presentation",
          contentSummary: "مستويات التفكير الهندسي لفان هايل (Van Hiele)، بناء مفاهيم القياس والتحويلات، ومعالجة وتنظيم البيانات الإحصائية.",
        },
        {
          id: "math_did_exams",
          title: "نماذج اختبارات التفتيش",
          iconName: "FileText",
          contentSummary: "تحليل مواضيع مباراة التفتيش السابقة في ديداكتيك الرياضيات مع إبراز شبكات التقويم ورصد الأخطاء الشائعة.",
          customUrl: "https://profpressma.blogspot.com/p/didactique-primaire-inspection.html",
        },
        {
          id: "math_did_quiz",
          title: "اختبار تجريبي في الرياضيات",
          iconName: "Laptop",
          contentSummary: "اختبار تفاعلي يحاكي الوضعيات المشكلة الديداكتيكية مع التصحيح الفوري وتفسير المفاهيم.",
        },
      ],
    },

    // 4. ديداكتيك النشاط العلمي (12%)
    {
      id: "didactics_science",
      title: "ديداكتيك النشاط العلمي",
      weightBadge: "وزن المكون: 12%",
      colorScheme: "purple",
      actions: [
        {
          id: "sci_did_investigation",
          title: "نهج التقصي العلمي",
          iconName: "FlaskConical",
          contentSummary: "خطوات نهج التقصي (Démarche d'investigation): وضعية الانطلاق، تملك المشكل، صياغة الفرضيات، اختبار الفرضيات، والتعميم والتوثيق.",
          articleContent: `# نهج التقصي العلمي في تدريس النشاط العلمي بالابتدائي

يعتبر نهج التقصي العلمي النهج الديداكتيكي المحوري المعتمد في المنهاج الدراسي للنشاط العلمي بالتعليم الابتدائي بالمغرب:

## خطوات نهج التقصي الإجرائية:
1. **وضعية الانطلاق (Situation de départ):** حدث مثير أو ظاهرة واقعية تخلق خلخلة معرفية لدى المتعلم.
2. **تملك المشكلة وصياغة سؤال التقصي (Formulation du problème):** تحويل التساؤلات العفوية إلى سؤال علمي دقيق قابل للبحث.
3. **صياغة الفرضيات (Émission des hypothèses):** تقديم تفسيرات مؤقتة قائمة على تمثلات المتعلمين.
4. **اختبار الفرضيات (Vérification des hypothèses):** عبر التجريب، الملاحظة المباشرة، النمذجة، أو التوثيق والبحث البيبليوغرافي.
5. **التقاسم والمناقشة والتعميم (Institutionnalisation & Généralisation):** صياغة الاستنتاج المشترك وتسجيل الخلاصة في كراسة التقصي.
6. **التطبيق والتقويم (Évaluation et investissement):** توظيف المفهوم في مواقف جديدة.`,
          qcmQuestions: [
            {
              question: "في نهج التقصي العلمي، ما هي الأداة الأساسية التي يستعملها المتعلم لتدوين فرضياته ورسوماته وتجاربه العلمية طيلة مسار البحث؟",
              options: [
                "كتاب القراءة",
                "كراسة التقصي العلمي (دفتر التقصي)",
                "لوحة التلوين",
                "دفتر الملاحظات الإداري",
              ],
              correctIndex: 1,
              explanation: "كراسة التقصي (أو دفتر التقصي العلمي) هي الوثيقة الشخصية للمتعلم لتدوين مسار تفكيره وتجاربه وملاحظاته العلمية.",
              level: "ديداكتيك النشاط العلمي",
            },
          ],
        },
        {
          id: "sci_did_experiment",
          title: "التجريب والأدوات المخبرية",
          iconName: "Presentation",
          contentSummary: "المعينات الديداكتيكية البسيطة، تدبير المناولة التجريبية، شروط السلامة، وتجاوز عوائق التجريب داخل الفصول الدراسية.",
        },
        {
          id: "sci_did_concepts",
          title: "مجالات المنهاج العلمي",
          iconName: "Brain",
          contentSummary: "علوم الحياة والبيئة، العلوم الفيزيائية والكيميائية، علوم الأرض والفضاء، والتكنولوجيا ومشاريع الابتكار.",
        },
        {
          id: "sci_did_exams",
          title: "نماذج امتحانات النشاط العلمي",
          iconName: "FileText",
          contentSummary: "امتحانات سابقة في ديداكتيك النشاط العلمي لولوج مركز تكوين المفتشين مع شبكات التصحيح.",
          customUrl: "https://profpressma.blogspot.com/p/didactique-primaire-inspection.html",
        },
        {
          id: "sci_did_quiz",
          title: "اختبار تجريبي في التقصي",
          iconName: "Laptop",
          contentSummary: "اختبار تفاعلي لقياس التمكن من هندسة وضعيات التقصي العلمي وتصحيح التمثلات الخاطئة.",
        },
      ],
    },
  ],
  downloadFiles: [
    {
      id: "did_file_1",
      title: "دليل الديداكتيك الشامل لمفتش التعليم الابتدائي - الطبعة المعتمدة والمحينة (PDF)",
      size: "4.5 MB",
      year: "2024",
      url: "https://profpressma.blogspot.com/p/didactique-primaire-inspection.html",
      fileType: "pdf",
    },
    {
      id: "did_file_2",
      title: "أطر التخطيط والتدبير والتقويم الديداكتيكي بمدارس الريادة ومقاربة TaRL (PDF)",
      size: "3.8 MB",
      year: "2024",
      url: "https://profpressma.blogspot.com/p/didactique-primaire-inspection.html",
      fileType: "pdf",
    },
    {
      id: "did_file_3",
      title: "دليل نهج التقصي العلمي وتدريس مادة النشاط العلمي بالتعليم الابتدائي (PDF)",
      size: "2.9 MB",
      year: "2023",
      url: "https://profpressma.blogspot.com/p/didactique-primaire-inspection.html",
      fileType: "pdf",
    },
    {
      id: "did_file_4",
      title: "مجموعة امتحانات ديداكتيك مواد الابتدائي لولوج مركز التفتيش من 2012 إلى 2024 مع الحلول (PDF)",
      size: "8.2 MB",
      year: "شامل",
      url: "https://profpressma.blogspot.com/p/didactique-primaire-inspection.html",
      fileType: "pdf",
    },
  ],
  imageBanners: [
    {
      id: "did_img_1",
      title: "خطاطة النقل الديداكتيكي والعقد الديداكتيكي",
      imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
      caption: "مسار تحول المعرفة من المعرفة العالمة إلى المعرفة المستوعبة لدى المتعلم والعقد الديداكتيكي المؤطر.",
    },
    {
      id: "did_img_2",
      title: "مراحل التدريس الصريح للقراءة بالتعليم الابتدائي",
      imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80",
      caption: "النمذجة (أنا أفعل) -> الممارسة الموجهة (نحن نفعل) -> الممارسة المستقلة (أنت تفعل) -> التطبيق والتحويل.",
    },
    {
      id: "did_img_3",
      title: "خطوات نهج التقصي العلمي بالنشاط العلمي",
      imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80",
      caption: "وضعية الانطلاق -> سؤال التقصي -> الفرضيات -> الاختبار والتجريب -> التعميم والمأسسة.",
    },
  ],
};
