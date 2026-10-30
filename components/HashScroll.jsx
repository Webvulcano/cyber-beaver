"use client";

import { useEffect } from "react";

// Ha az oldal hash-sel töltődik be (pl. aloldalról a /#szolgaltatasok linkkel), hidratálás után a böngésző
// nem ugrik a szakaszhoz — ezt pótolja. A scroll-mt-* margót (sticky fejléc) a scrollIntoView figyelembe veszi.
// Hidratálás után még töltődnek képek/fontok és nő a layout fölötte → a pozíció elcsúszik (üres/fehér rész
// látszik). Ezért amíg a layout változik és a user nem görgetett magától, újraigazítjuk (max. 4 mp).
export default function HashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const el = id && document.getElementById(id);
    if (!el) return;

    // betöltéskor azonnal (animáció nélkül) a szakasznál nyíljon meg
    const jump = () => el.scrollIntoView({ behavior: "instant" });
    jump();

    const ro = new ResizeObserver(jump);
    ro.observe(document.body);
    window.addEventListener("load", jump);
    document.fonts?.ready.then(jump);

    const events = ["wheel", "touchstart", "keydown", "mousedown"];
    const stop = () => {
      ro.disconnect();
      window.removeEventListener("load", jump);
      events.forEach((e) => window.removeEventListener(e, stop));
      clearTimeout(timer);
    };
    events.forEach((e) => window.addEventListener(e, stop, { passive: true }));
    const timer = setTimeout(stop, 4000);
    return stop;
  }, []);
  return null;
}
