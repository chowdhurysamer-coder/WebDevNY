import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Zap, Globe, TrendingUp, Star } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { value: "150+", label: "Sites Launched" },
  { value: "98%", label: "Client Retention" },
  { value: "3×", label: "Avg Traffic Lift" },
  { value: "<48h", label: "First Draft" },
];

const niches = [
  { icon: "🍕", label: "Restaurants" },
  { icon: "🦷", label: "Dentists" },
  { icon: "💪", label: "Gyms & Fitness" },
  { icon: "💅", label: "Salons & Spas" },
  { icon: "⚖️", label: "Law Firms" },
  { icon: "🏠", label: "Real Estate" },
  { icon: "🏥", label: "Medical" },
  { icon: "🎓", label: "Education" },
];

function WordPullUp({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className={`flex flex-wrap gap-x-[0.25em] ${className}`}>
      {text.split(" ").map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {w}
        </motion.span>
      ))}
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true });

  return (
    <div className="bg-black text-white">
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video BG */}
        <motion.div style={{ y: yParallax, opacity: opacityFade }} className="absolute inset-0">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-40">
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260228_065522_522e2295-ba22-457e-8fdb-fbcd68109c73.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black" />
        </motion.div>

        {/* Noise */}
        <div className="noise-overlay absolute inset-0 pointer-events-none" />

        {/* Hero copy */}
        <div className="relative z-10 text-center px-4 pt-28 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-barlow text-white/70 mb-8 uppercase tracking-widest"
          >
            <Zap className="w-3 h-3 text-sky-400" />
            Web Design Studio — New York
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(42px,8vw,100px)] font-bold leading-[0.92] tracking-[-0.03em] mb-6"
          >
            <span className="text-white">We build websites</span>
            <br />
            <span className="gradient-text italic">that convert.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-white/60 text-lg font-barlow max-w-xl mx-auto mb-10"
          >
            Custom-built sites for New York businesses. Fast, beautiful, and engineered to turn visitors into customers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link to="/contact" className="flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full font-barlow font-semibold text-[15px] hover:bg-sky-100 transition-colors">
              Start Your Project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/portfolio" className="flex items-center gap-2 glass px-7 py-3.5 rounded-full font-barlow font-medium text-[15px] text-white/80 hover:text-white hover:bg-white/10 transition-all">
              View Our Work
            </Link>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-0.5 h-12 bg-gradient-to-b from-white/40 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} className="py-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 text-center card-hover"
            >
              <div className="gradient-text font-display text-4xl font-bold mb-1">{s.value}</div>
              <div className="text-white/50 text-sm font-barlow">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* NICHES */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <WordPullUp text="We specialize in your industry." className="font-display text-[clamp(28px,4vw,48px)] font-bold justify-center text-white mb-4" />
            <p className="text-white/50 font-barlow">Deep knowledge in verticals that matter to New York businesses.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {niches.map((n, i) => (
              <motion.div
                key={n.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-5 flex flex-col items-center gap-3 cursor-default card-hover"
              >
                <span className="text-3xl">{n.icon}</span>
                <span className="text-white/80 font-barlow text-sm font-medium">{n.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO SECTION */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <WordPullUp text="Built to rank. Built to last." className="font-display text-[clamp(28px,4vw,48px)] font-bold text-white mb-6" />
            <p className="text-white/60 font-barlow text-lg mb-8">
              Every site we ship comes with structured data, Core Web Vitals optimization, and on-page SEO baked in — not bolted on.
            </p>
            <div className="flex flex-col gap-3">
              {["Technical SEO foundation", "Google Business Profile integration", "Local SEO for NYC boroughs", "Monthly performance reports"].map((f, i) => (
                <motion.div
                  key={f}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 text-white/70 font-barlow"
                >
                  <Star className="w-4 h-4 text-sky-400 shrink-0" />
                  {f}
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass rounded-3xl overflow-hidden aspect-square relative"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Globe className="w-16 h-16 text-sky-400 mx-auto mb-4 opacity-60" />
                <div className="font-display text-5xl font-bold gradient-text">SEO</div>
                <div className="text-white/40 font-barlow text-sm mt-2">Search Engine Optimized</div>
              </div>
            </div>
            {/* Orbital rings */}
            {[1, 2, 3].map((r) => (
              <motion.div
                key={r}
                className="absolute border border-sky-400/10 rounded-full"
                style={{ inset: `${r * 15}%` }}
                animate={{ rotate: 360 * (r % 2 === 0 ? 1 : -1) }}
                transition={{ duration: 8 + r * 4, repeat: Infinity, ease: "linear" }}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass rounded-3xl p-12 text-center glow-blue"
        >
          <TrendingUp className="w-10 h-10 text-sky-400 mx-auto mb-5" />
          <h2 className="font-display text-[clamp(28px,4vw,52px)] font-bold text-white mb-4">Ready to grow online?</h2>
          <p className="text-white/60 font-barlow text-lg mb-8 max-w-md mx-auto">One flat fee. No surprises. Your site live in under 2 weeks.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-sky-400 text-black px-8 py-4 rounded-full font-barlow font-semibold hover:bg-sky-300 transition-colors">
            Book a Free Call <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
