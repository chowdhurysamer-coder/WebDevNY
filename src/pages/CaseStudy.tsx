import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { caseBySlug, cases } from "@/data/cases";
import { SiteMock } from "@/components/SiteMock";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Reveal, FadeUp, SectionLabel, Magnetic, Parallax } from "@/components/primitives";
import { IconArrow, IconArrowUpRight, IconCheck, IconStar } from "@/components/icons";

export default function CaseStudy() {
  const { slug } = useParams();
  const study = caseBySlug(slug);
  if (!study) return <Navigate to="/portfolio" replace />;

  const idx = cases.findIndex((c) => c.slug === study.slug);
  const next = cases[(idx + 1) % cases.length];

  return (
    <div className="bg-paper pt-16">
      {/* hero */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-16 pb-12">
        <Link to="/portfolio" className="inline-flex items-center gap-2 mono-label text-ink-soft hover:text-kraft transition-colors mb-10 link-draw">
          <IconArrow size={15} className="rotate-180" /> All work
        </Link>
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="mono-label px-3 py-1.5 border" style={{ color: study.accent, borderColor: study.accent }}>{study.category}</span>
          <span className="mono-label text-ink-faint">{study.year}</span>
        </div>
        <h1 className="display text-[clamp(40px,8vw,120px)] font-semibold tracking-tightest mb-6">
          <Reveal text={study.name} />
        </h1>
        <p className="display italic text-[clamp(20px,3vw,34px)] text-ink-soft max-w-3xl">{study.tagline}</p>
      </section>

      {/* big mock */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 pb-20">
        <Parallax speed={0.08}>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="card-paper overflow-hidden">
            <SiteMock variant={study.variant} className="w-full" />
          </motion.div>
        </Parallax>
      </section>

      {/* before / after */}
      <section className="max-w-[1100px] mx-auto px-5 sm:px-8 pb-24">
        <div className="flex items-end justify-between mb-6">
          <SectionLabel index="·">The transformation</SectionLabel>
          <span className="mono-label text-ink-faint hidden sm:block">drag to compare ⇄</span>
        </div>
        <BeforeAfter variant={study.variant} />
      </section>

      {/* overview */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 pb-20 grid lg:grid-cols-[1.4fr_1fr] gap-12">
        <div>
          <SectionLabel index="·" className="mb-6">Overview</SectionLabel>
          <p className="display text-[clamp(22px,2.6vw,32px)] leading-snug">{study.intro}</p>
        </div>
        <div className="grid grid-cols-2 gap-px bg-line border border-line h-fit">
          <div className="bg-paper p-5">
            <div className="mono-label text-ink-faint mb-3">Services</div>
            <ul className="flex flex-col gap-1.5 text-sm">{study.services.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
          <div className="bg-paper p-5">
            <div className="mono-label text-ink-faint mb-3">Stack</div>
            <ul className="flex flex-col gap-1.5 text-sm">{study.stack.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
        </div>
      </section>

      {/* metrics band */}
      <section className="bg-ink text-paper py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 grid sm:grid-cols-3 gap-px bg-paper/10 border border-paper/10">
          {study.metrics.map((m, i) => (
            <FadeUp key={m.label} delay={i * 0.1} className="bg-ink p-8 text-center">
              <div className="display text-[clamp(40px,6vw,72px)] font-semibold" style={{ color: study.accent }}>{m.value}</div>
              <div className="text-sm font-medium mt-2">{m.label}</div>
              <div className="mono-label text-paper/40 mt-1">{m.sub}</div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* challenge + approach */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-24 grid lg:grid-cols-2 gap-16">
        <div>
          <SectionLabel index="01" className="mb-6">The challenge</SectionLabel>
          <p className="display text-[clamp(24px,3vw,38px)] leading-snug">{study.challenge}</p>
        </div>
        <div>
          <SectionLabel index="02" className="mb-6">Our approach</SectionLabel>
          <div className="border-t border-line">
            {study.approach.map((a, i) => (
              <FadeUp key={i} delay={i * 0.08} className="flex gap-5 border-b border-line py-6">
                <span className="mono-label text-kraft shrink-0 mt-1">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-ink-soft leading-relaxed">{a}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* outcome + quote */}
      <section className="bg-paper-2 border-y border-line py-24">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 text-center">
          <SectionLabel index="03" className="justify-center mb-6">The outcome</SectionLabel>
          <Reveal as="h2" text={study.outcome} className="display text-[clamp(26px,4vw,52px)] font-semibold justify-center text-center mb-12 max-w-4xl mx-auto" />
          <div className="card-paper p-8 sm:p-10 max-w-2xl mx-auto text-left">
            <div className="flex gap-1 mb-5" style={{ color: study.accent }}>{[...Array(5)].map((_, j) => <IconStar key={j} size={16} />)}</div>
            <p className="display italic text-xl sm:text-2xl leading-snug mb-5">"{study.quote.text}"</p>
            <div className="mono-label text-ink-faint">{study.quote.who}</div>
          </div>
        </div>
      </section>

      {/* CTA + next */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-20">
        <div className="card-paper-kraft p-10 sm:p-14 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <div className="mono-label text-paper/80 mb-3 flex items-center gap-2"><IconCheck size={14} /> Want results like these?</div>
            <h2 className="display text-[clamp(26px,4vw,52px)] font-semibold">Let's build yours.</h2>
          </div>
          <Magnetic>
            <Link to="/contact" data-cursor-label="GO" className="bg-ink text-paper px-8 py-4 mono-label press inline-flex items-center gap-2">
              Start a project <IconArrowUpRight size={15} />
            </Link>
          </Magnetic>
        </div>

        <Link to={`/work/${next.slug}`} className="group mt-6 flex items-center justify-between border-t border-ink pt-6">
          <div>
            <div className="mono-label text-ink-faint mb-1">Next project</div>
            <div className="display text-[clamp(24px,3.5vw,44px)] font-semibold group-hover:text-kraft transition-colors">{next.name}</div>
          </div>
          <IconArrowUpRight size={32} className="group-hover:text-kraft group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
        </Link>
      </section>
    </div>
  );
}
