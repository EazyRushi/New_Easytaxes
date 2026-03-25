import { Link } from 'react-router-dom';
import { ScrollFadeUp, ScrollSlideIn, ScrollStagger, ScrollClipReveal, ScrollScale } from './animations/ScrollAnimations';

const serviceLinks = [
  { label: 'Tax & Compliance', href: '/ustax' },
  { label: 'Tax Resolution', href: '/tax-resolution' },
  { label: 'Assurance & SOC 2', href: '/assurance-soc2' },
  { label: 'CFO & Advisory', href: '/cfo-advisory' },
];

const resourceLinks = [
  { label: 'Tax Guides', href: '/resources' },
  { label: 'White Papers', href: '/resources' },
  { label: 'Calculator Tools', href: '/resources' },
  { label: 'Knowledge Base', href: '/resources' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
  { label: 'Cookie Settings', href: '#' },
  { label: 'Contact Us', href: '/contact' },
];

export default function Footer() {
  return (
    <ScrollClipReveal direction="bottom" offset={["start 0.95", "start 0.65"]}>
      <footer className="bg-primary pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <ScrollSlideIn direction="down" distance={40} offset={["start 0.95", "start 0.55"]}>
              <div className="sm:col-span-2 md:col-span-1">
                <div className="text-3xl font-headline italic text-secondary-container mb-6">EazyTaxes</div>
                <p className="text-on-primary-container text-sm leading-relaxed mb-8 max-w-xs">
                  Editorial Financial Excellence for the modern enterprise. Defining the new standard in tax resolution and strategic advisory.
                </p>
                <div className="flex space-x-3">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-on-primary hover:bg-secondary-container hover:text-on-secondary-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">public</span>
                  </a>
                  <a
                    href="mailto:support@eazytaxes.com"
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-on-primary hover:bg-secondary-container hover:text-on-secondary-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">alternate_email</span>
                  </a>
                </div>
              </div>
            </ScrollSlideIn>

            {/* Services */}
            <ScrollFadeUp offset={["start 0.95", "start 0.55"]}>
              <div>
                <h4 className="font-label font-bold text-xs text-on-primary uppercase tracking-[0.2em] mb-6">Services</h4>
                <ul className="space-y-3">
                  {serviceLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="text-on-primary-container/60 hover:text-secondary-container hover:translate-x-1 inline-block transition-all text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollFadeUp>

            {/* Resources */}
            <ScrollFadeUp offset={["start 0.95", "start 0.5"]}>
              <div>
                <h4 className="font-label font-bold text-xs text-on-primary uppercase tracking-[0.2em] mb-6">Resources</h4>
                <ul className="space-y-3">
                  {resourceLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-on-primary-container/60 hover:text-secondary-container hover:translate-x-1 inline-block transition-all text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollFadeUp>

            {/* Legal */}
            <ScrollFadeUp offset={["start 0.95", "start 0.45"]}>
              <div>
                <h4 className="font-label font-bold text-xs text-on-primary uppercase tracking-[0.2em] mb-6">Legal</h4>
                <ul className="space-y-3">
                  {legalLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-on-primary-container/60 hover:text-secondary-container hover:translate-x-1 inline-block transition-all text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollFadeUp>
          </div>

          {/* Bottom bar */}
          <ScrollFadeUp offset={["start 0.98", "start 0.8"]}>
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-on-primary-container/50 text-xs gap-4">
              <p>© 2024 EazyTaxes. Editorial Financial Excellence.</p>
              <div className="flex space-x-6">
                <span>Certified Public Accountants</span>
                <span>SEC Registered</span>
              </div>
            </div>
          </ScrollFadeUp>
        </div>
      </footer>
    </ScrollClipReveal>
  );
}
