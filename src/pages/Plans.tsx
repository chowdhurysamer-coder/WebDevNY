import { Link } from "react-router-dom";
import { Reveal, FadeUp, SectionLabel, Magnetic } from "@/components/primitives";
import { IconCheck, IconArrowUpRight, IconRefresh, IconShield, IconHeadset } from "@/components/icons";
import { useLang } from "@/lib/i18n";

const features = [
  { icon: IconRefresh, tKey: "pl.f1.t", dKey: "pl.f1.d" },
  { icon: IconShield, tKey: "pl.f2.t", dKey: "pl.f2.d" },
  { icon: IconHeadset, tKey: "pl.f3.t", dKey: "pl.f3.d" },
];

const plans = [
  { nameKey: "pl.plan.basic", price: "199", featured: false,
    features: ["pl.bf.monthlyUpdates", "pl.bf.uptime", "pl.bf.scans", "pl.bf.report", "pl.bf.emailSupport"] },
  { nameKey: "pl.plan.pro", price: "499", featured: true,
    features: ["pl.pf.everythingBasic", "pl.pf.content2", "pl.pf.abtest", "pl.pf.seoFixes", "pl.pf.phoneSlack", "pl.pf.quarterlyCall"] },
  { nameKey: "pl.plan.elite", price: "999", featured: false,
    features: ["pl.ef.everythingPro", "pl.ef.dev8", "pl.ef.newFeatures", "pl.ef.customReport", "pl.ef.dedicated", "pl.ef.monthlyStrategy"] },
];

export default function Plans() {
  const { t, num } = useLang();
  return (
    <div className="bg-paper pt-16">
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-20 pb-14 border-b border-line">
        <SectionLabel index="07" className="mb-8">{t("pl.eyebrow")}</SectionLabel>
        <h1 className="display text-[clamp(44px,10vw,150px)] font-semibold tracking-tightest">
          <Reveal text={t("pl.h1a")} />
          <span className="italic text-kraft"><Reveal text={t("pl.h1b")} delay={0.15} /></span>
        </h1>
        <p className="text-ink-soft text-lg max-w-md leading-relaxed mt-8">
          {t("pl.sub")}
        </p>
      </section>

      {/* why */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-16">
        <div className="grid md:grid-cols-3 border-t border-l border-line">
          {features.map((f, i) => (
            <FadeUp key={f.tKey} delay={i * 0.1} className="border-r border-b border-line p-8">
              <f.icon size={30} className="text-kraft mb-6" />
              <h3 className="display text-2xl font-semibold mb-2">{t(f.tKey)}</h3>
              <p className="text-ink-soft text-sm leading-relaxed">{t(f.dKey)}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* plans */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-8 pb-20">
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((p, i) => (
            <FadeUp key={p.nameKey} delay={i * 0.1} className="flex">
              <div className={`flex flex-col w-full p-8 ${p.featured ? "card-paper-kraft" : "card-paper"}`}>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="display text-3xl font-semibold">{t(p.nameKey)}</h2>
                  {p.featured && <span className="mono-label bg-ink text-paper px-2.5 py-1">{t("pl.popular")}</span>}
                </div>
                <div className="flex items-baseline gap-1 mb-7">
                  <span className={`text-lg ${p.featured ? "text-paper/60" : "text-ink-faint"}`}>$</span>
                  <span className="display text-6xl font-semibold">{num(p.price)}</span>
                  <span className={`mono-label ml-1 ${p.featured ? "text-paper/60" : "text-ink-faint"}`}>{t("pl.perMo")}</span>
                </div>
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
                    {t("pl.get")} {t(p.nameKey)} <IconArrowUpRight size={14} />
                  </Link>
                </Magnetic>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 pb-24">
        <div className="card-paper p-10 sm:p-14 text-center">
          <Reveal as="h2" text={t("pl.already")} className="display text-[clamp(28px,4.5vw,56px)] font-semibold justify-center mb-5" />
          <p className="text-ink-soft max-w-lg mx-auto mb-8">
            {t("pl.already.d")}
          </p>
          <Link to="/contact" data-cursor-label="GO" className="card-paper-kraft press inline-flex items-center gap-2 px-7 py-4 mono-label">
            {t("pl.talk")} <IconArrowUpRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
