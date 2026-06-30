import { motion } from "framer-motion";
import { Check, RefreshCw, Shield, HeadphonesIcon, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { RippleButton } from "@/components/ui/RippleButton";

const maintenancePlans = [
  {
    name: "Basic Care",
    price: "199",
    period: "/mo",
    color: "#38bdf8",
    features: [
      "Monthly plugin & CMS updates",
      "Uptime monitoring (24/7)",
      "Security scans",
      "Monthly performance report",
      "Email support",
    ],
  },
  {
    name: "Pro Care",
    price: "499",
    period: "/mo",
    color: "#a78bfa",
    popular: true,
    features: [
      "Everything in Basic",
      "2 hours content updates/mo",
      "A/B test management",
      "SEO monitoring & fixes",
      "Priority phone/Slack support",
      "Quarterly strategy call",
    ],
  },
  {
    name: "Elite Care",
    price: "999",
    period: "/mo",
    color: "#fbbf24",
    features: [
      "Everything in Pro",
      "8 hours development/mo",
      "New feature builds",
      "Custom analytics reporting",
      "Dedicated account manager",
      "Monthly strategy sessions",
    ],
  },
];

const features = [
  { icon: <RefreshCw className="w-6 h-6" />, title: "Regular Updates", desc: "WordPress, plugins, dependencies — kept current and secure." },
  { icon: <Shield className="w-6 h-6" />, title: "Security Monitoring", desc: "Daily malware scans, firewall rules, and instant breach response." },
  { icon: <HeadphonesIcon className="w-6 h-6" />, title: "Priority Support", desc: "Real humans who know your site. Not a ticket queue." },
];

export default function Plans() {
  return (
    <div className="bg-black text-white pt-28">
      <section className="px-4 pb-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display text-[clamp(36px,7vw,84px)] font-bold leading-[0.92] tracking-[-0.03em] mb-6"
        >
          Your site is alive.<br />
          <span className="gradient-text italic">Keep it that way.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white/60 font-barlow text-lg max-w-xl mx-auto"
        >
          Maintenance plans that keep your site fast, secure, and growing — without you lifting a finger.
        </motion.p>
      </section>

      {/* Why maintenance */}
      <section className="px-4 pb-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 text-center card-hover"
            >
              <div className="w-12 h-12 rounded-2xl bg-sky-400/10 flex items-center justify-center text-sky-400 mx-auto mb-4">
                {f.icon}
              </div>
              <h3 className="font-barlow font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-white/50 font-barlow text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Plans */}
      <section className="px-4 pb-24">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 items-start">
          {maintenancePlans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass rounded-3xl p-7 relative ${p.popular ? "ring-1 ring-violet-400/40 scale-105" : ""}`}
            >
              {p.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-barlow font-semibold" style={{ background: p.color, color: "#000" }}>
                  Most Popular
                </div>
              )}
              <h2 className="font-display text-3xl font-bold text-white mb-1">{p.name}</h2>
              <div className="flex items-baseline gap-1 my-5">
                <span className="text-white/40 font-barlow text-lg">$</span>
                <span className="font-display text-5xl font-bold text-white">{p.price}</span>
                <span className="text-white/40 font-barlow text-sm">{p.period}</span>
              </div>
              <div className="h-px bg-white/5 mb-5" />
              <ul className="flex flex-col gap-2.5 mb-7">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-white/70 font-barlow text-sm">
                    <Check className="w-4 h-4 shrink-0" style={{ color: p.color }} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/contact">
                <RippleButton
                  className={`w-full py-3 rounded-xl font-barlow font-semibold text-sm ${p.popular ? "text-black" : "glass hover:bg-white/10 text-white"}`}
                  style={p.popular ? { background: p.color } : {}}
                >
                  Get {p.name} <ArrowRight className="inline w-3.5 h-3.5 ml-1" />
                </RippleButton>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Comparison note */}
      <section className="px-4 pb-24">
        <div className="max-w-3xl mx-auto glass rounded-3xl p-10 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">Already a client?</h2>
          <p className="text-white/60 font-barlow mb-8">
            All WebDev NY project clients get 30 days of free support after launch. Maintenance plans keep the momentum going after that.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full font-barlow font-semibold hover:bg-sky-100 transition-colors">
            Talk to us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
