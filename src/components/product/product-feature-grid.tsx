import { HorizontalCard, HorizontalScroll } from "@/components/motion/horizontal-scroll";
import { RevealGroup, RevealHeading } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { EditorialItem } from "@/components/ui/editorial-item";
import { ProductFeatureGroups } from "@/components/product/product-feature-groups";
import type { FeatureGroup, FeatureSection, Product } from "@/data/products";

function RailCard({ item, index }: { item: FeatureGroup["items"][number]; index: number }) {
  return (
    <HorizontalCard className="w-[min(18rem,76vw)] md:w-[20rem]">
      <EditorialItem as="div" index={index} icon={item.icon} tone="product" title={item.name} body={item.description} />
    </HorizontalCard>
  );
}

function GroupBlock({ group, index }: { group: FeatureGroup; index: number }) {
  return (
    <RevealGroup className="grid gap-8 border-t border-line-strong py-12 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] lg:gap-14">
      <div data-reveal>
        <p className="label text-ink-3">{String(index + 1).padStart(2, "0")}</p>
        <h3 className="display-sm mt-5 text-ink">{group.title}</h3>
        {group.description ? <p className="copy mt-3 max-w-sm">{group.description}</p> : null}
      </div>
      <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
        {group.items.map((item) => (
          <EditorialItem key={item.name} as="li" reveal icon={item.icon} tone="product" titleAs="h4" title={item.name} body={item.description} />
        ))}
      </ul>
    </RevealGroup>
  );
}

/**
 * Single-group sections become a dark "build" rail with a giant overlapping title;
 * multi-group sections keep an editorial grouped layout.
 */
export function ProductFeatureGrid({ product, section }: { product: Product; section: FeatureSection }) {
  const id = `${product.slug}-${section.id}`;
  const single = section.groups.length === 1;

  if (single) {
    return (
      <HorizontalScroll
        id={id}
        theme="dark"
        label={section.title}
        header={
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow tone="product" className="justify-center">
              {section.eyebrow}
            </Eyebrow>
            <h2 id={`${id}-title`} className="display-md mt-4 text-ink">
              <RevealHeading>{section.title}</RevealHeading>
            </h2>
            {section.description ? <p className="lede mt-5">{section.description}</p> : null}
          </div>
        }
      >
        {section.groups[0].items.map((item, index) => (
          <RailCard key={item.name} item={item} index={index} />
        ))}
      </HorizontalScroll>
    );
  }

  // Multi-group: a sticky scroll scene on desktop; the editorial group list is its stacked fallback.
  // The fallback heading carries no id: the scene's heading owns `${id}-title`.
  return (
    <ProductFeatureGroups
      id={id}
      section={section}
      fallback={
        <Container className="py-24 md:py-32">
          <div className="max-w-3xl">
            <Eyebrow tone="product">{section.eyebrow}</Eyebrow>
            <h2 className="display-md mt-4 text-ink">
              <RevealHeading>{section.title}</RevealHeading>
            </h2>
            {section.description ? <p className="lede mt-5">{section.description}</p> : null}
          </div>
          <div className="mt-14 border-b border-line">
            {section.groups.map((group, index) => (
              <GroupBlock key={group.title} group={group} index={index} />
            ))}
          </div>
        </Container>
      }
    />
  );
}
