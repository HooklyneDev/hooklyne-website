const STATS = [
  { v: "4", l: "intelligence sources" },
  { v: "20+", l: "data providers" },
  { v: "EN + NL", l: "from day one" },
  { v: "<60s", l: "per prospect package" },
];

export const StatBar = () => (
  <section className="py-14 lg:py-16 border-y border-[var(--border)]">
    <div className="container">
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-8">
        Built on
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
        {STATS.map((s) => (
          <div key={s.l} className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-[var(--heading)] tracking-tight">{s.v}</div>
            <div className="text-xs text-[var(--muted-foreground)] mt-1.5">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
