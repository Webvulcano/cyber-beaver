import { SITE_URL } from "@/content/site";
import { SERVICE_PAGES } from "@/content/pages";

// Indexelendő oldalak: főoldal + szolgáltatás-aloldalak (content/pages). A jogi oldalak noindex-esek, ezért nincsenek itt.
export default function sitemap() {
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    ...SERVICE_PAGES.map((p) => ({ url: `${SITE_URL}${p.content.path}`, lastModified, changeFrequency: "monthly", priority: 0.8 })),
  ];
}
