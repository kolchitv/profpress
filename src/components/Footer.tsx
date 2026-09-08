import React from "react";
import {
  Wrench,
  PhoneCall,
  Info,
  PenTool,
  ChevronUp,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowUpLeft,
} from "lucide-react";
import { TabKey } from "../types";

interface FooterProps {
  onNavigateToTab: (tab: TabKey) => void;
  onOpenAboutModal: () => void;
  onOpenPrivacyModal: () => void;
  onOpenContactModal: () => void;
  onOpenSubmitTopicModal: () => void;
  onOpenPrintPreview?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateToTab,
  onOpenAboutModal,
  onOpenPrivacyModal,
  onOpenContactModal,
  onOpenSubmitTopicModal,
}) => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenToolsPage = () => {
    onNavigateToTab("pedagogical_docs");
    handleScrollToTop();
  };

  return (
    <footer
      className="no-print bg-slate-950 text-slate-300 border-t border-slate-800/80 mt-16 font-cairo w-full max-w-full overflow-hidden"
      dir="rtl"
      id="main-app-footer"
    >
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-12">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Brand Identity */}
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2.5 bg-slate-900/90 border border-slate-800 px-4 py-1.5 rounded-full shadow-2xs">
              <img
                src="/morocco-ministry-logo.png"
                alt="شعار الوزارة"
                className="w-5 h-5 object-contain"
              />
              <span className="text-xs font-bold text-slate-300">
                المملكة المغربية • وزارة التربية الوطنية والتعليم الأولي والرياضة
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white flex items-center justify-center gap-2">
              <span>موقع الأساتذة بروف بريس</span>
              <span className="text-amber-400 font-mono text-lg sm:text-xl">Profpress.net</span>
            </h3>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl mx-auto">
              المنصة الرقمية التربوية الشاملة لإعداد وتوليد وثائق أستاذ التعليم ومواكبة مؤسسات الريادة ومستجدات المنظومة التعليمية.
            </p>
          </div>

          {/* Quick Menu (أدوات، اتصل بنا، من نحن، أرسل مقال) */}
          <div className="w-full max-w-4xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-right">
              {/* 1. قائمة الأدوات -> صفحة الأدوات */}
              <button
                type="button"
                id="footer-btn-tools"
                onClick={handleOpenToolsPage}
                className="group bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-400/50 p-4 sm:p-5 rounded-2xl transition-all duration-200 cursor-pointer flex flex-col justify-between text-right shadow-xs hover:shadow-md hover:-translate-y-0.5 min-w-0"
              >
                <div className="space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shrink-0">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black text-white group-hover:text-amber-300 transition-colors">
                        أدوات
                      </h4>
                      <ArrowUpLeft className="w-4 h-4 text-slate-500 group-hover:text-amber-300 transition-colors" />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      صفحة أدوات الأستاذ والمولدات البيداغوجية الشاملة (استعمال الزمن، الميثاق، الشواهد...)
                    </p>
                  </div>
                </div>
                <div className="pt-2 mt-2 border-t border-slate-800/60 flex items-center gap-1 text-[10px] font-bold text-amber-400/90">
                  <Sparkles className="w-3 h-3" />
                  <span>فتح صفحة الأدوات ↗</span>
                </div>
              </button>

              {/* 2. اتصل بنا */}
              <button
                type="button"
                id="footer-btn-contact"
                onClick={onOpenContactModal}
                className="group bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-emerald-400/50 p-4 sm:p-5 rounded-2xl transition-all duration-200 cursor-pointer flex flex-col justify-between text-right shadow-xs hover:shadow-md hover:-translate-y-0.5 min-w-0"
              >
                <div className="space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors shrink-0">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black text-white group-hover:text-emerald-300 transition-colors">
                        اتصل بنا
                      </h4>
                      <ArrowUpLeft className="w-4 h-4 text-slate-500 group-hover:text-emerald-300 transition-colors" />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      التواصل المباشر مع إدارة المنصة، إرسال الاستفسارات والملاحظات التقنية
                    </p>
                  </div>
                </div>
                <div className="pt-2 mt-2 border-t border-slate-800/60 flex items-center gap-1 text-[10px] font-bold text-emerald-400/90">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>نموذج التواصل السريع</span>
                </div>
              </button>

              {/* 3. من نحن */}
              <button
                type="button"
                id="footer-btn-about"
                onClick={onOpenAboutModal}
                className="group bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-blue-400/50 p-4 sm:p-5 rounded-2xl transition-all duration-200 cursor-pointer flex flex-col justify-between text-right shadow-xs hover:shadow-md hover:-translate-y-0.5 min-w-0"
              >
                <div className="space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors shrink-0">
                    <Info className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black text-white group-hover:text-blue-300 transition-colors">
                        من نحن
                      </h4>
                      <ArrowUpLeft className="w-4 h-4 text-slate-500 group-hover:text-blue-300 transition-colors" />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      التعريف بمنصة بروف بريس، رؤيتنا التعليمية وفريق العمل المتخصص
                    </p>
                  </div>
                </div>
                <div className="pt-2 mt-2 border-t border-slate-800/60 flex items-center gap-1 text-[10px] font-bold text-blue-400/90">
                  <ShieldCheck className="w-3 h-3" />
                  <span>دليل المنصة ورؤيتها</span>
                </div>
              </button>

              {/* 4. أرسل مقال */}
              <button
                type="button"
                id="footer-btn-submit-article"
                onClick={onOpenSubmitTopicModal}
                className="group bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-purple-400/50 p-4 sm:p-5 rounded-2xl transition-all duration-200 cursor-pointer flex flex-col justify-between text-right shadow-xs hover:shadow-md hover:-translate-y-0.5 min-w-0"
              >
                <div className="space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-colors shrink-0">
                    <PenTool className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black text-white group-hover:text-purple-300 transition-colors">
                        أرسل مقال
                      </h4>
                      <ArrowUpLeft className="w-4 h-4 text-slate-500 group-hover:text-purple-300 transition-colors" />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      فضاء لمشاركة مقالاتكم، بحوثكم، ومساهماتكم البيداغوجية للنشر بالموقع
                    </p>
                  </div>
                </div>
                <div className="pt-2 mt-2 border-t border-slate-800/60 flex items-center gap-1 text-[10px] font-bold text-purple-400/90">
                  <Sparkles className="w-3 h-3" />
                  <span>إرسال مساهمة تربوية</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Minimal Copyright & Navigation Bar */}
      <div className="border-t border-slate-800/80 bg-black/40 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 text-center sm:text-right">
          <div>
            <span>جميع الحقوق محفوظة لموقع الأساتذة بروف بريس </span>
            <span className="font-mono text-slate-300 font-bold">Profpress.net</span>
            <span> © 2026/2027</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[11px]">
            <button
              type="button"
              id="footer-nav-tools"
              onClick={handleOpenToolsPage}
              className="text-amber-400 hover:text-amber-300 font-bold transition cursor-pointer"
            >
              صفحة الأدوات
            </button>
            <span>•</span>
            <button
              type="button"
              id="footer-nav-contact"
              onClick={onOpenContactModal}
              className="hover:text-slate-200 transition cursor-pointer"
            >
              اتصل بنا
            </button>
            <span>•</span>
            <button
              type="button"
              id="footer-nav-about"
              onClick={onOpenAboutModal}
              className="hover:text-slate-200 transition cursor-pointer"
            >
              من نحن
            </button>
            <span>•</span>
            <button
              type="button"
              id="footer-nav-submit"
              onClick={onOpenSubmitTopicModal}
              className="hover:text-slate-200 transition cursor-pointer"
            >
              أرسل مقال
            </button>
            <span>•</span>
            <button
              type="button"
              id="footer-nav-privacy"
              onClick={onOpenPrivacyModal}
              className="hover:text-slate-200 transition cursor-pointer"
            >
              سياسة الخصوصية
            </button>
            <span>•</span>
            <button
              type="button"
              id="footer-scroll-top"
              onClick={handleScrollToTop}
              className="hover:text-amber-400 transition cursor-pointer flex items-center gap-1 font-bold text-slate-400"
              title="العودة لأعلى الصفحة"
            >
              <span>للأعلى</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
