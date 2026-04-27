import { Check, Minus, X } from "lucide-react";

/**
 * HeadToHead — focused 2-column comparison for SEO landing pages
 * targeting "X alternative" intent. Renders fully on the server (no
 * client directive needed) so the table is in the HTML for crawlers
 * and AI overviews.
 */

type Verdict = "hooklyne" | "competitor" | "tie";

type Row = {
  dimension: string;
  competitor: string;
  hooklyne: string;
  verdict: Verdict;
  /** Optional fairness note shown muted below the row. */
  note?: string;
};

type Profile = {
  competitor: string;
  competitorSub: string;
  hooklyneSub: string;
  rows: Row[];
  /** A short paragraph that summarises when the competitor still wins,
   *  for fairness. Required - we never ship a HeadToHead without one. */
  whenCompetitorWins: string;
};

const APOLLO_EN: Profile = {
  competitor: "Apollo",
  competitorSub: "Sending engine, US-first database",
  hooklyneSub: "Research workflow, EU-first verification",
  rows: [
    {
      dimension: "Contact database size",
      competitor: "270M+ contacts (largest single source)",
      hooklyne: "Waterfall across 20+ providers",
      verdict: "competitor",
      note: "Apollo wins on raw row count. Hooklyne wins on per-row verification.",
    },
    {
      dimension: "European SME coverage",
      competitor: "US-shaped database, thinner in NL/BE/DACH",
      hooklyne: "Source mix tuned for EU SMEs",
      verdict: "hooklyne",
    },
    {
      dimension: "Email verification",
      competitor: "Built-in, single-source",
      hooklyne: "4 layers: SMTP, catch-all, role, deliverable",
      verdict: "hooklyne",
    },
    {
      dimension: "Cold-list bounce rate",
      competitor: "≈12–25% on EU SMEs (typical)",
      hooklyne: "≈3–5% (verified before ship)",
      verdict: "hooklyne",
    },
    {
      dimension: "Buying-signal layer",
      competitor: "Not included",
      hooklyne: "7 categories, double-scored vs your ICP",
      verdict: "hooklyne",
    },
    {
      dimension: "Outreach personalisation",
      competitor: "Variable fill-ins from your data",
      hooklyne: "4 reasoning passes, voice-matched per rep",
      verdict: "hooklyne",
    },
    {
      dimension: "Sending infrastructure",
      competitor: "Built-in sender + warm-up + sequencing",
      hooklyne: "You send from your own inbox and domain",
      verdict: "competitor",
      note: "Apollo wins on out-of-the-box volume. Hooklyne keeps your sender reputation in your hands.",
    },
    {
      dimension: "GDPR / EU compliance",
      competitor: "US-shaped, configure-your-own",
      hooklyne: "EU-built, no scraping, sourced citations",
      verdict: "hooklyne",
    },
    {
      dimension: "Typical SME spend",
      competitor: "$59–149 per seat / month",
      hooklyne: "€39–239 / month, flat plan pricing",
      verdict: "tie",
      note: "Apollo can be cheaper at one seat. Hooklyne tends to be cheaper at three or more.",
    },
    {
      dimension: "Support model",
      competitor: "Self-serve, tiered support packages",
      hooklyne: "Founder-led onboarding, replies inside 4 hours",
      verdict: "hooklyne",
    },
  ],
  whenCompetitorWins:
    "Apollo is the right choice if you run high-volume US outbound, need a built-in sender, and care more about row count than per-prospect quality. For most NL and UK SMEs under 50 FTE, the verification gap and missing signal layer cost more than the database size saves.",
};

