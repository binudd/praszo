import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Contact Praszo and book a demo";

export default async function OpenGraphImage() {
  return renderOg({
    kicker: "Contact",
    title: "Let's transform your practice together",
    subtitle: "Book a demo, call our Dubai office, or email the Praszo team.",
  });
}
