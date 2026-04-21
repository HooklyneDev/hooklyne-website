import { useState, useEffect } from "react";

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

const CARDS = [
  {
    name: "Marc",
    role: "Sales · 22-person engineering firm",
    tag: "B2B engineering",
    before: "Our buyers are technical. A generic email gets ignored before the second sentence.",
    after: "Hooklyne surfaces a relevant project signal. Marc's email references it. The reply rate doubled.",
    tone: "blue" as const,
  },
  {
    name: "Lotte",
    role: "Founder · 8-person food ingredients supplier",
    tag: "B2B food",
    before: "I sell to procurement at food manufacturers. Finding the right contact alone takes hours.",
    after: "Hooklyne identifies the verified buyer, pulls a recent trigger, and drafts the intro. Lotte reviews and sends.",
    tone: "teal" as const,
  },
  {
    name: "Joost",
    role: "BD · 40-person energy consultancy",
    tag: "B2B energy",
    before: "Long sales cycles, complex stakeholders. Every touchpoint needs to add something real.",
    after: "Joost's first email leads with a live signal tied to the prospect's energy portfolio. Conversations open differently.",
    tone: "orange" as const,
  },
];

export const BuiltFor = ({ lang = "en" }: { lang?: "en" | "nl" }) => {
  const t = lang === "nl" ? NL : EN;
  const [active, setActive]   = useState(0);
  const [paused, setPaused]   = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % 3), 4000);
    return () => clearInterval(id);
  }, [reduced, paused]);

  return (
    <section className="py-14 lg:py-20" data-fade>
      <div className="container max-w-6xl">
        <div className="lg:grid lg:grid-cols-5 lg:gap-16 items-start">

          {/* Left: text column (60%) */}
          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted-foreground)] mb-6 lg:mb-10">
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

          {/* Right: vertical card column (40%) */}
          <div
            className="hidden lg:flex lg:col-span-2 flex-col gap-3 pt-16"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {CARDS.map((card, i) => {
              const isActive = i === active;
              const accentColor =
                card.tone === "teal"   ? "var(--hooklyne-teal)"   :
                card.tone === "orange" ? "var(--hooklyne-orange)"  :
                "var(--hooklyne-blue)";
              const accentBg =
                card.tone === "teal"   ? "rgba(13,148,136,0.08)"  :
                card.tone === "orange" ? "rgba(255,140,66,0.08)"   :
                "rgba(52,76,163,0.08)";
              const accentBorder =
                card.tone === "teal"   ? "rgba(13,148,136,0.22)"  :
                card.tone === "orange" ? "rgba(255,140,66,0.22)"   :
                "rgba(52,76,163,0.22)";
              const cardBorder = isActive ? accentBorder : "var(--border)";

              return (
                <button
                  key={card.name}
                  onClick={() => { setActive(i); setPaused(true); }}
                  className="text-left w-full rounded-xl p-4 transition-all duration-500"
                  style={{
                    background: isActive ? accentBg : "var(--card)",
                    border: `1px solid ${cardBorder}`,
                    boxShadow: isActive ? "var(--shadow-lg)" : "var(--shadow-sm)",
                    opacity: isActive ? 1 : 0.55,
                    transform: isActive ? "scale(1)" : "scale(0.97)",
                    transformOrigin: "top center",
                  }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div
                        className="text-[13px] font-semibold leading-tight"
                        style={{ color: isActive ? "var(--heading)" : "var(--muted-foreground)" }}
                      >
                        {card.name}
                      </div>
                      <div className="text-[11px] text-[var(--muted-foreground)] mt-0.5">{card.role}</div>
                    </div>
                    <span
                      className="shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        background: isActive ? accentBg : "var(--card-hover)",
                        color: isActive ? accentColor : "var(--muted-foreground)",
                        border: `1px solid ${isActive ? accentBorder : "var(--border)"}`,
                      }}
                    >
                      {card.tag}
                    </span>
                  </div>

                  {/* Before */}
                  <p className="text-[12px] text-[var(--muted-foreground)] leading-relaxed italic mb-2">
                    &ldquo;{card.before}&rdquo;
                  </p>

                  {/* Divider + after */}
                  {isActive && (
                    <div
                      className="transition-all duration-300"
                      style={{ overflow: "hidden" }}
                    >
                      <div className="h-px mb-2.5" style={{ background: accentBorder }} />
                      <p className="text-[12px] font-medium leading-relaxed" style={{ color: accentColor }}>
                        {card.after}
                      </p>
                    </div>
                  )}
                </button>
              );
            })}

            {/* Progress dots */}
            <div className="flex gap-1.5 justify-center pt-1">
              {CARDS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setActive(i); setPaused(true); }}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? 20 : 6,
                    height: 6,
                    background: i === active ? "var(--hooklyne-blue)" : "var(--border)",
                  }}
                  aria-label={`Show card ${i + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
