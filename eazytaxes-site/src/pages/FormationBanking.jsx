import React from 'react';
import {
  ScrollFadeUp,
  ScrollSlideIn,
  ScrollStagger,
  ScrollRevealText,
  ScrollParallax,
} from '../components/animations/ScrollAnimations';

export default function FormationBanking() {
  return (
    <div className="w-full">
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-primary text-white -mt-20 pt-20">
        <ScrollParallax speed={0.3} className="absolute inset-0 opacity-20 pointer-events-none">
          <img className="w-full h-full object-cover mix-blend-multiply" alt="Modern banking architecture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-nkaSxbGG3V-kx4ZEuLF17ZEcCf90jf1IHxSG3bRiWcOOIn_mBlGq31Ow02DX8oN8msMKuj3eHtn-ub9MwA5MRrZCHjJrz7NgD0H0dhHN_KItFvEJ5omBDXA0Rd-8CTBqn_PnLM7La1L4WbygW2rov6hX8NfhJrsPTOFX7Nnegy8YACUbaQTr121fWJWMlZ93Eszh13X6TYJyDkBhW3gR7M2HYoSI0aqbnkjDtgwErVgTtJCW8kmH00g1ndkR7poJHZZiqEMuZho_" />
        </ScrollParallax>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <ScrollSlideIn direction="left" distance={80}>
            <div className="max-w-4xl">
              <span className="font-label text-secondary-container uppercase tracking-[0.3em] text-sm mb-6 block">Foundational Integrity</span>
              <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight">
                Formation & <br/>
                <span className="italic font-normal">Banking.</span>
              </h1>
              <p className="text-xl md:text-2xl font-body text-on-primary-container leading-relaxed mb-8">
                End-to-end structural setup for new ventures, from entity incorporation to institutional banking integration.
              </p>
              <button className="bg-secondary-container text-on-secondary-container px-10 py-5 rounded-lg font-label font-bold uppercase tracking-widest text-sm hover:brightness-110 active:scale-95 transition-all shadow-editorial">
                Start Formation
              </button>
            </div>
          </ScrollSlideIn>
        </div>
      </section>

      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollFadeUp className="mb-16" offset={["start 0.9", "start 0.55"]}>
            <h2 className="font-headline text-4xl text-primary mb-4">
              <ScrollRevealText text="Structural Setup Services" tag="span" />
            </h2>
            <div className="w-16 h-1 bg-secondary-container"></div>
          </ScrollFadeUp>

          <ScrollStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerAmount={0.12} offset={["start 0.85", "start 0.2"]}>
            <div className="bg-surface-container-lowest p-10 rounded-xl shadow-sm hover:shadow-ambient transition-shadow">
              <span className="material-symbols-outlined text-4xl text-secondary mb-6">domain</span>
              <h3 className="font-headline text-2xl text-primary mb-3">Entity Selection</h3>
              <p className="text-on-surface-variant leading-relaxed">Tax-optimized structuring (C-Corp, LLC) modeled for future venture funding or M&A.</p>
            </div>
            <div className="bg-surface-container-lowest p-10 rounded-xl shadow-sm hover:shadow-ambient transition-shadow">
              <span className="material-symbols-outlined text-4xl text-secondary mb-6">assured_workload</span>
              <h3 className="font-headline text-2xl text-primary mb-3">Corporate Finance</h3>
              <p className="text-on-surface-variant leading-relaxed">Establishing tier-one commercial banking relationships, treasury rails, and credit facilities.</p>
            </div>
            <div className="bg-surface-container-lowest p-10 rounded-xl shadow-sm hover:shadow-ambient transition-shadow">
              <span className="material-symbols-outlined text-4xl text-secondary mb-6">public</span>
              <h3 className="font-headline text-2xl text-primary mb-3">Multi-State Registration</h3>
              <p className="text-on-surface-variant leading-relaxed">Seamlessly managing foreign qualifications across operational footprint to ensure compliance.</p>
            </div>
          </ScrollStagger>
        </div>
      </section>
    </div>
  );
}
