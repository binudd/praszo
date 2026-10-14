/** Serializes structured data safely for an inline <script type="application/ld+json">. */
export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
