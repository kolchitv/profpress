import { TabKey, GradeLevelId } from "../types";
import { EDUCATIONAL_LEVELS_DATA } from "../data/educationalLevelsData";

interface TabSeoConfig {
  title: string;
  description: string;
  keywords: string;
}

const DEFAULT_SEO: TabSeoConfig = {
  title: "بروف بريس – وثائق الأستاذ ودروس الأول ابتدائي 2026",
  description:
    "تصفح وحمّل مجاناً جذاذات ودروس وفروض المستوى الأول ابتدائي 1AEP، وثائق الأستاذ ومسار، ومباريات التعليم عبر منصة بروف بريس.",
  keywords:
    "بروف بريس, Profpress, المستوى الأول ابتدائي, 1AEP, جذاذات المستوى الأول, فروض المرحلة الأولى, التعليم الصريح, طارل, وثائق الأستاذ, مسار",
};

const TAB_SEO_OVERRIDES: Partial<Record<TabKey, TabSeoConfig>> = {
  home: DEFAULT_SEO,
  primary_1: {
    title: "المستوى الأول ابتدائي 1AEP – دروس وجذاذات وفروض | بروف بريس",
    description:
      "اكتشف وحمّل مجاناً جميع دروس المستوى الأول ابتدائي: الحروف العربية، الفرنسية 1AEP، الرياضيات 0-99، النشاط العلمي، التربية الإسلامية والفروض المصححة.",
    keywords:
      "المستوى الأول ابتدائي, 1AEP, جذاذات الأول ابتدائي, دروس اللغة العربية أولى ابتدائي, الحروف الهجائية, الفرنسية أولى ابتدائي, الرياضيات المستوى الأول, النشاط العلمي أولى ابتدائي, التربية الإسلامية المستوى الأول, فروض المرحلة 1 2 3 4, التعليم الصريح, طارل, بروف بريس",
  },
  explicit_teaching: {
    title: "دروس التعليم الصريح لمؤسسات الريادة 2026 | بروف بريس",
    description:
      "استكشف وحمّل بطاقات ومجزوءات التعليم الصريح لمؤسسات الريادة في العربية والفرنسية والرياضيات مع الخطاطات والشروحات الجاهزة.",
    keywords:
      "التعليم الصريح, مؤسسات الريادة, دروس الريادة, طارل, التعليم الابتدائي المغرب, بروف بريس",
  },
  competitions: {
    title: "مباريات التعليم 2026/2027 – التوصيفات والنماذج | بروف بريس",
    description:
      "حضّر لمباريات ولوج المراكز الجهوية CRMEF وأطر التدريس بالمغرب: التوصيفات الرسمية، مواضيع الامتحانات المصححة، والدروس البيداغوجية.",
    keywords:
      "مباراة التعليم, CRMEF, توصيفات مباراة التعليم 2026, نماذج امتحانات التعليم, علوم التربية, الديداكتيك",
  },
  movements_schools: {
    title: "الحركات الانتقالية ودليل المؤسسات بالمغرب | بروف بريس",
    description:
      "تصفح دليل المؤسسات التعليمية، رموز GRESA، خريطة المعطيات، ومستجدات الحركات الانتقالية لنساء ورجال التعليم بالمغرب.",
    keywords:
      "الحركة الانتقالية, دليل المؤسسات التعليمية المغرب, GRESA, الأكاديميات الجهوية, بروف بريس",
  },
  mindmaps: {
    title: "الخطاطات الذهنية التربوية وعلوم التربية | بروف بريس",
    description:
      "تصفح وحمّل الخطاطات الذهنية لعلوم التربية، المقاربات البيداغوجية، مستجدات المنهاج، وطارل الفرنسية بجودة عالية.",
    keywords:
      "الخطاطات الذهنية, علوم التربية, المقاربة بالكفايات, البيداغوجيات, طارل الفرنسية",
  },
  eduraeda_generator: {
    title: "مولد الجذاذات والخطاطات الذكي (EduRaeda) | بروف بريس",
    description:
      "أداة مدمجة داخل بروف بريس لتحويل الدروس والوثائق التعليمية إلى جذاذات تربوية وخطاطات ذهنية احترافية جاهزة للتعديل والطباعة.",
    keywords:
      "مولد الجذاذات, مولد الخطاطات الذهنية, EduRaeda, جذاذات تربوية, خطاطات بصرية, التعليم الصريح, بروف بريس",
  },
  covers: {
    title: "منشئ واجهات الملفات التربوية بالعربية والفرنسية | بروف بريس",
    description:
      "صمّم وحمّل مجاناً واجهات احترافية للملف التراكمي، دفتر النصوص، الجذاذات، والمراقبة المستمرة بالعربية والفرنسية بصيغة PDF وPNG جاهزة للطباعة A4.",
    keywords:
      "منشئ واجهات الملفات, غلاف الملف التراكمي, page de garde dossier cumulatif, واجهات ملفات الأستاذ, مدارس الريادة, طباعة A4",
  },
};

