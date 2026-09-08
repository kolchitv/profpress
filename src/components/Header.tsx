import React, { useState, useRef, useEffect } from "react";
import {
  Home,
  FolderKanban,
  Calendar,
  UserCheck,
  Scroll,
  FileText,
  Table,
  CalendarRange,
  Award,
  MessageSquareQuote,
  Printer,
  Sparkles,
  Eye,
  ClipboardList,
  ExternalLink,
  ChevronDown,
  Zap,
  PenTool,
  GraduationCap,
  Files,
  CheckCircle2,
  PhoneCall,
  FileSpreadsheet,
} from "lucide-react";
import { TabKey } from "../types";

interface HeaderProps {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
  onPrintCurrent: () => void;
  onOpenPrintPreview: () => void;
  onOpenContactModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onPrintCurrent,
  onOpenPrintPreview,
  onOpenContactModal,
}) => {
  const [isDocsDropdownOpen, setIsDocsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDocsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Pedagogical documents list consolidated under "وثائق تربوية"
  const pedagogicalDocs = [
    { key: "positioning_grids" as TabKey, label: "روائز الموضعة TaRL", icon: FileSpreadsheet, badge: "شتنبر 2026" },
    { key: "workshop_report" as TabKey, label: "تقرير الورشات", icon: ClipboardList, badge: "جديد 3P" },
    { key: "portfolio" as TabKey, label: "الملف التراكمي", icon: FolderKanban, badge: "الريادة" },
    { key: "timetable" as TabKey, label: "استعمال الزمن", icon: Calendar },
    { key: "card" as TabKey, label: "البطاقة الشخصية", icon: UserCheck },
    { key: "charter" as TabKey, label: "ميثاق القسم", icon: Scroll },
    { key: "covers" as TabKey, label: "واجهات الملفات", icon: FileText },
    { key: "grids" as TabKey, label: "شبكات مسار", icon: Table },
    { key: "holidays" as TabKey, label: "لائحة العطل", icon: CalendarRange, badge: "2026/2027" },
    { key: "certificates" as TabKey, label: "شواهد التقدير", icon: Award },
    { key: "remarks" as TabKey, label: "مولد الملاحظات", icon: MessageSquareQuote, badge: "AI" },
    { key: "print_preview" as TabKey, label: "معاينة و PDF", icon: Eye, badge: "A4" },
  ];

  // Check if current active tab is a pedagogical document
  const isPedagogicalDocActive =
    activeTab === "pedagogical_docs" ||
    pedagogicalDocs.some((doc) => doc.key === activeTab);

  const activeDocItem = pedagogicalDocs.find((doc) => doc.key === activeTab);

  return (
    <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs" dir="rtl">
      {/* Top Identity Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm">
          <div className="flex items-center gap-2.5">
            <img
              src="/morocco-ministry-logo.png"
              alt="شعار وزارة التربية الوطنية"
              className="w-7 h-7 object-contain bg-white/10 rounded p-0.5"
            />
            <div className="font-semibold tracking-wide">
              المملكة المغربية • وزارة التربية الوطنية والتعليم الأولي والرياضة
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="header-contact-quick-btn"
              onClick={() => onSelectTab("contact")}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold px-2.5 py-1 rounded-md text-xs transition flex items-center gap-1.5 shadow-xs cursor-pointer"
              title="صفحة الاتصال والملاحظات على الموقع"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
              <span>اتصل بنا والملاحظات</span>
            </button>
            <button
              id="header-preview-pdf-btn"
              onClick={onOpenPrintPreview}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-3 py-1 rounded-md text-xs transition flex items-center gap-1.5 shadow-xs cursor-pointer border border-blue-400/40"
              title="معاينة الطباعة وتوليد ملف PDF عالي الدقة"
            >
              <Eye className="w-3.5 h-3.5 text-amber-300" />
              <span>معاينة و PDF</span>
            </button>
            <button
              id="header-print-btn"
              onClick={onPrintCurrent}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-3 py-1 rounded-md text-xs transition flex items-center gap-1.5 shadow-xs cursor-pointer"
              title="طباعة الوثيقة الحالية بتنسيق A4"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة A4</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand Title */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2">
          <div
            onClick={() => onSelectTab("home")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img
              src="/morocco-ministry-logo.png"
              alt="شعار وزارة التربية الوطنية"
              className="w-12 h-12 object-contain hidden sm:block drop-shadow-xs group-hover:scale-105 transition-transform"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-2">
                  <span className="group-hover:text-blue-900 transition-colors">بروف بريس</span>
                  <span className="text-blue-700 font-black tracking-tight text-base md:text-lg bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200">
                    Profpress
                  </span>
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  وثائق الأستاذ المعتمدة & مسار
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                منصة بروف بريس Profpress الشاملة لتجهيز وتنظيم وتوليد وثائق أستاذ التعليم الابتدائي بالمغرب بصيغة A4 وبشعار الوزارة الرسمي
              </p>
            </div>
          </div>
        </div>

        {/* Primary Navigation Bar (الرئيسية، مستجدات، مقالات، مباريات مهنية، وثائق تربوية) */}
        <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 pt-1 text-xs md:text-sm relative max-w-full scrollbar-thin">
          {/* 1. الرئيسية */}
          <button
            key="home"
            id="nav-tab-home"
            onClick={() => {
              setIsDocsDropdownOpen(false);
              onSelectTab("home");
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
              activeTab === "home"
                ? "bg-blue-700 text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Home className={`w-4 h-4 ${activeTab === "home" ? "text-amber-300" : "text-slate-500"}`} />
            <span>الرئيسية</span>
          </button>

          {/* 2. مستجدات */}
          <button
            key="news"
            id="nav-tab-news"
            onClick={() => {
              setIsDocsDropdownOpen(false);
              onSelectTab("news");
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
              activeTab === "news"
                ? "bg-blue-700 text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Zap className={`w-4 h-4 ${activeTab === "news" ? "text-amber-300 fill-amber-300" : "text-red-500"}`} />
            <span>مستجدات</span>
            <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.2 rounded-full font-bold">
              عاجل
            </span>
          </button>

          {/* 3. مقالات */}
          <button
            key="articles"
            id="nav-tab-articles"
            onClick={() => {
              setIsDocsDropdownOpen(false);
              onSelectTab("articles");
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
              activeTab === "articles"
                ? "bg-blue-700 text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <PenTool className={`w-4 h-4 ${activeTab === "articles" ? "text-amber-300" : "text-orange-500"}`} />
            <span>مقالات</span>
          </button>

          {/* 4. مباراة التعليم */}
          <button
            key="competitions"
            id="nav-tab-competitions"
            onClick={() => {
              setIsDocsDropdownOpen(false);
              onSelectTab("competitions");
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
              activeTab === "competitions"
                ? "bg-blue-700 text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <GraduationCap className={`w-4 h-4 ${activeTab === "competitions" ? "text-amber-300" : "text-blue-600"}`} />
            <span>مباراة التعليم</span>
          </button>

          {/* 5. وثائق تربوية (تجميع جميع الوثائق) */}
          <div className="relative shrink-0" ref={dropdownRef}>
            <div className="flex items-center">
              <button
                id="nav-tab-pedagogical-docs"
                type="button"
                onClick={() => {
                  if (activeTab === "pedagogical_docs") {
                    setIsDocsDropdownOpen(!isDocsDropdownOpen);
                  } else {
                    onSelectTab("pedagogical_docs");
                    setIsDocsDropdownOpen(false);
                  }
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-r-xl font-bold whitespace-nowrap transition cursor-pointer ${
                  isPedagogicalDocActive
                    ? "bg-blue-700 text-white shadow-xs"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 border-l border-slate-200"
                }`}
                title="تجميع كافة الوثائق التربوية للأستاذ"
              >
                <Files className={`w-4 h-4 ${isPedagogicalDocActive ? "text-amber-300" : "text-emerald-600"}`} />
                <span>وثائق تربوية</span>
                {activeDocItem && activeTab !== "pedagogical_docs" ? (
                  <span className="hidden sm:inline-block text-[11px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded-md font-black mr-1">
                    {activeDocItem.label}
                  </span>
                ) : (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isPedagogicalDocActive ? "bg-amber-400 text-slate-950" : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    11 وثيقة
                  </span>
                )}
              </button>

              <button
                id="nav-docs-dropdown-btn"
                type="button"
                onClick={() => setIsDocsDropdownOpen(!isDocsDropdownOpen)}
                className={`px-2 py-2 rounded-l-xl transition cursor-pointer flex items-center justify-center ${
                  isPedagogicalDocActive
                    ? "bg-blue-800 text-white hover:bg-blue-900"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 border-y border-l border-slate-200"
                }`}
                title="عرض قائمة جميع الوثائق التربوية"
                aria-expanded={isDocsDropdownOpen}
              >
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDocsDropdownOpen ? "rotate-180 text-amber-300" : ""}`} />
              </button>
            </div>

            {/* Dropdown Menu listing all 11 consolidated documents */}
            {isDocsDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 max-w-[calc(100vw-1.5rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 py-2 divide-y divide-slate-100 animate-fadeIn text-right">
                <div className="px-3 py-2 bg-blue-50/70 rounded-t-xl flex items-center justify-between">
                  <span className="font-black text-blue-950 text-xs flex items-center gap-1.5">
                    <Files className="w-3.5 h-3.5 text-blue-600" />
                    <span>تجميع جميع الوثائق التربوية</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectTab("pedagogical_docs");
                      setIsDocsDropdownOpen(false);
                    }}
                    className="text-[11px] text-blue-700 hover:text-blue-900 font-bold hover:underline cursor-pointer"
                  >
                    عرض المركز الشامل ↗
                  </button>
                </div>

                <div className="p-1.5 max-h-[60vh] overflow-y-auto space-y-0.5">
                  {pedagogicalDocs.map((doc) => {
                    const DocIcon = doc.icon;
                    const isSelected = activeTab === doc.key;
                    return (
                      <button
                        key={doc.key}
                        id={`dropdown-item-${doc.key}`}
                        type="button"
                        onClick={() => {
                          onSelectTab(doc.key);
                          setIsDocsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-2 rounded-xl text-xs transition cursor-pointer ${
                          isSelected
                            ? "bg-blue-600 text-white font-bold shadow-xs"
                            : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <DocIcon
                            className={`w-4 h-4 ${isSelected ? "text-amber-300" : "text-blue-600"}`}
                          />
                          <span>{doc.label}</span>
                        </div>
                        {doc.badge && (
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                              isSelected
                                ? "bg-amber-400 text-slate-950"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {doc.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 6. صفحة الاتصال والملاحظات */}
          <button
            key="contact"
            id="nav-tab-contact"
            onClick={() => {
              setIsDocsDropdownOpen(false);
              onSelectTab("contact");
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
              activeTab === "contact"
                ? "bg-blue-700 text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <PhoneCall className={`w-4 h-4 ${activeTab === "contact" ? "text-amber-300" : "text-emerald-600"}`} />
            <span>الاتصال والملاحظات</span>
          </button>
        </nav>

        {/* Secondary Sub-Bar for quick document switching when inside any pedagogical doc */}
        {isPedagogicalDocActive && (
          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin text-xs">
            <span className="text-[11px] font-bold text-slate-400 shrink-0 ml-1">
              تنقل سريع بين الوثائق:
            </span>
            <button
              onClick={() => onSelectTab("pedagogical_docs")}
              className={`px-2.5 py-1 rounded-lg font-bold shrink-0 transition cursor-pointer ${
                activeTab === "pedagogical_docs"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              المركز الشامل
            </button>
            {pedagogicalDocs.map((doc) => {
              const DocIcon = doc.icon;
              const isSelected = activeTab === doc.key;
              return (
                <button
                  key={doc.key}
                  onClick={() => onSelectTab(doc.key)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium shrink-0 transition cursor-pointer whitespace-nowrap text-xs ${
                    isSelected
                      ? "bg-blue-700 text-white font-bold shadow-2xs"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60"
                  }`}
                >
                  <DocIcon className={`w-3 h-3 ${isSelected ? "text-amber-300" : "text-slate-400"}`} />
                  <span>{doc.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};

