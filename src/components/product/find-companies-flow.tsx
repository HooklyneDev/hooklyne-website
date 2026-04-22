import { useEffect, useState } from "react";
import { GraphicShell } from "./graphic-shell";

/**
 * Find-me-companies 3-step flow. Loops: prompt typing -> ranked
 * company cards slide in -> contact confidence cards flip in.
 */

const PROMPT = "Dutch logistics, 20-80 FTE, SaaS adoption, hiring sales.";

const COMPANIES = [
  { name: "Axiom Logistics", size: "62 FTE", match: 94, city: "Rotterdam" },
  { name: "Noordwind Freight", size: "38 FTE", match: 88, city: "Utrecht" },
  { name: "Kruger Transport", size: "71 FTE", match: 81, city: "Eindhoven" },
];

const CONTACTS = [
  { name: "Marieke de Vries", role: "VP Sales", conf: "Verified", tone: "teal" as const },
  { name: "Joost van Dam", role: "Head of RevOps", conf: "Verified", tone: "teal" as const },
  { name: "Sanne Bakker", role: "Commercial Dir.", conf: "Likely", tone: "blue" as const },
];

const TONE: Record<"teal" | "blue", string> = {
  teal: "var(--hooklyne-teal)",
  blue: "var(--hooklyne-blue)",
};

