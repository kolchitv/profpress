import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { CumulativePortfolio } from "./components/CumulativePortfolio";
import { TimetableEditor } from "./components/TimetableEditor";
import { TeacherCard } from "./components/TeacherCard";
import { ClassCharter } from "./components/ClassCharter";
import { CoverGenerator } from "./components/CoverGenerator";
import { EvaluationGrid } from "./components/EvaluationGrid";
import { PositioningGridsEditor } from "./components/PositioningGridsEditor";
import { HolidaysCalendar } from "./components/HolidaysCalendar";
import { CertificatesGenerator } from "./components/CertificatesGenerator";
import { AiPedagogyAssistant } from "./components/AiPedagogyAssistant";
import { PrintPreviewModal } from "./components/PrintPreviewModal";
import { WorkshopReport } from "./components/WorkshopReport";
import { HomePage } from "./components/HomePage";
import { AnnouncementsPage } from "./components/AnnouncementsPage";
import { TeachingCompetitionPage } from "./components/TeachingCompetitionPage";
import { InspectionCompetitionPage } from "./components/InspectionCompetitionPage";
import { OrientationPlanningPage } from "./components/OrientationPlanningPage";
import { ExplicitTeachingPage } from "./components/ExplicitTeachingPage";
import { PedagogicalDocsHub } from "./components/PedagogicalDocsHub";
import { DailyDiaryLog } from "./components/DailyDiaryLog";
import { ContactPage } from "./components/ContactPage";
import { EducationalBranchPage } from "./components/EducationalBranchPage";
import { OrientationPage } from "./components/OrientationPage";
import { ContactModal, PROFPRESS_CONTACT_INFO } from "./components/ContactModal";
import {
  AboutModal,
  PrivacyModal,
  SubmitTopicModal,
} from "./components/FooterModals";
import { Footer } from "./components/Footer";
import { AdminLoginModal } from "./components/AdminLoginModal";
import { AdminControlPanel } from "./components/AdminControlPanel";
import {
  getStoredAdminSession,
  clearAdminSession,
  ADMIN_SESSION_EVENT,
} from "./utils/adminAuth";
import { INITIAL_TOPICS } from "./data/announcementsData";
import { TabKey, TeacherProfile, GradeLevelId, AdminSession, TopicItem } from "./types";
import { DEFAULT_TEACHER_PROFILE } from "./data/defaultTemplates";
import { applyCustomScripts, getCustomCodeSettings, CUSTOM_CODE_EVENT } from "./utils/customScripts";
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

  // Admin Session State (kolchitv@gmail.com)
  const [adminSession, setAdminSession] = useState<AdminSession | null>(getStoredAdminSession);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminControlPanelOpen, setIsAdminControlPanelOpen] = useState(false);

  // Synchronize topics for AdminControlPanel with auto-merge for official circulars
  const [topics, setTopics] = useState<TopicItem[]>(() => {
    try {
      const saved = localStorage.getItem("yallataalim_announcements_v1");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const existingIds = new Set(parsed.map((t: TopicItem) => t.id));
          const newFromInitial = INITIAL_TOPICS.filter((t) => !existingIds.has(t.id));
          const updatedSaved = parsed.map((item: TopicItem) => {
            const fresh = INITIAL_TOPICS.find((t) => t.id === item.id);
            if (fresh && (!item.downloadUrl || item.downloadUrl === "#" || (fresh.downloads && fresh.downloads.length > 0 && (!item.downloads || item.downloads.length === 0)))) {
              return {
                ...item,
                downloadUrl: fresh.downloadUrl || item.downloadUrl,
                downloadLabel: fresh.downloadLabel || item.downloadLabel,
                downloads: fresh.downloads || item.downloads,
              };
            }
            return item;
          });
          return [...newFromInitial, ...updatedSaved];
        }
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_TOPICS;
  });

  const handleSaveTopics = (updated: TopicItem[]) => {
    setTopics(updated);
    try {
      localStorage.setItem("yallataalim_announcements_v1", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

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

  // Listen to Admin Session Changes across components
  useEffect(() => {
    const handleSessionChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      setAdminSession(customEvent.detail !== undefined ? customEvent.detail : getStoredAdminSession());
    };
    window.addEventListener(ADMIN_SESSION_EVENT, handleSessionChange);
    return () => window.removeEventListener(ADMIN_SESSION_EVENT, handleSessionChange);
  }, []);

  // Initialize and listen to custom script injections (Header, Body, Footer)
  useEffect(() => {
    applyCustomScripts(getCustomCodeSettings());

    const handleCustomCodeUpdate = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail) {
        applyCustomScripts(customEvent.detail);
      } else {
        applyCustomScripts(getCustomCodeSettings());
      }
    };

    window.addEventListener(CUSTOM_CODE_EVENT, handleCustomCodeUpdate);
    return () => {
      window.removeEventListener(CUSTOM_CODE_EVENT, handleCustomCodeUpdate);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-cairo selection:bg-blue-200 selection:text-blue-900" dir="rtl">
      {/* Top Main Navigation */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onPrintCurrent={() => window.print()}
        onOpenPrintPreview={() => setIsPrintPreviewOpen(true)}
        onOpenContactModal={() => setIsContactModalOpen(true)}
        adminSession={adminSession}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onOpenAdminControlPanel={() => setIsAdminControlPanelOpen(true)}
        onLogoutAdmin={() => clearAdminSession()}
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
            <TeachingCompetitionPage onNavigateToTab={setActiveTab} />
          )}

          {activeTab === "inspection_competition" && (
            <InspectionCompetitionPage onNavigateToTab={setActiveTab} />
          )}

          {activeTab === "orientation_planning" && (
            <OrientationPlanningPage onNavigateToTab={setActiveTab} />
          )}

          {activeTab === "explicit_teaching" && (
            <ExplicitTeachingPage onNavigateToTab={setActiveTab} />
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

          {activeTab === "daily_log" && (
            <DailyDiaryLog teacherProfile={profile} />
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
            <EvaluationGrid
              teacherProfile={profile}
              onNavigateToTab={setActiveTab}
            />
          )}

          {activeTab === "positioning_grids" && (
            <PositioningGridsEditor teacherProfile={profile} />
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

          {activeTab === "contact" && (
            <ContactPage onNavigateToTab={setActiveTab} />
          )}

          {/* Educational Levels dedicated pages (التعليم الابتدائي، الإعدادي، الثانوي) */}
          {(activeTab === "primary_1" ||
            activeTab === "primary_2" ||
            activeTab === "primary_3" ||
            activeTab === "primary_4" ||
            activeTab === "primary_5" ||
            activeTab === "primary_6" ||
            activeTab === "middle_1" ||
            activeTab === "middle_2" ||
            activeTab === "middle_3" ||
            activeTab === "high_common" ||
            activeTab === "high_1bac" ||
            activeTab === "high_2bac") && (
            <EducationalBranchPage
              levelId={activeTab as GradeLevelId}
              onNavigateToTab={setActiveTab}
              onOpenPrintPreview={() => setIsPrintPreviewOpen(true)}
            />
          )}

          {/* Orientation & Guidance dedicated page (توجيه) */}
          {activeTab === "orientation" && (
            <OrientationPage onNavigateToTab={setActiveTab} />
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
        onNavigateToContactPage={() => setActiveTab("contact")}
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

      {/* Admin Login Modal (Accessible from top bar) */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={(session) => {
          setAdminSession(session);
          setIsAdminLoginOpen(false);
        }}
      />

      {/* Admin Control Panel (Site monitoring, analytics, SEO, and topics) */}
      {adminSession && (
        <AdminControlPanel
          isOpen={isAdminControlPanelOpen}
          onClose={() => setIsAdminControlPanelOpen(false)}
          topics={topics}
          adminSession={adminSession}
          onEditTopic={() => {
            setIsAdminControlPanelOpen(false);
            setActiveTab("news");
          }}
          onAddNewTopic={() => {
            setIsAdminControlPanelOpen(false);
            setActiveTab("news");
          }}
          onDeleteTopic={(id) => {
            handleSaveTopics(topics.filter((t) => t.id !== id));
          }}
          onToggleUrgent={(id) => {
            handleSaveTopics(
              topics.map((t) => (t.id === id ? { ...t, isUrgent: !t.isUrgent } : t))
            );
          }}
          onSaveTopics={handleSaveTopics}
          onLogout={() => {
            clearAdminSession();
            setIsAdminControlPanelOpen(false);
          }}
        />
      )}

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
      <Footer
        onNavigateToTab={setActiveTab}
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
        onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
        onOpenContactModal={() => setIsContactModalOpen(true)}
        onOpenSubmitTopicModal={() => setIsSubmitTopicModalOpen(true)}
        onOpenPrintPreview={() => setIsPrintPreviewOpen(true)}
      />
    </div>
  );
}
