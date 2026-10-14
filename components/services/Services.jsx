import SectionHeading from "@/components/SectionHeading";

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
  </>
);
const ChecklistIcon = icon(
  <>
    <path d="m4 6 1.5 1.5L8 5M4 12l1.5 1.5L8 11M4 18l1.5 1.5L8 17" />
    <path d="M12 6h8M12 12h8M12 18h8" />
  </>
);
const BankIcon = icon(
  <>
    <path d="M3 9 12 4l9 5" />
    <path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18" />
  </>
);
const GearIcon = icon(
  <>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M4.9 4.9 7 7M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1" />
  </>
);
const LockIcon = icon(
  <>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4M12 15v2" />
  </>
);
const ChartIcon = icon(
  <>
    <path d="M4 20V4M4 20h16" />
    <path d="m8 15 3-4 3 2 5-6" />
  </>
);
const LinkIcon = icon(
  <>
    <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
    <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
  </>
);
const SearchIcon = icon(
  <>
    <circle cx="11" cy="11" r="6" />
    <path d="m20 20-4.5-4.5" />
  </>
);
const TeachIcon = icon(
  <>
    <rect x="3" y="4" width="18" height="12" rx="1.5" />
    <path d="M8 20h8M12 16v4M7 9h6M7 12h4" />
  </>
);

// Tartalom: a régi cyberbeaver.hu alapján.
const SERVICES = [
  {
    // SEO fő kulcsszó pontosan a H3-ban
    title: "Kiszervezett információbiztonsági felelős",
    text: "Havidíjas alapon átveszem az információbiztonsági felelős feladatait és a megfeleléssel járó teendőket — nem kell rá saját embert felvenned.",
    Icon: ShieldIcon,
  },
  {
    title: "NIS2 felkészítés",
    text: "A GAP-elemzéstől az implementáción át az audit-készségig végigkísérlek a NIS2-megfelelés minden lépésén.",
    Icon: ChecklistIcon,
  },
  {
    title: "DORA és MNB megfelelőség",
    text: "DORA- és egyéb MNB-megfelelőségi projektek támogatása, elsősorban bankoknak és pénzügyi intézményeknek.",
    Icon: BankIcon,
  },
  {
    title: "TISAX tanácsadás és felkészítés",
    text: "Felkészítés a TISAX-tanúsításra — az autóipari beszállítói lánc információbiztonsági elvárásai szerint.",
    Icon: GearIcon,
  },
  {
    title: "Adatvédelem",
    text: "A GDPR informatikai oldala: technikai és szervezési intézkedések, amelyek a gyakorlatban is működnek.",
    Icon: LockIcon,
  },
  {
    title: "Információbiztonsági kockázatelemzés",
    text: "A cégedre szabott, gyakorlatias kockázatelemzés, amely megfelel a jogszabályi és keretrendszeri elvárásoknak.",
    Icon: ChartIcon,
  },
  {
    title: "Harmadik felek kockázatkezelése (TPRM)",
    text: "Beszállítói kockázatkezelési folyamat kialakítása, kérésre beszállítói auditokkal.",
    Icon: LinkIcon,
  },
  {
    title: "IT audit",
    text: "Teljesen vagy részben kiszervezett belső IT audit nagyvállalatoknak és pénzügyi intézményeknek.",
    Icon: SearchIcon,
  },
  {
    title: "Tudatossági oktatás",
    text: "Biztonságtudatossági képzés munkatársaknak. Non-profitoknak, iskoláknak és közintézményeknek korlátozottan pro bono.",
    Icon: TeachIcon,
  },
];

export default function Services() {
  return (
    <section id="szolgaltatasok" className="bg-mist py-24 text-petrol-deep md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Miben tudok segíteni?"
          title="A megfelelésen túl"
          intro="Információbiztonsági tanácsadás, audit-felkészítés, folyamatok és szabályzatok — a cégedre szabva, nem sablonból."
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ title, text, Icon }) => (
            <li
              key={title}
              className="rounded-2xl border border-petrol/10 bg-white p-7 transition hover:-translate-y-0.5 hover:border-petrol/30 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-lime text-petrol-deep">
                <Icon />
              </span>
              <h3 className="mt-6 text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-petrol/70">{text}</p>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-sm text-petrol/60">
          Penetrációs teszt, csalásvizsgálat, CTI vagy sérülékenységvizsgálat? Ezeket nem vállalom, de megbízható
          partnerhez irányítalak.
        </p>
      </div>
    </section>
  );
}
