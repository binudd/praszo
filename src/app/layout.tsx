import type { Metadata, Viewport } from "next";

import { BackgroundGrid } from "@/components/layout/background-grid";
import { BackToTop } from "@/components/layout/back-to-top";
import { PointerField } from "@/components/layout/pointer-field";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";
import { Splash } from "@/components/layout/splash";
import { ThemeObserver } from "@/components/layout/theme-observer";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { company, siteUrl } from "@/data/company";
import { manrope } from "@/lib/fonts";
import { jsonLd } from "@/lib/json-ld";
import { splashBootScript } from "@/lib/splash";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Praszo | Secure Practice Management Tools for Audit Firms",
    template: "%s | Praszo",
  },
  description: company.description,
  applicationName: "Praszo",
  creator: "Praszo",
  publisher: "Difinity Digital LLP",
  keywords: [
    "practice management software for audit firms",
    "on-premise audit software",
    "AI financial statement validation",
    "AI purchase vouching",
    "engagement letter automation",
    "document management for auditors",
    "Praszo OS",
  ],
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  alternateName: company.platform,
  url: siteUrl,
  logo: `${siteUrl}/apple-icon.png`,
  description: company.description,
  telephone: company.phone.display,
  email: company.emails.demo,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.lines[0],
    addressLocality: company.address.locality,
    addressCountry: company.address.country,
  },
  sameAs: company.social.map((item) => item.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="light" className={`${manrope.variable} h-full antialiased`} suppressHydrationWarning>
      {/* suppressHydrationWarning covers <body>'s own attributes only: browser extensions (Grammarly,
          ColorZilla, password managers) add attributes here before React hydrates. Children are still checked. */}
      <body className="relative min-h-full font-sans text-ink" suppressHydrationWarning>
        {/* Decides before first paint whether the first-load splash shows (see lib/splash.ts). */}
        <script dangerouslySetInnerHTML={{ __html: splashBootScript }} />
        <Splash />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(organizationJsonLd) }} />
        <noscript>
          <style>{`[data-entrance] [data-hero]{opacity:1;transform:none}.scene-stack{display:block}.word-reveal .word{color:var(--ink)}.splash{display:none!important}html{overflow:auto!important}`}</style>
        </noscript>
        <SkipLink />
        <BackgroundGrid />
        <ThemeObserver />
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
