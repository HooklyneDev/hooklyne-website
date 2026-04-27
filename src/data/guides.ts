/**
 * Central config for all SEO guide / comparison pages.
 *
 * To add a new page:
 *  1. Build the .astro page (EN + NL)
 *  2. Add one entry here — set status to "live"
 *  3. Update NL_AVAILABLE in use-lang.ts and BaseHead.astro with the NL slug
 *  4. If the EN and NL slugs differ, add them to EN_TO_NL_SLUG in both files
 *
 * The hub page (/compare and /nl/vergelijken) reads from this file automatically.
 */

export type GuideStatus = "live" | "coming-soon";
export type GuideCategory = "alternative" | "compliance" | "vertical";

export interface GuideEntry {
  category: GuideCategory;
  status: GuideStatus;
  en: {
    label: string;
    slug: string;
    description: string;
    cta: string;
  };
  nl: {
    label: string;
    slug: string;
    description: string;
    cta: string;
  };
}

export const guides: GuideEntry[] = [
  // ── Competitor alternatives ─────────────────────────────────────────────
  {
    category: "alternative",
    status: "live",
    en: {
      label: "Apollo alternative",
      slug: "/apollo-alternative",
      description:
        "Apollo is a sending engine on top of a US-first database. Hooklyne is the research layer underneath — verified contacts, scored signals, a drafted message. See where each tool wins.",
      cta: "Read comparison",
    },
    nl: {
      label: "Apollo-alternatief",
      slug: "/nl/apollo-alternatief",
      description:
        "Apollo is een verzendmotor bovenop een Amerikaans-georiënteerde database. Hooklyne is de onderzoekslaag eronder — geverifieerde contacten, gescoorde signalen, een opgesteld bericht. Zie waar elk tool wint.",
      cta: "Lees de vergelijking",
    },
  },
  {
    category: "alternative",
    status: "live",
    en: {
      label: "Cognism alternative",
      slug: "/cognism-alternative",
      description:
        "Cognism leads on phone-verified mobile numbers. Hooklyne leads on signal depth and European research workflow. See the trade-offs.",
      cta: "Read comparison",
    },
    nl: {
      label: "Cognism-alternatief",
      slug: "/nl/cognism-alternatief",
      description:
        "Cognism heeft de sterkste telefonisch geverifieerde database. Hooklyne heeft de sterkste signaaldiepte en een onderzoeksworkflow voor Europese SMEs. Zie de afweging.",
      cta: "Lees de vergelijking",
    },
  },
  {
    category: "alternative",
    status: "live",
    en: {
      label: "Lusha alternative",
      slug: "/lusha-alternative",
      description:
        "Lusha surfaces contacts fast. Hooklyne surfaces contacts with a why-now buying signal and a drafted message ready to send in under a minute. See what the difference earns you.",
      cta: "Read comparison",
    },
    nl: {
      label: "Lusha-alternatief",
      slug: "/nl/lusha-alternatief",
      description:
        "Lusha brengt snel contacten naar boven. Hooklyne brengt contacten naar boven met een waarom-nu-signaal en een opgesteld bericht dat in minder dan een minuut klaarstaat. Zie wat het verschil oplevert.",
      cta: "Lees de vergelijking",
    },
  },

  // ── Compliance guides ────────────────────────────────────────────────────
  {
    category: "compliance",
    status: "live",
    en: {
      label: "GDPR-compliant prospecting",
      slug: "/gdpr-prospecting",
      description:
        "What GDPR actually requires for B2B outreach, where most tools fall short without knowing it, and how Hooklyne is built for it from the ground up.",
      cta: "Read the guide",
    },
    nl: {
      label: "AVG-compliant prospecting",
      slug: "/nl/avg-prospecting",
      description:
        "Wat de AVG echt vereist voor B2B-outreach, waar de meeste tools tekortschroeten zonder het te weten, en hoe Hooklyne er van de grond af voor is gebouwd.",
      cta: "Lees de gids",
    },
  },

  // ── Verticals (coming soon) ──────────────────────────────────────────────
  {
    category: "vertical",
    status: "coming-soon",
    en: {
      label: "For B2B SaaS teams",
      slug: "/saas-prospecting",
      description: "",
      cta: "",
    },
    nl: {
      label: "Voor B2B SaaS-teams",
      slug: "/nl/saas-prospecting",
      description: "",
      cta: "",
    },
  },
  {
    category: "vertical",
    status: "coming-soon",
    en: {
      label: "For logistics and freight",
      slug: "/logistics-prospecting",
      description: "",
      cta: "",
    },
    nl: {
      label: "Voor logistiek en transport",
      slug: "/nl/logistiek-prospecting",
      description: "",
      cta: "",
    },
  },
  {
    category: "vertical",
    status: "coming-soon",
    en: {
      label: "For agencies",
      slug: "/agency-prospecting",
      description: "",
      cta: "",
    },
    nl: {
      label: "Voor bureaus en agencies",
      slug: "/nl/bureau-prospecting",
      description: "",
      cta: "",
    },
  },
  {
    category: "vertical",
    status: "coming-soon",
    en: {
      label: "For fintech and financial services",
      slug: "/fintech-prospecting",
      description: "",
      cta: "",
    },
    nl: {
      label: "Voor fintech en financiële diensten",
      slug: "/nl/fintech-prospecting",
      description: "",
      cta: "",
    },
  },
  {
    category: "vertical",
    status: "coming-soon",
    en: {
      label: "For industrial and manufacturing",
      slug: "/industrial-prospecting",
      description: "",
      cta: "",
    },
    nl: {
      label: "Voor industrie en productie",
      slug: "/nl/industrie-prospecting",
      description: "",
      cta: "",
    },
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────

export const liveGuides = guides.filter((g) => g.status === "live");
export const comingSoonGuides = guides.filter((g) => g.status === "coming-soon");

export const byCategory = (cat: GuideCategory) =>
  liveGuides.filter((g) => g.category === cat);
