"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const SPACING = 48;
const MIN_DIST = 80;
const PULSE_DURATION = 3200;
const EDGE_PAD = SPACING;
const ZONE_PAD = 60;

const SIGNAL_LABELS = [
 // Funding
 "Series A raised",
 "Series B closed",
 "Seed round",
 "Bridge round",
 "Revenue milestone",
 // Leadership & hiring
 "New VP Sales",
 "CMO appointed",
 "New CFO",
 "CTO change",
 "CEO transition",
 "Head of Growth hired",
 "Sales team doubled",
 "Hiring spree",
 "Headcount +25%",
 // Company events
 "Office opened",
 "New market entry",
 "EU expansion",
 "International launch",
 "Rebranding",
 "Website relaunch",
 // Product
 "Product launch",
 "Feature release",
 "Platform update",
 // Press & recognition
 "Press mention",
 "Award won",
 "Conference keynote",
 "Case study published",
 // Business signals
 "Partnership signed",
 "New customer win",
 "Strategic pivot",
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

 const getCandidate = useCallback(() => {
 const el = containerRef.current;
 if (!el) return null;

 const rect = el.getBoundingClientRect();
 const { width, height } = rect;
 const vh = window.innerHeight;

 const visibleTop = Math.max(0, -rect.top);
 const visibleBottom = Math.min(height, vh - rect.top);
 if (visibleBottom <= visibleTop + SPACING) return null;

 // Dead zones in container-local coords
 type Zone = { x: number; y: number; w: number; h: number };
 const dead: Zone[] = [];

 // Left + right edges
 dead.push({ x: 0, y: 0, w: EDGE_PAD, h: height });
 dead.push({ x: width - EDGE_PAD, y: 0, w: EDGE_PAD, h: height });

 // Navbar + top fade strip
 dead.push({ x: 0, y: visibleTop, w: width, h: 110 });

 // Hero content text block
 const heroContent = document.getElementById("hero-content");
 if (heroContent) {
 const r = heroContent.getBoundingClientRect();
 dead.push({
 x: r.left - rect.left - ZONE_PAD,
 y: r.top - rect.top - ZONE_PAD,
 w: r.width + ZONE_PAD * 2,
 h: r.height + ZONE_PAD * 2,
 });
 }

 // Hero video - block its own footprint AND everything full-width below the midpoint
 const heroVideo = document.getElementById("hero-video");
 if (heroVideo) {
 const r = heroVideo.getBoundingClientRect();
 // Element dead zone (with padding)
 dead.push({
 x: r.left - rect.left - ZONE_PAD,
 y: r.top - rect.top - ZONE_PAD,
 w: r.width + ZONE_PAD * 2,
 h: r.height + ZONE_PAD * 2,
 });
 // Full-width cutoff from video midpoint downward - pulses never appear below here
 const videoMidY = r.top - rect.top + r.height * 0.5;
 dead.push({ x: 0, y: videoMidY, w: width, h: height });
 }

 const inDead = (x: number, y: number) =>
 dead.some((z) => x >= z.x && x <= z.x + z.w && y >= z.y && y <= z.y + z.h);

 const cols = Math.floor(width / SPACING);
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
 prevPositions.current = [...prevPositions.current.slice(-4), picked];

 const centerLeft = (width - 640) / 2;
 const centerRight = centerLeft + 640;
 const inCenter = picked.x >= centerLeft && picked.x <= centerRight;
 const useOrange = !inCenter && Math.random() > 0.5;

 const available = SIGNAL_LABELS.filter((l) => !usedLabels.current.slice(-6).includes(l));
 const label = available[Math.floor(Math.random() * available.length)];
 usedLabels.current = [...usedLabels.current.slice(-10), label];

 const labelSide: "left" | "right" = picked.x > width * 0.55 ? "left" : "right";

 return {
 x: picked.x,
 y: picked.y,
 color: useOrange ? "var(--hooklyne-orange)" : "var(--hooklyne-blue)",
 opacity: inCenter ? 0.22 : 0.5,
 label,
 labelSide,
 };
 }, []);

 const spawnPulse = useCallback(() => {
 const data = getCandidate();
 if (!data) return null;
 const id = ++globalId;
 setPulses((prev) => [...prev, { id, ...data }]);
 setTimeout(() => {
 setPulses((prev) => prev.filter((p) => p.id !== id));
 }, PULSE_DURATION);
 return id;
 }, [getCandidate]);

 useEffect(() => {
 if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

 const timers: ReturnType<typeof setTimeout>[] = [];

 const loop = (minDelay: number, maxDelay: number, initialDelay: number) => {
 const run = () => {
 spawnPulse();
 const next = minDelay + Math.random() * (maxDelay - minDelay);
 timers.push(setTimeout(run, next));
 };
 timers.push(setTimeout(run, initialDelay));
 };

 loop(2200, 3500, 300); // Loop A
 loop(3000, 4500, 1600); // Loop B
 loop(2500, 4000, 3000); // Loop C

 return () => timers.forEach(clearTimeout);
 }, [spawnPulse]);

 return (
 <div
 ref={containerRef}
 className="absolute inset-0 overflow-hidden pointer-events-none"
 style={{ zIndex: 1 }}
 >
 {/* Pulses only - rings are a static div in hero.tsx to avoid hydration double-render */}
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
 {/* Center dot */}
 <div style={{
 position: "absolute",
 width: 5,
 height: 5,
 borderRadius: "50%",
 background: p.color,
 transform: "translate(-50%, -50%)",
 animation: `gs-dot ${PULSE_DURATION}ms ease-out forwards`,
 }} />

 {/* Expanding ring - large base so border stays 1px hairline throughout */}
 <div style={{
 position: "absolute",
 width: 500,
 height: 500,
 borderRadius: "50%",
 border: `1px solid ${p.color}`,
 transform: "translate(-50%, -50%) scale(0.01)",
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
 0% { opacity: 0; transform: translate(-50%,-50%) scale(0.5); }
 8% { opacity: var(--op,0.5); transform: translate(-50%,-50%) scale(1); }
 70% { opacity: var(--op,0.5); }
 100% { opacity: 0; }
 }
 @keyframes gs-ring {
 0% { transform: translate(-50%,-50%) scale(0.01); opacity: var(--op,0.5); }
 100% { transform: translate(-50%,-50%) scale(1); opacity: 0; }
 }
 @keyframes gs-label {
 0% { opacity: 0; }
 12% { opacity: calc(var(--op,0.5) * 0.65); }
 65% { opacity: calc(var(--op,0.5) * 0.65); }
 100% { opacity: 0; }
 }
 `}</style>
 </div>
 );
};
