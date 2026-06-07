import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  ScrollFadeUp,
  ScrollScale,
  ScrollSlideIn,
  ScrollBlurReveal,
  ScrollClipReveal,
  ScrollCounter,
  ScrollStagger,
  ScrollParallax
} from '../components/animations/ScrollAnimations';
import { VerticalScrollLine, ParallaxImage } from '../components/animations/ScrollReveal';

/* ─── Animated Counter Hook ─── */
function AnimatedCounter({ target, prefix = '', suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

/* ─── Stacked Card for Architectural Method ─── */
function StackedCard({ children, className = '', index }) {
  const ref = useRef(null);
  const stickyTop = 120 + index * 16;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", `end ${stickyTop}px`]
  });

  const scale = useTransform(scrollYProgress, [0, 0.6, 1], [0.95, 1, 0.94], { clamp: true });
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0.85], { clamp: true });

  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      ref={ref}
      style={{
        scale: smoothScale,
        opacity: smoothOpacity,
        zIndex: index + 1,
        position: 'sticky',
        top: `${stickyTop}px`,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}


/* ─── Rotating Words ─── */
const rotatingWords = ['bookkeeping', 'taxes', 'payroll', 'advisory'];

function RotatingWord() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex(i => (i + 1) % rotatingWords.length), 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="relative inline-block text-center align-bottom select-none">
      {/* Invisible placeholder of the longest word to reserve layout space */}
      <span className="invisible opacity-0 select-none pointer-events-none font-extrabold whitespace-nowrap">
        bookkeeping
      </span>
      {/* Absolute container that centers the active word */}
      <span className="absolute inset-0 flex items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="text-brand-orange font-extrabold whitespace-nowrap text-center"
          >
            {rotatingWords[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}



export default function Home() {
  const [revenue, setRevenue] = useState(250000);
  const [employees, setEmployees] = useState(10);
  const [taxRate, setTaxRate] = useState(25);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const calculateSavings = () => {
    return ((revenue * (taxRate / 100)) * 0.15).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  };

  const testimonials = [
    { quote: "I've worked with EazyTaxes for 3 years now. Their professionalism and responsiveness is unmatched. My taxes are done right, every single time.", name: "Sarah Chen", company: "Bloom Studio LLC", role: "Founder" },
    { quote: "Switching to EazyTaxes saved us over $12,000 in our first year. The quarterly strategy sessions alone are worth the investment.", name: "Marcus Rivera", company: "Rivera Construction", role: "CEO" },
    { quote: "As a freelancer, taxes used to terrify me. Now I just send my docs and everything is handled. Best decision I ever made.", name: "Priya Patel", company: "Independent Consultant", role: "Self-Employed" },
  ];

  return (
    <div className="bg-white text-gray-900 overflow-x-clip font-body">

      {/* ═══════════════════════════════════════ */}
      {/* 1. HERO SECTION */}
      {/* ═══════════════════════════════════════ */}
      <section className="relative w-full h-screen min-h-[500px] sm:min-h-[700px] max-h-[1000px] flex flex-col overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1920&q=80"
            alt="Small business owner working"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Headline + CTA — positioned in upper-center */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-6 -mt-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-5xl md:text-[4.2rem] font-extrabold text-white leading-[1.15] mb-8 max-w-[800px]"
          >
            You grow your business.<br/>
            We'll handle the <RotatingWord />
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Link to="/contact" className="inline-flex items-center justify-center bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold rounded-full px-9 py-4 text-base shadow-[0_6px_25px_rgba(27,117,255,0.4)] hover:shadow-[0_8px_35px_rgba(27,117,255,0.5)] transition-all hover:-translate-y-0.5">
              Schedule a Free Consultation
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* ── Chat Bubble Conversations ── */}
        {/* LEFT conversation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="absolute left-[3%] xl:left-[6%] bottom-[6%] z-20 hidden md:block"
        >
          {/* Question card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] px-5 py-4 w-[280px]">
            <div className="flex justify-between items-start mb-2">
              <span className="font-bold text-[13px] text-gray-900">Marty's Malt Shop</span>
              <div className="w-6 h-6 bg-blue-50 rounded flex items-center justify-center flex-shrink-0 ml-2">
                <span className="material-symbols-outlined text-[14px] text-blue-500">store</span>
              </div>
            </div>
            <p className="text-[13px] text-gray-500 leading-relaxed">Can you provide an update on my tax return?</p>
          </div>

          {/* Dashed connector line */}
          <svg width="60" height="30" className="ml-4" viewBox="0 0 60 30" fill="none">
            <path d="M10 0 L10 15 Q10 25 20 25 L50 25" stroke="white" strokeWidth="2" strokeDasharray="5 4" opacity="0.5"/>
          </svg>

          {/* Reply card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] px-5 py-4 w-[260px] ml-12 -mt-1">
            <div className="flex justify-between items-start mb-2">
              <span className="font-bold text-[13px] text-gray-900">Steve @ EazyTaxes</span>
              <div className="w-6 h-6 bg-orange-50 rounded flex items-center justify-center flex-shrink-0 ml-2">
                <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 text-brand-orange">
                  <path fill="currentColor" d="M10 1L1 17h18L10 1zm0 4.25l5.75 10.25H4.25L10 5.25z"/>
                </svg>
              </div>
            </div>
            <p className="text-[13px] text-gray-500 leading-relaxed">Yes, it's ready for your review!</p>
          </div>
        </motion.div>

        {/* RIGHT conversation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="absolute right-[3%] xl:right-[6%] bottom-[8%] z-20 hidden lg:block"
        >
          {/* Question card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] px-5 py-4 w-[290px]">
            <div className="flex justify-between items-start mb-2">
              <span className="font-bold text-[13px] text-gray-900">Sparkle Car Wash</span>
              <div className="w-6 h-6 bg-blue-50 rounded flex items-center justify-center flex-shrink-0 ml-2">
                <span className="material-symbols-outlined text-[14px] text-blue-500">store</span>
              </div>
            </div>
            <p className="text-[13px] text-gray-500 leading-relaxed">I have a question about my business structure - can you give me some guidance?</p>
          </div>

          {/* Dashed connector line */}
          <svg width="60" height="30" className="ml-4" viewBox="0 0 60 30" fill="none">
            <path d="M10 0 L10 15 Q10 25 20 25 L50 25" stroke="white" strokeWidth="2" strokeDasharray="5 4" opacity="0.5"/>
          </svg>

          {/* Reply card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] px-5 py-4 w-[270px] ml-12 -mt-1">
            <div className="flex justify-between items-start mb-2">
              <span className="font-bold text-[13px] text-gray-900">Lori @ EazyTaxes</span>
              <div className="w-6 h-6 bg-orange-50 rounded flex items-center justify-center flex-shrink-0 ml-2">
                <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 text-brand-orange">
                  <path fill="currentColor" d="M10 1L1 17h18L10 1zm0 4.25l5.75 10.25H4.25L10 5.25z"/>
                </svg>
              </div>
            </div>
            <p className="text-[13px] text-gray-500 leading-relaxed">Of course! Let's set up a time to discuss this.</p>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 2. PROACTIVE STRATEGY */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-24 bg-[#f8f8f8] relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-[2.75rem] font-extrabold mb-6 leading-tight">
              <span className="text-brand-orange">Tax Season</span> isn't a surprise when<br className="hidden md:block"/> you have a proactive strategy
            </h2>
            <p className="text-lg text-gray-500 mb-16 max-w-2xl mx-auto">
              Our year-round process combines planning, software, and a team of experts tailored to your industry, location, and goals.
            </p>
          </motion.div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: 'payments', title: 'Payroll', desc: 'Manages employee payments, tax withholdings, and payroll compliance.', color: 'bg-orange-50 text-brand-orange' },
              { icon: 'query_stats', title: 'Tax Planning', desc: 'Year-round tax strategy that adapts to your business changes.', color: 'bg-blue-50 text-blue-600' },
              { icon: 'account_balance', title: 'Bookkeeping', desc: 'Accurate monthly books and financial statements delivered on time.', color: 'bg-green-50 text-green-600' },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white shadow-[0_4px_25px_rgba(0,0,0,0.06)] rounded-2xl p-7 text-left hover:shadow-[0_8px_35px_rgba(0,0,0,0.1)] transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${card.color}`}>
                  <span className="material-symbols-outlined">{card.icon}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 3. TEAM OF EXPERTS */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-24 bg-white relative">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-[2.75rem] font-extrabold leading-tight">
              A team of experts,<br/>
              <span className="text-brand-orange">dedicated to your success</span>
            </h2>
          </motion.div>

          {/* Top Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-6">
            {[
              { title: 'Tax Preparer', desc: 'Handles your tax filings accurately and on time, maximizing deductions.', icon: 'description', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80' },
              { title: 'Tax Advisor', desc: 'Develops proactive tax strategies to minimize your tax burden year-round.', icon: 'lightbulb', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80' },
            ].map((role, i) => (
              <motion.div key={role.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-[#f8f8f8] rounded-2xl p-5 flex gap-4 items-start hover:bg-gray-100 transition-colors"
              >
                <img src={role.img} alt={role.title} className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">{role.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{role.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center Node */}
          <div className="flex justify-center mb-6">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className="bg-white border-2 border-gray-200 shadow-md rounded-xl px-8 py-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-brand-orange">storefront</span>
              </div>
              <span className="font-bold">Your Company</span>
            </motion.div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              { title: 'Bookkeeper', desc: 'Keeps your financial records organized so you always know where you stand.', icon: 'account_balance_wallet', img: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=200&q=80' },
              { title: 'Payroll Specialist', desc: 'Manages employee payments, tax withholdings, and compliance.', icon: 'payments', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
            ].map((role, i) => (
              <motion.div key={role.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-[#f8f8f8] rounded-2xl p-5 flex gap-4 items-start hover:bg-gray-100 transition-colors"
              >
                <img src={role.img} alt={role.title} className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">{role.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{role.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tab Switcher */}
          <div className="flex justify-center gap-3 mt-12">
            {['Team', 'Services', 'Software'].map((tab, i) => (
              <button key={tab} className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${i === 0 ? 'bg-gray-900 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 3.1. OUR ARCHITECTURAL METHOD (Sticky Scroll) */}
      {/* ═══════════════════════════════════════ */}
      <section className="relative bg-gray-50 pt-24 pb-48 px-6 lg:px-8 border-y border-gray-100">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative">

          {/* Left Column: Sticky Narrative */}
          <div className="lg:w-5/12 relative">
            <div className="sticky top-32 pt-10">
              <ScrollSlideIn direction="left" distance={60}>
                <h2 className="font-headline text-5xl md:text-6xl font-extrabold text-gray-900 mb-8 leading-tight">
                  Our <span className="text-brand-orange italic font-normal">Architectural</span> Method.
                </h2>
                <p className="font-body text-lg text-gray-500 leading-relaxed mb-8">
                  We don't just file paperwork. We rebuild your financial foundation using our core ecosystem of specialized divisions, designed to protect and amplify enterprise value.
                </p>
                <div className="mt-12 hidden lg:block">
                  <VerticalScrollLine height="200px" />
                </div>
              </ScrollSlideIn>
            </div>
          </div>

          {/* Right Column: Scrolling Cards (Deck Effect) */}
          <div className="lg:w-7/12 flex flex-col gap-20 lg:gap-24 lg:pt-32">

            <StackedCard index={0} className="bg-white p-10 md:p-14 border-t-4 border-t-brand-orange border-x border-b border-gray-100 rounded-2xl shadow-[0_15px_45px_rgba(0,0,0,0.04)]">
              <span className="font-headline text-5xl text-brand-orange/20 font-bold block mb-6">01</span>
              <h3 className="font-headline text-3xl font-extrabold text-gray-900 mb-6">Tax & Compliance</h3>
              <p className="text-gray-500 text-base leading-relaxed mb-10">Full-spectrum reporting and regulatory adherence tailored for scaling enterprises across multi-state and global jurisdictions.</p>
              <Link to="/ustax" className="font-label font-bold text-sm uppercase tracking-widest text-brand-orange flex items-center hover:translate-x-2 transition-transform w-fit">
                Explore Division <span className="material-symbols-outlined ml-2 text-[18px]">east</span>
              </Link>
            </StackedCard>

            <StackedCard index={1} className="bg-white p-10 md:p-14 border-t-4 border-t-brand-blue border-x border-b border-gray-100 rounded-2xl shadow-[0_15px_45px_rgba(0,0,0,0.04)]">
              <span className="font-headline text-5xl text-brand-blue/20 font-bold block mb-6">02</span>
              <h3 className="font-headline text-3xl font-extrabold text-gray-900 mb-6">Assurance & SOC 2</h3>
              <p className="text-gray-500 text-base leading-relaxed mb-10">Institutional-grade security validations and financial statement audits. Establishing absolute trust through rigorous engineering.</p>
              <Link to="/assurance-soc2" className="font-label font-bold text-sm uppercase tracking-widest text-brand-blue flex items-center hover:translate-x-2 transition-transform w-fit">
                View Framework <span className="material-symbols-outlined ml-2 text-[18px]">east</span>
              </Link>
            </StackedCard>

            <StackedCard index={2} className="bg-white p-10 md:p-14 border-t-4 border-t-indigo-500 border-x border-b border-gray-100 rounded-2xl shadow-[0_15px_45px_rgba(0,0,0,0.04)]">
              <span className="font-headline text-5xl text-indigo-500/20 font-bold block mb-6">03</span>
              <h3 className="font-headline text-3xl font-extrabold text-gray-900 mb-6">CFO & Advisory</h3>
              <p className="text-gray-500 text-base leading-relaxed mb-10">Fractional executive leadership providing the roadmap for long-term capitalization, M&A readiness, and fiscal resilience.</p>
              <Link to="/cfo-advisory" className="font-label font-bold text-sm uppercase tracking-widest text-indigo-600 flex items-center hover:translate-x-2 transition-transform w-fit">
                Discover Strategic Value <span className="material-symbols-outlined ml-2 text-[18px]">east</span>
              </Link>
            </StackedCard>

            <StackedCard index={3} className="bg-white p-10 md:p-14 border-t-4 border-t-emerald-500 border-x border-b border-gray-100 rounded-2xl shadow-[0_15px_45px_rgba(0,0,0,0.04)]">
              <span className="font-headline text-5xl text-emerald-500/20 font-bold block mb-6">04</span>
              <h3 className="font-headline text-3xl font-extrabold text-gray-900 mb-6">Tax Resolution</h3>
              <p className="text-gray-500 text-base leading-relaxed mb-10">Strategic IRS negotiation and debt restructuring, restoring financial equilibrium through meticulous advocacy and compliance engineering.</p>
              <Link to="/tax-resolution" className="font-label font-bold text-sm uppercase tracking-widest text-emerald-600 flex items-center hover:translate-x-2 transition-transform w-fit">
                View Solutions <span className="material-symbols-outlined ml-2 text-[18px]">east</span>
              </Link>
            </StackedCard>

            <StackedCard index={4} className="bg-white p-10 md:p-14 border-t-4 border-t-amber-500 border-x border-b border-gray-100 rounded-2xl shadow-[0_15px_45px_rgba(0,0,0,0.04)]">
              <span className="font-headline text-5xl text-amber-500/20 font-bold block mb-6">05</span>
              <h3 className="font-headline text-3xl font-extrabold text-gray-900 mb-6">Valuations</h3>
              <p className="text-gray-500 text-base leading-relaxed mb-10">Data-driven appraisal models for 409A, taxation, and transactional fairness. Defensible frameworks for high-stakes capital events.</p>
              <Link to="/valuations" className="font-label font-bold text-sm uppercase tracking-widest text-amber-600 flex items-center hover:translate-x-2 transition-transform w-fit">
                Request Valuation <span className="material-symbols-outlined ml-2 text-[18px]">east</span>
              </Link>
            </StackedCard>

            <StackedCard index={5} className="bg-white p-10 md:p-14 border-t-4 border-t-purple-500 border-x border-b border-gray-100 rounded-2xl shadow-[0_15px_45px_rgba(0,0,0,0.04)]">
              <span className="font-headline text-5xl text-purple-500/20 font-bold block mb-6">06</span>
              <h3 className="font-headline text-3xl font-extrabold text-gray-900 mb-6">Formation & Banking</h3>
              <p className="text-gray-500 text-base leading-relaxed mb-10">End-to-end structural setup from entity incorporation to institutional banking integration, designed for growth-stage enterprises.</p>
              <Link to="/formation-banking" className="font-label font-bold text-sm uppercase tracking-widest text-purple-600 flex items-center hover:translate-x-2 transition-transform w-fit">
                Start Formation <span className="material-symbols-outlined ml-2 text-[18px]">east</span>
              </Link>
            </StackedCard>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 3.2. DATA, QUANTIFIED */}
      {/* ═══════════════════════════════════════ */}
      <ScrollClipReveal direction="bottom" offset={["start 0.85", "start 0.35"]} className="relative">
        <section className="py-32 bg-gray-900 overflow-hidden relative">
          <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            <ScrollSlideIn direction="left" distance={80}>
              <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl relative w-full lg:w-4/5 mx-auto lg:ml-0">
                <ParallaxImage
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                  alt="Financial Analysis"
                  className="grayscale mix-blend-multiply opacity-80"
                  containerClassName="w-full h-full bg-gray-800"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10">
                  <p className="font-headline text-7xl md:text-[6rem] text-brand-orange font-extrabold leading-none">
                    <ScrollCounter target={99.8} suffix="%" decimals={1} />
                  </p>
                  <p className="font-label uppercase tracking-widest text-white mt-4 text-sm font-bold">Audit Success Rate</p>
                </div>
              </div>
            </ScrollSlideIn>

            <div className="text-white">
              <ScrollBlurReveal offset={["start 0.8", "start 0.4"]}>
                <h2 className="font-headline text-5xl md:text-6xl font-extrabold mb-8 leading-tight">
                  Data, <span className="text-brand-orange italic font-normal">Quantified.</span>
                </h2>
                <p className="font-body text-xl text-gray-300 leading-relaxed mb-12">
                  We believe in objective truth. Our proprietary forensic tools eliminate human error, ensuring your ledgers are impenetrable during regulatory scrutiny.
                </p>
              </ScrollBlurReveal>

              <ScrollStagger staggerAmount={0.15} className="space-y-8 border-l border-white/20 pl-8" offset={["start 0.85", "start 0.25"]}>
                <div>
                  <h4 className="font-headline text-3xl font-extrabold mb-2 text-white">
                    <ScrollCounter target={500} suffix="+" />
                  </h4>
                  <p className="font-label text-sm uppercase tracking-widest text-gray-400">Entities Restructured</p>
                </div>
                <div>
                  <h4 className="font-headline text-3xl font-extrabold mb-2 text-white">$<ScrollCounter target={2.4} suffix="B" decimals={1} /></h4>
                  <p className="font-label text-sm uppercase tracking-widest text-gray-400">Capital Advised</p>
                </div>
                <div>
                  <h4 className="font-headline text-3xl font-extrabold mb-2 text-white">Zero</h4>
                  <p className="font-label text-sm uppercase tracking-widest text-gray-400">Material Weaknesses</p>
                </div>
              </ScrollStagger>
            </div>
          </div>
        </section>
      </ScrollClipReveal>

      {/* ═══════════════════════════════════════ */}
      {/* 4. VIDEO EXPLAINER */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-24 bg-[#f8f8f8]">
        <div className="max-w-[1000px] mx-auto px-6 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-[2.75rem] font-extrabold mb-14"
          >
            A different kind of <span className="text-brand-orange">accounting firm</span>
          </motion.h2>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative aspect-video bg-gray-900 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.2)] group cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80"
              alt="Video thumbnail"
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.2)] group-hover:scale-110 transition-transform duration-300">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-brand-orange fill-current ml-1">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 5. FEATURED IN */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-[1000px] mx-auto px-6">
          <h3 className="text-center text-2xl font-bold mb-10">Featured in</h3>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-40">
            {['Forbes', 'Bloomberg', 'Inc.', 'Entrepreneur', 'TechCrunch'].map(name => (
              <span key={name} className="text-2xl font-extrabold text-gray-900 tracking-tight">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 6. CONTENT BLOCKS */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 space-y-32">

          {/* Block 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="aspect-[4/3] bg-blue-50 rounded-[32px] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80" alt="Team working" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 right-0 sm:-right-6 bg-white p-4 rounded-xl shadow-card flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                  <span className="material-symbols-outlined">trending_up</span>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Savings</p>
                  <p className="font-bold text-xl">$3,469</p>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">
                Good accountants answer questions. Great ones <span className="text-brand-orange">prevent</span> them.
              </h2>
              <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                See the difference proactive accounting makes when you're not scrambling for answers at tax time.
              </p>
              <Link to="/contact" className="inline-flex items-center bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold rounded-full px-8 py-4 shadow-md transition-all hover:-translate-y-0.5">
                Schedule a Free Consultation
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </motion.div>
          </div>

          {/* Block 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">
                What's your time <span className="text-brand-orange">worth?</span>
              </h2>
              <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                Stop spending it on spreadsheets and tax codes — let us handle the numbers while you grow your business.
              </p>
              <Link to="/pricing" className="inline-flex items-center bg-brand-orange hover:bg-brand-orangeDark text-white font-bold rounded-full px-8 py-4 shadow-md transition-all hover:-translate-y-0.5">
                View Pricing
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative order-1 lg:order-2">
              <div className="aspect-[4/3] bg-orange-50 rounded-[32px] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80" alt="Business meeting" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 left-0 sm:-left-6 bg-white p-5 rounded-xl shadow-card">
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Medium Size Company</p>
                <p className="text-xs text-gray-400 mb-1">Flat Rate</p>
                <p className="font-bold text-3xl">$850</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 7. CUSTOMER SPOTLIGHT */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-24 bg-[#f8f8f8]">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="text-center text-3xl md:text-[2.75rem] font-extrabold mb-16">
            Customer <span className="text-brand-orange">spotlight</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Images Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&q=80" alt="Customer" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=400&q=80" alt="Customer" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80" alt="Customer" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1556742208-999815fca738?auto=format&fit=crop&w=400&q=80" alt="Customer" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div>
              <div className="relative min-h-[200px]">
                {testimonials.map((t, i) => (
                  <motion.div
                    key={i}
                    initial={false}
                    animate={{ opacity: i === testimonialIdx ? 1 : 0, x: i === testimonialIdx ? 0 : 20 }}
                    className={`${i === testimonialIdx ? '' : 'absolute top-0 pointer-events-none'}`}
                  >
                    <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 italic">"{t.quote}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-brand-orange rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {t.name[0]}
                      </div>
                      <div>
                        <p className="font-bold">{t.name}</p>
                        <p className="text-sm text-gray-500">{t.company}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center gap-3 mt-10">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIdx(i)}
                    className={`w-10 h-10 rounded-full font-bold text-sm transition-all ${i === testimonialIdx ? 'bg-brand-orange text-white shadow-md' : 'bg-white border border-gray-200 text-gray-500 hover:border-brand-orange'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 8. CALCULATOR */}
      {/* ═══════════════════════════════════════ */}
      <section id="calculator" className="py-24 bg-white">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="bg-[#f8f8f8] rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.04)] p-8 md:p-12">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-100 text-brand-orange rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined">calculate</span>
              </div>
              <h3 className="text-2xl font-bold">Calculator</h3>
            </div>
            <p className="text-gray-400 mb-10 text-sm">Adjust the sliders below to match your business details</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                {/* Revenue Slider */}
                <div>
                  <div className="flex justify-between items-end mb-3">
                    <label className="font-bold text-sm flex items-center gap-2">
                      <span className="material-symbols-outlined text-orange-400 text-[18px]">trending_up</span>
                      Annual Revenue
                    </label>
                    <span className="font-bold text-base tabular-nums">${revenue.toLocaleString()}</span>
                  </div>
                  <input type="range" min="50000" max="2000000" step="10000" value={revenue} onChange={(e) => setRevenue(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-orange" />
                  <div className="flex justify-between text-xs text-gray-400 mt-1.5 font-semibold"><span>$50k</span><span>$2M+</span></div>
                </div>
                {/* Employees Slider */}
                <div>
                  <div className="flex justify-between items-end mb-3">
                    <label className="font-bold text-sm flex items-center gap-2">
                      <span className="material-symbols-outlined text-blue-400 text-[18px]">group</span>
                      Number of Employees
                    </label>
                    <span className="font-bold text-base tabular-nums">{employees}</span>
                  </div>
                  <input type="range" min="1" max="100" value={employees} onChange={(e) => setEmployees(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                  <div className="flex justify-between text-xs text-gray-400 mt-1.5 font-semibold"><span>1</span><span>100+</span></div>
                </div>
                {/* Tax Rate Slider */}
                <div>
                  <div className="flex justify-between items-end mb-3">
                    <label className="font-bold text-sm flex items-center gap-2">
                      <span className="material-symbols-outlined text-green-400 text-[18px]">receipt</span>
                      Current Tax Rate
                    </label>
                    <span className="font-bold text-base tabular-nums">{taxRate}%</span>
                  </div>
                  <input type="range" min="10" max="45" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500" />
                  <div className="flex justify-between text-xs text-gray-400 mt-1.5 font-semibold"><span>10%</span><span>45%</span></div>
                </div>
              </div>

              <div className="flex flex-col justify-center items-start lg:pl-12 lg:border-l border-gray-200">
                <h4 className="font-bold text-xl mb-1">Estimated Annual Savings</h4>
                <p className="text-xs text-gray-400 mb-6">Based on common deduction and tax strategies</p>
                <div className="text-5xl md:text-6xl font-extrabold text-brand-orange mb-8 tabular-nums">
                  {calculateSavings()}
                </div>
                <Link to="/contact" className="w-full text-center inline-flex items-center justify-center bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold rounded-full px-8 py-4 shadow-md transition-all">
                  Schedule a Free Consultation
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 9. BLOG / TAX TIPS */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-24 bg-[#f8f8f8]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-center text-3xl md:text-[2.75rem] font-extrabold mb-16">
            Business & <span className="text-brand-orange">tax tips</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80', date: 'May 28, 2026', title: 'How to Prepare Your Business for Tax Changes in 2027', desc: 'With new regulations around the corner, here\'s what every small business owner needs to know.' },
              { img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80', date: 'May 15, 2026', title: 'Small Business Tax Deductions You Might Be Missing', desc: 'The 2026 tax year is already over. Ensure you\'re claiming every deduction available to your business.' },
              { img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=600&q=80', date: 'Apr 30, 2026', title: 'How to Set Up Bookkeeping for Your Small Business', desc: 'A step-by-step guide that walks you through setting up clean, organized financial records.' },
            ].map((post, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link to="/resources" className="group block bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_35px_rgba(0,0,0,0.1)] transition-shadow">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-brand-orange font-bold mb-3">{post.date}</p>
                    <h3 className="font-bold text-lg mb-3 leading-snug group-hover:text-brand-orange transition-colors">{post.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{post.desc}</p>
                    <span className="inline-flex items-center text-brand-orange font-bold text-sm mt-4 group-hover:underline">
                      Read More
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-1"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 9.1. YOUR BLUEPRINT AWAITS */}
      {/* ═══════════════════════════════════════ */}
      <section className="min-h-[80vh] bg-gray-50 flex items-center relative overflow-hidden border-t border-gray-100">
        {/* Parallax SVG lines */}
        <ScrollParallax speed={0.3} className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none text-brand-orange">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="0" y1="100" x2="100" y2="0" stroke="currentColor" strokeWidth="0.5" />
            <line x1="0" y1="90" x2="100" y2="-10" stroke="currentColor" strokeWidth="0.5" />
            <line x1="0" y1="80" x2="100" y2="-20" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </ScrollParallax>

        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 w-full relative z-10">
          <ScrollScale scaleRange={[0.8, 1]} className="max-w-4xl text-center md:text-left mb-8" offset={["start 0.9", "center 0.7"]}>
            <h2 className="font-headline text-6xl md:text-8xl font-extrabold text-gray-900 leading-[0.9] mb-8">
              Your Blueprint <br className="hidden md:block"/>
              <ScrollSlideIn direction="right" distance={40} className="inline-block" offset={["start 0.9", "center 0.7"]}>
                <span className="text-brand-orange italic font-normal">Awaits.</span>
              </ScrollSlideIn>
            </h2>
          </ScrollScale>

          <ScrollBlurReveal className="max-w-2xl" offset={["start 0.9", "center 0.8"]}>
            <p className="font-body text-xl md:text-2xl text-gray-500 leading-relaxed mb-12">
              Connect with a managing director to audit your current ecosystem and map your financial architecture.
            </p>
          </ScrollBlurReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 10. FINAL CTA */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Ready to take control of your <span className="text-brand-orange">finances?</span>
          </h2>
          <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto">
            Join 100,000+ businesses that trust EazyTaxes with their bookkeeping, payroll, and taxes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold rounded-full px-10 py-4 text-lg shadow-[0_6px_25px_rgba(27,117,255,0.4)] transition-all hover:-translate-y-0.5">
              Schedule a Free Consultation
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
            <Link to="/pricing" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-bold rounded-full px-10 py-4 text-lg border border-white/20 transition-all">
              View Pricing
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mt-16 text-sm text-gray-500">
            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-brand-orange">verified</span> Licensed CPAs</span>
            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-brand-orange">lock</span> 256-bit Encrypted</span>
            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-brand-orange">public</span> All 50 States</span>
            <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-brand-orange">star</span> 4.8/5 Rated</span>
          </div>
        </div>
      </section>

    </div>
  );
}
