import { Link } from "react-router-dom";
import { Reveal, FadeUp, SectionLabel, Magnetic } from "@/components/primitives";
import { IconCheck, IconArrowUpRight, IconRefresh, IconShield, IconHeadset } from "@/components/icons";
import { useLang } from "@/lib/i18n";

const features = [
  { icon: IconRefresh, tKey: "pl.f1.t", dKey: "pl.f1.d" },
  { icon: IconShield, tKey: "pl.f2.t", dKey: "pl.f2.d" },
  { icon: IconHeadset, tKey: "pl.f3.t", dKey: "pl.f3.d" },
];

// One flat maintenance fee, included with every build ($50/mo). Feature
// add-ons each carry their own small monthly fee on top (see Pricing).
const MAINT_PRICE = "50";
const maintFeatureKeys = ["pl.bf.monthlyUpdates", "pl.bf.uptime", "pl.bf.scans", "pl.bf.report", "pl.bf.emailSupport"];

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

      {/* the one maintenance plan — included with every build */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-8 pb-20">
        <div className="max-w-xl mx-auto">
          <FadeUp className="flex">
            <div className="flex flex-col w-full p-8 sm:p-10 card-paper-kraft">
              <div className="flex items-center justify-between mb-5">
                <h2 className="display text-3xl font-semibold">{t("term.maintenance")}</h2>
                <span className="mono-label bg-ink text-paper px-2.5 py-1">{t("pl.popular")}</span>
              </div>
              <div className="flex items-baseline gap-1 mb-7">
                <span className="text-lg text-paper/60">$</span>
                <span className="display text-6xl font-semibold">{num(MAINT_PRICE)}</span>
                <span className="mono-label ml-1 text-paper/60">{t("pl.perMo")}</span>
              </div>
              <div className="h-px mb-6 bg-paper/20" />
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {maintFeatureKeys.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <IconCheck size={16} className="text-paper" /> {t(f)}
                  </li>
                ))}
              </ul>
              <Magnetic>
                <Link to="/contact" data-cursor-label="GO" className="press inline-flex items-center justify-center gap-2 w-full py-4 mono-label bg-ink text-paper">
                  {t("pl.get")} {t("term.maintenance")} <IconArrowUpRight size={14} />
                </Link>
              </Magnetic>
            </div>
          </FadeUp>
          <p className="text-ink-soft text-sm leading-relaxed text-center mt-8 max-w-md mx-auto">{t("pl.addonNote")}</p>
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
