"use client";

// Egyedi események a Vercel Web Analyticsbe (sütimentes). Oldalmegtekintés: <Analytics /> (SiteAnalytics),
// ez a fájl a kapcsolatfelvételi kattintásokat + a sikeres űrlapküldést méri.
// Konverziók (cms.manifest.js analytics.vercel.conversions): Telefonhívás, Email, Űrlapküldés.
// A többi esemény (LinkedIn, Kapcsolat gomb) = érdeklődés. Egyedi esemény csak Pro csomagban, max. 2 extra adat.
import { track } from "@vercel/analytics";

// Az Ügyfél Admin szerkesztő iframe-je nem látogató
const inEditor = () => {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
};

export function trackEvent(name, props) {
  if (typeof window === "undefined" || inEditor()) return;
  track(name, props);
}

// href → eseménynév (null = nem mérjük)
export function classifyLink(href) {
  if (!href) return null;
  if (href.startsWith("tel:")) return "Telefonhívás";
  if (href.startsWith("mailto:")) return "Email";
  if (href.includes("linkedin.com")) return "LinkedIn";
  if (href === "#kapcsolat" || href === "/#kapcsolat") return "Kapcsolat gomb";
  return null;
}

// A gomb felirata; ikon-gombnál az aria-label
export function linkLabel(el) {
  const text = (el.innerText || el.textContent || "").replace(/\s+/g, " ").trim();
  return (text || el.getAttribute("aria-label") || "(ikon)").slice(0, 60);
}

const PLACE_NAMES = {
  szolgaltatasok: "szolgáltatások",
  rolam: "rólam",
  referenciak: "referenciák",
  gyik: "GYIK",
};

// Hol volt a link: fejléc / lábléc / hero / szakasz id / oldal útvonala
export function linkPlace(el) {
  if (el.closest("header")) return "fejléc";
  if (el.closest("footer")) return "lábléc";
  const sec = el.closest("section");
  if (sec?.id) return PLACE_NAMES[sec.id] || sec.id;
  if (sec && !sec.previousElementSibling) return "hero";
  return `oldal: ${window.location.pathname}`;
}
