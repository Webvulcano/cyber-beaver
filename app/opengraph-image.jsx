import { getCms } from "@/lib/cms";
import { renderOg } from "@/lib/og";

// Főoldal megosztási képe: a hero kicsiben (rajzolás: lib/og.jsx).
export const alt = "Cyber Beaver — kiszervezett információbiztonsági felelős";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const cms = await getCms();
  return renderOg({
    company: cms.text("home.hero.company"),
    highlight: cms.text("home.hero.title_highlight"),
    title: cms.text("home.hero.title"),
    subtitle: cms.text("home.hero.subtitle"),
  });
}
