/**
 * Tiny synthesized sound engine — Web Audio, no audio files.
 * All sounds are generated from oscillators + noise envelopes.
 */
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let enabled = true;

try {
  enabled = localStorage.getItem("webdevny_sound") !== "0";
} catch { /* ignore */ }

function ac(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.5;
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

export const sfx = {
  get enabled() { return enabled; },
  setEnabled(v: boolean) {
    enabled = v;
    try { localStorage.setItem("webdevny_sound", v ? "1" : "0"); } catch { /* ignore */ }
    if (v) ac(); // unlock on enable
  },

  /** soft click for UI */
  tick() {
    if (!enabled) return;
    const c = ac(); if (!c || !master) return;
    const o = c.createOscillator(); const g = c.createGain();
    o.type = "square"; o.frequency.value = 520;
    g.gain.setValueAtTime(0.0001, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.05, c.currentTime + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.06);
    o.connect(g); g.connect(master); o.start(); o.stop(c.currentTime + 0.07);
  },

  /** box pop — pitch-dropping blip */
  pop() {
    if (!enabled) return;
    const c = ac(); if (!c || !master) return;
    const o = c.createOscillator(); const g = c.createGain();
    o.type = "triangle";
    o.frequency.setValueAtTime(680, c.currentTime);
    o.frequency.exponentialRampToValueAtTime(180, c.currentTime + 0.18);
    g.gain.setValueAtTime(0.0001, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.32, c.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.22);
    o.connect(g); g.connect(master); o.start(); o.stop(c.currentTime + 0.24);
  },

  /** beam whoosh — filtered noise sweep */
  whoosh() {
    if (!enabled) return;
    const c = ac(); if (!c || !master) return;
    const dur = 1.1;
    const buffer = c.createBuffer(1, c.sampleRate * dur, c.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    const src = c.createBufferSource(); src.buffer = buffer;
    const filter = c.createBiquadFilter(); filter.type = "bandpass"; filter.Q.value = 0.8;
    filter.frequency.setValueAtTime(300, c.currentTime);
    filter.frequency.exponentialRampToValueAtTime(4200, c.currentTime + dur * 0.7);
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.22, c.currentTime + 0.15);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
    src.connect(filter); filter.connect(g); g.connect(master); src.start();
  },

  /** arrival chime — pleasant major triad */
  chime() {
    if (!enabled) return;
    const c = ac(); const m = master; if (!c || !m) return;
    const freqs = [523.25, 659.25, 783.99]; // C5 E5 G5
    freqs.forEach((f, i) => {
      const o = c.createOscillator(); const g = c.createGain();
      o.type = "sine"; o.frequency.value = f;
      const t0 = c.currentTime + i * 0.07;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(0.18, t0 + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.9);
      o.connect(g); g.connect(m); o.start(t0); o.stop(t0 + 0.95);
    });
  },
};
