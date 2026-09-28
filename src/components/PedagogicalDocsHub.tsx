import React from "react";
import {
  ClipboardList,
  FolderKanban,
  Calendar,
  UserCheck,
  Scroll,
  FileText,
  Table,
  CalendarRange,
  Award,
  MessageSquareQuote,
  Eye,
  Printer,
  ChevronLeft,
  Sparkles,
  CheckCircle2,
  FileCheck2,
  FileSpreadsheet,
  Presentation,
  ArrowRight,
  BookOpen,
  Calculator,
  Ruler,
  Layers,
} from "lucide-react";
import { TabKey, TeacherProfile } from "../types";

interface PedagogicalDocsHubProps {
  teacherProfile: TeacherProfile;
  onNavigateToTab: (tab: TabKey) => void;
  onOpenPrintPreview: (docKey?: TabKey) => void;
}

export const PedagogicalDocsHub: React.FC<PedagogicalDocsHubProps> = ({
  teacherProfile,
  onNavigateToTab,
  onOpenPrintPreview,
}) => {
  const pedagogicalDocuments = [
    {
      key: "intensive_support" as TabKey,
      title: "ملف وحقيبة حصص الدعم المكثف لجميع المستويات (1 إلى 6)",
      badge: "جديد الريادة • 24 يوماً كاملة",
      badgeColor: "bg-amber-100 text-amber-950 border-amber-300 font-black",
      icon: Layers,
      iconBg: "bg-indigo-700 text-white",
      description:
        "الحقيبة الرسمية الشاملة لجميع حصص الدعم المكثف (24 يوماً) بمؤسسات الريادة لجميع مستويات الابتدائي (1، 2، 3، 4، 5، 6): عروض PPTX تفاعلية للسبورات، جذاذات الحصص Word و PDF، كراسات المتعلم، ومصفوفات المحتويات للمواد الثلاث (العربية، الرياضيات، والفرنسية) وفق ملف escuila.info/p/soutien-intensif.html.",
      features: [
        "عروض PPTX للسبورات التفاعلية وجذاذات يومية لـ 24 حصة كاملة",
        "تغطية شاملة للمواد الثلاث: اللغة العربية، الرياضيات، واللغة الفرنسية",
        "روابط تحميل ومعاينة سريعة وتصفية ذكية حسب المستوى والمادة",
      ],
    },
    {
      key: "timetable" as TabKey,
      title: "نماذج استعمال الزمن لفترة الدعم (TaRL والدعم المكثف) ومؤسسات الريادة",
      badge: "7 نماذج معتمدة • Word & PDF",
      badgeColor: "bg-blue-100 text-blue-950 border-blue-300 font-black",
      icon: Calendar,
      iconBg: "bg-blue-700 text-white",
      description:
        "النماذج الرسمية السبعة لاستعمالات الزمن الخاصة بفترة الدعم المكثف طارل (TaRL) ومؤسسات الريادة وفق موقع يانبوع التربية والتوجيهات الوزارية: التوقيت المسترسل (فوجين)، التوقيت العادي (فترتان - 4 أفواج)، أستاذ التخصص (عربية / فرنسية ورياضيات)، المستوى الأول 1AEP، المستويات العليا (4-6)، وأسبوع الموضعة مع التعديل والتصدير لـ Word و PDF و Excel.",
      features: [
        "7 نماذج وزارية متكاملة وقابلة للتعديل والتخصيص الفوري",
        "تغطية صيغ التوقيت: المسترسل (صباحي/مسائي)، فترتان، و 4 أفواج متناوبة",
        "تصدير Word (.doc) و PDF عالي الدقة و Excel مع مساحات التوقيع والمصادقة الرسمية",
      ],
    },
    {
      key: "daily_log" as TabKey,
      title: "المذكرة اليومية لأنشطة الدعم التربوي المكثف (TaRL & الريادة)",
      badge: "نموذج 2026/2027 الحصري",
      badgeColor: "bg-amber-100 text-amber-900 border-amber-300 font-bold",
      icon: BookOpen,
      iconBg: "bg-emerald-700 text-white",
      description:
        "النموذج الرسمي الشامل لدفتر المذكرة اليومية لأنشطة الدعم المكثف: الغلاف الخارجي، صفحة البسملة والزخرفة الملكية، البطاقة الشخصية، وصفحات التخطيط اليومي ثنائية الأفواج مع خانات الأنشطة الأربعة ومصادقة الإدارة والتفتيش.",
      features: [
        "كتيب متكامل من 10 صفحات (غلاف، بسملة، بطاقة شخصية، جذاذات يومية، غلاف خلفي)",
        "تخطيط ثنائي الفوجين (المسار، اللبنة، الحصة، الأهداف، والأنشطة الأربعة)",
        "إمكانية تخصيص وتعديل أيام وأنشطة الدعم وطباعة ورقية مباشرة مقاس A4",
      ],
    },
    {
      key: "mindmaps" as TabKey,
      title: "بنك الخطاطات الذهنية لحصص التهيئة والدعم (المستوى الأول + TaRL)",
      badge: "حصري • 72 حصة تفاعلية",
      badgeColor: "bg-amber-100 text-amber-950 border-amber-300 font-black",
      icon: Sparkles,
      iconBg: "bg-indigo-600 text-white",
      description:
        "المنصة الشاملة للخطاطات الذهنية البصرية لتخطيط حصص فترة التهيئة والدعم المكثف: 24 حصة للفرنسية (Français 1AEP)، 24 حصة للرياضيات، 24 حصة للغة العربية، بالإضافة إلى خطاطة طارل السحابية (TaRL Français).",
      features: [
        "تغطية كاملة لأسابيع فترة الدعم الأربعة (24 حصة لكل مادة) مع الأهداف والمدد الزمنية",
        "مطابقة بصرية دقيقة للتصميم المعتمد مع إمكانية التعديل، التخصيص، والحفظ المحلي",
        "طباعة ورقية عالية الجودة A4 ونماذج فارغة جاهزة للتعبئة اليدوية",
      ],
    },
    {
      key: "positioning_grids" as TabKey,
      title: "شبكة تفريغ روائز الموضعة (TaRL) - شتنبر 2026",
      badge: "حصري ومطابق للوزارة",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300 font-bold",
      icon: FileSpreadsheet,
      iconBg: "bg-emerald-600 text-white",
      description:
        "الشبكة الرسمية لتفريغ نتائج روائز الموضعة في القراءة (عربية وفرنسية) والحساب والمسألة، مع تعبئة تفاعلية وتصدير لـ Excel و PDF وحساب الإحصائيات.",
      features: [
        "تصدير فوري لملف Excel (.xlsx) و PDF",
        "تعبئة تفاعلية سريعة بنقرة واحدة",
        "حساب تلقائي لنسب ونسب التموضع",
      ],
    },
    {
      key: "level1_tracking_grid" as TabKey,
      title: "شبكة تتبع تقدم تحكم تلاميذ المستوى الأول (1AEP)",
      badge: "وثيقة رسمية معتمدة",
      badgeColor: "bg-rose-100 text-rose-900 border-rose-300 font-black",
      icon: FileCheck2,
      iconBg: "bg-rose-600 text-white",
      description:
        "الشبكة الرسمية لتتبع تقدم تحكم تلاميذ المستوى الأول خلال الأسابيع الأربعة (اللغة العربية: الحروف والمعجم، الفرنسية: Lettre & Vocabulaire، الرياضيات: أعداد من رقم واحد) مع الرائز القبلي والبعدي وحساب نسب التحكم.",
      features: [
        "3 شبكات مستقلة ومجتمعة (عربية، فرنسية، رياضيات)",
        "تعبئة تفاعلية بـ 30 تلميذاً وحساب آلي لنسبة التحكم %",
        "نمط الطباعة الفارغة وتصدير Excel و PDF مقاس A4 لاندسكيب",
      ],
    },
    {
      key: "math_tracking_grids" as TabKey,
      title: "شبكات تتبع مادة الرياضيات (جميع المستويات والمسارات)",
      badge: "وثيقة رسمية معتمدة",
      badgeColor: "bg-blue-100 text-blue-900 border-blue-300 font-black",
      icon: Calculator,
      iconBg: "bg-blue-600 text-white",
      description:
        "الشبكات الرسمية الأربع لتتبع تقدم تحكم المتعلمين في مادة الرياضيات: المستوى 2 (لبنة الجمع)، المستويان 3 و 4 (جمع، طرح، ضرب)، المستويان 5 و 6 (المسار 1 و 2)، والمستويان 5 و 6 (مسار التميز: كسرية، عشرية، هندسة وقياس) مع حساب آلي لنسب التصديق (+) و (-).",
      features: [
        "النماذج الأربعة الرسمية كاملة وفق مقاربة طارل والريادة",
        "حساب آلي لنسبة التصديق % معتمدة سؤال العمليات والإنشاءات الهندسية",
        "تصدير Excel لـ 4 صفحات وطباعة A4 Landscape عالية الجودة",
      ],
    },
    {
      key: "number_line" as TabKey,
      title: "وسيلة تمثيل الأعداد والكسور على خط الأعداد",
      badge: "أداة ديداكتيكية تفاعلية",
      badgeColor: "bg-purple-100 text-purple-900 border-purple-300 font-black",
      icon: Ruler,
      iconBg: "bg-purple-600 text-white",
      description:
        "أداة رقمية ديداكتيكية تفاعلية لتمثيل الأعداد الصحيحة الطبيعية والنسبية، تدريج المستقيم، تمثيل الكسور الاعتيادية والعشرية، وحساب المعكوس الجمعي (-x) والقيمة المطلقة (|x|).",
      features: [
        "تمثيل بصري تفاعلي مع تقسيم الوحدة حتى 12 جزءاً وتغيير المدى",
        "حساب آني للقيمة المطلقة والمعكوس وتصنيف العدد شفهياً وكتابياً",
        "عرض بملء الشاشة مخصص للسبورات التفاعلية والفصول الرقمية",
      ],
    },
    {
      key: "workshop_report" as TabKey,
      title: "تقارير الورشات التذكيرية لدعم التعلمات الأساس (الأيام 1، 2، 3 الشاملة)",
      badge: "النماذج الرسمية الأربعة",
      badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300 font-black",
      icon: ClipboardList,
      iconBg: "bg-emerald-600 text-white",
      description:
        "التقارير الرسمية المعتمدة للورشات التذكيرية لدعم التعلمات الأساس بمؤسسات الريادة: اليوم الأول (روائز الموضعة والتفييء)، اليوم الثاني (هندسة المسارات والبنية الزمنية)، اليوم الثالث (الديداكتيك والأنشطة والتقويم)، والتقرير الإجمالي الشامل.",
      features: [
        "4 نماذج وزارية رسمية كاملة وقابلة للتعديل الشامل",
        "تصدير عالي الدقة PDF (3 صفحات منسقة) و Word (.doc) وطباعة A4",
        "زخارف بيداغوجية مغربية رسمية وأنماط ألوان مخصصة",
      ],
    },
    {
      key: "portfolio" as TabKey,
      title: "الملف التراكمي الشامل للأستاذ(ة)",
      badge: "الريادة & الترقية",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
      icon: FolderKanban,
      iconBg: "bg-blue-600 text-white",
      description:
        "تنظيم كافة الأقسام المهنية: الهوية، التخطيط، التدبير والديداكتيك، التقويم والدعم، والأنشطة المندمجة مع واجهات أنيقة.",
      features: [
        "6 محاور مهنية كاملة",
        "واجهات مطابقة للمعايير الوطنية",
        "توثيق الأثر والترقية المهنية",
      ],
    },
    {
      key: "card" as TabKey,
      title: "البطاقة الشخصية للمدرس (Fiche Personnelle)",
      badge: "المعطيات الإدارية",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
      icon: UserCheck,
      iconBg: "bg-purple-600 text-white",
      description:
        "البطاقة الرسمية الشاملة لكافة البيانات الإدارية والمهنية والدبلومات وتاريخ التعيين ورقم التأجير والمؤسسة وجدول الأقسام المسندة.",
      features: [
        "مربعات التفتيش والتأشير الإداري",
        "طباعة أنيقة داخل إطار وزاري رسمي",
        "حفظ تلقائي محلي للمعطيات",
      ],
    },
    {
      key: "charter" as TabKey,
      title: "ميثاق القسم وقواعد العيش المشترك",
      badge: "الحياة المدرسية",
      badgeColor: "bg-teal-100 text-teal-800 border-teal-200",
      icon: Scroll,
      iconBg: "bg-teal-600 text-white",
      description:
        "صياغة ميثاق القسم التشاركي مع بنود الحقوق والواجبات الإيجابية وأماكن لتوقيع وبصمات التلاميذ ومصادقة إدارة المؤسسة.",
      features: [
        "بنود ديداكتيكية إيجابية ومحفزة",
        "تصميم جذاب للتعليق داخل الفصل",
        "مساحات البصمات وتوقيعات التلاميذ",
      ],
    },
    {
      key: "covers" as TabKey,
      title: "واجهات الملفات والسجلات الرسمية",
      badge: "تخصيص كامل",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
      icon: FileText,
      iconBg: "bg-rose-600 text-white",
      description:
        "توليد واجهات مطبوعة لدفتر النصوص، سجل الغياب، دفتر الملاحظات، المراقبة المستمرة، والملفات التربوية بشعار الوزارة المعتمد.",
      features: [
        "أنماط متعددة الألوان والتنسيقات",
        "تضمين اسم الأستاذ والمؤسسة آلياً",
        "طباعة فورية للغلاف بحجم A4",
      ],
    },
    {
      key: "grids" as TabKey,
      title: "شبكات تفريغ النقط ومطابقة مسار",
      badge: "نقط مسار",
      badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
      icon: Table,
      iconBg: "bg-indigo-600 text-white",
      description:
        "تفريغ نقط الفروض والمراقبة المستمرة لمختلف المواد وحساب المعدلات والنسب المئوية مع تصدير Excel متوافق مع منظومة مسار.",
      features: [
        "حساب فوري للمعدلات والترتيب",
        "مؤشرات نسب النجاح والتحكم",
        "جاهزة للنقل إلى منظومة مسار",
      ],
    },
    {
      key: "holidays" as TabKey,
      title: "لائحة العطل المدرسية الرسمية",
      badge: "2026 / 2027",
      badgeColor: "bg-sky-100 text-sky-800 border-sky-200",
      icon: CalendarRange,
      iconBg: "bg-sky-600 text-white",
      description:
        "جدول العطل البينية والوطنية والدينية الصادرة عن وزارة التربية الوطنية بدقة الأيام والتواريخ مع ملخص الفترات الدراسية.",
      features: [
        "العطل البينية الأولى إلى الرابعة",
        "الأعياد الوطنية والدينية الرسمية",
        "طباعة أنيقة للتعليق بالمكتب",
      ],
    },
    {
      key: "certificates" as TabKey,
      title: "شواهد التقدير والتشجيع للتلاميذ",
      badge: "تحفيز وتكريم",
      badgeColor: "bg-yellow-100 text-yellow-800 border-yellow-200",
      icon: Award,
      iconBg: "bg-yellow-500 text-slate-950",
      description:
        "توليد وتخصيص شواهد التفوق الدراسي، السلوك الحسن، والمشاركة في الأنشطة الموازية بأسماء التلاميذ وتوقيع الأستاذ والإدارة.",
      features: [
        "نماذج كلاسيكية وذهبية فاخرة",
        "طباعة مفردة أو جماعية بأسماء القسم",
        "تخصيص عبارات التهنئة والتشجيع",
      ],
    },
    {
      key: "remarks" as TabKey,
      title: "مولد ملاحظات وبيانات النتائج (AI)",
      badge: "ذكاء بيداغوجي",
      badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-200",
      icon: MessageSquareQuote,
      iconBg: "bg-cyan-600 text-white",
      description:
        "صياغة ملاحظات تربوية دقيقة ومهنية لكل تلميذ حسب معدله ومستواه في مسار، مع بدائل متعددة باللغتين العربية والفرنسية.",
      features: [
        "ملاحظات مصنفة (ممتاز، جيد، متوسط، متعثر)",
        "توجيهات بناءة للدعم والتطوير",
        "نسخ بضغطة زر للصق في مسار",
      ],
    },
    {
      key: "print_preview" as TabKey,
      title: "معاينة الطباعة وتصدير PDF (A4)",
      badge: "معاينة شاملة",
      badgeColor: "bg-slate-200 text-slate-900 border-slate-300",
      icon: Eye,
      iconBg: "bg-slate-800 text-white",
      description:
        "مركز المعاينة والتحقق من الهوامش وجودة الطباعة وتصدير ملفات PDF محكمة دون أي تقطيع في الرؤوس أو التذييلات.",
      features: [
        "تنسيق موحد مقاس A4",
        "طباعة فورية لأي وثيقة",
        "حفظ كملف PDF عالي الجودة",
      ],
    },
  ];

  return (
    <div className="space-y-6" dir="rtl">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-blue-900/40 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-amber-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
              صفحة الأدوات والمولدات التربوية
            </span>
            <span className="text-xs text-blue-200">
              مؤسسة: {teacherProfile.institution || "التعليم الابتدائي"}
            </span>
            <span className="text-xs text-slate-300">•</span>
            <span className="text-xs text-blue-200">
              الأستاذ(ة): {teacherProfile.fullNameAr}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-black font-cairo text-white">
            صفحة الأدوات والوثائق البيداغوجية للأستاذ
          </h2>

          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            بنك الأدوات والمولدات الرسمية المتكاملة: تقرير ورشات الريادة 3P، الملف التراكمي، استعمال الزمن، البطاقة الشخصية، ميثاق القسم، واجهات الملفات، شبكات مسار، العطل، الشواهد التقديرية، ومولد الملاحظات — جاهزة للمعاينة والطباعة الفورية بصيغة A4.
          </p>
        </div>
      </div>

      {/* Explicit Teaching Featured Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-blue-500/10 border border-amber-500/30 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shrink-0 shadow-sm">
            <Presentation className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-black bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-300">
                مدارس الريادة
              </span>
              <h3 className="text-base font-black text-slate-900">
                دروس وموارد التعليم الصريح بالسلك الابتدائي (Enseignement Explicite)
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              عروض PPT تفاعلية جاهزة للمسلاط الضوئي، كراسات التلميذ، ودلائل الأستاذ لجميع مستويات الابتدائي (1AEP إلى 6AEP).
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigateToTab?.("explicit_teaching")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 shrink-0 shadow-xs"
        >
          <span>تصفح فضاء التعليم الصريح</span>
          <ArrowRight className="w-3.5 h-3.5 rotate-180" />
        </button>
      </div>

      {/* Grid of All Consolidated Pedagogical Documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {pedagogicalDocuments.map((doc) => {
          const Icon = doc.icon;
          return (
            <div
              key={doc.key}
              className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${doc.iconBg} group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${doc.badgeColor} inline-block mb-1`}
                      >
                        {doc.badge}
                      </span>
                      <h3 className="font-black text-sm md:text-base text-slate-900 leading-tight">
                        {doc.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {doc.description}
                </p>

                <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 space-y-1.5 text-[11px]">
                  {doc.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onNavigateToTab(doc.key)}
                  className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs py-2 px-3 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>
                    {doc.key === "intensive_support"
                      ? "فتح وتصفح حقيبة الدعم المكثف (1 إلى 6)"
                      : "تجهيز الوثيقة"}
                  </span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => onOpenPrintPreview(doc.key)}
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs p-2 rounded-xl transition cursor-pointer flex items-center gap-1 shadow-2xs"
                  title="معاينة وطباعة A4"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
