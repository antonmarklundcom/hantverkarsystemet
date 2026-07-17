import { ImageResponse } from "next/og";

export const alt = "Hantverkarsystemet — missa aldrig ett samtal igen";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(180deg, #eff6ff 0%, #ffffff 100%)",
          fontFamily: "system-ui, sans-serif",
          padding: "80px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "#1d4ed8",
            marginBottom: 24,
            letterSpacing: 1,
          }}
        >
          HANTVERKARSYSTEMET
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "#171717",
            lineHeight: 1.15,
          }}
        >
          Missa aldrig ett jobb bara för
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "#171717",
            lineHeight: 1.15,
          }}
        >
          att du inte kunde svara
        </div>
        <div style={{ fontSize: 28, color: "#525252", marginTop: 32 }}>
          Automatiskt SMS-svar · Fler Google-recensioner · Egen hemsida
        </div>
      </div>
    ),
    { ...size },
  );
}
