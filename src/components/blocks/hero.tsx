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
            style={{ borderColor: "var(--border)" }}
          >
            {/* Tab strip */}
            <div
              className="flex items-end pl-20 pr-4 pt-2"
              style={{ background: "var(--border)", height: "36px" }}
            >
              {/* Active tab */}
              <div
                className="flex items-center gap-2 px-3 text-xs font-medium"
                style={{
                  height: "28px",
                  background: "var(--card)",
                  color: "var(--foreground)",
                  borderRadius: "8px 8px 0 0",
                  marginBottom: "-1px",
                  whiteSpace: "nowrap",
                  minWidth: "160px",
                  maxWidth: "220px",
                }}
              >
                {/* Favicon */}
                <div
                  className="size-3.5 rounded-sm flex-shrink-0 flex items-center justify-center"
                  style={{ background: "var(--hooklyne-navy)" }}
                >
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.94-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z"/>
                  </svg>
                </div>
                <span className="truncate flex-1">Dashboard - Hooklyne</span>
                {/* Close button */}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4, flexShrink: 0 }}>
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </div>
            </div>

            {/* Toolbar */}
            <div
              className="flex items-center gap-2 px-4"
              style={{ height: "40px", background: "var(--card)", borderTop: "1px solid var(--border)" }}
            >
              {/* Traffic lights */}
              <div className="flex items-center gap-1.5 mr-1">
                <div className="size-3 rounded-full" style={{ background: "#ff5f57" }} />
                <div className="size-3 rounded-full" style={{ background: "#febc2e" }} />
                <div className="size-3 rounded-full" style={{ background: "#28c840" }} />
              </div>

              {/* Nav buttons */}
              <div className="flex items-center gap-0.5" style={{ color: "var(--muted-foreground)" }}>
                <div className="flex items-center justify-center size-7 rounded-md" style={{ opacity: 0.35 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </div>
                <div className="flex items-center justify-center size-7 rounded-md" style={{ opacity: 0.35 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </div>
                <div className="flex items-center justify-center size-7 rounded-md" style={{ opacity: 0.5 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
                </div>
              </div>

              {/* URL bar */}
              <div
                className="flex items-center gap-2 px-3 rounded-full text-xs flex-1 mx-2"
                style={{
                  height: "26px",
                  maxWidth: "320px",
                  background: "var(--background)",
                  color: "var(--muted-foreground)",
                }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.45, flexShrink: 0 }}>
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span className="flex-1 text-center">portal.hooklyne.com</span>
              </div>
            </div>
          </div>

          {/* Video content */}
          <div
            className="overflow-hidden border border-t-0 rounded-b-2xl"
            style={{ borderColor: "var(--border)", maxHeight: "560px" }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/hooklyne-hero.png"
              style={{
                width: "100%",
                display: "block",
                /* Crop letterbox bars: scale up slightly and clip top/bottom */
                transform: "scale(1.01) translateY(0%)",
                objectFit: "cover",
                objectPosition: "center center",
                marginTop: "-6%",
                marginBottom: "-6%",
              }}
            >
              <source src="/Hooklyne%20Intro%20video.webm" type="video/webm" />
              <source src="/Hooklyne%20Intro%20video.mp4" type="video/mp4" />
            </video>
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
