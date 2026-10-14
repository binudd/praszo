"use client";

import { Play } from "lucide-react";
import { useRef } from "react";

import { useHeroEntrance } from "@/components/motion/hero-entrance";
import { HeroTitle } from "@/components/motion/hero-title";
import { scrollToTarget } from "@/components/motion/smooth-scroll";
import { WordReveal } from "@/components/motion/word-reveal";
import { HeroShell } from "@/components/sections/hero-shell";
import { HeroShowcase } from "@/components/sections/hero-showcase";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { company } from "@/data/company";
import { home } from "@/data/home";

/** Hero CTAs: compact on phones (both fit one row), regular on tablets, large on desktop. */
const heroButton = "max-sm:h-10 max-sm:px-4 max-sm:text-sm lg:h-12 lg:px-6 lg:text-base";

const opener = "Simplify your practice management.";

export function CorporateHero() {
  const rootRef = useRef<HTMLElement | null>(null);
  useHeroEntrance(rootRef, "home");

  return (
    <HeroShell
      rootRef={rootRef}
      labelledBy="home-hero-title"
      lede={
        <>
          <Eyebrow data-hero="eyebrow">{home.hero.eyebrow}</Eyebrow>
          {/* Same dim-to-lit word reveal as the Why Praszo intro, played by the hero entrance. */}
          <WordReveal
            data-hero="copy"
            scrub={false}
            text={`${opener} ${company.description}`}
            strong={[opener]}
            className="lede mt-4 max-w-[34rem] max-lg:text-[0.98rem] max-lg:leading-snug lg:mt-5"
          />
          <div data-hero="cta" className="mt-5 flex flex-wrap items-center gap-3 lg:mt-7">
            <Button
              href="#workflow"
              variant="secondary"
              className={heroButton}
              onClick={(event) => {
                event.preventDefault();
                scrollToTarget("#workflow");
              }}
            >
              <Play size={14} className="fill-current" aria-hidden />
              See the workflow
            </Button>
          </div>
        </>
      }
      visual={<HeroShowcase />}
      title={
        <h1 id="home-hero-title" className="display-lg text-ink">
          <HeroTitle text="Run it on Praszo." highlight="Praszo" />
        </h1>
      }
      aside={
        <p data-hero="cta" className="text-sm leading-tight font-semibold text-ink lg:pb-3 lg:text-right">
          Praszo OS
          <span className="block font-medium text-ink-3">{home.ecosystem.title}</span>
        </p>
      }
    />
  );
}
