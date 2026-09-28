import React, { useState, useRef, useEffect } from "react";
import {
  FileSpreadsheet,
  Printer,
  Download,
  Plus,
  Trash2,
  RotateCcw,
  Check,
  Upload,
  BarChart3,
  FileCheck2,
  Copy,
  UserPlus,
  Sparkles,
  BookOpen,
  Calculator,
  Languages,
  Layers,
  Eye,
  Info,
  Sliders,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import * as XLSX from "xlsx";
import { TeacherProfile, TabKey } from "../types";
import { generatePdfFromElement } from "../utils/pdfGenerator";

export type Level1Subject = "arabic" | "french" | "math" | "all";

export interface Level1StudentTracking {
  id: string;
  num: number;
  fullName: string;
  
  // اللغة العربية
  arPreTest: string; // "✓" or grade or blank
  arW1Letters: boolean;
  arW1Vocab: boolean;
  arW2Letters: boolean;
  arW2Vocab: boolean;
  arW3Letters: boolean;
  arW3Vocab: boolean;
  arW4Letters: boolean;
  arW4Vocab: boolean;
  arPostTest: string;

  // Français
  frPreTest: string;
  frW1Letters: boolean;
  frW1Vocab: boolean;
  frW2Letters: boolean;
  frW2Vocab: boolean;
  frW3Letters: boolean;
  frW3Vocab: boolean;
  frW4Letters: boolean;
  frW4Vocab: boolean;
  frPostTest: string;

  // الرياضيات
  mathPreTest: string;
  mathW1SingleDigit: boolean;
  mathW2SingleDigit: boolean;
  mathW3SingleDigit: boolean;
  mathW4SingleDigit: boolean;
  mathPostTest: string;
}

const INITIAL_STUDENTS_SAMPLE: Level1StudentTracking[] = Array.from({ length: 30 }, (_, index) => {
  const i = index + 1;
  const sampleNames = [
    "آدم الإدريسي", "مريم التازي", "يوسف العلمي", "فاطمة الزهراء بناني", "ياسين المرابط",
    "أميمة العلوي", "حمزة بوزيان", "هبة الصقلي", "ريان بنشقرون", "سارة الحسني",
    "محمد أمين الفاسي", "سلمى الشرايبي", "أنس البقالي", "إسراء الورتي", "عمر التلمساني",
    "خديجة الكتاني", "زكرياء الناصري", "نهال برادة", "أيوب المنصوري", "ملاك القادري",
    "طارق الصالحي", "إيمان الوزاني", "بدر الصنهاجي", "هاجر بنيحيى", "وليد الجوهري",
    "زينب الزروالي", "سفيان اليعقوبي", "دنيا الأندلسي", "مهدي الخياط", "سناء الداودي"
  ];
  return {
    id: `l1-st-${i}`,
    num: i,
    fullName: sampleNames[index] || `تلميذ(ة) رقم ${i}`,
    arPreTest: i % 4 === 0 ? "متعثر" : "متحكم",
    arW1Letters: i % 5 !== 0,
    arW1Vocab: i % 4 !== 0,
    arW2Letters: i % 6 !== 0,
    arW2Vocab: i % 5 !== 0,
    arW3Letters: i % 4 !== 0,
    arW3Vocab: i % 3 !== 0,
    arW4Letters: true,
    arW4Vocab: i % 7 !== 0,
    arPostTest: "متحكم",

    frPreTest: i % 3 === 0 ? "En cours" : "Maîtrisé",
    frW1Letters: i % 4 !== 0,
    frW1Vocab: i % 3 !== 0,
    frW2Letters: i % 5 !== 0,
    frW2Vocab: i % 4 !== 0,
    frW3Letters: i % 3 !== 0,
    frW3Vocab: i % 4 !== 0,
    frW4Letters: true,
    frW4Vocab: i % 5 !== 0,
    frPostTest: "Maîtrisé",

    mathPreTest: i % 4 === 0 ? "متعثر" : "متحكم",
    mathW1SingleDigit: i % 4 !== 0,
    mathW2SingleDigit: i % 5 !== 0,
    mathW3SingleDigit: i % 3 !== 0,
    mathW4SingleDigit: true,
    mathPostTest: "متحكم",
  };
});

interface Level1TrackingGridProps {
  teacherProfile: TeacherProfile;
  onNavigateToTab?: (tab: TabKey) => void;
}

export const Level1TrackingGrid: React.FC<Level1TrackingGridProps> = ({
  teacherProfile,
  onNavigateToTab,
}) => {
  const [activeSubject, setActiveSubject] = useState<Level1Subject>("arabic");
  const [isViergeMode, setIsViergeMode] = useState<boolean>(false);
  const [students, setStudents] = useState<Level1StudentTracking[]>(() => {
    try {
      const saved = localStorage.getItem("level1_tracking_grid_data_v1");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_STUDENTS_SAMPLE;
  });

  const [institution, setInstitution] = useState<string>(teacherProfile.schoolName || "مدرسة الريادة الابتدائية");
  const [directorate, setDirectorate] = useState<string>(teacherProfile.directorate || "المديرية الإقليمية");
  const [teacherName, setTeacherName] = useState<string>(teacherProfile.fullName || "الأستاذ(ة)");
  const [schoolYear, setSchoolYear] = useState<string>(teacherProfile.academicYear || "2026/2027");
  const [className, setClassName] = useState<string>("المستوى الأول ابتدائي - الفوج 1");
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const arabicGridRef = useRef<HTMLDivElement>(null);
  const frenchGridRef = useRef<HTMLDivElement>(null);
  const mathGridRef = useRef<HTMLDivElement>(null);
  const allGridsRef = useRef<HTMLDivElement>(null);

  // Save changes locally
  useEffect(() => {
    try {
      localStorage.setItem("level1_tracking_grid_data_v1", JSON.stringify(students));
    } catch (e) {
      console.error(e);
    }
  }, [students]);

  // Calculations for Arabic
  const arTotalCount = students.length || 1;
  const arW1LettersCount = students.filter(s => s.arW1Letters).length;
  const arW1VocabCount = students.filter(s => s.arW1Vocab).length;
  const arW1AvgPercent = Math.round(((arW1LettersCount + arW1VocabCount) / (arTotalCount * 2)) * 100);

  const arW2LettersCount = students.filter(s => s.arW2Letters).length;
  const arW2VocabCount = students.filter(s => s.arW2Vocab).length;
  const arW2AvgPercent = Math.round(((arW2LettersCount + arW2VocabCount) / (arTotalCount * 2)) * 100);

  const arW3LettersCount = students.filter(s => s.arW3Letters).length;
  const arW3VocabCount = students.filter(s => s.arW3Vocab).length;
  const arW3AvgPercent = Math.round(((arW3LettersCount + arW3VocabCount) / (arTotalCount * 2)) * 100);

  const arW4LettersCount = students.filter(s => s.arW4Letters).length;
  const arW4VocabCount = students.filter(s => s.arW4Vocab).length;
  const arW4AvgPercent = Math.round(((arW4LettersCount + arW4VocabCount) / (arTotalCount * 2)) * 100);

  // Calculations for French
  const frTotalCount = students.length || 1;
  const frW1LettersCount = students.filter(s => s.frW1Letters).length;
  const frW1VocabCount = students.filter(s => s.frW1Vocab).length;
  const frW1AvgPercent = Math.round(((frW1LettersCount + frW1VocabCount) / (frTotalCount * 2)) * 100);

  const frW2LettersCount = students.filter(s => s.frW2Letters).length;
  const frW2VocabCount = students.filter(s => s.frW2Vocab).length;
  const frW2AvgPercent = Math.round(((frW2LettersCount + frW2VocabCount) / (frTotalCount * 2)) * 100);

  const frW3LettersCount = students.filter(s => s.frW3Letters).length;
  const frW3VocabCount = students.filter(s => s.frW3Vocab).length;
  const frW3AvgPercent = Math.round(((frW3LettersCount + frW3VocabCount) / (frTotalCount * 2)) * 100);

  const frW4LettersCount = students.filter(s => s.frW4Letters).length;
  const frW4VocabCount = students.filter(s => s.frW4Vocab).length;
  const frW4AvgPercent = Math.round(((frW4LettersCount + frW4VocabCount) / (frTotalCount * 2)) * 100);

  // Calculations for Maths
  const mathTotalCount = students.length || 1;
  const mathW1Count = students.filter(s => s.mathW1SingleDigit).length;
  const mathW1AvgPercent = Math.round((mathW1Count / mathTotalCount) * 100);

  const mathW2Count = students.filter(s => s.mathW2SingleDigit).length;
  const mathW2AvgPercent = Math.round((mathW2Count / mathTotalCount) * 100);

  const mathW3Count = students.filter(s => s.mathW3SingleDigit).length;
  const mathW3AvgPercent = Math.round((mathW3Count / mathTotalCount) * 100);

  const mathW4Count = students.filter(s => s.mathW4SingleDigit).length;
  const mathW4AvgPercent = Math.round((mathW4Count / mathTotalCount) * 100);

  // Toggle student state
  const handleToggle = (id: string, field: keyof Level1StudentTracking) => {
    if (isViergeMode) return;
    setStudents(prev =>
      prev.map(st => {
        if (st.id === id) {
          return { ...st, [field]: !st[field] };
        }
        return st;
      })
    );
  };

  const handleNameChange = (id: string, name: string) => {
    setStudents(prev =>
      prev.map(st => (st.id === id ? { ...st, fullName: name } : st))
    );
  };

  const handleQuickFill = (status: boolean) => {
    setStudents(prev =>
      prev.map(st => ({
        ...st,
        arW1Letters: status,
        arW1Vocab: status,
        arW2Letters: status,
        arW2Vocab: status,
        arW3Letters: status,
        arW3Vocab: status,
        arW4Letters: status,
        arW4Vocab: status,
        frW1Letters: status,
        frW1Vocab: status,
        frW2Letters: status,
        frW2Vocab: status,
        frW3Letters: status,
        frW3Vocab: status,
        frW4Letters: status,
        frW4Vocab: status,
        mathW1SingleDigit: status,
        mathW2SingleDigit: status,
        mathW3SingleDigit: status,
        mathW4SingleDigit: status,
      }))
    );
  };

  const handleResetData = () => {
    if (confirm("هل تريد استعادة البيانات الافتراضية للشبكة؟")) {
      setStudents(INITIAL_STUDENTS_SAMPLE);
    }
  };

  const handleClearAll = () => {
    if (confirm("هل تريد تفريغ جميع أسماء التلاميذ والعلامات؟")) {
      setStudents(
        Array.from({ length: 30 }, (_, index) => ({
          id: `l1-st-${index + 1}`,
          num: index + 1,
          fullName: "",
          arPreTest: "",
          arW1Letters: false,
          arW1Vocab: false,
          arW2Letters: false,
          arW2Vocab: false,
          arW3Letters: false,
          arW3Vocab: false,
          arW4Letters: false,
          arW4Vocab: false,
          arPostTest: "",
          frPreTest: "",
          frW1Letters: false,
          frW1Vocab: false,
          frW2Letters: false,
          frW2Vocab: false,
          frW3Letters: false,
          frW3Vocab: false,
          frW4Letters: false,
          frW4Vocab: false,
          frPostTest: "",
          mathPreTest: "",
          mathW1SingleDigit: false,
          mathW2SingleDigit: false,
          mathW3SingleDigit: false,
          mathW4SingleDigit: false,
          mathPostTest: "",
        }))
      );
    }
  };

  const handleAddStudentRow = () => {
    const nextNum = students.length + 1;
    setStudents(prev => [
      ...prev,
      {
        id: `l1-st-${Date.now()}`,
        num: nextNum,
        fullName: `تلميذ(ة) رقم ${nextNum}`,
        arPreTest: "",
        arW1Letters: false,
        arW1Vocab: false,
        arW2Letters: false,
        arW2Vocab: false,
        arW3Letters: false,
        arW3Vocab: false,
        arW4Letters: false,
        arW4Vocab: false,
        arPostTest: "",
        frPreTest: "",
        frW1Letters: false,
        frW1Vocab: false,
        frW2Letters: false,
        frW2Vocab: false,
        frW3Letters: false,
        frW3Vocab: false,
        frW4Letters: false,
        frW4Vocab: false,
        frPostTest: "",
        mathPreTest: "",
        mathW1SingleDigit: false,
        mathW2SingleDigit: false,
        mathW3SingleDigit: false,
        mathW4SingleDigit: false,
        mathPostTest: "",
      },
    ]);
  };

  // Export to Excel
  const handleExportExcel = () => {
    const wb = XLSX.utils.book_new();

    // 1. Arabic Sheet
    const arRows = students.map(s => ({
      "ر.ت": s.num,
      "الاسم والنسب": s.fullName,
      "الرائز القبلي": s.arPreTest,
      "الأسبوع 1 - الحروف": s.arW1Letters ? "✓" : "",
      "الأسبوع 1 - معجم/فهم": s.arW1Vocab ? "✓" : "",
      "الأسبوع 2 - الحروف": s.arW2Letters ? "✓" : "",
      "الأسبوع 2 - معجم/فهم": s.arW2Vocab ? "✓" : "",
      "الأسبوع 3 - الحروف": s.arW3Letters ? "✓" : "",
      "الأسبوع 3 - معجم/فهم": s.arW3Vocab ? "✓" : "",
      "الأسبوع 4 - الحروف": s.arW4Letters ? "✓" : "",
      "الأسبوع 4 - معجم/فهم": s.arW4Vocab ? "✓" : "",
      "الرائز البعدي": s.arPostTest,
    }));
    const arWs = XLSX.utils.json_to_sheet(arRows);
    XLSX.utils.book_append_sheet(wb, arWs, "اللغة العربية");

    // 2. French Sheet
    const frRows = students.map(s => ({
      "N°": s.num,
      "Nom et prénom": s.fullName,
      "Pré-test": s.frPreTest,
      "Semaine 1 - Lettre": s.frW1Letters ? "✓" : "",
      "Semaine 1 - Vocabulaire": s.frW1Vocab ? "✓" : "",
      "Semaine 2 - Lettre": s.frW2Letters ? "✓" : "",
      "Semaine 2 - Vocabulaire": s.frW2Vocab ? "✓" : "",
      "Semaine 3 - Lettre": s.frW3Letters ? "✓" : "",
      "Semaine 3 - Vocabulaire": s.frW3Vocab ? "✓" : "",
      "Semaine 4 - Lettre": s.frW4Letters ? "✓" : "",
      "Semaine 4 - Vocabulaire": s.frW4Vocab ? "✓" : "",
      "Post-test": s.frPostTest,
    }));
    const frWs = XLSX.utils.json_to_sheet(frRows);
    XLSX.utils.book_append_sheet(wb, frWs, "Français");

    // 3. Math Sheet
    const mathRows = students.map(s => ({
      "ر.ت": s.num,
      "الاسم والنسب": s.fullName,
      "الرائز القبلي": s.mathPreTest,
      "الأسبوع 1 - أعداد من رقم واحد": s.mathW1SingleDigit ? "✓" : "",
      "الأسبوع 2 - أعداد من رقم واحد": s.mathW2SingleDigit ? "✓" : "",
      "الأسبوع 3 - أعداد من رقم واحد": s.mathW3SingleDigit ? "✓" : "",
      "الأسبوع 4 - أعداد من رقم واحد": s.mathW4SingleDigit ? "✓" : "",
      "الرائز البعدي": s.mathPostTest,
    }));
    const mathWs = XLSX.utils.json_to_sheet(mathRows);
    XLSX.utils.book_append_sheet(wb, mathWs, "الرياضيات");

    XLSX.writeFile(wb, `شبكة_تتبع_تقدم_تحكم_تلاميذ_المستوى_الأول_2026_2027.xlsx`);
  };

  // Export PDF
  const handleDownloadPdf = async (targetRef: React.RefObject<HTMLDivElement | null>, filename: string) => {
    if (!targetRef.current) return;
    setIsGeneratingPdf(true);
    try {
      await generatePdfFromElement(targetRef.current, {
        filename: `${filename}.pdf`,
        orientation: "landscape",
        quality: "ultra",
        colorMode: "color",
      });
    } catch (e) {
      console.error(e);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrintDirect = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-16 font-sans">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-emerald-700/50">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>الوثائق الرسمية لمدارس الريادة والمنهاج المنقح</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              شبكة تتبع تقدم تحكم تلاميذ المستوى الأول (1AEP)
            </h1>
            <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
              الشبكة المعتمدة رسمياً لتتبع ومواكبة تحكم متعلمي السنة الأولى ابتدائي في اللبنات والأسابيع الأربعة (اللغة العربية، اللغة الفرنسية، والرياضيات) مع الرائزين القبلي والبعدي وحساب نسب التحكم الأسبوعية.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            <button
              onClick={handlePrintDirect}
              className="bg-white hover:bg-slate-100 text-slate-900 font-bold px-4 py-2.5 rounded-xl text-sm shadow-md inline-flex items-center gap-2 transition cursor-pointer flex-1 sm:flex-none justify-center"
            >
              <Printer className="w-4 h-4 text-emerald-700" />
              <span>طباعة ورقية (A4)</span>
            </button>
            <button
              onClick={() => {
                const ref = activeSubject === "arabic" ? arabicGridRef : activeSubject === "french" ? frenchGridRef : activeSubject === "math" ? mathGridRef : allGridsRef;
                handleDownloadPdf(ref, `شبكة_تتبع_تحكم_المستوى_الأول_${activeSubject}`);
              }}
              disabled={isGeneratingPdf}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-sm shadow-md inline-flex items-center gap-2 transition cursor-pointer flex-1 sm:flex-none justify-center disabled:opacity-50"
            >
              <Download className="w-4 h-4 text-amber-300" />
              <span>{isGeneratingPdf ? "جاري التوليد..." : "تنزيل PDF"}</span>
            </button>
            <button
              onClick={handleExportExcel}
              className="bg-teal-700 hover:bg-teal-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm shadow-md inline-flex items-center gap-2 transition cursor-pointer flex-1 sm:flex-none justify-center"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-300" />
              <span>تصدير Excel</span>
            </button>
          </div>
        </div>

        {/* Subjects Switcher */}
        <div className="mt-6 pt-5 border-t border-emerald-700/40 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 bg-slate-950/40 p-1.5 rounded-2xl border border-white/10">
            <button
              onClick={() => setActiveSubject("arabic")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                activeSubject === "arabic"
                  ? "bg-rose-600 text-white shadow-md"
                  : "text-emerald-100 hover:text-white hover:bg-white/5"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>اللغة العربية (الصفحة 1)</span>
            </button>
            <button
              onClick={() => setActiveSubject("french")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                activeSubject === "french"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-emerald-100 hover:text-white hover:bg-white/5"
              }`}
            >
              <Languages className="w-4 h-4" />
              <span>La langue française (Page 2)</span>
            </button>
            <button
              onClick={() => setActiveSubject("math")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                activeSubject === "math"
                  ? "bg-amber-600 text-white shadow-md"
                  : "text-emerald-100 hover:text-white hover:bg-white/5"
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>الرياضيات (الصفحة 3)</span>
            </button>
            <button
              onClick={() => setActiveSubject("all")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                activeSubject === "all"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "text-emerald-100 hover:text-white hover:bg-white/5"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>عرض المواد الثلاث معاً</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsViergeMode(!isViergeMode)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition cursor-pointer inline-flex items-center gap-2 ${
                isViergeMode
                  ? "bg-amber-400 text-slate-950 border-amber-300 shadow-sm"
                  : "bg-white/10 text-emerald-100 hover:bg-white/20 border-white/20"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{isViergeMode ? "نموذج فارغ للطباعة (Vierge)" : "الوضع التفاعلي بالبيانات"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Control Toolbox */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">المؤسسة التعليمية</label>
            <input
              type="text"
              value={institution}
              onChange={e => setInstitution(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:ring-1 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">الأستاذ(ة)</label>
            <input
              type="text"
              value={teacherName}
              onChange={e => setTeacherName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:ring-1 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">القسم / الفوج</label>
            <input
              type="text"
              value={className}
              onChange={e => setClassName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:ring-1 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">الموسم الدراسي</label>
            <input
              type="text"
              value={schoolYear}
              onChange={e => setSchoolYear(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:ring-1 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 w-full sm:w-auto justify-end">
          {!isViergeMode && (
            <>
              <button
                onClick={() => handleQuickFill(true)}
                className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200 transition cursor-pointer inline-flex items-center gap-1.5"
                title="تحديد كل الخانات كمتحكم"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>تعبئة الكل تحكم</span>
              </button>
              <button
                onClick={() => handleQuickFill(false)}
                className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold rounded-lg border border-rose-200 transition cursor-pointer inline-flex items-center gap-1.5"
                title="إلغاء تحديد كل الخانات"
              >
                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                <span>إلغاء الكل</span>
              </button>
              <button
                onClick={handleAddStudentRow}
                className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold rounded-lg border border-blue-200 transition cursor-pointer inline-flex items-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5 text-blue-600" />
                <span>إضافة سطر</span>
              </button>
              <button
                onClick={handleResetData}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg border border-slate-200 transition cursor-pointer inline-flex items-center gap-1.5"
                title="استرجاع العينة"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>استعادة</span>
              </button>
              <button
                onClick={handleClearAll}
                className="px-3 py-1.5 bg-slate-50 hover:bg-rose-50 text-slate-500 hover:text-rose-700 text-xs font-bold rounded-lg border border-slate-200 transition cursor-pointer inline-flex items-center gap-1.5"
                title="مسح الأسماء والعلامات"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>مسح</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* RENDER PAGES */}
      <div id="print-area-level1-tracking" ref={allGridsRef} className="space-y-12">
        
        {/* PAGE 1: ARABIC GRID */}
        {(activeSubject === "arabic" || activeSubject === "all") && (
          <div
            ref={arabicGridRef}
            className="bg-white rounded-2xl p-6 border border-slate-300 shadow-md text-slate-900 print:p-0 print:border-none print:shadow-none print:m-0 print:break-after-page"
            style={{ direction: "rtl" }}
          >
            {/* Header Document */}
            <div className="text-center mb-4 space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                شبكة تتبع تقدم تحكم التلاميذ (المستوى الأول)
              </h2>
              <div className="inline-block bg-slate-100 px-4 py-1 rounded-full text-sm font-black text-rose-800 border border-slate-300">
                اللغة العربية
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600 px-2 pt-1 border-b border-slate-200 pb-2 font-medium">
                <span>المؤسسة: <strong>{institution}</strong></span>
                <span>الأستاذ(ة): <strong>{teacherName}</strong></span>
                <span>القسم: <strong>{className}</strong></span>
                <span>الموسم الدراسي: <strong>{schoolYear}</strong></span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border-2 border-black text-center text-[11px] sm:text-xs">
                <thead>
                  {/* Top Level Headers */}
                  <tr className="bg-slate-100 text-black font-bold">
                    <th rowSpan={2} className="border border-black px-1.5 py-2 w-10">ر.ت</th>
                    <th rowSpan={2} className="border border-black px-3 py-2 text-right min-w-[160px] sm:min-w-[200px]">الاسم والنسب</th>
                    <th rowSpan={2} className="border border-black px-2 py-2 w-20">الرائز القبلي</th>
                    <th colSpan={2} className="border border-black py-1.5 bg-[#fef3c7] text-black">الأسبوع 1</th>
                    <th colSpan={2} className="border border-black py-1.5 bg-[#fce7f3] text-black">الأسبوع 2</th>
                    <th colSpan={2} className="border border-black py-1.5 bg-[#d1fae5] text-black">الأسبوع 3</th>
                    <th colSpan={2} className="border border-black py-1.5 bg-[#e0f2fe] text-black">الأسبوع 4</th>
                    <th rowSpan={2} className="border border-black px-2 py-2 w-20">الرائز البعدي</th>
                  </tr>
                  {/* Sub Level Headers */}
                  <tr className="bg-slate-50 text-black font-bold">
                    <th className="border border-black px-1 py-1 w-14 bg-[#fef3c7]/60">الحروف</th>
                    <th className="border border-black px-1 py-1 w-18 bg-[#fef3c7]/60">معجم/فهم</th>
                    <th className="border border-black px-1 py-1 w-14 bg-[#fce7f3]/60">الحروف</th>
                    <th className="border border-black px-1 py-1 w-18 bg-[#fce7f3]/60">معجم/فهم</th>
                    <th className="border border-black px-1 py-1 w-14 bg-[#d1fae5]/60">الحروف</th>
                    <th className="border border-black px-1 py-1 w-18 bg-[#d1fae5]/60">معجم/فهم</th>
                    <th className="border border-black px-1 py-1 w-14 bg-[#e0f2fe]/60">الحروف</th>
                    <th className="border border-black px-1 py-1 w-18 bg-[#e0f2fe]/60">معجم/فهم</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, idx) => (
                    <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="border border-black py-1 font-bold text-slate-800">{student.num}</td>
                      <td className="border border-black px-2 py-1 text-right font-medium text-slate-900">
                        {isViergeMode ? (
                          <span className="text-transparent">.</span>
                        ) : (
                          <input
                            type="text"
                            value={student.fullName}
                            onChange={e => handleNameChange(student.id, e.target.value)}
                            className="w-full bg-transparent border-none p-0 text-slate-900 font-medium focus:outline-hidden focus:bg-white focus:ring-1 focus:ring-emerald-500 rounded px-1"
                          />
                        )}
                      </td>
                      {/* Pre-test */}
                      <td className="border border-black py-1">
                        {isViergeMode ? "" : student.arPreTest}
                      </td>
                      {/* W1 */}
                      <td
                        onClick={() => handleToggle(student.id, "arW1Letters")}
                        className="border border-black py-1 cursor-pointer select-none font-bold text-emerald-800 bg-[#fef3c7]/20 hover:bg-[#fef3c7]/60"
                      >
                        {!isViergeMode && (student.arW1Letters ? "✓" : "")}
                      </td>
                      <td
                        onClick={() => handleToggle(student.id, "arW1Vocab")}
                        className="border border-black py-1 cursor-pointer select-none font-bold text-emerald-800 bg-[#fef3c7]/20 hover:bg-[#fef3c7]/60"
                      >
                        {!isViergeMode && (student.arW1Vocab ? "✓" : "")}
                      </td>
                      {/* W2 */}
                      <td
                        onClick={() => handleToggle(student.id, "arW2Letters")}
                        className="border border-black py-1 cursor-pointer select-none font-bold text-emerald-800 bg-[#fce7f3]/20 hover:bg-[#fce7f3]/60"
                      >
                        {!isViergeMode && (student.arW2Letters ? "✓" : "")}
                      </td>
                      <td
                        onClick={() => handleToggle(student.id, "arW2Vocab")}
                        className="border border-black py-1 cursor-pointer select-none font-bold text-emerald-800 bg-[#fce7f3]/20 hover:bg-[#fce7f3]/60"
                      >
                        {!isViergeMode && (student.arW2Vocab ? "✓" : "")}
                      </td>
                      {/* W3 */}
                      <td
                        onClick={() => handleToggle(student.id, "arW3Letters")}
                        className="border border-black py-1 cursor-pointer select-none font-bold text-emerald-800 bg-[#d1fae5]/20 hover:bg-[#d1fae5]/60"
                      >
                        {!isViergeMode && (student.arW3Letters ? "✓" : "")}
                      </td>
                      <td
                        onClick={() => handleToggle(student.id, "arW3Vocab")}
                        className="border border-black py-1 cursor-pointer select-none font-bold text-emerald-800 bg-[#d1fae5]/20 hover:bg-[#d1fae5]/60"
                      >
                        {!isViergeMode && (student.arW3Vocab ? "✓" : "")}
                      </td>
                      {/* W4 */}
                      <td
                        onClick={() => handleToggle(student.id, "arW4Letters")}
                        className="border border-black py-1 cursor-pointer select-none font-bold text-emerald-800 bg-[#e0f2fe]/20 hover:bg-[#e0f2fe]/60"
                      >
                        {!isViergeMode && (student.arW4Letters ? "✓" : "")}
                      </td>
                      <td
                        onClick={() => handleToggle(student.id, "arW4Vocab")}
                        className="border border-black py-1 cursor-pointer select-none font-bold text-emerald-800 bg-[#e0f2fe]/20 hover:bg-[#e0f2fe]/60"
                      >
                        {!isViergeMode && (student.arW4Vocab ? "✓" : "")}
                      </td>
                      {/* Post-test */}
                      <td className="border border-black py-1 font-bold text-emerald-700">
                        {isViergeMode ? "" : student.arPostTest}
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* Footer Row */}
                <tfoot>
                  <tr className="bg-slate-100 font-black text-black">
                    <td colSpan={3} className="border-2 border-black py-2 text-center text-xs font-black">
                      نسبة التحكم
                    </td>
                    <td colSpan={2} className="border-2 border-black py-2 text-center font-bold bg-[#fef3c7]/60">
                      {isViergeMode ? "............... %" : `% ${arW1AvgPercent}`}
                    </td>
                    <td colSpan={2} className="border-2 border-black py-2 text-center font-bold bg-[#fce7f3]/60">
                      {isViergeMode ? "............... %" : `% ${arW2AvgPercent}`}
                    </td>
                    <td colSpan={2} className="border-2 border-black py-2 text-center font-bold bg-[#d1fae5]/60">
                      {isViergeMode ? "............... %" : `% ${arW3AvgPercent}`}
                    </td>
                    <td colSpan={2} className="border-2 border-black py-2 text-center font-bold bg-[#e0f2fe]/60">
                      {isViergeMode ? "............... %" : `% ${arW4AvgPercent}`}
                    </td>
                    <td className="border-2 border-black py-2"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {/* PAGE 2: FRENCH GRID */}
        {(activeSubject === "french" || activeSubject === "all") && (
          <div
            ref={frenchGridRef}
            className="bg-white rounded-2xl p-6 border border-slate-300 shadow-md text-slate-900 print:p-0 print:border-none print:shadow-none print:m-0 print:break-after-page"
            style={{ direction: "ltr" }}
          >
            {/* Header Document */}
            <div className="text-center mb-4 space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Grille de suivi de la progression de la maîtrise des élèves (1ère AEP)
              </h2>
              <div className="inline-block bg-slate-100 px-4 py-1 rounded-full text-sm font-black text-indigo-800 border border-slate-300">
                La langue française
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600 px-2 pt-1 border-b border-slate-200 pb-2 font-medium">
                <span>Établissement: <strong>{institution}</strong></span>
                <span>Enseignant(e): <strong>{teacherName}</strong></span>
                <span>Classe: <strong>{className}</strong></span>
                <span>Année scolaire: <strong>{schoolYear}</strong></span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border-2 border-black text-center text-[11px] sm:text-xs">
                <thead>
                  {/* Top Level Headers */}
                  <tr className="bg-slate-100 text-black font-bold">
                    <th rowSpan={2} className="border border-black px-1.5 py-2 w-10">N°</th>
                    <th rowSpan={2} className="border border-black px-3 py-2 text-left min-w-[160px] sm:min-w-[200px]">Nom et prénom</th>
                    <th rowSpan={2} className="border border-black px-2 py-2 w-20">Pré-test</th>
                    <th colSpan={2} className="border border-black py-1.5 bg-[#fef3c7] text-black">Semaine 1</th>
                    <th colSpan={2} className="border border-black py-1.5 bg-[#fce7f3] text-black">Semaine 2</th>
                    <th colSpan={2} className="border border-black py-1.5 bg-[#d1fae5] text-black">Semaine 3</th>
                    <th colSpan={2} className="border border-black py-1.5 bg-[#e0f2fe] text-black">Semaine 4</th>
                    <th rowSpan={2} className="border border-black px-2 py-2 w-20">Post-test</th>
                  </tr>
                  {/* Sub Level Headers */}
                  <tr className="bg-slate-50 text-black font-bold">
                    <th className="border border-black px-1 py-1 w-14 bg-[#fef3c7]/60">Lettre</th>
                    <th className="border border-black px-1 py-1 w-20 bg-[#fef3c7]/60">Vocabulaire</th>
                    <th className="border border-black px-1 py-1 w-14 bg-[#fce7f3]/60">Lettre</th>
                    <th className="border border-black px-1 py-1 w-20 bg-[#fce7f3]/60">Vocabulaire</th>
                    <th className="border border-black px-1 py-1 w-14 bg-[#d1fae5]/60">Lettre</th>
                    <th className="border border-black px-1 py-1 w-20 bg-[#d1fae5]/60">Vocabulaire</th>
                    <th className="border border-black px-1 py-1 w-14 bg-[#e0f2fe]/60">Lettre</th>
                    <th className="border border-black px-1 py-1 w-20 bg-[#e0f2fe]/60">Vocabulaire</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, idx) => (
                    <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="border border-black py-1 font-bold text-slate-800">{student.num}</td>
                      <td className="border border-black px-2 py-1 text-left font-medium text-slate-900">
                        {isViergeMode ? (
                          <span className="text-transparent">.</span>
                        ) : (
                          <input
                            type="text"
                            value={student.fullName}
                            onChange={e => handleNameChange(student.id, e.target.value)}
                            className="w-full bg-transparent border-none p-0 text-slate-900 font-medium focus:outline-hidden focus:bg-white focus:ring-1 focus:ring-indigo-500 rounded px-1 text-left"
                          />
                        )}
                      </td>
                      {/* Pré-test */}
                      <td className="border border-black py-1">
                        {isViergeMode ? "" : student.frPreTest}
                      </td>
                      {/* Semaine 1 */}
                      <td
                        onClick={() => handleToggle(student.id, "frW1Letters")}
                        className="border border-black py-1 cursor-pointer select-none font-bold text-indigo-800 bg-[#fef3c7]/20 hover:bg-[#fef3c7]/60"
                      >
                        {!isViergeMode && (student.frW1Letters ? "✓" : "")}
                      </td>
                      <td
                        onClick={() => handleToggle(student.id, "frW1Vocab")}
                        className="border border-black py-1 cursor-pointer select-none font-bold text-indigo-800 bg-[#fef3c7]/20 hover:bg-[#fef3c7]/60"
                      >
                        {!isViergeMode && (student.frW1Vocab ? "✓" : "")}
                      </td>
                      {/* Semaine 2 */}
                      <td
                        onClick={() => handleToggle(student.id, "frW2Letters")}
                        className="border border-black py-1 cursor-pointer select-none font-bold text-indigo-800 bg-[#fce7f3]/20 hover:bg-[#fce7f3]/60"
                      >
                        {!isViergeMode && (student.frW2Letters ? "✓" : "")}
                      </td>
                      <td
                        onClick={() => handleToggle(student.id, "frW2Vocab")}
                        className="border border-black py-1 cursor-pointer select-none font-bold text-indigo-800 bg-[#fce7f3]/20 hover:bg-[#fce7f3]/60"
                      >
                        {!isViergeMode && (student.frW2Vocab ? "✓" : "")}
                      </td>
                      {/* Semaine 3 */}
                      <td
                        onClick={() => handleToggle(student.id, "frW3Letters")}
                        className="border border-black py-1 cursor-pointer select-none font-bold text-indigo-800 bg-[#d1fae5]/20 hover:bg-[#d1fae5]/60"
                      >
                        {!isViergeMode && (student.frW3Letters ? "✓" : "")}
                      </td>
                      <td
                        onClick={() => handleToggle(student.id, "frW3Vocab")}
                        className="border border-black py-1 cursor-pointer select-none font-bold text-indigo-800 bg-[#d1fae5]/20 hover:bg-[#d1fae5]/60"
                      >
                        {!isViergeMode && (student.frW3Vocab ? "✓" : "")}
                      </td>
                      {/* Semaine 4 */}
                      <td
                        onClick={() => handleToggle(student.id, "frW4Letters")}
                        className="border border-black py-1 cursor-pointer select-none font-bold text-indigo-800 bg-[#e0f2fe]/20 hover:bg-[#e0f2fe]/60"
                      >
                        {!isViergeMode && (student.frW4Letters ? "✓" : "")}
                      </td>
                      <td
                        onClick={() => handleToggle(student.id, "frW4Vocab")}
                        className="border border-black py-1 cursor-pointer select-none font-bold text-indigo-800 bg-[#e0f2fe]/20 hover:bg-[#e0f2fe]/60"
                      >
                        {!isViergeMode && (student.frW4Vocab ? "✓" : "")}
                      </td>
                      {/* Post-test */}
                      <td className="border border-black py-1 font-bold text-indigo-700">
                        {isViergeMode ? "" : student.frPostTest}
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* Footer Row */}
                <tfoot>
                  <tr className="bg-slate-100 font-black text-black">
                    <td colSpan={3} className="border-2 border-black py-2 text-center text-xs font-black">
                      Taux de maîtrise
                    </td>
                    <td colSpan={2} className="border-2 border-black py-2 text-center font-bold bg-[#fef3c7]/60">
                      {isViergeMode ? "...............%" : `${frW1AvgPercent}%`}
                    </td>
                    <td colSpan={2} className="border-2 border-black py-2 text-center font-bold bg-[#fce7f3]/60">
                      {isViergeMode ? "...............%" : `${frW2AvgPercent}%`}
                    </td>
                    <td colSpan={2} className="border-2 border-black py-2 text-center font-bold bg-[#d1fae5]/60">
                      {isViergeMode ? "...............%" : `${frW3AvgPercent}%`}
                    </td>
                    <td colSpan={2} className="border-2 border-black py-2 text-center font-bold bg-[#e0f2fe]/60">
                      {isViergeMode ? "...............%" : `${frW4AvgPercent}%`}
                    </td>
                    <td className="border-2 border-black py-2"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {/* PAGE 3: MATH GRID */}
        {(activeSubject === "math" || activeSubject === "all") && (
          <div
            ref={mathGridRef}
            className="bg-white rounded-2xl p-6 border border-slate-300 shadow-md text-slate-900 print:p-0 print:border-none print:shadow-none print:m-0 print:break-after-page"
            style={{ direction: "rtl" }}
          >
            {/* Header Document */}
            <div className="text-center mb-4 space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                شبكة تتبع تقدم تحكم التلاميذ (المستوى الأول)
              </h2>
              <div className="inline-block bg-slate-100 px-4 py-1 rounded-full text-sm font-black text-amber-800 border border-slate-300">
                الرياضيات
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600 px-2 pt-1 border-b border-slate-200 pb-2 font-medium">
                <span>المؤسسة: <strong>{institution}</strong></span>
                <span>الأستاذ(ة): <strong>{teacherName}</strong></span>
                <span>القسم: <strong>{className}</strong></span>
                <span>الموسم الدراسي: <strong>{schoolYear}</strong></span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border-2 border-black text-center text-[11px] sm:text-xs">
                <thead>
                  {/* Top Level Headers */}
                  <tr className="bg-slate-100 text-black font-bold">
                    <th rowSpan={2} className="border border-black px-1.5 py-2 w-10">ر.ت</th>
                    <th rowSpan={2} className="border border-black px-3 py-2 text-right min-w-[160px] sm:min-w-[200px]">الاسم والنسب</th>
                    <th rowSpan={2} className="border border-black px-2 py-2 w-20">الرائز القبلي</th>
                    <th className="border border-black py-1.5 bg-[#fef3c7] text-black">الأسبوع 1</th>
                    <th className="border border-black py-1.5 bg-[#fce7f3] text-black">الأسبوع 2</th>
                    <th className="border border-black py-1.5 bg-[#d1fae5] text-black">الأسبوع 3</th>
                    <th className="border border-black py-1.5 bg-[#e0f2fe] text-black">الأسبوع 4</th>
                    <th rowSpan={2} className="border border-black px-2 py-2 w-20">الرائز البعدي</th>
                  </tr>
                  {/* Sub Level Headers */}
                  <tr className="bg-slate-50 text-black font-bold">
                    <th className="border border-black px-2 py-1 min-w-[90px] bg-[#fef3c7]/60">أعداد من رقم واحد</th>
                    <th className="border border-black px-2 py-1 min-w-[90px] bg-[#fce7f3]/60">أعداد من رقم واحد</th>
                    <th className="border border-black px-2 py-1 min-w-[90px] bg-[#d1fae5]/60">أعداد من رقم واحد</th>
                    <th className="border border-black px-2 py-1 min-w-[90px] bg-[#e0f2fe]/60">أعداد من رقم واحد</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, idx) => (
                    <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="border border-black py-1 font-bold text-slate-800">{student.num}</td>
                      <td className="border border-black px-2 py-1 text-right font-medium text-slate-900">
                        {isViergeMode ? (
                          <span className="text-transparent">.</span>
                        ) : (
                          <input
                            type="text"
                            value={student.fullName}
                            onChange={e => handleNameChange(student.id, e.target.value)}
                            className="w-full bg-transparent border-none p-0 text-slate-900 font-medium focus:outline-hidden focus:bg-white focus:ring-1 focus:ring-amber-500 rounded px-1"
                          />
                        )}
                      </td>
                      {/* Pre-test */}
                      <td className="border border-black py-1">
                        {isViergeMode ? "" : student.mathPreTest}
                      </td>
                      {/* W1 */}
                      <td
                        onClick={() => handleToggle(student.id, "mathW1SingleDigit")}
                        className="border border-black py-1 cursor-pointer select-none font-bold text-amber-800 bg-[#fef3c7]/20 hover:bg-[#fef3c7]/60"
                      >
                        {!isViergeMode && (student.mathW1SingleDigit ? "✓" : "")}
                      </td>
                      {/* W2 */}
                      <td
                        onClick={() => handleToggle(student.id, "mathW2SingleDigit")}
                        className="border border-black py-1 cursor-pointer select-none font-bold text-amber-800 bg-[#fce7f3]/20 hover:bg-[#fce7f3]/60"
                      >
                        {!isViergeMode && (student.mathW2SingleDigit ? "✓" : "")}
                      </td>
                      {/* W3 */}
                      <td
                        onClick={() => handleToggle(student.id, "mathW3SingleDigit")}
                        className="border border-black py-1 cursor-pointer select-none font-bold text-amber-800 bg-[#d1fae5]/20 hover:bg-[#d1fae5]/60"
                      >
                        {!isViergeMode && (student.mathW3SingleDigit ? "✓" : "")}
                      </td>
                      {/* W4 */}
                      <td
                        onClick={() => handleToggle(student.id, "mathW4SingleDigit")}
                        className="border border-black py-1 cursor-pointer select-none font-bold text-amber-800 bg-[#e0f2fe]/20 hover:bg-[#e0f2fe]/60"
                      >
                        {!isViergeMode && (student.mathW4SingleDigit ? "✓" : "")}
                      </td>
                      {/* Post-test */}
                      <td className="border border-black py-1 font-bold text-amber-700">
                        {isViergeMode ? "" : student.mathPostTest}
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* Footer Row */}
                <tfoot>
                  <tr className="bg-slate-100 font-black text-black">
                    <td colSpan={3} className="border-2 border-black py-2 text-center text-xs font-black">
                      نسبة التحكم
                    </td>
                    <td className="border-2 border-black py-2 text-center font-bold bg-[#fef3c7]/60">
                      {isViergeMode ? "............... %" : `% ${mathW1AvgPercent}`}
                    </td>
                    <td className="border-2 border-black py-2 text-center font-bold bg-[#fce7f3]/60">
                      {isViergeMode ? "............... %" : `% ${mathW2AvgPercent}`}
                    </td>
                    <td className="border-2 border-black py-2 text-center font-bold bg-[#d1fae5]/60">
                      {isViergeMode ? "............... %" : `% ${mathW3AvgPercent}`}
                    </td>
                    <td className="border-2 border-black py-2 text-center font-bold bg-[#e0f2fe]/60">
                      {isViergeMode ? "............... %" : `% ${mathW4AvgPercent}`}
                    </td>
                    <td className="border-2 border-black py-2"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Printable CSS Helper */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #print-area-level1-tracking, #print-area-level1-tracking * {
            visibility: visible;
          }
          #print-area-level1-tracking {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 10px;
          }
          @page {
            size: A4 landscape;
            margin: 8mm;
          }
        }
      `}</style>
    </div>
  );
};
