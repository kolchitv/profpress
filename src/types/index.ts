export type TabKey =
  | "home"
  | "news"
  | "articles"
  | "competitions"
  | "inspection_competition"
  | "orientation_planning"
  | "explicit_teaching"
  | "pedagogical_docs"
  | "daily_log"
  | "workshop_report"
  | "portfolio"
  | "timetable"
  | "card"
  | "charter"
  | "covers"
  | "grids"
  | "positioning_grids"
  | "holidays"
  | "certificates"
  | "remarks"
  | "print_preview"
  | "contact"
  // التعليم الابتدائي
  | "primary_1" // الأول ابتدائي
  | "primary_2" // الثاني ابتدائي
  | "primary_3" // الثالث ابتدائي
  | "primary_4" // الرابع ابتدائي
  | "primary_5" // الخامس ابتدائي
  | "primary_6" // السادس ابتدائي
  // التعليم الإعدادي
  | "middle_1" // الأولى ثانوي إعدادي
  | "middle_2" // الثانية ثانوي إعدادي
  | "middle_3" // الثالثة ثانوي إعدادي
  // التعليم الثانوي
  | "high_common" // الجذع المشترك
  | "high_1bac" // الأولى باكالوريا
  | "high_2bac" // الثانية باكالوريا
  // توجيه ومباريات
  | "orientation";

export type EducationalCycleType = "primary" | "middle" | "high";

export type GradeLevelId =
  | "primary_1"
  | "primary_2"
  | "primary_3"
  | "primary_4"
  | "primary_5"
  | "primary_6"
  | "middle_1"
  | "middle_2"
  | "middle_3"
  | "high_common"
  | "high_1bac"
  | "high_2bac";

export interface EducationalResourceItem {
  id: string;
  title: string;
  category: "lessons" | "exams" | "planning" | "guidelines" | "textbooks";
  subject: string;
  semester?: "s1" | "s2" | "annual";
  format: "PDF" | "DOCX" | "A4 Print" | "Interactive";
  description: string;
  downloadUrl?: string;
  updatedDate: string;
  downloadsCount: number;
  featured?: boolean;
  tags: string[];
}

export interface EducationalLevelInfo {
  id: GradeLevelId;
  title: string;
  shortTitle: string;
  cycle: EducationalCycleType;
  cycleTitle: string;
  themeColor: {
    bg: string;
    border: string;
    text: string;
    badge: string;
    lightBg: string;
    hoverBg: string;
    accent: string;
  };
  description: string;
  academicYear: string;
  subjects: string[];
  totalResources: number;
  featuredExam?: {
    name: string;
    type: string;
    dateDescription: string;
    countdownDays?: number;
  };
  pioneerFeatures?: string[];
  resources: EducationalResourceItem[];
}

export type TopicCategory =
  | "memo" // مذكرة
  | "announcement" // إعلان
  | "article" // مقال
  | "communique" // بلاغ
  | "results"; // نتائج وترقيات

