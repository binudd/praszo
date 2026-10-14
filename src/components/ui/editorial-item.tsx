import type { ReactNode } from "react";

import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/lib/icons";
import { cn } from "@/lib/cn";

type Props = {
  title: ReactNode;
  body?: ReactNode;
  /** Shown as a zero-padded label ("01") on the rule line. */
  index?: number;
  icon?: IconName;
  /**
   * "display": section-scale sets of 2–3 items (display-sm title, lede body).
   * "heading": rails, lists and dense grids (heading title, copy body).
   */
  size?: "display" | "heading";
  /** Icon colour: brand coral, or the current product colour. */
  tone?: "brand" | "product";
  as?: "article" | "li" | "div";
  titleAs?: "h2" | "h3" | "h4";
  /** Adds data-reveal so a surrounding RevealGroup staggers it in. */
  reveal?: boolean;
  className?: string;
  children?: ReactNode;
};

/**
 * The site's one pattern for a titled item: no card surface, just a hairline rule on top, a label
 * row (index and/or icon), a title from the type scale and a body. Used by pillars, highlights,
 * audience, feature lists and the card rails so they all read the same.
 */
export function EditorialItem({
  title,
  body,
  index,
  icon,
  size = "heading",
  tone = "brand",
  as: Tag = "article",
  titleAs: Title = "h3",
  reveal,
  className,
  children,
}: Props) {
  const display = size === "display";
  return (
    <Tag data-reveal={reveal || undefined} className={cn("border-t border-line-strong", display ? "pt-6" : "pt-5", className)}>
      {index !== undefined || icon ? (
        <p className="label flex items-center gap-3 text-ink-3">
          {index !== undefined ? <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span> : null}
          {icon ? <Icon name={icon} size={18} className={tone === "product" ? "text-product-deep dark:text-product" : "text-brand"} aria-hidden /> : null}
        </p>
      ) : null}
      <Title className={cn("text-ink", display ? "display-sm mt-6" : "heading mt-4")}>{title}</Title>
      {body ? <p className={cn(display ? "lede mt-4" : "copy mt-3")}>{body}</p> : null}
      {children}
    </Tag>
  );
}
