import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Aurora } from "@/components/Aurora";
import { SiteMock } from "@/components/SiteMock";
import { Reveal, FadeUp, SectionLabel, Marquee, Magnetic, Counter, Parallax, TiltCard } from "@/components/primitives";
import { WordmarkMarquee, TapeStrip } from "@/components/flourishes";
import { IconArrowUpRight, IconArrow } from "@/components/icons";
import { useLang } from "@/lib/i18n";

const stats = [
  { to: 150, suffix: "+", key: "home.stat.sites" },
  { to: 98, suffix: "%", key: "home.stat.retention" },
  { to: 3.2, suffix: "×", key: "home.stat.lift" },
  { to: 11, suffixKey: "home.stat.days", key: "home.stat.launch" },
];

const services = [
  { n: "01", tKey: "home.svc.webdesign", dKey: "home.svc.webdesign.d", to: "/web-design" },
  { n: "02", tKey: "term.development", dKey: "home.svc.dev.d", to: "/web-design" },
  { n: "03", tKey: "home.svc.seo", dKey: "home.svc.seo.d", to: "/capabilities" },
  { n: "04", tKey: "term.analytics", dKey: "home.svc.analytics.d", to: "/analytics" },
];

const niches: { key: string; to?: string }[] = [
  { key: "term.restaurants", to: "/for/restaurants" },
  { key: "term.dental", to: "/for/dentists" },
  { key: "term.fitness", to: "/for/gyms" },
  { key: "term.salons", to: "/for/salons" },
  { key: "term.legal", to: "/for/lawyers" },
  { key: "term.realestate", to: "/for/real-estate" },
  { key: "term.medical" }, { key: "term.ecommerce" }, { key: "term.homeservices" }, { key: "term.hospitality" },
];

