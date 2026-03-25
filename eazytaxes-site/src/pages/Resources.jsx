import React from 'react';
import {
  ScrollFadeUp,
  ScrollSlideIn,
  ScrollStagger,
  ScrollRevealText,
  ScrollBlurReveal,
} from '../components/animations/ScrollAnimations';

export default function Resources() {
  return (
    <div className="w-full">
      <section className="relative min-h-[60vh] flex items-center overflow-hidden editorial-gradient -mt-20 pt-20">
        <div className="absolute inset-0 opacity-10 pointer-events-none"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <ScrollSlideIn direction="down" distance={60}>
            <div className="max-w-4xl">
              <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-tight">
                Knowledge & <br/>
                <span className="italic font-normal">Insights.</span>
              </h1>
              <p className="text-xl md:text-2xl font-body text-on-primary-container leading-relaxed mb-8">
                Access our library of whitepapers, compliance blueprints, and industry analysis regarding strategic financial architecture.
              </p>
            </div>
          </ScrollSlideIn>
        </div>
      </section>

      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollFadeUp className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6" offset={["start 0.9", "start 0.55"]}>
            <h2 className="font-headline text-4xl text-primary">
              <ScrollRevealText text="Featured Whitepapers" tag="span" />
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 max-w-full">
              <span className="bg-primary text-white px-6 py-2 rounded-full font-label text-sm whitespace-nowrap cursor-pointer">All Categories</span>
              <span className="bg-surface-container-high text-primary px-6 py-2 rounded-full font-label text-sm whitespace-nowrap hover:bg-surface-container-highest cursor-pointer transition-colors">Tax & Compliance</span>
              <span className="bg-surface-container-high text-primary px-6 py-2 rounded-full font-label text-sm whitespace-nowrap hover:bg-surface-container-highest cursor-pointer transition-colors">Assurance</span>
              <span className="bg-surface-container-high text-primary px-6 py-2 rounded-full font-label text-sm whitespace-nowrap hover:bg-surface-container-highest cursor-pointer transition-colors">M&A</span>
            </div>
          </ScrollFadeUp>

          <ScrollStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerAmount={0.12} offset={["start 0.85", "start 0.15"]}>
            <div className="bg-surface-container-highest flex flex-col rounded-xl overflow-hidden shadow-sm hover:shadow-editorial hover:-translate-y-2 transition-all cursor-pointer">
              <div className="h-48 bg-primary/20 relative w-full">
                <img className="w-full h-full object-cover mix-blend-multiply opacity-50 grayscale" alt="Document cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuARMhMvhLL2deL_2OsMwGlx6XE_T20GbQvsnRs0guLMyabPrdE99WYir62bHmuJiq4TwbSNkE0JfvDRbJaOkGWNq1_DXSk-JF2xsGF6RFf6dn-SakqK3b5nS_bw7dhq2-hn_NAQU3g0mWOPTsG513ka7yu9wO2JlrObwE3Rt4yxckP72-CeYwf9ZOkm52_dJGFnkCvn8pdyRP-LK2_l5vaHDfjeaMlF6oR9TuRFiRXU_fCCxhUh9KXyPqlh9GmLW-pLQ7HSy_6BaW5e" />
                <div className="absolute top-4 left-4 bg-secondary-container text-on-secondary-container px-3 py-1 rounded font-label text-[10px] uppercase font-bold tracking-widest">Compliance</div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-headline text-2xl text-primary mb-4 leading-tight">The 2024 Nexus Compliance Guide</h3>
                  <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">Understanding multi-state tax obligations for remote workforces and digital service providers.</p>
                </div>
                <div className="font-label text-secondary font-bold text-xs uppercase tracking-widest">Download PDF &rarr;</div>
              </div>
            </div>

            <div className="bg-surface-container-highest flex flex-col rounded-xl overflow-hidden shadow-sm hover:shadow-editorial hover:-translate-y-2 transition-all cursor-pointer">
              <div className="h-48 bg-primary/20 relative w-full">
                <img className="w-full h-full object-cover mix-blend-multiply opacity-50 grayscale" alt="Document cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOfIDR_-FlSGvlAATlIZ7gdIzXTQCOb986gsUwq8QDOAPo1eLnmuVANkKFwE8J7Dm4vbKAjXADVJCLwqA31Y-9_MZqcsusJrzfDUcr_deoWS4B5xgXXp15FXjveExZqbgndQy0tp4dkFA9a6lQOsAKzAm6v_7XysYMnDy_tSjqgG_fV6-akV-wOpojCJhtJrfpBaUXdaBcWeExDUs7rTU-KA5VCSX5qIdjrz2X12XZkE3QKz7mJsbUOI4gjTjR53Naa6aFAvxzjZuy" />
                <div className="absolute top-4 left-4 bg-secondary-container text-on-secondary-container px-3 py-1 rounded font-label text-[10px] uppercase font-bold tracking-widest">Assurance</div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-headline text-2xl text-primary mb-4 leading-tight">SOC 2 Readiness Blueprint</h3>
                  <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">A comprehensive checklist for B2B SaaS platforms preparing for their initial Type I audit period.</p>
                </div>
                <div className="font-label text-secondary font-bold text-xs uppercase tracking-widest">Download PDF &rarr;</div>
              </div>
            </div>

            <div className="bg-surface-container-highest flex flex-col rounded-xl overflow-hidden shadow-sm hover:shadow-editorial hover:-translate-y-2 transition-all cursor-pointer">
              <div className="h-48 bg-primary/20 relative w-full">
                <img className="w-full h-full object-cover mix-blend-multiply opacity-50 grayscale" alt="Document cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiibEeI5jxdBUwIo36xyyZs-8FdMmMezE88sv77BFU4XM5LgmmFxADI5seeVRQs3f5zlslYj6Z6A6PvLhoDX7Jjtvq4f_g9szOtj-92AE9A-7iB8jQXDWPalEP_IdY59UwFBoRjMDgnL7LqWr2XVfExPMEXnsZeq1sQp0tFIlHSv1NKmfMdmUJ6aKO4IMogXI0bSyUIF-eTK0Fj6mWnSpWPnaEla62DlxAA4XA1ln9RSp317mTwfHF9pAZKE2xCDjJSlJfu4HUydeF" />
                <div className="absolute top-4 left-4 bg-secondary-container text-on-secondary-container px-3 py-1 rounded font-label text-[10px] uppercase font-bold tracking-widest">M&A</div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-headline text-2xl text-primary mb-4 leading-tight">Exit Prep Financial Checklist</h3>
                  <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">Structuring your accounting department and historical data room to survive institutional buy-side scrutiny.</p>
                </div>
                <div className="font-label text-secondary font-bold text-xs uppercase tracking-widest">Download PDF &rarr;</div>
              </div>
            </div>
          </ScrollStagger>
        </div>
      </section>
    </div>
  );
}
