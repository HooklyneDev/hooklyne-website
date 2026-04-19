"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const SPACING = 48;
const MIN_DIST = 120;
const PULSE_DURATION = 3200;
const EDGE_PAD = SPACING;
const ZONE_PAD = 60;

// Clip the container height to the video's midpoint so pulses are always visible
function useVideoMidpointClip(containerRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const clip = () => {
      const el = containerRef.current;
      const video = document.getElementById("hero-video");
      if (!el || !video) return;
      const clipH = video.offsetTop + video.offsetHeight * 0.52;
      el.style.height = `${Math.max(300, clipH)}px`;
    };
    clip();
    window.addEventListener("resize", clip);
    return () => window.removeEventListener("resize", clip);
  }, [containerRef]);
}

const SIGNAL_LABELS = [
  "Funding round",
  "New hire",
  "Press mention",
  "Series A",
  "Expansion",
  "Leadership change",
  "Product launch",
  "Job posting",
  "Partnership",
  "Office opening",
];

type Pulse = {
  id: number;
  x: number;
  y: number;
  color: string;
  opacity: number;
  label: string;
  labelSide: "left" | "right";
};

let globalId = 0;

export const GridSignals = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useVideoMidpointClip(containerRef);
  const prevPositions = useRef<{ x: number; y: number }[]>([]);
  const usedLabels = useRef<string[]>([]);
  const [pulses, setPulses] = useState<Pulse[]>([]);

  const getCandidate = useCallback(() => {
    const el = containerRef.current;
    if (!el) return null;

    const rect = el.getBoundingClientRect();
    const { width, height } = rect;
    const vh = window.innerHeight;

    const visibleTop    = Math.max(0, -rect.top);
    const visibleBottom = Math.min(height, vh - rect.top);
    if (visibleBottom <= visibleTop + SPACING) return null;

    // Dead zones in container-local coords
    type Zone = { x: number; y: number; w: number; h: number };
    const dead: Zone[] = [];

    // Left + right edges
    dead.push({ x: 0,           y: 0, w: EDGE_PAD, h: height });
    dead.push({ x: width - EDGE_PAD, y: 0, w: EDGE_PAD, h: height });

    // Navbar strip (top of visible area)
    dead.push({ x: 0, y: visibleTop, w: width, h: 96 });

    // Hero content text block
    const heroContent = document.getElementById("hero-content");
    if (heroContent) {
      const r = heroContent.getBoundingClientRect();
      dead.push({
        x: r.left - rect.left - ZONE_PAD,
        y: r.top  - rect.top  - ZONE_PAD,
        w: r.width  + ZONE_PAD * 2,
        h: r.height + ZONE_PAD * 2,
      });
    }

    // Hero video
    const heroVideo = document.getElementById("hero-video");
    if (heroVideo) {
      const r = heroVideo.getBoundingClientRect();
      dead.push({
        x: r.left - rect.left - ZONE_PAD,
        y: r.top  - rect.top  - ZONE_PAD,
        w: r.width  + ZONE_PAD * 2,
        h: r.height + ZONE_PAD * 2,
      });
    }

    const inDead = (x: number, y: number) =>
      dead.some((z) => x >= z.x && x <= z.x + z.w && y >= z.y && y <= z.y + z.h);

    const cols   = Math.floor(width / SPACING);
    const minRow = Math.floor(visibleTop / SPACING);
    const maxRow = Math.ceil(visibleBottom / SPACING);

    const candidates: { x: number; y: number }[] = [];
    for (let c = 0; c <= cols; c++) {
      for (let r = minRow; r <= maxRow; r++) {
        const x = c * SPACING;
        const y = r * SPACING;
        if (y < visibleTop || y > visibleBottom) continue;
        if (inDead(x, y)) continue;
        const tooClose = prevPositions.current.some((p) => {
          const dx = x - p.x;
          const dy = y - p.y;
          return Math.sqrt(dx * dx + dy * dy) < MIN_DIST;
        });
        if (tooClose) continue;
        candidates.push({ x, y });
      }
    }

    if (candidates.length === 0) return null;
    const picked = candidates[Math.floor(Math.random() * candidates.length)];
    prevPositions.current = [...prevPositions.current.slice(-6), picked];

    const centerLeft  = (width - 640) / 2;
    const centerRight = centerLeft + 640;
    const inCenter    = picked.x >= centerLeft && picked.x <= centerRight;
    const useOrange   = !inCenter && Math.random() > 0.5;

    const available = SIGNAL_LABELS.filter((l) => !usedLabels.current.slice(-4).includes(l));
    const label = available[Math.floor(Math.random() * available.length)];
    usedLabels.current = [...usedLabels.current.slice(-8), label];

    // Label on the side with more room, but never outside container
    const labelSide: "left" | "right" = picked.x > width * 0.55 ? "left" : "right";

    return {
      x: picked.x,
      y: picked.y,
      color:     useOrange ? "var(--hooklyne-orange)" : "var(--hooklyne-blue)",
      opacity:   inCenter ? 0.22 : 0.5,
      label,
      labelSide,
    };
  }, []);

  const spawnPulse = useCallback(() => {
    const data = getCandidate();
    if (!data) return null;
    const id = ++globalId;
    const pulse: Pulse = { id, ...data };
    setPulses((prev) => [...prev, pulse]);
    setTimeout(() => {
      setPulses((prev) => prev.filter((p) => p.id !== id));
    }, PULSE_DURATION);
    return id;
  }, [getCandidate]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Two independent loops — staggered so they're never in sync
    // Loop A fires every 3.5-5s, Loop B fires every 4-6s with a head-start offset
    const timers: ReturnType<typeof setTimeout>[] = [];

    const loop = (minDelay: number, maxDelay: number, initialDelay: number) => {
      const run = () => {
        spawnPulse();
        const next = minDelay + Math.random() * (maxDelay - minDelay);
        timers.push(setTimeout(run, next));
      };
      timers.push(setTimeout(run, initialDelay));
    };

    loop(2200, 3500, 300);           // Loop A — fast, starts almost immediately
    loop(3000, 4500, 1600);         // Loop B — offset
    loop(2500, 4000, 3000);         // Loop C — second offset, ensures always 2-3 visible

    return () => timers.forEach(clearTimeout);
  }, [spawnPulse]);

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 right-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Concentric ring grid — sonar/ripple pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "repeating-radial-gradient(circle at 50% 38%, transparent 0px, transparent 58px, rgba(52,76,163,0.09) 59px, rgba(52,76,163,0.09) 60px)",
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, var(--background))" }}
      />

      {/* Pulses */}
      {pulses.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            transform: "translate(-50%, -50%)",
            ["--op" as string]: p.opacity,
          }}
        >
          {/* Core dot */}
          <div style={{
            position: "absolute",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: p.color,
            transform: "translate(-50%, -50%)",
            animation: `gs-dot ${PULSE_DURATION}ms ease-out forwards`,
          }} />

          {/* Expanding ring */}
          <div style={{
            position: "absolute",
            width: 6,
            height: 6,
            borderRadius: "50%",
            border: `1px solid ${p.color}`,
            transform: "translate(-50%, -50%)",
            animation: `gs-ring ${PULSE_DURATION}ms ease-out forwards`,
          }} />

          {/* Signal label */}
          <div style={{
            position: "absolute",
            top: "50%",
            ...(p.labelSide === "right" ? { left: "12px" } : { right: "12px" }),
            transform: "translateY(-50%)",
            whiteSpace: "nowrap",
            fontSize: "9px",
            fontWeight: 600,
            letterSpacing: "0.05em",
            color: p.color,
            opacity: 0,
            animation: `gs-label ${PULSE_DURATION}ms ease-out forwards`,
            fontFamily: "var(--font-dm-sans, sans-serif)",
          }}>
            {p.label}
          </div>
        </div>
      ))}

      <style>{`
        @keyframes gs-dot {
          0%   { opacity: 0;                transform: translate(-50%,-50%) scale(0.5); }
          8%   { opacity: var(--op,0.5);    transform: translate(-50%,-50%) scale(1.15); }
          25%  { opacity: var(--op,0.5);    transform: translate(-50%,-50%) scale(1); }
          80%  { opacity: calc(var(--op,0.5) * 0.25); }
          100% { opacity: 0; }
        }
        @keyframes gs-ring {
          0%   { transform: translate(-50%,-50%) scale(1);  opacity: var(--op,0.5); }
          100% { transform: translate(-50%,-50%) scale(10); opacity: 0; }
        }
        @keyframes gs-label {
          0%   { opacity: 0; }
          12%  { opacity: calc(var(--op,0.5) * 0.65); }
          65%  { opacity: calc(var(--op,0.5) * 0.65); }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};
