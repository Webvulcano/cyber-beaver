// Partner-logó ticker: végtelenített, jobbról balra úszó sor (csak CSS animáció).
// A lista kétszer van renderelve, az animáció -50%-ig tol → varratmentes ismétlés.
// TODO: valódi partner-logók (SVG, ügyfél engedélyével) → src mező; addig placeholder.

const PARTNERS = Array.from({ length: 7 }, (_, i) => ({ name: `Partner ${i + 1}`, src: null }));

function Logo({ partner }) {
  if (partner.src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={partner.src} alt={partner.name} className="h-10 w-auto opacity-80" />;
  }
  return (
    <div className="flex h-12 w-40 items-center justify-center gap-2 rounded-xl border border-dashed border-white/25 text-sm font-semibold text-white/45">
      <span aria-hidden="true" className="size-4 rounded-full border-2 border-white/40" />
      {partner.name}
    </div>
  );
}

export default function LogoTicker() {
  return (
    <section aria-label="Partnereink" className="bg-petrol py-12 text-white md:py-16">
      <div className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <ul className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[...PARTNERS, ...PARTNERS].map((partner, i) => (
            <li key={i} aria-hidden={i >= PARTNERS.length} className="shrink-0 px-8 md:px-12">
              <Logo partner={partner} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
