const EN = {
  eyebrow: "Built for",
  statements: [
    {
      headline: "Founders doing their own sales.",
      body: "No ops team. No researcher. No agency budget. You're the GTM function - Hooklyne is the research layer you'd hire if you could.",
    },
    {
      headline: "Sales reps at 10-75 person companies.",
      body: "1 to 3 reps, a CRM, maybe a sequencer. You know your ICP but burn hours researching each prospect. Hooklyne gives those hours back.",
    },
    {
      headline: "Teams where one good conversation beats fifty cold emails.",
      body: "Complex offers. Considered buyers. Niche ICPs. Where spray-and-pray damages your reputation and the email needs to earn the reply.",
    },
  ],
};

const NL = {
  eyebrow: "Gebouwd voor",
  statements: [
    {
      headline: "Founders die zelf verkopen.",
      body: "Geen ops-team. Geen researcher. Geen agency-budget. Jij bent de GTM-functie - Hooklyne is de onderzoekslaag die je zou inhuren als je kon.",
    },
    {
      headline: "Salesreps bij bedrijven van 10 tot 75 man.",
      body: "1 tot 3 reps, een CRM, misschien een sequencer. Je kent je ICP, maar je verbrandt uren met prospect-onderzoek. Hooklyne geeft die uren terug.",
    },
    {
      headline: "Teams waarbij één goed gesprek vijftig koude mails waard is.",
      body: "Complexe aanbiedingen. Weloverwogen kopers. Niche ICPs. Waar spray-and-pray je reputatie schaadt en de mail de reply moet verdienen.",
    },
  ],
};

export const BuiltFor = ({ lang = "en" }: { lang?: "en" | "nl" }) => {
  const t = lang === "nl" ? NL : EN;

  return (
    <section className="py-14 lg:py-20" data-fade>
      <div className="container max-w-6xl">
        <div className="lg:grid lg:grid-cols-5 lg:gap-16 items-start">

          {/* Left: text column (60%) */}
          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted-foreground)] mb-10">
              {t.eyebrow}
            </p>

            <div className="space-y-12">
              {t.statements.map((s, i) => (
                <div key={i} className="max-w-xl">
                  <h3 className="text-2xl md:text-3xl font-semibold text-[var(--heading)] tracking-tight leading-[1.15] mb-3">
                    {s.headline}
                  </h3>
                  <p className="text-base text-[var(--muted-foreground)] leading-relaxed">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: vertical accent line with dots (40%) */}
          <div className="hidden lg:flex lg:col-span-2 justify-center items-stretch pt-[3.75rem]">
            <div className="relative flex flex-col items-center w-px"
              style={{ background: "var(--border)" }}>
              {/* Three dots, evenly spaced to align with each statement */}
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{ top: `calc(${i} * 33.333% + 16.666%)`, transform: "translate(-50%, -50%)" }}
                >
                  <div
                    className="size-3 rounded-full border-2"
                    style={{
                      background: "var(--hooklyne-navy)",
                      borderColor: "var(--background)",
                      boxShadow: "0 0 0 2px var(--hooklyne-navy)",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
