/**
 * Durable best-score storage for the 404 game.
 *
 * The score is written to three independent places — localStorage, a
 * ten-year cookie, and IndexedDB — and reads always take the highest of
 * the three. A deploy, a renamed bundle, a self-heal reload, or one of
 * the stores being cleared can no longer lose a personal best: as long
 * as any one copy survives, it wins. Writes never lower the stored value.
 *
 * (Each browser profile keeps its own best — scores can't follow a person
 * across devices without an account system.)
 */

const LS_KEY = "webdevny_game_best"; // same key the game has always used
const COOKIE = "wdny_game_best";
const TEN_YEARS = 60 * 60 * 24 * 365 * 10;

const toScore = (v: unknown) => {
  const n = Math.floor(Number(v));
  return Number.isFinite(n) && n > 0 ? n : 0;
};

function readLocal(): number {
  try { return toScore(localStorage.getItem(LS_KEY)); } catch { return 0; }
}

function readCookie(): number {
  try {
    const m = document.cookie.match(new RegExp(`(?:^|; )${COOKIE}=(\\d+)`));
    return toScore(m?.[1]);
  } catch { return 0; }
}

function writeSync(score: number) {
  try { localStorage.setItem(LS_KEY, String(score)); } catch { /* ignore */ }
  try { document.cookie = `${COOKIE}=${score}; max-age=${TEN_YEARS}; path=/; SameSite=Lax`; } catch { /* ignore */ }
}

// ---- IndexedDB (async third copy) ----
function idb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    try {
      const req = indexedDB.open("webdevny", 1);
      req.onupgradeneeded = () => { req.result.createObjectStore("kv"); };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    } catch (e) { reject(e); }
  });
}

async function readIdb(): Promise<number> {
  try {
    const db = await idb();
    return await new Promise<number>((resolve) => {
      const req = db.transaction("kv", "readonly").objectStore("kv").get(LS_KEY);
      req.onsuccess = () => { resolve(toScore(req.result)); db.close(); };
      req.onerror = () => { resolve(0); db.close(); };
    });
  } catch { return 0; }
}

async function writeIdb(score: number) {
  try {
    const db = await idb();
    const tx = db.transaction("kv", "readwrite");
    tx.objectStore("kv").put(score, LS_KEY);
    tx.oncomplete = () => db.close();
  } catch { /* ignore */ }
}

/** Best score available synchronously (localStorage + cookie). */
export function loadBest(): number {
  const best = Math.max(readLocal(), readCookie());
  if (best > 0) writeSync(best); // heal whichever copy was missing/lower
  return best;
}

/** Full read including IndexedDB; resolves with the highest copy found. */
export async function loadBestFull(): Promise<number> {
  const best = Math.max(loadBest(), await readIdb());
  if (best > 0) { writeSync(best); void writeIdb(best); }
  return best;
}

/** Record a new score; keeps the highest ever seen across all three stores. */
export function saveBest(score: number): number {
  const best = Math.max(toScore(score), loadBest());
  if (best > 0) { writeSync(best); void writeIdb(best); }
  return best;
}
