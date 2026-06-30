import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowUpRight, IconBox } from "@/components/icons";
import { Magnetic } from "@/components/primitives";

const links = [
  { label: "Index", to: "/", n: "00" },
  { label: "Design & Dev", to: "/web-design", n: "01" },
  { label: "Capabilities", to: "/capabilities", n: "02" },
  { label: "Portfolio", to: "/portfolio", n: "03" },
  { label: "Previews", to: "/previews", n: "04" },
  { label: "Analytics", to: "/analytics", n: "05" },
  { label: "Pricing", to: "/pricing", n: "06" },
  { label: "Plans", to: "/plans", n: "07" },
  { label: "Contact", to: "/contact", n: "08" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 bg-ink text-paper flex items-center justify-center group-hover:bg-kraft transition-colors">
              <IconBox size={17} />
            </span>
            <span className="display text-[19px] font-semibold leading-none">WebDev<span className="text-kraft">.</span>NY</span>
          </Link>

          {/* center: status */}
          <div className="hidden lg:flex items-center gap-2 mono-label text-ink-faint">
            <span className="w-1.5 h-1.5 rounded-full bg-kraft animate-pulse" />
            Booking Q3 — NYC
          </div>

          <div className="flex items-center gap-3">
            <Magnetic>
              <Link to="/contact" data-cursor-label="GO" className="hidden sm:flex items-center gap-2 bg-ink text-paper px-4 py-2.5 mono-label hover:bg-kraft transition-colors">
                Start a Project <IconArrowUpRight size={14} />
              </Link>
            </Magnetic>
            <button onClick={() => setOpen(!open)} data-cursor-label={open ? "CLOSE" : "MENU"} className="flex flex-col gap-1.5 w-10 h-10 items-center justify-center border border-line hover:border-ink transition-colors">
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
            className="fixed inset-0 z-40 text-paper flex flex-col justify-center"
            style={{ background: "linear-gradient(150deg, #D6802F 0%, #C66E22 55%, #9A4F16 100%)" }}
          >
            <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
            <nav className="relative max-w-[1400px] w-full mx-auto px-5 sm:px-8 pt-20">
              {links.map((l, i) => {
                const active = location.pathname === l.to;
                return (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.05 }}
                  >
                    <Link to={l.to} className="group flex items-baseline gap-5 border-b border-paper/20 py-3 sm:py-4">
                      <span className="mono-label text-paper/50 group-hover:text-ink transition-colors">{l.n}</span>
                      <span className={`display text-[clamp(34px,7vw,76px)] leading-none transition-colors ${active ? "text-ink" : "text-paper group-hover:text-ink"}`}>
                        {l.label}
                      </span>
                      <IconArrowUpRight size={26} className="ml-auto self-center opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-ink" />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
