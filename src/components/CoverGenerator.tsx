import React, { useEffect, useRef, useState } from "react";
import {
  FileText,
  Printer,
  Download,
  Image as ImageIcon,
  Languages,
  Palette,
  LayoutTemplate,
  RotateCcw,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  UserCheck,
} from "lucide-react";
import { FileCoverConfig, TeacherProfile } from "../types";
import { DEFAULT_COVERS } from "../data/defaultTemplates";
import {
  generatePdfFromElement,
  generatePngFromElement,
} from "../utils/pdfGenerator";

interface CoverGeneratorProps {
  teacherProfile: TeacherProfile;
}

type CoverLanguage = "ar" | "fr" | "bilingual";
type CoverTheme = FileCoverConfig["theme"];
type CoverColorScheme = FileCoverConfig["colorScheme"];

interface CoverPreset {
  id: string;
  labelAr: string;
  labelFr: string;
  theme: CoverTheme;
  colorScheme: CoverColorScheme;
  ar: {
    dossierType: string;
    title: string;
    subTitle: string;
    quote: string;
    subject: string;
  };
  fr: {
    dossierType: string;
    title: string;
    subTitle: string;
    quote: string;
    subject: string;
  };
}

const COVER_PRESETS: CoverPreset[] = [
  {
    id: "cumulatif",
    labelAr: "الملف التراكمي للأستاذ",
    labelFr: "Dossier Cumulatif",
    theme: "pioneer",
    colorScheme: "emerald",
    ar: {
      dossierType: "الملف البيداغوجي الشامل",
      title: "الملف التراكمي للأستاذ(ة)",
      subTitle: "وثائق التدبير البيداغوجي والإداري — مشروع مؤسسات الريادة",
      quote: "التعليم الصريح ركيزة الجودة والتميز داخل المدرسة المغربية",
      subject: "جميع المواد المدرسة",
    },
    fr: {
      dossierType: "Portfolio Professionnel",
      title: "Dossier Cumulatif de l'Enseignant(e)",
      subTitle: "Recueil des documents pédagogiques et administratifs — Écoles Pionnières",
      quote: "L'enseignement explicite au service de la réussite de chaque élève",
      subject: "Toutes disciplines",
    },
  },
  {
    id: "cahier_journal",
    labelAr: "دفتر النصوص والمذكرة اليومية",
    labelFr: "Cahier Journal",
    theme: "royal",
    colorScheme: "blue",
    ar: {
      dossierType: "سجل التخطيط والتدبير اليومي",
      title: "المذكرة اليومية ودفتر النصوص",
      subTitle: "التخطيط اليومي للأنشطة التعليمية والتعلمية والكفايات المستهدفة",
      quote: "التخطيط المحكم نصف الإنجاز البيداغوجي الناجح",
      subject: "التدبير اليومي للقسم",
    },
    fr: {
      dossierType: "Planification Quotidienne",
      title: "Cahier Journal & Préparation Quotidienne",
      subTitle: "Suivi journalier des séances, objectifs d'apprentissage et activités de classe",
      quote: "Une planification rigoureuse est la clé d'un enseignement efficace",
      subject: "Enseignement Primaire / Collégial",
    },
  },
  {
    id: "fiches_pedagogiques",
    labelAr: "ملف الجذاذات التربوية",
    labelFr: "Fiches Pédagogiques",
    theme: "modern",
    colorScheme: "teal",
    ar: {
      dossierType: "ملف التحضير البيداغوجي",
      title: "ملف الجذاذات التربوية",
      subTitle: "سيناريوهات الحصص الدراسية وفق مقاربة التعليم الصريح والمنهاج المنقح",
      quote: "الديداكتيك الواعي يحوّل المعرفة إلى كفايات مستدامة",
      subject: "اللغة العربية / الفرنسية / الرياضيات",
    },
    fr: {
      dossierType: "Ingénierie Pédagogique",
      title: "Recueil des Fiches Pédagogiques",
      subTitle: "Préparation didactique des unités et séances selon l'approche explicite",
      quote: "La clarté pédagogique facilite l'appropriation durable des savoirs",
      subject: "Français / Mathématiques / Éveil",
    },
  },
  {
    id: "evaluation",
    labelAr: "ملف المراقبة المستمرة والتقويم",
    labelFr: "Évaluation & Suivi",
    theme: "academic",
    colorScheme: "amber",
    ar: {
      dossierType: "سجل التقويم والدعم التربوي",
      title: "ملف المراقبة المستمرة والتقويم",
      subTitle: "روائز التقويم التشخيصي، فروض المراقبة المستمرة، وشبكات تفريغ نقط مسار",
      quote: "التقويم التربوي أداة لتشخيص التعثرات وتوجيه المعالجة الفورية",
      subject: "منظومة مسار والتتبع التربوي",
    },
    fr: {
      dossierType: "Suivi des Apprentissages",
      title: "Dossier d'Évaluation & Contrôle Continu",
      subTitle: "Tests diagnostiques, grilles de notation Massar et bilans de remédiation",
      quote: "Évaluer pour accompagner, remédier et faire progresser chaque apprenant",
      subject: "Évaluation & Suivi Massar",
    },
  },
  {
    id: "tarl_soutien",
    labelAr: "ملف الدعم المكثف (TaRL)",
    labelFr: "Soutien Pédagogique TaRL",
    theme: "pioneer",
    colorScheme: "emerald",
    ar: {
      dossierType: "برنامج المعالجة والدعم التربوي",
      title: "ملف الدعم المكثف وفق مقاربة طارل",
      subTitle: "روائز التموضع، تفريغ مجموعات المستوى، وتتبع أنشطة التثبيت (TaRL)",
      quote: "التدريس وفق المستوى الفعلي للمتعلم يضمن الإنصاف وتكافؤ الفرص",
      subject: "العربية · الفرنسية · الرياضيات",
    },
    fr: {
      dossierType: "Remédiation Ciblée",
      title: "Dossier de Soutien Intensif (TaRL)",
      subTitle: "Tests de positionnement, gestion des paliers et suivi des ateliers de remédiation",
      quote: "Enseigner au bon niveau pour libérer le potentiel de chaque élève",
      subject: "Français · Arabe · Mathématiques",
    },
  },
  {
    id: "absence",
    labelAr: "سجل الغياب والمواظبة",
    labelFr: "Registre de Présence",
    theme: "islamic",
    colorScheme: "burgundy",
    ar: {
      dossierType: "السجل الإداري للحياة المدرسية",
      title: "سجل الغياب والمواظبة اليومية",
      subTitle: "مراقبة حضور المتعلمين اليومي والتنسيق مع الإدارة التربوية والأسر",
      quote: "المواظبة والانضباط دعامتان أساسيتان للتحصيل والنجاح الدراسي",
      subject: "التتبع الإداري للفصل",
    },
    fr: {
      dossierType: "Gestion Administrative",
      title: "Registre de Présence et d'Assiduité",
      subTitle: "Suivi quotidien de la fréquentation scolaire et liaison avec les familles",
      quote: "L'assiduité et la régularité fondent la réussite du parcours scolaire",
      subject: "Vie Scolaire & Assiduité",
    },
  },
  {
    id: "projets_classe",
    labelAr: "ملف مشاريع القسم والحياة المدرسية",
    labelFr: "Projets de Classe",
    theme: "modern",
    colorScheme: "blue",
    ar: {
      dossierType: "الحياة المدرسية والأنشطة المندمجة",
      title: "ملف مشاريع القسم والنوادي التربوية",
      subTitle: "ميثاق القسم، الأنشطة الموازية، ومبادرات التفتح الثقافي والفني والبيئي",
      quote: "مدرسة مفعمة بالحياة تصنع مواطناً مبدعاً ومسؤولاً",
      subject: "الأنشطة المندمجة والتفتح",
    },
    fr: {
      dossierType: "Vie Scolaire & Projets",
      title: "Dossier des Projets de Classe",
      subTitle: "Charte de classe, clubs éducatifs et activités d'épanouissement scolaire",
      quote: "Une école vivante et ouverte développe la créativité et la citoyenneté",
      subject: "Activités Parascolaires",
    },
  },
  {
    id: "formation",
    labelAr: "ملف التكوين المستمر والندوات",
    labelFr: "Formation Continue",
    theme: "royal",
    colorScheme: "slate",
    ar: {
      dossierType: "التطوير المهني المستمر",
      title: "ملف التكوين المستمر واللقاءات التربوية",
      subTitle: "تقارير الورشات التكوينية، الممارسات الصفية الفضلى، والبحث التدخلي",
      quote: "التكوين المستمر روح التجديد التربوي والارتقاء المهني",
      subject: "البيداغوجيا والتكوين",
    },
    fr: {
      dossierType: "Développement Professionnel",
      title: "Portfolio de Formation Continue",
      subTitle: "Comptes-rendus des ateliers pédagogiques, séminaires et pratiques réflexives",
      quote: "Se former tout au long de sa carrière pour enrichir ses pratiques de classe",
      subject: "Formation & Innovation",
    },
  },
  {
    id: "inspection",
    labelAr: "ملف التفتيش والتأطير التربوي",
    labelFr: "Dossier d'Inspection",
    theme: "academic",
    colorScheme: "burgundy",
    ar: {
      dossierType: "وثائق التأطير والمراقبة التربوية",
      title: "ملف التفتيش والزيارات الصفية",
      subTitle: "تقارير الزيارات الميدانية، التوجيهات الديداكتيكية، وبطاقات التأطير التربوي",
      quote: "الجودة التربوية ثمرة التعاون والتقاسم بين هيئة التدريس والتأطير",
      subject: "التأطير والمواكبة التربوية",
    },
    fr: {
      dossierType: "Encadrement Pédagogique",
      title: "Dossier d'Inspection & Visites de Classe",
      subTitle: "Rapports d'inspection, recommandations didactiques et suivi de performance",
      quote: "L'excellence éducative naît de la synergie entre enseignement et encadrement",
      subject: "Inspection & Suivi",
    },
  },
];

