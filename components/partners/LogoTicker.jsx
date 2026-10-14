// Partner-logó ticker: végtelenített, jobbról balra úszó sor (csak CSS animáció).
// A sor kétszer van renderelve, az animáció -50%-ig tol → varratmentes ismétlés.
// TODO: valódi partner-logók (ügyfél engedélyével) a demo logók helyére.
import { Bank1Logo, Energia3Logo, Kkv2Logo, Szoftverceg4Logo } from "./logos";

const PARTNERS = [
  { name: "Bank1", Logo: Bank1Logo },
  { name: "KKV2", Logo: Kkv2Logo },
  { name: "Energia3", Logo: Energia3Logo },
  { name: "Szoftvercég4", Logo: Szoftverceg4Logo },
];

// Kevés logónál széles képernyőn rés maradna → a sort ismételjük, hogy biztosan kitöltse.
const ROW = [...PARTNERS, ...PARTNERS];

export default function LogoTicker() {
  return (
    <section aria-label="Partnereink" className="bg-petrol py-12 text-white md:py-16">
      <div className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <ul className="flex w-max items-center animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[...ROW, ...ROW].map(({ name, Logo }, i) => (
            <li key={i} aria-hidden={i >= PARTNERS.length} className="shrink-0 px-10 opacity-90 md:px-16">
              <span className="sr-only">{name}</span>
              <Logo />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
