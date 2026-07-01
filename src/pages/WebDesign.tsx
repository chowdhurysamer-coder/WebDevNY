import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Reveal, FadeUp, SectionLabel, Magnetic } from "@/components/primitives";
import { ScrollTimeline } from "@/components/flourishes";
import { SiteMock } from "@/components/SiteMock";
import { IconArrowUpRight, IconCode, IconPen, IconBolt, IconShield, IconChart, IconPhone } from "@/components/icons";
import { useLang } from "@/lib/i18n";

const offer = [
  { icon: IconPen, tKey: "term.design", dKey: "wd.o.design.d" },
  { icon: IconCode, tKey: "term.development", dKey: "wd.o.dev.d" },
  { icon: IconBolt, tKey: "wd.o.performance", dKey: "wd.o.performance.d" },
  { icon: IconPhone, tKey: "wd.o.responsive", dKey: "wd.o.responsive.d" },
  { icon: IconShield, tKey: "wd.o.secure", dKey: "wd.o.secure.d" },
  { icon: IconChart, tKey: "wd.o.measurable", dKey: "wd.o.measurable.d" },
];

const process = [
  { n: "01", tKey: "wd.p.discovery", dKey: "wd.p.discovery.d" },
  { n: "02", tKey: "term.design", dKey: "wd.p.design.d" },
  { n: "03", tKey: "wd.p.build", dKey: "wd.p.build.d" },
  { n: "04", tKey: "wd.p.launch", dKey: "wd.p.launch.d" },
];

export default function WebDesign() {
  const { t } = useLang();
  const localProcess = process.map((p) => ({ n: p.n, t: t(p.tKey), d: t(p.dKey) }));
  return (
    <div className="bg-paper pt-16">
      {/* hero */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-20 pb-16 border-b border-line">
        <SectionLabel index="01" className="mb-8">{t("wd.eyebrow")}</SectionLabel>
        <h1 className="display text-[clamp(44px,10vw,150px)] font-semibold tracking-tightest">
          <Reveal text={t("wd.h1a")} />
          <span className="italic text-kraft"><Reveal text={t("wd.h1b")} delay={0.15} /></span>
        </h1>
        <div className="mt-10 grid md:grid-cols-2 gap-8 items-end">
          <p className="text-ink-soft text-lg max-w-md leading-relaxed">
            {t("wd.heroSub")}
          </p>
          <div className="md:justify-self-end">
            <Magnetic>
              <Link to="/contact" data-cursor-label="GO" className="card-paper-kraft press inline-flex items-center gap-2 px-6 py-4 mono-label">
                {t("wd.startBuild")} <IconArrowUpRight size={15} />
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* what's included grid */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-24">
        <SectionLabel index="·" className="mb-10">{t("wd.everyBuild")}</SectionLabel>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-line">
          {offer.map((o, i) => (
            <FadeUp key={o.tKey} delay={i * 0.06} className="border-r border-b border-line p-8 group hover:bg-paper-2 transition-colors">
              <o.icon size={30} className="text-kraft mb-6" />
              <h3 className="display text-2xl font-semibold mb-2">{t(o.tKey)}</h3>
              <p className="text-ink-soft text-sm leading-relaxed">{t(o.dKey)}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* process */}
      <section className="bg-paper-2 border-y border-line py-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <div className="flex items-end justify-between mb-14">
            <div>
              <SectionLabel index="·" className="mb-5">{t("wd.howItWorks")}</SectionLabel>
              <Reveal as="h2" text={t("wd.fourSteps")} className="display text-[clamp(30px,5vw,64px)] font-semibold" />
            </div>
          </div>
          <ScrollTimeline steps={localProcess} />
        </div>
      </section>

      {/* showcase */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionLabel index="·" className="mb-6">{t("wd.theResult")}</SectionLabel>
            <Reveal as="h2" text={t("wd.noTwoAlike")} className="display text-[clamp(30px,5vw,60px)] font-semibold mb-6" />
            <p className="text-ink-soft leading-relaxed mb-8 max-w-md">
              {t("wd.result.d")}
            </p>
            <Link to="/portfolio" className="inline-flex items-center gap-2 mono-label hover:text-kraft transition-colors link-draw">
              {t("cta.browsePortfolio")} <IconArrowUpRight size={15} />
            </Link>
          </div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-2 gap-4">
            <div className="border border-ink overflow-hidden translate-y-6"><SiteMock variant="salon" className="w-full" /></div>
            <div className="border border-ink overflow-hidden"><SiteMock variant="realestate" className="w-full" /></div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