interface PaletteTokens {
  label: string;
  primary: string;
  secondary: string;
  tint: string;
  borderSoft: string;
  textDark: string;
  accentBar: string;
}

const COLOR_PALETTES: Record<CoverColorScheme, PaletteTokens> = {
  emerald: {
    label: "أخضر زمردي ملكي",
    primary: "#065f46",
    secondary: "#047857",
    tint: "#ecfdf5",
    borderSoft: "#a7f3d0",
    textDark: "#022c22",
    accentBar: "#d97706",
  },
  blue: {
    label: "أزرق وزاري عميق",
    primary: "#1e3a8a",
    secondary: "#1d4ed8",
    tint: "#eff6ff",
    borderSoft: "#bfdbfe",
    textDark: "#0f172a",
    accentBar: "#b45309",
  },
  amber: {
    label: "ذهبي عنبري",
    primary: "#92400e",
    secondary: "#b45309",
    tint: "#fffbeb",
    borderSoft: "#fde68a",
    textDark: "#451a03",
    accentBar: "#065f46",
  },
  burgundy: {
    label: "عنابي فاخر",
    primary: "#881337",
    secondary: "#9f1239",
    tint: "#fff1f2",
    borderSoft: "#fecdd3",
    textDark: "#4c0519",
    accentBar: "#b45309",
  },
  teal: {
    label: "أزرق بترولي",
    primary: "#115e59",
    secondary: "#0f766e",
    tint: "#f0fdfa",
    borderSoft: "#99f6e4",
    textDark: "#042f2e",
    accentBar: "#d97706",
  },
  slate: {
    label: "كحلي كلاسيكي",
    primary: "#1e293b",
    secondary: "#334155",
    tint: "#f8fafc",
    borderSoft: "#cbd5e1",
    textDark: "#0f172a",
    accentBar: "#b45309",
  },
};

