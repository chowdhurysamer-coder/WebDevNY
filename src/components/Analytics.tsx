import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initGA, trackPage } from "@/lib/analytics";

/** Initializes GA after consent, and tracks SPA page views on route change. */
export function Analytics() {
  const { pathname } = useLocation();

  useEffect(() => {
    initGA();
    const onConsent = () => { initGA(); trackPage(pathname); };
    window.addEventListener("webdevny:consent", onConsent);
    return () => window.removeEventListener("webdevny:consent", onConsent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { trackPage(pathname); }, [pathname]);
  return null;
}
