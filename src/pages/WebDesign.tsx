import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Code2, Smartphone, Zap, Palette, Lock, BarChart2 } from "lucide-react";

const services = [
  { icon: <Code2 className="w-6 h-6" />, title: "Custom Development", desc: "Hand-coded React & Next.js sites — no templates, no page builders. Every pixel is intentional." },
  { icon: <Smartphone className="w-6 h-6" />, title: "Mobile-First Design", desc: "Designed for thumbs before mice. Your site looks flawless on every screen size." },
  { icon: <Zap className="w-6 h-6" />, title: "Performance Obsessed", desc: "Sub-2s load times, 95+ Lighthouse scores. Speed is a competitive advantage." },
  { icon: <Palette className="w-6 h-6" />, title: "Brand-Led Visual Design", desc: "We translate your brand into a digital experience that makes people stop scrolling." },
  { icon: <Lock className="w-6 h-6" />, title: "Security Built In", desc: "SSL, HTTPS, GDPR-ready forms, and safe hosting — security isn't optional." },
  { icon: <BarChart2 className="w-6 h-6" />, title: "Analytics & Tracking", desc: "GA4, Hotjar, conversion events — you'll know exactly what's working." },
];

const process = [
  { num: "01", title: "Discovery", desc: "We learn your business, your customers, and what success looks like for you." },
  { num: "02", title: "Design", desc: "High-fidelity mockups that look like the finished product — you approve before we write a line of code." },
  { num: "03", title: "Build", desc: "React-based development with Tailwind CSS, optimized for performance and SEO from day one." },
  { num: "04", title: "Launch", desc: "We handle DNS, hosting, and go-live. You get a turnkey handoff with full training." },
];

export default function WebDesign() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="bg-black text-white pt-28">
      {/* Hero */}
      <section ref={heroRef} className="relative px-4 pb-24 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}}
            className="text-sky-400 font-barlow text-sm uppercase tracking-widest mb-4"
          >
            Web Design & Development
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(36px,7vw,88px)] font-bold leading-[0.92] tracking-[-0.03em] mb-8"
          >
            Websites that work<br />
            <span className="gradient-text italic">as hard as you do.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-white/60 font-barlow text-lg max-w-xl"
          >
            We don't just make sites look good — we engineer them to drive real business outcomes for New York companies.
          </motion.p>
        </div>

        {/* Background accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Services grid */}
      <section className="px-4 pb-24">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl p-6 card-hover"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-400/10 flex items-center justify-center text-sky-400 mb-4">
                {s.icon}
              </div>
              <h3 className="font-barlow font-semibold text-white text-lg mb-2">{s.title}</h3>
              <p className="text-white/50 font-barlow text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="px-4 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-[clamp(28px,4vw,48px)] font-bold text-white mb-3">Our process</h2>
            <p className="text-white/50 font-barlow">From first call to live site — here's how it works.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {process.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 relative overflow-hidden card-hover"
              >
                <div className="gradient-text font-display text-6xl font-bold opacity-20 absolute -top-2 -right-2">{p.num}</div>
                <div className="gradient-text font-display text-3xl font-bold mb-3">{p.num}</div>
                <h3 className="font-barlow font-semibold text-white mb-2">{p.title}</h3>
                <p className="text-white/50 font-barlow text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video showcase */}
      <section className="px-4 pb-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden relative aspect-video glass"
          >
            <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60">
              <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <h3 className="font-display text-[clamp(24px,4vw,56px)] font-bold text-white mb-4">See it in action</h3>
              <Link to="/portfolio" className="flex items-center gap-2 glass-strong px-6 py-3 rounded-full font-barlow font-semibold text-white hover:bg-white/20 transition-all">
                View Portfolio <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
