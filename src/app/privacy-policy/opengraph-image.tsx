import { privacyPolicy } from "@/data/pages/legal";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = privacyPolicy.meta.title;

export default async function OpenGraphImage() {
  return renderOg({ kicker: "Legal", title: privacyPolicy.hero.title, subtitle: privacyPolicy.meta.description });
}
