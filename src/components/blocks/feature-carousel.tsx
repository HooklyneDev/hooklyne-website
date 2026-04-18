import { useState } from "react";
import { ScreenPlaceholder } from "@/components/screen-placeholder";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    title: "Every outreach backed by a real signal.",
    body: "No more cold templates. Each prospect comes with a scored news hook and the rationale that turns it into a reason to reach out.",
    placeholder: { label: "Prospect card: news hook + score", hint: "Headline, 8/10 relevance badge, source link, why-this-matters rationale", accent: "blue" as const },
  },
  {
    title: "Verified contacts from 20+ sources.",
    body: "We match the right person by role description, not just job title. Verified email, company phone, and the source we found them through.",
    placeholder: { label: "Contact card: verified email + phone", hint: "Person, role, company, verified checkmark, source badges", accent: "teal" as const },
  },
  {
    title: "Written in your rep's voice. Not a template.",
    body: "Calibrated from a 30-min interview. Each email and LinkedIn invite reads like the rep wrote it on a sharp morning.",
    placeholder: { label: "Voice profile: template vs Hooklyne", hint: "Side-by-side comparison: generic template (left) vs signal-anchored email in your voice (right)", accent: "orange" as const },
  },
  {
    title: "Real-time signals. Act when it matters.",
    body: "When a prospect posts, hires, or makes the news, you get a ready-to-send email and LinkedIn message in your inbox.",
    placeholder: { label: "Signal alert: ready-to-send action", hint: "Notification card with company event + send email / LinkedIn / call script buttons", accent: "navy" as const },
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
            <ScreenPlaceholder
              label={slide.placeholder.label}
              hint={slide.placeholder.hint}
              accent={slide.placeholder.accent}
              ratio="4/3"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
