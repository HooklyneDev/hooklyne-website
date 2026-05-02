import { useEffect, useRef } from "react";
import { useLang, type Lang } from "@/lib/use-lang";

const EN = {
  eyebrow: "What you get",
  headline: (
    <>Every prospect, <span style={{ color: "var(--hooklyne-orange)" }}>fully packaged</span>.</>
  ),
  subline: "Verified contact, scored signal, drafted message - all in one card, ready to review and send.",
};

const NL = {
  eyebrow: "Wat je krijgt",
  headline: (
    <>Elke prospect, <span style={{ color: "var(--hooklyne-orange)" }}>compleet samengesteld</span>.</>
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
    <section className="pt-14 pb-16 lg:pt-20 lg:pb-24" data-fade>
      <div className="container max-w-6xl">

        {/* Text */}
        <div className="max-w-2xl mb-10 lg:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: "var(--hooklyne-orange)" }}>
            {t.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1] mb-4" style={{ color: "#fff" }}>
            {t.headline}
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
            {t.subline}
          </p>
        </div>

        {/* Screenshot: glow layer behind, tilt on top */}
        <div style={{ position: "relative" }}>
          {/* Bleeding brand-color glow — extends beyond the screenshot edges */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "-60px -80px",
              background:
                "radial-gradient(ellipse 75% 55% at 50% 65%, rgba(52,76,163,0.65) 0%, rgba(52,76,163,0.25) 45%, transparent 75%)",
              filter: "blur(32px)",
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
              border: "1px solid rgba(52,76,163,0.35)",
              boxShadow:
                "0 0 0 1px rgba(52,76,163,0.15), 0 40px 80px -20px rgba(2,15,30,0.7)",
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
