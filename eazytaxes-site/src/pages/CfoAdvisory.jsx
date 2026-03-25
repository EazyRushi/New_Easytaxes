import React from 'react';
import { Link } from 'react-router-dom';
import {
  ScrollFadeUp,
  ScrollScale,
  ScrollParallax,
  ScrollRevealText,
  ScrollSlideIn,
  ScrollStagger,
  ScrollBlurReveal,
  ScrollClipReveal,
  ScrollLineGrow,
  ScrollCounter,
} from '../components/animations/ScrollAnimations';

export default function CfoAdvisory() {
  return (
    <div className="relative w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-primary overflow-hidden -mt-20 pt-20">
        <ScrollParallax speed={0.3} className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none">
          <img className="w-full h-full object-cover" alt="Modern architectural glass facade" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBz4vHbSFcAxVg0P-dokPv7AmaPHrB4BKdbhknXXNUpwZG9oOvUaWrbX533Xw8b7VxL9gxJUgyfqLpf2ZV74dKJREhi5kJ9UTfXMot09ce-MSocW8UTFGG6Vd6PYDiQKsXjJbZWxP7wBr_A2zGoeKIGSzId1A4ajsFWKzebn8VHAiQhDbSJSg799vENvoqbFcdXKWIXVSoczXOkOVn_8qWhVyyw5p3GyvRIQSUb7vneTZ5glWl8qnXmHi6SIzPrAl-QL4POLoUt0xQV" />
        </ScrollParallax>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent pointer-events-none"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <ScrollSlideIn direction="left" distance={80}>
            <div className="max-w-4xl">
              <span className="inline-block font-label text-secondary-fixed-dim uppercase tracking-[0.3em] text-sm mb-6">Strategic Partnership</span>
              <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-8 tracking-tight">
                Fractional Leadership. <br/>
                <span className="italic text-secondary-container">Total Resilience.</span>
              </h1>
              <p className="text-on-primary-container text-xl md:text-2xl font-body max-w-2xl leading-relaxed opacity-90 mb-12">
                Move beyond bookkeeping. Our CFO Advisory services provide the high-level financial architecture required for scaling complex organizations.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link to="/contact" className="bg-secondary-container text-on-secondary-container px-10 py-5 rounded-lg font-label font-bold uppercase tracking-widest text-sm hover:brightness-110 active:scale-95 transition-all shadow-editorial">
                  Request Advisory
                </Link>
                <button className="border border-white/20 text-white px-10 py-5 rounded-lg font-label font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-all">
                  View Case Studies
                </button>
              </div>
            </div>
          </ScrollSlideIn>
        </div>
      </section>

      {/* Strategic Capital Planning */}
      <section className="py-24 md:py-40 bg-surface-bright overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
            <ScrollSlideIn direction="left" distance={80} className="lg:col-span-5 pt-8">
              <h2 className="font-headline text-5xl lg:text-6xl text-primary leading-tight mb-8">
                <ScrollRevealText text="Strategic Capital Planning" tag="span" />
              </h2>
              <ScrollLineGrow direction="horizontal" className="w-24 h-1 bg-secondary-container mb-10" offset={["start 0.8", "start 0.5"]} />
              <p className="font-body text-on-surface-variant text-lg md:text-xl leading-relaxed mb-12">
                Capital is more than currency; it is the foundation of your architectural legacy. We design multi-year capital allocation frameworks that balance immediate liquidity needs with long-term expansion goals.
              </p>
              <ul className="space-y-8">
                <li className="flex items-start gap-5 p-4 rounded-xl hover:bg-surface-container-low transition-colors">
                  <span className="material-symbols-outlined text-secondary pt-1 text-3xl">domain</span>
                  <div>
                    <span className="font-headline text-2xl text-primary mb-2 block">Debt &amp; Equity Structure</span>
                    <p className="text-on-surface-variant leading-relaxed">Optimization of liabilities and funding rounds for maximum valuation and cap table integrity.</p>
                  </div>
                </li>
                <li className="flex items-start gap-5 p-4 rounded-xl hover:bg-surface-container-low transition-colors">
                  <span className="material-symbols-outlined text-secondary pt-1 text-3xl">timeline</span>
                  <div>
                    <span className="font-headline text-2xl text-primary mb-2 block">Cash Flow Predictive Modeling</span>
                    <p className="text-on-surface-variant leading-relaxed">Advanced rolling forecasts allowing proactive navigation of runway and burn rates.</p>
                  </div>
                </li>
                <li className="flex items-start gap-5 p-4 rounded-xl hover:bg-surface-container-low transition-colors">
                  <span className="material-symbols-outlined text-secondary pt-1 text-3xl">insights</span>
                  <div>
                    <span className="font-headline text-2xl text-primary mb-2 block">Risk-Adjusted Return Analysis</span>
                    <p className="text-on-surface-variant leading-relaxed">Vetting of new market expansions and product line profitability with clinical detachment.</p>
                  </div>
                </li>
              </ul>
            </ScrollSlideIn>

            <ScrollSlideIn direction="right" distance={80} className="lg:col-span-7 relative">
              <ScrollScale scaleRange={[0.9, 1]}>
                <div className="aspect-[4/5] md:aspect-video rounded-xl overflow-hidden shadow-2xl relative z-10">
                  <img className="w-full h-full object-cover" alt="Office skyline" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiibEeI5jxdBUwIo36xyyZs-8FdMmMezE88sv77BFU4XM5LgmmFxADI5seeVRQs3f5zlslYj6Z6A6PvLhoDX7Jjtvq4f_g9szOtj-92AE9A-7iB8jQXDWPalEP_IdY59UwFBoRjMDgnL7LqWr2XVfExPMEXnsZeq1sQp0tFIlHSv1NKmfMdmUJ6aKO4IMogXI0bSyUIF-eTK0Fj6mWnSpWPnaEla62DlxAA4XA1ln9RSp317mTwfHF9pAZKE2xCDjJSlJfu4HUydeF" />
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                </div>
              </ScrollScale>
              <ScrollFadeUp className="absolute -bottom-10 -left-10 hidden md:block bg-primary p-12 max-w-sm shadow-editorial z-20 rounded-xl" offset={["start 0.7", "start 0.35"]}>
                <p className="font-headline text-3xl text-white italic mb-6 leading-tight">"Precision is our primary currency."</p>
                <div className="w-16 h-px bg-secondary-fixed-dim mb-4"></div>
                <p className="font-label text-secondary-fixed-dim uppercase text-xs tracking-widest">Executive Methodology</p>
              </ScrollFadeUp>
              <ScrollParallax speed={0.2} className="absolute -top-10 -right-10 w-64 h-64 bg-surface-container-lowest rounded-full blur-3xl opacity-60 z-0" />
            </ScrollSlideIn>
          </div>
        </div>
      </section>

      {/* M&A Readiness */}
      <section className="py-32 bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollFadeUp className="mb-20 text-center lg:text-left max-w-3xl" offset={["start 0.9", "start 0.55"]}>
            <span className="font-label text-secondary-container uppercase tracking-[0.4em] text-xs">Transactional Excellence</span>
            <h2 className="font-headline text-5xl md:text-6xl text-white mt-6 italic">M&amp;A Readiness &amp; Integration</h2>
          </ScrollFadeUp>

          <ScrollStagger className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerAmount={0.1} offset={["start 0.85", "start 0.1"]}>
            <div className="md:col-span-2 bg-primary-container p-12 md:p-14 rounded-xl flex flex-col justify-between group hover:-translate-y-2 transition-transform shadow-editorial cursor-pointer">
              <div>
                <span className="material-symbols-outlined text-secondary-container text-4xl mb-8 group-hover:scale-110 transition-transform">account_balance</span>
                <h3 className="font-headline text-3xl md:text-4xl text-white mb-6">Exit Strategy Engineering</h3>
                <p className="text-on-primary-container text-lg md:text-xl leading-relaxed max-w-2xl">
                  Positioning your entity for maximum valuation through rigorous financial cleanup, data room preparation, and strategic storytelling.
                </p>
              </div>
              <div className="mt-16 flex items-center text-secondary-container font-label uppercase text-sm tracking-widest transition-opacity group-hover:translate-x-2 w-fit">
                Discover Process <span className="material-symbols-outlined ml-3 text-lg">arrow_forward</span>
              </div>
            </div>

            {/* Impact Metric */}
            <div className="bg-surface-container-highest p-12 rounded-xl flex flex-col justify-center shadow-ambient hover:bg-surface-container-high transition-colors text-center md:text-left">
              <h4 className="font-headline text-6xl md:text-7xl lg:text-8xl text-primary mb-4">
                <ScrollCounter target={94} suffix="%" />
              </h4>
              <p className="font-label font-bold text-primary uppercase tracking-widest text-xs leading-loose">Average Readiness Score Improvement Pre-Transaction</p>
            </div>

            {/* Due Diligence */}
            <div className="bg-secondary-container p-12 rounded-xl flex flex-col justify-between group hover:bg-[#FFB145] hover:-translate-y-2 transition-all shadow-editorial cursor-pointer">
              <div>
                <h3 className="font-headline text-3xl md:text-4xl text-on-secondary-container mb-6 leading-tight">Buy-Side Due Diligence</h3>
                <p className="text-on-secondary-fixed-variant text-lg font-medium leading-relaxed">
                  Protecting your capital through aggressive scrutiny of target financials and synergy assessments.
                </p>
              </div>
              <div className="mt-16 w-14 h-14 rounded-full border border-on-secondary-container flex items-center justify-center group-hover:bg-on-secondary-container transition-colors">
                <span className="material-symbols-outlined text-on-secondary-container group-hover:text-secondary-container transition-colors">trending_up</span>
              </div>
            </div>

            {/* Harmonization */}
            <div className="md:col-span-2 bg-surface-container-low p-12 md:p-14 rounded-xl relative overflow-hidden group shadow-ambient hover:shadow-editorial transition-shadow">
              <div className="relative z-10 h-full flex flex-col justify-end">
                <h3 className="font-headline text-3xl md:text-4xl text-primary mb-6">Post-Merger Harmonization</h3>
                <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed max-w-lg">
                  Ensuring the architectural integrity of the new organization through unified reporting and financial controls.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 group-hover:opacity-20 transition-opacity">
                <img className="w-full h-full object-cover grayscale mix-blend-multiply" alt="Abstract data" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrbY4KB2RLH8x8ijaC8QXgmnzkQYT38FTKbbnL9O2RVzVhDbuTIMwCWVbmO0_zW274Nx5s_8zeX5hZJ3wui8s0TOn4VCLVAet9jfXfkfdh3Kpf21OlGdmHWo3G-51ScOAr8CeyuYfFoY9mIO-aPbl2BOJRYkML6D7faNDaiFdwBnW2sZ8XnBAFBHuPCHgmNPvHdmGeKA5BNhx5fWkvlFRAHszQvJZrwif8nNgjpEuY9YUGGfRq-SmClX07rNyy44-nxjxe6shMn4q3" />
              </div>
            </div>
          </ScrollStagger>
        </div>
      </section>

      {/* Treasury Management */}
      <section className="py-32 md:py-40 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <ScrollSlideIn direction="left" distance={80} className="order-2 lg:order-1 relative">
            <ScrollStagger staggerAmount={0.12} className="grid grid-cols-2 gap-6 relative z-10" offset={["start 0.85", "start 0.15"]}>
              <div className="bg-surface-container-highest p-10 rounded-xl hover:-translate-y-2 transition-transform shadow-sm">
                <span className="material-symbols-outlined text-secondary text-4xl mb-6">payments</span>
                <h4 className="font-headline text-2xl text-primary mb-3 leading-tight">Liquidity Ops</h4>
                <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">Real-time cash positioning and automated sweeping strategies.</p>
              </div>
              <div className="bg-surface-container-high p-10 rounded-xl mt-12 hover:-translate-y-2 transition-transform shadow-sm">
                <span className="material-symbols-outlined text-secondary text-4xl mb-6">currency_exchange</span>
                <h4 className="font-headline text-2xl text-primary mb-3 leading-tight">Forex Strategy</h4>
                <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">Mitigating volatility through sophisticated hedging vehicles.</p>
              </div>
              <div className="bg-surface-container-low p-10 rounded-xl hover:-translate-y-2 transition-transform shadow-sm bg-white/50 backdrop-blur-md">
                <span className="material-symbols-outlined text-secondary text-4xl mb-6">security</span>
                <h4 className="font-headline text-2xl text-primary mb-3 leading-tight">Fraud Defense</h4>
                <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">Institutional-grade payment controls and audit trails.</p>
              </div>
              <div className="bg-surface-container-highest p-10 rounded-xl mt-12 hover:-translate-y-2 transition-transform shadow-sm">
                <span className="material-symbols-outlined text-secondary text-4xl mb-6">lan</span>
                <h4 className="font-headline text-2xl text-primary mb-3 leading-tight">Bank Relations</h4>
                <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">Negotiating credit facilities and tier-one banking perks.</p>
              </div>
            </ScrollStagger>
            <ScrollParallax speed={0.15} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-surface-container-lowest rounded-full blur-3xl opacity-80 z-0" />
          </ScrollSlideIn>

          <ScrollSlideIn direction="right" distance={80} className="order-1 lg:order-2">
            <span className="font-label text-secondary uppercase tracking-[0.4em] text-xs font-bold">Resilience First</span>
            <h2 className="font-headline text-5xl md:text-6xl text-primary mt-6 mb-10 leading-tight">
              <ScrollRevealText text="Institutional Treasury Management" tag="span" />
            </h2>
            <p className="font-body text-on-surface-variant text-lg md:text-xl leading-relaxed mb-12">
              In an era of global volatility, your treasury must be more than a vault—it must be a fortress. We implement adaptive treasury policies that ensure capital availability regardless of market conditions.
            </p>
            <button className="flex items-center gap-6 group">
              <span className="w-16 h-px bg-primary group-hover:w-32 transition-all duration-300"></span>
              <span className="font-label font-bold uppercase tracking-widest text-primary text-sm group-hover:text-secondary-container transition-colors">View Treasury Framework</span>
            </button>
          </ScrollSlideIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 bg-surface-container-low text-center relative overflow-hidden">
        <ScrollLineGrow direction="horizontal" className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary-container to-transparent" offset={["start 0.9", "start 0.6"]} />
        <ScrollScale className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10" scaleRange={[0.85, 1]}>
          <h2 className="font-headline text-5xl md:text-7xl lg:text-8xl text-primary mb-12 leading-tight">
            <ScrollRevealText text="The architect of your financial future starts here." className="justify-center" tag="span" />
          </h2>
          <ScrollFadeUp offset={["start 0.75", "start 0.4"]}>
            <div className="flex justify-center">
              <Link to="/contact" className="bg-primary text-white px-12 py-6 rounded-xl font-label font-bold uppercase tracking-widest text-sm hover:bg-primary-container active:scale-95 transition-all shadow-editorial flex items-center gap-4">
                Schedule an Advisory Brief <span className="material-symbols-outlined text-lg">call_made</span>
              </Link>
            </div>
          </ScrollFadeUp>
        </ScrollScale>
      </section>
    </div>
  );
}
