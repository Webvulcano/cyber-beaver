// Demo partner-logók (fiktív nevek), flat fehér stílusban. Valódi logók érkezésekor
// a LogoTicker PARTNERS listájában cseréld le őket (SVG fájl vagy komponens).
// Az ágazat-ikonokat a Referenciák idővonala is használja.

export function BankIcon({ className = "size-9" }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16 2 2 9v3h28V9L16 2Z" />
      <rect x="5" y="14" width="3" height="11" />
      <rect x="11" y="14" width="3" height="11" />
      <rect x="18" y="14" width="3" height="11" />
      <rect x="24" y="14" width="3" height="11" />
      <rect x="2" y="27" width="28" height="3" />
    </svg>
  );
}

// inner = a "K" színe (a háttérhez igazítva, mert kivágásként látszik)
export function KkvIcon({ className = "size-8", inner = "var(--c-base)" }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="1" y="1" width="30" height="30" rx="9" fill="currentColor" />
      <path d="M10 8v16M10 16l9-8M13 13l8 11" style={{ stroke: inner }} strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function EnergyIcon({ className = "size-8" }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.5 1 5 18h9l-2.5 13L27 13h-9.5L18.5 1Z" />
    </svg>
  );
}

export function Bank1Logo() {
  return (
    <div className="flex items-center gap-3 text-white">
      <BankIcon />
      <span className="font-serif text-2xl font-semibold tracking-wide">Bank1</span>
    </div>
  );
}

export function Kkv2Logo() {
  return (
    <div className="flex items-center gap-2 text-white">
      <KkvIcon />
      <span className="text-2xl font-extrabold lowercase tracking-tight">kkv2</span>
    </div>
  );
}

export function Energia3Logo() {
  return (
    <div className="flex items-center gap-2 text-white">
      <EnergyIcon />
      <span className="text-xl font-black uppercase italic tracking-tighter">Energia3</span>
    </div>
  );
}

export function Szoftverceg4Logo() {
  return (
    <div className="flex items-center gap-2 text-white">
      <svg
        viewBox="0 0 32 32"
        className="size-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m10 9-7 7 7 7M22 9l7 7-7 7M18 6l-4 20" />
      </svg>
      <span className="text-xl font-medium">
        szoftver<span className="font-bold">cég4</span>
      </span>
    </div>
  );
}