const APOLLO_NL: Profile = {
  competitor: "Apollo",
  competitorSub: "Verzendmotor, Amerikaanse database",
  hooklyneSub: "Onderzoeksworkflow, Europese verificatie",
  rows: [
    {
      dimension: "Omvang contactdatabase",
      competitor: "270M+ contacten (grootste enkele bron)",
      hooklyne: "Waterval over 20+ providers",
      verdict: "competitor",
      note: "Apollo wint op aantal rijen. Hooklyne wint op verificatie per rij.",
    },
    {
      dimension: "Dekking Europese MKB",
      competitor: "VS-georiënteerd, dunner in NL/BE/DACH",
      hooklyne: "Bronmix afgestemd op EU-MKB",
      verdict: "hooklyne",
    },
    {
      dimension: "E-mailverificatie",
      competitor: "Ingebouwd, single-source",
      hooklyne: "4 lagen: SMTP, catch-all, role, deliverable",
      verdict: "hooklyne",
    },
    {
      dimension: "Bouncerate op koude lijsten",
      competitor: "≈12–25% op Europese MKB (typisch)",
      hooklyne: "≈3–5% (geverifieerd voor verzending)",
      verdict: "hooklyne",
    },
    {
      dimension: "Koopsignaallaag",
      competitor: "Niet inbegrepen",
      hooklyne: "7 categorieën, dubbel gescoord op je ideaal klantprofiel",
      verdict: "hooklyne",
    },
    {
      dimension: "Outreach-personalisatie",
      competitor: "Variabelen ingevuld vanuit je data",
      hooklyne: "4 reasoning-passes, voice-match per vertegenwoordiger",
      verdict: "hooklyne",
    },
    {
      dimension: "Verzendinfrastructuur",
      competitor: "Ingebouwde sender + warm-up + sequencing",
      hooklyne: "Versturen vanuit je eigen inbox en domein",
      verdict: "competitor",
      note: "Apollo wint op out-of-the-box volume. Hooklyne houdt je sender-reputatie in eigen hand.",
    },
    {
      dimension: "AVG / EU-compliance",
      competitor: "VS-georiënteerd, zelf configureren",
      hooklyne: "Europees gebouwd, geen scraping, citeerbare bronnen",
      verdict: "hooklyne",
    },
    {
      dimension: "Typische MKB-uitgave",
      competitor: "$59–149 per seat per maand",
      hooklyne: "€39–239 per maand, vaste abonnementsprijs",
      verdict: "tie",
      note: "Apollo kan goedkoper zijn bij één seat. Hooklyne is meestal goedkoper vanaf drie.",
    },
    {
      dimension: "Supportmodel",
      competitor: "Self-serve, tiered support-pakketten",
      hooklyne: "Founder-led onboarding, antwoord binnen 4 uur",
      verdict: "hooklyne",
    },
  ],
  whenCompetitorWins:
    "Apollo is de juiste keus bij high-volume Amerikaanse outbound, een behoefte aan een ingebouwde sender en meer waarde voor aantal rijen dan kwaliteit per prospect. Voor de meeste Nederlandse en Britse MKB-teams onder 50 FTE kost het verificatiegat en de ontbrekende signaallaag meer dan de extra database-omvang oplevert.",
};

const COGNISM_EN: Profile = {
  competitor: "Cognism",
  competitorSub: "Enterprise data, contract-led",
  hooklyneSub: "SME workflow, plan-priced",
  rows: [
    {
      dimension: "Annual commitment",
      competitor: "Typically €15k–25k/year platform fee",
      hooklyne: "€39–239/month, cancel anytime",
      verdict: "hooklyne",
      note: "Cognism's contracted pricing is built for enterprise procurement. SMEs feel the gap most.",
    },
    {
      dimension: "European data depth",
      competitor: "Diamond Verified, large EU dataset",
      hooklyne: "Waterfall across 20+ providers (incl. Cognism-class sources)",
      verdict: "competitor",
      note: "Cognism has invested heavily in EU coverage. Hooklyne uses similar sources but does not match Cognism's exclusive verified mobile dataset.",
    },
    {
      dimension: "Buying-signal layer",
      competitor: "Bombora intent (extra add-on tier)",
      hooklyne: "7 signal categories, scored vs your ICP, included",
      verdict: "hooklyne",
    },
    {
      dimension: "Outreach drafting",
      competitor: "Not included (sequencer integration)",
      hooklyne: "Drafted in your rep's voice, 4 reasoning passes",
      verdict: "hooklyne",
    },
    {
      dimension: "Cold-list email verification",
      competitor: "Verified to single-source",
      hooklyne: "4-layer verification (SMTP, catch-all, role, deliverable)",
      verdict: "hooklyne",
    },
    {
      dimension: "Mobile numbers",
      competitor: "Diamond Verified mobiles available",
      hooklyne: "Email + LinkedIn URL primary; mobile not the main path",
      verdict: "competitor",
      note: "If your motion is heavy phone outbound, Cognism's verified mobile dataset is a real edge.",
    },
    {
      dimension: "Onboarding",
      competitor: "Account exec + onboarding manager + training",
      hooklyne: "Founder-led 30-min call, replies inside 4 hours",
      verdict: "hooklyne",
    },
    {
      dimension: "Time to first prospect",
      competitor: "2–4 weeks from contract signed",
      hooklyne: "10 prospects in your inbox during the pilot",
      verdict: "hooklyne",
    },
    {
      dimension: "GDPR positioning",
      competitor: "Strong, well-documented, audit-ready",
      hooklyne: "EU-built, no scraping, sourced citations",
      verdict: "tie",
      note: "Both are credible on compliance; Cognism has more explicit DPA tooling for legal teams that need it.",
    },
    {
      dimension: "Ideal fit",
      competitor: "Mid-market and enterprise sales orgs (50+ FTE)",
      hooklyne: "SMEs and small mid-market (10–100 FTE)",
      verdict: "tie",
    },
  ],
  whenCompetitorWins:
    "Cognism is the right call if you're a 50+ FTE sales org with enterprise procurement, heavy phone outbound, and a legal team that needs a DPA on letterhead. For most NL and UK SMEs under 50 FTE, the price floor and the missing drafted-message layer cost more than the extra mobile data is worth.",
};

