import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { ProductGlyph } from "@/components/ui/product-glyph";
import { SocialIcon, type SocialIconName } from "@/components/ui/social-icons";
import { company, companyLinks, legalLinks } from "@/data/company";
import { productList } from "@/data/products";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-line bg-surface">
      <Container className="py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div className="max-w-sm">
            <Link href="/" aria-label="Praszo home" className="inline-flex">
              <Logo />
            </Link>
            <p className="mt-4 text-[15px] font-semibold text-ink">{company.footerTagline}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-2">{company.description}</p>
            <ul className="mt-6 flex items-center gap-2">
              {company.social.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Praszo on ${item.label}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink-2 transition-colors hover:border-brand hover:text-brand"
                  >
                    <SocialIcon name={item.icon as SocialIconName} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-bold tracking-[0.16em] text-ink-3 uppercase">Products</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {productList.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/${product.slug}`}
                    className="inline-flex items-center gap-2.5 text-[15px] font-semibold text-ink-2 transition-colors hover:text-ink"
                  >
                    <ProductGlyph slug={product.slug} size={22} />
                    Praszo {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-bold tracking-[0.16em] text-ink-3 uppercase">Company</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[15px] font-semibold text-ink-2 transition-colors hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-bold tracking-[0.16em] text-ink-3 uppercase">Contact</p>
            <address className="mt-4 flex flex-col gap-2.5 text-[15px] not-italic text-ink-2">
              <a href={company.phone.href} className="font-semibold transition-colors hover:text-ink">
                {company.phone.display}
              </a>
              <a href={`mailto:${company.emails.demo}`} className="font-semibold transition-colors hover:text-ink">
                {company.emails.demo}
              </a>
              <a href={`mailto:${company.emails.support}`} className="font-semibold transition-colors hover:text-ink">
                {company.emails.support}
              </a>
              <span className="mt-1 text-sm leading-relaxed">
                {company.address.name}
                <br />
                {company.address.lines[0]}
                <br />
                {company.address.lines[1]}
              </span>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-sm text-ink-3 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Praszo. All rights reserved. {company.legalNote}</p>
          <ul className="flex items-center gap-4">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
