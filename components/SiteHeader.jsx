import Link from "next/link";

// Közös fejléc (főoldal, szolgáltatás- és jogi oldalak): logó → főoldal, jobbra linkek. Sticky: görgetéskor fent marad
// (a szakasz-ugrásoknál a scroll-mt-16 hagy neki helyet).
// contactHref: "#kapcsolat", ha az oldalon van kapcsolat-rész (főoldal, szolgáltatás-oldal), különben "/#kapcsolat".
// servicesHref: "#szolgaltatasok" a főoldalon, máshol "/#szolgaltatasok".
export default function SiteHeader({ contactHref = "/#kapcsolat", servicesHref = "/#szolgaltatasok" }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-petrol text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Cyber Beaver – főoldal">
          <img src="/logo-mark-white.png" alt="Cyber Beaver logó" width={579} height={516} className="h-9 w-auto" />
          <span className="text-lg tracking-wide">
            <span className="font-extrabold">CYBER</span>
            <span className="font-light">BEAVER</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm font-semibold sm:gap-4">
          {/* Hash-linkek sima <a>-val, nem Link-kel: a Next-router oldalon belül nem látja a sima linkekkel (pl. #kapcsolat)
              történt hash-váltást, oldalak között pedig nem görget a hash-hez. A böngésző mindkettőt jól kezeli. */}
          <a href={servicesHref} className="hidden px-2 py-2 text-white/80 hover:text-lime sm:block">
            Szolgáltatások
          </a>
          <a href={contactHref} className="rounded-full bg-lime px-4 py-2 text-petrol-deep transition hover:brightness-110">
            Kapcsolat
          </a>
        </nav>
      </div>
    </header>
  );
}
