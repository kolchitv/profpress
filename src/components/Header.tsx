import React from "react";
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
} from "lucide-react";
import { TabKey } from "../types";

interface HeaderProps {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
  onPrintCurrent: () => void;
  onOpenPrintPreview: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onPrintCurrent,
  onOpenPrintPreview,
}) => {
  const tabs = [
    { key: "home" as TabKey, label: "الرئيسية", icon: Home, badge: "البوابة" },
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

  return (
    <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
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
            <span className="hidden md:inline-block text-blue-300">|</span>
            <span className="hidden md:inline-block bg-blue-800/80 text-blue-100 px-2 py-0.5 rounded text-xs border border-blue-600/50">
              برنامج مدارس الريادة & التعليم الابتدائي
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://www.profpress.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold px-2.5 py-1 rounded-md text-xs transition flex items-center gap-1.5 shadow-xs"
              title="زيارة وتصفح موقع Profpress.net الأصلي"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">موقع Profpress.net</span>
              <span className="sm:hidden">Profpress</span>
            </a>
            <span className="text-blue-200 text-xs hidden md:inline-block">الموسم: 2026/2027</span>
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

      {/* Main Brand Title & Nav */}
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

        {/* Horizontal Navigation Pills */}
        <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-thin text-xs md:text-sm">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                id={`tab-btn-${tab.key}`}
                onClick={() => onSelectTab(tab.key)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-blue-700 text-white shadow-xs font-semibold"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-amber-300" : "text-slate-400"}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold leading-none ${
                      isActive
                        ? "bg-amber-400 text-slate-950"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
