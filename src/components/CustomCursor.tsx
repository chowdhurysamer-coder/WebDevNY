import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const x = useSpring(0, { stiffness: 500, damping: 40, mass: 0.4 });
  const y = useSpring(0, { stiffness: 500, damping: 40, mass: 0.4 });
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on fine pointers
    if (!window.matchMedia("(pointer: fine)").matches) { setHidden(true); return; }
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      const interactive = t.closest("a, button, [data-cursor], input, textarea, select, summary, [role=button]");
      setHovering(!!interactive);
      const l = (t.closest("[data-cursor-label]") as HTMLElement)?.dataset.cursorLabel;
      setLabel(l ?? null);
    };
    const leave = () => setHidden(true);
    const enter = () => setHidden(false);
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [x, y]);

  if (hidden) return null;

  return (
    <>
      {/* dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ x, y }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white" />
      </motion.div>
      {/* ring */}
      <motion.div
        ref={ring}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ x, y }}
      >
        <motion.div
          animate={{ width: hovering ? 56 : 30, height: hovering ? 56 : 30, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-ink flex items-center justify-center"
          style={{ mixBlendMode: hovering ? "normal" : "difference", borderColor: hovering ? "#BE6A24" : "#fff", background: hovering && label ? "#BE6A24" : "transparent" }}
        >
          {label && hovering && <span className="mono-label text-white text-[8px] tracking-wider">{label}</span>}
        </motion.div>
      </motion.div>
    </>
  );
}
