import { SolutionPage } from "@/components/page/solution-page";
import { getSolution } from "@/data/pages/solutions";
import { buildMetadata } from "@/lib/metadata";

const solution = getSolution("mid-sized-firms");

export const metadata = buildMetadata({ ...solution.meta, path: solution.path });

export default function MidSizedFirmsPage() {
  return <SolutionPage solution={solution} />;
}
