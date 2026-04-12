export const Logos = () => {
  return (
    <section className="pb-16 lg:pb-20">
      <div className="container">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] px-8 py-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-6">
            Built for Dutch B2B sales teams
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {[
              "10-50 person teams",
              "1-3 sales reps",
              "Dutch and English",
              "No SDR needed",
              "Under €500/month",
            ].map((label) => (
              <span
                key={label}
                className="text-sm font-medium text-[var(--muted-foreground)] border border-[var(--border)] rounded-full px-4 py-1.5"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
