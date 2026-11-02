import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins exactly once; every client component imports GSAP from here.
gsap.registerPlugin(useGSAP, ScrollTrigger, Flip);

if (typeof window !== "undefined") {
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { Flip, gsap, ScrollTrigger, useGSAP };
