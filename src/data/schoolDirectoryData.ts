export interface MoroccoAcademy {
  id: number;
  nameAr: string;
}

export interface MoroccoDirectorate {
  id: number;
  academyId: number;
  nameAr: string;
}

export interface OfficialSchoolLite {
  id: number;
  name_ar: string;
  type: "ابتدائية" | "إعدادية" | "تأهيلية" | string;
}

export type SchoolCycle = "ابتدائية" | "إعدادية" | "تأهيلية";
export type AreaType = "حضري" | "شبه حضري" | "قروي";
export type SubmitterRole = "أستاذ" | "أستاذة" | "مدير(ة)" | "مختص(ة)";

export interface SchoolDirectoryEntry {
  id: string;
  schoolName: string;
  gresaCode?: string;
  academyId: number;
  academyName: string;
  directorateId: number;
  directorateName: string;
  commune?: string;
  cycle: SchoolCycle;
  submitterRole: SubmitterRole;
  areaType: AreaType;
  areaDescription: string;
  phone?: string;
  facebookLink?: string;
  mapsLink?: string;
  canRent: "متوفر بسهولة" | "يحتاج التنقل يومياً";
  nearbyRentalPlaces?: string;
  transportAvailable: "متوفرة وميسرة" | "صعبة أو مكلفة";
  transportDesc?: string;
  environmentSafety: "آمنة ومأهولة" | "هادئة (تستوجب الحذر ليلاً)" | "معزولة نسبياً";
  envServices: string[];
  communityWelcome: "طيبة ومحترمة للأطر" | "تعامل عادي" | "تواصل محدود";
  studentBehavior: string;
  staffAtmosphere: "مندمجين واجتماعيين" | "منعزلون / عمل محدود";
  schoolSize: "كبيرة" | "صغيرة";
  schoolSizeDesc?: string;
  estimatedMovementPoints?: string;
  extraNotes?: string;
  createdAt: string;
  isSeeded?: boolean;
}

export interface MovementWishItem {
  id: string;
  schoolName: string;
  gresaCode?: string;
  directorateName: string;
  academyName: string;
  cycle: SchoolCycle;
  areaType: AreaType;
  estimatedPoints?: string;
}

export const MOROCCO_ACADEMIES: MoroccoAcademy[] = [
  { id: 1, nameAr: "جهة الرباط سلا القنيطرة" },
  { id: 2, nameAr: "جهة الدار البيضاء سطات" },
  { id: 3, nameAr: "جهة فاس مكناس" },
  { id: 4, nameAr: "جهة مراكش آسفي" },
  { id: 5, nameAr: "جهة كلميم واد نون" },
  { id: 6, nameAr: "جهة الشرق" },
  { id: 7, nameAr: "جهة سوس ماسة" },
  { id: 8, nameAr: "جهة طنجة تطوان الحسيمة" },
  { id: 9, nameAr: "جهة العيون الساقية الحمراء" },
  { id: 10, nameAr: "جهة بني ملال خنيفرة" },
  { id: 11, nameAr: "جهة درعة تافيلالت" },
  { id: 12, nameAr: "جهة الداخلة وادي الذهب" },
];

