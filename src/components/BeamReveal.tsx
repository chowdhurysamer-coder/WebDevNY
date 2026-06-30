import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sfx } from "@/lib/sfx";

/**
 * Unboxing intro:
 * idle → (click) → lid flips → light beam erupts → radial bloom whites out
 * the screen → onComplete() fires when fully white (parent reveals the site).
 */
export function BeamReveal({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"idle" | "opening" | "beam">("idle");
  const [hovered, setHovered] = useState(false);

  const open = () => {
    if (phase !== "idle") return;
    setPhase("opening");
    sfx.pop();
    setTimeout(() => { setPhase("beam"); sfx.whoosh(); }, 480);
    setTimeout(() => sfx.chime(), 480 + 850);
    setTimeout(onComplete, 480 + 1500);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") open(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);

  // box tones
  const top = "#D08A3E", mid = "#BE742B", dark = "#9A5217", tape = "#F0DCAE";
  const lidOpen = phase !== "idle";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ background: "radial-gradient(120% 100% at 50% 45%, #FFFDF8 0%, #F3ECDD 55%, #E8DECB 100%)" }}>

      {/* faint dot grid */}
      <div className="absolute inset-0 dotgrid opacity-60" />

      {/* floating ambient motes */}
      {[...Array(14)].map((_, i) => (
        <motion.span key={i} className="absolute rounded-full"
          style={{ width: 4 + (i % 3) * 2, height: 4 + (i % 3) * 2, background: i % 2 ? "rgba(198,110,34,0.4)" : "rgba(33,27,21,0.18)", left: `${8 + (i * 6.5) % 84}%`, top: `${12 + (i * 13) % 76}%` }}
          animate={{ y: [0, -18, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 4 + (i % 4), repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      {/* corner ship marks */}
      <motion.div animate={{ opacity: lidOpen ? 0 : 0.45 }} className="absolute top-7 left-7 font-mono text-[10px] text-ink/50 leading-relaxed hidden sm:block">
        PKG 01 / 01<br />HANDLE WITH CARE<br />WEBDEV NY · NYC
      </motion.div>
      <motion.div animate={{ opacity: lidOpen ? 0 : 0.45 }} className="absolute top-7 right-7 font-mono text-[10px] text-ink/50 text-right leading-relaxed hidden sm:block">
        EST. 2024<br />40.7° N, 74.0° W<br />████ ██ ████
      </motion.div>

      {/* ───── BEAM STACK (behind/over box) ───── */}
      <AnimatePresence>
        {phase === "beam" && (
          <>
            {/* radial bloom that grows to white-out the screen */}
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, #ffffff 0%, #FFF6E6 35%, rgba(255,240,210,0) 70%)", left: "50%", top: "50%", x: "-50%", y: "-50%" }}
              initial={{ width: 40, height: 40, opacity: 0.9 }}
              animate={{ width: 3200, height: 3200, opacity: 1 }}
              transition={{ duration: 1.4, ease: [0.5, 0, 0.7, 1] }}
            />
            {/* vertical god-ray cone */}
            <motion.div
              className="absolute pointer-events-none"
              style={{ left: "50%", top: "50%", x: "-50%", y: "-100%", width: 240, height: 620, background: "linear-gradient(to top, rgba(255,238,200,0.95), rgba(255,245,225,0.5) 40%, rgba(255,255,255,0))", clipPath: "polygon(42% 100%, 58% 100%, 100% 0%, 0% 0%)", filter: "blur(6px)", mixBlendMode: "screen" }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1.4, opacity: [0, 1, 0.8] }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
            {/* rotating light streaks */}
            <motion.div
              className="absolute pointer-events-none"
              style={{ left: "50%", top: "50%", x: "-50%", y: "-50%", width: 700, height: 700, background: "conic-gradient(from 0deg, transparent 0deg, rgba(255,225,170,0.55) 12deg, transparent 24deg, transparent 60deg, rgba(255,235,200,0.4) 72deg, transparent 84deg, transparent 180deg, rgba(255,225,170,0.5) 192deg, transparent 204deg, transparent 300deg, rgba(255,235,200,0.4) 312deg, transparent 324deg)", filter: "blur(3px)", mixBlendMode: "screen" }}
              initial={{ scale: 0, opacity: 0, rotate: 0 }}
              animate={{ scale: 2.2, opacity: [0, 0.9, 0], rotate: 60 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
            {/* spark particles */}
            {[...Array(22)].map((_, i) => {
              const ang = (i / 22) * Math.PI * 2;
              const dist = 160 + Math.random() * 260;
              return (
                <motion.span key={i} className="absolute rounded-full pointer-events-none"
                  style={{ left: "50%", top: "50%", width: 3 + Math.random() * 4, height: 3 + Math.random() * 4, background: i % 3 === 0 ? "#fff" : "#F0C078", boxShadow: "0 0 8px rgba(255,210,140,0.9)" }}
                  initial={{ x: "-50%", y: "-50%", opacity: 1, scale: 0 }}
                  animate={{ x: `calc(-50% + ${Math.cos(ang) * dist}px)`, y: `calc(-50% + ${Math.sin(ang) * dist}px)`, opacity: 0, scale: 1.5 }}
                  transition={{ duration: 1 + Math.random() * 0.5, ease: "easeOut" }}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* hint */}
      <AnimatePresence>
        {phase === "idle" && (
          <motion.p
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: hovered ? 1 : 0.55, y: 0 }} exit={{ opacity: 0 }}
            className="absolute font-mono text-[11px] tracking-[0.35em] uppercase text-ink/60 select-none"
            style={{ bottom: "calc(50% - 130px)" }}
          >
            {hovered ? "open it →" : "click to unbox"}
          </motion.p>
        )}
      </AnimatePresence>

      {/* glow under box */}
      <motion.div className="absolute rounded-full" style={{ width: 170, height: 34, background: "radial-gradient(ellipse, rgba(198,110,34,0.3) 0%, transparent 70%)", bottom: "calc(50% - 78px)", filter: "blur(8px)" }}
        animate={phase === "idle" ? { opacity: [0.4, 0.85, 0.4] } : { opacity: 0 }} transition={{ duration: 2.2, repeat: Infinity }} />

      {/* ───── THE BOX (small, centered) ───── */}
      <motion.div
        className={`relative cursor-pointer select-none ${phase === "idle" ? "box-float" : ""}`}
        data-cursor-label="OPEN"
        style={{ width: 124, height: 108 }}
        whileHover={{ scale: phase === "idle" ? 1.06 : 1 }}
        animate={phase === "beam" ? { scale: [1, 1.1, 0.2], opacity: [1, 1, 0] } : {}}
        transition={phase === "beam" ? { duration: 1.2, ease: [0.5, 0, 0.7, 1] } : { type: "spring", stiffness: 300 }}
        onClick={open}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        <svg width="124" height="108" viewBox="0 0 124 108" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="62" cy="105" rx="54" ry="3.5" fill="rgba(33,27,21,0.28)" />
          {/* body */}
          <rect x="10" y="44" width="104" height="60" rx="2.5" fill={top} />
          <polygon points="10,44 10,104 3,96 3,38" fill={dark} />
          <rect x="94" y="44" width="20" height="60" fill={mid} opacity="0.5" />
          <rect x="10" y="66" width="104" height="14" fill={tape} opacity="0.55" />
          <text x="62" y="94" textAnchor="middle" fill={dark} fontSize="9" fontFamily="'JetBrains Mono',monospace" fontWeight="700" letterSpacing="2">WEBDEV NY</text>

          {/* inner light (appears as lid opens) */}
          <motion.rect x="14" y="30" width="96" height="20" rx="2" fill="#FFF3D6"
            initial={{ opacity: 0 }} animate={{ opacity: lidOpen ? 1 : 0 }} transition={{ duration: 0.3, delay: 0.15 }} />

          {/* lid */}
          <motion.g style={{ transformOrigin: "62px 44px", transformBox: "fill-box" }}
            animate={phase !== "idle" ? { rotateX: -150 } : hovered ? { rotateX: -20 } : { rotateX: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
            <rect x="10" y="12" width="104" height="34" rx="2" fill={top} />
            <polygon points="10,12 10,46 3,38 3,6" fill={dark} />
            <rect x="10" y="12" width="104" height="4" fill="rgba(255,255,255,0.12)" />
            <rect x="10" y="25" width="104" height="10" fill={tape} opacity="0.5" />
            <line x1="62" y1="12" x2="62" y2="46" stroke={dark} strokeWidth="1.2" opacity="0.45" strokeDasharray="4 3" />
            <text x="62" y="33" textAnchor="middle" fill={dark} fontSize="7" fontFamily="'JetBrains Mono',monospace" fontWeight="700" letterSpacing="2" opacity="0.85">FRAGILE</text>
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
}
