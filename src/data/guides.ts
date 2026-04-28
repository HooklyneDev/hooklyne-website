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

  // ── Verticals ────────────────────────────────────────────────────────────
  {
    category: "vertical",
    status: "live",
    en: {
      label: "For B2B SaaS teams",
      slug: "/saas-prospecting",
      description: "SaaS companies buy in windows. Funding rounds, RevOps hires, headcount inflections - each one opens a brief period where the right message lands. This guide covers the signals and how to reach them first.",
      cta: "Read the guide",
    },
    nl: {
      label: "Voor B2B SaaS-teams",
      slug: "/nl/saas-prospecting",
      description: "SaaS-bedrijven kopen in vensters. Financieringsrondes, RevOps-hires, groeimijlpalen - elk opent een korte periode waarin het juiste bericht aankomt. Deze gids behandelt de signalen en hoe je er als eerste bij bent.",
      cta: "Lees de gids",
    },
  },
  {
    category: "vertical",
    status: "live",
    en: {
      label: "For logistics and freight",
      slug: "/logistics-prospecting",
      description: "Operations directors and procurement managers in logistics don't live on LinkedIn. Their signals are in trade press, company registries, and planning databases. This guide covers where those signals are and how to reach the right person first.",
      cta: "Read the guide",
    },
    nl: {
      label: "Voor logistiek en transport",
      slug: "/nl/logistiek-prospecting",
      description: "Operationeel directeuren en inkoopmanagers in logistiek brengen geen tijd door op LinkedIn. Hun signalen zitten in vakpublicaties, KVK-registers en planningsdatabases. Deze gids laat zien waar die signalen zijn.",
      cta: "Lees de gids",
    },
  },
  {
    category: "vertical",
    status: "live",
    en: {
      label: "For agencies and consultancies",
      slug: "/agency-prospecting",
      description: "Agency owners delete cold email faster than almost anyone - not because they don't buy, but because generic outreach is easy to spot. This guide covers the signals that create a real opening and why timing is the only variable that matters.",
      cta: "Read the guide",
    },
    nl: {
      label: "Voor bureaus en agencies",
      slug: "/nl/bureau-prospecting",
      description: "Bureaueigenaren verwijderen koude mails sneller dan bijna iedereen. Niet omdat ze niet kopen - maar omdat generieke outreach makkelijk te spotten is. Deze gids behandelt de signalen die een echte opening creëren.",
      cta: "Lees de gids",
    },
  },
  {
    category: "vertical",
    status: "live",
    en: {
      label: "For fintech and financial services",
      slug: "/fintech-prospecting",
      description: "Regulated buyers read cold outreach critically. The wrong message isn't just ignored - it creates a negative impression. This guide covers the signals that open a real window and why data provenance matters more here than anywhere else.",
      cta: "Read the guide",
    },
    nl: {
      label: "Voor fintech en financiële diensten",
      slug: "/nl/fintech-prospecting",
      description: "Gereguleerde kopers lezen koude mail kritisch. Een verkeerd bericht wordt niet alleen genegeerd - het laat een negatieve indruk achter. Deze gids behandelt de signalen die een echt venster openen.",
      cta: "Lees de gids",
    },
  },
  {
    category: "vertical",
    status: "live",
    en: {
      label: "For industrial and manufacturing",
      slug: "/industrial-prospecting",
      description: "Plant managers and procurement directors in manufacturing don't maintain public profiles. Their buying signals live in company registries, certification databases, and planning filings. This guide covers where those signals are.",
      cta: "Read the guide",
    },
    nl: {
      label: "Voor industrie en productie",
      slug: "/nl/industrie-prospecting",
      description: "Productiemanagers en inkoophoofden onderhouden geen publieke profielen. Hun koopsignalen zitten in KVK-registers, certificeringsdatabases en planningsvergunningen. Deze gids behandelt waar die signalen zijn.",
      cta: "Lees de gids",
    },
  },
  {
    category: "vertical",
    status: "live",
    en: {
      label: "For energy and cleantech",
      slug: "/energy-prospecting",
      description: "Energy buyers move on regulation cycles, not sales cycles. RED III deadlines, ETS compliance windows, and grid connection approvals create narrow moments where new vendors get a hearing. This guide covers where those signals surface first.",
      cta: "Read the guide",
    },
    nl: {
      label: "Voor energie en cleantech",
      slug: "/nl/energie-prospecting",
      description: "Energiebedrijven kopen op regelgevingscycli, niet op verkoopcycli. RED III-deadlines, ETS-compliancevensters en netaansluitingsgoedkeuringen creëren korte momenten waarop nieuwe leveranciers gehoor krijgen. Deze gids laat zien waar die signalen als eerste opduiken.",
      cta: "Lees de gids",
    },
  },
  {
    category: "vertical",
    status: "live",
    en: {
      label: "For construction and real estate",
      slug: "/construction-prospecting",
      description: "Construction projects are public before they are private. Planning applications, tender publications, and building permit filings create a lead time of months before any budget conversation happens. This guide covers how to use that window.",
      cta: "Read the guide",
    },
    nl: {
      label: "Voor bouw en vastgoed",
      slug: "/nl/bouw-prospecting",
      description: "Bouwprojecten zijn publiek voordat ze privé zijn. Omgevingsvergunningen, TenderNed-publicaties en bestemmingsplanwijzigingen creëren een voorsprong van maanden voordat een budgetgesprek plaatsvindt. Deze gids laat zien hoe je dat venster benut.",
      cta: "Lees de gids",
    },
  },
  {
    category: "vertical",
    status: "live",
    en: {
      label: "For agritech and food production",
      slug: "/agritech-prospecting",
      description: "Agricultural buyers work to seasonal and subsidy cycles that most sales teams ignore. CAP reform deadlines, cooperative investment rounds, and GlobalG.A.P. recertification windows open predictable buying moments. This guide covers where those signals are.",
      cta: "Read the guide",
    },
    nl: {
      label: "Voor agritech en voedselproductie",
      slug: "/nl/agritech-prospecting",
      description: "Agrarische kopers werken op seizoens- en subsidiescycli die de meeste salesteams negeren. GLB-hervormingsdeadlines, coöperatieve investeringsrondes en GlobalG.A.P.-hercertificeringsvensters creëren voorspelbare koopmomenten. Deze gids laat zien waar die signalen zijn.",
      cta: "Lees de gids",
    },
  },
  {
    category: "vertical",
    status: "live",
    en: {
      label: "For healthcare and life sciences",
      slug: "/healthcare-prospecting",
      description: "Healthcare procurement is slow by design - until it isn't. Accreditation cycles, EHR migrations, and facility expansions create defined windows where new vendor conversations are not just tolerated but actively sought. This guide covers the signals that mark those moments.",
      cta: "Read the guide",
    },
    nl: {
      label: "Voor zorg en life sciences",
      slug: "/nl/healthcare-prospecting",
      description: "Zorginkopers zijn traag van opzet - totdat ze dat niet meer zijn. Accreditatiecycli, EPD-migraties en uitbreidingen van zorglocaties creëren duidelijke vensters waarin gesprekken met nieuwe leveranciers niet alleen worden getolereerd maar actief worden gezocht. Deze gids laat zien welke signalen die momenten markeren.",
      cta: "Lees de gids",
    },
  },
  {
    category: "vertical",
    status: "live",
    en: {
      label: "For food and beverage",
      slug: "/food-prospecting",
      description: "Food manufacturers buy when audits, retailer requirements, or new product launches force the issue. FSSC 22000 recertifications, private-label tenders, and EUDR compliance deadlines all create timed moments where procurement conversations open. This guide covers how to find them.",
      cta: "Read the guide",
    },
    nl: {
      label: "Voor food en dranken",
      slug: "/nl/food-prospecting",
      description: "Voedingsmiddelenproducenten kopen wanneer audits, retailervereisten of nieuwe productlanceringen de kwestie forceren. FSSC 22000-hercertificeringen, private-label-aanbestedingen en EUDR-compliancedeadlines creëren getimede momenten waarop inkoopgesprekken opengaan. Deze gids laat zien hoe je die vindt.",
      cta: "Lees de gids",
    },
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