export const MOROCCO_DIRECTORATES: MoroccoDirectorate[] = [
  { id: 9402, academyId: 5, nameAr: "آسا الزاك" },
  { id: 9307, academyId: 4, nameAr: "آسفي" },
  { id: 9903, academyId: 10, nameAr: "أزيلال" },
  { id: 9601, academyId: 7, nameAr: "أكادير إداوتنان" },
  { id: 10102, academyId: 12, nameAr: "أوسرد" },
  { id: 9204, academyId: 3, nameAr: "إفران" },
  { id: 9602, academyId: 7, nameAr: "إنزكان أيت ملول" },
  { id: 9007, academyId: 2, nameAr: "ابن مسيك" },
  { id: 9604, academyId: 7, nameAr: "اشتوكة أيت باها" },
  { id: 9015, academyId: 2, nameAr: "الجديدة" },
  { id: 9206, academyId: 3, nameAr: "الحاجب" },
  { id: 9707, academyId: 8, nameAr: "الحسيمة" },
  { id: 9305, academyId: 4, nameAr: "الحوز" },
  { id: 9004, academyId: 2, nameAr: "الحي الحسني" },
  { id: 9107, academyId: 1, nameAr: "الخميسات" },
  { id: 9001, academyId: 2, nameAr: "الدار البيضاء - أنفا" },
  { id: 9507, academyId: 6, nameAr: "الدريوش" },
  { id: 10004, academyId: 11, nameAr: "الراشيدية" },
  { id: 9101, academyId: 1, nameAr: "الرباط" },
  { id: 9302, academyId: 4, nameAr: "الرحامنة" },
  { id: 9804, academyId: 9, nameAr: "السمارة" },
  { id: 9103, academyId: 1, nameAr: "الصخيرات تمارة" },
  { id: 9308, academyId: 4, nameAr: "الصويرة" },
  { id: 9706, academyId: 8, nameAr: "العرائش" },
  { id: 9801, academyId: 9, nameAr: "العيون" },
  { id: 9702, academyId: 8, nameAr: "الفحص أنجرة" },
  { id: 9002, academyId: 2, nameAr: "الفداء - مرس السلطان" },
  { id: 9902, academyId: 10, nameAr: "الفقيه بن صالح" },
  { id: 9104, academyId: 1, nameAr: "القنيطرة" },
  { id: 9009, academyId: 2, nameAr: "المحمدية" },
  { id: 9703, academyId: 8, nameAr: "المضيق الفنيدق" },
  { id: 9502, academyId: 6, nameAr: "الناظور" },
  { id: 9012, academyId: 2, nameAr: "النواصر" },
  { id: 9306, academyId: 4, nameAr: "اليوسفية" },
  { id: 9013, academyId: 2, nameAr: "برشيد" },
  { id: 9503, academyId: 6, nameAr: "بركان" },
  { id: 9010, academyId: 2, nameAr: "بنسليمان" },
  { id: 9901, academyId: 10, nameAr: "بني ملال" },
  { id: 9803, academyId: 9, nameAr: "بوجدور" },
  { id: 9207, academyId: 3, nameAr: "بولمان" },
  { id: 9603, academyId: 7, nameAr: "تارودانت" },
  { id: 9205, academyId: 3, nameAr: "تازة" },
  { id: 9504, academyId: 6, nameAr: "تاوريرت" },
  { id: 9209, academyId: 3, nameAr: "تاونات" },
  { id: 9704, academyId: 8, nameAr: "تطوان" },
  { id: 10003, academyId: 11, nameAr: "تنغير" },
  { id: 9605, academyId: 7, nameAr: "تيزنيت" },
  { id: 9505, academyId: 6, nameAr: "جرادة" },
  { id: 9506, academyId: 6, nameAr: "جرسيف" },
  { id: 9905, academyId: 10, nameAr: "خريبكة" },
  { id: 9904, academyId: 10, nameAr: "خنيفرة" },
  { id: 10002, academyId: 11, nameAr: "زاكورة" },
  { id: 9014, academyId: 2, nameAr: "سطات" },
  { id: 9102, academyId: 1, nameAr: "سلا" },
  { id: 9404, academyId: 5, nameAr: "سيدي إفني" },
  { id: 9006, academyId: 2, nameAr: "سيدي البرنوصي" },
  { id: 9016, academyId: 2, nameAr: "سيدي بنور" },
  { id: 9106, academyId: 1, nameAr: "سيدي سليمان" },
  { id: 9105, academyId: 1, nameAr: "سيدي قاسم" },
  { id: 9705, academyId: 8, nameAr: "شفشاون" },
  { id: 9303, academyId: 4, nameAr: "شيشاوة" },
  { id: 9203, academyId: 3, nameAr: "صفرو" },
  { id: 9606, academyId: 7, nameAr: "طاطا" },
  { id: 9403, academyId: 5, nameAr: "طانطان" },
  { id: 9802, academyId: 9, nameAr: "طرفاية" },
  { id: 9701, academyId: 8, nameAr: "طنجة أصيلة" },
  { id: 9003, academyId: 2, nameAr: "عين السبع - الحي المحمدي" },
  { id: 9008, academyId: 2, nameAr: "عين الشق" },
  { id: 9201, academyId: 3, nameAr: "فاس" },
  { id: 9508, academyId: 6, nameAr: "فكيك" },
  { id: 9304, academyId: 4, nameAr: "قلعة السراغنة" },
  { id: 9401, academyId: 5, nameAr: "كلميم" },
  { id: 9011, academyId: 2, nameAr: "مديونة" },
  { id: 9301, academyId: 4, nameAr: "مراكش" },
  { id: 9202, academyId: 3, nameAr: "مكناس" },
  { id: 9005, academyId: 2, nameAr: "مولاي رشيد - سيدي عثمان" },
  { id: 9208, academyId: 3, nameAr: "مولاي يعقوب" },
  { id: 10005, academyId: 11, nameAr: "ميدلت" },
  { id: 10101, academyId: 12, nameAr: "وادي الذهب" },
  { id: 9501, academyId: 6, nameAr: "وجدة أنجاد" },
  { id: 10001, academyId: 11, nameAr: "ورزازات" },
  { id: 9708, academyId: 8, nameAr: "وزان" },
];

