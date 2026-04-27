/**
 * Central config for all SEO guide / comparison pages.
 *
 * STRUCTURE:
 *   /guides (EN) + /nl/guides (NL)  ← top-level hub showing categories
 *     /compare        ← competitor alternatives
 *     /compliance     ← GDPR, AVG and compliance guides
 *     /industries     ← vertical / sector-specific guides
 *
 * TO ADD A NEW PAGE:
 *  1. Build the .astro files (EN + NL)
 *  2. Add one GuideEntry here — set status: "live"
 *  3. Add the NL slug to NL_AVAILABLE in use-lang.ts AND BaseHead.astro
 *  4. If EN and NL slugs differ, add to EN_TO_NL_SLUG in both files too
 *
 * TO PROMOTE A COMING-SOON VERTICAL:
 *  - Change status: "coming-soon" → "live" and fill in description + cta
 *  - Do steps 1–4 above
 */

export type GuideStatus = "live" | "coming-soon";
export type GuideCategoryId = "alternative" | "compliance" | "vertical";

export interface GuideEntry {
  category: GuideCategoryId;
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

/** Top-level category definitions — drives the /guides hub page. */
export interface CategoryDef {
  id: GuideCategoryId;
  en: {
    label: string;
    slug: string;
    description: string;
    badge: string;
  };
  nl: {
    label: string;
    slug: string;
    description: string;
    badge: string;
  };
}

export const categories: CategoryDef[] = [
  {
    id: "alternative",
    en: {
      label: "Compare",
      slug: "/compare",
      badge: "Comparisons",
      description:
        "Side-by-side breakdowns with Apollo, Cognism, Lusha and other tools European sales teams use most. Where each tool wins, where it doesn't.",
    },
    nl: {
      label: "Vergelijken",
      slug: "/nl/vergelijken",
      badge: "Vergelijkingen",
      description:
        "Eerlijke vergelijkingen met Apollo, Cognism, Lusha en andere tools die Europese salesteams het meest gebruiken. Waar elk tool wint en waar niet.",
    },
  },
  {
    id: "compliance",
    en: {
      label: "Compliance",
      slug: "/compliance",
      badge: "Compliance",
      description:
        "GDPR, AVG and data privacy guides for B2B outreach. What the rules actually require, where most tools fall short, and how to stay clean.",
    },
    nl: {
      label: "Compliance",
      slug: "/nl/compliance",
      badge: "Compliance",
      description:
        "AVG, GDPR en privacygidsen voor B2B-outreach. Wat de regels echt vereisen, waar de meeste tools tekortschroeten, en hoe je het goed doet.",
    },
  },
  {
    id: "vertical",
    en: {
      label: "Industries",
      slug: "/industries",
      badge: "Industries",
      description:
        "Prospecting guides built around how specific sectors buy. SaaS, logistics, agencies, fintech, industrial — each has its own buying motion.",
    },
    nl: {
      label: "Branches",
      slug: "/nl/industries",
      badge: "Branches",
      description:
        "Prospectinggidsen afgestemd op hoe specifieke sectoren inkopen. SaaS, logistiek, bureaus, fintech, industrie — elk met een eigen aankoopproces.",
    },
  },
];

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
    en: { label: "For B2B SaaS teams", slug: "/saas-prospecting", description: "", cta: "" },
    nl: { label: "Voor B2B SaaS-teams", slug: "/nl/saas-prospecting", description: "", cta: "" },
  },
  {
    category: "vertical",
    status: "coming-soon",
    en: { label: "For logistics and freight", slug: "/logistics-prospecting", description: "", cta: "" },
    nl: { label: "Voor logistiek en transport", slug: "/nl/logistiek-prospecting", description: "", cta: "" },
  },
  {
    category: "vertical",
    status: "coming-soon",
    en: { label: "For agencies", slug: "/agency-prospecting", description: "", cta: "" },
    nl: { label: "Voor bureaus en agencies", slug: "/nl/bureau-prospecting", description: "", cta: "" },
  },
  {
    category: "vertical",
    status: "coming-soon",
    en: { label: "For fintech and financial services", slug: "/fintech-prospecting", description: "", cta: "" },
    nl: { label: "Voor fintech en financiële diensten", slug: "/nl/fintech-prospecting", description: "", cta: "" },
  },
  {
    category: "vertical",
    status: "coming-soon",
    en: { label: "For industrial and manufacturing", slug: "/industrial-prospecting", description: "", cta: "" },
    nl: { label: "Voor industrie en productie", slug: "/nl/industrie-prospecting", description: "", cta: "" },
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────

export const liveGuides = guides.filter((g) => g.status === "live");
export const comingSoonGuides = guides.filter((g) => g.status === "coming-soon");

export const byCategory = (cat: GuideCategoryId) =>
  guides.filter((g) => g.category === cat);

export const livByCategory = (cat: GuideCategoryId) =>
  liveGuides.filter((g) => g.category === cat);

export const comingSoonByCategory = (cat: GuideCategoryId) =>
  comingSoonGuides.filter((g) => g.category === cat);
