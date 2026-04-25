import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GridSignals } from "@/components/grid-signals";

/* ── Component ──────────────────────────────────────────────────────── */
export const Hero = () => {
  const screenshotRef = useRef<HTMLDivElement>(null);

  /* Scroll tilt */
  useEffect(() => {
    const el = screenshotRef.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh   = window.innerHeight;
      const prog = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.9)));
      const deg  = 26 * (1 - prog);
      el.style.transform = `perspective(900px) rotateX(${deg}deg)`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const ringMask = "linear-gradient(to bottom, transparent 0%, black 9%, black 50%, transparent 70%)";
  const rings = [150, 300, 450, 600, 750, 900, 1050]
    .map(r => `radial-gradient(circle at 50% 35%, transparent ${r - 1}px, rgba(52,76,163,0.11) ${r}px, transparent ${r + 1}px)`)
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
          background: "radial-gradient(ellipse 55% 40% at 50% 32%, rgba(52,76,163,0.22) 0%, rgba(52,76,163,0.08) 45%, transparent 70%)",
          maskImage: ringMask,
          WebkitMaskImage: ringMask,
        }}
      />

      {/* ── Desktop: concentric rings ─────────────────────────────── */}
      <div
        className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          zIndex: 0,
          backgroundImage: rings,
          maskImage: ringMask,
          WebkitMaskImage: ringMask,
        }}
      />

      {/* ── Desktop: grid signal pulses ───────────────────────────── */}
      <div className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 4 }}>
        <GridSignals />
      </div>

      {/* ── Ambient gradient blobs ────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 55% 40% at 15% 40%, rgba(52,76,163,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 45% 35% at 85% 65%, rgba(52,76,163,0.05) 0%, transparent 70%),
            radial-gradient(ellipse 35% 25% at 60% 10%, rgba(13,148,136,0.04) 0%, transparent 65%)
          `,
        }}
      />

      {/* ── Grain texture ─────────────────────────────────────────── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 2, opacity: 0.045 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="hero-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-grain)" />
      </svg>

      {/* ── Left + right vignette ─────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 3,
          background: "linear-gradient(to right, var(--background) 0%, transparent 16%, transparent 84%, var(--background) 100%)",
        }}
      />

      {/* ── Bottom fade: dissolves hero effects (grain, rings, blobs)
             into the clean ticker surface so there's no harsh seam ── */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          bottom: 0,
          height: "180px",
          zIndex: 5,
          background: "linear-gradient(to bottom, transparent 0%, var(--card) 100%)",
        }}
      />

      {/* ── Hero copy ─────────────────────────────────────────────── */}
      <div id="hero-content" className="relative z-10 container flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">

        <a
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-1.5 text-sm font-medium text-[var(--heading)] hover:border-[var(--hooklyne-blue)] transition-colors"
          style={{ animation: "hero-fade-up 0.5s ease both", animationDelay: "0ms" }}
        >
          For B2B founders and sales reps
          <ArrowRight className="size-3.5" />
        </a>

        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-[var(--heading)] leading-[1.15] sm:leading-[1.1] max-w-3xl"
          style={{ animation: "hero-fade-up 0.55s ease both", animationDelay: "90ms" }}
        >
          Find the prospects actually worth reaching out to.
        </h1>

        <p
          className="text-base md:text-lg text-[var(--muted-foreground)] max-w-xl leading-relaxed px-2 sm:px-0"
          style={{ animation: "hero-fade-up 0.55s ease both", animationDelay: "200ms" }}
        >
          A research workflow that finds fitting companies, verifies decision-makers across 20+ data providers, watches for live buying signals, and drafts first outreach in your rep's voice.
        </p>

        <div
          className="flex flex-wrap items-center justify-center gap-4 mt-2"
          style={{ animation: "hero-fade-up 0.55s ease both", animationDelay: "310ms" }}
        >
          <Button asChild className="h-11 px-6 text-sm font-semibold rounded-lg group btn-shine" style={{ backgroundColor: "var(--hooklyne-navy)", color: "#ffffff" }}>
            <a href="/contact">
              Start your free pilot
              <ArrowRight className="ml-1.5 size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </Button>
          <a
            href="/how-it-works"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--hooklyne-blue)] transition-colors group"
          >
            See how it works
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      {/* ── Hero video ────────────────────────────────────────────── */}
      <div id="hero-video" className="relative z-10 container max-w-6xl mt-14 lg:mt-16">
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
              autoPlay muted loop playsInline
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
