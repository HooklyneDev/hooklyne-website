import { ArrowRight, ShieldCheck, MapPin, FileText, RotateCcw } from "lucide-react";
import { useLang } from "@/lib/use-lang";

export type CTAVariant = "home" | "how-it-works" | "product" | "about" | "pricing" | "faq";

type CTACopy = {
  kicker: string;
  heading: string;
  body: string;
  primaryLabel: string;
  secondaryLabel: string;
  secondaryHref: string;
};

const EN_VARIANTS: Record<CTAVariant, CTACopy> = {
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

const NL_VARIANTS: Record<CTAVariant, CTACopy> = {
  home: {
    kicker: "Gratis pilot",
    heading: "Probeer het op tien van je eigen targets.",
    body: "Wij bouwen tien complete prospectpakketten voor jouw markt, met geverifieerde contacten, real-time koopsignalen en een eerste mail in de stem van je salesmedewerker. Geen creditcard nodig. In ruil vragen we een feedbackgesprek van 20 minuten.",
    primaryLabel: "Start je gratis pilot",
    secondaryLabel: "Bekijk prijzen",
    secondaryHref: "/nl/prijzen",
  },
  "how-it-works": {
    kicker: "Zie het zelf",
    heading: "Probeer het op je eigen prospects.",
    body: "Jij kiest tien bedrijven die voor jouw markt relevant zijn, wij draaien er alle zes de fases op uit en jij beoordeelt de output in real time. Geen creditcard, geen verplichting.",
    primaryLabel: "Start je gratis pilot",
    secondaryLabel: "Lees de FAQ",
    secondaryHref: "/nl/faq",
  },
  product: {
    kicker: "Probeer het product",
    heading: "Hooklyne op tien van je eigen targets.",
    body: "Klik door het portaal, bekijk de prospectkaarten en lees de drafts op echte accounts uit jouw markt. In ruil vragen we twintig minuten feedback.",
    primaryLabel: "Start je gratis pilot",
    secondaryLabel: "Zie hoe het werkt",
    secondaryHref: "/nl/hoe-het-werkt",
  },
  about: {
    kicker: "Probeer het",
    heading: "Onderzoek dat klopt, op je eigen prospects.",
    body: "Hooklyne is gemaakt in Nederland voor Nederlands en Brits B2B-MKB. Probeer het eerst en beslis daarna: tien complete pakketten kosten je niks.",
    primaryLabel: "Start je gratis pilot",
    secondaryLabel: "Lees de FAQ",
    secondaryHref: "/nl/faq",
  },
  pricing: {
    kicker: "Voor je een abonnement kiest",
    heading: "Eerst pilot, dan betalen.",
    body: "Je krijgt tien complete prospectpakketten voordat een creditcard nodig is. Bekijk de output op jouw markt en kies daarna het abonnement dat bij je past.",
    primaryLabel: "Start je gratis pilot",
    secondaryLabel: "Zie hoe het werkt",
    secondaryHref: "/nl/hoe-het-werkt",
  },
  faq: {
    kicker: "Nog vragen?",
    heading: "De output spreekt voor zich.",
    body: "Tien complete prospectpakketten op je eigen accounts, helemaal gratis. Vragen die daarna nog overblijven, beantwoorden we in het feedbackgesprek na afloop.",
    primaryLabel: "Start je gratis pilot",
    secondaryLabel: "Bekijk prijzen",
    secondaryHref: "/nl/prijzen",
  },
};

const EN_TRUST = [
  { icon: ShieldCheck, label: "GDPR-compliant" },
  { icon: MapPin,      label: "EU-native" },
  { icon: FileText,    label: "No contract, pilot anytime" },
  { icon: RotateCcw,   label: "Cancel whenever" },
];

const NL_TRUST = [
  { icon: ShieldCheck, label: "AVG-proof" },
  { icon: MapPin,      label: "EU-gevestigd" },
  { icon: FileText,    label: "Geen contract" },
  { icon: RotateCcw,   label: "Altijd opzegbaar" },
];

export const FinalCTA = ({ variant = "home" }: { variant?: CTAVariant }) => {
  const lang = useLang();
  const VARIANTS = lang === "nl" ? NL_VARIANTS : EN_VARIANTS;
  const TRUST_SIGNALS = lang === "nl" ? NL_TRUST : EN_TRUST;
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
