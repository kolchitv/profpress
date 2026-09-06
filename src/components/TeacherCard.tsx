import React, { useState, useRef } from "react";
import {
  UserCheck,
  Printer,
  Edit3,
  Save,
  Camera,
  School,
  Building,
  GraduationCap,
  Users,
  Phone,
  Mail,
  RotateCcw,
  Download,
} from "lucide-react";
import { TeacherProfile } from "../types";
import { DEFAULT_TEACHER_PROFILE } from "../data/defaultTemplates";
import { generatePdfFromElement } from "../utils/pdfGenerator";

interface TeacherCardProps {
  profile: TeacherProfile;
  onUpdateProfile: (profile: TeacherProfile) => void;
}

export const TeacherCard: React.FC<TeacherCardProps> = ({
  profile,
  onUpdateProfile,
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [formData, setFormData] = useState<TeacherProfile>(profile);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const handleDownloadPdf = async () => {
    if (!sheetRef.current) return;
    setIsGeneratingPdf(true);
    try {
      await generatePdfFromElement(sheetRef.current, {
        filename: `البطاقة_الشخصية_${formData.fullNameAr || "أستاذ"}.pdf`,
        orientation: "portrait",
        quality: "ultra",
        colorMode: "color",
      });
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء توليد ملف PDF. يرجى استخدام زر طباعة المتصفح.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleChange = (field: keyof TeacherProfile, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  const handleReset = () => {
    if (window.confirm("استعادة البيانات النموذجية؟")) {
      setFormData(DEFAULT_TEACHER_PROFILE);
      onUpdateProfile(DEFAULT_TEACHER_PROFILE);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPhotoUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar (Hidden in Print) */}
      <div className="no-print bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-blue-700" />
              <span>البطاقة الشخصية للأستاذ(ة) - Fiche Personnelle</span>
            </h2>
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-0.5 rounded">
              تنسيق رسمي A4
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            أنشئ واطبع بطاقتك الشخصية والمهنية الرسمية بتصميم وزاري أنيق ومعتمد لدى الإدارة التربوية وهيئة التفتيش.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
              isEditing
                ? "bg-amber-500 text-white hover:bg-amber-600"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? "إلغاء التعديل" : "تعديل البيانات"}</span>
          </button>
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 text-xs font-medium flex items-center gap-1 cursor-pointer transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>نموذج افتراضي</span>
          </button>
          <button
            id="download-teacher-card-pdf-btn"
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-400 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
            title="تحميل كملف PDF عالي الدقة A4"
          >
            <Download className="w-3.5 h-3.5 text-amber-300" />
            <span>{isGeneratingPdf ? "جاري التوليد..." : "تحميل PDF"}</span>
          </button>
          <button
            id="print-teacher-card-btn"
            onClick={() => window.print()}
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>طباعة A4</span>
          </button>
        </div>
      </div>

      {/* Edit Form Drawer if isEditing */}
      {isEditing && (
        <form
          onSubmit={handleSave}
          className="no-print bg-white border-2 border-emerald-500/60 rounded-2xl p-5 shadow-md space-y-4"
        >
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h3 className="text-sm font-bold text-slate-900">تعديل بيانات البطاقة الشخصية</h3>
            <span className="text-xs text-emerald-700 font-medium">سيتم تحديث البطاقة فور الحفظ</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="font-semibold block text-slate-700 mb-1">الاسم الكامل بالعربية:</label>
              <input
                type="text"
                value={formData.fullNameAr}
                onChange={(e) => handleChange("fullNameAr", e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium"
              />
            </div>
            <div>
              <label className="font-semibold block text-slate-700 mb-1">Nom & Prénom (en français):</label>
              <input
                type="text"
                value={formData.fullNameFr}
                onChange={(e) => handleChange("fullNameFr", e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium"
              />
            </div>
            <div>
              <label className="font-semibold block text-slate-700 mb-1">رقم التأجير (N° SOM):</label>
              <input
                type="text"
                value={formData.somNumber}
                onChange={(e) => handleChange("somNumber", e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium font-mono"
              />
            </div>

            <div>
              <label className="font-semibold block text-slate-700 mb-1">رقم ب.ت.و (N° CIN):</label>
              <input
                type="text"
                value={formData.cin}
                onChange={(e) => handleChange("cin", e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium font-mono"
              />
            </div>
            <div>
              <label className="font-semibold block text-slate-700 mb-1">الأكاديمية الجهوية (AREF):</label>
              <input
                type="text"
                value={formData.academy}
                onChange={(e) => handleChange("academy", e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium"
              />
            </div>
            <div>
              <label className="font-semibold block text-slate-700 mb-1">المديرية الإقليمية:</label>
              <input
                type="text"
                value={formData.directorate}
                onChange={(e) => handleChange("directorate", e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium"
              />
            </div>

            <div>
              <label className="font-semibold block text-slate-700 mb-1">المؤسسة التعليمية:</label>
              <input
                type="text"
                value={formData.institution}
                onChange={(e) => handleChange("institution", e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium"
              />
            </div>
            <div>
              <label className="font-semibold block text-slate-700 mb-1">الجماعة / الدائرة:</label>
              <input
                type="text"
                value={formData.commune}
                onChange={(e) => handleChange("commune", e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium"
              />
            </div>
            <div>
              <label className="font-semibold block text-slate-700 mb-1">الإطار والدرجة:</label>
              <input
                type="text"
                value={formData.grade}
                onChange={(e) => handleChange("grade", e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium"
              />
            </div>

            <div>
              <label className="font-semibold block text-slate-700 mb-1">الرتبة (Échelon):</label>
              <input
                type="text"
                value={formData.echelon}
                onChange={(e) => handleChange("echelon", e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium"
              />
            </div>
            <div>
              <label className="font-semibold block text-slate-700 mb-1">المستوى المسند:</label>
              <input
                type="text"
                value={formData.assignedLevel}
                onChange={(e) => handleChange("assignedLevel", e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium"
              />
            </div>
            <div>
              <label className="font-semibold block text-slate-700 mb-1">مواد التدريس:</label>
              <input
                type="text"
                value={formData.subjectTaught}
                onChange={(e) => handleChange("subjectTaught", e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium"
              />
            </div>

            <div>
              <label className="font-semibold block text-slate-700 mb-1">القسم والأفواج:</label>
              <input
                type="text"
                value={formData.classGroups}
                onChange={(e) => handleChange("classGroups", e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium"
              />
            </div>
            <div>
              <label className="font-semibold block text-slate-700 mb-1">مجموع التلاميذ:</label>
              <input
                type="number"
                value={formData.totalStudents}
                onChange={(e) => handleChange("totalStudents", Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium"
              />
            </div>
            <div>
              <label className="font-semibold block text-slate-700 mb-1">منهم إناث:</label>
              <input
                type="number"
                value={formData.femaleStudents}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  handleChange("femaleStudents", val);
                  handleChange("maleStudents", formData.totalStudents - val);
                }}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium"
              />
            </div>

            <div>
              <label className="font-semibold block text-slate-700 mb-1">تاريخ التوظيف:</label>
              <input
                type="date"
                value={formData.recruitmentDate}
                onChange={(e) => handleChange("recruitmentDate", e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium"
              />
            </div>
            <div>
              <label className="font-semibold block text-slate-700 mb-1">تاريخ التعيين بالمؤسسة:</label>
              <input
                type="date"
                value={formData.schoolAssignmentDate}
                onChange={(e) => handleChange("schoolAssignmentDate", e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium"
              />
            </div>
            <div>
              <label className="font-semibold block text-slate-700 mb-1">الهاتف والبريد (taalim.ma):</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium mb-1"
                placeholder="رقم الهاتف"
              />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-medium"
                placeholder="البريد الإلكتروني"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-5 py-2 rounded-lg text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>حفظ وتطبيق البيانات</span>
            </button>
          </div>
        </form>
      )}

      {/* Official A4 Printable Teacher Card (Fiche Personnelle) */}
      <div ref={sheetRef} className="print-sheet bg-white border border-slate-400 rounded-2xl p-6 md:p-10 shadow-xs max-w-4xl mx-auto space-y-6">
        {/* Moroccan Official Ministerial Header */}
        <div className="border-b-2 border-slate-800 pb-4">
          <div className="flex items-start justify-between text-xs text-slate-800 font-semibold">
            <div className="space-y-1">
              <p className="font-bold text-slate-900">المملكة المغربية</p>
              <p>وزارة التربية الوطنية والتعليم الأولي والرياضة</p>
              <p>{formData.academy}</p>
              <p>{formData.directorate}</p>
              <p className="text-blue-900 font-bold">مؤسسة: {formData.institution}</p>
            </div>

            <div className="text-center">
              <img
                src="/morocco-ministry-logo.png"
                alt="شعار وزارة التربية الوطنية"
                className="h-16 w-16 mx-auto object-contain mb-1 drop-shadow-xs"
              />
              <h1 className="text-xl md:text-2xl font-black font-cairo text-slate-900 tracking-wide">
                البطاقة الشخصية للأستاذ(ة)
              </h1>
              <p className="text-xs font-bold text-slate-600 tracking-wider">
                FICHE PERSONNELLE DE L'ENSEIGNANT(E)
              </p>
              <p className="text-[11px] text-blue-800 font-semibold mt-0.5">
                الموسم الدراسي: {formData.schoolYear}
              </p>
            </div>

            {/* Photo Box with optional upload */}
            <div className="relative group">
              <div className="w-24 h-28 border-2 border-dashed border-slate-400 rounded-lg flex flex-col items-center justify-center overflow-hidden bg-slate-50 text-slate-400 text-center p-1">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt="صورة الأستاذ"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <Camera className="w-6 h-6 mb-1 text-slate-300" />
                    <span className="text-[10px] leading-tight text-slate-500 font-medium">
                      صورة شمسية حديثة
                    </span>
                  </>
                )}
              </div>
              <label
                htmlFor="teacher-photo-input"
                className="no-print absolute inset-0 bg-black/40 text-white text-[10px] font-bold rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
              >
                تغيير الصورة
              </label>
              <input
                id="teacher-photo-input"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Section 1: المعطيات الشخصية */}
        <div className="space-y-2">
          <div className="bg-blue-900 text-white text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-2">
            <span>أولاً: المعطيات الشخصية والمدنية (Renseignements Personnels)</span>
          </div>

          <table className="w-full text-xs text-right border-collapse border border-slate-300">
            <tbody>
              <tr>
                <td className="border border-slate-300 bg-slate-50 p-2 font-bold w-1/4">الاسم والنسب بالعربية:</td>
                <td className="border border-slate-300 p-2 font-black text-slate-900 text-sm">{formData.fullNameAr}</td>
                <td className="border border-slate-300 bg-slate-50 p-2 font-bold w-1/4" dir="ltr">Nom et Prénom:</td>
                <td className="border border-slate-300 p-2 font-bold text-slate-900" dir="ltr">{formData.fullNameFr}</td>
              </tr>
              <tr>
                <td className="border border-slate-300 bg-slate-50 p-2 font-bold">رقم التأجير (N° SOM):</td>
                <td className="border border-slate-300 p-2 font-mono font-bold text-slate-900">{formData.somNumber}</td>
                <td className="border border-slate-300 bg-slate-50 p-2 font-bold">رقم البطاقة الوطنية (CIN):</td>
                <td className="border border-slate-300 p-2 font-mono font-bold text-slate-900">{formData.cin}</td>
              </tr>
              <tr>
                <td className="border border-slate-300 bg-slate-50 p-2 font-bold">رقم الهاتف النقال:</td>
                <td className="border border-slate-300 p-2 font-mono" dir="ltr">{formData.phone}</td>
                <td className="border border-slate-300 bg-slate-50 p-2 font-bold">البريد الإلكتروني المهني:</td>
                <td className="border border-slate-300 p-2 font-mono text-[11px]" dir="ltr">{formData.email}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 2: المعطيات الإدارية والمهنية */}
        <div className="space-y-2">
          <div className="bg-blue-900 text-white text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-2">
            <span>ثانياً: المعطيات الإدارية والمهنية (Situation Administrative)</span>
          </div>

          <table className="w-full text-xs text-right border-collapse border border-slate-300">
            <tbody>
              <tr>
                <td className="border border-slate-300 bg-slate-50 p-2 font-bold w-1/4">الإطار والدرجة:</td>
                <td className="border border-slate-300 p-2 font-bold text-slate-900">{formData.grade}</td>
                <td className="border border-slate-300 bg-slate-50 p-2 font-bold w-1/4">الرتبة الحالية:</td>
                <td className="border border-slate-300 p-2 font-bold text-slate-900">{formData.echelon}</td>
              </tr>
              <tr>
                <td className="border border-slate-300 bg-slate-50 p-2 font-bold">تاريخ التوظيف بالتعليم:</td>
                <td className="border border-slate-300 p-2 font-mono">{formData.recruitmentDate}</td>
                <td className="border border-slate-300 bg-slate-50 p-2 font-bold">تاريخ التعيين بالمؤسسة:</td>
                <td className="border border-slate-300 p-2 font-mono">{formData.schoolAssignmentDate}</td>
              </tr>
              <tr>
                <td className="border border-slate-300 bg-slate-50 p-2 font-bold">المقر الحالي للعمل:</td>
                <td className="border border-slate-300 p-2 font-semibold text-slate-900">{formData.institution}</td>
                <td className="border border-slate-300 bg-slate-50 p-2 font-bold">الجماعة التابعة لها:</td>
                <td className="border border-slate-300 p-2 font-semibold">{formData.commune}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 3: المعطيات التربوية والصفية */}
        <div className="space-y-2">
          <div className="bg-blue-900 text-white text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-2">
            <span>ثالثاً: المعطيات البيداغوجية وتنظيم القسم (Données Pédagogiques)</span>
          </div>

          <table className="w-full text-xs text-right border-collapse border border-slate-300">
            <tbody>
              <tr>
                <td className="border border-slate-300 bg-slate-50 p-2 font-bold w-1/4">المستوى المسند:</td>
                <td className="border border-slate-300 p-2 font-black text-slate-900 text-sm">{formData.assignedLevel}</td>
                <td className="border border-slate-300 bg-slate-50 p-2 font-bold w-1/4">المواد المسندة:</td>
                <td className="border border-slate-300 p-2 font-medium">{formData.subjectTaught}</td>
              </tr>
              <tr>
                <td className="border border-slate-300 bg-slate-50 p-2 font-bold">القسم والأفواج:</td>
                <td className="border border-slate-300 p-2 font-bold text-slate-900">{formData.classGroups}</td>
                <td className="border border-slate-300 bg-slate-50 p-2 font-bold">توزيع التلاميذ بالقسم:</td>
                <td className="border border-slate-300 p-2 font-semibold text-slate-900">
                  مجموع: <strong>{formData.totalStudents}</strong> (إناث: <strong>{formData.femaleStudents}</strong> / ذكور: <strong>{formData.maleStudents}</strong>)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 4: Endorsement & Signatures */}
        <div className="grid grid-cols-3 gap-4 text-center text-xs pt-4 border-t-2 border-slate-800">
          <div className="border border-dashed border-slate-400 rounded-lg p-3 min-h-[100px] flex flex-col justify-between">
            <span className="font-bold text-slate-800">توقيع السيد(ة) الأستاذ(ة)</span>
            <span className="text-[10px] text-slate-400">حرر بـ {formData.commune} في: ..................</span>
          </div>

          <div className="border border-dashed border-slate-400 rounded-lg p-3 min-h-[100px] flex flex-col justify-between">
            <span className="font-bold text-slate-800">تأشيرة وخاتم السيد رئيس المؤسسة</span>
            <span className="text-[10px] text-slate-400">صودق عليه بتاريخ: ..................</span>
          </div>

          <div className="border border-dashed border-slate-400 rounded-lg p-3 min-h-[100px] flex flex-col justify-between">
            <span className="font-bold text-slate-800">تأشيرة السيد(ة) المفتش(ة) التربوي(ة)</span>
            <span className="text-[10px] text-slate-400">ملاحظات: ..................</span>
          </div>
        </div>
      </div>
    </div>
  );
};
