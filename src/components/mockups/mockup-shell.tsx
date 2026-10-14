import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/** Shared chrome for the animated product mockups: title bar with meta chips, then the body. */
export function MockupShell({
  title,
  meta,
  children,
  className,
}: {
  title: string;
  meta: ReadonlyArray<string>;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-bg", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-2.5">
        <p className="text-[13px] font-bold text-ink">{title}</p>
        <ul className="flex items-center gap-1.5">
          {meta.map((item) => (
            <li key={item} className="rounded-full border border-line bg-surface px-2 py-0.5 text-[10px] font-semibold text-ink-2">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}

export type MockupProps = { paused?: boolean; className?: string };
