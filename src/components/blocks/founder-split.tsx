const EN = {
  eyebrow: "From the founder",
  quote: "Most teams can't pick between proper research and enough outreach, so they sacrifice both. We built Hooklyne so they don't have to.",
  name: "Tim",
  role: "Founder · Hooklyne · Utrecht, NL",
};

const NL = {
  eyebrow: "Van de oprichter",
  quote: "De meeste teams kunnen niet kiezen tussen gedegen onderzoek en voldoende outreach, dus offeren ze allebei op. We bouwden Hooklyne zodat ze dat niet hoeven te doen.",
  name: "Tim",
  role: "Oprichter · Hooklyne · Utrecht, NL",
};

export const FounderSplit = ({ lang = "en" }: { lang?: "en" | "nl" }) => {
  const t = lang === "nl" ? NL : EN;

  return (
    <section className="py-10 lg:py-16" data-fade>
      <div className="container max-w-3xl">

        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted-foreground)] mb-6 text-center">
          {t.eyebrow}
        </p>

        <div
          className="rounded-2xl px-8 py-10 md:px-14 md:py-12 relative"
          style={{
            background: "var(--card)",
            border: "1px solid rgba(52,76,163,0.18)",
            boxShadow: "var(--shadow-xl), 0 0 0 1px rgba(52,76,163,0.06), 0 8px 48px rgba(52,76,163,0.10)",
          }}
        >
          {/* Glow layer */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(52,76,163,0.07) 0%, transparent 100%)",
            }}
          />

          {/* Large decorative quote mark */}
          <div
            aria-hidden="true"
            className="absolute top-6 left-8 text-7xl leading-none font-serif select-none pointer-events-none"
            style={{ color: "rgba(52,76,163,0.12)" }}
          >
            "
          </div>

          {/* Quote */}
          <p className="relative text-xl md:text-2xl lg:text-3xl text-[var(--heading)] leading-[1.45] font-normal tracking-tight pt-6">
            {t.quote}
          </p>

          {/* Attribution */}
          <div className="mt-8 flex items-center gap-3">
            {/* Monogram */}
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-sm font-semibold"
              style={{
                background: "rgba(52,76,163,0.1)",
                color: "var(--hooklyne-blue)",
                border: "1px solid rgba(52,76,163,0.22)",
              }}
            >
              {t.name.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-semibold text-[var(--heading)]">{t.name}</div>
              <div className="text-xs text-[var(--muted-foreground)] mt-0.5">{t.role}</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
