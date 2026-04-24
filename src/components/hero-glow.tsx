import { GridSignals } from "@/components/grid-signals";

/**
 * HeroGlow - the decorative background used on the home hero.
 * Concentric rings + center glow + ambient blobs + grid signal pulses.
 * Drop it as the first child of a relative-positioned section to use on
 * any page top area.
 */

const ringMask =
  "linear-gradient(to bottom, transparent 0%, black 9%, black 50%, transparent 70%)";

const rings = [150, 300, 450, 600, 750, 900, 1050]
  .map(
    (r) =>
      `radial-gradient(circle at 50% 35%, transparent ${r - 1}px, rgba(52,76,163,0.11) ${r}px, transparent ${r + 1}px)`,
  )
  .join(", ");

export const HeroGlow = ({ signals = true }: { signals?: boolean } = {}) => (
  <>
    <div
      className="hidden sm:block absolute inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        background:
          "radial-gradient(ellipse 55% 40% at 50% 32%, rgba(52,76,163,0.22) 0%, rgba(52,76,163,0.08) 45%, transparent 70%)",
        maskImage: ringMask,
        WebkitMaskImage: ringMask,
      }}
    />
    <div
      className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none"
      style={{
        zIndex: 0,
        backgroundImage: rings,
        maskImage: ringMask,
        WebkitMaskImage: ringMask,
      }}
    />
    {signals && (
      <div
        className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 4 }}
      >
        <GridSignals />
      </div>
    )}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        background: `
          radial-gradient(ellipse 55% 40% at 15% 40%, rgba(52,76,163,0.07) 0%, transparent 70%),
          radial-gradient(ellipse 45% 35% at 85% 65%, rgba(52,76,163,0.05) 0%, transparent 70%),
          radial-gradient(ellipse 35% 25% at 60% 10%, rgba(13,148,136,0.04) 0%, transparent 65%)
        `,
      }}
    />
  </>
);
