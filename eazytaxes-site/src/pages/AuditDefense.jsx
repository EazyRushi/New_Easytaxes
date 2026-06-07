import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const defenseServices = [
  { icon: 'shield', title: 'IRS Audit Representation', desc: 'We communicate directly with the IRS on your behalf — you never have to attend an audit alone.' },
  { icon: 'policy', title: 'Notice Response', desc: 'We draft and submit professional responses to all IRS and state tax notices within required deadlines.' },
  { icon: 'gavel', title: 'Appeals Process', desc: 'If the IRS rules against you, we file appeals and argue your case before the IRS Office of Appeals.' },
  { icon: 'savings', title: 'Penalty Abatement', desc: 'We request first-time penalty abatements and reasonable cause relief to reduce or eliminate penalties.' },
  { icon: 'history_edu', title: 'Amended Returns', desc: 'If errors caused the audit trigger, we file amended returns to correct the record and resolve the issue.' },
  { icon: 'support_agent', title: 'Dedicated Advocate', desc: 'A single point of contact who knows your case inside-out from the first notice to final resolution.' },
];

const auditTypes = ['Correspondence Audit', 'Office Audit', 'Field Audit', 'TCMP Audit', 'State Tax Audit', 'Sales Tax Audit'];

export default function AuditDefense() {
  return (
    <div className="bg-white text-gray-900 font-body overflow-x-clip">

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gray-900 text-white pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/85 to-gray-900/40 z-10" />
          <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1920&q=80" alt="Audit defense" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-20 max-w-[1200px] mx-auto px-6 lg:px-8 w-full py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <span className="inline-flex items-center gap-2 text-brand-orange text-sm font-bold uppercase tracking-widest mb-6">
              <span className="material-symbols-outlined text-[16px]">shield</span>
              Tax Services
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              Audit <span className="text-brand-orange italic font-normal">Defense.</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-xl leading-relaxed mb-10">
              IRS negotiation & support — we stand between you and the IRS so you can focus on your business.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="inline-flex items-center bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold rounded-full px-9 py-4 shadow-[0_6px_25px_rgba(27,117,255,0.4)] transition-all hover:-translate-y-0.5">
                Get Help Now
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <a href="tel:8002226868" className="inline-flex items-center bg-white/10 hover:bg-white/20 text-white font-bold rounded-full px-9 py-4 border border-white/20 transition-all">
                <span className="material-symbols-outlined text-[18px] mr-2">call</span>(800) 222-6868
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Urgent Banner */}
      <div className="bg-brand-orange py-4 text-white text-center text-sm font-bold">
        Received an IRS notice? Don't respond alone — call us immediately at (800) 222-6868
      </div>

      {/* Services */}
      <section className="py-24 bg-[#f8f8f8]">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-[2.75rem] font-extrabold text-center mb-16">
            Full-spectrum <span className="text-brand-orange">audit defense</span>
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {defenseServices.map((s, i) => (
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

      {/* Audit Types */}
      <section className="py-20 bg-white">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl font-extrabold mb-10">
            We handle <span className="text-brand-orange">every type</span> of audit
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-3">
            {auditTypes.map((t, i) => (
              <motion.span key={t} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="px-5 py-2.5 bg-[#f8f8f8] rounded-full text-sm font-bold text-gray-700 border border-gray-200">
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Don't face the IRS <span className="text-brand-orange">alone</span></h2>
          <p className="text-gray-400 mb-8">Our audit defense team has a 99.8% success rate. Get protected today.</p>
          <Link to="/contact" className="inline-flex items-center bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold rounded-full px-10 py-4 shadow-[0_6px_25px_rgba(27,117,255,0.4)] transition-all hover:-translate-y-0.5">
            Schedule a Free Consultation
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
