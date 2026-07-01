import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IconCheck, IconArrowUpRight } from "@/components/icons";
import { Magnetic } from "@/components/primitives";
import { TIERS as tiers, ADDONS as addons, computeQuote, type Tier } from "@/lib/pricing";
import { useLang } from "@/lib/i18n";

const TIER_KEY: Record<Tier, string> = { Starter: "pr.plan.starter", Growth: "pr.plan.growth", Elite: "pr.plan.elite" };
const ADDON_KEY: Record<string, string> = { ecom: "es.addon.ecom", booking: "es.addon.booking", cms: "es.addon.cms", seo: "es.addon.seo", brand: "es.addon.brand", copy: "es.addon.copy" };

function useAnimatedNumber(value: number) {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  useEffect(() => {
    let raf = 0; const from = fromRef.current, to = value, start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 450);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = Math.round(from + (to - from) * eased);
      setDisplay(cur); fromRef.current = cur;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return display;
}

export function Estimator() {
  const { t } = useLang();
  const [tier, setTier] = useState<Tier>("Growth");
  const [pages, setPages] = useState(8);
  const [selected, setSelected] = useState<string[]>(["seo"]);

  const toggle = (id: string) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const { total, days } = useMemo(() => computeQuote(tier, pages, selected), [tier, pages, selected]);

  const animTotal = useAnimatedNumber(total);

  return (
    <div className="card-paper p-6 sm:p-10 grid lg:grid-cols-[1.3fr_1fr] gap-8">
      {/* controls */}
      <div>
        {/* tier */}
        <div className="mono-label text-ink-faint mb-3">01, {t("es.package")}</div>
        <div className="grid grid-cols-3 gap-2 mb-8">
          {(Object.keys(tiers) as Tier[]).map((tk) => (
            <button key={tk} onClick={() => setTier(tk)} data-cursor-label="PICK"
              className={`py-3 mono-label border transition-all ${tier === tk ? "bg-ink text-paper border-ink" : "border-line hover:border-ink"}`}>
              {t(TIER_KEY[tk])}
            </button>
          ))}
        </div>

        {/* pages */}
        <div className="flex items-center justify-between mb-3">
          <span className="mono-label text-ink-faint">02, {t("es.pages")}</span>
          <span className="display text-2xl font-semibold">{pages}</span>
        </div>
        <input type="range" min={1} max={40} value={pages} onChange={(e) => setPages(+e.target.value)}
          className="w-full accent-kraft mb-8 cursor-pointer" style={{ accentColor: "#C66E22" }} />

        {/* add-ons */}
        <div className="mono-label text-ink-faint mb-3">03, {t("es.addons")}</div>
        <div className="grid sm:grid-cols-2 gap-2">
          {addons.map((a) => {
            const on = selected.includes(a.id);
            return (
              <button key={a.id} onClick={() => toggle(a.id)} data-cursor-label={on ? "REMOVE" : "ADD"}
                className={`flex items-center justify-between gap-2 px-4 py-3 border text-left transition-all ${on ? "bg-kraft text-paper border-kraft" : "border-line hover:border-ink"}`}>
                <span className="text-sm">{t(ADDON_KEY[a.id])}</span>
                <span className={`w-5 h-5 shrink-0 grid place-items-center border ${on ? "bg-paper border-paper text-kraft" : "border-ink/30"}`}>
                  {on && <IconCheck size={13} />}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* receipt */}
      <div className="bg-ink text-paper p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="relative">
          <div className="flex items-center justify-between mono-label text-paper/50 border-b border-paper/15 pb-3 mb-4">
            <span>{t("es.estimate")}</span><span>WEBDEV NY</span>
          </div>
          <div className="flex justify-between text-sm mb-2"><span className="text-paper/60">{t(TIER_KEY[tier])} {t("es.pkgSuffix")}</span><span>${tiers[tier].base.toLocaleString()}</span></div>
          {pages > tiers[tier].pagesIncl && (
            <div className="flex justify-between text-sm mb-2"><span className="text-paper/60">+{pages - tiers[tier].pagesIncl} {t("es.extraPages")}</span><span>${((pages - tiers[tier].pagesIncl) * 220).toLocaleString()}</span></div>
          )}
          {addons.filter((a) => selected.includes(a.id)).map((a) => (
            <div key={a.id} className="flex justify-between text-sm mb-2"><span className="text-paper/60">{t(ADDON_KEY[a.id])}</span><span>${a.price.toLocaleString()}</span></div>
          ))}
        </div>

        <div className="relative mt-6">
          <div className="border-t border-dashed border-paper/25 pt-4">
            <div className="mono-label text-paper/50 mb-1">{t("es.total")}</div>
            <div className="display text-5xl font-semibold tabular-nums">${animTotal.toLocaleString()}</div>
            <motion.div key={days} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} className="mono-label text-kraft-soft mt-2">
              ≈ {days} {t("es.daysLaunch")}
            </motion.div>
          </div>
          <Magnetic className="mt-6 block">
            <Link to="/contact" data-cursor-label="GO"
              state={{ quote: {
                tier, pages,
                addons: addons.filter((a) => selected.includes(a.id)).map((a) => t(ADDON_KEY[a.id])),
                total, days,
              } }}
              className="press inline-flex items-center justify-center gap-2 w-full py-3.5 bg-kraft text-paper mono-label">
              {t("es.lock")} <IconArrowUpRight size={14} />
            </Link>
          </Magnetic>
          <p className="mono-label text-paper/35 mt-3 text-center" style={{ fontSize: 9 }}>{t("es.note")}</p>
        </div>
      </div>
    </div>
  );
}
