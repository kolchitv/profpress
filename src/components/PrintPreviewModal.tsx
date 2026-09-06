import React, { useState, useRef } from "react";
import {
  Printer,
  Download,
  Eye,
  X,
  Sparkles,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Palette,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Layers,
  Calendar,
  UserCheck,
  Scroll,
  FileText,
  Table,
  CalendarRange,
  Award,
  FolderKanban,
  RotateCcw,
} from "lucide-react";
import { TeacherProfile, TabKey } from "../types";
import { generatePdfFromElement } from "../utils/pdfGenerator";
import { TimetableEditor } from "./TimetableEditor";
import { TeacherCard } from "./TeacherCard";
import { ClassCharter } from "./ClassCharter";
import { CoverGenerator } from "./CoverGenerator";
import { EvaluationGrid } from "./EvaluationGrid";
import { HolidaysCalendar } from "./HolidaysCalendar";
import { CertificatesGenerator } from "./CertificatesGenerator";
import { CumulativePortfolio } from "./CumulativePortfolio";

interface PrintPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacherProfile: TeacherProfile;
  initialDocument?: TabKey;
}

interface DocumentMeta {
  key: TabKey;
  title: string;
  orientation: "portrait" | "landscape";
  category: string;
  icon: any;
  filename: string;
}

const DOCUMENTS: DocumentMeta[] = [
  {
    key: "timetable",
    title: "استعمال الزمن الأسبوعي (مدرسة الريادة)",
    orientation: "landscape",
    category: "التنظيم البيداغوجي",
    icon: Calendar,
    filename: "استعمال_الزمن_الأسبوعي_الريادة.pdf",
  },
  {
    key: "card",
    title: "البطاقة الشخصية للأستاذ(ة) (Fiche Personnelle)",
    orientation: "portrait",
    category: "الوثائق الإدارية",
    icon: UserCheck,
    filename: "البطاقة_الشخصية_للأستاذ.pdf",
  },
  {
    key: "charter",
    title: "ملصق بوستر ميثاق وقوانين جماعة الفصل",
    orientation: "portrait",
    category: "تدبير الفصل",
    icon: Scroll,
    filename: "ميثاق_وقوانين_القسم.pdf",
  },
  {
    key: "covers",
    title: "واجهة وأغلفة الملفات التربوية",
    orientation: "portrait",
    category: "الملفات والسجلات",
    icon: FileText,
    filename: "واجهة_الملف_التربوي.pdf",
  },
  {
    key: "grids",
    title: "شبكة تفريغ نتائج المراقبة المستمرة ومسار",
    orientation: "landscape",
    category: "التقويم والدعم",
    icon: Table,
    filename: "شبكة_تفريغ_نتائج_مسار.pdf",
  },
  {
    key: "holidays",
    title: "لائحة العطل المدرسية الرسمية 2026/2027",
    orientation: "portrait",
    category: "المقرر الوزاري",
    icon: CalendarRange,
    filename: "لائحة_العطل_المدرسية_2026_2027.pdf",
  },
  {
    key: "certificates",
    title: "شهادة التقدير والتفوق والتشجيع",
    orientation: "landscape",
    category: "التحفيز والتميز",
    icon: Award,
    filename: "شهادة_تقدير_وتفوق.pdf",
  },
  {
    key: "portfolio",
    title: "فهرس ومحاور الملف التراكمي للريادة",
    orientation: "portrait",
    category: "الملف التراكمي",
    icon: FolderKanban,
    filename: "فهرس_الملف_التراكمي.pdf",
  },
];

