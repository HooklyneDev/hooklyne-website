import { useEffect, useRef } from "react";

type Direction = "up" | "down" | "left" | "right";
type DotType = "navy" | "signal" | "tracker";

type Dot = {
  col: number;
  row: number;
  targetCol: number;
  targetRow: number;
  progress: number;
  speed: number;
  direction: Direction;
  pauseFrames: number;
  opacity: number;
  targetOpacity: number;
  breathePhase: number;
  type: DotType;
};

type PulseRing = {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  rgb: [number, number, number];
};

type Zone = { x: number; y: number; w: number; h: number };

const DIRS: Direction[] = ["up", "down", "left", "right"];

const HEAT: [number, number, number][] = [
  [255, 140, 66],
  [52,  76,  163],
  [13,  148, 136],
];
const HEAT_DARK: [number, number, number][] = [
  [255, 170, 100],
  [100, 140, 230],
  [45,  212, 191],
];

const LIGHT = {
  grid:    "rgba(52, 76, 163, 0.07)",
  node:    "rgba(52, 76, 163, 0.12)",
  navy:    [2,   47,  81]  as [number, number, number],
  signal:  [255, 140, 66]  as [number, number, number],
  tracker: [13,  148, 136] as [number, number, number],
};

const DARK = {
  grid:    "rgba(100, 140, 230, 0.09)",
  node:    "rgba(100, 140, 230, 0.18)",
  navy:    [120, 160, 255] as [number, number, number],
  signal:  [255, 170, 100] as [number, number, number],
  tracker: [45,  212, 191] as [number, number, number],
};

// Ease-in-out cubic — makes movement feel smooth and premium
const ease = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const nextPos = (
  dir: Direction,
  col: number,
  row: number,
  cols: number,
  rows: number,
  gridSize: number,
  deadZones: Zone[],
) => {
  const moves: Record<Direction, [number, number]> = {
    up:    [col, row - 1],
    down:  [col, row + 1],
    left:  [col - 1, row],
    right: [col + 1, row],
  };
  const [nc, nr] = moves[dir];
  if (nc < 0 || nr < 0 || nc >= cols || nr >= rows) return null;
  const px = nc * gridSize;
  const py = nr * gridSize;
  if (deadZones.some((z) => px >= z.x && px <= z.x + z.w && py >= z.y && py <= z.y + z.h)) return null;
  return [nc, nr] as [number, number];
};

