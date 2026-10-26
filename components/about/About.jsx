import { getCms } from "@/lib/cms";
import RichText from "@/components/cms/RichText";

// Tartalom: a régi cyberbeaver.hu bemutatkozó szövege alapján.
// Minősítések: zemitis.hu "Rólunk" szekció alapján.
const FACTS = [
  //{ value: "CISA", label: "Minősített informatikai rendszerellenőr", logo: "/minositesek/cisa.webp" },
  //{ value: "CISM", label: "Minősített információbiztonsági menedzser", logo: "/minositesek/cism.webp" },
  { value: "CIPM", label: "Certified Information Privacy Manager", logo: "/minositesek/cipm.webp", href: "https://iapp.org/certify/cipm" },
];

// Kivágott portré lime keretes körbe vágva (a kerek logó visszhangja). Méret/láthatóság: className.
function Portrait({ className }) {
  return (
    <div className={`relative aspect-square shrink-0 overflow-hidden rounded-full border-[3px] border-lime bg-petrol ${className}`}>
      <img
        src="/nincshatter3.webp"
        alt="Agárdy Balázs, a Cyber Beaver alapítója"
        width={900}
        height={1703}
        loading="lazy"
        className="absolute top-[8%] -left-[18%] h-auto w-[110%] max-w-none"
      />
    </div>
  );
}

export default async function About() {
  const cms = await getCms();

  return (
    <section id="rolam" className="scroll-mt-16 overflow-hidden bg-petrol-deep text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-20 md:grid-cols-[auto_1fr] md:items-start md:gap-10 md:py-32 lg:gap-16">
        <div className="min-w-0">
          {/* mobilon: kis portré egy sorban a "Rólam" + név sorral, a kiemelt rész alatta teljes szélességben
              (a H2 `contents` → a két span külön rácselem lesz). md-től sima blokk, a nagy portré bal oldalt. */}
          <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 md:block">
            <Portrait className="row-span-2 w-24 md:hidden" />
            <p className="mb-1 text-sm font-semibold uppercase tracking-[0.2em] text-white/60 md:mb-4" {...cms.attr("home.about.eyebrow")}>
              {cms.text("home.about.eyebrow")}
            </p>
            <h2 className="contents text-2xl font-bold tracking-tight sm:text-3xl md:block lg:text-4xl">
              <span {...cms.attr("home.about.title")}>{cms.text("home.about.title")}</span>{" "}
              <span className="col-span-2 mt-1 text-lime md:mt-0" {...cms.attr("home.about.title_highlight")}>
                {cms.text("home.about.title_highlight")}
              </span>
            </h2>
          </div>

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

        {/* desktopon portré bal oldalt: md-n kisebb, hogy a szövegoszlop elférjen; lg-től nagy (mobilon a fejléc-sorban van a kicsi) */}
        <Portrait className="order-first hidden w-52 md:block lg:w-80" />
      </div>
    </section>
  );
}
