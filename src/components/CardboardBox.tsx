import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CardboardBoxProps { onOpen: () => void; }

export function CardboardBox({ onOpen }: CardboardBoxProps) {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    if (clicked) return;
    setClicked(true);
    setTimeout(onOpen, 1500);
  };

  // kraft cardboard tones
  const top = "#C8843A";
  const mid = "#B5702A";
  const dark = "#8F4D18";
  const tape = "#E3CF9E";

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink overflow-hidden">
      {/* faint workshop grid */}
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "44px 44px" }} />

      {/* shipping label top-left */}
      <motion.div
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: clicked ? 0 : 0.6, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-8 left-8 font-mono text-[10px] text-paper/40 leading-relaxed hidden sm:block"
      >
        SHIP TO: ____________<br />
        FROM: WEBDEV NY — NYC<br />
        PKG 01 / 01 · HANDLE WITH CARE
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: clicked ? 0 : 0.6, y: 0 }}
        transition={{ delay: 0.4 }}
        className="absolute top-8 right-8 font-mono text-[10px] text-paper/40 text-right leading-relaxed hidden sm:block"
      >
        EST. 2024<br />
        NEW YORK, NY<br />
        ████ ██ ████
      </motion.div>

      {/* glow */}
      <motion.div
        className="absolute rounded-full"
        style={{ width: 260, height: 50, background: "radial-gradient(ellipse, rgba(200,132,58,0.22) 0%, transparent 70%)", bottom: "calc(50% - 130px)", filter: "blur(10px)" }}
        animate={!clicked ? { opacity: [0.4, 0.85, 0.4] } : { opacity: 0 }}
        transition={{ duration: 2.2, repeat: Infinity }}
      />

      <AnimatePresence>
        {!clicked && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: hovered ? 1 : 0.45, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute font-mono text-[11px] tracking-[0.3em] uppercase text-paper/60 select-none"
            style={{ bottom: "calc(50% - 175px)" }}
          >
            {hovered ? "open the box →" : "click to unbox"}
          </motion.p>
        )}
      </AnimatePresence>

      <motion.div
        className={`relative cursor-pointer select-none ${!clicked ? "box-float" : ""}`}
        data-cursor-label="OPEN"
        style={{ width: 200, height: 170 }}
        whileHover={{ scale: clicked ? 1 : 1.05 }}
        animate={clicked ? { scale: [1, 1.12, 0], y: [0, -20, 90], opacity: [1, 1, 0] } : {}}
        transition={clicked ? { duration: 1.3, ease: [0.22, 1, 0.36, 1] } : { type: "spring", stiffness: 300 }}
        onClick={handleClick}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        <svg width="200" height="170" viewBox="0 0 200 170" xmlns="http://www.w3.org/2000/svg">
          {/* ground shadow */}
          <ellipse cx="100" cy="166" rx="86" ry="5" fill="rgba(0,0,0,0.45)" />

          {/* body */}
          <rect x="16" y="70" width="168" height="96" rx="3" fill={top} />
          <polygon points="16,70 16,166 4,154 4,60" fill={dark} />
          <rect x="150" y="70" width="34" height="96" fill={mid} opacity="0.5" />
          {/* corrugation hint */}
          <rect x="4" y="60" width="12" height="94" fill={dark} />
          <line x1="10" y1="62" x2="10" y2="152" stroke="#000" strokeWidth="0.5" opacity="0.2" />

          {/* body tape */}
          <rect x="16" y="104" width="168" height="22" fill={tape} opacity="0.55" />
          <line x1="16" y1="110" x2="184" y2="110" stroke="#fff" strokeWidth="0.5" opacity="0.3" />
          <line x1="16" y1="120" x2="184" y2="120" stroke="#fff" strokeWidth="0.5" opacity="0.3" />

          {/* printed marks */}
          <text x="100" y="148" textAnchor="middle" fill={dark} fontSize="13" fontFamily="'JetBrains Mono',monospace" fontWeight="700" letterSpacing="3">WEBDEV NY</text>
          <g opacity="0.55" stroke={dark} strokeWidth="1.4" fill="none">
            {/* this-way-up arrows */}
            <path d="M30 132 l5 -7 l5 7 M35 125 v10" />
            <path d="M160 132 l5 -7 l5 7 M165 125 v10" />
          </g>

          {/* lid */}
          <motion.g
            style={{ transformOrigin: "100px 70px", transformBox: "fill-box" }}
            animate={clicked ? { rotateX: -148 } : hovered ? { rotateX: -22 } : { rotateX: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <rect x="16" y="18" width="168" height="56" rx="2" fill={top} />
            <polygon points="16,18 16,74 4,62 4,8" fill={dark} />
            <rect x="16" y="18" width="168" height="6" fill="rgba(255,255,255,0.1)" />
            <rect x="16" y="40" width="168" height="16" fill={tape} opacity="0.5" />
            <line x1="100" y1="18" x2="100" y2="74" stroke={dark} strokeWidth="1.4" opacity="0.45" strokeDasharray="5 4" />
            <text x="100" y="34" textAnchor="middle" fill={tape} fontSize="9" fontFamily="'JetBrains Mono',monospace" letterSpacing="4" opacity="0.8">✦ ✦ ✦</text>
            <text x="100" y="60" textAnchor="middle" fill={dark} fontSize="10" fontFamily="'JetBrains Mono',monospace" fontWeight="700" letterSpacing="3" opacity="0.85">FRAGILE</text>
          </motion.g>
        </svg>

        {/* unboxing burst */}
        <AnimatePresence>
          {clicked && [...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none"
              style={{ left: "50%", top: "32%", color: i % 2 ? "#E3CF9E" : "#C8843A", fontSize: 16 }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
              animate={{
                x: Math.cos((i / 10) * Math.PI * 2) * (70 + Math.random() * 50),
                y: Math.sin((i / 10) * Math.PI * 2) * (70 + Math.random() * 50) - 30,
                opacity: 0, scale: 1.4, rotate: 180,
              }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            >
              ✦
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
