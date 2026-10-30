import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";

import { RevealGroup } from "@/components/motion/reveal";
import { PageHero } from "@/components/page/page-hero";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { EditorialItem } from "@/components/ui/editorial-item";
import { ProductLinks } from "@/components/ui/product-links";
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
      <PageHero
        titleId="contact-title"
        eyebrow="Contact"
        title={<>Let&rsquo;s transform your practice together</>}
        description="Have a project in mind or want to streamline your financial workflows? We’d love to hear from you. Share your goals and our team will help you find the right Praszo solution."
        actions={
          <>
            <Button href={demoMailto} size="lg">
              Book a demo by email
              <ArrowRight size={18} aria-hidden />
            </Button>
            <Button href={company.phone.href} variant="secondary" size="lg">
              <Phone size={18} aria-hidden /> Call {company.phone.display}
            </Button>
          </>
        }
        aside={
          <RevealGroup className="grid content-start gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-1">
            <EditorialItem reveal icon="Phone" titleAs="h2" title="Call">
              <a href={company.phone.href} className="copy tap-target mt-2 block w-fit font-semibold text-ink hover:text-brand-strong">
                {company.phone.display}
              </a>
            </EditorialItem>
            <EditorialItem reveal icon="Mail" titleAs="h2" title="Email">
              <a
                href={`mailto:${company.emails.demo}`}
                className="copy tap-target mt-2 block w-fit font-semibold text-ink hover:text-brand-strong"
              >
                {company.emails.demo}
              </a>
              <p className="label mt-1 text-ink-3">Demos and sales</p>
              <a
                href={`mailto:${company.emails.support}`}
                className="copy tap-target mt-3 block w-fit font-semibold text-ink hover:text-brand-strong"
              >
                {company.emails.support}
              </a>
              <p className="label mt-1 text-ink-3">Existing customers</p>
            </EditorialItem>
            <EditorialItem reveal icon="MapPin" titleAs="h2" title="Visit" className="sm:col-span-2 lg:col-span-1">
              <address className="copy mt-2 not-italic">
                {company.address.name}
                <br />
                {company.address.lines[0]}
                <br />
                {company.address.lines[1]}
              </address>
            </EditorialItem>
          </RevealGroup>
        }
      >
        <p className="copy mt-4 text-ink-3">
          The email opens pre-filled with a short demo request. Tell us which products you want to see.
        </p>
      </PageHero>

      <section aria-labelledby="contact-products-title" className="border-t border-line py-16 md:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Before the call</Eyebrow>
              <h2 id="contact-products-title" className="display-sm mt-3 max-w-2xl text-ink">
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
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-bg text-ink-2 transition-colors hover:border-brand hover:text-brand"
                  >
                    <SocialIcon name={item.icon as SocialIconName} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <ProductLinks products={productList} detail="category" className="mt-8 sm:grid-cols-2 lg:grid-cols-3" />
          <p className="copy mt-8 text-ink-3">
            Looking for articles and resources?{" "}
            <Link
              href="/insights"
              className="inline-flex items-center gap-1 font-semibold text-ink hover:text-brand-strong"
            >
              Visit Insights <ArrowRight size={14} aria-hidden />
            </Link>
          </p>
        </Container>
      </section>
    </main>
  );
}
