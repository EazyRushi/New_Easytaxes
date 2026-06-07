import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const services = [
  { icon: 'receipt_long', title: 'E-commerce Tax Filing', desc: 'Federal & state returns for online sellers including marketplace facilitator rules.', href: '/small-business-taxes' },
  { icon: 'location_city', title: 'Sales Tax Compliance', desc: 'Multi-state sales tax registration, collection, and filing across all 50 states.', href: '/small-business-taxes' },
  { icon: 'inventory_2', title: 'Inventory Accounting', desc: 'COGS, inventory valuation, and cost tracking for physical product businesses.', href: '/bookkeeping' },
  { icon: 'menu_book', title: 'Bookkeeping', desc: 'Monthly reconciliation synced with Shopify, Amazon, PayPal, and Stripe.', href: '/bookkeeping' },
  { icon: 'lightbulb', title: 'Tax Advisory', desc: 'Entity structuring and year-round strategy to keep more of your revenue.', href: '/tax-advisory' },
  { icon: 'payments', title: 'Payroll', desc: 'Pay warehouse staff, customer service, and contractors on time.', href: '/payroll-services' },
];

const platforms = ['Shopify', 'Amazon', 'Etsy', 'WooCommerce', 'eBay', 'BigCommerce'];

export default function IndustryEcommerce() {
  return (
    <div className="bg-white text-gray-900 font-body overflow-x-clip">
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gray-900 text-white pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/85 to-gray-900/40 z-10" />
          <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1920&q=80" alt="E-commerce" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-20 max-w-[1200px] mx-auto px-6 lg:px-8 w-full py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <span className="inline-flex items-center gap-2 text-brand-orange text-sm font-bold uppercase tracking-widest mb-6">
              <span className="material-symbols-outlined text-[16px]">shopping_cart</span>
              Business Types
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              E-<span className="text-brand-orange italic font-normal">commerce.</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-xl leading-relaxed mb-10">
              Tax and accounting services built for online sellers — multi-state compliance, inventory tracking, and platform integrations included.
            </p>
            <Link to="/contact" className="inline-flex items-center bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold rounded-full px-9 py-4 shadow-[0_6px_25px_rgba(27,117,255,0.4)] transition-all hover:-translate-y-0.5">
              Schedule a Free Consultation
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-[#f8f8f8]">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-[2.75rem] font-extrabold text-center mb-16">
            Built for <span className="text-brand-orange">online sellers</span>
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Link to={s.href} className="block bg-white rounded-2xl p-8 shadow-[0_4px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_35px_rgba(0,0,0,0.09)] transition-shadow group">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center mb-5">
                    <span className="material-symbols-outlined">{s.icon}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-brand-orange transition-colors">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-white border-y border-gray-100">
        <div className="max-w-[900px] mx-auto px-6">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">We sync with your selling platforms</p>
          <div className="flex flex-wrap justify-center gap-10 opacity-50">
            {platforms.map(p => <span key={p} className="text-lg font-extrabold text-gray-700">{p}</span>)}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900 text-white text-center">
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Focus on selling, we'll handle <span className="text-brand-orange">the taxes</span></h2>
          <p className="text-gray-400 mb-8">Multi-state compliance and clean books for every online seller. Get started today.</p>
          <Link to="/contact" className="inline-flex items-center bg-[#1b75ff] hover:bg-[#155bcd] text-white font-bold rounded-full px-10 py-4 shadow-[0_6px_25px_rgba(27,117,255,0.4)] transition-all hover:-translate-y-0.5">
            Schedule a Free Consultation
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
