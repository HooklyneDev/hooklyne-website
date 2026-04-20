import { Briefcase, MapPin, Users } from "lucide-react";

const EN = {
  eyebrow: "From the founder",
  quote: "Most teams can't pick between proper research and enough outreach, so they sacrifice both. We built Hooklyne so they don't have to.",
  name: "Tim",
  role: "Founder · Hooklyne · The Netherlands",
  credentials: [
    { label: "10+ years in B2B sales" },
    { label: "Dutch-built, EMEA-native" },
    { label: "Building with and for small sales teams" },
  ],
  closing: "Behind the product. Every day.",
};

const NL = {
  eyebrow: "Van de oprichter",
  quote: "De meeste teams kunnen niet kiezen tussen gedegen onderzoek en voldoende outreach, dus offeren ze allebei op. We bouwden Hooklyne zodat ze dat niet hoeven te doen.",
  name: "Tim",
  role: "Oprichter · Hooklyne · Nederland",
  credentials: [
    { label: "10+ jaar in B2B-sales" },
    { label: "Dutch-built, EMEA-native" },
    { label: "Bouwen met en voor kleine salesteams" },
  ],
  closing: "Achter het product. Elke dag.",
};

const CREDENTIAL_ICONS = [Briefcase, MapPin, Users];

export const FounderSplit = ({ lang = "en" }: { lang?: "en" | "nl" }) => {
  const t = lang === "nl" ? NL : EN;

  return (
    <section className="py-14 lg:py-20" data-fade>
      <div className="container max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: quote */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted-foreground)] mb-6">
              {t.eyebrow}
            </p>

            {/* Decorative quote mark */}
            <div
              aria-hidden="true"
              className="text-7xl leading-none font-serif mb-2 select-none"
              style={{ color: "var(--border)" }}
            >
              &ldquo;
            </div>

            <p className="text-xl md:text-2xl text-[var(--heading)] leading-[1.45] font-normal mb-8">
              {t.quote}
            </p>

            <div>
              <div className="text-base font-medium text-[var(--heading)]">{t.name}</div>
              <div className="text-sm text-[var(--muted-foreground)] mt-0.5">{t.role}</div>
            </div>
          </div>

          {/* Right: credentials */}
          <div className="lg:pt-16">
            <div className="space-y-5">
              {t.credentials.map((c, i) => {
                const Icon = CREDENTIAL_ICONS[i];
                return (
                  <div key={i} className="flex items-center gap-3">
                    <span
                      className="inline-flex items-center justify-center size-8 rounded-lg shrink-0"
                      style={{ background: "var(--hooklyne-navy)", color: "#fff" }}
                    >
                      <Icon className="size-4" />
                    </span>
                    <span className="text-sm text-[var(--heading)]">{c.label}</span>
                  </div>
                );
              })}
            </div>

            <div
              className="mt-8 pt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)]"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              {t.closing}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
