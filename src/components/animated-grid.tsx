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
  pulseOnArrive: boolean;
};

type PulseRing = {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  rgb: [number, number, number];
};

const DIRS: Direction[] = ["up", "down", "left", "right"];

const LIGHT = {
  grid:       "rgba(52, 76, 163, 0.07)",
  node:       "rgba(52, 76, 163, 0.13)",
  navy:       [2,   47,  81]  as [number, number, number],
  signal:     [255, 140, 66]  as [number, number, number],
  tracker:    [13,  148, 136] as [number, number, number],
  connection: [2,   47,  81]  as [number, number, number],
};

const DARK = {
  grid:       "rgba(100, 140, 230, 0.1)",
  node:       "rgba(100, 140, 230, 0.2)",
  navy:       [120, 160, 255] as [number, number, number],
  signal:     [255, 170, 100] as [number, number, number],
  tracker:    [45,  212, 191] as [number, number, number],
  connection: [120, 160, 255] as [number, number, number],
};

const nextPos = (
  dir: Direction,
  col: number,
  row: number,
  cols: number,
  rows: number,
) => {
  const moves: Record<Direction, [number, number]> = {
    up:    [col, row - 1],
    down:  [col, row + 1],
    left:  [col - 1, row],
    right: [col + 1, row],
  };
  const [nc, nr] = moves[dir];
  if (nc < 0 || nr < 0 || nc >= cols || nr >= rows) return null;
  return [nc, nr] as [number, number];
};

export const AnimatedGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GRID = 80;
    const DOT_COUNT = 24;
    const TRAIL_LENGTH = 10;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let animId: number;
    let dots: Dot[] = [];
    let pulseRings: PulseRing[] = [];

    const isDark = () => document.documentElement.classList.contains("dark");
    const theme = () => (isDark() ? DARK : LIGHT);

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      cols = Math.floor(width / GRID) + 1;
      rows = Math.floor(height / GRID) + 1;
    };

    const randomDir = (col: number, row: number): Direction => {
      const valid = DIRS.filter((d) => nextPos(d, col, row, cols, rows) !== null);
      return valid[Math.floor(Math.random() * valid.length)];
    };

    const pickType = (i: number): DotType => {
      if (i < 3) return "signal";
      if (i < 6) return "tracker";
      return "navy";
    };

    const initDots = () => {
      dots = Array.from({ length: DOT_COUNT }, (_, i) => {
        const col = Math.floor(Math.random() * cols);
        const row = Math.floor(Math.random() * rows);
        const dir = randomDir(col, row);
        const target = nextPos(dir, col, row, cols, rows) ?? [col, row];
        return {
          col,
          row,
          targetCol: target[0],
          targetRow: target[1],
          progress: Math.random(),
          speed: 0.007 + Math.random() * 0.006,
          direction: dir,
          pauseFrames: 0,
          opacity: Math.random() * 0.4 + 0.25,
          targetOpacity: Math.random() * 0.4 + 0.25,
          trail: [],
          type: pickType(i),
          pulseOnArrive: Math.random() < 0.4,
        };
      });
    };

    const gridX = (col: number) => col * GRID;
    const gridY = (row: number) => row * GRID;

    const dotRgb = (type: DotType): [number, number, number] => {
      const t = theme();
      if (type === "signal") return t.signal;
      if (type === "tracker") return t.tracker;
      return t.navy;
    };

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
          const alpha = (i / all.length) * dot.opacity * 0.55;
          ctx.beginPath();
          ctx.moveTo(all[i - 1].x, all[i - 1].y);
          ctx.lineTo(all[i].x, all[i].y);
          ctx.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });
    };

    const drawConnections = () => {
      const t = theme();
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const ax = gridX(dots[i].col) + (gridX(dots[i].targetCol) - gridX(dots[i].col)) * dots[i].progress;
          const ay = gridY(dots[i].row) + (gridY(dots[i].targetRow) - gridY(dots[i].row)) * dots[i].progress;
          const bx = gridX(dots[j].col) + (gridX(dots[j].targetCol) - gridX(dots[j].col)) * dots[j].progress;
          const by = gridY(dots[j].row) + (gridY(dots[j].targetRow) - gridY(dots[j].row)) * dots[j].progress;
          const dist = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);
          const maxDist = GRID * 5;
          if (dist < maxDist) {
            const proximity = 1 - dist / maxDist;
            const crossType = dots[i].type !== dots[j].type;
            const alpha = proximity * (crossType ? 0.18 : 0.09);
            const rgb = crossType ? t.signal : t.connection;
            ctx.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
            ctx.lineWidth = crossType ? 1 : 0.75;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
      }
    };

    const drawPulseRings = () => {
      pulseRings.forEach((ring) => {
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${ring.rgb[0]}, ${ring.rgb[1]}, ${ring.rgb[2]}, ${ring.opacity})`;
        ctx.lineWidth = 1;
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
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${dot.opacity * 0.12})`;
        ctx.fill();

        // Dot
        ctx.beginPath();
        ctx.arc(x, y, dot.type === "navy" ? 2.5 : 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${dot.opacity})`;
        ctx.fill();
      });
    };

    const updateDots = () => {
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

          if (dot.pulseOnArrive) {
            pulseRings.push({
              x: gridX(dot.col),
              y: gridY(dot.row),
              radius: 3,
              opacity: dot.opacity * 0.7,
              rgb: dotRgb(dot.type),
            });
            dot.pulseOnArrive = Math.random() < 0.4;
          }

          dot.pauseFrames = Math.floor(Math.random() * 35) + 8;

          const canContinue = nextPos(dot.direction, dot.col, dot.row, cols, rows) !== null;
          if (Math.random() < 0.7 && canContinue) {
            // continue same direction
          } else {
            dot.direction = randomDir(dot.col, dot.row);
          }
          const target = nextPos(dot.direction, dot.col, dot.row, cols, rows) ?? [dot.col, dot.row];
          dot.targetCol = target[0];
          dot.targetRow = target[1];

          dot.opacity += (dot.targetOpacity - dot.opacity) * 0.1;
          dot.targetOpacity = Math.random() * 0.4 + 0.25;
        }
      });

      pulseRings = pulseRings
        .map((r) => ({ ...r, radius: r.radius + 1.2, opacity: r.opacity * 0.93 }))
        .filter((r) => r.opacity > 0.015);
    };

    const frame = () => {
      ctx.clearRect(0, 0, width, height);
      drawGrid();
      drawIntersections();
      drawTrails();
      drawConnections();
      drawPulseRings();
      drawDots();
      updateDots();
      animId = requestAnimationFrame(frame);
    };

    resize();
    initDots();
    frame();

    const ro = new ResizeObserver(resize);
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
