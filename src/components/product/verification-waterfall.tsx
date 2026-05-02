import { useEffect, useRef, useState } from "react";
import { GraphicShell } from "./graphic-shell";
import { useLang, type Lang } from "@/lib/use-lang";

/**
 * Verification waterfall - animates the journey of a contact email through
 * 21 providers and 4 deliverability layers. Sells the claim: nothing
 * unverified ever ships.
 */

const PROVIDERS = [
  { name: "Hunter", code: "HU" },
  { name: "Apollo", code: "AP" },
  { name: "Dropcontact", code: "DC" },
  { name: "RocketReach", code: "RR" },
  { name: "Kaspr", code: "KA" },
  { name: "Snov", code: "SN" },
  { name: "Findymail", code: "FM" },
  { name: "Datagma", code: "DG" },
];

const LAYERS_EN = [
  { key: "smtp", label: "SMTP", desc: "Mailbox accepts" },
  { key: "catchall", label: "Catch-all", desc: "Not a wildcard" },
  { key: "role", label: "Role", desc: "Personal, not info@" },
  { key: "deliverable", label: "Deliverable", desc: "Reputation clean" },
];

const LAYERS_NL = [
  { key: "smtp", label: "SMTP", desc: "Mailbox accepteert" },
  { key: "catchall", label: "Catch-all", desc: "Geen wildcard" },
  { key: "role", label: "Role", desc: "Persoonlijk, geen info@" },
  { key: "deliverable", label: "Deliverable", desc: "Reputatie schoon" },
];

const LAYERS = LAYERS_EN; // referenced in lengths; actual labels picked at render

type Phase = "ingest" | "providers" | "layers" | "verified";

type Ratio = "16/9" | "4/3" | "3/2" | "2/1" | "5/2" | "21/9" | "1/1" | "5/4" | "4/5" | "3/4";
type Props = { ratio?: Ratio; mobileRatio?: Ratio; tabletRatio?: Ratio; lang?: Lang };

