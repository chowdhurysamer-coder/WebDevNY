import { Link } from "react-router-dom";
import { Reveal, FadeUp, SectionLabel, Counter, Magnetic } from "@/components/primitives";
import { IconArrowUpRight } from "@/components/icons";
import { useLang } from "@/lib/i18n";

const values = [
  { n: "01", tKey: "about.val1.t", dKey: "about.val1.d" },
  { n: "02", tKey: "about.val2.t", dKey: "about.val2.d" },
  { n: "03", tKey: "about.val3.t", dKey: "about.val3.d" },
  { n: "04", tKey: "about.val4.t", dKey: "about.val4.d" },
];

const stats = [
  { to: 150, suffix: "+", key: "home.stat.sites" },
  { to: 11, suffixKey: "home.stat.days", key: "about.avgLaunch" },
  { to: 98, suffix: "%", key: "about.retention" },
  { to: 2025, suffix: "", key: "about.est" },
];

export default function About() {
  const { t } = useLang();
  return (
    <div className="bg-paper pt-16">
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-20 pb-14 border-b border-line">
        <SectionLabel index="·" className="mb-8">{t("about.eyebrow")}</SectionLabel>
        <h1 className="display text-[clamp(40px,9vw,130px)] font-semibold tracking-tightest">
          <Reveal text={t("about.h1a")} />
          <span className="italic text-kraft"><Reveal text={t("about.h1b")} delay={0.15} /></span>
        </h1>
        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <p className="display text-[clamp(20px,2.4vw,30px)] leading-snug">
            {t("about.intro")}
          </p>
          <p className="text-ink-soft leading-relaxed self-end">
            {t("about.intro2")}
          </p>
        </div>
      </section>

      {/* stats */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-16 grid grid-cols-2 lg:grid-cols-4 border-b border-line">
        {stats.map((s, i) => (
          <FadeUp key={s.key} delay={i * 0.08} className={`px-2 py-4 ${i !== 0 ? "lg:border-l border-line" : ""}`}>
            <div className="display text-[clamp(40px,6vw,76px)] font-semibold leading-none">
              <Counter to={s.to} suffix={s.suffix ?? t(s.suffixKey!)} />
            </div>
            <div className="mono-label text-ink-faint mt-3">{t(s.key)}</div>
          </FadeUp>
        ))}
      </section>

      {/* values */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-24">
        <SectionLabel index="·" className="mb-10">{t("about.believe")}</SectionLabel>
        <div className="grid md:grid-cols-2 border-t border-l border-line">
          {values.map((v, i) => (
            <FadeUp key={v.n} delay={(i % 2) * 0.08} className="border-r border-b border-line p-8 sm:p-10">
              <span className="display text-kraft text-5xl font-semibold">{v.n}</span>
              <h3 className="display text-2xl font-semibold mt-4 mb-2">{t(v.tKey)}</h3>
              <p className="text-ink-soft leading-relaxed max-w-md">{t(v.dKey)}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* how we work */}
      <section className="bg-paper-2 border-y border-line py-24">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 text-center">
          <Reveal as="h2" text={t("about.wholeTeam")} className="display text-[clamp(26px,4vw,52px)] font-semibold justify-center text-center max-w-3xl mx-auto mb-6" />
          <p className="text-ink-soft max-w-lg mx-auto">
            {t("about.wholeTeam.d")}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-24 text-center">
        <Reveal as="h2" text={t("about.buildYours")} className="display text-[clamp(30px,5vw,68px)] font-semibold justify-center mb-8" />
        <Magnetic className="inline-block">
          <Link to="/contact" data-cursor-label="GO" className="card-paper-kraft press inline-flex items-center gap-2 px-7 py-4 mono-label">
            {t("cta.start")} <IconArrowUpRight size={15} />
          </Link>
        </Magnetic>
      </section>
    </div>
  );
}
