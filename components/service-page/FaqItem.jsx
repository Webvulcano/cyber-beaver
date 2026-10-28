"use client";

import { useRef } from "react";

// GYIK-elem: natív <details> (a válasz mindig a DOM-ban, SEO), a nyitás/zárás magasság-animációval (Web Animations API).
// Záráskor az `open` csak az animáció végén kerül le; addig `data-closing` jelzi (a nyíl ehhez igazodik).
// prefers-reduced-motion esetén nincs animáció.
export default function FaqItem({ summary, children }) {
  const ref = useRef(null);
  const bodyRef = useRef(null);
  const anim = useRef(null);

  function toggle(e) {
    e.preventDefault();
    const details = ref.current;
    const body = bodyRef.current;
    const opening = !details.open || "closing" in details.dataset;
    const from = details.open ? body.getBoundingClientRect().height : 0;
    anim.current?.cancel();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      delete details.dataset.closing;
      details.open = opening;
      return;
    }

    details.open = true;
    if (opening) delete details.dataset.closing;
    else details.dataset.closing = "";
    const to = opening ? body.scrollHeight : 0;
    const a = body.animate({ height: [`${from}px`, `${to}px`] }, { duration: 250, easing: "ease-out" });
    anim.current = a;
    a.onfinish = () => {
      anim.current = null;
      if (!opening) {
        delete details.dataset.closing;
        details.open = false;
      }
    };
  }

  return (
    <details ref={ref} className="group border-b border-petrol/15">
      <summary
        onClick={toggle}
        className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-semibold text-petrol-deep [&::-webkit-details-marker]:hidden"
      >
        {summary}
      </summary>
      <div ref={bodyRef} className="overflow-hidden">
        {children}
      </div>
    </details>
  );
}
