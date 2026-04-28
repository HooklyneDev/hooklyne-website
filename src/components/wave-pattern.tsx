/**
 * WavePattern - flowing horizontal lines used as section background texture.
 * Subtle, brand blue, fades in/out at the edges.
 *
 * Drop inside a `position: relative` parent, before the content.
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

const curves = [
  { y: 60,  amp: 18, freq: 1.0,  phase: 0,    op: 0.55 },
  { y: 120, amp: 24, freq: 0.9,  phase: 0.4,  op: 0.7  },
  { y: 190, amp: 16, freq: 1.1,  phase: 0.9,  op: 0.5  },
  { y: 260, amp: 28, freq: 0.85, phase: 0.2,  op: 0.85 },
  { y: 340, amp: 20, freq: 1.0,  phase: 0.6,  op: 0.65 },
  { y: 420, amp: 22, freq: 0.95, phase: 1.1,  op: 0.75 },
  { y: 500, amp: 16, freq: 1.05, phase: 0.3,  op: 0.5  },
  { y: 580, amp: 24, freq: 0.9,  phase: 0.8,  op: 0.6  },
];

const buildPath = (y: number, amp: number, freq: number, phase: number) => {
  const segments = 8;
  const segWidth = 1200 / segments;
  let d = `M 0 ${y + Math.sin(phase) * amp}`;
  for (let i = 1; i <= segments; i++) {
    const x = i * segWidth;
    const cy = y + Math.sin(phase + i * freq) * amp;
    const cpx1 = x - segWidth / 2;
    const cpy1 = y + Math.sin(phase + (i - 0.5) * freq) * amp * 1.3;
    const cpx2 = x - segWidth / 4;
    const cpy2 = cy;
    d += ` C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${x} ${cy}`;
  }
  return d;
};

export const WavePattern = ({
  tone = "blue",
  intensity = "subtle",
  className = "",
  uid = "wp",
}: Props) => {
  const stroke = TONE_STROKE[tone];
  const baseOpacity = intensity === "medium" ? 0.20 : 0.13;
  const vmask = `${uid}-vmask`;
  const vgrad = `${uid}-vgrad`;
  const hgrad = `${uid}-hgrad`;
  const hmask = `${uid}-hmask`;

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
          <linearGradient id={vgrad} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="black" stopOpacity="0" />
            <stop offset="22%"  stopColor="white" stopOpacity="1" />
            <stop offset="78%"  stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="black" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={hgrad} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="black" stopOpacity="0" />
            <stop offset="14%"  stopColor="white" stopOpacity="1" />
            <stop offset="86%"  stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="black" stopOpacity="0" />
          </linearGradient>
          <mask id={vmask}>
            <rect width="1200" height="640" fill={`url(#${vgrad})`} />
          </mask>
          <mask id={hmask}>
            <rect width="1200" height="640" fill={`url(#${hgrad})`} />
          </mask>
        </defs>
        <g mask={`url(#${vmask})`}>
          <g mask={`url(#${hmask})`}>
            {curves.map((c, i) => (
              <path
                key={i}
                d={buildPath(c.y, c.amp, c.freq, c.phase)}
                fill="none"
                stroke={stroke}
                strokeWidth="1.25"
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
