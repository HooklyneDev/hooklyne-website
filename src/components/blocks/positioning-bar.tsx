import { useState, useEffect, useRef } from "react";
import { Database, Building2 } from "lucide-react";

const EN = {
  eyebrow: "Where Hooklyne sits",
  headline: "Between a database and an agency.",
  body: "Databases keep you in control but burn your time. Agencies save your time but take your voice and your learning with them. Hooklyne is the only option that keeps both - your hours and your team's knowledge.",
  segments: {
    left:   { label: "Contact databases", sub: "Rows to filter",    price: "€"    },
    center: { label: "Hooklyne",          sub: "The research layer", price: "€€"   },
    right:  { label: "Outbound agencies", sub: "Fully outsourced",   price: "€€€+" },
  },
};

const NL = {
  eyebrow: "Waar Hooklyne zit",
  headline: "Tussen een database en een agency.",
  body: "Databases houden je in controle maar kosten je tijd. Agencies besparen je tijd maar nemen je stem en je kennis mee. Hooklyne is de enige optie die beide behoudt - je uren en de kennis van je team.",
  segments: {
    left:   { label: "Contactdatabases",  sub: "Rijen om te filteren", price: "€"    },
    center: { label: "Hooklyne",          sub: "De onderzoekslaag",    price: "€€"   },
    right:  { label: "Outbound agencies", sub: "Volledig uitbesteed",   price: "€€€+" },
  },
};

export const PositioningBar = ({ lang = "en" }: { lang?: "en" | "nl" }) => {
  const t = lang === "nl" ? NL : EN;
  const barRef  = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [reduced,  setReduced]  = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!barRef.current) return;
    if (reduced) { setRevealed(true); return; }
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold: 0.25 },
    );
    obs.observe(barRef.current);
    return () => obs.disconnect();
  }, [reduced]);

  const seg = (delay: number): React.CSSProperties => ({
    opacity:    revealed ? 1 : 0,
    transform:  revealed ? "translateX(0)" : "translateX(-20px)",
    transition: reduced ? "none" : `opacity 400ms ease ${delay}ms, transform 400ms ease ${delay}ms`,
  });

  return (
    <section className="py-14 lg:py-20" data-fade>
      {/* keyframe for center segment shimmer */}
      <style>{`
        @keyframes hk-sweep {
          0%   { transform: translateX(-120%); }
          100% { transform: translateX(300%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hk-sweep-inner { animation: none !important; }
        }
      `}</style>

      <div className="container max-w-6xl">

        {/* Header */}
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted-foreground)] mb-4">
            {t.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[var(--heading)] tracking-tight leading-[1.1] mb-5">
            {t.headline}
          </h2>
          <p className="text-base text-[var(--muted-foreground)] leading-relaxed">
            {t.body}
          </p>
        </div>

        {/* Spectrum bar */}
        <div ref={barRef} className="flex rounded-2xl overflow-hidden" style={{ boxShadow: "var(--shadow-md)" }}>

          {/* Left: Contact databases */}
          <div
            className="flex-[3] px-6 py-7 flex flex-col gap-3"
            style={{ background: "var(--card-hover)", borderRight: "1px solid var(--border)", ...seg(0) }}
          >
            <div className="flex items-center gap-2.5">
              <span
                className="inline-flex items-center justify-center size-8 rounded-lg shrink-0"
                style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}
              >
                <Database className="size-4" />
              </span>
              <div>
                <div className="text-sm font-semibold text-[var(--heading)]">{t.segments.left.label}</div>
                <div className="text-xs text-[var(--muted-foreground)]">{t.segments.left.sub}</div>
              </div>
            </div>
            <div
              className="self-start text-xs font-bold tracking-widest px-2 py-0.5 rounded"
              style={{ background: "var(--border)", color: "var(--muted-foreground)" }}
            >
              {t.segments.left.price}
            </div>
          </div>

          {/* Center: Hooklyne — with sweep shimmer */}
          <div
            className="flex-[4] px-6 py-7 flex flex-col gap-3 relative overflow-hidden"
            style={{
              background: "var(--hooklyne-navy)",
              outline: "2px solid var(--hooklyne-orange)",
              outlineOffset: "-2px",
              ...seg(200),
            }}
          >
            {/* Sweep shimmer */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity: 0.18 }}>
              <div
                className="hk-sweep-inner absolute top-0 bottom-0"
                style={{
                  width: "35%",
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)",
                  animation: revealed && !reduced ? "hk-sweep 6s ease-in-out infinite" : "none",
                  animationDelay: "1.2s",
                }}
              />
            </div>

            <div className="flex items-center gap-2.5 relative">
              <span className="inline-flex items-center justify-center size-8 rounded-lg shrink-0 bg-white/10">
                <img src="/logo-mark.svg" alt="" className="size-5 block" />
              </span>
              <div>
                <div className="text-sm font-semibold text-white">{t.segments.center.label}</div>
                <div className="text-xs text-white/70">{t.segments.center.sub}</div>
              </div>
            </div>
            <div
              className="relative self-start text-xs font-bold tracking-widest px-2 py-0.5 rounded"
              style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)" }}
            >
              {t.segments.center.price}
            </div>
          </div>

          {/* Right: Outbound agencies */}
          <div
            className="flex-[3] px-6 py-7 flex flex-col gap-3"
            style={{ background: "var(--card)", borderLeft: "1px solid var(--border)", ...seg(400) }}
          >
            <div className="flex items-center gap-2.5">
              <span
                className="inline-flex items-center justify-center size-8 rounded-lg shrink-0"
                style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}
              >
                <Building2 className="size-4" />
              </span>
              <div>
                <div className="text-sm font-semibold text-[var(--heading)]">{t.segments.right.label}</div>
                <div className="text-xs text-[var(--muted-foreground)]">{t.segments.right.sub}</div>
              </div>
            </div>
            <div
              className="self-start text-xs font-bold tracking-widest px-2 py-0.5 rounded"
              style={{ background: "var(--border)", color: "var(--muted-foreground)" }}
            >
              {t.segments.right.price}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
