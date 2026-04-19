import { cn } from "@/lib/utils";

const SECTIONS = [
  {
    title: "Your research layer between cheap data and expensive agencies.",
    body: "Databases give you a name. Agencies run campaigns for €2,500+/mo. We give your team the research and the outreach at a fraction, without replacing anyone.",
    image: "/home/hooklyne-research-layer-b2b-prospecting.webp",
    alt: "Hooklyne portal showing the research layer between raw data and full-service agencies for B2B prospecting",
  },
  {
    title: "Dutch-built. International reach.",
    body: "Native Dutch outreach with cultural tone, not translations. For Dutch companies reaching out to EU in English, we adjust for communication styles. EN + NL from day one.",
    image: "/home/hooklyne-dutch-international-outreach.webp",
    alt: "Hooklyne portal showing Dutch and international prospect outreach with native language support",
  },
];

export const FeatureShowcase = () => (
  <section className="py-20 lg:py-28" data-fade>
    <div className="container max-w-6xl flex flex-col gap-24 lg:gap-32">
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
            <div className="rounded-3xl p-3" style={{ background: "radial-gradient(ellipse 90% 80% at 50% 50%, rgba(52,76,163,0.10) 0%, transparent 70%)" }}>
              <div className="rounded-2xl overflow-hidden aspect-video" style={{ boxShadow: "var(--shadow-lg)" }}>
                <img src={s.image} alt={s.alt} className="w-full h-full object-cover object-top" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </section>
);
