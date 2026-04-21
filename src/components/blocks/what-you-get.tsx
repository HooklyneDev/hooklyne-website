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

export const WhatYouGet = ({ lang = "en" }: { lang?: "en" | "nl" }) => {
  const t = lang === "nl" ? NL : EN;

  return (
    <section className="pt-14 pb-10 lg:pt-20 lg:pb-12" data-fade>
      <div className="container max-w-6xl">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-8 lg:gap-16 items-center">

          {/* Left: screenshot with ambient glow */}
          <div className="relative order-first">
            {/* Glow layers behind the image */}
            <div
              aria-hidden="true"
              className="absolute pointer-events-none"
              style={{
                inset: "-12% -8% -18% -8%",
                background:
                  "radial-gradient(ellipse 60% 55% at 50% 55%, rgba(52,76,163,0.28) 0%, rgba(52,76,163,0.10) 40%, transparent 70%)",
                filter: "blur(40px)",
                zIndex: 0,
              }}
            />
            <div
              aria-hidden="true"
              className="absolute pointer-events-none"
              style={{
                inset: "5% 20% 30% 20%",
                background:
                  "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(13,148,136,0.14) 0%, transparent 70%)",
                filter: "blur(30px)",
                zIndex: 0,
              }}
            />

            <div
              className="relative w-full rounded-2xl overflow-hidden"
              style={{
                boxShadow: "var(--shadow-xl)",
                border: "1px solid var(--border)",
                zIndex: 1,
              }}
            >
              <img
                src="/home/hooklyne-research-layer-b2b-prospecting.webp"
                alt="Hooklyne prospect detail: verified contact, signal summary, and drafted outreach ready to send"
                className="w-full h-auto block"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: text */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted-foreground)] mb-4">
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
