"use client";

import { useEffect } from "react";

// Ha az oldal hash-sel töltődik be (pl. aloldalról a /#szolgaltatasok linkkel), hidratálás után a böngésző
// nem ugrik a szakaszhoz — ezt pótolja. A scroll-mt-* margót (sticky fejléc) a scrollIntoView figyelembe veszi.
export default function HashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const el = id && document.getElementById(id);
    // betöltéskor azonnal (animáció nélkül) a szakasznál nyíljon meg
    if (el) el.scrollIntoView({ behavior: "instant" });
  }, []);
  return null;
}
