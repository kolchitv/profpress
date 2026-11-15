import type { ExplicitLessonItem } from "./explicitTeachingData";

/**
 * الدروس المحينة للتعليم الصريح ودعم طارل (TaRL) لباقي المستويات بالمدرسة الرائدة:
 * 1AEP, 2AEP, 3AEP, 4AEP, 5AEP والأقسام المشتركة (تحميل داخلي مباشر PDF / Word بدون أي روابط خارجية)
 */
export const ALL_REMAINING_LEVELS_EXPLICIT_TARL_LESSONS: ExplicitLessonItem[] = [
  // =========================================================================
  // المستوى الأول ابتدائي (1AEP) - العربية، الفرنسية، الرياضيات، النشاط العلمي + طارل
  // =========================================================================
  {
    id: "les_ar_1_1",
    level: "1aep",
    subject: "arabic",
    unit: 1,
    week: 1,
    internalOnly: true,
    isTarl: false,
    title: "القراءة المقطعية الصريحة: الصوت [م] والحركات القصيرة والطويلة (NE_AR_N1)",
    titleFr: "Lecture syllabique 1AEP : Le son [M] et les voyelles",
    objective:
      "أن يتعرف المتعلم سمعياً وبصرياً على حرف الميم مع الحركات القصيرة والطويلة والتنوين، ويقرأ مقاطع وكلمات مألوفة بطلاقة.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 45,
    keyConcepts: ["الوعي الصوتي", "المقطع", "حرف الميم", "التجزيء المقطعي", "الطلاقة"],
    steps: {
      preparation:
        "نشاط العزل الصوتي لكلمات تبتدئ بالصوت [م] (موز، مكتب، مدرسة، مركب) مع التصفيق عند سماع الصوت المستهدف، وإعلان الهدف ببساطة أمام التلاميذ.",
      modeling:
        "يعرض الأستاذ الحرف على السبورة وينطق المقاطع (مَ - مُ - مِ / ما - مو - مي) مع الإشارة الحركية المرافقة لكل حركة ومكان الحرف في أول ووسط وآخر الكلمة.",
      guided:
        "قراءة لوحة المقاطع بشكل إيقاعي جماعي بالتناوب، ثم دمج مقاطع لتكوين كلمات ثنائية وثلاثية على الألواح (مَرَمَ، رَما، داري).",
      autonomous:
        "إحاطة حرف الميم بخط مغلق وتجزيء كلمات مصورة إلى مقاطع في الكراسة، ثم التدرب على كتابته وفق المقاييس السليمة.",
      evaluation:
        "تسميع فردي سريع لبطاقات المقاطع الممزوجة ورصد غير المتمكنين لتوجيههم إلى ورشة التثبيت السريع.",
    },
    summaryPoints: [
      "ينطق الصوت [م] مع الفتحة (مَ)، الضمة (مُ)، والكسرة (مِ)، ويمتد مع الألف (ما)، الواو (مو)، والياء (مي).",
      "أشكال حرف الميم حسب موقعه: أول الكلمة (مـ)، وسط الكلمة (ـمـ)، وآخر الكلمة متصل أو منفصل (ـم / م).",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: الوعي الصوتي", content: "صور كلمات مألوفة تتضمن الصوت [م] في مواقع مختلفة." },
      { slideTitle: "الشريحة 2: لوحة المقاطع", content: "جدول الحرف مع الحركات القصيرة والطويلة والتنوين." },
      { slideTitle: "الشريحة 3: الدمج والقراءة", content: "بطاقات دمج مقطعين لقراءة كلمات بسيطة بطلاقة." },
    ],
    exercisesWithCorrection: [
      {
        question: "جزئ الكلمات الآتية إلى مقاطع صوتية: «مَدْرَسَةٌ» — «مِفْتاحٌ» — «قَلَمٌ».",
        answer: "مَدْ / رَ / سَ / ةٌ (4 مقاطع) | مِفْ / تا / حٌ (3 مقاطع) | قَ / لَ / مٌ (3 مقاطع).",
      },
    ],
  },
  {
    id: "les_ar_1_2",
    level: "1aep",
    subject: "arabic",
    unit: 2,
    week: 1,
    internalOnly: true,
    isTarl: true,
    title: "دعم طارل (TaRL العربية 1AEP): التعرف على الحروف والمقاطع والانطلاق في القراءة",
    titleFr: "Remédiation TaRL Arabe 1AEP : Lettres, syllabes et décodage",
    objective:
      "أن يربط المتعلم في مسار الدعم المكثف بين الحرف وصوته وحركته، ويدمج مقطعين فأكثر لقراءة كلمات مألوفة دون تهجئة متقطعة.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 45,
    keyConcepts: ["طارل TaRL", "لوحة الحروف", "سلال الكلمات", "الطلاقة الأولية", "الدمج"],
    steps: {
      preparation:
        "إحماء حركي سريع وقراءة إيقاعية جماعية لمدة 3 دقائق للوحة حروف الوحدة الأولى (د، م، ر، ب، س، ف) بالعصا المؤشرة.",
      modeling:
        "يجسد الأستاذ لعبة «عجلة المقاطع» بدمج حرفين متقاربين: (دا + ر = دار)، (با + ب = باب)، موضحاً بصوت مرتفع كيف تقرأ الكلمة دفعة واحدة.",
      guided:
        "منافسات الألواح الثنائية: ينطق الأستاذ مقطعاً ويكتبه المتعلمون مع الإشارة إلى لوحة الحروف لتسريع الاستحضار الذهني.",
      autonomous:
        "عمل في مجموعات صغرى عبر بطاقات الكلمات المتدرجة: قراءة قائمة من 8 كلمات بسيطة في دقيقة واحدة مع رصد التقدم.",
      evaluation:
        "اختبار فردي دقيقي باستخدام روائز طارل (مستوى الحرف ← مستوى المقطع ← مستوى الكلمة) لتحديث شبكة التموضع.",
    },
    summaryPoints: [
      "أنشطة طارل الأساسية للأول ابتدائي ترتكز على اللوحة الحرفية، سلال الكلمات، وبطاقات الصور المرمزة.",
      "الانتقال من التهجئة البطيئة إلى القراءة المباشرة يتم عبر تكرار قراءة مقاطع الكلمة متصلة.",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: اللوحة الإيقاعية", content: "شبكة الحروف الأساسية مع الحركات القصيرة." },
      { slideTitle: "الشريحة 2: مصنع الكلمات", content: "تركيب كلمات ثنائية وثلاثية انطلاقاً من البطاقات." },
    ],
    exercisesWithCorrection: [
      {
        question: "ركّب من المقاطع (سا / مـ / ر / بـ / دُ) ثلاث كلمات مفيدة واقرأها بصوت واضح.",
        answer: "مَدَرَ — دَرَسَ — سَمَرَ — بَدْرُ (أو: دارُ، سارَ، بابُ حسب بطاقات الحصة).",
      },
    ],
  },
  {
    id: "les_fr_1_1",
    level: "1aep",
    subject: "french",
    unit: 1,
    week: 2,
    internalOnly: true,
    isTarl: false,
    title: "Oral & Pré-lecture explicite 1AEP : Les voyelles [a, i, o] et l'acte de se présenter",
    titleFr: "Oral & Lecture explicite 1AEP : Saluer, se présenter et voyelles [a, i, o]",
    objective:
      "Saluer, se présenter en français (Bonjour, je m'appelle...) et identifier auditivement et visuellement les graphèmes a, i, o.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 45,
    keyConcepts: ["Acte de parole", "Voyelles a/i/o", "Graphisme", "Discrimination auditive"],
    steps: {
      preparation:
        "Accueil ritualisé en français avec gestes (« Bonjour les enfants ! ») et annonce claire de l'objectif de la séance.",
      modeling:
        "L'enseignant joue un court dialogue avec une marionnette : « Bonjour, je m'appelle Samir. Et toi ? », puis trace et prononce les voyelles [a], [i], [o] au tableau.",
      guided:
        "Jeu de « Pigeons vole » sonore : les élèves lèvent la main lorsqu'ils entendent [a] dans « ami, papa, table », puis reproduisent les dialogues en binômes.",
      autonomous:
        "Coloriage des dessins contenant le son [a] et traçage guidé des lignes courbes et du graphème « a » en cursive sur le cahier.",
      evaluation:
        "Chaque élève se présente brièvement à son camarade et entoure la lettre cible parmi un lot de lettres.",
    },
    summaryPoints: [
      "Pour saluer et se présenter : « Bonjour ! Je m'appelle... / Comment tu t'appelles ? ».",
      "Les premières voyelles clés : a (ami), i (midi), o (moto).",
    ],
    slidesOutline: [
      { slideTitle: "Slide 1 : Dialogue illustré", content: "Présentation des personnages dans la cour d'école." },
      { slideTitle: "Slide 2 : Chasse aux sons", content: "Repérage visuel et sonore des voyelles [a, i, o]." },
    ],
    exercisesWithCorrection: [
      {
        question: "Complète le dialogue : — Bonjour ! Comment tu t'appelles ? — Bonjour, je ............ Salma.",
        answer: "Bonjour, je m'appelle Salma.",
      },
    ],
  },
  {
    id: "les_math_1_1",
    level: "1aep",
    subject: "math",
    unit: 2,
    week: 1,
    internalOnly: true,
    isTarl: false,
    title: "الرياضيات الصريحة 1AEP: الأعداد من 0 إلى 20 — الجمع البسيط والحساب الذهني",
    titleFr: "Mathématiques explicites 1AEP : Nombres de 0 à 20 et addition simple",
    objective:
      "أن يقرأ المتعلم ويكتب الأعداد من 0 إلى 20 ويمثلها بالمكعبات والقضبان، وينجز عمليات جمع بسيط لمجموع لا يتجاوز 20.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 55,
    keyConcepts: ["العد", "العشرة والوحدات", "الجمع", "التمثيل المحسوس", "الحساب الذهني"],
    steps: {
      preparation:
        "حساب ذهني تصاعدي وتنازلي من 0 إلى 10 على الأصابع والبطاقات العددية خلال 5 دقائق.",
      modeling:
        "ينمذج الأستاذ تكوين العدد 14 باستعمال حزمة من 10 خشيبات + 4 وحدات منفردة، ثم يحسب (8 + 5) بإكمال العشرة: 8 + 2 = 10 ثم + 3 = 13.",
      guided:
        "يكوّن المتعلمون أعداداً من 11 إلى 19 على الألواح (عمود العشرات والوحدات) وينجزون جماعياً عمليتي (7 + 4) و(9 + 3).",
      autonomous:
        "إنجاز تمارين الربط وحساب المجاميع على كراسة التلميذ فردياً مع مراقبة وضعية القلم والكتابة العددية الصحيحة.",
      evaluation:
        "مسألة شفهية مصورة: لدى أمين 9 كرات وأضافت له أخته 4 كرات، كم كرة أصبحت لديه؟",
    },
    summaryPoints: [
      "كل عدد بين 11 و19 يتكون من عشرة واحدة (10) ووحدات (من 1 إلى 9).",
      "لجمع عددين مجموعهما يفوق 10 نكمل العشرة أولاً ثم نضيف الباقي (مثل: 9 + 5 = 9 + 1 + 4 = 14).",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: بناء العشرة", content: "تمثيل بصري لتجميع عشر وحدات في قضيب عشرة واحد." },
      { slideTitle: "الشريحة 2: استراتيجية إكمال العشرة", content: "خطاطة خطوة بخطوة لعمليات الجمع إلى 20." },
    ],
    exercisesWithCorrection: [
      {
        question: "احسب باستعمال إكمال العشرة: 9 + 6 = ..... | 8 + 4 = ..... | فكك العدد 17 = 10 + .....",
        answer: "9 + 6 = 15 | 8 + 4 = 12 | 17 = 10 + 7.",
      },
    ],
  },
  {
    id: "les_sci_1_1",
    level: "1aep",
    subject: "science",
    unit: 1,
    week: 1,
    internalOnly: true,
    isTarl: false,
    title: "النشاط العلمي الصريح 1AEP: الحواس الخمس واكتشاف المحيط (نهج التقصي)",
    titleFr: "Éveil Scientifique 1AEP : Les cinq sens et la découverte de l'environnement",
    objective:
      "أن يتعرف المتعلم على الحواس الخمس ويربط كل حاسة بالعضو المسؤول عنها وبوظيفتها في اكتشاف المحيط.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 45,
    keyConcepts: ["الحواس الخمس", "العضو الحسي", "الملاحظة", "الوقاية الحسية"],
    steps: {
      preparation:
        "عرض صور لأشياء مألوفة (زهرة، جرس، ليمونة، قطن ناعم، لوحة فنية) وسؤال التلاميذ كيف نتعرف على خصائصها.",
      modeling:
        "يشرح الأستاذ بوضوح على الشاشة: «أرى الألوان بعيني (حاسة البصر)، وأسمع الأصوات بأذني (السمع)، وأشم بالأنف، وأتذوق باللسان، وألمس بالجلد».",
      guided:
        "نشاط مطابقة جماعي على الألواح: يرفع التلاميذ رقم أو اسم الحاسة المناسبة عند عرض كل وضعية (رائحة العطر، صوت القطار، ملمس الثلج).",
      autonomous:
        "وصل كل عضو حسي بالصورة والوظيفة المناسبة له في الكراسة مع تلوين السلوكات الإيجابية لحماية الحواس.",
      evaluation:
        "اختبار تحقق شفوي وبصري سريع للتأكد من التمييز التام بين الأعضاء الحسية الخمسة وطرق الحفاظ على سلامتها.",
    },
    summaryPoints: [
      "الحواس الخمس هي: البصر (العين)، السمع (الأذن)، الشم (الأنف)، الذوق (اللسان)، واللمس (الجلد).",
      "نحافظ على حواسنا بتجنب الأضواء القوية والأصوات الصاخبة وتنظيف الأنف والعينين بانتظام.",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: وضعية الانطلاق", content: "مقارنة حواسنا عند تذوق ولمس ومشاهدة فاكهة." },
      { slideTitle: "الشريحة 2: جدول الحواس الخمس", content: "ربط العضو بالحاسة وبسلوكات الوقاية الصحية." },
    ],
    exercisesWithCorrection: [
      {
        question: "أكمل الفراغ: أستعمل حاسة ........... لتمييز طعم الملح عن السكر، وعضوها هو ............",
        answer: "حاسة الذوق، وعضوها هو اللسان.",
      },
    ],
  },

  // =========================================================================
  // المستوى الثاني ابتدائي (2AEP) - العربية، الفرنسية، الرياضيات، النشاط العلمي + طارل
  // =========================================================================
  {
    id: "les_ar_2_1",
    level: "2aep",
    subject: "arabic",
    unit: 1,
    week: 2,
    internalOnly: true,
    isTarl: false,
    title: "القراءة الصريحة والطلاقة 2AEP: تصفية الصعوبات القرائية (الشدة والمد والتنوين)",
    titleFr: "Lecture explicite 2AEP : Fluidité, gémination (Chadda) et Tanwin",
    objective:
      "أن يقرأ المتعلم كلمات وجُملاً متضمنة للشدة والتنوين واللام الشمسية والقمرية بطلاقة مع فهم المعنى السياقي.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 45,
    keyConcepts: ["الشدة", "التنوين", "اللام الشمسية والقمرية", "القراءة السليمة"],
    steps: {
      preparation:
        "تذكير سريع بأنواع التنوين الثلاثة والشدة كحرفين متماثلين (ساكن + متحرك) وقراءة لوحة كلمات إيقاعية.",
      modeling:
        "ينمذج الأستاذ تفكيك كلمة مشددة مثل «مُعَلِّمٌ» ← مُ / عَلْ / لِ / مٌ، ويبرز نغمة الضغط الصوتي على الحرف المشدد.",
      guided:
        "تصنيف كلمات معروضة إلى (لام شمسية / لام قمرية) على الألواح، وقراءة ثنائية لجمل قصيرة مع تتبع الأصبع واحترام علامات الترقيم.",
      autonomous:
        "قراءة فقرة من 4 أسطر فردياً وضبط أواخر الكلمات بالتنوين المناسب في بطاقة التمارين.",
      evaluation:
        "اختبار إملاء غير منظور على 3 كلمات تتضمن الشدة والتنوين واللام الشمسية لمعالجة أي تعثر فوري.",
    },
    summaryPoints: [
      "الحرف المشدد أصله حرفان: الأول ساكن والثاني متحرك (مثل: سَلَّمَ = سَـلْـلَـمَ).",
      "اللام الشمسية تكتب ولا تنطق ويأتي بعدها حرف مشدد (الشَّمس)، بينما اللام القمرية تكتب وتنطق ساكنة (القَمَر).",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: تفكيك الشدة", content: "تمثيل بصري لتحليل الحرف المشدد إلى حرفين." },
      { slideTitle: "الشريحة 2: قمرية أم شمسية؟", content: "مقارنة سمعية وبصرية مع أمثلة ملونة." },
    ],
    exercisesWithCorrection: [
      {
        question: "أدخل «ال» على الكلمات الآتية واضبطها بالشكل: «نَجْمٌ» — «بَيْتٌ» — «صَباحٌ».",
        answer: "النَّجْمُ (شمسية) | الْبَيْتُ (قمرية) | الصَّباحُ (شمسية).",
      },
    ],
  },
  {
    id: "les_fr_2_1",
    level: "2aep",
    subject: "french",
    unit: 2,
    week: 1,
    internalOnly: true,
    isTarl: false,
    title: "Lecture explicite 2AEP : Les sons complexes [ou], [on] et [oi]",
    titleFr: "Lecture explicite 2AEP : Graphèmes complexes [ou], [on], [oi]",
    objective:
      "Identifier, discriminer et lire avec fluidité les graphèmes complexes [ou], [on] et [oi] dans des syllabes et des mots simples.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 45,
    keyConcepts: ["Sons complexes", "Combinatoire", "Fluidité", "Dictée syllabique"],
    steps: {
      preparation:
        "Révision rapide des consonnes simples et voyelles sur le tableau syllabique (ma, mi, pa, po, la, li), puis annonce du défi du jour.",
      modeling:
        "L'enseignant montre comment deux lettres fusionnent pour créer un nouveau son : o+u = [ou] (poule), o+n = [on] (ballon), o+i = [oi] (voiture).",
      guided:
        "Lecture chorale des combinaisons : bou, mou, lou / bon, mon, ton / boi, moi, toi, suivie d'une dictée sur ardoise.",
      autonomous:
        "Entourer le mot correspondant à l'image et compléter 4 mots avec « ou », « on » ou « oi » sur le livret.",
      evaluation:
        "Lecture individuelle flash de 6 mots cibles pour vérifier l'automatisation du décodage.",
    },
    summaryPoints: [
      "o + u = [ou] comme dans « rouge, poule, loup ».",
      "o + n = [on] comme dans « bonbon, maison, ballon ».",
      "o + i = [oi] comme dans « poisson, étoile, trois ».",
    ],
    slidesOutline: [
      { slideTitle: "Slide 1 : Fusion des voyelles", content: "Animation visuelle des digrammes ou, on, oi." },
      { slideTitle: "Slide 2 : Mots illustrés", content: "Lecture de mots courants et phrases courtes." },
    ],
    exercisesWithCorrection: [
      {
        question: "Complète par « ou », « on » ou « oi » : un ball.... — une v....ture — une p....le.",
        answer: "un ballon — une voiture — une poule.",
      },
    ],
  },
  {
    id: "les_math_2_1",
    level: "2aep",
    subject: "math",
    unit: 3,
    week: 1,
    internalOnly: true,
    isTarl: false,
    title: "الرياضيات الصريحة 2AEP: الأعداد إلى 999 والجمع بالاحتفاظ والطرح بالمبادلة",
    titleFr: "Mathématiques explicites 2AEP : Nombres jusqu'à 999, addition avec retenue",
    objective:
      "أن يقرأ المتعلم الأعداد إلى 999 ويفككها إلى مئات وعشرات ووحدات، وينجز الوضع العمودي للجمع بالاحتفاظ والطرح السليم.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 55,
    keyConcepts: ["المئات", "جدول العد", "الجمع بالاحتفاظ", "المبادلة في الطرح", "الحساب الذهني"],
    steps: {
      preparation:
        "حساب ذهني (جمع عددين من رقم واحد وطرح العشرات الكاملة 70 - 30) على الألواح خلال 5 دقائق.",
      modeling:
        "ينمذج الأستاذ العملية 247 + 138 داخل جدول المنازل: وضع الوحدات تحت الوحدات، 7+8=15 (أكتب 5 وأحتفظ بـ 1 فوق العشرات)، ثم جمع العشرات (1+4+3=8)، ثم المئات (3) ← 385.",
      guided:
        "إنجاز مشترك لعمليتي 356 + 127 و 425 - 118 على الألواح مع التذكير الصريح بقاعدة الاستعارة/المبادلة عند الطرح.",
      autonomous:
        "إنجاز 4 عمليات وضعاً وإنجازاً عمودياً في دفتر التلميذ مع مسألة تطبيقية قصيرة.",
      evaluation:
        "تصويب أخطاء مقصودة على الشاشة (نسيان الاحتفاظ أو سوء المحاذاة العمودية) لترسيخ الضبط.",
    },
    summaryPoints: [
      "في الجمع العمودي نرتب الوحدات تحت الوحدات والعشرات تحت العشرات والمئات تحت المئات.",
      "إذا بلغ مجموع عمود 10 أو أكثر نكتب الوحدات ونحتفظ بالعشرة فوق العمود الموالي يساراً.",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: جدول المئات والعشرات", content: "تفكيك 345 = 300 + 40 + 5." },
      { slideTitle: "الشريحة 2: خوارزمية الاحتفاظ", content: "عرض مرقم لخطوات الجمع العمودي بالاحتفاظ." },
    ],
    exercisesWithCorrection: [
      {
        question: "ضع وأنجز عمودياً: 468 + 275 = ..... | 542 - 127 = .....",
        answer: "468 + 275 = 743 | 542 - 127 = 415.",
      },
    ],
  },
  {
    id: "les_math_2_tarl",
    level: "2aep",
    subject: "math",
    unit: 1,
    week: 1,
    internalOnly: true,
    isTarl: true,
    title: "دعم طارل (TaRL الرياضيات 2AEP): ترسيخ جدول العد والجمع والطرح الذهني",
    titleFr: "Remédiation TaRL Maths 2AEP : Numération, addition et soustraction",
    objective:
      "أن يتجاوز المتعلم صعوبات قراءة الأعداد من رقمين وثلاثة أرقام، وينفذ الجمع والطرح البسيط والاحتفاظ بثقة.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 45,
    keyConcepts: ["طارل الرياضيات", "المجموعات بالحزم", "الطرح الذهني", "المضاعفات"],
    steps: {
      preparation:
        "لعبة التصفيق العددي: قراءة بطاقات أعداد من رقمين عشوائياً وسؤال التلاميذ عن رقم العشرات ورقم الوحدات.",
      modeling:
        "يشرح الأستاذ باستعمال النقود المدرسية (أوراق 100 و 10 وقطع 1 درهم) كيفية مبادلة عشرة دراهم بعشر قطع لتسهيل الطرح.",
      guided:
        "ورشة ثنائية: تمثيل أعداد متفق عليها بأوراق 10 و 1 وحل تحديات جمع وطرح سريعة على اللوحة.",
      autonomous:
        "بطاقة تمارين متدرجة من 3 مستويات: الجمع دون احتفاظ، الجمع باحتفاظ واحد، ومقارنة الأعداد (<، >، =).",
      evaluation:
        "رصد سريع لمدى تمكن كل تلميذ من المستوى العددي المطلوب للانتقال إلى مستوى أعلى في طارل.",
    },
    summaryPoints: [
      "فهم القيمة المكانية (1 عشرة = 10 وحدات) هو المفتاح الأساسي لإتقان الجمع بالاحتفاظ والطرح.",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: لعبة النقود", content: "تمثيل الأعداد بقطع 1 وعشرات 10 ومئات 100." },
      { slideTitle: "الشريحة 2: التحديات الذهنية", content: "سلسلة حساب سريع بالمضاعفات والمتمم إلى 100." },
    ],
    exercisesWithCorrection: [
      {
        question: "رتب تناقصياً الأعداد: 209 — 920 — 290 — 902.",
        answer: "920 > 902 > 290 > 209.",
      },
    ],
  },
  {
    id: "les_sci_2_1",
    level: "2aep",
    subject: "science",
    unit: 2,
    week: 1,
    internalOnly: true,
    isTarl: false,
    title: "النشاط العلمي الصريح 2AEP: حالات المادة (الصلب والسائل والغازي) والتنفس",
    titleFr: "Éveil Scientifique 2AEP : Les états de la matière (solide, liquide, gaz)",
    objective:
      "أن يميز المتعلم بين الأجسام الصلبة والسائلة والغازية اعتماداً على خصائصها الظاهرة (الشكل الخاص والمسك باليد).",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 45,
    keyConcepts: ["الحالة الصلبة", "الحالة السائلة", "الحالة الغازية", "خصائص المادة"],
    steps: {
      preparation:
        "عرض قارورة ماء، قطعة خشب، وبالون مملوء بالهواء، وطرح سؤال التقصي: «بماذا تختلف هذه الأشياء عن بعضها؟».",
      modeling:
        "ينمذج الأستاذ التجربة أمام التلاميذ: الخشب يحتفظ بشكله (صلب)، الماء يأخذ شكل الإناء ويسيل (سائل)، الهواء يملأ البالون ولا نمسكه (غاز).",
      guided:
        "تصنيف بطاقات مواد يومية (حليب، حجر، زيت، بخار الماء، سكر، قلم) على السبورة التفاعلية.",
      autonomous:
        "ملء جدول التصنيف في الكراسة وتحديد الحالة الفيزيائية للماء عند التجميد والتسخين.",
      evaluation:
        "بطاقة تحقق سريع من 3 جمل صحيح/خطأ لتثبيت مفهوم أن المساحيق كالرمل والسكر أجسام صلبة غير متماسكة.",
    },
    summaryPoints: [
      "الجسم الصلب له شكل خاص ويمكن مسكه بالأصابع (مثل الخشب والحجر).",
      "الجسم السائل ليس له شكل خاص، يأخذ شكل الإناء الذي يوضع فيه وجريانه مستمر (الماء، الزيت).",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: ملاحظة حالات الماء", content: "جليد صلب، ماء سائل، وبخار غازي." },
      { slideTitle: "الشريحة 2: جدول الخصائص", content: "مقارنة الشكل الخاص والقابلية للمسك." },
    ],
    exercisesWithCorrection: [
      {
        question: "صنف المواد الآتية إلى صلبة وسائلة وغازية: العصير، الممحاة، الهواء، قطعة الثلج.",
        answer: "صلبة: الممحاة، قطعة الثلج | سائلة: العصير | غازية: الهواء.",
      },
    ],
  },

  // =========================================================================
  // المستوى الثالث ابتدائي (3AEP) - العربية، الفرنسية، الرياضيات، النشاط العلمي + طارل
  // =========================================================================
  {
    id: "les_ar_3_1",
    level: "3aep",
    subject: "arabic",
    unit: 1,
    week: 1,
    internalOnly: true,
    isTarl: false,
    title: "الظواهر اللغوية الصريحة 3AEP: أقسام الكلمة والجملة الفعلية والاسمية",
    titleFr: "Langue explicite 3AEP : Classes de mots et types de phrases arabes",
    objective:
      "أن يصنف المتعلم الكلمة إلى اسم وفعل وحرف، ويميز بين الجملة الفعلية (فعل + فاعل) والجملة الاسمية (مبتدأ + خبر).",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 45,
    keyConcepts: ["الاسم", "الفعل", "الحرف", "الجملة الفعلية", "الجملة الاسمية"],
    steps: {
      preparation:
        "عرض 3 بطاقات ملونة (الصديق، كتبَ، في) وسؤال التلاميذ عن الفرق بين الكلمات الثلاث وعلاقتها بالمعنى والزمن.",
      modeling:
        "ينمذج الأستاذ اختبارات التمييز: «الاسم يقبل ال أو التنوين (كتابٌ)»، «الفعل يدل على عمل مقترن بزمن (قرأ، يقرأ)»، «الحرف يربط الكلمات (إلى، من، على)».",
      guided:
        "تصنيف كلمات فقرة قصيرة إلى جدول (اسم / فعل / حرف) على الألواح، وتحويل جمل اسمية إلى فعلية والعكس بالتشاور الثنائي.",
      autonomous:
        "إنجاز تطبيق كتابي فردي: تحديد نوع 5 جمل وإكمال كل جملة بالفاعل أو الخبر المناسب.",
      evaluation:
        "تحقق جماعي سريع برفع بطاقة (ف) للجملة الفعلية و(س) للاسمية مع تصحيح التعثرات فورياً.",
    },
    summaryPoints: [
      "تنقسم الكلمة في اللغة العربية إلى ثلاثة أقسام: اسم (يدل على إنسان/حيوان/نبات/جماد)، فعل (حدث في زمن)، وحرف (أداة ربط).",
      "الجملة الفعلية تبدأ بفعل (تفتحتِ الأزهارُ)، والجملة الاسمية تبدأ باسم (الأزهارُ متفتحةٌ).",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: مثلث أقسام الكلمة", content: "أمثلة واضحة وعلامات تمييز الاسم عن الفعل." },
      { slideTitle: "الشريحة 2: التحويل بين الجمل", content: "نماذج تطبيقية لتحويل الجملة الاسمية إلى فعلية." },
    ],
    exercisesWithCorrection: [
      {
        question: "حوّل الجملة الاسمية الآتية إلى جملة فعلية: «التلميذُ المجتهدُ يراجعُ دروسَهُ».",
        answer: "يراجعُ التلميذُ المجتهدُ دروسَهُ.",
      },
    ],
  },
  {
    id: "les_ar_3_tarl",
    level: "3aep",
    subject: "arabic",
    unit: 2,
    week: 1,
    internalOnly: true,
    isTarl: true,
    title: "دعم طارل (TaRL العربية 3AEP): قراءة الفقرات بطلاقة وفهم الأسئلة الصريحة والكتابة",
    titleFr: "Remédiation TaRL Arabe 3AEP : Lecture de paragraphes et compréhension",
    objective:
      "أن يقرأ المتعلم فقرة من 40 إلى 60 كلمة دون تلعثم ويجيب عن 3 أسئلة فهم مباشر ويكوّن فقرة قصيرة من 3 جمل.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 45,
    keyConcepts: ["طارل طلاب الفقرات", "سرعة القراءة", "ربط الجمل", "الإملاء الموجه"],
    steps: {
      preparation:
        "قراءة تحمية لبطاقات الكلمات البصرية الشائعة (هذا، التي، عندما، بينما، ثم) لرفع سلاسة الربط.",
      modeling:
        "يقرأ الأستاذ فقرة قصيرة موضحاً الوقف عند الفاصلة والنقطة، وكيفية العثور على جواب السؤال داخل السطر بوضع سطر تحته.",
      guided:
        "قراءة متكررة في ثنائيات (القراءة مع القرين) مع احتساب عدد الكلمات السليمة في الدقيقة الواحدة.",
      autonomous:
        "قراءة نص قصير من 5 أسطر، الإجابة كتابة عن سؤالين مباشرين، وترتيب 4 جمل مبعثرة لتكوين حكاية منسجمة.",
      evaluation:
        "تقييم مستوى الطلاقة الفردي وتسجيل النتائج في شبكة تتبع طارل الأسبوعية.",
    },
    summaryPoints: [
      "قراءة المقطع بصوت مسموع ثم وصل الكلمات يضمن الفهم التام لمضمون الفقرة.",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: استراتيجية تسطير الجواب", content: "ربط كلمات السؤال بمثيلاتها في الفقرة." },
      { slideTitle: "الشريحة 2: بناء الفقرة", content: "استخدام أدوات الربط (و، فـ، ثم) لإنتاج 3 جمل متماسكة." },
    ],
    exercisesWithCorrection: [
      {
        question: "رتب الجمل لتكوين فقرة مفيدة: (سقاها بالماء — غرس أمين شجرة — فنمت وأورقت).",
        answer: "غرس أمين شجرةً، وسقاها بالماء، فنمتْ وأورقتْ.",
      },
    ],
  },
  {
    id: "les_fr_3_1",
    level: "3aep",
    subject: "french",
    unit: 2,
    week: 1,
    internalOnly: true,
    isTarl: false,
    title: "Langue explicite 3AEP : La phrase, le nom, le déterminant et les verbes Être/Avoir",
    titleFr: "Grammaire & Conjugaison 3AEP : Nom, déterminant et Être/Avoir au présent",
    objective:
      "Identifier le nom et son déterminant (le, la, les, un, une, des) et conjuguer correctement être et avoir au présent.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 45,
    keyConcepts: ["Phrase", "Nom et déterminant", "Être et Avoir", "Présent de l'indicatif"],
    steps: {
      preparation:
        "Rappel de la phrase (commence par une majuscule, finit par un point et a un sens). Annonce de l'objectif linguistique.",
      modeling:
        "L'enseignant entoure les déterminants devant les noms au tableau (le cartable, une trousse) et modélise la conjugaison de « être » et « avoir » au présent.",
      guided:
        "Exercices sur ardoise : associer le bon déterminant au nom et compléter des phrases avec « est / sont » ou « a / ont ».",
      autonomous:
        "Réalisation individuelle de 2 exercices dans le cahier d'activités : souligner le nom et conjuguer être/avoir.",
      evaluation:
        "Vérification immédiate via 3 mini-phrases projetées et correction ciblée des confusions « est / et ».",
    },
    summaryPoints: [
      "Le déterminant accompagne toujours le nom : un/une/des (indéfinis), le/la/l'/les (définis).",
      "Être au présent : je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont.",
      "Avoir au présent : j'ai, tu as, il/elle a, nous avons, vous avez, ils/elles ont.",
    ],
    slidesOutline: [
      { slideTitle: "Slide 1 : Nom et Déterminant", content: "Tableaux masculin/féminin et singulier/pluriel." },
      { slideTitle: "Slide 2 : Être et Avoir", content: "Tableau complet de conjugaison au présent avec exemples." },
    ],
    exercisesWithCorrection: [
      {
        question: "Complète par « suis, es, est » ou « ai, as, a » : Je ...... élève en 3AEP et j'...... un beau livre.",
        answer: "Je suis élève en 3AEP et j'ai un beau livre.",
      },
    ],
  },
  {
    id: "les_math_3_1",
    level: "3aep",
    subject: "math",
    unit: 1,
    week: 2,
    internalOnly: true,
    isTarl: false,
    title: "الرياضيات الصريحة 3AEP: الضرب في عدد من رقم واحد ورقمين بالاحتفاظ والأعداد إلى 9999",
    titleFr: "Mathématiques explicites 3AEP : Multiplication par 1 et 2 chiffres avec retenue",
    objective:
      "أن يتقن المتعلم التقنية الاعتيادية للضرب في عدد من رقم واحد ورقمين مع تدبير الاحتفاظ وحل وضعيات مسألة.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 55,
    keyConcepts: ["الضرب", "جدول الضرب", "التقنية الاعتيادية", "الاحتفاظ", "الوحدات والعشرات"],
    steps: {
      preparation:
        "حساب ذهني سريع (ضرب أعداد في 3 و4 و6 و7 على الألواح خلال 5 دقائق) وإعلان الهدف الصريح للدرس.",
      modeling:
        "ينمذج الأستاذ العملية 24 × 3 والعملية 35 × 12: أولاً أضرب الوحدات، أكتب الناتج وأحتفظ جانباً، ثم أضع نقطة/صفراً أسفل الوحدات عند ضرب رقم العشرات وأجمع السطرين.",
      guided:
        "ينجز المتعلمون العملية 36 × 4 ثم 42 × 13 على الألواح خطوة بخطوة مع مراقبة نسيان صفر الإزاحة أو إضافة الاحتفاظ.",
      autonomous:
        "إنجاز 4 عمليات ضرب متدرجة في دفتر القسم، تليها مسألة تطبيقية لحساب ثمن عدة كتب.",
      evaluation:
        "مسألة سريعة: اشترت المدرسة 4 صناديق من الأقلام في كل صندوق 25 قلماً، احسب مجموع الأقلام.",
    },
    summaryPoints: [
      "عند الضرب في عدد من رقم واحد نضرب الوحدات ثم العشرات فالمئات مع إضافة الاحتفاظ بعد كل جداء لا قبله.",
      "عند الضرب في عدد من رقمين نضع نقطة أو (0) في منزلة الوحدات للسطر الثاني ثم نجمع السطرين.",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: خطوات الضرب بالاحتفاظ", content: "تمثيل بصري لترتيب الأرقام والاحتفاظ الجانبي." },
      { slideTitle: "الشريحة 2: الضرب في رقمين", content: "إبراز نقطة الإزاحة تحت الوحدات بلون مميز." },
    ],
    exercisesWithCorrection: [
      {
        question: "أنجز عمودياً: 145 × 6 = ..... | 34 × 25 = .....",
        answer: "145 × 6 = 870 | 34 × 25 = 850 (170 + 680).",
      },
    ],
  },
  {
    id: "les_sci_3_1",
    level: "3aep",
    subject: "science",
    unit: 2,
    week: 1,
    internalOnly: true,
    isTarl: false,
    title: "النشاط العلمي الصريح 3AEP: الخلائط وطرق فصلها والمغناطيس (نهج التقصي)",
    titleFr: "Éveil Scientifique 3AEP : Mélanges, séparation et magnétisme",
    objective:
      "أن يميز المتعلم بين الخليط المتجانس والخليط غير المتجانس، ويطبق طرائق الفصل المناسبة (التصفيق، الترشيح، الفرز المغناطيسي).",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 45,
    keyConcepts: ["خليط متجانس", "خليط غير متجانس", "الترشيح", "التصفيق", "المغناطيس"],
    steps: {
      preparation:
        "عرض كأس ماء به ملح وكأس ماء به رمل، وسؤال التلاميذ: «هل نستطيع تمييز مكونات كل كأس بالعين المجردة؟».",
      modeling:
        "يعرض الأستاذ نماذج عملية للتجربة: الماء والملح خليط متجانس، الماء والرمل خليط غير متجانس يُفصل بالترشيح عبر ورق الترشيح أو بالتصفيق.",
      guided:
        "تجربة جماعية لتحديد المواد التي يجذبها المغناطيس (الحديد، الفولاذ) وفصل برادة الحديد عن الرمل.",
      autonomous:
        "إنجاز بطاقة الملاحظة والاستنتاج في الكراسة وربط كل خليط بطريقة فصله المناسبة.",
      evaluation:
        "سؤال تحقق سريع: كيف تفصل خليط الماء والزيت؟ وماذا نسمي هذا الخليط؟",
    },
    summaryPoints: [
      "الخليط المتجانس لا يمكن تمييز مكوناته بالعين المجردة (ماء + سكر).",
      "الخليط غير المتجانس يمكن تمييز مكوناته بالعين (ماء + زيت، ماء + تراب) ويُفصل بالتصفيق أو الترشيح.",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: أنواع الخلائط", content: "مقارنة بصرية بين المحلول المتجانس وغير المتجانس." },
      { slideTitle: "الشريحة 2: مختبر الفصل", content: "خطاطة مراحل الترشيح والتصفيق والفرز بالمغناطيس." },
    ],
    exercisesWithCorrection: [
      {
        question: "أذكر التقنية المناسبة لفصل: (1) الماء والتراب — (2) مسامير الحديد والرمل.",
        answer: "(1) التصفيق أو الترشيح | (2) الفرز بواسطة المغناطيس.",
      },
    ],
  },

  // =========================================================================
  // المستوى الرابع ابتدائي (4AEP) - العربية، الفرنسية، الرياضيات، النشاط العلمي + طارل
  // =========================================================================
  {
    id: "les_ar_4_1",
    level: "4aep",
    subject: "arabic",
    unit: 1,
    week: 1,
    internalOnly: true,
    isTarl: false,
    title: "القراءة الصريحة 4AEP: استراتيجيات المفردات (خريطة الكلمة وشبكة المفردات)",
    titleFr: "Lecture explicite 4AEP : Stratégies de vocabulaire et compréhension",
    objective:
      "أن يوظف المتعلم استراتيجية خريطة الكلمة وشبكة المفردات وعائلة الكلمة لفهم معاني النصوص وتحديد أفكارها بدقة.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 45,
    keyConcepts: ["خريطة الكلمة", "المرادف", "الضد", "نوع الكلمة", "شبكة المفردات"],
    steps: {
      preparation:
        "عرض كلمة مألوفة على السبورة وتذكير المتعلمين بأن فهم المفردة داخل السياق هو مفتاح القراءة الفاهمة، مع التصريح بالهدف.",
      modeling:
        "يختار الأستاذ كلمة «اكتشف»، ويعرض التفكير بصوت مسموع: «نوعها فعل، مرادفها عرف أو استطلع، ضدها جهل، وأركبها في جملة تامة المعنى».",
      guided:
        "تقديم كلمة جديدة «ابتهاج»؛ يحدد التلاميذ النوع على الألواح، ثم المرادف والضد وتكوين جملة ثنائية بالتشاور.",
      autonomous:
        "فتح كراسة المتعلم لإنجاز خريطة كلمة «شغف» وشبكة مفردات «مغربية» بشكل فردي خلال 7 دقائق.",
      evaluation:
        "عرض سؤال سريع لاختيار الضد الصحيح لكلمة «شغف» مع تصحيح جماعي وتسجيل نسب التمكن.",
    },
    summaryPoints: [
      "خريطة الكلمة تضم 4 عناصر: النوع (اسم/فعل/حرف)، المرادف، الضد، والتركيب في جملة مفيدة.",
      "شبكة المفردات تضم الكلمات التي تنتمي إلى الحقل الدلالي نفسه.",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: خطاطة خريطة الكلمة", content: "نموذج منظم بأربعة فروع واضحة." },
      { slideTitle: "الشريحة 2: تطبيق سياقي", content: "استنتاج معاني كلمات من فقرة نص ثقافي." },
    ],
    exercisesWithCorrection: [
      {
        question: "أنجز خريطة كلمة «إبداع» واستخرج 4 كلمات من شبكة مفردات «التراث».",
        answer: "«إبداع»: اسم | المرادف: ابتكار، تجديد | الضد: تقليد | الجملة: يتميز الصانع المغربي بالإبداع. شبكة «التراث»: زليج، فسيفساء، قصبة، فخار.",
      },
    ],
  },
  {
    id: "les_ar_4_2",
    level: "4aep",
    subject: "arabic",
    unit: 2,
    week: 1,
    internalOnly: true,
    isTarl: true,
    title: "التراكيب والإملاء الصريح + طارل 4AEP: الفاعل والمفعول به والهمزة المتوسطة",
    titleFr: "Langue & TaRL Arabe 4AEP : Sujet, COD et Hamza médiane",
    objective:
      "أن يحدد المتعلم الفاعل المرفوع والمفعول به المنصوب في الجملة الفعلية ويرسم الهمزة المتوسطة على الواو والياء والألف بشكل سليم.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 50,
    keyConcepts: ["الفاعل", "المفعول به", "الهمزة المتوسطة", "سلم الحركات", "طارل"],
    steps: {
      preparation:
        "مراجعة أركان الجملة الفعلية، ثم عرض سلم قوة الحركات الإملائية (الكسرة ← الضمة ← الفتحة ← السكون).",
      modeling:
        "ينمذج الأستاذ إعراب «رسمَ الفنانُ لوحةً» بالسؤال «من رسم؟ ← الفنانُ (فاعل مرفوع)» و«ماذا رسم؟ ← لوحةً (مفعول به منصوب)»، ثم يطبق قاعدة أقوى الحركتين في «مُؤْمِن» و«فَأْس» و«بِئْر».",
      guided:
        "إملاء موجه على الألواح لـ 5 كلمات بهمزة متوسطة مع تعليل اختيار الحرف الحامل للهمزة جماعياً.",
      autonomous:
        "تمارين فردية لاستخراج الفاعل والمفعول به من نص قصير وملء الفراغات بالهمزة المتوسطة المناسبة.",
      evaluation:
        "تصحيح فوري لفقرة إملائية قصيرة وتشخيص أخطاء الرسم الإملائي لإلحاقها بحصة دعم طارل.",
    },
    summaryPoints: [
      "الفاعل اسم مرفوع يدل على من قام بالفعل، والمفعول به اسم منصوب يدل على من وقع عليه الفعل.",
      "لرسم الهمزة المتوسطة نقارن حركتها بحركة ما قبلها ونرسمها على الحرف الذي يناسب الحركة الأقوى (الكسرة > الضمة > الفتحة > السكون).",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: أركان الجملة الفعلية", content: "أمثلة ملونة: الفعل + الفاعل + المفعول به." },
      { slideTitle: "الشريحة 2: سلم قوة الحركات", content: "قاعدة الهمزة المتوسطة مع نماذج مقارنة." },
    ],
    exercisesWithCorrection: [
      {
        question: "أعرب: «قرأَ الطالبُ قصةً» | صحح كتابة الهمزة: (مَسْءَلَة — سُءال — بِءر).",
        answer: "قرأ: فعل ماض مبني على الفتح | الطالبُ: فاعل مرفوع بالضمة | قصةً: مفعول به منصوب بالفتحة. الإملاء: مسألة، سؤال، بئر.",
      },
    ],
  },
  {
    id: "les_fr_4_1",
    level: "4aep",
    subject: "french",
    unit: 1,
    week: 1,
    internalOnly: true,
    isTarl: false,
    title: "Grammaire explicite 4AEP : La phrase verbale, la phrase nominale et l'accord S-V",
    titleFr: "Grammaire explicite 4AEP : Phrase verbale / nominale et accord sujet-verbe",
    objective:
      "Distinguer la phrase verbale de la phrase nominale, transformer de l'une à l'autre et accorder le verbe avec son sujet.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 45,
    keyConcepts: ["Verbe conjugué", "Phrase nominale", "Transformation", "Accord Sujet-Verbe"],
    steps: {
      preparation:
        "Rappel de la définition d'une phrase (sens, majuscule, point). Annonce claire de l'objectif du cours.",
      modeling:
        "L'enseignant lit 2 phrases : « Le train arrive. » et « Arrivée du train. » et verbalise : présence d'un verbe conjugué = phrase verbale ; absence = phrase nominale.",
      guided:
        "Affichage de 4 phrases au tableau : les élèves lèvent l'ardoise (V ou N) puis transforment ensemble une phrase verbale en nominale.",
      autonomous:
        "Réalisation individuelle de deux exercices sur le cahier (classification et transformation de 4 phrases).",
      evaluation:
        "Mini-bilan sur ardoise : transformer « Le vent souffle fort. » en phrase nominale et accorder « Les enfants (jouer) ».",
    },
    summaryPoints: [
      "La phrase verbale est construite autour d'un verbe conjugué (Ex. : Les élèves lisent le texte).",
      "La phrase nominale ne contient pas de verbe conjugué ; son noyau est un nom (Ex. : Lecture du texte / Quelle belle journée !).",
    ],
    slidesOutline: [
      { slideTitle: "Slide 1 : Comparaison directe", content: "Tableau comparatif phrase verbale vs phrase nominale." },
      { slideTitle: "Slide 2 : Nominalisation", content: "Exemples de transformation verbe → nom d'action." },
    ],
    exercisesWithCorrection: [
      {
        question: "Transforme en phrase nominale : « On construit une nouvelle école. » | Accorde : « Les oiseaux (chanter) ». ",
        answer: "Construction d'une nouvelle école. | Les oiseaux chantent.",
      },
    ],
  },
  {
    id: "les_math_4_1",
    level: "4aep",
    subject: "math",
    unit: 2,
    week: 1,
    internalOnly: true,
    isTarl: false,
    title: "الرياضيات الصريحة 4AEP: الأعداد الكبيرة والقسمة الإقليدية (المضبوطة وغير المضبوطة)",
    titleFr: "Mathématiques explicites 4AEP : Grands nombres et division euclidienne",
    objective:
      "أن يقرأ المتعلم ويفكك الأعداد إلى 999 999 وينجز القسمة الإقليدية لمقسوم من 3 أرقام على مقسوم عليه من رقم واحد مع التحقق من الباقي.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 55,
    keyConcepts: ["المقسوم", "المقسوم عليه", "الخارج", "الباقي", "الملايين وفصل الآلاف"],
    steps: {
      preparation:
        "حساب ذهني: ترديد مضاعفات الأعداد وقسمات ذهنية بسيطة (48 ÷ 6، 35 ÷ 5، 72 ÷ 8) خلال 5 دقائق.",
      modeling:
        "ينمذج الأستاذ قسمة 437 ÷ 3 خطوة بخطوة: تحديد عدد أرقام الخارج، قسمة المئات ثم إنزال العشرات فالآحاد، والتحقق بالمتساوية: المقسوم = (المقسوم عليه × الخارج) + الباقي.",
      guided:
        "ينفذ المتعلمون على الألواح قسمة 258 ÷ 4 ويشاركون في التحقق من أن الباقي أصغر دائماً من المقسوم عليه.",
      autonomous:
        "إنجاز 3 عمليات قسمة إقليدية ومسألة تقاسم بالتساوي في الدفتر الفردي.",
      evaluation:
        "اختبار تحقق سريع لتصحيح خطأ شائع يتمثل في التوقف قبل إنزال جميع الأرقام أو نسيان الصفر في الخارج.",
    },
    summaryPoints: [
      "المتساوية المميزة للقسمة الإقليدية: D = (d × q) + r حيث يكون الباقي (r) أصغر قطعا من المقسوم عليه (d).",
      "لقراءة الأعداد الكبيرة نقسمها إلى فصول من ثلاثة أرقام انطلاقاً من اليمين (فصل الوحدات البسيطة ثم فصل الآلاف).",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: خطوات القسمة الإقليدية", content: "مثال محلول خطوة بخطوة بالألوان (أقسم، أضرب، أطرح، أنزل)." },
      { slideTitle: "الشريحة 2: المتساوية والتحقق", content: "أمثلة للتحقق السريع من صحة الخارج والباقي." },
    ],
    exercisesWithCorrection: [
      {
        question: "أنجز القسمة الإقليدية للعدد 527 على 4 واكتب المتساوية المميزة لها.",
        answer: "الخارج = 131 والباقي = 3 | المتساوية: 527 = (4 × 131) + 3 (بما أن 3 < 4).",
      },
    ],
  },
  {
    id: "les_sci_4_1",
    level: "4aep",
    subject: "science",
    unit: 1,
    week: 1,
    internalOnly: true,
    isTarl: false,
    title: "النشاط العلمي الصريح 4AEP: تغيرات المادة (الذوبان والانصهار والتجمد) NE_ES_N4",
    titleFr: "Éveil Scientifique 4AEP : Changements d'état de la matière",
    objective:
      "أن يميز المتعلم بين التحولات الفيزيائية القابلة للانعكاس (الانصهار والتجمد والتبخر) والتحولات الكيميائية عبر نهج التقصي.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 45,
    keyConcepts: ["الانصهار", "التجمد", "التحول الانعكاسي", "درجة الحرارة", "نهج التقصي"],
    steps: {
      preparation:
        "طرح سؤال الانطلاق عبر شرائح العرض: «لماذا تتحول قطعة الثلج إلى ماء سائل عندما نتركها خارج المبرد؟» وإعلان الهدف.",
      modeling:
        "ينمذج الأستاذ الفرق بين حالتي المادة الصلبة والسائلة عبر رسوم تخطيطية مبرزاً أثر ارتفاع الحرارة (الانصهار) وانخفاضها (التجمد).",
      guided:
        "تصنيف أمثلة يومية (ذوبان الزبدة، تجمد الماء، صدأ الحديد، احتراق الورق) ثنائياً وعلى الألواح إلى تحول فيزيائي أو كيميائي.",
      autonomous:
        "إنجاز نشاط الربط والاستنتاج في كراسة النشاط العلمي فردياً خلال 8 دقائق.",
      evaluation:
        "بطاقة تحقق سريعة لتمييز التحولات الفيزيائية القابلة للانعكاس عن التحولات الكيميائية التي تنتج مواد جديدة.",
    },
    summaryPoints: [
      "الانصهار (من صلب إلى سائل)، التجمد (من سائل إلى صلب)، والتبخر تحولات فيزيائية قابلة للانعكاس ولا تغير طبيعة المادة.",
      "احتراق الخشب أو صدأ الحديد تحول كيميائي غير انعكاسي يغير طبيعة المادة.",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: دورة تحولات الماء", content: "رسم توضيحي للانصهار والتجمد والتبخر والتكاثف." },
      { slideTitle: "الشريحة 2: فيزيائي أم كيميائي؟", content: "مقارنة بين ذوبان الشمع واحتراق الفتيل." },
    ],
    exercisesWithCorrection: [
      {
        question: "صنف التحولات التالية: (تجمّد العصير — صدأ مسمار حديدي — انصهار الشوكولاتة — احتراق الخشب).",
        answer: "تحولات فيزيائية: تجمد العصير، انصهار الشوكولاتة | تحولات كيميائية: صدأ مسمار حديدي، احتراق الخشب.",
      },
    ],
  },

  // =========================================================================
  // المستوى الخامس ابتدائي (5AEP) - العربية، الفرنسية، الرياضيات، النشاط العلمي + طارل
  // =========================================================================
  {
    id: "les_ar_5_1",
    level: "5aep",
    subject: "arabic",
    unit: 1,
    week: 1,
    internalOnly: true,
    isTarl: false,
    title: "الظواهر اللغوية الصريحة 5AEP: الفعل المجرد والمزيد والنواسخ الفعلية والحرفية",
    titleFr: "Langue explicite 5AEP : Verbe nu/augmenté et Kana / Inna",
    objective:
      "أن يميز المتعلم بين الفعل المجرد والفعل المزيد ويستخرج حروف الزيادة، ويوظف النواسخ الفعلية والحرفية توظيفاً صحيحاً.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 50,
    keyConcepts: ["المجرد والمزيد", "حروف الزيادة سألتمونيها", "كان وأخواتها", "إن وأخواتها"],
    steps: {
      preparation:
        "استحضار حروف الزيادة المجموعة في كلمة «سألتمونيها» ومراجعة ركني الجملة الاسمية (المبتدأ والخبر).",
      modeling:
        "ينمذج الأستاذ إرجاع الفعل إلى الماضي مع «هو» لتحديد أصله: «يستخرجون ← استخرجَ ← خرجَ (ثلاثي مزيد بثلاثة أحرف: أ، س، ت)»، ثم يعرض أثر «كان» (ترفع المبتدأ وتنصب الخبر) وعكسها «إنّ».",
      guided:
        "تحليل أفعال وأمثلة جمل اسمية على الألواح: إدخال «أصبح» ثم «لعل» على جملة «الجوُّ معتدلٌ» مع ضبط الأواخر بالشكل التام.",
      autonomous:
        "تطبيق كتابي فردي يتضمن جدولاً لتجريد الأفعال المزيدة وتمارين شكل وإعراب للنواسخ.",
      evaluation:
        "بطاقة تقويم فورية من 3 جمل للكشف عن التباس عمل النواسخ الفعلية بالحرفية.",
    },
    summaryPoints: [
      "الفعل المجرد ما كانت جميع حروفه أصلية في الماضي مع الضمير «هو» (كتب، دحرج)، والمزيد ما زيد فيه حرف أو أكثر من حروف «سألتمونيها».",
      "النواسخ الفعلية (كان، صار، أصبح، ظل...) ترفع الأول وتنصب الثاني؛ والنواسخ الحرفية (إنّ، أنّ، كأنّ، لكنّ، ليت، لعلّ) تنصب الأول وترفع الثاني.",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: خطوات معرفة المجرد والمزيد", content: "إسناد للماضي مع هو ← حذف الضمائر ← استخراج الزيادة." },
      { slideTitle: "الشريحة 2: مقارنة كان وأخواتها مع إنّ وأخواتها", content: "مخطط علامات الرفع والنصب في الجملتين." },
    ],
    exercisesWithCorrection: [
      {
        question: "أدخل «ظلّ» ثم «ليت» على الجملة «المتعلمونَ مجتهدونَ» مع الشكل التام.",
        answer: "ظلَّ المتعلمونَ مجتهدينَ (رفع بالواو ونصب بالياء) | ليتَ المتعلمينَ مجتهدونَ (نصب بالياء ورفع بالواو).",
      },
    ],
  },
  {
    id: "les_fr_5_1",
    level: "5aep",
    subject: "french",
    unit: 2,
    week: 1,
    internalOnly: true,
    isTarl: false,
    title: "Langue explicite 5AEP : Les compléments COD / COI et le Passé Composé",
    titleFr: "Grammaire & Conjugaison 5AEP : COD / COI et Passé composé",
    objective:
      "Distinguer le COD du COI dans la phrase verbale et conjuguer correctement les verbes usuels au passé composé avec être et avoir.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 50,
    keyConcepts: ["COD", "COI", "Passé composé", "Auxiliaire être/avoir", "Accord du participe passé"],
    steps: {
      preparation:
        "Rappel des notions de sujet et de verbe conjugué, suivi d'une courte mise en situation sur l'expression d'actions passées.",
      modeling:
        "L'enseignant pose les questions clés après le verbe : « quoi ? / qui ? → COD » (Il lit un livre) et « à qui ? / de quoi ? → COI » (Il parle à son ami). Puis il montre la règle d'accord du participe passé avec l'auxiliaire être.",
      guided:
        "Identification collective sur ardoise des compléments et transformation de 3 phrases du présent au passé composé.",
      autonomous:
        "Exercices individuels : souligner et nommer COD/COI dans un petit paragraphe, et accorder 5 verbes au passé composé.",
      evaluation:
        "Correction commentée ciblant l'accord du participe passé avec le sujet féminin/pluriel derrière « être ».",
    },
    summaryPoints: [
      "Le COD complète directement le verbe sans préposition (question : qui ? / quoi ?).",
      "Le COI est introduit par une préposition comme « à » ou « de » (question : à qui ? / à quoi ? / de qui ? / de quoi ?).",
      "Avec l'auxiliaire « être » au passé composé, le participe passé s'accorde en genre et en nombre avec le sujet.",
    ],
    slidesOutline: [
      { slideTitle: "Slide 1 : Questions clés COD / COI", content: "Arbre de décision visuel avec exemples concrets." },
      { slideTitle: "Slide 2 : Accord au Passé composé", content: "Tableau des participes passés et règle de l'auxiliaire être." },
    ],
    exercisesWithCorrection: [
      {
        question: "Indique COD ou COI et conjugue au passé composé : « Nadia (arriver) tôt et elle (préparer) le repas à sa mère. »",
        answer: "Nadia est arrivée tôt (accord -e avec être) et elle a préparé le repas (COD) à sa mère (COI).",
      },
    ],
  },
  {
    id: "les_math_5_1",
    level: "5aep",
    subject: "math",
    unit: 2,
    week: 1,
    internalOnly: true,
    isTarl: false,
    title: "الرياضيات الصريحة 5AEP: الأعداد الكسرية — الجمع والطرح وتوحيد المقامات والضرب",
    titleFr: "Mathématiques explicites 5AEP : Fractions, dénominateur commun et opérations",
    objective:
      "أن يوحد المتعلم مقامي عددين كسريين ويحسب مجموعهما أو فرقهما ويختزل النتيجة إلى أقصى حد ممكن.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 55,
    keyConcepts: ["الكسور", "توحيد المقامات", "المضاعف المشترك الأصغر", "الجمع والطرح", "الاختزال"],
    steps: {
      preparation:
        "حساب ذهني: تحويل أعداد كسرية متكافئة (1/2 = 2/4 = 3/6) وإعلان الهدف الصريح للحصة.",
      modeling:
        "ينمذج الأستاذ حساب (1/3 + 2/5): إيجاد المقام المشترك (15)، ضرب البسطين والمقامين، جمع البسطين مع الحفاظ على المقام الموحد، ثم الاختزال عند الإمكان.",
      guided:
        "إنجاز جماعي لعملية طرح (3/4 - 1/2) على الألواح مع مناقشة أسباب الخطأ الشائع المتمثل في طرح المقامات.",
      autonomous:
        "إنجاز 4 عمليات متنوعة (جمع وطرح مع الاختزال) ومسألة حول تقسيم أرض زراعية.",
      evaluation:
        "مسألة وضعية مشكلة سريعة لقياس الأثر وتحديد المستفيدين من ورشة الدعم المندمج.",
    },
    summaryPoints: [
      "لجمع أو طرح عددين كسريين مختلفي المقام نوحد مقاميهما أولاً ثم نجمع أو نطرح البسطين ونحتفظ بالمقام الموحد.",
      "لا نختزل أو نجمع المقامات أبداً؛ نختزل الناتج النهائي بقسمة البسط والمقام على أكبر قاسم مشترك.",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: التمثيل الشريطي لتوحيد المقامات", content: "رسم هندسي يوضح تساوي 1/2 مع 2/4." },
      { slideTitle: "الشريحة 2: خطوات الجمع والطرح والاختزال", content: "تطبيق عملي بالتمثيل الرقمي والاختزال." },
    ],
    exercisesWithCorrection: [
      {
        question: "احسب واختزل النتيجة: (5/6 + 1/3) — (7/8 - 1/4).",
        answer: "5/6 + 2/6 = 7/6 | 7/8 - 2/8 = 5/8.",
      },
    ],
  },
  {
    id: "les_math_5_tarl",
    level: "5aep",
    subject: "math",
    unit: 1,
    week: 1,
    internalOnly: true,
    isTarl: true,
    title: "دعم طارل (TaRL الرياضيات 5AEP): تثبيت العمليات الأربع والأعداد العشرية وحل المسائل",
    titleFr: "Remédiation TaRL Maths 5AEP : 4 opérations, décimaux et résolution de problèmes",
    objective:
      "أن يضبط المتعلم العمليات الأربع على الأعداد الصحيحة والعشرية ويمتلك منهجية اختيار العملية المناسبة في المسائل.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 50,
    keyConcepts: ["طارل الرياضيات", "محاذاة الفاصلة", "القسمة على رقمين", "منهجية حل المسائل"],
    steps: {
      preparation:
        "بطاقات حساب ذهني سريع: ضرب وقسمة الأعداد العشرية في 10 و100 و1000 على الألواح.",
      modeling:
        "يوضح الأستاذ قاعدة محاذاة الفاصلة تحت الفاصلة في الجمع والطرح العشري مع إكمال الفراغات بالأصفار، ثم ينمذج تفكيك مسألة إلى معطيات ومطلوب ومخطط شريطي.",
      guided:
        "حل جماعي لمسألتين في مجموعات: الأولى تتطلب الضرب ثم الطرح، والثانية القسمة على 12.",
      autonomous:
        "سلسلة تدريبات فردية في العمليات الأربع ومشكلة حياتية حول الفاتورة والباقي.",
      evaluation:
        "رصد سريع لمعدل الإنجاز الصحيح لتحديث بطاقة تموضع طارل.",
    },
    summaryPoints: [
      "في جمع وطرح الأعداد العشرية، نضع الفاصلة تحت الفاصلة، والجزء الصحيح تحت الجزء الصحيح.",
      "لحساب جداء عددين عشريين، ننجز الضرب كأنهما صحيحان ثم نضع الفاصلة حسب مجموع الأرقام بعد الفاصلة في العاملين.",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: قاعدة الفاصلة", content: "مقارنة المحاذاة في الجمع مقابل حساب الرتب في الضرب." },
      { slideTitle: "الشريحة 2: خطوات حل المسألة", content: "القراءة ← استخراج المعطيات ← التمثيل ← الحساب ← التحقق." },
    ],
    exercisesWithCorrection: [
      {
        question: "ضع وأنجز: 45,7 + 8,35 = ..... | 12,4 × 3,5 = .....",
        answer: "45,70 + 8,35 = 54,05 | 12,4 × 3,5 = 43,40 (أو 43,4).",
      },
    ],
  },
  {
    id: "les_sci_5_1",
    level: "5aep",
    subject: "science",
    unit: 1,
    week: 1,
    internalOnly: true,
    isTarl: false,
    title: "النشاط العلمي الصريح 5AEP: الهضم والتنفس والدوران والتربة (نهج التقصي)",
    titleFr: "Éveil Scientifique 5AEP : Digestion, respiration et qualité du sol",
    objective:
      "أن يصف المتعلم أعضاء الجهاز الهضمي والتنفسي والدوراني ووظائفها، ويدرك أهمية حماية التربة من التلوث والتعرية.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 45,
    keyConcepts: ["الجهاز الهضمي", "التبادلات الغازية", "الدوران الدموي", "خصوبة التربة"],
    steps: {
      preparation:
        "عرض رسم تخطيطي صامت للجهاز الهضمي ومسار الهواء أثناء الشهيق والزفير وطرح فرضيات أولية.",
      modeling:
        "يشرح الأستاذ مسار الطعام (الفم ← المريء ← المعدة ← الأمعاء) ومسار الأكسجين نحو الرئتين فالدم لتزويد أعضاء الجسم بالطاقة.",
      guided:
        "عمل ثنائي على الألواح: تسمية 5 أعضاء رئيسية وتفسير أسباب تسارع نبضات القلب عند الجري.",
      autonomous:
        "كتابة خلاصة مركزة في الكراسة وتحديد 3 عوامل تحمي التربة الزراعية من الانجراف.",
      evaluation:
        "اختبار تقويمي مصور لربط كل وظيفة حيوية بأعضائها المسؤولة.",
    },
    summaryPoints: [
      "الهضم يحوّل الأغذية إلى مواد قيت بسيطة تمر إلى الدم عبر جدار المعي الدقيق.",
      "يتكون الجهاز الدوراني من القلب والأوعية الدموية (شرايين وأوردة وشعيرات) التي توزع الدم والأكسجين.",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: رحلة اللقمة والأكسجين", content: "خريطة مبسطة للجهازين الهضمي والتنفسي." },
      { slideTitle: "الشريحة 2: حماية التربة", content: "مكونات التربة الصالحة للزراعة وطرق مكافحة التعرية." },
    ],
    exercisesWithCorrection: [
      {
        question: "أين يتم امتصاص مواد القيت لتنتقل إلى الدم؟ وما العضو الذي يضخ الدم في الجسم؟",
        answer: "يتم الامتصاص في المعي الدقيق، والقلب هو المضخة التي تدفع الدم إلى جميع أنحاء الجسم.",
      },
    ],
  },

  // =========================================================================
  // الأقسام المشتركة / الفريدة (Shared Multigrade Classes)
  // =========================================================================
  {
    id: "les_shared_ar_1",
    level: "shared",
    subject: "arabic",
    unit: 1,
    week: 1,
    internalOnly: true,
    isTarl: true,
    title: "التدبير الصريح للقسم المشترك (العربية + طارل): التناوب بين الاشتغال الذاتي والنمذجة",
    titleFr: "Gestion explicite classe multiniveaux : Lecture et écriture en autonomie alternée",
    objective:
      "أن يدبر الأستاذ حصة القراءة أو الظواهر اللغوية بين مستويين مشتركين بتوجيه مباشر لإحدى الفئتين واشتغال مستقل موثق للفئة الثانية.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 55,
    keyConcepts: ["القسم المشترك", "الزمن التناوبي", "الاشتغال المستقل", "مجموعات طارل"],
    steps: {
      preparation:
        "إطلاق العمل المشترك للسبورتين وتحديد قواعد الهدوء والإشارات الصامتة، وإعلان أهداف المستويين في دقيقة واحدة.",
      modeling:
        "المستوى الأول (تعلّم مباشر): نمذجة مهارة القراءة أو الظاهرة، بينما ينجز المستوى الثاني نشاط تثبيت مبرمج في كراسة الدعم المستقل.",
      guided:
        "عكس التناوب بعد 15 دقيقة: انتقال الأستاذ لنمذجة الفئة الثانية وتوجيهها، مقابل اشتغال الفئة الأولى على الممارسة الموجهة في الألواح أو البطاقات.",
      autonomous:
        "توحيد النشاط التطبيقي في كراسات المتعلمين مع تدخل الأستاذ الفردي لدعم المتعثرين من الفئتين.",
      evaluation:
        "تجميع المخرجات في آخر 8 دقائق عبر تصحيح مشترك ورصد التقدم لكل مجموعة تحكم.",
    },
    summaryPoints: [
      "نجاح القسم المشترك يعتمد على تحضير بطاقات عمل مستقل واضحة لا تتطلب تدخلاً مستمراً للأستاذ.",
      "تقسيم المتعلمين في حصص طارل يكون حسب مستوى التمكن لا حسب السن أو القسم الإداري.",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: خطاطة توزيع الـ 55 دقيقة", content: "مؤقت بصري يوضح لحظات العمل المباشر والمستقل." },
      { slideTitle: "الشريحة 2: لوحة المهام الصامتة", content: "رموز مرجعية للتلميذ عندما ينهي نشاطه مبكراً." },
    ],
    exercisesWithCorrection: [
      {
        question: "كيف تستثمر أنشطة طارل لتقليص الفوارق داخل قسم يضم مستويين مشتركين؟",
        answer: "عبر تمرير رائز الموضعة الموحد، ثم تفويج القسم إلى 3 مجموعات مرنة (الحروف/الكلمات/الفقرات) مع بطاقات متدرجة.",
      },
    ],
  },
  {
    id: "les_shared_math_1",
    level: "shared",
    subject: "math",
    unit: 2,
    week: 1,
    internalOnly: true,
    isTarl: false,
    title: "التدبير الصريح للرياضيات بالقسم المشترك: الحساب الذهني الموحد والوضعيات المتدرجة",
    titleFr: "Maths explicites en classe multiniveaux : Calcul mental commun et différenciation",
    objective:
      "أن يقود الأستاذ حصة حساب ذهني مشتركة ثم يوزع تمارين الحساب والهندسة المتدرجة وفق حاجات كل مستوى.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 55,
    keyConcepts: ["الحساب الذهني المشترك", "التمييز الديداكتيكي", "الألواح", "مسائل متدرجة"],
    steps: {
      preparation:
        "5 دقائق حساب ذهني موحد (المكمل إلى 10 للمستوى الأدنى والمكمل إلى 100 أو الجداء للمستوى الأعلى باستعمال نفس البطاقة).",
      modeling:
        "نمذجة المفهوم الأساسي المشترك (مثل المحيط أو التقنية العمودية) وتفريع درجة الصعوبة حسب كل مستوى.",
      guided:
        "تمارين متوازية على الألواح: نفس الوضعية بأعداد مناسبة لكل فئة وتصحيح فوري متزامن.",
      autonomous:
        "إنجاز بطاقتين متمايزتين (بطاقة أ + بطاقة ب) مع توفر مفاتيح التصحيح الذاتي.",
      evaluation:
        "تحدي ختامي سريع على الألواح لقياس تحقق هدفي المستويين معاً.",
    },
    summaryPoints: [
      "توحيد الموضوع الرياضياتي (الجمع، الضرب، المحيط...) مع تدرج مستوى الأعداد يقلص زمن الانتقال ويحقق فعالية كبيرة في الأقسام المشتركة.",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: بطاقات التمييز", content: "نموذج بطاقة بمستويي صعوبة للدرس نفسه." },
    ],
    exercisesWithCorrection: [
      {
        question: "صمم نشاطاً موحداً في الجمع لمستويين (الثاني والثالث) داخل الحصة نفسها.",
        answer: "الجمع العمودي باحتفاظ: المستوى الثاني يجمع أعداداً من رقمين (<100)، والمستوى الثالث أعداداً من ثلاثة أرقام (<9999).",
      },
    ],
  },
  {
    id: "les_math_1_tarl",
    level: "1aep",
    subject: "math",
    unit: 1,
    week: 2,
    internalOnly: true,
    isTarl: true,
    title: "دعم طارل (TaRL الرياضيات 1AEP): التعرف على الأرقام من 0 إلى 99 والجمع بالخشيبات",
    titleFr: "Remédiation TaRL Maths 1AEP : Nombres 0-99 et calcul concret",
    objective:
      "أن يتعرف المتعلم على الأعداد من رقم واحد ورقمين باستعمال الخشيبات والمكعبات وينجز عمليات جمع بسيطة دون تعثر.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 45,
    keyConcepts: ["طارل الرياضيات", "الخشيبات", "قراءة الأعداد", "الجمع البسيط"],
    steps: {
      preparation: "لعبة التعداد التصاعدي الجماعي من 1 إلى 20 مع الحركات اليدوية.",
      modeling: "يمثل الأستاذ العدد 23 بحزمتين من 10 خشيبات و3 خشيبات مفردة أمام التلاميذ.",
      guided: "تمثيل أعداد ينطقها الأستاذ على الألواح وتفكيكها إلى عشرات ووحدات بالتشاور الثنائي.",
      autonomous: "إنجاز بطاقة حساب فردية تضم 5 عمليات جمع بسيطة ومقارنة الأعداد.",
      evaluation: "تمرير رائز طارل الفردي السريع لقراءة الأعداد وتسجيل التقدم.",
    },
    summaryPoints: [
      "كل حزمة مكونة من 10 خشيبات تساوي عشرة واحدة (10)، وكتابة العشرات تكون على اليسار.",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: لعبة الخشيبات", content: "تمثيل الأعداد المحسوس إلى حدود 99." },
    ],
    exercisesWithCorrection: [
      {
        question: "فكك إلى عشرات ووحدات: 34 = ..... + ..... | 58 = ..... + .....",
        answer: "34 = 30 + 4 | 58 = 50 + 8.",
      },
    ],
  },
  {
    id: "les_fr_2_tarl",
    level: "2aep",
    subject: "french",
    unit: 1,
    week: 2,
    internalOnly: true,
    isTarl: true,
    title: "Remédiation TaRL Français 2AEP : Roue des syllabes, décodage et mots usuels",
    titleFr: "Remédiation TaRL Français 2AEP : Combinatoire et lecture de mots simples",
    objective:
      "Associer consonnes et voyelles pour décoder rapidement des syllabes simples (CV) et lire des mots bissyllabiques courants.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 45,
    keyConcepts: ["TaRL Français", "Roue des syllabes", "Décodage CV", "Fluidité"],
    steps: {
      preparation: "Chant des voyelles (a, e, i, o, u, y) et pointage rapide sur le tableau phonétique TaRL.",
      modeling: "L'enseignant assemble devant la classe : m+a = ma, l+i = li, r+o = ro, puis lit : ma-ma, mi-di, ro-bo.",
      guided: "Jeu de la roue des syllabes en binômes : un élève pointe, l'autre lit en moins de 3 secondes.",
      autonomous: "Activité individuelle sur fiche TaRL : relier 6 mots aux images et copier 3 syllabes dictées.",
      evaluation: "Test individuel flash TaRL (niveau lettre / syllabe / mot).",
    },
    summaryPoints: [
      "La combinatoire directe (Consonne + Voyelle) permet de lire sans épeler lettre par lettre.",
    ],
    slidesOutline: [
      { slideTitle: "Slide 1 : Grille syllabique TaRL", content: "Tableau croisé m, l, r, t, p, s avec a, i, o, u, e." },
    ],
    exercisesWithCorrection: [
      {
        question: "Assemble les syllabes pour lire 3 mots : (ta + pi) — (sa + la + de) — (mi + di).",
        answer: "tapi — salade — midi.",
      },
    ],
  },
  {
    id: "les_math_3_tarl",
    level: "3aep",
    subject: "math",
    unit: 2,
    week: 2,
    internalOnly: true,
    isTarl: true,
    title: "دعم طارل (TaRL الرياضيات 3AEP): إتقان الطرح بالاستلاف وجدول الضرب في 2 و3 و4 و5",
    titleFr: "Remédiation TaRL Maths 3AEP : Soustraction avec retenue et tables de 2 à 5",
    objective:
      "أن يتغلب المتعلم على أخطاء الطرح بالاستلاف ويستثمر الجمع المتكرر والمصفوفات لحفظ جداول الضرب 2 إلى 5.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 45,
    keyConcepts: ["طارل الرياضيات", "الطرح بالاستلاف", "الجمع المتكرر", "جدول الضرب"],
    steps: {
      preparation: "منافسة حساب ذهني في الجداءات الأساسية (3×4، 5×6، 2×9) عبر الألواح.",
      modeling: "ينمذج الأستاذ الطرح 403 - 157 بوضوح (الاستعارة والمبادلة) ويمثل 4 × 5 بـ 4 صفوف من 5 أقراص.",
      guided: "تمارين موجهة في مجموعات طارل حول الطرح بالاستلاف وإكمال سلاسل المضاعفات.",
      autonomous: "بطاقة تمارين فردية متدرجة مع شبكة التصحيح الذاتي.",
      evaluation: "اختبار قياس التمكن الفردي في 3 دقائق.",
    },
    summaryPoints: [
      "عندما يكون رقم الوحدات في المطروح منه أصغر من المطروح، نضيف 10 وحدات مقابل مبادلة 1 عشرة.",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: استلاف العشرات", content: "رسم بصري للمبادلة عند الطرح مع الصفر." },
    ],
    exercisesWithCorrection: [
      {
        question: "أنجز عمودياً: 312 - 148 = ..... | 6 × 4 = .....",
        answer: "312 - 148 = 164 | 6 × 4 = 24.",
      },
    ],
  },
  {
    id: "les_math_4_tarl",
    level: "4aep",
    subject: "math",
    unit: 1,
    week: 2,
    internalOnly: true,
    isTarl: true,
    title: "دعم طارل (TaRL الرياضيات 4AEP): تثبيت القسمة الإقليدية والمسائل ذات الخطوتين",
    titleFr: "Remédiation TaRL Maths 4AEP : Division euclidienne et problèmes à deux étapes",
    objective:
      "أن يتجاوز المتعلم صعوبات إنجاز القسمة على رقم واحد ويميز متى يختار الضرب أو القسمة في وضعيات مشكلة.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 50,
    keyConcepts: ["طارل الرياضيات", "القسمة", "تحديد العملية", "التمثيل الشريطي"],
    steps: {
      preparation: "تحدي المضاعفات والقسمة الذهنية البسيطة (36 ÷ 4، 45 ÷ 9، 56 ÷ 7).",
      modeling: "يمثل الأستاذ مسألة توزيع بالتساوي عبر أشرطة متساوية الأجزاء لاختيار القسمة.",
      guided: "إنجاز ثنائي لقسمتين مع التحقق بالضرب وإضافة الباقي.",
      autonomous: "حل مسألتين من خطوتين في البطاقة الفردية.",
      evaluation: "رائز طارل السريع في العمليات الأربع لتحديث مجموعة التلميذ.",
    },
    summaryPoints: [
      "القسمة تعبّر عن توزيع كمية بالتساوي أو البحث عن عدد الحصص المتساوية.",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: التمثيل الشريطي", content: "تمييز مسائل الضرب عن مسائل القسمة." },
    ],
    exercisesWithCorrection: [
      {
        question: "وزعت أستاذة 146 قلماً بالتساوي على 6 مجموعات، كم قلماً أخذت كل مجموعة وكم بقي؟",
        answer: "146 = (6 × 24) + 2 ← أخذت كل مجموعة 24 قلماً وبقي قلمان.",
      },
    ],
  },
  {
    id: "les_fr_5_tarl",
    level: "5aep",
    subject: "french",
    unit: 1,
    week: 2,
    internalOnly: true,
    isTarl: true,
    title: "Remédiation TaRL Français 5AEP : Lecture expressive d'un récit et production de paragraphe",
    titleFr: "Remédiation TaRL Français 5AEP : Compréhension de récits et écriture guidée",
    objective:
      "Lire un récit court avec fluidité, répondre aux questions (Qui ? Où ? Quand ? Quoi ?) et rédiger un paragraphe de 5 phrases.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 50,
    keyConcepts: ["TaRL Français", "Compréhension", "Connecteurs temporels", "Rédaction guidée"],
    steps: {
      preparation: "Lecture collective rythmée des connecteurs : d'abord, ensuite, puis, enfin.",
      modeling: "L'enseignant lit un récit de 60 mots et remplit la fiche des 4 questions (Qui, Où, Quand, Quoi) devant les élèves.",
      guided: "Remise en ordre en binômes de 4 phrases d'une histoire courte à l'aide des connecteurs.",
      autonomous: "Rédaction guidée d'un court récit de 4 à 5 phrases à partir d'une banque de mots.",
      evaluation: "Évaluation par grille simple (majuscule, point, temps du verbe, cohérence).",
    },
    summaryPoints: [
      "Un récit bien structuré répond aux questions : Qui ? Quand ? Où ? Qu'est-ce qui s'est passé ?",
    ],
    slidesOutline: [
      { slideTitle: "Slide 1 : Carte du récit", content: "Schéma visuel des 4 questions de compréhension." },
    ],
    exercisesWithCorrection: [
      {
        question: "Relie ces 3 actions avec « D'abord, Ensuite, Enfin » : il écrit sa lettre / il ouvre son cahier / il relit son travail.",
        answer: "D'abord, il ouvre son cahier. Ensuite, il écrit sa lettre. Enfin, il relit son travail.",
      },
    ],
  },
  {
    id: "les_shared_fr_1",
    level: "shared",
    subject: "french",
    unit: 1,
    week: 2,
    internalOnly: true,
    isTarl: true,
    title: "Gestion explicite Français Multiniveaux : Oral commun et ateliers de lecture différenciés",
    titleFr: "Français explicite classe multiniveaux : Oral partagé et lecture différenciée",
    objective:
      "Animer un acte de langage commun aux deux niveaux puis basculer sur des fiches de décodage (niveau A) et de compréhension (niveau B).",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 45,
    keyConcepts: ["Classe multiniveaux", "Différenciation", "Autonomie guidée", "TaRL"],
    steps: {
      preparation: "Mise en situation orale commune à partir d'un même poster thématique (5 min).",
      modeling: "Prise en charge directe du groupe A (syllabes/mots) pendant que le groupe B lit silencieusement le texte et relève les mots connus.",
      guided: "Inversion : l'enseignant questionne le groupe B sur le sens tandis que le groupe A réalise l'exercice de copie.",
      autonomous: "Production autonome adaptée sur fiche avec boîte à outils visible au mur.",
      evaluation: "Restitution orale finale croisée entre les deux niveaux.",
    },
    summaryPoints: [
      "Un support visuel commun permet de lancer les deux niveaux ensemble tout en différenciant l'écrit.",
    ],
    slidesOutline: [
      { slideTitle: "Slide 1 : Emploi du temps alterné", content: "Organisation des 45 minutes entre groupe A et groupe B." },
    ],
    exercisesWithCorrection: [
      {
        question: "Comment adapter un même texte pour deux niveaux en classe partagée ?",
        answer: "Le niveau inférieur lit uniquement les phrases surlignées et relie mots/images ; le niveau supérieur répond aux questions de compréhension et rédige une phrase.",
      },
    ],
  },
  {
    id: "les_shared_sci_1",
    level: "shared",
    subject: "science",
    unit: 1,
    week: 2,
    internalOnly: true,
    isTarl: false,
    title: "نهج التقصي العلمي في القسم المشترك: الملاحظة والتجريب وتدوين الاستنتاج المتدرج",
    titleFr: "Éveil Scientifique en classe multiniveaux : Démarche d'investigation partagée",
    objective:
      "أن يدبر الأستاذ وضعية تقصٍّ مشتركة حول موضوع بيئي أو فيزيائي مع صياغة خلاصتين متدرجتين حسب المستوى الدراسي.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 45,
    keyConcepts: ["القسم المشترك", "نهج التقصي", "الفرضيات", "المناولة", "الاستنتاج المتدرج"],
    steps: {
      preparation: "ملاحظة ظاهرة طبيعية أو تجربة مشتركة واحدة للجميع (دورة الماء أو إنبات البذرة).",
      modeling: "تدوين فرضيات التلاميذ وتنفيذ المناولة التجريبية أمام القسم بكامله.",
      guided: "مناقشة النتائج: المستوى الأدنى يصف الملاحظات شفهياً وبالرسوم، والمستوى الأعلى يصوغ التفسير العلمي.",
      autonomous: "ملء كراسة التلميذ: تلوين وربط للمستوى الأدنى، وإكمال فقرة علمية للمستوى الأعلى.",
      evaluation: "تقويم ختامي مشترك عبر سؤال تطبيقي لكل فئة.",
    },
    summaryPoints: [
      "النشاط العلمي في القسم المشترك يقبل توحيد التجربة والمناولة، مع تفريق مستوى الإنتاج الكتابي والاستنتاج.",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: التجربة الموحدة", content: "خطاطة خطوات التقصي المشتركة في الفوجين." },
    ],
    exercisesWithCorrection: [
      {
        question: "ما هي الخطوات الأربع الكبرى التي يشترك فيها جميع مستويات القسم المشترك أثناء حصة النشاط العلمي؟",
        answer: "وضعية الانطلاق ← صياغة الفرضيات ← المناولة والتقصي ← التعميم والاستنتاج.",
      },
    ],
  },
];

