import SectionHeading from "@/components/SectionHeading";
import { BankIcon, EnergyIcon, KkvIcon } from "@/components/partners/logos";

// Tartalom: a régi cyberbeaver.hu alapján. Ügyfélnevek nélkül (titoktartás).
const SECTOR = {
  bank: { label: "Bank", Icon: () => <BankIcon className="size-5" /> },
  energy: { label: "Energia", Icon: () => <EnergyIcon className="size-5" /> },
  kkv: { label: "KKV", Icon: () => <KkvIcon className="size-5" inner="#d6f34b" /> },
};

const REFERENCES = [
  {
    years: "2025–",
    title: "Információbiztonsági felelős",
    client: "Energiaipari vállalat",
    sector: "energy",
    text: "Kiszervezett információbiztonsági felelősként folyamatosan támogatom egy hazai energiacég megfelelését.",
    tags: ["IBF", "Havidíjas"],
  },
  {
    years: "2025",
    title: "Kiberbiztonsági érettségelemzés",
    client: "Hazai bank",
    sector: "bank",
    text: "NIST CSF alapú érettségelemzés és kiberbiztonsági akcióterv kidolgozása.",
    tags: ["NIST CSF"],
  },
  {
    years: "2024–2025",
    title: "NIS2 felkészítés",
    client: "Több hazai KKV",
    sector: "kkv",
    text: "Tanácsadás, folyamatbevezetés, oktatás és felkészítés a NIS2-auditra.",
    tags: ["NIS2"],
  },
  {
    years: "2024",
    title: "DORA GAP-elemzés és implementáció",
    client: "Hazai bank",
    sector: "bank",
    text: "Teljes, RTS/ITS szintű DORA GAP-elemzés és az implementáció támogatása.",
    tags: ["DORA", "MNB"],
  },
  {
    years: "2023",
    title: "Kiberbiztonsági projektmenedzser",
    client: "Hazai nagybank",
    sector: "bank",
    text: "Stratégiai kiberbiztonsági projekt vezetése: SIEM-bevezetés, ATM-biztonság fejlesztése, adatvédelem.",
    tags: ["SIEM", "ATM-biztonság"],
  },
];

export default function References() {
  return (
    <section id="referenciak" className="bg-mist pb-24 text-petrol-deep md:pb-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Referenciák"
          title="Akiknek már segítettem"
          intro="10+ év Big4 tapasztalat után, a hazai bankszektortól a KKV-kig."
        />

        <ol className="mt-14 border-l-2 border-petrol/15 md:ml-[9rem]">
          {REFERENCES.map(({ years, title, client, sector, text, tags }) => {
            const { label, Icon } = SECTOR[sector];
            return (
              <li key={title} className="relative pb-12 pl-8 last:pb-0 md:pl-10">
                {/* pötty a vonalon */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[9px] top-1.5 size-4 rounded-full border-4 border-mist bg-lime"
                />
                {/* évszám: mobilon a cím fölött, desktopon a vonal bal oldalán */}
                <p className="mb-2 text-lg font-bold md:absolute md:-left-[9rem] md:top-0 md:mb-0 md:w-28 md:whitespace-nowrap md:text-right">
                  {years}
                </p>

                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-2 flex items-center gap-2 font-semibold text-petrol/70">
                  <span
                    className="flex size-7 items-center justify-center rounded-md bg-lime text-petrol-deep"
                    title={label}
                  >
                    <Icon />
                  </span>
                  {client}
                </p>
                <p className="mt-3 max-w-2xl text-petrol/70">{text}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <li key={tag} className="rounded-full bg-lime/40 px-3 py-1 text-sm font-medium">
                      {tag}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
