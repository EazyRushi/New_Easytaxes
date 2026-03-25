import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
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
  SectionExit,
} from '../components/animations/ScrollAnimations';
import { VerticalScrollLine, ParallaxImage } from '../components/animations/ScrollReveal';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="w-full bg-surface">
      {/* Global Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-secondary-fixed-dim z-[60] origin-left"
        style={{ width: progressScale }}
      />

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 1: Hero — Scrub-based reveals with exit fade */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <SectionExit>
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-surface -mt-20 pt-24 pb-16 border-b border-outline-variant/10 text-center">

          <div className="max-w-5xl mx-auto px-6 lg:px-8 w-full relative z-10 flex flex-col items-center">

            {/* Badge — time-based entrance, visible immediately */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 border border-outline-variant/50 rounded-full font-label text-secondary tracking-[0.2em] uppercase text-[10px] relative overflow-hidden group hover:border-secondary transition-colors cursor-default">
                <span className="relative z-10 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse"></span>
                  The Architectural Ledger
                </span>
                <span className="absolute inset-0 bg-secondary/5 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500"></span>
              </span>
            </motion.div>

            {/* Headline — time-based stagger, fully visible at first glance */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-headline text-6xl md:text-8xl lg:text-[8.5rem] text-primary leading-[0.85] tracking-tight mb-6 w-full flex flex-col items-center"
            >
              <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-8 mb-[-0.1em]">
                <span>Clarity.</span>
                <span>Control.</span>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="italic font-normal text-secondary mt-[-0.05em]"
              >
                Accountability.
              </motion.div>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-body text-xl md:text-2xl text-on-surface-variant leading-relaxed px-4 max-w-3xl mb-10"
            >
              Transforming complex tax frameworks into strategic assets. Experience a partnership built on unprecedented editorial precision.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8 justify-center"
            >
              <Link to="/contact" className="relative overflow-hidden group bg-primary text-white px-12 py-5 rounded-sm font-label font-bold text-xs md:text-sm tracking-widest uppercase shadow-xl hover:-translate-y-1 transition-transform w-fit">
                <span className="relative z-10">Enter The Firm</span>
                <span className="absolute inset-0 bg-primary-container translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500"></span>
              </Link>

              <Link to="/cfo-advisory" className="group font-label text-xs md:text-sm tracking-widest uppercase text-primary flex items-center gap-4 hover:text-secondary transition-colors w-fit">
                <span className="w-12 h-px bg-outline-variant group-hover:w-20 group-hover:bg-secondary transition-all duration-500"></span>
                View Methodology
              </Link>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex-col items-center gap-4 hidden lg:flex pb-8">
            <div className="w-px h-32 bg-outline-variant/40 overflow-hidden relative">
              <motion.div
                animate={{ y: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="w-full h-1/2 bg-primary"
              />
            </div>
          </div>
        </section>
      </SectionExit>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 2: The Problem — Scroll-linked text reveal */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-32 md:py-48 bg-white text-center px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollFadeUp offset={["start 0.9", "start 0.6"]}>
            <span className="font-label text-secondary uppercase tracking-widest text-sm mb-8 pb-1 block">The Complexity Threshold</span>
          </ScrollFadeUp>

          <h2 className="font-headline text-4xl md:text-6xl text-primary leading-tight">
            <ScrollRevealText
              text="Scaling an enterprise introduces chaotic complexity. The modern financial landscape is unforgiving to those without structure."
              className="justify-center text-balance"
              tag="span"
            />
          </h2>

          <ScrollLineGrow
            direction="vertical"
            className="w-px h-24 bg-secondary mx-auto mt-16"
            offset={["start 0.7", "start 0.3"]}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 3: Sticky Scroll — The Solution Ecosystem */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative bg-surface-container-low pt-24 pb-48 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative">

          {/* Left Column: Sticky Narrative */}
          <div className="lg:w-5/12 relative">
            <div className="sticky top-32 pt-10">
              <ScrollSlideIn direction="left" distance={60}>
                <h2 className="font-headline text-5xl md:text-7xl text-primary mb-8 leading-tight">Our <span className="italic">Architectural</span> Method.</h2>
                <p className="font-body text-xl text-on-surface-variant leading-relaxed">
                  We don't just file paperwork. We rebuild your financial foundation using our core ecosystem of specialized divisions, designed to protect and amplify enterprise value.
                </p>
                <div className="mt-12 hidden lg:block">
                  <VerticalScrollLine height="200px" />
                </div>
              </ScrollSlideIn>
            </div>
          </div>

          {/* Right Column: Scrolling Cards with scroll-linked reveals */}
          <div className="lg:w-7/12 flex flex-col gap-20 lg:gap-24 lg:pt-32">

            <ScrollScale className="bg-surface p-10 md:p-14 border border-outline-variant/30 rounded-2xl shadow-ambient sticky top-28" scaleRange={[0.88, 1]} offset={["start 0.9", "center center"]}>
              <span className="font-headline text-5xl text-secondary-container opacity-20 block mb-6">01</span>
              <h3 className="font-headline text-3xl md:text-4xl text-primary mb-6">Tax & Compliance</h3>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-10">Full-spectrum reporting and regulatory adherence tailored for scaling enterprises across multi-state and global jurisdictions.</p>
              <Link to="/ustax" className="font-label font-bold text-sm uppercase tracking-widest text-secondary flex items-center hover:translate-x-2 transition-transform w-fit">
                Explore Division <span className="material-symbols-outlined ml-2">east</span>
              </Link>
            </ScrollScale>

            <ScrollScale className="bg-primary text-on-primary p-10 md:p-14 border border-outline-variant/10 rounded-2xl shadow-editorial sticky top-32" scaleRange={[0.88, 1]} offset={["start 0.9", "center center"]}>
              <span className="font-headline text-5xl text-secondary-fixed-dim opacity-30 block mb-6">02</span>
              <h3 className="font-headline text-3xl md:text-4xl mb-6">Assurance & SOC 2</h3>
              <p className="text-on-primary-container text-lg leading-relaxed mb-10">Institutional-grade security validations and financial statement audits. Establishing absolute trust through rigorous engineering.</p>
              <Link to="/assurance-soc2" className="font-label font-bold text-sm uppercase tracking-widest text-secondary-fixed-dim flex items-center hover:translate-x-2 transition-transform w-fit">
                View Framework <span className="material-symbols-outlined ml-2">east</span>
              </Link>
            </ScrollScale>

            <ScrollScale className="bg-secondary-container text-on-secondary-container p-10 md:p-14 rounded-2xl shadow-ambient sticky top-36" scaleRange={[0.88, 1]} offset={["start 0.9", "center center"]}>
              <span className="font-headline text-5xl text-white opacity-40 block mb-6">03</span>
              <h3 className="font-headline text-3xl md:text-4xl mb-6">CFO & Advisory</h3>
              <p className="text-on-secondary-fixed-variant text-lg leading-relaxed mb-10">Fractional executive leadership providing the roadmap for long-term capitalization, M&A readiness, and fiscal resilience.</p>
              <Link to="/cfo-advisory" className="font-label font-bold text-sm uppercase tracking-widest text-primary flex items-center hover:translate-x-2 transition-transform w-fit">
                Discover Strategic Value <span className="material-symbols-outlined ml-2">east</span>
              </Link>
            </ScrollScale>

            <ScrollScale className="bg-surface-container-highest p-10 md:p-14 border border-outline-variant/20 rounded-2xl shadow-ambient sticky top-40" scaleRange={[0.88, 1]} offset={["start 0.9", "center center"]}>
              <span className="font-headline text-5xl text-secondary-container opacity-20 block mb-6">04</span>
              <h3 className="font-headline text-3xl md:text-4xl text-primary mb-6">Tax Resolution</h3>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-10">Strategic IRS negotiation and debt restructuring, restoring financial equilibrium through meticulous advocacy and compliance engineering.</p>
              <Link to="/tax-resolution" className="font-label font-bold text-sm uppercase tracking-widest text-secondary flex items-center hover:translate-x-2 transition-transform w-fit">
                View Solutions <span className="material-symbols-outlined ml-2">east</span>
              </Link>
            </ScrollScale>

            <ScrollScale className="bg-primary-container text-white p-10 md:p-14 rounded-2xl shadow-editorial sticky top-44" scaleRange={[0.88, 1]} offset={["start 0.9", "center center"]}>
              <span className="font-headline text-5xl text-secondary-fixed-dim opacity-30 block mb-6">05</span>
              <h3 className="font-headline text-3xl md:text-4xl mb-6">Valuations</h3>
              <p className="text-on-primary-container text-lg leading-relaxed mb-10">Data-driven appraisal models for 409A, taxation, and transactional fairness. Defensible frameworks for high-stakes capital events.</p>
              <Link to="/valuations" className="font-label font-bold text-sm uppercase tracking-widest text-secondary-fixed-dim flex items-center hover:translate-x-2 transition-transform w-fit">
                Request Valuation <span className="material-symbols-outlined ml-2">east</span>
              </Link>
            </ScrollScale>

            <ScrollScale className="bg-surface p-10 md:p-14 border border-outline-variant/30 rounded-2xl shadow-ambient sticky top-48" scaleRange={[0.88, 1]} offset={["start 0.9", "center center"]}>
              <span className="font-headline text-5xl text-secondary-container opacity-20 block mb-6">06</span>
              <h3 className="font-headline text-3xl md:text-4xl text-primary mb-6">Formation & Banking</h3>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-10">End-to-end structural setup from entity incorporation to institutional banking integration, designed for growth-stage enterprises.</p>
              <Link to="/formation-banking" className="font-label font-bold text-sm uppercase tracking-widest text-secondary flex items-center hover:translate-x-2 transition-transform w-fit">
                Start Formation <span className="material-symbols-outlined ml-2">east</span>
              </Link>
            </ScrollScale>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 4: Data Visualization — Parallax + counters */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <ScrollClipReveal direction="bottom" offset={["start 0.85", "start 0.35"]} className="relative">
        <section className="py-32 bg-primary overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            <ScrollSlideIn direction="left" distance={80}>
              <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl relative w-full lg:w-4/5 mx-auto lg:ml-0">
                <ParallaxImage
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkW2863ljjlj9B5ngaqrJE9qnkFwQDIK9K7y21QxM_N5BaSWtMUdVtoghtGvpxWJvt3vDpUy_8eUD-mYjYCx9V2xNjeP9EZRBRXaAD1vBy_J6O-_sgrAc0GzQpsEjGbPdriWbw9WPiuknCNuww02G2t4UvVKjdlcipKzizrTqe9Q_kvsn81XaICSqcuiD5Eu1o-ucYPTpZO7Vaj-JDBsnkK2GoJHnAg-LkaObTAB4rT9S4Qv6EMWrIRMY8J1SUX-29N4kDzXLyhohF"
                  alt="Financial Analysis"
                  className="grayscale mix-blend-multiply opacity-80"
                  containerClassName="w-full h-full bg-surface-container-highest"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent"></div>
                <div className="absolute bottom-10 left-10">
                  <p className="font-headline text-7xl md:text-[6rem] text-secondary-fixed-dim leading-none">
                    <ScrollCounter target={99.8} suffix="%" decimals={1} offset={["start 0.95", "start 0.85"]} />
                  </p>
                  <p className="font-label uppercase tracking-widest text-white mt-4 text-sm font-bold">Audit Success Rate</p>
                </div>
              </div>
            </ScrollSlideIn>

            <div className="text-white">
              <ScrollBlurReveal offset={["start 0.8", "start 0.4"]}>
                <h2 className="font-headline text-5xl md:text-6xl mb-8 leading-tight">Data, <span className="italic text-secondary-fixed-dim">Quantified.</span></h2>
                <p className="font-body text-xl text-on-primary-container leading-relaxed mb-12">
                  We believe in objective truth. Our proprietary forensic tools eliminate human error, ensuring your ledgers are impenetrable during regulatory scrutiny.
                </p>
              </ScrollBlurReveal>

              <ScrollStagger staggerAmount={0.15} className="space-y-8 border-l border-white/20 pl-8" offset={["start 0.85", "start 0.25"]}>
                <div>
                  <h4 className="font-headline text-3xl mb-2 text-white">
                    <ScrollCounter target={500} suffix="+" offset={["start 0.95", "start 0.85"]} />
                  </h4>
                  <p className="font-label text-sm uppercase tracking-widest text-on-primary-container">Entities Restructured</p>
                </div>
                <div>
                  <h4 className="font-headline text-3xl mb-2 text-white">$2.4B</h4>
                  <p className="font-label text-sm uppercase tracking-widest text-on-primary-container">Capital Advised</p>
                </div>
                <div>
                  <h4 className="font-headline text-3xl mb-2 text-white">Zero</h4>
                  <p className="font-label text-sm uppercase tracking-widest text-on-primary-container">Material Weaknesses</p>
                </div>
              </ScrollStagger>
            </div>
          </div>
        </section>
      </ScrollClipReveal>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 5: Global Presence — Staggered reveals */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center max-w-4xl">
          <ScrollFadeUp offset={["start 0.9", "start 0.5"]}>
            <span className="font-label text-secondary uppercase tracking-[0.3em] text-sm mb-6 block font-bold">Global Presence</span>
          </ScrollFadeUp>

          <h2 className="font-headline text-4xl md:text-6xl text-primary leading-tight mb-16">
            <ScrollRevealText
              text="Boundaries are artificial. We engineer tax corridors for global liquidity."
              className="justify-center"
              tag="span"
            />
          </h2>

          <ScrollLineGrow
            direction="horizontal"
            className="h-px bg-outline-variant/30 w-full mb-16"
            offset={["start 0.7", "start 0.4"]}
          />

          <ScrollStagger staggerAmount={0.12} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4" offset={["start 0.75", "start 0.3"]}>
            <div className="text-center">
              <span className="material-symbols-outlined text-4xl text-secondary mb-4">public</span>
              <p className="font-headline text-xl text-primary">North America</p>
            </div>
            <div className="text-center">
              <span className="material-symbols-outlined text-4xl text-secondary mb-4">account_balance</span>
              <p className="font-headline text-xl text-primary">European Union</p>
            </div>
            <div className="text-center">
              <span className="material-symbols-outlined text-4xl text-secondary mb-4">language</span>
              <p className="font-headline text-xl text-primary">MENA Region</p>
            </div>
            <div className="text-center">
              <span className="material-symbols-outlined text-4xl text-secondary mb-4">flight_takeoff</span>
              <p className="font-headline text-xl text-primary">Asia Pacific</p>
            </div>
          </ScrollStagger>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SECTION 6: Fullscreen CTA — Scale + parallax */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="min-h-[80vh] bg-surface flex items-center relative overflow-hidden">
        {/* Parallax SVG lines */}
        <ScrollParallax speed={0.3} className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="0" y1="100" x2="100" y2="0" stroke="currentColor" strokeWidth="0.5" />
            <line x1="0" y1="90" x2="100" y2="-10" stroke="currentColor" strokeWidth="0.5" />
            <line x1="0" y1="80" x2="100" y2="-20" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </ScrollParallax>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
          <ScrollScale scaleRange={[0.8, 1]} className="max-w-4xl text-center md:text-left" offset={["start 0.9", "center 0.7"]}>
            <h2 className="font-headline text-6xl md:text-8xl text-primary leading-[0.9] mb-8">
              Your Blueprint <br className="hidden md:block"/>
              <ScrollSlideIn direction="right" distance={40} className="inline-block" offset={["start 0.9", "center 0.7"]}>
                <span className="italic text-secondary">Awaits.</span>
              </ScrollSlideIn>
            </h2>
          </ScrollScale>

          <ScrollBlurReveal className="max-w-2xl" offset={["start 0.9", "center 0.8"]}>
            <p className="font-body text-xl md:text-2xl text-on-surface-variant mb-12">
              Connect with a managing director to audit your current ecosystem and map your financial architecture.
            </p>
          </ScrollBlurReveal>

          <ScrollFadeUp offset={["start 0.9", "center 0.85"]}>
            <Link to="/contact" className="inline-block bg-primary text-white px-14 py-6 rounded-sm font-label font-bold text-sm tracking-[0.2em] uppercase hover:bg-primary-container transition-all hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1">
              Initiate Consultation
            </Link>
          </ScrollFadeUp>
        </div>
      </section>
    </div>
  );
}
