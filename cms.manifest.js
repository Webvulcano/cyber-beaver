// CMS manifest: which texts the client can edit in the admin (Ügyfél Admin / analytics-site).
// Defaults come from content/site.js. Keys are permanent — renaming one creates a new
// field and archives the old one (its saved content stays in the DB, but unused).
// Members (client Google accounts) go in the gitignored cms.members.local.json, never here.
// Sync: (admin repo) npx tsx scripts/sync-manifest.mjs <this file> --print-secret

import { ABOUT, CONTACT, CONTACT_INFO, FOOTER, HERO, REFERENCES, SEO, SERVICES } from "./content/site";
import { SERVICE_PAGES } from "./content/pages";

// Szolgáltatás-aloldal (components/service-page): ugyanaz a mezőkészlet minden aloldalon.
// Kulcsok: <key>.seo.*, <key>.hero.*, <key>.content.sections (cím + rich text), <key>.faq.* (kérdés–válasz).
const servicePage = (key, label, page) => ({
  key,
  label,
  path: page.path,
  sections: [
    {
      key: "seo",
      label: "Google-megjelenés",
      fields: [
        { key: "title", label: "Oldal címe (Google, böngészőfül)", type: "text", maxLength: 70, hidden: true, default: page.seo.title },
        { key: "description", label: "Leírás (Google találati lista)", type: "textarea", maxLength: 160, hidden: true, default: page.seo.description },
      ],
    },
    {
      key: "hero",
      label: "Nyitó rész",
      fields: [
        { key: "eyebrow", label: "Felirat a cím felett", type: "text", maxLength: 30, default: page.hero.eyebrow },
        { key: "title", label: "Főcím", type: "text", maxLength: 80, default: page.hero.title },
        { key: "lead", label: "Bevezető", type: "richtext", default: page.hero.lead },
        { key: "cta", label: "Gomb felirata", type: "text", maxLength: 30, default: page.hero.cta },
      ],
    },
    {
      key: "content",
      label: "Tartalom",
      fields: [
        {
          key: "sections",
          label: "Szakaszok",
          type: "list",
          itemFields: [
            { key: "title", label: "Alcím", type: "text", maxLength: 90 },
            { key: "body", label: "Szöveg", type: "richtext" },
          ],
          default: page.sections,
        },
      ],
    },
    {
      key: "faq",
      label: "Gyakori kérdések",
      fields: [
        { key: "title", label: "Cím", type: "text", maxLength: 60, default: page.faqTitle },
        {
          key: "items",
          label: "Kérdések",
          type: "list",
          itemFields: [
            { key: "question", label: "Kérdés", type: "text", maxLength: 140 },
            { key: "answer", label: "Válasz", type: "textarea", maxLength: 900 },
          ],
          default: page.faq,
        },
      ],
    },
  ],
});

