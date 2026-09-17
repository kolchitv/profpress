export interface FrenchLevel1Session {
  id: string;
  semaine: number;
  jour: number;
  seance: number;
  title: string;
  objectifs: string;
  chansonAction: {
    title: string;
    duree: string;
  };
  vocabulaire: {
    content: string;
    duree: string;
  };
  chansonAlphabet: {
    title: string;
    duree: string;
  };
  presentationLettre: {
    content: string;
    duree: string;
  };
  jeu: {
    title: string;
    duree: string;
  };
}

export interface MathLevel1Session {
  id: string;
  semaine: number;
  jour: number;
  seance: number;
  title: string;
  objectifs: string;
  activite1: {
    type: string;
    title: string;
    duree: string;
  };
  activite2: {
    type: string;
    title: string;
    duree: string;
  };
  activite3: {
    type: string;
    title: string;
    duree: string;
  };
  activite4: {
    type: string;
    title: string;
    duree: string;
  };
}

export interface ArabicLevel1Session {
  id: string;
  semaine: number;
  jour: number;
  seance: number;
  title: string;
  objectifs: string;
  activite1: {
    type: string;
    title: string;
    duree: string;
  };
  activite2: {
    type: string;
    title: string;
    duree: string;
  };
  activite3: {
    type: string;
    title: string;
    duree: string;
  };
  activite4: {
    type: string;
    title: string;
    duree: string;
  };
}

export interface ArabicTarlMindMapSession {
  id: string;
  author: string;
  subject: string;
  pathNumber: string;
  level: string;
  blockName: string;
  week: string;
  sessionNumber: string;
  duration: string;
  title: string;
  tools: string;
  objectifsTitle: string;
  objectives: string[];
  centerPathLabel: string;
  centerBlockLabel: string;
  sections: {
    opening: {
      title: string;
      items: string[];
    };
    routineActivity: {
      title: string;
      items: string[];
    };
    readingActivity: {
      title: string;
      items: string[];
    };
    writingActivity: {
      title: string;
      items: string[];
    };
    closing: {
      title: string;
      items: string[];
    };
  };
}

