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

  // Subtle scroll-driven tilt: matches the hero screenshot motion.
  // Disabled when the user prefers reduced motion.
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
        <div className="grid lg:grid-cols-[3fr_2fr] gap-8 lg:gap-16 items-center">

          {/* Left: screenshot with blue glow + scroll-tilt */}
          <div
            ref={shotRef}
            className="w-full rounded-2xl overflow-hidden order-first"
            style={{
              border: "1px solid var(--border)",
              boxShadow:
                "0 20px 60px -20px rgba(52,76,163,0.25), 0 0 100px 0 rgba(52,76,163,0.15), var(--shadow-xl)",
              transformOrigin: "center bottom",
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
