import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Megosztási kép (OG) rajzolása, közös a főoldal és az aloldalak opengraph-image fájljainak: sötét alap,
// halvány pontrács piros kockázat-klaszterekkel és accent sávokkal, középen a hód és a főcím. Build-kor generálódik.

export const size = { width: 1200, height: 630 };

const BASE = "#22282a";
const ACCENT = "#6cc4a1";
const RISK = "#ff5c50";

// Figtree a Google Fontsból, csak a szükséges karakterekkel (ékezetek miatt kell saját font).
async function loadFont(weight, text) {
  const url = `https://fonts.googleapis.com/css2?family=Figtree:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!src) throw new Error("Figtree font betöltése sikertelen");
  return (await fetch(src[1])).arrayBuffer();
}

// Determinisztikus pontrács: piros klaszterek, accent sávok ("kígyó" nyoma), középen elhalványul.
const GAP = 30;
const COLS = Math.ceil(size.width / GAP);
const ROWS = Math.ceil(size.height / GAP);
const RISKS = [[4, 4], [35, 3], [6, 16], [33, 17], [26, 2], [12, 19]];
const TRAILS = [
  { row: 4, from: 7, to: 15 },
  { row: 17, from: 24, to: 32 },
  { col: 37, from: 7, to: 14 },
  { col: 2, from: 8, to: 13 },
];

function dotColor(c, r) {
  if (RISKS.some(([x, y]) => Math.abs(x - c) + Math.abs(y - r) <= 1)) return RISK;
  if (TRAILS.some((t) => (t.row === r && c >= t.from && c <= t.to) || (t.col === c && r >= t.from && r <= t.to)))
    return ACCENT;
  return "rgba(255,255,255,0.22)";
}

function dots() {
  const out = [];
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) {
      const x = c * GAP + GAP / 2;
      const y = r * GAP + GAP / 2;
      // középen (a szöveg mögött) halványabb, mint a heróban a sötét folt
      const dx = (x - size.width / 2) / (size.width * 0.42);
      const dy = (y - size.height / 2) / (size.height * 0.48);
      const fade = Math.min(1, Math.max(0.12, Math.sqrt(dx * dx + dy * dy) - 0.25));
      out.push(
        <div
          key={`${c}-${r}`}
          style={{
            position: "absolute",
            left: x - 2,
            top: y - 2,
            width: 4,
            height: 4,
            borderRadius: 4,
            background: dotColor(c, r),
            opacity: fade * 0.55,
          }}
        />,
      );
    }
  return out;
}

// highlight: accent színű első sor (lehet üres), title: fehér második sor.
export async function renderOg({ company, highlight = "", title, subtitle }) {
  const logo = await readFile(join(process.cwd(), "public/logo-mark-white.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  const chars = company + highlight + title + subtitle;
  const [bold, semibold] = await Promise.all([loadFont(700, chars), loadFont(600, chars)]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: BASE,
          fontFamily: "Figtree",
          color: "white",
        }}
      >
        {dots()}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: size.width,
            height: size.height,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <img src={logoSrc} alt="" width={116} height={103} style={{ marginBottom: 28 }} />
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: 4.4, textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>
            {company}
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 22, fontSize: 68, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.5 }}>
            {highlight && <span style={{ color: ACCENT }}>{highlight}</span>}
            <span>{title}</span>
          </div>
          <div style={{ marginTop: 26, fontSize: 28, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>{subtitle}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Figtree", data: bold, weight: 700, style: "normal" },
        { name: "Figtree", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
