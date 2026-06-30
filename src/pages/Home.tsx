import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PlotterField } from "@/components/PlotterField";
import { SiteMock } from "@/components/SiteMock";
import { Reveal, FadeUp, SectionLabel, Marquee, Magnetic, Counter, Parallax } from "@/components/primitives";
import { IconArrowUpRight, IconArrow } from "@/components/icons";

const stats = [
  { to: 150, suffix: "+", label: "Sites shipped" },
  { to: 98, suffix: "%", label: "Client retention" },
  { to: 3.2, suffix: "×", label: "Avg traffic lift" },
  { to: 11, suffix: " days", label: "Avg time to launch" },
];

const services = [
  { n: "01", t: "Web Design", d: "Brand-led interfaces designed in-house, pixel by pixel. No themes, no page builders.", to: "/web-design" },
  { n: "02", t: "Development", d: "Hand-written React. Fast, accessible, and built to outlast the next redesign.", to: "/web-design" },
  { n: "03", t: "SEO Foundation", d: "Technical SEO, local search, schema — baked in from the first commit.", to: "/capabilities" },
  { n: "04", t: "Analytics", d: "We instrument everything, then read the numbers back to you in plain English.", to: "/analytics" },
];

const niches = ["Restaurants", "Dental", "Fitness", "Salons", "Legal", "Real Estate", "Medical", "E-commerce", "Home Services", "Hospitality"];

