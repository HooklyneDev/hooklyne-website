import { useLang, type Lang } from "@/lib/use-lang";
import { Avatar } from "@/components/avatar";

const EN = {
  eyebrow: "Early users",
  headline: "What pilots are saying.",
  sub: "Three months in, three pilots running. Here's what they tell us.",
  quotes: [
    {
      quote: "First time I'm sending five emails a day instead of one. The research that used to take me an hour each is just there.",
      name: "Founder",
      role: "B2B SaaS, Series A",
      tone: "blue" as const,
    },
    {
      quote: "The voice match surprised me. The drafts read like our team wrote them, not a tool. We barely edit them anymore.",
      name: "VP Sales",
      role: "Logistics, 60 employees",
      tone: "teal" as const,
    },
    {
      quote: "Reply rate went from 4% to 11% on signal-driven outreach. That's the only metric that mattered.",
      name: "Head of Growth",
      role: "B2B services, 25 employees",
      tone: "orange" as const,
    },
  ],
};

const NL = {
  eyebrow: "Early users",
  headline: "Wat pilots zeggen.",
  sub: "Drie maanden in, drie pilots actief. Dit horen we terug.",
  quotes: [
    {
      quote: "Voor het eerst stuur ik vijf mails per dag in plaats van één. Het onderzoek dat me eerder een uur per stuk kostte ligt klaar.",
      name: "Founder",
      role: "B2B SaaS, Series A",
      tone: "blue" as const,
    },
    {
      quote: "De stemkalibratie verbaasde me. De concepten lezen alsof ons team ze schreef, niet een tool. We passen er nauwelijks iets aan.",
      name: "VP Sales",
      role: "Logistiek, 60 medewerkers",
      tone: "teal" as const,
    },
    {
      quote: "Response rate ging van 4% naar 11% op signaalgedreven outreach. Dat was het enige cijfer dat telde.",
      name: "Head of Growth",
      role: "B2B-diensten, 25 medewerkers",
      tone: "orange" as const,
    },
  ],
};

export const QuoteStrip = ({ lang: langProp }: { lang?: Lang } = {}) => {
  const lang = useLang(langProp);
  const t = lang === "nl" ? NL : EN;

  return (
    <section className="pt-12 pb-12 lg:pt-16 lg:pb-16 dot-grid" data-fade>
      <div className="container max-w-6xl">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--hooklyne-blue)] mb-3">
            {t.eyebrow}
          </p>
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-[var(--heading)] mb-3">
            {t.headline}
          </h2>
          <p className="text-sm md:text-base text-[var(--muted-foreground)] max-w-xl mx-auto leading-relaxed">
            {t.sub}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {t.quotes.map((q, i) => (
            <figure
              key={i}
              className="rounded-2xl p-5 md:p-6 flex flex-col gap-4"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <blockquote className="text-[14.5px] leading-relaxed text-[var(--heading)]">
                <span className="text-[var(--hooklyne-blue)] font-semibold mr-0.5">"</span>
                {q.quote}
                <span className="text-[var(--hooklyne-blue)] font-semibold ml-0.5">"</span>
              </blockquote>
              <figcaption className="flex items-center gap-3 mt-auto pt-3 border-t" style={{ borderColor: "var(--border)" }}>
                <Avatar name={q.name} tone={q.tone} size="md" />
                <div className="leading-tight">
                  <div className="text-[12.5px] font-semibold text-[var(--heading)]">{q.name}</div>
                  <div className="text-[11px] text-[var(--muted-foreground)]">{q.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="text-[11px] text-center text-[var(--muted-foreground)] mt-6 italic">
          {lang === "nl"
            ? "Anonimiteit op verzoek van pilots tijdens early access."
            : "Anonymised at pilots' request during early access."}
        </p>
      </div>
    </section>
  );
};
