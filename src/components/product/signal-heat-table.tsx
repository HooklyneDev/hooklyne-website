import { useEffect, useState } from "react";
import { GraphicShell } from "./graphic-shell";

/**
 * Prospect Signals - mirrors the real portal screens.
 * Tabs: Actions 4 / Heat Map 6 / Signal Feed 20 (Heat Map active).
 * Stats bar: Tracked / Hottest / New signals. Real company data.
 * Click a row to reveal the drafted outreach matched to that signal.
 */

type Trend = "Rising" | "Stable" | "Cooling";

type Row = {
  company: string;
  contact: string;
  heat: number;
  trend: Trend;
  date: string;
  isNew?: boolean;
  signal: string;
  subject: string;
  body: string[];
};

const ROWS: Row[] = [
  {
    company: "Innocent Drinks",
    contact: "Rebecca Clarke",
    heat: 38.0,
    trend: "Rising",
    date: "Today",
    isNew: true,
    signal: "VP Ops starting Monday + 4 ops roles open",
    subject: "Two diagnostics before the new VP Ops starts Monday",
    body: [
      "Hi Rebecca,",
      "Four ops roles opened in Rotterdam since the Series B, and the new VP Ops starts Monday.",
      "Happy to send the two diagnostics we'd run first. 15 minutes if you'd rather talk.",
      "",
      "Best,",
      "Tim",
      "Hooklyne",
    ],
  },
  {
    company: "Eneco",
    contact: "Laura Smits",
    heat: 24.0,
    trend: "Rising",
    date: "Today",
    isNew: true,
    signal: "CFO change + Q1 earnings call flagged cost review",
    subject: "The cost review the new CFO mentioned on the call",
    body: [
      "Hi Laura,",
      "Caught the Q1 call. The cost review the new CFO flagged lines up with two workstreams we've cut for Dutch utilities post-transition.",
      "Want the short summary of where the savings usually land?",
      "",
      "Best,",
      "Tim",
      "Hooklyne",
    ],
  },
  {
    company: "DPD Netherlands",
    contact: "Mark van den Berg",
    heat: 16.0,
    trend: "Stable",
    date: "Today",
    isNew: true,
    signal: "Hiring 3 route planners + new depot announced",
    subject: "Before the Tilburg depot goes live",
    body: [
      "Hi Mark,",
      "The Tilburg depot plus three route-planner hires is the exact window we usually get pulled in for.",
      "Two questions we'd ask first if useful, or a quick call.",
      "",
      "Best,",
      "Tim",
      "Hooklyne",
    ],
  },
  { company: "Vattenfall", contact: "Sarah Mitchell", heat: 12.0, trend: "Rising", date: "8 Apr 2026", signal: "", subject: "", body: [] },
  { company: "Dachser Netherlands", contact: "Thomas Reiter", heat: 6.0, trend: "Cooling", date: "7 Apr 2026", signal: "", subject: "", body: [] },
  { company: "Siemens Netherlands", contact: "Erik Janssen", heat: 3.0, trend: "Stable", date: "6 Apr 2026", signal: "", subject: "", body: [] },
];

const TREND: Record<Trend, { bg: string; fg: string }> = {
  Rising: { bg: "rgba(13,148,136,0.14)", fg: "var(--hooklyne-teal)" },
  Stable: { bg: "rgba(52,76,163,0.10)", fg: "var(--hooklyne-blue)" },
  Cooling: { bg: "rgba(255,140,66,0.14)", fg: "var(--hooklyne-orange)" },
};

const MAX_HEAT = 38;

