import { useState } from "react";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    title: "Every outreach backed by a real signal.",
    body: "We watch 7 intelligence sources for news, hiring, and product moves. Every prospect arrives with a scored hook and the rationale that turns it into a reason to reach out.",
    image: "/home/hooklyne-signal-based-outreach.webp",
    alt: "Hooklyne portal showing a live signal hook and outreach rationale for a B2B prospect",
  },
  {
    title: "Triple-verified across 20+ sources.",
    body: "Single-source databases hand you one wrong number. We aggregate 20+ providers, match by role description (not just job title), and only ship a contact when three sources agree.",
    image: "/home/hooklyne-triple-verified-contact-data.webp",
    alt: "Hooklyne portal contact card showing triple-verified email and phone across 20+ sources",
  },
  {
    title: "Written in your rep's voice. Not a template.",
    body: "Calibrated from a 30-min interview. Each email and LinkedIn invite reads like the rep wrote it on a sharp morning.",
    image: "/home/hooklyne-personalized-outreach-email.webp",
    alt: "Hooklyne portal showing a personalized B2B outreach email written in the rep's voice",
  },
  {
    title: "Real-time signals. Act when it matters.",
    body: "When a prospect posts, hires, or makes the news, you get a ready-to-send email and LinkedIn message in your inbox.",
    image: "/home/hooklyne-real-time-prospect-signals.webp",
    alt: "Hooklyne portal inbox showing real-time prospect signal cards ready to review and send",
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

          <div className="lg:col-span-3">
            <div className="rounded-3xl p-3" style={{ background: "radial-gradient(ellipse 90% 80% at 50% 50%, rgba(52,76,163,0.10) 0%, transparent 70%)" }}>
              <div className="rounded-2xl overflow-hidden aspect-video" style={{ boxShadow: "var(--shadow-lg)" }}>
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
