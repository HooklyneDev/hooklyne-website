import { ArrowRight, Target, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const proof = [
  { label: "Prospects per package", value: "10" },
  { label: "Avg. research hours saved", value: "4h+" },
  { label: "Languages supported", value: "NL + EN" },
];

export const Hero = () => {
  return (
    <section className="py-28 lg:py-32 lg:pt-48">
      <div className="container">
        {/* Badge */}
        <div className="mb-6 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--hooklyne-blue)]/20 bg-[var(--hooklyne-blue)]/5 px-3 py-1 text-xs font-semibold text-[var(--hooklyne-blue)] uppercase tracking-wide">
            <span className="size-1.5 rounded-full bg-[var(--hooklyne-orange)] inline-block" />
            Invite-only pilot
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-[var(--hooklyne-navy)] max-w-3xl text-4xl tracking-tight md:text-5xl lg:text-6xl leading-[1.1]">
          Stop researching leads.<br />
          Start closing them.
        </h1>

        <p className="text-[var(--muted-foreground)] mt-6 max-w-xl text-lg md:text-xl leading-relaxed">
          Hooklyne finds your next prospects, matches the right contact, and writes the outreach - in your voice, ready to send.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a href="/contact">
            <Button
              className="h-11 px-6 text-sm font-semibold rounded-lg"
              style={{ backgroundColor: "var(--hooklyne-navy)", color: "#ffffff" }}
            >
              Book a demo
              <ArrowRight className="ml-1.5 size-4" />
            </Button>
          </a>
          <a
            href="/#how-it-works"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--hooklyne-blue)] transition-colors"
          >
            See how it works
            <ArrowRight className="size-3.5" />
          </a>
        </div>

        {/* Social proof strip */}
        <div className="mt-12 flex flex-wrap gap-8">
          {proof.map((item) => (
            <div key={item.label}>
              <div className="text-2xl font-bold text-[var(--hooklyne-navy)]">{item.value}</div>
              <div className="text-sm text-[var(--muted-foreground)] mt-0.5">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Flow diagram - placeholder for screenshot */}
      <div className="mt-16 md:mt-20 lg:mt-24 max-lg:ml-6 max-lg:h-[550px] max-lg:overflow-hidden lg:container">
        <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-xl overflow-hidden">
          {/* Workflow steps bar */}
          <div className="flex items-center gap-0 border-b border-[var(--border)] overflow-x-auto px-6 py-3 bg-[var(--bg)]">
            {["Describe", "Ranked list", "Select", "Contact found", "Outreach written", "My Leads"].map((step, i, arr) => (
              <div key={step} className="flex items-center gap-0 shrink-0">
                <span className={`text-xs font-medium px-2 py-1 rounded ${i === 4 ? "text-[var(--hooklyne-blue)] font-semibold" : "text-[var(--muted-foreground)]"}`}>
                  {step}
                </span>
                {i < arr.length - 1 && (
                  <span className="text-[var(--border)] text-xs mx-0.5">›</span>
                )}
              </div>
            ))}
          </div>

          {/* Mock content area */}
          <div className="p-6 min-h-[340px] flex flex-col gap-4">
            <div className="flex items-start gap-4">
              {/* Left - prospect card */}
              <div className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">Today's focus</span>
                  <span className="text-xs font-semibold text-[var(--hooklyne-orange)] bg-[var(--hooklyne-orange)]/10 px-2 py-0.5 rounded-full">Act today</span>
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-32 rounded bg-[var(--border)]" />
                  <div className="h-2.5 w-full rounded bg-[var(--border)]/60" />
                  <div className="h-2.5 w-5/6 rounded bg-[var(--border)]/60" />
                  <div className="h-2.5 w-4/6 rounded bg-[var(--border)]/60" />
                </div>
                <div className="mt-4 inline-block rounded-full bg-[var(--hooklyne-blue)]/10 px-3 py-1 text-xs font-medium text-[var(--hooklyne-blue)]">
                  OPENING
                </div>
              </div>

              {/* Right - signal heat */}
              <div className="w-64 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">Signal heat</span>
                  <span className="text-xs text-[var(--hooklyne-blue)]">View all →</span>
                </div>
                {[
                  { name: "Acme BV", score: "38.6", contact: "Lisa van Dam" },
                  { name: "Brouwer & Co", score: "14.1", contact: "Mark Janssen" },
                  { name: "Delta Groep", score: "8.3", contact: "Petra Smit" },
                ].map((lead) => (
                  <div key={lead.name} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
                    <div>
                      <div className="text-xs font-semibold text-[var(--foreground)]">{lead.name}</div>
                      <div className="text-xs text-[var(--muted-foreground)]">{lead.contact}</div>
                    </div>
                    <span className="text-xs font-bold text-[var(--hooklyne-orange)]">{lead.score}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Outreach preview */}
            <div className="rounded-xl border border-[var(--hooklyne-blue)]/20 bg-[var(--hooklyne-blue)]/3 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="size-2 rounded-full bg-[var(--hooklyne-teal)]" />
                <span className="text-xs font-semibold text-[var(--hooklyne-blue)]">Outreach ready - Lisa van Dam, Acme BV</span>
              </div>
              <div className="space-y-1.5">
                <div className="h-2 w-full rounded bg-[var(--hooklyne-blue)]/10" />
                <div className="h-2 w-5/6 rounded bg-[var(--hooklyne-blue)]/10" />
                <div className="h-2 w-4/6 rounded bg-[var(--hooklyne-blue)]/10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
