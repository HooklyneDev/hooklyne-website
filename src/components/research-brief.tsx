import { ExternalLink } from "lucide-react";
import { useLang } from "@/lib/use-lang";

/**
 * ResearchBrief - bespoke mock of a sourced research brief.
 * Uses the same chrome frame as PortalShot but renders real-looking
 * brief copy with inline numbered citations + a sources panel.
 * Everything inside is fictional, labelled as example output.
 */

export const ResearchBrief = ({ lang: langProp }: { lang?: "en" | "nl" } = {}) => {
  const detected = useLang();
  const lang = langProp ?? detected;
  const isNL = lang === "nl";

  const t = isNL ? {
    crumb: "Prospect / Research-brief",
    sourced: "Onderbouwd",
    company: "Acme B.V.",
    sector: "Industriële OEM · Rotterdam",
    briefVer: "Brief · v3",
    whyNow: "Waarom nu",
    p1Pre: "€12M Series B opgehaald, geleid door een Nederlands groeifonds",
    p1Mid: " met de opbrengst gereserveerd voor een nieuwe service-model productlijn gepland voor Q2",
    p2Pre: "Sectorale vrachttarieven zijn 18% omhoog kwartaal-op-kwartaal, wat marges drukt op hun huidige pay-as-you-go-prijsmodel",
    p2Post: " - dat geeft echte druk om eerder over te stappen op het service-model.",
    sourcesTitle: "Bronnen · 3",
    sourcesNote: "Elke claim controleerbaar",
    disclaimer: "Voorbeeld · fictief bedrijf",
    sources: [
      { n: 1, label: "Funding tracker",  host: "trackers / funding-db",   meta: "2u geleden" },
      { n: 2, label: "Bedrijfsblog",     host: "acme.example / blog",     meta: "3u geleden" },
      { n: 3, label: "Sectorbronnen",    host: "trackers / sector-index", meta: "6u geleden" },
    ],
  } : {
    crumb: "Prospect / Research brief",
    sourced: "Sourced",
    company: "Acme B.V.",
    sector: "Industrial OEM · Rotterdam",
    briefVer: "Brief · v3",
    whyNow: "Why now",
    p1Pre: "Closed a €12M Series B led by a Dutch growth fund",
    p1Mid: " with proceeds earmarked for a new service-model product line scheduled for Q2",
    p2Pre: "Sector freight rates are up 18% quarter-over-quarter, which compresses margins on their current pay-as-you-go pricing",
    p2Post: " - creating real pressure to move to the service model sooner.",
    sourcesTitle: "Sources · 3",
    sourcesNote: "Every claim citable",
    disclaimer: "Example output · fictional company",
    sources: [
      { n: 1, label: "Funding tracker",   host: "trackers / funding-db",   meta: "Pulled 2h ago" },
      { n: 2, label: "Company blog",      host: "acme.example / blog",     meta: "Pulled 3h ago" },
      { n: 3, label: "Industry trackers", host: "trackers / sector-index", meta: "Pulled 6h ago" },
    ],
  };
  const sources = t.sources;

  return (
    <div className="relative w-full rounded-2xl overflow-visible">
      {/* Glow wash */}
      <div
        className="absolute -inset-4 rounded-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(52,76,163,0.10) 0%, transparent 70%)" }}
      />

      <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "var(--shadow-lg)" }}>
        {/* Chrome bar */}
        <div
          className="flex items-center gap-3 px-4 border border-b-0 rounded-t-2xl"
          style={{ height: "36px", background: "var(--card)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="size-2 rounded-full" style={{ background: "var(--border-strong)" }} />
            <div className="size-2 rounded-full" style={{ background: "var(--border-strong)" }} />
            <div className="size-2 rounded-full" style={{ background: "var(--border-strong)" }} />
          </div>
          <div className="h-3 w-px" style={{ background: "var(--border)" }} />
          <div className="flex-1 flex items-center gap-1.5 text-[11px] font-medium truncate" style={{ color: "var(--muted-foreground)" }}>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--hooklyne-blue)" }}>Hooklyne</span>
            <span style={{ opacity: 0.4 }}>/</span>
            <span className="truncate" style={{ color: "var(--heading)" }}>{t.crumb}</span>
          </div>
          <div
            className="shrink-0 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold"
            style={{ background: "rgba(13,148,136,0.12)", color: "var(--hooklyne-teal)" }}
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full opacity-70 animate-ping" style={{ background: "var(--hooklyne-teal)" }} />
              <span className="relative inline-flex rounded-full size-1.5" style={{ background: "var(--hooklyne-teal)" }} />
            </span>
            {t.sourced}
          </div>
        </div>

        {/* Body */}
        <div
          className="glass-off relative border border-t-0 rounded-b-2xl p-6 lg:p-8"
          style={{
            borderColor: "var(--border)",
            background: `radial-gradient(ellipse 60% 40% at 30% 20%, rgba(52,76,163,0.10), transparent 60%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(13,148,136,0.06), transparent 60%), linear-gradient(135deg, var(--card) 0%, var(--card-hover) 100%)`,
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div
                className="size-9 rounded-lg relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #1e3a8a 0%, #2b4fb3 100%)",
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), inset 0 -8px 12px rgba(0,0,0,0.08)",
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="absolute inset-0 m-auto" width="22" height="22" style={{ color: "#fff" }}>
                  <path d="M6 22 L12 6 L18 22 M9 16 H15" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div className="text-[13px] font-semibold text-[var(--heading)] leading-tight">{t.company}</div>
                <div className="text-[11px] text-[var(--muted-foreground)]">{t.sector}</div>
              </div>
            </div>
            <span className="text-[9px] font-mono uppercase tracking-widest text-[var(--muted-foreground)]/70">
              {t.briefVer}
            </span>
          </div>

          {/* Why-now line */}
          <div className="mb-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-1 rounded" style={{ background: "rgba(255,140,66,0.12)", color: "var(--hooklyne-orange)" }}>
            <span>{t.whyNow}</span>
          </div>

          {/* Brief copy with inline citations */}
          <div className="space-y-3 text-[13px] leading-relaxed text-[var(--heading)]">
            <p>
              {t.p1Pre}
              <Cite n={1} />
              {t.p1Mid}
              <Cite n={2} />.
            </p>
            <p>
              {t.p2Pre}
              <Cite n={3} />
              {t.p2Post}
            </p>
          </div>

          {/* Sources panel */}
          <div className="mt-6 pt-4 border-t border-dashed border-[var(--border)]">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                {t.sourcesTitle}
              </div>
              <div className="text-[10px] text-[var(--muted-foreground)]/70">{t.sourcesNote}</div>
            </div>
            <ul className="space-y-2">
              {sources.map((s) => (
                <li
                  key={s.n}
                  className="flex items-center gap-3 rounded-lg px-3 py-2"
                  style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                >
                  <span
                    className="inline-flex items-center justify-center size-5 rounded text-[10px] font-bold shrink-0"
                    style={{ background: "rgba(52,76,163,0.10)", color: "var(--hooklyne-blue)" }}
                  >
                    {s.n}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11.5px] font-semibold text-[var(--heading)] leading-tight truncate">
                      {s.label}
                    </div>
                    <div className="text-[10px] font-mono text-[var(--muted-foreground)]/80 truncate">
                      {s.host}
                    </div>
                  </div>
                  <span className="text-[10px] text-[var(--muted-foreground)] shrink-0">{s.meta}</span>
                  <ExternalLink className="size-3 text-[var(--muted-foreground)]/60 shrink-0" />
                </li>
              ))}
            </ul>
          </div>

          {/* Fictional disclaimer */}
          <p className="mt-4 text-[9px] uppercase tracking-[0.2em] text-[var(--muted-foreground)]/60">
            {t.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
};

const Cite = ({ n }: { n: number }) => (
  <sup
    className="inline-flex items-center justify-center align-super ml-0.5 size-4 rounded text-[9px] font-bold"
    style={{ background: "rgba(52,76,163,0.12)", color: "var(--hooklyne-blue)" }}
  >
    {n}
  </sup>
);
