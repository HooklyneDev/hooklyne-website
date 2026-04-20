export const FounderQuote = () => (
  <section className="py-24 lg:py-32" data-fade>
    <div className="container max-w-6xl">
      <div className="max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--hooklyne-blue)] mb-6">From the founder</p>
        <blockquote className="text-3xl md:text-4xl lg:text-5xl font-medium text-[var(--heading)] leading-[1.2] tracking-tight">
          Most teams can't pick between proper research and enough outreach. So they sacrifice both. We built Hooklyne so they don't have to.
        </blockquote>
        <div className="mt-10 flex items-center gap-4">
          <div className="h-px w-12 bg-[var(--border-strong)]"></div>
          <div>
            <div className="text-sm font-semibold text-[var(--heading)]">Tim</div>
            <div className="text-xs text-[var(--muted-foreground)]">Founder, Hooklyne</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
