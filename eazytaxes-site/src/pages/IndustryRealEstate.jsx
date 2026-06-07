import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const services = [
  { icon: 'receipt_long', title: 'Real Estate Tax Filing', desc: 'Schedule E, Schedule D, and Form 4797 — rental income, flips, and capital gains filed correctly.', href: '/small-business-taxes' },
  { icon: 'lightbulb', title: 'Tax Advisory', desc: '1031 exchanges, depreciation, cost segregation, and passive activity loss planning.', href: '/tax-advisory' },
  { icon: 'description', title: 'Tax Preparation', desc: 'Corporate and personal returns for agents, investors, and property management companies.', href: '/tax-preparation' },
  { icon: 'menu_book', title: 'Bookkeeping', desc: 'Track rental income, expenses, repairs, and mortgage interest across all properties.', href: '/bookkeeping' },
  { icon: 'domain', title: 'Entity Formation', desc: 'LLC structuring for liability protection and tax efficiency across your portfolio.', href: '/start-business' },
  { icon: 'payments', title: 'Payroll', desc: 'Pay property managers, maintenance staff, and leasing agents on time.', href: '/payroll-services' },
];

const strategies = ['1031 Exchange', 'Cost Segregation', 'Bonus Depreciation', 'Passive Loss Rules', 'Short-Term Rental Strategy', 'REPS Election'];

export default function IndustryRealEstate() {
  return (
    <div className="bg-white text-gray-900 font-body overflow-x-clip">
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gray-900 text-white pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/85 to-gray-900/40 z-10" />
          <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1920&q=80" alt="Real estate" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-20 max-w-[1200px] mx-auto px-6 lg:px-8 w-full py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <span className="inline-flex items-center gap-2 text-brand-orange text-sm font-bold uppercase tracking-widest mb-6">
              <span className="material-symbols-outlined text-[16px]">real_estate_agent</span>
              Business Types
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              Real <span className="text-brand-orange italic font-normal">Estate.</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-xl leading-relaxed mb-10">
              Tax and accounting services for agents, brokers, and investors — built around 1031 exchanges, depreciation, and portfolio growth.
            </p>
            <Link to="/contact" className="inline-flex items-center bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold rounded-full px-9 py-4 shadow-[0_6px_25px_rgba(27,117,255,0.4)] transition-all hover:-translate-y-0.5">
              Schedule a Free Consultation
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-[#f8f8f8]">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-[2.75rem] font-extrabold text-center mb-16">
            Services for <span className="text-brand-orange">real estate</span>
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Link to={s.href} className="block bg-white rounded-2xl p-8 shadow-[0_4px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_35px_rgba(0,0,0,0.09)] transition-shadow group">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center mb-5">
                    <span className="material-symbols-outlined">{s.icon}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-brand-orange transition-colors">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl font-extrabold mb-10">
            Tax strategies we <span className="text-brand-orange">specialize in</span>
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-3">
            {strategies.map((s, i) => (
              <motion.span key={s} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="px-5 py-2.5 bg-[#f8f8f8] rounded-full text-sm font-bold text-gray-700 border border-gray-200">
                {s}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900 text-white text-center">
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Maximize your real estate <span className="text-brand-orange">tax advantage</span></h2>
          <p className="text-gray-400 mb-8">From single-family rentals to commercial portfolios — we build the strategy that keeps more in your pocket.</p>
          <Link to="/contact" className="inline-flex items-center bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold rounded-full px-10 py-4 shadow-[0_6px_25px_rgba(27,117,255,0.4)] transition-all hover:-translate-y-0.5">
            Schedule a Free Consultation
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