// 1. Français Niveau 1 - 24 Séances (Semaines 1 à 4)
export const FRENCH_LEVEL1_SESSIONS: FrenchLevel1Session[] = [
  {
    id: "fr-s1",
    semaine: 1,
    jour: 1,
    seance: 1,
    title: "Séance 1 : Lettre A & Salutations (Bonjour / Je m'appelle)",
    objectifs: "Comprendre et produire : Bonjour / Je m'appelle.\nReconnaitre, nommer et écrire la lettre A.",
    chansonAction: { title: "Bonjour, je m'appelle", duree: "5 min" },
    vocabulaire: { content: "Bonjour / Je m'appelle", duree: "20 min" },
    chansonAlphabet: { title: "Chanson de l'alphabet", duree: "5 min" },
    presentationLettre: { content: "Présentation de la lettre A", duree: "20 min" },
    jeu: { title: "Sauter sur les lettres", duree: "10 min" },
  },
  {
    id: "fr-s2",
    semaine: 1,
    jour: 2,
    seance: 2,
    title: "Séance 2 : Lettre B & Salutations",
    objectifs: "Comprendre et produire Bonjour / Je m'appelle.\nReconnaitre, nommer et écrire la lettre B.",
    chansonAction: { title: "Bonjour, je m'appelle", duree: "5 min" },
    vocabulaire: { content: "Bonjour / Je m'appelle", duree: "20 min" },
    chansonAlphabet: { title: "Chanson de l'alphabet", duree: "5 min" },
    presentationLettre: { content: "Présentation de la lettre B", duree: "20 min" },
    jeu: { title: "Sauter sur les lettres", duree: "10 min" },
  },
  {
    id: "fr-s3",
    semaine: 1,
    jour: 3,
    seance: 3,
    title: "Séance 3 : Lettre C & Comment ça va ?",
    objectifs: "Comprendre et produire Bonjour / Je m'appelle.\nReconnaitre, nommer et écrire la lettre C.",
    chansonAction: { title: "Bonjour, Comment ça va ?", duree: "5 min" },
    vocabulaire: { content: "Comment ça va ? / Ça va bien, merci.", duree: "20 min" },
    chansonAlphabet: { title: "Chanson de l'alphabet", duree: "5 min" },
    presentationLettre: { content: "Présentation de la lettre C", duree: "20 min" },
    jeu: { title: "Jeu de l'araignée", duree: "10 min" },
  },
  {
    id: "fr-s4",
    semaine: 1,
    jour: 4,
    seance: 4,
    title: "Séance 4 : Lettre D & Comment ça va ?",
    objectifs: "Comprendre et produire Bonjour / Je m'appelle.\nReconnaitre, nommer et écrire la lettre D.",
    chansonAction: { title: "Bonjour, Comment ça va ?", duree: "5 min" },
    vocabulaire: { content: "Comment ça va ? / Ça va bien, merci.", duree: "20 min" },
    chansonAlphabet: { title: "Chanson de l'alphabet", duree: "5 min" },
    presentationLettre: { content: "Présentation de la lettre D", duree: "20 min" },
    jeu: { title: "Jeu de l'araignée", duree: "10 min" },
  },
  {
    id: "fr-s5",
    semaine: 1,
    jour: 5,
    seance: 5,
    title: "Séance 5 : Lettres E et F & Vocabulaire de l'école",
    objectifs: "Comprendre et produire un vocabulaire de base lié à la vie quotidienne à l'école.\nReconnaître, nommer et écrire les lettres E et F en capitale.",
    chansonAction: { title: "À l'école", duree: "5 min" },
    vocabulaire: { content: "Bonjour, je m'appelle, je suis une fille / un garçon", duree: "20 min" },
    chansonAlphabet: { title: "Chanson de l'alphabet", duree: "5 min" },
    presentationLettre: { content: "Présentation des lettres E et F", duree: "20 min" },
    jeu: { title: "Jeu du panier des lettres", duree: "10 min" },
  },
  {
    id: "fr-s6",
    semaine: 1,
    jour: 6,
    seance: 6,
    title: "Séance 6 : Révision Semaine 1 (Lettres A B C D E F)",
    objectifs: "Réviser et consolider le vocabulaire étudié.\nRéviser les lettres ABCDEF.",
    chansonAction: { title: "À l'école", duree: "5 min" },
    vocabulaire: { content: "Révision du Vocabulaire", duree: "20 min" },
    chansonAlphabet: { title: "Chanson de l'alphabet", duree: "5 min" },
    presentationLettre: { content: "Révision des lettres ABCDEF", duree: "20 min" },
    jeu: { title: "Jeu du panier des lettres", duree: "10 min" },
  },
  {
    id: "fr-s7",
    semaine: 2,
    jour: 7,
    seance: 7,
    title: "Séance 7 : Lettres G et H & Classe, tableau, table, cartable",
    objectifs: "Comprendre et produire un vocabulaire de base lié à la vie quotidienne à l'école.\nReconnaître, nommer et écrire les lettres G et H en capitale.",
    chansonAction: { title: "À l'école", duree: "5 min" },
    vocabulaire: { content: "classe / tableau / table / cartable", duree: "20 min" },
    chansonAlphabet: { title: "Chanson de l'alphabet", duree: "5 min" },
    presentationLettre: { content: "Présentation des lettres G et H", duree: "20 min" },
    jeu: { title: "Jeu du panier des lettres", duree: "10 min" },
  },
  {
    id: "fr-s8",
    semaine: 2,
    jour: 8,
    seance: 8,
    title: "Séance 8 : Lettre I & Affaires scolaires",
    objectifs: "Comprendre et produire un vocabulaire de base lié à la vie quotidienne à l'école.\nReconnaître, nommer et écrire la lettre I en capitale.",
    chansonAction: { title: "À l'école", duree: "5 min" },
    vocabulaire: { content: "classe / tableau / table / cartable", duree: "20 min" },
    chansonAlphabet: { title: "Chanson de l'alphabet", duree: "5 min" },
    presentationLettre: { content: "Présentation de la lettre I", duree: "20 min" },
    jeu: { title: "Sauter sur les lettres", duree: "10 min" },
  },
  {
    id: "fr-s9",
    semaine: 2,
    jour: 9,
    seance: 9,
    title: "Séance 9 : Lettre J & Dans mon cartable",
    objectifs: "Comprendre et produire un vocabulaire de base lié à la vie quotidienne à l'école.\nReconnaître, nommer et écrire la lettre J en capitale.",
    chansonAction: { title: "Dans mon cartable", duree: "5 min" },
    vocabulaire: { content: "stylo crayon livre cahier", duree: "20 min" },
    chansonAlphabet: { title: "Chanson de l'alphabet", duree: "5 min" },
    presentationLettre: { content: "Présentation de la lettre J", duree: "20 min" },
    jeu: { title: "Sauter sur les lettres", duree: "10 min" },
  },
  {
    id: "fr-s10",
    semaine: 2,
    jour: 10,
    seance: 10,
    title: "Séance 10 : Lettre K & J'ai un... (crayon, livre, cahier)",
    objectifs: "Comprendre et produire un vocabulaire de base lié à la vie quotidienne à l'école.\nReconnaître, nommer et écrire la lettre K en capitale.",
    chansonAction: { title: "Dans mon cartable", duree: "5 min" },
    vocabulaire: { content: "J'ai un … crayon livre cahier cartable stylo", duree: "20 min" },
    chansonAlphabet: { title: "Chanson de l'alphabet", duree: "5 min" },
    presentationLettre: { content: "Présentation de la lettre K", duree: "20 min" },
    jeu: { title: "Sauter sur les lettres", duree: "10 min" },
  },
  {
    id: "fr-s11",
    semaine: 2,
    jour: 11,
    seance: 11,
    title: "Séance 11 : Lettre L & Les couleurs",
    objectifs: "Comprendre et produire un vocabulaire de base lié à la vie quotidienne à l'école.\nReconnaître, nommer et écrire la lettre L en capitale.",
    chansonAction: { title: "Les couleurs", duree: "5 min" },
    vocabulaire: { content: "rouge vert bleu jaune", duree: "20 min" },
    chansonAlphabet: { title: "Chanson de l'alphabet", duree: "5 min" },
    presentationLettre: { content: "Présentation de la lettre L", duree: "20 min" },
    jeu: { title: "Jeu du panier des lettres", duree: "10 min" },
  },
  {
    id: "fr-s12",
    semaine: 2,
    jour: 12,
    seance: 12,
    title: "Séance 12 : Révision Semaine 2 (Lettres G H I J K L)",
    objectifs: "Réviser et consolider le vocabulaire étudié.\nRéviser les lettres de G H I J K L.",
    chansonAction: { title: "Les couleurs", duree: "5 min" },
    vocabulaire: { content: "Révision du Vocabulaire", duree: "20 min" },
    chansonAlphabet: { title: "Chanson de l'alphabet", duree: "5 min" },
    presentationLettre: { content: "Révision des lettres G H I J K L", duree: "20 min" },
    jeu: { title: "Jeu du panier des lettres", duree: "10 min" },
  },
  {
    id: "fr-s13",
    semaine: 3,
    jour: 13,
    seance: 13,
    title: "Séance 13 : Lettres M et N & Le corps et l'hygiène",
    objectifs: "Comprendre et produire un vocabulaire de base lié au corps et à l'hygiène.\nReconnaître, nommer et écrire les lettres M et N en capitale.",
    chansonAction: { title: "Jean Petit qui danse", duree: "5 min" },
    vocabulaire: { content: "main doigt tête pied", duree: "20 min" },
    chansonAlphabet: { title: "Chanson de l'alphabet", duree: "5 min" },
    presentationLettre: { content: "Présentation des lettres M et N", duree: "20 min" },
    jeu: { title: "Jeu du panier des lettres", duree: "10 min" },
  },
  {
    id: "fr-s14",
    semaine: 3,
    jour: 14,
    seance: 14,
    title: "Séance 14 : Lettre O & Corps et mouvements",
    objectifs: "Comprendre et produire un vocabulaire de base lié au corps et à l'hygiène.\nReconnaître, nommer et écrire la lettre O en capitale.",
    chansonAction: { title: "Jean Petit qui danse", duree: "5 min" },
    vocabulaire: { content: "main doigt tête pied", duree: "20 min" },
    chansonAlphabet: { title: "Chanson de l'alphabet", duree: "5 min" },
    presentationLettre: { content: "Présentation de la lettre O", duree: "20 min" },
    jeu: { title: "Sauter sur les lettres", duree: "10 min" },
  },
  {
    id: "fr-s15",
    semaine: 3,
    jour: 15,
    seance: 15,
    title: "Séance 15 : Lettre P & Visage (yeux, bouche, nez, oreille)",
    objectifs: "Comprendre et produire un vocabulaire de base lié au corps et à l'hygiène.\nReconnaître, nommer et écrire la lettre P en capitale.",
    chansonAction: { title: "Jean Petit qui danse", duree: "5 min" },
    vocabulaire: { content: "yeux bouche nez oreille", duree: "20 min" },
    chansonAlphabet: { title: "Chanson de l'alphabet", duree: "5 min" },
    presentationLettre: { content: "Présentation de la lettre P", duree: "20 min" },
    jeu: { title: "Jeu de l'araignée", duree: "10 min" },
  },
  {
    id: "fr-s16",
    semaine: 3,
    jour: 16,
    seance: 16,
    title: "Séance 16 : Lettre Q & Visage",
    objectifs: "Comprendre et produire un vocabulaire de base lié au corps et à l'hygiène.\nReconnaître, nommer et écrire la lettre Q en capitale.",
    chansonAction: { title: "Jean Petit qui danse", duree: "5 min" },
    vocabulaire: { content: "yeux bouche nez oreille", duree: "20 min" },
    chansonAlphabet: { title: "Chanson de l'alphabet", duree: "5 min" },
    presentationLettre: { content: "Présentation de la lettre Q", duree: "20 min" },
    jeu: { title: "Jeu de l'araignée", duree: "10 min" },
  },
  {
    id: "fr-s17",
    semaine: 3,
    jour: 17,
    seance: 17,
    title: "Séance 17 : Lettre R & Jambe, bras, marcher, courir",
    objectifs: "Comprendre et produire un vocabulaire de base lié au corps et à l'hygiène.\nReconnaître, nommer et écrire la lettre R en capitale.",
    chansonAction: { title: "Jean Petit qui danse", duree: "5 min" },
    vocabulaire: { content: "jambe bras marcher courir", duree: "20 min" },
    chansonAlphabet: { title: "Chanson de l'alphabet", duree: "5 min" },
    presentationLettre: { content: "Présentation de la lettre R", duree: "20 min" },
    jeu: { title: "Sauter sur les lettres", duree: "10 min" },
  },
  {
    id: "fr-s18",
    semaine: 3,
    jour: 18,
    seance: 18,
    title: "Séance 18 : Révision Semaine 3 (Lettres M N O P Q R)",
    objectifs: "Réviser et consolider le vocabulaire étudié.\nRéviser les lettres de M N O P Q R.",
    chansonAction: { title: "Jean Petit qui danse", duree: "5 min" },
    vocabulaire: { content: "jambe bras marcher courir", duree: "20 min" },
    chansonAlphabet: { title: "Chanson de l'alphabet", duree: "5 min" },
    presentationLettre: { content: "Révision des lettres M N O P Q R", duree: "20 min" },
    jeu: { title: "Sauter sur les lettres", duree: "10 min" },
  },
  {
    id: "fr-s19",
    semaine: 4,
    jour: 19,
    seance: 19,
    title: "Séance 19 : Lettres S et T & La famille (papa, maman)",
    objectifs: "Comprendre et produire un vocabulaire de base lié à la famille.\nReconnaître, nommer et écrire les lettres S et T en capitale.",
    chansonAction: { title: "Ouvrez les volets", duree: "5 min" },
    vocabulaire: { content: "famille papa maman", duree: "20 min" },
    chansonAlphabet: { title: "Chanson de l'alphabet", duree: "5 min" },
    presentationLettre: { content: "Présentation des lettres S et T", duree: "20 min" },
    jeu: { title: "Jeu du panier des lettres", duree: "10 min" },
  },
  {
    id: "fr-s20",
    semaine: 4,
    jour: 20,
    seance: 20,
    title: "Séance 20 : Lettres U et V & La famille",
    objectifs: "Comprendre et produire un vocabulaire de base lié à la famille.\nReconnaître, nommer et écrire les lettres U et V en capitale.",
    chansonAction: { title: "Ouvrez les volets", duree: "5 min" },
    vocabulaire: { content: "famille papa maman", duree: "20 min" },
    chansonAlphabet: { title: "Chanson de l'alphabet", duree: "5 min" },
    presentationLettre: { content: "Présentation des lettres U et V", duree: "20 min" },
    jeu: { title: "Sauter sur les lettres", duree: "10 min" },
  },
  {
    id: "fr-s21",
    semaine: 4,
    jour: 21,
    seance: 21,
    title: "Séance 21 : Lettres W et X & Sœur et frère",
    objectifs: "Comprendre et produire un vocabulaire de base lié à la famille.\nReconnaître, nommer et écrire les lettres W et X en capitale.",
    chansonAction: { title: "Ouvrez les volets", duree: "5 min" },
    vocabulaire: { content: "sœur frère", duree: "20 min" },
    chansonAlphabet: { title: "Chanson de l'alphabet", duree: "5 min" },
    presentationLettre: { content: "Présentation des lettres W et X", duree: "20 min" },
    jeu: { title: "Sauter sur les lettres", duree: "10 min" },
  },
  {
    id: "fr-s22",
    semaine: 4,
    jour: 22,
    seance: 22,
    title: "Séance 22 : Lettres Y et Z & Actions (manger, regarder, aimer, jouer)",
    objectifs: "Comprendre et produire un vocabulaire de base lié à la famille.\nReconnaître, nommer et écrire les lettres Y et Z en capitale.",
    chansonAction: { title: "Ouvrez les volets", duree: "5 min" },
    vocabulaire: { content: "manger regarder aimer jouer", duree: "20 min" },
    chansonAlphabet: { title: "Chanson de l'alphabet", duree: "5 min" },
    presentationLettre: { content: "Présentation des lettres Y et Z", duree: "20 min" },
    jeu: { title: "Jeu du panier des lettres", duree: "10 min" },
  },
  {
    id: "fr-s23",
    semaine: 4,
    jour: 23,
    seance: 23,
    title: "Séance 23 : Révision Semaine 4 (Lettres S T U V W X Y Z)",
    objectifs: "Réviser et consolider le vocabulaire étudié.\nRéviser les lettres de S T U V W X Y Z.",
    chansonAction: { title: "Parties du corps", duree: "5 min" },
    vocabulaire: { content: "manger regarder aimer jouer", duree: "20 min" },
    chansonAlphabet: { title: "Chanson de l'alphabet", duree: "5 min" },
    presentationLettre: { content: "Révision des lettres S T U V W X Y Z", duree: "20 min" },
    jeu: { title: "Jeu du panier des lettres", duree: "10 min" },
  },
  {
    id: "fr-s24",
    semaine: 4,
    jour: 24,
    seance: 24,
    title: "Séance 24 : Révision Globale de l'Alphabet (De A à Z)",
    objectifs: "Réviser et consolider le vocabulaire étudié.\nRéviser les lettres de A à Z.",
    chansonAction: { title: "Parties du corps", duree: "5 min" },
    vocabulaire: { content: "manger regarder aimer jouer", duree: "20 min" },
    chansonAlphabet: { title: "Chanson de l'alphabet", duree: "5 min" },
    presentationLettre: { content: "Révision des lettres de A à Z", duree: "20 min" },
    jeu: { title: "Jeu du panier des lettres", duree: "10 min" },
  },
];

