// Referenciák: vízszintesen lapozható kártyasor (trackpad oldalra húzás, Shift+görgő, mobilon swipe).
// Natív overflow-x scroll + scroll-snap: elengedés után a legközelebbi kártya a tartalom-oszlop
// bal széléhez kattan. A függőleges görgetést nem téríti el. Nyilak: Carousel.jsx.
import SectionHeading from "@/components/SectionHeading";
import Carousel from "./Carousel";
import { BankIcon, EnergyIcon, KkvIcon } from "@/components/partners/logos";

// Tartalom: a régi cyberbeaver.hu alapján. Ügyfélnevek nélkül (titoktartás).
const SECTOR = {
  bank: { label: "Bank", Icon: () => <BankIcon className="size-5" /> },
  energy: { label: "Energia", Icon: () => <EnergyIcon className="size-5" /> },
  kkv: { label: "KKV", Icon: () => <KkvIcon className="size-5" inner="var(--c-accent)" /> },
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

function Card({ index, years, title, client, sector, text, tags }) {
  const { label, Icon } = SECTOR[sector];
  return (
    <li className="flex w-[82vw] shrink-0 snap-start flex-col rounded-3xl border border-petrol/10 bg-white p-8 sm:w-[26rem] md:p-10">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 rounded-full bg-mist py-1.5 pr-4 pl-1.5 text-sm font-semibold">
          <span className="flex size-7 items-center justify-center rounded-full bg-lime text-petrol-deep">
            <Icon />
          </span>
          {label}
        </span>
        <span className="text-sm font-semibold text-petrol/40">{String(index + 1).padStart(2, "0")}</span>
      </div>

      <p className="mt-10 text-2xl font-bold text-petrol/30">{years}</p>
      <h3 className="mt-2 text-xl font-semibold">{title}</h3>
      <p className="mt-1 font-semibold text-petrol/60">{client}</p>
      <p className="mt-5 text-petrol/70">{text}</p>

      <ul className="mt-auto flex flex-wrap gap-2 pt-8">
        {tags.map((tag) => (
          <li key={tag} className="rounded-full bg-lime/40 px-3 py-1 text-sm font-medium">
            {tag}
          </li>
        ))}
      </ul>
    </li>
  );
}

export default function References() {
  // bal szél a tartalom-oszlophoz (max-w-6xl) igazítva — padding és snap-igazítás ugyanazzal
  const edge = "px-4 xl:px-[calc((100vw-72rem)/2+1rem)]";

  return (
    <section id="referenciak" className="bg-mist py-24 text-petrol-deep md:py-32">
      <Carousel
        edgeClass={edge}
        scrollPadClass="scroll-px-4 xl:scroll-px-[calc((100vw-72rem)/2+1rem)]"
        heading={
          <SectionHeading
            /*eyebrow="Referenciák"
            title="Akiknek már segítettem"*/
            title="Referenciák"
            intro="10+ év Big4 tapasztalat után, a hazai bankszektortól a KKV-kig."
          />
        }
      >
        {REFERENCES.map((ref, i) => (
          <Card key={ref.title} index={i} {...ref} />
        ))}
      </Carousel>
    </section>
  );
}
