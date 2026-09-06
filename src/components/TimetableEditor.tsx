import React, { useState, useRef } from "react";
import {
  Printer,
  Plus,
  Trash2,
  RotateCcw,
  Sparkles,
  Calendar,
  Clock,
  Layers,
  Save,
  Download,
} from "lucide-react";
import { TeacherProfile, TimetableSlot } from "../types";
import { DEFAULT_TIMETABLE_SLOTS } from "../data/defaultTemplates";
import { generatePdfFromElement } from "../utils/pdfGenerator";

interface TimetableEditorProps {
  teacherProfile: TeacherProfile;
}

const DAYS_OF_WEEK = ["الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

const SUBJECT_COLORS: Record<string, string> = {
  "اللغة العربية": "bg-emerald-50 text-emerald-900 border-emerald-300",
  "الرياضيات": "bg-blue-50 text-blue-900 border-blue-300",
  "اللغة الفرنسية": "bg-sky-50 text-sky-900 border-sky-300",
  "التربية الإسلامية": "bg-teal-50 text-teal-900 border-teal-300",
  "النشاط العلمي": "bg-indigo-50 text-indigo-900 border-indigo-300",
  "الاجتماعيات": "bg-amber-50 text-amber-900 border-amber-300",
  "التربية الفنية": "bg-rose-50 text-rose-900 border-rose-300",
  "التربية البدنية": "bg-green-50 text-green-900 border-green-300",
  "دعم مدرسة الريادة": "bg-purple-50 text-purple-900 border-purple-300",
  "التقويم والمعالجة المركزة": "bg-amber-100 text-amber-950 border-amber-400",
  "أنشطة الحياة المدرسية": "bg-orange-50 text-orange-900 border-orange-300",
};

export const TimetableEditor: React.FC<TimetableEditorProps> = ({ teacherProfile }) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [slots, setSlots] = useState<TimetableSlot[]>(DEFAULT_TIMETABLE_SLOTS);
  const [isPioneerMode, setIsPioneerMode] = useState<boolean>(true);
  const [sessionPattern, setSessionPattern] = useState<"continuous" | "two_shifts">("continuous");
  const [selectedDay, setSelectedDay] = useState<string>("الإثنين");

  // New slot form state
  const [newSubject, setNewSubject] = useState("اللغة العربية");
  const [newActivity, setNewActivity] = useState("القراءة (التعليم الصريح)");
  const [newStartTime, setNewStartTime] = useState("08:30");
  const [newEndTime, setNewEndTime] = useState("09:45");
  const [newGroup, setNewGroup] = useState("الكل");

  const handleDownloadPdf = async () => {
    if (!sheetRef.current) return;
    setIsGeneratingPdf(true);
    try {
      await generatePdfFromElement(sheetRef.current, {
        filename: `استعمال_الزمن_${teacherProfile.assignedLevel}_${teacherProfile.fullNameAr || "أستاذ"}.pdf`,
        orientation: "landscape",
        quality: "ultra",
        colorMode: "color",
      });
    } catch (err) {
      console.error("Failed to generate PDF:", err);
      alert("حدث خطأ أثناء توليد ملف PDF. يرجى استخدام زر طباعة المتصفح.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();
    const newSlot: TimetableSlot = {
      id: "slot_" + Date.now(),
      day: selectedDay,
      startTime: newStartTime,
      endTime: newEndTime,
      subject: newSubject,
      unitOrActivity: newActivity,
      group: newGroup,
    };
    setSlots((prev) => [...prev, newSlot]);
  };

  const handleDeleteSlot = (id: string) => {
    setSlots((prev) => prev.filter((s) => s.id !== id));
  };

  const handleResetDefault = () => {
    if (window.confirm("هل ترغب في استرجاع استعمال الزمن النموذجي لمدرسة الريادة؟")) {
      setSlots(DEFAULT_TIMETABLE_SLOTS);
    }
  };

  return (
    <div className="space-y-6">
      {/* Interactive Controls (Hidden in Print) */}
      <div className="no-print bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-700" />
                <span>محرر استعمال الزمن الأسبوعي</span>
              </h2>
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-0.5 rounded">
                A4 أفقي (Landscape)
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              صمم واطبع استعمال الزمن الخاص بمدرسة الريادة (التعليم الصريح والدعم المكثف طارل) أو المدرسة العمومية.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleResetDefault}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>استرجاع النموذج الرسمي</span>
            </button>
            <button
              id="download-timetable-pdf-btn"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-400 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              title="تحميل كملف PDF عالي الدقة A4"
            >
              <Download className="w-3.5 h-3.5 text-amber-300" />
              <span>{isGeneratingPdf ? "جاري التوليد..." : "تحميل PDF"}</span>
            </button>
            <button
              id="print-timetable-btn"
              onClick={() => window.print()}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة A4</span>
            </button>
          </div>
        </div>

        {/* Options Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-xs font-bold text-slate-700">النموذج البيداغوجي:</span>
            <button
              onClick={() => setIsPioneerMode(true)}
              className={`px-2.5 py-1 text-xs rounded-md font-bold transition cursor-pointer ${
                isPioneerMode ? "bg-blue-700 text-white" : "bg-white text-slate-600"
              }`}
            >
              مدرسة الريادة ⭐
            </button>
            <button
              onClick={() => setIsPioneerMode(false)}
              className={`px-2.5 py-1 text-xs rounded-md font-bold transition cursor-pointer ${
                !isPioneerMode ? "bg-blue-700 text-white" : "bg-white text-slate-600"
              }`}
            >
              مدرسة عمومية
            </button>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <span className="text-xs font-bold text-slate-700">صيغة التوقيت:</span>
            <button
              onClick={() => setSessionPattern("continuous")}
              className={`px-2.5 py-1 text-xs rounded-md font-bold transition cursor-pointer ${
                sessionPattern === "continuous" ? "bg-blue-700 text-white" : "bg-white text-slate-600"
              }`}
            >
              فترة مسترسلة (الصباح)
            </button>
            <button
              onClick={() => setSessionPattern("two_shifts")}
              className={`px-2.5 py-1 text-xs rounded-md font-bold transition cursor-pointer ${
                sessionPattern === "two_shifts" ? "bg-blue-700 text-white" : "bg-white text-slate-600"
              }`}
            >
              فترتان (صباح/مساء)
            </button>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs text-slate-600">
            <Clock className="w-4 h-4 text-blue-600 shrink-0" />
            <span>الحجم الساعي الأسبوعي: <strong>30 ساعة</strong> (شاملة للدعم والأنشطة)</span>
          </div>
        </div>

        {/* Add Slot Quick Form */}
        <form
          onSubmit={handleAddSlot}
          className="bg-blue-50/60 border border-blue-200 rounded-xl p-3.5 grid grid-cols-2 md:grid-cols-6 gap-2 text-xs"
        >
          <div>
            <label className="block text-slate-600 font-semibold mb-1">اليوم:</label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg p-1.5 text-xs font-semibold"
            >
              {DAYS_OF_WEEK.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">المادة:</label>
            <select
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg p-1.5 text-xs font-semibold"
            >
              <option value="اللغة العربية">اللغة العربية</option>
              <option value="الرياضيات">الرياضيات</option>
              <option value="اللغة الفرنسية">اللغة الفرنسية</option>
              <option value="التربية الإسلامية">التربية الإسلامية</option>
              <option value="النشاط العلمي">النشاط العلمي</option>
              <option value="الاجتماعيات">الاجتماعيات</option>
              <option value="التربية الفنية">التربية الفنية</option>
              <option value="التربية البدنية">التربية البدنية</option>
              <option value="دعم مدرسة الريادة">دعم مدرسة الريادة (TaRL)</option>
              <option value="التقويم والمعالجة المركزة">التقويم والمعالجة المركزة</option>
              <option value="أنشطة الحياة المدرسية">أنشطة الحياة المدرسية</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">المكون / النشاط:</label>
            <input
              type="text"
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
              placeholder="مثال: القراءة / الحساب الذهني"
              className="w-full bg-white border border-slate-300 rounded-lg p-1.5 text-xs font-medium"
              required
            />
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">التوقيت (من - إلى):</label>
            <div className="flex items-center gap-1" dir="ltr">
              <input
                type="text"
                value={newStartTime}
                onChange={(e) => setNewStartTime(e.target.value)}
                className="w-1/2 bg-white border border-slate-300 rounded-lg p-1.5 text-xs text-center font-mono"
                placeholder="08:30"
              />
              <span>-</span>
              <input
                type="text"
                value={newEndTime}
                onChange={(e) => setNewEndTime(e.target.value)}
                className="w-1/2 bg-white border border-slate-300 rounded-lg p-1.5 text-xs text-center font-mono"
                placeholder="09:45"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">الفوج المستهدف:</label>
            <select
              value={newGroup}
              onChange={(e) => setNewGroup(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg p-1.5 text-xs font-semibold"
            >
              <option value="الكل">كامل القسم (الكل)</option>
              <option value="الفوج 1">الفوج 1</option>
              <option value="الفوج 2">الفوج 2</option>
              <option value="فوج الدعم">فوج الدعم المكثف</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold p-1.5 rounded-lg text-xs flex items-center justify-center gap-1 cursor-pointer transition shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة حصة</span>
            </button>
          </div>
        </form>
      </div>

      {/* Official A4 Landscape Timetable Sheet (Styled for Screen and Direct Print) */}
      <div ref={sheetRef} className="print-sheet bg-white border border-slate-300 rounded-2xl p-6 md:p-8 shadow-xs max-w-6xl mx-auto">
        {/* Moroccan Official Print Header */}
        <div className="border-b-2 border-slate-800 pb-3 mb-4">
          <div className="flex items-start justify-between text-xs text-slate-700 font-semibold">
            <div className="space-y-0.5">
              <p className="font-bold text-slate-900">المملكة المغربية</p>
              <p>وزارة التربية الوطنية والتعليم الأولي والرياضة</p>
              <p>{teacherProfile.academy}</p>
              <p>{teacherProfile.directorate}</p>
              <p>مؤسسة: <strong className="text-slate-900">{teacherProfile.institution}</strong></p>
            </div>

            <div className="text-center">
              <img
                src="/morocco-ministry-logo.png"
                alt="شعار وزارة التربية الوطنية"
                className="h-16 w-16 mx-auto object-contain mb-1 drop-shadow-xs"
              />
              <h3 className="text-base md:text-lg font-black font-cairo text-slate-900 leading-tight">
                استعمال الزمن الأسبوعي
              </h3>
              <p className="text-[11px] font-bold text-blue-800">
                {isPioneerMode ? "صيغة مدرسة الريادة (التعليم الصريح والدعم المكثف)" : "صيغة التعليم الابتدائي العمومي"}
              </p>
              <p className="text-[10px] text-slate-500">الموسم الدراسي: {teacherProfile.schoolYear}</p>
            </div>

            <div className="text-left space-y-0.5" dir="ltr">
              <p className="font-bold text-slate-900">ROYAUME DU MAROC</p>
              <p>Ministère de l'Éducation Nationale</p>
              <p>Niveau: <strong>{teacherProfile.assignedLevel}</strong></p>
              <p>Classe: <strong>{teacherProfile.classGroups}</strong></p>
              <p className="text-[11px]">Enseignant: <strong>{teacherProfile.fullNameFr}</strong></p>
            </div>
          </div>

          {/* Teacher Quick Info Pill Box */}
          <div className="grid grid-cols-4 gap-2 bg-slate-100/90 text-xs p-2 rounded-lg border border-slate-200 mt-2 text-right">
            <div><span className="text-slate-500">الأستاذ(ة):</span> <strong className="text-slate-900">{teacherProfile.fullNameAr}</strong></div>
            <div><span className="text-slate-500">رقم التأجير (SOM):</span> <strong className="text-slate-900">{teacherProfile.somNumber}</strong></div>
            <div><span className="text-slate-500">المستوى والقسم:</span> <strong className="text-slate-900">{teacherProfile.assignedLevel}</strong></div>
            <div><span className="text-slate-500">عدد التلاميذ:</span> <strong className="text-slate-900">{teacherProfile.totalStudents} ({teacherProfile.femaleStudents} إناث)</strong></div>
          </div>
        </div>

        {/* Timetable Grid Columns By Day */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-2 border border-slate-300 rounded-lg p-2 bg-slate-50/50">
          {DAYS_OF_WEEK.map((day) => {
            const daySlots = slots
              .filter((s) => s.day === day)
              .sort((a, b) => a.startTime.localeCompare(b.startTime));

            return (
              <div key={day} className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-2xs flex flex-col">
                <div className="bg-blue-900 text-white text-center py-1.5 px-1 font-bold text-xs">
                  {day}
                </div>

                <div className="p-1.5 space-y-1.5 flex-1 min-h-[220px]">
                  {daySlots.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-[10px] text-slate-400 italic text-center py-6">
                      لا توجد حصص
                    </div>
                  ) : (
                    daySlots.map((slot) => {
                      const colorClass =
                        SUBJECT_COLORS[slot.subject] ||
                        "bg-slate-50 text-slate-800 border-slate-300";

                      return (
                        <div
                          key={slot.id}
                          className={`border rounded-md p-1.5 relative group text-right transition-all ${colorClass}`}
                        >
                          <div className="flex items-center justify-between text-[10px] font-mono font-bold opacity-80" dir="ltr">
                            <span>{slot.startTime} - {slot.endTime}</span>
                            <span className="font-sans text-[9px] bg-white/70 px-1 rounded">
                              {slot.group}
                            </span>
                          </div>
                          <div className="font-bold text-[11px] mt-0.5 leading-snug">
                            {slot.subject}
                          </div>
                          <div className="text-[10px] opacity-90 leading-tight">
                            {slot.unitOrActivity}
                          </div>

                          {/* Delete Action button (no-print) */}
                          <button
                            onClick={() => handleDeleteSlot(slot.id)}
                            className="no-print absolute top-1 left-1 opacity-0 group-hover:opacity-100 text-rose-600 hover:text-rose-800 p-0.5 rounded transition cursor-pointer"
                            title="حذف الحصة"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pioneer School Explicit Teaching Key Guidance */}
        {isPioneerMode && (
          <div className="mt-3 p-2.5 bg-blue-50/60 border border-blue-200 rounded-lg text-[11px] text-blue-950 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>توجيهات مدرسة الريادة:</strong> تطبيق خطوات التعليم الصريح (النمذجة ◄ الممارسة الموجهة ◄ الممارسة المستقلة)، واعتماد الأنشطة الروتينية اليومية وحصص الدعم المكثف وفق مقاربة طارل (TaRL).
              </span>
            </div>
            <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
              مجموع الحصص الأسبوعية: {slots.length} حصة
            </span>
          </div>
        )}

        {/* Administrative Endorsements Zone */}
        <div className="grid grid-cols-3 gap-4 text-center text-xs mt-6 pt-4 border-t-2 border-slate-800">
          <div className="border border-dashed border-slate-400 rounded-lg p-2.5 min-h-[85px] flex flex-col justify-between">
            <span className="font-bold text-slate-800">توقيع السيد(ة) الأستاذ(ة)</span>
            <span className="text-[10px] text-slate-400">حرر في: ....................</span>
          </div>
          <div className="border border-dashed border-slate-400 rounded-lg p-2.5 min-h-[85px] flex flex-col justify-between">
            <span className="font-bold text-slate-800">تأشيرة وخاتم السيد رئيس المؤسسة</span>
            <span className="text-[10px] text-slate-400">مصادق عليه بتاريخ: ....................</span>
          </div>
          <div className="border border-dashed border-slate-400 rounded-lg p-2.5 min-h-[85px] flex flex-col justify-between">
            <span className="font-bold text-slate-800">تأشيرة السيد المفتش التربوي</span>
            <span className="text-[10px] text-slate-400">مفتش المقاطعة التربوية</span>
          </div>
        </div>
      </div>
    </div>
  );
};
