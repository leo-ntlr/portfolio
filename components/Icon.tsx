interface IconProps {
  d: string;
  size?: number;
  stroke?: number;
  className?: string;
}

/** Stroked 24×24 icon from a single SVG path. */
export function Icon({ d, size = 16, stroke = 1.8, className }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

export const icons = {
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-3.5-3.5",
  arrow: "M5 12h14M13 6l6 6-6 6",
  close: "M6 6l12 12M18 6L6 18",
  menu: "M4 7h16M4 12h16M4 17h16",
  check: "M5 12l5 5 9-10",
  restart: "M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5",
  mail: "M3 5h18v14H3zM3 6l9 7 9-7",
  person: "M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zM3.5 22a8.5 8.5 0 0 1 17 0",
  cap: "M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5M22 9v6",
  award: "M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM8.5 13.5L7 22l5-3 5 3-1.5-8.5",
  role: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
  section: "M4 6h16M4 12h16M4 18h10",
  project: "M3 7h18v13H3zM3 7l3-4h12l3 4",
  skill: "M13 2L4 14h7l-1 8 9-12h-7z",
  chat: "M21 12a8 8 0 0 1-12 7l-5 1 1-4a8 8 0 1 1 16-4z",
  globe: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18",
};
