import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, FadeUp, SectionLabel } from "@/components/primitives";
import { SiteMock } from "@/components/SiteMock";
import { IconArrowUpRight, IconStar } from "@/components/icons";
import { useLang } from "@/lib/i18n";

type V = "restaurant" | "dental" | "gym" | "salon" | "legal" | "realestate";

const projects: { id: string; slug: string; v: V; name: string; cat: string; catKey: string; year: string; blurbKey: string; resultKey: string }[] = [
  { id: "01", slug: "trattoria-bella", v: "restaurant", name: "Trattoria Bella", cat: "Restaurant", catKey: "pf.cat.restaurant", year: "'25", blurbKey: "pf.blurb.restaurant", resultKey: "pf.result.restaurant" },
  { id: "02", slug: "brightsmile-dental", v: "dental", name: "BrightSmile Dental", cat: "Dental", catKey: "pf.cat.dental", year: "'25", blurbKey: "pf.blurb.dental", resultKey: "pf.result.dental" },
  { id: "03", slug: "ironworks-gym", v: "gym", name: "IronWorks Gym", cat: "Fitness", catKey: "pf.cat.fitness", year: "'24", blurbKey: "pf.blurb.gym", resultKey: "pf.result.gym" },
  { id: "04", slug: "maison-salon", v: "salon", name: "Maison Salon", cat: "Beauty", catKey: "pf.cat.beauty", year: "'25", blurbKey: "pf.blurb.salon", resultKey: "pf.result.salon" },
  { id: "05", slug: "park-ave-legal", v: "legal", name: "Park Ave Legal", cat: "Legal", catKey: "pf.cat.legal", year: "'24", blurbKey: "pf.blurb.legal", resultKey: "pf.result.legal" },
  { id: "06", slug: "hudson-realty", v: "realestate", name: "Hudson Realty", cat: "Real Estate", catKey: "pf.cat.realestate", year: "'25", blurbKey: "pf.blurb.realestate", resultKey: "pf.result.realestate" },
];

const reviews = [
  { name: "Maria S.", biz: "Trattoria Bella", textKey: "pf.review1" },
  { name: "Dr. James K.", biz: "BrightSmile Dental", textKey: "pf.review2" },
  { name: "Tony R.", biz: "IronWorks Gym", textKey: "pf.review3" },
];

const SORTS = ["Newest", "Oldest", "A–Z"] as const;
type Sort = typeof SORTS[number];
const SORT_KEYS: Record<Sort, string> = { "Newest": "pf.newest", "Oldest": "pf.oldest", "A–Z": "pf.az" };

