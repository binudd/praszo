import type { ReactNode } from "react";

import { RevealBlock } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** Links under the description. The header already carries "Book a demo", so heroes don't repeat it. */
  actions?: ReactNode;
  /** Second column on large screens (an image, contact details). */
  aside?: ReactNode;
  /** "lg" for short titles, "md" for long ones or when an aside shares the row. */
  size?: "lg" | "md";
  titleId: string;
  className?: string;
  /** Extra content under the actions (e.g. a short note). */
  children?: ReactNode;
};

/**
 * Opening section for company pages (About, solutions, Insights, legal, contact). Light, no surface:
 * eyebrow, h1 from the display scale, a lede and optional actions, with an optional aside column.
 */
export function PageHero({ eyebrow, title, description, actions, aside, size = "lg", titleId, className, children }: Props) {
  return (
    <section aria-labelledby={titleId} className={cn("relative pt-32 pb-16 md:pt-40 md:pb-24", className)}>
      <Container>
        <div className={cn(aside && "grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-20")}>
          <div className={cn(!aside && "max-w-5xl")}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 id={titleId} className={cn("mt-5 text-ink", size === "lg" ? "display-lg" : "display-md")}>
              {title}
            </h1>
            {description || actions || children ? (
              <RevealBlock>
                {description ? <p className="lede mt-6 max-w-2xl">{description}</p> : null}
                {actions ? <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div> : null}
                {children}
              </RevealBlock>
            ) : null}
          </div>
          {aside}
        </div>
      </Container>
    </section>
  );
}
