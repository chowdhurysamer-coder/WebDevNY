import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowUpRight } from "@/components/icons";
import { industries } from "@/data/industries";
import { sfx } from "@/lib/sfx";

const cols = [
  {
    h: "Build", items: [
      ["Web Design & Dev", "Hand-coded, brand-led", "/web-design"],
      ["Capabilities", "What we bring", "/capabilities"],
      ["Live Previews", "See before you commit", "/previews"],
    ],
  },
  {
    h: "Grow", items: [
      ["Analytics", "Data & results", "/analytics"],
      ["Pricing", "Flat fee + estimator", "/pricing"],
      ["Plans", "Maintenance & care", "/plans"],
      ["Journal", "Notes from the studio", "/journal"],
    ],
  },
];

export function MegaMenu() {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const enter = () => { if (timer.current) clearTimeout(timer.current); setOpen(true); };
  const leave = () => { timer.current = setTimeout(() => setOpen(false), 120); };

  return (
    <div className="hidden lg:block" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        data-cursor-label="MENU"
        className={`flex items-center gap-1.5 mono-label px-3 py-2 border transition-colors ${open ? "border-ink bg-ink text-paper" : "border-line text-ink-soft hover:border-ink"}`}>
        Services
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-[8px]">▾</motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 top-[calc(100%+1px)] px-5 sm:px-8">
            <div className="max-w-[1400px] mx-auto card-paper p-8 grid grid-cols-[1fr_1fr_1.3fr_1fr] gap-8">
              {cols.map((col) => (
                <div key={col.h}>
                  <div className="mono-label text-kraft mb-4">{col.h}</div>
                  <div className="flex flex-col gap-3">
                    {col.items.map(([t, d, to]) => (
                      <Link key={t} to={to} onClick={() => sfx.tick()} data-cursor-label="GO" className="group">
                        <div className="flex items-center gap-1.5 font-medium text-sm group-hover:text-kraft transition-colors">
                          {t} <IconArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="text-ink-faint text-xs">{d}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {/* industries */}
              <div>
                <div className="mono-label text-kraft mb-4">Industries</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                  {industries.map((i) => (
                    <Link key={i.slug} to={`/for/${i.slug}`} onClick={() => sfx.tick()} className="text-sm hover:text-kraft transition-colors">
                      {i.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* featured CTA */}
              <Link to="/contact" onClick={() => sfx.tick()} data-cursor-label="GO" className="card-paper-kraft press p-5 flex flex-col justify-between">
                <div className="mono-label text-paper/80">Free quote</div>
                <div>
                  <div className="display text-2xl font-semibold leading-tight mb-2">Start a project</div>
                  <span className="inline-flex items-center gap-1.5 mono-label">Let's talk <IconArrowUpRight size={13} /></span>
                </div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