export const AnimatedGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GRID = 120;
    const DOT_COUNT = 24;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let animId: number;
    let dots: Dot[] = [];
    let pulseRings: PulseRing[] = [];
    let deadZones: Zone[] = [];

    const isDark = () => document.documentElement.classList.contains("dark");
    const theme = () => (isDark() ? DARK : LIGHT);
    const heatColors = () => (isDark() ? HEAT_DARK : HEAT);

    const computeDeadZones = () => {
      const canvasRect = canvas.getBoundingClientRect();
      const zones: Zone[] = [];

      // Top — navbar + first row
      zones.push({ x: 0, y: 0, w: width, h: GRID + 24 });

      // Left edge — 2 columns
      zones.push({ x: 0, y: 0, w: GRID * 2, h: height });

      // Right edge — 2 columns
      zones.push({ x: width - GRID * 2, y: 0, w: GRID * 2, h: height });

      // Hero text block
      const hero = document.getElementById("hero-content");
      if (hero) {
        const r = hero.getBoundingClientRect();
        const pad = 32;
        zones.push({
          x: r.left - canvasRect.left - pad,
          y: r.top  - canvasRect.top  - pad,
          w: r.width  + pad * 2,
          h: r.height + pad * 2,
        });
      }

      // Video — everything from its top edge downward
      const video = document.getElementById("hero-video");
      if (video) {
        const r = video.getBoundingClientRect();
        const top = r.top - canvasRect.top - 32;
        zones.push({ x: 0, y: top, w: width, h: height - top });
      }

      deadZones = zones;
    };

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

    const inDeadZone = (col: number, row: number) => {
      const px = col * GRID;
      const py = row * GRID;
      return deadZones.some((z) => px >= z.x && px <= z.x + z.w && py >= z.y && py <= z.y + z.h);
    };

    const randomDir = (col: number, row: number): Direction => {
      const valid = DIRS.filter(
        (d) => nextPos(d, col, row, cols, rows, GRID, deadZones) !== null
      );
      if (valid.length === 0) return DIRS[Math.floor(Math.random() * DIRS.length)];
      return valid[Math.floor(Math.random() * valid.length)];
    };

    const pickType = (i: number): DotType => {
      if (i % 7 === 0) return "signal";
      if (i % 5 === 0) return "tracker";
      return "navy";
    };

    const dotRgb = (type: DotType): [number, number, number] => {
      const t = theme();
      if (type === "signal") return t.signal;
      if (type === "tracker") return t.tracker;
      return t.navy;
    };

    const dotPos = (dot: Dot) => {
      const t = ease(dot.progress);
      return {
        x: dot.col * GRID + (dot.targetCol * GRID - dot.col * GRID) * t,
        y: dot.row * GRID + (dot.targetRow * GRID - dot.row * GRID) * t,
      };
    };

    // Sector-based init — divides available cells into a grid so dots
    // are spread evenly across the whole background from the start
    const initDots = () => {
      const available: [number, number][] = [];
      for (let c = 1; c < cols - 1; c++) {
        for (let r = 2; r < rows; r++) {
          if (!inDeadZone(c, r)) available.push([c, r]);
        }
      }

      // Shuffle
      for (let i = available.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [available[i], available[j]] = [available[j], available[i]];
      }

      // Divide into DOT_COUNT sectors and pick one cell per sector
      const sectorSize = Math.floor(available.length / DOT_COUNT);
      dots = Array.from({ length: DOT_COUNT }, (_, i) => {
        const sectorStart = i * sectorSize;
        const pick = available[sectorStart + Math.floor(Math.random() * Math.max(1, sectorSize))];
        const [col, row] = pick ?? available[i % available.length];
        const dir = randomDir(col, row);
        const target = nextPos(dir, col, row, cols, rows, GRID, deadZones) ?? [col, row];
        return {
          col, row,
          targetCol: target[0],
          targetRow: target[1],
          progress: Math.random(),
          speed: 0.004 + Math.random() * 0.003,
          direction: dir,
          pauseFrames: Math.floor(Math.random() * 40),
          opacity: Math.random() * 0.3 + 0.4,
          targetOpacity: Math.random() * 0.3 + 0.4,
          breathePhase: Math.random() * Math.PI * 2,
          type: pickType(i),
        };
      });
    };

    const drawGrid = () => {
      const t = theme();
      ctx.strokeStyle = t.grid;
      ctx.lineWidth = 0.5;
      for (let c = 0; c <= cols; c++) {
        ctx.beginPath();
        ctx.moveTo(c * GRID, 0);
        ctx.lineTo(c * GRID, height);
        ctx.stroke();
      }
      for (let r = 0; r <= rows; r++) {
        ctx.beginPath();
        ctx.moveTo(0, r * GRID);
        ctx.lineTo(width, r * GRID);
        ctx.stroke();
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

    const drawConnections = () => {
      const maxDist = GRID * 2.8;
      for (let i = 0; i < dots.length; i++) {
        const { x: ax, y: ay } = dotPos(dots[i]);
        const neighbours: { dist: number; j: number }[] = [];
        for (let j = i + 1; j < dots.length; j++) {
          const { x: bx, y: by } = dotPos(dots[j]);
          const dist = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);
          if (dist < maxDist) neighbours.push({ dist, j });
        }
        neighbours.sort((a, b) => a.dist - b.dist);
        neighbours.slice(0, 2).forEach(({ dist, j }) => {
          const { x: bx, y: by } = dotPos(dots[j]);
          const proximity = 1 - dist / maxDist;
          const alpha = proximity * proximity * 0.22;
          const rgb = dotRgb(dots[i].type);
          ctx.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.stroke();
        });
      }
    };

    const drawPulseRings = () => {
      pulseRings.forEach((ring) => {
        const progress = ring.radius / ring.maxRadius;
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${ring.rgb[0]}, ${ring.rgb[1]}, ${ring.rgb[2]}, ${ring.opacity * (1 - progress)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    };

    let frame_count = 0;

    const drawDots = () => {
      frame_count++;
      dots.forEach((dot) => {
        const { x, y } = dotPos(dot);
        const rgb = dotRgb(dot.type);

        // Gentle breathe — offset per dot so they don't all pulse together
        const breathe = 1 + Math.sin(frame_count * 0.018 + dot.breathePhase) * 0.12;
        const finalOpacity = dot.opacity * breathe;

        // Soft glow
        ctx.beginPath();
        ctx.arc(x, y, 9, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${finalOpacity * 0.07})`;
        ctx.fill();

        // Dot
        const r = dot.type === "navy" ? 2.5 : 3.2;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${finalOpacity})`;
        ctx.fill();
      });
    };

    const drawBottomFade = () => {
      const canvasRect = canvas.getBoundingClientRect();
      const video = document.getElementById("hero-video");
      let fadeY = height * 0.55;
      if (video) {
        const r = video.getBoundingClientRect();
        fadeY = Math.min(r.top - canvasRect.top - 48, height * 0.6);
      }
      const bg = isDark() ? "13, 20, 32" : "241, 245, 249";
      const grad = ctx.createLinearGradient(0, fadeY, 0, fadeY + 80);
      grad.addColorStop(0, `rgba(${bg}, 0)`);
      grad.addColorStop(1, `rgba(${bg}, 1)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, fadeY, width, height - fadeY);
    };

    const updateDots = () => {
      const heat = heatColors();
      dots.forEach((dot) => {
        if (dot.pauseFrames > 0) {
          dot.pauseFrames--;
          return;
        }

        dot.progress += dot.speed;

        if (dot.progress >= 1) {
          dot.progress = 0;
          dot.col = dot.targetCol;
          dot.row = dot.targetRow;

          // Pulse on every arrival — subtle, branded colors
          const rgb = heat[Math.floor(Math.random() * heat.length)];
          pulseRings.push({
            x: dot.col * GRID,
            y: dot.row * GRID,
            radius: 2,
            maxRadius: GRID * 0.5,
            opacity: 0.32,
            rgb,
          });

          dot.pauseFrames = Math.floor(Math.random() * 35) + 8;

          const canContinue = nextPos(dot.direction, dot.col, dot.row, cols, rows, GRID, deadZones) !== null;
          if (Math.random() < 0.65 && canContinue) {
            // keep direction
          } else {
            dot.direction = randomDir(dot.col, dot.row);
          }
          const target = nextPos(dot.direction, dot.col, dot.row, cols, rows, GRID, deadZones) ?? [dot.col, dot.row];
          dot.targetCol = target[0];
          dot.targetRow = target[1];

          dot.opacity += (dot.targetOpacity - dot.opacity) * 0.1;
          dot.targetOpacity = Math.random() * 0.3 + 0.4;
        }
      });

      pulseRings = pulseRings
        .map((r) => ({ ...r, radius: r.radius + 1.1, opacity: r.opacity * 0.96 }))
        .filter((r) => r.opacity > 0.02 && r.radius < r.maxRadius);
    };

    const frame = () => {
      ctx.clearRect(0, 0, width, height);
      drawGrid();
      drawIntersections();
      drawConnections();
      drawPulseRings();
      drawDots();
      drawBottomFade();
      updateDots();
      animId = requestAnimationFrame(frame);
    };

    requestAnimationFrame(() => {
      resize();
      initDots();
      frame();
    });

    const ro = new ResizeObserver(() => {
      resize();
      initDots();
    });
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
