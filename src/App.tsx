import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { CumulativePortfolio } from "./components/CumulativePortfolio";
import { TimetableEditor } from "./components/TimetableEditor";
import { TeacherCard } from "./components/TeacherCard";
import { ClassCharter } from "./components/ClassCharter";
import { CoverGenerator } from "./components/CoverGenerator";
import { EvaluationGrid } from "./components/EvaluationGrid";
import { HolidaysCalendar } from "./components/HolidaysCalendar";
import { CertificatesGenerator } from "./components/CertificatesGenerator";
import { AiPedagogyAssistant } from "./components/AiPedagogyAssistant";
import { PrintPreviewModal } from "./components/PrintPreviewModal";
import { WorkshopReport } from "./components/WorkshopReport";
import { HomePage } from "./components/HomePage";
import { AnnouncementsPage } from "./components/AnnouncementsPage";
import { CompetitionsView } from "./components/PortalViews";
import { PedagogicalDocsHub } from "./components/PedagogicalDocsHub";
import { ContactModal, PROFPRESS_CONTACT_INFO } from "./components/ContactModal";
import {
  AboutModal,
  PrivacyModal,
  SubmitTopicModal,
} from "./components/FooterModals";
import { TabKey, TeacherProfile } from "./types";
import { DEFAULT_TEACHER_PROFILE } from "./data/defaultTemplates";
import {
  Sparkles,
  School,
  CheckCircle2,
  Printer,
  Edit3,
  X,
  Save,
  HelpCircle,
  Eye,
  Download,
  PhoneCall,
  Mail,
  ExternalLink,
  Info,
  ShieldCheck,
  Send,
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [isPrintPreviewOpen, setIsPrintPreviewOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isSubmitTopicModalOpen, setIsSubmitTopicModalOpen] = useState(false);
  const [profile, setProfile] = useState<TeacherProfile>(() => {
    try {
      const saved = localStorage.getItem("yalla_teacher_profile");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_TEACHER_PROFILE;
  });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [tempProfile, setTempProfile] = useState<TeacherProfile>(profile);

  // Sync profile changes to localStorage
  const handleUpdateProfile = (newProfile: TeacherProfile) => {
    setProfile(newProfile);
    try {
      localStorage.setItem("yalla_teacher_profile", JSON.stringify(newProfile));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveModalProfile = (e: React.FormEvent) => {
    e.preventDefault();
    handleUpdateProfile(tempProfile);
    setIsProfileModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-cairo selection:bg-blue-200 selection:text-blue-900" dir="rtl">
      {/* Top Main Navigation */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onPrintCurrent={() => window.print()}
        onOpenPrintPreview={() => setIsPrintPreviewOpen(true)}
        onOpenContactModal={() => setIsContactModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 md:p-6 space-y-6">
        {/* Banner with Pioneer School Badge and Quick Teacher Status (Hidden in Print) */}
        <div className="no-print bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-950 text-white rounded-2xl p-4 md:p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 border border-blue-900/60">
          <div className="flex items-center gap-3.5 text-right w-full md:w-auto">
            <div className="w-14 h-14 rounded-xl bg-white p-1 border border-blue-400/40 flex items-center justify-center shrink-0 shadow-sm">
              <img
                src="/morocco-ministry-logo.png"
                alt="شعار وزارة التربية الوطنية"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-base md:text-xl font-black font-cairo">
                بروف بريس Profpress
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
            <button
              onClick={() => {
                setTempProfile(profile);
                setIsProfileModalOpen(true);
              }}
              className="bg-blue-900 hover:bg-blue-800 text-white border border-blue-700 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
              <span>تعديل بياناتي</span>
            </button>
            <button
              id="banner-preview-pdf-btn"
              onClick={() => setIsPrintPreviewOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white border border-blue-400/50 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <Eye className="w-3.5 h-3.5 text-amber-300" />
              <span>معاينة وتوليد PDF</span>
            </button>
            <button
              onClick={() => window.print()}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة ورقية A4</span>
            </button>
          </div>
        </div>

        {/* View Switcher based on activeTab */}
        <div className="transition-opacity duration-150">
          {activeTab === "home" && (
            <HomePage
              teacherProfile={profile}
              onNavigateToTab={setActiveTab}
              onOpenPrintPreview={() => setIsPrintPreviewOpen(true)}
              onOpenContactModal={() => setIsContactModalOpen(true)}
            />
          )}

          {activeTab === "news" && (
            <AnnouncementsPage onNavigateToTab={setActiveTab} defaultFilter="الكل" />
          )}

          {activeTab === "articles" && (
            <AnnouncementsPage onNavigateToTab={setActiveTab} defaultFilter="article" />
          )}

          {activeTab === "competitions" && (
            <CompetitionsView onNavigateToTab={setActiveTab} />
          )}

          {activeTab === "pedagogical_docs" && (
            <PedagogicalDocsHub
              teacherProfile={profile}
              onNavigateToTab={setActiveTab}
              onOpenPrintPreview={(docKey) => {
                if (docKey) setActiveTab(docKey);
                setIsPrintPreviewOpen(true);
              }}
            />
          )}

          {activeTab === "workshop_report" && (
            <WorkshopReport teacherProfile={profile} />
          )}

          {activeTab === "portfolio" && (
            <CumulativePortfolio
              teacherProfile={profile}
              onNavigateToTab={setActiveTab}
            />
          )}

          {activeTab === "timetable" && (
            <TimetableEditor teacherProfile={profile} />
          )}

          {activeTab === "card" && (
            <TeacherCard
              profile={profile}
              onUpdateProfile={handleUpdateProfile}
            />
          )}

          {activeTab === "charter" && (
            <ClassCharter teacherProfile={profile} />
          )}

          {activeTab === "covers" && (
            <CoverGenerator teacherProfile={profile} />
          )}

          {activeTab === "grids" && (
            <EvaluationGrid teacherProfile={profile} />
          )}

          {activeTab === "holidays" && (
            <HolidaysCalendar teacherProfile={profile} />
          )}

          {activeTab === "certificates" && (
            <CertificatesGenerator teacherProfile={profile} />
          )}

          {activeTab === "remarks" && (
            <AiPedagogyAssistant teacherProfile={profile} />
          )}

          {activeTab === "print_preview" && (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center shadow-xs space-y-4">
              <div className="w-16 h-16 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                <Eye className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                أداة معاينة الطباعة وتوليد وثائق PDF عالية الدقة
              </h2>
              <p className="text-sm text-slate-600 max-w-xl mx-auto">
                يمكنك معاينة أي وثيقة تربوية بمقاس A4 الحقيقي، ضبط درجات الدقة (300 DPI)، واختيار وضع الألوان أو حفظ الحبر ثم تنزيل ملف PDF جاهز فوراً.
              </p>
              <button
                onClick={() => setIsPrintPreviewOpen(true)}
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-2.5 rounded-xl text-sm inline-flex items-center gap-2 shadow-md cursor-pointer transition"
              >
                <Eye className="w-4 h-4 text-amber-300" />
                <span>فتح شاشة المعاينة التفاعلية والتوليد الآن</span>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Profile Edit Modal (no-print) */}
      {isProfileModalOpen && (
        <div className="no-print fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <School className="w-5 h-5 text-blue-700" />
                <h3 className="text-base font-bold text-slate-900">
                  تعديل بيانات الأستاذ(ة) المعتمدة في كافة الوثائق
                </h3>
              </div>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModalProfile} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">الاسم الكامل بالعربية:</label>
                  <input
                    type="text"
                    value={tempProfile.fullNameAr}
                    onChange={(e) => setTempProfile({ ...tempProfile, fullNameAr: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Nom Complet (en français):</label>
                  <input
                    type="text"
                    value={tempProfile.fullNameFr}
                    onChange={(e) => setTempProfile({ ...tempProfile, fullNameFr: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">المؤسسة التعليمية:</label>
                  <input
                    type="text"
                    value={tempProfile.institution}
                    onChange={(e) => setTempProfile({ ...tempProfile, institution: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">المستوى والصف المسند:</label>
                  <input
                    type="text"
                    value={tempProfile.assignedLevel}
                    onChange={(e) => setTempProfile({ ...tempProfile, assignedLevel: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">الأكاديمية الجهوية (AREF):</label>
                  <input
                    type="text"
                    value={tempProfile.academy}
                    onChange={(e) => setTempProfile({ ...tempProfile, academy: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">المديرية الإقليمية:</label>
                  <input
                    type="text"
                    value={tempProfile.directorate}
                    onChange={(e) => setTempProfile({ ...tempProfile, directorate: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">رقم التأجير (SOM):</label>
                  <input
                    type="text"
                    value={tempProfile.somNumber}
                    onChange={(e) => setTempProfile({ ...tempProfile, somNumber: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">الموسم الدراسي:</label>
                  <input
                    type="text"
                    value={tempProfile.schoolYear}
                    onChange={(e) => setTempProfile({ ...tempProfile, schoolYear: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProfileModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-5 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>تحديث كافة الوثائق</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* High-Resolution A4 Print Preview & PDF Generator Modal */}
      <PrintPreviewModal
        isOpen={isPrintPreviewOpen}
        onClose={() => setIsPrintPreviewOpen(false)}
        teacherProfile={profile}
        initialDocument={activeTab === "print_preview" ? "timetable" : activeTab}
      />

      {/* Official Contact Modal (Profpress.net) */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* About Us Modal (Profpress.net) */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
        onOpenContact={() => setIsContactModalOpen(true)}
      />

      {/* Privacy Policy Modal (Profpress.net) */}
      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      {/* Submit Topic Modal (Profpress.net) */}
      <SubmitTopicModal
        isOpen={isSubmitTopicModalOpen}
        onClose={() => setIsSubmitTopicModalOpen(false)}
      />

      {/* Floating Quick Contact Widget (Hidden in Print) */}
      <div className="no-print fixed bottom-5 left-5 z-40 flex items-center gap-2">
        <button
          id="floating-contact-btn"
          onClick={() => setIsContactModalOpen(true)}
          className="group bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white shadow-xl hover:shadow-2xl rounded-full px-4 py-3 flex items-center gap-2.5 transition-all duration-200 cursor-pointer border-2 border-white/90 hover:scale-105"
          title="اتصل بنا من أجل ملاحظات أو أسئلة"
        >
          <div className="relative">
            <PhoneCall className="w-5 h-5 text-amber-300 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border border-emerald-900" />
          </div>
          <div className="text-right leading-tight hidden sm:block">
            <span className="text-xs font-black block">اتصل بنا</span>
            <span className="text-[10px] text-emerald-100 font-medium block">ملاحظات وأسئلة</span>
          </div>
        </button>
      </div>

      {/* Footer (Hidden in Print) */}
      <footer className="no-print bg-slate-950 text-slate-400 py-8 border-t border-slate-800 mt-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          {/* Top Footer Section with Brand and Official Links */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                <School className="w-5 h-5" />
              </div>
              <div>
                <span className="text-amber-400 font-bold text-sm block font-cairo">
                  موقع الأساتذة بروف بريس Profpress.net
                </span>
                <span className="text-slate-400 text-xs">
                  بوابة وثائق الأستاذ الرقمية والمطبوعة • مواكبة مدارس الريادة والتعليم الابتدائي
                </span>
              </div>
            </div>

            {/* Main Footer Menu Requested: من نحن، الخصوصية، اتصل بنا، أرسل موضوع */}
            <nav
              aria-label="قائمة الفوتر"
              className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5"
            >
              <button
                id="footer-about-btn"
                type="button"
                onClick={() => setIsAboutModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5 border border-slate-700/80 shadow-2xs hover:border-slate-500"
              >
                <Info className="w-3.5 h-3.5 text-blue-400" />
                <span>من نحن</span>
              </button>

              <button
                id="footer-privacy-btn"
                type="button"
                onClick={() => setIsPrivacyModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5 border border-slate-700/80 shadow-2xs hover:border-slate-500"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>الخصوصية</span>
              </button>

              <button
                id="footer-contact-btn"
                type="button"
                onClick={() => setIsContactModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-emerald-700/90 hover:bg-emerald-600 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5 border border-emerald-500/60 shadow-xs hover:border-emerald-400"
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
                <span>اتصل بنا</span>
              </button>

              <button
                id="footer-submit-topic-btn"
                type="button"
                onClick={() => setIsSubmitTopicModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-purple-900/90 hover:bg-purple-800 text-purple-100 hover:text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5 border border-purple-600/60 shadow-xs hover:border-purple-400"
              >
                <Send className="w-3.5 h-3.5 text-amber-300" />
                <span>أرسل موضوع</span>
              </button>
            </nav>
          </div>

          {/* Contact Direct Channels & Links */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 font-mono">
              <a
                href={`tel:${PROFPRESS_CONTACT_INFO.phone}`}
                className="text-slate-300 hover:text-white flex items-center gap-1.5 hover:underline"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>الهاتف: {PROFPRESS_CONTACT_INFO.phoneFormatted}</span>
              </a>
              <span className="text-slate-700 hidden sm:inline">•</span>
              <a
                href={`mailto:${PROFPRESS_CONTACT_INFO.primaryEmail}`}
                className="text-slate-300 hover:text-white flex items-center gap-1.5 hover:underline font-mono"
              >
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>{PROFPRESS_CONTACT_INFO.primaryEmail}</span>
              </a>
              <span className="text-slate-700 hidden sm:inline">•</span>
              <a
                href={PROFPRESS_CONTACT_INFO.contactPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold font-cairo hover:underline"
              >
                <span>صفحة الاتصال بالموقع الرسمي</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex items-center gap-3 text-slate-500 text-[11px]">
              <span>متوافق مع مسار</span>
              <span>•</span>
              <span>مقاس A4 المعتمد</span>
              <span>•</span>
              <span>الموسم 2026/2027</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
