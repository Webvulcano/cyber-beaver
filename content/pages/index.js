// Szolgáltatás-aloldalak listája: manifest (CMS), sitemap, llms.txt, belső linkek ebből dolgoznak.
// key = CMS-oldalkulcs (<key>.hero.title …), label = admin-menü és linkszöveg,
// icon = a főoldali szolgáltatás-kártya ikonkulcsa (content/site.js) → a kártya „Bővebben” linket kap.
// published = false: az oldal közvetlen URL-en elérhető (jóváhagyásra), de noindex, és sehonnan nem linkeljük
// (főoldal, footer, sitemap, llms.txt, JSON-LD). Jóváhagyás után true → minden link visszajön.
import { IBF } from "./ibf";

export const SERVICE_PAGES = [
  { key: "ibf", label: "Információbiztonsági felelős", published: false, content: IBF },
];

export const servicePageByKey = (key) => SERVICE_PAGES.find((p) => p.key === key);
export const PUBLISHED_PAGES = SERVICE_PAGES.filter((p) => p.published);
// publikus link egy aloldalra, vagy null, ha még nincs publikálva
export const publishedPath = (key) => {
  const p = servicePageByKey(key);
  return p?.published ? p.content.path : null;
};
export const servicePageByIcon = (icon) => PUBLISHED_PAGES.find((p) => p.icon && p.icon === icon);
