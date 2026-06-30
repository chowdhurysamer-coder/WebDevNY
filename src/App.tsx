import { useState } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CardboardBox } from "@/components/CardboardBox";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import WebDesign from "@/pages/WebDesign";
import Capabilities from "@/pages/Capabilities";
import Portfolio from "@/pages/Portfolio";
import Previews from "@/pages/Previews";
import Analytics from "@/pages/Analytics";
import Pricing from "@/pages/Pricing";
import Plans from "@/pages/Plans";
import Contact from "@/pages/Contact";

const STORAGE_KEY = "webdevny_opened";

function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function SiteLayout() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-black flex flex-col">
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
  const [phase, setPhase] = useState<"box" | "reveal" | "site">(() => {
    return sessionStorage.getItem(STORAGE_KEY) ? "site" : "box";
  });

  const handleBoxOpen = () => {
    setPhase("reveal");
    sessionStorage.setItem(STORAGE_KEY, "1");
    setTimeout(() => setPhase("site"), 800);
  };

  return (
    <HashRouter>
      <AnimatePresence mode="wait">
        {phase === "box" && (
          <motion.div key="box" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <CardboardBox onOpen={handleBoxOpen} />
          </motion.div>
        )}

        {phase === "reveal" && (
          <motion.div
            key="reveal"
            className="fixed inset-0 z-[90] bg-black flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.02, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(40px,8vw,100px)] font-bold gradient-text"
            >
              WebDev NY
            </motion.div>
          </motion.div>
        )}

        {phase === "site" && (
          <motion.div
            key="site"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <SiteLayout />
          </motion.div>
        )}
      </AnimatePresence>
    </HashRouter>
  );
}
