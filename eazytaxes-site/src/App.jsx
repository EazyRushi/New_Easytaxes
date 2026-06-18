import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LenisProvider from './components/LenisProvider';

// Portal
import { PortalProvider } from './portal/portalStore';
import LoginPage from './portal/LoginPage';
import PortalLayout from './portal/PortalLayout';
import Dashboard from './portal/Dashboard';
import TaskManager from './portal/TaskManager';
import DocumentCenter from './portal/DocumentCenter';

// Portal pages
import MessagesPage from './portal/pages/MessagesPage';
import SettingsPage from './portal/pages/SettingsPage';
import TaxCenterPage from './portal/pages/TaxCenterPage';
import PortalBookkeepingPage from './portal/pages/BookkeepingPage';
import ClientsPage from './portal/pages/ClientsPage';
import FilingsPage from './portal/pages/FilingsPage';
import TransactionsPage from './portal/pages/TransactionsPage';
import ReconciliationPage from './portal/pages/ReconciliationPage';
import MonthlyClosePage from './portal/pages/MonthlyClosePage';
import TaxReturnsPage from './portal/pages/TaxReturnsPage';
import CompliancePage from './portal/pages/CompliancePage';
import ApprovalsPage from './portal/pages/ApprovalsPage';
import TicketsPage from './portal/pages/TicketsPage';
import UsersPage from './portal/pages/UsersPage';
import AnalyticsPage from './portal/pages/AnalyticsPage';
import WorkflowsPage from './portal/pages/WorkflowsPage';
import ReportsPage from './portal/pages/ReportsPage';

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
      <PortalProvider>
        <Routes>
          {/* Portal routes — no Navbar/Footer */}
          <Route path="/portal/login" element={<LoginPage />} />
          <Route path="/portal/dashboard" element={<PortalLayout><Dashboard /></PortalLayout>} />
          <Route path="/portal/tasks" element={<PortalLayout><TaskManager /></PortalLayout>} />
          <Route path="/portal/documents" element={<PortalLayout><DocumentCenter /></PortalLayout>} />
          <Route path="/portal/messages" element={<PortalLayout><MessagesPage /></PortalLayout>} />
          <Route path="/portal/settings" element={<PortalLayout><SettingsPage /></PortalLayout>} />
          <Route path="/portal/taxes" element={<PortalLayout><TaxCenterPage /></PortalLayout>} />
          <Route path="/portal/bookkeeping" element={<PortalLayout><PortalBookkeepingPage /></PortalLayout>} />
          <Route path="/portal/clients" element={<PortalLayout><ClientsPage /></PortalLayout>} />
          <Route path="/portal/filings" element={<PortalLayout><FilingsPage /></PortalLayout>} />
          <Route path="/portal/transactions" element={<PortalLayout><TransactionsPage /></PortalLayout>} />
          <Route path="/portal/reconciliation" element={<PortalLayout><ReconciliationPage /></PortalLayout>} />
          <Route path="/portal/monthly-close" element={<PortalLayout><MonthlyClosePage /></PortalLayout>} />
          <Route path="/portal/returns" element={<PortalLayout><TaxReturnsPage /></PortalLayout>} />
          <Route path="/portal/compliance" element={<PortalLayout><CompliancePage /></PortalLayout>} />
          <Route path="/portal/approvals" element={<PortalLayout><ApprovalsPage /></PortalLayout>} />
          <Route path="/portal/tickets" element={<PortalLayout><TicketsPage /></PortalLayout>} />
          <Route path="/portal/users" element={<PortalLayout><UsersPage /></PortalLayout>} />
          <Route path="/portal/analytics" element={<PortalLayout><AnalyticsPage /></PortalLayout>} />
          <Route path="/portal/workflows" element={<PortalLayout><WorkflowsPage /></PortalLayout>} />
          <Route path="/portal/reports" element={<PortalLayout><ReportsPage /></PortalLayout>} />

          {/* Marketing routes */}
          <Route path="/*" element={
            <LenisProvider>
              <div className="flex flex-col min-h-screen bg-white text-gray-900 font-body selection:bg-orange-100 selection:text-brand-orange">
                <Navbar />
                <main className="flex-grow">
                  <AnimatedRoutes />
                </main>
                <Footer />
              </div>
            </LenisProvider>
          } />
        </Routes>
      </PortalProvider>
    </Router>
  );
}

export default App;
