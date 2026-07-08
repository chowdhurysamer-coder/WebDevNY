import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, FadeUp, SectionLabel, Magnetic } from "@/components/primitives";
import { Estimator } from "@/components/Estimator";
import { IconCheck, IconArrowUpRight, IconArrow } from "@/components/icons";
import { BASE, EXTRA_PAGE, ADDONS } from "@/lib/pricing";
import { useLang } from "@/lib/i18n";

// Everything starts from one base package; add-ons stack a one-time fee onto
// the flat build fee and a monthly fee onto maintenance.
const baseFeatureKeys = ["pr.f.pages4", "pr.f.responsive", "pr.f.onpageSeo", "pr.f.contactMap", "pr.f.socials", "pr.f.support30"];

const ADDON_KEY: Record<string, string> = {
  cms: "es.addon.cms",
  booking: "es.addon.booking",
  seo: "es.addon.seo",
  multilang: "es.addon.multilang",
  gallery: "es.addon.gallery",
};

const faqKeys = [
  ["pr.faq.q1", "pr.faq.a1"], ["pr.faq.q2", "pr.faq.a2"], ["pr.faq.q3", "pr.faq.a3"], ["pr.faq.q4", "pr.faq.a4"], ["pr.faq.q5", "pr.faq.a5"],
];

export default function Pricing() {
  const { t, num } = useLang();
  const [open, setOpen] = useState<number | null>(0);
  const faqs = faqKeys.map(([q, a]) => [t(q), t(a)] as const);

  const ADDON_DESC: Record<string, string> = {
    cms: "es.addon.cms.d", booking: "es.addon.booking.d", seo: "es.addon.seo.d",
    multilang: "es.addon.multilang.d", gallery: "es.addon.gallery.d",
  };
  const addonRows = [
    { labelKey: "pr.f.extraPage", descKey: "es.addon.extra.d", oneTime: EXTRA_PAGE.oneTime, monthly: EXTRA_PAGE.monthly },
    ...ADDONS.map((a) => ({ labelKey: ADDON_KEY[a.id], descKey: ADDON_DESC[a.id], oneTime: a.oneTime, monthly: a.monthly })),
  ];
  const [openAddon, setOpenAddon] = useState<number | null>(null);

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

      {/* BASE PACKAGE + ADD-ON PRICING */}
      <section className="max-w-[1200px] mx-auto px-5 sm:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {/* base package */}
          <FadeUp className="flex">
            <div className="flex flex-col w-full p-8 card-paper-kraft">
              <div className="flex items-center justify-between mb-6">
                <span className="mono-label text-paper/80">{t("pr.tag.starter")}</span>
                <span className="mono-label text-paper/50">01</span>
              </div>
              <h2 className="display text-4xl font-semibold mb-2">{t("es.base")}</h2>
              <p className="text-sm mb-6 text-paper/75">{t("pr.desc.starter")}</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-lg text-paper/60">$</span>
                <span className="display text-6xl font-semibold">{num(BASE.oneTime)}</span>
                <span className="mono-label ml-1 text-paper/60">{t("pr.flat")}</span>
              </div>
              <div className="mono-label mb-6 text-paper/70">+ ${num(BASE.monthly)}{t("pr.perMo")} · {t("es.monthly")}</div>
              <div className="h-px mb-6 bg-paper/20" />
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {baseFeatureKeys.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <IconCheck size={16} className="text-paper" /> {t(f)}
                  </li>
                ))}
              </ul>
              <Magnetic>
                <Link to="/contact" data-cursor-label="GO" className="press inline-flex items-center justify-center gap-2 w-full py-4 mono-label bg-ink text-paper">
                  {t("pr.choose")} {t("es.base")} <IconArrowUpRight size={14} />
                </Link>
              </Magnetic>
            </div>
          </FadeUp>

          {/* add-on price list */}
          <FadeUp delay={0.1} className="flex">
            <div className="flex flex-col w-full p-8 card-paper">
              <div className="flex items-center justify-between mb-6">
                <span className="mono-label text-kraft">{t("es.addons")}</span>
                <span className="mono-label text-ink-faint">02</span>
              </div>
              <div className="grid grid-cols-[1.6fr_0.7fr_0.7fr] gap-x-3 mono-label text-ink-faint border-b border-line pb-3 mb-1">
                <span>{t("pr.t.item")}</span>
                <span className="text-right">{t("pr.t.once")}</span>
                <span className="text-right">{t("pr.t.mo")}</span>
              </div>
              <div className="flex-1">
                {addonRows.map((r, i) => {
                  const isOpen = openAddon === i;
                  return (
                    <div key={r.labelKey} className="border-b border-line">
                      <button onClick={() => setOpenAddon(isOpen ? null : i)} data-cursor-label={isOpen ? "CLOSE" : "WHAT'S THIS"}
                        className="group w-full grid grid-cols-[1.6fr_0.7fr_0.7fr] gap-x-3 items-baseline py-3.5 text-left">
                        <span className="text-sm group-hover:text-kraft transition-colors link-draw-group w-fit">{t(r.labelKey)}</span>
                        <span className="text-right display text-lg font-semibold group-hover:text-kraft transition-colors" dir="ltr">${num(r.oneTime)}</span>
                        <span className="text-right text-ink-soft" dir="ltr">${num(r.monthly)}{t("pr.perMo")}</span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <p className="text-ink-soft text-sm leading-relaxed pb-4 pr-2">{t(r.descKey)}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
              <p className="mono-label text-ink-faint mt-6" style={{ fontSize: 9 }}>{t("pr.maxPages")}</p>
              <p className="mono-label text-ink-faint mt-2" style={{ fontSize: 9 }}>{t("es.domainNote")}</p>
            </div>
          </FadeUp>
        </div>
        <p className="text-center mono-label text-ink-faint mt-10">{t("pr.pricesNote")}</p>
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
