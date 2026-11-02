import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/** Browser-style chrome around a screenshot or built mockup. Token-based, so it follows light and dark scenes. */
export function WindowFrame({
  children,
  title,
  action,
  dots = "neutral",
  className,
}: {
  children: ReactNode;
  title?: string;
  /** Control shown at the right end of the window bar (e.g. a theme toggle). */
  action?: ReactNode;
  /** "color": the three window dots take the warning / accent / success tokens (live mockups). */
  dots?: "neutral" | "color";
  className?: string;
}) {
  const dot = dots === "color" ? ["bg-accent", "bg-warning", "bg-success"] : ["bg-line-strong", "bg-line-strong", "bg-line-strong"];
  return (
    <div className={cn("relative isolate flex flex-col overflow-hidden rounded-card border border-line bg-bg", className)}>
      <div className="flex shrink-0 items-center gap-3 border-b border-line bg-surface px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          {dot.map((tone, index) => (
            <i key={index} className={cn("h-2.5 w-2.5 rounded-full", tone)} />
          ))}
        </span>
        {title ? (
          <span className="mx-auto hidden h-6 max-w-[60%] items-center truncate rounded-md bg-bg px-3 text-[11px] text-ink-3 sm:flex">
            {title}
          </span>
        ) : null}
        {action ? <span className="ml-auto flex items-center">{action}</span> : null}
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}
