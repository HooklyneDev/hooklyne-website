import { useId, type ReactNode } from "react";

/**
 * Browser-chrome wrapper used by all product-page animated graphics.
 * Matches PortalShot visual language so they feel like the same family.
 */
type Tone = "blue" | "teal" | "orange" | "navy";

const TONE: Record<Tone, { bg: string; fg: string; dot: string }> = {
  blue: { bg: "rgba(52,76,163,0.10)", fg: "var(--hooklyne-blue)", dot: "var(--hooklyne-blue)" },
  teal: { bg: "rgba(13,148,136,0.12)", fg: "var(--hooklyne-teal)", dot: "var(--hooklyne-teal)" },
  orange: { bg: "rgba(255,140,66,0.14)", fg: "var(--hooklyne-orange)", dot: "var(--hooklyne-orange)" },
  navy: { bg: "rgba(2,47,81,0.10)", fg: "var(--hooklyne-navy)", dot: "var(--hooklyne-navy)" },
};

const RATIO_PB: Record<"16/9" | "4/3" | "3/2" | "2/1" | "5/2" | "21/9" | "1/1" | "5/4", string> = {
  "16/9": "56.25%",
  "4/3": "75%",
  "3/2": "66.66%",
  "2/1": "50%",
  "5/2": "40%",
  "21/9": "42.857%",
  "1/1": "100%",
  "5/4": "80%",
};

type Ratio = "16/9" | "4/3" | "3/2" | "2/1" | "5/2" | "21/9" | "1/1" | "5/4";

type Props = {
  crumb: string;
  status?: string;
  statusTone?: Tone;
  ratio?: Ratio;
  /** Optional override for sub-md viewports. */
  mobileRatio?: Ratio;
  /** Optional override for md..lg viewports. */
  tabletRatio?: Ratio;
  children: ReactNode;
  className?: string;
};

export const GraphicShell = ({
  crumb,
  status,
  statusTone = "teal",
  ratio = "16/9",
  mobileRatio,
  tabletRatio,
  children,
  className,
}: Props) => {
  const chip = status ? TONE[statusTone] : null;
  const reactId = useId().replace(/[:]/g, "");
  const stageClass = `gs-stage-${reactId}`;
  const responsiveCss =
    mobileRatio || tabletRatio
      ? `${mobileRatio ? `@media (max-width: 767px){.${stageClass}{padding-bottom:${RATIO_PB[mobileRatio]} !important;}}` : ""}${tabletRatio ? `@media (min-width: 768px) and (max-width: 1023px){.${stageClass}{padding-bottom:${RATIO_PB[tabletRatio]} !important;}}` : ""}`
      : null;
  return (
    <div className={`relative w-full rounded-2xl overflow-visible ${className ?? ""}`}>
      <div
        className="absolute -inset-4 rounded-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(52,76,163,0.10) 0%, transparent 70%)",
        }}
      />

      <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "var(--shadow-lg)" }}>
        <div
          className="flex items-center gap-3 px-4 border border-b-0 rounded-t-2xl"
          style={{ height: "36px", background: "var(--card)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="size-2 rounded-full" style={{ background: "var(--border-strong)" }} />
            <div className="size-2 rounded-full" style={{ background: "var(--border-strong)" }} />
            <div className="size-2 rounded-full" style={{ background: "var(--border-strong)" }} />
          </div>
          <div className="h-3 w-px" style={{ background: "var(--border)" }} />
          <div
            className="flex-1 flex items-center gap-1.5 text-[11px] font-medium truncate"
            style={{ color: "var(--muted-foreground)" }}
          >
            <span
              className="text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ color: "var(--hooklyne-blue)" }}
            >
              Hooklyne
            </span>
            <span style={{ opacity: 0.4 }}>/</span>
            <span className="truncate" style={{ color: "var(--heading)" }}>
              {crumb}
            </span>
          </div>
          {status && chip && (
            <div
              className="shrink-0 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold"
              style={{ background: chip.bg, color: chip.fg }}
            >
              <span className="relative flex size-1.5">
                <span
                  className="absolute inline-flex h-full w-full rounded-full opacity-70 animate-ping"
                  style={{ background: chip.dot }}
                />
                <span
                  className="relative inline-flex rounded-full size-1.5"
                  style={{ background: chip.dot }}
                />
              </span>
              {status}
            </div>
          )}
        </div>

        {responsiveCss && <style>{responsiveCss}</style>}
        <div
          className={`relative border border-t-0 rounded-b-2xl overflow-hidden ${stageClass}`}
          style={{
            paddingBottom: RATIO_PB[ratio],
            borderColor: "var(--border)",
            background:
              "radial-gradient(ellipse 60% 40% at 30% 20%, rgba(52,76,163,0.10), transparent 60%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(13,148,136,0.06), transparent 60%), linear-gradient(135deg, var(--card) 0%, var(--card-hover) 100%)",
          }}
        >
          <div className="absolute inset-0">{children}</div>
        </div>
      </div>
    </div>
  );
};
