import { GridSignals } from "@/components/grid-signals";

/**
 * HeroGlow - decorative background used on every page hero except the
 * home hero (which has its own bespoke version with a video).
 * Centre glow that breathes + concentric rings + drifting edge lights
 * + optional grid signal pulses. Drop as first child of a
 * relative-positioned section.
 *
 * Animation tokens live in global.css:
 *   .hero-glow-breathe       - centre glow opacity 0.35 ↔ 1 over 8s
 *   .hero-edge-drift-left    - opacity + translate, 10s
 *   .hero-edge-drift-right   - opacity + translate, 12s
 * Three different cycle lengths so the lights never sync — keeps
 * the motion organic, not mechanical.
 */

const ringMask =
  "linear-gradient(to bottom, transparent 0%, black 9%, black 55%, transparent 72%)";

const rings = [150, 300, 450, 600, 750, 900, 1050]
  .map((r, i) => {
    const opacity = 0.16 - i * 0.015;
    return `radial-gradient(circle at 50% 35%, transparent ${r - 1}px, rgba(52,76,163,${opacity.toFixed(3)}) ${r}px, transparent ${r + 1}px)`;
  })
  .join(", ");

export const HeroGlow = ({ signals = true }: { signals?: boolean } = {}) => (
  <>
    {/* Centre glow — breathes 8s */}
    <div
      className="hero-glow-breathe absolute inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        background:
          "radial-gradient(ellipse 50% 38% at 50% 30%, rgba(52,76,163,0.45) 0%, rgba(52,76,163,0.16) 50%, transparent 72%)",
        maskImage: ringMask,
        WebkitMaskImage: ringMask,
      }}
    />

    {/* Concentric rings — fade outward 0.16 → 0.055 */}
    <div
      className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none"
      style={{
        zIndex: 0,
        backgroundImage: rings,
        maskImage: ringMask,
        WebkitMaskImage: ringMask,
      }}
    />

    {/* Edge light — left, centre at -25% so the bright peak stays
        well off-screen even after the drift translate. */}
    <div
      className="hero-edge-drift-left absolute inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        background:
          "radial-gradient(ellipse 80% 60% at -25% 55%, rgba(52,76,163,0.32) 0%, rgba(52,76,163,0.12) 35%, transparent 70%)",
      }}
    />

    {/* Edge light — right, mirror of left */}
    <div
      className="hero-edge-drift-right absolute inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        background:
          "radial-gradient(ellipse 75% 55% at 125% 60%, rgba(52,76,163,0.28) 0%, rgba(52,76,163,0.10) 35%, transparent 70%)",
      }}
    />

    {/* Optional signal pulses (off on pages where they'd compete with content) */}
    {signals && (
      <div
        className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 4 }}
      >
        <GridSignals />
      </div>
    )}
  </>
);
