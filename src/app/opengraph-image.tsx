import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name}, ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadSerif(): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch("https://fonts.googleapis.com/css2?family=Instrument+Serif", {
        // An old user agent makes Google serve TTF, which the image renderer supports.
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.30 (KHTML, like Gecko)" },
      })
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OgImage() {
  const serif = await loadSerif();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a1114",
          color: "#dce3e4",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -160,
            top: -160,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: "#84b5b1",
            opacity: 0.08,
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, color: "#7f9094" }}>
          <div style={{ width: 12, height: 12, borderRadius: 9999, background: "#84b5b1", display: "flex" }} />
          {profile.status}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, lineHeight: 1, fontFamily: serif ? "Instrument Serif" : undefined, display: "flex" }}>
            {profile.name}
          </div>
          <div style={{ marginTop: 28, fontSize: 40, color: "#a9b7ba", display: "flex" }}>
            {profile.title}, building AI systems
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#7f9094" }}>
          <span>RAG · Multi-agent systems · FastAPI · Spring Boot · Kubernetes</span>
          <span style={{ color: "#84b5b1" }}>anubhav-gupta.vercel.app</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: serif ? [{ name: "Instrument Serif", data: serif, style: "normal", weight: 400 }] : undefined,
    },
  );
}
