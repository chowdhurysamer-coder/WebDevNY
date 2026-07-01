import { motion } from "framer-motion";
import { Reveal, FadeUp, SectionLabel } from "@/components/primitives";
import { CapabilityCube } from "@/components/CapabilityCube";
import { IconLayers, IconTarget, IconChart, IconClock, IconTag, IconUsers } from "@/components/icons";
import { useLang } from "@/lib/i18n";

const caps = [
  { icon: IconLayers, n: "01", tKey: "cap.c1.t", dKey: "cap.c1.d", tags: ["React / Next.js", "Headless CMS", "Node APIs", "Edge hosting"] },
  { icon: IconTarget, n: "02", tKey: "cap.c2.t", dKey: "cap.c2.d", tags: ["Landing pages", "A/B testing", "CTA hierarchy", "Heatmaps"] },
  { icon: IconChart, n: "03", tKey: "cap.c3.t", dKey: "cap.c3.d", tags: ["Technical audit", "Local SEO", "Schema markup", "Core Web Vitals"] },
  { icon: IconClock, n: "04", tKey: "cap.c4.t", dKey: "cap.c4.d", tags: ["48h first draft", "2-week launch", "Async reviews", "Tight scope"] },
  { icon: IconTag, n: "05", tKey: "cap.c5.t", dKey: "cap.c5.d", tags: ["Flat fee", "Clear scope", "Payment plans", "No lock-in"] },
  { icon: IconUsers, n: "06", tKey: "cap.c6.t", dKey: "cap.c6.d", tags: ["Maintenance", "Content updates", "Strategy calls", "Priority support"] },
];

const verticals = [
  "term.restaurants", "term.dentalPractices", "term.gymsStudios", "term.salonsSpas", "term.lawFirms", "term.realestate",
  "term.medicalClinics", "term.schoolsTutors", "term.ecommerce", "term.homeservices", "term.creativeAgencies", "term.barsNightlife",
];

export default function Capabilities() {
  const { t } = useLang();
  return (
    <div className="bg-paper pt-16">
      {/* hero with cube */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-20 pb-16 border-b border-line">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div>
            <SectionLabel index="02" className="mb-8">{t("cap.eyebrow")}</SectionLabel>
            <h1 className="display text-[clamp(40px,8vw,120px)] font-semibold tracking-tightest">
              <Reveal text={t("cap.h1a")} />
              <span className="italic text-kraft"><Reveal text={t("cap.h1b")} delay={0.15} /></span>
            </h1>
            <p className="text-ink-soft text-lg max-w-md leading-relaxed mt-8">
              {t("cap.heroSub")}
            </p>
          </div>
          <div className="card-paper p-2">
            <CapabilityCube />
          </div>
        </div>
      </section>

      {/* capabilities list */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-24">
        <div className="grid md:grid-cols-2 border-t border-l border-line">
          {caps.map((c, i) => (
            <FadeUp key={c.tKey} delay={(i % 2) * 0.08} className="border-r border-b border-line p-8 sm:p-10 group hover:bg-paper-2 transition-colors">
              <div className="flex items-start justify-between mb-6">
                <c.icon size={34} className="text-kraft" />
                <span className="mono-label text-ink-faint">{c.n} / 06</span>
              </div>
              <h3 className="display text-[clamp(24px,3vw,38px)] font-semibold mb-3">{t(c.tKey)}</h3>
              <p className="text-ink-soft leading-relaxed mb-6 max-w-md">{t(c.dKey)}</p>
              <div className="flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span key={t} className="mono-label border border-line px-3 py-1.5 text-ink-soft">{t}</span>
                ))}
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* verticals */}
      <section className="bg-paper-2 border-y border-line py-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <SectionLabel index="·" className="mb-6">{t("cap.verticals")}</SectionLabel>
          <Reveal as="h2" text={t("cap.deepNotWide")} className="display text-[clamp(30px,5vw,64px)] font-semibold mb-12" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-line border border-line">
            {verticals.map((v, i) => (
              <motion.div
                key={v}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                className="bg-paper px-5 py-6 flex items-center justify-between group hover:bg-kraft transition-colors cursor-default"
              >
                <span className="text-sm group-hover:text-paper transition-colors">{t(v)}</span>
                <span className="mono-label text-ink-faint group-hover:text-paper transition-colors">{String(i + 1).padStart(2, "0")}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
