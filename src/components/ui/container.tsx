import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

/**
 * The page container. One width for the whole site (--container-wide, 86rem) with the same side
 * gutters as the header, so the logo, every section and the footer share one left and right edge.
 * Narrow reading columns go inside it (e.g. max-w-3xl on the content), never on the container.
 */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-wide px-5 md:px-8 lg:px-10", className)} {...props} />;
}
