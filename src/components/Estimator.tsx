import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IconCheck, IconArrowUpRight } from "@/components/icons";
import { Magnetic } from "@/components/primitives";
import { BASE, MAX_PAGES, EXTRA_PAGE, ADDONS as addons, computeQuote } from "@/lib/pricing";
import { useLang } from "@/lib/i18n";

const ADDON_KEY: Record<string, string> = {
  cms: "es.addon.cms",
  booking: "es.addon.booking",
  seo: "es.addon.seo",
  multilang: "es.addon.multilang",
  gallery: "es.addon.gallery",
};

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
  const { t, num } = useLang();
  const [pages, setPages] = useState(BASE.pagesIncl);
  const [selected, setSelected] = useState<string[]>(["seo"]);

  const toggle = (id: string) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const { oneTime, monthly, daysLow, daysHigh, extraPages } = useMemo(() => computeQuote(pages, selected), [pages, selected]);
  const daysLabel = daysLow === daysHigh ? num(daysLow) : `${num(daysLow)}–${num(daysHigh)}`;

  const animTotal = useAnimatedNumber(oneTime);
  const animMonthly = useAnimatedNumber(monthly);

  return (
    <div className="card-paper p-6 sm:p-10 grid lg:grid-cols-[1.3fr_1fr] gap-8">
      {/* controls */}
      <div>
        {/* base package */}
        <div className="mono-label text-ink-faint mb-3">{num("01")}, {t("es.package")}</div>
        <div className="flex items-center justify-between gap-4 px-4 py-3 mb-2 bg-ink text-paper border border-ink">
          <span className="mono-label">{t("es.base")}</span>
          <span className="mono-label whitespace-nowrap">${num(BASE.oneTime)} + ${num(BASE.monthly)}{t("pr.perMo")}</span>
        </div>
        <p className="text-ink-soft text-xs leading-relaxed mb-8">{t("es.base.d")}</p>

        {/* pages */}
        <div className="flex items-center justify-between mb-3">
          <span className="mono-label text-ink-faint">{num("02")}, {t("es.pages")}</span>
          <span className="display text-2xl font-semibold">{num(pages)}</span>
        </div>
        <input type="range" min={BASE.pagesIncl} max={MAX_PAGES} value={pages} onChange={(e) => setPages(+e.target.value)}
          className="w-full accent-kraft mb-2 cursor-pointer" style={{ accentColor: "#C66E22" }} />
        <p className="mono-label text-ink-faint mb-8" style={{ fontSize: 9 }}>{t("pr.maxPages")}</p>

        {/* add-ons */}
        <div className="mono-label text-ink-faint mb-3">{num("03")}, {t("es.addons")}</div>
        <div className="grid sm:grid-cols-2 gap-2">
          {addons.map((a) => {
            const on = selected.includes(a.id);
            return (
              <button key={a.id} onClick={() => toggle(a.id)} data-cursor-label={on ? "REMOVE" : "ADD"}
                className={`flex items-center justify-between gap-2 px-4 py-3 border text-left transition-all ${on ? "bg-kraft text-paper border-kraft" : "border-line hover:border-ink"}`}>
                <span className="text-sm">
                  {t(ADDON_KEY[a.id])}
                  <span className={`block mono-label mt-0.5 ${on ? "text-paper/70" : "text-ink-faint"}`} style={{ fontSize: 9 }}>
                    ${num(a.oneTime)} + ${num(a.monthly)}{t("pr.perMo")}
                  </span>
                </span>
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
          <div className="flex justify-between text-sm mb-2"><span className="text-paper/60">{t("es.base")}</span><span>${num(BASE.oneTime)}</span></div>
          {extraPages > 0 && (
            <div className="flex justify-between text-sm mb-2"><span className="text-paper/60">+{num(extraPages)} {t("es.extraPages")}</span><span>${num((extraPages * EXTRA_PAGE.oneTime).toLocaleString())}</span></div>
          )}
          {addons.filter((a) => selected.includes(a.id)).map((a) => (
            <div key={a.id} className="flex justify-between text-sm mb-2"><span className="text-paper/60">{t(ADDON_KEY[a.id])}</span><span>${num(a.oneTime)}</span></div>
          ))}
        </div>

        <div className="relative mt-6">
          <div className="border-t border-dashed border-paper/25 pt-4">
            <div className="mono-label text-paper/50 mb-1">{t("es.total")}</div>
            <div className="display text-5xl font-semibold tabular-nums">${num(animTotal.toLocaleString())}</div>
            <div className="mono-label text-paper/70 mt-2 tabular-nums">
              + ${num(animMonthly)}{t("pr.perMo")} · {t("es.monthly")}
            </div>
            <motion.div key={daysLabel} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} className="mono-label text-kraft-soft mt-2">
              ≈ {daysLabel} {t("es.daysLaunch")}
            </motion.div>
          </div>
          <Magnetic className="mt-6 block">
            <Link to="/contact" data-cursor-label="GO"
              state={{ quote: {
                pages,
                addons: addons.filter((a) => selected.includes(a.id)).map((a) => t(ADDON_KEY[a.id])),
                oneTime, monthly, daysLow, daysHigh,
              } }}
              className="press inline-flex items-center justify-center gap-2 w-full py-3.5 bg-kraft text-paper mono-label">
              {t("es.lock")} <IconArrowUpRight size={14} />
            </Link>
          </Magnetic>
          <p className="mono-label text-paper/35 mt-3 text-center" style={{ fontSize: 9 }}>{t("es.note")}</p>
          <p className="mono-label text-paper/35 mt-1 text-center" style={{ fontSize: 9 }}>{t("es.domainNote")}</p>
        </div>
      </div>
    </div>
  );
}