export const ENV_SERVICE_OPTIONS: string[] = [
  "إنترنت وشبكة جيدة",
  "دكاكين / محلات تغذية",
  "ماء شروب وكهرباء",
  "مستوصف صحي قريب",
  "مسجد قريب",
  "طريق معبدة حتى المؤسسة",
];

export const INITIAL_SCHOOL_DIRECTORY: SchoolDirectoryEntry[] = [
  {
    id: "sch-agadir-1",
    schoolName: "مجموعة مدارس أيت تامر (المركزية)",
    gresaCode: "09412A",
    academyId: 7,
    academyName: "جهة سوس ماسة",
    directorateId: 9601,
    directorateName: "أكادير إداوتنان",
    commune: "التامري / إداوتنان",
    cycle: "ابتدائية",
    submitterRole: "أستاذ",
    areaType: "قروي",
    areaDescription:
      "تقع على الطريق الوطنية رقم 1 شمال أكادير، محيط حيوي قريب من مركز التامري ويتوفر على مقاهي ودكاكين.",
    phone: "0528-39-14-20",
    mapsLink: "https://www.google.com/maps/search/Tamri+Agadir",
    canRent: "متوفر بسهولة",
    nearbyRentalPlaces: "مركز التامري أو إمسوان (شقق واستوديوهات بأثمنة متوسطة)",
    transportAvailable: "متوفرة وميسرة",
    transportDesc: "سيارات الأجرة الكبيرة والحافلات متوفرة باستمرار نحو أكادير",
    environmentSafety: "آمنة ومأهولة",
    envServices: [
      "إنترنت وشبكة جيدة",
      "دكاكين / محلات تغذية",
      "ماء شروب وكهرباء",
      "مستوصف صحي قريب",
      "مسجد قريب",
      "طريق معبدة حتى المؤسسة",
    ],
    communityWelcome: "طيبة ومحترمة للأطر",
    studentBehavior: "تلاميذ منضبطون ومواظبون مع تفاعل جيد للأسر.",
    staffAtmosphere: "مندمجين واجتماعيين",
    schoolSize: "كبيرة",
    schoolSizeDesc: "مركزية مندمجة تضم 8 حجرات وفضاء للأنشطة، من مؤسسات الريادة.",
    estimatedMovementPoints: "24 – 36 نقطة",
    extraNotes: "مناسبة للأساتذة الراغبين في الاستقرار قرب الساحل مع سهولة التنقل نحو أكادير.",
    createdAt: "2026-10-18",
    isSeeded: true,
  },
  {
    id: "sch-tinghir-1",
    schoolName: "الثانوية الإعدادية مضايق تودغى",
    gresaCode: "14820C",
    academyId: 11,
    academyName: "جهة درعة تافيلالت",
    directorateId: 10003,
    directorateName: "تنغير",
    commune: "تودغى العليا",
    cycle: "إعدادية",
    submitterRole: "أستاذة",
    areaType: "شبه حضري",
    areaDescription:
      "توجد بمحيط سياحي جميل قرب مضايق تودغى على بعد دقائق من مركز مدينة تنغير.",
    phone: "0524-83-42-11",
    mapsLink: "https://www.google.com/maps/search/Tinghir+Morocco",
    canRent: "متوفر بسهولة",
    nearbyRentalPlaces: "أحياء وسط تنغير أو أفانور بأثمنة مناسبة جداً",
    transportAvailable: "متوفرة وميسرة",
    transportDesc: "طاكسيات كبيرة من وسط تنغير كل 10 دقائق",
    environmentSafety: "آمنة ومأهولة",
    envServices: [
      "إنترنت وشبكة جيدة",
      "دكاكين / محلات تغذية",
      "ماء شروب وكهرباء",
      "مستوصف صحي قريب",
      "مسجد قريب",
      "طريق معبدة حتى المؤسسة",
    ],
    communityWelcome: "طيبة ومحترمة للأطر",
    studentBehavior: "مستوى تحصيل متوسط إلى جيد وسلوك محترم عموماً.",
    staffAtmosphere: "مندمجين واجتماعيين",
    schoolSize: "كبيرة",
    schoolSizeDesc: "تتوفر على قاعات متعددة الوسائط ومختبرات علمية مجهزة.",
    estimatedMovementPoints: "18 – 28 نقطة",
    extraNotes: "الجو بارد نسبياً في الشتاء ومعتدل بقية السنة، والساكنة محبة للتعليم.",
    createdAt: "2026-10-20",
    isSeeded: true,
  },
  {
    id: "sch-chefchaouen-1",
    schoolName: "مجموعة مدارس بني أحمد الجبلية",
    gresaCode: "07215B",
    academyId: 8,
    academyName: "جهة طنجة تطوان الحسيمة",
    directorateId: 9705,
    directorateName: "شفشاون",
    commune: "بني أحمد الشرقية",
    cycle: "ابتدائية",
    submitterRole: "أستاذ",
    areaType: "قروي",
    areaDescription:
      "منطقة جبلية خضراء تابعة لدائرة باب برد، طريق معبدة حتى المركزية ومسالك نحو بعض الفرعيات.",
    phone: "0539-98-11-45",
    canRent: "متوفر بسهولة",
    nearbyRentalPlaces: "مركز باب برد أو كراء مشترك مع الزملاء بالسكن الوظيفي",
    transportAvailable: "صعبة أو مكلفة",
    transportDesc: "نقل مزدوج وطاكسيات خاصة من شفشاون نحو باب برد",
    environmentSafety: "هادئة (تستوجب الحذر ليلاً)",
    envServices: [
      "دكاكين / محلات تغذية",
      "ماء شروب وكهرباء",
      "مسجد قريب",
      "طريق معبدة حتى المؤسسة",
    ],
    communityWelcome: "طيبة ومحترمة للأطر",
    studentBehavior: "تلاميذ بسطاء ومنضبطون رغم صعوبة التضاريس شتاءً.",
    staffAtmosphere: "مندمجين واجتماعيين",
    schoolSize: "صغيرة",
    schoolSizeDesc: "مركزية و3 فرعيات قريبة تتوفر على تدفئة وسكنيات وظيفية صالحة.",
    estimatedMovementPoints: "12 – 18 نقطة",
    extraNotes: "تأكد عند التعيين أو الحركة هل المنصب بالمركزية أم بإحدى الوحدات الفرعية.",
    createdAt: "2026-10-24",
    isSeeded: true,
  },
  {
    id: "sch-marrakech-1",
    schoolName: "مدرسة ابن خلدون الابتدائية",
    gresaCode: "04109M",
    academyId: 4,
    academyName: "جهة مراكش آسفي",
    directorateId: 9301,
    directorateName: "مراكش",
    commune: "جليز / المنارة",
    cycle: "ابتدائية",
    submitterRole: "مدير(ة)",
    areaType: "حضري",
    areaDescription:
      "مؤسسة حضرية بمقاطعة المنارة قريبة من جميع المرافق الإدارية وخطوط الحافلات.",
    phone: "0524-43-19-82",
    mapsLink: "https://www.google.com/maps/search/Marrakech+Morocco",
    canRent: "متوفر بسهولة",
    nearbyRentalPlaces: "أحياء المسيرة والمحاميد وداوديات",
    transportAvailable: "متوفرة وميسرة",
    transportDesc: "حافلات ألزا وطاكسيات صغيرة متوفرة طيلة اليوم",
    environmentSafety: "آمنة ومأهولة",
    envServices: [
      "إنترنت وشبكة جيدة",
      "دكاكين / محلات تغذية",
      "ماء شروب وكهرباء",
      "مستوصف صحي قريب",
      "مسجد قريب",
      "طريق معبدة حتى المؤسسة",
    ],
    communityWelcome: "طيبة ومحترمة للأطر",
    studentBehavior: "متابَعون من أسرهم والمؤسسة منخرطة في مشروع مدارس الريادة.",
    staffAtmosphere: "مندمجين واجتماعيين",
    schoolSize: "كبيرة",
    schoolSizeDesc: "14 حجرة دراسية مجهزة بالمسلاط الضوئي وقاعة للموارد البيداغوجية.",
    estimatedMovementPoints: "48 – 64 نقطة",
    extraNotes: "مؤسسة نشيطة تربوياً، يتطلب الالتحاق بها بالحركة الوطنية أو الجهوية رصيد نقط مرتفع.",
    createdAt: "2026-11-01",
    isSeeded: true,
  },
  {
    id: "sch-casablanca-1",
    schoolName: "الثانوية التأهيلية الخوارزمي",
    gresaCode: "02084T",
    academyId: 2,
    academyName: "جهة الدار البيضاء سطات",
    directorateId: 9001,
    directorateName: "الدار البيضاء - أنفا",
    commune: "أنفا",
    cycle: "تأهيلية",
    submitterRole: "أستاذ",
    areaType: "حضري",
    areaDescription: "موقع مركزي بالدار البيضاء قرب خطوط الترامواي والمحطات الطرقية.",
    phone: "0522-27-81-04",
    canRent: "متوفر بسهولة",
    nearbyRentalPlaces: "الأحياء المجاورة أو التنقل عبر الترامواي من مختلف مناطق المدينة",
    transportAvailable: "متوفرة وميسرة",
    transportDesc: "الترامواي والحافلات وسيارات الأجرة",
    environmentSafety: "آمنة ومأهولة",
    envServices: [
      "إنترنت وشبكة جيدة",
      "دكاكين / محلات تغذية",
      "ماء شروب وكهرباء",
      "مستوصف صحي قريب",
      "مسجد قريب",
      "طريق معبدة حتى المؤسسة",
    ],
    communityWelcome: "تعامل عادي",
    studentBehavior: "شعب علمية وتقنية بمستوى تحصيل جيد واهتمام بالتوجيه.",
    staffAtmosphere: "مندمجين واجتماعيين",
    schoolSize: "كبيرة",
    schoolSizeDesc: "بنية تحتية متكاملة بمختبرات فيزياء وكيمياء وقاعات إعلاميات.",
    estimatedMovementPoints: "42 – 58 نقطة",
    createdAt: "2026-11-03",
    isSeeded: true,
  },
  {
    id: "sch-fes-1",
    schoolName: "الثانوية الإعدادية الزرقطوني",
    gresaCode: "03190K",
    academyId: 3,
    academyName: "جهة فاس مكناس",
    directorateId: 9201,
    directorateName: "فاس",
    commune: "أكدال / فاس",
    cycle: "إعدادية",
    submitterRole: "أستاذة",
    areaType: "حضري",
    areaDescription: "إعدادية حضرية بوسط مدينة فاس الجديدة قرب المرافق العمومية.",
    phone: "0535-62-54-90",
    canRent: "متوفر بسهولة",
    nearbyRentalPlaces: "وسط المدينة، حي الأطلس، طريق صفرو",
    transportAvailable: "متوفرة وميسرة",
    transportDesc: "حافلات المدينة والطاكسيات الصغيرة متوفرة بوفرة",
    environmentSafety: "آمنة ومأهولة",
    envServices: [
      "إنترنت وشبكة جيدة",
      "دكاكين / محلات تغذية",
      "ماء شروب وكهرباء",
      "مستوصف صحي قريب",
      "مسجد قريب",
      "طريق معبدة حتى المؤسسة",
    ],
    communityWelcome: "طيبة ومحترمة للأطر",
    studentBehavior: "اجتهاد ملحوظ وتعاون جيد مع جمعية أمهات وآباء التلاميذ.",
    staffAtmosphere: "مندمجين واجتماعيين",
    schoolSize: "كبيرة",
    schoolSizeDesc: "قاعات مجهزة وفضاء رياضي ومساحة خضراء.",
    estimatedMovementPoints: "38 – 52 نقطة",
    createdAt: "2026-11-05",
    isSeeded: true,
  },
  {
    id: "sch-azilal-1",
    schoolName: "مجموعة مدارس أيت بوكماز",
    gresaCode: "10542R",
    academyId: 10,
    academyName: "جهة بني ملال خنيفرة",
    directorateId: 9903,
    directorateName: "أزيلال",
    commune: "تبانت",
    cycle: "ابتدائية",
    submitterRole: "أستاذ",
    areaType: "قروي",
    areaDescription:
      "تقع بالهضبة السعيدة (أيت بوكماز)، منطقة ذات طبيعة خلابة وطريق معبد حتى مركز تبانت.",
    phone: "0523-45-90-12",
    canRent: "متوفر بسهولة",
    nearbyRentalPlaces: "مركز تبانت أو الإقامة بالسكن الوظيفي للمؤسسة",
    transportAvailable: "صعبة أو مكلفة",
    transportDesc: "نقل مزدوج وطاكسيات نحو أزيلال صباحاً ومساءً",
    environmentSafety: "آمنة ومأهولة",
    envServices: [
      "دكاكين / محلات تغذية",
      "ماء شروب وكهرباء",
      "مستوصف صحي قريب",
      "مسجد قريب",
      "طريق معبدة حتى المؤسسة",
    ],
    communityWelcome: "طيبة ومحترمة للأطر",
    studentBehavior: "تلاميذ خلوقون ومقبلون على الدراسة بحماس.",
    staffAtmosphere: "مندمجين واجتماعيين",
    schoolSize: "صغيرة",
    schoolSizeDesc: "مركزية بها 6 أقسام وسكن وظيفي مهيأ.",
    estimatedMovementPoints: "10 – 16 نقطة",
    extraNotes: "الثلوج تتساقط شتاءً مما يستوجب أخذ الاحتياطات في اللباس والتدفئة.",
    createdAt: "2026-11-07",
    isSeeded: true,
  },
  {
    id: "sch-rabat-1",
    schoolName: "مدرسة حسان بن ثابت الابتدائية",
    gresaCode: "01024E",
    academyId: 1,
    academyName: "جهة الرباط سلا القنيطرة",
    directorateId: 9101,
    directorateName: "الرباط",
    commune: "حسان / الرباط",
    cycle: "ابتدائية",
    submitterRole: "أستاذة",
    areaType: "حضري",
    areaDescription: "وسط العاصمة الرباط قرب خط الترامواي ومقرات المديريات.",
    phone: "0537-70-33-18",
    canRent: "متوفر بسهولة",
    nearbyRentalPlaces: "أحياء حسان وأكدال وسلا المدينة عبر الترامواي",
    transportAvailable: "متوفرة وميسرة",
    transportDesc: "ترامواي الرباط سلا وحافلات النقل الحضري",
    environmentSafety: "آمنة ومأهولة",
    envServices: [
      "إنترنت وشبكة جيدة",
      "دكاكين / محلات تغذية",
      "ماء شروب وكهرباء",
      "مستوصف صحي قريب",
      "مسجد قريب",
      "طريق معبدة حتى المؤسسة",
    ],
    communityWelcome: "طيبة ومحترمة للأطر",
    studentBehavior: "انضباط ومشاركة متميزة للأسر في الحياة المدرسية.",
    staffAtmosphere: "مندمجين واجتماعيين",
    schoolSize: "كبيرة",
    schoolSizeDesc: "مدرسة رائدة مجهزة بالكامل بالأدوات الرقمية.",
    estimatedMovementPoints: "55 – 72 نقطة",
    createdAt: "2026-11-09",
    isSeeded: true,
  },
];