// 2. Mathématiques المستوى الأول - 24 حصة (فترة التهيئة والدعم)
export const MATH_LEVEL1_SESSIONS: MathLevel1Session[] = [
  {
    id: "math-s1",
    semaine: 1,
    jour: 1,
    seance: 1,
    title: "الحصة 1 : الخطوط المغلقة والمفتوحة والمتتالية المنطقية حسب اللون",
    objectifs: "تعرف الخطوط وتصنيفها إلى مغلق ومفتوح.\nتعرف وإكمال متتالية منطقية حسب خاصية اللون.",
    activite1: { type: "نشاط اعتيادي", title: "قصة عدد العدد 2", duree: "5 min" },
    activite2: { type: "أنشطة تنمية التفكير المنطقي", title: "تسمية الخطوط: مغلق - مفتوح\nتسمية الألوان: أحمر وأزرق وأصفر وأخضر\nتعرف وإكمال متتالية منطقية بخاصية واحدة", duree: "5 min" },
    activite3: { type: "أنشطة ما قبل الحساب", title: "العد الشفوي تصاعديا\nأنشودة الأعداد", duree: "10 min" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة البحث عن الدخيل", duree: "10 min" },
  },
  {
    id: "math-s2",
    semaine: 1,
    jour: 2,
    seance: 2,
    title: "الحصة 2 : الخطوط (عمودي، أفقي، مائل) والشريط العددي",
    objectifs: "تعرف الخطوط: عمودي، أفقي، مائل.\nالعد تصاعديا باستعمال الشريط العددي.",
    activite1: { type: "نشاط اعتيادي", title: "قصة عدد العدد 2", duree: "5 min" },
    activite2: { type: "أنشطة تنمية التفكير المنطقي", title: "تسمية الخطوط: عمودي - أفقي - مائل\nتسمية الألوان: أحمر وأزرق وأصفر وأخضر\nتعرف وإكمال متتالية منطقية حسب اللون", duree: "5 min" },
    activite3: { type: "أنشطة ما قبل الحساب", title: "العد الشفوي تصاعديا\nالشريط العددي", duree: "10 min" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة البحث عن الدخيل", duree: "10 min" },
  },
  {
    id: "math-s3",
    semaine: 1,
    jour: 3,
    seance: 3,
    title: "الحصة 3 : الخطوط والعد التصاعدي انطلاقاً من عدد مخالف لـ 1",
    objectifs: "تعرف الخطوط: عمودي، أفقي، مائل.\nالعد تصاعديا ابتداء من عدد مخالف لـ 1.",
    activite1: { type: "نشاط اعتيادي", title: "قصة عدد العدد 4", duree: "5 min" },
    activite2: { type: "أنشطة تنمية التفكير المنطقي", title: "تسمية الخطوط: عمودي - أفقي - مائل\nتسمية الألوان: أحمر وأزرق وأصفر وأخضر\nتعرف وإكمال متتالية منطقية بخاصية واحدة", duree: "5 min" },
    activite3: { type: "أنشطة ما قبل الحساب", title: "العد الشفوي التصاعدي انطلاقا من عدد مخالف لـ 1", duree: "10 min" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة البحث عن الدخيل", duree: "10 min" },
  },
  {
    id: "math-s4",
    semaine: 1,
    jour: 4,
    seance: 4,
    title: "الحصة 4 : تمييز وتسمية الأشكال الهندسية (مثلث - قرص) والعد التنازلي",
    objectifs: "تمييز وتسمية الأشكال الهندسية: مثلث - قرص.\nالعد تناقصيا باستعمال الشريط العددي.",
    activite1: { type: "نشاط اعتيادي", title: "لعبة القفز على الأشكال", duree: "5 min" },
    activite2: { type: "أنشطة تنمية التفكير المنطقي", title: "تسمية الأشكال: القرص والمثلث\nتصنيف حسب خاصية الشكل", duree: "5 min" },
    activite3: { type: "أنشطة ما قبل الحساب", title: "العد الشفوي تناقصيا\nالشريط العددي", duree: "10 min" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة البحث عن الدخيل", duree: "10 min" },
  },
  {
    id: "math-s5",
    semaine: 1,
    jour: 5,
    seance: 5,
    title: "الحصة 5 : تمييز وتسمية الأشكال الهندسية (مربع - مستطيل)",
    objectifs: "تمييز وتسمية الأشكال الهندسية: مربع - مستطيل.\nالعد تناقصيا باستعمال الشريط العددي.",
    activite1: { type: "نشاط اعتيادي", title: "قصة عدد العدد 5", duree: "5 min" },
    activite2: { type: "أنشطة تنمية التفكير المنطقي", title: "تسمية الأشكال: المربع والمستطيل\nتصنيف حسب خاصية الشكل", duree: "5 min" },
    activite3: { type: "أنشطة ما قبل الحساب", title: "العد الشفوي تناقصيا\nالشريط العددي", duree: "10 min" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة المحقق: البحث عن الأشكال في القسم", duree: "10 min" },
  },
  {
    id: "math-s6",
    semaine: 1,
    jour: 6,
    seance: 6,
    title: "الحصة 6 : توليف ومراجعة الأسبوع 1 (الألوان، الخطوط، الأشكال)",
    objectifs: "توظيف خاصية الألوان للتصنيف وإكمال متسلسلة منطقية، وتمييز الخطوط المفتوحة والمغلقة والعمودية والأفقية والمائلة، وتمييز الأشكال الهندسية والعد تصاعديا وتناقصيا باستعمال الشريط العددي.",
    activite1: { type: "نشاط اعتيادي", title: "قصة عدد", duree: "5 min" },
    activite2: { type: "أنشطة تنمية التفكير المنطقي", title: "مراجعة وتوليف المهارات السابقة: خاصية الألوان، الخطوط، الأشكال الهندسية", duree: "5 min" },
    activite3: { type: "أنشطة ما قبل الحساب", title: "العد تصاعديا وتناقصيا", duree: "10 min" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة التصنيف حسب الشكل واللون", duree: "10 min" },
  },
  {
    id: "math-s7",
    semaine: 2,
    jour: 7,
    seance: 7,
    title: "الحصة 7 : تعرف العدد 1 وإكمال نمط حسابي",
    objectifs: "تعرف العدد 1.\nإكمال نمط حسابي باستعمال الشريط العددي.",
    activite1: { type: "نشاط اعتيادي", title: "قصة عدد العدد 1", duree: "5 min" },
    activite2: { type: "أنشطة تنمية التفكير المنطقي", title: "تقديم العدد 1 عد وتعداد وتمثيل وقراءة وكتابة", duree: "5 min" },
    activite3: { type: "أنشطة ما قبل الحساب", title: "تصنيف الأشكال والأشياء حسب خاصية اللون", duree: "10 min" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة القفز على الأشكال", duree: "10 min" },
  },
  {
    id: "math-s8",
    semaine: 2,
    jour: 8,
    seance: 8,
    title: "الحصة 8 : كتابة العدد 1 وتصنيف الأشياء حسب اللون",
    objectifs: "كتابة العدد 1.\nتصنيف الأشكال والأشياء حسب خاصية اللون.",
    activite1: { type: "نشاط اعتيادي", title: "لعبة القفز على الأرقام 1 و2 و3", duree: "5 min" },
    activite2: { type: "أنشطة تنمية التفكير المنطقي", title: "تقديم العدد 1 عد وتعداد وتمثيل وقراءة وكتابة", duree: "5 min" },
    activite3: { type: "أنشطة ما قبل الحساب", title: "تصنيف الأشكال والأشياء حسب خاصية اللون", duree: "10 min" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة إكمال نمط حسابي باستعمال الشريط العددي", duree: "10 min" },
  },
  {
    id: "math-s9",
    semaine: 2,
    jour: 9,
    seance: 9,
    title: "الحصة 9 : تعرف العدد 2 ومقارنة وتقدير الأطوال",
    objectifs: "تعرف العدد 2.\nمقارنة وتقدير الأطوال.",
    activite1: { type: "نشاط اعتيادي", title: "قصة عدد العدد 2", duree: "5 min" },
    activite2: { type: "أنشطة تنمية التفكير المنطقي", title: "تقديم العدد 2 عد وتعداد وتمثيل وقراءة وكتابة", duree: "5 min" },
    activite3: { type: "أنشطة ما قبل الحساب", title: "مقارنة وتقدير الأطوال", duree: "10 min" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة الحجلة: العد تصاعديا", duree: "10 min" },
  },
  {
    id: "math-s10",
    semaine: 2,
    jour: 10,
    seance: 10,
    title: "الحصة 10 : كتابة العدد 2 ومقارنة المجموعات في حدود 5 عناصر",
    objectifs: "كتابة العدد 2.\nمقارنة مجموعات في حدود 5 عناصر.",
    activite1: { type: "نشاط اعتيادي", title: "قصة عدد العدد 2", duree: "5 min" },
    activite2: { type: "أنشطة تنمية التفكير المنطقي", title: "تقديم العدد 2 عد وتعداد وتمثيل وقراءة وكتابة", duree: "5 min" },
    activite3: { type: "أنشطة ما قبل الحساب", title: "مقارنة المجموعات في حدود 5 عناصر", duree: "10 min" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة الحجلة: العد تصاعديا", duree: "10 min" },
  },
  {
    id: "math-s11",
    semaine: 2,
    jour: 11,
    seance: 11,
    title: "الحصة 11 : تعرف العدد 3 ومقارنة وتقدير الأطوال",
    objectifs: "تعرف العدد 3.\nمقارنة وتقدير الأطوال.",
    activite1: { type: "نشاط اعتيادي", title: "قصة عدد العدد 3", duree: "5 min" },
    activite2: { type: "أنشطة تنمية التفكير المنطقي", title: "تقديم العدد 3 عد وتعداد وتمثيل وقراءة وكتابة", duree: "5 min" },
    activite3: { type: "أنشطة ما قبل الحساب", title: "مقارنة وتقدير الأطوال", duree: "10 min" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة المجموعات", duree: "10 min" },
  },
  {
    id: "math-s12",
    semaine: 2,
    jour: 12,
    seance: 12,
    title: "الحصة 12 : توليف الأعداد 1 و2 و3 ومقارنة الأطوال والمجموعات",
    objectifs: "تعرف وتمثيل وكتابة الأعداد 1 و2 و3، ومقارنة وتقدير الأطوال، ومقارنة مجموعات في حدود 5 عناصر.",
    activite1: { type: "نشاط اعتيادي", title: "قصة عدد العدد 3", duree: "5 min" },
    activite2: { type: "أنشطة تنمية التفكير المنطقي", title: "الأعداد 1 و2 و3", duree: "5 min" },
    activite3: { type: "أنشطة ما قبل الحساب", title: "مقارنة وتقدير الأطوال ومقارنة المجموعات في حدود 5 عناصر", duree: "10 min" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة المجموعات", duree: "10 min" },
  },
  {
    id: "math-s13",
    semaine: 3,
    jour: 13,
    seance: 13,
    title: "الحصة 13 : تعرف العدد 4 ومتتالية منطقية حسب الحجم",
    objectifs: "تعرف العدد 4.\nتعرف وإكمال متتالية منطقية حسب الحجم.",
    activite1: { type: "نشاط اعتيادي", title: "قصة العدد 4", duree: "5 min" },
    activite2: { type: "أنشطة تنمية التفكير المنطقي", title: "تقديم العدد 4 عد وتعداد وتمثيل وقراءة وكتابة", duree: "5 min" },
    activite3: { type: "أنشطة ما قبل الحساب", title: "تعرف وإكمال متتالية منطقية حسب الحجم", duree: "10 min" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة إكمال نمط حسابي باستعمال الشريط العددي", duree: "10 min" },
  },
  {
    id: "math-s14",
    semaine: 3,
    jour: 14,
    seance: 14,
    title: "الحصة 14 : كتابة العدد 4 والمتتالية المنطقية",
    objectifs: "كتابة العدد 4.\nتعرف وإكمال متتالية منطقية حسب الحجم.",
    activite1: { type: "نشاط اعتيادي", title: "قصة العدد 4", duree: "5 min" },
    activite2: { type: "أنشطة تنمية التفكير المنطقي", title: "تقديم العدد 4 عد وتعداد وتمثيل وقراءة وكتابة", duree: "5 min" },
    activite3: { type: "أنشطة ما قبل الحساب", title: "تعرف وإكمال متتالية منطقية حسب الحجم", duree: "10 min" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة إكمال نمط حسابي باستعمال الشريط العددي", duree: "10 min" },
  },
  {
    id: "math-s15",
    semaine: 3,
    jour: 15,
    seance: 15,
    title: "الحصة 15 : تعرف العدد 5 ومتتالية منطقية حسب الاتجاه",
    objectifs: "تعرف العدد 5.\nتعرف وإكمال متتالية منطقية حسب الاتجاه.",
    activite1: { type: "نشاط اعتيادي", title: "قصة العدد 5", duree: "5 min" },
    activite2: { type: "أنشطة تنمية التفكير المنطقي", title: "تقديم العدد 5 عد وتعداد وتمثيل وقراءة وكتابة", duree: "5 min" },
    activite3: { type: "أنشطة ما قبل الحساب", title: "تعرف وإكمال متتالية منطقية حسب الاتجاه", duree: "10 min" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة البطاقات المقلوبة", duree: "10 min" },
  },
  {
    id: "math-s16",
    semaine: 3,
    jour: 16,
    seance: 16,
    title: "الحصة 16 : كتابة العدد 5 وتصنيف الأشكال حسب الشكل",
    objectifs: "كتابة العدد 5.\nتصنيف الأشكال والأشياء حسب خاصية الشكل.",
    activite1: { type: "نشاط اعتيادي", title: "قصة العدد 5", duree: "5 min" },
    activite2: { type: "أنشطة تنمية التفكير المنطقي", title: "تقديم العدد 5 عد وتعداد وتمثيل وقراءة وكتابة", duree: "5 min" },
    activite3: { type: "أنشطة ما قبل الحساب", title: "تعرف وإكمال متتالية منطقية حسب الاتجاه", duree: "10 min" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة الترتيب", duree: "10 min" },
  },
  {
    id: "math-s17",
    semaine: 3,
    jour: 17,
    seance: 17,
    title: "الحصة 17 : تعرف العدد 6 ونمط هندسي حسب الشكل واللون",
    objectifs: "تعرف العدد 6.\nإكمال نمط هندسي حسب الشكل واللون.",
    activite1: { type: "نشاط اعتيادي", title: "قصة العدد 6", duree: "5 min" },
    activite2: { type: "أنشطة تنمية التفكير المنطقي", title: "تقديم العدد 6 عد وتعداد وتمثيل وقراءة وكتابة", duree: "5 min" },
    activite3: { type: "أنشطة ما قبل الحساب", title: "تعرف وإكمال متتالية منطقية حسب الشكل واللون", duree: "10 min" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة المجموعات", duree: "10 min" },
  },
  {
    id: "math-s18",
    semaine: 3,
    jour: 18,
    seance: 18,
    title: "الحصة 18 : مراجعة الأعداد 4 و5 و6 وإكمال المتتاليات",
    objectifs: "تعرف وتمثيل وكتابة الأعداد 4 و5 و6، وإكمال متتالية منطقية حسب الشكل أو اللون أو الحجم أو الاتجاه.",
    activite1: { type: "نشاط اعتيادي", title: "قصة العدد 6", duree: "5 min" },
    activite2: { type: "أنشطة تنمية التفكير المنطقي", title: "الأعداد 4 و5 و6", duree: "5 min" },
    activite3: { type: "أنشطة ما قبل الحساب", title: "إكمال متتالية منطقية حسب الشكل أو اللون أو الحجم أو الاتجاه", duree: "10 min" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة المجموعات", duree: "10 min" },
  },
  {
    id: "math-s19",
    semaine: 4,
    jour: 19,
    seance: 19,
    title: "الحصة 19 : تعرف العدد 7 ومتتالية منطقية حسب الحجم واللون",
    objectifs: "تعرف العدد 7.\nتعرف وإكمال متتالية منطقية حسب الحجم واللون.",
    activite1: { type: "نشاط اعتيادي", title: "قصة العدد 7", duree: "5 min" },
    activite2: { type: "أنشطة تنمية التفكير المنطقي", title: "تقديم العدد 7 عد وتعداد وتمثيل وقراءة وكتابة", duree: "5 min" },
    activite3: { type: "أنشطة ما قبل الحساب", title: "تعرف وإكمال متتالية منطقية حسب الحجم واللون", duree: "10 min" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة الحجلة: العد تصاعديا", duree: "10 min" },
  },
  {
    id: "math-s20",
    semaine: 4,
    jour: 20,
    seance: 20,
    title: "الحصة 20 : كتابة العدد 7 وتصنيف الأشكال واللون",
    objectifs: "كتابة العدد 7.\nتصنيف الأشكال والأشياء خاصية الشكل.",
    activite1: { type: "نشاط اعتيادي", title: "قصة العدد 7", duree: "5 min" },
    activite2: { type: "أنشطة تنمية التفكير المنطقي", title: "تقديم العدد 7 عد وتعداد وتمثيل وقراءة وكتابة", duree: "5 min" },
    activite3: { type: "أنشطة ما قبل الحساب", title: "تصنيف أشكال حسب الشكل واللون", duree: "10 min" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة الحجلة: 1 - 9", duree: "10 min" },
  },
  {
    id: "math-s21",
    semaine: 4,
    jour: 21,
    seance: 21,
    title: "الحصة 21 : تعرف العدد 8 وتصنيف الأشكال حسب الحجم والشكل",
    objectifs: "تعرف العدد 8.\nتصنيف الأشكال والأشياء حسب الشكل أو اللون أو الحجم.\nإكمال متتالية منطقية حسب الشكل أو اللون أو الحجم أو الاتجاه.",
    activite1: { type: "نشاط اعتيادي", title: "قصة العدد 8", duree: "5 min" },
    activite2: { type: "أنشطة تنمية التفكير المنطقي", title: "تقديم العدد 8 عد وتعداد وتمثيل وقراءة وكتابة", duree: "5 min" },
    activite3: { type: "أنشطة ما قبل الحساب", title: "إكمال متتالية منطقية حسب الشكل أو اللون أو الحجم أو الاتجاه", duree: "10 min" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة إتمام الشريط العددي باستخدام بطاقات الأعداد", duree: "10 min" },
  },
  {
    id: "math-s22",
    semaine: 4,
    jour: 22,
    seance: 22,
    title: "الحصة 22 : كتابة العدد 8 وإكمال المتتاليات المنطقية",
    objectifs: "كتابة العدد 8.\nتصنيف الأشكال والأشياء حسب الشكل أو اللون أو الحجم.\nإكمال متتالية منطقية حسب الشكل أو اللون أو الحجم أو الاتجاه.",
    activite1: { type: "نشاط اعتيادي", title: "قصة العدد 8", duree: "5 min" },
    activite2: { type: "أنشطة تنمية التفكير المنطقي", title: "تقديم العدد 8 عد وتعداد وتمثيل وقراءة وكتابة", duree: "5 min" },
    activite3: { type: "أنشطة ما قبل الحساب", title: "إكمال متتالية منطقية حسب الشكل أو اللون أو الحجم أو الاتجاه", duree: "10 min" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة إتمام الشريط العددي باستخدام بطاقات الأعداد", duree: "10 min" },
  },
  {
    id: "math-s23",
    semaine: 4,
    jour: 23,
    seance: 23,
    title: "الحصة 23 : تعرف العدد 9 وتصنيف الأشكال والاتجاه",
    objectifs: "تعرف العدد 9.\nتصنيف الأشكال والأشياء حسب الشكل أو اللون أو الحجم.\nإكمال متتالية منطقية حسب الشكل أو اللون أو الحجم أو الاتجاه.",
    activite1: { type: "نشاط اعتيادي", title: "قصة العدد 9", duree: "5 min" },
    activite2: { type: "أنشطة تنمية التفكير المنطقي", title: "تقديم العدد 9 عد وتعداد وتمثيل وقراءة وكتابة", duree: "5 min" },
    activite3: { type: "أنشطة ما قبل الحساب", title: "تصنيف الأشكال والأشياء حسب خاصية الشكل أو اللون أو الحجم أو الاتجاه", duree: "10 min" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة أمرح مع العدد 9", duree: "10 min" },
  },
  {
    id: "math-s24",
    semaine: 4,
    jour: 24,
    seance: 24,
    title: "الحصة 24 : توليف الأعداد من 7 إلى 9 والتصنيف الشامل",
    objectifs: "تعرف وتمثيل وكتابة الأعداد 7 و8 و9.\nتصنيف الأشكال والأشياء حسب خاصية الشكل أو اللون أو الحجم أو الاتجاه.\nإكمال متتالية منطقية حسب الشكل أو اللون أو الحجم أو الاتجاه.",
    activite1: { type: "نشاط اعتيادي", title: "قصة العدد 9", duree: "5 min" },
    activite2: { type: "أنشطة تنمية التفكير المنطقي", title: "الأعداد 7 و8 و9", duree: "5 min" },
    activite3: { type: "أنشطة ما قبل الحساب", title: "تصنيف الأشكال والأشياء حسب خاصية الشكل أو اللون أو الحجم أو الاتجاه", duree: "10 min" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة أمرح مع العدد 10", duree: "10 min" },
  },
];

// 3. اللغة العربية المستوى الأول - 24 حصة (فترة التهيئة والدعم)
export const ARABIC_LEVEL1_SESSIONS: ArabicLevel1Session[] = [
  {
    id: "ar-s1",
    semaine: 1,
    jour: 1,
    seance: 1,
    title: "الحصة 1 : الحرف أ و فضاء القسم (أول يوم في المدرسة)",
    objectifs: "مأسسة البيئة الآمنة اللازمة للتعلم.\nتعرف معجم بسيط مرتبط بفضاء القسم.\nتعرف حرف أ وتسميته ورسمه.",
    activite1: { type: "نشاط اعتيادي", title: "طقس تسجيل الحضور", duree: "20 د" },
    activite2: { type: "أنشطة الاستماع والتحدث وإغناء المعجم", title: "أول يوم في المدرسة", duree: "40 د" },
    activite3: { type: "أنشطة ما قبل القراءة وأنشطة التخطيط والتلوين", title: "الحرف أ", duree: "50 د" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة المحقق", duree: "20 د" },
  },
  {
    id: "ar-s2",
    semaine: 1,
    jour: 2,
    seance: 2,
    title: "الحصة 2 : الحرف ب و فضاء القسم",
    objectifs: "مأسسة البيئة الآمنة اللازمة للتعلم.\nتعرف معجم بسيط مرتبط بفضاء القسم.\nتعرف حرف ب وتسميته ورسمه.",
    activite1: { type: "نشاط اعتيادي", title: "طقس تسجيل الحضور", duree: "20 د" },
    activite2: { type: "أنشطة الاستماع والتحدث وإغناء المعجم", title: "أول يوم في المدرسة", duree: "40 د" },
    activite3: { type: "أنشطة ما قبل القراءة وأنشطة التخطيط والتلوين", title: "الحرف ب", duree: "50 د" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة 1 2 3 جمود", duree: "20 د" },
  },
  {
    id: "ar-s3",
    semaine: 1,
    jour: 3,
    seance: 3,
    title: "الحصة 3 : الحرفان ت و ث",
    objectifs: "مأسسة البيئة الآمنة اللازمة للتعلم.\nتعرف معجم بسيط مرتبط بفضاء القسم.\nتعرف حرفي ت و ث وتسميته ورسمه.",
    activite1: { type: "نشاط اعتيادي", title: "طقس تسجيل الحضور", duree: "20 د" },
    activite2: { type: "أنشطة الاستماع والتحدث وإغناء المعجم", title: "أول يوم في المدرسة", duree: "40 د" },
    activite3: { type: "أنشطة ما قبل القراءة وأنشطة التخطيط والتلوين", title: "الحرف ت و ث", duree: "50 د" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة القفز على الحرف", duree: "20 د" },
  },
  {
    id: "ar-s4",
    semaine: 1,
    jour: 4,
    seance: 4,
    title: "الحصة 4 : الحرفان ج و ح و حكاية (حسن يودع جده)",
    objectifs: "مأسسة البيئة الآمنة اللازمة للتعلم.\nتعرف معجم بسيط مرتبط بفضاء القسم.\nتعرف حرفي ج و ح وتسميته ورسمه.",
    activite1: { type: "نشاط اعتيادي", title: "طقس تسجيل الحضور", duree: "20 د" },
    activite2: { type: "أنشطة الاستماع والتحدث وإغناء المعجم", title: "حسن يودع جده", duree: "40 د" },
    activite3: { type: "أنشطة ما قبل القراءة وأنشطة التخطيط والتلوين", title: "الحرف ج و ح", duree: "50 د" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة البطاقات المقلوبة", duree: "20 د" },
  },
  {
    id: "ar-s5",
    semaine: 1,
    jour: 5,
    seance: 5,
    title: "الحصة 5 : الحرف خ وحكاية حسن يودع جده",
    objectifs: "مأسسة البيئة الآمنة اللازمة للتعلم.\nتعرف معجم بسيط مرتبط بفضاء القسم.\nتعرف حرف خ وتسميته ورسمه.",
    activite1: { type: "نشاط اعتيادي", title: "طقس تسجيل الحضور", duree: "20 د" },
    activite2: { type: "أنشطة الاستماع والتحدث وإغناء المعجم", title: "حسن يودع جده", duree: "40 د" },
    activite3: { type: "أنشطة ما قبل القراءة وأنشطة التخطيط والتلوين", title: "الحرف خ", duree: "50 د" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة القفز على الحرف", duree: "20 د" },
  },
  {
    id: "ar-s6",
    semaine: 1,
    jour: 6,
    seance: 6,
    title: "الحصة 6 : مراجعة وتثبيت حروف الأسبوع 1 (أ، ب، ت، ث، ج، ح، خ)",
    objectifs: "توظيف معجم بسيط للتحدث عن القسم.\nمراجعة الحروف المقدمة وتثبيتها.\nالتحقق من مدى التحكم في الحروف المقدمة.",
    activite1: { type: "نشاط اعتيادي", title: "طقس تسجيل الحضور", duree: "20 د" },
    activite2: { type: "أنشطة الاستماع والتحدث وإغناء المعجم", title: "حسن يودع جده", duree: "40 د" },
    activite3: { type: "أنشطة ما قبل القراءة وأنشطة التخطيط والتلوين", title: "مراجعة الحروف أ ب ت ث ج ح خ", duree: "50 د" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة حجلة الحروف", duree: "20 د" },
  },
  {
    id: "ar-s7",
    semaine: 2,
    jour: 7,
    seance: 7,
    title: "الحصة 7 : الحرفان د و ذ وحكاية بائع القبعات",
    objectifs: "تعرف معجم بسيط مرتبط بالأنشطة اليومية.\nتعرف حرفي د و ذ وتسميته ورسمه.",
    activite1: { type: "نشاط اعتيادي", title: "طقس تسجيل الحضور + نشيد أنا الفتى النظيف", duree: "20 د" },
    activite2: { type: "أنشطة الاستماع والتحدث وإغناء المعجم", title: "بائع القبعات", duree: "40 د" },
    activite3: { type: "أنشطة ما قبل القراءة وأنشطة التخطيط والتلوين", title: "الحرف د و ذ", duree: "50 د" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة سلة الحروف", duree: "20 د" },
  },
  {
    id: "ar-s8",
    semaine: 2,
    jour: 8,
    seance: 8,
    title: "الحصة 8 : الحرفان ر و ز والأنشطة اليومية",
    objectifs: "تعرف معجم بسيط مرتبط بالأنشطة اليومية.\nتعرف حرفي ر و ز وتسميته ورسمه.",
    activite1: { type: "نشاط اعتيادي", title: "طقس تسجيل الحضور + نشيد أنا الفتى النظيف", duree: "20 د" },
    activite2: { type: "أنشطة الاستماع والتحدث وإغناء المعجم", title: "بائع القبعات", duree: "40 د" },
    activite3: { type: "أنشطة ما قبل القراءة وأنشطة التخطيط والتلوين", title: "الحرف ر و ز", duree: "50 د" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة سلة الحروف", duree: "20 د" },
  },
  {
    id: "ar-s9",
    semaine: 2,
    jour: 9,
    seance: 9,
    title: "الحصة 9 : الحرف س والأنشطة اليومية",
    objectifs: "تعرف معجم بسيط مرتبط بالأنشطة اليومية.\nتعرف حرف س وتسميته ورسمه.",
    activite1: { type: "نشاط اعتيادي", title: "طقس تسجيل الحضور + نشيد أنا الفتى النظيف", duree: "20 د" },
    activite2: { type: "أنشطة الاستماع والتحدث وإغناء المعجم", title: "بائع القبعات", duree: "40 د" },
    activite3: { type: "أنشطة ما قبل القراءة وأنشطة التخطيط والتلوين", title: "الحرف س", duree: "50 د" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة حجلة الحروف", duree: "20 د" },
  },
  {
    id: "ar-s10",
    semaine: 2,
    jour: 10,
    seance: 10,
    title: "الحصة 10 : الحرف ش والأنشطة اليومية",
    objectifs: "تعرف معجم بسيط مرتبط بالأنشطة اليومية.\nتعرف حرف ش وتسميته ورسمه.",
    activite1: { type: "نشاط اعتيادي", title: "طقس تسجيل الحضور + نشيد أنا الفتى النظيف", duree: "20 د" },
    activite2: { type: "أنشطة الاستماع والتحدث وإغناء المعجم", title: "بائع القبعات", duree: "40 د" },
    activite3: { type: "أنشطة ما قبل القراءة وأنشطة التخطيط والتلوين", title: "الحرف ش", duree: "50 د" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة البطاقات المقلوبة", duree: "20 د" },
  },
  {
    id: "ar-s11",
    semaine: 2,
    jour: 11,
    seance: 11,
    title: "الحصة 11 : الحرف ص ولعبة تيك تاك تو",
    objectifs: "تعرف معجم بسيط مرتبط بالأنشطة اليومية.\nتعرف حرف ص وتسميته ورسمه.",
    activite1: { type: "نشاط اعتيادي", title: "طقس تسجيل الحضور + نشيد أنا الفتى النظيف", duree: "20 د" },
    activite2: { type: "أنشطة الاستماع والتحدث وإغناء المعجم", title: "بائع القبعات", duree: "40 د" },
    activite3: { type: "أنشطة ما قبل القراءة وأنشطة التخطيط والتلوين", title: "الحرف ص", duree: "50 د" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة تيك تاك تو", duree: "20 د" },
  },
  {
    id: "ar-s12",
    semaine: 2,
    jour: 12,
    seance: 12,
    title: "الحصة 12 : مراجعة حروف الأسبوع 2 (د، ذ، ر، ز، س، ش، ص) ولعب الأدوار",
    objectifs: "توظيف معجم بسيط للتحدث عن الأنشطة اليومية.\nمراجعة الحروف المقدمة وتثبيتها.\nالتحقق من مدى التحكم في الحروف المقدمة.",
    activite1: { type: "نشاط اعتيادي", title: "طقس تسجيل الحضور + نشيد أنا الفتى النظيف", duree: "20 د" },
    activite2: { type: "أنشطة الاستماع والتحدث وإغناء المعجم", title: "بائع القبعات", duree: "40 د" },
    activite3: { type: "أنشطة ما قبل القراءة وأنشطة التخطيط والتلوين", title: "مراجعة الحروف د ذ ر ز س ش ص", duree: "50 د" },
    activite4: { type: "نشاط اعتيادي", title: "لعب الأدوار: بائع القبعات", duree: "20 د" },
  },
  {
    id: "ar-s13",
    semaine: 3,
    jour: 13,
    seance: 13,
    title: "الحصة 13 : الحرف ض ومعجم الأسرة (حكاية قسمة عادلة)",
    objectifs: "تعرف معجم بسيط مرتبط بالأسرة.\nتعرف حرف ض وتسميته ورسمه.",
    activite1: { type: "نشاط اعتيادي", title: "طقس تسجيل الحضور + نشيد أمي وأبي", duree: "20 د" },
    activite2: { type: "أنشطة الاستماع والتحدث وإغناء المعجم", title: "قسمة عادلة", duree: "40 د" },
    activite3: { type: "أنشطة ما قبل القراءة وأنشطة التخطيط والتلوين", title: "الحرف ض", duree: "50 د" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة سلة الحروف", duree: "20 د" },
  },
  {
    id: "ar-s14",
    semaine: 3,
    jour: 14,
    seance: 14,
    title: "الحصة 14 : الحرفان ط و ظ ومعجم الأسرة",
    objectifs: "تعرف معجم بسيط مرتبط بالأسرة.\nتعرف حرف ط و ظ وتسميته ورسمه.",
    activite1: { type: "نشاط اعتيادي", title: "طقس تسجيل الحضور + نشيد أمي وأبي", duree: "20 د" },
    activite2: { type: "أنشطة الاستماع والتحدث وإغناء المعجم", title: "قسمة عادلة", duree: "40 د" },
    activite3: { type: "أنشطة ما قبل القراءة وأنشطة التخطيط والتلوين", title: "الحرف ط و ظ", duree: "50 د" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة البطاقات المقلوبة", duree: "20 د" },
  },
  {
    id: "ar-s15",
    semaine: 3,
    jour: 15,
    seance: 15,
    title: "الحصة 15 : الحرفان ع و غ ومعجم الأسرة",
    objectifs: "تعرف معجم بسيط مرتبط بالأسرة.\nتعرف حرف ع و غ وتسميته ورسمه.",
    activite1: { type: "نشاط اعتيادي", title: "طقس تسجيل الحضور + نشيد أمي وأبي", duree: "20 د" },
    activite2: { type: "أنشطة الاستماع والتحدث وإغناء المعجم", title: "قسمة عادلة", duree: "40 د" },
    activite3: { type: "أنشطة ما قبل القراءة وأنشطة التخطيط والتلوين", title: "الحرف ع و غ", duree: "50 د" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة تيك تاك تو", duree: "20 د" },
  },
  {
    id: "ar-s16",
    semaine: 3,
    jour: 16,
    seance: 16,
    title: "الحصة 16 : الحرف ف ومعجم الأسرة ولعبة العنكبوت",
    objectifs: "تعرف معجم بسيط مرتبط بالأسرة.\nتعرف حرف ف وتسميته ورسمه.",
    activite1: { type: "نشاط اعتيادي", title: "طقس تسجيل الحضور + نشيد أمي وأبي", duree: "20 د" },
    activite2: { type: "أنشطة الاستماع والتحدث وإغناء المعجم", title: "قسمة عادلة", duree: "40 د" },
    activite3: { type: "أنشطة ما قبل القراءة وأنشطة التخطيط والتلوين", title: "الحرف ف", duree: "50 د" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة العنكبوت", duree: "20 د" },
  },
  {
    id: "ar-s17",
    semaine: 3,
    jour: 17,
    seance: 17,
    title: "الحصة 17 : الحرف ق ومعجم الأسرة ونشيد سائق القطار",
    objectifs: "تعرف معجم بسيط مرتبط بالأسرة.\nتعرف حرف ق وتسميته ورسمه.",
    activite1: { type: "نشاط اعتيادي", title: "طقس تسجيل الحضور + نشيد يا سائق القطار", duree: "20 د" },
    activite2: { type: "أنشطة الاستماع والتحدث وإغناء المعجم", title: "قسمة عادلة", duree: "40 د" },
    activite3: { type: "أنشطة ما قبل القراءة وأنشطة التخطيط والتلوين", title: "الحرف ق", duree: "50 د" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة البطاقات المقلوبة", duree: "20 د" },
  },
  {
    id: "ar-s18",
    semaine: 3,
    jour: 18,
    seance: 18,
    title: "الحصة 18 : مراجعة حروف الأسبوع 3 (ض، ط، ظ، ع، غ، ف، ق) وتمثيل حكاية",
    objectifs: "توظيف معجم بسيط للتحدث عن أفراد العائلة.\nمراجعة الحروف المقدمة وتثبيتها.\nالتحقق من مدى التحكم في الحروف المقدمة.",
    activite1: { type: "نشاط اعتيادي", title: "طقس تسجيل الحضور + نشيد يا سائق القطار", duree: "20 د" },
    activite2: { type: "أنشطة الاستماع والتحدث وإغناء المعجم", title: "قسمة عادلة", duree: "40 د" },
    activite3: { type: "أنشطة ما قبل القراءة وأنشطة التخطيط والتلوين", title: "مراجعة الحروف ض ط ظ ع غ ف ق", duree: "50 د" },
    activite4: { type: "نشاط اعتيادي", title: "لعب الأدوار: قصة حلوى في الغابة", duree: "20 د" },
  },
  {
    id: "ar-s19",
    semaine: 4,
    jour: 19,
    seance: 19,
    title: "الحصة 19 : الحرف ك ومعجم المزرعة (حكاية الثعلب والغراب)",
    objectifs: "تعرف معجم بسيط مرتبط بالمزرعة.\nتعرف حرف ك وتسميته ورسمه.",
    activite1: { type: "نشاط اعتيادي", title: "طقس تسجيل الحضور + نشيد مزرعة الحيوانات", duree: "20 د" },
    activite2: { type: "أنشطة الاستماع والتحدث وإغناء المعجم", title: "الثعلب والغراب", duree: "40 د" },
    activite3: { type: "أنشطة ما قبل القراءة وأنشطة التخطيط والتلوين", title: "الحرف ك", duree: "50 د" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة سلة الحروف", duree: "20 د" },
  },
  {
    id: "ar-s20",
    semaine: 4,
    jour: 20,
    seance: 20,
    title: "الحصة 20 : الحرف ل ومعجم المزرعة",
    objectifs: "تعرف معجم بسيط مرتبط بالمزرعة.\nتعرف حرف ل وتسميته ورسمه.",
    activite1: { type: "نشاط اعتيادي", title: "طقس تسجيل الحضور + نشيد مزرعة الحيوانات", duree: "20 د" },
    activite2: { type: "أنشطة الاستماع والتحدث وإغناء المعجم", title: "الثعلب والغراب", duree: "40 د" },
    activite3: { type: "أنشطة ما قبل القراءة وأنشطة التخطيط والتلوين", title: "الحرف ل", duree: "50 د" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة القفز على الحرف", duree: "20 د" },
  },
  {
    id: "ar-s21",
    semaine: 4,
    jour: 21,
    seance: 21,
    title: "الحصة 21 : الحرفان م و ن ومعجم المزرعة",
    objectifs: "تعرف معجم بسيط مرتبط بالمزرعة.\nتعرف حرف م و ن وتسميته ورسمه.",
    activite1: { type: "نشاط اعتيادي", title: "طقس تسجيل الحضور + نشيد مزرعة الحيوانات", duree: "20 د" },
    activite2: { type: "أنشطة الاستماع والتحدث وإغناء المعجم", title: "الثعلب والغراب", duree: "40 د" },
    activite3: { type: "أنشطة ما قبل القراءة وأنشطة التخطيط والتلوين", title: "الحرف م و ن", duree: "50 د" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة سلة الحروف", duree: "20 د" },
  },
  {
    id: "ar-s22",
    semaine: 4,
    jour: 22,
    seance: 22,
    title: "الحصة 22 : الحرف هـ ومعجم المزرعة",
    objectifs: "تعرف معجم بسيط مرتبط بالمزرعة.\nتعرف حرف هـ وتسميته ورسمه.",
    activite1: { type: "نشاط اعتيادي", title: "طقس تسجيل الحضور + نشيد مزرعة الحيوانات", duree: "20 د" },
    activite2: { type: "أنشطة الاستماع والتحدث وإغناء المعجم", title: "الثعلب والغراب", duree: "40 د" },
    activite3: { type: "أنشطة ما قبل القراءة وأنشطة التخطيط والتلوين", title: "الحرف هـ", duree: "50 د" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة حجلة الحروف", duree: "20 د" },
  },
  {
    id: "ar-s23",
    semaine: 4,
    jour: 23,
    seance: 23,
    title: "الحصة 23 : الحرفان و و ي ومعجم المزرعة",
    objectifs: "تعرف معجم بسيط مرتبط بالمزرعة.\nتعرف حرف و و ي وتسميته ورسمه.",
    activite1: { type: "نشاط اعتيادي", title: "طقس تسجيل الحضور + نشيد مزرعة الحيوانات", duree: "20 د" },
    activite2: { type: "أنشطة الاستماع والتحدث وإغناء المعجم", title: "الثعلب والغراب", duree: "40 د" },
    activite3: { type: "أنشطة ما قبل القراءة وأنشطة التخطيط والتلوين", title: "الحرف و و ي", duree: "50 د" },
    activite4: { type: "نشاط اعتيادي", title: "لعبة سلة الحروف", duree: "20 د" },
  },
  {
    id: "ar-s24",
    semaine: 4,
    jour: 24,
    seance: 24,
    title: "الحصة 24 : مراجعة حروف الأسبوع 4 (ك، ل، م، ن، هـ، و، ي) وتشخيص حكاية",
    objectifs: "توظيف معجم بسيط للتحدث عن المزرعة.\nمراجعة الحروف المقدمة وتثبيتها.\nالتحقق من مدى التحكم في الحروف المقدمة.",
    activite1: { type: "نشاط اعتيادي", title: "طقس تسجيل الحضور + نشيد مزرعة الحيوانات", duree: "20 د" },
    activite2: { type: "أنشطة الاستماع والتحدث وإغناء المعجم", title: "الثعلب والغراب", duree: "40 د" },
    activite3: { type: "أنشطة ما قبل القراءة وأنشطة التخطيط والتلوين", title: "مراجعة الحروف ك ل م ن هـ و ي", duree: "50 د" },
    activite4: { type: "نشاط اعتيادي", title: "لعب الأدوار تشخيص الحكاية", duree: "20 د" },
  },
];

// 4. خطاطات طارل TaRL اللغة العربية - المسارات واللبنات (إعداد أ. خالد شنيور)
export const ARABIC_TARL_MINDMAPS: ArabicTarlMindMapSession[] = [
  {
    id: "tarl-ar-m3-story-s1",
    author: "أ. خالد شنيور",
    subject: "اللغة العربية",
    pathNumber: "3",
    level: "السادس",
    blockName: "أقصوصة",
    week: "الاول",
    sessionNumber: "الاولى",
    duration: "70 د",
    title: "خطاطة 1 مسار 3 لبنة أقصوصة م 6 (نص حذاء الطنبوري)",
    tools: "الحاسوب، المسلاط، الألواح، الكراسات، الدفاتر، السبورة",
    objectifsTitle: "الأهداف: على الأقل 80% من المتعلمين سيكونون قادرين على:",
    objectives: [
      "تَوَقُّعِ مَضْمُونِ ٱلنَّصِّ ٱنْطِلَاقًا مِنْ عُنْوَانِهِ؛",
      "قِرَاءَةِ نَصِّ «حِذَاءِ ٱلطُّنْبُورِيِّ» بِدِقَّةٍ وَطَلَاقَةٍ؛",
      "اَلْإِجَابَةِ عَنْ أَسْئِلَةِ فَهْمِ وَاسْتِثْمَارِ لُغَةِ ٱلنَّصِّ",
    ],
    centerPathLabel: "المسار: الثالث",
    centerBlockLabel: "لبنة: أقصوصة",
    sections: {
      opening: {
        title: "افتتاح الحصة",
        items: [
          "✓ الترحيب بالمتعلمين",
          "✓ ميثاق العمل: السلوكات المنتظرة",
        ],
      },
      routineActivity: {
        title: "1- نشاط اعتيادي (10د) : قراءة شعرية معبرة",
        items: [
          "- يقرأ البيتين الشعريين قراءة معبرة",
          "- في ثنائيات، يقرأ كل واحد منكم البيتين لزميله قراءة معبرة، ثم نتبادل الدور",
          "- يقرأ الجميع البيتين قراءة معبرة.",
          "- دعوة المتعلمين للبحث عن مصدر البيتين في المنزل",
        ],
      },
      readingActivity: {
        title: "2- أنشطة قرائية",
        items: [
          "- توقع مضمون النص: ملاحظة الصورة وتوقع مضمون النص وتسجيل التوقعات على السبورة",
          "- قراءة النص والتفاعل معه : قراءة نموذجية / قراءات فردية",
          "- فهم معجم النص وأفكاره: تحديد معاني بعض الكلمات والإجابة عن الأسئلة",
        ],
      },
      writingActivity: {
        title: "3- أنشطة كتابية",
        items: [
          "- عمل فردي على الكراسة",
          "- على بطاقة الأنشطة، الإجابة عن أسئلة الفهم داخل الإطار المخصص مع تعليل الإجابات عند التصحيح",
          "- يتم عرض عمل المجموعات، مع التصحيح والتركيز على المتعثرين.",
          "- المجموعة الفائزة من حددت أكبر عدد من الإجابات الصحيحة",
        ],
      },
      closing: {
        title: "اختتام الحصة",
        items: [
          "- لُعْبَةُ ٱلْكُرْسِيِّ ٱلسَّاخِنِ: تختار كل مجموعة ممثلا عنها، يجلس على الكرسي وظهره إلى السبورة، ويحاول تخمين الكلمة التي تظهر على الشاشة من خلال تلميحات زملائه (تمثيل بدون نطق الكلمة) خلال 45 ثانية",
          "- الواجب المنزلي",
          "- تسجيل نسبة التحكم في المذكرة اليومية",
          "- يسجل النسبة المئوية التي يقدرها لتحقق أهداف الحصة.",
        ],
      },
    },
  },
  {
    id: "tarl-ar-m3-story-s2",
    author: "أ. خالد شنيور",
    subject: "اللغة العربية",
    pathNumber: "3",
    level: "السادس",
    blockName: "أقصوصة",
    week: "الاول",
    sessionNumber: "الثانية",
    duration: "70 د",
    title: "خطاطة 2 مسار 3 لبنة أقصوصة م 6 (استثمار وتلخيص)",
    tools: "الحاسوب، المسلاط، الألواح، الكراسات، شبكات التقييم الذاتي",
    objectifsTitle: "الأهداف: على الأقل 80% من المتعلمين سيكونون قادرين على:",
    objectives: [
      "قراءة نص الأقصوصة قراءة معبرة مراعية للتنغيم وعلامات الترقيم؛",
      "إعادة سرد وتلخيص أحداث الأقصوصة شفهياً بأسلوب سليم؛",
      "إنتاج فقرة قصيرة تلخص المغزى أو العبرة من الأقصوصة واستثمار معجمها.",
    ],
    centerPathLabel: "المسار: الثالث",
    centerBlockLabel: "لبنة: أقصوصة",
    sections: {
      opening: {
        title: "افتتاح الحصة",
        items: [
          "✓ الترحيب بالمتعلمين والتحفيز الأولي",
          "✓ تذكير بميثاق القسم وقواعد العمل بالمجموعات",
        ],
      },
      routineActivity: {
        title: "1- نشاط اعتيادي (10د) : إلقاء شعري فردي وجماعي",
        items: [
          "- ترديد جماعي للأبيات الشعرية مع التعبير الحركي والتنغيم",
          "- منافسة ثنائية في القراءة السريعة والدقيقة",
          "- تعزيز المتعثرين وتصحيح مخارج الحروف",
        ],
      },
      readingActivity: {
        title: "2- أنشطة قرائية واستثمار",
        items: [
          "- القراءة الصامتة الموجهة مع استخراج الفكرة العامة",
          "- قراءات فردية متقاطعة (تناوب الأدوار والشخصيات)",
          "- استثمار البنية السردية: البداية، التحول، العقدة، والحل",
        ],
      },
      writingActivity: {
        title: "3- أنشطة كتابية وتلخيص",
        items: [
          "- إعادة ترتيب أحداث القصة المشوشة على الكراسة",
          "- كتابة ملخص مكثف في 3 إلى 4 أسطر داخل الإطار المخصص",
          "- التقييم التبادلي بين المجموعات وتصحيح الأخطاء الإملائية",
        ],
      },
      closing: {
        title: "اختتام الحصة",
        items: [
          "- لعبة تمثيل الأدوار السريعة (لعب شخصية الطنبوري)",
          "- تسجيل وتدوين نسب الإنجاز والتحكم الفردي",
          "- تكليف منزلي: قراءة قصة قصيرة واقتراح عنوان بديل لها",
        ],
      },
    },
  },
  {
    id: "tarl-ar-m3-para-s1",
    author: "أ. خالد شنيور",
    subject: "اللغة العربية",
    pathNumber: "3",
    level: "الخامس والسادس",
    blockName: "فقرة",
    week: "الاول",
    sessionNumber: "الاولى",
    duration: "70 د",
    title: "خطاطة 1 مسار 3 لبنة فقرة م 5 و 6 (الطلاقة والفهم الصريح)",
    tools: "المسلاط، كراسة الدعم، بطاقات المفردات، مسطرة القراءة",
    objectifsTitle: "الأهداف: على الأقل 80% من المتعلمين سيكونون قادرين على:",
    objectives: [
      "قراءة فقرة تتكون من 40 إلى 50 كلمة بدقة وطلاقة (60 كلمة/دقيقة)؛",
      "استخراج المعنى الصريح وتحديد الأفكار الفرعية للنص؛",
      "توظيف استراتيجيات المفردات (خريطة الكلمة، شبكة المفردات، وعائلة الكلمة).",
    ],
    centerPathLabel: "المسار: الثالث",
    centerBlockLabel: "لبنة: فقرة",
    sections: {
      opening: {
        title: "افتتاح الحصة",
        items: [
          "✓ الترحيب وتفعيل التعاقد الديداكتيكي",
          "✓ التحفيز الصوتي وإحماء الحبال الصوتية",
        ],
      },
      routineActivity: {
        title: "1- نشاط اعتيادي (10د) : سباق الكلمات البصرية",
        items: [
          "- قراءة سريعة لشبكة الكلمات الشائعة والبصرية",
          "- مسابقة القراءة الدقيقة مع المؤقت الرقمي",
          "- تشجيع التدرج في السرعة دون الإخلال بسلامة الحركات",
        ],
      },
      readingActivity: {
        title: "2- أنشطة قرائية وفهم",
        items: [
          "- القراءة الموجهة والمرافقة للفقرة المستهدفة",
          "- استخراج الكلمات الصعبة وبناء خريطة الكلمة جماعياً",
          "- طرح أسئلة الفهم المباشر واستخراج المعلومات الصريحة",
        ],
      },
      writingActivity: {
        title: "3- أنشطة كتابية وتطبيقية",
        items: [
          "- إكمال فقرة بالكلمات المناسبة على الكراسة",
          "- الإجابة عن أسئلة الفهم في بطاقة النشاط",
          "- تصحيح جماعي وثنائي مع تصويب الأخطاء الفورية",
        ],
      },
      closing: {
        title: "اختتام الحصة",
        items: [
          "- لعبة «من أنا؟» لتخمين المفردة المعجمية",
          "- تقييم مدى تحقق الهدف وتسجيل الملاحظات في المذكرة",
          "- تكليف منزلي: قراءة الفقرة أمام أحد أفراد الأسرة",
        ],
      },
    },
  },
  {
    id: "tarl-ar-m2-sentence-s1",
    author: "أ. خالد شنيور",
    subject: "اللغة العربية",
    pathNumber: "2",
    level: "الرابع والخامس والسادس",
    blockName: "جمل",
    week: "الاول",
    sessionNumber: "الاولى",
    duration: "70 د",
    title: "خطاطة 1 مسار 2 لبنة جمل م 4 و 5 و 6 (تركيب وقراءة الجمل)",
    tools: "البطاقات الملونة، الألواح، الكراسات، الجيوب الجدارية",
    objectifsTitle: "الأهداف: على الأقل 80% من المتعلمين سيكونون قادرين على:",
    objectives: [
      "قراءة جمل بسيطة ومركبة قراءة سليمة مسترسلة؛",
      "تركيب جمل مفيدة انطلاقاً من كلمات مبعثرة؛",
      "التمييز بين الجملة الفعلية والجملة الاسمية واستيعاب معناها.",
    ],
    centerPathLabel: "المسار: الثاني",
    centerBlockLabel: "لبنة: جمل",
    sections: {
      opening: {
        title: "افتتاح الحصة",
        items: [
          "✓ استقبال المتعلمين وتحفيزهم بالنشيد الترحيبي",
          "✓ ميثاق العمل الجماعي والتعاون بين الأقران",
        ],
      },
      routineActivity: {
        title: "1- نشاط اعتيادي (10د) : بناء الجمل بالبطاقات",
        items: [
          "- تركيب جملة اليوم باستخدام بطاقات الكلمات الملونة",
          "- قراءة جماعية متزامنة للجملة مع التصفيق الإيقاعي",
          "- تبديل عناصر الجملة لملاحظة تغير المعنى",
        ],
      },
      readingActivity: {
        title: "2- أنشطة قرائية",
        items: [
          "- قراءة الجمل المبرمجة فردياً وثنائياً",
          "- لعبة «اصطياد الجملة الصحيحة» من اللوحة",
          "- ربط الجمل بالصور الدالة عليها ومناقشة المعنى",
        ],
      },
      writingActivity: {
        title: "3- أنشطة كتابية",
        items: [
          "- نقل الجمل مع احترام مقاييس الحروف وعلامات الترقيم",
          "- ترتيب كلمات مشوشة لتكوين جمل تامة على الكراسة",
          "- عمل فردي مع دعم ومرافقة المتعثرين",
        ],
      },
      closing: {
        title: "اختتام الحصة",
        items: [
          "- لعبة الكلمة الضائعة في الجملة",
          "- رصد نسب التحكم في كفايات الجملة",
          "- نشاط ختامي تحفيزي وواجب منزلي خفيف",
        ],
      },
    },
  },
];

