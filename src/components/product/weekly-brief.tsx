import { useEffect, useRef, useState } from "react";
import { GraphicShell } from "./graphic-shell";
import { useLang, type Lang } from "@/lib/use-lang";

const MOVERS = [
  { name: "HelloFresh", signals: 44 },
  { name: "Brunel", signals: 7 },
  { name: "Mammoet", signals: 2 },
];

type Phase = "header" | "numbers" | "movers" | "alert";

type Ratio = "16/9" | "4/3" | "3/2" | "2/1" | "5/2" | "21/9" | "1/1" | "5/4" | "4/5" | "3/4";
type Props = { ratio?: Ratio; mobileRatio?: Ratio; xsMobileRatio?: Ratio; tabletRatio?: Ratio; lang?: Lang };

export const WeeklyBrief = ({ ratio = "3/2", mobileRatio, xsMobileRatio, tabletRatio, lang: langProp }: Props = {}) => {
  const lang = useLang(langProp);

  const t = lang === "nl" ? {
    crumb: "Inbox / Hooklyne Signals",
    status: "1 ongelezen",
    from: "Hooklyne Signals",
    time: "ma 14 apr · 08:04",
    subject: "Wekelijkse signaalbriefing · Week 17",
    numbersTitle: "Deze week in cijfers",
    stats: [
      { label: "Signalen verzameld", value: "79", hot: false },
      { label: "Relevant (score 5+)", value: "14", hot: false },
      { label: "Hot (score 8+)", value: "1", hot: true },
      { label: "Prospects gevolgd", value: "3", hot: false },
    ],
    moversTitle: "Meest actief",
    signalsIn30: "signalen · 30 d",
    missedTitle: "Gemiste kansen",
    missed: "8 gekwalificeerde kansen staan onaangeroerd. Elke dag zonder actie riskeer je dat een concurrent die plek inneemt.",
  } : {
    crumb: "Inbox / Hooklyne Signals",
    status: "1 unread",
    from: "Hooklyne Signals",
    time: "Mon Apr 14 · 08:04",
    subject: "Weekly Intelligence Brief · Week 17",
    numbersTitle: "This week in numbers",
    stats: [
      { label: "Signals collected", value: "79", hot: false },
      { label: "Relevant (score 5+)", value: "14", hot: false },
      { label: "Hot (score 8+)", value: "1", hot: true },
      { label: "Prospects tracked", value: "3", hot: false },
    ],
    moversTitle: "Heat movers",
    signalsIn30: "signals · 30 d",
    missedTitle: "Missed opportunities",
    missed: "8 qualified openings are sitting untouched. Every day without outreach risks a competitor getting there first.",
  };

  const [phase, setPhase] = useState<Phase>("alert");
  const [moversVisible, setMoversVisible] = useState(MOVERS.length);
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
      (entries) => { for (const e of entries) setInView(e.isIntersecting); },
      { rootMargin: "200px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) {
      setPhase("alert");
      setMoversVisible(MOVERS.length);
      return;
    }
    if (!inView) return;
    let cancelled = false;
    const run = async () => {
      while (!cancelled) {
        setMoversVisible(0);
        setPhase("numbers");
        await new Promise((r) => setTimeout(r, 800));
        if (cancelled) return;

        setPhase("movers");
        for (let i = 1; i <= MOVERS.length && !cancelled; i++) {
          setMoversVisible(i);
          await new Promise((r) => setTimeout(r, 260));
        }

        await new Promise((r) => setTimeout(r, 500));
        if (cancelled) return;
        setPhase("alert");
        await new Promise((r) => setTimeout(r, 3500));
      }
    };
    run();
    return () => { cancelled = true; };
  }, [reduced, inView]);

  return (
    <div ref={rootRef}>
      <GraphicShell
        crumb={t.crumb}
        status={t.status}
        statusTone="orange"
        ratio={ratio}
        mobileRatio={mobileRatio}
        xsMobileRatio={xsMobileRatio}
        tabletRatio={tabletRatio}
      >
        <style>{`
          @keyframes wb-fade { from { opacity: 0; } to { opacity: 1; } }
          @keyframes wb-row { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes wb-slide { from { opacity: 0; transform: translateX(-6px); } to { opacity: 1; transform: translateX(0); } }
          @keyframes wb-blink { 0%,100%{opacity:1} 50%{opacity:0.4} }
          .wb-fade { animation: wb-fade 0.35s ease both; }
          .wb-row { animation: wb-row 0.3s ease both; }
          .wb-slide { animation: wb-slide 0.25s ease both; }
          .wb-blink { animation: wb-blink 1.8s ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce) {
            .wb-fade,.wb-row,.wb-slide,.wb-blink { animation: none !important; }
          }
        `}</style>

        <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: "var(--card)" }}>

          {/* Email sender row */}
          <div
            className="flex items-center gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 shrink-0"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <div
              className="shrink-0 size-6 sm:size-7 rounded-md flex items-center justify-center p-1"
              style={{ background: "var(--hooklyne-navy)" }}
            >
              <img src="/logo-mark.svg" alt="Hooklyne" className="w-full h-full object-contain" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] sm:text-[12px] font-semibold truncate" style={{ color: "var(--heading)" }}>
                {t.from}
              </p>
            </div>
            <p className="text-[9px] sm:text-[10px] shrink-0 tabular-nums" style={{ color: "var(--muted-foreground)" }}>
              {t.time}
            </p>
          </div>

          {/* Subject */}
          <div className="px-3 sm:px-4 pt-2 pb-1.5 sm:pt-2.5 sm:pb-2 shrink-0" style={{ borderBottom: "1px solid var(--border)" }}>
            <p className="text-[11px] sm:text-[13px] font-semibold" style={{ color: "var(--heading)" }}>
              {t.subject}
            </p>
          </div>

          {/* Email body */}
          <div className="flex-1 overflow-hidden px-3 sm:px-4 py-3 sm:py-4 flex flex-col gap-3 sm:gap-4">

            {/* Numbers: 2×2 grid with large figures */}
            {(phase === "numbers" || phase === "movers" || phase === "alert") && (
              <div className="wb-fade">
                <p className="text-[9px] sm:text-[10px] font-medium mb-2 sm:mb-2.5" style={{ color: "var(--muted-foreground)" }}>
                  {t.numbersTitle}
                </p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                  {t.stats.map((s) => (
                    <div key={s.label}>
                      <div
                        className={`text-[22px] sm:text-[26px] font-bold tabular-nums leading-none ${s.hot && phase === "alert" ? "wb-blink" : ""}`}
                        style={{ color: s.hot ? "var(--hooklyne-orange)" : "var(--heading)" }}
                      >
                        {s.value}
                      </div>
                      <div className="text-[9px] sm:text-[10px] mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Heat movers */}
            {(phase === "movers" || phase === "alert") && (
              <div className="wb-fade" style={{ borderTop: "1px solid var(--border)", paddingTop: "10px" }}>
                <p className="text-[9px] sm:text-[10px] font-medium mb-1.5" style={{ color: "var(--muted-foreground)" }}>
                  {t.moversTitle}
                </p>
                <div className="flex flex-col" style={{ gap: "4px" }}>
                  {MOVERS.map((m, i) =>
                    i < moversVisible ? (
                      <div
                        key={m.name}
                        className="wb-slide flex items-baseline justify-between"
                        style={{ animationDelay: `${i * 0.04}s` }}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px]" style={{ color: "var(--hooklyne-orange)" }}>→</span>
                          <span className="text-[10px] sm:text-[11px] font-semibold" style={{ color: "var(--heading)" }}>
                            {m.name}
                          </span>
                        </div>
                        <span className="text-[9px] sm:text-[10px] tabular-nums" style={{ color: "var(--muted-foreground)" }}>
                          {m.signals} {t.signalsIn30}
                        </span>
                      </div>
                    ) : (
                      <div key={m.name} className="flex items-center justify-between" style={{ opacity: 0.15 }}>
                        <div className="h-1.5 rounded" style={{ width: "42%", background: "var(--border)" }} />
                        <div className="h-1.5 rounded" style={{ width: "20%", background: "var(--border)" }} />
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Missed opportunities */}
            {phase === "alert" && (
              <div
                className="wb-row pl-2.5 py-2 mb-2"
                style={{ borderLeft: "2px solid var(--hooklyne-orange)" }}
              >
                <p className="text-[9px] sm:text-[10px] font-semibold mb-0.5" style={{ color: "var(--hooklyne-orange)" }}>
                  {t.missedTitle}
                </p>
                <p className="text-[9px] sm:text-[10px] leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                  {t.missed}
                </p>
              </div>
            )}
          </div>
        </div>
      </GraphicShell>
    </div>
  );
};
