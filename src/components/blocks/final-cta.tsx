import { ArrowRight } from "lucide-react";

export const FinalCTA = () => (
  <section
    className="relative overflow-hidden text-white"
    data-fade
    style={{
      background: `
        radial-gradient(ellipse 55% 70% at 15% 0%, rgba(52,76,163,0.55), transparent 65%),
        radial-gradient(ellipse 45% 70% at 100% 100%, rgba(13,148,136,0.30), transparent 65%),
        radial-gradient(ellipse 40% 70% at 70% 0%, rgba(255,140,66,0.14), transparent 65%),
        linear-gradient(135deg, var(--hooklyne-navy) 0%, #021f37 100%)
      `,
    }}
  >
    {/* subtle top hairline */}
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-0 h-px"
      style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.18), transparent)" }}
    />

    <div className="container max-w-5xl py-16 lg:py-24 text-center relative z-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55 mb-5">
        Free pilot
      </p>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-4 leading-[1.1]">
        Try 10 prospects, free.
      </h2>
      <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">
        Ten fully built prospects. Verified contacts, real signals, messages in your voice. In exchange for a 20-minute feedback call.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <a
          href="/contact"
          className="inline-flex items-center gap-1.5 rounded-lg bg-white text-[var(--hooklyne-navy)] px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity group btn-shine"
        >
          Start your free pilot
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </a>
        <a
          href="/pricing"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-white/85 hover:text-white transition-colors group"
        >
          See pricing
          <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  </section>
);
