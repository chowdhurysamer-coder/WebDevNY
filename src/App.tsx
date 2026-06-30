import { useState } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CardboardBox } from "@/components/CardboardBox";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import Home from "@/pages/Home";
import WebDesign from "@/pages/WebDesign";
import Capabilities from "@/pages/Capabilities";
import Portfolio from "@/pages/Portfolio";
import Previews from "@/pages/Previews";
import Analytics from "@/pages/Analytics";
import Pricing from "@/pages/Pricing";
import Plans from "@/pages/Plans";
import Contact from "@/pages/Contact";

const STORAGE_KEY = "webdevny_unboxed";

function ScrollTop() {
  const { pathname } = useLocation();
  if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  return <span data-path={pathname} className="hidden" />;
}

function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <ScrollTop />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function SiteLayout() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PageTransition>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/web-design" element={<WebDesign />} />
            <Route path="/capabilities" element={<Capabilities />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/previews" element={<Previews />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const [phase, setPhase] = useState<"box" | "reveal" | "site">(() =>
    sessionStorage.getItem(STORAGE_KEY) ? "site" : "box"
  );

  const handleBoxOpen = () => {
    setPhase("reveal");
    sessionStorage.setItem(STORAGE_KEY, "1");
    setTimeout(() => setPhase("site"), 1100);
  };

  return (
    <HashRouter>
      <div className="grain" />
      <CustomCursor />

      <AnimatePresence mode="wait">
        {phase === "box" && (
          <motion.div key="box" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <CardboardBox onOpen={handleBoxOpen} />
          </motion.div>
        )}

        {phase === "reveal" && (
          <motion.div
            key="reveal"
            className="fixed inset-0 z-[90] bg-ink flex items-center justify-center overflow-hidden"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.div
              initial={{ scale: 0.4, opacity: 0, rotate: -4 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <div className="mono-label text-kraft mb-4">Now unpacking</div>
              <div className="display text-paper text-[clamp(48px,11vw,150px)] font-semibold leading-none">
                WebDev<span className="text-kraft">.</span>NY
              </div>
            </motion.div>
          </motion.div>
        )}

        {phase === "site" && (
          <motion.div key="site" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <SiteLayout />
          </motion.div>
        )}
      </AnimatePresence>
    </HashRouter>
  );
}
