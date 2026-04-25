import { useEffect, useRef, useState } from "react";
import { GraphicShell } from "./graphic-shell";

/**
 * Portal hero - full-width email draft that types itself out and then
 * gets actioned. No split view, no empty sidebar. Matches the single
 * focused moment of "open it, send it, close it".
 */

const SUBJECT = "The 3.2 MW rooftop at Venlo - how you're planning to use it";
const BODY: string[] = [
  "Hi Marieke,",
  "",
  "Saw the announcement on the 3.2 MW rooftop array going live at the Venlo DC next month. Congrats, that's a serious step.",
  "",
  "The question we keep seeing at this scale: how much of that production actually offsets your load in real time versus getting sold back at wholesale. Most Dutch operators we talk to are leaving 18-30% on the table in the first year because the forecasting and charging windows aren't tied to the DC's shift pattern.",
  "",
  "We help teams close that gap with an energy management layer that sits between your PV inverters, the grid contract, and the forklift and cold-storage load. Two operators in your range cut net energy spend by ~22% inside six months.",
  "",
  "Worth a 20-minute look before the array goes live? Happy to send a one-pager first.",
  "",
  "Best,",
  "Tim",
  "Hooklyne",
];

type Phase = "typing-subject" | "typing-body" | "review" | "actioned";

