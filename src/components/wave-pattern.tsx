/**
 * WavePattern - topographic contour lines used as section background.
 *
 * Modern, subtle. Long organic curves with slight diagonal flow,
 * heavily masked at the edges so it reads as texture, not UI.
 *
 * Drop inside a `position: relative; overflow: hidden` parent.
 *
 *   <section className="relative overflow-hidden">
 *     <WavePattern />
 *     <div className="relative z-10">{content}</div>
 *   </section>
 */
type Tone = "blue" | "teal" | "navy";

const TONE_STROKE: Record<Tone, string> = {
  blue: "#344ca3",
  teal: "#0d9488",
  navy: "#022f51",
};

type Props = {
  tone?: Tone;
  intensity?: "subtle" | "medium";
  className?: string;
  /** Unique id for SVG defs when multiple instances are on the same page. */
  uid?: string;
};

/**
 * Each curve is a long organic path with cubic beziers that flow across
 * the viewBox. y-positions and control points are hand-picked so the
 * resulting lines feel like contour lines on a topographic map - never
 * parallel, varying gap, slight diagonal drift.
 */
const CURVES: { d: string; op: number }[] = [
  {
    d: "M -50 120 C 200 60, 400 180, 620 110 S 1000 40, 1250 130",
    op: 0.55,
  },
  {
    d: "M -50 220 C 240 140, 460 290, 700 210 S 1050 130, 1250 240",
    op: 0.7,
  },
  {
    d: "M -50 320 C 180 240, 420 380, 660 310 S 1010 230, 1250 340",
    op: 0.85,
  },
  {
    d: "M -50 420 C 220 340, 480 480, 720 420 S 1080 360, 1250 460",
    op: 0.7,
  },
  {
    d: "M -50 520 C 260 440, 500 580, 740 520 S 1100 460, 1250 540",
    op: 0.5,
  },
];

export const WavePattern = ({
  tone = "blue",
  intensity = "subtle",
  className = "",
  uid = "wp",
}: Props) => {
  const stroke = TONE_STROKE[tone];
  const baseOpacity = intensity === "medium" ? 0.16 : 0.10;
  const vmaskId = `${uid}-vmask`;
  const hmaskId = `${uid}-hmask`;
  const vgrad = `${uid}-vgrad`;
  const hgrad = `${uid}-hgrad`;
  const blob1 = `${uid}-blob1`;
  const blob2 = `${uid}-blob2`;

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      <svg
        viewBox="0 0 1200 640"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >
        <defs>
          {/* Vertical fade so curves don't end abruptly at top/bottom of section */}
          <linearGradient id={vgrad} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="black" stopOpacity="0" />
            <stop offset="22%"  stopColor="white" stopOpacity="1" />
            <stop offset="78%"  stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="black" stopOpacity="0" />
          </linearGradient>
          {/* Horizontal fade so curves bleed off the sides */}
          <linearGradient id={hgrad} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="black" stopOpacity="0" />
            <stop offset="12%"  stopColor="white" stopOpacity="1" />
            <stop offset="88%"  stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="black" stopOpacity="0" />
          </linearGradient>
          <mask id={vmaskId}>
            <rect width="1200" height="640" fill={`url(#${vgrad})`} />
          </mask>
          <mask id={hmaskId}>
            <rect width="1200" height="640" fill={`url(#${hgrad})`} />
          </mask>
          {/* Soft brand-coloured glows behind the contour lines */}
          <radialGradient id={blob1} cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor={stroke} stopOpacity="0.10" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0" />
          </radialGradient>
          <radialGradient id={blob2} cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor={stroke} stopOpacity="0.07" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Glows */}
        <ellipse cx="180" cy="180" rx="380" ry="220" fill={`url(#${blob1})`} />
        <ellipse cx="1020" cy="460" rx="420" ry="240" fill={`url(#${blob2})`} />

        {/* Topographic contour lines, double-masked top/bottom + sides */}
        <g mask={`url(#${vmaskId})`}>
          <g mask={`url(#${hmaskId})`}>
            {CURVES.map((c, i) => (
              <path
                key={i}
                d={c.d}
                fill="none"
                stroke={stroke}
                strokeWidth="1"
                strokeLinecap="round"
                opacity={baseOpacity * c.op}
              />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
};
