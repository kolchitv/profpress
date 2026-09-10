import React, { useState } from "react";
import {
  ShieldCheck,
  FileText,
  Sparkles,
  Users,
  Activity,
  Filter,
  PlusCircle,
  Edit3,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Globe,
  TrendingUp,
  Search,
  Eye,
  Download,
  Share2,
  Server,
  Lock,
  ArrowUpRight,
  RotateCcw,
  Check,
  Clock,
  Smartphone,
  Monitor,
  ExternalLink,
  KeyRound,
  Mail,
  Copy,
  EyeOff,
  AlertCircle,
  Code2,
  Layers,
  Terminal,
  Power,
  Play,
  CheckCheck,
  FileCode,
  Sliders,
  Shield,
  RefreshCw,
  Save,
  X,
  Database,
  BookOpen,
  Upload,
  Megaphone,
  Zap,
} from "lucide-react";
import {
  TopicItem,
  AdminSession,
  VisitorPermissions,
  TopicProposal,
  TopicCategory,
  CustomCodeSettings,
  DownloadGatewaySettings,
} from "../types";
import { analyzeRankMathSeo } from "../utils/rankMathSeo";
import {
  getAdminCredentials,
  updateAdminPassword,
  updateAdminProfile,
  DEFAULT_ADMIN_EMAIL,
  AdminCredentials,
  canUserDeleteArticles,
  getMaskedEmail,
} from "../utils/adminAuth";
import {
  getCustomCodeSettings,
  saveCustomCodeSettings,
  SCRIPT_PRESETS,
  ScriptPreset,
} from "../utils/customScripts";
import {
  getDownloadGatewaySettings,
  saveDownloadGatewaySettings,
  DEFAULT_DOWNLOAD_GATEWAY_SETTINGS,
} from "../utils/downloadGatewaySettings";
import { DownloadGatewayModal } from "./DownloadGatewayModal";
import { AdSenseZone } from "./AdSenseZone";

interface AdminControlPanelProps {
  isOpen?: boolean;
  onClose?: () => void;
  topics: TopicItem[];
  adminSession: AdminSession;
  onEditTopic: (topic: TopicItem) => void;
  onAddNewTopic: () => void;
  onDeleteTopic: (id: string) => void;
  onToggleUrgent: (id: string) => void;
  onSaveTopics: (updated: TopicItem[]) => void;
  onLogout: () => void;
}

