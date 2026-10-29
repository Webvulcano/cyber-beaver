import Link from "next/link";
import { publishedPath } from "@/content/pages";
import MobileMenu from "./MobileMenu";

// Közös fejléc (főoldal, szolgáltatás- és jogi oldalak): logó → főoldal, jobbra linkek. Sticky: görgetéskor fent marad
// (a szakasz-ugrásoknál a scroll-mt-16 hagy neki helyet).
// contactHref: "#kapcsolat", ha az oldalon van kapcsolat-rész (főoldal, szolgáltatás-oldal), különben "/#kapcsolat".
// servicesHref: "#szolgaltatasok" a főoldalon, máshol "/#szolgaltatasok".
export default function SiteHeader({ contactHref = "/#kapcsolat", servicesHref = "/#szolgaltatasok" }) {
  const ibfPath = publishedPath("ibf"); // IBF-aloldal menüpont, csak ha publikus (content/pages)
  const menuLinks = [
    { href: servicesHref, label: "Szolgáltatások" },
    ...(ibfPath ? [{ href: ibfPath, label: "Információbiztonsági felelős" }] : []),
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-petrol text-white">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Cyber Beaver – főoldal">
          <img src="/logo-mark-white.png" alt="Cyber Beaver logó" width={579} height={516} className="h-9 w-auto" />
          {/* Mobilon csak a logó: logó – Kapcsolat – hamburger */}
          <span className="hidden text-lg tracking-wide sm:inline">
            <span className="font-extrabold">CYBER</span>
            <span className="font-light">BEAVER</span>
          </span>
        </Link>
        <nav className="flex items-center gap-2 text-sm font-semibold sm:gap-4">
          {/* Hash-linkek sima <a>-val, nem Link-kel: a Next-router oldalon belül nem látja a sima linkekkel (pl. #kapcsolat)
              történt hash-váltást, oldalak között pedig nem görget a hash-hez. A böngésző mindkettőt jól kezeli. */}
          <a href={servicesHref} className="hidden px-2 py-2 text-white/80 hover:text-lime sm:block">
            Szolgáltatások
          </a>
          {ibfPath && (
            <a href={ibfPath} className="hidden px-2 py-2 text-white/80 hover:text-lime sm:block">
              Információbiztonsági felelős
            </a>
          )}
          {/* Mobilon a header közepén (abszolút), sm felett a sor végén */}
          <a
            href={contactHref}
            className="absolute left-1/2 -translate-x-1/2 rounded-full bg-lime px-4 py-2 text-petrol-deep transition hover:brightness-110 sm:static sm:translate-x-0"
          >
            Kapcsolat
          </a>
          <MobileMenu links={menuLinks} contactHref={contactHref} />
        </nav>
      </div>
    </header>
  );
}
