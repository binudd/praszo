import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

type OgProps = {
  title: string;
  subtitle: string;
  kicker?: string;
  /** Accent color (product color or brand teal). */
  color?: string;
  /** Optional glyph image file under src/assets/brand. */
  glyph?: string;
};

async function loadFont(file: string) {
  try {
    return await readFile(join(process.cwd(), "src/assets/fonts", file));
  } catch {
    return null;
  }
}

async function loadImage(file: string) {
  try {
    const data = await readFile(join(process.cwd(), "src/assets/brand", file));
    if (file.endsWith(".svg")) {
      // Product glyph SVGs embed a bitmap; use it directly so the OG renderer gets a plain PNG.
      const embedded = data.toString("utf8").match(/href="(data:image\/png;base64,[^"]+)"/);
      if (embedded) return embedded[1];
      return `data:image/svg+xml;base64,${data.toString("base64")}`;
    }
    return `data:image/png;base64,${data.toString("base64")}`;
  } catch {
    return null;
  }
}

/** Shared Open Graph template: brand mark, kicker, title, subtitle, accent bar. */
export async function renderOg({ title, subtitle, kicker = "Praszo OS", color = "#0c8080", glyph }: OgProps) {
  const [bold, medium, mark, glyphSrc] = await Promise.all([
    loadFont("Manrope-Bold.woff"),
    loadFont("Manrope-Medium.woff"),
    loadImage("praszo-mark.png"),
    glyph ? loadImage(glyph) : Promise.resolve(null),
  ]);

  const fonts = [
    bold ? { name: "Manrope", data: bold, weight: 700 as const, style: "normal" as const } : null,
    medium ? { name: "Manrope", data: medium, weight: 500 as const, style: "normal" as const } : null,
  ].filter((font): font is NonNullable<typeof font> => Boolean(font));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          color: "#1a1d20",
          padding: "64px 72px",
          fontFamily: fonts.length ? "Manrope" : "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 12,
            background: color,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -120,
            width: 420,
            height: 420,
            borderRadius: 420,
            background: color,
            opacity: 0.08,
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", fontSize: 40, fontWeight: 700, letterSpacing: -1.5 }}>
            <span>Pras</span>
            {mark ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={mark} alt="" width={30} height={28} style={{ margin: "0 2px 0 3px" }} />
            ) : (
              <span style={{ color: "#f55d48" }}>z</span>
            )}
            <span>o</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 20,
              fontWeight: 500,
              color: "#64748b",
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            {kicker}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 980 }}>
          {glyphSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={glyphSrc} alt="" width={72} height={72} style={{ borderRadius: 18 }} />
          ) : null}
          <div style={{ fontSize: 62, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>{title}</div>
          <div style={{ fontSize: 26, fontWeight: 500, lineHeight: 1.4, color: "#475569" }}>{subtitle}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 20, fontWeight: 500, color }}>
          <span style={{ width: 12, height: 12, borderRadius: 12, background: color, display: "flex" }} />
          Precision for Audit · praszo.com
        </div>
      </div>
    ),
    { ...ogSize, fonts },
  );
}
