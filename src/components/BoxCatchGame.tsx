import { useEffect, useRef, useState } from "react";
import { sfx } from "@/lib/sfx";
import { burstConfetti } from "@/components/Confetti";
import { useLang } from "@/lib/i18n";

type Bulb = { x: number; y: number; v: number; r: number; vr: number; missed?: boolean };

export function BoxCatchGame() {
  const { t, num } = useLang();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => { try { return +(localStorage.getItem("webdevny_game_best") || 0); } catch { return 0; } });
  const [lives, setLives] = useState(3);

  const state = useRef({ running: false, score: 0, lives: 3, box: 0.5, target: 0.5, bulbs: [] as Bulb[], spawn: 0, speed: 1, t: 0 });

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let W = 0, H = 0, dpr = Math.min(devicePixelRatio || 1, 2), raf = 0;

    const resize = () => { W = canvas.offsetWidth; H = canvas.offsetHeight; canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    resize();
    window.addEventListener("resize", resize);

    const css = getComputedStyle(document.documentElement);
    const kraft = `rgb(${css.getPropertyValue("--c-kraft")})`;
    const kraftDeep = `rgb(${css.getPropertyValue("--c-kraft-deep")})`;
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

    // a little light bulb (matches the brand mark), with a warm glow
    const drawBulb = (x: number, y: number, s: number, rot: number) => {
      ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
      ctx.shadowColor = "rgba(240,192,120,0.9)"; ctx.shadowBlur = 14;
      ctx.fillStyle = navy;
      ctx.beginPath(); ctx.arc(0, -s * 0.1, s * 0.42, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
      // screw base
      ctx.fillRect(-s * 0.2, s * 0.28, s * 0.4, s * 0.12);
      ctx.fillRect(-s * 0.15, s * 0.42, s * 0.3, s * 0.1);
      // filament glint
      ctx.strokeStyle = "rgba(255,225,160,0.95)"; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(-s * 0.12, -s * 0.12); ctx.lineTo(0, s * 0.02); ctx.lineTo(s * 0.12, -s * 0.12); ctx.stroke();
      ctx.restore();
    };

    // an open cardboard box catcher
    const drawBoxCatcher = (cx: number, y: number, w: number) => {
      const h = 26;
      // back flaps
      ctx.fillStyle = kraftDeep;
      ctx.beginPath();
      ctx.moveTo(cx - w / 2, y - 8); ctx.lineTo(cx - w / 2 - 10, y - 20);
      ctx.lineTo(cx - w / 2 + 6, y - 16); ctx.closePath(); ctx.fill();
      ctx.beginPath();
      ctx.moveTo(cx + w / 2, y - 8); ctx.lineTo(cx + w / 2 + 10, y - 20);
      ctx.lineTo(cx + w / 2 - 6, y - 16); ctx.closePath(); ctx.fill();
      // body
      ctx.fillStyle = kraft;
      ctx.beginPath();
      ctx.moveTo(cx - w / 2, y - 8);
      ctx.lineTo(cx + w / 2, y - 8);
      ctx.lineTo(cx + w / 2 - 8, y + h);
      ctx.lineTo(cx - w / 2 + 8, y + h);
      ctx.closePath(); ctx.fill();
      // tape + inner shadow
      ctx.fillStyle = "rgba(240,220,174,0.55)"; ctx.fillRect(cx - w / 2 + 4, y - 6, w - 8, 5);
      ctx.strokeStyle = kraftDeep; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx - w / 2, y - 8); ctx.lineTo(cx + w / 2, y - 8); ctx.stroke();
    };

    const loop = () => {
      const s = state.current;
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = faint; ctx.globalAlpha = 0.4; ctx.beginPath(); ctx.moveTo(0, H - 30); ctx.lineTo(W, H - 30); ctx.stroke(); ctx.globalAlpha = 1;

      if (s.running) {
        s.t++;
        s.box += (s.target - s.box) * 0.2;
        s.speed = 1 + s.score * 0.06;
        s.spawn--;
        if (s.spawn <= 0) { s.spawn = Math.max(26, 70 - s.score * 1.5); s.bulbs.push({ x: 0.08 + Math.random() * 0.84, y: -20, v: 2 + Math.random() * 1.5, r: (Math.random() - 0.5) * 0.5, vr: (Math.random() - 0.5) * 0.08 }); }

        const boxX = s.box * W, boxY = H - 34, boxW = 84;
        for (const b of s.bulbs) {
          b.y += b.v * s.speed; b.r += b.vr;
          const bx = b.x * W;
          if (!b.missed && b.y >= boxY - 16 && b.y <= boxY + 8 && Math.abs(bx - boxX) < boxW / 2) {
            b.missed = true; b.y = H + 100; s.score++; setScore(s.score); sfx.tick();
            if (s.score % 10 === 0) burstConfetti(boxX, boxY);
          } else if (!b.missed && b.y > H - 18) {
            b.missed = true; s.lives--; setLives(s.lives);
            if (s.lives <= 0) { s.running = false; setRunning(false); if (s.score > best) { setBest(s.score); try { localStorage.setItem("webdevny_game_best", String(s.score)); } catch { /* ignore */ } } }
          }
          if (b.y < H + 40) drawBulb(bx, b.y, 26, b.r);
        }
        s.bulbs = s.bulbs.filter((b) => b.y < H + 60);

        drawBoxCatcher(boxX, boxY, boxW);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); canvas.removeEventListener("mousemove", mm); canvas.removeEventListener("touchmove", tm); window.removeEventListener("keydown", keys); };
  }, [best]);

  const start = () => {
    const s = state.current;
    s.running = true; s.score = 0; s.lives = 3; s.bulbs = []; s.spawn = 0; s.speed = 1; s.box = 0.5; s.target = 0.5;
    setScore(0); setLives(3); setRunning(true); sfx.pop();
  };

  return (
    <div className="card-paper overflow-hidden select-none" data-cursor-label={running ? "MOVE" : undefined}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-line">
        <span className="mono-label text-ink-soft">{t("game.tagline")}</span>
        <span className="mono-label text-ink-faint">{t("game.best")} {num(best)}</span>
      </div>
      <div className="relative" style={{ height: 320 }}>
        <canvas ref={canvasRef} className="w-full h-full block cursor-none-fine" />

        {running && (
          <div className="absolute top-3 left-4 flex items-center gap-4 pointer-events-none">
            <span className="display text-3xl font-semibold">{num(score)}</span>
            <span className="mono-label text-ink-faint">{"●".repeat(lives)}{"○".repeat(Math.max(0, 3 - lives))}</span>
          </div>
        )}

        {!running && (
          <div className="absolute inset-0 grid place-items-center bg-paper/70 backdrop-blur-sm">
            <div className="text-center">
              {score > 0 ? (
                <>
                  <div className="display text-4xl font-semibold mb-1">{num(score)} {t("game.caught")}</div>
                  <div className="mono-label text-ink-faint mb-5">{score >= best && score > 0 ? t("game.newBest") : `${t("game.best")} ${num(best)}`}</div>
                </>
              ) : (
                <div className="mono-label text-ink-soft mb-5">{t("game.instructions")}</div>
              )}
              <button onClick={start} data-cursor-label="PLAY" className="card-paper-kraft press px-6 py-3 mono-label">
                {score > 0 ? t("game.playAgain") : t("game.play")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
