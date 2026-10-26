import RichText from "@/components/cms/RichText";
import { ICONS, ShieldIcon } from "@/components/icons";
import { splitLines } from "@/lib/cms";

// Szolgáltatás-aloldal blokkjai. Minden blokk a tartalom saját formáját kapja (kártyák, pipás lista, számsáv,
// összehasonlítás, lépések…), hogy az oldal ne egy szövegfal legyen. Mezők: cms.manifest.js → blockFields().
// Props: cms (accessor), k (mezőkulcs a blokkon belül → "<oldal>.<blokk>.<mező>"), bg (világos blokkoknál: white | mist).

export const DARK_BLOCKS = new Set(["stats", "trust", "cta"]);

const BG = { white: "bg-white", mist: "bg-mist" };

// Rich text tipográfia világos háttéren (listák, kiemelés, linkek)
export const prose =
  "text-lg text-petrol/80 [&>*+*]:mt-5 [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:space-y-3 [&_ol]:pl-6 [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-petrol-deep [&_a]:font-medium [&_a]:text-petrol-deep [&_a]:underline [&_a]:decoration-lime [&_a]:decoration-2 [&_a]:underline-offset-4";

export function Check({ className = "size-6" }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} shrink-0`} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}

function Heading({ cms, k, dark = false }) {
  const intro = cms.text(k("intro"));
  return (
    <div className="max-w-3xl">
      <h2 className={`text-2xl font-bold tracking-tight md:text-3xl ${dark ? "text-white" : "text-petrol-deep"}`} {...cms.attr(k("title"))}>
        {cms.text(k("title"))}
      </h2>
      {intro && (
        <p className={`mt-5 text-lg ${dark ? "text-white/70" : "text-petrol/70"}`} {...cms.attr(k("intro"))}>
          {intro}
        </p>
      )}
    </div>
  );
}

// Kiemelt megjegyzés: bal oldali accent vonal
function Note({ cms, k, dark = false }) {
  const note = cms.text(k("note"));
  if (!note) return null;
  return (
    <p className={`mt-10 max-w-3xl border-l-4 border-lime pl-5 text-lg ${dark ? "text-white/80" : "text-petrol-deep"}`} {...cms.attr(k("note"))}>
      {note}
    </p>
  );
}

const CTA_BUTTON = "inline-block shrink-0 rounded-full px-8 py-4 text-center font-semibold transition hover:brightness-110";

// Ikonos kártyarács + opcionális sötét felhívás-doboz gombbal
function Cards({ cms, k, bg }) {
  const items = cms.list(k("items"));
  const note = cms.text(k("note"));
  return (
    <>
      <Heading cms={cms} k={k} />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon, title, text }, i) => {
          const Icon = ICONS[icon] ?? ShieldIcon;
          return (
            <li key={i} className={`rounded-2xl border border-petrol/10 p-6 ${bg === "mist" ? "bg-white" : "bg-mist"}`}>
              <span className="flex size-12 items-center justify-center rounded-full bg-lime text-petrol-deep">
                <Icon />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-petrol-deep" {...cms.attr(k("items"), i, "title")}>
                {title}
              </h3>
              <p className="mt-2 text-petrol/70" {...cms.attr(k("items"), i, "text")}>
                {text}
              </p>
            </li>
          );
        })}
      </ul>
      {note && (
        <div className="mt-6 flex flex-col gap-6 rounded-2xl bg-petrol p-6 text-white md:flex-row md:items-center md:justify-between md:p-8">
          <p className="max-w-2xl text-lg text-white/85" {...cms.attr(k("note"))}>
            {note}
          </p>
          <a href="#kapcsolat" className={`${CTA_BUTTON} bg-lime text-petrol-deep`} {...cms.attr(k("note_cta"))}>
            {cms.text(k("note_cta")) || "Kapcsolat"}
          </a>
        </div>
      )}
    </>
  );
}

// Pipás lista két oszlopban
function Checklist({ cms, k }) {
  return (
    <>
      <Heading cms={cms} k={k} />
      <ul className="mt-10 grid gap-x-10 gap-y-5 md:grid-cols-2">
        {cms.list(k("items")).map(({ text }, i) => (
          <li key={i} className="flex gap-4 text-lg text-petrol-deep">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-lime text-petrol-deep">
              <Check className="size-4" />
            </span>
            <span {...cms.attr(k("items"), i, "text")}>{text}</span>
          </li>
        ))}
      </ul>
      <Note cms={cms} k={k} />
    </>
  );
}

// Sötét számsáv: nagy accent számok
function Stats({ cms, k }) {
  return (
    <>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-lime" {...cms.attr(k("title"))}>
        {cms.text(k("title"))}
      </p>
      <dl className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {cms.list(k("items")).map(({ value, label }, i) => (
          <div key={i} className="flex flex-col-reverse justify-end border-t border-white/15 pt-5">
            <dt className="mt-2 text-white/70" {...cms.attr(k("items"), i, "label")}>
              {label}
            </dt>
            <dd className="text-3xl font-bold tracking-tight text-lime md:text-4xl" {...cms.attr(k("items"), i, "value")}>
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}

// Két egymás melletti kártya (pl. két szervezettípus / két értékelési szint): az első sötét, a második világos
function Duo({ cms, k }) {
  return (
    <>
      <Heading cms={cms} k={k} />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {cms.list(k("items")).map(({ title, points }, i) => {
          const dark = i % 2 === 0;
          return (
            <div key={i} className={`rounded-3xl p-6 sm:p-8 ${dark ? "bg-petrol-deep text-white" : "border border-petrol/15 bg-white text-petrol-deep"}`}>
              <h3 className="text-xl font-bold" {...cms.attr(k("items"), i, "title")}>
                {title}
              </h3>
              <ul className="mt-6 space-y-4" {...cms.attr(k("items"), i, "points")}>
                {splitLines(points).map((p, j) => (
                  <li key={j} className="flex gap-3">
                    <Check className={`mt-0.5 size-5 ${dark ? "text-lime" : "text-petrol"}`} />
                    <span className={dark ? "text-white/85" : "text-petrol/80"}>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <Note cms={cms} k={k} />
    </>
  );
}

// Összehasonlítás: balra a cím, jobbra bevezető + egyszerű táblázat vékony vonalakkal (a jobb oszlop sötétebb szöveggel)
function Compare({ cms, k }) {
  const rows = cms.list(k("rows"));
  const note = cms.text(k("note"));
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-12">
      <h2 className="text-2xl font-bold tracking-tight text-petrol-deep md:text-3xl" {...cms.attr(k("title"))}>
        {cms.text(k("title"))}
      </h2>
      <div className="min-w-0 text-lg text-petrol/80">
        <p {...cms.attr(k("intro"))}>{cms.text(k("intro"))}</p>
        <table className="mt-8 w-full text-left text-sm sm:text-base">
          <thead>
            <tr className="border-b border-petrol/20">
              <th className="w-1/4 py-3 pr-4" />
              <th className="py-3 pr-4 font-semibold text-petrol/60" {...cms.attr(k("col_a"))}>
                {cms.text(k("col_a"))}
              </th>
              <th className="py-3 font-semibold text-petrol-deep" {...cms.attr(k("col_b"))}>
                {cms.text(k("col_b"))}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ label, a, b }, i) => (
              <tr key={i} className="border-b border-petrol/10 align-top">
                <th scope="row" className="py-4 pr-4 font-semibold text-petrol-deep" {...cms.attr(k("rows"), i, "label")}>
                  {label}
                </th>
                <td className="py-4 pr-4 text-petrol/60" {...cms.attr(k("rows"), i, "a")}>
                  {a}
                </td>
                <td className="py-4 text-petrol-deep" {...cms.attr(k("rows"), i, "b")}>
                  {b}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {note && (
          <p className="mt-8 text-base text-petrol/70" {...cms.attr(k("note"))}>
            {note}
          </p>
        )}
      </div>
    </div>
  );
}

// Számozott lépések; 4 lépésig desktopon egy sorban, összekötő vonallal
function Steps({ cms, k }) {
  const items = cms.list(k("items"));
  const oneRow = items.length <= 4;
  return (
    <>
      <Heading cms={cms} k={k} />
      <ol className={`mt-12 grid gap-10 sm:grid-cols-2 ${oneRow ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
        {items.map(({ title, text }, i) => (
          <li key={i} className="relative">
            {oneRow && i < items.length - 1 && (
              <span aria-hidden="true" className="absolute top-6 left-16 hidden h-0.5 w-[calc(100%-3rem)] bg-lime/50 lg:block" />
            )}
            <span className="relative flex size-12 items-center justify-center rounded-full bg-lime text-lg font-bold text-petrol-deep">
              {i + 1}
            </span>
            <h3 className="mt-5 text-lg font-semibold text-petrol-deep" {...cms.attr(k("items"), i, "title")}>
              {title}
            </h3>
            <p className="mt-2 text-petrol/70" {...cms.attr(k("items"), i, "text")}>
              {text}
            </p>
          </li>
        ))}
      </ol>
    </>
  );
}

