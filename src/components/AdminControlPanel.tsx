import React, { useState } from "react";
import {
  ShieldCheck,
  FileText,
  Sparkles,
  Users,
  Activity,
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
} from "lucide-react";
import { TopicItem, AdminSession, VisitorPermissions, TopicProposal, TopicCategory } from "../types";
import { analyzeRankMathSeo } from "../utils/rankMathSeo";
import {
  getAdminCredentials,
  updateAdminPassword,
  updateAdminProfile,
  DEFAULT_ADMIN_EMAIL,
  AdminCredentials,
} from "../utils/adminAuth";

interface AdminControlPanelProps {
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
  topics,
  adminSession,
  onEditTopic,
  onAddNewTopic,
  onDeleteTopic,
  onToggleUrgent,
  onSaveTopics,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<"topics" | "seo" | "permissions" | "monitoring" | "account">("topics");
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedSitemap, setCopiedSitemap] = useState(false);

  // Account & Credentials state (tied to kolchitv@gmail.com)
  const [adminCreds, setAdminCreds] = useState<AdminCredentials>(getAdminCredentials);
  const [currentPassInput, setCurrentPassInput] = useState("");
  const [newPassInput, setNewPassInput] = useState("");
  const [confirmPassInput, setConfirmPassInput] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [accountPassSuccess, setAccountPassSuccess] = useState<string | null>(null);
  const [accountPassError, setAccountPassError] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [displayNameInput, setDisplayNameInput] = useState(adminCreds.adminName);
  const [nameSaveMsg, setNameSaveMsg] = useState<string | null>(null);

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
  const filteredTopics = topics.filter(
    (t) =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.categoryLabel.includes(searchTerm) ||
      t.author.includes(searchTerm)
  );

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

  return (
    <div className="space-y-6 max-w-6xl mx-auto" dir="rtl">
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
              <span>البريد المربوط:</span>
              <span className="font-mono font-bold text-amber-300 bg-white/10 px-2 py-0.5 rounded-md border border-white/15">
                {adminCreds.email}
              </span>
              <span className="text-[10px] bg-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                موثق
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
            <span>كتابة ونشر موضوع جديد</span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="bg-white/10 hover:bg-white/20 text-slate-200 border border-white/20 font-bold text-xs px-3.5 py-2.5 rounded-xl transition cursor-pointer"
          >
            تسجيل الخروج
          </button>
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
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
            activeTab === "topics"
              ? "bg-teal-700 text-white shadow-xs"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>إدارة المواضيع والمقالات ({topics.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("seo")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
            activeTab === "seo"
              ? "bg-teal-700 text-white shadow-xs"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>تحسين السيو الشامل (Rank Math Suite)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("permissions")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
            activeTab === "permissions"
              ? "bg-teal-700 text-white shadow-xs"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>صلاحيات الزوار والناشرين ({proposals.length} مقترحات)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("monitoring")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
            activeTab === "monitoring"
              ? "bg-teal-700 text-white shadow-xs"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-400" />
          <span>مراقبة أداء وزيارات الموقع (Live Analytics)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("account")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
            activeTab === "account"
              ? "bg-amber-600 text-white shadow-xs"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          <KeyRound className="w-4 h-4 text-amber-300" />
          <span>إعدادات الحساب وكلمة المرور</span>
          <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-mono hidden md:inline">
            kolchitv@gmail.com
          </span>
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
                          <button
                            type="button"
                            onClick={() => onDeleteTopic(topic.id)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                            title="حذف الموضوع"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
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

              <div className="flex items-center gap-2">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      {/* TAB 5: ACCOUNT SETTINGS & CHANGE PASSWORD (kolchitv@gmail.com) */}
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
                    <span>كلمة المرور الحالية (الافتراضية: admin2026 أو الحالية):</span>
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
                  <span className="font-mono text-xs sm:text-sm font-bold text-slate-900" dir="ltr">
                    {adminCreds.email}
                  </span>
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
    </div>
  );
};
