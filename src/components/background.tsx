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
          ? "linear-gradient(to bottom, #f1f5f9 0%, #f8fafc 60%, #f1f5f9 100%)"
          : "linear-gradient(to bottom, #f1f5f9 0%, #f8fafc 100%)",
        minHeight: isTop ? undefined : "60vh",
      }}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
};
