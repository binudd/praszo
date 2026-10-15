"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type MouseEvent, type RefObject } from "react";

import { MobileMenu } from "@/components/layout/mobile-menu";
import { navLinkClass } from "@/components/layout/nav-styles";
import { ProductsMenu } from "@/components/layout/products-menu";
import { gsap, ScrollTrigger } from "@/components/motion/gsap";
import { findVisible, scrollToTarget } from "@/components/motion/smooth-scroll";
import { useHeaderReveal } from "@/components/motion/use-header-reveal";
import { Button } from "@/components/ui/button";
import { BrandMark, Logo } from "@/components/ui/logo";
import { ProductLockup } from "@/components/ui/product-lockup";
import { demoCta, primaryNav } from "@/data/company";
import { productSections } from "@/data/product-sections";
import { productList, type Product } from "@/data/products";
import { cn } from "@/lib/cn";
import { prefersReducedMotion } from "@/lib/motion";

const homeSectionIds = primaryNav
  .filter((item) => item.href.startsWith("/#"))
  .map((item) => item.href.slice(2));

function productForPath(pathname: string): Product | undefined {
  return productList.find((product) => pathname === `/${product.slug}`);
}

/**
 * The sliding highlight behind the current nav item: one element GSAP moves and resizes to the item
 * with aria-current (re-measured on resize), fading out when nothing is current. Instant under
 * reduced motion and on its first placement.
 */
function useNavFollower(navRef: RefObject<HTMLElement | null>, pillRef: RefObject<HTMLSpanElement | null>, key: string) {
  useLayoutEffect(() => {
    const nav = navRef.current;
    const pill = pillRef.current;
    if (!nav || !pill) return;
    const place = (animate: boolean) => {
      const item = nav.querySelector<HTMLElement>(":scope > [aria-current], :scope > * > [aria-current]");
      const instant = !animate || prefersReducedMotion() || Number(gsap.getProperty(pill, "opacity")) === 0;
      if (!item || item.offsetParent === null) {
        gsap.to(pill, { opacity: 0, duration: instant ? 0 : 0.2, overwrite: true });
        return;
      }
      const box = { x: item.offsetLeft, y: item.offsetTop, width: item.offsetWidth, height: item.offsetHeight };
      gsap.to(pill, { ...box, opacity: 1, duration: instant ? 0 : 0.45, ease: "power3.out", overwrite: true });
    };
    place(true);
    const resize = new ResizeObserver(() => place(false));
    resize.observe(nav);
    return () => resize.disconnect();
  }, [navRef, pillRef, key]);
}

/**
 * One floating header for the whole site. On a product page it takes on the
 * product identity: the lockup replaces the logo and the pill lists that page's
 * sections with a "Praszo home" link. Colors follow the document theme. It
 * slides away while scrolling down and returns on scroll up (useHeaderReveal).
 */
