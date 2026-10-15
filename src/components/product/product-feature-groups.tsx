"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";

import { applySceneItems, scrollToSceneStep, useScene } from "@/components/motion/use-scene";
import { RevealHeading } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { EditorialItem } from "@/components/ui/editorial-item";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Icon } from "@/components/ui/icon";
import type { FeatureSection } from "@/data/products";

type Props = {
  id: string;
  section: FeatureSection;
  /** Stacked layout for phones, tablets, reduced motion and no JS (the editorial group list). */
  fallback: ReactNode;
};

/**
 * Multi-group feature sections (Practice, Modifi) as a sticky scroll scene, built on the same
 * primitives as the homepage products scene (useScene + applySceneItems on the shared Lenis loop):
 *   left   eyebrow, title and the groups as numbered tabs; the current one expands with its
 *          description and a product-coloured line fills as the visitor scrolls through the groups;
 *   right  one panel per group crossfading in place: group icon, title, description, and its
 *          features, which stagger in (CSS, .feature-scene) when the panel becomes current.
 * Tabs jump to their step. Below 1024px or with reduced motion the stacked fallback renders instead.
 */
export function ProductFeatureGroups({ id, section, fallback }: Props) {
  const rootRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const count = section.groups.length;

  useScene(rootRef, {
    count,
    onUpdate: (progress, t, index, set) => {
      const stage = stageRef.current;
      if (!stage) return;
      applySceneItems(stage, t, index, 0.5, 26, set);
      stage.querySelectorAll<HTMLElement>("[data-scene-item]").forEach((panel, panelIndex) => {
        panel.classList.toggle("is-current", panelIndex === index);
      });
      const fill = stage.querySelector<HTMLElement>("[data-feature-progress]");
      if (fill) set(fill, { scaleY: Math.max(0.04, progress) });
    },
  });

  return (
    <section ref={rootRef} id={id} aria-labelledby={`${id}-title`} className="feature-scene scene relative">
      <div data-scene-track className="scene-track" style={{ height: `${count * 90 + 40}svh` }}>
        <div ref={stageRef} data-scene-stage className="scene-stage">
          <Container className="w-full">
            <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
              <div>
                <Eyebrow tone="product">{section.eyebrow}</Eyebrow>
                <h2 id={`${id}-title`} className="display-md mt-4 text-ink">
                  <RevealHeading>{section.title}</RevealHeading>
                </h2>
                {section.description ? (
                  <p className="copy mt-4 max-w-md [@media(max-height:820px)]:hidden">{section.description}</p>
                ) : null}

                <div className="relative mt-10 pl-6">
                  <span aria-hidden className="absolute top-1 bottom-1 left-0 w-px bg-line" />
                  <span
                    aria-hidden
                    data-feature-progress
                    className="absolute top-1 bottom-1 left-0 w-px origin-top scale-y-[0.04] bg-product"
                  />
                  <ol className="flex flex-col gap-1" aria-label={`${section.eyebrow} groups`}>
                    {section.groups.map((group, index) => (
                      <li key={group.title} data-scene-tab className="group">
                        <button
                          type="button"
                          onClick={() => scrollToSceneStep(rootRef.current, index, count)}
                          className="flex w-full items-baseline gap-3 py-1.5 text-left"
                        >
                          <span className="label text-ink-3 tabular-nums transition-colors duration-300 group-[.is-current]:text-product-deep">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="heading text-ink-3 transition-colors duration-300 group-[.is-current]:text-ink">
                            {group.title}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="relative min-h-[30rem]">
                {section.groups.map((group, index) => (
                  <div key={group.title} data-scene-item className="scene-item flex flex-col justify-center">
                    <div className="flex items-center gap-4">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-product-soft text-product-deep">
                        <Icon name={group.icon} size={22} aria-hidden />
                      </span>
                      <span className="label text-ink-3 tabular-nums">
                        {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="display-sm mt-6 text-ink">{group.title}</h3>
                    {group.description ? <p className="copy mt-3 max-w-xl">{group.description}</p> : null}
                    <ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                      {group.items.map((item, itemIndex) => (
                        <EditorialItem
                          key={item.name}
                          as="li"
                          icon={item.icon}
                          tone="product"
                          titleAs="h4"
                          title={item.name}
                          body={item.description}
                          className="feature-row"
                          // Stagger order for the CSS entrance (.feature-scene .feature-row).
                          style={{ "--i": itemIndex } as CSSProperties}
                        />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </div>

      <div className="scene-stack">{fallback}</div>
    </section>
  );
}
