import { Quote } from "lucide-react";

export const FounderQuote = () => (
 <section className="py-20 lg:py-28" data-fade>
 <div className="container max-w-3xl">
 <div
 className="rounded-3xl p-10 lg:p-14 text-center relative overflow-hidden"
 style={{
 background: `
 radial-gradient(ellipse 80% 60% at 50% 0%, rgba(52,76,163,0.10), transparent 70%),
 linear-gradient(180deg, var(--card) 0%, var(--card-hover) 100%)
 `,
 boxShadow: "var(--shadow-md)",
 }}
 >
 <Quote className="size-8 mx-auto mb-6 text-[var(--hooklyne-blue)]" strokeWidth={1.5} />
 <blockquote className="text-xl md:text-2xl font-medium text-[var(--heading)] leading-snug mb-6">
 Most teams can't choose between proper research and enough outreach, so they sacrifice both. We built Hooklyne so they don't have to.
 </blockquote>
 <div className="flex items-center justify-center gap-3">
 <div className="size-10 rounded-full bg-[var(--hooklyne-blue)]/15 flex items-center justify-center text-[var(--hooklyne-blue)] font-semibold">
 T
 </div>
 <div className="text-left">
 <div className="text-sm font-semibold text-[var(--heading)]">Tim</div>
 <div className="text-xs text-[var(--muted-foreground)]">Founder, Hooklyne</div>
 </div>
 </div>
 </div>
 </div>
 </section>
);
