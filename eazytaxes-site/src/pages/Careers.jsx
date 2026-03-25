import React from 'react';
import {
  ScrollFadeUp,
  ScrollSlideIn,
  ScrollStagger,
  ScrollRevealText,
  ScrollLineGrow,
} from '../components/animations/ScrollAnimations';

export default function Careers() {
  return (
    <div className="w-full">
      <section className="relative min-h-[70vh] flex items-center overflow-hidden editorial-gradient -mt-20 pt-20">
        <div className="absolute inset-0 opacity-10 pointer-events-none"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <ScrollSlideIn direction="left" distance={80}>
            <div className="max-w-4xl">
              <span className="font-label text-secondary-fixed-dim uppercase tracking-[0.3em] text-sm mb-6 block">Join the Firm</span>
              <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-tight">
                Where Precision <br/>
                <span className="italic font-normal">Meets Purpose.</span>
              </h1>
              <p className="text-xl md:text-2xl font-body text-on-primary-container leading-relaxed mb-8">
                Build your career at a firm that values analytical rigor, editorial standards, and continuous professional advancement.
              </p>
              <button className="bg-white text-primary px-10 py-5 rounded-lg font-label font-bold uppercase tracking-widest text-sm hover:bg-surface transition-all shadow-editorial">
                View Open Roles
              </button>
            </div>
          </ScrollSlideIn>
        </div>
      </section>

      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollFadeUp className="mb-16" offset={["start 0.9", "start 0.55"]}>
            <h2 className="font-headline text-4xl text-primary mb-4">
              <ScrollRevealText text="Open Positions" tag="span" />
            </h2>
            <ScrollLineGrow direction="horizontal" className="w-16 h-1 bg-secondary-container" offset={["start 0.85", "start 0.55"]} />
          </ScrollFadeUp>

          <ScrollStagger className="space-y-6" staggerAmount={0.15} offset={["start 0.85", "start 0.15"]}>
            <div className="bg-surface-container-highest p-8 md:p-10 rounded-xl flex flex-col md:flex-row justify-between items-center group cursor-pointer hover:shadow-ambient transition-all">
              <div>
                <span className="font-label text-xs uppercase tracking-widest text-secondary font-bold mb-2 block">New York / Hybrid</span>
                <h3 className="font-headline text-2xl text-primary">Senior Audit Manager</h3>
                <p className="text-on-surface-variant mt-2 max-w-xl">Lead complex SOC 2 and financial statement audits for high-growth enterprise SaaS entities.</p>
              </div>
              <div className="mt-6 md:mt-0 flex shrink-0">
                <button className="bg-primary text-white px-8 py-3 rounded-lg font-label uppercase tracking-widest text-xs font-bold transition-all group-hover:bg-primary-container">
                  Apply Now
                </button>
              </div>
            </div>

            <div className="bg-surface-container-highest p-8 md:p-10 rounded-xl flex flex-col md:flex-row justify-between items-center group cursor-pointer hover:shadow-ambient transition-all">
              <div>
                <span className="font-label text-xs uppercase tracking-widest text-secondary font-bold mb-2 block">Remote / US</span>
                <h3 className="font-headline text-2xl text-primary">Tax Resolution Advocate (EA/CPA)</h3>
                <p className="text-on-surface-variant mt-2 max-w-xl">Represent corporate clients in intricate negotiations with the IRS and state authorities.</p>
              </div>
              <div className="mt-6 md:mt-0 flex shrink-0">
                <button className="bg-primary text-white px-8 py-3 rounded-lg font-label uppercase tracking-widest text-xs font-bold transition-all group-hover:bg-primary-container">
                  Apply Now
                </button>
              </div>
            </div>

            <div className="bg-surface-container-highest p-8 md:p-10 rounded-xl flex flex-col md:flex-row justify-between items-center group cursor-pointer hover:shadow-ambient transition-all">
              <div>
                <span className="font-label text-xs uppercase tracking-widest text-secondary font-bold mb-2 block">San Francisco</span>
                <h3 className="font-headline text-2xl text-primary">Fractional CFO Associate</h3>
                <p className="text-on-surface-variant mt-2 max-w-xl">Provide foundational financial modeling, forecasting, and M&A readiness analysis for Series A-C startups.</p>
              </div>
              <div className="mt-6 md:mt-0 flex shrink-0">
                <button className="bg-primary text-white px-8 py-3 rounded-lg font-label uppercase tracking-widest text-xs font-bold transition-all group-hover:bg-primary-container">
                  Apply Now
                </button>
              </div>
            </div>
          </ScrollStagger>
        </div>
      </section>
    </div>
  );
}
