import { cn } from "@/lib/utils";

interface DashedLineProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export const DashedLine = ({
  orientation = "horizontal",
  className,
}: DashedLineProps) => {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      className={cn(
        "text-muted-foreground relative flex items-center justify-center",
        isHorizontal ? "h-px w-full flex-row" : "h-full w-px flex-col",
        className,
      )}
    >
      {/* Start node */}
      <div
        className={cn(
          "shrink-0 rounded-full border-2 border-current bg-background",
          "size-2.5",
        )}
      />

      {/* Connecting line */}
      <div
        className={cn(
          "flex-1 bg-current opacity-25",
          isHorizontal ? "h-px" : "w-px",
        )}
      />

      {/* End node */}
      <div
        className={cn(
          "shrink-0 rounded-full border-2 border-current bg-background",
          "size-2.5",
        )}
      />
    </div>
  );
};