export const VerificationWaterfall = ({ ratio = "2/1", mobileRatio, tabletRatio, lang: langProp }: Props = {}) => {
  const lang = useLang(langProp);
  const layersRender = lang === "nl" ? LAYERS_NL : LAYERS_EN;
  const t = lang === "nl" ? {
    crumb: "Portaal / Contactverificatie",
    verified: "Geverifieerd",
    verifying: "Verifiëren",
    role: "Head of Operations",
    providersChecked: "Providers gecheckt",
    matched: "match",
    layersTitle: "4 deliverability-lagen",
    passed: "geslaagd",
    ingest: "Kandidaat ingelezen · m.devries@axiom.nl",
    providers: "Kruisreferentie over 21 providers",
    layers: "Deliverability-checks draaien",
    cleared: "Door alle 4 lagen · veilig om te versturen",
  } : {
    crumb: "Portal / Contact verification",
    verified: "Verified",
    verifying: "Verifying",
    role: "Head of Operations",
    providersChecked: "Providers checked",
    matched: "matched",
    layersTitle: "4 deliverability layers",
    passed: "passed",
    ingest: "Ingesting candidate · m.devries@axiom.nl",
    providers: "Cross-referencing 21 providers",
    layers: "Running deliverability checks",
    cleared: "Cleared all 4 layers · safe to send",
  };
  const [phase, setPhase] = useState<Phase>("ingest");
  const [providerIdx, setProviderIdx] = useState(0);
  const [layerIdx, setLayerIdx] = useState(0);
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
      setPhase("verified");
      setProviderIdx(PROVIDERS.length);
      setLayerIdx(LAYERS.length);
      return;
    }
    if (!inView) return;
    let cancelled = false;
    const run = async () => {
      while (!cancelled) {
        setPhase("ingest");
        setProviderIdx(0);
        setLayerIdx(0);
        await new Promise((r) => setTimeout(r, 900));
        if (cancelled) return;

        setPhase("providers");
        for (let i = 1; i <= PROVIDERS.length && !cancelled; i++) {
          setProviderIdx(i);
          await new Promise((r) => setTimeout(r, 220));
        }
        await new Promise((r) => setTimeout(r, 400));
        if (cancelled) return;

        setPhase("layers");
        for (let i = 1; i <= LAYERS.length && !cancelled; i++) {
          setLayerIdx(i);
          await new Promise((r) => setTimeout(r, 380));
        }
        await new Promise((r) => setTimeout(r, 500));
        if (cancelled) return;

        setPhase("verified");
        await new Promise((r) => setTimeout(r, 2400));
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [reduced, inView]);

  const matchedCount = Math.min(providerIdx, 3);
  const totalChecked = providerIdx;

  return (
    <div ref={rootRef}>
      <GraphicShell crumb={t.crumb} ratio={ratio} mobileRatio={mobileRatio} tabletRatio={tabletRatio}>
        <style>{`
          @keyframes vw-tick { from { opacity: 0; transform: translateX(-6px); } to { opacity: 1; transform: translateX(0); } }
          @keyframes vw-pop { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
          @keyframes vw-bar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
          @keyframes vw-pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(13,148,136,0.45); } 50% { box-shadow: 0 0 0 5px rgba(13,148,136,0); } }
          .vw-tick { animation: vw-tick 0.32s cubic-bezier(.2,.7,.2,1) both; }
          .vw-pop { animation: vw-pop 0.36s cubic-bezier(.2,.7,.2,1) both; }
          .vw-bar { transform-origin: left; animation: vw-bar 0.5s cubic-bezier(.2,.7,.2,1) both; }
          .vw-pulse { animation: vw-pulse 2.2s ease-out infinite; }
          @media (prefers-reduced-motion: reduce) {
            .vw-tick, .vw-pop, .vw-bar, .vw-pulse { animation: none !important; }
            .vw-bar { transform: scaleX(1); }
          }
        `}</style>

        <div className="absolute inset-0 flex flex-col px-3 py-3 sm:px-5 sm:py-4 gap-2 sm:gap-3">
          {/* Contact header */}
          <div className="rounded-lg p-2 sm:p-2.5 flex items-center gap-2 sm:gap-3" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <img src="/personas/sara-de-vries.jpg" alt="Marieke de Vries" className="size-8 sm:size-9 rounded-full shrink-0 object-cover" />
            <div className="min-w-0 flex-1">
              <p className="text-[12px] sm:text-[13px] font-semibold leading-tight truncate" style={{ color: "var(--heading)" }}>
                Marieke de Vries
              </p>
              <p className="text-[10px] sm:text-[11px] truncate" style={{ color: "var(--muted-foreground)" }}>
                {t.role} · m.devries@axiom.nl
              </p>
            </div>
            {phase === "verified" ? (
              <span
                className="vw-pop shrink-0 inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full"
                style={{ background: "rgba(13,148,136,0.14)", color: "var(--hooklyne-teal)" }}
              >
                <svg className="size-2.5 sm:size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {t.verified}
              </span>
            ) : (
              <span
                className="shrink-0 inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] font-semibold px-2 py-1 rounded-full"
                style={{ background: "rgba(52,76,163,0.10)", color: "var(--hooklyne-blue)" }}
              >
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full opacity-70 animate-ping" style={{ background: "var(--hooklyne-blue)" }} />
                  <span className="relative inline-flex rounded-full size-1.5" style={{ background: "var(--hooklyne-blue)" }} />
                </span>
                {t.verifying}
              </span>
            )}
          </div>

          {/* Provider waterfall */}
          <div className="rounded-lg flex flex-col min-h-0 flex-1" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between px-2.5 sm:px-3 py-1.5 border-b" style={{ borderColor: "var(--border)" }}>
              <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>
                {t.providersChecked}
              </p>
              <p className="text-[10px] sm:text-[11px] font-bold tabular-nums" style={{ color: phase === "verified" ? "var(--hooklyne-teal)" : "var(--hooklyne-blue)" }}>
                {totalChecked}/21 <span style={{ color: "var(--muted-foreground)", fontWeight: 500 }}>· {matchedCount} {t.matched}</span>
              </p>
            </div>
            <div className="flex-1 overflow-hidden grid grid-cols-2 gap-x-2 gap-y-1 px-2.5 sm:px-3 py-2">
              {PROVIDERS.map((p, i) => {
                const checked = i < providerIdx;
                const matched = i < matchedCount;
                return (
                  <div key={p.name} className={checked ? "vw-tick" : ""} style={{ animationDelay: `${i * 0.05}s`, opacity: checked ? 1 : 0.32 }}>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px]">
                      <span
                        className="size-4 sm:size-[18px] rounded flex items-center justify-center shrink-0"
                        style={{
                          background: matched ? "rgba(13,148,136,0.14)" : checked ? "var(--background)" : "var(--background)",
                          color: matched ? "var(--hooklyne-teal)" : "var(--muted-foreground)",
                          border: `1px solid ${matched ? "rgba(13,148,136,0.25)" : "var(--border)"}`,
                        }}
                      >
                        {matched ? (
                          <svg className="size-2 sm:size-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        ) : checked ? (
                          <span className="block size-1 rounded-full" style={{ background: "var(--muted-foreground)", opacity: 0.5 }} />
                        ) : null}
                      </span>
                      <span className="truncate" style={{ color: matched ? "var(--heading)" : "var(--muted-foreground)", fontWeight: matched ? 600 : 500 }}>
                        {p.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Deliverability layers */}
          <div className="rounded-lg p-2 sm:p-2.5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>
                {t.layersTitle}
              </p>
              <p className="text-[10px] sm:text-[11px] font-bold tabular-nums" style={{ color: phase === "verified" ? "var(--hooklyne-teal)" : "var(--muted-foreground)" }}>
                {Math.min(layerIdx, LAYERS.length)}/4 {t.passed}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
              {layersRender.map((l, i) => {
                const passed = i < layerIdx;
                return (
                  <div
                    key={l.key}
                    className="rounded-md px-2 py-1.5 flex items-center gap-1.5 sm:gap-2"
                    style={{
                      background: passed ? "rgba(13,148,136,0.06)" : "var(--background)",
                      border: `1px solid ${passed ? "rgba(13,148,136,0.20)" : "var(--border)"}`,
                      transition: "background 0.25s, border-color 0.25s",
                    }}
                  >
                    <span
                      className={passed ? "vw-pop" : ""}
                      style={{
                        animationDelay: `${i * 0.05}s`,
                        display: "inline-flex",
                        width: 14,
                        height: 14,
                        borderRadius: 999,
                        background: passed ? "var(--hooklyne-teal)" : "var(--border)",
                        color: "white",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {passed && (
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      )}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] sm:text-[11px] font-semibold leading-tight truncate" style={{ color: "var(--heading)" }}>
                        {l.label}
                      </p>
                      <p className="text-[9px] sm:text-[10px] leading-tight truncate" style={{ color: "var(--muted-foreground)" }}>
                        {l.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer verdict */}
          <div className="flex items-center justify-between text-[9px] sm:text-[10px]" style={{ color: "var(--muted-foreground)" }}>
            <span>
              {phase === "ingest" && t.ingest}
              {phase === "providers" && t.providers}
              {phase === "layers" && t.layers}
              {phase === "verified" && (
                <span style={{ color: "var(--hooklyne-teal)", fontWeight: 600 }}>{t.cleared}</span>
              )}
            </span>
            <span className="font-mono tabular-nums text-[var(--muted-foreground)]">{providerIdx + 1} / 21</span>
          </div>
        </div>
      </GraphicShell>
    </div>
  );
};
