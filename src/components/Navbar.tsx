import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { GEN_MENU_BG } from "@/lib/media";
import { IconArrowUpRight } from "@/components/icons";
import { LogoMark } from "@/components/Logo";
import { MegaMenu } from "@/components/MegaMenu";
import { Magnetic } from "@/components/primitives";
import { LiveClock } from "@/components/flourishes";
import { CommandPalette } from "@/components/CommandPalette";
import { SoundToggle, ThemeToggle, LangToggle } from "@/components/Controls";
import { sfx } from "@/lib/sfx";
import { useLang } from "@/lib/i18n";

const links = [
  { label: "Index", to: "/", n: "00" },
  { label: "About", to: "/about", n: "01" },
  { label: "Design & Dev", to: "/web-design", n: "02" },
  { label: "Capabilities", to: "/capabilities", n: "03" },
  { label: "Portfolio", to: "/portfolio", n: "04" },
  { label: "Previews", to: "/previews", n: "05" },
  { label: "Analytics", to: "/analytics", n: "06" },
  { label: "Pricing", to: "/pricing", n: "07" },
  { label: "Plans", to: "/plans", n: "08" },
  { label: "Journal", to: "/journal", n: "09" },
  { label: "Contact", to: "/contact", n: "10" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const location = useLocation();
  const { t } = useLang();

  // menu spotlight
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 30 });
  const sy = useSpring(my, { stiffness: 200, damping: 30 });
  const spot = useMotionTemplate`radial-gradient(circle 360px at ${sx}px ${sy}px, rgba(255,190,110,0.20), rgba(255,150,60,0.05) 45%, transparent 70%)`;
  const onMenuMove = (e: React.MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [location]);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled ? "bg-paper/85 backdrop-blur-md border-b border-line" : "border-b border-transparent"}`}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Link to="/" data-cursor-label="HOME" className="flex items-center gap-2.5 group">
              <LogoMark size={34} className="text-navy group-hover:rotate-[8deg] transition-transform duration-300" />
              <span className="display text-[19px] font-semibold leading-none">WebDev<span className="text-kraft">.</span>NY</span>
            </Link>
            <MegaMenu />
          </div>

          {/* center: status */}
          <div className="hidden lg:flex items-center gap-4 mono-label text-ink-faint">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-kraft animate-pulse" />
              Booking Q3
            </span>
            <span className="h-3 w-px bg-line" />
            <span className="flex items-center gap-1.5">NYC <LiveClock /></span>
          </div>

          <div className="flex items-center gap-2.5">
            <CommandPalette />
            <LangToggle />
            <ThemeToggle />
            <SoundToggle />
            <Magnetic>
              <Link to="/contact" data-cursor-label="GO" className="hidden sm:flex items-center gap-2 bg-ink text-paper px-4 py-2.5 mono-label hover:bg-kraft transition-colors">
                {t("nav.start")} <IconArrowUpRight size={14} />
              </Link>
            </Magnetic>
            <button onClick={() => { setOpen(!open); sfx.tick(); }} data-cursor-label={open ? "CLOSE" : "MENU"} className="flex flex-col gap-1.5 w-10 h-10 items-center justify-center border border-line hover:border-ink transition-colors">
              <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 4 : 0 }} className="w-5 h-px bg-ink block" />
              <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -3 : 0 }} className="w-5 h-px bg-ink block" />
            </button>
          </div>
        </div>
      </header>

      {/* full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 text-paper flex flex-col justify-center overflow-hidden"
            style={{ background: "#050505" }}
            onMouseMove={onMenuMove}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Higgsfield-generated graphic */}
            <motion.div
              initial={{ scale: 1.12, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${GEN_MENU_BG})` }} />
            {/* legibility wash */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(115deg, rgba(5,5,5,0.94) 0%, rgba(18,12,7,0.82) 50%, rgba(40,20,6,0.62) 100%)" }} />
            {/* mouse spotlight */}
            <motion.div className="absolute inset-0 pointer-events-none" style={{ background: spot, mixBlendMode: "screen" }} />
            {/* grid */}
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "48px 48px" }} />

            {/* giant hovered watermark numeral */}
            <AnimatePresence>
              {hovered && (
                <motion.span key={hovered}
                  initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="hidden lg:block absolute right-6 bottom-2 display font-semibold leading-none pointer-events-none text-[26vw] text-kraft/15 select-none">
                  {hovered}
                </motion.span>
              )}
            </AnimatePresence>

            <nav className="relative max-w-[1400px] w-full mx-auto px-5 sm:px-8 pt-20">
              {links.map((l, i) => {
                const active = location.pathname === l.to;
                return (
                  <motion.div key={l.to}
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }}
                    onHoverStart={() => setHovered(l.n)}>
                    <Link to={l.to} className="group relative flex items-baseline gap-5 border-b border-paper/15 py-3 sm:py-4">
                      {/* accent slide bar */}
                      <span className="absolute left-0 bottom-0 h-px bg-kraft w-0 group-hover:w-full transition-all duration-500" />
                      <span className="mono-label text-paper/50 group-hover:text-kraft transition-colors">{l.n}</span>
                      <motion.span
                        className={`display text-[clamp(34px,7vw,76px)] leading-none transition-all duration-300 ${active ? "text-kraft" : "text-paper/85 group-hover:text-paper group-hover:translate-x-3"}`}>
                        {l.label}
                      </motion.span>
                      <IconArrowUpRight size={26} className="ml-auto self-center opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-kraft" />
                    </Link>
                  </motion.div>
                );
              })}
              <div className="mt-8 flex items-center gap-6 mono-label text-paper/40">
                <span>hello@webdevny.com</span><span className="hidden sm:inline">·</span><span className="hidden sm:inline">New York, NY</span>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
