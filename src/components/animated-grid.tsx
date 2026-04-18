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
  trail: { x: number; y: number }[];
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

type ActiveConnection = {
  ax: number;
  ay: number;
  bx: number;
  by: number;
  opacity: number;
  rgb: [number, number, number];
};

type Zone = { x: number; y: number; w: number; h: number };

const DIRS: Direction[] = ["up", "down", "left", "right"];

// 3 heat signal colors: orange (hot), blue (mid), teal (cool)
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
  grid:       "rgba(52, 76, 163, 0.08)",
  node:       "rgba(52, 76, 163, 0.14)",
  navy:       [2,   47,  81]  as [number, number, number],
  signal:     [255, 140, 66]  as [number, number, number],
  tracker:    [13,  148, 136] as [number, number, number],
};

const DARK = {
  grid:       "rgba(100, 140, 230, 0.1)",
  node:       "rgba(100, 140, 230, 0.2)",
  navy:       [120, 160, 255] as [number, number, number],
  signal:     [255, 170, 100] as [number, number, number],
  tracker:    [45,  212, 191] as [number, number, number],
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
    const DOT_COUNT = 20;
    const TRAIL_LENGTH = 8;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let animId: number;
    let dots: Dot[] = [];
    let pulseRings: PulseRing[] = [];
    let activeConnections: ActiveConnection[] = [];
    let deadZones: Zone[] = [];

    const isDark = () => document.documentElement.classList.contains("dark");
    const theme = () => (isDark() ? DARK : LIGHT);
    const heatColors = () => (isDark() ? HEAT_DARK : HEAT);

    const computeDeadZones = () => {
      const canvasRect = canvas.getBoundingClientRect();
      const zones: Zone[] = [];

      // Top edge + navbar (covers first grid row)
      zones.push({ x: 0, y: 0, w: width, h: GRID + 20 });

      // Left edge column
      zones.push({ x: 0, y: 0, w: 1, h: height });

      // Right edge column
      zones.push({ x: (cols - 1) * GRID - 1, y: 0, w: GRID + 2, h: height });

      // Hero content block
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
          speed: 0.005 + Math.random() * 0.004,
          direction: dir,
          pauseFrames: 0,
          opacity: Math.random() * 0.4 + 0.3,
          targetOpacity: Math.random() * 0.4 + 0.3,
          trail: [],
          type: pickType(i),
        };
      });
    };

    const gridX = (col: number) => col * GRID;
    const gridY = (row: number) => row * GRID;

    const drawGrid = () => {
      const t = theme();
      ctx.strokeStyle = t.grid;
      ctx.lineWidth = 0.5;
      for (let c = 0; c <= cols; c++) {
        ctx.beginPath();
        ctx.moveTo(gridX(c), 0);
        ctx.lineTo(gridX(c), height);
        ctx.stroke();
      }
      for (let r = 0; r <= rows; r++) {
        ctx.beginPath();
        ctx.moveTo(0, gridY(r));
        ctx.lineTo(width, gridY(r));
        ctx.stroke();
      }
    };

    const drawIntersections = () => {
      const t = theme();
      for (let c = 0; c <= cols; c++) {
        for (let r = 0; r <= rows; r++) {
          ctx.beginPath();
          ctx.arc(gridX(c), gridY(r), 1.5, 0, Math.PI * 2);
          ctx.fillStyle = t.node;
          ctx.fill();
        }
      }
    };

    const drawTrails = () => {
      dots.forEach((dot) => {
        if (dot.trail.length < 2) return;
        const x = gridX(dot.col) + (gridX(dot.targetCol) - gridX(dot.col)) * dot.progress;
        const y = gridY(dot.row) + (gridY(dot.targetRow) - gridY(dot.row)) * dot.progress;
        const rgb = dotRgb(dot.type);
        const all = [...dot.trail, { x, y }];
        for (let i = 1; i < all.length; i++) {
          const alpha = (i / all.length) * dot.opacity * 0.5;
          ctx.beginPath();
          ctx.moveTo(all[i - 1].x, all[i - 1].y);
          ctx.lineTo(all[i].x, all[i].y);
          ctx.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });
    };

    const drawProximityConnections = () => {
      // Faint ambient connections between nearby dots
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const ax = gridX(dots[i].col) + (gridX(dots[i].targetCol) - gridX(dots[i].col)) * dots[i].progress;
          const ay = gridY(dots[i].row) + (gridY(dots[i].targetRow) - gridY(dots[i].row)) * dots[i].progress;
          const bx = gridX(dots[j].col) + (gridX(dots[j].targetCol) - gridX(dots[j].col)) * dots[j].progress;
          const by = gridY(dots[j].row) + (gridY(dots[j].targetRow) - gridY(dots[j].row)) * dots[j].progress;
          const dist = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);
          const maxDist = GRID * 3.5;
          if (dist < maxDist) {
            const proximity = 1 - dist / maxDist;
            const alpha = proximity * 0.07;
            const rgb = dotRgb(dots[i].type);
            ctx.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
      }
    };

    const drawActiveConnections = () => {
      activeConnections.forEach((conn) => {
        ctx.beginPath();
        ctx.moveTo(conn.ax, conn.ay);
        ctx.lineTo(conn.bx, conn.by);
        ctx.strokeStyle = `rgba(${conn.rgb[0]}, ${conn.rgb[1]}, ${conn.rgb[2]}, ${conn.opacity})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });
    };

    const drawPulseRings = () => {
      pulseRings.forEach((ring) => {
        const progress = ring.radius / ring.maxRadius;
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${ring.rgb[0]}, ${ring.rgb[1]}, ${ring.rgb[2]}, ${ring.opacity * (1 - progress * 0.5)})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });
    };

    const drawDots = () => {
      dots.forEach((dot) => {
        const x = gridX(dot.col) + (gridX(dot.targetCol) - gridX(dot.col)) * dot.progress;
        const y = gridY(dot.row) + (gridY(dot.targetRow) - gridY(dot.row)) * dot.progress;
        const rgb = dotRgb(dot.type);

        // Glow
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${dot.opacity * 0.1})`;
        ctx.fill();

        // Dot
        ctx.beginPath();
        ctx.arc(x, y, dot.type === "navy" ? 2.5 : 3, 0, Math.PI * 2);
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

    const checkCollisions = () => {
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const ax = gridX(dots[i].col) + (gridX(dots[i].targetCol) - gridX(dots[i].col)) * dots[i].progress;
          const ay = gridY(dots[i].row) + (gridY(dots[i].targetRow) - gridY(dots[i].row)) * dots[i].progress;
          const bx = gridX(dots[j].col) + (gridX(dots[j].targetCol) - gridX(dots[j].col)) * dots[j].progress;
          const by = gridY(dots[j].row) + (gridY(dots[j].targetRow) - gridY(dots[j].row)) * dots[j].progress;
          const dist = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);

          if (dist < GRID * 1.2) {
            const alreadyConnected = activeConnections.some(
              (c) => Math.abs(c.ax - ax) < 4 && Math.abs(c.bx - bx) < 4
            );
            if (!alreadyConnected) {
              // Use the "other" dot's type color for each end's connection
              const rgb = dotRgb(dots[j].type);
              activeConnections.push({ ax, ay, bx, by, opacity: 0.5, rgb });
            }
          }
        }
      }
    };

    const updateDots = () => {
      const heat = heatColors();
      dots.forEach((dot) => {
        if (dot.pauseFrames > 0) {
          dot.pauseFrames--;
          return;
        }

        const x = gridX(dot.col) + (gridX(dot.targetCol) - gridX(dot.col)) * dot.progress;
        const y = gridY(dot.row) + (gridY(dot.targetRow) - gridY(dot.row)) * dot.progress;

        dot.trail.push({ x, y });
        if (dot.trail.length > TRAIL_LENGTH) dot.trail.shift();

        dot.progress += dot.speed;

        if (dot.progress >= 1) {
          dot.progress = 0;
          dot.col = dot.targetCol;
          dot.row = dot.targetRow;

          // Every intersection arrival fires a heat signal pulse
          const rgb = heat[Math.floor(Math.random() * heat.length)];
          pulseRings.push({
            x: gridX(dot.col),
            y: gridY(dot.row),
            radius: 3,
            maxRadius: GRID * 0.7,
            opacity: 0.65,
            rgb,
          });

          dot.pauseFrames = Math.floor(Math.random() * 30) + 8;

          const canContinue = nextPos(dot.direction, dot.col, dot.row, cols, rows, GRID, deadZones) !== null;
          if (Math.random() < 0.7 && canContinue) {
            // continue
          } else {
            dot.direction = randomDir(dot.col, dot.row);
          }
          const target = nextPos(dot.direction, dot.col, dot.row, cols, rows, GRID, deadZones) ?? [dot.col, dot.row];
          dot.targetCol = target[0];
          dot.targetRow = target[1];

          dot.opacity += (dot.targetOpacity - dot.opacity) * 0.1;
          dot.targetOpacity = Math.random() * 0.4 + 0.3;
        }
      });

      pulseRings = pulseRings
        .map((r) => ({ ...r, radius: r.radius + 1.4, opacity: r.opacity * 0.94 }))
        .filter((r) => r.opacity > 0.02 && r.radius < r.maxRadius);

      activeConnections = activeConnections
        .map((c) => ({ ...c, opacity: c.opacity * 0.91 }))
        .filter((c) => c.opacity > 0.03);
    };

    const frame = () => {
      ctx.clearRect(0, 0, width, height);
      drawGrid();
      drawIntersections();
      drawTrails();
      drawProximityConnections();
      checkCollisions();
      drawActiveConnections();
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
