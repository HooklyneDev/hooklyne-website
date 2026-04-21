import { useLang } from "@/lib/use-lang";

const EN = {
  eyebrow: "What you get",
  headline: "Every prospect, fully packaged.",
  subline: "Verified contact, scored signal, drafted message - all in one card, ready to review and send.",
};

const NL = {
  eyebrow: "Wat je krijgt",
  headline: "Elke prospect, volledig samengesteld.",
  subline: "Geverifieerd contact, gescoord signaal, opgesteld bericht - alles in één kaart, klaar om te beoordelen en te versturen.",
};

export const WhatYouGet = ({ lang }: { lang?: "en" | "nl" }) => {
  const detected = useLang();
  const resolved = lang ?? detected;
  const t = resolved === "nl" ? NL : EN;

  return (
    <section className="pt-14 pb-10 lg:pt-20 lg:pb-12" data-fade>
      <div className="container max-w-6xl">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-8 lg:gap-16 items-center">

          {/* Left: screenshot with blue glow */}
          <div
            className="w-full rounded-2xl overflow-hidden order-first"
            style={{
              border: "1px solid var(--border)",
              boxShadow:
                "0 20px 60px -20px rgba(52,76,163,0.25), 0 0 100px 0 rgba(52,76,163,0.15), var(--shadow-xl)",
            }}
          >
            <img
              src="/home/hooklyne-research-layer-b2b-prospecting.webp"
              alt="Hooklyne prospect detail: verified contact, signal summary, and drafted outreach ready to send"
              className="w-full h-auto block"
              loading="lazy"
            />
          </div>

          {/* Right: text */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--hooklyne-blue)] mb-4">
              {t.eyebrow}
            </p>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-[var(--heading)] tracking-tight leading-[1.15] md:leading-[1.1] mb-5">
              {t.headline}
            </h2>
            <p className="text-base text-[var(--muted-foreground)] leading-relaxed">
              {t.subline}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
