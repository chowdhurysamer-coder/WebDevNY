/**
 * WebDev brand mark — a lightbulb with a code-bracket glyph inside,
 * encircled by an orbiting dotted ring. Recreated as crisp SVG.
 * `currentColor` drives the navy; `bg` is the knockout for the inner glyph.
 */
export function LogoMark({ size = 34, className, bg = "rgb(var(--c-paper))", animated = false }: {
  size?: number; className?: string; bg?: string; animated?: boolean;
}) {
  const dots = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
    return { cx: 50 + Math.cos(a) * 45, cy: 50 + Math.sin(a) * 45 };
  });
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} fill="none" aria-hidden="true">
      {/* orbit ring */}
      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" opacity="0.85"
        className={animated ? "spin-slow" : undefined} style={{ transformOrigin: "50px 50px" }} />
      {dots.map((d, i) => <circle key={i} cx={d.cx} cy={d.cy} r="2.6" fill="currentColor" />)}

      {/* bulb glass */}
      <path d="M50 20 C61 20 70 29 70 40 C70 49 65 53 61.5 58 L38.5 58 C35 53 30 49 30 40 C30 29 39 20 50 20 Z" fill="currentColor" />
      {/* screw base */}
      <rect x="40" y="59.5" width="20" height="3.6" rx="1.8" fill="currentColor" />
      <rect x="41" y="64.5" width="18" height="3.6" rx="1.8" fill="currentColor" />
      <rect x="42" y="69.5" width="16" height="3.6" rx="1.8" fill="currentColor" />
      <path d="M44.5 74.5 L55.5 74.5 L52 80 L48 80 Z" fill="currentColor" />

      {/* code-bracket glyph (knockout) */}
      <g transform="rotate(-13 50 39)" stroke={bg} strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M47 28 L41 39 L47 50" />
        <path d="M53 28 L59 39 L53 50" />
      </g>
    </svg>
  );
}

export function LogoLockup({ size = 34, className, tagline = false }: { size?: number; className?: string; tagline?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className || ""}`}>
      <LogoMark size={size} className="text-navy" />
      <span className="leading-none">
        <span className="display text-[1.05em] font-semibold tracking-tight block">WebDev<span className="text-kraft">.</span>NY</span>
        {tagline && <span className="mono-label text-ink-faint text-[8px] block mt-1">Website Creation Agency</span>}
      </span>
    </span>
  );
}
