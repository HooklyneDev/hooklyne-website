import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    name: "Start",
    sub: "Solo rep. Test and validate your outbound.",
    monthly: 49,
    annual: 39,
    save: 10,
    credits: 100,
    seats: "1",
    signalTracking: "Up to 10",
    signalTrackingOpen: false,
    topup: "€0.85/cr",
    highlighted: false,
    cta: "Get started",
    features: [
      "100 credits / mo",
      "1 seat",
      "Find companies + contacts",
      "Outreach in NL + EN",
      "Weekly market briefing",
      "Meeting prep briefs",
    ],
  },
  {
    name: "Growth",
    sub: "1–2 reps. Full pipeline. Everything included.",
    monthly: 159,
    annual: 129,
    save: 30,
    credits: 400,
    seats: "2",
    signalTracking: "Up to 40",
    signalTrackingOpen: true,
    topup: "€0.85/cr",
    highlighted: true,
    cta: "Get started",
    features: [
      "400 credits / mo",
      "2 seats",
      "Find companies + contacts",
      "Outreach in NL + EN",
      "Weekly market briefing",
      "Meeting prep briefs",
      "45-min setup + strategy call",
      "ICP configured with you",
    ],
  },
  {
    name: "Scale",
    sub: "Small sales team. Volume outbound. Up to 5 reps.",
    monthly: 299,
    annual: 239,
    save: 60,
    credits: 800,
    seats: "5",
    signalTracking: "Up to 100",
    signalTrackingOpen: true,
    topup: "€0.85/cr",
    highlighted: false,
    cta: "Get started",
    features: [
      "800 credits / mo",
      "5 seats",
      "Find companies + contacts",
      "Outreach in NL + EN",
      "Weekly market briefing",
      "Meeting prep briefs",
      "Full setup + team training",
      "Dedicated Slack or WhatsApp",
    ],
  },
  {
    name: "Enterprise",
    sub: "Sales departments. Multi-market. Custom volumes.",
    monthly: null,
    annual: null,
    save: null,
    credits: null,
    seats: "Unlimited",
    signalTracking: "Negotiated",
    signalTrackingOpen: true,
    topup: "Custom rate",
    highlighted: false,
    cta: "Talk to us",
    features: [
      "Custom credit volume",
      "Unlimited seats",
      "Find companies + contacts",
      "Outreach in NL + EN",
      "Weekly market briefing",
      "Meeting prep briefs",
      "Full setup + team training",
      "Dedicated account manager",
    ],
  },
];

