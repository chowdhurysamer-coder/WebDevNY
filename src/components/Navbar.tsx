import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  { label: "Home", to: "/" },
  { label: "Web Design", to: "/web-design" },
  { label: "Capabilities", to: "/capabilities" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Analytics", to: "/analytics" },
  { label: "Pricing", to: "/pricing" },
  { label: "Plans", to: "/plans" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-500 ${scrolled ? "glass-strong" : "glass"}`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-xs font-bold text-white">W</div>
            <span className="font-barlow font-bold text-white text-[15px] tracking-tight">WebDev NY</span>
          </Link>

          {/* Desktop */}
          <ul className="hidden lg:flex items-center gap-1">
            {links.map((l) => {
              const active = location.pathname === l.to;
              return (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className={`px-3 py-1.5 rounded-lg text-[13px] font-medium font-barlow transition-all duration-200 ${active ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"}`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/contact"
              className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-[13px] font-barlow font-semibold hover:bg-sky-100 transition-colors"
            >
              Get Started
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <button onClick={() => setOpen(!open)} className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </motion.div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="mt-2 glass-strong rounded-2xl px-4 py-4 flex flex-col gap-1"
            >
              {links.map((l) => (
                <Link key={l.to} to={l.to} className="px-3 py-2.5 rounded-xl text-[14px] font-barlow font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                  {l.label}
                </Link>
              ))}
              <div className="border-t border-white/10 mt-2 pt-3">
                <Link to="/contact" className="flex items-center justify-center gap-2 bg-white text-black px-4 py-2.5 rounded-full text-[14px] font-barlow font-semibold">
                  Get Started <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
