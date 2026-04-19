"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const SPACING = 48;
const MIN_DIST = 120;
const MAX_CONCURRENT = 2;
const PULSE_DURATION = 2800;

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
  const prevPositions = useRef<{ x: number; y: number }[]>([]);
  const usedLabels = useRef<string[]>([]);
  const [pulses, setPulses] = useState<Pulse[]>([]);

  const fire = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const { width, height } = rect;
    const vh = window.innerHeight;

    const visibleTop    = Math.max(0, -rect.top);
    const visibleBottom = Math.min(height, vh - rect.top);
    if (visibleBottom <= visibleTop) return;

    const cols   = Math.floor(width / SPACING);
    const minRow = Math.floor(visibleTop / SPACING);
    const maxRow = Math.ceil(visibleBottom / SPACING);

    const candidates: { x: number; y: number }[] = [];
    for (let c = 0; c <= cols; c++) {
      for (let r = minRow; r <= maxRow; r++) {
        const x = c * SPACING;
        const y = r * SPACING;
        if (y < visibleTop || y > visibleBottom) continue;

        const tooClose = prevPositions.current.some((p) => {
          const dx = x - p.x;
          const dy = y - p.y;
          return Math.sqrt(dx * dx + dy * dy) < MIN_DIST;
        });
        if (tooClose) continue;
        candidates.push({ x, y });
      }
    }

    if (candidates.length === 0) return;
    const picked = candidates[Math.floor(Math.random() * candidates.length)];
    prevPositions.current = [...prevPositions.current.slice(-5), picked];

    const centerLeft  = (width - 640) / 2;
    const centerRight = centerLeft + 640;
    const inCenter    = picked.x >= centerLeft && picked.x <= centerRight;
    const useOrange   = !inCenter && Math.random() > 0.5;

    // Pick a label not recently used
    const available = SIGNAL_LABELS.filter((l) => !usedLabels.current.slice(-3).includes(l));
    const label = available[Math.floor(Math.random() * available.length)];
    usedLabels.current = [...usedLabels.current.slice(-6), label];

    // Show label on whichever side has more space
    const labelSide: "left" | "right" = picked.x > width / 2 ? "left" : "right";

    const id = ++globalId;
    setPulses((prev) => {
      const next = [...prev, {
        id,
        x: picked.x,
        y: picked.y,
        color:     useOrange ? "var(--hooklyne-orange)" : "var(--hooklyne-blue)",
        opacity:   inCenter ? 0.25 : 0.55,
        label,
        labelSide,
      }];
      return next.length > MAX_CONCURRENT ? next.slice(-MAX_CONCURRENT) : next;
    });

    setTimeout(() => {
      setPulses((prev) => prev.filter((p) => p.id !== id));
    }, PULSE_DURATION);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      // Calm cadence — one every 2-3.5s
      timer = setTimeout(() => { fire(); schedule(); }, 2000 + Math.random() * 1500);
    };
    timer = setTimeout(() => { fire(); schedule(); }, 800);
    return () => clearTimeout(timer);
  }, [fire]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Static dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(52,76,163,0.18) 1.5px, transparent 1.5px)",
          backgroundSize: `${SPACING}px ${SPACING}px`,
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
            ...(p.labelSide === "right"
              ? { left: "14px" }
              : { right: "14px" }),
            transform: "translateY(-50%)",
            whiteSpace: "nowrap",
            fontSize: "9px",
            fontWeight: 600,
            letterSpacing: "0.04em",
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
          0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
          8%   { opacity: var(--op, 0.55); transform: translate(-50%, -50%) scale(1.1); }
          30%  { opacity: var(--op, 0.55); transform: translate(-50%, -50%) scale(1); }
          85%  { opacity: calc(var(--op, 0.55) * 0.3); }
          100% { opacity: 0; }
        }
        @keyframes gs-ring {
          0%   { transform: translate(-50%, -50%) scale(1); opacity: var(--op, 0.55); }
          100% { transform: translate(-50%, -50%) scale(10); opacity: 0; }
        }
        @keyframes gs-label {
          0%   { opacity: 0; }
          12%  { opacity: calc(var(--op, 0.55) * 0.7); }
          60%  { opacity: calc(var(--op, 0.55) * 0.7); }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};
