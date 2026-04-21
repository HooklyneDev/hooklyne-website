import { useEffect, useRef } from "react";

const GRID = 90;

type NodeType = "prospect" | "signal" | "tracker";

type SNode = {
 x: number;
 y: number;
 type: NodeType;
 breathePhase: number;
 nextPulse: number;
 interval: number;
 // optional gentle drift
 driftAmp: number;
 driftPhase: number;
 driftSpeed: number;
};

type Pulse = {
 x: number;
 y: number;
 r: number;
 maxR: number;
 alpha: number;
 rgb: [number, number, number];
};

type Link = {
 ax: number; ay: number;
 bx: number; by: number;
 alpha: number;
 dir: 1 | -1;
 rgb: [number, number, number];
};

type Zone = { x: number; y: number; w: number; h: number };

const LIGHT = {
 grid: "rgba(52, 76, 163, 0.07)",
 node: "rgba(52, 76, 163, 0.13)",
 prospect: [2, 47, 81] as [number, number, number],
 signal: [255, 140, 66] as [number, number, number],
 tracker: [13, 148, 136] as [number, number, number],
};

const DARK = {
 grid: "rgba(100, 140, 230, 0.09)",
 node: "rgba(100, 140, 230, 0.18)",
 prospect: [100, 150, 230] as [number, number, number],
 signal: [255, 170, 100] as [number, number, number],
 tracker: [45, 212, 191] as [number, number, number],
};

