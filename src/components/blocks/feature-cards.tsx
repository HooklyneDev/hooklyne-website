import { ChevronRight } from "lucide-react";
import { DashedLine } from "@/components/dashed-line";
import { Card, CardContent } from "@/components/ui/card";

const cards = [
  {
    title: "Signal-ranked prospects",
    description: "Ranked by how relevant their latest developments are to what you sell. Every first touch has a real reason - not a template, not a guess.",
    imageAlt: "Replace with: prospect card showing signal score badge, news hook with relevance score (e.g. 9/10) and source URL",
    href: "/#how-it-works",
  },
  {
    title: "Outreach written in your voice",
    description: "Not a template. A signal-anchored email and LinkedIn invite in your sender's actual tone, ready to send.",
    imageAlt: "Replace with: side-by-side comparison - generic template (faded) vs Hooklyne-written email with news hook woven in",
    href: "/#how-it-works",
  },
  {
    title: "Smart person matching",
    description: "Describe who you want by role, not job title. We find the right person across title variants and local language. 20+ sources, triple verified.",
    imageAlt: "Replace with: contact card showing verified email, role match indicator, and source badges (LinkedIn, Registry, Web)",
    href: "/#how-it-works",
  },
];

export const FeatureCards = () => {
  return (
    <section className="pb-24 lg:pb-28">
      <div className="container">
        <div className="relative flex items-center justify-center mb-12">
          <DashedLine className="text-muted-foreground" />
          <span className="bg-muted text-muted-foreground absolute px-3 font-mono text-sm font-medium tracking-wide max-md:hidden">
            WHAT HOOKLYNE DELIVERS
          </span>
        </div>

        <div className="mx-auto mb-10 grid max-w-4xl items-center gap-3 md:gap-0 lg:grid-cols-2">
          <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl text-[var(--hooklyne-navy)]">
            The research layer your team actually needs
          </h2>
          <p className="text-[var(--muted-foreground)] leading-snug">
            A signal-ranked outreach engine for B2B sales teams. Every prospect comes with a real reason to reach out - found, matched, and written for you.
          </p>
        </div>

        <Card className="rounded-3xl">
          <CardContent className="flex p-0 max-md:flex-col">
            {cards.map((card, i) => (
              <div key={i} className="flex flex-1 max-md:flex-col">
                <div className="flex-1 p-4 pe-0! md:p-6">
                  {/* Image placeholder */}
                  <div className="relative aspect-[1.4/1] overflow-hidden rounded-xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center">
                    <p className="text-xs text-[var(--muted-foreground)]/50 text-center px-4">{card.imageAlt}</p>
                  </div>

                  <a
                    href={card.href}
                    className="group flex items-center justify-between gap-4 pe-4 pt-4 md:pe-6 md:pt-6"
                  >
                    <div>
                      <h3 className="font-display text-xl leading-tight font-bold tracking-tight text-[var(--hooklyne-navy)] mb-1">
                        {card.title}
                      </h3>
                      <p className="text-sm text-[var(--muted-foreground)] leading-relaxed max-w-56">
                        {card.description}
                      </p>
                    </div>
                    <div className="rounded-full border p-2 shrink-0">
                      <ChevronRight className="size-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </a>
                </div>
                {i < cards.length - 1 && (
                  <div className="relative hidden md:block">
                    <DashedLine orientation="vertical" />
                  </div>
                )}
                {i < cards.length - 1 && (
                  <div className="relative block md:hidden">
                    <DashedLine orientation="horizontal" />
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
