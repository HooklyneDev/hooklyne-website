import React from "react";
import { cn } from "@/lib/utils";

type BackgroundProps = {
  children: React.ReactNode;
  variant?: "top" | "bottom";
  className?: string;
  animated?: boolean;
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
        "relative w-full overflow-hidden",
        isTop && "rounded-b-3xl",
        !isTop && "rounded-t-3xl rounded-b-4xl",
        className,
      )}
      style={{
        background: isTop
          ? `
            radial-gradient(ellipse 75% 45% at 50% 0%, var(--bg-glow-top) 0%, transparent 65%),
            radial-gradient(ellipse 40% 30% at 100% 0%, var(--bg-glow-corner) 0%, transparent 60%),
            linear-gradient(to bottom, var(--background) 0%, var(--card) 60%, var(--background) 100%)
          `
          : "linear-gradient(to bottom, var(--background) 0%, var(--card) 100%)",
        minHeight: isTop ? undefined : "60vh",
      }}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
};
