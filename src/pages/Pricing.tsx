import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, FadeUp, SectionLabel, Magnetic } from "@/components/primitives";
import { Estimator } from "@/components/Estimator";
import { IconCheck, IconArrowUpRight, IconArrow } from "@/components/icons";

const plans = [
  { name: "Starter", price: "1,490", monthly: "from $135/mo", tag: "Small budgets welcome", desc: "A clean, fast site to get your business online this week.",
    features: ["Up to 5 pages", "Mobile-responsive design", "Contact form + map", "On-page SEO", "1-year hosting included", "30-day support"], featured: false },
  { name: "Growth", price: "3,490", monthly: "from $299/mo", tag: "Most chosen", desc: "For businesses ready to compete and win more customers.",
    features: ["Up to 12 pages", "Custom animation & motion", "Blog / CMS integration", "Full SEO foundation", "GA4 + heatmap setup", "Booking / lead system", "90-day support"], featured: true },
  { name: "Elite", price: "6,990", monthly: "from $599/mo", tag: "Scaling up", desc: "A full custom build with commerce, integrations, and strategy.",
    features: ["Unlimited pages", "E-commerce ready", "Custom API integrations", "A/B testing setup", "Advanced analytics", "Priority support", "Quarterly strategy calls"], featured: false },
];

const faqs = [
  ["What's included in the flat fee?", "Design, development, testing, launch, DNS setup, and the first month of support. Everything you need to go live and stay live."],
  ["Can I pay monthly?", "Yes. Every plan can be split into interest-free monthly payments so you can start now and spread the cost. Ask us for a plan that fits your budget."],
  ["Do I own the website?", "Completely. You own the code, the domain, and all the content. We hand over every key, no lock-in, no hostage hosting."],
  ["How long does it take?", "Starter sites launch in about a week. Growth sites in 10 to 14 days. Elite builds run three to four weeks depending on scope."],
  ["What if I can't afford the upfront cost?", "Ask about our revenue-share option below. You pay a lower upfront fee and we take a small percentage of the sales the site brings in, so the site pays for itself as it works."],
];

export default function Pricing() {
  const [open, setOpen] = useState<number | null>(0);

  // FAQ rich-snippet structured data
  useEffect(() => {
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = "faq-schema";
    el.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map(([q, a]) => ({
        "@type": "Question", name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    });
    document.head.appendChild(el);
    return () => { document.getElementById("faq-schema")?.remove(); };
  }, []);

  return (
    <div className="bg-paper pt-16">
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-20 pb-14 border-b border-line text-center">
        <SectionLabel index="06" className="justify-center mb-8">Pricing, flat fee</SectionLabel>
        <h1 className="display text-[clamp(44px,10vw,150px)] font-semibold tracking-tightest">
          <Reveal text="Simple," className="justify-center" />
          <span className="italic text-kraft"><Reveal text="honest pricing." delay={0.12} className="justify-center" /></span>
        </h1>
        <p className="text-ink-soft text-lg max-w-lg mx-auto leading-relaxed mt-8">
          Built for small budgets. Pay once, or split it into interest-free monthly payments. You always know the number before we start, and you own everything we build.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {["Interest-free monthly plans", "No hidden fees", "Revenue-share option", "You own everything"].map((b) => (
            <span key={b} className="mono-label border border-line px-3 py-1.5 text-ink-soft">{b}</span>
          ))}
        </div>
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
                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`text-lg ${p.featured ? "text-paper/60" : "text-ink-faint"}`}>$</span>
                  <span className="display text-6xl font-semibold">{p.price}</span>
                  <span className={`mono-label ml-1 ${p.featured ? "text-paper/60" : "text-ink-faint"}`}>flat</span>
                </div>
                <div className={`mono-label mb-6 ${p.featured ? "text-paper/70" : "text-kraft"}`}>or {p.monthly}</div>
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
        <p className="text-center mono-label text-ink-faint mt-10">All prices in USD · Interest-free monthly plans · Custom quotes for enterprise</p>
      </section>

      {/* REVENUE SHARE / ROYALTY */}
      <section className="bg-ink text-paper py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative max-w-[1100px] mx-auto px-5 sm:px-8">
          <SectionLabel index="07" className="text-paper/60 mb-6">Low upfront cost, revenue share</SectionLabel>
          <Reveal as="h2" text="Can't pay it all upfront? Let the site pay for itself." className="display text-[clamp(28px,4.5vw,60px)] font-semibold text-paper max-w-3xl mb-6" />
          <p className="text-paper/70 max-w-xl leading-relaxed mb-12">
            If a full flat fee is a stretch, we can partner instead. You pay a smaller upfront amount, and we take a modest percentage of the sales or bookings the new site generates until an agreed cap. When you win, we win. When it slows down, so does what you owe.
          </p>

          <div className="grid md:grid-cols-3 gap-px bg-paper/10 border border-paper/10">
            {[
              { pct: "5%", t: "Product sales", d: "For online stores. We take 5% of sales the site processes, capped and time-limited by contract." },
              { pct: "8%", t: "Booked services", d: "For bookings and leads. We take 8% of revenue from jobs the site books for you." },
              { pct: "50%", t: "Lower upfront", d: "Cut your upfront fee roughly in half in exchange for the revenue share above." },
            ].map((r) => (
              <FadeUp key={r.t} className="bg-ink p-8">
                <div className="display text-[clamp(40px,6vw,72px)] font-semibold text-kraft-soft leading-none">{r.pct}</div>
                <div className="font-medium mt-3">{r.t}</div>
                <p className="mono-label text-paper/50 mt-2 leading-relaxed normal-case tracking-normal" style={{ letterSpacing: 0, textTransform: "none", fontSize: 12 }}>{r.d}</p>
              </FadeUp>
            ))}
          </div>

          <p className="text-paper/50 text-sm mt-8 max-w-xl leading-relaxed">
            Exact percentages, caps, and duration are set per project in a plain-language contract. No equity, no ongoing lock-in once the cap is met. Ask us if revenue share is a fit for your business.
          </p>
          <Magnetic className="inline-block mt-8">
            <Link to="/contact" data-cursor-label="GO" state={{ quote: undefined }} className="bg-kraft text-paper px-7 py-4 mono-label press inline-flex items-center gap-2">
              Ask about revenue share <IconArrowUpRight size={15} />
            </Link>
          </Magnetic>
        </div>
      </section>

      {/* ESTIMATOR */}
      <section className="bg-paper-2 border-y border-line py-24">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <SectionLabel index="·" className="mb-5">Build your estimate</SectionLabel>
              <Reveal as="h2" text="Price it out in 30 seconds." className="display text-[clamp(28px,4.5vw,56px)] font-semibold" />
            </div>
            <p className="text-ink-soft max-w-xs">Drag, toggle, and watch the number move. No email wall, just a real ballpark before we talk.</p>
          </div>
          <FadeUp><Estimator /></FadeUp>
        </div>
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
