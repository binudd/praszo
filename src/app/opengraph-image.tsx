import { home } from "@/data/home";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Praszo: secure practice management tools for audit firms";

export default async function OpenGraphImage() {
  return renderOg({
    kicker: "Praszo OS",
    title: "Simplify your practice management. Run it on Praszo.",
    subtitle: home.hero.description,
  });
}
