"use client";
import { useEffect, useRef, useState } from "react";

const SPACING = 48;
const MIN_DIST = 80;

type Pulse = { x: number; y: number; color: string; maxOpacity: number; id: number };

export const GridSignals = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevPos = useRef<{ x: number; y: number } | null>(null);
  const idRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [pulse, setPulse] = useState<Pulse | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fire = () => {
      const el = containerRef.current;
      if (!el) return;
      const { width, height } = el.getBoundingClientRect();

      const cols = Math.floor(width / SPACING);
      const rows = Math.floor(height / SPACING);

      // Build candidates, exclude previous position within MIN_DIST
      const candidates: { x: number; y: number }[] = [];
      for (let c = 0; c <= cols; c++) {
        for (let r = 0; r <= rows; r++) {
          const x = c * SPACING;
          const y = r * SPACING;
          if (prevPos.current) {
            const dx = x - prevPos.current.x;
            const dy = y - prevPos.current.y;
            if (Math.sqrt(dx * dx + dy * dy) < MIN_DIST) continue;
          }
          candidates.push({ x, y });
        }
      }

      if (candidates.length === 0) return;
      const picked = candidates[Math.floor(Math.random() * candidates.length)];
      prevPos.current = picked;

      // Center 640px column → blue only, capped at 0.5 opacity
      const centerLeft = (width - 640) / 2;
      const centerRight = centerLeft + 640;
      const inCenter = picked.x >= centerLeft && picked.x <= centerRight;
      const useOrange = !inCenter && Math.random() > 0.5;

      idRef.current += 1;
      setPulse({
        x: picked.x,
        y: picked.y,
        color: useOrange ? "var(--hooklyne-orange)" : "var(--hooklyne-blue)",
        maxOpacity: inCenter ? 0.5 : 0.7,
        id: idRef.current,
      });
    };

    const schedule = () => {
      const delay = 3000 + Math.random() * 1000;
      timerRef.current = setTimeout(() => {
        fire();
        schedule();
      }, delay);
    };

    // Small initial delay so layout is settled
    timerRef.current = setTimeout(() => {
      fire();
      schedule();
    }, 800);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Static dot grid via CSS */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(52,76,163,0.18) 1.2px, transparent 1.2px)",
          backgroundSize: `${SPACING}px ${SPACING}px`,
        }}
      />

      {/* Bottom fade so grid dissolves cleanly */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--background))",
        }}
      />

      {/* Active pulse */}
      {pulse && (
        <div
          key={pulse.id}
          style={{
            position: "absolute",
            left: pulse.x - 3,
            top: pulse.y - 3,
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: pulse.color,
            animation: "grid-signal-pulse 1s ease-out forwards",
            // CSS custom prop passed as inline for opacity cap
            ["--pulse-opacity" as string]: pulse.maxOpacity,
          }}
        />
      )}

      <style>{`
        @keyframes grid-signal-pulse {
          0%   { transform: scale(0.8); opacity: var(--pulse-opacity, 0.7); }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
