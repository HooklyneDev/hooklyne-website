import { useLang } from "@/lib/use-lang";

const COPY = {
  en: {
    eyebrow: "Ways to start",
    heading: "Three ways in. One place they all end.",
    sub: "Pick the path that matches what you already have. Every path lands in My Leads, ready to send.",
    inputLabel: "Input",
    rows: [
      {
        title: "Start with a description.",
        body: "Describe who to reach. Hooklyne searches, ranks by signal strength, and finds the right contact at each company.",
        input: "Just a description",
      },
      {
        title: "Start with a company.",
        body: "Name and domain. Hooklyne surfaces the three best-matched decision-makers for you to pick from.",
        input: "Company + domain",
      },
      {
        title: "Start with a contact.",
        body: "A name or a list. Hooklyne verifies the email and writes outreach in your voice, ready to send.",
        input: "Name + LinkedIn",
      },
    ],
    soon: {
      label: "Soon",
      title: "Find similar companies.",
      body: "Upload your best customers. Hooklyne finds lookalikes by size, sector, and buying signals.",
      input: "A list of customers",
    },
  },
  nl: {
    eyebrow: "Zo begin je",
    heading: "Drie ingangen. Eén uitgang.",
    sub: "Kies het pad dat past bij wat je al hebt. Elk pad eindigt in My Leads, klaar om te versturen.",
    inputLabel: "Nodig",
    rows: [
      {
        title: "Begin met een beschrijving.",
        body: "Beschrijf wie je wilt bereiken. Hooklyne zoekt, rangschikt op signaal, en vindt het juiste contact bij elk bedrijf.",
        input: "Alleen een beschrijving",
      },
      {
        title: "Begin met een bedrijf.",
        body: "Naam en domein. Hooklyne toont de drie best passende beslissers waar je uit kunt kiezen.",
        input: "Bedrijf + domein",
      },
      {
        title: "Begin met een contact.",
        body: "Een naam of lijst. Hooklyne verifieert het e-mailadres en schrijft de outreach in jouw stijl.",
        input: "Naam + LinkedIn",
      },
    ],
    soon: {
      label: "Binnenkort",
      title: "Vergelijkbare bedrijven.",
      body: "Upload je beste klanten. Hooklyne vindt lookalikes op grootte, sector en koopsignalen.",
      input: "Een klantenlijst",
    },
  },
} as const;

export const WaysToStart = () => {
  const lang = useLang();
  const t = COPY[lang];

  const columns = [
    ...t.rows.map((r, i) => ({ ...r, idx: i, soon: false, label: "" })),
    { ...t.soon, idx: 3, soon: true },
  ];

  return (
    <section className="py-20 lg:py-24">
      <div className="container max-w-6xl">
        {/* Header row - left aligned, takes one line */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--hooklyne-blue)] mb-3">
              {t.eyebrow}
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-[2.125rem] font-semibold text-[var(--heading)] tracking-tight leading-tight">
              {t.heading}
            </h2>
          </div>
          <p className="text-sm text-[var(--muted-foreground)] leading-relaxed max-w-sm md:text-right">
            {t.sub}
          </p>
        </div>

        {/* 4-col horizontal strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border)] border-y border-[var(--border)]">
          {columns.map((c) => (
            <div
              key={c.idx}
              className={`flex flex-col py-6 lg:py-7 px-0 lg:px-6 first:lg:pl-0 last:lg:pr-0 ${c.soon ? "opacity-55" : ""}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[11px] text-[var(--muted-foreground)]">
                  0{c.idx + 1}
                </span>
                {c.soon && (
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] px-1.5 py-0.5 rounded-full border border-[var(--border)] text-[var(--muted-foreground)]">
                    {t.soon.label}
                  </span>
                )}
              </div>
              <h3 className="text-[15px] md:text-base font-semibold text-[var(--heading)] leading-snug tracking-tight mb-2">
                {c.title}
              </h3>
              <p className="text-[13px] text-[var(--muted-foreground)] leading-relaxed mb-4 flex-1">
                {c.body}
              </p>
              <p className="text-[11px] text-[var(--muted-foreground)]/90">
                <span className="font-semibold uppercase tracking-[0.18em] text-[var(--heading)]/70 mr-1.5">
                  {t.inputLabel}
                </span>
                {c.input}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
