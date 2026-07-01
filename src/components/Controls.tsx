import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { sfx } from "@/lib/sfx";
import { IconSound, IconMute, IconArrowUpRight, IconSun, IconMoon } from "@/components/icons";
import { Magnetic } from "@/components/primitives";
import { useLang, LANGS } from "@/lib/i18n";

export function LangToggle() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    window.addEventListener("mousedown", onDoc);
    return () => window.removeEventListener("mousedown", onDoc);
  }, []);

  const pick = (code: typeof lang) => { setLang(code); setOpen(false); sfx.tick(); };

  return (
    <div className="relative" ref={ref} dir="ltr">
      <button onClick={() => { setOpen((o) => !o); sfx.tick(); }} data-cursor-label="LANG" aria-label="Choose language"
        aria-expanded={open}
        className="h-9 px-2.5 flex items-center gap-1.5 border border-line hover:border-ink transition-colors mono-label text-ink-soft hover:text-ink">
        {lang.toUpperCase()}
        <motion.span animate={{ rotate: open ? 180 : 0 }} className="text-[8px] leading-none">▾</motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
            className="absolute right-0 mt-2 w-56 max-h-[70vh] overflow-auto card-paper z-[130] py-1">
            {LANGS.map((l) => {
              const active = l.code === lang;
              return (
                <button key={l.code} onClick={() => pick(l.code)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-2 text-left text-sm transition-colors ${active ? "bg-kraft text-paper" : "hover:bg-paper-2 text-ink"}`}>
                  <span className="flex flex-col leading-tight">
                    <span className="font-medium" dir={l.rtl ? "rtl" : "ltr"}>{l.native}</span>
                    <span className={`text-[11px] ${active ? "text-paper/70" : "text-ink-faint"}`}>{l.label}</span>
                  </span>
                  <span className={`mono-label ${active ? "text-paper" : "text-ink-faint"}`}>{l.code.toUpperCase()}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
  const { t: dockT } = useLang();
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
              <span className="mono-label">{dockT("cta.start")}</span>
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
