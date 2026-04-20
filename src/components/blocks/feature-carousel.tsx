import { useState } from "react";
import { cn } from "@/lib/utils";

type Tone = "blue" | "teal" | "orange";

type Overlay = {
  x: number;
  y: number;
  tag: string;
  title: string;
  body?: string;
  tone: Tone;
  pulse?: boolean;
};

const SLIDES: Array<{
  title: string;
  body: string;
  image: string;
  alt: string;
  overlays: Overlay[];
}> = [
  {
    title: "Every email anchored to a real reason.",
    body: "Seven intelligence sources watched live: funding, hiring, leadership, launches, press, expansion, sector news. Every prospect lands with a scored hook and why it matters this week.",
    image: "/home/hooklyne-signal-based-outreach.webp",
    alt: "Portal screenshot: prospect card with a live signal badge and the reasoning panel.",
    overlays: [
      { x: 22, y: 18, tag: "SIGNAL", title: "Series B · €12M", body: "3 days ago", tone: "orange", pulse: true },
      { x: 70, y: 70, tag: "FIT", title: "9/10 for your ICP", tone: "blue" },
    ],
  },
  {
    title: "20+ providers checked. One clean contact.",
    body: "Single-source databases bounce. A waterfall across 20+ providers, tuned per region, plus four deliverability layers. Only verified contacts ship.",
    image: "/home/hooklyne-triple-verified-contact-data.webp",
    alt: "Portal screenshot: verified contact card showing name, title, email with deliverable badge.",
    overlays: [
      { x: 22, y: 20, tag: "PROVIDER 3/20", title: "Verified match", tone: "teal", pulse: true },
      { x: 72, y: 72, tag: "EMAIL", title: "Passed 4-layer check", body: "SMTP · Catch-all · Role · Deliverable", tone: "blue" },
    ],
  },
  {
    title: "Reads like your rep wrote it.",
    body: "Voice is calibrated from a 30-minute interview. Every draft is reasoned through four times before it lands. No template smell.",
    image: "/home/hooklyne-personalized-outreach-email.webp",
    alt: "Portal screenshot: draft email pane with voice profile sidebar visible.",
    overlays: [
      { x: 22, y: 18, tag: "VOICE", title: "Matched to your cadence", tone: "blue" },
      { x: 70, y: 72, tag: "PASSES", title: "4 reasoning passes", body: "Hook · Angle · Voice · QC", tone: "orange", pulse: true },
    ],
  },
  {
    title: "Find fit. Not filters.",
    body: "Databases filter by industry code. We search billions of pages semantically for what companies actually do. Real fits, not SIC code guesses.",
    image: "/home/hooklyne-real-time-prospect-signals.webp",
    alt: "Portal screenshot: Prospecting find-companies flow with a plain-language description field and ranked results.",
    overlays: [
      { x: 22, y: 20, tag: "DESCRIBE", title: "Dutch industrial OEMs moving to service models", tone: "blue" },
      { x: 72, y: 70, tag: "MATCHED", title: "42 real fits", body: "Not SIC code guesses", tone: "teal", pulse: true },
    ],
  },
];

const TONE_STYLES: Record<Tone, { bg: string; border: string; tag: string }> = {
  blue: {
    bg: "linear-gradient(180deg, rgba(52,76,163,0.96) 0%, rgba(34,55,130,0.96) 100%)",
    border: "rgba(255,255,255,0.14)",
    tag: "rgba(255,255,255,0.70)",
  },
  teal: {
    bg: "linear-gradient(180deg, rgba(13,148,136,0.96) 0%, rgba(8,120,110,0.96) 100%)",
    border: "rgba(255,255,255,0.14)",
    tag: "rgba(255,255,255,0.70)",
  },
  orange: {
    bg: "linear-gradient(180deg, rgba(255,140,66,0.96) 0%, rgba(235,115,40,0.96) 100%)",
    border: "rgba(255,255,255,0.18)",
    tag: "rgba(255,255,255,0.75)",
  },
};

export const FeatureCarousel = () => {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(0);
  const [fading, setFading] = useState(false);

  const handleSelect = (i: number) => {
    if (i === active) return;
    setFading(true);
    setTimeout(() => {
      setActive(i);
      setVisible(i);
      setFading(false);
    }, 180);
  };

  const slide = SLIDES[visible];

  return (
    <section className="py-14 lg:py-20" data-fade>
      <div className="container max-w-6xl">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--hooklyne-blue)] mb-4">What makes it work</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[var(--heading)] tracking-tight leading-[1.1]">
            Four things most tools skip.
          </h2>
        </div>
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-2 flex flex-col gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.title}
                onClick={() => handleSelect(i)}
                className={cn(
                  "text-left rounded-xl p-5 border transition-all duration-200",
                  active === i
                    ? "border-[var(--hooklyne-blue)]/40 bg-[var(--card)] shadow-md"
                    : "border-transparent hover:bg-[var(--card)]/50",
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "shrink-0 size-6 rounded-md flex items-center justify-center text-xs font-bold transition-colors duration-200",
                      active === i ? "bg-[var(--hooklyne-blue)] text-white" : "bg-[var(--muted)] text-[var(--muted-foreground)]",
                    )}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <h3 className={cn(
                      "font-semibold text-base mb-1 transition-colors duration-200",
                      active === i ? "text-[var(--heading)]" : "text-[var(--foreground)]/70",
                    )}>{s.title}</h3>
                    <div className={cn("faq-answer", active === i && "open")}>
                      <div>
                        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed pt-0.5">{s.body}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-3 lg:-mt-8">
            <div className="rounded-3xl p-3" style={{ background: "radial-gradient(ellipse 90% 80% at 50% 50%, rgba(52,76,163,0.10) 0%, transparent 70%)" }}>
              <div
                className="relative rounded-2xl overflow-hidden aspect-[4/3]"
                style={{
                  boxShadow: "var(--shadow-lg)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
                  maskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
                }}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-180"
                  style={{ opacity: fading ? 0 : 1 }}
                />
                {/* Floating contextual overlays */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-180"
                  style={{ opacity: fading ? 0 : 1 }}
                >
                  {slide.overlays.map((o, idx) => {
                    const t = TONE_STYLES[o.tone];
                    return (
                      <div
                        key={`${visible}-${idx}`}
                        className="absolute max-w-[min(68%,260px)]"
                        style={{
                          left: `${o.x}%`,
                          top: `${o.y}%`,
                          transform: "translate(-50%, -50%)",
                          animation: `hero-fade-up 0.5s ease both`,
                          animationDelay: `${idx * 120}ms`,
                        }}
                      >
                        <div
                          className="rounded-xl px-3 py-2 text-white"
                          style={{
                            background: t.bg,
                            border: `1px solid ${t.border}`,
                            boxShadow: "0 10px 30px rgba(2,31,55,0.28)",
                            backdropFilter: "blur(6px)",
                          }}
                        >
                          <div className="flex items-center gap-1.5 mb-0.5">
                            {o.pulse && (
                              <span className="relative flex size-1.5">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-70 animate-ping"></span>
                                <span className="relative inline-flex size-1.5 rounded-full bg-white"></span>
                              </span>
                            )}
                            <span
                              className="text-[9px] font-bold uppercase tracking-[0.18em]"
                              style={{ color: t.tag }}
                            >
                              {o.tag}
                            </span>
                          </div>
                          <div className="text-[12px] font-semibold leading-tight">{o.title}</div>
                          {o.body && (
                            <div className="text-[10.5px] opacity-80 mt-0.5 leading-snug">{o.body}</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
