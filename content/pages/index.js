// Szolgáltatás-aloldalak listája: manifest (CMS), sitemap, llms.txt, belső linkek ebből dolgoznak.
// key = CMS-oldalkulcs (<key>.hero.title …), label = admin-menü és linkszöveg,
// icon = a főoldali szolgáltatás-kártya ikonkulcsa (content/site.js) → a kártya „Bővebben” linket kap.
import { IBF } from "./ibf";
import { TISAX } from "./tisax";

export const SERVICE_PAGES = [
  { key: "ibf", label: "Információbiztonsági felelős", content: IBF },
  { key: "tisax", label: "TISAX felkészítés", icon: "car", content: TISAX },
];

export const servicePageByKey = (key) => SERVICE_PAGES.find((p) => p.key === key);
export const servicePageByIcon = (icon) => SERVICE_PAGES.find((p) => p.icon && p.icon === icon);
