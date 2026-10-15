"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavDropdown } from "@/components/layout/nav-dropdown";
import { ProductGlyph } from "@/components/ui/product-glyph";
import { productGroups, productMenuLinks } from "@/data/navigation";
import { products } from "@/data/products";

/** Products mega menu: products grouped by what they do, plus Praszo OS links. Data: data/navigation.ts. */
export function ProductsMenu() {
  const pathname = usePathname();
  const current = productGroups.some((group) => group.slugs.some((slug) => pathname === `/${slug}`));
  return (
    <NavDropdown label="Products" current={current}>
      {(close) => (
        <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_14rem]">
          <div className="grid gap-x-2 gap-y-3 sm:grid-cols-3">
            {productGroups.map((group) => (
              <div key={group.title}>
                <p className="label px-3 pt-2 pb-1 text-ink-3">{group.title}</p>
                <ul className="flex flex-col gap-1">
                  {group.slugs.map((slug) => {
                    const product = products[slug];
                    return (
                      <li key={slug}>
                        <Link
                          href={`/${slug}`}
                          onClick={close}
                          aria-current={pathname === `/${slug}` ? "page" : undefined}
                          className="flex items-start gap-3 rounded-[1rem] p-3 transition-colors hover:bg-bg focus-visible:bg-bg aria-[current]:bg-bg"
                        >
                          <ProductGlyph slug={slug} size={36} className="mt-0.5 shrink-0" />
                          <span className="min-w-0">
                            <span className="block text-[15px] font-bold text-ink">{product.name}</span>
                            <span className="mt-1 block text-[13px] leading-snug text-ink-2">{product.tagline}</span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          <ul className="flex flex-col gap-1 rounded-[1rem] bg-bg/60 p-2">
            <li className="label px-3 pt-2 pb-1 text-ink-3">Praszo OS</li>
            {productMenuLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  className="block rounded-[0.8rem] px-3 py-2 transition-colors hover:bg-bg"
                >
                  <span className="block text-sm font-bold text-ink">{item.label}</span>
                  <span className="mt-0.5 block text-[12px] leading-snug text-ink-2">{item.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </NavDropdown>
  );
}
