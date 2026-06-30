import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Reveal, FadeUp, SectionLabel, Counter } from "@/components/primitives";
import { IconArrowUpRight, IconChart, IconDollar, IconUsers, IconEye, IconCursor, IconTarget } from "@/components/icons";

const metrics = [
  { icon: IconChart, to: 3.2, suffix: "×", label: "Avg traffic lift", sub: "within 90 days of launch" },
  { icon: IconDollar, prefix: "$", to: 2.4, suffix: "M", label: "Revenue attributed", sub: "tracked across client sites" },
  { icon: IconUsers, to: 18, suffix: "k+", label: "Leads generated", sub: "in the last 12 months" },
  { icon: IconEye, to: 87, suffix: "%", label: "Longer sessions", sub: "vs. industry benchmark" },
  { icon: IconCursor, to: 140, suffix: "%", label: "Conversion lift", sub: "average across clients" },
  { icon: IconTarget, to: 150, suffix: "+", label: "Sites monitored", sub: "real-time dashboards" },
];

const tools = [
  ["GA4", "Full-funnel tracking and audience insight, configured properly — not just a pasted snippet."],
  ["Heatmaps", "See exactly where visitors click, scroll, and quietly give up."],
  ["Search Console", "Keyword rankings, impressions, and indexing health, reviewed monthly."],
  ["Dashboards", "A plain-English report in your inbox every month. No jargon, just what moved."],
  ["Conversion tracking", "Calls, forms, and purchases — every lead tied back to its source."],
  ["A/B testing", "Headlines, CTAs, and layouts tested against real traffic, not opinions."],
];

const bars = [40, 55, 35, 70, 85, 60, 90, 75, 88, 65, 92, 80];

export default function Analytics() {
  return (
    <div className="bg-paper pt-16">
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-20 pb-14 border-b border-line">
        <SectionLabel index="05" className="mb-8">Analytics & Billables</SectionLabel>
        <h1 className="display text-[clamp(44px,10vw,150px)] font-semibold tracking-tightest">
          <Reveal text="Data that drives" />
          <span className="italic text-kraft"><Reveal text="decisions." delay={0.15} /></span>
        </h1>
        <p className="text-ink-soft text-lg max-w-md leading-relaxed mt-8">
          We don't just build sites — we measure them. Every WebDev NY build ships with a real analytics foundation, so growth is something you can see.
        </p>
      </section>

      {/* metrics */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-line">
          {metrics.map((m, i) => (
            <FadeUp key={m.label} delay={(i % 3) * 0.07} className="border-r border-b border-line p-8">
              <m.icon size={28} className="text-kraft mb-6" />
              <div className="display text-[clamp(40px,5vw,68px)] font-semibold leading-none">
                <Counter to={m.to} prefix={m.prefix} suffix={m.suffix} />
              </div>
              <div className="text-sm font-medium mt-3">{m.label}</div>
              <div className="mono-label text-ink-faint mt-1">{m.sub}</div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* dashboard */}
      <section className="bg-ink text-paper py-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <SectionLabel index="·" className="text-paper/60 mb-8">A look inside the dashboard</SectionLabel>
          <div className="border border-paper/15 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="display text-2xl font-semibold text-paper">Site Performance</div>
                <div className="mono-label text-paper/40 mt-1">Last 30 days</div>
              </div>
              <div className="flex gap-2">
                <span className="mono-label border border-paper/20 px-3 py-1.5 text-paper/50">Weekly</span>
                <span className="mono-label bg-kraft text-paper px-3 py-1.5">Monthly</span>
              </div>
            </div>
            <div className="flex items-end gap-1.5 sm:gap-3 h-40 mb-8">
              {bars.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{ height: `${h}%`, originY: 1 }}
                  className="flex-1 bg-kraft"
                />
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-paper/10 border border-paper/10">
              {[["Sessions", "12,481", "+24%"], ["Conversions", "423", "+41%"], ["Revenue", "$18,200", "+67%"], ["Bounce", "28%", "−12%"]].map(([l, v, c]) => (
                <div key={l} className="bg-ink p-5">
                  <div className="mono-label text-paper/40 mb-2">{l}</div>
                  <div className="display text-2xl font-semibold text-paper">{v}</div>
                  <div className="mono-label text-kraft mt-1">{c}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* tools */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-24">
        <SectionLabel index="·" className="mb-8">The stack we set up</SectionLabel>
        <div className="grid md:grid-cols-2 border-t border-line">
          {tools.map(([t, d], i) => (
            <motion.div key={t} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="flex gap-6 items-baseline border-b border-line py-7 md:odd:pr-8 md:even:pl-8 md:even:border-l">
              <span className="mono-label text-kraft shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="display text-2xl font-semibold mb-1">{t}</h3>
                <p className="text-ink-soft text-sm leading-relaxed">{d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 pb-24 text-center">
        <Reveal as="h2" text="See your numbers move." className="display text-[clamp(30px,5vw,68px)] font-semibold justify-center mb-8" />
        <Link to="/pricing" data-cursor-label="GO" className="card-paper-kraft press inline-flex items-center gap-2 px-7 py-4 mono-label">
          View pricing <IconArrowUpRight size={15} />
        </Link>
      </section>
    </div>
  );
}