type Ratio = "16/9" | "4/3" | "3/2" | "2/1" | "5/2" | "21/9" | "1/1" | "5/4";
type EmailComposeProps = { ratio?: Ratio; mobileRatio?: Ratio; tabletRatio?: Ratio };
export const EmailCompose = ({ ratio = "2/1", mobileRatio, tabletRatio }: EmailComposeProps = {}) => {
  const [phase, setPhase] = useState<Phase>("typing-subject");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState<string[]>([""]);
  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const h = () => setReduced(mq.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setInView(e.isIntersecting);
      },
      { rootMargin: "200px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) {
      setSubject(SUBJECT);
      setBody(BODY);
      setPhase("review");
      return;
    }
    if (!inView) return;
    let cancelled = false;
    const run = async () => {
      while (!cancelled) {
        setPhase("typing-subject");
        setSubject("");
        setBody([""]);
        for (let i = 1; i <= SUBJECT.length && !cancelled; i++) {
          setSubject(SUBJECT.slice(0, i));
          await new Promise((r) => setTimeout(r, 28));
        }
        if (cancelled) return;
        await new Promise((r) => setTimeout(r, 320));
        setPhase("typing-body");
        const acc: string[] = [""];
        for (let line = 0; line < BODY.length && !cancelled; line++) {
          const text = BODY[line];
          for (let i = 1; i <= text.length && !cancelled; i++) {
            acc[line] = text.slice(0, i);
            setBody([...acc]);
            await new Promise((r) => setTimeout(r, 10));
          }
          if (line < BODY.length - 1) {
            acc.push("");
            setBody([...acc]);
            await new Promise((r) => setTimeout(r, 70));
          }
        }
        if (cancelled) return;
        await new Promise((r) => setTimeout(r, 1200));
        setPhase("review");
        await new Promise((r) => setTimeout(r, 1600));
        if (cancelled) return;
        setPhase("actioned");
        await new Promise((r) => setTimeout(r, 1800));
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [reduced, inView]);

  const typingSubject = phase === "typing-subject";
  const typingBody = phase === "typing-body";

  return (
    <div ref={rootRef}>
    <GraphicShell
      crumb="Portal / Draft"
      status={phase === "actioned" ? "Actioned" : "Drafting"}
      statusTone={phase === "actioned" ? "teal" : "orange"}
      ratio={ratio}
      mobileRatio={mobileRatio}
      tabletRatio={tabletRatio}
    >
      <style>{`
        @keyframes ec-caret { 0%,49% { opacity: 1; } 50%,100% { opacity: 0; } }
        @keyframes ec-press { 0%,60% { transform: scale(1); } 70% { transform: scale(0.96); } 100% { transform: scale(1); } }
        @keyframes ec-actioned { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        .ec-caret { animation: ec-caret 0.9s steps(1,end) infinite; }
        .ec-press { animation: ec-press 1.2s both; }
        .ec-actioned { animation: ec-actioned 0.4s both; }
        @media (prefers-reduced-motion: reduce) {
          .ec-caret, .ec-press, .ec-actioned { animation: none !important; }
          .ec-caret { opacity: 0; }
        }
      `}</style>

      <div className="absolute inset-0 flex flex-col px-4 py-3 sm:px-6 sm:py-5">
        <div className="rounded-xl flex-1 flex flex-col min-h-0" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="px-3 sm:px-4 py-2 sm:py-2.5 border-b flex items-center gap-2 sm:gap-3" style={{ borderColor: "var(--border)" }}>
            <div className="size-7 sm:size-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold shrink-0" style={{ background: "rgba(52,76,163,0.10)", color: "var(--hooklyne-blue)" }}>MV</div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] sm:text-[13px] font-semibold truncate" style={{ color: "var(--heading)" }}>Marieke de Vries</span>
                <span className="relative flex size-1.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full rounded-full opacity-70 animate-ping" style={{ background: "var(--hooklyne-teal)" }} />
                  <span className="relative inline-flex rounded-full size-1.5" style={{ background: "var(--hooklyne-teal)" }} />
                </span>
                <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--hooklyne-teal)" }}>Verified</span>
              </div>
              <p className="text-[10px] sm:text-[11px] truncate" style={{ color: "var(--muted-foreground)" }}>
                Head of Operations, Axiom Logistics · m.devries@axiom.nl
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 shrink-0">
              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded" style={{ background: "rgba(255,140,66,0.10)", color: "var(--hooklyne-orange)" }}>Hook: 3.2 MW solar</span>
              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded" style={{ background: "rgba(52,76,163,0.08)", color: "var(--hooklyne-blue)" }}>Venlo DC</span>
            </div>
          </div>

          <div className="px-3 sm:px-4 py-1.5 sm:py-2 border-b flex items-baseline gap-2 sm:gap-3" style={{ borderColor: "var(--border)" }}>
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest w-12 shrink-0" style={{ color: "var(--muted-foreground)" }}>Subject</span>
            <span className="text-[11px] sm:text-[13px] font-semibold truncate" style={{ color: "var(--heading)" }}>
              {subject}
              {typingSubject && <span className="ec-caret inline-block w-[2px] h-[11px] sm:h-[13px] align-middle ml-0.5" style={{ background: "var(--hooklyne-orange)" }} />}
            </span>
          </div>

          <div className="px-3 sm:px-4 py-2 sm:py-3 flex-1 text-[12px] sm:text-[13px] leading-relaxed overflow-hidden min-h-0" style={{ color: "var(--foreground)" }}>
            {body.map((line, i) => (
              <p key={i} className="min-h-[1em]">
                {line}
                {typingBody && i === body.length - 1 && (
                  <span className="ec-caret inline-block w-[2px] h-[12px] sm:h-[14px] align-middle ml-0.5" style={{ background: "var(--hooklyne-orange)" }} />
                )}
              </p>
            ))}
          </div>

          <div className="px-3 sm:px-4 py-2 sm:py-2.5 border-t flex items-center justify-between gap-2" style={{ borderColor: "var(--border)" }}>
            <div className="flex items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px]" style={{ color: "var(--muted-foreground)" }}>
              <span className="inline-flex items-center gap-1">
                <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                NL · EN auto
              </span>
              <span>·</span>
              <span>Sender profile: Hooklyne Example</span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">Under 60s</span>
            </div>
            {phase === "actioned" ? (
              <span
                className="ec-actioned inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md"
                style={{ background: "rgba(13,148,136,0.14)", color: "var(--hooklyne-teal)" }}
              >
                <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                Actioned
              </span>
            ) : (
              <span
                className={`inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md ${phase === "review" ? "ec-press" : ""}`}
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
    </GraphicShell>
    </div>
  );
};
