"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";

// Mobil hamburgermenü a SiteHeader-hez (sm alatt) — teljes képernyős overlay (Hallásgondozó-minta):
// középen nagy linkek lépcsőzetes beúszással, alattuk Kapcsolat CTA. Portállal a <body>-ba kerül,
// a header (z-40: logó + Kapcsolat + X) fölötte marad. Linkre kattintás / Escape / oldalváltás bezárja.
const STEP = 0.12; // beúszási lépcső (s)

export default function MobileMenu({ links, contactHref }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef(null);
  const pathname = usePathname();
  const close = () => setOpen(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => setOpen(false), [pathname]);

  // Zárva: inert (nem fókuszálható, Tab nem jut be)
  useEffect(() => {
    if (menuRef.current) menuRef.current.inert = !open;
  }, [open, mounted]);

  // Nyitva: Esc bezár, háttér-görgetés tiltva (a <html>-en, hogy a sticky header ne csússzon el)
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const html = document.documentElement;
    document.addEventListener("keydown", onKey);
    html.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = "";
    };
  }, [open]);

  // Beúszó elem: nyitáskor sorszám szerint késleltetve úszik be, záráskor késleltetés nélkül tűnik el
  const item = (i) => ({
    className: `transition duration-500 ease-out motion-reduce:transition-none ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`,
    style: { transitionDelay: open ? `${0.15 + i * STEP}s` : "0s" },
  });

  // Burger-sávok: nyitáskor előbb középre csúsznak, utána fordulnak X-be
  const bar = "absolute inset-x-2.5 h-0.5 rounded-full bg-current transition-all duration-200 motion-reduce:transition-none";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Menü bezárása" : "Menü megnyitása"}
        className="relative size-10 text-white hover:text-lime sm:hidden"
      >
        <span className={`${bar} ${open ? "top-[19px] rotate-45 delay-200" : "top-[13px]"}`} />
        <span className={`${bar} top-[19px] ${open ? "opacity-0" : ""}`} />
        <span className={`${bar} ${open ? "top-[19px] -rotate-45 delay-200" : "top-[25px]"}`} />
      </button>

      {mounted &&
        createPortal(
          <div
            id="mobile-menu"
            ref={menuRef}
            aria-hidden={!open}
            className={`fixed inset-0 z-30 flex flex-col items-center justify-center bg-petrol px-6 pt-20 text-white transition-[opacity,visibility] duration-300 motion-reduce:transition-none sm:hidden ${open ? "visible opacity-100" : "pointer-events-none invisible opacity-0"}`}
          >
            <nav aria-label="Mobil menü" className="flex flex-col items-center gap-4">
              {/* A beúszás a wrapperen van, hogy a késleltetés ne lassítsa a hover-t */}
              {links.map((l, i) => (
                <div key={l.href} {...item(i)}>
                  <a
                    href={l.href}
                    onClick={close}
                    className="block px-1 py-2 text-center text-2xl font-semibold leading-tight hover:text-lime"
                  >
                    {l.label}
                  </a>
                </div>
              ))}
            </nav>
            <div {...item(links.length)}>
              <a
                href={contactHref}
                onClick={close}
                className="mt-12 block rounded-full bg-lime px-8 py-3 text-base font-semibold text-petrol-deep transition hover:brightness-110"
              >
                Kapcsolat
              </a>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
