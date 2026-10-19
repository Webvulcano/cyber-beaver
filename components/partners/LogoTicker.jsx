// Partner-logó ticker: végtelenített, jobbról balra úszó sor (csak CSS animáció).
// A sor kétszer van renderelve, az animáció -50%-ig tol → varratmentes ismétlés.
// Logók: public/companies/. A színes logókat a `brightness-0 invert` egységesen fehérre húzza.
// h = magasság: széles (fekvő) logó alacsonyabb, kompakt (álló) logó magasabb, hogy optikailag egyformák legyenek.

const PARTNERS = [
  { name: "Middle East Privacy", src: "/companies/Logo_white-1.svg", h: "h-8" },
  { name: "Premier Energy", src: "/companies/PE-Group-color.svg", h: "h-8" },
  { name: "MB Energy", src: "/companies/Signet.svg", h: "h-7" },
  { name: "ISBM", src: "/companies/isbm-logo-transparent.png", h: "h-14" },
  { name: "Cybershield Consulting", src: "/companies/logo-1.svg", h: "h-14" },
  { name: "Lotus Therme Hotel & Spa", src: "/companies/logo-30-white.png", h: "h-16" },
  { name: "Yigsoft", src: "/companies/logo_1.png", h: "h-9" },
];

export default function LogoTicker() {
  return (
    <section aria-label="Partnereink" className="bg-petrol py-6 text-white md:py-8">
      <div className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <ul className="flex w-max items-center animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[...PARTNERS, ...PARTNERS].map(({ name, src, h }, i) => (
            <li key={i} aria-hidden={i >= PARTNERS.length} className="shrink-0 px-10 opacity-90 md:px-16">
              <img src={src} alt={i < PARTNERS.length ? name : ""} className={`${h} w-auto brightness-0 invert`} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
