import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins exactly once; every client component imports GSAP from here.
gsap.registerPlugin(useGSAP, ScrollTrigger, MotionPathPlugin);

if (typeof window !== "undefined") {
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, MotionPathPlugin, ScrollTrigger, useGSAP };
