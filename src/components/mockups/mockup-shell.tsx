import type { ReactNode } from "react";

import { WindowFrame } from "@/components/mockups/window-frame";
import { cn } from "@/lib/cn";

/**
 * Shared chrome for the animated product mockups. The window body is a flat
 * "desk" (`bg-elevated`) and everything on it is a borderless white card, so
 * the UI reads through contrast alone, the same way the site's menu surfaces
 * and scene tabs do. Children get the remaining height and should clip their
 * own overflow.
 */
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
      <div className="flex h-full flex-col bg-elevated">
        {meta.length ? (
          <ul className="flex shrink-0 flex-wrap items-center gap-1.5 px-3 pt-3">
            {meta.map((item) => (
              <li key={item} className="rounded-full bg-bg px-2 py-0.5 text-[10px] font-semibold text-ink-2">
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
