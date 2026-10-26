"use client";

import { useEffect, useRef, useState } from "react";

// Oldalsó szakasz-navigáció az ablak bal szélén (fixed), a tartalom szélességét nem érinti.
// xl–1600px: csak vonalak (az aktív hosszabb, accent), feliratok egérrel egy sötét panelben; 1600px-től teljes feliratok;
// xl alatt nincs. A képernyő középvonalán lévő szakasz linkje aktív; hero és footer fölött rejtett.
// Színe linkenként igazodik a mögötte lévő háttérhez (sötét sávok fölött világos), így a határon is olvasható.
// items: [{ id, label }] — navigációs pontok; sections: [{ id, dark }] — minden szakasz a sorrendben.
// Szakaszon kívül (hero, kapcsolódó linkek, footer) a háttér sötét.
export default function SectionNav({ items, sections }) {
  const [current, setCurrent] = useState(null);
  const [active, setActive] = useState(items[0]?.id);
  const [darkRows, setDarkRows] = useState([]);
  const currentRef = useRef(null);
  const linkRefs = useRef([]);

  // aktív szakasz: a képernyő középvonalát metsző szakasz
  useEffect(() => {
    const navIds = new Set(items.map((i) => i.id));
    const observer = new IntersectionObserver(
      (entries) => {
        let next = currentRef.current;
        for (const e of entries) {
          if (e.isIntersecting) next = e.target.id;
          else if (e.target.id === next) next = null;
        }
        currentRef.current = next;
        setCurrent(next);
        if (next && navIds.has(next)) setActive(next);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items, sections]);

  // linkenkénti háttér: melyik szakasz van a link sora mögött (görgetéskor, képkockánként egyszer)
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const rects = sections
        .map(({ id, dark }) => ({ dark, el: document.getElementById(id) }))
        .filter((s) => s.el)
        .map(({ dark, el }) => ({ dark, r: el.getBoundingClientRect() }));
      const next = linkRefs.current.map((a) => {
        if (!a) return false;
        const box = a.getBoundingClientRect();
        const y = box.top + box.height / 2;
        const under = rects.find(({ r }) => y >= r.top && y < r.bottom);
        return under ? under.dark : true;
      });
      setDarkRows((prev) => (prev.length === next.length && prev.every((v, i) => v === next[i]) ? prev : next));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sections]);

  return (
    <nav
      aria-label="Ezen az oldalon"
      className={`fixed top-1/2 left-0 z-30 hidden -translate-y-1/2 transition-opacity duration-300 xl:block ${
        current ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <ul className="group/nav rounded-r-2xl py-3 pr-5 transition-colors max-[1599px]:hover:bg-petrol-deep">
        {items.map(({ id, label }, i) => {
          const on = id === active;
          const dark = darkRows[i];
          const tone = on
            ? dark
              ? "font-semibold text-white"
              : "font-semibold text-petrol-deep"
            : dark
              ? "text-white/55 hover:text-white"
              : "text-petrol/55 hover:text-petrol-deep";
          return (
            <li key={id}>
              <a
                ref={(el) => (linkRefs.current[i] = el)}
                href={`#${id}`}
                aria-current={on ? "location" : undefined}
                aria-label={label}
                className={`flex items-center gap-3 py-1.5 pl-6 text-sm transition-colors ${tone} max-[1599px]:group-hover/nav:text-white`}
              >
                <span
                  aria-hidden="true"
                  className={`h-0.5 shrink-0 rounded-full transition-all duration-300 ${
                    on ? "w-7 bg-lime" : `w-4 ${dark ? "bg-white/35" : "bg-petrol/30"} max-[1599px]:group-hover/nav:bg-white/35`
                  }`}
                />
                <span className="hidden whitespace-nowrap group-hover/nav:inline min-[1600px]:inline">{label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
