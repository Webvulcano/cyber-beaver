import { SITE_URL } from "@/content/site";
import { PUBLISHED_PAGES } from "@/content/pages";

// Indexelendő oldalak: főoldal + publikált szolgáltatás-aloldalak (content/pages, published). A jogi oldalak noindex-esek, ezért nincsenek itt.
export default function sitemap() {
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    ...PUBLISHED_PAGES.map((p) => ({ url: `${SITE_URL}${p.content.path}`, lastModified, changeFrequency: "monthly", priority: 0.8 })),
  ];
}
