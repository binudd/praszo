"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";

import { holdScroll, releaseScroll } from "@/components/motion/smooth-scroll";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { ProductGlyph } from "@/components/ui/product-glyph";
import { company, demoCta } from "@/data/company";
import {
  globalLinks,
  productGroups,
  productMenuLinks,
  resourceLinks,
  solutionLinks,
  type NavItem,
} from "@/data/navigation";
import { products } from "@/data/products";

const rowLink = "block rounded-xl px-2 py-2.5 text-[15px] font-semibold text-ink transition-colors hover:bg-surface";
const subLabel = "label px-2 pt-3 pb-1 text-ink-3";

/** One expandable group (native <details>: keyboard and screen-reader support built in). */
function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="group border-b border-line">
      <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-[17px] font-bold text-ink">
        {title}
        <ChevronDown
          size={18}
          aria-hidden
          className="text-ink-3 transition-transform duration-200 group-open:rotate-180"
        />
      </summary>
      <div className="pb-4">{children}</div>
    </details>
  );
}

function Links({ items }: { items: ReadonlyArray<NavItem> }) {
  return (
    <ul className="flex flex-col">
      {items.map((item) => (
        <li key={item.href}>
          <Dialog.Close asChild>
            <Link href={item.href} className={rowLink}>
              {item.label}
            </Link>
          </Dialog.Close>
        </li>
      ))}
    </ul>
  );
}

/**
 * The global mobile menu (Praszo OS on every route): Products, Solutions, Why Praszo, Resources,
 * Contact, then the coral CTA. Same data as the desktop menus (data/navigation.ts). Product page
 * sections are not here: they live in ProductSubNav's tab strip.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [why, contact] = globalLinks;

  // Hold smooth scrolling while the sheet is open. Releasing on close (or unmount) only drops
  // this menu's own hold, so it can never restart scrolling the splash is still holding.
  useEffect(() => {
    if (!open) return;
    holdScroll("mobile-menu");
    return () => releaseScroll("mobile-menu");
  }, [open]);

  const single = (item: NavItem) => (
    <div className="border-b border-line">
      <Dialog.Close asChild>
        <Link href={item.href} className="block py-4 text-[17px] font-bold text-ink">
          {item.label}
        </Link>
      </Dialog.Close>
    </div>
  );

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="menu-surface inline-flex h-11 w-11 items-center justify-center rounded-full text-ink lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink/35 backdrop-blur-[2px] data-[state=closed]:animate-[fade-out_0.2s_ease-in] data-[state=open]:animate-[fade-in_0.25s_ease-out]" />
        <Dialog.Content
          data-lenis-prevent
          aria-describedby={undefined}
          className="fixed inset-y-0 right-0 z-[60] flex w-[min(100%,22rem)] flex-col overflow-y-auto bg-bg shadow-float data-[state=closed]:animate-[sheet-out_0.22s_ease-in] data-[state=open]:animate-[sheet-in_0.34s_cubic-bezier(0.22,1,0.36,1)]"
        >
          <VisuallyHidden>
            <Dialog.Title>Site navigation</Dialog.Title>
          </VisuallyHidden>
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <Dialog.Close asChild>
              <Link href="/" aria-label="Praszo home">
                <Logo size="sm" />
              </Link>
            </Dialog.Close>
            <Dialog.Close
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line"
              aria-label="Close menu"
            >
              <X size={18} />
            </Dialog.Close>
          </div>
          <nav aria-label="Mobile" className="flex flex-1 flex-col px-5 pt-2 pb-6">
            <Group title="Products">
              {productGroups.map((group) => (
                <div key={group.title}>
                  <p className={subLabel}>{group.title}</p>
                  <ul className="flex flex-col">
                    {group.slugs.map((slug) => (
                      <li key={slug}>
                        <Dialog.Close asChild>
                          <Link
                            href={`/${slug}`}
                            className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-surface"
                          >
                            <ProductGlyph slug={slug} size={32} />
                            <span>
                              <span className="block text-[15px] font-bold text-ink">Praszo {products[slug].name}</span>
                              <span className="block text-[13px] text-ink-2">{products[slug].category}</span>
                            </span>
                          </Link>
                        </Dialog.Close>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <p className={subLabel}>Praszo OS</p>
              <Links items={productMenuLinks} />
            </Group>
            <Group title="Solutions">
              <Links items={solutionLinks} />
            </Group>
            {single(why)}
            <Group title="Resources">
              <Links items={resourceLinks} />
            </Group>
            {single(contact)}
            <div className="mt-auto flex flex-col gap-3 pt-8">
              <Dialog.Close asChild>
                <Button href={demoCta.href} size="lg">
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
