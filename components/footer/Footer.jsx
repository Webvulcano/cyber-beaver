import ContactForm from "./ContactForm";

// Footer = Kapcsolat szekció (#kapcsolat, ide visz a hero "Kapcsolat" gombja: "Hívj fel" CTA + űrlap) + lime körív,
// alatta logó, elérhetőség-ikonok, lime vonal és link-kártyák. A felső rész a hero petrolja + álló
// pontrács (a hero és a footer keretezi az oldalt); a körív alatt egyszínű petrol-deep. Flat: nincs glow.

const EMAIL = "agardyb@protonmail.com";
const PHONE = { display: "+36 30 239 24 75", href: "tel:+36302392475" };
const LINKEDIN = "https://www.linkedin.com/in/balazs-agardy-55802a51/";
// modul-szinten: Cache Components mellett render közben nem lehet new Date()
const YEAR = new Date().getFullYear();

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
    title: "Kapcsolat",
    lines: ["Cyber Beaver Kft.", "Budapest"],
    links: [
      { label: EMAIL, href: `mailto:${EMAIL}` },
      { label: PHONE.display, href: PHONE.href },
    ],
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

// Körív (flat): valódi kör teteje — nem nyújtott ellipszis. A kör átmérője a footer szélességének 3×-osa
// (laposabb ív, hogy legörgetve a teteje még látsszon); a doboz magassága pontosan a kör "sagitta"-ja
// (1.5 − √2 ≈ 0.0858 × szélesség → aspect 11.657), így az alsó élén a kör húrja = teljes szélesség,
// és alatta a petrol-deep rész varrat nélkül folytatódik.
function Arc() {
  return (
    <div aria-hidden="true" className="relative w-full overflow-hidden" style={{ aspectRatio: "11.657" }}>
      <div className="absolute top-0 left-1/2 aspect-square w-[300%] -translate-x-1/2 rounded-full border-[3px] border-lime bg-petrol-deep" />
    </div>
  );
}

export default function Footer() {
  return (
    <footer
      id="kapcsolat"
      className="overflow-hidden bg-petrol text-white"
      style={{ backgroundImage: DOT_GRID, backgroundPosition: "center top" }}
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-4 pt-24 pb-16 md:pt-32 md:pb-24 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        {/* bal: cím + "Hívj fel" CTA + e-mail */}
        <div className="lg:pt-4">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Kapcsolat</p>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Kérj ajánlatot vagy egyeztessünk.</h2>
          <p className="mt-6 text-lg text-white/70">
            Írd meg röviden, miben segíthetek, és 1 munkanapon belül jelentkezem. Ha sürgős, hívj fel bátran.
          </p>

          <a
            href={PHONE.href}
            className="mt-10 inline-flex w-full items-center justify-center gap-3 rounded-full bg-lime px-8 py-4 font-semibold text-petrol-deep transition hover:brightness-110 sm:w-auto"
          >
            <PhoneIcon />
            Hívj fel: {PHONE.display}
          </a>
        </div>

        <ContactForm />
      </div>

      <Arc />

      <div className="-mt-px bg-petrol-deep pb-10 text-center">
        {/* logo-mark-white.png: a public/logo.jpg hódfeje fehérre, átlátszó háttérrel (felirat nélkül) */}
        <img src="/logo-mark-white.png" alt="" width={579} height={516} className="mx-auto mb-4 h-16 w-auto" />
        <p className="text-2xl tracking-wide">
          <span className="font-extrabold">CYBER</span>
          <span className="font-light">BEAVER</span>
        </p>
        <p className="mt-3 px-4 text-sm italic text-white/50">„Mert csak a legokosabb hód tudja, merre dől a fa.”</p>
        <ul className="mt-6 flex justify-center gap-6 text-lime">
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

        <div className="mx-auto mt-10 max-w-6xl px-4 text-left">
          <div className="border-t border-lime/50" />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {COLUMNS.map(({ title, links, lines }) => (
              <div key={title} className="rounded-2xl bg-white/[0.04] p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-lime">{title}</p>
                <div className="mt-4 border-t border-white/15" />
                <ul className="mt-4 space-y-2 text-white/80">
                  {links?.map(({ label, href, external }) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="break-all hover:text-lime"
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
        </div>
      </div>

      {/* legalsó sáv: copyright */}
      <div className="border-t border-white/10 bg-petrol-deep px-4 py-4 text-center text-sm text-white/40">
        © {YEAR} Cyber Beaver Kft. Minden jog fenntartva.
      </div>
    </footer>
  );
}
