import React from "react";
import {
  School,
  FileText,
  Calendar,
  Award,
  Sparkles,
  PhoneCall,
  Mail,
  ExternalLink,
  Info,
  ShieldCheck,
  Send,
  Layers,
  BookOpen,
  FolderArchive,
  GraduationCap,
  Clock,
  CheckCircle2,
  ChevronUp,
  Printer,
  Newspaper,
  Briefcase,
  Eye,
  HeartHandshake,
  Shield,
  HelpCircle,
  FileCheck,
} from "lucide-react";
import { TabKey } from "../types";
import { PROFPRESS_CONTACT_INFO } from "./ContactModal";

interface FooterProps {
  onNavigateToTab: (tab: TabKey) => void;
  onOpenAboutModal: () => void;
  onOpenPrivacyModal: () => void;
  onOpenContactModal: () => void;
  onOpenSubmitTopicModal: () => void;
  onOpenPrintPreview: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateToTab,
  onOpenAboutModal,
  onOpenPrivacyModal,
  onOpenContactModal,
  onOpenSubmitTopicModal,
  onOpenPrintPreview,
}) => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLinkClick = (tab: TabKey) => {
    onNavigateToTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="main-app-footer"
      className="no-print bg-slate-950 text-slate-400 border-t border-slate-800 mt-16 font-cairo"
    >
      {/* ========================================================================= */}
      {/* 1. TOP BRAND & QUICK ACTIONS BAR */}
      {/* ========================================================================= */}
      <div className="border-b border-slate-800/80 bg-slate-900/50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-right">
            <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md shrink-0">
              <School className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-black text-base tracking-tight font-cairo">
                  موقع الأساتذة بروف بريس <span className="text-amber-400 font-mono">Profpress.net</span>
                </span>
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  الموسم 2026/2027
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                المنصة الرقمية الوطنية المتكاملة لأساتذة وأستاذات التعليم الابتدائي ومواكبة مؤسسات الريادة
              </p>
            </div>
          </div>

          {/* Key Quick Modal Triggers (من نحن، الخصوصية، اتصل بنا، أرسل موضوع) */}
          <nav aria-label="روابط سريعة" className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <button
              id="footer-quick-about-btn"
              type="button"
              onClick={onOpenAboutModal}
              className="px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5 border border-slate-700 shadow-2xs hover:border-slate-500"
            >
              <Info className="w-3.5 h-3.5 text-sky-400" />
              <span>من نحن</span>
            </button>

            <button
              id="footer-quick-privacy-btn"
              type="button"
              onClick={onOpenPrivacyModal}
              className="px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5 border border-slate-700 shadow-2xs hover:border-slate-500"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>الخصوصية</span>
            </button>

            <button
              id="footer-quick-contact-btn"
              type="button"
              onClick={onOpenContactModal}
              className="px-3.5 py-2 rounded-xl bg-emerald-700/90 hover:bg-emerald-600 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5 border border-emerald-500/60 shadow-xs hover:border-emerald-400"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
              <span>اتصل بنا</span>
            </button>

            <button
              id="footer-quick-submit-btn"
              type="button"
              onClick={onOpenSubmitTopicModal}
              className="px-3.5 py-2 rounded-xl bg-purple-900/90 hover:bg-purple-800 text-purple-100 hover:text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5 border border-purple-600/60 shadow-xs hover:border-purple-400"
            >
              <Send className="w-3.5 h-3.5 text-amber-300" />
              <span>أرسل موضوع</span>
            </button>
          </nav>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. THE MAIN IMPORTANT SECTIONS GRID (أهم أقسام المنصة) */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 text-right">
          {/* SECTION 1: الوثائق والملفات البيداغوجية */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-slate-100 font-bold text-sm">
              <span className="w-6 h-6 rounded-lg bg-blue-950 text-blue-400 flex items-center justify-center text-xs">
                <FileText className="w-3.5 h-3.5" />
              </span>
              <h3>الوثائق والملفات البيداغوجية</h3>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              وثائق تربوية مطابقة لتوجيهات وزارة التربية الوطنية، قابلة للتعديل والطباعة المباشرة بمقاس A4:
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  id="footer-nav-timetable"
                  type="button"
                  onClick={() => handleLinkClick("timetable")}
                  className="text-slate-300 hover:text-amber-400 flex items-center gap-2 transition cursor-pointer text-right w-full hover:translate-x-1"
                >
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>استعمال الزمن وجدول الحصص</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-card"
                  type="button"
                  onClick={() => handleLinkClick("card")}
                  className="text-slate-300 hover:text-amber-400 flex items-center gap-2 transition cursor-pointer text-right w-full hover:translate-x-1"
                >
                  <School className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>بطاقة الأستاذ(ة) المرجعية</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-charter"
                  type="button"
                  onClick={() => handleLinkClick("charter")}
                  className="text-slate-300 hover:text-amber-400 flex items-center gap-2 transition cursor-pointer text-right w-full hover:translate-x-1"
                >
                  <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>ميثاق القسم وقواعد السلوك</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-covers"
                  type="button"
                  onClick={() => handleLinkClick("covers")}
                  className="text-slate-300 hover:text-amber-400 flex items-center gap-2 transition cursor-pointer text-right w-full hover:translate-x-1"
                >
                  <FolderArchive className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>أغلفة الدفاتر والملفات الرسمية</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-grids"
                  type="button"
                  onClick={() => handleLinkClick("grids")}
                  className="text-slate-300 hover:text-amber-400 flex items-center gap-2 transition cursor-pointer text-right w-full hover:translate-x-1"
                >
                  <FileCheck className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>شبكات تفريغ المراقبة المستمرة لمسار</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-pedagogical-docs"
                  type="button"
                  onClick={() => handleLinkClick("pedagogical_docs")}
                  className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-2 transition cursor-pointer text-right w-full hover:translate-x-1 pt-1"
                >
                  <BookOpen className="w-3.5 h-3.5 shrink-0" />
                  <span>الحقيبة البيداغوجية الشاملة ←</span>
                </button>
              </li>
            </ul>
          </div>

          {/* SECTION 2: مدارس الريادة والدعم التربوي */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-slate-100 font-bold text-sm">
              <span className="w-6 h-6 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center text-xs">
                <GraduationCap className="w-3.5 h-3.5" />
              </span>
              <h3>مدارس الريادة والدعم الصريح</h3>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              أدوات مواكبة ورشات الريادة ومقاربة التدريس وفق المستوى المناسب (TaRL):
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  id="footer-nav-workshop-report"
                  type="button"
                  onClick={() => handleLinkClick("workshop_report")}
                  className="text-slate-300 hover:text-amber-400 flex items-center gap-2 transition cursor-pointer text-right w-full hover:translate-x-1"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>تقرير ورشات الريادة (3 صفحات A4)</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-portfolio"
                  type="button"
                  onClick={() => handleLinkClick("portfolio")}
                  className="text-slate-300 hover:text-amber-400 flex items-center gap-2 transition cursor-pointer text-right w-full hover:translate-x-1"
                >
                  <Layers className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>الملف التراكمي للإنجاز (Portfolio)</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-math-activities"
                  type="button"
                  onClick={() => handleLinkClick("workshop_report")}
                  className="text-slate-300 hover:text-amber-400 flex items-center gap-2 transition cursor-pointer text-right w-full hover:translate-x-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>أنشطة وهندسة مسارات الرياضيات</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-arabic-paths"
                  type="button"
                  onClick={() => handleLinkClick("workshop_report")}
                  className="text-slate-300 hover:text-amber-400 flex items-center gap-2 transition cursor-pointer text-right w-full hover:translate-x-1"
                >
                  <BookOpen className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>مسارات اللغة العربية ومعالجة التعثرات</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-french-paliers"
                  type="button"
                  onClick={() => handleLinkClick("workshop_report")}
                  className="text-slate-300 hover:text-amber-400 flex items-center gap-2 transition cursor-pointer text-right w-full hover:translate-x-1"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>Paliers de Français & TaRL</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-tarl-positioning"
                  type="button"
                  onClick={() => handleLinkClick("workshop_report")}
                  className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-2 transition cursor-pointer text-right w-full hover:translate-x-1 pt-1"
                >
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>روائز الموضعة والدعم الصريح ←</span>
                </button>
              </li>
            </ul>
          </div>

          {/* SECTION 3: المستجدات والأنشطة والشهادات */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-slate-100 font-bold text-sm">
              <span className="w-6 h-6 rounded-lg bg-amber-950 text-amber-400 flex items-center justify-center text-xs">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              <h3>المستجدات والتنظيم المدرسي</h3>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              مواكبة الحياة المدرسية والتنظيم الإداري والمهني للأستاذ:
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  id="footer-nav-holidays"
                  type="button"
                  onClick={() => handleLinkClick("holidays")}
                  className="text-slate-300 hover:text-amber-400 flex items-center gap-2 transition cursor-pointer text-right w-full hover:translate-x-1"
                >
                  <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>رزنامة العطل المدرسية 2026/2027</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-certificates"
                  type="button"
                  onClick={() => handleLinkClick("certificates")}
                  className="text-slate-300 hover:text-amber-400 flex items-center gap-2 transition cursor-pointer text-right w-full hover:translate-x-1"
                >
                  <Award className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                  <span>شهادات التقدير والتشجيع للتلاميذ</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-remarks"
                  type="button"
                  onClick={() => handleLinkClick("remarks")}
                  className="text-slate-300 hover:text-amber-400 flex items-center gap-2 transition cursor-pointer text-right w-full hover:translate-x-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>مساعد الصياغة التربوية والملاحظات</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-news"
                  type="button"
                  onClick={() => handleLinkClick("news")}
                  className="text-slate-300 hover:text-amber-400 flex items-center gap-2 transition cursor-pointer text-right w-full hover:translate-x-1"
                >
                  <Newspaper className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>مستجدات التعليم وبلاغات الوزارة</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-competitions"
                  type="button"
                  onClick={() => handleLinkClick("competitions")}
                  className="text-slate-300 hover:text-amber-400 flex items-center gap-2 transition cursor-pointer text-right w-full hover:translate-x-1"
                >
                  <Briefcase className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>مباريات التعليم والامتحانات المهنية</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-print-preview"
                  type="button"
                  onClick={onOpenPrintPreview}
                  className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-2 transition cursor-pointer text-right w-full hover:translate-x-1 pt-1"
                >
                  <Eye className="w-3.5 h-3.5 shrink-0" />
                  <span>معاينة الطباعة وتوليد PDF (300 DPI) ←</span>
                </button>
              </li>
            </ul>
          </div>

          {/* SECTION 4: قنوات التواصل والدعم الفني */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-slate-100 font-bold text-sm">
              <span className="w-6 h-6 rounded-lg bg-purple-950 text-purple-400 flex items-center justify-center text-xs">
                <HeartHandshake className="w-3.5 h-3.5" />
              </span>
              <h3>التواصل والدعم الفني</h3>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              فريق منصة بروف بريس في خدمتكم للإجابة عن استفساراتكم وملاحظاتكم:
            </p>

            <div className="space-y-3 text-xs">
              <a
                href={`tel:${PROFPRESS_CONTACT_INFO.phone}`}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">الهاتف المباشر:</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {PROFPRESS_CONTACT_INFO.phoneFormatted}
                  </span>
                </div>
              </a>

              <button
                type="button"
                onClick={onOpenContactModal}
                className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition cursor-pointer text-right"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-950 text-blue-400 flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">المراسلة الفورية:</span>
                  <span className="font-bold text-slate-200">نموذج الاستفسارات والاقتراحات</span>
                </div>
              </button>

              <button
                id="footer-nav-contact-page"
                type="button"
                onClick={() => handleLinkClick("contact")}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 hover:bg-amber-400/20 transition font-bold cursor-pointer text-right shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span>صفحة الاتصال والملاحظات على الموقع</span>
                </div>
                <span className="text-[11px] font-mono">←</span>
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 2.5: أهم الأقسام والأسلاك التعليمية (صفحات مخصصة لكافة المستويات) */}
        <div className="border-t border-slate-800/80 bg-slate-900/70 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-blue-950 text-blue-400 flex items-center justify-center text-xs">
                  <Layers className="w-3.5 h-3.5" />
                </span>
                <h3 className="text-sm font-black text-slate-100 font-cairo">
                  أهم الأقسام والمستويات التعليمية في الموقع (روابط مباشرة للصفحات المخصصة)
                </h3>
              </div>
              <span className="text-[11px] text-amber-400 font-bold">
                وثائق، فروض، امتحانات، ودلائل خاصة بكل مستوى
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              {/* التعليم الابتدائي */}
              <div className="space-y-2.5 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 text-blue-400 font-black">
                  <span>التعليم الابتدائي</span>
                  <span className="text-[10px] bg-blue-950/80 text-blue-300 px-2 py-0.5 rounded-md border border-blue-800/40">
                    6 مستويات
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  {[
                    { key: "primary_1" as TabKey, label: "الأول ابتدائي" },
                    { key: "primary_2" as TabKey, label: "الثاني ابتدائي" },
                    { key: "primary_3" as TabKey, label: "الثالث ابتدائي" },
                    { key: "primary_4" as TabKey, label: "الرابع ابتدائي" },
                    { key: "primary_5" as TabKey, label: "الخامس ابتدائي" },
                    { key: "primary_6" as TabKey, label: "السادس ابتدائي" },
                  ].map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => handleLinkClick(item.key)}
                      className="text-slate-300 hover:text-blue-400 hover:bg-slate-900/90 p-1.5 rounded-lg text-right transition cursor-pointer flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* التعليم الإعدادي */}
              <div className="space-y-2.5 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 text-emerald-400 font-black">
                  <span>التعليم الإعدادي</span>
                  <span className="text-[10px] bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-800/40">
                    3 مستويات
                  </span>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  {[
                    { key: "middle_1" as TabKey, label: "الأولى ثانوي إعدادي (1AC)" },
                    { key: "middle_2" as TabKey, label: "الثانية ثانوي إعدادي (2AC)" },
                    { key: "middle_3" as TabKey, label: "الثالثة ثانوي إعدادي (الموحد والجهوي)" },
                  ].map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => handleLinkClick(item.key)}
                      className="w-full text-slate-300 hover:text-emerald-400 hover:bg-slate-900/90 p-1.5 rounded-lg text-right transition cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>{item.label}</span>
                      </div>
                      <span className="text-slate-500 text-[10px]">←</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* التعليم الثانوي والتوجيه */}
              <div className="space-y-2.5 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 text-purple-400 font-black">
                  <span>التعليم الثانوي والتوجيه</span>
                  <span className="text-[10px] bg-purple-950/80 text-purple-300 px-2 py-0.5 rounded-md border border-purple-800/40">
                    باكالوريا وتوجيه
                  </span>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  {[
                    { key: "high_common" as TabKey, label: "الجذع المشترك (علمي، أدبي، تكنولوجي)" },
                    { key: "high_1bac" as TabKey, label: "الأولى باكالوريا (الامتحان الجهوي الموحد)" },
                    { key: "high_2bac" as TabKey, label: "الثانية باكالوريا (الامتحان الوطني للباكالوريا)" },
                    { key: "orientation" as TabKey, label: "فضاء التوجيه المدرسي وعتبات المدارس العليا" },
                  ].map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => handleLinkClick(item.key)}
                      className="w-full text-slate-300 hover:text-purple-400 hover:bg-slate-900/90 p-1.5 rounded-lg text-right transition cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        <span>{item.label}</span>
                      </div>
                      <span className="text-slate-500 text-[10px]">←</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. TECHNICAL STANDARDS BADGES BAR */}
      {/* ========================================================================= */}
      <div className="border-t border-slate-900 bg-slate-950/80 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-center sm:justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5 text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>متوافق مع منظومة مسار</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <Printer className="w-3.5 h-3.5 text-blue-500" />
              <span>معايير A4 المعتمدة (210×297 مم)</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
              <span>مواكبة منهاج 2026/2027</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
              <span>طباعة فائقة الدقة 300 DPI</span>
            </span>
          </div>

          <button
            id="footer-back-to-top-btn"
            type="button"
            onClick={handleScrollToTop}
            className="flex items-center gap-1 text-slate-400 hover:text-amber-400 transition cursor-pointer font-bold"
          >
            <span>العودة للأعلى</span>
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. BOTTOM COPYRIGHT & LEGAL NOTICE */}
      {/* ========================================================================= */}
      <div className="border-t border-slate-800/60 bg-black/40 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 text-center sm:text-right">
          <div>
            <span>جميع الحقوق محفوظة لموقع الأساتذة بروف بريس </span>
            <span className="font-mono text-slate-400 font-bold">Profpress.net</span>
            <span> © 2026/2027</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              type="button"
              onClick={onOpenPrivacyModal}
              className="hover:text-slate-300 transition cursor-pointer"
            >
              سياسة الخصوصية
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={onOpenAboutModal}
              className="hover:text-slate-300 transition cursor-pointer"
            >
              شروط الاستخدام
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => handleLinkClick("contact")}
              className="hover:text-amber-300 transition cursor-pointer"
            >
              صفحة الاتصال والملاحظات
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
