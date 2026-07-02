import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
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

  // Touch devices can't move a cursor to light the box, so we light it
  // statically instead (see the lighting layers below). Initialised from
  // matchMedia so there's no first-paint flash of the desktop torch.
  const [isTouch] = useState(() => typeof window !== "undefined" && window.matchMedia("(hover: none)").matches);

  // mouse-follow spotlight
  const mx = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const my = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);
  const sx = useSpring(mx, { stiffness: 250, damping: 30, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 250, damping: 30, mass: 0.4 });
  useEffect(() => {
    const move = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my]);
  // warm torch glow + darkening vignette that reveal the box near the cursor
  const glow = useMotionTemplate`radial-gradient(circle 300px at ${sx}px ${sy}px, rgba(255,214,150,0.22), rgba(255,180,90,0.06) 40%, transparent 68%)`;
  const torch = useMotionTemplate`radial-gradient(circle 260px at ${sx}px ${sy}px, transparent 0%, transparent 34%, rgba(0,0,0,0.55) 66%, rgba(0,0,0,0.82) 100%)`;

  // box tones
  const top = "#D08A3E", mid = "#BE742B", dark = "#9A5217", tape = "#F0DCAE";
  const lidOpen = phase !== "idle";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden cursor-none-fine"
      style={{ background: "#050505" }}>

      {/* faint light dot grid */}
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

      {/* warm glow — follows the cursor on desktop, static & centered on touch */}
      {phase === "idle" && (isTouch
        ? <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle 360px at 50% 50%, rgba(255,214,150,0.30), rgba(255,180,90,0.09) 42%, transparent 72%)", mixBlendMode: "screen" }} />
        : <motion.div className="absolute inset-0 pointer-events-none" style={{ background: glow, mixBlendMode: "screen" }} />
      )}

      {/* floating ambient motes (light) */}
      {[...Array(14)].map((_, i) => (
        <motion.span key={i} className="absolute rounded-full"
          style={{ width: 3 + (i % 3) * 2, height: 3 + (i % 3) * 2, background: i % 2 ? "rgba(240,192,120,0.5)" : "rgba(255,255,255,0.25)", left: `${8 + (i * 6.5) % 84}%`, top: `${12 + (i * 13) % 76}%` }}
          animate={{ y: [0, -18, 0], opacity: [0.1, 0.6, 0.1] }}
          transition={{ duration: 4 + (i % 4), repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      {/* corner ship marks (light) */}
      <motion.div animate={{ opacity: lidOpen ? 0 : 0.4 }} className="absolute top-7 left-7 font-mono text-[10px] text-white/60 leading-relaxed hidden sm:block z-30">
        PKG 01 / 01<br />HANDLE WITH CARE<br />WEBDEV NY · NYC
      </motion.div>
      <motion.div animate={{ opacity: lidOpen ? 0 : 0.4 }} className="absolute top-7 right-7 font-mono text-[10px] text-white/60 text-right leading-relaxed hidden sm:block z-30">
        EST. 2025<br />HANDLE WITH CARE<br />████ ██ ████
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

      {/* glow under box */}
      <motion.div className="absolute rounded-full" style={{ width: 170, height: 34, background: "radial-gradient(ellipse, rgba(198,110,34,0.3) 0%, transparent 70%)", bottom: "calc(50% - 78px)", filter: "blur(8px)" }}
        animate={phase === "idle" ? { opacity: [0.35, 0.7, 0.35] } : { opacity: 0 }} transition={{ duration: 2.2, repeat: Infinity }} />

      {/* ───── THE BOX (small, centered) ───── */}
      <motion.div
        className={`relative z-10 cursor-pointer select-none ${phase === "idle" ? "box-float" : ""}`}
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

      {/* darkening vignette — cursor-tracked on desktop, static & centered on
          touch so the box stays lit without a pointer */}
      {phase === "idle" && (isTouch
        ? <div className="absolute inset-0 z-20 pointer-events-none" style={{ background: "radial-gradient(circle 340px at 50% 50%, transparent 0%, transparent 44%, rgba(0,0,0,0.5) 74%, rgba(0,0,0,0.82) 100%)" }} />
        : <motion.div className="absolute inset-0 z-20 pointer-events-none" style={{ background: torch }} exit={{ opacity: 0 }} />
      )}

      {/* torch cursor dot (desktop only — no fake cursor on touch) */}
      {phase === "idle" && !isTouch && (
        <motion.div className="absolute z-40 pointer-events-none -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
          style={{ left: sx, top: sy, background: "radial-gradient(circle, rgba(255,235,190,0.9), rgba(255,200,120,0.2))", boxShadow: "0 0 18px rgba(255,210,140,0.8)" }} />
      )}

      {/* hint (above torch) */}
      <AnimatePresence>
        {phase === "idle" && (
          <motion.p
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: hovered ? 1 : 0.75, y: 0 }} exit={{ opacity: 0 }}
            className="absolute z-40 font-mono text-[11px] tracking-[0.35em] uppercase text-[rgb(226,226,226)] select-none"
            style={{ bottom: "calc(50% - 130px)" }}>
            {hovered ? "open it →" : isTouch ? "tap to unbox" : "move the light · click to unbox"}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
