import { useEffect, useRef, useState } from "react";
import { GraphicShell } from "./graphic-shell";
import { useLang, type Lang } from "@/lib/use-lang";

const MOVERS = [
  { name: "HelloFresh", signals: 44 },
  { name: "Foodbag", signals: 4 },
  { name: "Mindful Chef", signals: 1 },
];

type Phase = "numbers" | "movers" | "alert";

type Ratio = "16/9" | "4/3" | "3/2" | "2/1" | "5/2" | "21/9" | "1/1" | "5/4" | "4/5" | "3/4";
type Props = { ratio?: Ratio; mobileRatio?: Ratio; tabletRatio?: Ratio; lang?: Lang };

export const WeeklyBrief = ({ ratio = "3/2", mobileRatio, tabletRatio, lang: langProp }: Props = {}) => {
  const lang = useLang(langProp);

  const t = lang === "nl" ? {
    crumb: "Signaalbriefing / Week 17",
    status: "1 hot signaal",
    subject: "Wekelijkse signaalbriefing",
    week: "Week van 12 april 2026",
    numbersTitle: "Deze week in cijfers",
    stats: [
      { label: "Signalen verzameld", value: 79, hot: false },
      { label: "Relevant (score 5+)", value: 14, hot: false },
      { label: "Hot (score 8+)", value: 1, hot: true },
      { label: "Prospects gevolgd", value: 3, hot: false },
    ],
    moversTitle: "Meest actief deze week",
    signalsIn30: "signalen in 30 dagen",
    newBadge: "Nieuw",
    missedTitle: "Gemiste kansen",
    missed: "8 gekwalificeerde kansen staan onaangeroerd. Elke dag zonder actie riskeer je dat een concurrent die plek inneemt.",
  } : {
    crumb: "Signal Brief / Week 17",
    status: "1 hot signal",
    subject: "Weekly Intelligence Brief",
    week: "Week of April 12, 2026",
    numbersTitle: "This week in numbers",
    stats: [
      { label: "Signals collected", value: 79, hot: false },
      { label: "Relevant (score 5+)", value: 14, hot: false },
      { label: "Hot (score 8+)", value: 1, hot: true },
      { label: "Prospects tracked", value: 3, hot: false },
    ],
    moversTitle: "Heat movers this week",
    signalsIn30: "signals in 30 days",
    newBadge: "New",
    missedTitle: "Missed opportunities",
    missed: "8 qualified openings are sitting untouched. Every day without outreach risks a competitor getting there first.",
  };

  const targets = t.stats.map((s) => s.value);

  const [phase, setPhase] = useState<Phase>("numbers");
  const [statVals, setStatVals] = useState([0, 0, 0, 0]);
  const [moversVisible, setMoversVisible] = useState(0);
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
      setStatVals(targets);
      setMoversVisible(MOVERS.length);
      setPhase("alert");
      return;
    }
    if (!inView) return;
    let cancelled = false;
    const run = async () => {
      while (!cancelled) {
        setPhase("numbers");
        setStatVals([0, 0, 0, 0]);
        setMoversVisible(0);

        const steps = 32;
        const duration = 1100;
        for (let step = 1; step <= steps && !cancelled; step++) {
          const p = step / steps;
          const eased = 1 - Math.pow(1 - p, 3);
          setStatVals(targets.map((t) => Math.round(t * eased)));
          await new Promise((r) => setTimeout(r, duration / steps));
        }
        setStatVals(targets);
        if (cancelled) return;

        await new Promise((r) => setTimeout(r, 350));
        setPhase("movers");
        for (let i = 1; i <= MOVERS.length && !cancelled; i++) {
          setMoversVisible(i);
          await new Promise((r) => setTimeout(r, 280));
        }

        await new Promise((r) => setTimeout(r, 450));
        if (cancelled) return;
        setPhase("alert");
        await new Promise((r) => setTimeout(r, 3600));
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
        tabletRatio={tabletRatio}
      >
        <style>{`
          @keyframes wb-in { from { opacity: 0; transform: translateX(-7px); } to { opacity: 1; transform: translateX(0); } }
          @keyframes wb-up { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes wb-throb { 0%, 100% { opacity: 1; } 50% { opacity: 0.55; } }
          .wb-in { animation: wb-in 0.28s cubic-bezier(.2,.7,.2,1) both; }
          .wb-up { animation: wb-up 0.38s cubic-bezier(.2,.7,.2,1) both; }
          .wb-throb { animation: wb-throb 1.7s ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce) {
            .wb-in, .wb-up, .wb-throb { animation: none !important; }
          }
        `}</style>

        <div className="absolute inset-0 flex flex-col px-3 py-3 sm:px-5 sm:py-4 gap-2 sm:gap-2.5">

          {/* Brief header - looks like an email subject line */}
          <div
            className="rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 flex items-start justify-between gap-3"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <div>
              <p className="text-[11px] sm:text-[13px] font-bold leading-tight" style={{ color: "var(--heading)" }}>
                {t.subject}
              </p>
              <p className="text-[9px] sm:text-[10px] mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                {t.week}
              </p>
            </div>
            <span
              className={`shrink-0 text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap ${phase === "alert" ? "wb-throb" : ""}`}
              style={{ background: "rgba(255,140,66,0.12)", color: "var(--hooklyne-orange)" }}
            >
              {t.status}
            </span>
          </div>

          {/* Stats table */}
          <div
            className="rounded-lg px-3 py-2 sm:px-4 sm:py-2.5"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <p
              className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest mb-1.5"
              style={{ color: "var(--muted-foreground)" }}
            >
              {t.numbersTitle}
            </p>
            <div className="flex flex-col gap-0.5">
              {t.stats.map((s, i) => (
                <div key={s.label} className="flex items-center justify-between py-0.5">
                  <span className="text-[10px] sm:text-[11px]" style={{ color: "var(--muted-foreground)" }}>
                    {s.label}
                  </span>
                  <span
                    className={`text-[11px] sm:text-[13px] font-bold tabular-nums ${s.hot && phase === "alert" ? "wb-throb" : ""}`}
                    style={{ color: s.hot ? "var(--hooklyne-orange)" : "var(--heading)" }}
                  >
                    {statVals[i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Heat movers */}
          <div
            className="rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 flex-1 min-h-0 flex flex-col"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <p
              className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest mb-2"
              style={{ color: "var(--muted-foreground)" }}
            >
              {t.moversTitle}
            </p>
            <div className="flex flex-col gap-1.5">
              {MOVERS.map((m, i) =>
                i < moversVisible ? (
                  <div
                    key={m.name}
                    className="wb-in flex items-center justify-between"
                    style={{ animationDelay: `${i * 0.04}s` }}
                  >
                    <div className="flex items-center gap-1.5">
                      <span
                        className="text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded"
                        style={{ background: "rgba(255,140,66,0.10)", color: "var(--hooklyne-orange)" }}
                      >
                        {t.newBadge}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-semibold" style={{ color: "var(--heading)" }}>
                        {m.name}
                      </span>
                    </div>
                    <span className="text-[9px] sm:text-[10px] tabular-nums" style={{ color: "var(--muted-foreground)" }}>
                      {m.signals} {t.signalsIn30}
                    </span>
                  </div>
                ) : (
                  <div key={m.name} className="flex items-center justify-between" style={{ opacity: 0.18 }}>
                    <div className="h-2 rounded" style={{ width: "45%", background: "var(--border)" }} />
                    <div className="h-2 rounded" style={{ width: "22%", background: "var(--border)" }} />
                  </div>
                )
              )}
            </div>

            {/* Missed opportunities - alert phase only */}
            {phase === "alert" && (
              <div
                className="wb-up mt-auto pt-2"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <div
                  className="rounded-md px-2.5 py-2"
                  style={{
                    background: "rgba(255,140,66,0.06)",
                    borderLeft: "2px solid var(--hooklyne-orange)",
                  }}
                >
                  <p
                    className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider mb-0.5"
                    style={{ color: "var(--hooklyne-orange)" }}
                  >
                    {t.missedTitle}
                  </p>
                  <p className="text-[9px] sm:text-[10px] leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                    {t.missed}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </GraphicShell>
    </div>
  );
};
