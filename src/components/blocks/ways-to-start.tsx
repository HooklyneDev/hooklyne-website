import { useLang } from "@/lib/use-lang";

const COPY = {
  en: {
    eyebrow: "Ways to start",
    heading: "Three ways in. One place they all end.",
    sub: "Pick the path that matches what you already have. Every path lands in My Leads, ready to send.",
    rows: [
      {
        title: "Start with a description.",
        body: "Describe who you want to reach. Hooklyne searches, ranks by signal strength, and finds the right contact at each company.",
        input: "Just a description",
      },
      {
        title: "Start with a company.",
        body: "Name and domain. Hooklyne surfaces the three best-matched decision-makers for you to pick from.",
        input: "Company name + domain",
      },
      {
        title: "Start with a contact.",
        body: "A name or a list. Hooklyne verifies the email and writes outreach in your voice, ready to send.",
        input: "Name + LinkedIn URL",
      },
    ],
    soon: {
      label: "Soon",
      title: "Find similar companies.",
      body: "Upload your best customers. Hooklyne finds lookalikes by size, sector, and buying signals.",
    },
  },
  nl: {
    eyebrow: "Zo begin je",
    heading: "Drie ingangen. Eén uitgang.",
    sub: "Kies het pad dat past bij wat je al hebt. Elk pad eindigt in My Leads, klaar om te versturen.",
    rows: [
      {
        title: "Begin met een beschrijving.",
        body: "Beschrijf wie je wilt bereiken. Hooklyne zoekt, rangschikt op signaalsterkte, en vindt het juiste contact bij elk bedrijf.",
        input: "Alleen een beschrijving",
      },
      {
        title: "Begin met een bedrijf.",
        body: "Naam en domein. Hooklyne toont de drie best passende beslissers waar je uit kunt kiezen.",
        input: "Bedrijfsnaam + domein",
      },
      {
        title: "Begin met een contact.",
        body: "Een naam of een lijst. Hooklyne verifieert het e-mailadres en schrijft de outreach in jouw stijl, klaar om te versturen.",
        input: "Naam + LinkedIn URL",
      },
    ],
    soon: {
      label: "Binnenkort",
      title: "Vergelijkbare bedrijven vinden.",
      body: "Upload je beste klanten. Hooklyne vindt lookalikes op grootte, sector en koopsignalen.",
    },
  },
} as const;

export const WaysToStart = () => {
  const lang = useLang();
  const t = COPY[lang];

  return (
    <section className="py-20 lg:py-28">
      <div className="container max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Sticky left header */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--hooklyne-blue)] mb-4">
                {t.eyebrow}
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-[var(--heading)] tracking-tight mb-5 leading-tight">
                {t.heading}
              </h2>
              <p className="text-base text-[var(--muted-foreground)] leading-relaxed max-w-sm">
                {t.sub}
              </p>
            </div>
          </div>

          {/* Right rows */}
          <div className="lg:col-span-8">
            <div className="divide-y divide-[var(--border)]">
              {t.rows.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[auto_1fr] gap-6 md:gap-12 py-8 first:pt-0"
                >
                  <div className="font-mono text-sm text-[var(--muted-foreground)] pt-1">
                    0{i + 1}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-[var(--heading)] mb-2 leading-tight tracking-tight">
                      {row.title}
                    </h3>
                    <p className="text-base text-[var(--muted-foreground)] leading-relaxed max-w-2xl mb-3">
                      {row.body}
                    </p>
                    <p className="text-[12px] text-[var(--muted-foreground)]/80">
                      <span className="font-semibold uppercase tracking-[0.18em] text-[var(--heading)]/70 mr-2">
                        {lang === "nl" ? "Nodig" : "Input"}
                      </span>
                      {row.input}
                    </p>
                  </div>
                </div>
              ))}

              {/* Coming soon row - muted */}
              <div className="grid grid-cols-[auto_1fr] gap-6 md:gap-12 py-8 last:pb-0 opacity-55">
                <div className="font-mono text-sm text-[var(--muted-foreground)] pt-1">
                  04
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-xl md:text-2xl font-semibold text-[var(--heading)] leading-tight tracking-tight">
                      {t.soon.title}
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-1 rounded-full border border-[var(--border)] text-[var(--muted-foreground)]">
                      {t.soon.label}
                    </span>
                  </div>
                  <p className="text-base text-[var(--muted-foreground)] leading-relaxed max-w-2xl">
                    {t.soon.body}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
