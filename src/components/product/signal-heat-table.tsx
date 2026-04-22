import { useEffect, useState } from "react";
import { GraphicShell } from "./graphic-shell";

/**
 * Signal Heat Table - animated graphic for the Signals section.
 * Five company rows; heat bars fill L->R with stagger; one row flips
 * tracking on; last row marks a new signal.
 */

type Row = {
  company: string;
  industry: string;
  signal: string;
  heat: number;
  tone: "orange" | "teal" | "blue";
  tracking: boolean;
  newSignal?: boolean;
};

const ROWS: Row[] = [
  { company: "Axiom Logistics", industry: "Logistics · NL", signal: "Series B funding", heat: 94, tone: "orange", tracking: true },
  { company: "Brightpath SaaS", industry: "SaaS · UK", signal: "VP Sales hired", heat: 82, tone: "orange", tracking: false },
  { company: "Noordwind Energy", industry: "Energy · NL", signal: "Careers page +4", heat: 71, tone: "teal", tracking: true },
  { company: "Kruger & Vos", industry: "FinServ · BE", signal: "Product launch", heat: 63, tone: "teal", tracking: false },
  { company: "Helix Retail", industry: "Retail · NL", signal: "New role posted", heat: 48, tone: "blue", tracking: false, newSignal: true },
];

const TONE_BAR: Record<Row["tone"], string> = {
  orange: "var(--hooklyne-orange)",
  teal: "var(--hooklyne-teal)",
  blue: "var(--hooklyne-blue)",
};

export const SignalHeatTable = () => {
  const [tick, setTick] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 4200);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <GraphicShell crumb="Signals / Heat" status="Live" statusTone="teal" ratio="16/9">
      <style>{`
        @keyframes hl-bar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes hl-fade { 0%,12% { opacity: 0; transform: translateY(4px); } 25%,100% { opacity: 1; transform: translateY(0); } }
        @keyframes hl-toggle { 0%,60% { background: var(--border); } 70%,100% { background: var(--hooklyne-teal); } }
        @keyframes hl-knob { 0%,60% { transform: translateX(0); } 70%,100% { transform: translateX(12px); } }
        @keyframes hl-pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(255,140,66,0.45); } 50% { box-shadow: 0 0 0 6px rgba(255,140,66,0); } }
        .hl-row { animation: hl-fade 0.9s both; }
        .hl-bar-fill { transform-origin: left; animation: hl-bar 1.2s cubic-bezier(.2,.7,.2,1) both; }
        .hl-toggle-on { animation: hl-toggle 1.6s both; }
        .hl-knob-on { animation: hl-knob 1.6s both; }
        .hl-new { animation: hl-pulse 2s ease-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hl-row, .hl-bar-fill, .hl-toggle-on, .hl-knob-on, .hl-new { animation: none !important; }
          .hl-bar-fill { transform: scaleX(1); }
        }
      `}</style>

      <div key={tick} className="absolute inset-0 flex flex-col px-4 py-3 sm:px-6 sm:py-5" style={{ color: "var(--heading)" }}>
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--muted-foreground)" }}>Top 5 today</span>
            <span className="text-[10px] sm:text-[11px]" style={{ color: "var(--muted-foreground)", opacity: 0.6 }}>updated 2m ago</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            {["Funding", "Hires", "Launches"].map((t, i) => (
              <span key={t} className="text-[9px] font-semibold px-2 py-0.5 rounded-full" style={{
                background: i === 0 ? "rgba(255,140,66,0.12)" : i === 1 ? "rgba(52,76,163,0.08)" : "rgba(13,148,136,0.10)",
                color: i === 0 ? "var(--hooklyne-orange)" : i === 1 ? "var(--hooklyne-blue)" : "var(--hooklyne-teal)",
              }}>{t}</span>
            ))}
          </div>
        </div>

        <div className="flex items-center text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider pb-2 border-b" style={{ color: "var(--muted-foreground)", borderColor: "var(--border)" }}>
          <div className="flex-1">Company</div>
          <div className="hidden sm:block w-32">Signal</div>
          <div className="w-20 sm:w-28">Heat</div>
          <div className="w-14 sm:w-16 text-right">Track</div>
        </div>

        <div className="flex-1 flex flex-col justify-around py-1">
          {ROWS.map((r, i) => (
            <div
              key={r.company}
              className="hl-row flex items-center py-1 sm:py-1.5 rounded-lg px-1 sm:px-2 -mx-1 sm:-mx-2"
              style={{
                animationDelay: `${i * 0.12}s`,
                background: r.newSignal ? "rgba(255,140,66,0.05)" : "transparent",
              }}
            >
              <div className="flex-1 min-w-0 pr-2">
                <div className="flex items-center gap-1.5">
                  <div className="size-5 sm:size-6 rounded-md shrink-0 flex items-center justify-center text-[9px] sm:text-[10px] font-bold" style={{ background: "var(--card)", color: "var(--hooklyne-blue)", border: "1px solid var(--border)" }}>
                    {r.company.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] sm:text-xs font-semibold truncate" style={{ color: "var(--heading)" }}>{r.company}</p>
                    <p className="text-[9px] sm:text-[10px] truncate" style={{ color: "var(--muted-foreground)" }}>{r.industry}</p>
                  </div>
                </div>
              </div>
              <div className="hidden sm:block w-32 pr-3">
                <div className="flex items-center gap-1.5">
                  {r.newSignal && (
                    <span className="hl-new size-1.5 rounded-full shrink-0" style={{ background: "var(--hooklyne-orange)" }} />
                  )}
                  <span className="text-[10px] sm:text-[11px] truncate" style={{ color: "var(--foreground)" }}>{r.signal}</span>
                </div>
              </div>
              <div className="w-20 sm:w-28 pr-2 sm:pr-4">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                    <div
                      className="hl-bar-fill h-full rounded-full"
                      style={{
                        width: `${r.heat}%`,
                        background: TONE_BAR[r.tone],
                        animationDelay: `${0.25 + i * 0.12}s`,
                      }}
                    />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-semibold tabular-nums w-5 sm:w-6 text-right" style={{ color: "var(--heading)" }}>{r.heat}</span>
                </div>
              </div>
              <div className="w-14 sm:w-16 flex justify-end">
                {i === 1 ? (
                  <div className="relative inline-flex h-4 w-7 rounded-full hl-toggle-on" style={{ background: "var(--border)", animationDelay: `${0.6 + i * 0.12}s` }}>
                    <div className="hl-knob-on absolute top-0.5 left-0.5 size-3 rounded-full bg-white" style={{ animationDelay: `${0.6 + i * 0.12}s`, boxShadow: "0 1px 2px rgba(0,0,0,0.15)" }} />
                  </div>
                ) : (
                  <div className="relative inline-flex h-4 w-7 rounded-full" style={{ background: r.tracking ? "var(--hooklyne-teal)" : "var(--border)" }}>
                    <div className="absolute top-0.5 size-3 rounded-full bg-white" style={{ left: r.tracking ? "calc(100% - 14px)" : "2px", boxShadow: "0 1px 2px rgba(0,0,0,0.15)" }} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t text-[9px] sm:text-[10px]" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
          <span>Scored twice: matters to them · matters to you</span>
          <span className="tabular-nums">3 rising · 1 cooling</span>
        </div>
      </div>
    </GraphicShell>
  );
};
