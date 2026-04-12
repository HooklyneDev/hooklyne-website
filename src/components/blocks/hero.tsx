import { ArrowRight, Zap, Users, FileText, Bell } from "lucide-react";
import { DashedLine } from "@/components/dashed-line";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Signal-ranked prospects",
    description: "Ranked by how relevant their latest news is to what you sell. Every first touch has a real reason.",
    icon: Zap,
  },
  {
    title: "Smart person matching",
    description: "Describe who you want by role, not job title. We find the right person across title variants.",
    icon: Users,
  },
  {
    title: "Outreach written in your voice",
    description: "A signal-anchored email and LinkedIn invite in your sender's actual tone. Ready to send.",
    icon: FileText,
  },
  {
    title: "Real-time signal monitoring",
    description: "Track companies over time. When something relevant happens, you get a ready-to-send follow-up.",
    icon: Bell,
  },
];

export const Hero = () => {
  return (
    <section className="py-20 lg:py-24 lg:pt-36">
      <div className="container flex flex-col justify-between gap-8 md:gap-14 lg:flex-row lg:gap-20">
        {/* Left */}
        <div className="lg:flex-[0.9]">
          <h1 className="text-[var(--hooklyne-navy)] max-w-lg text-3xl tracking-tight md:text-4xl lg:text-5xl leading-[1.1]">
            Find the prospects actually worth reaching out to.
          </h1>

          <p className="text-[var(--muted-foreground)] mt-5 max-w-md text-lg leading-relaxed">
            Ranked by relevant news signals - so every first touch has a real reason, with a ready-to-send message already written in your voice.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
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

        {/* Right - feature list */}
        <div className="relative flex flex-1 flex-col justify-center space-y-5 max-lg:pt-10 lg:pl-20 lg:max-w-none">
          <DashedLine
            orientation="vertical"
            className="absolute top-0 left-0 max-lg:hidden"
          />
          <DashedLine
            orientation="horizontal"
            className="absolute top-0 lg:hidden"
          />
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="flex gap-2.5 lg:gap-5">
                <Icon className="text-[var(--hooklyne-blue)] mt-1 size-4 shrink-0 lg:size-5" />
                <div>
                  <h2 className="font-text text-[var(--hooklyne-navy)] font-semibold">
                    {feature.title}
                  </h2>
                  <p className="text-[var(--muted-foreground)] text-sm max-w-72">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hero image - placeholder */}
      <div className="mt-8 max-lg:ml-6 max-lg:h-[400px] max-lg:overflow-hidden md:mt-12 lg:container lg:mt-16">
        <div className="relative h-[520px] w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-lg flex items-center justify-center">
          <div className="text-center">
            <div className="size-14 rounded-2xl bg-[var(--hooklyne-blue)]/10 flex items-center justify-center mx-auto mb-3">
              <FileText className="size-7 text-[var(--hooklyne-blue)]" />
            </div>
            <p className="text-sm font-medium text-[var(--muted-foreground)]">Product screenshot goes here</p>
            <p className="text-xs text-[var(--muted-foreground)]/50 mt-1 max-w-xs mx-auto">Portal screenshot - prospect card with signal score, verified contact, and outreach preview</p>
          </div>
        </div>
      </div>
    </section>
  );
};