export const FindCompaniesFlow = () => {
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState("");
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reduced) {
      setStep(2);
      setTyped(PROMPT);
      return;
    }
    let cancelled = false;
    const run = async () => {
      while (!cancelled) {
        setStep(0);
        setTyped("");
        for (let i = 1; i <= PROMPT.length && !cancelled; i++) {
          setTyped(PROMPT.slice(0, i));
          await new Promise((r) => setTimeout(r, 38));
        }
        if (cancelled) return;
        await new Promise((r) => setTimeout(r, 500));
        setStep(1);
        await new Promise((r) => setTimeout(r, 2600));
        if (cancelled) return;
        setStep(2);
        await new Promise((r) => setTimeout(r, 3400));
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [reduced]);

  return (
    <GraphicShell crumb="Prospecting / Find me companies" status="Searching" statusTone="blue" ratio="16/9">
      <style>{`
        @keyframes fc-slide { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fc-flip { from { opacity: 0; transform: rotateY(-16deg) translateY(6px); } to { opacity: 1; transform: rotateY(0) translateY(0); } }
        @keyframes fc-caret { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
        .fc-slide { animation: fc-slide 0.5s both; }
        .fc-flip { animation: fc-flip 0.55s cubic-bezier(.2,.7,.2,1) both; }
        .fc-caret { animation: fc-caret 0.9s steps(1, end) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .fc-slide, .fc-flip { animation: none !important; opacity: 1 !important; transform: none !important; }
          .fc-caret { animation: none !important; opacity: 0; }
        }
      `}</style>

      <div className="absolute inset-0 flex flex-col px-4 py-3 sm:px-6 sm:py-5">
        <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          {[
            { n: "1", label: "Describe" },
            { n: "2", label: "Companies" },
            { n: "3", label: "Contacts" },
          ].map((s, i) => (
            <div key={s.n} className="flex items-center gap-1.5 sm:gap-2">
              <div
                className="size-5 sm:size-6 rounded-full flex items-center justify-center text-[10px] sm:text-[11px] font-bold transition-colors duration-500"
                style={{
                  background: step >= i ? "var(--hooklyne-blue)" : "var(--card)",
                  color: step >= i ? "white" : "var(--muted-foreground)",
                  border: step >= i ? "none" : "1px solid var(--border)",
                }}
              >
                {s.n}
              </div>
              <span
                className="text-[10px] sm:text-[11px] font-semibold transition-colors duration-500"
                style={{ color: step >= i ? "var(--heading)" : "var(--muted-foreground)" }}
              >
                {s.label}
              </span>
              {i < 2 && <div className="w-4 sm:w-8 h-px" style={{ background: step > i ? "var(--hooklyne-blue)" : "var(--border)" }} />}
            </div>
          ))}
        </div>

        <div className="flex-1 min-h-0">
          {step === 0 && (
            <div className="h-full flex flex-col">
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--muted-foreground)" }}>Tell us who</p>
              <div
                className="flex-1 rounded-xl p-3 sm:p-4 text-xs sm:text-sm leading-relaxed"
                style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--heading)" }}
              >
                {typed}
                <span className="fc-caret inline-block w-[2px] h-[14px] align-middle ml-0.5" style={{ background: "var(--hooklyne-blue)" }} />
              </div>
              <div className="flex items-center justify-end mt-2">
                <span className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>
                  {typed.length}/280
                </span>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="h-full flex flex-col">
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--muted-foreground)" }}>Ranked by fit</p>
              <div className="flex-1 flex flex-col gap-1.5 sm:gap-2">
                {COMPANIES.map((c, i) => (
                  <div
                    key={c.name}
                    className="fc-slide flex items-center gap-2 sm:gap-3 rounded-xl px-2.5 sm:px-3 py-2 sm:py-2.5"
                    style={{ background: "var(--card)", border: "1px solid var(--border)", animationDelay: `${i * 0.14}s` }}
                  >
                    <div className="size-7 sm:size-8 rounded-lg shrink-0 flex items-center justify-center text-[10px] sm:text-xs font-bold" style={{ background: "rgba(52,76,163,0.08)", color: "var(--hooklyne-blue)" }}>
                      {c.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-semibold truncate" style={{ color: "var(--heading)" }}>{c.name}</p>
                      <p className="text-[10px] sm:text-[11px]" style={{ color: "var(--muted-foreground)" }}>{c.size} · {c.city}</p>
                    </div>
                    <div className="flex flex-col items-end gap-0.5 sm:gap-1">
                      <span className="text-[10px] sm:text-[11px] font-bold tabular-nums" style={{ color: "var(--hooklyne-blue)" }}>{c.match}</span>
                      <div className="w-10 sm:w-14 h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                        <div className="h-full rounded-full" style={{ width: `${c.match}%`, background: "var(--hooklyne-blue)" }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="h-full flex flex-col">
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--muted-foreground)" }}>Contacts, verified</p>
              <div className="flex-1 grid grid-cols-3 gap-1.5 sm:gap-2" style={{ perspective: "600px" }}>
                {CONTACTS.map((c, i) => (
                  <div
                    key={c.name}
                    className="fc-flip rounded-xl p-2 sm:p-3 flex flex-col"
                    style={{ background: "var(--card)", border: "1px solid var(--border)", animationDelay: `${i * 0.18}s` }}
                  >
                    <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
                      <div className="size-5 sm:size-6 rounded-full" style={{ background: "rgba(52,76,163,0.10)" }} />
                      <span className="relative flex size-1.5 shrink-0">
                        <span className="absolute inline-flex h-full w-full rounded-full opacity-70 animate-ping" style={{ background: TONE[c.tone] }} />
                        <span className="relative inline-flex rounded-full size-1.5" style={{ background: TONE[c.tone] }} />
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs font-semibold truncate" style={{ color: "var(--heading)" }}>{c.name}</p>
                    <p className="text-[9px] sm:text-[10px] truncate mb-1 sm:mb-2" style={{ color: "var(--muted-foreground)" }}>{c.role}</p>
                    <span
                      className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded self-start"
                      style={{
                        background: c.tone === "teal" ? "rgba(13,148,136,0.12)" : "rgba(52,76,163,0.10)",
                        color: TONE[c.tone],
                      }}
                    >
                      {c.conf}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 sm:pt-3 text-[9px] sm:text-[10px]" style={{ color: "var(--muted-foreground)" }}>
          <span>ICP · Domain · Name · Lookalike</span>
          <span>
            {step === 0 && "Describe your ICP"}
            {step === 1 && "3 of 24 matches"}
            {step === 2 && "9 contacts verified"}
          </span>
        </div>
      </div>
    </GraphicShell>
  );
};