export const MOVEMENT_GUIDANCE_TIPS = [
  {
    title: "التحقق الدقيق من رمز GRESA",
    description:
      "تأكد دائماً من مطابقة رمز المؤسسة الرسمي المكون من 5 أرقام وحرف قبل ترتيب الرغبات، لمنع الخلط بين مؤسسات تحمل الاسم نفسه في جماعات مختلفة.",
  },
  {
    title: "التمييز بين المركزية والوحدات الفرعية",
    description:
      "في المجموعات المدرسية الابتدائية بالعالم القروي، قد يكون المنصب الشاغر في وحدة فرعية نائية وليس بالمركزية، لذلك استفسر مسبقاً عن مقرات الفرعيات ومسالكها.",
  },
  {
    title: "مراعاة التضاريس والمناخ والنقل الأسبوعي",
    description:
      "تؤثر المسالك الجبلية والأمطار والثلوج شتاءً على حرية التنقل الأسبوعي ووفرة النقل المزدوج، كما يحدد توفر السكن الوظيفي أو الكراء استقرارك اليومي.",
  },
  {
    title: "الترتيب الذكي لبطاقة الرغبات (الـ 10 اختيارات)",
    description:
      "ضع المؤسسات الأكثر تفضيلاً في المراتب الأولى دون اعتبار لنقطك فقط، ثم أدرج مؤسسات احتياطية مضمونة ضمن باقي الاختيارات بناءً على العتبات التقريبية.",
  },
];

