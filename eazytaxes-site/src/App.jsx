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
import Pricing from './pages/Pricing';
import Calculators from './pages/Calculators';
import StartBusiness from './pages/StartBusiness';
import FileEIN from './pages/FileEIN';
import BusinessBanking from './pages/BusinessBanking';
import SmallBusinessTaxes from './pages/SmallBusinessTaxes';
import TaxAdvisory from './pages/TaxAdvisory';
import TaxPreparation from './pages/TaxPreparation';
import AuditDefense from './pages/AuditDefense';
import QuarterlyEstimates from './pages/QuarterlyEstimates';
import BookkeepingPage from './pages/BookkeepingPage';
import PayrollServices from './pages/PayrollServices';
import IndustryStartup from './pages/IndustryStartup';
import IndustryEcommerce from './pages/IndustryEcommerce';
import IndustryRealEstate from './pages/IndustryRealEstate';
import IndustrySelfEmployed from './pages/IndustrySelfEmployed';
import IndustryTrucking from './pages/IndustryTrucking';
import IndustryRestaurant from './pages/IndustryRestaurant';
import IndustryHealthcare from './pages/IndustryHealthcare';
import IndustryNonProfit from './pages/IndustryNonProfit';
import SupportFAQ from './pages/SupportFAQ';
import Locations from './pages/Locations';
import AboutUs from './pages/AboutUs';
import Reviews from './pages/Reviews';
import Partnerships from './pages/Partnerships';

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
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/start-business" element={<StartBusiness />} />
          <Route path="/file-ein" element={<FileEIN />} />
          <Route path="/business-banking" element={<BusinessBanking />} />
          <Route path="/small-business-taxes" element={<SmallBusinessTaxes />} />
          <Route path="/tax-advisory" element={<TaxAdvisory />} />
          <Route path="/tax-preparation" element={<TaxPreparation />} />
          <Route path="/audit-defense" element={<AuditDefense />} />
          <Route path="/quarterly-estimates" element={<QuarterlyEstimates />} />
          <Route path="/bookkeeping" element={<BookkeepingPage />} />
          <Route path="/payroll-services" element={<PayrollServices />} />
          <Route path="/industry/startup" element={<IndustryStartup />} />
          <Route path="/industry/ecommerce" element={<IndustryEcommerce />} />
          <Route path="/industry/real-estate" element={<IndustryRealEstate />} />
          <Route path="/industry/self-employed" element={<IndustrySelfEmployed />} />
          <Route path="/industry/trucking" element={<IndustryTrucking />} />
          <Route path="/industry/restaurant" element={<IndustryRestaurant />} />
          <Route path="/industry/healthcare" element={<IndustryHealthcare />} />
          <Route path="/industry/non-profit" element={<IndustryNonProfit />} />
          <Route path="/support" element={<SupportFAQ />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/partnerships" element={<Partnerships />} />
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
        <div className="flex flex-col min-h-screen bg-white text-gray-900 font-body selection:bg-orange-100 selection:text-brand-orange">
          <Navbar />
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </LenisProvider>
    </Router>
  );
}

export default App;
