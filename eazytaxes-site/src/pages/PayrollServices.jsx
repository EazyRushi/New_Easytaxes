import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const features = [
  { icon: 'payments', title: 'Payroll Processing', desc: 'We run payroll for hourly, salaried, and contractor employees on your schedule — weekly, biweekly, or monthly.' },
  { icon: 'percent', title: 'Tax Withholdings', desc: 'Automatic calculation and withholding of federal, state, and local payroll taxes for every employee.' },
  { icon: 'send_money', title: 'Direct Deposit', desc: 'Employees get paid on time via direct deposit — no checks, no hassle.' },
  { icon: 'description', title: 'W-2 & 1099 Filing', desc: 'We prepare and file year-end W-2s for employees and 1099s for contractors automatically.' },
  { icon: 'health_and_safety', title: 'Benefits Administration', desc: 'Health insurance, 401(k), and PTO tracking integrated with payroll deductions.' },
  { icon: 'verified_user', title: 'Compliance Guarantee', desc: 'We keep up with changing payroll laws across all 50 states so you\'re always in compliance.' },
];

const payrollTypes = ['Hourly Employees', 'Salaried Employees', '1099 Contractors', 'Part-Time Staff', 'Seasonal Workers', 'Multi-State Teams'];

export default function PayrollServices() {
  return (
    <div className="bg-white text-gray-900 font-body overflow-x-clip">

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gray-900 text-white pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/85 to-gray-900/40 z-10" />
          <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1920&q=80" alt="Payroll services" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-20 max-w-[1200px] mx-auto px-6 lg:px-8 w-full py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <span className="inline-flex items-center gap-2 text-brand-orange text-sm font-bold uppercase tracking-widest mb-6">
              <span className="material-symbols-outlined text-[16px]">payments</span>
              Bookkeeping & Payroll
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              Payroll <span className="text-brand-orange italic font-normal">Services.</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-xl leading-relaxed mb-10">
              Employee payroll & tax compliance — we handle every aspect of payroll so your team gets paid accurately and on time.
            </p>
            <Link to="/contact" className="inline-flex items-center bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold rounded-full px-9 py-4 shadow-[0_6px_25px_rgba(27,117,255,0.4)] transition-all hover:-translate-y-0.5">
              Set Up Payroll
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-[#f8f8f8]">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-[2.75rem] font-extrabold mb-4">
              Full-service <span className="text-brand-orange">payroll</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">Everything from processing to compliance — we handle it all so you don't have to.</p>
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

      {/* Who We Pay */}
      <section className="py-20 bg-white">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl font-extrabold mb-10">
            We process payroll for <span className="text-brand-orange">every worker type</span>
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-3">
            {payrollTypes.map((t, i) => (
              <motion.span key={t} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="px-5 py-2.5 bg-[#f8f8f8] rounded-full text-sm font-bold text-gray-700 border border-gray-200 flex items-center gap-2">
                <span className="material-symbols-outlined text-brand-orange text-[16px]">check_circle</span>{t}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Pay your team with <span className="text-brand-orange">confidence</span></h2>
          <p className="text-gray-400 mb-8">Accurate, on-time payroll with full tax compliance. Get started today.</p>
          <Link to="/contact" className="inline-flex items-center bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold rounded-full px-10 py-4 shadow-[0_6px_25px_rgba(27,117,255,0.4)] transition-all hover:-translate-y-0.5">
            Schedule a Free Consultation
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
