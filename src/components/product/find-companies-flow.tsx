import { useEffect, useRef, useState } from "react";
import { GraphicShell } from "./graphic-shell";
import { useLang, type Lang } from "@/lib/use-lang";

/**
 * Find me companies - mirrors the real 3-step flow in the portal.
 * Step 1: describe textarea (types a prompt) + country + employees + Search.
 * Step 2: ranked company cards with real signal pills.
 * Step 3: per-company contact cards with confidence badges.
 * Loops through the steps. Copy matches the portal exactly.
 */

const PROMPT_EN =
  "Dutch food brands and meal kit operators expanding their ambient product range - sauces, snacks, and bakery components";
const PROMPT_NL =
  "Nederlandse foodmerken en maaltijdbox-operators die hun ambient productlijn uitbreiden - sauzen, snacks en bakery-componenten";

const COMPANIES_EN = [
  { n: 1, name: "Ekomenu", domain: "ekomenu.nl", size: "50-200", city: "Utrecht",
    body: "Dutch organic meal kit company delivering weekly boxes to 80,000+ households. Expanding range with seasonal and plant-based components.",
    signal: "Active NPD programme, recent tender for ambient sauce and grain components. IFS and BIO certification required." },
  { n: 2, name: "Marley Spoon", domain: "marleyspoon.com", size: "200-500", city: "Amsterdam",
    body: "International meal kit operator with NL and UK operations. Known for premium positioning and chef-designed recipes.",
    signal: "Sourcing new ambient components for expanded autumn/winter menu. Procurement team recently posted 2 supplier RFPs." },
  { n: 3, name: "Stach Food", domain: "stach-food.nl", size: "50-200", city: "Amsterdam",
    body: "Food-to-go operator with 37 locations across offices, stations and city centres in the Benelux.",
    signal: "Rapid location growth signals supplier consolidation - NPD partner for ambient snacks and meal components needed." },
];

const COMPANIES_NL = [
  { n: 1, name: "Ekomenu", domain: "ekomenu.nl", size: "50-200", city: "Utrecht",
    body: "Nederlandse biologische maaltijdboxleverancier met wekelijkse boxen voor 80.000+ huishoudens. Breidt het assortiment uit met seizoens- en plantaardige componenten.",
    signal: "Actief NPD-programma, recente tender voor ambient sauzen en graanproducten. IFS- en BIO-certificering vereist." },
  { n: 2, name: "Marley Spoon", domain: "marleyspoon.com", size: "200-500", city: "Amsterdam",
    body: "Internationale maaltijdbox-operator met operaties in NL en UK. Bekend om premium positionering en chef-ontworpen recepten.",
    signal: "Op zoek naar nieuwe ambient componenten voor het uitgebreide herfst/winter-menu. Procurement plaatste recent 2 RFPs." },
  { n: 3, name: "Stach Food", domain: "stach-food.nl", size: "50-200", city: "Amsterdam",
    body: "Food-to-go operator met 37 vestigingen op kantoren, stations en in stadscentra in de Benelux.",
    signal: "Snelle locatiegroei wijst op leveranciersconsolidatie - NPD-partner gezocht voor ambient snacks en maaltijdcomponenten." },
];

type Conf = "high" | "medium" | "low";
const CONTACTS_EN: { role: string; conf: Conf; body: string }[] = [
  { role: "Category Manager", conf: "high",
    body: "Directly responsible for sourcing ambient and organic components for the weekly box. Most likely decision-maker for new supplier onboarding." },
  { role: "Head of Procurement", conf: "medium",
    body: "Oversees all supplier relationships and commercial terms. Signs off on new supplier approvals. Worth contacting in parallel." },
  { role: "Operations Director", conf: "low",
    body: "Manages fulfilment and logistics rather than sourcing. Could be a gatekeeper but unlikely to be the primary contact." },
];

