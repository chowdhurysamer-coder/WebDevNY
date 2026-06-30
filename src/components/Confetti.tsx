import { useEffect, useRef } from "react";

/** Fire a confetti burst from a screen point (defaults to center-top). */
export function burstConfetti(x?: number, y?: number) {
  window.dispatchEvent(new CustomEvent("webdevny:confetti", { detail: { x, y } }));
}

type P = { x: number; y: number; vx: number; vy: number; rot: number; vr: number; size: number; color: string; shape: number; life: number };
const COLORS = ["#C66E22", "#E0894A", "#D98B6A", "#4E86A8", "#211B15", "#F3ECDD"];

export function ConfettiLayer() {
  const ref = useRef<HTMLCanvasElement>(null);
  const parts = useRef<P[]>([]);

  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let dpr = Math.min(window.devicePixelRatio || 1, 2), raf = 0;
    const resize = () => { canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    resize();
    window.addEventListener("resize", resize);

    const burst = (e: Event) => {
      const d = (e as CustomEvent).detail || {};
      const x = d.x ?? innerWidth / 2, y = d.y ?? innerHeight * 0.3;
      const n = 110;
      for (let i = 0; i < n; i++) {
        const ang = (Math.random() * Math.PI * 2);
        const sp = 4 + Math.random() * 11;
        parts.current.push({
          x, y, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp - 5,
          rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.4,
          size: 5 + Math.random() * 8, color: COLORS[(Math.random() * COLORS.length) | 0],
          shape: (Math.random() * 3) | 0, life: 1,
        });
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      const live: P[] = [];
      for (const p of parts.current) {
        p.vy += 0.32; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life -= 0.008;
        if (p.life <= 0 || p.y > innerHeight + 40) continue;
        live.push(p);
        ctx.save();
        ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.globalAlpha = Math.max(0, Math.min(1, p.life));
        ctx.fillStyle = p.color;
        if (p.shape === 0) ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        else if (p.shape === 1) { ctx.beginPath(); ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2); ctx.fill(); }
        else { // star
          ctx.beginPath();
          for (let k = 0; k < 5; k++) {
            const a = (k / 5) * Math.PI * 2 - Math.PI / 2;
            ctx.lineTo(Math.cos(a) * p.size / 2, Math.sin(a) * p.size / 2);
            const a2 = a + Math.PI / 5;
            ctx.lineTo(Math.cos(a2) * p.size / 5, Math.sin(a2) * p.size / 5);
          }
          ctx.closePath(); ctx.fill();
        }
        ctx.restore();
      }
      parts.current = live;
      if (live.length) raf = requestAnimationFrame(tick);
      else { cancelAnimationFrame(raf); raf = 0; }
    };

    window.addEventListener("webdevny:confetti", burst);
    return () => { window.removeEventListener("resize", resize); window.removeEventListener("webdevny:confetti", burst); cancelAnimationFrame(raf); };
  }, []);

  return <canvas ref={ref} className="fixed inset-0 z-[130] pointer-events-none" />;
}
