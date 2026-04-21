import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    name: "Start",
    from: 39,
    credits: 100,
    sub: "Solo rep. Test and validate your outbound.",
    highlighted: false,
  },
  {
    name: "Growth",
    from: 129,
    credits: 400,
    sub: "1-2 reps. Full pipeline. Everything included.",
    highlighted: true,
  },
  {
    name: "Scale",
    from: 239,
    credits: 800,
    sub: "Small sales team. Up to 5 reps.",
    highlighted: false,
  },
];

export const HomePricing = () => {
  return (
    <section className="pt-10 pb-14 lg:pt-12 lg:pb-20" data-fade>
      <div className="container max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl md:text-4xl font-semibold text-[var(--heading)] tracking-tight mb-4">
            Simple pricing.
          </h2>
          <p className="text-sm md:text-base text-[var(--muted-foreground)]">
            Simple credit system. Every action priced transparently. Switch plans or cancel anytime.
          </p>
        </div>

        {/* Plans */}
        <div className="grid gap-4 md:grid-cols-3">
          {PLANS.map((p) => {
            const isFeatured = p.highlighted;
            return (
              <div
                key={p.name}
                className={cn(
                  "rounded-2xl p-5 md:p-6 flex flex-col relative",
                  isFeatured ? "text-white" : "bg-[var(--card)]",
                )}
                style={{
                  background: isFeatured ? "var(--hooklyne-navy)" : undefined,
                  boxShadow: isFeatured ? "var(--shadow-xl)" : "var(--shadow-xs)",
                }}
              >
                {isFeatured && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap"
                    style={{ background: "var(--hooklyne-orange)" }}
                  >
                    Recommended
                  </div>
                )}

                <p className={cn("text-xs font-semibold uppercase tracking-widest mb-3 mt-1", isFeatured ? "text-white/40" : "text-[var(--muted-foreground)]")}>
                  {p.name}
                </p>

                <div className="mb-2 flex items-baseline gap-1">
                  <span className={cn("text-xs", isFeatured ? "text-white/50" : "text-[var(--muted-foreground)]")}>from</span>
                  <span className={cn("text-3xl font-bold", isFeatured ? "text-white" : "text-[var(--heading)]")}>€{p.from}</span>
                  <span className={cn("text-sm", isFeatured ? "text-white/50" : "text-[var(--muted-foreground)]")}>/mo</span>
                </div>

                <div
                  className="flex items-baseline gap-2 rounded-xl px-3 py-2 mb-4"
                  style={{ background: isFeatured ? "rgba(255,255,255,0.08)" : "var(--background)" }}
                >
                  <span className={cn("text-lg font-bold", isFeatured ? "text-blue-300" : "text-[var(--hooklyne-blue)]")}>{p.credits}</span>
                  <span className={cn("text-xs", isFeatured ? "text-white/50" : "text-[var(--muted-foreground)]")}>credits / month</span>
                </div>

                <p className={cn("text-sm leading-relaxed", isFeatured ? "text-white/70" : "text-[var(--muted-foreground)]")}>
                  {p.sub}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/pricing"
            className="inline-flex items-center gap-1.5 h-11 px-6 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90 btn-shine group"
            style={{ background: "var(--hooklyne-navy)" }}
          >
            See full pricing
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--hooklyne-blue)] transition-colors group"
          >
            Or start a free pilot
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Founder note */}
        <div className="mt-12 pt-8 border-t border-[var(--border)] max-w-xl mx-auto text-center">
          <p className="text-sm text-[var(--muted-foreground)] leading-relaxed italic">
            &ldquo;Most teams can&rsquo;t pick between proper research and enough outreach, so they sacrifice both. We built Hooklyne so they don&rsquo;t have to.&rdquo;
          </p>
          <p className="mt-3 text-xs text-[var(--muted-foreground)]">
            Tim · Founder, Hooklyne
          </p>
        </div>

      </div>
    </section>
  );
};
