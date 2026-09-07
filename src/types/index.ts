export type TabKey =
  | "home"
  | "news"
  | "articles"
  | "competitions"
  | "pedagogical_docs"
  | "workshop_report"
  | "portfolio"
  | "timetable"
  | "card"
  | "charter"
  | "covers"
  | "grids"
  | "holidays"
  | "certificates"
  | "remarks"
  | "print_preview";

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
  dayNumber: string; // مثلا: "اليوم الثاني"
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
