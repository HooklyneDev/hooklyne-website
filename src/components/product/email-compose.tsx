import { useEffect, useRef, useState } from "react";
import { GraphicShell } from "./graphic-shell";
import { useLang, type Lang } from "@/lib/use-lang";

/**
 * Portal hero - full-width email draft that types itself out and then
 * gets actioned. No split view, no empty sidebar. Matches the single
 * focused moment of "open it, send it, close it".
 */

const SUBJECT_EN = "The 3.2 MW rooftop at Venlo - how you're planning to use it";
const BODY_EN: string[] = [
  "Hi Lars,",
  "",
  "Saw the 3.2 MW rooftop going live at Venlo next month. Congrats.",
  "",
  "One question at this scale: how much of that output offsets your real-time load versus going back at wholesale? Most Dutch operators leave 18-30% on the table in year one because the charging windows don't match the shift pattern.",
  "",
  "Worth a 20-minute call before it goes live?",
  "",
  "Best,",
  "Tim",
];

const SUBJECT_NL = "Het 3,2 MW zonnedak in Venlo - hoe jullie het willen inzetten";
const BODY_NL: string[] = [
  "Hoi Femke,",
  "",
  "Zag de aankondiging van het 3,2 MW zonnedak op DC Venlo volgende maand. Gefeliciteerd.",
  "",
  "Eén vraag op deze schaal: hoeveel van die productie compenseert echt jullie verbruik in real time, en hoeveel wordt teruggeleverd tegen groothandelsprijzen? De meeste operators laten 18-30% liggen in het eerste jaar omdat laadvensters niet aansluiten op het ploegenpatroon.",
  "",
  "20 minuten ervoor uittrekken voordat het dak live gaat?",
  "",
  "Groet,",
  "Tim",
];

type Phase = "typing-subject" | "typing-body" | "review" | "actioned";

type Ratio = "16/9" | "4/3" | "3/2" | "2/1" | "5/2" | "21/9" | "1/1" | "5/4" | "4/5" | "3/4";
type EmailComposeProps = { ratio?: Ratio; mobileRatio?: Ratio; tabletRatio?: Ratio; xsMobileRatio?: Ratio; lang?: Lang };
export const EmailCompose = ({ ratio = "2/1", mobileRatio, tabletRatio, xsMobileRatio, lang: langProp }: EmailComposeProps = {}) => {
  const lang = useLang(langProp);
  const SUBJECT = lang === "nl" ? SUBJECT_NL : SUBJECT_EN;
  const BODY = lang === "nl" ? BODY_NL : BODY_EN;
  const t = lang === "nl" ? {
    crumb: "Portaal / Concept",
    actioned: "Verzonden",
    drafting: "Opstellen",
    verified: "Geverifieerd",
    role: "Inkoopmanager, Celsus Energy BV · f.deboer@celsus.nl",
    hookTag: "Hook: 3,2 MW zonnedak",
    venloTag: "Venlo DC",
    subjectLabel: "Onderwerp",
    senderProfile: "Sender profile: Hooklyne Voorbeeld",
    under60: "Binnen 60s",
    markActioned: "Markeer als verzonden",
  } : {
    crumb: "Portal / Draft",
    actioned: "Actioned",
    drafting: "Drafting",
    verified: "Verified",
    role: "Procurement Director, Celsus Energy · l.hendriks@celsus.nl",
    hookTag: "Hook: 3.2 MW solar",
    venloTag: "Venlo DC",
    subjectLabel: "Subject",
    senderProfile: "Sender profile: Hooklyne Example",
    under60: "Under 60s",
    markActioned: "Mark as actioned",
  };
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
      crumb={t.crumb}
      status={phase === "actioned" ? t.actioned : t.drafting}
      statusTone={phase === "actioned" ? "teal" : "orange"}
      ratio={ratio}
      mobileRatio={mobileRatio}
      tabletRatio={tabletRatio}
      xsMobileRatio={xsMobileRatio}
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
            <img src="/personas/mark-janssen.jpg" alt="" className="size-7 sm:size-8 rounded-full shrink-0 object-cover" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] sm:text-[13px] font-semibold truncate" style={{ color: "var(--heading)" }}>{lang === "nl" ? "Femke de Boer" : "Lars Hendriks"}</span>
                <span className="relative flex size-1.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full rounded-full opacity-70 animate-ping" style={{ background: "var(--hooklyne-teal)" }} />
                  <span className="relative inline-flex rounded-full size-1.5" style={{ background: "var(--hooklyne-teal)" }} />
                </span>
                <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--hooklyne-teal)" }}>{t.verified}</span>
              </div>
              <p className="text-[10px] sm:text-[11px] truncate" style={{ color: "var(--muted-foreground)" }}>
                {t.role}
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 shrink-0">
              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded" style={{ background: "rgba(255,140,66,0.10)", color: "var(--hooklyne-orange)" }}>{t.hookTag}</span>
              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded" style={{ background: "rgba(52,76,163,0.08)", color: "var(--hooklyne-blue)" }}>{t.venloTag}</span>
            </div>
          </div>

          <div className="px-3 sm:px-4 py-1.5 sm:py-2 border-b flex items-baseline gap-2 sm:gap-3" style={{ borderColor: "var(--border)" }}>
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest w-12 shrink-0" style={{ color: "var(--muted-foreground)" }}>{t.subjectLabel}</span>
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
              <span>{t.senderProfile}</span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">{t.under60}</span>
            </div>
            {phase === "actioned" ? (
              <span
                className="ec-actioned inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md"
                style={{ background: "rgba(13,148,136,0.14)", color: "var(--hooklyne-teal)" }}
              >
                <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                {t.actioned}
              </span>
            ) : (
              <span
                className={`inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md ${phase === "review" ? "ec-press" : ""}`}
                style={{
                  background: phase === "review" ? "var(--hooklyne-orange)" : "rgba(255,140,66,0.12)",
                  color: phase === "review" ? "white" : "var(--hooklyne-orange)",
                }}
              >
                {t.markActioned}
              </span>
            )}
          </div>
        </div>
      </div>
    </GraphicShell>
    </div>
  );
};
