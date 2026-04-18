import { useEffect, useRef } from "react";
import { ArrowRight, Zap, Users, FileText, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Zap,
    title: "Signal-ranked prospects",
    description: "Ranked by how relevant their latest news is to what you sell. Every first touch has a real reason.",
  },
  {
    icon: Users,
    title: "Smart person matching",
    description: "Describe who you want by role, not job title. We find the right person across title variants.",
  },
  {
    icon: FileText,
    title: "Outreach written in your voice",
    description: "A signal-anchored email and LinkedIn invite in your sender's actual tone. Ready to send.",
  },
  {
    icon: Bell,
    title: "Real-time signal monitoring",
    description: "Track companies over time. When something relevant happens, you get a ready-to-send follow-up.",
  },
];

export const Hero = () => {
  const screenshotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = screenshotRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.6)));
      const deg = 9 * (1 - progress);
      el.style.transform = `perspective(1400px) rotateX(${deg}deg)`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <section className="pt-24 pb-0 lg:pt-32">
      <div id="hero-content" className="container flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
        <a
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-1.5 text-sm font-medium text-[var(--hooklyne-navy)] dark:text-[var(--foreground)] hover:border-[var(--hooklyne-blue)] transition-colors"
        >
          Invite-only pilot - now open
          <ArrowRight className="size-3.5" />
        </a>

        <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-[var(--hooklyne-navy)] leading-[1.1] max-w-3xl">
          Find the prospects actually worth reaching out to
        </h1>

        <p className="text-lg text-[var(--muted-foreground)] max-w-xl leading-relaxed">
          Ranked by relevant news signals, so every first touch has a real reason with a ready-to-send message already written in your voice.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
          <Button asChild className="h-11 px-6 text-sm font-semibold rounded-lg" style={{ backgroundColor: "var(--hooklyne-navy)", color: "#ffffff" }}>
            <a href="/contact">
              Start your free pilot
              <ArrowRight className="ml-1.5 size-4" />
            </a>
          </Button>
          <a
            href="/#how-it-works"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--hooklyne-blue)] transition-colors"
          >
            See how it works
            <ArrowRight className="size-3.5" />
          </a>
        </div>
      </div>

      {/* Screenshot + features as one unified panel */}
      <div className="container mt-14 lg:mt-16">
        {/* Screenshot with perspective tilt */}
        <div
          ref={screenshotRef}
          className="relative w-full rounded-t-2xl border border-b-0 border-[var(--border)] shadow-xl overflow-hidden"
          style={{ maxHeight: "600px", transformOrigin: "top center" }}
        >
          <img
            src="/hero-screenshot.png"
            alt="Hooklyne portal - Prospect Signals view showing signal scores, outreach sequences, and ready-to-send emails"
            className="w-full object-cover object-top"
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent, var(--background))" }}
          />
        </div>

        {/* Feature bullets - connected to screenshot bottom */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)] border border-t-0 border-[var(--border)] rounded-b-2xl overflow-hidden">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="bg-[var(--card)] px-6 py-7">
                <div className="size-8 rounded-lg flex items-center justify-center mb-4" style={{ background: "rgba(52,76,163,0.08)" }}>
                  <Icon className="size-4 text-[var(--hooklyne-blue)]" />
                </div>
                <h3 className="font-semibold text-[var(--hooklyne-navy)] dark:text-[var(--foreground)] text-sm mb-1.5">
                  {f.title}
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
