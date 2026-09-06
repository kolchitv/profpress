import React, { useState } from "react";
import {
  Sparkles,
  Bot,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  Printer,
  ArrowRight,
  Lightbulb,
} from "lucide-react";
import { TeacherProfile } from "../types";

interface AiPedagogyAssistantProps {
  teacherProfile: TeacherProfile;
}

export const AiPedagogyAssistant: React.FC<AiPedagogyAssistantProps> = ({
  teacherProfile,
}) => {
  const [activeTab, setActiveTab] = useState<"remarks" | "remediation">("remarks");

  // State for remarks generator
  const [studentName, setStudentName] = useState("محمد أمين");
  const [studentLevel, setStudentLevel] = useState("المستوى الثالث ابتدائي");
  const [subject, setSubject] = useState("اللغة العربية");
  const [performance, setPerformance] = useState("good");
  const [behavior, setBehavior] = useState("مشارك بنشاط ومهذب داخل الفصل");
  const [remarksList, setRemarksList] = useState<string[]>([]);
  const [isGeneratingRemarks, setIsGeneratingRemarks] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  // State for remediation plan
  const [gapSubject, setGapSubject] = useState("اللغة العربية (القراءة والتهجي)");
  const [obstacle, setObstacle] = useState("صعوبة في الربط بين الحروف المتشابهة رسماً والخلط بين الحركات القصيرة والطويلة");
  const [targetLevel, setTargetLevel] = useState("المستوى الثاني / الثالث ابتدائي");
  const [remediationPlan, setRemediationPlan] = useState<string>("");
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

  // Generate Remarks via backend API or intelligent fallback
  const handleGenerateRemarks = async () => {
    setIsGeneratingRemarks(true);
    try {
      const res = await fetch("/api/generate-remarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName,
          level: studentLevel,
          subject,
          performanceLevel: performance,
          behavior,
        }),
      });
      const data = await res.json();
      if (data.remarks && Array.isArray(data.remarks)) {
        setRemarksList(data.remarks);
      } else {
        setRemarksList([
          `${studentName}: تلميذ نجيب، يظهر اجتهاداً ملحوظاً في ${subject} ومشاركة فعالة، نرجو له دوام التوفيق.`,
          `مستوى حسن جداً، مكتسبات صلبة وتفاعل إيجابي مع أنشطة التعليم الصريح داخل القسم.`,
          `عمل جاد ومواظبة مشرفة، قادر على الارتقاء بمستواه أكثر بمزيد من المطالعة والتمرن الذاتي.`,
        ]);
      }
    } catch (err) {
      // Graceful fallback
      setRemarksList([
        `${studentName}: تلميذ مجتهد وذو سلوك حسن، يتميز في فهم نصوص ${subject}، مع الحاجة للمزيد من التمرن على التعبير الكتابي.`,
        `نتائج مشرفة ومستوى يبعث على الارتياح، استمر في هذا النسق الإيجابي.`,
        `مشاركة صفية متميزة وانضباط مثالي، مع مؤهلات واعدة للتفوق.`,
      ]);
    } finally {
      setIsGeneratingRemarks(false);
    }
  };

  // Generate Remediation Plan via backend API
  const handleGenerateRemediation = async () => {
    setIsGeneratingPlan(true);
    try {
      const res = await fetch("/api/generate-remediation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: gapSubject,
          gapDescription: obstacle,
          level: targetLevel,
        }),
      });
      const data = await res.json();
      if (data.remediationPlan) {
        setRemediationPlan(data.remediationPlan);
      } else {
        setRemediationPlan(getDefaultRemediationText());
      }
    } catch (err) {
      setRemediationPlan(getDefaultRemediationText());
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const getDefaultRemediationText = () => {
    return `### بطاقة المعالجة البيداغوجية المركزة (مقاربة طارل TaRL)
**المادة المستهدفة:** ${gapSubject}
**التعثر المرصود:** ${obstacle}
**المستوى:** ${targetLevel}

#### 1. خطوات التعليم الصريح (Enseignement Explicite):
* **النمذجة ("أنا أفعل" - Je fais):**
  - يقوم الأستاذ بنطق الحروف مع الحركات بصوت واضح مع توظيف الإشارات الجسدية (المصاحبة الحركية للفتحة، الضمة، الكسرة).
  - كتابة المقاطع المتشابهة بألوان مختلفة على السبورة لتسليط الضوء على نقط الاختلاف.

* **الممارسة الموجهة ("نحن نفعل" - Nous faisons):**
  - قراءة ثنائية وجماعية لشبكة المقاطع والحروف المستهدفة (tableau syllabique).
  - لعبة الأصابع أو بطاقات الحروف: يرفع المتعلمون البطاقة المناسبة عند سماع الصوت.

* **الممارسة المستقلة ("أنت تفعل" - Tu fais):**
  - أنشطة فردية على كراسة الدعم: تلوين الحرف المستهدف، وصل المقطع بالصورة، وتركيب كلمات بسيطة.

#### 2. الألعاب والأنشطة الداعمة:
* لعبة "قطار الحروف والمقاطع": تركيب عربات المقاطع لتكوين كلمة ذات معنى.
* سباق القراءة السريعة باللوحة مع التغذية الراجعة الفورية والإيجابية.

#### 3. مؤشرات تحقق الهدف البيداغوجي:
* قراءة 15 كلمة متضمنة للحروف المدروسة دون تردد في أقل من دقيقة بنسبة دقة تفوق 80%.`;
  };

  const handleCopyRemark = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header & Tabs */}
      <div className="no-print bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>المساعد التربوي الذكي للأستاذ (Gemini AI)</span>
              </h2>
              <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2 py-0.5 rounded">
                ذكاء اصطناعي بيداغوجي مغربي
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              أدوات ذكية متقدمة لتوليد ملاحظات مسار الدقيقة، وصياغة خطط الدعم والمعالجة المركزة وفق التعليم الصريح ومقاربة طارل.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("remarks")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === "remarks"
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>ملاحظات مسار الدقيقة</span>
            </button>
            <button
              onClick={() => setActiveTab("remediation")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === "remediation"
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>خطة الدعم والمعالجة (طارل)</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Remarks Generator */}
        {activeTab === "remarks" ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">اسم التلميذ(ة):</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">المستوى الدراسي:</label>
                <input
                  type="text"
                  value={studentLevel}
                  onChange={(e) => setStudentLevel(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">المادة المستهدفة:</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 font-semibold"
                >
                  <option value="اللغة العربية">اللغة العربية</option>
                  <option value="الرياضيات">الرياضيات</option>
                  <option value="Français">اللغة الفرنسية (Français)</option>
                  <option value="النشاط العلمي">النشاط العلمي</option>
                  <option value="التربية الإسلامية">التربية الإسلامية</option>
                  <option value="السلوك والمواظبة">السلوك والمواظبة العامة</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">مستوى التحصيل الدراسي:</label>
                <select
                  value={performance}
                  onChange={(e) => setPerformance(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 font-semibold"
                >
                  <option value="excellent">ممتاز / متفوق (متحكم كلياً)</option>
                  <option value="good">حسن / مستحسن (متحكم)</option>
                  <option value="average">متوسط (في طور الاكتساب)</option>
                  <option value="struggling">متعثر (غير متمكن / يحتاج دعم)</option>
                </select>
              </div>

              <div className="md:col-span-3">
                <label className="block text-slate-700 font-semibold mb-1">ملاحظة نوعية حول السلوك أو التعلم:</label>
                <input
                  type="text"
                  value={behavior}
                  onChange={(e) => setBehavior(e.target.value)}
                  placeholder="مثال: يشارك بحماس، خجول أحياناً، خطه أنيق..."
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 font-medium"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleGenerateRemarks}
                  disabled={isGeneratingRemarks}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white font-bold p-2 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{isGeneratingRemarks ? "جاري الصياغة..." : "توليد الملاحظات"}</span>
                </button>
              </div>
            </div>

            {/* Generated Remarks Output */}
            {remarksList.length > 0 && (
              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>الملاحظات المقترحة لمنظومة مسار (انقر للنسخ المباشر):</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {remarksList.map((rem, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-slate-300 rounded-xl p-3.5 flex items-start justify-between gap-3 shadow-2xs hover:border-emerald-500 transition"
                    >
                      <p className="text-xs text-slate-800 font-medium leading-relaxed">
                        "{rem}"
                      </p>
                      <button
                        onClick={() => handleCopyRemark(rem, idx)}
                        className={`p-1.5 rounded-lg text-xs font-semibold shrink-0 cursor-pointer transition flex items-center gap-1 ${
                          copiedIdx === idx
                            ? "bg-emerald-700 text-white"
                            : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                        }`}
                        title="نسخ الملاحظة"
                      >
                        {copiedIdx === idx ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedIdx === idx ? "تم" : "نسخ"}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Tab 2: Remediation Plan */
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">المادة ومجال التعثر:</label>
                <input
                  type="text"
                  value={gapSubject}
                  onChange={(e) => setGapSubject(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">المستوى والفئة المستهدفة:</label>
                <input
                  type="text"
                  value={targetLevel}
                  onChange={(e) => setTargetLevel(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 font-medium"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-slate-700 font-semibold mb-1">وصف الصعوبة أو التعثر المرصود في روائز طارل:</label>
                <textarea
                  rows={2}
                  value={obstacle}
                  onChange={(e) => setObstacle(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 font-medium"
                />
              </div>

              <div className="md:col-span-3 flex justify-end">
                <button
                  onClick={handleGenerateRemediation}
                  disabled={isGeneratingPlan}
                  className="bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white font-bold px-5 py-2 rounded-lg text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{isGeneratingPlan ? "جاري بناء خطة المعالجة..." : "توليد بطاقة المعالجة المركزة (طارل)"}</span>
                </button>
              </div>
            </div>

            {/* Rendered Plan for Cumulative Dossier */}
            {remediationPlan && (
              <div className="print-sheet bg-white border border-slate-300 rounded-2xl p-6 md:p-8 shadow-xs max-w-4xl mx-auto space-y-4">
                <div className="no-print flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>بطاقة الدعم والمعالجة جاهزة للإدراج في الملف التراكمي</span>
                  </span>
                  <button
                    onClick={() => window.print()}
                    className="bg-slate-800 hover:bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>طباعة البطاقة A4</span>
                  </button>
                </div>

                <div className="prose prose-sm max-w-none text-slate-800 leading-relaxed font-sans whitespace-pre-line text-right">
                  {remediationPlan}
                </div>

                <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-4 text-center text-xs">
                  <div>
                    <span className="font-bold text-slate-800">الأستاذ(ة) المشرف(ة)</span>
                    <p className="text-[11px] text-slate-500 mt-1">ذ. {teacherProfile.fullNameAr}</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">مفتش المقاطعة التربوية</span>
                    <p className="text-[11px] text-slate-500 mt-1">تأشيرة وملاحظات التأطير</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