export const HomePricing = () => {
  const [annual, setAnnual] = useState(true);

  return (
    <section className="py-20 lg:py-28" data-fade>
      <div className="container max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--heading)] tracking-tight mb-4">
            Simple pricing
          </h2>
          <p className="text-base text-[var(--muted-foreground)]">
            One credit system. Every action priced transparently. Switch plans or cancel anytime.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className={cn("text-sm font-medium transition-colors", !annual ? "text-[var(--heading)]" : "text-[var(--muted-foreground)]")}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className="relative w-12 h-6 rounded-full transition-colors btn-shine"
            style={{ background: annual ? "var(--hooklyne-navy)" : "var(--border-strong)" }}
            aria-label="Toggle billing"
          >
            <span
              className="absolute top-0.5 left-0.5 size-5 rounded-full bg-white transition-transform duration-200 shadow-sm"
              style={{ transform: annual ? "translateX(24px)" : "translateX(0)" }}
            />
          </button>
          <span className={cn("text-sm font-medium flex items-center gap-2 transition-colors", annual ? "text-[var(--heading)]" : "text-[var(--muted-foreground)]")}>
            Annual
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(13,148,136,0.10)", color: "var(--hooklyne-teal)" }}>
              Save up to €60/mo
            </span>
          </span>
        </div>

        {/* Plans */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((p) => {
            const price = p.monthly == null ? "Custom" : `€${annual ? p.annual : p.monthly}`;
            const isFeatured = p.highlighted;
            return (
              <div
                key={p.name}
                className={cn(
                  "rounded-2xl p-5 flex flex-col relative",
                  isFeatured
                    ? "text-white"
                    : "bg-[var(--card)]",
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

                {/* Tier */}
                <p className={cn("text-xs font-semibold uppercase tracking-widest mb-3 mt-1", isFeatured ? "text-white/40" : "text-[var(--muted-foreground)]")}>
                  {p.name}
                </p>

                {/* Price */}
                <div className="mb-1">
                  <span className={cn("text-3xl font-bold", isFeatured ? "text-white" : "text-[var(--heading)]")}>{price}</span>
                  {p.monthly != null && <span className={cn("text-sm ml-1", isFeatured ? "text-white/40" : "text-[var(--muted-foreground)]")}>/mo</span>}
                </div>

                {/* Save note */}
                <div className="h-5 mb-2">
                  {p.save && annual && (
                    <span className={cn("text-xs font-medium", isFeatured ? "text-green-300" : "text-[var(--hooklyne-teal)]")}>
                      Save €{p.save}/mo on annual
                    </span>
                  )}
                  {p.save && !annual && (
                    <span className={cn("text-xs", isFeatured ? "text-white/40" : "text-[var(--muted-foreground)]")}>Billed monthly</span>
                  )}
                </div>

                <p className={cn("text-xs leading-relaxed mb-4", isFeatured ? "text-white/50" : "text-[var(--muted-foreground)]")}>{p.sub}</p>

                {/* Credit count */}
                {p.credits && (
                  <div
                    className="flex items-baseline gap-2 rounded-xl px-3 py-2.5 mb-4"
                    style={{ background: isFeatured ? "rgba(255,255,255,0.08)" : "var(--background)" }}
                  >
                    <span className={cn("text-2xl font-bold", isFeatured ? "text-blue-300" : "text-[var(--hooklyne-blue)]")}>{p.credits}</span>
                    <span className={cn("text-xs", isFeatured ? "text-white/40" : "text-[var(--muted-foreground)]")}>credits / month</span>
                  </div>
                )}

                {/* Features */}
                <ul className="flex-1 space-y-2 mb-5">
                  {p.features.map((f) => (
                    <li key={f} className={cn("flex items-start gap-2 text-xs", isFeatured ? "text-white/70" : "text-[var(--muted-foreground)]")}>
                      <Check className={cn("size-3.5 shrink-0 mt-0.5", isFeatured ? "text-green-300" : "text-[var(--hooklyne-teal)]")} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Top-up note */}
                <p className={cn("text-xs mb-4", isFeatured ? "text-white/30" : "text-[var(--muted-foreground)]/60")}>
                  Top-up: {p.topup}
                </p>

                {/* CTA */}
                <a
                  href="/contact"
                  className={cn(
                    "block text-center rounded-lg text-sm font-semibold py-2.5 transition-all btn-shine",
                    isFeatured
                      ? "bg-white/14 text-white border border-white/22 hover:bg-white/24"
                      : "ring-1 ring-[var(--hooklyne-navy)] text-[var(--heading)] hover:bg-[var(--hooklyne-navy)] hover:text-white",
                  )}
                >
                  {p.cta}
                </a>
              </div>
            );
          })}
        </div>

        {/* Credit table */}
        <div className="mt-12 rounded-2xl bg-[var(--card)] overflow-hidden" style={{ boxShadow: "var(--shadow-sm)" }}>
          <div className="px-6 py-5 border-b border-[var(--border)]">
            <h3 className="text-base font-semibold text-[var(--heading)]">What each credit gets you</h3>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">Every credit maps to a clear deliverable. Browsing, reading signals, and viewing intel are always free.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)]" style={{ background: "var(--background)" }}>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Action</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] hidden sm:table-cell">What you get</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--hooklyne-blue)]">Credits</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Company discovery", "Up to 20 ranked companies, ICP-filtered, with signal hooks", "1cr"],
                  ["View matched roles", "Up to 3 decision-makers per company", "Free"],
                  ["Prospect package", "News-hooked email + LinkedIn message, NL or EN, in your voice", "1cr"],
                  ["Contact finding", "Verified email, triple-checked across 20+ sources", "2cr"],
                  ["Signal tracking", "Daily sweeps: job posts, news, funding. Scored and ranked.", "2cr / company / mo"],
                  ["Meeting prep brief", "Company overview, talking points, key people, recent news", "1cr"],
                  ["Weekly sector briefing", "5–10 articles from your market, scored for relevance", "Included"],
                  ["Export to CSV", "Full export of your leads and signals", "Free"],
                ].map(([action, desc, cost]) => {
                  const isFree = cost === "Free" || cost === "Included";
                  return (
                    <tr key={action} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--card-hover)] transition-colors">
                      <td className="px-6 py-3.5 font-medium text-[var(--foreground)] whitespace-nowrap">{action}</td>
                      <td className="px-6 py-3.5 text-[var(--muted-foreground)] hidden sm:table-cell">{desc}</td>
                      <td className="px-6 py-3.5 text-right">
                        <span
                          className={cn("text-sm font-semibold", isFree ? "text-[var(--hooklyne-teal)]" : "text-[var(--hooklyne-blue)]")}
                        >
                          {cost}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center mt-8">
          <a href="/pricing" className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--hooklyne-blue)] hover:opacity-80 transition-opacity group">
            Full pricing breakdown and FAQ
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
