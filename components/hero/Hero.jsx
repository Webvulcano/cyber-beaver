import { getCms } from "@/lib/cms";
import RiskGrid from "./RiskGrid";

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

// Magasság: a sticky fejléc (SiteHeader, 69px) alatt pontosan egy képernyőnyi.
export default async function Hero() {
  const cms = await getCms();
  const services = cms.list("home.hero.services");

  return (
    <section className="relative isolate flex min-h-[calc(100svh-69px)] items-center overflow-hidden bg-petrol text-white">
      <RiskGrid />
      {/* sötétebb folt a szöveg mögött, hogy a rács ne zavarja az olvasást */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 48% 42% at 50% 50%, color-mix(in srgb, var(--c-base) 97%, transparent) 0%, color-mix(in srgb, var(--c-base) 85%, transparent) 45%, transparent 100%)",
        }}
      />

      <div className="mx-auto w-full max-w-5xl px-4 py-24 text-center">
        <div className="mx-auto w-fit max-w-full">
          <p className="mb-8 text-sm font-semibold uppercase tracking-[0.2em] text-white/60" {...cms.attr("home.hero.company")}>
            {cms.text("home.hero.company")}
          </p>

          {/* SEO fő kulcsszó: "kiszervezett információbiztonsági felelős" → H1 + title */}
          <h1 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="whitespace-nowrap text-lime" {...cms.attr("home.hero.title_highlight")}>
              {cms.text("home.hero.title_highlight")}
            </span>
            <br />
            <span {...cms.attr("home.hero.title")}>{cms.text("home.hero.title")}</span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg text-white/80 md:text-xl" {...cms.attr("home.hero.subtitle")}>
            {cms.text("home.hero.subtitle")}
          </p>

          <div className="mt-10 flex justify-center">
            {/* #kapcsolat: a footer tetején lévő Kapcsolat rész */}
            <a
              href="#kapcsolat"
              className="w-full rounded-full bg-lime px-10 py-4 font-semibold text-petrol-deep transition hover:brightness-110 sm:w-auto"
              {...cms.attr("home.hero.cta")}
            >
              {cms.text("home.hero.cta")}
            </a>
          </div>

          <ul className="mx-auto mt-14 flex max-w-3xl flex-wrap justify-center gap-x-6 text-sm font-medium text-white/55">
            {/* #szolgaltatasok: a Szolgáltatások szekció */}
            {services.map((s, i) => (
              <li key={i}>
                <a href="#szolgaltatasok" className="inline-block py-2 transition hover:text-lime" {...cms.attr("home.hero.services", i, "label")}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="pointer-events-none absolute bottom-6 right-6 hidden text-xs text-white/40 md:block">
        Vidd az egeret a piros pontok fölé
      </p>
    </section>
  );
}
