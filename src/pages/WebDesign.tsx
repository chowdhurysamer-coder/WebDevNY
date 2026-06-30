import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Reveal, FadeUp, SectionLabel, Magnetic } from "@/components/primitives";
import { ScrollTimeline } from "@/components/flourishes";
import { SiteMock } from "@/components/SiteMock";
import { IconArrowUpRight, IconCode, IconPen, IconBolt, IconShield, IconChart, IconPhone } from "@/components/icons";

const offer = [
  { icon: IconPen, t: "Design", d: "We design in high fidelity before a line of code — you approve the real thing, not a rough sketch." },
  { icon: IconCode, t: "Development", d: "Hand-written React & TypeScript. No bloated builders, no plugin spaghetti. Just clean, fast code." },
  { icon: IconBolt, t: "Performance", d: "Sub-2-second loads and 95+ Lighthouse scores. Speed is the cheapest conversion lever there is." },
  { icon: IconPhone, t: "Responsive", d: "Designed for thumbs first. Flawless from a 360px phone to a 5K display." },
  { icon: IconShield, t: "Secure", d: "SSL, hardened forms, safe hosting. We sweat the parts your visitors never see." },
  { icon: IconChart, t: "Measurable", d: "GA4, events, and heatmaps wired up day one — so you know what's working." },
];

const process = [
  { n: "01", t: "Discovery", d: "A real conversation about your business, your customers, and what winning looks like. No questionnaire-and-ghost." },
  { n: "02", t: "Design", d: "Full-fidelity mockups that look like the finished site. We iterate until you'd happily ship it." },
  { n: "03", t: "Build", d: "Hand-coded in React with SEO and performance built in from the first commit. You watch it come together." },
  { n: "04", t: "Launch", d: "We handle DNS, hosting, and go-live, then hand you the keys with training and 30 days of support." },
];

export default function WebDesign() {
  return (
    <div className="bg-paper pt-16">
      {/* hero */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-20 pb-16 border-b border-line">
        <SectionLabel index="01" className="mb-8">Design & Development</SectionLabel>
        <h1 className="display text-[clamp(44px,10vw,150px)] font-semibold tracking-tightest">
          <Reveal text="Sites that work" />
          <span className="italic text-kraft"><Reveal text="as hard as you do." delay={0.15} /></span>
        </h1>
        <div className="mt-10 grid md:grid-cols-2 gap-8 items-end">
          <p className="text-ink-soft text-lg max-w-md leading-relaxed">
            We don't just make websites look good. We engineer them to earn — more calls, more bookings, more revenue for New York businesses.
          </p>
          <div className="md:justify-self-end">
            <Magnetic>
              <Link to="/contact" data-cursor-label="GO" className="card-paper-kraft press inline-flex items-center gap-2 px-6 py-4 mono-label">
                Start your build <IconArrowUpRight size={15} />
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* what's included grid */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-24">
        <SectionLabel index="·" className="mb-10">Every build includes</SectionLabel>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-line">
          {offer.map((o, i) => (
            <FadeUp key={o.t} delay={i * 0.06} className="border-r border-b border-line p-8 group hover:bg-paper-2 transition-colors">
              <o.icon size={30} className="text-kraft mb-6" />
              <h3 className="display text-2xl font-semibold mb-2">{o.t}</h3>
              <p className="text-ink-soft text-sm leading-relaxed">{o.d}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* process */}
      <section className="bg-paper-2 border-y border-line py-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <div className="flex items-end justify-between mb-14">
            <div>
              <SectionLabel index="·" className="mb-5">How it works</SectionLabel>
              <Reveal as="h2" text="Four steps. No surprises." className="display text-[clamp(30px,5vw,64px)] font-semibold" />
            </div>
          </div>
          <ScrollTimeline steps={process} />
        </div>
      </section>

      {/* showcase */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionLabel index="·" className="mb-6">The result</SectionLabel>
            <Reveal as="h2" text="No two sites look alike." className="display text-[clamp(30px,5vw,60px)] font-semibold mb-6" />
            <p className="text-ink-soft leading-relaxed mb-8 max-w-md">
              Templates make every business look the same. We start from your brand and your goals — so your site looks like you, not like everyone else's homepage.
            </p>
            <Link to="/portfolio" className="inline-flex items-center gap-2 mono-label hover:text-kraft transition-colors link-draw">
              Browse the portfolio <IconArrowUpRight size={15} />
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
