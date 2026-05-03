"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const SPACING = 48;
const PULSE_DURATION = 3200;
const EDGE_PAD = 132;
const ZONE_PAD = 24;
// Label footprint (px): label is ~9px font, up to ~18 chars + 12px gap from dot.
const LABEL_REACH = 110;
const LABEL_HALF_H = 14;
const DOT_HALF = 14;

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

type Rect = { x1: number; y1: number; x2: number; y2: number };

type Pulse = {
 id: number;
 x: number;
 y: number;
 color: string;
 opacity: number;
 label: string;
 labelSide: "left" | "right";
 side: "left" | "right";
};

const MAX_CONCURRENT = 3;
const MAX_PER_SIDE = 2;
const SIDE_GAP = 32;

let globalId = 0;

const pulseRect = (x: number, y: number, side: "left" | "right"): Rect => {
 const x1 = side === "right" ? x - DOT_HALF : x - LABEL_REACH;
 const x2 = side === "right" ? x + LABEL_REACH : x + DOT_HALF;
 return { x1, y1: y - LABEL_HALF_H, x2, y2: y + LABEL_HALF_H };
};

const rectsOverlap = (a: Rect, b: Rect) =>
 a.x1 < b.x2 && a.x2 > b.x1 && a.y1 < b.y2 && a.y2 > b.y1;

export const GridSignals = () => {
 const containerRef = useRef<HTMLDivElement>(null);
 const activeRects = useRef<Map<number, Rect>>(new Map());
 const activeSides = useRef<Map<number, "left" | "right">>(new Map());
 const usedLabels = useRef<string[]>([]);
 const [pulses, setPulses] = useState<Pulse[]>([]);

 const getCandidate = useCallback(() => {
 const el = containerRef.current;
 if (!el) return null;

 // Need hero-content to anchor the tagline-flanking bands. If it's not
 // on this page, just skip spawning.
 const heroContent = document.getElementById("hero-content");
 if (!heroContent) return null;

 const rect = el.getBoundingClientRect();
 const { width } = rect;
 const hc = heroContent.getBoundingClientRect();

 // Vertical band: constrain y to roughly the tagline/text block height.
 const bandTop = hc.top - rect.top - 8;
 const bandBottom = hc.bottom - rect.top + 8;
 if (bandBottom <= bandTop + SPACING) return null;

 // Horizontal bands: left = [EDGE_PAD, hc.left - gap], right = [hc.right + gap, width - EDGE_PAD].
 const leftMin = EDGE_PAD;
 const leftMax = hc.left - rect.left - SIDE_GAP;
 const rightMin = hc.right - rect.left + SIDE_GAP;
 const rightMax = width - EDGE_PAD;

 // Per-side concurrent cap. If one side is full, only generate candidates for the other.
 const sides = Array.from(activeSides.current.values());
 const leftCount = sides.filter((s) => s === "left").length;
 const rightCount = sides.filter((s) => s === "right").length;
 const allowLeft = leftCount < MAX_PER_SIDE && leftMax - leftMin >= DOT_HALF * 2;
 const allowRight = rightCount < MAX_PER_SIDE && rightMax - rightMin >= DOT_HALF * 2;
 if (!allowLeft && !allowRight) return null;

 const minRow = Math.floor(bandTop / SPACING);
 const maxRow = Math.ceil(bandBottom / SPACING);
 const active = Array.from(activeRects.current.values());

 type Candidate = { x: number; y: number; labelSide: "left" | "right"; side: "left" | "right" };
 const candidates: Candidate[] = [];
 const dotFootprint = (x: number, y: number): Rect => ({
 x1: x - DOT_HALF, y1: y - DOT_HALF, x2: x + DOT_HALF, y2: y + DOT_HALF,
 });

 const pushBand = (xMin: number, xMax: number, side: "left" | "right") => {
 const cMin = Math.ceil(xMin / SPACING);
 const cMax = Math.floor(xMax / SPACING);
 // Labels on left-side dots point outward (left); right-side dots point outward (right).
 const labelSide: "left" | "right" = side;
 for (let c = cMin; c <= cMax; c++) {
 for (let r = minRow; r <= maxRow; r++) {
 const x = c * SPACING;
 const y = r * SPACING;
 if (y < bandTop || y > bandBottom) continue;
 const fp = dotFootprint(x, y);
 if (active.some((a) => rectsOverlap(fp, a))) continue;
 candidates.push({ x, y, labelSide, side });
 }
 }
 };

 if (allowLeft) pushBand(leftMin, leftMax, "left");
 if (allowRight) pushBand(rightMin, rightMax, "right");

 if (candidates.length === 0) return null;
 const picked = candidates[Math.floor(Math.random() * candidates.length)];

 const useOrange = Math.random() > 0.6;

 const available = SIGNAL_LABELS.filter((l) => !usedLabels.current.slice(-6).includes(l));
 const label = available[Math.floor(Math.random() * available.length)];
 usedLabels.current = [...usedLabels.current.slice(-10), label];

 return {
 x: picked.x,
 y: picked.y,
 color: useOrange ? "var(--hooklyne-orange)" : "var(--hooklyne-blue)",
 opacity: 0.5,
 label,
 labelSide: picked.labelSide,
 side: picked.side,
 };
 }, []);

 const spawnPulse = useCallback(() => {
 if (activeRects.current.size >= MAX_CONCURRENT) return null;
 const data = getCandidate();
 if (!data) return null;
 const id = ++globalId;
 activeRects.current.set(id, pulseRect(data.x, data.y, data.labelSide));
 activeSides.current.set(id, data.side);
 setPulses((prev) => [...prev, { id, ...data }]);
 setTimeout(() => {
 activeRects.current.delete(id);
 activeSides.current.delete(id);
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
