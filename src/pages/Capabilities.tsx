import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, DollarSign, Layers, Target, TrendingUp, Users } from "lucide-react";

const caps = [
  {
    icon: <Layers className="w-8 h-8" />,
    title: "Full-Stack Delivery",
    desc: "Frontend, backend, CMS, hosting, email — we deliver a complete digital solution, not just a design file.",
    color: "#38bdf8",
    detail: ["React / Next.js", "Headless CMS (Sanity, Contentful)", "Node.js APIs", "Vercel / Netlify hosting"],
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Conversion Architecture",
    desc: "Every page is structured to guide visitors toward a specific action. We A/B test until the numbers move.",
    color: "#a78bfa",
    detail: ["Landing page design", "A/B testing setup", "CTA hierarchy", "Heat map analysis"],
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "SEO & Discoverability",
    desc: "Technical SEO, local search, schema markup — we make Google understand and rank your business.",
    color: "#34d399",
    detail: ["Technical SEO audit", "Local SEO (NYC)", "Schema markup", "Core Web Vitals"],
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Rapid Turnaround",
    desc: "First draft in 48 hours. Live site in under 2 weeks. We move fast without cutting corners.",
    color: "#fb923c",
    detail: ["48h first draft", "2-week launch", "Async collaboration", "Revision cycles"],
  },
  {
    icon: <DollarSign className="w-8 h-8" />,
    title: "Transparent Pricing",
    desc: "One flat fee per project. No retainers hidden in small print. You know the cost before we start.",
    color: "#fbbf24",
    detail: ["Flat fee model", "No surprise invoices", "Clear scope", "Payment plans available"],
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Ongoing Partnership",
    desc: "After launch we're still your team. Maintenance plans, updates, and strategy calls are always available.",
    color: "#f472b6",
    detail: ["Monthly maintenance", "Content updates", "Strategy sessions", "Priority support"],
  },
];

function CapabilityCard({ cap, index }: { cap: typeof caps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass rounded-3xl p-7 card-hover group relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at 30% 30%, ${cap.color}08 0%, transparent 70%)` }} />
      <div className="mb-5 w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `${cap.color}15`, color: cap.color }}>
        {cap.icon}
      </div>
      <h3 className="font-barlow font-bold text-white text-xl mb-3">{cap.title}</h3>
      <p className="text-white/55 font-barlow text-sm leading-relaxed mb-5">{cap.desc}</p>
      <div className="flex flex-wrap gap-2">
        {cap.detail.map((d) => (
          <span key={d} className="text-xs font-barlow px-2.5 py-1 rounded-full border" style={{ borderColor: `${cap.color}30`, color: cap.color }}>
            {d}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Capabilities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <div className="bg-black text-white pt-28">
      {/* Hero */}
      <section className="relative px-4 pb-20 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-[clamp(36px,7vw,84px)] font-bold leading-[0.92] tracking-[-0.03em] mb-6"
          >
            What we bring<br />
            <span className="gradient-text italic">to the table.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/60 font-barlow text-lg max-w-xl mx-auto"
          >
            Six core capabilities that turn a web project into a revenue driver.
          </motion.p>
        </div>

        {/* Floating parallax orb */}
        <motion.div style={{ y }} className="absolute top-0 right-10 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Capabilities grid */}
      <section ref={containerRef} className="px-4 pb-24">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {caps.map((c, i) => <CapabilityCard key={c.title} cap={c} index={i} />)}
        </div>
      </section>

      {/* Timeline / Niches section */}
      <section className="px-4 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="glass rounded-3xl p-10">
            <h2 className="font-display text-[clamp(24px,4vw,44px)] font-bold text-white mb-2 text-center">Industry verticals</h2>
            <p className="text-white/50 font-barlow text-center mb-10">We go deep on specific industries so you get real expertise, not a generalist template.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[
                ["🍕", "Restaurants"],
                ["🦷", "Dental Practices"],
                ["💪", "Gyms & Studios"],
                ["💅", "Salons & Spas"],
                ["⚖️", "Law Firms"],
                ["🏠", "Real Estate"],
                ["🏥", "Medical Clinics"],
                ["🎓", "Schools & Tutors"],
                ["🛒", "E-commerce"],
                ["🔧", "Home Services"],
                ["🎨", "Creative Agencies"],
                ["🍸", "Bars & Nightlife"],
              ].map(([emoji, name]) => (
                <div key={name as string} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/8 transition-colors">
                  <span className="text-xl">{emoji}</span>
                  <span className="font-barlow text-sm text-white/70">{name as string}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
