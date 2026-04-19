import { type ComponentProps } from "react";

import { cn } from "@/lib/utils";

type HeaderLinkProps = ComponentProps<"a">;

export default function HeaderLink({
  className,
  children,
  ...props
}: HeaderLinkProps) {
  return (
    <a
      {...props}
      className={cn(
        "inline-block text-blue-600 hover:text-blue-800",
        className,
      )}
    >
      {children}
    </a>
  );
}
