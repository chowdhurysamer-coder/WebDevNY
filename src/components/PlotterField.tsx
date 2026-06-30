import { useEffect, useRef } from "react";

/**
 * Hand-coded generative "plotter" flow field.
 * Particles ride a Perlin-ish noise field and leave ink strokes on paper,
 * gently repelled by the cursor. Resets periodically. No libraries, no AI.
 */
export function PlotterField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };

    // cheap value-noise
    const perm = new Uint8Array(512);
    for (let i = 0; i < 256; i++) perm[i] = i;
    for (let i = 255; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [perm[i], perm[j]] = [perm[j], perm[i]]; }
    for (let i = 0; i < 256; i++) perm[i + 256] = perm[i];
    const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const grad = (hash: number, x: number, y: number) => {
      const hh = hash & 3; const u = hh < 2 ? x : y; const v = hh < 2 ? y : x;
      return ((hh & 1) ? -u : u) + ((hh & 2) ? -v : v);
    };
    const noise = (x: number, y: number) => {
      const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
      x -= Math.floor(x); y -= Math.floor(y);
      const u = fade(x), v = fade(y);
      const A = perm[X] + Y, B = perm[X + 1] + Y;
      return lerp(
        lerp(grad(perm[A], x, y), grad(perm[B], x - 1, y), u),
        lerp(grad(perm[A + 1], x, y - 1), grad(perm[B + 1], x - 1, y - 1), u),
        v
      );
    };

    type Pt = { x: number; y: number; px: number; py: number; life: number; max: number };
    let pts: Pt[] = [];
    const COUNT = 380;

    const spawn = (): Pt => {
      const x = Math.random() * w, y = Math.random() * h;
      return { x, y, px: x, py: y, life: 0, max: 60 + Math.random() * 120 };
    };

    const resize = () => {
      w = canvas.offsetWidth; h = canvas.offsetHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      pts = Array.from({ length: COUNT }, spawn);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    window.addEventListener("mousemove", onMove);

    let t = 0, raf = 0;
    const SCALE = 0.0022;
    const step = () => {
      t += 0.0016;
      // very slow fade to keep ink density crafted, not muddy
      ctx.fillStyle = "rgba(239,233,221,0.018)";
      ctx.fillRect(0, 0, w, h);

      ctx.lineWidth = 0.8;
      for (const p of pts) {
        const angle = noise(p.x * SCALE, p.y * SCALE + t) * Math.PI * 3;
        let vx = Math.cos(angle), vy = Math.sin(angle);

        // cursor repel
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 16000) {
          const f = (1 - d2 / 16000) * 2.4;
          vx += (dx / Math.sqrt(d2 + 1)) * f;
          vy += (dy / Math.sqrt(d2 + 1)) * f;
        }

        p.px = p.x; p.py = p.y;
        p.x += vx * 1.5; p.y += vy * 1.5;
        p.life++;

        const edge = p.x < 0 || p.x > w || p.y < 0 || p.y > h || p.life > p.max;
        if (edge) { Object.assign(p, spawn()); continue; }

        // ink near cursor turns kraft
        const near = d2 < 26000;
        ctx.strokeStyle = near ? "rgba(190,106,36,0.5)" : "rgba(23,19,15,0.16)";
        ctx.beginPath();
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}
