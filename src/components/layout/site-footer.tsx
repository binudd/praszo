import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
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
            <p className="copy mt-4 font-semibold text-ink">{company.footerTagline}</p>
            <p className="copy mt-3">{company.description}</p>
            <ul className="mt-6 flex items-center gap-2">
              {company.social.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Praszo on ${item.label}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg text-ink-2 transition-colors hover:border-brand hover:text-brand"
                  >
                    <SocialIcon name={item.icon as SocialIconName} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label text-ink-3">Products</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {productList.map((product) => (
                <li key={product.slug}>
                  <Link href={`/${product.slug}`} className="copy font-semibold transition-colors hover:text-ink">
                    Praszo {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label text-ink-3">Company</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="copy font-semibold transition-colors hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label text-ink-3">Contact</p>
            <address className="copy mt-4 flex flex-col gap-2.5 not-italic">
              <a href={company.phone.href} className="font-semibold transition-colors hover:text-ink">
                {company.phone.display}
              </a>
              <a href={`mailto:${company.emails.demo}`} className="font-semibold transition-colors hover:text-ink">
                {company.emails.demo}
              </a>
              <a href={`mailto:${company.emails.support}`} className="font-semibold transition-colors hover:text-ink">
                {company.emails.support}
              </a>
              <span className="mt-1">
                {company.address.name}
                <br />
                {company.address.lines[0]}
                <br />
                {company.address.lines[1]}
              </span>
            </address>
          </div>
        </div>

        <div className="copy mt-14 flex flex-col gap-3 border-t border-line pt-6 text-ink-3 md:flex-row md:items-center md:justify-between">
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
