import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const features = [
  { icon: 'account_balance', title: 'Business Checking', desc: 'Open a dedicated business checking account to separate personal and business finances from day one.' },
  { icon: 'credit_card', title: 'Business Credit Card', desc: 'Build business credit with the right card for your spending patterns and rewards needs.' },
  { icon: 'savings', title: 'Business Savings', desc: 'High-yield savings accounts to park your tax reserves and operating cushion.' },
  { icon: 'lock', title: 'Fraud Protection', desc: 'Multi-layer fraud monitoring and FDIC-insured accounts for peace of mind.' },
  { icon: 'sync_alt', title: 'Accounting Integration', desc: 'Seamless connection to QuickBooks, Xero, and other accounting platforms.' },
  { icon: 'support_agent', title: 'Dedicated Support', desc: 'Our team guides you through the bank application process and documentation requirements.' },
];

export default function BusinessBanking() {
  return (
    <div className="bg-white text-gray-900 font-body overflow-x-clip">

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gray-900 text-white pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/85 to-gray-900/40 z-10" />
          <img src="https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=1920&q=80" alt="Business banking" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-20 max-w-[1200px] mx-auto px-6 lg:px-8 w-full py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <span className="inline-flex items-center gap-2 text-brand-orange text-sm font-bold uppercase tracking-widest mb-6">
              <span className="material-symbols-outlined text-[16px]">account_balance</span>
              Entity Formation
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              Business <span className="text-brand-orange italic font-normal">Banking.</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-xl leading-relaxed mb-10">
              Corporate financial account setup — we match you with the right banking solution and handle the paperwork.
            </p>
            <Link to="/contact" className="inline-flex items-center bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold rounded-full px-9 py-4 shadow-[0_6px_25px_rgba(27,117,255,0.4)] transition-all hover:-translate-y-0.5">
              Open an Account
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-[#f8f8f8]">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-[2.75rem] font-extrabold leading-tight mb-4">
              A complete <span className="text-brand-orange">banking setup</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">We set up the full financial infrastructure your business needs to operate and grow.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-8 shadow-[0_4px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_35px_rgba(0,0,0,0.09)] transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined">{f.icon}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-[1000px] mx-auto px-6 flex flex-wrap justify-center gap-10 text-sm text-gray-500">
          {['FDIC Insured', 'Zero Hidden Fees', 'Same-Day Setup', 'All 50 States', 'CPA Guided'].map(t => (
            <span key={t} className="flex items-center gap-2 font-bold">
              <span className="material-symbols-outlined text-brand-orange text-[18px]">verified</span>{t}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Set up your <span className="text-brand-orange">business account</span></h2>
          <p className="text-gray-400 mb-8">Get the right banking foundation for your business. Schedule a free consultation today.</p>
          <Link to="/contact" className="inline-flex items-center bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold rounded-full px-10 py-4 shadow-[0_6px_25px_rgba(27,117,255,0.4)] transition-all hover:-translate-y-0.5">
            Schedule a Free Consultation
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
