import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Reveal, FadeUp, SectionLabel, TiltCard } from "@/components/primitives";
import { SiteMock } from "@/components/SiteMock";
import { IconArrowUpRight, IconEye, IconPlay } from "@/components/icons";
import { useLang } from "@/lib/i18n";

type V = "restaurant" | "medical" | "gym" | "legal" | "ecommerce" | "realestate";

const templates: { id: string; v: V; titleKey: string; catKey: string; cvr: string; load: string; mobile: string }[] = [
  { id: "01", v: "restaurant", titleKey: "pv.tpl.restaurant", catKey: "pv.c.food", cvr: "4.2%", load: "1.1s", mobile: "98" },
  { id: "02", v: "medical", titleKey: "pv.tpl.medical", catKey: "pv.c.healthcare", cvr: "5.8%", load: "0.9s", mobile: "99" },
  { id: "03", v: "gym", titleKey: "pv.tpl.gym", catKey: "pv.c.fitness", cvr: "6.1%", load: "1.3s", mobile: "97" },
  { id: "04", v: "legal", titleKey: "pv.tpl.legal", catKey: "pv.c.legal", cvr: "3.4%", load: "0.8s", mobile: "100" },
  { id: "05", v: "ecommerce", titleKey: "pv.tpl.ecommerce", catKey: "pv.c.retail", cvr: "2.9%", load: "1.4s", mobile: "96" },
  { id: "06", v: "realestate", titleKey: "pv.tpl.realestate", catKey: "pv.c.property", cvr: "7.2%", load: "1.0s", mobile: "98" },
];

function Card({ tpl, i }: { tpl: typeof templates[0]; i: number }) {
  const { t, num } = useLang();
  const [hover, setHover] = useState(false);
  return (
    <FadeUp delay={(i % 3) * 0.08}>
      <TiltCard className="card-paper overflow-hidden">
        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} data-cursor-label="DEMO">
        <div className="relative">
          <SiteMock variant={tpl.v} className="w-full" />
          <motion.div animate={{ opacity: hover ? 1 : 0 }} className="absolute inset-0 bg-ink/55 flex items-center justify-center gap-3">
            <span className="bg-paper text-ink px-3 py-2 mono-label inline-flex items-center gap-1.5"><IconEye size={13} /> {t("pv.preview")}</span>
            <span className="bg-kraft text-paper px-3 py-2 mono-label inline-flex items-center gap-1.5"><IconPlay size={13} /> {t("pv.live")}</span>
          </motion.div>
        </div>
        <div className="p-5 border-t border-line">
          <div className="flex items-center justify-between mb-4">
            <h3 className="display text-xl font-semibold">{t(tpl.titleKey)}</h3>
            <span className="mono-label text-ink-faint">{t(tpl.catKey)}</span>
          </div>
          <div className="grid grid-cols-3 border-t border-line pt-4">
            {[["pv.cvr", tpl.cvr], ["pv.load", tpl.load], ["pv.mobile", tpl.mobile]].map(([l, v], j) => (
              <div key={l} className={`text-center ${j !== 0 ? "border-l border-line" : ""}`}>
                <div className="display text-2xl font-semibold text-kraft">{num(v)}</div>
                <div className="mono-label text-ink-faint mt-1">{t(l)}</div>
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
  const { t } = useLang();
  return (
    <div className="bg-paper pt-16">
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-20 pb-14 border-b border-line">
        <SectionLabel index="04" className="mb-8">{t("pv.eyebrow")}</SectionLabel>
        <h1 className="display text-[clamp(44px,10vw,150px)] font-semibold tracking-tightest">
          <Reveal text={t("pv.h1a")} />
          <span className="italic text-kraft"><Reveal text={t("pv.h1b")} delay={0.15} /></span>
        </h1>
        <p className="text-ink-soft text-lg max-w-md leading-relaxed mt-8">
          {t("pv.sub")}
        </p>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((tpl, i) => <Card key={tpl.id} tpl={tpl} i={i} />)}
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 pb-24">
        <div className="card-paper-kraft p-10 sm:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="relative">
            <Reveal as="h2" text={t("pv.noIndustry")} className="display text-[clamp(28px,4.5vw,60px)] font-semibold justify-center mb-5" />
            <p className="text-paper/80 max-w-md mx-auto mb-8">{t("pv.noIndustry.d")}</p>
            <Link to="/contact" data-cursor-label="GO" className="inline-flex items-center gap-2 bg-ink text-paper px-7 py-4 mono-label press">
              {t("pv.request")} <IconArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
