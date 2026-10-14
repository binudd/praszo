import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

export function Container({
  className,
  wide,
  ...props
}: ComponentProps<"div"> & { wide?: boolean }) {
  return (
    <div
      className={cn("mx-auto w-full px-5 md:px-8 lg:px-10", wide ? "max-w-wide" : "max-w-site", className)}
      {...props}
    />
  );
}
