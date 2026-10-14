import RiskGrid from "./RiskGrid";

const SERVICES = ["NIS2 felkészítés", "DORA / MNB", "TISAX", "GDPR", "Kockázatelemzés", "IT audit"];

function Bracket({ side }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-[1.05em] w-[0.32em] border-y-[0.11em] border-lime align-[-0.12em] ${
        side === "left" ? "mr-[0.18em] rounded-l-[0.45em] border-l-[0.11em]" : "ml-[0.18em] rounded-r-[0.45em] border-r-[0.11em]"
      }`}
    />
  );
}

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-petrol text-white">
      <RiskGrid />
      {/* sötétebb folt a szöveg mögött, hogy a rács ne zavarja az olvasást */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 48% 42% at 50% 50%, rgba(11,68,86,0.97) 0%, rgba(11,68,86,0.85) 45%, rgba(11,68,86,0) 100%)",
        }}
      />

      <div className="mx-auto w-full max-w-5xl px-4 py-24 text-center">
        <div className="mx-auto w-fit max-w-full">
          <p className="mb-8 text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Cyber Beaver Kft.</p>

          {/* SEO fő kulcsszó: "kiszervezett információbiztonsági felelős" → H1 + title */}
          <h1 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="whitespace-nowrap text-lime">
              <Bracket side="left" />
              Kiszervezett
              <Bracket side="right" />
            </span>
            <br />
            információbiztonsági felelős
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg text-white/80 md:text-xl">
            Információbiztonsági tanácsadás, felkészítés és audit — Big4-os precizitással, a kisvállalkozások
            gyorsaságával és közvetlenségével.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="tel:+36302392475"
              className="w-full rounded-full bg-lime px-8 py-4 font-semibold text-petrol-deep transition hover:brightness-110 sm:w-auto"
            >
              Hívj: 06 30 239 24 75
            </a>
            <a
              href="mailto:agardyb@protonmail.com"
              className="w-full rounded-full border-2 border-lime px-8 py-[14px] font-semibold text-lime transition hover:bg-lime/10 sm:w-auto"
            >
              Írj e-mailt
            </a>
          </div>

          <ul className="mx-auto mt-14 flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-white/55">
            {SERVICES.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>

      <p className="pointer-events-none absolute bottom-6 right-6 hidden text-xs text-white/40 md:block">
        Vidd az egeret a piros pontok fölé ↖
      </p>
    </section>
  );
}