const COGNISM_NL: Profile = {
  competitor: "Cognism",
  competitorSub: "Enterprise data, contract-gedreven",
  hooklyneSub: "MKB-workflow, abonnementsprijs",
  rows: [
    {
      dimension: "Jaarverplichting",
      competitor: "Doorgaans €15k–25k platform fee per jaar",
      hooklyne: "€39–239 per maand, opzegbaar",
      verdict: "hooklyne",
      note: "Het contractmodel van Cognism is gebouwd voor enterprise-inkoop. MKB-teams voelen het verschil het sterkst.",
    },
    {
      dimension: "Europese datadiepte",
      competitor: "Diamond Verified, grote EU-dataset",
      hooklyne: "Waterval over 20+ providers (incl. vergelijkbare bronnen)",
      verdict: "competitor",
      note: "Cognism heeft fors geïnvesteerd in EU-dekking. Hooklyne gebruikt vergelijkbare bronnen maar evenaart de exclusieve geverifieerde mobile-dataset niet.",
    },
    {
      dimension: "Koopsignaallaag",
      competitor: "Bombora intent (extra add-on)",
      hooklyne: "7 signaalcategorieën, gescoord op je ideaal klantprofiel, inbegrepen",
      verdict: "hooklyne",
    },
    {
      dimension: "Outreach-opstelling",
      competitor: "Niet inbegrepen (integratie met sequencer)",
      hooklyne: "Opgesteld in de stem van je vertegenwoordiger, 4 reasoning-passes",
      verdict: "hooklyne",
    },
    {
      dimension: "Verificatie koude lijsten",
      competitor: "Single-source verificatie",
      hooklyne: "4-lagen verificatie (SMTP, catch-all, role, deliverable)",
      verdict: "hooklyne",
    },
    {
      dimension: "Mobiele nummers",
      competitor: "Diamond Verified mobiles beschikbaar",
      hooklyne: "Mail + LinkedIn-URL primair; mobiele nummers niet de hoofdroute",
      verdict: "competitor",
      note: "Bij een sterke phone-outbound motion is de geverifieerde mobile-dataset van Cognism een echt voordeel.",
    },
    {
      dimension: "Onboarding",
      competitor: "Account exec + onboarding manager + training",
      hooklyne: "Founder-led call van 30 minuten, antwoord binnen 4 uur",
      verdict: "hooklyne",
    },
    {
      dimension: "Tijd tot eerste prospect",
      competitor: "2–4 weken na contractondertekening",
      hooklyne: "10 prospects in je inbox tijdens de pilot",
      verdict: "hooklyne",
    },
    {
      dimension: "AVG-positionering",
      competitor: "Sterk, goed gedocumenteerd, audit-klaar",
      hooklyne: "Europees gebouwd, geen scraping, citeerbare bronnen",
      verdict: "tie",
      note: "Beide zijn geloofwaardig op compliance; Cognism heeft uitgebreidere DPA-tooling voor juridische teams die dat nodig hebben.",
    },
    {
      dimension: "Beste fit",
      competitor: "Mid-market en enterprise sales-organisaties (50+ FTE)",
      hooklyne: "MKB en klein mid-market (10–100 FTE)",
      verdict: "tie",
    },
  ],
  whenCompetitorWins:
    "Cognism is de juiste keus voor een sales-organisatie van 50+ FTE met enterprise-inkoop, een zware phone-outbound motion en een juridisch team dat een DPA op briefpapier nodig heeft. Voor de meeste Nederlandse en Britse MKB-teams onder 50 FTE wegen de prijsvloer en de ontbrekende drafted-message-laag zwaarder dan de extra mobiele data.",
};

type Props = {
  /** Which competitor to render. Add more profiles as new SEO pages launch. */
  competitor: "apollo" | "cognism";
  lang?: "en" | "nl";
};