const manifest = {
  site: {
    slug: "cyber-beaver",
    name: "Cyber Beaver",
    // Most a Vercel-deploy; saját domain (cyberbeaver.hu) bekötésekor ide + sync.
    url: "https://cyber-beaver.vercel.app",
    revalidatePath: "/api/revalidate",
  },
  locales: [{ code: "hu", label: "Magyar" }],
  members: [],
  analytics: {},
  pages: [
    {
      key: "home",
      label: "Főoldal",
      path: "/",
      sections: [
        {
          key: "seo",
          label: "Google-megjelenés",
          fields: [
            { key: "title", label: "Oldal címe (Google, böngészőfül)", type: "text", maxLength: 70, hidden: true, default: SEO.title },
            { key: "description", label: "Leírás (Google találati lista)", type: "textarea", maxLength: 160, hidden: true, default: SEO.description },
          ],
        },
        {
          key: "contact_info",
          label: "Elérhetőségek",
          fields: [
            { key: "email", label: "E-mail", type: "text", maxLength: 80, default: CONTACT_INFO.email },
            { key: "phone", label: "Telefonszám", type: "text", maxLength: 30, default: CONTACT_INFO.phone },
            { key: "linkedin", label: "LinkedIn link", type: "url", hidden: true, default: CONTACT_INFO.linkedin },
          ],
        },
        {
          key: "hero",
          label: "Nyitó rész",
          fields: [
            { key: "company", label: "Cégnév a cím felett", type: "text", maxLength: 40, default: HERO.company },
            { key: "title_highlight", label: "Főcím — kiemelt első sor", type: "text", maxLength: 30, default: HERO.titleHighlight },
            { key: "title", label: "Főcím — második sor", type: "text", maxLength: 60, default: HERO.title },
            { key: "subtitle", label: "Alcím", type: "textarea", maxLength: 160, default: HERO.subtitle },
            { key: "cta", label: "Gomb felirata", type: "text", maxLength: 30, default: HERO.cta },
            {
              key: "services",
              label: "Szolgáltatás-sor (a gomb alatt)",
              type: "list",
              itemFields: [{ key: "label", label: "Felirat", type: "text", maxLength: 30 }],
              default: HERO.services.map((label) => ({ label })),
            },
          ],
        },
        {
          key: "about",
          label: "Rólam",
          fields: [
            { key: "eyebrow", label: "Felirat a cím felett", type: "text", maxLength: 30, default: ABOUT.eyebrow },
            { key: "title", label: "Cím — első rész", type: "text", maxLength: 60, default: ABOUT.title },
            { key: "title_highlight", label: "Cím — kiemelt rész", type: "text", maxLength: 80, default: ABOUT.titleHighlight },
            { key: "body", label: "Bemutatkozás", type: "richtext", default: ABOUT.body },
            { key: "certs_title", label: "Tanúsítványok címe", type: "text", maxLength: 40, default: ABOUT.certsTitle },
          ],
        },
        {
          key: "services",
          label: "Szolgáltatások",
          fields: [
            { key: "title", label: "Cím", type: "text", maxLength: 60, default: SERVICES.title },
            { key: "ibf_title", label: "Kiemelt szolgáltatás — cím", type: "text", maxLength: 60, default: SERVICES.ibfTitle },
            { key: "ibf_text", label: "Kiemelt szolgáltatás — leírás", type: "richtext", default: SERVICES.ibfText },
            { key: "ibf_cta", label: "Kiemelt szolgáltatás — gomb", type: "text", maxLength: 30, default: SERVICES.ibfCta },
            { key: "ibf_more", label: "Kiemelt szolgáltatás — link az aloldalra", type: "text", maxLength: 50, default: SERVICES.ibfMore },
            {
              key: "ibf_tasks",
              label: "Kiemelt szolgáltatás — feladatok",
              type: "list",
              itemFields: [{ key: "text", label: "Feladat", type: "text", maxLength: 120 }],
              default: SERVICES.ibfTasks.map((text) => ({ text })),
            },
            { key: "others_title", label: "További szolgáltatások címe", type: "text", maxLength: 60, default: SERVICES.othersTitle },
            {
              key: "items",
              label: "További szolgáltatások",
              type: "list",
              itemFields: [
                { key: "icon", label: "Ikon", type: "text", maxLength: 20, hidden: true },
                { key: "title", label: "Cím", type: "text", maxLength: 60 },
                { key: "text", label: "Részletek", type: "textarea", maxLength: 600 },
              ],
              default: SERVICES.items,
            },
          ],
        },
        {
          key: "references",
          label: "Referenciák",
          fields: [
            { key: "title", label: "Cím", type: "text", maxLength: 60, default: REFERENCES.title },
            { key: "intro", label: "Bevezető", type: "textarea", maxLength: 200, default: REFERENCES.intro },
            {
              key: "items",
              label: "Referenciák",
              type: "list",
              itemFields: [
                { key: "sector", label: "Ágazat", type: "text", maxLength: 20, hidden: true },
                { key: "years", label: "Év(ek)", type: "text", maxLength: 20 },
                { key: "title", label: "Cím", type: "text", maxLength: 60 },
                { key: "client", label: "Ügyfél", type: "text", maxLength: 60 },
                { key: "text", label: "Leírás", type: "textarea", maxLength: 300 },
                { key: "tags", label: "Címkék (soronként egy)", type: "textarea", lines: true, maxLength: 120 },
              ],
              default: REFERENCES.items,
            },
          ],
        },
        {
          key: "contact",
          label: "Kapcsolat",
          fields: [
            { key: "eyebrow", label: "Felirat a cím felett", type: "text", maxLength: 30, default: CONTACT.eyebrow },
            { key: "title", label: "Cím", type: "text", maxLength: 80, default: CONTACT.title },
            { key: "text", label: "Szöveg", type: "textarea", maxLength: 240, default: CONTACT.text },
            { key: "call_cta", label: "Hívás gomb felirata (a szám elé)", type: "text", maxLength: 30, default: CONTACT.callCta },
          ],
        },
        {
          key: "footer",
          label: "Lábléc",
          fields: [
            { key: "quote", label: "Idézet a logó alatt", type: "text", maxLength: 100, default: FOOTER.quote },
            { key: "address", label: "Cím-sorok (soronként egy)", type: "textarea", lines: true, maxLength: 120, default: FOOTER.addressLines },
            { key: "rights", label: "Copyright sor (az évszám után)", type: "text", maxLength: 100, default: FOOTER.rights },
          ],
        },
      ],
    },
    ...SERVICE_PAGES.map((p) => servicePage(p.key, p.label, p.content)),
  ],
};

export default manifest;
