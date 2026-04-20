export const FeatureShowcase = () => (
  <section className="py-24 lg:py-32" data-fade>
    <div className="container max-w-6xl">
      {/* Comparison block: Database / Hooklyne / Agency */}
      <div className="mb-24 lg:mb-32">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--hooklyne-orange)] mb-4">The middle option</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[var(--heading)] tracking-tight leading-[1.1]">
            Between a cheap database and a €2,500 agency.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px rounded-3xl overflow-hidden" style={{ background: "var(--border)" }}>
          <div className="p-8 lg:p-10" style={{ background: "var(--card)" }}>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted-foreground)] mb-3">Contact database</p>
            <p className="text-xl font-semibold text-[var(--heading)] mb-6 leading-tight">Rows. Nothing more.</p>
            <ul className="space-y-2.5 text-sm text-[var(--muted-foreground)]">
              <li>One data source, thin coverage</li>
              <li>No signal, no context</li>
              <li>You still write every email</li>
              <li>Bounces hurt your domain</li>
            </ul>
          </div>

          <div
            className="p-8 lg:p-10 relative"
            style={{
              background: `
                radial-gradient(ellipse 60% 40% at 50% 0%, rgba(52,76,163,0.14), transparent 70%),
                linear-gradient(180deg, var(--card) 0%, var(--card-hover) 100%)
              `,
            }}
          >
            <div className="absolute -top-3 left-8 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-white" style={{ background: "var(--hooklyne-navy)" }}>Hooklyne</div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--hooklyne-blue)] mb-3">Research layer</p>
            <p className="text-xl font-semibold text-[var(--heading)] mb-6 leading-tight">A full prospect package.</p>
            <ul className="space-y-2.5 text-sm text-[var(--foreground)]">
              <li>20+ providers, four verification layers</li>
              <li>Live signal, scored for your ICP</li>
              <li>Drafted in your voice, ready to send</li>
              <li>You keep the inbox and the reputation</li>
            </ul>
          </div>

          <div className="p-8 lg:p-10" style={{ background: "var(--card)" }}>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted-foreground)] mb-3">Outbound agency</p>
            <p className="text-xl font-semibold text-[var(--heading)] mb-6 leading-tight">€2,500+ a month.</p>
            <ul className="space-y-2.5 text-sm text-[var(--muted-foreground)]">
              <li>Replaces part of your team</li>
              <li>Sends from their domain</li>
              <li>Locked in on campaigns</li>
              <li>You lose the sender voice</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bilingual editorial block */}
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-5">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--hooklyne-teal)] mb-4">Bilingual</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[var(--heading)] tracking-tight leading-[1.1]">
            Native Dutch. Natural English.
          </h2>
        </div>
        <div className="lg:col-span-7 space-y-6">
          <p className="text-lg text-[var(--foreground)] leading-relaxed">
            Written, not translated. Dutch-to-Dutch reads differently than Dutch-to-UK, and the output knows it.
          </p>
          <p className="text-base text-[var(--muted-foreground)] leading-relaxed">
            Language is picked at prospecting from the company domain and the contact's location. Once a prospect is in, the language is locked for that package. No toggles to forget, no mixed-language awkwardness.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[var(--border)]">
            <div>
              <div className="text-4xl font-semibold text-[var(--heading)] tracking-tight">NL</div>
              <p className="text-sm text-[var(--muted-foreground)] mt-1">Direct. No small talk. Straight to the point.</p>
            </div>
            <div>
              <div className="text-4xl font-semibold text-[var(--heading)] tracking-tight">EN</div>
              <p className="text-sm text-[var(--muted-foreground)] mt-1">Warmer opening. Softer close. Adjusted per market.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
