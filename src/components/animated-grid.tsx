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
    const DOT_COUNT = 28;

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

      zones.push({ x: 0, y: 0, w: width, h: GRID + 20 });
      zones.push({ x: 0, y: 0, w: 1, h: height });
      zones.push({ x: (cols - 1) * GRID - 1, y: 0, w: GRID + 2, h: height });

      const hero = document.getElementById("hero-content");
      if (hero) {
        const r = hero.getBoundingClientRect();
        const pad = 24;
        zones.push({
          x: r.left - canvasRect.left - pad,
          y: r.top  - canvasRect.top  - pad,
          w: r.width  + pad * 2,
          h: r.height + pad * 2,
        });
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
      if (i < 3) return "signal";
      if (i < 6) return "tracker";
      return "navy";
    };

    const dotRgb = (type: DotType): [number, number, number] => {
      const t = theme();
      if (type === "signal") return t.signal;
      if (type === "tracker") return t.tracker;
      return t.navy;
    };

    const dotPos = (dot: Dot) => ({
      x: dot.col * GRID + (dot.targetCol * GRID - dot.col * GRID) * dot.progress,
      y: dot.row * GRID + (dot.targetRow * GRID - dot.row * GRID) * dot.progress,
    });

    const initDots = () => {
      dots = Array.from({ length: DOT_COUNT }, (_, i) => {
        let col: number, row: number;
        let attempts = 0;
        do {
          col = Math.floor(Math.random() * cols);
          row = Math.floor(Math.random() * rows);
          attempts++;
        } while (inDeadZone(col, row) && attempts < 50);

        const dir = randomDir(col, row);
        const target = nextPos(dir, col, row, cols, rows, GRID, deadZones) ?? [col, row];
        return {
          col, row,
          targetCol: target[0],
          targetRow: target[1],
          progress: Math.random(),
          speed: 0.004 + Math.random() * 0.003,
          direction: dir,
          pauseFrames: 0,
          opacity: Math.random() * 0.35 + 0.35,
          targetOpacity: Math.random() * 0.35 + 0.35,
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

    // One elegant connection per nearest-neighbor pair, smooth proximity fade
    const drawConnections = () => {
      const maxDist = GRID * 2.8;
      for (let i = 0; i < dots.length; i++) {
        const { x: ax, y: ay } = dotPos(dots[i]);
        // Connect to up to 2 nearest neighbours for denser network feel
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

    const drawDots = () => {
      dots.forEach((dot) => {
        const { x, y } = dotPos(dot);
        const rgb = dotRgb(dot.type);

        // Soft glow
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${dot.opacity * 0.08})`;
        ctx.fill();

        // Dot
        const r = dot.type === "navy" ? 2.5 : 3;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${dot.opacity})`;
        ctx.fill();
      });
    };

    const drawBottomFade = () => {
      const fadeStart = height * 0.62;
      const bg = isDark() ? "13, 20, 32" : "241, 245, 249";
      const grad = ctx.createLinearGradient(0, fadeStart, 0, height);
      grad.addColorStop(0, `rgba(${bg}, 0)`);
      grad.addColorStop(1, `rgba(${bg}, 0.92)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, fadeStart, width, height - fadeStart);
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

          // Subtle pulse on arrival — only ~25% of the time
          if (Math.random() < 0.25) {
            const rgb = heat[Math.floor(Math.random() * heat.length)];
            pulseRings.push({
              x: dot.col * GRID,
              y: dot.row * GRID,
              radius: 2,
              maxRadius: GRID * 0.55,
              opacity: 0.4,
              rgb,
            });
          }

          dot.pauseFrames = Math.floor(Math.random() * 40) + 10;

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
          dot.targetOpacity = Math.random() * 0.35 + 0.35;
        }
      });

      pulseRings = pulseRings
        .map((r) => ({ ...r, radius: r.radius + 1.1, opacity: r.opacity * 0.95 }))
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

    const ro = new ResizeObserver(() => resize());
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
