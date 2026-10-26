import { TISAX } from "@/content/pages/tisax";
import { getCms } from "@/lib/cms";
import { renderOg } from "@/lib/og";

export const alt = "TISAX felkészítés és tanácsadás — Cyber Beaver";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const cms = await getCms();
  return renderOg({
    company: cms.text("home.hero.company"),
    highlight: TISAX.og.highlight,
    title: TISAX.og.title,
    subtitle: "Autóipari beszállítóknak, az auditig",
  });
}
