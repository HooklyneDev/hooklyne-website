import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
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

      <div className="container mt-14 lg:mt-16">
        <div className="relative w-full rounded-t-2xl border border-b-0 border-[var(--border)] shadow-xl overflow-hidden" style={{ maxHeight: "600px" }}>
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
      </div>
    </section>
  );
};
