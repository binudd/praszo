import type { PageHeroContent, PageMeta } from "@/data/pages/types";

/**
 * Legal documents. The privacy policy is verbatim from praszo.com/privacy-policy/ (Cloudflare-obfuscated
 * addresses decoded to pms@praszo.com). praszo.com shows no "last updated" date, so none is rendered.
 */

export type LegalBlock = { type: "p"; text: string } | { type: "list"; items: string[] };
export type LegalSection = { id: string; title: string; blocks: LegalBlock[] };
export type LegalDocument = {
  path: string;
  meta: PageMeta;
  hero: PageHeroContent;
  sections: LegalSection[];
  contact: { name: string; email: string; phone: { display: string; href: string } };
};

const p = (text: string): LegalBlock => ({ type: "p", text });
const list = (...items: string[]): LegalBlock => ({ type: "list", items });

export const privacyPolicy: LegalDocument = {
  path: "/privacy-policy",
  meta: {
    title: "Privacy Policy | Praszo",
    description:
      "How Praszo, a product of Difinity Digital LLP, collects, uses, and protects personal data, and your rights under the DPDP Act, GDPR, and applicable UAE law.",
  },
  hero: {
    eyebrow: "Legal",
    title: "Privacy policy",
    description:
      "Welcome to Praszo (“Website,” “we,” “our,” or “us”), a product of Difinity Digital LLP. We are committed to protecting your privacy and ensuring that your personal data is handled securely and responsibly in accordance with the applicable data protection laws in India, including the Digital Personal Data Protection Act, 2023 (DPDP Act), Information Technology Act, 2000 and any data protection laws applicable in UAE & European Union including GDPR.",
  },
  sections: [
    {
      id: "what-this-notice-covers",
      title: "What does this notice cover",
      blocks: [
        p("This Privacy Notice explains how we use your personal data: how it is collected, how it is held, and how it is processed. It also explains your rights under the law relating to your personal data."),
      ],
    },
    {
      id: "personal-data-we-collect",
      title: "Personal data we collect",
      blocks: [
        p("We collect personal information about users of this website and other individuals in the ordinary course of our business (this may vary according to your relationship with us)."),
      ],
    },
    {
      id: "website-users",
      title: "Website users",
      blocks: [
        p("We collect personal information you provide when you complete online forms, subscribe to our newsfeed, make an online enquiry, or report a problem with our site."),
        p("When you visit our site, we use Google Analytics which uses cookies to collect information about visitor behaviour patterns to improve our website. The information collected may include your IP address and browser type but does not identify individuals. Google Analytics stores information such as pages visited, time spent on the site, and how visitors arrived."),
      ],
    },
    {
      id: "cookies",
      title: "Cookies",
      blocks: [
        p("Our website uses cookies to distinguish you from other users. This helps us provide a good browsing experience and allows us to improve our site. You can choose to accept or decline cookies through your browser settings."),
      ],
    },
    {
      id: "mobile-users",
      title: "Mobile users",
      blocks: [
        p("We collect personal information that you voluntarily provide when using our mobile application. When you use our mobile application, we use analytics tools such as Mixpanel to understand how users interact with the app and to improve functionality and user experience. These tools may automatically collect certain information about your device and usage patterns."),
        p("The information collected may include your device type, operating system, device manufacturer, app version, and general usage data such as screens visited, features used, time spent within the app, and interaction patterns. This information may also include unique identifiers associated with your device or application usage. The data is used solely for analytical, monitoring, and performance improvement purposes."),
        p("We may also associate usage data with information you provide, such as your name or email address, where applicable, to better understand user behavior and improve our services."),
      ],
    },
    {
      id: "suppliers",
      title: "Suppliers",
      blocks: [
        p("If you do business with us on your own behalf, or you are the point of contact for an organisation that we do business with, we collect your personal information including contact details, job title, and organisation name."),
      ],
    },
    {
      id: "information-we-collect",
      title: "Information we collect",
      blocks: [
        p("We may collect and process the following types of information related only to this website. We do not collect personal data inside our mobile applications:"),
        list(
          "Personal Information: Name, email address, phone number, and any other information you provide when registering or using our Services.",
          "Usage Data: Information about how you use our Site and Services, including IP address, browser type, pages visited, and time spent on the Site.",
          "Cookies: Cookies and similar tracking technologies used to enhance your experience.",
        ),
      ],
    },
    {
      id: "how-we-use-your-information",
      title: "How we use your information",
      blocks: [
        p("We use your information for the following purposes:"),
        list(
          "To provide, maintain, and improve our Services.",
          "To communicate with you, including updates and promotional materials.",
          "To process transactions and send notifications.",
          "To analyze usage and trends to improve our Site and Services.",
          "To comply with legal obligations.",
        ),
      ],
    },
    {
      id: "disclosure-of-your-information",
      title: "Disclosure of your information",
      blocks: [
        p("We may share your information in the following situations:"),
        list(
          "With Service Providers: Third-party vendors who assist in operating our Site and Services.",
          "For Legal Reasons: If required by law or valid requests by public authorities.",
          "Business Transfers: In case of merger, acquisition, or asset sale.",
        ),
      ],
    },
    {
      id: "data-security-and-retention",
      title: "Data security and retention",
      blocks: [
        p("We implement appropriate technical and organizational security measures to protect your data from unauthorized access, alteration, disclosure, or destruction. Personal data is retained only as long as necessary to fulfil the purposes outlined in this policy or as required for legal, accounting, and reporting obligations."),
      ],
    },
    {
      id: "your-rights-and-choices",
      title: "Your rights and choices",
      blocks: [
        p("Depending on your jurisdiction, you have the right to:"),
        list(
          "Access & Review: Request a copy of your personal data.",
          "Correction: Request rectification of inaccurate or incomplete data.",
          "Deletion: Request deletion of your personal data, subject to legal obligations.",
          "Opt-Out: Withdraw consent for marketing communications.",
          "Restrict Processing: Request limitations on the processing of your data.",
        ),
        p("To exercise these rights, contact us at pms@praszo.com."),
      ],
    },
    {
      id: "cookies-and-tracking",
      title: "Cookies and tracking technologies",
      blocks: [
        p("We use cookies and similar technologies to enhance your experience on our Website. For more details, please refer to our Cookie Policy."),
      ],
    },
    {
      id: "third-party-links",
      title: "Third-party links",
      blocks: [
        p("Our Website may contain links to third-party sites. We are not responsible for their privacy practices and encourage you to review their privacy policies."),
      ],
    },
    {
      id: "updates-to-this-policy",
      title: "Updates to this privacy policy",
      blocks: [
        p("We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised “Last Updated” date."),
      ],
    },
  ],
  contact: {
    name: "Difinity Digital LLP",
    email: "pms@praszo.com",
    phone: { display: "+91 99950 99789", href: "tel:+919995099789" },
  },
};
