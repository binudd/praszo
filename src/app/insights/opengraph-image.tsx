import { insights } from "@/data/pages/insights";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = insights.meta.title;

export default async function OpenGraphImage() {
  return renderOg({ kicker: "Insights", title: insights.hero.title, subtitle: insights.meta.description });
}
