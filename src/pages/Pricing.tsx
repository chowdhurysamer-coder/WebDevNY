import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, FadeUp, SectionLabel, Magnetic } from "@/components/primitives";
import { IconCheck, IconArrowUpRight, IconArrow } from "@/components/icons";

const plans = [
  { name: "Starter", price: "2,499", tag: "New businesses", desc: "A strong, fast digital presence — live in about a week.",
    features: ["Up to 5 pages", "Mobile-responsive design", "Contact form + map", "On-page SEO", "1-year hosting included", "30-day support"], featured: false },
  { name: "Growth", price: "4,999", tag: "Most chosen", desc: "For established businesses ready to compete and convert.",
    features: ["Up to 12 pages", "Custom animation & motion", "Blog / CMS integration", "Full SEO foundation", "GA4 + heatmap setup", "Booking / lead system", "90-day support"], featured: true },
  { name: "Elite", price: "9,999", tag: "Scaling up", desc: "A full custom build with commerce, integrations, and strategy.",
    features: ["Unlimited pages", "E-commerce ready", "Custom API integrations", "A/B testing setup", "Advanced analytics", "Priority support", "Quarterly strategy calls"], featured: false },
];

const faqs = [
  ["What's included in the flat fee?", "Design, development, testing, launch, DNS setup, and the first month of support. Everything you need to go live and stay live."],
  ["Do I own the website?", "Completely. You own the code, the domain, and all the content. We hand over every key — no lock-in, no hostage hosting."],
  ["How long does it take?", "Starter sites launch in about a week. Growth sites in 10–14 days. Elite builds run three to four weeks depending on scope."],
  ["Can I upgrade later?", "Always. Plenty of clients start on Starter and grow into Growth or Elite. We make the jump seamless."],
];

export default function Pricing() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="bg-paper pt-16">
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-20 pb-14 border-b border-line text-center">
        <SectionLabel index="06" className="justify-center mb-8">Pricing — flat fee</SectionLabel>
        <h1 className="display text-[clamp(44px,10vw,150px)] font-semibold tracking-tightest">
          <Reveal text="Simple," className="justify-center" />
          <span className="italic text-kraft"><Reveal text="honest pricing." delay={0.12} className="justify-center" /></span>
        </h1>
        <p className="text-ink-soft text-lg max-w-lg mx-auto leading-relaxed mt-8">
          One-time project fee. No retainers, no monthly surprises. You know the number before we start — and you own everything we build.
        </p>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((p, i) => (
            <FadeUp key={p.name} delay={i * 0.1} className="flex">
              <div className={`flex flex-col w-full p-8 ${p.featured ? "card-paper-kraft" : "card-paper"}`}>
                <div className="flex items-center justify-between mb-6">
                  <span className={`mono-label ${p.featured ? "text-paper/80" : "text-kraft"}`}>{p.tag}</span>
                  <span className={`mono-label ${p.featured ? "text-paper/50" : "text-ink-faint"}`}>0{i + 1}</span>
                </div>
                <h2 className="display text-4xl font-semibold mb-2">{p.name}</h2>
                <p className={`text-sm mb-6 ${p.featured ? "text-paper/75" : "text-ink-soft"}`}>{p.desc}</p>
                <div className="flex items-baseline gap-1 mb-7">
                  <span className={`text-lg ${p.featured ? "text-paper/60" : "text-ink-faint"}`}>$</span>
                  <span className="display text-6xl font-semibold">{p.price}</span>
                  <span className={`mono-label ml-1 ${p.featured ? "text-paper/60" : "text-ink-faint"}`}>flat</span>
                </div>
                <div className={`h-px mb-6 ${p.featured ? "bg-paper/20" : "bg-line"}`} />
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <IconCheck size={16} className={p.featured ? "text-paper" : "text-kraft"} /> {f}
                    </li>
                  ))}
                </ul>
                <Magnetic>
                  <Link to="/contact" data-cursor-label="GO" className={`press inline-flex items-center justify-center gap-2 w-full py-4 mono-label ${p.featured ? "bg-ink text-paper" : "card-paper-kraft"}`}>
                    Choose {p.name} <IconArrowUpRight size={14} />
                  </Link>
                </Magnetic>
              </div>
            </FadeUp>
          ))}
        </div>
        <p className="text-center mono-label text-ink-faint mt-10">All prices in USD · Payment plans available · Custom quotes for enterprise</p>
      </section>

      {/* FAQ */}
      <section className="max-w-[900px] mx-auto px-5 sm:px-8 py-20">
        <SectionLabel index="·" className="mb-10">Common questions</SectionLabel>
        <div className="border-t border-ink">
          {faqs.map(([q, a], i) => (
            <div key={q} className="border-b border-line">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between gap-4 py-6 text-left">
                <span className="display text-xl sm:text-2xl font-semibold">{q}</span>
                <motion.span animate={{ rotate: open === i ? 90 : 0 }} className="shrink-0 text-kraft"><IconArrow size={20} /></motion.span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="text-ink-soft leading-relaxed pb-6 max-w-xl">{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
