import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const features = [
  { icon: 'domain', title: 'LLC Formation', desc: 'Single-member and multi-member LLCs with operating agreement drafting and state filing.' },
  { icon: 'corporate_fare', title: 'C-Corp & S-Corp', desc: 'Incorporation, bylaws, shareholder agreements and IRS election filing for S-Corp status.' },
  { icon: 'task_alt', title: 'Registered Agent', desc: 'Dedicated registered agent service in all 50 states to receive legal and government notices.' },
  { icon: 'public', title: 'Multi-State Filing', desc: 'Foreign qualification to expand your entity across multiple states as you grow.' },
  { icon: 'gavel', title: 'Operating Agreement', desc: 'Custom-drafted agreements that protect member rights and define governance rules.' },
  { icon: 'inventory_2', title: 'Annual Reports', desc: 'We track and file required annual reports so your entity stays in good standing.' },
];

const steps = [
  { num: '01', title: 'Choose your structure', desc: 'We analyze your goals and recommend the best entity type for tax efficiency and liability protection.' },
  { num: '02', title: 'File with the state', desc: 'We prepare and file all documents with the Secretary of State, typically within 1–3 business days.' },
  { num: '03', title: 'Get your EIN', desc: 'We register your Employer Identification Number with the IRS so you\'re ready to open a bank account and hire.' },
  { num: '04', title: 'You\'re in business', desc: 'Receive your formation docs, operating agreement, and a checklist for next steps — all in one place.' },
];

export default function StartBusiness() {
  return (
    <div className="bg-white text-gray-900 font-body overflow-x-clip">

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gray-900 text-white pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/85 to-gray-900/40 z-10" />
          <img
            src="https://images.unsplash.com/photo-1664575602276-acd073f104c1?auto=format&fit=crop&w=1920&q=80"
            alt="Business formation"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 max-w-[1200px] mx-auto px-6 lg:px-8 w-full py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <span className="inline-flex items-center gap-2 text-brand-orange text-sm font-bold uppercase tracking-widest mb-6">
              <span className="material-symbols-outlined text-[16px]">add_business</span>
              Entity Formation
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              Start a <span className="text-brand-orange italic font-normal">Business.</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-xl leading-relaxed mb-10">
              LLC, C-Corp & S-Corp setup — we handle every filing so you can focus on building your business from day one.
            </p>
            <Link to="/contact" className="inline-flex items-center bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold rounded-full px-9 py-4 shadow-[0_6px_25px_rgba(27,117,255,0.4)] transition-all hover:-translate-y-0.5">
              Start Formation
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-[#f8f8f8]">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-[2.75rem] font-extrabold leading-tight mb-4">
              Everything you need to <span className="text-brand-orange">launch</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">From choosing the right structure to receiving your EIN, we handle the entire formation process.</p>
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

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-[900px] mx-auto px-6">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-[2.75rem] font-extrabold text-center mb-16">
            How it <span className="text-brand-orange">works</span>
          </motion.h2>
          <div className="space-y-8">
            {steps.map((s, i) => (
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
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to start your <span className="text-brand-orange">business?</span></h2>
          <p className="text-gray-400 mb-8">Get your entity formed in days, not weeks. Schedule a free consultation today.</p>
          <Link to="/contact" className="inline-flex items-center bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold rounded-full px-10 py-4 shadow-[0_6px_25px_rgba(27,117,255,0.4)] transition-all hover:-translate-y-0.5">
            Schedule a Free Consultation
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
