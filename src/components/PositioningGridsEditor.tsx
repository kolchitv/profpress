import React, { useState, useRef, useEffect } from "react";
import {
  FileSpreadsheet,
  Printer,
  Download,
  Plus,
  Trash2,
  Sparkles,
  RotateCcw,
  Edit3,
  Check,
  Upload,
  BarChart3,
  HelpCircle,
  FileCheck2,
  Copy,
  ChevronDown,
  ChevronUp,
  UserPlus,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Info,
} from "lucide-react";
import * as XLSX from "xlsx";
import { TeacherProfile } from "../types";
import { generatePdfFromElement } from "../utils/pdfGenerator";

export interface PositioningStudent {
  id: string;
  number: number;
  fullName: string;
  // اللغة العربية (قراءة)
  arDebutant: boolean;
  arLettre: boolean;
  arMot: boolean;
  arParagraphe: boolean;
  arHistoire: boolean;
  // الفهم
  arCompMaitrise: boolean;
  arCompNonMaitrise: boolean;
  // الرياضيات
  mathDebutant: boolean;
  math1Chiffre: boolean;
  math2Chiffres: boolean;
  mathAddition: boolean;
  mathSoustraction: boolean;
  // المسألة
  mathProbMaitrise: boolean;
  mathProbNonMaitrise: boolean;
  // Français
  frDebutant: boolean;
  frLettre: boolean;
  frMS: boolean;
  frMA: boolean;
  frMGC: boolean;
  // ملاحظات
  remarks: string;
}

export interface PositioningGridMeta {
  teacherName: string;
  somNumber: string;
  schoolName: string;
  gradeLevel: string;
  title: string;
  schoolYear: string;
}

const DEFAULT_META: PositioningGridMeta = {
  teacherName: "محمد الهاشمي",
  somNumber: "1845920",
  schoolName: "م/م ابن خلدون الابتدائية",
  gradeLevel: "المستوى الرابع ابتدائي",
  title: "شبكة تفريغ روائز الموضعة - شتنبر 2026",
  schoolYear: "2026/2027",
};

const SAMPLE_STUDENTS: PositioningStudent[] = [
  {
    id: "st-1",
    number: 1,
    fullName: "آدم الإدريسي",
    arDebutant: false,
    arLettre: false,
    arMot: false,
    arParagraphe: true,
    arHistoire: false,
    arCompMaitrise: true,
    arCompNonMaitrise: false,
    mathDebutant: false,
    math1Chiffre: false,
    math2Chiffres: false,
    mathAddition: true,
    mathSoustraction: false,
    mathProbMaitrise: true,
    mathProbNonMaitrise: false,
    frDebutant: false,
    frLettre: false,
    frMS: true,
    frMA: false,
    frMGC: false,
    remarks: "مستوى جيد عموما",
  },
  {
    id: "st-2",
    number: 2,
    fullName: "إيناس التازي",
    arDebutant: false,
    arLettre: false,
    arMot: false,
    arParagraphe: false,
    arHistoire: true,
    arCompMaitrise: true,
    arCompNonMaitrise: false,
    mathDebutant: false,
    math1Chiffre: false,
    math2Chiffres: false,
    mathAddition: false,
    mathSoustraction: true,
    mathProbMaitrise: true,
    mathProbNonMaitrise: false,
    frDebutant: false,
    frLettre: false,
    frMS: false,
    frMA: true,
    frMGC: false,
    remarks: "متمكنة في القراءة والحساب",
  },
  {
    id: "st-3",
    number: 3,
    fullName: "ياسين بنجلون",
    arDebutant: false,
    arLettre: false,
    arMot: true,
    arParagraphe: false,
    arHistoire: false,
    arCompMaitrise: false,
    arCompNonMaitrise: true,
    mathDebutant: false,
    math1Chiffre: false,
    math2Chiffres: true,
    mathAddition: false,
    mathSoustraction: false,
    mathProbMaitrise: false,
    mathProbNonMaitrise: true,
    frDebutant: false,
    frLettre: true,
    frMS: false,
    frMA: false,
    frMGC: false,
    remarks: "يحتاج دعم في التهجي والجمع",
  },
  {
    id: "st-4",
    number: 4,
    fullName: "مريم العلمي",
    arDebutant: false,
    arLettre: false,
    arMot: false,
    arParagraphe: true,
    arHistoire: false,
    arCompMaitrise: true,
    arCompNonMaitrise: false,
    mathDebutant: false,
    math1Chiffre: false,
    math2Chiffres: false,
    mathAddition: true,
    mathSoustraction: false,
    mathProbMaitrise: true,
    mathProbNonMaitrise: false,
    frDebutant: false,
    frLettre: false,
    frMS: true,
    frMA: false,
    frMGC: false,
    remarks: "",
  },
  {
    id: "st-5",
    number: 5,
    fullName: "حمزة بناني",
    arDebutant: false,
    arLettre: true,
    arMot: false,
    arParagraphe: false,
    arHistoire: false,
    arCompMaitrise: false,
    arCompNonMaitrise: true,
    mathDebutant: false,
    math1Chiffre: true,
    math2Chiffres: false,
    mathAddition: false,
    mathSoustraction: false,
    mathProbMaitrise: false,
    mathProbNonMaitrise: true,
    frDebutant: true,
    frLettre: false,
    frMS: false,
    frMA: false,
    frMGC: false,
    remarks: "مسار الدعم المكثف TaRL",
  },
  {
    id: "st-6",
    number: 6,
    fullName: "سارة الفاسي",
    arDebutant: false,
    arLettre: false,
    arMot: false,
    arParagraphe: false,
    arHistoire: true,
    arCompMaitrise: true,
    arCompNonMaitrise: false,
    mathDebutant: false,
    math1Chiffre: false,
    math2Chiffres: false,
    mathAddition: false,
    mathSoustraction: true,
    mathProbMaitrise: true,
    mathProbNonMaitrise: false,
    frDebutant: false,
    frLettre: false,
    frMS: false,
    frMA: false,
    frMGC: true,
    remarks: "مستوى متميز",
  },
  {
    id: "st-7",
    number: 7,
    fullName: "أيوب العمراني",
    arDebutant: false,
    arLettre: false,
    arMot: true,
    arParagraphe: false,
    arHistoire: false,
    arCompMaitrise: false,
    arCompNonMaitrise: true,
    mathDebutant: false,
    math1Chiffre: false,
    math2Chiffres: true,
    mathAddition: false,
    mathSoustraction: false,
    mathProbMaitrise: false,
    mathProbNonMaitrise: true,
    frDebutant: false,
    frLettre: true,
    frMS: false,
    frMA: false,
    frMGC: false,
    remarks: "",
  },
  {
    id: "st-8",
    number: 8,
    fullName: "خديجة السبتي",
    arDebutant: false,
    arLettre: false,
    arMot: false,
    arParagraphe: true,
    arHistoire: false,
    arCompMaitrise: true,
    arCompNonMaitrise: false,
    mathDebutant: false,
    math1Chiffre: false,
    math2Chiffres: false,
    mathAddition: true,
    mathSoustraction: false,
    mathProbMaitrise: true,
    mathProbNonMaitrise: false,
    frDebutant: false,
    frLettre: false,
    frMS: true,
    frMA: false,
    frMGC: false,
    remarks: "",
  },
  {
    id: "st-9",
    number: 9,
    fullName: "عمر الصنهاجي",
    arDebutant: true,
    arLettre: false,
    arMot: false,
    arParagraphe: false,
    arHistoire: false,
    arCompMaitrise: false,
    arCompNonMaitrise: true,
    mathDebutant: true,
    math1Chiffre: false,
    math2Chiffres: false,
    mathAddition: false,
    mathSoustraction: false,
    mathProbMaitrise: false,
    mathProbNonMaitrise: true,
    frDebutant: true,
    frLettre: false,
    frMS: false,
    frMA: false,
    frMGC: false,
    remarks: "صعوبة في تمييز الحروف والأرقام",
  },
  {
    id: "st-10",
    number: 10,
    fullName: "زينب الشاوي",
    arDebutant: false,
    arLettre: false,
    arMot: false,
    arParagraphe: false,
    arHistoire: true,
    arCompMaitrise: true,
    arCompNonMaitrise: false,
    mathDebutant: false,
    math1Chiffre: false,
    math2Chiffres: false,
    mathAddition: false,
    mathSoustraction: true,
    mathProbMaitrise: true,
    mathProbNonMaitrise: false,
    frDebutant: false,
    frLettre: false,
    frMS: false,
    frMA: true,
    frMGC: false,
    remarks: "متحكمة في جميع الروائز",
  },
  {
    id: "st-11",
    number: 11,
    fullName: "يوسف الوردي",
    arDebutant: false,
    arLettre: false,
    arMot: true,
    arParagraphe: false,
    arHistoire: false,
    arCompMaitrise: false,
    arCompNonMaitrise: true,
    mathDebutant: false,
    math1Chiffre: false,
    math2Chiffres: false,
    mathAddition: true,
    mathSoustraction: false,
    mathProbMaitrise: false,
    mathProbNonMaitrise: true,
    frDebutant: false,
    frLettre: true,
    frMS: false,
    frMA: false,
    frMGC: false,
    remarks: "",
  },
  {
    id: "st-12",
    number: 12,
    fullName: "سلمى المرابط",
    arDebutant: false,
    arLettre: false,
    arMot: false,
    arParagraphe: true,
    arHistoire: false,
    arCompMaitrise: true,
    arCompNonMaitrise: false,
    mathDebutant: false,
    math1Chiffre: false,
    math2Chiffres: false,
    mathAddition: false,
    mathSoustraction: true,
    mathProbMaitrise: true,
    mathProbNonMaitrise: false,
    frDebutant: false,
    frLettre: false,
    frMS: true,
    frMA: false,
    frMGC: false,
    remarks: "",
  },
];