// Címke-chipek szint-jelvénnyel (AL3 sötét, AL2 világos)
function Chips({ cms, k, bg }) {
  return (
    <>
      <Heading cms={cms} k={k} />
      <ul className="mt-10 grid gap-3 sm:grid-cols-2">
        {cms.list(k("items")).map(({ name, desc, level }, i) => {
          const strong = /3/.test(level);
          return (
            <li key={i} className={`flex items-center justify-between gap-4 rounded-xl border border-petrol/10 px-5 py-4 ${bg === "mist" ? "bg-white" : "bg-mist"}`}>
              <span>
                <span className="block font-semibold text-petrol-deep" {...cms.attr(k("items"), i, "name")}>
                  {name}
                </span>
                <span className="block text-sm text-petrol/60" {...cms.attr(k("items"), i, "desc")}>
                  {desc}
                </span>
              </span>
              {level && (
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold tracking-wide ${strong ? "bg-petrol-deep text-lime" : "bg-lime/25 text-petrol-deep"}`}
                  {...cms.attr(k("items"), i, "level")}
                >
                  {level}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}

// Bizalmi sáv: portré, nagy számok, tapasztalatok, kiemelt mondat
function Trust({ cms, k }) {
  return (
    <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-start md:gap-14">
      <div className="relative aspect-square w-32 shrink-0 overflow-hidden rounded-full border-[3px] border-lime bg-petrol md:w-56">
        <img
          src="/nincshatter3.webp"
          alt="Agárdy Balázs, a Cyber Beaver alapítója"
          width={900}
          height={1703}
          loading="lazy"
          className="absolute top-[8%] -left-[18%] h-auto w-[110%] max-w-none"
        />
      </div>
      <div className="min-w-0">
        <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl" {...cms.attr(k("title"))}>
          {cms.text(k("title"))}
        </h2>
        <dl className="mt-8 grid gap-6 sm:grid-cols-3">
          {cms.list(k("stats")).map(({ value, label }, i) => (
            <div key={i} className="flex flex-col-reverse justify-end">
              <dt className="mt-1 text-sm text-white/70" {...cms.attr(k("stats"), i, "label")}>
                {label}
              </dt>
              <dd className="text-2xl font-bold text-lime md:text-3xl" {...cms.attr(k("stats"), i, "value")}>
                {value}
              </dd>
            </div>
          ))}
        </dl>
        <ul className="mt-8 space-y-3 border-t border-white/15 pt-8">
          {cms.list(k("points")).map(({ text }, i) => (
            <li key={i} className="flex gap-3 text-white/85">
              <Check className="mt-0.5 size-5 text-lime" />
              <span {...cms.attr(k("points"), i, "text")}>{text}</span>
            </li>
          ))}
        </ul>
        <blockquote className="mt-10 border-l-4 border-lime pl-5 text-xl font-semibold text-white" {...cms.attr(k("quote"))}>
          {cms.text(k("quote"))}
        </blockquote>
      </div>
    </div>
  );
}

// Köztes ajánlatkérő sáv (accent háttér)
function Cta({ cms, k }) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold tracking-tight text-petrol-deep md:text-3xl" {...cms.attr(k("title"))}>
          {cms.text(k("title"))}
        </h2>
        <p className="mt-3 text-lg text-petrol-deep/80" {...cms.attr(k("text"))}>
          {cms.text(k("text"))}
        </p>
      </div>
      <a href="#kapcsolat" className={`${CTA_BUTTON} bg-petrol-deep text-white`} {...cms.attr(k("cta"))}>
        {cms.text(k("cta"))}
      </a>
    </div>
  );
}

function Prose({ cms, k }) {
  return (
    <div className="max-w-3xl">
      <Heading cms={cms} k={k} />
      <RichText value={cms.rich(k("body"))} className={`mt-6 ${prose}`} {...cms.attr(k("body"))} />
    </div>
  );
}

const BLOCKS = {
  cards: Cards,
  checklist: Checklist,
  stats: Stats,
  duo: Duo,
  compare: Compare,
  steps: Steps,
  chips: Chips,
  trust: Trust,
  cta: Cta,
  prose: Prose,
};

// Egy blokk a saját hátterével. Sötét/kiemelt blokkok fix háttérrel, a világosak felváltva (bg).
export function Block({ cms, pageKey, block, bg }) {
  const Component = BLOCKS[block.type];
  const k = (f) => `${pageKey}.${block.key}.${f}`;
  const cls = { stats: "bg-petrol text-white", trust: "bg-petrol-deep", cta: "bg-lime" }[block.type] ?? BG[bg];
  const compact = block.type === "cta" || block.type === "stats";
  return (
    <section id={block.key} className={`scroll-mt-16 ${cls}`}>
      <div className={`mx-auto max-w-6xl px-4 ${compact ? "py-12 md:py-16" : "py-16 md:py-24"}`}>
        <Component cms={cms} k={k} bg={bg} />
      </div>
    </section>
  );
}

