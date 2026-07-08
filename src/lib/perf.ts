import * as React from "react";

/**
 * Adaptive performance tier.
 *
 * "Lite" mode strips the costly cosmetics (full-page grain blend, WebGL
 * aurora at full res, Lenis smooth-scroll, custom cursor, backdrop blurs,
 * infinite background animations) so scrolling / clicking / pointer movement
 * stay smooth on weaker hardware or when the device is busy with other
 * tabs & apps.
 *
 * It flips on from any of:
 *  1. a persisted flag from earlier this session (so reloads start lite),
 *  2. OS-level `prefers-reduced-motion`,
 *  3. clearly weak hardware (≤2 GB device memory or ≤2 cores),
 *  4. a live FPS watchdog: three bad seconds (< ~42 fps) while visible.
 *
 * The switch is one-way per session — flip-flopping effects on and off
 * mid-scroll looks worse than staying lite.
 */

let lite = false;
const subs = new Set<(l: boolean) => void>();

export const isLite = () => lite;

export function subscribeLite(cb: (l: boolean) => void): () => void {
  subs.add(cb);
  return () => { subs.delete(cb); };
}

/** React hook — re-renders the component when the tier flips to lite. */
export function usePerfLite(): boolean {
  const [v, setV] = React.useState(lite);
  React.useEffect(() => subscribeLite(setV), []);
  return v;
}

function goLite() {
  if (lite) return;
  lite = true;
  document.documentElement.classList.add("perf-lite");
  try { sessionStorage.setItem("webdevny_perf", "lite"); } catch { /* ignore */ }
  subs.forEach((cb) => cb(true));
}

export function initPerf() {
  // 1. persisted from earlier this session
  try {
    if (sessionStorage.getItem("webdevny_perf") === "lite") { goLite(); return; }
  } catch { /* ignore */ }

  // 2. explicit user preference
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { goLite(); return; }

  // 3. clearly weak hardware
  const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory;
  if ((mem && mem <= 2) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2)) {
    goLite();
    return;
  }

  // 4. live FPS watchdog — the honest measure of "this device is struggling
  //    right now" (old laptop, forty tabs, video call in the background…).
  const start = () => {
    let frames = 0;
    let bucketStart = performance.now();
    let bad = 0;
    let raf = 0;

    // A hidden tab pauses rAF; the first bucket after coming back would look
    // like 2 fps and false-trigger. Reset counters whenever visibility flips.
    const onVis = () => { frames = 0; bucketStart = performance.now(); bad = 0; };
    document.addEventListener("visibilitychange", onVis);

    const tick = (now: number) => {
      if (lite) { document.removeEventListener("visibilitychange", onVis); return; }
      frames++;
      const elapsed = now - bucketStart;
      if (elapsed >= 1000) {
        const fps = (frames * 1000) / elapsed;
        if (!document.hidden) {
          if (fps < 42) {
            bad++;
            if (bad >= 3) { goLite(); document.removeEventListener("visibilitychange", onVis); return; }
          } else {
            bad = Math.max(0, bad - 1);
          }
        }
        frames = 0;
        bucketStart = now;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    void raf;
  };

  // Wait out the intro/loader animations so their intentional heaviness
  // doesn't count against the device.
  if (document.readyState === "complete") setTimeout(start, 4000);
  else window.addEventListener("load", () => setTimeout(start, 4000), { once: true });
}
