/**
 * Google Analytics 4 — loaded only when a measurement ID is configured
 * (VITE_GA_ID, e.g. "G-XXXXXXX") AND the visitor has accepted cookies.
 */
const GA_ID = (import.meta.env.VITE_GA_ID as string) || "";
let loaded = false;

declare global {
  interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }
}

function consentGiven(): boolean {
  try { return localStorage.getItem("webdevny_cookies") === "all"; } catch { return false; }
}

export function initGA() {
  if (loaded || !GA_ID || !consentGiven()) return;
  loaded = true;

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer!.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { send_page_view: false, anonymize_ip: true });
}

export function trackPage(path: string) {
  if (!loaded || !window.gtag) return;
  window.gtag("event", "page_view", { page_path: path, page_location: location.href });
}

export const gaConfigured = !!GA_ID;