const STORAGE_KEY = "profpress_cover_generator_v2";

function buildCoverFromProfile(
  base: FileCoverConfig,
  teacherProfile: TeacherProfile
): FileCoverConfig {
  return {
    ...base,
    authorName: base.authorName || teacherProfile.fullNameAr,
    schoolName: base.schoolName || teacherProfile.institution,
    academicYear: base.academicYear || teacherProfile.schoolYear,
    level: base.level || teacherProfile.assignedLevel,
    academy: base.academy ?? teacherProfile.academy,
    directorate: base.directorate ?? teacherProfile.directorate,
    subject: base.subject ?? teacherProfile.subjectTaught,
    somNumber: base.somNumber ?? teacherProfile.somNumber,
    language: base.language ?? "ar",
    fontStyle: base.fontStyle ?? "cairo",
    showEmblem: base.showEmblem ?? true,
  };
}

export const CoverGenerator: React.FC<CoverGeneratorProps> = ({ teacherProfile }) => {
  const [coversList, setCoversList] = useState<FileCoverConfig[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((item) => buildCoverFromProfile(item, teacherProfile));
        }
      }
    } catch {
      // ignore storage errors
    }
    return DEFAULT_COVERS.map((c) => buildCoverFromProfile(c, teacherProfile));
  });

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isExporting, setIsExporting] = useState<"pdf" | "png" | null>(null);
  const [exportStatus, setExportStatus] = useState<string>("");
  const [exportError, setExportError] = useState<string>("");
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(coversList));
    } catch {
      // ignore quota errors
    }
  }, [coversList]);

  const activeCover = buildCoverFromProfile(
    coversList[selectedIndex] || DEFAULT_COVERS[0],
    teacherProfile
  );
  const palette = COLOR_PALETTES[activeCover.colorScheme] || COLOR_PALETTES.emerald;
  const lang: CoverLanguage = activeCover.language || "ar";
  const isFr = lang === "fr";
  const isBilingual = lang === "bilingual";

  const updateActiveCover = (fields: Partial<FileCoverConfig>) => {
    setCoversList((prev) => {
      const updated = [...prev];
      const current = updated[selectedIndex] || DEFAULT_COVERS[0];
      updated[selectedIndex] = { ...current, ...fields };
      return updated;
    });
  };

  const handleLanguageChange = (nextLang: CoverLanguage) => {
    const matchedPreset = COVER_PRESETS.find(
      (p) => p.ar.title === activeCover.title || p.fr.title === activeCover.title
    );
    const updates: Partial<FileCoverConfig> = { language: nextLang };

    if (nextLang === "fr") {
      if (
        !activeCover.authorName ||
        activeCover.authorName === teacherProfile.fullNameAr
      ) {
        updates.authorName = teacherProfile.fullNameFr || teacherProfile.fullNameAr;
      }
      if (matchedPreset) {
        updates.title = matchedPreset.fr.title;
        updates.subTitle = matchedPreset.fr.subTitle;
        updates.dossierType = matchedPreset.fr.dossierType;
        updates.quote = matchedPreset.fr.quote;
        updates.subject = matchedPreset.fr.subject;
      }
    } else if (nextLang === "ar" || nextLang === "bilingual") {
      if (
        !activeCover.authorName ||
        activeCover.authorName === teacherProfile.fullNameFr
      ) {
        updates.authorName = teacherProfile.fullNameAr;
      }
      if (matchedPreset) {
        updates.title = matchedPreset.ar.title;
        updates.subTitle = matchedPreset.ar.subTitle;
        updates.dossierType = matchedPreset.ar.dossierType;
        updates.quote = matchedPreset.ar.quote;
        updates.subject = matchedPreset.ar.subject;
      }
    }

    updateActiveCover(updates);
  };

  const applyPreset = (preset: CoverPreset) => {
    const copy = lang === "fr" ? preset.fr : preset.ar;
    updateActiveCover({
      title: copy.title,
      subTitle: copy.subTitle,
      dossierType: copy.dossierType,
      quote: copy.quote,
      subject: copy.subject,
      theme: preset.theme,
      colorScheme: preset.colorScheme,
    });
  };

  const handleAddNewCover = () => {
    const newCover: FileCoverConfig = buildCoverFromProfile(
      {
        title: isFr ? "Nouveau Dossier Pédagogique" : "واجهة ملف جديدة",
        subTitle: isFr
          ? "Organisation des documents scolaires et pédagogiques"
          : "سجل الأنشطة التربوية والتدبير البيداغوجي",
        theme: "pioneer",
        colorScheme: "emerald",
        dossierType: isFr ? "Dossier Pédagogique" : "ملف تربوي",
        authorName: isFr
          ? teacherProfile.fullNameFr || teacherProfile.fullNameAr
          : teacherProfile.fullNameAr,
        schoolName: teacherProfile.institution,
        academicYear: teacherProfile.schoolYear,
        level: teacherProfile.assignedLevel,
        quote: isFr
          ? "L'éducation est le fondement de l'avenir"
          : "التربية رسالة وبناء للمستقبل",
        language: lang,
      },
      teacherProfile
    );
    setCoversList((prev) => [...prev, newCover]);
    setSelectedIndex(coversList.length);
  };

  const handleDeleteCurrentCover = () => {
    if (coversList.length <= 1) return;
    setCoversList((prev) => prev.filter((_, idx) => idx !== selectedIndex));
    setSelectedIndex((prev) => Math.max(0, prev - 1));
  };

  const handleSyncFromProfile = () => {
    updateActiveCover({
      authorName: isFr
        ? teacherProfile.fullNameFr || teacherProfile.fullNameAr
        : teacherProfile.fullNameAr,
      schoolName: teacherProfile.institution,
      academy: teacherProfile.academy,
      directorate: teacherProfile.directorate,
      academicYear: teacherProfile.schoolYear,
      level: teacherProfile.assignedLevel,
      somNumber: teacherProfile.somNumber,
    });
  };

  const handleDownloadPdf = async () => {
    if (!sheetRef.current || isExporting) return;
    setIsExporting("pdf");
    setExportError("");
    setExportStatus("جاري توليد ملف PDF عالي الدقة...");
    try {
      const cleanName = (activeCover.title || "cover").replace(/[^\u0600-\u06FFa-zA-Z0-9_-]+/g, "_");
      await generatePdfFromElement(sheetRef.current, {
        filename: `${cleanName}_A4.pdf`,
        orientation: "portrait",
        quality: "ultra",
        colorMode: "color",
        onProgress: (msg) => setExportStatus(msg),
      });
      setExportStatus("تم تنزيل ملف PDF بنجاح");
      setTimeout(() => setExportStatus(""), 3500);
    } catch {
      setExportError("تعذر تصدير PDF تلقائياً، يمكنك استخدام زر الطباعة A4 والحفظ كـ PDF.");
    } finally {
      setIsExporting(null);
    }
  };

  const handleDownloadPng = async () => {
    if (!sheetRef.current || isExporting) return;
    setIsExporting("png");
    setExportError("");
    setExportStatus("جاري تصدير الصورة بدقة فائقة...");
    try {
      const cleanName = (activeCover.title || "cover").replace(/[^\u0600-\u06FFa-zA-Z0-9_-]+/g, "_");
      await generatePngFromElement(sheetRef.current, {
        filename: `${cleanName}.png`,
        quality: "ultra",
        onProgress: (msg) => setExportStatus(msg),
      });
      setExportStatus("تم تنزيل الصورة بصيغة PNG بنجاح");
      setTimeout(() => setExportStatus(""), 3500);
    } catch {
      setExportError("تعذر تصدير الصورة، يرجى المحاولة مجدداً أو استخدام الطباعة.");
    } finally {
      setIsExporting(null);
    }
  };

  const fontClass =
    activeCover.fontStyle === "amiri"
      ? "font-amiri"
      : activeCover.fontStyle === "classic"
      ? "font-serif"
      : "font-cairo";

  const renderFrameDecoration = () => {
    if (activeCover.theme === "royal") {
      return (
        <>
          <div
            className="absolute inset-4 pointer-events-none rounded-xl"
            style={{ border: `3px solid ${palette.primary}` }}
          />
          <div
            className="absolute inset-6 pointer-events-none rounded-lg"
            style={{ border: `1px solid ${palette.accentBar}` }}
          />
          {/* Corner Brackets */}
          {[
            "top-3 left-3",
            "top-3 right-3 rotate-90",
            "bottom-3 right-3 rotate-180",
            "bottom-3 left-3 -rotate-90",
          ].map((pos, i) => (
            <svg
              key={i}
              className={`absolute ${pos} w-10 h-10 pointer-events-none`}
              viewBox="0 0 40 40"
              fill="none"
            >
              <path
                d="M2 36V6C2 3.79086 3.79086 2 6 2H36"
                stroke={palette.accentBar}
                strokeWidth="3"
              />
              <circle cx="8" cy="8" r="2.5" fill={palette.primary} />
            </svg>
          ))}
        </>
      );
    }

    if (activeCover.theme === "islamic") {
      return (
        <>
          <div
            className="absolute inset-4 pointer-events-none"
            style={{ border: `2px solid ${palette.primary}` }}
          />
          <div
            className="absolute inset-5.5 pointer-events-none"
            style={{ border: `1px dashed ${palette.accentBar}` }}
          />
          {[
            "top-3 left-3",
            "top-3 right-3",
            "bottom-3 left-3",
            "bottom-3 right-3",
          ].map((pos, i) => (
            <svg
              key={i}
              className={`absolute ${pos} w-11 h-11 pointer-events-none`}
              viewBox="0 0 44 44"
              fill="none"
            >
              <polygon
                points="22,4 27,15 38,10 33,21 42,22 33,27 38,38 27,33 22,42 17,33 6,38 11,27 2,22 11,17 6,6 17,11"
                fill={palette.tint}
                stroke={palette.primary}
                strokeWidth="1.5"
              />
              <circle cx="22" cy="22" r="4" fill={palette.accentBar} />
            </svg>
          ))}
        </>
      );
    }

    if (activeCover.theme === "modern") {
      return (
        <>
          <div
            className="absolute top-0 left-0 right-0 h-3 pointer-events-none"
            style={{ backgroundColor: palette.primary }}
          />
          <div
            className="absolute top-3 left-0 right-0 h-1 pointer-events-none"
            style={{ backgroundColor: palette.accentBar }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-2.5 pointer-events-none"
            style={{ backgroundColor: palette.primary }}
          />
        </>
      );
    }

    if (activeCover.theme === "academic") {
      return (
        <>
          <div
            className="absolute inset-5 pointer-events-none rounded-sm"
            style={{ border: `4px double ${palette.primary}` }}
          />
          <div
            className="absolute inset-7 pointer-events-none"
            style={{ border: `1px solid ${palette.borderSoft}` }}
          />
        </>
      );
    }

    // Default: pioneer (مدارس الريادة)
    return (
      <>
        <div
          className="absolute inset-3.5 pointer-events-none rounded-2xl"
          style={{ border: `4px solid ${palette.primary}` }}
        />
        <div
          className="absolute inset-5.5 pointer-events-none rounded-xl"
          style={{ border: `1.5px dashed ${palette.accentBar}` }}
        />
      </>
    );
  };

  return (
    <div className="space-y-5">
      {/* Top Action & Intro Header (Hidden in Print) */}
      <div className="no-print bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span>أدوات الأستاذ الرقمية</span>
              <span aria-hidden="true">·</span>
              <span>تنسيق A4 الرسمي</span>
              <span aria-hidden="true">·</span>
              <span>عربي وفرنسي ومزدوج</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 font-cairo flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>منشئ واجهات وأغلفة الملفات التربوية (Cover Generator)</span>
            </h2>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              صمّم واجهات احترافية لملفاتك وسجلاتك البيداغوجية بالعربية أو الفرنسية أو باللغتين معاً، مع إطارات وزارية وزخارف مغربية وتصدير فوري بصيغة PDF أو صورة PNG عالية الدقة.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleAddNewCover}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>واجهة جديدة</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPng}
              disabled={isExporting !== null}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-900 disabled:opacity-60 text-white flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap"
            >
              <ImageIcon className="w-4 h-4 text-amber-300" />
              <span>{isExporting === "png" ? "جاري التصدير..." : "تحميل PNG"}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isExporting !== null}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white flex items-center gap-1.5 transition cursor-pointer shadow-xs whitespace-nowrap"
            >
              <Download className="w-4 h-4 text-amber-300" />
              <span>{isExporting === "pdf" ? "جاري التوليد..." : "تحميل PDF"}</span>
            </button>

            <button
              id="print-cover-btn"
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-1.5 transition cursor-pointer shadow-xs whitespace-nowrap"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة A4</span>
            </button>
          </div>
        </div>

        {/* Inline feedback messages */}
        {(exportStatus || exportError) && (
          <div
            className={`rounded-xl px-4 py-2.5 text-xs font-semibold flex items-center gap-2 border ${
              exportError
                ? "bg-rose-50 text-rose-800 border-rose-200"
                : "bg-emerald-50 text-emerald-800 border-emerald-200"
            }`}
          >
            {exportError ? (
              <AlertCircle className="w-4 h-4 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            )}
            <span>{exportError || exportStatus}</span>
          </div>
        )}

        {/* Saved Tabs Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {coversList.map((cover, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  selectedIndex === idx
                    ? "bg-emerald-800 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{cover.title}</span>
              </button>
            ))}
          </div>

          {coversList.length > 1 && (
            <button
              type="button"
              onClick={handleDeleteCurrentCover}
              className="text-xs font-semibold text-rose-600 hover:text-rose-800 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition cursor-pointer shrink-0"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>حذف التبويب الحالي</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Two-Column Workbench: Controls + Live A4 Canvas */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Right/Start Column: Customization Controls (Hidden in Print) */}
        <aside className="no-print xl:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-5">
          {/* Language Switcher */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Languages className="w-4 h-4 text-emerald-700" />
              <span>لغة الواجهة والتصميم (Langue de la couverture):</span>
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
              {[
                { id: "ar" as CoverLanguage, label: "العربية" },
                { id: "fr" as CoverLanguage, label: "Français" },
                { id: "bilingual" as CoverLanguage, label: "مزدوج AR/FR" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleLanguageChange(item.id)}
                  className={`py-2 px-2 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                    lang === item.id
                      ? "bg-white text-emerald-800 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Ready Presets Library */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800">
                قوالب الملفات الجاهزة (9 نماذج رسمية):
              </label>
              <button
                type="button"
                onClick={handleSyncFromProfile}
                className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                title="جلب بيانات الأستاذ والمؤسسة من الملف الشخصي"
              >
                <RotateCcw className="w-3 h-3" />
                <span>مزامنة مع ملفي</span>
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-0.5">
              {COVER_PRESETS.map((preset) => {
                const isSelected =
                  activeCover.title === preset.ar.title ||
                  activeCover.title === preset.fr.title;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    className={`text-right px-2.5 py-2 rounded-xl border text-[11px] font-bold transition cursor-pointer truncate ${
                      isSelected
                        ? "bg-emerald-50 border-emerald-500 text-emerald-900"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                    title={isFr ? preset.labelFr : preset.labelAr}
                  >
                    {isFr ? preset.labelFr : preset.labelAr}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Frame Template & Color Palette */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs">
            <div>
              <label className="font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <LayoutTemplate className="w-3.5 h-3.5 text-emerald-700" />
                <span>الإطار والتصميم:</span>
              </label>
              <select
                value={activeCover.theme}
                onChange={(e) =>
                  updateActiveCover({ theme: e.target.value as CoverTheme })
                }
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-semibold text-slate-800 cursor-pointer"
              >
                <option value="pioneer">إطار مدارس الريادة</option>
                <option value="royal">الإطار الملكي الرسمي</option>
                <option value="islamic">الزخرفة المغربية الأصيلة</option>
                <option value="modern">التصميم العصري الحديث</option>
                <option value="academic">الإطار الأكاديمي الكلاسيكي</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <Palette className="w-3.5 h-3.5 text-emerald-700" />
                <span>لوحة الألوان:</span>
              </label>
              <div className="flex items-center gap-2 flex-wrap pt-1">
                {(Object.keys(COLOR_PALETTES) as CoverColorScheme[]).map((scheme) => {
                  const p = COLOR_PALETTES[scheme];
                  const active = activeCover.colorScheme === scheme;
                  return (
                    <button
                      key={scheme}
                      type="button"
                      onClick={() => updateActiveCover({ colorScheme: scheme })}
                      title={p.label}
                      aria-label={p.label}
                      className={`w-7 h-7 rounded-full transition cursor-pointer flex items-center justify-center ${
                        active ? "ring-2 ring-offset-2 ring-slate-900 scale-110" : "hover:scale-105"
                      }`}
                      style={{ backgroundColor: p.primary }}
                    >
                      {active && <span className="w-2 h-2 rounded-full bg-white" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Font & Options */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">نمط الخط:</label>
              <select
                value={activeCover.fontStyle || "cairo"}
                onChange={(e) =>
                  updateActiveCover({
                    fontStyle: e.target.value as "cairo" | "amiri" | "classic",
                  })
                }
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-semibold"
              >
                <option value="cairo">خط كايرو العصري (Cairo)</option>
                <option value="amiri">خط أميري الأصيل (Amiri)</option>
                <option value="classic">خط كلاسيكي رسمي (Serif)</option>
              </select>
            </div>

            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer select-none bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 w-full">
                <input
                  type="checkbox"
                  checked={activeCover.showEmblem !== false}
                  onChange={(e) => updateActiveCover({ showEmblem: e.target.checked })}
                  className="rounded text-emerald-700 focus:ring-emerald-600"
                />
                <span className="font-bold text-slate-700">إظهار شعار التاج/النجمة</span>
              </label>
            </div>
          </div>

          {/* Content Fields */}
          <div className="space-y-3 pt-2 border-t border-slate-100 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="sm:col-span-2">
                <label className="block text-slate-700 font-bold mb-1">
                  العنوان الرئيسي للملف:
                </label>
                <input
                  type="text"
                  value={activeCover.title}
                  onChange={(e) => updateActiveCover({ title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-bold text-slate-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-700 font-bold mb-1">
                  العنوان الفرعي / الوصف:
                </label>
                <input
                  type="text"
                  value={activeCover.subTitle}
                  onChange={(e) => updateActiveCover({ subTitle: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">تصنيف الملف:</label>
                <input
                  type="text"
                  value={activeCover.dossierType}
                  onChange={(e) => updateActiveCover({ dossierType: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">المادة / التخصص:</label>
                <input
                  type="text"
                  value={activeCover.subject || ""}
                  onChange={(e) => updateActiveCover({ subject: e.target.value })}
                  placeholder="اختياري"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">الأكاديمية الجهوية:</label>
                <input
                  type="text"
                  value={activeCover.academy || ""}
                  onChange={(e) => updateActiveCover({ academy: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">المديرية الإقليمية:</label>
                <input
                  type="text"
                  value={activeCover.directorate || ""}
                  onChange={(e) => updateActiveCover({ directorate: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">المؤسسة التعليمية:</label>
                <input
                  type="text"
                  value={activeCover.schoolName}
                  onChange={(e) => updateActiveCover({ schoolName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">اسم الأستاذ(ة):</label>
                <input
                  type="text"
                  value={activeCover.authorName}
                  onChange={(e) => updateActiveCover({ authorName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">المستوى / القسم:</label>
                <input
                  type="text"
                  value={activeCover.level}
                  onChange={(e) => updateActiveCover({ level: e.target.value })}
                  placeholder="اختياري (اتركه فارغاً لإخفائه)"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">الموسم الدراسي:</label>
                <input
                  type="text"
                  value={activeCover.academicYear}
                  onChange={(e) => updateActiveCover({ academicYear: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">رقم التأجير (SOM):</label>
                <input
                  type="text"
                  value={activeCover.somNumber || ""}
                  onChange={(e) => updateActiveCover({ somNumber: e.target.value })}
                  placeholder="اختياري"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-700 font-bold mb-1">شعار أو عبارة تربوية:</label>
                <input
                  type="text"
                  value={activeCover.quote}
                  onChange={(e) => updateActiveCover({ quote: e.target.value })}
                  placeholder="اختياري"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 font-medium"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Left/Preview Column: Live A4 Printable Cover Sheet */}
        <div className="xl:col-span-7 flex justify-center">
          <div
            ref={sheetRef}
            dir={isFr ? "ltr" : "rtl"}
            className={`print-sheet bg-white w-full max-w-[794px] aspect-[210/297] min-h-[840px] sm:min-h-[960px] rounded-2xl p-10 sm:p-14 shadow-lg flex flex-col justify-between relative overflow-hidden ${fontClass}`}
          >
            {/* Dynamic SVG/CSS Frame Decoration */}
            {renderFrameDecoration()}

            {/* Official Top Header */}
            <header className="relative z-10 pt-3">
              {isFr ? (
                <div
                  className="flex items-start justify-between gap-4 pb-5 text-xs sm:text-sm"
                  style={{ borderBottom: `2px solid ${palette.borderSoft}` }}
                >
                  <div className="text-left space-y-0.5 text-slate-700 font-semibold">
                    <p className="font-black text-sm sm:text-base" style={{ color: palette.primary }}>
                      ROYAUME DU MAROC
                    </p>
                    <p>Ministère de l'Éducation Nationale, du Préscolaire et des Sports</p>
                    {activeCover.academy && <p>{activeCover.academy}</p>}
                    {activeCover.directorate && <p>{activeCover.directorate}</p>}
                  </div>

                  {activeCover.showEmblem !== false && (
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 shadow-xs"
                      style={{
                        backgroundColor: palette.tint,
                        border: `2px solid ${palette.accentBar}`,
                        color: palette.primary,
                      }}
                    >
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                        <polygon
                          points="12,2 14.9,8.6 22,9.3 16.6,14 18.2,21 12,17.3 5.8,21 7.4,14 2,9.3 9.1,8.6"
                          stroke={palette.primary}
                          strokeWidth="1.8"
                          fill={palette.accentBar}
                          fillOpacity="0.22"
                        />
                      </svg>
                    </div>
                  )}

                  <div className="text-right space-y-0.5 text-slate-700 font-semibold">
                    <p className="font-bold text-slate-900">{activeCover.schoolName}</p>
                    <p className="font-mono text-xs tabular-nums" style={{ color: palette.secondary }}>
                      {activeCover.academicYear}
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  className="flex items-start justify-between gap-4 pb-5 text-xs sm:text-sm"
                  style={{ borderBottom: `2px solid ${palette.borderSoft}` }}
                >
                  <div className="text-right space-y-0.5 text-slate-700 font-semibold">
                    <p className="font-black text-sm sm:text-base" style={{ color: palette.primary }}>
                      المملكة المغربية
                    </p>
                    <p>وزارة التربية الوطنية والتعليم الأولي والرياضة</p>
                    {activeCover.academy && <p>{activeCover.academy}</p>}
                    {activeCover.directorate && <p>{activeCover.directorate}</p>}
                  </div>

                  {activeCover.showEmblem !== false && (
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 shadow-xs"
                      style={{
                        backgroundColor: palette.tint,
                        border: `2px solid ${palette.accentBar}`,
                        color: palette.primary,
                      }}
                    >
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                        <polygon
                          points="12,2 14.9,8.6 22,9.3 16.6,14 18.2,21 12,17.3 5.8,21 7.4,14 2,9.3 9.1,8.6"
                          stroke={palette.primary}
                          strokeWidth="1.8"
                          fill={palette.accentBar}
                          fillOpacity="0.22"
                        />
                      </svg>
                    </div>
                  )}

                  <div className="text-left space-y-0.5 text-slate-700 font-semibold" dir="ltr">
                    <p className="font-black text-xs sm:text-sm" style={{ color: palette.primary }}>
                      ROYAUME DU MAROC
                    </p>
                    <p className="text-[11px] sm:text-xs">Ministère de l'Éducation Nationale</p>
                    <p className="text-xs text-slate-800 font-bold">{activeCover.schoolName}</p>
                    <p className="text-xs font-mono tabular-nums" style={{ color: palette.secondary }}>
                      {activeCover.academicYear}
                    </p>
                  </div>
                </div>
              )}
            </header>

            {/* Center Title & Identity Block */}
            <section className="relative z-10 my-auto py-8 text-center space-y-6 px-2">
              {activeCover.dossierType && (
                <div
                  className="inline-block px-5 py-1.5 rounded-lg text-xs sm:text-sm font-black tracking-wide"
                  style={{
                    backgroundColor: palette.tint,
                    color: palette.primary,
                    border: `1px solid ${palette.borderSoft}`,
                  }}
                >
                  {activeCover.dossierType}
                </div>
              )}

              <div className="space-y-4">
                <h1
                  className="text-3xl sm:text-5xl font-black leading-tight"
                  style={{ color: palette.textDark, textWrap: "balance" as any }}
                >
                  {activeCover.title}
                </h1>

                {isBilingual && (
                  <p
                    className="text-sm sm:text-lg font-bold tracking-wide"
                    dir="ltr"
                    style={{ color: palette.secondary }}
                  >
                    Dossier Pédagogique & Professionnel — Année Scolaire {activeCover.academicYear}
                  </p>
                )}

                {activeCover.subTitle && (
                  <p className="text-base sm:text-xl font-bold text-slate-600 max-w-xl mx-auto leading-relaxed">
                    {activeCover.subTitle}
                  </p>
                )}
              </div>

              {/* Ornamental SVG Divider */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <div className="h-[2px] w-20" style={{ backgroundColor: palette.accentBar }} />
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                    fill={palette.accentBar}
                  />
                </svg>
                <div className="h-[2px] w-20" style={{ backgroundColor: palette.accentBar }} />
              </div>

              {activeCover.subject && (
                <div className="text-sm font-bold text-slate-700">
                  <span>{isFr ? "Discipline / Spécialité : " : "المادة / التخصص : "}</span>
                  <span style={{ color: palette.primary }}>{activeCover.subject}</span>
                </div>
              )}

              {activeCover.quote && (
                <p className="text-sm sm:text-base font-amiri italic text-slate-500 max-w-lg mx-auto pt-1">
                  « {activeCover.quote} »
                </p>
              )}
            </section>

            {/* Bottom Structured Dossier Metadata Card */}
            <footer className="relative z-10 pb-3 space-y-4">
              <div
                className="rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm"
                style={{
                  backgroundColor: palette.tint,
                  border: `1.5px solid ${palette.borderSoft}`,
                }}
              >
                <div className={isFr ? "text-left" : "text-right"}>
                  <span className="text-slate-500 font-semibold block text-xs mb-0.5">
                    {isFr ? "Élaboré par :" : "إعداد وتقديم الأستاذ(ة) :"}
                  </span>
                  <strong className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 shrink-0" style={{ color: palette.primary }} />
                    <span>{activeCover.authorName}</span>
                  </strong>
                  {activeCover.somNumber && (
                    <span className="text-[11px] font-mono text-slate-500 block mt-0.5 tabular-nums">
                      {isFr ? `PPR / SOM : ${activeCover.somNumber}` : `رقم التأجير : ${activeCover.somNumber}`}
                    </span>
                  )}
                </div>

                <div className={isFr ? "text-right" : "text-left"}>
                  <span className="text-slate-500 font-semibold block text-xs mb-0.5">
                    {isFr ? "Établissement :" : "المؤسسة التعليمية :"}
                  </span>
                  <strong className="text-sm sm:text-base font-black text-slate-900 block">
                    {activeCover.schoolName}
                  </strong>
                  {activeCover.level && (
                    <span className="text-xs font-bold block mt-0.5" style={{ color: palette.secondary }}>
                      {isFr ? `Niveau : ${activeCover.level}` : `المستوى : ${activeCover.level}`}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-1">
                <span>
                  {isFr
                    ? "Année Scolaire Officielle"
                    : "الوثيقة الرسمية لتنظيم ملفات الأستاذ"}
                </span>
                <span className="font-mono font-bold tabular-nums" style={{ color: palette.primary }}>
                  {activeCover.academicYear}
                </span>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};
