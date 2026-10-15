"use client";

// Vízszintes kártyasor + ‹ › nyilak a fejléc mellett. Nyílra egy kártyányit lapoz (smooth),
// a végeken a megfelelő nyíl letiltódik. Trackpad/swipe/Shift+görgő továbbra is natívan megy.
import { useEffect, useRef, useState } from "react";

function Arrow({ dir, disabled, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Előző referencia" : "Következő referencia"}
      className="flex size-12 cursor-pointer items-center justify-center rounded-full border border-petrol/15 bg-white text-petrol-deep transition hover:border-petrol hover:bg-petrol hover:text-white disabled:cursor-default disabled:opacity-30 disabled:hover:border-petrol/15 disabled:hover:bg-white disabled:hover:text-petrol-deep"
    >
      <svg
        viewBox="0 0 24 24"
        className="size-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={dir === "prev" ? "m15 6-6 6 6 6" : "m9 6 6 6-6 6"} />
      </svg>
    </button>
  );
}

export default function Carousel({ heading, edgeClass, scrollPadClass, children }) {
  const viewportRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    const update = () => {
      const max = viewport.scrollWidth - viewport.clientWidth;
      setAtStart(viewport.scrollLeft <= 1);
      setAtEnd(viewport.scrollLeft >= max - 1);
    };
    update();
    viewport.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      viewport.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const page = (dir) => {
    const viewport = viewportRef.current;
    const card = viewport.querySelector("li");
    const step = card ? card.offsetWidth + parseFloat(getComputedStyle(card.parentElement).columnGap || 0) : 400;
    viewport.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <>
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-end justify-between gap-6 px-4">
        {heading}
        <div className="flex shrink-0 gap-3">
          <Arrow dir="prev" disabled={atStart} onClick={() => page(-1)} />
          <Arrow dir="next" disabled={atEnd} onClick={() => page(1)} />
        </div>
      </div>

      <div
        ref={viewportRef}
        tabIndex={0}
        aria-label="Referenciák, oldalra görgethető"
        className={`mt-12 snap-x snap-mandatory overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${scrollPadClass}`}
      >
        <ol className={`flex w-max gap-6 ${edgeClass}`}>{children}</ol>
      </div>
    </>
  );
}