export default function Home() {
  return (
    <div className="bg-paper">
      {/* ───────── HERO ───────── */}
      <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden">
        <PlotterField className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(120% 80% at 50% 0%, transparent 40%, rgba(239,233,221,0.7) 100%)" }} />

        <div className="relative max-w-[1400px] w-full mx-auto px-5 sm:px-8 pb-14 pt-32">
          <div className="flex items-center justify-between mb-8">
            <SectionLabel index="00">Web studio · New York</SectionLabel>
            <span className="mono-label text-ink-faint hidden sm:block">Est. 2024 — 40.7° N, 74.0° W</span>
          </div>

          <h1 className="display text-[clamp(48px,12vw,180px)] font-semibold tracking-tightest">
            <Reveal text="Websites New York" />
            <span className="flex flex-wrap items-baseline">
              <Reveal text="actually" delay={0.15} />
              <span className="italic text-kraft ml-[0.22em]">
                <Reveal text="clicks with." delay={0.25} />
              </span>
            </span>
          </h1>

          <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.7 }}
              className="text-ink-soft text-lg max-w-md leading-relaxed"
            >
              We design and build custom websites for New York businesses — fast, distinctive, and engineered to turn a click into a customer.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.7 }} className="flex items-center gap-4">
              <Magnetic>
                <Link to="/contact" data-cursor-label="GO" className="card-paper-kraft press inline-flex items-center gap-2 px-6 py-4 mono-label">
                  Start a project <IconArrowUpRight size={15} />
                </Link>
              </Magnetic>
              <Link to="/portfolio" className="inline-flex items-center gap-2 mono-label text-ink hover:text-kraft transition-colors link-draw">
                See the work <IconArrow size={15} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────── MARQUEE ───────── */}
      <section className="border-y border-ink bg-ink text-paper py-5">
        <Marquee items={["Design", "Development", "SEO", "Analytics", "Branding", "Maintenance"]} />
      </section>

      {/* ───────── STATS ───────── */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-20 grid grid-cols-2 lg:grid-cols-4 border-b border-line">
        {stats.map((s, i) => (
          <FadeUp key={s.label} delay={i * 0.08} className={`px-2 py-6 ${i !== 0 ? "lg:border-l border-line" : ""}`}>
            <div className="display text-[clamp(44px,7vw,84px)] font-semibold leading-none">
              <Counter to={s.to} suffix={s.suffix} />
            </div>
            <div className="mono-label text-ink-faint mt-3">{s.label}</div>
          </FadeUp>
        ))}
      </section>

      {/* ───────── SERVICES ───────── */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <SectionLabel index="01" className="mb-5">What we do</SectionLabel>
            <Reveal as="h2" text="A studio, not a factory." className="display text-[clamp(32px,5.5vw,72px)] font-semibold" />
          </div>
          <p className="text-ink-soft max-w-sm">Four disciplines, one team. Every project runs through all of them — no handoffs to strangers.</p>
        </div>

        <div className="border-t border-ink">
          {services.map((s, i) => (
            <motion.div key={s.n} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link to={s.to} className="group grid grid-cols-1 md:grid-cols-[80px_1fr_1.2fr_auto] gap-4 md:gap-8 items-baseline border-b border-line py-7 hover:bg-paper-2 transition-colors -mx-3 px-3">
                <span className="mono-label text-kraft">{s.n}</span>
                <h3 className="display text-[clamp(28px,3.5vw,46px)] font-semibold group-hover:text-kraft transition-colors">{s.t}</h3>
                <p className="text-ink-soft text-sm leading-relaxed max-w-md">{s.d}</p>
                <IconArrowUpRight size={24} className="justify-self-end opacity-30 group-hover:opacity-100 group-hover:text-kraft group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ───────── SELECTED WORK ───────── */}
      <section className="bg-ink text-paper py-24 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <SectionLabel index="02" className="text-paper/60 mb-5">Selected work</SectionLabel>
              <Reveal as="h2" text="Built for real businesses." className="display text-[clamp(30px,5vw,64px)] font-semibold text-paper" />
            </div>
            <Link to="/portfolio" className="hidden sm:inline-flex items-center gap-2 mono-label text-paper hover:text-kraft transition-colors">
              All projects <IconArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        <Parallax speed={0.15}>
          <div className="flex gap-6 px-5 sm:px-8 overflow-x-auto pb-4 max-w-[1400px] mx-auto" style={{ scrollbarWidth: "none" }}>
            {(["restaurant", "dental", "gym", "legal"] as const).map((v, i) => (
              <FadeUp key={v} delay={i * 0.1} className="shrink-0 w-[300px] sm:w-[380px]">
                <div className="border border-paper/15 overflow-hidden card-hover">
                  <SiteMock variant={v} className="w-full" />
                </div>
                <div className="flex items-center justify-between mt-3 mono-label text-paper/50">
                  <span>{["Trattoria", "BrightSmile", "IronWorks", "Park Ave Legal"][i]}</span>
                  <span>0{i + 1}</span>
                </div>
              </FadeUp>
            ))}
          </div>
        </Parallax>
      </section>

      {/* ───────── NICHES ───────── */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-24">
        <SectionLabel index="03" className="mb-6">Industries we know cold</SectionLabel>
        <div className="flex flex-wrap gap-3">
          {niches.map((n, i) => (
            <motion.span
              key={n}
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
              className="card-paper press px-5 py-3 mono-label cursor-default"
            >
              {n}
            </motion.span>
          ))}
        </div>
        <p className="text-ink-soft max-w-lg mt-8">
          We don't do "any industry, any time." We go deep on a handful of verticals so you get a partner who already speaks your customer's language.
        </p>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 pb-28">
        <div className="card-paper-kraft p-10 sm:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="relative">
            <SectionLabel index="→" className="justify-center text-paper/80 mb-6">Ready when you are</SectionLabel>
            <Reveal as="h2" text="Let's put your business in a box worth opening." className="display text-[clamp(32px,5.5vw,76px)] font-semibold justify-center text-center max-w-3xl mx-auto" />
            <Magnetic className="mt-10 inline-block">
              <Link to="/contact" data-cursor-label="GO" className="inline-flex items-center gap-2 bg-ink text-paper px-8 py-4 mono-label press">
                Book a free call <IconArrowUpRight size={15} />
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>
    </div>
  );
}
