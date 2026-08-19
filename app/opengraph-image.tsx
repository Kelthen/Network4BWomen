// OWNED BY: shared — image d'aperçu (Open Graph / Twitter) générée à la volée.
// Typographique aux couleurs NBW — pas besoin de logo. Servie pour og:image + twitter:image.
import { ImageResponse } from "next/og";

export const alt = "Network of Black Women — Empowering Black Women. Building Community. Creating Leaders.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #44312b 0%, #3a2a24 60%, #5c2233 100%)",
          color: "#fbf7f0",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#c9a24b",
            fontFamily: "Arial, sans-serif",
            fontWeight: 600,
          }}
        >
          Network of Black Women · Toronto, Ontario
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 82, lineHeight: 1.05, fontWeight: 700 }}>Empowering Black Women.</div>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 82, lineHeight: 1.1, fontWeight: 700 }}>
            <span>Building Community.&nbsp;</span>
            <span style={{ color: "#f6828f", fontStyle: "italic" }}>Creating Leaders.</span>
          </div>
        </div>

        <div style={{ fontSize: 28, color: "rgba(251,247,240,0.75)", fontFamily: "Arial, sans-serif" }}>
          A sisterhood for Black women & girls · info.networkofblackwomen@gmail.com
        </div>
      </div>
    ),
    size,
  );
}
