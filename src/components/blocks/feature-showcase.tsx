import { ScreenPlaceholder } from "@/components/screen-placeholder";
import { cn } from "@/lib/utils";

const SECTIONS = [
  {
    title: "Your research layer between cheap data and expensive agencies.",
    body: "Databases give you a name. Agencies run campaigns for €2,500+/mo. We give your team the research and the outreach at a fraction, without replacing anyone.",
    placeholder: { label: "Positioning: 3-tier diagram", hint: "Databases (bottom) → Hooklyne (middle, highlighted) → Agencies (top)", accent: "blue" as const, ratio: "4/3" as const },
  },
  {
    title: "Dutch-built. International reach.",
    body: "Native Dutch outreach with cultural tone, not translations. For Dutch companies reaching out to EU in English, we adjust for communication styles. EN + NL from day one.",
    placeholder: { label: "EN + NL outreach side by side", hint: "Dutch email (left) + English email (right), same prospect, both personalized", accent: "navy" as const, ratio: "4/3" as const },
  },
];

export const FeatureShowcase = () => (
  <section className="py-20 lg:py-28">
    <div className="container flex flex-col gap-24 lg:gap-32">
      {SECTIONS.map((s, i) => {
        const reverse = i % 2 === 1;
        return (
          <div
            key={s.title}
            className={cn(
              "grid lg:grid-cols-2 gap-10 lg:gap-16 items-center",
              reverse && "lg:[&>*:first-child]:order-2",
            )}
          >
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[var(--heading)] tracking-tight mb-5 leading-tight">
                {s.title}
              </h2>
              <p className="text-base text-[var(--muted-foreground)] leading-relaxed max-w-lg">{s.body}</p>
            </div>
            <ScreenPlaceholder {...s.placeholder} />
          </div>
        );
      })}
    </div>
  </section>
);
