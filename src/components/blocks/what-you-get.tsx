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
    <section className="py-14 lg:py-20" data-fade>
      <div className="container max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left: screenshot */}
          <div
            className="w-full rounded-2xl overflow-hidden order-first"
            style={{
              boxShadow: "var(--shadow-xl)",
              border: "1px solid var(--border)",
            }}
          >
            <img
              src="/home/hooklyne-personalized-outreach-email.webp"
              alt="Hooklyne prospect detail: verified contact, signal summary, and drafted outreach ready to send"
              className="w-full h-auto block"
              loading="lazy"
            />
          </div>

          {/* Right: text */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted-foreground)] mb-4">
              {t.eyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[var(--heading)] tracking-tight leading-[1.1] mb-5">
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
