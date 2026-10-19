// Ágazat-ikonok a Referenciák idővonalához.

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
