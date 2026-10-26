// Közös ikonkészlet: 24×24, 2px round stroke, egységes stílus (főoldali szolgáltatás-kártyák, aloldal-blokkok).

const icon = (paths) =>
  function Icon() {
    return (
      <svg
        viewBox="0 0 24 24"
        className="size-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {paths}
      </svg>
    );
  };

export const ShieldIcon = icon(
  <>
    <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z" />
    <path d="m9 12 2 2 4-4" />
  </>,
);
const ChecklistIcon = icon(
  <>
    <path d="m4 6 1.5 1.5L8 5M4 12l1.5 1.5L8 11M4 18l1.5 1.5L8 17" />
    <path d="M12 6h8M12 12h8M12 18h8" />
  </>,
);
const BankIcon = icon(
  <>
    <path d="M3 9 12 4l9 5" />
    <path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18" />
  </>,
);
const LockIcon = icon(
  <>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4M12 15v2" />
  </>,
);
const ChartIcon = icon(
  <>
    <path d="M4 20V4M4 20h16" />
    <path d="m8 15 3-4 3 2 5-6" />
  </>,
);
const LinkIcon = icon(
  <>
    <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
    <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
  </>,
);
const CarIcon = icon(
  <>
    <path d="M5 17H3v-5l2-5h14l2 5v5h-2" />
    <path d="M3 12h18M9 17h6" />
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
  </>,
);
const AuditIcon = icon(
  <>
    <rect x="5" y="4" width="14" height="17" rx="2" />
    <path d="M9 4V3h6v1M9 13l2 2 4-4" />
  </>,
);
const SearchIcon = icon(
  <>
    <circle cx="11" cy="11" r="6" />
    <path d="m20 20-4.5-4.5" />
  </>,
);
const TeachIcon = icon(
  <>
    <rect x="3" y="4" width="18" height="12" rx="1.5" />
    <path d="M8 20h8M12 16v4M7 9h6M7 12h4" />
  </>,
);


// Szolgáltatás-aloldalak blokkjaihoz (components/service-page/blocks.jsx)
const BuildingIcon = icon(
  <>
    <path d="M4 21V5l8-3 8 3v16M4 21h16M9 21v-4h6v4" />
    <path d="M8 8h2M14 8h2M8 12h2M14 12h2" />
  </>,
);
const FactoryIcon = icon(
  <>
    <path d="M3 21V10l6 4V10l6 4V6h6v15H3Z" />
    <path d="M7 17h2M12 17h2M17 17h1" />
  </>,
);
const SignalIcon = icon(
  <>
    <path d="M12 20v-8M8 16v4M16 14v6M4 18v2M20 10v10" />
    <path d="M5 8a10 10 0 0 1 14 0M8 11a6 6 0 0 1 8 0" />
  </>,
);
const BadgeIcon = icon(
  <>
    <circle cx="12" cy="9" r="6" />
    <path d="m9 14-1.5 7L12 19l4.5 2L15 14" />
  </>,
);
const WalletIcon = icon(
  <>
    <rect x="3" y="6" width="18" height="14" rx="2" />
    <path d="M3 10h18M16 15h2" />
  </>,
);
const ClockIcon = icon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </>,
);
const RefreshIcon = icon(
  <>
    <path d="M20 11a8 8 0 0 0-14.9-3M4 13a8 8 0 0 0 14.9 3" />
    <path d="M4 4v4h4M20 20v-4h-4" />
  </>,
);
const EyeIcon = icon(
  <>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
  </>,
);
const CapIcon = icon(
  <>
    <path d="m2 9 10-5 10 5-10 5L2 9Z" />
    <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5M22 9v6" />
  </>,
);
const AlertIcon = icon(
  <>
    <path d="M12 3 2 20h20L12 3Z" />
    <path d="M12 10v4M12 17h.01" />
  </>,
);

// Kulcs → ikon (CMS rejtett `icon` mezők, content/*). Ismeretlen kulcs → ShieldIcon a hívó oldalon.
export const ICONS = {
  shield: ShieldIcon,
  building: BuildingIcon,
  factory: FactoryIcon,
  signal: SignalIcon,
  badge: BadgeIcon,
  wallet: WalletIcon,
  clock: ClockIcon,
  refresh: RefreshIcon,
  eye: EyeIcon,
  cap: CapIcon,
  alert: AlertIcon,
  checklist: ChecklistIcon,
  audit: AuditIcon,
  bank: BankIcon,
  teach: TeachIcon,
  lock: LockIcon,
  car: CarIcon,
  chart: ChartIcon,
  link: LinkIcon,
  search: SearchIcon,
};
