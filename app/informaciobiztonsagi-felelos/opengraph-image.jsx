import { IBF } from "@/content/pages/ibf";
import { getCms } from "@/lib/cms";
import { renderOg } from "@/lib/og";

export const alt = "Kiszervezett információbiztonsági felelős (IBF) — Cyber Beaver";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const cms = await getCms();
  return renderOg({
    company: cms.text("home.hero.company"),
    highlight: IBF.og.highlight,
    title: IBF.og.title,
    subtitle: "Havidíjas alapon, Big4-os tapasztalattal",
  });
}
