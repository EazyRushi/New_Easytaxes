import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const pillars = [
  { icon: 'lightbulb', title: 'Year-Round Strategy', desc: 'Ongoing tax planning sessions throughout the year — not just at filing time.' },
  { icon: 'trending_down', title: 'Tax Reduction Planning', desc: 'Legal strategies to reduce your effective tax rate using deductions, credits, and entity structuring.' },
  { icon: 'real_estate_agent', title: 'Real Estate Tax Strategy', desc: 'Depreciation, cost segregation, 1031 exchanges, and passive loss planning for property investors.' },
  { icon: 'group', title: 'Owner Compensation', desc: 'Optimal salary vs. distribution strategies for S-Corp and LLC owners to minimize self-employment tax.' },
  { icon: 'query_stats', title: 'Retirement Planning', desc: 'Solo 401(k), SEP-IRA, and defined benefit plans designed to shelter income legally.' },
  { icon: 'account_tree', title: 'Business Succession', desc: 'Tax-efficient strategies for selling, gifting, or transferring your business to the next generation.' },
];

export default function TaxAdvisory() {
  return (
    <div className="bg-white text-gray-900 font-body overflow-x-clip">

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gray-900 text-white pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/85 to-gray-900/40 z-10" />
          <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80" alt="Tax advisory" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-20 max-w-[1200px] mx-auto px-6 lg:px-8 w-full py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <span className="inline-flex items-center gap-2 text-brand-orange text-sm font-bold uppercase tracking-widest mb-6">
              <span className="material-symbols-outlined text-[16px]">lightbulb</span>
              Tax Services
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              Tax <span className="text-brand-orange italic font-normal">Advisory.</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-xl leading-relaxed mb-10">
              Year-round proactive tax strategy — so you're never surprised when April comes around.
            </p>
            <Link to="/contact" className="inline-flex items-center bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold rounded-full px-9 py-4 shadow-[0_6px_25px_rgba(27,117,255,0.4)] transition-all hover:-translate-y-0.5">
              Get a Strategy Session
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Reactive vs Proactive */}
      <section className="py-24 bg-[#f8f8f8]">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-[2.75rem] font-extrabold text-center mb-16">
            Reactive vs. <span className="text-brand-orange">Proactive</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-gray-100 rounded-2xl p-8 border-t-4 border-gray-300">
              <h3 className="font-bold text-xl mb-6 text-gray-500">Reactive (Most Firms)</h3>
              <ul className="space-y-3 text-sm text-gray-500">
                {['File after the year ends', 'No mid-year strategy', 'Surprises at tax time', 'Missed deductions', 'No proactive communication'].map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-400 text-[18px]">close</span>{item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border-t-4 border-brand-orange shadow-[0_8px_35px_rgba(0,0,0,0.08)]">
              <h3 className="font-bold text-xl mb-6">Proactive (EazyTaxes)</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                {['Quarterly strategy reviews', 'Real-time tax projections', 'Zero year-end surprises', 'Maximum legal deductions', 'Dedicated advisor on-call'].map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-brand-orange text-[18px]">check_circle</span>{item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-[2.75rem] font-extrabold text-center mb-16">
            Advisory <span className="text-brand-orange">pillars</span>
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-[#f8f8f8] rounded-2xl p-8 hover:bg-white hover:shadow-[0_8px_35px_rgba(0,0,0,0.08)] transition-all">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined">{p.icon}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{p.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Build a <span className="text-brand-orange">tax strategy</span> that works</h2>
          <p className="text-gray-400 mb-8">Year-round advisory, not just April. Schedule your free strategy session now.</p>
          <Link to="/contact" className="inline-flex items-center bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold rounded-full px-10 py-4 shadow-[0_6px_25px_rgba(27,117,255,0.4)] transition-all hover:-translate-y-0.5">
            Schedule a Free Consultation
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
