import type { Metadata } from "next";

import { CareerTimeline } from "@/components/sections/career-timeline";
import { Contact } from "@/components/sections/contact";
import { Evolution } from "@/components/sections/evolution";
import { StoryIntro } from "@/components/sections/story-intro";
import { StoryPrinciples } from "@/components/sections/story-principles";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "My story",
  description:
    "How Binu’s work moved from pixels and visual design into motion, UI/UX, React engineering, and product architecture.",
  alternates: { canonical: "/story" },
  openGraph: {
    title: `My story — ${site.name}`,
    description:
      "The evolution from web design and visual craft into frontend engineering and product systems.",
    url: "/story",
  },
};

export default function StoryPage() {
  return (
    <main id="main" className="relative z-10">
      <StoryIntro />
      <Evolution />
      <CareerTimeline />
      <StoryPrinciples />
      <Contact />
    </main>
  );
}
