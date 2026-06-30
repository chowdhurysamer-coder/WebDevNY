import { useEffect } from "react";
import { motion } from "framer-motion";
import { LogoMark } from "@/components/Logo";

/** Brief animated logo loader shown on repeat visits (intro already seen). */
export function LogoLoader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1150);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-paper"
      exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div className="absolute inset-0 dotgrid opacity-40" />

      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex items-center gap-4">
        <motion.span initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 240, damping: 16, delay: 0.1 }}>
          <LogoMark size={60} className="text-navy" animated />
        </motion.span>
        <div className="overflow-hidden">
          <motion.span className="display text-4xl sm:text-5xl font-semibold block"
            initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>
            WebDev<span className="text-kraft">.</span>NY
          </motion.span>
        </div>
      </motion.div>

      <motion.div className="relative mt-8 h-px w-44 bg-line overflow-hidden">
        <motion.div className="absolute inset-y-0 left-0 bg-kraft" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1, ease: "easeInOut" }} />
      </motion.div>
    </motion.div>
  );
}
