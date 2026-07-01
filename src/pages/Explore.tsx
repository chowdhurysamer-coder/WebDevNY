import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, SectionLabel } from "@/components/primitives";
import { IconArrowUpRight, IconSearch } from "@/components/icons";
import { cases } from "@/data/cases";
import { posts } from "@/data/journal";
import { industries } from "@/data/industries";
import { useLang } from "@/lib/i18n";

type Node = { label: string; to: string; hint?: string };
type Group = { hKey: string; n: string; items: Node[] };

const groups: Group[] = [
  { hKey: "ex.g.studio", n: "01", items: [
    { label: "ex.link.home", to: "/", hint: "ex.hint.intro" },
    { label: "ex.link.webdesign", to: "/web-design", hint: "ex.hint.whatMake" },
    { label: "link.capabilities", to: "/capabilities", hint: "ex.hint.whatBring" },
    { label: "link.previews", to: "/previews", hint: "ex.hint.liveDemos" },
    { label: "link.analytics", to: "/analytics", hint: "ex.hint.results" },
  ]},
  { hKey: "ex.g.company", n: "02", items: [
    { label: "link.about", to: "/about", hint: "ex.hint.whoWeAre" },
    { label: "link.contact", to: "/contact", hint: "ex.hint.startProject" },
    { label: "link.pricing", to: "/pricing", hint: "ex.hint.flatFee" },
    { label: "link.plans", to: "/plans", hint: "ex.hint.maintenance" },
    { label: "ex.link.privacy", to: "/privacy" }, { label: "ex.link.terms", to: "/terms" },
  ]},
  { hKey: "ex.g.cases", n: "03", items: cases.map((c) => ({ label: c.name, to: `/work/${c.slug}`, hint: c.category })) },
  { hKey: "ex.g.industries", n: "04", items: industries.map((i) => ({ label: i.name, to: `/for/${i.slug}`, hint: "ex.hint.landing" })) },
  { hKey: "ex.g.journal", n: "05", items: posts.map((p) => ({ label: p.title, to: `/journal/${p.slug}`, hint: p.category })) },
];

export default function Explore() {
  const { t } = useLang();
  const [q, setQ] = useState("");
  // Only the Studio/Company nodes use translation keys as labels; data-driven
  // nodes (cases, industries, journal) carry real text. tt() resolves keys and
  // passes plain text through unchanged.
  const tt = (s: string) => (s.startsWith("ex.") || s.startsWith("link.") ? t(s) : s);
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return groups;
    return groups
      .map((g) => ({ ...g, items: g.items.filter((it) => (tt(it.label) + " " + (it.hint ? tt(it.hint) : "")).toLowerCase().includes(s)) }))
      .filter((g) => g.items.length);
  }, [q, t]);

  const total = groups.reduce((a, g) => a + g.items.length, 0);

  return (
    <div className="bg-paper pt-16">
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-20 pb-10 border-b border-line">
        <SectionLabel index="✦" className="mb-8">{t("ex.eyebrow")}</SectionLabel>
        <h1 className="display text-[clamp(44px,10vw,150px)] font-semibold tracking-tightest">
          <Reveal text={t("ex.h1a")} />
          <span className="italic text-kraft"><Reveal text={t("ex.h1b")} delay={0.15} /></span>
        </h1>
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-3 card-paper px-4 py-3 max-w-md w-full">
            <IconSearch size={16} className="text-ink-faint" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("ex.filterPh")}
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-ink-faint" />
          </div>
          <span className="mono-label text-ink-faint">{total} {t("ex.destinations")}</span>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-16">
        <AnimatePresence mode="popLayout">
          {filtered.map((g) => (
            <motion.div key={g.hKey} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-14">
              <div className="flex items-baseline gap-3 mb-6">
                <span className="mono-label text-kraft">{g.n}</span>
                <h2 className="display text-3xl font-semibold">{t(g.hKey)}</h2>
                <span className="mono-label text-ink-faint">,  {g.items.length}</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {g.items.map((it, i) => (
                  <motion.div key={it.to + it.label} layout
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                    <Link to={it.to} data-cursor-label="GO" className="group card-paper press flex items-center justify-between gap-3 px-5 py-4">
                      <span>
                        <span className="block font-medium text-sm group-hover:text-kraft transition-colors">{tt(it.label)}</span>
                        {it.hint && <span className="mono-label text-ink-faint">{tt(it.hint)}</span>}
                      </span>
                      <IconArrowUpRight size={16} className="opacity-30 group-hover:opacity-100 group-hover:text-kraft group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && <div className="mono-label text-ink-faint text-center py-16">{t("ex.nothing")} "{q}"</div>}
      </section>
    </div>
  );
}
