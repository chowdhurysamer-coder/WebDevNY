import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, FadeUp, SectionLabel, Magnetic } from "@/components/primitives";
import { Estimator } from "@/components/Estimator";
import { IconCheck, IconArrowUpRight, IconArrow } from "@/components/icons";
import { useLang } from "@/lib/i18n";

const plans = [
  { nameKey: "pr.plan.starter", price: "1,490", monthlyPrice: "135", tagKey: "pr.tag.starter", descKey: "pr.desc.starter",
    features: ["pr.f.pages5", "pr.f.responsive", "pr.f.contactMap", "pr.f.onpageSeo", "pr.f.hosting1y", "pr.f.support30"], featured: false },
  { nameKey: "pr.plan.growth", price: "3,490", monthlyPrice: "299", tagKey: "pr.tag.growth", descKey: "pr.desc.growth",
    features: ["pr.f.pages12", "pr.f.animation", "pr.f.blogCms", "pr.f.fullSeo", "pr.f.ga4", "pr.f.booking", "pr.f.support90"], featured: true },
  { nameKey: "pr.plan.elite", price: "6,990", monthlyPrice: "599", tagKey: "pr.tag.elite", descKey: "pr.desc.elite",
    features: ["pr.f.unlimited", "pr.f.ecomm", "pr.f.api", "pr.f.abtest", "pr.f.advAnalytics", "pr.f.priority", "pr.f.quarterly"], featured: false },
];

const faqKeys = [
  ["pr.faq.q1", "pr.faq.a1"], ["pr.faq.q2", "pr.faq.a2"], ["pr.faq.q3", "pr.faq.a3"], ["pr.faq.q4", "pr.faq.a4"], ["pr.faq.q5", "pr.faq.a5"],
];

export default function Pricing() {
  const { t, num } = useLang();
  const [open, setOpen] = useState<number | null>(0);
  const faqs = faqKeys.map(([q, a]) => [t(q), t(a)] as const);

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
        <SectionLabel index="06" className="justify-center mb-8">{t("pr.eyebrow")}</SectionLabel>
        <h1 className="display text-[clamp(44px,10vw,150px)] font-semibold tracking-tightest">
          <Reveal text={t("pr.h1a")} className="justify-center" />
          <span className="italic text-kraft"><Reveal text={t("pr.h1b")} delay={0.12} className="justify-center" /></span>
        </h1>
        <p className="text-ink-soft text-lg max-w-lg mx-auto leading-relaxed mt-8">
          {t("pr.sub")}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {["pr.badge.monthly", "pr.badge.noHidden", "pr.badge.revShare", "pr.badge.ownAll"].map((b) => (
            <span key={b} className="mono-label border border-line px-3 py-1.5 text-ink-soft">{t(b)}</span>
          ))}
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((p, i) => (
            <FadeUp key={p.nameKey} delay={i * 0.1} className="flex">
              <div className={`flex flex-col w-full p-8 ${p.featured ? "card-paper-kraft" : "card-paper"}`}>
                <div className="flex items-center justify-between mb-6">
                  <span className={`mono-label ${p.featured ? "text-paper/80" : "text-kraft"}`}>{t(p.tagKey)}</span>
                  <span className={`mono-label ${p.featured ? "text-paper/50" : "text-ink-faint"}`}>0{i + 1}</span>
                </div>
                <h2 className="display text-4xl font-semibold mb-2">{t(p.nameKey)}</h2>
                <p className={`text-sm mb-6 ${p.featured ? "text-paper/75" : "text-ink-soft"}`}>{t(p.descKey)}</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`text-lg ${p.featured ? "text-paper/60" : "text-ink-faint"}`}>$</span>
                  <span className="display text-6xl font-semibold">{num(p.price)}</span>
                  <span className={`mono-label ml-1 ${p.featured ? "text-paper/60" : "text-ink-faint"}`}>{t("pr.flat")}</span>
                </div>
                <div className={`mono-label mb-6 ${p.featured ? "text-paper/70" : "text-kraft"}`}>{t("pr.or")} {t("pr.from")} ${num(p.monthlyPrice)}{t("pr.perMo")}</div>
                <div className={`h-px mb-6 ${p.featured ? "bg-paper/20" : "bg-line"}`} />
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <IconCheck size={16} className={p.featured ? "text-paper" : "text-kraft"} /> {t(f)}
                    </li>
                  ))}
                </ul>
                <Magnetic>
                  <Link to="/contact" data-cursor-label="GO" className={`press inline-flex items-center justify-center gap-2 w-full py-4 mono-label ${p.featured ? "bg-ink text-paper" : "card-paper-kraft"}`}>
                    {t("pr.choose")} {t(p.nameKey)} <IconArrowUpRight size={14} />
                  </Link>
                </Magnetic>
              </div>
            </FadeUp>
          ))}
        </div>
        <p className="text-center mono-label text-ink-faint mt-10">{t("pr.pricesNote")}</p>
      </section>

      {/* REVENUE SHARE / ROYALTY */}
      <section className="bg-ink text-paper py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative max-w-[1100px] mx-auto px-5 sm:px-8">
          <SectionLabel index="07" className="text-paper/60 mb-6">{t("pr.rev.eyebrow")}</SectionLabel>
          <Reveal as="h2" text={t("pr.rev.h")} className="display text-[clamp(28px,4.5vw,60px)] font-semibold text-paper max-w-3xl mb-6" />
          <p className="text-paper/70 max-w-xl leading-relaxed mb-12">
            {t("pr.rev.p")}
          </p>

          <div className="grid md:grid-cols-3 gap-px bg-paper/10 border border-paper/10">
            {[
              { pct: "5%", tKey: "pr.rev.c1.t", dKey: "pr.rev.c1.d" },
              { pct: "8%", tKey: "pr.rev.c2.t", dKey: "pr.rev.c2.d" },
              { pct: "50%", tKey: "pr.rev.c3.t", dKey: "pr.rev.c3.d" },
            ].map((r) => (
              <FadeUp key={r.tKey} className="bg-ink p-8">
                <div className="display text-[clamp(40px,6vw,72px)] font-semibold text-kraft-soft leading-none">{num(r.pct)}</div>
                <div className="font-medium mt-3">{t(r.tKey)}</div>
                <p className="mono-label text-paper/50 mt-2 leading-relaxed normal-case tracking-normal" style={{ letterSpacing: 0, textTransform: "none", fontSize: 12 }}>{t(r.dKey)}</p>
              </FadeUp>
            ))}
          </div>

          <p className="text-paper/50 text-sm mt-8 max-w-xl leading-relaxed">
            {t("pr.rev.fine")}
          </p>
          <Magnetic className="inline-block mt-8">
            <Link to="/contact" data-cursor-label="GO" state={{ quote: undefined }} className="bg-kraft text-paper px-7 py-4 mono-label press inline-flex items-center gap-2">
              {t("pr.rev.cta")} <IconArrowUpRight size={15} />
            </Link>
          </Magnetic>
        </div>
      </section>

      {/* ESTIMATOR */}
      <section className="bg-paper-2 border-y border-line py-24">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <SectionLabel index="·" className="mb-5">{t("pr.est.eyebrow")}</SectionLabel>
              <Reveal as="h2" text={t("pr.est.h")} className="display text-[clamp(28px,4.5vw,56px)] font-semibold" />
            </div>
            <p className="text-ink-soft max-w-xs">{t("pr.est.p")}</p>
          </div>
          <FadeUp><Estimator /></FadeUp>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[900px] mx-auto px-5 sm:px-8 py-20">
        <SectionLabel index="·" className="mb-10">{t("pr.faq.title")}</SectionLabel>
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
