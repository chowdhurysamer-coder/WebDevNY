import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Reveal, FadeUp, SectionLabel, TiltCard } from "@/components/primitives";
import { SiteMock } from "@/components/SiteMock";
import { IconArrowUpRight, IconEye, IconPlay } from "@/components/icons";

type V = "restaurant" | "medical" | "gym" | "legal" | "ecommerce" | "realestate";

const templates: { id: string; v: V; title: string; cat: string; cvr: string; load: string; mobile: string }[] = [
  { id: "01", v: "restaurant", title: "Restaurant", cat: "Food & Beverage", cvr: "4.2%", load: "1.1s", mobile: "98" },
  { id: "02", v: "medical", title: "Medical Clinic", cat: "Healthcare", cvr: "5.8%", load: "0.9s", mobile: "99" },
  { id: "03", v: "gym", title: "Fitness Studio", cat: "Health & Fitness", cvr: "6.1%", load: "1.3s", mobile: "97" },
  { id: "04", v: "legal", title: "Law Firm", cat: "Legal", cvr: "3.4%", load: "0.8s", mobile: "100" },
  { id: "05", v: "ecommerce", title: "Boutique Shop", cat: "Retail", cvr: "2.9%", load: "1.4s", mobile: "96" },
  { id: "06", v: "realestate", title: "Real Estate", cat: "Property", cvr: "7.2%", load: "1.0s", mobile: "98" },
];

function Card({ t, i }: { t: typeof templates[0]; i: number }) {
  const [hover, setHover] = useState(false);
  return (
    <FadeUp delay={(i % 3) * 0.08}>
      <TiltCard className="card-paper overflow-hidden">
        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} data-cursor-label="DEMO">
        <div className="relative">
          <SiteMock variant={t.v} className="w-full" />
          <motion.div animate={{ opacity: hover ? 1 : 0 }} className="absolute inset-0 bg-ink/55 flex items-center justify-center gap-3">
            <span className="bg-paper text-ink px-3 py-2 mono-label inline-flex items-center gap-1.5"><IconEye size={13} /> Preview</span>
            <span className="bg-kraft text-paper px-3 py-2 mono-label inline-flex items-center gap-1.5"><IconPlay size={13} /> Live</span>
          </motion.div>
        </div>
        <div className="p-5 border-t border-line">
          <div className="flex items-center justify-between mb-4">
            <h3 className="display text-xl font-semibold">{t.title}</h3>
            <span className="mono-label text-ink-faint">{t.cat}</span>
          </div>
          <div className="grid grid-cols-3 border-t border-line pt-4">
            {[["CVR", t.cvr], ["Load", t.load], ["Mobile", t.mobile]].map(([l, v], j) => (
              <div key={l} className={`text-center ${j !== 0 ? "border-l border-line" : ""}`}>
                <div className="display text-2xl font-semibold text-kraft">{v}</div>
                <div className="mono-label text-ink-faint mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </TiltCard>
    </FadeUp>
  );
}

export default function Previews() {
  return (
    <div className="bg-paper pt-16">
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-20 pb-14 border-b border-line">
        <SectionLabel index="04" className="mb-8">Live previews</SectionLabel>
        <h1 className="display text-[clamp(44px,10vw,150px)] font-semibold tracking-tightest">
          <Reveal text="See it before" />
          <span className="italic text-kraft"><Reveal text="you commit." delay={0.15} /></span>
        </h1>
        <p className="text-ink-soft text-lg max-w-md leading-relaxed mt-8">
          Browse working starting points for every industry. Each one gets fully customized to your brand — these are the floor, not the ceiling.
        </p>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((t, i) => <Card key={t.id} t={t} i={i} />)}
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 pb-24">
        <div className="card-paper-kraft p-10 sm:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="relative">
            <Reveal as="h2" text="Don't see your industry?" className="display text-[clamp(28px,4.5vw,60px)] font-semibold justify-center mb-5" />
            <p className="text-paper/80 max-w-md mx-auto mb-8">We'll build a custom preview for your business — free, no strings attached.</p>
            <Link to="/contact" data-cursor-label="GO" className="inline-flex items-center gap-2 bg-ink text-paper px-7 py-4 mono-label press">
              Request a preview <IconArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
