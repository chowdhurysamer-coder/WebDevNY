import { motion } from "framer-motion";
import { BarChart2, TrendingUp, DollarSign, Users, Eye, MousePointer, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Link } from "react-router-dom";

const metrics = [
  { label: "Avg Traffic Lift", value: "3.2×", icon: <TrendingUp className="w-5 h-5" />, color: "#34d399", desc: "Within 90 days of launch" },
  { label: "Revenue Attribution", value: "$2.4M", icon: <DollarSign className="w-5 h-5" />, color: "#fbbf24", desc: "Tracked across client sites" },
  { label: "Leads Generated", value: "18k+", icon: <Users className="w-5 h-5" />, color: "#38bdf8", desc: "In the last 12 months" },
  { label: "Avg Session Duration", value: "+87%", icon: <Eye className="w-5 h-5" />, color: "#a78bfa", desc: "Vs. industry benchmark" },
  { label: "Conversion Rate Lift", value: "+140%", icon: <MousePointer className="w-5 h-5" />, color: "#f472b6", desc: "Avg across all clients" },
  { label: "Sites Monitored", value: "150+", icon: <BarChart2 className="w-5 h-5" />, color: "#fb923c", desc: "Real-time dashboards" },
];

const tools = [
  { name: "Google Analytics 4", desc: "Full funnel tracking and audience insights", icon: "📊" },
  { name: "Hotjar / Heatmaps", desc: "See exactly where users click, scroll, and drop off", icon: "🗺️" },
  { name: "Search Console", desc: "Keyword rankings, impressions, and indexing health", icon: "🔍" },
  { name: "Custom Dashboards", desc: "Monthly reports delivered straight to your inbox", icon: "📧" },
  { name: "Conversion Tracking", desc: "Calls, forms, purchases — every lead tracked", icon: "🎯" },
  { name: "A/B Testing", desc: "Test headlines, CTAs, and layouts against real traffic", icon: "⚗️" },
];

function CountUp({ value, color }: { value: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="font-display text-4xl font-bold"
      style={{ color }}
    >
      {value}
    </motion.div>
  );
}

export default function Analytics() {
  return (
    <div className="bg-black text-white pt-28">
      {/* Hero */}
      <section className="px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-[clamp(36px,7vw,84px)] font-bold leading-[0.92] tracking-[-0.03em] mb-6"
          >
            Data that drives<br />
            <span className="gradient-text italic">decisions.</span>
          </motion.h1>
          <p className="text-white/60 font-barlow text-lg max-w-xl">
            We don't just build sites — we track, measure, and optimize them. Every WebDev NY site ships with a full analytics foundation.
          </p>
        </div>
      </section>

      {/* Metrics grid */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-6 card-hover"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${m.color}15`, color: m.color }}>
                  {m.icon}
                </div>
                <span className="text-white/50 font-barlow text-sm">{m.label}</span>
              </div>
              <CountUp value={m.value} color={m.color} />
              <p className="text-white/30 font-barlow text-xs mt-2">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Fake dashboard visualization */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-6 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-barlow font-semibold text-white">Site Performance Dashboard</h3>
                <p className="text-white/40 font-barlow text-xs">Last 30 days</p>
              </div>
              <div className="flex gap-2">
                <span className="text-xs font-barlow glass px-3 py-1 rounded-full text-white/60">Weekly</span>
                <span className="text-xs font-barlow bg-sky-400 text-black px-3 py-1 rounded-full font-semibold">Monthly</span>
              </div>
            </div>

            {/* Fake bar chart */}
            <div className="flex items-end gap-2 h-32 mb-4">
              {[40,55,35,70,85,60,90,75,88,65,92,80].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  style={{ height: `${h}%`, originY: 1 }}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-sky-500/60 to-sky-400/20 min-w-0"
                />
              ))}
            </div>
            <div className="grid grid-cols-4 gap-4 pt-4 border-t border-white/5">
              {[["Sessions", "12,481", "+24%"], ["Conversions", "423", "+41%"], ["Revenue", "$18,200", "+67%"], ["Bounce Rate", "28%", "-12%"]].map(([l, v, c]) => (
                <div key={l as string}>
                  <div className="text-white/40 font-barlow text-xs mb-1">{l as string}</div>
                  <div className="font-barlow font-bold text-white text-lg">{v as string}</div>
                  <div className={`font-barlow text-xs ${(c as string).startsWith("+") ? "text-green-400" : "text-red-400"}`}>{c as string}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tools */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-[clamp(24px,4vw,44px)] font-bold text-white mb-3 text-center">The analytics stack</h2>
          <p className="text-white/50 font-barlow text-center mb-12">Tools we set up, configure, and hand off with every project.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="glass rounded-2xl p-5 flex gap-4 card-hover"
              >
                <span className="text-2xl">{t.icon}</span>
                <div>
                  <div className="font-barlow font-semibold text-white text-sm mb-1">{t.name}</div>
                  <div className="text-white/50 font-barlow text-xs leading-relaxed">{t.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="max-w-3xl mx-auto glass rounded-3xl p-10 text-center">
          <h2 className="font-display text-[clamp(24px,4vw,44px)] font-bold text-white mb-4">See your numbers move.</h2>
          <p className="text-white/60 font-barlow mb-8">Every site we build includes analytics setup and a 30-day performance check-in.</p>
          <Link to="/pricing" className="inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full font-barlow font-semibold hover:bg-sky-100 transition-colors">
            View Pricing <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
