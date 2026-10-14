import { getSolution } from "@/data/pages/solutions";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

const solution = getSolution("mid-sized-firms");

export const size = ogSize;
export const contentType = ogContentType;
export const alt = solution.meta.title;

export default async function OpenGraphImage() {
  return renderOg({ kicker: solution.label, title: solution.hero.title, subtitle: solution.meta.description });
}
