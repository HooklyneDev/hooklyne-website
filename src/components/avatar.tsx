/**
 * Avatar - small circular image or gradient initials.
 *
 * Use `src` for a real photo (e.g. /about/tim-wissink.jpg).
 * Otherwise falls back to initials computed from `name` on a gradient
 * background tinted by `tone`.
 */
type Tone = "blue" | "teal" | "orange" | "navy";

const TONES: Record<Tone, { from: string; to: string }> = {
  blue:   { from: "#344ca3", to: "#5b6dca" },
  teal:   { from: "#0d9488", to: "#14b8a6" },
  orange: { from: "#ff8c42", to: "#ffa66c" },
  navy:   { from: "#022f51", to: "#0a4378" },
};

const SIZES = {
  xs: "size-6 text-[10px]",
  sm: "size-8 text-[11px]",
  md: "size-10 text-[13px]",
  lg: "size-14 text-base",
} as const;

type Size = keyof typeof SIZES;

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

export const Avatar = ({
  name,
  src,
  alt,
  tone = "blue",
  size = "md",
  className = "",
  ring = false,
}: {
  name: string;
  src?: string;
  alt?: string;
  tone?: Tone;
  size?: Size;
  className?: string;
  ring?: boolean;
}) => {
  const sizeClasses = SIZES[size];
  const ringClass = ring ? "ring-2 ring-white" : "";
  const base = `inline-flex items-center justify-center rounded-full overflow-hidden font-semibold text-white shrink-0 ${sizeClasses} ${ringClass} ${className}`;

  if (src) {
    return (
      <span className={base}>
        <img
          src={src}
          alt={alt || name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </span>
    );
  }

  const t = TONES[tone];
  return (
    <span
      className={base}
      style={{ background: `linear-gradient(135deg, ${t.from} 0%, ${t.to} 100%)` }}
      aria-hidden="true"
    >
      {initialsOf(name)}
    </span>
  );
};
