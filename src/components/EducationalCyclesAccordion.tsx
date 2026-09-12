import React, { useState } from "react";
import {
  ChevronDown,
  User,
  School,
  GraduationCap,
  Sparkles,
  BookOpen,
  ArrowRight,
  Compass,
  Trophy,
  GitBranch,
  Layers,
  CheckCircle2,
  ExternalLink,
  ChevronLeft,
  Award,
} from "lucide-react";
import { TabKey, GradeLevelId } from "../types";

interface EducationalCyclesAccordionProps {
  onNavigateToTab: (tab: TabKey) => void;
  activeTab?: TabKey;
  className?: string;
  defaultExpandedAll?: boolean;
  initialMode?: "tree" | "grid" | "vertical";
}

export const EducationalCyclesAccordion: React.FC<EducationalCyclesAccordionProps> = ({
  onNavigateToTab,
  activeTab,
  className = "",
  defaultExpandedAll = true,
  initialMode = "tree",
}) => {
  // View mode: "tree" (Horizontal Tree Flowchart), "grid" (Horizontal Columns), "vertical" (Classic accordion)
  const [viewMode, setViewMode] = useState<"tree" | "grid" | "vertical">(initialMode);

  // States for vertical mode if toggled
  const [isPrimaryOpen, setIsPrimaryOpen] = useState(true);
  const [isMiddleOpen, setIsMiddleOpen] = useState(true);
  const [isHighOpen, setIsHighOpen] = useState(true);

  // Primary sub-items
  const primaryItems: { id: GradeLevelId; label: string; code: string; badge?: string }[] = [
    { id: "primary_1", label: "الأول ابتدائي", code: "1AEP" },
    { id: "primary_2", label: "الثاني ابتدائي", code: "2AEP" },
    { id: "primary_3", label: "الثالث ابتدائي", code: "3AEP" },
    { id: "primary_4", label: "الرابع ابتدائي", code: "4AEP" },
    { id: "primary_5", label: "الخامس ابتدائي", code: "5AEP" },
    { id: "primary_6", label: "السادس ابتدائي", code: "6AEP", badge: "موحد إقليمي" },
  ];

  // Middle sub-items
  const middleItems: { id: GradeLevelId; label: string; code: string; badge?: string }[] = [
    { id: "middle_1", label: "الأولى إعدادي", code: "1AC" },
    { id: "middle_2", label: "الثانية إعدادي", code: "2AC" },
    { id: "middle_3", label: "الثالثة إعدادي", code: "3AC", badge: "موحد جهوي" },
  ];

  // High sub-items
  const highItems: { id: GradeLevelId; label: string; code: string; badge?: string }[] = [
    { id: "high_common", label: "الجذع المشترك", code: "TC", badge: "توجيه" },
    { id: "high_1bac", label: "الأولى باكالوريا", code: "1BAC", badge: "جهوي" },
    { id: "high_2bac", label: "الثانية باكالوريا", code: "2BAC", badge: "امتحان وطني" },
  ];

  // 2-column paired items for classic vertical view
  const primaryPairs = [
    { right: primaryItems[0], left: primaryItems[1] },
    { right: primaryItems[2], left: primaryItems[3] },
    { right: primaryItems[4], left: primaryItems[5] },
  ];

  return (
    <div
      className={`bg-white border border-slate-200/90 rounded-2xl md:rounded-3xl shadow-xs overflow-hidden flex flex-col font-cairo select-none w-full max-w-full ${className}`}
      id="educational-cycles-horizontal-container"
    >
      {/* 1. Header with Title & View Mode Switcher */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-3.5 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 w-full max-w-full">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-amber-300 shadow-2xs shrink-0">
            <GitBranch className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm sm:text-base md:text-lg font-black text-white tracking-tight truncate">
                شجرة الأسلاك والأقسام التعليمية
              </h3>
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full shrink-0">
                تخطيط أفقي تفاعلي
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5 line-clamp-1 sm:line-clamp-none">
              اضغط على أي قسم لفتح صفحته المخصصة وفروضه وامتحاناته
            </p>
          </div>
        </div>

        {/* Responsive View Switcher Controls (Stays 100% inside screen on mobile) */}
        <div className="grid grid-cols-3 gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/80 w-full sm:w-auto shrink-0">
          <button
            type="button"
            id="btn-view-tree-horizontal"
            onClick={() => setViewMode("tree")}
            className={`px-2 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer truncate ${
              viewMode === "tree"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-300 hover:text-white hover:bg-slate-700/50"
            }`}
            title="عرض المخطط الشجري الأفقي"
          >
            <GitBranch className="w-3.5 h-3.5 shrink-0" />
            <span>شجرة أفقية</span>
          </button>

          <button
            type="button"
            id="btn-view-grid-horizontal"
            onClick={() => setViewMode("grid")}
            className={`px-2 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer truncate ${
              viewMode === "grid"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-300 hover:text-white hover:bg-slate-700/50"
            }`}
            title="عرض الأعمدة الأفقية المتجاورة"
          >
            <Layers className="w-3.5 h-3.5 shrink-0" />
            <span>أعمدة</span>
          </button>

          <button
            type="button"
            id="btn-view-vertical-compact"
            onClick={() => setViewMode("vertical")}
            className={`px-2 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer truncate ${
              viewMode === "vertical"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-300 hover:text-white hover:bg-slate-700/50"
            }`}
            title="عرض القائمة المدمجة"
          >
            <ChevronDown className="w-3.5 h-3.5 shrink-0" />
            <span>مدمجة</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: HORIZONTAL TREE FLOWCHART (Fully Responsive on Mobile & Desktop) */}
      {/* ========================================================================= */}
      {viewMode === "tree" && (
        <div className="p-3 sm:p-5 md:p-6 bg-slate-50/70 w-full max-w-full">
          <div className="w-full space-y-3 sm:space-y-4">
            {/* 1. Primary Cycle Branch (سلك التعليم الابتدائي) */}
            <div className="bg-white border border-blue-200/90 rounded-2xl p-3 sm:p-4 shadow-2xs hover:shadow-xs transition flex flex-col md:flex-row md:items-center gap-3 md:gap-4 w-full max-w-full">
              {/* Branch Root / Cycle Header Node */}
              <div 
                onClick={() => onNavigateToTab("primaire")}
                className={`w-full md:w-56 shrink-0 bg-blue-50/90 hover:bg-blue-100/90 border border-blue-200 rounded-xl p-2.5 sm:p-3 flex items-center justify-between text-right cursor-pointer transition-colors group ${
                  activeTab === "primaire" ? "ring-2 ring-blue-600 bg-blue-100/90" : ""
                }`}
                title="فتح فضاء التعليم الابتدائي الشامل (دروس، فروض، مخططات، خرائط ذهنية)"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                    <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="text-xs sm:text-sm font-black text-blue-900 leading-tight truncate">
                        التعليم الابتدائي
                      </h4>
                      <span className="text-[9px] bg-blue-600 text-white font-black px-1.5 py-0.2 rounded-md">
                        فضاء شامل
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-bold text-blue-700 block truncate">
                      دروس • فروض • مخططات • خرائط
                    </span>
                  </div>
                </div>

                <div className="hidden md:flex items-center text-blue-400 group-hover:text-blue-700 transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </div>
              </div>

              {/* Connecting Tree Line (desktop only) */}
              <div className="w-5 h-0.5 bg-blue-300 shrink-0 hidden md:block" />

              {/* Responsive Grid for Grades 1 to 6 (Fits perfectly on mobile & desktop) */}
              <div className="w-full flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1.5 sm:gap-2">
                {primaryItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      id={`tree-node-${item.id}`}
                      onClick={() => onNavigateToTab(item.id as TabKey)}
                      className={`p-2 sm:p-2.5 rounded-xl border text-center transition cursor-pointer flex flex-col items-center justify-center gap-0.5 sm:gap-1 min-w-0 ${
                        isActive
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                          : "bg-white text-slate-700 border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 hover:text-blue-700"
                      }`}
                    >
                      <span className="text-xs font-black tracking-tight leading-tight truncate w-full">
                        {item.label}
                      </span>
                      <div className="flex items-center gap-1 flex-wrap justify-center">
                        <span
                          className={`text-[9px] sm:text-[10px] font-mono px-1 sm:px-1.5 py-0.2 rounded-md ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-blue-50 text-blue-800 font-bold"
                          }`}
                        >
                          {item.code}
                        </span>
                        {item.badge && (
                          <span className="text-[8px] sm:text-[9px] bg-amber-400 text-slate-950 font-black px-1 rounded-xs">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Middle Cycle Branch (سلك التعليم الإعدادي) */}
            <div className="bg-white border border-emerald-200/90 rounded-2xl p-3 sm:p-4 shadow-2xs hover:shadow-xs transition flex flex-col md:flex-row md:items-center gap-3 md:gap-4 w-full max-w-full">
              {/* Branch Root / Cycle Header Node */}
              <div className="w-full md:w-52 shrink-0 bg-emerald-50/90 border border-emerald-200 rounded-xl p-2.5 sm:p-3 flex items-center justify-between text-right">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0">
                    <School className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-black text-emerald-900 leading-tight truncate">
                      التعليم الإعدادي
                    </h4>
                    <span className="text-[10px] sm:text-[11px] font-bold text-emerald-700">
                      3 سنوات تأهيلية
                    </span>
                  </div>
                </div>

                <div className="hidden md:flex items-center text-emerald-400">
                  <ChevronLeft className="w-4 h-4" />
                </div>
              </div>

              {/* Connecting Tree Line (desktop only) */}
              <div className="w-5 h-0.5 bg-emerald-300 shrink-0 hidden md:block" />

              {/* Responsive Grid for Grades 1 to 3 */}
              <div className="w-full flex-1 grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2">
                {middleItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      id={`tree-node-${item.id}`}
                      onClick={() => onNavigateToTab(item.id as TabKey)}
                      className={`p-2.5 sm:p-3 rounded-xl border text-center transition cursor-pointer flex flex-col items-center justify-center gap-1 min-w-0 ${
                        isActive
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                          : "bg-white text-slate-700 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 hover:text-emerald-700"
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-black tracking-tight leading-tight truncate w-full">
                        {item.label}
                      </span>
                      <div className="flex items-center gap-1.5 justify-center">
                        <span
                          className={`text-[9px] sm:text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-emerald-50 text-emerald-800 font-bold"
                          }`}
                        >
                          {item.code}
                        </span>
                        {item.badge && (
                          <span className="text-[8px] sm:text-[9px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.2 rounded-md">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Secondary Cycle Branch (سلك التعليم الثانوي) */}
            <div className="bg-white border border-purple-200/90 rounded-2xl p-3 sm:p-4 shadow-2xs hover:shadow-xs transition flex flex-col md:flex-row md:items-center gap-3 md:gap-4 w-full max-w-full">
              {/* Branch Root / Cycle Header Node */}
              <div className="w-full md:w-52 shrink-0 bg-purple-50/90 border border-purple-200 rounded-xl p-2.5 sm:p-3 flex items-center justify-between text-right">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs shrink-0">
                    <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-black text-purple-900 leading-tight truncate">
                      التعليم الثانوي
                    </h4>
                    <span className="text-[10px] sm:text-[11px] font-bold text-purple-700">
                      3 مسالك تأهيلية
                    </span>
                  </div>
                </div>

                <div className="hidden md:flex items-center text-purple-400">
                  <ChevronLeft className="w-4 h-4" />
                </div>
              </div>

              {/* Connecting Tree Line (desktop only) */}
              <div className="w-5 h-0.5 bg-purple-300 shrink-0 hidden md:block" />

              {/* Responsive Grid for TC, 1BAC, 2BAC */}
              <div className="w-full flex-1 grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2">
                {highItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      id={`tree-node-${item.id}`}
                      onClick={() => onNavigateToTab(item.id as TabKey)}
                      className={`p-2.5 sm:p-3 rounded-xl border text-center transition cursor-pointer flex flex-col items-center justify-center gap-1 min-w-0 ${
                        isActive
                          ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                          : "bg-white text-slate-700 border-slate-200 hover:border-purple-400 hover:bg-purple-50/50 hover:text-purple-700"
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-black tracking-tight leading-tight truncate w-full">
                        {item.label}
                      </span>
                      <div className="flex items-center gap-1.5 justify-center">
                        <span
                          className={`text-[9px] sm:text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-purple-50 text-purple-800 font-bold"
                          }`}
                        >
                          {item.code}
                        </span>
                        {item.badge && (
                          <span className="text-[8px] sm:text-[9px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.2 rounded-md">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Horizontal Competitions & Guidance Actions Row (Fully Responsive) */}
            <div className="bg-gradient-to-r from-amber-50/90 via-slate-50 to-purple-50/90 border border-slate-200/90 rounded-2xl p-3 sm:p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 w-full max-w-full">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 min-w-0">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="truncate">محطات التوجيه المدرسي والامتحانات الإشهادية:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full md:w-auto">
                <button
                  type="button"
                  id="btn-tree-competitions"
                  onClick={() => onNavigateToTab("competitions")}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs ${
                    activeTab === "competitions"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-white text-blue-900 border border-blue-200 hover:bg-blue-50"
                  }`}
                >
                  <Trophy className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">الشامل لمباراة التعليم (ابتدائي وثانوي)</span>
                </button>

                <button
                  type="button"
                  id="btn-tree-orientation"
                  onClick={() => onNavigateToTab("orientation")}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs ${
                    activeTab === "orientation"
                      ? "bg-purple-600 text-white shadow-xs"
                      : "bg-white text-purple-900 border border-purple-200 hover:bg-purple-50"
                  }`}
                >
                  <Compass className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">فضاء التوجيه وعتبات المدارس العليا</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: HORIZONTAL COLUMNS GRID (100% Inside Screen on Mobile) */}
      {/* ========================================================================= */}
      {viewMode === "grid" && (
        <div className="p-3 sm:p-5 md:p-6 bg-slate-50/50 w-full max-w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
            {/* Column 1: الابتدائي */}
            <div className="bg-white border border-blue-200 rounded-2xl p-3.5 sm:p-4 shadow-2xs space-y-3 flex flex-col justify-between min-w-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-blue-100">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-black text-blue-950 truncate">التعليم الابتدائي</h4>
                      <span className="text-[10px] text-blue-600 font-bold">6 مستويات</span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-blue-50 text-blue-800 font-bold px-2 py-0.5 rounded-md shrink-0">
                    1AEP - 6AEP
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  {primaryItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      id={`grid-btn-${item.id}`}
                      onClick={() => onNavigateToTab(item.id as TabKey)}
                      className={`text-right p-2 rounded-xl text-xs font-bold transition cursor-pointer border min-w-0 ${
                        activeTab === item.id
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-slate-50 text-slate-700 border-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
                      }`}
                    >
                      <span className="block truncate">{item.label}</span>
                      <span className="text-[9px] opacity-70 block">{item.code}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <button
                  type="button"
                  id="grid-btn-primary-hub"
                  onClick={() => onNavigateToTab("primaire")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-black py-2 rounded-xl transition cursor-pointer text-center flex items-center justify-center gap-1 shadow-2xs"
                >
                  <span>فضاء الابتدائي الشامل (دروس • فروض)</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateToTab("primary_6")}
                  className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-black py-1.5 rounded-xl transition cursor-pointer text-center"
                >
                  الامتحان الموحد الإقليمي (السادس) ←
                </button>
              </div>
            </div>

            {/* Column 2: الإعدادي */}
            <div className="bg-white border border-emerald-200 rounded-2xl p-3.5 sm:p-4 shadow-2xs space-y-3 flex flex-col justify-between min-w-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <School className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-black text-emerald-950 truncate">التعليم الإعدادي</h4>
                      <span className="text-[10px] text-emerald-600 font-bold">3 سنوات</span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-md shrink-0">
                    1AC - 3AC
                  </span>
                </div>

                <div className="space-y-1.5">
                  {middleItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      id={`grid-btn-${item.id}`}
                      onClick={() => onNavigateToTab(item.id as TabKey)}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold transition cursor-pointer border min-w-0 ${
                        activeTab === item.id
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "bg-slate-50 text-slate-700 border-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"
                      }`}
                    >
                      <span className="truncate">{item.label}</span>
                      <span className="text-[10px] font-mono shrink-0 mr-1">{item.code}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigateToTab("middle_3")}
                className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[11px] font-black py-2 rounded-xl transition cursor-pointer text-center"
              >
                الموحد الجهوي والمحلي (3AC) ←
              </button>
            </div>

            {/* Column 3: الثانوي */}
            <div className="bg-white border border-purple-200 rounded-2xl p-3.5 sm:p-4 shadow-2xs space-y-3 flex flex-col justify-between min-w-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-purple-100">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-black text-purple-950 truncate">التعليم الثانوي</h4>
                      <span className="text-[10px] text-purple-600 font-bold">3 مسالك</span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-purple-50 text-purple-800 font-bold px-2 py-0.5 rounded-md shrink-0">
                    TC - 2BAC
                  </span>
                </div>

                <div className="space-y-1.5">
                  {highItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      id={`grid-btn-${item.id}`}
                      onClick={() => onNavigateToTab(item.id as TabKey)}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold transition cursor-pointer border min-w-0 ${
                        activeTab === item.id
                          ? "bg-purple-600 text-white border-purple-600"
                          : "bg-slate-50 text-slate-700 border-slate-100 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200"
                      }`}
                    >
                      <span className="truncate">{item.label}</span>
                      <span className="text-[10px] font-mono shrink-0 mr-1">{item.code}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigateToTab("high_2bac")}
                className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 text-[11px] font-black py-2 rounded-xl transition cursor-pointer text-center"
              >
                الامتحان الوطني للباكالوريا (2BAC) ←
              </button>
            </div>

            {/* Column 4: مباريات وتوجيه */}
            <div className="bg-gradient-to-br from-amber-500/10 via-white to-purple-500/10 border border-amber-300/80 rounded-2xl p-3.5 sm:p-4 shadow-2xs space-y-3 flex flex-col justify-between min-w-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-amber-200">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-black text-slate-950 truncate">المباريات والتوجيه</h4>
                      <span className="text-[10px] text-amber-800 font-bold">بوابة المستشار</span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-amber-200 text-amber-900 font-black px-2 py-0.5 rounded-md shrink-0">
                    2026/2027
                  </span>
                </div>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => onNavigateToTab("competitions")}
                    className={`w-full text-right p-2.5 rounded-xl text-xs font-bold transition cursor-pointer border min-w-0 ${
                      activeTab === "competitions"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-slate-800 border-slate-200 hover:bg-blue-50 hover:text-blue-700"
                    }`}
                  >
                    <div className="font-black truncate">مباريات التعليم والوظيفة</div>
                    <div className="text-[10px] opacity-75 mt-0.5 truncate">أطر التدريس والتفتيش</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigateToTab("orientation")}
                    className={`w-full text-right p-2.5 rounded-xl text-xs font-bold transition cursor-pointer border min-w-0 ${
                      activeTab === "orientation"
                        ? "bg-purple-600 text-white border-purple-600"
                        : "bg-white text-slate-800 border-slate-200 hover:bg-purple-50 hover:text-purple-700"
                    }`}
                  >
                    <div className="font-black truncate">فضاء التوجيه والمدارس العليا</div>
                    <div className="text-[10px] opacity-75 mt-0.5 truncate">عتبات الانتقاء (Seuils)</div>
                  </button>
                </div>
              </div>

              <div className="text-center text-[10px] text-slate-500">
                تحديثات فورية لكافة المستجدات
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: CLASSIC COMPACT ACCORDION (100% Inside Screen on Mobile) */}
      {/* ========================================================================= */}
      {viewMode === "vertical" && (
        <div className="divide-y divide-slate-100 w-full max-w-full">
          {/* Primary */}
          <div>
            <button
              type="button"
              id="accordion-header-primary"
              onClick={() => setIsPrimaryOpen((prev) => !prev)}
              className="w-full flex items-center justify-between px-4 sm:px-5 py-3.5 bg-blue-50/70 hover:bg-blue-100/60 transition cursor-pointer text-right group"
            >
              <div className="text-blue-600 transition-transform duration-200">
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isPrimaryOpen ? "rotate-0 text-blue-600" : "-rotate-90 text-blue-400"
                  }`}
                />
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-sm sm:text-base font-black text-blue-600 tracking-tight">
                  التعليم الابتدائي
                </span>
                <User className="w-5 h-5 text-blue-600 stroke-[2.5]" />
              </div>
            </button>

            {isPrimaryOpen && (
              <div className="bg-white px-4 sm:px-5 py-3 animate-fadeIn divide-y divide-slate-100/80">
                {primaryPairs.map((pair, idx) => (
                  <div key={idx} className="grid grid-cols-2 py-2.5 first:pt-1 last:pb-1 text-xs sm:text-sm text-slate-700 gap-2">
                    <button
                      type="button"
                      id={`btn-branch-${pair.right.id}`}
                      onClick={() => onNavigateToTab(pair.right.id as TabKey)}
                      className={`text-right py-1 px-2 rounded-lg transition-all cursor-pointer font-bold truncate ${
                        activeTab === pair.right.id
                          ? "text-blue-700 bg-blue-50 font-black"
                          : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                      }`}
                    >
                      {pair.right.label}
                    </button>
                    <button
                      type="button"
                      id={`btn-branch-${pair.left.id}`}
                      onClick={() => onNavigateToTab(pair.left.id as TabKey)}
                      className={`text-right py-1 px-2 rounded-lg transition-all cursor-pointer font-bold truncate ${
                        activeTab === pair.left.id
                          ? "text-blue-700 bg-blue-50 font-black"
                          : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                      }`}
                    >
                      {pair.left.label}
                    </button>
                  </div>
                ))}

                <div className="pt-2 pb-1">
                  <button
                    type="button"
                    onClick={() => onNavigateToTab("primaire")}
                    className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <span>عرض فضاء الابتدائي الشامل (دروس • فروض • مخططات • خرائط)</span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Middle */}
          <div>
            <button
              type="button"
              id="accordion-header-middle"
              onClick={() => setIsMiddleOpen((prev) => !prev)}
              className="w-full flex items-center justify-between px-4 sm:px-5 py-3.5 bg-emerald-50/70 hover:bg-emerald-100/60 transition cursor-pointer text-right group"
            >
              <div className="text-emerald-600 transition-transform duration-200">
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isMiddleOpen ? "rotate-0 text-emerald-600" : "-rotate-90 text-emerald-400"
                  }`}
                />
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-sm sm:text-base font-black text-emerald-600 tracking-tight">
                  التعليم الإعدادي
                </span>
                <School className="w-5 h-5 text-emerald-600 stroke-[2.5]" />
              </div>
            </button>

            {isMiddleOpen && (
              <div className="bg-white px-4 sm:px-5 py-3 animate-fadeIn divide-y divide-slate-100/80">
                {middleItems.map((item) => (
                  <div key={item.id} className="py-2 first:pt-1 last:pb-1">
                    <button
                      type="button"
                      id={`btn-branch-${item.id}`}
                      onClick={() => onNavigateToTab(item.id as TabKey)}
                      className={`w-full text-right py-1.5 px-2 rounded-lg transition-all cursor-pointer font-bold text-xs sm:text-sm truncate ${
                        activeTab === item.id
                          ? "text-emerald-700 bg-emerald-50 font-black"
                          : "text-slate-600 hover:text-emerald-600 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* High */}
          <div>
            <button
              type="button"
              id="accordion-header-high"
              onClick={() => setIsHighOpen((prev) => !prev)}
              className="w-full flex items-center justify-between px-4 sm:px-5 py-3.5 bg-purple-50/70 hover:bg-purple-100/60 transition cursor-pointer text-right group"
            >
              <div className="text-purple-600 transition-transform duration-200">
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isHighOpen ? "rotate-0 text-purple-600" : "-rotate-90 text-purple-400"
                  }`}
                />
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-sm sm:text-base font-black text-purple-600 tracking-tight">
                  التعليم الثانوي
                </span>
                <GraduationCap className="w-5 h-5 text-purple-600 stroke-[2.5]" />
              </div>
            </button>

            {isHighOpen && (
              <div className="bg-white px-4 sm:px-5 py-3 animate-fadeIn divide-y divide-slate-100/80">
                {highItems.map((item) => (
                  <div key={item.id} className="py-2 first:pt-1 last:pb-1">
                    <button
                      type="button"
                      id={`btn-branch-${item.id}`}
                      onClick={() => onNavigateToTab(item.id as TabKey)}
                      className={`w-full text-right py-1.5 px-2 rounded-lg transition-all cursor-pointer font-bold text-xs sm:text-sm truncate ${
                        activeTab === item.id
                          ? "text-purple-700 bg-purple-50 font-black"
                          : "text-slate-600 hover:text-purple-600 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="p-3 bg-slate-50/60 border-t border-slate-100 flex items-center gap-2.5">
            <button
              type="button"
              id="btn-accordion-competitions"
              onClick={() => onNavigateToTab("competitions")}
              className={`flex-1 py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold text-center transition cursor-pointer shadow-2xs truncate ${
                activeTab === "competitions"
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-blue-600"
              }`}
            >
              مباريات
            </button>

            <button
              type="button"
              id="btn-accordion-orientation"
              onClick={() => onNavigateToTab("orientation")}
              className={`flex-1 py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold text-center transition cursor-pointer shadow-2xs truncate ${
                activeTab === "orientation"
                  ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-purple-600"
              }`}
            >
              توجيه
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
