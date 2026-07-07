import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { sfx } from "@/lib/sfx";
import { IconArrowUpRight, IconSearch } from "@/components/icons";
import { useLang } from "@/lib/i18n";

interface Cmd { labelKey: string; hintKey: string; to: string; keys?: string }

const commands: Cmd[] = [
  { labelKey: "link.index", hintKey: "search.hint.home", to: "/", keys: "index home" },
  { labelKey: "link.about", hintKey: "search.hint.about", to: "/about", keys: "team studio story about" },
  { labelKey: "search.explore", hintKey: "search.hint.explore", to: "/explore", keys: "sitemap map all pages explore everything" },
  { labelKey: "link.design", hintKey: "search.hint.webdesign", to: "/web-design", keys: "design dev build development" },
  { labelKey: "link.capabilities", hintKey: "search.hint.capabilities", to: "/capabilities", keys: "services skills capabilities" },
  // Placeholder example pages — hidden until we have real client work to show.
  // { labelKey: "link.portfolio", hintKey: "search.hint.portfolio", to: "/portfolio", keys: "work projects portfolio" },
  // { labelKey: "link.previews", hintKey: "search.hint.previews", to: "/previews", keys: "templates demo previews" },
  { labelKey: "link.analytics", hintKey: "search.hint.analytics", to: "/analytics", keys: "metrics data analytics results" },
  { labelKey: "link.pricing", hintKey: "search.hint.pricing", to: "/pricing", keys: "cost quote estimate pricing" },
  { labelKey: "link.plans", hintKey: "search.hint.plans", to: "/plans", keys: "maintenance support plans care" },
  { labelKey: "link.journal", hintKey: "search.hint.journal", to: "/journal", keys: "blog articles journal writing" },
  { labelKey: "link.contact", hintKey: "cta.start", to: "/contact", keys: "email quote hire book contact" },
  // Placeholder example case studies — hidden until we have real client work to show.
  // { labelKey: "search.case1", hintKey: "search.hint.restaurant", to: "/work/trattoria-bella", keys: "restaurant trattoria bella case" },
  // { labelKey: "search.case2", hintKey: "search.hint.fitness", to: "/work/ironworks-gym", keys: "gym fitness ironworks case" },
];

export function CommandPalette() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Resolve each command to its translated label/hint per language.
  const resolved = useMemo(
    () => commands.map((c) => ({ ...c, label: t(c.labelKey), hint: t(c.hintKey) })),
    [t],
  );

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return resolved;
    return resolved.filter((c) => (c.label + " " + c.hint + " " + (c.keys || "")).toLowerCase().includes(s));
  }, [q, resolved]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((o) => !o); sfx.tick(); }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) { setQ(""); setActive(0); setTimeout(() => inputRef.current?.focus(), 30); }
  }, [open]);

  useEffect(() => { setActive(0); }, [q]);

  // Lock background scroll while open so the faded backdrop stays put even if
  // the wheel/keys fire — pauses Lenis smooth-scroll and freezes the body.
  useEffect(() => {
    if (!open) return;
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
      lenis?.start();
    };
  }, [open]);

  const go = (to: string) => { setOpen(false); sfx.tick(); navigate(to); };

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(results.length - 1, a + 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
    if (e.key === "Enter" && results[active]) go(results[active].to);
  };

  const overlay = (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[200] flex items-start justify-center pt-[14vh] px-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onWheel={(e) => e.preventDefault()} onTouchMove={(e) => e.preventDefault()}
          onMouseDown={() => setOpen(false)}>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 backdrop-blur-md" style={{ background: "rgba(8,6,4,0.82)" }} />
          <motion.div
            initial={{ y: -16, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: -16, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            onMouseDown={(e) => e.stopPropagation()} onWheel={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl card-paper overflow-hidden" onKeyDown={onListKey}>
            <div className="flex items-center gap-3 px-5 border-b border-line">
              <IconSearch size={18} className="text-ink-faint" />
              <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)}
                placeholder={t("misc.searchPh")}
                className="flex-1 bg-transparent py-4 outline-none text-ink placeholder:text-ink-faint" />
              <span className="mono-label text-ink-faint">ESC</span>
            </div>
            <div className="max-h-[50vh] overflow-auto py-2">
              {results.length === 0 && <div className="px-5 py-8 text-center text-ink-faint mono-label">{t("misc.noMatches")}</div>}
              {results.map((c, i) => (
                <button key={c.to + c.labelKey} onMouseEnter={() => setActive(i)} onClick={() => go(c.to)}
                  className={`w-full flex items-center justify-between gap-3 px-5 py-3 text-left transition-colors ${i === active ? "bg-kraft text-paper" : "hover:bg-paper-2"}`}>
                  <span>
                    <span className="block text-sm font-medium">{c.label}</span>
                    <span className={`block text-xs ${i === active ? "text-paper/70" : "text-ink-faint"}`}>{c.hint}</span>
                  </span>
                  <IconArrowUpRight size={16} className={i === active ? "opacity-100" : "opacity-30"} />
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between px-5 py-2.5 border-t border-line mono-label text-ink-faint">
              <span>{t("misc.navOpen")}</span>
              <span>WEBDEV NY</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* trigger pill (desktop only — keeps the compact header uncramped below lg) */}
      <button onClick={() => { setOpen(true); sfx.tick(); }} data-cursor-label="⌘K"
        className="hidden lg:flex items-center gap-2 mono-label text-ink-faint border border-line px-3 py-2 hover:border-ink transition-colors">
        <IconSearch size={13} /> {t("misc.search")}
        <span className="ml-1 px-1.5 py-0.5 bg-paper-3 text-ink/60 rounded text-[10px]">⌘K</span>
      </button>

      {/* Rendered to <body> so the header's backdrop-filter can't turn the
          fixed backdrop into a scroll-clipped element (which made the fade
          collapse on scroll). */}
      {typeof document !== "undefined" && createPortal(overlay, document.body)}
    </>
  );
}
