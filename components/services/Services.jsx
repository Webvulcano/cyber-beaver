import SectionHeading from "@/components/SectionHeading";
import Details from "./Details";

// TODO: elírások a régi oldalról, szó szerint átvéve — Lehel jelzéséig maradnak, kiemelve hogy látszódjanak.
// Javítás után a <Typo> csomagolás törölhető.
function Typo({ children }) {
  return (
    <strong className="rounded bg-risk/15 px-0.5 text-risk">{children}</strong>
  );
}

// Ikonok: 24×24, 2px round stroke, egységes stílus.
const icon = (paths) =>
  function Icon() {
    return (
      <svg
        viewBox="0 0 24 24"
        className="size-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {paths}
      </svg>
    );
  };

const ShieldIcon = icon(
  <>
    <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z" />
    <path d="m9 12 2 2 4-4" />
  </>,
);
const ChecklistIcon = icon(
  <>
    <path d="m4 6 1.5 1.5L8 5M4 12l1.5 1.5L8 11M4 18l1.5 1.5L8 17" />
    <path d="M12 6h8M12 12h8M12 18h8" />
  </>,
);
const BankIcon = icon(
  <>
    <path d="M3 9 12 4l9 5" />
    <path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18" />
  </>,
);
const GearIcon = icon(
  <>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M4.9 4.9 7 7M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1" />
  </>,
);
const LockIcon = icon(
  <>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4M12 15v2" />
  </>,
);
const ChartIcon = icon(
  <>
    <path d="M4 20V4M4 20h16" />
    <path d="m8 15 3-4 3 2 5-6" />
  </>,
);
const LinkIcon = icon(
  <>
    <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
    <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
  </>,
);
const SearchIcon = icon(
  <>
    <circle cx="11" cy="11" r="6" />
    <path d="m20 20-4.5-4.5" />
  </>,
);
const TeachIcon = icon(
  <>
    <rect x="3" y="4" width="18" height="12" rx="1.5" />
    <path d="M8 20h8M12 16v4M7 9h6M7 12h4" />
  </>,
);

// Tartalom: szó szerint a régi cyberbeaver.hu-ról (az ügyfél kérésére, sorrend és helyesírás is).
const SERVICES = [
  {
    title: "Információbiztonsági felelős",
    text: "Kiszervezett információbiztonsági felelősként (IBF) elvégzem a kapcsolódó feladatokat, biztosítom a megfelelőséget. Havidíjas alapon, megbízhatóan, szakszerűen.",
    Icon: ShieldIcon,
  },
  {
    title: "NIS2 felkészítés",
    text: (
      <>
        <Typo>TEljeskörű</Typo> NIS2 felkészítés a gap elemzéstől a
        megvalósításig. Számtalan iparágban tevékenykedő ügyféllel dolgoztam már
        együtt <Typo>nis2</Typo> megfelelőségen, továbbá végeztem NIS2 auditokat
        is. A felkészítés során figyelembe veszem az adott cég sajátosságait és
        az auditori elvárásokat, módszertanokat is.
      </>
    ),
    Icon: ChecklistIcon,
  },
  {
    title: "DORA és MNB megfelelőség",
    text: (
      <>
        A hazai bankszektor nagy részével dolgoztam már együtt törvényi
        megfelelőségi <Typo>projektEKEN</Typo>. Az elmúlt évek tapasztalatát
        felhasználva hatékonyan és célorientáltan tudok DORA vagy egyéb MNB
        megfelelőségben segíteni.
      </>
    ),
    Icon: BankIcon,
  },
  {
    title: "Tudatossági oktatás",
    text: "A tudatossági oktatások nem csak törvényi megfelelőség miatt fontosak, hanem gyakorlati hasznuk is van. Non-profit szervezeteknek, iskoláknak, közintézményeknek limitáltan pro-bono is vállalom oktatás megtartását.",
    Icon: TeachIcon,
  },
  {
    title: "Adatvédelem",
    text: (
      <>
        <Typo>ki</Typo> emlékszik már a GDPR-ra?! Pedig az adatvédelem és annak
        IT oldali elvárásai továbbra is ugyanolyan relevánsak.
      </>
    ),
    Icon: LockIcon,
  },
  {
    title: "TISAX tanácsadás és felkészítés",
    text: (
      <>
        Több ügyfelemet is segítettem már sikeres TISAX minősítés elérésben.
        Hatékony, gyors, a <Typo>tisax</Typo> elvárásainak megfelelő és
        praktikus TISAX felkészítést vállalok.
      </>
    ),
    Icon: GearIcon,
  },
  {
    title: "Információbiztonsági kockázatelemzés",
    text: "Praktikus, a gyakorlatban is jól használható, az adott vállalatra szabott kockázatelemzést végzek, amely megfelel a törvényi elvárásoknak vagy iparági keretrendszereknek is.",
    Icon: ChartIcon,
  },
  {
    title: "Harmadik felek kockázatkezelés (TPRM)",
    text: (
      <>
        Segítek kialakítani egy gyakorlatban is használható, ugyanakkor törvényi
        elvárásoknak is megfelelő TPRM folyamatot. <Typo>igény</Typo> esetén
        elvégzem a szállítói auditokat is.
      </>
    ),
    Icon: LinkIcon,
  },
  {
    title: "IT audit",
    text: (
      <>
        <Typo>teljesen</Typo> vagy részben kiszervezett IT belső ellenőri
        feladatok ellátása nagyvállalatok, pénzintézetek számára.
      </>
    ),
    Icon: SearchIcon,
  },
];

export default function Services() {
  return (
    <section
      id="szolgaltatasok"
      className="bg-mist py-24 text-petrol-deep md:py-32"
    >
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          /*eyebrow="Miben tudok segíteni?"*/
          /*title="A megfelelésen túl"*/
          title="Miben tudok segíteni?"
          intro="Információbiztonsági tanácsadás, audit felkészítés, folyamatok és szabályzatok kialakítása, kockázat- és érettségvizsgálat."
        />

        {/* items-start: a lenyitott kártya egyedül nő, a sor többi kártyája nem nyúlik vele */}
        <ul className="mt-14 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ title, text, Icon }) => (
            <li
              key={title}
              className="rounded-2xl border border-petrol/10 bg-white p-7"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-lime text-petrol-deep">
                <Icon />
              </span>
              {/* min 2 sor: így a "Részletek" sor minden kártyán egy vonalban van */}
              <h3 className="mt-6 min-h-[2.8em] text-xl font-semibold">
                {title}
              </h3>
              <Details>{text}</Details>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-sm text-petrol/60">
          Amit nem tudok megcsinálni, arra pedig ismerek egy szakértőt, legyen
          az betörésteszt, csalásfelderítés, CTI vagy éppen technikai
          sérülékenységvizsgálat.
        </p>
      </div>
    </section>
  );
}
