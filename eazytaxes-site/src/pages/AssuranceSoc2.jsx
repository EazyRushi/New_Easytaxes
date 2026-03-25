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
} from '../components/animations/ScrollAnimations';

export default function AssuranceSoc2() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden editorial-gradient -mt-20 pt-20">
        <div className="noise-overlay absolute inset-0 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-16 items-center w-full">
          <ScrollSlideIn direction="left" distance={80}>
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-secondary-fixed-dim font-label text-xs uppercase tracking-widest">
                <span className="material-symbols-outlined text-sm">verified_user</span>
                Assurance Division
              </div>
              <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl text-white leading-tight">
                Trust through <br/>
                <span className="italic text-secondary-container">Rigor.</span>
              </h1>
              <p className="text-on-primary-container text-xl max-w-xl leading-relaxed">
                Navigate the complexities of institutional trust with our architectural approach to SOC 2 compliance and financial statement audits. Precision is not an option; it is our foundation.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-md font-label font-bold uppercase tracking-widest transition-all hover:brightness-110 active:scale-95 shadow-editorial text-sm">
                  Speak with an Auditor
                </button>
                <button className="border border-white/20 text-white px-8 py-4 rounded-md font-label font-bold uppercase tracking-widest transition-all hover:bg-white/5 text-sm">
                  View Certifications
                </button>
              </div>
            </div>
          </ScrollSlideIn>

          <ScrollClipReveal direction="right" className="relative hidden lg:block" offset={["start 0.85", "start 0.3"]}>
            <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl relative">
              <img className="w-full h-full object-cover" alt="Modern architectural interior" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDe1b4n8AMC00ZYurq7yhYU-eMQpAu5eudmrymap6XnydVKo7vpXPG-_t_D7NIZwNUeVQ_WwovtKVjHYGYl4MgFnnyt0T-BXdrvhmrhUWEhY-Oe3v_C6M-QzmJhOCgM5Ya1WcvBJ1muy8tc03T8PpjHwVSpTFt1mQ7bGVkjHw3-SeaPs3W4V57mJYLcsSyWrxw2Ya1gwi2ow4Dm8rCLX7GSgtx3mspKtyapKz6PeHpsP-AfDXK7WeXOg2H6KvGQmwYxnRiOIoBxr1GJ" />
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
            </div>
            <ScrollFadeUp className="absolute -bottom-8 -left-8 bg-surface-container-lowest p-8 rounded-lg shadow-xl max-w-xs" offset={["start 0.7", "start 0.35"]}>
              <p className="font-headline italic text-primary text-lg mb-2">"Absolute precision in every ledger."</p>
              <div className="w-12 h-1 bg-secondary-container mb-4"></div>
              <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant">The EazyTaxes Standard</p>
            </ScrollFadeUp>
          </ScrollClipReveal>
        </div>
      </section>

      {/* SOC 2 Section */}
      <section className="py-24 md:py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollFadeUp className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20 gap-8" offset={["start 0.9", "start 0.55"]}>
            <div className="max-w-2xl">
              <span className="font-label text-sm uppercase tracking-[0.2em] text-secondary font-bold">Information Security</span>
              <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl text-primary mt-4 leading-tight">
                <ScrollRevealText text="SOC 2 Type I & II Compliance" className="" tag="span" />
              </h2>
            </div>
            <p className="text-on-surface-variant md:max-w-xs font-headline italic text-xl border-l-2 border-secondary-container pl-6 leading-relaxed">
              Securing your digital infrastructure with audits that go beyond the checkbox.
            </p>
          </ScrollFadeUp>

          <ScrollStagger className="grid md:grid-cols-2 gap-8" staggerAmount={0.15} offset={["start 0.85", "start 0.2"]}>
            <div className="bg-surface-container-highest p-10 md:p-14 rounded-xl flex flex-col justify-between group hover:bg-primary transition-colors duration-500 shadow-sm hover:shadow-editorial cursor-pointer">
              <div>
                <span className="material-symbols-outlined text-4xl text-secondary mb-8 group-hover:text-secondary-fixed-dim transition-colors">security</span>
                <h3 className="font-headline text-3xl text-primary mb-4 group-hover:text-white transition-colors">Type I Readiness & Report</h3>
                <p className="text-on-surface-variant text-lg leading-relaxed group-hover:text-on-primary-container transition-colors">
                  A point-in-time assessment of your system's design. We validate that your controls are suitably designed to meet the trust service criteria.
                </p>
              </div>
              <div className="mt-16 flex items-center gap-4 text-secondary font-label font-bold uppercase tracking-widest text-sm group-hover:text-secondary-fixed-dim transition-colors">
                Phase Details <span className="material-symbols-outlined transform group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </div>
            </div>

            <div className="bg-surface-container-highest p-10 md:p-14 rounded-xl flex flex-col justify-between group hover:bg-primary transition-colors duration-500 shadow-sm hover:shadow-editorial cursor-pointer">
              <div>
                <span className="material-symbols-outlined text-4xl text-secondary mb-8 group-hover:text-secondary-fixed-dim transition-colors">verified</span>
                <h3 className="font-headline text-3xl text-primary mb-4 group-hover:text-white transition-colors">Type II Operational Excellence</h3>
                <p className="text-on-surface-variant text-lg leading-relaxed group-hover:text-on-primary-container transition-colors">
                  A rigorous evaluation of control effectiveness over a period of 6-12 months. The ultimate hallmark of operational maturity for SaaS leaders.
                </p>
              </div>
              <div className="mt-16 flex items-center gap-4 text-secondary font-label font-bold uppercase tracking-widest text-sm group-hover:text-secondary-fixed-dim transition-colors">
                Request Sample Report <span className="material-symbols-outlined transform group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </div>
            </div>
          </ScrollStagger>
        </div>
      </section>

      {/* Audit Phases */}
      <section className="py-24 md:py-32 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollFadeUp className="mb-20 text-center" offset={["start 0.9", "start 0.55"]}>
            <h2 className="font-headline text-4xl md:text-5xl text-primary mb-6">The Architectural Audit Journey</h2>
            <ScrollLineGrow direction="horizontal" className="w-24 h-1 bg-secondary-container mx-auto" offset={["start 0.85", "start 0.5"]} />
          </ScrollFadeUp>

          <ScrollStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerAmount={0.1} offset={["start 0.85", "start 0.15"]}>
            <div className="bg-surface-container-lowest p-8 rounded-xl border-l-4 border-secondary-fixed-dim shadow-sm hover:-translate-y-2 transition-transform">
              <span className="font-headline text-5xl font-normal text-on-surface-variant opacity-10 block mb-6">01</span>
              <h4 className="font-headline text-2xl text-primary mb-3">Scoping</h4>
              <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">Identifying key Trust Service Criteria (TSC) relevant to your specific business model and client expectations.</p>
            </div>

            <div className="bg-surface-container-lowest p-8 rounded-xl border-l-4 border-secondary-fixed-dim shadow-sm hover:-translate-y-2 transition-transform">
              <span className="font-headline text-5xl font-normal text-on-surface-variant opacity-10 block mb-6">02</span>
              <h4 className="font-headline text-2xl text-primary mb-3">Gap Analysis</h4>
              <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">Rigorous testing of current controls to uncover vulnerabilities before the formal audit period begins.</p>
            </div>

            <div className="bg-surface-container-lowest p-8 rounded-xl border-l-4 border-secondary-fixed-dim shadow-sm hover:-translate-y-2 transition-transform">
              <span className="font-headline text-5xl font-normal text-on-surface-variant opacity-10 block mb-6">03</span>
              <h4 className="font-headline text-2xl text-primary mb-3">Remediation</h4>
              <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">Strategic guidance on implementing missing controls and formalizing documentation for compliance.</p>
            </div>

            <div className="bg-surface-container-lowest p-8 rounded-xl border-l-4 border-secondary-fixed-dim shadow-sm hover:-translate-y-2 transition-transform">
              <span className="font-headline text-5xl font-normal text-on-surface-variant opacity-10 block mb-6">04</span>
              <h4 className="font-headline text-2xl text-primary mb-3">Examination</h4>
              <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">Formal field work where our auditors collect evidence and finalize the opinion report for stakeholders.</p>
            </div>
          </ScrollStagger>
        </div>
      </section>

      {/* Financial Statement Audits */}
      <section className="py-24 md:py-40 overflow-hidden bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-20 lg:gap-24 items-center">
          <ScrollSlideIn direction="left" distance={80} className="order-2 lg:order-1 relative">
            <div className="grid grid-cols-2 gap-4 md:gap-6 relative z-10">
              <ScrollScale className="aspect-square rounded-xl overflow-hidden shadow-lg mt-12 md:mt-16" scaleRange={[0.9, 1]}>
                <img className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Architectural drawings" src="https://lh3.googleusercontent.com/aida-public/AB6AXuARMhMvhLL2deL_2OsMwGlx6XE_T20GbQvsnRs0guLMyabPrdE99WYir62bHmuJiq4TwbSNkE0JfvDRbJaOkGWNq1_DXSk-JF2xsGF6RFf6dn-SakqK3b5nS_bw7dhq2-hn_NAQU3g0mWOPTsG513ka7yu9wO2JlrObwE3Rt4yxckP72-CeYwf9ZOkm52_dJGFnkCvn8pdyRP-LK2_l5vaHDfjeaMlF6oR9TuRFiRXU_fCCxhUh9KXyPqlh9GmLW-pLQ7HSy_6BaW5e" />
              </ScrollScale>
              <ScrollScale className="aspect-square rounded-xl overflow-hidden shadow-lg" scaleRange={[0.9, 1]} offset={["start 0.85", "center center"]}>
                <img className="w-full h-full object-cover" alt="Professional consultant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvF6Q_ONxUoEFRhARQT4c7a4mpLvHFbfhuUvmPGCOhpYzxsQlZLQe7xJCc4ht091BittKOc_NK1cF-joUFSYx-P9fSbXfULcsyg09mfGwwUgkpaWTUzcamAr6N9Bs5B9-MImjJyrlXdXll3WJ8C04hH1HrotYLb7t2LtFWsYUSVGYKkawXAyyn0z1ghfkXL9OBl42eg_ZdSgbOmm3L6I4LQQiOUYR19U-KEv--hk73G5YogE9IGogBCevA742LvsxkhZNEk2zpPuZM" />
              </ScrollScale>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-surface-container-highest rounded-full blur-3xl opacity-50 z-0"></div>
          </ScrollSlideIn>

          <ScrollSlideIn direction="right" distance={80} className="order-1 lg:order-2 space-y-8">
            <span className="font-label text-sm uppercase tracking-[0.2em] text-secondary font-bold">Institutional Assurance</span>
            <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl text-primary leading-tight">
              <ScrollRevealText text="Financial Statement Audit & Review" tag="span" />
            </h2>
            <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed max-w-lg">
              For organizations requiring the highest level of assurance for investors, lenders, or regulators. We provide comprehensive audits, reviews, and compilations that stand up to the most intense scrutiny.
            </p>
            <ul className="space-y-6 pt-4">
              <li className="flex items-start gap-4 p-4 rounded-lg hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined text-secondary shrink-0 text-3xl">check_circle</span>
                <div>
                  <h5 className="font-headline text-xl text-primary mb-1">Annual Statutory Audits</h5>
                  <p className="text-on-surface-variant leading-relaxed">Full-scope verification of balance sheets and income statements.</p>
                </div>
              </li>
              <li className="flex items-start gap-4 p-4 rounded-lg hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined text-secondary shrink-0 text-3xl">check_circle</span>
                <div>
                  <h5 className="font-headline text-xl text-primary mb-1">Review Engagements</h5>
                  <p className="text-on-surface-variant leading-relaxed">Analytical procedures providing limited assurance for mid-market growth.</p>
                </div>
              </li>
            </ul>
            <button className="bg-primary text-white px-10 py-5 rounded-lg font-label font-bold uppercase tracking-widest text-sm hover:bg-primary-container active:scale-95 transition-all shadow-editorial mt-4 inline-block">
              Schedule an Assessment
            </button>
          </ScrollSlideIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-container py-24 md:py-32 relative overflow-hidden">
        <div className="noise-overlay absolute inset-0 pointer-events-none"></div>
        <ScrollScale className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10" scaleRange={[0.85, 1]} offset={["start 0.85", "center center"]}>
          <h2 className="font-headline text-4xl md:text-6xl text-white mb-8 leading-tight">
            <ScrollRevealText text="Ready to cement your market authority?" className="justify-center" tag="span" />
          </h2>
          <ScrollBlurReveal offset={["start 0.75", "start 0.4"]}>
            <p className="text-on-primary-container text-xl md:text-2xl mb-12 max-w-2xl mx-auto opacity-90">Join 500+ technology leaders who trust EazyTaxes for their assurance needs.</p>
            <div className="bg-surface p-1.5 rounded-lg inline-flex max-w-md w-full shadow-2xl focus-within:ring-2 focus-within:ring-secondary-container transition-all">
              <input className="bg-transparent border-none focus:ring-0 flex-grow px-6 py-4 font-body outline-none" placeholder="Email Address" type="email" />
              <button className="bg-secondary-container text-on-secondary-container px-8 py-3 rounded-md font-label font-bold uppercase tracking-widest text-sm hover:brightness-110 active:scale-95 transition-all">Connect</button>
            </div>
          </ScrollBlurReveal>
        </ScrollScale>
      </section>
    </div>
  );
}
