import type { ReactNode } from "react";

import { WindowFrame } from "@/components/mockups/window-frame";
import { cn } from "@/lib/cn";

/** Shared chrome for the animated product mockups: a browser window with a slim toolbar of meta chips. */
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
    <WindowFrame title={title} className={cn("h-full shadow-stage", className)}>
      <div className="flex h-full flex-col">
        {meta.length ? (
          <ul className="flex shrink-0 flex-wrap items-center gap-1.5 border-b border-line px-3 py-2">
            {meta.map((item) => (
              <li key={item} className="rounded-full border border-line bg-surface px-2 py-0.5 text-[10px] font-semibold text-ink-2">
                {item}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="min-h-0 flex-1">{children}</div>
      </div>
    </WindowFrame>
  );
}

export type MockupProps = { paused?: boolean; className?: string };