function upsertMetaTag(
  selector: string,
  attrName: "name" | "property",
  attrValue: string,
  content: string
) {
  if (typeof document === "undefined") return;
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(url: string) {
  if (typeof document === "undefined") return;
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

function injectDynamicJsonLd(tab: TabKey, canonicalUrl: string, seo: TabSeoConfig) {
  if (typeof document === "undefined") return;
  const scriptId = "dynamic-seo-jsonld";
  let script = document.getElementById(scriptId) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = scriptId;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: seo.title,
      description: seo.description,
      inLanguage: "ar-MA",
      isPartOf: { "@id": "https://www.profpress.net/#website" },
    },
  ];

  const isGradeLevel = tab in EDUCATIONAL_LEVELS_DATA;
  if (isGradeLevel) {
    const levelInfo = EDUCATIONAL_LEVELS_DATA[tab as GradeLevelId];
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "الرئيسية",
          item: `${window.location.origin}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: levelInfo.cycleTitle,
          item: `${window.location.origin}/?tab=${levelInfo.cycle === "primary" ? "primaire" : tab}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: levelInfo.title,
          item: canonicalUrl,
        },
      ],
    });

    graph.push({
      "@type": "Course",
      name: `${levelInfo.title} – دروس وجذاذات وفروض ${levelInfo.academicYear}`,
      description: seo.description,
      inLanguage: "ar",
      educationalLevel: levelInfo.title,
      provider: {
        "@type": "EducationalOrganization",
        name: "بروف بريس Profpress",
        url: "https://www.profpress.net/",
      },
      about: levelInfo.subjects,
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "online",
        courseWorkload: levelInfo.academicYear,
      },
    });

    if (levelInfo.seoFaqs && levelInfo.seoFaqs.length > 0) {
      graph.push({
        "@type": "FAQPage",
        mainEntity: levelInfo.seoFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      });
    }
  }

  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  });
}

export function updateSeoForTab(tab: TabKey): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  let seo = TAB_SEO_OVERRIDES[tab];
  if (!seo && tab in EDUCATIONAL_LEVELS_DATA) {
    const lvl = EDUCATIONAL_LEVELS_DATA[tab as GradeLevelId];
    seo = {
      title: `${lvl.title} – دروس وجذاذات وفروض ${lvl.academicYear} | بروف بريس`,
      description: `تصفح وحمّل دروس وجذاذات وفروض ${lvl.title} في ${lvl.subjects.slice(0, 4).join("، ")} للموسم ${lvl.academicYear} على منصة بروف بريس.`,
      keywords: [
        lvl.title,
        lvl.shortTitle,
        ...lvl.subjects,
        "دروس",
        "جذاذات",
        "فروض المراقبة المستمرة",
        "بروف بريس",
      ].join(", "),
    };
  }
  if (!seo) {
    seo = DEFAULT_SEO;
  }

  const canonicalUrl =
    tab === "home"
      ? `${window.location.origin}${window.location.pathname}`
      : `${window.location.origin}${window.location.pathname}?tab=${tab}`;

  document.title = seo.title;
  upsertMetaTag('meta[name="description"]', "name", "description", seo.description);
  upsertMetaTag('meta[name="keywords"]', "name", "keywords", seo.keywords);
  upsertMetaTag('meta[property="og:title"]', "property", "og:title", seo.title);
  upsertMetaTag('meta[property="og:description"]', "property", "og:description", seo.description);
  upsertMetaTag('meta[property="og:url"]', "property", "og:url", canonicalUrl);
  upsertMetaTag('meta[name="twitter:title"]', "name", "twitter:title", seo.title);
  upsertMetaTag('meta[name="twitter:description"]', "name", "twitter:description", seo.description);
  upsertCanonical(canonicalUrl);
  injectDynamicJsonLd(tab, canonicalUrl, seo);
}
