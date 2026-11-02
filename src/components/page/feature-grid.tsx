import { RevealGroup } from "@/components/motion/reveal";
import { EditorialItem } from "@/components/ui/editorial-item";
import type { FeatureItem } from "@/data/pages/types";
import { cn } from "@/lib/cn";

type Props = {
  items: ReadonlyArray<FeatureItem>;
  /** 2 for pairs (mission and vision), 3 for longer lists. */
  columns?: 2 | 3;
  size?: "display" | "heading";
  numbered?: boolean;
  className?: string;
};

/** Grid of EditorialItems (rule, icon, title, body) that staggers in. */
export function FeatureGrid({ items, columns = 3, size = "heading", numbered = false, className }: Props) {
  return (
    <RevealGroup>
      <ul
        className={cn(
          "grid gap-x-10 gap-y-12",
          columns === 2 ? "md:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
          className,
        )}
      >
        {items.map((item, index) => (
          <EditorialItem
            key={item.title}
            as="li"
            reveal
            size={size}
            icon={item.icon}
            index={numbered ? index : undefined}
            title={item.title}
            body={item.body}
          />
        ))}
      </ul>
    </RevealGroup>
  );
}
