"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

import { MobileMenu } from "@/components/layout/mobile-menu";
import { LinkMenu } from "@/components/layout/nav-dropdown";
import { navLinkClass } from "@/components/layout/nav-styles";
import { ProductSectionMenu } from "@/components/layout/product-section-menu";
import { ProductsMenu } from "@/components/layout/products-menu";
import { useHeaderReveal } from "@/components/motion/use-header-reveal";
import { useNavFollower } from "@/components/motion/use-nav-follower";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { demoCta } from "@/data/company";
import { globalLinks, resourceLinks, solutionLinks } from "@/data/navigation";

/**
 * The Praszo OS global header, identical on every route (the parent brand never changes per page):
 * logo · Products ▾ · Solutions ▾ · Why Praszo · Resources ▾ · Contact · Book a demo (coral).
 * Product pages add their own section pill under the hero (ProductSubNav). It slides away while scrolling down and
 * returns on scroll up (useHeaderReveal), announcing that through HEADER_EVENT.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement | null>(null);
  const pillRef = useRef<HTMLSpanElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  useHeaderReveal(headerRef, { resetKey: pathname });
  useNavFollower(navRef, pillRef, pathname);

  const [why, contact] = globalLinks;
  const linkItem = (item: (typeof globalLinks)[number]) => (
    <Link
      key={item.href}
      href={item.href}
      aria-current={pathname === item.href ? "page" : undefined}
      className={navLinkClass}
    >
      {item.label}
    </Link>
  );

  return (
    <header
      ref={headerRef}
      className="site-header pointer-events-none fixed inset-x-0 top-1 z-50 will-change-transform"
    >
      {/* Large screens: three columns, so the nav pill sits at the page centre whatever the side groups hold. */}
      <div className="mx-auto flex h-[4.5rem] w-full max-w-wide items-center justify-between gap-4 px-5 md:px-8 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:px-10 [&>*]:pointer-events-auto">
        <div className="flex min-w-0 items-center gap-3 sm:gap-5">
          <Link href="/" aria-label="Praszo home" className="inline-flex min-h-11 shrink-0 items-center">
            <Logo />
          </Link>
          {/* Product pages: the page's section menu, once the in-page section pill has scrolled away. */}
          <ProductSectionMenu />
        </div>

        <nav
          ref={navRef}
          aria-label="Primary"
          className="menu-surface relative isolate hidden items-center gap-0.5 rounded-full p-1.5 transition-[background-color] duration-500 lg:flex"
        >
          <span
            ref={pillRef}
            aria-hidden
            className="absolute top-0 left-0 -z-10 rounded-full bg-[var(--nav-pill)] opacity-0 shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
          />
          <ProductsMenu />
          <LinkMenu label="Solutions" items={solutionLinks} />
          {linkItem(why)}
          <LinkMenu label="Resources" items={resourceLinks} />
          {linkItem(contact)}
        </nav>

        <div className="flex items-center gap-3 lg:justify-self-end">
          {/* The site's one persistent "Book a demo", always the coral brand button. */}
          <Button href={demoCta.href} size="sm" className="max-sm:h-9 max-sm:px-3.5 max-sm:text-[13px]">
            {demoCta.label}
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
