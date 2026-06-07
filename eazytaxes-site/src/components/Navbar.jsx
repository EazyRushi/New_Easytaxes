import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Dropdown Data ─── */
const servicesDropdown = {
  columns: [
    {
      heading: 'Entity Formation',
      links: [
        { label: 'Start a Business', desc: 'LLC, C-Corp & S-Corp setup', href: '/start-business', icon: 'add_business' },
        { label: 'File an EIN', desc: 'Employer ID Number registration', href: '/file-ein', icon: 'badge' },
        { label: 'Business Banking', desc: 'Corporate financial account setup', href: '/business-banking', icon: 'account_balance' },
      ]
    },
    {
      heading: 'Tax Services',
      links: [
        { label: 'Small Business Taxes', desc: 'Federal & state filings', href: '/small-business-taxes', icon: 'receipt_long' },
        { label: 'Tax Advisory', desc: 'Year-round proactive tax strategy', href: '/tax-advisory', icon: 'lightbulb' },
        { label: 'Tax Preparation', desc: 'Corporate & personal tax filing', href: '/tax-preparation', icon: 'description' },
        { label: 'Audit Defense', desc: 'IRS negotiation & support', href: '/audit-defense', icon: 'shield' },
        { label: 'Quarterly Estimates', desc: 'Deadline tracking & prep', href: '/quarterly-estimates', icon: 'calendar_month' },
      ]
    },
    {
      heading: 'Bookkeeping & Payroll',
      links: [
        { label: 'Bookkeeping', desc: 'Monthly reconciliation & reports', href: '/bookkeeping', icon: 'menu_book' },
        { label: 'Payroll Services', desc: 'Employee payroll & tax compliance', href: '/payroll-services', icon: 'payments' },
      ]
    },
  ],
  featured: {
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&q=80',
    title: 'Tax Savings Calculator',
    desc: 'See how much you could save with EazyTaxes.',
    href: '/calculators',
  }
};

const industriesDropdown = {
  columns: [
    {
      heading: 'Business Types',
      links: [
        { label: 'Startup', desc: 'Tech & high-growth business', href: '/industry/startup', icon: 'rocket_launch' },
        { label: 'E-commerce', desc: 'Online storefronts & sellers', href: '/industry/ecommerce', icon: 'shopping_cart' },
        { label: 'Real Estate', desc: 'Agents, brokers & investors', href: '/industry/real-estate', icon: 'real_estate_agent' },
        { label: 'Self-Employed', desc: 'Freelancers & contractors', href: '/industry/self-employed', icon: 'person' },
      ]
    },
    {
      heading: 'Sectors',
      links: [
        { label: 'Trucking & Logistics', desc: 'Owner-operators & fleets', href: '/industry/trucking', icon: 'local_shipping' },
        { label: 'Restaurants & Cafe', desc: 'Food, beverage & hospitality', href: '/industry/restaurant', icon: 'restaurant' },
        { label: 'Healthcare & Medical', desc: 'Practices & clinical consults', href: '/industry/healthcare', icon: 'medical_services' },
        { label: 'Non-Profit', desc: '501(c)(3) charities & foundations', href: '/industry/non-profit', icon: 'volunteer_activism' },
      ]
    }
  ],
  featured: {
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&q=80',
    title: 'Industry Solutions',
    desc: 'Review tax benefits specific to your industry vertical.',
    href: '/contact',
  }
};

const companyDropdown = [
  { label: 'About Us', desc: 'Our story and mission', href: '/about', icon: 'info' },
  { label: 'Reviews', desc: 'What our clients say about us', href: '/reviews', icon: 'star' },
  { label: 'Careers', desc: 'Join the EazyTaxes team', href: '/careers', icon: 'work' },
  { label: 'Partnerships', desc: 'Collaborate with EazyTaxes', href: '/partnerships', icon: 'handshake' },
];

