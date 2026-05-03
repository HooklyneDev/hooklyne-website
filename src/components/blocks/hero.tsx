import { useEffect, useRef } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { GridSignals } from "@/components/grid-signals";
import { useLang, type Lang } from "@/lib/use-lang";

const EN = {
  pill: "For B2B founders and sales reps",
  headline: (
    <>Find the prospects <span className="text-accent">actually worth</span> reaching out to.</>
  ),
  sub: "A research workflow that finds fitting companies, verifies decision-makers across 21 data providers, watches for live buying signals, and drafts first outreach in your rep's voice.",
  cta: "Try for free",
  secondary: "See how it works",
};

const NL = {
  pill: "Voor B2B-founders en sales reps",
  headline: (
    <>Vind de prospects die er <span className="text-accent">echt toe doen</span>.</>
  ),
  sub: "Een onderzoeksworkflow die relevante bedrijven identificeert, besluitvormers verifieert via 21 databronnen, real-time koopsignalen volgt en eerste outreach opstelt in de schrijfstijl van jouw salesmedewerker.",
  cta: "Probeer gratis",
  secondary: "Zie hoe het werkt",
};

/* ── Component ──────────────────────────────────────────────────────── */
export const Hero = ({ lang: langProp }: { lang?: Lang } = {}) => {
  const lang = useLang(langProp);
  const t = lang === "nl" ? NL : EN;
  const screenshotRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  /* Scroll tilt - batched with paint via rAF to avoid forced reflows */
  useEffect(() => {
    const el = screenshotRef.current;
    if (!el) return;
    /* Promote the element to its own compositor layer immediately so
       the rotateX update never triggers a CPU repaint. */
    el.style.willChange = "transform";
    let ticking = false;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh   = window.innerHeight;
      const prog = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.9)));
      const deg  = 22 * (1 - prog);
      /* perspective on the parent (set once in JSX), only rotateX here —
         this keeps the transform compositor-only with no paint. */
      el.style.transform = `rotateX(${deg}deg)`;
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      el.style.willChange = "auto";
    };
  }, []);

  /* Hero video playback. Three things going on:
     1. Respect prefers-reduced-motion: skip autoplay entirely, show poster.
     2. Force-play after canplay: browsers occasionally ignore the HTML
        autoplay attribute on first visit (no buffer yet, autoplay policy).
     3. Pause when scrolled out of view: saves CPU/battery on mobile. */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      v.removeAttribute("autoplay");
      v.pause();
      return;
    }

    const tryPlay = () => v.play().catch(() => { /* user-gesture required, give up silently */ });
    if (v.readyState >= 3) tryPlay();
    else v.addEventListener("canplay", tryPlay, { once: true });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      });
    }, { threshold: 0.15 });
    io.observe(v);

    return () => {
      io.disconnect();
      v.removeEventListener("canplay", tryPlay);
    };
  }, []);

  const ringMask = "linear-gradient(to bottom, transparent 0%, black 9%, black 55%, transparent 72%)";
  const rings = [150, 300, 450, 600, 750, 900, 1050]
    .map((r, i) => {
      const opacity = 0.16 - i * 0.015;
      return `radial-gradient(circle at 50% 35%, transparent ${r - 1}px, rgba(52,76,163,${opacity.toFixed(3)}) ${r}px, transparent ${r + 1}px)`;
    })
    .join(", ");

  return (
    <section className="pt-28 pb-0 lg:pt-32 relative">

      {/* ── Mobile: breathing circle ───────────────────────────────── */}
      <div className="sm:hidden absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="hero-mobile-pulse" />
      </div>

      {/* ── Desktop: centre glow ──────────────────────────────────── */}
      <div
        className="hidden sm:block absolute inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background: "radial-gradient(ellipse 50% 38% at 50% 30%, rgba(52,76,163,0.28) 0%, rgba(52,76,163,0.10) 50%, transparent 72%)",
          maskImage: ringMask,
          WebkitMaskImage: ringMask,
        }}
      />

      {/* ── Desktop: radar sweep ─────────────────────────────────── */}
      <div
        className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 1, maskImage: ringMask, WebkitMaskImage: ringMask }}
      >
        <div
          className="hero-radar"
          style={{
            position: "absolute",
            left: "50%",
            top: "35%",
            width: "1100px",
            height: "1100px",
            borderRadius: "50%",
            background: "conic-gradient(from 0deg, transparent 0deg, rgba(52,76,163,0.13) 12deg, rgba(52,76,163,0.22) 18deg, rgba(52,76,163,0.13) 24deg, transparent 36deg, transparent 360deg)",
          }}
        />
      </div>

      {/* ── Desktop: concentric rings ─────────────────────────────── */}
      <div
        className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          zIndex: 2,
          backgroundImage: rings,
          maskImage: ringMask,
          WebkitMaskImage: ringMask,
        }}
      />

      {/* ── Desktop: grid signal pulses ───────────────────────────── */}
      <div className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 5 }}>
        <GridSignals />
      </div>

      {/* ── Directional edge light — left ─────────────────────────── */}
      <div
        className="hidden sm:block absolute inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background: "radial-gradient(ellipse 60% 50% at -5% 55%, rgba(52,76,163,0.09) 0%, transparent 65%)",
        }}
      />

      {/* ── Directional edge light — right ────────────────────────── */}
      <div
        className="hidden sm:block absolute inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background: "radial-gradient(ellipse 55% 45% at 105% 60%, rgba(52,76,163,0.07) 0%, transparent 65%)",
        }}
      />

      {/* Vignette + bottom fade removed: they painted slate/white
          over the body's gradient wash and produced a visible seam
          above the signal ticker. Page wash now flows uninterrupted. */}

      {/* ── Hero copy ─────────────────────────────────────────────── */}
      <div id="hero-content" className="relative z-10 container flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">

        <a
          href={lang === "nl" ? "/nl/contact" : "/contact"}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-1.5 text-sm font-medium text-[var(--heading)] hover:border-[var(--hooklyne-blue)] transition-colors"
          style={{ animation: "hero-fade-up 0.5s ease both", animationDelay: "0ms" }}
        >
          {t.pill}
          <ArrowRight className="size-3.5" />
        </a>

        <h1
          className="hero-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-[var(--heading)] leading-[1.15] sm:leading-[1.1] max-w-3xl"
          style={{ animation: "hero-fade-up 0.55s ease both", animationDelay: "90ms" }}
        >
          {t.headline}
        </h1>

        <p
          className="text-base md:text-lg text-[var(--muted-foreground)] max-w-xl leading-relaxed px-2 sm:px-0"
          style={{ animation: "hero-fade-up 0.55s ease both", animationDelay: "200ms" }}
        >
          {t.sub}
        </p>

        <div
          className="flex flex-wrap items-center justify-center gap-4 mt-2"
          style={{ animation: "hero-fade-up 0.55s ease both", animationDelay: "310ms" }}
        >
          <Button asChild className="h-11 px-6 text-sm font-semibold rounded-lg group btn-shine" style={{ backgroundColor: "var(--hooklyne-navy)", color: "#ffffff" }}>
            <a href={lang === "nl" ? "/nl/contact" : "/contact"}>
              {t.cta}
              <ArrowRight className="ml-1.5 size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </Button>
          <a
            href={lang === "nl" ? "/nl/hoe-het-werkt" : "/how-it-works"}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--hooklyne-blue)] transition-colors group"
          >
            {t.secondary}
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      {/* ── Hero video ────────────────────────────────────────────── */}
      <div id="hero-video" className="relative z-10 container max-w-6xl mt-14 lg:mt-16" style={{ perspective: "900px" }}>
        <div
          ref={screenshotRef}
          className="relative w-full rounded-2xl overflow-hidden"
          style={{
            transformOrigin: "top center",
            animation: "hero-frame-glow 4s ease-in-out 1.2s infinite",
          }}
        >
          {/* Browser toolbar */}
          <div
            className="flex items-center gap-2 px-4 border border-b-0 rounded-t-2xl"
            style={{ height: "44px", background: "var(--card)", borderColor: "var(--border)" }}
          >
            <div className="flex items-center gap-1.5 mr-1">
              <div className="size-3 rounded-full" style={{ background: "#ff5f57" }} />
              <div className="size-3 rounded-full" style={{ background: "#febc2e" }} />
              <div className="size-3 rounded-full" style={{ background: "#28c840" }} />
            </div>
            <div className="flex items-center gap-0.5" style={{ color: "var(--muted-foreground)" }}>
              <div className="flex items-center justify-center size-7 rounded-md" style={{ opacity: 0.3 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </div>
              <div className="flex items-center justify-center size-7 rounded-md" style={{ opacity: 0.3 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </div>
              <div className="flex items-center justify-center size-7 rounded-md" style={{ opacity: 0.45 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
              </div>
            </div>
            <div
              className="flex items-center gap-2 px-3 rounded-full text-xs flex-1 mx-3"
              style={{ height: "28px", background: "var(--background)", color: "var(--heading)" }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6, flexShrink: 0 }}>
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span className="flex-1 text-center">portal.hooklyne.com</span>
            </div>
            <div className="flex items-center">
              <div className="flex items-center justify-center size-7 rounded-md" style={{ color: "var(--muted-foreground)", opacity: 0.45 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
              </div>
            </div>
          </div>

          {/* Video */}
          <div
            className="border border-t-0 rounded-b-2xl"
            style={{ borderColor: "var(--border)", position: "relative", paddingBottom: "56.7%", overflow: "hidden" }}
          >
            <video
              ref={videoRef}
              autoPlay muted loop playsInline preload="auto"
              poster="/home/hooklyne-research-layer-b2b-prospecting.webp"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", objectPosition: "center center", display: "block", background: "var(--card)" }}
            >
              <source src="/home/hooklyne-intro.webm" type="video/webm" />
              <source src="/home/hooklyne-intro.mp4" type="video/mp4" />
            </video>
          </div>

        </div>
      </div>
    </section>
  );
};
