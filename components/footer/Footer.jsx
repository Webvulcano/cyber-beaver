// Footer = Kapcsolat szekció (#kapcsolat, ide visz a hero "Kapcsolat" gombja) + világító lime körív,
// alatta logó, elérhetőség-ikonok, lime vonal és link-kártyák. A felső rész a hero petrolja + álló
// pontrács (a hero és a footer keretezi az oldalt); a körív alatt lime derengés → petrol-deep.

const EMAIL = "agardyb@protonmail.com";
const PHONE = { display: "06 30 239 24 75", href: "tel:+36302392475" };
const LINKEDIN = "https://www.linkedin.com/in/balazs-agardy-55802a51/";

// Ugyanaz a négyzetes pontrács, mint a hero RiskGrid-jén (30px rács, 4px pötty), csak álló.
const DOT_GRID =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30'%3E%3Crect x='13' y='13' width='4' height='4' fill='white' fill-opacity='0.1'/%3E%3C/svg%3E\")";

const COLUMNS = [
  {
    title: "Szolgáltatások",
    links: [
      { label: "Információbiztonsági felelős", href: "#szolgaltatasok" },
      { label: "NIS2 felkészítés", href: "#szolgaltatasok" },
      { label: "DORA és MNB", href: "#szolgaltatasok" },
      { label: "TISAX", href: "#szolgaltatasok" },
      { label: "IT audit", href: "#szolgaltatasok" },
    ],
  },
  {
    title: "Oldal",
    links: [
      { label: "Szolgáltatások", href: "#szolgaltatasok" },
      { label: "Referenciák", href: "#referenciak" },
      { label: "Kapcsolat", href: "#kapcsolat" },
      { label: "LinkedIn", href: LINKEDIN, external: true },
    ],
  },
  {
    title: "Cég",
    lines: ["Cyber Beaver Kft.", "Budapest", `© ${new Date().getFullYear()} Minden jog fenntartva.`],
  },
];

const iconProps = {
  viewBox: "0 0 24 24",
  className: "size-6",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden="true">
      <path d="M4 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm-1.5 6h3v12h-3V9Zm6 0h2.9v1.7h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.6V21h-3v-5.6c0-1.34-.02-3.06-1.86-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-3V9Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg {...iconProps}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

// Körív: a vonal a széleken elhalványul (vízszintes gradiens), alatta kitöltés, ami a lenti
// szekció háttérszínébe fut. preserveAspectRatio="none" + non-scaling-stroke → bármilyen szélességen
// egyenletes vonalvastagság.
function Arc() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 240"
      preserveAspectRatio="none"
      className="block h-24 w-full md:h-40"
    >
      <defs>
        <linearGradient id="arc-stroke" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#d6f34b" stopOpacity="0" />
          <stop offset="0.25" stopColor="#d6f34b" />
          <stop offset="0.75" stopColor="#d6f34b" />
          <stop offset="1" stopColor="#d6f34b" stopOpacity="0" />
        </linearGradient>
        {/* derengés a vonal alatt: petrol-deep + 10% lime → lefelé tiszta petrol-deep */}
        <linearGradient id="arc-fill" gradientUnits="userSpaceOnUse" x1="0" y1="20" x2="0" y2="240">
          <stop offset="0" stopColor="#1d4946" />
          <stop offset="1" stopColor="#083645" />
        </linearGradient>
      </defs>
      <path d="M0 230 C 360 20, 1080 20, 1440 230 L1440 240 L0 240 Z" fill="url(#arc-fill)" />
      <path
        d="M0 230 C 360 20, 1080 20, 1440 230"
        fill="none"
        stroke="url(#arc-stroke)"
        strokeWidth="3"
        vectorEffect="non-scaling-stroke"
        style={{ filter: "drop-shadow(0 0 10px rgba(214,243,75,0.7))" }}
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      id="kapcsolat"
      className="overflow-hidden bg-petrol text-white"
      style={{ backgroundImage: DOT_GRID, backgroundPosition: "center top" }}
    >
      <div className="mx-auto max-w-3xl px-4 pt-24 pb-16 text-center md:pt-32 md:pb-24">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Beszéljünk a cégedről.</h2>
        <p className="mt-6 text-lg text-white/70">Egy rövid beszélgetésből kiderül, miben tudok segíteni.</p>

        {/* világító e-mail pill */}
        <div className="mx-auto mt-10 flex w-full max-w-md items-center justify-between gap-3 rounded-full border border-lime/70 bg-lime/10 p-1.5 pl-5 shadow-[0_0_40px_rgba(214,243,75,0.25)] sm:pl-6">
          <span className="min-w-0 break-all text-sm text-white/80 sm:text-base">{EMAIL}</span>
          <a
            href={`mailto:${EMAIL}`}
            className="shrink-0 rounded-full bg-lime px-5 py-3 font-semibold text-petrol-deep transition hover:brightness-110 sm:px-6"
          >
            Írj nekem
          </a>
        </div>
        <p className="mt-5 text-sm text-white/60">
          vagy hívj:{" "}
          <a href={PHONE.href} className="font-semibold text-white hover:text-lime">
            {PHONE.display}
          </a>
        </p>
      </div>

      <Arc />

      <div className="-mt-px bg-petrol-deep pb-16 text-center">
        <p className="text-2xl tracking-wide">
          <span className="font-extrabold">CYBER</span>
          <span className="font-light">BEAVER</span>
        </p>
        <ul className="mt-8 flex justify-center gap-6 text-lime">
          <li>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white">
              <LinkedInIcon />
            </a>
          </li>
          <li>
            <a href={`mailto:${EMAIL}`} aria-label="E-mail" className="hover:text-white">
              <MailIcon />
            </a>
          </li>
          <li>
            <a href={PHONE.href} aria-label="Telefon" className="hover:text-white">
              <PhoneIcon />
            </a>
          </li>
        </ul>

        <div className="mx-auto mt-16 max-w-6xl px-4 text-left">
          <div className="border-t border-lime/50" />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {COLUMNS.map(({ title, links, lines }) => (
              <div key={title} className="rounded-2xl bg-white/[0.04] p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-lime">{title}</p>
                <div className="mt-5 border-t border-white/15" />
                <ul className="mt-5 space-y-3 text-white/80">
                  {links?.map(({ label, href, external }) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="hover:text-lime"
                        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                  {lines?.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-12 text-center text-sm italic text-white/40">„Mert csak a legokosabb hód tudja, merre dől a fa.”</p>
        </div>
      </div>
    </footer>
  );
}
