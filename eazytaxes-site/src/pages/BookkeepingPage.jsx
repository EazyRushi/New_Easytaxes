import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const deliverables = [
  { icon: 'menu_book', title: 'Monthly Reconciliation', desc: 'Every bank and credit card account reconciled monthly — no discrepancies slip through.' },
  { icon: 'bar_chart', title: 'Financial Statements', desc: 'Profit & Loss, Balance Sheet, and Cash Flow statements delivered every month.' },
  { icon: 'receipt', title: 'Expense Categorization', desc: 'Every transaction categorized correctly to maximize deductions at tax time.' },
  { icon: 'inventory', title: 'Accounts Payable', desc: 'We track what you owe vendors so you never miss a payment or damage a relationship.' },
  { icon: 'payments', title: 'Accounts Receivable', desc: 'Monitor outstanding invoices and help you stay on top of cash flow.' },
  { icon: 'sync', title: 'Software Integration', desc: 'Seamless sync with QuickBooks, Xero, FreshBooks, and most banking platforms.' },
];

const softwareLogos = ['QuickBooks', 'Xero', 'FreshBooks', 'Wave', 'Gusto', 'Stripe'];

export default function Bookkeeping() {
  return (
    <div className="bg-white text-gray-900 font-body overflow-x-clip">

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gray-900 text-white pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/85 to-gray-900/40 z-10" />
          <img src="https://images.unsplash.com/photo-1554224155-1a97d4b7cdc7?auto=format&fit=crop&w=1920&q=80" alt="Bookkeeping" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-20 max-w-[1200px] mx-auto px-6 lg:px-8 w-full py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <span className="inline-flex items-center gap-2 text-brand-orange text-sm font-bold uppercase tracking-widest mb-6">
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
              Bookkeeping & Payroll
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              <span className="text-brand-orange italic font-normal">Bookkeeping.</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-xl leading-relaxed mb-10">
              Monthly reconciliation & reports — clean books every month so you always know where your business stands.
            </p>
            <Link to="/contact" className="inline-flex items-center bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold rounded-full px-9 py-4 shadow-[0_6px_25px_rgba(27,117,255,0.4)] transition-all hover:-translate-y-0.5">
              Clean Up My Books
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-24 bg-[#f8f8f8]">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-[2.75rem] font-extrabold mb-4">
              What you get <span className="text-brand-orange">every month</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">A complete financial picture of your business, delivered on time, every month.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliverables.map((d, i) => (
              <motion.div key={d.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-8 shadow-[0_4px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_35px_rgba(0,0,0,0.09)] transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined">{d.icon}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{d.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Software Strip */}
      <section className="py-14 bg-white border-y border-gray-100">
        <div className="max-w-[1000px] mx-auto px-6">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">We work with your existing tools</p>
          <div className="flex flex-wrap justify-center items-center gap-10 opacity-50">
            {softwareLogos.map(s => (
              <span key={s} className="text-lg font-extrabold text-gray-700">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Clean books, <span className="text-brand-orange">every month</span></h2>
          <p className="text-gray-400 mb-8">Stop stressing about your financials. Get accurate books delivered on time, guaranteed.</p>
          <Link to="/contact" className="inline-flex items-center bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold rounded-full px-10 py-4 shadow-[0_6px_25px_rgba(27,117,255,0.4)] transition-all hover:-translate-y-0.5">
            Schedule a Free Consultation
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
