// Team portraits: transparent PNGs, shown on the frame's --elevated background.
import ashanAmeer from "@/assets/team/ashan.png";
import mohammedLabinash from "@/assets/team/labinash.png";
import manuGeorgeMicheal from "@/assets/team/manu.png";
import subeesha from "@/assets/team/subeesha.png";
import type { StaticImageData } from "next/image";

import type { FeatureItem, PageHeroContent, PageMeta } from "@/data/pages/types";

/**
 * About page copy, from praszo.com/about-us/.
 * The page's numeric claims (100%, 99%, 10,000+, Zero) are intentionally left out, like the
 * homepage stats. All four portraits were supplied directly (praszo.com shows a theme placeholder,
 * member7.webp, for Mohammed Labinash). labinash.png arrived with the transparency checkerboard baked
 * into its pixels; it was converted to a real alpha channel. TeamGrid falls back to initials for a
 * member without a photo.
 */

export type TeamMember = { name: string; role: string; photo?: StaticImageData };

export const about = {
  path: "/about",
  meta: {
    title: "About Praszo | AI Auditing Software Solutions",
    description:
      "Praszo OS powers secure audit operations: AI auditing software built for audit firms that believe operational control isn't optional and data ownership isn't negotiable.",
  } satisfies PageMeta,
  hero: {
    eyebrow: "About Praszo",
    title: "Praszo OS: Powering secure audit operations.",
    description:
      "AI auditing software solutions built for audit firms that believe operational control isn’t optional, and data ownership isn’t negotiable.",
  } satisfies PageHeroContent,
  quote: {
    text: "We built Praszo to give audit firms complete control, structured workflows, secure data, and zero room for oversight.",
    name: "Manu George Micheal",
    role: "Director",
    photo: manuGeorgeMicheal,
  },
  purpose: {
    eyebrow: "Why we built Praszo",
    title: "Structure, efficiency, and confidence in everyday audit operations",
    description:
      "Our mission and vision define how we help audit firms bring structure, efficiency, and confidence to everyday operations.",
    items: [
      { title: "Our mission", body: "To bring structure, security, and simplicity to audit operations.", icon: "Target" },
      {
        title: "Our vision",
        body: "Be the trusted backbone for every audit firm. We imagine a world where every audit firm operates with confidence and clarity.",
        icon: "Eye",
      },
    ] satisfies FeatureItem[],
  },
  team: {
    eyebrow: "The team behind the OS",
    title: "Built by people who understand audit firms",
    description:
      "The AI auditing software solutions are built by a team that truly understands the audit firm’s realities. Meet our team leading Praszo.",
    members: [
      { name: "Manu George Micheal", role: "Director", photo: manuGeorgeMicheal },
      { name: "Ashan Ameer", role: "Product Owner", photo: ashanAmeer },
      { name: "Mohammed Labinash", role: "Product Engineering Head", photo: mohammedLabinash },
      { name: "Subeesha", role: "Practice Management Consultant", photo: subeesha },
    ] satisfies TeamMember[],
  },
  values: {
    eyebrow: "Our core values",
    title: "Built on security, integrity, and innovation",
    description:
      "Our core values guide every decision we make: prioritizing data security, acting with integrity, driving innovation, fostering collaboration, and delivering excellence in everything we build.",
    items: [
      {
        title: "Security",
        body: "Security is our priority. We build and deploy products all while keeping your data safe, giving firms complete control over it.",
        icon: "ShieldCheck",
      },
      {
        title: "Integrity",
        body: "We act with honesty, transparency, and fairness in everything we do. Trust is at the heart of how we build relationships with clients, partners, and our own team.",
        icon: "Scale",
      },
      {
        title: "Innovation",
        body: "We constantly challenge the status quo, embrace new ideas, and create smarter ways to solve complex audit problems. Innovation drives everything at Praszo.",
        icon: "Lightbulb",
      },
      {
        title: "Collaboration",
        body: "We believe the best outcomes come from teamwork. Sharing knowledge, supporting each other, and building strong partnerships are central to our success.",
        icon: "Handshake",
      },
      {
        title: "Excellence",
        body: "We aim high in every project, ensuring precision, reliability, and value in our solutions. Excellence is not just a goal; it’s how we operate daily.",
        icon: "Award",
      },
    ] satisfies FeatureItem[],
  },
} as const;
