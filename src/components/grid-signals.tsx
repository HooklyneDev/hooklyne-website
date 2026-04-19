"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const SPACING = 48;
const MIN_DIST = 96;
const MAX_CONCURRENT = 3;

type Pulse = {
  id: number;
  x: number;
  y: number;
  color: string;
  maxOpacity: number;
};

let globalId = 0;

export const GridSignals = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevPositions = useRef<{ x: number; y: number }[]>([]);
  const [pulses, setPulses] = useState<Pulse[]>([]);

  const fire = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();

    const cols = Math.floor(width / SPACING);
    const rows = Math.floor(height / SPACING);

    const candidates: { x: number; y: number }[] = [];
    for (let c = 0; c <= cols; c++) {
      for (let r = 0; r <= rows; r++) {
        const x = c * SPACING;
        const y = r * SPACING;
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

    // Track last few positions to spread signals around
    prevPositions.current = [...prevPositions.current.slice(-4), picked];

    const centerLeft = (width - 640) / 2;
    const centerRight = centerLeft + 640;
    const inCenter = picked.x >= centerLeft && picked.x <= centerRight;
    const useOrange = !inCenter && Math.random() > 0.45;

    const id = ++globalId;
    const pulse: Pulse = {
      id,
      x: picked.x,
      y: picked.y,
      color: useOrange ? "var(--hooklyne-orange)" : "var(--hooklyne-blue)",
      maxOpacity: inCenter ? 0.45 : 0.75,
    };

    setPulses((prev) => {
      const next = [...prev, pulse];
      // Cap concurrent pulses
      return next.length > MAX_CONCURRENT ? next.slice(next.length - MAX_CONCURRENT) : next;
    });

    // Remove this pulse after animation completes
    setTimeout(() => {
      setPulses((prev) => prev.filter((p) => p.id !== id));
    }, 1800);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const schedule = () => {
      // Fire every 1–2.2s for a lively but not overwhelming cadence
      const delay = 1000 + Math.random() * 1200;
      return setTimeout(() => {
        fire();
        timerRef.current = schedule();
      }, delay);
    };

    const timerRef = { current: setTimeout(() => { fire(); timerRef.current = schedule(); }, 600) };

    return () => clearTimeout(timerRef.current);
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
          backgroundImage: "radial-gradient(circle, rgba(52,76,163,0.22) 1.5px, transparent 1.5px)",
          backgroundSize: `${SPACING}px ${SPACING}px`,
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-56 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, var(--background))" }}
      />

      {/* Pulses */}
      {pulses.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: p.x - 4,
            top: p.y - 4,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: p.color,
            ["--mo" as string]: p.maxOpacity,
            animation: "gs-pulse 1.8s ease-out forwards",
          }}
        />
      ))}

      <style>{`
        @keyframes gs-pulse {
          0%   { transform: scale(0.6);  opacity: var(--mo, 0.75); }
          15%  { transform: scale(1);    opacity: var(--mo, 0.75); }
          100% { transform: scale(2.8);  opacity: 0; }
        }
      `}</style>
    </div>
  );
};
