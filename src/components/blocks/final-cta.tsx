import { ArrowRight, ShieldCheck, MapPin, FileText, RotateCcw } from "lucide-react";

export type CTAVariant = "home" | "how-it-works" | "product" | "about" | "pricing" | "faq";

type CTACopy = {
  kicker: string;
  heading: string;
  body: string;
  primaryLabel: string;
  secondaryLabel: string;
  secondaryHref: string;
};

const VARIANTS: Record<CTAVariant, CTACopy> = {
  home: {
    kicker: "Free pilot",
    heading: "Try 10 prospects, free.",
    body: "Ten fully built prospects. Verified contacts, real signals, messages in your voice. In exchange for a 20-minute feedback call.",
    primaryLabel: "Start your free pilot",
    secondaryLabel: "See pricing",
    secondaryHref: "/pricing",
  },
  "how-it-works": {
    kicker: "See it run",
    heading: "Watch the workflow on your own prospects.",
    body: "We run all six stages on ten companies you pick. You review the output live and keep it. No card, no commitment.",
    primaryLabel: "Start your free pilot",
    secondaryLabel: "Read the FAQ",
    secondaryHref: "/faq",
  },
  product: {
    kicker: "Try the product",
    heading: "Run Hooklyne on ten of your companies.",
    body: "See the portal, the prospect cards, and the drafts on real accounts from your market. Twenty minutes of feedback in return.",
    primaryLabel: "Start your free pilot",
    secondaryLabel: "See how it works",
    secondaryHref: "/how-it-works",
  },
  about: {
    kicker: "Give it a go",
    heading: "Proper research, on ten of your prospects.",
    body: "Built in the Netherlands for Dutch and UK B2B SMEs. Try it before you decide anything. Ten real packages, free.",
    primaryLabel: "Start your free pilot",
    secondaryLabel: "Read the FAQ",
    secondaryHref: "/faq",
  },
  pricing: {
    kicker: "Before you pick a plan",
    heading: "Pilot first, pay later.",
    body: "Ten fully built prospects before any card goes in. See the output on your market, then choose the tier that fits.",
    primaryLabel: "Start your free pilot",
    secondaryLabel: "See how it works",
    secondaryHref: "/how-it-works",
  },
  faq: {
    kicker: "Still have questions?",
    heading: "Best answered by the output itself.",
    body: "Ten prospects, fully built, free. See the packages on your accounts. Any question left over, we answer on the feedback call.",
    primaryLabel: "Start your free pilot",
    secondaryLabel: "See pricing",
    secondaryHref: "/pricing",
  },
};

const TRUST_SIGNALS = [
  { icon: ShieldCheck, label: "GDPR-compliant" },
  { icon: MapPin,      label: "EU-native" },
  { icon: FileText,    label: "No contract, pilot anytime" },
  { icon: RotateCcw,   label: "Cancel whenever" },
];

export const FinalCTA = ({ variant = "home" }: { variant?: CTAVariant }) => {
  const copy = VARIANTS[variant] ?? VARIANTS.home;

  return (
    <>
      {/* Trust strip */}
      <section
        className="relative"
        style={{
          background: "var(--card)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="container max-w-6xl py-4 md:py-3">
          <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-3 md:gap-0">
            {TRUST_SIGNALS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="contents md:flex md:items-center">
                  <div className="flex items-center gap-2">
                    <Icon
                      className="size-3.5 shrink-0"
                      style={{ color: "var(--muted-foreground)" }}
                      aria-hidden="true"
                    />
                    <span
                      className="text-[10px] md:text-[10.5px] font-semibold uppercase tracking-[0.2em] whitespace-nowrap"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < TRUST_SIGNALS.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="hidden md:inline mx-4 select-none"
                      style={{ color: "rgba(100,116,139,0.35)" }}
                    >
                      &middot;
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden text-white"
        data-fade
        style={{ background: "var(--hooklyne-navy)" }}
      >
        {/* Subtle light wash - soft blue lead from the top, warm hint from behind */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(52,76,163,0.45) 0%, rgba(52,76,163,0.18) 45%, transparent 80%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 40% 60% at 85% 100%, rgba(255,140,66,0.10) 0%, transparent 70%)",
          }}
        />
      <div className="container max-w-5xl py-12 lg:py-16 text-center relative z-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55 mb-4">
          {copy.kicker}
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight mb-3 leading-[1.15]">
          {copy.heading}
        </h2>
        <p className="text-sm md:text-base text-white/70 max-w-xl mx-auto mb-6 leading-relaxed">
          {copy.body}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-lg bg-white text-[var(--hooklyne-navy)] px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity group btn-shine"
          >
            {copy.primaryLabel}
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
          <a
            href={copy.secondaryHref}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/85 hover:text-white transition-colors group"
          >
            {copy.secondaryLabel}
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
    </>
  );
};
