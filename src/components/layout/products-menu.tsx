"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavDropdown } from "@/components/layout/nav-dropdown";
import { ProductGlyph } from "@/components/ui/product-glyph";
import { productGroups, productMenuLinks } from "@/data/navigation";
import { products } from "@/data/products";
import { cn } from "@/lib/cn";

/**
 * The grouped product links (data/navigation.ts), shared by the Products mega menu and the product
 * section menu. "full": three group columns, glyph + name + tagline. "compact": one stacked column,
 * glyph + name + category, for a narrower side column.
 */
export function ProductGroupLinks({
  variant = "full",
  onNavigate,
}: {
  variant?: "full" | "compact";
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const compact = variant === "compact";
  return (
    <div className={cn("grid gap-x-2", compact ? "gap-y-1" : "gap-y-3 sm:grid-cols-3")}>
      {productGroups.map((group) => (
        <div key={group.title}>
          <p className={"label px-3 pt-2 pb-1 text-ink-3"}>{group.title}</p>
          <ul className="flex flex-col gap-0.5">
            {group.slugs.map((slug) => {
              const product = products[slug];
              return (
                <li key={slug}>
                  <Link
                    href={`/${slug}`}
                    onClick={onNavigate}
                    aria-current={pathname === `/${slug}` ? "page" : undefined}
                    className={cn(
                      "flex items-start rounded-[1rem] transition-colors hover:bg-bg focus-visible:bg-bg aria-[current]:bg-bg",
                      compact ? "items-center gap-2.5 px-3 py-2" : "gap-3 p-3",
                    )}
                  >
                    <ProductGlyph
                      slug={slug}
                      size={compact ? 28 : 36}
                      className={cn("shrink-0", !compact && "mt-0.5")}
                    />
                    <span className="min-w-0">
                      <span className={cn("block font-bold text-ink", compact ? "text-sm" : "text-[15px]")}>
                        {product.name}
                      </span>
                      <span
                        className={cn(
                          "block text-ink-2",
                          compact ? "text-[12px] leading-snug" : "mt-1 text-[13px] leading-snug",
                        )}
                      >
                        {compact ? product.category : product.tagline}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** Products mega menu: products grouped by what they do, plus Praszo OS links. Data: data/navigation.ts. */
export function ProductsMenu() {
  const pathname = usePathname();
  const current = productGroups.some((group) => group.slugs.some((slug) => pathname === `/${slug}`));
  return (
    <NavDropdown label="Products" current={current}>
      {(close) => (
        <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_14rem]">
          <ProductGroupLinks onNavigate={close} />
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
