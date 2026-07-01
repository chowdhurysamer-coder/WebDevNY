import { Link } from "react-router-dom";
import { Reveal, FadeUp, SectionLabel } from "@/components/primitives";
import { IconArrow } from "@/components/icons";
import { useLang } from "@/lib/i18n";

const sections = [
  { hKey: "pv2.s1.h", pKey: "pv2.s1.p" }, { hKey: "pv2.s2.h", pKey: "pv2.s2.p" },
  { hKey: "pv2.s3.h", pKey: "pv2.s3.p" }, { hKey: "pv2.s4.h", pKey: "pv2.s4.p" },
  { hKey: "pv2.s5.h", pKey: "pv2.s5.p" }, { hKey: "pv2.s6.h", pKey: "pv2.s6.p" },
  { hKey: "pv2.s7.h", pKey: "pv2.s7.p" },
];

export default function Privacy() {
  const { t } = useLang();
  return (
    <div className="bg-paper pt-16">
      <section className="max-w-[760px] mx-auto px-5 sm:px-8 pt-16 pb-10">
        <Link to="/" className="inline-flex items-center gap-2 mono-label text-ink-soft hover:text-kraft transition-colors mb-10 link-draw">
          <IconArrow size={15} className="rotate-180" /> {t("lg.home")}
        </Link>
        <SectionLabel index="·" className="mb-6">{t("lg.legal")}</SectionLabel>
        <h1 className="display text-[clamp(36px,7vw,80px)] font-semibold tracking-tightest mb-4">
          <Reveal text={t("pv2.title")} />
        </h1>
        <p className="mono-label text-ink-faint">{t("lg.updated")}</p>
      </section>

      <section className="max-w-[760px] mx-auto px-5 sm:px-8 pb-24">
        <div className="border-t border-line">
          {sections.map((s, i) => (
            <FadeUp key={s.hKey} delay={i * 0.04} className="border-b border-line py-7">
              <h2 className="display text-2xl font-semibold mb-3">{t(s.hKey)}</h2>
              <p className="text-ink-soft leading-relaxed">{t(s.pKey)}</p>
            </FadeUp>
          ))}
        </div>
        <p className="text-ink-faint text-sm mt-10 leading-relaxed">
          {t("pv2.disclaimer")}
        </p>
      </section>
    </div>
  );
}
