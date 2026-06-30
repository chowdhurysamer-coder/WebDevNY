import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { sfx } from "@/lib/sfx";
import { IconSound, IconMute, IconArrowUpRight, IconSun, IconMoon } from "@/components/icons";
import { Magnetic } from "@/components/primitives";

export function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  const toggle = () => {
    const v = !dark;
    setDark(v);
    document.documentElement.classList.toggle("dark", v);
    try { localStorage.setItem("webdevny_theme", v ? "dark" : "light"); } catch { /* ignore */ }
    sfx.tick();
  };
  return (
    <button onClick={toggle} data-cursor-label={dark ? "LIGHT" : "DARK"} aria-label="Toggle theme"
      className="w-9 h-9 flex items-center justify-center border border-line hover:border-ink transition-colors text-ink-soft hover:text-ink">
      <motion.span key={dark ? "m" : "s"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
        {dark ? <IconSun size={16} /> : <IconMoon size={16} />}
      </motion.span>
    </button>
  );
}

export function SoundToggle() {
  const [on, setOn] = useState(sfx.enabled);
  const toggle = () => { const v = !on; sfx.setEnabled(v); setOn(v); if (v) sfx.tick(); };
  return (
    <button onClick={toggle} data-cursor-label={on ? "MUTE" : "SOUND"} aria-label="Toggle sound"
      className="w-9 h-9 flex items-center justify-center border border-line hover:border-ink transition-colors text-ink-soft hover:text-ink">
      {on ? <IconSound size={16} /> : <IconMute size={16} />}
    </button>
  );
}

export function FloatingDock() {
  const [show, setShow] = useState(false);
  const loc = useLocation();
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 720);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const hidden = loc.pathname === "/contact";
  return (
    <AnimatePresence>
      {show && !hidden && (
        <motion.div
          initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
          className="fixed bottom-5 right-5 z-[55]">
          <Magnetic>
            <Link to="/contact" data-cursor-label="GO" onClick={() => sfx.tick()}
              className="group flex items-center gap-3 card-paper-kraft press pl-5 pr-3 py-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-paper/70 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-paper" />
              </span>
              <span className="mono-label">Start a project</span>
              <span className="w-7 h-7 bg-ink text-paper grid place-items-center group-hover:rotate-45 transition-transform">
                <IconArrowUpRight size={14} />
              </span>
            </Link>
          </Magnetic>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
