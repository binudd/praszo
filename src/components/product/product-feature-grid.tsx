import { ChevronRight } from "lucide-react";

import { DragRail } from "@/components/motion/drag-rail";
import { RevealGroup, RevealHeading } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Icon } from "@/components/ui/icon";
import type { FeatureGroup, FeatureSection, Product } from "@/data/products";

const railPadding = { paddingLeft: "max(1.25rem, calc((100vw - 86rem) / 2 + 2.5rem))", paddingRight: "2.5rem" };

function RailCard({ item, index }: { item: FeatureGroup["items"][number]; index: number }) {
  return (
    <li className="flex min-h-[21rem] w-[18rem] flex-col rounded-card border border-line bg-surface p-5 transition-colors duration-500 hover:bg-elevated md:w-[20rem]">
      <div className="flex h-28 items-center justify-center rounded-sm bg-elevated text-product">
        <Icon name={item.icon} size={38} strokeWidth={1.5} aria-hidden />
      </div>
      <p className="label mt-5 text-ink-3">{String(index + 1).padStart(2, "0")}</p>
      <h3 className="mt-1.5 text-lg text-ink">{item.name}</h3>
      {item.description ? <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{item.description}</p> : null}
      <div className="mt-auto flex justify-end pt-5">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-3">
          <ChevronRight size={14} aria-hidden />
        </span>
      </div>
    </li>
  );
}

function CompactItem({ item }: { item: FeatureGroup["items"][number] }) {
  return (
    <li data-reveal className="flex items-center gap-3 rounded-sm border border-line bg-bg px-4 py-3 text-[15px] font-semibold text-ink">
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-product-soft text-product-deep">
        <Icon name={item.icon} size={16} aria-hidden />
      </span>
      <span>
        {item.name}
        {item.description ? <span className="block text-[13px] font-medium text-ink-3">{item.description}</span> : null}
      </span>
    </li>
  );
}

function GroupBlock({ group, index }: { group: FeatureGroup; index: number }) {
  const compact = group.items.every((item) => !item.description || item.description.length < 40);
  return (
    <RevealGroup className="grid gap-6 border-t border-line py-12 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] lg:gap-14">
      <div data-reveal>
        <p className="label text-ink-3">{String(index + 1).padStart(2, "0")}</p>
        <span className="mt-4 inline-flex h-12 w-12 items-center justify-center rounded-sm bg-product-soft text-product-deep">
          <Icon name={group.icon} size={24} aria-hidden />
        </span>
        <h3 className="display-sm mt-5 text-ink">{group.title}</h3>
        {group.description ? <p className="mt-3 max-w-sm text-[15.5px] leading-relaxed text-ink-2">{group.description}</p> : null}
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {group.items.map((item) =>
          compact ? (
            <CompactItem key={item.name} item={item} />
          ) : (
            <li
              key={item.name}
              data-reveal
              className="rounded-card border border-line bg-bg p-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-product/40 hover:shadow-float"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-product-soft text-product-deep">
                <Icon name={item.icon} size={20} aria-hidden />
              </span>
              <h4 className="mt-5 text-[17px] text-ink">{item.name}</h4>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{item.description}</p>
            </li>
          ),
        )}
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
      <section id={id} data-theme="dark" aria-labelledby={`${id}-title`} className="relative overflow-hidden py-24 md:py-32">
        <Container wide>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow tone="product" className="justify-center">
              {section.eyebrow}
            </Eyebrow>
            {section.description ? <p className="lede mt-5">{section.description}</p> : null}
          </div>
          <h2 id={`${id}-title`} className="display-lg mx-auto mt-10 max-w-[16ch] text-center text-ink">
            <RevealHeading>{section.title}</RevealHeading>
          </h2>
        </Container>
        <DragRail className="relative z-10 mt-[-0.45em] pb-6" style={railPadding} aria-label={section.title}>
          <ul className="contents">
            {section.groups[0].items.map((item, index) => (
              <RailCard key={item.name} item={item} index={index} />
            ))}
          </ul>
        </DragRail>
      </section>
    );
  }

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-24 md:py-32">
      <Container wide>
        <div className="max-w-3xl">
          <Eyebrow tone="product">{section.eyebrow}</Eyebrow>
          <h2 id={`${id}-title`} className="display-md mt-4 text-ink">
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
    </section>
  );
}
