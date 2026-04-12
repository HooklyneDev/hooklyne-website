import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type BackgroundProps = {
  children: React.ReactNode;
  variant?: "top" | "bottom";
  className?: string;
};

type Dot = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  size: number;
  targetOpacity: number;
};

const AnimatedGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GRID = 48;
    const DOT_COUNT = 18;
    const CONNECTION_DIST = GRID * 2.5;

    let width = 0;
    let height = 0;
    let animId: number;
    let dots: Dot[] = [];

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const initDots = () => {
      dots = Array.from({ length: DOT_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.2,
        size: Math.random() * 1.5 + 1.5,
        targetOpacity: Math.random() * 0.5 + 0.2,
      }));
    };

    const drawGrid = () => {
      ctx.strokeStyle = "rgba(52, 76, 163, 0.07)";
      ctx.lineWidth = 0.5;

      for (let x = 0; x <= width; x += GRID) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += GRID) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    const drawConnections = () => {
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.12;
            ctx.strokeStyle = `rgba(2, 47, 81, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const drawDots = () => {
      dots.forEach((dot) => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(52, 76, 163, ${dot.opacity})`;
        ctx.fill();
      });
    };

    const updateDots = () => {
      dots.forEach((dot) => {
        dot.x += dot.vx;
        dot.y += dot.vy;

        if (dot.x < -20) dot.x = width + 20;
        if (dot.x > width + 20) dot.x = -20;
        if (dot.y < -20) dot.y = height + 20;
        if (dot.y > height + 20) dot.y = -20;

        dot.opacity += (dot.targetOpacity - dot.opacity) * 0.02;
        if (Math.abs(dot.opacity - dot.targetOpacity) < 0.01) {
          dot.targetOpacity = Math.random() * 0.5 + 0.15;
        }
      });
    };

    const frame = () => {
      ctx.clearRect(0, 0, width, height);
      drawGrid();
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
      style={{ opacity: 1 }}
    />
  );
};

export const Background = ({
  children,
  variant = "top",
  className,
}: BackgroundProps) => {
  const isTop = variant === "top";

  return (
    <div
      className={cn(
        "relative mx-2.5 mt-2.5 lg:mx-4 overflow-hidden",
        isTop && "rounded-t-4xl rounded-b-2xl",
        !isTop && "rounded-t-2xl rounded-b-4xl",
        className,
      )}
      style={{
        background: isTop
          ? "linear-gradient(to bottom, #f1f5f9 0%, #f8fafc 60%, #f1f5f9 100%)"
          : "linear-gradient(to bottom, #f1f5f9 0%, #f8fafc 100%)",
      }}
    >
      {isTop && <AnimatedGrid />}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
