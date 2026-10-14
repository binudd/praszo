"use client";

import { House } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type CSSProperties, type MouseEvent } from "react";

import { MobileMenu } from "@/components/layout/mobile-menu";
import { navLinkClass } from "@/components/layout/nav-styles";
import { ProductsMenu } from "@/components/layout/products-menu";
import { findVisible, scrollToTarget } from "@/components/motion/smooth-scroll";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { ProductLockup } from "@/components/ui/product-lockup";
import { demoCta, primaryNav } from "@/data/company";
import { productSections } from "@/data/product-sections";
import { productList, type Product } from "@/data/products";
import { cn } from "@/lib/cn";

const homeSectionIds = primaryNav
  .filter((item) => item.href.startsWith("/#"))
  .map((item) => item.href.slice(2));

export function productForPath(pathname: string): Product | undefined {
  return productList.find((product) => pathname === `/${product.slug}`);
}

/** The sliding highlight behind the current pill item. */
function Follower({ active, reduced }: { active: boolean; reduced: boolean | null }) {
  if (!active) return null;
  return (
    <motion.span
      layoutId="nav-follower"
      aria-hidden
      transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 38, mass: 0.6 }}
      className="absolute inset-0 -z-10 rounded-full bg-bg shadow-[0_1px_2px_rgba(0,0,0,0.06)] dark:bg-elevated"
    />
  );
}

/**
 * One floating header for the whole site. On a product page it takes on the
 * product identity: the lockup replaces the logo and the pill lists that page's
 * sections with a "Praszo home" link. Colors follow the document theme.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [section, setSection] = useState<string | null>(null);
  const product = productForPath(pathname);
  const isHome = pathname === "/";
  const spyIds = product ? productSections[product.slug].map((item) => item.id) : isHome ? homeSectionIds : [];
  const spyKey = spyIds.join("|");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!spyKey) return;
    const root = findVisible("main") ?? document;
    const nodes = spyKey
      .split("|")
      .map((id) => root.querySelector<HTMLElement>(`#${CSS.escape(id)}`))
      .filter((node): node is HTMLElement => Boolean(node));
    if (nodes.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.05, 0.25, 0.5] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
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

  const pillClass = cn(
    "hidden items-center gap-0.5 rounded-full p-1.5 transition-[background-color,box-shadow,border-color] duration-500 lg:flex",
    scrolled ? "glass shadow-card" : "border border-transparent bg-surface/70",
  );

  return (
    <header
      style={productStyle}
      className={cn(
        "site-header fixed inset-x-0 top-1 z-50 transition-[background-color,border-color] duration-300",
        scrolled && "max-lg:border-b max-lg:border-line max-lg:bg-bg/85 max-lg:backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-[4.5rem] w-full max-w-wide items-center justify-between gap-4 px-5 md:px-8 lg:px-10">
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

        <nav aria-label="Primary" className={pillClass}>
          {product ? (
            <>
              <Link href="/" className={cn(navLinkClass, "text-ink")}>
                <House size={15} aria-hidden />
                Praszo home
              </Link>
              {productSections[product.slug].map((item) => {
                const current = section === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    aria-current={current ? "location" : undefined}
                    className={cn(navLinkClass, current && "text-product-deep dark:text-ink")}
                    onClick={(event) => onSectionClick(event, item.id)}
                  >
                    <Follower active={current} reduced={reduced} />
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
                const current = id ? isHome && section === id : pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={current || undefined}
                    className={navLinkClass}
                    onClick={(event) => onHomeHashClick(event, item.href)}
                  >
                    <Follower active={Boolean(current)} reduced={reduced} />
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
              <ProductsMenu />
            </div>
          ) : null}
          <Button href={demoCta.href} size="sm" variant={product ? "product" : "primary"} className="hidden sm:inline-flex">
            {demoCta.label}
          </Button>
          <MobileMenu product={product} />
        </div>
      </div>
    </header>
  );
}
