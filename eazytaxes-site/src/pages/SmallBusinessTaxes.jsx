import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const services = [
  { icon: 'receipt_long', title: 'Federal Tax Filing', desc: 'Accurate preparation and filing of Form 1120, 1120-S, 1065, or Schedule C based on your entity.' },
  { icon: 'location_city', title: 'State & Local Taxes', desc: 'Multi-state filing compliance including state income, franchise, and sales tax returns.' },
  { icon: 'find_in_page', title: 'Deduction Maximization', desc: 'We identify every legitimate deduction — home office, vehicle, equipment, and more.' },
  { icon: 'calendar_month', title: 'Deadline Management', desc: 'We track all federal and state filing deadlines so you never miss a due date or pay a penalty.' },
  { icon: 'history_edu', title: 'Prior Year Filing', desc: 'Catch up on unfiled returns from prior years without IRS penalties where possible.' },
  { icon: 'shield', title: 'Audit Support', desc: 'If the IRS ever questions your return, we stand behind our work and support you through it.' },
];

export default function SmallBusinessTaxes() {
  return (
    <div className="bg-white text-gray-900 font-body overflow-x-clip">

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gray-900 text-white pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/85 to-gray-900/40 z-10" />
          <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1920&q=80" alt="Small business taxes" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-20 max-w-[1200px] mx-auto px-6 lg:px-8 w-full py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <span className="inline-flex items-center gap-2 text-brand-orange text-sm font-bold uppercase tracking-widest mb-6">
              <span className="material-symbols-outlined text-[16px]">receipt_long</span>
              Tax Services
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              Small Business <span className="text-brand-orange italic font-normal">Taxes.</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-xl leading-relaxed mb-10">
              Federal & state filings done right — maximize deductions and stay compliant across every jurisdiction.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="inline-flex items-center bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold rounded-full px-9 py-4 shadow-[0_6px_25px_rgba(27,117,255,0.4)] transition-all hover:-translate-y-0.5">
                File My Taxes
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <Link to="/calculators" className="inline-flex items-center bg-white/10 hover:bg-white/20 text-white font-bold rounded-full px-9 py-4 border border-white/20 transition-all">
                Tax Calculator
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-brand-orange text-white">
        <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[['$2.4B+', 'Tax Savings Delivered'], ['50', 'States Covered'], ['10k+', 'Returns Filed'], ['99.8%', 'Accuracy Rate']].map(([val, label]) => (
            <div key={label}>
              <p className="text-3xl md:text-4xl font-extrabold mb-1">{val}</p>
              <p className="text-sm text-white/80 font-semibold">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-[#f8f8f8]">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-[2.75rem] font-extrabold text-center mb-16">
            What we <span className="text-brand-orange">cover</span>
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-8 shadow-[0_4px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_35px_rgba(0,0,0,0.09)] transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined">{s.icon}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Stop leaving money <span className="text-brand-orange">on the table</span></h2>
          <p className="text-gray-400 mb-8">Our CPAs find every deduction you're entitled to. Schedule a free tax consultation.</p>
          <Link to="/contact" className="inline-flex items-center bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold rounded-full px-10 py-4 shadow-[0_6px_25px_rgba(27,117,255,0.4)] transition-all hover:-translate-y-0.5">
            Schedule a Free Consultation
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
