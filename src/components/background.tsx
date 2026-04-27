import React from "react";
import { cn } from "@/lib/utils";

type BackgroundProps = {
  children: React.ReactNode;
  variant?: "top" | "bottom";
  className?: string;
  animated?: boolean;
  /** Where the top variant's solid card area ends before fading to background. Default 78%. */
  topStop?: string;
};

export const Background = ({
  children,
  variant = "top",
  className,
  topStop = "78%",
}: BackgroundProps) => {
  const isTop = variant === "top";

  return (
    <div
      className={cn("relative w-full", className)}
      style={{
        background: "transparent",
        minHeight: isTop ? undefined : "60vh",
      }}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
};