export default function Home() {
  const { t, num } = useLang();
  return (
    <div className="bg-paper">
      {/* ───────── HERO ───────── */}
      <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden">
        <Aurora className="aurora absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 dotgrid opacity-40 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgb(var(--c-paper) / 0.55) 0%, rgb(var(--c-paper) / 0.15) 30%, rgb(var(--c-paper) / 0.4) 62%, rgb(var(--c-paper) / 0.9) 100%)" }} />

        <div className="relative max-w-[1400px] w-full mx-auto px-5 sm:px-8 pb-14 pt-32">
          <div className="flex items-center justify-between mb-8">
            <SectionLabel index="00">{t("hero.eyebrow")}</SectionLabel>
            <span className="mono-label text-ink-soft hidden sm:block">{num("Est. 2025")}</span>
          </div>

          <h1 className="display text-[clamp(48px,12vw,180px)] font-semibold tracking-tightest">
            <Reveal key={t("home.hlA")} text={t("home.hlA")} />
            <span className="flex flex-wrap italic text-sunset">
              <Reveal key={t("home.hlB")} text={t("home.hlB")} delay={0.2} />
            </span>
          </h1>

          <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.7 }}
              className="text-ink-soft text-lg max-w-md leading-relaxed">
              {t("hero.sub")}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.7 }} className="flex items-center gap-4">
              <Magnetic>
                <Link to="/contact" data-cursor-label="GO" className="card-paper-kraft press inline-flex items-center gap-2 px-6 py-4 mono-label">
                  {t("hero.start")} <IconArrowUpRight size={15} />
                </Link>
              </Magnetic>
              <Link to="/portfolio" className="inline-flex items-center gap-2 mono-label text-ink hover:text-kraft transition-colors link-draw">
                {t("hero.work")} <IconArrow size={15} />
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }} className="w-px h-10 bg-ink/40" />
        </motion.div>
      </section>

      {/* ───────── MARQUEE ───────── */}
      <section className="border-y border-ink bg-kraft text-paper py-5">
        <Marquee items={[t("term.design"), t("term.development"), t("term.seo"), t("term.analytics"), t("term.branding"), t("term.maintenance")]} />
      </section>

      {/* ───────── STATS ───────── */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-20 grid grid-cols-2 lg:grid-cols-4 border-b border-line">
        {stats.map((s, i) => (
          <FadeUp key={s.key} delay={i * 0.08} className={`px-2 py-6 ${i !== 0 ? "lg:border-l border-line" : ""}`}>
            <div className="display text-[clamp(44px,7vw,84px)] font-semibold leading-none">
              <Counter to={s.to} suffix={s.suffix ?? t(s.suffixKey!)} />
            </div>
            <div className="mono-label text-ink-faint mt-3">{t(s.key)}</div>
          </FadeUp>
        ))}
      </section>

      {/* ───────── TRUSTED BY ───────── */}
      <section className="py-12 border-b border-line overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 mb-6">
          <SectionLabel index="·">{t("hero.trusted")}</SectionLabel>
        </div>
        <WordmarkMarquee />
      </section>

      {/* ───────── SERVICES ───────── */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <SectionLabel index="01" className="mb-5">{t("home.what")}</SectionLabel>
            <Reveal as="h2" text={t("home.studioNotFactory")} className="display text-[clamp(32px,5.5vw,72px)] font-semibold" />
          </div>
          <p className="text-ink-soft max-w-sm">{t("home.disciplines")}</p>
        </div>

        <div className="border-t border-ink">
          {services.map((s, i) => (
            <motion.div key={s.n} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link to={s.to} className="group grid grid-cols-1 md:grid-cols-[80px_1fr_1.2fr_auto] gap-4 md:gap-8 items-baseline border-b border-line py-7 hover:bg-paper-2 transition-colors -mx-3 px-3">
                <span className="mono-label text-kraft">{num(s.n)}</span>
                <h3 className="display text-[clamp(28px,3.5vw,46px)] font-semibold group-hover:text-kraft transition-colors">{t(s.tKey)}</h3>
                <p className="text-ink-soft text-sm leading-relaxed max-w-md">{t(s.dKey)}</p>
                <IconArrowUpRight size={24} className="justify-self-end opacity-30 group-hover:opacity-100 group-hover:text-kraft group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ───────── SELECTED WORK (light) ───────── */}
      <section className="py-24 overflow-hidden border-y border-line bg-paper-2 relative">
        <TapeStrip label={num(t("misc.selectedWork2025"))} className="absolute top-6 left-1/2 -translate-x-1/2" />
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 mt-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <SectionLabel index="02" className="mb-5">{t("home.selectedWork")}</SectionLabel>
              <Reveal as="h2" text={t("home.builtForReal")} className="display text-[clamp(30px,5vw,64px)] font-semibold" />
            </div>
            <Link to="/portfolio" className="hidden sm:inline-flex items-center gap-2 mono-label text-ink hover:text-kraft transition-colors">
              {t("cta.allProjects")} <IconArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        <Parallax speed={0.12}>
          <div className="flex gap-6 px-5 sm:px-8 overflow-x-auto pb-4 max-w-[1400px] mx-auto" style={{ scrollbarWidth: "none" }}>
            {(["restaurant", "dental", "gym", "legal"] as const).map((v, i) => (
              <FadeUp key={v} delay={i * 0.1} className="shrink-0 w-[300px] sm:w-[380px]">
                <TiltCard>
                  <div className="card-paper overflow-hidden">
                    <SiteMock variant={v} className="w-full" />
                  </div>
                </TiltCard>
                <div className="flex items-center justify-between mt-4 mono-label text-ink-soft">
                  <span>{["Trattoria", "BrightSmile", "IronWorks", "Park Ave Legal"][i]}</span>
                  <span>{num(`0${i + 1}`)}</span>
                </div>
              </FadeUp>
            ))}
          </div>
        </Parallax>
      </section>

      {/* ───────── NICHES ───────── */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-24">
        <SectionLabel index="03" className="mb-6">{t("home.industriesCold")}</SectionLabel>
        <div className="flex flex-wrap gap-3">
          {niches.map((n, i) => (
            <motion.div key={n.key}
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
              {n.to ? (
                <Link to={n.to} data-cursor-label="OPEN" className="card-paper press px-5 py-3 mono-label flex items-center gap-2 group">
                  {t(n.key)} <IconArrowUpRight size={13} className="opacity-40 group-hover:opacity-100 group-hover:text-kraft transition-all" />
                </Link>
              ) : (
                <span className="card-paper px-5 py-3 mono-label inline-block opacity-70 cursor-default">{t(n.key)}</span>
              )}
            </motion.div>
          ))}
        </div>
        <p className="text-ink-soft max-w-lg mt-8">
          {t("home.nichesNote")}
        </p>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 pb-28">
        <div className="card-paper-kraft p-10 sm:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="relative">
            <SectionLabel index="·" className="justify-center text-paper/80 mb-6">{t("home.readyWhen")}</SectionLabel>
            <Reveal as="h2" text={t("home.boxWorthOpening")} className="display text-[clamp(32px,5.5vw,76px)] font-semibold justify-center text-center max-w-3xl mx-auto" />
            <Magnetic className="mt-10 inline-block">
              <Link to="/contact" data-cursor-label="GO" className="inline-flex items-center gap-2 bg-ink text-paper px-8 py-4 mono-label press">
                {t("cta.bookCall")} <IconArrowUpRight size={15} />
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>
    </div>
  );
}
