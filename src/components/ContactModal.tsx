import React, { useState } from "react";
import {
  PhoneCall,
  Mail,
  MessageCircle,
  ExternalLink,
  X,
  Send,
  Check,
  Copy,
  MessageSquare,
  HelpCircle,
  Sparkles,
  Phone,
  Globe,
  Clock,
} from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTopic?: string;
  onNavigateToContactPage?: () => void;
}

export const PROFPRESS_CONTACT_INFO = {
  phone: "0707983967",
  phoneFormatted: "+212 707-983967",
  whatsappNumber: "212707983967",
  primaryEmail: "contact@profpress.net",
  secondaryEmail: "contact@profpress.net",
  contactPageUrl: "https://www.profpress.net/p/contact-us.html",
  websiteUrl: "https://www.profpress.net/",
};

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  defaultTopic = "",
  onNavigateToContactPage,
}) => {
  const [senderName, setSenderName] = useState("");
  const [senderContact, setSenderContact] = useState("");
  const [messageType, setMessageType] = useState<"feedback" | "question" | "suggestion" | "issue">("feedback");
  const [subject, setSubject] = useState(defaultTopic || "ملاحظات واستفسارات حول وثائق بروف بريس");
  const [messageText, setMessageText] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  if (!isOpen) return null;

  const quickTopics = [
    "ملاحظة حول وثائق مدارس الريادة",
    "سؤال حول استعمال الزمن أو الجذاذات",
    "اقتراح إضافة وثيقة بيداغوجية جديدة",
    "استفسار عن الترقية والامتحان المهني",
  ];

  const handleCopyMessage = () => {
    const fullText = `السلام عليكم ورحمة الله،
الاسم: ${senderName || "أستاذ(ة)"}
وسيلة الاتصال: ${senderContact || "غير محدد"}
النوع: ${messageType === "feedback" ? "ملاحظة" : messageType === "question" ? "سؤال / استفسار" : messageType === "suggestion" ? "اقتراح وثيقة" : "ملاحظة فنية"}
الموضوع: ${subject}

نص الرسالة:
${messageText || "أود الاستفسار والتواصل معكم بخصوص منصة ووثائق بروف بريس."}`;

    navigator.clipboard.writeText(fullText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const mailSubject = encodeURIComponent(`[بروف بريس] ${subject}`);
    const mailBody = encodeURIComponent(
      `السلام عليكم ورحمة الله،\n\nالاسم: ${senderName || "أستاذ(ة)"}\nرقم الهاتف / البريد: ${senderContact || "غير محدد"}\nالنوع: ${messageType}\n\nنص الرسالة والملاحظة:\n${messageText}\n\nتم الإرسال عبر تطبيق وثائق بروف بريس Profpress.`
    );
    window.open(`mailto:${PROFPRESS_CONTACT_INFO.primaryEmail}?subject=${mailSubject}&body=${mailBody}`, "_blank");
    setSendSuccess(true);
  };

  const handleSendWhatsApp = () => {
    const waText = encodeURIComponent(
      `*موقع بروف بريس Profpress.net*\n` +
      `👤 *الاسم:* ${senderName || "أستاذ(ة)"}\n` +
      `📌 *الموضوع:* ${subject}\n` +
      `💬 *الرسالة والملاحظة:*\n${messageText || "السلام عليكم، لدي ملاحظة / استفسار بخصوص وثائق بروف بريس."}`
    );
    window.open(`https://wa.me/${PROFPRESS_CONTACT_INFO.whatsappNumber}?text=${waText}`, "_blank");
    setSendSuccess(true);
  };

  return (
    <div className="no-print fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-4 sm:p-5 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-md">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  خدمة التواصل المباشر
                </span>
                <span className="text-xs text-blue-200 font-mono">Profpress.net</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black font-cairo text-white mt-0.5">
                اتصل بنا • ملاحظات وأسئلة
              </h2>
              <p className="text-xs text-slate-300">
                فريق موقع الأساتذة بروف بريس رهن إشارتكم لاستقبال كافة الملاحظات، الأسئلة، والمقترحات
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-xl transition cursor-pointer shrink-0"
            title="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-5 max-h-[78vh] overflow-y-auto">
          {/* Quick Contact Cards Grid (Direct Channels from profpress.net/p/contact-us.html) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Phone & WhatsApp */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 flex flex-col justify-between space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-900 block">الهاتف / واتساب</span>
                  <span className="text-xs font-mono font-bold text-emerald-800 dir-ltr block text-right">
                    {PROFPRESS_CONTACT_INFO.phoneFormatted}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 pt-1">
                <a
                  href={`https://wa.me/${PROFPRESS_CONTACT_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold py-1.5 px-2 rounded-lg text-center transition flex items-center justify-center gap-1 shadow-2xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>واتساب فوري</span>
                </a>
                <a
                  href={`tel:${PROFPRESS_CONTACT_INFO.phone}`}
                  className="bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-[11px] font-bold py-1.5 px-2 rounded-lg text-center transition"
                  title="اتصال هاتفي"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3 flex flex-col justify-between space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-bold text-blue-900 block">البريد الإلكتروني</span>
                  <span className="text-[11px] font-mono text-blue-800 truncate block dir-ltr text-right" title={PROFPRESS_CONTACT_INFO.primaryEmail}>
                    {PROFPRESS_CONTACT_INFO.primaryEmail}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 pt-1">
                <a
                  href={`mailto:${PROFPRESS_CONTACT_INFO.primaryEmail}`}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold py-1.5 px-2 rounded-lg text-center transition flex items-center justify-center gap-1 shadow-2xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>مراسلة بالبريد</span>
                </a>
              </div>
            </div>

            {/* On-Site Contact & Feedback Page */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 flex flex-col justify-between space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-amber-950 block">صفحة الاتصال والملاحظات</span>
                  <span className="text-[10px] text-amber-800 block">على الموقع الداخلي</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onNavigateToContactPage) {
                      onNavigateToContactPage();
                    }
                  }}
                  className="flex-1 bg-amber-400 hover:bg-amber-300 text-slate-950 text-[11px] font-black py-1.5 px-2 rounded-lg text-center transition flex items-center justify-center gap-1 shadow-2xs cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>فتح الصفحة الكاملة بالموقع</span>
                </button>
              </div>
            </div>
          </div>

          {/* Form Banner */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span className="font-bold text-slate-800">
                أرسل ملاحظتك أو سؤالك مباشرة وسيتم الرد عليك في أقرب وقت
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-500">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>استجابة سريعة</span>
            </div>
          </div>

          {/* Interactive Form */}
          <form onSubmit={handleSendEmail} className="space-y-4 text-xs">
            {/* Message Type Selector */}
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">
                نوع التواصل:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "feedback", label: "💬 إبداء ملاحظة" },
                  { id: "question", label: "❓ سؤال واستفسار" },
                  { id: "suggestion", label: "💡 اقتراح وثيقة" },
                  { id: "issue", label: "🛠️ تبليغ عن خلل" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMessageType(item.id as any)}
                    className={`py-2 px-2.5 rounded-lg border text-center font-bold transition cursor-pointer ${
                      messageType === item.id
                        ? "bg-blue-900 text-white border-blue-900 shadow-xs"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Topic Chips */}
            <div>
              <label className="block text-slate-600 text-[11px] font-medium mb-1">
                مواضيع شائعة يمكنك اختيارها بنقرة واحدة:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {quickTopics.map((topic, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSubject(topic)}
                    className="text-[10px] bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-900 border border-slate-200 px-2 py-1 rounded-md transition cursor-pointer"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Sender Name & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  الاسم الكامل أو الصفة:
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="مثال: ذ. مصطفى العسري (مدرسة الريادة)"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs focus:bg-white focus:border-blue-500 outline-hidden font-medium"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  بريدك الإلكتروني أو رقم الهاتف / واتساب:
                </label>
                <input
                  type="text"
                  value={senderContact}
                  onChange={(e) => setSenderContact(e.target.value)}
                  placeholder="مثال: 0612345678 أو email@example.com"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs focus:bg-white focus:border-blue-500 outline-hidden font-medium dir-ltr text-right"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                موضوع الملاحظة أو السؤال:
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="عنوان أو موضوع رسالتك..."
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs focus:bg-white focus:border-blue-500 outline-hidden font-bold"
                required
              />
            </div>

            {/* Message Body */}
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                نص الملاحظة أو السؤال بالتفصيل:
              </label>
              <textarea
                rows={4}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="اكتب هنا ملاحظاتك، أسئلتك التربوية، أو أي اقتراحات تود مشاركتها مع إدارة موقع بروف بريس..."
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs focus:bg-white focus:border-blue-500 outline-hidden font-medium leading-relaxed"
                required
              />
            </div>

            {/* Success notification if sent */}
            {sendSuccess && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold">تم فتح نافذة الإرسال بنجاح! شكراً على تواصلك وملاحظاتك القيمة.</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSendSuccess(false)}
                  className="text-xs text-emerald-700 hover:underline"
                >
                  إخفاء
                </button>
              </div>
            )}

            {/* Form Actions */}
            <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleCopyMessage}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
                title="نسخ نص الرسالة إلى الحافظة"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">تم النسخ بنجاح</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>نسخ نص الرسالة</span>
                  </>
                )}
              </button>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>إرسال عبر واتساب</span>
                </button>
                <button
                  type="submit"
                  className="bg-blue-900 hover:bg-blue-800 text-white font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                >
                  <Mail className="w-4 h-4 text-amber-300" />
                  <span>إرسال بالبريد الإلكتروني</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Modal Footer Note */}
        <div className="bg-slate-100 border-t border-slate-200 px-5 py-3 text-[11px] text-slate-600 flex flex-wrap items-center justify-between gap-2">
          <span>
            البوابة: <a href={PROFPRESS_CONTACT_INFO.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-bold">www.profpress.net</a>
          </span>
          <span className="text-slate-500">
            موقع الأساتذة بروف بريس • المملكة المغربية
          </span>
        </div>
      </div>
    </div>
  );
};