export const HeadToHead = ({ competitor, lang = "en" }: Props) => {
  const profile = lang === "nl"
    ? (competitor === "apollo" ? APOLLO_NL : COGNISM_NL)
    : (competitor === "apollo" ? APOLLO_EN : COGNISM_EN);

  const labels = lang === "nl" ? {
    eyebrow: "Direct vergeleken",
    headlinePrefix: "Hooklyne vs ",
    headlineSuffix: ", regel voor regel.",
    sub: "Tien dimensies die er werkelijk toe doen, met een eerlijke uitkomst per regel - inclusief waar de concurrent nog wint.",
    dimensionCol: "Dimensie",
    fairnessTitle: `Wanneer ${profile.competitor} wint`,
  } : {
    eyebrow: "Head to head",
    headlinePrefix: "Hooklyne vs ",
    headlineSuffix: ", row by row.",
    sub: "Ten dimensions that actually matter, an honest verdict per row - including where the competitor still wins.",
    dimensionCol: "Dimension",
    fairnessTitle: `Where ${profile.competitor} still wins`,
  };

  const verdictBadge = (v: Verdict) => {
    if (v === "hooklyne") return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.18em] px-2 py-0.5 rounded" style={{ background: "rgba(13,148,136,0.12)", color: "var(--hooklyne-teal)" }}>
        <Check className="size-3" /> Hooklyne
      </span>
    );
    if (v === "competitor") return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.18em] px-2 py-0.5 rounded" style={{ background: "rgba(100,116,139,0.12)", color: "#475569" }}>
        <X className="size-3" /> {profile.competitor}
      </span>
    );
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.18em] px-2 py-0.5 rounded" style={{ background: "rgba(100,116,139,0.10)", color: "var(--muted-foreground)" }}>
        <Minus className="size-3" /> {lang === "nl" ? "Gelijk" : "Tie"}
      </span>
    );
  };

  return (
    <section className="pt-10 pb-12 lg:pt-14 lg:pb-20" data-fade>
      <div className="container max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--hooklyne-blue)] mb-3">{labels.eyebrow}</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[var(--heading)] tracking-tight leading-[1.15] md:leading-[1.1] mb-4">
            {labels.headlinePrefix}{profile.competitor}{labels.headlineSuffix}
          </h2>
          <p className="text-base text-[var(--muted-foreground)] leading-relaxed">
            {labels.sub}
          </p>
        </div>

        {/* Header row */}
        <div
          className="hidden md:grid md:grid-cols-[1.4fr_1fr_1fr_auto] gap-4 px-5 py-3 rounded-t-2xl items-center"
          style={{ background: "var(--card)", border: "1px solid var(--border)", borderBottom: "none" }}
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">{labels.dimensionCol}</span>
          <span className="text-sm font-semibold text-[var(--heading)]">
            {profile.competitor} <span className="text-[var(--muted-foreground)] font-normal">· {profile.competitorSub}</span>
          </span>
          <span className="text-sm font-semibold text-[var(--hooklyne-blue)]">
            Hooklyne <span className="text-[var(--muted-foreground)] font-normal">· {profile.hooklyneSub}</span>
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--muted-foreground)] text-right">
            {lang === "nl" ? "Beter" : "Better"}
          </span>
        </div>

        {/* Rows */}
        <div className="rounded-b-2xl md:rounded-t-none rounded-t-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          {profile.rows.map((row, i) => (
            <div
              key={row.dimension}
              className={`grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_auto] gap-2 md:gap-4 px-5 py-4 ${i < profile.rows.length - 1 ? "border-b border-[var(--border)]" : ""}`}
            >
              <div className="md:col-span-1">
                <p className="text-sm font-semibold text-[var(--heading)] leading-snug">{row.dimension}</p>
              </div>
              <div className="md:col-span-1">
                <p className="md:hidden text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted-foreground)] mb-1">{profile.competitor}</p>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{row.competitor}</p>
              </div>
              <div className="md:col-span-1">
                <p className="md:hidden text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--hooklyne-blue)] mb-1">Hooklyne</p>
                <p className="text-sm text-[var(--heading)] leading-relaxed font-medium">{row.hooklyne}</p>
              </div>
              <div className="md:flex md:items-start md:justify-end pt-1 md:pt-0">
                {verdictBadge(row.verdict)}
              </div>
              {row.note && (
                <p className="md:col-span-4 text-xs text-[var(--muted-foreground)] italic mt-2 pt-2 border-t border-dashed border-[var(--border)]">
                  {row.note}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Fairness footer */}
        <div className="mt-5 rounded-2xl px-5 py-4" style={{ background: "rgba(100,116,139,0.06)", border: "1px solid var(--border)" }}>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--muted-foreground)] mb-1.5">
            {labels.fairnessTitle}
          </p>
          <p className="text-sm text-[var(--heading)] leading-relaxed">
            {profile.whenCompetitorWins}
          </p>
        </div>
      </div>
    </section>
  );
};
