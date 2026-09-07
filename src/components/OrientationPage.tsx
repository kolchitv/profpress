import React, { useState } from "react";
import {
  Compass,
  ArrowRight,
  GraduationCap,
  School,
  CheckCircle2,
  FileText,
  Search,
  BookOpen,
  Award,
  Sparkles,
  ExternalLink,
  ChevronLeft,
} from "lucide-react";
import { TabKey } from "../types";
import { ORIENTATION_GUIDE_DATA } from "../data/educationalLevelsData";

interface OrientationPageProps {
  onNavigateToTab: (tab: TabKey) => void;
}

export const OrientationPage: React.FC<OrientationPageProps> = ({ onNavigateToTab }) => {
  const [activeSection, setActiveSection] = useState<string>("post-3ac");
  const [thresholdSearch, setThresholdSearch] = useState("");

  const filteredThresholds = ORIENTATION_GUIDE_DATA.thresholds.filter(
    (t) =>
      t.schoolName.includes(thresholdSearch) ||
      t.category.includes(thresholdSearch) ||
      t.city.includes(thresholdSearch) ||
      t.bacTypes.includes(thresholdSearch)
  );

  return (
    <div className="space-y-6 animate-fadeIn pb-16 font-cairo">
      {/* 1. Breadcrumbs */}
      <div className="flex items-center justify-between bg-white border border-slate-200/90 rounded-2xl px-4 py-3 shadow-2xs">
        <div className="flex items-center gap-2 text-xs md:text-sm text-slate-600 font-bold">
          <button
            type="button"
            onClick={() => onNavigateToTab("home")}
            className="hover:text-blue-600 transition cursor-pointer"
          >
            الرئيسية
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-purple-900 font-black">فضاء التوجيه المدرسي والمهني والجامعي</span>
        </div>

        <button
          type="button"
          onClick={() => onNavigateToTab("home")}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-purple-700 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 transition cursor-pointer"
        >
          <span>العودة للرئيسية</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. Hero Header */}
      <div className="bg-gradient-to-l from-purple-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-300" />
              <span>دليل المستشار في التوجيه والتخطيط التربوي COPE</span>
            </span>
            <span className="bg-amber-400 text-slate-950 text-xs px-3 py-1 rounded-full font-black">
              2026/2027
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-black text-white">
            {ORIENTATION_GUIDE_DATA.title}
          </h1>

          <p className="text-purple-200 text-sm md:text-base leading-relaxed">
            {ORIENTATION_GUIDE_DATA.subtitle}
          </p>
        </div>
      </div>

      {/* 3. Navigation Tabs between Major Milestones */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {ORIENTATION_GUIDE_DATA.sections.map((sec) => {
          const isSelected = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveSection(sec.id)}
              className={`p-4 rounded-2xl border text-right transition cursor-pointer flex flex-col justify-between gap-2 shadow-2xs ${
                isSelected
                  ? "bg-purple-600 text-white border-purple-600 shadow-md"
                  : "bg-white text-slate-800 border-slate-200 hover:bg-purple-50/50 hover:border-purple-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-0.5 rounded-md font-bold ${isSelected ? "bg-white/20 text-white" : "bg-purple-100 text-purple-800"}`}>
                  {sec.targetAudience}
                </span>
                <Compass className={`w-4 h-4 ${isSelected ? "text-amber-300" : "text-purple-600"}`} />
              </div>
              <h3 className="text-sm font-black mt-1">{sec.title}</h3>
            </button>
          );
        })}
      </div>

      {/* 4. Active Section Content */}
      {ORIENTATION_GUIDE_DATA.sections
        .filter((sec) => sec.id === activeSection)
        .map((sec) => (
          <div key={sec.id} className="space-y-4">
            {/* Highlights Box */}
            <div className="bg-purple-50/80 border border-purple-200 rounded-2xl p-5 space-y-3">
              <h3 className="text-base font-black text-purple-950 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-700" />
                <span>المحددات البيداغوجية ومسطرة مسار لـ: {sec.title}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {sec.highlights.map((h, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-xl border border-purple-100 text-xs text-slate-700 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Options Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sec.options.map((opt, oIdx) => (
                <div
                  key={oIdx}
                  className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-3 flex flex-col justify-between hover:shadow-md transition"
                >
                  <div className="space-y-2">
                    <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                      {oIdx + 1}
                    </div>
                    <h4 className="text-base font-black text-slate-900">{opt.name}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{opt.description}</p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
                    <div>
                      <span className="font-bold text-slate-700 block mb-0.5">المؤهلات والشروط:</span>
                      <span className="text-slate-600">{opt.requirements}</span>
                    </div>
                    <div>
                      <span className="font-bold text-purple-700 block mb-0.5">الآفاق والمسارات:</span>
                      <span className="text-slate-600">{opt.futurePerspectives}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

      {/* 5. Grandes Écoles & Higher Education Thresholds Catalog */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-purple-700" />
              <span>دليل عتبات الانتقاء الأولي للمدارس العليا والمعاهد بالمغرب</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              مؤشرات تقريبية لعتبات الانتقاء (Seuils de présélection) للمواسم السابقة
            </p>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ابحث عن مدرسة (طب، ENSA، ENCG...)"
              value={thresholdSearch}
              onChange={(e) => setThresholdSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-9 pl-3 py-1.5 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-purple-500 font-cairo"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-700 border-b border-slate-200">
                <th className="p-3 font-bold">المؤسسة / المدرسة</th>
                <th className="p-3 font-bold">المجال</th>
                <th className="p-3 font-bold">المدن والمراكز</th>
                <th className="p-3 font-bold">الشعب المقبولة</th>
                <th className="p-3 font-bold text-center">عتبة الانتقاء التقريبية</th>
                <th className="p-3 font-bold">طريقة الولوج والملاحظات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredThresholds.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition">
                  <td className="p-3 font-black text-slate-900">{item.schoolName}</td>
                  <td className="p-3 text-slate-600">{item.category}</td>
                  <td className="p-3 text-slate-500">{item.city}</td>
                  <td className="p-3 text-purple-700 font-bold">{item.bacTypes}</td>
                  <td className="p-3 text-center">
                    <span className="bg-purple-100 text-purple-900 font-black px-2.5 py-1 rounded-lg font-mono">
                      {item.avgThreshold}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600">{item.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
