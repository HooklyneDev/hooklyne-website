import { useState } from "react";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    title: "Every outreach backed by a real signal.",
    body: "We watch 7 intelligence sources for news, hiring, and product moves. Every prospect arrives with a scored hook and the rationale that turns it into a reason to reach out.",
    image: "/screens/signal-hook.png",
    alt: "Portal showing a news hook signal and rationale for a prospect",
  },
  {
    title: "Triple-verified across 20+ sources.",
    body: "Single-source databases hand you one wrong number. We aggregate 20+ providers, match by role description (not just job title), and only ship a contact when three sources agree.",
    image: "/screens/contact-verified.png",
    alt: "Portal contact card showing verified email, phone, and source badges",
  },
  {
    title: "Written in your rep's voice. Not a template.",
    body: "Calibrated from a 30-min interview. Each email and LinkedIn invite reads like the rep wrote it on a sharp morning.",
    image: "/screens/voice-email.png",
    alt: "Portal showing a personalized outreach email draft anchored to a signal",
  },
  {
    title: "Real-time signals. Act when it matters.",
    body: "When a prospect posts, hires, or makes the news, you get a ready-to-send email and LinkedIn message in your inbox.",
    image: "/screens/inbox-ready.png",
    alt: "Portal inbox showing prospect cards ready to review and send",
  },
];

export const FeatureCarousel = () => {
  const [active, setActive] = useState(0);
  const slide = SLIDES[active];

  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-2 flex flex-col gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.title}
                onClick={() => setActive(i)}
                className={cn(
                  "text-left rounded-xl p-5 border transition-all",
                  active === i
                    ? "border-[var(--hooklyne-blue)]/40 bg-[var(--card)] shadow-md"
                    : "border-transparent hover:bg-[var(--card)]/50",
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "shrink-0 size-6 rounded-md flex items-center justify-center text-xs font-bold transition-colors",
                      active === i ? "bg-[var(--hooklyne-blue)] text-white" : "bg-[var(--muted)] text-[var(--muted-foreground)]",
                    )}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <h3 className={cn(
                      "font-semibold text-base mb-1",
                      active === i ? "text-[var(--heading)]" : "text-[var(--foreground)]/70",
                    )}>{s.title}</h3>
                    {active === i && (
                      <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{s.body}</p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[var(--card)]" style={{ boxShadow: "var(--shadow-md)" }}>
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
