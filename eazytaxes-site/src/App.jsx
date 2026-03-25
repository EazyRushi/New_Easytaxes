import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LenisProvider from './components/LenisProvider';

// Pages
import Home from './pages/Home';
import TaxCompliance from './pages/TaxCompliance';
import AssuranceSoc2 from './pages/AssuranceSoc2';
import TaxResolution from './pages/TaxResolution';
import CfoAdvisory from './pages/CfoAdvisory';
import Valuations from './pages/Valuations';
import FormationBanking from './pages/FormationBanking';
import Resources from './pages/Resources';
import Careers from './pages/Careers';
import Contact from './pages/Contact';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/ustax" element={<TaxCompliance />} />
          <Route path="/assurance-soc2" element={<AssuranceSoc2 />} />
          <Route path="/tax-resolution" element={<TaxResolution />} />
          <Route path="/cfo-advisory" element={<CfoAdvisory />} />
          <Route path="/valuations" element={<Valuations />} />
          <Route path="/formation-banking" element={<FormationBanking />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <LenisProvider>
        <div className="flex flex-col min-h-screen bg-surface text-on-surface font-body selection:bg-secondary-container selection:text-on-secondary-container">
          <Navbar />
          <main className="flex-grow pt-20">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </LenisProvider>
    </Router>
  );
}

export default App;