export const SCHOOL_DIRECTORY_FAQS = [
  {
    q: "كيف أبحث في دليل المؤسسات التعليمية حسب الأكاديمية والمديرية؟",
    a: "اختر الأكاديمية الجهوية والمديرية الإقليمية من القوائم المنسدلة (تغطي جميع الأكاديميات الـ 12 والمديريات الـ 82)، ويمكنك أيضاً تحديد السلك والوسط الجغرافي أو البحث باسم المؤسسة ورمز GRESA فورياً.",
  },
  {
    q: "كيف أساهم بمعلومات جديدة عن مؤسستي لمساعدة الزملاء؟",
    a: "انتقل إلى تبويب «إضافة معلومات مؤسسة»، ثم مرّ عبر المراحل المنظمة لإدخال المعطيات الواقعية (المجال الجغرافي، السكن والكراء، النقل، الخدمات والأمان، أجواء العمل)، ليتم نشر البطاقة مباشرة في الدليل.",
  },
  {
    q: "كيف تُحتسب نقط الحركة الانتقالية الوطنية والجهوية؟",
    a: "تُحتسب بناءً على الأقدمية العامة في التعليم (نقطة عن كل سنة)، والاستقرار بالمؤسسة الحالية والمديرية الإقليمية، إضافة إلى نقط الامتياز العائلي (الالتحاق بالزوج أو التجمع العائلي) ونقط المناطق النائية وفق المذكرات المنظمة للحركة.",
  },
  {
    q: "هل يمكنني طباعة بطاقة المؤسسة أو قائمة الرغبات المرتبة؟",
    a: "نعم، تتيح المنصة طباعة أي بطاقة مؤسسة مفصلة أو طباعة بطاقة الرغبات المرتبة بصيغة A4 / PDF مباشرة للاستعانة بها عند التسجيل في بوابة الحركة الانتقالية.",
  },
];
