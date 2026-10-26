// JSON-LD építőkockák (schema.org). A cég és az alapító node-ja minden oldalon ugyanaz az @id-val,
// így a főoldal és az aloldalak egy entitásra mutatnak. Elérhetőség a CMS-ből (= a látható tartalom).
import { COMPANY, SITE_URL } from "@/content/site";

export const ORG_ID = `${SITE_URL}/#org`;
export const PERSON_ID = `${SITE_URL}/#balazs`;

export function orgNode(cms, extra = {}) {
  const { address: a } = COMPANY;
  return {
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/logo.jpg`,
    image: `${SITE_URL}/logo.jpg`,
    description: cms.text("home.seo.description"),
    slogan: COMPANY.slogan,
    email: cms.text("home.contact_info.email"),
    telephone: cms.text("home.contact_info.phone").replace(/[^\d+]/g, ""),
    taxID: COMPANY.taxId,
    foundingDate: COMPANY.foundingDate,
    address: {
      "@type": "PostalAddress",
      streetAddress: a.street,
      postalCode: a.postalCode,
      addressLocality: a.city,
      addressCountry: a.country,
    },
    areaServed: { "@type": "Country", name: "Magyarország" },
    founder: { "@id": PERSON_ID },
    knowsAbout: COMPANY.knowsAbout,
    ...extra,
  };
}

export function personNode(cms) {
  const linkedin = cms.text("home.contact_info.linkedin");
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: COMPANY.founder,
    jobTitle: COMPANY.founderTitle,
    image: `${SITE_URL}/nincshatter3.webp`,
    worksFor: { "@id": ORG_ID },
    ...(linkedin && { sameAs: [linkedin] }),
    knowsAbout: COMPANY.knowsAbout,
    hasCredential: COMPANY.credentials.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.name,
      credentialCategory: "certification",
      url: c.url,
      recognizedBy: { "@type": "Organization", name: c.issuer },
    })),
  };
}

export const serviceNode = (name, description, url) => ({
  "@type": "Service",
  name,
  ...(description && { description }),
  ...(url && { url }),
  provider: { "@id": ORG_ID },
  areaServed: { "@type": "Country", name: "Magyarország" },
});

export const faqNode = (items) => ({
  "@type": "FAQPage",
  mainEntity: items.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
});

// crumbs: [{ name, path }] — a főoldallal kezdve
export const breadcrumbNode = (crumbs) => ({
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: `${SITE_URL}${c.path}`,
  })),
});
