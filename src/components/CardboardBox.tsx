import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CardboardBoxProps {
  onOpen: () => void;
}

export function CardboardBox({ onOpen }: CardboardBoxProps) {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    if (clicked) return;
    setClicked(true);
    setTimeout(onOpen, 1400);
  };

  const brown = "#C4842A";
  const brownDark = "#9B6520";
  const brownMid = "#B5781F";
  const tape = "#E8D5A0";

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black">
      {/* Ambient glow under box */}
      <motion.div
        className="absolute rounded-full"
        style={{ width: 220, height: 40, background: "radial-gradient(ellipse, rgba(196,132,42,0.25) 0%, transparent 70%)", bottom: "calc(50% - 120px)", filter: "blur(8px)" }}
        animate={!clicked ? { opacity: [0.4, 0.8, 0.4] } : { opacity: 0 }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Hint text */}
      <AnimatePresence>
        {!clicked && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: hovered ? 1 : 0.4, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="absolute text-white/40 text-sm tracking-widest uppercase font-barlow select-none"
            style={{ bottom: "calc(50% - 160px)" }}
          >
            click to open
          </motion.p>
        )}
      </AnimatePresence>

      {/* The Box */}
      <motion.div
        className={`relative cursor-pointer select-none ${!clicked ? "box-float" : ""}`}
        style={{ width: 160, height: 140 }}
        whileHover={{ scale: clicked ? 1 : 1.06 }}
        animate={clicked ? { scale: [1, 1.15, 0], opacity: [1, 1, 0], y: [0, -20, 80] } : {}}
        transition={clicked ? { duration: 1.2, ease: [0.22, 1, 0.36, 1] } : { type: "spring", stiffness: 300 }}
        onClick={handleClick}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        <svg width="160" height="140" viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Box body front */}
          <rect x="10" y="55" width="140" height="85" rx="4" fill={brown} />

          {/* Box body shading (left face) */}
          <polygon points="10,55 10,140 0,130 0,48" fill={brownDark} />

          {/* Box body shading (right face) — subtle */}
          <rect x="125" y="55" width="25" height="85" rx="2" fill={brownMid} opacity="0.5" />

          {/* Horizontal crease on body */}
          <line x1="10" y1="97" x2="150" y2="97" stroke={brownDark} strokeWidth="1.5" opacity="0.5" />

          {/* Vertical crease center */}
          <line x1="80" y1="55" x2="80" y2="140" stroke={brownDark} strokeWidth="1" opacity="0.3" />

          {/* Tape strip across center */}
          <rect x="10" y="88" width="140" height="18" fill={tape} opacity="0.6" rx="1" />
          <line x1="10" y1="93" x2="150" y2="93" stroke={tape} strokeWidth="0.5" opacity="0.4" />
          <line x1="10" y1="100" x2="150" y2="100" stroke={tape} strokeWidth="0.5" opacity="0.4" />

          {/* "WEBDEV NY" printed text */}
          <text x="80" y="125" textAnchor="middle" fill={brownDark} fontSize="10" fontFamily="monospace" fontWeight="bold" opacity="0.7" letterSpacing="2">WEBDEV NY</text>
          <text x="80" y="137" textAnchor="middle" fill={brownDark} fontSize="7" fontFamily="monospace" opacity="0.5" letterSpacing="1">NEW YORK, NY</text>

          {/* LID — animated on click */}
          <motion.g
            style={{ transformOrigin: "80px 55px", transformBox: "fill-box" }}
            animate={clicked ? { rotateX: -140 } : hovered ? { rotateX: -15 } : { rotateX: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Lid body */}
            <rect x="10" y="10" width="140" height="48" rx="3" fill={brown} />
            {/* Lid left flap */}
            <polygon points="10,10 10,58 0,52 0,5" fill={brownDark} />
            {/* Lid top highlight */}
            <rect x="10" y="10" width="140" height="6" rx="3" fill="rgba(255,255,255,0.08)" />
            {/* Lid tape */}
            <rect x="10" y="28" width="140" height="14" fill={tape} opacity="0.5" rx="1" />
            {/* Lid flap lines (cardboard look) */}
            <line x1="80" y1="10" x2="80" y2="58" stroke={brownDark} strokeWidth="1.5" opacity="0.4" strokeDasharray="4 3" />
            {/* Stars / logo on lid */}
            <text x="80" y="24" textAnchor="middle" fill={tape} fontSize="8" fontFamily="monospace" opacity="0.7" letterSpacing="3">✦ ✦ ✦</text>
            <text x="80" y="46" textAnchor="middle" fill={brownDark} fontSize="9" fontFamily="monospace" fontWeight="bold" opacity="0.8" letterSpacing="2">FRAGILE</text>
          </motion.g>

          {/* Bottom shadow line */}
          <ellipse cx="80" cy="140" rx="72" ry="4" fill="rgba(0,0,0,0.4)" />
        </svg>

        {/* Stars that burst out on click */}
        <AnimatePresence>
          {clicked && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-yellow-400 text-lg pointer-events-none"
                  style={{ left: "50%", top: "30%" }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                  animate={{
                    x: Math.cos((i / 8) * Math.PI * 2) * (60 + Math.random() * 40),
                    y: Math.sin((i / 8) * Math.PI * 2) * (60 + Math.random() * 40) - 20,
                    opacity: 0,
                    scale: 1.5,
                  }}
                  transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                >
                  ✦
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
