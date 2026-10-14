import { getProduct } from "@/data/products";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

const product = getProduct("verifi");

export const size = ogSize;
export const contentType = ogContentType;
export const alt = product.meta.title;

export default async function OpenGraphImage() {
  return renderOg({
    kicker: product.fullName,
    title: product.hero.headline,
    subtitle: product.summary,
    color: product.colorDeep,
    glyph: "verifi.svg",
  });
}
