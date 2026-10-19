import SectionHeading from "@/components/SectionHeading";
import RichText from "@/components/cms/RichText";
import { getCms } from "@/lib/cms";
import Details from "./Details";

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
const CarIcon = icon(
  <>
    <path d="M5 17H3v-5l2-5h14l2 5v5h-2" />
    <path d="M3 12h18M9 17h6" />
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
  </>,
);
const AuditIcon = icon(
  <>
    <rect x="5" y="4" width="14" height="17" rx="2" />
    <path d="M9 4V3h6v1M9 13l2 2 4-4" />
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

// A szövegek az Ügyfél Adminból jönnek (alapérték: content/site.js).
// Kártya-ikonok sorrend szerint; ha az adminban új kártya kerül a végére, az ShieldIcon-t kap.
const ICONS = [ChecklistIcon, AuditIcon, BankIcon, TeachIcon, LockIcon, CarIcon, ChartIcon, LinkIcon, SearchIcon];

export default async function Services() {
  const cms = await getCms();
  const tasks = cms.list("home.services.ibf_tasks");
  const items = cms.list("home.services.items");

  return (
    <section
      id="szolgaltatasok"
      className="bg-mist py-24 text-petrol-deep md:py-32"
    >
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          /*eyebrow="Miben tudok segíteni?"*/
          /*title="A megfelelésen túl"*/
          title={cms.text("home.services.title")}
          attrs={{ title: cms.attr("home.services.title") }}
          //intro="Információbiztonsági tanácsadás, audit felkészítés, folyamatok és szabályzatok kialakítása, kockázat- és érettségvizsgálat."
        />

        {/* Kiemelt fő szolgáltatás: kiszervezett IBF */}
        <article className="mt-14 grid gap-10 rounded-3xl bg-petrol-deep p-6 text-white sm:p-8 md:grid-cols-[1.1fr_1fr] md:p-12">
          <div className="min-w-0">
            <span className="flex size-12 items-center justify-center rounded-full bg-lime text-petrol-deep">
              <ShieldIcon />
            </span>
            <h3 className="mt-6 text-2xl font-bold md:text-3xl" {...cms.attr("home.services.ibf_title")}>
              {cms.text("home.services.ibf_title")}
            </h3>
            <RichText
              value={cms.rich("home.services.ibf_text")}
              className="mt-6 text-lg text-white/80 [&_strong]:font-semibold [&_strong]:text-lime"
              {...cms.attr("home.services.ibf_text")}
            />
            <a
              href="#kapcsolat"
              className="mt-8 inline-block w-full rounded-full bg-lime px-10 py-4 text-center font-semibold text-petrol-deep transition hover:brightness-110 sm:w-auto"
              {...cms.attr("home.services.ibf_cta")}
            >
              {cms.text("home.services.ibf_cta")}
            </a>
          </div>

          <ul className="space-y-4 self-center">
            {tasks.map((task, i) => (
              <li key={i} className="flex gap-3 text-white/90">
                <svg
                  viewBox="0 0 24 24"
                  className="mt-0.5 size-6 shrink-0 text-lime"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m5 12 5 5L20 7" />
                </svg>
                <span {...cms.attr("home.services.ibf_tasks", i, "text")}>{task.text}</span>
              </li>
            ))}
          </ul>
        </article>

        <h3 className="mt-16 text-xl font-semibold" {...cms.attr("home.services.others_title")}>
          {cms.text("home.services.others_title")}
        </h3>

        {/* items-start: a lenyitott kártya egyedül nő, a sor többi kártyája nem nyúlik vele */}
        <ul className="mt-6 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ title, text }, i) => {
            const Icon = ICONS[i] ?? ShieldIcon;
            return (
              <li
                key={i}
                className="rounded-2xl border border-petrol/10 bg-white p-7"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-lime text-petrol-deep">
                  <Icon />
                </span>
                {/* min 2 sor: így a "Részletek" sor minden kártyán egy vonalban van */}
                <h3 className="mt-6 min-h-[2.8em] text-xl font-semibold" {...cms.attr("home.services.items", i, "title")}>
                  {title}
                </h3>
                <Details textAttrs={cms.attr("home.services.items", i, "text")}>{text}</Details>
              </li>
            );
          })}
        </ul>

      </div>
    </section>
  );
}
