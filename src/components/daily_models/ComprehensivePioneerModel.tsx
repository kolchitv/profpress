import React, { useState } from "react";
import {
  Printer,
  Edit3,
  RotateCcw,
  Sparkles,
  BookOpen,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Users,
  Building2,
  GraduationCap,
  Clock,
  Sparkle,
} from "lucide-react";
import { TeacherProfile } from "../../types";
import {
  PIONEER_NEW_REGULATIONS,
  CLASSROOM_REGULATIONS,
  SCHOOL_HOLIDAYS_TABLE,
} from "../../data/dailyLogData";

interface ComprehensivePioneerModelProps {
  teacherProfile: TeacherProfile;
}

export const ComprehensivePioneerModel: React.FC<ComprehensivePioneerModelProps> = ({ teacherProfile }) => {
  const [activeTab, setActiveTab] = useState<
    "regulations" | "anthem" | "regulations_charter" | "holidays" | "calendar" | "presentation" | "school_card"
  >("regulations");
  const [schoolYear, setSchoolYear] = useState("2026/2027");

  return (
    <div className="space-y-6" dir="rtl">
      {/* Top Banner */}
      <div className="no-print bg-white rounded-2xl p-4 md:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs px-2.5 py-0.5 rounded-full">
              النموذج 3 • الدفتر المرجعي الشامل
            </span>
            <span className="text-xs text-slate-500 font-semibold">الموسم الدراسي {schoolYear}</span>
          </div>
          <h2 className="text-lg md:text-xl font-black text-slate-900 font-cairo mt-1">
            دفتر المذكرة اليومية الشامل بالمدرسة الرائدة (نموذج المثمر 2026-2027)
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            يضم مستجدات الريادة الـ 18، النشيد الوطني، ميثاق الفصل وحقوق وواجبات المدرس والمتعلم، لائحة العطل، واليومية المدرسية.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs md:text-sm flex items-center gap-2 shadow-sm cursor-pointer transition"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة الصفحة الحالية A4</span>
          </button>
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="no-print flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 text-xs">
        <button
          onClick={() => setActiveTab("regulations")}
          className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition cursor-pointer ${
            activeTab === "regulations"
              ? "bg-emerald-800 text-white shadow-xs"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          مستجدات المدرسة الرائدة (18 مستجداً)
        </button>

        <button
          onClick={() => setActiveTab("regulations_charter")}
          className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition cursor-pointer ${
            activeTab === "regulations_charter"
              ? "bg-emerald-800 text-white shadow-xs"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          القانون الداخلي للفصل (حقوق وواجبات)
        </button>

        <button
          onClick={() => setActiveTab("anthem")}
          className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition cursor-pointer ${
            activeTab === "anthem"
              ? "bg-emerald-800 text-white shadow-xs"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          النشيد الوطني المغربي
        </button>

        <button
          onClick={() => setActiveTab("holidays")}
          className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition cursor-pointer ${
            activeTab === "holidays"
              ? "bg-emerald-800 text-white shadow-xs"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          لائحة العطل المدرسية
        </button>

        <button
          onClick={() => setActiveTab("school_card")}
          className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition cursor-pointer ${
            activeTab === "school_card"
              ? "bg-emerald-800 text-white shadow-xs"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          بطاقة تعريفية عن المؤسسة
        </button>

        <button
          onClick={() => setActiveTab("presentation")}
          className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition cursor-pointer ${
            activeTab === "presentation"
              ? "bg-emerald-800 text-white shadow-xs"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          تقديم المذكرة والخاتمة
        </button>
      </div>

      {/* Render Active View */}
      <div className="print-sheet bg-white w-full max-w-[794px] mx-auto min-h-[1123px] p-6 md:p-8 rounded-2xl shadow-xl border border-slate-300 text-slate-900 font-cairo flex flex-col justify-between">
        {/* TAB 1: المستجدات الـ 18 */}
        {activeTab === "regulations" && (
          <div className="space-y-4">
            <div className="text-center space-y-1 pb-2 border-b border-slate-200">
              <h1 className="text-2xl font-black text-slate-950 font-serif">
                مستجدات المدرسة الرائدة
              </h1>
              <div className="inline-block bg-slate-900 text-amber-300 px-4 py-0.5 rounded-full text-xs font-bold">
                الموسم الدراسي: {schoolYear}
              </div>
            </div>

            <div className="space-y-4 pt-1">
              {PIONEER_NEW_REGULATIONS.map((group, gIdx) => (
                <div key={gIdx} className="border-2 border-slate-900 rounded-xl overflow-hidden text-xs">
                  <div className="bg-slate-900 text-white font-black py-1 px-3 text-center">
                    {group.category}
                  </div>

                  <div className="p-2.5 bg-slate-50 space-y-2">
                    {group.items.map((item) => (
                      <div key={item.id} className="flex items-start gap-2 bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                        <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                          {item.id}
                        </span>
                        <p className="text-[11px] text-slate-800 leading-relaxed font-medium">
                          {item.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center py-2 text-xs font-black text-emerald-900 border-t border-slate-200">
              معاً من أجل مدرسة ذات جودة للجميع
            </div>
          </div>
        )}

        {/* TAB 2: القانون الداخلي للفصل */}
        {activeTab === "regulations_charter" && (
          <div className="space-y-4">
            <div className="text-center space-y-1 pb-2">
              <h1 className="text-2xl font-black text-slate-950 font-serif">
                القانون الداخلي للفصل
              </h1>
              <p className="text-xs text-slate-600 font-bold">
                من أجل بيئة تعليمية محفزة، منظمة، قائمة على الاحترام والتعاون
              </p>
            </div>

            {/* Student Section */}
            <div className="border-2 border-slate-900 rounded-xl overflow-hidden text-xs">
              <div className="bg-blue-900 text-white font-black py-1.5 px-3 text-center">
                حقوق وواجبات المتعلم(ة)
              </div>
              <div className="grid grid-cols-2 divide-x divide-x-reverse divide-slate-400">
                {/* Rights */}
                <div className="p-2.5 space-y-1.5 bg-blue-50/30">
                  <div className="font-black text-blue-950 border-b border-blue-200 pb-1 text-center">
                    الحقوق
                  </div>
                  {CLASSROOM_REGULATIONS.student.rights.map((r, i) => (
                    <div key={i} className="flex items-start gap-1 text-[10px] leading-snug text-slate-800">
                      <span className="font-bold text-blue-800 shrink-0">{i + 1}.</span>
                      <span>{r}</span>
                    </div>
                  ))}
                </div>

                {/* Duties */}
                <div className="p-2.5 space-y-1.5 bg-white">
                  <div className="font-black text-blue-950 border-b border-slate-200 pb-1 text-center">
                    الواجبات
                  </div>
                  {CLASSROOM_REGULATIONS.student.duties.map((d, i) => (
                    <div key={i} className="flex items-start gap-1 text-[10px] leading-snug text-slate-800">
                      <span className="font-bold text-slate-800 shrink-0">{i + 1}.</span>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Teacher Section */}
            <div className="border-2 border-slate-900 rounded-xl overflow-hidden text-xs">
              <div className="bg-emerald-900 text-white font-black py-1.5 px-3 text-center">
                حقوق وواجبات المدرس(ة)
              </div>
              <div className="grid grid-cols-2 divide-x divide-x-reverse divide-slate-400">
                {/* Rights */}
                <div className="p-2.5 space-y-1.5 bg-emerald-50/30">
                  <div className="font-black text-emerald-950 border-b border-emerald-200 pb-1 text-center">
                    الحقوق
                  </div>
                  {CLASSROOM_REGULATIONS.teacher.rights.map((r, i) => (
                    <div key={i} className="flex items-start gap-1 text-[10px] leading-snug text-slate-800">
                      <span className="font-bold text-emerald-800 shrink-0">{i + 1}.</span>
                      <span>{r}</span>
                    </div>
                  ))}
                </div>

                {/* Duties */}
                <div className="p-2.5 space-y-1.5 bg-white">
                  <div className="font-black text-emerald-950 border-b border-slate-200 pb-1 text-center">
                    الواجبات
                  </div>
                  {CLASSROOM_REGULATIONS.teacher.duties.map((d, i) => (
                    <div key={i} className="flex items-start gap-1 text-[10px] leading-snug text-slate-800">
                      <span className="font-bold text-slate-800 shrink-0">{i + 1}.</span>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Notice Footer */}
            <div className="bg-amber-50 border border-amber-200 p-2 rounded-xl text-[10px] text-amber-950 leading-relaxed text-center font-medium">
              يعتبر القانون الداخلي مرجعاً تربوياً لتنظيم العلاقة بين الأستاذ والمتعلم، ويهدف إلى خلق بيئة تعليمية يسودها الاحترام، التعاون، والمسؤولية المشتركة.
            </div>
          </div>
        )}

        {/* TAB 3: النشيد الوطني المغربي */}
        {activeTab === "anthem" && (
          <div className="space-y-6 text-center my-auto py-8">
            <div className="w-16 h-16 mx-auto flex items-center justify-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Coat_of_arms_of_Morocco.svg/180px-Coat_of_arms_of_Morocco.svg.png"
                alt="شعار المملكة"
                className="w-14 h-14 object-contain drop-shadow-sm"
                referrerPolicy="no-referrer"
              />
            </div>

            <h1 className="text-3xl md:text-4xl font-black font-serif text-slate-950 tracking-wider">
              النشـيد الوطنـي
            </h1>

            <div className="space-y-4 max-w-lg mx-auto text-base md:text-lg font-bold font-serif leading-loose text-slate-900 border-y-2 border-slate-900 py-6">
              <div className="flex justify-between px-4">
                <span>مَـنْـبِـتَ الأَحْـرَار</span>
                <span>مَـشْـرِقَ الأَنْـوَار</span>
              </div>
              <div className="flex justify-between px-4">
                <span>مُـنْـتَـدَى السُّـؤْدَدِ وَحِـمَـاه</span>
                <span>دُمْـتَ مُـنْـتَـدَاهُ وَحِـمَـاه</span>
              </div>
              <div className="flex justify-between px-4">
                <span>عِـشْـتَ فِـي الأَوْطَـان</span>
                <span>لِـلْـعُـلَى عُـنْـوَان</span>
              </div>
              <div className="flex justify-between px-4">
                <span>مِـلْءَ كُـلِّ جَـنَـان</span>
                <span>ذِكْـرَى كُـلِّ لِـسَـان</span>
              </div>
              <div className="flex justify-between px-4">
                <span>بِـالـرُّوحِ بِـالْـجَـسَـد</span>
                <span>هَـبَّ فَـتَـاكَ لِـبِـنِـدَاك</span>
              </div>
              <div className="flex justify-between px-4">
                <span>فِي فَمِي وَفِي دَمِي</span>
                <span>هَـوَاكَ ثَـارَ نُـور وَنَـار</span>
              </div>
              <div className="flex justify-between px-4">
                <span>إِخْـوَتِـي هَـيَّـا</span>
                <span>لِـلْـعُـلَى سَـعْـيَـا</span>
              </div>
              <div className="flex justify-between px-4">
                <span>نُـشْـهِـدِ الدُّنْـيَـا</span>
                <span>أَنَّ هُـنَـا نَـحْـيَـا</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="text-sm font-bold text-slate-700">بـشـعـار:</div>
              <div className="text-2xl font-black text-slate-950 font-serif tracking-widest flex items-center justify-center gap-6">
                <span>الله</span>
                <span>•</span>
                <span>الـوطـن</span>
                <span>•</span>
                <span>المـلـك</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: لائحة العطل المدرسية */}
        {activeTab === "holidays" && (
          <div className="space-y-4">
            <div className="text-center space-y-1 pb-2 border-b border-slate-200">
              <h1 className="text-2xl font-black text-slate-950 font-serif">
                لائحة العطل المدرسية
              </h1>
              <div className="inline-block bg-slate-900 text-amber-300 px-4 py-0.5 rounded-full text-xs font-bold">
                الموسم الدراسي {schoolYear}
              </div>
            </div>

            <div className="border-2 border-slate-900 rounded-xl overflow-hidden text-xs">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white font-black text-center text-[11px]">
                    <th className="py-2 px-2 border-l border-slate-700 w-24">الأسدوس</th>
                    <th className="py-2 px-3 border-l border-slate-700 text-right">العطلة المدرسية</th>
                    <th className="py-2 px-3 border-l border-slate-700 text-center">تاريخها</th>
                    <th className="py-2 px-2 text-center w-24">المدة</th>
                  </tr>
                </thead>
                <tbody>
                  {SCHOOL_HOLIDAYS_TABLE.map((h, i) => (
                    <tr key={i} className="border-b border-slate-300 hover:bg-slate-50 text-[11px]">
                      <td className="p-2 border-l border-slate-300 text-center font-bold text-slate-700 bg-slate-50/50">
                        {h.semester}
                      </td>
                      <td className="p-2 border-l border-slate-300 font-bold text-slate-900">
                        {h.title}
                      </td>
                      <td className="p-2 border-l border-slate-300 text-center text-slate-700 font-mono text-[10px]">
                        {h.dates}
                      </td>
                      <td className="p-2 text-center font-bold text-emerald-800 bg-emerald-50/20">
                        {h.days}
                      </td>
                    </tr>
                  ))}
                  {/* Totals */}
                  <tr className="bg-amber-100 font-bold border-b border-slate-900 text-[11px]">
                    <td colSpan={3} className="p-2 border-l border-slate-900 text-right text-amber-950">
                      مجموع أيام العطل باحتساب أيام الآحاد :
                    </td>
                    <td className="p-2 text-center font-black text-amber-950">54 أو 55 يوماً</td>
                  </tr>
                  <tr className="bg-amber-50 font-bold text-[11px]">
                    <td colSpan={3} className="p-2 border-l border-slate-900 text-right text-amber-900">
                      مجموع أيام العطل دون احتساب أيام الآحاد :
                    </td>
                    <td className="p-2 text-center font-black text-amber-900">44 أو 45 يوماً</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Signatures */}
            <div className="pt-4 grid grid-cols-3 gap-3 text-center text-xs">
              <div className="border border-slate-400 bg-slate-50 rounded-xl p-2 h-16 flex flex-col justify-between">
                <span className="font-bold text-slate-900">توقيع الأستاذ(ة)</span>
                <span className="text-[10px] text-slate-500">{teacherProfile.fullName || "الأستاذ(ة)"}</span>
              </div>
              <div className="border border-slate-400 bg-slate-50 rounded-xl p-2 h-16 flex flex-col justify-between">
                <span className="font-bold text-slate-900">توقيع السيد(ة) المدير(ة)</span>
                <span className="text-[10px] text-slate-500">{teacherProfile.directorName || "إدارة المؤسسة"}</span>
              </div>
              <div className="border border-slate-400 bg-slate-50 rounded-xl p-2 h-16 flex flex-col justify-between">
                <span className="font-bold text-slate-900">توقيع السيد(ة) المفتش(ة)</span>
                <span className="text-[10px] text-slate-500">{teacherProfile.inspectorName || "المواكبة التربوية"}</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: بطاقة المؤسسة */}
        {activeTab === "school_card" && (
          <div className="space-y-4">
            <div className="text-center space-y-1 pb-2 border-b border-slate-200">
              <h1 className="text-2xl font-black text-slate-950 font-serif">
                بطاقة تعريفية عن المؤسسة
              </h1>
              <div className="inline-block bg-slate-900 text-amber-300 px-4 py-0.5 rounded-full text-xs font-bold">
                الموسم الدراسي {schoolYear}
              </div>
            </div>

            <div className="space-y-4 text-xs">
              {/* Section 1 */}
              <div className="border-2 border-slate-900 rounded-xl overflow-hidden">
                <div className="bg-slate-900 text-white font-bold py-1 px-3">
                  ❖ معطيات حول المؤسسة:
                </div>
                <div className="p-3 bg-white grid grid-cols-2 gap-3">
                  <div>الأكاديمية الجهوية: {teacherProfile.academy || "الرباط - سلا - القنيطرة"}</div>
                  <div>المديرية الإقليمية: {teacherProfile.delegation || "الصخيرات تمارة"}</div>
                  <div>اسم المؤسسة: {teacherProfile.school || "مدرسة الريادة الابتدائية"}</div>
                  <div>الجماعة: {teacherProfile.commune || "جماعة تمارة"}</div>
                  <div>رمز المؤسسة: {teacherProfile.schoolCode || "1203948"}</div>
                  <div>نوع المؤسسة والوسط: {teacherProfile.schoolEnvironment || "ابتدائي - حضري"}</div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="border-2 border-slate-900 rounded-xl overflow-hidden">
                <div className="bg-slate-900 text-white font-bold py-1 px-3">
                  ❖ معطيات حول إدارة المؤسسة وهيئة التأطير:
                </div>
                <div className="p-3 bg-white grid grid-cols-2 gap-3">
                  <div>اسم مدير(ة) المؤسسة: {teacherProfile.directorName || "السيد(ة) مدير(ة) المؤسسة"}</div>
                  <div>الهاتف: {teacherProfile.directorPhone || "06XXXXXXXX"}</div>
                  <div>اسم المفتش(ة) المواكب(ة): {teacherProfile.inspectorName || "السيد(ة) المفتش(ة) المواكب(ة)"}</div>
                  <div>البريد الإلكتروني: {teacherProfile.directorEmail || "direction@ecole.ma"}</div>
                </div>
              </div>

              {/* Section 3 */}
              <div className="border-2 border-slate-900 rounded-xl overflow-hidden">
                <div className="bg-slate-900 text-white font-bold py-1 px-3">
                  ❖ معطيات حول بنية المؤسسة ومرافقها:
                </div>
                <div className="p-3 bg-white grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                  <div className="border rounded p-1.5 bg-slate-50">عدد الحجرات: 12</div>
                  <div className="border rounded p-1.5 bg-slate-50">أطر التدريس: 16</div>
                  <div className="border rounded p-1.5 bg-slate-50">المرافق الإدارية: 03</div>
                  <div className="border rounded p-1.5 bg-slate-50">الأطر الإدارية: 02</div>
                  <div className="border rounded p-1.5 bg-slate-50">حجرات التعليم الأولي: 02</div>
                  <div className="border rounded p-1.5 bg-slate-50">حراس الأمن: 02</div>
                  <div className="border rounded p-1.5 bg-slate-50">المكلفون بالنظافة: 02</div>
                  <div className="border rounded p-1.5 bg-slate-50">الإطعام المدرسي: متوفر</div>
                  <div className="border rounded p-1.5 bg-slate-50">الأندية التربوية: 04</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: التقديم والخاتمة */}
        {activeTab === "presentation" && (
          <div className="space-y-6 my-auto text-slate-800 leading-relaxed text-xs md:text-sm">
            <div className="text-center space-y-1 pb-2 border-b border-slate-200">
              <h1 className="text-2xl font-black text-slate-950 font-serif">
                تــقــديــم
              </h1>
              <div className="text-xs text-slate-500 font-bold">أستاذي(تي) الفاضل(ة)</div>
            </div>

            <p className="text-justify font-medium">
              تُعدّ المذكرة اليومية وثيقة تربوية أساسية لتنظيم العمل الصفي وتوثيقه؛ إذ تُمكّن الأستاذ(ة) من تخطيط الأنشطة التعليمية، وضبط مراحل إنجازها، وتدبير الزمن المدرسي بما ينسجم مع الأهداف المقررة وحاجات المتعلمين ووتيرة تقدمهم. كما تسهم في تحقيق الانسجام بين التخطيط السنوي، المرحلي، واليومي.
            </p>

            <p className="text-justify font-medium">
              وقد أُعِدّت هذه المذكرة للموسم الدراسي 2026-2027 بما يلائم خصوصيات العمل التربوي داخل مؤسسات الريادة، ويراعي المستجدات التنظيمية والبيداغوجية المعتمدة في تنزيل برنامجها، وتغطي فترتي دعم التعلمات الأساس والتدريس الصريح.
            </p>

            <div className="border-t-2 border-slate-900 pt-6 text-center space-y-2">
              <h2 className="text-xl font-black text-slate-950 font-serif">خـاتـمـة</h2>
              <p className="text-xs text-slate-700 italic max-w-lg mx-auto leading-relaxed">
                «في خضم مساركم المهني، حيث تتقاطع المسؤولية بالرسالة، تظل المذكرة اليومية مرآة تعكس نبض الفصل وجهد الأستاذ... نسأل الله أن يبارك جهودكم في خدمة الناشئة وبناء مدرسة النجاح».
              </p>
              <div className="font-bold text-slate-900 pt-2 text-xs">والله ولي التوفيق</div>
            </div>
          </div>
        )}

        {/* Universal Footer for the Sheet */}
        <div className="pt-3 border-t border-slate-300 mt-4 flex items-center justify-between text-[10px] text-slate-500 font-mono">
          <span>المذكرة اليومية بالمدرسة الرائدة • نموذج المثمر</span>
          <span>الموسم الدراسي {schoolYear}</span>
        </div>
      </div>
    </div>
  );
};
