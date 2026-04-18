import { useEffect, useRef } from "react";
import { ArrowRight, Zap, Users, FileText, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

      {/* Video / screenshot */}
      <div className="container mt-14 lg:mt-16">
        <div
          ref={screenshotRef}
          className="relative w-full rounded-2xl shadow-2xl overflow-hidden"
          style={{ transformOrigin: "top center" }}
        >
          {/* Browser chrome frame */}
          <div
            className="border border-b-0 rounded-t-2xl overflow-hidden"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            {/* Tab strip */}
            <div
              className="flex items-end px-3 pt-2 gap-0"
              style={{ background: "var(--background)", height: "32px" }}
            >
              <div
                className="flex items-center gap-1.5 px-3 text-xs font-medium rounded-t-lg"
                style={{
                  height: "26px",
                  background: "var(--card)",
                  color: "var(--foreground)",
                  borderTop: "1px solid var(--border)",
                  borderLeft: "1px solid var(--border)",
                  borderRight: "1px solid var(--border)",
                  borderBottom: "1px solid var(--card)",
                  marginBottom: "-1px",
                  whiteSpace: "nowrap",
                }}
              >
                <div className="size-2.5 rounded-sm flex-shrink-0" style={{ background: "var(--hooklyne-navy)" }} />
                Hooklyne
              </div>
            </div>

            {/* Toolbar */}
            <div
              className="flex items-center gap-3 px-4"
              style={{ height: "36px", borderTop: "1px solid var(--border)" }}
            >
              {/* Traffic lights */}
              <div className="flex items-center gap-1.5">
                <div className="size-2.5 rounded-full" style={{ background: "#ff5f57" }} />
                <div className="size-2.5 rounded-full" style={{ background: "#febc2e" }} />
                <div className="size-2.5 rounded-full" style={{ background: "#28c840" }} />
              </div>
              {/* URL bar */}
              <div
                className="flex items-center gap-1.5 px-3 rounded-md text-xs mx-auto"
                style={{
                  height: "22px",
                  width: "240px",
                  background: "var(--background)",
                  color: "var(--muted-foreground)",
                }}
              >
                {/* Lock icon */}
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5, flexShrink: 0 }}>
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                portal.hooklyne.com
              </div>
            </div>
          </div>

          {/* Video content */}
          <div className="relative overflow-hidden border border-t-0 rounded-b-2xl" style={{ borderColor: "var(--border)", maxHeight: "560px" }}>
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/hooklyne-hero.png"
              className="w-full object-cover object-top"
            >
              <source src="/Hooklyne-intro-video.webm" type="video/webm" />
              <source src="/Hooklyne-intro-video.mp4" type="video/mp4" />
            </video>
            <div
              className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
              style={{ background: "linear-gradient(to bottom, transparent, var(--background))" }}
            />
          </div>
        </div>

        {/* Feature grid — Supabase-style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-16 lg:mt-20 border-t border-[var(--border)]">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className={cn(
                  "pt-8 pb-4 pr-8",
                  i > 0 && "md:pl-8 md:border-l border-[var(--border)]",
                  i === 1 && "max-md:border-l-0",
                )}
              >
                <Icon
                  className="size-7 text-[var(--hooklyne-navy)] dark:text-[var(--foreground)] mb-4"
                  strokeWidth={1.5}
                />
                <div className="w-7 h-px bg-[var(--hooklyne-blue)] mb-5" />
                <h3 className="font-semibold text-[var(--hooklyne-navy)] dark:text-[var(--foreground)] text-base mb-2">
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
