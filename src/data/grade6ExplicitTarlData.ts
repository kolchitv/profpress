import type { ExplicitLessonItem } from "./explicitTeachingData";

export const GRADE6_EXPLICIT_TARL_LESSONS: ExplicitLessonItem[] = [
  // =========================================================================
  // 1. اللغة العربية - المستوى السادس (التعليم الصريح + دعم طارل)
  // =========================================================================
  {
    id: "les_ar_6_1",
    level: "6aep",
    subject: "arabic",
    unit: 1,
    week: 1,
    internalOnly: true,
    isTarl: false,
    title: "القراءة الصريحة وفهم المقروء: استراتيجيات ما قبل القراءة وشبكة المفردات (حضارات كونية)",
    titleFr: "Lecture explicite 6AEP : Stratégies de compréhension et vocabulaire",
    objective:
      "أن يوظف المتعلم استراتيجيات القراءة الصريحة (التوقع، شبكة المفردات، خريطة الكلمة، وتلخيص الأفكار الأساسية) لفهم نصوص الوحدة الأولى بدقة.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 45,
    keyConcepts: ["خريطة الكلمة", "شبكة المفردات", "عائلة الكلمة", "الفكرة المحورية", "التعليم الصريح"],
    steps: {
      preparation:
        "تنشيط المكتسبات حول معالم الحضارات القديمة (مصر، بابل، المغرب والأندلس)، وصياغة الهدف التعلمي بوضوح: «سنتمكن اليوم من استثمار استراتيجيات المفردات وفهم الأفكار الصريحة والضمنية في النص القرائي».",
      modeling:
        "ينمذج الأستاذ بصوت مرتفع كيفية تفكيك عنوان النص والصورة لبناء توقعات منطقية، ثم يطبق أمام التلاميذ خطوات خريطة الكلمة على مفردة «ازدهار» (النوع: اسم، المرادف: تقدم ونماء، الضد: تراجع وانحطاط، الجملة).",
      guided:
        "قراءة فقرة مختارة جماعياً مع تتبع النطق السليم وعلامات الترقيم، ثم إشراك المتعلمين ثنائياً على الألواح لاستخراج عائلة كلمة «تاريخ» وشبكة مفردات «حضارة» مع تغذية راجعة فورية.",
      autonomous:
        "إنجاز أسئلة الفهم الصريح والضمني في الكراسة أو بطاقة التطبيقات الفردية: تحديد الفكرة الرئيسية لكل فقرة واستخراج القيم الحضارية الواردة في النص.",
      evaluation:
        "سؤال تحقق سريع عبر بطاقة الخروج: تلخيص مضمون النص في جملتين تامتين وتصحيح التعثرات القرائية فوراً عبر مجموعة الدعم.",
    },
    summaryPoints: [
      "استراتيجيات الفهم القرائي ثلاث مراحل: ما قبل القراءة (العنوان والصورة والتوقع)، أثناء القراءة (الشرح السياقي)، ما بعد القراءة (التلخيص وإبداء الرأي).",
      "شبكة المفردات تجمع الكلمات المرتبطة بالمجال الدلالي نفسه (مثل: حضارة ← عمران، فنون، علوم، آثار).",
      "عائلة الكلمة تشمل المشتقات المشتركة في الجذر اللغوي نفسه (مثل: كتب ← كاتب، مكتوب، كتابة، مكتبة).",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: التهيئة والهدف", content: "عرض صور مآثر تاريخية مغربية وعالمية وتحديد توقعات القراءة." },
      { slideTitle: "الشريحة 2: النمذجة البصرية", content: "تطبيق تفاعلي لخريطة الكلمة وعائلة الكلمة خطوة بخطوة." },
      { slideTitle: "الشريحة 3: أسئلة الفهم الصريح", content: "تحليل الفقرات واستخراج الأفكار الأساسية والقيم الإنسانية." },
      { slideTitle: "الشريحة 4: التقويم الختامي", content: "شبكة التقييم الذاتي للطلاقة القرائية واستيعاب المقروء." },
    ],
    exercisesWithCorrection: [
      {
        question: "أنشئ خريطة كلمة «تشييد» وحدد عائلة كلمة «عمران» ثم استخرج الفكرة العامة لنص «شروط قيام الحضارة».",
        answer: "«تشييد»: اسم | المرادف: بناء وتأسيس | الضد: هدم وتخريب | الجملة: برع المغاربة في تشييد المعالم الخالدة. عائلة «عمران»: عمّر، معمّر، معمار، عمارة.",
      },
    ],
  },
  {
    id: "les_ar_6_2",
    level: "6aep",
    subject: "arabic",
    unit: 1,
    week: 2,
    internalOnly: true,
    isTarl: false,
    title: "الصرف والتحويل الصريح: تصريف الفعل الصحيح والفعل المعتل (المستوى السادس)",
    titleFr: "Morphologie explicite 6AEP : Verbe sain et verbe faible",
    objective:
      "أن يميز المتعلم بين أقسام الفعل الصحيح (السالم، المهموز، المضعف) والفعل المعتل (المثال، الأجوف، الناقص، اللفيف) ويصرفها تصريفاً سليماً في الأزمنة الثلاثة.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 45,
    keyConcepts: ["الفعل الصحيح", "المهموز والمضعف", "الفعل المعتل", "الأجوف والناقص", "التغييرات الصرفية"],
    steps: {
      preparation:
        "تذكير سريع بحروف العلة المجموعة في كلمة (واي: و، ا، ي) وبأزمنة الفعل الثلاثة، ثم التصريح بالهدف: إتقان تصنيف الأفعال وتصريفها دون أخطاء إملائية أو صرفية.",
      modeling:
        "يرجع الأستاذ الأفعال إلى أصلها الثلاثي في الماضي مع الضمير «هو» أمام التلاميذ: «شدَّ ← مضعف (يفك إدغامه مع التاء: شددتُ)»، «قال ← أجوف (يحذف وسطه في الأمر: قُلْ)»، «دعا ← ناقص (ترد ألفه إلى أصلها: دعوتُ)».",
      guided:
        "عرض جدول أفعال على السبورة وتصنيفها جماعياً على الألواح (كتب، أخذ، مدّ، وقف، نام، سعى)، ثم تصريف الفعل «مدّ» و«قال» مع ضمائر الرفع المتحركة.",
      autonomous:
        "تحويل جمل فعلية في الزمن الماضي والمضارع والأمر مع ضمائر المتكلم والمخاطب والغائب على الدفتر الفردي تحت مراقبة الأستاذ.",
      evaluation:
        "تمرين تحقق فوري من 4 أسئلة اختيارية لاكتشاف أخطاء فك الإدغام أو حذف حرف العلة ومعالجتها آنياً.",
    },
    summaryPoints: [
      "الفعل الصحيح ما خلت حروفه الأصلية من حروف العلة، وينقسم إلى: سالم (كتب)، مهموز (أخذ/سأل/قرأ)، ومضعف (مدّ/شدّ).",
      "الفعل المعتل ما كان أحد حروفه الأصلية حرف علة: مثال (وقف)، أجوف (قال)، ناقص (دعا)، ولفيف مقرون/مفروق (روى/وعى).",
      "عند إسناد الفعل المضعف إلى ضمائر الرفع المتحركة (تُ، نا، نَ) يُفك إدغامه (مددتُ)، وعند إسناد الأجوف إلى هذه الضمائر يُحذف حرف علته (قلتُ).",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: خطاطة التصنيف", content: "شجرة تصنيف الصحيح والمعتل مع أمثلة نموذجية ملونة." },
      { slideTitle: "الشريحة 2: قاعدة فك الإدغام", content: "نماذج تصريف الفعل المضعف في الماضي والمضارع والأمر." },
      { slideTitle: "الشريحة 3: تصريف الأجوف والناقص", content: "تغيرات حرف العلة عند الإسناد لضمائر الرفع المتحركة والساكنة." },
    ],
    exercisesWithCorrection: [
      {
        question: "أسند الجملة «مدّ يده وسعى إلى الخير وقال الصدق» إلى الضمير «نحن» في الماضي و«أنتن» في الأمر.",
        answer: "نحن: مددنا أيدينا وسعينا إلى الخير وقلنا الصدق. أنتن (الأمر): امددنَ أيديكن واسعينَ إلى الخير وقلنَ الصدق.",
      },
    ],
  },
  {
    id: "les_ar_6_3",
    level: "6aep",
    subject: "arabic",
    unit: 2,
    week: 1,
    internalOnly: true,
    isTarl: false,
    title: "التراكيب والإملاء الصريح: نصب وجزم الفعل المضارع الصحيح وهمزتا الوصل والقطع وابن",
    titleFr: "Syntaxe & Orthographe 6AEP : Subjonctif/Jussif arabe et Hamzas",
    objective:
      "أن يتعرف المتعلم أدوات نصب وجزم الفعل المضارع والجملة المؤولة، ويرسم همزتي الوصل والقطع وهمزة (ابن) رسماً إملائياً صحيحاً.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 50,
    keyConcepts: ["أدوات النصب", "أدوات الجزم", "الجملة المؤولة", "همزة الوصل والقطع", "همزة ابن"],
    steps: {
      preparation:
        "مراجعة حالة الرفع الأصلية للفعل المضارع، والتمييز السمعي بين نطق الهمزة في بداية الكلام ووسطه عبر اختبار حرف الواو والفاء.",
      modeling:
        "ينمذج الأستاذ إعراب مثالين: «لن يتأخرَ المجتهدُ» (أداة نصب + فعل مضارع منصوب)، «لم يهملْ واجبَه» (أداة جزم + فعل مضارع مجزوم)، ويشرح قاعدة حذف همزة «ابن» بين علمين مذكرين.",
      guided:
        "استخراج الأفعال المضارعة المنصوبة والمجزومة من فقرة قصيرة، وتصويب كتابة همزة الوصل والقطع وابن على الألواح مع التعليل الجماعي.",
      autonomous:
        "إنجاز تمرين الإعراب التطبيقي وتحويل المصدر المؤول إلى صريح، وإملاء فقرة قصيرة متضمنة لحالات همزة «ابن».",
      evaluation:
        "شبكة تحقق فردية لقياس ضبط الشكل التام لأواخر الأفعال المضارعة وصحة رسم الهمزات.",
    },
    summaryPoints: [
      "أدوات نصب المضارع: أنْ، لن، إذن، كي. وتنصب الفعل المضارع الصحيح بالفتحة الظاهرة.",
      "أدوات جزم فعل واحد: لم، لمّا، لام الأمر، لا الناهية. وأدوات جزم فعلين (الشرط): إنْ، مَنْ، متى، مهما، أينما.",
      "تحذف همزة «ابن» إذا وقعت بين علمين بينهما علاقة نسب ولم تقع أول السطر (طارق بن زياد)، أو بعد ياء النداء أو همزة الاستفهام، وتثبت في غير ذلك.",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: جدول النصب والجزم", content: "مقارنة بصرية بين أدوات النصب وأدوات الجزم الشرطية وغير الشرطية." },
      { slideTitle: "الشريحة 2: المصدر المؤول", content: "طريقة تحويل (أن + الفعل المضارع) إلى مصدر صريح." },
      { slideTitle: "الشريحة 3: قاعدة همزة ابن والوصل والقطع", content: "شروط إثبات وحذف همزة (ابن) بالأمثلة المصححة." },
    ],
    exercisesWithCorrection: [
      {
        question: "أدخل «لم» على «يستفيدُ» و«أنْ» على «تجتهدون» في جملتين، وصحح: «عمر إبن الخطاب قدوة».",
        answer: "لم يستفدْ من وقته (حذف الياء لالتقاء الساكنين). يسعدني أنْ تجتهدوا (حذف النون). التصحيح: عمر بن الخطاب قدوة (تحذف الألف بين علمين).",
      },
    ],
  },
  {
    id: "les_ar_6_tarl",
    level: "6aep",
    subject: "arabic",
    unit: 1,
    week: 4,
    internalOnly: true,
    isTarl: true,
    title: "أنشطة الدعم المكثف (TaRL العربية - المستوى السادس): الطلاقة القرائية وبناء الجملة والإنتاج الكتابي",
    titleFr: "Soutien intensif TaRL Arabe 6AEP : Fluence et production écrite",
    objective:
      "تجاوز تعثرات الطلاقة القرائية وضبط الحركات الإعرابية الأساسية وتمكين متعلمي السادس من كتابة فقرة سردية أو حجاجية سليمة استعداداً للموحد.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 55,
    keyConcepts: ["دعم طارل TaRL", "الطلاقة القرائية", "الفهم الحرفي والاستنتاجي", "الإنتاج الكتابي", "عناصر الإجابة"],
    steps: {
      preparation:
        "تفييء المتعلمين حسب نتائج رائز التموضع (مسار الحرف/الكلمة/الفقرة/القصة) وتوضيح تحدي الحصة لكل مجموعة.",
      modeling:
        "قراءة جهرية نموذجية لفقرة من 60 كلمة مع إبراز التقطيع الصوتي للوصل والوقف وتوظيف الروابط المنطقية أثناء التعبير.",
      guided:
        "تدريب ثنائي بالقراءة المتناوبة وحساب عدد الكلمات السليمة في الدقيقة، وبناء مسودة فقرة حول «أهمية الطاقة المتجددة» عبر خطاطة الأسئلة (متى؟ أين؟ ماذا؟ لماذا؟).",
      autonomous:
        "تحرير نص من 8 إلى 10 أسطر وفق شبكة التصحيح الذاتي (سلامة الأسلوب، علامات الترقيم، توظيف الظواهر المدروسة).",
      evaluation:
        "تفريغ نقط التطور في شبكة التتبع الفردية (TaRL) وتوزيع بطاقات معالجة موجهة للمتعثرين.",
    },
    summaryPoints: [
      "القراءة بطلاقة تتطلب الدقة في قراءة الحروف والحركات، والسرعة المناسبة، واحترام التنغيم وعلامات الترقيم.",
      "بناء نص إنشائي متماسك للموحد الإقليمي يرتكز على: مقدمة ممهدة، عرض يجيب عن عناصر الموضوع بروابط سليمة، وخاتمة مركزة.",
      "مراجعة ورقة التحرير قبل التسليم تشمل فحص الهمزات والتاء المربوطة والمبسوطة وأدوات النصب والجزم.",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: بطاقات الطلاقة (60 ثانية)", content: "نصوص قصيرة متدرجة الصعوبة لقياس سرعة القراءة السليمة." },
      { slideTitle: "الشريحة 2: مفاتيح الإجابة في فهم المقروء", content: "تقنية تحديد العبارات الدالة داخل النص وعدم الخلط بين المرادف والضد." },
      { slideTitle: "الشريحة 3: شبكة الإنتاج الكتابي", content: "نموذج تخطيط كتابة رسالة، طلب، أو مقال قصير." },
    ],
    exercisesWithCorrection: [
      {
        question: "رتب خطوات كتابة مقال قصير حول حماية البيئة، واقترح 3 روابط لغوية للربط بين الأفكار.",
        answer: "الخطوات: 1- تحديد العنوان والمقدمة (طرح المشكل)، 2- العرض (الأسباب والحلول بأدلة واضحة)، 3- الخاتمة (خلاصة ودعوة للتطبيق). الروابط: بالإضافة إلى، غير أن، وبناءً على ذلك.",
      },
    ],
  },

  // =========================================================================
  // 2. اللغة الفرنسية - المستوى السادس (Enseignement Explicite & TaRL)
  // =========================================================================
  {
    id: "les_fr_6_1",
    level: "6aep",
    subject: "french",
    unit: 1,
    week: 2,
    internalOnly: true,
    isTarl: false,
    title: "Conjugaison explicite : Présent, Imparfait et Futur simple des verbes usuels (1er, 2e et 3e gr.)",
    titleFr: "Conjugaison explicite 6AEP : Présent, Imparfait et Futur simple",
    objective:
      "Maîtriser les terminaisons et le radical des verbes usuels des 1er, 2ème et 3ème groupes au présent, à l'imparfait et au futur simple de l'indicatif.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 45,
    keyConcepts: ["Présent de l'indicatif", "Imparfait (-ais/-ions)", "Futur simple", "3ème groupe", "Radicaux irréguliers"],
    steps: {
      preparation:
        "Rappel rapide des pronoms personnels sujets et distinction entre radical et terminaison. Annonce explicite de l'objectif : « Conjuguer sans erreur les verbes courants aux trois temps de l'indicatif demandés à l'examen provincial ».",
      modeling:
        "L'enseignant modélise au tableau les régularités : Imparfait = radical de « nous » au présent + ais, ais, ait, ions, iez, aient ; Futur simple = infinitif (ou radical irrégulier : ser-, aur-, ir-, fer-) + ai, as, a, ons, ez, ont ; et le 3ème groupe au présent (prendre, faire, dire, aller).",
      guided:
        "Activité sur ardoises : conjuguer « finir », « prendre » et « faire » à l'imparfait et au futur simple avec correction immédiate et justification orale.",
      autonomous:
        "Exercices individuels de réécriture de phrases en changeant le temps verbal et le pronom sujet pendant 10 minutes.",
      evaluation:
        "Vérification éclair de 5 verbes irréguliers (être, avoir, aller, faire, pouvoir) pour valider l'acquisition.",
    },
    summaryPoints: [
      "Présent 3ème groupe : terminaisons fréquentes (-s, -s, -t, -ons, -ez, -ent) ; verbes en -dre gardent le « d » (-ds, -ds, -d) sauf en -indre/-soudre.",
      "Imparfait : tous les verbes (même être : j'étais) ont les mêmes terminaisons : -ais, -ais, -ait, -ions, -iez, -aient.",
      "Futur simple : terminaisons universelles (-ai, -as, -a, -ons, -ez, -ont) ajoutées à l'infinitif ou au radical futur (être → ser-, avoir → aur-, faire → fer-, aller → ir-).",
    ],
    slidesOutline: [
      { slideTitle: "Diapo 1 : Tableau comparatif des terminaisons", content: "Synthèse visuelle Présent / Imparfait / Futur simple." },
      { slideTitle: "Diapo 2 : Verbes pièges du 3ème groupe", content: "Être, avoir, aller, faire, dire, prendre, venir, pouvoir." },
      { slideTitle: "Diapo 3 : Entraînement guidé", content: "Phrases à compléter sur ardoise avec indices temporels." },
    ],
    exercisesWithCorrection: [
      {
        question: "Mets les verbes entre parenthèses au temps demandé : 1. Hier, nous (finir) le projet. 2. Demain, tu (aller) au musée. 3. Maintenant, ils (prendre) le train.",
        answer: "1. finissions (imparfait) ; 2. iras (futur simple) ; 3. prennent (présent).",
      },
    ],
  },
  {
    id: "les_fr_6_2",
    level: "6aep",
    subject: "french",
    unit: 1,
    week: 1,
    internalOnly: true,
    isTarl: false,
    title: "Lecture explicite & Compréhension : Identifier le type de texte et les informations essentielles",
    titleFr: "Lecture explicite 6AEP : Stratégies de compréhension de l'écrit",
    objective:
      "Dégager l'idée principale d'un texte narratif ou informatif, identifier les personnages/lieux/temps et justifier les réponses à partir du texte.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 45,
    keyConcepts: ["Compréhension écrite", "Texte narratif/informatif", "Inférence", "Mots-clés", "Justification"],
    steps: {
      preparation:
        "Observation du paratexte (titre, source, paragraphes, illustration) et formulation d'hypothèses de lecture.",
      modeling:
        "Lecture magistrale expressive puis modélisation de la stratégie « Surligner les mots-clés de la question pour retrouver la preuve exacte dans le texte ».",
      guided:
        "Lecture silencieuse puis vérification collective des 3 premières questions de compréhension (Vrai/Faux avec justification).",
      autonomous:
        "Réponse écrite individuelle aux questions d'inférence, de lexique contextuel (synonyme/antonyme) et de titrage.",
      evaluation:
        "Mise en commun et correction ciblée des stratégies de reformulation.",
    },
    summaryPoints: [
      "Pour répondre « Vrai ou Faux », il faut toujours vérifier mot pour mot la phrase correspondante dans le texte.",
      "Le type de texte dépend de son intention : narratif (raconter une histoire), informatif (expliquer des faits), injonctif (donner des conseils/consignes).",
      "La source placée en bas du texte indique l'auteur, le livre ou le site d'où il est extrait.",
    ],
    slidesOutline: [
      { slideTitle: "Diapo 1 : Analyser le paratexte", content: "Repérer titre, auteur, source et paragraphes en 30 secondes." },
      { slideTitle: "Diapo 2 : Stratégie d'inférence", content: "Déduire le sens d'un mot nouveau grâce au contexte de la phrase." },
    ],
    exercisesWithCorrection: [
      {
        question: "Quels éléments permettent de prouver qu'un texte est informatif et non narratif ?",
        answer: "La présence de données précises, l'absence de personnages fictifs et l'emploi du présent de vérité générale pour expliquer un thème.",
      },
    ],
  },
  {
    id: "les_fr_6_3",
    level: "6aep",
    subject: "french",
    unit: 2,
    week: 1,
    internalOnly: true,
    isTarl: false,
    title: "Grammaire & Orthographe explicite : Types de phrases, expansion du GN et homophones grammaticaux",
    titleFr: "Grammaire & Orthographe 6AEP : Expansion du GN et homophones",
    objective:
      "Distinguer les quatre types de phrases, enrichir le Groupe Nominal (adjectif et complément du nom) et orthographier correctement les homophones (a/à, et/est, on/ont, son/sont).",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 45,
    keyConcepts: ["Types de phrases", "Adjectif qualificatif", "Complément du nom", "Homophones grammaticaux", "Accord sujet-verbe"],
    steps: {
      preparation:
        "Rappel de la ponctuation finale (. ? !) et du rôle du nom noyau dans la phrase.",
      modeling:
        "Modélisation de l'astuce de remplacement pour les homophones : a → avait / à (préposition) ; est → était / et (conj.) ; ont → avaient ; sont → étaient ; puis enrichissement du GN « un monument » → « un magnifique monument de Marrakech ».",
      guided:
        "Transformation collective de phrases déclaratives en phrases interrogatives/impératives et choix des homophones sur ardoise.",
      autonomous:
        "Application écrite individuelle : souligner les expansions du GN et compléter un court paragraphe à trous.",
      evaluation:
        "Dictée flash de 2 phrases synthétisant les homophones et l'accord de l'adjectif.",
    },
    summaryPoints: [
      "Astuce infaillible des homophones : si on peut remplacer par l'imparfait (avait, était, avaient, étaient), c'est un verbe sans accent ni t final (a, est, ont, sont).",
      "Le Groupe Nominal peut être enrichi par un adjectif épithète (un grand jardin) ou un complément du nom introduit par une préposition (un jardin de fleurs).",
      "L'adjectif s'accorde toujours en genre et en nombre avec le nom qu'il qualifie.",
    ],
    slidesOutline: [
      { slideTitle: "Diapo 1 : Règle de substitution", content: "Tests rapides à l'imparfait pour a/à, est/et, ont/on, sont/son." },
      { slideTitle: "Diapo 2 : Enrichir le GN", content: "Exemples progressifs : Nom noyau → Déterminant + Nom + Adjectif + Complément du nom." },
    ],
    exercisesWithCorrection: [
      {
        question: "Complète par (a/à) et (son/sont) : « Mon ami ... visité le musée ... Rabat avec ... frère ; ils ... ravis. »",
        answer: "Mon ami a visité le musée à Rabat avec son frère ; ils sont ravis.",
      },
    ],
  },
  {
    id: "les_fr_6_tarl",
    level: "6aep",
    subject: "french",
    unit: 2,
    week: 4,
    internalOnly: true,
    isTarl: true,
    title: "Remédiation TaRL Français (6AEP) : Décodage fluide, lecture expressive et production écrite guidée",
    titleFr: "Remédiation TaRL Français 6AEP : Fluence et Production écrite",
    objective:
      "Consolider la lecture fluide de paragraphes sans hésitation et guider les élèves en difficulté vers la rédaction autonome d'un texte court cohérent (6 à 8 lignes).",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 55,
    keyConcepts: ["TaRL Français", "Sons complexes", "Liaison et fluence", "Production écrite", "Connecteurs logiques"],
    steps: {
      preparation:
        "Réchauffement phonologique ciblé sur les graphèmes complexes fréquents (eau/au, oin, tion, ill, g/gu, c/ç).",
      modeling:
        "Construction guidée devant la classe d'un paragraphe de 6 lignes à partir d'une boîte à mots (Qui ? Où ? Quand ? Quoi ? Sentiment ?).",
      guided:
        "Lecture chronométrée en binômes (tutorat par les pairs) et rédaction collective de l'introduction et de la conclusion.",
      autonomous:
        "Rédaction individuelle d'un court récit ou d'une lettre amicale en s'appuyant sur la grille de relecture (Majuscule, Verbe conjugué, Ponctuation).",
      evaluation:
        "Entretien rapide avec chaque élève ciblé et mise à jour de sa fiche de progression TaRL.",
    },
    summaryPoints: [
      "En français, toute phrase commence par une majuscule, comporte au moins un verbe conjugué correctement accordé et se termine par une ponctuation forte.",
      "Utiliser des connecteurs simples (D'abord, Ensuite, Enfin) rend le texte clair et obtient la note maximale en cohérence.",
    ],
    slidesOutline: [
      { slideTitle: "Diapo 1 : Gammes de fluence", content: "Listes de mots à graphèmes complexes et virelangues." },
      { slideTitle: "Diapo 2 : Boîte à outils d'écriture", content: "Connecteurs chronologiques et vocabulaire thématique (6AEP)." },
    ],
    exercisesWithCorrection: [
      {
        question: "Remets en ordre et relie avec (D'abord / Ensuite / Enfin) pour raconter une sortie scolaire.",
        answer: "D'abord, nous avons visité la bibliothèque historique. Ensuite, le guide nous a expliqué l'histoire du monument. Enfin, nous sommes rentrés heureux.",
      },
    ],
  },

  // =========================================================================
  // 3. الرياضيات - المستوى السادس (التعليم الصريح + دعم طارل)
  // =========================================================================
  {
    id: "les_math_6_1",
    level: "6aep",
    subject: "math",
    unit: 1,
    week: 1,
    internalOnly: true,
    isTarl: false,
    title: "الرياضيات الصريحة: الملايين والملايير والأعداد العشرية (القراءة، الكتابة، المقارنة والعمليات)",
    titleFr: "Maths explicites 6AEP : Grands nombres et nombres décimaux",
    objective:
      "أن يقرأ المتعلم ويكتب ويفكك الأعداد الكبيرة (الملايين والملايير) والأعداد العشرية، ويقارنها ويرتبها وينجز عليها الجمع والطرح والضرب بدقة.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 55,
    keyConcepts: ["فصل الملايين والملايير", "الجزء الصحيح والعشري", "التفكيك", "وضع الفاصلة", "المقارنة"],
    steps: {
      preparation:
        "حساب ذهني سريع: الضرب في 10 و100 و1000 لعدد عشري وتحريك الفاصلة نحو اليمين. إعلان الهدف: «إتقان قراءة وكتابة الأعداد الكبيرة ووضع العمليات على الأعداد العشرية دون أخطاء الفاصلة».",
      modeling:
        "يرسم الأستاذ جدول الفصول (الوحدات البسيطة، الآلاف، الملايين، الملايير) ويبرز قاعدة ترك فراغ بين كل 3 أرقام من اليمين، ثم ينمذج وضع عملية طرح عدد عشري من عدد صحيح بإضافة الأصفار الزائدة (250,00 - 48,75).",
      guided:
        "كتابة أعداد بالحروف والأرقام على الألواح وتفكيكها، ثم إنجاز عملية ضرب عددين عشريين مع عدّ الأرقام بعد الفاصلة جماعياً.",
      autonomous:
        "حل سلسلتين من التمارين الفردية: ترتيب تزايدي لأعداد عشرية مختلطة + وضع وإنجاز 3 عمليات حسابية عمودية.",
      evaluation:
        "تمرين تحقق فوري لاختيار الوضع العمودي الصحيح للعملية وتحديد رتبة رقم في عدد من فئة الملايير.",
    },
    summaryPoints: [
      "لقراءة عدد كبير نقسمه إلى فصول من اليمين (3 أرقام لكل فصل): وحدات بسيطة ← آلاف ← ملايين ← ملايير.",
      "في الجمع والطرح العمودي للأعداد العشرية نضع الفاصلة تحت الفاصلة تماماً، ونملأ الخانات الفارغة بالأصفار.",
      "في ضرب الأعداد العشرية ننجز الضرب كالمعتاد ثم نضع الفاصلة في الجداء بجمع عدد الأرقام الموجودة يمين الفاصلة في العاملين.",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: جدول فصول الأعداد الكبيرة", content: "التمييز بين رقم الوحدات وعدد الوحدات/الملايين." },
      { slideTitle: "الشريحة 2: أخطاء شائعة في العمليات", content: "كيفية تفادي نسيان الفاصلة أو أصفار الجزء العشري." },
    ],
    exercisesWithCorrection: [
      {
        question: "ضع وأنجز: (300 - 145,68) و (24,5 × 3,04) ثم رتب تزايدياً: 4,5 ؛ 4,09 ؛ 4,51 ؛ 4,19.",
        answer: "300 - 145,68 = 154,32 | 24,5 × 3,04 = 74,48 | الترتيب التزايدي: 4,09 < 4,19 < 4,5 < 4,51.",
      },
    ],
  },
  {
    id: "les_math_6_2",
    level: "6aep",
    subject: "math",
    unit: 2,
    week: 2,
    internalOnly: true,
    isTarl: false,
    title: "الرياضيات الصريحة: العمليات الأربع على الأعداد الكسرية والاختزال (المستوى السادس)",
    titleFr: "Maths explicites 6AEP : Les 4 opérations sur les fractions",
    objective:
      "أن يتقن المتعلم توحيد المقامات وإنجاز الجمع والطرح والضرب والقسمة للأعداد الكسرية مع اختزال النتيجة إلى أبسط عدد كسري.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 55,
    keyConcepts: ["الأعداد الكسرية", "توحيد المقامات", "مقلوب الكسر", "الاختزال", "القسمة"],
    steps: {
      preparation:
        "حساب ذهني: تحويل عدد عشري مثل 0,5 و0,25 و0,75 إلى عدد كسري مختزل، وتذكير بمفهوم المقلوب.",
      modeling:
        "ينمذج الأستاذ القواعد الأربع بوضوح: في الجمع والطرح نوحد المقامات أولاً؛ في الضرب نضرب البسط في البسط والمقام في المقام؛ في القسمة نضرب الكسر الأول في مقلوب الكسر الثاني: (a/b ÷ c/d = a/b × d/c).",
      guided:
        "إنجاز تعبير مركب ((2/3 + 1/6) × 3/5) على الألواح خطوة بخطوة مع التذكير بأسبقية الأقواس والاختزال النهائي.",
      autonomous:
        "حل 4 عمليات متنوعة (جمع، طرح، ضرب، قسمة) ومسألة حول تقسيم قطعة أرضية إلى أجزاء كسرية.",
      evaluation:
        "تصحيح فردي وجماعي ورصد خطأ «جمع المقامين» أو «نسيان قلب الكسر الثاني في القسمة».",
    },
    summaryPoints: [
      "الجمع والطرح: يجب توحيد المقامات أولاً، ثم نجمع أو نطرح البسطين مع الاحتفاظ بالمقام الموحد.",
      "الضرب: لا يحتاج إلى توحيد المقامات؛ نضرب البسط × البسط والمقام × المقام.",
      "القسمة: نحول القسمة إلى ضرب في مقلوب العدد الكسري الثاني ثم نختزل الناتج بقسمة البسط والمقام على القاسم المشترك الأكبر.",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: خطاطة العمليات الأربع", content: "مقارنة سريعة بين شروط الجمع/الطرح وشروط الضرب/القسمة." },
      { slideTitle: "الشريحة 2: تقنيات الاختزال السريع", content: "الاعتماد على قابليات القسمة على 2 و3 و5 و9." },
    ],
    exercisesWithCorrection: [
      {
        question: "احسب واختزل ما يلي: (3/4 + 1/2) ÷ 5/8.",
        answer: "(3/4 + 2/4) ÷ 5/8 = 5/4 × 8/5 = 40/20 = 2.",
      },
    ],
  },
  {
    id: "les_math_6_3",
    level: "6aep",
    subject: "math",
    unit: 3,
    week: 1,
    internalOnly: true,
    isTarl: false,
    title: "الرياضيات الصريحة: التناسبية (النسبة المئوية، السلم، السرعة المتوسطة، الفائدة السنوية والكتلة الحجمية)",
    titleFr: "Maths explicites 6AEP : Proportionnalité, échelle et vitesse moyenne",
    objective:
      "أن يوظف المتعلم معامل التناسب والقاعدة الثلاثية لحل وضعيات مسائل حول التخفيضات والنسب المئوية وسلم التصاميم والسرعة المتوسطة والفائدة السنوية.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 55,
    keyConcepts: ["التناسبية", "النسبة المئوية", "سلم التصاميم", "السرعة المتوسطة", "الرأسمال والفائدة"],
    steps: {
      preparation:
        "حساب ذهني: حساب 10% و25% و50% من مبالغ مالية بسيطة (200 درهم، 400 درهم).",
      modeling:
        "يرسم الأستاذ مثلثات القوانين الثلاثة على السبورة وينمذج طريقة استخراج القانون المطلوب باليد (المسافة = السرعة × المدة؛ المسافة الحقيقية = المسافة على التصميم × مقام السلم؛ الفائدة السنوية = (الرأسمال × السعر) ÷ 100).",
      guided:
        "حل وضعيتين تطبيقيتين جماعياً: تحويل السرعة من km/h إلى الوقت اللازم لقطع مسافة، وحساب ثمن منتوج بعد تخفيض 20%.",
      autonomous:
        "إنجاز مسألتين من نمط الامتحان الموحد الإقليمي (مسألة في سلم الخرائط ومسألة في الرأسمال والفائدة).",
      evaluation:
        "سؤال تحقق للتأكد من توحيد الوحدات (تحويل المتر إلى سنتيمتر أو الدقائق إلى ساعات) قبل تطبيق القانون.",
    },
    summaryPoints: [
      "السرعة المتوسطة: V = d ÷ t | المسافة: d = V × t | المدة: t = d ÷ V (مع توحيد الوحدات).",
      "سلم التصميم: السلم = المسافة على التصميم ÷ المسافة الحقيقية (بنفس الوحدة، غالباً cm).",
      "النسبة المئوية والفائدة: الفائدة السنوية = (الرأسمال × السعر) ÷ 100 | الثمن بعد التخفيض = الثمن الأصلي - قيمة التخفيض.",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: مثلثات القوانين الذهبية", content: "تبسيط القواعد الأربع الخاصة بالتناسبية في السادس ابتدائي." },
      { slideTitle: "الشريحة 2: تحويل الوحدات قبل الحساب", content: "جدول تحويل الساعات والدقائق والمسافات في السلم." },
    ],
    exercisesWithCorrection: [
      {
        question: "أودع شخص مبلغ 15000 درهم في بنك بسعر فائدة سنوي 4%. ما هي الفائدة السنوية التي سيحصل عليها؟",
        answer: "الفائدة السنوية = (15000 × 4) ÷ 100 = 600 درهم.",
      },
    ],
  },
  {
    id: "les_math_6_4",
    level: "6aep",
    subject: "math",
    unit: 4,
    week: 1,
    internalOnly: true,
    isTarl: false,
    title: "الهندسة والقياس الصريح: الزوايا، الدائرة والقرص، وحجوم المجسمات (المكعب، متوازي المستطيلات والأسطوانة)",
    titleFr: "Géométrie & Mesure 6AEP : Aires, cercles et volumes des solides",
    objective:
      "أن ينشئ المتعلم الزوايا والأشكال الهندسية بدقة، ويحسب محيط الدائرة ومساحة القرص والمضلعات الاعتيادية وحجوم المجسمات.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 55,
    keyConcepts: ["محيط الدائرة", "مساحة القرص", "الحجم", "الموشور القائم", "التحويلات الهندسية"],
    steps: {
      preparation:
        "حساب ذهني: تذكير بقيمة π ≈ 3,14 والعلاقة بين القطر والشعاع (D = 2 × r) ومضاعفات وحدات الحجم والسعة (1 dm³ = 1 L).",
      modeling:
        "ينمذج الأستاذ حساب حجم متوازي المستطيلات والأسطوانة القائمة عبر قاعدة موحدة: «الحجم = مساحة القاعدة × الارتفاع»، ثم يطبق مثالاً لخزان مائي أسطواني وتحويل حجمه إلى اللتر.",
      guided:
        "رسم زاوية قياسها 125° وإنشاء منصفها باستعمال البركار والمسطرة، وحساب مساحة قرص شعاعه 5 cm على الألواح.",
      autonomous:
        "حل تمرين مركب يجمع بين حساب مساحة قطعة أرض مركبة وتحويل وحدات الحجم والسعة والمساحة الزراعية (الهكتار والآر).",
      evaluation:
        "بطاقة تحقق سريعة للتمييز بين قانون المحيط (P = D × π) وقانون المساحة (S = r × r × π).",
    },
    summaryPoints: [
      "محيط الدائرة = القطر × π | مساحة القرص = الشعاع × الشعاع × π.",
      "حجم المكعب = الضلع × الضلع × الضلع | حجم متوازي المستطيلات = الطول × العرض × الارتفاع | حجم الأسطوانة = مساحة القرص × الارتفاع.",
      "جدول التحويلات المشترك للحجم والسعة: كل وحدة حجم بها 3 خانات، و 1 dm³ = 1 L، و 1 m³ = 1000 L.",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: ملخص المحيطات والمساحات", content: "المربع، المستطيل، المثلث، المعين، شبه المنحرف، والقرص." },
      { slideTitle: "الشريحة 2: جدول وحدات الحجم والسعة", content: "الربط البصري بين المتر المكعب واللتر وأجزائهما." },
    ],
    exercisesWithCorrection: [
      {
        question: "خزان مائي على شكل متوازي مستطيلات طوله 2 m وعرضه 1,5 m وارتفاعه 1 m. احسب حجمه بالمتر المكعب ثم سعته باللتر.",
        answer: "الحجم: V = 2 × 1,5 × 1 = 3 m³. السعة باللتر: 3 m³ = 3000 dm³ = 3000 L.",
      },
    ],
  },
  {
    id: "les_math_6_tarl",
    level: "6aep",
    subject: "math",
    unit: 1,
    week: 4,
    internalOnly: true,
    isTarl: true,
    title: "أنشطة الدعم المكثف (TaRL الرياضيات - المستوى السادس): القسمة الإقليدية، الضرب وحل المسائل",
    titleFr: "Soutien intensif TaRL Maths 6AEP : Division euclidienne et résolution de problèmes",
    objective:
      "تصفية تعثرات القسمة الإقليدية على عدد من رقمين أو ثلاثة أرقام مع الفاصلة، وبناء منهجية تحليل وحل المسائل ذات الخطوات المتعددة.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 55,
    keyConcepts: ["دعم طارل الرياضيات", "القسمة الإقليدية", "القسمة العشرية", "منهجية حل المسائل", "التقدير"],
    steps: {
      preparation:
        "ألعاب الحساب الذهني السريع (جداول الضرب من 2 إلى 9) لتسريع إيجاد الخارج في القسمة.",
      modeling:
        "ينمذج الأستاذ تقنية التخلص من الفاصلة في المقسوم عليه بضرب المقسوم والمقسوم عليه في 10 أو 100، مع تطبيق استراتيجية الـ 4 خطوات لحل المسائل: أفهم ← أخطط ← أنجز ← أتحقق.",
      guided:
        "إنجاز قسمة إقليدية بخارج عشري مضبوط على الألواح مع كتابة جدول مضاعفات المقسوم عليه جانباً كدعامة بصرية.",
      autonomous:
        "حل مسألتين واقعيتين تتضمنان أكثر من عملية حسابية في بطاقة الدعم الفردية.",
      evaluation:
        "رصد التحسن على شبكة مواكبة أفواج طارل وانتقال المتعلم إلى مستوى الإتقان.",
    },
    summaryPoints: [
      "قبل إنجاز قسمة عدد عشري على عدد عشري، نحول المقسوم عليه إلى عدد صحيح بضرب الطرفين في 10 أو 100 أو 1000.",
      "كتابة مضاعفات المقسوم عليه من ×1 إلى ×9 على ورقة التسويد تمنع الوقوع في أخطاء الطرح المتكرر.",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: خطوات القسمة على عددين", content: "مثال محلول خطوة بخطوة مع التخلص من الفاصلة." },
      { slideTitle: "الشريحة 2: شبكة حل المسائل", content: "تمييز المعطيات الزائدة وترجمة السؤال إلى عمليات." },
    ],
    exercisesWithCorrection: [
      {
        question: "أوجد الخارج المضبوط للقسمة: 13,5 ÷ 1,5 و 25,2 ÷ 0,6.",
        answer: "13,5 ÷ 1,5 = 135 ÷ 15 = 9 | 25,2 ÷ 0,6 = 252 ÷ 6 = 42.",
      },
    ],
  },

  // =========================================================================
  // 4. النشاط العلمي - المستوى السادس (التعليم الصريح وفق نهج التقصي)
  // =========================================================================
  {
    id: "les_sci_6_1",
    level: "6aep",
    subject: "science",
    unit: 1,
    week: 1,
    internalOnly: true,
    isTarl: false,
    title: "النشاط العلمي الصريح: الجهاز العصبي (الحساسية الشعورية، التحركية الإرادية واللاإرادية)",
    titleFr: "Éveil Scientifique 6AEP : Le système nerveux et la motricité",
    objective:
      "أن يحدد المتعلم أعضاء الجهاز العصبي ويميز مسار السيالة العصبية في كل من الحساسية الشعورية والتحركية الإرادية والانعكاس الشوكي، ويستنتج سبل وقايته.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 45,
    keyConcepts: ["الجهاز العصبي", "الحساسية الشعورية", "التحركية الإرادية", "الانعكاس الشوكي", "وقاية الدماغ"],
    steps: {
      preparation:
        "تساؤل التقصي: «لماذا نسحب يدنا بسرعة وبشكل لا إرادي عند لمس جسم ساخن بينما نقرر بإرادتنا التقاط قلم؟» وتصريح الهدف.",
      modeling:
        "يشرح الأستاذ عبر رسم تخطيطي متحرك مسارات السيالة العصبية الثلاثة: الحساسية الشعورية (مستقبل حسي ← عصب حسي ← باحة حسية بالدماغ)، التحركية الإرادية (باحة حركية ← نخاع شوكي ← عصب حركي ← عضلة)، والتحركية اللاإرادية (المركز العصبي هو النخاع الشوكي).",
      guided:
        "تصنيف وضعيات سلوكية يومية (سماع رنين الجرس، سحب اليد عند وخز إبرة، ركل الكرة) على الألواح وتحديد المركز العصبي المسؤول.",
      autonomous:
        "إتمام خطاطة مسار السيالة العصبية في كراسة النشاط العلمي مع ذكر 3 قواعد لوقاية الجهاز العصبي.",
      evaluation:
        "اختبار تحقق قصير لتمييز دور الدماغ عن دور النخاع الشوكي والأعصاب.",
    },
    summaryPoints: [
      "يتكون الجهاز العصبي من الدماغ (المخ، المخيخ، البصلة السيسائية)، النخاع الشوكي، والأعصاب.",
      "المركز العصبي للحساسية الشعورية والتحركية الإرادية هو المخ، بينما المركز العصبي للتحركية اللاإرادية (الانعكاس) هو النخاع الشوكي.",
      "لوقاية الجهاز العصبي يجب النوم الكافي، تجنب السهر والضجيج والإفراط في الشاشات، وممارسة الرياضة.",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: تشريح الجهاز العصبي", content: "مكونات الدماغ والنخاع الشوكي وشبكة الأعصاب." },
      { slideTitle: "الشريحة 2: خطاطات المسارات العصبية", content: "مقارنة بصرية بين الحساسية الشعورية والحركة الإرادية والانعكاسية." },
    ],
    exercisesWithCorrection: [
      {
        question: "حدد نوع النشاط العصبي والمركز المسؤول في الحالتين: (1) شم رائحة عطر، (2) إغلاق العين لا إرادياً عند اقتراب جسم غريب.",
        answer: "(1) حساسية شعورية — المركز العصبي: الباحة الحسية للشم بالمخ. (2) تحركية لاإرادية (انعكاس) — المركز العصبي: النخاع الشوكي.",
      },
    ],
  },
  {
    id: "les_sci_6_2",
    level: "6aep",
    subject: "science",
    unit: 2,
    week: 2,
    internalOnly: true,
    isTarl: false,
    title: "النشاط العلمي الصريح: التوازن البيئي، السلاسل الغذائية، والتغيرات الفيزيائية والكيميائية للمادة",
    titleFr: "Éveil Scientifique 6AEP : Équilibre naturel et transformations de la matière",
    objective:
      "أن يربط المتعلم مكونات الوسط البيئي الحي واللاحي وعلاقات الافتراس والتطفل والتعاون، ويميز التحولات الفيزيائية (الانعكاسية) عن التحولات الكيميائية.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 45,
    keyConcepts: ["الوسط البيئي", "السلسلة الغذائية", "التوازن الطبيعي", "تحول فيزيائي", "تحول كيميائي"],
    steps: {
      preparation:
        "عرض مقارنة بين انصهار قطعة جليد واحتراق ورقة أو صدأ الحديد، وطرح فرضيات التمييز بين التحولين.",
      modeling:
        "ينمذج الأستاذ خصائص التحول الفيزيائي (تتغير الحالة فقط دون ظهور مادة جديدة ويمكن الرجوع للحالة الأصلية) مقابل التحول الكيميائي (اختفاء مواد وظهور أجسام جديدة ولا يمكن الرجوع للحالة الأولى)، ثم يبني سلسلة غذائية متوازنة.",
      guided:
        "تحليل أثر انقراض حلقة من السلسلة الغذائية على توازن الوسط البيئي وتصنيف أمثلة تحولات المادة ثنائياً.",
      autonomous:
        "إنجاز جدول مقارنة بين التطفل والتنافس والتعاون، ورسم سلسلة غذائية مكونة من منتِج ومستهلكين ومحللات.",
      evaluation:
        "تمرين تحقق فوري لتحديد نوع التحول في 4 ظواهر طبيعية ومخبرية.",
    },
    summaryPoints: [
      "التحول الفيزيائي انعكاسي ولا يغير طبيعة المادة (الانصهار، التجمد، التبخر، الذوبان).",
      "التحول الكيميائي غير انعكاسي وتنتج عنه مواد جديدة بخصائص مختلفة (الاحتراق، الصدأ، التخمر).",
      "يختل التوازن البيئي بفعل الأنشطة البشرية السلبية (الرعي الجائر، التلوث، اجتثاث الغابات) ويُصان بالتشجير والمحميات.",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: التفاعلات داخل الوسط البيئي", content: "المكونات الحية واللاحية والعلاقات الغذائية المتبادلة." },
      { slideTitle: "الشريحة 2: التحول الفيزيائي والكيميائي", content: "أمثلة مصورة وجدول معايير التمييز." },
    ],
    exercisesWithCorrection: [
      {
        question: "صنف التحولات التالية إلى فيزيائية أو كيميائية: ذوبان السكر في الماء، احتراق الخشب، تكاثف بخار الماء، تعفن الفواكه.",
        answer: "تحولات فيزيائية: ذوبان السكر في الماء، تكاثف بخار الماء. تحولات كيميائية: احتراق الخشب، تعفن الفواكه.",
      },
    ],
  },
  {
    id: "les_sci_6_3",
    level: "6aep",
    subject: "science",
    unit: 4,
    week: 1,
    internalOnly: true,
    isTarl: false,
    title: "النشاط العلمي الصريح: إنتاج الطاقة الكهربائية، ترشيد الاستهلاك، وحركة الأرض والقمر والنظام الشمسي",
    titleFr: "Éveil Scientifique 6AEP : Énergie électrique et système solaire",
    objective:
      "أن يتعرف المتعلم مصادر إنتاج الطاقة الكهربائية المتجددة وغير المتجددة وترشيدها، ويفسر تعاقب الليل والنهار والفصول الأربعة وأطوار القمر.",
    fileSize: "تحميل داخلي (PDF / Word)",
    durationMinutes: 45,
    keyConcepts: ["المحطات الكهربائية", "الطاقات المتجددة", "ترشيد الطاقة", "دوران الأرض", "تعاقب الفصول"],
    steps: {
      preparation:
        "طرح وضعية انطلاق حول مصادر الكهرباء في المنزل ولماذا تختلف فصول السنة بين النصف الشمالي والجنوبي للأرض.",
      modeling:
        "نمذجة مبدأ اشتغال العنفة والمنوب في المحطات الحرارية والمائية والريحية، وتمثيل حركتي الأرض (حول نفسها في 24 ساعة ← الليل والنهار؛ حول الشمس في 365 يوماً وربع مع ميلان المحور ← الفصول الأربعة).",
      guided:
        "استخراج مزايا الطاقات المتجددة (الشمسية والريحية والمائية) مقارنة بالأحفورية، وتسمية أطوار القمر الثمانية بالترتيب.",
      autonomous:
        "إنجاز خطاطة تحولات الطاقة من المحطة إلى المنزل واقتراح 4 تدابير عملية لترشيد استهلاك الكهرباء.",
      evaluation:
        "نشاط تقويمي سريع يربط كل ظاهرة فلكية بالمدة الزمنية وحركة الأرض المسببة لها.",
    },
    summaryPoints: [
      "تنتج الطاقة الكهربائية في المحطات بواسطة منوب تديره عنفة بالبخار (حرارية/نووية) أو بالماء (مائية) أو بالرياح (ريحية) أو مباشرة بالألواح الشمسية.",
      "تدور الأرض حول محورها المائل دورة كاملة كل 24 ساعة فينتج الليل والنهار، وتدور حول الشمس كل سنة فينتج تعاقب الفصول الأربعة.",
    ],
    slidesOutline: [
      { slideTitle: "الشريحة 1: مصادر الطاقة الكهربائية", content: "مقارنة بين الطاقات المتجددة والطاقات الأحفورية الملوثة." },
      { slideTitle: "الشريحة 2: حركتا الأرض والفصول", content: "رسم توضيحي لميلان محور الأرض والانقلابين والاعتدالين." },
    ],
    exercisesWithCorrection: [
      {
        question: "فسر لماذا لا يترتب تعاقب الفصول الأربعة عن دوران الأرض حول نفسها، وما هو سبب حدوثه الفعلي؟",
        answer: "دوران الأرض حول نفسها يسبب الليل والنهار فقط؛ أما تعاقب الفصول الأربعة فسببه دوران الأرض حول الشمس في 365 يوماً وربع مع ميلان محورها.",
      },
    ],
  },
];
