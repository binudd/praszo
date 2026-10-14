import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

export function Card({
  className,
  hover,
  ...props
}: ComponentProps<"div"> & { hover?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-card border border-line bg-bg shadow-card",
        hover &&
          "transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-float",
        className,
      )}
      {...props}
    />
  );
}
