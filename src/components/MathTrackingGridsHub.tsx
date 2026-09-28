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
  Calculator,
  Layers,
  Eye,
  Info,
  Sliders,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  BookOpen,
} from "lucide-react";
import * as XLSX from "xlsx";
import { TeacherProfile, TabKey } from "../types";
import { generatePdfFromElement } from "../utils/pdfGenerator";

export type MathGridPageType = "level2" | "level3_4" | "level5_6" | "excellence" | "all";

export interface StudentMathTrackRow {
  id: string;
  num: number;
  fullName: string;
  preTest: string; // الرائز القبلي
  postTest: string; // الرائز البعدي

  // Page 1: المستوى 2 - لبنة الجمع
  p1_w1_num: "+" | "-" | "";
  p1_w1_op: "+" | "-" | "";
  p1_w1_prob: "+" | "-" | "";
  p1_w2_num: "+" | "-" | "";
  p1_w2_op: "+" | "-" | "";
  p1_w2_prob: "+" | "-" | "";
  p1_w3_num: "+" | "-" | "";
  p1_w3_op: "+" | "-" | "";
  p1_w3_prob: "+" | "-" | "";
  p1_w4_num: "+" | "-" | "";
  p1_w4_op: "+" | "-" | "";
  p1_w4_prob: "+" | "-" | "";

  // Page 2: المستوى 3 / 4 - المسار 1 / 2 (جمع، طرح، ضرب)
  p2_add_num: "+" | "-" | "";
  p2_add_op: "+" | "-" | "";
  p2_add_prob: "+" | "-" | "";
  p2_sub_num: "+" | "-" | "";
  p2_sub_op: "+" | "-" | "";
  p2_sub_prob: "+" | "-" | "";
  p2_mul_num: "+" | "-" | "";
  p2_mul_op: "+" | "-" | "";
  p2_mul_prob: "+" | "-" | "";

  // Page 3: المستوى 5 / 6 - المسار 1 / 2 (جمع، طرح، ضرب، قسمة، التحدي)
  p3_add_num: "+" | "-" | "";
  p3_add_op: "+" | "-" | "";
  p3_add_prob: "+" | "-" | "";
  p3_sub_num: "+" | "-" | "";
  p3_sub_op: "+" | "-" | "";
  p3_sub_prob: "+" | "-" | "";
  p3_mul_num: "+" | "-" | "";
  p3_mul_op: "+" | "-" | "";
  p3_mul_prob: "+" | "-" | "";
  p3_div_num: "+" | "-" | "";
  p3_div_op: "+" | "-" | "";
  p3_div_prob: "+" | "-" | "";
  p3_chal_num: "+" | "-" | "";
  p3_chal_op: "+" | "-" | "";
  p3_chal_prob: "+" | "-" | "";

  // Page 4: المستوى 5 / 6 - مسار التميز (كسرية، عشرية، هندسة وقياس)
  p4_frac_num: "+" | "-" | "";
  p4_frac_op: "+" | "-" | "";
  p4_frac_prob: "+" | "-" | "";
  p4_dec_num: "+" | "-" | "";
  p4_dec_op: "+" | "-" | "";
  p4_dec_prob: "+" | "-" | "";
  p4_geo_trans: "+" | "-" | ""; // تحويلات
  p4_geo_const: "+" | "-" | ""; // إنشاءات هندسية
  p4_geo_prob: "+" | "-" | ""; // المسائل
}

const SAMPLE_NAMES = [
  "آدم الإدريسي", "مريم التازي", "يوسف العلمي", "فاطمة الزهراء بناني", "ياسين المرابط",
  "أميمة العلوي", "حمزة بوزيان", "هبة الصقلي", "ريان بنشقرون", "سارة الحسني",
  "محمد أمين الفاسي", "سلمى الشرايبي", "أنس البقالي", "إسراء الورتي", "عمر التلمساني",
  "خديجة الكتاني", "زكرياء الناصري", "نهال برادة", "أيوب المنصوري", "ملاك القادري",
  "طارق الصالحي", "إيمان الوزاني", "بدر الصنهاجي", "هاجر بنيحيى", "وليد الجوهري",
  "زينب الزروالي", "سفيان اليعقوبي", "دنيا الأندلسي", "مهدي الخياط", "سناء الداودي"
];

const generateInitialMathStudents = (): StudentMathTrackRow[] => {
  return Array.from({ length: 30 }, (_, index) => {
    const i = index + 1;
    const isSuccess = (mod: number) => (i % mod !== 0 ? "+" : "-");

    return {
      id: `math-st-${i}`,
      num: i,
      fullName: SAMPLE_NAMES[index] || `تلميذ(ة) رقم ${i}`,
      preTest: i % 4 === 0 ? "غير متمكن" : "متمكن",
      postTest: "متمكن",

      // P1: Level 2
      p1_w1_num: isSuccess(4),
      p1_w1_op: isSuccess(3),
      p1_w1_prob: isSuccess(5),
      p1_w2_num: isSuccess(5),
      p1_w2_op: isSuccess(4),
      p1_w2_prob: isSuccess(4),
      p1_w3_num: isSuccess(6),
      p1_w3_op: isSuccess(3),
      p1_w3_prob: isSuccess(4),
      p1_w4_num: "+",
      p1_w4_op: isSuccess(5),
      p1_w4_prob: isSuccess(4),

      // P2: Levels 3/4
      p2_add_num: isSuccess(5),
      p2_add_op: isSuccess(4),
      p2_add_prob: isSuccess(5),
      p2_sub_num: isSuccess(4),
      p2_sub_op: isSuccess(3),
      p2_sub_prob: isSuccess(4),
      p2_mul_num: isSuccess(5),
      p2_mul_op: isSuccess(4),
      p2_mul_prob: isSuccess(6),

      // P3: Levels 5/6 Track 1/2
      p3_add_num: "+",
      p3_add_op: isSuccess(6),
      p3_add_prob: isSuccess(5),
      p3_sub_num: isSuccess(5),
      p3_sub_op: isSuccess(4),
      p3_sub_prob: isSuccess(5),
      p3_mul_num: isSuccess(4),
      p3_mul_op: isSuccess(3),
      p3_mul_prob: isSuccess(4),
      p3_div_num: isSuccess(5),
      p3_div_op: isSuccess(4),
      p3_div_prob: isSuccess(5),
      p3_chal_num: isSuccess(4),
      p3_chal_op: isSuccess(3),
      p3_chal_prob: isSuccess(4),

      // P4: Excellence Track
      p4_frac_num: isSuccess(4),
      p4_frac_op: isSuccess(3),
      p4_frac_prob: isSuccess(5),
      p4_dec_num: isSuccess(5),
      p4_dec_op: isSuccess(4),
      p4_dec_prob: isSuccess(4),
      p4_geo_trans: isSuccess(4),
      p4_geo_const: isSuccess(3),
      p4_geo_prob: isSuccess(4),
    };
  });
};