export function SiteHeader() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement | null>(null);
  const pillRef = useRef<HTMLSpanElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  useHeaderReveal(headerRef, { resetKey: pathname });
  const [section, setSection] = useState<string | null>(null);
  const product = productForPath(pathname);
  const isHome = pathname === "/";
  const spyIds = product ? productSections[product.slug].map((item) => item.id) : isHome ? homeSectionIds : [];
  const spyKey = spyIds.join("|");
  const activeSection = spyKey ? section : null;
  useNavFollower(navRef, pillRef, `${pathname}|${activeSection ?? ""}`);

  // Scroll-spy: the section covering a line 40% down the viewport is current (the last such
  // section in page order wins). One ScrollTrigger per section, driven by the shared Lenis loop,
  // fires only when a section crosses that line; no per-frame measuring. Works for pinned and
  // multi-screen sections, unlike intersection ratios.
  useEffect(() => {
    if (!spyKey) return;
    const root = findVisible("main") ?? document;
    const entries = spyKey
      .split("|")
      .map((id) => ({ id, node: root.querySelector<HTMLElement>(`#${CSS.escape(id)}`) }))
      .filter((entry): entry is { id: string; node: HTMLElement } => Boolean(entry.node));

    // Declared before the triggers exist: ScrollTrigger can fire onToggle synchronously inside create().
    let triggers: ScrollTrigger[] = [];
    const update = () => {
      let current: string | null = null;
      triggers.forEach((trigger, index) => {
        if (trigger.isActive) current = entries[index].id;
      });
      setSection((previous) => (previous === current ? previous : current));
    };
    triggers = entries.map(({ node }) =>
      ScrollTrigger.create({ trigger: node, start: "top 40%", end: "bottom 20%", refreshPriority: -1, onToggle: update }),
    );
    const frame = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(frame);
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [spyKey, pathname]);

  const onHomeHashClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!isHome || !href.startsWith("/#")) return;
    event.preventDefault();
    const hash = href.slice(1);
    history.pushState(null, "", hash);
    scrollToTarget(hash);
  };

  const onSectionClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const node = findVisible("main")?.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
    if (!node) return;
    history.replaceState(null, "", `#${id}`);
    scrollToTarget(node);
  };

  const productStyle = product
    ? ({ "--product": product.color, "--product-deep": product.colorDeep } as CSSProperties)
    : undefined;

  const pillClass = "menu-surface hidden items-center gap-0.5 rounded-full p-1.5 transition-[background-color] duration-500 lg:flex";

  return (
    <header
      ref={headerRef}
      style={productStyle}
      className="site-header pointer-events-none fixed inset-x-0 top-1 z-50 will-change-transform"
    >
      <div className="mx-auto flex h-[4.5rem] w-full max-w-wide items-center justify-between gap-4 px-5 md:px-8 lg:px-10 [&>*]:pointer-events-auto">
        {product ? (
          <Link
            href={`/${product.slug}`}
            aria-label={`${product.fullName} overview`}
            className="inline-flex items-center"
            onClick={(event) => {
              event.preventDefault();
              scrollToTarget(0);
            }}
          >
            <ProductLockup product={product} size="sm" />
          </Link>
        ) : (
          <Link href="/" aria-label="Praszo home" className="inline-flex items-center">
            <Logo />
          </Link>
        )}

        <nav ref={navRef} aria-label="Primary" className={cn(pillClass, "relative isolate")}>
          <span
            ref={pillRef}
            aria-hidden
            className="absolute top-0 left-0 -z-10 rounded-full bg-bg opacity-0 shadow-[0_1px_2px_rgba(0,0,0,0.08)] dark:bg-surface"
          />
          {product ? (
            <>
              <Link href="/" aria-label="Praszo home" className={cn(navLinkClass, "gap-2 text-ink")}>
                <BrandMark className="h-4 w-auto" />
                Home
              </Link>
              {productSections[product.slug].map((item) => {
                const current = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    aria-current={current ? "location" : undefined}
                    className={cn(navLinkClass, current && "text-product-deep dark:text-ink")}
                    onClick={(event) => onSectionClick(event, item.id)}
                  >
                    {item.label}
                  </a>
                );
              })}
            </>
          ) : (
            <>
              <ProductsMenu />
              {primaryNav.map((item) => {
                const id = item.href.startsWith("/#") ? item.href.slice(2) : null;
                const current = id ? isHome && activeSection === id : pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={current || undefined}
                    className={navLinkClass}
                    onClick={(event) => onHomeHashClick(event, item.href)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {product ? (
            <div className="hidden xl:block">
              <ProductsMenu align="end" />
            </div>
          ) : null}
          {/* The site's one persistent "Book a demo" (hero sections no longer repeat it), so it shows on every screen size. */}
          <Button href={demoCta.href} size="sm" variant={product ? "product" : "primary"} className="max-sm:h-9 max-sm:px-3.5 max-sm:text-[13px]">
            {demoCta.label}
          </Button>
          <MobileMenu product={product} />
        </div>
      </div>
    </header>
  );
}
