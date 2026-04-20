export const FounderQuote = () => (
  <section className="py-14 lg:py-20" data-fade>
    <div className="container max-w-6xl">
      <div
        className="relative rounded-3xl overflow-hidden p-10 lg:p-16"
        style={{
          background: `
            radial-gradient(ellipse 70% 80% at 100% 0%, rgba(52,76,163,0.14), transparent 65%),
            radial-gradient(ellipse 60% 80% at 0% 100%, rgba(255,140,66,0.08), transparent 65%),
            linear-gradient(180deg, var(--card) 0%, var(--card-hover) 100%)
          `,
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-md)",
        }}
      >
        {/* Oversized quote glyph */}
        <div
          aria-hidden="true"
          className="absolute -top-8 -left-2 lg:-top-10 lg:-left-4 text-[12rem] lg:text-[18rem] leading-none font-serif select-none pointer-events-none"
          style={{ color: "var(--hooklyne-blue)", opacity: 0.08 }}
        >
          &ldquo;
        </div>

        <div className="relative z-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--hooklyne-blue)] mb-6">From the founder</p>
            <blockquote className="text-[1.75rem] md:text-4xl lg:text-[2.75rem] font-medium text-[var(--heading)] leading-[1.2] tracking-tight">
              Most teams can't pick between proper research and enough outreach. So they sacrifice both.{" "}
              <span className="text-[var(--hooklyne-blue)]">We built Hooklyne so they don't have to.</span>
            </blockquote>
          </div>

          <div className="lg:col-span-4">
            <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-5">
              <div
                className="relative size-16 lg:size-20 rounded-full overflow-hidden shrink-0 flex items-center justify-center text-xl font-semibold text-[var(--heading)]"
                style={{
                  background: "linear-gradient(160deg, rgba(52,76,163,0.18) 0%, rgba(13,148,136,0.12) 100%)",
                  border: "1px solid var(--border)",
                }}
              >
                T
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-base font-semibold text-[var(--heading)] tracking-tight">Tim</div>
                <div className="text-xs text-[var(--muted-foreground)] mb-3">Founder, Hooklyne</div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[var(--muted-foreground)]">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full" style={{ background: "var(--hooklyne-teal)" }}></span>
                    The Netherlands
                  </span>
                  <span>&middot;</span>
                  <span>B2B sales, EMEA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