function createBlankStudent(number: number): PositioningStudent {
  return {
    id: `st-blank-${Date.now()}-${number}`,
    number,
    fullName: "",
    arDebutant: false,
    arLettre: false,
    arMot: false,
    arParagraphe: false,
    arHistoire: false,
    arCompMaitrise: false,
    arCompNonMaitrise: false,
    mathDebutant: false,
    math1Chiffre: false,
    math2Chiffres: false,
    mathAddition: false,
    mathSoustraction: false,
    mathProbMaitrise: false,
    mathProbNonMaitrise: false,
    frDebutant: false,
    frLettre: false,
    frMS: false,
    frMA: false,
    frMGC: false,
    remarks: "",
  };
}

interface PositioningGridsEditorProps {
  teacherProfile?: TeacherProfile;
}

export const PositioningGridsEditor: React.FC<PositioningGridsEditorProps> = ({
  teacherProfile,
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [meta, setMeta] = useState<PositioningGridMeta>(() => {
    const saved = localStorage.getItem("profpress_positioning_meta");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      teacherName: teacherProfile?.fullNameAr || DEFAULT_META.teacherName,
      somNumber: teacherProfile?.somNumber || DEFAULT_META.somNumber,
      schoolName: teacherProfile?.institution || DEFAULT_META.schoolName,
      gradeLevel: teacherProfile?.assignedLevel || DEFAULT_META.gradeLevel,
      title: DEFAULT_META.title,
      schoolYear: teacherProfile?.schoolYear || DEFAULT_META.schoolYear,
    };
  });

  const [students, setStudents] = useState<PositioningStudent[]>(() => {
    const saved = localStorage.getItem("profpress_positioning_students");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {
        // fallback
      }
    }
    return SAMPLE_STUDENTS;
  });

  const [isEditingMeta, setIsEditingMeta] = useState(false);
  const [showStats, setShowStats] = useState(true);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importText, setImportText] = useState("");
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [saveToast, setSaveToast] = useState(false);
  const [filterQuery, setFilterQuery] = useState("");

  // Persist to local storage
  useEffect(() => {
    localStorage.setItem("profpress_positioning_meta", JSON.stringify(meta));
  }, [meta]);

  useEffect(() => {
    localStorage.setItem(
      "profpress_positioning_students",
      JSON.stringify(students)
    );
  }, [students]);

  // Handle meta updates
  const handleMetaChange = (field: keyof PositioningGridMeta, value: string) => {
    setMeta((prev) => ({ ...prev, [field]: value }));
  };

  // Toggle single cell checkbox
  const toggleStudentCheck = (
    studentId: string,
    field: keyof PositioningStudent
  ) => {
    setStudents((prev) =>
      prev.map((st) => {
        if (st.id !== studentId) return st;

        // Group handling: if setting a reading level in Arabic, optionally uncheck others for pure TaRL single-level positioning
        if (
          field === "arDebutant" ||
          field === "arLettre" ||
          field === "arMot" ||
          field === "arParagraphe" ||
          field === "arHistoire"
        ) {
          const currentVal = !!st[field];
          return {
            ...st,
            arDebutant: field === "arDebutant" ? !currentVal : false,
            arLettre: field === "arLettre" ? !currentVal : false,
            arMot: field === "arMot" ? !currentVal : false,
            arParagraphe: field === "arParagraphe" ? !currentVal : false,
            arHistoire: field === "arHistoire" ? !currentVal : false,
          };
        }

        // Group handling: Arabic Comprehension (متحكم / غير متحكم)
        if (field === "arCompMaitrise" || field === "arCompNonMaitrise") {
          const currentVal = !!st[field];
          return {
            ...st,
            arCompMaitrise: field === "arCompMaitrise" ? !currentVal : false,
            arCompNonMaitrise:
              field === "arCompNonMaitrise" ? !currentVal : false,
          };
        }

        // Group handling: Math level
        if (
          field === "mathDebutant" ||
          field === "math1Chiffre" ||
          field === "math2Chiffres" ||
          field === "mathAddition" ||
          field === "mathSoustraction"
        ) {
          const currentVal = !!st[field];
          return {
            ...st,
            mathDebutant: field === "mathDebutant" ? !currentVal : false,
            math1Chiffre: field === "math1Chiffre" ? !currentVal : false,
            math2Chiffres: field === "math2Chiffres" ? !currentVal : false,
            mathAddition: field === "mathAddition" ? !currentVal : false,
            mathSoustraction: field === "mathSoustraction" ? !currentVal : false,
          };
        }

        // Group handling: Math problem (متحكم / غير متحكم)
        if (field === "mathProbMaitrise" || field === "mathProbNonMaitrise") {
          const currentVal = !!st[field];
          return {
            ...st,
            mathProbMaitrise:
              field === "mathProbMaitrise" ? !currentVal : false,
            mathProbNonMaitrise:
              field === "mathProbNonMaitrise" ? !currentVal : false,
          };
        }

        // Group handling: French level
        if (
          field === "frDebutant" ||
          field === "frLettre" ||
          field === "frMS" ||
          field === "frMA" ||
          field === "frMGC"
        ) {
          const currentVal = !!st[field];
          return {
            ...st,
            frDebutant: field === "frDebutant" ? !currentVal : false,
            frLettre: field === "frLettre" ? !currentVal : false,
            frMS: field === "frMS" ? !currentVal : false,
            frMA: field === "frMA" ? !currentVal : false,
            frMGC: field === "frMGC" ? !currentVal : false,
          };
        }

        return { ...st, [field]: !st[field] };
      })
    );
  };

  const handleStudentNameChange = (studentId: string, newName: string) => {
    setStudents((prev) =>
      prev.map((st) => (st.id === studentId ? { ...st, fullName: newName } : st))
    );
  };

  const handleStudentRemarkChange = (studentId: string, remark: string) => {
    setStudents((prev) =>
      prev.map((st) => (st.id === studentId ? { ...st, remarks: remark } : st))
    );
  };

  const addStudentRow = () => {
    const nextNum = students.length + 1;
    setStudents((prev) => [...prev, createBlankStudent(nextNum)]);
  };

  const addMultipleBlankRows = (count: number) => {
    setStudents((prev) => {
      const start = prev.length + 1;
      const newOnes: PositioningStudent[] = [];
      for (let i = 0; i < count; i++) {
        newOnes.push(createBlankStudent(start + i));
      }
      return [...prev, ...newOnes];
    });
  };

  const removeStudentRow = (studentId: string) => {
    setStudents((prev) => {
      const filtered = prev.filter((st) => st.id !== studentId);
      return filtered.map((st, idx) => ({ ...st, number: idx + 1 }));
    });
  };

  const handleClearAllMarks = () => {
    if (
      window.confirm(
        "هل أنت متأكد من تفريغ جميع علامات التموضع لجميع التلاميذ؟ (ستبقى الأسماء كما هي)"
      )
    ) {
      setStudents((prev) =>
        prev.map((st) => ({
          ...st,
          arDebutant: false,
          arLettre: false,
          arMot: false,
          arParagraphe: false,
          arHistoire: false,
          arCompMaitrise: false,
          arCompNonMaitrise: false,
          mathDebutant: false,
          math1Chiffre: false,
          math2Chiffres: false,
          mathAddition: false,
          mathSoustraction: false,
          mathProbMaitrise: false,
          mathProbNonMaitrise: false,
          frDebutant: false,
          frLettre: false,
          frMS: false,
          frMA: false,
          frMGC: false,
        }))
      );
    }
  };

  const handleLoadSample = () => {
    if (
      window.confirm(
        "هل تريد استبدال اللائحة الحالية بنموذج تجريبي جاهز ومملوء مع الإحصائيات؟"
      )
    ) {
      setStudents(SAMPLE_STUDENTS);
      setMeta(DEFAULT_META);
    }
  };

  const handleMakeBlankClass = (count = 35) => {
    if (
      window.confirm(
        `هل تريد إنشاء شبكة فارغة تماماً لـ ${count} تلميذاً للطباعة والتعبئة الورقية؟`
      )
    ) {
      const blankList: PositioningStudent[] = [];
      for (let i = 1; i <= count; i++) {
        blankList.push(createBlankStudent(i));
      }
      setStudents(blankList);
    }
  };

  // Bulk import names from text (e.g. copied from Massar or Excel)
  const handleBulkImport = () => {
    if (!importText.trim()) return;
    const lines = importText
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length === 0) return;

    const imported: PositioningStudent[] = lines.map((name, index) => ({
      ...createBlankStudent(index + 1),
      fullName: name,
    }));

    setStudents(imported);
    setShowImportModal(false);
    setImportText("");
    alert(`تم استيراد ${lines.length} تلميذاً بنجاح من القائمة المنسوخة.`);
  };

  // Export to Excel (.xlsx)
  const handleExportExcel = () => {
    try {
      // 1. Prepare worksheet data with matching columns
      const headersRow1 = [
        "الرقم",
        "أسماء المتعلمين",
        "اللغة العربية (قراءة)",
        "",
        "",
        "",
        "",
        "الفهم",
        "",
        "الرياضيات",
        "",
        "",
        "",
        "",
        "المسألة",
        "",
        "Français",
        "",
        "",
        "",
        "",
        "ملاحظات",
      ];

      const headersRow2 = [
        "N°",
        "Nom et Prénom",
        "مبتدئ",
        "حرف",
        "كلمة",
        "فقرة",
        "أقصوصة",
        "متحكم",
        "غير متحكم",
        "مبتدئ",
        "رقم واحد",
        "رقمان",
        "جمع",
        "طرح",
        "متحكم",
        "غير متحكم",
        "Débutant",
        "Lettre",
        "M.S",
        "M.A",
        "M.G.C",
        "Remarques",
      ];

      // Metadata rows at top
      const data: any[][] = [
        ["المملكة المغربية - وزارة التربية الوطنية والتعليم الأولي والرياضة"],
        [meta.title],
        [
          `الأستاذ(ة): ${meta.teacherName}`,
          `رقم التأجير: ${meta.somNumber}`,
          `المستوى: ${meta.gradeLevel}`,
          `المؤسسة: ${meta.schoolName}`,
          `الموسم: ${meta.schoolYear}`,
        ],
        [], // empty line
        headersRow1,
        headersRow2,
      ];

      // Student rows
      students.forEach((st) => {
        data.push([
          st.number,
          st.fullName || `تلميذ ${st.number}`,
          st.arDebutant ? "✓" : "",
          st.arLettre ? "✓" : "",
          st.arMot ? "✓" : "",
          st.arParagraphe ? "✓" : "",
          st.arHistoire ? "✓" : "",
          st.arCompMaitrise ? "✓" : "",
          st.arCompNonMaitrise ? "✓" : "",
          st.mathDebutant ? "✓" : "",
          st.math1Chiffre ? "✓" : "",
          st.math2Chiffres ? "✓" : "",
          st.mathAddition ? "✓" : "",
          st.mathSoustraction ? "✓" : "",
          st.mathProbMaitrise ? "✓" : "",
          st.mathProbNonMaitrise ? "✓" : "",
          st.frDebutant ? "✓" : "",
          st.frLettre ? "✓" : "",
          st.frMS ? "✓" : "",
          st.frMA ? "✓" : "",
          st.frMGC ? "✓" : "",
          st.remarks || "",
        ]);
      });

      // Totals row at the bottom
      const totalsRow = [
        "المجموع",
        `إجمالي التلاميذ: ${students.length}`,
        students.filter((s) => s.arDebutant).length,
        students.filter((s) => s.arLettre).length,
        students.filter((s) => s.arMot).length,
        students.filter((s) => s.arParagraphe).length,
        students.filter((s) => s.arHistoire).length,
        students.filter((s) => s.arCompMaitrise).length,
        students.filter((s) => s.arCompNonMaitrise).length,
        students.filter((s) => s.mathDebutant).length,
        students.filter((s) => s.math1Chiffre).length,
        students.filter((s) => s.math2Chiffres).length,
        students.filter((s) => s.mathAddition).length,
        students.filter((s) => s.mathSoustraction).length,
        students.filter((s) => s.mathProbMaitrise).length,
        students.filter((s) => s.mathProbNonMaitrise).length,
        students.filter((s) => s.frDebutant).length,
        students.filter((s) => s.frLettre).length,
        students.filter((s) => s.frMS).length,
        students.filter((s) => s.frMA).length,
        students.filter((s) => s.frMGC).length,
        "",
      ];
      data.push(totalsRow);

      const ws = XLSX.utils.aoa_to_sheet(data);

      // Set RTL direction
      ws["!views"] = [{ RTL: true }];

      // Define merges for grouped headers
      ws["!merges"] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 21 } }, // Title 1
        { s: { r: 1, c: 0 }, e: { r: 1, c: 21 } }, // Title 2
        // Arabic reading merge
        { s: { r: 4, c: 2 }, e: { r: 4, c: 6 } },
        // Arabic comprehension merge
        { s: { r: 4, c: 7 }, e: { r: 4, c: 8 } },
        // Math level merge
        { s: { r: 4, c: 9 }, e: { r: 4, c: 13 } },
        // Math problem merge
        { s: { r: 4, c: 14 }, e: { r: 4, c: 15 } },
        // French level merge
        { s: { r: 4, c: 16 }, e: { r: 4, c: 20 } },
      ];

      // Set column widths
      ws["!cols"] = [
        { wch: 6 }, // N°
        { wch: 25 }, // Name
        { wch: 8 }, // arDebutant
        { wch: 8 }, // arLettre
        { wch: 8 }, // arMot
        { wch: 8 }, // arParagraphe
        { wch: 8 }, // arHistoire
        { wch: 9 }, // arCompMaitrise
        { wch: 11 }, // arCompNonMaitrise
        { wch: 8 }, // mathDebutant
        { wch: 10 }, // math1Chiffre
        { wch: 8 }, // math2Chiffres
        { wch: 8 }, // mathAddition
        { wch: 8 }, // mathSoustraction
        { wch: 9 }, // mathProbMaitrise
        { wch: 11 }, // mathProbNonMaitrise
        { wch: 9 }, // frDebutant
        { wch: 8 }, // frLettre
        { wch: 8 }, // frMS
        { wch: 8 }, // frMA
        { wch: 8 }, // frMGC
        { wch: 22 }, // remarks
      ];

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "روائز_الموضعة");

      const filename = `شبكة_تفريغ_روائز_الموضعة_${meta.gradeLevel.replace(
        /\s+/g,
        "_"
      )}_${meta.teacherName.replace(/\s+/g, "_")}.xlsx`;
      XLSX.writeFile(wb, filename);
    } catch (err) {
      console.error("Error exporting excel:", err);
      alert("تعذر تصدير ملف Excel. يرجى المحاولة مرة أخرى.");
    }
  };

  // Export to PDF
  const handleExportPdf = async () => {
    if (!sheetRef.current) return;
    setIsExportingPdf(true);
    try {
      await generatePdfFromElement(sheetRef.current, {
        filename: `شبكة_تفريغ_روائز_الموضعة_${meta.gradeLevel}_${meta.teacherName}.pdf`,
        orientation: "portrait",
        quality: "ultra",
        colorMode: "color",
      });
    } catch (err) {
      console.error(err);
      alert(
        "حدث خطأ أثناء إعداد ملف PDF. يمكنك استخدام زر 'طباعة مباشرة A4' وحفظ الملف كـ PDF عبر المتصفح."
      );
    } finally {
      setIsExportingPdf(false);
    }
  };

  // Calculations for Statistics
  const totalCount = students.length || 1;
  const stats = {
    arabic: {
      debutant: students.filter((s) => s.arDebutant).length,
      lettre: students.filter((s) => s.arLettre).length,
      mot: students.filter((s) => s.arMot).length,
      paragraphe: students.filter((s) => s.arParagraphe).length,
      histoire: students.filter((s) => s.arHistoire).length,
      compMaitrise: students.filter((s) => s.arCompMaitrise).length,
      compNonMaitrise: students.filter((s) => s.arCompNonMaitrise).length,
    },
    math: {
      debutant: students.filter((s) => s.mathDebutant).length,
      unChiffre: students.filter((s) => s.math1Chiffre).length,
      deuxChiffres: students.filter((s) => s.math2Chiffres).length,
      addition: students.filter((s) => s.mathAddition).length,
      soustraction: students.filter((s) => s.mathSoustraction).length,
      probMaitrise: students.filter((s) => s.mathProbMaitrise).length,
      probNonMaitrise: students.filter((s) => s.mathProbNonMaitrise).length,
    },
    french: {
      debutant: students.filter((s) => s.frDebutant).length,
      lettre: students.filter((s) => s.frLettre).length,
      ms: students.filter((s) => s.frMS).length,
      ma: students.filter((s) => s.frMA).length,
      mgc: students.filter((s) => s.frMGC).length,
    },
  };

  const filteredStudents = filterQuery.trim()
    ? students.filter((s) =>
        s.fullName.toLowerCase().includes(filterQuery.toLowerCase())
      )
    : students;

  return (
    <div className="space-y-6 pb-20">
      {/* Top Toolbar & Controls (Hidden during print) */}
      <div className="no-print bg-white border border-slate-200 rounded-2xl p-4 md:p-6 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-300">
                برنامج دعم التعلمات TaRL & الريادة
              </span>
              <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-amber-300">
                شتنبر 2026
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 mt-1 flex items-center gap-2">
              <FileSpreadsheet className="w-6 h-6 text-emerald-600" />
              <span>شبكة تفريغ روائز الموضعة (TaRL)</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-600 mt-0.5">
              تعبئة تفاعلية لنتائج الموضعة في القراءة والحساب والفرنسية مع
              إمكانية تعديل المعلومات وتصدير فوري إلى Excel أو PDF وطباعة A4
              رسمية مطابقة للنموذج الوزاري.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsEditingMeta(!isEditingMeta)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition border border-slate-300 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-blue-600" />
              <span>{isEditingMeta ? "إخفاء التعديل" : "تعديل معلومات الشبكة"}</span>
            </button>

            <button
              onClick={() => setShowStats(!showStats)}
              className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition border border-indigo-200 cursor-pointer"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>{showStats ? "إخفاء الإحصائيات" : "عرض الإحصائيات"}</span>
            </button>

            <button
              onClick={handleExportExcel}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تصدير Excel (.xlsx)</span>
            </button>

            <button
              onClick={handleExportPdf}
              disabled={isExportingPdf}
              className="bg-rose-600 hover:bg-rose-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExportingPdf ? "جاري التوليد..." : "تصدير PDF"}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة مباشرة A4</span>
            </button>
          </div>
        </div>

        {/* Secondary controls row */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={addStudentRow}
              className="bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة تلميذ</span>
            </button>

            <button
              onClick={() => addMultipleBlankRows(5)}
              className="bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1.5 rounded-lg font-medium transition cursor-pointer"
            >
              + إضافة 5 أسطر
            </button>

            <button
              onClick={() => setShowImportModal(true)}
              className="bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 transition cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>استيراد لائحة من مسار / Excel</span>
            </button>

            <button
              onClick={handleClearAllMarks}
              className="bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>تفريغ العلامات</span>
            </button>

            <button
              onClick={() => handleMakeBlankClass(35)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 transition cursor-pointer"
            >
              <span>شبكة فارغة لـ 35 تلميذاً</span>
            </button>

            <button
              onClick={handleLoadSample}
              className="bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>تحميل نموذج ممتلئ تجريبي</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">
              العدد الإجمالي: <strong className="text-slate-900">{students.length}</strong> تلميذاً
            </span>
          </div>
        </div>

        {/* Edit Metadata Drawer */}
        {isEditingMeta && (
          <div className="bg-slate-50 border-2 border-blue-300/80 rounded-xl p-4 mt-3 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-800 text-xs flex items-center gap-1">
                <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                تعديل معلومات الترويسة والأستاذ والمؤسسة
              </span>
              <button
                onClick={() => setIsEditingMeta(false)}
                className="text-slate-400 hover:text-slate-600 text-xs"
              >
                إغلاق ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  عنوان الشبكة والفترة:
                </label>
                <input
                  type="text"
                  value={meta.title}
                  onChange={(e) => handleMetaChange("title", e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 font-bold text-slate-900"
                  placeholder="شبكة تفريغ روائز الموضعة - شتنبر 2026"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  الأستاذ (ة):
                </label>
                <input
                  type="text"
                  value={meta.teacherName}
                  onChange={(e) =>
                    handleMetaChange("teacherName", e.target.value)
                  }
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  رقم التأجير:
                </label>
                <input
                  type="text"
                  value={meta.somNumber}
                  onChange={(e) =>
                    handleMetaChange("somNumber", e.target.value)
                  }
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  المستوى الدراسي:
                </label>
                <input
                  type="text"
                  value={meta.gradeLevel}
                  onChange={(e) =>
                    handleMetaChange("gradeLevel", e.target.value)
                  }
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  المؤسسة التعليمية:
                </label>
                <input
                  type="text"
                  value={meta.schoolName}
                  onChange={(e) =>
                    handleMetaChange("schoolName", e.target.value)
                  }
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  الموسم الدراسي:
                </label>
                <input
                  type="text"
                  value={meta.schoolYear}
                  onChange={(e) =>
                    handleMetaChange("schoolYear", e.target.value)
                  }
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 font-medium"
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={() => {
                  setIsEditingMeta(false);
                  setSaveToast(true);
                  setTimeout(() => setSaveToast(false), 2000);
                }}
                className="bg-blue-600 text-white font-bold px-4 py-1.5 rounded-lg text-xs hover:bg-blue-700 cursor-pointer"
              >
                تثبيت التغييرات ✓
              </button>
            </div>
          </div>
        )}

        {/* Live Statistics Drawer */}
        {showStats && (
          <div className="bg-gradient-to-r from-slate-50 to-emerald-50/40 border border-slate-200 rounded-xl p-4 text-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                <span>إحصائيات الموضعة الفورية (TaRL Diagnostics)</span>
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                يتم احتساب النسب تلقائياً فور النقر على أي خانة
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Arabic Stats */}
              <div className="bg-white border border-green-200 rounded-lg p-2.5 space-y-1.5">
                <div className="flex items-center justify-between font-bold text-green-900 border-b border-green-100 pb-1">
                  <span>اللغة العربية (قراءة & فهم)</span>
                  <span className="text-[11px] bg-green-100 text-green-800 px-1.5 py-0.5 rounded">
                    {totalCount} تلميذ
                  </span>
                </div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between text-slate-600">
                    <span>مبتدئ:</span>
                    <strong className="text-slate-900">
                      {stats.arabic.debutant} (
                      {Math.round((stats.arabic.debutant / totalCount) * 100)}%)
                    </strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>حرف:</span>
                    <strong className="text-slate-900">
                      {stats.arabic.lettre} (
                      {Math.round((stats.arabic.lettre / totalCount) * 100)}%)
                    </strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>كلمة:</span>
                    <strong className="text-slate-900">
                      {stats.arabic.mot} (
                      {Math.round((stats.arabic.mot / totalCount) * 100)}%)
                    </strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>فقرة:</span>
                    <strong className="text-slate-900">
                      {stats.arabic.paragraphe} (
                      {Math.round((stats.arabic.paragraphe / totalCount) * 100)}%)
                    </strong>
                  </div>
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>أقصوصة:</span>
                    <span>
                      {stats.arabic.histoire} (
                      {Math.round((stats.arabic.histoire / totalCount) * 100)}%)
                    </span>
                  </div>
                  <div className="border-t border-slate-100 pt-1 flex justify-between text-blue-700 font-semibold">
                    <span>متحكم في الفهم:</span>
                    <span>
                      {stats.arabic.compMaitrise} (
                      {Math.round((stats.arabic.compMaitrise / totalCount) * 100)}%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Math Stats */}
              <div className="bg-white border border-blue-200 rounded-lg p-2.5 space-y-1.5">
                <div className="flex items-center justify-between font-bold text-blue-900 border-b border-blue-100 pb-1">
                  <span>الرياضيات (حساب & مسألة)</span>
                  <span className="text-[11px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                    {totalCount} تلميذ
                  </span>
                </div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between text-slate-600">
                    <span>مبتدئ:</span>
                    <strong className="text-slate-900">
                      {stats.math.debutant} (
                      {Math.round((stats.math.debutant / totalCount) * 100)}%)
                    </strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>رقم واحد:</span>
                    <strong className="text-slate-900">
                      {stats.math.unChiffre} (
                      {Math.round((stats.math.unChiffre / totalCount) * 100)}%)
                    </strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>رقمان:</span>
                    <strong className="text-slate-900">
                      {stats.math.deuxChiffres} (
                      {Math.round((stats.math.deuxChiffres / totalCount) * 100)}%)
                    </strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>جمع:</span>
                    <strong className="text-slate-900">
                      {stats.math.addition} (
                      {Math.round((stats.math.addition / totalCount) * 100)}%)
                    </strong>
                  </div>
                  <div className="flex justify-between text-blue-700 font-bold">
                    <span>طرح:</span>
                    <span>
                      {stats.math.soustraction} (
                      {Math.round((stats.math.soustraction / totalCount) * 100)}%)
                    </span>
                  </div>
                  <div className="border-t border-slate-100 pt-1 flex justify-between text-indigo-700 font-semibold">
                    <span>متحكم في المسألة:</span>
                    <span>
                      {stats.math.probMaitrise} (
                      {Math.round((stats.math.probMaitrise / totalCount) * 100)}%)
                    </span>
                  </div>
                </div>
              </div>

              {/* French Stats */}
              <div className="bg-white border border-amber-200 rounded-lg p-2.5 space-y-1.5">
                <div className="flex items-center justify-between font-bold text-amber-900 border-b border-amber-100 pb-1">
                  <span>Français (Lecture)</span>
                  <span className="text-[11px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                    {totalCount} تلميذ
                  </span>
                </div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between text-slate-600">
                    <span>Débutant:</span>
                    <strong className="text-slate-900">
                      {stats.french.debutant} (
                      {Math.round((stats.french.debutant / totalCount) * 100)}%)
                    </strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Lettre:</span>
                    <strong className="text-slate-900">
                      {stats.french.lettre} (
                      {Math.round((stats.french.lettre / totalCount) * 100)}%)
                    </strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>M.S (Mot Simple):</span>
                    <strong className="text-slate-900">
                      {stats.french.ms} (
                      {Math.round((stats.french.ms / totalCount) * 100)}%)
                    </strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>M.A (Mot Avancé):</span>
                    <strong className="text-slate-900">
                      {stats.french.ma} (
                      {Math.round((stats.french.ma / totalCount) * 100)}%)
                    </strong>
                  </div>
                  <div className="flex justify-between text-amber-700 font-bold">
                    <span>M.G.C (Texte/Compréhension):</span>
                    <span>
                      {stats.french.mgc} (
                      {Math.round((stats.french.mgc / totalCount) * 100)}%)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick hint for user */}
        <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-2.5 text-xs text-blue-900 flex items-start gap-2">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold">طريقة الاستخدام السريعة:</span> انقر
            مباشرة على أي خانة داخل الجدول أدناه لوضع أو إزالة علامة التموضع (✓).
            يمكنك كتابة أسماء التلاميذ والملاحظات وتعديل المعلومات مباشرة في
            الصفحة وحفظها أو طباعتها وتصديرها بضغطة زر.
          </div>
        </div>
      </div>

      {/* Official A4 Document Representation (Identical to the uploaded Moroccan Ministry PDF) */}
      <div
        ref={sheetRef}
        className="print-sheet print-sheet-fluid bg-white border border-slate-400 md:border-2 md:border-black rounded-xl p-4 md:p-8 shadow-sm max-w-5xl mx-auto space-y-4"
        style={{
          color: "#000",
          fontFamily: "'Cairo', 'Amiri', Tahoma, sans-serif",
        }}
      >
        {/* Top Official Ministerial Header */}
        <div className="border-b-2 border-black pb-2 mb-2 text-center">
          <div className="flex justify-center mb-1.5">
            <img
              src="/morocco-ministry-logo.png"
              alt="وزارة التربية الوطنية والتعليم الأولي والرياضة"
              className="h-12 md:h-14 w-auto max-w-full object-contain"
            />
          </div>
          <div className="flex items-center justify-between font-bold text-slate-800 text-[11px] px-1">
            <div className="text-right space-y-0.5">
              <p><span className="text-slate-600 font-medium">الأكاديمية الجهوية للتربية والتكوين :</span> {teacherProfile?.academy || "...................................."}</p>
              <p><span className="text-slate-600 font-medium">المديرية الإقليمية :</span> {teacherProfile?.directorate || "...................................."}</p>
            </div>
            <div className="text-left space-y-0.5">
              <p><span className="text-slate-600 font-medium">المؤسسة التعليمية :</span> {meta.schoolName || teacherProfile?.institution || "...................................."}</p>
              <p><span className="text-slate-600 font-medium">السنة الدراسية :</span> {meta.schoolYear || teacherProfile?.schoolYear || "2026/2027"}</p>
            </div>
          </div>
        </div>

        {/* Two Rounded Info Boxes (Teacher & Class) */}
        <div className="grid grid-cols-2 gap-4 text-xs md:text-sm font-bold text-slate-900">
          {/* Right Box: Teacher info */}
          <div className="border border-black rounded-xl p-3 space-y-1.5 text-right">
            <div className="flex items-center gap-1">
              <span className="font-bold">الأستاذ (ة) :</span>
              <span className="font-semibold text-slate-800 underline decoration-dotted decoration-slate-400">
                {meta.teacherName || "...................................."}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold">رقم التأجير :</span>
              <span className="font-mono font-semibold text-slate-800 underline decoration-dotted decoration-slate-400">
                {meta.somNumber || "...................................."}
              </span>
            </div>
          </div>

          {/* Left Box: Class & Institution info */}
          <div className="border border-black rounded-xl p-3 space-y-1.5 text-right">
            <div className="flex items-center gap-1">
              <span className="font-bold">المستوى :</span>
              <span className="font-semibold text-slate-800 underline decoration-dotted decoration-slate-400">
                {meta.gradeLevel || "...................................."}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold">المؤسسة :</span>
              <span className="font-semibold text-slate-800 underline decoration-dotted decoration-slate-400">
                {meta.schoolName || "...................................."}
              </span>
            </div>
          </div>
        </div>

        {/* Center Title in a Rounded Box */}
        <div className="flex justify-center pt-1 pb-1">
          <div className="border-2 border-black rounded-2xl px-6 md:px-10 py-1.5 bg-slate-50 text-center shadow-xs">
            <h2 className="text-base md:text-lg font-black text-black tracking-wide">
              {meta.title}
            </h2>
          </div>
        </div>

        {/* The Grid / Table matching exact colors and columns */}
        <div className="overflow-x-auto">
          <table
            className="w-full border-collapse border-2 border-black text-center text-[10px] md:text-[11px]"
            dir="rtl"
          >
            <thead>
              {/* Row 1: Main Category Headers with Official Background Colors */}
              <tr className="font-bold border-b border-black">
                {/* أسماء المتعلمين (rowSpan 2) */}
                <th
                  rowSpan={2}
                  className="border border-black p-1 bg-slate-100 text-slate-900 w-[170px] min-w-[140px] align-middle font-black"
                >
                  أسماء المتعلمين
                </th>

                {/* اللغة العربية - Pastel Green (#bbf7d0 / #86efac) */}
                <th
                  colSpan={5}
                  className="border border-black p-1 bg-[#bbf7d0] text-black font-extrabold"
                  style={{ backgroundColor: "#bbf7d0" }}
                >
                  اللغة العربية
                </th>

                {/* الفهم - Pastel Yellow (#fef08a) */}
                <th
                  colSpan={2}
                  className="border border-black p-1 bg-[#fef08a] text-black font-extrabold"
                  style={{ backgroundColor: "#fef08a" }}
                >
                  الفهم
                </th>

                {/* الرياضيات - Pastel Light Blue (#93c5fd / #bae6fd) */}
                <th
                  colSpan={5}
                  className="border border-black p-1 bg-[#93c5fd] text-black font-extrabold"
                  style={{ backgroundColor: "#93c5fd" }}
                >
                  الرياضيات
                </th>

                {/* المسألة - Pastel Yellow (#fef08a) */}
                <th
                  colSpan={2}
                  className="border border-black p-1 bg-[#fef08a] text-black font-extrabold"
                  style={{ backgroundColor: "#fef08a" }}
                >
                  المسألة
                </th>

                {/* Français - Pastel Peach/Orange (#fed7aa) */}
                <th
                  colSpan={5}
                  className="border border-black p-1 bg-[#fed7aa] text-black font-extrabold"
                  style={{ backgroundColor: "#fed7aa" }}
                >
                  Français
                </th>

                {/* ملاحظات (rowSpan 2) */}
                <th
                  rowSpan={2}
                  className="border border-black p-1 bg-[#fed7aa] text-black w-[110px] min-w-[90px] align-middle font-bold"
                  style={{ backgroundColor: "#fed7aa" }}
                >
                  ملاحظات
                </th>
              </tr>

              {/* Row 2: Sub-columns */}
              <tr className="font-bold border-b-2 border-black text-[9px] md:text-[10px]">
                {/* اللغة العربية sub-columns */}
                <th
                  className="border border-black p-1 bg-[#dcfce7] w-9"
                  style={{ backgroundColor: "#dcfce7" }}
                >
                  مبتدئ
                </th>
                <th
                  className="border border-black p-1 bg-[#dcfce7] w-9"
                  style={{ backgroundColor: "#dcfce7" }}
                >
                  حرف
                </th>
                <th
                  className="border border-black p-1 bg-[#dcfce7] w-9"
                  style={{ backgroundColor: "#dcfce7" }}
                >
                  كلمة
                </th>
                <th
                  className="border border-black p-1 bg-[#dcfce7] w-9"
                  style={{ backgroundColor: "#dcfce7" }}
                >
                  فقرة
                </th>
                <th
                  className="border border-black p-1 bg-[#dcfce7] w-10"
                  style={{ backgroundColor: "#dcfce7" }}
                >
                  أقصوصة
                </th>

                {/* الفهم sub-columns */}
                <th
                  className="border border-black p-1 bg-[#fef9c3] w-10"
                  style={{ backgroundColor: "#fef9c3" }}
                >
                  متحكم
                </th>
                <th
                  className="border border-black p-1 bg-[#fef9c3] w-11 leading-tight text-[8px] md:text-[9px]"
                  style={{ backgroundColor: "#fef9c3" }}
                >
                  غير متحكم
                </th>

                {/* الرياضيات sub-columns */}
                <th
                  className="border border-black p-1 bg-[#dbeafe] w-9"
                  style={{ backgroundColor: "#dbeafe" }}
                >
                  مبتدئ
                </th>
                <th
                  className="border border-black p-1 bg-[#dbeafe] w-10 leading-tight text-[8px] md:text-[9px]"
                  style={{ backgroundColor: "#dbeafe" }}
                >
                  رقم واحد
                </th>
                <th
                  className="border border-black p-1 bg-[#dbeafe] w-9"
                  style={{ backgroundColor: "#dbeafe" }}
                >
                  رقمان
                </th>
                <th
                  className="border border-black p-1 bg-[#dbeafe] w-9"
                  style={{ backgroundColor: "#dbeafe" }}
                >
                  جمع
                </th>
                <th
                  className="border border-black p-1 bg-[#dbeafe] w-9"
                  style={{ backgroundColor: "#dbeafe" }}
                >
                  طرح
                </th>

                {/* المسألة sub-columns */}
                <th
                  className="border border-black p-1 bg-[#fef9c3] w-10"
                  style={{ backgroundColor: "#fef9c3" }}
                >
                  متحكم
                </th>
                <th
                  className="border border-black p-1 bg-[#fef9c3] w-11 leading-tight text-[8px] md:text-[9px]"
                  style={{ backgroundColor: "#fef9c3" }}
                >
                  غير متحكم
                </th>

                {/* Français sub-columns */}
                <th
                  className="border border-black p-1 bg-[#ffedd5] w-11 text-[9px]"
                  style={{ backgroundColor: "#ffedd5" }}
                >
                  Débutant
                </th>
                <th
                  className="border border-black p-1 bg-[#ffedd5] w-9 text-[9px]"
                  style={{ backgroundColor: "#ffedd5" }}
                >
                  Lettre
                </th>
                <th
                  className="border border-black p-1 bg-[#ffedd5] w-8 text-[9px]"
                  style={{ backgroundColor: "#ffedd5" }}
                >
                  M.S
                </th>
                <th
                  className="border border-black p-1 bg-[#ffedd5] w-8 text-[9px]"
                  style={{ backgroundColor: "#ffedd5" }}
                >
                  M.A
                </th>
                <th
                  className="border border-black p-1 bg-[#ffedd5] w-9 text-[9px]"
                  style={{ backgroundColor: "#ffedd5" }}
                >
                  M.G.C
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((st, idx) => (
                <tr
                  key={st.id}
                  className="border-b border-black hover:bg-slate-50 transition-colors h-7 md:h-8"
                >
                  {/* Student Name */}
                  <td className="border border-black px-1.5 py-0.5 text-right font-medium text-slate-900 whitespace-nowrap">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[9px] text-slate-400 font-mono w-4 shrink-0 text-center">
                        {st.number}
                      </span>
                      <input
                        type="text"
                        value={st.fullName}
                        onChange={(e) =>
                          handleStudentNameChange(st.id, e.target.value)
                        }
                        placeholder={`تلميذ ${st.number}`}
                        className="w-full bg-transparent border-none text-[11px] font-semibold text-slate-900 focus:bg-yellow-50 focus:outline-none px-1"
                      />
                      <button
                        onClick={() => removeStudentRow(st.id)}
                        title="حذف هذا السطر"
                        className="no-print text-slate-300 hover:text-red-600 opacity-0 group-hover:opacity-100 transition p-0.5"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </td>

                  {/* اللغة العربية */}
                  <td
                    onClick={() => toggleStudentCheck(st.id, "arDebutant")}
                    className="border border-black cursor-pointer select-none text-center font-bold text-black"
                  >
                    {st.arDebutant ? "✓" : ""}
                  </td>
                  <td
                    onClick={() => toggleStudentCheck(st.id, "arLettre")}
                    className="border border-black cursor-pointer select-none text-center font-bold text-black"
                  >
                    {st.arLettre ? "✓" : ""}
                  </td>
                  <td
                    onClick={() => toggleStudentCheck(st.id, "arMot")}
                    className="border border-black cursor-pointer select-none text-center font-bold text-black"
                  >
                    {st.arMot ? "✓" : ""}
                  </td>
                  <td
                    onClick={() => toggleStudentCheck(st.id, "arParagraphe")}
                    className="border border-black cursor-pointer select-none text-center font-bold text-black"
                  >
                    {st.arParagraphe ? "✓" : ""}
                  </td>
                  <td
                    onClick={() => toggleStudentCheck(st.id, "arHistoire")}
                    className="border border-black cursor-pointer select-none text-center font-bold text-black"
                  >
                    {st.arHistoire ? "✓" : ""}
                  </td>

                  {/* الفهم */}
                  <td
                    onClick={() => toggleStudentCheck(st.id, "arCompMaitrise")}
                    className="border border-black cursor-pointer select-none text-center font-bold text-black"
                  >
                    {st.arCompMaitrise ? "✓" : ""}
                  </td>
                  <td
                    onClick={() =>
                      toggleStudentCheck(st.id, "arCompNonMaitrise")
                    }
                    className="border border-black cursor-pointer select-none text-center font-bold text-black"
                  >
                    {st.arCompNonMaitrise ? "✓" : ""}
                  </td>

                  {/* الرياضيات */}
                  <td
                    onClick={() => toggleStudentCheck(st.id, "mathDebutant")}
                    className="border border-black cursor-pointer select-none text-center font-bold text-black"
                  >
                    {st.mathDebutant ? "✓" : ""}
                  </td>
                  <td
                    onClick={() => toggleStudentCheck(st.id, "math1Chiffre")}
                    className="border border-black cursor-pointer select-none text-center font-bold text-black"
                  >
                    {st.math1Chiffre ? "✓" : ""}
                  </td>
                  <td
                    onClick={() => toggleStudentCheck(st.id, "math2Chiffres")}
                    className="border border-black cursor-pointer select-none text-center font-bold text-black"
                  >
                    {st.math2Chiffres ? "✓" : ""}
                  </td>
                  <td
                    onClick={() => toggleStudentCheck(st.id, "mathAddition")}
                    className="border border-black cursor-pointer select-none text-center font-bold text-black"
                  >
                    {st.mathAddition ? "✓" : ""}
                  </td>
                  <td
                    onClick={() => toggleStudentCheck(st.id, "mathSoustraction")}
                    className="border border-black cursor-pointer select-none text-center font-bold text-black"
                  >
                    {st.mathSoustraction ? "✓" : ""}
                  </td>

                  {/* المسألة */}
                  <td
                    onClick={() => toggleStudentCheck(st.id, "mathProbMaitrise")}
                    className="border border-black cursor-pointer select-none text-center font-bold text-black"
                  >
                    {st.mathProbMaitrise ? "✓" : ""}
                  </td>
                  <td
                    onClick={() =>
                      toggleStudentCheck(st.id, "mathProbNonMaitrise")
                    }
                    className="border border-black cursor-pointer select-none text-center font-bold text-black"
                  >
                    {st.mathProbNonMaitrise ? "✓" : ""}
                  </td>

                  {/* Français */}
                  <td
                    onClick={() => toggleStudentCheck(st.id, "frDebutant")}
                    className="border border-black cursor-pointer select-none text-center font-bold text-black"
                  >
                    {st.frDebutant ? "✓" : ""}
                  </td>
                  <td
                    onClick={() => toggleStudentCheck(st.id, "frLettre")}
                    className="border border-black cursor-pointer select-none text-center font-bold text-black"
                  >
                    {st.frLettre ? "✓" : ""}
                  </td>
                  <td
                    onClick={() => toggleStudentCheck(st.id, "frMS")}
                    className="border border-black cursor-pointer select-none text-center font-bold text-black"
                  >
                    {st.frMS ? "✓" : ""}
                  </td>
                  <td
                    onClick={() => toggleStudentCheck(st.id, "frMA")}
                    className="border border-black cursor-pointer select-none text-center font-bold text-black"
                  >
                    {st.frMA ? "✓" : ""}
                  </td>
                  <td
                    onClick={() => toggleStudentCheck(st.id, "frMGC")}
                    className="border border-black cursor-pointer select-none text-center font-bold text-black"
                  >
                    {st.frMGC ? "✓" : ""}
                  </td>

                  {/* ملاحظات */}
                  <td className="border border-black p-0.5 text-right">
                    <input
                      type="text"
                      value={st.remarks}
                      onChange={(e) =>
                        handleStudentRemarkChange(st.id, e.target.value)
                      }
                      placeholder="..."
                      className="w-full bg-transparent border-none text-[10px] text-slate-800 focus:bg-yellow-50 focus:outline-none px-1"
                    />
                  </td>
                </tr>
              ))}

              {/* Totals Row at the bottom of the table */}
              <tr className="border-t-2 border-black bg-slate-100 font-extrabold text-black">
                <td className="border border-black p-1 text-center font-black">
                  المجموع ({students.length})
                </td>

                {/* اللغة العربية totals */}
                <td className="border border-black p-1">
                  {students.filter((s) => s.arDebutant).length || "-"}
                </td>
                <td className="border border-black p-1">
                  {students.filter((s) => s.arLettre).length || "-"}
                </td>
                <td className="border border-black p-1">
                  {students.filter((s) => s.arMot).length || "-"}
                </td>
                <td className="border border-black p-1">
                  {students.filter((s) => s.arParagraphe).length || "-"}
                </td>
                <td className="border border-black p-1">
                  {students.filter((s) => s.arHistoire).length || "-"}
                </td>

                {/* الفهم totals */}
                <td className="border border-black p-1">
                  {students.filter((s) => s.arCompMaitrise).length || "-"}
                </td>
                <td className="border border-black p-1">
                  {students.filter((s) => s.arCompNonMaitrise).length || "-"}
                </td>

                {/* الرياضيات totals */}
                <td className="border border-black p-1">
                  {students.filter((s) => s.mathDebutant).length || "-"}
                </td>
                <td className="border border-black p-1">
                  {students.filter((s) => s.math1Chiffre).length || "-"}
                </td>
                <td className="border border-black p-1">
                  {students.filter((s) => s.math2Chiffres).length || "-"}
                </td>
                <td className="border border-black p-1">
                  {students.filter((s) => s.mathAddition).length || "-"}
                </td>
                <td className="border border-black p-1">
                  {students.filter((s) => s.mathSoustraction).length || "-"}
                </td>

                {/* المسألة totals */}
                <td className="border border-black p-1">
                  {students.filter((s) => s.mathProbMaitrise).length || "-"}
                </td>
                <td className="border border-black p-1">
                  {students.filter((s) => s.mathProbNonMaitrise).length || "-"}
                </td>

                {/* Français totals */}
                <td className="border border-black p-1">
                  {students.filter((s) => s.frDebutant).length || "-"}
                </td>
                <td className="border border-black p-1">
                  {students.filter((s) => s.frLettre).length || "-"}
                </td>
                <td className="border border-black p-1">
                  {students.filter((s) => s.frMS).length || "-"}
                </td>
                <td className="border border-black p-1">
                  {students.filter((s) => s.frMA).length || "-"}
                </td>
                <td className="border border-black p-1">
                  {students.filter((s) => s.frMGC).length || "-"}
                </td>

                {/* ملاحظات */}
                <td className="border border-black p-1 text-slate-500 font-normal text-[9px]">
                  -
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Official Footer Signatures */}
        <div className="grid grid-cols-3 pt-6 text-xs md:text-sm font-bold text-slate-900 border-t border-slate-300 gap-4">
          <div className="text-center space-y-6">
            <p>الأستاذ(ة):</p>
            <p className="text-[11px] text-slate-400 font-normal">
              ................................................
            </p>
          </div>
          <div className="text-center space-y-6">
            <p>مدير(ة) المؤسسة:</p>
            <p className="text-[11px] text-slate-400 font-normal">
              ................................................
            </p>
          </div>
          <div className="text-center space-y-6">
            <p>المفتش(ة) التربوي(ة):</p>
            <p className="text-[11px] text-slate-400 font-normal">
              ................................................
            </p>
          </div>
        </div>
      </div>

      {/* Modal: Bulk Import from Massar / Excel */}
      {showImportModal && (
        <div className="no-print fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-5 space-y-4 border border-slate-200 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-purple-700 font-bold text-base">
                <Upload className="w-5 h-5" />
                <h3>استيراد لائحة المتعلمين من مسار أو Excel</h3>
              </div>
              <button
                onClick={() => setShowImportModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              انسخ أسماء تلاميذ قسمك من منظومة مسار (Massar) أو من جدول Excel، ثم
              الصقها هنا مباشرة. سيتم وضع كل اسم في سطر مستقل وإنشاء الشبكة
              فورياً.
            </p>

            <textarea
              rows={8}
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="مثال:&#10;محمد السملالي&#10;فاطمة الزهراء الإدريسي&#10;يوسف العمراني&#10;خديجة بنجلون..."
              className="w-full border border-slate-300 rounded-xl p-3 text-xs font-medium text-slate-900 focus:outline-blue-500 font-sans"
              dir="rtl"
            />

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-500 font-medium">
                {importText.split(/\r?\n/).filter((l) => l.trim().length > 0)
                  .length}{" "}
                اسم مسجل
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowImportModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  onClick={handleBulkImport}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-5 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Check className="w-4 h-4" />
                  <span>تطبيق والاستيراد</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save feedback toast */}
      {saveToast && (
        <div className="no-print fixed bottom-6 left-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>تم حفظ بيانات وتعديلات شبكة الموضعة بنجاح!</span>
        </div>
      )}
    </div>
  );
};