const resourceDropdown = [
  { label: 'Blog', desc: 'Tax tips & business insights', href: '/resources', icon: 'article' },
  { label: 'Calculators', desc: 'Self-employment, S Corp & savings', href: '/calculators', icon: 'calculate' },
  { label: 'Support & FAQ', desc: 'Common questions answered', href: '/support', icon: 'help' },
  { label: 'Locations', desc: 'Active CPA solutions in all 50 states', href: '/locations', icon: 'location_on' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState(null);
  const location = useLocation();
  const navRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
    setMobileSub(null);
  }, [location]);

  useEffect(() => {
    const handleClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleMouseEnter = (name) => {
    clearTimeout(timeoutRef.current);
    setActiveDropdown(name);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  /* ─── Simple link list dropdown ─── */
  const renderSimpleDropdown = (items) => (
    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.2 }}
        className="w-[320px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-gray-100 p-2"
      >
        {items.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
          >
            <div className="w-9 h-9 rounded-lg bg-orange-50 text-brand-orange flex items-center justify-center flex-shrink-0 group-hover:bg-orange-100 transition-colors">
              <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
            </div>
            <div>
              <p className="font-bold text-sm text-gray-900 group-hover:text-brand-orange transition-colors">{item.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
            </div>
          </Link>
        ))}
      </motion.div>
    </div>
  );

  /* ─── Mega dropdown for Services / Industries ─── */
  const renderMegaDropdown = (dropdownData, width = 'w-[820px]', cols = 'grid-cols-4') => (
    <div className="absolute top-[44px] left-1/2 -translate-x-1/2 pt-5 z-50">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.2 }}
        className={`${width} bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-gray-100 p-6`}
      >
        <div className={`grid ${cols} gap-6`}>
          {dropdownData.columns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-3 px-1">{col.heading}</h4>
              <div className="space-y-1">
                {col.links.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <span className="material-symbols-outlined text-[18px] text-brand-orange mt-0.5">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-sm text-gray-900 group-hover:text-brand-orange transition-colors">{item.label}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">{item.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
          {/* Featured Card */}
          <div className="bg-gray-50 rounded-xl overflow-hidden flex flex-col justify-between">
            <img src={dropdownData.featured.image} alt="" className="w-full h-28 object-cover" />
            <div className="p-3 flex-grow flex flex-col justify-between">
              <div>
                <p className="font-bold text-sm mb-1">{dropdownData.featured.title}</p>
                <p className="text-[11px] text-gray-500 mb-3 leading-snug">{dropdownData.featured.desc}</p>
              </div>
              <Link to={dropdownData.featured.href} className="text-xs font-bold text-brand-orange hover:underline block mt-2">
                Try it now →
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const navItems = [
    { name: 'Services', dropdown: 'services' },
    { name: 'All Industries', dropdown: 'industries' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Resources', dropdown: 'resources' },
    { name: 'Company', dropdown: 'company' },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 xl:px-6 pt-3 xl:pt-4">
      <div className="mx-auto flex justify-center w-full max-w-[1400px]" ref={navRef}>
        
        {/* ═══ DESKTOP ═══ */}
        <div className={`hidden xl:flex relative w-full items-center justify-between rounded-full px-6 pr-3 h-[64px] transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.08)]' : 'bg-white shadow-[0_2px_20px_rgba(0,0,0,0.06)]'}`}>
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <svg viewBox="0 0 40 40" className="h-9 w-9 text-brand-orange">
              <path fill="currentColor" d="M20 2L2 34h36L20 2zm0 8.5l11.5 20.5H8.5L20 10.5z" />
            </svg>
            <span className="font-bold text-lg text-gray-900 leading-none tracking-tight">
              Eazy<span className="text-brand-orange">Taxes</span>
            </span>
          </Link>

          {/* Center Nav Pill */}
          <nav className="">
            <ul className="flex h-11 items-center rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-100/80">
              {navItems.map((item, i) => {
                const isMega = item.dropdown === 'services' || item.dropdown === 'industries';
                return (
                  <li 
                    key={item.name} 
                    className={`h-full flex items-stretch ${!isMega ? 'relative' : ''}`}
                    onMouseEnter={() => !item.href && handleMouseEnter(item.name)}
                    onMouseLeave={() => !item.href && handleMouseLeave()}
                  >
                  {i !== 0 && <div className="w-px my-2.5 bg-gray-200/60"></div>}
                  
                  {item.href ? (
                    <Link
                      to={item.href}
                      className="group flex items-center px-5 font-bold text-[13px] text-gray-700 hover:text-brand-orange transition-colors h-full"
                    >
                      {item.name}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-1 text-gray-300 group-hover:text-brand-orange transition-colors">
                        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  ) : (
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                      className={`group flex items-center px-5 font-bold text-[13px] transition-colors h-full ${activeDropdown === item.name ? 'text-brand-orange' : 'text-gray-700 hover:text-brand-orange'}`}
                    >
                      {item.name}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`ml-1 transition-all duration-200 ${activeDropdown === item.name ? 'rotate-180 text-brand-orange' : 'text-gray-300 group-hover:text-brand-orange'}`}>
                        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  )}

                  {/* Dropdowns */}
                  <AnimatePresence>
                    {activeDropdown === 'Services' && item.name === 'Services' && renderMegaDropdown(servicesDropdown, 'w-[820px]', 'grid-cols-4')}
                    {activeDropdown === 'All Industries' && item.name === 'All Industries' && renderMegaDropdown(industriesDropdown, 'w-[640px]', 'grid-cols-3')}
                    {activeDropdown === 'Resources' && item.name === 'Resources' && renderSimpleDropdown(resourceDropdown)}
                    {activeDropdown === 'Company' && item.name === 'Company' && renderSimpleDropdown(companyDropdown)}
                  </AnimatePresence>
                </li>
                );
              })}
            </ul>
          </nav>

          {/* Right CTA */}
          <div className="flex items-center gap-6 flex-shrink-0">
            <Link
              to="/contact"
              className="hidden lg:inline-flex items-center text-sm font-bold text-gray-700 hover:text-brand-orange transition-colors"
            >
              <span className="material-symbols-outlined text-[18px] mr-1">call</span>
              (800) 222-6868
            </Link>
            <Link
              to="/contact"
              className="hidden md:inline-flex text-sm font-bold text-gray-700 hover:text-brand-orange transition-colors"
            >
              Login
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center font-bold text-white text-sm rounded-full px-6 py-2.5 bg-[#1b75ff] hover:bg-[#155bcd] hover:shadow-lg shadow-[0_4px_14px_rgba(27,117,255,0.25)] transition-all"
            >
              Schedule a Free Consultation
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-1">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>

        {/* ═══ MOBILE ═══ */}
        <div className={`xl:hidden flex w-full items-center justify-between rounded-full px-4 h-[56px] transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.08)]' : 'bg-white shadow-[0_2px_20px_rgba(0,0,0,0.06)]'}`}>
          <Link to="/" className="flex items-center gap-2">
            <svg viewBox="0 0 40 40" className="h-8 w-8 text-brand-orange">
              <path fill="currentColor" d="M20 2L2 34h36L20 2zm0 8.5l11.5 20.5H8.5L20 10.5z" />
            </svg>
            <span className="font-bold text-base text-gray-900 tracking-tight">
              Eazy<span className="text-brand-orange">Taxes</span>
            </span>
          </Link>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <span className="material-symbols-outlined text-gray-700">{mobileOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* ═══ MOBILE MENU ═══ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden absolute top-[72px] left-3 right-3 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)] rounded-2xl border border-gray-100 overflow-hidden max-h-[80vh] overflow-y-auto"
          >
            <div className="p-4 space-y-1">
              
              {/* Services */}
              <MobileAccordion title="Services" isOpen={mobileSub === 'services'} toggle={() => setMobileSub(mobileSub === 'services' ? null : 'services')}>
                {servicesDropdown.columns.flatMap(col => col.links).map(item => (
                  <Link key={item.label} to={item.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50">
                    <span className="material-symbols-outlined text-brand-orange text-[18px]">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-sm">{item.label}</p>
                      <p className="text-[11px] text-gray-400">{item.desc}</p>
                    </div>
                  </Link>
                ))}
              </MobileAccordion>

              {/* All Industries */}
              <MobileAccordion title="All Industries" isOpen={mobileSub === 'industries'} toggle={() => setMobileSub(mobileSub === 'industries' ? null : 'industries')}>
                {industriesDropdown.columns.flatMap(col => col.links).map(item => (
                  <Link key={item.label} to={item.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50">
                    <span className="material-symbols-outlined text-brand-orange text-[18px]">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-sm">{item.label}</p>
                      <p className="text-[11px] text-gray-400">{item.desc}</p>
                    </div>
                  </Link>
                ))}
              </MobileAccordion>

              {/* Pricing */}
              <Link to="/pricing" className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 font-bold text-gray-800">
                Pricing
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              {/* Resources */}
              <MobileAccordion title="Resources" isOpen={mobileSub === 'resources'} toggle={() => setMobileSub(mobileSub === 'resources' ? null : 'resources')}>
                {resourceDropdown.map(item => (
                  <Link key={item.label} to={item.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50">
                    <span className="material-symbols-outlined text-brand-orange text-[18px]">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-sm">{item.label}</p>
                      <p className="text-[11px] text-gray-400">{item.desc}</p>
                    </div>
                  </Link>
                ))}
              </MobileAccordion>

              {/* Company */}
              <MobileAccordion title="Company" isOpen={mobileSub === 'company'} toggle={() => setMobileSub(mobileSub === 'company' ? null : 'company')}>
                {companyDropdown.map(item => (
                  <Link key={item.label} to={item.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50">
                    <span className="material-symbols-outlined text-brand-orange text-[18px]">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-sm">{item.label}</p>
                      <p className="text-[11px] text-gray-400">{item.desc}</p>
                    </div>
                  </Link>
                ))}
              </MobileAccordion>

              <div className="pt-3 border-t border-gray-100 mt-3 space-y-2">
                <Link
                  to="/contact"
                  className="flex items-center justify-center w-full font-bold text-gray-700 text-sm rounded-full py-3 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center justify-center w-full font-bold text-white text-sm rounded-full py-3.5 bg-[#1b75ff] hover:bg-[#155bcd] shadow-md transition-all"
                >
                  Schedule a Free Consultation
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-1">
                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ─── Mobile Accordion Component ─── */
function MobileAccordion({ title, isOpen, toggle, children }) {
  return (
    <div>
      <button
        onClick={toggle}
        className={`flex items-center justify-between w-full p-3 rounded-xl font-bold text-sm transition-colors ${isOpen ? 'text-brand-orange bg-orange-50' : 'text-gray-800 hover:bg-gray-50'}`}
      >
        {title}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-200 ${isOpen ? 'rotate-180 text-brand-orange' : 'text-gray-400'}`}>
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden pl-2"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
