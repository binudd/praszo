import type { ReactNode } from "react";

import { RevealHeading } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "brand" | "product" | "muted" | "inverse";
  as?: "h1" | "h2" | "h3";
  size?: "md" | "lg";
  className?: string;
  titleId?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "brand",
  as: Heading = "h2",
  size = "md",
  className,
  titleId,
}: Props) {
  const inverse = tone === "inverse";
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <Heading
        id={titleId}
        className={cn(
          "mt-4",
          size === "lg" ? "display-md" : "display-sm",
          inverse ? "text-white" : "text-ink",
        )}
      >
        <RevealHeading>{title}</RevealHeading>
      </Heading>
      {description ? (
        <p
          className={cn("lede mt-5", inverse && "text-white/80")}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
