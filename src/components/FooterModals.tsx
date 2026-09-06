import React, { useState } from "react";
import {
  Info,
  ShieldCheck,
  Send,
  X,
  ExternalLink,
  BookOpen,
  Award,
  Users,
  CheckCircle2,
  Lock,
  FileCheck,
  Eye,
  MessageCircle,
  Mail,
  Copy,
  Check,
  Sparkles,
  Paperclip,
  Share2,
} from "lucide-react";
import { PROFPRESS_CONTACT_INFO } from "./ContactModal";

// ============================================================================
// 1. ABOUT US MODAL (من نحن - بروف بريس)
// ============================================================================
interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onOpenContact,
}) => {
  if (!isOpen) return null;

  return (
    <div className="no-print fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-200 text-slate-800 animate-fadeIn my-6"
        dir="rtl"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0 shadow-md">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-black px-2 py-0.5 rounded-full">
                  التعريف بالمنصة
                </span>
                <span className="text-xs text-blue-200 font-mono">Profpress.net</span>
              </div>
              <h3 className="text-lg font-black font-cairo text-white mt-0.5">
                من نحن • موقع الأساتذة بروف بريس
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-xl transition cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-sm leading-relaxed">
          {/* Mission Card */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 space-y-2">
            <h4 className="font-black text-blue-950 flex items-center gap-2 text-base">
              <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
              <span>رسالتنا التربوية ورؤيتنا</span>
            </h4>
            <p className="text-slate-700 leading-relaxed text-xs md:text-sm">
              موقع <strong>بروف بريس (Profpress.net)</strong> هو منصة تربوية وبيداغوجية مغربية رائدة، تهدف إلى مرافقة أستاذات وأساتذة التعليم الابتدائي ومختلف أسلاك التعليم في مسارهم المهني والديداكتيكي، وتيسير إعداد وتدبير كافة وثائقهم التربوية الرسمية بدقة واحترافية.
            </p>
          </div>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="border border-slate-200 rounded-2xl p-3.5 bg-slate-50/70 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>مواكبة مدارس الريادة</span>
              </div>
              <p className="text-slate-600 text-xs">
                توفير وثائق وسجلات تقارير ورشات التقويم 3P وطرائق التدريس وفق المستوى المناسب (TaRL) والتعليم الصريح.
              </p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-3.5 bg-slate-50/70 space-y-1.5">
              <div className="flex items-center gap-2 text-blue-800 font-bold text-xs">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>بنك الوثائق والجذاذات</span>
              </div>
              <p className="text-slate-600 text-xs">
                توازيع سنوية ومرحلية محينة، استعمالات الزمن بصيغ قانونية، ميثاق القسم، وشبكات المراقبة المستمرة.
              </p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-3.5 bg-slate-50/70 space-y-1.5">
              <div className="flex items-center gap-2 text-indigo-800 font-bold text-xs">
                <FileCheck className="w-4 h-4 text-indigo-600" />
                <span>مطابقة تامة لمقاس A4</span>
              </div>
              <p className="text-slate-600 text-xs">
                توليد فوري ومحكم لملفات PDF عالية الدقة ومجهزة للطباعة المباشرة بشعار الوزارة الرسمي دون تشويه للهوامش.
              </p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-3.5 bg-slate-50/70 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                <Users className="w-4 h-4 text-amber-600" />
                <span>فريق وهيئة تحرير متخصصة</span>
              </div>
              <p className="text-slate-600 text-xs">
                يشرف على إدارة وتطوير الموقع أطر تربوية وتقنية تسعى للتجديد المستمر وإثراء المحتوى التربوي الرقمي بالمغرب.
              </p>
            </div>
          </div>

          {/* Direct External Link */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5 text-right">
              <span className="font-bold text-amber-950 block">زيارة الموقع الرسمي الأصلي:</span>
              <span className="text-slate-600">يمكنكم متابعة أحدث المقالات والمستجدات على الرابط المباشر.</span>
            </div>
            <a
              href="https://www.profpress.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-2 rounded-xl transition shadow-xs flex items-center gap-1.5 shrink-0"
            >
              <span>profpress.net ↗</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenContact();
            }}
            className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <span>هل تود التواصل معنا؟ اضغط هنا</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-5 py-2 rounded-xl transition cursor-pointer"
          >
            إغلاق النافذة
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 2. PRIVACY POLICY MODAL (سياسة الخصوصية - بروف بريس)
// ============================================================================
interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="no-print fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-200 text-slate-800 animate-fadeIn my-6"
        dir="rtl"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-400 text-slate-950 flex items-center justify-center font-black shrink-0 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-black px-2 py-0.5 rounded-full">
                  السرية والأمان
                </span>
                <span className="text-xs text-emerald-200 font-mono">القانون 09-08</span>
              </div>
              <h3 className="text-lg font-black font-cairo text-white mt-0.5">
                سياسة الخصوصية وحماية المعطيات الشخصية
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-xl transition cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-sm leading-relaxed">
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-1.5">
            <h4 className="font-black text-emerald-950 flex items-center gap-2 text-sm">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>التزامنا بحماية سرية بيانات الأساتذة والمتعلمين</span>
            </h4>
            <p className="text-slate-700 text-xs leading-relaxed">
              نولي في منصة <strong>Profpress.net</strong> أهمية قصوى لخصوصية مستخدمينا من الأطر التربوية والإدارية، ونؤكد التزامنا التام بمبادئ حماية المعطيات الشخصية الصادرة عن اللجنة الوطنية لمراقبة حماية المعطيات ذات الطابع الشخصي (CNDP).
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                1. التخزين المحلي الآمن (Local Storage)
              </span>
              <p className="text-slate-600 leading-relaxed">
                كافة البيانات الشخصية التي يُدخلها الأستاذ (الاسم الكامل، رقم التأجير، المؤسسة، لائحة التلاميذ، جداول الحصص) تُحفظ حصرياً وبشكل محلي على جهاز المستخدم (متصفحك الخاص) ولا يتم إرسالها أو تخزينها في أي خادم خارجي.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                2. سرية بيانات منظومة مسار (Massar)
              </span>
              <p className="text-slate-600 leading-relaxed">
                المنصة لا تطلب ولا تسجل أي كلمات سر أو رموز دخول خاصة بمنظومة مسار. شبكات وملاحظات التقويم يتم إعدادها محلياً لتسهيل النقل أو الطباعة فقط.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                3. ملفات تعريف الارتباط والإعلانات الخارجية
              </span>
              <p className="text-slate-600 leading-relaxed">
                قد يتم استخدام ملفات تعريف ارتباط قياسية (Cookies) لتحسين سرعة تصفح المقالات من الموقع الأصلي، دون جمع أية معطيات حساسة تمس الحياة الخاصة للمدرسين.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                4. حق مسح وتعديل المعطيات
              </span>
              <p className="text-slate-600 leading-relaxed">
                يمتلك الأستاذ الصلاحية الكاملة لتعديل بيانات ملفه أو مسحها نهائياً بمجرد مسح بيانات الموقع من متصفحه أو عبر زر "تعديل بياناتي".
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2 rounded-xl text-xs transition cursor-pointer"
          >
            فهمت وموافق
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 3. SUBMIT TOPIC MODAL (أرسل موضوع - بروف بريس)
// ============================================================================
interface SubmitTopicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmitTopicModal: React.FC<SubmitTopicModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [authorName, setAuthorName] = useState("");
  const [authorRole, setAuthorRole] = useState("أستاذ التعليم الابتدائي");
  const [subjectTitle, setSubjectTitle] = useState("");
  const [cycleLevel, setCycleLevel] = useState("التعليم الابتدائي (مدارس الريادة والعمومي)");
  const [topicType, setTopicType] = useState("جذاذة / وثيقة تربوية");
  const [topicDetails, setTopicDetails] = useState("");
  const [fileLink, setFileLink] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  // Prepare ready formatted text for WhatsApp and Email
  const formattedSummary = `*طلب نشر مساهمة تربوية على موقع بروف بريس Profpress.net*
---------------------------------------
*الاسم الكامل:* ${authorName || "غير محدد"}
*الصفة:* ${authorRole}
*نوع المساهمة:* ${topicType}
*السلك والمستوى:* ${cycleLevel}
*عنوان الموضوع:* ${subjectTitle || "مساهمة تربوية جديدة"}
*رابط الملف أو الوثيقة:* ${fileLink || "سيتم إرسالها في المرفقات"}
*هاتف / واتساب للتواصل:* ${contactPhone || "غير محدد"}
---------------------------------------
*نص وتفاصيل الموضوع:*
${topicDetails || "لا توجد تفاصيل إضافية."}
---------------------------------------
مرسلة عبر منصة Profpress.net وثائق الأستاذ`;

  const handleSendWhatsApp = () => {
    const encoded = encodeURIComponent(formattedSummary);
    window.open(`https://wa.me/212707983967?text=${encoded}`, "_blank");
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`مساهمة للنشر على Profpress: ${subjectTitle || "موضوع تربوي"}`);
    const body = encodeURIComponent(formattedSummary);
    window.open(`mailto:kolchitv@gmail.com?subject=${subject}&body=${body}`, "_blank");
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(formattedSummary);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="no-print fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-200 text-slate-800 animate-fadeIn my-6"
        dir="rtl"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-950 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0 shadow-md">
              <Send className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-black px-2 py-0.5 rounded-full">
                  نشر مقال أو جذاذة
                </span>
                <span className="text-xs text-blue-200">موقع بروف بريس</span>
              </div>
              <h3 className="text-lg font-black font-cairo text-white mt-0.5">
                أرسل موضوعاً أو مساهمة تربوية للنشر
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-xl transition cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs md:text-sm">
          <div className="bg-purple-50/80 border border-purple-200 rounded-2xl p-4 text-xs space-y-1">
            <span className="font-black text-purple-950 block text-sm">
              شارك خبراتك البيداغوجية مع آلاف الأساتذة بالمغرب
            </span>
            <p className="text-slate-600 leading-relaxed">
              يسعد إدارة موقع <strong className="text-purple-900">Profpress.net</strong> نشر مقالاتكم التربوية، جذاذاتكم النموذجية، فروضكم المحروسة، أو أوراق عمل مدارس الريادة، مع حفظ كامل لحقوق التأليف والاسم والصفة.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendWhatsApp();
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1 text-xs">
                  الاسم الكامل للأستاذ(ة) / الباحث:
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="مثال: ذ. عبد الرحمن الناصري"
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-600 outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 text-xs">
                  الصفة والإطار:
                </label>
                <select
                  value={authorRole}
                  onChange={(e) => setAuthorRole(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs bg-white focus:ring-2 focus:ring-blue-600 outline-hidden"
                >
                  <option value="أستاذ التعليم الابتدائي">أستاذ التعليم الابتدائي</option>
                  <option value="أستاذ بمؤسسات الريادة">أستاذ بمؤسسات الريادة</option>
                  <option value="مفتش تربوي / مؤطر">مفتش تربوي / مؤطر</option>
                  <option value="مدير مؤسسة تعليمية">مدير مؤسسة تعليمية</option>
                  <option value="أستاذ التعليم الإعدادي / التأهيلي">أستاذ التعليم الثانوي</option>
                  <option value="باحث في علوم التربية">باحث في علوم التربية</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1 text-xs">
                  نوع المساهمة:
                </label>
                <select
                  value={topicType}
                  onChange={(e) => setTopicType(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs bg-white focus:ring-2 focus:ring-blue-600 outline-hidden"
                >
                  <option value="جذاذة بيداغوجية">جذاذة بيداغوجية</option>
                  <option value="مقال وتحليل تربوي">مقال وتحليل تربوي</option>
                  <option value="فرض محروس أو تقويم تشخيصي">فرض محروس أو تقويم تشخيصي</option>
                  <option value="تقرير نشاط أو ورشة مدارس الريادة">تقرير نشاط أو ورشة مدارس الريادة</option>
                  <option value="وسيلة ديداكتيكية أو تطبيق ذكي">وسيلة ديداكتيكية أو تطبيق ذكي</option>
                  <option value="أخرى">أخرى</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1 text-xs">
                  السلك والمستوى المعني:
                </label>
                <input
                  type="text"
                  value={cycleLevel}
                  onChange={(e) => setCycleLevel(e.target.value)}
                  placeholder="مثال: المستوى الثالث ابتدائي • لغة عربية"
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-600 outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 text-xs">
                عنوان الموضوع المقترح:
              </label>
              <input
                type="text"
                value={subjectTitle}
                onChange={(e) => setSubjectTitle(e.target.value)}
                placeholder="اكتب عنواناً دقيقاً للمقال أو الوثيقة..."
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-600 outline-hidden"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 text-xs">
                رابط الوثيقة أو الملف (Google Drive / Drive / Dropbox):
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={fileLink}
                  onChange={(e) => setFileLink(e.target.value)}
                  placeholder="ضع رابط التحميل أو المعاينة إن وجد (https://...)"
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs pl-8 focus:ring-2 focus:ring-blue-600 outline-hidden"
                />
                <Paperclip className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 text-xs">
                تفاصيل الموضوع أو ملخص المقال:
              </label>
              <textarea
                value={topicDetails}
                onChange={(e) => setTopicDetails(e.target.value)}
                rows={4}
                placeholder="اكتب ملخصاً للموضوع أو محتوى المقال التربوي هنا..."
                className="w-full border border-slate-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-blue-600 outline-hidden leading-relaxed"
                required
              ></textarea>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 text-xs">
                رقم الهاتف أو الواتساب للتواصل معك:
              </label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="مثال: 0612345678"
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-600 outline-hidden font-mono"
              />
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="w-full sm:flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-black py-2.5 rounded-xl text-xs transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-amber-300" />
                <span>إرسال المساهمة عبر الواتساب (0707983967)</span>
              </button>

              <button
                type="button"
                onClick={handleSendEmail}
                className="w-full sm:flex-1 bg-blue-700 hover:bg-blue-600 text-white font-black py-2.5 rounded-xl text-xs transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-amber-300" />
                <span>إرسال عبر البريد الإلكتروني</span>
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <button
            type="button"
            onClick={handleCopySummary}
            className="text-slate-600 hover:text-slate-900 font-bold flex items-center gap-1.5 cursor-pointer"
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">تم نسخ ملخص المساهمة!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>نسخ نص المساهمة للحافظة</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-5 py-2 rounded-xl transition cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
