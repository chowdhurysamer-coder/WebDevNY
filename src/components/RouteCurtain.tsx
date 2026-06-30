import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LogoMark } from "@/components/Logo";

const COLS = 5;

/** Navy panels sweep up across the screen on every route change. */
export function RouteCurtain() {
  const { pathname } = useLocation();
  const [playing, setPlaying] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    setPlaying(true);
    const t = setTimeout(() => setPlaying(false), 950);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <AnimatePresence>
      {playing && (
        <div className="fixed inset-0 z-[115] pointer-events-none flex">
          {Array.from({ length: COLS }).map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-navy"
              initial={{ y: "105%" }}
              animate={{ y: ["105%", "0%", "0%", "-105%"] }}
              transition={{ duration: 0.85, times: [0, 0.42, 0.5, 1], ease: [0.76, 0, 0.24, 1], delay: i * 0.05 }}
            />
          ))}
          {/* brand mark flashes in the middle of the sweep */}
          <motion.div
            className="absolute inset-0 grid place-items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 1.1] }}
            transition={{ duration: 0.85, times: [0.25, 0.45, 0.55, 0.8] }}
          >
            <LogoMark size={64} className="text-paper" bg="rgb(var(--c-navy))" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
