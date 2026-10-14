import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Work } from "@/components/sections/work";

export default function Home() {
  return (
    <main id="main" className="relative z-10">
      <Hero />
      <Work />
      <Contact />
    </main>
  );
}