export const PrintPreviewModal: React.FC<PrintPreviewModalProps> = ({
  isOpen,
  onClose,
  teacherProfile,
  initialDocument = "timetable",
}) => {
  const [selectedDocKey, setSelectedDocKey] = useState<TabKey>(initialDocument);
  const [quality, setQuality] = useState<"high" | "ultra" | "standard">("ultra");
  const [colorMode, setColorMode] = useState<"color" | "grayscale">("color");
  const [zoomLevel, setZoomLevel] = useState<number>(85); // percentage
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [progressStatus, setProgressStatus] = useState<string>("");
  const [generationSuccess, setGenerationSuccess] = useState<boolean>(false);

  const previewSheetRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const currentDocMeta =
    DOCUMENTS.find((d) => d.key === selectedDocKey) || DOCUMENTS[0];

  const handleDownloadPdf = async () => {
    if (!previewSheetRef.current) return;

    setIsGenerating(true);
    setGenerationSuccess(false);

    // Look for target print sheet inside the preview ref
    const targetElement =
      previewSheetRef.current.querySelector<HTMLElement>(".print-sheet") ||
      previewSheetRef.current;

    try {
      await generatePdfFromElement(targetElement, {
        filename: currentDocMeta.filename,
        orientation: currentDocMeta.orientation,
        quality: quality,
        colorMode: colorMode,
        onProgress: (status) => setProgressStatus(status),
      });

      setGenerationSuccess(true);
      setTimeout(() => setGenerationSuccess(false), 5000);
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء معالجة ملف PDF. يرجى المحاولة مجدداً أو استخدام الطباعة المباشرة.");
    } finally {
      setIsGenerating(false);
      setProgressStatus("");
    }
  };

  const handleDirectPrint = () => {
    window.print();
  };

  return (
    <div className="no-print fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex flex-col font-cairo">
      {/* Top Controls Bar */}
      <div className="bg-slate-900 border-b border-slate-800 text-white px-4 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0 shadow-lg">
        {/* Left / Start: Title and Document Selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-amber-300 font-bold">
              <Eye className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-sm md:text-base font-bold text-white flex items-center gap-2">
                <span>معاينة الطباعة وتوليد PDF عالي الدقة</span>
                <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] px-2 py-0.5 rounded font-mono">
                  A4 {currentDocMeta.orientation === "landscape" ? "أفقي (297×210mm)" : "عمودي (210×297mm)"}
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                مطابق للألوان الرسمية والخطوط المغربية الأصيلة بدقة 300 DPI
              </p>
            </div>
          </div>

          {/* Document Switcher Dropdown */}
          <div className="mr-4">
            <select
              value={selectedDocKey}
              onChange={(e) => setSelectedDocKey(e.target.value as TabKey)}
              className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold focus:ring-1 focus:ring-emerald-500 cursor-pointer"
            >
              {DOCUMENTS.map((doc) => (
                <option key={doc.key} value={doc.key}>
                  {doc.title} ({doc.orientation === "landscape" ? "أفقي" : "عمودي"})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Center / Tuning Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-slate-800/80 border border-slate-700 p-1 rounded-lg">
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 10, 40))}
              className="p-1 hover:bg-slate-700 rounded text-slate-300 transition cursor-pointer"
              title="تصغير المعاينة"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono text-slate-300 px-1 font-bold">
              {zoomLevel}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 10, 130))}
              className="p-1 hover:bg-slate-700 rounded text-slate-300 transition cursor-pointer"
              title="تكبير المعاينة"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(currentDocMeta.orientation === "landscape" ? 75 : 85)}
              className="text-[10px] text-emerald-400 hover:text-emerald-300 font-bold px-1.5 py-0.5"
            >
              ملاءمة الشاشة
            </button>
          </div>

          {/* Quality Mode */}
          <div className="flex items-center gap-1 bg-slate-800/80 border border-slate-700 p-1 rounded-lg">
            <span className="text-[10px] text-slate-400 px-1 font-medium">الدقة:</span>
            <button
              onClick={() => setQuality("ultra")}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition cursor-pointer ${
                quality === "ultra"
                  ? "bg-amber-400 text-slate-950 shadow-xs"
                  : "text-slate-300 hover:bg-slate-700"
              }`}
            >
              فائقة 300 DPI ⭐
            </button>
            <button
              onClick={() => setQuality("high")}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition cursor-pointer ${
                quality === "high"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-300 hover:bg-slate-700"
              }`}
            >
              عالية 200 DPI
            </button>
          </div>

          {/* Color Mode */}
          <div className="flex items-center gap-1 bg-slate-800/80 border border-slate-700 p-1 rounded-lg">
            <button
              onClick={() => setColorMode("color")}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition cursor-pointer ${
                colorMode === "color"
                  ? "bg-emerald-700 text-white"
                  : "text-slate-400 hover:bg-slate-700"
              }`}
            >
              🎨 بالألوان
            </button>
            <button
              onClick={() => setColorMode("grayscale")}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition cursor-pointer ${
                colorMode === "grayscale"
                  ? "bg-slate-200 text-slate-900"
                  : "text-slate-400 hover:bg-slate-700"
              }`}
              title="توفير الحبر للنسخ العادي"
            >
              🖨️ موفر للحبر (رمادي)
            </button>
          </div>
        </div>

        {/* Right / Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDirectPrint}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-amber-400" />
            <span>طباعة المتصفح</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={isGenerating}
            className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 text-white px-4 py-1.5 rounded-lg text-xs font-black flex items-center gap-2 transition cursor-pointer shadow-md"
          >
            {isGenerating ? (
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>جاري البناء...</span>
              </span>
            ) : (
              <>
                <Download className="w-4 h-4 text-amber-300" />
                <span>تحميل ملف PDF جاهز للطباعة</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer mr-2"
            title="إغلاق المعاينة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Generation Status Toast Banner */}
      {isGenerating && (
        <div className="bg-amber-500 text-slate-950 text-xs font-bold px-4 py-1.5 text-center flex items-center justify-center gap-2 shadow-xs">
          <span className="w-3 h-3 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
          <span>{progressStatus || "جاري معالجة المستند وتحويله إلى ملف PDF عالي الدقة..."}</span>
        </div>
      )}

      {generationSuccess && (
        <div className="bg-emerald-700 text-white text-xs font-bold px-4 py-1.5 text-center flex items-center justify-center gap-2 shadow-xs animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-amber-300" />
          <span>تم توليد وتحميل ملف PDF بنجاح! جاهز للإرسال والطباعة.</span>
        </div>
      )}

      {/* Main Preview Stage (Scrollable with zoom scaling) */}
      <div className="flex-1 overflow-auto bg-slate-900/90 p-4 md:p-8 flex items-center justify-center">
        <div
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: "center top",
            transition: "transform 0.15s ease-out",
          }}
          className="transition-all"
        >
          {/* Simulated Physical A4 Sheet Container */}
          <div
            ref={previewSheetRef}
            className={`bg-white rounded-lg shadow-2xl overflow-hidden relative border border-slate-300 ${
              colorMode === "grayscale" ? "grayscale" : ""
            } ${
              currentDocMeta.orientation === "landscape"
                ? "w-[1122px] min-h-[793px]"
                : "w-[793px] min-h-[1122px]"
            }`}
          >
            {/* Watermark subtle header in preview */}
            <div className="absolute top-1 right-2 text-[9px] text-slate-300 pointer-events-none select-none font-mono">
              A4 {currentDocMeta.orientation === "landscape" ? "Landscape" : "Portrait"} • 300 DPI Standard
            </div>

            {/* Render Document Component */}
            <div className="p-4 md:p-6">
              {selectedDocKey === "timetable" && (
                <TimetableEditor teacherProfile={teacherProfile} />
              )}

              {selectedDocKey === "card" && (
                <TeacherCard
                  profile={teacherProfile}
                  onUpdateProfile={() => {}}
                />
              )}

              {selectedDocKey === "charter" && (
                <ClassCharter teacherProfile={teacherProfile} />
              )}

              {selectedDocKey === "covers" && (
                <CoverGenerator teacherProfile={teacherProfile} />
              )}

              {selectedDocKey === "grids" && (
                <EvaluationGrid teacherProfile={teacherProfile} />
              )}

              {selectedDocKey === "holidays" && (
                <HolidaysCalendar teacherProfile={teacherProfile} />
              )}

              {selectedDocKey === "certificates" && (
                <CertificatesGenerator teacherProfile={teacherProfile} />
              )}

              {selectedDocKey === "portfolio" && (
                <CumulativePortfolio teacherProfile={teacherProfile} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Information Footer */}
      <div className="bg-slate-900 border-t border-slate-800 px-4 py-2 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 font-bold">وثيقة مختارة:</span>
          <span className="text-white font-medium">{currentDocMeta.title}</span>
          <span className="text-slate-600">|</span>
          <span>المؤسسة: {teacherProfile.institution}</span>
          <span className="text-slate-600">|</span>
          <span>الأستاذ: {teacherProfile.fullNameAr}</span>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-slate-500">
          <span>المعايير: أبعاد A4 الرسمية (210×297 مم)</span>
          <span>•</span>
          <span>محاذاة كاملة للغة العربية وتوافق مسار</span>
        </div>
      </div>
    </div>
  );
};