export default function Portfolio() {
  const { t } = useLang();
  const [active, setActive] = useState<typeof projects[0] | null>(null);
  const [cat, setCat] = useState<string>("All");
  const [sort, setSort] = useState<Sort>("Newest");

  const cats = ["All", ...Array.from(new Set(projects.map((p) => p.cat)))];
  const catLabel = (c: string) => (c === "All" ? t("pf.all") : t(projects.find((p) => p.cat === c)!.catKey));
  const shown = projects
    .filter((p) => cat === "All" || p.cat === cat)
    .sort((a, b) => {
      if (sort === "A–Z") return a.name.localeCompare(b.name);
      const ay = +a.year.replace(/\D/g, ""), by = +b.year.replace(/\D/g, "");
      return sort === "Newest" ? by - ay || +b.id - +a.id : ay - by || +a.id - +b.id;
    });

  return (
    <div className="bg-paper pt-16">
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-20 pb-14 border-b border-line">
        <SectionLabel index="03" className="mb-8">{t("pf.eyebrow")}</SectionLabel>
        <h1 className="display text-[clamp(44px,10vw,150px)] font-semibold tracking-tightest">
          <Reveal text={t("pf.h1a")} />
          <span className="italic text-kraft"><Reveal text={t("pf.h1b")} delay={0.15} /></span>
        </h1>
        <p className="text-ink-soft text-lg max-w-md leading-relaxed mt-8">
          {t("pf.sub")}
        </p>
      </section>

      {/* filter + sort bar */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button key={c} onClick={() => setCat(c)} data-cursor-label="FILTER"
                className={`mono-label px-4 py-2 border transition-all ${cat === c ? "bg-ink text-paper border-ink" : "border-line hover:border-ink text-ink-soft"}`}>
                {catLabel(c)}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="mono-label text-ink-faint">{t("pf.sort")}</span>
            {SORTS.map((s) => (
              <button key={s} onClick={() => setSort(s)} data-cursor-label="SORT"
                className={`mono-label px-3 py-2 border transition-all ${sort === s ? "bg-kraft text-paper border-kraft" : "border-line hover:border-ink text-ink-soft"}`}>
                {t(SORT_KEYS[s])}
              </button>
            ))}
          </div>
        </div>
        <div className="mono-label text-ink-faint mt-4">{shown.length} {shown.length !== 1 ? t("pf.projects") : t("pf.project")}</div>
      </section>

      {/* catalog grid */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-12">
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <motion.button
                key={p.id} layout
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActive(p)} data-cursor-label="VIEW" className="group text-left w-full">
                <div className="card-paper press overflow-hidden">
                  <SiteMock variant={p.v} className="w-full" />
                  <div className="flex items-center justify-between px-4 py-3 border-t border-line">
                    <span className="mono-label text-ink-soft">{t(p.catKey)}</span>
                    {/* desktop: hover-reveal arrow (unchanged) */}
                    <IconArrowUpRight size={16} className="no-touch text-kraft opacity-0 group-hover:opacity-100 transition-opacity" />
                    {/* touch: persistent "View" cue so the tile reads as tappable */}
                    <span className="touch-cta items-center gap-1.5 mono-label text-kraft">{t("pf.view")} <IconArrowUpRight size={14} /></span>
                  </div>
                </div>
                <div className="flex items-baseline justify-between mt-3">
                  <h3 className="display text-xl font-semibold group-hover:text-kraft transition-colors">{p.name}</h3>
                  <span className="mono-label text-ink-faint">{p.id}, {p.year}</span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* reviews */}
      <section className="bg-paper-2 border-y border-line py-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <SectionLabel index="·" className="mb-6">{t("pf.clientsSay")}</SectionLabel>
          <Reveal as="h2" text={t("pf.dontTake")} className="display text-[clamp(30px,5vw,64px)] font-semibold mb-12" />
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <FadeUp key={r.name} delay={i * 0.1} className="card-paper p-8">
                <div className="flex gap-1 text-kraft mb-5">{[...Array(5)].map((_, j) => <IconStar key={j} size={15} />)}</div>
                <p className="text-ink-soft leading-relaxed mb-6 display text-lg italic">"{t(r.textKey)}"</p>
                <div className="mono-label text-ink-faint">{r.name} · {r.biz}</div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-24 text-center">
        <Reveal as="h2" text={t("pf.next")} className="display text-[clamp(30px,5vw,68px)] font-semibold justify-center mb-8" />
        <Link to="/contact" data-cursor-label="GO" className="card-paper-kraft press inline-flex items-center gap-2 px-7 py-4 mono-label">
          {t("cta.start")} <IconArrowUpRight size={15} />
        </Link>
      </section>

      {/* detail modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={() => setActive(null)} />
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 26 }}
              className="relative card-paper w-full max-w-3xl max-h-[88vh] overflow-auto"
            >
              <div className="grid md:grid-cols-2">
                <SiteMock variant={active.v} className="w-full md:h-full" />
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <span className="mono-label text-kraft">{t(active.catKey)} · {active.year}</span>
                    <button onClick={() => setActive(null)} data-cursor-label="CLOSE" className="mono-label border border-line px-3 py-1.5 hover:bg-ink hover:text-paper transition-colors">{t("pf.close")} ✕</button>
                  </div>
                  <h3 className="display text-4xl font-semibold mb-4">{active.name}</h3>
                  <p className="text-ink-soft leading-relaxed mb-8">{t(active.blurbKey)}</p>
                  <div className="card-paper-kraft p-5">
                    <div className="mono-label text-paper/80 mb-1">{t("pf.outcome")}</div>
                    <div className="display text-2xl font-semibold">{t(active.resultKey)}</div>
                  </div>
                  <Link to={`/work/${active.slug}`} data-cursor-label="OPEN" className="mt-8 card-paper-kraft press inline-flex items-center gap-2 px-5 py-3 mono-label">
                    {t("pf.readCase")} <IconArrowUpRight size={15} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
