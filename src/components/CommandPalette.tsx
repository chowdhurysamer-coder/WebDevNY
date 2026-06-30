import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { sfx } from "@/lib/sfx";
import { IconArrowUpRight, IconSearch } from "@/components/icons";

interface Cmd { label: string; hint: string; to: string; keys?: string }

const commands: Cmd[] = [
  { label: "Home", hint: "Intro & overview", to: "/", keys: "index" },
  { label: "Web Design & Development", hint: "What we make", to: "/web-design", keys: "design dev build" },
  { label: "Capabilities", hint: "What we bring", to: "/capabilities", keys: "services skills" },
  { label: "Portfolio", hint: "Selected work", to: "/portfolio", keys: "work projects" },
  { label: "Previews", hint: "Live demos", to: "/previews", keys: "templates demo" },
  { label: "Analytics", hint: "Data & results", to: "/analytics", keys: "metrics data" },
  { label: "Pricing", hint: "Flat-fee + estimator", to: "/pricing", keys: "cost quote estimate" },
  { label: "Plans", hint: "Maintenance & care", to: "/plans", keys: "maintenance support" },
  { label: "Journal", hint: "Notes & writing", to: "/journal", keys: "blog articles" },
  { label: "Contact", hint: "Start a project", to: "/contact", keys: "email quote hire book" },
  { label: "Case: Trattoria Bella", hint: "Restaurant", to: "/work/trattoria-bella", keys: "restaurant" },
  { label: "Case: IronWorks Gym", hint: "Fitness", to: "/work/ironworks-gym", keys: "gym fitness" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return commands;
    return commands.filter((c) => (c.label + " " + c.hint + " " + (c.keys || "")).toLowerCase().includes(s));
  }, [q]);

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

  const go = (to: string) => { setOpen(false); sfx.tick(); navigate(to); };

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(results.length - 1, a + 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
    if (e.key === "Enter" && results[active]) go(results[active].to);
  };

  return (
    <>
      {/* trigger pill (desktop) */}
      <button onClick={() => { setOpen(true); sfx.tick(); }} data-cursor-label="⌘K"
        className="hidden md:flex items-center gap-2 mono-label text-ink-faint border border-line px-3 py-2 hover:border-ink transition-colors">
        <IconSearch size={13} /> Search
        <span className="ml-1 px-1.5 py-0.5 bg-paper-3 text-ink/60 rounded text-[10px]">⌘K</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[120] flex items-start justify-center pt-[14vh] px-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ y: -16, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: -16, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="relative w-full max-w-xl card-paper overflow-hidden" onKeyDown={onListKey}>
              <div className="flex items-center gap-3 px-5 border-b border-line">
                <IconSearch size={18} className="text-ink-faint" />
                <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)}
                  placeholder="Jump to a page, project, or service…"
                  className="flex-1 bg-transparent py-4 outline-none text-ink placeholder:text-ink-faint" />
                <span className="mono-label text-ink-faint">ESC</span>
              </div>
              <div className="max-h-[50vh] overflow-auto py-2">
                {results.length === 0 && <div className="px-5 py-8 text-center text-ink-faint mono-label">No matches</div>}
                {results.map((c, i) => (
                  <button key={c.to + c.label} onMouseEnter={() => setActive(i)} onClick={() => go(c.to)}
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
                <span>↑↓ navigate · ↵ open</span>
                <span>WEBDEV NY</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
