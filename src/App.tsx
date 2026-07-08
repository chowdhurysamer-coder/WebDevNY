import { useState, useEffect, useRef } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import { BeamReveal } from "@/components/BeamReveal";
import { LogoLoader } from "@/components/LogoLoader";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { FloatingDock } from "@/components/Controls";
import { ScrollProgress } from "@/components/primitives";
import Home from "@/pages/Home";
import WebDesign from "@/pages/WebDesign";
import Capabilities from "@/pages/Capabilities";
// Placeholder example pages — hidden until we have real client work to show.
// import Portfolio from "@/pages/Portfolio";
// import CaseStudy from "@/pages/CaseStudy";
// import Previews from "@/pages/Previews";
// Analytics dashboard & per-industry landing pages — hidden until we have more clientele to show.
// import Analytics from "@/pages/Analytics";
import Pricing from "@/pages/Pricing";
import Plans from "@/pages/Plans";
import Contact from "@/pages/Contact";
import Journal from "@/pages/Journal";
import JournalPost from "@/pages/JournalPost";
// import Industry from "@/pages/Industry";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import About from "@/pages/About";
import Explore from "@/pages/Explore";
import NotFound from "@/pages/NotFound";
import { CookieConsent } from "@/components/CookieConsent";
import { Analytics as GAnalytics } from "@/components/Analytics";
import { LangProvider } from "@/lib/i18n";
import { usePerfLite } from "@/lib/perf";
import { ConfettiLayer } from "@/components/Confetti";
import { EasterEggs } from "@/components/EasterEggs";
import { Seo } from "@/components/Seo";
import { RouteCurtain } from "@/components/RouteCurtain";

const STORAGE_KEY = "webdevny_unboxed";

function useLenis(active: boolean) {
  const ref = useRef<Lenis | null>(null);
  useEffect(() => {
    if (!active) return;
    // Short duration + a higher wheel multiplier keeps the smoothing but makes
    // scrolling feel immediate instead of syrupy.
    const lenis = new Lenis({ duration: 0.65, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, wheelMultiplier: 1.4 });
    ref.current = lenis;
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    let raf = 0;
    const loop = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      ref.current = null;
      (window as unknown as { __lenis?: Lenis }).__lenis = undefined;
    };
  }, [active]);
  return ref;
}

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  // Lite tier: a quick crossfade instead of the slide — cheaper and snappier.
  const lite = usePerfLite();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname}
        initial={{ opacity: 0, y: lite ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: lite ? 0 : -8 }}
        transition={{ duration: lite ? 0.16 : 0.35, ease: [0.16, 1, 0.3, 1] }}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function SiteLayout() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <ScrollTop />
      <Seo />
      <GAnalytics />
      <RouteCurtain />
      <Navbar />
      <FloatingDock />
      <CookieConsent />
      <EasterEggs />
      <main className="flex-1">
        <PageTransition>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/web-design" element={<WebDesign />} />
            <Route path="/capabilities" element={<Capabilities />} />
            {/* Placeholder example pages — hidden until we have real client work to show.
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
            <Route path="/previews" element={<Previews />} /> */}
            {/* Analytics dashboard — hidden until we have more clientele to show.
            <Route path="/analytics" element={<Analytics />} /> */}
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journal/:slug" element={<JournalPost />} />
            {/* Per-industry landing pages — hidden until we have more clientele to show.
            <Route path="/for/:slug" element={<Industry />} /> */}
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/about" element={<About />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const [phase, setPhase] = useState<"intro" | "loader" | "site">(() => (sessionStorage.getItem(STORAGE_KEY) ? "loader" : "intro"));
  const [unblind, setUnblind] = useState(false);
  // Lite tier: skip Lenis entirely — native scrolling is the smoothest thing
  // a struggling device can do (no rAF-driven scroll work every frame).
  const lite = usePerfLite();
  useLenis(phase === "site" && !lite);

  const handleComplete = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setUnblind(true);     // white overlay starts opaque
    setPhase("site");     // mount the site underneath
  };

  return (
    <LangProvider>
    <HashRouter>
      <div className="grain" />
      <CustomCursor />
      <ConfettiLayer />
      {phase === "site" && <ScrollProgress />}

      <AnimatePresence>
        {phase === "intro" && (
          <motion.div key="intro" exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <BeamReveal onComplete={handleComplete} />
          </motion.div>
        )}
        {phase === "loader" && <LogoLoader key="loader" onDone={() => setPhase("site")} />}
      </AnimatePresence>

      {phase === "site" && <SiteLayout />}

      {/* the "un-blinding": full white fades away to reveal the site */}
      <AnimatePresence>
        {unblind && (
          <motion.div
            key="unblind"
            className="fixed inset-0 z-[95] pointer-events-none"
            style={{ background: "radial-gradient(circle at 50% 45%, #ffffff 0%, #FFF7E8 60%, #FFFFFF 100%)" }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
            onAnimationComplete={() => setUnblind(false)}
          />
        )}
      </AnimatePresence>
    </HashRouter>
    </LangProvider>
  );
}
