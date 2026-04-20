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
    <section className="py-14 lg:py-24" data-fade>
      <div className="container max-w-4xl">

        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted-foreground)] mb-10 text-center">
          {t.eyebrow}
        </p>

        <div
          className="rounded-2xl px-8 py-12 md:px-16 md:py-16 relative"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-xl)",
          }}
        >
          {/* Large decorative quote mark */}
          <div
            aria-hidden="true"
            className="absolute top-8 left-10 text-8xl leading-none font-serif select-none pointer-events-none"
            style={{ color: "var(--border)" }}
          >
            &ldquo;
          </div>

          {/* Quote */}
          <p className="relative text-2xl md:text-3xl lg:text-4xl text-[var(--heading)] leading-[1.4] font-normal tracking-tight pt-8">
            {t.quote}
          </p>

          {/* Attribution */}
          <div className="mt-10 flex items-center gap-4">
            {/* Monogram */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-semibold"
              style={{
                background: "rgba(52,76,163,0.1)",
                color: "var(--hooklyne-blue)",
                border: "1px solid rgba(52,76,163,0.2)",
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
