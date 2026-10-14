import { CircleCheck, Smartphone } from "lucide-react";
import Image from "next/image";

import practiceMobile from "@/assets/products/practice-mobile.png";
import { RevealBlock } from "@/components/motion/reveal";
import { ClipReveal } from "@/components/product/clip-reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

const bullets = ["Real-time data", "Secure access"];

/** Practice-only section: the mobile app, as shown on praszo.com/practice. */
export function PracticeMobileSection() {
  return (
    <section id="practice-mobile" aria-labelledby="practice-mobile-title" className="border-t border-line bg-white py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <RevealBlock>
            <Eyebrow tone="product">
              <Smartphone size={14} aria-hidden /> Mobile
            </Eyebrow>
            <h2 id="practice-mobile-title" className="display-md mt-4 text-ink">
              Manage your practice on the go.
            </h2>
            <p className="lede mt-5">
              Praszo Practice is the operational core of Praszo OS, built for audit firms that need structured workflows,
              accurate time tracking, financial oversight, and compliance-ready engagement management, wherever the team is
              working.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              {bullets.map((bullet) => (
                <li key={bullet} className="copy inline-flex items-center gap-2 font-semibold text-ink">
                  <CircleCheck size={18} className="text-product-deep" aria-hidden /> {bullet}
                </li>
              ))}
            </ul>
          </RevealBlock>
          <ClipReveal className="mx-auto w-full max-w-md">
            <div className="rounded-media bg-product-soft px-8 pt-10 pb-0 md:px-14">
              <Image
                src={practiceMobile}
                alt="Praszo Practice mobile app showing a projects list and a project status card with progress and due date"
                sizes="(min-width: 1024px) 30vw, 80vw"
                placeholder="blur"
                className="mx-auto h-auto w-full max-w-[18rem] drop-shadow-xl"
              />
            </div>
          </ClipReveal>
        </div>
      </Container>
    </section>
  );
}
