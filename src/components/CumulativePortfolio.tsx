import React, { useState } from "react";
import {
  CheckCircle2,
  Circle,
  ExternalLink,
  Printer,
  Sparkles,
  BookOpen,
  Filter,
  Info,
} from "lucide-react";
import { PortfolioComponent, TabKey, TeacherProfile } from "../types";
import { PIONEER_PORTFOLIO_AXES, INITIAL_PORTFOLIO_ITEMS } from "../data/pioneerPortfolioData";

interface CumulativePortfolioProps {
  teacherProfile: TeacherProfile;
  onNavigateToTab?: (tab: TabKey) => void;
}

export const CumulativePortfolio: React.FC<CumulativePortfolioProps> = ({
  teacherProfile,
  onNavigateToTab,
}) => {
  const [items, setItems] = useState<PortfolioComponent[]>(INITIAL_PORTFOLIO_ITEMS);
  const [selectedAxis, setSelectedAxis] = useState<number | "all">("all");
  const [showPrintableIndex, setShowPrintableIndex] = useState(false);

  const toggleItemCompletion = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  const completedCount = items.filter((i) => i.isCompleted).length;
  const totalCount = items.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const filteredItems =
    selectedAxis === "all"
      ? items
      : items.filter((i) => i.axisNumber === selectedAxis);

  return (
    <div className="space-y-6">
      {/* Interactive Controls & Description (Hidden in Print) */}
      <div className="no-print space-y-4">
        {/* Banner */}
        <div className="bg-gradient-to-r from-emerald-900 to-teal-800 text-white rounded-2xl p-5 md:p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-amber-400 text-slate-950 text-xs font-black px-2 py-0.5 rounded-full">
                  المدرسة الرائدة ⭐
                </span>
                <span className="text-emerald-200 text-xs">دليل الوثائق البيداغوجية والإدارية</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold font-cairo">
                الملف التراكمي لأستاذ المدرسة الرائدة (Portfolio)
              </h2>
              <p className="text-xs md:text-sm text-emerald-100/90 max-w-2xl leading-relaxed">
                دليل شامل ومفصل لجميع محاور ومكونات الملف التراكمي الإلزامي لأستاذ مدرسة الريادة وفق توجيهات وزارة التربية الوطنية. يمكنك متابعة وثائقك الجاهزة، تجهيز وطباعة كل وثيقة بنقرة واحدة، وطباعة فهرس وغلاف رسمي للملف.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 min-w-[220px]">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-emerald-100">نسبة الجاهزية العامة:</span>
                <span className="font-black text-amber-300 text-sm">{progressPercent}%</span>
              </div>
              <div className="w-full bg-emerald-950/50 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[11px] text-emerald-200 mt-2">
                <span>{completedCount} من {totalCount} وثيقة جاهزة</span>
                <button
                  id="print-portfolio-index-btn"
                  onClick={() => window.print()}
                  className="bg-amber-400 hover:bg-amber-300 text-slate-900 px-2.5 py-1 rounded font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <Printer className="w-3 h-3" />
                  <span>طباعة الفهرس</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filter by Axis */}
        <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 pl-2 font-medium">
            <Filter className="w-3.5 h-3.5 text-emerald-600" />
            <span>تصفية حسب المحور:</span>
          </div>
          <button
            onClick={() => setSelectedAxis("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
              selectedAxis === "all"
                ? "bg-emerald-700 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            جميع المحاور ({totalCount})
          </button>
          {PIONEER_PORTFOLIO_AXES.map((axis) => {
            const axisCount = items.filter((i) => i.axisNumber === axis.id).length;
            const axisCompleted = items.filter(
              (i) => i.axisNumber === axis.id && i.isCompleted
            ).length;
            return (
              <button
                key={axis.id}
                onClick={() => setSelectedAxis(axis.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                  selectedAxis === axis.id
                    ? "bg-emerald-700 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <span>{axis.title.split(":")[0]}</span>
                <span className="text-[10px] opacity-80">
                  ({axisCompleted}/{axisCount})
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid of Checklist Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`border rounded-xl p-4 transition-all duration-200 flex flex-col justify-between ${
                item.isCompleted
                  ? "bg-emerald-50/40 border-emerald-300/80 shadow-2xs"
                  : "bg-white border-slate-200 hover:border-slate-300"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <button
                      onClick={() => toggleItemCompletion(item.id)}
                      className="mt-0.5 text-emerald-700 hover:text-emerald-800 transition cursor-pointer"
                      title={item.isCompleted ? "تحديد كغير مكتمل" : "تحديد كمكتمل"}
                    >
                      {item.isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-300 hover:text-slate-400" />
                      )}
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-100 px-1.5 py-0.5 rounded">
                          {item.axisTitle.split(":")[0]}
                        </span>
                        {item.requiredForPioneer && (
                          <span className="text-[10px] text-amber-800 font-bold bg-amber-100 px-1.5 py-0.5 rounded">
                            إلزامي للريادة
                          </span>
                        )}
                      </div>
                      <h3
                        className={`text-sm font-bold mt-1 ${
                          item.isCompleted ? "text-emerald-950" : "text-slate-800"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100">
                <span
                  className={`text-[11px] font-semibold ${
                    item.isCompleted ? "text-emerald-700" : "text-slate-400"
                  }`}
                >
                  {item.isCompleted ? "✓ جاهزة ومدرجة بالملف" : "⏳ قيد الإعداد أو التحميل"}
                </span>

                {item.targetToolKey ? (
                  <button
                    onClick={() => onNavigateToTab(item.targetToolKey!)}
                    className="text-xs bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-3 py-1 rounded-md transition flex items-center gap-1 cursor-pointer shadow-2xs"
                  >
                    <span>تجهيز وطباعة</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                ) : (
                  <span className="text-[11px] text-slate-400 italic">
                    مستند صفي / وثيقة خارجية
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official A4 Printable Dossier Index & Cover (Always Styled For Print) */}
      <div className="print-sheet bg-white border border-slate-300 rounded-2xl p-6 md:p-8 shadow-xs max-w-4xl mx-auto">
        <div className="no-print flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-700" />
            <span className="text-sm font-bold text-slate-800">
              معاينة الفهرس الرسمي للملف التراكمي (جاهز للطباعة A4)
            </span>
          </div>
          <button
            onClick={() => window.print()}
            className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>طباعة الفهرس A4</span>
          </button>
        </div>

        {/* Moroccan Official Printable Header */}
        <div className="border-b-2 border-slate-900 pb-3 mb-5">
          <div className="flex justify-center mb-1.5">
            <img
              src="/morocco-ministry-logo.png"
              alt="وزارة التربية الوطنية والتعليم الأولي والرياضة"
              className="h-12 md:h-14 w-auto max-w-full object-contain"
            />
          </div>
          <div className="flex items-center justify-between font-bold text-slate-800 text-[11px] px-1">
            <div className="text-right space-y-0.5">
              <p><span className="text-slate-600 font-medium">الأكاديمية الجهوية للتربية والتكوين :</span> {teacherProfile.academy || "...................................."}</p>
              <p><span className="text-slate-600 font-medium">المديرية الإقليمية :</span> {teacherProfile.directorate || "...................................."}</p>
            </div>
            <div className="text-left space-y-0.5">
              <p><span className="text-slate-600 font-medium">المؤسسة التعليمية :</span> {teacherProfile.institution || "...................................."}</p>
              <p><span className="text-slate-600 font-medium">السنة الدراسية :</span> {teacherProfile.schoolYear || "2026/2027"}</p>
            </div>
          </div>

          <div className="text-center mt-3">
            <h2 className="text-xl md:text-2xl font-black font-cairo text-slate-900">
              فهرس وثائق الملف التراكمي للأستاذ(ة)
            </h2>
            <p className="text-xs font-semibold text-slate-600">
              Le Portfolio de l'Enseignant - Écoles Pionnières
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-200 mt-3 text-right">
            <div><span className="text-slate-500">الأستاذ(ة):</span> <strong className="text-slate-900">{teacherProfile.fullNameAr}</strong></div>
            <div><span className="text-slate-500">رقم التأجير:</span> <strong className="text-slate-900">{teacherProfile.somNumber}</strong></div>
            <div><span className="text-slate-500">المؤسسة:</span> <strong className="text-slate-900">{teacherProfile.institution}</strong></div>
            <div><span className="text-slate-500">المستوى:</span> <strong className="text-slate-900">{teacherProfile.assignedLevel}</strong></div>
          </div>
        </div>

        {/* Printable Index Table */}
        <div className="space-y-6">
          {PIONEER_PORTFOLIO_AXES.map((axis) => {
            const axisItems = items.filter((i) => i.axisNumber === axis.id);
            return (
              <div key={axis.id} className="space-y-2">
                <div className="bg-slate-100 px-3 py-1.5 rounded-md border-r-4 border-emerald-700 flex items-center justify-between">
                  <h3 className="text-xs md:text-sm font-bold text-slate-900">
                    {axis.title}
                  </h3>
                  <span className="text-[11px] text-slate-500">
                    عدد الوثائق: {axisItems.length}
                  </span>
                </div>

                <table className="w-full text-xs text-right border-collapse border border-slate-300">
                  <thead>
                    <tr className="bg-slate-50 text-slate-700">
                      <th className="border border-slate-300 p-2 w-10 text-center">#</th>
                      <th className="border border-slate-300 p-2">اسم الوثيقة ومضمونها</th>
                      <th className="border border-slate-300 p-2 w-28 text-center">النوع</th>
                      <th className="border border-slate-300 p-2 w-24 text-center">حالة الوثيقة</th>
                      <th className="border border-slate-300 p-2 w-32 text-center">ملاحظات والتوقيع</th>
                    </tr>
                  </thead>
                  <tbody>
                    {axisItems.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="border border-slate-300 p-2 text-center font-bold text-slate-600">
                          {idx + 1}
                        </td>
                        <td className="border border-slate-300 p-2">
                          <div className="font-bold text-slate-800">{item.title}</div>
                          <div className="text-[11px] text-slate-500">{item.description}</div>
                        </td>
                        <td className="border border-slate-300 p-2 text-center text-[11px]">
                          {item.requiredForPioneer ? (
                            <span className="text-amber-800 font-bold">إلزامية للريادة</span>
                          ) : (
                            <span className="text-slate-600">تكميلية</span>
                          )}
                        </td>
                        <td className="border border-slate-300 p-2 text-center">
                          {item.isCompleted ? (
                            <span className="font-bold text-emerald-700">مدرجة بالملف</span>
                          ) : (
                            <span className="text-slate-400 font-medium">في طور الإعداد</span>
                          )}
                        </td>
                        <td className="border border-slate-300 p-2 text-center text-slate-400 text-[10px]">
                          ....................
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>

        {/* Official Endorsements & Stamps at the Bottom */}
        <div className="grid grid-cols-3 gap-4 text-center text-xs mt-8 pt-6 border-t-2 border-slate-800">
          <div className="p-3 border border-dashed border-slate-300 rounded-lg min-h-[90px] flex flex-col justify-between">
            <span className="font-bold text-slate-800">توقيع الأستاذ(ة)</span>
            <span className="text-[11px] text-slate-400">حرر بتاريخ: ....................</span>
          </div>
          <div className="p-3 border border-dashed border-slate-300 rounded-lg min-h-[90px] flex flex-col justify-between">
            <span className="font-bold text-slate-800">تأشيرة وخاتم مدير(ة) المؤسسة</span>
            <span className="text-[11px] text-slate-400">بتاريخ: ....................</span>
          </div>
          <div className="p-3 border border-dashed border-slate-300 rounded-lg min-h-[90px] flex flex-col justify-between">
            <span className="font-bold text-slate-800">تأشيرة وتوجيهات المفتش(ة) التربوي(ة)</span>
            <span className="text-[11px] text-slate-400">بتاريخ: ....................</span>
          </div>
        </div>
      </div>
    </div>
  );
};