interface MathTrackingGridsHubProps {
  teacherProfile: TeacherProfile;
  onNavigateToTab?: (tab: TabKey) => void;
}

export const MathTrackingGridsHub: React.FC<MathTrackingGridsHubProps> = ({
  teacherProfile,
  onNavigateToTab,
}) => {
  const [activePage, setActivePage] = useState<MathGridPageType>("level2");
  const [isViergeMode, setIsViergeMode] = useState<boolean>(false);
  const [institution, setInstitution] = useState<string>(teacherProfile.schoolName || "مدرسة الريادة الابتدائية");
  const [teacherName, setTeacherName] = useState<string>(teacherProfile.fullName || "الأستاذ(ة)");
  const [schoolYear, setSchoolYear] = useState<string>(teacherProfile.academicYear || "2026/2027");
  const [className, setClassName] = useState<string>("المستوى الثاني ابتدائي - الفوج 1");
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);

  const [students, setStudents] = useState<StudentMathTrackRow[]>(() => {
    try {
      const saved = localStorage.getItem("math_tracking_grids_storage_v1");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return generateInitialMathStudents();
  });

  const p1Ref = useRef<HTMLDivElement>(null);
  const p2Ref = useRef<HTMLDivElement>(null);
  const p3Ref = useRef<HTMLDivElement>(null);
  const p4Ref = useRef<HTMLDivElement>(null);
  const allRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem("math_tracking_grids_storage_v1", JSON.stringify(students));
    } catch (e) {
      console.error(e);
    }
  }, [students]);

  // Helper calculation for validation percentage
  // Note rule: "لحساب نسبة التصديق على اللبنة نعتمد سؤال العمليات فقط" (أو سؤال الإنشاءات الهندسية بالنسبة للهندسة والقياس)
  const totalStudents = students.length || 1;

  const calcPercent = (field: keyof StudentMathTrackRow) => {
    const successCount = students.filter(s => s[field] === "+").length;
    return Math.round((successCount / totalStudents) * 100);
  };

  // P1 percentages (based on op: العمليات)
  const p1_w1_pct = calcPercent("p1_w1_op");
  const p1_w2_pct = calcPercent("p1_w2_op");
  const p1_w3_pct = calcPercent("p1_w3_op");
  const p1_w4_pct = calcPercent("p1_w4_op");

  // P2 percentages (based on op: العمليات)
  const p2_add_pct = calcPercent("p2_add_op");
  const p2_sub_pct = calcPercent("p2_sub_op");
  const p2_mul_pct = calcPercent("p2_mul_op");

  // P3 percentages (based on op: العمليات)
  const p3_add_pct = calcPercent("p3_add_op");
  const p3_sub_pct = calcPercent("p3_sub_op");
  const p3_mul_pct = calcPercent("p3_mul_op");
  const p3_div_pct = calcPercent("p3_div_op");
  const p3_chal_pct = calcPercent("p3_chal_op");

  // P4 percentages (based on op for fractions/decimals, and const for geometry)
  const p4_frac_pct = calcPercent("p4_frac_op");
  const p4_dec_pct = calcPercent("p4_dec_op");
  const p4_geo_pct = calcPercent("p4_geo_const");

  // Toggle cell between "+", "-", and ""
  const handleToggleCell = (id: string, field: keyof StudentMathTrackRow) => {
    if (isViergeMode) return;
    setStudents(prev =>
      prev.map(st => {
        if (st.id === id) {
          const current = st[field] as string;
          let nextVal: "+" | "-" | "" = "+";
          if (current === "+") nextVal = "-";
          else if (current === "-") nextVal = "";
          else nextVal = "+";
          return { ...st, [field]: nextVal };
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

  const handleQuickFillAll = (val: "+" | "-") => {
    setStudents(prev =>
      prev.map(st => ({
        ...st,
        p1_w1_num: val, p1_w1_op: val, p1_w1_prob: val,
        p1_w2_num: val, p1_w2_op: val, p1_w2_prob: val,
        p1_w3_num: val, p1_w3_op: val, p1_w3_prob: val,
        p1_w4_num: val, p1_w4_op: val, p1_w4_prob: val,
        p2_add_num: val, p2_add_op: val, p2_add_prob: val,
        p2_sub_num: val, p2_sub_op: val, p2_sub_prob: val,
        p2_mul_num: val, p2_mul_op: val, p2_mul_prob: val,
        p3_add_num: val, p3_add_op: val, p3_add_prob: val,
        p3_sub_num: val, p3_sub_op: val, p3_sub_prob: val,
        p3_mul_num: val, p3_mul_op: val, p3_mul_prob: val,
        p3_div_num: val, p3_div_op: val, p3_div_prob: val,
        p3_chal_num: val, p3_chal_op: val, p3_chal_prob: val,
        p4_frac_num: val, p4_frac_op: val, p4_frac_prob: val,
        p4_dec_num: val, p4_dec_op: val, p4_dec_prob: val,
        p4_geo_trans: val, p4_geo_const: val, p4_geo_prob: val,
      }))
    );
  };

  const handleReset = () => {
    if (confirm("هل تريد استرجاع النموذج التجريبي المعبأ؟")) {
      setStudents(generateInitialMathStudents());
    }
  };

  const handleClear = () => {
    if (confirm("هل تريد تفريغ جميع أسماء التلاميذ وبيانات التتبع؟")) {
      setStudents(
        Array.from({ length: 30 }, (_, index) => ({
          id: `math-st-${index + 1}`,
          num: index + 1,
          fullName: "",
          preTest: "",
          postTest: "",
          p1_w1_num: "", p1_w1_op: "", p1_w1_prob: "",
          p1_w2_num: "", p1_w2_op: "", p1_w2_prob: "",
          p1_w3_num: "", p1_w3_op: "", p1_w3_prob: "",
          p1_w4_num: "", p1_w4_op: "", p1_w4_prob: "",
          p2_add_num: "", p2_add_op: "", p2_add_prob: "",
          p2_sub_num: "", p2_sub_op: "", p2_sub_prob: "",
          p2_mul_num: "", p2_mul_op: "", p2_mul_prob: "",
          p3_add_num: "", p3_add_op: "", p3_add_prob: "",
          p3_sub_num: "", p3_sub_op: "", p3_sub_prob: "",
          p3_mul_num: "", p3_mul_op: "", p3_mul_prob: "",
          p3_div_num: "", p3_div_op: "", p3_div_prob: "",
          p3_chal_num: "", p3_chal_op: "", p3_chal_prob: "",
          p4_frac_num: "", p4_frac_op: "", p4_frac_prob: "",
          p4_dec_num: "", p4_dec_op: "", p4_dec_prob: "",
          p4_geo_trans: "", p4_geo_const: "", p4_geo_prob: "",
        }))
      );
    }
  };

  const handleAddRow = () => {
    const nextNum = students.length + 1;
    setStudents(prev => [
      ...prev,
      {
        id: `math-st-${Date.now()}`,
        num: nextNum,
        fullName: `تلميذ(ة) رقم ${nextNum}`,
        preTest: "",
        postTest: "",
        p1_w1_num: "", p1_w1_op: "", p1_w1_prob: "",
        p1_w2_num: "", p1_w2_op: "", p1_w2_prob: "",
        p1_w3_num: "", p1_w3_op: "", p1_w3_prob: "",
        p1_w4_num: "", p1_w4_op: "", p1_w4_prob: "",
        p2_add_num: "", p2_add_op: "", p2_add_prob: "",
        p2_sub_num: "", p2_sub_op: "", p2_sub_prob: "",
        p2_mul_num: "", p2_mul_op: "", p2_mul_prob: "",
        p3_add_num: "", p3_add_op: "", p3_add_prob: "",
        p3_sub_num: "", p3_sub_op: "", p3_sub_prob: "",
        p3_mul_num: "", p3_mul_op: "", p3_mul_prob: "",
        p3_div_num: "", p3_div_op: "", p3_div_prob: "",
        p3_chal_num: "", p3_chal_op: "", p3_chal_prob: "",
        p4_frac_num: "", p4_frac_op: "", p4_frac_prob: "",
        p4_dec_num: "", p4_dec_op: "", p4_dec_prob: "",
        p4_geo_trans: "", p4_geo_const: "", p4_geo_prob: "",
      },
    ]);
  };

  // Export to Excel
  const handleExportExcel = () => {
    const wb = XLSX.utils.book_new();

    // Sheet 1: المستوى 2
    const s1 = students.map(s => ({
      "ر.ت": s.num,
      "الاسم والنسب": s.fullName,
      "الرائز القبلي": s.preTest,
      "أ1 - الأعداد": s.p1_w1_num,
      "أ1 - العمليات": s.p1_w1_op,
      "أ1 - المسائل": s.p1_w1_prob,
      "أ2 - الأعداد": s.p1_w2_num,
      "أ2 - العمليات": s.p1_w2_op,
      "أ2 - المسائل": s.p1_w2_prob,
      "أ3 - الأعداد": s.p1_w3_num,
      "أ3 - العمليات": s.p1_w3_op,
      "أ3 - المسائل": s.p1_w3_prob,
      "أ4 - الأعداد": s.p1_w4_num,
      "أ4 - العمليات": s.p1_w4_op,
      "أ4 - المسائل": s.p1_w4_prob,
      "الرائز البعدي": s.postTest,
    }));
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(s1), "المستوى 2 - لبنة الجمع");

    // Sheet 2: المستوى 3 و 4
    const s2 = students.map(s => ({
      "ر.ت": s.num,
      "الاسم والنسب": s.fullName,
      "الرائز القبلي": s.preTest,
      "جمع - الأعداد": s.p2_add_num,
      "جمع - العمليات": s.p2_add_op,
      "جمع - المسائل": s.p2_add_prob,
      "طرح - الأعداد": s.p2_sub_num,
      "طرح - العمليات": s.p2_sub_op,
      "طرح - المسائل": s.p2_sub_prob,
      "ضرب - الأعداد": s.p2_mul_num,
      "ضرب - العمليات": s.p2_mul_op,
      "ضرب - المسائل": s.p2_mul_prob,
      "الرائز البعدي": s.postTest,
    }));
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(s2), "المستوى 3-4 (المسار 1-2)");

    // Sheet 3: المستوى 5 و 6
    const s3 = students.map(s => ({
      "ر.ت": s.num,
      "الاسم والنسب": s.fullName,
      "الرائز القبلي": s.preTest,
      "جمع - أعداد": s.p3_add_num, "جمع - عمليات": s.p3_add_op, "جمع - مسائل": s.p3_add_prob,
      "طرح - أعداد": s.p3_sub_num, "طرح - عمليات": s.p3_sub_op, "طرح - مسائل": s.p3_sub_prob,
      "ضرب - أعداد": s.p3_mul_num, "ضرب - عمليات": s.p3_mul_op, "ضرب - مسائل": s.p3_mul_prob,
      "قسمة - أعداد": s.p3_div_num, "قسمة - عمليات": s.p3_div_op, "قسمة - مسائل": s.p3_div_prob,
      "تحدي - أعداد": s.p3_chal_num, "تحدي - عمليات": s.p3_chal_op, "تحدي - مسائل": s.p3_chal_prob,
      "الرائز البعدي": s.postTest,
    }));
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(s3), "المستوى 5-6 (المسار 1-2)");

    // Sheet 4: مسار التميز
    const s4 = students.map(s => ({
      "ر.ت": s.num,
      "الاسم والنسب": s.fullName,
      "الرائز القبلي": s.preTest,
      "أعداد كسرية - أعداد": s.p4_frac_num, "أعداد كسرية - عمليات": s.p4_frac_op, "أعداد كسرية - مسائل": s.p4_frac_prob,
      "أعداد عشرية - أعداد": s.p4_dec_num, "أعداد عشرية - عمليات": s.p4_dec_op, "أعداد عشرية - مسائل": s.p4_dec_prob,
      "هندسة - تحويلات": s.p4_geo_trans, "هندسة - إنشاءات": s.p4_geo_const, "هندسة - مسائل": s.p4_geo_prob,
      "الرائز البعدي": s.postTest,
    }));
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(s4), "المستوى 5-6 (مسار التميز)");

    XLSX.writeFile(wb, `شبكات_تتبع_مادة_الرياضيات_جميع_المستويات_2026_2027.xlsx`);
  };

  const handleDownloadPdf = async (targetRef: React.RefObject<HTMLDivElement | null>, name: string) => {
    if (!targetRef.current) return;
    setIsGeneratingPdf(true);
    try {
      await generatePdfFromElement(targetRef.current, {
        filename: `${name}.pdf`,
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

  // Render Cell with (+), (-) or empty
  const renderValueCell = (id: string, field: keyof StudentMathTrackRow, bgColor?: string) => {
    const val = students.find(s => s.id === id)?.[field] as string;
    return (
      <td
        onClick={() => handleToggleCell(id, field)}
        className={`border border-black py-1 px-1 cursor-pointer select-none font-bold text-center transition-colors ${
          val === "+"
            ? "text-emerald-800 bg-emerald-100/40 hover:bg-emerald-200/50"
            : val === "-"
            ? "text-rose-700 bg-rose-100/40 hover:bg-rose-200/50"
            : bgColor ? `${bgColor} hover:bg-slate-200/60` : "hover:bg-slate-100"
        }`}
        title="انقر للتغيير (+ / - / فارغ)"
      >
        {!isViergeMode ? val : ""}
      </td>
    );
  };

  return (
    <div className="space-y-6 pb-16 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-blue-700/50">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-200 text-xs font-bold">
              <Calculator className="w-3.5 h-3.5 text-amber-300" />
              <span>الوثائق الرسمية لمدارس الريادة والمنهاج المنقح - مادة الرياضيات</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              شبكات تتبع مادة الرياضيات لجميع المستويات والمسارات
            </h1>
            <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed">
              الشبكات المعتمدة رسمياً لتتبع تقدم وتحكم المتعلمين في مادة الرياضيات وفق مقاربة TaRL ومدارس الريادة (المستوى 2، المستويات 3 و 4، المستويات 5 و 6، ومسار التميز) مع حساب آلي لنسب التصديق (+) و (-).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            <button
              onClick={() => window.print()}
              className="bg-white hover:bg-slate-100 text-slate-900 font-bold px-4 py-2.5 rounded-xl text-sm shadow-md inline-flex items-center gap-2 transition cursor-pointer flex-1 sm:flex-none justify-center"
            >
              <Printer className="w-4 h-4 text-blue-700" />
              <span>طباعة ورقية (A4)</span>
            </button>
            <button
              onClick={() => {
                const target =
                  activePage === "level2"
                    ? p1Ref
                    : activePage === "level3_4"
                    ? p2Ref
                    : activePage === "level5_6"
                    ? p3Ref
                    : activePage === "excellence"
                    ? p4Ref
                    : allRef;
                handleDownloadPdf(target, `شبكة_تتبع_الرياضيات_${activePage}`);
              }}
              disabled={isGeneratingPdf}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2.5 rounded-xl text-sm shadow-md inline-flex items-center gap-2 transition cursor-pointer flex-1 sm:flex-none justify-center disabled:opacity-50"
            >
              <Download className="w-4 h-4 text-amber-300" />
              <span>{isGeneratingPdf ? "جاري التوليد..." : "تنزيل PDF"}</span>
            </button>
            <button
              onClick={handleExportExcel}
              className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm shadow-md inline-flex items-center gap-2 transition cursor-pointer flex-1 sm:flex-none justify-center"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-300" />
              <span>تصدير Excel (4 صفحات)</span>
            </button>
          </div>
        </div>

        {/* Level Switcher */}
        <div className="mt-6 pt-5 border-t border-blue-700/40 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 bg-slate-950/40 p-1.5 rounded-2xl border border-white/10">
            <button
              onClick={() => {
                setActivePage("level2");
                setClassName("المستوى الثاني ابتدائي - الفوج 1");
              }}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                activePage === "level2"
                  ? "bg-amber-600 text-white shadow-md"
                  : "text-blue-100 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>المستوى 2 (لبنة الجمع)</span>
            </button>
            <button
              onClick={() => {
                setActivePage("level3_4");
                setClassName("المستوى الثالث / الرابع - المسار 1 / 2");
              }}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                activePage === "level3_4"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-blue-100 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>المستوى 3 / 4 (المسار 1 / 2)</span>
            </button>
            <button
              onClick={() => {
                setActivePage("level5_6");
                setClassName("المستوى الخامس / السادس - المسار 1 / 2");
              }}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                activePage === "level5_6"
                  ? "bg-rose-600 text-white shadow-md"
                  : "text-blue-100 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>المستوى 5 / 6 (المسار 1 / 2)</span>
            </button>
            <button
              onClick={() => {
                setActivePage("excellence");
                setClassName("المستوى الخامس / السادس - مسار التميز");
              }}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                activePage === "excellence"
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-blue-100 hover:text-white hover:bg-white/5"
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>المستوى 5 / 6 (مسار التميز)</span>
            </button>
            <button
              onClick={() => setActivePage("all")}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer ${
                activePage === "all"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "text-blue-100 hover:text-white hover:bg-white/5"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>عرض جميع المستويات (4 صفحات)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsViergeMode(!isViergeMode)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition cursor-pointer inline-flex items-center gap-2 ${
                isViergeMode
                  ? "bg-amber-400 text-slate-950 border-amber-300 shadow-sm"
                  : "bg-white/10 text-blue-100 hover:bg-white/20 border-white/20"
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
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">الأستاذ(ة)</label>
            <input
              type="text"
              value={teacherName}
              onChange={e => setTeacherName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">القسم / الفوج</label>
            <input
              type="text"
              value={className}
              onChange={e => setClassName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">الموسم الدراسي</label>
            <input
              type="text"
              value={schoolYear}
              onChange={e => setSchoolYear(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 w-full sm:w-auto justify-end">
          {!isViergeMode && (
            <>
              <button
                onClick={() => handleQuickFillAll("+")}
                className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200 transition cursor-pointer inline-flex items-center gap-1.5"
                title="تحديد كل الخانات كتوفق (+)"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>تعبئة الكل (+)</span>
              </button>
              <button
                onClick={() => handleQuickFillAll("-")}
                className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold rounded-lg border border-rose-200 transition cursor-pointer inline-flex items-center gap-1.5"
                title="تحديد كل الخانات كإخفاق (-)"
              >
                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                <span>تعبئة الكل (-)</span>
              </button>
              <button
                onClick={handleAddRow}
                className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold rounded-lg border border-blue-200 transition cursor-pointer inline-flex items-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5 text-blue-600" />
                <span>إضافة سطر</span>
              </button>
              <button
                onClick={handleReset}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg border border-slate-200 transition cursor-pointer inline-flex items-center gap-1.5"
                title="استرجاع العينة"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>استعادة</span>
              </button>
              <button
                onClick={handleClear}
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

      {/* RENDER GRIDS */}
      <div id="print-area-math-tracking" ref={allRef} className="space-y-12" style={{ direction: "rtl" }}>
        
        {/* ========================================================
            PAGE 1: المستوى 2 - لبنة الجمع
           ======================================================== */}
        {(activePage === "level2" || activePage === "all") && (
          <div
            ref={p1Ref}
            className="bg-white rounded-2xl p-6 border border-slate-300 shadow-md text-slate-900 print:p-0 print:border-none print:shadow-none print:m-0 print:break-after-page"
          >
            {/* Header */}
            <div className="text-center mb-4 space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                شبكة التتبع – رياضيات / المستوى: 2
              </h2>
              <div className="inline-block bg-amber-100 px-4 py-1 rounded-full text-sm font-black text-amber-900 border border-amber-300">
                لبنة الجمع
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
                  <tr className="bg-slate-100 font-bold text-black">
                    <th rowSpan={2} className="border border-black px-1.5 py-2 w-10">ر.ت</th>
                    <th rowSpan={2} className="border border-black px-3 py-2 text-right min-w-[160px] sm:min-w-[190px]">الاسم والنسب</th>
                    <th rowSpan={2} className="border border-black px-2 py-2 w-20">الرائز القبلي</th>
                    <th colSpan={3} className="border border-black py-1.5 bg-[#fef3c7]">الأسبوع 1</th>
                    <th colSpan={3} className="border border-black py-1.5 bg-[#fce7f3]">الأسبوع 2</th>
                    <th colSpan={3} className="border border-black py-1.5 bg-[#d1fae5]">الأسبوع 3</th>
                    <th colSpan={3} className="border border-black py-1.5 bg-[#e0f2fe]">الأسبوع 4</th>
                    <th rowSpan={2} className="border border-black px-2 py-2 w-20">الرائز البعدي</th>
                  </tr>
                  <tr className="bg-slate-50 font-bold text-black text-[10px] sm:text-[11px]">
                    <th className="border border-black px-1 py-1 w-12 bg-[#fef3c7]/60">الأعداد</th>
                    <th className="border border-black px-1 py-1 w-12 bg-[#fef3c7]/80">العمليات</th>
                    <th className="border border-black px-1 py-1 w-12 bg-[#fef3c7]/60">المسائل</th>

                    <th className="border border-black px-1 py-1 w-12 bg-[#fce7f3]/60">الأعداد</th>
                    <th className="border border-black px-1 py-1 w-12 bg-[#fce7f3]/80">العمليات</th>
                    <th className="border border-black px-1 py-1 w-12 bg-[#fce7f3]/60">المسائل</th>

                    <th className="border border-black px-1 py-1 w-12 bg-[#d1fae5]/60">الأعداد</th>
                    <th className="border border-black px-1 py-1 w-12 bg-[#d1fae5]/80">العمليات</th>
                    <th className="border border-black px-1 py-1 w-12 bg-[#d1fae5]/60">المسائل</th>

                    <th className="border border-black px-1 py-1 w-12 bg-[#e0f2fe]/60">الأعداد</th>
                    <th className="border border-black px-1 py-1 w-12 bg-[#e0f2fe]/80">العمليات</th>
                    <th className="border border-black px-1 py-1 w-12 bg-[#e0f2fe]/60">المسائل</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((st) => (
                    <tr key={`p1-${st.id}`} className="hover:bg-slate-50/80">
                      <td className="border border-black py-1 font-bold text-slate-800">{st.num}</td>
                      <td className="border border-black px-2 py-1 text-right font-medium text-slate-900">
                        {isViergeMode ? (
                          <span className="text-transparent">.</span>
                        ) : (
                          <input
                            type="text"
                            value={st.fullName}
                            onChange={e => handleNameChange(st.id, e.target.value)}
                            className="w-full bg-transparent border-none p-0 text-slate-900 font-medium focus:outline-hidden focus:bg-white focus:ring-1 focus:ring-blue-500 rounded px-1"
                          />
                        )}
                      </td>
                      <td className="border border-black py-1">{isViergeMode ? "" : st.preTest}</td>

                      {/* W1 */}
                      {renderValueCell(st.id, "p1_w1_num", "bg-[#fef3c7]/20")}
                      {renderValueCell(st.id, "p1_w1_op", "bg-[#fef3c7]/40 font-black")}
                      {renderValueCell(st.id, "p1_w1_prob", "bg-[#fef3c7]/20")}

                      {/* W2 */}
                      {renderValueCell(st.id, "p1_w2_num", "bg-[#fce7f3]/20")}
                      {renderValueCell(st.id, "p1_w2_op", "bg-[#fce7f3]/40 font-black")}
                      {renderValueCell(st.id, "p1_w2_prob", "bg-[#fce7f3]/20")}

                      {/* W3 */}
                      {renderValueCell(st.id, "p1_w3_num", "bg-[#d1fae5]/20")}
                      {renderValueCell(st.id, "p1_w3_op", "bg-[#d1fae5]/40 font-black")}
                      {renderValueCell(st.id, "p1_w3_prob", "bg-[#d1fae5]/20")}

                      {/* W4 */}
                      {renderValueCell(st.id, "p1_w4_num", "bg-[#e0f2fe]/20")}
                      {renderValueCell(st.id, "p1_w4_op", "bg-[#e0f2fe]/40 font-black")}
                      {renderValueCell(st.id, "p1_w4_prob", "bg-[#e0f2fe]/20")}

                      <td className="border border-black py-1 font-bold text-emerald-700">{isViergeMode ? "" : st.postTest}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-100 font-black text-black">
                    <td colSpan={3} className="border-2 border-black py-2 text-center text-xs font-black">
                      نسبة التصديق
                    </td>
                    <td colSpan={3} className="border-2 border-black py-2 text-center font-bold bg-[#fef3c7]/70">
                      {isViergeMode ? "............... %" : `% ${p1_w1_pct}`}
                    </td>
                    <td colSpan={3} className="border-2 border-black py-2 text-center font-bold bg-[#fce7f3]/70">
                      {isViergeMode ? "............... %" : `% ${p1_w2_pct}`}
                    </td>
                    <td colSpan={3} className="border-2 border-black py-2 text-center font-bold bg-[#d1fae5]/70">
                      {isViergeMode ? "............... %" : `% ${p1_w3_pct}`}
                    </td>
                    <td colSpan={3} className="border-2 border-black py-2 text-center font-bold bg-[#e0f2fe]/70">
                      {isViergeMode ? "............... %" : `% ${p1_w4_pct}`}
                    </td>
                    <td className="border-2 border-black py-2"></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Official Footer Notes */}
            <div className="mt-3 text-[11px] text-slate-700 space-y-0.5 border-t border-slate-200 pt-2 font-medium">
              <p>- في حالة التوفق في السؤال نضع (+) وفي حالة الإخفاق نضع (-)</p>
              <p>- لحساب نسبة التصديق على اللبنة نعتمد سؤال العمليات فقط.</p>
            </div>
          </div>
        )}

        {/* ========================================================
            PAGE 2: المستويان الثالث / الرابع - المسار 1 / 2
           ======================================================== */}
        {(activePage === "level3_4" || activePage === "all") && (
          <div
            ref={p2Ref}
            className="bg-white rounded-2xl p-6 border border-slate-300 shadow-md text-slate-900 print:p-0 print:border-none print:shadow-none print:m-0 print:break-after-page"
          >
            {/* Header */}
            <div className="text-center mb-4 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-500 font-bold px-1">
                <span>المسار 1 / 2</span>
                <span>المستوى: الثالث / الرابع</span>
                <span>شبكة التتبع – رياضيات</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-1">
                شبكة التتبع – رياضيات (المستوى: الثالث / الرابع - المسار 1 / 2)
              </h2>
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
                  <tr className="bg-slate-100 font-bold text-black">
                    <th rowSpan={2} className="border border-black px-1.5 py-2 w-10">ر.ت</th>
                    <th rowSpan={2} className="border border-black px-3 py-2 text-right min-w-[170px] sm:min-w-[200px]">الاسم والنسب</th>
                    <th rowSpan={2} className="border border-black px-2 py-2 w-20">الرائز القبلي</th>
                    <th colSpan={3} className="border border-black py-1.5 bg-[#fef3c7]">لبنة جمع</th>
                    <th colSpan={3} className="border border-black py-1.5 bg-[#fce7f3]">لبنة طرح</th>
                    <th colSpan={3} className="border border-black py-1.5 bg-[#d1fae5]">لبنة ضرب</th>
                    <th rowSpan={2} className="border border-black px-2 py-2 w-20">الرائز البعدي</th>
                  </tr>
                  <tr className="bg-slate-50 font-bold text-black text-[10px] sm:text-[11px]">
                    <th className="border border-black px-1 py-1 w-14 bg-[#fef3c7]/60">الأعداد</th>
                    <th className="border border-black px-1 py-1 w-14 bg-[#fef3c7]/80">العمليات</th>
                    <th className="border border-black px-1 py-1 w-14 bg-[#fef3c7]/60">المسائل</th>

                    <th className="border border-black px-1 py-1 w-14 bg-[#fce7f3]/60">الأعداد</th>
                    <th className="border border-black px-1 py-1 w-14 bg-[#fce7f3]/80">العمليات</th>
                    <th className="border border-black px-1 py-1 w-14 bg-[#fce7f3]/60">المسائل</th>

                    <th className="border border-black px-1 py-1 w-14 bg-[#d1fae5]/60">الأعداد</th>
                    <th className="border border-black px-1 py-1 w-14 bg-[#d1fae5]/80">العمليات</th>
                    <th className="border border-black px-1 py-1 w-14 bg-[#d1fae5]/60">المسائل</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((st) => (
                    <tr key={`p2-${st.id}`} className="hover:bg-slate-50/80">
                      <td className="border border-black py-1 font-bold text-slate-800">{st.num}</td>
                      <td className="border border-black px-2 py-1 text-right font-medium text-slate-900">
                        {isViergeMode ? (
                          <span className="text-transparent">.</span>
                        ) : (
                          <input
                            type="text"
                            value={st.fullName}
                            onChange={e => handleNameChange(st.id, e.target.value)}
                            className="w-full bg-transparent border-none p-0 text-slate-900 font-medium focus:outline-hidden focus:bg-white focus:ring-1 focus:ring-blue-500 rounded px-1"
                          />
                        )}
                      </td>
                      <td className="border border-black py-1">{isViergeMode ? "" : st.preTest}</td>

                      {/* الجمع */}
                      {renderValueCell(st.id, "p2_add_num", "bg-[#fef3c7]/20")}
                      {renderValueCell(st.id, "p2_add_op", "bg-[#fef3c7]/40 font-black")}
                      {renderValueCell(st.id, "p2_add_prob", "bg-[#fef3c7]/20")}

                      {/* الطرح */}
                      {renderValueCell(st.id, "p2_sub_num", "bg-[#fce7f3]/20")}
                      {renderValueCell(st.id, "p2_sub_op", "bg-[#fce7f3]/40 font-black")}
                      {renderValueCell(st.id, "p2_sub_prob", "bg-[#fce7f3]/20")}

                      {/* الضرب */}
                      {renderValueCell(st.id, "p2_mul_num", "bg-[#d1fae5]/20")}
                      {renderValueCell(st.id, "p2_mul_op", "bg-[#d1fae5]/40 font-black")}
                      {renderValueCell(st.id, "p2_mul_prob", "bg-[#d1fae5]/20")}

                      <td className="border border-black py-1 font-bold text-emerald-700">{isViergeMode ? "" : st.postTest}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-100 font-black text-black">
                    <td colSpan={3} className="border-2 border-black py-2 text-center text-xs font-black">
                      نسبة التصديق
                    </td>
                    <td colSpan={3} className="border-2 border-black py-2 text-center font-bold bg-[#fef3c7]/70">
                      {isViergeMode ? "............... %" : `% ${p2_add_pct}`}
                    </td>
                    <td colSpan={3} className="border-2 border-black py-2 text-center font-bold bg-[#fce7f3]/70">
                      {isViergeMode ? "............... %" : `% ${p2_sub_pct}`}
                    </td>
                    <td colSpan={3} className="border-2 border-black py-2 text-center font-bold bg-[#d1fae5]/70">
                      {isViergeMode ? "............... %" : `% ${p2_mul_pct}`}
                    </td>
                    <td className="border-2 border-black py-2"></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Official Footer Notes */}
            <div className="mt-3 text-[11px] text-slate-700 space-y-0.5 border-t border-slate-200 pt-2 font-medium">
              <p>- في حالة التوفق في السؤال نضع (+) وفي حالة الإخفاق نضع (-)</p>
              <p>- لحساب نسبة التصديق على اللبنة نعتمد سؤال العمليات فقط.</p>
            </div>
          </div>
        )}

        {/* ========================================================
            PAGE 3: المستويان الخامس / السادس - المسار 1 / 2
           ======================================================== */}
        {(activePage === "level5_6" || activePage === "all") && (
          <div
            ref={p3Ref}
            className="bg-white rounded-2xl p-6 border border-slate-300 shadow-md text-slate-900 print:p-0 print:border-none print:shadow-none print:m-0 print:break-after-page"
          >
            {/* Header */}
            <div className="text-center mb-4 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-500 font-bold px-1">
                <span>المسار 1 / 2</span>
                <span>المستوى: الخامس / السادس</span>
                <span>شبكة التتبع – رياضيات</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-1">
                شبكة التتبع – رياضيات (المستوى: الخامس / السادس - المسار 1 / 2)
              </h2>
              <div className="flex items-center justify-between text-xs text-slate-600 px-2 pt-1 border-b border-slate-200 pb-2 font-medium">
                <span>المؤسسة: <strong>{institution}</strong></span>
                <span>الأستاذ(ة): <strong>{teacherName}</strong></span>
                <span>القسم: <strong>{className}</strong></span>
                <span>الموسم الدراسي: <strong>{schoolYear}</strong></span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border-2 border-black text-center text-[10px] sm:text-xs">
                <thead>
                  <tr className="bg-slate-100 font-bold text-black">
                    <th rowSpan={2} className="border border-black px-1 py-2 w-8">ر.ت</th>
                    <th rowSpan={2} className="border border-black px-2 py-2 text-right min-w-[140px] sm:min-w-[170px]">الاسم والنسب</th>
                    <th rowSpan={2} className="border border-black px-1 py-2 w-16">الرائز القبلي</th>
                    <th colSpan={3} className="border border-black py-1 bg-[#fef3c7]">لبنة جمع</th>
                    <th colSpan={3} className="border border-black py-1 bg-[#fce7f3]">لبنة طرح</th>
                    <th colSpan={3} className="border border-black py-1 bg-[#d1fae5]">لبنة ضرب</th>
                    <th colSpan={3} className="border border-black py-1 bg-[#e0f2fe]">لبنة قسمة</th>
                    <th colSpan={3} className="border border-black py-1 bg-[#f3e8ff]">لبنة التحدي</th>
                    <th rowSpan={2} className="border border-black px-1 py-2 w-16">الرائز البعدي</th>
                  </tr>
                  <tr className="bg-slate-50 font-bold text-black text-[9px] sm:text-[10px]">
                    <th className="border border-black px-0.5 py-1 w-10 bg-[#fef3c7]/60">الأعداد</th>
                    <th className="border border-black px-0.5 py-1 w-10 bg-[#fef3c7]/80">العمليات</th>
                    <th className="border border-black px-0.5 py-1 w-10 bg-[#fef3c7]/60">المسائل</th>

                    <th className="border border-black px-0.5 py-1 w-10 bg-[#fce7f3]/60">الأعداد</th>
                    <th className="border border-black px-0.5 py-1 w-10 bg-[#fce7f3]/80">العمليات</th>
                    <th className="border border-black px-0.5 py-1 w-10 bg-[#fce7f3]/60">المسائل</th>

                    <th className="border border-black px-0.5 py-1 w-10 bg-[#d1fae5]/60">الأعداد</th>
                    <th className="border border-black px-0.5 py-1 w-10 bg-[#d1fae5]/80">العمليات</th>
                    <th className="border border-black px-0.5 py-1 w-10 bg-[#d1fae5]/60">المسائل</th>

                    <th className="border border-black px-0.5 py-1 w-10 bg-[#e0f2fe]/60">الأعداد</th>
                    <th className="border border-black px-0.5 py-1 w-10 bg-[#e0f2fe]/80">العمليات</th>
                    <th className="border border-black px-0.5 py-1 w-10 bg-[#e0f2fe]/60">المسائل</th>

                    <th className="border border-black px-0.5 py-1 w-10 bg-[#f3e8ff]/60">الأعداد</th>
                    <th className="border border-black px-0.5 py-1 w-10 bg-[#f3e8ff]/80">العمليات</th>
                    <th className="border border-black px-0.5 py-1 w-10 bg-[#f3e8ff]/60">المسائل</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((st) => (
                    <tr key={`p3-${st.id}`} className="hover:bg-slate-50/80">
                      <td className="border border-black py-1 font-bold text-slate-800">{st.num}</td>
                      <td className="border border-black px-2 py-1 text-right font-medium text-slate-900">
                        {isViergeMode ? (
                          <span className="text-transparent">.</span>
                        ) : (
                          <input
                            type="text"
                            value={st.fullName}
                            onChange={e => handleNameChange(st.id, e.target.value)}
                            className="w-full bg-transparent border-none p-0 text-slate-900 font-medium focus:outline-hidden focus:bg-white focus:ring-1 focus:ring-blue-500 rounded px-1"
                          />
                        )}
                      </td>
                      <td className="border border-black py-1">{isViergeMode ? "" : st.preTest}</td>

                      {/* الجمع */}
                      {renderValueCell(st.id, "p3_add_num", "bg-[#fef3c7]/20")}
                      {renderValueCell(st.id, "p3_add_op", "bg-[#fef3c7]/40 font-black")}
                      {renderValueCell(st.id, "p3_add_prob", "bg-[#fef3c7]/20")}

                      {/* الطرح */}
                      {renderValueCell(st.id, "p3_sub_num", "bg-[#fce7f3]/20")}
                      {renderValueCell(st.id, "p3_sub_op", "bg-[#fce7f3]/40 font-black")}
                      {renderValueCell(st.id, "p3_sub_prob", "bg-[#fce7f3]/20")}

                      {/* الضرب */}
                      {renderValueCell(st.id, "p3_mul_num", "bg-[#d1fae5]/20")}
                      {renderValueCell(st.id, "p3_mul_op", "bg-[#d1fae5]/40 font-black")}
                      {renderValueCell(st.id, "p3_mul_prob", "bg-[#d1fae5]/20")}

                      {/* القسمة */}
                      {renderValueCell(st.id, "p3_div_num", "bg-[#e0f2fe]/20")}
                      {renderValueCell(st.id, "p3_div_op", "bg-[#e0f2fe]/40 font-black")}
                      {renderValueCell(st.id, "p3_div_prob", "bg-[#e0f2fe]/20")}

                      {/* التحدي */}
                      {renderValueCell(st.id, "p3_chal_num", "bg-[#f3e8ff]/20")}
                      {renderValueCell(st.id, "p3_chal_op", "bg-[#f3e8ff]/40 font-black")}
                      {renderValueCell(st.id, "p3_chal_prob", "bg-[#f3e8ff]/20")}

                      <td className="border border-black py-1 font-bold text-emerald-700">{isViergeMode ? "" : st.postTest}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-100 font-black text-black">
                    <td colSpan={3} className="border-2 border-black py-2 text-center text-xs font-black">
                      نسبة التصديق
                    </td>
                    <td colSpan={3} className="border-2 border-black py-2 text-center font-bold bg-[#fef3c7]/70">
                      {isViergeMode ? "............... %" : `% ${p3_add_pct}`}
                    </td>
                    <td colSpan={3} className="border-2 border-black py-2 text-center font-bold bg-[#fce7f3]/70">
                      {isViergeMode ? "............... %" : `% ${p3_sub_pct}`}
                    </td>
                    <td colSpan={3} className="border-2 border-black py-2 text-center font-bold bg-[#d1fae5]/70">
                      {isViergeMode ? "............... %" : `% ${p3_mul_pct}`}
                    </td>
                    <td colSpan={3} className="border-2 border-black py-2 text-center font-bold bg-[#e0f2fe]/70">
                      {isViergeMode ? "............... %" : `% ${p3_div_pct}`}
                    </td>
                    <td colSpan={3} className="border-2 border-black py-2 text-center font-bold bg-[#f3e8ff]/70">
                      {isViergeMode ? "............... %" : `% ${p3_chal_pct}`}
                    </td>
                    <td className="border-2 border-black py-2"></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Official Footer Notes */}
            <div className="mt-3 text-[11px] text-slate-700 space-y-0.5 border-t border-slate-200 pt-2 font-medium">
              <p>- في حالة التوفق في السؤال نضع (+) وفي حالة الإخفاق نضع (-)</p>
              <p>- لحساب نسبة التصديق على اللبنة نعتمد سؤال العمليات فقط.</p>
            </div>
          </div>
        )}

        {/* ========================================================
            PAGE 4: المستويان الخامس / السادس - مسار التميز
           ======================================================== */}
        {(activePage === "excellence" || activePage === "all") && (
          <div
            ref={p4Ref}
            className="bg-white rounded-2xl p-6 border border-slate-300 shadow-md text-slate-900 print:p-0 print:border-none print:shadow-none print:m-0 print:break-after-page"
          >
            {/* Header */}
            <div className="text-center mb-4 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-500 font-bold px-1">
                <span className="text-purple-700 font-black">مسار التميز</span>
                <span>المستوى: الخامس / السادس</span>
                <span>شبكة التتبع – رياضيات</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-1">
                شبكة التتبع – رياضيات (المستوى: الخامس / السادس - مسار التميز)
              </h2>
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
                  <tr className="bg-slate-100 font-bold text-black">
                    <th rowSpan={2} className="border border-black px-1.5 py-2 w-10">ر.ت</th>
                    <th rowSpan={2} className="border border-black px-3 py-2 text-right min-w-[170px] sm:min-w-[200px]">الاسم والنسب</th>
                    <th rowSpan={2} className="border border-black px-2 py-2 w-20">الرائز القبلي</th>
                    <th colSpan={3} className="border border-black py-1.5 bg-[#fef3c7]">الأعداد الكسرية</th>
                    <th colSpan={3} className="border border-black py-1.5 bg-[#fce7f3]">الأعداد العشرية</th>
                    <th colSpan={3} className="border border-black py-1.5 bg-[#e0f2fe]">الهندسة والقياس</th>
                    <th rowSpan={2} className="border border-black px-2 py-2 w-20">الرائز البعدي</th>
                  </tr>
                  <tr className="bg-slate-50 font-bold text-black text-[10px] sm:text-[11px]">
                    <th className="border border-black px-1 py-1 w-14 bg-[#fef3c7]/60">الأعداد</th>
                    <th className="border border-black px-1 py-1 w-14 bg-[#fef3c7]/80">العمليات</th>
                    <th className="border border-black px-1 py-1 w-14 bg-[#fef3c7]/60">المسائل</th>

                    <th className="border border-black px-1 py-1 w-14 bg-[#fce7f3]/60">الأعداد</th>
                    <th className="border border-black px-1 py-1 w-14 bg-[#fce7f3]/80">العمليات</th>
                    <th className="border border-black px-1 py-1 w-14 bg-[#fce7f3]/60">المسائل</th>

                    <th className="border border-black px-1 py-1 w-14 bg-[#e0f2fe]/60">تحويلات</th>
                    <th className="border border-black px-1 py-1 w-18 bg-[#e0f2fe]/80">إنشاءات هندسية</th>
                    <th className="border border-black px-1 py-1 w-14 bg-[#e0f2fe]/60">المسائل</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((st) => (
                    <tr key={`p4-${st.id}`} className="hover:bg-slate-50/80">
                      <td className="border border-black py-1 font-bold text-slate-800">{st.num}</td>
                      <td className="border border-black px-2 py-1 text-right font-medium text-slate-900">
                        {isViergeMode ? (
                          <span className="text-transparent">.</span>
                        ) : (
                          <input
                            type="text"
                            value={st.fullName}
                            onChange={e => handleNameChange(st.id, e.target.value)}
                            className="w-full bg-transparent border-none p-0 text-slate-900 font-medium focus:outline-hidden focus:bg-white focus:ring-1 focus:ring-blue-500 rounded px-1"
                          />
                        )}
                      </td>
                      <td className="border border-black py-1">{isViergeMode ? "" : st.preTest}</td>

                      {/* الأعداد الكسرية */}
                      {renderValueCell(st.id, "p4_frac_num", "bg-[#fef3c7]/20")}
                      {renderValueCell(st.id, "p4_frac_op", "bg-[#fef3c7]/40 font-black")}
                      {renderValueCell(st.id, "p4_frac_prob", "bg-[#fef3c7]/20")}

                      {/* الأعداد العشرية */}
                      {renderValueCell(st.id, "p4_dec_num", "bg-[#fce7f3]/20")}
                      {renderValueCell(st.id, "p4_dec_op", "bg-[#fce7f3]/40 font-black")}
                      {renderValueCell(st.id, "p4_dec_prob", "bg-[#fce7f3]/20")}

                      {/* الهندسة والقياس */}
                      {renderValueCell(st.id, "p4_geo_trans", "bg-[#e0f2fe]/20")}
                      {renderValueCell(st.id, "p4_geo_const", "bg-[#e0f2fe]/40 font-black")}
                      {renderValueCell(st.id, "p4_geo_prob", "bg-[#e0f2fe]/20")}

                      <td className="border border-black py-1 font-bold text-emerald-700">{isViergeMode ? "" : st.postTest}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-100 font-black text-black">
                    <td colSpan={3} className="border-2 border-black py-2 text-center text-xs font-black">
                      نسبة التصديق
                    </td>
                    <td colSpan={3} className="border-2 border-black py-2 text-center font-bold bg-[#fef3c7]/70">
                      {isViergeMode ? "............... %" : `% ${p4_frac_pct}`}
                    </td>
                    <td colSpan={3} className="border-2 border-black py-2 text-center font-bold bg-[#fce7f3]/70">
                      {isViergeMode ? "............... %" : `% ${p4_dec_pct}`}
                    </td>
                    <td colSpan={3} className="border-2 border-black py-2 text-center font-bold bg-[#e0f2fe]/70">
                      {isViergeMode ? "............... %" : `% ${p4_geo_pct}`}
                    </td>
                    <td className="border-2 border-black py-2"></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Official Footer Notes */}
            <div className="mt-3 text-[11px] text-slate-700 space-y-0.5 border-t border-slate-200 pt-2 font-medium">
              <p>- في حالة التوفق في السؤال نضع (+) وفي حالة الإخفاق نضع (-)</p>
              <p>- لحساب نسبة التصديق على اللبنة نعتمد سؤال العمليات فقط بالنسبة للأعداد وسؤال الإنشاءات الهندسية بالنسبة للهندسة والقياس.</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