export interface SeoMetadata {
  focusKeyword: string;
  seoTitle: string;
  slug: string;
  metaDescription: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export type FileTypeOption =
  | "pdf"
  | "word"
  | "excel"
  | "pptx"
  | "drive"
  | "mediafire"
  | "zip"
  | "other";

export interface DownloadLinkItem {
  id: string;
  label: string;
  url: string;
  fileType?: FileTypeOption;
  fileSize?: string;
  note?: string;
  directDownload?: boolean;
}

export interface AdSenseSettings {
  isEnabled: boolean;
  publisherId: string;
  autoAdsEnabled: boolean;
  topBannerAdCode: string;
  middleBannerAdCode: string;
  bottomBannerAdCode: string;
  topAdCode?: string;
  middleAdCode?: string;
  bottomAdCode?: string;
  showDemoAdsIfEmpty: boolean;
  showPlaceholderAds?: boolean;
}

export interface DownloadGatewaySettings {
  isEnabled: boolean;
  countdownSeconds: number;
  autoRedirect: boolean;
  safeCheckBadge: boolean;
  customNoticeText: string;
  adSettings: AdSenseSettings;
}

export interface TopicItem {
  id: string;
  title: string;
  category: TopicCategory;
  categoryLabel: string;
  date: string;
  gregorianDate?: string;
  author: string;
  urgent?: boolean;
  summary: string;
  content: string;
  highlights?: string[];
  tags: string[];
  downloadUrl?: string;
  downloadLabel?: string;
  downloads?: DownloadLinkItem[];
  seo: SeoMetadata;
  viewsCount?: number;
  readTimeMinutes?: number;
  featured?: boolean;
  isCustom?: boolean;
  status?: "published" | "draft" | "archived";
}

export interface AdminSession {
  isAdmin: boolean;
  adminName: string;
  adminEmail: string;
  role: "super_admin" | "editor" | "visitor";
  canDeleteTopics?: boolean;
  lastLogin?: string;
}

export interface VisitorPermissions {
  canReadTopics: boolean;
  canDownloadAttachments: boolean;
  canShareWhatsApp: boolean;
  canSuggestTopics: boolean;
  canEditTopics: boolean; // Strictly false for visitors; editing is reserved for admin (kolchitv@gmail.com)
  canCustomizeDocumentInfo: boolean; // True for visitors (editing teacher personal details in docs)
  canCustomizeDocumentColors: boolean; // True for visitors (editing colors & themes in docs)
  requireApprovalBeforePublish: boolean;
  showRankMathBadgeToVisitors: boolean;
  allowComments: boolean;
}

export interface CustomCodeSettings {
  headerCode: string; // Injected into <head> (meta tags, tracking scripts, CSS)
  bodyStartCode: string; // Injected at start of <body> (GTM noscript, top banners)
  footerCode: string; // Injected before </body> (live chat, ad scripts, footer trackers)
  isEnabled: boolean; // Master toggle to enable/disable scripts
  lastUpdated?: string;
}

export interface TopicProposal {
  id: string;
  title: string;
  category: TopicCategory;
  authorName: string;
  authorEmail: string;
  institution: string;
  summary: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}

export interface WorkshopTechnicalCard {
  targetAudience: string; // المستهدفون بالدورة
  sessionNature: string; // طبيعة المحطة والتكوين
  axes: string; // المحاور البيداغوجية
  strategicObjective: string; // الهدف الاستراتيجي
}

export interface MathActivityRow {
  id: string;
  domain: string; // مجال النشاط
  activities: string; // الأنشطة والوسائل المعتمدة
}

export interface MathLevelRow {
  id: string;
  level: string; // المستوى الدراسي
  structure: string; // هيكلة المسارات والتدرج البيداغوجي
}

export interface ArabicPathRow {
  id: string;
  path: string; // المسار
  startAndProgression: string; // نقطة الانطلاق والامتداد البيداغوجي
}

export interface WorkshopReportData {
  title: string;
  dayNumber: string; // مثلا: "اليوم الثالث"
  subtitle: string;
  projectName: string;
  dateText: string;
  preparedBy: string;
  institution: string;
  academicYear: string;
  technicalCard: WorkshopTechnicalCard;
  generalIntro: string;

  // Math
  mathIntro: string;
  mathActivities?: MathActivityRow[];
  mathLevels: MathLevelRow[];
  mathBlocks: string[];

  // Arabic
  arabicIntro: string;
  arabicPaths: ArabicPathRow[];
  arabicNotes: string[];
  arabicValidationTitle: string;
  arabicValidationText: string;

  // French
  frenchTitle: string;
  frenchIntro: string;
  frenchBullets: string[];
  frenchValidationTitle: string;
  frenchValidationText: string;

  // Synthesis
  synthesisTitle: string;
  synthesisText: string;

