import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { sfx } from "@/lib/sfx";

const KEY = "webdevny_cookies";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try { stored = localStorage.getItem(KEY); } catch { /* ignore */ }
    if (!stored) {
      const t = setTimeout(() => setShow(true), 1600);
      return () => clearTimeout(t);
    }
  }, []);

  const decide = (v: "all" | "essential") => {
    try { localStorage.setItem(KEY, v); } catch { /* ignore */ }
    window.dispatchEvent(new Event("webdevny:consent"));
    sfx.tick();
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="fixed bottom-5 left-5 z-[56] max-w-sm card-paper p-5">
          <div className="mono-label text-kraft mb-2">Cookies</div>
          <p className="text-sm text-ink-soft leading-relaxed mb-4">
            We use a couple of cookies to remember your theme and keep the site running. No creepy tracking, promise.
            See our <Link to="/privacy" className="text-ink link-draw">privacy policy</Link>.
          </p>
          <div className="flex items-center gap-2">
            <button onClick={() => decide("all")} data-cursor-label="OK" className="card-paper-kraft press px-4 py-2.5 mono-label flex-1">Accept</button>
            <button onClick={() => decide("essential")} data-cursor-label="OK" className="border border-line hover:border-ink transition-colors px-4 py-2.5 mono-label">Essential only</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
