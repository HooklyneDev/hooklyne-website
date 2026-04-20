const EN = {
  eyebrow: "From the founder",
  quote: "Most teams can't pick between proper research and enough outreach, so they sacrifice both. We built Hooklyne so they don't have to.",
  name: "Tim",
  role: "Founder · Hooklyne · The Netherlands",
  details: [
    "Founded 2026 in Utrecht.",
    "Built with sales reps, not for them.",
    "The team uses Hooklyne every day.",
  ],
};

const NL = {
  eyebrow: "Van de oprichter",
  quote: "De meeste teams kunnen niet kiezen tussen gedegen onderzoek en voldoende outreach, dus offeren ze allebei op. We bouwden Hooklyne zodat ze dat niet hoeven te doen.",
  name: "Tim",
  role: "Oprichter · Hooklyne · Nederland",
  details: [
    "Opgericht in 2026 in Utrecht.",
    "Gebouwd met salesreps, niet voor hen.",
    "Het team gebruikt Hooklyne elke dag.",
  ],
};

export const FounderSplit = ({ lang = "en" }: { lang?: "en" | "nl" }) => {
  const t = lang === "nl" ? NL : EN;

  return (
    <section className="py-14 lg:py-20" data-fade>
      <div className="container max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: quote */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted-foreground)] mb-6">
              {t.eyebrow}
            </p>

            <div
              aria-hidden="true"
              className="text-7xl leading-none font-serif mb-2 select-none"
              style={{ color: "var(--border)" }}
            >
              &ldquo;
            </div>

            <p className="text-xl md:text-2xl text-[var(--heading)] leading-[1.45] font-normal mb-8">
              {t.quote}
            </p>

            <div>
              <div className="text-base font-medium text-[var(--heading)]">{t.name}</div>
              <div className="text-sm text-[var(--muted-foreground)] mt-0.5">{t.role}</div>
            </div>
          </div>

          {/* Right: plain text details */}
          <div className="lg:pt-16">
            <div className="space-y-3">
              {t.details.map((line, i) => (
                <p key={i} className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
