"use client";

// Lenyíló "Részletek" a szolgáltatás-kártyák alján. Animáció: grid-rows 0fr → 1fr (tényleges
// tartalommagasságra nyit, bármilyen hosszú szövegnél). A szöveg mindig a DOM-ban van (SEO).
import { useId, useState } from "react";

// textAttrs: CMS szerkesztő data-attribútumok a szövegre (cms.attr)
export default function Details({ children, textAttrs }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="mt-4 border-t border-petrol/10 pt-1 sm:mt-5 sm:pt-2">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full cursor-pointer items-center justify-between py-2.5 font-semibold text-petrol"
      >
        Részletek
        <svg
          viewBox="0 0 24 24"
          className={`size-5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div
        id={id}
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pt-3 text-petrol/70" {...textAttrs}>{children}</p>
        </div>
      </div>
    </div>
  );
}
