import { about } from "@/data/pages/about";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = about.meta.title;

export default async function OpenGraphImage() {
  return renderOg({ kicker: "About Praszo", title: about.hero.title, subtitle: about.meta.description });
}
