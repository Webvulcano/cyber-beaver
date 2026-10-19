// Referenciák: vízszintesen lapozható kártyasor (trackpad oldalra húzás, Shift+görgő, mobilon swipe).
// Natív overflow-x scroll + scroll-snap: elengedés után a legközelebbi kártya a tartalom-oszlop
// bal széléhez kattan. A függőleges görgetést nem téríti el. Nyilak: Carousel.jsx.
import SectionHeading from "@/components/SectionHeading";
import { getCms, splitLines } from "@/lib/cms";
import Carousel from "./Carousel";
import { BankIcon, EnergyIcon, KkvIcon } from "@/components/partners/logos";

// Szövegek az Ügyfél Adminból (alapérték: content/site.js). Ügyfélnevek nélkül (titoktartás).
const SECTOR = {
  bank: { label: "Bank", Icon: () => <BankIcon className="size-5" /> },
  energy: { label: "Energia", Icon: () => <EnergyIcon className="size-5" /> },
  kkv: { label: "KKV", Icon: () => <KkvIcon className="size-5" inner="var(--c-accent)" /> },
};
// Ágazat-címke sorrend szerint; az adminban a végére felvett új referencia KKV-t kap.
const SECTORS = ["energy", "bank", "kkv", "bank", "bank"];

function Card({ index, years, title, client, text, tags, attr }) {
  const { label, Icon } = SECTOR[SECTORS[index] ?? "kkv"];
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

      <p className="mt-10 text-2xl font-bold text-petrol/30" {...attr("years")}>{years}</p>
      <h3 className="mt-2 text-xl font-semibold" {...attr("title")}>{title}</h3>
      <p className="mt-1 font-semibold text-petrol/60" {...attr("client")}>{client}</p>
      <p className="mt-5 text-petrol/70" {...attr("text")}>{text}</p>

      <ul className="mt-auto flex flex-wrap gap-2 pt-8" {...attr("tags")}>
        {splitLines(tags).map((tag) => (
          <li key={tag} className="rounded-full bg-lime/40 px-3 py-1 text-sm font-medium">
            {tag}
          </li>
        ))}
      </ul>
    </li>
  );
}

export default async function References() {
  const cms = await getCms();
  // bal szél a tartalom-oszlophoz (max-w-6xl) igazítva — padding és snap-igazítás ugyanazzal
  const edge = "px-4 xl:px-[calc((100vw-72rem)/2+1rem)]";

  return (
    <section id="referenciak" className="bg-mist pb-24 text-petrol-deep md:pb-32">
      {/* nincs felső padding: a Szolgáltatások (szintén bg-mist) alsó paddingje adja a rést */}
      <Carousel
        edgeClass={edge}
        scrollPadClass="scroll-px-4 xl:scroll-px-[calc((100vw-72rem)/2+1rem)]"
        heading={
          <SectionHeading
            /*eyebrow="Referenciák"
            title="Akiknek már segítettem"*/
            title={cms.text("home.references.title")}
            intro={cms.text("home.references.intro")}
            attrs={{ title: cms.attr("home.references.title"), intro: cms.attr("home.references.intro") }}
          />
        }
      >
        {cms.list("home.references.items").map((ref, i) => (
          <Card key={i} index={i} {...ref} attr={(f) => cms.attr("home.references.items", i, f)} />
        ))}
      </Carousel>
    </section>
  );
}
