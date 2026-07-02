import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Reveal, FadeUp, SectionLabel, Counter } from "@/components/primitives";
import { IconArrowUpRight, IconChart, IconDollar, IconUsers, IconEye, IconCursor, IconTarget } from "@/components/icons";
import { useLang } from "@/lib/i18n";

const metrics = [
  { icon: IconChart, to: 3.2, suffix: "×", labelKey: "an.m1.label", subKey: "an.m1.sub" },
  { icon: IconDollar, prefix: "$", to: 2.4, suffix: "M", labelKey: "an.m2.label", subKey: "an.m2.sub" },
  { icon: IconUsers, to: 18, suffix: "k+", labelKey: "an.m3.label", subKey: "an.m3.sub" },
  { icon: IconEye, to: 87, suffix: "%", labelKey: "an.m4.label", subKey: "an.m4.sub" },
  { icon: IconCursor, to: 140, suffix: "%", labelKey: "an.m5.label", subKey: "an.m5.sub" },
  { icon: IconTarget, to: 150, suffix: "+", labelKey: "an.m6.label", subKey: "an.m6.sub" },
];

const tools: [string, string][] = [
  ["GA4", "an.t1.d"],
  ["an.t2.t", "an.t2.d"],
  ["an.t3.t", "an.t3.d"],
  ["an.t4.t", "an.t4.d"],
  ["an.t5.t", "an.t5.d"],
  ["an.t6.t", "an.t6.d"],
];

const bars = [40, 55, 35, 70, 85, 60, 90, 75, 88, 65, 92, 80];

export default function Analytics() {
  const { t, num } = useLang();
  return (
    <div className="bg-paper pt-16">
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-20 pb-14 border-b border-line">
        <SectionLabel index="05" className="mb-8">{t("an.eyebrow")}</SectionLabel>
        <h1 className="display text-[clamp(44px,10vw,150px)] font-semibold tracking-tightest">
          <Reveal text={t("an.h1a")} />
          <span className="italic text-kraft"><Reveal text={t("an.h1b")} delay={0.15} /></span>
        </h1>
        <p className="text-ink-soft text-lg max-w-md leading-relaxed mt-8">
          {t("an.sub")}
        </p>
      </section>

      {/* metrics */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-line">
          {metrics.map((m, i) => (
            <FadeUp key={m.labelKey} delay={(i % 3) * 0.07} className="border-r border-b border-line p-8">
              <m.icon size={28} className="text-kraft mb-6" />
              <div className="display text-[clamp(40px,5vw,68px)] font-semibold leading-none">
                <Counter to={m.to} prefix={m.prefix} suffix={m.suffix} />
              </div>
              <div className="text-sm font-medium mt-3">{t(m.labelKey)}</div>
              <div className="mono-label text-ink-faint mt-1">{t(m.subKey)}</div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* dashboard */}
      <section className="bg-paper-2 border-y border-line py-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <SectionLabel index="·" className="mb-8">{t("an.dashLook")}</SectionLabel>
          <div className="card-paper p-6 sm:p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="display text-2xl font-semibold">{t("an.sitePerf")}</div>
                <div className="mono-label text-ink-faint mt-1">{t("an.last30")}</div>
              </div>
              <div className="flex gap-2">
                <span className="mono-label border border-line px-3 py-1.5 text-ink-faint">{t("an.weekly")}</span>
                <span className="mono-label bg-kraft text-paper px-3 py-1.5">{t("an.monthly")}</span>
              </div>
            </div>
            <div className="flex items-end gap-1.5 sm:gap-3 h-40 mb-8">
              {bars.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{ height: `${h}%`, originY: 1 }}
                  className="flex-1 bg-gradient-to-t from-kraft to-kraft-soft"
                />
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-line border border-line">
              {[["an.sessions", "12,481", "+24%"], ["an.conversions", "423", "+41%"], ["an.revenue", "$18,200", "+67%"], ["an.bounce", "28%", "−12%"]].map(([l, v, c]) => (
                <div key={l} className="bg-paper p-5">
                  <div className="mono-label text-ink-faint mb-2">{t(l)}</div>
                  <div className="display text-2xl font-semibold">{num(v)}</div>
                  <div className="mono-label text-kraft mt-1">{num(c)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* tools */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-24">
        <SectionLabel index="·" className="mb-8">{t("an.stack")}</SectionLabel>
        <div className="grid md:grid-cols-2 border-t border-line">
          {tools.map(([tk, dk], i) => (
            <motion.div key={tk} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="flex gap-6 items-baseline border-b border-line py-7 md:odd:pr-8 md:even:pl-8 md:even:border-l">
              <span className="mono-label text-kraft shrink-0">{num(String(i + 1).padStart(2, "0"))}</span>
              <div>
                <h3 className="display text-2xl font-semibold mb-1">{t(tk)}</h3>
                <p className="text-ink-soft text-sm leading-relaxed">{t(dk)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 pb-24 text-center">
        <Reveal as="h2" text={t("an.seeMove")} className="display text-[clamp(30px,5vw,68px)] font-semibold justify-center mb-8" />
        <Link to="/pricing" data-cursor-label="GO" className="card-paper-kraft press inline-flex items-center gap-2 px-7 py-4 mono-label">
          {t("an.viewPricing")} <IconArrowUpRight size={15} />
        </Link>
      </section>
    </div>
  );
}
