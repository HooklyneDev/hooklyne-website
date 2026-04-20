import { Database, Building2 } from "lucide-react";

const EN = {
  eyebrow: "Where Hooklyne sits",
  headline: "Between a database and an agency.",
  body: "Databases hand you rows to filter. Agencies take the whole job off your plate for €2,500+/mo. Hooklyne is the research layer between - proper research, ready-to-send outreach, without replacing your rep.",
  segments: {
    left: {
      label: "Contact databases",
      sub: "Rows to filter",
      price: "€",
    },
    center: {
      label: "Hooklyne",
      sub: "The research layer",
      price: "€€",
    },
    right: {
      label: "Outbound agencies",
      sub: "Fully outsourced",
      price: "€€€+",
    },
  },
};

const NL = {
  eyebrow: "Waar Hooklyne zit",
  headline: "Tussen een database en een agency.",
  body: "Databases geven je rijen om te filteren. Agencies nemen de hele taak over voor €2.500+/mo. Hooklyne is de onderzoekslaag daartussenin - gedegen research, verzendklare outreach, zonder je rep te vervangen.",
  segments: {
    left: {
      label: "Contactdatabases",
      sub: "Rijen om te filteren",
      price: "€",
    },
    center: {
      label: "Hooklyne",
      sub: "De onderzoekslaag",
      price: "€€",
    },
    right: {
      label: "Outbound agencies",
      sub: "Volledig uitbesteed",
      price: "€€€+",
    },
  },
};

export const PositioningBar = ({ lang = "en" }: { lang?: "en" | "nl" }) => {
  const t = lang === "nl" ? NL : EN;

  return (
    <section className="py-14 lg:py-20" data-fade>
      <div className="container max-w-6xl">

        {/* Header */}
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted-foreground)] mb-4">
            {t.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[var(--heading)] tracking-tight leading-[1.1] mb-5">
            {t.headline}
          </h2>
          <p className="text-base text-[var(--muted-foreground)] leading-relaxed">
            {t.body}
          </p>
        </div>

        {/* Spectrum bar */}
        <div className="flex rounded-2xl overflow-hidden" style={{ boxShadow: "var(--shadow-md)" }}>

          {/* Left: Contact databases */}
          <div
            className="flex-[3] px-6 py-7 flex flex-col gap-3"
            style={{ background: "var(--card-hover)", borderRight: "1px solid var(--border)" }}
          >
            <div className="flex items-center gap-2.5">
              <span
                className="inline-flex items-center justify-center size-8 rounded-lg shrink-0"
                style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}
              >
                <Database className="size-4" />
              </span>
              <div>
                <div className="text-sm font-semibold text-[var(--heading)]">{t.segments.left.label}</div>
                <div className="text-xs text-[var(--muted-foreground)]">{t.segments.left.sub}</div>
              </div>
            </div>
            <div
              className="self-start text-xs font-bold tracking-widest px-2 py-0.5 rounded"
              style={{ background: "var(--border)", color: "var(--muted-foreground)" }}
            >
              {t.segments.left.price}
            </div>
          </div>

          {/* Center: Hooklyne */}
          <div
            className="flex-[4] px-6 py-7 flex flex-col gap-3 relative"
            style={{
              background: "var(--hooklyne-navy)",
              outline: "2px solid var(--hooklyne-orange)",
              outlineOffset: "-2px",
            }}
          >
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center justify-center size-8 rounded-lg shrink-0 bg-white/10">
                <img src="/logo-mark.svg" alt="" className="size-5 block" />
              </span>
              <div>
                <div className="text-sm font-semibold text-white">{t.segments.center.label}</div>
                <div className="text-xs text-white/70">{t.segments.center.sub}</div>
              </div>
            </div>
            <div
              className="self-start text-xs font-bold tracking-widest px-2 py-0.5 rounded"
              style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)" }}
            >
              {t.segments.center.price}
            </div>
          </div>

          {/* Right: Outbound agencies */}
          <div
            className="flex-[3] px-6 py-7 flex flex-col gap-3"
            style={{ background: "var(--card)", borderLeft: "1px solid var(--border)" }}
          >
            <div className="flex items-center gap-2.5">
              <span
                className="inline-flex items-center justify-center size-8 rounded-lg shrink-0"
                style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}
              >
                <Building2 className="size-4" />
              </span>
              <div>
                <div className="text-sm font-semibold text-[var(--heading)]">{t.segments.right.label}</div>
                <div className="text-xs text-[var(--muted-foreground)]">{t.segments.right.sub}</div>
              </div>
            </div>
            <div
              className="self-start text-xs font-bold tracking-widest px-2 py-0.5 rounded"
              style={{ background: "var(--border)", color: "var(--muted-foreground)" }}
            >
              {t.segments.right.price}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
