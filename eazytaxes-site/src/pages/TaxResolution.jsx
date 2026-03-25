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

export default function TaxResolution() {
  return (
    <div className="w-full relative">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-primary text-white -mt-20 pt-20">
        <ScrollParallax speed={0.3} className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
          <img alt="Professional architectural office interior" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBRx867VMEd3CaATg9NC-6j-S3q3mEsIni5R9VMRxwxb2GGcFx8ZaYSTFzdJmmYk5TfZmYC55ektINxJoaR0hk5oRkqMxpM493WBIJV7kJPBzsuSc2ObhJkWuCKOGQ6cgieNW1xlHPo0IK7twIqJpUXi-Yg6CMACe4xgpnTx6zdhBSRozmLDog-IJYlp_VRQp8hEo-AvkPv1UV49tgsJN07ebXwOXxlKGUxd7zieZhB9VFjbIeD5kHQEHQU_EFiPCzKjIniuPzzOBJ" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent"></div>
        </ScrollParallax>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <ScrollSlideIn direction="left" distance={80}>
            <span className="font-label text-secondary-fixed-dim uppercase tracking-[0.3em] text-sm mb-6 block">The Architectural Ledger</span>
            <h1 className="font-headline text-6xl md:text-8xl mb-8 leading-tight tracking-tight">
              Strategic <br/>
              <span className="italic font-normal">Resolution.</span>
            </h1>
            <p className="text-xl md:text-2xl font-body text-on-primary-container leading-relaxed mb-12 max-w-2xl">
              Restoring financial equilibrium through meticulous IRS negotiation and bespoke debt restructuring. Experience clarity in complexity.
            </p>
            <div className="flex gap-6">
              <Link to="/contact" className="bg-secondary-container text-on-secondary-container px-10 py-5 rounded-lg font-label font-bold uppercase tracking-widest text-sm hover:brightness-110 active:scale-95 transition-all shadow-editorial">
                Consult a Specialist
              </Link>
            </div>
          </ScrollSlideIn>
        </div>

        {/* Progress Line Indicator */}
        <ScrollLineGrow direction="horizontal" className="absolute bottom-0 right-0 w-1/3 h-px bg-secondary-fixed-dim/30 hidden lg:block" />
      </section>

      {/* Solutions Grid */}
      <section className="py-24 md:py-32 px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollFadeUp className="mb-16 md:mb-20" offset={["start 0.9", "start 0.55"]}>
          <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl text-primary mb-6">Core Solutions</h2>
          <p className="font-body text-on-surface-variant max-w-2xl text-lg md:text-xl leading-relaxed">
            We approach tax debt with the precision of an architect, rebuilding your financial standing from the foundation up.
          </p>
        </ScrollFadeUp>

        <ScrollStagger className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8" staggerAmount={0.1} offset={["start 0.85", "start 0.1"]}>
          {/* IRS Negotiation */}
          <div className="md:col-span-7 bg-primary-container p-10 md:p-14 rounded-xl flex flex-col justify-between min-h-[400px] text-white overflow-hidden relative group shadow-editorial cursor-pointer hover:-translate-y-2 transition-transform">
            <div className="relative z-10">
              <span className="material-symbols-outlined text-5xl text-secondary-container mb-8 group-hover:scale-110 transition-transform">gavel</span>
              <h3 className="font-headline text-3xl md:text-4xl mb-6">IRS Negotiation</h3>
              <p className="font-body text-on-primary-container text-lg leading-relaxed max-w-lg">
                Our advocates engage directly with the IRS to secure Offers in Compromise, installment agreements, and penalty abatements.
              </p>
            </div>
            <div className="mt-12 relative z-10">
              <span className="font-label uppercase tracking-widest text-sm font-bold flex items-center gap-3 group-hover:gap-5 transition-all text-secondary-fixed-dim">
                View Methodology <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </span>
            </div>
            <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-white/5 rounded-full blur-3xl group-hover:bg-secondary-container/10 transition-colors"></div>
          </div>

          {/* Debt Restructuring */}
          <div className="md:col-span-5 bg-surface-container-highest p-10 md:p-12 border-t-8 border-l-0 md:border-t-0 md:border-l-8 border-secondary-container rounded-xl flex flex-col justify-between shadow-ambient hover:shadow-editorial transition-shadow">
            <div>
              <span className="material-symbols-outlined text-5xl text-primary mb-8">account_balance_wallet</span>
              <h3 className="font-headline text-3xl text-primary mb-6">Debt Restructuring</h3>
              <p className="font-body text-on-surface-variant text-lg leading-relaxed">
                Strategic realignment of liabilities to preserve cash flow and protect enterprise value.
              </p>
            </div>
            <div className="mt-10">
              <ul className="space-y-4 font-label text-xs md:text-sm uppercase tracking-wider text-primary font-bold">
                <li className="flex items-center gap-4 bg-surface-container-lowest p-3 rounded-lg shadow-sm"><span className="w-2 h-2 rounded-full bg-secondary shrink-0"></span> Liability Audit</li>
                <li className="flex items-center gap-4 bg-surface-container-lowest p-3 rounded-lg shadow-sm"><span className="w-2 h-2 rounded-full bg-secondary shrink-0"></span> Cashflow Protection</li>
                <li className="flex items-center gap-4 bg-surface-container-lowest p-3 rounded-lg shadow-sm"><span className="w-2 h-2 rounded-full bg-secondary shrink-0"></span> Creditor Mediation</li>
              </ul>
            </div>
          </div>

          {/* Outcome Focused */}
          <div className="md:col-span-5 bg-surface-container-low p-10 md:p-12 rounded-xl flex flex-col justify-center shadow-ambient hover:bg-surface-container-high transition-colors text-center md:text-left">
            <span className="material-symbols-outlined text-5xl text-secondary mb-8 mx-auto md:mx-0">verified_user</span>
            <h3 className="font-headline text-3xl text-primary mb-6">Favorable Outcomes</h3>
            <p className="font-body text-on-surface-variant text-lg leading-relaxed">
              Our objective is a clean slate. We focus on long-term sustainability and compliance integrity.
            </p>
          </div>

          {/* Image Feature */}
          <div className="md:col-span-7 relative overflow-hidden min-h-[350px] rounded-xl shadow-editorial group">
            <img alt="Financial analysis papers" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgAHlln-B9r5s5Y9aWQd8rRVYr5pmUossnw6xomNZG6qApr2i7H3KcnD1r2nlfthRSXZxa88efSRSFqFELYoODlgLQsipiBYg4-fNCLxGjpcnyyFRKl4ZhsLKyAT4UcOwcWm_qWQDdxMyBfX2Z2-_0S_x8WKMUCZV2fiVAglQvF_Sg656Wsr43-s-lD4I_oZ5pEe0_NliZFfceO2nvznhyJbg6ZSkyaNbNCiXy7HtXVwhrVEkjnXt5UX_GYiwUdK-uPlpPoykr_M6o" />
            <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500"></div>
          </div>
        </ScrollStagger>
      </section>

      {/* Sequential Process */}
      <section className="py-24 md:py-40 bg-surface-container-lowest relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollFadeUp className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-8 relative z-10" offset={["start 0.9", "start 0.5"]}>
            <div className="max-w-2xl">
              <span className="font-label text-secondary uppercase tracking-[0.2em] text-sm mb-6 block font-bold">The Resolution Journey</span>
              <h2 className="font-headline text-5xl md:text-6xl lg:text-7xl text-primary leading-tight">
                <ScrollRevealText text="A Sequential Path to Restoration." className="" tag="span" />
              </h2>
            </div>
            <div className="lg:text-right">
              <p className="font-body text-on-surface-variant text-xl leading-relaxed max-w-sm lg:ml-auto border-l-2 lg:border-l-0 lg:border-r-2 border-secondary-container pl-6 lg:pl-0 lg:pr-6">
                Four deliberate phases to transition from debt to absolute compliance.
              </p>
            </div>
          </ScrollFadeUp>

          <div className="relative pt-12">
            {/* Path Line */}
            <ScrollLineGrow direction="horizontal" className="absolute top-20 left-0 w-full h-[2px] bg-outline-variant/30 hidden lg:block z-0" offset={["start 0.7", "start 0.2"]} />

            <ScrollStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10" staggerAmount={0.12} offset={["start 0.8", "start 0.1"]}>
              <div className="group relative">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary text-secondary-fixed-dim flex items-center justify-center mb-10 font-headline text-2xl md:text-3xl group-hover:scale-110 transition-transform shadow-lg relative z-10 mx-auto lg:mx-0">
                  01
                </div>
                <h4 className="font-headline text-2xl text-primary mb-4 text-center lg:text-left">Diagnosis</h4>
                <p className="font-body text-on-surface-variant leading-relaxed text-center lg:text-left">
                  A comprehensive forensic review of your tax history and current notices to identify structural vulnerabilities.
                </p>
              </div>

              <div className="group relative">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-surface-container-high text-primary flex items-center justify-center mb-10 font-headline text-2xl md:text-3xl group-hover:scale-110 transition-transform shadow-lg relative z-10 mx-auto lg:mx-0">
                  02
                </div>
                <h4 className="font-headline text-2xl text-primary mb-4 text-center lg:text-left">Intervention</h4>
                <p className="font-body text-on-surface-variant leading-relaxed text-center lg:text-left">
                  Immediate halt of aggressive collection actions including levies and garnishments through formal representation.
                </p>
              </div>

              <div className="group relative">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-surface-container-high text-primary flex items-center justify-center mb-10 font-headline text-2xl md:text-3xl group-hover:scale-110 transition-transform shadow-lg relative z-10 mx-auto lg:mx-0">
                  03
                </div>
                <h4 className="font-headline text-2xl text-primary mb-4 text-center lg:text-left">Negotiation</h4>
                <p className="font-body text-on-surface-variant leading-relaxed text-center lg:text-left">
                  Strategic dialogue with governing bodies to finalize settlement terms or restructured payment plans.
                </p>
              </div>

              <div className="group relative">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-10 font-headline text-2xl md:text-3xl group-hover:scale-110 transition-transform shadow-lg relative z-10 mx-auto lg:mx-0">
                  04
                </div>
                <h4 className="font-headline text-2xl text-primary mb-4 text-center lg:text-left">Resolution</h4>
                <p className="font-body text-on-surface-variant leading-relaxed text-center lg:text-left">
                  Finalization of all agreements and implementation of compliance protocols to prevent future liabilities.
                </p>
              </div>
            </ScrollStagger>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-40 px-6 lg:px-8">
        <ScrollScale className="max-w-6xl mx-auto bg-primary text-white p-12 md:p-24 rounded-3xl relative overflow-hidden text-center shadow-editorial" scaleRange={[0.88, 1]}>
          <div className="relative z-10">
            <h2 className="font-headline text-5xl md:text-6xl lg:text-7xl mb-10 leading-tight">
              <ScrollRevealText text="Secure your financial legacy today." className="justify-center" tag="span" />
            </h2>
            <ScrollBlurReveal offset={["start 0.75", "start 0.35"]}>
              <p className="font-body text-on-primary-container text-xl md:text-2xl mb-16 max-w-3xl mx-auto opacity-90 leading-relaxed">
                Join the thousands of professionals who have restored their fiscal stability through EazyTaxes Tax Resolution services.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/contact" className="bg-secondary-container text-on-secondary-container px-12 py-5 rounded-lg font-label font-bold uppercase tracking-widest text-sm hover:brightness-110 active:scale-95 transition-all shadow-xl">
                  Schedule Case Review
                </Link>
                <button className="bg-transparent border-2 border-white/20 text-white px-12 py-5 rounded-lg font-label font-bold uppercase tracking-widest text-sm hover:bg-white/10 active:scale-95 transition-all">
                  Request Whitepaper
                </button>
              </div>
            </ScrollBlurReveal>
          </div>

          {/* Abstract visual element */}
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M0,100 L100,0 L100,100 Z" fill="white"></path>
            </svg>
          </div>
        </ScrollScale>
      </section>
    </div>
  );
}
