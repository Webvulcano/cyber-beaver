import Image from "next/image";
import portrait from "@/public/nincshatter.png";
import cisa from "@/public/minositesek/cisa.webp";
import cism from "@/public/minositesek/cism.webp";
import iso27001 from "@/public/minositesek/iso27001.webp";

// Tartalom: a régi cyberbeaver.hu bemutatkozó szövege alapján.
// Minősítések: zemitis.hu "Rólunk" szekció alapján.
const FACTS = [
  { value: "CISA", label: "Minősített informatikai rendszerellenőr", logo: cisa },
  { value: "CISM", label: "Minősített információbiztonsági menedzser", logo: cism },
  { value: "ISO/IEC 27001", label: "Lead Auditor", logo: iso27001 },
];

export default function About() {
  return (
    <section id="rolam" className="overflow-hidden bg-petrol-deep text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 md:grid-cols-[auto_1fr] md:gap-16 md:py-32">
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
            {FACTS.map(({ value, label, logo }) => (
              <div key={value} className="flex flex-col-reverse justify-end">
                <dt className="mt-1 text-sm text-white/60">{label}</dt>
                <dd className="text-xl font-bold text-lime">
                  {/* a logók fehér hátterűek → fehér körben ülnek a sötét szekción */}
                  <span className="mb-3 flex size-16 items-center justify-center overflow-hidden rounded-full bg-white p-1">
                    <Image src={logo} alt={`${value} ${label}`} sizes="64px" className="h-auto w-full" />
                  </span>
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* kivágott portré lime keretes körbe vágva, desktopon bal oldalt (a kerek logó visszhangja) */}
        <div className="relative mx-auto aspect-square w-72 overflow-hidden rounded-full border-[3px] border-lime bg-petrol sm:w-80 md:order-first md:w-96">
          <Image
            src={portrait}
            alt="Agárdy Balázs, a Cyber Beaver alapítója"
            sizes="(min-width: 768px) 320px, 270px"
            placeholder="blur"
            className="absolute top-[8%] -left-[22%] h-auto w-[110%] max-w-none"
          />
        </div>
      </div>
    </section>
  );
}
