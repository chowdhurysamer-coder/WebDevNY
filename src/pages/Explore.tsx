import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, SectionLabel } from "@/components/primitives";
import { IconArrowUpRight, IconSearch } from "@/components/icons";
import { cases } from "@/data/cases";
import { posts } from "@/data/journal";
import { industries } from "@/data/industries";

type Node = { label: string; to: string; hint?: string };
type Group = { h: string; n: string; items: Node[] };

const groups: Group[] = [
  { h: "Studio", n: "01", items: [
    { label: "Home", to: "/", hint: "Intro" },
    { label: "Web Design & Dev", to: "/web-design", hint: "What we make" },
    { label: "Capabilities", to: "/capabilities", hint: "What we bring" },
    { label: "Previews", to: "/previews", hint: "Live demos" },
    { label: "Analytics", to: "/analytics", hint: "Results" },
  ]},
  { h: "Company", n: "02", items: [
    { label: "About", to: "/about", hint: "Who we are" },
    { label: "Contact", to: "/contact", hint: "Start a project" },
    { label: "Pricing", to: "/pricing", hint: "Flat fee" },
    { label: "Plans", to: "/plans", hint: "Maintenance" },
    { label: "Privacy", to: "/privacy" }, { label: "Terms", to: "/terms" },
  ]},
  { h: "Case studies", n: "03", items: cases.map((c) => ({ label: c.name, to: `/work/${c.slug}`, hint: c.category })) },
  { h: "Industries", n: "04", items: industries.map((i) => ({ label: i.name, to: `/for/${i.slug}`, hint: "Landing page" })) },
  { h: "Journal", n: "05", items: posts.map((p) => ({ label: p.title, to: `/journal/${p.slug}`, hint: p.category })) },
];

export default function Explore() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return groups;
    return groups
      .map((g) => ({ ...g, items: g.items.filter((it) => (it.label + " " + (it.hint || "")).toLowerCase().includes(s)) }))
      .filter((g) => g.items.length);
  }, [q]);

  const total = groups.reduce((a, g) => a + g.items.length, 0);

  return (
    <div className="bg-paper pt-16">
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-20 pb-10 border-b border-line">
        <SectionLabel index="✦" className="mb-8">Explore — the whole site</SectionLabel>
        <h1 className="display text-[clamp(44px,10vw,150px)] font-semibold tracking-tightest">
          <Reveal text="Everything," />
          <span className="italic text-kraft"><Reveal text="in one place." delay={0.15} /></span>
        </h1>
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-3 card-paper px-4 py-3 max-w-md w-full">
            <IconSearch size={16} className="text-ink-faint" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter pages, projects, industries…"
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-ink-faint" />
          </div>
          <span className="mono-label text-ink-faint">{total} destinations</span>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-16">
        <AnimatePresence mode="popLayout">
          {filtered.map((g) => (
            <motion.div key={g.h} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-14">
              <div className="flex items-baseline gap-3 mb-6">
                <span className="mono-label text-kraft">{g.n}</span>
                <h2 className="display text-3xl font-semibold">{g.h}</h2>
                <span className="mono-label text-ink-faint">— {g.items.length}</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {g.items.map((it, i) => (
                  <motion.div key={it.to + it.label} layout
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                    <Link to={it.to} data-cursor-label="GO" className="group card-paper press flex items-center justify-between gap-3 px-5 py-4">
                      <span>
                        <span className="block font-medium text-sm group-hover:text-kraft transition-colors">{it.label}</span>
                        {it.hint && <span className="mono-label text-ink-faint">{it.hint}</span>}
                      </span>
                      <IconArrowUpRight size={16} className="opacity-30 group-hover:opacity-100 group-hover:text-kraft group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && <div className="mono-label text-ink-faint text-center py-16">Nothing matches "{q}"</div>}
      </section>
    </div>
  );
}
