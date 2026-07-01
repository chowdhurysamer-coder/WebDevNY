import { Link } from "react-router-dom";
import { Reveal, FadeUp, SectionLabel, Counter, Magnetic } from "@/components/primitives";
import { IconArrowUpRight } from "@/components/icons";

const values = [
  { n: "01", t: "Craft over templates", d: "Every site is designed and hand-coded from scratch. We'd rather ship one thing that's excellent than a hundred that are fine." },
  { n: "02", t: "Speed as respect", d: "Fast sites, fast replies, fast launches. Your time and your visitors' time both matter to us." },
  { n: "03", t: "Plain English", d: "No jargon, no smoke. We explain what we're doing and why, and we tell you the number up front." },
  { n: "04", t: "In it after launch", d: "We don't disappear at go-live. Maintenance, updates, and strategy are always a message away." },
];

const stats = [
  { to: 150, suffix: "+", label: "Sites shipped" },
  { to: 11, suffix: " days", label: "Avg launch" },
  { to: 98, suffix: "%", label: "Retention" },
  { to: 2025, suffix: "", label: "Est." },
];

export default function About() {
  return (
    <div className="bg-paper pt-16">
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-20 pb-14 border-b border-line">
        <SectionLabel index="·" className="mb-8">About the studio</SectionLabel>
        <h1 className="display text-[clamp(40px,9vw,130px)] font-semibold tracking-tightest">
          <Reveal text="A small studio" />
          <span className="italic text-kraft"><Reveal text="that ships big." delay={0.15} /></span>
        </h1>
        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <p className="display text-[clamp(20px,2.4vw,30px)] leading-snug">
            WebDev NY is a web design & development studio in New York. We build custom sites for local businesses that want to look, and perform, like the best in their category.
          </p>
          <p className="text-ink-soft leading-relaxed self-end">
            No offshore assembly line, no template marketplace. Just a tight, senior team that designs, writes the code, and stays accountable for the result. We keep our roster small on purpose, it's how the work stays sharp.
          </p>
        </div>
      </section>

      {/* stats */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-16 grid grid-cols-2 lg:grid-cols-4 border-b border-line">
        {stats.map((s, i) => (
          <FadeUp key={s.label} delay={i * 0.08} className={`px-2 py-4 ${i !== 0 ? "lg:border-l border-line" : ""}`}>
            <div className="display text-[clamp(40px,6vw,76px)] font-semibold leading-none">
              <Counter to={s.to} suffix={s.suffix} />
            </div>
            <div className="mono-label text-ink-faint mt-3">{s.label}</div>
          </FadeUp>
        ))}
      </section>

      {/* values */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-24">
        <SectionLabel index="·" className="mb-10">What we believe</SectionLabel>
        <div className="grid md:grid-cols-2 border-t border-l border-line">
          {values.map((v, i) => (
            <FadeUp key={v.n} delay={(i % 2) * 0.08} className="border-r border-b border-line p-8 sm:p-10">
              <span className="display text-kraft text-5xl font-semibold">{v.n}</span>
              <h3 className="display text-2xl font-semibold mt-4 mb-2">{v.t}</h3>
              <p className="text-ink-soft leading-relaxed max-w-md">{v.d}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* how we work */}
      <section className="bg-paper-2 border-y border-line py-24">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 text-center">
          <Reveal as="h2" text="We're the whole team, design, code, and strategy under one roof." className="display text-[clamp(26px,4vw,52px)] font-semibold justify-center text-center max-w-3xl mx-auto mb-6" />
          <p className="text-ink-soft max-w-lg mx-auto">
            When you work with us, you talk to the people actually building your site. No account-manager telephone game, no handoffs to strangers.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-24 text-center">
        <Reveal as="h2" text="Let's build yours." className="display text-[clamp(30px,5vw,68px)] font-semibold justify-center mb-8" />
        <Magnetic className="inline-block">
          <Link to="/contact" data-cursor-label="GO" className="card-paper-kraft press inline-flex items-center gap-2 px-7 py-4 mono-label">
            Start a project <IconArrowUpRight size={15} />
          </Link>
        </Magnetic>
      </section>
    </div>
  );
}
