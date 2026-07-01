import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/primitives";
import { BoxCatchGame } from "@/components/BoxCatchGame";
import { IconArrowUpRight, IconArrow } from "@/components/icons";
import { useLang } from "@/lib/i18n";

export default function NotFound() {
  const { t } = useLang();
  return (
    <div className="bg-paper min-h-screen flex flex-col items-center justify-center px-5 pt-24 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 dotgrid opacity-40" />
      <div className="relative text-center max-w-lg">
        {/* lost package */}
        <motion.div initial={{ y: -20, opacity: 0, rotate: -6 }} animate={{ y: 0, opacity: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200 }}
          className="inline-block mb-8 box-float">
          <svg width="150" height="130" viewBox="0 0 150 130">
            <ellipse cx="75" cy="125" rx="58" ry="4" fill="rgba(33,27,21,0.2)" />
            <rect x="14" y="52" width="122" height="70" rx="3" fill="#C8843A" />
            <polygon points="14,52 14,122 5,113 5,44" fill="#9A5217" />
            <rect x="14" y="78" width="122" height="16" fill="#F0DCAE" opacity="0.55" />
            <text x="75" y="112" textAnchor="middle" fill="#9A5217" fontSize="11" fontFamily="'JetBrains Mono',monospace" fontWeight="700" letterSpacing="2">RETURN TO SENDER</text>
            {/* open flaps */}
            <polygon points="14,52 75,52 60,30 0,34" fill="#B5702A" />
            <polygon points="75,52 136,52 150,34 90,30" fill="#B5702A" />
            <text x="75" y="20" textAnchor="middle" fill="#9A5217" fontSize="9" fontFamily="'JetBrains Mono',monospace" letterSpacing="2" opacity="0.7">EMPTY</text>
          </svg>
        </motion.div>

        <div className="mono-label text-kraft mb-3">{t("nf.error")}</div>
        <h1 className="display text-[clamp(40px,9vw,90px)] font-semibold tracking-tightest mb-5">{t("nf.h1")}</h1>
        <p className="text-ink-soft mb-10">{t("nf.sub")}</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <Link to="/" data-cursor-label="HOME" className="card-paper-kraft press inline-flex items-center gap-2 px-6 py-4 mono-label">
              {t("nf.home")} <IconArrowUpRight size={15} />
            </Link>
          </Magnetic>
          <Link to="/portfolio" className="inline-flex items-center gap-2 mono-label hover:text-kraft transition-colors link-draw">
            <IconArrow size={15} className="rotate-180" /> {t("hero.work")}
          </Link>
        </div>
      </div>

      {/* mini-game */}
      <div className="relative w-full max-w-xl mt-14">
        <BoxCatchGame />
      </div>
    </div>
  );
}
