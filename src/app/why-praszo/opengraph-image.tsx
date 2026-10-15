import { whyPraszo } from "@/data/pages/why-praszo";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = whyPraszo.meta.title;

export default async function OpenGraphImage() {
  return renderOg({ kicker: "Why Praszo", title: whyPraszo.hero.title, subtitle: whyPraszo.hero.description });
}
