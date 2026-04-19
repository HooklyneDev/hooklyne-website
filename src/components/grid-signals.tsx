"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const SPACING = 48;
const MIN_DIST = 96;
const MAX_CONCURRENT = 3;
const PULSE_DURATION = 2200;

type Pulse = {
  id: number;
  x: number;
  y: number;
  color: string;
  opacity: number;
};

let globalId = 0;

export const GridSignals = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevPositions = useRef<{ x: number; y: number }[]>([]);
  const [pulses, setPulses] = useState<Pulse[]>([]);

  const fire = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const { width, height } = rect;
    const vh = window.innerHeight;

    // Only fire in the portion of the hero that's actually on screen
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
    const useOrange   = !inCenter && Math.random() > 0.45;

    const id = ++globalId;
    setPulses((prev) => {
      const next = [...prev, {
        id,
        x: picked.x,
        y: picked.y,
        color:   useOrange ? "var(--hooklyne-orange)" : "var(--hooklyne-blue)",
        opacity: inCenter ? 0.4 : 0.8,
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
      timer = setTimeout(() => { fire(); schedule(); }, 900 + Math.random() * 1100);
    };
    timer = setTimeout(() => { fire(); schedule(); }, 400);
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
          backgroundImage: "radial-gradient(circle, rgba(52,76,163,0.25) 1.5px, transparent 1.5px)",
          backgroundSize: `${SPACING}px ${SPACING}px`,
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, var(--background))" }}
      />

      {/* Sonar pulses */}
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
          {/* Core dot — holds visible, then fades */}
          <div
            style={{
              position: "absolute",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: p.color,
              transform: "translate(-50%, -50%)",
              animation: `gs-dot ${PULSE_DURATION}ms ease-out forwards`,
            }}
          />
          {/* Expanding ring — sonar ping */}
          <div
            style={{
              position: "absolute",
              width: 6,
              height: 6,
              borderRadius: "50%",
              border: `1.5px solid ${p.color}`,
              transform: "translate(-50%, -50%)",
              animation: `gs-ring ${PULSE_DURATION}ms ease-out forwards`,
            }}
          />
          {/* Second ring — slightly delayed for double-ping effect */}
          <div
            style={{
              position: "absolute",
              width: 6,
              height: 6,
              borderRadius: "50%",
              border: `1px solid ${p.color}`,
              transform: "translate(-50%, -50%)",
              animation: `gs-ring ${PULSE_DURATION}ms ease-out ${PULSE_DURATION * 0.28}ms forwards`,
              opacity: 0,
            }}
          />
        </div>
      ))}

      <style>{`
        @keyframes gs-dot {
          0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
          8%   { opacity: var(--op, 0.8); transform: translate(-50%, -50%) scale(1.2); }
          20%  { opacity: var(--op, 0.8); transform: translate(-50%, -50%) scale(1); }
          80%  { opacity: calc(var(--op, 0.8) * 0.4); }
          100% { opacity: 0; }
        }
        @keyframes gs-ring {
          0%   { transform: translate(-50%, -50%) scale(1);  opacity: var(--op, 0.8); }
          100% { transform: translate(-50%, -50%) scale(12); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
