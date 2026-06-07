import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#242424] text-white pt-12 pb-6 font-label">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Top Section - Logo & Button */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 pb-8 border-b border-gray-700 gap-8">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <svg viewBox="0 0 40 40" className="h-10 w-10 text-brand-orange">
                <path fill="currentColor" d="M20 2L2 34h36L20 2zm0 8.5l11.5 20.5H8.5L20 10.5z" />
              </svg>
              <div className="flex flex-col">
                <span className="font-headline font-bold text-lg text-white leading-none uppercase tracking-tight">Eazy<span className="font-light">Taxes</span></span>
              </div>
            </Link>
            
            <div className="hidden md:flex gap-6 text-sm font-bold ml-8">
              <Link to="/services" className="hover:text-brand-orange transition-colors">Services</Link>
              <Link to="/company" className="hover:text-brand-orange transition-colors">The Company</Link>
              <Link to="/pricing" className="hover:text-brand-orange transition-colors">Pricing</Link>
              <Link to="/blog" className="hover:text-brand-orange transition-colors">Blog</Link>
              <Link to="/support" className="hover:text-brand-orange transition-colors">Support</Link>
            </div>
          </div>
          
          <Link to="/contact" className="inline-block bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold rounded-full px-6 py-3 transition-all text-sm">
            Schedule a Consultation {'>'}
          </Link>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          
          <div>
            <h4 className="text-brand-orange font-bold text-xs uppercase mb-4 tracking-wider">Services</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link to="/support" className="hover:text-white transition-colors">Small Business Support</Link></li>
              <li><Link to="/tax-prep" className="hover:text-white transition-colors">Tax Preparation</Link></li>
              <li><Link to="/advisory" className="hover:text-white transition-colors">Tax Advisory</Link></li>
              <li><Link to="/quarterly" className="hover:text-white transition-colors">Quarterly Est. Taxes</Link></li>
              <li><Link to="/audit" className="hover:text-white transition-colors">Audit Defense</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-brand-orange font-bold text-xs uppercase mb-4 tracking-wider opacity-0 hidden md:block">Services Cont.</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link to="/income-taxes" className="hover:text-white transition-colors">Income Taxes</Link></li>
              <li><Link to="/start" className="hover:text-white transition-colors">Start a Business</Link></li>
              <li><Link to="/ein" className="hover:text-white transition-colors">File an EIN</Link></li>
              <li><Link to="/bookkeeping" className="hover:text-white transition-colors">Bookkeeping</Link></li>
              <li><Link to="/payroll" className="hover:text-white transition-colors">Payroll</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-orange font-bold text-xs uppercase mb-4 tracking-wider">The Company</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/locations" className="hover:text-white transition-colors">Locations</Link></li>
              <li><Link to="/partnerships" className="hover:text-white transition-colors">Partnerships</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-orange font-bold text-xs uppercase mb-4 tracking-wider">Resource Hub</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/industries" className="hover:text-white transition-colors">Industries</Link></li>
              <li><Link to="/calculators" className="hover:text-white transition-colors">Calculators</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Social & Certs */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-700 gap-6">
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-gray-400 hover:text-white cursor-pointer transition-colors">facebook</span>
            <span className="material-symbols-outlined text-gray-400 hover:text-white cursor-pointer transition-colors">camera_alt</span>
            <span className="material-symbols-outlined text-gray-400 hover:text-white cursor-pointer transition-colors">play_circle</span>
            <span className="material-symbols-outlined text-gray-400 hover:text-white cursor-pointer transition-colors">work</span>
          </div>

          <div className="flex gap-8 items-center">
             <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="material-symbols-outlined text-2xl">verified_user</span>
                <div>
                  <p className="font-bold text-white">A+ Rating</p>
                  <p>Accredited Business</p>
                </div>
             </div>
             <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="material-symbols-outlined text-2xl">security</span>
                <div>
                  <p className="font-bold text-white">SOC 2 Type 1</p>
                  <p>Tested & Approved</p>
                </div>
             </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 text-[10px] text-gray-500">
          <div className="flex gap-4 mb-4 md:mb-0">
            <Link to="/terms" className="hover:text-gray-300">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-gray-300">Privacy Policy</Link>
            <Link to="/do-not-sell" className="hover:text-gray-300">Do Not Sell My Info</Link>
          </div>
          <p>© Copyright {new Date().getFullYear()}. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
}
