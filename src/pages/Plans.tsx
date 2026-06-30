import { Link } from "react-router-dom";
import { Reveal, FadeUp, SectionLabel, Magnetic } from "@/components/primitives";
import { IconCheck, IconArrowUpRight, IconRefresh, IconShield, IconHeadset } from "@/components/icons";

const features = [
  { icon: IconRefresh, t: "Regular updates", d: "Dependencies, CMS, and plugins kept current and secure — quietly, in the background." },
  { icon: IconShield, t: "Security monitoring", d: "Daily scans, firewall rules, and a real response plan if anything ever looks off." },
  { icon: IconHeadset, t: "Priority support", d: "Real people who already know your site — not a ticket number in a queue." },
];

const plans = [
  { name: "Basic Care", price: "199", featured: false,
    features: ["Monthly updates", "24/7 uptime monitoring", "Security scans", "Monthly performance report", "Email support"] },
  { name: "Pro Care", price: "499", featured: true,
    features: ["Everything in Basic", "2 hrs content updates / mo", "A/B test management", "SEO monitoring & fixes", "Priority phone & Slack", "Quarterly strategy call"] },
  { name: "Elite Care", price: "999", featured: false,
    features: ["Everything in Pro", "8 hrs development / mo", "New feature builds", "Custom reporting", "Dedicated account manager", "Monthly strategy sessions"] },
];

export default function Plans() {
  return (
    <div className="bg-paper pt-16">
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-20 pb-14 border-b border-line">
        <SectionLabel index="07" className="mb-8">Plans & Maintenance</SectionLabel>
        <h1 className="display text-[clamp(44px,10vw,150px)] font-semibold tracking-tightest">
          <Reveal text="Your site is alive." />
          <span className="italic text-kraft"><Reveal text="Keep it that way." delay={0.15} /></span>
        </h1>
        <p className="text-ink-soft text-lg max-w-md leading-relaxed mt-8">
          A launched site isn't a finished one. Our care plans keep yours fast, secure, and improving — without you lifting a finger.
        </p>
      </section>

      {/* why */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-16">
        <div className="grid md:grid-cols-3 border-t border-l border-line">
          {features.map((f, i) => (
            <FadeUp key={f.t} delay={i * 0.1} className="border-r border-b border-line p-8">
              <f.icon size={30} className="text-kraft mb-6" />
              <h3 className="display text-2xl font-semibold mb-2">{f.t}</h3>
              <p className="text-ink-soft text-sm leading-relaxed">{f.d}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* plans */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-8 pb-20">
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((p, i) => (
            <FadeUp key={p.name} delay={i * 0.1} className="flex">
              <div className={`flex flex-col w-full p-8 ${p.featured ? "card-paper-kraft" : "card-paper"}`}>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="display text-3xl font-semibold">{p.name}</h2>
                  {p.featured && <span className="mono-label bg-ink text-paper px-2.5 py-1">Popular</span>}
                </div>
                <div className="flex items-baseline gap-1 mb-7">
                  <span className={`text-lg ${p.featured ? "text-paper/60" : "text-ink-faint"}`}>$</span>
                  <span className="display text-6xl font-semibold">{p.price}</span>
                  <span className={`mono-label ml-1 ${p.featured ? "text-paper/60" : "text-ink-faint"}`}>/ mo</span>
                </div>
                <div className={`h-px mb-6 ${p.featured ? "bg-paper/20" : "bg-line"}`} />
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <IconCheck size={16} className={p.featured ? "text-paper" : "text-kraft"} /> {f}
                    </li>
                  ))}
                </ul>
                <Magnetic>
                  <Link to="/contact" data-cursor-label="GO" className={`press inline-flex items-center justify-center gap-2 w-full py-4 mono-label ${p.featured ? "bg-ink text-paper" : "card-paper-kraft"}`}>
                    Get {p.name} <IconArrowUpRight size={14} />
                  </Link>
                </Magnetic>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 pb-24">
        <div className="card-paper p-10 sm:p-14 text-center">
          <Reveal as="h2" text="Already a client?" className="display text-[clamp(28px,4.5vw,56px)] font-semibold justify-center mb-5" />
          <p className="text-ink-soft max-w-lg mx-auto mb-8">
            Every WebDev NY build comes with 30 days of free support after launch. A care plan simply keeps the momentum going from there.
          </p>
          <Link to="/contact" data-cursor-label="GO" className="card-paper-kraft press inline-flex items-center gap-2 px-7 py-4 mono-label">
            Talk to us <IconArrowUpRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