export const SignalHeatTable = () => {
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const h = () => setReduced(mq.matches);
    mq.addEventListener("change", h);
    setMounted(true);
    return () => mq.removeEventListener("change", h);
  }, []);

  const selectedRow = selected ? ROWS.find((r) => r.company === selected) ?? null : null;

  return (
    <GraphicShell crumb="Portal / Prospect Signals" status="Live" statusTone="teal" ratio="16/9">
      <style>{`
        @keyframes sh-row { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes sh-bar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes sh-pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(13,148,136,0.4); } 50% { box-shadow: 0 0 0 4px rgba(13,148,136,0); } }
        @keyframes sh-panel { from { opacity: 0; transform: translateX(8px); } to { opacity: 1; transform: translateX(0); } }
        .sh-row { animation: sh-row 0.5s both; }
        .sh-bar { transform-origin: left; animation: sh-bar 1.1s cubic-bezier(.2,.7,.2,1) both; }
        .sh-pulse { animation: sh-pulse 2.4s ease-out infinite; }
        .sh-panel { animation: sh-panel 0.28s cubic-bezier(.2,.7,.2,1) both; }
        .sh-rowbtn { cursor: pointer; transition: background 0.15s; }
        .sh-rowbtn:hover { background: var(--background); }
        @media (prefers-reduced-motion: reduce) {
          .sh-row, .sh-bar, .sh-pulse, .sh-panel { animation: none !important; }
          .sh-bar { transform: scaleX(1); }
        }
      `}</style>

      <div className="absolute inset-0 flex flex-col px-4 py-3 sm:px-6 sm:py-5">
        <div className="flex items-baseline gap-2 mb-1">
          <h3 className="text-base sm:text-xl font-semibold leading-tight tracking-tight" style={{ color: "var(--heading)" }}>
            Prospect Signals
          </h3>
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded" style={{ background: "rgba(124,58,237,0.12)", color: "#7c3aed" }}>
            Beta
          </span>
        </div>
        <p className="text-[10px] sm:text-[11px] mb-2 sm:mb-3" style={{ color: "var(--muted-foreground)" }}>
          Track and act on buying signals from your prospects
        </p>

        <div className="flex items-center gap-4 sm:gap-6 border-b mb-2 sm:mb-3" style={{ borderColor: "var(--border)" }}>
          {[
            { label: "Actions", count: 4, active: false },
            { label: "Heat Map", count: 6, active: true },
            { label: "Signal Feed", count: 20, active: false },
          ].map((t) => (
            <div
              key={t.label}
              className="flex items-center gap-1.5 pb-1.5 sm:pb-2 text-[11px] sm:text-[13px] font-semibold"
              style={{
                color: t.active ? "var(--heading)" : "var(--muted-foreground)",
                borderBottom: t.active ? "2px solid var(--hooklyne-navy)" : "2px solid transparent",
                marginBottom: "-1px",
              }}
            >
              {t.label}
              <span
                className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full"
                style={{
                  background: t.active ? "rgba(220,38,38,0.10)" : "var(--background)",
                  color: t.active ? "#b91c1c" : "var(--muted-foreground)",
                }}
              >
                {t.count}
              </span>
            </div>
          ))}
        </div>

        <div className="rounded-lg p-2 sm:p-2.5 mb-2 sm:mb-3 grid grid-cols-3 gap-2 sm:gap-3" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="size-7 sm:size-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(52,76,163,0.08)" }}>
              <svg className="size-3.5 sm:size-4" style={{ color: "var(--hooklyne-blue)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l6-6 4 4 8-8" /><path d="M14 7h7v7" /></svg>
            </div>
            <div className="min-w-0">
              <p className="text-base sm:text-lg font-semibold leading-none" style={{ color: "var(--heading)" }}>6</p>
              <p className="text-[9px] sm:text-[10px]" style={{ color: "var(--muted-foreground)" }}>Tracked</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 border-l sm:border-l pl-2 sm:pl-3" style={{ borderColor: "var(--border)" }}>
            <div className="size-7 sm:size-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(220,38,38,0.08)" }}>
              <svg className="size-3.5 sm:size-4" style={{ color: "#dc2626" }} viewBox="0 0 24 24" fill="currentColor"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" /></svg>
            </div>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-[13px] font-semibold leading-tight truncate" style={{ color: "var(--heading)" }}>Innocent Drinks</p>
              <p className="text-[9px] sm:text-[10px]" style={{ color: "var(--muted-foreground)" }}>Hottest &middot; 38.0</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 border-l pl-2 sm:pl-3" style={{ borderColor: "var(--border)" }}>
            <div className="size-7 sm:size-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "var(--background)" }}>
              <svg className="size-3.5 sm:size-4" style={{ color: "var(--muted-foreground)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
            </div>
            <div className="min-w-0">
              <p className="text-base sm:text-lg font-semibold leading-none" style={{ color: "var(--hooklyne-teal)" }}>3</p>
              <p className="text-[9px] sm:text-[10px]" style={{ color: "var(--muted-foreground)" }}>New signals</p>
            </div>
          </div>
        </div>

        <div className="relative flex-1 min-h-0 rounded-lg overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="grid items-center grid-cols-[1.5fr_1fr_0.8fr] sm:grid-cols-[1.5fr_1fr_0.8fr_0.5fr_0.8fr] px-2.5 sm:px-3 py-1.5 sm:py-2 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider border-b" style={{ color: "var(--muted-foreground)", borderColor: "var(--border)", background: "var(--background)" }}>
            <div>Company</div>
            <div>Heat</div>
            <div>Trend</div>
            <div className="hidden sm:block">30D</div>
            <div className="hidden sm:block">Last signal</div>
          </div>
          <div className="flex flex-col">
            {ROWS.map((r, i) => {
              const clickable = r.isNew && r.body.length > 0;
              return (
                <div
                  key={r.company}
                  role={clickable ? "button" : undefined}
                  tabIndex={clickable ? 0 : undefined}
                  onClick={clickable ? () => setSelected(r.company) : undefined}
                  onKeyDown={
                    clickable
                      ? (e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSelected(r.company);
                          }
                        }
                      : undefined
                  }
                  className={`sh-row ${clickable ? "sh-rowbtn" : ""} grid items-center grid-cols-[1.5fr_1fr_0.8fr] sm:grid-cols-[1.5fr_1fr_0.8fr_0.5fr_0.8fr] px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] ${i < ROWS.length - 1 ? "border-b" : ""}`}
                  style={{
                    animationDelay: mounted && !reduced ? `${i * 0.08}s` : "0s",
                    borderColor: "var(--border)",
                  }}
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-1.5">
                      <p className="font-semibold truncate" style={{ color: "var(--heading)" }}>{r.company}</p>
                      {r.isNew && (
                        <span className="text-[7px] sm:text-[8px] font-bold uppercase tracking-wider px-1 py-0.5 rounded shrink-0" style={{ background: "rgba(13,148,136,0.14)", color: "var(--hooklyne-teal)" }}>
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-[9px] sm:text-[10px] truncate" style={{ color: "var(--muted-foreground)" }}>{r.contact}</p>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 pr-2">
                    <span className="font-bold tabular-nums w-7 sm:w-9" style={{ color: r.heat >= 20 ? "#dc2626" : r.heat >= 10 ? "#dc2626" : "var(--hooklyne-blue)" }}>
                      {r.heat.toFixed(1)}
                    </span>
                    <div className="flex-1 h-1 sm:h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                      <div
                        className="sh-bar h-full rounded-full"
                        style={{
                          width: `${Math.max(4, (r.heat / MAX_HEAT) * 100)}%`,
                          background: r.heat >= 10 ? "#dc2626" : "var(--hooklyne-blue)",
                          animationDelay: `${0.1 + i * 0.08}s`,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <span className="inline-block text-[9px] sm:text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ background: TREND[r.trend].bg, color: TREND[r.trend].fg }}>
                      {r.trend}
                    </span>
                  </div>
                  <div className="hidden sm:block" style={{ color: "var(--muted-foreground)" }}>-</div>
                  <div className="hidden sm:flex items-center justify-between gap-2">
                    <span style={{ color: "var(--muted-foreground)" }}>{r.date}</span>
                    <div className="relative inline-flex h-3.5 w-6 rounded-full shrink-0 sh-pulse" style={{ background: "var(--hooklyne-teal)" }}>
                      <div className="absolute top-0.5 size-2.5 rounded-full bg-white" style={{ left: "calc(100% - 12px)", boxShadow: "0 1px 2px rgba(0,0,0,0.15)" }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {selectedRow && (
            <div
              className="sh-panel absolute inset-0 flex flex-col"
              style={{
                background: "var(--card)",
                boxShadow: "0 -8px 24px -8px rgba(2,47,81,0.18)",
              }}
            >
              <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b" style={{ borderColor: "var(--border)" }}>
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded shrink-0" style={{ background: "rgba(13,148,136,0.14)", color: "var(--hooklyne-teal)" }}>
                    Draft ready
                  </span>
                  <p className="text-[11px] sm:text-[12px] font-semibold truncate" style={{ color: "var(--heading)" }}>
                    {selectedRow.company} &middot; {selectedRow.contact}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Close draft"
                  className="shrink-0 size-6 rounded flex items-center justify-center"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6l-12 12" /></svg>
                </button>
              </div>
              <div className="px-3 sm:px-4 py-2 border-b" style={{ borderColor: "var(--border)", background: "var(--background)" }}>
                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: "var(--hooklyne-orange)" }}>Signal</p>
                <p className="text-[10px] sm:text-[11px]" style={{ color: "var(--heading)" }}>{selectedRow.signal}</p>
              </div>
              <div className="flex-1 min-h-0 overflow-auto px-3 sm:px-4 py-2.5">
                <p className="text-[10px] sm:text-[11px] font-semibold mb-1.5" style={{ color: "var(--heading)" }}>
                  {selectedRow.subject}
                </p>
                <div className="space-y-1.5">
                  {selectedRow.body.map((line, idx) => (
                    <p key={idx} className="text-[10px] sm:text-[11px] leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 px-3 sm:px-4 py-2 border-t" style={{ borderColor: "var(--border)" }}>
                <span className="text-[9px] sm:text-[10px]" style={{ color: "var(--muted-foreground)" }}>
                  Matched to signal &middot; ready to send
                </span>
                <span
                  className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold px-2 py-1 rounded"
                  style={{ background: "var(--hooklyne-navy)", color: "white" }}
                >
                  Send
                  <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </GraphicShell>
  );
};
