import type { ReactNode } from "react";

import { RevealHeading } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";

export function Section({
  id,
  eyebrow,
  title,
  children,
  className,
  aside,
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  children: ReactNode;
  className?: string;
  aside?: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("border-t border-line px-5 py-20 md:px-10 md:py-28", className)}
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-16">
        <header className="max-w-md">
          {eyebrow ? (
            <p className="mb-4 text-base text-ink-3">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="font-serif text-[clamp(2.1rem,4.6vw,4.6rem)] leading-[1.02] text-ink">
            <RevealHeading>{title}</RevealHeading>
          </h2>
          {aside}
        </header>
        <div>{children}</div>
      </div>
    </section>
  );
}
