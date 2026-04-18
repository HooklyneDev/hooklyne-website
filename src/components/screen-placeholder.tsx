import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  hint?: string;
  ratio?: "16/9" | "4/3" | "1/1" | "3/2" | "9/16";
  chrome?: boolean;
  url?: string;
  accent?: "blue" | "teal" | "orange" | "navy";
  className?: string;
};

const ACCENT_GRAD: Record<NonNullable<Props["accent"]>, string> = {
  blue:   "radial-gradient(ellipse 60% 40% at 30% 20%, rgba(52,76,163,0.18), transparent 60%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(52,76,163,0.10), transparent 60%)",
  teal:   "radial-gradient(ellipse 60% 40% at 30% 20%, rgba(13,148,136,0.16), transparent 60%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(52,76,163,0.10), transparent 60%)",
  orange: "radial-gradient(ellipse 60% 40% at 30% 20%, rgba(255,140,66,0.14), transparent 60%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(52,76,163,0.10), transparent 60%)",
  navy:   "radial-gradient(ellipse 60% 40% at 30% 20%, rgba(2,47,81,0.16), transparent 60%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(52,76,163,0.12), transparent 60%)",
};

const RATIO_PB: Record<NonNullable<Props["ratio"]>, string> = {
  "16/9": "56.25%",
  "4/3":  "75%",
  "1/1":  "100%",
  "3/2":  "66.66%",
  "9/16": "177.77%",
};

export const ScreenPlaceholder = ({
  label,
  hint,
  ratio = "16/9",
  chrome = false,
  url = "portal.hooklyne.com",
  accent = "blue",
  className,
}: Props) => {
  return (
    <div className={cn("relative w-full rounded-2xl overflow-hidden", className)} style={{ boxShadow: "var(--shadow-lg)" }}>
      {chrome && (
        <div
          className="flex items-center gap-2 px-3 border border-b-0 rounded-t-2xl"
          style={{ height: "36px", background: "var(--card)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-1 mr-1">
            <div className="size-2.5 rounded-full" style={{ background: "#ff5f57" }} />
            <div className="size-2.5 rounded-full" style={{ background: "#febc2e" }} />
            <div className="size-2.5 rounded-full" style={{ background: "#28c840" }} />
          </div>
          <div
            className="flex-1 mx-2 px-3 rounded-full text-[11px] flex items-center justify-center"
            style={{ height: "22px", background: "var(--background)", color: "var(--muted-foreground)" }}
          >
            {url}
          </div>
        </div>
      )}
      <div
        className={cn("relative border", chrome ? "border-t-0 rounded-b-2xl" : "rounded-2xl")}
        style={{
          paddingBottom: RATIO_PB[ratio],
          borderColor: "var(--border)",
          background: `${ACCENT_GRAD[accent]}, linear-gradient(135deg, var(--card) 0%, var(--card-hover) 100%)`,
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <div
            className="flex items-center justify-center size-10 rounded-xl mb-3"
            style={{ background: "var(--card)", border: "1px dashed var(--border-strong)" }}
          >
            <ImageIcon className="size-5" style={{ color: "var(--muted-foreground)" }} />
          </div>
          <p className="text-sm font-semibold" style={{ color: "var(--heading)" }}>{label}</p>
          {hint && (
            <p className="text-xs mt-1.5 max-w-xs" style={{ color: "var(--muted-foreground)" }}>{hint}</p>
          )}
        </div>
      </div>
    </div>
  );
};
