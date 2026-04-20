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
    name: "Sem",
    role: "Founder · 4-person SaaS",
    tag: "Solo seller",
    situation: "I research and write every outreach email myself. It takes half my day.",
    outcome: "Hooklyne delivers a researched prospect package. Sem reviews and sends in under a minute.",
    tone: "blue" as const,
  },
  {
    name: "Lotte",
    role: "SDR · 35-person consultancy",
    tag: "1 of 2 reps",
    situation: "Two reps, 40 accounts each. No time to research properly before reaching out.",
    outcome: "Each lead arrives with a verified contact, a live signal, and a draft written in Lotte's voice.",
    tone: "teal" as const,
  },
  {
    name: "Joost",
    role: "BD · 20-person agency",
    tag: "Complex sale",
    situation: "Generic outreach damages our brand. Every email needs to earn the reply.",
    outcome: "Joost's emails lead with a real signal. Prospects can tell it's not a template.",
    tone: "orange" as const,
  },
];

/* Stack position styles: index 0 = front, 1 = middle, 2 = back.
   Y-only offset so back cards are not pushed outside the container.
   transformOrigin "top center" keeps cards top-aligned as they scale. */
const STACK: { y: number; scale: number; opacity: number; zIndex: number }[] = [
  { y: 0,  scale: 1.00, opacity: 1.00, zIndex: 30 },
  { y: 8,  scale: 0.96, opacity: 0.82, zIndex: 20 },
  { y: 16, scale: 0.92, opacity: 0.65, zIndex: 10 },
];

export const BuiltFor = ({ lang = "en" }: { lang?: "en" | "nl" }) => {
  const t = lang === "nl" ? NL : EN;
  const [front, setFront]   = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(() => setFront((f) => (f + 1) % 3), 4000);
    return () => clearInterval(id);
  }, [reduced, paused]);

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

          {/* Right: rotating prospect card stack (40%) */}
          <div className="hidden lg:flex lg:col-span-2 items-start justify-center pt-16">
            <div
              className="relative w-full"
              style={{ height: 280 }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {CARDS.map((card, i) => {
                const pos = (i - front + 3) % 3;
                const s   = STACK[pos];
                const accentColor =
                  card.tone === "teal"   ? "var(--hooklyne-teal)"   :
                  card.tone === "orange" ? "var(--hooklyne-orange)"  :
                  "var(--hooklyne-blue)";
                const accentBg =
                  card.tone === "teal"   ? "rgba(13,148,136,0.08)"  :
                  card.tone === "orange" ? "rgba(255,140,66,0.08)"   :
                  "rgba(52,76,163,0.08)";
                const accentBorder =
                  card.tone === "teal"   ? "rgba(13,148,136,0.18)"  :
                  card.tone === "orange" ? "rgba(255,140,66,0.18)"   :
                  "rgba(52,76,163,0.18)";
                return (
                  <div
                    key={card.name}
                    className="absolute left-0 right-0 top-0"
                    style={{
                      transform: `translateY(${s.y}px) scale(${s.scale})`,
                      transformOrigin: "top center",
                      opacity: s.opacity,
                      zIndex: s.zIndex,
                      transition: reduced
                        ? "none"
                        : "transform 600ms ease-in-out, opacity 600ms ease-in-out",
                    }}
                  >
                    <div
                      className="rounded-xl p-5"
                      style={{
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        boxShadow: "var(--shadow-lg)",
                      }}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div>
                          <div className="text-[14px] font-semibold text-[var(--heading)] leading-tight">{card.name}</div>
                          <div className="text-[12px] text-[var(--muted-foreground)] mt-0.5">{card.role}</div>
                        </div>
                        <span
                          className="shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full"
                          style={{ background: accentBg, color: accentColor, border: `1px solid ${accentBorder}` }}
                        >
                          {card.tag}
                        </span>
                      </div>

                      {/* Situation */}
                      <p className="text-[12px] text-[var(--muted-foreground)] leading-relaxed mb-3 italic">
                        &ldquo;{card.situation}&rdquo;
                      </p>

                      {/* Divider */}
                      <div className="h-px mb-3" style={{ background: "var(--border)" }} />

                      {/* Outcome */}
                      <p className="text-[12px] text-[var(--heading)] leading-relaxed font-medium">
                        {card.outcome}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
