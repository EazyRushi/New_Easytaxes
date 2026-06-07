import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const faqs = [
  { q: 'What is an EIN?', a: 'An Employer Identification Number (EIN) is a 9-digit number the IRS assigns to identify your business for tax purposes — similar to a Social Security Number for individuals.' },
  { q: 'Who needs an EIN?', a: 'Any business with employees, operating as a corporation or partnership, filing employment or excise taxes, or opening a business bank account typically requires an EIN.' },
  { q: 'How fast can I get my EIN?', a: 'We file directly with the IRS. Most EINs are issued within 1 business day when filed online, or up to 4 weeks for international applicants via mail.' },
  { q: 'Can I file myself?', a: 'Yes, but mistakes on the SS-4 form can delay your application or create compliance issues. We ensure it\'s done right the first time.' },
];

const includes = [
  { icon: 'badge', title: 'SS-4 Preparation', desc: 'We accurately prepare your IRS Form SS-4 based on your entity type and use case.' },
  { icon: 'send', title: 'IRS Filing', desc: 'Direct submission to the IRS via the fastest available method for your situation.' },
  { icon: 'verified', title: 'EIN Letter (CP 575)', desc: 'You receive the official IRS EIN confirmation letter for your records.' },
  { icon: 'support_agent', title: 'Expert Review', desc: 'A CPA reviews your application before submission to catch any issues.' },
];

export default function FileEIN() {
  return (
    <div className="bg-white text-gray-900 font-body overflow-x-clip">

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gray-900 text-white pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/85 to-gray-900/40 z-10" />
          <img src="https://images.unsplash.com/photo-1618044619888-009e412ff12a?auto=format&fit=crop&w=1920&q=80" alt="EIN filing" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-20 max-w-[1200px] mx-auto px-6 lg:px-8 w-full py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <span className="inline-flex items-center gap-2 text-brand-orange text-sm font-bold uppercase tracking-widest mb-6">
              <span className="material-symbols-outlined text-[16px]">badge</span>
              Entity Formation
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              File an <span className="text-brand-orange italic font-normal">EIN.</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-xl leading-relaxed mb-10">
              Employer ID Number registration handled by our team — fast, accurate, and stress-free.
            </p>
            <Link to="/contact" className="inline-flex items-center bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold rounded-full px-9 py-4 shadow-[0_6px_25px_rgba(27,117,255,0.4)] transition-all hover:-translate-y-0.5">
              Get Your EIN
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 bg-[#f8f8f8]">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-[2.75rem] font-extrabold text-center mb-16">
            What's <span className="text-brand-orange">included</span>
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {includes.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-[0_4px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_35px_rgba(0,0,0,0.09)] transition-shadow text-center">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center mb-5 mx-auto">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-6">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-[2.75rem] font-extrabold text-center mb-16">
            Common <span className="text-brand-orange">questions</span>
          </motion.h2>
          <div className="space-y-5">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-[#f8f8f8] rounded-2xl p-6">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Get your <span className="text-brand-orange">EIN today</span></h2>
          <p className="text-gray-400 mb-8">Fast, accurate EIN registration with CPA oversight. Schedule a free consultation.</p>
          <Link to="/contact" className="inline-flex items-center bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold rounded-full px-10 py-4 shadow-[0_6px_25px_rgba(27,117,255,0.4)] transition-all hover:-translate-y-0.5">
            Schedule a Free Consultation
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
