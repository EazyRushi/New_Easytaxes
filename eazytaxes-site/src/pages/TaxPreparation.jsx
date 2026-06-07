import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const entityTypes = [
  { icon: 'person', label: 'Individual (1040)', desc: 'Personal federal & state returns for all income types.' },
  { icon: 'store', label: 'Sole Proprietor (Sch. C)', desc: 'Self-employed & freelancer filings with full deductions.' },
  { icon: 'corporate_fare', label: 'S-Corporation (1120-S)', desc: 'Pass-through entity returns with K-1 distributions.' },
  { icon: 'domain', label: 'C-Corporation (1120)', desc: 'Corporate tax returns with full compliance support.' },
  { icon: 'groups', label: 'Partnership (1065)', desc: 'Multi-member LLC and partnership filings.' },
  { icon: 'volunteer_activism', label: 'Non-Profit (990)', desc: 'Form 990 and 990-EZ for charitable organizations.' },
];

const process = [
  { num: '01', title: 'Send us your docs', desc: 'Upload securely through our client portal — bank statements, receipts, prior returns.' },
  { num: '02', title: 'CPA preparation', desc: 'A licensed CPA prepares your return and identifies every applicable deduction and credit.' },
  { num: '03', title: 'Review & approve', desc: 'We walk you through the return line-by-line before anything is filed.' },
  { num: '04', title: 'Filed & confirmed', desc: 'We e-file your return and send you confirmation plus a copy for your records.' },
];

export default function TaxPreparation() {
  return (
    <div className="bg-white text-gray-900 font-body overflow-x-clip">

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gray-900 text-white pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/85 to-gray-900/40 z-10" />
          <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1920&q=80" alt="Tax preparation" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-20 max-w-[1200px] mx-auto px-6 lg:px-8 w-full py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <span className="inline-flex items-center gap-2 text-brand-orange text-sm font-bold uppercase tracking-widest mb-6">
              <span className="material-symbols-outlined text-[16px]">description</span>
              Tax Services
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              Tax <span className="text-brand-orange italic font-normal">Preparation.</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-xl leading-relaxed mb-10">
              Corporate & personal tax filing handled by licensed CPAs — accurate, on time, every time.
            </p>
            <Link to="/contact" className="inline-flex items-center bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold rounded-full px-9 py-4 shadow-[0_6px_25px_rgba(27,117,255,0.4)] transition-all hover:-translate-y-0.5">
              Start My Return
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Entity Types */}
      <section className="py-24 bg-[#f8f8f8]">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-[2.75rem] font-extrabold text-center mb-16">
            We file for <span className="text-brand-orange">every entity type</span>
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {entityTypes.map((e, i) => (
              <motion.div key={e.label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-7 flex gap-5 items-start shadow-[0_4px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_35px_rgba(0,0,0,0.09)] transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined">{e.icon}</span>
                </div>
                <div>
                  <h3 className="font-bold mb-1">{e.label}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{e.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-white">
        <div className="max-w-[900px] mx-auto px-6">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-[2.75rem] font-extrabold text-center mb-16">
            Our <span className="text-brand-orange">process</span>
          </motion.h2>
          <div className="space-y-8">
            {process.map((s, i) => (
              <motion.div key={s.num} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex gap-6 items-start">
                <span className="text-4xl font-extrabold text-brand-orange/20 w-16 flex-shrink-0 leading-none">{s.num}</span>
                <div className="pt-1">
                  <h3 className="font-bold text-xl mb-2">{s.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">File with <span className="text-brand-orange">confidence</span></h2>
          <p className="text-gray-400 mb-8">Licensed CPAs prepare every return. Schedule your free consultation today.</p>
          <Link to="/contact" className="inline-flex items-center bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold rounded-full px-10 py-4 shadow-[0_6px_25px_rgba(27,117,255,0.4)] transition-all hover:-translate-y-0.5">
            Schedule a Free Consultation
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
