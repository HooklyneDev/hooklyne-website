import { useEffect, useRef } from "react";

type Direction = "up" | "down" | "left" | "right";

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
};

const DIRS: Direction[] = ["up", "down", "left", "right"];

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
    const DOT_COUNT = 20;
    const TRAIL_LENGTH = 6;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let animId: number;
    let dots: Dot[] = [];

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

    const initDots = () => {
      dots = Array.from({ length: DOT_COUNT }, () => {
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
          speed: 0.008 + Math.random() * 0.006,
          direction: dir,
          pauseFrames: 0,
          opacity: Math.random() * 0.35 + 0.2,
          targetOpacity: Math.random() * 0.35 + 0.2,
          trail: [],
        };
      });
    };

    const gridX = (col: number) => col * GRID;
    const gridY = (row: number) => row * GRID;

    const drawGrid = () => {
      ctx.strokeStyle = "rgba(52, 76, 163, 0.06)";
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
      for (let c = 0; c <= cols; c++) {
        for (let r = 0; r <= rows; r++) {
          ctx.beginPath();
          ctx.arc(gridX(c), gridY(r), 1.5, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(52, 76, 163, 0.1)";
          ctx.fill();
        }
      }
    };

    const drawConnections = () => {
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const ax = gridX(dots[i].col) + (gridX(dots[i].targetCol) - gridX(dots[i].col)) * dots[i].progress;
          const ay = gridY(dots[i].row) + (gridY(dots[i].targetRow) - gridY(dots[i].row)) * dots[i].progress;
          const bx = gridX(dots[j].col) + (gridX(dots[j].targetCol) - gridX(dots[j].col)) * dots[j].progress;
          const by = gridY(dots[j].row) + (gridY(dots[j].targetRow) - gridY(dots[j].row)) * dots[j].progress;
          const dist = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);
          const maxDist = GRID * 5;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.1;
            ctx.strokeStyle = `rgba(2, 47, 81, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
      }
    };

    const drawDots = () => {
      dots.forEach((dot) => {
        const x = gridX(dot.col) + (gridX(dot.targetCol) - gridX(dot.col)) * dot.progress;
        const y = gridY(dot.row) + (gridY(dot.targetRow) - gridY(dot.row)) * dot.progress;

        // Trail
        dot.trail.forEach((pt, i) => {
          const trailOpacity = (i / dot.trail.length) * dot.opacity * 0.4;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(52, 76, 163, ${trailOpacity})`;
          ctx.fill();
        });

        // Dot
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(52, 76, 163, ${dot.opacity})`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(52, 76, 163, ${dot.opacity * 0.15})`;
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
          dot.pauseFrames = Math.floor(Math.random() * 40) + 10;

          // Bias: 70% chance to continue same direction
          const continueDir = Math.random() < 0.7 ? dot.direction : null;
          const canContinue = continueDir
            ? nextPos(continueDir, dot.col, dot.row, cols, rows) !== null
            : false;

          dot.direction = canContinue ? dot.direction : randomDir(dot.col, dot.row);
          const target = nextPos(dot.direction, dot.col, dot.row, cols, rows) ?? [dot.col, dot.row];
          dot.targetCol = target[0];
          dot.targetRow = target[1];

          dot.opacity += (dot.targetOpacity - dot.opacity) * 0.1;
          dot.targetOpacity = Math.random() * 0.35 + 0.2;
        }
      });
    };

    const frame = () => {
      ctx.clearRect(0, 0, width, height);
      drawGrid();
      drawIntersections();
      drawConnections();
      drawDots();
      updateDots();
      animId = requestAnimationFrame(frame);
    };

    resize();
    initDots();
    frame();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};