export const AnimatedGrid = () => {
 const canvasRef = useRef<HTMLCanvasElement>(null);

 useEffect(() => {
 const canvas = canvasRef.current;
 if (!canvas) return;
 const ctx = canvas.getContext("2d");
 if (!ctx) return;

 let width = 0, height = 0, cols = 0, rows = 0;
 let animId: number;
 let nodes: SNode[] = [];
 let pulses: Pulse[] = [];
 let links: Link[] = [];
 let deadZones: Zone[] = [];
 let frame = 0;

 const isDark = () => document.documentElement.classList.contains("dark");
 const theme = () => (isDark() ? DARK : LIGHT);

 const nodeRgb = (type: NodeType): [number, number, number] => {
 const t = theme();
 if (type === "signal") return t.signal;
 if (type === "tracker") return t.tracker;
 return t.prospect;
 };

 const computeDeadZones = () => {
 const cr = canvas.getBoundingClientRect();
 const zones: Zone[] = [];

 // Top - navbar + buffer
 zones.push({ x: 0, y: 0, w: width, h: GRID * 1.2 });

 // Left + right edges
 zones.push({ x: 0, y: 0, w: GRID * 0.5, h: height });
 zones.push({ x: width - GRID * 0.5, y: 0, w: GRID * 0.5, h: height });

 // Hero text - generous breathing room (no nodes touching the text)
 const hero = document.getElementById("hero-content");
 if (hero) {
 const r = hero.getBoundingClientRect();
 const padX = 80;
 const padY = 60;
 zones.push({
 x: r.left - cr.left - padX,
 y: r.top - cr.top - padY,
 w: r.width + padX * 2,
 h: r.height + padY * 2,
 });
 }

 // Everything from video top downward
 const video = document.getElementById("hero-video");
 if (video) {
 const r = video.getBoundingClientRect();
 const top = r.top - cr.top - 32;
 zones.push({ x: 0, y: top, w: width, h: height - top });
 }

 deadZones = zones;
 };

 const inZone = (x: number, y: number) =>
 deadZones.some((z) => x >= z.x && x <= z.x + z.w && y >= z.y && y <= z.y + z.h);

 const resize = () => {
 width = canvas.offsetWidth;
 height = canvas.offsetHeight;
 canvas.width = width * window.devicePixelRatio;
 canvas.height = height * window.devicePixelRatio;
 ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
 cols = Math.floor(width / GRID) + 1;
 rows = Math.floor(height / GRID) + 1;
 computeDeadZones();
 };

 const initNodes = () => {
 const candidates: [number, number][] = [];
 for (let c = 0; c <= cols; c++) {
 for (let r = 0; r <= rows; r++) {
 const x = c * GRID, y = r * GRID;
 if (!inZone(x, y)) candidates.push([x, y]);
 }
 }

 // Shuffle
 for (let i = candidates.length - 1; i > 0; i--) {
 const j = Math.floor(Math.random() * (i + 1));
 [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
 }

 // Pick evenly from sectors so coverage is balanced
 const target = Math.min(candidates.length, 14);
 const step = Math.max(1, Math.floor(candidates.length / target));

 nodes = [];
 for (let i = 0; i < candidates.length && nodes.length < target; i += step) {
 const [x, y] = candidates[i];
 const rand = Math.random();
 const type: NodeType = rand < 0.12 ? "signal" : rand < 0.25 ? "tracker" : "prospect";
 const interval = type === "signal"
 ? 240 + Math.floor(Math.random() * 120) // ~4–6s at 60fps
 : type === "tracker"
 ? 360 + Math.floor(Math.random() * 180) // ~6–9s
 : 480 + Math.floor(Math.random() * 240); // ~8–12s

 // ~25% of nodes drift gently (signal + some trackers)
 const drifts = type === "signal" || (type === "tracker" && Math.random() < 0.5);
 nodes.push({
 x, y, type,
 breathePhase: Math.random() * Math.PI * 2,
 nextPulse: Math.floor(Math.random() * interval),
 interval,
 driftAmp: drifts ? 10 + Math.random() * 14 : 0,
 driftPhase: Math.random() * Math.PI * 2,
 driftSpeed: 0.006 + Math.random() * 0.006,
 });
 }
 };

 const nodeXY = (n: SNode) => ({
 x: n.x + Math.sin(frame * n.driftSpeed + n.driftPhase) * n.driftAmp,
 y: n.y + Math.cos(frame * n.driftSpeed * 0.7 + n.driftPhase) * n.driftAmp * 0.6,
 });

 const firePulse = (node: SNode) => {
 const rgb = nodeRgb(node.type);
 const { x, y } = nodeXY(node);
 const maxR = node.type === "signal"
 ? GRID * 2.4
 : node.type === "tracker"
 ? GRID * 2.0
 : GRID * 1.6;
 pulses.push({ x, y, r: 2, maxR, alpha: node.type === "signal" ? 0.52 : 0.36, rgb });
 };

 // When a pulse from nodeA expands to reach nodeB, briefly connect them
 const checkPulseConnections = () => {
 pulses.forEach((p) => {
 nodes.forEach((n) => {
 const { x: nx, y: ny } = nodeXY(n);
 if (Math.abs(nx - p.x) < 2 && Math.abs(ny - p.y) < 2) return; // same node
 const dist = Math.sqrt((nx - p.x) ** 2 + (ny - p.y) ** 2);
 // Trigger when pulse ring radius crosses the distance to this node
 if (Math.abs(p.r - dist) < 6 && dist < p.maxR) {
 const alreadyLinked = links.some(
 (l) => Math.abs(l.ax - p.x) < 2 && Math.abs(l.bx - nx) < 2
 );
 if (!alreadyLinked && Math.random() < 0.18) {
 links.push({
 ax: p.x, ay: p.y,
 bx: nx, by: ny,
 alpha: 0,
 dir: 1,
 rgb: p.rgb,
 });
 }
 }
 });
 });
 };

 const drawGrid = () => {
 const t = theme();
 ctx.strokeStyle = t.grid;
 ctx.lineWidth = 0.5;
 for (let c = 0; c <= cols; c++) {
 ctx.beginPath(); ctx.moveTo(c * GRID, 0); ctx.lineTo(c * GRID, height); ctx.stroke();
 }
 for (let r = 0; r <= rows; r++) {
 ctx.beginPath(); ctx.moveTo(0, r * GRID); ctx.lineTo(width, r * GRID); ctx.stroke();
 }
 };

 const drawIntersections = () => {
 const t = theme();
 for (let c = 0; c <= cols; c++) {
 for (let r = 0; r <= rows; r++) {
 ctx.beginPath();
 ctx.arc(c * GRID, r * GRID, 1.5, 0, Math.PI * 2);
 ctx.fillStyle = t.node;
 ctx.fill();
 }
 }
 };

 const drawLinks = () => {
 links.forEach((l) => {
 ctx.beginPath();
 ctx.moveTo(l.ax, l.ay);
 ctx.lineTo(l.bx, l.by);
 ctx.strokeStyle = `rgba(${l.rgb[0]}, ${l.rgb[1]}, ${l.rgb[2]}, ${l.alpha})`;
 ctx.lineWidth = 1;
 ctx.stroke();
 });
 };

 const drawPulses = () => {
 pulses.forEach((p) => {
 const progress = p.r / p.maxR;
 ctx.beginPath();
 ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
 ctx.strokeStyle = `rgba(${p.rgb[0]}, ${p.rgb[1]}, ${p.rgb[2]}, ${p.alpha * (1 - progress)})`;
 ctx.lineWidth = 1;
 ctx.stroke();
 });
 };

 const drawNodes = () => {
 nodes.forEach((n) => {
 const { x, y } = nodeXY(n);
 const rgb = nodeRgb(n.type);
 const breathe = 1 + Math.sin(frame * 0.016 + n.breathePhase) * 0.12;
 const opacity = (n.type === "signal" ? 0.82 : n.type === "tracker" ? 0.65 : 0.45) * breathe;
 const r = n.type === "signal" ? 3.5 : n.type === "tracker" ? 3 : 2.5;

 // Glow
 ctx.beginPath();
 ctx.arc(x, y, r * 3.5, 0, Math.PI * 2);
 ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity * 0.07})`;
 ctx.fill();

 // Core dot
 ctx.beginPath();
 ctx.arc(x, y, r, 0, Math.PI * 2);
 ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
 ctx.fill();
 });
 };

 const drawBottomFade = () => {
 const cr = canvas.getBoundingClientRect();
 const video = document.getElementById("hero-video");
 let fadeY = height * 0.52;
 if (video) {
 const r = video.getBoundingClientRect();
 fadeY = Math.min(r.top - cr.top - 40, height * 0.58);
 }
 const bg = isDark() ? "13, 20, 32" : "241, 245, 249";
 const grad = ctx.createLinearGradient(0, fadeY, 0, fadeY + 64);
 grad.addColorStop(0, `rgba(${bg}, 0)`);
 grad.addColorStop(1, `rgba(${bg}, 1)`);
 ctx.fillStyle = grad;
 ctx.fillRect(0, fadeY, width, height - fadeY);
 };

 const update = () => {
 frame++;

 // Tick pulses
 pulses = pulses
 .map((p) => ({ ...p, r: p.r + 1.2 }))
 .filter((p) => p.r < p.maxR);

 // Tick links
 links = links
 .map((l) => {
 const next = l.alpha + l.dir * 0.025;
 if (l.dir === 1 && next >= 0.28) return { ...l, alpha: 0.28, dir: -1 as -1 };
 if (l.dir === -1 && next <= 0) return null;
 return { ...l, alpha: next };
 })
 .filter(Boolean) as Link[];

 // Fire node pulses
 nodes.forEach((n) => {
 n.nextPulse--;
 if (n.nextPulse <= 0) {
 firePulse(n);
 n.nextPulse = n.interval + Math.floor(Math.random() * 60);
 }
 });

 checkPulseConnections();
 };

 const tick = () => {
 ctx.clearRect(0, 0, width, height);
 drawGrid();
 drawIntersections();
 drawLinks();
 drawPulses();
 drawNodes();
 drawBottomFade();
 update();
 animId = requestAnimationFrame(tick);
 };

 requestAnimationFrame(() => {
 resize();
 initNodes();
 tick();
 });

 const ro = new ResizeObserver(() => { resize(); initNodes(); });
 ro.observe(canvas);

 const mo = new MutationObserver(() => {});
 mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

 return () => {
 cancelAnimationFrame(animId);
 ro.disconnect();
 mo.disconnect();
 };
 }, []);

 return (
 <canvas
 ref={canvasRef}
 className="absolute inset-0 w-full h-full pointer-events-none"
 />
 );
};