export const AdminControlPanel: React.FC<AdminControlPanelProps> = ({
  isOpen,
  onClose,
  topics,
  adminSession,
  onEditTopic,
  onAddNewTopic,
  onDeleteTopic,
  onToggleUrgent,
  onSaveTopics,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<
    | "topics"
    | "seo"
    | "adsense_gateway"
    | "permissions"
    | "monitoring"
    | "competition_subjects"
    | "custom_code"
    | "backup"
    | "account"
  >("topics");
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedSitemap, setCopiedSitemap] = useState(false);
  const [showEmailHeader, setShowEmailHeader] = useState(false);

  // Google AdSense & Download Gateway Settings State
  const [gatewaySettings, setGatewaySettings] = useState<DownloadGatewaySettings>(
    getDownloadGatewaySettings
  );
  const [gatewaySaveMsg, setGatewaySaveMsg] = useState<string | null>(null);
  const [showGatewayPreview, setShowGatewayPreview] = useState(false);

  const handleSaveGatewaySettings = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const ok = saveDownloadGatewaySettings(gatewaySettings);
    if (ok) {
      setGatewaySaveMsg("تم حفظ وتطبيق إعدادات إعلانات أدسنس وبوابة التحميل فوراً!");
      setTimeout(() => setGatewaySaveMsg(null), 3500);
    }
  };

  const handleResetGatewaySettings = () => {
    if (window.confirm("هل أنت متأكد من استعادة الإعدادات الافتراضية لبوابة التحميل وأدسنس؟")) {
      setGatewaySettings(DEFAULT_DOWNLOAD_GATEWAY_SETTINGS);
      saveDownloadGatewaySettings(DEFAULT_DOWNLOAD_GATEWAY_SETTINGS);
      setGatewaySaveMsg("تمت استعادة الإعدادات الافتراضية بنجاح.");
      setTimeout(() => setGatewaySaveMsg(null), 3000);
    }
  };

  // Backup & Restore states
  const [backupMsg, setBackupMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Competition Subjects State for Manager
  const [subjectsFilter, setSubjectsFilter] = useState<"all" | "primary" | "secondary" | "other">("all");
  const [subjectsSearch, setSubjectsSearch] = useState("");

  const getCompetitionDataFromStorage = () => {
    try {
      const saved = localStorage.getItem("profpress_teaching_competition_data");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  const [competitionData, setCompetitionData] = useState(getCompetitionDataFromStorage);

  // Check if current user is the platform manager (kolchitv@gmail.com)
  const isManager = adminSession.isAdmin && canUserDeleteArticles(adminSession);

  // Custom Code Injection state (Header, Body, Footer)
  const [customCode, setCustomCode] = useState<CustomCodeSettings>(getCustomCodeSettings);
  const [codeSaveMsg, setCodeSaveMsg] = useState<string | null>(null);
  const [activeCodeZone, setActiveCodeZone] = useState<"all" | "header" | "body" | "footer">("all");
  const [showInjectedInspector, setShowInjectedInspector] = useState(false);

  const handleSaveCustomCode = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const ok = saveCustomCodeSettings(customCode);
    if (ok) {
      setCodeSaveMsg("تم حفظ وتطبيق الأكواد بنجاح في المتصفح فوراً!");
      setTimeout(() => setCodeSaveMsg(null), 3500);
    }
  };

  const handleToggleCodeEnabled = () => {
    const updated: CustomCodeSettings = { ...customCode, isEnabled: !customCode.isEnabled };
    setCustomCode(updated);
    saveCustomCodeSettings(updated);
    setCodeSaveMsg(updated.isEnabled ? "تم تفعيل حقن الأكواد في الموقع." : "تم تعطيل حقن الأكواد مؤقتاً.");
    setTimeout(() => setCodeSaveMsg(null), 3500);
  };

  const handleApplyPreset = (preset: ScriptPreset) => {
    if (preset.target === "gtm_combo") {
      setCustomCode((prev) => ({
        ...prev,
        headerCode: prev.headerCode ? `${prev.headerCode}\n\n${preset.codeSnippet}` : preset.codeSnippet,
        bodyStartCode: prev.bodyStartCode ? `${prev.bodyStartCode}\n\n${preset.secondarySnippet || ""}` : (preset.secondarySnippet || ""),
      }));
    } else if (preset.target === "header") {
      setCustomCode((prev) => ({
        ...prev,
        headerCode: prev.headerCode ? `${prev.headerCode}\n\n${preset.codeSnippet}` : preset.codeSnippet,
      }));
    } else if (preset.target === "bodyStart") {
      setCustomCode((prev) => ({
        ...prev,
        bodyStartCode: prev.bodyStartCode ? `${prev.bodyStartCode}\n\n${preset.codeSnippet}` : preset.codeSnippet,
      }));
    } else if (preset.target === "footer") {
      setCustomCode((prev) => ({
        ...prev,
        footerCode: prev.footerCode ? `${prev.footerCode}\n\n${preset.codeSnippet}` : preset.codeSnippet,
      }));
    }
    setCodeSaveMsg(`تم إدراج نموذج: ${preset.name} بنجاح. اضغط على "حفظ وتطبيق الأكواد" لتفعيل التغيير.`);
    setTimeout(() => setCodeSaveMsg(null), 4000);
  };

  const handleClearAllCode = () => {
    if (window.confirm("هل أنت متأكد من رغبتك في تفريغ كافة الأكواد المحقونة (Header, Body, Footer)؟")) {
      const reset: CustomCodeSettings = {
        headerCode: "",
        bodyStartCode: "",
        footerCode: "",
        isEnabled: customCode.isEnabled,
      };
      setCustomCode(reset);
      saveCustomCodeSettings(reset);
      setCodeSaveMsg("تم تفريغ كافة حقول الأكواد بنجاح.");
      setTimeout(() => setCodeSaveMsg(null), 3000);
    }
  };

  // Account & Credentials state (tied to kolchitv@gmail.com)
  const [adminCreds, setAdminCreds] = useState<AdminCredentials>(getAdminCredentials);
  const [currentPassInput, setCurrentPassInput] = useState("");
  const [newPassInput, setNewPassInput] = useState("");
  const [confirmPassInput, setConfirmPassInput] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [accountPassSuccess, setAccountPassSuccess] = useState<string | null>(null);
  const [accountPassError, setAccountPassError] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedAdsTxt, setCopiedAdsTxt] = useState(false);
  const [displayNameInput, setDisplayNameInput] = useState(adminCreds.adminName);
  const [nameSaveMsg, setNameSaveMsg] = useState<string | null>(null);
  const [adminCategoryFilter, setAdminCategoryFilter] = useState<string>("الكل");

  const handleCopyAdsTxt = () => {
    const code = "google.com, pub-2606934361036411, DIRECT, f08c47fec0942fa0";
    navigator.clipboard?.writeText(code);
    setCopiedAdsTxt(true);
    setTimeout(() => setCopiedAdsTxt(false), 3000);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setAccountPassSuccess(null);
    setAccountPassError(null);

    if (newPassInput !== confirmPassInput) {
      setAccountPassError("كلمة المرور الجديدة وتأكيدها غير متطابقين.");
      return;
    }

    const res = updateAdminPassword(currentPassInput, newPassInput);
    if (res.success) {
      setAccountPassSuccess("تم تغيير وتحديث كلمة المرور بنجاح! يمكنك استخدام كلمة المرور الجديدة في المرات القادمة.");
      setAdminCreds(getAdminCredentials());
      setCurrentPassInput("");
      setNewPassInput("");
      setConfirmPassInput("");
    } else {
      setAccountPassError(res.error || "فشل تغيير كلمة المرور. يرجى التأكد من كلمة المرور الحالية.");
    }
  };

  const handleUpdateName = (e: React.FormEvent) => {
    e.preventDefault();
    setNameSaveMsg(null);
    const res = updateAdminProfile(adminCreds.email, displayNameInput);
    if (res.success) {
      setNameSaveMsg("تم حفظ وتحديث اسم المشرف بنجاح.");
      setAdminCreds(getAdminCredentials());
      setTimeout(() => setNameSaveMsg(null), 3000);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(adminCreds.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Visitor Permissions state (persisted in localStorage)
  const [permissions, setPermissions] = useState<VisitorPermissions>(() => {
    try {
      const saved = localStorage.getItem("yalla_visitor_permissions");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      canReadTopics: true,
      canDownloadAttachments: true,
      canShareWhatsApp: true,
      canSuggestTopics: true,
      canEditTopics: false, // Visitors cannot edit or post articles; reserved exclusively for kolchitv@gmail.com
      canCustomizeDocumentInfo: true, // Visitors can customize their personal information in documents
      canCustomizeDocumentColors: true, // Visitors can change colors and themes in documents
      requireApprovalBeforePublish: true,
      showRankMathBadgeToVisitors: true,
      allowComments: false,
    };
  });

  const updatePermissions = (updated: VisitorPermissions) => {
    setPermissions(updated);
    try {
      localStorage.setItem("yalla_visitor_permissions", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Visitor topic proposals state
  const [proposals, setProposals] = useState<TopicProposal[]>([
    {
      id: "prop-1",
      title: "دليل توزيع حصص أنشطة الدعم المؤسساتي وفق المقرر الوزاري 2026",
      category: "article",
      authorName: "الأستاذ رشيد العمراني",
      authorEmail: "rachid.elamrani@taalim.ma",
      institution: "م/م الأمل الابتدائية - فاس مكناس",
      summary: "مقترح مقال بيداغوجي يشرح كيفية تنظيم حصص الدعم الأسبوعية دون التأثير على الغلاف الزمني للمواد الأساسية.",
      date: "06 شتنبر 2026",
      status: "pending",
    },
    {
      id: "prop-2",
      title: "شبكة تفريغ نتائج التقويم التشخيصي لمادة الرياضيات المستوى الرابع الريادة",
      category: "memo",
      authorName: "الأستاذة فاطمة الزهراء",
      authorEmail: "f.zahra@taalim.ma",
      institution: "مدرسة ابن خلدون الرائدة - طنجة تطوان",
      summary: "إعداد شبكة إلكترونية متوافقة مع مسار لحساب نسب التحكم في الأعداد والعمليات الحسابية.",
      date: "04 شتنبر 2026",
      status: "pending",
    },
  ]);

  // SEO calculations across all topics
  const seoAudits = topics.map((t) => {
    const analysis = analyzeRankMathSeo(
      t.seo?.focusKeyword || t.title,
      t.seo?.seoTitle || t.title,
      t.seo?.metaDescription || t.summary,
      t.seo?.slug || t.id,
      t.content
    );
    return { topic: t, analysis };
  });

  const averageSeoScore = Math.round(
    seoAudits.reduce((acc, curr) => acc + curr.analysis.score, 0) / (seoAudits.length || 1)
  );

  const highSeoCount = seoAudits.filter((a) => a.analysis.score >= 80).length;
  const goodSeoCount = seoAudits.filter((a) => a.analysis.score >= 50 && a.analysis.score < 80).length;
  const needsWorkSeoCount = seoAudits.filter((a) => a.analysis.score < 50).length;
  const totalViews = topics.reduce((acc, curr) => acc + (curr.viewsCount || 0), 0);

  // Filtered topics in admin table
  const filteredTopics = topics.filter((t) => {
    const matchesCategory =
      adminCategoryFilter === "الكل" ||
      t.category === adminCategoryFilter ||
      (adminCategoryFilter === "بلاغات" && t.category === "communique") ||
      (adminCategoryFilter === "مذكرات" && t.category === "memo") ||
      (adminCategoryFilter === "مقالات" && t.category === "article");

    const matchesSearch =
      !searchTerm ||
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.categoryLabel.includes(searchTerm) ||
      t.author.includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  const handleCopySitemap = () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${topics
      .map(
        (t) =>
          `  <url>\n    <loc>https://yallataalim.com/announcements/${t.seo?.slug || t.id}</loc>\n    <lastmod>${
            t.gregorianDate || "2026-09-01"
          }</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`
      )
      .join("\n")}\n</urlset>`;
    navigator.clipboard?.writeText(xml);
    setCopiedSitemap(true);
    setTimeout(() => setCopiedSitemap(false), 2500);
  };

  const handleExportFullBackup = () => {
    try {
      const backupPayload = {
        exportedAt: new Date().toISOString(),
        version: "2026.1",
        exportedBy: adminCreds.adminName,
        topics: topics,
        teachingCompetition: getCompetitionDataFromStorage(),
        customCode: customCode,
        visitorPermissions: permissions,
        topicProposals: proposals,
      };

      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupPayload, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `profpress-complete-backup-${new Date().toISOString().split("T")[0]}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      setBackupMsg({
        type: "success",
        text: "تم بنجاح تصدير النسخة الاحتياطية الكاملة لجميع مواضيع وبيانات المنصة وتحميلها على جهازك.",
      });
      setTimeout(() => setBackupMsg(null), 4500);
    } catch (err) {
      setBackupMsg({
        type: "error",
        text: "حدث خطأ أثناء تصدير النسخة الاحتياطية. يرجى إعادة المحاولة.",
      });
    }
  };

  const handleImportBackupFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);

        if (!parsed || typeof parsed !== "object") {
          throw new Error("ملف غير صالح");
        }

        if (Array.isArray(parsed.topics)) {
          onSaveTopics(parsed.topics);
          localStorage.setItem("yalla_topics_data", JSON.stringify(parsed.topics));
        }

        if (parsed.teachingCompetition) {
          localStorage.setItem("profpress_teaching_competition_data", JSON.stringify(parsed.teachingCompetition));
          setCompetitionData(parsed.teachingCompetition);
        }

        if (parsed.customCode) {
          saveCustomCodeSettings(parsed.customCode);
          setCustomCode(parsed.customCode);
        }

        if (parsed.visitorPermissions) {
          localStorage.setItem("yalla_visitor_permissions", JSON.stringify(parsed.visitorPermissions));
          setPermissions(parsed.visitorPermissions);
        }

        setBackupMsg({
          type: "success",
          text: "تم بنجاح استرجاع وتحديث كافة مواضيع وبيانات الموقع من ملف النسخة الاحتياطية!",
        });
        setTimeout(() => setBackupMsg(null), 5000);
      } catch (err) {
        setBackupMsg({
          type: "error",
          text: "الملف المرفوع غير متوافق أو تالف. يرجى اختيار ملف JSON تم تصديره من المنصة سابقاً.",
        });
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  if (isOpen !== undefined && !isOpen) {
    return null;
  }

  const panelContent = (
    <div className="space-y-6 max-w-7xl mx-auto" dir="rtl">
      {/* Top Admin Header Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-teal-950 to-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-teal-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-13 h-13 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-400 shadow-sm">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">
                جلسة مدير الموقع نشطة
              </span>
              <span className="text-xs text-slate-300 font-mono">
                {adminSession.role === "super_admin" ? "المشرف العام" : "محرر معتمد"}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black font-cairo text-white">
              لوحة تحكم إدارة المواضيع والسيو ومراقبة الموقع
            </h1>
            <div className="flex flex-wrap items-center gap-2 pt-0.5 text-xs text-slate-300">
              <span>مرحباً بك:</span>
              <strong className="text-white">{adminCreds.adminName}</strong>
              <span>•</span>
              <span>البريد الإداري:</span>
              <span className="font-mono font-bold text-amber-300 bg-white/10 px-2 py-0.5 rounded-md border border-white/15 flex items-center gap-1.5" dir="ltr">
                <Shield className="w-3 h-3 text-emerald-400" />
                <span>{showEmailHeader ? adminCreds.email : getMaskedEmail(adminCreds.email)}</span>
                <button
                  type="button"
                  onClick={() => setShowEmailHeader(!showEmailHeader)}
                  className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
                  title={showEmailHeader ? "إخفاء البريد" : "إظهار البريد"}
                >
                  {showEmailHeader ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                </button>
              </span>
              <span className="text-[10px] bg-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                موثق ومشفّر
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          <button
            type="button"
            onClick={() => setActiveTab("account")}
            className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm px-3.5 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-xs cursor-pointer"
            title="تغيير كلمة المرور وإعدادات الحساب"
          >
            <KeyRound className="w-4 h-4" />
            <span>تغيير كلمة المرور</span>
          </button>

          <button
            type="button"
            onClick={onAddNewTopic}
            className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>كتابة موضوع جديد</span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="bg-white/10 hover:bg-white/20 text-slate-200 border border-white/20 font-bold text-xs px-3.5 py-2.5 rounded-xl transition cursor-pointer"
          >
            تسجيل الخروج
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-400/30 p-2 rounded-xl transition cursor-pointer flex items-center gap-1 text-xs"
              title="إغلاق والعودة إلى الموقع"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">إغلاق</span>
            </button>
          )}
        </div>
      </div>

      {/* 4 Quick Stat Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>إجمالي المواضيع المنشورة</span>
            <FileText className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-cairo">
            {topics.length} <span className="text-xs text-slate-500 font-normal">موضوع</span>
          </div>
          <div className="text-[11px] text-teal-700 font-bold">
            {topics.filter((t) => t.category === "communique").length} بلاغ •{" "}
            {topics.filter((t) => t.category === "memo").length} مذكرة •{" "}
            {topics.filter((t) => t.category === "article").length} مقال
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>متوسط توافق السيو (Rank Math)</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-emerald-700 font-cairo">
            {averageSeoScore} <span className="text-xs text-slate-500 font-normal">/ 100</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-bold">
            {highSeoCount} موضوع متطابق كلياً (80+)
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>إجمالي قراءات وتفاعلات الزوار</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-cairo">
            {totalViews.toLocaleString("ar-MA")}{" "}
            <span className="text-xs text-slate-500 font-normal">مشاهدة</span>
          </div>
          <div className="text-[11px] text-blue-700 font-bold">
            +18,450 زيارة نشطة هذا الأسبوع
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>حالة وأمان خادم المنصة</span>
            <Server className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700 font-cairo">
            99.9% <span className="text-xs text-slate-500 font-normal">استقرار</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-bold">
            شهادة SSL صالحة • استجابة 120ms
          </div>
        </div>
      </div>

      {/* Main Admin Navigation Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-1.5 flex flex-wrap items-center gap-1">
        <button
          type="button"
          onClick={() => setActiveTab("topics")}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
            activeTab === "topics"
              ? "bg-teal-700 text-white shadow-xs"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>المواضيع والمقالات ({topics.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("competition_subjects")}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
            activeTab === "competition_subjects"
              ? "bg-teal-700 text-white shadow-xs"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span>مواد وتخصصات المباريات</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("seo")}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
            activeTab === "seo"
              ? "bg-teal-700 text-white shadow-xs"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>تحسين السيو (Rank Math)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("monitoring")}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
            activeTab === "monitoring"
              ? "bg-teal-700 text-white shadow-xs"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-400" />
          <span>التحليلات الحية والزيارات</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("custom_code")}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
            activeTab === "custom_code"
              ? "bg-teal-700 text-white shadow-xs"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <Code2 className="w-4 h-4 text-amber-300" />
          <span>حقن الأكواد والسكربتات</span>
          {customCode.isEnabled && (customCode.headerCode.trim() || customCode.bodyStartCode.trim() || customCode.footerCode.trim()) ? (
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="شفرات نشطة"></span>
          ) : null}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("adsense_gateway")}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
            activeTab === "adsense_gateway"
              ? "bg-gradient-to-r from-amber-600 to-teal-700 text-white shadow-xs"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <Megaphone className="w-4 h-4 text-amber-300" />
          <span>إعلانات أدسنس وبوابة التحميل</span>
          {gatewaySettings.adSettings.isEnabled && (
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="بوابة الإعلانات نشطة"></span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("backup")}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
            activeTab === "backup"
              ? "bg-teal-700 text-white shadow-xs"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <Database className="w-4 h-4 text-cyan-300" />
          <span>النسخ الاحتياطي والاسترجاع</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("permissions")}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
            activeTab === "permissions"
              ? "bg-teal-700 text-white shadow-xs"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>الصلاحيات ({proposals.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("account")}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
            activeTab === "account"
              ? "bg-amber-600 text-white shadow-xs"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <KeyRound className="w-4 h-4 text-amber-300" />
          <span>أمان الحساب وكلمة المرور</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: TOPICS & ARTICLES MANAGEMENT */}
      {/* ========================================================================= */}
      {activeTab === "topics" && (
        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ابحث في المواضيع بالاسم، الجهة، أو التصنيف..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pr-10 pl-3 py-2 text-xs font-medium outline-hidden focus:ring-2 focus:ring-teal-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-2.5" />
            </div>

            <button
              type="button"
              onClick={onAddNewTopic}
              className="w-full sm:w-auto bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ كتابة موضوع جديد</span>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100">
            <span className="text-xs text-slate-400 font-bold ml-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>تصنيف:</span>
            </span>
            {[
              { label: "الكل", value: "الكل" },
              { label: "بلاغات رسمية", value: "communique" },
              { label: "مذكرات وزارية", value: "memo" },
              { label: "إعلانات ومباريات", value: "announcement" },
              { label: "مقالات تربوية", value: "article" },
              { label: "نتائج وترقيات", value: "results" },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setAdminCategoryFilter(opt.value)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                  adminCategoryFilter === opt.value
                    ? "bg-teal-700 text-white shadow-2xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {opt.label}
              </button>
            ))}
            <span className="mr-auto text-[11px] text-slate-500 font-mono">
              {filteredTopics.length} موضوع
            </span>
          </div>

          {/* Topics Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">طبيعة الموضوع</th>
                  <th className="p-3.5">عنوان الموضوع</th>
                  <th className="p-3.5">تاريخ الصدور</th>
                  <th className="p-3.5">الكلمة المفتاحية</th>
                  <th className="p-3.5">نتيجة رانك ماث</th>
                  <th className="p-3.5">القراءات</th>
                  <th className="p-3.5 text-center">إجراءات المدير</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {filteredTopics.map((topic) => {
                  const audit = seoAudits.find((a) => a.topic.id === topic.id);
                  const score = audit?.analysis.score || 80;
                  return (
                    <tr key={topic.id} className="hover:bg-slate-50/80 transition">
                      <td className="p-3.5 whitespace-nowrap">
                        <span
                          className={`font-bold px-2.5 py-1 rounded-full text-[11px] ${
                            topic.category === "memo"
                              ? "bg-teal-100 text-teal-800"
                              : topic.category === "announcement"
                              ? "bg-amber-100 text-amber-800"
                              : topic.category === "article"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {topic.categoryLabel}
                        </span>
                        {topic.urgent && (
                          <span className="mr-1 text-[10px] bg-red-600 text-white px-1.5 py-0.2 rounded font-bold">
                            عاجل
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 font-bold font-cairo max-w-xs truncate">
                        {topic.title}
                      </td>
                      <td className="p-3.5 text-slate-500 whitespace-nowrap font-mono text-[11px]">
                        {topic.date}
                      </td>
                      <td className="p-3.5 text-slate-600 max-w-[140px] truncate">
                        {topic.seo?.focusKeyword || "—"}
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <span
                          className={`font-bold font-mono px-2 py-0.5 rounded-lg text-[11px] ${
                            score >= 80
                              ? "bg-emerald-100 text-emerald-800"
                              : score >= 50
                              ? "bg-amber-100 text-amber-800"
                              : "bg-rose-100 text-rose-800"
                          }`}
                        >
                          {score} / 100
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-600 whitespace-nowrap font-mono text-[11px]">
                        {topic.viewsCount?.toLocaleString("ar-MA") || 0}
                      </td>
                      <td className="p-3.5 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            onClick={() => onEditTopic(topic)}
                            className="p-1.5 text-blue-700 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                            title="تعديل في المحرر الداخلي"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onToggleUrgent(topic.id)}
                            className={`p-1.5 rounded-lg transition cursor-pointer ${
                              topic.urgent
                                ? "text-amber-600 hover:bg-amber-50"
                                : "text-slate-400 hover:bg-slate-100"
                            }`}
                            title="تبديل حالة الأولوية العاجلة"
                          >
                            <AlertTriangle className="w-4 h-4" />
                          </button>
                          {isManager ? (
                            <button
                              type="button"
                              onClick={() => onDeleteTopic(topic.id)}
                              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                              title="حذف الموضوع (صلاحية حصرية لمدير المنصة الرئيسي)"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          ) : (
                            <span
                              className="p-1.5 text-slate-300 cursor-not-allowed"
                              title="حذف المقال محصور حصرياً بمدير المنصة الرئيسي"
                            >
                              <Trash2 className="w-4 h-4 opacity-40" />
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: SITE-WIDE SEO SUITE & RANK MATH AUDIT */}
      {/* ========================================================================= */}
      {activeTab === "seo" && (
        <div className="space-y-6">
          {/* SEO Health Overview Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-cairo flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>محرك الفحص الشامل للسيو (Rank Math SEO Engine)</span>
                </h3>
                <p className="text-xs text-slate-500">
                  فحص تلقائي لتوافق كافة عناوين الميتا والكلمات المفتاحية لمواضيع المنظومة مع خوارزمية جوجل
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="/ads.txt"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer"
                  title="عرض ملف ads.txt الفعلي المعتمد في المتصفح"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-700" />
                  <span>معاينة ads.txt</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyAdsTxt}
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer"
                >
                  {copiedAdsTxt ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAdsTxt ? "تم نسخ سطر ads.txt!" : "نسخ سطر ads.txt"}</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopySitemap}
                  className="bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer"
                >
                  {copiedSitemap ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Globe className="w-3.5 h-3.5" />}
                  <span>{copiedSitemap ? "تم نسخ Sitemap.xml!" : "نسخ ملف Sitemap.xml"}</span>
                </button>
              </div>
            </div>

            {/* Score Distribution Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center space-y-1">
                <span className="text-xs font-bold text-emerald-800">مواضيع متطابقة تماماً (80-100)</span>
                <div className="text-3xl font-black text-emerald-700 font-mono">{highSeoCount}</div>
                <p className="text-[11px] text-emerald-600">جاهزة للأرشفة السريعة وظهور الصفحة الأولى</p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center space-y-1">
                <span className="text-xs font-bold text-amber-800">مواضيع تحتاج تحسينات طفيفة (50-79)</span>
                <div className="text-3xl font-black text-amber-700 font-mono">{goodSeoCount}</div>
                <p className="text-[11px] text-amber-600">ينصح بتوسيع وصف الميتا وإدراج عناوين H2</p>
              </div>

              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-center space-y-1">
                <span className="text-xs font-bold text-rose-800">مواضيع ضعيفة السيو (&lt; 50)</span>
                <div className="text-3xl font-black text-rose-700 font-mono">{needsWorkSeoCount}</div>
                <p className="text-[11px] text-rose-600">تتطلب إضافة الكلمة المفتاحية في المقدمة</p>
              </div>
            </div>

            {/* Recommendations List */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2.5">
              <span className="font-bold text-xs text-slate-800 font-cairo block">
                💡 توصيات مدير السيو لتحسين ترتيب المقالات في جوجل:
              </span>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    احرص على تضمين السنة الحالية (<strong>2026</strong> أو <strong>2026/2027</strong>) في عنوان المقال لرفع نسبة النقر CTR.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    حافظ على طول وصف الميتا بين <strong>120 و 160 حرفاً</strong> مع ذكر السلك التعليمي المستهدف (ابتدائي، إعدادي، تأهيلي).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    ربط كل مقال بيداغوجي بوثيقة قابلة للتحميل يرفع مدة بقاء الأستاذ في الصفحة بنسبة 65%.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: VISITOR PERMISSIONS & COMMUNITY PROPOSALS */}
      {/* ========================================================================= */}
      {activeTab === "permissions" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-cairo flex items-center gap-2">
                <Users className="w-5 h-5 text-teal-700" />
                <span>إعدادات وضبط صلاحيات الزوار والأساتذة</span>
              </h3>
              <p className="text-xs text-slate-500">
                تحديد الإجراءات المتاحة لعموم زوار المنصة دون الحاجة لحساب إداري
              </p>
            </div>

            {/* Strict Policy Banner matching user directive */}
            <div className="bg-slate-900 text-white rounded-2xl p-4 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                <Lock className="w-4 h-4" />
                <span>سياسة الأمان المطبقة: حصر تحرير المقالات بالمدير وتفويض تعديل الوثائق للزوار</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-1">
                  <span className="font-bold text-rose-400 flex items-center gap-1.5">
                    <span>⛔ تحرير المقالات والمستجدات</span>
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    محجوب كلياً عن الزوار ومحصور فقط بمدير المنصة المعتمد. لا تظهر أي أزرار تحرير أو إضافة مواضيع لغير المدير.
                  </p>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-1">
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <span>✅ تعديل الوثائق وتخصيص الألوان</span>
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    متاح للزوار والأساتذة لتعديل معلوماتهم الإدارية (الاسم، SOM، المؤسسة) واختيار الألوان والسمات البيداغوجية وطباعتها A4.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-100 transition">
                <input
                  type="checkbox"
                  checked={permissions.canCustomizeDocumentInfo}
                  onChange={(e) =>
                    updatePermissions({ ...permissions, canCustomizeDocumentInfo: e.target.checked })
                  }
                  className="w-4 h-4 mt-0.5 text-teal-600 focus:ring-teal-500 rounded"
                />
                <div className="space-y-0.5">
                  <span className="font-bold text-xs text-slate-800 block">السماح بتعديل المعلومات الشخصية في الوثائق</span>
                  <span className="text-[11px] text-slate-500">تمكين الأساتذة من كتابة بياناتهم (الاسم، البطاقة، المؤسسة، الجدول).</span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-100 transition">
                <input
                  type="checkbox"
                  checked={permissions.canCustomizeDocumentColors}
                  onChange={(e) =>
                    updatePermissions({ ...permissions, canCustomizeDocumentColors: e.target.checked })
                  }
                  className="w-4 h-4 mt-0.5 text-teal-600 focus:ring-teal-500 rounded"
                />
                <div className="space-y-0.5">
                  <span className="font-bold text-xs text-slate-800 block">السماح بتغيير ألوان وسمات الوثائق الرسمية</span>
                  <span className="text-[11px] text-slate-500">إتاحة تبديل القوالب (ذهبي، زمردي، أزرق، ملكي) بحرية تامة.</span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-100 transition">
                <input
                  type="checkbox"
                  checked={permissions.canReadTopics}
                  onChange={(e) =>
                    updatePermissions({ ...permissions, canReadTopics: e.target.checked })
                  }
                  className="w-4 h-4 mt-0.5 text-teal-600 focus:ring-teal-500 rounded"
                />
                <div className="space-y-0.5">
                  <span className="font-bold text-xs text-slate-800 block">السماح بتصفح وقراءة المواضيع والمذكرات</span>
                  <span className="text-[11px] text-slate-500">تمكين الزوار من البحث والتصفية وعرض المحتوى بالكامل.</span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-100 transition">
                <input
                  type="checkbox"
                  checked={permissions.canDownloadAttachments}
                  onChange={(e) =>
                    updatePermissions({ ...permissions, canDownloadAttachments: e.target.checked })
                  }
                  className="w-4 h-4 mt-0.5 text-teal-600 focus:ring-teal-500 rounded"
                />
                <div className="space-y-0.5">
                  <span className="font-bold text-xs text-slate-800 block">السماح بتحميل المرفقات الرسمية (PDF)</span>
                  <span className="text-[11px] text-slate-500">إتاحة تنزيل المذكرات ونماذج الوثائق مجاناً لجميع الأطر.</span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-100 transition">
                <input
                  type="checkbox"
                  checked={permissions.canShareWhatsApp}
                  onChange={(e) =>
                    updatePermissions({ ...permissions, canShareWhatsApp: e.target.checked })
                  }
                  className="w-4 h-4 mt-0.5 text-teal-600 focus:ring-teal-500 rounded"
                />
                <div className="space-y-0.5">
                  <span className="font-bold text-xs text-slate-800 block">تمكين أزرار المشاركة في واتساب وفيسبوك</span>
                  <span className="text-[11px] text-slate-500">تسهيل نشر المقال ومشاركته في مجموعات الأساتذة بضغطة واحدة.</span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-100 transition">
                <input
                  type="checkbox"
                  checked={permissions.canSuggestTopics}
                  onChange={(e) =>
                    updatePermissions({ ...permissions, canSuggestTopics: e.target.checked })
                  }
                  className="w-4 h-4 mt-0.5 text-teal-600 focus:ring-teal-500 rounded"
                />
                <div className="space-y-0.5">
                  <span className="font-bold text-xs text-slate-800 block">السماح للأساتذة باقتراح مقالات للمراجعة</span>
                  <span className="text-[11px] text-slate-500">فتح باب المشاركة التربوية مع الاحتفاظ بحق الموافقة للمدير.</span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-100 transition">
                <input
                  type="checkbox"
                  checked={permissions.showRankMathBadgeToVisitors}
                  onChange={(e) =>
                    updatePermissions({
                      ...permissions,
                      showRankMathBadgeToVisitors: e.target.checked,
                    })
                  }
                  className="w-4 h-4 mt-0.5 text-teal-600 focus:ring-teal-500 rounded"
                />
                <div className="space-y-0.5">
                  <span className="font-bold text-xs text-slate-800 block">إظهار شارة تقييم السيو للزوار</span>
                  <span className="text-[11px] text-slate-500">إبراز مدى احترافية وتوافق الموضوع مع معايير رانك ماث.</span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-100 transition">
                <input
                  type="checkbox"
                  checked={permissions.requireApprovalBeforePublish}
                  onChange={(e) =>
                    updatePermissions({
                      ...permissions,
                      requireApprovalBeforePublish: e.target.checked,
                    })
                  }
                  className="w-4 h-4 mt-0.5 text-teal-600 focus:ring-teal-500 rounded"
                />
                <div className="space-y-0.5">
                  <span className="font-bold text-xs text-slate-800 block">إلزامية موافقة المشرف قبل النشر الفعلي</span>
                  <span className="text-[11px] text-slate-500">حماية المنصة من أي محتوى غير مدقق أو خارج النطاق التربوي.</span>
                </div>
              </label>
            </div>
          </div>

          {/* Visitor Proposals Queue */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="text-sm font-bold text-slate-900 font-cairo">
                مقترحات المواضيع المرسلة من الأساتذة قيد المراجعة ({proposals.length})
              </h4>
              <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold">
                تنتظر موافقة المدير
              </span>
            </div>

            <div className="space-y-3">
              {proposals.map((prop) => (
                <div
                  key={prop.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition space-y-2.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded-full">
                        {prop.category === "memo" ? "مذكرة" : "مقال"}
                      </span>
                      <h5 className="font-bold text-xs text-slate-900">{prop.title}</h5>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">📅 {prop.date}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{prop.summary}</p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200 text-xs">
                    <span className="text-slate-500">
                      مرسل المقترح: <strong>{prop.authorName}</strong> ({prop.institution})
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onAddNewTopic();
                        }}
                        className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition cursor-pointer"
                      >
                        قبول وفتح في المحرر الداخلي
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setProposals(proposals.filter((p) => p.id !== prop.id));
                        }}
                        className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs px-3 py-1.5 rounded-xl transition cursor-pointer"
                      >
                        رفض
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: SITE MONITORING & TRAFFIC ANALYTICS */}
      {/* ========================================================================= */}
      {activeTab === "monitoring" && (
        <div className="space-y-6">
          {/* Server status banner */}
          <div className="bg-emerald-950 text-white rounded-3xl p-6 shadow-md border border-emerald-800 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-emerald-800/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white font-cairo">
                    مراقبة استقرار الخادم وسرعة التحميل (Server Health)
                  </h4>
                  <p className="text-xs text-emerald-200">
                    كافة الخدمات والمكونات تعمل بكفاءة تامة دون انقطاع
                  </p>
                </div>
              </div>
              <span className="bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 text-xs px-3 py-1 rounded-full font-bold">
                حالة الخادم: ممتاز (Optimal)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-slate-300 text-[11px] block">سرعة الاستجابة:</span>
                <strong className="text-white text-base font-mono font-black">120 ms</strong>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-slate-300 text-[11px] block">الزوار النشطون الآن:</span>
                <strong className="text-amber-300 text-base font-mono font-black">142 زائر</strong>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-slate-300 text-[11px] block">نوع الاتصال:</span>
                <strong className="text-emerald-300 text-base font-mono font-black">HTTPS / SSL</strong>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-slate-300 text-[11px] block">حجم البيانات المنقولة:</span>
                <strong className="text-blue-300 text-base font-mono font-black">4.8 GB</strong>
              </div>
            </div>
          </div>

          {/* Top viewed topics ranking */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-slate-900 font-cairo flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-teal-700" />
              <span>المواضيع والمذكرات الأكثر قراءة وتفاعلاً في المنصة</span>
            </h4>

            <div className="space-y-2.5">
              {topics.slice(0, 5).map((topic, index) => (
                <div
                  key={topic.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-teal-700 text-white flex items-center justify-center font-black font-mono text-[11px]">
                      {index + 1}
                    </span>
                    <span className="font-bold text-slate-900 line-clamp-1">{topic.title}</span>
                  </div>

                  <div className="flex items-center gap-3 font-mono text-slate-500">
                    <span>{topic.viewsCount?.toLocaleString("ar-MA") || 1000} قراءة</span>
                    <span className="text-teal-700 font-bold">98% رضى</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB: CUSTOM CODE INJECTION (HEADER, BODY, FOOTER) */}
      {/* ========================================================================= */}
      {activeTab === "custom_code" && (
        <div className="space-y-6">
          {/* Notification Banner */}
          {codeSaveMsg && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs sm:text-sm p-4 rounded-2xl flex items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="font-bold">{codeSaveMsg}</span>
              </div>
              <button
                type="button"
                onClick={() => setCodeSaveMsg(null)}
                className="text-emerald-700 hover:text-emerald-950 text-xs font-bold cursor-pointer"
              >
                إغلاق
              </button>
            </div>
          )}

          {/* Top Master Control Header Card */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-teal-950 text-white p-6 rounded-3xl border border-slate-800 shadow-md">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[11px] font-black px-3 py-1 rounded-full flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>حقن وتخصيص الأكواد والمخطوطات (Custom Scripts)</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                    تحديث فوري وتطبيق مباشر في المتصفح
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black font-cairo text-white">
                  إضافة وإدارة الأكواد البرمجية في Header و Body و Footer
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  يمكنك من هنا إضافة شفرات التتبع والإعلانات (Google AdSense, Meta Pixel, GTM)، وسوم الميتا للتحقق من ملكية الموقع (Search Console / Bing)، وأكواد التنسيق CSS، وسكربتات المحادثة الحية أو الأزرار التفاعلية بكل سهولة وبدون تعديل ملفات السورس كود يدوياً.
                </p>
              </div>

              {/* Master Actions */}
              <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-start lg:justify-end">
                {/* Master Switch Button */}
                <button
                  type="button"
                  onClick={handleToggleCodeEnabled}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 cursor-pointer shadow-xs border ${
                    customCode.isEnabled
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400/50"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700"
                  }`}
                >
                  <Power className={`w-4 h-4 ${customCode.isEnabled ? "text-amber-300" : "text-slate-400"}`} />
                  <span>{customCode.isEnabled ? "الحقن مفعّل ونشط" : "الحقن معطّل مؤقتاً"}</span>
                </button>

                {/* Save Button */}
                <button
                  type="button"
                  onClick={() => handleSaveCustomCode()}
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs transition shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ وتطبيق الأكواد</span>
                </button>

                {/* Clear All Button */}
                <button
                  type="button"
                  onClick={handleClearAllCode}
                  className="bg-white/10 hover:bg-rose-950/60 text-rose-300 hover:text-rose-200 border border-white/10 hover:border-rose-400/30 px-3.5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                  title="تفريغ كافة الحقول"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>تفريغ</span>
                </button>
              </div>
            </div>

            {/* Quick Status Bar */}
            <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                <span className="text-slate-400 text-[11px] block">حالة تفعيل الحقن:</span>
                <strong className={`font-mono text-xs ${customCode.isEnabled ? "text-emerald-400" : "text-amber-400"}`}>
                  {customCode.isEnabled ? "● نشط ومحقون" : "○ متوقف مؤقتاً"}
                </strong>
              </div>
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                <span className="text-slate-400 text-[11px] block">شفرات الرأس (Header):</span>
                <strong className="text-blue-300 font-mono text-xs">
                  {customCode.headerCode.trim() ? `${customCode.headerCode.split("\n").length} أسطر` : "فارغ"}
                </strong>
              </div>
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                <span className="text-slate-400 text-[11px] block">شفرات المتن (Body Start):</span>
                <strong className="text-teal-300 font-mono text-xs">
                  {customCode.bodyStartCode.trim() ? `${customCode.bodyStartCode.split("\n").length} أسطر` : "فارغ"}
                </strong>
              </div>
              <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                <span className="text-slate-400 text-[11px] block">شفرات التذييل (Footer):</span>
                <strong className="text-amber-300 font-mono text-xs">
                  {customCode.footerCode.trim() ? `${customCode.footerCode.split("\n").length} أسطر` : "فارغ"}
                </strong>
              </div>
            </div>
          </div>

          {/* Preset Templates Shelf */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-cairo">
                  نماذج وقوالب شائعة جاهزة للإدراج بنقرة واحدة:
                </h4>
              </div>
              <span className="text-[11px] text-slate-500">
                انقر على أي نموذج لإدراجه مباشرة في موضعه المناسب
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 pt-1">
              {SCRIPT_PRESETS.map((preset) => (
                <div
                  key={preset.id}
                  className="bg-slate-50 hover:bg-teal-50/50 border border-slate-200 hover:border-teal-300 rounded-2xl p-3 flex flex-col justify-between space-y-2 transition group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-xs text-slate-900 group-hover:text-teal-900 line-clamp-1">
                        {preset.name}
                      </span>
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-slate-200 text-slate-700">
                        {preset.target === "header"
                          ? "Head"
                          : preset.target === "bodyStart"
                          ? "Body"
                          : preset.target === "footer"
                          ? "Footer"
                          : "Combo"}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">
                      {preset.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleApplyPreset(preset)}
                    className="w-full bg-white group-hover:bg-teal-700 group-hover:text-white text-teal-800 border border-teal-200 group-hover:border-teal-700 font-bold text-[11px] py-1.5 px-2 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>إدراج في الحقل</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Code Zone Selector Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveCodeZone("all")}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                  activeCodeZone === "all"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                عرض الكل (Header + Body + Footer)
              </button>
              <button
                type="button"
                onClick={() => setActiveCodeZone("header")}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ${
                  activeCodeZone === "header"
                    ? "bg-blue-700 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>رأس الصفحة (Header - &lt;head&gt;)</span>
                {customCode.headerCode.trim() && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setActiveCodeZone("body")}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ${
                  activeCodeZone === "body"
                    ? "bg-teal-700 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>بداية المتن (Body Start - &lt;body&gt;)</span>
                {customCode.bodyStartCode.trim() && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setActiveCodeZone("footer")}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ${
                  activeCodeZone === "footer"
                    ? "bg-amber-700 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>تذييل الصفحة (Footer - قبل &lt;/body&gt;)</span>
                {customCode.footerCode.trim() && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowInjectedInspector(!showInjectedInspector)}
              className="text-xs text-teal-800 hover:text-teal-950 font-bold flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-teal-50 transition cursor-pointer border border-teal-200"
            >
              <Eye className="w-3.5 h-3.5 text-teal-600" />
              <span>{showInjectedInspector ? "إخفاء فاحص الـ DOM" : "معاينة العناصر المحقونة في الـ DOM"}</span>
            </button>
          </div>

          {/* Inspector Panel if toggled */}
          {showInjectedInspector && (
            <div className="bg-slate-900 text-slate-100 p-5 rounded-3xl border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-400 flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  <span>فاحص الحقن الفعلي للـ DOM (Active Injected Elements):</span>
                </span>
                <span className="text-[11px] text-slate-400">
                  المعرفات: #profpress-injected-head-code • #profpress-injected-body-start-code • #profpress-injected-footer-code
                </span>
              </div>
              <div className="bg-black/50 p-3 rounded-xl space-y-2 border border-slate-800 text-[11px] overflow-x-auto text-left" dir="ltr">
                <div>
                  <span className="text-blue-400 font-bold">&lt;!-- Injected inside document.head --&gt;</span>
                  <pre className="text-slate-300 mt-1 whitespace-pre-wrap">{customCode.headerCode || "// No header code"}</pre>
                </div>
                <div className="border-t border-slate-800 pt-2">
                  <span className="text-teal-400 font-bold">&lt;!-- Injected at top of document.body --&gt;</span>
                  <pre className="text-slate-300 mt-1 whitespace-pre-wrap">{customCode.bodyStartCode || "// No body start code"}</pre>
                </div>
                <div className="border-t border-slate-800 pt-2">
                  <span className="text-amber-400 font-bold">&lt;!-- Injected at bottom of document.body --&gt;</span>
                  <pre className="text-slate-300 mt-1 whitespace-pre-wrap">{customCode.footerCode || "// No footer code"}</pre>
                </div>
              </div>
            </div>
          )}

          {/* Form with the 3 Code Fields */}
          <form onSubmit={handleSaveCustomCode} className="space-y-6">
            {/* FIELD 1: HEADER CODE (<head>) */}
            {(activeCodeZone === "all" || activeCodeZone === "header") && (
              <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center shrink-0">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 font-cairo flex items-center gap-2">
                        <span>أكواد رأس الصفحة (Header Scripts)</span>
                        <code className="text-[11px] bg-blue-100 text-blue-900 px-2 py-0.5 rounded-md font-mono">
                          &lt;head&gt; ... &lt;/head&gt;
                        </code>
                      </h4>
                      <span className="text-[11px] text-slate-500">
                        تُحقن داخل وسم &lt;head&gt; قبل تحميل عناصر الصفحة
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                    <span>{customCode.headerCode.split("\n").length} أسطر</span>
                    <span>•</span>
                    <span>{customCode.headerCode.length} حرف</span>
                  </div>
                </div>

                <div className="bg-blue-50/50 border border-blue-200/60 rounded-xl p-3 text-[11px] text-blue-900 leading-relaxed">
                  💡 <strong>استخدامات شائعة:</strong> شفرات التتبع والإحصائيات (Google Analytics, Meta Pixel)، وسوم التحقق من ملكية الموقع (Google Search Console, Bing)، وسوم Meta الإضافية، وكتل الستايل المخصصة <code className="font-mono bg-white px-1 rounded">&lt;style&gt;</code>.
                </div>

                <div className="relative">
                  <textarea
                    value={customCode.headerCode}
                    onChange={(e) => setCustomCode({ ...customCode, headerCode: e.target.value })}
                    rows={8}
                    placeholder="<!-- ضع أكواد الرأس هنا: <meta>, <script>, <link>, <style> -->"
                    className="w-full bg-slate-900 text-blue-300 font-mono text-xs p-4 rounded-2xl border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-hidden leading-relaxed shadow-inner"
                    dir="ltr"
                    spellCheck={false}
                  ></textarea>
                </div>
              </div>
            )}

            {/* FIELD 2: BODY START CODE (<body>) */}
            {(activeCodeZone === "all" || activeCodeZone === "body") && (
              <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center shrink-0">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 font-cairo flex items-center gap-2">
                        <span>أكواد بداية جسم الصفحة (Body Start Scripts)</span>
                        <code className="text-[11px] bg-teal-100 text-teal-900 px-2 py-0.5 rounded-md font-mono">
                          مباشرة بعد &lt;body&gt;
                        </code>
                      </h4>
                      <span className="text-[11px] text-slate-500">
                        تُحقن في بداية وسم &lt;body&gt; قبل واجهة المحتوى
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                    <span>{customCode.bodyStartCode.split("\n").length} أسطر</span>
                    <span>•</span>
                    <span>{customCode.bodyStartCode.length} حرف</span>
                  </div>
                </div>

                <div className="bg-teal-50/50 border border-teal-200/60 rounded-xl p-3 text-[11px] text-teal-900 leading-relaxed">
                  💡 <strong>استخدامات شائعة:</strong> شفرة Google Tag Manager (noscript)، بنرات وشاشات التنبيه العلوية، شفرات التتبع الفورية عند فتح المتن.
                </div>

                <div className="relative">
                  <textarea
                    value={customCode.bodyStartCode}
                    onChange={(e) => setCustomCode({ ...customCode, bodyStartCode: e.target.value })}
                    rows={8}
                    placeholder="<!-- ضع أكواد بداية المتن هنا: <noscript>, <div class='banner'>, <script> -->"
                    className="w-full bg-slate-900 text-teal-300 font-mono text-xs p-4 rounded-2xl border border-slate-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-hidden leading-relaxed shadow-inner"
                    dir="ltr"
                    spellCheck={false}
                  ></textarea>
                </div>
              </div>
            )}

            {/* FIELD 3: FOOTER CODE (</body>) */}
            {(activeCodeZone === "all" || activeCodeZone === "footer") && (
              <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 font-cairo flex items-center gap-2">
                        <span>أكواد تذييل الصفحة (Footer Scripts)</span>
                        <code className="text-[11px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md font-mono">
                          قبل إغلاق &lt;/body&gt;
                        </code>
                      </h4>
                      <span className="text-[11px] text-slate-500">
                        تُحقن في أسفل الصفحة بعد اكتمال تحميل العناصر الأساسية
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                    <span>{customCode.footerCode.split("\n").length} أسطر</span>
                    <span>•</span>
                    <span>{customCode.footerCode.length} حرف</span>
                  </div>
                </div>

                <div className="bg-amber-50/50 border border-amber-200/60 rounded-xl p-3 text-[11px] text-amber-900 leading-relaxed">
                  💡 <strong>استخدامات شائعة:</strong> أدوات المحادثة المباشرة (WhatsApp Widget, Live Chat, Tawk.to)، إعلانات AdSense أسفل الصفحة، شفرات الإحصائيات المتأخرة التحميل لتحسين سرعة وأداء الموقع (Core Web Vitals).
                </div>

                <div className="relative">
                  <textarea
                    value={customCode.footerCode}
                    onChange={(e) => setCustomCode({ ...customCode, footerCode: e.target.value })}
                    rows={8}
                    placeholder="<!-- ضع أكواد التذييل هنا: <script src='...'>, أزرار عائمة، شفرات إعلانية -->"
                    className="w-full bg-slate-900 text-amber-300 font-mono text-xs p-4 rounded-2xl border border-slate-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-hidden leading-relaxed shadow-inner"
                    dir="ltr"
                    spellCheck={false}
                  ></textarea>
                </div>
              </div>
            )}

            {/* Bottom Save / Action Bar */}
            <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>
                  الحفظ يقوم بتطبيق وتحديث الأكواد فوراً على كافة صفحات ومكونات المنصة دون الحاجة لإعادة تحميل.
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleClearAllCode}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-rose-50 text-rose-700 font-bold text-xs transition cursor-pointer"
                >
                  مسح الحقول
                </button>
                <button
                  type="submit"
                  className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ وتطبيق الأكواد الآن</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB: GOOGLE ADSENSE & DOWNLOAD GATEWAY CONFIGURATION */}
      {/* ========================================================================= */}
      {activeTab === "adsense_gateway" && (
        <div className="space-y-6">
          {/* Notification Banner */}
          {gatewaySaveMsg && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs sm:text-sm p-4 rounded-2xl flex items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="font-bold">{gatewaySaveMsg}</span>
              </div>
              <button
                type="button"
                onClick={() => setGatewaySaveMsg(null)}
                className="text-emerald-700 hover:text-emerald-950 text-xs font-bold cursor-pointer"
              >
                إغلاق
              </button>
            </div>
          )}

          {/* Header Card */}
          <div className="bg-gradient-to-r from-amber-900 via-stone-900 to-teal-950 text-white p-5 sm:p-6 rounded-3xl shadow-md space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0">
                  <Megaphone className="w-6 h-6 text-amber-400" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg sm:text-xl font-black font-cairo">
                      إدارة إعلانات Google AdSense وبوابة التحميل الآمن والتحويل
                    </h2>
                    <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-full font-mono">
                      v2.0 Monetize
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                    تحكم كامل في وضع شفرات إعلانات أدسنس أثناء انتظار تحميل المذكرات والملفات أو تحويل الروابط، مع ضبط مدة العداد التنازلي وخيارات التحويل التلقائي لتحقيق أقصى ربحية ممكنة مع الحفاظ على تجربة مستخدم ممتازة.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => setShowGatewayPreview(true)}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 transition cursor-pointer border border-white/20"
                >
                  <Eye className="w-4 h-4 text-amber-400" />
                  <span>معاينة بوابة التحميل الآن</span>
                </button>
                <button
                  type="button"
                  onClick={handleSaveGatewaySettings}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ وتطبيق</span>
                </button>
              </div>
            </div>
          </div>

          <form onSubmit={handleSaveGatewaySettings} className="space-y-6">
            {/* Section 1: Master Switches */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Sliders className="w-5 h-5 text-teal-700" />
                <h3 className="font-black text-sm sm:text-base text-slate-900 font-cairo">
                  1. المفاتيح الرئيسية للتحكم في البوابة والإعلانات
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Toggle 1: Gateway Active */}
                <div
                  onClick={() =>
                    setGatewaySettings((prev) => ({
                      ...prev,
                      isEnabled: !prev.isEnabled,
                    }))
                  }
                  className={`p-4 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                    gatewaySettings.isEnabled
                      ? "bg-emerald-50/60 border-emerald-300 ring-1 ring-emerald-300"
                      : "bg-slate-50 border-slate-200 opacity-80"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition ${
                      gatewaySettings.isEnabled
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-300 text-slate-500"
                    }`}
                  >
                    <Check className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <span className="font-black text-xs text-slate-900 block font-cairo">
                      تفعيل بوابة التحميل والانتظار
                    </span>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      عند النقر على زر تحميل أي ملف، تفتح صفحة الانتظار والعداد لعرض الإعلانات بدلاً من التحميل الفوري المباشر.
                    </p>
                  </div>
                </div>

                {/* Toggle 2: AdSense Ads */}
                <div
                  onClick={() =>
                    setGatewaySettings((prev) => ({
                      ...prev,
                      adSettings: {
                        ...prev.adSettings,
                        isEnabled: !prev.adSettings.isEnabled,
                      },
                    }))
                  }
                  className={`p-4 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                    gatewaySettings.adSettings.isEnabled
                      ? "bg-amber-50/60 border-amber-300 ring-1 ring-amber-300"
                      : "bg-slate-50 border-slate-200 opacity-80"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition ${
                      gatewaySettings.adSettings.isEnabled
                        ? "bg-amber-600 text-white"
                        : "bg-slate-300 text-slate-500"
                    }`}
                  >
                    <Check className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <span className="font-black text-xs text-slate-900 block font-cairo">
                      تفعيل إعلانات Google AdSense
                    </span>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      إظهار الوحدات الإعلانية في الأماكن المخصصة (أعلى وأسفل ووسط بوابة التحميل والمقالات).
                    </p>
                  </div>
                </div>

                {/* Toggle 3: Auto-redirect */}
                <div
                  onClick={() =>
                    setGatewaySettings((prev) => ({
                      ...prev,
                      autoRedirect: !prev.autoRedirect,
                    }))
                  }
                  className={`p-4 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                    gatewaySettings.autoRedirect
                      ? "bg-teal-50/60 border-teal-300 ring-1 ring-teal-300"
                      : "bg-slate-50 border-slate-200 opacity-80"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition ${
                      gatewaySettings.autoRedirect
                        ? "bg-teal-700 text-white"
                        : "bg-slate-300 text-slate-500"
                    }`}
                  >
                    <Check className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <span className="font-black text-xs text-slate-900 block font-cairo">
                      التحويل التلقائي عند انتهاء العداد
                    </span>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      بدء تحميل الملف أو تحويل الزائر تلقائياً فور وصول العداد إلى الصفر دون الحاجة لنقر زر إضافي.
                    </p>
                  </div>
                </div>

                {/* Toggle 4: Show Placeholder Demo Ads */}
                <div
                  onClick={() =>
                    setGatewaySettings((prev) => ({
                      ...prev,
                      adSettings: {
                        ...prev.adSettings,
                        showPlaceholderAds: !prev.adSettings.showPlaceholderAds,
                      },
                    }))
                  }
                  className={`p-4 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                    gatewaySettings.adSettings.showPlaceholderAds
                      ? "bg-blue-50/60 border-blue-300 ring-1 ring-blue-300"
                      : "bg-slate-50 border-slate-200 opacity-80"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition ${
                      gatewaySettings.adSettings.showPlaceholderAds
                        ? "bg-blue-600 text-white"
                        : "bg-slate-300 text-slate-500"
                    }`}
                  >
                    <Check className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <span className="font-black text-xs text-slate-900 block font-cairo">
                      عرض شارات إعلانية تجريبية
                    </span>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      عرض إعلانات توضيحية للمعاينة في حال لم تكن شفرات أدسنس الحقيقية مدخلة بعد.
                    </p>
                  </div>
                </div>

                {/* Toggle 5: Security Badge */}
                <div
                  onClick={() =>
                    setGatewaySettings((prev) => ({
                      ...prev,
                      showSecurityBadge: !prev.showSecurityBadge,
                    }))
                  }
                  className={`p-4 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                    gatewaySettings.showSecurityBadge
                      ? "bg-cyan-50/60 border-cyan-300 ring-1 ring-cyan-300"
                      : "bg-slate-50 border-slate-200 opacity-80"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition ${
                      gatewaySettings.showSecurityBadge
                        ? "bg-cyan-700 text-white"
                        : "bg-slate-300 text-slate-500"
                    }`}
                  >
                    <Check className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <span className="font-black text-xs text-slate-900 block font-cairo">
                      شارة فحص الملف والأمان
                    </span>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      إظهار علامة "ملف مفحوص وخالٍ من الفيروسات" لطمأنة الأساتذة وزيادة ثقة الزوار في المنصة.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Publisher ID, ads.txt & Header Script */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-amber-600" />
                  <h3 className="font-black text-sm sm:text-base text-slate-900 font-cairo">
                    2. معرّف حساب Google AdSense وملف التحقق ads.txt
                  </h3>
                </div>
                <span className="text-[11px] font-bold font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>ads.txt مفعل ومربوط بالجذر</span>
                </span>
              </div>

              {/* ads.txt direct card */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50/60 border border-amber-200/80 rounded-2xl p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="font-black text-xs text-amber-950 flex items-center gap-1.5 font-cairo">
                      <FileText className="w-4 h-4 text-amber-700" />
                      <span>ملف ads.txt الرسمي للمنصة (Google AdSense Crawler Verification):</span>
                    </span>
                    <p className="text-[11px] text-amber-900/80 leading-relaxed">
                      تم تثبيت وتضمين شفرة الناشر المعتمدة في الدليل الجذري للموقع ومسار الرابط:{" "}
                      <strong className="font-mono text-amber-950 font-bold underline" dir="ltr">
                        https://www.profpress.net/ads.txt
                      </strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleCopyAdsTxt}
                      className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      {copiedAdsTxt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedAdsTxt ? "تم نسخ الرمز!" : "نسخ رمز ads.txt"}</span>
                    </button>
                    <a
                      href="/ads.txt"
                      target="_blank"
                      rel="noreferrer"
                      className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Globe className="w-3.5 h-3.5 text-blue-600" />
                      <span>فتح الملف المباشر</span>
                    </a>
                  </div>
                </div>

                <div className="bg-slate-950 text-amber-300 font-mono text-xs p-3 rounded-xl border border-slate-800 flex items-center justify-between overflow-x-auto" dir="ltr">
                  <code>google.com, pub-2606934361036411, DIRECT, f08c47fec0942fa0</code>
                  <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-700 shrink-0 ml-3">
                    DIRECT
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    معرّف الناشر (Publisher Client ID):
                  </label>
                  <input
                    type="text"
                    value={gatewaySettings.adSettings.publisherId}
                    onChange={(e) =>
                      setGatewaySettings((prev) => ({
                        ...prev,
                        adSettings: {
                          ...prev.adSettings,
                          publisherId: e.target.value,
                        },
                      }))
                    }
                    placeholder="ca-pub-2606934361036411"
                    className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 outline-hidden"
                    dir="ltr"
                  />
                  <span className="text-[10px] text-slate-500 block">
                    تجد هذا المعرف في حسابك في Google AdSense تحت قسم: الحساب &gt; معلومات الحساب.
                  </span>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">
                    شفرة AdSense التلقائية في رأس الموقع (Auto Ads):
                  </label>
                  <div
                    onClick={() =>
                      setGatewaySettings((prev) => ({
                        ...prev,
                        adSettings: {
                          ...prev.adSettings,
                          autoAdsEnabled: !prev.adSettings.autoAdsEnabled,
                        },
                      }))
                    }
                    className={`p-3 rounded-xl border transition cursor-pointer flex items-center gap-2.5 ${
                      gatewaySettings.adSettings.autoAdsEnabled
                        ? "bg-amber-50 border-amber-300"
                        : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={gatewaySettings.adSettings.autoAdsEnabled}
                      onChange={() => {}}
                      className="accent-amber-600 rounded"
                    />
                    <span className="text-xs font-bold text-slate-800">
                      حقن سكربت `adsbygoogle.js` تلقائياً في رأس الموقع عند التحميل
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 block">
                    يقوم بحقن السكربت الرسمي المعتمد من جوجل لتمكين الإعلانات التلقائية ووحدات العرض.
                  </span>
                </div>
              </div>
            </div>

            {/* Section 3: Countdown Timer Configuration */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Clock className="w-5 h-5 text-teal-700" />
                <h3 className="font-black text-sm sm:text-base text-slate-900 font-cairo">
                  3. مدة العداد التنازلي والرسائل الإرشادية أثناء الانتظار
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-700 block">
                    مدة الانتظار الحالية:{" "}
                    <span className="text-teal-800 font-black font-mono text-sm">
                      {gatewaySettings.countdownSeconds} ثانية
                    </span>
                  </label>

                  {/* Quick Select Buttons */}
                  <div className="flex flex-wrap items-center gap-2">
                    {[5, 8, 10, 15, 20, 30].map((sec) => (
                      <button
                        key={sec}
                        type="button"
                        onClick={() =>
                          setGatewaySettings((prev) => ({
                            ...prev,
                            countdownSeconds: sec,
                          }))
                        }
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                          gatewaySettings.countdownSeconds === sec
                            ? "bg-teal-700 text-white shadow-xs"
                            : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                        }`}
                      >
                        {sec} ثوانٍ
                      </button>
                    ))}
                  </div>

                  <input
                    type="range"
                    min={3}
                    max={45}
                    value={gatewaySettings.countdownSeconds}
                    onChange={(e) =>
                      setGatewaySettings((prev) => ({
                        ...prev,
                        countdownSeconds: Number(e.target.value),
                      }))
                    }
                    className="w-full accent-teal-700 cursor-pointer"
                  />
                  <span className="text-[11px] text-slate-500 block">
                    المدة الموصى بها هي بين 8 إلى 15 ثانية؛ كافية لمشاهدة الإعلانات والتحميل دون إزعاج القارئ.
                  </span>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">
                    رسالة التنبيه الإرشادية للزائر أثناء الانتظار:
                  </label>
                  <textarea
                    value={gatewaySettings.customNoticeText || ""}
                    onChange={(e) =>
                      setGatewaySettings((prev) => ({
                        ...prev,
                        customNoticeText: e.target.value,
                      }))
                    }
                    rows={3}
                    placeholder="جاري إعداد وتجهيز رابط التحميل الآمن للملف البيداغوجي المعتمد..."
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-600/20 outline-hidden font-cairo"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Section 4: The 3 Google AdSense Ad Units */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-amber-600" />
                  <h3 className="font-black text-sm sm:text-base text-slate-900 font-cairo">
                    4. شفرات الوحدات الإعلانية الثلاث (Ad Units Code)
                  </h3>
                </div>
                <span className="text-xs text-slate-500 font-mono">
                  HTML / Script snippets
                </span>
              </div>

              {/* Ad Unit 1: Top Banner */}
              <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-black text-xs flex items-center justify-center">
                      1
                    </span>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 font-cairo">
                        المنطقة الإعلانية 1: البانر العلوي (Top Leaderboard / Banner)
                      </h4>
                      <span className="text-[11px] text-slate-500">
                        يظهر في أعلى شاشة الانتظار مباشرة قبل بطاقة العداد (موضع ممتاز للرؤية).
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setGatewaySettings((prev) => {
                        const snippet = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${prev.adSettings.publisherId || "ca-pub-2606934361036411"}"
     crossorigin="anonymous"></script>
<!-- respon inside education -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="${prev.adSettings.publisherId || "ca-pub-2606934361036411"}"
     data-ad-slot="4039422419"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>`;
                        return {
                          ...prev,
                          adSettings: {
                            ...prev.adSettings,
                            topAdCode: snippet,
                            topBannerAdCode: snippet,
                          },
                        };
                      })
                    }
                    className="text-[11px] font-bold text-amber-700 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 px-3 py-1 rounded-lg border border-amber-200 cursor-pointer self-start sm:self-auto transition"
                  >
                    + شفرة إعلان 4039422419
                  </button>
                </div>

                <textarea
                  value={gatewaySettings.adSettings.topAdCode || gatewaySettings.adSettings.topBannerAdCode || ""}
                  onChange={(e) =>
                    setGatewaySettings((prev) => ({
                      ...prev,
                      adSettings: {
                        ...prev.adSettings,
                        topAdCode: e.target.value,
                        topBannerAdCode: e.target.value,
                      },
                    }))
                  }
                  rows={4}
                  placeholder="<!-- الصق شفرة الوحدة الإعلانية العلوية من Google AdSense هنا -->"
                  className="w-full bg-slate-900 text-amber-300 font-mono text-xs p-3.5 rounded-xl border border-slate-700 focus:border-amber-500 outline-hidden leading-relaxed shadow-inner"
                  dir="ltr"
                  spellCheck={false}
                ></textarea>
              </div>

              {/* Ad Unit 2: Middle In-Card Ad */}
              <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-900 font-black text-xs flex items-center justify-center">
                      2
                    </span>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 font-cairo">
                        المنطقة الإعلانية 2: وسط بطاقة الانتظار والمقال (In-Card / In-Article)
                      </h4>
                      <span className="text-[11px] text-slate-500">
                        يظهر داخل بطاقة العداد التنازلي بجوار زر التحميل ووسط المقال (أعلى نسبة نقرات CTR).
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setGatewaySettings((prev) => {
                        const snippet = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${prev.adSettings.publisherId || "ca-pub-2606934361036411"}"
     crossorigin="anonymous"></script>
<!-- respon inside education -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="${prev.adSettings.publisherId || "ca-pub-2606934361036411"}"
     data-ad-slot="4039422419"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>`;
                        return {
                          ...prev,
                          adSettings: {
                            ...prev.adSettings,
                            middleAdCode: snippet,
                            middleBannerAdCode: snippet,
                          },
                        };
                      })
                    }
                    className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-3 py-1 rounded-lg border border-emerald-200 cursor-pointer self-start sm:self-auto transition"
                  >
                    + شفرة إعلان 4039422419
                  </button>
                </div>

                <textarea
                  value={gatewaySettings.adSettings.middleAdCode || gatewaySettings.adSettings.middleBannerAdCode || ""}
                  onChange={(e) =>
                    setGatewaySettings((prev) => ({
                      ...prev,
                      adSettings: {
                        ...prev.adSettings,
                        middleAdCode: e.target.value,
                        middleBannerAdCode: e.target.value,
                      },
                    }))
                  }
                  rows={4}
                  placeholder="<!-- الصق شفرة الوحدة الإعلانية الوسطى (مستطيل متوسط 300x250 أو متجاوب) هنا -->"
                  className="w-full bg-slate-900 text-amber-300 font-mono text-xs p-3.5 rounded-xl border border-slate-700 focus:border-emerald-500 outline-hidden leading-relaxed shadow-inner"
                  dir="ltr"
                  spellCheck={false}
                ></textarea>
              </div>

              {/* Ad Unit 3: Bottom Banner */}
              <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 font-black text-xs flex items-center justify-center">
                      3
                    </span>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 font-cairo">
                        المنطقة الإعلانية 3: البانر السفلي (Bottom Footer Banner)
                      </h4>
                      <span className="text-[11px] text-slate-500">
                        يظهر أسفل بطاقة التحميل والشروط والأمان.
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setGatewaySettings((prev) => {
                        const snippet = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${prev.adSettings.publisherId || "ca-pub-2606934361036411"}"
     crossorigin="anonymous"></script>
<!-- respon inside education -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="${prev.adSettings.publisherId || "ca-pub-2606934361036411"}"
     data-ad-slot="4039422419"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>`;
                        return {
                          ...prev,
                          adSettings: {
                            ...prev.adSettings,
                            bottomAdCode: snippet,
                            bottomBannerAdCode: snippet,
                          },
                        };
                      })
                    }
                    className="text-[11px] font-bold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-lg border border-blue-200 cursor-pointer self-start sm:self-auto transition"
                  >
                    + شفرة إعلان 4039422419
                  </button>
                </div>

                <textarea
                  value={gatewaySettings.adSettings.bottomAdCode || gatewaySettings.adSettings.bottomBannerAdCode || ""}
                  onChange={(e) =>
                    setGatewaySettings((prev) => ({
                      ...prev,
                      adSettings: {
                        ...prev.adSettings,
                        bottomAdCode: e.target.value,
                        bottomBannerAdCode: e.target.value,
                      },
                    }))
                  }
                  rows={4}
                  placeholder="<!-- الصق شفرة الوحدة الإعلانية السفلية هنا -->"
                  className="w-full bg-slate-900 text-amber-300 font-mono text-xs p-3.5 rounded-xl border border-slate-700 focus:border-blue-500 outline-hidden leading-relaxed shadow-inner"
                  dir="ltr"
                  spellCheck={false}
                ></textarea>
              </div>
            </div>

            {/* Section 5: AdSense Policy Guidelines Notice */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 sm:p-5 space-y-2 text-xs text-amber-950">
              <div className="flex items-center gap-2 font-black font-cairo">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>إرشادات الامتثال الصارم لسياسات Google AdSense للحفاظ على حسابك:</span>
              </div>
              <ul className="list-disc list-inside space-y-1.5 text-amber-900 text-[11px] leading-relaxed pr-2">
                <li>
                  <strong>عدم تشجيع النقرات:</strong> يمنع تماماً كتابة أي عبارات تحث الزوار على النقر على الإعلانات (مثل "انقر هنا لدعمنا" أو "اضغط على الإعلان لتحميل الملف").
                </li>
                <li>
                  <strong>وسم الإعلان الإلزامي:</strong> تقوم بوابتنا تلقائياً بوضع علامة "إعلان / Annonce" واضحة وشفافة فوق كل وحدة إعلانية للامتثال الصارم لسياسات جوجل.
                </li>
                <li>
                  <strong>المسافة الفاصلة:</strong> تم تصميم المسافات بين أزرار التحميل والإعلانات وفق معايير جوجل لتجنب النقرات غير المقصودة (Accidental clicks).
                </li>
              </ul>
            </div>

            {/* Bottom Save / Action Bar */}
            <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>
                  الحفظ يتم فورياً ويتم تفعيل التغييرات على جميع أزرار التحميل في المنصة.
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetGatewaySettings}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs transition cursor-pointer"
                >
                  استعادة الافتراضي
                </button>
                <button
                  type="button"
                  onClick={() => setShowGatewayPreview(true)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition cursor-pointer flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-amber-600" />
                  <span>معاينة حية</span>
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm px-6 py-2.5 rounded-xl transition shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ وتطبيق إعدادات الإعلانات والتحميل</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB: ACCOUNT & SECURITY */}
      {/* ========================================================================= */}
      {activeTab === "account" && (
        <div className="space-y-6">
          {/* Success / Error Banners */}
          {accountPassSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm p-4 rounded-2xl flex items-center gap-3 shadow-2xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="font-bold">{accountPassSuccess}</div>
            </div>
          )}

          {accountPassError && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm p-4 rounded-2xl flex items-center gap-3 shadow-2xs">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <div className="font-bold">{accountPassError}</div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Form Column: Change Password */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shadow-2xs">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base font-cairo text-slate-900">
                    تغيير كلمة المرور الخاصة بلوحة التحكم
                  </h3>
                  <p className="text-xs text-slate-500">
                    يمكنك تعديل كلمة المرور وتعيين كلمة سر جديدة خاصة بك في أي وقت
                  </p>
                </div>
              </div>

              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span>كلمة المرور الحالية:</span>
                  </label>
                  <input
                    type={showPass ? "text" : "password"}
                    value={currentPassInput}
                    onChange={(e) => setCurrentPassInput(e.target.value)}
                    placeholder="أدخل كلمة المرور الحالية..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-mono outline-hidden focus:ring-2 focus:ring-amber-500 text-left"
                    dir="ltr"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    كلمة المرور الجديدة التي تختارها:
                  </label>
                  <input
                    type={showPass ? "text" : "password"}
                    value={newPassInput}
                    onChange={(e) => setNewPassInput(e.target.value)}
                    placeholder="أدخل كلمة المرور الجديدة..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-mono outline-hidden focus:ring-2 focus:ring-amber-500 text-left"
                    dir="ltr"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700">
                      تأكيد كلمة المرور الجديدة:
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                    >
                      {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{showPass ? "إخفاء كلمات المرور" : "إظهار كلمات المرور"}</span>
                    </button>
                  </div>
                  <input
                    type={showPass ? "text" : "password"}
                    value={confirmPassInput}
                    onChange={(e) => setConfirmPassInput(e.target.value)}
                    placeholder="أعد كتابة كلمة المرور الجديدة للتأكيد..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-mono outline-hidden focus:ring-2 focus:ring-amber-500 text-left"
                    dir="ltr"
                    required
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm py-3 rounded-xl transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>حفظ وتحديث كلمة المرور الجديدة</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Info Column: Linked Email & Admin Profile */}
            <div className="lg:col-span-5 space-y-4">
              {/* Linked Email Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 font-cairo">
                        البريد الإداري المعتمد
                      </h4>
                      <span className="text-[11px] text-slate-500">حساب المدير الأساسي المربوط</span>
                    </div>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>مرتبط وموثق</span>
                  </span>
                </div>

                <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 flex items-center justify-between gap-2">
                  <span className="font-mono text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5" dir="ltr">
                    <Shield className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{showEmailHeader ? adminCreds.email : getMaskedEmail(adminCreds.email)}</span>
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setShowEmailHeader(!showEmailHeader)}
                      className="p-1.5 hover:bg-white text-slate-500 hover:text-slate-800 rounded-lg border border-transparent hover:border-slate-200 transition cursor-pointer"
                      title={showEmailHeader ? "إخفاء البريد" : "إظهار البريد"}
                    >
                      {showEmailHeader ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="p-1.5 hover:bg-white text-slate-500 hover:text-slate-800 rounded-lg border border-transparent hover:border-slate-200 transition cursor-pointer"
                      title="نسخ البريد"
                    >
                      {copiedEmail ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">الرتبة والصلاحية:</span>
                    <strong className="text-teal-800">المشرف العام (Super Admin)</strong>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">آخر تحديث لكلمة المرور:</span>
                    <strong className="font-mono text-slate-800">{adminCreds.updatedAt || "شتنبر 2026"}</strong>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-500">نطاق التحكم:</span>
                    <strong className="text-slate-800">المقالات، السيو، والصلاحيات</strong>
                  </div>
                </div>
              </div>

              {/* Display Name Edit Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3.5">
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 font-cairo flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-700" />
                  <span>تعديل الاسم الإداري المعروض</span>
                </h4>

                {nameSaveMsg && (
                  <div className="bg-emerald-50 text-emerald-800 text-xs p-2.5 rounded-xl border border-emerald-200">
                    {nameSaveMsg}
                  </div>
                )}

                <form onSubmit={handleUpdateName} className="space-y-3">
                  <input
                    type="text"
                    value={displayNameInput}
                    onChange={(e) => setDisplayNameInput(e.target.value)}
                    placeholder="اسم المشرف الظاهر..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-bold outline-hidden focus:ring-2 focus:ring-teal-600"
                  />
                  <button
                    type="submit"
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs py-2 rounded-xl transition cursor-pointer"
                  >
                    تحديث الاسم المعروض
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: COMPETITION SUBJECTS & SPECIALITIES MANAGEMENT */}
      {/* ========================================================================= */}
      {activeTab === "competition_subjects" && (
        <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>توصيفات ومواد مباريات التعليم</span>
                </span>
                <span className="text-xs text-slate-500 font-bold">
                  إدارة المحتوى التخصصي والوثائق
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black font-cairo text-slate-900 mt-1">
                إدارة مواد وتخصصات مباريات التعليم (أطر التدريس والدعم)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                مراقبة شاملة لكافة تخصصات الابتدائي، الثانوي بسلكيه، والأطر التربوية مع توصيفاتها ومراجعها
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCompetitionData(getCompetitionDataFromStorage())}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-3 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                title="تحديث البيانات من الذاكرة"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>تحديث القائمة</span>
              </button>
            </div>
          </div>

          {/* Quick Filters and Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSubjectsFilter("all")}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                  subjectsFilter === "all"
                    ? "bg-teal-700 text-white shadow-2xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                جميع الأسلاك والتخصصات
              </button>
              <button
                type="button"
                onClick={() => setSubjectsFilter("primary")}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                  subjectsFilter === "primary"
                    ? "bg-teal-700 text-white shadow-2xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                سلك التعليم الابتدائي
              </button>
              <button
                type="button"
                onClick={() => setSubjectsFilter("secondary")}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                  subjectsFilter === "secondary"
                    ? "bg-teal-700 text-white shadow-2xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                سلك التعليم الثانوي (إعدادي وتأهيلي)
              </button>
              <button
                type="button"
                onClick={() => setSubjectsFilter("other")}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                  subjectsFilter === "other"
                    ? "bg-teal-700 text-white shadow-2xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                أطر الدعم والتخصصات الأخرى
              </button>
            </div>

            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
              <input
                type="text"
                value={subjectsSearch}
                onChange={(e) => setSubjectsSearch(e.target.value)}
                placeholder="بحث في المواد والتخصصات..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-9 pl-3 py-2 text-xs font-bold outline-hidden focus:ring-2 focus:ring-teal-600"
              />
            </div>
          </div>

          {/* Subjects Table & Overview */}
          {(() => {
            const rawPrimary = competitionData?.primarySubjects || [];
            const rawSecondary = competitionData?.secondarySubjects || [];
            const rawOther = competitionData?.otherSpecialties || [];

            type SubjectWithCycle = {
              id: string;
              title: string;
              cycleLabel: string;
              cycleKey: "primary" | "secondary" | "other";
              description?: string;
              subActions?: any[];
              downloads?: any[];
            };

            const combined: SubjectWithCycle[] = [
              ...rawPrimary.map((s: any) => ({ ...s, cycleLabel: "الابتدائي", cycleKey: "primary" as const })),
              ...rawSecondary.map((s: any) => ({ ...s, cycleLabel: "الثانوي", cycleKey: "secondary" as const })),
              ...rawOther.map((s: any) => ({ ...s, cycleLabel: "أطر الدعم", cycleKey: "other" as const })),
            ];

            const filtered = combined.filter((s) => {
              if (subjectsFilter !== "all" && s.cycleKey !== subjectsFilter) return false;
              if (subjectsSearch.trim() && !s.title.toLowerCase().includes(subjectsSearch.toLowerCase())) {
                return false;
              }
              return true;
            });

            return (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                    <span className="text-xs font-bold text-slate-500">تخصصات الابتدائي</span>
                    <div className="text-2xl font-black text-slate-900 font-cairo mt-1">
                      {rawPrimary.length}{" "}
                      <span className="text-xs text-slate-500 font-normal">تخصص (مزدوج + أمازيغية)</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                    <span className="text-xs font-bold text-slate-500">مواد التعليم الثانوي</span>
                    <div className="text-2xl font-black text-slate-900 font-cairo mt-1">
                      {rawSecondary.length}{" "}
                      <span className="text-xs text-slate-500 font-normal">مادة تخصصية</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                    <span className="text-xs font-bold text-slate-500">أطر الدعم والتخصصات الأخرى</span>
                    <div className="text-2xl font-black text-slate-900 font-cairo mt-1">
                      {rawOther.length}{" "}
                      <span className="text-xs text-slate-500 font-normal">تخصص ومجال</span>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3">السلك التعليمي</th>
                        <th className="p-3">اسم المادة / التخصص</th>
                        <th className="p-3">عدد التوصيفات والأقسام</th>
                        <th className="p-3">وثائق التحميل</th>
                        <th className="p-3">الحالة والصلاحية</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filtered.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-6 text-center text-slate-400 font-bold">
                            لا توجد مواد مطابقة لمعايير البحث الحالية
                          </td>
                        </tr>
                      ) : (
                        filtered.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50 transition">
                            <td className="p-3 whitespace-nowrap">
                              <span
                                className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                                  item.cycleKey === "primary"
                                    ? "bg-amber-100 text-amber-900"
                                    : item.cycleKey === "secondary"
                                    ? "bg-blue-100 text-blue-900"
                                    : "bg-purple-100 text-purple-900"
                                }`}
                              >
                                {item.cycleLabel}
                              </span>
                            </td>
                            <td className="p-3 font-bold font-cairo text-slate-900">
                              <div>{item.title}</div>
                              {item.description && (
                                <div className="text-[11px] text-slate-500 truncate max-w-sm">
                                  {item.description}
                                </div>
                              )}
                            </td>
                            <td className="p-3 text-slate-600 font-mono">
                              {item.subActions?.length || 0} محور مخصص
                            </td>
                            <td className="p-3 text-slate-600 font-mono">
                              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2 py-0.5 rounded-md font-bold text-[11px]">
                                {item.downloads?.length || 0} ملف متاح
                              </span>
                            </td>
                            <td className="p-3 whitespace-nowrap">
                              <span className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>جاهز ومحدث</span>
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-teal-700" />
                    <span>
                      يمكن للمدير تعديل محتوى هذه المواد بالتفصيل وإضافة توصيفات وروابط مباشرة من تبويب "مباراة التعليم" عبر زر القلم الإداري.
                    </span>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 8: BACKUP & RESTORE DATA CENTER */}
      {/* ========================================================================= */}
      {activeTab === "backup" && (
        <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-cyan-100 text-cyan-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Database className="w-3.5 h-3.5" />
                  <span>مركز البيانات والأمان المتقدم</span>
                </span>
                <span className="text-xs text-slate-500 font-bold">
                  نسخ احتياطي واسترجاع فوري
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black font-cairo text-slate-900 mt-1">
                النسخ الاحتياطي الشامل واسترجاع محتوى الموقع
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                تصدير كافة مقالات الموقع، بيانات مباريات التعليم، إعدادات السيو، والأكواد المحقونة في ملف واحد آمن
              </p>
            </div>
          </div>

          {backupMsg && (
            <div
              className={`p-4 rounded-2xl text-xs font-bold border flex items-center gap-2.5 ${
                backupMsg.type === "success"
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                  : "bg-rose-50 text-rose-800 border-rose-200"
              }`}
            >
              {backupMsg.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span>{backupMsg.text}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Export Card */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 font-cairo">
                      تصدير وحفظ نسخة احتياطية كاملة (JSON)
                    </h3>
                    <p className="text-xs text-slate-500">
                      حفظ كافة المقالات والمواد التخصصية والأكواد على حاسوبك
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-3.5 border border-slate-200 text-xs space-y-2 text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>عدد المقالات والمذكرات:</span>
                    <strong className="font-mono text-slate-900">{topics.length} عنصر</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>مواد وتوصيفات المباريات:</span>
                    <strong className="font-mono text-slate-900">
                      {(competitionData?.primarySubjects?.length || 0) +
                        (competitionData?.secondarySubjects?.length || 0) +
                        (competitionData?.otherSpecialties?.length || 0)}{" "}
                      تخصص
                    </strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>أكواد وسكربتات مخصصة:</span>
                    <strong className="font-mono text-slate-900">
                      {customCode.isEnabled ? "مفعلة ونشطة" : "معطلة"}
                    </strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>حالة تشفير الجلسة:</span>
                    <strong className="text-emerald-700 font-bold">مؤمنة بالكامل</strong>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleExportFullBackup}
                className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm py-3 rounded-xl transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>تحميل النسخة الاحتياطية الكاملة الآن</span>
              </button>
            </div>

            {/* Import Card */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 font-cairo">
                      استرجاع واستيراد نسخة احتياطية
                    </h3>
                    <p className="text-xs text-slate-500">
                      رفع ملف نسخة احتياطية سابقة واستعادة محتوى الموقع كاملاً
                    </p>
                  </div>
                </div>

                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center bg-white space-y-2">
                  <Database className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="text-xs text-slate-600 font-bold">
                    اختر ملف النسخة الاحتياطية بصيغة JSON من جهازك
                  </p>
                  <p className="text-[11px] text-slate-400">
                    سيتم تحديث المقالات ومواد المباريات فوراً بعد فحص سلامة الملف
                  </p>
                </div>
              </div>

              <label className="w-full bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-xs sm:text-sm py-3 rounded-xl transition shadow-xs flex items-center justify-center gap-2 cursor-pointer">
                <Upload className="w-4 h-4" />
                <span>اختيار واسترجاع ملف النسخة</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportBackupFile}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Gateway Live Preview Modal for Admin */}
      {showGatewayPreview && (
        <DownloadGatewayModal
          isOpen={showGatewayPreview}
          onClose={() => setShowGatewayPreview(false)}
          fileTitle="دليل أنشطة الدعم المؤسساتي والتقويم التشخيصي 2026 (معاينة تجريبية)"
          downloadUrl="https://www.profpress.net/download/sample-doc.pdf"
          fileType="pdf"
          fileSize="3.8 MB"
          sourceTopicTitle="دليل بيداغوجي رسمي لمدارس الريادة"
        />
      )}
    </div>
  );

  if (isOpen !== undefined) {
    return (
      <div className="no-print fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-start justify-center p-2 sm:p-4 overflow-y-auto">
        <div className="w-full max-w-7xl my-4 sm:my-8 bg-slate-100 rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-300 relative">
          {panelContent}
        </div>
      </div>
    );
  }

  return panelContent;
};

