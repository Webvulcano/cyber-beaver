import Link from "next/link";
import JsonLd from "@/components/cms/JsonLd";
import RichText from "@/components/cms/RichText";
import Footer from "@/components/footer/Footer";
import SiteHeader from "@/components/SiteHeader";
import { SITE_URL } from "@/content/site";
import { SERVICE_PAGES, servicePageByKey } from "@/content/pages";
import { getCms } from "@/lib/cms";
import { breadcrumbNode, faqNode, orgNode, serviceNode } from "@/lib/schema";
import { Block, DARK_BLOCKS } from "./blocks";
import FaqItem from "./FaqItem";
import SectionNav from "./SectionNav";

// Szolgáltatás-aloldal sablon (IBF, …): fejléc → hero (morzsamenü, H1, lead, CTA) → típusos blokkok (blocks.jsx)
// + oldalsó szakasz-navigáció az ablak bal szélén (SectionNav, xl-től) → GYIK (<details>, a válasz mindig a DOM-ban) → kapcsolódó oldalak → Footer (#kapcsolat).
// Szöveg: CMS <oldal>.* (manifest: servicePage), alapérték + blokk-sorrend: content/pages/<oldal>.js.
// JSON-LD: Service + FAQPage + Breadcrumb + cég.

const ALL_SERVICES = "/#szolgaltatasok";

export async function serviceMetadata(key) {
  const cms = await getCms();
  const page = servicePageByKey(key);
  const { path } = page.content;
  const title = cms.text(`${key}.seo.title`);
  const description = cms.text(`${key}.seo.description`);
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", locale: "hu_HU", siteName: "Cyber Beaver", url: path, title, description },
    // jóváhagyásig (published: false) ne indexelje a Google
    ...(!page.published && { robots: { index: false, follow: false } }),
  };
}

function Chevron() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-6 shrink-0 text-petrol transition-transform duration-300 group-[[open]:not([data-closing])]:rotate-180 motion-reduce:transition-none"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default async function ServicePage({ pageKey }) {
  const cms = await getCms();
  const page = servicePageByKey(pageKey);
  const { path, blocks } = page.content;
  const k = (s) => `${pageKey}.${s}`;
  const title = cms.text(k("hero.title"));
  const faq = cms.list(k("faq.items")).filter((f) => f.question?.trim() && f.answer?.trim());
  const related = SERVICE_PAGES.filter((p) => p.key !== pageKey);

  // Világos blokkok felváltva fehér / szürke háttérrel (a sötét és accent blokkok kimaradnak a váltásból)
  let light = 0;
  const bgs = blocks.map((b) => (DARK_BLOCKS.has(b.type) ? null : light++ % 2 ? "mist" : "white"));
  const faqBg = light % 2 ? "bg-mist" : "bg-white";
  const nav = [...blocks.filter((b) => b.nav).map((b) => ({ id: b.key, label: b.nav })), ...(faq.length ? [{ id: "gyik", label: "Gyakori kérdések" }] : [])];
  // minden szakasz a navigáció színéhez: sötét sávok (számsáv, bizalmi sáv) fölött világos a navigáció
  const navSections = [...blocks.map((b) => ({ id: b.key, dark: b.type === "stats" || b.type === "trust" })), ...(faq.length ? [{ id: "gyik", dark: false }] : [])];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { ...serviceNode(title, cms.text(k("seo.description")), `${SITE_URL}${path}`), "@id": `${SITE_URL}${path}#service` },
      orgNode(cms),
      ...(faq.length ? [faqNode(faq)] : []),
      breadcrumbNode([
        { name: "Főoldal", path: "/" },
        { name: page.label, path },
      ]),
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <SiteHeader contactHref="#kapcsolat" />
      {nav.length > 0 && <SectionNav items={nav} sections={navSections} />}

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-petrol text-white">
          <div className="mx-auto max-w-6xl px-4 pt-10 pb-20 md:pt-14 md:pb-28">
            <nav aria-label="Morzsamenü" className="text-sm text-white/60">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-lime">
                    Főoldal
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-white/80">
                  {page.label}
                </li>
              </ol>
            </nav>

            <p className="mt-10 text-sm font-semibold uppercase tracking-[0.2em] text-lime" {...cms.attr(k("hero.eyebrow"))}>
              {cms.text(k("hero.eyebrow"))}
            </p>
            <h1 className="mt-4 max-w-4xl text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl" {...cms.attr(k("hero.title"))}>
              {title}
            </h1>
            <RichText
              value={cms.rich(k("hero.lead"))}
              className="mt-8 max-w-2xl text-lg text-white/80 [&>*+*]:mt-4 [&_em]:text-white [&_strong]:font-semibold [&_strong]:text-lime"
              {...cms.attr(k("hero.lead"))}
            />
            <a
              href="#kapcsolat"
              className="mt-10 inline-block w-full rounded-full bg-lime px-10 py-4 text-center font-semibold text-petrol-deep transition hover:brightness-110 sm:w-auto"
              {...cms.attr(k("hero.cta"))}
            >
              {cms.text(k("hero.cta"))}
            </a>
          </div>
        </section>

        {blocks.map((block, i) => (
          <Block key={block.key} cms={cms} pageKey={pageKey} block={block} bg={bgs[i]} />
        ))}

        {/* GYIK */}
        {faq.length > 0 && (
          <section id="gyik" className={`scroll-mt-16 ${faqBg}`} aria-labelledby="gyik-cim">
            <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
              <h2 id="gyik-cim" className="text-2xl font-bold tracking-tight text-petrol-deep md:text-3xl" {...cms.attr(k("faq.title"))}>
                {cms.text(k("faq.title"))}
              </h2>
              <div className="mt-8 border-t border-petrol/15">
                {faq.map(({ question, answer }, i) => (
                  <FaqItem
                    key={i}
                    summary={
                      <>
                        <span {...cms.attr(k("faq.items"), i, "question")}>{question}</span>
                        <Chevron />
                      </>
                    }
                  >
                    <p className="pb-6 text-petrol/80" {...cms.attr(k("faq.items"), i, "answer")}>
                      {answer}
                    </p>
                  </FaqItem>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Kapcsolódó oldalak (belső linkek) */}
        <nav aria-label="További szolgáltatások" className="bg-petrol-deep text-white">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-3 px-4 py-8 text-sm font-semibold">
            <span className="uppercase tracking-[0.2em] text-white/50">További szolgáltatások</span>
            {related.map((p) => (
              <Link key={p.key} href={p.content.path} className="py-1 text-lime hover:text-white">
                {p.label} →
              </Link>
            ))}
            {/* sima <a>: a Next Link oldalak között nem görget a hash-hez (lásd SiteHeader) */}
            <a href={ALL_SERVICES} className="py-1 text-lime hover:text-white">
              Összes szolgáltatás →
            </a>
          </div>
        </nav>
      </main>

      <Footer />
    </>
  );
}
