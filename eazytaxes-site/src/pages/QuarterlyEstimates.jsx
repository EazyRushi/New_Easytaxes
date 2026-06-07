import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const quarters = [
  { q: 'Q1', due: 'April 15', income: 'Jan 1 – Mar 31', color: 'bg-blue-50 text-blue-600 border-blue-200' },
  { q: 'Q2', due: 'June 15', income: 'Apr 1 – May 31', color: 'bg-orange-50 text-brand-orange border-orange-200' },
  { q: 'Q3', due: 'September 15', income: 'Jun 1 – Aug 31', color: 'bg-green-50 text-green-600 border-green-200' },
  { q: 'Q4', due: 'January 15', income: 'Sep 1 – Dec 31', color: 'bg-purple-50 text-purple-600 border-purple-200' },
];

const features = [
  { icon: 'calculate', title: 'Accurate Projections', desc: 'We calculate your estimated tax liability each quarter based on actual income and deductions.' },
  { icon: 'notifications_active', title: 'Deadline Reminders', desc: 'We proactively notify you before each quarterly deadline so you\'re never caught off-guard.' },
  { icon: 'trending_down', title: 'Underpayment Prevention', desc: 'We apply the safe harbor rules to protect you from IRS underpayment penalties.' },
  { icon: 'send', title: 'Voucher Preparation', desc: 'We prepare your 1040-ES or 1120-W vouchers ready for payment each quarter.' },
];

export default function QuarterlyEstimates() {
  return (
    <div className="bg-white text-gray-900 font-body overflow-x-clip">

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gray-900 text-white pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/85 to-gray-900/40 z-10" />
          <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1920&q=80" alt="Quarterly estimates" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-20 max-w-[1200px] mx-auto px-6 lg:px-8 w-full py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <span className="inline-flex items-center gap-2 text-brand-orange text-sm font-bold uppercase tracking-widest mb-6">
              <span className="material-symbols-outlined text-[16px]">calendar_month</span>
              Tax Services
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              Quarterly <span className="text-brand-orange italic font-normal">Estimates.</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-xl leading-relaxed mb-10">
              Deadline tracking & prep — never miss a quarterly payment or pay an underpayment penalty again.
            </p>
            <Link to="/contact" className="inline-flex items-center bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold rounded-full px-9 py-4 shadow-[0_6px_25px_rgba(27,117,255,0.4)] transition-all hover:-translate-y-0.5">
              Set Up My Estimates
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Quarterly Calendar */}
      <section className="py-24 bg-[#f8f8f8]">
        <div className="max-w-[1000px] mx-auto px-6">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-[2.75rem] font-extrabold text-center mb-16">
            2025 <span className="text-brand-orange">payment calendar</span>
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {quarters.map((q, i) => (
              <motion.div key={q.q} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-6 border-2 ${q.color} bg-white`}>
                <p className="text-3xl font-extrabold mb-1">{q.q}</p>
                <p className="font-bold text-sm mb-3">{q.income}</p>
                <div className="border-t border-current/20 pt-3">
                  <p className="text-xs font-bold uppercase tracking-wider opacity-60 mb-1">Due Date</p>
                  <p className="font-extrabold">{q.due}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-[2.75rem] font-extrabold text-center mb-16">
            How we <span className="text-brand-orange">help</span>
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-[#f8f8f8] rounded-2xl p-7 hover:bg-white hover:shadow-[0_8px_35px_rgba(0,0,0,0.08)] transition-all text-center">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center mb-5 mx-auto">
                  <span className="material-symbols-outlined">{f.icon}</span>
                </div>
                <h3 className="font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Never miss a <span className="text-brand-orange">deadline</span></h2>
          <p className="text-gray-400 mb-8">We track, calculate, and remind you — so you avoid penalties all year long.</p>
          <Link to="/contact" className="inline-flex items-center bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold rounded-full px-10 py-4 shadow-[0_6px_25px_rgba(27,117,255,0.4)] transition-all hover:-translate-y-0.5">
            Schedule a Free Consultation
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
