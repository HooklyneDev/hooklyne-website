import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * PortalShot - richer placeholder for portal screenshots.
 * Shows a browser-chrome frame, a labelled placeholder area describing the
 * screenshot that should go here, and optional overlay pills positioned at
 * relative coordinates. Designers can swap the inner <img> later - overlays
 * stay in place.
 */

type Overlay = {
  /** 0-100 percentage from the left of the shot */
  x: number;
  /** 0-100 percentage from the top of the shot */
  y: number;
  /** Small eyebrow label (e.g. "SIGNAL") */
  tag?: string;
  /** Main line shown on the pill */
  title: string;
  /** Optional second line for context */
  body?: string;
  /** Accent colour of the tag */
  tone?: "blue" | "teal" | "orange" | "navy";
  /** Show a pulsing dot on the left */
  pulse?: boolean;
};

type Props = {
  /** Short label describing what screenshot should live here */
  label: string;
  /** Longer one-liner describing the intended screenshot content */
  describe?: string;
  /** Browser URL shown in the chrome bar */
  url?: string;
  /** Aspect ratio of the inner shot */
  ratio?: "16/9" | "4/3" | "3/2";
  /** Overlay pills positioned on top of the shot */
  overlays?: Overlay[];
  /** Optional actual screenshot src. If provided the placeholder content is hidden. */
  src?: string;
  className?: string;
};

const RATIO_PB: Record<NonNullable<Props["ratio"]>, string> = {
  "16/9": "56.25%",
  "4/3": "75%",
  "3/2": "66.66%",
};

const TONE: Record<NonNullable<Overlay["tone"]>, { bg: string; fg: string; dot: string }> = {
  blue: { bg: "rgba(52,76,163,0.10)", fg: "var(--hooklyne-blue)", dot: "var(--hooklyne-blue)" },
  teal: { bg: "rgba(13,148,136,0.12)", fg: "var(--hooklyne-teal)", dot: "var(--hooklyne-teal)" },
  orange: { bg: "rgba(255,140,66,0.14)", fg: "var(--hooklyne-orange)", dot: "var(--hooklyne-orange)" },
  navy: { bg: "rgba(2,47,81,0.10)", fg: "var(--hooklyne-navy)", dot: "var(--hooklyne-navy)" },
};

export const PortalShot = ({
  label,
  describe,
  url = "portal.hooklyne.com",
  ratio = "16/9",
  overlays = [],
  src,
  className,
}: Props) => {
  return (
    <div className={cn("relative w-full rounded-2xl overflow-visible", className)}>
      {/* Glow wash */}
      <div
        className="absolute -inset-4 rounded-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(52,76,163,0.10) 0%, transparent 70%)" }}
      />

      <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "var(--shadow-lg)" }}>
        {/* Chrome */}
        <div
          className="flex items-center gap-2 px-3 border border-b-0 rounded-t-2xl"
          style={{ height: "36px", background: "var(--card)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-1 mr-1">
            <div className="size-2.5 rounded-full" style={{ background: "#ff5f57" }} />
            <div className="size-2.5 rounded-full" style={{ background: "#febc2e" }} />
            <div className="size-2.5 rounded-full" style={{ background: "#28c840" }} />
          </div>
          <div
            className="flex-1 mx-2 px-3 rounded-full text-[11px] flex items-center justify-center gap-1.5"
            style={{ height: "22px", background: "var(--background)", color: "var(--muted-foreground)" }}
          >
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.55 }}>
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            {url}
          </div>
        </div>

        {/* Shot */}
        <div
          className="relative border border-t-0 rounded-b-2xl"
          style={{
            paddingBottom: RATIO_PB[ratio],
            borderColor: "var(--border)",
            background: `radial-gradient(ellipse 60% 40% at 30% 20%, rgba(52,76,163,0.10), transparent 60%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(13,148,136,0.06), transparent 60%), linear-gradient(135deg, var(--card) 0%, var(--card-hover) 100%)`,
          }}
        >
          {src ? (
            <img src={src} alt={label} className="absolute inset-0 w-full h-full object-cover object-top" />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
              <div
                className="flex items-center justify-center size-11 rounded-xl mb-3"
                style={{ background: "var(--card)", border: "1px dashed var(--border-strong)" }}
              >
                <ImageIcon className="size-5" style={{ color: "var(--muted-foreground)" }} />
              </div>
              <p className="text-sm font-semibold" style={{ color: "var(--heading)" }}>{label}</p>
              {describe && (
                <p className="text-xs mt-2 max-w-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                  {describe}
                </p>
              )}
            </div>
          )}

          {/* Overlay pills */}
          {overlays.map((o, i) => {
            const tone = TONE[o.tone ?? "blue"];
            return (
              <div
                key={i}
                className="absolute pointer-events-none"
                style={{ left: `${o.x}%`, top: `${o.y}%`, transform: "translate(-50%, -50%)" }}
              >
                <div
                  className="rounded-xl px-3 py-2 flex items-start gap-2 min-w-[170px] max-w-[240px]"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    boxShadow: "0 8px 24px -8px rgba(2,47,81,0.25), 0 0 0 1px rgba(52,76,163,0.04)",
                  }}
                >
                  {o.pulse && (
                    <span className="relative flex size-2 mt-1 shrink-0">
                      <span className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping" style={{ background: tone.dot }} />
                      <span className="relative inline-flex rounded-full size-2" style={{ background: tone.dot }} />
                    </span>
                  )}
                  <div className="flex flex-col gap-0.5 min-w-0">
                    {o.tag && (
                      <span
                        className="text-[9px] font-bold uppercase tracking-widest"
                        style={{ color: tone.fg }}
                      >
                        {o.tag}
                      </span>
                    )}
                    <span className="text-[12px] font-semibold leading-tight" style={{ color: "var(--heading)" }}>
                      {o.title}
                    </span>
                    {o.body && (
                      <span className="text-[11px] leading-snug" style={{ color: "var(--muted-foreground)" }}>
                        {o.body}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
