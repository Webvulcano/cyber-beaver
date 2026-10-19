// Tartalom: a régi cyberbeaver.hu bemutatkozó szövege alapján.
// Minősítések: zemitis.hu "Rólunk" szekció alapján.
const FACTS = [
  //{ value: "CISA", label: "Minősített informatikai rendszerellenőr", logo: "/minositesek/cisa.webp" },
  //{ value: "CISM", label: "Minősített információbiztonsági menedzser", logo: "/minositesek/cism.webp" },
  { value: "CIPM", label: "Certified Information Privacy Manager", logo: "/minositesek/tanusitvany1.png", href: "https://iapp.org/certify/cipm" },
];

export default function About() {
  return (
    <section id="rolam" className="overflow-hidden bg-petrol-deep text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:items-start px-4 py-24 md:grid-cols-[auto_1fr] md:gap-16 md:py-32">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Rólam</p>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Agárdy Balázs vagyok, <span className="text-lime">szabadúszó információbiztonsági tanácsadó.</span>
          </h2>

          <div className="mt-8 max-w-2xl space-y-5 text-lg text-white/80">
            <p>
              Több mint 
              <strong className="font-semibold text-white"> 10+ évet dolgoztam a Big4-ban információbiztonság, adatvédelem és IT audit területen. </strong>
              Aztán úgy döntöttem, hogy szabadabban, rugalmasabb formában szeretném támogatni az ügyfeleimet.
            </p>
            <p>
              A nagyvállalati kötöttségeket elengedve 2025-ben megalapítottam a Cyber Beaver-t, ahol a{" "}
              <strong className="font-semibold text-white">
                Big4-os precizitást és munkakultúrát ötvözöm a kisvállalkozások gyorsaságával és közvetlenségével.
              </strong>
            </p>
          </div>

          <h3 className="mt-12 border-t border-white/15 pt-8 text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
            Tanusítványok
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