  // Signatures
  teacherName: string;
  directorName: string;
  inspectorName: string;
  city: string;
  signDate: string;
}

export interface TeacherProfile {
  fullNameAr: string;
  fullNameFr: string;
  somNumber: string; // N° SOM (رقم التأجير)
  cin: string; // N° CIN (بطاقة التعريف الوطنية)
  academy: string; // الأكاديمية الجهوية للتربية والتكوين
  directorate: string; // المديرية الإقليمية
  institution: string; // المؤسسة التعليمية
  commune: string; // الجماعة
  grade: string; // الدرجة والإطار
  echelon: string; // الرتبة
  assignedLevel: string; // المستوى المسند (الأول إلى السادس)
  subjectTaught: string; // لغة التدريس (عربية / فرنسية / مزدوج)
  classGroups: string; // القسم والأفواج
  totalStudents: number;
  femaleStudents: number;
  maleStudents: number;
  recruitmentDate: string; // تاريخ التوظيف
  schoolAssignmentDate: string; // تاريخ التعيين بالمؤسسة
  phone: string;
  email: string;
  schoolYear: string;
}

export interface TimetableSlot {
  id: string;
  day: string; // الاثنين، الثلاثاء، ...
  startTime: string;
  endTime: string;
  subject: string;
  unitOrActivity: string; // المكون أو الحصة (مثلا: القراءة، الدعم المكثف، التعليم الصريح)
  group: string; // الفوج 1 أو الفوج 2 أو الكل
  color?: string;
}

export interface TimetableConfig {
  mode: "pioneer" | "standard"; // مدرسة الريادة (التعليم الصريح والدعم) أو عادية
  cycle: "single_level" | "multi_level"; // أحادي المستوى أو مشترك
  morningStart: string;
  morningEnd: string;
  afternoonStart: string;
  afternoonEnd: string;
  slots: TimetableSlot[];
  notes: string;
}

export interface ClassRuleItem {
  id: string;
  title: string;
  description: string;
  category: "respect" | "work" | "discipline" | "cleanliness";
  iconName: string;
}

export interface FileCoverConfig {
  title: string;
  subTitle: string;
  theme: "royal" | "modern" | "islamic" | "pioneer";
  colorScheme: "emerald" | "amber" | "blue" | "burgundy";
  dossierType: string;
  authorName: string;
  schoolName: string;
  academicYear: string;
  level: string;
  quote: string;
}

export interface StudentGrade {
  id: string;
  massarCode: string;
  name: string;
  gender: "M" | "F";
  exam1: number;
  exam2: number;
  activities: number;
  average: number;
  status: "controlle" | "en_cours" | "non_acquis"; // متحكم، في طور الاكتساب، غير متحكم
  remark: string;
}

export interface EvaluationGridConfig {
  subject: string;
  level: string;
  period: "الدورة الأولى" | "الدورة الثانية";
  testNumber: "الفرض 1" | "الفرض 2" | "الروائز التشخيصية";
  students: StudentGrade[];
}

export interface HolidayItem {
  id: string;
  nameAr: string;
  nameFr: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  hijriDate?: string;
  type: "religious" | "national" | "periodique";
}

export interface CertificateItem {
  id: string;
  studentName: string;
  gender: "M" | "F";
  gradeLevel: string;
  average?: number;
  rank?: string;
  appreciation: string;
  templateType: "excellence" | "encouragement" | "honor" | "behavior";
  date: string;
}

export interface PortfolioComponent {
  id: string;
  axisNumber: number;
  axisTitle: string;
  title: string;
  description: string;
  targetToolKey?: TabKey;
  isCompleted: boolean;
  requiredForPioneer: boolean;
  notes?: string;
}

export interface DailyGroupActivity {
  id: string;
  groupName: string; // الفوج 1 / الفوج 2
  objective: string; // الهدف
  path: string; // المسار (المسار 1 / المسار 2 / مسار الكلمات / مسار الجمل)
  levelBlock: string; // اللبنة (اللبنة 1 / 2 / 3)
  sessionNumber: string; // الحصة (الحصة 1 / 2 / 3...)
  startTime: string; // من
  endTime: string; // إلى
  activity1: string; // نشاط 1 (أيقونة المصباح: تهيؤ وانطلاق)
  activity2: string; // نشاط 2 (أيقونة الكتاب: قراءة وفك تشفير / حساب ذهني)
  activity3: string; // نشاط 3 (أيقونة الترس: أنشطة تطبيقية وممارسة مستقلة)
  activity4: string; // نشاط 4 (أيقونة المجموعة: عمل تشاركي وإنتاج)
  notes: string; // ملاحظات
  percentageAchieved: string; // % نسبة التحقق والتحكم
}

export interface DailyLogDay {
  id: string;
  dayName: string; // الاثنين، الثلاثاء...
  gregorianDate: string; // تاريخ اليوم
  hijriDate: string; // الموافق لـ
  group1: DailyGroupActivity;
  group2: DailyGroupActivity;
  directorSignatureDate?: string;
  inspectorSignatureDate?: string;
}

export interface DailyLogBookConfig {
  schoolYear: string;
  title?: string;
  subtitle?: string;
  motto?: string;
  templateType?: string;
  showCover?: boolean;
  showBasmala?: boolean;
  showTeacherCard?: boolean;
  showBackCover?: boolean;
  totalDays?: number;
  days: DailyLogDay[];
}

export interface DailyKickoffOperation {
  id: string;
  dayName: string;
  dateStr: string;
  tasks: string[];
  notes?: string;
  isDone?: boolean;
}

export interface DailyKickoffWeek {
  id: string;
  weekTitle: string;
  dateRange: string;
  operations: DailyKickoffOperation[];
}

export interface TripleSubjectDayActivity {
  id: string;
  dateStr: string;
  hijriDateStr?: string;
  arabic: {
    path: string;
    levelBlock: string;
    sessionNumber: string;
    startTime: string;
    endTime: string;
    objective: string;
    opening: string; // افتتاح الحصة
    routine: string; // نشاط اعتيادي
    speakingVocab: string; // تحدث وإغناء المعجم
    readingWriting: string; // أنشطة القراءة والكتابة
    gameClosing: string; // لعبة واختتام الحصة
    notes: string;
  };
  math: {
    path: string;
    levelBlock: string;
    sessionNumber: string;
    startTime: string;
    endTime: string;
    objective: string;
    mentalMath: string; // حساب ذهني
    numbers: string; // الأعداد
    operationsProblems: string; // العمليات وحل المسائل
    workbookActivity: string; // عمل فردي على الكراسة
    game: string; // لعبة
    notes: string;
  };
  french: {
    parcours: string;
    item: string;
    seance: string;
    du: string;
    a: string;
    objective: string;
    rituel: string;
    vocabulaire: string;
    lectureEcriture: string;
    pratiqueAutonome: string;
    jeu: string;
    observations: string;
  };
  generalNotes: string;
}

export interface Grade1PreparationDay {
  id: string;
  dateStr: string;
  level: string; // المستوى: الأول
  groupName: string; // الفوج
  arabic: {
    sessionNumber: string;
    timing: string;
    objective: string;
    routine20min: string; // نشاط اعتيادي (20 د)
    speakingVocab40min: string; // نشاط الاستماع والتحدث وإغناء المعجم (40 د)
    preReading50min: string; // أنشطة ما قبل القراءة (50 د)
    closingRitual20min: string; // طقس اختتام الحصة (20 د)
    notes: string;
  };
  math: {
    sessionNumber: string;
    timing: string;
    objective: string;
    routine5min: string; // نشاط اعتيادي (5 د)
    logicThinking25min: string; // أنشطة تنمية التفكير المنطقي (25 د)
    countingSkills25min: string; // أنشطة التهيئة لمهارات العد والحساب (25 د)
    games10min: string; // ألعاب (10 د)
    notes: string;
  };
  french: {
    seance: string;
    horaire: string;
    objectifs: string;
    chansonAction5min: string; // Chanson action (5 min)
    vocabulaire20min: string; // Vocabulaire (20 min)
    chansonAlphabet5min: string; // Chanson de l'alphabet (5 min)
    presentationLettre20min: string; // Présentation de la lettre (20 min)
    jeu10min: string; // Jeu (10 min)
    notesObservations: string;
  };
}

export interface ExplicitTeachingRow {
  id: string;
  timeSlot: string; // الفترة الزمنية
  group: string; // الفوج
  subject: string; // المادة
  topic: string; // الموضوع
  session: string; // الحصة
  duration: string; // المدة
  percentageAchieved: string; // نسبة التحقق
  mindMap: string; // الخطاطة الذهنية
  isGroupChange?: boolean;
  isBreak?: boolean;
  breakDuration?: string;
}

export interface ExplicitTeachingDay {
  id: string;
  dateStr: string;
  phase: string; // المرحلة
  annualWeek: string; // الأسبوع السنوي
  phaseWeek: string; // الأسبوع المرحلي
  pedagogicalDay: string; // اليوم التربوي
  rows: ExplicitTeachingRow[];
  teacherNotes: string; // إطار خاص بالأستاذ(ة): المادة والتعثرات المرصودة / ملاحظات عامة
}

export type DailyLogModelId =
  | "kickoff_procedures" // إجراءات بداية السنة الدراسية (PDF 1)
  | "tarl_support" // مذكرة الدعم المكثف TaRL ثنائية الأفواج
  | "comprehensive_pioneer" // دفتر المذكرة اليومية الشامل (المثمر 2026/2027 - 24 صفحة)
  | "triple_subjects" // مذكرة المواد الثلاثية (عربية - رياضيات - فرنسية)
  | "grade_1_prep" // مذكرة المستوى الأول (أنشطة التهيئة والاستئناس)
  | "explicit_teaching"; // مذكرة التدريس الصريح (يوم واحد / يومان / التوقيت الوزاري)


