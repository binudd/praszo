import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/** Browser-style chrome around a screenshot or built mockup. Token-based, so it follows light and dark scenes. */
export function WindowFrame({
  children,
  title,
  className,
}: {
  children: ReactNode;
  title?: string;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-card border border-line bg-bg shadow-float", className)}>
      <div className="flex items-center gap-3 border-b border-line bg-surface px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <i className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <i className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <i className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        </span>
        {title ? (
          <span className="mx-auto hidden h-6 max-w-[60%] items-center truncate rounded-md border border-line bg-bg px-3 text-[11px] text-ink-3 sm:flex">
            {title}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}
