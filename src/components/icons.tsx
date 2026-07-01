/* Hand-built line icons — single 1.6 stroke, crafted look. No icon library. */
type P = { className?: string; size?: number };
const base = (size = 24) => ({ width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const });

export const IconCode = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="m8 8-4 4 4 4" /><path d="m16 8 4 4-4 4" /><path d="m13 6-2 12" /></svg>
);
export const IconPen = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M12 19l7-7-3-3-7 7-1 4z" /><path d="M16 9l-1-1" /><path d="M4 20h6" /></svg>
);
export const IconChart = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M4 20V4" /><path d="M4 20h16" /><path d="M7 16l3-5 3 3 4-7" /></svg>
);
export const IconTarget = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3.4" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></svg>
);
export const IconLayers = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M12 3 3 8l9 5 9-5-9-5z" /><path d="m3 13 9 5 9-5" /></svg>
);
export const IconClock = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3 2" /></svg>
);
export const IconTag = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M3 11V4h7l11 11-7 7L3 11z" /><circle cx="7.5" cy="7.5" r="1.4" /></svg>
);
export const IconShield = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3z" /><path d="m9 12 2 2 4-4" /></svg>
);
export const IconSearch = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><circle cx="10.5" cy="10.5" r="6.5" /><path d="m20 20-4.5-4.5" /></svg>
);
export const IconBolt = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M13 2 4 14h7l-2 8 9-12h-7l2-8z" /></svg>
);
export const IconPhone = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><rect x="7" y="2" width="10" height="20" rx="2.5" /><path d="M11 18h2" /></svg>
);
export const IconGlobe = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.5 2.3 2.5 14.7 0 17M12 3.5c-2.5 2.3-2.5 14.7 0 17" /></svg>
);
export const IconArrow = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
);
export const IconArrowUpRight = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M7 17 17 7" /><path d="M8 7h9v9" /></svg>
);
export const IconStar = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M12 3.5 14.6 9l6 .6-4.5 4 1.4 5.9L12 16.6 6.5 19.5 7.9 13.6 3.4 9.6 9.4 9 12 3.5z" /></svg>
);
export const IconBox = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M12 3 4 7v10l8 4 8-4V7l-8-4z" /><path d="M4 7l8 4 8-4M12 11v10" /></svg>
);
export const IconCheck = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="m4 12 5 5L20 6" /></svg>
);
export const IconWrench = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M15 4a4 4 0 0 0-5 5L4 15v5h5l6-6a4 4 0 0 0 5-5l-3 3-2-2 3-3a4 4 0 0 0-3-1z" /></svg>
);
export const IconRefresh = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /><path d="M3 21v-5h5" /></svg>
);
export const IconHeadset = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M4 13v-1a8 8 0 0 1 16 0v1" /><rect x="2.5" y="13" width="4" height="6" rx="1.5" /><rect x="17.5" y="13" width="4" height="6" rx="1.5" /><path d="M20 19a4 4 0 0 1-4 3h-2" /></svg>
);
export const IconMail = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
);
export const IconPin = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
);
export const IconPlay = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M7 4.5v15l13-7.5-13-7.5z" /></svg>
);
export const IconUsers = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><circle cx="9" cy="8" r="3.2" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0" /><path d="M16 5.2a3.2 3.2 0 0 1 0 5.6M17.5 14.5a5.5 5.5 0 0 1 3 5" /></svg>
);
export const IconDollar = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M12 2v20" /><path d="M16.5 6.5C16 5 14.2 4 12 4 9.2 4 7.5 5.4 7.5 7.4c0 4.6 9 2.6 9 7.2 0 2-1.9 3.4-4.5 3.4-2.4 0-4.3-1.1-4.8-2.7" /></svg>
);
export const IconEye = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>
);
export const IconCursor = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M5 3l6 16 2-6 6-2L5 3z" /></svg>
);
export const IconSound = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M4 9v6h4l5 4V5L8 9H4z" /><path d="M16 8.5a4 4 0 0 1 0 7M18.5 6a7 7 0 0 1 0 12" /></svg>
);
export const IconMute = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M4 9v6h4l5 4V5L8 9H4z" /><path d="m16 9 5 5M21 9l-5 5" /></svg>
);
export const IconCommand = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M7 9V7a2 2 0 1 1 2 2H7zm0 6v2a2 2 0 1 0 2-2H7zm10-6V7a2 2 0 1 0-2 2h2zm0 6v2a2 2 0 1 1-2-2h2z" /><rect x="7" y="9" width="10" height="6" rx="1" /></svg>
);
export const IconBook = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5z" /><path d="M19 17H6a2 2 0 0 0-2 2" /></svg>
);
export const IconSun = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
);
export const IconMoon = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
);
export const IconX = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M4 4l16 16M20 4L4 20" /></svg>
);
export const IconInstagram = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r="0.6" fill="currentColor" /></svg>
);
export const IconLinkedin = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><rect x="3.5" y="3.5" width="17" height="17" rx="3" /><path d="M8 10.5V17M8 7.5v.01M12 17v-3.5a2 2 0 0 1 4 0V17" /></svg>
);
export const IconDribbble = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><circle cx="12" cy="12" r="8.5" /><path d="M5 8.5c4 .5 9 .3 12.5-2M8.5 20c1.5-6 1.2-11-2-15.5M20 13c-6-1.5-11 .5-13.5 5" /></svg>
);
