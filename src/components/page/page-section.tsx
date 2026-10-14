import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/cn";

type Props = {
  /** Section anchor; the heading gets `${id}-title`. Must be unique across routes (routes stay mounted). */
  id: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  children: ReactNode;
  className?: string;
};

/** A titled content section: hairline top rule, SectionHeader, then the content. */
export function PageSection({ id, eyebrow, title, description, align, children, className }: Props) {
  const titleId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={titleId} className={cn("relative scroll-mt-24 border-t border-line py-20 md:py-28", className)}>
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} description={description} align={align} titleId={titleId} />
        <div className="mt-12 md:mt-16">{children}</div>
      </Container>
    </section>
  );
}
