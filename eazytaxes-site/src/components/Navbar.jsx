import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Services', href: '/', dropdown: [
    { label: 'Tax & Compliance', href: '/ustax' },
    { label: 'Assurance & SOC 2', href: '/assurance-soc2' },
    { label: 'Tax Resolution', href: '/tax-resolution' },
    { label: 'CFO & Advisory', href: '/cfo-advisory' },
    { label: 'Valuations', href: '/valuations' },
    { label: 'Formation & Banking', href: '/formation-banking' },
  ]},
  { label: 'Resources', href: '/resources' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const lastScrollY = useRef(0);

  // Scroll-direction hide/reveal
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;

      setScrolled(currentScrollY > 40);

      if (currentScrollY > 200) {
        setHidden(isScrollingDown);
      } else {
        setHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isActive = (href) => location.pathname === href;

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{
          y: hidden ? -100 : 0,
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'glass-nav shadow-editorial h-16' : 'glass-nav h-20'
        }`}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 lg:px-8 h-full">
          {/* Logo */}
          <Link to="/" className="text-2xl font-headline font-bold text-primary flex-shrink-0">
            <motion.span
              animate={{ scale: scrolled ? 0.9 : 1 }}
              transition={{ duration: 0.3 }}
              className="inline-block origin-left"
            >
              EazyTaxes
            </motion.span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Services Dropdown */}
            <div className="relative group">
              <button
                className={`nav-link font-label text-sm uppercase tracking-widest transition-colors ${
                  ['/ustax','/assurance-soc2','/tax-resolution','/cfo-advisory','/valuations','/formation-banking'].includes(location.pathname)
                    ? 'text-secondary-container'
                    : 'text-primary hover:text-secondary'
                }`}
              >
                Services
              </button>
              {/* Dropdown */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-surface-container-lowest shadow-editorial rounded-lg py-2 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {navLinks[0].dropdown.map((item, i) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="block px-4 py-2.5 text-sm font-label text-on-surface hover:bg-surface-container-low hover:text-secondary transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`nav-link font-label text-sm uppercase tracking-widest transition-colors ${
                  isActive(link.href)
                    ? 'text-secondary-container active'
                    : 'text-primary hover:text-secondary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-5">
            <Link to="/contact" className="text-primary font-medium hover:opacity-75 transition-all font-label text-sm">
              Log In
            </Link>
            <Link
              to="/contact"
              className="bg-secondary-container text-on-secondary-container px-5 py-2.5 rounded-lg font-label font-semibold text-sm hover:brightness-110 active:scale-95 transition-all"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col space-y-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-primary transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-primary transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-primary transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <motion.div
        animate={{ x: mobileOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 h-full w-80 bg-surface-container-lowest z-50 md:hidden pt-20 pb-8 px-6 overflow-y-auto"
      >
        <div className="space-y-1">
          <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-4 mt-2">Services</p>
          {navLinks[0].dropdown.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="block py-3 px-3 text-sm font-label text-on-surface hover:bg-surface-container-low hover:text-secondary rounded transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="h-px bg-outline-variant/30 my-4" />
          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`block py-3 px-3 text-sm font-label rounded transition-colors ${
                isActive(link.href)
                  ? 'text-secondary-container bg-surface-container-low'
                  : 'text-on-surface hover:bg-surface-container-low hover:text-secondary'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-6">
            <Link
              to="/contact"
              className="block w-full text-center bg-secondary-container text-on-secondary-container px-5 py-3 rounded-lg font-label font-semibold text-sm hover:brightness-110 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
}
