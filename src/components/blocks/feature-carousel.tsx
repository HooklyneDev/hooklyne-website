import { useState } from "react";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    title: "Every email anchored to a real reason.",
    body: "Seven intelligence sources watched live: funding, hiring, leadership, launches, press, expansion, sector news. Every prospect lands with a scored hook and why it matters this week.",
    image: "/home/hooklyne-signal-based-outreach.webp",
    alt: "PLACEHOLDER: Portal screenshot of a prospect card with a live signal badge (e.g. 'Series B funding - 3 days ago') and the reasoning panel underneath showing why it matters to the rep's ICP.",
  },
  {
    title: "20+ providers checked. One clean contact.",
    body: "Single-source databases bounce. A waterfall across 20+ providers, tuned per region, plus four deliverability layers. Only verified contacts ship.",
    image: "/home/hooklyne-triple-verified-contact-data.webp",
    alt: "PLACEHOLDER: Portal screenshot of a verified contact card showing the name, title, email with a green 'Verified - deliverable' badge, and a collapsed list of '20+ providers checked' with the winning source highlighted.",
  },
  {
    title: "Reads like your rep wrote it.",
    body: "Voice is calibrated from a 30-minute interview. Every draft is reasoned through four times before it lands. No template smell.",
    image: "/home/hooklyne-personalized-outreach-email.webp",
    alt: "PLACEHOLDER: Portal screenshot of a draft email pane with the voice profile sidebar visible on the right - tone keywords, sample phrasing, and an inline 'Drafted in Tim's voice' badge above the subject line.",
  },
  {
    title: "Find fit. Not filters.",
    body: "Databases filter by industry code. We search billions of pages semantically for what companies actually do. Real fits, not SIC code guesses.",
    image: "/home/hooklyne-real-time-prospect-signals.webp",
    alt: "PLACEHOLDER: Portal screenshot of the Prospecting 'Find me companies' flow - a plain-language ICP description field at the top, a ranked result list below with fit scores on the right and 3 surfaced decision-makers per row.",
  },
];

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
    <section className="py-20 lg:py-28" data-fade>
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
              <div className="rounded-2xl overflow-hidden aspect-[4/3]" style={{ boxShadow: "var(--shadow-lg)" }}>
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover object-top transition-opacity duration-180"
                  style={{ opacity: fading ? 0 : 1 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
