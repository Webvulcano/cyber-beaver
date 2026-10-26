import Link from "next/link";
import JsonLd from "@/components/cms/JsonLd";
import RichText from "@/components/cms/RichText";
import Footer from "@/components/footer/Footer";
import SiteHeader from "@/components/SiteHeader";
import { SITE_URL } from "@/content/site";
import { SERVICE_PAGES, servicePageByKey } from "@/content/pages";
import { getCms } from "@/lib/cms";
import { breadcrumbNode, faqNode, orgNode, serviceNode } from "@/lib/schema";

// Szolgáltatás-aloldal sablon (IBF, TISAX, …): fejléc → hero (morzsamenü, H1, lead, CTA) → tartalmi szakaszok →
// GYIK (a válasz mindig a DOM-ban: <details>) → kapcsolódó oldalak → a főoldali kapcsolat-rész (Footer, #kapcsolat).
// Szöveg: CMS <key>.* (manifest: servicePage), alapérték: content/pages/<key>.js. JSON-LD: Service + FAQPage + Breadcrumb.

// Rich text tipográfia világos háttéren (listák, kiemelés, linkek)
const prose =
  "text-lg text-petrol/80 [&>*+*]:mt-5 [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:space-y-3 [&_ol]:pl-6 [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-petrol-deep [&_a]:font-medium [&_a]:text-petrol-deep [&_a]:underline [&_a]:decoration-lime [&_a]:decoration-2 [&_a]:underline-offset-4";

export async function serviceMetadata(key) {
  const cms = await getCms();
  const { path } = servicePageByKey(key).content;
  const title = cms.text(`${key}.seo.title`);
  const description = cms.text(`${key}.seo.description`);
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", locale: "hu_HU", siteName: "Cyber Beaver", url: path, title, description },
  };
}

function Chevron() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-6 shrink-0 text-petrol transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none"
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
  const { path } = page.content;
  const k = (s) => `${pageKey}.${s}`;
  const title = cms.text(k("hero.title"));
  const sections = cms.list(k("content.sections"));
  const faq = cms.list(k("faq.items")).filter((f) => f.question?.trim() && f.answer?.trim());
  const related = SERVICE_PAGES.filter((p) => p.key !== pageKey);

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

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-petrol text-white">
          <div className="mx-auto max-w-4xl px-4 pt-10 pb-16 md:pt-14 md:pb-24">
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
            <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl" {...cms.attr(k("hero.title"))}>
              {title}
            </h1>
            <RichText
              value={cms.rich(k("hero.lead"))}
              className="mt-8 max-w-3xl text-lg text-white/80 [&>*+*]:mt-4 [&_em]:text-white [&_strong]:font-semibold [&_strong]:text-lime"
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

        {/* Tartalmi szakaszok */}
        {sections.map(({ title: h2, body }, i) => (
          <section key={i} className={i % 2 ? "bg-mist" : "bg-white"}>
            <div className="mx-auto max-w-3xl px-4 py-16 md:py-20">
              <h2
                className="text-2xl font-bold tracking-tight text-petrol-deep md:text-3xl"
                {...cms.attr(k("content.sections"), i, "title")}
              >
                {h2}
              </h2>
              <RichText value={body} className={`mt-6 ${prose}`} {...cms.attr(k("content.sections"), i, "body")} />
            </div>
          </section>
        ))}

        {/* GYIK */}
        {faq.length > 0 && (
          <section className={sections.length % 2 ? "bg-mist" : "bg-white"} aria-labelledby="gyik">
            <div className="mx-auto max-w-3xl px-4 py-16 md:py-20">
              <h2 id="gyik" className="text-2xl font-bold tracking-tight text-petrol-deep md:text-3xl" {...cms.attr(k("faq.title"))}>
                {cms.text(k("faq.title"))}
              </h2>
              <div className="mt-8 border-t border-petrol/15">
                {faq.map(({ question, answer }, i) => (
                  <details key={i} className="group border-b border-petrol/15">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-semibold text-petrol-deep [&::-webkit-details-marker]:hidden">
                      <span {...cms.attr(k("faq.items"), i, "question")}>{question}</span>
                      <Chevron />
                    </summary>
                    <p className="pb-6 text-petrol/80" {...cms.attr(k("faq.items"), i, "answer")}>
                      {answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Kapcsolódó oldalak (belső linkek) */}
        <nav aria-label="További szolgáltatások" className="bg-petrol-deep text-white">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-x-8 gap-y-3 px-4 py-8 text-sm font-semibold">
            <span className="uppercase tracking-[0.2em] text-white/50">További szolgáltatások</span>
            {related.map((p) => (
              <Link key={p.key} href={p.content.path} className="py-1 text-lime hover:text-white">
                {p.label} →
              </Link>
            ))}
            <Link href="/#szolgaltatasok" className="py-1 text-lime hover:text-white">
              Összes szolgáltatás →
            </Link>
          </div>
        </nav>
      </main>

      <Footer />
    </>
  );
}
