import { useState, useEffect } from "react";
import { TrendUp, UserSwitch, Handshake } from "@phosphor-icons/react";
import { useLang, type Lang } from "@/lib/use-lang";
import { Avatar } from "@/components/avatar";

const EN = {
  eyebrow: "Built for",
  statements: [
    {
      headline: "Founders doing their own sales.",
      body: "No ops team, no researcher, no agency budget. You're the GTM function, and Hooklyne is the research layer you'd hire if you could.",
    },
    {
      headline: "Sales teams at 10 to 100 person companies.",
      body: "One rep or eight, a CRM, maybe a sequencer. You know your ICP but burn hours researching each prospect. Hooklyne gives those hours back, and scales with you as the team grows.",
    },
    {
      headline: "Teams where one good meeting beats fifty cold emails.",
      body: "Complex offers. Considered buyers. Niche ICPs. Where spray-and-pray damages your reputation and every email needs to earn its reply.",
    },
  ],
  cards: [
    {
      signalType: "Funding",
      signalTime: "2d ago",
      signalQuote: "Closed our Series A. Time to scale the team.",
      opener: "Saw the raise. When the founder is still sole seller after a Series A, the first two GTM hires usually go wrong. Worth 15 minutes before you post the roles?",
      draftLabel: "Drafted by Hooklyne",
      persona: { name: "Mark Janssen", role: "Founder & CEO at Stack Labs", image: "/personas/mark-janssen.jpg" },
    },
    {
      signalType: "Leadership change",
      signalTime: "1w ago",
      signalQuote: "Excited to join Hertog Logistics as VP Sales. Hiring three AEs - DM if interested.",
      opener: "New VP plus three open AEs usually means a full tooling reset. Happy to show how similar teams set up their outbound in the first 90 days.",
      draftLabel: "Drafted by Hooklyne",
      persona: { name: "Sara de Vries", role: "VP Sales at Hertog Logistics", image: "/personas/sara-de-vries.jpg" },
    },
    {
      signalType: "New contract",
      signalTime: "3d ago",
      signalQuote: "Signed our biggest retailer to date. Compliance team doubling this quarter.",
      opener: "Saw the retailer deal. That type of contract creates compliance pressure around month 3 for the vendor side too. Two similar firms ran into it recently - happy to share what they did.",
      draftLabel: "Drafted by Hooklyne",
      persona: { name: "David Aarts", role: "Head of Compliance at Mercata", image: "/personas/david-aarts.jpg" },
    },
  ],
};

const NL = {
  eyebrow: "Gebouwd voor",
  statements: [
    {
      headline: "Founders die zelf verkopen.",
      body: "Geen ops-team, geen researcher, geen agency-budget. Jij verkoopt zelf en Hooklyne is de onderzoekslaag die je anders zou inhuren.",
    },
    {
      headline: "Salesteams bij bedrijven van 10 tot 100.",
      body: "Een salesmedewerker of acht, een CRM, misschien een sequencer. Je kent je ideaal klantprofiel, maar prospect-onderzoek vreet je week op. Hooklyne pakt dat werk over en groeit mee als je team groeit.",
    },
    {
      headline: "Teams die liever één goed gesprek voeren dan vijftig koude mails sturen.",
      body: "Complexe proposities, kritische kopers en niche-klantprofielen. Waar spray-and-pray je reputatie sloopt en elke mail de reply moet verdienen.",
    },
  ],
  cards: [
    {
      signalType: "Funding",
      signalTime: "2 dagen",
      signalQuote: "Onze Series A is rond. Tijd om het team op te bouwen.",
      opener: "Zag de ronde. Als de founder na een Series A nog steeds solo verkoopt, gaan de eerste twee salesaanstellingen er vaak naast. Kwartier waard voordat je de vacatures plaatst?",
      draftLabel: "Opgesteld door Hooklyne",
      persona: { name: "Mark Janssen", role: "Founder & CEO bij Stack Labs", image: "/personas/mark-janssen.jpg" },
    },
    {
      signalType: "Leiderschapswissel",
      signalTime: "1 week",
      signalQuote: "Begonnen als VP Sales bij Hertog Logistics. We zoeken drie AE's - stuur een bericht als je interesse hebt.",
      opener: "Nieuwe VP plus drie open AE-rollen betekent bijna altijd een volledige tooling-reset. Ik laat graag zien hoe vergelijkbare teams hun outbound in de eerste 90 dagen opzetten.",
      draftLabel: "Opgesteld door Hooklyne",
      persona: { name: "Sara de Vries", role: "VP Sales bij Hertog Logistics", image: "/personas/sara-de-vries.jpg" },
    },
    {
      signalType: "Nieuw contract",
      signalTime: "3 dagen",
      signalQuote: "Onze grootste retailer ooit getekend. Het compliance-team verdubbelt dit kwartaal.",
      opener: "Zag de retailerdeal. Dat type contract legt ook aan de leverancierskant druk op compliance, meestal rond maand 3. Twee vergelijkbare bedrijven liepen er recent tegenaan - ik deel graag wat ze deden.",
      draftLabel: "Opgesteld door Hooklyne",
      persona: { name: "David Aarts", role: "Head of Compliance bij Mercata", image: "/personas/david-aarts.jpg" },
    },
  ],
};

const CARD_TONES = ["blue", "teal", "orange"] as const;
const CARD_ICONS = [TrendUp, UserSwitch, Handshake];

