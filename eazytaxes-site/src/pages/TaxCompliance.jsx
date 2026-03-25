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

export default function TaxCompliance() {
  return (
    <div className="w-full">

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* HERO — Full-bleed dark editorial with parallax background  */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-primary -mt-20 pt-20">
        <ScrollParallax speed={0.3} className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none">
          <img
            className="w-full h-full object-cover"
            alt="Architectural financial structure"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiw5jiintUigDbZPavU44lpAiCL0oqSUdoH4XXg5mrAzTIs0jgp_qBh6-KZQIaKqwnF0xEKA7N9soYGY8PIYWSJUCJqASXQUaRt9SROwxKQa3kxIE5X6jOGYxEar3XgM1fJC2jZX5o7N8u6_curEbz8quon9JQ94XLNQfm9LfdqK3hlRtVWKAbIgHhF_apkrf2XPaCfE_lhbLwdWdWpDe3AENSC1a8SOTXYZshxTiDM2mZjcRS15P7s7E3ZtL8hkloy_7eBqNhjuvL"
          />
        </ScrollParallax>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent pointer-events-none"></div>
        <div className="noise-overlay absolute inset-0 pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-16 items-center">
          <ScrollSlideIn direction="left" distance={80}>
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-secondary-container font-label text-xs uppercase tracking-widest">
                <span className="material-symbols-outlined text-sm">gavel</span>
                Tax &amp; Compliance Division
              </div>
              <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl text-white leading-tight">
                Scale with <br/>
                <span className="italic text-secondary-fixed-dim">Precision.</span>
              </h1>
              <p className="text-on-primary-container text-xl md:text-2xl max-w-xl leading-relaxed opacity-90">
                Full-spectrum tax reporting and regulatory adherence engineered for scaling enterprises across multi-state and global jurisdictions.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/contact" className="bg-secondary-container text-on-secondary-container px-10 py-5 rounded-md font-label font-bold uppercase tracking-widest text-sm hover:brightness-110 active:scale-95 transition-all shadow-editorial">
                  Inquire for Consultation
                </Link>
                <button className="border border-white/20 text-white px-10 py-5 rounded-md font-label font-bold uppercase tracking-widest text-sm hover:bg-white/5 transition-all">
                  View Methodology
                </button>
              </div>
            </div>
          </ScrollSlideIn>

          <div className="relative hidden lg:block pb-10">
            <ScrollClipReveal direction="right" offset={["start 0.85", "start 0.3"]}>
              <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl relative">
                <img
                  className="w-full h-full object-cover"
                  alt="Financial data architecture"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOfIDR_-FlSGvlAATlIZ7gdIzXTQCOb986gsUwq8QDOAPo1eLnmuVANkKFwE8J7Dm4vbKAjXADVJCLwqA31Y-9_MZqcsusJrzfDUcr_deoWS4B5xgXXp15FXjveExZqbgndQy0tp4dkFA9a6lQOsAKzAm6v_7XysYMnDy_tSjqgG_fV6-akV-wOpojCJhtJrfpBaUXdaBcWeExDUs7rTU-KA5VCSX5qIdjrz2X12XZkE3QKz7mJsbUOI4gjTjR53Naa6aFAvxzjZuy"
                />
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
              </div>
            </ScrollClipReveal>
            <ScrollFadeUp className="absolute -bottom-2 -left-8 bg-surface-container-lowest p-8 rounded-lg shadow-xl max-w-xs z-20" offset={["start 0.7", "start 0.35"]}>
              <p className="font-headline italic text-primary text-lg mb-2">"Precision at every ledger entry."</p>
              <div className="w-12 h-1 bg-secondary-container mb-4"></div>
              <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant">The EazyTaxes Standard</p>
            </ScrollFadeUp>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* IMPACT METRICS — Counters strip                            */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="bg-surface-container-highest py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollStagger className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center" staggerAmount={0.1} offset={["start 0.9", "start 0.4"]}>
            <div>
              <h3 className="font-headline text-4xl md:text-5xl text-primary mb-2">
                <ScrollCounter target={50} suffix="+" offset={["start 0.95", "start 0.85"]} />
              </h3>
              <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant">States Covered</p>
            </div>
            <div>
              <h3 className="font-headline text-4xl md:text-5xl text-primary mb-2">
                <ScrollCounter target={99.8} suffix="%" decimals={1} offset={["start 0.95", "start 0.85"]} />
              </h3>
              <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Filing Accuracy</p>
            </div>
            <div>
              <h3 className="font-headline text-4xl md:text-5xl text-primary mb-2">
                <ScrollCounter target={2500} suffix="+" offset={["start 0.95", "start 0.85"]} />
              </h3>
              <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Returns Processed</p>
            </div>
            <div>
              <h3 className="font-headline text-4xl md:text-5xl text-primary mb-2">$<ScrollCounter target={1.2} suffix="B" decimals={1} offset={["start 0.95", "start 0.85"]} /></h3>
              <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Tax Saved Annually</p>
            </div>
          </ScrollStagger>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* FULL-SPECTRUM REPORTING — Bento grid                       */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollFadeUp className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20 gap-8" offset={["start 0.9", "start 0.55"]}>
            <div className="max-w-2xl">
              <span className="font-label text-sm uppercase tracking-[0.2em] text-secondary font-bold">Enterprise Reporting</span>
              <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl text-primary mt-4 leading-tight">
                <ScrollRevealText text="Full-spectrum compliance visibility." tag="span" />
              </h2>
            </div>
            <p className="text-on-surface-variant md:max-w-xs font-headline italic text-xl border-l-2 border-secondary-container pl-6 leading-relaxed">
              Deep insight into every financial movement, synthesized for boardroom-level decision making.
            </p>
          </ScrollFadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Large feature card */}
            <ScrollScale className="md:col-span-2 bg-surface-container-highest p-10 md:p-14 rounded-xl shadow-editorial relative overflow-hidden flex flex-col justify-end min-h-[400px] group" scaleRange={[0.92, 1]} offset={["start 0.9", "center center"]}>
              <div className="absolute inset-0 opacity-30 transition-transform duration-700 group-hover:scale-105">
                <img className="w-full h-full object-cover" alt="Data interface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOfIDR_-FlSGvlAATlIZ7gdIzXTQCOb986gsUwq8QDOAPo1eLnmuVANkKFwE8J7Dm4vbKAjXADVJCLwqA31Y-9_MZqcsusJrzfDUcr_deoWS4B5xgXXp15FXjveExZqbgndQy0tp4dkFA9a6lQOsAKzAm6v_7XysYMnDy_tSjqgG_fV6-akV-wOpojCJhtJrfpBaUXdaBcWeExDUs7rTU-KA5VCSX5qIdjrz2X12XZkE3QKz7mJsbUOI4gjTjR53Naa6aFAvxzjZuy" />
              </div>
              <div className="relative z-10 bg-white/60 backdrop-blur-md p-8 rounded-xl max-w-lg shadow-lg">
                <h3 className="font-headline text-3xl text-primary mb-4">Unified Ledger Analysis</h3>
                <p className="text-on-surface-variant mb-6 text-sm md:text-base leading-relaxed">Aggregate multiple entities into a single cohesive reporting stream with real-time currency normalization and multi-jurisdiction support.</p>
                <span className="text-secondary font-bold font-label text-xs uppercase tracking-widest cursor-pointer hover:underline flex items-center gap-2">Explore Infrastructure <span className="material-symbols-outlined text-sm">arrow_forward</span></span>
              </div>
            </ScrollScale>

            {/* Small card 1 */}
            <ScrollFadeUp className="bg-surface-container-low p-8 md:p-10 rounded-xl flex flex-col justify-between border-t-4 border-secondary-container shadow-sm hover:shadow-editorial transition-shadow" offset={["start 0.9", "start 0.5"]}>
              <span className="material-symbols-outlined text-4xl text-secondary">query_stats</span>
              <div className="mt-12">
                <h4 className="font-headline text-2xl text-primary mb-3">Predictive Forensics</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">Anticipate audit triggers before they manifest with proprietary risk-mapping algorithms tuned to your industry.</p>
              </div>
            </ScrollFadeUp>

            {/* Small card 2 — dark accent */}
            <ScrollFadeUp className="bg-primary p-8 md:p-10 rounded-xl flex flex-col justify-between text-white shadow-editorial hover:-translate-y-1 transition-transform" offset={["start 0.85", "start 0.45"]}>
              <span className="material-symbols-outlined text-4xl text-secondary-container">account_balance</span>
              <div className="mt-12">
                <h4 className="font-headline text-2xl mb-3">Nexus Compliance</h4>
                <p className="text-sm text-on-primary-container leading-relaxed">Automated state-by-state filing requirements and liability tracking for distributed workforces across 50+ jurisdictions.</p>
              </div>
            </ScrollFadeUp>

            {/* Wide card with image */}
            <ScrollFadeUp className="md:col-span-2 bg-surface-container-highest p-8 md:p-10 rounded-xl flex flex-col md:flex-row items-center gap-8 border border-outline-variant/10 shadow-sm hover:shadow-editorial transition-shadow" offset={["start 0.85", "start 0.4"]}>
              <div className="w-full md:w-5/12 h-48 rounded-lg overflow-hidden shrink-0">
                <img className="w-full h-full object-cover" alt="Abstract architectural detail" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-nkaSxbGG3V-kx4ZEuLF17ZEcCf90jf1IHxSG3bRiWcOOIn_mBlGq31Ow02DX8oN8msMKuj3eHtn-ub9MwA5MRrZCHjJrz7NgD0H0dhHN_KItFvEJ5omBDXA0Rd-8CTBqn_PnLM7La1L4WbygW2rov6hX8NfhJrsPTOFX7Nnegy8YACUbaQTr121fWJWMlZ93Eszh13X6TYJyDkBhW3gR7M2HYoSI0aqbnkjDtgwErVgTtJCW8kmH00g1ndkR7poJHZZiqEMuZho_" />
              </div>
              <div className="flex-1">
                <h4 className="font-headline text-2xl md:text-3xl text-primary mb-3">Institutional Grade SOC 2</h4>
                <p className="text-on-surface-variant mb-6 leading-relaxed">Every workflow is engineered to meet the highest standards of data integrity and privacy security.</p>
                <div className="flex gap-2">
                  <span className="bg-primary-container/10 px-3 py-1 rounded-full text-[10px] font-label text-primary font-bold uppercase tracking-widest">Certified</span>
                  <span className="bg-primary-container/10 px-3 py-1 rounded-full text-[10px] font-label text-primary font-bold uppercase tracking-widest">Encrypted</span>
                </div>
              </div>
            </ScrollFadeUp>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SERVICE PILLARS — Two-column cards with hover transitions   */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollFadeUp className="mb-20 text-center" offset={["start 0.9", "start 0.55"]}>
            <span className="font-label text-secondary uppercase tracking-[0.3em] text-xs font-bold">Core Capabilities</span>
            <h2 className="font-headline text-4xl md:text-5xl text-primary mt-6 mb-6">The Compliance Architecture</h2>
            <ScrollLineGrow direction="horizontal" className="w-24 h-1 bg-secondary-container mx-auto" offset={["start 0.85", "start 0.5"]} />
          </ScrollFadeUp>

          <ScrollStagger className="grid md:grid-cols-2 gap-8" staggerAmount={0.15} offset={["start 0.85", "start 0.2"]}>
            <div className="bg-surface-container-lowest p-10 md:p-14 rounded-xl flex flex-col justify-between group hover:bg-primary transition-colors duration-500 shadow-sm hover:shadow-editorial cursor-pointer">
              <div>
                <span className="material-symbols-outlined text-4xl text-secondary mb-8 group-hover:text-secondary-fixed-dim transition-colors">description</span>
                <h3 className="font-headline text-3xl text-primary mb-4 group-hover:text-white transition-colors">Individual Tax Returns</h3>
                <p className="text-on-surface-variant text-lg leading-relaxed group-hover:text-on-primary-container transition-colors">
                  Comprehensive federal and state filings for high-net-worth individuals, expatriates, and complex multi-source income structures. Every deduction engineered for maximum benefit.
                </p>
              </div>
              <div className="mt-16 flex items-center gap-4 text-secondary font-label font-bold uppercase tracking-widest text-sm group-hover:text-secondary-fixed-dim transition-colors">
                Learn More <span className="material-symbols-outlined transform group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-10 md:p-14 rounded-xl flex flex-col justify-between group hover:bg-primary transition-colors duration-500 shadow-sm hover:shadow-editorial cursor-pointer">
              <div>
                <span className="material-symbols-outlined text-4xl text-secondary mb-8 group-hover:text-secondary-fixed-dim transition-colors">corporate_fare</span>
                <h3 className="font-headline text-3xl text-primary mb-4 group-hover:text-white transition-colors">Business &amp; Corporate Tax</h3>
                <p className="text-on-surface-variant text-lg leading-relaxed group-hover:text-on-primary-container transition-colors">
                  Strategic entity-level filing for LLCs, S-Corps, C-Corps, and partnerships. We optimize your corporate structure to minimize liability while maintaining full regulatory adherence.
                </p>
              </div>
              <div className="mt-16 flex items-center gap-4 text-secondary font-label font-bold uppercase tracking-widest text-sm group-hover:text-secondary-fixed-dim transition-colors">
                View Services <span className="material-symbols-outlined transform group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-10 md:p-14 rounded-xl flex flex-col justify-between group hover:bg-primary transition-colors duration-500 shadow-sm hover:shadow-editorial cursor-pointer">
              <div>
                <span className="material-symbols-outlined text-4xl text-secondary mb-8 group-hover:text-secondary-fixed-dim transition-colors">public</span>
                <h3 className="font-headline text-3xl text-primary mb-4 group-hover:text-white transition-colors">International Tax Planning</h3>
                <p className="text-on-surface-variant text-lg leading-relaxed group-hover:text-on-primary-container transition-colors">
                  Cross-border tax strategy including transfer pricing, FBAR/FATCA compliance, treaty optimization, and repatriation planning for global enterprises.
                </p>
              </div>
              <div className="mt-16 flex items-center gap-4 text-secondary font-label font-bold uppercase tracking-widest text-sm group-hover:text-secondary-fixed-dim transition-colors">
                Explore Global <span className="material-symbols-outlined transform group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-10 md:p-14 rounded-xl flex flex-col justify-between group hover:bg-primary transition-colors duration-500 shadow-sm hover:shadow-editorial cursor-pointer">
              <div>
                <span className="material-symbols-outlined text-4xl text-secondary mb-8 group-hover:text-secondary-fixed-dim transition-colors">savings</span>
                <h3 className="font-headline text-3xl text-primary mb-4 group-hover:text-white transition-colors">Tax Strategy &amp; Optimization</h3>
                <p className="text-on-surface-variant text-lg leading-relaxed group-hover:text-on-primary-container transition-colors">
                  Proactive year-round tax planning including R&amp;D credits, cost segregation, opportunity zone investments, and entity restructuring for maximum savings.
                </p>
              </div>
              <div className="mt-16 flex items-center gap-4 text-secondary font-label font-bold uppercase tracking-widest text-sm group-hover:text-secondary-fixed-dim transition-colors">
                Plan Ahead <span className="material-symbols-outlined transform group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </div>
            </div>
          </ScrollStagger>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* AUTOMATED WORKFLOWS — Timeline + image                     */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-40 overflow-hidden bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-24 items-center">
          <ScrollSlideIn direction="left" distance={80} className="space-y-8">
            <span className="font-label uppercase tracking-[0.2em] text-secondary text-sm font-bold block">Effortless Execution</span>
            <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl text-primary leading-tight">
              <ScrollRevealText text="Automated workflows for modern enterprise." className="text-balance" tag="span" />
            </h2>
            <ScrollLineGrow direction="horizontal" className="w-24 h-1 bg-secondary-container" offset={["start 0.8", "start 0.5"]} />

            <div className="space-y-12 relative pt-4">
              <ScrollLineGrow direction="vertical" className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-secondary-fixed-dim/30" offset={["start 0.8", "start 0.1"]} />

              <ScrollFadeUp offset={["start 0.85", "start 0.6"]}>
                <div className="relative pl-14 group">
                  <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-white flex items-center justify-center border-2 border-secondary shadow-sm z-10 group-hover:bg-secondary-container transition-colors">
                    <span className="text-secondary font-bold group-hover:text-on-secondary-container">01</span>
                  </div>
                  <h5 className="font-headline text-xl text-primary mb-2">Data Ingestion</h5>
                  <p className="text-on-surface-variant leading-relaxed">Direct API hooks into ERP and banking systems eliminate manual entry and human error.</p>
                </div>
              </ScrollFadeUp>

              <ScrollFadeUp offset={["start 0.8", "start 0.55"]}>
                <div className="relative pl-14 group">
                  <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-white flex items-center justify-center border-2 border-secondary shadow-sm z-10 group-hover:bg-secondary-container transition-colors">
                    <span className="text-secondary font-bold group-hover:text-on-secondary-container">02</span>
                  </div>
                  <h5 className="font-headline text-xl text-primary mb-2">Intelligent Classification</h5>
                  <p className="text-on-surface-variant leading-relaxed">Machine learning identifies tax-advantaged categorizations specific to your industry vertical.</p>
                </div>
              </ScrollFadeUp>

              <ScrollFadeUp offset={["start 0.75", "start 0.5"]}>
                <div className="relative pl-14 group">
                  <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-white flex items-center justify-center border-2 border-secondary shadow-sm z-10 group-hover:bg-secondary-container transition-colors">
                    <span className="text-secondary font-bold group-hover:text-on-secondary-container">03</span>
                  </div>
                  <h5 className="font-headline text-xl text-primary mb-2">Automated Remittance</h5>
                  <p className="text-on-surface-variant leading-relaxed">Schedule and execute multi-jurisdictional payments with guaranteed accuracy and timing.</p>
                </div>
              </ScrollFadeUp>

              <ScrollFadeUp offset={["start 0.7", "start 0.45"]}>
                <div className="relative pl-14 group">
                  <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-white flex items-center justify-center border-2 border-secondary shadow-sm z-10 group-hover:bg-secondary-container transition-colors">
                    <span className="text-secondary font-bold group-hover:text-on-secondary-container">04</span>
                  </div>
                  <h5 className="font-headline text-xl text-primary mb-2">Compliance Validation</h5>
                  <p className="text-on-surface-variant leading-relaxed">Real-time audit trail and regulatory cross-check ensures every filing meets institutional standards.</p>
                </div>
              </ScrollFadeUp>
            </div>
          </ScrollSlideIn>

          <ScrollSlideIn direction="right" distance={80} className="relative">
            <ScrollScale scaleRange={[0.9, 1]}>
              <div className="aspect-[4/5] md:aspect-video rounded-xl overflow-hidden shadow-2xl relative z-10">
                <img
                  className="w-full h-full object-cover"
                  alt="Ledger dashboard interface"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzuSAYvjU_DjAiAfa9Q0ioNjq1wIkPEq9lFFoWBzvIvI3cai_IhKW46TqFcJaZoVOOfJ0B-WgtRqNQ55EpyjeIS5q4v9hSpwApu-GHaJAtRWA9K8duTAu9N47xej7GM9aPIN2deGEAPFqOGaOyXBPIoo5aCiFZ9farYdHDznWwZdSPZlmyDs01FLEVbenIT6Dq5NVOx-5uxpFkBqLE6qTt3NUZTOtTFJxFH5cYzKcGBhtqdYOJD0tSZsEepWjhYVLXfCFpk5cgDWxj"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
              </div>
            </ScrollScale>
            <ScrollFadeUp className="absolute -bottom-10 -left-10 hidden md:block bg-primary p-12 max-w-sm shadow-editorial z-20 rounded-xl" offset={["start 0.7", "start 0.35"]}>
              <p className="font-headline text-3xl text-white italic mb-6 leading-tight">"Precision is our only baseline."</p>
              <div className="w-16 h-px bg-secondary-fixed-dim mb-4"></div>
              <p className="font-label text-secondary-fixed-dim uppercase text-xs tracking-widest">Architectural Ledger v4.2</p>
            </ScrollFadeUp>
            <ScrollParallax speed={0.2} className="absolute -top-10 -right-10 w-64 h-64 bg-surface-container-lowest rounded-full blur-3xl opacity-60 z-0" />
          </ScrollSlideIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* COMPLIANCE PHASES — Horizontal step cards                  */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollFadeUp className="mb-20 text-center lg:text-left max-w-3xl" offset={["start 0.9", "start 0.55"]}>
            <span className="font-label text-secondary-container uppercase tracking-[0.4em] text-xs">Structured Approach</span>
            <h2 className="font-headline text-5xl md:text-6xl text-white mt-6 italic">The Compliance Journey</h2>
          </ScrollFadeUp>

          <ScrollStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerAmount={0.1} offset={["start 0.85", "start 0.15"]}>
            <div className="bg-primary-container p-8 rounded-xl border-l-4 border-secondary-fixed-dim shadow-editorial hover:-translate-y-2 transition-transform">
              <span className="font-headline text-5xl font-normal text-white opacity-15 block mb-6">01</span>
              <h4 className="font-headline text-2xl text-white mb-3">Discovery</h4>
              <p className="text-on-primary-container leading-relaxed text-sm md:text-base">Full financial ecosystem review to identify exposure points, filing gaps, and optimization opportunities.</p>
            </div>

            <div className="bg-primary-container p-8 rounded-xl border-l-4 border-secondary-fixed-dim shadow-editorial hover:-translate-y-2 transition-transform">
              <span className="font-headline text-5xl font-normal text-white opacity-15 block mb-6">02</span>
              <h4 className="font-headline text-2xl text-white mb-3">Architecture</h4>
              <p className="text-on-primary-container leading-relaxed text-sm md:text-base">Strategic tax framework engineered around your entity structure, jurisdiction mix, and growth targets.</p>
            </div>

            <div className="bg-primary-container p-8 rounded-xl border-l-4 border-secondary-fixed-dim shadow-editorial hover:-translate-y-2 transition-transform">
              <span className="font-headline text-5xl font-normal text-white opacity-15 block mb-6">03</span>
              <h4 className="font-headline text-2xl text-white mb-3">Execution</h4>
              <p className="text-on-primary-container leading-relaxed text-sm md:text-base">Precision filing and remittance across all federal, state, and international obligations with zero margin for error.</p>
            </div>

            <div className="bg-primary-container p-8 rounded-xl border-l-4 border-secondary-fixed-dim shadow-editorial hover:-translate-y-2 transition-transform">
              <span className="font-headline text-5xl font-normal text-white opacity-15 block mb-6">04</span>
              <h4 className="font-headline text-2xl text-white mb-3">Defense</h4>
              <p className="text-on-primary-container leading-relaxed text-sm md:text-base">Continuous monitoring, real-time audit defense, and proactive regulatory watch to protect your position.</p>
            </div>
          </ScrollStagger>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* WHY EAZYTAXES — Split content with stagger grid            */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-32 md:py-40 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <ScrollSlideIn direction="left" distance={80} className="order-2 lg:order-1 relative">
            <ScrollStagger staggerAmount={0.12} className="grid grid-cols-2 gap-6 relative z-10" offset={["start 0.85", "start 0.15"]}>
              <div className="bg-surface-container-highest p-10 rounded-xl hover:-translate-y-2 transition-transform shadow-sm">
                <span className="material-symbols-outlined text-secondary text-4xl mb-6">speed</span>
                <h4 className="font-headline text-2xl text-primary mb-3 leading-tight">Fast Turnaround</h4>
                <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">Enterprise-grade filings delivered with industry-leading speed.</p>
              </div>
              <div className="bg-surface-container-high p-10 rounded-xl mt-12 hover:-translate-y-2 transition-transform shadow-sm">
                <span className="material-symbols-outlined text-secondary text-4xl mb-6">lock</span>
                <h4 className="font-headline text-2xl text-primary mb-3 leading-tight">SOC 2 Secure</h4>
                <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">Bank-level encryption and certified data handling protocols.</p>
              </div>
              <div className="bg-surface-container-low p-10 rounded-xl hover:-translate-y-2 transition-transform shadow-sm bg-white/50 backdrop-blur-md">
                <span className="material-symbols-outlined text-secondary text-4xl mb-6">support_agent</span>
                <h4 className="font-headline text-2xl text-primary mb-3 leading-tight">Dedicated Team</h4>
                <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">Named CPAs and tax strategists assigned to your account.</p>
              </div>
              <div className="bg-surface-container-highest p-10 rounded-xl mt-12 hover:-translate-y-2 transition-transform shadow-sm">
                <span className="material-symbols-outlined text-secondary text-4xl mb-6">monitoring</span>
                <h4 className="font-headline text-2xl text-primary mb-3 leading-tight">Live Dashboard</h4>
                <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">Real-time visibility into every filing, deadline, and obligation.</p>
              </div>
            </ScrollStagger>
            <ScrollParallax speed={0.15} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-surface-container-lowest rounded-full blur-3xl opacity-80 z-0" />
          </ScrollSlideIn>

          <ScrollSlideIn direction="right" distance={80} className="order-1 lg:order-2">
            <span className="font-label text-secondary uppercase tracking-[0.4em] text-xs font-bold">The EazyTaxes Advantage</span>
            <h2 className="font-headline text-5xl md:text-6xl text-primary mt-6 mb-10 leading-tight">
              <ScrollRevealText text="Why leading enterprises choose us." tag="span" />
            </h2>
            <p className="font-body text-on-surface-variant text-lg md:text-xl leading-relaxed mb-12">
              We don't just file returns—we engineer compliance architectures that protect assets, minimize exposure, and scale with your enterprise. Every engagement is led by a managing director with institutional-grade expertise.
            </p>
            <Link to="/contact" className="flex items-center gap-6 group">
              <span className="w-16 h-px bg-primary group-hover:w-32 transition-all duration-300"></span>
              <span className="font-label font-bold uppercase tracking-widest text-primary text-sm group-hover:text-secondary-container transition-colors">Start Your Assessment</span>
            </Link>
          </ScrollSlideIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* FINAL CTA — Dark, fullscreen call-to-action                */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="bg-primary-container py-24 md:py-32 relative overflow-hidden">
        <div className="noise-overlay absolute inset-0 pointer-events-none"></div>
        <ScrollParallax speed={0.4} className="absolute -right-32 -top-32 w-[500px] h-[500px] bg-secondary-container/10 rounded-full blur-3xl" />
        <ScrollParallax speed={0.2} className="absolute -left-32 -bottom-32 w-[400px] h-[400px] bg-primary-fixed/10 rounded-full blur-3xl" />
        <ScrollScale className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10" scaleRange={[0.85, 1]} offset={["start 0.85", "center center"]}>
          <h2 className="font-headline text-4xl md:text-6xl text-white mb-8 leading-tight">
            <ScrollRevealText text="Ready to elevate your financial stature?" className="justify-center" tag="span" />
          </h2>
          <ScrollBlurReveal offset={["start 0.75", "start 0.4"]}>
            <p className="text-on-primary-container text-xl md:text-2xl mb-12 max-w-2xl mx-auto opacity-90">
              Connect with our managing directors for a bespoke analysis of your tax and compliance landscape.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/contact" className="bg-secondary-container text-on-secondary-container px-12 py-6 rounded-md font-label font-bold uppercase tracking-widest text-sm hover:brightness-110 active:scale-95 transition-all shadow-2xl">
                Schedule a Consultation
              </Link>
              <Link to="/contact" className="border border-white/20 text-white px-12 py-6 rounded-md font-label font-bold uppercase tracking-widest text-sm hover:bg-white/10 active:scale-95 transition-all">
                Request a Callback
              </Link>
            </div>
          </ScrollBlurReveal>
        </ScrollScale>
      </section>
    </div>
  );
}
