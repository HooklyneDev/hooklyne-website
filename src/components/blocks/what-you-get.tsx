import { useEffect, useRef } from "react";
import { useLang, type Lang } from "@/lib/use-lang";

const EN = {
  eyebrow: "What you get",
  headline: (
    <>Every prospect, <span className="text-accent">fully packaged</span>.</>
  ),
  subline: "Verified contact, scored signal, drafted message - all in one card, ready to review and send.",
};

const NL = {
  eyebrow: "Wat je krijgt",
  headline: (
    <>Elke prospect, <span className="text-accent">compleet samengesteld</span>.</>
  ),
  subline: "Geverifieerd contact, gescoord signaal en een opgestelde mail. Alles op één plek, klaar om te beoordelen en te versturen.",
};

export const WhatYouGet = ({ lang: langProp }: { lang?: Lang } = {}) => {
  const lang = useLang(langProp);
  const t = lang === "nl" ? NL : EN;
  const shotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = shotRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let ticking = false;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const prog = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.9)));
      const deg = 14 * (1 - prog);
      el.style.transform = `perspective(1100px) rotateX(${deg}deg)`;
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="pt-14 pb-10 lg:pt-20 lg:pb-12" data-fade>
      <div className="container max-w-6xl">

        {/* Text */}
        <div className="max-w-4xl mx-auto text-center mb-8 lg:mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--hooklyne-blue)] mb-4">
            {t.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[var(--heading)] tracking-tight leading-[1.1] mb-4">
            {t.headline}
          </h2>
          <p className="text-base text-[var(--muted-foreground)] leading-relaxed max-w-xl mx-auto">
            {t.subline}
          </p>
        </div>

        {/* Screenshot: brand-color glow layer bleeds behind the frame */}
        <div className="max-w-4xl mx-auto" style={{ position: "relative" }}>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "-40px -60px",
              background:
                "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(52,76,163,0.18) 0%, rgba(52,76,163,0.06) 50%, transparent 75%)",
              filter: "blur(24px)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
          <div
            ref={shotRef}
            className="w-full rounded-2xl overflow-hidden"
            style={{
              position: "relative",
              zIndex: 1,
              border: "1px solid var(--border)",
              boxShadow:
                "0 30px 80px -20px rgba(52,76,163,0.22), 0 0 0 1px rgba(52,76,163,0.08), var(--shadow-xl)",
              transformOrigin: "center top",
              willChange: "transform",
            }}
          >
            <picture>
              <source srcSet="/home/dashboard.webp" type="image/webp" />
              <img
                src="/home/dashboard.jpg"
                alt="Hooklyne dashboard: daily focus actions, signal heat for top prospects, and market intel headlines"
                className="w-full h-auto block"
                loading="lazy"
                decoding="async"
                width={1600}
                height={990}
              />
            </picture>
          </div>
        </div>

      </div>
    </section>
  );
};
