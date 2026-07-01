import { useParams, Link, Navigate } from "react-router-dom";
import { industryBySlug, industries } from "@/data/industries";
import { SiteMock } from "@/components/SiteMock";
import { Reveal, FadeUp, SectionLabel, Magnetic, Counter, TiltCard } from "@/components/primitives";
import { IconArrowUpRight, IconCheck, IconStar } from "@/components/icons";
import { useLang } from "@/lib/i18n";

export default function Industry() {
  const { t } = useLang();
  const { slug } = useParams();
  const ind = industryBySlug(slug);
  if (!ind) return <Navigate to="/capabilities" replace />;

  return (
    <div className="bg-paper pt-16">
      {/* hero */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-20 pb-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 mono-label px-3 py-1.5 border mb-8" style={{ color: ind.accent, borderColor: ind.accent }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: ind.accent }} /> {t(ind.eyebrowKey)}
          </div>
          <h1 className="display text-[clamp(40px,8vw,110px)] font-semibold tracking-tightest">
            <Reveal text={t(ind.headlineKey[0])} />
            <span className="italic" style={{ color: ind.accent }}><Reveal text={t(ind.headlineKey[1])} delay={0.12} /></span>
          </h1>
          <p className="text-ink-soft text-lg max-w-md leading-relaxed mt-8">{t(ind.subKey)}</p>
          <div className="flex flex-wrap items-center gap-4 mt-10">
            <Magnetic>
              <Link to="/contact" data-cursor-label="GO" className="card-paper-kraft press inline-flex items-center gap-2 px-6 py-4 mono-label">
                {t("in.getQuote")} <IconArrowUpRight size={15} />
              </Link>
            </Magnetic>
            <Link to="/pricing" className="mono-label hover:text-kraft transition-colors link-draw">{t("in.seePricing")}</Link>
          </div>
        </div>
        <TiltCard>
          <div className="card-paper overflow-hidden"><SiteMock variant={ind.variant} className="w-full" /></div>
        </TiltCard>
      </section>

      {/* pains */}
      <section className="bg-paper-2 border-y border-line py-20">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <SectionLabel index="·" className="mb-8">{t("in.soundFamiliar")}</SectionLabel>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ind.painKeys.map((p, i) => (
              <FadeUp key={p} delay={i * 0.07} className="card-paper p-6">
                <div className="display text-4xl font-semibold mb-3" style={{ color: ind.accent }}>0{i + 1}</div>
                <p className="text-ink-soft text-sm leading-relaxed">{t(p)}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* features */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-24">
        <SectionLabel index="·" className="mb-10">{t("in.whatYouGet")}</SectionLabel>
        <div className="grid md:grid-cols-3 gap-6">
          {ind.features.map((f, i) => (
            <FadeUp key={f.tKey} delay={i * 0.1} className="card-paper p-7">
              <div className="w-10 h-10 grid place-items-center mb-5" style={{ background: ind.accent, color: "#fff" }}><IconCheck size={18} /></div>
              <h3 className="display text-2xl font-semibold mb-2">{t(f.tKey)}</h3>
              <p className="text-ink-soft text-sm leading-relaxed">{t(f.dKey)}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* results */}
      <section className="py-20" style={{ background: ind.accent }}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <div className="mono-label text-white/80 mb-10">{t("in.realResults")}</div>
          <div className="grid sm:grid-cols-3 gap-8">
            {ind.result.map((r, i) => {
              const num = parseFloat(r.value.replace(/[^0-9.]/g, "")) || 0;
              const pre = r.value.match(/^[^0-9]*/)?.[0] || "";
              const suf = r.value.replace(/^[^0-9]*[0-9.]*/, "");
              return (
                <FadeUp key={r.labelKey} delay={i * 0.1}>
                  <div className="display text-[clamp(48px,8vw,96px)] font-semibold text-white leading-none">
                    {num ? <Counter to={num} prefix={pre} suffix={suf} /> : r.value}
                  </div>
                  <div className="mono-label text-white/80 mt-2">{t(r.labelKey)}</div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* quote + CTA */}
      <section className="max-w-[1100px] mx-auto px-5 sm:px-8 py-24 text-center">
        <div className="flex justify-center gap-1 mb-6" style={{ color: ind.accent }}>{[...Array(5)].map((_, j) => <IconStar key={j} size={18} />)}</div>
        <Reveal as="h2" text={`"${t(ind.quote.textKey)}"`} className="display text-[clamp(24px,3.6vw,46px)] font-semibold justify-center text-center max-w-3xl mx-auto" />
        <div className="mono-label text-ink-faint mt-6">{ind.quote.who}</div>

        <div className="card-paper-kraft p-10 sm:p-14 mt-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="relative">
            <h3 className="display text-[clamp(26px,4vw,56px)] font-semibold mb-4">{t("in.readyWorks")}</h3>
            <p className="text-paper/80 mb-8 max-w-md mx-auto">{t("in.ctaSub")}</p>
            <Magnetic className="inline-block">
              <Link to="/contact" data-cursor-label="GO" className="bg-ink text-paper px-8 py-4 mono-label press inline-flex items-center gap-2">
                {t("in.startProject")} <IconArrowUpRight size={15} />
              </Link>
            </Magnetic>
          </div>
        </div>

        {/* other industries */}
        <div className="mt-16">
          <div className="mono-label text-ink-faint mb-5">{t("in.otherIndustries")}</div>
          <div className="flex flex-wrap justify-center gap-3">
            {industries.filter((o) => o.slug !== ind.slug).map((o) => (
              <Link key={o.slug} to={`/for/${o.slug}`} className="card-paper press px-5 py-3 mono-label">{t(o.nameKey)}</Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
