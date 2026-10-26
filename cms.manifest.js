// CMS manifest: which texts the client can edit in the admin (Ügyfél Admin / analytics-site).
// Defaults come from content/site.js. Keys are permanent — renaming one creates a new
// field and archives the old one (its saved content stays in the DB, but unused).
// Members (client Google accounts) go in the gitignored cms.members.local.json, never here.
// Sync: (admin repo) npx tsx scripts/sync-manifest.mjs <this file> --print-secret

import { ABOUT, CONTACT, CONTACT_INFO, FOOTER, HERO, REFERENCES, SEO, SERVICES } from "./content/site";
import { SERVICE_PAGES } from "./content/pages";

// Szolgáltatás-aloldal (components/service-page): hero + típusos blokkok (content/pages/<oldal>.js → blocks) + GYIK.
// Kulcsok: <oldal>.seo.*, <oldal>.hero.*, <oldal>.<blokk-kulcs>.*, <oldal>.faq.*. A blokk típusa határozza meg a mezőket.
const text = (key, label, def, maxLength = 90) => ({ key, label, type: "text", maxLength, default: def });
const area = (key, label, def, maxLength = 600) => ({ key, label, type: "textarea", maxLength, default: def });
const list = (key, label, itemFields, def) => ({ key, label, type: "list", itemFields, default: def });
const it = (key, label, type = "text", extra = {}) => ({ key, label, type, ...extra });

function blockFields(b) {
  const head = [text("title", "Cím", b.title), ...(b.intro !== undefined ? [area("intro", "Bevezető", b.intro, 400)] : [])];
  const note = b.note !== undefined ? [area("note", "Kiemelt megjegyzés", b.note, 400)] : [];
  switch (b.type) {
    case "cards":
      return [
        ...head,
        list("items", "Kártyák", [it("icon", "Ikon", "text", { maxLength: 20, hidden: true }), it("title", "Cím"), it("text", "Szöveg", "textarea", { maxLength: 300 })], b.items),
        ...note,
        ...(b.noteCta !== undefined ? [text("note_cta", "Megjegyzés gombja", b.noteCta, 40)] : []),
      ];
    case "checklist":
      return [...head, list("items", "Pontok", [it("text", "Pont", "textarea", { maxLength: 300 })], b.items), ...note];
    case "stats":
      return [...head, list("items", "Számok", [it("value", "Szám / érték", "text", { maxLength: 20 }), it("label", "Magyarázat", "text", { maxLength: 120 })], b.items)];
    case "duo":
      return [...head, list("items", "Kártyák", [it("title", "Cím"), it("points", "Pontok (soronként egy)", "textarea", { maxLength: 500 })], b.items), ...note];
    case "compare":
      return [
        ...head,
        text("col_a", "Bal oszlop fejléce", b.colA, 40),
        text("col_b", "Jobb oszlop fejléce", b.colB, 40),
        list("rows", "Sorok", [it("label", "Szempont"), it("a", "Bal oszlop", "textarea", { maxLength: 200 }), it("b", "Jobb oszlop", "textarea", { maxLength: 200 })], b.rows),
        ...note,
      ];
    case "steps":
      return [...head, list("items", "Lépések", [it("title", "Lépés"), it("text", "Leírás", "textarea", { maxLength: 300 })], b.items)];
    case "chips":
      return [...head, list("items", "Címkék", [it("name", "Név", "text", { maxLength: 40 }), it("desc", "Leírás", "text", { maxLength: 120 }), it("level", "Szint", "text", { maxLength: 10 })], b.items)];
    case "trust":
      return [
        ...head,
        list("stats", "Számok", [it("value", "Szám / érték", "text", { maxLength: 20 }), it("label", "Magyarázat", "text", { maxLength: 120 })], b.stats),
        list("points", "Tapasztalatok", [it("text", "Pont", "textarea", { maxLength: 200 })], b.points),
        area("quote", "Kiemelt mondat", b.quote, 240),
      ];
    case "cta":
      return [text("title", "Cím", b.title), area("text", "Szöveg", b.text, 300), text("cta", "Gomb felirata", b.cta, 30)];
    case "prose":
      return [text("title", "Cím", b.title), { key: "body", label: "Szöveg", type: "richtext", default: b.body }];
    default:
      throw new Error(`Ismeretlen blokk-típus: ${b.type} (${b.key})`);
  }
}

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
        text("eyebrow", "Felirat a cím felett", page.hero.eyebrow, 30),
        text("title", "Főcím", page.hero.title, 80),
        { key: "lead", label: "Bevezető", type: "richtext", default: page.hero.lead },
        text("cta", "Gomb felirata", page.hero.cta, 30),
      ],
    },
    ...page.blocks.map((b) => ({ key: b.key, label: b.label, fields: blockFields(b) })),
    {
      key: "faq",
      label: "Gyakori kérdések",
      fields: [
        text("title", "Cím", page.faqTitle, 60),
        list("items", "Kérdések", [it("question", "Kérdés", "text", { maxLength: 140 }), it("answer", "Válasz", "textarea", { maxLength: 900 })], page.faq),
      ],
    },
  ],
});

const manifest = {
  site: {
    slug: "cyber-beaver",
    name: "Cyber Beaver",
    // Saját domain (2026-10-26-tól); revalidate ide megy → admin-mentés frissíti az éles oldalt.
    url: "https://cyberbeaver.hu",
    revalidatePath: "/api/revalidate",
  },
  locales: [{ code: "hu", label: "Magyar" }],
  members: [],
  analytics: {
    vercel: {
      projectId: "prj_yNW7jP4s8qzp0KyDWYbrN7ms6toN",
      teamId: "team_3e4PonEWGDktxZ3jN5cVjuN8",
      // Valódi konverziók (lib/analytics.js eseménynevei); a többi esemény = érdeklődés.
      conversions: ["Telefonhívás", "Email", "Űrlapküldés"],
    },
  },
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
