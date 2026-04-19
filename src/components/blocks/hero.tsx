import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GridSignals } from "@/components/grid-signals";

/* ── Cycling headline words ─────────────────────────────────────────── */
const CYCLE_WORDS = [
  "worth reaching out to",
  "fresh off a funding round",
  "on a hiring spree",
  "about to expand",
  "ready for your pitch",
];

/* ── Floating toast data ────────────────────────────────────────────── */
const TOAST_POOL: Array<[string, string, "blue" | "orange"]> = [
  ["Series A raised",      "Proximo BV",       "blue"],
  ["New VP Sales",         "Bright Logistics",  "orange"],
  ["EU expansion",         "TechFlow NL",       "blue"],
  ["Hiring spree",         "DataCore",          "blue"],
  ["Product launch",       "Growify",           "orange"],
  ["New CFO",              "Meridian BV",       "blue"],
  ["Partnership signed",   "NorthStar SaaS",    "orange"],
  ["Office opened",        "FlowStack",         "blue"],
  ["Revenue milestone",    "Lendal Group",      "orange"],
  ["CTO change",           "Buildify",          "blue"],
  ["International launch", "Optima NL",         "orange"],
  ["Sales team doubled",   "ReachBase",         "blue"],
  ["Press mention",        "Stackly",           "orange"],
  ["Award won",            "Klara Health",      "blue"],
  ["New customer win",     "Forta Labs",        "orange"],
];

/* Alternating left / right positions [side, top%] */
const POSITIONS: Array<["left" | "right", number]> = [
  ["left",  62],
  ["right", 70],
  ["left",  77],
  ["right", 58],
  ["left",  68],
  ["right", 75],
];

type Toast = {
  id: number;
  signal: string;
  company: string;
  side: "left" | "right";
  top: number;
  color: "blue" | "orange";
};

let _toastId = 0;

