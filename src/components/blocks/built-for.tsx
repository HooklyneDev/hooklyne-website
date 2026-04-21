import { Factory, Utensils, Zap } from "lucide-react";

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
  sectionEyebrow: "Examples by sector",
  sectionHeadline: "How it reads for your market.",
  cards: [
    {
      sector: "B2B engineering",
      signal: "Factory expansion announced.",
      opener: "Saw the Rotterdam expansion. Curious whether you're sourcing controls engineers externally or building inline.",
    },
    {
      sector: "B2B food",
      signal: "New Head of Procurement role posted.",
      opener: "Usually signals a supplier review. Worth a 15-minute intro before the new lead starts?",
    },
    {
      sector: "B2B energy",
      signal: "Renewables share at 34% in latest filing.",
      opener: "We work with three operators at similar thresholds. A few things typically break first at that point.",
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
  sectionEyebrow: "Voorbeelden per sector",
  sectionHeadline: "Hoe het leest voor jouw markt.",
  cards: [
    {
      sector: "B2B engineering",
      signal: "Uitbreiding fabriek aangekondigd.",
      opener: "Zag de uitbreiding in Rotterdam. Benieuwd of jullie controls engineers extern inhuren of intern opbouwen.",
    },
    {
      sector: "B2B food",
      signal: "Nieuwe Head of Procurement-rol geplaatst.",
      opener: "Meestal een signaal voor een leveranciersreview. De moeite waard om kort kennis te maken voordat de nieuwe lead start?",
    },
    {
      sector: "B2B energy",
      signal: "Aandeel hernieuwbaar op 34% in laatste rapportage.",
      opener: "We werken met drie operators rond dezelfde drempel. Een paar dingen breken op dat punt meestal als eerste.",
    },
  ],
};

const CARD_TONES = ["blue", "teal", "orange"] as const;

const CARD_ICONS = [Factory, Utensils, Zap];

export const BuiltFor = ({ lang = "en" }: { lang?: "en" | "nl" }) => {
  const t = lang === "nl" ? NL : EN;

  return (
    <section className="pt-10 pb-10 lg:pt-12 lg:pb-12" data-fade>
      <div className="container max-w-6xl">
        {/* Top: "Built for" statements */}
        <div className="max-w-4xl mb-14 lg:mb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--hooklyne-blue)] mb-4">
            {t.eyebrow}
          </p>
          <div className="space-y-8 lg:space-y-12">
            {t.statements.map((s, i) => (
              <div key={i} className="max-w-xl">
                <h3 className="text-xl md:text-3xl font-semibold text-[var(--heading)] tracking-tight leading-[1.2] md:leading-[1.15] mb-3">
                  {s.headline}
                </h3>
                <p className="text-base text-[var(--muted-foreground)] leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sector examples */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--hooklyne-blue)] mb-4">
            {t.sectionEyebrow}
          </p>
          <h2 className="text-2xl md:text-4xl font-semibold text-[var(--heading)] tracking-tight leading-[1.15]">
            {t.sectionHeadline}
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {t.cards.map((card, i) => {
            const tone = CARD_TONES[i];
            const Icon = CARD_ICONS[i];
            const accentColor =
              tone === "teal"   ? "var(--hooklyne-teal)"   :
              tone === "orange" ? "var(--hooklyne-orange)"  :
              "var(--hooklyne-blue)";
            const accentBg =
              tone === "teal"   ? "rgba(13,148,136,0.10)"  :
              tone === "orange" ? "rgba(255,140,66,0.10)"   :
              "rgba(52,76,163,0.10)";

            return (
              <div
                key={i}
                className="rounded-2xl p-5 lg:p-6 flex flex-col"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                {/* Icon + sector */}
                <div className="flex items-center gap-2.5 mb-4">
                  <span
                    className="inline-flex items-center justify-center size-8 rounded-lg shrink-0"
                    style={{ background: accentBg, color: accentColor }}
                    aria-hidden="true"
                  >
                    <Icon className="size-4" />
                  </span>
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.2em]"
                    style={{ color: accentColor }}
                  >
                    {card.sector}
                  </span>
                </div>

                {/* Signal */}
                <p className="text-[12px] italic text-[var(--muted-foreground)] mb-3 leading-relaxed">
                  {card.signal}
                </p>

                {/* Divider */}
                <div className="h-px mb-3" style={{ background: "var(--border)" }} />

                {/* Opener */}
                <p className="text-[13px] text-[var(--heading)] leading-relaxed">
                  {card.opener}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