const CONTACTS_NL: { role: string; conf: Conf; body: string }[] = [
  { role: "Category Manager", conf: "high",
    body: "Direct verantwoordelijk voor de sourcing van ambient en biologische componenten voor de wekelijkse box. Meest waarschijnlijke beslisser voor het onboarden van nieuwe leveranciers." },
  { role: "Head of Procurement", conf: "medium",
    body: "Eindverantwoordelijk voor leveranciersrelaties en commerciële voorwaarden. Tekent nieuwe leveranciers af. Goed om parallel te benaderen." },
  { role: "Operations Director", conf: "low",
    body: "Beheert fulfilment en logistiek, geen sourcing. Kan een gatekeeper zijn maar is waarschijnlijk niet de primaire contactpersoon." },
];

const CONF_EN: Record<Conf, { label: string; bg: string; fg: string; icon: string }> = {
  high: { label: "High confidence", bg: "rgba(13,148,136,0.14)", fg: "var(--hooklyne-teal)", icon: "check" },
  medium: { label: "Medium confidence", bg: "rgba(255,140,66,0.14)", fg: "var(--hooklyne-orange)", icon: "tilde" },
  low: { label: "Low confidence", bg: "rgba(220,38,38,0.12)", fg: "#b91c1c", icon: "arrow" },
};

const CONF_NL: Record<Conf, { label: string; bg: string; fg: string; icon: string }> = {
  high: { label: "Hoge zekerheid", bg: "rgba(13,148,136,0.14)", fg: "var(--hooklyne-teal)", icon: "check" },
  medium: { label: "Gemiddelde zekerheid", bg: "rgba(255,140,66,0.14)", fg: "var(--hooklyne-orange)", icon: "tilde" },
  low: { label: "Lage zekerheid", bg: "rgba(220,38,38,0.12)", fg: "#b91c1c", icon: "arrow" },
};

const COMPANY_LOGOS: Record<string, { logo: string; color: string }> = {
  "Ekomenu":      { logo: "EK", color: "#16a34a" },
  "Marley Spoon": { logo: "MS", color: "#dc2626" },
  "Stach Food":   { logo: "SF", color: "#d97706" },
};

