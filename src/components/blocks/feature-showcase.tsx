import { cn } from "@/lib/utils";

const SECTIONS = [
  {
    title: "Between a cheap database and a €2,500 agency.",
    body: "Databases give you a row. Agencies take the sending away. We sit in the middle - research-grade prospecting and ready-to-send outreach, at a fraction of agency cost. Your team still ships.",
    image: "/home/hooklyne-research-layer-b2b-prospecting.webp",
    alt: "PLACEHOLDER: Illustration/diagram showing three columns - 'Contact databases' (raw rows), 'Hooklyne' (full prospect package card in the middle, visually emphasised), 'Outbound agencies' (price tag of €2,500+/mo) - with the middle column annotated 'You keep the sending'.",
  },
  {
    title: "Native Dutch. Natural English.",
    body: "Written, not translated. Language is picked from the company domain and the contact's location at prospecting, then locked. Dutch-to-Dutch reads differently than Dutch-to-UK, and the output knows it.",
    image: "/home/hooklyne-dutch-international-outreach.webp",
    alt: "PLACEHOLDER: Portal screenshot with a prospect card duplicated side-by-side - left version in Dutch for a Rotterdam prospect, right version in English for a UK prospect. A language toggle pill sits above, tone-notes overlaid on each draft ('Direct, no small talk' / 'Warmer opening').",
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
