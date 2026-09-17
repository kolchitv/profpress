import React, { useState, useEffect } from "react";
import {
  Printer,
  Sparkles,
  RotateCcw,
  Save,
  Download,
  FileCheck,
  BookOpen,
  Edit3,
  Eye,
  CheckCircle2,
  Copy,
  Share2,
  HelpCircle,
  FolderDown,
  Layers,
  FileText,
  School,
  ArrowRight,
} from "lucide-react";
import { TeacherProfile } from "../types";

export interface TarlMindMapData {
  niveau: string;
  parcours: string;
  palier: string;
  seance: string;
  duree: string;
  objectifs: string;
  vocabulaire: string[];
  ouverture: string;
  lectureEcriture: string;
  jeu: string;
  outils: string;
  ecoleName?: string;
  anneeScolaire?: string;
}

const DEFAULT_BLANK_MAP: TarlMindMapData = {
  niveau: "",
  parcours: "",
  palier: "",
  seance: "",
  duree: "",
  objectifs: "",
  vocabulaire: ["", "", "", "", ""],
  ouverture: "",
  lectureEcriture: "",
  jeu: "",
  outils: "",
  ecoleName: "",
  anneeScolaire: "2026/2027",
};

const PRESET_PALIERS: { id: string; title: string; description: string; data: TarlMindMapData }[] = [
  {
    id: "palier1_lettres",
    title: "Palier 1 : Lettres & Sons simples (Niveau 3AEP / 4AEP)",
    description: "نموذج حصة التعرف على الحروف والأصوات البسيطة (a, i, m, l, t) والدمج المقطعي",
    data: {
      niveau: "3AEP / 4AEP",
      parcours: "Parcours 1",
      palier: "Palier 1 (Lettres & Sons)",
      seance: "03",
      duree: "60",
      objectifs:
        "- Identifier et articuler les phonèmes [a], [i], [m], [l].\n- Associer graphèmes et phonèmes correspondants.\n- Écrire les lettres ciblées en minuscule cursive et majuscule.\n- Réaliser la fusion de deux lettres pour former une syllabe simple.",
      vocabulaire: ["ami", "lili", "moto", "tapis", "livre"],
      ouverture:
        "Rituel du calendrier + Chanson de l'alphabet (A-B-C) + Échauffement articulatoire avec un virelangue sonore sur les sons [m] et [l] (ex: « Lili lit le livre »).",
      lectureEcriture:
        "1. Lecture flash des cartes-lettres (a, i, m, l, t).\n2. Fusion syllabique collective et individuelle : m+a=ma, l+i=li, t+o=to.\n3. Écriture sur ardoises individuelles puis copie sur le livret TaRL.",
      jeu:
        "Jeu de la tapette à mouches : Deux élèves s'affrontent pour frapper au tableau la lettre ou syllabe prononcée par l'enseignant le plus vite possible.",
      outils:
        "Cartes-lettres, ardoises individuelles, craies/feutres, flashcards illustrées, livret TaRL Français de l'élève.",
      ecoleName: "مدرسة الريادة الابتدائية",
      anneeScolaire: "2026/2027",
    },
  },
  {
    id: "palier2_mots",
    title: "Palier 2 : Syllabes & Mots simples (Niveau 4AEP / 5AEP)",
    description: "نموذج حصة تركيب الكلمات البسيطة، القراءة السريعة والتهجئة المقطعية",
    data: {
      niveau: "4AEP / 5AEP",
      parcours: "Parcours 2",
      palier: "Palier 2 (Mots simples)",
      seance: "06",
      duree: "60",
      objectifs:
        "- Découper les mots en syllabes orales et écrites (CV, CVC).\n- Lire des mots réguliers fréquents sans hésitation (> 20 mots/min).\n- Écrire sous dictée flash des mots simples réguliers.",
      vocabulaire: ["table", "école", "trousse", "banane", "ballon"],
      ouverture:
        "Rappel du mot mystère : devinette rapide avec indices (« Je suis dans la classe, on écrit sur moi... La table ! ») + Rythme frappé des syllabes.",
      lectureEcriture:
        "1. Lecture chrono en binômes (Fiche de lecture TaRL n°2).\n2. Reconstitution de mots à partir d'étiquettes-syllabes.\n3. Dictée flash de 4 mots sur ardoise avec autocorrection guidée.",
      jeu:
        "Bingo des mots : chaque élève dispose d'une grille de 6 mots ; l'enseignant tire une carte-image, le premier qui complète sa ligne crie « Bingo ! ».",
      outils:
        "Fiches de lecture chrono, sablier de 1 minute, étiquettes syllabiques, ardoises, grilles de Bingo.",
      ecoleName: "مؤسسة الريادة",
      anneeScolaire: "2026/2027",
    },
  },
  {
    id: "palier3_phrases",
    title: "Palier 3 : Mots complexes & Phrases courtes (Niveau 5AEP / 6AEP)",
    description: "نموذج حصة قراءة وفهم الجمل القصيرة والأصوات المركبة (ou, on, oi, ch)",
    data: {
      niveau: "5AEP / 6AEP",
      parcours: "Parcours 3",
      palier: "Palier 3 (Phrases courtes)",
      seance: "08",
      duree: "60",
      objectifs:
        "- Maîtriser la lecture des sons complexes (ou, on, oi, ch, in).\n- Lire des phrases simples avec intonation et respect de la ponctuation.\n- Comprendre le sens global d'une phrase et repérer le sujet et le verbe.",
      vocabulaire: ["jardin", "papillon", "regarde", "maison", "oiseau"],
      ouverture:
        "Comptine rythmée des sons complexes + Chasse aux mots affichés dans la classe contenant le son [ou] ou [on].",
      lectureEcriture:
        "1. Lecture dialoguée et expressive de 3 phrases modèles.\n2. Remise en ordre d'une phrase dont les mots ont été mélangés.\n3. Production écrite : enrichir une phrase minimale avec un adjectif ou lieu.",
      jeu:
        "Jeu du détective : associer chaque phrase à la bonne vignette descriptive parmi 4 images pièges.",
      outils:
        "Bandes de phrases plastifiées, étiquettes mobiles, illustrations couleurs, livret d'activités TaRL.",
      ecoleName: "مدرسة الريادة",
      anneeScolaire: "2026/2027",
    },
  },
  {
    id: "palier4_paragraphe",
    title: "Palier 4 : Paragraphe & Fluence (Niveau 6AEP)",
    description: "نموذج حصة الطلاقة القرائية والفهم الصريح لفقرة قصيرة (4 إلى 6 أسطر)",
    data: {
      niveau: "6AEP",
      parcours: "Parcours Intensif",
      palier: "Palier 4 (Paragraphe & Fluence)",
      seance: "12",
      duree: "60",
      objectifs:
        "- Lire un paragraphe court (40-60 mots) de façon fluide et expressive.\n- Répondre avec précision à des questions de compréhension explicite (Qui ? Où ? Quand ? Quoi ?).\n- Résumer oralement l'idée principale du paragraphe.",
      vocabulaire: ["forêt", "voyage", "courageux", "découvrir", "nature"],
      ouverture:
        "Modélisation par l'enseignant : lecture magistrale expressive avec variations de voix pour capter l'attention des élèves.",
      lectureEcriture:
        "1. Lecture silencieuse individuelle avec repérage des mots difficiles.\n2. Lecture en cascade (chaque élève lit une phrase).\n3. Écriture d'une phrase complète en réponse à la question de compréhension.",
      jeu:
        "Rallye-Lecture : Défi de fluence chronométré en petits groupes hétérogènes avec calcul du nombre de mots corrects par minute (MCLM).",
      outils:
        "Textes gradués TaRL, tableau de pointage de la fluence, chronomètres, fiches de compréhension.",
      ecoleName: "مدرسة الريادة",
      anneeScolaire: "2026/2027",
    },
  },
  {
    id: "blank_template",
    title: "Modèle Vierge (نموذج فارغ للطباعة والكتابة اليدوية)",
    description: "استمارة فارغة تماماً مع أسطر منقطة جاهزة للطباعة الورقية وتعبئتها يدوياً بالقلم",
    data: DEFAULT_BLANK_MAP,
  },
];

