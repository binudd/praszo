import { SolutionPage } from "@/components/page/solution-page";
import { getSolution } from "@/data/pages/solutions";
import { buildMetadata } from "@/lib/metadata";

const solution = getSolution("large-firms");

export const metadata = buildMetadata({ ...solution.meta, path: solution.path });

export default function LargeFirmsPage() {
  return <SolutionPage solution={solution} />;
}