export const BuiltFor = ({ lang: langProp }: { lang?: Lang } = {}) => {
  const lang = useLang(langProp);
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
    <section className="pt-10 pb-10 lg:pt-12 lg:pb-12" data-fade>
      <div className="container max-w-6xl">
        <div className="flex flex-col lg:grid lg:grid-cols-5 lg:gap-16 lg:items-center">

          {/* Left: text column (60%). On mobile, falls below the cards
              via Tailwind order classes - cards lead, text follows. */}
          <div className="lg:col-span-3 order-2 lg:order-1 mt-10 lg:mt-0">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--hooklyne-blue)] mb-4">
              {t.eyebrow}
            </p>

            <div className="space-y-8 lg:space-y-12">
              {t.statements.map((s, i) => (
                <div key={i} className="max-w-xl">
                  <h2 className="text-xl md:text-3xl font-semibold text-[var(--heading)] tracking-tight leading-[1.2] md:leading-[1.15] mb-3">
                    {s.headline}
                  </h2>
                  <p className="text-base text-[var(--muted-foreground)] leading-relaxed">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: stacked-at-depth card deck (40%) */}
          <div
            className="hidden lg:block lg:col-span-2 lg:pt-4"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative mx-auto" style={{ height: 440, maxWidth: 380 }}>
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
                const accentBorder =
                  tone === "teal"   ? "rgba(13,148,136,0.22)"  :
                  tone === "orange" ? "rgba(255,140,66,0.22)"   :
                  "rgba(52,76,163,0.22)";

                // Signed offset: -1 = above peek, 0 = center active, +1 = below peek
                const n = t.cards.length;
                const rawDiff = (((i - active) % n) + n) % n;
                const signed = rawDiff === 0 ? 0 : rawDiff === 1 ? 1 : -1;
                const isCenter = signed === 0;

                const peakY  = 120; // px distance of peeking cards from center
                const translateY = signed * peakY;
                const scale      = isCenter ? 1 : 0.92;
                const opacity    = isCenter ? 1 : 0.45;

                return (
                  <button
                    key={i}
                    onClick={() => { setActive(i); setPaused(true); }}
                    aria-label={`Show signal from ${card.persona.name}`}
                    className="glass-off absolute inset-x-0 text-left rounded-2xl p-5 lg:p-6"
                    style={{
                      top: "50%",
                      background: "#ffffff",
                      border: `1px solid ${isCenter ? accentBorder : "var(--border)"}`,
                      boxShadow: isCenter ? "var(--shadow-xl)" : "var(--shadow-md)",
                      transform: `translateY(calc(-50% + ${translateY}px)) scale(${scale})`,
                      transformOrigin: "center center",
                      opacity,
                      zIndex: isCenter ? 10 : 5,
                      transition:
                        "transform 600ms cubic-bezier(0.32,0.72,0.22,1), opacity 500ms ease, box-shadow 500ms ease, border-color 500ms ease",
                      pointerEvents: isCenter ? "auto" : "none",
                    }}
                  >
                    {/* Person header */}
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar name={card.persona.name} src={card.persona.image} tone={tone} size="lg" />
                      <div className="leading-tight min-w-0">
                        <div className="text-[14px] font-semibold text-[var(--heading)] truncate">
                          {card.persona.name}
                        </div>
                        <div className="text-[11.5px] text-[var(--muted-foreground)] truncate">
                          {card.persona.role}
                        </div>
                      </div>
                    </div>

                    {/* Signal type pill */}
                    <div className="flex items-center gap-1.5 mb-2.5">
                      <Icon size={14} weight="regular" style={{ color: accentColor }} />
                      <span
                        className="text-[10.5px] font-semibold uppercase tracking-[0.18em]"
                        style={{ color: accentColor }}
                      >
                        {card.signalType}
                      </span>
                      <span className="text-[10.5px] text-[var(--muted-foreground)]">
                        · {card.signalTime}
                      </span>
                    </div>

                    {/* Signal quote */}
                    <p className="text-[13px] leading-relaxed text-[var(--heading)] mb-4">
                      "{card.signalQuote}"
                    </p>

                    {/* Drafted-reply divider */}
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="h-px flex-1" style={{ background: accentBorder }} />
                      <span className="text-[9.5px] font-bold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                        {card.draftLabel}
                      </span>
                      <div className="h-px flex-1" style={{ background: accentBorder }} />
                    </div>

                    {/* Drafted opener */}
                    <p className="text-[12.5px] leading-relaxed text-[var(--muted-foreground)] italic">
                      {card.opener}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Progress dots */}
            <div className="flex gap-1.5 justify-center pt-5">
              {t.cards.map((_, i) => (
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

          {/* Mobile: static stack of all 3 cards - shown FIRST on mobile via order class */}
          <div className="lg:hidden order-1 grid gap-3">
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
                  className="glass-off rounded-xl p-4"
                  style={{
                    background: "#ffffff",
                    border: "1px solid var(--border)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar name={card.persona.name} src={card.persona.image} tone={tone} size="md" />
                    <div className="leading-tight min-w-0">
                      <div className="text-[13px] font-semibold text-[var(--heading)] truncate">{card.persona.name}</div>
                      <div className="text-[11px] text-[var(--muted-foreground)] truncate">{card.persona.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Icon size={12} weight="regular" style={{ color: accentColor }} />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: accentColor }}>
                      {card.signalType}
                    </span>
                    <span className="text-[10px] text-[var(--muted-foreground)]">· {card.signalTime}</span>
                  </div>
                  <p className="text-[12.5px] leading-relaxed text-[var(--heading)] mb-3">
                    "{card.signalQuote}"
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-px flex-1" style={{ background: "var(--border)" }} />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                      {card.draftLabel}
                    </span>
                    <div className="h-px flex-1" style={{ background: "var(--border)" }} />
                  </div>
                  <p className="text-[12px] leading-relaxed text-[var(--muted-foreground)] italic">
                    {card.opener}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
