import React, { useRef, useState } from "react";
import {
  UserCheck,
  Calendar,
  ExternalLink,
  RotateCcw,
  Printer,
  Sparkles,
  Info,
  CheckCircle2,
  Clock,
  PieChart,
  Save,
  Download,
  Users,
} from "lucide-react";
import { TeacherProfile } from "../types";

interface AttendanceRegisterHubProps {
  teacherProfile?: TeacherProfile;
}

export const AttendanceRegisterHub: React.FC<AttendanceRegisterHubProps> = ({
  teacherProfile,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeKey, setIframeKey] = useState(0);

  const handleRefresh = () => {
    setIframeKey((prev) => prev + 1);
  };

  const handleOpenNewWindow = () => {
    window.open("/registreile.html", "_blank");
  };

  const handlePrint = () => {
    try {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.focus();
        iframeRef.current.contentWindow.print();
      } else {
        window.open("/registreile.html", "_blank");
      }
    } catch {
      window.open("/registreile.html", "_blank");
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-emerald-900/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-emerald-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                تطبيق تفاعلي وإحصائي معتمد
              </span>
              <span className="text-xs text-emerald-200">
                مؤسسات الريادة والتعليم الابتدائي • نظام 4 أيام / الأسبوع
              </span>
              {teacherProfile?.fullNameAr && (
                <>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-emerald-300">
                    الأستاذ(ة): {teacherProfile.fullNameAr}
                  </span>
                </>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-black font-cairo text-white flex items-center gap-2.5">
              <UserCheck className="w-8 h-8 text-emerald-400" />
              <span>سجل حضور وغياب التلاميذ (نظام 4 أيام/الأسبوع)</span>
            </h1>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              سجل رقمي تفاعلي متقدم مصمم خصيصاً للمؤسسات التعليمية وفصول الدعم المكثف التي تعتمد صيغة التوقيت الأسبوعي لـ 4 أيام. يتيح تتبع ومسك الحضور اليومي، احتساب إجمالي الغيابات شهرياً، تمثيل نسب الذكور والإناث عبر مبيان تفاعلي، والحفظ التلقائي في المتصفح مع الطباعة المباشرة بصيغة A4.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap lg:flex-col gap-2 shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleOpenNewWindow}
              className="flex-1 sm:flex-initial bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>فتح بنافذة كاملة مستقلة</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 sm:flex-initial bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة السجل (A4)</span>
            </button>

            <button
              type="button"
              onClick={handleRefresh}
              className="flex-1 sm:flex-initial bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-2 border border-slate-700 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة تحميل التطبيق</span>
            </button>
          </div>
        </div>

        {/* Quick Legend & Instructions */}
        <div className="mt-6 pt-4 border-t border-emerald-800/40 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-emerald-900/40 border border-emerald-700/50 rounded-xl p-2.5 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 font-black flex items-center justify-center text-sm border border-emerald-500/40">
              P
            </span>
            <div>
              <div className="font-bold text-white">حاضر (Présent)</div>
              <div className="text-[10px] text-emerald-300">حضور التلميذ للحصة</div>
            </div>
          </div>

          <div className="bg-red-950/40 border border-red-800/50 rounded-xl p-2.5 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-red-500/20 text-red-300 font-black flex items-center justify-center text-sm border border-red-500/40">
              |
            </span>
            <div>
              <div className="font-bold text-white">غائب (Absent)</div>
              <div className="text-[10px] text-red-300">غياب غير مبرر</div>
            </div>
          </div>

          <div className="bg-amber-950/40 border border-amber-800/50 rounded-xl p-2.5 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 font-black flex items-center justify-center text-sm border border-amber-500/40">
              -
            </span>
            <div>
              <div className="font-bold text-white">تأخر (Retard)</div>
              <div className="text-[10px] text-amber-300">تأخر عن موعد الحصة</div>
            </div>
          </div>

          <div className="bg-blue-950/40 border border-blue-800/50 rounded-xl p-2.5 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-300 font-black flex items-center justify-center text-sm border border-blue-500/40">
              +
            </span>
            <div>
              <div className="font-bold text-white">مبرر (Excusé)</div>
              <div className="text-[10px] text-blue-300">غياب بمبرر أو شهادة</div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights Pills */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-800">4 أيام بالأسبوع</div>
            <div className="text-slate-500 text-[11px]">مؤسسات الريادة والوسط القروي</div>
          </div>
        </div>

        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <PieChart className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-800">مبيان إحصائي فوري</div>
            <div className="text-slate-500 text-[11px]">توزيع الذكور والإناث والغياب</div>
          </div>
        </div>

        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <Save className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-800">حفظ تلقائي محلي</div>
            <div className="text-slate-500 text-[11px]">بياناتك محفوظة بأمان على جهازك</div>
          </div>
        </div>

        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <Printer className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-800">تصدير وطباعة A4</div>
            <div className="text-slate-500 text-[11px]">ملاءمة تامة للطباعة والمصادقة</div>
          </div>
        </div>
      </div>

      {/* Embedded Interactive Application Frame */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-100/90 border-b border-slate-200 px-4 py-3 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-700 font-bold">
            <Users className="w-4 h-4 text-emerald-600" />
            <span>نافذة التطبيق التفاعلي المباشر: سجل الحضور والغياب</span>
            <span className="hidden sm:inline-block bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded-full">
              جاهز للاستخدام الفوري
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleRefresh}
              className="text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 shadow-2xs"
              title="إعادة تحميل واجهة التطبيق"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">تحديث</span>
            </button>
            <button
              type="button"
              onClick={handleOpenNewWindow}
              className="text-blue-700 hover:text-blue-900 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 shadow-2xs"
              title="فتح في لسان جديد بملء الشاشة"
            >
              <ExternalLink className="w-3 h-3" />
              <span>ملء الشاشة</span>
            </button>
          </div>
        </div>

        <div className="w-full bg-slate-50">
          <iframe
            key={iframeKey}
            ref={iframeRef}
            src="/registreile.html"
            title="سجل حضور وغياب التلاميذ (نظام 4 أيام/الأسبوع)"
            className="w-full min-h-[850px] md:min-h-[950px] border-0"
          />
        </div>
      </div>
    </div>
  );
};
