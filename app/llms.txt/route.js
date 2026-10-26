import { COMPANY, SITE_URL } from "@/content/site";
import { SERVICE_PAGES } from "@/content/pages";
import { getCms, splitLines } from "@/lib/cms";

// /llms.txt (llmstxt.org): tömör, markdown összefoglaló az AI-keresőknek / LLM-eknek.
// A CMS-ből épül (mint a JSON-LD), így az admin mentése (revalidateTag) ezt is frissíti.
export const dynamic = "force-static";

export async function GET() {
  const cms = await getCms();
  const t = (key) => cms.text(key).trim();
  const phone = t("home.contact_info.phone");
  const linkedin = t("home.contact_info.linkedin");
  const { address: a } = COMPANY;

  const services = cms
    .list("home.services.items")
    .map(({ title, text }) => (text?.trim() ? `- **${title}**: ${text.trim()}` : `- **${title}**`));

  const references = cms.list("home.references.items").map(({ title, client, years, text, tags }) => {
    const head = [client, years].filter(Boolean).join(", ");
    const tagList = splitLines(tags).join(", ");
    return `- **${title}**${head ? ` (${head})` : ""}: ${text?.trim() ?? ""}${tagList ? ` Témák: ${tagList}.` : ""}`;
  });

  // Szolgáltatás-aloldalak: leírás + GYIK (az AI-keresők kérdés–válasz párokat idéznek)
  const pages = SERVICE_PAGES.flatMap(({ key, content }) => {
    const faq = cms.list(`${key}.faq.items`).filter((f) => f.question?.trim() && f.answer?.trim());
    return [
      `## ${cms.text(`${key}.hero.title`)}`,
      "",
      `${SITE_URL}${content.path}`,
      "",
      cms.text(`${key}.hero.lead`).trim(),
      "",
      ...faq.flatMap(({ question, answer }) => [`### ${question.trim()}`, "", answer.trim(), ""]),
    ];
  });

  const lines = [
    `# ${COMPANY.name} Kft.`,
    "",
    `> ${t("home.seo.description")}`,
    "",
    `${t("home.about.title")} ${t("home.about.title_highlight")} ${t("home.about.body")}`,
    "",
    "## Cégadatok",
    "",
    `- Cégnév: ${COMPANY.legalName} (${COMPANY.name} Kft.)`,
    `- Székhely: ${a.postalCode} ${a.city}, ${a.street}`,
    `- Adószám: ${COMPANY.taxId}`,
    `- Alapítva: ${COMPANY.foundingDate}`,
    `- Ügyvezető, tanácsadó: ${COMPANY.founder}`,
    `- Tanúsítvány: ${COMPANY.credentials.map((c) => `${c.name} (${c.issuer})`).join(", ")}`,
    "- Szolgáltatási terület: Magyarország, magyar nyelven",
    "",
    `## Kiemelt szolgáltatás: ${t("home.services.ibf_title")}`,
    "",
    t("home.services.ibf_text"),
    "",
    "Feladatok:",
    ...cms.list("home.services.ibf_tasks").map(({ text }) => `- ${text}`),
    "",
    ...pages,
    `## ${t("home.services.others_title")}`,
    "",
    ...services,
    "",
    `## ${t("home.references.title")}`,
    "",
    ...references,
    "",
    "## Kapcsolat",
    "",
    `- E-mail: ${t("home.contact_info.email")}`,
    `- Telefon: ${phone}`,
    ...(linkedin ? [`- LinkedIn (${COMPANY.founder}): ${linkedin}`] : []),
    `- Weboldal: ${SITE_URL}/`,
    "",
    t("home.contact.text"),
    "",
    "## Oldalak",
    "",
    `- [Főoldal](${SITE_URL}/): szolgáltatások, bemutatkozás, referenciák, kapcsolat`,
    ...SERVICE_PAGES.map(({ key, content }) => `- [${cms.text(`${key}.hero.title`)}](${SITE_URL}${content.path}): ${cms.text(`${key}.seo.description`)}`),
    `- [Impresszum](${SITE_URL}/impresszum): cégadatok`,
    `- [Adatkezelési tájékoztató](${SITE_URL}/adatkezeles)`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
