import { useEffect, useRef, useState } from "react";

const faces = [
  { t: "Design", n: "01", tf: "rotateY(0deg) translateZ(var(--z))" },
  { t: "Develop", n: "02", tf: "rotateY(90deg) translateZ(var(--z))" },
  { t: "Optimize", n: "03", tf: "rotateY(180deg) translateZ(var(--z))" },
  { t: "Measure", n: "04", tf: "rotateY(-90deg) translateZ(var(--z))" },
  { t: "Ship", n: "05", tf: "rotateX(90deg) translateZ(var(--z))" },
  { t: "Maintain", n: "06", tf: "rotateX(-90deg) translateZ(var(--z))" },
];

/** Pure-CSS 3D cube. Auto-rotates and reacts to pointer. No three.js. */
export function CapabilityCube() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState({ x: -20, y: -28 });
  const auto = useRef({ x: -20, y: -28 });
  const target = useRef({ x: -20, y: -28 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      if (!dragging.current) { auto.current.y += 0.25; target.current = { ...auto.current }; }
      setDrag((d) => ({
        x: d.x + (target.current.x - d.x) * 0.1,
        y: d.y + (target.current.y - d.y) * 0.1,
      }));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onDown = (e: React.PointerEvent) => { dragging.current = true; last.current = { x: e.clientX, y: e.clientY }; };
  const onMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - last.current.x, dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
    target.current = { x: Math.max(-80, Math.min(80, target.current.x - dy * 0.5)), y: target.current.y + dx * 0.5 };
    auto.current = { ...target.current };
  };
  const onUp = () => { dragging.current = false; };

  return (
    <div
      ref={wrapRef}
      className="relative w-full h-[360px] sm:h-[460px] flex items-center justify-center select-none touch-none"
      data-cursor-label="DRAG"
      style={{ perspective: "1100px" }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerLeave={onUp}
    >
      <div
        className="relative"
        style={{
          width: 200, height: 200,
          transformStyle: "preserve-3d",
          transform: `rotateX(${drag.x}deg) rotateY(${drag.y}deg)`,
          ["--z" as any]: "100px",
        }}
      >
        {faces.map((f, i) => (
          <div
            key={i}
            className="absolute inset-0 flex flex-col items-center justify-center border-2 border-ink"
            style={{
              transform: f.tf,
              background: i % 2 === 0 ? "#BE6A24" : "#EFE9DD",
              color: i % 2 === 0 ? "#EFE9DD" : "#17130F",
              boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1)",
            }}
          >
            <span className="font-mono text-[10px] tracking-[0.2em] opacity-70 mb-2">[{f.n}]</span>
            <span className="display text-3xl font-semibold">{f.t}</span>
          </div>
        ))}
      </div>
      <span className="absolute bottom-2 mono-label text-ink-faint">Drag to rotate</span>
    </div>
  );
}
