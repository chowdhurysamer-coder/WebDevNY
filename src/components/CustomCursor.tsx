import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePerfLite } from "@/lib/perf";

export function CustomCursor() {
  // Lite tier: unmount entirely — the OS cursor is the only truly lag-free
  // pointer on a struggling device (CSS restores `cursor: auto/pointer`).
  const lite = usePerfLite();
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  // Dot tracks the pointer 1:1 (no smoothing — any spring here reads as lag).
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Ring trails just barely, on a very tight spring.
  const rx = useSpring(x, { stiffness: 1200, damping: 70, mass: 0.15 });
  const ry = useSpring(y, { stiffness: 1200, damping: 70, mass: 0.15 });
  const ring = useRef<HTMLDivElement>(null);
  // Cache last state so mousemove doesn't re-render React every frame.
  const prev = useRef<{ hovering: boolean; label: string | null }>({ hovering: false, label: null });

  useEffect(() => {
    // Only on fine pointers, and never in lite mode
    if (lite || !window.matchMedia("(pointer: fine)").matches) { setHidden(true); return; }
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      const interactive = !!t.closest("a, button, [data-cursor], input, textarea, select, summary, [role=button]");
      const l = (t.closest("[data-cursor-label]") as HTMLElement)?.dataset.cursorLabel ?? null;
      if (interactive !== prev.current.hovering) { prev.current.hovering = interactive; setHovering(interactive); }
      if (l !== prev.current.label) { prev.current.label = l; setLabel(l); }
    };
    const leave = () => setHidden(true);
    const enter = () => setHidden(false);
    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [x, y, lite]);

  if (hidden || lite) return null;

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
        style={{ x: rx, y: ry }}
      >
        <motion.div
          animate={{ width: hovering ? 56 : 30, height: hovering ? 56 : 30, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-ink flex items-center justify-center"
          style={{ mixBlendMode: hovering ? "normal" : "difference", borderColor: hovering ? "#BE6A24" : "#fff", background: hovering && label ? "#BE6A24" : "transparent" }}
        >
          {label && hovering && <span className="mono-label text-white text-[8px] tracking-wider">{label}</span>}
        </motion.div>
      </motion.div>
    </>
  );
}
