import JsonLd from "@/components/cms/JsonLd";
import { COMPANY, SITE_URL } from "@/content/site";
import { publishedPath } from "@/content/pages";
import { getCms } from "@/lib/cms";
import { ORG_ID, orgNode, personNode, serviceNode } from "@/lib/schema";

// Főoldali JSON-LD (@graph): cég (ProfessionalService) + alapító (Person) + WebSite + szolgáltatások (OfferCatalog).
// Elérhetőség és szolgáltatás-szövegek a CMS-ből, hogy egyezzenek a látható tartalommal.
export default async function StructuredData() {
  const cms = await getCms();
  const offer = (name, description, url) => ({ "@type": "Offer", itemOffered: serviceNode(name, description, url) });

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      orgNode(cms, {
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Információbiztonsági szolgáltatások",
          itemListElement: [
            offer(
              cms.text("home.services.ibf_title"),
              cms.text("home.services.ibf_text"),
              publishedPath("ibf") && `${SITE_URL}${publishedPath("ibf")}`,
            ),
            ...cms.list("home.services.items").map(({ title, text }) => offer(title, text)),
          ],
        },
      }),
      personNode(cms),
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: COMPANY.name,
        inLanguage: "hu-HU",
        publisher: { "@id": ORG_ID },
      },
    ],
  };

  return <JsonLd data={data} />;
}
