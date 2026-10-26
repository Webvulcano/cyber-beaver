"use client";

// Egyetlen delegált kattintás-figyelő: minden kapcsolatfelvételi linket mér (tel, mailto, LinkedIn, #kapcsolat),
// így az egyes gombokhoz nem kell külön kód. Szabályok: lib/analytics.js.
import { useEffect } from "react";
import { classifyLink, linkLabel, linkPlace, trackEvent } from "@/lib/analytics";

export default function ClickTracker() {
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest?.("a[href]");
      if (!a) return;
      const name = classifyLink(a.getAttribute("href"));
      if (!name) return;
      trackEvent(name, { hely: linkPlace(a), gomb: linkLabel(a) });
    };
    // capture: a navigáció / új lap előtt fusson le
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
