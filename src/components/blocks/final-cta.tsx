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
    heading: "Pilot first. Pay later.",
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
    <section
      className="relative overflow-hidden text-white"
      data-fade
      style={{
        background: `
          radial-gradient(ellipse 55% 70% at 15% 0%, rgba(52,76,163,0.55), transparent 65%),
          radial-gradient(ellipse 45% 70% at 100% 100%, rgba(13,148,136,0.30), transparent 65%),
          radial-gradient(ellipse 40% 70% at 70% 0%, rgba(255,140,66,0.14), transparent 65%),
          linear-gradient(135deg, var(--hooklyne-navy) 0%, #021f37 100%)
        `,
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.18), transparent)" }}
      />

      <div className="container max-w-5xl py-16 lg:py-24 text-center relative z-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55 mb-5">
          {copy.kicker}
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-4 leading-[1.1]">
          {copy.heading}
        </h2>
        <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">
          {copy.body}
        </p>

        {/* Trust strip - liquid glass */}
        <div
          className="inline-flex flex-col md:flex-row items-center gap-2.5 md:gap-0 rounded-full px-5 md:px-6 py-3 md:py-2.5 mb-6"
          style={{
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)",
            border: "1px solid rgba(255,255,255,0.14)",
            boxShadow:
              "0 1px 0 0 rgba(255,255,255,0.12) inset, 0 -1px 0 0 rgba(0,0,0,0.15) inset, 0 8px 24px -8px rgba(0,0,0,0.3)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          {TRUST_SIGNALS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="contents md:flex md:items-center">
                <div className="flex items-center gap-1.5">
                  <Icon className="size-3.5 text-white/55 shrink-0" aria-hidden="true" />
                  <span className="text-[10px] md:text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/70 whitespace-nowrap">
                    {s.label}
                  </span>
                </div>
                {i < TRUST_SIGNALS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden md:inline text-white/25 mx-3 select-none"
                  >
                    &middot;
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-lg bg-white text-[var(--hooklyne-navy)] px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity group btn-shine"
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
  );
};
