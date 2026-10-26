import { SITE_URL } from "@/content/site";

// Új indexelendő oldalnál (pl. IBF-aloldal) ide is felvenni. A jogi oldalak noindex-esek, ezért nincsenek itt.
export default function sitemap() {
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
  ];
}
