import React, { useState, useEffect } from "react";
import {
  PhoneCall,
  Mail,
  MessageCircle,
  Clock,
  Send,
  CheckCircle2,
  Copy,
  Check,
  HelpCircle,
  School,
  FileText,
  Sparkles,
  Layers,
  Calendar,
  AlertCircle,
  User,
  MapPin,
  Briefcase,
  ChevronDown,
  History,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { TabKey } from "../types";
import { PROFPRESS_CONTACT_INFO } from "./ContactModal";

interface ContactPageProps {
  onNavigateToTab: (tab: TabKey) => void;
  defaultTopic?: string;
}

interface SubmittedFeedback {
  id: string;
  senderName: string;
  senderContact: string;
  category: string;
  subject: string;
  message: string;
  createdAt: string;
  status: "received" | "reviewed";
}

const STORAGE_KEY_FEEDBACKS = "profpress_user_feedbacks_history";

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigateToTab,
  defaultTopic = "",
}) => {
  const [senderName, setSenderName] = useState("");
  const [senderContact, setSenderContact] = useState("");
  const [role, setRole] = useState("أستاذ(ة) التعليم الابتدائي");
  const [directorate, setDirectorate] = useState("");
  const [category, setCategory] = useState("ملاحظة بيداغوجية");
  const [subject, setSubject] = useState(defaultTopic || "");
  const [message, setMessage] = useState("");
  const [urgency, setUrgency] = useState<"normal" | "important" | "urgent">("normal");

  const [isCopied, setIsCopied] = useState(false);
  const [isPhoneCopied, setIsPhoneCopied] = useState(false);
  const [isEmailCopied, setIsEmailCopied] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);
  const [lastSubmissionId, setLastSubmissionId] = useState("");

  const [feedbacksHistory, setFeedbacksHistory] = useState<SubmittedFeedback[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Load history on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_FEEDBACKS);
      if (stored) {
        setFeedbacksHistory(JSON.parse(stored));
      }
    } catch {
      // Ignore
    }
  }, []);

  const categories = [
    { id: "ملاحظة بيداغوجية", label: "ملاحظة بيداغوجية", desc: "حول الجذاذات، التوزيع السنوي، أو التوجيهات الرسمية" },
    { id: "مدارس الريادة و TaRL", label: "مدارس الريادة و TaRL", desc: "حول ورشات الريادة ومسارات الدعم الصريح" },
    { id: "تنظيم مدرسي واستعمال الزمن", label: "تنظيم مدرسي وجداول الحصص", desc: "نظام الفوجين، الدوام الكامل، أو توزيع القاعات" },
    { id: "شبكات مسار والمراقبة المستمرة", label: "شبكات مسار والمراقبة", desc: "حول تفريغ النقط وحساب المعدلات الدورية" },
    { id: "اقتراح وثيقة أو فكرة جديدة", label: "اقتراح وثيقة جديدة", desc: "فكرة وثيقة أو تحسين ترغب برؤيته في المنصة" },
    { id: "مشكلة فنية أو استفسار طباعة A4", label: "مشكلة فنية أو استفسار طباعة", desc: "حول إعدادات الطباعة، مقاس A4، أو ملفات PDF" },
  ];

  const quickSubjects = [
    "ملاحظة بخصوص تقرير ورشات الريادة (3 صفحات)",
    "استفسار عن توافق جداول الحصص مع التوجيهات الجديدة",
    "اقتراح إضافة نموذج شبكة تفريغ للمستوى السادس",
    "طلب نموذج ميثاق القسم باللغة الفرنسية",
    "ملاحظة عامة حول تجربة استخدام المنصة",
  ];

  const handleCopyMessage = () => {
    const fullText = `*رسالة من صفحة الاتصال والملاحظات - موقع بروف بريس Profpress.net*
----------------------------------------
👤 الاسم: ${senderName || "أستاذ(ة)"}
💼 الصفة: ${role}
📍 المديرية/المؤسسة: ${directorate || "غير محدد"}
📞 وسيلة الاتصال: ${senderContact || "غير محدد"}
📂 التصنيف: ${category}
⭐ الأهمية: ${urgency === "urgent" ? "عاجل جداً" : urgency === "important" ? "مهم" : "عادي"}
📌 الموضوع: ${subject || "ملاحظات عامة"}

💬 نص الرسالة والملاحظة:
${message || "السلام عليكم ورحمة الله، أود مشاركة هذه الملاحظة البيداغوجية معكم."}
----------------------------------------
التاريخ: ${new Date().toLocaleDateString("ar-MA")}`;

    navigator.clipboard.writeText(fullText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PROFPRESS_CONTACT_INFO.phone);
    setIsPhoneCopied(true);
    setTimeout(() => setIsPhoneCopied(false), 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFPRESS_CONTACT_INFO.primaryEmail);
    setIsEmailCopied(true);
    setTimeout(() => setIsEmailCopied(false), 2000);
  };

  const handleDirectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && !subject.trim()) {
      alert("يرجى كتابة موضوع أو نص الملاحظة قبل الإرسال.");
      return;
    }

    const newId = `NOTE-${Date.now().toString().slice(-6)}`;
    const newFeedback: SubmittedFeedback = {
      id: newId,
      senderName: senderName || "أستاذ(ة)",
      senderContact: senderContact || "عبر الموقع مباشرة",
      category,
      subject: subject || "ملاحظة موجهة لإدارة المنصة",
      message: message || "تم تسجيل الملاحظة بنجاح.",
      createdAt: new Date().toLocaleString("ar-MA", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "received",
    };

    const updated = [newFeedback, ...feedbacksHistory];
    setFeedbacksHistory(updated);
    try {
      localStorage.setItem(STORAGE_KEY_FEEDBACKS, JSON.stringify(updated));
    } catch {
      // Ignore
    }

    setLastSubmissionId(newId);
    setIsSubmittedSuccess(true);
  };

  const handleSendWhatsApp = () => {
    const waText = encodeURIComponent(
      `*موقع بروف بريس Profpress.net - صفحة الاتصال والملاحظات*\n` +
      `👤 *الاسم:* ${senderName || "أستاذ(ة)"} (${role})\n` +
      `📍 *المديرية:* ${directorate || "غير محدد"}\n` +
      `📂 *التصنيف:* ${category}\n` +
      `📌 *الموضوع:* ${subject || "ملاحظة واستفسار"}\n\n` +
      `💬 *نص الملاحظة:*\n${message || "السلام عليكم، لدي ملاحظة واستفسار بخصوص وثائق ومستجدات المنصة."}`
    );
    window.open(`https://wa.me/${PROFPRESS_CONTACT_INFO.whatsappNumber}?text=${waText}`, "_blank");
  };

  const handleSendEmail = () => {
    const mailSubject = encodeURIComponent(`[بروف بريس] ${category}: ${subject || "ملاحظة بيداغوجية"}`);
    const mailBody = encodeURIComponent(
      `السلام عليكم ورحمة الله،\n\nالاسم: ${senderName || "أستاذ(ة)"}\nالصفة: ${role}\nالمديرية/المؤسسة: ${directorate || "غير محدد"}\nرقم الهاتف للتواصل: ${senderContact || "غير محدد"}\nالتصنيف: ${category}\n\nنص الرسالة والملاحظة:\n${message}\n\n---\nتم الإرسال عبر صفحة الاتصال والملاحظات بموقع بروف بريس Profpress.net`
    );
    window.open(`mailto:${PROFPRESS_CONTACT_INFO.primaryEmail}?subject=${mailSubject}&body=${mailBody}`, "_blank");
  };

  const handleClearHistory = () => {
    if (window.confirm("هل أنت متأكد من رغبتك في مسح سجل الملاحظات المسجلة على هذا المتصفح؟")) {
      setFeedbacksHistory([]);
      localStorage.removeItem(STORAGE_KEY_FEEDBACKS);
    }
  };

  const handleResetForm = () => {
    setIsSubmittedSuccess(false);
    setSubject("");
    setMessage("");
    setLastSubmissionId("");
  };

  const faqs = [
    {
      q: "هل صفحة الاتصال والملاحظات مخصصة لمؤسسات الريادة أيضاً؟",
      a: "نعم بالتأكيد، نولي اهتماماً فائقاً بملاحظات وأسئلة أستاذات وأساتذة مؤسسات الريادة، وتحديداً ما يرتبط بأنشطة مقاربة التدريس وفق المستوى المناسب (TaRL)، محطات الموضعة، تقارير الورشات، وهندسة مسارات الرياضيات واللغات.",
    },
    {
      q: "كيف تضمنون مطابقة الوثائق للمواصفات الرسمية لوزارة التربية الوطنية؟",
      a: "تخضع جميع الوثائق في المنصة للمراجعة المستمرة فور صدور المذكرات الوزارية المنظمة للموسم الدراسي 2026/2027، وتعتمد المقاييس الطباعية الدولية (A4: 210×297 مم) مع هامش أمان متناسق وتصدير فائق الدقة (300 DPI).",
    },
    {
      q: "أين تُحفظ الملاحظات والمعلومات التي أرسلها عبر هذه الصفحة؟",
      a: "تُحفظ ملاحظاتكم في السجل المحلي لمتصفحكم لتوثيق وتتبع مراسلاتكم، كما تُرسل مباشرة عبر القنوات الرسمية (البريد الإلكتروني / واتساب الفوري) إلى الفريق التقني والبيداغوجي لموقع بروف بريس دون مشاركتها مع أي جهة خارجية.",
    },
    {
      q: "هل يمكنني اقتراح إضافة وثيقة بيداغوجية جديدة غير متوفرة حالياً؟",
      a: "نعم! نرحب باقتراحاتكم لتطوير نماذج جديدة (مثل جذاذات إضافية، بطاقات متابعة، ملصقات الفضاء الصفي، أو شبكات تقويم مخصصة). اختر تصنيف 'اقتراح وثيقة أو فكرة جديدة' وسيقوم الفريق بدراستها وإدراجها فوراً.",
    },
  ];

  return (
    <div id="contact-page-view" className="space-y-8 font-cairo text-right" dir="rtl">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER & BREADCRUMBS */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-700 relative overflow-hidden">
        {/* Subtle decorative background circles */}
        <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-blue-200">
            <button
              type="button"
              onClick={() => onNavigateToTab("home")}
              className="hover:text-amber-300 transition cursor-pointer font-bold"
            >
              الرئيسية
            </button>
            <span>/</span>
            <span className="text-amber-400 font-bold">صفحة الاتصال والملاحظات</span>
            <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
              الموقع الداخلي
            </span>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-lg font-black">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight">
                صفحة الاتصال والملاحظات
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                قناتكم المباشرة للتواصل، إبداء الملاحظات البيداغوجية، وتقديم المقترحات والاستفسارات لفريق موقع الأساتذة بروف بريس.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. DIRECT CHANNELS CARDS (3 FAST ACTION TILES) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Channel 1: Phone & Instant Dial */}
        <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-900 block">الهاتف المباشر</span>
                <span className="text-xs text-slate-500">الاتصال الهاتفي السريع</span>
              </div>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
              متاح
            </span>
          </div>

          <div className="bg-emerald-50/60 rounded-xl p-3 border border-emerald-100 text-center">
            <span className="text-base font-mono font-black text-emerald-900 dir-ltr block">
              {PROFPRESS_CONTACT_INFO.phoneFormatted}
            </span>
            <span className="text-[11px] text-emerald-700 mt-0.5 block">
              الرقم الوطني: {PROFPRESS_CONTACT_INFO.phone}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${PROFPRESS_CONTACT_INFO.phone}`}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3 rounded-xl text-xs text-center transition flex items-center justify-center gap-1.5 shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>اتصال فوري</span>
            </a>
            <button
              type="button"
              onClick={handleCopyPhone}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1"
              title="نسخ رقم الهاتف"
            >
              {isPhoneCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isPhoneCopied ? "تم النسخ" : "نسخ"}</span>
            </button>
          </div>
        </div>

        {/* Channel 2: WhatsApp Chat */}
        <div className="bg-white rounded-2xl p-5 border border-green-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-600 text-white flex items-center justify-center shadow-xs">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-green-900 block">واتساب الدعم البيداغوجي</span>
                <span className="text-xs text-slate-500">رسائل نصية واستفسارات</span>
              </div>
            </div>
            <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
              رد سريع
            </span>
          </div>

          <div className="bg-green-50/60 rounded-xl p-3 border border-green-100 text-center">
            <span className="text-xs text-green-900 font-bold block">
              تواصل مباشر مع مسؤولي النشر
            </span>
            <span className="text-[11px] text-green-700 mt-0.5 block">
              إرسال الاستفسارات والملاحظات بنقرة واحدة
            </span>
          </div>

          <button
            type="button"
            onClick={handleSendWhatsApp}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-3 rounded-xl text-xs text-center transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>محادثة واتساب مجهزة</span>
          </button>
        </div>

        {/* Channel 3: Official Email */}
        <div className="bg-white rounded-2xl p-5 border border-blue-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-blue-900 block">البريد الإلكتروني الرسمي</span>
                <span className="text-xs text-slate-500">المراسلات والوثائق الرسمية</span>
              </div>
            </div>
            <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono">
              24/7
            </span>
          </div>

          <div className="bg-blue-50/60 rounded-xl p-3 border border-blue-100 text-center">
            <span className="text-xs font-mono font-bold text-blue-900 dir-ltr block truncate">
              {PROFPRESS_CONTACT_INFO.primaryEmail}
            </span>
            <span className="text-[11px] text-blue-700 mt-0.5 block">
              لإرسال الملفات والتقارير المكتوبة
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSendEmail}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-xl text-xs text-center transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>إرسال بريد</span>
            </button>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1"
              title="نسخ البريد الإلكتروني"
            >
              {isEmailCopied ? <Check className="w-3.5 h-3.5 text-blue-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isEmailCopied ? "تم" : "نسخ"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MAIN INTERACTIVE FORM SECTION & SIDEBAR */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT/MAIN: Interactive Feedback Form (Col Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                  <Send className="w-5 h-5 text-blue-700" />
                  <span>نموذج تسجيل وإرسال الملاحظات على الموقع</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  يمكنكم إرسال ملاحظاتكم مباشرة، أو توجيهها عبر واتساب والبريد الإلكتروني بضغطة زر.
                </p>
              </div>

              {feedbacksHistory.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowHistory(!showHistory)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer flex items-center gap-1.5 border border-slate-200"
                >
                  <History className="w-3.5 h-3.5 text-blue-600" />
                  <span>سجل الملاحظات ({feedbacksHistory.length})</span>
                </button>
              )}
            </div>

            {/* If successfully submitted */}
            {isSubmittedSuccess ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-4 animate-fadeIn">
                <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-black text-emerald-950">
                    تم استلام وتسجيل ملاحظتكم بنجاح في المنصة!
                  </h3>
                  <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                    شكراً لمساهمتكم في تطوير المحتوى البيداغوجي. تم حفظ الملاحظة بالرقم المرجعي{" "}
                    <span className="font-mono font-black text-emerald-950 bg-emerald-200/70 px-2 py-0.5 rounded-md">
                      {lastSubmissionId}
                    </span>{" "}
                    وسيتم أخذها بعين الاعتبار من قبل هيئة التحرير والتنسيق.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>إرسال نسخة عبر واتساب</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold rounded-xl transition cursor-pointer"
                  >
                    إرسال ملاحظة أخرى
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleDirectSubmit} className="space-y-5 text-xs">
                {/* Category Selection Chips */}
                <div className="space-y-2">
                  <label className="block text-slate-800 font-bold text-xs">
                    اختر نوع ومجال الملاحظة:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {categories.map((cat) => {
                      const isSelected = category === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setCategory(cat.id)}
                          className={`p-3 rounded-2xl border text-right transition cursor-pointer flex flex-col gap-0.5 ${
                            isSelected
                              ? "bg-blue-50 border-blue-600 text-blue-950 font-bold shadow-xs ring-1 ring-blue-600"
                              : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold">{cat.label}</span>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />}
                          </div>
                          <span className="text-[10px] text-slate-500 font-normal leading-tight">
                            {cat.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Personal Information Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      الاسم الكامل أو اللقب:
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="مثال: الأستاذ رشيد أو أستاذة اللغة العربية"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 pr-8 text-xs focus:ring-2 focus:ring-blue-600 focus:bg-white outline-hidden"
                      />
                      <User className="w-4 h-4 text-slate-400 absolute right-2.5 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      الصفة / المهمة:
                    </label>
                    <div className="relative">
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-blue-600 focus:bg-white outline-hidden"
                      >
                        <option value="أستاذ(ة) التعليم الابتدائي">أستاذ(ة) التعليم الابتدائي</option>
                        <option value="أستاذ(ة) بمؤسسة الريادة">أستاذ(ة) بمؤسسة الريادة</option>
                        <option value="أستاذ(ة) مكلف بالدعم التربوي">أستاذ(ة) مكلف بالدعم التربوي</option>
                        <option value="مدير(ة) مؤسسة تعليمية">مدير(ة) مؤسسة تعليمية</option>
                        <option value="مفتش(ة) تربوي(ة)">مفتش(ة) تربوي(ة)</option>
                        <option value="إطار تربوي أو مهتم بالشأن التعليمي">إطار تربوي أو مهتم</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      وسيلة التواصل للرد (هاتف أو بريد):
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={senderContact}
                        onChange={(e) => setSenderContact(e.target.value)}
                        placeholder="مثال: 0612345678 أو email@example.com"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-blue-600 focus:bg-white outline-hidden dir-ltr text-right"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      المديرية الإقليمية / الأكاديمية (اختياري):
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={directorate}
                        onChange={(e) => setDirectorate(e.target.value)}
                        placeholder="مثال: مديرية فاس، مراكش، طنجة..."
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 pr-8 text-xs focus:ring-2 focus:ring-blue-600 focus:bg-white outline-hidden"
                      />
                      <MapPin className="w-4 h-4 text-slate-400 absolute right-2.5 top-3" />
                    </div>
                  </div>
                </div>

                {/* Quick Subject Suggestions */}
                <div className="space-y-1.5">
                  <label className="block text-slate-700 font-bold text-xs">
                    موضوع الملاحظة (أو اختر من المقترحات السريعة):
                  </label>
                  <div className="flex flex-wrap gap-1.5 pb-1">
                    {quickSubjects.map((qSub, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSubject(qSub)}
                        className="text-[10px] bg-slate-100 hover:bg-blue-50 hover:text-blue-800 text-slate-600 border border-slate-200 rounded-lg px-2.5 py-1 transition cursor-pointer"
                      >
                        + {qSub}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="اكتب عنواناً مختصراً لملاحظتك..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:bg-white outline-hidden"
                    required
                  />
                </div>

                {/* Message Body */}
                <div className="space-y-1.5">
                  <label className="block text-slate-700 font-bold text-xs">
                    تفاصيل الملاحظة أو الاستفسار أو الاقتراح:
                  </label>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="تفضل بكتابة ملاحظاتك بالتفصيل... (مثال: نرجو تكييف استعمال الزمن الخاص بنظام الفوجين للمستوى الثاني، أو إضافة خانة للملاحظات العامة في شبكات مسار...)"
                    className="w-full bg-slate-50 border border-slate-300 rounded-2xl p-3 text-xs leading-relaxed focus:ring-2 focus:ring-blue-600 focus:bg-white outline-hidden"
                    required
                  />
                </div>

                {/* Priority Selection */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-600 font-bold text-[11px]">درجة الأهمية:</span>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="urgency"
                        checked={urgency === "normal"}
                        onChange={() => setUrgency("normal")}
                        className="text-blue-600"
                      />
                      <span className="text-[11px] text-slate-700">عادي</span>
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="urgency"
                        checked={urgency === "important"}
                        onChange={() => setUrgency("important")}
                        className="text-amber-600"
                      />
                      <span className="text-[11px] text-slate-700 font-bold">مهم</span>
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="urgency"
                        checked={urgency === "urgent"}
                        onChange={() => setUrgency("urgent")}
                        className="text-red-600"
                      />
                      <span className="text-[11px] text-red-600 font-bold">عاجل</span>
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="text-slate-600 hover:text-slate-900 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? "تم نسخ النص كاملاً" : "نسخ نص الملاحظة"}</span>
                  </button>
                </div>

                {/* Form Action Buttons */}
                <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="submit"
                    className="bg-blue-900 hover:bg-blue-800 text-white font-black px-6 py-3 rounded-2xl text-xs flex items-center gap-2 transition cursor-pointer shadow-md"
                  >
                    <Send className="w-4 h-4 text-amber-300" />
                    <span>إرسال وتسجيل الملاحظة على الموقع</span>
                  </button>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSendWhatsApp}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-3 rounded-2xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                      title="فتح الملاحظة في واتساب لإرسالها مباشرة"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>إرسال عبر واتساب</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleSendEmail}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold px-4 py-3 rounded-2xl text-xs flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Mail className="w-4 h-4 text-sky-400" />
                      <span>إرسال بالبريد</span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Previous Submissions History Drawer */}
          {showHistory && feedbacksHistory.length > 0 && (
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-blue-700" />
                  <h3 className="font-bold text-sm text-slate-900">
                    سجل الملاحظات المسجلة من هذا المتصفح
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleClearHistory}
                  className="text-red-600 hover:text-red-700 text-xs flex items-center gap-1 cursor-pointer font-bold"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>مسح السجل</span>
                </button>
              </div>

              <div className="space-y-2.5 max-h-72 overflow-y-auto">
                {feedbacksHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 bg-white rounded-2xl border border-slate-200 space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded-md text-[10px]">
                        {item.id}
                      </span>
                      <span className="text-[10px] text-slate-500">{item.createdAt}</span>
                    </div>
                    <div className="font-bold text-slate-900">{item.subject}</div>
                    <div className="text-slate-600 text-[11px] line-clamp-2 leading-relaxed">
                      {item.message}
                    </div>
                    <div className="flex items-center justify-between pt-1 text-[10px] text-slate-500 border-t border-slate-100">
                      <span>التصنيف: {item.category}</span>
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>تم الاستلام</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Quick FAQ, Platform Pillars & Quick Links (Col Span 1) */}
        <div className="space-y-6">
          {/* Quick Info Box */}
          <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-6 shadow-md border border-blue-800 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                <School className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-sm block">موقع الأساتذة بروف بريس</span>
                <span className="text-[11px] text-blue-200 block">Profpress.net • المغرب</span>
              </div>
            </div>

            <p className="text-xs text-blue-100 leading-relaxed">
              منصة تربوية رقمية تهدف إلى تسهيل الممارسة الصفية لأستاذات وأساتذة التعليم الابتدائي ومواكبة الأوراش التربوية الوطنية الكبرى.
            </p>

            <div className="space-y-2 pt-2 border-t border-blue-800/80 text-xs">
              <div className="flex items-center gap-2 text-blue-200">
                <Clock className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span>أوقات المتابعة: يومياً 08:30 إلى 20:00</span>
              </div>
              <div className="flex items-center gap-2 text-blue-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>معايير الوزارة الرسمية A4 المعتمدة</span>
              </div>
              <div className="flex items-center gap-2 text-blue-200">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
                <span>مواكبة مباشرة لمؤسسات الريادة</span>
              </div>
            </div>
          </div>

          {/* Quick FAQ Accordion */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <HelpCircle className="w-4 h-4 text-blue-700" />
              <h3 className="font-bold text-sm text-slate-900">
                الأسئلة الشائعة والملاحظات المتكررة
              </h3>
            </div>

            <div className="space-y-2.5 text-xs">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-2xl overflow-hidden transition"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-right font-bold text-slate-800 transition cursor-pointer gap-2"
                    >
                      <span className="text-xs">{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ${
                          isOpen ? "rotate-180 text-blue-700" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="p-3 bg-white text-slate-600 text-[11px] leading-relaxed border-t border-slate-200">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Jump to Major Platform Tools */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h4 className="font-bold text-xs text-slate-900 border-b border-slate-100 pb-2">
              الانتقال السريع إلى وثائق المنصة:
            </h4>
            <div className="space-y-1.5 text-xs">
              <button
                type="button"
                onClick={() => onNavigateToTab("workshop_report")}
                className="w-full text-right p-2 rounded-xl text-slate-700 hover:bg-blue-50 hover:text-blue-900 transition flex items-center justify-between cursor-pointer"
              >
                <span>تقرير ورشات الريادة (3 صفحات)</span>
                <span className="text-[10px] text-blue-700 font-bold font-mono">←</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigateToTab("timetable")}
                className="w-full text-right p-2 rounded-xl text-slate-700 hover:bg-blue-50 hover:text-blue-900 transition flex items-center justify-between cursor-pointer"
              >
                <span>استعمال الزمن وجدول الحصص</span>
                <span className="text-[10px] text-blue-700 font-bold font-mono">←</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigateToTab("portfolio")}
                className="w-full text-right p-2 rounded-xl text-slate-700 hover:bg-blue-50 hover:text-blue-900 transition flex items-center justify-between cursor-pointer"
              >
                <span>الملف التراكمي للإنجاز (Portfolio)</span>
                <span className="text-[10px] text-blue-700 font-bold font-mono">←</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigateToTab("charter")}
                className="w-full text-right p-2 rounded-xl text-slate-700 hover:bg-blue-50 hover:text-blue-900 transition flex items-center justify-between cursor-pointer"
              >
                <span>ميثاق القسم وقواعد السلوك</span>
                <span className="text-[10px] text-blue-700 font-bold font-mono">←</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigateToTab("pedagogical_docs")}
                className="w-full text-right p-2 rounded-xl text-amber-700 hover:bg-amber-50 font-bold transition flex items-center justify-between cursor-pointer"
              >
                <span>مركز الوثائق البيداغوجية الشامل</span>
                <span className="text-[10px] font-mono">←</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
