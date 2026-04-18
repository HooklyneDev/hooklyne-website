import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    name: "Start",
    sub: "Best for solo reps and founders.",
    monthly: 59,
    annual: 53,
    features: ["75 credits / month", "1 seat", "Email digest signals", "Weekly sector news", "Self-serve onboarding"],
    highlighted: false,
  },
  {
    name: "Growth Smarter",
    sub: "Best for teams with consistent outbound.",
    monthly: 149,
    annual: 134,
    features: ["150 credits / month", "2 seats", "Real-time signals", "10 discovery / mo", "Onboarding call", "€1.20 overage"],
    highlighted: true,
  },
];

export const HomePricing = () => {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="py-20 lg:py-28 border-t border-[var(--border)]">
      <div className="container max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--heading)] tracking-tight mb-4">
            Pricing
          </h2>
          <p className="text-base text-[var(--muted-foreground)]">Switch plans or cancel anytime.</p>
        </div>

        <div className="flex items-center justify-center gap-3 mb-10">
          <span className={cn("text-sm font-medium", !annual ? "text-[var(--heading)]" : "text-[var(--muted-foreground)]")}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className="relative w-12 h-6 rounded-full transition-colors"
            style={{ background: "var(--hooklyne-navy)" }}
            aria-label="Toggle billing"
          >
            <span
              className="absolute top-0.5 left-0.5 size-5 rounded-full bg-white transition-transform"
              style={{ transform: annual ? "translateX(24px)" : "translateX(0)" }}
            />
          </button>
          <span className={cn("text-sm font-medium flex items-center gap-1.5", annual ? "text-[var(--heading)]" : "text-[var(--muted-foreground)]")}>
            Annual
            <span className="text-xs font-semibold text-[var(--hooklyne-teal)] bg-[var(--hooklyne-teal)]/10 px-1.5 py-0.5 rounded-full">Save 10%</span>
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={cn(
                "rounded-2xl p-7 flex flex-col relative",
                p.highlighted
                  ? "border-2 border-[var(--hooklyne-navy)] bg-[var(--card)]"
                  : "border border-[var(--border)] bg-[var(--card)]",
              )}
              style={{ boxShadow: p.highlighted ? "var(--shadow-lg)" : "var(--shadow-xs)" }}
            >
              {p.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--hooklyne-navy)] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Popular
                </div>
              )}
              <p className="text-sm font-semibold text-[var(--heading)] mb-1">{p.name}</p>
              <p className="text-xs text-[var(--muted-foreground)] mb-5">{p.sub}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[var(--heading)]">€{annual ? p.annual : p.monthly}</span>
                <span className="text-sm text-[var(--muted-foreground)] ml-1">/mo</span>
              </div>
              <ul className="flex-1 space-y-2.5 mb-7">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[var(--muted-foreground)]">
                    <Check className="size-4 text-[var(--hooklyne-teal)] shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="/contact"
                className={cn(
                  "block text-center rounded-lg text-sm font-semibold py-2.5 transition-colors",
                  p.highlighted
                    ? "bg-[var(--hooklyne-navy)] text-white hover:opacity-90"
                    : "border border-[var(--hooklyne-navy)] text-[var(--hooklyne-navy)] dark:text-[var(--foreground)] dark:border-[var(--foreground)]/40 hover:bg-[var(--hooklyne-navy)] hover:text-white",
                )}
              >
                Get started
              </a>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a href="/pricing" className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--hooklyne-blue)] hover:opacity-80 transition-opacity">
            See Scale and Enterprise plans
            <ArrowRight className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
