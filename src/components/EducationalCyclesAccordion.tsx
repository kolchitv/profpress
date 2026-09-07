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
} from "lucide-react";
import { TabKey, GradeLevelId } from "../types";

interface EducationalCyclesAccordionProps {
  onNavigateToTab: (tab: TabKey) => void;
  activeTab?: TabKey;
  className?: string;
  defaultExpandedAll?: boolean;
}

export const EducationalCyclesAccordion: React.FC<EducationalCyclesAccordionProps> = ({
  onNavigateToTab,
  activeTab,
  className = "",
  defaultExpandedAll = true,
}) => {
  // State for which cycles are expanded (default all open, or open individually)
  const [isPrimaryOpen, setIsPrimaryOpen] = useState(true);
  const [isMiddleOpen, setIsMiddleOpen] = useState(true);
  const [isHighOpen, setIsHighOpen] = useState(true);

  // Primary sub-items (in 2-column format matching screenshot)
  // Screenshot order:
  // Right col: الأول ابتدائي, الثالث ابتدائي, الخامس ابتدائي
  // Left col: الثاني ابتدائي, الرابع ابتدائي, السادس ابتدائي
  const primaryPairs: { right: { id: GradeLevelId; label: string }; left: { id: GradeLevelId; label: string } }[] = [
    {
      right: { id: "primary_1", label: "الأول ابتدائي" },
      left: { id: "primary_2", label: "الثاني ابتدائي" },
    },
    {
      right: { id: "primary_3", label: "الثالث ابتدائي" },
      left: { id: "primary_4", label: "الرابع ابتدائي" },
    },
    {
      right: { id: "primary_5", label: "الخامس ابتدائي" },
      left: { id: "primary_6", label: "السادس ابتدائي" },
    },
  ];

  // Middle sub-items matching screenshot
  const middleItems: { id: GradeLevelId; label: string }[] = [
    { id: "middle_1", label: "الأولى ثانوي إعدادي" },
    { id: "middle_2", label: "الثانية ثانوي إعدادي" },
    { id: "middle_3", label: "الثالثة ثانوي إعدادي" },
  ];

  // High sub-items matching screenshot
  const highItems: { id: GradeLevelId; label: string }[] = [
    { id: "high_common", label: "الجذع المشترك" },
    { id: "high_1bac", label: "الأولى باكالوريا" },
    { id: "high_2bac", label: "الثانية باكالوريا" },
  ];

  return (
    <div
      className={`bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden flex flex-col font-cairo select-none ${className}`}
      id="educational-cycles-menu-container"
    >
      {/* 1. التعليم الابتدائي */}
      <div className="border-b border-slate-100 last:border-b-0">
        <button
          type="button"
          id="accordion-header-primary"
          onClick={() => setIsPrimaryOpen((prev) => !prev)}
          className="w-full flex items-center justify-between px-5 py-3.5 bg-blue-50/70 hover:bg-blue-100/60 transition cursor-pointer text-right group"
          aria-expanded={isPrimaryOpen}
        >
          {/* Chevron on the far left (in RTL) */}
          <div className="text-blue-600 transition-transform duration-200">
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-200 ${
                isPrimaryOpen ? "rotate-0 text-blue-600" : "-rotate-90 text-blue-400"
              }`}
            />
          </div>

          {/* Title & Icon on the right */}
          <div className="flex items-center gap-2.5">
            <span className="text-base font-black text-blue-600 tracking-tight">
              التعليم الابتدائي
            </span>
            <User className="w-5 h-5 text-blue-600 stroke-[2.5]" />
          </div>
        </button>

        {/* Primary Sub-Items (2-Column Grid matching Screenshot) */}
        {isPrimaryOpen && (
          <div className="bg-white px-5 py-3 animate-fadeIn divide-y divide-slate-100/80">
            {primaryPairs.map((pair, idx) => (
              <div key={idx} className="grid grid-cols-2 py-2.5 first:pt-1 last:pb-1 text-sm text-slate-700">
                {/* Right Column: First, Third, Fifth */}
                <button
                  type="button"
                  id={`btn-branch-${pair.right.id}`}
                  onClick={() => onNavigateToTab(pair.right.id as TabKey)}
                  className={`text-right py-1 px-2 rounded-lg transition-all cursor-pointer font-bold ${
                    activeTab === pair.right.id
                      ? "text-blue-700 bg-blue-50 font-black"
                      : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                  }`}
                >
                  {pair.right.label}
                </button>

                {/* Left Column: Second, Fourth, Sixth */}
                <button
                  type="button"
                  id={`btn-branch-${pair.left.id}`}
                  onClick={() => onNavigateToTab(pair.left.id as TabKey)}
                  className={`text-right py-1 px-2 rounded-lg transition-all cursor-pointer font-bold ${
                    activeTab === pair.left.id
                      ? "text-blue-700 bg-blue-50 font-black"
                      : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                  }`}
                >
                  {pair.left.label}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. التعليم الإعدادي */}
      <div className="border-b border-slate-100 last:border-b-0">
        <button
          type="button"
          id="accordion-header-middle"
          onClick={() => setIsMiddleOpen((prev) => !prev)}
          className="w-full flex items-center justify-between px-5 py-3.5 bg-emerald-50/70 hover:bg-emerald-100/60 transition cursor-pointer text-right group"
          aria-expanded={isMiddleOpen}
        >
          {/* Chevron on the far left */}
          <div className="text-emerald-600 transition-transform duration-200">
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-200 ${
                isMiddleOpen ? "rotate-0 text-emerald-600" : "-rotate-90 text-emerald-400"
              }`}
            />
          </div>

          {/* Title & Icon on the right */}
          <div className="flex items-center gap-2.5">
            <span className="text-base font-black text-emerald-600 tracking-tight">
              التعليم الإعدادي
            </span>
            <School className="w-5 h-5 text-emerald-600 stroke-[2.5]" />
          </div>
        </button>

        {/* Middle Sub-Items matching Screenshot */}
        {isMiddleOpen && (
          <div className="bg-white px-5 py-3 animate-fadeIn divide-y divide-slate-100/80">
            {middleItems.map((item) => (
              <div key={item.id} className="py-2 first:pt-1 last:pb-1">
                <button
                  type="button"
                  id={`btn-branch-${item.id}`}
                  onClick={() => onNavigateToTab(item.id as TabKey)}
                  className={`w-full text-right py-1.5 px-2 rounded-lg transition-all cursor-pointer font-bold text-sm ${
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

      {/* 3. التعليم الثانوي */}
      <div className="border-b border-slate-100 last:border-b-0">
        <button
          type="button"
          id="accordion-header-high"
          onClick={() => setIsHighOpen((prev) => !prev)}
          className="w-full flex items-center justify-between px-5 py-3.5 bg-purple-50/70 hover:bg-purple-100/60 transition cursor-pointer text-right group"
          aria-expanded={isHighOpen}
        >
          {/* Chevron on the far left */}
          <div className="text-purple-600 transition-transform duration-200">
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-200 ${
                isHighOpen ? "rotate-0 text-purple-600" : "-rotate-90 text-purple-400"
              }`}
            />
          </div>

          {/* Title & Icon on the right */}
          <div className="flex items-center gap-2.5">
            <span className="text-base font-black text-purple-600 tracking-tight">
              التعليم الثانوي
            </span>
            <GraduationCap className="w-5 h-5 text-purple-600 stroke-[2.5]" />
          </div>
        </button>

        {/* High Sub-Items matching Screenshot */}
        {isHighOpen && (
          <div className="bg-white px-5 py-3 animate-fadeIn divide-y divide-slate-100/80">
            {highItems.map((item) => (
              <div key={item.id} className="py-2 first:pt-1 last:pb-1">
                <button
                  type="button"
                  id={`btn-branch-${item.id}`}
                  onClick={() => onNavigateToTab(item.id as TabKey)}
                  className={`w-full text-right py-1.5 px-2 rounded-lg transition-all cursor-pointer font-bold text-sm ${
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

      {/* 4. Bottom Action Buttons: مباريات | توجيه (Matching Screenshot) */}
      <div className="p-3 bg-slate-50/60 border-t border-slate-100 flex items-center gap-2.5">
        {/* Right Button: مباريات */}
        <button
          type="button"
          id="btn-accordion-competitions"
          onClick={() => onNavigateToTab("competitions")}
          className={`flex-1 py-2.5 px-3 rounded-xl border text-sm font-bold text-center transition cursor-pointer shadow-2xs ${
            activeTab === "competitions"
              ? "bg-blue-600 text-white border-blue-600 shadow-sm"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-blue-600 hover:border-slate-300"
          }`}
        >
          مباريات
        </button>

        {/* Left Button: توجيه */}
        <button
          type="button"
          id="btn-accordion-orientation"
          onClick={() => onNavigateToTab("orientation")}
          className={`flex-1 py-2.5 px-3 rounded-xl border text-sm font-bold text-center transition cursor-pointer shadow-2xs ${
            activeTab === "orientation"
              ? "bg-purple-600 text-white border-purple-600 shadow-sm"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-purple-600 hover:border-slate-300"
          }`}
        >
          توجيه
        </button>
      </div>
    </div>
  );
};
