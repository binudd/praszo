"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { House, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";

import { findVisible, scrollToTarget } from "@/components/motion/smooth-scroll";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { ProductGlyph } from "@/components/ui/product-glyph";
import { ProductLockup } from "@/components/ui/product-lockup";
import { company, demoCta, primaryNav } from "@/data/company";
import { productSections } from "@/data/product-sections";
import { productList, type Product } from "@/data/products";

const groupLabel = "text-[11px] font-bold tracking-[0.16em] text-ink-3 uppercase";
const rowLink = "block rounded-xl py-2.5 text-[15px] font-semibold text-ink transition-colors hover:bg-surface";

export function MobileMenu({ product }: { product?: Product }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.dispatchEvent(new Event(open ? "lenis:stop" : "lenis:start"));
  }, [open]);

  const jumpTo = (id: string) => {
    window.setTimeout(() => {
      const node = findVisible("main")?.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
      if (!node) return;
      history.replaceState(null, "", `#${id}`);
      scrollToTarget(node);
    }, 160);
  };

  const productStyle = product
    ? ({ "--product": product.color, "--product-deep": product.colorDeep } as CSSProperties)
    : undefined;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-bg text-ink lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink/35 backdrop-blur-[2px] data-[state=closed]:animate-[fade-out_0.2s_ease-in] data-[state=open]:animate-[fade-in_0.25s_ease-out]" />
        <Dialog.Content
          data-lenis-prevent
          aria-describedby={undefined}
          style={productStyle}
          className="fixed inset-y-0 right-0 z-[60] flex w-[min(100%,22rem)] flex-col overflow-y-auto bg-bg shadow-float data-[state=closed]:animate-[sheet-out_0.22s_ease-in] data-[state=open]:animate-[sheet-in_0.34s_cubic-bezier(0.22,1,0.36,1)]"
        >
          <VisuallyHidden>
            <Dialog.Title>{product ? `${product.fullName} navigation` : "Site navigation"}</Dialog.Title>
          </VisuallyHidden>
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            {product ? (
              <ProductLockup product={product} size="sm" />
            ) : (
              <Dialog.Close asChild>
                <Link href="/" aria-label="Praszo home">
                  <Logo size="sm" />
                </Link>
              </Dialog.Close>
            )}
            <Dialog.Close
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line"
              aria-label="Close menu"
            >
              <X size={18} />
            </Dialog.Close>
          </div>
          <nav aria-label="Mobile" className="flex flex-1 flex-col gap-8 px-5 py-6">
            {product ? (
              <>
                <div>
                  <p className={groupLabel}>On this page</p>
                  <ul className="mt-3 flex flex-col">
                    {productSections[product.slug].map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className={rowLink}
                          onClick={(event) => {
                            // preventDefault would also cancel Radix's close handler, so close explicitly.
                            event.preventDefault();
                            setOpen(false);
                            jumpTo(item.id);
                          }}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Dialog.Close asChild>
                    <Link href="/" className="inline-flex items-center gap-2 rounded-xl py-2.5 text-[15px] font-bold text-ink">
                      <House size={16} aria-hidden /> Praszo home
                    </Link>
                  </Dialog.Close>
                </div>
              </>
            ) : null}
            <div>
              <p className={groupLabel}>{product ? "Other products" : "Products"}</p>
              <ul className="mt-3 flex flex-col">
                {productList
                  .filter((item) => item.slug !== product?.slug)
                  .map((item) => (
                    <li key={item.slug}>
                      <Dialog.Close asChild>
                        <Link
                          href={`/${item.slug}`}
                          className="flex items-center gap-3 rounded-xl py-2.5 pr-2 transition-colors hover:bg-surface"
                        >
                          <ProductGlyph slug={item.slug} size={36} />
                          <span>
                            <span className="block text-[15px] font-bold text-ink">Praszo {item.name}</span>
                            <span className="block text-[13px] text-ink-2">{item.category}</span>
                          </span>
                        </Link>
                      </Dialog.Close>
                    </li>
                  ))}
              </ul>
            </div>
            {product ? null : (
              <div>
                <p className={groupLabel}>Company</p>
                <ul className="mt-3 flex flex-col">
                  {primaryNav.map((item) => (
                    <li key={item.href}>
                      <Dialog.Close asChild>
                        <Link href={item.href} className={rowLink}>
                          {item.label}
                        </Link>
                      </Dialog.Close>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-auto flex flex-col gap-3 border-t border-line pt-6">
              <Dialog.Close asChild>
                <Button href={demoCta.href} size="lg" variant={product ? "product" : "primary"}>
                  {demoCta.label}
                </Button>
              </Dialog.Close>
              <a
                href={company.phone.href}
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-ink-2"
              >
                <Phone size={16} /> {company.phone.display}
              </a>
            </div>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
