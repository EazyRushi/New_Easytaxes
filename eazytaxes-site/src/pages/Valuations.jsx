import React from 'react';
import {
  ScrollFadeUp,
  ScrollSlideIn,
  ScrollStagger,
  ScrollRevealText,
  ScrollParallax,
  ScrollClipReveal,
} from '../components/animations/ScrollAnimations';

export default function Valuations() {
  return (
    <div className="w-full">
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-primary text-white -mt-20 pt-20">
        <ScrollParallax speed={0.3} className="absolute inset-0 opacity-20 pointer-events-none">
          <img className="w-full h-full object-cover mix-blend-multiply" alt="Modern architecture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtC0XZ5hGdShLoH79QyzNgPVL7-i7X38cyjuPzWgot_WAAIFZtao-W13JMFevNKmEhSHXQUomUEAYIgcgDmr3mT2wD3p1qDpbSYlxGheeD79oOuOCGgCIxpT_y4MevdWrsMTQdCKdVWg1qJDYwFgO8lrSBmFdpsZbejkfUOaJxg5sxM7aSRmRMnYJY019uD9RdfPnhZulGznPHZ07N56X4BuoNyjY6_jf9uf0k3ggeX7L_Iy4Ya8KtRKZRIyDlk9DCV8-EKOO78zBK" />
        </ScrollParallax>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <ScrollSlideIn direction="left" distance={80}>
            <div className="max-w-4xl">
              <span className="font-label text-secondary-container uppercase tracking-[0.3em] text-sm mb-6 block">Defensible Metrics</span>
              <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight">
                Enterprise <br/>
                <span className="italic font-normal">Valuations.</span>
              </h1>
              <p className="text-xl md:text-2xl font-body text-on-primary-container leading-relaxed mb-8">
                Data-driven appraisal models for 409A, taxation, and transactional fairness. Defensible frameworks for high-stakes capital events.
              </p>
              <button className="bg-secondary-container text-on-secondary-container px-10 py-5 rounded-lg font-label font-bold uppercase tracking-widest text-sm hover:brightness-110 active:scale-95 transition-all shadow-editorial">
                Request Valuation
              </button>
            </div>
          </ScrollSlideIn>
        </div>
      </section>

      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollFadeUp className="mb-16" offset={["start 0.9", "start 0.55"]}>
            <h2 className="font-headline text-4xl text-primary mb-4">
              <ScrollRevealText text="Precision Analysis" tag="span" />
            </h2>
            <div className="w-16 h-1 bg-secondary-container"></div>
          </ScrollFadeUp>

          <ScrollStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerAmount={0.12} offset={["start 0.85", "start 0.2"]}>
            <div className="bg-surface-container-highest p-10 rounded-xl shadow-sm hover:shadow-ambient transition-shadow border-l-4 border-secondary-container">
              <span className="material-symbols-outlined text-4xl text-secondary mb-6">trending_up</span>
              <h3 className="font-headline text-2xl text-primary mb-3">409A Valuations</h3>
              <p className="text-on-surface-variant leading-relaxed">Ensure safe-harbor protection and grant equity with total confidence.</p>
            </div>
            <div className="bg-surface-container-highest p-10 rounded-xl shadow-sm hover:shadow-ambient transition-shadow border-l-4 border-secondary-container">
              <span className="material-symbols-outlined text-4xl text-secondary mb-6">handshake</span>
              <h3 className="font-headline text-2xl text-primary mb-3">Fairness Opinions</h3>
              <p className="text-on-surface-variant leading-relaxed">Independent reviews of proposed M&A transactions defending board fiduciary duties.</p>
            </div>
            <div className="bg-surface-container-highest p-10 rounded-xl shadow-sm hover:shadow-ambient transition-shadow border-l-4 border-secondary-container">
              <span className="material-symbols-outlined text-4xl text-secondary mb-6">analytics</span>
              <h3 className="font-headline text-2xl text-primary mb-3">Gift & Estate Tax</h3>
              <p className="text-on-surface-variant leading-relaxed">Strategic appraisals to support wealth transfer planning and IRS audits.</p>
            </div>
          </ScrollStagger>
        </div>
      </section>
    </div>
  );
}
