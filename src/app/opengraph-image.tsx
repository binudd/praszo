import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Binu — product engineering and UX";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FFFFFF",
          color: "#121317",
          padding: "72px",
          fontFamily: "Roboto, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#5F666D",
            fontFamily: "sans-serif",
          }}
        >
          <span>Binu</span>
          <span>Product Engineering × UX</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 68,
              lineHeight: 1.05,
              maxWidth: 920,
            }}
          >
            I turn complex problems into working products.
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#5F666D",
              fontFamily: "sans-serif",
            }}
          >
            Design-minded. Engineering-focused. Built around solving real problems.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontFamily: "sans-serif",
            fontSize: 18,
            color: "#217BFE",
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              background: "#217BFE",
              borderRadius: 999,
            }}
          />
          Beyond the interface. Into the solution.
        </div>
      </div>
    ),
    size,
  );
}
