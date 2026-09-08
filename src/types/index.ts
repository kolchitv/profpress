export type TabKey =
  | "home"
  | "news"
  | "articles"
  | "competitions"
  | "inspection_competition"
  | "orientation_planning"
  | "pedagogical_docs"
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
