"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type CSSProperties } from "react";

import { NavDropdown } from "@/components/layout/nav-dropdown";
import { ProductGroupLinks } from "@/components/layout/products-menu";
import { SUBNAV_HANDOVER } from "@/components/product/product-sub-nav";
import { gsap } from "@/components/motion/gsap";
import { findVisible } from "@/components/motion/smooth-scroll";
import { HEADER_EVENT } from "@/components/motion/use-header-reveal";
import { scrollToSection, useSectionSpy } from "@/components/motion/use-section-spy";
import { ProductGlyph } from "@/components/ui/product-glyph";
import { productSections } from "@/data/product-sections";
import { productList } from "@/data/products";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Product pages only: the page's section menu in the global header, next to the Praszo logo (no
 * background): product icon · current section · chevron, opening a mega menu with the page's sections
 * and every Praszo product (ProductGroupLinks, the same data as the Products menu).
 *
 * Two layers, two motions (GSAP on the shared Lenis loop):
 *   inner ("appear")  scrubbed to the in-page section pill (ProductSubNav under the hero) over the same
 *                     range the pill fades itself (SUBNAV_HANDOVER), so the pill visibly hands over to
 *                     the header. This component only reads the pill; it never styles it (the pill is
 *                     page DOM that may not be hydrated yet when the layout's effects run).
 *   outer ("follow")  stays on screen when the header slides away: it cancels the header's vertical
 *                     slide every frame (so it never bobs) and glides left into the logo's place;
 *                     when the header returns it glides back beside the logo.
 * The menu is inert until it is mostly visible. Reduced motion: the same states, without tweening.
 */
export function ProductSectionMenu() {
  const pathname = usePathname();
  const product = productList.find((item) => pathname === `/${item.slug}`);
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const sections = product ? productSections[product.slug] : [];
  const active = useSectionSpy(
    outerRef,
    sections.map((section) => section.id),
    { keepLast: true, resetKey: pathname },
  );

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    const header = outer?.closest<HTMLElement>("header.site-header");
    const logo = outer?.parentElement?.querySelector<HTMLElement>('a[aria-label="Praszo home"]');
    if (!product || !outer || !inner || !header || !logo) return;
    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {});
    inner.inert = true;
    ctx.add(() => gsap.set(inner, { autoAlpha: 0, scale: 0.86, x: -12, transformOrigin: "0% 50%" }));

    // 1. Appear: scrubbed to the in-page pill as it reaches the header.
    const frame = requestAnimationFrame(() => {
      const pill = findVisible("main")?.querySelector<HTMLElement>("[data-product-subnav]");
      if (!pill) return;
      ctx.add(() => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: pill,
            start: SUBNAV_HANDOVER.start,
            end: SUBNAV_HANDOVER.end,
            scrub: reduced ? true : SUBNAV_HANDOVER.scrub,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              inner.inert = self.progress < 0.6;
            },
          },
        });
        tl.to(inner, { autoAlpha: 1, scale: 1, x: 0, ease: "power2.out" }, 0);
      });
    });

    // 2. Follow: stay on screen while the header is hidden, in the logo's place.
    const syncY = () => {
      // The header slides by yPercent + y; cancel exactly that, so the menu stays put vertically.
      const shift =
        (Number(gsap.getProperty(header, "yPercent")) / 100) * header.offsetHeight +
        Number(gsap.getProperty(header, "y"));
      gsap.set(outer, { y: -shift });
    };
    const follow = (hidden: boolean, instant = false) => {
      const x = hidden ? logo.offsetLeft - outer.offsetLeft : 0;
      ctx.add(() =>
        gsap.to(outer, {
          x,
          duration: instant || reduced ? 0 : 0.7,
          ease: "power3.inOut",
          overwrite: "auto",
          onUpdate: syncY,
          onComplete: syncY,
        }),
      );
    };
    follow(header.dataset.headerHidden === "true", true);
    const onHeader = (event: Event) => follow(Boolean((event as CustomEvent<{ hidden: boolean }>).detail?.hidden));
    window.addEventListener(HEADER_EVENT, onHeader);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener(HEADER_EVENT, onHeader);
      ctx.revert();
      inner.inert = false;
    };
  }, [product, pathname]);

  if (!product) return null;
  const current = sections.find((section) => section.id === active) ?? sections[0];

  return (
    <div ref={outerRef} className="relative will-change-transform">
      <div ref={innerRef} className="invisible opacity-0">
        <NavDropdown
          ariaLabel={`${product.fullName} sections, current: ${current.label}`}
          width="36rem"
          align="start"
          buttonClassName="inline-flex h-11 items-center gap-2.5 rounded-full px-1 text-[15px] font-semibold text-ink transition-colors hover:text-ink-2"
          label={
            <>
              <ProductGlyph slug={product.slug} size={28} />
              <span className="hidden flex-col items-start leading-tight sm:flex">
                <span className="text-[11px] font-semibold text-ink-3">{product.fullName}</span>
                <span>{current.label}</span>
              </span>
            </>
          }
        >
          {(close) => (
            // Mega menu: this page's sections, then every Praszo product (same data as the Products menu).
            <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
              <div>
                <p className="label px-3 pt-2 pb-1 text-ink-3">On this page</p>
                <ul className="flex flex-col gap-0.5">
                  {sections.map((section, index) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        aria-current={active === section.id ? "location" : undefined}
                        onClick={(event) => {
                          event.preventDefault();
                          close();
                          scrollToSection(section.id, index);
                        }}
                        style={{ "--product": product.color } as CSSProperties}
                        className="flex items-center justify-between gap-3 rounded-[0.9rem] px-3 py-2.5 text-[15px] font-semibold text-ink-2 transition-colors hover:bg-bg hover:text-ink aria-[current]:bg-bg aria-[current]:text-ink"
                      >
                        {section.label}
                        {active === section.id ? (
                          <span aria-hidden className="h-2 w-2 rounded-full bg-product" />
                        ) : null}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[1rem] bg-bg/60 p-1 pb-2">
                <ProductGroupLinks variant="compact" onNavigate={close} />
              </div>
            </div>
          )}
        </NavDropdown>
      </div>
    </div>
  );
}