type Ratio = "16/9" | "4/3" | "3/2" | "2/1" | "5/2" | "21/9" | "1/1" | "5/4" | "4/5" | "3/4";
type FindCompaniesFlowProps = { ratio?: Ratio; mobileRatio?: Ratio; tabletRatio?: Ratio; xsMobileRatio?: Ratio; lang?: Lang };
export const FindCompaniesFlow = ({ ratio = "2/1", mobileRatio, tabletRatio, xsMobileRatio, lang: langProp }: FindCompaniesFlowProps = {}) => {
  const lang = useLang(langProp);
  const PROMPT = lang === "nl" ? PROMPT_NL : PROMPT_EN;
  const COMPANIES = lang === "nl" ? COMPANIES_NL : COMPANIES_EN;
  const CONTACTS = lang === "nl" ? CONTACTS_NL : CONTACTS_EN;
  const CONF = lang === "nl" ? CONF_NL : CONF_EN;
  const t = lang === "nl" ? {
    crumbDescribe: "Prospecten / Vind bedrijven",
    crumbSelect: "Prospecten / Selectie",
    crumbContacts: "Prospecten / Contacten",
    statusDrafting: "Opstellen",
    statusFound: "6 gevonden",
    statusVerifying: "Verifiëren",
    stepDescribe: "Beschrijf je ICP",
    stepSelect: "Selectie",
    stepContacts: "Contacten",
    rankedBy: "Gerangschikt op signaalsterkte",
    confidenceLine: "Hoog · Gemiddeld · Lage zekerheid",
    landsIn: "Leads belanden in My Leads · Bedrijven gevolgd in Signalen",
  } : {
    crumbDescribe: "Prospecting / Find me companies",
    crumbSelect: "Prospecting / Select",
    crumbContacts: "Prospecting / Contacts",
    statusDrafting: "Drafting",
    statusFound: "6 found",
    statusVerifying: "Verifying",
    stepDescribe: "Describe your ICP",
    stepSelect: "Select",
    stepContacts: "Contacts",
    rankedBy: "Ranked by signal strength",
    confidenceLine: "High · Medium · Low confidence",
    landsIn: "Leads land in My Leads · Companies tracked in Signals",
  };
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState("");
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
      setStep(1);
      setTyped(PROMPT);
      return;
    }
    if (!inView) return;
    let cancelled = false;
    const run = async () => {
      while (!cancelled) {
        setStep(0);
        setTyped("");
        for (let i = 1; i <= PROMPT.length && !cancelled; i++) {
          setTyped(PROMPT.slice(0, i));
          await new Promise((r) => setTimeout(r, 22));
        }
        if (cancelled) return;
        await new Promise((r) => setTimeout(r, 900));
        setStep(1);
        await new Promise((r) => setTimeout(r, 4200));
        if (cancelled) return;
        setStep(2);
        await new Promise((r) => setTimeout(r, 4600));
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [reduced, inView]);

  return (
    <div ref={rootRef}>
    <GraphicShell
      crumb={step === 0 ? t.crumbDescribe : step === 1 ? t.crumbSelect : t.crumbContacts}
      status={step === 0 ? t.statusDrafting : step === 1 ? t.statusFound : t.statusVerifying}
      statusTone={step === 0 ? "blue" : step === 1 ? "teal" : "orange"}
      ratio={ratio}
      mobileRatio={mobileRatio}
      xsMobileRatio={xsMobileRatio}
      tabletRatio={tabletRatio}
    >
      <style>{`
        @keyframes fc-caret { 0%,49% { opacity: 1; } 50%,100% { opacity: 0; } }
        @keyframes fc-slide { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fc-check { from { transform: scale(0); } to { transform: scale(1); } }
        @keyframes fc-pop { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
        .fc-caret { animation: fc-caret 0.9s steps(1,end) infinite; }
        .fc-slide { animation: fc-slide 0.5s both; }
        .fc-pop { animation: fc-pop 0.5s cubic-bezier(.2,.7,.2,1) both; }
        .fc-check { animation: fc-check 0.3s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .fc-caret, .fc-slide, .fc-pop, .fc-check { animation: none !important; opacity: 1 !important; transform: none !important; }
          .fc-caret { opacity: 0; }
        }
      `}</style>

      <div className="absolute inset-0 flex flex-col px-4 py-3 sm:px-6 sm:py-5">
        <div className="mb-3">
          <p className="text-[10px] sm:text-[11px]" style={{ color: "var(--muted-foreground)" }}>← Prospecting</p>
          <h3 className="text-base sm:text-xl font-semibold leading-tight tracking-tight" style={{ color: "var(--heading)" }}>
            Find me companies
          </h3>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 rounded-xl px-2 py-1.5 sm:px-3 sm:py-2 mb-3" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          {[
            { n: 1, label: "Find" },
            { n: 2, label: t.stepSelect },
            { n: 3, label: t.stepContacts },
          ].map((s, i) => {
            const done = step > i;
            const active = step === i;
            return (
              <div key={s.n} className="flex items-center gap-1 sm:gap-1.5 flex-1">
                <div
                  className="size-5 sm:size-6 rounded-full flex items-center justify-center text-[10px] sm:text-[11px] font-bold shrink-0 transition-colors duration-300"
                  style={{
                    background: done ? "rgba(13,148,136,0.14)" : active ? "var(--hooklyne-navy)" : "var(--background)",
                    color: done ? "var(--hooklyne-teal)" : active ? "white" : "var(--muted-foreground)",
                    border: done || active ? "none" : "1px solid var(--border)",
                  }}
                >
                  {done ? (
                    <svg className="fc-check size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  ) : (
                    s.n
                  )}
                </div>
                <span
                  className="text-[10px] sm:text-[12px] font-semibold"
                  style={{ color: done ? "var(--hooklyne-teal)" : active ? "var(--heading)" : "var(--muted-foreground)" }}
                >
                  {s.label}
                </span>
                {i < 2 && <div className="flex-1 h-px mx-1 sm:mx-2" style={{ background: "var(--border)" }} />}
              </div>
            );
          })}
        </div>

        <div className="flex-1 min-h-0 rounded-xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          {step === 0 && (
            <div className="h-full p-3 sm:p-4 flex flex-col">
              <p className="text-[11px] sm:text-sm font-semibold mb-0.5" style={{ color: "var(--heading)" }}>Describe the type of company you want to reach</p>
              <p className="text-[10px] sm:text-[11px] mb-2" style={{ color: "var(--muted-foreground)" }}>Write like you'd explain to a colleague. Sector, size, situation, geography.</p>
              <div
                className="flex-1 rounded-lg p-2.5 sm:p-3 text-[11px] sm:text-[13px] leading-relaxed"
                style={{ background: "var(--background)", border: "1px solid var(--border)", color: "var(--heading)" }}
              >
                {typed}
                <span className="fc-caret inline-block w-[2px] h-[12px] sm:h-[14px] align-middle ml-0.5" style={{ background: "var(--hooklyne-blue)" }} />
              </div>
              <div className="flex items-end justify-between gap-2 sm:gap-3 mt-2 sm:mt-3">
                <div className="flex gap-2 sm:gap-3 flex-1 min-w-0">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest mb-0.5" style={{ color: "var(--muted-foreground)" }}>Country</p>
                    <div className="text-[10px] sm:text-[11px] px-2 py-1 rounded-md" style={{ background: "var(--background)", border: "1px solid var(--border)", color: "var(--heading)" }}>NL ▾</div>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest mb-0.5" style={{ color: "var(--muted-foreground)" }}>Employees</p>
                    <div className="flex items-center gap-1">
                      <div className="text-[10px] px-2 py-1 rounded-md w-10 sm:w-12" style={{ background: "var(--background)", border: "1px solid var(--border)", color: "var(--muted-foreground)" }}>Min</div>
                      <span className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>to</span>
                      <div className="text-[10px] px-2 py-1 rounded-md w-10 sm:w-12" style={{ background: "var(--background)", border: "1px solid var(--border)", color: "var(--muted-foreground)" }}>Max</div>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-md text-[10px] sm:text-[11px] font-semibold"
                  style={{ background: "var(--hooklyne-navy)", color: "white" }}
                >
                  <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
                  Search
                </button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="h-full p-3 sm:p-4 flex flex-col">
              <div className="flex items-baseline justify-between mb-2">
                <div>
                  <p className="text-[11px] sm:text-sm font-semibold" style={{ color: "var(--heading)" }}>6 companies found</p>
                  <p className="text-[9px] sm:text-[11px]" style={{ color: "var(--muted-foreground)" }}>Ranked by signal strength</p>
                </div>
                <div className="flex gap-1.5">
                  <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded" style={{ background: "var(--background)", border: "1px solid var(--border)", color: "var(--muted-foreground)" }}>Select all</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-1.5 sm:gap-2 overflow-hidden">
                {COMPANIES.map((c, i) => (
                  <div
                    key={c.name}
                    className="fc-slide rounded-lg p-2 sm:p-2.5"
                    style={{ background: "var(--background)", border: "1px solid var(--border)", animationDelay: `${i * 0.18}s` }}
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1 min-w-0">
                      <div className="size-3 sm:size-3.5 rounded shrink-0" style={{ border: "1.5px solid var(--border-strong, #cbd5e1)" }} />
                      <span className="text-[9px] sm:text-[10px] font-bold shrink-0" style={{ color: "var(--muted-foreground)" }}>#{c.n}</span>
                      {COMPANY_LOGOS[c.name] && (
                        <div
                          className="size-4 sm:size-5 rounded shrink-0 flex items-center justify-center text-[7px] sm:text-[8px] font-bold text-white leading-none"
                          style={{ background: COMPANY_LOGOS[c.name]!.color }}
                        >
                          {COMPANY_LOGOS[c.name]!.logo}
                        </div>
                      )}
                      <span className="text-[11px] sm:text-[13px] font-semibold truncate" style={{ color: "var(--heading)" }}>{c.name}</span>
                      <span className="text-[9px] sm:text-[10px] truncate hidden sm:inline" style={{ color: "var(--hooklyne-blue)" }}>{c.domain}</span>
                      <span className="text-[9px] px-1 py-0.5 rounded shrink-0" style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--muted-foreground)" }}>{c.size}</span>
                      <span className="text-[9px] sm:text-[10px] shrink-0 hidden sm:inline" style={{ color: "var(--muted-foreground)" }}>{c.city}</span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] leading-snug mb-1 sm:mb-1.5 line-clamp-1 sm:line-clamp-2" style={{ color: "var(--foreground)" }}>{c.body}</p>
                    <div className="flex items-start gap-1.5 rounded px-1.5 py-1" style={{ background: "rgba(52,76,163,0.05)", borderLeft: "2px solid var(--hooklyne-blue)" }}>
                      <svg className="size-2.5 sm:size-3 shrink-0 mt-0.5" style={{ color: "var(--hooklyne-blue)" }} viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" /></svg>
                      <p className="text-[9px] sm:text-[10px] italic leading-snug line-clamp-1 sm:line-clamp-2" style={{ color: "var(--hooklyne-blue)" }}>{c.signal}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="h-full p-3 sm:p-4 flex flex-col">
              <p className="text-[10px] sm:text-[11px] mb-2" style={{ color: "var(--muted-foreground)" }}>
                <span className="font-semibold" style={{ color: "var(--heading)" }}>2 companies selected</span> - finding the right contact at each
              </p>
              <div className="mb-1.5">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[11px] sm:text-[13px] font-semibold" style={{ color: "var(--heading)" }}>Ekomenu</span>
                  <span className="text-[9px] sm:text-[10px]" style={{ color: "var(--hooklyne-blue)" }}>ekomenu.nl</span>
                </div>
              </div>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2 min-h-0">
                {CONTACTS.map((c, i) => {
                  const conf = CONF[c.conf];
                  return (
                    <div
                      key={c.role}
                      className="fc-pop rounded-lg p-2 sm:p-2.5 flex flex-col min-h-0"
                      style={{ background: "var(--background)", border: "1px solid var(--border)", animationDelay: `${i * 0.18}s` }}
                    >
                      <p className="text-[11px] sm:text-[12px] font-semibold mb-1 sm:mb-1.5 leading-tight" style={{ color: "var(--heading)" }}>{c.role}</p>
                      <span
                        className="inline-flex items-center gap-1 text-[8px] sm:text-[9px] font-semibold px-1.5 py-0.5 rounded self-start mb-1 sm:mb-1.5"
                        style={{ background: conf.bg, color: conf.fg }}
                      >
                        {conf.icon === "check" && <svg className="size-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>}
                        {conf.icon === "tilde" && <span>~</span>}
                        {conf.icon === "arrow" && <svg className="size-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></svg>}
                        {conf.label}
                      </span>
                      <p className="text-[9px] sm:text-[10px] leading-snug line-clamp-3 sm:line-clamp-4" style={{ color: "var(--muted-foreground)" }}>{c.body}</p>
                      <p className="text-[9px] sm:text-[10px] font-semibold mt-auto pt-1 sm:pt-1.5" style={{ color: "var(--hooklyne-blue)" }}>Select this contact →</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 text-[9px] sm:text-[10px]" style={{ color: "var(--muted-foreground)" }}>
          <span>{t.landsIn}</span>
          <span>
            {step === 0 && t.stepDescribe}
            {step === 1 && t.rankedBy}
            {step === 2 && t.confidenceLine}
          </span>
        </div>
      </div>
    </GraphicShell>
    </div>
  );
};
