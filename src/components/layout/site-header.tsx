"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";

import { getLenis } from "@/components/motion/smooth-scroll";
import { navItems, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { ANCHOR_OFFSET } from "@/lib/motion";

const hashIds = navItems.filter((item) => item.href.includes("#")).map((item) => item.id);

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState("work");
  const reduced = useReducedMotion();
  const active = pathname === "/story" ? "story" : section;

  useEffect(() => {
    const root = document.querySelector(".site-header");
    if (reduced) {
      root?.classList.add("is-static");
      return;
    }
    const fallback = window.setTimeout(() => root?.classList.add("is-ready"), 900);
    return () => window.clearTimeout(fallback);
  }, [reduced]);

  useEffect(() => {
    window.dispatchEvent(new Event(open ? "lenis:stop" : "lenis:start"));
  }, [open]);

  const goToHash = (href: string) => {
    const hash = href.includes("#") ? `#${href.split("#")[1]}` : href;
    setOpen(false);
    window.setTimeout(() => {
      const lenis = getLenis();
      if (lenis) {
        lenis.start();
        lenis.scrollTo(hash, { offset: ANCHOR_OFFSET });
      } else {
        document.querySelector(hash)?.scrollIntoView();
      }
    }, 80);
  };

  useEffect(() => {
    if (pathname !== "/") return;
    const hash = window.location.hash;
    if (hash) {
      const timer = window.setTimeout(() => goToHash(hash), 160);
      return () => window.clearTimeout(timer);
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;
    const syncHash = () => {
      const id = window.location.hash.replace("#", "");
      const known = hashIds.find((item) => item === id);
      if (known) setSection(known);
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;
    const nodes = hashIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setSection(visible.target.id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.3, 0.6] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);

  const onNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.includes("#") || href.endsWith(".pdf")) return;
    event.preventDefault();
    const id = href.split("#")[1];
    const hash = `#${id}`;
    const known = hashIds.find((item) => item === id);
    if (known) setSection(known);
    if (pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }
    history.pushState(null, "", hash);
    goToHash(href);
  };

  const linkHref = (href: string) => {
    if (!href.includes("#") || href.endsWith(".pdf")) return href;
    return { pathname: "/" as const, hash: href.split("#")[1] };
  };

  return (
    <header className="site-header pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-start justify-between px-5 pt-4 md:px-10 md:pt-5">
        <Link
          href={linkHref("/#top")}
          data-nav
          className="pointer-events-auto inline-flex h-11 items-center rounded-full bg-white px-6 text-base text-ink shadow-[0_8px_24px_rgba(18,19,23,0.08)]"
          onClick={(event) => onNavClick(event, "/#top")}
        >
          {site.name}
        </Link>
        <nav
          aria-label="Primary"
          className="pointer-events-auto hidden items-center gap-0 rounded-full bg-white p-1.5 shadow-[0_8px_24px_rgba(18,19,23,0.08)] md:flex"
        >
          {navItems.map((item) => {
            const current = item.id === active;
            const resume = item.href.endsWith(".pdf");
            return (
              <Link
                key={item.href}
                href={linkHref(item.href)}
                data-nav
                className={cn(
                  "inline-flex h-11 items-center rounded-full px-6 text-base transition-colors",
                  resume
                    ? "bg-accent text-accent-ink"
                    : current
                      ? "bg-surface text-ink"
                      : "text-ink hover:bg-surface",
                )}
                {...(resume ? { target: "_blank", rel: "noreferrer" } : {})}
                onClick={(event) => onNavClick(event, item.href)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger
            className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-[0_8px_24px_rgba(18,19,23,0.08)] md:hidden"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-bg/80" />
            <Dialog.Content
              data-lenis-prevent
              className="fixed inset-y-0 right-0 z-50 flex w-[min(100%,20rem)] flex-col bg-bg p-6 shadow-xl"
            >
              <VisuallyHidden>
                <Dialog.Title>Site navigation</Dialog.Title>
              </VisuallyHidden>
              <div className="mb-10 flex items-center justify-between">
                <span className="font-mono text-[12px] tracking-[0.22em] text-ink-3 uppercase">
                  {site.eyebrow}
                </span>
                <Dialog.Close
                  className="inline-flex h-11 w-11 items-center justify-center"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </Dialog.Close>
              </div>
              <nav className="flex flex-col gap-5" aria-label="Mobile">
                <AnimatePresence>
                  {navItems.map((item, index) => (
                    <Dialog.Close key={item.href} asChild>
                      <motion.a
                        href={item.href.includes("#") ? `/#${item.href.split("#")[1]}` : item.href}
                        className="font-serif text-3xl text-ink"
                        initial={reduced ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.04, duration: 0.35 }}
                        onClick={(event) => onNavClick(event, item.href)}
                      >
                        {item.label}
                      </motion.a>
                    </Dialog.Close>
                  ))}
                </AnimatePresence>
              </nav>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
