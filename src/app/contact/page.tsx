import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { RevealGroup } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ProductGlyph } from "@/components/ui/product-glyph";
import { SocialIcon, type SocialIconName } from "@/components/ui/social-icons";
import { company, demoMailto } from "@/data/company";
import { productList } from "@/data/products";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Contact Praszo | Book a Demo",
  description:
    "Connect with the Praszo team for secure audit and practice management software. Book a demo, call our Dubai office, or email us to streamline your audit workflows.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main id="main" className="relative z-10">
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
            <div>
              <Eyebrow>Contact</Eyebrow>
              <h1 className="display-lg mt-5 text-ink">
                Let&rsquo;s transform your practice together
              </h1>
              <p className="lede mt-6 max-w-xl">
                Have a project in mind or want to streamline your financial workflows? We&rsquo;d love to hear from you.
                Share your goals and our team will help you find the right Praszo solution.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href={demoMailto} size="lg">
                  Book a demo by email
                  <ArrowRight size={18} aria-hidden />
                </Button>
                <Button href={company.phone.href} variant="secondary" size="lg">
                  <Phone size={18} aria-hidden /> Call {company.phone.display}
                </Button>
              </div>
              <p className="mt-4 text-sm text-ink-3">
                The email opens pre-filled with a short demo request. Tell us which products you want to see.
              </p>
            </div>

            <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <Card data-reveal className="flex gap-4 p-6">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <Phone size={20} aria-hidden />
                </span>
                <div>
                  <h2 className="text-lg text-ink">Call</h2>
                  <a href={company.phone.href} className="mt-1 block text-[15px] font-semibold text-ink-2 hover:text-brand">
                    {company.phone.display}
                  </a>
                </div>
              </Card>
              <Card data-reveal className="flex gap-4 p-6">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <Mail size={20} aria-hidden />
                </span>
                <div>
                  <h2 className="text-lg text-ink">Email</h2>
                  <a href={`mailto:${company.emails.demo}`} className="mt-1 block text-[15px] font-semibold text-ink-2 hover:text-brand">
                    {company.emails.demo}
                  </a>
                  <p className="text-sm text-ink-3">Demos and sales</p>
                  <a href={`mailto:${company.emails.support}`} className="mt-2 block text-[15px] font-semibold text-ink-2 hover:text-brand">
                    {company.emails.support}
                  </a>
                  <p className="text-sm text-ink-3">Existing customers</p>
                </div>
              </Card>
              <Card data-reveal className="flex gap-4 p-6 sm:col-span-2 lg:col-span-1">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <MapPin size={20} aria-hidden />
                </span>
                <div>
                  <h2 className="text-lg text-ink">Visit</h2>
                  <address className="mt-1 text-[15px] leading-relaxed text-ink-2 not-italic">
                    {company.address.name}
                    <br />
                    {company.address.lines[0]}
                    <br />
                    {company.address.lines[1]}
                  </address>
                </div>
              </Card>
            </RevealGroup>
          </div>
        </Container>
      </section>

      <section aria-labelledby="contact-products-title" className="border-t border-line bg-surface py-16 md:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Before the call</Eyebrow>
              <h2 id="contact-products-title" className="mt-3 text-2xl text-ink">
                Which part of the audit workflow do you want to see?
              </h2>
            </div>
            <ul className="flex items-center gap-2">
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
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {productList.map((product) => (
              <li key={product.slug}>
                <Link
                  href={`/${product.slug}`}
                  className="flex h-full flex-col gap-3 rounded-card border border-line bg-bg p-4 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-float"
                >
                  <ProductGlyph slug={product.slug} size={36} />
                  <span>
                    <span className="block text-[15px] font-bold text-ink">Praszo {product.name}</span>
                    <span className="mt-1 block text-[13px] leading-snug text-ink-2">{product.category}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-ink-3">
            Looking for articles and resources?{" "}
            <a href={company.external.insights} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold text-ink hover:text-brand">
              Visit Insights on praszo.com <ArrowUpRight size={14} aria-hidden />
            </a>
          </p>
        </Container>
      </section>
    </main>
  );
}
