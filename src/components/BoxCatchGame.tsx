import { useEffect, useRef, useState } from "react";
import { sfx } from "@/lib/sfx";
import { burstConfetti } from "@/components/Confetti";

type Box = { x: number; y: number; v: number; r: number; vr: number; missed?: boolean };

export function BoxCatchGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => { try { return +(localStorage.getItem("webdevny_game_best") || 0); } catch { return 0; } });
  const [lives, setLives] = useState(3);

  const state = useRef({ running: false, score: 0, lives: 3, cart: 0.5, target: 0.5, boxes: [] as Box[], spawn: 0, speed: 1, t: 0 });

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let W = 0, H = 0, dpr = Math.min(devicePixelRatio || 1, 2), raf = 0;

    const resize = () => { W = canvas.offsetWidth; H = canvas.offsetHeight; canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    resize();
    window.addEventListener("resize", resize);

    const css = getComputedStyle(document.documentElement);
    const kraft = `rgb(${css.getPropertyValue("--c-kraft")})`;
    const ink = `rgb(${css.getPropertyValue("--c-ink")})`;
    const navy = `rgb(${css.getPropertyValue("--c-navy")})`;
    const faint = `rgb(${css.getPropertyValue("--c-ink-faint")})`;

    const onMove = (clientX: number) => { const r = canvas.getBoundingClientRect(); state.current.target = Math.max(0, Math.min(1, (clientX - r.left) / r.width)); };
    const mm = (e: MouseEvent) => onMove(e.clientX);
    const tm = (e: TouchEvent) => { if (e.touches[0]) onMove(e.touches[0].clientX); };
    canvas.addEventListener("mousemove", mm);
    canvas.addEventListener("touchmove", tm, { passive: true });
    const keys = (e: KeyboardEvent) => {
      if (!state.current.running) return;
      if (e.key === "ArrowLeft") state.current.target = Math.max(0, state.current.target - 0.08);
      if (e.key === "ArrowRight") state.current.target = Math.min(1, state.current.target + 0.08);
    };
    window.addEventListener("keydown", keys);

    const drawBox = (x: number, y: number, s: number, rot: number) => {
      ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
      ctx.fillStyle = kraft; ctx.fillRect(-s / 2, -s / 2, s, s);
      ctx.fillStyle = "rgba(240,220,174,0.6)"; ctx.fillRect(-s / 2, -s * 0.12, s, s * 0.24);
      ctx.strokeStyle = "rgba(33,27,21,0.25)"; ctx.lineWidth = 1; ctx.strokeRect(-s / 2, -s / 2, s, s);
      ctx.restore();
    };

    const loop = () => {
      const s = state.current;
      ctx.clearRect(0, 0, W, H);
      // ground line
      ctx.strokeStyle = faint; ctx.globalAlpha = 0.4; ctx.beginPath(); ctx.moveTo(0, H - 30); ctx.lineTo(W, H - 30); ctx.stroke(); ctx.globalAlpha = 1;

      if (s.running) {
        s.t++;
        s.cart += (s.target - s.cart) * 0.2;
        s.speed = 1 + s.score * 0.06;
        s.spawn--;
        if (s.spawn <= 0) { s.spawn = Math.max(26, 70 - s.score * 1.5); s.boxes.push({ x: 0.08 + Math.random() * 0.84, y: -20, v: 2 + Math.random() * 1.5, r: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.1 }); }

        const cartX = s.cart * W, cartY = H - 30, cartW = 78;
        for (const b of s.boxes) {
          b.y += b.v * s.speed; b.r += b.vr;
          const bx = b.x * W;
          if (!b.missed && b.y >= cartY - 16 && b.y <= cartY + 6 && Math.abs(bx - cartX) < cartW / 2) {
            b.missed = true; b.y = H + 100; s.score++; setScore(s.score); sfx.tick();
            if (s.score % 10 === 0) burstConfetti(cartX, cartY);
          } else if (!b.missed && b.y > H - 18) {
            b.missed = true; s.lives--; setLives(s.lives);
            if (s.lives <= 0) { s.running = false; setRunning(false); if (s.score > best) { setBest(s.score); try { localStorage.setItem("webdevny_game_best", String(s.score)); } catch { /* ignore */ } } }
          }
          if (b.y < H + 40) drawBox(bx, b.y, 22, b.r);
        }
        s.boxes = s.boxes.filter((b) => b.y < H + 60);

        // cart (open basket)
        ctx.fillStyle = ink;
        ctx.beginPath();
        ctx.moveTo(cartX - cartW / 2, cartY - 14);
        ctx.lineTo(cartX + cartW / 2, cartY - 14);
        ctx.lineTo(cartX + cartW / 2 - 8, cartY + 12);
        ctx.lineTo(cartX - cartW / 2 + 8, cartY + 12);
        ctx.closePath(); ctx.fill();
        ctx.fillStyle = navy; ctx.fillRect(cartX - cartW / 2, cartY - 16, cartW, 4);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); canvas.removeEventListener("mousemove", mm); canvas.removeEventListener("touchmove", tm); window.removeEventListener("keydown", keys); };
  }, [best]);

  const start = () => {
    const s = state.current;
    s.running = true; s.score = 0; s.lives = 3; s.boxes = []; s.spawn = 0; s.speed = 1; s.cart = 0.5; s.target = 0.5;
    setScore(0); setLives(3); setRunning(true); sfx.pop();
  };

  return (
    <div className="card-paper overflow-hidden select-none" data-cursor-label={running ? "MOVE" : undefined}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-line">
        <span className="mono-label text-ink-soft">Box Catch — a little game while you're here</span>
        <span className="mono-label text-ink-faint">Best {best}</span>
      </div>
      <div className="relative" style={{ height: 320 }}>
        <canvas ref={canvasRef} className="w-full h-full block cursor-none-fine" />

        {/* HUD */}
        {running && (
          <div className="absolute top-3 left-4 flex items-center gap-4 pointer-events-none">
            <span className="display text-3xl font-semibold">{score}</span>
            <span className="mono-label text-ink-faint">{"●".repeat(lives)}{"○".repeat(Math.max(0, 3 - lives))}</span>
          </div>
        )}

        {!running && (
          <div className="absolute inset-0 grid place-items-center bg-paper/70 backdrop-blur-sm">
            <div className="text-center">
              {score > 0 ? (
                <>
                  <div className="display text-4xl font-semibold mb-1">{score} caught</div>
                  <div className="mono-label text-ink-faint mb-5">{score >= best && score > 0 ? "New best!" : `Best ${best}`}</div>
                </>
              ) : (
                <div className="mono-label text-ink-soft mb-5">Move the cart · catch the falling boxes</div>
              )}
              <button onClick={start} data-cursor-label="PLAY" className="card-paper-kraft press px-6 py-3 mono-label">
                {score > 0 ? "Play again" : "Play"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
