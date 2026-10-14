import type { Metadata, Viewport } from "next";

import { BackToTop } from "@/components/layout/back-to-top";
import { PointerField } from "@/components/layout/pointer-field";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { site } from "@/content/site";
import { robotoFlex } from "@/lib/fonts";

import "./globals.css";
import "./tokens.css";

const title = `${site.name} — ${site.title}`;
const description = site.summary;

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: title,
    template: `%s — ${site.name}`,
  },
  description,
  applicationName: `${site.name} Portfolio`,
  authors: [{ name: site.legalName, url: site.linkedin }],
  creator: site.legalName,
  keywords: [
    "Design-minded Frontend Engineer",
    "UI/UX designer",
    "frontend engineer",
    "product engineering",
    "React",
    "TypeScript",
    "DifinityDigital",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: `${site.name} Portfolio`,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.legalName,
  jobTitle: "Design-minded Frontend Engineer",
  description: site.summary,
  worksFor: {
    "@type": "Organization",
    name: site.company,
  },
  url: site.siteUrl,
  sameAs: [site.linkedin, site.github, site.behance],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${robotoFlex.variable} h-full antialiased`}
    >
      <body className="relative min-h-full bg-bg font-sans text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <noscript>
          <style>
            {`.hero [data-hero],.site-header [data-nav],[data-graph-node],[data-pms-meta]{opacity:1}`}
          </style>
        </noscript>
        <a
          href="#main"
          className="fixed left-4 top-4 z-[80] -translate-y-16 bg-accent px-3 py-2 text-sm font-medium text-accent-ink focus:translate-y-0"
        >
          Skip to content
        </a>
        <div aria-hidden className="grain" />
        <PointerField />
        <SmoothScroll />
        <SiteHeader />
        {children}
        <SiteFooter />
        <BackToTop />
      </body>
    </html>
  );
}
