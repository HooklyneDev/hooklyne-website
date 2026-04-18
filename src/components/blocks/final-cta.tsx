import { ArrowRight } from "lucide-react";

export const FinalCTA = () => (
  <section className="py-20 lg:py-28">
    <div className="container max-w-6xl">
      <div
        className="relative rounded-3xl overflow-hidden p-10 lg:p-16 text-center text-white"
        style={{
          background: `
            radial-gradient(ellipse 60% 60% at 20% 0%, rgba(52,76,163,0.55), transparent 65%),
            radial-gradient(ellipse 50% 60% at 100% 100%, rgba(13,148,136,0.35), transparent 65%),
            linear-gradient(135deg, var(--hooklyne-navy) 0%, #021f37 100%)
          `,
          boxShadow: "var(--shadow-2xl)",
        }}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-4 leading-tight">
          Start your free pilot.
        </h2>
        <p className="text-base md:text-lg text-white/75 max-w-xl mx-auto mb-8">
          10 prospects. Full packages. No payment needed. In exchange for a 20-min feedback call.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-lg bg-white text-[var(--hooklyne-navy)] px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Book a demo
            <ArrowRight className="size-4" />
          </a>
          <a
            href="/pricing"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/85 hover:text-white transition-colors"
          >
            See pricing
            <ArrowRight className="size-3.5" />
          </a>
        </div>
      </div>
    </div>
  </section>
);
