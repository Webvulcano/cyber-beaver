import JsonLd from "@/components/cms/JsonLd";
import { COMPANY, SITE_URL } from "@/content/site";
import { getCms } from "@/lib/cms";

// Főoldali JSON-LD (@graph): cég (ProfessionalService) + alapító (Person) + WebSite + szolgáltatások (OfferCatalog).
// Elérhetőség és szolgáltatás-szövegek a CMS-ből, hogy egyezzenek a látható tartalommal.
export default async function StructuredData() {
  const cms = await getCms();
  const org = `${SITE_URL}/#org`;
  const person = `${SITE_URL}/#balazs`;
  const linkedin = cms.text("home.contact_info.linkedin");
  const phone = cms.text("home.contact_info.phone");

  const service = (name, description) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name, ...(description && { description }), provider: { "@id": org }, areaServed: "HU" },
  });

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": org,
        name: COMPANY.name,
        legalName: COMPANY.legalName,
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/logo.jpg`,
        image: `${SITE_URL}/logo.jpg`,
        description: cms.text("home.seo.description"),
        slogan: COMPANY.slogan,
        email: cms.text("home.contact_info.email"),
        telephone: phone.replace(/[^\d+]/g, ""),
        taxID: COMPANY.taxId,
        foundingDate: COMPANY.foundingDate,
        address: {
          "@type": "PostalAddress",
          streetAddress: COMPANY.address.street,
          postalCode: COMPANY.address.postalCode,
          addressLocality: COMPANY.address.city,
          addressCountry: COMPANY.address.country,
        },
        areaServed: { "@type": "Country", name: "Magyarország" },
        founder: { "@id": person },
        knowsAbout: COMPANY.knowsAbout,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Információbiztonsági szolgáltatások",
          itemListElement: [
            service(cms.text("home.services.ibf_title"), cms.text("home.services.ibf_text")),
            ...cms.list("home.services.items").map(({ title, text }) => service(title, text)),
          ],
        },
      },
      {
        "@type": "Person",
        "@id": person,
        name: COMPANY.founder,
        jobTitle: COMPANY.founderTitle,
        image: `${SITE_URL}/nincshatter3.webp`,
        worksFor: { "@id": org },
        ...(linkedin && { sameAs: [linkedin] }),
        knowsAbout: COMPANY.knowsAbout,
        hasCredential: COMPANY.credentials.map((c) => ({
          "@type": "EducationalOccupationalCredential",
          name: c.name,
          credentialCategory: "certification",
          url: c.url,
          recognizedBy: { "@type": "Organization", name: c.issuer },
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: COMPANY.name,
        inLanguage: "hu-HU",
        publisher: { "@id": org },
      },
    ],
  };

  return <JsonLd data={data} />;
}