/* ── Component ──────────────────────────────────────────────────────── */
export const Hero = () => {
  const screenshotRef = useRef<HTMLDivElement>(null);
  const posRef        = useRef(0);
  const usedRef       = useRef<number[]>([]);

  const [cycleIdx, setCycleIdx] = useState(0);
  const [cycling,  setCycling]  = useState(false);
  const [toasts,   setToasts]   = useState<Toast[]>([]);

  /* Scroll tilt */
  useEffect(() => {
    const el = screenshotRef.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh   = window.innerHeight;
      const prog = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.55)));
      const deg  = 18 * (1 - prog);
      el.style.transform = `perspective(1200px) rotateX(${deg}deg)`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  /* Cycling words */
  useEffect(() => {
    const t = setInterval(() => {
      setCycling(true);
      setTimeout(() => {
        setCycleIdx(i => (i + 1) % CYCLE_WORDS.length);
        setCycling(false);
      }, 280);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  /* Floating toasts */
  const spawnToast = useCallback(() => {
    const avail = TOAST_POOL
      .map((_, i) => i)
      .filter(i => !usedRef.current.slice(-6).includes(i));
    const pick = avail[Math.floor(Math.random() * avail.length)];
    usedRef.current = [...usedRef.current.slice(-10), pick];

    const [signal, company, color] = TOAST_POOL[pick];
    const [side, top] = POSITIONS[posRef.current % POSITIONS.length];
    posRef.current++;

    const id       = ++_toastId;
    const DURATION = 3800;

    setToasts(prev => [...prev, { id, signal, company, side, top, color }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), DURATION);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const loop = (interval: number, initial: number) => {
      const run = () => {
        spawnToast();
        timers.push(setTimeout(run, interval + Math.random() * 1400));
      };
      timers.push(setTimeout(run, initial));
    };
    loop(2800,  900);
    loop(2800, 2400);
    return () => timers.forEach(clearTimeout);
  }, [spawnToast]);

  const ringMask = "linear-gradient(to bottom, transparent 0%, black 9%, black 50%, transparent 70%)";
  const rings = [150, 300, 450, 600, 750, 900, 1050]
    .map(r => `radial-gradient(circle at 50% 35%, transparent ${r - 1}px, rgba(52,76,163,0.11) ${r}px, transparent ${r + 1}px)`)
    .join(", ");

  return (
    <section className="pt-24 pb-0 lg:pt-32 relative">

      {/* ── Floating signal toasts (desktop only) ─────────────────── */}
      <div className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 20 }}>
        {toasts.map(t => (
          <div
            key={t.id}
            style={{
              position: "absolute",
              top: `${t.top}%`,
              ...(t.side === "left" ? { left: "2%" } : { right: "2%" }),
              animation: "toast-float 3.8s ease-out forwards",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 12px 6px 8px",
              borderRadius: "999px",
              background: "var(--card)",
              border: `1px solid ${t.color === "orange" ? "rgba(255,140,66,0.28)" : "rgba(52,76,163,0.22)"}`,
              boxShadow: "0 4px 20px rgba(0,0,0,0.09)",
              whiteSpace: "nowrap",
              fontSize: "11px",
              fontWeight: 600,
              fontFamily: "var(--font-dm-sans, sans-serif)",
            }}
          >
            {/* Dot */}
            <div style={{
              width: 7, height: 7, borderRadius: "50%", flexShrink: 0,
              background: t.color === "orange" ? "var(--hooklyne-orange)" : "var(--hooklyne-blue)",
            }} />
            {/* Signal */}
            <span style={{ color: t.color === "orange" ? "var(--hooklyne-orange)" : "var(--hooklyne-blue)" }}>
              {t.signal}
            </span>
            {/* Company */}
            <span style={{ color: "var(--muted-foreground)", fontWeight: 400 }}>
              · {t.company}
            </span>
          </div>
        ))}
      </div>

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
      <div className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
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
          className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-[var(--heading)] leading-[1.1] max-w-3xl"
          style={{ animation: "hero-fade-up 0.55s ease both", animationDelay: "90ms" }}
        >
          Find the prospects actually{" "}
          <span
            style={{
              display: "inline",
              transition: "opacity 0.28s ease",
              opacity: cycling ? 0 : 1,
            }}
          >
            {CYCLE_WORDS[cycleIdx]}
          </span>
        </h1>

        <p
          className="text-lg text-[var(--muted-foreground)] max-w-xl leading-relaxed"
          style={{ animation: "hero-fade-up 0.55s ease both", animationDelay: "200ms" }}
        >
          Every prospect comes with verified contact details, a live news hook, and a first message written in your voice - matched to the signal and what you sell.
        </p>

        <div
          className="flex flex-wrap items-center justify-center gap-4 mt-2"
          style={{ animation: "hero-fade-up 0.55s ease both", animationDelay: "310ms" }}
        >
          <Button asChild className="h-11 px-6 text-sm font-semibold rounded-lg" style={{ backgroundColor: "var(--hooklyne-navy)", color: "#ffffff" }}>
            <a href="/contact">
              Start your free pilot
              <ArrowRight className="ml-1.5 size-4" />
            </a>
          </Button>
          <a
            href="/how-it-works"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--hooklyne-blue)] transition-colors"
          >
            See how it works
            <ArrowRight className="size-3.5" />
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
            {/* Traffic lights */}
            <div className="flex items-center gap-1.5 mr-1">
              <div className="size-3 rounded-full" style={{ background: "#ff5f57" }} />
              <div className="size-3 rounded-full" style={{ background: "#febc2e" }} />
              <div className="size-3 rounded-full" style={{ background: "#28c840" }} />
            </div>

            {/* Nav buttons */}
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

            {/* URL bar */}
            <div
              className="flex items-center gap-2 px-3 rounded-full text-xs flex-1 mx-3"
              style={{ height: "28px", background: "var(--background)", color: "var(--muted-foreground)" }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4, flexShrink: 0 }}>
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span className="flex-1 text-center">portal.hooklyne.com</span>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center justify-center size-7 rounded-md" style={{ color: "var(--muted-foreground)", opacity: 0.45 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
              </div>
              <div
                className="size-6 rounded-full flex-shrink-0 flex items-center justify-center text-white font-semibold"
                style={{ background: "var(--hooklyne-blue)", opacity: 0.7, fontSize: "10px" }}
              >H</div>
            </div>
          </div>

          {/* Video */}
          <div
            className="border border-t-0 rounded-b-2xl"
            style={{ borderColor: "var(--border)", position: "relative", paddingBottom: "52%", overflow: "hidden" }}
          >
            <video
              autoPlay muted loop playsInline
              poster="/hooklyne-hero.png"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center", display: "block" }}
            >
              <source src="/Hooklyne%20Intro%20Video.webm" type="video/webm" />
              <source src="/Hooklyne%20Intro%20Video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};
