import Link from "next/link";

// Aloldalak (szolgáltatás- és jogi oldalak) fejléce: logó → főoldal, jobbra linkek.
// contactHref: "#kapcsolat", ha az oldalon van kapcsolat-rész (szolgáltatás-oldal), különben "/#kapcsolat".
export default function SiteHeader({ contactHref = "/#kapcsolat" }) {
  return (
    <header className="bg-petrol text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Cyber Beaver – főoldal">
          <img src="/logo-mark-white.png" alt="" width={579} height={516} className="h-9 w-auto" />
          <span className="text-lg tracking-wide">
            <span className="font-extrabold">CYBER</span>
            <span className="font-light">BEAVER</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm font-semibold sm:gap-4">
          <Link href="/#szolgaltatasok" className="hidden px-2 py-2 text-white/80 hover:text-lime sm:block">
            Szolgáltatások
          </Link>
          <a href={contactHref} className="rounded-full bg-lime px-4 py-2 text-petrol-deep transition hover:brightness-110">
            Kapcsolat
          </a>
        </nav>
      </div>
    </header>
  );
}
