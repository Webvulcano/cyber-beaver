import { SITE_URL } from "@/content/site";

// Új oldalnál (pl. IBF-aloldal) ide is felvenni.
export default function sitemap() {
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/impresszum`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/adatkezeles`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
