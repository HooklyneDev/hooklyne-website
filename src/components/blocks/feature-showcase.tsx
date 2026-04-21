export const FeatureShowcase = () => (
  <section className="py-14 lg:py-20" data-fade>
    <div className="container max-w-6xl">
      {/* Bilingual block */}
      <div
        className="relative rounded-3xl overflow-hidden p-8 lg:p-14"
        style={{
          background: `
            radial-gradient(ellipse 60% 80% at 0% 0%, rgba(13,148,136,0.10), transparent 60%),
            radial-gradient(ellipse 60% 80% at 100% 100%, rgba(52,76,163,0.10), transparent 60%),
            linear-gradient(180deg, var(--card) 0%, var(--card-hover) 100%)
          `,
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-md)",
        }}
      >
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start relative z-10">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--hooklyne-teal)] mb-4">Bilingual</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[var(--heading)] tracking-tight leading-[1.1] mb-5">
              Native Dutch.<br />Natural English.
            </h2>
            <p className="text-base text-[var(--muted-foreground)] leading-relaxed max-w-sm">
              Written, not translated. Language is locked per prospect from the domain and contact location. No mixed-language awkwardness.
            </p>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            <div
              className="rounded-2xl p-6 relative overflow-hidden"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2">
                  <div
                    className="flex items-center justify-center size-8 rounded-lg text-xs font-bold text-white tracking-wider"
                    style={{ background: "var(--hooklyne-navy)" }}
                  >
                    NL
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">Dutch</span>
                </div>
                <span className="text-[10px] font-mono text-[var(--muted-foreground)]">nl-NL</span>
              </div>
              <p className="text-[15px] text-[var(--heading)] leading-relaxed font-medium mb-3">
                "Direct, zonder omwegen. Recht op het punt."
              </p>
              <ul className="space-y-1.5 text-xs text-[var(--muted-foreground)]">
                <li>&middot; No small talk</li>
                <li>&middot; Short openers</li>
                <li>&middot; Specific asks</li>
              </ul>
            </div>

            <div
              className="rounded-2xl p-6 relative overflow-hidden"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2">
                  <div
                    className="flex items-center justify-center size-8 rounded-lg text-xs font-bold text-white tracking-wider"
                    style={{ background: "var(--hooklyne-blue)" }}
                  >
                    EN
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">English</span>
                </div>
                <span className="text-[10px] font-mono text-[var(--muted-foreground)]">en-GB</span>
              </div>
              <p className="text-[15px] text-[var(--heading)] leading-relaxed font-medium mb-3">
                "Warmer opening. Softer close. Adjusted per market."
              </p>
              <ul className="space-y-1.5 text-xs text-[var(--muted-foreground)]">
                <li>&middot; Contextual opener</li>
                <li>&middot; Light reasoning</li>
                <li>&middot; Polite close</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