interface TarlFrenchMindMapProps {
  teacherProfile?: TeacherProfile;
  onNavigateToTab?: (tab: string) => void;
}

export const TarlFrenchMindMap: React.FC<TarlFrenchMindMapProps> = ({
  teacherProfile,
  onNavigateToTab,
}) => {
  const [mapData, setMapData] = useState<TarlMindMapData>(() => {
    try {
      const saved = localStorage.getItem("profpress_tarl_mindmap");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return PRESET_PALIERS[0].data;
  });

  const [selectedPresetId, setSelectedPresetId] = useState<string>("palier1_lettres");
  const [isEditMode, setIsEditMode] = useState<boolean>(true);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [copiedSuccess, setCopiedSuccess] = useState<boolean>(false);

  // Sync profile info if available
  useEffect(() => {
    if (teacherProfile && !mapData.ecoleName) {
      setMapData((prev) => ({
        ...prev,
        ecoleName: teacherProfile.schoolName || "مدرسة الريادة الابتدائية",
        anneeScolaire: teacherProfile.academicYear || "2026/2027",
      }));
    }
  }, [teacherProfile]);

  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    const found = PRESET_PALIERS.find((p) => p.id === presetId);
    if (found) {
      setMapData({
        ...found.data,
        ecoleName: teacherProfile?.schoolName || found.data.ecoleName || "مدرسة الريادة",
        anneeScolaire: teacherProfile?.academicYear || found.data.anneeScolaire || "2026/2027",
      });
    }
  };

  const handleSaveToLocalStorage = () => {
    try {
      localStorage.setItem("profpress_tarl_mindmap", JSON.stringify(mapData));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const handleResetToBlank = () => {
    if (window.confirm("هل ترغب حقاً في إفراغ جميع الحقول للحصول على خطاطة ذهنية فارغة؟")) {
      setSelectedPresetId("blank_template");
      setMapData({
        ...DEFAULT_BLANK_MAP,
        ecoleName: teacherProfile?.schoolName || "",
      });
    }
  };

  const handleVocabChange = (index: number, val: string) => {
    const newVocab = [...(mapData.vocabulaire || ["", "", "", "", ""])];
    newVocab[index] = val;
    setMapData((prev) => ({ ...prev, vocabulaire: newVocab }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const text = `📌 Carte Mentale TaRL Français (${mapData.niveau || "---"})
Niveau: ${mapData.niveau} | Parcours: ${mapData.parcours} | Palier: ${mapData.palier} | Séance: ${mapData.seance} (${mapData.duree} min)
🎯 Objectifs:
${mapData.objectifs}
📖 Vocabulaire: ${mapData.vocabulaire.filter(Boolean).join(" • ")}
🚀 Ouverture: ${mapData.ouverture}
✍️ Lecture & Écriture: ${mapData.lectureEcriture}
🎲 Jeu: ${mapData.jeu}
🧰 Outils: ${mapData.outils}`;

    navigator.clipboard.writeText(text);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-16 font-cairo">
      {/* 1. Header Toolbar (Hidden during Print) */}
      <div className="no-print bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 rounded-3xl shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 text-right">
            <div className="flex items-center gap-2 justify-start flex-row-reverse">
              <span className="bg-amber-400 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                TaRL Français
              </span>
              <span className="bg-blue-600/60 text-blue-100 text-xs px-2.5 py-0.5 rounded-full">
                المدرسة الرائدة 2026/2027
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white">
              نموذج الخطاطة الذهنية لحصة طارل - اللغة الفرنسية
            </h1>
            <p className="text-xs md:text-sm text-slate-200">
              Carte Mentale / Schéma de Planification d'une Séance TaRL Français (Objectifs, Ouverture, Vocabulaire, Lecture/Écriture, Jeu, Outils)
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 justify-end">
            <button
              type="button"
              onClick={() => setIsEditMode(!isEditMode)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer shadow-md ${
                isEditMode
                  ? "bg-amber-400 text-slate-950 hover:bg-amber-300"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              {isEditMode ? <Eye className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              <span>{isEditMode ? "وضع المعاينة والطباعة" : "تعديل النصوص"}</span>
            </button>

            <button
              type="button"
              onClick={handleSaveToLocalStorage}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-md"
              title="حفظ التعديلات في المتصفح"
            >
              <Save className="w-4 h-4" />
              <span>{savedSuccess ? "تم الحفظ ✓" : "حفظ"}</span>
            </button>

            <button
              type="button"
              onClick={handleCopySummary}
              className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
              title="نسخ ملخص الحصة"
            >
              <Copy className="w-4 h-4" />
              <span>{copiedSuccess ? "تم النسخ!" : "نسخ"}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition cursor-pointer shadow-lg active:scale-95"
            >
              <Printer className="w-4 h-4 text-amber-300" />
              <span>طباعة A4 / تصدير PDF</span>
            </button>
          </div>
        </div>

        {/* Preset Selector Toolbar */}
        <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-300" />
            <span className="font-bold text-slate-200 whitespace-nowrap">
              النماذج الجاهزة للبنات طارل:
            </span>
            <select
              value={selectedPresetId}
              onChange={(e) => handleSelectPreset(e.target.value)}
              className="bg-slate-800 text-white border border-slate-700 rounded-xl px-3 py-1.5 font-bold focus:ring-2 focus:ring-amber-400 focus:outline-hidden cursor-pointer"
            >
              {PRESET_PALIERS.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 justify-end">
            <button
              type="button"
              onClick={handleResetToBlank}
              className="text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>تفريغ النموذج للطباعة اليدوية</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Educational Context & Instructions Bar (No-Print) */}
      <div className="no-print bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs text-slate-700 flex items-start gap-3 text-right">
        <HelpCircle className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-blue-900">
            توجيه بيداغوجي لتوظيف الخطاطة الذهنية لأنشطة طارل (TaRL Français):
          </p>
          <p className="leading-relaxed">
            تعتمد هذه الخطاطة البصرية كأداة تخطيط ذهني سريعة وشاملة تجمع عناصر الحصة الستة في صفحة واحدة:
            <strong> التمهيد والافتتاح (Ouverture)</strong>، <strong>الأهداف (Objectifs)</strong>، <strong>الرصيد المعجمي (Vocabulaire)</strong>، 
            <strong> القراءة والكتابة (Lecture et écriture)</strong>، <strong>النشاط الترفيهي (Jeu)</strong>، و<strong>الوسائل والعتاد (Outils)</strong>. 
            يمكنك ملء الحقول مباشرة أو طباعة النموذج فارغاً وتعبئته يدوياً أثناء الإعداد اليومي.
          </p>
        </div>
      </div>

      {/* 3. The Visual Printable A4 Mind Map Canvas */}
      <div className="flex justify-center">
        <div
          id="tarl-mindmap-printable"
          className="w-full max-w-4xl bg-white border border-slate-300 rounded-2xl shadow-xl p-6 sm:p-10 relative overflow-hidden print:border-none print:shadow-none print:p-4 print:max-w-none print:w-full print:rounded-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #e2e8f0 1px, transparent 1px),
              linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
            `,
            backgroundSize: "24px 24px",
            backgroundColor: "#fafbfc",
          }}
          dir="ltr"
        >
          {/* Subtle Top Metadata Info (School & Year) */}
          <div className="flex justify-between items-center text-[11px] text-slate-500 font-sans mb-3 px-2 border-b border-slate-200/60 pb-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-700">
              <span>École :</span>
              {isEditMode ? (
                <input
                  type="text"
                  value={mapData.ecoleName || ""}
                  onChange={(e) => setMapData({ ...mapData, ecoleName: e.target.value })}
                  placeholder="Nom de l'école..."
                  className="border-b border-slate-300 px-1 py-0.5 text-xs font-semibold focus:outline-hidden focus:border-blue-500 bg-white/70"
                />
              ) : (
                <span className="text-slate-900 font-bold">{mapData.ecoleName || "École Primaire"}</span>
              )}
            </div>

            <div className="font-bold text-blue-900 font-sans tracking-wide">
              Schéma de Planification TaRL Français
            </div>

            <div className="flex items-center gap-1 font-bold text-slate-600">
              <span>A.S :</span>
              <span>{mapData.anneeScolaire || "2026/2027"}</span>
            </div>
          </div>

          {/* SVG Connectors Background Layer */}
          <div className="relative z-10 space-y-6">
            {/* Top Row: Centered Header Cloud */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md bg-white border-2 border-dashed border-sky-400 rounded-3xl p-4 shadow-sm text-center">
                {/* Decorative cloud scallop effect */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sky-100 text-sky-900 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-sky-300">
                  Fiche de Séance TaRL
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-sans text-left mt-1">
                  {/* Niveau */}
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-slate-800">Niveau :</span>
                    {isEditMode ? (
                      <input
                        type="text"
                        value={mapData.niveau}
                        onChange={(e) => setMapData({ ...mapData, niveau: e.target.value })}
                        placeholder="ex: 3AEP / 4AEP"
                        className="flex-1 border-b border-dotted border-slate-400 px-1 py-0.5 text-xs font-semibold focus:outline-hidden focus:border-blue-500 bg-transparent"
                      />
                    ) : (
                      <span className="flex-1 border-b border-dotted border-slate-400 font-bold text-blue-900">
                        {mapData.niveau || "...................."}
                      </span>
                    )}
                  </div>

                  {/* Parcours */}
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-slate-800">Parcours :</span>
                    {isEditMode ? (
                      <input
                        type="text"
                        value={mapData.parcours}
                        onChange={(e) => setMapData({ ...mapData, parcours: e.target.value })}
                        placeholder="ex: Parcours 1"
                        className="flex-1 border-b border-dotted border-slate-400 px-1 py-0.5 text-xs font-semibold focus:outline-hidden focus:border-blue-500 bg-transparent"
                      />
                    ) : (
                      <span className="flex-1 border-b border-dotted border-slate-400 font-bold text-blue-900">
                        {mapData.parcours || "...................."}
                      </span>
                    )}
                  </div>

                  {/* Palier */}
                  <div className="flex items-center gap-1 col-span-2">
                    <span className="font-bold text-slate-800">Palier :</span>
                    {isEditMode ? (
                      <input
                        type="text"
                        value={mapData.palier}
                        onChange={(e) => setMapData({ ...mapData, palier: e.target.value })}
                        placeholder="ex: Palier 1 (Lettres et sons)"
                        className="flex-1 border-b border-dotted border-slate-400 px-1 py-0.5 text-xs font-semibold focus:outline-hidden focus:border-blue-500 bg-transparent"
                      />
                    ) : (
                      <span className="flex-1 border-b border-dotted border-slate-400 font-bold text-blue-900">
                        {mapData.palier || "........................................"}
                      </span>
                    )}
                  </div>

                  {/* Séance & Durée */}
                  <div className="flex items-center justify-between col-span-2 text-slate-800 pt-1 border-t border-slate-100">
                    <div className="flex items-center gap-1">
                      <span className="font-bold">Séance :</span>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={mapData.seance}
                          onChange={(e) => setMapData({ ...mapData, seance: e.target.value })}
                          placeholder="01"
                          className="w-12 border-b border-dotted border-slate-400 px-1 py-0.5 text-xs font-semibold text-center focus:outline-hidden bg-transparent"
                        />
                      ) : (
                        <span className="font-bold text-blue-900">{mapData.seance || "..."}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <span className="font-bold">Durée :</span>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={mapData.duree}
                          onChange={(e) => setMapData({ ...mapData, duree: e.target.value })}
                          placeholder="60"
                          className="w-12 border-b border-dotted border-slate-400 px-1 py-0.5 text-xs font-semibold text-center focus:outline-hidden bg-transparent"
                        />
                      ) : (
                        <span className="font-bold text-blue-900">{mapData.duree || "..."}</span>
                      )}
                      <span className="font-bold">min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Connecting Lines Branch 1 */}
            <div className="hidden sm:flex justify-center -my-3">
              <svg width="600" height="30" viewBox="0 0 600 30" className="text-slate-400">
                {/* Center vertical stem */}
                <line x1="300" y1="0" x2="300" y2="30" stroke="currentColor" strokeWidth="2" strokeDasharray="3,3" />
                {/* Horizontal branch */}
                <line x1="100" y1="20" x2="500" y2="20" stroke="currentColor" strokeWidth="2" strokeDasharray="3,3" />
                {/* Drop lines to left and right clouds */}
                <line x1="100" y1="20" x2="100" y2="30" stroke="currentColor" strokeWidth="2" strokeDasharray="3,3" />
                <line x1="500" y1="20" x2="500" y2="30" stroke="currentColor" strokeWidth="2" strokeDasharray="3,3" />
              </svg>
            </div>

            {/* Middle Row: Objectifs (Left), Vocabulaire (Center), Ouverture (Right) */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-stretch">
              {/* 1. Objectifs Cloud (Left: 3 cols) */}
              <div className="md:col-span-3 bg-white border-2 border-amber-400 rounded-3xl p-4 shadow-sm flex flex-col justify-between relative">
                {/* Scallop header badge */}
                <div className="flex items-center justify-between pb-2 border-b border-amber-200">
                  <h3 className="text-sm font-black text-amber-900 font-sans tracking-wide">
                    Objectifs
                  </h3>
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                    الأهداف التعلمية
                  </span>
                </div>

                <div className="mt-2 flex-1">
                  {isEditMode ? (
                    <textarea
                      value={mapData.objectifs}
                      onChange={(e) => setMapData({ ...mapData, objectifs: e.target.value })}
                      placeholder="- Identifier les lettres...\n- Lire des syllabes...\n- Écrire des mots..."
                      rows={5}
                      className="w-full text-xs text-slate-800 leading-relaxed p-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-400 focus:outline-hidden bg-amber-50/20 resize-none font-sans"
                    />
                  ) : (
                    <div className="text-xs text-slate-800 leading-relaxed font-sans min-h-[90px] whitespace-pre-line">
                      {mapData.objectifs || (
                        <div className="space-y-3 pt-2">
                          <div className="border-b border-dotted border-slate-300 h-4"></div>
                          <div className="border-b border-dotted border-slate-300 h-4"></div>
                          <div className="border-b border-dotted border-slate-300 h-4"></div>
                          <div className="border-b border-dotted border-slate-300 h-4"></div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom scalloped bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 rounded-full mt-2"></div>
              </div>

              {/* 2. Vocabulaire Column (Center: 1 col) */}
              <div className="md:col-span-1 bg-white border border-purple-200 rounded-2xl p-2.5 shadow-2xs flex flex-col items-center justify-center text-center">
                <h4 className="text-xs font-black text-purple-900 font-sans uppercase mb-1">
                  Vocabulaire
                </h4>
                <div className="w-full space-y-1.5 text-xs font-bold text-slate-800 font-sans">
                  {[0, 1, 2, 3, 4].map((idx) => (
                    <div key={idx} className="border-b border-dotted border-slate-400 pb-0.5">
                      {isEditMode ? (
                        <input
                          type="text"
                          value={mapData.vocabulaire[idx] || ""}
                          onChange={(e) => handleVocabChange(idx, e.target.value)}
                          placeholder={`Mot ${idx + 1}`}
                          className="w-full text-center text-xs font-bold text-purple-900 focus:outline-hidden bg-transparent"
                        />
                      ) : (
                        <span className="text-purple-950">
                          {mapData.vocabulaire[idx] || ".........."}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Ouverture Cloud (Right: 3 cols) */}
              <div className="md:col-span-3 bg-white border-2 border-emerald-400 rounded-3xl p-4 shadow-sm flex flex-col justify-between relative">
                <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
                  <h3 className="text-sm font-black text-emerald-900 font-sans tracking-wide">
                    Ouverture
                  </h3>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    أنشطة الافتتاح والطقوس
                  </span>
                </div>

                <div className="mt-2 flex-1">
                  {isEditMode ? (
                    <textarea
                      value={mapData.ouverture}
                      onChange={(e) => setMapData({ ...mapData, ouverture: e.target.value })}
                      placeholder="Rituel, virelangue, échauffement, chanson..."
                      rows={5}
                      className="w-full text-xs text-slate-800 leading-relaxed p-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-400 focus:outline-hidden bg-emerald-50/20 resize-none font-sans"
                    />
                  ) : (
                    <div className="text-xs text-slate-800 leading-relaxed font-sans min-h-[90px] whitespace-pre-line">
                      {mapData.ouverture || (
                        <div className="space-y-3 pt-2">
                          <div className="border-b border-dotted border-slate-300 h-4"></div>
                          <div className="border-b border-dotted border-slate-300 h-4"></div>
                          <div className="border-b border-dotted border-slate-300 h-4"></div>
                          <div className="border-b border-dotted border-slate-300 h-4"></div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom scalloped bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 rounded-full mt-2"></div>
              </div>
            </div>

            {/* Connecting Lines Branch 2 */}
            <div className="hidden sm:flex justify-center -my-3">
              <svg width="700" height="30" viewBox="0 0 700 30" className="text-slate-400">
                {/* Center vertical stem */}
                <line x1="350" y1="0" x2="350" y2="30" stroke="currentColor" strokeWidth="2" strokeDasharray="3,3" />
                {/* Horizontal branch */}
                <line x1="120" y1="15" x2="580" y2="15" stroke="currentColor" strokeWidth="2" strokeDasharray="3,3" />
                {/* Drop lines to 3 bottom clouds */}
                <line x1="120" y1="15" x2="120" y2="30" stroke="currentColor" strokeWidth="2" strokeDasharray="3,3" />
                <line x1="350" y1="15" x2="350" y2="30" stroke="currentColor" strokeWidth="2" strokeDasharray="3,3" />
                <line x1="580" y1="15" x2="580" y2="30" stroke="currentColor" strokeWidth="2" strokeDasharray="3,3" />
              </svg>
            </div>

            {/* Bottom Row: 3 Connected Clouds (Lecture & Écriture, Jeu, Outils) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Cloud 1: Lecture et écriture (Red/Coral) */}
              <div className="bg-white border-2 border-rose-400 rounded-3xl p-4 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between pb-2 border-b border-rose-200">
                  <h3 className="text-sm font-black text-rose-900 font-sans">
                    Lecture et écriture
                  </h3>
                  <span className="text-[10px] font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
                    القراءة والكتابة
                  </span>
                </div>

                <div className="mt-2 flex-1">
                  {isEditMode ? (
                    <textarea
                      value={mapData.lectureEcriture}
                      onChange={(e) => setMapData({ ...mapData, lectureEcriture: e.target.value })}
                      placeholder="1. Lecture des cartes...\n2. Fusion...\n3. Écriture sur ardoise..."
                      rows={4}
                      className="w-full text-xs text-slate-800 leading-relaxed p-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-400 focus:outline-hidden bg-rose-50/20 resize-none font-sans"
                    />
                  ) : (
                    <div className="text-xs text-slate-800 leading-relaxed font-sans min-h-[80px] whitespace-pre-line">
                      {mapData.lectureEcriture || (
                        <div className="space-y-3 pt-2">
                          <div className="border-b border-dotted border-slate-300 h-4"></div>
                          <div className="border-b border-dotted border-slate-300 h-4"></div>
                          <div className="border-b border-dotted border-slate-300 h-4"></div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="h-1.5 w-full bg-gradient-to-r from-rose-300 via-rose-400 to-rose-500 rounded-full mt-2"></div>
              </div>

              {/* Cloud 2: Jeu (Teal/Cyan) */}
              <div className="bg-white border-2 border-teal-400 rounded-3xl p-4 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between pb-2 border-b border-teal-200">
                  <h3 className="text-sm font-black text-teal-900 font-sans">
                    Jeu
                  </h3>
                  <span className="text-[10px] font-bold bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full">
                    النشاط الترفيهي / اللعبة
                  </span>
                </div>

                <div className="mt-2 flex-1">
                  {isEditMode ? (
                    <textarea
                      value={mapData.jeu}
                      onChange={(e) => setMapData({ ...mapData, jeu: e.target.value })}
                      placeholder="Jeu de la tapette, bingo, roue des lettres..."
                      rows={4}
                      className="w-full text-xs text-slate-800 leading-relaxed p-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-400 focus:outline-hidden bg-teal-50/20 resize-none font-sans"
                    />
                  ) : (
                    <div className="text-xs text-slate-800 leading-relaxed font-sans min-h-[80px] whitespace-pre-line">
                      {mapData.jeu || (
                        <div className="space-y-3 pt-2">
                          <div className="border-b border-dotted border-slate-300 h-4"></div>
                          <div className="border-b border-dotted border-slate-300 h-4"></div>
                          <div className="border-b border-dotted border-slate-300 h-4"></div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="h-1.5 w-full bg-gradient-to-r from-teal-300 via-teal-400 to-teal-500 rounded-full mt-2"></div>
              </div>

              {/* Cloud 3: Outils (Navy/Indigo) */}
              <div className="bg-white border-2 border-indigo-400 rounded-3xl p-4 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between pb-2 border-b border-indigo-200">
                  <h3 className="text-sm font-black text-indigo-900 font-sans">
                    Outils
                  </h3>
                  <span className="text-[10px] font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                    الوسائل والعتاد الديداكتيكي
                  </span>
                </div>

                <div className="mt-2 flex-1">
                  {isEditMode ? (
                    <textarea
                      value={mapData.outils}
                      onChange={(e) => setMapData({ ...mapData, outils: e.target.value })}
                      placeholder="Cartes-lettres, ardoises, flashcards, livret..."
                      rows={4}
                      className="w-full text-xs text-slate-800 leading-relaxed p-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-400 focus:outline-hidden bg-indigo-50/20 resize-none font-sans"
                    />
                  ) : (
                    <div className="text-xs text-slate-800 leading-relaxed font-sans min-h-[80px] whitespace-pre-line">
                      {mapData.outils || (
                        <div className="space-y-3 pt-2">
                          <div className="border-b border-dotted border-slate-300 h-4"></div>
                          <div className="border-b border-dotted border-slate-300 h-4"></div>
                          <div className="border-b border-dotted border-slate-300 h-4"></div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="h-1.5 w-full bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-500 rounded-full mt-2"></div>
              </div>
            </div>
          </div>

          {/* Footer watermark & signature */}
          <div className="mt-6 pt-3 border-t border-slate-200/80 flex justify-between items-center text-[10px] text-slate-400 font-sans">
            <div>
              <span>ProfPress • Modèle Officiel TaRL 2026/2027</span>
            </div>
            <div className="text-right">
              <span>Signature de l'enseignant(e) : ................................</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Tips & Recommendations Block */}
      <div className="no-print grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-2 text-right">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-xs justify-end">
            <span>اللبنة الأولى: الحروف والأصوات</span>
            <Sparkles className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            التركيز على الربط بين الصوت والحرف، استعمال البطاقات اليدوية والمناولة، وإجراء أنشطة دمج مقطعي سريع على الألواح الفردية.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-2 text-right">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs justify-end">
            <span>اللبنتان 2 و 3: الكلمات والجمل</span>
            <FileCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            تنويع ألعاب القراءة (البينغو، التناوب، القراءة الموقوتة بالدقيقة)، مع تشجيع القراءة المعبرة للفقرات القصيرة وتصحيح النطق.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-2 text-right">
          <div className="flex items-center gap-2 text-blue-800 font-bold text-xs justify-end">
            <span>نصائح الطباعة الورقية A4</span>
            <Printer className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            اضغط على زر «طباعة A4» وتأكد من اختيار الاتجاه الأفقي (Landscape) أو العمودي (Portrait) وضبط الهوامش على «None / الافتراضية» للحصول على جودة فائقة.
          </p>
        </div>
      </div>
    </div>
  );
};
