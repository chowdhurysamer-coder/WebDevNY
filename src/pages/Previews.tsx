import { motion } from "framer-motion";
import { Play, ExternalLink, Eye } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const previews = [
  {
    id: "1",
    title: "Restaurant Template",
    category: "Food & Beverage",
    tags: ["Reservations", "Menu", "Gallery"],
    color: "#fb923c",
    metrics: { conversion: "4.2%", load: "1.1s", mobile: "98" },
    gradient: "from-orange-900/40 to-black",
  },
  {
    id: "2",
    title: "Medical Clinic",
    category: "Healthcare",
    tags: ["Appointments", "Patient Forms", "Reviews"],
    color: "#38bdf8",
    metrics: { conversion: "5.8%", load: "0.9s", mobile: "99" },
    gradient: "from-sky-900/40 to-black",
  },
  {
    id: "3",
    title: "Fitness Studio",
    category: "Health & Fitness",
    tags: ["Class Booking", "Membership", "Trainers"],
    color: "#34d399",
    metrics: { conversion: "6.1%", load: "1.3s", mobile: "97" },
    gradient: "from-emerald-900/40 to-black",
  },
  {
    id: "4",
    title: "Law Firm Premium",
    category: "Legal",
    tags: ["Practice Areas", "Case Results", "Consultation"],
    color: "#a78bfa",
    metrics: { conversion: "3.4%", load: "0.8s", mobile: "100" },
    gradient: "from-violet-900/40 to-black",
  },
  {
    id: "5",
    title: "E-Commerce Boutique",
    category: "Retail",
    tags: ["Product Catalog", "Cart", "Reviews"],
    color: "#f472b6",
    metrics: { conversion: "2.9%", load: "1.4s", mobile: "96" },
    gradient: "from-pink-900/40 to-black",
  },
  {
    id: "6",
    title: "Real Estate Agency",
    category: "Property",
    tags: ["MLS Listings", "Valuation", "Agents"],
    color: "#fbbf24",
    metrics: { conversion: "7.2%", load: "1.0s", mobile: "98" },
    gradient: "from-yellow-900/40 to-black",
  },
];

function PreviewCard({ p, i }: { p: typeof previews[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`glass rounded-2xl overflow-hidden card-hover cursor-pointer relative bg-gradient-to-br ${p.gradient}`}
    >
      {/* Mock browser preview */}
      <div className="h-44 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-2">
              {["🍕","🏥","💪","⚖️","👗","🏠"][i]}
            </div>
            <div className="font-barlow text-xs text-white/30 uppercase tracking-widest">Preview</div>
          </div>
        </div>

        {/* Browser chrome */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-black/60 flex items-center px-3 gap-1.5 border-b border-white/5">
          {["#f87171","#fbbf24","#34d399"].map((c, j) => (
            <div key={j} className="w-2 h-2 rounded-full" style={{ background: c }} />
          ))}
          <div className="ml-2 flex-1 bg-white/5 rounded text-[10px] text-white/20 px-2 py-0.5 font-mono">yoursite.com</div>
        </div>

        {/* Hover overlay */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3 pt-8"
        >
          <button className="flex items-center gap-1.5 bg-white text-black px-3 py-1.5 rounded-full text-xs font-barlow font-semibold">
            <Eye className="w-3 h-3" /> Preview
          </button>
          <button className="flex items-center gap-1.5 glass px-3 py-1.5 rounded-full text-xs font-barlow text-white">
            <ExternalLink className="w-3 h-3" /> Live Demo
          </button>
        </motion.div>
      </div>

      {/* Card body */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-barlow font-semibold text-white">{p.title}</h3>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${p.color}20`, color: p.color }}>{p.category}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {p.tags.map((t) => (
            <span key={t} className="text-[11px] font-barlow text-white/40 px-2 py-0.5 rounded glass">
              {t}
            </span>
          ))}
        </div>
        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/5">
          <div className="text-center">
            <div className="font-barlow font-bold text-sm" style={{ color: p.color }}>{p.metrics.conversion}</div>
            <div className="text-white/30 font-barlow text-[10px]">CVR</div>
          </div>
          <div className="text-center">
            <div className="font-barlow font-bold text-sm" style={{ color: p.color }}>{p.metrics.load}</div>
            <div className="text-white/30 font-barlow text-[10px]">Load</div>
          </div>
          <div className="text-center">
            <div className="font-barlow font-bold text-sm" style={{ color: p.color }}>{p.metrics.mobile}</div>
            <div className="text-white/30 font-barlow text-[10px]">Mobile</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Previews() {
  return (
    <div className="bg-black text-white pt-28">
      <section className="px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-barlow text-white/60 mb-6 uppercase tracking-widest">
            <Play className="w-3 h-3 text-sky-400" />
            Live Previews
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-[clamp(36px,7vw,84px)] font-bold leading-[0.92] tracking-[-0.03em] mb-6"
          >
            See before<br />
            <span className="gradient-text italic">you commit.</span>
          </motion.h1>
          <p className="text-white/60 font-barlow text-lg max-w-xl">
            Browse live demos of our most popular templates. Every design is fully customized for your brand.
          </p>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {previews.map((p, i) => <PreviewCard key={p.id} p={p} i={i} />)}
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="max-w-3xl mx-auto glass rounded-3xl p-10 text-center glow-blue">
          <h2 className="font-display text-[clamp(24px,4vw,44px)] font-bold text-white mb-4">Want to see your industry?</h2>
          <p className="text-white/60 font-barlow mb-8">We'll build a custom preview for your business — free, no strings attached.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-sky-400 text-black px-7 py-3.5 rounded-full font-barlow font-semibold hover:bg-sky-300 transition-colors">
            Request a Preview
          </Link>
        </div>
      </section>
    </div>
  );
}
