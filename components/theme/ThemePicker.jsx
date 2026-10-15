"use client";

// Fejlesztői színtéma-választó a teljes oldalhoz. Csak dev módban vagy ?paletta URL-paraméterrel látszik.
// Élesítés előtt: a kiválasztott téma kerüljön a themes.js elejére + globals.css :root-ba, ez törölhető.
import { useEffect, useState } from "react";
import { THEMES, themeVars } from "./themes";

const STORAGE_KEY = "cb-theme";

function applyTheme(theme) {
  const root = document.documentElement;
  Object.entries(themeVars(theme)).forEach(([k, v]) => root.style.setProperty(k, v));
  window.dispatchEvent(new Event("cb-theme"));
}

export default function ThemePicker() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState(THEMES[0].id);

  useEffect(() => {
    const show = process.env.NODE_ENV === "development" || new URLSearchParams(location.search).has("paletta");
    setVisible(show);
    if (!show) return;
    let saved = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {}
    const theme = THEMES.find((t) => t.id === saved);
    if (theme) {
      setActive(theme.id);
      applyTheme(theme);
    }
  }, []);

  if (!visible) return null;

  const choose = (theme) => {
    setActive(theme.id);
    applyTheme(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme.id);
    } catch {}
  };

  return (
    <div className="fixed right-4 bottom-4 z-50 w-72 rounded-2xl bg-white p-4 text-petrol-deep shadow-2xl ring-1 ring-petrol/10">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-sm font-semibold uppercase tracking-[0.15em]"
      >
        Színtéma
        <span aria-hidden="true">{open ? "–" : "+"}</span>
      </button>
      {open && (
        <ul className="mt-3 grid grid-cols-2 gap-2">
          {THEMES.map((t) => (
            <li key={t.id}>
              <button
                type="button"
                onClick={() => choose(t)}
                aria-pressed={active === t.id}
                className={`flex w-full items-center gap-2 rounded-lg p-1.5 text-left text-xs font-medium transition hover:bg-mist ${
                  active === t.id ? "bg-mist ring-2 ring-petrol" : ""
                }`}
              >
                <span
                  className="relative size-8 shrink-0 rounded-full ring-1 ring-black/10"
                  style={{ background: t.base }}
                >
                  <span
                    className="absolute right-0 bottom-0 size-3.5 rounded-full ring-2 ring-white"
                    style={{ background: t.accent }}
                  />
                </span>
                {t.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
