import { getCms } from "@/lib/cms";
import RichText from "@/components/cms/RichText";

// Tartalom: a régi cyberbeaver.hu bemutatkozó szövege alapján.
// Minősítések: zemitis.hu "Rólunk" szekció alapján.
const FACTS = [
  //{ value: "CISA", label: "Minősített informatikai rendszerellenőr", logo: "/minositesek/cisa.webp" },
  //{ value: "CISM", label: "Minősített információbiztonsági menedzser", logo: "/minositesek/cism.webp" },
  { value: "CIPM", label: "Certified Information Privacy Manager", logo: "/minositesek/tanusitvany1.png", href: "https://iapp.org/certify/cipm" },
];

export default async function About() {
  const cms = await getCms();

  return (
    <section id="rolam" className="overflow-hidden bg-petrol-deep text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:items-start px-4 py-24 md:grid-cols-[auto_1fr] md:gap-16 md:py-32">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/60" {...cms.attr("home.about.eyebrow")}>
            {cms.text("home.about.eyebrow")}
          </p>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            <span {...cms.attr("home.about.title")}>{cms.text("home.about.title")}</span>{" "}
            <span className="text-lime" {...cms.attr("home.about.title_highlight")}>
              {cms.text("home.about.title_highlight")}
            </span>
          </h2>

          <RichText
            value={cms.rich("home.about.body")}
            className="mt-8 max-w-2xl space-y-5 text-lg text-white/80 [&_strong]:font-semibold [&_strong]:text-white"
            {...cms.attr("home.about.body")}
          />

          <h3 className="mt-12 border-t border-white/15 pt-8 text-sm font-semibold uppercase tracking-[0.2em] text-white/60"
            {...cms.attr("home.about.certs_title")}
          >
            {cms.text("home.about.certs_title")}
          </h3>
          <dl className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-3">
            {FACTS.map(({ value, label, logo, href }) => {
              const content = (
                <>
                  <img src={logo} alt={`${value} ${label}`} loading="lazy" className="mx-auto mb-3 h-auto w-16" />
                  {value}
                </>
              );
              return (
                <div key={value} className="flex flex-col-reverse justify-end text-center">
                  <dt className="mt-1 text-sm text-white/60">{label}</dt>
                  <dd className="text-xl font-bold text-lime">
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block transition-opacity hover:opacity-80">
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>

        {/* kivágott portré lime keretes körbe vágva, desktopon bal oldalt (a kerek logó visszhangja) */}
        <div className="relative mx-auto aspect-square w-72 overflow-hidden rounded-full border-[3px] border-lime bg-petrol sm:w-80 md:order-first md:w-96">
          <img
            src="/nincshatter3.webp"
            alt="Agárdy Balázs, a Cyber Beaver alapítója"
            width={900}
            height={1703}
            loading="lazy"
            className="absolute top-[8%] -left-[18%] h-auto w-[110%] max-w-none"
          />
        </div>
      </div>
    </section>
  );
}
