import { useEffect, useState } from "react";
import { GraphicShell } from "./graphic-shell";

/**
 * Email draft compose - split view. Left: verified contact card with
 * pulsing dot. Right: subject + body typing, then "Mark as actioned".
 */

const SUBJECT = "Dutch hiring push - one thing from our Rotterdam build";
const BODY = [
  "Hi Marieke,",
  "",
  "Saw Axiom added four sales roles in Rotterdam this month - congrats on the Series B.",
  "",
  "We run a similar regional push for a Dutch logistics SaaS last year. One angle that landed was...",
];

export const EmailCompose = () => {
  const [phase, setPhase] = useState<"typing-subject" | "typing-body" | "review" | "actioned">("typing-subject");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState<string[]>([""]);
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
      setSubject(SUBJECT);
      setBody(BODY);
      setPhase("review");
      return;
    }
    let cancelled = false;
    const run = async () => {
      while (!cancelled) {
        setPhase("typing-subject");
        setSubject("");
        setBody([""]);
        for (let i = 1; i <= SUBJECT.length && !cancelled; i++) {
          setSubject(SUBJECT.slice(0, i));
          await new Promise((r) => setTimeout(r, 32));
        }
        if (cancelled) return;
        await new Promise((r) => setTimeout(r, 350));
        setPhase("typing-body");
        const acc: string[] = [""];
        for (let line = 0; line < BODY.length && !cancelled; line++) {
          const text = BODY[line];
          for (let i = 1; i <= text.length && !cancelled; i++) {
            acc[line] = text.slice(0, i);
            setBody([...acc]);
            await new Promise((r) => setTimeout(r, 14));
          }
          if (line < BODY.length - 1) {
            acc.push("");
            setBody([...acc]);
            await new Promise((r) => setTimeout(r, 90));
          }
        }
        if (cancelled) return;
        await new Promise((r) => setTimeout(r, 900));
        setPhase("review");
        await new Promise((r) => setTimeout(r, 1800));
        if (cancelled) return;
        setPhase("actioned");
        await new Promise((r) => setTimeout(r, 1800));
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [reduced]);

  const typingSubject = phase === "typing-subject";
  const typingBody = phase === "typing-body";

  return (
    <GraphicShell crumb="Portal / Draft" status={phase === "actioned" ? "Actioned" : "Drafting"} statusTone={phase === "actioned" ? "teal" : "orange"} ratio="16/9">
      <style>{`
        @keyframes ec-caret { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
        @keyframes ec-btn-press { 0%, 60% { transform: scale(1); } 70% { transform: scale(0.96); } 100% { transform: scale(1); } }
        @keyframes ec-actioned { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        .ec-caret { animation: ec-caret 0.9s steps(1, end) infinite; }
        .ec-press { animation: ec-btn-press 1.2s both; }
        .ec-actioned { animation: ec-actioned 0.4s both; }
        @media (prefers-reduced-motion: reduce) {
          .ec-caret, .ec-press, .ec-actioned { animation: none !important; }
          .ec-caret { opacity: 0; }
        }
      `}</style>

      <div className="absolute inset-0 flex px-3 py-3 sm:px-5 sm:py-4 gap-3 sm:gap-4">
        <div className="hidden sm:flex w-[34%] flex-col shrink-0">
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--muted-foreground)" }}>Contact</p>
          <div className="rounded-xl p-3 flex-1 flex flex-col" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="size-9 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "rgba(52,76,163,0.10)", color: "var(--hooklyne-blue)" }}>MV</div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold truncate" style={{ color: "var(--heading)" }}>Marieke de Vries</p>
                <p className="text-[10px] truncate" style={{ color: "var(--muted-foreground)" }}>VP Sales · Axiom</p>
              </div>
              <span className="relative flex size-2 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full opacity-70 animate-ping" style={{ background: "var(--hooklyne-teal)" }} />
                <span className="relative inline-flex rounded-full size-2" style={{ background: "var(--hooklyne-teal)" }} />
              </span>
            </div>

            <div className="space-y-1.5 mb-2">
              <div className="flex items-center gap-1.5 text-[10px]" style={{ color: "var(--foreground)" }}>
                <svg className="size-3 shrink-0" style={{ color: "var(--hooklyne-teal)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                <span className="truncate">m.devries@axiom.nl</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px]" style={{ color: "var(--foreground)" }}>
                <svg className="size-3 shrink-0" style={{ color: "var(--hooklyne-teal)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                <span>+31 6 24 •• •• 18</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px]" style={{ color: "var(--foreground)" }}>
                <svg className="size-3 shrink-0" style={{ color: "var(--hooklyne-teal)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                <span>LinkedIn verified</span>
              </div>
            </div>

            <div className="mt-auto pt-2 border-t" style={{ borderColor: "var(--border)" }}>
              <p className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: "var(--hooklyne-orange)" }}>Hook</p>
              <p className="text-[10px] leading-snug" style={{ color: "var(--foreground)" }}>Series B, 4 new sales roles posted this month, Rotterdam HQ.</p>
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0 flex flex-col">
          <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider mb-1.5 sm:mb-2" style={{ color: "var(--muted-foreground)" }}>Draft</p>
          <div className="rounded-xl flex-1 flex flex-col" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="px-3 py-2 border-b flex items-center gap-2" style={{ borderColor: "var(--border)" }}>
              <span className="text-[10px] font-semibold w-10 shrink-0" style={{ color: "var(--muted-foreground)" }}>To</span>
              <span className="text-[11px] truncate" style={{ color: "var(--heading)" }}>Marieke de Vries &lt;m.devries@axiom.nl&gt;</span>
            </div>
            <div className="px-3 py-2 border-b flex items-center gap-2" style={{ borderColor: "var(--border)" }}>
              <span className="text-[10px] font-semibold w-10 shrink-0" style={{ color: "var(--muted-foreground)" }}>Subject</span>
              <span className="text-[11px] font-semibold truncate" style={{ color: "var(--heading)" }}>
                {subject}
                {typingSubject && <span className="ec-caret inline-block w-[2px] h-[11px] align-middle ml-0.5" style={{ background: "var(--hooklyne-orange)" }} />}
              </span>
            </div>
            <div className="px-3 py-2 sm:py-3 flex-1 text-[11px] sm:text-xs leading-relaxed overflow-hidden" style={{ color: "var(--foreground)" }}>
              {body.map((line, i) => (
                <p key={i} className="min-h-[1em]">
                  {line}
                  {typingBody && i === body.length - 1 && (
                    <span className="ec-caret inline-block w-[2px] h-[12px] align-middle ml-0.5" style={{ background: "var(--hooklyne-orange)" }} />
                  )}
                </p>
              ))}
            </div>
            <div className="px-3 py-2 border-t flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
              <span className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>NL · EN · auto-picked</span>
              {phase === "actioned" ? (
                <span
                  className="ec-actioned inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(13,148,136,0.12)", color: "var(--hooklyne-teal)" }}
                >
                  <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  Actioned
                </span>
              ) : (
                <span
                  className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full ${phase === "review" ? "ec-press" : ""}`}
                  style={{
                    background: phase === "review" ? "var(--hooklyne-orange)" : "rgba(255,140,66,0.12)",
                    color: phase === "review" ? "white" : "var(--hooklyne-orange)",
                  }}
                >
                  Mark as actioned
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </GraphicShell>
  );
};
